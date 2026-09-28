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
    Send,
    Sparkles,
    X,
    Smartphone,
    DollarSign,
    Plane,
    Clock3,
    BriefcaseBusiness,
    Building2,
    Laptop2,
    ShieldCheck,
    CalendarDays,
    BadgeDollarSign,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaAndroid } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const AndroidDeveloper = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openFaq, setOpenFaq] = useState(-1);
    const [resumeName, setResumeName] = useState("");
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 100,
            mirror: false,
            anchorPlacement: "top-bottom",
        });

        const refreshAOS = () => AOS.refreshHard();
        refreshAOS();

        const timer = setTimeout(() => {
            refreshAOS();
        }, 500);

        window.addEventListener("load", refreshAOS);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", refreshAOS);
        };
    }, []);

    const fadeLeft = {
        hidden: { opacity: 0, x: -70 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 70 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const responsibilities = [
        "Build high-quality and production-ready Android applications for users across different markets.",
        "Develop clean, scalable and maintainable mobile architecture for globally distributed products.",
        "Create smooth and responsive user experiences across Android devices, regions and network conditions.",
        "Integrate REST APIs, databases, authentication, payments and third-party services.",
        "Collaborate with designers, product managers and developers across different countries and time zones.",
        "Debug, optimize and continuously improve application performance for a global user base.",
    ];

    const technologies = [
        { name: "Kotlin", icon: Code2, desc: "Modern Android development" },
        { name: "Jetpack Compose", icon: Smartphone, desc: "Modern native UI" },
        { name: "Android SDK", icon: FaAndroid, desc: "Native app development" },
        { name: "Firebase", icon: Database, desc: "Cloud & app services" },
        { name: "REST APIs", icon: Globe2, desc: "Global backend integrations" },
        { name: "Git & GitHub", icon: Layers3, desc: "Distributed team workflow" },
    ];

    const requirements = [
        "Strong understanding of Kotlin or Java",
        "Hands-on experience with Android Studio and Android SDK",
        "Experience building and publishing Android applications",
        "Good understanding of REST APIs and third-party integrations",
        "Understanding of Android architecture and lifecycle",
        "Ability to work effectively with distributed or international teams",
    ];

    const benefits = [
        "Work on products reaching users across multiple countries",
        "Remote, hybrid and on-site opportunities depending on the role",
        "International compensation and competitive payout opportunities",
        "Work with modern Android development technologies",
        "Collaborate with professionals across different countries and time zones",
        "Relocation opportunities may be available for eligible roles",
    ];

    const process = [
        {
            number: "01",
            title: "Application",
            desc: "Submit your profile, experience, preferred country and mobile projects.",
        },
        {
            number: "02",
            title: "Profile Review",
            desc: "Our team reviews your experience, skills and global opportunity preferences.",
        },
        {
            number: "03",
            title: "Technical Round",
            desc: "Discuss Android concepts, architecture and real-world projects.",
        },
        {
            number: "04",
            title: "Final Interview",
            desc: "Meet the team and discuss your role, location and expectations.",
        },
    ];

    /* GLOBAL OPPORTUNITIES */
    const globalOpportunities = [
        {
            country: "United States",
            region: "North America",
            flag: "https://flagcdn.com/w80/us.png",
            mode: "Remote / Hybrid / On-site",
            payout: "$80K – $140K",
            currency: "USD / Year",
            location: "New York · Austin · Seattle · Remote",
            relocation: "Available for selected roles",
            sponsorship: "May be available",
            icon: Building2,
        },
        {
            country: "United Kingdom",
            region: "Europe",
            flag: "https://flagcdn.com/w80/gb.png",
            mode: "Remote / Hybrid / On-site",
            payout: "£55K – £90K",
            currency: "GBP / Year",
            location: "London · Manchester · Remote",
            relocation: "Available for selected roles",
            sponsorship: "Role dependent",
            icon: Globe2,
        },
        {
            country: "Germany",
            region: "Europe",
            flag: "https://flagcdn.com/w80/de.png",
            mode: "Hybrid / On-site / Remote",
            payout: "€55K – €90K",
            currency: "EUR / Year",
            location: "Berlin · Munich · Hamburg",
            relocation: "Available for selected roles",
            sponsorship: "Role dependent",
            icon: Building2,
        },
        {
            country: "Canada",
            region: "North America",
            flag: "https://flagcdn.com/w80/ca.png",
            mode: "Remote / Hybrid / On-site",
            payout: "C$70K – C$115K",
            currency: "CAD / Year",
            location: "Toronto · Vancouver · Montreal",
            relocation: "Available for selected roles",
            sponsorship: "May be available",
            icon: MapPin,
        },
        {
            country: "Australia",
            region: "Oceania",
            flag: "https://flagcdn.com/w80/au.png",
            mode: "Hybrid / On-site / Remote",
            payout: "A$80K – A$130K",
            currency: "AUD / Year",
            location: "Sydney · Melbourne · Brisbane",
            relocation: "Available for selected roles",
            sponsorship: "Role dependent",
            icon: Plane,
        },
        {
            country: "Global Remote",
            region: "Worldwide",
            flag: "https://flagcdn.com/w80/un.png",
            mode: "Fully Remote",
            payout: "$50K – $110K",
            currency: "USD / Year",
            location: "Work from eligible countries",
            relocation: "Not required",
            sponsorship: "Usually not required",
            icon: Laptop2,
        },
    ];

    const faqs = [
        {
            question:
                "Can I apply for an international Android opportunity from my current country?",
            answer:
                "Yes. Many opportunities can be remote and may accept candidates from different countries. Each role can have its own location, work authorization and relocation requirements.",
        },
        {
            question: "Are remote, hybrid and on-site opportunities available?",
            answer:
                "Yes. CareerSphere can showcase different work arrangements depending on the opportunity. Always check the individual role for its available work mode and eligible countries.",
        },
        {
            question: "Can I select multiple preferred countries?",
            answer:
                "Yes. You can mention your preferred countries or regions and also indicate whether you are open to nearby countries or other international opportunities.",
        },
        {
            question: "Can international jobs offer salary in USD or another currency?",
            answer:
                "Yes. International opportunities may advertise compensation in USD, EUR, GBP, CAD, AUD or another local currency. You can specify your expected salary and preferred currency in the application.",
        },
        {
            question: "Do I need relocation or work authorization?",
            answer:
                "It depends on the role. Remote positions may have different requirements, while on-site international roles can require appropriate work authorization or relocation eligibility.",
        },
    ];

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
        setMobileMenu(false);
    };

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setResumeName("");
            return;
        }

        setResumeName(file.name);
    };

    const handleOpportunitySelect = (opportunity) => {
        setSelectedOpportunity(opportunity);
        scrollToSection("apply");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white text-slate-900 selection:bg-emerald-200">
            {/* NAVBAR */}
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="sticky top-0 z-50 border-b border-emerald-100 bg-white/85 backdrop-blur-xl"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="h-[68px] flex items-center justify-between">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollToSection("top")}
                            className="flex items-center gap-2.5"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-md shadow-emerald-200">
                                <FaAndroid size={20} />
                            </div>

                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                APP<span className="text-emerald-500">FORGE</span>
                            </span>
                        </motion.button>

                        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
                            {[
                                ["role", "Role"],
                                ["global", "Global Opportunity"],
                                ["stack", "Tech Stack"],
                                ["process", "Process"],
                                ["faq", "FAQ"],
                            ].map(([id, label], index) => (
                                <motion.button
                                    key={id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.15 + index * 0.08,
                                        duration: 0.45,
                                    }}
                                    onClick={() => scrollToSection(id)}
                                    className="hover:text-emerald-600 transition font-medium"
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </nav>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => scrollToSection("apply")}
                            className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-sm"
                        >
                            Apply Now
                            <ArrowRight size={15} />
                        </motion.button>

                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden text-slate-700"
                        >
                            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {mobileMenu && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden border-t border-emerald-100 py-3 overflow-hidden"
                            >
                                {[
                                    ["role", "Role"],
                                    ["global", "Global Opportunity"],
                                    ["stack", "Tech Stack"],
                                    ["process", "Process"],
                                    ["faq", "FAQ"],
                                    ["apply", "Apply Now"],
                                ].map(([id, label], index) => (
                                    <motion.button
                                        key={id}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.05,
                                        }}
                                        onClick={() => scrollToSection(id)}
                                        className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                                    >
                                        {label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* HERO */}
            <section
                id="top"
                className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white"
            >
                <div className="absolute -top-40 left-1/4 w-[450px] h-[450px] rounded-full bg-emerald-200/40 blur-[120px]" />
                <div className="absolute top-20 right-0 w-[350px] h-[350px] rounded-full bg-lime-200/40 blur-[110px]" />

                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-7 pb-6 lg:pt-10 lg:pb-8 relative">
                    <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.15,
                                    }}
                                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-medium text-emerald-600 mb-3 shadow-sm"
                                >
                                    <Globe2 size={13} />
                                    Global Opportunity · Android Developer
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 35 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.25,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="text-2xl md:text-5xl lg:text-[2.5rem] xl:text-[4.2rem] leading-[0.96] font-bold tracking-[-0.05em] text-slate-900"
                                >
                                    Build apps{" "}
                                    <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
                                        for the world.
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.4,
                                    }}
                                    className="mt-3 md:mt-5 max-w-2xl text-[14px] sm:text-lg leading-6 text-slate-500"
                                >
                                    We're looking for an Android Developer who can
                                    turn product ideas into fast, reliable and
                                    beautiful mobile experiences for users across
                                    the world.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.5,
                                    }}
                                    className="flex flex-nowrap gap-2 sm:gap-3 mt-3 justify-center md:justify-start"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollToSection("apply")}
                                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-slate-900 px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-lg shadow-slate-900/10 whitespace-nowrap"
                                    >
                                        Apply for this role
                                        <ArrowRight size={15} className="sm:w-4 sm:h-4" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollToSection("global")}
                                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-emerald-200 bg-white px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 transition shadow-sm whitespace-nowrap"
                                    >
                                        Explore opportunities
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.6,
                                    }}
                                    className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-slate-500 justify-center md:justify-start"
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe2
                                            size={15}
                                            className="text-emerald-500"
                                        />
                                        6 Global Markets
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Laptop2
                                            size={15}
                                            className="text-lime-600"
                                        />
                                        Remote / Hybrid / On-site
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <DollarSign
                                            size={15}
                                            className="text-amber-500"
                                        />
                                        International Payout
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50"
                            >
                                <div className="h-[250px] sm:h-[310px] lg:h-[350px] relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=85"
                                        alt="Android mobile application development"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                                    <div className="absolute top-4 left-4 flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/85 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                                            <Globe2
                                                size={14}
                                                className="text-emerald-500"
                                            />
                                            Global Hiring
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/85 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                                            <DollarSign
                                                size={14}
                                                className="text-emerald-500"
                                            />
                                            International compensation
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-emerald-50 bg-white">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[11px] text-slate-400 font-mono">
                                                Android Developer
                                            </p>

                                            <p className="text-sm text-slate-700 font-semibold mt-1">
                                                Remote · Hybrid · On-site
                                            </p>
                                        </div>

                                        <div className="flex -space-x-2">
                                            {["🇺🇸", "🇬🇧", "🇩🇪"].map((flag) => (
                                                <div
                                                    key={flag}
                                                    className="w-8 h-8 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-sm shadow-sm"
                                                >
                                                    {flag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                        {[
                            ["6+", "Global markets"],
                            ["3", "Work modes"],
                            ["$140K+", "Top indicative payout"],
                            ["24/7", "Global teams"],
                        ].map(([value, label], i) => (
                            <div
                                key={label}
                                data-aos={i % 2 === 0 ? "fade-up" : "fade-down"}
                                data-aos-delay={i * 100}
                                className="rounded-xl border border-emerald-100 p-4 shadow-sm bg-white"
                            >
                                <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                                    {value}
                                </div>

                                <div className="text-xs sm:text-sm text-slate-500 mt-1">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GLOBAL OPPORTUNITY */}
            <section
                id="global"
                className="border-y border-emerald-100 bg-gradient-to-b from-white to-emerald-50/60"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7 lg:py-10">
                    <div
                        data-aos="fade-up"
                        className="flex flex-col items-center text-center gap-2 mb-7"
                    >
                        <p className="inline-flex items-center gap-2 justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                            <Globe2 size={13} />
                            Global opportunity
                        </p>

                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Choose where your Android career goes.
                        </h2>

                        <p className="text-sm text-slate-500 leading-6 max-w-2xl">
                            Explore opportunities by country, work mode and
                            compensation. Select the market that matches your
                            career goals and tell us your preference in the
                            application.
                        </p>
                    </div>

                    {/* OPPORTUNITY CARDS */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {globalOpportunities.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.country}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 70}
                                    whileHover={{ y: -5 }}
                                    className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition"
                                >
                                    {/* CARD TOP */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 overflow-hidden">
                                                <img
                                                    src={item.flag}
                                                    alt={`${item.country} flag`}
                                                    className="w-8 h-6 object-cover rounded-sm border border-slate-200 shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    {item.country}
                                                </h3>

                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    {item.region}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-9 h-9 rounded-lg bg-slate-50 text-emerald-600 flex items-center justify-center">
                                            <Icon size={18} />
                                        </div>
                                    </div>

                                    {/* PAYOUT */}
                                    <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <BadgeDollarSign
                                                    size={17}
                                                    className="text-emerald-600"
                                                />

                                                <span className="text-xs font-medium text-slate-500">
                                                    Indicative payout
                                                </span>
                                            </div>

                                            <span className="text-[11px] text-slate-400">
                                                {item.currency}
                                            </span>
                                        </div>

                                        <p className="text-xl font-bold text-slate-900 mt-1">
                                            {item.payout}
                                        </p>
                                    </div>

                                    {/* DETAILS */}
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin
                                                size={16}
                                                className="text-emerald-500 mt-0.5 shrink-0"
                                            />

                                            <div>
                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Available in
                                                </p>

                                                <p className="text-sm text-slate-600 mt-0.5">
                                                    {item.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Laptop2
                                                size={16}
                                                className="text-lime-600 mt-0.5 shrink-0"
                                            />

                                            <div>
                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Work mode
                                                </p>

                                                <p className="text-sm text-slate-600 mt-0.5">
                                                    {item.mode}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-lg bg-slate-50 p-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Plane
                                                        size={14}
                                                        className="text-emerald-500"
                                                    />

                                                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                                        Relocation
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-600 mt-1 leading-5">
                                                    {item.relocation}
                                                </p>
                                            </div>

                                            <div className="rounded-lg bg-slate-50 p-3">
                                                <div className="flex items-center gap-1.5">
                                                    <ShieldCheck
                                                        size={14}
                                                        className="text-lime-600"
                                                    />

                                                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                                        Sponsorship
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-600 mt-1 leading-5">
                                                    {item.sponsorship}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleOpportunitySelect(item)}
                                        className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition"
                                    >
                                        Apply for this market
                                        <ArrowRight size={15} />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                    {/* OPPORTUNITY INFO */}
                    <div
                        data-aos="fade-up"
                        className="mt-5 rounded-2xl border border-emerald-200 bg-white p-5 sm:p-6 shadow-sm"
                    >
                        <div className="grid lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <BriefcaseBusiness size={22} />
                            </div>

                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                    Your application can target a specific global
                                    market
                                </h3>

                                <p className="text-xs sm:text-sm text-slate-500 leading-5 mt-1">
                                    Select your preferred country, work mode,
                                    salary currency, expected payout, relocation
                                    preference and sponsorship requirement. This
                                    gives recruiters a much clearer picture of
                                    the opportunity you're looking for.
                                </p>
                            </div>

                            <button
                                onClick={() => scrollToSection("apply")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition"
                            >
                                Set preferences
                                <ArrowRight size={15} />
                            </button>
                        </div>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 mt-4">
                        * Payout ranges shown above are indicative ranges for
                        presentation purposes. Actual compensation varies by
                        employer, experience, location, employment type and role.
                    </p>
                </div>
            </section>

            {/* ROLE */}
            <section
                id="role"
                className="border-y border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-5 lg:py-10">
                    <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
                        <div
                            data-aos="fade-right"
                            className="lg:sticky lg:top-24"
                        >
                            <div className="relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-emerald-100 shadow-lg shadow-emerald-100/50">
                                <img
                                    src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=85"
                                    alt="Android developer working on mobile application"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />

                                <div className="absolute bottom-4 left-4">
                                    <span className="text-xs text-white font-medium bg-emerald-600/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        Design · Develop · Deploy · Global
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="text-center">
                                    <p className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                                        The role
                                    </p>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 text-center sm:text-left text-slate-900">
                                    More than just building apps.
                                </h2>

                                <p className="text-sm text-slate-500 leading-5 mt-1 md:mt-3 text-center sm:text-left">
                                    Own mobile experiences, solve meaningful
                                    problems and directly influence products built
                                    for a global audience.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {responsibilities.map((item, index) => (
                                    <div
                                        key={item}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        className="rounded-xl border border-emerald-100 bg-white p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-lime-100 text-emerald-600 flex items-center justify-center text-xs font-bold mb-4">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="150"
                                className="mt-3 rounded-xl border border-lime-200 bg-gradient-to-br from-lime-50 to-white p-5 flex items-start gap-3 shadow-sm"
                            >
                                <Globe2
                                    size={18}
                                    className="text-lime-600 mt-0.5 shrink-0"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        Build globally. Think like an owner.
                                    </h3>

                                    <p className="text-xs text-slate-500 leading-5 mt-1">
                                        You'll have room to improve architecture,
                                        suggest better solutions and influence
                                        technical decisions for products serving
                                        users across markets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STACK */}
            <section id="stack" className="bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div
                        data-aos="fade-up"
                        className="flex flex-col items-center text-center gap-2 mb-5"
                    >
                        <p className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                            Technology
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1 text-slate-900">
                            Tools we build with.
                        </h2>

                        <p className="text-sm text-slate-500 leading-5 max-w-md">
                            You don't need to know every tool. Strong Android
                            fundamentals and the ability to work in modern global
                            engineering teams matter more.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {technologies.map((tech, i) => {
                            const Icon = tech.icon;

                            return (
                                <div
                                    key={tech.name}
                                    data-aos="zoom-in"
                                    data-aos-delay={i * 100}
                                    className="group rounded-xl border border-emerald-100 bg-white p-5 flex items-center gap-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/40 transition shadow-sm"
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-sm">
                                            {tech.name}
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-1">
                                            {tech.desc}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={15}
                                        className="ml-auto text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* REQUIREMENTS */}
            <section className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-2 gap-3">
                        <div
                            data-aos="fade-right"
                            className="rounded-2xl overflow-hidden border border-emerald-100 bg-white shadow-sm"
                        >
                            <div className="h-[220px] sm:h-[250px] relative">
                                <img
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85"
                                    alt="Mobile developer workspace"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                            </div>

                            <div className="p-6 sm:p-7">
                                <div className="text-center">
                                    <p className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                                        Requirements
                                    </p>

                                    <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                                        What you'll bring.
                                    </h2>
                                </div>

                                <div className="space-y-2 mt-4">
                                    {requirements.map((item, index) => (
                                        <div
                                            key={item}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 70}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Check size={12} />
                                            </div>

                                            <p className="text-sm leading-6 text-slate-600">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            data-aos="fade-left"
                            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm"
                        >
                            <div className="flex flex-col items-center text-center">
                                <p className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-lime-600 font-semibold">
                                    Benefits
                                </p>

                                <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                                    Why build with us?
                                </h2>

                                <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-600 flex items-center justify-center mt-4">
                                    <Sparkles size={21} />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mt-6">
                                {benefits.map((item, index) => (
                                    <div
                                        key={item}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 70}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-5 h-5 mt-0.5 rounded-md bg-lime-100 text-lime-600 flex items-center justify-center shrink-0">
                                            <Check size={12} />
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" className="bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div
                        data-aos="fade-up"
                        className="max-w-2xl mx-auto mb-5 text-center"
                    >
                        <p className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                            Hiring process
                        </p>

                        <h2 className="text-xl md:text-4xl font-bold mt-2 text-slate-900">
                            Simple, transparent, human.
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            From application to global opportunity matching.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {process.map((item, index) => (
                            <div
                                key={item.number}
                                data-aos="flip-up"
                                data-aos-delay={index * 120}
                                className="relative rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/40 transition shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-emerald-200">
                                        {item.number}
                                    </span>

                                    {index < process.length - 1 && (
                                        <ArrowRight
                                            size={16}
                                            className="hidden lg:block text-slate-300"
                                        />
                                    )}
                                </div>

                                <h3 className="font-semibold mt-5 text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-500 leading-6 mt-2">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-b from-emerald-50/60 to-white border-y border-emerald-100">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="relative overflow-hidden rounded-2xl border border-emerald-100 min-h-[300px] sm:min-h-[360px] shadow-xl shadow-emerald-100/60"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85"
                            alt="Mobile development team collaborating globally"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

                        <div className="relative max-w-2xl p-6 sm:p-8 lg:p-10">
                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                                Your global opportunity
                            </p>

                            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tight mt-1 md:mt-3 text-slate-900">
                                Don't just build an app.{" "}
                                <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                                    Build your global career.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-slate-600 leading-6 mt-2 md:mt-4 max-w-xl">
                                Choose your preferred country, work mode,
                                compensation and relocation preference and explore
                                opportunities beyond borders.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => scrollToSection("apply")}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-lg shadow-slate-900/10"
                            >
                                Start your application
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white border-y border-slate-200">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
                        <div
                            data-aos="fade-right"
                            className="flex flex-col items-center text-center"
                        >
                            <p className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-lime-600 font-semibold">
                                FAQ
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
                                Questions?
                            </h2>

                            <p className="text-sm text-slate-500 leading-5 mt-3 max-w-md">
                                Everything you need to know before sending your
                                global application.
                            </p>
                        </div>

                        <div
                            data-aos="fade-left"
                            className="divide-y divide-slate-200 border-y border-slate-200"
                        >
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div key={faq.question}>
                                        <button
                                            onClick={() =>
                                                setOpenFaq(isOpen ? -1 : index)
                                            }
                                            className="w-full flex items-center justify-between gap-5 py-5 text-left group"
                                        >
                                            <span className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-emerald-600 transition">
                                                {faq.question}
                                            </span>

                                            <motion.div
                                                animate={{
                                                    rotate: isOpen ? 180 : 0,
                                                }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    className={
                                                        isOpen
                                                            ? "shrink-0 text-emerald-600"
                                                            : "shrink-0 text-slate-400"
                                                    }
                                                />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
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
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* APPLICATION */}
            <section
                id="apply"
                className="bg-gradient-to-b from-emerald-50/60 to-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
                        {/* LEFT */}
                        <div
                            data-aos="fade-right"
                            className="lg:sticky lg:top-24"
                        >
                            <div className="flex flex-col items-center text-center">
                                <p className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                                    <Globe2 size={13} />
                                    Global application
                                </p>

                                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight mt-2 text-slate-900">
                                    Your next chapter
                                    <br />
                                    starts globally.
                                </h2>
                            </div>

                            <p className="text-slate-500 leading-5 mt-2 md:mt-4 max-w-md">
                                Tell us about your Android experience and exactly
                                what kind of international opportunity you're
                                looking for.
                            </p>

                            {/* SELECTED OPPORTUNITY */}
                            {selectedOpportunity && (
                                <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                                            {selectedOpportunity.flag}
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-600 font-semibold">
                                                Selected market
                                            </p>

                                            <p className="text-sm font-bold text-slate-900 mt-0.5">
                                                {selectedOpportunity.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                                Payout
                                            </p>

                                            <p className="text-xs font-semibold text-slate-700 mt-1">
                                                {selectedOpportunity.payout}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                                Mode
                                            </p>

                                            <p className="text-xs font-semibold text-slate-700 mt-1">
                                                {selectedOpportunity.mode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-5 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Globe2
                                        size={17}
                                        className="text-emerald-500"
                                    />
                                    International opportunities
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Laptop2
                                        size={17}
                                        className="text-lime-600"
                                    />
                                    Remote · Hybrid · On-site
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <DollarSign
                                        size={17}
                                        className="text-amber-500"
                                    />
                                    USD · EUR · GBP · CAD · AUD
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Plane
                                        size={17}
                                        className="text-emerald-500"
                                    />
                                    Relocation & sponsorship preferences
                                </div>
                            </div>

                            <div
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                className="mt-7 rounded-2xl overflow-hidden h-[190px] border border-emerald-100 shadow-lg shadow-emerald-100/50"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
                                    alt="Developer collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* FORM */}
                        <motion.form
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}
                            transition={{
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert(
                                    "Global application submitted successfully!"
                                );
                            }}
                            className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-7 shadow-xl shadow-emerald-100/50"
                        >
                            <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white text-emerald-600 flex items-center justify-center shrink-0">
                                        <Globe2 size={18} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Global Opportunity Preferences
                                        </h3>

                                        <p className="text-xs text-slate-500 leading-5 mt-1">
                                            Tell us where you want to work, how you
                                            want to work and what compensation you
                                            expect.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* BASIC DETAILS */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Full Name *
                                    </label>

                                    <input
                                        required
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Email Address *
                                    </label>

                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Phone Number *
                                    </label>

                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Experience *
                                    </label>

                                    <select
                                        required
                                        name="experience"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select experience
                                        </option>
                                        <option>0 - 1 Year</option>
                                        <option>1 - 3 Years</option>
                                        <option>3 - 5 Years</option>
                                        <option>5+ Years</option>
                                    </select>
                                </div>

                                {/* CURRENT LOCATION */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Current Country *
                                    </label>

                                    <select
                                        required
                                        name="currentCountry"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select current country
                                        </option>
                                        <option>India</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                        <option>Netherlands</option>
                                        <option>United Arab Emirates</option>
                                        <option>Singapore</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Current Location *
                                    </label>

                                    <input
                                        required
                                        name="currentLocation"
                                        type="text"
                                        placeholder="Delhi, India"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* TARGET COUNTRY */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Preferred Country *
                                    </label>

                                    <select
                                        required
                                        name="preferredCountry"
                                        defaultValue={
                                            selectedOpportunity?.country || ""
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select preferred country
                                        </option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Germany</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Netherlands</option>
                                        <option>France</option>
                                        <option>Singapore</option>
                                        <option>United Arab Emirates</option>
                                        <option>Japan</option>
                                        <option>Any Country</option>
                                    </select>
                                </div>

                                {/* WORK MODE */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Preferred Work Mode *
                                    </label>

                                    <select
                                        required
                                        name="workMode"
                                        defaultValue={
                                            selectedOpportunity?.mode ===
                                                "Fully Remote"
                                                ? "Remote"
                                                : ""
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select work mode
                                        </option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>On-site</option>
                                        <option>Remote or Hybrid</option>
                                        <option>Remote or On-site</option>
                                        <option>Any</option>
                                    </select>
                                </div>

                                {/* COUNTRY FLEXIBILITY */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Country Flexibility *
                                    </label>

                                    <select
                                        required
                                        name="countryFlexibility"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select flexibility
                                        </option>
                                        <option>
                                            Only my preferred country
                                        </option>
                                        <option>
                                            Open to nearby countries
                                        </option>
                                        <option>
                                            Open to multiple countries
                                        </option>
                                        <option>
                                            Open to any country
                                        </option>
                                    </select>
                                </div>

                                {/* RELOCATION */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Relocation Preference *
                                    </label>

                                    <select
                                        required
                                        name="relocation"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select relocation preference
                                        </option>
                                        <option>
                                            Yes, I am open to relocation
                                        </option>
                                        <option>
                                            Yes, with employer support
                                        </option>
                                        <option>
                                            Only for selected countries
                                        </option>
                                        <option>
                                            No, remote preferred
                                        </option>
                                        <option>
                                            Maybe, depending on opportunity
                                        </option>
                                    </select>
                                </div>

                                {/* SPONSORSHIP */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Sponsorship Requirement *
                                    </label>

                                    <select
                                        required
                                        name="sponsorship"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select requirement
                                        </option>
                                        <option>
                                            I don't need sponsorship
                                        </option>
                                        <option>
                                            I need employer sponsorship
                                        </option>
                                        <option>
                                            Open to sponsorship opportunities
                                        </option>
                                        <option>
                                            Remote only
                                        </option>
                                        <option>Not sure</option>
                                    </select>
                                </div>

                                {/* SALARY */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Expected Salary *
                                    </label>

                                    <input
                                        required
                                        name="expectedSalary"
                                        type="number"
                                        min="0"
                                        placeholder="80000"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* CURRENCY */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Salary Currency *
                                    </label>

                                    <select
                                        required
                                        name="salaryCurrency"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select currency
                                        </option>
                                        <option>USD - US Dollar</option>
                                        <option>EUR - Euro</option>
                                        <option>GBP - British Pound</option>
                                        <option>CAD - Canadian Dollar</option>
                                        <option>AUD - Australian Dollar</option>
                                        <option>INR - Indian Rupee</option>
                                        <option>AED - UAE Dirham</option>
                                        <option>SGD - Singapore Dollar</option>
                                        <option>JPY - Japanese Yen</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* PAYOUT TYPE */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Compensation Preference *
                                    </label>

                                    <select
                                        required
                                        name="compensationType"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select preference
                                        </option>
                                        <option>Annual Salary</option>
                                        <option>Monthly Salary</option>
                                        <option>Hourly Rate</option>
                                        <option>Contract / Project Based</option>
                                        <option>Flexible</option>
                                    </select>
                                </div>

                                {/* AVAILABILITY */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Availability / Notice Period *
                                    </label>

                                    <select
                                        required
                                        name="noticePeriod"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select availability
                                        </option>
                                        <option>Immediately</option>
                                        <option>Within 15 days</option>
                                        <option>Within 30 days</option>
                                        <option>Within 60 days</option>
                                        <option>Within 90 days</option>
                                    </select>
                                </div>

                                {/* TIMEZONE */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Preferred Working Time Zone
                                    </label>

                                    <select
                                        name="timezone"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option value="">
                                            Select time zone
                                        </option>
                                        <option>IST - India</option>
                                        <option>GMT - United Kingdom</option>
                                        <option>EST - US Eastern</option>
                                        <option>CST - US Central</option>
                                        <option>PST - US Pacific</option>
                                        <option>CET - Central Europe</option>
                                        <option>AEST - Australia Eastern</option>
                                        <option>Flexible / Any</option>
                                    </select>
                                </div>

                                {/* SKILLS */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Android Skills *
                                    </label>

                                    <input
                                        required
                                        name="skills"
                                        type="text"
                                        placeholder="Kotlin, Jetpack Compose, Firebase, Retrofit, Room, MVVM..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* PORTFOLIO */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Portfolio / GitHub
                                    </label>

                                    <input
                                        name="portfolio"
                                        type="url"
                                        placeholder="https://github.com/username"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* LINKEDIN */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        LinkedIn Profile
                                    </label>

                                    <input
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/username"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* ABOUT */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Tell us about yourself
                                    </label>

                                    <textarea
                                        name="additionalInfo"
                                        rows="4"
                                        placeholder="Tell us about your Android experience, projects, preferred countries, work mode, relocation plans and the kind of international opportunity you're looking for..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition"
                                    />
                                </div>

                                {/* RESUME */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                        Resume *
                                    </label>

                                    <label className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-white text-emerald-600 flex items-center justify-center shrink-0">
                                                <BriefcaseBusiness size={17} />
                                            </div>

                                            <span className="text-sm text-slate-500 truncate">
                                                {resumeName ||
                                                    "Upload your resume"}
                                            </span>
                                        </div>

                                        <span className="text-xs text-emerald-600 font-medium shrink-0">
                                            PDF / DOC
                                        </span>

                                        <input
                                            required
                                            name="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-lg shadow-slate-900/10"
                            >
                                Submit Global Application
                                <Send size={16} />
                            </motion.button>

                            <p className="text-[11px] text-center text-slate-400 mt-3">
                                By submitting this form, you agree to let us
                                review your application and consider you for
                                suitable global opportunities.
                            </p>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                data-aos="fade-up"
                className="border-t border-emerald-100 bg-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center gap-2.5"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-sm">
                                <FaAndroid size={17} />
                            </div>

                            <span className="text-sm font-bold text-slate-900">
                                APP<span className="text-emerald-500">FORGE</span>
                            </span>
                        </motion.div>

                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} AppForge. All rights
                            reserved.
                        </p>

                        <div className="flex items-center gap-2">
                            <motion.a
                                whileHover={{ y: -3 }}
                                href="#"
                                aria-label="GitHub"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition"
                            >
                                <FaGithub size={14} />
                            </motion.a>

                            <motion.a
                                whileHover={{ y: -3 }}
                                href="#"
                                aria-label="LinkedIn"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition"
                            >
                                <FaLinkedinIn size={14} />
                            </motion.a>

                            <motion.a
                                whileHover={{ y: -3 }}
                                href="mailto:careers@example.com"
                                aria-label="Email"
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition"
                            >
                                <Mail size={14} />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AndroidDeveloper;