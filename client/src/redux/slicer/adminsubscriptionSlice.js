// src/redux/slicer/adminsubscriptionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// ============ ADMIN THUNKS ============

// @desc    Get all subscriptions (Admin)
// @route   GET /api/admin/subscriptions
export const getAllSubscriptionsAdmin = createAsyncThunk(
    "subscription/getAllSubscriptionsAdmin",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/subscriptions", { params });
            console.log("Get All Subscriptions Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get All Subscriptions Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch subscriptions"
            );
        }
    }
);

// @desc    Get single subscription (Admin)
// @route   GET /api/admin/subscriptions/:id
export const getSubscriptionByIdAdmin = createAsyncThunk(
    "subscription/getSubscriptionByIdAdmin",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/subscriptions/${id}`);
            console.log("Get Subscription By ID Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get Subscription By ID Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch subscription"
            );
        }
    }
);

// @desc    Create subscription (Admin)
// @route   POST /api/admin/subscriptions
export const createSubscription = createAsyncThunk(
    "subscription/createSubscription",
    async (subscriptionData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/subscriptions", subscriptionData);
            console.log("Create Subscription Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Create Subscription Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to create subscription"
            );
        }
    }
);

// @desc    Update subscription (Admin)
// @route   PUT /api/admin/subscriptions/:id
export const updateSubscription = createAsyncThunk(
    "subscription/updateSubscription",
    async ({ id, subscriptionData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/subscriptions/${id}`, subscriptionData);
            console.log("Update Subscription Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update Subscription Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to update subscription"
            );
        }
    }
);

// @desc    Delete subscription (Admin)
// @route   DELETE /api/admin/subscriptions/:id
export const deleteSubscription = createAsyncThunk(
    "subscription/deleteSubscription",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/subscriptions/${id}`);
            return {
                ...response.data,
                id,
            };
        } catch (error) {
            console.error("Delete Subscription Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete subscription"
            );
        }
    }
);

// @desc    Toggle subscription active status
// @route   PATCH /api/admin/subscriptions/:id/toggle-active
export const toggleSubscriptionStatus = createAsyncThunk(
    "subscription/toggleSubscriptionStatus",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/subscriptions/${id}/toggle-active`);
            console.log("Toggle Status Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Toggle Status Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle subscription status"
            );
        }
    }
);

// ============ SLICE ============

const initialState = {
    // Admin states
    adminSubscriptions: [],
    adminSubscriptionsCount: 0,
    revenue: 0,
    completedPurchases: 0,
    currentSubscription: null,
    
    // UI states
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    toggleLoading: false,
    error: null,
    createError: null,
    updateError: null,
    deleteError: null,
    successMessage: null,
};

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        clearSubscriptionMessages: (state) => {
            state.error = null;
            state.createError = null;
            state.updateError = null;
            state.deleteError = null;
            state.successMessage = null;
        },
        clearCurrentSubscription: (state) => {
            state.currentSubscription = null;
        },
    },
    extraReducers: (builder) => {
        // ============ GET ALL SUBSCRIPTIONS ADMIN ============
        builder
            .addCase(getAllSubscriptionsAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubscriptionsAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminSubscriptions = action.payload?.data || [];
                state.adminSubscriptionsCount = action.payload?.count || state.adminSubscriptions.length;
                state.revenue = action.payload?.metrics?.revenue || 0;
                state.completedPurchases = action.payload?.metrics?.completedPurchases || 0;
                console.log("Admin Subscriptions updated:", state.adminSubscriptions);
            })
            .addCase(getAllSubscriptionsAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch subscriptions";
            })

        // ============ GET SUBSCRIPTION BY ID ADMIN ============
        .addCase(getSubscriptionByIdAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.currentSubscription = null;
        })
        .addCase(getSubscriptionByIdAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.currentSubscription = action.payload?.data || null;
            console.log("Current Subscription set:", state.currentSubscription);
        })
        .addCase(getSubscriptionByIdAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch subscription";
            state.currentSubscription = null;
        })

        // ============ CREATE SUBSCRIPTION ============
        .addCase(createSubscription.pending, (state) => {
            state.createLoading = true;
            state.createError = null;
            state.successMessage = null;
        })
        .addCase(createSubscription.fulfilled, (state, action) => {
            state.createLoading = false;
            const newSubscription = action.payload?.data;
            if (newSubscription) {
                state.adminSubscriptions = [newSubscription, ...state.adminSubscriptions];
                state.adminSubscriptionsCount += 1;
            }
            state.successMessage = action.payload?.message || "Subscription created successfully";
        })
        .addCase(createSubscription.rejected, (state, action) => {
            state.createLoading = false;
            state.createError = action.payload || "Failed to create subscription";
        })

        // ============ UPDATE SUBSCRIPTION ============
        .addCase(updateSubscription.pending, (state) => {
            state.updateLoading = true;
            state.updateError = null;
            state.successMessage = null;
        })
        .addCase(updateSubscription.fulfilled, (state, action) => {
            state.updateLoading = false;
            const updatedSubscription = action.payload?.data;
            if (updatedSubscription) {
                const index = state.adminSubscriptions.findIndex(
                    (sub) => sub._id === updatedSubscription._id || sub.id === updatedSubscription.id
                );
                if (index !== -1) {
                    state.adminSubscriptions[index] = updatedSubscription;
                }
                state.currentSubscription = updatedSubscription;
            }
            state.successMessage = action.payload?.message || "Subscription updated successfully";
        })
        .addCase(updateSubscription.rejected, (state, action) => {
            state.updateLoading = false;
            state.updateError = action.payload || "Failed to update subscription";
        })

        // ============ DELETE SUBSCRIPTION ============
        .addCase(deleteSubscription.pending, (state) => {
            state.deleteLoading = true;
            state.deleteError = null;
            state.successMessage = null;
        })
        .addCase(deleteSubscription.fulfilled, (state, action) => {
            state.deleteLoading = false;
            const deletedId = action.payload?.id;
            if (deletedId) {
                state.adminSubscriptions = state.adminSubscriptions.filter(
                    (sub) => sub._id !== deletedId && sub.id !== deletedId
                );
                state.adminSubscriptionsCount = Math.max(0, state.adminSubscriptionsCount - 1);
                if (state.currentSubscription?._id === deletedId || state.currentSubscription?.id === deletedId) {
                    state.currentSubscription = null;
                }
            }
            state.successMessage = action.payload?.message || "Subscription deleted successfully";
        })
        .addCase(deleteSubscription.rejected, (state, action) => {
            state.deleteLoading = false;
            state.deleteError = action.payload || "Failed to delete subscription";
        })

        // ============ TOGGLE SUBSCRIPTION STATUS ============
        .addCase(toggleSubscriptionStatus.pending, (state) => {
            state.toggleLoading = true;
            state.error = null;
            state.successMessage = null;
        })
        .addCase(toggleSubscriptionStatus.fulfilled, (state, action) => {
            state.toggleLoading = false;
            const updatedSubscription = action.payload?.data;
            if (updatedSubscription) {
                const index = state.adminSubscriptions.findIndex(
                    (sub) => sub._id === updatedSubscription._id || sub.id === updatedSubscription.id
                );
                if (index !== -1) {
                    state.adminSubscriptions[index] = updatedSubscription;
                }
                if (state.currentSubscription?._id === updatedSubscription._id || 
                    state.currentSubscription?.id === updatedSubscription.id) {
                    state.currentSubscription = updatedSubscription;
                }
            }
            state.successMessage = action.payload?.message || "Subscription status toggled successfully";
        })
        .addCase(toggleSubscriptionStatus.rejected, (state, action) => {
            state.toggleLoading = false;
            state.error = action.payload || "Failed to toggle subscription status";
        });
    },
});

export const {
    clearSubscriptionMessages,
    clearCurrentSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
