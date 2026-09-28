import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

/* =========================================================
   ADMIN JOB THUNKS
   ========================================================= */

/* ---------------------------------------------------------
   CREATE JOB
   POST /api/admin/jobs

   Supports:
   - companyLogo file
   - responsibilities
   - requirements
   - skills
   - tags
   --------------------------------------------------------- */

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      console.log(formData);

      Object.keys(jobData || {}).forEach((key) => {
        const value = jobData[key];

        if (value === undefined || value === null) {
          return;
        }

        // Company logo
        // Backend uploadImage uses upload.single("image")
        if (key === "companyLogo" && value instanceof File) {
          formData.append("image", value);
          return;
        }

        // Arrays
        if (
          key === "responsibilities" ||
          key === "requirements" ||
          key === "skills" ||
          key === "tags"
        ) {
          formData.append(key, JSON.stringify(value || []));
          return;
        }

        // Boolean values
        if (key === "isFeatured" || key === "isUrgent") {
          formData.append(key, String(value));
          return;
        }

        formData.append(key, value);
      });

      const response = await api.post("/admin/jobs", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create job",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET ALL JOBS ADMIN
   GET /api/admin/jobs

   Query:
   - status
   - category
   - search
   - sort
   --------------------------------------------------------- */

export const getAllJobsAdmin = createAsyncThunk(
  "jobs/getAllJobsAdmin",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/jobs", {
        params,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET SINGLE JOB ADMIN
   GET /api/admin/jobs/:id
   --------------------------------------------------------- */

export const getJobByIdAdmin = createAsyncThunk(
  "jobs/getJobByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/jobs/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job",
      );
    }
  },
);

/* ---------------------------------------------------------
   UPDATE JOB
   PUT /api/admin/jobs/:id

   Supports:
   - companyLogo file
   - arrays
   - booleans
   --------------------------------------------------------- */

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(jobData || {}).forEach((key) => {
        const value = jobData[key];

        if (value === undefined || value === null) {
          return;
        }

        // File
        if (key === "companyLogo" && value instanceof File) {
          formData.append("image", value);
          return;
        }

        // Arrays
        if (
          key === "responsibilities" ||
          key === "requirements" ||
          key === "skills" ||
          key === "tags"
        ) {
          formData.append(key, JSON.stringify(value || []));
          return;
        }

        // Boolean values
        if (key === "isFeatured" || key === "isUrgent") {
          formData.append(key, String(value));
          return;
        }

        formData.append(key, value);
      });

      const response = await api.put(`/admin/jobs/${id}`, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update job",
      );
    }
  },
);

/* ---------------------------------------------------------
   DELETE JOB
   DELETE /api/admin/jobs/:id
   --------------------------------------------------------- */

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/jobs/${id}`);

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete job",
      );
    }
  },
);

/* ---------------------------------------------------------
   TOGGLE JOB STATUS
   PATCH /api/admin/jobs/:id/toggle-status

   Body:
   {
     status: "active" | "draft" | "closed" | "pending"
   }
   --------------------------------------------------------- */

export const toggleJobStatus = createAsyncThunk(
  "jobs/toggleJobStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/jobs/${id}/toggle-status`, {
        status,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update job status",
      );
    }
  },
);

/* ---------------------------------------------------------
   TOGGLE FEATURED
   PATCH /api/admin/jobs/:id/toggle-featured
   --------------------------------------------------------- */

export const toggleFeatured = createAsyncThunk(
  "jobs/toggleFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/jobs/${id}/toggle-featured`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle featured status",
      );
    }
  },
);

/* ---------------------------------------------------------
   TOGGLE URGENT
   PATCH /api/admin/jobs/:id/toggle-urgent
   --------------------------------------------------------- */

export const toggleUrgent = createAsyncThunk(
  "jobs/toggleUrgent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/jobs/${id}/toggle-urgent`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle urgent status",
      );
    }
  },
);

/* =========================================================
   USER / PUBLIC JOB THUNKS
   ========================================================= */

/* ---------------------------------------------------------
   GET ALL ACTIVE JOBS
   GET /api/jobs

   Query:
   - category
   - jobType
   - experience
   - search
   - sort
   - page
   - limit
   --------------------------------------------------------- */

export const getAllJobsUser = createAsyncThunk(
  "jobs/getAllJobsUser",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs", {
        params,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET SINGLE JOB USER
   GET /api/jobs/:id
   --------------------------------------------------------- */

export const getJobByIdUser = createAsyncThunk(
  "jobs/getJobByIdUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/jobs/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET JOBS BY CATEGORY
   GET /api/jobs/category/:slug

   Query:
   - page
   - limit
   --------------------------------------------------------- */

export const getJobsByCategory = createAsyncThunk(
  "jobs/getJobsByCategory",
  async ({ slug, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/jobs/category/${slug}`, {
        params: {
          page,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET FEATURED JOBS
   GET /api/jobs/featured
   --------------------------------------------------------- */

export const getFeaturedJobs = createAsyncThunk(
  "jobs/getFeaturedJobs",
  async (limit = 6, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs/featured", {
        params: {
          limit,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET URGENT JOBS
   GET /api/jobs/urgent
   --------------------------------------------------------- */

export const getUrgentJobs = createAsyncThunk(
  "jobs/getUrgentJobs",
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs/urgent", {
        params: {
          limit,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch urgent jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   SEARCH JOBS
   GET /api/jobs/search

   Query:
   - q
   - page
   - limit
   --------------------------------------------------------- */

export const searchJobs = createAsyncThunk(
  "jobs/searchJobs",
  async ({ q, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs/search", {
        params: {
          q,
          page,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search jobs",
      );
    }
  },
);

/* ---------------------------------------------------------
   GET JOB STATS
   GET /api/jobs/stats
   --------------------------------------------------------- */

export const getJobStats = createAsyncThunk(
  "jobs/getJobStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs/stats");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job stats",
      );
    }
  },
);

/* ---------------------------------------------------------
   APPLY TO JOB
   POST /api/jobs/:id/apply
   --------------------------------------------------------- */

export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async (formData, { rejectWithValue }) => {
    try {
      const jobId = formData?.get("jobId");

      if (!jobId) {
        return rejectWithValue("Job ID is required");
      }

      console.log(
        "Submitting application FormData:",
        [...formData.entries()].map(([key, value]) => [
          key,
          value instanceof File ? value.name : value,
        ]),
      );

      const response = await api.post(`/jobs/${jobId}/apply`, formData);

      console.log("Application API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Application API error:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit application",
      );
    }
  },
);

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState = {
  /* ---------------- ADMIN ---------------- */

  adminJobs: [],
  adminSelectedJob: null,

  adminCount: 0,

  /* ---------------- USER ---------------- */

  jobs: [],
  selectedJob: null,

  categoryJobs: [],
  categoryName: "",

  featuredJobs: [],
  urgentJobs: [],

  searchResults: [],

  /* ---------------- STATS ---------------- */

  stats: {
    totalJobs: 0,
    featuredJobs: 0,
    urgentJobs: 0,
    topCategories: [],
  },

  /* ---------------- PAGINATION ---------------- */

  total: 0,
  count: 0,
  page: 1,
  totalPages: 1,

  /* ---------------- LOADING ---------------- */

  loading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  adminLoading: false,
  adminJobLoading: false,

  jobLoading: false,

  categoryLoading: false,
  featuredLoading: false,
  urgentLoading: false,
  searchLoading: false,
  statsLoading: false,

  statusLoading: false,
  featuredToggleLoading: false,
  urgentToggleLoading: false,

  /* ---------------- ERRORS ---------------- */

  error: null,

  createError: null,
  updateError: null,
  deleteError: null,

  adminError: null,
  adminJobError: null,

  jobError: null,
  categoryError: null,
  featuredError: null,
  urgentError: null,
  searchError: null,
  statsError: null,

  statusError: null,
  featuredToggleError: null,
  urgentToggleError: null,

  /* ---------------- MESSAGES ---------------- */

  successMessage: null,
};

/* =========================================================
   SLICE
   ========================================================= */

const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {
    /* -----------------------------------------------------
           CLEAR SELECTED USER JOB
           ----------------------------------------------------- */

    clearSelectedJob: (state) => {
      state.selectedJob = null;
      state.jobError = null;
    },

    /* -----------------------------------------------------
           CLEAR SELECTED ADMIN JOB
           ----------------------------------------------------- */

    clearAdminSelectedJob: (state) => {
      state.adminSelectedJob = null;
      state.adminJobError = null;
    },

    /* -----------------------------------------------------
           CLEAR SEARCH RESULTS
           ----------------------------------------------------- */

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },

    /* -----------------------------------------------------
           CLEAR ALL ERRORS
           ----------------------------------------------------- */

    clearJobErrors: (state) => {
      state.error = null;

      state.createError = null;
      state.updateError = null;
      state.deleteError = null;

      state.adminError = null;
      state.adminJobError = null;

      state.jobError = null;
      state.categoryError = null;
      state.featuredError = null;
      state.urgentError = null;
      state.searchError = null;
      state.statsError = null;

      state.statusError = null;
      state.featuredToggleError = null;
      state.urgentToggleError = null;
    },

    /* -----------------------------------------------------
           CLEAR SUCCESS MESSAGE
           ----------------------------------------------------- */

    clearJobSuccessMessage: (state) => {
      state.successMessage = null;
    },

    /* -----------------------------------------------------
           RESET JOBS
           ----------------------------------------------------- */

    resetJobs: (state) => {
      state.jobs = [];
      state.total = 0;
      state.count = 0;
      state.page = 1;
      state.totalPages = 1;
    },

    /* -----------------------------------------------------
           RESET ADMIN JOBS
           ----------------------------------------------------- */

    resetAdminJobs: (state) => {
      state.adminJobs = [];
      state.adminCount = 0;
    },
  },

  /* =======================================================
       EXTRA REDUCERS
       ======================================================= */

  extraReducers: (builder) => {
    builder

      /* ===================================================
               ADMIN - CREATE JOB
               =================================================== */

      .addCase(createJob.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.successMessage = null;
      })

      .addCase(createJob.fulfilled, (state, action) => {
        state.createLoading = false;

        const newJob = action.payload?.data;

        if (newJob) {
          state.adminJobs.unshift(newJob);
          state.adminCount += 1;
        }

        state.successMessage =
          action.payload?.message || "Job created successfully";
      })

      .addCase(createJob.rejected, (state, action) => {
        state.createLoading = false;

        state.createError = action.payload || "Failed to create job";
      })

      /* ===================================================
               ADMIN - GET ALL JOBS
               =================================================== */

      .addCase(getAllJobsAdmin.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })

      .addCase(getAllJobsAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;

        state.adminJobs = action.payload?.data || [];

        state.adminCount = action.payload?.count || 0;
      })

      .addCase(getAllJobsAdmin.rejected, (state, action) => {
        state.adminLoading = false;

        state.adminError = action.payload || "Failed to fetch admin jobs";
      })

      /* ===================================================
               ADMIN - GET JOB BY ID
               =================================================== */

      .addCase(getJobByIdAdmin.pending, (state) => {
        state.adminJobLoading = true;
        state.adminJobError = null;
        state.adminSelectedJob = null;
      })

      .addCase(getJobByIdAdmin.fulfilled, (state, action) => {
        state.adminJobLoading = false;

        state.adminSelectedJob = action.payload?.data || null;
      })

      .addCase(getJobByIdAdmin.rejected, (state, action) => {
        state.adminJobLoading = false;

        state.adminJobError = action.payload || "Failed to fetch job";
      })

      /* ===================================================
               ADMIN - UPDATE JOB
               =================================================== */

      .addCase(updateJob.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.successMessage = null;
      })

      .addCase(updateJob.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedJob = action.payload?.data;

        if (updatedJob) {
          state.adminSelectedJob = updatedJob;

          const index = state.adminJobs.findIndex(
            (job) => job._id === updatedJob._id,
          );

          if (index !== -1) {
            state.adminJobs[index] = updatedJob;
          }
        }

        state.successMessage =
          action.payload?.message || "Job updated successfully";
      })

      .addCase(updateJob.rejected, (state, action) => {
        state.updateLoading = false;

        state.updateError = action.payload || "Failed to update job";
      })

      /* ===================================================
               ADMIN - DELETE JOB
               =================================================== */

      .addCase(deleteJob.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.successMessage = null;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const deletedId = action.payload?.id;

        state.adminJobs = state.adminJobs.filter(
          (job) => job._id !== deletedId,
        );

        state.adminCount = Math.max(0, state.adminCount - 1);

        if (state.adminSelectedJob?._id === deletedId) {
          state.adminSelectedJob = null;
        }

        state.successMessage =
          action.payload?.message || "Job deleted successfully";
      })

      .addCase(deleteJob.rejected, (state, action) => {
        state.deleteLoading = false;

        state.deleteError = action.payload || "Failed to delete job";
      })

      /* ===================================================
               ADMIN - TOGGLE STATUS
               =================================================== */

      .addCase(toggleJobStatus.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })

      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const updatedJob = action.payload?.data;

        if (updatedJob) {
          const index = state.adminJobs.findIndex(
            (job) => job._id === updatedJob._id,
          );

          if (index !== -1) {
            state.adminJobs[index] = updatedJob;
          }

          if (state.adminSelectedJob?._id === updatedJob._id) {
            state.adminSelectedJob = updatedJob;
          }
        }

        state.successMessage =
          action.payload?.message || "Job status updated successfully";
      })

      .addCase(toggleJobStatus.rejected, (state, action) => {
        state.statusLoading = false;

        state.statusError = action.payload || "Failed to update job status";
      })

      /* ===================================================
               ADMIN - TOGGLE FEATURED
               =================================================== */

      .addCase(toggleFeatured.pending, (state) => {
        state.featuredToggleLoading = true;
        state.featuredToggleError = null;
      })

      .addCase(toggleFeatured.fulfilled, (state, action) => {
        state.featuredToggleLoading = false;

        const updatedJob = action.payload?.data;

        if (updatedJob) {
          const index = state.adminJobs.findIndex(
            (job) => job._id === updatedJob._id,
          );

          if (index !== -1) {
            state.adminJobs[index] = updatedJob;
          }

          if (state.adminSelectedJob?._id === updatedJob._id) {
            state.adminSelectedJob = updatedJob;
          }
        }

        state.successMessage =
          action.payload?.message || "Featured status updated successfully";
      })

      .addCase(toggleFeatured.rejected, (state, action) => {
        state.featuredToggleLoading = false;

        state.featuredToggleError =
          action.payload || "Failed to toggle featured status";
      })

      /* ===================================================
               ADMIN - TOGGLE URGENT
               =================================================== */

      .addCase(toggleUrgent.pending, (state) => {
        state.urgentToggleLoading = true;
        state.urgentToggleError = null;
      })

      .addCase(toggleUrgent.fulfilled, (state, action) => {
        state.urgentToggleLoading = false;

        const updatedJob = action.payload?.data;

        if (updatedJob) {
          const index = state.adminJobs.findIndex(
            (job) => job._id === updatedJob._id,
          );

          if (index !== -1) {
            state.adminJobs[index] = updatedJob;
          }

          if (state.adminSelectedJob?._id === updatedJob._id) {
            state.adminSelectedJob = updatedJob;
          }
        }

        state.successMessage =
          action.payload?.message || "Urgent status updated successfully";
      })

      .addCase(toggleUrgent.rejected, (state, action) => {
        state.urgentToggleLoading = false;

        state.urgentToggleError =
          action.payload || "Failed to toggle urgent status";
      })

      /* ===================================================
               USER - GET ALL JOBS
               =================================================== */

      .addCase(getAllJobsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllJobsUser.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = action.payload?.data || [];

        state.count = action.payload?.count || 0;

        state.total = action.payload?.total || 0;

        state.page = action.payload?.page || 1;

        state.totalPages = action.payload?.totalPages || 1;
      })

      .addCase(getAllJobsUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch jobs";
      })

      /* ===================================================
               USER - GET JOB BY ID
               =================================================== */

      .addCase(getJobByIdUser.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
        state.selectedJob = null;
      })

      .addCase(getJobByIdUser.fulfilled, (state, action) => {
        state.jobLoading = false;

        state.selectedJob = action.payload?.data || null;
      })

      .addCase(getJobByIdUser.rejected, (state, action) => {
        state.jobLoading = false;

        state.jobError = action.payload || "Failed to fetch job";
      })

      /* ===================================================
               USER - CATEGORY JOBS
               =================================================== */

      .addCase(getJobsByCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(getJobsByCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;

        state.categoryJobs = action.payload?.data || [];

        state.categoryName = action.payload?.category || "";

        state.count = action.payload?.count || 0;

        state.total = action.payload?.total || 0;

        state.page = action.payload?.page || 1;

        state.totalPages = action.payload?.totalPages || 1;
      })

      .addCase(getJobsByCategory.rejected, (state, action) => {
        state.categoryLoading = false;

        state.categoryError = action.payload || "Failed to fetch category jobs";
      })

      /* ===================================================
               USER - FEATURED JOBS
               =================================================== */

      .addCase(getFeaturedJobs.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })

      .addCase(getFeaturedJobs.fulfilled, (state, action) => {
        state.featuredLoading = false;

        state.featuredJobs = action.payload?.data || [];
      })

      .addCase(getFeaturedJobs.rejected, (state, action) => {
        state.featuredLoading = false;

        state.featuredError = action.payload || "Failed to fetch featured jobs";
      })

      /* ===================================================
               USER - URGENT JOBS
               =================================================== */

      .addCase(getUrgentJobs.pending, (state) => {
        state.urgentLoading = true;
        state.urgentError = null;
      })

      .addCase(getUrgentJobs.fulfilled, (state, action) => {
        state.urgentLoading = false;

        state.urgentJobs = action.payload?.data || [];
      })

      .addCase(getUrgentJobs.rejected, (state, action) => {
        state.urgentLoading = false;

        state.urgentError = action.payload || "Failed to fetch urgent jobs";
      })

      /* ===================================================
               USER - SEARCH JOBS
               =================================================== */

      .addCase(searchJobs.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })

      .addCase(searchJobs.fulfilled, (state, action) => {
        state.searchLoading = false;

        state.searchResults = action.payload?.data || [];

        state.count = action.payload?.count || 0;

        state.total = action.payload?.total || 0;

        state.page = action.payload?.page || 1;

        state.totalPages = action.payload?.totalPages || 1;
      })

      .addCase(searchJobs.rejected, (state, action) => {
        state.searchLoading = false;

        state.searchError = action.payload || "Failed to search jobs";
      })

      /* ===================================================
               USER - JOB STATS
               =================================================== */

      .addCase(getJobStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })

      .addCase(getJobStats.fulfilled, (state, action) => {
        state.statsLoading = false;

        state.stats = {
          totalJobs: action.payload?.data?.totalJobs || 0,

          featuredJobs: action.payload?.data?.featuredJobs || 0,

          urgentJobs: action.payload?.data?.urgentJobs || 0,

          topCategories: action.payload?.data?.topCategories || [],
        };
      })

      .addCase(getJobStats.rejected, (state, action) => {
        state.statsLoading = false;

        state.statsError = action.payload || "Failed to fetch job stats";
      });
  },
});

/* =========================================================
   ACTIONS
   ========================================================= */

export const {
  clearSelectedJob,
  clearAdminSelectedJob,
  clearSearchResults,
  clearJobErrors,
  clearJobSuccessMessage,
  resetJobs,
  resetAdminJobs,
} = jobSlice.actions;

/* =========================================================
   SELECTORS
   ========================================================= */

/* ---------------- ADMIN SELECTORS ---------------- */

export const selectAdminJobs = (state) => state.jobs.adminJobs;

export const selectAdminSelectedJob = (state) => state.jobs.adminSelectedJob;

export const selectAdminCount = (state) => state.jobs.adminCount;

export const selectAdminLoading = (state) => state.jobs.adminLoading;

export const selectAdminJobLoading = (state) => state.jobs.adminJobLoading;

/* ---------------- USER SELECTORS ---------------- */

export const selectJobs = (state) => state.jobs.jobs;

export const selectSelectedJob = (state) => state.jobs.selectedJob;

export const selectCategoryJobs = (state) => state.jobs.categoryJobs;

export const selectCategoryName = (state) => state.jobs.categoryName;

export const selectFeaturedJobs = (state) => state.jobs.featuredJobs;

export const selectUrgentJobs = (state) => state.jobs.urgentJobs;

export const selectSearchResults = (state) => state.jobs.searchResults;

/* ---------------- PAGINATION ---------------- */

export const selectJobTotal = (state) => state.jobs.total;

export const selectJobCount = (state) => state.jobs.count;

export const selectJobPage = (state) => state.jobs.page;

export const selectJobTotalPages = (state) => state.jobs.totalPages;

/* ---------------- LOADING ---------------- */

export const selectJobsLoading = (state) => state.jobs.loading;

export const selectJobLoading = (state) => state.jobs.jobLoading;

export const selectCategoryLoading = (state) => state.jobs.categoryLoading;

export const selectFeaturedLoading = (state) => state.jobs.featuredLoading;

export const selectUrgentLoading = (state) => state.jobs.urgentLoading;

export const selectSearchLoading = (state) => state.jobs.searchLoading;

export const selectStatsLoading = (state) => state.jobs.statsLoading;

export const selectCreateLoading = (state) => state.jobs.createLoading;

export const selectUpdateLoading = (state) => state.jobs.updateLoading;

export const selectDeleteLoading = (state) => state.jobs.deleteLoading;

export const selectStatusLoading = (state) => state.jobs.statusLoading;

export const selectFeaturedToggleLoading = (state) =>
  state.jobs.featuredToggleLoading;

export const selectUrgentToggleLoading = (state) =>
  state.jobs.urgentToggleLoading;

/* ---------------- ERRORS ---------------- */

export const selectJobError = (state) => state.jobs.error;

export const selectCreateError = (state) => state.jobs.createError;

export const selectUpdateError = (state) => state.jobs.updateError;

export const selectDeleteError = (state) => state.jobs.deleteError;

export const selectAdminError = (state) => state.jobs.adminError;

export const selectAdminJobError = (state) => state.jobs.adminJobError;

export const selectSingleJobError = (state) => state.jobs.jobError;

export const selectCategoryError = (state) => state.jobs.categoryError;

export const selectFeaturedError = (state) => state.jobs.featuredError;

export const selectUrgentError = (state) => state.jobs.urgentError;

export const selectSearchError = (state) => state.jobs.searchError;

export const selectStatsError = (state) => state.jobs.statsError;

export const selectStatusError = (state) => state.jobs.statusError;

export const selectFeaturedToggleError = (state) =>
  state.jobs.featuredToggleError;

export const selectUrgentToggleError = (state) => state.jobs.urgentToggleError;

/* ---------------- STATS ---------------- */

export const selectJobStats = (state) => state.jobs.stats;

/* ---------------- SUCCESS MESSAGE ---------------- */

export const selectJobSuccessMessage = (state) => state.jobs.successMessage;

/* =========================================================
   EXPORT REDUCER
   ========================================================= */

export default jobSlice.reducer;
