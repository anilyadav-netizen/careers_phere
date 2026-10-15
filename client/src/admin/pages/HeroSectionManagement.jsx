import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  Image as ImageIcon,
  Save,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  ArrowRight,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit3,
  MapPin,
  ExternalLink,
  Layers,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import {
  fetchAdminBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  toggleHeroBannerStatus,
  reorderHeroBanners,
  clearHeroStatus,
} from "../../redux/slicer/heroSlice";

const DEFAULT_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85";

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "Global Opportunities",
  badgeText: "Global Career Opportunity",
  highlightTag: "Company Sponsored",
  primaryButtonText: "Explore Jobs",
  primaryButtonUrl: "/jobs",
  secondaryButtonText: "Learn More",
  secondaryButtonUrl: "/about",
  order: 1,
  isActive: true,
  imageUrl: "",
};

const HeroSectionManagement = () => {
  const dispatch = useDispatch();
  const { adminBanners, stats, adminLoading, saving, error, updateSuccess, updateMessage } =
    useSelector((state) => state.hero);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null); // null = Add mode
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [previewCandidate, setPreviewCandidate] = useState(null);

  // Form state
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [formValidationErrors, setFormValidationErrors] = useState({});

  // Active tab inside modal: "form" or "preview"
  const [modalTab, setModalTab] = useState("form");

  // Load banners on mount
  useEffect(() => {
    dispatch(fetchAdminBanners());
  }, [dispatch]);

  // Auto-clear notification messages
  useEffect(() => {
    if (updateSuccess || error) {
      const timer = setTimeout(() => {
        dispatch(clearHeroStatus());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, error, dispatch]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingBannerId(null);
    const highestOrder =
      adminBanners.length > 0
        ? Math.max(...adminBanners.map((b) => b.order || 0)) + 1
        : 1;

    setFormData({
      ...EMPTY_FORM,
      order: highestOrder,
    });
    setSelectedFile(null);
    setFilePreview("");
    setFormValidationErrors({});
    setModalTab("form");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (banner) => {
    setEditingBannerId(banner._id);
    setFormData({
      title: banner.title || "",
      description: banner.description || "",
      location: banner.location || "Global Opportunities",
      badgeText: banner.badgeText || "Global Career Opportunity",
      highlightTag: banner.highlightTag || "Company Sponsored",
      primaryButtonText: banner.primaryButtonText || "Explore Jobs",
      primaryButtonUrl: banner.primaryButtonUrl || "/jobs",
      secondaryButtonText: banner.secondaryButtonText || "Learn More",
      secondaryButtonUrl: banner.secondaryButtonUrl || "/about",
      order: banner.order || 1,
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      imageUrl: banner.image?.displayUrl || banner.image?.url || "",
    });
    setSelectedFile(null);
    setFilePreview(banner.image?.displayUrl || banner.image?.url || "");
    setFormValidationErrors({});
    setModalTab("form");
    setIsModalOpen(true);
  };

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Main heading / title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Subheading / description is required";
    }
    setFormValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Add or Edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataPayload = new FormData();
    dataPayload.append("title", formData.title);
    dataPayload.append("description", formData.description);
    dataPayload.append("location", formData.location);
    dataPayload.append("badgeText", formData.badgeText);
    dataPayload.append("highlightTag", formData.highlightTag);
    dataPayload.append("primaryButtonText", formData.primaryButtonText);
    dataPayload.append("primaryButtonUrl", formData.primaryButtonUrl);
    dataPayload.append("secondaryButtonText", formData.secondaryButtonText);
    dataPayload.append("secondaryButtonUrl", formData.secondaryButtonUrl);
    dataPayload.append("order", formData.order);
    dataPayload.append("isActive", formData.isActive);

    if (selectedFile) {
      dataPayload.append("image", selectedFile);
    } else if (formData.imageUrl) {
      dataPayload.append("imageUrl", formData.imageUrl.trim());
    }

    if (editingBannerId) {
      const result = await dispatch(
        updateHeroBanner({ id: editingBannerId, data: dataPayload })
      );
      if (!result.error) {
        setIsModalOpen(false);
      }
    } else {
      const result = await dispatch(createHeroBanner(dataPayload));
      if (!result.error) {
        setIsModalOpen(false);
      }
    }
  };

  // Toggle active/inactive
  const handleToggleStatus = (id) => {
    dispatch(toggleHeroBannerStatus(id));
  };

  // Delete confirmation
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    await dispatch(deleteHeroBanner(deleteCandidate._id));
    setDeleteCandidate(null);
  };

  // Move banner Up
  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const reordered = [...adminBanners];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;

    const orders = reordered.map((b, idx) => ({
      id: b._id,
      order: idx + 1,
    }));
    await dispatch(reorderHeroBanners(orders));
  };

  // Move banner Down
  const handleMoveDown = async (index) => {
    if (index === adminBanners.length - 1) return;
    const reordered = [...adminBanners];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;

    const orders = reordered.map((b, idx) => ({
      id: b._id,
      order: idx + 1,
    }));
    await dispatch(reorderHeroBanners(orders));
  };

  // Sorted banners copy
  const sortedBanners = [...adminBanners].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-28">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Homepage CMS • Multi-Banner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hero Section Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Manage up to 4–6 dynamic hero banners rotating on the homepage. Edit headings, images, CTA buttons, reorder slides, or toggle their visibility in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => dispatch(fetchAdminBanners())}
            disabled={adminLoading || saving}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${adminLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Banner</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          ALERTS
      ========================================================= */}
      {updateSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">
            {updateMessage || "Hero banner updated successfully!"}
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* =========================================================
          STATS OVERVIEW
      ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Banners
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.total}
            </span>
            <span className="text-xs text-slate-400">
              (Target: 4–6 slides)
            </span>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active on Site
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Check className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {stats.active}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              Live in rotation
            </span>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Inactive / Draft
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-500">
              <X className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-700">
              {stats.inactive}
            </span>
            <span className="text-xs text-slate-400">Hidden from visitors</span>
          </div>
        </div>

        {/* Rotation */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Auto-Transition
            </span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
              5s
            </span>
            <span className="text-xs text-slate-400">Pause on hover</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          BANNER LIST
      ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active & Configured Hero Banners
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag or use the up/down arrows to adjust slide order. Banners appear on the homepage in this exact sequence.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {sortedBanners.length} banner{sortedBanners.length !== 1 ? "s" : ""}
          </span>
        </div>

        {adminLoading && sortedBanners.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="text-sm">Loading hero banners...</p>
          </div>
        ) : sortedBanners.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                No hero banners found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Add 4–6 hero banners to make your homepage dynamic, engaging, and fully admin-controlled.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Banner</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedBanners.map((banner, index) => {
              const bannerImg =
                banner.image?.displayUrl ||
                banner.image?.url ||
                DEFAULT_BANNER_IMAGE;

              return (
                <div
                  key={banner._id}
                  className={`p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition hover:bg-slate-50/70 ${
                    !banner.isActive ? "bg-slate-50/40 opacity-75" : ""
                  }`}
                >
                  {/* Left: Reorder buttons & Thumbnail */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
                    {/* Order Controls */}
                    <div className="flex flex-col items-center justify-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0 || saving}
                        title="Move Up"
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-black text-slate-700 font-mono">
                        #{banner.order || index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === sortedBanners.length - 1 || saving}
                        title="Move Down"
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-24 sm:w-32 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 group">
                      <img
                        src={bannerImg}
                        alt={banner.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!banner.isActive && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-rose-600/90 px-1.5 py-0.5 rounded">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Banner Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>{banner.location || "Global"}</span>
                        </span>
                        {banner.highlightTag && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                            {banner.highlightTag}
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            banner.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              banner.isActive ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {banner.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {banner.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {banner.description}
                      </p>

                      {/* CTA Links Preview */}
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span>
                          CTA 1:{" "}
                          <strong className="text-slate-600">
                            {banner.primaryButtonText || "Explore"}
                          </strong>{" "}
                          ({banner.primaryButtonUrl || "/jobs"})
                        </span>
                        {banner.secondaryButtonText && (
                          <span>
                            • CTA 2:{" "}
                            <strong className="text-slate-600">
                              {banner.secondaryButtonText}
                            </strong>{" "}
                            ({banner.secondaryButtonUrl || "/about"})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center shrink-0 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-100">
                    {/* Toggle Active Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(banner._id)}
                      disabled={saving}
                      title={banner.isActive ? "Deactivate banner" : "Activate banner"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        banner.isActive
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          banner.isActive ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                      <span>{banner.isActive ? "Visible" : "Hidden"}</span>
                    </button>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => setPreviewCandidate(banner)}
                      title="Preview how this banner renders"
                      className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(banner)}
                      title="Edit banner content"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setDeleteCandidate(banner)}
                      title="Delete banner"
                      className="p-2 rounded-xl border border-rose-200 bg-rose-50/40 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          ADD / EDIT BANNER MODAL
      ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {editingBannerId ? "Update Slide" : "Create New Slide"}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {editingBannerId ? "Edit Hero Banner" : "Add New Hero Banner"}
                </h2>
              </div>

              {/* Tabs: Edit / Live Preview */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setModalTab("form")}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      modalTab === "form"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Form Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("preview")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                      modalTab === "preview"
                        ? "bg-white text-blue-600 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {modalTab === "form" ? (
              <form onSubmit={handleFormSubmit} className="p-5 sm:p-7 space-y-5">
                {/* Heading / Title */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">
                    Banner Title / Heading <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Build Your Global Career in America with Visa & Travel Support"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition ${
                      formValidationErrors.title
                        ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {formValidationErrors.title && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formValidationErrors.title}
                    </p>
                  )}
                </div>

                {/* Subheading / Description */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">
                    Subheading / Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Provide a compelling description of the opportunities..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 outline-none transition ${
                      formValidationErrors.description
                        ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {formValidationErrors.description && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formValidationErrors.description}
                    </p>
                  )}
                </div>

                {/* Badges & Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g. New York, USA"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  {/* Highlight Tag */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highlight Tag
                    </label>
                    <input
                      type="text"
                      value={formData.highlightTag}
                      onChange={(e) =>
                        setFormData({ ...formData, highlightTag: e.target.value })
                      }
                      placeholder="e.g. Company Sponsored"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  {/* Top Badge Text */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sparkle Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText}
                      onChange={(e) =>
                        setFormData({ ...formData, badgeText: e.target.value })
                      }
                      placeholder="e.g. Global Career Opportunity"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* CTA Buttons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  {/* Primary CTA */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Primary Button (Main CTA)
                    </span>
                    <input
                      type="text"
                      value={formData.primaryButtonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryButtonText: e.target.value,
                        })
                      }
                      placeholder="Button Text (e.g. Explore Jobs)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                    <input
                      type="text"
                      value={formData.primaryButtonUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryButtonUrl: e.target.value,
                        })
                      }
                      placeholder="Destination URL (e.g. /jobs)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  {/* Secondary CTA */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Secondary Button (Optional)
                    </span>
                    <input
                      type="text"
                      value={formData.secondaryButtonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondaryButtonText: e.target.value,
                        })
                      }
                      placeholder="Button Text (e.g. Learn More)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                    <input
                      type="text"
                      value={formData.secondaryButtonUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondaryButtonUrl: e.target.value,
                        })
                      }
                      placeholder="Destination URL (e.g. /about)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Image Section */}
                <div className="pt-2">
                  <label className="block text-sm font-bold text-slate-800 mb-1">
                    Banner Background Image
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Upload a high-quality landscape image (1920x1080 recommended) or enter a direct image URL.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                    <div className="w-28 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 flex items-center justify-center">
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Banner upload preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{filePreview ? "Change Image" : "Upload Image"}</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/jpg"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>

                        {filePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setFilePreview("");
                              setFormData({ ...formData, imageUrl: "" });
                            }}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      {/* Direct URL Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={formData.imageUrl}
                          onChange={(e) => {
                            setFormData({ ...formData, imageUrl: e.target.value });
                            setFilePreview(e.target.value);
                            setSelectedFile(null);
                          }}
                          placeholder="Or paste direct image URL (https://...)"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order & Active Switch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Display Order #
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: Number(e.target.value) || 1,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 self-end">
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Banner Visibility
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Show on homepage slider
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, isActive: !formData.isActive })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        formData.isActive ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>
                          {editingBannerId ? "Save Changes" : "Create Banner"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Live Preview inside Modal */
              <div className="p-5 sm:p-7 space-y-4">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    This preview accurately simulates how this slide appears on the live homepage hero section.
                  </span>
                </div>

                <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[380px] p-6 sm:p-8 flex items-center">
                  <img
                    src={filePreview || formData.imageUrl || DEFAULT_BANNER_IMAGE}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

                  <div className="relative z-10 max-w-xl space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        <MapPin size={12} className="text-[#30AFFF]" />
                        {formData.location || "Global Opportunities"}
                      </span>
                      {formData.highlightTag && (
                        <span className="rounded-full border border-[#A0E9FF]/30 bg-[#A0E9FF]/10 px-3 py-1 text-xs font-semibold text-[#A0E9FF]">
                          {formData.highlightTag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30AFFF]">
                      <Sparkles size={13} />
                      <span>{formData.badgeText || "Global Career Opportunity"}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      {formData.title || "Banner Title Preview"}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {formData.description ||
                        "Subheading text explaining international job opportunities..."}
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#30AFFF] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#30AFFF]/30"
                      >
                        <span>{formData.primaryButtonText || "Explore Jobs"}</span>
                        <ArrowRight size={14} />
                      </button>

                      {formData.secondaryButtonText && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-xl border border-[#A0E9FF]/40 bg-[#A0E9FF]/10 px-4 py-2.5 text-xs font-bold text-white"
                        >
                          <span>{formData.secondaryButtonText}</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setModalTab("form")}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Back to Form Editing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          STANDALONE PREVIEW MODAL
      ========================================================= */}
      {previewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Eye className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Live Simulation: #{previewCandidate.order} {previewCandidate.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCandidate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[420px] p-6 sm:p-10 flex items-center">
                <img
                  src={
                    previewCandidate.image?.displayUrl ||
                    previewCandidate.image?.url ||
                    DEFAULT_BANNER_IMAGE
                  }
                  alt={previewCandidate.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

                <div className="relative z-10 max-w-xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                      <MapPin size={13} className="text-[#30AFFF]" />
                      {previewCandidate.location || "Global Opportunities"}
                    </span>
                    {previewCandidate.highlightTag && (
                      <span className="rounded-full border border-[#A0E9FF]/30 bg-[#A0E9FF]/10 px-3 py-1.5 text-xs font-semibold text-[#A0E9FF]">
                        {previewCandidate.highlightTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30AFFF]">
                    <Sparkles size={14} />
                    <span>
                      {previewCandidate.badgeText || "Global Career Opportunity"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {previewCandidate.title}
                  </h1>

                  <p className="text-sm text-slate-200 leading-relaxed">
                    {previewCandidate.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#30AFFF] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-[#30AFFF]/30"
                    >
                      <span>
                        {previewCandidate.primaryButtonText || "Explore Jobs"}
                      </span>
                      <ArrowRight size={15} />
                    </button>

                    {previewCandidate.secondaryButtonText && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#A0E9FF]/40 bg-[#A0E9FF]/10 px-5 py-3 text-xs font-bold text-white"
                      >
                        <span>{previewCandidate.secondaryButtonText}</span>
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION MODAL
      ========================================================= */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Delete Hero Banner?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete banner{" "}
                <span className="font-semibold text-slate-800">
                  "{deleteCandidate.title}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md shadow-rose-500/20 transition cursor-pointer"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSectionManagement;
