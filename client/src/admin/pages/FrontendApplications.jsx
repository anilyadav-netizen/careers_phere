import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Trash2,
  Eye,
  RefreshCw,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  Globe2,
  DollarSign,
  Download,
  ExternalLink,
  Filter,
  X,
  MapPin,
  Calendar,
  AlertCircle,
  FileText,
  Code2,
  Server,
  Layers,
  Smartphone,
  Film,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building,
  Sparkles,
} from "lucide-react";

import StatCard from "../components/StateCard";
import {
  getAllFrontendApplicationsAdmin,
  getFrontendApplicationStatsAdmin,
  updateFrontendApplicationStatusAdmin,
  deleteFrontendApplicationAdmin,
} from "../../redux/slicer/frontendApplicationSlice";
import api from "../../redux/api";

// Role & Category Configuration with distinctive badges and colors
export const ROLE_CONFIG = {
  "Frontend Developer": {
    label: "Frontend Dev",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    pill: "border-sky-300 text-sky-700 bg-sky-50/70",
    icon: Code2,
    accent: "#0284c7",
  },
  "Backend Developer": {
    label: "Backend Dev",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    pill: "border-amber-300 text-amber-800 bg-amber-50/70",
    icon: Server,
    accent: "#d97706",
  },
  "Full Stack Developer": {
    label: "Fullstack Dev",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    pill: "border-indigo-300 text-indigo-700 bg-indigo-50/70",
    icon: Layers,
    accent: "#4f46e5",
  },
  "Android Developer": {
    label: "Android Dev",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pill: "border-emerald-300 text-emerald-700 bg-emerald-50/70",
    icon: Smartphone,
    accent: "#059669",
  },
  "Video Editor": {
    label: "Video Editor",
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    pill: "border-fuchsia-300 text-fuchsia-700 bg-fuchsia-50/70",
    icon: Film,
    accent: "#c026d3",
  },
  "UI/UX Designer": {
    label: "UI/UX Designer",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    pill: "border-rose-300 text-rose-700 bg-rose-50/70",
    icon: Sparkles,
    accent: "#e11d48",
  },
};

export const getRoleConfig = (roleName) => {
  if (!roleName) {
    return {
      label: "General / Other",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      pill: "border-slate-300 text-slate-700 bg-slate-50",
      icon: BriefcaseBusiness,
      accent: "#475569",
    };
  }

  const normalizedKey = Object.keys(ROLE_CONFIG).find(
    (key) => key.toLowerCase() === roleName.trim().toLowerCase()
  );

  if (normalizedKey) {
    return ROLE_CONFIG[normalizedKey];
  }

  // Fallback for custom or matching sub-words
  const lower = roleName.toLowerCase();
  if (lower.includes("front")) return ROLE_CONFIG["Frontend Developer"];
  if (lower.includes("back")) return ROLE_CONFIG["Backend Developer"];
  if (lower.includes("full") || lower.includes("stack")) return ROLE_CONFIG["Full Stack Developer"];
  if (lower.includes("android") || lower.includes("mobile")) return ROLE_CONFIG["Android Developer"];
  if (lower.includes("video") || lower.includes("edit")) return ROLE_CONFIG["Video Editor"];

  return {
    label: roleName,
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    pill: "border-purple-300 text-purple-700 bg-purple-50",
    icon: BriefcaseBusiness,
    accent: "#7e22ce",
  };
};

const statusColors = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  reviewed: "bg-blue-50 text-blue-700 border-blue-200",
  shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  interview: "bg-purple-50 text-purple-700 border-purple-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  hired: "bg-teal-50 text-teal-700 border-teal-200",
};

const FrontendApplications = () => {
  const dispatch = useDispatch();

  const {
    applications = [],
    stats = null,
    pagination = { total: 0, page: 1, limit: 10, totalPages: 1 },
    loading = false,
    error = null,
  } = useSelector((state) => state.frontendApplications || {});

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [marketFilter, setMarketFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);

  // Status update state in detail modal
  const [modalStatus, setModalStatus] = useState("pending");
  const [modalNotes, setModalNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch applications
  const fetchApplications = useCallback(() => {
    dispatch(
      getAllFrontendApplicationsAdmin({
        role: roleFilter,
        search: searchTerm,
        status: statusFilter,
        market: marketFilter,
        workMode: workModeFilter,
        page: currentPage,
        limit: 10,
      })
    );
    dispatch(getFrontendApplicationStatsAdmin());
  }, [dispatch, roleFilter, searchTerm, statusFilter, marketFilter, workModeFilter, currentPage]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle open details modal
  const handleOpenDetailModal = (app) => {
    setSelectedApp(app);
    setModalStatus(app.status || "pending");
    setModalNotes(app.adminNotes || "");
    setIsDetailModalOpen(true);
  };

  // Handle status update
  const handleUpdateStatus = async (id, newStatus, notes) => {
    try {
      setIsUpdatingStatus(true);
      await dispatch(
        updateFrontendApplicationStatusAdmin({
          id,
          status: newStatus,
          adminNotes: notes,
        })
      ).unwrap();

      showNotification(`Application status updated to ${newStatus}`);
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp((prev) => ({
          ...prev,
          status: newStatus,
          adminNotes: notes,
        }));
      }
      fetchApplications();
    } catch (err) {
      showNotification(err || "Failed to update status", "error");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle delete application
  const handleDeleteApplication = async () => {
    if (!appToDelete) return;
    try {
      await dispatch(deleteFrontendApplicationAdmin(appToDelete._id)).unwrap();
      showNotification("Application deleted successfully");
      setIsDeleteModalOpen(false);
      setAppToDelete(null);
      if (selectedApp && selectedApp._id === appToDelete._id) {
        setIsDetailModalOpen(false);
        setSelectedApp(null);
      }
      fetchApplications();
    } catch (err) {
      showNotification(err || "Failed to delete application", "error");
    }
  };

  // Resume download helper
  const handleDownloadResume = (id, filename) => {
    const baseURL = api.defaults.baseURL || "/api";
    const downloadUrl = `${baseURL}/frontend-applications/${id}/resume`;
    window.open(downloadUrl, "_blank");
  };

  const roleTabItems = [
    { label: "All Roles", value: "" },
    { label: "Frontend", value: "Frontend Developer", icon: Code2 },
    { label: "Backend", value: "Backend Developer", icon: Server },
    { label: "Full Stack", value: "Full Stack Developer", icon: Layers },
    { label: "Android", value: "Android Developer", icon: Smartphone },
    { label: "Video Editor", value: "Video Editor", icon: Film },
    { label: "UI/UX", value: "UI/UX Designer", icon: Sparkles },
  ];

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

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <BriefcaseBusiness size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Role & Talent Applications
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage applications across Frontend, Backend, Fullstack, Android & Video Editing roles
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchApplications}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Role Quick Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
        {roleTabItems.map((tab) => {
          const isActive = roleFilter === tab.value;
          const Icon = tab.icon;
          const count = tab.value ? stats?.byRole?.[tab.value] : stats?.total;

          return (
            <button
              key={tab.value}
              onClick={() => {
                setRoleFilter(tab.value);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {Icon && <Icon size={14} className={isActive ? "text-[#30AFFF]" : "text-slate-400"} />}
              <span>{tab.label}</span>
              {typeof count === "number" && (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Applications"
          value={stats?.total || pagination.total || 0}
          description="Across all job roles"
          icon={Users}
          iconClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Pending Review"
          value={stats?.pending || 0}
          description="Awaiting evaluation"
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Shortlisted"
          value={stats?.shortlisted || 0}
          description="Passed initial round"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="In Interview"
          value={stats?.interview || 0}
          description="Active interviews"
          icon={UserCheck}
          iconClass="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Rejected"
          value={stats?.rejected || 0}
          description="Closed profiles"
          icon={XCircle}
          iconClass="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Filters & Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by candidate, skills, role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Role Dropdown Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition font-medium"
          >
            <option value="">All Job Roles / Categories</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Android Developer">Android Developer</option>
            <option value="Video Editor">Video Editor</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

          {/* Market Filter */}
          <select
            value={marketFilter}
            onChange={(e) => {
              setMarketFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">All Target Markets</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Singapore">Singapore</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
          </select>

          {/* Work Mode Filter */}
          <select
            value={workModeFilter}
            onChange={(e) => {
              setWorkModeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {(searchTerm || roleFilter || statusFilter || marketFilter || workModeFilter) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Active filters:</span>
              {roleFilter && (
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-blue-700 font-semibold">
                  Role: {roleFilter}
                </span>
              )}
              {statusFilter && (
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-amber-700 font-semibold">
                  Status: {statusFilter}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("");
                setStatusFilter("");
                setMarketFilter("");
                setWorkModeFilter("");
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Applicant</th>
                <th className="px-4 py-4">Job Role / Category</th>
                <th className="px-4 py-4">Experience & Skills</th>
                <th className="px-4 py-4">Target Market</th>
                <th className="px-4 py-4">Salary & Notice</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Resume</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading && applications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <RefreshCw className="mx-auto h-6 w-6 animate-spin text-blue-500 mb-2" />
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    No applications found for the selected filters
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const roleConfig = getRoleConfig(app.role);
                  const RoleIcon = roleConfig.icon;

                  return (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50/60 transition group"
                    >
                      {/* Applicant Name & Contact */}
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900 text-sm">
                          {app.fullName}
                        </div>
                        <div className="text-slate-500">{app.email}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} />
                          {app.currentCountry}
                          {app.currentLocation ? ` · ${app.currentLocation}` : ""}
                        </div>
                      </td>

                      {/* Job Role Badge with Icon */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold tracking-tight shadow-xs ${roleConfig.badge}`}
                        >
                          <RoleIcon size={13} />
                          {app.role || "Frontend Developer"}
                        </span>
                        {app.companyName && (
                          <div className="mt-1.5">
                            <span className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              <Building size={10} className="shrink-0 text-amber-600" />
                              <span className="truncate max-w-[130px]" title={app.companyName}>
                                {app.companyName}
                              </span>
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Experience & Skills */}
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 mb-1">
                          {app.experience}
                        </span>
                        {app.frontendSkills && (
                          <p className="text-[11px] text-slate-600 line-clamp-2" title={app.frontendSkills}>
                            {app.frontendSkills}
                          </p>
                        )}
                      </td>

                      {/* Target Market */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-800">
                          {app.preferredJobMarket}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {app.preferredRegion} · {app.preferredWorkMode}
                        </div>
                      </td>

                      {/* Salary & Notice */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-800">
                          {app.salaryCurrency?.split(" ")[0]} {Number(app.expectedSalary).toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {app.noticePeriod}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3.5">
                        <select
                          value={app.status || "pending"}
                          onChange={(e) =>
                            handleUpdateStatus(app._id, e.target.value, app.adminNotes)
                          }
                          className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold outline-none cursor-pointer ${
                            statusColors[app.status] || statusColors.pending
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview">Interview</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </td>

                      {/* Resume Download */}
                      <td className="px-4 py-3.5">
                        {app.resume?.filename ? (
                          <button
                            onClick={() => handleDownloadResume(app._id, app.resume.filename)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 transition shadow-xs"
                            title={app.resume.filename}
                          >
                            <Download size={13} className="text-blue-600" />
                            <span className="max-w-[70px] truncate">Resume</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">N/A</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetailModal(app)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                            title="View Full Profile"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setAppToDelete(app);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                            title="Delete Application"
                          >
                            <Trash2 size={16} />
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
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3.5 bg-slate-50/50">
            <div className="text-xs text-slate-500">
              Showing page <span className="font-semibold text-slate-700">{pagination.page}</span> of{" "}
              <span className="font-semibold text-slate-700">{pagination.totalPages}</span> ({pagination.total} total)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {isDetailModalOpen && selectedApp && (() => {
        const modalRoleConfig = getRoleConfig(selectedApp.role);
        const ModalRoleIcon = modalRoleConfig.icon;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white font-bold shadow-md"
                    style={{ backgroundColor: modalRoleConfig.accent }}
                  >
                    <ModalRoleIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-black text-slate-900">
                        {selectedApp.fullName}
                      </h3>
                      <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold ${modalRoleConfig.badge}`}>
                        <ModalRoleIcon size={12} />
                        {selectedApp.role || "Frontend Developer"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Applied on {new Date(selectedApp.createdAt).toLocaleDateString()} at{" "}
                      {new Date(selectedApp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Company Tagged Info if Applied via Specific Company */}
                {selectedApp.companyName && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {selectedApp.companyLogo ? (
                          <img
                            src={selectedApp.companyLogo}
                            alt={selectedApp.companyName}
                            className="w-11 h-11 rounded-xl object-contain bg-white border border-amber-200 p-1 shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                            <Building size={20} />
                          </div>
                        )}
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                            Target Company Opportunity
                          </div>
                          <div className="text-base font-black text-slate-900">
                            {selectedApp.companyName}
                          </div>
                          {selectedApp.opportunityRole && (
                            <div className="text-xs text-slate-600 font-medium">
                              Position: {selectedApp.opportunityRole}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-900">
                        Company Referral
                      </span>
                    </div>
                  </div>
                )}

                {/* Status & Quick Action Bar */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Application Status
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-bold outline-none ${
                          statusColors[modalStatus] || statusColors.pending
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>

                      <button
                        onClick={() =>
                          handleUpdateStatus(selectedApp._id, modalStatus, modalNotes)
                        }
                        disabled={isUpdatingStatus}
                        className="rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {isUpdatingStatus ? "Saving..." : "Save Status"}
                      </button>
                    </div>
                  </div>

                  {selectedApp.resume?.filename && (
                    <button
                      onClick={() => handleDownloadResume(selectedApp._id, selectedApp.resume.filename)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm hover:border-blue-400 hover:text-blue-600 transition"
                    >
                      <Download size={15} className="text-blue-600" />
                      Download Resume ({selectedApp.resume.filename})
                    </button>
                  )}
                </div>

                {/* Grid Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Contact Information */}
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Users size={14} /> Contact Details
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-400">Email:</span>{" "}
                        <a href={`mailto:${selectedApp.email}`} className="font-semibold text-blue-600 hover:underline">
                          {selectedApp.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400">Phone:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Country:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.currentCountry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Location:</span>{" "}
                        <span className="font-semibold text-slate-800">
                          {selectedApp.currentLocation || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Target & Preferences */}
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Globe2 size={14} /> Target Opportunity
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-400">Applied Role:</span>{" "}
                        <span className="font-bold text-slate-900">{selectedApp.role || "Frontend Developer"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Market:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.preferredJobMarket}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Region:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.preferredRegion}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Work Mode:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.preferredWorkMode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Compensation & Availability */}
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <DollarSign size={14} /> Compensation & Timeline
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-400">Expected Salary:</span>{" "}
                        <span className="font-bold text-slate-900 text-sm">
                          {selectedApp.salaryCurrency?.split(" ")[0]} {Number(selectedApp.expectedSalary).toLocaleString()}
                        </span>{" "}
                        <span className="text-[10px] text-slate-400">({selectedApp.salaryCurrency})</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Notice Period:</span>{" "}
                        <span className="font-semibold text-slate-800">{selectedApp.noticePeriod}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Preferred Timezone:</span>{" "}
                        <span className="font-semibold text-slate-800">
                          {selectedApp.preferredTimezone || "Flexible"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Relocation Preference:</span>{" "}
                        <span className="font-semibold text-slate-800">
                          {selectedApp.relocationPreference || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Authorization & Links */}
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BriefcaseBusiness size={14} /> Authorization & Links
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-400">Work Authorization:</span>{" "}
                        <span className="font-semibold text-slate-800">
                          {selectedApp.workAuthorization || "Not specified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Portfolio / Showreel:</span>{" "}
                        {selectedApp.portfolio ? (
                          <a
                            href={selectedApp.portfolio}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            Open Link <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-slate-400">Not provided</span>
                        )}
                      </div>
                      <div>
                        <span className="text-slate-400">LinkedIn / Social:</span>{" "}
                        {selectedApp.linkedin ? (
                          <a
                            href={selectedApp.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            View Profile <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-slate-400">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Tools */}
                {selectedApp.frontendSkills && (
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={14} /> Technical Skills & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.frontendSkills
                        .split(",")
                        .map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Candidate Statement */}
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText size={14} /> Candidate Statement / Cover Note
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {selectedApp.aboutYou}
                  </p>
                </div>

                {/* Internal Notes */}
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Internal Admin Notes
                  </h4>
                  <textarea
                    rows={3}
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    placeholder="Add internal feedback, interview status, screening comments..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50/50">
                <button
                  onClick={() => {
                    setAppToDelete(selectedApp);
                    setIsDeleteModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition"
                >
                  <Trash2 size={14} /> Delete Application
                </button>

                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && appToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-4">
              <Trash2 size={24} />
            </div>

            <h3 className="text-base font-black text-slate-900">
              Delete Application?
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to permanently delete the application of{" "}
              <strong className="text-slate-800">{appToDelete.fullName}</strong> for{" "}
              <strong className="text-blue-600">{appToDelete.role || "this role"}</strong>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setAppToDelete(null);
                }}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteApplication}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontendApplications;
