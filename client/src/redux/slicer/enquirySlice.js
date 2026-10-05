import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// ASYNC THUNKS
// =====================================================

// Public - Submit contact form enquiry
export const submitEnquiry = createAsyncThunk(
  "enquiries/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/enquiries", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit message. Please try again."
      );
    }
  }
);

// Admin - Get all enquiries with optional filters and pagination
export const getAdminEnquiries = createAsyncThunk(
  "enquiries/getAdminAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append("search", params.search);
      if (params.status) queryParams.append("status", params.status);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      const qs = queryParams.toString();
      const url = qs ? `/admin/enquiries?${qs}` : "/admin/enquiries";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch enquiries"
      );
    }
  }
);

// Admin - Get enquiry stats
export const getEnquiryStats = createAsyncThunk(
  "enquiries/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/enquiries/stats");
      return response.data.stats;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch enquiry stats"
      );
    }
  }
);

// Admin - Update enquiry status ('new' | 'read' | 'replied')
export const updateEnquiryStatus = createAsyncThunk(
  "enquiries/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/enquiries/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update enquiry status"
      );
    }
  }
);

// Admin - Delete enquiry
export const deleteEnquiry = createAsyncThunk(
  "enquiries/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/enquiries/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete enquiry"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // Public
  submitLoading: false,
  submitSuccess: false,
  submitError: null,

  // Admin
  adminEnquiries: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  stats: {
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
  },
  loading: false,
  error: null,
  updatingId: null,
  deletingId: null,
};

// =====================================================
// SLICE
// =====================================================

const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {
    resetSubmitState: (state) => {
      state.submitLoading = false;
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearEnquiryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Submit Enquiry (Public)
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.submitLoading = true;
        state.submitSuccess = false;
        state.submitError = null;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitSuccess = false;
        state.submitError = action.payload;
      });

    // Get Admin Enquiries
    builder
      .addCase(getAdminEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.adminEnquiries = action.payload.data || [];
        state.total = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getAdminEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Enquiry Stats
    builder
      .addCase(getEnquiryStats.fulfilled, (state, action) => {
        state.stats = action.payload || state.stats;
      });

    // Update Status
    builder
      .addCase(updateEnquiryStatus.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
        state.updatingId = null;
        const updated = action.payload.data;
        if (updated) {
          state.adminEnquiries = state.adminEnquiries.map((item) =>
            item._id === updated._id ? { ...item, status: updated.status } : item
          );
        }
      })
      .addCase(updateEnquiryStatus.rejected, (state) => {
        state.updatingId = null;
      });

    // Delete Enquiry
    builder
      .addCase(deleteEnquiry.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.deletingId = null;
        state.adminEnquiries = state.adminEnquiries.filter(
          (item) => item._id !== action.payload.id
        );
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteEnquiry.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export const { resetSubmitState, clearEnquiryError } = enquirySlice.actions;
export default enquirySlice.reducer;
