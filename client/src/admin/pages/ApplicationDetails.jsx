// src/admin/pages/ApplicationDetails.jsx
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DownloadCloud,
  Eye,
  FileText,
  FileText as FileTextIcon,
  Globe,
  Link2,
  Mail,
  MapPin,
  Phone,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    if (applicationId) {
      dispatch(getApplicationByIdAdmin(applicationId));
    }
  }, [applicationId, dispatch]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!application || !application._id) return;
    if (application.status === newStatus) return;

    try {
      await dispatch(
        updateApplicationStatus({
          applicationId: application._id,
          status: newStatus,
        }),
      ).unwrap();

      showNotification(
        `Application status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}. Notification email sent to applicant.`,
        "success",
      );
    } catch (updateError) {
      showNotification(
        typeof updateError === "string"
          ? updateError
          : "Failed to update application status.",
        "error",
      );
    }
  };

  const candidateName =
    application?.applicationData?.name ||
    application?.applicant?.name ||
    application?.applicant?.fullName ||
    application?.fullName ||
    "Applicant";

  const candidateEmail =
    application?.applicationData?.email ||
    application?.applicant?.email ||
    application?.email ||
    "Not provided";

  const candidatePhone =
    application?.applicationData?.phone ||
    application?.applicationData?.mobile ||
    application?.applicant?.mobile ||
    application?.applicant?.phone ||
    application?.phoneNumber ||
    "Not provided";

  const candidateLocation =
    application?.applicationData?.location ||
    application?.job?.location ||
    application?.currentLocation ||
    "Not provided";

  const candidateExperience =
    application?.applicationData?.experience ||
    application?.experienceType ||
    application?.totalExperience ||
    "Not specified";

  const candidateSkills =
    application?.applicationData?.skills ||
    application?.professionalDetails ||
    "Not provided";

  const candidateCoverLetter =
    application?.applicationData?.coverLetter ||
    application?.applicationData?.about ||
    application?.coverLetter ||
    "Not provided";

  const candidateLinkedIn =
    application?.applicationData?.linkedin ||
    application?.applicationData?.linkedIn ||
    application?.linkedInProfile ||
    null;

  const candidatePortfolio =
    application?.applicationData?.portfolio ||
    application?.portfolioWebsite ||
    null;

  const resumeFileName =
    application?.applicationData?.resume || application?.resume || null;

  const jobTitle =
    application?.job?.title ||
    application?.applicationData?.role ||
    "Role Application";

  const companyName = application?.job?.company || "CareerNova";

  const isGuest =
    !application?.applicant &&
    Boolean(
      application?.applicationData?.name || application?.applicationData?.email,
    );

  const appliedDate = application?.appliedAt || application?.createdAt;

  const resumeDownloadUrl = resumeFileName
    ? resumeFileName.startsWith("http://") ||
      resumeFileName.startsWith("https://")
      ? resumeFileName
      : `/api/admin/applications/${application?._id}/resume`
    : null;

  const handleDocumentPreview = (documentType, fileName, fileUrl) => {
    if (!fileName && !fileUrl) return;

    let fileType = "pdf";
    const extension = fileName ? fileName.split(".").pop().toLowerCase() : "";
    const imageExtensions = ["jpg", "jpeg", "png", "webp", "svg", "gif"];
    if (imageExtensions.includes(extension)) {
      fileType = "image";
    }

    setPreviewDocument({
      title: documentType,
      fileName: fileName || "Resume.pdf",
      url: fileUrl || resumeDownloadUrl,
      type: fileType,
    });
  };

  const getStatusBadge = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "shortlisted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusDot = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "shortlisted":
        return "bg-emerald-500";
      case "rejected":
        return "bg-rose-500";
      default:
        return "bg-amber-500";
    }
  };

  const getInitials = (name) => {
    if (!name) return "AP";
    return name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded-lg w-36"></div>
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
          <div className="h-64 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {error || "Application not found"}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            The application details could not be loaded. Please return to the
            applications list.
          </p>
          <button
            onClick={() => navigate("/admin/applications")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-sm hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const currentStatus = String(application.status || "pending").toLowerCase();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/applications")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </button>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0 shadow-sm">
              {getInitials(candidateName)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {candidateName}
                </h1>
                {isGuest ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                    Guest Applicant
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    Registered User
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-slate-600">
                <span className="font-medium text-blue-600">{jobTitle}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{companyName}</span>
                <span className="text-slate-300">•</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                    currentStatus,
                  )}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                      currentStatus,
                    )}`}
                  />
                  {currentStatus.charAt(0).toUpperCase() +
                    currentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-1 uppercase tracking-wider">
              Update Status:
            </span>

            {/* Shortlist */}
            <button
              onClick={() => handleStatusUpdate("shortlisted")}
              disabled={updatingStatus || currentStatus === "shortlisted"}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentStatus === "shortlisted"
                  ? "bg-emerald-600 text-white ring-2 ring-emerald-600/20 shadow-xs cursor-default"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              } disabled:opacity-70`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Shortlist
            </button>

            {/* Pending */}
            <button
              onClick={() => handleStatusUpdate("pending")}
              disabled={updatingStatus || currentStatus === "pending"}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentStatus === "pending"
                  ? "bg-amber-600 text-white ring-2 ring-amber-600/20 shadow-xs cursor-default"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
              } disabled:opacity-70`}
            >
              <Clock className="w-4 h-4" />
              Pending
            </button>

            {/* Reject */}
            <button
              onClick={() => handleStatusUpdate("rejected")}
              disabled={updatingStatus || currentStatus === "rejected"}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentStatus === "rejected"
                  ? "bg-rose-600 text-white ring-2 ring-rose-600/20 shadow-xs cursor-default"
                  : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
              } disabled:opacity-70`}
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Applicant & Job Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact & Profile Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Contact & Application Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              icon={<Mail className="w-4 h-4 text-blue-600" />}
              label="Email Address"
              value={
                <a
                  href={`mailto:${candidateEmail}`}
                  className="text-blue-600 hover:underline break-all"
                >
                  {candidateEmail}
                </a>
              }
            />

            <InfoItem
              icon={<Phone className="w-4 h-4 text-blue-600" />}
              label="Phone Number"
              value={
                candidatePhone !== "Not provided" ? (
                  <a
                    href={`tel:${candidatePhone}`}
                    className="text-slate-800 hover:text-blue-600"
                  >
                    {candidatePhone}
                  </a>
                ) : (
                  "Not provided"
                )
              }
            />

            <InfoItem
              icon={<Briefcase className="w-4 h-4 text-blue-600" />}
              label="Applied For Role"
              value={jobTitle}
            />

            <InfoItem
              icon={<Building2 className="w-4 h-4 text-blue-600" />}
              label="Company"
              value={companyName}
            />

            <InfoItem
              icon={<MapPin className="w-4 h-4 text-blue-600" />}
              label="Location"
              value={candidateLocation}
            />

            <InfoItem
              icon={<Award className="w-4 h-4 text-blue-600" />}
              label="Experience Level"
              value={candidateExperience}
            />

            <InfoItem
              icon={<Calendar className="w-4 h-4 text-blue-600" />}
              label="Applied On"
              value={
                appliedDate
                  ? new Date(appliedDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"
              }
            />

            <InfoItem
              icon={<FileText className="w-4 h-4 text-blue-600" />}
              label="Application ID"
              value={
                <span className="font-mono text-xs text-slate-500 break-all">
                  {application._id}
                </span>
              }
            />
          </div>

          {/* Skills & Expertise */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Skills / Tech Stack
            </h3>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-800 leading-relaxed">
                {candidateSkills}
              </p>
            </div>
          </div>

          {/* Cover Letter / About */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Cover Letter / Introduction
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 max-h-60 overflow-y-auto">
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {candidateCoverLetter}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Resume & Online Links */}
        <div className="space-y-6">
          {/* Resume Document Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Candidate Resume
            </h2>

            {resumeFileName ? (
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600 text-white shadow-xs">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      Resume Attached
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {resumeFileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={resumeDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Resume
                  </a>

                  <a
                    href={resumeDownloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    title="Download Resume"
                  >
                    <DownloadCloud className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-100">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">
                  No resume file provided
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Applicant did not upload a separate resume document.
                </p>
              </div>
            )}
          </div>

          {/* Online Profiles */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Online Profiles
            </h2>

            <div className="space-y-3">
              {/* LinkedIn */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Link2 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">LinkedIn</p>
                  {candidateLinkedIn ? (
                    <a
                      href={candidateLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline truncate block"
                    >
                      {candidateLinkedIn}
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400">Not provided</p>
                  )}
                </div>
              </div>

              {/* Portfolio */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    Portfolio / Website
                  </p>
                  {candidatePortfolio ? (
                    <a
                      href={candidatePortfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline truncate block"
                    >
                      {candidatePortfolio}
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400">Not provided</p>
                  )}
                </div>
              </div>
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

      {/* Notification Toast */}
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
  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100/80">
    <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-200/60 flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="text-sm font-semibold text-slate-800 break-words mt-0.5">
        {value}
      </div>
    </div>
  </div>
);

// Document Preview Modal
const DocumentPreviewModal = ({ document, onClose }) => {
  const { title, fileName, url, type } = document;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {title}
              </h3>
              <p className="text-xs text-slate-500 truncate">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-slate-100">
          {type === "image" ? (
            <div className="flex items-center justify-center h-full">
              <img
                src={url}
                alt={title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md"
              />
            </div>
          ) : (
            <div className="h-[70vh] rounded-xl overflow-hidden shadow-md bg-white">
              <iframe
                src={url}
                title={title}
                className="w-full h-full border-0"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-500 truncate">
            Previewing: {fileName}
          </p>
          <div className="flex gap-2">
            <a
              href={url}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <DownloadCloud className="w-4 h-4" />
              Download
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
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
