import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// ASYNC THUNKS
// =====================================================

// Public - Submit Frontend Developer Application
export const submitFrontendApplication = createAsyncThunk(
  "frontendApplications/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/frontend-applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit application"
      );
    }
  }
);

// Admin - Get All Applications with filters & pagination
export const getAllFrontendApplicationsAdmin = createAsyncThunk(
  "frontendApplications/getAllAdmin",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.role) queryParams.append("role", params.role);
      if (params.status) queryParams.append("status", params.status);
      if (params.search) queryParams.append("search", params.search);
      if (params.market) queryParams.append("market", params.market);
      if (params.workMode) queryParams.append("workMode", params.workMode);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.order) queryParams.append("order", params.order);

      const queryString = queryParams.toString();
      const url = queryString
        ? `/frontend-applications?${queryString}`
        : "/frontend-applications";

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch applications"
      );
    }
  }
);

// Admin - Get Single Application by ID
export const getFrontendApplicationByIdAdmin = createAsyncThunk(
  "frontendApplications/getByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/frontend-applications/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch application details"
      );
    }
  }
);

// Admin - Update Application Status
export const updateFrontendApplicationStatusAdmin = createAsyncThunk(
  "frontendApplications/updateStatusAdmin",
  async ({ id, status, adminNotes }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/frontend-applications/${id}/status`,
        { status, adminNotes }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update application status"
      );
    }
  }
);

// Admin - Delete Application
export const deleteFrontendApplicationAdmin = createAsyncThunk(
  "frontendApplications/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/frontend-applications/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete application"
      );
    }
  }
);

// Admin - Get Application Stats
export const getFrontendApplicationStatsAdmin = createAsyncThunk(
  "frontendApplications/getStatsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/frontend-applications/stats");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch application statistics"
      );
    }
  }
);

// =====================================================
// SLICE
// =====================================================

const initialState = {
  applications: [],
  selectedApplication: null,
  stats: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  loading: false,
  submitLoading: false,
  submitSuccess: false,
  submitError: null,
  error: null,
};

const frontendApplicationSlice = createSlice({
  name: "frontendApplications",
  initialState,
  reducers: {
    resetSubmitState: (state) => {
      state.submitLoading = false;
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearSelectedApplication: (state) => {
      state.selectedApplication = null;
    },
    clearFrontendApplicationErrors: (state) => {
      state.error = null;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------------------------------------
      // SUBMIT APPLICATION
      // -------------------------------------------------
      .addCase(submitFrontendApplication.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(submitFrontendApplication.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
        state.submitError = null;
      })
      .addCase(submitFrontendApplication.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitSuccess = false;
        state.submitError = action.payload;
      })

      // -------------------------------------------------
      // GET ALL APPLICATIONS (ADMIN)
      // -------------------------------------------------
      .addCase(getAllFrontendApplicationsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFrontendApplicationsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllFrontendApplicationsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------------------------
      // GET SINGLE APPLICATION (ADMIN)
      // -------------------------------------------------
      .addCase(getFrontendApplicationByIdAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFrontendApplicationByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedApplication = action.payload;
      })
      .addCase(getFrontendApplicationByIdAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------------------------
      // UPDATE STATUS (ADMIN)
      // -------------------------------------------------
      .addCase(updateFrontendApplicationStatusAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFrontendApplicationStatusAdmin.fulfilled,
        (state, action) => {
          state.loading = false;
          const updated = action.payload;
          const index = state.applications.findIndex(
            (app) => app._id === updated._id
          );
          if (index !== -1) {
            state.applications[index] = updated;
          }
          if (
            state.selectedApplication &&
            state.selectedApplication._id === updated._id
          ) {
            state.selectedApplication = updated;
          }
        }
      )
      .addCase(
        updateFrontendApplicationStatusAdmin.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // -------------------------------------------------
      // DELETE APPLICATION (ADMIN)
      // -------------------------------------------------
      .addCase(deleteFrontendApplicationAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFrontendApplicationAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload
        );
        state.pagination.total = Math.max(0, state.pagination.total - 1);
        if (
          state.selectedApplication &&
          state.selectedApplication._id === action.payload
        ) {
          state.selectedApplication = null;
        }
      })
      .addCase(deleteFrontendApplicationAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------------------------
      // GET APPLICATION STATS (ADMIN)
      // -------------------------------------------------
      .addCase(getFrontendApplicationStatsAdmin.pending, (state) => {
        state.error = null;
      })
      .addCase(getFrontendApplicationStatsAdmin.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getFrontendApplicationStatsAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  resetSubmitState,
  clearSelectedApplication,
  clearFrontendApplicationErrors,
} = frontendApplicationSlice.actions;

export default frontendApplicationSlice.reducer;
