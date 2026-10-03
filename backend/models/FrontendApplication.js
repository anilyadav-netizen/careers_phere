const mongoose = require("mongoose");

const FrontendApplicationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "Frontend Developer",
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    companyLogo: {
      type: String,
      trim: true,
      default: "",
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoleOpportunity",
      default: null,
    },
    opportunityRole: {
      type: String,
      trim: true,
      default: "",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    currentCountry: {
      type: String,
      trim: true,
      default: "",
    },
    currentLocation: {
      type: String,
      trim: true,
      default: "",
    },
    preferredRegion: {
      type: String,
      trim: true,
      default: "Global",
    },
    preferredJobMarket: {
      type: String,
      trim: true,
      default: "Worldwide / Open",
    },
    preferredWorkMode: {
      type: String,
      trim: true,
      default: "Remote / Hybrid",
    },
    relocationPreference: {
      type: String,
      trim: true,
      default: "",
    },
    workAuthorization: {
      type: String,
      trim: true,
      default: "",
    },
    expectedSalary: {
      type: Number,
      required: false,
      default: 0,
      min: [0, "Salary cannot be negative"],
    },
    salaryCurrency: {
      type: String,
      trim: true,
      default: "USD",
    },
    noticePeriod: {
      type: String,
      trim: true,
      default: "Immediate / Flexible",
    },
    preferredTimezone: {
      type: String,
      trim: true,
      default: "",
    },
    countryFlexibility: {
      type: String,
      trim: true,
      default: "",
    },
    portfolio: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    frontendSkills: {
      type: String,
      trim: true,
      default: "",
    },
    resume: {
      filename: {
        type: String,
        required: [true, "Resume filename is required"],
      },
      mimetype: {
        type: String,
        required: [true, "Resume mimetype is required"],
      },
      size: {
        type: Number,
        required: [true, "Resume size is required"],
      },
      data: {
        type: Buffer,
        required: [true, "Resume data buffer is required"],
      },
    },
    aboutYou: {
      type: String,
      required: [true, "Tell us about yourself is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "shortlisted",
        "interview",
        "rejected",
        "hired",
      ],
      default: "pending",
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster lookups
FrontendApplicationSchema.index({ email: 1, createdAt: -1 });
FrontendApplicationSchema.index({ status: 1 });
FrontendApplicationSchema.index({ role: 1 });

module.exports = mongoose.model(
  "FrontendApplication",
  FrontendApplicationSchema,
);
