import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  DollarSign,
  Globe2,
  Laptop2,
  Layers3,
  Mail,
  Monitor,
  Palette,
  Plane,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaLinkedinIn,
  FaReact,
} from "react-icons/fa";
import RoleApplyModal from "../components/RoleApplyModal";

const FrontendDeveloprs = () => {
  const [openFaq, setOpenFaq] = useState(-1);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

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
    setIsApplyModalOpen(true);
  };

  const handleMarketApply = (market) => {
    setSelectedMarket(market);
    setIsApplyModalOpen(true);
  };

  const softReveal = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 45, scale: 0.97 },
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
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/8 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#30AFFF]/5 blur-[120px]" />

        <div className="relative max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-14 lg:pb-12">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={softReveal}
              className="min-w-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 border border-[#30AFFF]/30 bg-[#30AFFF]/5 rounded-full px-3 py-1.5 mb-3 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#30AFFF] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#159FEF]">
                  We're hiring · Frontend Developer
                </span>
              </motion.div>

              <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95] max-w-5xl text-slate-900">
                Build the interface{" "}
                <motion.span
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.35 }}
                  className="inline-block text-[#30AFFF]"
                >
                  of what's next.
                </motion.span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-500 leading-6">
                We're looking for a frontend developer who cares about the
                details — from a perfectly aligned pixel to a fast, accessible
                experience that thousands of people can use.
              </p>

              <div className="flex flex-row gap-2.5 mt-6">
                <motion.button
                  onClick={scrollToApply}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#30AFFF] text-white px-4 sm:px-6 py-3 text-sm font-bold shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] hover:shadow-xl hover:shadow-[#30AFFF]/30 transition whitespace-nowrap"
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
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 sm:px-6 py-3 text-sm font-semibold text-slate-700 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 shadow-sm transition whitespace-nowrap"
                >
                  Explore global roles
                </motion.a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-7 max-w-2xl">
                {[
                  ["8+", "Global markets"],
                  ["3", "Work modes"],
                  ["7", "Currencies"],
                ].map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="border border-slate-100 rounded-2xl p-3 bg-white shadow-sm"
                  >
                    <div className="text-base md:text-2xl font-black tracking-tight text-slate-900">
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-aos="fade-left"
              className="relative min-w-0"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-[360px] md:min-h-[450px] rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=90"
                  alt="Frontend developer workspace"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-white/90 border border-white/60 backdrop-blur-md text-[9px] font-bold tracking-[0.18em] text-slate-700">
                    GLOBAL FRONTEND
                  </div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-9 h-9 rounded-full bg-white/90 border border-white/60 backdrop-blur-md flex items-center justify-center shadow-md"
                  >
                    <Globe2 className="text-[#30AFFF]" size={19} />
                  </motion.div>
                </div>

                <div className="absolute left-5 right-5 bottom-5">
                  <div className="max-w-sm rounded-2xl border border-white/60 bg-white/90 backdrop-blur-xl p-4 shadow-lg">
                    <div className="flex items-center gap-2 text-[#159FEF] text-[10px] font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30AFFF]" />
                      Work without borders
                    </div>

                    <div className="mt-1 md:mt-2 text-base md:text-2xl font-black tracking-tight text-slate-900">
                      Build for
                      <span className="text-[#30AFFF]"> global users.</span>
                    </div>

                    <div className="mt-1 text-xs leading-4 md:leading-5 text-slate-500">
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
                className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
              >
                <div className="w-7 h-7 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                  <Globe2 size={15} className="text-[#30AFFF]" />
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">
                    OPPORTUNITIES
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    International markets
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
              >
                <div>
                  <div className="text-[10px] text-slate-400">WORK MODE</div>
                  <div className="text-xs font-bold text-slate-800">
                    Remote · Hybrid · On-site
                  </div>
                </div>

                <div className="w-7 h-7 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                  <Laptop2 size={15} className="text-[#30AFFF]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROLE */}
      <section id="role" className="relative overflow-hidden border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
              The role
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-slate-900">
              Shape how people{" "}
              <span className="text-[#30AFFF]">experience products.</span>
            </h2>

            <p className="text-sm sm:text-base leading-6 text-slate-500 max-w-3xl mx-auto mt-4">
              As a Frontend Developer, you'll sit at the intersection of design,
              technology and product. You'll take ideas and turn them into fast,
              responsive and delightful experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0 mt-8 border-t border-slate-100">
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
                  className="group py-5 border-b border-slate-100 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0 lg:[&:nth-child(7)]:border-b-0 lg:[&:nth-child(8)]:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-[#30AFFF]/20 bg-[#30AFFF]/10 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-[#30AFFF]">
                      <Icon
                        size={17}
                        className="text-[#30AFFF] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[#159FEF] font-bold">
                          0{index + 1}
                        </span>
                        <h3 className="text-sm font-bold text-slate-800">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs leading-5 text-slate-500 mt-2">
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
        className="relative overflow-hidden border-y border-slate-100 bg-white"
      >
        <div className="relative max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#30AFFF]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#30AFFF]/5 blur-[100px] pointer-events-none" />

          <div
            data-aos="fade-up"
            className="relative max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF]">
              <Globe2 size={12} />
              Global opportunity
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.95] mt-3 text-slate-900">
              Work where{" "}
              <span className="text-[#30AFFF]">Opportunity takes you.</span>
            </h2>

            <p className="text-sm leading-6 text-slate-500 mt-3 max-w-2xl mx-auto">
              Explore international frontend opportunities across major
              technology markets. Compare location, work mode, indicative
              compensation and relocation possibilities before applying.
            </p>
          </div>

          <div className="relative grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-8">
            {globalMarkets.map((market, index) => (
              <motion.div
                key={market.country}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all p-4 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center shadow-sm overflow-hidden">
                      <img
                        src={market.flag}
                        alt={`${market.country} flag`}
                        className="w-8 h-6 object-cover rounded-sm border border-slate-100"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {market.country}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {market.region}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold tracking-wider rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 text-[#159FEF] px-2 py-1">
                    {market.currency}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-slate-400 font-bold">
                    <DollarSign size={11} />
                    Indicative payout
                  </div>

                  <div className="text-lg font-black tracking-tight text-slate-900 mt-1">
                    {market.payout}
                  </div>

                  <div className="text-[9px] text-slate-400 mt-0.5">
                    Typical annual range · role dependent
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {market.modes.map((mode) => (
                    <span
                      key={mode}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[9px] text-slate-600"
                    >
                      {mode}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-start gap-2">
                    <BriefcaseBusiness
                      size={13}
                      className="text-[#30AFFF] mt-0.5 shrink-0"
                    />
                    <span className="text-[10px] leading-4 text-slate-500">
                      {market.focus}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Plane
                      size={13}
                      className="text-[#30AFFF] mt-0.5 shrink-0"
                    />
                    <span className="text-[10px] leading-4 text-slate-500">
                      {market.relocation}
                    </span>
                  </div>
                </div>

                {/* APPLY BUTTON — RIGHT ALIGNED */}
                <div className="flex justify-end mt-5 pt-4 border-t border-slate-100 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleMarketApply(market)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3 py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#159FEF] transition"
                  >
                    Apply
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-center rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center shrink-0">
                <Clock3 size={16} className="text-[#30AFFF]" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Your location doesn't have to define your next role.
                </h4>

                <p className="text-[10px] sm:text-xs leading-5 text-slate-500 mt-1">
                  Choose the market, work mode and compensation range that
                  matches your career goals. Sponsorship and relocation depend
                  on the individual employer.
                </p>
              </div>
            </div>

            <button
              onClick={scrollToApply}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30AFFF] text-white px-5 py-2.5 text-xs font-bold shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
            >
              Find your opportunity
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="relative text-[9px] leading-4 text-slate-400 mt-4 text-center">
            * Indicative ranges are shown for opportunity guidance only. Actual
            salary, eligibility, work mode, sponsorship and relocation support
            vary by employer, seniority, country and individual role.
          </p>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-center gap-3 mb-8 text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
                Your toolkit
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-slate-900">
                The stack you'll{" "}
                <span className="text-[#30AFFF]">work with.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-slate-500 text-center mx-auto">
              We care more about strong fundamentals and problem solving than
              checking every technology off a list.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-slate-100">
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
                  className="group py-5 border-b border-slate-100 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-[#30AFFF]/20 bg-[#30AFFF]/10 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#30AFFF]">
                        <Icon className="text-[#30AFFF] text-xl transition-colors duration-300 group-hover:text-white" />
                      </div>

                      <div>
                        <span className="text-[9px] text-[#159FEF] font-mono font-bold">
                          0{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-slate-800">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-slate-500 mt-3 max-w-md">
                    {item.text}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full border border-slate-200 text-[9px] text-slate-600 bg-white"
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
      <section className="relative overflow-hidden border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div data-aos="fade-up" className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
              What you'll build
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-900">
              From first pixel{" "}
              <span className="text-[#30AFFF]">to production.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {builds.map((item, index) => (
              <motion.div
                key={item.number}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative min-h-[300px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className="rounded-full border border-white/30 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold tracking-widest text-slate-700">
                    {item.tag}
                  </span>

                  <span className="w-8 h-8 rounded-full border border-white/30 bg-white/95 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-slate-700">
                    {item.number}
                  </span>
                </div>

                <div className="absolute left-5 right-5 bottom-5">
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-5 text-white/70 mt-1.5 max-w-sm">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              data-aos="fade-right"
              className="border-t-2 border-[#30AFFF] pt-4 min-w-0"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                  <Check size={15} className="text-[#30AFFF]" />
                </div>

                <div>
                  <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#159FEF] font-bold shadow-sm">
                    Must have
                  </div>

                  <h3 className="text-xl font-black mt-1 text-slate-900">
                    What we're looking for
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
                    transition={{ duration: 0.45, delay: index * 0.045 }}
                    className="flex gap-3 text-xs sm:text-sm text-slate-600 leading-5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#30AFFF] flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              className="border-t-2 border-slate-300 pt-4 min-w-0"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                  <Sparkles size={15} className="text-[#30AFFF]" />
                </div>

                <div>
                  <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#159FEF] font-bold shadow-sm">
                    Nice to have
                  </div>

                  <h3 className="text-xl font-black mt-1 text-slate-900">
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
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="flex gap-3 text-xs sm:text-sm text-slate-600 leading-5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#30AFFF] flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs leading-5 text-slate-500">
                  Don't match everything? Apply anyway. Strong fundamentals,
                  curiosity and great work can outweigh a missing technology.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div data-aos="fade-up" className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
              Why join us
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-900">
              Build better things,{" "}
              <span className="text-[#30AFFF]">together.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-slate-100">
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
                  className="group py-5 border-b border-slate-100 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-[#30AFFF]/20 bg-[#30AFFF]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#30AFFF]">
                      <Icon
                        size={17}
                        className="text-[#30AFFF] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-[#159FEF] font-bold">
                        0{index + 1}
                      </span>

                      <h3 className="text-sm font-bold mt-0.5 text-slate-800">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-5 text-slate-500 mt-2">
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
      <section id="process" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div data-aos="fade-up" className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
              Hiring process
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-900">
              Simple. Transparent.{" "}
              <span className="text-[#30AFFF]">Human.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-t border-slate-100">
            {process.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                className="relative py-5 border-b border-slate-100 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#159FEF] font-bold">
                    STEP {item.step}
                  </span>
                  <ArrowRight size={14} className="text-slate-300" />
                </div>

                <h3 className="text-base font-bold mt-5 text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs leading-5 text-slate-500 mt-2 max-w-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA IMAGE */}
      <section className="relative overflow-hidden max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          data-aos="zoom-in"
          whileHover={{ y: -4 }}
          className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-3xl border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90"
            alt="Team collaboration"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />

          <div className="relative h-full min-h-[300px] sm:min-h-[360px] flex items-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-3">
                <Sparkles size={13} />
                Your next chapter
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[0.95] text-white">
                Ready to build
                <span className="block text-[#30AFFF]">something great?</span>
              </h2>

              <p className="text-sm leading-6 text-white/70 max-w-lg mt-3">
                Bring your frontend expertise, your curiosity and your obsession
                with great interfaces. We'll bring the problems worth solving.
              </p>

              <motion.button
                onClick={scrollToApply}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#30AFFF] text-white px-6 py-3 text-sm font-bold shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
              >
                Start your application
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
            <div data-aos="fade-right" className="text-center lg:text-left min-w-0">
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-3 shadow-sm">
                FAQ
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[0.95] text-slate-900 lg:whitespace-nowrap">
                Questions, <span className="text-[#30AFFF]">answered.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 leading-6 mt-3 max-w-sm mx-auto lg:mx-0">
                Still wondering if this role is right for you? Here are a few
                things candidates usually ask.
              </p>
            </div>

            <div data-aos="fade-left" className="border-t border-slate-100 min-w-0">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="border-b border-slate-100"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 text-left px-1 sm:px-2 py-4"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {item.q}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown
                          size={16}
                          className="text-slate-400 flex-shrink-0"
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-1 sm:px-2 pb-4">
                            <p className="text-xs sm:text-sm leading-6 text-slate-500 max-w-3xl">
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
      <section id="apply" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            <motion.div
              data-aos="fade-right"
              className="lg:sticky lg:top-24 min-w-0"
            >
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#159FEF] font-bold shadow-sm">
                  Global application
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[0.95] text-slate-900 mt-3">
                  Let's build{" "}
                  <span className="text-[#30AFFF]">the future.</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm leading-6 text-slate-500 mt-3 max-w-md">
                Tell us about your experience and the international opportunity
                you're targeting so we can understand your preferred market,
                work mode and career direction.
              </p>

              {selectedMarket && (
                <div className="mt-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedMarket.flag}
                        alt={selectedMarket.country}
                        className="w-7 h-5 object-cover rounded-sm"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#159FEF] font-bold">
                        Selected market
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">
                        {selectedMarket.country}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="rounded-lg bg-white p-3 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Payout
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {selectedMarket.payout}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Currency
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {selectedMarket.currency}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-6">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-xs text-slate-600"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                    <Mail size={14} className="text-[#30AFFF]" />
                  </div>
                  careers@example.com
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-xs text-slate-600"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                    <Globe2 size={14} className="text-[#30AFFF]" />
                  </div>
                  International · Remote · Hybrid · On-site
                </motion.div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Globe2 size={15} className="text-[#30AFFF]" />
                  <span className="text-xs font-bold text-slate-800">
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
                      className="rounded-lg bg-slate-50 border border-slate-100 p-2.5"
                    >
                      <div className="text-sm font-black text-slate-900">
                        {value}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 justify-center lg:justify-start">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#30AFFF] hover:border-[#30AFFF] transition"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#30AFFF] hover:border-[#30AFFF] transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-xl shadow-slate-100 text-center relative overflow-hidden min-w-0"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#30AFFF]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#30AFFF]/10 text-[#30AFFF] mx-auto flex items-center justify-center mb-6 shadow-inner">
                  <Code2 size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Ready to Apply as Frontend Developer?
                </h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  Click the button below to open the official application popup.
                  Provide your contact details, work preferences, compensation,
                  tech skills, and upload your resume directly to our review pipeline.
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
          setSelectedMarket(null);
        }}
        role="Frontend Developer"
        initialData={
          selectedMarket
            ? {
                preferredJobMarket: selectedMarket.country,
                preferredWorkMode: selectedMarket.modes?.[0] || "",
              }
            : {}
        }
      />

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <motion.div
              data-aos="fade-right"
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#30AFFF] flex items-center justify-center text-[10px] font-black text-white shadow-md shadow-[#30AFFF]/30">
                FE
              </div>

              <span className="text-sm font-black tracking-tight text-slate-900">
                FRONT<span className="text-[#30AFFF]">//</span>END
              </span>
            </motion.div>

            <p className="text-[10px] text-slate-400">
              Building digital experiences that matter.
            </p>

            <motion.div
              data-aos="fade-left"
              className="flex flex-wrap items-center gap-5 text-[11px] text-slate-500"
            >
              <a href="#role" className="hover:text-[#30AFFF] transition">
                Role
              </a>
              <a href="#global" className="hover:text-[#30AFFF] transition">
                Global
              </a>
              <a href="#stack" className="hover:text-[#30AFFF] transition">
                Stack
              </a>
              <a href="#process" className="hover:text-[#30AFFF] transition">
                Process
              </a>
              <a href="#faq" className="hover:text-[#30AFFF] transition">
                FAQ
              </a>

              <button
                onClick={scrollToApply}
                className="text-slate-700 hover:text-[#30AFFF] transition font-semibold"
              >
                Apply →
              </button>
            </motion.div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-slate-400">
            <span>
              © {new Date().getFullYear()} Frontend Careers. All rights
              reserved.
            </span>
            <span>Designed for builders who care about the details.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontendDeveloprs;