import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Mail, ArrowRight, Globe } from "lucide-react";

const STORAGE_KEY = "careernova_welcome_popup_seen";
const LOGO_URL = "https://i.ibb.co/R4BKkFCW/careernova.png";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const hasSeenPopup = localStorage.getItem(STORAGE_KEY);
      if (!hasSeenPopup) {
        // Small delay to allow the initial page paint and background video stream to initialize
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 400);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access handling (e.g. strict privacy modes)
    }
  }, []);

  // Prevent Escape key from dismissing the modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen]);

  // Lock background page scrolling while the popup is open
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Prevent touch gestures and wheel from scrolling underlying background
    const preventBackgroundScroll = (e) => {
      const modalDialog = e.target.closest('[role="dialog"]');
      if (!modalDialog) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (route) => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage error
    }
    setIsOpen(false);
    navigate(route);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/35 backdrop-blur-[2px] animate-in fade-in duration-200 select-none overflow-y-auto"
      onClick={(e) => {
        // Prevent outside click from closing modal
        e.stopPropagation();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] sm:max-w-[540px] bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] p-5 sm:p-7 text-slate-900 my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <img
              src={LOGO_URL}
              alt="CareerNova International"
              className="h-9 sm:h-11 w-auto max-w-[170px] object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-semibold tracking-wide mb-2">
            <span>Global Career Advisory</span>
          </div>

          <h2
            id="welcome-modal-title"
            className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
          >
            Welcome to CareerNova
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Connecting professionals with verified global employers and international consulting services.
          </p>
        </div>

        {/* Primary Action Buttons / Cards */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {/* Action 1: Find Jobs */}
          <button
            type="button"
            onClick={() => handleSelectOption("/jobs")}
            className="group relative flex sm:flex-col justify-between items-center sm:items-start p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center sm:items-start gap-3 sm:gap-2.5 w-full">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Find Jobs
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-snug">
                  Explore verified global roles & overseas openings.
                </p>
              </div>
            </div>

            <div className="mt-0 sm:mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700 shrink-0 ml-2 sm:ml-0">
              <span className="hidden sm:inline">Browse Openings</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 2: Contact Us */}
          <button
            type="button"
            onClick={() => handleSelectOption("/contact")}
            className="group relative flex sm:flex-col justify-between items-center sm:items-start p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center sm:items-start gap-3 sm:gap-2.5 w-full">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm shadow-slate-900/20 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  Contact Us
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-snug">
                  Speak with our career advisors or enterprise team.
                </p>
              </div>
            </div>

            <div className="mt-0 sm:mt-3 flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-slate-900 shrink-0 ml-2 sm:ml-0">
              <span className="hidden sm:inline">Get in Touch</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Supporting Trust Information */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
            International Placement & Recruitment Services
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
