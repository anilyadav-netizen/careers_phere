import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Plus,
  Search,
  Trash2,
  Edit2,
  RefreshCw,
  Globe2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  X,
  Code2,
  Server,
  Layers,
  Smartphone,
  Film,
  Sparkles,
  Upload,
  Check,
  Flag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  fetchAdminOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  fetchOpportunityStats,
  resetActionState,
} from "../../redux/slicer/roleOpportunitySlice";

// Role options with badges and accents
export const ROLE_OPTIONS = [
  {
    label: "Frontend Developer",
    value: "Frontend Developer",
    icon: Code2,
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    label: "Backend Developer",
    value: "Backend Developer",
    icon: Server,
    badge: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    label: "Full Stack Developer",
    value: "Full Stack Developer",
    icon: Layers,
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    label: "Android Developer",
    value: "Android Developer",
    icon: Smartphone,
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Video Editor",
    value: "Video Editor",
    icon: Film,
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  },
  {
    label: "UI/UX Designer",
    value: "UI/UX Designer",
    icon: Sparkles,
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
];

// Preset popular countries for 1-click add
const QUICK_COUNTRIES = [
  { name: "United States", flag: "https://flagcdn.com/w80/us.png", emoji: "🇺🇸" },
  { name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png", emoji: "🇬🇧" },
  { name: "Germany", flag: "https://flagcdn.com/w80/de.png", emoji: "🇩🇪" },
  { name: "Canada", flag: "https://flagcdn.com/w80/ca.png", emoji: "🇨🇦" },
  { name: "Australia", flag: "https://flagcdn.com/w80/au.png", emoji: "🇦🇺" },
  { name: "Netherlands", flag: "https://flagcdn.com/w80/nl.png", emoji: "🇳🇱" },
  { name: "Singapore", flag: "https://flagcdn.com/w80/sg.png", emoji: "🇸🇬" },
  { name: "United Arab Emirates", flag: "https://flagcdn.com/w80/ae.png", emoji: "🇦🇪" },
  { name: "India", flag: "https://flagcdn.com/w80/in.png", emoji: "🇮🇳" },
];

const initialForm = {
  companyName: "",
  roleCategory: "Frontend Developer",
  roleTitle: "",
  salary: "",
  salaryCurrency: "USD",
  skillsInput: "",
  workModes: ["Remote", "Hybrid"],
  description: "",
  isActive: true,
  countries: [{ countryName: "", flag: "" }],
};

const RoleOpportunities = () => {
  const dispatch = useDispatch();

  const {
    adminList: opportunities = [],
    adminLoading: loading,
    pagination,
    actionLoading,
    actionSuccess,
    actionError,
    stats,
  } = useSelector((state) => state.roleOpportunities || {});

  // Filters
  const [roleFilter, setRoleFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [formError, setFormError] = useState("");

  // Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Notification Toast
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch opportunities
  const loadData = useCallback(() => {
    dispatch(
      fetchAdminOpportunities({
        roleCategory: roleFilter,
        search: searchTerm,
        status: statusFilter,
        page: currentPage,
        limit: 15,
      })
    );
    dispatch(fetchOpportunityStats());
  }, [dispatch, roleFilter, searchTerm, statusFilter, currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle action success / error
  useEffect(() => {
    if (actionSuccess) {
      showNotification(
        modalMode === "create"
          ? "Role opportunity created successfully!"
          : "Role opportunity updated successfully!"
      );
      setIsModalOpen(false);
      dispatch(resetActionState());
      loadData();
    }
    if (actionError) {
      setFormError(actionError);
      showNotification(actionError, "error");
      dispatch(resetActionState());
    }
  }, [actionSuccess, actionError, dispatch, loadData, modalMode]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode("create");
    setEditingId(null);
    setFormData({
      ...initialForm,
      roleCategory: roleFilter || "Frontend Developer",
      countries: [{ countryName: "", flag: "" }],
    });
    setLogoFile(null);
    setLogoPreview("");
    setFormError("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (opp) => {
    setModalMode("edit");
    setEditingId(opp._id);
    setFormData({
      companyName: opp.companyName || "",
      roleCategory: opp.roleCategory || "Frontend Developer",
      roleTitle: opp.roleTitle || "",
      salary: opp.salary || "",
      salaryCurrency: opp.salaryCurrency || "USD",
      skillsInput: Array.isArray(opp.skills) ? opp.skills.join(", ") : "",
      workModes: opp.workModes || ["Remote", "Hybrid"],
      description: opp.description || "",
      isActive: opp.isActive !== undefined ? opp.isActive : true,
      countries:
        opp.countries && opp.countries.length > 0
          ? opp.countries.map((c) => ({
              countryName: c.countryName || "",
              flag: c.flag || "",
            }))
          : [{ countryName: "", flag: "" }],
    });
    setLogoFile(null);
    setLogoPreview(opp.companyLogo || "");
    setFormError("");
    setIsModalOpen(true);
  };

  // Handle Logo selection
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Countries dynamic repeater
  const handleAddCountry = () => {
    setFormData((prev) => ({
      ...prev,
      countries: [...prev.countries, { countryName: "", flag: "" }],
    }));
  };

  const handleRemoveCountry = (index) => {
    setFormData((prev) => ({
      ...prev,
      countries: prev.countries.filter((_, i) => i !== index),
    }));
  };

  const handleCountryChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.countries];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, countries: updated };
    });
  };

  // Add quick preset country
  const handleAddQuickCountry = (preset) => {
    setFormData((prev) => {
      // Check if already in list
      const exists = prev.countries.some(
        (c) => c.countryName.toLowerCase() === preset.name.toLowerCase()
      );
      if (exists) return prev;

      // If only 1 empty row, replace it
      if (
        prev.countries.length === 1 &&
        !prev.countries[0].countryName &&
        !prev.countries[0].flag
      ) {
        return {
          ...prev,
          countries: [{ countryName: preset.name, flag: preset.flag }],
        };
      }

      return {
        ...prev,
        countries: [
          ...prev.countries,
          { countryName: preset.name, flag: preset.flag },
        ],
      };
    });
  };

  // Handle Work Mode Toggle
  const handleToggleWorkMode = (mode) => {
    setFormData((prev) => {
      const exists = prev.workModes.includes(mode);
      return {
        ...prev,
        workModes: exists
          ? prev.workModes.filter((m) => m !== mode)
          : [...prev.workModes, mode],
      };
    });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.companyName.trim()) {
      setFormError("Company name is required");
      return;
    }

    if (!formData.roleCategory.trim()) {
      setFormError("Role category is required");
      return;
    }

    // Validate countries: each non-empty entry must have countryName OR flag
    const validCountries = formData.countries.filter(
      (c) => (c.countryName && c.countryName.trim()) || (c.flag && c.flag.trim())
    );

    // If user provided any rows but all are empty, or if an entered row violates rule:
    for (let i = 0; i < formData.countries.length; i++) {
      const item = formData.countries[i];
      const hasName = Boolean(item.countryName && item.countryName.trim());
      const hasFlag = Boolean(item.flag && item.flag.trim());
      // If row has partial data, it must have at least one (already satisfies)
      // But if there are rows and all are empty:
      if (formData.countries.length > 0 && !hasName && !hasFlag && formData.countries.length > 1) {
        setFormError(
          `Row ${i + 1}: At least a Country Name or a Flag is required, or remove the empty row.`
        );
        return;
      }
    }

    const payload = new FormData();
    payload.append("companyName", formData.companyName.trim());
    payload.append("roleCategory", formData.roleCategory.trim());
    payload.append("roleTitle", formData.roleTitle.trim());
    payload.append("salary", formData.salary.trim()); // optional
    payload.append("salaryCurrency", formData.salaryCurrency.trim());
    payload.append(
      "skills",
      JSON.stringify(
        formData.skillsInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    );
    payload.append("workModes", JSON.stringify(formData.workModes));
    payload.append("description", formData.description.trim());
    payload.append("isActive", formData.isActive);
    payload.append("countries", JSON.stringify(validCountries));

    if (logoFile) {
      payload.append("companyLogo", logoFile);
    } else if (logoPreview && !logoPreview.startsWith("blob:")) {
      payload.append("companyLogo", logoPreview);
    }

    if (modalMode === "create") {
      dispatch(createOpportunity(payload));
    } else {
      dispatch(updateOpportunity({ id: editingId, formData: payload }));
    }
  };

  // Delete
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await dispatch(deleteOpportunity(itemToDelete._id)).unwrap();
      showNotification("Role opportunity deleted successfully");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      showNotification(err || "Failed to delete opportunity", "error");
    }
  };

  // Toggle active status directly
  const handleToggleStatus = async (opp) => {
    const payload = new FormData();
    payload.append("isActive", !opp.isActive);
    try {
      await dispatch(
        updateOpportunity({ id: opp._id, formData: payload })
      ).unwrap();
      showNotification(`Opportunity ${!opp.isActive ? "activated" : "deactivated"}`);
      loadData();
    } catch (err) {
      showNotification("Failed to update status", "error");
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg border transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600" />
          ) : (
            <AlertCircle size={18} className="text-rose-600" />
          )}
          <span className="text-sm font-semibold">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Globe2 size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Global Role Opportunities
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage partner companies, international markets, requirements & salary for Frontend, Backend, Video Editor & other roles
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Company Opportunity
          </button>
        </div>
      </div>

      {/* Role Quick Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
        <button
          onClick={() => {
            setRoleFilter("");
            setCurrentPage(1);
          }}
          className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
            roleFilter === ""
              ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <Briefcase size={14} className={roleFilter === "" ? "text-blue-400" : "text-slate-400"} />
          <span>All Roles</span>
          <span className="rounded-md px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-600">
            {stats?.total || 0}
          </span>
        </button>

        {ROLE_OPTIONS.map((role) => {
          const isActive = roleFilter === role.value;
          const Icon = role.icon;
          const count = stats?.byRole?.[role.value] || 0;

          return (
            <button
              key={role.value}
              onClick={() => {
                setRoleFilter(role.value);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Icon size={14} className={isActive ? "text-blue-400" : "text-slate-400"} />
              <span>{role.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="relative sm:col-span-2">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by company name, role title, skills, country..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition font-medium"
          >
            <option value="">All Statuses (Active & Inactive)</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Opportunities Table / Card List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Company & Logo</th>
                <th className="px-4 py-4">Role Category & Title</th>
                <th className="px-4 py-4">Countries & Flags</th>
                <th className="px-4 py-4">Salary</th>
                <th className="px-4 py-4">Required Skills</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading && opportunities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="mx-auto h-6 w-6 animate-spin text-blue-500 mb-2" />
                    Loading role opportunities...
                  </td>
                </tr>
              ) : opportunities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Building2 className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    No opportunities found. Click "Add Company Opportunity" to create one.
                  </td>
                </tr>
              ) : (
                opportunities.map((opp) => {
                  const roleConfig =
                    ROLE_OPTIONS.find((r) => r.value === opp.roleCategory) || {
                      label: opp.roleCategory,
                      badge: "bg-slate-100 text-slate-700 border-slate-200",
                      icon: Briefcase,
                    };
                  const RoleIcon = roleConfig.icon;

                  return (
                    <tr
                      key={opp._id}
                      className="hover:bg-slate-50/60 transition group"
                    >
                      {/* Company Name & Logo */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {opp.companyLogo ? (
                            <img
                              src={opp.companyLogo}
                              alt={opp.companyName}
                              className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-1 shrink-0 shadow-xs"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold shrink-0 border border-slate-200">
                              <Building2 size={18} />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {opp.companyName}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Added {new Date(opp.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Category & Title */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold shadow-xs ${roleConfig.badge}`}
                        >
                          <RoleIcon size={12} />
                          {opp.roleCategory}
                        </span>
                        {opp.roleTitle && (
                          <div className="text-xs font-semibold text-slate-800 mt-1">
                            {opp.roleTitle}
                          </div>
                        )}
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                          {opp.workModes?.join(" · ") || "Remote"}
                        </div>
                      </td>

                      {/* Countries & Flags */}
                      <td className="px-4 py-3.5 max-w-[240px]">
                        <div className="flex flex-wrap gap-1.5">
                          {opp.countries && opp.countries.length > 0 ? (
                            opp.countries.map((c, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700 font-medium"
                              >
                                {c.flag && (
                                  c.flag.startsWith("http") ? (
                                    <img
                                      src={c.flag}
                                      alt={c.countryName || "flag"}
                                      className="w-4 h-3 object-cover rounded-xs border border-slate-200"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <span>{c.flag}</span>
                                  )
                                )}
                                <span>{c.countryName || "Flag only"}</span>
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px]">Worldwide</span>
                          )}
                        </div>
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-3.5">
                        {opp.salary ? (
                          <div className="font-bold text-slate-800 text-xs">
                            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700">
                              <DollarSign size={11} />
                              {opp.salary}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] italic">
                            Not specified
                          </span>
                        )}
                      </td>

                      {/* Required Skills */}
                      <td className="px-4 py-3.5 max-w-[220px]">
                        <div className="flex flex-wrap gap-1">
                          {opp.skills && opp.skills.length > 0 ? (
                            opp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="rounded-md bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 text-[10px] font-semibold"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px]">General</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => handleToggleStatus(opp)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold cursor-pointer transition ${
                            opp.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              opp.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          {opp.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(opp)}
                            title="Edit opportunity"
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setItemToDelete(opp);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Delete opportunity"
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 bg-white text-xs text-slate-500">
            <div>
              Showing page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
              <span className="font-bold text-slate-800">{pagination.totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-bold disabled:opacity-40 hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage >= pagination.totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-bold disabled:opacity-40 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* ADD / EDIT OPPORTUNITY MODAL */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {modalMode === "create"
                      ? "Add Company Opportunity"
                      : "Edit Company Opportunity"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure company, role category, countries, flags & skills
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
              {formError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Company Name & Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="e.g. Stripe, Shopify, Spotify, Meta"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Company Logo (Upload or URL)
                  </label>
                  <div className="mt-1.5 flex items-center gap-3">
                    {logoPreview ? (
                      <div className="relative w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img
                          src={logoPreview}
                          alt="preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <Upload size={16} />
                      </div>
                    )}

                    <div className="flex-1">
                      <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs transition">
                        <Upload size={13} />
                        <span>Select File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={logoPreview.startsWith("blob:") ? "" : logoPreview}
                        onChange={(e) => {
                          setLogoPreview(e.target.value);
                          setLogoFile(null);
                        }}
                        placeholder="Or paste Logo URL..."
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] text-slate-700 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Role Category & Role Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Role Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, roleCategory: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition font-medium"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Used to filter opportunities on role-specific pages (Frontend, Backend, Video Editor, etc.)
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Position / Role Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.roleTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, roleTitle: e.target.value })
                    }
                    placeholder="e.g. Senior Frontend Engineer, Creative Editor"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition shadow-xs"
                  />
                </div>
              </div>

              {/* 3. Countries & Flags Repeater */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Flag size={14} className="text-blue-500" />
                      <span>Target Countries & Flags</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Add multiple countries. At least one of Country Name OR Flag is required per entry.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCountry}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 text-xs font-bold hover:bg-blue-100 transition shrink-0"
                  >
                    <Plus size={13} />
                    Add Country
                  </button>
                </div>

                {/* Quick Add Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Add:
                  </span>
                  {QUICK_COUNTRIES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleAddQuickCountry(preset)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-700 hover:border-blue-400 hover:bg-blue-50 transition"
                    >
                      <span>{preset.emoji}</span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* Country Rows */}
                <div className="space-y-2.5 pt-2">
                  {formData.countries.map((countryItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-2.5 shadow-xs"
                    >
                      <div className="w-6 text-center text-xs font-bold text-slate-400">
                        {idx + 1}.
                      </div>

                      {/* Country Name */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={countryItem.countryName}
                          onChange={(e) =>
                            handleCountryChange(idx, "countryName", e.target.value)
                          }
                          placeholder="Country Name (e.g. Germany)"
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Flag (Emoji or URL) */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={countryItem.flag}
                          onChange={(e) =>
                            handleCountryChange(idx, "flag", e.target.value)
                          }
                          placeholder="Flag (Emoji 🇩🇪 or Image URL)"
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Flag preview */}
                      {countryItem.flag && (
                        <div className="w-8 h-6 rounded-xs border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                          {countryItem.flag.startsWith("http") ? (
                            <img
                              src={countryItem.flag}
                              alt="flag"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-base leading-none">
                              {countryItem.flag}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Remove Button */}
                      {formData.countries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCountry(idx)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition shrink-0"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Salary (Optional) & Currency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Salary / Compensation
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      (Optional)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="e.g. $80K – $140K or €65,000 - €95,000"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition shadow-xs"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Can be left blank if confidential or experience-based.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Currency
                  </label>
                  <select
                    value={formData.salaryCurrency}
                    onChange={(e) =>
                      setFormData({ ...formData, salaryCurrency: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition font-medium"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SGD">SGD (S$)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              {/* 5. Required Skills */}
              <div>
                <label className="text-xs font-bold text-slate-700">
                  Required Skills & Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.skillsInput}
                  onChange={(e) =>
                    setFormData({ ...formData, skillsInput: e.target.value })
                  }
                  placeholder="e.g. React, TypeScript, Next.js, Redux, Tailwind CSS"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 transition shadow-xs"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Candidates will see these requirement tags highlighted on the card.
                </p>
              </div>

              {/* 6. Work Modes */}
              <div>
                <label className="text-xs font-bold text-slate-700">
                  Work Mode Options
                </label>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {["Remote", "Hybrid", "On-site", "Relocation Support"].map((mode) => {
                    const selected = formData.workModes.includes(mode);
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleToggleWorkMode(mode)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition border ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Active Status */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Opportunity is Active & visible on candidate landing pages
                </label>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : modalMode === "create" ? (
                    "Create Opportunity"
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-black text-slate-900">
                Delete Opportunity?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove the opportunity for{" "}
                <span className="font-bold text-slate-800">
                  {itemToDelete.companyName}
                </span>{" "}
                ({itemToDelete.roleCategory})? This cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="rounded-xl bg-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 transition disabled:opacity-50"
              >
                {actionLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleOpportunities;
