import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// Helper to resolve stream URL dynamically from configured api baseURL
export const resolveStreamUrl = () => {
  const baseURL = api.defaults.baseURL || "/api";
  const serverOrigin = baseURL.replace(/\/api\/?$/, "");
  return serverOrigin ? `${serverOrigin}/api/video/stream` : "/api/video/stream";
};

// =====================================================
// ASYNC THUNKS
// =====================================================

export const fetchVideoMeta = createAsyncThunk(
  "video/fetchMeta",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/video/meta");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch video metadata"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  streamUrl: resolveStreamUrl(),
  fallbackUrl: "/long-vdo.mp4",
  meta: null,
  loading: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    refreshUrls: (state) => {
      state.streamUrl = resolveStreamUrl();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoMeta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoMeta.fulfilled, (state, action) => {
        state.loading = false;
        state.meta = action.payload;
      })
      .addCase(fetchVideoMeta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load video metadata";
      });
  },
});

export const { refreshUrls } = videoSlice.actions;
export default videoSlice.reducer;
