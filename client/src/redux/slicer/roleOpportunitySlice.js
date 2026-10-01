import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// ASYNC THUNKS
// =====================================================

// Public - Get opportunities for candidate role landing pages
export const fetchPublicOpportunities = createAsyncThunk(
  "roleOpportunities/fetchPublic",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.roleCategory) queryParams.append("roleCategory", params.roleCategory);
      if (params.country) queryParams.append("country", params.country);
      if (params.search) queryParams.append("search", params.search);

      const qs = queryParams.toString();
      const url = qs ? `/role-opportunities?${qs}` : "/role-opportunities";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch opportunities"
      );
    }
  }
);

// Admin - Get all opportunities with filters & pagination
export const fetchAdminOpportunities = createAsyncThunk(
  "roleOpportunities/fetchAdminAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.roleCategory) queryParams.append("roleCategory", params.roleCategory);
      if (params.status) queryParams.append("status", params.status);
      if (params.search) queryParams.append("search", params.search);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.order) queryParams.append("order", params.order);

      const qs = queryParams.toString();
      const url = qs
        ? `/role-opportunities/admin/all?${qs}`
        : "/role-opportunities/admin/all";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch opportunities"
      );
    }
  }
);

// Admin - Create opportunity
export const createOpportunity = createAsyncThunk(
  "roleOpportunities/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/role-opportunities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create opportunity"
      );
    }
  }
);

// Admin - Update opportunity
export const updateOpportunity = createAsyncThunk(
  "roleOpportunities/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/role-opportunities/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update opportunity"
      );
    }
  }
);

// Admin - Delete opportunity
export const deleteOpportunity = createAsyncThunk(
  "roleOpportunities/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/role-opportunities/${id}`);
      return { id, message: response.data?.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete opportunity"
      );
    }
  }
);

// Admin - Stats by Role
export const fetchOpportunityStats = createAsyncThunk(
  "roleOpportunities/stats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/role-opportunities/admin/stats");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch stats"
      );
    }
  }
);

// =====================================================
// SLICE
// =====================================================

const roleOpportunitySlice = createSlice({
  name: "roleOpportunities",
  initialState: {
    // Public landing pages
    publicList: [],
    opportunities: [],
    publicLoading: false,
    publicError: null,

    // Admin state
    adminList: [],
    adminLoading: false,
    adminError: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
    },

    // Action states (create/update/delete)
    actionLoading: false,
    actionSuccess: false,
    actionError: null,

    // Stats
    stats: {
      total: 0,
      active: 0,
      byRole: {},
    },
    statsLoading: false,
  },
  reducers: {
    resetActionState: (state) => {
      state.actionLoading = false;
      state.actionSuccess = false;
      state.actionError = null;
    },
    clearPublicList: (state) => {
      state.publicList = [];
      state.opportunities = [];
      state.publicError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Public fetch
      .addCase(fetchPublicOpportunities.pending, (state) => {
        state.publicLoading = true;
        state.publicError = null;
      })
      .addCase(fetchPublicOpportunities.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.publicList = action.payload.data || [];
        state.opportunities = action.payload.data || [];
      })
      .addCase(fetchPublicOpportunities.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload;
      })

      // Admin fetch all
      .addCase(fetchAdminOpportunities.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchAdminOpportunities.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminList = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchAdminOpportunities.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })

      // Create
      .addCase(createOpportunity.pending, (state) => {
        state.actionLoading = true;
        state.actionSuccess = false;
        state.actionError = null;
      })
      .addCase(createOpportunity.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.actionSuccess = true;
        if (action.payload.data) {
          state.adminList.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createOpportunity.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // Update
      .addCase(updateOpportunity.pending, (state) => {
        state.actionLoading = true;
        state.actionSuccess = false;
        state.actionError = null;
      })
      .addCase(updateOpportunity.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.actionSuccess = true;
        const updated = action.payload.data;
        if (updated) {
          const index = state.adminList.findIndex((item) => item._id === updated._id);
          if (index !== -1) {
            state.adminList[index] = updated;
          }
        }
      })
      .addCase(updateOpportunity.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // Delete
      .addCase(deleteOpportunity.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteOpportunity.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminList = state.adminList.filter((item) => item._id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteOpportunity.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // Stats
      .addCase(fetchOpportunityStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchOpportunityStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload.data || state.stats;
      })
      .addCase(fetchOpportunityStats.rejected, (state) => {
        state.statsLoading = false;
      });
  },
});

export const { resetActionState, clearPublicList } = roleOpportunitySlice.actions;
export default roleOpportunitySlice.reducer;
