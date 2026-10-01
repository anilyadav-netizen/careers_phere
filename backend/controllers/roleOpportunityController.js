const mongoose = require("mongoose");
const RoleOpportunity = require("../models/RoleOpportunity");
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
// DEFAULT SEED OPPORTUNITIES FOR LANDING PAGES
// ============================================================
const DEFAULT_OPPORTUNITIES_SEED = {
  "Backend Developer": [
    {
      companyName: "Amazon AWS",
      companyLogo:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Backend Developer",
      roleTitle: "Senior Backend Systems Engineer",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "Germany", flag: "https://flagcdn.com/w80/de.png" },
      ],
      salary: "$75,000 – $150,000",
      salaryCurrency: "USD",
      skills: ["Node.js", "Microservices", "PostgreSQL", "Docker", "AWS"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Stripe Infrastructure",
      companyLogo:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Backend Developer",
      roleTitle: "Backend API Engineer",
      countries: [
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
      ],
      salary: "$65,000 – $130,000",
      salaryCurrency: "USD",
      skills: ["Node.js", "Redis", "Distributed Systems", "MongoDB"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Datadog Global",
      companyLogo:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Backend Developer",
      roleTitle: "Cloud Backend Engineer",
      countries: [
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
      ],
      salary: "$70,000 – $140,000",
      salaryCurrency: "USD",
      skills: ["Express.js", "PostgreSQL", "Kafka", "Docker", "CI/CD"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: false,
    },
    {
      companyName: "Shopify Backend",
      companyLogo:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Backend Developer",
      roleTitle: "High-Throughput Systems Engineer",
      countries: [
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
      ],
      salary: "$68,000 – $135,000",
      salaryCurrency: "USD",
      skills: ["Node.js", "TypeScript", "REST APIs", "PostgreSQL"],
      workModes: ["Remote"],
      isActive: true,
      featured: false,
    },
  ],
  "Full Stack Developer": [
    {
      companyName: "Meta Platforms",
      companyLogo:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Full Stack Developer",
      roleTitle: "Full Stack Product Engineer",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
      ],
      salary: "$80,000 – $160,000",
      salaryCurrency: "USD",
      skills: ["React", "Node.js", "TypeScript", "GraphQL", "Next.js"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Shopify Core",
      companyLogo:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Full Stack Developer",
      roleTitle: "Full Stack Web Developer",
      countries: [
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
        { countryName: "Germany", flag: "https://flagcdn.com/w80/de.png" },
      ],
      salary: "$70,000 – $135,000",
      salaryCurrency: "USD",
      skills: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Vercel Labs",
      companyLogo:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Full Stack Developer",
      roleTitle: "Full Stack Application Architect",
      countries: [
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
      ],
      salary: "$75,000 – $145,000",
      salaryCurrency: "USD",
      skills: ["React", "TypeScript", "Node.js", "Serverless", "Tailwind CSS"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: false,
    },
    {
      companyName: "Canva Studio",
      companyLogo:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Full Stack Developer",
      roleTitle: "Full Stack UI/Backend Developer",
      countries: [
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
      ],
      salary: "$65,000 – $125,000",
      salaryCurrency: "USD",
      skills: ["React", "Express.js", "MongoDB", "Redux", "REST APIs"],
      workModes: ["Remote"],
      isActive: true,
      featured: false,
    },
  ],
  "Android Developer": [
    {
      companyName: "Google Mobile Systems",
      companyLogo:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Android Developer",
      roleTitle: "Senior Android Engineer",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
      ],
      salary: "$75,000 – $155,000",
      salaryCurrency: "USD",
      skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Clean Architecture", "MVVM"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Spotify Mobile",
      companyLogo:
        "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Android Developer",
      roleTitle: "Android Audio App Developer",
      countries: [
        { countryName: "Germany", flag: "https://flagcdn.com/w80/de.png" },
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
      ],
      salary: "$65,000 – $130,000",
      salaryCurrency: "USD",
      skills: ["Kotlin", "Android SDK", "Flow", "Dagger Hilt", "Unit Testing"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "ByteDance Apps",
      companyLogo:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Android Developer",
      roleTitle: "Mobile Video Architect",
      countries: [
        { countryName: "Singapore", flag: "https://flagcdn.com/w80/sg.png" },
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
      ],
      salary: "$70,000 – $140,000",
      salaryCurrency: "USD",
      skills: ["Kotlin", "NDK", "Performance Optimization", "Jetpack Compose"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: false,
    },
  ],
  "Frontend Developer": [
    {
      companyName: "Vercel Inc.",
      companyLogo:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Frontend Developer",
      roleTitle: "Senior Frontend Engineer",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
      ],
      salary: "$65,000 – $140,000",
      salaryCurrency: "USD",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Airbnb",
      companyLogo:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Frontend Developer",
      roleTitle: "Frontend UI/UX Engineer",
      countries: [
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
      ],
      salary: "$60,000 – $130,000",
      salaryCurrency: "USD",
      skills: ["React", "JavaScript", "CSS/SCSS", "Framer Motion"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
  ],
  "Video Editor": [
    {
      companyName: "Red Bull Media",
      companyLogo:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Video Editor",
      roleTitle: "Action & Sports Video Editor",
      countries: [
        { countryName: "Austria", flag: "https://flagcdn.com/w80/at.png" },
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
      ],
      salary: "$45,000 – $95,000",
      salaryCurrency: "USD",
      skills: ["Premiere Pro", "After Effects", "Color Grading", "Sound Design"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "MrBeast Studios",
      companyLogo:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      roleCategory: "Video Editor",
      roleTitle: "High-Retention YouTube Editor",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
      ],
      salary: "$55,000 – $120,000",
      salaryCurrency: "USD",
      skills: ["Premiere Pro", "Motion Graphics", "Fast Pacing", "Storyboarding"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
  ],
  "UI/UX Designer": [
    {
      companyName: "Figma Studio",
      companyLogo:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=120&auto=format&fit=crop&q=80",
      roleCategory: "UI/UX Designer",
      roleTitle: "Senior Product & Design Systems Designer",
      countries: [
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
        { countryName: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
      ],
      salary: "$65,000 – $135,000",
      salaryCurrency: "USD",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Airbnb Experience",
      companyLogo:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      roleCategory: "UI/UX Designer",
      roleTitle: "Lead UI/UX Mobile Designer",
      countries: [
        { countryName: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
        { countryName: "Germany", flag: "https://flagcdn.com/w80/de.png" },
      ],
      salary: "$60,000 – $125,000",
      salaryCurrency: "USD",
      skills: ["Figma", "Mobile UI", "Micro-Interactions", "Framer", "Usability Testing"],
      workModes: ["Remote"],
      isActive: true,
      featured: true,
    },
    {
      companyName: "Canva Design Lab",
      companyLogo:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80",
      roleCategory: "UI/UX Designer",
      roleTitle: "Interaction & Visual Product Designer",
      countries: [
        { countryName: "Australia", flag: "https://flagcdn.com/w80/au.png" },
        { countryName: "United States", flag: "https://flagcdn.com/w80/us.png" },
      ],
      salary: "$65,000 – $130,000",
      salaryCurrency: "USD",
      skills: ["Figma", "Visual Hierarchy", "Design Tokens", "User Flows"],
      workModes: ["Remote", "Hybrid"],
      isActive: true,
      featured: false,
    },
  ],
};

// ============================================================
// PUBLIC: GET OPPORTUNITIES BY ROLE
// GET /api/role-opportunities
// ============================================================
exports.getPublicOpportunities = async (req, res) => {
  try {
    const { roleCategory, country, search } = req.query;

    const query = { isActive: true };

    if (roleCategory && roleCategory !== "all") {
      query.roleCategory = new RegExp(`^${roleCategory.trim()}$`, "i");
    }

    if (country) {
      query["countries.countryName"] = new RegExp(country.trim(), "i");
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { companyName: searchRegex },
        { roleTitle: searchRegex },
        { skills: searchRegex },
        { "countries.countryName": searchRegex },
      ];
    }

    let opportunities = await RoleOpportunity.find(query).sort({
      featured: -1,
      createdAt: -1,
    });

    // Auto-seed default opportunities if none found for roleCategory query
    if (opportunities.length === 0 && !search && !country && roleCategory && roleCategory !== "all") {
      // Find matching key in DEFAULT_OPPORTUNITIES_SEED
      const matchedKey = Object.keys(DEFAULT_OPPORTUNITIES_SEED).find(
        (k) => k.toLowerCase() === roleCategory.trim().toLowerCase()
      );

      if (matchedKey && DEFAULT_OPPORTUNITIES_SEED[matchedKey]) {
        try {
          const seeds = DEFAULT_OPPORTUNITIES_SEED[matchedKey];
          opportunities = await RoleOpportunity.insertMany(seeds);
        } catch (seedErr) {
          console.error("Auto-seed opportunities error:", seedErr.message);
          opportunities = DEFAULT_OPPORTUNITIES_SEED[matchedKey];
        }
      }
    }

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
        message: "Role category is required (e.g. Frontend Developer, Video Editor, etc.)",
      });
    }

    const parsedCountriesList = parseCountries(countries);

    // If countries were provided, ensure each has name or flag
    if (countries && parsedCountriesList.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one country name or country flag is required when specifying countries",
      });
    }

    // Handle company logo
    let logoUrl = directLogoUrl ? String(directLogoUrl).trim() : "";

    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: `company-${Date.now()}` }
        );
        logoUrl =
          uploadResult.data?.displayUrl ||
          uploadResult.data?.url ||
          uploadResult.data ||
          "";
      } catch (uploadErr) {
        console.warn("ImgBB upload error, falling back to base64 data URI:", uploadErr.message);
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
      isActive: isActive === undefined ? true : isActive === "true" || isActive === true,
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
    if (roleTitle !== undefined) opportunity.roleTitle = String(roleTitle).trim();

    if (countries !== undefined) {
      opportunity.countries = parseCountries(countries);
    }

    if (salary !== undefined) opportunity.salary = String(salary).trim();
    if (salaryCurrency !== undefined) opportunity.salaryCurrency = String(salaryCurrency).trim();

    if (skills !== undefined) {
      opportunity.skills = parseSkills(skills);
    }

    if (workModes !== undefined) {
      opportunity.workModes = parseWorkModes(workModes);
    }

    if (description !== undefined) opportunity.description = String(description).trim();
    if (featured !== undefined) opportunity.featured = featured === "true" || featured === true;
    if (isActive !== undefined) opportunity.isActive = isActive === "true" || isActive === true;

    // Logo update if new file uploaded or direct URL provided
    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          { name: `company-${Date.now()}` }
        );
        opportunity.companyLogo =
          uploadResult.data?.displayUrl ||
          uploadResult.data?.url ||
          uploadResult.data ||
          opportunity.companyLogo;
      } catch (uploadErr) {
        console.warn("ImgBB upload error on update, using base64:", uploadErr.message);
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
