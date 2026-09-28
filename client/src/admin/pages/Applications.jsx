// src/admin/pages/Applications.jsx

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Search,
  Trash2,
  X,
  Eye,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  MapPin,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

import StatCard from "../components/StateCard";

import {
  getAllApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
} from "../../redux/slicer/jobApplicationSlice";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ============================================================
  // REDUX STATE
  // ============================================================

  const {
    adminApplications = [],
    adminApplicationsCount = 0,
    loading = false,
    error = null,
    updatingStatus = false,
    deleting = false,
  } = useSelector((state) => state.application || {});

  // ============================================================
  // LOCAL STATE
  // ============================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deletingApplication, setDeletingApplication] =
    useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [notification, setNotification] =
    useState(null);

  const [updatingApplicationId, setUpdatingApplicationId] =
    useState(null);
  const [statusChangeToConfirm, setStatusChangeToConfirm] = useState(null);

  // ============================================================
  // FETCH ALL APPLICATIONS
  // ============================================================

  const fetchApplications = useCallback(() => {
    dispatch(
      getAllApplicationsAdmin({
        status: "",
        job: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // ============================================================
  // NORMALIZE APPLICATIONS
  // ============================================================

  const normalizedApplications = useMemo(() => {
    return Array.isArray(adminApplications)
      ? adminApplications
      : [];
  }, [adminApplications]);

  // ============================================================
  // DEBUG
  // ============================================================

  useEffect(() => {
    console.log(
      "Admin Applications:",
      adminApplications
    );

    console.log(
      "Admin Applications Count:",
      adminApplicationsCount
    );
  }, [
    adminApplications,
    adminApplicationsCount,
  ]);

  // ============================================================
  // NOTIFICATION
  // ============================================================

  const showNotification = useCallback(
    (message, type) => {
      setNotification({
        message,
        type,
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    []
  );

  // ============================================================
  // UPDATE APPLICATION STATUS
  // ============================================================

  const handleStatusChange = async (
    applicationId,
    status,
    confirmed = false,
  ) => {
    if (!applicationId || !status) return;

    if (status === "rejected" && !confirmed) {
      setStatusChangeToConfirm({ applicationId, status });
      return;
    }

    try {
      setUpdatingApplicationId(applicationId);

      await dispatch(
        updateApplicationStatus({
          applicationId,
          status,
        })
      ).unwrap();

      showNotification(
        `Application status changed to ${getStatusLabel(
          status
        )}`,
        "success"
      );
    } catch (err) {
      showNotification(
        typeof err === "string"
          ? err
          : "Failed to update application status",
        "error"
      );
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  // ============================================================
  // STATISTICS
  // ============================================================

  const statistics = useMemo(() => {
    const totalApplications =
      normalizedApplications.length;

    const pending =
      normalizedApplications.filter(
        (application) =>
          String(application.status || "").toLowerCase() ===
          "pending"
      ).length;

    const shortlisted =
      normalizedApplications.filter(
        (application) =>
          String(application.status || "").toLowerCase() ===
          "shortlisted"
      ).length;

    const rejected =
      normalizedApplications.filter(
        (application) =>
          String(application.status || "").toLowerCase() ===
          "rejected"
      ).length;

    return {
      totalApplications,
      pending,
      shortlisted,
      rejected,
    };
  }, [normalizedApplications]);

  // ============================================================
  // FILTER APPLICATIONS
  // ============================================================

  const filteredApplications = useMemo(() => {
    let result = [...normalizedApplications];

    // ----------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------

    if (searchTerm.trim()) {
      const search = searchTerm
        .toLowerCase()
        .trim();

      result = result.filter((application) => {
        const applicantName =
          application.applicant?.name?.toLowerCase() ||
          "";

        const applicantEmail =
          application.applicant?.email?.toLowerCase() ||
          "";

        const applicantMobile = String(
          application.applicant?.mobile || ""
        ).toLowerCase();

        const jobTitle =
          application.job?.title?.toLowerCase() ||
          "";

        const company =
          application.job?.company?.toLowerCase() ||
          "";

        const location =
          application.job?.location?.toLowerCase() ||
          "";

        return (
          applicantName.includes(search) ||
          applicantEmail.includes(search) ||
          applicantMobile.includes(search) ||
          jobTitle.includes(search) ||
          company.includes(search) ||
          location.includes(search)
        );
      });
    }

    // ----------------------------------------------------------
    // STATUS FILTER
    // ----------------------------------------------------------

    if (statusFilter !== "all") {
      result = result.filter(
        (application) =>
          String(application.status || "")
            .toLowerCase() ===
          statusFilter.toLowerCase()
      );
    }

    // ----------------------------------------------------------
    // SORT BY LATEST APPLICATION
    // ----------------------------------------------------------

    result.sort((a, b) => {
      return (
        new Date(
          b.appliedAt || b.createdAt || 0
        ) -
        new Date(
          a.appliedAt || a.createdAt || 0
        )
      );
    });

    return result;
  }, [
    normalizedApplications,
    searchTerm,
    statusFilter,
  ]);

  // ============================================================
  // VIEW APPLICATION
  // ============================================================

  const handleViewApplication = (applicationId) => {
    if (!applicationId) return;

    navigate(
      `/admin/applications/${applicationId}`
    );
  };

  // ============================================================
  // OPEN DELETE MODAL
  // ============================================================

  const handleDeleteApplication = (application) => {
    setDeletingApplication(application);
    setIsDeleteModalOpen(true);
  };

  // ============================================================
  // CONFIRM DELETE
  // ============================================================

  const handleConfirmDelete = async () => {
    if (!deletingApplication) return;

    const applicationId =
      deletingApplication._id;

    if (!applicationId) {
      showNotification(
        "Application ID not found",
        "error"
      );
      return;
    }

    try {
      const result = await dispatch(
        deleteApplication(applicationId)
      ).unwrap();

      setIsDeleteModalOpen(false);
      setDeletingApplication(null);

      showNotification(
        result?.message ||
          "Application deleted successfully",
        "success"
      );

      fetchApplications();
    } catch (err) {
      showNotification(
        typeof err === "string"
          ? err
          : "Failed to delete application",
        "error"
      );
    }
  };

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (dateString) => {
    if (!dateString) {
      return "N/A";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================================
  // GET INITIALS
  // ============================================================

  const getInitials = (name) => {
    if (!name) {
      return "NA";
    }

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadge = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "shortlisted":
        return "bg-green-50 text-green-700 border-green-200";

      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // ============================================================
  // STATUS DOT
  // ============================================================

  const getStatusDot = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "pending":
        return "bg-amber-500";

      case "shortlisted":
        return "bg-green-500";

      case "rejected":
        return "bg-red-500";

      default:
        return "bg-slate-400";
    }
  };

  // ============================================================
  // STATUS LABEL
  // ============================================================

  const getStatusLabel = (status) => {
    if (!status) {
      return "Unknown";
    }

    const normalizedStatus =
      String(status).toLowerCase();

    return (
      normalizedStatus.charAt(0).toUpperCase() +
      normalizedStatus.slice(1)
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (
    loading &&
    normalizedApplications.length === 0
  ) {
    return <ApplicationsLoadingState />;
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (
    error &&
    normalizedApplications.length === 0
  ) {
    return (
      <ApplicationsErrorState
        error={error}
        onRetry={fetchApplications}
      />
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px] p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">

        {/* ======================================================
            PAGE HEADER
        ======================================================= */}

        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Application Management
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                Manage Applications
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                View and manage all job applications
                submitted to CareerSphere.
              </p>
            </div>

            {/* Refresh */}

            <button
              onClick={fetchApplications}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  loading
                    ? "animate-spin"
                    : ""
                }`}
              />

              {loading
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>
        </div>

        {/* ======================================================
            STATISTICS
        ======================================================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

          <StatCard
            title="Total Applications"
            value={statistics.totalApplications}
            icon={
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            }
            description="All applications"
            iconBg="bg-blue-50"
          />

          <StatCard
            title="Pending"
            value={statistics.pending}
            icon={
              <Clock3 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            }
            description="Pending review"
            iconBg="bg-amber-50"
          />

          <StatCard
            title="Shortlisted"
            value={statistics.shortlisted}
            icon={
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            }
            description="Shortlisted candidates"
            iconBg="bg-green-50"
          />

          <StatCard
            title="Rejected"
            value={statistics.rejected}
            icon={
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            }
            description="Rejected applications"
            iconBg="bg-red-50"
          />

        </div>

        {/* ======================================================
            APPLICATIONS CARD
        ======================================================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* ====================================================
              HEADER / SEARCH / FILTER
          ===================================================== */}

          <div className="p-3 sm:p-4 md:p-6 border-b border-slate-100">

            <div className="flex flex-col gap-3 sm:gap-4">

              {/* Title */}

              <div>
                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                    All Applications
                  </h2>

                  <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                    {adminApplicationsCount}
                  </span>

                </div>

                <p className="text-sm text-slate-500 mt-0.5">
                  Showing{" "}
                  <span className="font-medium text-slate-700">
                    {filteredApplications.length}
                  </span>{" "}
                  application
                  {filteredApplications.length !==
                  1
                    ? "s"
                    : ""}
                </p>
              </div>

              {/* Search */}

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search by applicant, email, mobile, job, company, or location..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />

              </div>

              {/* Filters */}

              <div className="flex flex-col sm:flex-row gap-2">

                {/* Status */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >

                  <option value="all">
                    All Status
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="shortlisted">
                    Shortlisted
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>

                </select>

                {/* Clear */}

                {(searchTerm ||
                  statusFilter !== "all") && (
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                  >

                    <X className="w-4 h-4 text-slate-500" />

                    <span className="text-sm text-slate-600">
                      Clear Filters
                    </span>

                  </button>
                )}

              </div>

            </div>
          </div>

          {/* ====================================================
              REFRESH ERROR
          ===================================================== */}

          {error &&
            normalizedApplications.length > 0 && (
              <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

          {/* ====================================================
              EMPTY STATE
          ===================================================== */}

          {filteredApplications.length === 0 ? (
            <ApplicationsEmptyState
              hasFilters={
                Boolean(searchTerm) ||
                statusFilter !== "all"
              }
              onClear={clearFilters}
            />
          ) : (
            <>

              {/* ==================================================
                  DESKTOP TABLE
              =================================================== */}


<div className="hidden lg:block overflow-x-auto">
  <div className="min-w-[1100px]">
    <table className="w-full border-collapse">

      <thead>
        <tr className="border-b border-slate-100 bg-slate-50/70">

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[22%]">
            Applicant
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
            Mobile
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[15%]">
            Job
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[13%]">
            Company
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
            Location
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[13%]">
            Status
          </th>

          <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
            Applied
          </th>

          <th className="text-right px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[7%]">
            Actions
          </th>

        </tr>
      </thead>

      <tbody className="divide-y divide-slate-50">

        {filteredApplications.map(
          (application) => {

            const applicationId =
              application._id;

            const applicantName =
              application.applicant?.name ||
              "Unknown Applicant";

            const applicantEmail =
              application.applicant?.email ||
              "No email";

            const applicantMobile =
              application.applicant?.mobile ||
              "N/A";

            const jobTitle =
              application.job?.title ||
              "Unknown Job";

            const company =
              application.job?.company ||
              "Unknown Company";

            const location =
              application.job?.location ||
              "N/A";

            const status =
              application.status ||
              "pending";

            const isUpdating =
              updatingApplicationId ===
              applicationId;

            return (
              <tr
                key={applicationId}
                className="hover:bg-slate-50/60 transition-colors"
              >

                {/* Applicant */}
                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-2.5">

                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {getInitials(
                        applicantName
                      )}
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold text-slate-800 truncate max-w-[140px]">
                        {applicantName}
                      </p>

                      <p className="text-xs text-slate-500 truncate max-w-[140px]">
                        {applicantEmail}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Mobile */}
                <td className="px-3 py-2.5">

                  <p className="text-sm text-slate-700 whitespace-nowrap">
                    {applicantMobile}
                  </p>

                </td>

                {/* Job */}
                <td className="px-3 py-2.5">

                  <div className="flex items-start gap-1.5">

                    <BriefcaseBusiness className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />

                    <p className="text-sm font-medium text-slate-700 truncate max-w-[130px]">
                      {jobTitle}
                    </p>

                  </div>

                </td>

                {/* Company */}
                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-1.5">

                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

                    <p className="text-sm text-slate-700 truncate max-w-[120px]">
                      {company}
                    </p>

                  </div>

                </td>

                {/* Location */}
                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-1">

                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

                    <p className="text-sm text-slate-700 truncate max-w-[100px]">
                      {location}
                    </p>

                  </div>

                </td>

                {/* Status + Update */}
                <td className="px-3 py-2.5">

                  <div className="flex flex-col gap-1.5">

                    {/* Current status badge */}
                    <span
                      className={`inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        status
                      )}`}
                    >

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                          status
                        )}`}
                      />

                      {getStatusLabel(
                        status
                      )}

                    </span>

                    {/* Status update dropdown */}
                    <div className="relative">

                      <select
                        value={String(
                          status
                        ).toLowerCase()}
                        disabled={
                          isUpdating
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            applicationId,
                            e.target.value
                          )
                        }
                        className="w-full min-w-[100px] px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="shortlisted">
                          Shortlisted
                        </option>

                        <option value="rejected">
                          Rejected
                        </option>

                      </select>

                      {isUpdating && (
                        <RefreshCw className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-blue-500 animate-spin pointer-events-none" />
                      )}

                    </div>

                  </div>

                </td>

                {/* Applied */}
                <td className="px-3 py-2.5">

                  <div>

                    <p className="text-sm text-slate-700 whitespace-nowrap">
                      {formatDate(
                        application.appliedAt
                      )}
                    </p>

                    <p className="text-xs text-slate-400 whitespace-nowrap">
                      {formatTime(
                        application.appliedAt
                      )}
                    </p>

                  </div>

                </td>

                {/* Actions */}
                <td className="px-3 py-2.5">

                  <div className="flex items-center justify-end gap-0.5">

                    {/* View */}
                    <button
                      onClick={() =>
                        handleViewApplication(
                          applicationId
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View application"
                    >

                      <Eye className="w-4 h-4" />

                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDeleteApplication(
                          application
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete application"
                    >

                      <Trash2 className="w-4 h-4" />

                    </button>

                  </div>

                </td>

              </tr>
            );
          }
        )}

      </tbody>

    </table>
  </div>
</div>

              {/* ==================================================
                  MOBILE / TABLET CARDS
              =================================================== */}

              <div className="lg:hidden divide-y divide-slate-100">

                {filteredApplications.map(
                  (application) => {

                    const applicationId =
                      application._id;

                    const applicantName =
                      application.applicant?.name ||
                      "Unknown Applicant";

                    const applicantEmail =
                      application.applicant?.email ||
                      "No email";

                    const applicantMobile =
                      application.applicant?.mobile ||
                      "N/A";

                    const jobTitle =
                      application.job?.title ||
                      "Unknown Job";

                    const company =
                      application.job?.company ||
                      "Unknown Company";

                    const location =
                      application.job?.location ||
                      "N/A";

                    const status =
                      application.status ||
                      "pending";

                    const isUpdating =
                      updatingApplicationId ===
                      applicationId;

                    return (
                      <div
                        key={applicationId}
                        className="p-3 sm:p-4 space-y-3 sm:space-y-4"
                      >

                        {/* Applicant + Actions */}

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex items-center gap-3 min-w-0">

                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {getInitials(
                                applicantName
                              )}
                            </div>

                            <div className="min-w-0">

                              <p className="text-sm font-semibold text-slate-800 truncate">
                                {applicantName}
                              </p>

                              <p className="text-xs text-slate-500 truncate">
                                {applicantEmail}
                              </p>

                              <p className="text-xs text-slate-500 mt-0.5">
                                {applicantMobile}
                              </p>

                            </div>

                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">

                            {/* View */}

                            <button
                              onClick={() =>
                                handleViewApplication(
                                  applicationId
                                )
                              }
                              className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="View application"
                            >

                              <Eye className="w-4 h-4" />

                            </button>

                            {/* Delete */}

                            <button
                              onClick={() =>
                                handleDeleteApplication(
                                  application
                                )
                              }
                              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete application"
                            >

                              <Trash2 className="w-4 h-4" />

                            </button>

                          </div>

                        </div>

                        {/* Job Information */}

                        <div className="bg-slate-50 rounded-xl p-3 space-y-2 sm:space-y-3">

                          {/* Job */}

                          <div className="flex items-start gap-2">

                            <BriefcaseBusiness className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />

                            <div className="min-w-0">

                              <p className="text-xs text-slate-400">
                                Job
                              </p>

                              <p className="text-sm font-medium text-slate-700 truncate">
                                {jobTitle}
                              </p>

                            </div>

                          </div>

                          {/* Company */}

                          <div className="flex items-start gap-2">

                            <Building2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />

                            <div className="min-w-0">

                              <p className="text-xs text-slate-400">
                                Company
                              </p>

                              <p className="text-sm text-slate-700 truncate">
                                {company}
                              </p>

                            </div>

                          </div>

                          {/* Location */}

                          <div className="flex items-start gap-2">

                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />

                            <div>

                              <p className="text-xs text-slate-400">
                                Location
                              </p>

                              <p className="text-sm text-slate-700">
                                {location}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* Status Update */}

                        <div className="bg-white border border-slate-200 rounded-xl p-3">

                          <div className="flex flex-col gap-3">

                            <div className="flex items-center justify-between gap-2">

                              <p className="text-xs font-medium text-slate-500">
                                Application Status
                              </p>

                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                                  status
                                )}`}
                              >

                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                                    status
                                  )}`}
                                />

                                {getStatusLabel(
                                  status
                                )}

                              </span>

                            </div>

                            <div className="relative">

                              <select
                                value={String(
                                  status
                                ).toLowerCase()}
                                disabled={
                                  isUpdating
                                }
                                onChange={(e) =>
                                  handleStatusChange(
                                    applicationId,
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >

                                <option value="pending">
                                  Pending
                                </option>

                                <option value="shortlisted">
                                  Shortlisted
                                </option>

                                <option value="rejected">
                                  Rejected
                                </option>

                              </select>

                              {isUpdating && (
                                <RefreshCw className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin pointer-events-none" />
                              )}

                            </div>

                          </div>

                        </div>

                        {/* Status + Date */}

                        <div className="flex flex-wrap items-center justify-between gap-3">

                          <div>

                            <p className="text-xs text-slate-400">
                              Application ID
                            </p>

                            <p className="text-xs font-medium text-slate-600 break-all">
                              {applicationId}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-xs text-slate-400">
                              Applied
                            </p>

                            <p className="text-xs font-medium text-slate-600">
                              {formatDate(
                                application.appliedAt
                              )}
                            </p>

                            <p className="text-xs text-slate-400">
                              {formatTime(
                                application.appliedAt
                              )}
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </>
          )}
        </div>

        {/* ======================================================
            DELETE MODAL
        ======================================================= */}

        {isDeleteModalOpen &&
          deletingApplication && (
            <DeleteApplicationModal
              application={deletingApplication}
              onClose={() => {
                if (!deleting) {
                  setIsDeleteModalOpen(false);
                  setDeletingApplication(null);
                }
              }}
              onConfirm={handleConfirmDelete}
              isDeleting={deleting}
            />
          )}

        {statusChangeToConfirm && (
          <RejectApplicationModal
            onClose={() => setStatusChangeToConfirm(null)}
            onConfirm={() => {
              const { applicationId, status } = statusChangeToConfirm;
              setStatusChangeToConfirm(null);
              handleStatusChange(applicationId, status, true);
            }}
          />
        )}

        {/* ======================================================
            NOTIFICATION
        ======================================================= */}

        {notification && (
          <div
            className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-[100] ${
              notification.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {notification.message}
          </div>
        )}

      </div>
    </div>
  );
};

// ============================================================
// DELETE APPLICATION MODAL
// ============================================================

const DeleteApplicationModal = ({
  application,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  const applicantName =
    application.applicant?.name ||
    "this applicant";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        <div className="p-4 sm:p-5 md:p-6">

          {/* Header */}

          <div className="flex items-start gap-3 sm:gap-4">

            <div className="bg-red-50 rounded-full p-2.5 sm:p-3 flex-shrink-0">

              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />

            </div>

            <div className="flex-1 min-w-0">

              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                Delete Application?
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed">

                Are you sure you want to delete the
                application from{" "}

                <span className="font-semibold text-slate-700">
                  {applicantName}
                </span>
                ?

                <span className="block mt-1">
                  This action cannot be undone.
                </span>

              </p>

            </div>

            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 disabled:opacity-50"
            >

              <X className="w-5 h-5 text-slate-500" />

            </button>

          </div>

          {/* Application Info */}

          <div className="mt-4 sm:mt-5 bg-slate-50 rounded-xl p-3 sm:p-4">

            <p className="text-xs text-slate-400 mb-1">
              Job
            </p>

            <p className="text-sm font-medium text-slate-700 break-words">
              {application.job?.title ||
                "Unknown Job"}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {application.job?.company ||
                "Unknown Company"}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              Application ID
            </p>

            <p className="text-xs text-slate-600 break-all">
              {application._id}
            </p>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">

            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >

              {isDeleting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Application
                </>
              )}

            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

// ============================================================
// LOADING STATE
// ============================================================

const RejectApplicationModal = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-4">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-red-50 p-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">Reject application?</h3>
          <p className="mt-1 text-sm text-slate-500">This will mark the application as rejected.</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg">
          Reject application
        </button>
      </div>
    </div>
  </div>
);

const ApplicationsLoadingState = () => (
  <div className="w-full overflow-x-auto">
    <div className="min-w-[320px] p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">

      {/* Header */}

      <div className="animate-pulse space-y-3">

        <div className="h-3 bg-slate-200 rounded w-36" />

        <div className="h-7 sm:h-8 bg-slate-200 rounded w-48 sm:w-64" />

        <div className="h-4 bg-slate-200 rounded w-72 sm:w-96 max-w-full" />

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 animate-pulse"
          >

            <div className="flex justify-between">

              <div className="space-y-3">

                <div className="h-4 bg-slate-200 rounded w-20 sm:w-28" />

                <div className="h-7 sm:h-8 bg-slate-200 rounded w-12 sm:w-16" />

              </div>

              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 rounded-xl" />

            </div>

          </div>
        ))}

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-slate-100 animate-pulse">

        <div className="h-10 bg-slate-200 rounded-xl w-full mb-4 sm:mb-6" />

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-14 sm:h-16 bg-slate-100 rounded-xl mb-2 sm:mb-3"
          />
        ))}

      </div>

    </div>
  </div>
);

// ============================================================
// ERROR STATE
// ============================================================

const ApplicationsErrorState = ({
  error,
  onRetry,
}) => (
  <div className="w-full overflow-x-auto">
    <div className="min-w-[320px] p-3 sm:p-4 md:p-6 lg:p-8">

      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">

        <div className="bg-red-50 rounded-full p-3 sm:p-4 mb-4 sm:mb-5">

          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />

        </div>

        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 text-center">
          Failed to Load Applications
        </h3>

        <p className="text-sm text-slate-500 mb-4 sm:mb-5 text-center max-w-md">
          {error ||
            "Something went wrong while loading applications."}
        </p>

        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow"
        >

          <RefreshCw className="w-4 h-4" />

          Retry

        </button>

      </div>

    </div>
  </div>
);

// ============================================================
// EMPTY STATE
// ============================================================

const ApplicationsEmptyState = ({
  hasFilters,
  onClear,
}) => (
  <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">

    <div className="bg-slate-100 rounded-full p-3 sm:p-4 mb-4 sm:mb-5">

      {hasFilters ? (
        <Search className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
      ) : (
        <Users className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
      )}

    </div>

    <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 text-center">
      {hasFilters
        ? "No matching applications"
        : "No applications yet"}
    </h3>

    <p className="text-sm text-slate-500 text-center mb-4 sm:mb-5 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria."
        : "When users apply for jobs, their applications will appear here."}
    </p>

    {hasFilters && (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    )}

  </div>
);

export default Applications;
