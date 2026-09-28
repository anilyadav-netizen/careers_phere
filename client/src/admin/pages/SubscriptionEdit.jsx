// src/admin/pages/SubscriptionEdit.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  PlusCircle,
  Trash2,
  X,
  CreditCard,
  IndianRupee,
  Check,
  AlertCircle,
} from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionContext";

const SubscriptionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSubscriptionById, updateSubscription } = useSubscriptions();

  const [formData, setFormData] = useState({
    planName: "",
    billingType: "Monthly",
    price: "",
    features: [""],
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load subscription data
  useEffect(() => {
    setLoading(true);
    // Simulate loading
    const timer = setTimeout(() => {
      const subscription = getSubscriptionById(id);
      if (subscription) {
        setFormData({
          planName: subscription.planName,
          billingType: subscription.billingType,
          price: subscription.price.toString(),
          features:
            subscription.features.length > 0 ? subscription.features : [""],
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, getSubscriptionById]);

  const validate = () => {
    const newErrors = {};

    if (!formData.planName.trim()) {
      newErrors.planName = "Plan name is required";
    }

    if (!formData.billingType) {
      newErrors.billingType = "Billing type is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    const validFeatures = formData.features.filter((f) => f.trim());
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);

    const subscriptionData = {
      ...formData,
      id: id,
      price: parseFloat(formData.price),
      features: formData.features.filter((f) => f.trim()),
      createdAt:
        getSubscriptionById(id)?.createdAt ||
        new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const result = await updateSubscription(subscriptionData);

    setIsSaving(false);

    if (result.success) {
      showNotification("Subscription updated successfully", "success");
      setTimeout(() => {
        navigate("/admin/subscriptions");
      }, 1500);
    } else {
      showNotification(
        result.error || "Failed to update subscription",
        "error",
      );
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
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-32"></div>
          <div className="h-8 bg-slate-200 rounded w-64"></div>
          <div className="h-96 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Subscription not found
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            The subscription you're looking for doesn't exist or has been
            removed.
          </p>
          <button
            onClick={() => navigate("/admin/subscriptions")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

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
          Edit Subscription
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update subscription plan details
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Billing Type *
                </label>
                <select
                  value={formData.billingType}
                  onChange={(e) =>
                    setFormData({ ...formData, billingType: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.billingType ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                {errors.billingType && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.billingType}
                  </p>
                )}
              </div>

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
            </div>
          </div>

          {/* What's Included */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                What's Included *
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
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.features && (
              <p className="text-xs text-red-600">{errors.features}</p>
            )}
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
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Update Subscription"}
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

export default SubscriptionEdit;
