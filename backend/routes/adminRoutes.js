const express = require("express");

const router = express.Router();

const {
  createCategory,
  getAllCategoriesAdmin,
  getCategoryByIdAdmin,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} = require("../controllers/categoryController");

const {
  createJobType,
  getAllJobTypesAdmin,
  getJobTypeByIdAdmin,
  updateJobType,
  deleteJobType,
  toggleJobTypeStatus,
} = require("../controllers/jobTypeController");

const {
  createJob,
  getAllJobsAdmin,
  getJobByIdAdmin,
  updateJob,
  deleteJob,
  toggleJobStatus,
  toggleFeatured,
  toggleUrgent,
  getJobApplicationsAdmin,
  getAllApplicationsAdmin,
  getApplicationByIdAdmin,
  downloadApplicationResume,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/jobController");

const {
  createSubscription,
  getAllSubscriptionsAdmin,
  getSubscriptionByIdAdmin,
  updateSubscription,
  deleteSubscription,
  toggleSubscriptionStatus,
} = require("../controllers/subscriptionController");

const {
  getAllUserSubscriptionsAdmin,
  getUserSubscriptionByIdAdmin,
} = require("../controllers/userSubscriptionController");

const {
  createGalleryImage,
  getAllGalleryAdmin,
  getGalleryByIdAdmin,
  updateGalleryImage,
  deleteGalleryImage,
  toggleGalleryStatus,
  toggleGalleryFeatured,
  bulkDeleteGallery,
  getGalleryStats,
} = require("../controllers/galleryController");

const {
  getAllUsersAdmin,
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  toggleUserActive,
  toggleUserVerified,
  bulkDeleteUsers,
  getUserStats,
} = require("../controllers/adminUserController");

const { protectAdmin } = require("../middleware/adminAuth");
const { uploadImage, handleUploadError } = require("../middleware/upload");

// DEBUG
console.log("===== ADMIN ROUTE HANDLERS =====");
console.log("createCategory:", typeof createCategory);
console.log("createJob:", typeof createJob);
console.log("createSubscription:", typeof createSubscription);
console.log("createGalleryImage:", typeof createGalleryImage);
console.log("uploadImage:", typeof uploadImage);
console.log("handleUploadError:", typeof handleUploadError);
console.log("================================");

// All routes require admin authentication
router.use(protectAdmin);

// ============ CATEGORY MANAGEMENT ============

router.post("/categories", uploadImage, handleUploadError, createCategory);
router.get("/categories", getAllCategoriesAdmin);
router.get("/categories/:id", getCategoryByIdAdmin);
router.put("/categories/:id", uploadImage, handleUploadError, updateCategory);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id/toggle", toggleCategoryStatus);

// ============ JOB TYPE MANAGEMENT ============

router.post("/job-types", createJobType);
router.get("/job-types", getAllJobTypesAdmin);
router.get("/job-types/:id", getJobTypeByIdAdmin);
router.put("/job-types/:id", updateJobType);
router.delete("/job-types/:id", deleteJobType);
router.patch("/job-types/:id/toggle", toggleJobTypeStatus);

// ============ JOB MANAGEMENT ============

router.post("/jobs", uploadImage, handleUploadError, createJob);
router.get("/jobs", getAllJobsAdmin);
router.get("/jobs/:id", getJobByIdAdmin);
router.put("/jobs/:id", uploadImage, handleUploadError, updateJob);
router.delete("/jobs/:id", deleteJob);
router.patch("/jobs/:id/toggle-status", toggleJobStatus);
router.patch("/jobs/:id/toggle-featured", toggleFeatured);
router.patch("/jobs/:id/toggle-urgent", toggleUrgent);

router.get("/applications", getAllApplicationsAdmin);
router.get("/applications/:id", getApplicationByIdAdmin);
router.get("/applications/:id/resume", downloadApplicationResume);
router.get("/:id/applications", getJobApplicationsAdmin);
router.patch("/applications/:id/status", updateApplicationStatus);
router.delete("/applications/:id", deleteApplication);

// ============ SUBSCRIPTION MANAGEMENT ============

router.post("/subscriptions", createSubscription);
router.get("/subscriptions", getAllSubscriptionsAdmin);
router.get("/subscriptions/:id", getSubscriptionByIdAdmin);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", deleteSubscription);
router.patch("/subscriptions/:id/toggle", toggleSubscriptionStatus);

// ============ USER SUBSCRIPTION MANAGEMENT ============

router.get("/user-subscriptions", getAllUserSubscriptionsAdmin);
router.get("/user-subscriptions/:id", getUserSubscriptionByIdAdmin);

// ============ GALLERY MANAGEMENT ============

router.post("/gallery", uploadImage, handleUploadError, createGalleryImage);
router.get("/gallery", getAllGalleryAdmin);
router.get("/gallery/stats", getGalleryStats);
router.get("/gallery/:id", getGalleryByIdAdmin);
router.put("/gallery/:id", uploadImage, handleUploadError, updateGalleryImage);
router.delete("/gallery/:id", deleteGalleryImage);
router.patch("/gallery/:id/toggle", toggleGalleryStatus);
router.patch("/gallery/:id/toggle-featured", toggleGalleryFeatured);
router.delete("/gallery/bulk", bulkDeleteGallery);

// ============ USER MANAGEMENT ============

router.get("/users", getAllUsersAdmin);
router.get("/users/stats", getUserStats);
router.get("/users/:id", getUserByIdAdmin);
router.put("/users/:id", updateUserAdmin);
router.delete("/users/:id", deleteUserAdmin);

// router.patch("/users/:id/toggle-active", toggleUserActive);
// router.patch("/users/:id/toggle-verified", toggleUserVerified);

router.delete("/users/bulk", bulkDeleteUsers);

module.exports = router;