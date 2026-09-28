import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Phone,
  Sparkles,
  User,
  Users,
  Wifi,
  Building2,
  Landmark,
  Rocket,
  Code,
  Award,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Truck,
} from "lucide-react";

import {
  registerUser,
  clearAuthError,
} from "../redux/slicer/authSlice";

import FeedbackModal from "../components/FeedbackModal";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* =================================================
     CATEGORIES
  ================================================= */

  const categories = [
    { icon: Wifi, label: "Remote" },
    { icon: Building2, label: "MNC" },
    { icon: Landmark, label: "Banking & ..." },
    { icon: Rocket, label: "Startup" },
    { icon: Users, label: "HR" },
    { icon: Code, label: "Engineering" },
    { icon: Award, label: "Fortune 500" },
    { icon: GraduationCap, label: "Internship" },
    { icon: Briefcase, label: "Project Mg..." },
    { icon: ShoppingCart, label: "Sales" },
    { icon: Truck, label: "Supply Ch..." },
  ];

  /* =================================================
     CATEGORY CLICK
  ================================================= */

  const handleCategoryClick = (label) => {
    navigate(`/jobs?category=${encodeURIComponent(label)}`);
  };

  /* =================================================
     HANDLE INPUT
  ================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number - only numbers
    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: onlyNumbers,
        }));
      }

      // Clear previous backend error
      if (error) {
        dispatch(clearAuthError());
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous backend error
    if (error) {
      dispatch(clearAuthError());
    }
  };

  /* =================================================
     SUBMIT
  ================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setFeedback({
        title: "Registration failed",
        message: "Passwords do not match.",
        type: "error",
      });

      return;
    }

    // Mobile validation
    if (formData.mobile.length !== 10) {
      setFeedback({
        title: "Registration failed",
        message:
          "Please enter a valid 10-digit mobile number.",
        type: "error",
      });

      return;
    }

    // Name validation
    if (formData.name.trim().length < 2) {
      setFeedback({
        title: "Registration failed",
        message: "Please enter your full name.",
        type: "error",
      });

      return;
    }

    // Email validation
    if (!formData.email.trim()) {
      setFeedback({
        title: "Registration failed",
        message: "Please enter your email address.",
        type: "error",
      });

      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setFeedback({
        title: "Registration failed",
        message:
          "Password must be at least 6 characters long.",
        type: "error",
      });

      return;
    }

    /* =================================================
       DATA SENT TO BACKEND
    ================================================= */

    const userData = {
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const result = await dispatch(
        registerUser(userData)
      ).unwrap();

      console.log("Registered User:", result);

      setFeedback({
        title: "Registration successful",
        message:
          result?.message ||
          "Your account has been created successfully.",
        type: "success",
      });

      // Redirect after showing success modal
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Registration Error:", error);

      setFeedback({
        title: "Registration failed",
        message:
          typeof error === "string"
            ? error
            : error?.message ||
              "Unable to create your account. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* =================================================
          FEEDBACK MODAL
      ================================================= */}

      {feedback && (
        <FeedbackModal
          {...feedback}
          onClose={() => setFeedback(null)}
        />
      )}

      <main className="min-h-[calc(100vh-72px)] overflow-x-hidden bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-3">
          <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/60 lg:grid-cols-2">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <section className="relative hidden overflow-hidden bg-[#30AFFF] lg:flex">

              {/* Decorations */}

              <div className="pointer-events-none absolute inset-0">

                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/8 blur-3xl" />

                <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-white/8 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-3xl" />

              </div>

              {/* Left Content */}

              <div className="relative flex min-h-full w-full flex-col p-6 xl:p-9">

                <div>

                  {/* Logo */}

                  <div className="flex items-center gap-2.5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#30AFFF] shadow-md">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div>

                      <h2 className="text-lg font-black tracking-tight text-white">
                        CareerSphere
                      </h2>

                      <p className="text-[11px] text-white/90">
                        Your Career. Your Future.
                      </p>

                    </div>

                  </div>

                  {/* Hero Content */}

                  <div className="mt-3 max-w-md xl:mt-5">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">

                      <Sparkles size={13} />

                      Start Your Career Journey

                    </div>

                    <h1 className="text-xl font-bold leading-[1.1] tracking-tight text-white md:text-3xl lg:text-3xl">

                      Build Your{" "}

                      <span>
                        Professional Future
                      </span>

                    </h1>

                    <p className="mt-4 max-w-sm text-xs leading-6 text-white/90 xl:text-sm">

                      Join thousands of professionals who are
                      discovering better career opportunities,
                      building connections and growing their
                      careers with CareerSphere.

                    </p>

                  </div>

                  {/* Features */}

                  <div className="mt-6 space-y-2.5">

                    {[
                      "Discover thousands of career opportunities",
                      "Connect with top companies and professionals",
                      "Build your professional profile",
                      "Grow your skills and career",
                    ].map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-2.5"
                      >

                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15">

                          <CheckCircle2
                            size={14}
                            className="text-white"
                          />

                        </div>

                        <span className="text-xs font-semibold text-white">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* =================================================
                      EXPLORE OPPORTUNITIES
                  ================================================= */}

                  <div className="mt-6">

                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                      Explore Opportunities
                    </p>

                    <div className="flex flex-wrap gap-1.5">

                      {categories.map((category) => {

                        const Icon = category.icon;

                        return (

                          <button
                            key={category.label}
                            type="button"
                            onClick={() =>
                              handleCategoryClick(
                                category.label
                              )
                            }
                            className="group inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/15 px-4 py-2.5 text-[10px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white hover:text-[#159FEF] hover:shadow-md"
                          >

                            <Icon
                              size={12}
                              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                            />

                            <span className="whitespace-nowrap text-[12px]">
                              {category.label}
                            </span>

                          </button>

                        );
                      })}

                    </div>

                  </div>

                </div>

                {/* Bottom Stats */}

                <div className="mt-7 grid grid-cols-3 gap-2.5 xl:mt-8">

                  <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">

                    <p className="text-lg font-black text-white">
                      50K+
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/80">
                      Professionals
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">

                    <p className="text-lg font-black text-white">
                      10K+
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/80">
                      Jobs
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">

                    <p className="text-lg font-black text-white">
                      2K+
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/80">
                      Companies
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <section className="flex items-center justify-center px-4 py-6 sm:px-7 sm:py-8 lg:px-8 xl:px-12">

              <div className="w-full max-w-sm">

                {/* Mobile Logo */}

                <div className="mb-5 flex items-center justify-center gap-2.5 lg:hidden">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#30AFFF] text-white shadow-md">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>

                    <h2 className="text-lg font-black text-gray-900">
                      CareerSphere
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Your Career. Your Future.
                    </p>

                  </div>

                </div>

                {/* Heading */}

                <div className="text-center">

                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#A0E9FF]/30 text-[#159FEF]">
                    <Users size={20} />
                  </div>

                  <h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
                    Create Your Account
                  </h2>

                  <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Start your professional journey with CareerSphere
                  </p>

                </div>

                {/* FORM CARD */}

                <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-md shadow-gray-200/40 sm:p-5">

                  {/* Backend Error */}

                  {error && (

                    <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">

                      {typeof error === "string"
                        ? error
                        : error?.message ||
                          "Something went wrong. Please try again."}

                    </div>

                  )}

                  {/* Google */}

                  <button
                    type="button"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition-all duration-300 hover:border-[#30AFFF]/30 hover:bg-[#A0E9FF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                  >

                    <Globe2
                      size={17}
                      className="text-[#30AFFF]"
                    />

                    Continue with Google

                  </button>

                  {/* Divider */}

                  <div className="my-4 flex items-center gap-3">

                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-[10px] font-semibold text-gray-400">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />

                  </div>

                  {/* Form */}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5"
                  >

                    {/* Name */}

                    <div>

                      <label
                        htmlFor="name"
                        className="mb-1 block text-xs font-semibold text-gray-700"
                      >
                        Full Name
                      </label>

                      <div className="relative">

                        <User
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          required
                          disabled={loading}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        />

                      </div>

                    </div>

                    {/* Mobile */}

                    <div>

                      <label
                        htmlFor="mobile"
                        className="mb-1 block text-xs font-semibold text-gray-700"
                      >
                        Mobile Number
                      </label>

                      <div className="relative">

                        <Phone
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          inputMode="numeric"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Enter 10-digit mobile number"
                          autoComplete="tel"
                          maxLength={10}
                          required
                          disabled={loading}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        />

                      </div>

                    </div>

                    {/* Email */}

                    <div>

                      <label
                        htmlFor="email"
                        className="mb-1 block text-xs font-semibold text-gray-700"
                      >
                        Email Address
                      </label>

                      <div className="relative">

                        <Mail
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          autoComplete="email"
                          required
                          disabled={loading}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        />

                      </div>

                    </div>

                    {/* Password */}

                    <div>

                      <label
                        htmlFor="password"
                        className="mb-1 block text-xs font-semibold text-gray-700"
                      >
                        Password
                      </label>

                      <div className="relative">

                        <LockKeyhole
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          autoComplete="new-password"
                          required
                          minLength={6}
                          disabled={loading}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        />

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#30AFFF] disabled:cursor-not-allowed"
                          aria-label="Toggle password visibility"
                        >

                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}

                        </button>

                      </div>

                    </div>

                    {/* Confirm Password */}

                    <div>

                      <label
                        htmlFor="confirmPassword"
                        className="mb-1 block text-xs font-semibold text-gray-700"
                      >
                        Confirm Password
                      </label>

                      <div className="relative">

                        <LockKeyhole
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                          required
                          minLength={6}
                          disabled={loading}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        />

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() =>
                            setShowConfirmPassword(
                              (prev) => !prev
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#30AFFF] disabled:cursor-not-allowed"
                          aria-label="Toggle confirm password visibility"
                        >

                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}

                        </button>

                      </div>

                    </div>

                    {/* Terms */}

                    <div className="flex items-start gap-2 pt-0.5">

                      <input
                        id="terms"
                        type="checkbox"
                        required
                        disabled={loading}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-[#30AFFF] focus:ring-[#30AFFF]"
                      />

                      <label
                        htmlFor="terms"
                        className="text-[10px] leading-relaxed text-gray-500 sm:text-xs"
                      >

                        I agree to{" "}

                        <button
                          type="button"
                          className="font-semibold text-[#30AFFF] transition hover:text-[#159FEF]"
                        >
                          Terms & Conditions
                        </button>

                        {" "}and{" "}

                        <button
                          type="button"
                          className="font-semibold text-[#30AFFF] transition hover:text-[#159FEF]"
                        >
                          Privacy Policy
                        </button>

                      </label>

                    </div>

                    {/* Submit */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#30AFFF] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#30AFFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:text-sm"
                    >

                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account

                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </button>

                  </form>

                  {/* Login */}

                  <div className="mt-4 text-center">

                    <p className="text-xs text-gray-500 sm:text-sm">

                      Already have an account?{" "}

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          navigate("/login")
                        }
                        className="font-bold text-[#30AFFF] transition hover:text-[#159FEF] disabled:opacity-50"
                      >
                        Login
                      </button>

                    </p>

                  </div>

                </div>

                {/* Security */}

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">

                  <LockKeyhole size={12} />

                  Your information is securely protected

                </div>

              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
};

export default Register;