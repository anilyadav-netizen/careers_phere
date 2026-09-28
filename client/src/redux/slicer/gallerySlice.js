
// src/redux/slicer/gallerySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// ============================================================
// ADMIN THUNKS
// ============================================================

// CREATE GALLERY IMAGE
export const createGalleryImage = createAsyncThunk(
  "gallery/createGalleryImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Create Gallery Response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Create Gallery Error:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create gallery image"
      );
    }
  }
);

// GET ALL GALLERY - ADMIN
export const getAllGalleryAdmin = createAsyncThunk(
  "gallery/getAllGalleryAdmin",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/gallery", {
        params,
      });

      console.log(
        "Get All Gallery Response:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get All Gallery Error:",
        error
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch gallery images"
      );
    }
  }
);

// GET SINGLE GALLERY - ADMIN
export const getGalleryByIdAdmin = createAsyncThunk(
  "gallery/getGalleryByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/gallery/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch gallery image"
      );
    }
  }
);

// UPDATE GALLERY IMAGE - ADMIN
export const updateGalleryImage = createAsyncThunk(
  "gallery/updateGalleryImage",
  async (
    { id, formData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/admin/gallery/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update gallery image"
      );
    }
  }
);

// DELETE GALLERY IMAGE - ADMIN
export const deleteGalleryImage = createAsyncThunk(
  "gallery/deleteGalleryImage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/gallery/${id}`
      );

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete gallery image"
      );
    }
  }
);

// TOGGLE GALLERY STATUS
export const toggleGalleryStatus = createAsyncThunk(
  "gallery/toggleGalleryStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/gallery/${id}/toggle`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to toggle gallery status"
      );
    }
  }
);

// TOGGLE FEATURED STATUS
export const toggleGalleryFeatured = createAsyncThunk(
  "gallery/toggleGalleryFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/gallery/${id}/toggle-featured`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to toggle featured status"
      );
    }
  }
);

// BULK DELETE
export const bulkDeleteGallery = createAsyncThunk(
  "gallery/bulkDeleteGallery",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        "/admin/gallery/bulk",
        {
          data: { ids },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete gallery images"
      );
    }
  }
);

// GET ADMIN GALLERY STATS
export const getGalleryStats = createAsyncThunk(
  "gallery/getGalleryStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/admin/gallery/stats"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch gallery statistics"
      );
    }
  }
);

// ============================================================
// USER THUNKS
// ============================================================

// GET ALL GALLERY - USER
// GET /api/gallery
export const getGallery = createAsyncThunk(
  "gallery/getGallery",
  async (
    {
      category = "",
      limit = 20,
      page = 1,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }

      params.append("limit", limit);
      params.append("page", page);

      const response = await api.get(
        `/gallery?${params.toString()}`
      );

      console.log(
        "Get Gallery Response:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Gallery Error:",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch gallery images"
      );
    }
  }
);

// GET SINGLE GALLERY - USER
// GET /api/gallery/:id
export const getGalleryById = createAsyncThunk(
  "gallery/getGalleryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/gallery/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Gallery By ID Error:",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch gallery image"
      );
    }
  }
);

// GET FEATURED GALLERY
// GET /api/gallery/featured
export const getFeaturedGallery = createAsyncThunk(
  "gallery/getFeaturedGallery",
  async (
    limit = 6,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/gallery/featured?limit=${limit}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Featured Gallery Error:",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch featured gallery"
      );
    }
  }
);

// GET GALLERY BY CATEGORY
// GET /api/gallery/category/:category
export const getGalleryByCategory =
  createAsyncThunk(
    "gallery/getGalleryByCategory",
    async (
      {
        category,
        limit = 20,
        page = 1,
      },
      { rejectWithValue }
    ) => {
      try {
        if (!category) {
          return rejectWithValue(
            "Category is required"
          );
        }

        const params = new URLSearchParams();

        params.append("limit", limit);
        params.append("page", page);

        const response = await api.get(
          `/gallery/category/${encodeURIComponent(
            category
          )}?${params.toString()}`
        );

        return response.data;
      } catch (error) {
        console.error(
          "Get Gallery By Category Error:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch gallery by category"
        );
      }
    }
  );

// SEARCH GALLERY
// GET /api/gallery/search?q=...
export const searchGallery = createAsyncThunk(
  "gallery/searchGallery",
  async (
    {
      q,
      limit = 20,
      page = 1,
    },
    { rejectWithValue }
  ) => {
    try {
      if (!q?.trim()) {
        return rejectWithValue(
          "Search query is required"
        );
      }

      const params = new URLSearchParams();

      params.append("q", q.trim());
      params.append("limit", limit);
      params.append("page", page);

      const response = await api.get(
        `/gallery/search?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Search Gallery Error:",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to search gallery"
      );
    }
  }
);

// GET GALLERY CATEGORIES
// GET /api/gallery/categories
export const getGalleryCategories =
  createAsyncThunk(
    "gallery/getGalleryCategories",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(
          "/gallery/categories"
        );

        return response.data;
      } catch (error) {
        console.error(
          "Get Gallery Categories Error:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch gallery categories"
        );
      }
    }
  );

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  // ADMIN
  adminGallery: [],
  adminGalleryCount: 0,
  adminGalleryStats: null,

  // CURRENT / SELECTED
  currentGalleryImage: null,
  selectedGallery: null,

  // USER
  gallery: [],
  userGallery: [],
  userGalleryCount: 0,
  userGalleryTotal: 0,
  userGalleryTotalPages: 0,
  userGalleryPage: 1,

  // FEATURED
  featuredGallery: [],

  // CATEGORY
  galleryCategories: [],
  categoryGallery: [],

  // SEARCH
  searchResults: [],

  // GENERAL
  count: 0,
  total: 0,
  page: 1,
  totalPages: 1,
  category: "",
  query: "",

  // LOADING
  loading: false,
  galleryLoading: false,
  singleLoading: false,
  featuredLoading: false,
  categoryLoading: false,
  searchLoading: false,
  categoriesLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  bulkDeleteLoading: false,

  // ERRORS
  error: null,
  galleryError: null,
  singleError: null,
  featuredError: null,
  categoryError: null,
  searchError: null,
  categoriesError: null,

  createError: null,
  updateError: null,
  deleteError: null,

  // SUCCESS
  successMessage: null,
};

// ============================================================
// SLICE
// ============================================================

const gallerySlice = createSlice({
  name: "gallery",
  initialState,

  reducers: {
    clearGalleryMessages: (state) => {
      state.error = null;
      state.galleryError = null;
      state.singleError = null;
      state.featuredError = null;
      state.categoryError = null;
      state.searchError = null;
      state.categoriesError = null;

      state.createError = null;
      state.updateError = null;
      state.deleteError = null;

      state.successMessage = null;
    },

    clearCurrentGalleryImage: (state) => {
      state.currentGalleryImage = null;
      state.selectedGallery = null;
    },

    resetUserGallery: (state) => {
      state.gallery = [];
      state.userGallery = [];

      state.userGalleryCount = 0;
      state.userGalleryTotal = 0;
      state.userGalleryTotalPages = 0;
      state.userGalleryPage = 1;

      state.count = 0;
      state.total = 0;
      state.page = 1;
      state.totalPages = 1;
      state.category = "";
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchResults = [];
      state.searchError = null;
      state.query = "";
    },
  },

  extraReducers: (builder) => {
    // ========================================================
    // CREATE GALLERY
    // ========================================================

    builder

      .addCase(
        createGalleryImage.pending,
        (state) => {
          state.createLoading = true;
          state.createError = null;
          state.successMessage = null;
        }
      )

      .addCase(
        createGalleryImage.fulfilled,
        (state, action) => {
          state.createLoading = false;

          const newImage =
            action.payload?.data;

          if (newImage) {
            state.adminGallery = [
              newImage,
              ...state.adminGallery,
            ];

            state.adminGalleryCount += 1;
          }

          state.successMessage =
            action.payload?.message ||
            "Gallery image created successfully";
        }
      )

      .addCase(
        createGalleryImage.rejected,
        (state, action) => {
          state.createLoading = false;

          state.createError =
            action.payload ||
            "Failed to create gallery image";
        }
      )

      // ======================================================
      // GET ALL ADMIN GALLERY
      // ======================================================

      .addCase(
        getAllGalleryAdmin.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getAllGalleryAdmin.fulfilled,
        (state, action) => {
          state.loading = false;

          state.adminGallery =
            action.payload?.data || [];

          state.adminGalleryCount =
            action.payload?.count ||
            state.adminGallery.length;
        }
      )

      .addCase(
        getAllGalleryAdmin.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch gallery images";
        }
      )

      // ======================================================
      // GET ADMIN GALLERY BY ID
      // ======================================================

      .addCase(
        getGalleryByIdAdmin.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getGalleryByIdAdmin.fulfilled,
        (state, action) => {
          state.loading = false;

          state.currentGalleryImage =
            action.payload?.data || null;
        }
      )

      .addCase(
        getGalleryByIdAdmin.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch gallery image";
        }
      )

      // ======================================================
      // UPDATE GALLERY
      // ======================================================

      .addCase(
        updateGalleryImage.pending,
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
          state.successMessage = null;
        }
      )

      .addCase(
        updateGalleryImage.fulfilled,
        (state, action) => {
          state.updateLoading = false;

          const updatedImage =
            action.payload?.data;

          if (updatedImage) {
            const index =
              state.adminGallery.findIndex(
                (img) =>
                  img._id ===
                    updatedImage._id ||
                  img.id === updatedImage.id
              );

            if (index !== -1) {
              state.adminGallery[index] =
                updatedImage;
            }

            state.currentGalleryImage =
              updatedImage;
          }

          state.successMessage =
            action.payload?.message ||
            "Gallery image updated successfully";
        }
      )

      .addCase(
        updateGalleryImage.rejected,
        (state, action) => {
          state.updateLoading = false;

          state.updateError =
            action.payload ||
            "Failed to update gallery image";
        }
      )

      // ======================================================
      // DELETE GALLERY
      // ======================================================

      .addCase(
        deleteGalleryImage.pending,
        (state) => {
          state.deleteLoading = true;
          state.deleteError = null;
          state.successMessage = null;
        }
      )

      .addCase(
        deleteGalleryImage.fulfilled,
        (state, action) => {
          state.deleteLoading = false;

          const deletedId =
            action.payload?.id;

          if (deletedId) {
            state.adminGallery =
              state.adminGallery.filter(
                (img) =>
                  img._id !== deletedId &&
                  img.id !== deletedId
              );

            state.adminGalleryCount =
              Math.max(
                0,
                state.adminGalleryCount - 1
              );

            if (
              state.currentGalleryImage?._id ===
                deletedId ||
              state.currentGalleryImage?.id ===
                deletedId
            ) {
              state.currentGalleryImage = null;
            }
          }

          state.successMessage =
            action.payload?.message ||
            "Gallery image deleted successfully";
        }
      )

      .addCase(
        deleteGalleryImage.rejected,
        (state, action) => {
          state.deleteLoading = false;

          state.deleteError =
            action.payload ||
            "Failed to delete gallery image";
        }
      )

      // ======================================================
      // TOGGLE STATUS
      // ======================================================

      .addCase(
        toggleGalleryStatus.fulfilled,
        (state, action) => {
          const updatedImage =
            action.payload?.data;

          if (updatedImage) {
            const index =
              state.adminGallery.findIndex(
                (img) =>
                  img._id ===
                    updatedImage._id ||
                  img.id === updatedImage.id
              );

            if (index !== -1) {
              state.adminGallery[index] =
                updatedImage;
            }

            state.currentGalleryImage =
              updatedImage;
          }

          state.successMessage =
            action.payload?.message ||
            "Gallery status toggled successfully";
        }
      )

      .addCase(
        toggleGalleryStatus.rejected,
        (state, action) => {
          state.error =
            action.payload ||
            "Failed to toggle gallery status";
        }
      )

      // ======================================================
      // TOGGLE FEATURED
      // ======================================================

      .addCase(
        toggleGalleryFeatured.fulfilled,
        (state, action) => {
          const updatedImage =
            action.payload?.data;

          if (updatedImage) {
            const index =
              state.adminGallery.findIndex(
                (img) =>
                  img._id ===
                    updatedImage._id ||
                  img.id === updatedImage.id
              );

            if (index !== -1) {
              state.adminGallery[index] =
                updatedImage;
            }

            state.currentGalleryImage =
              updatedImage;
          }

          state.successMessage =
            action.payload?.message ||
            "Featured status toggled successfully";
        }
      )

      .addCase(
        toggleGalleryFeatured.rejected,
        (state, action) => {
          state.error =
            action.payload ||
            "Failed to toggle featured status";
        }
      )

      // ======================================================
      // BULK DELETE
      // ======================================================

      .addCase(
        bulkDeleteGallery.pending,
        (state) => {
          state.bulkDeleteLoading = true;
          state.deleteError = null;
          state.successMessage = null;
        }
      )

      .addCase(
        bulkDeleteGallery.fulfilled,
        (state, action) => {
          state.bulkDeleteLoading = false;

          state.successMessage =
            action.payload?.message ||
            "Gallery images deleted successfully";
        }
      )

      .addCase(
        bulkDeleteGallery.rejected,
        (state, action) => {
          state.bulkDeleteLoading = false;

          state.deleteError =
            action.payload ||
            "Failed to delete gallery images";
        }
      )

      // ======================================================
      // ADMIN STATS
      // ======================================================

      .addCase(
        getGalleryStats.fulfilled,
        (state, action) => {
          state.adminGalleryStats =
            action.payload?.data || null;
        }
      )

      .addCase(
        getGalleryStats.rejected,
        (state, action) => {
          state.error =
            action.payload ||
            "Failed to fetch gallery statistics";
        }
      )

      // ======================================================
      // USER - GET ALL GALLERY
      // ======================================================

      .addCase(
        getGallery.pending,
        (state) => {
          state.loading = true;
          state.galleryLoading = true;

          state.error = null;
          state.galleryError = null;
        }
      )

      .addCase(
        getGallery.fulfilled,
        (state, action) => {
          state.loading = false;
          state.galleryLoading = false;

          const data =
            action.payload?.data || [];

          state.gallery = data;

          // Keep both names if your components
          // are using either one.
          state.userGallery = data;

          state.count =
            action.payload?.count || 0;

          state.userGalleryCount =
            action.payload?.count || 0;

          state.total =
            action.payload?.total || 0;

          state.userGalleryTotal =
            action.payload?.total || 0;

          state.page =
            action.payload?.page || 1;

          state.userGalleryPage =
            action.payload?.page || 1;

          state.totalPages =
            action.payload?.totalPages || 1;

          state.userGalleryTotalPages =
            action.payload?.totalPages || 1;

          state.category =
            action.meta.arg?.category || "";

          state.error = null;
          state.galleryError = null;
        }
      )

      .addCase(
        getGallery.rejected,
        (state, action) => {
          state.loading = false;
          state.galleryLoading = false;

          state.gallery = [];
          state.userGallery = [];

          state.error =
            action.payload ||
            "Failed to fetch gallery images";

          state.galleryError =
            state.error;
        }
      )

      // ======================================================
      // USER - SINGLE GALLERY
      // ======================================================

      .addCase(
        getGalleryById.pending,
        (state) => {
          state.singleLoading = true;
          state.singleError = null;
        }
      )

      .addCase(
        getGalleryById.fulfilled,
        (state, action) => {
          state.singleLoading = false;

          state.selectedGallery =
            action.payload?.data ||
            null;

          state.currentGalleryImage =
            action.payload?.data ||
            null;

          state.singleError = null;
        }
      )

      .addCase(
        getGalleryById.rejected,
        (state, action) => {
          state.singleLoading = false;

          state.selectedGallery = null;
          state.currentGalleryImage = null;

          state.singleError =
            action.payload ||
            "Failed to fetch gallery image";
        }
      )

      // ======================================================
      // FEATURED GALLERY
      // ======================================================

      .addCase(
        getFeaturedGallery.pending,
        (state) => {
          state.featuredLoading = true;
          state.featuredError = null;
        }
      )

      .addCase(
        getFeaturedGallery.fulfilled,
        (state, action) => {
          state.featuredLoading = false;

          state.featuredGallery =
            action.payload?.data || [];

          state.featuredError = null;
        }
      )

      .addCase(
        getFeaturedGallery.rejected,
        (state, action) => {
          state.featuredLoading = false;

          state.featuredGallery = [];

          state.featuredError =
            action.payload ||
            "Failed to fetch featured gallery";
        }
      )

      // ======================================================
      // GALLERY BY CATEGORY
      // ======================================================

      .addCase(
        getGalleryByCategory.pending,
        (state) => {
          state.categoryLoading = true;
          state.categoryError = null;
        }
      )

      .addCase(
        getGalleryByCategory.fulfilled,
        (state, action) => {
          state.categoryLoading = false;

          state.categoryGallery =
            action.payload?.data || [];

          state.count =
            action.payload?.count || 0;

          state.total =
            action.payload?.total || 0;

          state.page =
            action.payload?.page || 1;

          state.totalPages =
            action.payload?.totalPages || 1;

          state.category =
            action.payload?.category ||
            action.meta.arg?.category ||
            "";

          state.categoryError = null;
        }
      )

      .addCase(
        getGalleryByCategory.rejected,
        (state, action) => {
          state.categoryLoading = false;

          state.categoryGallery = [];

          state.categoryError =
            action.payload ||
            "Failed to fetch gallery by category";
        }
      )

      // ======================================================
      // SEARCH GALLERY
      // ======================================================

      .addCase(
        searchGallery.pending,
        (state) => {
          state.searchLoading = true;
          state.searchError = null;
        }
      )

      .addCase(
        searchGallery.fulfilled,
        (state, action) => {
          state.searchLoading = false;

          state.searchResults =
            action.payload?.data || [];

          state.count =
            action.payload?.count || 0;

          state.total =
            action.payload?.total || 0;

          state.page =
            action.payload?.page || 1;

          state.totalPages =
            action.payload?.totalPages || 1;

          state.query =
            action.payload?.query ||
            action.meta.arg?.q ||
            "";

          state.searchError = null;
        }
      )

      .addCase(
        searchGallery.rejected,
        (state, action) => {
          state.searchLoading = false;

          state.searchResults = [];

          state.searchError =
            action.payload ||
            "Failed to search gallery";
        }
      )

      // ======================================================
      // GALLERY CATEGORIES
      // ======================================================

      .addCase(
        getGalleryCategories.pending,
        (state) => {
          state.categoriesLoading = true;
          state.categoriesError = null;
        }
      )

      .addCase(
        getGalleryCategories.fulfilled,
        (state, action) => {
          state.categoriesLoading = false;

          state.galleryCategories =
            action.payload?.data || [];

          state.categoriesError = null;
        }
      )

      .addCase(
        getGalleryCategories.rejected,
        (state, action) => {
          state.categoriesLoading = false;

          state.galleryCategories = [];

          state.categoriesError =
            action.payload ||
            "Failed to fetch gallery categories";
        }
      );
  },
});

// ============================================================
// ACTIONS
// ============================================================

export const {
  clearGalleryMessages,
  clearCurrentGalleryImage,
  resetUserGallery,
  clearSearchResults,
} = gallerySlice.actions;

// ============================================================
// REDUCER
// ============================================================

export default gallerySlice.reducer;

