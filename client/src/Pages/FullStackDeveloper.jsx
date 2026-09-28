import React, { useEffect, useReducer } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Database,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  MessageSquare,
  Send,
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
    { name: "United States", flag: "https://flagcdn.com/w80/us.png", salary: "$70K – $150K+", modes: ["Remote", "Hybrid", "On-site"] },
    { name: "Canada", flag: "https://flagcdn.com/w80/ca.png", salary: "$55K – $120K", modes: ["Remote", "Hybrid"] },
    { name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png", salary: "$55K – $115K", modes: ["Remote", "Hybrid", "On-site"] },
    { name: "Australia", flag: "https://flagcdn.com/w80/au.png", salary: "$60K – $125K", modes: ["Remote", "Hybrid", "On-site"] },
    { name: "Germany", flag: "https://flagcdn.com/w80/de.png", salary: "$55K – $115K", modes: ["Hybrid", "On-site", "Relocation"] },
    { name: "Netherlands", flag: "https://flagcdn.com/w80/nl.png", salary: "$55K – $110K", modes: ["Remote", "Hybrid", "On-site"] },
    { name: "Singapore", flag: "https://flagcdn.com/w80/sg.png", salary: "$50K – $110K", modes: ["Hybrid", "On-site"] },
    { name: "UAE", flag: "https://flagcdn.com/w80/ae.png", salary: "$45K – $100K", modes: ["Hybrid", "On-site", "Relocation"] },
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
    { number: "01", title: "Application", desc: "Submit your profile, experience and portfolio." },
    { number: "02", title: "Profile Review", desc: "Our team reviews your experience and technical background." },
    { number: "03", title: "Technical Round", desc: "Discuss your technical skills and real-world projects." },
    { number: "04", title: "Final Interview", desc: "Meet the team and discuss your role and expectations." },
  ];

  const faqs = [
    {
      question: "Can I apply if I don't know every technology listed?",
      answer: "Absolutely. The listed technologies describe our preferred stack, but strong fundamentals, problem-solving ability and willingness to learn are equally important.",
    },
    {
      question: "Is prior professional experience required?",
      answer: "Professional experience is preferred, but strong candidates with impressive personal, freelance, internship or open-source projects are encouraged to apply.",
    },
    {
      question: "Can I apply from outside the current location?",
      answer: "Yes. We welcome applications from developers across different locations depending on the role and hiring requirements.",
    },
    {
      question: "What should I include in my portfolio?",
      answer: "Share projects that demonstrate your ability to solve real problems. GitHub repositories, live applications and meaningful technical contributions are especially valuable.",
    },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const heroLeft = {
    hidden: { opacity: 0, x: -100, y: 30, scale: 0.92 },
    visible: {
      opacity: 1, x: 0, y: 0, scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const heroRight = {
    hidden: { opacity: 0, x: 100, y: 30, scale: 0.86, rotate: 3 },
    visible: {
      opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
      transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.86 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };

  const imageLeft = {
    hidden: { opacity: 0, x: -100, scale: 0.9 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageRight = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-white">
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/8 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#30AFFF]/5 blur-[120px]" />

        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-10 lg:pt-14 lg:pb-12 relative">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            <motion.div variants={heroLeft} initial="hidden" animate="visible">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 border border-[#30AFFF]/30 bg-[#30AFFF]/5 rounded-full px-3 py-1.5 mb-3 shadow-sm"
              >
                <Sparkles size={13} className="text-[#159FEF]" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#159FEF]">
                  We're hiring · Full Stack Developer
                </span>
              </motion.div>

              <motion.h1
                className="text-[28px] md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95] text-slate-900"
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Build things{" "}
                <motion.span
                  className="inline-block text-[#30AFFF]"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.55 }}
                >
                  people love.
                </motion.span>
              </motion.h1>

              <motion.p
                className="mt-3 max-w-2xl text-sm sm:text-base text-slate-500 leading-6"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65 }}
              >
                We're looking for a Full Stack Developer who can turn ideas into
                fast, scalable and beautiful digital products from frontend to backend.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, y: 35 }}
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
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
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

              <motion.div
                className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-slate-500"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#30AFFF]" />
                  Remote Friendly
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-[#30AFFF]" />
                  Product Engineering
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-[#30AFFF]" />
                  Full Time
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={heroRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
              >
                <div className="h-[250px] sm:h-[310px] lg:h-[350px] relative overflow-hidden">
                  <motion.img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
                    alt="Developer working"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>

                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1 }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                      <Code2 size={14} className="text-[#30AFFF]" />
                      Building the future, one commit at a time.
                    </div>
                  </motion.div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-mono">developer.js</p>
                      <p className="text-sm text-slate-700 font-mono mt-1">
                        <span className="text-[#30AFFF]">developer</span>
                        <span className="text-slate-400">.</span>
                        <span className="text-[#159FEF]">apply</span>
                        <span className="text-slate-800">()</span>
                        <span className="text-slate-400">;</span>
                      </p>
                    </div>

                    <div className="flex -space-x-2">
                      {["JS", "RE", "NO"].map((item, index) => (
                        <motion.div
                          key={item}
                          className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${
                            index === 0 ? "bg-[#30AFFF]" : index === 1 ? "bg-[#159FEF]" : "bg-slate-400"
                          }`}
                          initial={{ scale: 0, x: 20 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
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
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        id="opportunities"
        className="border-y border-slate-100 bg-slate-50/60"
      >
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
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
              Explore Full Stack Developer opportunities across international markets,
              with flexible work models and competitive compensation.
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
              <div>
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
                  Choose opportunities based on location, working style and career goals.
                  Availability can vary by employer and position.
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

              <div className="lg:border-l lg:border-slate-100 lg:pl-6">
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
            {opportunityCountries.map((country) => (
              <motion.div
                key={country.name}
                variants={cardVariants}
                className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all"
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
                      <h3 className="text-sm font-bold text-slate-800">{country.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Full Stack roles</p>
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
              </motion.div>
            ))}
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
      <section id="role" className="border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-24">
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
                  Own problems, make decisions and directly influence the products we build.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
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
                    You'll have room to suggest better solutions, improve architecture
                    and influence technical decisions.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
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
              You don't need to master everything. Strong fundamentals matter more
              than checking every box.
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
                    <h3 className="font-bold text-slate-800 text-sm">{tech.name}</h3>
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
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm"
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
              className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm"
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
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
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
                    <p className="text-xs text-slate-500">Grow with the team.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
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
                    <ArrowRight size={16} className="hidden lg:block text-slate-300" />
                  )}
                </div>

                <h3 className="font-bold mt-5 text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-6 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM IMAGE / CTA */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-slate-100 min-h-[300px] sm:min-h-[360px] shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85"
              alt="Developers collaborating"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

            <motion.div
              className="relative max-w-2xl p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, x: -70 }}
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
                <span className="text-[#30AFFF]">Build your next chapter.</span>
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
      <section id="faq" className="bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
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
              className="divide-y divide-slate-100 border-y border-slate-100"
            >
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    <button
                      onClick={() =>
                        dispatch({ type: "TOGGLE_FAQ", index })
                      }
                      className="w-full flex items-center justify-between gap-5 py-5 text-left group"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover:text-[#30AFFF] transition">
                        {faq.question}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-colors ${
                            isOpen ? "text-[#30AFFF]" : "text-slate-400"
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
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
      <section id="apply" className="bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            <motion.div
              variants={imageLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:sticky lg:top-24"
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

            <motion.form
              variants={imageRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Application submitted successfully!");
              }}
              className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
            >
              <div className="mb-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                    <Globe2 size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Tell us about your global job preference
                    </h3>
                    <p className="text-xs text-slate-500 leading-5 mt-1">
                      Choose your preferred country, work model and salary
                      expectation so we can better understand the opportunity
                      you're looking for.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Experience *
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10"
                  >
                    <option value="">Select experience</option>
                    <option>0 - 1 Year</option>
                    <option>1 - 3 Years</option>
                    <option>3 - 5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Preferred Country *
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10"
                  >
                    <option value="">Select preferred country</option>
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Netherlands">🇳🇱 Netherlands</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="UAE">🇦🇪 UAE</option>
                    <option value="Other">🌍 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Work Preference *
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10"
                  >
                    <option value="">Select work preference</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Relocation">Relocation</option>
                    <option value="Remote or Hybrid">Remote or Hybrid</option>
                    <option value="Open to all">Open to all</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Current Location *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Delhi, India"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Expected Salary *
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10"
                  >
                    <option value="">Select expected salary</option>
                    <option>$40K - $60K / year</option>
                    <option>$60K - $80K / year</option>
                    <option>$80K - $100K / year</option>
                    <option>$100K - $125K / year</option>
                    <option>$125K - $150K / year</option>
                    <option>$150K+ / year</option>
                    <option>Open to discussion</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Work Authorization *
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10"
                  >
                    <option value="">Select work authorization status</option>
                    <option>Citizen / Permanent Resident</option>
                    <option>Valid Work Visa</option>
                    <option>Eligible to obtain a Work Visa</option>
                    <option>Require Employer Sponsorship</option>
                    <option>Open to Relocation / Visa Sponsorship</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Portfolio / GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Technical Skills *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="React, Node.js, MongoDB, Express..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Tell us about yourself
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your experience, projects and the kind of global opportunity you're looking for..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30AFFF]/70 focus:ring-2 focus:ring-[#30AFFF]/10 transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Resume *
                  </label>
                  <label className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3.5 cursor-pointer hover:bg-[#30AFFF]/[0.04] hover:border-[#30AFFF]/40 transition">
                    <span className="text-sm text-slate-500">Upload your resume</span>
                    <span className="text-xs text-[#30AFFF] font-bold">PDF / DOC</span>
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full mt-5 flex items-center justify-center gap-2 rounded-full bg-[#30AFFF] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Submit Application
                <Send size={16} />
              </motion.button>

              <p className="text-[11px] text-center text-slate-400 mt-3">
                By submitting this form, you agree to let us review your
                application for global opportunities matching your profile.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

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