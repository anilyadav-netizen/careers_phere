const mongoose = require("mongoose");
const RoleOpportunity = require("../models/RoleOpportunity");
const Job = require("../models/Job");
const { uploadToImgBB } = require("../utils/imgbb");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Safely parse countries array or JSON string
 * Enforces rule: each country must have at least countryName OR flag
 */
const parseCountries = (countriesRaw) => {
  if (!countriesRaw) return [];

  let parsed = countriesRaw;
  if (typeof countriesRaw === "string") {
    try {
      parsed = JSON.parse(countriesRaw);
    } catch (e) {
      // Fallback: if comma separated country names
      parsed = countriesRaw
        .split(",")
        .map((c) => ({ countryName: c.trim(), flag: "" }))
        .filter((c) => c.countryName.length > 0);
    }
  }

  if (!Array.isArray(parsed)) return [];

  // Filter and normalize
  const valid = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const countryName = item.countryName ? String(item.countryName).trim() : "";
    const flag = item.flag ? String(item.flag).trim() : "";

    // At least one must be provided (User requirement: naam and flag dono optional rhenge lekin 1 required rhega ya to naam nahi to flag koi ek dalna padega)
    if (countryName.length > 0 || flag.length > 0) {
      valid.push({ countryName, flag });
    }
  }

  return valid;
};

/**
 * Safely parse skills array or comma-separated string
 */
const parseSkills = (skillsRaw) => {
  if (!skillsRaw) return [];
  if (Array.isArray(skillsRaw)) {
    return skillsRaw.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof skillsRaw === "string") {
    try {
      const parsed = JSON.parse(skillsRaw);
      if (Array.isArray(parsed)) {
        return parsed.map((s) => String(s).trim()).filter(Boolean);
      }
    } catch (e) {
      // split by comma
      return skillsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
};

/**
 * Safely parse workModes
 */
const parseWorkModes = (modesRaw) => {
  if (!modesRaw) return ["Remote", "Hybrid"];
  if (Array.isArray(modesRaw)) return modesRaw.filter(Boolean);
  if (typeof modesRaw === "string") {
    try {
      const parsed = JSON.parse(modesRaw);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return modesRaw
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
    }
  }
  return ["Remote", "Hybrid"];
};

// ============================================================
// PUBLIC: GET OPPORTUNITIES BY ROLE
// GET /api/role-opportunities
// ============================================================
exports.getPublicOpportunities = async (req, res) => {
  try {
    const { roleCategory, country, search } = req.query;

    const jobQuery = {
      status: "active",
      domain: { $nin: ["None", "none", "NONE", "", null] },
    };

    if (roleCategory && roleCategory !== "all") {
      const cleanRole = roleCategory.trim().replace(/\s+Developer$/i, "");
      jobQuery.domain = new RegExp(`^${cleanRole}`, "i");
    }

    if (country) {
      const countryRegex = new RegExp(country.trim(), "i");
      jobQuery.$or = [
        { country: countryRegex },
        { location: countryRegex },
        { "countries.countryName": countryRegex },
        { "countries.name": countryRegex },
      ];
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      jobQuery.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { skills: searchRegex },
        { location: searchRegex },
      ];
    }

    const matchingJobs = await Job.find(jobQuery)
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    const opportunities = matchingJobs.map((j) => ({
      _id: j._id,
      companyName: j.company,
      companyLogo: j.companyLogo?.displayUrl || j.companyLogo?.url || "",
      roleCategory: j.domain || roleCategory || "Frontend Developer",
      roleTitle: j.title,
      countries:
        j.countries && j.countries.length > 0
          ? j.countries
          : j.country
            ? [{ countryName: j.country, flag: "" }]
            : [{ countryName: j.location || "Remote", flag: "" }],
      salary: j.salary,
      salaryCurrency: j.salaryCurrency || "USD",
      skills: j.skills || [],
      workModes: [j.jobType || "Remote"],
      description: j.description || "",
      isActive: j.status === "active",
      featured: Boolean(j.isFeatured),
      isJobRecord: true,
      jobType: j.jobType,
      createdAt: j.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    console.error("Get public role opportunities error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch opportunities",
    });
  }
};

// ============================================================
// PUBLIC: GET OPPORTUNITY BY ID
// GET /api/role-opportunities/:id
// ============================================================
exports.getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid opportunity ID",
      });
    }

    const job = await Job.findById(id).lean();
    if (job) {
      return res.status(200).json({
        success: true,
        data: {
          _id: job._id,
          companyName: job.company,
          companyLogo:
            job.companyLogo?.displayUrl || job.companyLogo?.url || "",
          roleCategory: job.domain || "Frontend Developer",
          roleTitle: job.title,
          countries:
            job.countries && job.countries.length > 0
              ? job.countries
              : job.country
                ? [{ countryName: job.country, flag: "" }]
                : [{ countryName: job.location || "Remote", flag: "" }],
          salary: job.salary,
          salaryCurrency: job.salaryCurrency || "USD",
          skills: job.skills || [],
          workModes: [job.jobType || "Remote"],
          description: job.description || "",
          responsibilities: job.responsibilities || [],
          requirements: job.requirements || [],
          isActive: job.status === "active",
          featured: Boolean(job.isFeatured),
          isJobRecord: true,
          jobType: job.jobType,
          createdAt: job.createdAt,
        },
      });
    }

    const opportunity = await RoleOpportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    console.error("Get opportunity by ID error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch opportunity",
    });
  }
};

// ============================================================
// ADMIN: CREATE OPPORTUNITY
// POST /api/role-opportunities
// ============================================================
exports.createOpportunity = async (req, res) => {
  try {
    const {
      companyName,
      roleCategory,
      roleTitle,
      countries,
      salary,
      salaryCurrency,
      skills,
      workModes,
      description,
      featured,
      isActive,
      companyLogo: directLogoUrl,
    } = req.body;

    if (!companyName || !String(companyName).trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    if (!roleCategory || !String(roleCategory).trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Role category is required (e.g. Frontend Developer, Video Editor, etc.)",
      });
    }

    const parsedCountriesList = parseCountries(countries);

    // If countries were provided, ensure each has name or flag
    if (countries && parsedCountriesList.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "At least one country name or country flag is required when specifying countries",
      });
    }

    // Handle company logo
    let logoUrl = directLogoUrl ? String(directLogoUrl).trim() : "";

    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: `company-${Date.now()}` },
        );
        logoUrl =
          uploadResult.data?.displayUrl ||
          uploadResult.data?.url ||
          uploadResult.data ||
          "";
      } catch (uploadErr) {
        console.warn(
          "ImgBB upload error, falling back to base64 data URI:",
          uploadErr.message,
        );
        // Fallback to data URI so logo still displays properly
        const mime = req.file.mimetype || "image/png";
        logoUrl = `data:${mime};base64,${req.file.buffer.toString("base64")}`;
      }
    }

    const opportunity = await RoleOpportunity.create({
      companyName: String(companyName).trim(),
      companyLogo: logoUrl,
      roleCategory: String(roleCategory).trim(),
      roleTitle: roleTitle ? String(roleTitle).trim() : "",
      countries: parsedCountriesList,
      salary: salary ? String(salary).trim() : "", // optional
      salaryCurrency: salaryCurrency ? String(salaryCurrency).trim() : "USD",
      skills: parseSkills(skills),
      workModes: parseWorkModes(workModes),
      description: description ? String(description).trim() : "",
      featured: featured === "true" || featured === true,
      isActive:
        isActive === undefined
          ? true
          : isActive === "true" || isActive === true,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Opportunity created successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Create role opportunity error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create opportunity",
    });
  }
};

// ============================================================
// ADMIN: GET ALL OPPORTUNITIES
// GET /api/role-opportunities/admin/all
// ============================================================
exports.getAllOpportunitiesAdmin = async (req, res) => {
  try {
    const {
      roleCategory,
      search,
      status,
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (roleCategory && roleCategory !== "all") {
      query.roleCategory = new RegExp(`^${roleCategory.trim()}$`, "i");
    }

    if (status && status !== "all") {
      query.isActive = status === "active" || status === "true";
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { companyName: searchRegex },
        { roleTitle: searchRegex },
        { roleCategory: searchRegex },
        { skills: searchRegex },
        { "countries.countryName": searchRegex },
      ];
    }

    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder = order === "asc" ? 1 : -1;

    const [opportunities, total] = await Promise.all([
      RoleOpportunity.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(pageSize),
      RoleOpportunity.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: opportunities,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize) || 1,
      },
    });
  } catch (error) {
    console.error("Get all role opportunities admin error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch opportunities",
    });
  }
};

// ============================================================
// ADMIN: UPDATE OPPORTUNITY
// PUT /api/role-opportunities/:id
// ============================================================
exports.updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid opportunity ID",
      });
    }

    const opportunity = await RoleOpportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const {
      companyName,
      roleCategory,
      roleTitle,
      countries,
      salary,
      salaryCurrency,
      skills,
      workModes,
      description,
      featured,
      isActive,
      companyLogo: directLogoUrl,
    } = req.body;

    if (companyName) opportunity.companyName = String(companyName).trim();
    if (roleCategory) opportunity.roleCategory = String(roleCategory).trim();
    if (roleTitle !== undefined)
      opportunity.roleTitle = String(roleTitle).trim();

    if (countries !== undefined) {
      opportunity.countries = parseCountries(countries);
    }

    if (salary !== undefined) opportunity.salary = String(salary).trim();
    if (salaryCurrency !== undefined)
      opportunity.salaryCurrency = String(salaryCurrency).trim();

    if (skills !== undefined) {
      opportunity.skills = parseSkills(skills);
    }

    if (workModes !== undefined) {
      opportunity.workModes = parseWorkModes(workModes);
    }

    if (description !== undefined)
      opportunity.description = String(description).trim();
    if (featured !== undefined)
      opportunity.featured = featured === "true" || featured === true;
    if (isActive !== undefined)
      opportunity.isActive = isActive === "true" || isActive === true;

    // Logo update if new file uploaded or direct URL provided
    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: `company-${Date.now()}` },
        );
        opportunity.companyLogo =
          uploadResult.data?.displayUrl ||
          uploadResult.data?.url ||
          uploadResult.data ||
          opportunity.companyLogo;
      } catch (uploadErr) {
        console.warn(
          "ImgBB upload error on update, using base64:",
          uploadErr.message,
        );
        const mime = req.file.mimetype || "image/png";
        opportunity.companyLogo = `data:${mime};base64,${req.file.buffer.toString("base64")}`;
      }
    } else if (directLogoUrl !== undefined && directLogoUrl !== "") {
      opportunity.companyLogo = String(directLogoUrl).trim();
    }

    await opportunity.save();

    return res.status(200).json({
      success: true,
      message: "Opportunity updated successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Update role opportunity error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update opportunity",
    });
  }
};

// ============================================================
// ADMIN: DELETE OPPORTUNITY
// DELETE /api/role-opportunities/:id
// ============================================================
exports.deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid opportunity ID",
      });
    }

    const opportunity = await RoleOpportunity.findByIdAndDelete(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete role opportunity error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete opportunity",
    });
  }
};

// ============================================================
// ADMIN: GET STATS BY ROLE CATEGORY
// GET /api/role-opportunities/admin/stats
// ============================================================
exports.getOpportunityStatsAdmin = async (req, res) => {
  try {
    const [total, active, byRole] = await Promise.all([
      RoleOpportunity.countDocuments(),
      RoleOpportunity.countDocuments({ isActive: true }),
      RoleOpportunity.aggregate([
        {
          $group: {
            _id: "$roleCategory",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        active,
        byRole: byRole.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error("Get opportunity stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get stats",
    });
  }
};
