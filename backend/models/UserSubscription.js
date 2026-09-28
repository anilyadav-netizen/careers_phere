const mongoose = require("mongoose");

const UserSubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    subscriptionDetails: {
      planName: String,
      billingType: String,
      price: Number,
      numberOfCountries: Number,
      features: [String],
      countries: [String],
    },
    // Payment details
    paymentId: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "cod", "offline"],
      default: "razorpay",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    // Subscription period
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
    // Usage tracking
    jobsPosted: {
      type: Number,
      default: 0,
    },
    applicationsUsed: {
      type: Number,
      default: 0,
    },
    // Cancellation
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
UserSubscriptionSchema.index({ user: 1 });
UserSubscriptionSchema.index({ subscription: 1 });
UserSubscriptionSchema.index({ endDate: 1 });
UserSubscriptionSchema.index({ isActive: 1 });

// Virtual for days remaining
UserSubscriptionSchema.virtual("daysRemaining").get(function () {
  if (!this.endDate) return 0;
  const now = new Date();
  const diff = this.endDate - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual for days used
UserSubscriptionSchema.virtual("daysUsed").get(function () {
  if (!this.startDate) return 0;
  const now = new Date();
  const diff = now - this.startDate;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual for isExpired
UserSubscriptionSchema.virtual("isExpired").get(function () {
  if (!this.endDate) return true;
  return new Date() > this.endDate;
});

// To include virtuals in JSON
UserSubscriptionSchema.set("toJSON", { virtuals: true });
UserSubscriptionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("UserSubscription", UserSubscriptionSchema);
