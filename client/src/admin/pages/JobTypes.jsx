// src/admin/pages/JobTypes.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  Code,
  Compass,
  Cpu,
  Globe,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Layers,
  Monitor,
  Pencil,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Trash2,
  Truck,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import {
  clearJobTypeError,
  clearJobTypeMessage,
  createJobType,
  deleteJobType,
  getAdminJobTypes,
  toggleJobTypeStatus,
  updateJobType,
} from "../../redux/slicer/jobTypeSlice";
import StateCard from "../components/StateCard";

// Mapping of available Lucide icons
export const AVAILABLE_ICONS = {
  Wifi: Wifi,
  Building2: Building2,
  Landmark: Landmark,
  Rocket: Rocket,
  Users: Users,
  Code: Code,
  Award: Award,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  ShoppingCart: ShoppingCart,
  Truck: Truck,
  Globe: Globe,
  Monitor: Monitor,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Target: Target,
  Zap: Zap,
  Shield: Shield,
  Sparkles: Sparkles,
  HeartHandshake: HeartHandshake,
  Layers: Layers,
  Compass: Compass,
  Star: Star,
  Settings: Settings,
};

const JobTypes = () => {
  const dispatch = useDispatch();

  const {
    jobTypes = [],
    loading,
    error,
    createLoading,
    updateLoading,
    deleteLoading,
    message,
    success,
  } = useSelector((state) => state.jobTypes);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobType, setEditingJobType] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    icon: "Briefcase",
    order: 0,
    isActive: true,
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(getAdminJobTypes());
  }, [dispatch]);

  // Flash notifications
  useEffect(() => {
    if (message) {
      setNotification({ type: "success", text: message });
      const timer = setTimeout(() => {
        setNotification(null);
        dispatch(clearJobTypeMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      setNotification({ type: "error", text: error });
      const timer = setTimeout(() => {
        setNotification(null);
        dispatch(clearJobTypeError());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = jobTypes.length;
    const active = jobTypes.filter((jt) => jt.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [jobTypes]);

  // Filtered job types
  const filteredJobTypes = useMemo(() => {
    return jobTypes.filter((jt) => {
      const matchSearch =
        (jt.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (jt.label || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && jt.isActive) ||
        (statusFilter === "inactive" && !jt.isActive);

      return matchSearch && matchStatus;
    });
  }, [jobTypes, searchQuery, statusFilter]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingJobType(null);
    setFormData({
      name: "",
      label: "",
      icon: "Briefcase",
      order: jobTypes.length + 1,
      isActive: true,
      description: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (jt) => {
    setEditingJobType(jt);
    setFormData({
      name: jt.name || "",
      label: jt.label || "",
      icon: jt.icon || "Briefcase",
      order: jt.order || 0,
      isActive: jt.isActive !== undefined ? jt.isActive : true,
      description: jt.description || "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJobType(null);
    setFormErrors({});
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Job type name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      label: formData.label.trim() || formData.name.trim(),
      icon: formData.icon,
      order: Number(formData.order) || 0,
      isActive: formData.isActive,
      description: formData.description.trim(),
    };

    if (editingJobType) {
      await dispatch(
        updateJobType({ id: editingJobType._id, data: payload })
      ).unwrap();
    } else {
      await dispatch(createJobType(payload)).unwrap();
    }
    handleCloseModal();
  };

  // Toggle active/inactive
  const handleToggleStatus = async (id) => {
    await dispatch(toggleJobTypeStatus(id));
  };

  // Delete job type
  const handleDelete = async (id) => {
    await dispatch(deleteJobType(id));
    setDeleteConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-500" />
          ) : (
            <X size={18} className="text-rose-500" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="text-[#30AFFF]" size={26} />
            Job Types Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage job types displayed on the Home Page and used in Admin Job forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(getAdminJobTypes())}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#30AFFF] text-white text-sm font-semibold hover:bg-[#209be6] transition-colors shadow-sm shadow-[#30AFFF]/20"
          >
            <Plus size={18} />
            Add Job Type
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StateCard
          title="Total Job Types"
          value={stats.total}
          icon={Layers}
          iconColor="text-[#30AFFF]"
          bgColor="bg-blue-50"
        />
        <StateCard
          title="Active Job Types"
          value={stats.active}
          icon={CheckCircle2}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-50"
        />
        <StateCard
          title="Inactive Job Types"
          value={stats.inactive}
          icon={X}
          iconColor="text-slate-400"
          bgColor="bg-slate-100"
        />
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search job types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/10"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === "all"
                ? "bg-[#30AFFF] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === "active"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === "inactive"
                ? "bg-slate-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Inactive ({stats.inactive})
          </button>
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading && jobTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <RefreshCw size={28} className="animate-spin mb-3 text-[#30AFFF]" />
            <p className="text-sm">Loading job types...</p>
          </div>
        ) : filteredJobTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Layers size={36} className="mb-2 text-slate-300" />
            <p className="text-base font-semibold text-slate-700">No job types found</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery
                ? "Try adjusting your search query or filter"
                : "Click 'Add Job Type' to create one"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Icon & Name</th>
                  <th className="py-3 px-4">Display Label</th>
                  <th className="py-3 px-4">Display Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredJobTypes.map((jt) => {
                  const IconComp = AVAILABLE_ICONS[jt.icon] || Briefcase;
                  return (
                    <tr
                      key={jt._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center shrink-0">
                            <IconComp size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {jt.name}
                            </div>
                            {jt.description && (
                              <div className="text-xs text-slate-400 truncate max-w-xs">
                                {jt.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {jt.label || jt.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {jt.order ?? 0}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(jt._id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                            jt.isActive
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                          title="Click to toggle status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              jt.isActive ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {jt.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(jt)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#30AFFF] hover:bg-blue-50 transition-colors"
                            title="Edit Job Type"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(jt._id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Job Type"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {editingJobType ? "Edit Job Type" : "Create New Job Type"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Job Type Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote, Startup, AI / ML"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.name
                      ? "border-rose-300 focus:ring-rose-100"
                      : "border-slate-200 focus:border-[#30AFFF] focus:ring-[#30AFFF]/10"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-xs text-rose-500 mt-1">{formErrors.name}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">
                  This value is stored with the job and used for filtering.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Card Display Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Mg... (leave blank to use name)"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <div className="relative">
                    <select
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/10 bg-white"
                    >
                      {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                        <option key={iconKey} value={iconKey}>
                          {iconKey}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/10"
                  />
                </div>
              </div>

              {/* Icon Preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">Card Preview:</span>
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                  {(() => {
                    const PreviewIcon = AVAILABLE_ICONS[formData.icon] || Briefcase;
                    return <PreviewIcon size={16} className="text-[#30AFFF]" />;
                  })()}
                  <span>{formData.label || formData.name || "Preview"}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Short note about this job type..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/10"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#30AFFF] focus:ring-[#30AFFF] border-slate-300"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  Active (show on Home page and in Job create dropdown)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading || updateLoading}
                  className="px-5 py-2 rounded-xl bg-[#30AFFF] text-white text-sm font-semibold hover:bg-[#209be6] transition-colors shadow-sm disabled:opacity-50"
                >
                  {createLoading || updateLoading
                    ? "Saving..."
                    : editingJobType
                    ? "Update Job Type"
                    : "Create Job Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Delete Job Type?
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to delete this job type? Jobs already using this type will not be lost.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 shadow-sm disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTypes;
