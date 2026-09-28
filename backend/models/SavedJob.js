const mongoose = require("mongoose");

const SavedJobSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ek user ek job ko sirf ek baar save kar sake
SavedJobSchema.index({ job: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("SavedJob", SavedJobSchema);