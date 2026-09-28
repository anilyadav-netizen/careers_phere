
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// BUY SUBSCRIPTION
// POST /api/subscriptions/buy
// =====================================================

export const buySubscription = createAsyncThunk(
  "userSubscription/buySubscription",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/subscriptions/buy",
        subscriptionData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to purchase subscription"
      );
    }
  }
);

// =====================================================
// GET MY SUBSCRIPTION
// GET /api/subscriptions/my-subscription
// =====================================================

export const getMySubscription = createAsyncThunk(
  "userSubscription/getMySubscription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/subscriptions/my-subscription"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch subscription"
      );
    }
  }
);

// =====================================================
// GET SUBSCRIPTION HISTORY
// GET /api/subscriptions/history
// =====================================================

export const getSubscriptionHistory = createAsyncThunk(
  "userSubscription/getSubscriptionHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/subscriptions/history"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch subscription history"
      );
    }
  }
);

// =====================================================
// CHECK SUBSCRIPTION STATUS
// GET /api/subscriptions/status
// =====================================================

export const checkSubscriptionStatus = createAsyncThunk(
  "userSubscription/checkSubscriptionStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/subscriptions/status"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to check subscription status"
      );
    }
  }
);

// =====================================================
// CANCEL SUBSCRIPTION
// PATCH /api/subscriptions/cancel
// =====================================================

export const cancelSubscription = createAsyncThunk(
  "userSubscription/cancelSubscription",
  async (cancellationReason, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/subscriptions/cancel",
        {
          cancellationReason:
            cancellationReason ||
            "User requested cancellation",
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel subscription"
      );
    }
  }
);

// =====================================================
// TOGGLE AUTO RENEW
// PATCH /api/subscriptions/auto-renew
// =====================================================

export const toggleAutoRenew = createAsyncThunk(
  "userSubscription/toggleAutoRenew",
  async (autoRenew, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/subscriptions/auto-renew",
        {
          autoRenew,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update auto-renew"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  mySubscription: null,
  subscriptionHistory: [],
  status: null,

  loading: false,
  purchaseLoading: false,
  historyLoading: false,
  statusLoading: false,
  cancelLoading: false,
  autoRenewLoading: false,

  error: null,
  purchaseError: null,
  historyError: null,
  statusError: null,
  cancelError: null,
  autoRenewError: null,

  purchaseSuccess: false,
  cancelSuccess: false,
};

// =====================================================
// SLICE
// =====================================================

const userSubscriptionSlice = createSlice({
  name: "userSubscription",

  initialState,

  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
      state.purchaseError = null;
      state.historyError = null;
      state.statusError = null;
      state.cancelError = null;
      state.autoRenewError = null;
    },

    clearPurchaseSuccess: (state) => {
      state.purchaseSuccess = false;
    },

    clearCancelSuccess: (state) => {
      state.cancelSuccess = false;
    },

    resetUserSubscription: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // BUY SUBSCRIPTION
      // =================================================

      .addCase(buySubscription.pending, (state) => {
        state.purchaseLoading = true;
        state.purchaseError = null;
        state.purchaseSuccess = false;
      })

      .addCase(buySubscription.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseError = null;
        state.purchaseSuccess = true;

        if (action.payload?.data?.subscription) {
          state.mySubscription =
            action.payload.data.subscription;
        }
      })

      .addCase(buySubscription.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseError =
          action.payload ||
          "Failed to purchase subscription";
      })

      // =================================================
      // GET MY SUBSCRIPTION
      // =================================================

      .addCase(getMySubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMySubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.mySubscription =
          action.payload?.data || null;
      })

      .addCase(getMySubscription.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed to fetch subscription";

        state.mySubscription = null;
      })

      // =================================================
      // GET SUBSCRIPTION HISTORY
      // =================================================

      .addCase(getSubscriptionHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })

      .addCase(
        getSubscriptionHistory.fulfilled,
        (state, action) => {
          state.historyLoading = false;
          state.historyError = null;

          state.subscriptionHistory =
            Array.isArray(action.payload?.data)
              ? action.payload.data
              : [];
        }
      )

      .addCase(
        getSubscriptionHistory.rejected,
        (state, action) => {
          state.historyLoading = false;

          state.historyError =
            action.payload ||
            "Failed to fetch subscription history";

          state.subscriptionHistory = [];
        }
      )

      // =================================================
      // CHECK SUBSCRIPTION STATUS
      // =================================================

      .addCase(
        checkSubscriptionStatus.pending,
        (state) => {
          state.statusLoading = true;
          state.statusError = null;
        }
      )

      .addCase(
        checkSubscriptionStatus.fulfilled,
        (state, action) => {
          state.statusLoading = false;
          state.statusError = null;

          state.status = action.payload;
        }
      )

      .addCase(
        checkSubscriptionStatus.rejected,
        (state, action) => {
          state.statusLoading = false;

          state.statusError =
            action.payload ||
            "Failed to check subscription status";

          state.status = null;
        }
      )

      // =================================================
      // CANCEL SUBSCRIPTION
      // =================================================

      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
        state.cancelSuccess = false;
      })

      .addCase(cancelSubscription.fulfilled, (state) => {
        state.cancelLoading = false;
        state.cancelError = null;
        state.cancelSuccess = true;

        // Active subscription cancelled
        state.mySubscription = null;

        if (state.status) {
          state.status = {
            ...state.status,
            hasActiveSubscription: false,
          };
        }
      })

      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;

        state.cancelError =
          action.payload ||
          "Failed to cancel subscription";
      })

      // =================================================
      // TOGGLE AUTO RENEW
      // =================================================

      .addCase(toggleAutoRenew.pending, (state) => {
        state.autoRenewLoading = true;
        state.autoRenewError = null;
      })

      .addCase(
        toggleAutoRenew.fulfilled,
        (state, action) => {
          state.autoRenewLoading = false;
          state.autoRenewError = null;

          const autoRenew =
            action.payload?.data?.autoRenew;

          // Update my subscription
          if (state.mySubscription) {
            state.mySubscription.autoRenew =
              autoRenew;
          }

          // Update status
          if (state.status?.data) {
            state.status.data.autoRenew =
              autoRenew;
          }
        }
      )

      .addCase(
        toggleAutoRenew.rejected,
        (state, action) => {
          state.autoRenewLoading = false;

          state.autoRenewError =
            action.payload ||
            "Failed to update auto-renew";
        }
      );
  },
});

// =====================================================
// EXPORT ACTIONS
// =====================================================

export const {
  clearSubscriptionError,
  clearPurchaseSuccess,
  clearCancelSuccess,
  resetUserSubscription,
} = userSubscriptionSlice.actions;

// =====================================================
// EXPORT REDUCER
// =====================================================

export default userSubscriptionSlice.reducer;

