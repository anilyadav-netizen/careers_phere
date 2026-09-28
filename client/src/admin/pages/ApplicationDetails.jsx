// src/admin/pages/ApplicationDetails.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Link2,
  Globe,
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DownloadCloud,
  X,
  Eye,
  FileImage,
  FileText as FileTextIcon,
  Image,
} from "lucide-react";
import {
  getApplicationByIdAdmin,
  updateApplicationStatus,
} from "../../redux/slicer/jobApplicationSlice";
import Toast from "../components/Toast";

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentApplication, loading, error, updatingStatus } = useSelector(
    (state) => state.application,
  );

  const application = currentApplication;
  const [notification, setNotification] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);

  // Load the selected persisted application, rather than the legacy mock context.
  useEffect(() => {
    dispatch(getApplicationByIdAdmin(applicationId));
  }, [applicationId, dispatch]);

  // Get category name dynamically
  const getCategoryName = useCallback(() => {
    if (!application) return "";
    return application.categoryName || "Not provided";
  }, [application]);

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    if (!application) return;

    try {
      await dispatch(
        updateApplicationStatus({ applicationId: application._id, status: newStatus }),
      ).unwrap();
      showNotification(
        `Application ${newStatus} successfully.`,
        "success",
      );
    } catch (updateError) {
      showNotification(
        typeof updateError === "string" ? updateError : "Failed to update application status.",
        "error",
      );
    }
  };

  // Handle document preview
  const handleDocumentPreview = (documentType, fileName, fileUrl) => {
    if (!fileName && !fileUrl) return;

    // Determine file type based on extension or URL
    let fileType = "other";
    let displayName = fileName || "file";
    let previewUrl = fileUrl || "";

    // If it's a profile photo, always treat as image
    if (documentType === "Profile Photo") {
      fileType = "image";
      // If profilePhoto is a URL, use it directly
      if (
        fileUrl &&
        (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))
      ) {
        previewUrl = fileUrl;
        displayName = fileUrl.split("/").pop() || "profile-photo.jpg";
      } else if (
        fileName &&
        (fileName.startsWith("http://") || fileName.startsWith("https://"))
      ) {
        // If fileName itself is a URL
        previewUrl = fileName;
        displayName = fileName.split("/").pop() || "profile-photo.jpg";
      } else if (fileName) {
        // For local file paths
        previewUrl = `/uploads/profile-photos/${fileName}`;
      }
    } else {
      // For other documents (Government ID, Resume)
      const extension = fileName ? fileName.split(".").pop().toLowerCase() : "";
      const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "svg",
        "bmp",
        "tiff",
      ];
      const pdfExtensions = ["pdf"];

      if (imageExtensions.includes(extension)) {
        fileType = "image";
      } else if (pdfExtensions.includes(extension)) {
        fileType = "pdf";
      }

      previewUrl = `/documents/${fileName}`;
    }

    setPreviewDocument({
      title: documentType,
      fileName: displayName,
      url: previewUrl,
      type: fileType,
    });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-50 text-green-700";
      case "rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-32"></div>
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
          <div className="h-64 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {error || "Application not found"}
          </h3>
          <button
            onClick={() => navigate("/admin/applications")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/applications")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-semibold flex-shrink-0">
            {application.profilePhoto ? (
              <img
                src={application.profilePhoto}
                alt={application.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              application.fullName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-slate-900">
              {application.fullName}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                  application.status,
                )}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    application.status === "shortlisted"
                      ? "bg-green-500"
                      : application.status === "rejected"
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }`}
                ></span>
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {application.experienceType}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {application.status !== "shortlisted" && (
              <button
                onClick={() => handleStatusUpdate("shortlisted")}
                disabled={updatingStatus}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {updatingStatus ? "Updating..." : "Shortlist"}
              </button>
            )}
            {application.status !== "rejected" && (
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updatingStatus}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                {updatingStatus ? "Updating..." : "Reject"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem
            icon={<Mail className="w-5 h-5 text-blue-600" />}
            label="Email"
            value={application.email}
          />
          <InfoItem
            icon={<Phone className="w-5 h-5 text-blue-600" />}
            label="Phone"
            value={application.phoneNumber}
          />
          <InfoItem
            icon={<MapPin className="w-5 h-5 text-blue-600" />}
            label="Location"
            value={application.currentLocation}
          />
          <InfoItem
            icon={<Briefcase className="w-5 h-5 text-blue-600" />}
            label="Experience Type"
            value={application.experienceType}
          />
          <InfoItem
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            label="Category"
            value={getCategoryName()}
          />
          <InfoItem
            icon={<Calendar className="w-5 h-5 text-blue-600" />}
            label="Applied On"
            value={new Date(application.appliedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          />
        </div>
      </div>

      {/* Professional Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Professional Details
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Professional Summary</p>
            <p className="text-sm text-slate-700">
              {application.professionalDetails || "Not provided"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {application.experienceType === "Experienced" && (
              <InfoItem
                icon={<Briefcase className="w-5 h-5 text-purple-600" />}
                label="Total Experience"
                value={application.totalExperience || "Not provided"}
              />
            )}
            <InfoItem
              icon={<IndianRupee className="w-5 h-5 text-green-600" />}
              label="Expected Salary"
              value={application.expectedSalary || "Not provided"}
            />
            <InfoItem
              icon={<Clock className="w-5 h-5 text-blue-600" />}
              label="Notice Period"
              value={application.noticePeriod || "Not provided"}
            />
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DocumentCard
            label="Profile Photo"
            fileName={
              application.profilePhoto
                ? application.profilePhoto.startsWith("http")
                  ? application.profilePhoto.split("/").pop()
                  : application.profilePhoto
                : ""
            }
            fileUrl={application.profilePhoto}
            isImage={true}
            onPreview={() =>
              handleDocumentPreview(
                "Profile Photo",
                application.profilePhoto,
                application.profilePhoto,
              )
            }
          />
          <DocumentCard
            label="Government ID"
            fileName={application.governmentIdDocument}
            onPreview={() =>
              handleDocumentPreview(
                "Government ID",
                application.governmentIdDocument,
                null,
              )
            }
          />
          <DocumentCard
            label="Resume"
            fileName={application.resume}
            onPreview={() =>
              handleDocumentPreview("Resume", application.resume, null)
            }
          />
        </div>
      </div>

      {/* Online Profiles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Online Profiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Link2 className="w-5 h-5 text-blue-600" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">LinkedIn Profile</p>
              {application.linkedInProfile ? (
                <a
                  href={application.linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline break-all"
                >
                  {application.linkedInProfile}
                </a>
              ) : (
                <p className="text-sm text-slate-500">Not provided</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-600" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">Portfolio / Website</p>
              {application.portfolioWebsite ? (
                <a
                  href={application.portfolioWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline break-all"
                >
                  {application.portfolioWebsite}
                </a>
              ) : (
                <p className="text-sm text-slate-500">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Additional Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 mb-2">Cover Letter</p>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {application.coverLetter || "Not provided"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-2">
              Additional Information
            </p>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {application.additionalInformation || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}

      {/* Notification */}
      <Toast
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
    </div>
  );
};

// Info Item Component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-lg bg-blue-50 flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-800 break-words">{value}</p>
    </div>
  </div>
);

// Document Card Component
const DocumentCard = ({ label, fileName, fileUrl, isImage, onPreview }) => {
  const isAvailable = Boolean(fileName || fileUrl);

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!isAvailable) return;

    let downloadUrl;
    if (
      fileUrl &&
      (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))
    ) {
      downloadUrl = fileUrl;
    } else if (isImage) {
      downloadUrl = `/uploads/profile-photos/${fileName}`;
    } else {
      downloadUrl = `/documents/${fileName}`;
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName || "download";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    if (isAvailable && onPreview) {
      onPreview();
    }
  };

  return (
    <div
      onClick={isAvailable ? onPreview : undefined}
      className={`p-4 border border-slate-200 rounded-xl transition-all ${
        isAvailable
          ? "cursor-pointer hover:border-blue-300 hover:shadow-md group"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-slate-50 flex-shrink-0">
            {isImage ? (
              <Image className="w-5 h-5 text-blue-600" />
            ) : (
              <FileText className="w-5 h-5 text-slate-600" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800">{label}</p>
            <p className="text-xs text-slate-500 truncate">
              {isAvailable ? fileName || "Available" : "Not provided"}
            </p>
          </div>
        </div>
        {isAvailable && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              title="Download"
            >
              <DownloadCloud className="w-4 h-4" />
            </button>
            <button
              onClick={handlePreviewClick}
              className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Document Preview Modal Component
const DocumentPreviewModal = ({ document, onClose }) => {
  const { title, fileName, url, type } = document;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-blue-50">
              {type === "image" || title === "Profile Photo" ? (
                <FileImage className="w-5 h-5 text-blue-600" />
              ) : type === "pdf" ? (
                <FileTextIcon className="w-5 h-5 text-red-600" />
              ) : (
                <FileText className="w-5 h-5 text-slate-600" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 truncate">
                {title}
              </h3>
              <p className="text-xs text-slate-500 truncate">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50">
          {type === "image" || title === "Profile Photo" ? (
            <div className="flex items-center justify-center h-full">
              <img
                src={url}
                alt={title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  const fallback = document.createElement("div");
                  fallback.className = "text-center text-slate-500";
                  fallback.innerHTML = "Failed to load image preview";
                  parent.appendChild(fallback);
                }}
              />
            </div>
          ) : type === "pdf" ? (
            <div className="h-[70vh] rounded-xl overflow-hidden shadow-lg bg-white">
              <iframe src={url} title={title} className="w-full h-full" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <FileText className="w-16 h-16 text-slate-400 mb-4" />
              <p className="text-sm text-slate-500">
                Preview not available for this file type
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
              >
                Open File
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-500">Previewing: {fileName}</p>
          <div className="flex gap-2">
            <a
              href={url}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <DownloadCloud className="w-4 h-4" />
              Download
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
