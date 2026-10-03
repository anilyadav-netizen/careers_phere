const mongoose = require("mongoose");

const JobTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Job type name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Job type name cannot exceed 50 characters"],
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    icon: {
      type: String,
      trim: true,
      default: "Briefcase",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobType", JobTypeSchema);
