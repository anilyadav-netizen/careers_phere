const express = require("express");
const router = express.Router();

const {
  getPublicOpportunities,
  getOpportunityById,
  createOpportunity,
  getAllOpportunitiesAdmin,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityStatsAdmin,
} = require("../controllers/roleOpportunityController");

const { protectAdmin } = require("../middleware/adminAuth");
const { uploadWithField, handleUploadError } = require("../middleware/upload");

// Middleware to accept companyLogo file
const uploadLogo = uploadWithField("companyLogo");

// ============================================================
// PUBLIC ROUTES
// ============================================================

// Get public opportunities (filtered by roleCategory, country, search)
router.get("/", getPublicOpportunities);

// ============================================================
// ADMIN PROTECTED ROUTES
// ============================================================

// Admin stats
router.get("/admin/stats", protectAdmin, getOpportunityStatsAdmin);

// Admin get all opportunities with pagination & filters
router.get("/admin/all", protectAdmin, getAllOpportunitiesAdmin);

// Create new opportunity with company logo
router.post(
  "/",
  protectAdmin,
  uploadLogo,
  handleUploadError,
  createOpportunity
);

// Update opportunity
router.put(
  "/:id",
  protectAdmin,
  uploadLogo,
  handleUploadError,
  updateOpportunity
);

// Delete opportunity
router.delete("/:id", protectAdmin, deleteOpportunity);

// Get single opportunity by ID (public / admin)
router.get("/:id", getOpportunityById);

module.exports = router;
