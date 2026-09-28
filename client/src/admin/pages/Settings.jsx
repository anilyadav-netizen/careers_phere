// src/admin/pages/Settings.jsx
import React, { useState } from "react";
import {
  Save,
  Building2,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Upload,
  X,
  Globe,
  MapPin,
  IndianRupee,
  Clock,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  Menu,
  ChevronRight,
  Check,
} from "lucide-react";

const Settings = () => {
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "CareerSphere",
    tagline: "Your gateway to better career opportunities",
    supportEmail: "support@careersphere.com",
    contactPhone: "+91 98765 43210",
    logo: null,
    logoPreview: "",
  });

  // Platform Information State
  const [platformInfo, setPlatformInfo] = useState({
    address: "123 Business Park, Sector 62, Noida, Uttar Pradesh 201309",
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD MMM YYYY",
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newUserRegistration: true,
    newJobPosting: true,
    newApplication: true,
    subscriptionPurchase: true,
    systemUpdate: false,
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("general"); // For mobile nav

  // Original data for cancel/reset
  const [originalData, setOriginalData] = useState({
    generalSettings: { ...generalSettings },
    platformInfo: { ...platformInfo },
    notifications: { ...notifications },
  });

  // Handle general settings change
  const handleGeneralChange = (field, value) => {
    setGeneralSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Handle platform info change
  const handlePlatformInfoChange = (field, value) => {
    setPlatformInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (field) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGeneralSettings((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate settings
  const validateSettings = () => {
    const newErrors = {};
    if (!generalSettings.platformName.trim()) {
      newErrors.platformName = "Platform name is required";
    }
    if (!generalSettings.supportEmail.trim()) {
      newErrors.supportEmail = "Support email is required";
    } else if (!/\S+@\S+\.\S+/.test(generalSettings.supportEmail)) {
      newErrors.supportEmail = "Invalid email address";
    }
    if (!generalSettings.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    if (!validateSettings()) return;

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalData({
        generalSettings: { ...generalSettings },
        platformInfo: { ...platformInfo },
        notifications: { ...notifications },
      });
      showNotification("Settings updated successfully", "success");
    } catch (err) {
      showNotification("Failed to update settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setGeneralSettings(originalData.generalSettings);
    setPlatformInfo(originalData.platformInfo);
    setNotifications(originalData.notifications);
    setErrors({});
    showNotification("Changes discarded", "info");
  };

  // Validate password
  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle update password
  const handleUpdatePassword = async () => {
    if (!validatePassword()) return;

    setIsUpdatingPassword(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      showNotification("Password updated successfully", "success");
    } catch (err) {
      showNotification("Failed to update password", "error");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none flex-shrink-0 ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  // Section Navigation Items
  const sections = [
    { id: "general", label: "General Settings", icon: Building2 },
    { id: "platform", label: "Platform Information", icon: Globe },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "security", label: "Account & Security", icon: Lock },
  ];

  return (
    <div className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 pb-24 lg:pb-28">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Settings
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your platform preferences and configuration
          </p>
        </div>
        {/* Desktop Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Mobile Section Navigation */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeSection === section.id
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            <section.icon className="w-3.5 h-3.5" />
            {section.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 sticky top-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <section.icon
                  className={`w-4 h-4 ${
                    activeSection === section.id
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
          {/* General Settings Card */}
          {(activeSection === "general" || activeSection === "general") && (
            <div
              className={`${
                activeSection === "general" ? "block" : "hidden lg:block"
              } bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm`}
            >
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  General Settings
                </h2>
              </div>
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Platform Name *
                    </label>
                    <input
                      type="text"
                      value={generalSettings.platformName}
                      onChange={(e) =>
                        handleGeneralChange("platformName", e.target.value)
                      }
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                        errors.platformName
                          ? "border-red-300"
                          : "border-slate-200"
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                      placeholder="CareerSphere"
                    />
                    {errors.platformName && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {errors.platformName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Platform Tagline
                    </label>
                    <input
                      type="text"
                      value={generalSettings.tagline}
                      onChange={(e) =>
                        handleGeneralChange("tagline", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                      placeholder="Your gateway to better career opportunities"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Support Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <input
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={(e) =>
                          handleGeneralChange("supportEmail", e.target.value)
                        }
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                          errors.supportEmail
                            ? "border-red-300"
                            : "border-slate-200"
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                        placeholder="support@careersphere.com"
                      />
                    </div>
                    {errors.supportEmail && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {errors.supportEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Contact Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={generalSettings.contactPhone}
                        onChange={(e) =>
                          handleGeneralChange("contactPhone", e.target.value)
                        }
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                          errors.contactPhone
                            ? "border-red-300"
                            : "border-slate-200"
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {errors.contactPhone && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                    Platform Logo
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold overflow-hidden flex-shrink-0">
                      {generalSettings.logoPreview ? (
                        <img
                          src={generalSettings.logoPreview}
                          alt="Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "CS"
                      )}
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <button
                        onClick={() =>
                          document.getElementById("logo-upload").click()
                        }
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
                      >
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Upload / Change Logo
                      </button>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-1 text-center sm:text-left">
                        Recommended: 512x512px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Platform Information Card */}
          {(activeSection === "platform" || activeSection === "platform") && (
            <div
              className={`${
                activeSection === "platform" ? "block" : "hidden lg:block"
              } bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm`}
            >
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Platform Information
                </h2>
              </div>
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Company / Platform Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <textarea
                        value={platformInfo.address}
                        onChange={(e) =>
                          handlePlatformInfoChange("address", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                        rows="2"
                        placeholder="Company address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Default Currency
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <select
                        value={platformInfo.currency}
                        onChange={(e) =>
                          handlePlatformInfoChange("currency", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Default Time Zone
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <select
                        value={platformInfo.timezone}
                        onChange={(e) =>
                          handlePlatformInfoChange("timezone", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="Asia/Dubai">Asia/Dubai</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="America/New_York">
                          America/New_York
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Date Format
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <select
                        value={platformInfo.dateFormat}
                        onChange={(e) =>
                          handlePlatformInfoChange("dateFormat", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                      >
                        <option value="DD MMM YYYY">DD MMM YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings Card */}
          {(activeSection === "notifications" ||
            activeSection === "notifications") && (
            <div
              className={`${
                activeSection === "notifications" ? "block" : "hidden lg:block"
              } bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm`}
            >
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Notification Settings
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                  Control how you receive notifications
                </p>
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
                {/* Notification Items */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        Email Notifications
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Receive important platform updates via email.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.emailNotifications}
                      onChange={() =>
                        handleNotificationToggle("emailNotifications")
                      }
                    />
                  </div>

                  {/* New User Registration */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        New User Registration
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Get notified when a new user registers on the platform.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.newUserRegistration}
                      onChange={() =>
                        handleNotificationToggle("newUserRegistration")
                      }
                    />
                  </div>

                  {/* New Job Posting */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        New Job Posting
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Get notified when a new job is posted.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.newJobPosting}
                      onChange={() => handleNotificationToggle("newJobPosting")}
                    />
                  </div>

                  {/* New Application */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        New Application
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.newApplication}
                      onChange={() =>
                        handleNotificationToggle("newApplication")
                      }
                    />
                  </div>

                  {/* Subscription Purchase */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        Subscription Purchase
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Get notified when a user purchases a subscription.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.subscriptionPurchase}
                      onChange={() =>
                        handleNotificationToggle("subscriptionPurchase")
                      }
                    />
                  </div>

                  {/* System Update */}
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        System Update
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                        Get notified about system updates and maintenance.
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={notifications.systemUpdate}
                      onChange={() => handleNotificationToggle("systemUpdate")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Account & Security Card */}
          {(activeSection === "security" || activeSection === "security") && (
            <div
              className={`${
                activeSection === "security" ? "block" : "hidden lg:block"
              } bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm`}
            >
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Account & Security
                </h2>
              </div>
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Current Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                          passwordErrors.currentPassword
                            ? "border-red-300"
                            : "border-slate-200"
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {passwordErrors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      New Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                          passwordErrors.newPassword
                            ? "border-red-300"
                            : "border-slate-200"
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {passwordErrors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                          passwordErrors.confirmPassword
                            ? "border-red-300"
                            : "border-slate-200"
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Last password updated: 15 Jan 2026
                  </p>
                  <button
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto justify-center"
                  >
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 sm:p-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
          >
            <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-16 sm:bottom-20 right-3 sm:right-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg text-xs sm:text-sm font-medium z-50 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : notification.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Settings;
