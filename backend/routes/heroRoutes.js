const express = require("express");
const router = express.Router();
const {
  getActiveHeroBanners,
  getHeroSection,
} = require("../controllers/heroController");

// Public routes to fetch active hero banners
router.get("/", getActiveHeroBanners);
router.get("/banners", getActiveHeroBanners);
router.get("/single", getHeroSection);

module.exports = router;
