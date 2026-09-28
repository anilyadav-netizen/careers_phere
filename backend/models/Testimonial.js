const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    image: {
      type: Object,
      default: {}, // { url, displayUrl, deleteUrl, thumb, filename, size, imgbbId }
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true, // admin can hide without deleting
    },
    order: {
      type: Number,
      default: 0, // for sorting on frontend
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

TestimonialSchema.index({ isActive: 1 });

module.exports = mongoose.model("Testimonial", TestimonialSchema);
