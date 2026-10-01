import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ChevronDown,
  Code2,
  FileText,
  Film,
  Globe,
  Info,
  Layers,
  LogIn,
  LogOut,
  Menu,
  Palette,
  Phone,
  Search,
  Server,
  Smartphone,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";

import { FaBookmark } from "react-icons/fa";

import { getProfile, logoutUser } from "../redux/slicer/authSlice";

import FeedbackModal from "./FeedbackModal";

const LOGO_URL = "https://i.ibb.co/R4BKkFCW/careernova.png";

/* =========================================================
   LOGO (single source — navbar + mobile drawer dono me same)
========================================================= */

const Logo = ({ onClick, className = "" }) => (
  <Link
    to="/"
    onClick={onClick}
    aria-label="CareerNova Home"
    className={`flex min-w-0 shrink-0 items-center ${className}`}
  >
    <img
      src={LOGO_URL}
      alt="CareerNova"
      decoding="async"
      className="h-[4rem] w-auto max-w-[130px] object-contain min-[400px]:max-w-[150px] md:h-10 md:max-w-[190px] lg:h-[4.25rem] lg:max-w-[160px]"
    />
  </Link>
);

const Navbar = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileUserMenu, setMobileUserMenu] = useState(false);
  const [remoteMenu, setRemoteMenu] = useState(false);
  const [mobileRemoteMenu, setMobileRemoteMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Added from colleague logic
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // =========================================================
  // REDUX
  // =========================================================

  const dispatch = useDispatch();

  const {
    user,
    isAuthenticated,
    loading: authLoading,
    token,
  } = useSelector((state) => state.auth);

  // =========================================================
  // ROUTER
  // =========================================================

  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // REFS
  // =========================================================

  const userMenuRef = useRef(null);
  const remoteMenuRef = useRef(null);

  // =========================================================
  // NAV ITEMS
  // =========================================================

  const remoteLandingPages = [
    {
      name: "Frontend Developer",
      path: "/frontend",
      description: "React, Next.js & UI Engineering",
      icon: Code2,
      badge: "Popular",
    },
    {
      name: "Backend Developer",
      path: "/backend",
      description: "Node.js, APIs & Database Systems",
      icon: Server,
    },
    {
      name: "Full Stack Developer",
      path: "/fullStack",
      description: "End-to-End Web & Cloud Systems",
      icon: Layers,
    },
    {
      name: "Android Developer",
      path: "/andriod",
      description: "Kotlin, Compose & Mobile Apps",
      icon: Smartphone,
    },
    {
      name: "UI/UX Designer",
      path: "/uiux-designer",
      description: "Figma Canvas & Design Systems",
      icon: Palette,
    },
    {
      name: "Video Editor",
      path: "/videoEditor",
      description: "Video Timeline & Motion Design",
      icon: Film,
    },
  ];

  const isRemoteItemActive = (item) =>
    location.pathname === item.path ||
    (item.path === "/uiux-designer" && location.pathname === "/uiux") ||
    (item.path === "/videoEditor" && location.pathname === "/video-editor");

  const isRemoteActive = () => {
    return remoteLandingPages.some(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path) ||
        (item.path === "/uiux-designer" && location.pathname === "/uiux") ||
        (item.path === "/videoEditor" && location.pathname === "/video-editor"),
    );
  };

  // =========================================================
  // GET PROFILE FROM BACKEND
  // =========================================================

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, token]);

  // =========================================================
  // ACTIVE ROUTE
  // =========================================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  // =========================================================
  // CLOSE MENUS ON ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    setMobileMenu(false);
    setUserMenu(false);
    setMobileUserMenu(false);
    setRemoteMenu(false);
    setMobileRemoteMenu(false);
  }, [location.pathname]);

  // =========================================================
  // CLICK OUTSIDE USER & REMOTE MENUS
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
      if (
        remoteMenuRef.current &&
        !remoteMenuRef.current.contains(event.target)
      ) {
        setRemoteMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // ESC KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
        setUserMenu(false);
        setMobileUserMenu(false);
        setRemoteMenu(false);
        setMobileRemoteMenu(false);
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =========================================================
  // LOCK BODY SCROLL WHEN MOBILE DRAWER IS OPEN
  // =========================================================

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // =========================================================
  // CLOSE MOBILE DRAWER WHEN SCREEN BECOMES DESKTOP (rotate / resize)
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
        setMobileUserMenu(false);
        setMobileRemoteMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================================================
  // MOBILE MENU TOGGLE
  // =========================================================

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
    setUserMenu(false);
    setMobileUserMenu(false);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      await dispatch(logoutUser()).unwrap();

      setUserMenu(false);
      setMobileUserMenu(false);
      setMobileMenu(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);

      setUserMenu(false);
      setMobileUserMenu(false);
      setMobileMenu(false);

      navigate("/login");
    } finally {
      setLogoutLoading(false);
    }
  };

  // =========================================================
  // USER NAME
  // =========================================================

  const getUserName = () => {
    if (!user) {
      return "User";
    }

    return (
      user.name ||
      user.fullName ||
      user.username ||
      user.firstName ||
      user.first_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  // =========================================================
  // USER INITIAL
  // =========================================================

  const getUserInitial = () => {
    return getUserName().charAt(0).toUpperCase();
  };

  // =========================================================
  // SHARED CLASSES
  // =========================================================

  const desktopLinkClass = (active) =>
    `relative flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all duration-200 xl:gap-2 xl:px-3.5 xl:text-sm ${
      active
        ? "bg-[#A0E9FF]/35 text-[#30AFFF]"
        : "text-slate-600 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF]"
    }`;

  const mobileLinkClass = (active) =>
    `flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 sm:gap-4 sm:px-4 sm:py-3.5 ${
      active
        ? "bg-[#A0E9FF]/35 text-[#30AFFF]"
        : "text-slate-700 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF]"
    }`;

  const mobileIconClass = (active) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
      active
        ? "bg-white text-[#30AFFF] shadow-xs"
        : "bg-[#A0E9FF]/25 text-slate-500"
    }`;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          LOGOUT CONFIRMATION MODAL
      ====================================================== */}

      {showLogoutConfirm && (
        <FeedbackModal
          title="Confirm logout"
          message="Are you sure you want to logout?"
          confirmLabel="Logout"
          onConfirm={async () => {
            setShowLogoutConfirm(false);
            await handleLogout();
          }}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 md:px-6 lg:px-6 xl:px-10">
          <div className="flex min-h-[60px] items-center justify-between gap-2 sm:min-h-[68px] sm:gap-3">
            {/* =================================================
                LOGO
            ================================================= */}

            <Logo />

            {/* =================================================
                DESKTOP NAV
            ================================================= */}

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <div className="flex items-center gap-0.5 xl:gap-1">
                {/* 1. Find Jobs */}
                <Link
                  to="/jobs"
                  className={desktopLinkClass(isActive("/jobs"))}
                >
                  <Search size={16} strokeWidth={2} className="shrink-0" />
                  <span>Find Jobs</span>
                  {isActive("/jobs") && (
                    <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#30AFFF]" />
                  )}
                </Link>

                {/* 2. Remote Dropdown */}
                <div
                  ref={remoteMenuRef}
                  className="relative"
                  onMouseEnter={() => setRemoteMenu(true)}
                  onMouseLeave={() => setRemoteMenu(false)}
                >
                  <button
                    type="button"
                    onClick={() => setRemoteMenu((prev) => !prev)}
                    className={desktopLinkClass(isRemoteActive() || remoteMenu)}
                    aria-expanded={remoteMenu}
                  >
                    <Globe size={16} strokeWidth={2} className="shrink-0" />
                    <span>Remote</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        remoteMenu
                          ? "rotate-180 text-[#30AFFF]"
                          : "text-slate-400"
                      }`}
                    />
                    {isRemoteActive() && (
                      <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#30AFFF]" />
                    )}
                  </button>

                  {/* Remote Dropdown Menu */}
                  {remoteMenu && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="w-[300px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl shadow-slate-300/50 backdrop-blur-md xl:w-80">
                        <div className="mb-1 flex items-center justify-between border-b border-slate-100 px-3 py-2">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Remote Roles
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Explore specialized career landing pages
                            </p>
                          </div>
                          <span className="rounded-full bg-[#A0E9FF]/30 px-2 py-0.5 text-[10px] font-semibold text-[#0B6F9F]">
                            6 Domains
                          </span>
                        </div>

                        <div className="space-y-1">
                          {remoteLandingPages.map((item) => {
                            const Icon = item.icon;
                            const active = isRemoteItemActive(item);

                            return (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setRemoteMenu(false)}
                                className={`flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 ${
                                  active
                                    ? "bg-[#A0E9FF]/30 text-[#0B6F9F]"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-[#30AFFF]"
                                }`}
                              >
                                <div
                                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                    active
                                      ? "bg-[#30AFFF] text-white shadow-xs"
                                      : "bg-[#A0E9FF]/20 text-[#30AFFF]"
                                  }`}
                                >
                                  <Icon size={16} strokeWidth={2} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-xs font-semibold leading-tight text-slate-800">
                                      {item.name}
                                    </p>
                                    {item.badge && (
                                      <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. About Us */}
                <Link
                  to="/about"
                  className={desktopLinkClass(isActive("/about"))}
                >
                  <Info size={16} strokeWidth={2} className="shrink-0" />
                  <span>About Us</span>
                  {isActive("/about") && (
                    <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#30AFFF]" />
                  )}
                </Link>

                {/* 4. Contact Us */}
                <Link
                  to="/contact"
                  className={desktopLinkClass(isActive("/contact"))}
                >
                  <Phone size={16} strokeWidth={2} className="shrink-0" />
                  <span>Contact Us</span>
                  {isActive("/contact") && (
                    <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#30AFFF]" />
                  )}
                </Link>
              </div>
            </div>

            {/* =================================================
                DESKTOP AUTH
            ================================================= */}

            <div
              ref={userMenuRef}
              className="relative hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2"
            >
              {/* AUTH LOADING */}

              {authLoading || logoutLoading ? (
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />

                  <div className="hidden h-3 w-20 animate-pulse rounded bg-slate-200 xl:block" />
                </div>
              ) : !isAuthenticated ? (
                <>
                  {/* LOGIN */}

                  <Link
                    to="/login"
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all duration-200 xl:gap-2 xl:px-4 xl:text-sm ${
                      isActive("/login")
                        ? "bg-[#A0E9FF]/35 text-[#30AFFF]"
                        : "text-slate-600 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF]"
                    }`}
                  >
                    <LogIn size={16} strokeWidth={2} />

                    <span>Login</span>
                  </Link>

                  {/* SIGN UP */}

                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#30AFFF] px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-[#30AFFF]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-lg xl:gap-2 xl:px-5 xl:text-sm"
                  >
                    <UserPlus size={16} strokeWidth={2} />

                    <span>Sign Up</span>
                  </Link>
                </>
              ) : (
                /* LOGGED IN USER */

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenu((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition-all duration-200 hover:border-[#A0E9FF] hover:bg-[#A0E9FF]/15 focus:outline-none focus:ring-4 focus:ring-[#30AFFF]/10"
                    aria-label="Open user menu"
                    aria-expanded={userMenu}
                  >
                    {/* USER AVATAR */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#30AFFF] text-sm font-bold text-white shadow-sm">
                      {getUserInitial()}
                    </div>

                    {/* USER NAME */}

                    <div className="hidden max-w-[120px] text-left xl:block">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {getUserName()}
                      </p>

                      <p className="text-[10px] text-slate-400">My Account</p>
                    </div>

                    <ChevronDown
                      size={15}
                      className={`text-slate-400 transition-transform duration-200 ${
                        userMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* =================================================
                      DESKTOP USER DROPDOWN
                  ================================================= */}

                  {userMenu && (
                    <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40">
                      {/* USER INFO */}

                      <div className="mb-1 rounded-xl bg-[#A0E9FF]/15 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#30AFFF] font-bold text-white">
                            {getUserInitial()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-800">
                              {getUserName()}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* PROFILE */}

                      <Link
                        to="/profile"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-[#A0E9FF]/20 hover:text-[#30AFFF]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0E9FF]/30 text-[#30AFFF]">
                          <UserRound size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">Profile</p>

                          <p className="text-[10px] text-slate-400">
                            View your profile
                          </p>
                        </div>
                      </Link>

                      {/* APPLICATIONS */}

                      <Link
                        to="/applications"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-[#A0E9FF]/20 hover:text-[#30AFFF]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0E9FF]/30 text-[#30AFFF]">
                          <FileText size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">My Applications</p>

                          <p className="text-[10px] text-slate-400">
                            Track your applications
                          </p>
                        </div>
                      </Link>

                      {/* SAVED APPLICATION */}

                      <Link
                        to="/savedapplication"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-[#A0E9FF]/20 hover:text-[#30AFFF]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0E9FF]/30 text-[#30AFFF]">
                          <FaBookmark size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">Saved Application</p>

                          <p className="text-[10px] text-slate-400">
                            View your saved application
                          </p>
                        </div>
                      </Link>

                      <div className="my-1 h-px bg-slate-100" />

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirm(true)}
                        disabled={logoutLoading}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                          <LogOut size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">
                            {logoutLoading ? "Logging out..." : "Logout"}
                          </p>

                          <p className="text-[10px] text-red-400">
                            Sign out from account
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF] active:scale-95 lg:hidden"
            >
              {mobileMenu ? (
                <X size={24} strokeWidth={2} />
              ) : (
                <Menu size={24} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        className={`fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenu(false)}
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <div
        aria-hidden={!mobileMenu}
        className={`fixed right-0 top-0 z-[60] flex h-[100dvh] w-[320px] max-w-[88vw] flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ease-in-out lg:hidden ${
          mobileMenu ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
          <Logo onClick={() => setMobileMenu(false)} />

          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF] active:scale-95"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="flex-1 overflow-y-auto overscroll-contain p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-4">
          {/* NAV ITEMS */}

          <div className="space-y-1">
            {/* Find Jobs */}
            <Link
              to="/jobs"
              onClick={() => setMobileMenu(false)}
              className={mobileLinkClass(isActive("/jobs"))}
            >
              <span className={mobileIconClass(isActive("/jobs"))}>
                <Search size={18} strokeWidth={2} />
              </span>
              <span>Find Jobs</span>
            </Link>

            {/* Remote Accordion */}
            <div className="overflow-hidden rounded-xl">
              <button
                type="button"
                onClick={() => setMobileRemoteMenu((prev) => !prev)}
                aria-expanded={mobileRemoteMenu}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 sm:px-4 sm:py-3.5 ${
                  isRemoteActive() || mobileRemoteMenu
                    ? "bg-[#A0E9FF]/35 text-[#30AFFF]"
                    : "text-slate-700 hover:bg-[#A0E9FF]/25 hover:text-[#30AFFF]"
                }`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <span className={mobileIconClass(isRemoteActive())}>
                    <Globe size={18} strokeWidth={2} />
                  </span>
                  <span>Remote</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    mobileRemoteMenu ? "rotate-180 text-[#30AFFF]" : ""
                  }`}
                />
              </button>

              {/* Sub-items */}
              {mobileRemoteMenu && (
                <div className="ml-5 mt-1 space-y-1 border-l-2 border-[#A0E9FF]/60 py-1 pl-3">
                  {remoteLandingPages.map((item) => {
                    const Icon = item.icon;
                    const active = isRemoteItemActive(item);

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => {
                          setMobileMenu(false);
                          setMobileRemoteMenu(false);
                        }}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                          active
                            ? "bg-[#A0E9FF]/30 font-semibold text-[#0B6F9F]"
                            : "text-slate-600 hover:bg-[#A0E9FF]/15 hover:text-[#30AFFF]"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-[#30AFFF] text-white shadow-xs"
                              : "bg-[#A0E9FF]/20 text-[#30AFFF]"
                          }`}
                        >
                          <Icon size={14} strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate">{item.name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className={mobileLinkClass(isActive("/about"))}
            >
              <span className={mobileIconClass(isActive("/about"))}>
                <Info size={18} strokeWidth={2} />
              </span>
              <span>About Us</span>
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className={mobileLinkClass(isActive("/contact"))}
            >
              <span className={mobileIconClass(isActive("/contact"))}>
                <Phone size={18} strokeWidth={2} />
              </span>
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="my-3 h-px bg-slate-100 sm:my-4" />

          {/* =================================================
              MOBILE AUTH
          ================================================= */}

          {authLoading || logoutLoading ? (
            <div className="space-y-2">
              <div className="h-12 animate-pulse rounded-xl bg-slate-100" />

              <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : !isAuthenticated ? (
            /* MOBILE NOT LOGGED IN */

            <div className="space-y-2">
              {/* LOGIN */}

              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className={mobileLinkClass(isActive("/login"))}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0E9FF]/25">
                  <LogIn size={18} strokeWidth={2} />
                </span>

                <span>Login</span>
              </Link>

              {/* SIGN UP */}

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#30AFFF] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#30AFFF]/20 transition-all duration-200 hover:bg-[#159FEF] hover:shadow-lg active:scale-[0.99]"
              >
                <UserPlus size={19} strokeWidth={2} />

                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            /* MOBILE LOGGED IN */

            <div className="space-y-2">
              {/* USER HEADER */}

              <button
                type="button"
                onClick={() => setMobileUserMenu((prev) => !prev)}
                aria-expanded={mobileUserMenu}
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-[#A0E9FF] bg-[#A0E9FF]/15 p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#30AFFF] text-sm font-bold text-white">
                    {getUserInitial()}
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {getUserName()}
                    </p>

                    <p className="truncate text-[11px] text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform ${
                    mobileUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* MOBILE USER MENU */}

              {mobileUserMenu && (
                <div className="space-y-1 rounded-xl bg-[#A0E9FF]/15 p-2">
                  {/* PROFILE */}

                  <Link
                    to="/profile"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-[#30AFFF]"
                  >
                    <UserRound size={18} className="text-[#30AFFF]" />

                    <span>Profile</span>
                  </Link>

                  {/* APPLICATIONS */}

                  <Link
                    to="/applications"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-[#30AFFF]"
                  >
                    <FileText size={18} className="text-[#30AFFF]" />

                    <span>My Applications</span>
                  </Link>

                  {/* SAVED APPLICATION */}

                  <Link
                    to="/savedapplication"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-[#30AFFF]"
                  >
                    <FaBookmark size={18} className="text-[#30AFFF]" />

                    <span>Saved Application</span>
                  </Link>

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(true)}
                    disabled={logoutLoading}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut size={18} />

                    <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
