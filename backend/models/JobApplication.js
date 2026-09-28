const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected"],
      default: "pending",
      index: true,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    isSendMail: {
      type: Boolean,
      default: false,
    },

    applicationData: {
      name: String,
      email: String,
      phone: String,
      experienceType: String,
      experience: String,
      skills: [String],
      currentLocation: String,
      expectedSalary: String,
      noticePeriod: String,
      linkedin: String,
      portfolio: String,
      coverLetter: String,
      additionalInfo: String,
      passport: String,
      profilePhoto: {
        url: String,
        filename: String,
        mimetype: String,
        size: Number,
      },
      governmentDocument: {
        filename: String,
        mimetype: String,
        size: Number,
        data: Buffer,
      },
      resume: {
        filename: String,
        mimetype: String,
        size: Number,
        data: Buffer,
      },
    },
  },
  {
    timestamps: true,
  },
);

// One user can apply to a particular job only once.
JobApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
