import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../api";

// ============================================================
// REGISTER
// ============================================================

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// ============================================================
// LOGIN
// ============================================================

export const loginUser = createAsyncThunk(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// ============================================================
// GET PROFILE
// ============================================================

export const getProfile = createAsyncThunk(
  "auth/getProfile",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// ============================================================
// UPDATE COMPLETE PROFILE
// ============================================================

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",

  async (formData, { rejectWithValue }) => {
    try {
      console.log("Updating profile with data:", formData); // Debugging log
      const response = await api.put("/auth/update/profile", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

// ============================================================
// CHANGE PASSWORD
// ============================================================

export const changePassword = createAsyncThunk(
  "auth/changePassword",

  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/change-password", passwordData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password",
      );
    }
  },
);

// ============================================================
// LOGOUT
// ============================================================

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/logout");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  user: null,

  token: null,

  isAuthenticated: false,

  authInitialized: false,

  loading: false,

  updating: false,

  error: null,

  success: false,

  message: "",
};

// ============================================================
// SLICE
// ============================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuthSuccess: (state) => {
      state.success = false;

      state.message = "";
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutLocal: (state) => {
      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      state.loading = false;

      state.updating = false;

      state.error = null;

      state.success = false;

      state.message = "";
    },
  },

  extraReducers: (builder) => {
    // ======================================================
    // REGISTER
    // ======================================================

    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.error = null;

        state.user = action.payload.data;

        state.token = action.payload.data?.token || null;

        state.isAuthenticated = true;

        state.authInitialized = true;

        state.message = action.payload.message || "Registration successful";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload || "Registration failed";
      });

    // ======================================================
    // LOGIN
    // ======================================================

    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.error = null;

        state.user = action.payload.data || null;

        state.token = action.payload.token || null;

        state.isAuthenticated = true;

        state.authInitialized = true;

        state.message = action.payload.message || "Login successful";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload || "Login failed";
      });

    // ======================================================
    // GET PROFILE
    // ======================================================

    builder

      .addCase(getProfile.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;

        state.user = action.payload.data;

        state.isAuthenticated = true;

        state.authInitialized = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch profile";

        state.user = null;

        state.isAuthenticated = false;

        state.authInitialized = true;
      });

    // ======================================================
    // UPDATE PROFILE
    // ======================================================

    builder

      .addCase(updateProfile.pending, (state) => {
        state.updating = true;

        state.error = null;

        state.success = false;

        state.message = "";
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;

        state.success = true;

        state.error = null;

        // Updated user directly
        // Redux state me set hoga
        state.user = action.payload.data;

        state.isAuthenticated = true;

        state.message =
          action.payload.message || "Profile updated successfully";
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;

        state.success = false;

        state.error = action.payload || "Failed to update profile";
      });

    // ======================================================
    // CHANGE PASSWORD
    // ======================================================

    builder

      .addCase(changePassword.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.error = null;

        if (action.payload.token) {
          state.token = action.payload.token;
        }

        state.message =
          action.payload.message || "Password changed successfully";
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload || "Failed to change password";
      });

    // ======================================================
    // LOGOUT
    // ======================================================

    builder

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.authInitialized = true;

        state.success = true;

        state.error = null;

        state.message = action.payload.message || "Logged out successfully";
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.success = false;

        state.error = action.payload || "Logout failed";
      });
  },
});

// ============================================================
// ACTIONS
// ============================================================

export const { clearAuthError, clearAuthSuccess, setUser, logoutLocal } =
  authSlice.actions;

// ============================================================
// REDUCER
// ============================================================

export default authSlice.reducer;
