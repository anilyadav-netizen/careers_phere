// src/admin/pages/SubscriptionCreate.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Save,
  PlusCircle,
  Trash2,
  CreditCard,
  IndianRupee,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import {
  createSubscription,
  updateSubscription,
  getSubscriptionByIdAdmin,
  clearSubscriptionMessages,
} from "../../redux/slicer/adminsubscriptionSlice";

const SubscriptionCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = !!id;

  // Redux state
  const createLoading = useSelector((state) => state.subscription?.createLoading || false);
  const updateLoading = useSelector((state) => state.subscription?.updateLoading || false);
  const loading = useSelector((state) => state.subscription?.loading || false);
  const currentSubscription = useSelector((state) => state.subscription?.currentSubscription || null);
  const successMessage = useSelector((state) => state.subscription?.successMessage || null);
  const error = useSelector((state) => state.subscription?.createError || state.subscription?.updateError || state.subscription?.error || null);

  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    features: [""],
    countries: [""],
    waitingTime: 0,
    maxJobs: 10,
    maxApplications: 50,
    isActive: true,
    isPopular: false,
    discountPercentage: 0,
    description: "",
    badge: "",
    color: "#3B82F6",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // Fetch subscription data for edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getSubscriptionByIdAdmin(id))
        .unwrap()
        .catch((err) => {
          console.error("Failed to fetch subscription:", err);
          setLoadError(err || "Failed to load subscription");
        });
    }
  }, [dispatch, id, isEditMode]);

  // Populate form with fetched data for edit mode
  useEffect(() => {
    if (isEditMode && currentSubscription) {
      console.log("Populating form with:", currentSubscription);
      setFormData({
        planName: currentSubscription.planName || "",
        price: currentSubscription.price || "",
        features: currentSubscription.features?.length > 0 
          ? currentSubscription.features 
          : [""],
        countries: currentSubscription.countries?.length > 0 
          ? currentSubscription.countries 
          : [""],
        waitingTime: currentSubscription.waitingTime || 0,
        maxJobs: currentSubscription.maxJobs || 10,
        maxApplications: currentSubscription.maxApplications || 50,
        isActive: currentSubscription.isActive !== undefined ? currentSubscription.isActive : true,
        isPopular: currentSubscription.isPopular || false,
        discountPercentage: currentSubscription.discountPercentage || 0,
        description: currentSubscription.description || "",
        badge: currentSubscription.badge || "",
        color: currentSubscription.color || "#3B82F6",
      });
    }
  }, [isEditMode, currentSubscription]);

  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearSubscriptionMessages());
      setTimeout(() => {
        navigate("/admin/subscriptions");
      }, 1500);
    }
  }, [successMessage, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      showNotification(error, "error");
      dispatch(clearSubscriptionMessages());
    }
  }, [error, dispatch]);

  // Show loading state while fetching
  if (isEditMode && loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading subscription...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if subscription not found
  if (isEditMode && !loading && !currentSubscription && loadError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="bg-red-50 rounded-full p-4 mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Subscription Not Found
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            The subscription you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/admin/subscriptions")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

  // If edit mode but no subscription and not loading, show not found
  if (isEditMode && !loading && !currentSubscription) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="bg-red-50 rounded-full p-4 mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Subscription Not Found
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            The subscription you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/admin/subscriptions")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
  const validate = () => {
    const newErrors = {};

    if (!formData.planName.trim()) {
      newErrors.planName = "Plan name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    const validFeatures = formData.features.filter((f) => f.trim());
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    const validCountries = formData.countries.filter((c) => c.trim());
    if (validCountries.length === 0) {
      newErrors.countries = "At least one country is required";
    }

    if (formData.waitingTime === undefined || formData.waitingTime === null || formData.waitingTime < 0) {
      newErrors.waitingTime = "Waiting time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);

    try {
      const validFeatures = formData.features.filter((f) => f.trim());
      const validCountries = formData.countries.filter((c) => c.trim());

      if (validFeatures.length === 0) {
        showNotification("At least one feature is required", "error");
        setIsSaving(false);
        return;
      }

      if (validCountries.length === 0) {
        showNotification("At least one country is required", "error");
        setIsSaving(false);
        return;
      }

      const subscriptionData = {
        planName: formData.planName.trim(),
        price: parseFloat(formData.price),
        features: validFeatures,
        countries: validCountries,
        waitingTime: parseInt(formData.waitingTime) || 0,
        maxJobs: parseInt(formData.maxJobs) || 10,
        maxApplications: parseInt(formData.maxApplications) || 50,
        isActive: formData.isActive,
        isPopular: formData.isPopular,
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        description: formData.description?.trim() || "",
        badge: formData.badge?.trim() || "",
        color: formData.color || "#3B82F6",
      };

      console.log("Submitting subscription data:", subscriptionData);

      if (isEditMode) {
        await dispatch(updateSubscription({
          id: id,
          subscriptionData: subscriptionData
        })).unwrap();
      } else {
        await dispatch(createSubscription(subscriptionData)).unwrap();
      }
    } catch (err) {
      console.error("Failed to save subscription:", err);
      showNotification(err || "Failed to save subscription", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index) => {
    if (formData.features.length <= 1) {
      showNotification("At least one feature is required", "error");
      return;
    }
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleCountryChange = (index, value) => {
    const newCountries = [...formData.countries];
    newCountries[index] = value;
    setFormData({ ...formData, countries: newCountries });
  };

  const addCountry = () => {
    setFormData({
      ...formData,
      countries: [...formData.countries, ""],
    });
  };

  const removeCountry = (index) => {
    if (formData.countries.length <= 1) {
      showNotification("At least one country is required", "error");
      return;
    }
    const newCountries = formData.countries.filter((_, i) => i !== index);
    setFormData({ ...formData, countries: newCountries });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <button
          onClick={() => navigate("/admin/subscriptions")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subscriptions
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          {isEditMode ? "Edit Subscription" : "Create Subscription"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode ? "Update subscription plan details" : "Create a new subscription plan"}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Subscription Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Subscription Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  value={formData.planName}
                  onChange={(e) =>
                    setFormData({ ...formData, planName: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.planName ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., Basic, Standard, Premium"
                />
                {errors.planName && (
                  <p className="text-xs text-red-600 mt-1">{errors.planName}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price (₹) *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      errors.price ? "border-red-300" : "border-slate-200"
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                    placeholder="e.g., 999"
                    min="0"
                    step="1"
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-600 mt-1">{errors.price}</p>
                )}
              </div>

              {/* Max Jobs */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Jobs
                </label>
                <input
                  type="number"
                  value={formData.maxJobs}
                  onChange={(e) =>
                    setFormData({ ...formData, maxJobs: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="e.g., 10"
                  min="0"
                />
              </div>

              {/* Max Applications */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Applications
                </label>
                <input
                  type="number"
                  value={formData.maxApplications}
                  onChange={(e) =>
                    setFormData({ ...formData, maxApplications: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="e.g., 50"
                  min="0"
                />
              </div>

              {/* Waiting Time */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Waiting Time (days) *
                </label>
                <input
                  type="number"
                  value={formData.waitingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, waitingTime: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.waitingTime ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., 0"
                  min="0"
                />
                {errors.waitingTime && (
                  <p className="text-xs text-red-600 mt-1">{errors.waitingTime}</p>
                )}
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    setFormData({ ...formData, discountPercentage: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="e.g., 20"
                  min="0"
                  max="100"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Badge (e.g., Popular, Best Value)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="e.g., Popular"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-12 h-12 rounded-xl border border-slate-200 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Description
            </h2>
            <div>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                rows="3"
                placeholder="Brief description of the subscription plan"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Features *
              </h2>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Feature
              </button>
            </div>
            <p className="text-xs text-slate-500 -mt-2">
              Add at least one feature for this plan
            </p>

            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <div className="relative flex-1">
                  <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-600" />
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    placeholder="e.g., Post up to 10 jobs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {errors.features && (
              <p className="text-xs text-red-600">{errors.features}</p>
            )}
          </div>

          {/* Countries */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Countries *
              </h2>
              <button
                type="button"
                onClick={addCountry}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Country
              </button>
            </div>
            <p className="text-xs text-slate-500 -mt-2">
              Add at least one country where this plan will be available
            </p>

            {formData.countries.map((country, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => handleCountryChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-xl border ${
                    errors.countries ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., India, USA, UK"
                />
                <button
                  type="button"
                  onClick={() => removeCountry(index)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {errors.countries && (
              <p className="text-xs text-red-600">{errors.countries}</p>
            )}
          </div>

          {/* Status Toggles */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Status
            </h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) =>
                    setFormData({ ...formData, isPopular: e.target.checked })
                  }
                  className="rounded border-slate-300 text-yellow-600 focus:ring-yellow-500"
                />
                Popular
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/admin/subscriptions")}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || createLoading || updateLoading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving || createLoading || updateLoading
                ? isEditMode ? "Updating..." : "Creating..."
                : isEditMode ? "Update Subscription" : "Create Subscription"}
            </button>
          </div>
        </form>
      </div>

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

export default SubscriptionCreate;