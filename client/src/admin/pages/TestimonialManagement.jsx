import {
  Eye,
  EyeOff,
  ImageOff,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTestimonialStatus,
  createTestimonial,
  deleteTestimonial,
  getAllTestimonialsAdmin,
  toggleTestimonialActive,
  updateTestimonial,
} from "../../redux/slicer/testimonialSlice";

const emptyForm = {
  name: "",
  country: "",
  review: "",
  rating: 5,
  order: 0,
  isActive: true,
};

const TestimonialManagement = () => {
  const dispatch = useDispatch();
  const {
    testimonials,
    loading,
    actionLoading,
    error,
    success,
    successMessage,
  } = useSelector((state) => state.testimonials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    dispatch(getAllTestimonialsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(clearTestimonialStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingId(testimonial._id);
    setForm({
      name: testimonial.name || "",
      country: testimonial.country || "",
      review: testimonial.review || "",
      rating: testimonial.rating || 5,
      order: testimonial.order || 0,
      isActive: testimonial.isActive,
    });
    setImageFile(null);
    setImagePreview(testimonial.image?.thumb || testimonial.image?.url || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("country", form.country);
    formData.append("review", form.review);
    formData.append("rating", form.rating);
    formData.append("order", form.order);
    formData.append("isActive", form.isActive);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    let result;
    if (editingId) {
      result = await dispatch(updateTestimonial({ id: editingId, formData }));
    } else {
      result = await dispatch(createTestimonial(formData));
    }

    if (!result.error) {
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTestimonial(id));
    setDeleteConfirmId(null);
  };

  const handleToggleActive = (id) => {
    dispatch(toggleTestimonialActive(id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Testimonials
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage user reviews shown on the site
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>

        {/* Success / Error banners */}
        {success && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* List */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-indigo-600" size={28} />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">
              No testimonials yet. Add your first one.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {testimonials.map((t) => (
                <div
                  key={t._id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    {t.image?.thumb || t.image?.url ? (
                      <img
                        src={t.image.thumb || t.image.url}
                        alt={t.name}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <ImageOff size={20} />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            t.isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {t.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500">{t.country}</p>

                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={
                              i < t.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>

                      <p className="mt-2 max-w-md text-sm text-slate-600 line-clamp-2">
                        {t.review}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => handleToggleActive(t._id)}
                      title={t.isActive ? "Hide" : "Show"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    >
                      {t.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <button
                      onClick={() => openEditModal(t)}
                      title="Edit"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(t._id)}
                      title="Delete"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  User Image
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <ImageOff size={20} />
                    </div>
                  )}

                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <Upload size={15} />
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  placeholder="e.g. Rohit Sharma"
                />
              </div>

              {/* Country */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  placeholder="e.g. India"
                />
              </div>

              {/* Review */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  placeholder="Write the review text..."
                />
              </div>

              {/* Rating + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Rating
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Active toggle */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  Show on site (active)
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={actionLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : editingId ? (
                  "Save Changes"
                ) : (
                  "Create Testimonial"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              Delete this testimonial?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {actionLoading ? (
                  <Loader2 className="mx-auto animate-spin" size={16} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;
