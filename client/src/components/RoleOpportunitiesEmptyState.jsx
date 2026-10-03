// src/components/RoleOpportunitiesEmptyState.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Sparkles } from "lucide-react";

const RoleOpportunitiesEmptyState = ({ roleTitle = "this role" }) => {
  return (
    <div className="col-span-full my-4 flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60 p-8 sm:p-12 text-center shadow-xs">
      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#30AFFF]/10 text-[#30AFFF] shadow-inner">
        <Briefcase size={30} className="relative z-10" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30AFFF] opacity-40"></span>
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#30AFFF] text-[9px] text-white">
            <Sparkles size={10} />
          </span>
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
        No Openings Currently Available
      </h3>

      <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed">
        There are currently no active opportunities listed for{" "}
        <span className="font-semibold text-slate-700">{roleTitle}</span>. New
        positions from verified employers are published regularly.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 rounded-xl bg-[#30AFFF] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#159FEF] transition-all hover:gap-2.5 active:scale-95"
        >
          <span>Explore All Jobs</span>
          <ArrowRight size={15} />
        </Link>
        <button
          type="button"
          onClick={() => {
            const el =
              document.getElementById("apply-role") ||
              document.getElementById("application") ||
              document.getElementById("apply");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer"
        >
          Submit Open Application
        </button>
      </div>
    </div>
  );
};

export default RoleOpportunitiesEmptyState;
