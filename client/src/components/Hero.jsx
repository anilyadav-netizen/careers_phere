import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Briefcase,
  Users,
  TrendingUp,
  ChevronDown,
  Globe2,
  Plane,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Hero = () => {
  const [typed, setTyped] = useState("");
  const fullText = "Dream Job";
  const [isTyping, setIsTyping] = useState(true);

  const [jobCount, setJobCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const counterRef = useRef(null);
  const imageRef = useRef(null);

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  // =========================================================
  // SWIPER SLIDES
  // =========================================================

  const abroadSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1600&auto=format&fit=crop&q=90",
      country: "United States",
      city: "New York",
      title: "Build Your Career in America",
      description: "Discover professional opportunities in the USA.",
      icon: "🇺🇸",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&auto=format&fit=crop&q=90",
      country: "Australia",
      city: "Sydney",
      title: "Build Your Career in Australia",
      description: "Find new opportunities and grow professionally abroad.",
      icon: "🇦🇺",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&auto=format&fit=crop&q=90",
      country: "Canada",
      city: "Toronto",
      title: "Build Your Career in Canada",
      description: "Explore international jobs with trusted opportunities.",
      icon: "🇨🇦",
    },
  ];

  // =========================================================
  // TYPEWRITER
  // =========================================================

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTyped(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // COUNTERS
  // =========================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        let current = 0;

        const targetJobs = 12400;
        const targetCompanies = 512;
        const targetRating = 94;

        const duration = 2500;
        const stepTime = 20;
        const steps = duration / stepTime;

        const incJobs = Math.ceil(targetJobs / steps);
        const incCompanies = Math.ceil(targetCompanies / steps);
        const incRating = Math.ceil(targetRating / steps);

        const timer = setInterval(() => {
          current += stepTime;

          if (current >= duration) {
            setJobCount(targetJobs);
            setCompanyCount(targetCompanies);
            setRatingCount(targetRating);

            clearInterval(timer);
          } else {
            setJobCount((prev) =>
              Math.min(prev + incJobs, targetJobs)
            );

            setCompanyCount((prev) =>
              Math.min(prev + incCompanies, targetCompanies)
            );

            setRatingCount((prev) =>
              Math.min(prev + incRating, targetRating)
            );
          }
        }, stepTime);

        return () => clearInterval(timer);
      },
      {
        threshold: 0.2,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // MOUSE 3D EFFECT
  // Desktop only
  // =========================================================

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      const rect = imageRef.current?.getBoundingClientRect();

      if (!rect) return;

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      setMousePos({
        x: x * 8,
        y: y * -8,
      });
    };

    const handleMouseLeave = () => {
      setMousePos({
        x: 0,
        y: 0,
      });
    };

    const el = imageRef.current;

    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener(
          "mousemove",
          handleMouseMove
        );

        el.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }

            50% {
              transform: translateY(-20px) rotate(2deg);
            }
          }

          @keyframes floatReverse {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }

            50% {
              transform: translateY(20px) rotate(-2deg);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.2;
              transform: scale(1);
            }

            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          @keyframes slideUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideLeft {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideRight {
            0% {
              opacity: 0;
              transform: translateX(30px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }

            100% {
              background-position: 200% 0;
            }
          }

          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }

            50% {
              opacity: 0;
            }
          }

          @keyframes scrollLogo {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-reverse {
            animation: floatReverse 7s ease-in-out infinite;
          }

          .animate-pulse-glow {
            animation: pulseGlow 4s ease-in-out infinite;
          }

          .animate-slide-up {
            animation: slideUp 0.8s ease forwards;
          }

          .animate-slide-left {
            animation: slideLeft 0.8s ease forwards;
          }

          .animate-slide-right {
            animation: slideRight 0.8s ease forwards;
          }

          .delay-100 {
            animation-delay: 0.1s;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }

          .delay-300 {
            animation-delay: 0.3s;
          }

          .delay-400 {
            animation-delay: 0.4s;
          }

          .delay-500 {
            animation-delay: 0.5s;
          }

          .delay-600 {
            animation-delay: 0.6s;
          }

          .opacity-0 {
            opacity: 0;
          }

          .typing-cursor::after {
            content: "|";
            animation: blink 1s step-end infinite;
            color: #3b82f6;
          }

          .shimmer-text {
            background: linear-gradient(
              90deg,
              #2563eb,
              #818cf8,
              #2563eb
            );

            background-size: 200% auto;

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            animation: shimmer 3s linear infinite;
          }

          .logo-scroll {
            display: flex;
            width: max-content;
            animation: scrollLogo 20s linear infinite;
          }

          .noise::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0.025;

            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");

            background-repeat: repeat;
            background-size: 200px 200px;

            pointer-events: none;
            z-index: 2;
          }

          /* =====================================================
             SWIPER CUSTOM DESIGN
          ===================================================== */

          .hero-swiper {
            width: 100%;
            height: 100%;
          }

          .hero-swiper .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-swiper .swiper-pagination {
            bottom: 14px !important;
          }

          .hero-swiper .swiper-pagination-bullet {
            width: 7px;
            height: 7px;
            background: white;
            opacity: 0.65;
            transition: all 0.3s ease;
          }

          .hero-swiper .swiper-pagination-bullet-active {
            width: 22px;
            border-radius: 999px;
            opacity: 1;
          }

          .hero-swiper .swiper-button-prev,
          .hero-swiper .swiper-button-next {
            width: 36px;
            height: 36px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            color: #2563eb;
          }

          .hero-swiper .swiper-button-prev::after,
          .hero-swiper .swiper-button-next::after {
            font-size: 14px;
            font-weight: 800;
          }

          .hero-swiper .swiper-button-prev {
            left: 14px;
          }

          .hero-swiper .swiper-button-next {
            right: 14px;
          }

          @media (max-width: 640px) {
            .hero-swiper .swiper-button-prev,
            .hero-swiper .swiper-button-next {
              width: 30px;
              height: 30px;
            }

            .hero-swiper .swiper-button-prev::after,
            .hero-swiper .swiper-button-next::after {
              font-size: 11px;
            }

            .hero-swiper .swiper-button-prev {
              left: 8px;
            }

            .hero-swiper .swiper-button-next {
              right: 8px;
            }

            .hero-swiper .swiper-pagination {
              bottom: 8px !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-float,
            .animate-float-reverse,
            .animate-pulse-glow,
            .animate-slide-up,
            .animate-slide-left,
            .animate-slide-right,
            .logo-scroll {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-white
          noise
        "
      >
        {/* ===================================================
            BACKGROUND
        ==================================================== */}

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />

          <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-blue-100/20 to-transparent" />

          <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-to-tr from-indigo-100/20 to-transparent" />

          <div
            className="
              absolute
              -left-20
              top-10
              h-48
              w-48
              rounded-full
              bg-blue-400/15
              blur-3xl
              sm:left-10
              sm:h-64
              sm:w-64
              lg:h-72
              lg:w-72
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -right-20
              h-64
              w-64
              rounded-full
              bg-indigo-400/15
              blur-3xl
              sm:bottom-10
              sm:right-10
              sm:h-80
              sm:w-80
              lg:h-96
              lg:w-96
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-300/10
              blur-3xl
              lg:block
              animate-pulse-glow
            "
          />

          <div
            className="
              absolute
              left-[20%]
              top-20
              hidden
              h-12
              w-12
              rotate-12
              rounded-xl
              border-4
              border-blue-300/20
              lg:block
            "
          />

          <div
            className="
              absolute
              right-[25%]
              top-1/3
              hidden
              h-7
              w-7
              rotate-45
              rounded
              bg-blue-400/20
              lg:block
            "
          />
        </div>

        {/* ===================================================
            MAIN CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1440px]
            px-4
            py-6

            sm:px-6
            sm:py-6

            md:px-8
            md:py-6

            lg:px-10
            lg:py-6

            xl:px-12
            xl:py-6
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-12

              md:gap-14

              lg:flex-row
              lg:items-center
              lg:gap-10

              xl:gap-16

              2xl:gap-24
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div
              className="
                w-full
                min-w-0
                flex-1
                text-left
                lg:text-left
              "
            >
              {/* INTERNATIONAL BADGE */}

              <div
                className="
                  opacity-0
                  animate-slide-left
                  delay-100

                  inline-flex
                  max-w-full
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-100/70
                  bg-white/80
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-blue-700
                  shadow-sm
                  backdrop-blur-sm

                  sm:px-4
                  sm:text-sm
                "
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-blue-500" />
                </span>

                <Globe2 size={15} />

                <span className="hidden sm:inline">
                  Global Jobs • 50+ Countries
                </span>

                <span className="sm:hidden">
                  Global Jobs
                </span>
              </div>

              {/* HEADING */}

              <h1
                className="
                  opacity-0
                  animate-slide-up
                  delay-200

                  mt-5
                  max-w-3xl
                  text-[2.25rem]
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-gray-900

                  xs:text-4xl
                  sm:mt-6
                  sm:text-5xl
                  md:text-6xl

                  lg:text-6xl
                  xl:text-7xl
                  2xl:text-[5rem]
                "
              >
                Build Your Career
                <br />

                <span className="shimmer-text">
                  Beyond Borders
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  opacity-0
                  animate-slide-up
                  delay-300

                  mt-5
                  max-w-xl
                  px-0
                  text-sm
                  leading-6
                  text-gray-600

                  sm:mt-6
                  sm:text-base
                  sm:leading-7

                  lg:text-lg
                  xl:text-xl
                  xl:leading-8
                "
              >
                Discover international job opportunities from
                trusted companies around the world. Build your
                profile, get matched with the right roles, and
                take your career to the country you've always
                dreamed of.
              </p>

              {/* INTERNATIONAL FEATURES */}

              <div
                className="
                  opacity-0
                  animate-slide-up
                  delay-300

                  mt-5
                  grid
                  grid-cols-1
                  gap-2

                  sm:grid-cols-3
                  sm:gap-3
                "
              >
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Globe2 size={14} />
                  </span>
                  Global Opportunities
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Plane size={14} />
                  </span>
                  Work Abroad
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle size={14} />
                  </span>
                  Verified Jobs
                </div>
              </div>

              {/* BUTTONS */}

              <div
                className="
                  opacity-0
                  animate-slide-up
                  delay-400

                  mt-6
                  flex
                  w-full
                  flex-col
                  items-stretch
                  gap-3

                  sm:mt-7
                  sm:flex-row
                  sm:items-center
                  sm:gap-4
                "
              >
                <button
                  type="button"
                  className="
                    group
                    relative
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:shadow-2xl

                    sm:w-auto
                    sm:px-7
                    sm:py-4
                  "
                >
                  <span className="absolute inset-0 rounded-full bg-white/10" />

                  <Link
                    to="/jobs"
                    className="relative z-10"
                  >
                    Explore Global Jobs
                  </Link>

                  <ArrowRight
                    size={18}
                    className="
                      relative
                      z-10
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>

                <button
                  type="button"
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-gray-200
                    bg-white/80
                    px-6
                    py-3.5
                    text-sm
                    font-medium
                    text-gray-700
                    shadow-md
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-300
                    hover:text-blue-600
                    hover:shadow-lg

                    sm:w-auto
                    sm:px-6
                    sm:py-4
                  "
                >
                  <Play
                    size={18}
                    className="fill-current"
                  />

                  <Link to="/subscription">
                    Get Subscription
                  </Link>
                </button>
              </div>

              {/* STATS */}

              <div
                ref={counterRef}
                className="
                  opacity-0
                  animate-slide-up
                  delay-500

                  mt-8
                  grid
                  grid-cols-3
                  gap-3

                  sm:mt-9
                  sm:flex
                  sm:flex-wrap
                  sm:justify-start
                  sm:gap-6

                  lg:gap-7
                "
              >
                {/* JOBS */}

                <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      shadow-sm

                      sm:h-10
                      sm:w-10

                      lg:h-12
                      lg:w-12
                    "
                  >
                    <Briefcase
                      size={17}
                      className="text-blue-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                    />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl">
                      {jobCount.toLocaleString()}+
                    </p>

                    <p className="truncate text-[10px] text-gray-500 sm:text-sm">
                      Global Jobs
                    </p>
                  </div>
                </div>

                {/* COMPANIES */}

                <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-50
                      shadow-sm

                      sm:h-10
                      sm:w-10

                      lg:h-12
                      lg:w-12
                    "
                  >
                    <Users
                      size={17}
                      className="text-indigo-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                    />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl">
                      {companyCount}+
                    </p>

                    <p className="truncate text-[10px] text-gray-500 sm:text-sm">
                      Companies
                    </p>
                  </div>
                </div>

                {/* SATISFACTION */}

                <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-yellow-50
                      shadow-sm

                      sm:h-10
                      sm:w-10

                      lg:h-12
                      lg:w-12
                    "
                  >
                    <TrendingUp
                      size={17}
                      className="text-yellow-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                    />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl">
                      {ratingCount}%
                    </p>

                    <p className="truncate text-[10px] text-gray-500 sm:text-sm">
                      Success Rate
                    </p>
                  </div>
                </div>
              </div>

              {/* TRUST LOGOS */}

              <div
                className="
                  opacity-0
                  animate-slide-up
                  delay-600

                  mt-7
                  w-full
                  max-w-lg
                  overflow-hidden

                  lg:mx-0
                "
              >
                <div className="overflow-hidden">
                  <div className="logo-scroll items-center">
                    <span className="mr-3 text-xs font-medium text-gray-400 sm:text-sm">
                      Trusted by
                    </span>

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                      alt="Google"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg"
                      alt="Microsoft"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
                      alt="Amazon Web Services"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                      alt="Apple"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <span className="ml-2 text-xs font-medium text-blue-500 sm:text-sm">
                      +500 more
                    </span>

                    <span className="ml-8 mr-3 text-xs font-medium text-gray-400 sm:text-sm">
                      Trusted by
                    </span>

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                      alt="Google"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg"
                      alt="Microsoft"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
                      alt="Amazon Web Services"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                      alt="Apple"
                      className="mx-2 h-5 w-auto opacity-50 grayscale sm:h-6"
                    />

                    <span className="ml-2 text-xs font-medium text-blue-500 sm:text-sm">
                      +500 more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE / SWIPER
            ================================================== */}

            <div
              className="
                flex
                w-full
                min-w-0
                flex-1
                justify-center
                opacity-0
                animate-slide-right
                delay-300

                lg:justify-end
              "
            >
              <div
                ref={imageRef}
                className="
                  relative
                  w-full
                  max-w-[340px]

                  sm:max-w-[480px]

                  md:max-w-[560px]

                  lg:max-w-[570px]

                  xl:max-w-[650px]

                  2xl:max-w-[700px]

                  will-change-transform
                "
                style={{
                  transform: `
                    perspective(1000px)
                    rotateY(${mousePos.x}deg)
                    rotateX(${mousePos.y}deg)
                    scale(1.01)
                  `,
                }}
              >
                {/* Decorative Orbs */}

                <div className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full bg-blue-200/30 blur-3xl sm:block" />

                <div className="absolute -bottom-5 -right-5 hidden h-36 w-36 rounded-full bg-indigo-200/30 blur-3xl sm:block" />

                {/* Small floating dots */}

                <div className="absolute -left-2 top-1/4 h-3 w-3 rounded-full bg-blue-400/40 blur-sm sm:-left-4 sm:h-5 sm:w-5" />

                <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-indigo-400/40 blur-sm sm:-right-4 sm:h-7 sm:w-7" />

                {/* =================================================
                    SWIPER
                ================================================== */}

                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-2xl sm:rounded-3xl" />

                  <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 sm:rounded-3xl">
                    <Swiper
                      modules={[
                        Autoplay,
                        Pagination,
                        Navigation,
                        EffectFade,
                      ]}
                      effect="fade"
                      fadeEffect={{
                        crossFade: true,
                      }}
                      slidesPerView={1}
                      loop={true}
                      speed={1000}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      className="hero-swiper aspect-[4/3] w-full"
                    >
                      {abroadSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative h-full w-full bg-slate-100">
                            {/* IMAGE */}

                            <img
                              src={slide.image}
                              alt={`${slide.city}, ${slide.country}`}
                              className="
                                h-full
                                w-full
                                object-contain
                                bg-slate-100
                              "
                            />

                            {/* Overlay */}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* COUNTRY LABEL */}

                            <div
                              className="
                                absolute
                                left-4
                                top-4
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/30
                                bg-black/30
                                px-3
                                py-1.5
                                text-white
                                shadow-lg
                                backdrop-blur-md

                                sm:left-5
                                sm:top-5
                                sm:px-4
                                sm:py-2
                              "
                            >
                              <span className="text-base sm:text-lg">
                                {slide.icon}
                              </span>

                              <span className="text-[10px] font-semibold sm:text-xs">
                                {slide.country}
                              </span>
                            </div>

                            {/* SLIDE CONTENT */}

                            <div
                              className="
                                absolute
                                bottom-8
                                left-4
                                right-4
                                text-white

                                sm:bottom-10
                                sm:left-6
                                sm:right-6

                                md:bottom-12
                                md:left-8
                                md:right-8
                              "
                            >
                              <div className="mb-1 flex items-center gap-1.5">
                                <MapPin
                                  size={13}
                                  className="text-blue-300 sm:h-4 sm:w-4"
                                />

                                <span className="text-[10px] font-medium text-blue-100 sm:text-xs">
                                  {slide.city}
                                </span>
                              </div>

                              <h2
                                className="
                                  max-w-xl
                                  text-lg
                                  font-black
                                  leading-tight

                                  sm:text-2xl

                                  md:text-3xl

                                  lg:text-4xl
                                "
                              >
                                {slide.title}
                              </h2>

                              <p
                                className="
                                  mt-1
                                  max-w-lg
                                  text-[10px]
                                  leading-4
                                  text-white/80

                                  sm:mt-2
                                  sm:text-xs
                                  sm:leading-5

                                  md:text-sm
                                "
                              >
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* =================================================
                        TOP FLOATING CARD
                    ================================================== */}

                    <div
                      className="
                        absolute
                        right-2
                        top-2
                        z-20
                        rounded-xl
                        border
                        border-white/40
                        bg-white/90
                        px-2
                        py-1.5
                        shadow-2xl
                        backdrop-blur-xl

                        sm:right-4
                        sm:top-4
                        sm:rounded-2xl
                        sm:px-3
                        sm:py-2.5

                        md:right-6
                        md:top-6
                        md:px-4
                        md:py-3
                      "
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-8 sm:w-8 md:h-10 md:w-10">
                          <Globe2
                            size={12}
                            className="text-blue-600 sm:h-4 sm:w-4 md:h-5 md:w-5"
                          />
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-[9px] font-bold text-gray-800 sm:text-xs md:text-sm">
                            50+ Countries
                          </p>

                          <p className="whitespace-nowrap text-[8px] text-gray-500 sm:text-[10px] md:text-xs">
                            Global opportunities
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM LEFT CARD
                    ================================================== */}

                    <div
                      className="
                        absolute
                        bottom-8
                        left-2
                        z-20
                        rounded-xl
                        border
                        border-white/40
                        bg-white/90
                        px-2
                        py-1.5
                        shadow-2xl
                        backdrop-blur-xl

                        sm:bottom-10
                        sm:left-4
                        sm:rounded-2xl
                        sm:px-3
                        sm:py-2.5

                        md:bottom-12
                        md:left-6
                        md:px-4
                        md:py-3
                      "
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 sm:h-8 sm:w-8 md:h-10 md:w-10">
                          <Plane
                            size={12}
                            className="text-indigo-600 sm:h-4 sm:w-4 md:h-5 md:w-5"
                          />
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-[9px] font-bold text-gray-800 sm:text-xs md:text-sm">
                            Work Abroad
                          </p>

                          <p className="whitespace-nowrap text-[8px] text-gray-500 sm:text-[10px] md:text-xs">
                            Your next destination
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM RIGHT CARD
                    ================================================== */}

                    <div
                      className="
                        absolute
                        bottom-8
                        right-2
                        z-20
                        hidden
                        items-center
                        gap-1.5
                        rounded-xl
                        border
                        border-white/40
                        bg-white/90
                        px-2
                        py-1.5
                        shadow-2xl
                        backdrop-blur-xl

                        sm:flex
                        sm:bottom-10
                        sm:right-4
                        sm:rounded-2xl
                        sm:px-3
                        sm:py-2.5

                        md:bottom-12
                        md:right-6
                      "
                    >
                      <CheckCircle
                        size={13}
                        className="shrink-0 text-green-500 sm:h-4 sm:w-4"
                      />

                      <span className="whitespace-nowrap text-[9px] font-semibold text-gray-800 sm:text-xs">
                        Verified Opportunities
                      </span>
                    </div>

                    {/* =================================================
                        LOCATION CARD
                    ================================================== */}

                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        z-20
                        hidden
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-white/40
                        bg-white/90
                        px-4
                        py-3
                        shadow-2xl
                        backdrop-blur-xl

                        md:flex
                      "
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                        <MapPin
                          size={18}
                          className="text-red-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          Your Career
                        </p>

                        <p className="text-[10px] text-gray-500">
                          Can take you anywhere
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
            SCROLL INDICATOR
        ====================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-1/2
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-1
            text-gray-400
            sm:flex
            md:bottom-6
          "
        >
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Scroll
          </span>

          <ChevronDown
            size={17}
            className="animate-bounce"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;