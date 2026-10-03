// src/admin/pages/CreateJob.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Globe2,
  Image as ImageIcon,
  MapPin,
  PlusCircle,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { getAdminCategories } from "../../redux/slicer/categorySlice";
import { createJob } from "../../redux/slicer/jobSlice";
import { CountrySelectManager } from "../components/CountrySelectManager";

const DOMAIN_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Android",
  "UI/UX Designer",
  "Video Editor",
];

const JOB_TYPE_OPTIONS = [
  "Remote",
  "MNC",
  "Banking & Finance",
  "Startup",
  "HR",
  "Engineering",
  "Fortune 500",
  "Internship",
  "Project Management",
  "Sales",
  "Supply Chain",
];

const CreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories?.categories || []);
  const categoriesLoading = useSelector(
    (state) => state.categories?.loading || false,
  );
  const categoriesError = useSelector(
    (state) => state.categories?.error || null,
  );

  const createLoading = useSelector(
    (state) => state.jobs?.createLoading || false,
  );
  const createError = useSelector((state) => state.jobs?.createError || null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    categoryId: "",
    location: "",
    domain: "Frontend",
    jobType: "Remote",
    experience: "0-3 Yrs",
    salary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: [],
    status: "active",
    countries: [],
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (categories.length === 0 && !categoriesLoading) {
      dispatch(getAdminCategories());
    }
  }, [dispatch, categories.length, categoriesLoading]);

  useEffect(() => {
    if (createError) {
      showNotification(createError, "error");
    }
  }, [createError]);

  useEffect(() => {
    if (categoriesError) {
      showNotification("Failed to load categories", "error");
    }
  }, [categoriesError]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Please select a valid image file (PNG, JPG, WEBP)", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("Logo file size must be less than 5MB", "error");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";

    const validResponsibilities = formData.responsibilities.filter((r) => r.trim());
    if (validResponsibilities.length === 0)
      newErrors.responsibilities = "At least one responsibility is required";

    const validRequirements = formData.requirements.filter((r) => r.trim());
    if (validRequirements.length === 0)
      newErrors.requirements = "At least one requirement is required";

    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategoryChange = (categoryId) => {
    const selectedCategory = categories.find((category) => {
      const id = category._id || category.id;
      return String(id) === String(categoryId);
    });

    setFormData((prev) => ({
      ...prev,
      categoryId,
      description: selectedCategory?.description || prev.description,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);

    try {
      const selectedCategory = categories.find((category) => {
        const id = category._id || category.id;
        return String(id) === String(formData.categoryId);
      });

      if (!selectedCategory) {
        showNotification("Invalid category selected", "error");
        setIsSaving(false);
        return;
      }

      const categoryObjectId = String(
        selectedCategory._id || selectedCategory.id || formData.categoryId
      );
      const responsibilities = formData.responsibilities.filter((r) => r.trim());
      const requirements = formData.requirements.filter((r) => r.trim());

      const jobData = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        categoryId: categoryObjectId,
        categoryName: selectedCategory.name || "",
        location: formData.location.trim(),
        domain: formData.domain,
        jobType: formData.jobType,
        experience: formData.experience,
        salary: formData.salary.trim() || "Undisclosed",
        description: formData.description.trim(),
        responsibilities,
        requirements,
        skills: formData.skills,
        status: formData.status,
        countries: formData.countries,
      };

      if (logoFile) {
        jobData.companyLogo = logoFile;
      }

      const result = await dispatch(createJob(jobData)).unwrap();

      if (result?.success) {
        showNotification(result?.message || "Job created successfully", "success");
        setTimeout(() => {
          navigate("/admin/jobs");
        }, 1500);
      }
    } catch (err) {
      console.error("Create job error:", err);
      showNotification(
        typeof err === "string" ? err : "Failed to create job",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Create New Job
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Post a new job opportunity and link it to landing pages & countries
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ========================================================
            SECTION 1: BASIC JOB INFORMATION
        ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Basic Job Information
              </h2>
              <p className="text-xs text-slate-500">
                Title, company name, domain category and employment type
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.title ? "border-red-300" : "border-slate-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                placeholder="e.g., React Developer"
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.company ? "border-red-300" : "border-slate-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                placeholder="e.g., Google, Microsoft"
              />
              {errors.company && (
                <p className="text-xs text-red-600 mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Domain (Landing Page Category) *
              </label>
              <select
                value={formData.domain}
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
              >
                {DOMAIN_OPTIONS.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Job automatically appears on this Domain landing page & Global Opportunities.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Job Type *
              </label>
              <select
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({ ...formData, jobType: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
              >
                {JOB_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.categoryId ? "border-red-300" : "border-slate-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white`}
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select Category"}
                </option>
                {categories.map((cat) => {
                  const catId = cat._id || cat.id;
                  return (
                    <option key={catId} value={catId}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              {errors.categoryId && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.categoryId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 2: COMPANY LOGO UPLOAD
        ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Company Logo
              </h2>
              <p className="text-xs text-slate-500">
                Upload official company emblem (PNG, JPG, WEBP, max 5MB)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Logo Preview */}
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 relative group">
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-contain p-1"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove logo"
                  >
                    <Trash2 className="w-5 h-5 text-red-300" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-7 h-7" />
                  <span className="text-[10px] mt-1 font-medium">No Logo</span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="space-y-2 text-center sm:text-left">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer shadow-xs transition">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>{logoPreview ? "Change Logo" : "Upload Company Logo"}</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-500">
                Recommended aspect ratio: 1:1 or square transparent logo.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 3: LOCATION & MULTI-COUNTRY SELECTION
        ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Location & Global Countries
              </h2>
              <p className="text-xs text-slate-500">
                Primary job location and multiple eligible countries with flags
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Primary Location Text *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                  errors.location ? "border-red-300" : "border-slate-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                placeholder="e.g., Remote / Bangalore, India"
              />
            </div>
            {errors.location && (
              <p className="text-xs text-red-600 mt-1">{errors.location}</p>
            )}
          </div>

          {/* Multiple Countries Manager */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Eligible Countries & Flags (Multiple)
            </label>
            <p className="text-xs text-slate-500 mb-2.5">
              Add all countries where this job is available. Selected countries will display flags on job cards and match flag filtering on the Home & Find Jobs pages.
            </p>
            <CountrySelectManager
              countries={formData.countries}
              onChange={(updatedCountries) =>
                setFormData({ ...formData, countries: updatedCountries })
              }
            />
          </div>
        </div>

        {/* ========================================================
            SECTION 4: COMPENSATION & EXPERIENCE
        ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800">
              Compensation & Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Experience Range *
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
              >
                <option value="0-3 Yrs">0-3 Yrs</option>
                <option value="1-3 Yrs">1-3 Yrs</option>
                <option value="3-5 Yrs">3-5 Yrs</option>
                <option value="5+ Yrs">5+ Yrs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Salary (Optional - Defaults to "Undisclosed")
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                placeholder="e.g., ₹8-15 LPA (Leave blank for 'Undisclosed')"
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 5: DESCRIPTION, RESPONSIBILITIES & REQUIREMENTS
        ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800">
              Job Description & Details
            </h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.description ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              rows="4"
              placeholder="Brief description of the job..."
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Key Responsibilities *
              </label>
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Item
              </button>
            </div>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) =>
                    handleResponsibilityChange(index, e.target.value)
                  }
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder={`Responsibility #${index + 1}`}
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.responsibilities && (
              <p className="text-xs text-red-600">{errors.responsibilities}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Requirements & Qualifications *
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Item
              </button>
            </div>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder={`Requirement #${index + 1}`}
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.requirements && (
              <p className="text-xs text-red-600">{errors.requirements}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Required Skills *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                placeholder="Type a skill and press Enter (e.g., React, TypeScript)"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Add Skill
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.skills && (
              <p className="text-xs text-red-600">{errors.skills}</p>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || createLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-semibold shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving || createLoading ? "Saving..." : "Create Job"}
          </button>
        </div>
      </form>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default CreateJob;
