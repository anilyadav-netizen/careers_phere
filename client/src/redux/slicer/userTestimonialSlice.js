import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// GET TESTIMONIALS
// =====================================================

export const getTestimonials = createAsyncThunk(
  "testimonials/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/testimonials");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch testimonials",
      );
    }
  },
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  usertestimonial: [],
  loading: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const userTestimonialSlice = createSlice({
  name: "testimonials",

  initialState,

  reducers: {
    clearTestimonialsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ============================
      // PENDING
      // ============================

      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ============================
      // FULFILLED
      // ============================

      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // IMPORTANT:
        // API response:
        // {
        //   success: true,
        //   count: 6,
        //   data: [...]
        // }
        //
        // UI ko sirf [...] chahiye

        state.testimonials = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
      })

      // ============================
      // REJECTED
      // ============================

      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to fetch testimonials";

        state.testimonials = [];

        console.error(
          "🔴 Testimonials rejected:",
          action.payload || action.error,
        );
      });
  },
});

export const { clearTestimonialsError } = userTestimonialSlice.actions;

export default userTestimonialSlice.reducer;
