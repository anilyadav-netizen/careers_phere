55
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { applyToJob, getJobByIdUser } from "../redux/slicer/jobSlice";

import {
  clearApplicationError,
  resetApplicationState,
  saveJob,
  unsaveJob,
} from "../redux/slicer/jobApplicationSlice";

import { getProfile } from "../redux/slicer/authSlice";

import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import { DollarSign } from "lucide-react";

const JobDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // =========================================================
  // JOB STATE
  // =========================================================

  const { selectedJob, jobLoading, jobError } = useSelector(
    (state) => state.jobs,
  );

  // =========================================================
  // AUTH / PROFILE STATE
  // =========================================================

  const { profileError } = useSelector((state) => state.auth || {});

  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const {
    applying,
    error: applicationError,
    message: applicationMessage,
    saving,
    unsaving,
  } = useSelector((state) => state.application || {});

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationBlockMessage, setApplicationBlockMessage] = useState("");
  const [applicationStep, setApplicationStep] = useState("options");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSavedDetails, setLoadingSavedDetails] = useState(false);

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experienceType: "",
    experience: "",
    profilePhoto: null,
    governmentDocument: null,
    resume: null,
    skills: "",
    currentLocation: "",
    expectedSalary: "",
    noticePeriod: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    additionalInfo: "",
    passport: "",
  });

  // =========================================================
  // GET JOB
  // =========================================================

  useEffect(() => {
    if (id) {
      dispatch(getJobByIdUser(id));
    }
  }, [dispatch, id]);

  // =========================================================
  // JOB DATA
  // =========================================================

  const backendJob = selectedJob;

  const job = backendJob
    ? {
      ...backendJob,
      id: backendJob._id || backendJob.id,
      type: backendJob.jobType || "Full Time",
      posted: backendJob.daysAgo || "Recently",
      applicants: backendJob.applicantCount ?? 0,
      logo:
        backendJob.companyLogo?.displayUrl ||
        backendJob.companyLogo?.url ||
        backendJob.company?.charAt(0)?.toUpperCase() ||
        "C",
      logoClass: "bg-[#A0E9FF] text-[#159FEF]",
      responsibilities: backendJob.responsibilities || [],
      requirements: backendJob.requirements || [],
      skills: backendJob.skills || [],
    }
    : null;

  // =========================================================
  // CHECK BACKEND SAVED STATUS
  // =========================================================

  useEffect(() => {
    if (!backendJob) return;

    if (typeof backendJob.isSaved === "boolean") {
      setIsSaved(backendJob.isSaved);
    } else if (typeof backendJob.saved === "boolean") {
      setIsSaved(backendJob.saved);
    }
  }, [backendJob]);

  // =========================================================
  // SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (showApplyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showApplyModal]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }

    if (applicationBlockMessage) {
      setApplicationBlockMessage("");
    }
  };

  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (file, allowedTypes, maxSize) => {
    if (!file) return false;

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please select a supported file.");
      return false;
    }

    if (file.size > maxSize) {
      alert(`File size should not exceed ${maxSize / (1024 * 1024)} MB.`);
      return false;
    }

    return true;
  };

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const handleProfilePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!validateFile(file, allowedTypes, 5 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // GOVERNMENT DOCUMENT
  // =========================================================

  const handleGovernmentDocument = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];

    if (!validateFile(file, allowedTypes, 10 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      governmentDocument: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // RESUME
  // =========================================================

  const handleResume = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["application/pdf"];

    if (!validateFile(file, allowedTypes, 10 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // PROFILE VALUE HELPER
  // =========================================================

  const getProfileValue = (profileData, ...keys) => {
    for (const key of keys) {
      const value = profileData?.[key];

      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }

    return "";
  };

  // =========================================================
  // LOAD PROFILE FROM BACKEND
  // =========================================================

  const handleUseSavedDetails = async () => {
    dispatch(clearApplicationError());
    setApplicationBlockMessage("");
    setLoadingSavedDetails(true);

    try {
      const result = await dispatch(getProfile()).unwrap();

      console.log("Profile fetched from backend:", result);

      const profileData =
        result?.data?.user || result?.data || result?.user || result;

      if (!profileData) {
        throw new Error("Profile data not found.");
      }

      setFormData((prev) => ({
        ...prev,

        name: getProfileValue(
          profileData,
          "name",
          "fullName",
          "firstName",
        ),

        email: getProfileValue(profileData, "email"),

        phone: getProfileValue(
          profileData,
          "phone",
          "mobile",
          "phoneNumber",
        ),

        currentLocation: getProfileValue(
          profileData,
          "currentLocation",
          "location",
          "city",
        ),

        experienceType: getProfileValue(
          profileData,
          "experienceType",
        ),

        experience: getProfileValue(
          profileData,
          "experience",
          "yearsOfExperience",
        ),

        skills: Array.isArray(profileData?.skills)
          ? profileData.skills.join(", ")
          : getProfileValue(profileData, "skills"),

        expectedSalary: getProfileValue(
          profileData,
          "expectedSalary",
          "salary",
        ),

        noticePeriod: getProfileValue(
          profileData,
          "noticePeriod",
        ),

        linkedin: getProfileValue(
          profileData,
          "linkedin",
          "linkedinUrl",
        ),

        portfolio: getProfileValue(
          profileData,
          "portfolio",
          "portfolioUrl",
        ),

        passport:
          profileData?.passport !== undefined &&
            profileData?.passport !== null
            ? String(profileData.passport)
            : "",
      }));

      setApplicationStep("manual");
    } catch (error) {
      console.error("Failed to load profile:", error);

      dispatch(clearApplicationError());

      alert(
        error ||
        profileError ||
        "Unable to load your profile. Please try again.",
      );
    } finally {
      setLoadingSavedDetails(false);
    }
  };

  // =========================================================
  // APPLY MANUALLY
  // =========================================================

  const handleApplyManually = () => {
    dispatch(clearApplicationError());
    setApplicationBlockMessage("");

    setFormData({
      name: "",
      email: "",
      phone: "",
      experienceType: "",
      experience: "",
      profilePhoto: null,
      governmentDocument: null,
      resume: null,
      skills: "",
      currentLocation: "",
      expectedSalary: "",
      noticePeriod: "",
      linkedin: "",
      portfolio: "",
      coverLetter: "",
      additionalInfo: "",
      passport: "",
    });

    setApplicationStep("manual");
  };

  // =========================================================
  // SAVE / UNSAVE JOB
  // =========================================================

  const handleSaveToggle = async () => {
    if (!job?._id) {
      console.error("Job ID is missing");
      return;
    }

    try {
      if (isSaved) {
        await dispatch(unsaveJob(job._id)).unwrap();
        setIsSaved(false);
        console.log("Job removed from saved jobs");
      } else {
        await dispatch(saveJob(job._id)).unwrap();
        setIsSaved(true);
        console.log("Job saved successfully");
      }
    } catch (error) {
      console.error("Save/Unsave job error:", error);
    }
  };

  // =========================================================
  // SUBMIT APPLICATION
  // =========================================================

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!job?._id) {
      alert("Job information is missing.");
      return;
    }

    dispatch(clearApplicationError());
    setApplicationBlockMessage("");

    try {
      console.log("========== SUBMIT APPLICATION ==========");
      console.log("JOB ID:", job._id);
      console.log("FORM DATA:", formData);

      const data = new FormData();

      data.append("jobId", job._id);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("experienceType", formData.experienceType);
      data.append("experience", formData.experience);

      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      data.append("skills", JSON.stringify(skills));

      data.append("currentLocation", formData.currentLocation);
      data.append("expectedSalary", formData.expectedSalary);
      data.append("noticePeriod", formData.noticePeriod);
      data.append("linkedin", formData.linkedin);
      data.append("portfolio", formData.portfolio);
      data.append("coverLetter", formData.coverLetter);
      data.append("additionalInfo", formData.additionalInfo);
      data.append("passport", formData.passport);

      if (formData.profilePhoto) {
        data.append("profilePhoto", formData.profilePhoto);
      }

      if (formData.governmentDocument) {
        data.append("governmentDocument", formData.governmentDocument);
      }

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      for (const [key, value] of data.entries()) {
        console.log(
          key,
          value instanceof File ? value.name : value,
        );
      }

      const result = await dispatch(applyToJob(data)).unwrap();

      console.log("Application submitted successfully:", result);

      setApplicationBlockMessage("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Application submission error:", error);

      setIsSubmitted(false);

      // =====================================================
      // 4 APPLICATION LIFETIME LIMIT
      // =====================================================

      if (
        error?.code === "APPLICATION_LIMIT_REACHED" ||
        error?.response?.data?.code === "APPLICATION_LIMIT_REACHED"
      ) {
        setApplicationBlockMessage(
          "You have reached the maximum limit of 4 job applications. You cannot apply for any more jobs with this account.",
        );
        return;
      }

      // =====================================================
      // DUPLICATE APPLICATION
      // =====================================================

      if (
        error?.code === "ALREADY_APPLIED" ||
        error?.response?.data?.code === "ALREADY_APPLIED"
      ) {
        setApplicationBlockMessage(
          "You have already applied to this job.",
        );
        return;
      }

      // =====================================================
      // OTHER BACKEND ERRORS
      // =====================================================

      if (typeof error === "string") {
        setApplicationBlockMessage(error);
      }
    }
  };

  // =========================================================
  // OPEN APPLY MODAL
  // =========================================================

  const openApplyModal = () => {
    dispatch(resetApplicationState());

    setIsSubmitted(false);
    setApplicationStep("options");
    setApplicationBlockMessage("");
    setShowApplyModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (applying) return;

    setShowApplyModal(false);
    setApplicationStep("options");
    setIsSubmitted(false);
    setApplicationBlockMessage("");
    setLoadingSavedDetails(false);

    dispatch(resetApplicationState());
  };

  // =========================================================
  // SHARE JOB
  // =========================================================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title,
          text: `${job?.title} at ${job?.company}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Job link copied!");
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (jobLoading) {
    return (
      <main className="min-h-screen bg-[#F7FCFF] px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#D9F3FA] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#A0E9FF] border-t-[#30AFFF]" />

          <h1 className="mt-5 text-xl font-bold text-[#102B36]">
            Loading Job...
          </h1>

          <p className="mt-2 text-sm text-[#526F7A]">
            Please wait while job details are loading.
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // JOB NOT FOUND
  // =========================================================

  if (!job) {
    return (
      <main className="min-h-screen bg-[#F7FCFF] px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#D9F3FA] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#102B36]">
            Job not found
          </h1>

          <p className="mt-2 text-sm text-[#526F7A]">
            {jobError || "This job may no longer be available."}
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-lg bg-[#30AFFF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#159FEF]"
          >
            Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      {/* BACK BUTTON */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 text-sm font-semibold text-[#526F7A] transition hover:text-[#30AFFF]"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>
      </div>

      {/* MAIN CONTENT */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT CONTENT */}

          <div className="lg:col-span-2">
            {/* JOB HEADER */}

            <div className="rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-bold ${job.logoClass}`}
                  >
                    {job.logo}
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold leading-tight text-[#102B36] sm:text-3xl">
                      {job.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#526F7A]">
                      <span className="flex items-center gap-1.5">
                        <Building2 size={16} />
                        {job.company}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveToggle}
                    disabled={saving || unsaving}
                    title={isSaved ? "Unsave Job" : "Save Job"}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${isSaved
                      ? "border-[#30AFFF] bg-[#A0E9FF] text-[#159FEF]"
                      : "border-[#D9F3FA] bg-white text-[#6B8792] hover:border-[#30AFFF] hover:text-[#30AFFF]"
                      } ${saving || unsaving
                        ? "cursor-not-allowed opacity-60"
                        : ""
                      }`}
                  >
                    {saving || unsaving ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#30AFFF] border-t-transparent" />
                    ) : (
                      <Bookmark
                        size={19}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9F3FA] bg-white text-[#6B8792] transition hover:border-[#30AFFF] hover:text-[#30AFFF]"
                    title="Share Job"
                  >
                    <Share2 size={19} />
                  </button>
                </div>
              </div>

              {/* META */}

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-[#F1FBFE] px-3 py-2 text-sm text-[#526F7A]">
                  <BriefcaseBusiness
                    size={17}
                    className="text-[#30AFFF]"
                  />
                  {job.experience}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-[#F1FBFE] px-3 py-2 text-sm text-[#526F7A]">
                  <Clock3 size={17} className="text-[#30AFFF]" />
                  {job.type}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-[#F1FBFE] px-3 py-2 text-sm text-[#526F7A]">
                  <MapPin size={17} className="text-[#30AFFF]" />
                  {job.location}
                </div>
              </div>

              {/* STATS */}

              <div className="mt-6 grid grid-cols-1 divide-y divide-[#D9F3FA] border-t border-[#D9F3FA] pt-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="pb-4 sm:px-4 sm:pb-0 sm:first:pl-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#7A969F]">
                    Salary
                  </div>

                  <p className="mt-1 font-bold text-[#102B36]">
                    {job.salary}
                  </p>
                </div>

                <div className="py-4 sm:px-4 sm:py-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#7A969F]">
                    <Clock3 size={15} />
                    Posted
                  </div>

                  <p className="mt-1 font-bold text-[#102B36]">
                    {job.posted}
                  </p>
                </div>

                <div className="pt-4 sm:px-4 sm:pt-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#7A969F]">
                    <Users size={15} />
                    Applicants
                  </div>

                  <p className="mt-1 font-bold text-[#102B36]">
                    {job.applicants}
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-[#102B36]">
                Job Description
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#526F7A] sm:text-base">
                {job.description}
              </p>
            </div>

            {/* RESPONSIBILITIES */}

            <div className="mt-6 rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-[#102B36]">
                Responsibilities
              </h2>

              <div className="mt-5 space-y-4">
                {job.responsibilities?.length > 0 ? (
                  job.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-[#526F7A] sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-[#30AFFF]"
                      />

                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#6B8792]">
                    No responsibilities specified.
                  </p>
                )}
              </div>
            </div>

            {/* REQUIREMENTS */}

            <div className="mt-6 rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-[#102B36]">
                Requirements
              </h2>

              <div className="mt-5 space-y-4">
                {job.requirements?.length > 0 ? (
                  job.requirements.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-[#526F7A] sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-[#30AFFF]"
                      />

                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#6B8792]">
                    No requirements specified.
                  </p>
                )}
              </div>
            </div>

            {/* SKILLS */}

            <div className="mt-6 rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-[#102B36]">
                Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills?.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg border border-[#A0E9FF] bg-[#F1FBFE] px-3 py-2 text-sm font-semibold text-[#159FEF]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-[#6B8792]">
                    No skills specified.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-[#D9F3FA] bg-white p-5 shadow-sm sm:p-6">
              {/* APPLY */}

              <button
                onClick={openApplyModal}
                disabled={applying}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#159FEF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Apply Now
                <Send size={17} />
              </button>

              {/* OVERVIEW */}

              <div className="mt-7">
                <h2 className="text-lg font-bold text-[#102B36]">
                  Job Overview
                </h2>

                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1FBFE] text-[#30AFFF]">
                      <BriefcaseBusiness size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#7A969F]">
                        Experience
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#29444F]">
                        {job.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1FBFE] text-[#30AFFF]">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#7A969F]">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#29444F]">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1FBFE] text-[#30AFFF]">
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#7A969F]">
                        Salary
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#29444F]">
                        {job.salary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1FBFE] text-[#30AFFF]">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#7A969F]">
                        Posted
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#29444F]">
                        {job.posted}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1FBFE] text-[#30AFFF]">
                      <Building2 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#7A969F]">
                        Company
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#29444F]">
                        {job.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          APPLICATION MODAL
      ===================================================== */}

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B36]/50 px-4 py-6">
          <div className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#D9F3FA] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-[#102B36] sm:text-xl">
                  Apply for {job.title}
                </h2>

                <p className="mt-1 text-sm text-[#526F7A]">
                  {job.company}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={applying || loadingSavedDetails}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B8792] transition hover:bg-[#F1FBFE] hover:text-[#102B36] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* APPLICATION LIMIT / BLOCK MESSAGE */}

            {applicationBlockMessage ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4D6] text-[#C58A00]">
                  <AlertCircle size={34} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#102B36]">
                  Application Limit Reached
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#526F7A]">
                  {applicationBlockMessage}
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-7 rounded-lg bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#159FEF]"
                >
                  Close
                </button>
              </div>
            ) : isSubmitted ? (
              /* SUCCESS */

              <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5FAF2] text-[#20A978]">
                  <CheckCircle2 size={34} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#102B36]">
                  Application Submitted!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#526F7A]">
                  {applicationMessage ||
                    "Your application has been submitted successfully. The employer will review your application."}
                </p>

                <button
                  onClick={closeModal}
                  className="mt-7 rounded-lg bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#159FEF]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* ERROR */}

                {applicationError && (
                  <div className="mx-5 mt-4 flex items-start gap-3 rounded-lg border border-[#F5C6C6] bg-[#FFF5F5] p-4 sm:mx-6">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-[#DC4A4A]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#B52F2F]">
                        Application Failed
                      </p>

                      <p className="mt-1 text-sm text-[#C43B3B]">
                        {applicationError}
                      </p>
                    </div>
                  </div>
                )}

                {/* OPTIONS */}

                {applicationStep === "options" && (
                  <div className="overflow-y-auto px-5 py-6 sm:px-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* MANUAL */}

                      <button
                        type="button"
                        onClick={handleApplyManually}
                        className="rounded-xl border border-[#D9F3FA] p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF]">
                          <User size={21} />
                        </div>

                        <h3 className="mt-4 font-bold text-[#102B36]">
                          Apply Manually
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#526F7A]">
                          Fill in your details and submit your application.
                        </p>
                      </button>

                      {/* SAVED DETAILS */}

                      <button
                        type="button"
                        onClick={handleUseSavedDetails}
                        disabled={loadingSavedDetails}
                        className="rounded-xl border border-[#D9F3FA] p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF]">
                          {loadingSavedDetails ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#30AFFF] border-t-transparent" />
                          ) : (
                            <FileText size={21} />
                          )}
                        </div>

                        <h3 className="mt-4 font-bold text-[#102B36]">
                          {loadingSavedDetails
                            ? "Loading Profile..."
                            : "Use Saved Details"}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#526F7A]">
                          Continue with your profile information from your
                          account.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* MANUAL FORM */}

                {applicationStep === "manual" && (
                  <form
                    onSubmit={submitApplication}
                    className="overflow-y-auto px-5 py-6 sm:px-6"
                  >
                    {/* PERSONAL INFORMATION */}

                    <div>
                      <h3 className="text-base font-bold text-[#102B36]">
                        Personal Information
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {/* NAME */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Full Name *
                          </label>

                          <div className="relative">
                            <User
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                            />

                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your full name"
                              className="w-full rounded-lg border border-[#D9F3FA] py-3 pl-10 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>
                        </div>

                        {/* EMAIL */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Email *
                          </label>

                          <div className="relative">
                            <Mail
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                            />

                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your email"
                              className="w-full rounded-lg border border-[#D9F3FA] py-3 pl-10 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>
                        </div>

                        {/* PHONE */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Phone *
                          </label>

                          <div className="relative">
                            <Phone
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                            />

                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your phone number"
                              className="w-full rounded-lg border border-[#D9F3FA] py-3 pl-10 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>
                        </div>

                        {/* LOCATION */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Current Location *
                          </label>

                          <div className="relative">
                            <MapPin
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                            />

                            <input
                              type="text"
                              name="currentLocation"
                              value={formData.currentLocation}
                              onChange={handleInputChange}
                              required
                              placeholder="City, State"
                              className="w-full rounded-lg border border-[#D9F3FA] py-3 pl-10 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* EXPERIENCE */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-[#102B36]">
                        Experience
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Experience Type *
                          </label>

                          <select
                            name="experienceType"
                            value={formData.experienceType}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#D9F3FA] bg-white px-3 py-3 text-sm text-[#29444F] outline-none transition focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          >
                            <option value="">
                              Select experience type
                            </option>

                            <option value="Fresher">Fresher</option>

                            <option value="Experienced">
                              Experienced
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Years of Experience
                          </label>

                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="e.g. 2 years"
                            className="w-full rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* PASSPORT */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-[#102B36]">
                        Passport Information
                      </h3>

                      <div className="mt-4 rounded-xl border border-[#D9F3FA] bg-[#F1FBFE] p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF]">
                            <IdCard size={19} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#29444F]">
                              Do you have a passport? *
                            </p>

                            <p className="mt-1 text-xs text-[#6B8792]">
                              Please select Yes or No.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {/* YES */}

                          <label
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${formData.passport === "Yes"
                              ? "border-[#30AFFF] bg-[#A0E9FF] text-[#159FEF]"
                              : "border-[#D9F3FA] bg-white text-[#526F7A] hover:border-[#30AFFF]"
                              }`}
                          >
                            <input
                              type="radio"
                              name="passport"
                              value="Yes"
                              checked={formData.passport === "Yes"}
                              onChange={handleInputChange}
                              required
                              className="h-4 w-4 accent-[#30AFFF]"
                            />
                            Yes
                          </label>

                          {/* NO */}

                          <label
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${formData.passport === "No"
                              ? "border-[#30AFFF] bg-[#A0E9FF] text-[#159FEF]"
                              : "border-[#D9F3FA] bg-white text-[#526F7A] hover:border-[#30AFFF]"
                              }`}
                          >
                            <input
                              type="radio"
                              name="passport"
                              value="No"
                              checked={formData.passport === "No"}
                              onChange={handleInputChange}
                              required
                              className="h-4 w-4 accent-[#30AFFF]"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENTS */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-[#102B36]">
                        Documents
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {/* PROFILE PHOTO */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Profile Photo
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#BDEAF5] p-4 text-center transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]">
                            <Upload
                              size={20}
                              className="text-[#7A969F]"
                            />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-[#6B8792]">
                              {formData.profilePhoto
                                ? formData.profilePhoto.name
                                : "Upload Photo"}
                            </span>

                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleProfilePhoto}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* GOVERNMENT DOCUMENT */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Government Document
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#BDEAF5] p-4 text-center transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]">
                            <FileText
                              size={20}
                              className="text-[#7A969F]"
                            />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-[#6B8792]">
                              {formData.governmentDocument
                                ? formData.governmentDocument.name
                                : "Upload Document"}
                            </span>

                            <input
                              type="file"
                              accept=".pdf,image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleGovernmentDocument}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* RESUME */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Resume *
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#BDEAF5] p-4 text-center transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]">
                            <FileText
                              size={20}
                              className="text-[#7A969F]"
                            />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-[#6B8792]">
                              {formData.resume
                                ? formData.resume.name
                                : "Upload Resume"}
                            </span>

                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={handleResume}
                              required
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* PROFESSIONAL INFORMATION */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-[#102B36]">
                        Professional Information
                      </h3>

                      <div className="mt-4 space-y-4">
                        {/* SKILLS */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Skills *
                          </label>

                          <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            required
                            placeholder="React, JavaScript, Node.js..."
                            className="w-full rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>

                        {/* SALARY / NOTICE */}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                              Expected Salary
                            </label>

                            <input
                              type="text"
                              name="expectedSalary"
                              value={formData.expectedSalary}
                              onChange={handleInputChange}
                              placeholder="e.g. ₹6 LPA"
                              className="w-full rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                              Notice Period
                            </label>

                            <input
                              type="text"
                              name="noticePeriod"
                              value={formData.noticePeriod}
                              onChange={handleInputChange}
                              placeholder="e.g. 30 days"
                              className="w-full rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>
                        </div>

                        {/* LINKEDIN / PORTFOLIO */}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                              LinkedIn
                            </label>

                            <input
                              type="url"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              placeholder="LinkedIn URL"
                              className="w-full rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                              Portfolio
                            </label>

                            <div className="relative">
                              <Globe
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                              />

                              <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleInputChange}
                                placeholder="Portfolio URL"
                                className="w-full rounded-lg border border-[#D9F3FA] py-3 pl-10 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* COVER LETTER */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Cover Letter
                          </label>

                          <textarea
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Write a short cover letter..."
                            className="w-full resize-none rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>

                        {/* ADDITIONAL INFO */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[#29444F]">
                            Additional Information
                          </label>

                          <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Anything else you want the employer to know..."
                            className="w-full resize-none rounded-lg border border-[#D9F3FA] px-3 py-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NOTICE */}

                    <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#A0E9FF] bg-[#F1FBFE] p-4">
                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-[#30AFFF]"
                      />

                      <p className="text-xs leading-5 text-[#159FEF] sm:text-sm">
                        Please make sure all information provided is accurate
                        before submitting your application.
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#D9F3FA] pt-5 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        disabled={applying}
                        onClick={() => setApplicationStep("options")}
                        className="rounded-lg border border-[#D9F3FA] px-5 py-3 text-sm font-bold text-[#526F7A] transition hover:bg-[#F1FBFE] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={applying}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#159FEF] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {applying ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send size={17} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetail;

