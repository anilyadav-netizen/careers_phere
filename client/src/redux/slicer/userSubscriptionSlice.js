import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api"; // apna actual path

// GET /api/subscriptions/ -> public route, saare active plans laata hai
export const fetchAllSubscriptions = createAsyncThunk(
  "userSubscription/fetchAllSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/subscriptions/");
      return data.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch subscriptions",
      );
    }
  },
);

// GET /api/subscriptions/my-subscription -> logged-in user ka current active plan
export const fetchMySubscription = createAsyncThunk(
  "userSubscription/fetchMySubscription",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/subscriptions/my-subscription");
      return data.data;
    } catch (error) {
      // 404 ka matlab "no active subscription" hai, error nahi
      if (error?.response?.status === 404) {
        return null;
      }
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch current subscription",
      );
    }
  },
);

// GET /api/subscriptions/history -> user ki saari past + current subscriptions
export const fetchSubscriptionHistory = createAsyncThunk(
  "userSubscription/fetchSubscriptionHistory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/subscriptions/history");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch subscription history",
      );
    }
  },
);

// PATCH /api/subscriptions/cancel -> current active subscription cancel karna
export const cancelSubscription = createAsyncThunk(
  "userSubscription/cancelSubscription",
  async ({ cancellationReason } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/subscriptions/cancel", {
        cancellationReason,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to cancel subscription",
      );
    }
  },
);

// POST /api/subscriptions/buy -> free plan activation ya manual buy
export const buySubscription = createAsyncThunk(
  "userSubscription/buySubscription",
  async (
    { subscriptionId, paymentMethod, paymentId, autoRenew },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post("/subscriptions/buy", {
        subscriptionId,
        paymentMethod,
        paymentId,
        autoRenew,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to purchase subscription",
      );
    }
  },
);

// POST /api/subscriptions/create-order -> razorpay order create karna
export const createSubscriptionOrder = createAsyncThunk(
  "userSubscription/createSubscriptionOrder",
  async ({ subscriptionId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/subscriptions/create-order", {
        subscriptionId,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create order",
      );
    }
  },
);

// POST /api/subscriptions/verify-payment -> razorpay payment verify + subscription activate
export const verifySubscriptionPayment = createAsyncThunk(
  "userSubscription/verifySubscriptionPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/subscriptions/verify-payment", payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Payment verification failed",
      );
    }
  },
);

const initialState = {
  subscriptions: [],
  fetchLoading: false,
  fetchError: null,

  mySubscription: null,
  myLoading: false,
  myError: null,

  history: [],
  historyLoading: false,
  historyError: null,

  cancelLoading: false,
  cancelError: null,
  cancelSuccess: false,

  buyLoading: false,
  buyError: null,
  buySuccess: false,
  purchasedSubscription: null,

  orderLoading: false,
  orderError: null,
  currentOrder: null,

  verifyLoading: false,
  verifyError: null,
};

const userSubscriptionSlice = createSlice({
  name: "userSubscription",
  initialState,
  reducers: {
    resetBuyState: (state) => {
      state.buyLoading = false;
      state.buyError = null;
      state.buySuccess = false;
      state.purchasedSubscription = null;
      state.orderError = null;
      state.verifyError = null;
    },
    resetCancelState: (state) => {
      state.cancelLoading = false;
      state.cancelError = null;
      state.cancelSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all plans
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      })

      // fetch my current subscription
      .addCase(fetchMySubscription.pending, (state) => {
        state.myLoading = true;
        state.myError = null;
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        state.myLoading = false;
        state.mySubscription = action.payload;
      })
      .addCase(fetchMySubscription.rejected, (state, action) => {
        state.myLoading = false;
        state.myError = action.payload;
      })

      // fetch subscription history
      .addCase(fetchSubscriptionHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchSubscriptionHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchSubscriptionHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      })

      // cancel subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
        state.cancelSuccess = false;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.cancelSuccess = true;
        // current subscription ab active nahi rahi -> UI se hata do
        state.mySubscription = null;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelError = action.payload;
        state.cancelSuccess = false;
      })

      // buy (free / manual)
      .addCase(buySubscription.pending, (state) => {
        state.buyLoading = true;
        state.buyError = null;
        state.buySuccess = false;
      })
      .addCase(buySubscription.fulfilled, (state, action) => {
        state.buyLoading = false;
        state.buySuccess = true;
        state.purchasedSubscription = action.payload;
      })
      .addCase(buySubscription.rejected, (state, action) => {
        state.buyLoading = false;
        state.buyError = action.payload;
        state.buySuccess = false;
      })

      // create razorpay order
      .addCase(createSubscriptionOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(createSubscriptionOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createSubscriptionOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      })

      // verify payment
      .addCase(verifySubscriptionPayment.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
        state.buySuccess = false;
      })
      .addCase(verifySubscriptionPayment.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.buySuccess = true;
        state.purchasedSubscription = action.payload;
      })
      .addCase(verifySubscriptionPayment.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload;
        state.buySuccess = false;
      });
  },
});

export const { resetBuyState, resetCancelState } =
  userSubscriptionSlice.actions;
export default userSubscriptionSlice.reducer;
