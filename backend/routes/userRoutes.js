const express = require('express');
const router = express.Router();
const { uploadProfilePicture } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const {
    uploadImage,  // Same universal middleware
    handleUploadError
} = require('../middleware/upload');

// Protected routes
router.post(
    '/profile-picture',
    protect,
    uploadImage,
    handleUploadError,
    uploadProfilePicture
);

module.exports = router;