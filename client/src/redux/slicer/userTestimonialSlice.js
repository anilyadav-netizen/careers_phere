import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// GET TESTIMONIALS
// =====================================================

export const getTestimonials = createAsyncThunk(
  "testimonials/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔵 Fetching testimonials...");

      const response = await api.get("/testimonials");

      console.log("🟢 Full Axios Response:", response);
      console.log("🟢 Response Data:", response.data);
      console.log("🟢 Testimonials Array:", response.data?.data);

      return response.data;
    } catch (error) {
      console.error("🔴 Get Testimonials Error:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch testimonials"
      );
    }
  }
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

        console.log("🟡 Testimonials loading...");
      })

      // ============================
      // FULFILLED
      // ============================

      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        console.log("🟢 Testimonials fulfilled:");
        console.log("🟢 Payload:", action.payload);
        console.log("🟢 Array:", action.payload?.data);

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

        console.log(
          "🟢 Redux testimonials stored:",
          state.testimonials
        );
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
          action.payload || action.error
        );
      });
  },
});

export const { clearTestimonialsError } =
  userTestimonialSlice.actions;

export default userTestimonialSlice.reducer;