// src/redux/slicer/adminUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// ============ ADMIN USER THUNKS ============

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
export const getAllUsersAdmin = createAsyncThunk(
    "adminUser/getAllUsersAdmin",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/users", { params });
            console.log("Get All Users Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get All Users Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

// @desc    Get single user by ID (Admin only)
// @route   GET /api/admin/users/:id
export const getUserByIdAdmin = createAsyncThunk(
    "adminUser/getUserByIdAdmin",
    async (id, { rejectWithValue }) => {
        try {
            if (!id) {
                return rejectWithValue("User ID is required");
            }
            const response = await api.get(`/admin/users/${id}`);
            console.log("Get User By ID Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get User By ID Error:", error);
            if (error.response?.status === 404) {
                return rejectWithValue("User not found");
            }
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

// @desc    Update user by ID (Admin only)
// @route   PUT /api/admin/users/:id
export const updateUserAdmin = createAsyncThunk(
    "adminUser/updateUserAdmin",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/users/${id}`, userData);
            console.log("Update User Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update User Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to update user"
            );
        }
    }
);

// @desc    Delete user by ID (Admin only)
// @route   DELETE /api/admin/users/:id
export const deleteUserAdmin = createAsyncThunk(
    "adminUser/deleteUserAdmin",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/users/${id}`);
            return {
                ...response.data,
                id,
            };
        } catch (error) {
            console.error("Delete User Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete user"
            );
        }
    }
);

// @desc    Bulk delete users (Admin only)
// @route   DELETE /api/admin/users/bulk
export const bulkDeleteUsers = createAsyncThunk(
    "adminUser/bulkDeleteUsers",
    async (ids, { rejectWithValue }) => {
        try {
            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return rejectWithValue("Please provide an array of user IDs");
            }
            const response = await api.delete("/admin/users/bulk", {
                data: { ids },
            });
            return response.data;
        } catch (error) {
            console.error("Bulk Delete Users Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete users"
            );
        }
    }
);

// @desc    Toggle user active status (Admin only)
// @route   PATCH /api/admin/users/:id/toggle-active
export const toggleUserActive = createAsyncThunk(
    "adminUser/toggleUserActive",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/users/${id}/toggle-active`);
            console.log("Toggle User Active Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Toggle User Active Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle user status"
            );
        }
    }
);

// @desc    Toggle user verification status (Admin only)
// @route   PATCH /api/admin/users/:id/toggle-verified
export const toggleUserVerified = createAsyncThunk(
    "adminUser/toggleUserVerified",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/users/${id}/toggle-verified`);
            console.log("Toggle User Verified Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Toggle User Verified Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle user verification"
            );
        }
    }
);

// @desc    Get user statistics (Admin only)
// @route   GET /api/admin/users/stats
export const getUserStats = createAsyncThunk(
    "adminUser/getUserStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/users/stats");
            console.log("Get User Stats Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get User Stats Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user statistics"
            );
        }
    }
);

// ============ SLICE ============

const initialState = {
    // Data states
    users: [],
    currentUser: null,
    userStats: null,
    
    // Pagination
    total: 0,
    page: 1,
    totalPages: 1,
    count: 0,
    
    // Statistics
    statistics: null,
    roleDistribution: [],
    growthData: [],
    
    // UI states
    loading: false,
    fetchLoading: false,
    updateLoading: false,
    deleteLoading: false,
    bulkDeleteLoading: false,
    toggleLoading: false,
    
    // Error states
    error: null,
    fetchError: null,
    updateError: null,
    deleteError: null,
    bulkDeleteError: null,
    
    // Success messages
    successMessage: null,
};

const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState,
    reducers: {
        clearUserMessages: (state) => {
            state.error = null;
            state.fetchError = null;
            state.updateError = null;
            state.deleteError = null;
            state.bulkDeleteError = null;
            state.successMessage = null;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        resetUserState: (state) => {
            state.users = [];
            state.currentUser = null;
            state.userStats = null;
            state.total = 0;
            state.page = 1;
            state.totalPages = 1;
            state.count = 0;
            state.statistics = null;
            state.roleDistribution = [];
            state.growthData = [];
        },
    },
    extraReducers: (builder) => {
        // ============ GET ALL USERS ============
        builder
            .addCase(getAllUsersAdmin.pending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;
            })
            .addCase(getAllUsersAdmin.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.users = action.payload?.data || [];
                state.count = action.payload?.count || 0;
                state.total = action.payload?.total || 0;
                state.page = action.payload?.page || 1;
                state.totalPages = action.payload?.totalPages || 1;
                state.statistics = action.payload?.statistics || null;
                console.log("Users loaded:", state.users.length);
            })
            .addCase(getAllUsersAdmin.rejected, (state, action) => {
                state.fetchLoading = false;
                state.fetchError = action.payload || "Failed to fetch users";
            })

        // ============ GET USER BY ID ============
        .addCase(getUserByIdAdmin.pending, (state) => {
            state.loading = true;
            state.fetchError = null;
            state.currentUser = null;
        })
        .addCase(getUserByIdAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload?.data || null;
            console.log("User loaded:", state.currentUser);
        })
        .addCase(getUserByIdAdmin.rejected, (state, action) => {
            state.loading = false;
            state.fetchError = action.payload || "Failed to fetch user";
            state.currentUser = null;
        })

        // ============ UPDATE USER ============
        .addCase(updateUserAdmin.pending, (state) => {
            state.updateLoading = true;
            state.updateError = null;
            state.successMessage = null;
        })
        .addCase(updateUserAdmin.fulfilled, (state, action) => {
            state.updateLoading = false;
            const updatedUser = action.payload?.data;
            if (updatedUser) {
                // Update in users list
                const index = state.users.findIndex(
                    (user) => user._id === updatedUser._id || user.id === updatedUser.id
                );
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                state.currentUser = updatedUser;
            }
            state.successMessage = action.payload?.message || "User updated successfully";
        })
        .addCase(updateUserAdmin.rejected, (state, action) => {
            state.updateLoading = false;
            state.updateError = action.payload || "Failed to update user";
        })

        // ============ DELETE USER ============
        .addCase(deleteUserAdmin.pending, (state) => {
            state.deleteLoading = true;
            state.deleteError = null;
            state.successMessage = null;
        })
        .addCase(deleteUserAdmin.fulfilled, (state, action) => {
            state.deleteLoading = false;
            const deletedId = action.payload?.id;
            if (deletedId) {
                state.users = state.users.filter(
                    (user) => user._id !== deletedId && user.id !== deletedId
                );
                state.count = Math.max(0, state.count - 1);
                state.total = Math.max(0, state.total - 1);
                if (state.currentUser?._id === deletedId || state.currentUser?.id === deletedId) {
                    state.currentUser = null;
                }
            }
            state.successMessage = action.payload?.message || "User deleted successfully";
        })
        .addCase(deleteUserAdmin.rejected, (state, action) => {
            state.deleteLoading = false;
            state.deleteError = action.payload || "Failed to delete user";
        })

        // ============ BULK DELETE USERS ============
        .addCase(bulkDeleteUsers.pending, (state) => {
            state.bulkDeleteLoading = true;
            state.bulkDeleteError = null;
            state.successMessage = null;
        })
        .addCase(bulkDeleteUsers.fulfilled, (state, action) => {
            state.bulkDeleteLoading = false;
            state.successMessage = action.payload?.message || "Users deleted successfully";
            // Refresh user list after bulk delete
            // The list will be refreshed by calling getAllUsersAdmin again
        })
        .addCase(bulkDeleteUsers.rejected, (state, action) => {
            state.bulkDeleteLoading = false;
            state.bulkDeleteError = action.payload || "Failed to delete users";
        })

        // ============ TOGGLE USER ACTIVE ============
        .addCase(toggleUserActive.pending, (state) => {
            state.toggleLoading = true;
            state.error = null;
            state.successMessage = null;
        })
        .addCase(toggleUserActive.fulfilled, (state, action) => {
            state.toggleLoading = false;
            const updatedUser = action.payload?.data;
            if (updatedUser) {
                const index = state.users.findIndex(
                    (user) => user._id === updatedUser._id || user.id === updatedUser.id
                );
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                if (state.currentUser?._id === updatedUser._id || 
                    state.currentUser?.id === updatedUser.id) {
                    state.currentUser = updatedUser;
                }
            }
            state.successMessage = action.payload?.message || "User status toggled successfully";
        })
        .addCase(toggleUserActive.rejected, (state, action) => {
            state.toggleLoading = false;
            state.error = action.payload || "Failed to toggle user status";
        })

        // ============ TOGGLE USER VERIFIED ============
        .addCase(toggleUserVerified.pending, (state) => {
            state.toggleLoading = true;
            state.error = null;
            state.successMessage = null;
        })
        .addCase(toggleUserVerified.fulfilled, (state, action) => {
            state.toggleLoading = false;
            const updatedUser = action.payload?.data;
            if (updatedUser) {
                const index = state.users.findIndex(
                    (user) => user._id === updatedUser._id || user.id === updatedUser.id
                );
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                if (state.currentUser?._id === updatedUser._id || 
                    state.currentUser?.id === updatedUser.id) {
                    state.currentUser = updatedUser;
                }
            }
            state.successMessage = action.payload?.message || "User verification toggled successfully";
        })
        .addCase(toggleUserVerified.rejected, (state, action) => {
            state.toggleLoading = false;
            state.error = action.payload || "Failed to toggle user verification";
        })

        // ============ GET USER STATS ============
        .addCase(getUserStats.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserStats.fulfilled, (state, action) => {
            state.loading = false;
            state.userStats = action.payload?.data || null;
            state.statistics = action.payload?.data?.statistics || null;
            state.roleDistribution = action.payload?.data?.roleDistribution || [];
            state.growthData = action.payload?.data?.growthData || [];
        })
        .addCase(getUserStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch user statistics";
        });
    },
});

export const {
    clearUserMessages,
    clearCurrentUser,
    resetUserState,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;