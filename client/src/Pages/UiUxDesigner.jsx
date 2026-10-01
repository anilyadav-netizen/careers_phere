import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Compass,
  Globe2,
  HeartHandshake,
  Layers,
  Layout,
  MousePointer,
  Palette,
  PenTool,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { SiFigma, SiFramer, SiMiro, SiNotion, SiSketch } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import RoleApplyModal from "../components/RoleApplyModal";
import { fetchPublicOpportunities } from "../redux/slicer/roleOpportunitySlice";

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

const UiUxDesigner = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openFaq } = state;
  const reduxDispatch = useDispatch();

  const { publicList = [], opportunities = [] } = useSelector(
    (state) => state.roleOpportunities || {},
  );
  const activeOpportunities =
    opportunities.length > 0 ? opportunities : publicList;

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    reduxDispatch(fetchPublicOpportunities({ roleCategory: "UI/UX Designer" }));
  }, [reduxDispatch]);

  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  const openApply = (opp = null) => {
    setSelectedOpportunity(opp && opp._id ? opp : null);
    setSelectedMarket(null);
    setIsApplyModalOpen(true);
  };

  const handleMarketApply = (market) => {
    setSelectedMarket(market);
    setSelectedOpportunity(null);
    setIsApplyModalOpen(true);
  };

  const specializations = [
    {
      icon: Layout,
      title: "Product & Interface Architecture",
      text: "Craft intuitive, frictionless web and mobile interfaces that turn complex user workflows into delightfully simple interactions.",
    },
    {
      icon: Layers,
      title: "Scalable Design Systems",
      text: "Architect unified component libraries, design tokens, responsive typography hierarchies, and auto-layout foundations in Figma.",
    },
    {
      icon: Users,
      title: "User Research & Usability Testing",
      text: "Conduct quantitative and qualitative user interviews, usability benchmarking, wireframing, and data-driven journey mapping.",
    },
    {
      icon: MousePointer,
      title: "Micro-Interactions & Prototyping",
      text: "Build hyper-realistic animated prototypes in Framer and Figma to test state transitions, gestural navigation, and motion curves.",
    },
    {
      icon: Palette,
      title: "Visual Identity & Design Polish",
      text: "Define color palettes, spatial balance, accessibility contrast standards (WCAG AAA), and memorable brand-aligned visual design.",
    },
    {
      icon: HeartHandshake,
      title: "Engineering Collaboration",
      text: "Provide pixel-perfect developer handoffs with clear token documentation, responsive states, and edge-case interactive states.",
    },
  ];

  const designTools = [
    { name: "Figma", icon: SiFigma, category: "Core Design & Systems" },
    { name: "Framer", icon: SiFramer, category: "Interactive Prototyping" },
    { name: "Pen & Vector", icon: PenTool, category: "Wireframing & Vectors" },
    { name: "Miro", icon: SiMiro, category: "User Journey & FigJam" },
    { name: "Sketch", icon: SiSketch, category: "Component Libraries" },
    { name: "Notion", icon: SiNotion, category: "Research & Documentation" },
  ];

  const defaultGlobalMarkets = [
    {
      country: "United States",
      flag: "https://flagcdn.com/w80/us.png",
      region: "North America · Remote / Onsite",
      payout: "$75,000 – $145,000",
      roles: "Product Designer · Design Systems",
      modes: ["Remote", "Hybrid", "Relocation"],
    },
    {
      country: "United Kingdom",
      flag: "https://flagcdn.com/w80/gb.png",
      region: "Europe · Tech & Fintech Hub",
      payout: "$65,000 – $130,000",
      roles: "UI/UX Designer · Mobile App UX",
      modes: ["Remote", "Hybrid"],
    },
    {
      country: "Canada",
      flag: "https://flagcdn.com/w80/ca.png",
      region: "North America · Tech Ecosystem",
      payout: "$60,000 – $120,000",
      roles: "Senior UI Designer · SaaS Platforms",
      modes: ["Remote", "Relocation"],
    },
    {
      country: "Germany",
      flag: "https://flagcdn.com/w80/de.png",
      region: "Europe · Berlin & Munich Tech",
      payout: "$65,000 – $125,000",
      roles: "UX Researcher & Product Architect",
      modes: ["Hybrid", "On-site", "Relocation"],
    },
    {
      country: "Australia",
      flag: "https://flagcdn.com/w80/au.png",
      region: "Asia-Pacific · Sydney & Melbourne",
      payout: "$65,000 – $130,000",
      roles: "Interaction Designer · Web & Mobile",
      modes: ["Remote", "Hybrid"],
    },
  ];

  const requirements = [
    "2+ years of hands-on professional product design or UI/UX experience",
    "Strong portfolio showcasing end-to-end design thinking, wireframes, and final UI",
    "Deep mastery of Figma (Auto-layout, Components, Variants, Design Tokens)",
    "Solid grasp of responsive design, accessibility standards (WCAG), and mobile UI heuristics",
    "Experience conducting user interviews, user journey mapping, and usability testing",
    "Ability to collaborate smoothly with frontend developers, engineers, and product managers",
    "Strong attention to detail, visual hierarchy, micro-interactions, and typography",
  ];

  const niceToHave = [
    "Experience with Framer, Principle, Spline 3D or After Effects for motion design",
    "Basic knowledge of HTML/CSS/Tailwind for better developer handoff synchronization",
    "Experience designing for B2B SaaS, mobile fintech, or consumer tech products",
    "Hands-on experience maintaining enterprise-scale design systems",
  ];

  const hiringProcess = [
    {
      step: "01",
      title: "Portfolio & Application",
      text: "Share your Dribbble, Behance, Figma links, or personal portfolio showcasing your best product design work.",
    },
    {
      step: "02",
      title: "Introductory Discovery Call",
      text: "A 25-minute chat to discuss your design philosophy, past projects, career aspirations, and team culture fit.",
    },
    {
      step: "03",
      title: "Deep-Dive Portfolio Walkthrough",
      text: "Present 1-2 detailed case studies walking through problem definition, iterations, trade-offs, and final impact.",
    },
    {
      step: "04",
      title: "Practical Design Exercise",
      text: "A lightweight, take-home or live whiteboard exercise focused on UX reasoning and interface aesthetics.",
    },
    {
      step: "05",
      title: "Team & Cross-Functional Fit",
      text: "Meet engineering and product leads to discuss collaboration, developer handoffs, and feedback loops.",
    },
    {
      step: "06",
      title: "Fast-Track Offer & Onboarding",
      text: "Transparent offer package with competitive international compensation, remote stipend, and onboarding roadmap.",
    },
  ];

  const faqs = [
    {
      question: "Is a live portfolio required to apply?",
      answer:
        "Yes. A portfolio (website, Behance, Dribbble, or Figma prototype showcase) is crucial so our hiring panel can evaluate your design thinking, visual polish, and layout craft.",
    },
    {
      question: "Do I need to know how to code?",
      answer:
        "No coding is required. However, having an understanding of frontend fundamentals (box model, flexbox, grid, component states) helps you create realistic and easily implementable designs.",
    },
    {
      question: "Can I apply for international or remote opportunities?",
      answer:
        "Absolutely. Our partner companies offer remote-first positions, hybrid options, or sponsored relocation depending on role seniority and market eligibility.",
    },
    {
      question: "What design tool does CareerSphere primarily recommend?",
      answer:
        "Figma is the primary industry standard across our hiring partners. Experience with Framer, Miro, or FigJam is a strong additional advantage.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
      {/* =====================================================
          HERO SECTION (HOME PAGE MATCHED STYLE)
      ===================================================== */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-slate-100 bg-white"
      >
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#30AFFF]/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full bg-[#30AFFF]/8 blur-[140px] pointer-events-none" />

        <div className="relative mx-auto w-full max-w-[90rem] px-4 sm:px-5 md:px-6 lg:px-8 pt-6 pb-10 sm:pb-12 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:items-center">
            {/* Left Content */}
            <div data-aos="fade-right" className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold text-[#159FEF] mb-4 shadow-xs">
                <Palette size={14} className="text-[#30AFFF]" />
                <span>Product & Interface Design · UI/UX & Design Systems</span>
              </div>

              <h1 className="text-[clamp(2rem,8vw,3.4rem)] sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.02] text-slate-900">
                Design intuitive digital products with{" "}
                <span className="text-[#30AFFF]">Figma & Design Systems.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-[13px] sm:text-sm md:text-base text-slate-500 leading-relaxed">
                Connect with world-class product teams and tech startups hiring UI/UX Designers.
                Architect user journeys, high-fidelity Figma prototypes, scalable design tokens,
                and WCAG-accessible interfaces that delight global users.
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
                <button
                  type="button"
                  onClick={() => openApply(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#30AFFF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Apply as UI/UX Designer</span>
                  <ArrowRight size={16} className="shrink-0" />
                </button>

                <a
                  href="#opportunities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <span>View Global Roles</span>
                  <ArrowDownRight size={16} className="shrink-0" />
                </a>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-8 pt-6 sm:pt-7 border-t border-slate-100">
                {[
                  { value: "Figma & Framer", label: "Core Tooling" },
                  { value: "Design Tokens", label: "Component Systems" },
                  { value: "WCAG AAA", label: "Accessibility" },
                  { value: "100% Remote", label: "Work Flexibility" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="min-w-0 rounded-2xl border border-[#A0E9FF]/40 bg-white p-3 shadow-xs"
                  >
                    <div className="text-sm sm:text-base font-black text-[#30AFFF] break-words">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FIGMA CANVAS ROLE DEFINING MOCKUP */}
            <div data-aos="fade-left" className="relative min-w-0">
              <div className="relative rounded-3xl border border-[#A0E9FF]/60 bg-slate-950 p-3 sm:p-4 shadow-[0_20px_50px_rgba(48,175,255,0.18)] overflow-hidden">
                {/* Figma Toolbar Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                    <div className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 text-[11px] font-mono text-slate-300">
                      <SiFigma size={12} className="text-[#30AFFF]" />
                      <span>CareerSphere_DesignSystem.fig</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#30AFFF] text-white text-[9px] font-bold flex items-center justify-center border border-slate-900">
                        AK
                      </span>
                      <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center border border-slate-900">
                        SR
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#30AFFF] text-white font-bold text-[10px]">
                      Share
                    </span>
                  </div>
                </div>

                {/* Figma Tool Icons Strip */}
                <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-[#30AFFF] font-bold cursor-pointer"># Frame</span>
                    <span className="hover:text-white cursor-pointer">■ Shape</span>
                    <span className="hover:text-white cursor-pointer">✎ Pen</span>
                    <span className="hover:text-white cursor-pointer">T Text</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span>100%</span>
                    <span>Auto-Layout: ON</span>
                  </div>
                </div>

                {/* Main Canvas with Artboard & Live Cursor */}
                <div className="mt-3 relative rounded-2xl bg-slate-900/95 border border-slate-800 p-4 min-h-[260px] overflow-hidden">
                  {/* Subtle Grid background */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: "radial-gradient(#30AFFF 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Centered Artboard Preview */}
                  <div className="relative mx-auto max-w-[260px] rounded-2xl border-2 border-[#30AFFF] bg-white p-3.5 shadow-2xl">
                    {/* Auto-Layout Dimension Tag */}
                    <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-[#30AFFF] text-white text-[8px] font-mono font-bold tracking-wider uppercase">
                      Frame 420 × 880
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#30AFFF]" />
                        <span className="text-[10px] font-bold text-slate-900">AppScreen</span>
                      </div>
                      <span className="text-[8px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Published
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1.5">
                      <div className="h-3 w-3/4 rounded bg-slate-200" />
                      <div className="h-2 w-full rounded bg-slate-100" />
                      <div className="h-2 w-5/6 rounded bg-slate-100" />
                    </div>

                    {/* Color Palette Swatches inside artboard */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                      <span className="text-[8px] font-bold text-slate-400">Tokens:</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#30AFFF] border border-white shadow-xs" title="#30AFFF" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#102B36] border border-white shadow-xs" title="#102B36" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-white shadow-xs" title="#10B981" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#F7FCFF] border border-slate-200 shadow-xs" title="#F7FCFF" />
                    </div>
                  </div>

                  {/* Simulated Figma Multiplayer Cursor */}
                  <div className="absolute bottom-5 right-6 flex items-start gap-1">
                    <MousePointer size={16} className="text-purple-400 fill-purple-400 -rotate-12" />
                    <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[9px] font-bold shadow-md">
                      Alex (Editing Hero...)
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/15 flex items-center justify-center text-[#30AFFF]">
                  <SiFigma size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">TOOLING</div>
                  <div className="text-xs font-bold text-slate-900">Figma & Design Tokens</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">ACCESSIBILITY</div>
                  <div className="text-xs font-bold text-slate-900">WCAG AAA Standards</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE SPECIALIZATIONS / SKILLS SECTION
      ===================================================== */}
      <section className="bg-slate-50/60 py-12 lg:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 md:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="mx-auto mb-8 sm:mb-10 w-full max-w-2xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
              <Compass size={13} />
              Core Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              What Top Product Teams Look For
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Deliver comprehensive end-to-end design solutions across mobile,
              web, and SaaS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {specializations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-xs hover:border-[#30AFFF]/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#30AFFF]/10 text-[#0B6F9F] flex items-center justify-center mb-4 group-hover:bg-[#30AFFF] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#30AFFF]">
                    <span>In-demand skill</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DESIGN TOOLKIT SECTION
      ===================================================== */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 md:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="text-center max-w-xl mx-auto mb-10"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#30AFFF]">
              Software & Workflow Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Industry Standard Design Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {designTools.map((tool, idx) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 40}
                  className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4 text-center hover:border-[#30AFFF]/40 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200/80 mx-auto flex items-center justify-center text-slate-800 shadow-2xs mb-2 sm:mb-3">
                    <ToolIcon size={24} className="text-[#30AFFF]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {tool.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {tool.category}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          GLOBAL OPPORTUNITIES SECTION (DYNAMIC FROM BACKEND)
      ===================================================== */}
      <section
        id="opportunities"
        className="relative overflow-hidden bg-slate-50/70 py-12 lg:py-16 border-b border-slate-100"
      >
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 md:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
              <Globe2 size={13} />
              Global Design Opportunities
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Design for Global Markets.{" "}
              <span className="text-[#30AFFF]">Work from Anywhere.</span>
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              Explore active international UI/UX Designer opportunities offering
              competitive USD/EUR compensation, remote setups, or studio
              relocation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3.5">
            {activeOpportunities.length > 0
              ? activeOpportunities.map((opp, idx) => {
                  const displaySalary = opp.salary || "Competitive Payout";

                  return (
                    <div
                      key={opp._id || idx}
                      data-aos="fade-up"
                      data-aos-delay={idx * 40}
                      className="group rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-xs hover:border-[#30AFFF]/40 hover:shadow-md transition-all flex flex-col justify-between min-w-0"
                    >
                      <div>
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
                                <Building2
                                  size={18}
                                  className="text-[#30AFFF]"
                                />
                              )}
                            </div>

                            <div className="min-w-0">
                              <h4
                                className="text-sm font-bold text-slate-900 truncate"
                                title={opp.companyName}
                              >
                                {opp.companyName}
                              </h4>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {opp.roleTitle ||
                                  opp.roleCategory ||
                                  "UI/UX Designer"}
                              </span>
                            </div>
                          </div>

                          {opp.salaryCurrency && (
                            <span className="text-[9px] font-bold rounded-md bg-[#30AFFF]/10 text-[#0B6F9F] px-2 py-0.5 shrink-0">
                              {opp.salaryCurrency}
                            </span>
                          )}
                        </div>

                        {/* Hiring Countries & Flags */}
                        <div className="mt-3.5 pt-3 border-t border-slate-100">
                          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
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
                                  {c.flag &&
                                    (c.flag.startsWith("http") ? (
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
                                    ))}
                                  <span>
                                    {c.countryName || "Target Market"}
                                  </span>
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-slate-500 font-medium">
                                Worldwide / Remote
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expected Payout */}
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Indicative Payout
                          </div>
                          <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 break-words">
                            {displaySalary}
                          </div>
                        </div>

                        {/* Skills */}
                        {opp.skills && opp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {opp.skills.slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[9px] font-bold bg-[#30AFFF]/10 text-[#0B6F9F] px-2 py-0.5 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {opp.skills.length > 3 && (
                              <span className="text-[8px] font-bold bg-slate-100 text-slate-600 px-1 py-0.5 rounded">
                                +{opp.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Work Modes */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(opp.workModes || ["Remote", "Hybrid"]).map((m) => (
                            <span
                              key={m}
                              className="text-[9px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* APPLY BUTTON */}
                      <div className="flex justify-end mt-4 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => openApply(opp)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3.5 py-2 text-[10px] font-bold text-white hover:bg-[#159FEF] transition cursor-pointer shadow-xs"
                        >
                          Apply
                          <ArrowRight size={13} className="shrink-0" />
                        </button>
                      </div>
                    </div>
                  );
                })
              : defaultGlobalMarkets.map((market, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 40}
                    className="rounded-2xl border border-slate-200/80 bg-white p-[1.125rem] shadow-xs hover:border-[#30AFFF]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <img
                          src={market.flag}
                          alt={market.country}
                          className="w-7 h-5 rounded object-cover shadow-2xs border border-slate-200"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {market.country}
                          </h4>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {market.region}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Indicative Payout
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 break-words">
                          {market.payout}
                        </div>
                      </div>

                      <div className="mt-2 text-[11px] text-[#0B6F9F] font-semibold">
                        {market.roles}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {market.modes.map((m) => (
                          <span
                            key={m}
                            className="text-[9px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleMarketApply(market)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3.5 py-2 text-[10px] font-bold text-white hover:bg-[#159FEF] transition cursor-pointer shadow-xs"
                      >
                        Apply
                        <ArrowRight size={13} className="shrink-0" />
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          REQUIREMENTS & PROCESS
      ===================================================== */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Requirements Card */}
            <div
              data-aos="fade-right"
              className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs"
            >
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
                Profile Requirements
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                What We Look For in Candidates
              </h3>

              <div className="space-y-3 mt-5">
                {requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#30AFFF] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Nice to have skills
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {niceToHave.map((nth, nIdx) => (
                    <span
                      key={nIdx}
                      className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg"
                    >
                      {nth}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Process */}
            <div
              data-aos="fade-left"
              className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 shadow-xs"
            >
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
                Fast-track Roadmap
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Interview & Selection Process
              </h3>

              <div className="space-y-4 mt-5">
                {hiringProcess.map((proc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3.5 bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/60 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/10 text-[#0B6F9F] flex items-center justify-center shrink-0 font-mono font-black text-xs">
                      {proc.step}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {proc.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {proc.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ ACCORDION
      ===================================================== */}
      <section className="bg-slate-50/60 py-12 lg:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-5 md:px-6">
          <div data-aos="fade-up" className="text-center mb-8">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#30AFFF]">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_FAQ", index: idx })}
                    className="w-full flex items-center justify-between gap-3 p-4 sm:p-[1.125rem] text-left text-sm font-bold text-slate-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={17}
                      className={`text-[#30AFFF] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 sm:px-[1.125rem] text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL APPLICATION CTA SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-5 md:px-6 text-center">
          <div className="rounded-2xl sm:rounded-3xl border border-[#30AFFF]/30 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0F3B66] p-5 sm:p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#30AFFF]/15 blur-[100px] pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase font-bold text-[#30AFFF] mb-3">
              <Sparkles size={12} />
              Fast 2-Minute Application
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Ready to Advance Your UI/UX Career?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
              Submit your portfolio and profile now. Receive an instant email
              confirmation, track your hiring review status in real-time, and
              get connected to premier international opportunities.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => openApply(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-6 sm:px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/35 hover:bg-[#159FEF] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Open Application Form</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              ⚡ Instant email confirmation upon submission · PDF / DOC / DOCX
              supported
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ROLE APPLICATION POPUP MODAL
      ===================================================== */}
      <RoleApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedOpportunity(null);
          setSelectedMarket(null);
        }}
        role="UI/UX Designer"
        opportunity={selectedOpportunity}
        initialData={
          selectedOpportunity
            ? {
                preferredJobMarket:
                  selectedOpportunity.countries?.[0]?.countryName || "",
                preferredWorkMode: selectedOpportunity.workModes?.[0] || "",
              }
            : selectedMarket
              ? {
                  preferredJobMarket: selectedMarket.country,
                  preferredWorkMode: selectedMarket.modes?.[0] || "",
                }
              : {}
        }
      />
    </div>
  );
};

export default UiUxDesigner;
