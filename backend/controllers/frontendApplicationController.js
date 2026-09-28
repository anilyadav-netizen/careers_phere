const mongoose = require("mongoose");
const FrontendApplication = require("../models/FrontendApplication");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ============================================================
// SUBMIT APPLICATION (PUBLIC)
// POST /api/frontend-applications
// ============================================================
exports.submitApplication = async (req, res) => {
  try {
    const {
      role,
      fullName,
      email,
      phone,
      experience,
      currentCountry,
      currentLocation,
      preferredRegion,
      preferredJobMarket,
      preferredWorkMode,
      relocationPreference,
      workAuthorization,
      expectedSalary,
      salaryCurrency,
      noticePeriod,
      preferredTimezone,
      countryFlexibility,
      portfolio,
      linkedin,
      frontendSkills,
      aboutYou,
    } = req.body;

    // Check required textual fields
    const requiredFields = {
      fullName: "Full name",
      email: "Email address",
      phone: "Phone number",
      experience: "Experience",
      currentCountry: "Current country",
      preferredRegion: "Preferred region",
      preferredJobMarket: "Preferred job market",
      preferredWorkMode: "Preferred work mode",
      expectedSalary: "Expected annual salary",
      salaryCurrency: "Salary currency",
      noticePeriod: "Availability / notice period",
      aboutYou: "About you",
    };

    for (const [key, label] of Object.entries(requiredFields)) {
      if (!req.body[key] || !String(req.body[key]).trim()) {
        return res.status(400).json({
          success: false,
          message: `${label} is required`,
        });
      }
    }

    // Check resume file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required (.pdf, .doc, or .docx)",
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate salary is numeric
    const parsedSalary = Number(expectedSalary);
    if (isNaN(parsedSalary) || parsedSalary < 0) {
      return res.status(400).json({
        success: false,
        message: "Expected salary must be a valid positive number",
      });
    }

    const application = await FrontendApplication.create({
      role: (role && String(role).trim()) ? String(role).trim() : "Frontend Developer",
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      experience: experience.trim(),
      currentCountry: currentCountry.trim(),
      currentLocation: currentLocation ? currentLocation.trim() : "",
      preferredRegion: preferredRegion.trim(),
      preferredJobMarket: preferredJobMarket.trim(),
      preferredWorkMode: preferredWorkMode.trim(),
      relocationPreference: relocationPreference ? relocationPreference.trim() : "",
      workAuthorization: workAuthorization ? workAuthorization.trim() : "",
      expectedSalary: parsedSalary,
      salaryCurrency: salaryCurrency.trim(),
      noticePeriod: noticePeriod.trim(),
      preferredTimezone: preferredTimezone ? preferredTimezone.trim() : "",
      countryFlexibility: countryFlexibility ? countryFlexibility.trim() : "",
      portfolio: portfolio ? portfolio.trim() : "",
      linkedin: linkedin ? linkedin.trim() : "",
      frontendSkills: frontendSkills ? frontendSkills.trim() : "",
      aboutYou: aboutYou.trim(),
      resume: {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
      },
    });

    // Return created application without the binary buffer
    const responseData = application.toObject();
    delete responseData.resume.data;

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Submit Frontend Application error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit application",
    });
  }
};

// ============================================================
// GET ALL APPLICATIONS (ADMIN)
// GET /api/frontend-applications
// ============================================================
exports.getAllApplications = async (req, res) => {
  try {
    const {
      role,
      status,
      search,
      market,
      workMode,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (role && role !== "all") {
      query.role = new RegExp(`^${role.trim()}$`, "i");
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (market && market !== "all") {
      query.preferredJobMarket = new RegExp(market, "i");
    }

    if (workMode && workMode !== "all") {
      query.preferredWorkMode = new RegExp(workMode, "i");
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { role: searchRegex },
        { frontendSkills: searchRegex },
        { currentCountry: searchRegex },
      ];
    }

    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder = order === "asc" ? 1 : -1;

    const [applications, total] = await Promise.all([
      FrontendApplication.find(query)
        .select("-resume.data")
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(pageSize),
      FrontendApplication.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize) || 1,
      },
    });
  } catch (error) {
    console.error("Get all frontend applications error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch applications",
    });
  }
};

// ============================================================
// GET APPLICATION STATS (ADMIN)
// GET /api/frontend-applications/stats
// ============================================================
exports.getApplicationStats = async (req, res) => {
  try {
    const [
      total,
      pending,
      reviewed,
      shortlisted,
      interview,
      rejected,
      hired,
      roleStats,
    ] = await Promise.all([
      FrontendApplication.countDocuments(),
      FrontendApplication.countDocuments({ status: "pending" }),
      FrontendApplication.countDocuments({ status: "reviewed" }),
      FrontendApplication.countDocuments({ status: "shortlisted" }),
      FrontendApplication.countDocuments({ status: "interview" }),
      FrontendApplication.countDocuments({ status: "rejected" }),
      FrontendApplication.countDocuments({ status: "hired" }),
      FrontendApplication.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),
    ]);

    const byRole = {};
    roleStats.forEach((r) => {
      byRole[r._id || "Other"] = r.count;
    });

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        reviewed,
        shortlisted,
        interview,
        rejected,
        hired,
        byRole,
      },
    });
  } catch (error) {
    console.error("Get frontend application stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch stats",
    });
  }
};

// ============================================================
// GET APPLICATION BY ID (ADMIN)
// GET /api/frontend-applications/:id
// ============================================================
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await FrontendApplication.findById(id).select(
      "-resume.data"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get frontend application by id error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch application",
    });
  }
};

// ============================================================
// DOWNLOAD / VIEW RESUME
// GET /api/frontend-applications/:id/resume
// ============================================================
exports.downloadResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await FrontendApplication.findById(id);

    if (!application || !application.resume || !application.resume.data) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const { filename, mimetype, data } = application.resume;

    res.setHeader("Content-Type", mimetype || "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(filename)}"`
    );

    return res.send(data);
  } catch (error) {
    console.error("Download resume error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to download resume",
    });
  }
};

// ============================================================
// UPDATE APPLICATION STATUS (ADMIN)
// PATCH /api/frontend-applications/:id/status
// ============================================================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const validStatuses = [
      "pending",
      "reviewed",
      "shortlisted",
      "interview",
      "rejected",
      "hired",
    ];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (typeof adminNotes !== "undefined") updateFields.adminNotes = adminNotes;

    const application = await FrontendApplication.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-resume.data");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Update frontend application status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update application status",
    });
  }
};

// ============================================================
// DELETE APPLICATION (ADMIN)
// DELETE /api/frontend-applications/:id
// ============================================================
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await FrontendApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete frontend application error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete application",
    });
  }
};
