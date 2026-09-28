// src/admin/pages/Users.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users as UsersIcon,
  Search,
  CreditCard,
  UserX,
  UserPlus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Calendar,
  MapPin,
  Briefcase,
  Phone,
} from "lucide-react";
import StateCard from "../components/StateCard";
import {
  getAllUsersAdmin,
  deleteUserAdmin,
  updateUserAdmin,
  toggleUserActive,
  toggleUserVerified,
  clearUserMessages,
} from "../../redux/slicer/adminUserSlice";

const Users = () => {
  const dispatch = useDispatch();

  // Redux state
  const users = useSelector((state) => state.adminUser?.users || []);
  const loading = useSelector((state) => state.adminUser?.fetchLoading || false);
  const error = useSelector((state) => state.adminUser?.fetchError || null);
  const deleteLoading = useSelector((state) => state.adminUser?.deleteLoading || false);
  const updateLoading = useSelector((state) => state.adminUser?.updateLoading || false);
  const successMessage = useSelector((state) => state.adminUser?.successMessage || null);
  const statistics = useSelector((state) => state.adminUser?.statistics || null);
  const total = useSelector((state) => state.adminUser?.total || 0);
  const totalPages = useSelector((state) => state.adminUser?.totalPages || 1);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch users
  const fetchUsers = useCallback((page = 1) => {
    const params = {
      page,
      limit: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    
    if (searchTerm) params.search = searchTerm;
    if (filterType === "active") params.isActive = "true";
    else if (filterType === "inactive") params.isActive = "false";
    
    dispatch(getAllUsersAdmin(params));
  }, [dispatch, searchTerm, filterType]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearUserMessages());
      fetchUsers(currentPage);
    }
  }, [successMessage, dispatch, fetchUsers, currentPage]);

  useEffect(() => {
    if (error) {
      showNotification(error, "error");
      dispatch(clearUserMessages());
    }
  }, [error, dispatch]);

  // Calculate statistics from API or fallback
  const stats = useMemo(() => {
    if (statistics) {
      return {
        totalUsers: statistics.totalUsers || 0,
        activeSubscriptions: statistics.activeUsers || 0,
        withoutSubscription: (statistics.totalUsers || 0) - (statistics.activeUsers || 0),
        recentlyRegistered: 0, // Calculate from users list
      };
    }
    // Fallback calculation from users
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.isActive).length;
    const verifiedUsers = users.filter((user) => user.isVerified).length;
    
    const recentlyRegistered = users.filter((user) => {
      const joinDate = new Date(user.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length;

    return {
      totalUsers,
      activeSubscriptions: activeUsers,
      withoutSubscription: totalUsers - activeUsers,
      recentlyRegistered,
    };
  }, [users, statistics]);

  // Filter and search users (client-side filtering)
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.mobile?.toLowerCase().includes(searchLower)
      );
    }

    // Apply subscription filter (using isActive as proxy)
    if (filterType === "active") {
      result = result.filter((user) => user.isActive === true);
    } else if (filterType === "inactive") {
      result = result.filter((user) => user.isActive === false);
    } else if (filterType === "verified") {
      result = result.filter((user) => user.isVerified === true);
    }

    // Apply sort
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [users, searchTerm, filterType, sortOrder]);

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Handle save edited user
  const handleSaveUser = async (updatedUser) => {
    try {
      const id = updatedUser._id || updatedUser.id;
      await dispatch(updateUserAdmin({ id, userData: updatedUser })).unwrap();
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete user
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;

    try {
      const id = deletingUser._id || deletingUser.id;
      await dispatch(deleteUserAdmin(id)).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Toggle user active status
  const handleToggleActive = async (user) => {
    try {
      const id = user._id || user.id;
      await dispatch(toggleUserActive(id)).unwrap();
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setSortOrder("newest");
    setCurrentPage(1);
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get role badge
  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-50 text-purple-700",
      recruiter: "bg-blue-50 text-blue-700",
      jobseeker: "bg-green-50 text-green-700",
    };
    return colors[role] || "bg-slate-50 text-slate-700";
  };

  // Loading state
  if (loading && users.length === 0) {
    return <UsersLoadingState />;
  }

  // Error state
  if (error && users.length === 0) {
    return <UsersErrorState error={error} onRetry={() => fetchUsers(currentPage)} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            User Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Manage Users
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View, manage and monitor all registered CareerSphere users.
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Total: {total} users • Page {currentPage} of {totalPages}
          </p>
        </div>
        <button
          onClick={() => fetchUsers(currentPage)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StateCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
          description="Registered users"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Active Users"
          value={stats.activeSubscriptions}
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          description="Active accounts"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Inactive Users"
          value={stats.withoutSubscription}
          icon={<UserX className="w-6 h-6 text-slate-600" />}
          description="Inactive accounts"
          iconBg="bg-slate-50"
        />
        <StateCard
          title="Recently Registered"
          value={stats.recentlyRegistered}
          icon={<UserPlus className="w-6 h-6 text-indigo-600" />}
          description="New users (30 days)"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Users Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                All Users
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredUsers.length} registered user
                {filteredUsers.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                  <option value="verified">Verified Only</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                </select>

                {(searchTerm || filterType !== "all" || sortOrder !== "newest") && (
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    title="Clear filters"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                    <span className="sm:hidden text-sm text-slate-600">Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <UsersEmptyState
            hasFilters={searchTerm || filterType !== "all"}
            onClear={clearFilters}
          />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id || user.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {getUserInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {user.name || "Unknown"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {user.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                          {user.role || "jobseeker"}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {user.mobile && (
                            <p className="text-sm text-slate-700 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {user.mobile}
                            </p>
                          )}
                          {user.location && (
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {user.location}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.isActive
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                          {user.isVerified && (
                            <div className="text-xs text-blue-600 font-medium">
                              ✓ Verified
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(user.createdAt)}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleActive(user)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.isActive
                                ? "text-green-400 hover:text-red-600 hover:bg-red-50"
                                : "text-red-400 hover:text-green-600 hover:bg-green-50"
                            }`}
                            title={user.isActive ? "Deactivate" : "Activate"}
                          >
                            {user.isActive ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <div key={user._id || user.id} className="p-4 space-y-3">
                  {/* User Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {getUserInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {user.name || "Unknown"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email || "No email"}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)} mt-1`}>
                          {user.role || "jobseeker"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleToggleActive(user)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.isActive
                            ? "text-green-400 hover:text-red-600 hover:bg-red-50"
                            : "text-red-400 hover:text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {user.isActive ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                    {user.isVerified && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        Verified
                      </span>
                    )}
                    {user.mobile && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600">
                        <Phone className="w-3 h-3" />
                        {user.mobile}
                      </span>
                    )}
                    {user.location && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, total)} of {total} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          isLoading={updateLoading}
        />
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingUser(null);
          }}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteLoading}
        />
      )}

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

// Loading State Component
const UsersLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
      <div className="h-4 bg-slate-200 rounded w-48"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
      <div className="h-8 bg-slate-200 rounded w-full mb-6"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 rounded-xl mb-3"></div>
      ))}
    </div>
  </div>
);

// Error State Component
const UsersErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Users
      </h3>
      <p className="text-sm text-slate-500 mb-4 text-center max-w-md px-4">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State Component
const UsersEmptyState = ({ hasFilters, onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <UsersIcon className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching users found" : "No users yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria to find what you're looking for."
        : "When users register on CareerSphere, they will appear here."}
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

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    role: user.role || "jobseeker",
    location: user.location || "",
    isActive: user.isActive !== undefined ? user.isActive : true,
    isVerified: user.isVerified !== undefined ? user.isVerified : false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave({ ...user, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Edit User</h3>
            <p className="text-sm text-slate-500 mt-0.5">Update user information</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? "border-red-300" : "border-slate-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? "border-red-300" : "border-slate-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="e.g., Bangalore, India"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Verified
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete User Modal Component
const DeleteUserModal = ({ user, onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">Delete User?</h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete {user?.name}? This action cannot be undone.
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {user?.name ? user.name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2) : "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;