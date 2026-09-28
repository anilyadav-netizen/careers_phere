// src/admin/pages/JobCategories.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Briefcase,
  Calendar,
  FolderOpen,
  Code2,
  TrendingUp,
  HeartPulse,
  Building2,
  Palette,
  Users,
  Megaphone,
  BarChart3,
  GraduationCap,
  Scale,
  Truck,
  UtensilsCrossed,
  Shield,
  Factory,
  Leaf,
  Layers,
  Grid,
  List,
  SlidersHorizontal,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import StateCard from "../components/StateCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  clearCategoryError,
  clearCategoryMessage,
  clearCategoryState,
} from "../../redux/slicer/categorySlice";

// Fallback icon mapping (used when no image is available)
const iconMap = {
  Code2: Code2,
  Megaphone: Megaphone,
  TrendingUp: TrendingUp,
  HeartPulse: HeartPulse,
  BarChart3: BarChart3,
  Palette: Palette,
  Users: Users,
  GraduationCap: GraduationCap,
  Scale: Scale,
  Truck: Truck,
  Briefcase: Briefcase,
  Building2: Building2,
  UtensilsCrossed: UtensilsCrossed,
  Shield: Shield,
  Factory: Factory,
  Leaf: Leaf,
};

const JobCategories = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    categories: rawCategories,
    loading,
    error,
    createLoading,
    updateLoading,
    deleteLoading,
    success,
    message,
  } = useSelector((state) => state.categories);

  // Map backend fields to UI-friendly format
  const categories = useMemo(
    () =>
      rawCategories.map((cat) => ({
        ...cat,
        id: cat._id,
        // Map schema fields
        imageUrl: cat.image || null,
        status: cat.isActive ? "active" : "inactive",
        totalJobs: cat.jobCount || 0,
        description: cat.shortDescription || "",
        // Keep original for editing
        original: cat,
      })),
    [rawCategories]
  );

  // Local UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("table");
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getAdminCategories());
  }, [dispatch]);

  // Clear Redux messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearCategoryState());
    };
  }, [dispatch]);

  // Show notifications from Redux
  useEffect(() => {
    if (success && message) {
      showNotification(message, "success");
      dispatch(clearCategoryMessage());
    }
    if (error) {
      showNotification(error, "error");
      dispatch(clearCategoryError());
    }
  }, [success, error, message, dispatch]);

  // Statistics
  const statistics = useMemo(() => {
    const totalCategories = categories.length;
    const activeCategories = categories.filter(
      (cat) => cat.status === "active"
    ).length;
    const totalJobs = categories.reduce(
      (sum, cat) => sum + (cat.totalJobs || 0),
      0
    );
    return { totalCategories, activeCategories, totalJobs };
  }, [categories]);

  // Filter and search
  const filteredCategories = useMemo(() => {
    let result = [...categories];
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchLower) ||
          (cat.description &&
            cat.description.toLowerCase().includes(searchLower))
      );
    }
    switch (filterType) {
      case "active":
        result = result.filter((cat) => cat.status === "active");
        break;
      case "inactive":
        result = result.filter((cat) => cat.status === "inactive");
        break;
      default:
        break;
    }
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "most-jobs":
        result.sort((a, b) => b.totalJobs - a.totalJobs);
        break;
      case "least-jobs":
        result.sort((a, b) => a.totalJobs - b.totalJobs);
        break;
      default:
        break;
    }
    return result;
  }, [categories, searchTerm, filterType, sortOrder]);

  // Handlers with Redux dispatch

const handleAddCategory = async (newCategory, file) => {
  const formData = new FormData();

  formData.append("name", newCategory.name);
  formData.append(
    "shortDescription",
    newCategory.shortDescription || ""
  );
  formData.append(
    "isActive",
    newCategory.isActive ? "true" : "false"
  );

  if (file) {
    formData.append("image", file);
  }

  console.log("Category file:", file);
  console.log("Category file name:", file?.name);

  await dispatch(createCategory(formData));
};

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

 const handleSaveCategory = async (updatedCategory, file) => {
  // Make sure we have the ID
  console.log("Saving category with ID:", updatedCategory.id);
  
  const formData = new FormData();
  formData.append("name", updatedCategory.name);
  formData.append("shortDescription", updatedCategory.shortDescription || "");
  formData.append("isActive", updatedCategory.isActive ? "true" : "false");
  if (file) {
    formData.append("image", file);
  }
  
  // Pass the ID correctly
  await dispatch(updateCategory({ 
    id: updatedCategory.id,  // Make sure this exists
    formData 
  }));
  
  setIsEditModalOpen(false);
  setEditingCategory(null);
};

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;
    await dispatch(deleteCategory(deletingCategory.id));
    setIsDeleteModalOpen(false);
    setDeletingCategory(null);
  };

  // Helper functions
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setSortOrder("newest");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Display category icon: image if available, else fallback to icon component
  const getCategoryIcon = (category) => {
    if (category.imageUrl) {
      return (
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-5 h-5 object-contain"
        />
      );
    }
    const IconComponent = iconMap[category.icon] || FolderOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  // Loading state
  if (loading) {
    return <CategoriesLoadingState />;
  }

  // Error state
  if (error) {
    return (
      <CategoriesErrorState error={error} onRetry={() => dispatch(getAdminCategories())} />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Category Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Job Categories
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize job categories available on CareerSphere.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StateCard
          title="Total Categories"
          value={statistics.totalCategories}
          icon={<FolderOpen className="w-6 h-6 text-blue-600" />}
          description="All job categories"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Active Categories"
          value={statistics.activeCategories}
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          description="Currently active"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Total Jobs"
          value={statistics.totalJobs}
          icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
          description="Across all categories"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Categories Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  All Categories
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Showing {filteredCategories.length} categor
                  {filteredCategories.length !== 1 ? "ies" : "y"}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  title="Table view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or short description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700 appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="most-jobs">Most Jobs</option>
                  <option value="least-jobs">Least Jobs</option>
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

        {/* Content */}
        {filteredCategories.length === 0 ? (
          <CategoriesEmptyState
            hasFilters={searchTerm || filterType !== "all"}
            onClear={clearFilters}
            onAdd={() => setIsAddModalOpen(true)}
          />
        ) : (
          <>
            {viewMode === "table" ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Total Jobs
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Created Date
                        </th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredCategories.map((category) => (
                        <tr
                          key={category.id}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                                <div className="text-blue-600">
                                  {getCategoryIcon(category)}
                                </div>
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                  {category.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate max-w-xs">
                                  {category.description || "No description"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                              <Briefcase className="w-3.5 h-3.5" />
                              {category.totalJobs} jobs
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                category.status === "active"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  category.status === "active"
                                    ? "bg-green-500"
                                    : "bg-slate-400"
                                }`}
                              ></span>
                              {category.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-700 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {formatDate(category.createdAt)}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit category"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category)}
                                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete category"
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
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <div className="text-blue-600">
                              {getCategoryIcon(category)}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800">
                              {category.name}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {category.description || "No description"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit category"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                          <Briefcase className="w-3.5 h-3.5" />
                          {category.totalJobs} jobs
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            category.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              category.status === "active"
                                ? "bg-green-500"
                                : "bg-slate-400"
                            }`}
                          ></span>
                          {category.status === "active" ? "Active" : "Inactive"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600">
                          <Calendar className="w-3 h-3" />
                          {formatDate(category.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Grid View */
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200 flex items-center justify-center">
                          <div className="text-blue-600">
                            {getCategoryIcon(category)}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit category"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {category.description || "No description"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          <Briefcase className="w-3 h-3" />
                          {category.totalJobs} jobs
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            category.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              category.status === "active"
                                ? "bg-green-500"
                                : "bg-slate-400"
                            }`}
                          ></span>
                          {category.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Created: {formatDate(category.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <CategoryModal
          mode="add"
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddCategory}
          isSaving={createLoading}
          existingCategories={categories}
        />
      )}

      {isEditModalOpen && editingCategory && (
        <CategoryModal
          mode="edit"
          category={editingCategory}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          isSaving={updateLoading}
          existingCategories={categories}
        />
      )}

      {isDeleteModalOpen && deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingCategory(null);
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

// Loading, Error, Empty State components (unchanged)
const CategoriesLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
      <div className="h-4 bg-slate-200 rounded w-48"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
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

const CategoriesErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Categories
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

const CategoriesEmptyState = ({ hasFilters, onClear, onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <FolderOpen className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching categories" : "No categories yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria to find what you're looking for."
        : "Start by adding your first job category to organize jobs on CareerSphere."}
    </p>
    {hasFilters ? (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    ) : (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
      >
        <Plus className="w-4 h-4" />
        Add New Category
      </button>
    )}
  </div>
);

// Category Modal with Image Upload
const CategoryModal = ({
  mode,
  category,
  onClose,
  onSave,
  isSaving,
  existingCategories,
}) => {
  // Convert backend fields to form state
  const initialFormData = {
    name: category?.name || "",
    shortDescription: category?.description || category?.shortDescription || "",
    isActive: category?.status === "active" ? true : (category?.isActive ?? true),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(category?.imageUrl || null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(category?.imageUrl || null);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(category?.imageUrl || null);
    const fileInput = document.getElementById("category-image-input");
    if (fileInput) fileInput.value = "";
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = "Short description cannot exceed 200 characters";
    }
    const duplicate = existingCategories.find(
      (cat) =>
        cat.name.toLowerCase() === formData.name.toLowerCase() &&
        cat.id !== category?.id
    );
    if (duplicate) {
      newErrors.name = "A category with this name already exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (mode === "edit") {
    await onSave(
      {
        ...formData,
        id: category?.id || category?._id,
      },
      selectedFile
    );
  } else {
    await onSave(formData, selectedFile);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === "add" ? "Add New Category" : "Edit Category"}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {mode === "add"
                ? "Create a new job category"
                : "Update category information"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.name ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              placeholder="e.g., Information Technology"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Short Description *
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData({ ...formData, shortDescription: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.shortDescription ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              rows="3"
              placeholder="Brief description (max 200 characters)"
              maxLength={200}
            />
            <div className="flex justify-between mt-1">
              {errors.shortDescription && (
                <p className="text-xs text-red-600">{errors.shortDescription}</p>
              )}
              <p className="text-xs text-slate-400 text-right">
                {formData.shortDescription.length}/200
              </p>
            </div>
          </div>

          {/* Active Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Active
            </label>
            <select
              value={formData.isActive ? "active" : "inactive"}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.value === "active" })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category Image *
            </label>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Category icon preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <label
                    htmlFor="category-image-input"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </label>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={clearFile}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                <input
                  id="category-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Recommended: 64x64px or square, PNG/JPG/WebP (max 2MB)
                </p>
              </div>
            </div>
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
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving
                ? "Saving..."
                : mode === "add"
                ? "Add Category"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Modal (unchanged)
const DeleteCategoryModal = ({ category, onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete Category?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete "{category.name}"? This action
                cannot be undone.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {category.name}
                </p>
                <p className="text-xs text-slate-500">
                  {category.totalJobs} jobs in this category
                </p>
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
              {isDeleting ? "Deleting..." : "Delete Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCategories;