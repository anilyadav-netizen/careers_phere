// src/admin/pages/Subscriptions.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  CreditCard,
  Calendar,
  Check,
  IndianRupee,
  Search,
  Clock,
} from "lucide-react";
import StateCard from "../components/StateCard";
import {
  getAllSubscriptionsAdmin,
  deleteSubscription,
  toggleSubscriptionStatus,
  clearSubscriptionMessages,
} from "../../redux/slicer/adminsubscriptionSlice";

const Subscriptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const subscriptions = useSelector((state) => state.subscription?.adminSubscriptions || []);
  const loading = useSelector((state) => state.subscription?.loading || false);
  const error = useSelector((state) => state.subscription?.error || null);
  const deleteLoading = useSelector((state) => state.subscription?.deleteLoading || false);
  const toggleLoading = useSelector((state) => state.subscription?.toggleLoading || false);
  const successMessage = useSelector((state) => state.subscription?.successMessage || null);
  const deleteError = useSelector((state) => state.subscription?.deleteError || null);

  const [searchTerm, setSearchTerm] = useState("");
  const [billingFilter, setBillingFilter] = useState("all");
  const [deletingSubscription, setDeletingSubscription] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch subscriptions on mount
  useEffect(() => {
    dispatch(getAllSubscriptionsAdmin());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearSubscriptionMessages());
      // Refresh list after successful operations
      dispatch(getAllSubscriptionsAdmin());
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (deleteError) {
      showNotification(deleteError, "error");
      dispatch(clearSubscriptionMessages());
    }
  }, [deleteError, dispatch]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalSubscriptions = subscriptions.length;
    const activePlans = subscriptions.filter((sub) => sub.isActive).length;
    const popularPlans = subscriptions.filter((sub) => sub.isPopular).length;
    
    // Calculate average price from active plans
    const activeSubs = subscriptions.filter((sub) => sub.isActive);
    const averagePrice =
      activeSubs.length > 0
        ? Math.round(
            activeSubs.reduce((sum, sub) => sum + sub.price, 0) /
              activeSubs.length,
          )
        : 0;

    return {
      totalSubscriptions,
      activePlans,
      popularPlans,
      averagePrice,
    };
  }, [subscriptions]);

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (sub) =>
          sub.planName?.toLowerCase().includes(searchLower) ||
          sub.features?.some((feature) =>
            feature.toLowerCase().includes(searchLower),
          ) ||
          sub.description?.toLowerCase().includes(searchLower),
      );
    }

    // Note: billingType doesn't exist in your model, so we'll filter by isActive or not
    // If you want to keep billing filter, you might need to add it to your model
    // For now, we'll use it to filter active/inactive
    if (billingFilter === "active") {
      result = result.filter((sub) => sub.isActive === true);
    } else if (billingFilter === "inactive") {
      result = result.filter((sub) => sub.isActive === false);
    }

    return result;
  }, [subscriptions, searchTerm, billingFilter]);
  

  // Handle edit subscription
  const handleEditSubscription = (subscriptionId) => {
    navigate(`/admin/subscriptions/edit/${subscriptionId}`);
  };

  // Handle delete subscription
  const handleDeleteSubscription = (subscription) => {
    setDeletingSubscription(subscription);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingSubscription) return;

    try {
      const id = deletingSubscription._id || deletingSubscription.id;
      await dispatch(deleteSubscription(id)).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingSubscription(null);
    } catch (err) {
      console.error("Failed to delete subscription:", err);
    }
  };

  // Toggle subscription status
  const handleToggleStatus = async (subscription) => {
    try {
      const id = subscription._id || subscription.id;
      await dispatch(toggleSubscriptionStatus(id)).unwrap();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setBillingFilter("all");
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "₹0";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (subscription) => {
    if (!subscription.isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Inactive
        </span>
      );
    }
    if (subscription.isPopular) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          Popular
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Active
      </span>
    );
  };

  // Loading state
  if (loading && subscriptions.length === 0) {
    return <SubscriptionsLoadingState />;
  }

  // Error state
  if (error && subscriptions.length === 0) {
    return (
      <SubscriptionsErrorState 
        error={error} 
        onRetry={() => dispatch(getAllSubscriptionsAdmin())} 
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Subscription Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Manage Subscriptions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage subscription plans for CareerSphere users.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/subscriptions/create")}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Create Subscription
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StateCard
          title="Total Plans"
          value={statistics.totalSubscriptions}
          icon={<CreditCard className="w-6 h-6 text-blue-600" />}
          description="All subscription plans"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Active Plans"
          value={statistics.activePlans}
          icon={<Check className="w-6 h-6 text-green-600" />}
          description="Currently active"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Popular Plans"
          value={statistics.popularPlans}
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          description="Marked as popular"
          iconBg="bg-yellow-50"
        />
        <StateCard
          title="Average Price"
          value={`₹${statistics.averagePrice.toLocaleString("en-IN")}`}
          icon={<IndianRupee className="w-6 h-6 text-indigo-600" />}
          description="Avg. plan price"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Subscriptions Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                All Subscription Plans
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredSubscriptions.length} plan
                {filteredSubscriptions.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by plan name or feature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              <select
                value={billingFilter}
                onChange={(e) => setBillingFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All Plans</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>

              {(searchTerm || billingFilter !== "all") && (
                <button
                  onClick={clearFilters}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center"
                  title="Clear filters"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredSubscriptions.length === 0 ? (
          <SubscriptionsEmptyState
            hasFilters={searchTerm || billingFilter !== "all"}
            onClear={clearFilters}
            onCreate={() => navigate("/admin/subscriptions/create")}
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[160px] w-[15%]">
                      Plan Name
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[100px] w-[10%]">
                      Status
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[110px] w-[12%]">
                      Price
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[90px]">
                      Purchases
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap w-[35%]">
                      Features
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[120px] w-[12%]">
                      Countries
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[100px] w-[10%]">
                      Created
                    </th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap w-[100px] min-w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredSubscriptions.map((subscription) => (
                    <tr
                      key={subscription._id || subscription.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Plan Name */}
                      <td className="px-4 py-4 min-w-[160px]">
                        <div>
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {subscription.planName}
                          </p>
                          {subscription.badge && (
                            <span className="text-xs text-blue-600 font-medium">
                              {subscription.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 min-w-[100px]">
                        {getStatusBadge(subscription)}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 min-w-[110px]">
                        <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                          {formatPrice(subscription.price)}
                          {subscription.discountPercentage > 0 && (
                            <span className="text-xs text-green-600 font-normal ml-1">
                              ({subscription.discountPercentage}% off)
                            </span>
                          )}
                        </p>
                      </td>

                      <td className="px-4 py-4 min-w-[90px]">
                        <p className="text-sm font-medium text-slate-700">
                          {Number(subscription.purchaseCount || 0).toLocaleString("en-IN")}
                        </p>
                      </td>

                      {/* Features */}
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {subscription.features?.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap"
                            >
                              <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                              {feature.length > 20
                                ? feature.substring(0, 20) + "..."
                                : feature}
                            </span>
                          ))}
                          {subscription.features?.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 whitespace-nowrap">
                              +{subscription.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Countries */}
                      <td className="px-4 py-4 min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {subscription.countries?.slice(0, 2).map((country, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 whitespace-nowrap"
                            >
                              {country}
                            </span>
                          ))}
                          {subscription.countries?.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
                              +{subscription.countries.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-4 min-w-[100px]">
                        <p className="text-sm text-slate-700 whitespace-nowrap">
                          {formatDate(subscription.createdAt)}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 w-[100px] min-w-[100px]">
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(subscription)}
                            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                              subscription.isActive
                                ? "text-green-400 hover:text-red-600 hover:bg-red-50"
                                : "text-red-400 hover:text-green-600 hover:bg-green-50"
                            }`}
                            title={subscription.isActive ? "Deactivate" : "Activate"}
                          >
                            {subscription.isActive ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditSubscription(subscription._id || subscription.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
                            title="Edit subscription"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubscription(subscription)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                            title="Delete subscription"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredSubscriptions.map((subscription) => (
                <div key={subscription._id || subscription.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {subscription.planName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(subscription)}
                        {subscription.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {subscription.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mt-2">
                        {formatPrice(subscription.price)}
                        {subscription.discountPercentage > 0 && (
                          <span className="text-xs text-green-600 font-normal ml-1">
                            ({subscription.discountPercentage}% off)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {Number(subscription.purchaseCount || 0).toLocaleString("en-IN")} purchase{subscription.purchaseCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleToggleStatus(subscription)}
                        className={`p-2 rounded-lg transition-colors ${
                          subscription.isActive
                            ? "text-green-400 hover:text-red-600 hover:bg-red-50"
                            : "text-red-400 hover:text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {subscription.isActive ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditSubscription(subscription._id || subscription.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubscription(subscription)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {subscription.features?.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        <Check className="w-3 h-3 text-green-600" />
                        {feature.length > 20 ? feature.substring(0, 20) + "..." : feature}
                      </span>
                    ))}
                    {subscription.features?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        +{subscription.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {subscription.countries && subscription.countries.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {subscription.countries.slice(0, 3).map((country, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                        >
                          {country}
                        </span>
                      ))}
                      {subscription.countries.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          +{subscription.countries.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && deletingSubscription && (
        <DeleteSubscriptionModal
          subscription={deletingSubscription}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingSubscription(null);
          }}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteLoading}
        />
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

// Delete Subscription Modal
const DeleteSubscriptionModal = ({ subscription, onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete Subscription?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete the "{subscription?.planName}"
                plan? This action cannot be undone.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-700">
              <span className="font-medium">Plan:</span> {subscription?.planName}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-medium">Price:</span> ₹{subscription?.price?.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-medium">Features:</span> {subscription?.features?.length || 0} features
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete Subscription"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State
const SubscriptionsLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="h-8 bg-slate-200 rounded w-full mb-6"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 rounded-xl mb-3"></div>
      ))}
    </div>
  </div>
);

// Error State
const SubscriptionsErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Subscriptions
      </h3>
      <p className="text-sm text-slate-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State
const SubscriptionsEmptyState = ({ hasFilters, onClear, onCreate }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <CreditCard className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching subscriptions" : "No subscriptions yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria."
        : "Create your first subscription plan to get started."}
    </p>
    {hasFilters ? (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl"
      >
        Clear all filters
      </button>
    ) : (
      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg"
      >
        <Plus className="w-4 h-4" />
        Create Subscription
      </button>
    )}
  </div>
);

export default Subscriptions;
