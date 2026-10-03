import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getJobByIdUser } from "../redux/slicer/jobSlice";

import {
  applyToJob,
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
  DollarSign,
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
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { getFlagByCountryName } from "../constants/countries";

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

  const { user, token, isAuthenticated, profileError } = useSelector(
    (state) => state.auth || {},
  );

  const isLoggedIn = Boolean(user || token || isAuthenticated);

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
  // COMPACT FORM DATA (MATCHING ROLE APPLY MODAL)
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentLocation: "",
    expectedSalary: "",
    linkedin: "",
    skills: "",
    resume: null,
    coverLetter: "",
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
      logoUrl:
        backendJob.companyLogo?.displayUrl ||
        backendJob.companyLogo?.url ||
        backendJob.companyLogo?.thumb ||
        (typeof backendJob.companyLogo === "string" && backendJob.companyLogo.startsWith("http")
          ? backendJob.companyLogo
          : null),
      logo:
        backendJob.company?.charAt(0)?.toUpperCase() ||
        "C",
      logoClass: "bg-[#A0E9FF] text-[#159FEF]",
      responsibilities: backendJob.responsibilities || [],
      requirements: backendJob.requirements || [],
      skills: backendJob.skills || [],
      countries: Array.isArray(backendJob.countries) ? backendJob.countries : [],
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
  // =========================================================
  // RESUME HANDLER
  // =========================================================

  const handleResume = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const isDoc = file.name && file.name.match(/\.(pdf|doc|docx)$/i);

    if (!allowedTypes.includes(file.type) && !isDoc) {
      alert("Invalid file type. Please select a .pdf, .doc, or .docx resume.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB.");
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

        skills: Array.isArray(profileData?.skills)
          ? profileData.skills.join(", ")
          : getProfileValue(profileData, "skills"),

        expectedSalary: getProfileValue(
          profileData,
          "expectedSalary",
          "salary",
        ),

        linkedin: getProfileValue(
          profileData,
          "linkedin",
          "linkedinUrl",
        ),

        coverLetter: getProfileValue(
          profileData,
          "bio",
          "about",
          "aboutMe",
          "coverLetter",
        ),
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
      currentLocation: "",
      expectedSalary: "",
      linkedin: "",
      skills: "",
      resume: null,
      coverLetter: "",
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

    if (!formData.resume) {
      alert("Please upload your resume (.pdf, .doc, or .docx).");
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
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());
      data.append("currentLocation", (formData.currentLocation || "").trim());
      data.append("expectedSalary", (formData.expectedSalary || "").trim());
      data.append("linkedin", (formData.linkedin || "").trim());
      data.append("coverLetter", (formData.coverLetter || "").trim());

      const skills = formData.skills
        ? formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];

      data.append("skills", JSON.stringify(skills));

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
                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#A0E9FF]/40 text-2xl font-bold text-[#159FEF]"
                  >
                    {job.logoUrl ? (
                      <img
                        src={job.logoUrl}
                        alt={job.company}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerText = job.logo;
                          }
                        }}
                      />
                    ) : (
                      job.logo
                    )}
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

                      {job.domain && (
                        <span className="rounded-full bg-[#A0E9FF]/40 px-2.5 py-0.5 text-xs font-semibold text-[#159FEF]">
                          {job.domain}
                        </span>
                      )}
                    </div>

                    {job.countries && job.countries.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">
                          Target Countries:
                        </span>
                        {job.countries.map((c, idx) => {
                          const countryName = c?.name || c?.countryName || "";
                          const flagUrl = c?.flag || getFlagByCountryName(countryName);
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                            >
                              {flagUrl && (
                                <img
                                  src={flagUrl}
                                  alt={countryName}
                                  className="h-3.5 w-5 rounded-sm object-cover"
                                />
                              )}
                              <span>{countryName}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
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
                    {job.salary && job.salary.trim() ? job.salary : "Undisclosed"}
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
                        {job.salary && job.salary.trim() ? job.salary : "Undisclosed"}
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
                    {isLoggedIn ? (
                      /* LOGGED IN USER */
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* MANUAL */}
                        <button
                          type="button"
                          onClick={handleApplyManually}
                          className="group rounded-xl border border-[#D9F3FA] p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF] transition group-hover:scale-105">
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
                          className="group rounded-xl border border-[#D9F3FA] p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF] transition group-hover:scale-105">
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
                    ) : (
                      /* GUEST USER (NO ACCOUNT / NOT LOGGED IN) */
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* APPLY NOW */}
                        <button
                          type="button"
                          onClick={handleApplyManually}
                          className="group rounded-xl border-2 border-[#30AFFF]/40 bg-[#F1FBFE]/60 p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#30AFFF] text-white shadow-md shadow-[#30AFFF]/20 transition group-hover:scale-105">
                            <Send size={20} />
                          </div>

                          <h3 className="mt-4 font-bold text-[#102B36]">
                            Apply Now
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-[#526F7A]">
                            Fill in the quick application form directly without creating an account.
                          </p>
                        </button>

                        {/* CREATE AN ACCOUNT */}
                        <button
                          type="button"
                          onClick={() => navigate("/register")}
                          className="group rounded-xl border border-[#D9F3FA] bg-white p-5 text-left transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A0E9FF] text-[#159FEF] transition group-hover:scale-105">
                            <UserPlus size={21} />
                          </div>

                          <h3 className="mt-4 font-bold text-[#102B36]">
                            Create an Account
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-[#526F7A]">
                            Create a free account to track applications, save jobs, and speed up future applications.
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* COMPACT MANUAL FORM (FIELDS MATCHING ROLE APPLY MODAL) */}

                {applicationStep === "manual" && (
                  <form
                    onSubmit={submitApplication}
                    className="overflow-y-auto px-5 py-6 sm:px-6"
                  >
                    {/* INFO BANNER */}
                    <div className="mb-5 rounded-xl border border-[#D9F3FA] bg-[#F1FBFE] p-4">
                      <h4 className="text-sm font-bold text-[#102B36]">
                        Quick Application
                      </h4>
                      <p className="mt-0.5 text-xs text-[#526F7A]">
                        Please enter your details, expected compensation, skills, and upload your resume.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* FULL NAME */}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                            className="w-full rounded-xl border border-[#D9F3FA] py-2.5 pl-9 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-[#D9F3FA] py-2.5 pl-9 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A969F]"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="+91 00000 00000"
                            className="w-full rounded-xl border border-[#D9F3FA] py-2.5 pl-9 pr-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                          />
                        </div>
                      </div>

                      {/* SKILLS */}
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Technical Skills & Tools
                        </label>
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="Relevant technical skills, libraries, frameworks..."
                          className="w-full rounded-xl border border-[#D9F3FA] px-3.5 py-2.5 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                        />
                      </div>

                      {/* RESUME UPLOAD */}
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Resume / CV * (.pdf, .doc, .docx)
                        </label>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#BDEAF5] bg-white p-4 text-center transition hover:border-[#30AFFF] hover:bg-[#F1FBFE]">
                          <Upload
                            size={20}
                            className="text-[#30AFFF]"
                          />
                          <span className="mt-2 text-xs font-semibold text-[#29444F]">
                            {formData.resume
                              ? formData.resume.name
                              : "Click to upload Resume / CV"}
                          </span>
                          <span className="mt-1 text-[11px] text-[#7A969F]">
                            Supported: PDF, DOC, DOCX up to 10MB
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResume}
                            className="hidden"
                          />
                        </label>
                        {formData.resume && (
                          <p className="mt-1.5 text-xs font-medium text-[#30AFFF]">
                            ✓ Selected: {formData.resume.name} (
                            {(formData.resume.size / 1024).toFixed(1)} KB)
                          </p>
                        )}
                      </div>

                      {/* COVER LETTER / ABOUT YOU */}
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-xs font-semibold text-[#29444F]">
                          Tell us about yourself & experience *
                        </label>
                        <textarea
                          required
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your background, relevant projects, and why this opportunity interests you..."
                          className="w-full resize-none rounded-xl border border-[#D9F3FA] p-3 text-sm text-[#29444F] outline-none transition placeholder:text-[#9AAEB5] focus:border-[#30AFFF] focus:ring-2 focus:ring-[#A0E9FF]"
                        />
                      </div>
                    </div>

                    {/* NOTICE */}
                    <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#A0E9FF] bg-[#F1FBFE] p-3 sm:p-3.5">
                      <AlertCircle
                        size={17}
                        className="mt-0.5 shrink-0 text-[#30AFFF]"
                      />
                      <p className="text-xs leading-relaxed text-[#159FEF]">
                        Please make sure all information provided is accurate
                        before submitting your application.
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-5 flex flex-col-reverse gap-3 border-t border-[#D9F3FA] pt-4 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        disabled={applying}
                        onClick={() => setApplicationStep("options")}
                        className="rounded-xl border border-[#D9F3FA] px-5 py-2.5 text-sm font-bold text-[#526F7A] transition hover:bg-[#F1FBFE] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={applying}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#30AFFF]/20 transition hover:bg-[#159FEF] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {applying ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send size={16} />
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

