import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Edit3,
  LockKeyhole,
  CheckCircle2,
  Activity,
  Settings,
  ChevronRight,
} from "lucide-react";
import { getProfile } from "../../redux/slicer/authSlice"; 

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-3 sm:p-5 lg:p-7">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-slate-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-3 sm:p-5 lg:p-7">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">Error loading profile: {error}</p>
            <button
              onClick={() => dispatch(getProfile())}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-3 sm:p-5 lg:p-7">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-center">
            <p className="text-yellow-600">No profile data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-3 sm:p-5 lg:p-7">
      <div className="mx-auto w-full max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-5 sm:mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Manage your administrator account and personal information.
          </p>
        </div>

        {/* ================= PROFILE HERO ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 sm:h-36 lg:h-40" />

          <div className="px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              {/* Profile */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-600 shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                  {getInitials(user.name || user.fullName)}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {user.name || user.fullName || "N/A"}
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                      <CheckCircle2 size={13} />
                      {user.status || "Active"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {user.role || user.roleName || "Administrator"}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              {/* <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                <Edit3 size={17} />
                Edit Profile
              </button> */}
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* ================= PERSONAL INFORMATION ================= */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Your basic account information
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <User size={20} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Name */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <User size={15} className="text-blue-600" />
                    Full Name
                  </div>
                  <p className="break-words text-sm font-semibold text-slate-800">
                    {user.name || user.fullName || "N/A"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Mail size={15} className="text-blue-600" />
                    Email Address
                  </div>
                  <p className="break-all text-sm font-semibold text-slate-800">
                    {user.email || "N/A"}
                  </p>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Phone size={15} className="text-blue-600" />
                    Phone Number
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.phone || user.phoneNumber || "N/A"}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <ShieldCheck size={15} className="text-blue-600" />
                    Account Role
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.role || user.roleName || "N/A"}
                  </p>
                </div>

                {/* Joined */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays size={15} className="text-blue-600" />
                    Member Since
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {formatDate(user.createdAt || user.joinedDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-5">

            {/* Account Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Activity size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Account Status
                  </h3>
                  <p className="text-xs text-slate-500">
                    Current account overview
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">
                  Account
                </span>

                <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {user.status || "Active"}
                </span>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <LockKeyhole size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Security
                  </h3>
                  <p className="text-xs text-slate-500">
                    Protect your administrator account
                  </p>
                </div>
              </div>

              <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50">
                <div className="flex items-center gap-3">
                  <LockKeyhole size={17} className="text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Change Password
                  </span>
                </div>

                <ChevronRight size={17} className="text-slate-400" />
              </button>
            </div>

            {/* Settings */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <button className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Settings size={19} />
                  </div>

                  <div className="text-left">
                    <h3 className="text-sm font-bold text-slate-900">
                      Account Settings
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage preferences
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= QUICK INFO ================= */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck size={20} />
            </div>
            <p className="text-xs text-slate-500">Access Level</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {user.accessLevel || user.role || "Full Access"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Activity size={20} />
            </div>
            <p className="text-xs text-slate-500">Account Activity</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {user.status || "Active"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <CalendarDays size={20} />
            </div>
            <p className="text-xs text-slate-500">Member Since</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {formatDate(user.createdAt || user.joinedDate)}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;