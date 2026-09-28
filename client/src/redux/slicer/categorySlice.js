
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

/* =========================================================
   ADMIN - GET ALL CATEGORIES
   GET /api/admin/categories
========================================================= */

export const getAdminCategories = createAsyncThunk(
  "categories/getAdminCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/categories");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    }
  }
);


/* =========================================================
   ADMIN - CREATE CATEGORY
   POST /api/admin/categories
========================================================= */

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/admin/categories",
        formData,
        {
          headers: {
            "Content-Type": null,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Create category error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create category"
      );
    }
  }
);


/* =========================================================
   ADMIN - UPDATE CATEGORY
   PUT /api/admin/categories/:id
========================================================= */

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/categories/${id}`,
        formData,
        {
          headers: {
            "Content-Type": null,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Update category error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update category"
      );
    }
  }
);


/* =========================================================
   ADMIN - DELETE CATEGORY
   DELETE /api/admin/categories/:id
========================================================= */

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/categories/${id}`
      );

      return {
        id,
        ...response.data,
      };
    } catch (error) {
      console.error(
        "Delete category error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  }
);


/* =========================================================
   ADMIN - TOGGLE CATEGORY STATUS
   PATCH /api/admin/categories/:id/toggle
========================================================= */

export const toggleCategoryStatus = createAsyncThunk(
  "categories/toggleCategoryStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/categories/${id}/toggle`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update category status"
      );
    }
  }
);


/* =========================================================
   USER - GET ALL ACTIVE CATEGORIES
   GET /api/categories
========================================================= */

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    }
  }
);


/* =========================================================
   USER - GET CATEGORY BY ID
   GET /api/categories/:id
========================================================= */

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/categories/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch category"
      );
    }
  }
);


/* =========================================================
   USER - GET CATEGORY BY SLUG
   GET /api/categories/slug/:slug
========================================================= */

export const getCategoryBySlug = createAsyncThunk(
  "categories/getCategoryBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/categories/slug/${slug}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch category"
      );
    }
  }
);


/* =========================================================
   USER - SEARCH CATEGORIES
   GET /api/categories/search?query=...
========================================================= */

export const searchCategories = createAsyncThunk(
  "categories/searchCategories",
  async (query, { rejectWithValue }) => {
    try {
      if (!query?.trim()) {
        return rejectWithValue(
          "Search query is required"
        );
      }

      const response = await api.get(
        `/categories/search?query=${encodeURIComponent(
          query.trim()
        )}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to search categories"
      );
    }
  }
);


/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  // Common categories list
  categories: [],

  // Single category
  category: null,

  // Search results
  searchResults: [],

  // Count
  count: 0,

  // Loading states
  loading: false,
  categoryLoading: false,
  searchLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  toggleLoading: false,

  // Errors
  error: null,
  categoryError: null,
  searchError: null,

  // Success
  success: false,
  message: "",
};


/* =========================================================
   SLICE
========================================================= */

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    clearCategoryError: (state) => {
      state.categoryError = null;
    },

    clearSearchError: (state) => {
      state.searchError = null;
    },

    clearCategoryMessage: (state) => {
      state.message = "";
      state.success = false;
    },

    clearCategoryState: (state) => {
      state.error = null;
      state.categoryError = null;
      state.searchError = null;
      state.message = "";
      state.success = false;
    },

    clearCategory: (state) => {
      state.category = null;
      state.categoryError = null;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
  },


  /* =======================================================
     EXTRA REDUCERS
  ======================================================= */

  extraReducers: (builder) => {

    /* =====================================================
       ADMIN - GET ALL CATEGORIES
    ===================================================== */

    builder
      .addCase(getAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAdminCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories =
          action.payload?.data || [];

        state.count =
          action.payload?.count ||
          action.payload?.data?.length ||
          0;

        state.error = null;
      })

      .addCase(getAdminCategories.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to fetch categories";
      });


    /* =====================================================
       ADMIN - CREATE CATEGORY
    ===================================================== */

    builder
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.createLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Category created successfully";

        if (action.payload?.data) {
          state.categories.unshift(
            action.payload.data
          );
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.createLoading = false;

        state.error =
          action.payload ||
          "Failed to create category";

        state.success = false;
      });


    /* =====================================================
       ADMIN - UPDATE CATEGORY
    ===================================================== */

    builder
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Category updated successfully";

        const updatedCategory =
          action.payload?.data;

        if (updatedCategory) {
          const index =
            state.categories.findIndex(
              (cat) =>
                cat._id === updatedCategory._id ||
                cat.id === updatedCategory.id
            );

          if (index !== -1) {
            state.categories[index] =
              updatedCategory;
          }
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.updateLoading = false;

        state.error =
          action.payload ||
          "Failed to update category";

        state.success = false;
      });


    /* =====================================================
       ADMIN - DELETE CATEGORY
    ===================================================== */

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Category deleted successfully";

        state.categories =
          state.categories.filter(
            (cat) =>
              cat._id !== action.payload.id &&
              cat.id !== action.payload.id
          );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;

        state.error =
          action.payload ||
          "Failed to delete category";

        state.success = false;
      });


    /* =====================================================
       ADMIN - TOGGLE STATUS
    ===================================================== */

    builder
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.toggleLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Category status updated";

        const updatedCategory =
          action.payload?.data;

        if (updatedCategory) {
          const index =
            state.categories.findIndex(
              (cat) =>
                cat._id === updatedCategory._id ||
                cat.id === updatedCategory.id
            );

          if (index !== -1) {
            state.categories[index] =
              updatedCategory;
          }
        }
      })

      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.toggleLoading = false;

        state.error =
          action.payload ||
          "Failed to update category status";

        state.success = false;
      });


    /* =====================================================
       USER - GET ALL CATEGORIES
    ===================================================== */

    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories =
          action.payload?.data || [];

        state.count =
          action.payload?.count ||
          action.payload?.data?.length ||
          0;

        state.error = null;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to fetch categories";
      });


    /* =====================================================
       USER - GET CATEGORY BY ID
    ===================================================== */

    builder
      .addCase(getCategoryById.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categoryLoading = false;

        state.category =
          action.payload?.data || null;

        state.categoryError = null;
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.categoryLoading = false;

        state.categoryError =
          action.payload ||
          "Failed to fetch category";
      });


    /* =====================================================
       USER - GET CATEGORY BY SLUG
    ===================================================== */

    builder
      .addCase(getCategoryBySlug.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.categoryLoading = false;

        state.category =
          action.payload?.data || null;

        state.categoryError = null;
      })

      .addCase(getCategoryBySlug.rejected, (state, action) => {
        state.categoryLoading = false;

        state.categoryError =
          action.payload ||
          "Failed to fetch category";
      });


    /* =====================================================
       USER - SEARCH CATEGORIES
    ===================================================== */

    builder
      .addCase(searchCategories.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })

      .addCase(searchCategories.fulfilled, (state, action) => {
        state.searchLoading = false;

        state.searchResults =
          action.payload?.data || [];

        state.searchError = null;
      })

      .addCase(searchCategories.rejected, (state, action) => {
        state.searchLoading = false;

        state.searchResults = [];

        state.searchError =
          action.payload ||
          "Failed to search categories";
      });
  },
});


/* =========================================================
   ACTIONS
========================================================= */

export const {
  clearCategoryError,
  clearSearchError,
  clearCategoryMessage,
  clearCategoryState,
  clearCategory,
  clearSearchResults,
} = categorySlice.actions;


/* =========================================================
   REDUCER
========================================================= */

export default categorySlice.reducer;

