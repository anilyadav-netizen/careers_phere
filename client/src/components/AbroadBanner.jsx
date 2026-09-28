import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Plane,
  Sparkles,
} from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Build Your Global Career in America with Visa & Travel Support",
    description:
      "Explore global career opportunities designed to help you start your journey, with selected roles requiring no prior experience.",
    button: "Explore Jobs",
    icon: Globe2,
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    title: "Unlock Global Career Opportunities with Visa & Travel Support",
    description:
      "Take the next step toward an international career with opportunities open to candidates with no prior experience.",
    button: "Find Jobs",
    icon: BriefcaseBusiness,
    location: "New York City, USA",
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    title:
      "Launch Your Global Career with Trusted Visa & Travel Support.",
    description:
      "Discover exciting international career opportunities and take your professional journey to the next level — no prior experience required for selected roles.",
    button: "Start Your Journey",
    icon: Plane,
    location: "San Francisco, USA",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=85",
  },
];

const AbroadBanner = () => {
  const navigate = useNavigate();

  // =====================================================
  // SLIDER STATE
  // =====================================================

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // =====================================================
  // AUTO SLIDER
  // =====================================================

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const previousSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // =====================================================
  // GO TO SPECIFIC SLIDE
  // =====================================================

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          SLIDER
      ===================================================== */}

      <div className="relative h-[460px] sm:h-[600px] md:h-[580px] lg:h-[590px]">
        {banners.map((banner, index) => {
          const Icon = banner.icon;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
            >
              {/* =================================================
                  BACKGROUND IMAGE
              ================================================= */}

              <img
                src={banner.image}
                alt={banner.title}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  index === activeSlide
                    ? "scale-105"
                    : "scale-100"
                }`}
              />

              {/* =================================================
                  OVERLAY
              ================================================= */}

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20" />

              <div className="absolute inset-0 bg-slate-950/20 lg:bg-transparent" />

              {/* =================================================
                  CONTENT CONTAINER
              ================================================= */}

              <div className="relative z-20 mx-auto mt-4 flex h-full max-w-7xl items-center px-4 pb-16 pt-2 sm:px-6 sm:pb-16 sm:pt-2 lg:px-8 lg:pb-12">
                <div className="w-full max-w-2xl">

                  {/* =================================================
                      TOP BADGES
                  ================================================= */}

                  <div className="flex flex-wrap items-center gap-2">

                    {/* Location */}

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md sm:text-xs">
                      <MapPin
                        size={13}
                        className="text-[#30AFFF]"
                      />

                      {banner.location}
                    </div>

                    {/* Sponsored */}

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A0E9FF]/30 bg-[#A0E9FF]/10 px-3 py-1.5 text-[10px] font-semibold text-[#A0E9FF] backdrop-blur-md sm:text-xs">
                      Company Sponsored
                    </div>
                  </div>

                  {/* =================================================
                      LABEL
                  ================================================= */}

                  <div className="mt-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#30AFFF] sm:mt-5 sm:text-xs">
                    <Sparkles size={14} />

                    <span>Global Career Opportunity</span>
                  </div>

                  {/* =================================================
                      HEADING
                  ================================================= */}

                  <h1 className="mt-4 max-w-2xl text-[22px] font-bold leading-none tracking-normal text-white sm:mt-4 md:text-3xl md:leading-[1.0] lg:text-[40px]">
                    {banner.title}
                  </h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7">
                    {banner.description}
                  </p>

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <div className="mt-4 flex flex-row gap-2 sm:mt-7 sm:gap-3">

                    {/* Explore Jobs */}

                    <button
                      type="button"
                      onClick={() => navigate("/jobs")}
                      className="inline-flex w-1/2 items-center justify-center gap-1.5 rounded-xl bg-[#30AFFF] px-3 py-3 text-[13px] font-bold text-white shadow-lg shadow-[#30AFFF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] sm:w-auto sm:gap-2 sm:px-6"
                    >
                      <Icon size={17} />

                      {banner.button}

                      <ArrowRight size={16} />
                    </button>

                    {/* Learn More */}

                    <button
                      type="button"
                      onClick={() => navigate("/about")}
                      className="inline-flex w-1/2 items-center justify-center gap-1.5 rounded-xl border border-[#A0E9FF]/40 bg-[#A0E9FF]/10 px-3 py-3 text-[13px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-[#A0E9FF]/20 sm:w-auto sm:gap-2 sm:px-6"
                    >
                      Learn More

                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* =================================================
                      QUICK STATS
                  ================================================= */}

                  <div className="mt-2 flex max-w-xl items-center border-t border-white/10 pt-5 sm:mt-7 sm:pt-6">

                    {/* Stat 1 */}

                    <div className="flex-1">
                      <p className="text-base font-black text-white sm:text-xl">
                        Global
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[11px]">
                        Opportunities
                      </p>
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                    {/* Stat 2 */}

                    <div className="flex-1 pl-4 sm:pl-6">
                      <p className="text-base font-black text-white sm:text-xl">
                        Sponsored
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[11px]">
                        By Companies
                      </p>
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                    {/* Stat 3 */}

                    <div className="flex-1 pl-4 sm:pl-6">
                      <p className="text-base font-black text-white sm:text-xl">
                        Global
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[11px]">
                        Career Growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* =====================================================
            DESKTOP PREVIOUS
        ===================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#30AFFF] hover:text-white lg:flex"
        >
          <ArrowLeft size={18} />
        </button>

        {/* =====================================================
            DESKTOP NEXT
        ===================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#30AFFF] hover:text-white lg:flex"
        >
          <ArrowRight size={18} />
        </button>

        {/* =====================================================
            SLIDER DOTS
        ===================================================== */}

        <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-6">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeSlide
                  ? "w-7 bg-[#30AFFF]"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AbroadBanner;