const HeroBanner = require("../models/HeroBanner");
const HeroSection = require("../models/HeroSection");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// Initial curated seed banners if none exist in database
const DEFAULT_BANNERS = [
  {
    title: "Career Nova International — Build Your Global Career Beyond Borders",
    description:
      "Discover verified international career opportunities from trusted companies worldwide. Get matched with top global employers and take your career to the country you've always dreamed of.",
    badgeText: "Global Jobs • 50+ Countries",
    location: "Global / Remote",
    highlightTag: "Company Sponsored",
    image: {
      url: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85",
      displayUrl: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85",
    },
    primaryButtonText: "Explore Jobs",
    primaryButtonUrl: "/jobs",
    secondaryButtonText: "Learn More",
    secondaryButtonUrl: "/about",
    order: 1,
    isActive: true,
  },
  {
    title: "Build Your Global Career in America with Visa & Travel Support",
    description:
      "Explore global career opportunities designed to help you start your journey, with selected roles open to international applicants and visa assistance.",
    badgeText: "Global Career Opportunity",
    location: "New York, USA",
    highlightTag: "Company Sponsored",
    image: {
      url: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85",
      displayUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85",
    },
    primaryButtonText: "Explore Jobs",
    primaryButtonUrl: "/jobs",
    secondaryButtonText: "About Us",
    secondaryButtonUrl: "/about",
    order: 2,
    isActive: true,
  },
  {
    title: "Unlock Global Career Opportunities in Australia & APAC",
    description:
      "Take the next step toward an international career with high-growth technology and corporate employers across Sydney, Melbourne, and Brisbane.",
    badgeText: "Fast Track Migration",
    location: "Sydney, Australia",
    highlightTag: "Visa Assistance",
    image: {
      url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2000&q=85",
      displayUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2000&q=85",
    },
    primaryButtonText: "Find Roles",
    primaryButtonUrl: "/jobs",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact",
    order: 3,
    isActive: true,
  },
  {
    title: "Launch Your Professional Career in Canada with Relocation Support",
    description:
      "Connect with Canadian employers actively seeking engineering, digital, and healthcare talent. Access verified international job listings today.",
    badgeText: "International Talent",
    location: "Toronto, Canada",
    highlightTag: "Relocation Support",
    image: {
      url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2000&q=85",
      displayUrl: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2000&q=85",
    },
    primaryButtonText: "Start Your Journey",
    primaryButtonUrl: "/jobs",
    secondaryButtonText: "Get Subscription",
    secondaryButtonUrl: "/subscription",
    order: 4,
    isActive: true,
  },
  {
    title: "Step into High-Growth European Markets in Germany & the UK",
    description:
      "Accelerate your career in leading European technology and corporate hubs. Compare indicative compensation, work authorization, and sponsorship.",
    badgeText: "European Employment",
    location: "Berlin / London, Europe",
    highlightTag: "Sponsorship Available",
    image: {
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=85",
      displayUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=85",
    },
    primaryButtonText: "View Openings",
    primaryButtonUrl: "/jobs",
    secondaryButtonText: "Explore More",
    secondaryButtonUrl: "/about",
    order: 5,
    isActive: true,
  },
];

// Helper to seed banners safely without losing any existing admin content
const ensureInitialBanners = async () => {
  const count = await HeroBanner.countDocuments();
  if (count > 0) return;

  // Check if legacy HeroSection has an admin-edited entry
  try {
    const legacy = await HeroSection.findOne().sort({ createdAt: -1 }).lean();
    if (legacy && legacy.heading) {
      const bannerList = [...DEFAULT_BANNERS];
      bannerList[0] = {
        title: legacy.heading.replace(/\r?\n/g, " — "),
        description: legacy.subheading || DEFAULT_BANNERS[0].description,
        badgeText: legacy.badgeText || DEFAULT_BANNERS[0].badgeText,
        location: "Global Opportunities",
        highlightTag: "Featured Banner",
        image: {
          url: legacy.image?.url || legacy.image?.displayUrl || DEFAULT_BANNERS[0].image.url,
          displayUrl: legacy.image?.displayUrl || legacy.image?.url || DEFAULT_BANNERS[0].image.displayUrl,
          deleteUrl: legacy.image?.deleteUrl || "",
          filename: legacy.image?.filename || "",
        },
        primaryButtonText: "Explore Jobs",
        primaryButtonUrl: "/jobs",
        secondaryButtonText: "Get Subscription",
        secondaryButtonUrl: "/subscription",
        order: 1,
        isActive: true,
      };
      await HeroBanner.insertMany(bannerList);
      return;
    }
  } catch (err) {
    console.warn("Could not check legacy hero section during seed:", err.message);
  }

  await HeroBanner.insertMany(DEFAULT_BANNERS);
};

// ============================================================
// PUBLIC: GET ALL ACTIVE HERO BANNERS
// GET /api/hero or GET /api/hero/banners
// ============================================================
const getActiveHeroBanners = async (req, res) => {
  try {
    await ensureInitialBanners();

    const banners = await HeroBanner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    console.error("Error fetching active hero banners:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero banners",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: GET ALL HERO BANNERS (ACTIVE & INACTIVE)
// GET /api/admin/hero/banners
// ============================================================
const getAllHeroBannersAdmin = async (req, res) => {
  try {
    await ensureInitialBanners();

    const banners = await HeroBanner.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const total = banners.length;
    const activeCount = banners.filter((b) => b.isActive).length;
    const inactiveCount = total - activeCount;

    return res.status(200).json({
      success: true,
      count: banners.length,
      stats: {
        total,
        active: activeCount,
        inactive: inactiveCount,
      },
      data: banners,
    });
  } catch (error) {
    console.error("Error fetching admin hero banners:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero banners",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: GET SINGLE HERO BANNER
// GET /api/admin/hero/banners/:id
// ============================================================
const getHeroBannerByIdAdmin = async (req, res) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error("Error fetching banner by id:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banner",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: CREATE HERO BANNER
// POST /api/admin/hero/banners
// ============================================================
const createHeroBannerAdmin = async (req, res) => {
  try {
    const {
      title,
      description,
      badgeText,
      location,
      highlightTag,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      order,
      isActive,
      imageUrl,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Banner title/heading is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Banner description/subheading is required",
      });
    }

    let imageData = {
      url: "",
      displayUrl: "",
      deleteUrl: "",
      filename: "",
    };

    // Handle file upload via ImgBB
    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: "hero-banner-image" }
        );

        if (uploadResult?.success && uploadResult?.data) {
          const img = uploadResult.data;
          imageData = {
            url: img.url || img.displayUrl || "",
            displayUrl: img.displayUrl || img.url || "",
            deleteUrl: img.deleteUrl || "",
            medium: img.medium || "",
            thumb: img.thumb || "",
            filename: img.filename || req.file.originalname || "",
          };
        }
      } catch (uploadError) {
        console.error("ImgBB upload error in createHeroBanner:", uploadError);
        return res.status(400).json({
          success: false,
          message: "Image upload failed: " + uploadError.message,
        });
      }
    } else if (imageUrl && imageUrl.trim()) {
      imageData = {
        url: imageUrl.trim(),
        displayUrl: imageUrl.trim(),
        deleteUrl: "",
        filename: "web-image",
      };
    }

    // Determine banner order
    let bannerOrder = Number(order);
    if (isNaN(bannerOrder) || bannerOrder <= 0) {
      const highestOrderBanner = await HeroBanner.findOne().sort({ order: -1 });
      bannerOrder = highestOrderBanner ? highestOrderBanner.order + 1 : 1;
    }

    const newBanner = new HeroBanner({
      title: title.trim(),
      description: description.trim(),
      badgeText: badgeText ? badgeText.trim() : "Global Career Opportunity",
      location: location ? location.trim() : "Global / Remote",
      highlightTag: highlightTag ? highlightTag.trim() : "Company Sponsored",
      image: imageData,
      primaryButtonText: primaryButtonText ? primaryButtonText.trim() : "Explore Jobs",
      primaryButtonUrl: primaryButtonUrl ? primaryButtonUrl.trim() : "/jobs",
      secondaryButtonText: secondaryButtonText ? secondaryButtonText.trim() : "Learn More",
      secondaryButtonUrl: secondaryButtonUrl ? secondaryButtonUrl.trim() : "/about",
      order: bannerOrder,
      isActive: isActive !== undefined ? String(isActive) === "true" || isActive === true : true,
      createdBy: req.user?._id || null,
      updatedBy: req.user?._id || null,
    });

    await newBanner.save();

    return res.status(201).json({
      success: true,
      message: "Hero banner created successfully",
      data: newBanner,
    });
  } catch (error) {
    console.error("Error creating hero banner:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create hero banner",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: UPDATE HERO BANNER
// PUT /api/admin/hero/banners/:id
// ============================================================
const updateHeroBannerAdmin = async (req, res) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const {
      title,
      description,
      badgeText,
      location,
      highlightTag,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      order,
      isActive,
      imageUrl,
    } = req.body;

    if (title !== undefined && title.trim()) {
      banner.title = title.trim();
    }

    if (description !== undefined && description.trim()) {
      banner.description = description.trim();
    }

    if (badgeText !== undefined) {
      banner.badgeText = badgeText.trim();
    }

    if (location !== undefined) {
      banner.location = location.trim();
    }

    if (highlightTag !== undefined) {
      banner.highlightTag = highlightTag.trim();
    }

    if (primaryButtonText !== undefined) {
      banner.primaryButtonText = primaryButtonText.trim();
    }

    if (primaryButtonUrl !== undefined) {
      banner.primaryButtonUrl = primaryButtonUrl.trim();
    }

    if (secondaryButtonText !== undefined) {
      banner.secondaryButtonText = secondaryButtonText.trim();
    }

    if (secondaryButtonUrl !== undefined) {
      banner.secondaryButtonUrl = secondaryButtonUrl.trim();
    }

    if (order !== undefined && !isNaN(Number(order))) {
      banner.order = Number(order);
    }

    if (isActive !== undefined) {
      banner.isActive = String(isActive) === "true" || isActive === true;
    }

    // Handle new image upload
    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: "hero-banner-image" }
        );

        if (uploadResult?.success && uploadResult?.data) {
          const img = uploadResult.data;

          // Delete old image if deleteUrl exists
          if (banner.image?.deleteUrl) {
            deleteFromImgBB(banner.image.deleteUrl).catch((err) =>
              console.warn("Could not delete old banner image:", err.message)
            );
          }

          banner.image = {
            url: img.url || img.displayUrl || "",
            displayUrl: img.displayUrl || img.url || "",
            deleteUrl: img.deleteUrl || "",
            medium: img.medium || "",
            thumb: img.thumb || "",
            filename: img.filename || req.file.originalname || "",
          };
        }
      } catch (uploadError) {
        console.error("ImgBB upload error in updateHeroBanner:", uploadError);
        return res.status(400).json({
          success: false,
          message: "Image upload failed: " + uploadError.message,
        });
      }
    } else if (imageUrl !== undefined) {
      if (imageUrl.trim() === "") {
        banner.image = {
          url: "",
          displayUrl: "",
          deleteUrl: "",
          filename: "",
        };
      } else {
        banner.image.url = imageUrl.trim();
        banner.image.displayUrl = imageUrl.trim();
      }
    }

    banner.updatedBy = req.user?._id || null;

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Error updating hero banner:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update hero banner",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: DELETE HERO BANNER
// DELETE /api/admin/hero/banners/:id
// ============================================================
const deleteHeroBannerAdmin = async (req, res) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Try deleting image from ImgBB if deleteUrl is present
    if (banner.image?.deleteUrl) {
      deleteFromImgBB(banner.image.deleteUrl).catch((err) =>
        console.warn("Could not delete image from ImgBB:", err.message)
      );
    }

    await HeroBanner.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hero banner:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete hero banner",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: TOGGLE BANNER STATUS (ACTIVE / INACTIVE)
// PATCH /api/admin/hero/banners/:id/toggle
// ============================================================
const toggleHeroBannerStatusAdmin = async (req, res) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;
    banner.updatedBy = req.user?._id || null;
    await banner.save();

    return res.status(200).json({
      success: true,
      message: `Banner is now ${banner.isActive ? "active" : "inactive"}`,
      data: banner,
    });
  } catch (error) {
    console.error("Error toggling banner status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle banner status",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: REORDER BANNERS
// PUT /api/admin/hero/banners/reorder
// ============================================================
const reorderHeroBannersAdmin = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Orders array is required",
      });
    }

    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: Number(item.order) || 0 } },
      },
    }));

    await HeroBanner.bulkWrite(bulkOps);

    const updatedBanners = await HeroBanner.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Banners reordered successfully",
      data: updatedBanners,
    });
  } catch (error) {
    console.error("Error reordering hero banners:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reorder hero banners",
      error: error.message,
    });
  }
};

// ============================================================
// BACKWARD COMPATIBILITY: SINGLE HERO SECTION GET/PUT
// ============================================================
const getHeroSection = async (req, res) => {
  try {
    await ensureInitialBanners();
    const primaryBanner = await HeroBanner.findOne({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: primaryBanner || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero section",
      error: error.message,
    });
  }
};

const updateHeroSectionAdmin = async (req, res) => {
  // Redirect to first banner update
  try {
    await ensureInitialBanners();
    const banner = await HeroBanner.findOne().sort({ order: 1, createdAt: -1 });
    if (!banner) {
      return createHeroBannerAdmin(req, res);
    }
    req.params.id = banner._id;
    return updateHeroBannerAdmin(req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update hero section",
      error: error.message,
    });
  }
};

module.exports = {
  getActiveHeroBanners,
  getAllHeroBannersAdmin,
  getHeroBannerByIdAdmin,
  createHeroBannerAdmin,
  updateHeroBannerAdmin,
  deleteHeroBannerAdmin,
  toggleHeroBannerStatusAdmin,
  reorderHeroBannersAdmin,
  getHeroSection,
  updateHeroSectionAdmin,
};
