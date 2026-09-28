const express = require('express');
const router = express.Router();
const {
    getAllGalleryUser,
    getGalleryByIdUser,
    getFeaturedGallery,
    getGalleryByCategory,
    searchGallery,
    getGalleryCategories
} = require('../controllers/galleryController');

// Public user routes
router.get('/', getAllGalleryUser);
router.get('/featured', getFeaturedGallery);
router.get('/categories', getGalleryCategories);
router.get('/search', searchGallery);
router.get('/category/:category', getGalleryByCategory);
router.get('/:id', getGalleryByIdUser);

module.exports = router;