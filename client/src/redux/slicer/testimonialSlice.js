import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// THUNKS (Admin)
// =====================================================

export const getAllTestimonialsAdmin = createAsyncThunk(
  "testimonials/getAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/testimonials");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch testimonials",
      );
    }
  },
);

export const getTestimonialByIdAdmin = createAsyncThunk(
  "testimonials/getByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/testimonials/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch testimonial",
      );
    }
  },
);

export const createTestimonial = createAsyncThunk(
  "testimonials/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/testimonials", formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create testimonial",
      );
    }
  },
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/testimonials/${id}`, formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update testimonial",
      );
    }
  },
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/testimonials/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete testimonial",
      );
    }
  },
);

export const toggleTestimonialActive = createAsyncThunk(
  "testimonials/toggleActive",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admin/testimonials/${id}/toggle-active`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle status",
      );
    }
  },
);

// =====================================================
// SLICE
// =====================================================

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    selectedTestimonial: null,
    loading: false, // for GET (list/detail)
    actionLoading: false, // for create/update/delete/toggle
    error: null,
    success: false,
    successMessage: "",
  },
  reducers: {
    clearTestimonialStatus: (state) => {
      state.error = null;
      state.success = false;
      state.successMessage = "";
    },
    clearSelectedTestimonial: (state) => {
      state.selectedTestimonial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------- GET ALL ----------------
      .addCase(getAllTestimonialsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTestimonialsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload || [];
      })
      .addCase(getAllTestimonialsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- GET BY ID ----------------
      .addCase(getTestimonialByIdAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTestimonial = action.payload;
      })
      .addCase(getTestimonialByIdAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- CREATE ----------------
      .addCase(createTestimonial.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = true;
        state.successMessage = "Testimonial created successfully";
        state.testimonials.unshift(action.payload);
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE ----------------
      .addCase(updateTestimonial.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = true;
        state.successMessage = "Testimonial updated successfully";
        const index = state.testimonials.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ---------------- DELETE ----------------
      .addCase(deleteTestimonial.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = true;
        state.successMessage = "Testimonial deleted successfully";
        state.testimonials = state.testimonials.filter(
          (t) => t._id !== action.payload,
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ---------------- TOGGLE ACTIVE ----------------
      .addCase(toggleTestimonialActive.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(toggleTestimonialActive.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.testimonials.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(toggleTestimonialActive.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTestimonialStatus, clearSelectedTestimonial } =
  testimonialSlice.actions;

export default testimonialSlice.reducer;
