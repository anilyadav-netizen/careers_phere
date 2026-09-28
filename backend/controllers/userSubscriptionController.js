
const crypto = require("crypto");
const UserSubscription = require("../models/UserSubscription");
const Subscription = require("../models/Subscription");
const razorpayInstance = require("../config/razorpay");
const { sendSubscriptionConfirmation } = require("../utils/mailer");

const sendPurchaseEmail = async (user, subscription) => {
  try {
    await sendSubscriptionConfirmation({ user, subscription });
  } catch (error) {
    console.error("Subscription confirmation email error:", error.message);
  }
};

// @desc    Buy subscription (User)
// @route   POST /api/subscriptions/buy
exports.buySubscription = async (req, res) => {
  try {
    const { subscriptionId, paymentMethod, paymentId, autoRenew } = req.body;

    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      isActive: true,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found or inactive",
      });
    }

    const existingSubscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (
      existingSubscription &&
      existingSubscription.endDate &&
      new Date() > existingSubscription.endDate
    ) {
      existingSubscription.isActive = false;
      existingSubscription.cancelledAt =
        existingSubscription.cancelledAt || new Date();
      existingSubscription.cancellationReason =
        existingSubscription.cancellationReason || "Subscription expired";
      await existingSubscription.save();
    }

    const startDate = new Date();
    const endDate = new Date();

    const billingType = String(
      subscription.billingType || "Monthly"
    ).toLowerCase();

    if (billingType === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (billingType === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (billingType === "quarterly") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (billingType === "lifetime") {
      endDate.setFullYear(endDate.getFullYear() + 100);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const userSubscription = await UserSubscription.create({
      user: req.user._id,
      subscription: subscription._id,
      subscriptionDetails: {
        planName: subscription.planName,
        billingType: subscription.billingType || "Monthly",
        price: subscription.price,
        features: subscription.features,
        numberOfCountries: subscription.numberOfCountries,
        countries: subscription.countries,
      },
      paymentId: paymentId || `PAY-${Date.now()}`,
      paymentMethod: paymentMethod || "razorpay",
      paymentStatus: "completed",
      startDate,
      endDate,
      isActive: true,
      autoRenew: autoRenew !== undefined ? Boolean(autoRenew) : false,
      jobsPosted: 0,
      applicationsUsed: 0,
    });

    if (existingSubscription) {
      existingSubscription.isActive = false;
      existingSubscription.cancelledAt = new Date();
      existingSubscription.cancellationReason =
        "Upgraded/Replaced with new subscription";
      await existingSubscription.save();
    }

    await sendPurchaseEmail(req.user, {
      planName: subscription.planName,
      endDate,
    });

    return res.status(201).json({
      success: true,
      message: "Subscription purchased successfully",
      data: {
        subscription: userSubscription,
        planName: subscription.planName,
        validUntil: endDate,
      },
    });
  } catch (error) {
    console.error("Buy subscription error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to purchase subscription",
    });
  }
};

// @desc    Create razorpay order for subscription purchase
// @route   POST /api/subscriptions/create-order
exports.createSubscriptionOrder = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      isActive: true,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found or inactive",
      });
    }

    if (!subscription.price || subscription.price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Free plan does not require payment",
      });
    }

    const tax = Math.round(subscription.price * 0.18);
    const totalAmount = subscription.price + tax;
    const amountInPaise = Math.round(totalAmount * 100);

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `sub_${subscription._id}_${Date.now()}`,
      notes: {
        subscriptionId: subscription._id.toString(),
        userId: req.user._id.toString(),
        planName: subscription.planName,
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        planName: subscription.planName,
        subscriptionId: subscription._id,
        price: subscription.price,
        tax,
        total: totalAmount,
      },
    });
  } catch (error) {
    console.error("Create subscription order error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

// @desc    Verify razorpay payment signature and activate subscription
// @route   POST /api/subscriptions/verify-payment
exports.verifySubscriptionPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      subscriptionId,
      autoRenew,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !subscriptionId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Signature mismatch.",
      });
    }

    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      isActive: true,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found or inactive",
      });
    }

    const alreadyProcessed = await UserSubscription.findOne({
      paymentId: razorpay_payment_id,
    });

    if (alreadyProcessed) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
        data: { subscription: alreadyProcessed },
      });
    }

    const existingSubscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (
      existingSubscription &&
      existingSubscription.endDate &&
      new Date() > existingSubscription.endDate
    ) {
      existingSubscription.isActive = false;
      existingSubscription.cancelledAt =
        existingSubscription.cancelledAt || new Date();
      existingSubscription.cancellationReason =
        existingSubscription.cancellationReason || "Subscription expired";
      await existingSubscription.save();
    }

    const startDate = new Date();
    const endDate = new Date();

    const billingType = String(
      subscription.billingType || "Monthly"
    ).toLowerCase();

    if (billingType === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (billingType === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (billingType === "quarterly") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (billingType === "lifetime") {
      endDate.setFullYear(endDate.getFullYear() + 100);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const userSubscription = await UserSubscription.create({
      user: req.user._id,
      subscription: subscription._id,
      subscriptionDetails: {
        planName: subscription.planName,
        billingType: subscription.billingType || "Monthly",
        price: subscription.price,
        features: subscription.features,
        numberOfCountries: subscription.numberOfCountries,
        countries: subscription.countries,
      },
      paymentId: razorpay_payment_id,
      paymentMethod: "razorpay",
      paymentStatus: "completed",
      startDate,
      endDate,
      isActive: true,
      autoRenew: autoRenew !== undefined ? Boolean(autoRenew) : false,
      jobsPosted: 0,
      applicationsUsed: 0,
    });

    if (existingSubscription) {
      existingSubscription.isActive = false;
      existingSubscription.cancelledAt = new Date();
      existingSubscription.cancellationReason =
        "Upgraded/Replaced with new subscription";
      await existingSubscription.save();
    }

    await sendPurchaseEmail(req.user, {
      planName: subscription.planName,
      endDate,
    });

    return res.status(201).json({
      success: true,
      message: "Payment verified and subscription activated",
      data: {
        subscription: userSubscription,
        planName: subscription.planName,
        validUntil: endDate,
      },
    });
  } catch (error) {
    console.error("Verify subscription payment error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Payment verification failed",
    });
  }
};

// @desc    Get current user's subscription
// @route   GET /api/subscriptions/my-subscription
exports.getMySubscription = async (req, res) => {
  try {
    const subscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
      paymentStatus: "completed",
      endDate: { $gt: new Date() },
    })
      .populate(
        "subscription",
        "planName billingType price features numberOfCountries countries maxJobs maxApplications isPopular color"
      )
      .sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...subscription.toObject(),
        usage: {
          jobsPosted: subscription.jobsPosted || 0,
          applicationsUsed: subscription.applicationsUsed || 0,
          maxJobs: subscription.subscription?.maxJobs || 10,
          maxApplications:
            subscription.subscription?.maxApplications || 50,
          numberOfCountries:
            subscription.subscription?.numberOfCountries ||
            subscription.subscriptionDetails?.numberOfCountries ||
            1,
        },
      },
    });
  } catch (error) {
    console.error("Get my subscription error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscription",
    });
  }
};

// @desc    Get user's subscription history
// @route   GET /api/subscriptions/history
exports.getSubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = await UserSubscription.find({
      user: req.user._id,
    })
      .populate(
        "subscription",
        "planName billingType price numberOfCountries countries maxJobs maxApplications color"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Get subscription history error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscription history",
    });
  }
};

// @desc    Cancel subscription
// @route   PATCH /api/subscriptions/cancel
exports.cancelSubscription = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const subscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found",
      });
    }

    subscription.isActive = false;
    subscription.cancelledAt = new Date();
    subscription.cancellationReason =
      cancellationReason || "User requested cancellation";
    subscription.autoRenew = false;

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to cancel subscription",
    });
  }
};

// @desc    Toggle auto-renew
// @route   PATCH /api/subscriptions/auto-renew
exports.toggleAutoRenew = async (req, res) => {
  try {
    const { autoRenew } = req.body;

    const subscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
      paymentStatus: "completed",
      endDate: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found",
      });
    }

    subscription.autoRenew =
      autoRenew !== undefined
        ? Boolean(autoRenew)
        : !subscription.autoRenew;

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: `Auto-renew ${
        subscription.autoRenew ? "enabled" : "disabled"
      } successfully`,
      data: { autoRenew: subscription.autoRenew },
    });
  } catch (error) {
    console.error("Toggle auto-renew error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle auto-renew",
    });
  }
};

// @desc    Check subscription status
// @route   GET /api/subscriptions/status
exports.checkSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await UserSubscription.findOne({
      user: req.user._id,
      isActive: true,
    })
      .populate(
        "subscription",
        "planName billingType price numberOfCountries countries maxJobs maxApplications"
      )
      .sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(200).json({
        success: true,
        hasActiveSubscription: false,
        message: "No active subscription",
      });
    }

    if (!subscription.endDate || new Date() > subscription.endDate) {
      subscription.isActive = false;
      subscription.autoRenew = false;
      subscription.cancelledAt =
        subscription.cancelledAt || new Date();
      subscription.cancellationReason =
        subscription.cancellationReason || "Subscription expired";

      await subscription.save();

      return res.status(200).json({
        success: true,
        hasActiveSubscription: false,
        message: "Subscription has expired",
        data: {
          expired: true,
          endDate: subscription.endDate,
        },
      });
    }

    const maxJobs = subscription.subscription?.maxJobs || 10;
    const maxApplications =
      subscription.subscription?.maxApplications || 50;

    const jobsPosted = subscription.jobsPosted || 0;
    const applicationsUsed = subscription.applicationsUsed || 0;

    const numberOfCountries =
      subscription.subscription?.numberOfCountries ||
      subscription.subscriptionDetails?.numberOfCountries ||
      1;

    return res.status(200).json({
      success: true,
      hasActiveSubscription: true,
      data: {
        planName:
          subscription.subscriptionDetails?.planName ||
          subscription.subscription?.planName,

        billingType:
          subscription.subscriptionDetails?.billingType ||
          subscription.subscription?.billingType ||
          "Monthly",

        startDate: subscription.startDate,
        endDate: subscription.endDate,
        daysRemaining: subscription.daysRemaining,

        numberOfCountries,

        countries:
          subscription.subscription?.countries ||
          subscription.subscriptionDetails?.countries ||
          [],

        maxJobs,
        maxApplications,
        jobsPosted,
        applicationsUsed,

        jobsRemaining: Math.max(
          0,
          maxJobs - jobsPosted
        ),

        applicationsRemaining: Math.max(
          0,
          maxApplications - applicationsUsed
        ),

        autoRenew: subscription.autoRenew,
      },
    });
  } catch (error) {
    console.error("Check subscription status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to check subscription status",
    });
  }
};

// @desc    Admin: Get all user subscriptions
// @route   GET /api/admin/user-subscriptions
exports.getAllUserSubscriptionsAdmin = async (req, res) => {
  try {
    const { status, user } = req.query;

    const filter = {};

    if (status === "active") filter.isActive = true;
    if (status === "inactive") filter.isActive = false;
    if (user) filter.user = user;

    const subscriptions = await UserSubscription.find(filter)
      .populate("user", "name email mobile")
      .populate(
        "subscription",
        "planName billingType price numberOfCountries countries maxJobs maxApplications color"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Get all user subscriptions error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user subscriptions",
    });
  }
};

// @desc    Admin: Get user subscription by ID
// @route   GET /api/admin/user-subscriptions/:id
exports.getUserSubscriptionByIdAdmin = async (req, res) => {
  try {
    const subscription = await UserSubscription.findById(req.params.id)
      .populate("user", "name email mobile")
      .populate(
        "subscription",
        "planName billingType price numberOfCountries countries maxJobs maxApplications color"
      );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "User subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Get user subscription error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user subscription",
    });
  }
};

