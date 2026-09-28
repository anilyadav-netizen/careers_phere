// controllers/adminSubscriptionController.js
const Subscription = require("../models/Subscription");

// @desc    Get all plans (admin - includes inactive)
// @route   GET /api/admin/subscriptions
exports.getAllPlansAdmin = async (req, res) => {
  try {
    const { isActive } = req.query;
    const UserSubscription = require("../models/UserSubscription");

    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const plans = await Subscription.find(filter).sort({ price: 1 });
    const purchaseStats = await UserSubscription.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $group: {
          _id: "$subscription",
          purchaseCount: { $sum: 1 },
        },
      },
    ]);
    const purchaseCounts = new Map(
      purchaseStats.map((stat) => [String(stat._id), stat.purchaseCount]),
    );
    const plansWithCount = plans.map((plan) => ({
      ...plan.toObject(),
      purchaseCount: purchaseCounts.get(String(plan._id)) || 0,
    }));

    // A subscription keeps a price snapshot at purchase time. Summing that
    // snapshot keeps historical revenue correct after a plan price is edited.
    const [revenue] = await UserSubscription.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$subscriptionDetails.price", 0] } },
          purchaseCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: plansWithCount.length,
      data: plansWithCount,
      metrics: {
        revenue: revenue?.total || 0,
        completedPurchases: revenue?.purchaseCount || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// @desc    Get single plan by id (admin)
// @route   GET /api/admin/subscriptions/:id
exports.getPlanByIdAdmin = async (req, res) => {
  try {
    const UserSubscription = require("../models/UserSubscription");
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const purchaseCount = await UserSubscription.countDocuments({
      subscription: plan._id,
      paymentStatus: "completed",
    });

    const planData = {
      ...plan.toObject(),
      purchaseCount,
    };

    res.status(200).json({ success: true, data: planData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plan",
      error: error.message,
    });
  }
};

// @desc    Create new plan
// @route   POST /api/admin/subscriptions
exports.createPlan = async (req, res) => {
  try {
    const {
      planName,
      price,
      features,
      numberOfCountries,
      countries,
      waitingTime,
      maxJobs,
      maxApplications,
      isActive,
      isPopular,
      discountPercentage,
      description,
      badge,
      color,
    } = req.body;

    // Validation
    const parsedCountries = Array.isArray(countries)
      ? countries.map((country) => String(country).trim()).filter(Boolean)
      : [];
    const countryLimit =
      numberOfCountries === undefined
        ? parsedCountries.length
        : parseInt(numberOfCountries);

    if (
      !planName ||
      price === undefined ||
      !features ||
      countryLimit < 1 ||
      waitingTime === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "planName, price, features, countries and waitingTime are required",
      });
    }

    // Check if number of countries is valid
    if (countryLimit < 1) {
      return res.status(400).json({
        success: false,
        message: "Number of countries must be at least 1",
      });
    }

    const existing = await Subscription.findOne({ planName: planName.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A plan with this name already exists",
      });
    }

    if (isPopular) {
      await Subscription.updateMany({}, { $set: { isPopular: false } });
    }

    const plan = await Subscription.create({
      planName: planName.trim(),
      price: parseFloat(price),
      features: Array.isArray(features)
        ? features.filter((f) => f && f.trim() !== "")
        : features,
      numberOfCountries: countryLimit,
      countries: parsedCountries,
      waitingTime: parseInt(waitingTime),
      maxJobs: maxJobs ? parseInt(maxJobs) : 10,
      maxApplications: maxApplications ? parseInt(maxApplications) : 50,
      isActive: isActive !== undefined ? isActive : true,
      isPopular: !!isPopular,
      discountPercentage: discountPercentage
        ? parseFloat(discountPercentage)
        : 0,
      description: description || "",
      badge: badge || "",
      color: color || "#3B82F6",
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    console.error("Create plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create plan",
      error: error.message,
    });
  }
};

// @desc    Update plan
// @route   PUT /api/admin/subscriptions/:id
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const {
      planName,
      price,
      features,
      numberOfCountries,
      countries,
      waitingTime,
      maxJobs,
      maxApplications,
      isActive,
      isPopular,
      discountPercentage,
      description,
      badge,
      color,
    } = req.body;

    // Check duplicate plan name
    if (planName && planName.trim() !== plan.planName) {
      const existing = await Subscription.findOne({
        planName: planName.trim(),
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A plan with this name already exists",
        });
      }
      plan.planName = planName.trim();
    }

    // Update fields
    if (price !== undefined) plan.price = parseFloat(price);
    if (features !== undefined) {
      plan.features = Array.isArray(features)
        ? features.filter((f) => f && f.trim() !== "")
        : plan.features;
    }
    if (numberOfCountries !== undefined || countries !== undefined) {
      const parsedCountries = Array.isArray(countries)
        ? countries.map((country) => String(country).trim()).filter(Boolean)
        : plan.countries || [];
      const countryLimit =
        numberOfCountries === undefined
          ? parsedCountries.length
          : parseInt(numberOfCountries);

      if (countryLimit < 1) {
        return res.status(400).json({
          success: false,
          message: "Number of countries must be at least 1",
        });
      }
      plan.numberOfCountries = countryLimit;
      plan.countries = parsedCountries;
    }
    if (waitingTime !== undefined) plan.waitingTime = parseInt(waitingTime);
    if (maxJobs !== undefined) plan.maxJobs = parseInt(maxJobs);
    if (maxApplications !== undefined)
      plan.maxApplications = parseInt(maxApplications);
    if (isActive !== undefined) plan.isActive = isActive;
    if (discountPercentage !== undefined)
      plan.discountPercentage = parseFloat(discountPercentage);
    if (description !== undefined) plan.description = description;
    if (badge !== undefined) plan.badge = badge;
    if (color !== undefined) plan.color = color;

    // Handle isPopular - only one plan can be popular
    if (isPopular !== undefined) {
      if (isPopular) {
        await Subscription.updateMany(
          { _id: { $ne: plan._id } },
          { $set: { isPopular: false } },
        );
      }
      plan.isPopular = isPopular;
    }

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    console.error("Update plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update plan",
      error: error.message,
    });
  }
};

// @desc    Delete plan (hard delete)
// @route   DELETE /api/admin/subscriptions/:id
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete plan",
      error: error.message,
    });
  }
};

// @desc    Toggle plan active/inactive
// @route   PATCH /api/admin/subscriptions/:id/toggle-active
exports.togglePlanActive = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    plan.isActive = !plan.isActive;
    await plan.save();

    res.status(200).json({
      success: true,
      message: `Plan ${plan.isActive ? "activated" : "deactivated"} successfully`,
      data: plan,
    });
  } catch (error) {
    console.error("Toggle plan status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle plan status",
      error: error.message,
    });
  }
};
