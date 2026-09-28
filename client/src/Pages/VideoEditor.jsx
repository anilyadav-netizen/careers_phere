import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Film,
  Video,
  Play,
  Scissors,
  Sparkles,
  Sliders,
  Layers,
  Wand2,
  Volume2,
  Tv,
  Globe2,
  Laptop2,
  Mail,
  Send,
  Loader2,
  AlertCircle,
  Clock3,
  DollarSign,
  MonitorPlay,
  Clapperboard,
  Palette,
  Camera,
  X,
  Menu,
} from "lucide-react";
import {
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaVimeoV,
  FaBehance,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import RoleApplyModal from "../components/RoleApplyModal";
import AOS from "aos";
import "aos/dist/aos.css";

const VideoEditor = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

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

  const scrollToApply = () => {
    setIsApplyModalOpen(true);
    setMenuOpen(false);
  };

  const responsibilities = [
    {
      icon: Film,
      title: "Storytelling & Narrative Pacing",
      text: "Craft captivating story arcs with precise pacing, rhythm and emotional hooks that keep audiences engaged from frame one.",
    },
    {
      icon: Sparkles,
      title: "Motion Graphics & VFX",
      text: "Design kinetic typography, logo reveals, lower thirds, 3D elements and seamless transition effects in After Effects.",
    },
    {
      icon: Volume2,
      title: "Dynamic Sound Design",
      text: "Curate foley sound effects, riser swells, dialogue mastering and music track scoring to deliver an immersive audio experience.",
    },
    {
      icon: Palette,
      title: "Cinematic Color Grading",
      text: "Master color theory, LUTs, skin tone correction and stylized grading using DaVinci Resolve and Lumetri Color.",
    },
    {
      icon: Tv,
      title: "Short-Form & Viral Edits",
      text: "Produce high-retention content tailored for Instagram Reels, YouTube Shorts, and TikTok with punchy captions and zooms.",
    },
    {
      icon: Clapperboard,
      title: "Long-Form & Documentaries",
      text: "Handle multi-cam setups, podcast cuts, case studies and brand documentaries with structured chapter layouts.",
    },
    {
      icon: Sliders,
      title: "Asset & Timeline Optimization",
      text: "Organize raw footage, generate proxies, optimize render caches and manage fast turnaround export pipelines.",
    },
    {
      icon: Wand2,
      title: "Brand Consistency",
      text: "Develop reusable motion templates, graphic presets and color palettes ensuring cohesive brand identity across releases.",
    },
  ];

  const toolsStack = [
    {
      icon: Scissors,
      title: "Adobe Premiere Pro",
      text: "Primary non-linear editing suite for multi-cam sync, sequencing, rough cuts, and final masters.",
      tags: ["NLE", "Sequencing", "Multi-cam"],
      color: "text-[#EA77FF]",
    },
    {
      icon: Sparkles,
      title: "Adobe After Effects",
      text: "Advanced 2D/3D motion design, compositing, visual effects, rotoscoping, and kinetic titles.",
      tags: ["Motion Design", "VFX", "Compositing"],
      color: "text-[#9999FF]",
    },
    {
      icon: Palette,
      title: "DaVinci Resolve",
      text: "Industry standard node-based color grading, HDR mastering, and Fairlight audio post-production.",
      tags: ["Color Grading", "Fairlight", "Color Science"],
      color: "text-[#30AFFF]",
    },
    {
      icon: Volume2,
      title: "Audio & Sound FX",
      text: "Audio restoration, noise reduction, stereo spatialization, EQ balancing, and cinematic SFX layering.",
      tags: ["Audition", "Foley", "Mastering"],
      color: "text-[#00E5FF]",
    },
    {
      icon: Layers,
      title: "Blender / 3D Graphics",
      text: "Creating 3D product renders, dynamic camera projections, and stylized 3D scene elements.",
      tags: ["3D", "Camera Tracking", "Renders"],
      color: "text-[#F5792A]",
    },
    {
      icon: Wand2,
      title: "Modern AI & Workflows",
      text: "Leveraging generative AI audio cleaning, auto-framing, caption styling, and Frame.io collaboration.",
      tags: ["Frame.io", "Automation", "Retention"],
      color: "text-[#30AFFF]",
    },
  ];

  const globalMarkets = [
    {
      flag: "https://flagcdn.com/w80/us.png",
      country: "United States",
      region: "North America",
      currency: "USD",
      payout: "$75K – $130K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "YouTube Creators · SaaS · Tech Media",
      relocation: "Sponsorship may be available",
    },
    {
      flag: "https://flagcdn.com/w80/gb.png",
      country: "United Kingdom",
      region: "Europe",
      currency: "GBP",
      payout: "£50K – £85K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "Digital Agencies · Entertainment · Ads",
      relocation: "Depends on employer",
    },
    {
      flag: "https://flagcdn.com/w80/ca.png",
      country: "Canada",
      region: "North America",
      currency: "CAD",
      payout: "C$65K – C$110K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "Broadcast · Social Media · Creative Studios",
      relocation: "Selected roles support relocation",
    },
    {
      flag: "https://flagcdn.com/w80/de.png",
      country: "Germany",
      region: "Europe",
      currency: "EUR",
      payout: "€50K – €85K",
      modes: ["Hybrid", "On-site", "Remote"],
      focus: "Commercials · Corporate · Tech Video",
      relocation: "Relocation may be available",
    },
    {
      flag: "https://flagcdn.com/w80/au.png",
      country: "Australia",
      region: "APAC",
      currency: "AUD",
      payout: "A$75K – A$125K",
      modes: ["Remote", "Hybrid", "On-site"],
      focus: "Brand Storytelling · Media · E-commerce",
      relocation: "Role & employer dependent",
    },
    {
      flag: "https://flagcdn.com/w80/nl.png",
      country: "Netherlands",
      region: "Europe",
      currency: "EUR",
      payout: "€52K – €88K",
      modes: ["Hybrid", "Remote", "On-site"],
      focus: "International Creative Hubs · SaaS Ads",
      relocation: "Selected roles support relocation",
    },
    {
      flag: "https://flagcdn.com/w80/sg.png",
      country: "Singapore",
      region: "APAC",
      currency: "SGD",
      payout: "S$55K – S$100K",
      modes: ["Hybrid", "On-site", "Remote"],
      focus: "Fintech Media · Regional Production",
      relocation: "Employer dependent",
    },
    {
      flag: "https://flagcdn.com/w80/ae.png",
      country: "United Arab Emirates",
      region: "Middle East",
      currency: "AED",
      payout: "AED 160K – 300K",
      modes: ["On-site", "Hybrid", "Tax-Free"],
      focus: "Luxury Media · Events · Creator Studios",
      relocation: "Relocation packages available",
    },
  ];

  const requirements = [
    "2+ years of professional video editing and post-production experience.",
    "Mastery of Adobe Premiere Pro and Adobe After Effects (or DaVinci Resolve).",
    "A strong showreel / portfolio demonstrating rhythm, visual effects, and story arcs.",
    "Comprehensive understanding of sound design, foley layering, and audio mixing.",
    "Proficiency with color correction, LUTs, and color grading workflows.",
    "Experience creating high-retention short-form videos (Reels, TikTok, Shorts).",
    "Familiarity with collaborative review tools like Frame.io and Google Drive.",
    "Strong attention to detail, typography, pacing, and visual transitions.",
  ];

  const niceToHave = [
    "Experience with 3D elements in Blender or Cinema 4D.",
    "Working knowledge of DaVinci Resolve Fairlight & Fusion.",
    "Experience with thumbnail design and visual packaging.",
    "Understanding of YouTube analytics, CTR, and average view duration (AVD).",
    "Scriptwriting, storyboarding, or camera shooting experience.",
  ];

  const process = [
    {
      step: "01",
      title: "Showreel & Application",
      text: "Submit your best video portfolio, showreel link and international opportunity preferences.",
    },
    {
      step: "02",
      title: "Creative Review",
      text: "Our team reviews your editing style, narrative rhythm, graphics and technical execution.",
    },
    {
      step: "03",
      title: "Paid Editing Test",
      text: "A short, compensated editing challenge using raw footage to see your creative instincts in action.",
    },
    {
      step: "04",
      title: "Creative Director Sync",
      text: "Chat with the lead creative director about role expectations, workflow and team culture.",
    },
    {
      step: "05",
      title: "Offer & Onboarding",
      text: "Receive feedback, agree on compensation, and begin editing high-impact stories.",
    },
  ];

  const faqs = [
    {
      q: "What should I include in my showreel or portfolio?",
      a: "A 60 to 90-second showreel showcasing your best edits, motion graphics, audio sync, and color grading is ideal. You can also provide direct links to YouTube videos, Google Drive folders, Behance, or Vimeo.",
    },
    {
      q: "Can I use DaVinci Resolve instead of Premiere Pro?",
      a: "Yes! While many teams use Premiere Pro and After Effects, skilled DaVinci Resolve editors with strong motion graphics and color grading skills are equally valued.",
    },
    {
      q: "What kind of video projects will I work on?",
      a: "You'll edit a mix of high-retention YouTube documentaries, brand commercials, SaaS product overviews, educational courses, and viral short-form content for global audiences.",
    },
    {
      q: "Is this role remote or is an office required?",
      a: "Most opportunities offer 100% remote flexibility with cloud-based workflows (Frame.io, LucidLink, proxy downloads). Some international teams also offer relocation and hybrid studio positions.",
    },
    {
      q: "What hardware setup is expected?",
      a: "Candidates should possess a reliable computer capable of handling 4K editing and GPU-accelerated motion graphics rendering with high-speed internet for file transfers.",
    },
  ];

  const softReveal = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
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
      {/* Dynamic Background Grid Pattern */}
      <style>{`
        .video-grid {
          background-image:
            linear-gradient(rgba(23,32,42,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,32,42,0.045) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .video-glass {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 video-grid opacity-70" />
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/15 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#75D9FF]/20 blur-[120px]" />

        <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 lg:pt-12 lg:pb-12">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={softReveal}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 border border-[#30AFFF]/35 bg-[#30AFFF]/10 rounded-full px-3 py-1.5 mb-3 md:mb-4 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#30AFFF] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0B6F9F]">
                  We're hiring · Video Editor & Motion Artist
                </span>
              </motion.div>

              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.055em] leading-[0.94] text-[#17202A]">
                Craft visual stories{" "}
                <motion.span
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.35 }}
                  className="inline-block text-[#30AFFF]"
                >
                  that captivate.
                </motion.span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#17202A]/65 leading-relaxed">
                We’re searching for an imaginative video editor who understands narrative
                rhythm, kinetic motion design, punchy soundscapes, and cinematic color
                grading to produce content seen by millions worldwide.
              </p>

              <div className="flex flex-row gap-3 mt-6">
                <motion.button
                  onClick={scrollToApply}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#17202A] text-white px-5 sm:px-6 py-3.5 text-sm font-bold hover:bg-[#30AFFF] transition whitespace-nowrap shadow-md shadow-[#17202A]/10"
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
                  className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl border border-[#17202A]/25 bg-white/80 px-5 sm:px-6 py-3.5 text-sm font-semibold text-[#17202A] hover:text-[#0B6F9F] hover:border-[#30AFFF]/60 transition whitespace-nowrap"
                >
                  Explore global roles
                </motion.a>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">
                {[
                  ["8+", "Global markets"],
                  ["4K / HDR", "Production standard"],
                  ["Remote", "Worldwide flexibility"],
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
                    className="border border-[#17202A]/20 rounded-xl p-3.5 video-glass"
                  >
                    <div className="text-base md:text-xl font-black tracking-tight text-[#17202A]">
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#17202A]/60 mt-0.5">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Media Card */}
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
                className="relative min-h-[380px] md:min-h-[460px] rounded-[28px] overflow-hidden border border-[#17202A]/25 bg-[#17202A] shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=90"
                  alt="Video editing studio timeline"
                  className="absolute inset-0 w-full h-full object-cover opacity-65"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#17202A] via-[#17202A]/25 to-transparent" />
                <div className="absolute inset-0 bg-[#30AFFF]/10" />

                {/* Timeline UI Header */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-[9px] font-bold tracking-[0.18em] text-white">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    REC · 4K 60FPS
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-[9px] font-mono text-[#30AFFF]">
                    00:04:28:14
                  </div>
                </div>

                {/* Center Play Button Graphic */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <Play size={26} className="text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute left-5 right-5 bottom-5">
                  <div className="rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-4">
                    <div className="flex items-center gap-2 text-[#30AFFF] text-[10px] font-bold tracking-widest uppercase">
                      <Sparkles size={13} />
                      Post-Production Excellence
                    </div>

                    <div className="mt-1 text-base md:text-xl font-black tracking-tight text-white">
                      Storytelling that{" "}
                      <span className="text-[#30AFFF]">holds retention.</span>
                    </div>

                    <div className="mt-1 text-xs leading-5 text-white/60">
                      Work with creators, tech companies, and digital studios worldwide.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Float Tags */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 rounded-xl border border-[#17202A]/25 bg-white px-3.5 py-2.5 shadow-xl">
                <div className="w-7 h-7 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Scissors size={14} className="text-[#30AFFF]" />
                </div>
                <div>
                  <div className="text-[9px] text-[#17202A]/50 uppercase font-semibold">
                    Workflows
                  </div>
                  <div className="text-xs font-bold text-[#17202A]">
                    Premiere · AE · DaVinci
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 rounded-xl border border-[#17202A]/25 bg-white px-3.5 py-2.5 shadow-xl">
                <div>
                  <div className="text-[9px] text-[#17202A]/50 uppercase font-semibold">
                    Audio & Color
                  </div>
                  <div className="text-xs font-bold text-[#17202A]">
                    Mastered Sound & Grade
                  </div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#17202A] flex items-center justify-center">
                  <Palette size={14} className="text-[#30AFFF]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROLE / RESPONSIBILITIES */}
      <section id="role" className="border-y border-[#17202A]/15 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              The Creative Role
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-[-0.05em] leading-[0.95] text-[#17202A]">
              Transform raw footage into{" "}
              <span className="text-[#30AFFF]">cinematic masterpieces.</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#17202A]/65 max-w-3xl mx-auto mt-3">
              As our Video Editor, you’ll take concepts, scripts, and multi-cam footage
              to shape dynamic visual narratives with sound design, color grading, and
              kinetic motion design.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#17202A]/15 bg-[#F5F7F9] p-5 transition-all hover:border-[#30AFFF]/60 hover:bg-white hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#17202A] flex items-center justify-center text-white mb-4">
                    <Icon size={19} className="text-[#30AFFF]" />
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono text-[#0B6F9F] font-bold">
                      0{index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-[#17202A]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs leading-5 text-[#17202A]/65">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH / SOFTWARE STACK */}
      <section id="stack" className="bg-[#F5F7F9] py-8 lg:py-12 border-b border-[#17202A]/15">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              Tools & Software
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-[-0.05em] text-[#17202A]">
              Industry-grade <span className="text-[#30AFFF]">creative toolkit.</span>
            </h2>

            <p className="text-sm text-[#17202A]/65 max-w-2xl mx-auto mt-2">
              We leverage standard high-performance software for rapid multi-track sequencing,
              audio sweetening, color grading, and dynamic visual effects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {toolsStack.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className="rounded-2xl border border-[#17202A]/15 bg-white p-5 shadow-xs hover:border-[#30AFFF]/50 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#17202A] flex items-center justify-center">
                      <Icon size={20} className={tool.color} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#17202A]">
                        {tool.title}
                      </h4>
                      <div className="text-[10px] text-[#17202A]/50">
                        Post-Production
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-[#17202A]/65">
                    {tool.text}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#17202A]/10">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold bg-[#F5F7F9] text-[#17202A]/70 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL MARKETS */}
      <section id="global" className="bg-white py-8 lg:py-12 border-b border-[#17202A]/15">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              Global Opportunities
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-[-0.05em] text-[#17202A]">
              Edit for audiences <span className="text-[#30AFFF]">across the world.</span>
            </h2>

            <p className="text-sm text-[#17202A]/65 max-w-2xl mx-auto mt-2">
              Explore international video editing roles offering competitive compensation in
              global currencies, remote setups, or studio relocation support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {globalMarkets.map((market, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 40}
                className="rounded-2xl border border-[#17202A]/15 bg-[#F5F7F9] p-4 hover:border-[#30AFFF]/60 hover:bg-white transition shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={market.flag}
                    alt={market.country}
                    className="w-7 h-5 rounded object-cover shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#17202A]">
                      {market.country}
                    </h4>
                    <span className="text-[10px] text-[#17202A]/50">
                      {market.region}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#17202A]/10">
                  <div className="text-[10px] uppercase tracking-wider text-[#17202A]/50 font-semibold">
                    Expected Payout
                  </div>
                  <div className="text-sm font-black text-[#17202A]">
                    {market.payout}
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-[#0B6F9F] font-semibold">
                  {market.focus}
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {market.modes.map((m) => (
                    <span
                      key={m}
                      className="text-[9px] font-bold bg-white text-[#17202A]/70 px-2 py-0.5 rounded border border-[#17202A]/10"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS & PROCESS */}
      <section id="requirements" className="bg-[#F5F7F9] py-8 lg:py-12 border-b border-[#17202A]/15">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Requirements list */}
            <div data-aos="fade-right" className="rounded-2xl border border-[#17202A]/15 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
                Requirements
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#17202A] tracking-tight">
                What we're looking for
              </h3>

              <div className="space-y-3 mt-4">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#17202A]/75">
                    <div className="w-5 h-5 rounded-full bg-[#17202A] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-[#30AFFF]" />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#17202A]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B6F9F] mb-2">
                  Nice to Have
                </h4>
                <div className="space-y-2">
                  {niceToHave.map((nth, idx) => (
                    <div key={idx} className="text-xs text-[#17202A]/65 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30AFFF]" />
                      <span>{nth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Process */}
            <div id="process" data-aos="fade-left" className="rounded-2xl border border-[#17202A]/15 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-3">
                Hiring Journey
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#17202A] tracking-tight">
                Our simple 5-step process
              </h3>

              <div className="space-y-4 mt-5">
                {process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#17202A] text-[#30AFFF] font-black text-xs flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#17202A]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#17202A]/65 mt-0.5 leading-5">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="bg-white py-8 lg:py-12 border-b border-[#17202A]/15">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center">
            <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0B6F9F] mb-2 shadow-sm">
              Frequently Asked Questions
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#17202A]">
              Got questions? We've got answers.
            </h2>
          </div>

          <div className="space-y-3 mt-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#17202A]/15 bg-[#F5F7F9] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-[#17202A]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-[#0B6F9F] ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-xs leading-6 text-[#17202A]/70 border-t border-[#17202A]/10 pt-2"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM SECTION (#apply) */}
      <section id="apply" className="bg-[#F5F7F9]">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            {/* Left Info Column */}
            <motion.div data-aos="fade-right" className="lg:sticky lg:top-24">
              <div className="inline-flex items-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#0B6F9F] font-bold shadow-sm">
                Video Editor Application
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[0.95] text-[#17202A] mt-2">
                Let’s edit <span className="text-[#30AFFF]">the future.</span>
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-[#17202A]/60 mt-3 max-w-md">
                Tell us about your editing expertise, share your showreel and best project
                links, and select your preferred global market and compensation expectations.
              </p>

              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-xs text-[#17202A]/65">
                  <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center text-white">
                    <Mail size={14} className="text-[#30AFFF]" />
                  </div>
                  creative@careersphere.com
                </div>

                <div className="flex items-center gap-3 text-xs text-[#17202A]/65">
                  <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center text-white">
                    <Globe2 size={14} className="text-[#30AFFF]" />
                  </div>
                  International · Remote · Hybrid · Studio
                </div>
              </div>

              {/* Opportunity Snapshot */}
              <div className="mt-6 rounded-2xl border border-[#17202A]/15 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Film size={15} className="text-[#30AFFF]" />
                  <span className="text-xs font-bold text-[#17202A]">
                    Creative Opportunity Profile
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    ["Markets", "8+"],
                    ["Modes", "3"],
                    ["Currencies", "7"],
                    ["Resolution", "4K+"],
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

              {/* Social Channels */}
              <div className="flex items-center gap-2 mt-5">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] transition"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] transition"
                >
                  <FaVimeoV />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] transition"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-[#17202A]/25 flex items-center justify-center text-[#17202A]/65 hover:text-white hover:bg-[#17202A] transition"
                >
                  <FaInstagram />
                </a>
              </div>
            </motion.div>

            {/* Right CTA Column */}
            <motion.div
              data-aos="fade-left"
              className="bg-white rounded-3xl border border-[#17202A]/15 p-8 sm:p-12 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#30AFFF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#17202A] text-[#30AFFF] mx-auto flex items-center justify-center mb-6 shadow-md">
                  <Film size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#17202A] tracking-tight">
                  Ready to Apply as Video Editor?
                </h3>
                <p className="text-sm text-[#17202A]/70 mt-3 leading-relaxed">
                  Click the button below to launch our official application popup.
                  Submit your contact info, showreel & portfolio links, editing suite
                  proficiencies, and upload your CV directly to our production lead.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#17202A] text-white font-bold text-sm shadow-lg shadow-[#17202A]/20 hover:bg-[#30AFFF] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Open Application Form</span>
                    <ArrowRight size={16} className="text-[#30AFFF]" />
                  </button>
                </div>
                <p className="text-[11px] text-[#17202A]/50 mt-4">
                  ⚡ Takes less than 2 minutes · PDF / DOC / DOCX resume supported
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RoleApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        role="Video Editor"
      />

      {/* FOOTER */}
      <footer className="border-t border-[#17202A]/20 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#17202A] flex items-center justify-center text-[10px] font-black text-white">
                <Film size={15} className="text-[#30AFFF]" />
              </div>

              <span className="text-sm font-black tracking-tight text-[#17202A]">
                VIDEO<span className="text-[#30AFFF]">//</span>EDITOR
              </span>
            </div>

            <p className="text-[10px] text-[#17202A]/45">
              Shaping world-class digital visual experiences.
            </p>

            <div className="flex flex-wrap items-center gap-5 text-[11px] text-[#17202A]/50">
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
                className="text-[#17202A]/80 hover:text-[#30AFFF] transition font-semibold"
              >
                Apply →
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#17202A]/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-[#17202A]/35">
            <span>
              © {new Date().getFullYear()} Video Editor Careers. All rights reserved.
            </span>
            <span>Crafted for visual storytellers and motion artists.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoEditor;
