import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Target,
  Upload,
  User,
  UserRound,
  VenusAndMars,
  X,
  ExternalLink,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../redux/slicer/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    user: reduxUser,
    loading,
    updating,
    error,
  } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  /* =====================================================
     FILE STATES
  ===================================================== */

  const [profilePhotoFile, setProfilePhotoFile] =
    useState(null);

  const [governmentDocumentFile, setGovernmentDocumentFile] =
    useState(null);

  const [resumeFile, setResumeFile] =
    useState(null);

  /* =====================================================
     PROFILE PHOTO PREVIEW URL
  ===================================================== */

  const [profilePhotoPreview, setProfilePhotoPreview] =
    useState("");

  /* =====================================================
     FORM DATA
  ===================================================== */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    dateOfBirth: "",
    gender: "",

    qualification: "",
    university: "",
    graduationYear: "",

    experience: "",
    currentCompany: "",
    jobTitle: "",
    skills: "",
    bio: "",

    linkedin: "",
    github: "",
    portfolio: "",

    preferredJobRole: "",
    preferredLocation: "",
    employmentType: "",
    salaryExpectation: "",

    resume: "",
    profilePhoto: "",

    governmentDocumentType: "",
    governmentDocument: "",
    governmentDocumentName: "",
  });

  /* =====================================================
     GET PROFILE
  ===================================================== */

  useEffect(() => {
    if (!reduxUser) {
      dispatch(getProfile());
    }
  }, [dispatch, reduxUser]);

  /* =====================================================
     SET PROFILE DATA
  ===================================================== */

  useEffect(() => {
    if (!reduxUser) return;

    setUser(reduxUser);

    setFormData({
      name: reduxUser.name || "",
      email: reduxUser.email || "",

      mobile:
        reduxUser.mobile ||
        reduxUser.phone ||
        "",

      location: reduxUser.location || "",

      dateOfBirth: reduxUser.dateOfBirth
        ? String(reduxUser.dateOfBirth).substring(0, 10)
        : "",

      gender: reduxUser.gender || "",

      qualification:
        reduxUser.qualification || "",

      university:
        reduxUser.university || "",

      graduationYear:
        reduxUser.graduationYear || "",

      experience:
        reduxUser.experience || "",

      currentCompany:
        reduxUser.currentCompany || "",

      jobTitle:
        reduxUser.jobTitle || "",

      skills: Array.isArray(reduxUser.skills)
        ? reduxUser.skills.join(", ")
        : reduxUser.skills || "",

      bio:
        reduxUser.bio || "",

      linkedin:
        reduxUser.linkedin || "",

      github:
        reduxUser.github || "",

      portfolio:
        reduxUser.portfolio || "",

      preferredJobRole:
        reduxUser.preferredJobRole || "",

      preferredLocation:
        reduxUser.preferredLocation || "",

      employmentType:
        reduxUser.employmentType || "",

      salaryExpectation:
        reduxUser.salaryExpectation || "",

      resume:
        reduxUser.resume || "",

      profilePhoto:
        reduxUser.profilePhoto || "",

      governmentDocumentType:
        reduxUser.governmentDocumentType || "",

      governmentDocument:
        reduxUser.governmentDocument || "",

      governmentDocumentName:
        reduxUser.governmentDocumentName || "",
    });
  }, [reduxUser]);

  /* =====================================================
     CLEANUP PROFILE PHOTO PREVIEW
  ===================================================== */

  useEffect(() => {
    return () => {
      if (profilePhotoPreview) {
        URL.revokeObjectURL(profilePhotoPreview);
      }
    };
  }, [profilePhotoPreview]);

  /* =====================================================
     HELPERS
  ===================================================== */

  const getInitials = (name = "") => {
    const words = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (!words.length) return "U";

    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Not provided";
    }
  };

  const normalizeUrl = (url) => {
    if (!url) return "#";

    const value = String(url).trim();

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `https://${value}`;
  };

  const getProfilePhotoUrl = () => {
    if (!user?.profilePhoto) return "";

    if (typeof user.profilePhoto === "string") {
      return user.profilePhoto;
    }

    return (
      user.profilePhoto?.displayUrl ||
      user.profilePhoto?.url ||
      user.profilePhoto?.secureUrl ||
      ""
    );
  };

  const skillsArray = useMemo(() => {
    if (!user?.skills) return [];

    if (Array.isArray(user.skills)) {
      return user.skills
        .map((skill) => String(skill).trim())
        .filter(Boolean);
    }

    return String(user.skills)
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }, [user]);

  /* =====================================================
     PROFILE COMPLETION
  ===================================================== */

  const profileCompletion = useMemo(() => {
    if (!user) return 0;

    const fields = [
      user.name,
      user.email,
      user.mobile || user.phone,
      user.location,
      user.dateOfBirth,
      user.gender,
      user.qualification,
      user.university,
      user.graduationYear,
      user.experience,
      user.jobTitle,
      user.skills,
      user.bio,
      user.preferredJobRole,
      user.preferredLocation,
      user.employmentType,
      user.salaryExpectation,
      user.resume,
      user.profilePhoto,
    ];

    const completed = fields.filter(
      (field) =>
        field !== undefined &&
        field !== null &&
        String(field).trim() !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [user]);

  /* =====================================================
     CHANGE INPUT
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (saveMessage && messageType === "error") {
      setSaveMessage("");
      setMessageType("");
    }
  };

  /* =====================================================
     PROFILE PHOTO
  ===================================================== */

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSaveMessage(
        "Please upload a valid JPG, PNG, WEBP or GIF image."
      );
      setMessageType("error");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage(
        "Profile photo must be less than 5MB."
      );
      setMessageType("error");

      e.target.value = "";
      return;
    }

    if (profilePhotoPreview) {
      URL.revokeObjectURL(profilePhotoPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setProfilePhotoFile(file);
    setProfilePhotoPreview(previewUrl);

    setFormData((prev) => ({
      ...prev,
      profilePhoto: previewUrl,
    }));

    setSaveMessage("");
    setMessageType("");

    e.target.value = "";
  };

  /* =====================================================
     RESUME PDF UPLOAD
  ===================================================== */

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setSaveMessage(
        "Only PDF resume is allowed."
      );

      setMessageType("error");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage(
        "Resume PDF must be less than 5MB."
      );

      setMessageType("error");

      e.target.value = "";
      return;
    }

    setResumeFile(file);

    setSaveMessage("");
    setMessageType("");

    e.target.value = "";
  };

  /* =====================================================
     GOVERNMENT DOCUMENT
  ===================================================== */

  const handleGovernmentDocumentChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!formData.governmentDocumentType) {
      setSaveMessage(
        "Please select government document type first."
      );

      setMessageType("error");

      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSaveMessage(
        "Government document must be JPG, PNG, WEBP, GIF or PDF."
      );

      setMessageType("error");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage(
        "Government document must be less than 5MB."
      );

      setMessageType("error");

      e.target.value = "";
      return;
    }

    setGovernmentDocumentFile(file);

    setFormData((prev) => ({
      ...prev,
      governmentDocumentName: file.name,
    }));

    setSaveMessage("");
    setMessageType("");

    e.target.value = "";
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const openEditModal = () => {
    setSaveMessage("");
    setMessageType("");

    setProfilePhotoFile(null);
    setResumeFile(null);
    setGovernmentDocumentFile(null);

    setShowEditModal(true);
  };

  /* =====================================================
     CLOSE EDIT MODAL
  ===================================================== */

  const closeEditModal = () => {
    if (updating) return;

    setProfilePhotoFile(null);
    setResumeFile(null);
    setGovernmentDocumentFile(null);

    if (profilePhotoPreview) {
      URL.revokeObjectURL(profilePhotoPreview);
      setProfilePhotoPreview("");
    }

    /*
      Re-sync form with saved user data when cancelling.
      This prevents temporary preview/file state from
      remaining in the form.
    */
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile:
          user.mobile ||
          user.phone ||
          "",
        location: user.location || "",

        dateOfBirth: user.dateOfBirth
          ? String(user.dateOfBirth).substring(0, 10)
          : "",

        gender: user.gender || "",

        qualification:
          user.qualification || "",

        university:
          user.university || "",

        graduationYear:
          user.graduationYear || "",

        experience:
          user.experience || "",

        currentCompany:
          user.currentCompany || "",

        jobTitle:
          user.jobTitle || "",

        skills: Array.isArray(user.skills)
          ? user.skills.join(", ")
          : user.skills || "",

        bio:
          user.bio || "",

        linkedin:
          user.linkedin || "",

        github:
          user.github || "",

        portfolio:
          user.portfolio || "",

        preferredJobRole:
          user.preferredJobRole || "",

        preferredLocation:
          user.preferredLocation || "",

        employmentType:
          user.employmentType || "",

        salaryExpectation:
          user.salaryExpectation || "",

        resume:
          user.resume || "",

        profilePhoto:
          user.profilePhoto || "",

        governmentDocumentType:
          user.governmentDocumentType || "",

        governmentDocument:
          user.governmentDocument || "",

        governmentDocumentName:
          user.governmentDocumentName || "",
      });
    }

    setSaveMessage("");
    setMessageType("");

    setShowEditModal(false);
  };

  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSave = async (e) => {
    e.preventDefault();

    if (updating) return;

    setSaveMessage("");
    setMessageType("");

    try {
      const data = new FormData();

      /*
        IMPORTANT:
        Existing URLs / values should not be sent as files.
        Only newly selected files are appended below.
      */

      Object.entries(formData).forEach(
        ([key, value]) => {
          if (
            key === "profilePhoto" ||
            key === "governmentDocument" ||
            key === "resume" ||
            key === "skills"
          ) {
            return;
          }

          data.append(
            key,
            value ?? ""
          );
        }
      );

      /* SKILLS */

      data.append(
        "skills",
        Array.isArray(formData.skills)
          ? formData.skills
            .map((skill) => String(skill).trim())
            .filter(Boolean)
            .join(",")
          : String(formData.skills || "")
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
            .join(",")
      );

      /* PROFILE PHOTO */

      if (
        profilePhotoFile instanceof File
      ) {
        data.append(
          "profilePhoto",
          profilePhotoFile
        );
      }

      /* GOVERNMENT DOCUMENT */

      if (
        governmentDocumentFile instanceof File
      ) {
        data.append(
          "governmentDocument",
          governmentDocumentFile
        );
      }

      /* RESUME */

      if (resumeFile instanceof File) {
        data.append(
          "resume",
          resumeFile
        );
      }

      /*
        Do NOT manually set:
        Content-Type: multipart/form-data

        Axios/browser will automatically set the
        correct boundary for FormData.
      */

      const response = await dispatch(
        updateProfile(data)
      ).unwrap();

      setSaveMessage(
        response?.message ||
        "Profile updated successfully."
      );

      setMessageType("success");

      /*
        Immediately update local UI if API returned
        updated user.
      */

      if (response?.data) {
        setUser(response.data);
      }

      /*
        Fetch latest profile from backend so Redux
        and local state remain synchronized.
      */

      const profileResponse =
        await dispatch(
          getProfile()
        ).unwrap();

      /*
        If getProfile returns user data, make local
        state use that latest version.
      */

      if (profileResponse?.data) {
        setUser(profileResponse.data);
      } else if (profileResponse?.user) {
        setUser(profileResponse.user);
      }

      setTimeout(() => {
        setProfilePhotoFile(null);
        setResumeFile(null);
        setGovernmentDocumentFile(null);

        if (profilePhotoPreview) {
          URL.revokeObjectURL(
            profilePhotoPreview
          );
          setProfilePhotoPreview("");
        }

        setShowEditModal(false);
        setSaveMessage("");
        setMessageType("");
      }, 800);
    } catch (err) {
      setSaveMessage(
        typeof err === "string"
          ? err
          : err?.message ||
          err?.payload?.message ||
          "Failed to update profile."
      );

      setMessageType("error");
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#A0E9FF] border-t-[#30AFFF] animate-spin mx-auto" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     NO USER
  ===================================================== */

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-md w-full">
          <UserRound className="w-12 h-12 text-slate-300 mx-auto" />

          <h2 className="text-xl font-bold text-slate-800 mt-4">
            Profile not found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     PROFILE PHOTO URL
  ===================================================== */

  const profilePhotoUrl =
    profilePhotoPreview ||
    getProfilePhotoUrl();

  return (
    <div className="min-h-screen bg-slate-50 pb-10">

      {/* MESSAGE */}

      {saveMessage && (
        <div
          className={`fixed top-5 right-5 z-[100] max-w-sm rounded-xl px-5 py-3 shadow-xl border flex items-center gap-3 ${messageType === "success"
              ? "bg-white border-emerald-200 text-emerald-700"
              : "bg-white border-red-200 text-red-700"
            }`}
        >
          {messageType === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <X className="w-5 h-5 shrink-0" />
          )}

          <span className="text-sm font-medium">
            {saveMessage}
          </span>
        </div>
      )}

      {/* PAGE CONTAINER */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7">

        {/* PROFILE HEADER */}

        <section className="relative bg-white rounded-3xl border border-slate-200 shadow-sm">

          {/* COVER */}

          <div className="h-36 sm:h-48 bg-gradient-to-r from-[#159FEF] via-[#30AFFF] to-[#159FEF] relative overflow-hidden rounded-t-3xl">

            <div className="absolute -right-16 -top-24 w-80 h-80 rounded-full border-[60px] border-white/10" />

            <div className="absolute -left-20 -bottom-40 w-96 h-96 rounded-full border-[70px] border-white/10" />

            <div className="absolute right-5 top-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white text-xs font-semibold">
                Career Profile
              </span>
            </div>
          </div>

          {/* PROFILE AREA */}

          <div className="px-5 sm:px-8 pb-7 relative z-10">

            <div className="-mt-14 sm:-mt-20 relative z-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              {/* USER */}

              <div className="relative z-20 flex flex-col sm:flex-row sm:items-end gap-4 min-w-0">

                {/* AVATAR */}

                <div className="relative z-20 shrink-0">

                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-1.5 shadow-xl">

                    <div className="w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#30AFFF] to-[#159FEF] flex items-center justify-center">

                      {profilePhotoUrl ? (
                        <img
                          src={profilePhotoUrl}
                          alt={
                            user?.name ||
                            "Profile"
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl sm:text-5xl font-bold text-white">
                          {getInitials(
                            user?.name
                          )}
                        </span>
                      )}

                    </div>
                  </div>

                  {(user.isVerified ||
                    user.verified) && (
                      <div className="absolute -right-2 bottom-2 bg-white rounded-full p-1 shadow">
                        <CheckCircle2 className="w-7 h-7 text-[#159FEF] fill-[#A0E9FF]" />
                      </div>
                    )}

                  {/* QUICK PHOTO UPDATE */}

                  <label
                    title="Change profile photo"
                    className="absolute -right-2 -top-2 w-10 h-10 rounded-xl bg-[#30AFFF] hover:bg-[#159FEF] text-white flex items-center justify-center cursor-pointer shadow-lg transition border-2 border-white"
                  >
                    <Camera className="w-4 h-4" />

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                      onChange={(e) => {
                        handleProfilePhotoChange(
                          e
                        );

                        setShowEditModal(
                          true
                        );
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* NAME */}

                <div className="relative z-30 pb-1 min-w-0">

                  <div className="flex flex-wrap items-center gap-2 mb-2">

                    <h1 className="relative z-30 text-2xl sm:text-3xl font-bold text-white break-words">
                      {user?.name
                        ? user.name.toLowerCase().replace(/^./, (char) => char.toUpperCase())
                        : "Your Name"}
                    </h1>

                    {(user.isVerified ||
                      user.verified) && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A0E9FF]/30 text-[#159FEF] text-xs font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}

                  </div>

                  <p className="mt-1 text-base font-medium text-slate-600">
                    {user?.jobTitle ||
                      "Job Seeker"}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-slate-500">

                    {user.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#159FEF]" />
                        {user.location}
                      </span>
                    )}

                    {user.email && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-[#159FEF]" />
                        {user.email}
                      </span>
                    )}

                  </div>

                </div>
              </div>

              {/* EDIT */}

              <button
                onClick={openEditModal}
                className="relative z-30 w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#30AFFF] hover:bg-[#159FEF] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-[#30AFFF]/20 transition"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>

            </div>

            {/* QUICK INFO */}

            <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3">

              <QuickStat
                icon={BriefcaseBusiness}
                label="Experience"
                value={
                  user.experience ||
                  "Fresher"
                }
              />

              <QuickStat
                icon={GraduationCap}
                label="Qualification"
                value={
                  user.qualification ||
                  "Not added"
                }
              />

              <QuickStat
                icon={Target}
                label="Preferred Role"
                value={
                  user.preferredJobRole ||
                  "Not added"
                }
              />

              <QuickStat
                icon={MapPin}
                label="Preferred Location"
                value={
                  user.preferredLocation ||
                  "Not added"
                }
              />

            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">

            {/* ABOUT */}

            <ProfileCard
              icon={UserRound}
              title="About Me"
              subtitle="Professional introduction"
            >
              <p className="text-sm sm:text-base text-slate-600 leading-7">
                {user.bio ||
                  "Add a professional summary to tell employers about your experience, skills and career goals."}
              </p>
            </ProfileCard>

            {/* PERSONAL INFORMATION */}

            <ProfileCard
              icon={User}
              title="Personal Information"
              subtitle="Your basic profile details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={user.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Mobile Number"
                  value={
                    user.mobile ||
                    user.phone
                  }
                />

                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={user.location}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Date of Birth"
                  value={formatDate(
                    user.dateOfBirth
                  )}
                />

                <InfoItem
                  icon={VenusAndMars}
                  label="Gender"
                  value={user.gender}
                />

                <InfoItem
                  icon={Globe}
                  label="Profile Type"
                  value="Job Seeker"
                />

              </div>
            </ProfileCard>

            {/* EDUCATION */}

            <ProfileCard
              icon={GraduationCap}
              title="Education"
              subtitle="Academic background"
            >
              <TimelineItem
                icon={GraduationCap}
                title={
                  user.qualification ||
                  "Qualification not added"
                }
                subtitle={
                  user.university ||
                  "University not added"
                }
                badge={
                  user.graduationYear
                }
              />
            </ProfileCard>

            {/* EXPERIENCE */}

            <ProfileCard
              icon={BriefcaseBusiness}
              title="Experience"
              subtitle="Professional experience"
            >
              <TimelineItem
                icon={BriefcaseBusiness}
                title={
                  user.jobTitle ||
                  "Job title not added"
                }
                subtitle={
                  user.currentCompany ||
                  "Company not added"
                }
                badge={
                  user.experience ||
                  "Fresher"
                }
              />
            </ProfileCard>

            {/* SKILLS */}

            <ProfileCard
              icon={Code2}
              title="Skills & Expertise"
              subtitle="Professional skills"
            >
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">

                  {skillsArray.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#A0E9FF]/20 text-[#159FEF] border border-[#A0E9FF]/50 text-sm font-semibold"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <EmptyState
                  icon={Code2}
                  text="No skills added yet."
                />
              )}
            </ProfileCard>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            {/* PROFILE STRENGTH */}

            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">

              <div className="absolute pointer-events-none" />

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[#A0E9FF] text-sm font-medium">
                    Profile Strength
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {profileCompletion}%
                  </h2>
                </div>

                <div className="w-11 h-11 rounded-xl bg-[#30AFFF]/20 flex items-center justify-center text-[#A0E9FF]">
                  <Award className="w-5 h-5" />
                </div>

              </div>

              <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#30AFFF] transition-all duration-500"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-5">
                Complete your profile to increase your visibility
                to employers.
              </p>

              <button
                onClick={openEditModal}
                className="mt-4 w-full bg-[#30AFFF] text-white hover:bg-[#159FEF] py-2.5 rounded-xl text-sm font-bold transition"
              >
                Improve Profile
              </button>

            </div>

            {/* CAREER PREFERENCES */}

            <ProfileCard
              icon={Target}
              title="Career Preferences"
              subtitle="What you're looking for"
            >
              <div className="space-y-4">

                <PreferenceItem
                  icon={BriefcaseBusiness}
                  label="Preferred Role"
                  value={
                    user.preferredJobRole
                  }
                />

                <PreferenceItem
                  icon={MapPin}
                  label="Preferred Location"
                  value={
                    user.preferredLocation
                  }
                />

                <PreferenceItem
                  icon={Clock3}
                  label="Employment Type"
                  value={
                    user.employmentType
                  }
                />

                <PreferenceItem
                  icon={Award}
                  label="Salary Expectation"
                  value={
                    user.salaryExpectation
                  }
                />

              </div>
            </ProfileCard>

            {/* RESUME */}

            <ProfileCard
              icon={FileText}
              title="Resume"
              subtitle="Your professional resume"
            >
              {user.resume ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="font-semibold text-slate-800 text-sm">
                        Resume.pdf
                      </p>

                      <p className="text-xs text-slate-500 mt-0.5">
                        PDF resume available
                      </p>

                    </div>

                  </div>

                  <a
                    href={normalizeUrl(
                      user.resume
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#159FEF] text-white py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    View Resume
                    <ExternalLink className="w-4 h-4" />
                  </a>

                </div>
              ) : (
                <EmptyState
                  icon={FileText}
                  text="Resume PDF not uploaded."
                />
              )}
            </ProfileCard>

            {/* VERIFICATION */}

            <ProfileCard
              icon={ShieldCheck}
              title="Verification"
              subtitle="Government document"
            >
              {user.governmentDocument ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">

                      <p className="font-semibold text-emerald-800 text-sm">
                        Document Added
                      </p>

                      <p className="text-xs text-emerald-700 mt-1 truncate">
                        {user.governmentDocumentName ||
                          user.governmentDocumentType ||
                          "Government document"}
                      </p>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">

                  <div className="flex gap-3">

                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />

                    <div>

                      <p className="text-sm font-semibold text-amber-800">
                        Verification pending
                      </p>

                      <p className="text-xs text-amber-700 mt-1 leading-5">
                        Add your government document from Edit
                        Profile.
                      </p>

                    </div>

                  </div>

                </div>
              )}
            </ProfileCard>

            {/* SOCIAL */}

            <ProfileCard
              icon={Globe}
              title="Social Profiles"
              subtitle="Professional links"
            >
              <div className="space-y-2.5">

                {user.linkedin && (
                  <SocialLink
                    icon={Globe}
                    label="LinkedIn"
                    url={user.linkedin}
                  />
                )}

                {user.github && (
                  <SocialLink
                    icon={Code2}
                    label="GitHub"
                    url={user.github}
                  />
                )}

                {user.portfolio && (
                  <SocialLink
                    icon={Globe}
                    label="Portfolio"
                    url={user.portfolio}
                  />
                )}

                {!user.linkedin &&
                  !user.github &&
                  !user.portfolio && (
                    <EmptyState
                      icon={Globe}
                      text="No professional links added."
                    />
                  )}

              </div>
            </ProfileCard>

          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">

          <div className="bg-white w-full max-w-4xl max-h-[94vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">

            {/* MODAL HEADER */}

            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Edit Profile
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Keep your professional information up to date.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={updating}
                className="w-10 h-10 rounded-xl hover:bg-[#A0E9FF]/20 flex items-center justify-center text-slate-500 hover:text-[#159FEF] transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* MODAL BODY */}

            <form
              onSubmit={handleSave}
              className="overflow-y-auto px-5 sm:px-7 py-6 space-y-7"
            >

              {/* PROFILE PHOTO */}

              <div className="rounded-2xl border border-[#A0E9FF]/50 bg-[#A0E9FF]/10 p-5">

                <div className="flex flex-col sm:flex-row items-center gap-5">

                  <div className="relative shrink-0">

                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#30AFFF] to-[#159FEF] flex items-center justify-center">

                      {formData.profilePhoto ? (
                        <img
                          src={
                            profilePhotoPreview ||
                            getProfilePhotoUrl()
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-white">
                          {getInitials(
                            formData.name
                          )}
                        </span>
                      )}

                    </div>

                    <label
                      title="Change profile photo"
                      className="absolute -right-2 -bottom-2 w-10 h-10 rounded-xl bg-[#30AFFF] text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#159FEF] transition border-2 border-white"
                    >
                      <Camera className="w-4 h-4" />

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                        onChange={
                          handleProfilePhotoChange
                        }
                        className="hidden"
                      />
                    </label>

                  </div>

                  <div className="text-center sm:text-left">

                    <h3 className="font-bold text-slate-800">
                      Profile Photo
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      JPG, PNG, WEBP or GIF. Maximum 5MB.
                    </p>

                    <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#30AFFF] hover:bg-[#159FEF] text-white text-sm font-semibold cursor-pointer transition">

                      <Camera className="w-4 h-4" />

                      {profilePhotoFile
                        ? "Change Photo"
                        : "Choose Photo"}

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                        onChange={
                          handleProfilePhotoChange
                        }
                        className="hidden"
                      />

                    </label>

                  </div>
                </div>
              </div>

              {/* PERSONAL */}

              <FormSection
                icon={UserRound}
                title="Personal Information"
                description="Basic information about you"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={User}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    icon={Phone}
                  />

                  <InputField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    icon={MapPin}
                  />

                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    icon={CalendarDays}
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    icon={VenusAndMars}
                    options={[
                      "Male",
                      "Female",
                      "Other",
                      "Prefer not to say",
                    ]}
                  />

                </div>
              </FormSection>

              {/* EDUCATION */}

              <FormSection
                icon={GraduationCap}
                title="Education"
                description="Academic qualifications"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InputField
                    label="Qualification"
                    name="qualification"
                    value={
                      formData.qualification
                    }
                    onChange={handleChange}
                    icon={GraduationCap}
                  />

                  <InputField
                    label="University / College"
                    name="university"
                    value={
                      formData.university
                    }
                    onChange={handleChange}
                    icon={Building2}
                  />

                  <InputField
                    label="Graduation Year"
                    name="graduationYear"
                    value={
                      formData.graduationYear
                    }
                    onChange={handleChange}
                    icon={CalendarDays}
                  />

                </div>
              </FormSection>

              {/* EXPERIENCE */}

              <FormSection
                icon={BriefcaseBusiness}
                title="Professional Experience"
                description="Your current professional status"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InputField
                    label="Experience"
                    name="experience"
                    value={
                      formData.experience
                    }
                    onChange={handleChange}
                    icon={Clock3}
                    placeholder="e.g. Fresher, 2 Years"
                  />

                  <InputField
                    label="Current Company"
                    name="currentCompany"
                    value={
                      formData.currentCompany
                    }
                    onChange={handleChange}
                    icon={Building2}
                  />

                  <InputField
                    label="Job Title"
                    name="jobTitle"
                    value={
                      formData.jobTitle
                    }
                    onChange={handleChange}
                    icon={BriefcaseBusiness}
                  />

                  <InputField
                    label="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    icon={Code2}
                    placeholder="React, Node.js, MongoDB"
                  />

                </div>

                <div className="mt-4">

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Professional Bio
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write a short professional summary..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:border-[#30AFFF] focus:ring-4 focus:ring-[#A0E9FF]/30 transition"
                  />

                </div>
              </FormSection>

              {/* CAREER PREFERENCES */}

              <FormSection
                icon={Target}
                title="Career Preferences"
                description="Tell employers what kind of opportunity you want"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InputField
                    label="Preferred Job Role"
                    name="preferredJobRole"
                    value={
                      formData.preferredJobRole
                    }
                    onChange={handleChange}
                    icon={Target}
                  />

                  <InputField
                    label="Preferred Location"
                    name="preferredLocation"
                    value={
                      formData.preferredLocation
                    }
                    onChange={handleChange}
                    icon={MapPin}
                  />

                  <SelectField
                    label="Employment Type"
                    name="employmentType"
                    value={
                      formData.employmentType
                    }
                    onChange={handleChange}
                    icon={BriefcaseBusiness}
                    options={[
                      "Full Time",
                      "Part Time",
                      "Internship",
                      "Contract",
                      "Freelance",
                    ]}
                  />

                  <InputField
                    label="Salary Expectation"
                    name="salaryExpectation"
                    value={
                      formData.salaryExpectation
                    }
                    onChange={handleChange}
                    icon={Award}
                  />

                </div>
              </FormSection>

              {/* SOCIAL */}

              <FormSection
                icon={Globe}
                title="Social Profiles"
                description="Add your professional links"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InputField
                    label="LinkedIn"
                    name="linkedin"
                    value={
                      formData.linkedin
                    }
                    onChange={handleChange}
                    icon={Globe}
                    placeholder="https://linkedin.com/in/username"
                  />

                  <InputField
                    label="GitHub"
                    name="github"
                    value={
                      formData.github
                    }
                    onChange={handleChange}
                    icon={Code2}
                    placeholder="https://github.com/username"
                  />

                  <InputField
                    label="Portfolio"
                    name="portfolio"
                    value={
                      formData.portfolio
                    }
                    onChange={handleChange}
                    icon={Globe}
                    placeholder="https://yourportfolio.com"
                  />

                </div>
              </FormSection>

              {/* RESUME */}

              <FormSection
                icon={FileText}
                title="Resume"
                description="Upload your latest resume in PDF format"
              >

                <div className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#30AFFF] bg-slate-50 hover:bg-[#A0E9FF]/10 p-5 transition">

                  <div className="flex flex-col sm:flex-row items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <FileText className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">

                      <h4 className="font-bold text-slate-800">
                        {resumeFile
                          ? resumeFile.name
                          : user.resume
                            ? "Current Resume"
                            : "Upload Resume PDF"}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1">
                        Only PDF files are allowed. Maximum size
                        5MB.
                      </p>

                    </div>

                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#30AFFF] hover:bg-[#159FEF] text-white text-sm font-semibold cursor-pointer transition shrink-0">

                      <Upload className="w-4 h-4" />

                      {resumeFile
                        ? "Change PDF"
                        : "Choose PDF"}

                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={
                          handleResumeChange
                        }
                        className="hidden"
                      />

                    </label>

                  </div>

                  {user.resume &&
                    !resumeFile && (
                      <div className="mt-4 pt-4 border-t border-slate-200">

                        <a
                          href={normalizeUrl(
                            user.resume
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#159FEF] hover:text-[#30AFFF]"
                        >
                          <FileText className="w-4 h-4" />
                          View current resume
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                      </div>
                    )}

                </div>
              </FormSection>

              {/* GOVERNMENT DOCUMENT */}

              <FormSection
                icon={ShieldCheck}
                title="Government Document"
                description="Upload your verification document"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <SelectField
                    label="Document Type"
                    name="governmentDocumentType"
                    value={
                      formData.governmentDocumentType
                    }
                    onChange={handleChange}
                    icon={ShieldCheck}
                    options={[
                      "Aadhaar Card",
                      "PAN Card",
                      "Passport",
                      "Driving License",
                      "Voter ID",
                    ]}
                  />

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Upload Document
                    </label>

                    <label className="min-h-[50px] px-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#30AFFF] bg-slate-50 hover:bg-[#A0E9FF]/10 flex items-center gap-3 cursor-pointer transition">

                      <Upload className="w-5 h-5 text-[#159FEF] shrink-0" />

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-700 truncate">
                          {formData.governmentDocumentName ||
                            "Choose document"}
                        </p>

                        <p className="text-xs text-slate-400">
                          JPG, PNG, WEBP, GIF or PDF • Max 5MB
                        </p>

                      </div>

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.gif,.pdf"
                        onChange={
                          handleGovernmentDocumentChange
                        }
                        className="hidden"
                      />

                    </label>

                  </div>

                </div>
              </FormSection>

              {/* ERROR */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {typeof error === "string"
                    ? error
                    : error?.message ||
                    "Something went wrong."}
                </div>
              )}

              {/* SAVE BUTTON */}

              <div className="sticky bottom-0 bg-white border-t border-slate-200 -mx-5 sm:-mx-7 px-5 sm:px-7 py-4 flex flex-col sm:flex-row gap-3 justify-end">

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updating}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#30AFFF] hover:bg-[#159FEF] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-[#30AFFF]/20 transition"
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* =====================================================
   PROFILE CARD
===================================================== */

const ProfileCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#A0E9FF]/30 text-[#159FEF] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>

          <div>

            <h2 className="font-bold text-slate-900">
              {title}
            </h2>

            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}

          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>

    </section>
  );
};

/* =====================================================
   QUICK STAT
===================================================== */

const QuickStat = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 hover:bg-white hover:border-[#A0E9FF] transition">

      <div className="flex items-center gap-2 text-slate-400">

        <Icon className="w-4 h-4" />

        <span className="text-xs font-medium">
          {label}
        </span>

      </div>

      <p className="mt-2 text-sm font-bold text-slate-800 line-clamp-2">
        {value || "Not added"}
      </p>

    </div>
  );
};

/* =====================================================
   INFO ITEM
===================================================== */

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="w-9 h-9 rounded-lg bg-[#A0E9FF]/20 text-[#159FEF] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-700 mt-1 break-words">
          {value || "Not provided"}
        </p>

      </div>

    </div>
  );
};

/* =====================================================
   PREFERENCE ITEM
===================================================== */

const PreferenceItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-[#A0E9FF]/20 text-[#159FEF] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-slate-400 font-medium">
          {label}
        </p>

        <p className="text-sm text-slate-700 font-semibold mt-0.5 truncate">
          {value || "Not added"}
        </p>

      </div>

    </div>
  );
};

/* =====================================================
   TIMELINE ITEM
===================================================== */

const TimelineItem = ({
  icon: Icon,
  title,
  subtitle,
  badge,
}) => {
  return (
    <div className="relative pl-8">

      <div className="absolute left-2 top-2 bottom-0 w-px bg-[#A0E9FF]" />

      <div className="relative">

        <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-[#30AFFF] border-4 border-[#A0E9FF]/30" />

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

          <div>

            <h3 className="font-bold text-slate-800">
              {title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>

          </div>

          {badge && (
            <span className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A0E9FF]/20 text-[#159FEF] text-xs font-semibold">

              <CalendarDays className="w-3.5 h-3.5" />

              {badge}

            </span>
          )}

        </div>
      </div>
    </div>
  );
};

/* =====================================================
   SOCIAL LINK
===================================================== */

const SocialLink = ({
  icon: Icon,
  label,
  url,
}) => {
  const safeUrl = normalizeSocialUrl(url);

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#A0E9FF] hover:bg-[#A0E9FF]/10 transition group"
    >

      <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#A0E9FF]/30 text-slate-600 group-hover:text-[#159FEF] flex items-center justify-center transition">
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">

        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        <p className="text-xs text-slate-400 truncate">
          {url}
        </p>

      </div>

      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#30AFFF]" />

    </a>
  );
};

/* =====================================================
   SOCIAL URL HELPER
===================================================== */

const normalizeSocialUrl = (url) => {
  if (!url) return "#";

  const value = String(url).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `https://${value}`;
};

/* =====================================================
   EMPTY STATE
===================================================== */

const EmptyState = ({
  icon: Icon,
  text,
}) => {
  return (
    <div className="py-5 text-center">

      <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto">
        <Icon className="w-5 h-5" />
      </div>

      <p className="text-sm text-slate-400 mt-2">
        {text}
      </p>

    </div>
  );
};

/* =====================================================
   FORM SECTION
===================================================== */

const FormSection = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <section>

      <div className="flex items-start gap-3 mb-4">

        <div className="w-9 h-9 rounded-xl bg-[#A0E9FF]/30 text-[#159FEF] flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" />
        </div>

        <div>

          <h3 className="font-bold text-slate-800">
            {title}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            {description}
          </p>

        </div>
      </div>

      {children}

    </section>
  );
};

/* =====================================================
   INPUT FIELD
===================================================== */

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  placeholder,
}) => {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#30AFFF] focus:ring-4 focus:ring-[#A0E9FF]/30 transition ${Icon
              ? "pl-10 pr-4"
              : "px-4"
            }`}
        />

      </div>
    </div>
  );
};

/* =====================================================
   SELECT FIELD
===================================================== */

const SelectField = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  options = [],
}) => {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}

        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`appearance-none w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 outline-none focus:border-[#30AFFF] focus:ring-4 focus:ring-[#A0E9FF]/30 transition ${Icon
              ? "pl-10 pr-4"
              : "px-4"
            }`}
        >

          <option value="">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>

      </div>
    </div>
  );
};

export default Profile;