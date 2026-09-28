const express = require("express");

const router = express.Router();

const {
  getAllJobsUser,
  getJobByIdUser,
  getJobsByCategory,
  getFeaturedJobs,
  getUrgentJobs,
  searchJobs,
  getJobStats,
  applyToJob,
  getMyApplications,
  saveJob,
  unsaveJob,
  getSavedJobs,
} = require("../controllers/jobController");

const { protect } = require("../middleware/auth");
const {
  uploadProfileFields,
  handleUploadError,
} = require("../middleware/upload");

// Public user routes
router.get("/", getAllJobsUser);

router.get("/search", searchJobs);

router.get("/featured", getFeaturedJobs);

router.get("/urgent", getUrgentJobs);

router.get("/stats", getJobStats);

router.get("/category/:slug", getJobsByCategory);

// Save Job
router.post("/:id/save", protect, saveJob);

// Unsave Job
router.delete("/:id/save", protect, unsaveJob);

router.get("/applications/my", protect, getMyApplications);

router.get("/saved", protect, getSavedJobs);

// Apply to job
router.post(
  "/:id/apply",
  protect,
  uploadProfileFields,
  handleUploadError,
  applyToJob,
);

// Get single job
router.get("/:id", getJobByIdUser);

module.exports = router;
