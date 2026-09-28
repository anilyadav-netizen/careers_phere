import React, { useEffect, useState } from "react";
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
    Menu,
    MessageSquare,
    Send,
    Server,
    Sparkles,
    Terminal,
    Users,
    X,
    Zap,
} from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const FullStackDeveloper = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openFaq, setOpenFaq] = useState();

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
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
        setMobileMenu(false);
    };

    const heroLeft = {
        hidden: { opacity: 0, x: -100, y: 30, scale: 0.92 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const heroRight = {
        hidden: {
            opacity: 0,
            x: 100,
            y: 30,
            scale: 0.86,
            rotate: 3,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 100, scale: 0.86 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.13 },
        },
    };

    const imageLeft = {
        hidden: { opacity: 0, x: -100, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const imageRight = {
        hidden: { opacity: 0, x: 100, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 selection:bg-violet-200">
            {/* NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="h-[68px] flex items-center justify-between">
                        <motion.button
                            onClick={() => scrollToSection("top")}
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <motion.div
                                className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-md shadow-violet-200"
                                whileHover={{ rotate: 8, scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Code2 size={19} className="text-white" />
                            </motion.div>

                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                DEV<span className="text-cyan-500">SPACE</span>
                            </span>
                        </motion.button>

                        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
                            {[
                                ["role", "Role"],
                                ["opportunities", "Opportunities"],
                                ["stack", "Tech Stack"],
                                ["process", "Process"],
                                ["faq", "FAQ"],
                            ].map(([id, label], index) => (
                                <motion.button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="hover:text-violet-600 transition font-medium"
                                    initial={{ opacity: 0, y: -25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.15 + index * 0.1,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{ y: -2, scale: 1.04 }}
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </nav>

                        <motion.button
                            onClick={() => scrollToSection("apply")}
                            className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-600 transition shadow-sm"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{
                                y: -4,
                                scale: 1.03,
                                boxShadow:
                                    "0 12px 25px rgba(15,23,42,0.15)",
                            }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Apply Now
                            <ArrowRight size={15} />
                        </motion.button>

                        <motion.button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden text-slate-700"
                            whileTap={{ scale: 0.85 }}
                        >
                            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
                        </motion.button>
                    </div>

                    <AnimatePresence initial={false}>
                        {mobileMenu && (
                            <motion.div
                                className="md:hidden border-t border-slate-200 py-3 overflow-hidden"
                                initial={{ opacity: 0, height: 0, y: -15 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -15 }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                }}
                            >
                                {[
                                    ["role", "Role"],
                                    ["opportunities", "Opportunities"],
                                    ["stack", "Tech Stack"],
                                    ["process", "Process"],
                                    ["faq", "FAQ"],
                                    ["apply", "Apply Now"],
                                ].map(([id, label], index) => (
                                    <motion.button
                                        key={id}
                                        onClick={() => scrollToSection(id)}
                                        className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.06 }}
                                    >
                                        {label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* HERO */}
            <section
                id="top"
                className="relative overflow-hidden bg-gradient-to-b from-violet-50/40 via-white to-white"
            >
                <div className="absolute -top-40 left-1/4 w-[450px] h-[450px] rounded-full bg-violet-200/40 blur-[120px]" />
                <div className="absolute top-20 right-0 w-[350px] h-[350px] rounded-full bg-cyan-200/40 blur-[110px]" />

                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-7 pb-6 lg:pt-10 lg:pb-8 relative">
                    <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
                        <motion.div
                            variants={heroLeft}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3.5 py-1.5 text-xs font-medium text-violet-600 mb-3 shadow-sm"
                                    initial={{
                                        opacity: 0,
                                        y: -25,
                                        scale: 0.75,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.25,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <Sparkles size={13} />
                                    We're hiring · Full Stack Developer
                                </motion.div>

                                <motion.h1
                                    className="text-2xl md:text-5xl lg:text-[2.5rem] xl:text-[3.2rem] leading-[0.96] font-bold tracking-[-0.05em] text-slate-900"
                                    initial={{
                                        opacity: 0,
                                        y: 60,
                                        scale: 0.92,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    Build things{" "}
                                    <motion.span
                                        className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent inline-block"
                                        initial={{
                                            opacity: 0,
                                            y: 35,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.65,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        people love.
                                    </motion.span>
                                </motion.h1>
                            </div>

                            <motion.p
                                className="mt-3 md:mt-5 max-w-2xl text-[14px] sm:text-lg leading-5 text-slate-500"
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.75 }}
                            >
                                We're looking for a Full Stack Developer who can
                                turn ideas into fast, scalable and beautiful
                                digital products from frontend to backend.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start"
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.9 }}
                            >
                                <motion.button
                                    onClick={() => scrollToSection("apply")}
                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-600 transition shadow-lg shadow-slate-900/10"
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Apply for this role
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{
                                            duration: 1.3,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                    >
                                        <ArrowRight size={16} />
                                    </motion.span>
                                </motion.button>

                                <motion.button
                                    onClick={() => scrollToSection("role")}
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-violet-200 transition shadow-sm"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Explore role
                                </motion.button>
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-slate-500 justify-center sm:justify-start"
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.05 }}
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin size={15} className="text-cyan-500" />
                                    Remote Friendly
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={15} className="text-violet-500" />
                                    Product Engineering
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={15} className="text-amber-500" />
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
                                className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
                                whileHover={{
                                    y: -10,
                                    scale: 1.015,
                                    boxShadow:
                                        "0 25px 50px rgba(15,23,42,0.15)",
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                }}
                            >
                                <div className="h-[250px] sm:h-[310px] lg:h-[350px] relative overflow-hidden">
                                    <motion.img
                                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
                                        alt="Developer working on a computer"
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.18 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 1.5,
                                            delay: 0.3,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        whileHover={{ scale: 1.06 }}
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
                                        transition={{
                                            duration: 0.7,
                                            delay: 1,
                                        }}
                                    >
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/80 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                                            <Code2
                                                size={14}
                                                className="text-cyan-500"
                                            />
                                            Building the future, one commit at a time.
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="p-4 border-t border-slate-100 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[11px] text-slate-400 font-mono">
                                                developer.js
                                            </p>
                                            <p className="text-sm text-slate-700 font-mono mt-1">
                                                <span className="text-violet-600">
                                                    developer
                                                </span>
                                                <span className="text-slate-400">.</span>
                                                <span className="text-cyan-600">
                                                    apply
                                                </span>
                                                <span className="text-slate-800">
                                                    ()
                                                </span>
                                                <span className="text-slate-400">;</span>
                                            </p>
                                        </div>

                                        <div className="flex -space-x-2">
                                            {["JS", "RE", "NO"].map((item, index) => (
                                                <motion.div
                                                    key={item}
                                                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${index === 0
                                                        ? "bg-violet-500"
                                                        : index === 1
                                                            ? "bg-cyan-500"
                                                            : "bg-slate-400"
                                                        }`}
                                                    initial={{
                                                        scale: 0,
                                                        x: 20,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: 1.2 + index * 0.1,
                                                        type: "spring",
                                                    }}
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
                        ].map(([value, label], i) => (
                            <motion.div
                                key={label}
                                variants={cardVariants}
                                className={`rounded-xl border p-4 shadow-sm bg-white ${i % 2 === 0
                                    ? "border-violet-100"
                                    : "border-cyan-100"
                                    }`}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                    boxShadow:
                                        "0 15px 30px rgba(15,23,42,0.08)",
                                }}
                            >
                                <div
                                    className={`text-xl sm:text-2xl font-bold ${i % 2 === 0
                                        ? "text-violet-600"
                                        : "text-cyan-600"
                                        }`}
                                >
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
                className="border-y border-slate-200 bg-gradient-to-b from-slate-50 to-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto text-center mb-5"
                    >
                        <p className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-600 font-semibold">
                            Global opportunities
                        </p>

                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-2 text-slate-900">
                            Find your next opportunity.
                        </h2>

                        <p className="text-sm text-slate-500 leading-5 mt-2 max-w-xl mx-auto">
                            Explore Full Stack Developer opportunities across
                            international markets, with flexible work models
                            and competitive compensation.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm mb-3"
                    >
                        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5 items-center">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-600">
                                        <Code2 size={12} />
                                        Full Stack Developer
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-1 text-[11px] font-semibold text-cyan-600">
                                        <Zap size={12} />
                                        Full Time
                                    </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                                    One role. Multiple global markets.
                                </h3>

                                <p className="text-sm leading-6 text-slate-500 mt-1.5 max-w-2xl">
                                    Choose opportunities based on location,
                                    working style and career goals. Availability
                                    can vary by employer and position.
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {["Remote", "Hybrid", "On-site", "Relocation"].map(
                                        (mode, index) => (
                                            <span
                                                key={mode}
                                                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${index % 2 === 0
                                                    ? "border-violet-200 bg-violet-50 text-violet-600"
                                                    : "border-cyan-200 bg-cyan-50 text-cyan-600"
                                                    }`}
                                            >
                                                <MapPin size={12} />
                                                {mode}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="lg:border-l lg:border-slate-200 lg:pl-6">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-400 font-semibold">
                                    Indicative compensation
                                </p>

                                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                                    $45K – $150K+
                                </div>

                                <p className="text-xs text-slate-500 mt-1">
                                    USD equivalent · annual range
                                </p>

                                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                                    <Globe2
                                        size={15}
                                        className="text-cyan-500"
                                    />
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
                        {opportunityCountries.map((country, index) => (
                            <motion.div
                                key={country.name}
                                variants={cardVariants}
                                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/40 transition"
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                }}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={country.flag}
                                                alt={`${country.name} flag`}
                                                className="w-7 h-5 object-cover rounded-sm shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                {country.name}
                                            </h3>

                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                Full Stack roles
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`w-2 h-2 rounded-full mt-2 ${index % 2 === 0
                                                ? "bg-violet-400"
                                                : "bg-cyan-400"
                                            }`}
                                    />
                                </div>

                                <div className="border-t border-slate-100 mt-4 pt-3">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">
                                        Typical range
                                    </p>

                                    <p className="text-lg font-bold text-slate-900 mt-0.5">
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
                                            className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1 text-[10px] text-slate-500"
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
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 px-1"
                    >
                        <p className="text-[11px] leading-5 text-slate-400 max-w-3xl">
                            Salary ranges are indicative USD-equivalent annual
                            ranges. Actual compensation, availability, work
                            authorization and relocation requirements may vary
                            by employer, location and experience.
                        </p>

                        <button
                            onClick={() => scrollToSection("apply")}
                            className="shrink-0 inline-flex items-center gap-2 text-xs font-semibold text-violet-600 hover:text-violet-700 transition"
                        >
                            Explore & apply
                            <ArrowRight size={14} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ROLE INTRO IMAGE */}
            <section
                id="role"
                className="border-y border-slate-200 bg-gradient-to-b from-slate-50 to-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-5 lg:py-10">
                    <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
                        <div className="lg:sticky lg:top-24">
                            <motion.div
                                variants={imageLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/50"
                            >
                                <motion.img
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
                                    alt="Developer code on screen"
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.15 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2 }}
                                    whileHover={{ scale: 1.06 }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                                <motion.div
                                    className="absolute bottom-4 left-4"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span className="text-xs text-white font-medium bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        Code · Create · Ship
                                    </span>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8 }}
                                className="mt-4"
                            >
                                <div className="text-center">
                                    <p className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold">
                                        The role
                                    </p>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 text-center sm:text-left text-slate-900">
                                    More than just writing code.
                                </h2>

                                <p className="text-sm text-slate-500 leading-5 mt-1 md:mt-3 text-center sm:text-left">
                                    Own problems, make decisions and directly influence
                                    the products we build.
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
                                        className="rounded-xl border border-slate-200 bg-white p-5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 transition shadow-sm"
                                        whileHover={{
                                            y: -10,
                                            scale: 1.025,
                                            transition: { duration: 0.25 },
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-600 flex items-center justify-center text-xs font-bold mb-4"
                                            whileHover={{ rotate: 8, scale: 1.1 }}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </motion.div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                variants={cardVariants}
                                className="mt-3 rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 flex items-start gap-3 shadow-sm"
                                whileHover={{ y: -8, scale: 1.015 }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 12, -12, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                >
                                    <Zap
                                        size={18}
                                        className="text-cyan-500 mt-0.5 shrink-0"
                                    />
                                </motion.div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        High ownership. Real impact.
                                    </h3>

                                    <p className="text-xs text-slate-500 leading-5 mt-1">
                                        You'll have room to suggest better solutions,
                                        improve architecture and influence technical
                                        decisions.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STACK */}
            <section id="stack" className="bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center gap-2 mb-5"
                    >
                        <div>
                            <p className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-600 font-semibold">
                                Technology
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-slate-900">
                                Tools we build with.
                            </h2>
                        </div>

                        <p className="text-sm text-slate-500 leading-5 max-w-md">
                            You don't need to master everything. Strong fundamentals
                            matter more than checking every box.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
                    >
                        {technologies.map((tech, i) => {
                            const Icon = tech.icon;

                            const accents = [
                                "from-violet-100 to-violet-50 text-violet-600",
                                "from-cyan-100 to-cyan-50 text-cyan-600",
                                "from-emerald-100 to-emerald-50 text-emerald-600",
                                "from-amber-100 to-amber-50 text-amber-600",
                                "from-fuchsia-100 to-fuchsia-50 text-fuchsia-600",
                                "from-sky-100 to-sky-50 text-sky-600",
                            ];

                            return (
                                <motion.div
                                    key={tech.name}
                                    variants={cardVariants}
                                    className="group rounded-xl border border-slate-200 bg-white p-5 flex items-center gap-4 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/40 transition shadow-sm"
                                    whileHover={{
                                        y: -10,
                                        scale: 1.035,
                                        transition: { duration: 0.25 },
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${accents[i % accents.length]} flex items-center justify-center`}
                                        whileHover={{ rotate: 8, scale: 1.12 }}
                                    >
                                        <Icon size={20} />
                                    </motion.div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-sm">
                                            {tech.name}
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-1">
                                            {tech.desc}
                                        </p>
                                    </div>

                                    <motion.div
                                        className="ml-auto"
                                        whileHover={{ x: 5 }}
                                    >
                                        <ArrowRight
                                            size={15}
                                            className="text-slate-300 group-hover:text-violet-500 transition"
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* REQUIREMENTS */}
            <section className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-2 gap-3">
                        <motion.div
                            variants={imageLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.12 }}
                            className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm"
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
                                    whileHover={{ scale: 1.06 }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                            </div>

                            <div className="p-6 sm:p-7">
                                <div className="text-center">
                                    <p className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold">
                                        Requirements
                                    </p>

                                    <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                                        What you'll bring.
                                    </h2>
                                </div>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="space-y-2 mt-4"
                                >
                                    {requirements.map((item) => (
                                        <motion.div
                                            key={item}
                                            variants={cardVariants}
                                            className="flex items-start gap-3"
                                        >
                                            <motion.div
                                                className="w-5 h-5 mt-0.5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0"
                                                whileHover={{
                                                    scale: 1.2,
                                                    rotate: 10,
                                                }}
                                            >
                                                <Check size={12} />
                                            </motion.div>

                                            <p className="text-sm leading-6 text-slate-600">
                                                {item}
                                            </p>
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
                            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm"
                        >
                            <div>
                                <div className="flex flex-col items-center text-center">
                                    <p className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-600 font-semibold">
                                        Benefits
                                    </p>

                                    <h2 className="text-2xl md:text-3xl font-bold mt-2 text-center text-slate-900">
                                        Why build with us?
                                    </h2>
                                </div>

                                <motion.div
                                    className="hidden sm:flex w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 items-center justify-center"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                    <Sparkles size={21} />
                                </motion.div>
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
                                        <div className="w-5 h-5 mt-0.5 rounded-md bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                                            <Check size={12} />
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                    scale: 0.95,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8 }}
                                className="mt-8 rounded-xl border border-slate-200 bg-gradient-to-br from-violet-50 to-cyan-50 p-5"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                                            alt="Team member"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
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
            <section id="process" className="bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto mb-5 text-center"
                    >
                        <p className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold">
                            Hiring process
                        </p>

                        <h2 className="text-xl md:text-4xl font-bold mt-2 text-slate-900">
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
                                className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/40 transition shadow-sm"
                                whileHover={{ y: -10, scale: 1.025 }}
                            >
                                <div className="flex items-center justify-between">
                                    <motion.span
                                        className="text-2xl font-bold text-violet-200"
                                        whileHover={{ scale: 1.15, x: 4 }}
                                    >
                                        {item.number}
                                    </motion.span>

                                    {index < process.length - 1 && (
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatDelay: 1,
                                            }}
                                        >
                                            <ArrowRight
                                                size={16}
                                                className="hidden lg:block text-slate-300"
                                            />
                                        </motion.div>
                                    )}
                                </div>

                                <h3 className="font-semibold mt-5 text-slate-900">
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
            <section className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.82,
                            y: 80,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative overflow-hidden rounded-2xl border border-slate-200 min-h-[300px] sm:min-h-[360px] shadow-xl shadow-slate-200/60"
                    >
                        <motion.img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85"
                            alt="Developers collaborating as a team"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ scale: 1.04 }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

                        <motion.div
                            className="relative max-w-2xl p-6 sm:p-8 lg:p-10"
                            initial={{ opacity: 0, x: -70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                        >
                            <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 font-semibold">
                                Your next challenge
                            </p>

                            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight mt-1 md:mt-3 text-slate-900">
                                Don't just find a job.
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                                    Build your next chapter.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-slate-600 leading-6 mt-2 md:mt-4 max-w-xl">
                                Join a team where your ideas matter, your code has
                                impact and there's always something new to learn.
                            </p>

                            <motion.button
                                onClick={() => scrollToSection("apply")}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-600 transition shadow-lg shadow-slate-900/10"
                                whileHover={{ y: -5, scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                Start your application

                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        duration: 1.3,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white border-y border-slate-200">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
                        <motion.div
                            variants={imageLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="flex flex-col items-center text-center"
                        >
                            <p className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-600 font-semibold">
                                FAQ
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
                                Questions?
                            </h2>

                            <p className="text-sm text-slate-500 leading-5 mt-3 max-w-md">
                                Everything you need to know before sending your application.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={imageRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="divide-y divide-slate-200 border-y border-slate-200"
                        >
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.08,
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenFaq(isOpen ? -1 : index)
                                            }
                                            className="w-full flex items-center justify-between gap-5 py-5 text-left group"
                                        >
                                            <span className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-violet-600 transition">
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
                                                    className={`shrink-0 transition-colors ${isOpen
                                                        ? "text-violet-600"
                                                        : "text-slate-400"
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
            {/* APPLICATION */}
            <section id="apply" className="bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
                        <motion.div
                            variants={imageLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="lg:sticky lg:top-24"
                        >
                            <div className="flex flex-col items-center text-center">
                                <p className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold">
                                    Apply now
                                </p>
                                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight mt-2 text-slate-900">
                                    Find your next global opportunity.
                                </h2>
                            </div>

                            <p className="text-slate-500 leading-5 mt-2 md:mt-4 max-w-md">
                                Tell us about yourself, your experience and the kind of global
                                opportunity you're looking for. We'll use your preferences to
                                understand where your profile fits best.
                            </p>

                            <div className="mt-5 space-y-4">
                                <motion.div
                                    className="flex items-center gap-3 text-sm text-slate-600"
                                    whileHover={{ x: 5 }}
                                >
                                    <Globe2 size={17} className="text-cyan-500" />
                                    Global Full Stack opportunities
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 text-sm text-slate-600"
                                    whileHover={{ x: 5 }}
                                >
                                    <MapPin size={17} className="text-violet-500" />
                                    Remote, Hybrid, On-site & Relocation
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 text-sm text-slate-600"
                                    whileHover={{ x: 5 }}
                                >
                                    <MessageSquare size={17} className="text-cyan-500" />
                                    We usually respond within a few business days
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-7 rounded-2xl overflow-hidden h-[190px] border border-slate-200 shadow-lg shadow-slate-200/50"
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <motion.img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85"
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ duration: 0.5 }}
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
                            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/50"
                        >
                            <div className="mb-5 rounded-xl border border-cyan-200 bg-cyan-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 shrink-0 rounded-lg bg-white border border-cyan-200 text-cyan-600 flex items-center justify-center">
                                        <Globe2 size={17} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">
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
                                {/* FULL NAME */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* EMAIL */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* PHONE */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* EXPERIENCE */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Experience *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                    >
                                        <option value="">Select experience</option>
                                        <option>0 - 1 Year</option>
                                        <option>1 - 3 Years</option>
                                        <option>3 - 5 Years</option>
                                        <option>5+ Years</option>
                                    </select>
                                </motion.div>

                                {/* PREFERRED COUNTRY */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Preferred Country *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
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
                                </motion.div>

                                {/* WORK PREFERENCE */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Work Preference *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                    >
                                        <option value="">Select work preference</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                        <option value="Relocation">Relocation</option>
                                        <option value="Remote or Hybrid">Remote or Hybrid</option>
                                        <option value="Open to all">Open to all</option>
                                    </select>
                                </motion.div>

                                {/* CURRENT LOCATION */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Current Location *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Delhi, India"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* EXPECTED SALARY */}
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.45 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Expected Salary *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
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
                                </motion.div>

                                {/* WORK AUTHORIZATION */}
                                <motion.div
                                    className="sm:col-span-2"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Work Authorization *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                    >
                                        <option value="">Select work authorization status</option>
                                        <option>Citizen / Permanent Resident</option>
                                        <option>Valid Work Visa</option>
                                        <option>Eligible to obtain a Work Visa</option>
                                        <option>Require Employer Sponsorship</option>
                                        <option>Open to Relocation / Visa Sponsorship</option>
                                    </select>
                                </motion.div>

                                {/* PORTFOLIO */}
                                <motion.div
                                    className="sm:col-span-2"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.55 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Portfolio / GitHub
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/username"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* TECHNICAL SKILLS */}
                                <motion.div
                                    className="sm:col-span-2"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Technical Skills *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="React, Node.js, MongoDB, Express..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* ABOUT */}
                                <motion.div
                                    className="sm:col-span-2"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.65 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Tell us about yourself
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your experience, projects and the kind of global opportunity you're looking for..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition"
                                    />
                                </motion.div>

                                {/* RESUME */}
                                <motion.div
                                    className="sm:col-span-2"
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Resume *
                                    </label>
                                    <label className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5 cursor-pointer hover:bg-violet-50 hover:border-violet-300 transition">
                                        <span className="text-sm text-slate-500">
                                            Upload your resume
                                        </span>
                                        <span className="text-xs text-violet-600 font-medium">
                                            PDF / DOC
                                        </span>
                                        <input
                                            required
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                        />
                                    </label>
                                </motion.div>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-violet-600 transition shadow-lg shadow-slate-900/10"
                                whileHover={{ y: -5, scale: 1.015 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Submit Application
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        duration: 1.3,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                >
                                    <Send size={16} />
                                </motion.span>
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
            <footer className="border-t border-slate-200 bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex items-center gap-2.5"
                        >
                            <motion.div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-sm"
                                whileHover={{ rotate: 8, scale: 1.1 }}
                            >
                                <Code2 size={16} className="text-white" />
                            </motion.div>

                            <span className="text-sm font-bold text-slate-900">
                                DEV<span className="text-cyan-500">SPACE</span>
                            </span>
                        </motion.div>

                        <motion.p
                            className="text-xs text-slate-400"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            © {new Date().getFullYear()} DevSpace. All rights reserved.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex items-center gap-2"
                        >
                            <motion.a
                                href="#"
                                aria-label="GitHub"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition"
                                whileHover={{ y: -4, scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub size={14} />
                            </motion.a>

                            <motion.a
                                href="#"
                                aria-label="LinkedIn"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition"
                                whileHover={{ y: -4, scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaLinkedinIn size={14} />
                            </motion.a>

                            <motion.a
                                href="mailto:careers@example.com"
                                aria-label="Email"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition"
                                whileHover={{ y: -4, scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Mail size={14} />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FullStackDeveloper;