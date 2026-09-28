// src/admin/pages/Gallery.jsx
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Building2,
  Briefcase,
  Users,
  GraduationCap,
  Eye,
  ArrowLeft,
} from "lucide-react";
import StateCard from "../components/StateCard";
import {
  getAllGalleryAdmin,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  toggleGalleryStatus,
  toggleGalleryFeatured,
  getGalleryStats,
  clearGalleryMessages,
} from "../../redux/slicer/gallerySlice";

const Gallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const galleryItems = useSelector((state) => state.gallery?.adminGallery || []);
  const loading = useSelector((state) => state.gallery?.loading || false);
  const error = useSelector((state) => state.gallery?.error || null);
  const createLoading = useSelector((state) => state.gallery?.createLoading || false);
  const updateLoading = useSelector((state) => state.gallery?.updateLoading || false);
  const deleteLoading = useSelector((state) => state.gallery?.deleteLoading || false);
  const successMessage = useSelector((state) => state.gallery?.successMessage || null);
  const stats = useSelector((state) => state.gallery?.adminGalleryStats || null);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch gallery items and stats
  const fetchGalleryItems = useCallback(async () => {
    try {
      await dispatch(getAllGalleryAdmin()).unwrap();
      await dispatch(getGalleryStats()).unwrap();
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Show success notification
  useEffect(() => {
    if (successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearGalleryMessages());
      fetchGalleryItems(); // Refresh the list
    }
  }, [successMessage, dispatch, fetchGalleryItems]);

  // Show error notification
  useEffect(() => {
    if (error) {
      showNotification(error, "error");
      dispatch(clearGalleryMessages());
    }
  }, [error, dispatch]);

  // Calculate statistics from API data
  const statistics = useMemo(() => {
    if (stats) {
      return {
        totalImages: stats.totalImages || 0,
        workplaceImages: stats.categoryStats?.find(c => c._id === 'Workplace')?.count || 0,
        careerImages: stats.categoryStats?.find(c => c._id === 'Career')?.count || 0,
        professionalsImages: stats.categoryStats?.find(c => c._id === 'Professionals')?.count || 0,
        learningImages: stats.categoryStats?.find(c => c._id === 'Learning')?.count || 0,
      };
    }
    // Fallback calculation from items
    const totalImages = galleryItems.length;
    const workplaceImages = galleryItems.filter(
      (item) => item.category === "Workplace",
    ).length;
    const careerImages = galleryItems.filter(
      (item) => item.category === "Career",
    ).length;
    const professionalsImages = galleryItems.filter(
      (item) => item.category === "Professionals",
    ).length;
    const learningImages = galleryItems.filter(
      (item) => item.category === "Learning",
    ).length;

    return {
      totalImages,
      workplaceImages,
      careerImages,
      professionalsImages,
      learningImages,
    };
  }, [galleryItems, stats]);

  // Filter gallery items
  const filteredGalleryItems = useMemo(() => {
    let result = [...galleryItems];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.heading?.toLowerCase().includes(searchLower) ||
          item.category?.toLowerCase().includes(searchLower) ||
          (item.subHeading &&
            item.subHeading.toLowerCase().includes(searchLower)),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Sort by createdAt (newest first)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [galleryItems, searchTerm, categoryFilter]);

  // Handle add gallery item
  const handleAddGalleryItem = async (formData) => {
    try {
      await dispatch(createGalleryImage(formData)).unwrap();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to create gallery image:", err);
    }
  };

  // Handle edit gallery item
  const handleEditGalleryItem = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  // Handle save edited gallery item
  const handleSaveGalleryItem = async (formData) => {
    try {
      const id = editingItem?._id || editingItem?.id;
      await dispatch(updateGalleryImage({ id, formData })).unwrap();
      setIsEditModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to update gallery image:", err);
    }
  };

  // Handle delete gallery item
  const handleDeleteGalleryItem = (item) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const id = deletingItem?._id || deletingItem?.id;
      await dispatch(deleteGalleryImage(id)).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error("Failed to delete gallery image:", err);
    }
  };

  // Toggle status
  const handleToggleStatus = async (item) => {
    try {
      const id = item?._id || item?.id;
      await dispatch(toggleGalleryStatus(id)).unwrap();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  // Toggle featured
  const handleToggleFeatured = async (item) => {
    try {
      const id = item?._id || item?.id;
      await dispatch(toggleGalleryFeatured(id)).unwrap();
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
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

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Workplace":
        return <Building2 className="w-4 h-4" />;
      case "Career":
        return <Briefcase className="w-4 h-4" />;
      case "Professionals":
        return <Users className="w-4 h-4" />;
      case "Learning":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Workplace":
        return "bg-blue-50 text-blue-700";
      case "Career":
        return "bg-indigo-50 text-indigo-700";
      case "Professionals":
        return "bg-purple-50 text-purple-700";
      case "Learning":
        return "bg-green-50 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Loading state
  if (loading && galleryItems.length === 0) {
    return <GalleryLoadingState />;
  }

  // Error state
  if (error && galleryItems.length === 0) {
    return <GalleryErrorState error={error} onRetry={fetchGalleryItems} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Gallery Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Gallery Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize your gallery images
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StateCard
          title="Total Images"
          value={statistics.totalImages}
          icon={<ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          description="All gallery images"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Workplace"
          value={statistics.workplaceImages}
          icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
          description="Workplace images"
          iconBg="bg-indigo-50"
        />
        <StateCard
          title="Career"
          value={statistics.careerImages}
          icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
          description="Career images"
          iconBg="bg-purple-50"
        />
        <StateCard
          title="Professionals"
          value={statistics.professionalsImages}
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
          description="Professional images"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Learning"
          value={statistics.learningImages}
          icon={
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          }
          description="Learning images"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Gallery Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Gallery Images
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredGalleryItems.length} image
                {filteredGalleryItems.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by heading or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All Categories</option>
                <option value="Workplace">Workplace</option>
                <option value="Career">Career</option>
                <option value="Professionals">Professionals</option>
                <option value="Learning">Learning</option>
              </select>

              {(searchTerm || categoryFilter !== "all") && (
                <button
                  onClick={clearFilters}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center"
                  title="Clear filters"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGalleryItems.length === 0 ? (
          <GalleryEmptyState
            hasFilters={searchTerm || categoryFilter !== "all"}
            onClear={clearFilters}
            onAdd={() => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredGalleryItems.map((item) => {
                // Get image URL from the nested image object
                const imageUrl = item.image?.displayUrl || item.image?.url || item.image;
                return (
                  <div
                    key={item._id || item.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group relative"
                  >
                    {/* Status Badge */}
                    {!item.isActive && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Inactive
                        </span>
                      </div>
                    )}
                    {item.isFeatured && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Image Preview */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.heading || item.altText || "Gallery image"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `
                              <div class="flex items-center justify-center h-full">
                                <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                            item.category,
                          )}`}
                        >
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Actions Overlay */}
                      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`p-2 rounded-lg shadow-sm transition-colors ${
                            item.isActive
                              ? "bg-white/90 text-green-600 hover:bg-green-50"
                              : "bg-white/90 text-red-600 hover:bg-red-50"
                          }`}
                          title={item.isActive ? "Deactivate" : "Activate"}
                        >
                          {item.isActive ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditGalleryItem(item)}
                          className="p-2 rounded-lg bg-white/90 text-slate-600 hover:text-blue-600 hover:bg-white transition-colors shadow-sm"
                          title="Edit image"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item)}
                          className="p-2 rounded-lg bg-white/90 text-slate-600 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
                          title="Delete image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-800 mb-1 truncate">
                        {item.heading}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {item.subHeading}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                          Added: {formatDate(item.createdAt)}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1">
                            {item.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                #{tag}
                              </span>
                            ))}
                            {item.tags.length > 2 && (
                              <span className="text-xs text-slate-400">
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <GalleryFormModal
          mode="add"
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddGalleryItem}
          isLoading={createLoading}
        />
      )}

      {/* Edit Image Modal */}
      {isEditModalOpen && editingItem && (
        <GalleryFormModal
          mode="edit"
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveGalleryItem}
          isLoading={updateLoading}
        />
      )}

      {/* Delete Image Modal */}
      {isDeleteModalOpen && deletingItem && (
        <DeleteGalleryModal
          item={deletingItem}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
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

// Gallery Form Modal Component
const GalleryFormModal = ({ mode, item, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    heading: item?.heading || "",
    subHeading: item?.subHeading || "",
    category: item?.category || "Workplace",
    altText: item?.altText || "",
    tags: item?.tags || [],
    isFeatured: item?.isFeatured || false,
    isActive: item?.isActive !== undefined ? item.isActive : true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    item?.image?.displayUrl || item?.image?.url || item?.image || null
  );
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.heading.trim()) newErrors.heading = "Heading is required";
    if (!formData.subHeading.trim())
      newErrors.subHeading = "SubHeading is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (mode === "add" && !imageFile) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        submitData.append(key, JSON.stringify(formData[key]));
      } else if (key === "isFeatured" || key === "isActive") {
        submitData.append(key, String(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    // Append image file
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    await onSave(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === "add" ? "Add Gallery Image" : "Edit Gallery Image"}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {mode === "add"
                ? "Upload a new gallery image"
                : "Update gallery image details"}
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
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Image {mode === "add" && "*"}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                errors.image
                  ? "border-red-300"
                  : "border-slate-200 hover:border-blue-400"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-600 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {errors.image && (
              <p className="text-xs text-red-600 mt-1">{errors.image}</p>
            )}
          </div>

          {/* Heading */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Heading *
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.heading ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              placeholder="e.g., Building Better Careers"
            />
            {errors.heading && (
              <p className="text-xs text-red-600 mt-1">{errors.heading}</p>
            )}
          </div>

          {/* SubHeading */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              SubHeading *
            </label>
            <textarea
              value={formData.subHeading}
              onChange={(e) =>
                setFormData({ ...formData, subHeading: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.subHeading ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              rows="2"
              placeholder="e.g., Helping professionals grow and achieve their career goals"
            />
            {errors.subHeading && (
              <p className="text-xs text-red-600 mt-1">{errors.subHeading}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.category ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            >
              <option value="Workplace">Workplace</option>
              <option value="Career">Career</option>
              <option value="Professionals">Professionals</option>
              <option value="Learning">Learning</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={formData.altText}
              onChange={(e) =>
                setFormData({ ...formData, altText: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="Alternative text for accessibility"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                placeholder="Type a tag and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status Toggles */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="rounded border-slate-300 text-yellow-600 focus:ring-yellow-500"
              />
              Featured
            </label>
          </div>

          {/* Form Actions */}
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
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Image"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Gallery Modal Component
const DeleteGalleryModal = ({ item, onClose, onConfirm, isDeleting }) => {
  const imageUrl = item?.image?.displayUrl || item?.image?.url || item?.image;

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
                Delete Image?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete this image? This action cannot
                be undone.
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
              {imageUrl ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={imageUrl}
                    alt={item?.heading || "Gallery image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {item?.heading}
                </p>
                <p className="text-xs text-slate-500">{item?.category}</p>
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
              {isDeleting ? "Deleting..." : "Delete Image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const GalleryLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="h-4 bg-slate-200 rounded w-20 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-12"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-slate-100 rounded-xl h-48"></div>
        ))}
      </div>
    </div>
  </div>
);

// Error State Component
const GalleryErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Gallery
      </h3>
      <p className="text-sm text-slate-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State Component
const GalleryEmptyState = ({ hasFilters, onClear, onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <ImageIcon className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No images found" : "No images yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria."
        : "Start by adding your first gallery image."}
    </p>
    {hasFilters ? (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl"
      >
        Clear all filters
      </button>
    ) : (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg"
      >
        <Plus className="w-4 h-4" />
        Add Image
      </button>
    )}
  </div>
);

export default Gallery;