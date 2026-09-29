
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  X,
  Check,
  Send,
  Loader2,
  AlertCircle,
  Briefcase,
  Globe2,
  Code2,
  Server,
  Layers,
  Smartphone,
  Film,
} from "lucide-react";
import {
  submitFrontendApplication,
  resetSubmitState,
} from "../redux/slicer/frontendApplicationSlice";

const ROLE_META = {
  "Frontend Developer": {
    icon: Code2,
    badgeColor:
      "bg-[#30AFFF]/10 text-[#0B6F9F] border-[#30AFFF]/30",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "React, JavaScript, TypeScript, Next.js, Tailwind, HTML/CSS...",
    aboutPlaceholder:
      "Tell us about your frontend experience, favorite projects, and why this opportunity interests you...",
  },

  "Backend Developer": {
    icon: Server,
    badgeColor:
      "bg-[#30AFFF]/10 text-[#0B6F9F] border-[#30AFFF]/30",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "Node.js, Express, Python, PostgreSQL, MongoDB, Redis, Docker, REST APIs...",
    aboutPlaceholder:
      "Tell us about your backend systems, database design experience, API architecture, and achievements...",
  },

  "Full Stack Developer": {
    icon: Layers,
    badgeColor:
      "bg-[#30AFFF]/10 text-[#0B6F9F] border-[#30AFFF]/30",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "React, Node.js, Express, MongoDB/SQL, TypeScript, REST/GraphQL, Cloud...",
    aboutPlaceholder:
      "Tell us about end-to-end applications you've architected, your tech stack preferences, and experience...",
  },

  "Android Developer": {
    icon: Smartphone,
    badgeColor:
      "bg-[#30AFFF]/10 text-[#0B6F9F] border-[#30AFFF]/30",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "Kotlin, Java, Android SDK, Jetpack Compose, Coroutines, MVVM, Retrofit...",
    aboutPlaceholder:
      "Tell us about Android apps you've built, Play Store releases, architecture patterns, and experience...",
  },

  "Video Editor": {
    icon: Film,
    badgeColor:
      "bg-[#30AFFF]/10 text-[#0B6F9F] border-[#30AFFF]/30",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "Premiere Pro, After Effects, DaVinci Resolve, Motion Design, Blender, Sound Design...",
    aboutPlaceholder:
      "Tell us about your video editing style, pacing philosophy, biggest projects, and favorite tools...",
  },
};

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  experience: "",
  currentCountry: "",
  currentLocation: "",
  preferredRegion: "",
  preferredJobMarket: "",
  preferredWorkMode: "",
  relocationPreference: "",
  workAuthorization: "",
  expectedSalary: "",
  salaryCurrency: "",
  noticePeriod: "",
  preferredTimezone: "",
  countryFlexibility: "",
  portfolio: "",
  linkedin: "",
  frontendSkills: "",
  aboutYou: "",
};

const RoleApplyModal = ({
  isOpen,
  onClose,
  role = "Frontend Developer",
  initialData = {},
}) => {
  const dispatch = useDispatch();

  const { submitLoading, submitSuccess, submitError } = useSelector(
    (state) => state.frontendApplications || {}
  );

  const [formData, setFormData] = useState({
    ...initialFormState,
    ...initialData,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [localError, setLocalError] = useState("");

  const meta = ROLE_META[role] || {
    icon: Briefcase,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    themeColor: "#30AFFF",
    skillsPlaceholder:
      "Relevant technical skills, libraries, tools...",
    aboutPlaceholder:
      "Tell us about your experience and why you are a great fit for this role...",
  };

  const RoleIcon = meta.icon;

  useEffect(() => {
    if (isOpen) {
      dispatch(resetSubmitState());
      setFormData({
        ...initialFormState,
        ...initialData,
      });
      setResumeFile(null);
      setLocalError("");
    }
  }, [isOpen, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setResumeFile(file);

    if (file) {
      setLocalError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setLocalError(
        "Please select a resume file (.pdf, .doc, or .docx)"
      );
      return;
    }

    setLocalError("");

    const data = new FormData();

    data.append("role", role);

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("resume", resumeFile);

    dispatch(submitFrontendApplication(data));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-2 sm:p-4 md:p-5 backdrop-blur-xs">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="
          relative
          flex
          h-[96vh]
          max-h-[96vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          border
          border-slate-200
          bg-white
          text-slate-800
          shadow-2xl
          sm:h-[92vh]
          sm:max-h-[92vh]
        "
      >
        {/* Modal Header */}
        <div
          className="
            sticky
            top-0
            z-10
            shrink-0
            border-b
            border-slate-200
            bg-white/95
            px-3
            py-3
            backdrop-blur-md
            sm:px-5
            sm:py-4
            md:px-7
          "
        >
          <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-white
                  shadow-md
                  sm:h-11
                  sm:w-11
                  sm:rounded-2xl
                "
                style={{
                  backgroundColor: meta.themeColor,
                }}
              >
                <RoleIcon size={18} className="sm:hidden" />
                <RoleIcon size={20} className="hidden sm:block" />
              </div>

              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                      sm:text-xs
                    "
                  >
                    Global Application
                  </span>

                  <span
                    className={`inline-flex max-w-full items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-bold sm:px-2 sm:text-[11px] ${meta.badgeColor}`}
                  >
                    <RoleIcon size={10} className="shrink-0" />
                    <span className="truncate">{role}</span>
                  </span>
                </div>

                <h2
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-black
                    tracking-tight
                    text-slate-900
                    sm:text-xl
                  "
                >
                  Apply for {role}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                shrink-0
                rounded-xl
                p-1.5
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-600
                sm:p-2
              "
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            px-3
            py-4
            sm:px-5
            sm:py-5
            md:px-7
          "
        >
          {submitSuccess ? (
            /* Success State */
            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                px-2
                py-8
                text-center
                sm:min-h-[380px]
              "
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.45,
                  type: "spring",
                  stiffness: 180,
                }}
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  text-white
                  shadow-lg
                  sm:h-16
                  sm:w-16
                "
                style={{
                  backgroundColor: meta.themeColor,
                }}
              >
                <Check size={28} className="sm:hidden" />
                <Check size={32} className="hidden sm:block" />
              </motion.div>

              <h3
                className="
                  mt-5
                  max-w-xl
                  text-xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-slate-900
                  sm:text-2xl
                "
              >
                Application Received Successfully!
              </h3>

              <p
                className="
                  mt-2
                  max-w-md
                  px-2
                  text-xs
                  leading-relaxed
                  text-slate-500
                  sm:text-sm
                "
              >
                Thank you for applying for the{" "}
                <strong className="text-slate-800">
                  {role}
                </strong>{" "}
                opportunity. Your profile, global market preferences,
                and resume have been securely submitted to our talent
                review team.
              </p>

              <div
                className="
                  mt-6
                  flex
                  w-full
                  max-w-sm
                  flex-col
                  gap-2.5
                  sm:w-auto
                  sm:max-w-none
                  sm:flex-row
                  sm:items-center
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    dispatch(resetSubmitState());
                    setFormData(initialFormState);
                    setResumeFile(null);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    sm:w-auto
                  "
                >
                  Submit Another
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    w-full
                    rounded-xl
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    shadow-md
                    transition
                    sm:w-auto
                  "
                  style={{
                    backgroundColor: meta.themeColor,
                  }}
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
            >
              {/* Highlight Banner */}
              <div
                className="
                  flex
                  items-start
                  gap-2.5
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/80
                  p-3
                  sm:gap-3
                  sm:p-4
                "
              >
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-white
                  "
                  style={{
                    backgroundColor: meta.themeColor,
                  }}
                >
                  <Globe2 size={16} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 sm:text-sm">
                    Tell us where you want to grow.
                  </h4>

                  <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                    Your preferred international market, work mode,
                    expected compensation, and experience help us pair
                    you with matching high-impact opportunities.
                  </p>
                </div>
              </div>

              {/* Error Alert */}
              {(localError || submitError) && (
                <div
                  className="
                    flex
                    items-start
                    gap-2.5
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-50
                    p-3
                    text-xs
                    text-red-700
                    sm:p-3.5
                  "
                >
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <span className="break-words">
                    {localError || submitError}
                  </span>
                </div>
              )}

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                {/* Full Name */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Full name *
                  </label>

                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Email */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Email address *
                  </label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Phone */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Phone number *
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 00000 00000"
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Experience */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Experience *
                  </label>

                  <select
                    required
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select experience</option>
                    <option>0–1 years</option>
                    <option>1–2 years</option>
                    <option>2–4 years</option>
                    <option>4–6 years</option>
                    <option>6+ years</option>
                  </select>
                </div>

                {/* Current Country */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Current country *
                  </label>

                  <select
                    required
                    name="currentCountry"
                    value={formData.currentCountry}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select country</option>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Netherlands</option>
                    <option>Singapore</option>
                    <option>United Arab Emirates</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Current Location */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Current location (City / State)
                  </label>

                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Bangalore, Delhi, London..."
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Preferred Region */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Preferred region *
                  </label>

                  <select
                    required
                    name="preferredRegion"
                    value={formData.preferredRegion}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select region</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia-Pacific</option>
                    <option>Middle East</option>
                    <option>Any global region</option>
                  </select>
                </div>

                {/* Preferred Job Market */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Target job market *
                  </label>

                  <select
                    required
                    name="preferredJobMarket"
                    value={formData.preferredJobMarket}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select market</option>
                    <option>🇺🇸 United States</option>
                    <option>🇬🇧 United Kingdom</option>
                    <option>🇨🇦 Canada</option>
                    <option>🇩🇪 Germany</option>
                    <option>🇦🇺 Australia</option>
                    <option>🇳🇱 Netherlands</option>
                    <option>🇸🇬 Singapore</option>
                    <option>🇦🇪 United Arab Emirates</option>
                    <option>Any global market</option>
                  </select>
                </div>

                {/* Preferred Work Mode */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Preferred work mode *
                  </label>

                  <select
                    required
                    name="preferredWorkMode"
                    value={formData.preferredWorkMode}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select work mode</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>Remote or Hybrid</option>
                    <option>Flexible / Any</option>
                  </select>
                </div>

                {/* Relocation Preference */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Relocation preference
                  </label>

                  <select
                    name="relocationPreference"
                    value={formData.relocationPreference}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select preference</option>
                    <option>Yes — open to relocation</option>
                    <option>
                      Yes — only with relocation support
                    </option>
                    <option>No — remote preferred</option>
                    <option>
                      Maybe — depends on opportunity
                    </option>
                  </select>
                </div>

                {/* Work Authorization */}
                <div className="min-w-0 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Work authorization / visa sponsorship
                  </label>

                  <select
                    name="workAuthorization"
                    value={formData.workAuthorization}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select status</option>
                    <option>
                      Authorized to work in my preferred market
                    </option>
                    <option>Need employer sponsorship</option>
                    <option>
                      Open to employer sponsorship
                    </option>
                    <option>
                      Remote only / no local authorization needed
                    </option>
                    <option>Not sure</option>
                  </select>
                </div>

                {/* Expected Annual Salary */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Expected annual salary *
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    placeholder="e.g. 80000"
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Salary Currency */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Salary currency *
                  </label>

                  <select
                    required
                    name="salaryCurrency"
                    value={formData.salaryCurrency}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select currency</option>
                    <option>USD — US Dollar</option>
                    <option>GBP — British Pound</option>
                    <option>CAD — Canadian Dollar</option>
                    <option>EUR — Euro</option>
                    <option>AUD — Australian Dollar</option>
                    <option>SGD — Singapore Dollar</option>
                    <option>AED — UAE Dirham</option>
                  </select>
                </div>

                {/* Notice Period */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Availability / notice period *
                  </label>

                  <select
                    required
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select availability</option>
                    <option>Immediately available</option>
                    <option>Within 15 days</option>
                    <option>Within 30 days</option>
                    <option>30–60 days</option>
                    <option>60+ days</option>
                  </select>
                </div>

                {/* Working Timezone */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Preferred working timezone
                  </label>

                  <select
                    name="preferredTimezone"
                    value={formData.preferredTimezone}
                    onChange={handleInputChange}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >
                    <option value="">Select timezone</option>
                    <option>IST — India</option>
                    <option>GMT — United Kingdom</option>
                    <option>EST — US Eastern</option>
                    <option>CST — US Central</option>
                    <option>PST — US Pacific</option>
                    <option>CET — Central Europe</option>
                    <option>AEST — Australia Eastern</option>
                    <option>Flexible / Any timezone</option>
                  </select>
                </div>

                {/* Portfolio / Showreel */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Portfolio / GitHub / Showreel link
                  </label>

                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* LinkedIn */}
                <div className="min-w-0">
                  <label className="text-[11px] font-semibold text-slate-600">
                    LinkedIn profile
                  </label>

                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Skills / Tools */}
                <div className="min-w-0 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Technical Skills & Tools
                  </label>

                  <input
                    type="text"
                    name="frontendSkills"
                    value={formData.frontendSkills}
                    onChange={handleInputChange}
                    placeholder={meta.skillsPlaceholder}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>

                {/* Resume Upload */}
                <div className="min-w-0 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Resume / CV * (.pdf, .doc, .docx)
                  </label>

                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="
                      mt-1.5
                      block
                      w-full
                      min-w-0
                      overflow-hidden
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-2.5
                      py-2
                      text-xs
                      text-slate-600
                      file:mr-2
                      file:rounded-lg
                      file:border-0
                      file:bg-slate-900
                      file:px-2.5
                      file:py-1.5
                      file:text-[10px]
                      file:text-white
                      cursor-pointer
                      sm:px-3.5
                      sm:py-2.5
                      sm:file:mr-3
                      sm:file:px-3
                      sm:file:text-xs
                    "
                  />

                  {resumeFile && (
                    <p className="mt-1 break-all text-[10px] font-medium text-blue-600 sm:text-[11px]">
                      Selected: {resumeFile.name} (
                      {(resumeFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>

                {/* About You */}
                <div className="min-w-0 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Tell us about yourself & experience *
                  </label>

                  <textarea
                    required
                    rows={4}
                    name="aboutYou"
                    value={formData.aboutYou}
                    onChange={handleInputChange}
                    placeholder={meta.aboutPlaceholder}
                    className="
                      mt-1.5
                      w-full
                      min-w-0
                      resize-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      transition
                    "
                  />
                </div>
              </div>

              {/* Form Action Footer */}
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-t
                  border-slate-200
                  pt-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p className="max-w-sm text-[10px] leading-relaxed text-slate-400">
                  By applying, you confirm your information is
                  authentic. Opportunities and visa sponsorships depend
                  on employer requirements.
                </p>

                <div
                  className="
                    flex
                    w-full
                    flex-col-reverse
                    gap-2
                    sm:w-auto
                    sm:flex-row
                    sm:items-center
                    sm:justify-end
                    sm:gap-2.5
                  "
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      sm:w-auto
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-5
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                      shadow-md
                      transition
                      disabled:opacity-60
                      sm:w-auto
                      sm:px-6
                      sm:text-sm
                    "
                    style={{
                      backgroundColor: meta.themeColor,
                    }}
                  >
                    {submitLoading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin text-white"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleApplyModal;

