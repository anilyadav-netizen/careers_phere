const express = require("express");
const router = express.Router();
const { getAllTestimonials } = require("../controllers/testimonialController");

// No auth needed - testimonials publicly visible on site
router.get("/", getAllTestimonials);

module.exports = router;
