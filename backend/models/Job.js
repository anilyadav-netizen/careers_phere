const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    categoryName: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    jobType: {
      type: String,
      enum: [
        "Remote",
        "MNC",
        "Banking & Finance",
        "Startup",
        "HR",
        "Engineering",
        "Fortune 500",
        "Internship",
        "Project Management",
        "Sales",
        "Supply Chain",
        "Full Time",
        "Part Time",
        "Contract",
      ],
      default: "Remote",
    },
    domain: {
      type: String,
      trim: true,
      index: true,
      default: "",
    },
    countries: {
      type: [
        {
          name: { type: String, trim: true, default: "" },
          countryName: { type: String, trim: true, default: "" },
          flag: { type: String, trim: true, default: "" },
        },
      ],
      default: [],
    },
    salaryCurrency: {
      type: String,
      trim: true,
      default: "USD",
    },
    experience: {
      type: String,
      enum: [
        "No Experience required",
        "0-3 Yrs",
        "1-3 Yrs",
        "3-5 Yrs",
        "5+ Yrs",
      ],
      default: "No Experience required",
    },
    salary: {
      type: String,
      trim: true,
      default: "Undisclosed",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    responsibilities: {
      type: [String],
      required: [true, "At least one responsibility is required"],
      validate: {
        validator: function (arr) {
          return (
            arr &&
            arr.length > 0 &&
            arr.some((item) => item.trim() !== "")
          );
        },
        message: "At least one responsibility is required",
      },
    },
    requirements: {
      type: [String],
      required: [true, "At least one requirement is required"],
      validate: {
        validator: function (arr) {
          return (
            arr &&
            arr.length > 0 &&
            arr.some((item) => item.trim() !== "")
          );
        },
        message: "At least one requirement is required",
      },
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (arr) {
          return (
            arr &&
            arr.length > 0 &&
            arr.some((item) => item.trim() !== "")
          );
        },
        message: "At least one skill is required",
      },
    },
    status: {
      type: String,
      enum: ["active", "draft", "closed", "pending"],
      default: "active",
    },
    applicantCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postedByName: {
      type: String,
      trim: true,
    },
    applicationDeadline: {
      type: Date,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    companyLogo: {
      url: String,
      displayUrl: String,
      deleteUrl: String,
      thumb: String,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

JobSchema.index({
  title: "text",
  description: "text",
  company: "text",
});

JobSchema.index({ categoryId: 1 });
JobSchema.index({ status: 1 });
JobSchema.index({ createdAt: -1 });
JobSchema.index({ country: 1 });

JobSchema.pre("save", async function (next) {
  if (this.isModified("categoryId")) {
    try {
      const Category = mongoose.model("Category");
      const category = await Category.findById(this.categoryId);

      if (category) {
        this.categoryName = category.name;
      }
    } catch (error) {
      console.error("Error fetching category name:", error);
    }
  }
});

JobSchema.virtual("formattedDate").get(function () {
  return this.createdAt
    ? this.createdAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";
});

JobSchema.virtual("daysAgo").get(function () {
  if (!this.createdAt) return "Recently";

  const days = Math.floor(
    (Date.now() - this.createdAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return this.formattedDate;
});

JobSchema.set("toJSON", { virtuals: true });
JobSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Job", JobSchema);