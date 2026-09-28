const Subscription = require("../models/Subscription");
const UserSubscription = require("../models/UserSubscription");

// ============ ADMIN CONTROLLERS ============

// @desc    Create subscription (Admin only)
// @route   POST /api/admin/subscriptions
exports.createSubscription = async (req, res) => {
  try {
    const {
      planName,
      billingType,
      price,
      features,
      numberOfCountries,
      countries,
      waitingTime,
      maxJobs,
      maxApplications,
      isPopular,
      discountPercentage,
      description,
      savingsLabel,
      badge,
      color,
    } = req.body;

    if (!planName || !String(planName).trim()) {
      return res.status(400).json({
        success: false,
        message: "Plan name is required",
      });
    }

    const subscription = await Subscription.create({
      planName: String(planName).trim(),
      billingType: billingType || "Monthly",
      price: Number(price) || 0,
      features: Array.isArray(features)
        ? features.map((item) => String(item).trim()).filter(Boolean)
        : [],
      numberOfCountries: Math.max(1, Number(numberOfCountries) || 1),
      countries: Array.isArray(countries)
        ? countries.map((country) => String(country).trim()).filter(Boolean)
        : [],
      waitingTime: Number(waitingTime) || 0,
      maxJobs: Number(maxJobs) || 0,
      maxApplications: Number(maxApplications) || 0,
      isPopular: Boolean(isPopular),
      discountPercentage: Number(discountPercentage) || 0,
      description: description ? String(description).trim() : "",
      savingsLabel: savingsLabel ? String(savingsLabel).trim() : "",
      badge: badge ? String(badge).trim() : "",
      color: color || "#3B82F6",
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Create subscription error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A subscription with this plan name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create subscription",
    });
  }
};

// @desc    Get all subscriptions (Admin)
// @route   GET /api/admin/subscriptions
exports.getAllSubscriptionsAdmin = async (req, res) => {
  try {
    const { isActive, billingType } = req.query;

    const filter = {};

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    if (billingType) {
      filter.billingType = billingType;
    }

    const subscriptions = await Subscription.find(filter)
      .populate("createdBy", "name email")
      .sort({ price: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Get all subscriptions error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscriptions",
    });
  }
};

// @desc    Get single subscription (Admin)
// @route   GET /api/admin/subscriptions/:id
exports.getSubscriptionByIdAdmin = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Get subscription error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscription",
    });
  }
};

// @desc    Update subscription (Admin)
// @route   PUT /api/admin/subscriptions/:id
exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    const {
      planName,
      billingType,
      price,
      features,
      numberOfCountries,
      countries,
      waitingTime,
      maxJobs,
      maxApplications,
      isPopular,
      discountPercentage,
      description,
      savingsLabel,
      badge,
      color,
    } = req.body;

    if (planName !== undefined) {
      subscription.planName = String(planName).trim();
    }

    if (billingType !== undefined) {
      subscription.billingType = billingType;
    }

    if (price !== undefined) {
      subscription.price = Number(price);
    }

    if (features !== undefined) {
      subscription.features = Array.isArray(features)
        ? features.map((item) => String(item).trim()).filter(Boolean)
        : [];
    }

    if (numberOfCountries !== undefined) {
      subscription.numberOfCountries = Math.max(
        1,
        Number(numberOfCountries) || 1
      );
    }

    if (countries !== undefined) {
      subscription.countries = Array.isArray(countries)
        ? countries.map((country) => String(country).trim()).filter(Boolean)
        : [];
    }

    if (waitingTime !== undefined) {
      subscription.waitingTime = Number(waitingTime) || 0;
    }

    if (maxJobs !== undefined) {
      subscription.maxJobs = Number(maxJobs) || 0;
    }

    if (maxApplications !== undefined) {
      subscription.maxApplications = Number(maxApplications) || 0;
    }

    if (isPopular !== undefined) {
      subscription.isPopular = Boolean(isPopular);
    }

    if (discountPercentage !== undefined) {
      subscription.discountPercentage = Number(discountPercentage) || 0;
    }

    if (description !== undefined) {
      subscription.description = String(description).trim();
    }

    if (savingsLabel !== undefined) {
      subscription.savingsLabel = String(savingsLabel).trim();
    }

    if (badge !== undefined) {
      subscription.badge = String(badge).trim();
    }

    if (color !== undefined) {
      subscription.color = color;
    }

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Update subscription error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A subscription with this plan name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update subscription",
    });
  }
};

// @desc    Delete subscription (Admin)
// @route   DELETE /api/admin/subscriptions/:id
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    const userSubscriptions = await UserSubscription.find({
      subscription: subscription._id,
    });

    if (userSubscriptions.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete subscription. ${userSubscriptions.length} user(s) have this subscription.`,
      });
    }

    await subscription.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    console.error("Delete subscription error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete subscription",
    });
  }
};

// @desc    Toggle subscription active status
// @route   PATCH /api/admin/subscriptions/:id/toggle
exports.toggleSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    subscription.isActive = !subscription.isActive;

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: `Subscription ${
        subscription.isActive ? "activated" : "deactivated"
      } successfully`,
      data: subscription,
    });
  } catch (error) {
    console.error("Toggle subscription status error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle subscription status",
    });
  }
};

// ============ USER CONTROLLERS ============

// @desc    Get all active subscriptions (User)
// @route   GET /api/subscriptions
exports.getAllSubscriptionsUser = async (req, res) => {
  try {
    const { billingType } = req.query;

    const filter = {
      isActive: true,
    };

    if (billingType) {
      filter.billingType = billingType;
    }

    const subscriptions = await Subscription.find(filter)
      .select(
        "planName billingType price features numberOfCountries countries maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt"
      )
      .sort({ price: 1 });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Get subscriptions user error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscriptions",
    });
  }
};

// @desc    Get single subscription (User)
// @route   GET /api/subscriptions/:id
exports.getSubscriptionByIdUser = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      isActive: true,
    }).select(
      "planName billingType price features numberOfCountries countries maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt"
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Get subscription user error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscription",
    });
  }
};

// @desc    Get subscription by plan name (User)
// @route   GET /api/subscriptions/plan/:planName
exports.getSubscriptionByPlanName = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      planName: {
        $regex: new RegExp(`^${req.params.planName}$`, "i"),
      },
      isActive: true,
    }).select(
      "planName billingType price features numberOfCountries countries maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt"
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Get subscription by name error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch subscription",
    });
  }
};