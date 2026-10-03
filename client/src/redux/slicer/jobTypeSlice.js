import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

/* =========================================================
   PUBLIC - GET ACTIVE JOB TYPES
   GET /api/job-types
========================================================= */
export const getPublicJobTypes = createAsyncThunk(
  "jobTypes/getPublicJobTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/job-types");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job types"
      );
    }
  }
);

/* =========================================================
   ADMIN - GET ALL JOB TYPES
   GET /api/admin/job-types
========================================================= */
export const getAdminJobTypes = createAsyncThunk(
  "jobTypes/getAdminJobTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/job-types");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job types"
      );
    }
  }
);

/* =========================================================
   ADMIN - CREATE JOB TYPE
   POST /api/admin/job-types
========================================================= */
export const createJobType = createAsyncThunk(
  "jobTypes/createJobType",
  async (jobTypeData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/job-types", jobTypeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create job type"
      );
    }
  }
);

/* =========================================================
   ADMIN - UPDATE JOB TYPE
   PUT /api/admin/job-types/:id
========================================================= */
export const updateJobType = createAsyncThunk(
  "jobTypes/updateJobType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/job-types/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update job type"
      );
    }
  }
);

/* =========================================================
   ADMIN - DELETE JOB TYPE
   DELETE /api/admin/job-types/:id
========================================================= */
export const deleteJobType = createAsyncThunk(
  "jobTypes/deleteJobType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/job-types/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete job type"
      );
    }
  }
);

/* =========================================================
   ADMIN - TOGGLE JOB TYPE STATUS
   PATCH /api/admin/job-types/:id/toggle
========================================================= */
export const toggleJobTypeStatus = createAsyncThunk(
  "jobTypes/toggleJobTypeStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/job-types/${id}/toggle`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle job type status"
      );
    }
  }
);

const initialState = {
  jobTypes: [],
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  success: false,
  message: null,
};

const jobTypeSlice = createSlice({
  name: "jobTypes",
  initialState,
  reducers: {
    clearJobTypeState: (state) => {
      state.loading = false;
      state.error = null;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.success = false;
      state.message = null;
    },
    clearJobTypeError: (state) => {
      state.error = null;
    },
    clearJobTypeMessage: (state) => {
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET PUBLIC JOB TYPES
      .addCase(getPublicJobTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicJobTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.jobTypes = action.payload.data || [];
      })
      .addCase(getPublicJobTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ADMIN JOB TYPES
      .addCase(getAdminJobTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminJobTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.jobTypes = action.payload.data || [];
      })
      .addCase(getAdminJobTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE JOB TYPE
      .addCase(createJobType.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createJobType.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.message = action.payload.message || "Job type created successfully";
        if (action.payload.data) {
          state.jobTypes.push(action.payload.data);
        }
      })
      .addCase(createJobType.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // UPDATE JOB TYPE
      .addCase(updateJobType.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateJobType.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = true;
        state.message = action.payload.message || "Job type updated successfully";
        const updated = action.payload.data;
        if (updated) {
          const index = state.jobTypes.findIndex((jt) => jt._id === updated._id);
          if (index !== -1) {
            state.jobTypes[index] = updated;
          }
        }
      })
      .addCase(updateJobType.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // DELETE JOB TYPE
      .addCase(deleteJobType.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteJobType.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.message = action.payload.message || "Job type deleted successfully";
        state.jobTypes = state.jobTypes.filter((jt) => jt._id !== action.payload.id);
      })
      .addCase(deleteJobType.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // TOGGLE JOB TYPE STATUS
      .addCase(toggleJobTypeStatus.fulfilled, (state, action) => {
        const updated = action.payload.data;
        if (updated) {
          const index = state.jobTypes.findIndex((jt) => jt._id === updated._id);
          if (index !== -1) {
            state.jobTypes[index] = updated;
          }
        }
      });
  },
});

export const { clearJobTypeState, clearJobTypeError, clearJobTypeMessage } =
  jobTypeSlice.actions;

export default jobTypeSlice.reducer;
