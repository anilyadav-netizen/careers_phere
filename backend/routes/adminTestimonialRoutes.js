const express = require("express");
const router = express.Router();
const {
  getAllTestimonialsAdmin,
  getTestimonialByIdAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialActive,
} = require("../controllers/adminTestimonialController");
const { protect, admin } = require("../middleware/auth");
const { uploadWithField, handleUploadError } = require("../middleware/upload");

router.use(protect, admin);

router.get("/", getAllTestimonialsAdmin);
router.get("/:id", getTestimonialByIdAdmin);
router.post(
  "/",
  uploadWithField("image"),
  handleUploadError,
  createTestimonial,
);
router.put(
  "/:id",
  uploadWithField("image"),
  handleUploadError,
  updateTestimonial,
);
router.delete("/:id", deleteTestimonial);
router.patch("/:id/toggle-active", toggleTestimonialActive);

module.exports = router;
