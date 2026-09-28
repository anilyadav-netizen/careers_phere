import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Palette,
  Rocket,
  Send,
  Sparkles,
  X,
  Zap,
  DollarSign,
  Plane,
  Clock3,
  BriefcaseBusiness,
  Building2,
  Laptop2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaLinkedinIn,
  FaReact,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  submitFrontendApplication,
  resetSubmitState,
} from "../redux/slicer/frontendApplicationSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  experience: "",
  currentCountry: "",
  currentLocation: "",
  preferredRegion: "",
  preferredJobMarket: "",
  preferredWorkMode: "",
  relocationPreference: "",
  workAuthorization: "",
  expectedSalary: "",
  salaryCurrency: "",
  noticePeriod: "",
  preferredTimezone: "",
  countryFlexibility: "",
  portfolio: "",
  linkedin: "",
  frontendSkills: "",
  aboutYou: "",
};

const FrontendDeveloprs = () => {
  const dispatch = useDispatch();
  const { submitLoading, submitSuccess, submitError } = useSelector(
    (state) => state.frontendApplications || {}
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [resumeFile, setResumeFile] = useState(null);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
        mirror: false,
        anchorPlacement: "top-bottom",
      });
      AOS.refreshHard();
    };

    initAOS();

    const timer = setTimeout(initAOS, 300);
    window.addEventListener("load", initAOS);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", initAOS);
    };
  }, []);

  const responsibilities = [
    {
      icon: Monitor,
      title: "Build modern interfaces",
      text: "Create responsive, accessible and high-performance interfaces that feel polished across every screen size.",
    },
    {
      icon: Code2,
      title: "Develop React applications",
      text: "Build scalable frontend applications using React, reusable components and clean architectural patterns.",
    },
    {
      icon: Layers3,
      title: "Create reusable systems",
      text: "Develop component systems, UI patterns and reusable modules that keep products consistent and maintainable.",
    },
    {
      icon: Zap,
      title: "Optimize performance",
      text: "Improve Core Web Vitals, rendering performance, bundle size and overall user experience.",
    },
    {
      icon: Palette,
      title: "Translate designs",
      text: "Turn Figma and product concepts into accurate, responsive interfaces without compromising usability.",
    },
    {
      icon: Globe2,
      title: "Build responsive experiences",
      text: "Make every experience work beautifully across mobile, tablet, desktop and emerging devices.",
    },
    {
      icon: Rocket,
      title: "Ship production features",
      text: "Collaborate with product and engineering teams to take features from idea to production.",
    },
    {
      icon: Sparkles,
      title: "Improve UX continuously",
      text: "Identify friction points and continuously improve interactions, accessibility and visual quality.",
    },
  ];

  const stack = [
    {
      icon: FaReact,
      title: "React",
      text: "Component-driven architecture, hooks, state management and scalable application patterns.",
      tags: ["React", "Hooks", "Components"],
    },
    {
      icon: Code2,
      title: "JavaScript",
      text: "Modern ES6+ JavaScript with clean logic, asynchronous workflows and maintainable code.",
      tags: ["ES6+", "Async", "Logic"],
    },
    {
      icon: FaHtml5,
      title: "HTML5",
      text: "Semantic, accessible markup designed for excellent structure and search visibility.",
      tags: ["Semantic", "A11y", "SEO"],
    },
    {
      icon: FaCss3Alt,
      title: "CSS / Tailwind",
      text: "Build polished layouts with modern CSS, Tailwind utilities and responsive design systems.",
      tags: ["Tailwind", "CSS", "Responsive"],
    },
    {
      icon: Globe2,
      title: "REST APIs",
      text: "Connect interfaces with backend services and handle loading, errors and real-world data.",
      tags: ["REST", "JSON", "Integration"],
    },
    {
      icon: FaGithub,
      title: "Git / GitHub",
      text: "Work confidently with branches, pull requests, reviews and collaborative development.",
      tags: ["Git", "GitHub", "PRs"],
    },
  ];

  const builds = [
    {
      number: "01",
      title: "Product Interfaces",
      text: "Dashboards, SaaS platforms and complex web applications designed for real users.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85",
      tag: "PRODUCT",
    },
    {
      number: "02",
      title: "Design Systems",
      text: "Reusable components and visual foundations that make products faster to build.",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
      tag: "SYSTEM",
    },
    {
      number: "03",
      title: "Digital Experiences",
      text: "High-impact landing pages and interactive experiences that turn visitors into users.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      tag: "EXPERIENCE",
    },
  ];

  const globalMarkets = [
    {
      flag: "https://flagcdn.com/w80/us.png",
      country: "United States",
      region: "North America",
      currency: "USD",
      payout: "$80K – $140K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "SaaS · Product · Fintech",
      relocation: "Sponsorship may be available",
    },
    {
      flag: "https://flagcdn.com/w80/gb.png",
      country: "United Kingdom",
      region: "Europe",
      currency: "GBP",
      payout: "£55K – £90K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "SaaS · E-commerce · Product",
      relocation: "Depends on employer",
    },
    {
      flag: "https://flagcdn.com/w80/ca.png",
      country: "Canada",
      region: "North America",
      currency: "CAD",
      payout: "C$70K – C$115K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "Technology · SaaS · Fintech",
      relocation: "Selected roles may support relocation",
    },
    {
      flag: "https://flagcdn.com/w80/de.png",
      country: "Germany",
      region: "Europe",
      currency: "EUR",
      payout: "€55K – €90K",
      modes: ["Hybrid", "On-site", "Remote"],
      focus: "Enterprise · Mobility · SaaS",
      relocation: "Relocation may be available",
    },
    {
      flag: "https://flagcdn.com/w80/au.png",
      country: "Australia",
      region: "APAC",
      currency: "AUD",
      payout: "A$80K – A$130K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "Product · Fintech · Digital",
      relocation: "Depends on role and employer",
    },
    {
      flag: "https://flagcdn.com/w80/nl.png",
      country: "Netherlands",
      region: "Europe",
      currency: "EUR",
      payout: "€55K – €90K",
      modes: ["Hybrid", "Remote", "On-site"],
      focus: "SaaS · Product · Technology",
      relocation: "Selected roles may support relocation",
    },
    {
      flag: "https://flagcdn.com/w80/sg.png",
      country: "Singapore",
      region: "APAC",
      currency: "SGD",
      payout: "S$60K – S$105K",
      modes: ["Hybrid", "On-site", "Remote"],
      focus: "Fintech · Product · Enterprise",
      relocation: "Employer dependent",
    },
    {
      flag: "https://flagcdn.com/w80/ae.png",
      country: "United Arab Emirates",
      region: "Middle East",
      currency: "AED",
      payout: "AED 180K – 320K",
      modes: ["On-site", "Hybrid"],
      focus: "Fintech · Digital · Enterprise",
      relocation: "Relocation may be available",
    },
  ];

  const requirements = [
    "2+ years of professional frontend development experience.",
    "Strong knowledge of React and modern JavaScript.",
    "Excellent understanding of HTML5, CSS3 and responsive layouts.",
    "Experience working with REST APIs and asynchronous data.",
    "Ability to convert Figma or design files into accurate interfaces.",
    "Strong understanding of reusable component architecture.",
    "Comfortable working with Git and collaborative development workflows.",
    "Strong attention to visual details, spacing and interaction quality.",
  ];

  const niceToHave = [
    "Experience with TypeScript.",
    "Experience with Next.js or similar frameworks.",
    "Knowledge of accessibility standards.",
    "Understanding of performance optimization.",
    "Experience building design systems.",
    "Familiarity with testing frameworks.",
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Real product ownership",
      text: "Work on features that reach real users instead of isolated practice projects.",
    },
    {
      icon: Sparkles,
      title: "Creative freedom",
      text: "Bring your ideas to the table and help shape how products look and feel.",
    },
    {
      icon: Code2,
      title: "Modern stack",
      text: "Work with current frontend technologies and engineering practices.",
    },
    {
      icon: Globe2,
      title: "Remote flexibility",
      text: "Collaborate with talented people without being tied to a traditional office.",
    },
    {
      icon: Zap,
      title: "Fast growth",
      text: "Take ownership, solve meaningful problems and grow through real challenges.",
    },
    {
      icon: Layers3,
      title: "Strong engineering culture",
      text: "Learn through code reviews, collaboration and thoughtful technical decisions.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Application",
      text: "Send us your profile, resume and links to your best work.",
    },
    {
      step: "02",
      title: "Profile review",
      text: "Our team reviews your experience, projects and technical background.",
    },
    {
      step: "03",
      title: "Technical round",
      text: "Discuss frontend architecture, React, JavaScript and practical problems.",
    },
    {
      step: "04",
      title: "Final conversation",
      text: "Meet the team and understand the role, culture and product direction.",
    },
    {
      step: "05",
      title: "Decision",
      text: "We share feedback and next steps as quickly as possible.",
    },
    {
      step: "06",
      title: "Welcome aboard",
      text: "Join the team and start building the next generation of products.",
    },
  ];

  const faqs = [
    {
      q: "What kind of frontend projects will I work on?",
      a: "You can work across SaaS platforms, dashboards, consumer applications, marketing experiences and internal tools. The role focuses on building real production interfaces rather than only maintaining existing pages.",
    },
    {
      q: "Is React experience mandatory?",
      a: "React is the primary frontend technology for this role, so strong React fundamentals are highly preferred. Candidates should also understand JavaScript, component architecture and modern frontend development.",
    },
    {
      q: "Do I need TypeScript experience?",
      a: "TypeScript experience is a plus but not mandatory. Strong JavaScript fundamentals and the ability to write maintainable code are more important.",
    },
    {
      q: "Will I work directly with designers?",
      a: "Yes. You will collaborate closely with designers and product teams to translate designs into responsive, accessible and production-ready interfaces.",
    },
    {
      q: "Is this role remote?",
      a: "The role supports flexible collaboration across different markets. Exact working arrangements, location expectations and employer requirements can vary by opportunity.",
    },
    {
      q: "What should I include in my application?",
      a: "Share your resume along with GitHub, portfolio or live project links whenever possible. Also mention your preferred market, work mode, salary expectations and relocation or sponsorship requirements.",
    },
  ];

  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (submitSuccess) {
      setSubmitted(true);
      setFormData(initialFormState);
      setResumeFile(null);
      setLocalError("");
    }
  }, [submitSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    if (file) {
      setLocalError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setLocalError("Please upload your resume (.pdf, .doc, or .docx)");
      return;
    }

    setLocalError("");
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("resume", resumeFile);

    dispatch(submitFrontendApplication(data));
  };

  const handleResetForm = () => {
    dispatch(resetSubmitState());
    setSubmitted(false);
    setFormData(initialFormState);
    setResumeFile(null);
    setLocalError("");
  };

  const softReveal = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardReveal = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.97,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#F5F7F9] text-[#17202A] selection:bg-[#30AFFF]/25 selection:text-[#17202A]">
      <style>{`
        .frontend-grid {
          background-image:
            linear-gradient(rgba(23,32,42,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,32,42,0.045) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .frontend-noise {
          background-image: radial-gradient(rgba(23,32,42,0.045) 0.7px, transparent 0.7px);
          background-size: 7px 7px;
        }

        .frontend-glass {
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .frontend-gradient {
          color: #0B6F9F;
        }
      `}</style>

      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-[#17202A]/15 bg-[#F5F7F9]/95 backdrop-blur-xl"
      >
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 rounded-xl bg-[#17202A] flex items-center justify-center text-white font-black"
            >
              FE
            </motion.div>

            <div>
              <div className="font-black tracking-[-0.04em] text-[15px] text-[#17202A]">
                FRONT<span className="text-[#0B6F9F]">//</span>END
              </div>

              <div className="text-[8px] text-[#17202A]/50 uppercase tracking-[0.25em]">
                Developer Hiring
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#17202A]/65">
            <a href="#role" className="hover:text-[#0B6F9F] transition">
              Role
            </a>
            <a href="#global" className="hover:text-[#0B6F9F] transition">
              Global Opportunity
            </a>
            <a href="#stack" className="hover:text-[#0B6F9F] transition">
              Stack
            </a>
            <a href="#requirements" className="hover:text-[#0B6F9F] transition">
              Requirements
            </a>
            <a href="#process" className="hover:text-[#0B6F9F] transition">
              Process
            </a>
            <a href="#faq" className="hover:text-[#0B6F9F] transition">
              FAQ
            </a>
          </nav>

          <motion.button
            onClick={scrollToApply}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 rounded-full bg-[#17202A] text-white px-4 py-2 text-[12px] font-bold hover:bg-[#30AFFF] transition"
          >
            Apply now
            <ArrowRight size={14} />
          </motion.button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-[#17202A]/15 bg-[#F5F7F9] overflow-hidden"
            >
              <div className="max-w-[90rem] mx-auto px-5 py-4 flex flex-col gap-3 text-sm text-[#17202A]/75">
                <a onClick={() => setMenuOpen(false)} href="#role">
                  Role
                </a>
                <a onClick={() => setMenuOpen(false)} href="#global">
                  Global Opportunity
                </a>
                <a onClick={() => setMenuOpen(false)} href="#stack">
                  Stack
                </a>
                <a onClick={() => setMenuOpen(false)} href="#requirements">
                  Requirements
                </a>
                <a onClick={() => setMenuOpen(false)} href="#process">
                  Process
                </a>
                <a onClick={() => setMenuOpen(false)} href="#faq">
                  FAQ
                </a>

                <button
                  onClick={scrollToApply}
                  className="mt-1 w-full rounded-xl bg-[#17202A] text-white py-2.5 font-bold"
                >
                  Apply now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 frontend-grid opacity-70" />
        <div className="absolute inset-0 frontend-noise opacity-30" />
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/10 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#75D9FF]/10 blur-[120px]" />

        <div className="relative max-w-[90rem] mx-auto px-2.5 sm:px-4 lg:px-6 pt-7 pb-6 lg:pt-10 lg:pb-8">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={softReveal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 border border-[#0B6F9F]/25 bg-[#30AFFF]/10 rounded-full px-3 py-1.5 mb-2 md:mb-4 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B6F9F] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0B6F9F]">
                  We're hiring · Frontend Developer
                </span>
              </motion.div>

              <h1 className="text-[25px] md:text-3xl lg:text-4xl xl:text-[3rem] font-bold tracking-[-0.065em] leading-[0.92] max-w-5xl text-[#17202A]">
                Build the interface{" "}
                <motion.span
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.35 }}
                  className="inline-block text-[#0B6F9F]"
                >
                  of what’s next.
                </motion.span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#17202A]/65 leading-5">
                We’re looking for a frontend developer who cares about the
                details — from a perfectly aligned pixel to a fast, accessible
                experience that thousands of people can use.
              </p>

              <div className="flex flex-row gap-2.5 mt-5">
                <motion.button
                  onClick={scrollToApply}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#17202A] text-white px-4 sm:px-5 py-3 text-sm font-bold hover:bg-[#30AFFF] transition whitespace-nowrap"
                >
                  Apply for this role
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition shrink-0"
                  />
                </motion.button>

                <motion.a
                  href="#global"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#17202A]/25 bg-white/80 px-4 sm:px-5 py-3 text-sm font-semibold text-[#17202A] hover:text-[#0B6F9F] hover:border-[#30AFFF]/60 transition whitespace-nowrap"
                >
                  Explore global roles
                </motion.a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 max-w-2xl">
                {[
                  ["8+", "Global markets"],
                  ["3", "Work modes"],
                  ["7", "Currencies"],
                ].map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                    }}
                    whileHover={{ y: -3 }}
                    className="border border-[#17202A]/20 rounded-xl p-3 frontend-glass"
                  >
                    <div className="text-base md:text-2xl font-black tracking-tight text-[#17202A]">
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#17202A]/60 mt-0.5">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-aos="fade-left"
              className="relative"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-[360px] md:min-h-[450px] rounded-[26px] overflow-hidden border border-[#17202A]/25 bg-[#17202A]"
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=90"
                  alt="Frontend developer workspace"
                  className="absolute inset-0 w-full h-full object-cover opacity-65"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#17202A] via-[#17202A]/20 to-transparent" />
                <div className="absolute inset-0 bg-[#30AFFF]/10" />

                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-black/45 border border-white/20 backdrop-blur-md text-[9px] font-bold tracking-[0.18em] text-white/70">
                    GLOBAL FRONTEND
                  </div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-9 h-9 rounded-full bg-black/45 border border-white/20 backdrop-blur-md flex items-center justify-center"
                  >
                    <Globe2 className="text-[#30AFFF] text-lg" size={19} />
                  </motion.div>
                </div>

                <div className="absolute left-5 right-5 bottom-5">
                  <div className="max-w-sm rounded-2xl border border-white/20 bg-black/45 backdrop-blur-xl p-4">
                    <div className="flex items-center gap-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                      Work without borders
                    </div>

                    <div className="mt-1 md:mt-2 text-base md:text-2xl font-black tracking-tight text-white">
                      Build for
                      <span className="text-cyan-300"> global users.</span>
                    </div>

                    <div className="mt-1 text-xs leading-4 md:leading-5 text-white/45">
                      Explore international frontend opportunities across
                      remote, hybrid and on-site teams.
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 rounded-xl border border-[#17202A]/25 bg-white px-3 py-2.5 shadow-2xl"
              >
                <div className="w-7 h-7 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Globe2 size={15} className="text-[#30AFFF]" />
                </div>

                <div>
                  <div className="text-[10px] text-[#17202A]/45">
                    OPPORTUNITIES
                  </div>
                  <div className="text-xs font-bold text-[#17202A]">
                    International markets
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 rounded-xl border border-[#17202A]/25 bg-white px-3 py-2.5"
              >
                <div>
                  <div className="text-[10px] text-[#17202A]/45">
                    WORK MODE
                  </div>
                  <div className="text-xs font-bold text-[#17202A]">
                    Remote · Hybrid · On-site
                  </div>
                </div>

                <div className="w-7 h-7 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Laptop2 size={15} className="text-[#30AFFF]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROLE */}
      <section id="role" className="border-y border-[#17202A]/15 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-4 lg:py-8">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              The role
            </div>

            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-black tracking-[-0.05em] leading-[0.95] text-[#17202A]">
              Shape how people{" "}
              <span className="text-[#0B6F9F]">experience products.</span>
            </h2>

            <p className="text-sm sm:text-base leading-5 text-[#17202A]/65 max-w-3xl mx-auto mt-3">
              As a Frontend Developer, you’ll sit at the intersection of
              design, technology and product. You’ll take ideas and turn them
              into fast, responsive and delightful experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0 mt-6 border-t border-[#17202A]/15">
            {responsibilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -5 }}
                  className="group py-5 border-b border-[#17202A]/15 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0 lg:[&:nth-child(7)]:border-b-0 lg:[&:nth-child(8)]:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-[#17202A] bg-[#17202A] flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:border-[#30AFFF]">
                      <Icon
                        size={17}
                        className="text-white transition-colors duration-300 group-hover:text-[#17202A]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[#0B6F9F] font-bold">
                          0{index + 1}
                        </span>

                        <h3 className="text-sm font-bold text-[#17202A]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs leading-5 text-[#17202A]/55 mt-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL OPPORTUNITY */}
      <section
        id="global"
        className="border-y border-[#17202A]/10 bg-[#F5F7F9] overflow-hidden"
      >
        <div className="relative max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#30AFFF]/8 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#75D9FF]/8 blur-[100px] pointer-events-none" />

          {/* CENTERED INTRO */}
          <div
            data-aos="fade-up"
            className="relative max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/25 bg-[#30AFFF]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F]">
              <Globe2 size={12} />
              Global opportunity
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em] leading-[0.95] mt-3 text-[#17202A]">
              Work where {""}
              <span className=" text-[#0B6F9F]">
                Opportunity takes you.
              </span>
            </h2>

            <p className="text-sm leading-5 text-[#17202A]/55 mt-3 max-w-2xl mx-auto">
              Explore international frontend opportunities across major technology
              markets. Compare location, work mode, indicative compensation and
              relocation possibilities before applying.
            </p>
          </div>
          {/* GLOBAL MARKETS */}
          <div className="relative grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-7">
            {globalMarkets.map((market, index) => (
              <motion.div
                key={market.country}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-[#17202A]/10 bg-white hover:border-[#30AFFF]/35 hover:shadow-[0_14px_40px_rgba(23,32,42,0.08)] transition-all p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl border border-[#17202A]/8 bg-[#F5F7F9] flex items-center justify-center shadow-sm overflow-hidden">
                      <img
                        src={market.flag}
                        alt={`${market.country} flag`}
                        className="w-8 h-6 object-cover rounded-sm border border-[#17202A]/10"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#17202A]">
                        {market.country}
                      </h3>
                      <p className="text-[10px] text-[#17202A]/40 mt-0.5">
                        {market.region}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold tracking-wider rounded-full border border-[#30AFFF]/25 bg-[#30AFFF]/10 text-[#0B6F9F] px-2 py-1">
                    {market.currency}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-[#17202A]/40 font-bold">
                    <DollarSign size={11} />
                    Indicative payout
                  </div>

                  <div className="text-lg font-black tracking-tight text-[#17202A] mt-1">
                    {market.payout}
                  </div>

                  <div className="text-[9px] text-[#17202A]/35 mt-0.5">
                    Typical annual range · role dependent
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {market.modes.map((mode) => (
                    <span
                      key={mode}
                      className="rounded-md border border-[#17202A]/10 bg-[#F5F7F9] px-2 py-1 text-[9px] text-[#17202A]/60"
                    >
                      {mode}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#17202A]/8 space-y-2.5">
                  <div className="flex items-start gap-2">
                    <BriefcaseBusiness
                      size={13}
                      className="text-[#0B6F9F] mt-0.5 shrink-0"
                    />
                    <span className="text-[10px] leading-4 text-[#17202A]/55">
                      {market.focus}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Plane
                      size={13}
                      className="text-[#0B6F9F] mt-0.5 shrink-0"
                    />
                    <span className="text-[10px] leading-4 text-[#17202A]/55">
                      {market.relocation}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM CTA */}
          <div className="relative mt-5 grid md:grid-cols-[1fr_auto] gap-4 items-center rounded-2xl border border-[#30AFFF]/20 bg-white p-4 shadow-[0_10px_35px_rgba(23,32,42,0.05)]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center shrink-0">
                <Clock3 size={16} className="text-[#0B6F9F]" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#17202A]">
                  Your location doesn't have to define your next role.
                </h4>

                <p className="text-[10px] sm:text-xs leading-5 text-[#17202A]/45 mt-1">
                  Choose the market, work mode and compensation range that matches
                  your career goals. Sponsorship and relocation depend on the
                  individual employer.
                </p>
              </div>
            </div>

            <button
              onClick={scrollToApply}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#30AFFF] text-[#17202A] px-4 py-2.5 text-xs font-black hover:bg-[#0B6F9F] hover:text-white transition"
            >
              Find your opportunity
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="relative text-[9px] leading-4 text-[#17202A]/35 mt-4 text-center">
            * Indicative ranges are shown for opportunity guidance only. Actual
            salary, eligibility, work mode, sponsorship and relocation support vary
            by employer, seniority, country and individual role.
          </p>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="bg-[#F5F7F9]">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-center gap-3 mb-5 text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="inline-flex items-center justify-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
                Your toolkit
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-tight text-[#17202A]">
                The stack you’ll{" "}
                <span className="text-[#0B6F9F]">work with.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-[#17202A]/55 text-center mx-auto">
              We care more about strong fundamentals and problem solving than
              checking every technology off a list.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-[#17202A]/15">
            {stack.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group py-5 border-b border-[#17202A]/15 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-[#17202A] bg-[#17202A] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:border-[#30AFFF]">
                        <Icon className="text-white text-xl transition-colors duration-300 group-hover:text-[#17202A]" />
                      </div>

                      <div>
                        <span className="text-[9px] text-[#0B6F9F] font-mono font-bold">
                          0{index + 1}
                        </span>

                        <h3 className="text-base font-bold text-[#17202A]">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-[#17202A]/55 mt-3 max-w-md">
                    {item.text}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md border border-[#17202A]/15 text-[9px] text-[#17202A]/60 bg-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU BUILD */}
      <section className="border-y border-[#17202A]/15 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div data-aos="fade-up" className="mb-5 text-center">
            <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              What you’ll build
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-none text-[#17202A]">
              From first pixel{" "}
              <span className="text-[#0B6F9F]">to production.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            {builds.map((item, index) => (
              <motion.div
                key={item.number}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative min-h-[300px] rounded-2xl overflow-hidden border border-[#17202A]/25"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#17202A] via-[#17202A]/35 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold tracking-widest text-white/70">
                    {item.tag}
                  </span>

                  <span className="w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-[10px] text-white">
                    {item.number}
                  </span>
                </div>

                <div className="absolute left-5 right-5 bottom-5">
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-5 text-white/55 mt-1.5 max-w-sm">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="bg-[#F5F7F9]">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              data-aos="fade-right"
              className="border-t-2 border-[#17202A] pt-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Check size={15} className="text-white" />
                </div>

                <div>
                  <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#0B6F9F] font-bold shadow-sm">
                    Must have
                  </div>

                  <h3 className="text-xl font-black mt-0.5 text-[#17202A]">
                    What we’re looking for
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {requirements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.045,
                    }}
                    className="flex gap-3 text-xs sm:text-sm text-[#17202A]/65 leading-5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#17202A] flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              className="border-t-2 border-[#0B6F9F] pt-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Sparkles size={15} className="text-white" />
                </div>

                <div>
                  <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#0B6F9F] font-bold shadow-sm">
                    Nice to have
                  </div>

                  <h3 className="text-xl font-black mt-0.5 text-[#17202A]">
                    Extra signal
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {niceToHave.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    className="flex gap-3 text-xs sm:text-sm text-[#17202A]/65 leading-5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0B6F9F] flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#17202A]/15">
                <p className="text-xs leading-5 text-[#17202A]/50">
                  Don’t match everything? Apply anyway. Strong fundamentals,
                  curiosity and great work can outweigh a missing technology.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-[#17202A]/15 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div data-aos="fade-up" className="mb-5 text-center">
            <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              Why join us
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-none text-[#17202A]">
              Build better things,{" "}
              <span className="text-[#0B6F9F]">together.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-[#17202A]/15">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group py-5 border-b border-[#17202A]/15 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-[#17202A] bg-[#17202A] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:border-[#30AFFF]">
                      <Icon
                        size={17}
                        className="text-white transition-colors duration-300 group-hover:text-[#17202A]"
                      />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-[#0B6F9F] font-bold">
                        0{index + 1}
                      </span>

                      <h3 className="text-sm font-bold mt-0.5 text-[#17202A]">
                        {item.title}
                      </h3>

                      <p className="text-xs leading-5 text-[#17202A]/55 mt-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-[#F5F7F9]">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div data-aos="fade-up" className="mb-5 text-center">
            <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              Hiring process
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-none text-[#17202A]">
              Simple. Transparent.{" "}
              <span className="text-[#0B6F9F]">Human.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-[#17202A]/15">
            {process.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                className="relative py-5 border-b border-[#17202A]/15 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#0B6F9F] font-bold">
                    STEP {item.step}
                  </span>

                  <ArrowRight size={14} className="text-[#17202A]/25" />
                </div>

                <h3 className="text-base font-bold mt-5 text-[#17202A]">
                  {item.title}
                </h3>

                <p className="text-xs leading-5 text-[#17202A]/55 mt-2 max-w-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA IMAGE */}
      <section className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pb-6 lg:pb-8">
        <motion.div
          data-aos="zoom-in"
          whileHover={{ y: -4 }}
          className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-2xl border border-[#17202A]/25"
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90"
            alt="Team collaboration"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#17202A] via-[#17202A]/75 to-[#17202A]/25" />
          <div className="absolute inset-0 bg-[#30AFFF]/10" />

          <div className="relative h-full min-h-[300px] sm:min-h-[360px] flex items-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-200 mb-3">
                <Sparkles size={13} />
                Your next chapter
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[0.95] text-white">
                Ready to build
                <span className="block text-cyan-300">
                  something great?
                </span>
              </h2>

              <p className="text-sm leading-5 text-white/45 max-w-lg mt-2">
                Bring your frontend expertise, your curiosity and your
                obsession with great interfaces. We’ll bring the problems worth
                solving.
              </p>

              <motion.button
                onClick={scrollToApply}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-[#17202A] px-5 py-3 text-sm font-bold hover:bg-cyan-200 transition"
              >
                Start your application
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-[#17202A]/15 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
            <div data-aos="fade-right" className="text-center">
              <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
                FAQ
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[0.95] text-center whitespace-nowrap text-[#17202A]">
                Questions,{" "}
                <span className="text-[#0B6F9F]">answered.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#17202A]/55 leading-5 mt-2 max-w-sm mx-auto">
                Still wondering if this role is right for you? Here are a few
                things candidates usually ask.
              </p>
            </div>

            <div data-aos="fade-left" className="border-t border-[#17202A]/15">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                    className="border-b border-[#17202A]/15"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 text-left px-1 sm:px-2 py-4"
                    >
                      <span className="text-sm font-semibold text-[#17202A]/85">
                        {item.q}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown
                          size={16}
                          className="text-[#17202A]/40 flex-shrink-0"
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-1 sm:px-2 pb-4">
                            <p className="text-xs sm:text-sm leading-5 text-[#17202A]/55 max-w-3xl">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="bg-[#F5F7F9]">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            <motion.div
              data-aos="fade-right"
              className="lg:sticky lg:top-24"
            >
              <div className="text-center">
                <div className="inline-flex items-center rounded-full border border-[#0B6F9F]/25 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#0B6F9F] font-bold shadow-sm">
                  Global application
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[0.95] text-[#17202A] mt-2">
                  Let’s build{" "}
                  <span className="frontend-gradient">the future.</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm leading-5 text-[#17202A]/55 mt-3 max-w-md">
                Tell us about your experience and the international opportunity
                you’re targeting so we can understand your preferred market,
                work mode and career direction.
              </p>

              <div className="space-y-3 mt-6">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-xs text-[#17202A]/60"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center">
                    <Mail size={14} className="text-white" />
                  </div>
                  careers@example.com
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-xs text-[#17202A]/60"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center">
                    <Globe2 size={14} className="text-white" />
                  </div>
                  International · Remote · Hybrid · On-site
                </motion.div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#17202A]/15 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Globe2 size={15} className="text-[#0B6F9F]" />
                  <span className="text-xs font-bold text-[#17202A]">
                    Global opportunity profile
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    ["Markets", "8+"],
                    ["Modes", "3"],
                    ["Currencies", "7"],
                    ["Regions", "4"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg bg-[#F5F7F9] border border-[#17202A]/10 p-2.5"
                    >
                      <div className="text-sm font-black text-[#17202A]">
                        {value}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-[#17202A]/40 mt-0.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] hover:border-[#17202A] transition"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] hover:border-[#17202A] transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              className="border-t-2 border-[#17202A] pt-5"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="min-h-[420px] flex items-center justify-center text-center"
                  >
                    <div className="max-w-md">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.45,
                          type: "spring",
                          stiffness: 180,
                        }}
                        className="mx-auto w-14 h-14 rounded-2xl bg-[#17202A] flex items-center justify-center"
                      >
                        <Check size={25} className="text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-black mt-5 text-[#17202A]">
                        Application received.
                      </h3>

                      <p className="text-sm leading-6 text-[#17202A]/55 mt-2">
                        Thanks for applying. Your global opportunity
                        preferences have been submitted along with your
                        profile.
                      </p>

                      <button
                        onClick={handleResetForm}
                        className="mt-5 text-xs font-bold text-[#0B6F9F] hover:text-[#30AFFF]"
                      >
                        Submit another application
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.07] p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#17202A] flex items-center justify-center shrink-0">
                          <Globe2 size={16} className="text-[#30AFFF]" />
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-[#17202A]">
                            Tell us where you want to go.
                          </h3>
                          <p className="text-[10px] sm:text-xs leading-5 text-[#17202A]/50 mt-1">
                            Your location, target market, preferred work mode,
                            salary expectations and relocation preferences help
                            us understand the right international opportunity
                            for you.
                          </p>
                        </div>
                      </div>
                    </div>

                    {(localError || submitError) && (
                      <div className="mb-5 rounded-xl border border-red-500/30 bg-red-50 p-3.5 flex items-start gap-2.5 text-xs text-red-700">
                        <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
                        <span>{localError || submitError}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Full name *
                        </label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 00000 00000"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Experience *
                        </label>
                        <select
                          required
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select experience</option>
                          <option>0–1 years</option>
                          <option>1–2 years</option>
                          <option>2–4 years</option>
                          <option>4–6 years</option>
                          <option>6+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Current country *
                        </label>
                        <select
                          required
                          name="currentCountry"
                          value={formData.currentCountry}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select country</option>
                          <option>India</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Netherlands</option>
                          <option>Singapore</option>
                          <option>United Arab Emirates</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Current location
                        </label>
                        <input
                          type="text"
                          name="currentLocation"
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          placeholder="City / State"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Preferred region *
                        </label>
                        <select
                          required
                          name="preferredRegion"
                          value={formData.preferredRegion}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select region</option>
                          <option>North America</option>
                          <option>Europe</option>
                          <option>Asia-Pacific</option>
                          <option>Middle East</option>
                          <option>Any global region</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Preferred job market *
                        </label>
                        <select
                          required
                          name="preferredJobMarket"
                          value={formData.preferredJobMarket}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select market</option>
                          <option>🇺🇸 United States</option>
                          <option>🇬🇧 United Kingdom</option>
                          <option>🇨🇦 Canada</option>
                          <option>🇩🇪 Germany</option>
                          <option>🇦🇺 Australia</option>
                          <option>🇳🇱 Netherlands</option>
                          <option>🇸🇬 Singapore</option>
                          <option>🇦🇪 United Arab Emirates</option>
                          <option>Any global market</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Preferred work mode *
                        </label>
                        <select
                          required
                          name="preferredWorkMode"
                          value={formData.preferredWorkMode}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select work mode</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>On-site</option>
                          <option>Remote or Hybrid</option>
                          <option>Flexible / Any</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Relocation preference
                        </label>
                        <select
                          name="relocationPreference"
                          value={formData.relocationPreference}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select preference</option>
                          <option>Yes — open to relocation</option>
                          <option>Yes — only with relocation support</option>
                          <option>No — remote preferred</option>
                          <option>Maybe — depends on opportunity</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Work authorization / sponsorship
                        </label>
                        <select
                          name="workAuthorization"
                          value={formData.workAuthorization}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select status</option>
                          <option>
                            Authorized to work in my preferred market
                          </option>
                          <option>Need employer sponsorship</option>
                          <option>Open to employer sponsorship</option>
                          <option>Remote only / no local authorization needed</option>
                          <option>Not sure</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Expected annual salary *
                        </label>
                        <input
                          required
                          type="number"
                          min="0"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          placeholder="e.g. 80000"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                        <p className="text-[9px] text-[#17202A]/35 mt-1">
                          Enter your target annual compensation.
                        </p>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Salary currency *
                        </label>
                        <select
                          required
                          name="salaryCurrency"
                          value={formData.salaryCurrency}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select currency</option>
                          <option>USD — US Dollar</option>
                          <option>GBP — British Pound</option>
                          <option>CAD — Canadian Dollar</option>
                          <option>EUR — Euro</option>
                          <option>AUD — Australian Dollar</option>
                          <option>SGD — Singapore Dollar</option>
                          <option>AED — UAE Dirham</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Availability / notice period *
                        </label>
                        <select
                          required
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select availability</option>
                          <option>Immediately available</option>
                          <option>Within 15 days</option>
                          <option>Within 30 days</option>
                          <option>30–60 days</option>
                          <option>60+ days</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Preferred working timezone
                        </label>
                        <select
                          name="preferredTimezone"
                          value={formData.preferredTimezone}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select timezone</option>
                          <option>IST — India</option>
                          <option>GMT — United Kingdom</option>
                          <option>EST — US Eastern</option>
                          <option>CST — US Central</option>
                          <option>PST — US Pacific</option>
                          <option>CET — Central Europe</option>
                          <option>AEST — Australia Eastern</option>
                          <option>Flexible / Any timezone</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Country flexibility
                        </label>
                        <select
                          name="countryFlexibility"
                          value={formData.countryFlexibility}
                          onChange={handleInputChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A]/75 outline-none focus:border-[#30AFFF]/70"
                        >
                          <option value="">Select flexibility</option>
                          <option>Only my preferred country</option>
                          <option>Open to nearby countries</option>
                          <option>Open to any global market</option>
                          <option>Depends on compensation</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Portfolio / GitHub
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/yourname"
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Frontend skills
                        </label>
                        <input
                          type="text"
                          name="frontendSkills"
                          value={formData.frontendSkills}
                          onChange={handleInputChange}
                          placeholder="React, JavaScript, TypeScript, Next.js, Tailwind..."
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Resume *
                        </label>

                        <input
                          required
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="mt-1.5 w-full rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-xs text-[#17202A]/60 file:mr-3 file:rounded-lg file:border-0 file:bg-[#17202A] file:px-3 file:py-2 file:text-xs file:text-white"
                        />
                        {resumeFile && (
                          <p className="mt-1 text-[11px] text-[#0B6F9F] font-medium">
                            Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#17202A]/65">
                          Tell us about yourself *
                        </label>

                        <textarea
                          required
                          rows="5"
                          name="aboutYou"
                          value={formData.aboutYou}
                          onChange={handleInputChange}
                          placeholder="Tell us about your experience, strongest projects, preferred global market and why this opportunity interests you..."
                          className="mt-1.5 w-full resize-none rounded-xl border border-[#17202A]/20 bg-white px-3.5 py-3 text-sm text-[#17202A] outline-none placeholder:text-[#17202A]/30 focus:border-[#30AFFF]/70"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 pt-5 border-t border-[#17202A]/15">
                      <p className="text-[10px] leading-4 text-[#17202A]/40 max-w-sm">
                        By submitting this application, you confirm that the
                        information provided is accurate. Global opportunity
                        availability, compensation and sponsorship depend on
                        the employer and role.
                      </p>

                      <motion.button
                        type="submit"
                        disabled={submitLoading}
                        whileHover={submitLoading ? {} : { y: -3 }}
                        whileTap={submitLoading ? {} : { scale: 0.97 }}
                        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[#17202A] text-white px-5 py-3 text-sm font-bold transition ${
                          submitLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-[#30AFFF]"
                        }`}
                      >
                        {submitLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            Submitting application...
                          </>
                        ) : (
                          <>
                            Send application
                            <Send
                              size={14}
                              className="group-hover:translate-x-0.5 transition"
                            />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#17202A]/20 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <motion.div
              data-aos="fade-right"
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center text-[10px] font-black text-white">
                FE
              </div>

              <span className="text-sm font-black tracking-tight text-[#17202A]">
                FRONT<span className="text-[#0B6F9F]">//</span>END
              </span>
            </motion.div>

            <p className="text-[10px] text-[#17202A]/45">
              Building digital experiences that matter.
            </p>

            <motion.div
              data-aos="fade-left"
              className="flex flex-wrap items-center gap-5 text-[11px] text-[#17202A]/50"
            >
              <a href="#role" className="hover:text-[#0B6F9F] transition">
                Role
              </a>

              <a href="#global" className="hover:text-[#0B6F9F] transition">
                Global
              </a>

              <a href="#stack" className="hover:text-[#0B6F9F] transition">
                Stack
              </a>

              <a href="#process" className="hover:text-[#0B6F9F] transition">
                Process
              </a>

              <a href="#faq" className="hover:text-[#0B6F9F] transition">
                FAQ
              </a>

              <button
                onClick={scrollToApply}
                className="text-[#17202A]/80 hover:text-[#0B6F9F] transition font-semibold"
              >
                Apply →
              </button>
            </motion.div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#17202A]/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-[#17202A]/35">
            <span>
              © {new Date().getFullYear()} Frontend Careers. All rights
              reserved.
            </span>

            <span>
              Designed for builders who care about the details.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontendDeveloprs;