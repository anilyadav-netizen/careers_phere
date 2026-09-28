
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Plane,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const GlobalJourneyBanner = () => {
  const navigate = useNavigate();

  const destinations = ["Australia", "USA", "Japan", "Europe"];

  const benefits = [
    "Verified Opportunities",
    "Global Employers",
    "Career Assistance",
    "Easy Job Search",
  ];

  return (
    <section className="w-full bg-white px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
      <div className="mx-auto w-full max-w-7xl">

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-[#F3FBFF] shadow-[0_15px_45px_rgba(48,175,255,0.10)] sm:rounded-3xl">

          {/* Decorative Shapes */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#30AFFF]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#A0E9FF]/30 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">

            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center p-5 sm:p-7 md:p-9 lg:p-11 xl:p-14">

              {/* Small Badge */}
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[#30AFFF]/15 bg-white px-3 py-1.5 shadow-sm sm:mb-5 sm:px-3.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#30AFFF]/10">
                  <Globe2 size={11} className="text-[#30AFFF]" />
                </span>

                <span className="text-[10px] font-bold tracking-wide text-slate-600 sm:text-xs">
                  GLOBAL CAREER OPPORTUNITIES
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-lg font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[38px]">
                Take Your Career {""}
                <span className="">
                  Beyond Borders.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-xl text-xs leading-5.5 text-slate-500 sm:mt-4 sm:text-sm sm:leading-6 md:text-base">
                Discover international job opportunities and connect with
                trusted employers across some of the world's most exciting
                career destinations.
              </p>

              {/* Destinations */}
              <div className="mt-5 flex flex-wrap gap-2">
                {destinations.map((country) => (
                  <div
                    key={country}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm transition hover:border-[#30AFFF]/30 hover:text-[#30AFFF] sm:px-3.5 sm:py-2 sm:text-xs"
                  >
                    <MapPin size={12} className="text-[#30AFFF]" />
                    {country}
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-5 grid max-w-xl grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-6 sm:gap-x-6 sm:gap-y-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex min-w-0 items-center gap-2"
                  >
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#30AFFF]"
                    />

                    <span className="truncate text-[10px] font-semibold text-slate-600 sm:text-xs md:text-sm">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-5 py-3 text-xs font-extrabold text-white shadow-[0_8px_22px_rgba(48,175,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Find Jobs Abroad

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#30AFFF]/30 hover:text-[#30AFFF] sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Explore More
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative min-h-[260px] p-3 sm:min-h-[340px] sm:p-4 md:min-h-[390px] lg:min-h-[480px] lg:p-5">

              {/* Image Card */}
              <div className="relative h-full min-h-[245px] overflow-hidden rounded-xl sm:min-h-[320px] sm:rounded-2xl lg:min-h-full">

                <img
                  src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1400&q=80"
                  alt="Sydney Australia international career destination"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/5 to-transparent" />

                {/* Top Floating Label */}
                <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-md">
                    <Sparkles
                      size={13}
                      className="text-[#A0E9FF]"
                    />

                    <span className="text-[9px] font-bold text-white sm:text-xs">
                      EXPLORE THE WORLD
                    </span>
                  </div>
                </div>

                {/* Bottom Destination Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto">
                  <div className="w-full rounded-xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:w-[275px] sm:rounded-2xl sm:p-4">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] sm:h-11 sm:w-11">
                        <Plane size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Featured Destination
                        </p>

                        <h3 className="mt-0.5 text-xs font-black text-slate-900 sm:text-sm">
                          Sydney, Australia
                        </h3>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                      <BriefcaseBusiness
                        size={13}
                        className="shrink-0 text-[#30AFFF]"
                      />

                      <span className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                        Growing career opportunities
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Floating Stats */}
              <div className="absolute right-[2.30rem] top-1/2 hidden -translate-y-1/2 translate-x-1/4 lg:block">
                <div className="rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Global Reach
                  </p>

                  <p className="mt-0.5 text-lg font-black text-[#30AFFF]">
                    50+
                  </p>

                  <p className="text-[10px] font-semibold text-slate-500">
                    Countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative z-10 mx-auto -mt-5 grid max-w-4xl grid-cols-2 gap-2 px-3 sm:-mt-7 sm:grid-cols-4 sm:gap-3 sm:px-5">
          {[
            ["50+", "Countries"],
            ["10K+", "Opportunities"],
            ["500+", "Companies"],
            ["24/7", "Career Support"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-3 text-center shadow-[0_8px_25px_rgba(15,23,42,0.08)] sm:rounded-2xl sm:px-4 sm:py-4"
            >
              <p className="text-lg font-bold text-[#30AFFF] sm:text-xl">
                {value}
              </p>

              <p className="mt-0.5 text-[9px] font-semibold text-slate-500 sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalJourneyBanner;

