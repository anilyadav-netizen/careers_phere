const express = require("express");
const router = express.Router();

const {
  submitApplication,
  getAllApplications,
  getApplicationStats,
  getApplicationById,
  downloadResume,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/frontendApplicationController");

const { protectAdmin } = require("../middleware/adminAuth");
const { uploadResume, handleUploadError } = require("../middleware/upload");

// ============================================================
// PUBLIC ROUTES
// ============================================================

// Submit frontend application with resume upload
router.post("/", uploadResume, handleUploadError, submitApplication);
router.post("/apply", uploadResume, handleUploadError, submitApplication);

// Download / view resume
router.get("/:id/resume", downloadResume);

// ============================================================
// ADMIN PROTECTED ROUTES
// ============================================================

router.get("/", protectAdmin, getAllApplications);
router.get("/stats", protectAdmin, getApplicationStats);
router.get("/:id", protectAdmin, getApplicationById);
router.patch("/:id/status", protectAdmin, updateApplicationStatus);
router.put("/:id/status", protectAdmin, updateApplicationStatus);
router.delete("/:id", protectAdmin, deleteApplication);

module.exports = router;
