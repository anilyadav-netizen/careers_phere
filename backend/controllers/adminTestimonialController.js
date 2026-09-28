const Testimonial = require("../models/Testimonial");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// @desc    Get all testimonials (admin - includes inactive)
// @route   GET /api/admin/testimonials
exports.getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// @desc    Get single testimonial (admin)
// @route   GET /api/admin/testimonials/:id
exports.getTestimonialByIdAdmin = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
      error: error.message,
    });
  }
};

// @desc    Create testimonial
// @route   POST /api/admin/testimonials
exports.createTestimonial = async (req, res) => {
  try {
    const { name, country, review, rating, isActive, order } = req.body;

    if (!name || !country || !review) {
      return res.status(400).json({
        success: false,
        message: "name, country and review are required",
      });
    }

    const imageFile = req.file; // uploadWithField('image') => req.file, not req.files

    let imageData = {};

    if (imageFile) {
      try {
        const uploadResult = await uploadToImgBB(
          imageFile.buffer,
          imageFile.originalname,
        );

        const img = uploadResult.data;

        imageData = {
          url: img.url,
          displayUrl: img.displayUrl,
          deleteUrl: img.deleteUrl,
          thumb: img.thumb,
          filename: img.filename,
          size: img.size,
          imgbbId: img.id,
        };
      } catch (uploadError) {
        console.error("Testimonial image upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload testimonial image: " + uploadError.message,
        });
      }
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      country: country.trim(),
      review: review.trim(),
      image: imageData,
      rating: rating !== undefined ? rating : 5,
      isActive: isActive !== undefined ? isActive : true,
      order: order !== undefined ? order : 0,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/admin/testimonials/:id
exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const { name, country, review, rating, isActive, order } = req.body;

    if (name !== undefined) testimonial.name = String(name).trim();
    if (country !== undefined) testimonial.country = String(country).trim();
    if (review !== undefined) testimonial.review = String(review).trim();
    if (rating !== undefined) testimonial.rating = rating;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (order !== undefined) testimonial.order = order;

    const imageFile = req.file;

    if (imageFile) {
      // delete old image from ImgBB first
      if (testimonial.image && testimonial.image.deleteUrl) {
        try {
          await deleteFromImgBB(testimonial.image.deleteUrl);
        } catch (error) {
          console.error("Old testimonial image delete error:", error.message);
        }
      }

      try {
        const uploadResult = await uploadToImgBB(
          imageFile.buffer,
          imageFile.originalname,
        );

        const img = uploadResult.data;

        testimonial.image = {
          url: img.url,
          displayUrl: img.displayUrl,
          deleteUrl: img.deleteUrl,
          thumb: img.thumb,
          filename: img.filename,
          size: img.size,
          imgbbId: img.id,
        };
      } catch (uploadError) {
        console.error("Testimonial image upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload testimonial image: " + uploadError.message,
        });
      }
    }

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/admin/testimonials/:id
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // delete image from ImgBB too, taaki orphan images na reh jaayein
    if (testimonial.image && testimonial.image.deleteUrl) {
      try {
        await deleteFromImgBB(testimonial.image.deleteUrl);
      } catch (error) {
        console.error("Testimonial image delete error:", error.message);
      }
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

// @desc    Toggle testimonial active/inactive
// @route   PATCH /api/admin/testimonials/:id/toggle-active
exports.toggleTestimonialActive = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: `Testimonial ${testimonial.isActive ? "activated" : "deactivated"} successfully`,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to toggle testimonial status",
      error: error.message,
    });
  }
};
