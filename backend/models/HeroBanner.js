const mongoose = require("mongoose");

const heroBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title/heading is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
      trim: true,
    },
    badgeText: {
      type: String,
      default: "Global Career Opportunity",
      trim: true,
    },
    location: {
      type: String,
      default: "New York, USA",
      trim: true,
    },
    highlightTag: {
      type: String,
      default: "Company Sponsored",
      trim: true,
    },
    image: {
      url: { type: String, default: "" },
      displayUrl: { type: String, default: "" },
      deleteUrl: { type: String, default: "" },
      medium: { type: String, default: "" },
      thumb: { type: String, default: "" },
      filename: { type: String, default: "" },
    },
    primaryButtonText: {
      type: String,
      default: "Explore Jobs",
      trim: true,
    },
    primaryButtonUrl: {
      type: String,
      default: "/jobs",
      trim: true,
    },
    secondaryButtonText: {
      type: String,
      default: "Learn More",
      trim: true,
    },
    secondaryButtonUrl: {
      type: String,
      default: "/about",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast public retrieval of active banners in order
heroBannerSchema.index({ isActive: 1, order: 1, createdAt: -1 });

module.exports = mongoose.model("HeroBanner", heroBannerSchema);
