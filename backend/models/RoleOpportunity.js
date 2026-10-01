const mongoose = require("mongoose");

const CountryEntrySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      trim: true,
      default: "",
    },
    flag: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

// Custom validation: at least countryName or flag must be present
CountryEntrySchema.path("countryName").validate(function () {
  return (
    (this.countryName && this.countryName.trim().length > 0) ||
    (this.flag && this.flag.trim().length > 0)
  );
}, "Either country name or flag must be provided");

const RoleOpportunitySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [120, "Company name cannot exceed 120 characters"],
      index: true,
    },
    companyLogo: {
      type: String,
      trim: true,
      default: "",
    },
    roleCategory: {
      type: String,
      required: [true, "Role category is required"],
      trim: true,
      index: true,
      // Examples: "Frontend Developer", "Backend Developer", "Video Editor", "Full Stack Developer", "Android Developer", "UI/UX Designer"
    },
    roleTitle: {
      type: String,
      trim: true,
      default: "",
    },
    // Multiple countries and flags
    countries: {
      type: [CountryEntrySchema],
      default: [],
      validate: {
        validator: function (val) {
          if (!val || val.length === 0) return true; // optional initially
          return val.every(
            (c) =>
              (c.countryName && c.countryName.trim().length > 0) ||
              (c.flag && c.flag.trim().length > 0)
          );
        },
        message: "Each country entry must have at least a country name or flag",
      },
    },
    // Salary is optional
    salary: {
      type: String,
      trim: true,
      default: "",
    },
    salaryCurrency: {
      type: String,
      trim: true,
      default: "USD",
    },
    // Skills / Requirements
    skills: {
      type: [String],
      default: [],
    },
    // Work mode preferences
    workModes: {
      type: [String],
      default: ["Remote", "Hybrid"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for fast filtering
RoleOpportunitySchema.index({ roleCategory: 1, isActive: 1, createdAt: -1 });

module.exports = mongoose.model("RoleOpportunity", RoleOpportunitySchema);
