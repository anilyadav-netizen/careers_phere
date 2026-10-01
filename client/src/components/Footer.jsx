import {
  ArrowRight,
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    // { name: "Subscription", path: "/subscription" },
    // { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const jobSeekerLinks = [
    { name: "Browse Jobs", path: "/jobs" },
    { name: "Create Profile", path: "/profile" },
    { name: "My Applications", path: "/applications" },
    { name: "Career Resources", path: "/carrier" },
    { name: "Job Alerts", path: "/jobs" },
    { name: "Career Advice", path: "/about" },
    { name: "Skill Development", path: "/skills" },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid grid-cols-1 gap-10 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
          {/* BRAND */}

          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#30AFFF] shadow-lg shadow-[#30AFFF]/20">
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  CareerNova
                </h2>

                <p className="text-xs text-slate-400">
                  Your Career. Your Future.
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Discover better career opportunities, connect with professionals
              and build a successful future with CareerNova.
            </p>

            {/* Social / Community Icons */}

            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/about"
                aria-label="Community"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
              >
                <Users size={17} />
              </Link>

              <Link
                to="/"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
              >
                <Globe size={17} />
              </Link>

              <Link
                to="/contact"
                aria-label="Messages"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
              >
                <MessageCircle size={17} />
              </Link>

              <a
                href="mailto:hello@CareerNova.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-[#30AFFF]"
                  >
                    <ArrowRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* JOB SEEKERS */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              For Job Seekers
            </h3>

            <ul className="mt-5 space-y-3">
              {jobSeekerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-[#30AFFF]"
                  >
                    <ArrowRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4">
              {/* Email */}

              <a
                href="mailto:hello@CareerNova.com"
                className="group flex items-start gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                  <Mail size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email</p>

                  <p className="mt-0.5 break-all text-sm text-slate-300 transition-colors group-hover:text-[#30AFFF]">
                    hello@CareerNova.com
                  </p>
                </div>
              </a>

              {/* Phone */}

              <a
                href="tel:+919876543210"
                className="group flex items-start gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Phone</p>

                  <p className="mt-0.5 text-sm text-slate-300 transition-colors group-hover:text-[#30AFFF]">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Location */}

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#30AFFF]/10 text-[#30AFFF]">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Location</p>

                  <p className="mt-0.5 text-sm leading-5 text-slate-300">
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            NEWSLETTER
        ===================================================== */}

        <div className="border-y border-slate-800 py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Stay Updated With Career Opportunities
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Get the latest jobs and career updates directly in your inbox.
              </p>
            </div>

            {/* Newsletter */}

            <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#30AFFF] focus:ring-2 focus:ring-[#30AFFF]/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} CareerNova. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
            <Link
              to="/privacy-policy"
              className="text-xs text-slate-500 transition-colors hover:text-[#30AFFF]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-[#30AFFF]"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/cookies"
              className="text-xs text-slate-500 transition-colors hover:text-[#30AFFF]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
