import React, { useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Mail,
  Sparkles,
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-slate-50 px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            NEWSLETTER CARD
        ===================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl shadow-blue-900/10">

          {/* =================================================
              DECORATIVE BACKGROUND
          ================================================= */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />

            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl sm:h-96 sm:w-96" />

            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-3xl" />

            {/* Small dots */}
            <div className="absolute left-[12%] top-[25%] h-2 w-2 rounded-full bg-white/30" />
            <div className="absolute right-[18%] top-[20%] h-3 w-3 rounded-full bg-white/20" />
            <div className="absolute bottom-[22%] left-[20%] h-2 w-2 rounded-full bg-white/20" />
            <div className="absolute bottom-[18%] right-[12%] h-2 w-2 rounded-full bg-white/30" />

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}
          <div className="relative px-5 py-6 sm:px-10 sm:py-6 lg:px-16 lg:py-6">

            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                <Sparkles size={14} />
                Stay Ahead of Your Career
              </div>

              {/* Icon */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md sm:h-16 sm:w-16">
                <Bell size={27} />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Get Career Updates
                <span className="block text-blue-100">
                  Straight to Your Inbox
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100/80 sm:text-base sm:leading-7">
                Subscribe to receive the latest job opportunities,
                career tips, industry insights and professional growth
                resources directly in your inbox.
              </p>

              {/* =================================================
                  FORM
              ================================================= */}
              {!subscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-7 max-w-2xl"
                >
                  <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-xl sm:flex-row">

                    {/* Email */}
                    <div className="relative flex min-w-0 flex-1 items-center">

                      <Mail
                        size={19}
                        className="absolute left-4 text-gray-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="h-12 w-full rounded-xl border border-white/10 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10 sm:h-13"
                      />

                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:h-13 sm:px-7"
                    >
                      Subscribe

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                  </div>
                </form>
              ) : (
                /* Success Message */
                <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur-md">

                  <CheckCircle2
                    size={22}
                    className="shrink-0 text-green-300"
                  />

                  <p className="text-sm font-medium sm:text-base">
                    You're subscribed! We'll keep you updated.
                  </p>

                </div>
              )}

              {/* Privacy Text */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-100/60">
                <CheckCircle2 size={13} />
                No spam. Unsubscribe anytime.
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;