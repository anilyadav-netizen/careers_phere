// controllers/adminUserController.js
const User = require("../models/User");

// ============================================================
// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// ============================================================
exports.getAllUsersAdmin = async (req, res) => {
  try {
    const {
      search,
      role,
      isActive,
      isVerified,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit = 20,
      page = 1,
    } = req.query;

    // Build filter
    const filter = {};

    // Search by name, email, or mobile
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role) {
      filter.role = role;
    }

    // Filter by active status
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    // Filter by verification status
    if (isVerified !== undefined) {
      filter.isVerified = isVerified === "true";
    }

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Get users with pagination
    const users = await User.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    // Get statistics
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: { $sum: { $cond: ["$isActive", 1, 0] } },
          verifiedUsers: { $sum: { $cond: ["$isVerified", 1, 0] } },
          adminUsers: { $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] } },
          recruiterUsers: {
            $sum: { $cond: [{ $eq: ["$role", "recruiter"] }, 1, 0] },
          },
          jobSeekerUsers: {
            $sum: { $cond: [{ $eq: ["$role", "jobseeker"] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limitNum),
      statistics: stats[0] || {
        totalUsers: 0,
        activeUsers: 0,
        verifiedUsers: 0,
        adminUsers: 0,
        recruiterUsers: 0,
        jobSeekerUsers: 0,
      },
      data: users,
    });
  } catch (error) {
    console.error("Get all users admin error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};

// ============================================================
// @desc    Get single user by ID (Admin only)
// @route   GET /api/admin/users/:id
// ============================================================
exports.getUserByIdAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user by id admin error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user",
    });
  }
};

// ============================================================
// @desc    Update user by ID (Admin only)
// @route   PUT /api/admin/users/:id
// ============================================================
exports.updateUserAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      email,
      mobile,
      role,
      location,
      dateOfBirth,
      gender,
      qualification,
      university,
      graduationYear,
      jobTitle,
      currentCompany,
      experience,
      skills,
      bio,
      preferredJobRole,
      preferredLocation,
      employmentType,
      salaryExpectation,
      linkedin,
      github,
      portfolio,
      isActive,
      isVerified,
      governmentDocumentType,
      governmentDocumentName,
    } = req.body;

    // Update fields
    if (name !== undefined) user.name = String(name).trim();

    if (email !== undefined) {
      const normalizedEmail = String(email).toLowerCase().trim();
      if (normalizedEmail !== user.email) {
        const existingEmail = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: user._id },
        });
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: "Email already in use",
          });
        }
        user.email = normalizedEmail;
      }
    }

    if (mobile !== undefined) {
      const normalizedMobile = String(mobile).trim();
      if (normalizedMobile !== user.mobile) {
        const existingMobile = await User.findOne({
          mobile: normalizedMobile,
          _id: { $ne: user._id },
        });
        if (existingMobile) {
          return res.status(400).json({
            success: false,
            message: "Mobile number already in use",
          });
        }
        user.mobile = normalizedMobile;
      }
    }

    if (role !== undefined) {
      // Only allow specific roles
      const allowedRoles = ["admin", "recruiter", "jobseeker"];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role. Allowed roles: admin, recruiter, jobseeker",
        });
      }
      user.role = role;
    }

    if (location !== undefined) user.location = String(location).trim();
    if (dateOfBirth !== undefined)
      user.dateOfBirth = String(dateOfBirth).trim();
    if (gender !== undefined) user.gender = String(gender).trim();
    if (qualification !== undefined)
      user.qualification = String(qualification).trim();
    if (university !== undefined) user.university = String(university).trim();
    if (graduationYear !== undefined)
      user.graduationYear = String(graduationYear).trim();
    if (jobTitle !== undefined) user.jobTitle = String(jobTitle).trim();
    if (currentCompany !== undefined)
      user.currentCompany = String(currentCompany).trim();
    if (experience !== undefined) user.experience = String(experience).trim();

    if (skills !== undefined) {
      if (Array.isArray(skills)) {
        user.skills = skills.map((s) => String(s).trim()).filter(Boolean);
      } else {
        user.skills = String(skills)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    if (bio !== undefined) user.bio = String(bio);
    if (preferredJobRole !== undefined)
      user.preferredJobRole = String(preferredJobRole).trim();
    if (preferredLocation !== undefined)
      user.preferredLocation = String(preferredLocation).trim();
    if (employmentType !== undefined)
      user.employmentType = String(employmentType).trim();
    if (salaryExpectation !== undefined)
      user.salaryExpectation = String(salaryExpectation).trim();
    if (linkedin !== undefined) user.linkedin = String(linkedin).trim();
    if (github !== undefined) user.github = String(github).trim();
    if (portfolio !== undefined) user.portfolio = String(portfolio).trim();

    if (isActive !== undefined)
      user.isActive = isActive === true || isActive === "true";
    if (isVerified !== undefined)
      user.isVerified = isVerified === true || isVerified === "true";

    if (governmentDocumentType !== undefined) {
      user.governmentDocumentType = String(governmentDocumentType).trim();
    }
    if (governmentDocumentName !== undefined) {
      user.governmentDocumentName = String(governmentDocumentName).trim();
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update user admin error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update user",
    });
  }
};

// ============================================================
// @desc    Delete user by ID (Admin only)
// @route   DELETE /api/admin/users/:id
// ============================================================
exports.deleteUserAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user admin error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
};

// ============================================================
// @desc    Bulk delete users (Admin only)
// @route   DELETE /api/admin/users/bulk
// ============================================================
exports.bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of user IDs",
      });
    }

    // Prevent admin from deleting themselves
    const adminId = req.user._id.toString();
    const filteredIds = ids.filter((id) => id.toString() !== adminId);

    if (filteredIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const result = await User.deleteMany({ _id: { $in: filteredIds } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} user(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Bulk delete users error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete users",
    });
  }
};

// ============================================================
// @desc    Get user statistics (Admin only)
// @route   GET /api/admin/users/stats
// ============================================================
exports.getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: { $sum: { $cond: ["$isActive", 1, 0] } },
          verifiedUsers: { $sum: { $cond: ["$isVerified", 1, 0] } },
          adminUsers: { $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] } },
          recruiterUsers: {
            $sum: { $cond: [{ $eq: ["$role", "recruiter"] }, 1, 0] },
          },
          jobSeekerUsers: {
            $sum: { $cond: [{ $eq: ["$role", "jobseeker"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalUsers: 1,
          activeUsers: 1,
          inactiveUsers: { $subtract: ["$totalUsers", "$activeUsers"] },
          verifiedUsers: 1,
          unverifiedUsers: { $subtract: ["$totalUsers", "$verifiedUsers"] },
          adminUsers: 1,
          recruiterUsers: 1,
          jobSeekerUsers: 1,
        },
      },
    ]);

    // Role wise distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          active: { $sum: { $cond: ["$isActive", 1, 0] } },
          inactive: { $sum: { $cond: ["$isActive", 0, 1] } },
        },
      },
      {
        $project: {
          role: "$_id",
          count: 1,
          active: 1,
          inactive: 1,
          _id: 0,
        },
      },
    ]);

    // User growth (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const growthData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        statistics: stats[0] || {
          totalUsers: 0,
          activeUsers: 0,
          inactiveUsers: 0,
          verifiedUsers: 0,
          unverifiedUsers: 0,
          adminUsers: 0,
          recruiterUsers: 0,
          jobSeekerUsers: 0,
        },
        roleDistribution,
        growthData: growthData || [],
      },
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user statistics",
    });
  }
};
