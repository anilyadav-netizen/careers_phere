const JobType = require("../models/JobType");

const INITIAL_JOB_TYPES = [
  { name: "Remote", label: "Remote", icon: "Wifi", order: 1 },
  { name: "MNC", label: "MNC", icon: "Building2", order: 2 },
  { name: "Banking & Finance", label: "Banking & ...", icon: "Landmark", order: 3 },
  { name: "Startup", label: "Startup", icon: "Rocket", order: 4 },
  { name: "HR", label: "HR", icon: "Users", order: 5 },
  { name: "Engineering", label: "Engineering", icon: "Code", order: 6 },
  { name: "Fortune 500", label: "Fortune 500", icon: "Award", order: 7 },
  { name: "Internship", label: "Internship", icon: "GraduationCap", order: 8 },
  { name: "Project Management", label: "Project Mg...", icon: "Briefcase", order: 9 },
  { name: "Sales", label: "Sales", icon: "ShoppingCart", order: 10 },
  { name: "Supply Chain", label: "Supply Ch...", icon: "Truck", order: 11 },
];

const seedDefaultJobTypesIfNeeded = async () => {
  try {
    const count = await JobType.countDocuments();
    if (count === 0) {
      await JobType.insertMany(INITIAL_JOB_TYPES);
      console.log("Auto-seeded default job types successfully");
    }
  } catch (err) {
    console.error("Error auto-seeding job types:", err.message);
  }
};

// ============================================================
// PUBLIC: GET ACTIVE JOB TYPES
// GET /api/job-types
// ============================================================
exports.getAllJobTypesPublic = async (req, res) => {
  try {
    await seedDefaultJobTypesIfNeeded();

    const jobTypes = await JobType.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: jobTypes.length,
      data: jobTypes,
    });
  } catch (error) {
    console.error("Get public job types error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job types",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: GET ALL JOB TYPES (ACTIVE & INACTIVE)
// GET /api/admin/job-types
// ============================================================
exports.getAllJobTypesAdmin = async (req, res) => {
  try {
    await seedDefaultJobTypesIfNeeded();

    const jobTypes = await JobType.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: jobTypes.length,
      data: jobTypes,
    });
  } catch (error) {
    console.error("Get admin job types error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job types",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: GET SINGLE JOB TYPE
// GET /api/admin/job-types/:id
// ============================================================
exports.getJobTypeByIdAdmin = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res.status(404).json({
        success: false,
        message: "Job type not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: jobType,
    });
  } catch (error) {
    console.error("Get job type by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job type",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: CREATE JOB TYPE
// POST /api/admin/job-types
// ============================================================
exports.createJobType = async (req, res) => {
  try {
    const { name, label, icon, description, isActive, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job type name is required",
      });
    }

    const trimmedName = name.trim();

    // Check duplicate name (case-insensitive)
    const existing = await JobType.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Job type "${trimmedName}" already exists`,
      });
    }

    const jobType = await JobType.create({
      name: trimmedName,
      label: label?.trim() || trimmedName,
      icon: icon?.trim() || "Briefcase",
      description: description?.trim() || "",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    return res.status(201).json({
      success: true,
      message: "Job type created successfully",
      data: jobType,
    });
  } catch (error) {
    console.error("Create job type error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create job type",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: UPDATE JOB TYPE
// PUT /api/admin/job-types/:id
// ============================================================
exports.updateJobType = async (req, res) => {
  try {
    const { name, label, icon, description, isActive, order } = req.body;

    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res.status(404).json({
        success: false,
        message: "Job type not found",
      });
    }

    if (name && name.trim()) {
      const trimmedName = name.trim();
      const duplicate = await JobType.findOne({
        _id: { $ne: jobType._id },
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Job type "${trimmedName}" already exists`,
        });
      }
      jobType.name = trimmedName;
    }

    if (label !== undefined) {
      jobType.label = label.trim() || jobType.name;
    }

    if (icon !== undefined) {
      jobType.icon = icon.trim() || "Briefcase";
    }

    if (description !== undefined) {
      jobType.description = description.trim();
    }

    if (isActive !== undefined) {
      jobType.isActive = Boolean(isActive);
    }

    if (order !== undefined) {
      jobType.order = Number(order);
    }

    await jobType.save();

    return res.status(200).json({
      success: true,
      message: "Job type updated successfully",
      data: jobType,
    });
  } catch (error) {
    console.error("Update job type error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update job type",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: DELETE JOB TYPE
// DELETE /api/admin/job-types/:id
// ============================================================
exports.deleteJobType = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res.status(404).json({
        success: false,
        message: "Job type not found",
      });
    }

    await JobType.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Job type deleted successfully",
    });
  } catch (error) {
    console.error("Delete job type error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete job type",
      error: error.message,
    });
  }
};

// ============================================================
// ADMIN: TOGGLE JOB TYPE STATUS
// PATCH /api/admin/job-types/:id/toggle
// ============================================================
exports.toggleJobTypeStatus = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res.status(404).json({
        success: false,
        message: "Job type not found",
      });
    }

    jobType.isActive = !jobType.isActive;
    await jobType.save();

    return res.status(200).json({
      success: true,
      message: `Job type ${jobType.isActive ? "activated" : "deactivated"} successfully`,
      data: jobType,
    });
  } catch (error) {
    console.error("Toggle job type status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle job type status",
      error: error.message,
    });
  }
};
