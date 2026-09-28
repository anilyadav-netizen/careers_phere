const Category = require('../models/Category');
const { uploadToImgBB, deleteFromImgBB } = require('../utils/imgbb');

// ============ ADMIN CONTROLLERS ============

// @desc    Create category (Admin only)
// @route   POST /api/admin/categories
// @desc    Create category (Admin only)
// @route   POST /api/admin/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, shortDescription } = req.body;

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Category image is required'
      });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    // Upload image to ImgBB
    const uploadResult = await uploadToImgBB(
      req.file.buffer,
      req.file.originalname,
      { name: `category-${name}` }
    );

    // 🔥 Extract just the URL string from the upload result
    const imageUrl = uploadResult.data?.displayUrl ||
      uploadResult.data?.url ||
      uploadResult.data;

    // Create category with image URL string
    const category = await Category.create({
      name,
      shortDescription,
      image: imageUrl, // 👈 Now it's a string
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create category'
    });
  }
};

// @desc    Get all categories (Admin)
// @route   GET /api/admin/categories
exports.getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single category (Admin)
// @route   GET /api/admin/categories/:id
exports.getCategoryByIdAdmin = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update category (Admin)
// @route   PUT /api/admin/categories/:id
// @desc    Update category (Admin)
// @route   PUT /api/admin/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const { name, shortDescription, isActive } = req.body;

    // Find category
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check duplicate name
    if (name && name !== category.name) {
      const existing = await Category.findOne({ name });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists'
        });
      }
    }

    // Update fields
    if (name) category.name = name;
    if (shortDescription) category.shortDescription = shortDescription;
    if (isActive !== undefined) category.isActive = isActive;

    // Update image if new image uploaded
    if (req.file) {
      // Delete old image from ImgBB (if you want to keep this functionality)
      if (category.image && category.imagePublicId) {
        // You might need to store the deleteUrl in a separate field
        // For now, we'll just update the image URL
      }

      // Upload new image
      const uploadResult = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname,
        { name: `category-${name || category.name}` }
      );

      // 🔥 Extract just the URL string
      const imageUrl = uploadResult.data?.displayUrl ||
        uploadResult.data?.url ||
        uploadResult.data;

      category.image = imageUrl; // 👈 Now it's a string
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update category'
    });
  }
};

// @desc    Delete category (Admin)
// @route   DELETE /api/admin/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Delete image from ImgBB
    if (category.image && category.image.deleteUrl) {
      await deleteFromImgBB(category.image.deleteUrl);
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete category'
    });
  }
};

// @desc    Toggle category status (Active/Inactive)
// @route   PATCH /api/admin/categories/:id/toggle
exports.toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
      data: category
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============ USER CONTROLLERS ============

// @desc    Get all active categories (User)
// @route   GET /api/categories
exports.getAllCategoriesUser = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name slug shortDescription image jobCount")
      .sort({ jobCount: -1, name: 1 });

    const formattedCategories = categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      image: cat.image || null,
      jobCount: cat.jobCount,
      createdAt: cat.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: categories.length,
      data: formattedCategories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single category with details (User)
// @route   GET /api/categories/:id
exports.getCategoryByIdUser = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: category._id,
        name: category.name,
        slug: category.slug,
        shortDescription: category.shortDescription,
        image: category.image || null,
        jobCount: category.jobCount,
        createdAt: category.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get category by slug (User)
// @route   GET /api/categories/slug/:slug
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: category._id,
        name: category.name,
        slug: category.slug,
        shortDescription: category.shortDescription,
        image: category.image || null,
        jobCount: category.jobCount,
        createdAt: category.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search categories (User)
// @route   GET /api/categories/search
exports.searchCategories = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const categories = await Category.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } }
      ]
    });

    const formattedCategories = categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      image: cat.image || null,
      jobCount: cat.jobCount,
    }));
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: formattedCategories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};