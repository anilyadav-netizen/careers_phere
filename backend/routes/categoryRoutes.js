const express = require('express');
const router = express.Router();
const {
  getAllCategoriesUser,
  getCategoryByIdUser,
  getCategoryBySlug,
  searchCategories
} = require('../controllers/categoryController');

// Public user routes
router.get('/', getAllCategoriesUser);
router.get('/search', searchCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryByIdUser);

module.exports = router;