const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "Build Your Career\nBeyond Borders",
      trim: true,
    },
    subheading: {
      type: String,
      default:
        "Discover international job opportunities from trusted companies around the world. Build your profile, get matched with the right roles, and take your career to the country you've always dreamed of.",
      trim: true,
    },
    badgeText: {
      type: String,
      default: "Global Jobs • 50+ Countries",
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

module.exports = mongoose.model("HeroSection", heroSectionSchema);
