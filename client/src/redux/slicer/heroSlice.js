import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ============================================================
// PUBLIC THUNKS
// ============================================================

// Fetch active hero banners for public homepage
export const fetchPublicBanners = createAsyncThunk(
  "hero/fetchPublicBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/hero/banners");
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch hero banners"
      );
    }
  }
);

// Backward-compatible single hero section fetch
export const fetchHeroSection = createAsyncThunk(
  "hero/fetchHeroSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/hero");
      return response.data?.data || null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch hero section"
      );
    }
  }
);

// ============================================================
// ADMIN THUNKS
// ============================================================

// Fetch all hero banners for admin management
export const fetchAdminBanners = createAsyncThunk(
  "hero/fetchAdminBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/hero/banners");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch admin hero banners"
      );
    }
  }
);

// Create new hero banner
export const createHeroBanner = createAsyncThunk(
  "hero/createHeroBanner",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/hero/banners", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create hero banner"
      );
    }
  }
);

// Update existing hero banner
export const updateHeroBanner = createAsyncThunk(
  "hero/updateHeroBanner",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/hero/banners/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update hero banner"
      );
    }
  }
);

// Delete hero banner
export const deleteHeroBanner = createAsyncThunk(
  "hero/deleteHeroBanner",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/hero/banners/${id}`);
      return { id, message: response.data?.message || "Banner deleted" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete hero banner"
      );
    }
  }
);

// Toggle banner status (active / inactive)
export const toggleHeroBannerStatus = createAsyncThunk(
  "hero/toggleHeroBannerStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/hero/banners/${id}/toggle`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to toggle hero banner status"
      );
    }
  }
);

// Reorder hero banners
export const reorderHeroBanners = createAsyncThunk(
  "hero/reorderHeroBanners",
  async (orders, { rejectWithValue }) => {
    try {
      const response = await api.put("/admin/hero/banners/reorder", { orders });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to reorder hero banners"
      );
    }
  }
);

// Backward-compatible admin update
export const updateHeroSectionAdmin = createAsyncThunk(
  "hero/updateHeroSectionAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put("/admin/hero", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update hero section"
      );
    }
  }
);

// ============================================================
// INITIAL STATE & SLICE
// ============================================================

const initialState = {
  banners: [],
  adminBanners: [],
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  data: {
    heading: "Build Your Career\nBeyond Borders",
    subheading:
      "Discover international job opportunities from trusted companies around the world. Build your profile, get matched with the right roles, and take your career to the country you've always dreamed of.",
    badgeText: "Global Jobs • 50+ Countries",
    image: {
      url: "",
      displayUrl: "",
    },
  },
  loading: false,
  adminLoading: false,
  saving: false,
  error: null,
  updateSuccess: false,
  updateMessage: "",
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    clearHeroStatus: (state) => {
      state.error = null;
      state.updateSuccess = false;
      state.updateMessage = "";
    },
    setAdminBannersLocal: (state, action) => {
      state.adminBanners = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Public Banners
      .addCase(fetchPublicBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicBanners.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.banners = action.payload;
          // Sync primary legacy data with first banner
          const first = action.payload[0];
          state.data = {
            heading: first.title,
            subheading: first.description,
            badgeText: first.badgeText,
            image: first.image || { url: "", displayUrl: "" },
          };
        }
      })
      .addCase(fetchPublicBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Admin Banners
      .addCase(fetchAdminBanners.pending, (state) => {
        state.adminLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminBanners.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminBanners = action.payload?.data || [];
        state.stats = action.payload?.stats || {
          total: state.adminBanners.length,
          active: state.adminBanners.filter((b) => b.isActive).length,
          inactive: state.adminBanners.filter((b) => !b.isActive).length,
        };
      })
      .addCase(fetchAdminBanners.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })

      // Create Hero Banner
      .addCase(createHeroBanner.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(createHeroBanner.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage = action.payload?.message || "Hero banner created successfully!";
        if (action.payload?.data) {
          state.adminBanners.push(action.payload.data);
          state.stats.total += 1;
          if (action.payload.data.isActive) {
            state.stats.active += 1;
            state.banners.push(action.payload.data);
          } else {
            state.stats.inactive += 1;
          }
        }
      })
      .addCase(createHeroBanner.rejected, (state, action) => {
        state.saving = false;
        state.updateSuccess = false;
        state.error = action.payload;
      })

      // Update Hero Banner
      .addCase(updateHeroBanner.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateHeroBanner.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage = action.payload?.message || "Hero banner updated successfully!";
        const updated = action.payload?.data;
        if (updated) {
          state.adminBanners = state.adminBanners.map((b) =>
            b._id === updated._id ? updated : b
          );
          if (updated.isActive) {
            const exists = state.banners.some((b) => b._id === updated._id);
            if (exists) {
              state.banners = state.banners.map((b) =>
                b._id === updated._id ? updated : b
              );
            } else {
              state.banners.push(updated);
            }
          } else {
            state.banners = state.banners.filter((b) => b._id !== updated._id);
          }
          // Recalculate stats
          state.stats.active = state.adminBanners.filter((b) => b.isActive).length;
          state.stats.inactive = state.adminBanners.length - state.stats.active;
        }
      })
      .addCase(updateHeroBanner.rejected, (state, action) => {
        state.saving = false;
        state.updateSuccess = false;
        state.error = action.payload;
      })

      // Delete Hero Banner
      .addCase(deleteHeroBanner.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(deleteHeroBanner.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage = action.payload?.message || "Hero banner deleted successfully!";
        const id = action.payload.id;
        state.adminBanners = state.adminBanners.filter((b) => b._id !== id);
        state.banners = state.banners.filter((b) => b._id !== id);
        state.stats.total = state.adminBanners.length;
        state.stats.active = state.adminBanners.filter((b) => b.isActive).length;
        state.stats.inactive = state.stats.total - state.stats.active;
      })
      .addCase(deleteHeroBanner.rejected, (state, action) => {
        state.saving = false;
        state.updateSuccess = false;
        state.error = action.payload;
      })

      // Toggle Hero Banner Status
      .addCase(toggleHeroBannerStatus.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(toggleHeroBannerStatus.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage = action.payload?.message || "Status updated!";
        const updated = action.payload?.data;
        if (updated) {
          state.adminBanners = state.adminBanners.map((b) =>
            b._id === updated._id ? updated : b
          );
          if (updated.isActive) {
            const exists = state.banners.some((b) => b._id === updated._id);
            if (!exists) {
              state.banners.push(updated);
            } else {
              state.banners = state.banners.map((b) =>
                b._id === updated._id ? updated : b
              );
            }
          } else {
            state.banners = state.banners.filter((b) => b._id !== updated._id);
          }
          state.stats.active = state.adminBanners.filter((b) => b.isActive).length;
          state.stats.inactive = state.adminBanners.length - state.stats.active;
        }
      })
      .addCase(toggleHeroBannerStatus.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Reorder Hero Banners
      .addCase(reorderHeroBanners.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(reorderHeroBanners.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage = action.payload?.message || "Order updated!";
        if (action.payload?.data) {
          state.adminBanners = action.payload.data;
          state.banners = action.payload.data.filter((b) => b.isActive);
        }
      })
      .addCase(reorderHeroBanners.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Backward compatible Fetch Hero
      .addCase(fetchHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = {
            heading: action.payload.heading || action.payload.title,
            subheading: action.payload.subheading || action.payload.description,
            badgeText: action.payload.badgeText,
            image: action.payload.image || { url: "", displayUrl: "" },
          };
        }
      })
      .addCase(fetchHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Backward compatible Update Hero
      .addCase(updateHeroSectionAdmin.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateHeroSectionAdmin.fulfilled, (state, action) => {
        state.saving = false;
        state.updateSuccess = true;
        state.updateMessage =
          action.payload?.message || "Hero section updated successfully!";
        if (action.payload?.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(updateHeroSectionAdmin.rejected, (state, action) => {
        state.saving = false;
        state.updateSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { clearHeroStatus, setAdminBannersLocal } = heroSlice.actions;
export default heroSlice.reducer;
