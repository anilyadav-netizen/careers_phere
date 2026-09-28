import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  BriefcaseBusiness,
  FileText,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  Eye,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  IndianRupee,
} from "lucide-react";

import StatCard from "../components/StateCard";

import { getAllUsersAdmin } from "../../redux/slicer/adminUserSlice";
import { getAllJobsAdmin } from "../../redux/slicer/jobSlice";
import { getAllSubscriptionsAdmin } from "../../redux/slicer/adminsubscriptionSlice";
import { getAllApplicationsAdmin } from "../../redux/slicer/jobApplicationSlice";

const AdminDashboard = () => {
  /* =========================================================
     REDUX
  ========================================================= */

  const dispatch = useDispatch();

  const {
    users,
    total: totalUsers,
    count: userCount,
    fetchLoading: usersLoading,
  } = useSelector((state) => state.adminUser);

  const {
    adminJobs,
    adminCount,
    adminLoading: jobsLoading,
  } = useSelector((state) => state.jobs);

  const {
    adminSubscriptions,
    adminSubscriptionsCount,
    revenue = 0,
    completedPurchases = 0,
    loading: subscriptionsLoading,
  } = useSelector((state) => state.subscription);

  const {
    adminApplications = [],
    adminApplicationsCount = 0,
    loading: applicationsLoading = false,
    error: applicationsError = null,
  } = useSelector((state) => state.application || {});

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    dispatch(getAllUsersAdmin());
    dispatch(getAllJobsAdmin());
    dispatch(getAllSubscriptionsAdmin());

    dispatch(
      getAllApplicationsAdmin({
        status: "",
        job: "",
      })
    );
  }, [dispatch]);

  /* =========================================================
     DATE HELPERS
     
     IMPORTANT:
     createdAt  -> record creation time
     updatedAt  -> ignored for recent/created calculations
     ========================================================= */

  const getDate = (dateString) => {
    if (!dateString) {
      return null;
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const isToday = (dateString) => {
    const date = getDate(dateString);

    if (!date) {
      return false;
    }

    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isWithinLastDays = (dateString, days = 5) => {
    const date = getDate(dateString);

    if (!date) {
      return false;
    }

    const now = new Date();

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);

    return date >= startDate && date <= now;
  };

  const formatDate = (dateString) => {
    const date = getDate(dateString);

    if (!date) {
      return "N/A";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const date = getDate(dateString);

    if (!date) {
      return "N/A";
    }

    const now = new Date();

    const difference = now.getTime() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    if (days === 1) {
      return "1 day ago";
    }

    return `${days} days ago`;
  };

  /* =========================================================
     USER DATA
  ========================================================= */

  const normalizedUsers = useMemo(() => {
    return Array.isArray(users) ? users : [];
  }, [users]);

  const totalUsersValue =
    totalUsers ||
    userCount ||
    normalizedUsers.length ||
    0;

  /* =========================================================
     NEW USERS TODAY
     
     ONLY:
     - role === user
     - createdAt === today
     
     IGNORE:
     - updatedAt
     - lastLogin
  ========================================================= */

  const newUsersToday = useMemo(() => {
    return normalizedUsers.filter((user) => {
      if (user?.role !== "user") {
        return false;
      }

      return isToday(user?.createdAt);
    }).length;
  }, [normalizedUsers]);

  /* =========================================================
     RECENT USERS - LAST 5 DAYS
     
     ONLY:
     - role === user
     - createdAt last 5 days
     - latest first
     - maximum 5
  ========================================================= */

  const recentUsers = useMemo(() => {
    return normalizedUsers
      .filter((user) => {
        if (user?.role !== "user") {
          return false;
        }

        return isWithinLastDays(
          user?.createdAt,
          5
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 5)
      .map((user) => ({
        id: user?._id,

        name:
          user?.name ||
          user?.fullName ||
          "Unknown User",

        email:
          user?.email ||
          "No email",

        role:
          user?.jobTitle ||
          "User",

        status:
          user?.isActive === false
            ? "Inactive"
            : user?.isVerified === false
              ? "Pending"
              : "Active",

        initial: (
          user?.name ||
          user?.fullName ||
          "U"
        )
          .charAt(0)
          .toUpperCase(),

        createdAt: user?.createdAt,

        registeredDate: formatDate(
          user?.createdAt
        ),

        timeAgo: getTimeAgo(
          user?.createdAt
        ),
      }));
  }, [normalizedUsers]);

  /* =========================================================
     FALLBACK RECENT USERS
  ========================================================= */

  const displayRecentUsers =
    recentUsers.length > 0
      ? recentUsers
      : [
          {
            id: "no-users",
            name: "No recent users",
            email:
              "No users registered in the last 5 days",
            role: "—",
            status: "Pending",
            initial: "U",
            createdAt: null,
            registeredDate: "—",
            timeAgo: "—",
          },
        ];

  /* =========================================================
     JOB DATA
  ========================================================= */

  const normalizedJobs = useMemo(() => {
    return Array.isArray(adminJobs)
      ? adminJobs
      : [];
  }, [adminJobs]);

  const totalJobsValue =
    adminCount ||
    normalizedJobs.length ||
    0;

  /* =========================================================
     JOBS POSTED TODAY
     
     IMPORTANT:
     createdAt only
     updatedAt ignored
  ========================================================= */

  const jobsPostedToday = useMemo(() => {
    return normalizedJobs.filter((job) => {
      return isToday(job?.createdAt);
    }).length;
  }, [normalizedJobs]);

  /* =========================================================
     RECENT JOBS - LAST 5 DAYS
     
     createdAt based
     latest first
     maximum 5
  ========================================================= */

  const recentJobs = useMemo(() => {
    return normalizedJobs
      .filter((job) => {
        return isWithinLastDays(
          job?.createdAt,
          5
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 5)
      .map((job) => ({
        id: job?._id,

        title:
          job?.title ||
          "Untitled Job",

        company:
          job?.company ||
          "Unknown Company",

        location:
          job?.location ||
          "Location not specified",

        jobType:
          job?.jobType ||
          "N/A",

        status:
          job?.status ||
          "active",

        createdAt:
          job?.createdAt,

        date:
          formatDate(
            job?.createdAt
          ),

        timeAgo:
          getTimeAgo(
            job?.createdAt
          ),
      }));
  }, [normalizedJobs]);

  /* =========================================================
     SUBSCRIPTION DATA
  ========================================================= */

  const normalizedSubscriptions =
    useMemo(() => {
      return Array.isArray(adminSubscriptions)
        ? adminSubscriptions
        : [];
    }, [adminSubscriptions]);

  const totalSubscriptionsValue =
    adminSubscriptionsCount ||
    normalizedSubscriptions.length ||
    0;

  const activeSubscriptions =
    normalizedSubscriptions.filter(
      (subscription) =>
        subscription?.isActive === true ||
        subscription?.status === "active" ||
        subscription?.status === "Active"
    ).length || 0;

  const expiredSubscriptions =
    normalizedSubscriptions.filter(
      (subscription) =>
        subscription?.status === "expired" ||
        subscription?.status === "Expired"
    ).length || 0;

  /* =========================================================
     RECENT SUBSCRIPTIONS - LAST 5 DAYS
     
     createdAt based
  ========================================================= */

  const recentSubscriptions = useMemo(() => {
    return normalizedSubscriptions
      .filter((subscription) => {
        return isWithinLastDays(
          subscription?.createdAt,
          5
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 5);
  }, [normalizedSubscriptions]);

  /* =========================================================
     APPLICATION DATA
  ========================================================= */

  const normalizedApplications = useMemo(() => {
    return Array.isArray(adminApplications)
      ? adminApplications
      : [];
  }, [adminApplications]);

  const totalApplicationsValue =
    adminApplicationsCount ||
    normalizedApplications.length ||
    0;

  /* =========================================================
     APPLICATIONS TODAY
     
     appliedAt first
     createdAt fallback
  ========================================================= */

  const applicationsToday = useMemo(() => {
    return normalizedApplications.filter(
      (application) => {
        const applicationDate =
          application?.appliedAt ||
          application?.createdAt;

        return isToday(applicationDate);
      }
    ).length;
  }, [normalizedApplications]);

  /* =========================================================
     FORMAT APPLICATION DATE
  ========================================================= */

  const formatApplicationDate = (dateString) => {
    const date = getDate(dateString);

    if (!date) {
      return "N/A";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     RECENT APPLICATIONS - LAST 5 DAYS
     
     appliedAt first
     createdAt fallback
     latest first
     maximum 5
  ========================================================= */

  const recentApplications = useMemo(() => {
    return [...normalizedApplications]
      .filter((application) => {
        const applicationDate =
          application?.appliedAt ||
          application?.createdAt;

        return isWithinLastDays(
          applicationDate,
          5
        );
      })
      .sort((a, b) => {
        const dateA = new Date(
          a?.appliedAt ||
            a?.createdAt ||
            0
        );

        const dateB = new Date(
          b?.appliedAt ||
            b?.createdAt ||
            0
        );

        return dateB - dateA;
      })
      .slice(0, 5)
      .map((application) => ({
        id: application?._id,

        name:
          application?.applicant?.name ||
          "Unknown Applicant",

        job:
          application?.job?.title ||
          "Unknown Job",

        company:
          application?.job?.company ||
          "Unknown Company",

        status:
          application?.status
            ? application.status
                .charAt(0)
                .toUpperCase() +
              application.status.slice(1)
            : "Pending",

        date: formatApplicationDate(
          application?.appliedAt ||
            application?.createdAt
        ),

        timeAgo: getTimeAgo(
          application?.appliedAt ||
            application?.createdAt
        ),
      }));
  }, [normalizedApplications]);

  /* =========================================================
     FALLBACK RECENT APPLICATIONS
  ========================================================= */

  const displayRecentApplications =
    recentApplications.length > 0
      ? recentApplications
      : [
          {
            id: "no-applications",
            name: "No recent applications",
            job: "—",
            company: "No applications in last 5 days",
            status: "Pending",
            date: "—",
            timeAgo: "—",
          },
        ];

  /* =========================================================
     APPLICATION CHART DATA - BASED ON ACTUAL DATA
  ========================================================= */

  const applicationChartData = useMemo(() => {
    // Get the last 7 days
    const days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      days.push({
        date: date,
        label: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
        count: 0,
        // Generate realistic heights based on application data
        // Using the actual distribution from the data
        height: 0,
      });
    }

    // Count applications per day from actual data
    normalizedApplications.forEach((app) => {
      const appDate = new Date(app.appliedAt || app.createdAt);
      days.forEach((day) => {
        if (
          appDate.getFullYear() === day.date.getFullYear() &&
          appDate.getMonth() === day.date.getMonth() &&
          appDate.getDate() === day.date.getDate()
        ) {
          day.count += 1;
        }
      });
    });

    // Calculate heights based on actual counts (max height 85% for max count)
    const maxCount = Math.max(...days.map(d => d.count), 1);
    
    return days.map((day) => ({
      ...day,
      height: Math.max(5, (day.count / maxCount) * 85),
    }));
  }, [normalizedApplications]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = [
    {
      title: "Total Users",
      value: usersLoading
        ? "..."
        : totalUsersValue.toLocaleString(),
      description: "Registered users",
      icon: Users,
      iconClass:
        "bg-blue-50 text-blue-600",
      trend: "+12.5%",
      trendPositive: true,
    },

    {
      title: "Total Jobs",
      value: jobsLoading
        ? "..."
        : totalJobsValue.toLocaleString(),
      description: "Jobs listed",
      icon: BriefcaseBusiness,
      iconClass:
        "bg-purple-50 text-purple-600",
      trend: "+8.2%",
      trendPositive: true,
    },

    {
      title: "Applications",
      value: applicationsLoading
        ? "..."
        : totalApplicationsValue.toLocaleString(),
      description: "Total applications",
      icon: FileText,
      iconClass:
        "bg-orange-50 text-orange-600",
      trend: "+15.4%",
      trendPositive: true,
    },

    {
      title: "Revenue",
      value: subscriptionsLoading
        ? "..."
        : `₹${Number(revenue).toLocaleString("en-IN")}`,
      description: `${completedPurchases} completed subscription purchase${completedPurchases === 1 ? "" : "s"}`,
      icon: CreditCard,
      iconClass:
        "bg-green-50 text-green-600",
      trend: "+10.8%",
      trendPositive: true,
    },
  ];

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "active":
      case "accepted":
        return "bg-green-50 text-green-600";

      case "pending":
        return "bg-amber-50 text-amber-600";

      case "shortlisted":
        return "bg-blue-50 text-blue-600";

      case "rejected":
      case "inactive":
      case "expired":
        return "bg-red-50 text-red-500";

      default:
        return "bg-slate-50 text-slate-500";
    }
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Overview
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, Admin 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening on CareerSphere today.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "http://localhost:5173/";
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Eye size={16} />
              View Website
            </button>
          </div>
        </div>

        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
            />
          ))}
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* ===================================================
              APPLICATION OVERVIEW
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Application Overview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Application activity for the last 7 days
                </p>
              </div>

              <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 outline-none">
                <option>
                  Last 7 Days
                </option>

                <option>
                  Last 30 Days
                </option>

                <option>
                  Last 3 Months
                </option>
              </select>
            </div>

            {/* CHART - Updated with actual data */}

            <div className="p-5 sm:p-6">
              <div className="flex h-64 items-end gap-2 sm:gap-4">
                {applicationChartData.map(
                  (day, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="relative flex h-[85%] w-full items-end justify-center">
                        <div
                          className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-500"
                          style={{
                            height: `${day.height}%`,
                          }}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                            {day.count} applications
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-medium text-slate-400">
                        {day.label}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* LEGEND */}

              <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

                  <span className="text-xs text-slate-500">
                    Applications
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-xs text-slate-500">
                    Successful
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================
              QUICK STATS
          ==================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Quick Statistics
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Platform performance
              </p>
            </div>

            <div className="mt-5 space-y-4">

              {/* NEW USERS */}

              <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <UserPlus size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    New Users Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    {usersLoading
                      ? "..."
                      : newUsersToday}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              {/* JOBS */}

              <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
                  <BriefcaseBusiness size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Jobs Posted Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    {jobsLoading
                      ? "..."
                      : jobsPostedToday}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              {/* APPLICATIONS TODAY */}

              <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Applications Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    {applicationsLoading
                      ? "..."
                      : applicationsToday}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              {/* REVENUE */}

              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                  <IndianRupee size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Revenue Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    ₹18,450
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

            </div>
          </section>
        </div>

        {/* =====================================================
            RECENT DATA
        ====================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* ===================================================
              RECENT USERS
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Recent Users
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Users registered in the last 5 days
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">

              {usersLoading ? (
                [...Array(5)].map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 sm:px-6"
                    >
                      <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                        <div className="h-3 w-44 animate-pulse rounded bg-slate-100" />
                      </div>

                      <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  )
                )
              ) : (
                displayRecentUsers.map(
                  (user, index) => (
                    <div
                      key={`${user.id || user.email}-${index}`}
                      className="flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:px-6"
                    >
                      {/* AVATAR */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                        {user.initial}
                      </div>

                      {/* USER INFO */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-700">
                          {user.name}
                        </p>

                        <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                          {user.email}
                        </p>
                      </div>

                      {/* ROLE */}

                      <div className="hidden min-w-0 flex-1 sm:block">
                        <p className="truncate text-xs font-medium text-slate-600">
                          {user.role}
                        </p>

                        {user.createdAt && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {user.timeAgo}
                          </p>
                        )}
                      </div>

                      {/* STATUS */}

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  )
                )
              )}

            </div>
          </section>

          {/* ===================================================
              RECENT APPLICATIONS
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">

              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Recent Applications
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Applications received in the last 5 days
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            {/* APPLICATION ERROR */}

            {applicationsError &&
            normalizedApplications.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-red-500">
                  {applicationsError}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">

                {applicationsLoading ? (
                  [...Array(5)].map(
                    (_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 sm:px-6"
                      >
                        <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                          <div className="h-3 w-44 animate-pulse rounded bg-slate-100" />
                        </div>
                      </div>
                    )
                  )
                ) : (
                  displayRecentApplications.map(
                    (application, index) => (
                      <div
                        key={`${application.id}-${index}`}
                        className="flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:px-6"
                      >

                        {/* ICON */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-600">
                          <FileText size={17} />
                        </div>

                        {/* APPLICATION INFO */}

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-bold text-slate-700">
                            {application.name}
                          </p>

                          <p className="truncate text-xs text-blue-600">
                            {application.job}
                          </p>

                          <p className="mt-1 hidden items-center gap-1 text-[10px] text-slate-400 sm:flex">

                            <span className="truncate">
                              {application.company}
                            </span>

                            <span>
                              •
                            </span>

                            <span>
                              {application.date}
                            </span>

                            {application.timeAgo !==
                              "N/A" &&
                              application.timeAgo !==
                                "—" && (
                                <>
                                  <span>
                                    •
                                  </span>

                                  <span>
                                    {application.timeAgo}
                                  </span>
                                </>
                              )}

                          </p>
                        </div>

                        {/* STATUS */}

                        <span
                          className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                        {/* MENU */}

                        <button
                          type="button"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <MoreHorizontal size={17} />
                        </button>

                      </div>
                    )
                  )
                )}

              </div>
            )}

          </section>
        </div>

        {/* =====================================================
            BOTTOM CARDS
        ====================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ACTIVE SUBSCRIPTIONS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={19} />
              </div>

              <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
                Active
              </span>

            </div>

            <p className="mt-4 text-xs text-slate-400">
              Active Subscriptions
            </p>

            <h3 className="mt-1 text-2xl font-black text-slate-800">
              {subscriptionsLoading
                ? "..."
                : activeSubscriptions}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Currently active plans
            </p>

          </div>

          {/* EXPIRED */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={19} />
              </div>

              <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                Expired
              </span>

            </div>

            <p className="mt-4 text-xs text-slate-400">
              Expired Subscriptions
            </p>

            <h3 className="mt-1 text-2xl font-black text-slate-800">
              {subscriptionsLoading
                ? "..."
                : expiredSubscriptions}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Need renewal
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
