
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Plane,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const CareerJourneyBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-slate-50 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4">
      <div className="mx-auto w-full max-w-[76rem]">

        {/* MAIN BANNER */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md sm:rounded-2xl">

          {/* Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#A0E9FF]/60 blur-3xl" />
          <div className="absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-[#30AFFF]/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

            {/* =================================================
                LEFT IMAGE
            ================================================= */}
            <div className="relative min-h-[190px] overflow-hidden sm:min-h-[240px] md:min-h-[260px] lg:min-h-[300px]">

              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85"
                alt="Professionals building global careers"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Top Label */}
              <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[8px] font-bold text-white backdrop-blur-md sm:px-2.5 sm:py-1.5 sm:text-[9px]">
                  <Globe2 size={11} />
                  Global Career Network
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">

                  {/* Card 1 */}
                  <div className="rounded-lg border border-white/20 bg-white/95 p-2 shadow-md backdrop-blur-md sm:rounded-xl sm:p-2.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#A0E9FF]/30 text-[#159FEF] sm:h-8 sm:w-8 sm:rounded-lg">
                        <BriefcaseBusiness size={13} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 sm:text-sm">
                          10K+
                        </p>

                        <p className="text-[7px] font-medium text-slate-500 sm:text-[8px]">
                          Global Jobs
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-lg border border-white/20 bg-white/95 p-2 shadow-md backdrop-blur-md sm:rounded-xl sm:p-2.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#A0E9FF]/30 text-[#159FEF] sm:h-8 sm:w-8 sm:rounded-lg">
                        <TrendingUp size={13} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 sm:text-sm">
                          500+
                        </p>

                        <p className="text-[7px] font-medium text-slate-500 sm:text-[8px]">
                          Employers
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}
            <div className="flex flex-col justify-center p-4 sm:p-5 md:p-6 lg:p-7">

              {/* Small Heading */}
              <div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-[#159FEF] sm:text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30AFFF]" />
                Your Next Chapter Starts Here
              </div>

              {/* Heading */}
              <h2 className="max-w-lg text-xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-3xl lg:text-3xl">
                Turn Your Skills Into
                <span className="block">
                  A Global Career
                </span>
              </h2>

              {/* Description */}
              <p className="mt-2 max-w-lg text-[10px] leading-5 text-slate-500 sm:mt-2.5 sm:text-xs sm:leading-5 md:text-sm">
                Find the right international opportunity, connect with
                trusted employers and take your professional journey to
                the next level.
              </p>

              {/* =================================================
                  JOURNEY STEPS
              ================================================= */}
              <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">

                {/* Step 1 */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/30 text-[#159FEF] sm:h-8 sm:w-8">
                    <BriefcaseBusiness size={13} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[10px] font-bold text-slate-800 sm:text-[11px]">
                      Discover Opportunities
                    </h3>

                    <p className="mt-0.5 text-[8px] text-slate-500 sm:text-[9px]">
                      Explore jobs matching your skills.
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-3.5 h-1.5 border-l border-dashed border-[#A0E9FF]" />

                {/* Step 2 */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/30 text-[#159FEF] sm:h-8 sm:w-8">
                    <CheckCircle2 size={13} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[10px] font-bold text-slate-800 sm:text-[11px]">
                      Apply With Confidence
                    </h3>

                    <p className="mt-0.5 text-[8px] text-slate-500 sm:text-[9px]">
                      Connect with verified global employers.
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-3.5 h-1.5 border-l border-dashed border-[#A0E9FF]" />

                {/* Step 3 */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/30 text-[#159FEF] sm:h-8 sm:w-8">
                    <Plane size={13} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[10px] font-bold text-slate-800 sm:text-[11px]">
                      Start Your Global Journey
                    </h3>

                    <p className="mt-0.5 text-[8px] text-slate-500 sm:text-[9px]">
                      Move closer to your international career.
                    </p>
                  </div>
                </div>

              </div>

              {/* =================================================
                  LOCATIONS
              ================================================= */}
              <div className="mt-3 flex flex-wrap gap-1 sm:mt-3.5 sm:gap-1.5">

                <span className="inline-flex items-center gap-1 rounded-full bg-[#A0E9FF]/25 px-2 py-1 text-[8px] font-semibold text-[#159FEF] sm:text-[9px]">
                  <MapPin size={10} />
                  Australia
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#A0E9FF]/25 px-2 py-1 text-[8px] font-semibold text-[#159FEF] sm:text-[9px]">
                  <MapPin size={10} />
                  USA
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#A0E9FF]/25 px-2 py-1 text-[8px] font-semibold text-[#159FEF] sm:text-[9px]">
                  <MapPin size={10} />
                  Japan
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#A0E9FF]/25 px-2 py-1 text-[8px] font-semibold text-[#159FEF] sm:text-[9px]">
                  <Globe2 size={10} />
                  Europe
                </span>

              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}
              <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:flex-row sm:gap-2">

                {/* Explore Opportunities */}
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3 py-2 text-[9px] font-bold text-white shadow-sm shadow-[#30AFFF]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] sm:w-auto sm:px-4 sm:py-2 sm:text-[10px]"
                >
                  Explore Opportunities
                  <ArrowRight size={12} />
                </button>

                {/* Get Started */}
                <button
                  type="button"
                  onClick={() => navigate("/subscription")}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-700 transition duration-300 hover:border-[#A0E9FF] hover:bg-[#A0E9FF]/20 hover:text-[#159FEF] sm:w-auto sm:px-4 sm:py-2 sm:text-[10px]"
                >
                  Get Started
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourneyBanner;

