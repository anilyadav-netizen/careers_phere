const Job = require("../models/Job");
const Category = require("../models/Category");
const JobApplication = require("../models/JobApplication");
const FrontendApplication = require("../models/FrontendApplication");
const RoleOpportunity = require("../models/RoleOpportunity");
const SavedJob = require("../models/SavedJob");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");
const {
  sendApplicationConfirmation,
  sendRoleApplicationStatusUpdateEmail,
} = require("../utils/mailer");

// ============================================================
// HELPERS
// ============================================================

const parseArray = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (!Array.isArray(parsed)) {
        throw new Error(fieldName + " must be an array");
      }

      return parsed;
    } catch (error) {
      throw new Error(
        "Invalid " + fieldName + " format. Expected JSON array."
      );
    }
  }

  throw new Error(fieldName + " must be an array");
};

const parseCountries = (value) => {
  const arr = parseArray(value, "countries");
  return arr.map((item) => {
    if (typeof item === "string") {
      return { name: item.trim(), countryName: item.trim(), flag: "" };
    }
    const countryName = (item.name || item.countryName || "").trim();
    const flag = (item.flag || "").trim();
    return { name: countryName, countryName, flag };
  });
};

const parseBoolean = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
};

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(String(id));
};

const extractCleanCategoryId = (val) => {
  if (!val) return null;
  if (Array.isArray(val)) val = val[0];
  if (typeof val === "object" && val !== null) {
    val = val._id || val.id || null;
  }
  if (typeof val === "string") {
    val = val.trim();
    if (val.startsWith("{") && val.endsWith("}")) {
      try {
        const p = JSON.parse(val);
        val = p._id || p.id || val;
      } catch (e) {}
    }
  }
  if (!val || String(val) === "[object Object]") return null;
  return String(val).trim();
};

const resolveCategoryDoc = async (rawCategoryId) => {
  const cleanId = extractCleanCategoryId(rawCategoryId);
  if (!cleanId) return null;

  if (isValidObjectId(cleanId)) {
    const doc = await Category.findById(cleanId);
    if (doc) return doc;
  }

  // Fallback: look up by name or slug
  const docByName = await Category.findOne({
    $or: [
      { name: new RegExp(`^${cleanId}$`, "i") },
      { slug: new RegExp(`^${cleanId}$`, "i") },
    ],
  });

  return docByName;
};

// ============================================================
// COUNTRY HELPERS
// ============================================================

const countryAliases = {
  india: "india",
  ind: "india",

  america: "usa",
  usa: "usa",
  us: "usa",
  "u.s.a": "usa",
  "u.s.": "usa",
  "united states": "usa",
  "united states of america": "usa",

  uk: "uk",
  "u.k.": "uk",
  "united kingdom": "uk",
  england: "uk",

  canada: "canada",
  australia: "australia",
  germany: "germany",
  france: "france",
  japan: "japan",
  netherlands: "netherlands",
  singapore: "singapore",
  uae: "uae",
  "united arab emirates": "uae",
  dubai: "uae",
};

// Legacy jobs ke liye city -> country fallback
const legacyCityCountryMap = {
  // INDIA
  noida: "india",
  delhi: "india",
  "new delhi": "india",
  mumbai: "india",
  bangalore: "india",
  bengaluru: "india",
  hyderabad: "india",
  pune: "india",
  chennai: "india",
  kolkata: "india",
  gurgaon: "india",
  gurugram: "india",
  lucknow: "india",
  jaipur: "india",
  ahmedabad: "india",
  chandigarh: "india",
  indore: "india",
  surat: "india",
  nagpur: "india",
  bhopal: "india",
  patna: "india",
  kanpur: "india",
  kochi: "india",
  coimbatore: "india",
  mohali: "india",

  // USA
  america: "usa",
  usa: "usa",
  "united states": "usa",
  "new york": "usa",
  "los angeles": "usa",
  chicago: "usa",
  houston: "usa",
  boston: "usa",
  seattle: "usa",
  "san francisco": "usa",
  washington: "usa",
  "san diego": "usa",
  dallas: "usa",
  austin: "usa",
  miami: "usa",
  denver: "usa",
  atlanta: "usa",
  phoenix: "usa",
  philadelphia: "usa",
};

// Country ko ek standard value mein convert karta hai
const normalizeCountry = (value) => {
  if (!value) return "";

  const cleaned = String(value)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const parts = cleaned
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const candidate =
    parts.length > 1
      ? parts[parts.length - 1]
      : cleaned;

  return countryAliases[candidate] || candidate;
};

// Job ke country field ko priority deta hai.
// Purane jobs mein country empty ho to location se fallback karta hai.
const getJobCountry = (job) => {
  if (!job) return "";

  const explicitCountry = String(job.country || "").trim();

  if (explicitCountry) {
    return normalizeCountry(explicitCountry);
  }

  const location = String(job.location || "").trim();

  if (!location) {
    return "";
  }

  const locationParts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  // Example: "Noida, India"
  if (locationParts.length > 1) {
    const lastPart = normalizeCountry(
      locationParts[locationParts.length - 1]
    );

    if (countryAliases[lastPart] || legacyCityCountryMap[lastPart]) {
      return countryAliases[lastPart] || legacyCityCountryMap[lastPart];
    }

    return lastPart;
  }

  // Old jobs: "Noida" -> India
  const normalizedLocation = normalizeCountry(location);

  return (
    legacyCityCountryMap[normalizedLocation] ||
    normalizedLocation
  );
};

// ============================================================
// ADMIN CONTROLLERS
// ============================================================

// @desc    Create job
// @route   POST /api/admin/jobs
exports.createJob = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE JOB");
    console.log("BODY:", req.body);
    console.log(
      "FILE:",
      req.file ? req.file.originalname : "No file"
    );
    console.log("=================================");

    const {
      title,
      company,
      category,
      categoryId,
      location,
      country,
      jobType,
      domain,
      countries,
      salaryCurrency,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      status,
      companyWebsite,
      companyEmail,
      applicationDeadline,
      isFeatured,
      isUrgent,
      tags,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    const rawCategoryId = categoryId || category;

    console.log(
      "Selected Category ID:",
      rawCategoryId
    );

    const categoryDoc = await resolveCategoryDoc(rawCategoryId);

    console.log("Category Found:", categoryDoc);

    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid category selected",
      });
    }

    const selectedCategoryId = categoryDoc._id;

    const parsedResponsibilities = parseArray(
      responsibilities,
      "responsibilities"
    );

    const parsedRequirements = parseArray(
      requirements,
      "requirements"
    );

    const parsedSkills = parseArray(skills, "skills");

    const parsedTags = parseArray(tags, "tags");

    if (parsedResponsibilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one responsibility is required",
      });
    }

    if (parsedRequirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one requirement is required",
      });
    }

    if (parsedSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one skill is required",
      });
    }

    let companyLogo = null;

    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          {
            name: "company-logo-" + company,
          }
        );

        companyLogo = uploadResult.data;
      } catch (uploadError) {
        console.error(
          "Company logo upload error:",
          uploadError
        );

        return res.status(500).json({
          success: false,
          message: "Failed to upload company logo",
          error: uploadError.message,
        });
      }
    }

    const jobData = {
      title,
      company,

      categoryId: categoryDoc._id,
      categoryName: categoryDoc.name,

      location,

      // Country explicitly diya ho to use karo,
      // warna location se legacy fallback.
      country: country
        ? String(country).trim()
        : getJobCountry({ location }),

      jobType: jobType || "Remote",
      domain: domain ? String(domain).trim() : "",
      countries: parseCountries(countries),
      salaryCurrency: salaryCurrency ? String(salaryCurrency).trim() : "USD",
      experience: experience || "0-3 Yrs",

      salary: salary && String(salary).trim() ? String(salary).trim() : "Undisclosed",
      description,

      responsibilities: parsedResponsibilities,
      requirements: parsedRequirements,
      skills: parsedSkills,

      status: status || "active",

      postedBy: req.user ? req.user._id : undefined,
      postedByName: req.user ? req.user.name : undefined,

      companyLogo,

      companyWebsite: companyWebsite || "",
      companyEmail: companyEmail || "",

      applicationDeadline:
        applicationDeadline || null,

      isFeatured: parseBoolean(
        isFeatured,
        false
      ),

      isUrgent: parseBoolean(
        isUrgent,
        false
      ),

      tags: parsedTags,
    };

    console.log("JOB DATA:", jobData);

    const job = await Job.create(jobData);

    categoryDoc.jobCount =
      (categoryDoc.jobCount || 0) + 1;

    await categoryDoc.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create job",
    });
  }
};

// ============================================================
// GET ALL JOBS ADMIN
// ============================================================

exports.getAllJobsAdmin = async (req, res) => {
  try {
    const {
      status,
      category,
      categoryId,
      domain,
      jobType,
      search,
      sort,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (domain) {
      filter.domain = new RegExp(`^${domain.trim()}$`, "i");
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    const rawCategoryId =
      categoryId || category;

    if (rawCategoryId) {
      const cleanCatId = extractCleanCategoryId(rawCategoryId);
      if (cleanCatId) {
        const catDoc = await resolveCategoryDoc(cleanCatId);
        if (catDoc) {
          filter.categoryId = catDoc._id;
        } else if (isValidObjectId(cleanCatId)) {
          filter.categoryId = cleanCatId;
        } else {
          filter.categoryName = new RegExp(cleanCatId, "i");
        }
      }
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          country: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [new RegExp(search, "i")],
          },
        },
      ];
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    } else if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else if (sort === "applicants") {
      sortOption = {
        applicantCount: -1,
      };
    } else if (sort === "views") {
      sortOption = {
        views: -1,
      };
    }

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .populate(
        "postedBy",
        "name email"
      )
      .sort(sortOption);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get all jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch jobs",
    });
  }
};

// ============================================================
// GET SINGLE JOB ADMIN
// ============================================================

exports.getJobByIdAdmin = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(
      req.params.id
    )
      .populate(
        "categoryId",
        "name slug shortDescription image"
      )
      .populate(
        "postedBy",
        "name email mobile"
      );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(
      "Get job error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch job",
    });
  }
};

// ============================================================
// UPDATE JOB ADMIN
// ============================================================

exports.updateJob = async (req, res) => {
  try {
    console.log("=================================");
    console.log("UPDATE JOB");
    console.log("JOB ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log(
      "FILE:",
      req.file ? req.file.originalname : "No file"
    );
    console.log("=================================");

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const {
      title,
      company,
      category,
      categoryId,
      location,
      country,
      jobType,
      domain,
      countries,
      salaryCurrency,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      status,
      companyWebsite,
      companyEmail,
      applicationDeadline,
      isFeatured,
      isUrgent,
      tags,
    } = req.body;

    const rawCategoryId =
      categoryId || category;

    if (rawCategoryId) {
      const newCategory = await resolveCategoryDoc(rawCategoryId);

      if (newCategory) {
        const oldCategoryId =
          job.categoryId
            ? job.categoryId.toString()
            : null;

        if (
          !oldCategoryId ||
          newCategory._id.toString() !== oldCategoryId
        ) {
          if (job.categoryId) {
            const oldCategory =
              await Category.findById(
                job.categoryId
              );

            if (oldCategory) {
              oldCategory.jobCount =
                Math.max(
                  0,
                  (oldCategory.jobCount || 0) - 1
                );

              await oldCategory.save();
            }
          }

          newCategory.jobCount =
            (newCategory.jobCount || 0) + 1;

          await newCategory.save();

          job.categoryId =
            newCategory._id;

          job.categoryName =
            newCategory.name;
        }
      }
    }

    if (title !== undefined) {
      job.title = title;
    }

    if (company !== undefined) {
      job.company = company;
    }

    if (location !== undefined) {
      job.location = location;
    }

    // Country explicitly provided
    if (country !== undefined) {
      job.country = String(
        country || ""
      ).trim();
    } else if (location !== undefined) {
      // Old admin form country nahi bhejta,
      // to location se country derive karo.
      job.country = getJobCountry({
        location,
      });
    }

    if (jobType !== undefined) {
      job.jobType = jobType;
    }

    if (domain !== undefined) {
      job.domain = String(domain || "").trim();
    }

    if (countries !== undefined) {
      job.countries = parseCountries(countries);
    }

    if (salaryCurrency !== undefined) {
      job.salaryCurrency = String(salaryCurrency || "").trim();
    }

    if (experience !== undefined) {
      job.experience = experience;
    }

    if (salary !== undefined) {
      job.salary = salary && String(salary).trim() ? String(salary).trim() : "Undisclosed";
    }

    if (description !== undefined) {
      job.description = description;
    }

    if (status !== undefined) {
      job.status = status;
    }

    if (companyWebsite !== undefined) {
      job.companyWebsite =
        companyWebsite;
    }

    if (companyEmail !== undefined) {
      job.companyEmail =
        companyEmail;
    }

    if (applicationDeadline !== undefined) {
      job.applicationDeadline =
        applicationDeadline || null;
    }

    if (isFeatured !== undefined) {
      job.isFeatured = parseBoolean(
        isFeatured,
        false
      );
    }

    if (isUrgent !== undefined) {
      job.isUrgent = parseBoolean(
        isUrgent,
        false
      );
    }

    if (responsibilities !== undefined) {
      const parsedResponsibilities =
        parseArray(
          responsibilities,
          "responsibilities"
        );

      if (
        parsedResponsibilities.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one responsibility is required",
        });
      }

      job.responsibilities =
        parsedResponsibilities;
    }

    if (requirements !== undefined) {
      const parsedRequirements =
        parseArray(
          requirements,
          "requirements"
        );

      if (
        parsedRequirements.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one requirement is required",
        });
      }

      job.requirements =
        parsedRequirements;
    }

    if (skills !== undefined) {
      const parsedSkills =
        parseArray(
          skills,
          "skills"
        );

      if (parsedSkills.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "At least one skill is required",
        });
      }

      job.skills = parsedSkills;
    }

    if (tags !== undefined) {
      job.tags = parseArray(
        tags,
        "tags"
      );
    }

    if (req.file) {
      if (
        job.companyLogo &&
        job.companyLogo.deleteUrl
      ) {
        try {
          await deleteFromImgBB(
            job.companyLogo.deleteUrl
          );
        } catch (deleteError) {
          console.error(
            "Old logo delete error:",
            deleteError
          );
        }
      }

      const uploadResult =
        await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          {
            name:
              "company-logo-" +
              (company || job.company),
          }
        );

      job.companyLogo =
        uploadResult.data;
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.error(
      "Update job error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update job",
    });
  }
};

// ============================================================
// DELETE JOB
// ============================================================

exports.deleteJob = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (
      job.companyLogo &&
      job.companyLogo.deleteUrl
    ) {
      try {
        await deleteFromImgBB(
          job.companyLogo.deleteUrl
        );
      } catch (deleteError) {
        console.error(
          "Logo delete error:",
          deleteError
        );
      }
    }

    if (job.categoryId) {
      const category =
        await Category.findById(
          job.categoryId
        );

      if (category) {
        category.jobCount =
          Math.max(
            0,
            (category.jobCount || 0) - 1
          );

        await category.save();
      }
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Job deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete job error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete job",
    });
  }
};

// ============================================================
// TOGGLE JOB STATUS
// ============================================================

exports.toggleJobStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "active",
      "draft",
      "closed",
      "pending",
    ];

    if (
      !status ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be: active, draft, closed, or pending",
      });
    }

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.status = status;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job status updated to " +
        status,
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle job status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update job status",
    });
  }
};

// ============================================================
// TOGGLE FEATURED
// ============================================================

exports.toggleFeatured = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.isFeatured =
      !job.isFeatured;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job " +
        (job.isFeatured
          ? "featured"
          : "unfeatured") +
        " successfully",
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle featured error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to toggle featured status",
    });
  }
};

// ============================================================
// TOGGLE URGENT
// ============================================================

exports.toggleUrgent = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.isUrgent = !job.isUrgent;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job " +
        (job.isUrgent
          ? "marked as urgent"
          : "unmarked as urgent") +
        " successfully",
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle urgent error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to toggle urgent status",
    });
  }
};

// ============================================================
// USER CONTROLLERS
// ============================================================

exports.getAllJobsUser = async (
  req,
  res
) => {
  try {
    const {
      category,
      categoryId,
      domain,
      jobType,
      experience,
      country,
      location,
      company,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      status: "active",
    };

    if (company && company.trim()) {
      filter.$and = filter.$and || [];
      filter.$and.push({
        company: new RegExp(company.trim(), "i"),
      });
    }

    if (domain) {
      filter.domain = new RegExp(`^${domain.trim()}$`, "i");
    }

    const targetLocation = (country || location || "").trim();
    if (targetLocation) {
      const locRegex = new RegExp(targetLocation, "i");
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { country: locRegex },
          { location: locRegex },
          { "countries.name": locRegex },
          { "countries.countryName": locRegex },
        ],
      });
    }

    const rawCategoryId =
      categoryId || category;

    if (rawCategoryId) {
      const cleanCatId = extractCleanCategoryId(rawCategoryId);
      if (cleanCatId) {
        const catDoc = await resolveCategoryDoc(cleanCatId);
        filter.$and = filter.$and || [];
        if (catDoc) {
          filter.$and.push({
            $or: [
              { categoryId: catDoc._id },
              { category: catDoc._id },
              { categoryName: new RegExp(`^${catDoc.name}$`, "i") },
            ],
          });
        } else if (isValidObjectId(cleanCatId)) {
          filter.$and.push({
            $or: [
              { categoryId: cleanCatId },
              { category: cleanCatId },
            ],
          });
        } else {
          filter.$and.push({
            $or: [
              { categoryName: new RegExp(cleanCatId, "i") },
              { department: new RegExp(cleanCatId, "i") },
            ],
          });
        }
      }
    }

    if (jobType) {
      filter.jobType = new RegExp(`^${jobType.trim()}$`, "i");
    }

    if (experience) {
      filter.experience = experience;
    }

    if (search) {
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            company: {
              $regex: search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
          {
            location: {
              $regex: search,
              $options: "i",
            },
          },
          {
            country: {
              $regex: search,
              $options: "i",
            },
          },
          {
            skills: {
              $in: [new RegExp(search, "i")],
            },
          },
        ],
      });
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    } else if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else if (sort === "popular") {
      sortOption = {
        views: -1,
      };
    } else if (sort === "urgent") {
      sortOption = {
        isUrgent: -1,
        createdAt: -1,
      };
    }

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    const total =
      await Job.countDocuments(
        filter
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get all jobs user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch jobs",
    });
  }
};

// ============================================================
// GET SINGLE JOB USER
// ============================================================

exports.getJobByIdUser = async (
  req,
  res
) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      status: "active",
    }).populate(
      "categoryId",
      "name slug shortDescription image"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.views =
      (job.views || 0) + 1;

    await job.save();

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(
      "Get job user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch job",
    });
  }
};

// ============================================================
// GET JOBS BY CATEGORY SLUG
// ============================================================

exports.getJobsByCategory = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const {
      page = 1,
      limit = 10,
    } = req.query;

    const category =
      await Category.findOne({
        slug,
        isActive: true,
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const filter = {
      categoryId: category._id,
      status: "active",
    };

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total =
      await Job.countDocuments(
        filter
      );

    return res.status(200).json({
      success: true,
      category: category.name,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get jobs by category error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch jobs",
    });
  }
};

// ============================================================
// FEATURED JOBS
// ============================================================

exports.getFeaturedJobs = async (
  req,
  res
) => {
  try {
    const { limit = 6 } =
      req.query;

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 6
    );

    const jobs = await Job.find({
      status: "active",
      isFeatured: true,
    })
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get featured jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch featured jobs",
    });
  }
};

// ============================================================
// URGENT JOBS
// ============================================================

exports.getUrgentJobs = async (
  req,
  res
) => {
  try {
    const { limit = 5 } =
      req.query;

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 5
    );

    const jobs = await Job.find({
      status: "active",
      isUrgent: true,
    })
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get urgent jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch urgent jobs",
    });
  }
};

// ============================================================
// SEARCH JOBS
// ============================================================

exports.searchJobs = async (
  req,
  res
) => {
  try {
    const {
      q,
      page = 1,
      limit = 10,
    } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message:
          "Search query is required",
      });
    }

    const filter = {
      status: "active",
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          company: {
            $regex: q,
            $options: "i",
          },
        },
        {
          description: {
            $regex: q,
            $options: "i",
          },
        },
        {
          location: {
            $regex: q,
            $options: "i",
          },
        },
        {
          country: {
            $regex: q,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [new RegExp(q, "i")],
          },
        },
      ],
    };

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total =
      await Job.countDocuments(
        filter
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      query: q,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Search jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to search jobs",
    });
  }
};

// ============================================================
// JOB STATS
// ============================================================

exports.getJobStats = async (
  req,
  res
) => {
  try {
    const totalJobs =
      await Job.countDocuments({
        status: "active",
      });

    const featuredJobs =
      await Job.countDocuments({
        status: "active",
        isFeatured: true,
      });

    const urgentJobs =
      await Job.countDocuments({
        status: "active",
        isUrgent: true,
      });

    const categoryStats =
      await Job.aggregate([
        {
          $match: {
            status: "active",
          },
        },
        {
          $group: {
            _id: "$categoryId",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            categoryName:
              "$category.name",
            count: 1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,
      data: {
        totalJobs,
        featuredJobs,
        urgentJobs,
        topCategories:
          categoryStats,
      },
    });
  } catch (error) {
    console.error(
      "Get job stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch job stats",
    });
  }
};

// ============================================================
// JOB APPLICATIONS - USER
// ============================================================

const MAX_JOB_APPLICATIONS = 4;

exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user ? req.user._id : null;

    // ========================================================
    // VALIDATE JOB ID
    // ========================================================

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // ========================================================
    // VALIDATE REQUEST JOB ID
    // ========================================================

    if (req.body.jobId && req.body.jobId !== jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required and must match the requested job",
      });
    }

    // ========================================================
    // CHECK JOB
    // ========================================================

    const job = await Job.findOne({
      _id: jobId,
      status: "active",
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or no longer active",
      });
    }

    // ========================================================
    // APPLICATION DEADLINE
    // ========================================================

    if (
      job.applicationDeadline &&
      new Date() > new Date(job.applicationDeadline)
    ) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed for this job",
      });
    }

    // ========================================================
    // EXTRACT CANDIDATE INFO
    // ========================================================

    const applicantName = String(
      req.body.name || req.body.fullName || ""
    ).trim();

    const applicantEmail = String(
      req.body.email || ""
    ).trim().toLowerCase();

    const applicantPhone = String(
      req.body.phone || ""
    ).trim();

    if (!applicantName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!applicantEmail) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    if (!applicantPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!req.files?.resume?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required (.pdf, .doc, or .docx)",
      });
    }

    // ========================================================
    // DUPLICATE APPLICATION CHECK & APPLICATION LIMIT
    // ========================================================

    let applicationsUsed = 0;

    if (userId) {
      const existingApplication = await JobApplication.findOne({
        applicant: userId,
        job: jobId,
      });

      if (existingApplication) {
        return res.status(400).json({
          success: false,
          code: "ALREADY_APPLIED",
          message: "You have already applied to this job.",
        });
      }

      applicationsUsed = await JobApplication.countDocuments({
        applicant: userId,
      });

      if (applicationsUsed >= MAX_JOB_APPLICATIONS) {
        return res.status(403).json({
          success: false,
          code: "APPLICATION_LIMIT_REACHED",
          message:
            "You have reached the maximum limit of 4 job applications. You cannot apply for any more jobs with this account.",
          data: {
            applicationsUsed,
            maxApplications: MAX_JOB_APPLICATIONS,
            remainingApplications: 0,
          },
        });
      }
    } else {
      // Guest user (not logged in) - check by email
      const existingGuestApp = await JobApplication.findOne({
        job: jobId,
        "applicationData.email": applicantEmail,
      });

      if (existingGuestApp) {
        return res.status(400).json({
          success: false,
          code: "ALREADY_APPLIED",
          message:
            "An application has already been submitted for this job with this email address.",
        });
      }

      applicationsUsed = await JobApplication.countDocuments({
        "applicationData.email": applicantEmail,
      });

      if (applicationsUsed >= MAX_JOB_APPLICATIONS) {
        return res.status(403).json({
          success: false,
          code: "APPLICATION_LIMIT_REACHED",
          message:
            "You have reached the maximum limit of 4 job applications with this email address.",
          data: {
            applicationsUsed,
            maxApplications: MAX_JOB_APPLICATIONS,
            remainingApplications: 0,
          },
        });
      }
    }

    // ========================================================
    // SKILLS
    // ========================================================

    let skills = [];
    const rawSkills = req.body.skills || req.body.frontendSkills;

    if (rawSkills) {
      if (typeof rawSkills === "string") {
        try {
          const parsed = JSON.parse(rawSkills);
          skills = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          skills = rawSkills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      } else if (Array.isArray(rawSkills)) {
        skills = rawSkills;
      }
    }

    // ========================================================
    // FILE DATA
    // ========================================================

    const fileData = (fieldName) => {
      const file = req.files?.[fieldName]?.[0];

      if (!file) {
        return undefined;
      }

      return {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        data: file.buffer,
      };
    };

    // ========================================================
    // PROFILE PHOTO (OPTIONAL)
    // ========================================================

    let profilePhoto;
    const profilePhotoFile = req.files?.profilePhoto?.[0];

    if (profilePhotoFile) {
      try {
        const uploadResult = await uploadToImgBB(
          profilePhotoFile.buffer,
          profilePhotoFile.originalname,
          {
            name: `application-profile-${userId || "guest"}`,
          }
        );

        profilePhoto = {
          url:
            uploadResult.data.displayUrl ||
            uploadResult.data.url,
          filename: profilePhotoFile.originalname,
          mimetype: profilePhotoFile.mimetype,
          size: profilePhotoFile.size,
        };
      } catch (uploadErr) {
        console.warn("Profile photo upload failed:", uploadErr.message);
      }
    }

    // ========================================================
    // CREATE APPLICATION
    // ========================================================

    let application;

    try {
      application = await JobApplication.create({
        job: jobId,
        applicant: userId || null,
        status: "pending",
        appliedAt: new Date(),
        isSendMail: false,

        applicationData: {
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          experienceType: String(req.body.experienceType || "Not specified").trim(),
          experience: String(req.body.experience || "").trim(),
          skills,
          currentLocation: String(req.body.currentLocation || "").trim(),
          expectedSalary: String(req.body.expectedSalary || "").trim(),
          noticePeriod: String(req.body.noticePeriod || "Not specified").trim(),
          linkedin: String(req.body.linkedin || "").trim(),
          portfolio: String(req.body.portfolio || "").trim(),
          coverLetter: String(req.body.coverLetter || req.body.aboutYou || "").trim(),
          additionalInfo: String(req.body.additionalInfo || "").trim(),
          passport: String(req.body.passport || "Not specified").trim(),
          profilePhoto,
          governmentDocument: fileData("governmentDocument"),
          resume: fileData("resume"),
        },
      });
    } catch (error) {
      // Duplicate key protection
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          code: "ALREADY_APPLIED",
          message: "You have already applied to this job.",
        });
      }

      throw error;
    }

    // ========================================================
    // UPDATE JOB APPLICANT COUNT
    // ========================================================

    job.applicantCount = (job.applicantCount || 0) + 1;
    await job.save();

    // ========================================================
    // SEND IMMEDIATE CONFIRMATION EMAIL (GUEST OR LOGGED IN)
    // ========================================================

    sendApplicationConfirmation({
      user: {
        name: applicantName,
        email: applicantEmail,
      },
      job: {
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
      },
      application,
    })
      .then(async () => {
        await JobApplication.updateOne(
          { _id: application._id },
          { $set: { isSendMail: true } }
        );
      })
      .catch((mailErr) => {
        console.error(
          "Immediate job application confirmation email error:",
          mailErr.message
        );
      });

    // ========================================================
    // FINAL APPLICATION USAGE
    // ========================================================

    const totalApplications = applicationsUsed + 1;
    const remainingApplications = Math.max(
      0,
      MAX_JOB_APPLICATIONS - totalApplications
    );

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
      applicationUsage: {
        applicationsUsed: totalApplications,
        maxApplications: MAX_JOB_APPLICATIONS,
        remainingApplications,
      },
    });
  } catch (error) {
    console.error("Apply to job error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit application",
    });
  }
};


// ============================================================
// USER APPLICATIONS
// ============================================================

exports.getMyApplications = async (
  req,
  res
) => {
  try {
    const { status } =
      req.query;

    const filter = {
      applicant: req.user._id,
    };

    if (status) {
      filter.status = status;
    }

    const applications =
      await JobApplication.find(
        filter
      )
        .populate(
          "job",
          "title company location country jobType salary companyLogo status isFeatured isUrgent"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count:
        applications.length,
      data: applications,
    });
  } catch (error) {
    console.error(
      "Get my applications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch applications",
    });
  }
};

// ============================================================
// JOB APPLICATIONS - ADMIN
// ============================================================

exports.getJobApplicationsAdmin =
  async (req, res) => {
    try {
      const jobId =
        req.params.id;

      if (!isValidObjectId(jobId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid job ID",
        });
      }

      const { status } =
        req.query;

      const filter = {
        job: jobId,
      };

      if (status) {
        filter.status = status;
      }

      const applications =
        await JobApplication.find(
          filter
        )
          .populate(
            "applicant",
            "name email mobile"
          )
          .populate(
            "job",
            "title company"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count:
          applications.length,
        data: applications,
      });
    } catch (error) {
      console.error(
        "Get job applications error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch applications",
      });
    }
  };

// ============================================================
// ALL APPLICATIONS ADMIN (UNIFIED: JOB APPLICATIONS + ROLE APPLICATIONS)
// ============================================================

exports.getAllApplicationsAdmin =
  async (req, res) => {
    try {
      const {
        status,
        job,
      } = req.query;

      const jobFilter = {};
      const roleFilter = {};

      if (status) {
        jobFilter.status = status;
        roleFilter.status = status;
      }

      if (job) {
        if (!isValidObjectId(job)) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid job ID",
          });
        }

        jobFilter.job = job;
      }

      // Fetch standard JobApplications
      const standardApplications = await JobApplication.find(jobFilter)
        .populate("applicant", "name email mobile")
        .populate("job", "title company location country domain jobType")
        .sort({ createdAt: -1 })
        .lean();

      // If filtering by specific regular job ID, we only return regular job applications
      let roleApplications = [];
      if (!job) {
        roleApplications = await FrontendApplication.find(roleFilter)
          .select("-resume.data")
          .sort({ createdAt: -1 })
          .lean();
      }

      // Format FrontendApplication into unified application schema
      const mappedRoleApplications = roleApplications.map((roleApp) => ({
        _id: roleApp._id,
        isRoleApplication: true,
        status: roleApp.status || "pending",
        appliedAt: roleApp.createdAt,
        createdAt: roleApp.createdAt,
        updatedAt: roleApp.updatedAt,
        applicant: null,
        job: {
          _id: roleApp.opportunityId || roleApp._id,
          title: roleApp.opportunityRole || roleApp.role || "Role Application",
          company: roleApp.companyName || "CareerNova Partner",
          location: roleApp.currentLocation || "Remote",
          country: roleApp.currentCountry || "Global",
          domain: roleApp.role || "Frontend Developer",
          jobType: "Remote",
        },
        applicationData: {
          name: roleApp.fullName,
          email: roleApp.email,
          phone: roleApp.phone,
          experience: roleApp.experience,
          currentLocation: roleApp.currentLocation || roleApp.currentCountry || "",
          expectedSalary: roleApp.expectedSalary ? String(roleApp.expectedSalary) : "",
          noticePeriod: roleApp.noticePeriod || "",
          linkedin: roleApp.linkedin || "",
          portfolio: roleApp.portfolio || "",
          additionalInfo: roleApp.aboutYou || "",
          skills: roleApp.frontendSkills
            ? roleApp.frontendSkills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          resume: roleApp.resume
            ? {
                filename: roleApp.resume.filename,
                mimetype: roleApp.resume.mimetype,
                size: roleApp.resume.size,
              }
            : null,
        },
      }));

      // Combine and sort by createdAt descending
      const allApplications = [...standardApplications, ...mappedRoleApplications].sort(
        (a, b) => new Date(b.createdAt || b.appliedAt) - new Date(a.createdAt || a.appliedAt)
      );

      return res.status(200).json({
        success: true,
        count: allApplications.length,
        data: allApplications,
      });
    } catch (error) {
      console.error(
        "Get all applications error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch applications",
      });
    }
  };

// ============================================================
// APPLICATION BY ID ADMIN
// ============================================================

exports.getApplicationByIdAdmin =
  async (req, res) => {
    try {
      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application ID",
        });
      }

      let application =
        await JobApplication.findById(
          req.params.id
        )
          .populate(
            "applicant",
            "name email mobile"
          )
          .populate(
            "job",
            "title company location country categoryName domain jobType"
          );

      if (!application) {
        // Fallback: Check FrontendApplication (role application)
        const roleApp = await FrontendApplication.findById(req.params.id);
        if (!roleApp) {
          return res.status(404).json({
            success: false,
            message: "Application not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: {
            _id: roleApp._id,
            isRoleApplication: true,
            status: roleApp.status || "pending",
            fullName: roleApp.fullName,
            email: roleApp.email,
            phoneNumber: roleApp.phone,
            totalExperience: roleApp.experience,
            experienceType: "Relevant Experience",
            currentLocation: roleApp.currentLocation || roleApp.currentCountry || "",
            expectedSalary: roleApp.expectedSalary ? String(roleApp.expectedSalary) : "",
            noticePeriod: roleApp.noticePeriod || "",
            linkedInProfile: roleApp.linkedin || "",
            portfolioWebsite: roleApp.portfolio || "",
            additionalInformation: roleApp.aboutYou || "",
            coverLetter: "",
            categoryName: roleApp.role || "Role Application",
            domain: roleApp.role,
            skills: roleApp.frontendSkills
              ? roleApp.frontendSkills.split(",").map((s) => s.trim()).filter(Boolean)
              : [],
            resume: roleApp.resume?.filename || "",
            job: {
              title: roleApp.opportunityRole || roleApp.role || "Role Opportunity",
              company: roleApp.companyName || "CareerNova Partner",
              location: roleApp.currentLocation || "Remote",
              country: roleApp.currentCountry || "Global",
              domain: roleApp.role,
              jobType: "Remote",
            },
            appliedAt: roleApp.createdAt,
            createdAt: roleApp.createdAt,
          },
        });
      }

      const data =
        application.toObject();

      const submitted =
        data.applicationData || {};

      data.fullName =
        submitted.name ||
        data.applicant?.name ||
        "Unknown Applicant";

      data.email =
        submitted.email ||
        data.applicant?.email ||
        "";

      data.phoneNumber =
        submitted.phone ||
        data.applicant?.mobile ||
        "";

      data.experienceType =
        submitted.experienceType ||
        "Not provided";

      data.totalExperience =
        submitted.experience || "";

      data.currentLocation =
        submitted.currentLocation ||
        data.job?.location ||
        "";

      data.expectedSalary =
        submitted.expectedSalary ||
        "";

      data.noticePeriod =
        submitted.noticePeriod ||
        "";

      data.professionalDetails =
        submitted.additionalInfo ||
        "";

      data.categoryName =
        data.job?.categoryName ||
        "Not provided";

      data.linkedInProfile =
        submitted.linkedin || "";

      data.portfolioWebsite =
        submitted.portfolio || "";

      data.coverLetter =
        submitted.coverLetter || "";

      data.additionalInformation =
        submitted.additionalInfo ||
        "";

      data.profilePhoto =
        submitted.profilePhoto?.url ||
        "";

      data.governmentIdDocument =
        submitted.governmentDocument
          ?.filename || "";

      data.resume =
        submitted.resume?.filename ||
        "";

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "Get application by id error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch application",
      });
    }
  };

// ============================================================
// UPDATE APPLICATION STATUS
// ============================================================

exports.updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const allowedStatuses = [
        "pending",
        "shortlisted",
        "rejected",
      ];

      if (
        !status ||
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Must be: pending, shortlisted, or rejected",
        });
      }

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application ID",
        });
      }

      let application =
        await JobApplication.findById(
          req.params.id
        );

      if (!application) {
        // Fallback: Check FrontendApplication (role application)
        const roleApp = await FrontendApplication.findById(req.params.id);
        if (!roleApp) {
          return res.status(404).json({
            success: false,
            message:
              "Application not found",
          });
        }

        roleApp.status = status;
        await roleApp.save();

        if (roleApp.email) {
          sendRoleApplicationStatusUpdateEmail({
            email: roleApp.email,
            name: roleApp.fullName || "Candidate",
            roleTitle: roleApp.opportunityRole || roleApp.role || "Role Application",
            status: status,
          }).catch((emailErr) => {
            console.error(
              "Role application status email notification failed:",
              emailErr.message || emailErr
            );
          });
        }

        return res.status(200).json({
          success: true,
          message: `Application status updated to ${status}`,
          data: roleApp,
        });
      }

      application.status =
        status;

      await application.save();

      await application.populate([
        { path: "applicant", select: "name email mobile" },
        { path: "job", select: "title company location country" },
      ]);

      // Send status notification email to candidate
      const candidateEmail =
        application.applicationData?.email ||
        application.applicant?.email;

      const candidateName =
        application.applicationData?.name ||
        application.applicant?.name ||
        "Candidate";

      const jobTitle =
        application.job?.title || "your job application";

      if (candidateEmail) {
        sendRoleApplicationStatusUpdateEmail({
          email: candidateEmail,
          name: candidateName,
          roleTitle: jobTitle,
          status: status,
        }).catch((emailErr) => {
          console.error(
            "Job application status email notification failed:",
            emailErr.message || emailErr
          );
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Application status updated to " +
          status,
        data: application,
      });
    } catch (error) {
      console.error(
        "Update application status error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to update application status",
      });
    }
  };

// ============================================================
// DOWNLOAD APPLICATION RESUME (ADMIN)
// ============================================================

exports.downloadApplicationResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    let application = await JobApplication.findById(id);

    if (application) {
      const resObj =
        application.applicationData?.resume || application.resume;

      if (resObj && resObj.data) {
        const { filename, mimetype, data } = resObj;
        res.setHeader("Content-Type", mimetype || "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(filename || 'resume.pdf')}"`
        );
        return res.send(data);
      }

      if (resObj?.url && (resObj.url.startsWith("http://") || resObj.url.startsWith("https://"))) {
        return res.redirect(resObj.url);
      }

      if (typeof resObj === "string" && (resObj.startsWith("http://") || resObj.startsWith("https://"))) {
        return res.redirect(resObj);
      }
    }

    // Fallback: Check FrontendApplication
    const roleApp = await FrontendApplication.findById(id);
    if (roleApp) {
      if (roleApp.resume && roleApp.resume.data) {
        const { filename, mimetype, data } = roleApp.resume;

        res.setHeader("Content-Type", mimetype || "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(filename || 'resume.pdf')}"`
        );

        return res.send(data);
      }

      if (roleApp.resume?.url && (roleApp.resume.url.startsWith("http://") || roleApp.resume.url.startsWith("https://"))) {
        return res.redirect(roleApp.resume.url);
      }
    }

    return res.status(404).json({
      success: false,
      message: "Resume file not found",
    });
  } catch (error) {
    console.error("Download application resume error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to download resume",
    });
  }
};

// ============================================================
// DELETE APPLICATION
// ============================================================

exports.deleteApplication =
  async (req, res) => {
    try {
      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application ID",
        });
      }

      const application =
        await JobApplication.findById(
          req.params.id
        );

      if (!application) {
        // Fallback: Check FrontendApplication
        const roleApp = await FrontendApplication.findById(req.params.id);
        if (!roleApp) {
          return res.status(404).json({
            success: false,
            message:
              "Application not found",
          });
        }

        await roleApp.deleteOne();

        return res.status(200).json({
          success: true,
          message:
            "Application deleted successfully",
        });
      }

      await application.deleteOne();

      const job =
        await Job.findById(
          application.job
        );

      if (job) {
        job.applicantCount =
          Math.max(
            0,
            (job.applicantCount || 0) -
              1
          );

        await job.save();
      }

      return res.status(200).json({
        success: true,
        message:
          "Application deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete application error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to delete application",
      });
    }
  };

// ============================================================
// SAVED JOBS - USER
// ============================================================

exports.saveJob = async (
  req,
  res
) => {
  try {
    const jobId =
      req.params.id;

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid job ID",
      });
    }

    const job =
      await Job.findOne({
        _id: jobId,
        status: "active",
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or no longer active",
      });
    }

    try {
      const saved =
        await SavedJob.create({
          job: jobId,
          user: req.user._id,
        });

      return res.status(201).json({
        success: true,
        message:
          "Job saved successfully",
        data: saved,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message:
            "Job is already saved",
        });
      }

      throw error;
    }
  } catch (error) {
    console.error(
      "Save job error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to save job",
    });
  }
};

// ============================================================
// UNSAVE JOB
// ============================================================

exports.unsaveJob = async (
  req,
  res
) => {
  try {
    const jobId =
      req.params.id;

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid job ID",
      });
    }

    const result =
      await SavedJob.findOneAndDelete({
        job: jobId,
        user: req.user._id,
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "This job is not in your saved list",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Job removed from saved list",
    });
  } catch (error) {
    console.error(
      "Unsave job error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to unsave job",
    });
  }
};

// ============================================================
// GET SAVED JOBS
// ============================================================

exports.getSavedJobs = async (
  req,
  res
) => {
  try {
    const savedJobs =
      await SavedJob.find({
        user: req.user._id,
      })
        .populate(
          "job",
          "title company location country jobType salary companyLogo status isFeatured isUrgent"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count:
        savedJobs.length,
      data: savedJobs,
    });
  } catch (error) {
    console.error(
      "Get saved jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch saved jobs",
    });
  }
};