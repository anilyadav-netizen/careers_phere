import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Award,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code,
  Eye,
  EyeOff,
  Globe2,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Mail,
  Rocket,
  ShoppingCart,
  Sparkles,
  Truck,
  UserRound,
  Users,
  Wifi,
} from "lucide-react";

import {
  clearAuthError,
  clearAuthSuccess,
  loginUser,
} from "../redux/slicer/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearAuthError());
    }

    if (success) {
      dispatch(clearAuthSuccess());
    }
  };

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearAuthError());
    dispatch(clearAuthSuccess());

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          email,
          password,
        }),
      );

      if (loginUser.fulfilled.match(result)) {
        window.dispatchEvent(new Event("CareerNovaAuthChanged"));

        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // =========================================================
  // AUTH SUCCESS FALLBACK
  // =========================================================

  useEffect(() => {
    if (isAuthenticated) {
      window.dispatchEvent(new Event("CareerNovaAuthChanged"));
    }
  }, [isAuthenticated]);

  // =========================================================
  // CATEGORY CLICK
  // =========================================================

  const handleCategoryClick = (label) => {
    navigate(`/jobs?category=${encodeURIComponent(label)}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
        <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/60 lg:grid-cols-2">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="relative hidden overflow-hidden bg-[#30AFFF] lg:flex">
            {/* BACKGROUND EFFECTS */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-3xl" />
            </div>

            <div className="relative flex min-h-full w-full flex-col p-6 xl:p-9">
              <div>
                {/* LOGO */}

                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#30AFFF] shadow-md">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-white">
                      CareerNova
                    </h2>

                    <p className="text-[11px] text-white/90">
                      Your Career. Your Future.
                    </p>
                  </div>
                </div>

                {/* INTRO */}

                <div className="mt-4 max-w-md xl:mt-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                    <Sparkles size={13} />
                    Welcome Back
                  </div>

                  <h1 className="text-xl font-black leading-[1.1] tracking-tight text-white md:text-3xl lg:text-3xl">
                    Continue Your {""}
                    <span className="">Career Journey</span>
                  </h1>

                  <p className="mt-4 max-w-sm text-xs leading-6 text-white/90 xl:text-sm">
                    Sign in to access your personalized career opportunities,
                    professional network and everything CareerNova has to offer.
                  </p>
                </div>

                {/* BENEFITS */}

                <div className="mt-6 space-y-2.5">
                  {[
                    "Discover personalized job opportunities",
                    "Connect with professionals and companies",
                    "Manage your professional profile",
                    "Track your career growth",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>

                      <span className="text-xs font-semibold text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* =================================================
                    CAREER CATEGORIES
                ================================================= */}

                <div className="mt-5 mb-6">
                  <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">
                    Explore Opportunities
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <button
                          key={category.label}
                          type="button"
                          onClick={() => handleCategoryClick(category.label)}
                          className="group inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/15 px-4 py-3 text-[10px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white hover:text-[#159FEF] hover:shadow-md"
                        >
                          <Icon
                            size={12}
                            className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                          />

                          <span className="whitespace-nowrap text-[11px]">
                            {category.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STATS */}

              <div className="mt-3 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">
                  <p className="text-lg font-black text-white">50K+</p>

                  <p className="mt-0.5 text-[10px] text-white/80">
                    Professionals
                  </p>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">
                  <p className="text-lg font-black text-white">10K+</p>

                  <p className="mt-0.5 text-[10px] text-white/80">Jobs</p>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">
                  <p className="text-lg font-black text-white">2K+</p>

                  <p className="mt-0.5 text-[10px] text-white/80">Companies</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="flex items-center justify-center px-4 py-6 sm:px-7 sm:py-8 lg:px-8 xl:px-12">
            <div className="w-full max-w-sm">
              {/* MOBILE LOGO */}

              <div className="mb-5 flex items-center justify-center gap-2.5 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#30AFFF] text-white shadow-md">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    CareerNova
                  </h2>

                  <p className="text-[11px] text-gray-400">
                    Your Career. Your Future.
                  </p>
                </div>
              </div>

              {/* HEADING */}

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#A0E9FF]/30 text-[#159FEF]">
                  <UserRound size={20} />
                </div>

                <h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
                  Welcome Back
                </h2>

                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
                  Sign in to continue your CareerNova journey
                </p>
              </div>

              {/* LOGIN CARD */}

              <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-md shadow-gray-200/40 sm:p-5">
                {/* ERROR */}

                {error && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}

                {success && (
                  <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-600">
                    Login successful! Redirecting...
                  </div>
                )}

                {/* GOOGLE */}

                <button
                  type="button"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition-all duration-300 hover:border-[#30AFFF]/30 hover:bg-[#A0E9FF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                >
                  <Globe2 size={17} className="text-[#30AFFF]" />
                  Continue with Google
                </button>

                {/* DIVIDER */}

                <div className="my-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] font-semibold text-gray-400">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* EMAIL */}

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

                  {/* PASSWORD */}

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-gray-700"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-[10px] font-semibold text-[#30AFFF] transition hover:text-[#159FEF] sm:text-xs"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#30AFFF] disabled:opacity-50"
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

                  {/* REMEMBER */}

                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      id="remember"
                      type="checkbox"
                      disabled={loading}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-[#30AFFF] focus:ring-[#30AFFF]"
                    />

                    <label htmlFor="remember" className="text-xs text-gray-500">
                      Remember me
                    </label>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#30AFFF] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#30AFFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:text-sm"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* REGISTER */}

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="font-bold text-[#30AFFF] transition hover:text-[#159FEF]"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>

              {/* SECURITY */}

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">
                <LockKeyhole size={12} />
                Your information is securely protected
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
