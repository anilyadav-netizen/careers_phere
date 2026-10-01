import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleApplyModal from "../components/RoleApplyModal";
import { fetchPublicOpportunities } from "../redux/slicer/roleOpportunitySlice";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Code2,
  Database,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  MessageSquare,
  Server,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/* ---------------- REDUCER ---------------- */

const initialState = {
  openFaq: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAQ":
      return {
        ...state,
        openFaq: state.openFaq === action.index ? -1 : action.index,
      };
    case "RESET_FAQ":
      return { ...state, openFaq: -1 };
    default:
      return state;
  }
};

const FullStackDeveloper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openFaq } = state;
  const reduxDispatch = useDispatch();
  const { publicList = [], opportunities = [] } = useSelector(
    (state) => state.roleOpportunities || {}
  );
  const activeOpportunities =
    opportunities.length > 0 ? opportunities : publicList;

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    reduxDispatch(
      fetchPublicOpportunities({ roleCategory: "Full Stack Developer" })
    );
  }, [reduxDispatch]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const refreshAOS = () => AOS.refreshHard();
    refreshAOS();

    const timer = setTimeout(refreshAOS, 500);
    window.addEventListener("load", refreshAOS);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refreshAOS);
    };
  }, []);

  const responsibilities = [
    "Build scalable and production-ready web applications.",
    "Create clean, reusable and maintainable frontend architecture.",
    "Develop secure REST APIs and backend services.",
    "Work with databases, authentication and third-party integrations.",
    "Collaborate with designers, product managers and developers.",
    "Debug, optimize and continuously improve application performance.",
  ];

  const technologies = [
    { name: "React.js", icon: Code2, desc: "Modern frontend development" },
    { name: "Node.js", icon: Server, desc: "Scalable backend services" },
    { name: "MongoDB", icon: Database, desc: "Flexible data architecture" },
    { name: "REST APIs", icon: Globe2, desc: "Reliable integrations" },
    { name: "JavaScript", icon: Terminal, desc: "Core application logic" },
    { name: "Git & GitHub", icon: Layers3, desc: "Version control workflow" },
  ];

  const opportunityCountries = [
    {
      name: "United States",
      flag: "https://flagcdn.com/w80/us.png",
      salary: "$70K – $150K+",
      modes: ["Remote", "Hybrid", "On-site"],
    },
    {
      name: "Canada",
      flag: "https://flagcdn.com/w80/ca.png",
      salary: "$55K – $120K",
      modes: ["Remote", "Hybrid"],
    },
    {
      name: "United Kingdom",
      flag: "https://flagcdn.com/w80/gb.png",
      salary: "$55K – $115K",
      modes: ["Remote", "Hybrid", "On-site"],
    },
    {
      name: "Australia",
      flag: "https://flagcdn.com/w80/au.png",
      salary: "$60K – $125K",
      modes: ["Remote", "Hybrid", "On-site"],
    },
    {
      name: "Germany",
      flag: "https://flagcdn.com/w80/de.png",
      salary: "$55K – $115K",
      modes: ["Hybrid", "On-site", "Relocation"],
    },
    {
      name: "Netherlands",
      flag: "https://flagcdn.com/w80/nl.png",
      salary: "$55K – $110K",
      modes: ["Remote", "Hybrid", "On-site"],
    },
    {
      name: "Singapore",
      flag: "https://flagcdn.com/w80/sg.png",
      salary: "$50K – $110K",
      modes: ["Hybrid", "On-site"],
    },
    {
      name: "UAE",
      flag: "https://flagcdn.com/w80/ae.png",
      salary: "$45K – $100K",
      modes: ["Hybrid", "On-site", "Relocation"],
    },
  ];

  const requirements = [
    "Strong understanding of JavaScript and modern ES6+ features",
    "Hands-on experience with React.js",
    "Experience building backend APIs using Node.js / Express",
    "Good understanding of MongoDB or another database",
    "Understanding of authentication and API security",
    "Ability to write clean, reusable and maintainable code",
  ];

  const benefits = [
    "Work on real-world products used by actual customers",
    "Flexible and developer-friendly work environment",
    "Opportunity to work across the complete technology stack",
    "Learn modern tools, frameworks and engineering practices",
    "Collaborative team with strong technical ownership",
    "Competitive compensation and career growth",
  ];

  const process = [
    {
      number: "01",
      title: "Application",
      desc: "Submit your profile, experience and portfolio.",
    },
    {
      number: "02",
      title: "Profile Review",
      desc: "Our team reviews your experience and technical background.",
    },
    {
      number: "03",
      title: "Technical Round",
      desc: "Discuss your technical skills and real-world projects.",
    },
    {
      number: "04",
      title: "Final Interview",
      desc: "Meet the team and discuss your role and expectations.",
    },
  ];

  const faqs = [
    {
      question: "Can I apply if I don't know every technology listed?",
      answer:
        "Absolutely. The listed technologies describe our preferred stack, but strong fundamentals, problem-solving ability and willingness to learn are equally important.",
    },
    {
      question: "Is prior professional experience required?",
      answer:
        "Professional experience is preferred, but strong candidates with impressive personal, freelance, internship or open-source projects are encouraged to apply.",
    },
    {
      question: "Can I apply from outside the current location?",
      answer:
        "Yes. We welcome applications from developers across different locations depending on the role and hiring requirements.",
    },
    {
      question: "What should I include in my portfolio?",
      answer:
        "Share projects that demonstrate your ability to solve real problems. GitHub repositories, live applications and meaningful technical contributions are especially valuable.",
    },
  ];

  const scrollToSection = (id) => {
    if (id === "apply") {
      setIsApplyModalOpen(true);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const openGlobalApplication = (opp = null) => {
    setSelectedOpportunity(opp && opp._id ? opp : null);
    setIsApplyModalOpen(true);
  };

  /* ---------------- MOTION VARIANTS ---------------- */

  const heroLeft = {
    hidden: { opacity: 0, x: -60, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const heroRight = {
    hidden: { opacity: 0, x: 60, y: 25, scale: 0.92, rotate: 1.5 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const imageLeft = {
    hidden: { opacity: 0, x: -50, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageRight = {
    hidden: { opacity: 0, x: 50, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-white">
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/8 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#30AFFF]/5 blur-[120px]" />

        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-14 lg:pb-12 relative">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            <motion.div
              variants={heroLeft}
              initial="hidden"
              animate="visible"
              className="min-w-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 border border-[#30AFFF]/30 bg-[#30AFFF]/5 rounded-full px-3.5 py-1.5 mb-3 shadow-sm"
              >
                <Layers3 size={13} className="text-[#30AFFF]" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#159FEF]">
                  Full Stack Engineering · End-to-End Web Systems
                </span>
              </motion.div>

              <motion.h1
                className="text-[28px] md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.98] text-slate-900"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Master the complete stack from{" "}
                <motion.span
                  className="inline-block text-[#30AFFF]"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.55 }}
                >
                  Client UI to Cloud Database.
                </motion.span>
              </motion.h1>

              <motion.p
                className="mt-3.5 max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65 }}
              >
                We're hiring Full Stack Developers who bridge frontend craft and
                backend scale — building complete end-to-end digital products from
                interactive React interfaces to scalable Node.js APIs and robust databases.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <motion.button
                  onClick={() => scrollToSection("apply")}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Apply for this role
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition"
                  />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("role")}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 shadow-sm transition"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore role
                </motion.button>
              </motion.div>

              <div className="grid grid-cols-3 gap-3 mt-7 max-w-2xl">
                {[
                  ["React & Next", "Client Layer"],
                  ["Node & APIs", "Service Layer"],
                  ["Postgres & Mongo", "Data Layer"],
                ].map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="border border-[#A0E9FF]/40 rounded-2xl p-3 bg-white shadow-xs"
                  >
                    <div className="text-base md:text-lg font-black tracking-tight text-[#30AFFF]">
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 font-bold">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FULL STACK ROLE DEFINING VISUAL MOCKUP */}
            <motion.div
              className="relative min-w-0"
              variants={heroRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-[#A0E9FF]/60 bg-slate-950 shadow-[0_20px_50px_rgba(48,175,255,0.18)] p-4 sm:p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                    <span className="ml-2 text-xs font-mono text-slate-300">
                      FullStack Architecture Pipeline
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#30AFFF]/15 border border-[#30AFFF]/30 text-[10px] font-bold text-[#30AFFF]">
                    End-to-End
                  </span>
                </div>

                {/* 3 Tier Full Stack Architecture Cards */}
                <div className="mt-4 space-y-3">
                  {/* Tier 1: Frontend Client */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 transition hover:border-[#30AFFF]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/20 flex items-center justify-center text-[#30AFFF]">
                          <Code2 size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            Client Layer (Frontend)
                            <span className="px-1.5 py-0.2 rounded bg-[#30AFFF]/20 text-[#30AFFF] text-[9px]">React 19</span>
                          </div>
                          <div className="text-[10px] text-slate-400">Next.js · Tailwind CSS · State Management</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Fast UI (60fps)</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex items-center justify-center -my-1 text-slate-500 text-xs gap-2">
                    <span className="h-3 w-px bg-slate-700" />
                    <span className="text-[10px] font-mono text-[#30AFFF] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                      REST & GraphQL APIs (JSON)
                    </span>
                    <span className="h-3 w-px bg-slate-700" />
                  </div>

                  {/* Tier 2: Backend Logic & APIs */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 transition hover:border-[#30AFFF]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Server size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            API & Service Layer (Backend)
                            <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px]">Node.js</span>
                          </div>
                          <div className="text-[10px] text-slate-400">Express · Auth JWT · Business Services</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">200 OK (12ms)</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex items-center justify-center -my-1 text-slate-500 text-xs gap-2">
                    <span className="h-3 w-px bg-slate-700" />
                    <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                      Prisma ORM & Connection Pool
                    </span>
                    <span className="h-3 w-px bg-slate-700" />
                  </div>

                  {/* Tier 3: Database & Cloud */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 transition hover:border-[#30AFFF]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Database size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            Data & Storage Layer
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px]">PostgreSQL</span>
                          </div>
                          <div className="text-[10px] text-slate-400">MongoDB · Redis Cluster · AWS S3 Cloud</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#30AFFF] font-bold">ACID Secure</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/15 flex items-center justify-center text-[#30AFFF]">
                  <Layers3 size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">FULL ARCHITECTURE</div>
                  <div className="text-xs font-bold text-slate-900">React ⟷ Node ⟷ Postgres</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">SCOPE</div>
                  <div className="text-xs font-bold text-slate-900">Complete Product Ownership</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/15 flex items-center justify-center text-[#30AFFF]">
                  <Zap size={16} />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6"
          >
            {[
              ["10+", "Years combined experience"],
              ["50+", "Products shipped"],
              ["15+", "Countries reached"],
              ["100%", "Ownership mindset"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                variants={cardVariants}
                className="rounded-2xl border border-slate-100 p-4 shadow-sm bg-white"
                whileHover={{ y: -5 }}
              >
                <div className="text-xl sm:text-2xl font-black tracking-tight text-[#30AFFF]">
                  {value}
                </div>

                <div className="text-xs sm:text-sm text-slate-500 mt-1">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        id="opportunities"
        className="relative overflow-hidden border-y border-slate-100 bg-slate-50/60"
      >
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-2 lg:py-7">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center mb-8"
          >
            <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
              Global opportunities
            </p>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-3 text-slate-900">
              Find your next opportunity.
            </h2>

            <p className="text-sm text-slate-500 leading-6 mt-3 max-w-xl mx-auto">
              Explore Full Stack Developer opportunities across international
              markets, with flexible work models and competitive compensation.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm mb-4"
          >
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5 items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30AFFF]/5 border border-[#30AFFF]/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#159FEF]">
                    <Code2 size={12} />
                    Full Stack Developer
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30AFFF]/5 border border-[#30AFFF]/30 px-2.5 py-1 text-[11px] font-bold text-[#159FEF]">
                    <Zap size={12} />
                    Full Time
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-3">
                  One role. Multiple global markets.
                </h3>

                <p className="text-sm leading-6 text-slate-500 mt-2 max-w-2xl">
                  Choose opportunities based on location, working style and
                  career goals. Availability can vary by employer and position.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {["Remote", "Hybrid", "On-site", "Relocation"].map((mode) => (
                    <span
                      key={mode}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      <MapPin size={12} className="text-[#30AFFF]" />
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-100 lg:pl-6 min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400 font-bold">
                  Indicative compensation
                </p>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                  $45K – $150K+
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  USD equivalent · annual range
                </p>

                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <Globe2 size={15} className="text-[#30AFFF]" />
                  International opportunities
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {activeOpportunities.length > 0 ? (
              activeOpportunities.map((opp, idx) => {
                const displaySalary = opp.salary || "Competitive";

                return (
                  <motion.div
                    key={opp._id || idx}
                    variants={cardVariants}
                    className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* Company Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                          {opp.companyLogo ? (
                            <img
                              src={opp.companyLogo}
                              alt={opp.companyName}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <Building2 size={18} className="text-[#30AFFF]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="text-sm font-bold text-slate-800 truncate"
                            title={opp.companyName}
                          >
                            {opp.companyName}
                          </h3>

                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                            {opp.roleTitle || opp.roleCategory || "Full Stack Developer"}
                          </p>
                        </div>
                      </div>

                      {opp.salaryCurrency && (
                        <span className="text-[9px] font-bold tracking-wider rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 text-[#159FEF] px-2 py-0.5 shrink-0">
                          {opp.salaryCurrency}
                        </span>
                      )}
                    </div>

                    {/* Countries with Flags */}
                    <div className="mt-3.5">
                      <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] text-slate-400 font-bold mb-1.5">
                        <Globe2 size={11} className="text-[#30AFFF]" />
                        <span>Hiring Locations</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {opp.countries && opp.countries.length > 0 ? (
                          opp.countries.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="inline-flex items-center gap-1 rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                            >
                              {c.flag && (
                                c.flag.startsWith("http") ? (
                                  <img
                                    src={c.flag}
                                    alt={c.countryName || "flag"}
                                    className="w-3.5 h-2.5 object-cover rounded-2xs"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <span>{c.flag}</span>
                                )
                              )}
                              <span>{c.countryName || "Target Market"}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-500 font-medium">
                            Worldwide / Remote
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Typical range */}
                    <div className="border-t border-slate-100 mt-3 pt-3">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                        Typical range
                      </p>

                      <p className="text-lg font-black text-slate-900 mt-0.5">
                        {displaySalary}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {opp.salary ? "Annual range · employer specific" : "Disclosed upon matching"}
                      </p>
                    </div>

                    {/* Skills */}
                    {opp.skills && opp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {opp.skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded-md border border-[#30AFFF]/20 bg-[#30AFFF]/[0.05] px-1.5 py-0.5 text-[9px] font-semibold text-[#159FEF]"
                          >
                            {skill}
                          </span>
                        ))}
                        {opp.skills.length > 3 && (
                          <span className="rounded-md bg-slate-50 border border-slate-200 px-1 py-0.5 text-[8px] text-slate-500 font-bold">
                            +{opp.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Work Modes */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {(opp.workModes || ["Remote", "Hybrid"]).map((mode) => (
                        <span
                          key={mode}
                          className="rounded-full bg-slate-50 border border-slate-200 px-2 py-1 text-[10px] text-slate-600"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>

                    {/* APPLY BUTTON - GLOBAL OPPORTUNITY */}
                    <div className="flex justify-end mt-3 pt-3 border-t border-slate-100 mt-auto">
                      <button
                        type="button"
                        onClick={() => openGlobalApplication(opp)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3.5 py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#159FEF] transition cursor-pointer"
                      >
                        Apply
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              opportunityCountries.map((country) => (
                <motion.div
                  key={country.name}
                  variants={cardVariants}
                  className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="w-7 h-5 object-cover rounded-sm"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          {country.name}
                        </h3>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Full Stack roles
                        </p>
                      </div>
                    </div>

                    <span className="w-2 h-2 rounded-full mt-2 bg-[#30AFFF]" />
                  </div>

                  <div className="border-t border-slate-100 mt-4 pt-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                      Typical range
                    </p>

                    <p className="text-lg font-black text-slate-900 mt-0.5">
                      {country.salary}
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      USD equivalent / year
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {country.modes.map((mode) => (
                      <span
                        key={mode}
                        className="rounded-full bg-slate-50 border border-slate-200 px-2 py-1 text-[10px] text-slate-600"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>

                  {/* APPLY BUTTON - GLOBAL OPPORTUNITY */}
                  <div className="flex justify-end mt-3 pt-3 border-t border-slate-100 mt-auto">
                    <button
                      type="button"
                      onClick={() => openGlobalApplication(null)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3 py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#159FEF] transition"
                    >
                      Apply
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6 px-1"
          >
            <p className="text-[11px] leading-5 text-slate-400 max-w-3xl">
              Salary ranges are indicative USD-equivalent annual ranges. Actual
              compensation, availability, work authorization and relocation
              requirements may vary by employer, location and experience.
            </p>

            <button
              onClick={() => scrollToSection("apply")}
              className="shrink-0 inline-flex items-center gap-2 text-xs font-bold text-[#30AFFF] hover:text-[#159FEF] transition"
            >
              Explore & apply
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ROLE INTRO IMAGE */}
      <section id="role" className="relative overflow-hidden border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-24 min-w-0">
              <motion.div
                variants={imageLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
                  alt="Developer code"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                <motion.div
                  className="absolute bottom-4 left-4"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-xs text-white font-medium bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    Code · Create · Ship
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="mt-5 text-center"
              >
                <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                  The role
                </p>

                <h2 className="text-2xl md:text-4xl font-black tracking-tight mt-3 text-slate-900">
                  More than just writing code.
                </h2>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Own problems, make decisions and directly influence the
                  products we build.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="min-w-0"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {responsibilities.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={cardVariants}
                    className="rounded-2xl border border-slate-100 bg-white p-5 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center text-xs font-bold mb-4">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={cardVariants}
                className="mt-3 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-5 flex items-start gap-3 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center shrink-0">
                  <Zap size={17} className="text-[#30AFFF]" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    High ownership. Real impact.
                  </h3>

                  <p className="text-xs text-slate-500 leading-5 mt-1">
                    You'll have room to suggest better solutions, improve
                    architecture and influence technical decisions.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center gap-2 mb-8"
          >
            <div>
              <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                Technology
              </p>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-3 text-slate-900">
                Tools we build with.
              </h2>
            </div>

            <p className="text-sm text-slate-500 leading-6 max-w-md">
              You don't need to master everything. Strong fundamentals matter
              more than checking every box.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {technologies.map((tech) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={tech.name}
                  variants={cardVariants}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 flex items-center gap-4 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      {tech.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">{tech.desc}</p>
                  </div>

                  <div className="ml-auto">
                    <ArrowRight
                      size={15}
                      className="text-slate-300 group-hover:text-[#30AFFF] transition"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* REQUIREMENTS + BENEFITS */}
      <section className="relative overflow-hidden bg-white border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm min-w-0"
            >
              <div className="h-[220px] sm:h-[250px] relative overflow-hidden">
                <motion.img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="text-center">
                  <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                    Requirements
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black mt-3 text-slate-900">
                    What you'll bring.
                  </h2>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="space-y-3 mt-5"
                >
                  {requirements.map((item) => (
                    <motion.div
                      key={item}
                      variants={cardVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center shrink-0">
                        <Check size={12} />
                      </div>

                      <p className="text-sm leading-6 text-slate-600">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={imageRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm min-w-0"
            >
              <div className="flex flex-col items-center text-center">
                <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                  Benefits
                </p>

                <h2 className="text-2xl md:text-3xl font-black mt-3 text-slate-900">
                  Why build with us?
                </h2>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mt-7"
              >
                {benefits.map((item) => (
                  <motion.div
                    key={item}
                    variants={cardVariants}
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-5 h-5 mt-0.5 rounded-md bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center shrink-0">
                      <Check size={12} />
                    </div>

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="mt-8 rounded-2xl border border-slate-100 bg-[#30AFFF]/[0.04] p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                      alt="Team member"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Build with ownership.
                    </p>

                    <p className="text-xs text-slate-500">
                      Grow with the team.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mb-8 text-center"
          >
            <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
              Hiring process
            </p>

            <h2 className="text-2xl md:text-4xl font-black mt-3 text-slate-900">
              Simple, transparent, human.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {process.map((item, index) => (
              <motion.div
                key={item.number}
                variants={cardVariants}
                className="relative rounded-2xl border border-slate-100 bg-white p-5 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#30AFFF]/25">
                    {item.number}
                  </span>

                  {index < process.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden lg:block text-slate-300"
                    />
                  )}
                </div>

                <h3 className="font-bold mt-5 text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM IMAGE / CTA */}
      <section className="relative overflow-hidden bg-white border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-">6
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-3xl border border-slate-100 min-h-[300px] sm:min-h-[360px] shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85"
              alt="Developers collaborating"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

            <motion.div
              className="relative max-w-2xl p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                Your next challenge
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight mt-3 text-slate-900">
                Don't just find a job.
                <br />
                <span className="text-[#30AFFF]">
                  Build your next chapter.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-6 mt-4 max-w-xl">
                Join a team where your ideas matter, your code has impact and
                there's always something new to learn.
              </p>

              <motion.button
                onClick={() => scrollToSection("apply")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Start your application
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0"
            >
              <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                FAQ
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-3 text-slate-900">
                Questions?
              </h2>

              <p className="text-sm text-slate-500 leading-6 mt-3 max-w-md">
                Everything you need to know before sending your application.
              </p>
            </motion.div>

            <motion.div
              variants={imageRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="divide-y divide-slate-100 border-y border-slate-100 min-w-0"
            >
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                  >
                    <button
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_FAQ",
                          index,
                        })
                      }
                      className="w-full flex items-center justify-between gap-5 py-5 text-left group"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover:text-[#30AFFF] transition">
                        {faq.question}
                      </span>

                      <motion.div
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-colors ${isOpen ? "text-[#30AFFF]" : "text-slate-400"
                            }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            height: 0,
                            y: -10,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            y: -10,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pr-8">
                            <p className="text-sm leading-6 text-slate-500">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="relative overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-6">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:sticky lg:top-24 min-w-0"
            >
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                  Apply now
                </p>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mt-3 text-slate-900">
                  Find your next global opportunity.
                </h2>
              </div>

              <p className="text-slate-500 leading-6 mt-4 max-w-md text-sm">
                Tell us about yourself, your experience and the kind of global
                opportunity you're looking for. We'll use your preferences to
                understand where your profile fits best.
              </p>

              <div className="mt-6 space-y-4">
                <motion.div
                  className="flex items-center gap-3 text-sm text-slate-600"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                    <Globe2 size={15} className="text-[#30AFFF]" />
                  </div>
                  Global Full Stack opportunities
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-sm text-slate-600"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                    <MapPin size={15} className="text-[#30AFFF]" />
                  </div>
                  Remote, Hybrid, On-site & Relocation
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-sm text-slate-600"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                    <MessageSquare size={15} className="text-[#30AFFF]" />
                  </div>
                  We usually respond within a few business days
                </motion.div>
              </div>

              <motion.div
                className="mt-7 rounded-3xl overflow-hidden h-[190px] border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
                whileHover={{ y: -5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={imageRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-[0_15px_45px_rgba(15,23,42,0.10)] text-center relative overflow-hidden min-w-0"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#30AFFF]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#30AFFF]/10 text-[#30AFFF] mx-auto flex items-center justify-center mb-6 shadow-inner">
                  <Layers3 size={32} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Ready to Apply as Full Stack Developer?
                </h3>

                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  Click the button below to open the application popup. Share
                  your stack expertise across frontend, backend, databases, and
                  APIs, set your target global market, and attach your resume.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#30AFFF] text-white font-bold text-sm shadow-lg shadow-[#30AFFF]/25 hover:bg-[#159FEF] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Open Application Form</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-4">
                  ⚡ Takes less than 2 minutes · PDF / DOC / DOCX resume supported
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RoleApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedOpportunity(null);
        }}
        role="Full Stack Developer"
        opportunity={selectedOpportunity}
        initialData={
          selectedOpportunity
            ? {
                preferredJobMarket:
                  selectedOpportunity.countries?.[0]?.countryName || "",
                preferredWorkMode:
                  selectedOpportunity.workModes?.[0] || "",
              }
            : {}
        }
      />

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#30AFFF] flex items-center justify-center shadow-md shadow-[#30AFFF]/30">
                <Code2 size={16} className="text-white" />
              </div>

              <span className="text-sm font-black text-slate-900">
                DEV<span className="text-[#30AFFF]">SPACE</span>
              </span>
            </div>

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} DevSpace. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#30AFFF] hover:border-[#30AFFF] transition"
              >
                <FaGithub size={14} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#30AFFF] hover:border-[#30AFFF] transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="mailto:careers@example.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#30AFFF] hover:border-[#30AFFF] transition"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FullStackDeveloper;