const Enquiry = require("../models/Enquiry");

// ============================================================
// PUBLIC: SUBMIT CONTACT ENQUIRY
// POST /api/enquiries or POST /api/contact
// ============================================================
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "";

    const enquiry = await Enquiry.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      subject: subject && String(subject).trim() ? String(subject).trim() : "General Enquiry",
      message: String(message).trim(),
      status: "new",
      ipAddress: clientIp,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("Submit enquiry error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit enquiry. Please try again.",
    });
  }
};

// ============================================================
// ADMIN: GET ALL ENQUIRIES
// GET /api/admin/enquiries
// ============================================================
exports.getAllEnquiriesAdmin = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search && String(search).trim()) {
      const regex = new RegExp(String(search).trim(), "i");
      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { subject: regex },
        { message: regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get admin enquiries error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch enquiries",
    });
  }
};

// ============================================================
// ADMIN: GET ENQUIRY STATS
// GET /api/admin/enquiries/stats
// ============================================================
exports.getEnquiryStatsAdmin = async (req, res) => {
  try {
    const [total, newCount, readCount, repliedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.countDocuments({ status: "read" }),
      Enquiry.countDocuments({ status: "replied" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount,
      },
    });
  } catch (error) {
    console.error("Get enquiry stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch enquiry statistics",
    });
  }
};

// ============================================================
// ADMIN: GET SINGLE ENQUIRY BY ID
// GET /api/admin/enquiries/:id
// ============================================================
exports.getEnquiryByIdAdmin = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    // Automatically mark as read if it was new
    if (enquiry.status === "new") {
      enquiry.status = "read";
      await enquiry.save();
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("Get enquiry by ID error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch enquiry details",
    });
  }
};

// ============================================================
// ADMIN: UPDATE ENQUIRY STATUS
// PATCH /api/admin/enquiries/:id/status
// ============================================================
exports.updateEnquiryStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'new', 'read', or 'replied'",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      data: enquiry,
    });
  } catch (error) {
    console.error("Update enquiry status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update enquiry status",
    });
  }
};

// ============================================================
// ADMIN: DELETE ENQUIRY
// DELETE /api/admin/enquiries/:id
// ============================================================
exports.deleteEnquiryAdmin = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete enquiry",
    });
  }
};
