import React, { useEffect, useReducer, useState } from "react";
import RoleApplyModal from "../components/RoleApplyModal";
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
    Send,
    Sparkles,
    Smartphone,
    DollarSign,
    Plane,
    BriefcaseBusiness,
    Building2,
    Laptop2,
    ShieldCheck,
    BadgeDollarSign,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaAndroid } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/* ---------------- REDUCER ---------------- */

const initialState = {
    openFaq: -1,
    resumeName: "",
    selectedOpportunity: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_FAQ":
            return {
                ...state,
                openFaq: state.openFaq === action.index ? -1 : action.index,
            };
        case "SET_RESUME":
            return { ...state, resumeName: action.payload };
        case "SET_OPPORTUNITY":
            return { ...state, selectedOpportunity: action.payload };
        case "RESET_FAQ":
            return { ...state, openFaq: -1 };
        default:
            return state;
    }
};

const AndroidDeveloper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { openFaq, resumeName, selectedOpportunity } = state;
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

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
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 70 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
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
        { number: "01", title: "Application", desc: "Submit your profile, experience, preferred country and mobile projects." },
        { number: "02", title: "Profile Review", desc: "Our team reviews your experience, skills and global opportunity preferences." },
        { number: "03", title: "Technical Round", desc: "Discuss Android concepts, architecture and real-world projects." },
        { number: "04", title: "Final Interview", desc: "Meet the team and discuss your role, location and expectations." },
    ];

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
            question: "Can I apply for an international Android opportunity from my current country?",
            answer: "Yes. Many opportunities can be remote and may accept candidates from different countries. Each role can have its own location, work authorization and relocation requirements.",
        },
        {
            question: "Are remote, hybrid and on-site opportunities available?",
            answer: "Yes. CareerSphere can showcase different work arrangements depending on the opportunity. Always check the individual role for its available work mode and eligible countries.",
        },
        {
            question: "Can I select multiple preferred countries?",
            answer: "Yes. You can mention your preferred countries or regions and also indicate whether you are open to nearby countries or other international opportunities.",
        },
        {
            question: "Can international jobs offer salary in USD or another currency?",
            answer: "Yes. International opportunities may advertise compensation in USD, EUR, GBP, CAD, AUD or another local currency. You can specify your expected salary and preferred currency in the application.",
        },
        {
            question: "Do I need relocation or work authorization?",
            answer: "It depends on the role. Remote positions may have different requirements, while on-site international roles can require appropriate work authorization or relocation eligibility.",
        },
    ];

    const scrollToSection = (id) => {
        if (id === "apply") {
            setIsApplyModalOpen(true);
            return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];
        dispatch({
            type: "SET_RESUME",
            payload: file ? file.name : "",
        });
    };

    const handleOpportunitySelect = (opportunity) => {
        dispatch({ type: "SET_OPPORTUNITY", payload: opportunity });
        setIsApplyModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
            {/* HERO */}
            <section id="top" className="relative overflow-hidden bg-white">
                <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/8 blur-[110px]" />
                <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#30AFFF]/5 blur-[120px]" />

                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-10 lg:pt-14 lg:pb-12 relative">
                    <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
                        <motion.div variants={fadeLeft} initial="hidden" animate="visible">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#159FEF] mb-3 shadow-sm"
                                >
                                    <Globe2 size={13} />
                                    Global Opportunity · Android Developer
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 35 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[28px] md:text-5xl lg:text-[2.5rem] xl:text-[4rem] leading-[0.96] font-bold tracking-tight text-slate-900"
                                >
                                    Build apps{" "}
                                    <span className="text-[#30AFFF]">
                                        for the world.
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.4 }}
                                    className="mt-3 md:mt-5 max-w-2xl text-sm sm:text-lg leading-6 text-slate-500"
                                >
                                    We're looking for an Android Developer who can
                                    turn product ideas into fast, reliable and
                                    beautiful mobile experiences for users across
                                    the world.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                    className="flex flex-nowrap gap-2 sm:gap-3 mt-5 justify-center md:justify-start"
                                >
                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollToSection("apply")}
                                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#30AFFF] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition whitespace-nowrap"
                                    >
                                        Apply for this role
                                        <ArrowRight size={15} />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollToSection("global")}
                                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 transition shadow-sm whitespace-nowrap"
                                    >
                                        Explore opportunities
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                    className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-slate-500 justify-center md:justify-start"
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe2 size={15} className="text-[#30AFFF]" />
                                        6 Global Markets
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Laptop2 size={15} className="text-[#30AFFF]" />
                                        Remote / Hybrid / On-site
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={15} className="text-[#30AFFF]" />
                                        International Payout
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeRight} initial="hidden" animate="visible">
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
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
                                        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                                            <Globe2 size={14} className="text-[#30AFFF]" />
                                            Global Hiring
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 backdrop-blur-md px-3 py-2 text-xs text-slate-800 shadow-sm">
                                            <DollarSign size={14} className="text-[#30AFFF]" />
                                            International compensation
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-slate-100 bg-white">
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
                                                    className="w-8 h-8 rounded-full border-2 border-white bg-[#30AFFF]/10 flex items-center justify-center text-sm shadow-sm"
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
                                className="rounded-2xl border border-slate-100 p-4 shadow-sm bg-white"
                            >
                                <div className="text-xl sm:text-2xl font-black tracking-tight text-[#30AFFF]">
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
                className="border-y border-slate-100 bg-slate-50/60"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div data-aos="fade-up" className="flex flex-col items-center text-center gap-3 mb-8">
                        <p className="inline-flex items-center gap-2 justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                            <Globe2 size={13} />
                            Global opportunity
                        </p>

                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
                            Choose where your Android career goes.
                        </h2>

                        <p className="text-sm text-slate-500 leading-6 max-w-2xl">
                            Explore opportunities by country, work mode and
                            compensation. Select the market that matches your
                            career goals and tell us your preference in the
                            application.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {globalOpportunities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.country}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 70}
                                    whileHover={{ y: -5 }}
                                    className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                                <img
                                                    src={item.flag}
                                                    alt={`${item.country} flag`}
                                                    className="w-8 h-6 object-cover rounded-sm border border-slate-200 shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-slate-800">
                                                    {item.country}
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    {item.region}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-9 h-9 rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                                            <Icon size={18} />
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <BadgeDollarSign size={17} className="text-[#30AFFF]" />
                                                <span className="text-xs font-medium text-slate-500">
                                                    Indicative payout
                                                </span>
                                            </div>

                                            <span className="text-[11px] text-slate-400">
                                                {item.currency}
                                            </span>
                                        </div>

                                        <p className="text-xl font-black text-slate-900 mt-1">
                                            {item.payout}
                                        </p>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={16} className="text-[#30AFFF] mt-0.5 shrink-0" />
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
                                            <Laptop2 size={16} className="text-[#30AFFF] mt-0.5 shrink-0" />
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
                                                    <Plane size={14} className="text-[#30AFFF]" />
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
                                                    <ShieldCheck size={14} className="text-[#30AFFF]" />
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
                                        className="w-full mt-5 flex items-center justify-center gap-2 rounded-full bg-[#30AFFF] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                                    >
                                        Apply for this market
                                        <ArrowRight size={15} />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div
                        data-aos="fade-up"
                        className="mt-6 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-5 sm:p-6 shadow-sm"
                    >
                        <div className="grid lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
                            <div className="w-12 h-12 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                                <BriefcaseBusiness size={22} />
                            </div>

                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                                    Your application can target a specific global market
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
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30AFFF] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
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
            <section id="role" className="border-y border-slate-100 bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
                        <div data-aos="fade-right" className="lg:sticky lg:top-24">
                            <div className="relative h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.10)]">
                                <img
                                    src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=85"
                                    alt="Android developer working on mobile application"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                                <div className="absolute bottom-4 left-4">
                                    <span className="text-xs text-white font-medium bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        Design · Develop · Deploy · Global
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 text-center lg:text-left">
                                <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                    The role
                                </p>

                                <h2 className="text-2xl md:text-4xl font-black tracking-tight mt-3 text-slate-900">
                                    More than just building apps.
                                </h2>

                                <p className="text-sm text-slate-500 leading-6 mt-3">
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
                                        className="rounded-2xl border border-slate-100 bg-white p-5 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center text-xs font-bold mb-4">
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
                                className="mt-3 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-5 flex items-start gap-3 shadow-sm"
                            >
                                <Globe2 size={18} className="text-[#30AFFF] mt-0.5 shrink-0" />

                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">
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
            <section id="stack" className="bg-slate-50/60">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div data-aos="fade-up" className="flex flex-col items-center text-center gap-3 mb-8">
                        <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                            Technology
                        </p>

                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
                            Tools we build with.
                        </h2>

                        <p className="text-sm text-slate-500 leading-6 max-w-md">
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
                                    className="group rounded-2xl border border-slate-100 bg-white p-5 flex items-center gap-4 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:text-white">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm">
                                            {tech.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {tech.desc}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={15}
                                        className="ml-auto text-slate-300 group-hover:text-[#30AFFF] group-hover:translate-x-1 transition"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* REQUIREMENTS + BENEFITS */}
            <section className="bg-white border-y border-slate-100">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div
                            data-aos="fade-right"
                            className="rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm"
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
                                    <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                        Requirements
                                    </p>

                                    <h2 className="text-2xl md:text-3xl font-black mt-3 text-slate-900">
                                        What you'll bring.
                                    </h2>
                                </div>

                                <div className="space-y-3 mt-5">
                                    {requirements.map((item, index) => (
                                        <div
                                            key={item}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 70}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-5 h-5 mt-0.5 rounded-full bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center shrink-0">
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
                            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm"
                        >
                            <div className="flex flex-col items-center text-center">
                                <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                    Benefits
                                </p>

                                <h2 className="text-2xl md:text-3xl font-black mt-3 text-slate-900">
                                    Why build with us?
                                </h2>

                                <div className="w-12 h-12 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center mt-4">
                                    <Sparkles size={21} />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mt-7">
                                {benefits.map((item, index) => (
                                    <div
                                        key={item}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 70}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-5 h-5 mt-0.5 rounded-md bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center shrink-0">
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
            <section id="process" className="bg-slate-50/60">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div data-aos="fade-up" className="max-w-2xl mx-auto mb-8 text-center">
                        <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                            Hiring process
                        </p>

                        <h2 className="text-2xl md:text-4xl font-black mt-3 text-slate-900">
                            Simple, transparent, human.
                        </h2>

                        <p className="text-sm text-slate-500 mt-3">
                            From application to global opportunity matching.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {process.map((item, index) => (
                            <div
                                key={item.number}
                                data-aos="flip-up"
                                data-aos-delay={index * 120}
                                className="relative rounded-2xl border border-slate-100 bg-white p-5 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-black text-[#30AFFF]/25">
                                        {item.number}
                                    </span>

                                    {index < process.length - 1 && (
                                        <ArrowRight size={16} className="hidden lg:block text-slate-300" />
                                    )}
                                </div>

                                <h3 className="font-bold mt-5 text-slate-800">
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
            <section className="bg-white border-y border-slate-100">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative overflow-hidden rounded-3xl border border-slate-100 min-h-[300px] sm:min-h-[360px] shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85"
                            alt="Mobile development team collaborating globally"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

                        <div className="relative max-w-2xl p-6 sm:p-8 lg:p-10">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                Your global opportunity
                            </p>

                            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight mt-3 text-slate-900">
                                Don't just build an app.{" "}
                                <span className="text-[#30AFFF]">
                                    Build your global career.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-slate-600 leading-6 mt-4 max-w-xl">
                                Choose your preferred country, work mode,
                                compensation and relocation preference and explore
                                opportunities beyond borders.
                            </p>

                            <motion.button
                                whileHover={{ y: -3, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => scrollToSection("apply")}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                            >
                                Start your application
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-slate-50/60 border-y border-slate-100">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12">
                        <div
                            data-aos="fade-right"
                            className="flex flex-col items-center lg:items-start text-center lg:text-left"
                        >
                            <p className="inline-flex items-center justify-center rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                FAQ
                            </p>

                            <h2 className="text-2xl sm:text-4xl font-black mt-3 text-slate-900">
                                Questions?
                            </h2>

                            <p className="text-sm text-slate-500 leading-6 mt-3 max-w-md">
                                Everything you need to know before sending your
                                global application.
                            </p>
                        </div>

                        <div
                            data-aos="fade-left"
                            className="divide-y divide-slate-100 border-y border-slate-100"
                        >
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div key={faq.question}>
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
                                                transition={{ duration: 0.25 }}
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    className={
                                                        isOpen
                                                            ? "shrink-0 text-[#30AFFF]"
                                                            : "shrink-0 text-slate-400"
                                                    }
                                                />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
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
            <section id="apply" className="bg-white">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
                        {/* LEFT */}
                        <div data-aos="fade-right" className="lg:sticky lg:top-24">
                            <div className="text-center lg:text-left">
                                <p className="inline-flex items-center justify-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-bold">
                                    <Globe2 size={13} />
                                    Global application
                                </p>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mt-3 text-slate-900">
                                    Your next chapter
                                    <br />
                                    starts globally.
                                </h2>
                            </div>

                            <p className="text-slate-500 leading-6 mt-4 max-w-md text-sm">
                                Tell us about your Android experience and exactly
                                what kind of international opportunity you're
                                looking for.
                            </p>

                            {selectedOpportunity && (
                                <div className="mt-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl">
                                            {selectedOpportunity.flag}
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#159FEF] font-bold">
                                                Selected market
                                            </p>
                                            <p className="text-sm font-bold text-slate-800 mt-0.5">
                                                {selectedOpportunity.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <div className="rounded-lg bg-white p-3 border border-slate-100">
                                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                                Payout
                                            </p>
                                            <p className="text-xs font-bold text-slate-700 mt-1">
                                                {selectedOpportunity.payout}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-white p-3 border border-slate-100">
                                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                                Mode
                                            </p>
                                            <p className="text-xs font-bold text-slate-700 mt-1">
                                                {selectedOpportunity.mode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                                        <Globe2 size={15} className="text-[#30AFFF]" />
                                    </div>
                                    International opportunities
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                                        <Laptop2 size={15} className="text-[#30AFFF]" />
                                    </div>
                                    Remote · Hybrid · On-site
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                                        <DollarSign size={15} className="text-[#30AFFF]" />
                                    </div>
                                    USD · EUR · GBP · CAD · AUD
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-[#30AFFF]/10 flex items-center justify-center">
                                        <Plane size={15} className="text-[#30AFFF]" />
                                    </div>
                                    Relocation & sponsorship preferences
                                </div>
                            </div>

                            <div
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                className="mt-7 rounded-3xl overflow-hidden h-[190px] border border-slate-100 shadow-[0_15px_45px_rgba(15,23,42,0.10)]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
                                    alt="Developer collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-[0_15px_45px_rgba(15,23,42,0.10)] text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#30AFFF]/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="max-w-xl mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-[#30AFFF]/10 text-[#30AFFF] mx-auto flex items-center justify-center mb-6 shadow-inner">
                                    <Smartphone size={32} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Ready to Apply as Android Developer?
                                </h3>
                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                                    Click the button below to launch the official Android application popup.
                                    Provide your Kotlin / Jetpack Compose skills, Play Store links, compensation
                                    expectations, and upload your resume.
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
                onClose={() => setIsApplyModalOpen(false)}
                role="Android Developer"
                initialData={selectedOpportunity ? {
                    preferredJobMarket: selectedOpportunity.country,
                    preferredWorkMode: selectedOpportunity.mode,
                } : {}}
            />

            {/* FOOTER */}
            <footer
                data-aos="fade-up"
                className="border-t border-slate-100 bg-white"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#30AFFF] flex items-center justify-center text-white shadow-md shadow-[#30AFFF]/30">
                                <FaAndroid size={17} />
                            </div>
                            <span className="text-sm font-black text-slate-900">
                                APP<span className="text-[#30AFFF]">FORGE</span>
                            </span>
                        </div>

                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} AppForge. All rights reserved.
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

export default AndroidDeveloper;