const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../utils/mailer");
const { uploadToImgBB } = require("../utils/imgbb");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // =================================================
    // CHECK USER
    // =================================================

    const userExists = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or mobile",
      });
    }

    // =================================================
    // CREATE USER
    // =================================================

    const user = await User.create({
      name,
      mobile,
      email,
      password,
    });

    // =================================================
    // SEND WELCOME EMAIL
    // =================================================

    try {
      await sendWelcomeEmail({
        name: user.name,
        email: user.email,
      });
    } catch (emailError) {
      // Email fail hone par registration fail nahi hoga
      console.error("Welcome email failed:", emailError);
    }

    // =================================================
    // GENERATE TOKEN
    // =================================================

    const token = generateToken(user._id);

    // =================================================
    // SET COOKIE
    // =================================================

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update profile
// @route   PUT /api/auth/update/profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("========== UPDATE PROFILE ==========");
    console.log("USER ID:", req.user?._id);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // =====================================================
    // CHECK AUTHENTICATION
    // =====================================================

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // =====================================================
    // PREPARE UPDATE DATA
    // =====================================================

    const updateData = {};

    // -----------------------------------------------------
    // Update every field coming from req.body
    // -----------------------------------------------------

    Object.keys(req.body || {}).forEach((key) => {
      const value = req.body[key];

      // undefined ko ignore karo
      // "" / null / 0 / false ko update hone do
      if (value !== undefined) {
        updateData[key] = value;
      }
    });

    // =====================================================
    // SKILLS
    // =====================================================

    if (updateData.skills !== undefined) {
      if (Array.isArray(updateData.skills)) {
        // Already array hai
        updateData.skills = updateData.skills;
      } else if (updateData.skills === "" || updateData.skills === null) {
        // Empty skills
        updateData.skills = [];
      } else {
        // "React, Node, MongoDB"
        // convert into array
        updateData.skills = String(updateData.skills)
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
    }

    // =====================================================
    // EMAIL / MOBILE DUPLICATE CHECK
    // =====================================================

    const duplicateConditions = [];

    if (
      updateData.email !== undefined &&
      updateData.email !== null &&
      updateData.email !== ""
    ) {
      duplicateConditions.push({
        email: updateData.email,
      });
    }

    if (
      updateData.mobile !== undefined &&
      updateData.mobile !== null &&
      updateData.mobile !== ""
    ) {
      duplicateConditions.push({
        mobile: updateData.mobile,
      });
    }

    if (duplicateConditions.length > 0) {
      const existingUser = await User.findOne({
        $or: duplicateConditions,
        _id: { $ne: req.user._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email or mobile already in use",
        });
      }
    }

    // =====================================================
    // FILES
    // =====================================================

    if (req.files) {
      // ---------------------------------------------------
      // PROFILE PHOTO
      // ---------------------------------------------------

      if (req.files.profilePhoto?.[0]) {
        const file = req.files.profilePhoto[0];
        const uploadResult = await uploadToImgBB(
          file.buffer,
          file.originalname,
          { name: `profile-${req.user._id}` },
        );
        updateData.profilePhoto =
          uploadResult.data.displayUrl || uploadResult.data.url;
      }

      // ---------------------------------------------------
      // RESUME
      // ---------------------------------------------------

      if (req.files.resume?.[0]) {
        const file = req.files.resume[0];

        updateData.resume = file.path || file.location || file.filename;
      }

      // ---------------------------------------------------
      // GOVERNMENT DOCUMENT
      // ---------------------------------------------------

      if (req.files.governmentDocument?.[0]) {
        const file = req.files.governmentDocument[0];

        updateData.governmentDocument =
          file.path || file.location || file.filename;

        updateData.governmentDocumentName = file.originalname;
      }
    }

    // =====================================================
    // LOG FINAL DATA
    // =====================================================

    console.log("====================================");
    console.log("FINAL UPDATE DATA:");
    console.log(updateData);
    console.log("====================================");

    // =====================================================
    // NOTHING TO UPDATE
    // =====================================================

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // =====================================================
    // UPDATE USER
    // =====================================================

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    // =====================================================
    // USER NOT FOUND
    // =====================================================

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    console.log("USER UPDATED SUCCESSFULLY:");
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // =====================================================
    // DUPLICATE KEY ERROR
    // =====================================================

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile already exists",
        error: error.keyValue,
      });
    }

    // =====================================================
    // OTHER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Change password
// @route   PUT /api/auth/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
