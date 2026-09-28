const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { uploadProfileFields } = require("../middleware/upload");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.put("/update/profile", protect, uploadProfileFields, updateProfile);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);
router.post("/logout", protect, logout);

module.exports = router;
