import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPin,
  Search,
  XCircle,
  ChevronDown,
  Building2,
  ArrowUpRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../redux/slicer/jobApplicationSlice";

const MyAppication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const {
    applications = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const formattedApplications = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    return applications.map((application) => {
      const job =
        application?.job && typeof application.job === "object"
          ? application.job
          : {};

      const companyName =
        job?.company?.name ||
        job?.companyName ||
        (typeof job?.company === "string" ? job.company : "") ||
        "Company";

      const location =
        job?.location?.city ||
        job?.location?.name ||
        (typeof job?.location === "string" ? job.location : "") ||
        job?.jobLocation ||
        "Location not specified";

      const jobType =
        job?.jobType ||
        job?.type ||
        job?.employmentType ||
        "Full Time";

      let salary = "Salary not specified";

      if (job?.salary) {
        if (typeof job.salary === "string") {
          salary = job.salary;
        } else if (typeof job.salary === "object") {
          const min = job.salary?.min;
          const max = job.salary?.max;
          const amount = job.salary?.amount;

          if (min !== undefined && max !== undefined) {
            salary = `₹${min} - ₹${max}`;
          } else if (min !== undefined) {
            salary = `₹${min}`;
          } else if (max !== undefined) {
            salary = `₹${max}`;
          } else if (amount !== undefined) {
            salary = `₹${amount}`;
          }
        }
      }

      const rawStatus = application?.status || "pending";

      const statusMap = {
        pending: "Applied",
        applied: "Applied",
        review: "Under Review",
        reviewed: "Under Review",
        "under-review": "Under Review",
        "under review": "Under Review",
        shortlisted: "Shortlisted",
        interview: "Interview",
        rejected: "Rejected",
        accepted: "Shortlisted",
      };

      const normalizedStatus = String(rawStatus)
        .trim()
        .toLowerCase();

      const displayStatus =
        statusMap[normalizedStatus] || rawStatus;

      const jobId =
        typeof application?.job === "object"
          ? application?.job?._id
          : application?.job;

      let appliedDate = "Date not available";

      if (application?.appliedAt) {
        const date = new Date(application.appliedAt);

        if (!Number.isNaN(date.getTime())) {
          appliedDate = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
      }

      const logo =
        companyName?.charAt(0)?.toUpperCase() || "J";

      return {
        id: application?._id || application?.id,
        jobId,
        jobTitle:
          job?.title ||
          job?.jobTitle ||
          "Job Title",
        company: companyName,
        location,
        type: jobType,
        salary,
        appliedDate,
        status: displayStatus,
        logo,
      };
    });
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return formattedApplications.filter((application) => {
      const jobTitle = String(
        application?.jobTitle || ""
      ).toLowerCase();

      const company = String(
        application?.company || ""
      ).toLowerCase();

      const location = String(
        application?.location || ""
      ).toLowerCase();

      const matchesSearch =
        !search ||
        jobTitle.includes(search) ||
        company.includes(search) ||
        location.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        application?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    formattedApplications,
    searchTerm,
    statusFilter,
  ]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Applied":
        return {
          icon: Clock3,
          text: "text-[#159FEF]",
          bg: "bg-[#A0E9FF]/20",
          border: "border-[#A0E9FF]/50",
        };

      case "Under Review":
        return {
          icon: Eye,
          text: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
        };

      case "Shortlisted":
        return {
          icon: CheckCircle2,
          text: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-100",
        };

      case "Interview":
        return {
          icon: CalendarDays,
          text: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-100",
        };

      case "Rejected":
        return {
          icon: XCircle,
          text: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-100",
        };

      default:
        return {
          icon: Clock3,
          text: "text-slate-600",
          bg: "bg-slate-50",
          border: "border-slate-100",
        };
    }
  };

  const totalApplications =
    formattedApplications.length;

  const underReview =
    formattedApplications.filter(
      (item) => item.status === "Under Review"
    ).length;

  const shortlisted =
    formattedApplications.filter(
      (item) =>
        item.status === "Shortlisted" ||
        item.status === "Interview"
    ).length;

  const rejected =
    formattedApplications.filter(
      (item) => item.status === "Rejected"
    ).length;

  const handleRetry = () => {
    dispatch(getMyApplications());
  };

  const handleViewDetails = (jobId) => {
    if (!jobId) return;

    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-slate-50">
        <div className="flex min-h-[calc(100vh-68px)] items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A0E9FF]/20">
              <Loader2
                className="animate-spin text-[#159FEF]"
                size={28}
              />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading your applications...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-slate-50">
        <div className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-7xl items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load applications
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Something went wrong while fetching your
              applications. Please try again.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#30AFFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#159FEF]"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-68px)] overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">

        {/* ================= Header ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#159FEF] via-[#30AFFF] to-[#159FEF] p-5 shadow-lg sm:p-7 lg:p-8">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-16 bottom-[-70px] h-40 w-40 rounded-full bg-white/10" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <BriefcaseBusiness size={14} />
              CareerSphere
            </div>

            <div className="mt-4 max-w-2xl">
              <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                My Applications
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
                Track your job applications and stay
                updated on your career journey.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <FileText size={13} />
                {totalApplications} Applications
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={13} />
                {shortlisted} Shortlisted
              </span>
            </div>
          </div>
        </section>

        {/* ================= Stats ================= */}
        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

          <StatCard
            icon={FileText}
            label="Total Applications"
            value={totalApplications}
          />

          <StatCard
            icon={Eye}
            label="Under Review"
            value={underReview}
          />

          <StatCard
            icon={CheckCircle2}
            label="Shortlisted"
            value={shortlisted}
          />

          <StatCard
            icon={XCircle}
            label="Rejected"
            value={rejected}
          />

        </section>

        {/* ================= Search / Filter ================= */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-xl">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search by job title, company or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#A0E9FF]/30"
              />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#A0E9FF]/30 sm:min-w-[180px]"
              >
                <option value="All">
                  All Status
                </option>
                <option value="Applied">
                  Applied
                </option>
                <option value="Under Review">
                  Under Review
                </option>
                <option value="Shortlisted">
                  Shortlisted
                </option>
                <option value="Interview">
                  Interview
                </option>
                <option value="Rejected">
                  Rejected
                </option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* ================= Application List ================= */}
        <section className="mt-7">

          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Application History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredApplications.length}{" "}
                {filteredApplications.length === 1
                  ? "application"
                  : "applications"}{" "}
                found
              </p>
            </div>
          </div>

          {filteredApplications.length > 0 ? (
            <div className="space-y-4">

              {filteredApplications.map(
                (application) => {
                  const status = getStatusConfig(
                    application.status
                  );

                  const StatusIcon = status.icon;

                  return (
                    <article
                      key={application.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#A0E9FF] hover:shadow-md sm:p-5"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Left */}
                        <div className="flex min-w-0 flex-1 items-start gap-4">

                          {/* Company Logo */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#159FEF] to-[#30AFFF] text-lg font-bold text-white shadow-sm">
                            {application.logo}
                          </div>

                          {/* Job Info */}
                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-start gap-2">
                              <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                                {application.jobTitle}
                              </h3>

                              <span
                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}
                              >
                                <StatusIcon size={13} />
                                {application.status}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">

                              <span className="inline-flex items-center gap-1.5">
                                <Building2
                                  size={15}
                                  className="text-[#159FEF]"
                                />
                                <span className="max-w-[220px] truncate">
                                  {application.company}
                                </span>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <MapPin
                                  size={15}
                                  className="text-[#159FEF]"
                                />
                                <span>
                                  {application.location}
                                </span>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <BriefcaseBusiness
                                  size={15}
                                  className="text-[#159FEF]"
                                />
                                <span>
                                  {application.type}
                                </span>
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays
                                  size={14}
                                  className="text-slate-400"
                                />
                                Applied on{" "}
                                <span className="font-medium text-slate-700">
                                  {application.appliedDate}
                                </span>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <span className="font-medium text-slate-400">
                                  Salary:
                                </span>

                                <span className="font-semibold text-slate-700">
                                  {application.salary}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex shrink-0 items-center justify-end border-t border-slate-100 pt-4 lg:border-0 lg:pt-0">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewDetails(
                                application.jobId
                              )
                            }
                            disabled={!application.jobId}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#A0E9FF] bg-[#A0E9FF]/20 px-4 py-2.5 text-sm font-semibold text-[#159FEF] transition hover:bg-[#30AFFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                          >
                            View Details
                            <ArrowUpRight size={16} />
                          </button>

                        </div>
                      </div>
                    </article>
                  );
                }
              )}

            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A0E9FF]/20 text-[#159FEF]">
                {searchTerm || statusFilter !== "All" ? (
                  <Search size={28} />
                ) : (
                  <FileText size={28} />
                )}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {searchTerm || statusFilter !== "All"
                  ? "No applications found"
                  : "No applications yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {searchTerm || statusFilter !== "All"
                  ? "Try changing your search or status filter to find the applications you are looking for."
                  : "Once you apply for a job, your application history will appear here."}
              </p>

              {(searchTerm ||
                statusFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#30AFFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#159FEF]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="group min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-[#A0E9FF] hover:bg-white">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/20 text-[#159FEF] transition group-hover:bg-[#A0E9FF]/30">
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
            {label}
          </p>

          <p className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MyAppication;