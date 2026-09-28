import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


// ============================================================
// APPLY TO JOB - USER
// POST /api/jobs/:id/apply
// ============================================================

export const applyToJob = createAsyncThunk(
  "application/applyToJob",
  async ({ jobId, ...applicationData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/jobs/${jobId}/apply`,
        applicationData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to apply for job"
      );
    }
  }
);
// ============================================================
// GET MY APPLICATIONS - USER
// GET /api/jobs/applications/my
// ============================================================

export const getMyApplications = createAsyncThunk(
  "application/getMyApplications",
  async (status = "", { rejectWithValue }) => {
    try {
      const url = status
        ? `/jobs/applications/my?status=${status}`
        : `/jobs/applications/my`;

      const response = await api.get(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch applications",
      );
    }
  },
);

// ============================================================
// GET JOB APPLICATIONS - ADMIN
// GET /api/admin/jobs/:id/applications
// ============================================================

export const getJobApplicationsAdmin = createAsyncThunk(
  "application/getJobApplicationsAdmin",
  async ({ jobId, status = "" }, { rejectWithValue }) => {
    try {
      const url = status
        ? `/admin/jobs/${jobId}/applications?status=${status}`
        : `/admin/jobs/${jobId}/applications`;

      const response = await api.get(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch job applications",
      );
    }
  },
);

// ============================================================
// GET ALL APPLICATIONS - ADMIN
// GET /api/admin/applications
// ============================================================

export const getAllApplicationsAdmin = createAsyncThunk(
  "application/getAllApplicationsAdmin",
  async ({ status = "", job = "" } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (status) {
        params.append("status", status);
      }

      if (job) {
        params.append("job", job);
      }

      const query = params.toString();

      const response = await api.get(
        query ? `/admin/applications?${query}` : `/admin/applications`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch applications",
      );
    }
  },
);

// ============================================================
// GET ONE APPLICATION - ADMIN
// GET /api/admin/applications/:id
// ============================================================
export const getApplicationByIdAdmin = createAsyncThunk(
  "application/getApplicationByIdAdmin",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch application",
      );
    }
  },
);

// ============================================================
// UPDATE APPLICATION STATUS - ADMIN
// PATCH /api/admin/applications/:id/status
// ============================================================

export const updateApplicationStatus = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/applications/${applicationId}/status`,
        { status },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to update application status",
      );
    }
  },
);

// ============================================================
// DELETE APPLICATION - ADMIN
// DELETE /api/admin/applications/:id
// ============================================================

export const deleteApplication = createAsyncThunk(
  "application/deleteApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/applications/${applicationId}`);

      return {
        ...response.data,
        applicationId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete application",
      );
    }
  },
);

// ============================================================
// SAVE JOB - USER
// POST /api/jobs/:id/save
// ============================================================

export const saveJob = createAsyncThunk(
  "application/saveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/jobs/${jobId}/save`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to save job",
      );
    }
  },
);

// ============================================================
// UNSAVE JOB - USER
// DELETE /api/jobs/:id/save
// ============================================================

export const unsaveJob = createAsyncThunk(
  "application/unsaveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/jobs/${jobId}/save`);

      return {
        ...response.data,
        jobId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to remove saved job",
      );
    }
  },
);

// ============================================================
// GET SAVED JOBS - USER
// GET /api/jobs/saved
// ============================================================

export const getSavedJobs = createAsyncThunk(
  "application/getSavedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/jobs/saved`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch saved jobs",
      );
    }
  },
);

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  // User applications
  applications: [],
  applicationsCount: 0,

  // Admin applications
  adminApplications: [],
  adminApplicationsCount: 0,

  // Saved jobs
  savedJobs: [],
  savedJobsCount: 0,

  // Current application
  currentApplication: null,

  // Loading states
  loading: false,
  applying: false,
  saving: false,
  deleting: false,
  updatingStatus: false,

  // Success
  success: false,
  message: "",

  // Error
  error: null,
};

// ============================================================
// SLICE
// ============================================================

const applicationSlice = createSlice({
  name: "application",
  initialState,

  reducers: {
    // Reset general state
    resetApplicationState: (state) => {
      state.loading = false;
      state.applying = false;
      state.saving = false;
      state.deleting = false;
      state.updatingStatus = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },

    // Clear only error
    clearApplicationError: (state) => {
      state.error = null;
    },

    // Clear message
    clearApplicationMessage: (state) => {
      state.message = "";
    },

    // Clear all applications
    clearApplications: (state) => {
      state.applications = [];
      state.applicationsCount = 0;
    },

    // Clear saved jobs
    clearSavedJobs: (state) => {
      state.savedJobs = [];
      state.savedJobsCount = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================================
      // APPLY TO JOB
      // ========================================================

      .addCase(applyToJob.pending, (state) => {
        state.applying = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(applyToJob.fulfilled, (state, action) => {
        state.applying = false;
        state.success = true;

        state.message =
          action.payload?.message || "Application submitted successfully";

        state.currentApplication = action.payload?.data || null;

        state.error = null;
      })

      .addCase(applyToJob.rejected, (state, action) => {
        state.applying = false;
        state.success = false;

        state.error = action.payload || "Failed to submit application";

        state.message = "";
      })

      // ========================================================
      // GET MY APPLICATIONS
      // ========================================================

      .addCase(getMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.loading = false;

        state.applications = action.payload?.data || [];

        state.applicationsCount =
          action.payload?.count || action.payload?.data?.length || 0;

        state.error = null;
      })

      .addCase(getMyApplications.rejected, (state, action) => {
        state.loading = false;

        state.applications = [];
        state.applicationsCount = 0;

        state.error = action.payload || "Failed to fetch applications";
      })

      // ========================================================
      // GET JOB APPLICATIONS - ADMIN
      // ========================================================

      .addCase(getJobApplicationsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getJobApplicationsAdmin.fulfilled, (state, action) => {
        state.loading = false;

        state.adminApplications = action.payload?.data || [];

        state.adminApplicationsCount =
          action.payload?.count || action.payload?.data?.length || 0;

        state.error = null;
      })

      .addCase(getJobApplicationsAdmin.rejected, (state, action) => {
        state.loading = false;

        state.adminApplications = [];
        state.adminApplicationsCount = 0;

        state.error = action.payload || "Failed to fetch job applications";
      })

      // ========================================================
      // GET ALL APPLICATIONS - ADMIN
      // ========================================================

      .addCase(getAllApplicationsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllApplicationsAdmin.fulfilled, (state, action) => {
        state.loading = false;

        state.adminApplications = action.payload?.data || [];

        state.adminApplicationsCount =
          action.payload?.count || action.payload?.data?.length || 0;

        state.error = null;
      })

      .addCase(getAllApplicationsAdmin.rejected, (state, action) => {
        state.loading = false;

        state.adminApplications = [];
        state.adminApplicationsCount = 0;

        state.error = action.payload || "Failed to fetch applications";
      })

      .addCase(getApplicationByIdAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentApplication = null;
      })
      .addCase(getApplicationByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload?.data || null;
        state.error = null;
      })
      .addCase(getApplicationByIdAdmin.rejected, (state, action) => {
        state.loading = false;
        state.currentApplication = null;
        state.error = action.payload || "Failed to fetch application";
      })

      // ========================================================
      // UPDATE APPLICATION STATUS
      // ========================================================

      .addCase(updateApplicationStatus.pending, (state) => {
        state.updatingStatus = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.updatingStatus = false;
        state.success = true;

        state.message =
          action.payload?.message || "Application status updated successfully";

        const updatedApplication = action.payload?.data;

        if (updatedApplication?._id) {
          const index = state.adminApplications.findIndex(
            (application) => application._id === updatedApplication._id,
          );

          if (index !== -1) {
            state.adminApplications[index] = {
              ...state.adminApplications[index],
              ...updatedApplication,
            };
          }

          if (state.currentApplication?._id === updatedApplication._id) {
            state.currentApplication = {
              ...state.currentApplication,
              ...updatedApplication,
            };
          }
        }

        state.error = null;
      })

      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.updatingStatus = false;
        state.success = false;

        state.error = action.payload || "Failed to update application status";
      })

      // ========================================================
      // DELETE APPLICATION
      // ========================================================

      .addCase(deleteApplication.pending, (state) => {
        state.deleting = true;
        state.success = false;
        state.error = null;
      })

      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.deleting = false;
        state.success = true;

        state.message =
          action.payload?.message || "Application deleted successfully";

        const applicationId = action.payload?.applicationId;

        state.adminApplications = state.adminApplications.filter(
          (application) => application._id !== applicationId,
        );

        state.adminApplicationsCount = state.adminApplications.length;

        state.error = null;
      })

      .addCase(deleteApplication.rejected, (state, action) => {
        state.deleting = false;
        state.success = false;

        state.error = action.payload || "Failed to delete application";
      })

      // ========================================================
      // SAVE JOB
      // ========================================================

      .addCase(saveJob.pending, (state) => {
        state.saving = true;
        state.success = false;
        state.error = null;
      })

      .addCase(saveJob.fulfilled, (state, action) => {
        state.saving = false;
        state.success = true;

        state.message = action.payload?.message || "Job saved successfully";

        const savedJob = action.payload?.data;

        if (savedJob) {
          const alreadyExists = state.savedJobs.some(
            (item) => item._id === savedJob._id,
          );

          if (!alreadyExists) {
            state.savedJobs.unshift(savedJob);
            state.savedJobsCount = state.savedJobs.length;
          }
        }

        state.error = null;
      })

      .addCase(saveJob.rejected, (state, action) => {
        state.saving = false;
        state.success = false;

        state.error = action.payload || "Failed to save job";
      })

      // ========================================================
      // UNSAVE JOB
      // ========================================================

      .addCase(unsaveJob.pending, (state) => {
        state.saving = true;
        state.success = false;
        state.error = null;
      })

      .addCase(unsaveJob.fulfilled, (state, action) => {
        state.saving = false;
        state.success = true;

        state.message =
          action.payload?.message || "Job removed from saved list";

        const jobId = action.payload?.jobId;

        state.savedJobs = state.savedJobs.filter((item) => {
          const savedJobId = item.job?._id || item.job;

          return savedJobId !== jobId;
        });

        state.savedJobsCount = state.savedJobs.length;

        state.error = null;
      })

      .addCase(unsaveJob.rejected, (state, action) => {
        state.saving = false;
        state.success = false;

        state.error = action.payload || "Failed to remove saved job";
      })

      // ========================================================
      // GET SAVED JOBS
      // ========================================================

      .addCase(getSavedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSavedJobs.fulfilled, (state, action) => {
        state.loading = false;

        state.savedJobs = action.payload?.data || [];

        state.savedJobsCount =
          action.payload?.count || action.payload?.data?.length || 0;

        state.error = null;
      })

      .addCase(getSavedJobs.rejected, (state, action) => {
        state.loading = false;

        state.savedJobs = [];
        state.savedJobsCount = 0;

        state.error = action.payload || "Failed to fetch saved jobs";
      });
  },
});

export const {
  resetApplicationState,
  clearApplicationError,
  clearApplicationMessage,
  clearApplications,
  clearSavedJobs,
} = applicationSlice.actions;

export const selectApplicationLoading = (state) => state.application.applying;
export const selectApplicationError = (state) => state.application.error;
export const selectApplicationSuccess = (state) => state.application.success;

export default applicationSlice.reducer;
