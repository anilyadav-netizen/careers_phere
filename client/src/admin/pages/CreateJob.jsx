// src/admin/pages/CreateJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Save,
  PlusCircle,
  Trash2,
  X,
  Briefcase,
} from "lucide-react";
import { getAdminCategories } from "../../redux/slicer/categorySlice";
import { createJob } from "../../redux/slicer/jobSlice"; 

const CreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories?.categories || []);
  const categoriesLoading = useSelector((state) => state.categories?.loading || false);
  const categoriesError = useSelector((state) => state.categories?.error || null);
  
  const createLoading = useSelector((state) => state.jobs?.createLoading || false);
  const createError = useSelector((state) => state.jobs?.createError || null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    categoryId: "",
    location: "",
    jobType: "Full Time",
    experience: "0-3 Yrs",
    salary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: [],
    status: "active",
  });

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
    console.log("Categories from Redux:", categories);
  }, [categories]);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";

    const validResponsibilities = formData.responsibilities.filter((r) =>
      r.trim(),
    );
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
    const selectedCategory = categories.find(
      (category) => {
        const id = category._id || category.id;
        return String(id) === String(categoryId);
      }
    );

    console.log("Selected category:", selectedCategory);
    console.log("Category ID being sent:", categoryId);

    setFormData((prev) => ({
      ...prev,
      categoryId: categoryId,
      description: selectedCategory?.description || prev.description,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);

    try {
      const selectedCategory = categories.find(
        (category) => {
          const id = category._id || category.id;
          return String(id) === String(formData.categoryId);
        }
      );

      if (!selectedCategory) {
        showNotification("Invalid category selected", "error");
        setIsSaving(false);
        return;
      }

      const categoryObjectId = selectedCategory._id || selectedCategory.id;

      console.log("Selected category object:", selectedCategory);
      console.log("Category ObjectId being sent:", categoryObjectId);

      const responsibilities = formData.responsibilities.filter((r) => r.trim());
      const requirements = formData.requirements.filter((r) => r.trim());

      const jobData = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        category: categoryObjectId,
        categoryName: selectedCategory.name || "",
        location: formData.location.trim(),
        jobType: formData.jobType,
        experience: formData.experience,
        salary: formData.salary.trim(),
        description: formData.description.trim(),
        responsibilities,
        requirements,
        skills: formData.skills,
        status: formData.status,
      };

      console.log("Sending job data:", jobData);

      // Dispatch the createJob thunk
      const result = await dispatch(createJob(jobData)).unwrap();
      
      // Check if job was created successfully
      if (result?.success) {
        showNotification(result?.message || "Job created successfully", "success");
        
        // Redirect after showing notification
        setTimeout(() => {
          navigate("/admin/jobs");
        }, 1500);
      }

    } catch (err) {
      console.error("Create job error:", err);
      showNotification(typeof err === 'string' ? err : "Failed to create job", "error");
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
      (_, i) => i !== index,
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Create New Job
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add a new job opportunity to CareerSphere.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>

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
                  placeholder="e.g., Frontend Developer"
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
                  placeholder="e.g., Infosys"
                />
                {errors.company && (
                  <p className="text-xs text-red-600 mt-1">{errors.company}</p>
                )}
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
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  disabled={categoriesLoading}
                >
                  <option value="">
                    {categoriesLoading ? "Loading categories..." : "Select Category"}
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
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.location ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., Bangalore, India"
                />
                {errors.location && (
                  <p className="text-xs text-red-600 mt-1">{errors.location}</p>
                )}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                >
                  <option value="0-3 Yrs">0-3 Yrs</option>
                  <option value="1-3 Yrs">1-3 Yrs</option>
                  <option value="3-5 Yrs">3-5 Yrs</option>
                  <option value="5+ Yrs">5+ Yrs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Salary *
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.salary ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., ₹5-9 LPA"
                />
                {errors.salary && (
                  <p className="text-xs text-red-600 mt-1">{errors.salary}</p>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Job Description
            </h2>

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
                placeholder="Brief description of the job (auto-fills from category)"
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Responsibilities *
              </h2>
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Responsibility
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="Enter responsibility"
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Requirements *
              </h2>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Requirement
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="Enter requirement"
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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Skills Required *
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
              >
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.skills && (
              <p className="text-xs text-red-600">{errors.skills}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || createLoading || categoriesLoading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving || createLoading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>

      {/* Notification */}
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