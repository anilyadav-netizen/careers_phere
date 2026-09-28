const mongoose = require("mongoose");
const Gallery = require("../models/Gallery");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Convert any ImgBB image field into a string URL
const getImageUrl = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "object") {
        return (
            value.url ||
            value.display_url ||
            value.displayUrl ||
            value.image?.url ||
            ""
        );
    }

    return "";
};


// Normalize ImgBB response according to Gallery schema
const normalizeImageData = (img, reqFile = null) => {
    if (!img) {
        return null;
    }

    return {
        url: getImageUrl(img.url),

        displayUrl:
            getImageUrl(img.displayUrl) ||
            getImageUrl(img.display_url) ||
            getImageUrl(img.url),

        deleteUrl: getImageUrl(img.deleteUrl),

        thumb:
            getImageUrl(img.thumb) ||
            getImageUrl(img.thumbnail),

        medium:
            getImageUrl(img.medium),

        filename:
            typeof img.filename === "string"
                ? img.filename
                : reqFile?.originalname || "",

        size:
            typeof img.size === "number"
                ? img.size
                : reqFile?.size || undefined,

        width:
            typeof img.width === "number"
                ? img.width
                : undefined,

        height:
            typeof img.height === "number"
                ? img.height
                : undefined,

        imgbbId:
            typeof img.imgbbId === "string"
                ? img.imgbbId
                : typeof img.id === "string"
                    ? img.id
                    : ""
    };
};


// Parse tags safely
const parseTags = (tags) => {
    if (!tags) {
        return [];
    }

    if (Array.isArray(tags)) {
        return tags;
    }

    if (typeof tags === "string") {
        try {
            const parsed = JSON.parse(tags);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (error) {
            // If JSON parsing fails, treat it as comma separated
        }

        return tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    return [];
};


// ============================================================
// ADMIN CONTROLLERS
// ============================================================


// @desc    Create gallery image
// @route   POST /api/admin/gallery
exports.createGalleryImage = async (req, res) => {
    try {
        const {
            heading,
            subHeading,
            category,
            isFeatured,
            altText,
            tags,
            sortOrder
        } = req.body;


        // --------------------------------------------------------
        // Validate image
        // --------------------------------------------------------

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }


        // --------------------------------------------------------
        // Validate required text fields
        // --------------------------------------------------------

        if (!heading || !heading.trim()) {
            return res.status(400).json({
                success: false,
                message: "Heading is required"
            });
        }

        if (!subHeading || !subHeading.trim()) {
            return res.status(400).json({
                success: false,
                message: "SubHeading is required"
            });
        }


        // --------------------------------------------------------
        // Upload image to ImgBB
        // --------------------------------------------------------

        const uploadResult = await uploadToImgBB(
            req.file.buffer,
            req.file.originalname,
            {
                name: `gallery-${heading || "image"}`
            }
        );


        // --------------------------------------------------------
        // Validate ImgBB response
        // --------------------------------------------------------

        if (!uploadResult || !uploadResult.data) {
            return res.status(500).json({
                success: false,
                message: "Invalid response from ImgBB"
            });
        }


        const imageData = normalizeImageData(
            uploadResult.data,
            req.file
        );


        if (!imageData || !imageData.url) {
            console.error(
                "Invalid ImgBB image data:",
                uploadResult.data
            );

            return res.status(500).json({
                success: false,
                message: "Image upload failed: URL not received from ImgBB"
            });
        }


        // --------------------------------------------------------
        // Parse tags
        // --------------------------------------------------------

        const parsedTags = parseTags(tags);


        // --------------------------------------------------------
        // Create gallery document
        // --------------------------------------------------------

        const galleryImage = await Gallery.create({
            image: imageData,

            heading: heading.trim(),

            subHeading: subHeading.trim(),

            category: category || "Workplace",

            isFeatured:
                isFeatured === true ||
                isFeatured === "true",

            altText:
                altText && altText.trim()
                    ? altText.trim()
                    : heading.trim(),

            tags: parsedTags,

            sortOrder:
                sortOrder !== undefined
                    ? Number(sortOrder) || 0
                    : 0,

            createdBy: req.user?._id
        });


        // --------------------------------------------------------
        // Response
        // --------------------------------------------------------

        return res.status(201).json({
            success: true,
            message: "Gallery image added successfully",
            data: galleryImage
        });

    } catch (error) {

        console.error(
            "Create gallery image error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to add gallery image"
        });
    }
};



// ============================================================
// GET ALL GALLERY - ADMIN
// ============================================================


// @desc    Get all gallery images (Admin)
// @route   GET /api/admin/gallery
exports.getAllGalleryAdmin = async (req, res) => {
    try {

        const {
            category,
            isActive,
            isFeatured,
            search
        } = req.query;


        const filter = {};


        if (category) {
            filter.category = category;
        }


        if (isActive !== undefined) {
            filter.isActive = isActive === "true";
        }


        if (isFeatured !== undefined) {
            filter.isFeatured = isFeatured === "true";
        }


        if (search) {

            filter.$or = [
                {
                    heading: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    subHeading: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }


        const galleryImages = await Gallery.find(filter)
            .populate("createdBy", "name email")
            .sort({
                sortOrder: 1,
                createdAt: -1
            });


        return res.status(200).json({
            success: true,
            count: galleryImages.length,
            data: galleryImages
        });

    } catch (error) {

        console.error(
            "Get all gallery admin error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery images"
        });
    }
};



// ============================================================
// GET SINGLE GALLERY - ADMIN
// ============================================================


// @desc    Get single gallery image (Admin)
// @route   GET /api/admin/gallery/:id
exports.getGalleryByIdAdmin = async (req, res) => {
    try {

        const galleryImage = await Gallery.findById(
            req.params.id
        ).populate(
            "createdBy",
            "name email"
        );


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found"
            });
        }


        return res.status(200).json({
            success: true,
            data: galleryImage
        });

    } catch (error) {

        console.error(
            "Get gallery by id admin error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery image"
        });
    }
};



// ============================================================
// UPDATE GALLERY - ADMIN
// ============================================================


// @desc    Update gallery image (Admin)
// @route   PUT /api/admin/gallery/:id
exports.updateGalleryImage = async (req, res) => {
    try {

        const galleryImage = await Gallery.findById(
            req.params.id
        );


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found"
            });
        }


        const {
            heading,
            subHeading,
            category,
            isActive,
            isFeatured,
            altText,
            tags,
            sortOrder
        } = req.body;


        // --------------------------------------------------------
        // Update text fields
        // --------------------------------------------------------

        if (heading !== undefined) {
            galleryImage.heading = heading.trim();
        }


        if (subHeading !== undefined) {
            galleryImage.subHeading =
                subHeading.trim();
        }


        if (category !== undefined) {
            galleryImage.category = category;
        }


        if (isActive !== undefined) {
            galleryImage.isActive =
                isActive === true ||
                isActive === "true";
        }


        if (isFeatured !== undefined) {
            galleryImage.isFeatured =
                isFeatured === true ||
                isFeatured === "true";
        }


        if (altText !== undefined) {
            galleryImage.altText =
                altText.trim();
        }


        if (sortOrder !== undefined) {
            galleryImage.sortOrder =
                Number(sortOrder) || 0;
        }


        // --------------------------------------------------------
        // Update tags
        // --------------------------------------------------------

        if (tags !== undefined) {
            galleryImage.tags = parseTags(tags);
        }


        // --------------------------------------------------------
        // Update image if new image uploaded
        // --------------------------------------------------------

        if (req.file) {

            // Delete old image from ImgBB
            if (
                galleryImage.image &&
                galleryImage.image.deleteUrl
            ) {

                try {

                    await deleteFromImgBB(
                        galleryImage.image.deleteUrl
                    );

                } catch (deleteError) {

                    console.error(
                        "Old ImgBB image delete error:",
                        deleteError
                    );

                    // Don't stop update if delete fails
                }
            }


            // Upload new image
            const uploadResult =
                await uploadToImgBB(
                    req.file.buffer,
                    req.file.originalname,
                    {
                        name:
                            `gallery-${
                                heading ||
                                galleryImage.heading ||
                                "image"
                            }`
                    }
                );


            if (
                !uploadResult ||
                !uploadResult.data
            ) {
                return res.status(500).json({
                    success: false,
                    message:
                        "Invalid response from ImgBB"
                });
            }


            // IMPORTANT:
            // Normalize ImgBB response before saving
            const imageData =
                normalizeImageData(
                    uploadResult.data,
                    req.file
                );


            if (
                !imageData ||
                !imageData.url
            ) {

                console.error(
                    "Invalid ImgBB image data:",
                    uploadResult.data
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Image upload failed: URL not received from ImgBB"
                });
            }


            galleryImage.image = imageData;
        }


        // --------------------------------------------------------
        // Save
        // --------------------------------------------------------

        await galleryImage.save();


        return res.status(200).json({
            success: true,
            message:
                "Gallery image updated successfully",
            data: galleryImage
        });

    } catch (error) {

        console.error(
            "Update gallery image error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to update gallery image"
        });
    }
};



// ============================================================
// DELETE GALLERY - ADMIN
// ============================================================


// @desc    Delete gallery image (Admin)
// @route   DELETE /api/admin/gallery/:id
exports.deleteGalleryImage = async (req, res) => {
    try {

        const galleryImage = await Gallery.findById(
            req.params.id
        );


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found"
            });
        }


        // Delete image from ImgBB
        if (
            galleryImage.image &&
            galleryImage.image.deleteUrl
        ) {

            try {

                await deleteFromImgBB(
                    galleryImage.image.deleteUrl
                );

            } catch (deleteError) {

                console.error(
                    "ImgBB delete error:",
                    deleteError
                );
            }
        }


        await galleryImage.deleteOne();


        return res.status(200).json({
            success: true,
            message:
                "Gallery image deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete gallery image error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to delete gallery image"
        });
    }
};



// ============================================================
// TOGGLE ACTIVE STATUS
// ============================================================


// @desc    Toggle gallery image active status
// @route   PATCH /api/admin/gallery/:id/toggle
exports.toggleGalleryStatus = async (req, res) => {
    try {

        const galleryImage = await Gallery.findById(
            req.params.id
        );


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found"
            });
        }


        galleryImage.isActive =
            !galleryImage.isActive;


        await galleryImage.save();


        return res.status(200).json({
            success: true,
            message:
                `Gallery image ${
                    galleryImage.isActive
                        ? "activated"
                        : "deactivated"
                } successfully`,
            data: galleryImage
        });

    } catch (error) {

        console.error(
            "Toggle gallery status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to toggle gallery status"
        });
    }
};



// ============================================================
// TOGGLE FEATURED
// ============================================================


// @desc    Toggle gallery image featured status
// @route   PATCH /api/admin/gallery/:id/toggle-featured
exports.toggleGalleryFeatured = async (req, res) => {
    try {

        const galleryImage = await Gallery.findById(
            req.params.id
        );


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found"
            });
        }


        galleryImage.isFeatured =
            !galleryImage.isFeatured;


        await galleryImage.save();


        return res.status(200).json({
            success: true,
            message:
                `Gallery image ${
                    galleryImage.isFeatured
                        ? "featured"
                        : "unfeatured"
                } successfully`,
            data: galleryImage
        });

    } catch (error) {

        console.error(
            "Toggle gallery featured error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to toggle featured status"
        });
    }
};



// ============================================================
// BULK DELETE
// ============================================================


// @desc    Bulk delete gallery images
// @route   DELETE /api/admin/gallery/bulk
exports.bulkDeleteGallery = async (req, res) => {
    try {

        const { ids } = req.body;


        if (
            !ids ||
            !Array.isArray(ids) ||
            ids.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide an array of image IDs"
            });
        }


        // Validate MongoDB IDs
        const validIds = ids.filter((id) =>
            mongoose.Types.ObjectId.isValid(id)
        );


        if (validIds.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No valid image IDs provided"
            });
        }


        // Get gallery images
        const galleryImages =
            await Gallery.find({
                _id: {
                    $in: validIds
                }
            });


        // Delete images from ImgBB
        for (const image of galleryImages) {

            if (
                image.image &&
                image.image.deleteUrl
            ) {

                try {

                    await deleteFromImgBB(
                        image.image.deleteUrl
                    );

                } catch (deleteError) {

                    console.error(
                        `ImgBB delete error for ${image._id}:`,
                        deleteError
                    );
                }
            }
        }


        // Delete from database
        await Gallery.deleteMany({
            _id: {
                $in: validIds
            }
        });


        return res.status(200).json({
            success: true,
            message:
                `${galleryImages.length} gallery image(s) deleted successfully`
        });

    } catch (error) {

        console.error(
            "Bulk delete gallery error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to delete gallery images"
        });
    }
};



// ============================================================
// GALLERY STATISTICS - ADMIN
// ============================================================


// @desc    Get gallery statistics
// @route   GET /api/admin/gallery/stats
exports.getGalleryStats = async (req, res) => {
    try {

        const totalImages =
            await Gallery.countDocuments();


        const activeImages =
            await Gallery.countDocuments({
                isActive: true
            });


        const featuredImages =
            await Gallery.countDocuments({
                isFeatured: true
            });


        // Category wise count
        const categoryStats =
            await Gallery.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                }
            ]);


        return res.status(200).json({
            success: true,
            data: {
                totalImages,
                activeImages,
                featuredImages,
                categoryStats
            }
        });

    } catch (error) {

        console.error(
            "Get gallery stats error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery statistics"
        });
    }
};



// ============================================================
// USER CONTROLLERS
// ============================================================


// @desc    Get all active gallery images
// @route   GET /api/gallery
exports.getAllGalleryUser = async (req, res) => {
    try {

        const {
            category,
            limit = 20,
            page = 1
        } = req.query;


        const parsedLimit =
            Math.max(
                parseInt(limit) || 20,
                1
            );


        const parsedPage =
            Math.max(
                parseInt(page) || 1,
                1
            );


        const filter = {
            isActive: true
        };


        if (category) {
            filter.category = category;
        }


        const skip =
            (parsedPage - 1) *
            parsedLimit;


        const galleryImages =
            await Gallery.find(filter)
                .select(
                    "image heading subHeading category isFeatured createdAt altText tags"
                )
                .sort({
                    isFeatured: -1,
                    sortOrder: 1,
                    createdAt: -1
                })
                .skip(skip)
                .limit(parsedLimit);


        const total =
            await Gallery.countDocuments(filter);


        const formattedData =
            galleryImages.map((item) => ({
                id: item._id,

                image:
                    item.image?.displayUrl ||
                    item.image?.url ||
                    null,

                heading: item.heading,

                subHeading:
                    item.subHeading,

                category:
                    item.category,

                isFeatured:
                    item.isFeatured,

                createdAt:
                    item.createdAt,

                altText:
                    item.altText ||
                    item.heading,

                tags:
                    item.tags || []
            }));


        return res.status(200).json({
            success: true,
            count: galleryImages.length,
            total,
            page: parsedPage,
            totalPages:
                Math.ceil(
                    total / parsedLimit
                ),
            data: formattedData
        });

    } catch (error) {

        console.error(
            "Get all gallery user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery images"
        });
    }
};



// ============================================================
// GET SINGLE GALLERY - USER
// ============================================================


// @desc    Get single gallery image
// @route   GET /api/gallery/:id
exports.getGalleryByIdUser = async (req, res) => {
    try {

        const galleryImage =
            await Gallery.findOne({
                _id: req.params.id,
                isActive: true
            });


        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message:
                    "Gallery image not found"
            });
        }


        // Increment views
        galleryImage.views =
            (galleryImage.views || 0) + 1;


        await galleryImage.save();


        return res.status(200).json({
            success: true,
            data: {

                id: galleryImage._id,

                image:
                    galleryImage.image?.displayUrl ||
                    galleryImage.image?.url ||
                    null,

                heading:
                    galleryImage.heading,

                subHeading:
                    galleryImage.subHeading,

                category:
                    galleryImage.category,

                isFeatured:
                    galleryImage.isFeatured,

                createdAt:
                    galleryImage.createdAt,

                altText:
                    galleryImage.altText ||
                    galleryImage.heading,

                tags:
                    galleryImage.tags || [],

                views:
                    galleryImage.views
            }
        });

    } catch (error) {

        console.error(
            "Get gallery by id user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery image"
        });
    }
};



// ============================================================
// FEATURED GALLERY
// ============================================================


// @desc    Get featured gallery images
// @route   GET /api/gallery/featured
exports.getFeaturedGallery = async (req, res) => {
    try {

        const {
            limit = 6
        } = req.query;


        const parsedLimit =
            Math.max(
                parseInt(limit) || 6,
                1
            );


        const galleryImages =
            await Gallery.find({
                isActive: true,
                isFeatured: true
            })
                .select(
                    "image heading subHeading category createdAt altText"
                )
                .sort({
                    sortOrder: 1,
                    createdAt: -1
                })
                .limit(parsedLimit);


        const formattedData =
            galleryImages.map((item) => ({
                id: item._id,

                image:
                    item.image?.displayUrl ||
                    item.image?.url ||
                    null,

                heading:
                    item.heading,

                subHeading:
                    item.subHeading,

                category:
                    item.category,

                createdAt:
                    item.createdAt,

                altText:
                    item.altText ||
                    item.heading
            }));


        return res.status(200).json({
            success: true,
            count: formattedData.length,
            data: formattedData
        });

    } catch (error) {

        console.error(
            "Get featured gallery error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch featured gallery images"
        });
    }
};



// ============================================================
// GALLERY BY CATEGORY
// ============================================================


// @desc    Get gallery by category
// @route   GET /api/gallery/category/:category
exports.getGalleryByCategory = async (req, res) => {
    try {

        const {
            category
        } = req.params;


        const {
            limit = 20,
            page = 1
        } = req.query;


        const parsedLimit =
            Math.max(
                parseInt(limit) || 20,
                1
            );


        const parsedPage =
            Math.max(
                parseInt(page) || 1,
                1
            );


        const filter = {
            isActive: true,
            category: category
        };


        const skip =
            (parsedPage - 1) *
            parsedLimit;


        const galleryImages =
            await Gallery.find(filter)
                .select(
                    "image heading subHeading category isFeatured createdAt altText"
                )
                .sort({
                    isFeatured: -1,
                    sortOrder: 1,
                    createdAt: -1
                })
                .skip(skip)
                .limit(parsedLimit);


        const total =
            await Gallery.countDocuments(
                filter
            );


        const formattedData =
            galleryImages.map((item) => ({
                id: item._id,

                image:
                    item.image?.displayUrl ||
                    item.image?.url ||
                    null,

                heading:
                    item.heading,

                subHeading:
                    item.subHeading,

                category:
                    item.category,

                isFeatured:
                    item.isFeatured,

                createdAt:
                    item.createdAt,

                altText:
                    item.altText ||
                    item.heading
            }));


        return res.status(200).json({
            success: true,
            count: formattedData.length,
            total,
            page: parsedPage,
            totalPages:
                Math.ceil(
                    total / parsedLimit
                ),
            category,
            data: formattedData
        });

    } catch (error) {

        console.error(
            "Get gallery by category error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery images by category"
        });
    }
};



// ============================================================
// SEARCH GALLERY
// ============================================================


// @desc    Search gallery images
// @route   GET /api/gallery/search
exports.searchGallery = async (req, res) => {
    try {

        const {
            q,
            limit = 20,
            page = 1
        } = req.query;


        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Search query is required"
            });
        }


        const parsedLimit =
            Math.max(
                parseInt(limit) || 20,
                1
            );


        const parsedPage =
            Math.max(
                parseInt(page) || 1,
                1
            );


        const searchQuery =
            q.trim();


        const filter = {
            isActive: true,

            $or: [

                {
                    heading: {
                        $regex: searchQuery,
                        $options: "i"
                    }
                },

                {
                    subHeading: {
                        $regex: searchQuery,
                        $options: "i"
                    }
                },

                {
                    category: {
                        $regex: searchQuery,
                        $options: "i"
                    }
                },

                {
                    tags: {
                        $in: [
                            new RegExp(
                                searchQuery,
                                "i"
                            )
                        ]
                    }
                }
            ]
        };


        const skip =
            (parsedPage - 1) *
            parsedLimit;


        const galleryImages =
            await Gallery.find(filter)
                .select(
                    "image heading subHeading category isFeatured createdAt altText"
                )
                .sort({
                    isFeatured: -1,
                    createdAt: -1
                })
                .skip(skip)
                .limit(parsedLimit);


        const total =
            await Gallery.countDocuments(
                filter
            );


        const formattedData =
            galleryImages.map((item) => ({
                id: item._id,

                image:
                    item.image?.displayUrl ||
                    item.image?.url ||
                    null,

                heading:
                    item.heading,

                subHeading:
                    item.subHeading,

                category:
                    item.category,

                isFeatured:
                    item.isFeatured,

                createdAt:
                    item.createdAt,

                altText:
                    item.altText ||
                    item.heading
            }));


        return res.status(200).json({
            success: true,
            count: formattedData.length,
            total,
            page: parsedPage,
            totalPages:
                Math.ceil(
                    total / parsedLimit
                ),
            query: searchQuery,
            data: formattedData
        });

    } catch (error) {

        console.error(
            "Search gallery error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to search gallery images"
        });
    }
};



// ============================================================
// GALLERY CATEGORIES
// ============================================================


// @desc    Get gallery categories with counts
// @route   GET /api/gallery/categories
exports.getGalleryCategories = async (req, res) => {
    try {

        const categories =
            await Gallery.aggregate([

                {
                    $match: {
                        isActive: true
                    }
                },

                {
                    $group: {

                        _id: "$category",

                        count: {
                            $sum: 1
                        },

                        images: {
                            $push: "$$ROOT"
                        }
                    }
                },

                {
                    $project: {

                        category: "$_id",

                        count: 1,

                        thumbnail: {
                            $let: {
                                vars: {
                                    firstImage: {
                                        $arrayElemAt: [
                                            "$images",
                                            0
                                        ]
                                    }
                                },

                                in: {
                                    $ifNull: [
                                        "$$firstImage.image.displayUrl",
                                        "$$firstImage.image.url"
                                    ]
                                }
                            }
                        }
                    }
                },

                {
                    $sort: {
                        count: -1
                    }
                }
            ]);


        return res.status(200).json({
            success: true,
            count: categories.length,

            data: categories.map((cat) => ({
                name: cat.category,

                count: cat.count,

                thumbnail:
                    cat.thumbnail || null
            }))
        });

    } catch (error) {

        console.error(
            "Get gallery categories error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch gallery categories"
        });
    }
};
