import React, { useState } from "react";
import {
    ArrowDownRight,
    ArrowRight,
    Check,
    ChevronDown,
    Clock3,
    Code2,
    Database,
    DollarSign,
    GitBranch,
    Globe2,
    Layers3,
    MapPin,
    Menu,
    Network,
    Plane,
    Server,
    ShieldCheck,
    Sparkles,
    Terminal,
    Users,
    X,
    Zap,
} from "lucide-react";
import {
    FaAws,
    FaDocker,
    FaGithub,
    FaNodeJs,
} from "react-icons/fa";
import {
    SiExpress,
    SiMongodb,
    SiPostgresql,
    SiRedis,
} from "react-icons/si";

const BackendDeveloper = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(-1);

    const responsibilities = [
        {
            icon: Server,
            title: "Design scalable APIs",
            text: "Build clean, secure and maintainable REST APIs that power reliable product experiences.",
        },
        {
            icon: Database,
            title: "Own data architecture",
            text: "Design schemas, queries and data flows that remain reliable as traffic and product complexity grow.",
        },
        {
            icon: Network,
            title: "Build service layers",
            text: "Create modular backend services with clear responsibilities, predictable communication and strong boundaries.",
        },
        {
            icon: ShieldCheck,
            title: "Engineer security",
            text: "Implement authentication, authorization, validation and defensive backend practices across the platform.",
        },
        {
            icon: Zap,
            title: "Improve performance",
            text: "Find bottlenecks, optimize queries, introduce caching and make critical workflows faster.",
        },
        {
            icon: GitBranch,
            title: "Ship with confidence",
            text: "Work with Git, reviews, testing and deployment workflows to deliver production-ready changes.",
        },
    ];

    const stack = [
        {
            icon: FaNodeJs,
            name: "Node.js",
            text: "Production APIs and backend services",
        },
        {
            icon: SiExpress,
            name: "Express",
            text: "Fast and maintainable API architecture",
        },
        {
            icon: SiMongodb,
            name: "MongoDB",
            text: "Flexible document-based data systems",
        },
        {
            icon: SiPostgresql,
            name: "PostgreSQL",
            text: "Reliable relational data architecture",
        },
        {
            icon: SiRedis,
            name: "Redis",
            text: "Caching, sessions and fast data access",
        },
        {
            icon: FaDocker,
            name: "Docker",
            text: "Consistent development and deployment",
        },
        {
            icon: FaAws,
            name: "AWS",
            text: "Cloud infrastructure and production systems",
        },
    ];

    const systems = [
        {
            number: "01",
            title: "API Architecture",
            text: "Create predictable API contracts, authentication flows, validation layers and service boundaries that frontend teams can confidently build on.",
            image:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=90",
            icon: Code2,
        },
        {
            number: "02",
            title: "Data Infrastructure",
            text: "Build data models and persistence layers that balance performance, consistency and long-term maintainability.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90",
            icon: Database,
        },
        {
            number: "03",
            title: "Cloud Systems",
            text: "Help move products from local development to resilient production infrastructure with monitoring and deployment discipline.",
            image:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=90",
            icon: Globe2,
        },
    ];

    const globalOpportunities = [
        {
            icon: Globe2,
            title: "International roles",
            text: "Discover backend opportunities with companies hiring talent across international markets.",
        },
        {
            icon: DollarSign,
            title: "USD payouts",
            text: "Compare compensation in USD so international opportunities are easier to understand.",
        },
        {
            icon: Plane,
            title: "Remote & relocation",
            text: "Choose remote-first roles or positions that can support relocation to another country.",
        },
        {
            icon: MapPin,
            title: "Global markets",
            text: "Explore opportunities across the US, UK, Canada, Australia, Germany and other markets.",
        },
    ];

    const globalCountries = [
        {
            code: "US",
            name: "United States",
            flag: "https://flagcdn.com/w80/us.png",
            text: "Technology & product companies",
        },
        {
            code: "UK",
            name: "United Kingdom",
            flag: "https://flagcdn.com/w80/gb.png",
            text: "Startups & established teams",
        },
        {
            code: "CA",
            name: "Canada",
            flag: "https://flagcdn.com/w80/ca.png",
            text: "Remote & relocation roles",
        },
        {
            code: "AU",
            name: "Australia",
            flag: "https://flagcdn.com/w80/au.png",
            text: "Engineering opportunities",
        },
        {
            code: "DE",
            name: "Germany",
            flag: "https://flagcdn.com/w80/de.png",
            text: "European tech ecosystem",
        },
    ];

    const countryDetails = {
        US: {
            roles: "Backend roles",
            salary: "$70K – $150K+",
            modes: ["Remote", "Hybrid", "On-site"],
        },
        UK: {
            roles: "Backend roles",
            salary: "$55K – $120K+",
            modes: ["Remote", "Hybrid", "On-site"],
        },
        CA: {
            roles: "Backend roles",
            salary: "$50K – $115K+",
            modes: ["Remote", "Hybrid", "Relocation"],
        },
        AU: {
            roles: "Backend roles",
            salary: "$55K – $125K+",
            modes: ["Hybrid", "On-site", "Relocation"],
        },
        DE: {
            roles: "Backend roles",
            salary: "$50K – $115K+",
            modes: ["Hybrid", "On-site", "Relocation"],
        },
    };

    const requirements = [
        "2+ years of professional backend development experience",
        "Strong understanding of Node.js and JavaScript or TypeScript",
        "Experience building and maintaining REST APIs",
        "Good knowledge of MongoDB, PostgreSQL or similar databases",
        "Understanding of authentication, authorization and API security",
        "Comfortable working with Git and collaborative development workflows",
        "Ability to debug production issues and reason about system behavior",
        "Strong communication and ownership mindset",
    ];

    const niceToHave = [
        "Experience with AWS or another cloud platform",
        "Hands-on Docker and CI/CD experience",
        "Redis, queues or background-job experience",
        "Microservices or distributed systems exposure",
        "Testing with Jest, Supertest or similar tools",
        "Experience with observability and application monitoring",
    ];

    const benefits = [
        {
            icon: Users,
            title: "Strong engineering team",
            text: "Work with developers who care about clean systems, thoughtful reviews and long-term quality.",
        },
        {
            icon: Zap,
            title: "Real product ownership",
            text: "Your backend decisions directly influence products used by real people and businesses.",
        },
        {
            icon: Clock3,
            title: "Flexible work culture",
            text: "Focused work, practical communication and flexibility without unnecessary process.",
        },
        {
            icon: Sparkles,
            title: "Continuous growth",
            text: "Explore architecture, cloud infrastructure, performance and modern backend practices.",
        },
    ];

    const process = [
        {
            step: "01",
            title: "Application",
            text: "Share your experience, projects and the kind of backend problems you enjoy solving.",
        },
        {
            step: "02",
            title: "Intro call",
            text: "A short conversation to understand your background, goals and engineering approach.",
        },
        {
            step: "03",
            title: "Technical round",
            text: "Discuss APIs, databases, architecture, debugging and practical backend scenarios.",
        },
        {
            step: "04",
            title: "Practical task",
            text: "Solve a focused engineering problem that reflects the kind of work you would actually do.",
        },
        {
            step: "05",
            title: "Team discussion",
            text: "Meet the team and talk through collaboration, ownership and technical decision-making.",
        },
        {
            step: "06",
            title: "Offer",
            text: "If everything aligns, we move quickly with the offer and onboarding process.",
        },
    ];

    const faqs = [
        {
            question: "Do I need to know every technology in the stack?",
            answer:
                "No. Strong backend fundamentals matter more than checking every technology box. We value people who can learn quickly, reason clearly and build reliable systems.",
        },
        {
            question: "Is this role only for Node.js developers?",
            answer:
                "Node.js is an important part of our stack, but experience with another backend ecosystem can also be valuable if you understand APIs, databases, architecture and production systems.",
        },
        {
            question: "Will I work directly with frontend developers?",
            answer:
                "Yes. Backend engineers work closely with frontend engineers and product teams to design API contracts, data flows and complete product experiences.",
        },
        {
            question: "What level of backend ownership will I get?",
            answer:
                "You will be expected to own features beyond writing endpoints. That can include data modeling, architecture decisions, performance, security, testing and deployment.",
        },
        {
            question: "Can I apply if I have experience with a different database?",
            answer:
                "Absolutely. Experience with MySQL, PostgreSQL, MongoDB or another production database can transfer well when you understand data modeling, indexing, queries and consistency.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4EFE8] text-[#211A17]">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 h-[68px] border-b border-[#211A17]/10 bg-[#F4EFE8]/95 backdrop-blur-xl">
                <div className="max-w-[90rem] mx-auto h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">
                    <a href="#top" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#211A17] text-[#F4EFE8] flex items-center justify-center">
                            <Server size={18} />
                        </div>
                        <div>
                            <div className="text-[15px] font-black tracking-[-0.03em]">
                                Backend<span className="text-[#B84A39]">Lab</span>
                            </div>
                            <div className="text-[8px] uppercase tracking-[0.18em] text-[#211A17]/45 font-bold">
                                Engineering careers
                            </div>
                        </div>
                    </a>

                    <div className="hidden lg:flex items-center gap-7 text-[12px] font-bold text-[#211A17]/65">
                        <a href="#role" className="hover:text-[#B84A39] transition">
                            Role
                        </a>
                        <a href="#stack" className="hover:text-[#B84A39] transition">
                            Stack
                        </a>
                        <a href="#global-opportunities" className="hover:text-[#B84A39] transition">
                            Global Jobs
                        </a>
                        <a href="#process" className="hover:text-[#B84A39] transition">
                            Process
                        </a>
                        <a href="#faq" className="hover:text-[#B84A39] transition">
                            FAQ
                        </a>
                        <a
                            href="#apply"
                            className="px-4 py-2.5 rounded-full bg-[#B84A39] text-white hover:bg-[#963A2D] transition"
                        >
                            Apply now
                        </a>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden w-10 h-10 rounded-xl border border-[#211A17]/10 flex items-center justify-center"
                    >
                        {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="lg:hidden border-t border-[#211A17]/10 bg-[#F4EFE8] px-5 py-4">
                        <div className="flex flex-col gap-1 text-sm font-bold">
                            <a
                                href="#role"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 rounded-xl hover:bg-[#211A17]/5"
                            >
                                Role
                            </a>
                            <a
                                href="#stack"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 rounded-xl hover:bg-[#211A17]/5"
                            >
                                Stack
                            </a>
                            <a
                                href="#global-opportunities"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 rounded-xl hover:bg-[#211A17]/5"
                            >
                                Global Jobs
                            </a>
                            <a
                                href="#process"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 rounded-xl hover:bg-[#211A17]/5"
                            >
                                Process
                            </a>
                            <a
                                href="#faq"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 rounded-xl hover:bg-[#211A17]/5"
                            >
                                FAQ
                            </a>
                            <a
                                href="#apply"
                                onClick={() => setMobileOpen(false)}
                                className="mt-1 px-4 py-3 rounded-xl bg-[#B84A39] text-white"
                            >
                                Apply now
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* HERO */}
            <section id="top">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-4 lg:pt-7 lg:pb-6">
                    <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#B84A39]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#A94332] mb-2 md:mb-4">
                                <Server size={13} />
                                We’re hiring · Backend Developer
                            </div>

                            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[3.4rem] leading-[1.1] tracking-[-0.055em] font-bold max-w-4xl">
                                Build the systems{" "}
                                <span>behind the product.</span>
                            </h1>

                            <p className="mt-2 md:mt-5 text-[15px] sm:text-[16px] leading-7 text-[#211A17]/62 max-w-2xl">
                                We’re looking for a Backend Developer who enjoys turning
                                complex product requirements into reliable APIs, clean data
                                systems and infrastructure that scales.
                            </p>

                            <div className="mt-6 flex flex-row gap-2 sm:gap-3 w-full">
                                <a
                                    href="#apply"
                                    className="min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#211A17] text-[#F4EFE8] px-3 sm:px-5 py-3 text-xs sm:text-sm font-bold text-center hover:bg-[#342822] transition"
                                >
                                    <span>Apply for this role</span>
                                    <ArrowRight size={15} className="shrink-0" />
                                </a>

                                <a
                                    href="#role"
                                    className="min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#211A17]/15 px-3 sm:px-5 py-3 text-xs sm:text-sm font-bold text-center hover:bg-[#211A17]/5 transition"
                                >
                                    <span>Explore the role</span>
                                    <ArrowDownRight size={15} className="shrink-0" />
                                </a>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                                {[
                                    ["02+", "Years"],
                                    ["07", "Core tools"],
                                    ["06", "Hiring stages"],
                                    ["100%", "Ownership"],
                                ].map(([value, label]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-[#211A17]/10 bg-[#FBF8F4] px-4 py-3.5"
                                    >
                                        <div className="text-xl font-black tracking-[-0.04em]">
                                            {value}
                                        </div>
                                        <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-bold text-[#211A17]/40">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-[2rem] border border-[#211A17]/10 bg-[#211A17] shadow-[0_25px_70px_rgba(33,26,23,0.15)]">
                                <div className="relative h-[330px] sm:h-[470px]">
                                    <img
                                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=90"
                                        alt="Backend infrastructure server room"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#211A17]/95 via-[#211A17]/15 to-transparent" />

                                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                                        <div className="rounded-full bg-[#F4EFE8]/90 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] font-black text-[#211A17]">
                                            Production infrastructure
                                        </div>
                                        <div className="flex items-center gap-1.5 rounded-full bg-[#211A17]/75 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold text-[#F4EFE8] backdrop-blur">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4A]" />
                                            Systems online
                                        </div>
                                    </div>

                                    <div className="absolute left-5 right-5 bottom-5">
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                ["API", "Healthy"],
                                                ["DB", "Stable"],
                                                ["CACHE", "Fast"],
                                            ].map(([name, value]) => (
                                                <div
                                                    key={name}
                                                    className="rounded-xl border border-white/15 bg-[#211A17]/70 backdrop-blur-md p-3"
                                                >
                                                    <div className="text-[9px] uppercase tracking-[0.16em] text-white/45 font-bold">
                                                        {name}
                                                    </div>
                                                    <div className="mt-1 text-xs font-black text-white">
                                                        {value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute top-52 -left-5 w-40 rounded-2xl bg-[#C88A4A] p-4 shadow-xl">
                                <div className="text-[9px] uppercase tracking-[0.16em] font-black text-[#211A17]/60">
                                    Your mindset
                                </div>
                                <div className="mt-1 text-sm font-black text-[#211A17]">
                                    Simple systems. Serious impact.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROLE */}
            <section id="role" className="border-y border-[#211A17]/10 bg-[#EAE1D7]">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-5 lg:py-10">
                    <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
                        <div>
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#211A17]/10 bg-[#F4EFE8] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#B84A39] mb-3">
                                    <Layers3 size={13} />
                                    The role
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] leading-[1]">
                                    Backend is where
                                    <span className="block text-[#B84A39]">
                                        everything connects.
                                    </span>
                                </h2>

                                <p className="mt-2 md:mt-4 text-sm leading-5 text-[#211A17]/60 max-w-lg mx-auto lg:mx-0">
                                    You’ll work on the invisible layer that makes every product
                                    interaction possible — from authentication and APIs to
                                    databases, queues, caching and cloud infrastructure.
                                </p>
                            </div>

                            <div className="mt-3 md:mt-6 rounded-2xl bg-[#211A17] p-5 text-[#F4EFE8]">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-black text-[#C88A4A]">
                                    <Terminal size={13} />
                                    Engineering principle
                                </div>
                                <p className="mt-3 text-lg leading-7 font-bold tracking-[-0.02em]">
                                    “Make complexity predictable, and make production boring.”
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {responsibilities.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-[#211A17]/10 bg-[#F7F2EC] p-5 hover:-translate-y-0.5 transition"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#B84A39]/10 text-[#B84A39] flex items-center justify-center">
                                            <Icon size={19} />
                                        </div>
                                        <h3 className="mt-4 text-sm font-black">{item.title}</h3>
                                        <p className="mt-2 text-xs leading-5 text-[#211A17]/55">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* STACK */}
            <section id="stack">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#B84A39]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#A94332] mb-1">
                                <Code2 size={13} />
                                Our stack
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em]">
                                Tools that turn
                                <span className="text-[#B84A39]"> ideas into systems.</span>
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm leading-5 text-[#211A17]/55 mx-auto">
                            You don’t have to know everything from day one. What matters is
                            that you understand why a tool belongs in the architecture and
                            how to use it responsibly.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 md:mt-6">
                        {stack.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.name}
                                    className="rounded-2xl border border-[#211A17]/10 bg-[#FBF8F4] p-5"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-[#211A17] text-[#F4EFE8] flex items-center justify-center text-xl">
                                        <Icon />
                                    </div>
                                    <h3 className="mt-4 text-sm font-black">{item.name}</h3>
                                    <p className="mt-1.5 text-xs leading-5 text-[#211A17]/50">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SYSTEMS */}
            <section className="bg-[#211A17] text-[#F4EFE8]">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#C88A4A]/25 bg-[#C88A4A]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#D6A76A] mb-3">
                            <Network size={13} />
                            What you’ll build
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em] leading-[1]">
                            Not just endpoints.
                            <span className="block text-[#C88A4A]">
                                Complete backend systems.
                            </span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-3 mt-6">
                        {systems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.number}
                                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                                >
                                    <div className="relative h-40 md:h-52 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#211A17] via-transparent to-transparent" />

                                        <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-[#F4EFE8] text-[#211A17] flex items-center justify-center">
                                            <Icon size={17} />
                                        </div>

                                        <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.18em] text-[#C88A4A] font-black">
                                            {item.number}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-black">{item.title}</h3>
                                        <p className="mt-2 text-xs leading-5 text-white/50">
                                            {item.text}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-black text-[#C88A4A]">
                                            Explore systems
                                            <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* GLOBAL OPPORTUNITIES */}
            <section
                id="global-opportunities"
                className="border-y border-[#211A17]/10 bg-[#EAE1D7]"
            >
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7 lg:py-10">
                    {/* HEADER */}
                    <div className="max-w-2xl mx-auto text-center mb-6">
                        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#F4EFE8] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#B84A39] font-black">
                            <Globe2 size={13} />
                            Global opportunities
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.055em] mt-3 leading-[1]">
                            Find your next{" "}
                            <span className="text-[#B84A39]">
                                international opportunity.
                            </span>
                        </h2>

                        <p className="text-sm text-[#211A17]/55 leading-5 mt-3 max-w-xl mx-auto">
                            Explore backend developer opportunities across international
                            markets with flexible work models, global employers and
                            compensation displayed in USD.
                        </p>
                    </div>

                    {/* FEATURED GLOBAL OPPORTUNITY */}
                    <div className="rounded-[1.5rem] border border-[#211A17]/10 bg-[#F4EFE8] p-5 sm:p-6 lg:p-7 shadow-[0_15px_50px_rgba(33,26,23,0.06)]">
                        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
                            {/* LEFT */}
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B84A39]/10 border border-[#B84A39]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#B84A39]">
                                        <Server size={12} />
                                        Backend Developer
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#211A17] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#F4EFE8]">
                                        <Zap size={12} />
                                        Full Time
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C88A4A]/15 border border-[#C88A4A]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#9B672D]">
                                        <Globe2 size={12} />
                                        International
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black tracking-[-0.045em] mt-4">
                                    One role.
                                    <span className="text-[#B84A39]">
                                        {" "}Multiple global markets.
                                    </span>
                                </h3>

                                <p className="text-sm leading-6 text-[#211A17]/55 mt-2 max-w-2xl">
                                    Find backend roles based on where you want to work,
                                    how you want to work and what kind of international
                                    career you want to build.
                                </p>

                                {/* WORK MODES */}
                                <div className="mt-5">
                                    <p className="text-[10px] uppercase tracking-[0.17em] text-[#211A17]/40 font-black mb-2.5">
                                        Available work models
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            {
                                                label: "Remote",
                                                icon: Globe2,
                                            },
                                            {
                                                label: "Hybrid",
                                                icon: Layers3,
                                            },
                                            {
                                                label: "On-site",
                                                icon: MapPin,
                                            },
                                            {
                                                label: "Relocation",
                                                icon: Plane,
                                            },
                                        ].map(({ label, icon: Icon }) => (
                                            <span
                                                key={label}
                                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#211A17]/10 bg-[#FBF8F4] px-3.5 py-2 text-xs font-bold text-[#211A17]/65"
                                            >
                                                <Icon
                                                    size={13}
                                                    className="text-[#B84A39]"
                                                />
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* AVAILABILITY */}
                                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <div className="rounded-xl bg-[#211A17] p-3.5 text-[#F4EFE8]">
                                        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40 font-black">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4A]" />
                                            Availability
                                        </div>
                                        <div className="mt-1.5 text-xs font-black">
                                            Open roles
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-[#FBF8F4] border border-[#211A17]/10 p-3.5">
                                        <div className="text-[9px] uppercase tracking-[0.14em] text-[#211A17]/35 font-black">
                                            Markets
                                        </div>
                                        <div className="mt-1.5 text-xs font-black">
                                            5+ countries
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-[#FBF8F4] border border-[#211A17]/10 p-3.5">
                                        <div className="text-[9px] uppercase tracking-[0.14em] text-[#211A17]/35 font-black">
                                            Work style
                                        </div>
                                        <div className="mt-1.5 text-xs font-black">
                                            Flexible
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-[#FBF8F4] border border-[#211A17]/10 p-3.5">
                                        <div className="text-[9px] uppercase tracking-[0.14em] text-[#211A17]/35 font-black">
                                            Currency
                                        </div>
                                        <div className="mt-1.5 text-xs font-black">
                                            USD
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT PAYOUT CARD */}
                            <div className="lg:border-l lg:border-[#211A17]/10 lg:pl-6">
                                <div className="rounded-2xl bg-[#211A17] p-5 sm:p-6 text-[#F4EFE8]">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-black">
                                                Indicative compensation
                                            </p>

                                            <div className="text-3xl sm:text-4xl font-black tracking-[-0.055em] mt-2">
                                                $45K – $150K+
                                            </div>

                                            <p className="text-[10px] text-white/40 mt-1">
                                                USD equivalent · annual range
                                            </p>
                                        </div>

                                        <div className="w-12 h-12 rounded-2xl bg-[#C88A4A]/15 text-[#D6A76A] flex items-center justify-center shrink-0">
                                            <DollarSign size={23} />
                                        </div>
                                    </div>

                                    <div className="mt-6 h-px bg-white/10" />

                                    <div className="grid grid-cols-2 gap-2 mt-5">
                                        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                                            <div className="text-[9px] uppercase tracking-[0.14em] text-white/35 font-black">
                                                Junior / Mid
                                            </div>
                                            <div className="mt-1 text-sm font-black">
                                                $45K+
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                                            <div className="text-[9px] uppercase tracking-[0.14em] text-white/35 font-black">
                                                Senior
                                            </div>
                                            <div className="mt-1 text-sm font-black">
                                                $90K+
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center gap-2 text-xs text-white/55">
                                        <Globe2
                                            size={15}
                                            className="text-[#C88A4A]"
                                        />
                                        International compensation visibility
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COUNTRY OPPORTUNITIES */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
                        {globalCountries.map((country) => {
                            const details = countryDetails[country.code];

                            return (
                                <div
                                    key={country.code}
                                    className="group rounded-2xl border border-[#211A17]/10 bg-[#F4EFE8] p-4 hover:-translate-y-1 hover:border-[#B84A39]/25 hover:shadow-[0_15px_35px_rgba(33,26,23,0.08)] transition duration-300"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-[#FBF8F4] border border-[#211A17]/10 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={country.flag}
                                                    alt={`${country.name} flag`}
                                                    className="w-8 h-6 object-cover rounded-sm border border-[#211A17]/10 shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-black">
                                                    {country.name}
                                                </h3>

                                                <p className="text-[10px] text-[#211A17]/40 mt-0.5">
                                                    {details.roles}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="w-2 h-2 rounded-full mt-2 bg-[#C88A4A]" />
                                    </div>

                                    <div className="border-t border-[#211A17]/8 mt-4 pt-3">
                                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#211A17]/35 font-black">
                                            Typical payout
                                        </p>

                                        <p className="text-lg font-black tracking-[-0.03em] mt-1">
                                            {details.salary}
                                        </p>

                                        <p className="text-[9px] text-[#211A17]/35 mt-0.5">
                                            USD equivalent / year
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {details.modes.map((mode) => (
                                            <span
                                                key={mode}
                                                className="rounded-lg bg-[#FBF8F4] border border-[#211A17]/8 px-2 py-1 text-[9px] font-bold text-[#211A17]/50"
                                            >
                                                {mode}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#211A17]/8 flex items-center justify-between">
                                        <span className="text-[9px] uppercase tracking-[0.12em] font-black text-[#B84A39]">
                                            View opportunities
                                        </span>

                                        <ArrowRight
                                            size={13}
                                            className="text-[#B84A39] group-hover:translate-x-1 transition"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* BOTTOM INFO */}
                    <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
                        <div className="flex items-start gap-2 max-w-3xl">
                            <Globe2
                                size={14}
                                className="text-[#B84A39] mt-0.5 shrink-0"
                            />

                            <p className="text-[10px] leading-5 text-[#211A17]/40">
                                Salary ranges are indicative USD-equivalent annual ranges.
                                Actual compensation, job availability, work authorization,
                                location and relocation requirements may vary by employer,
                                experience and position.
                            </p>
                        </div>

                        <a
                            href="#apply"
                            className="shrink-0 inline-flex items-center gap-2 text-xs font-black text-[#B84A39] hover:text-[#963A2D] transition"
                        >
                            Explore & apply
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </section>

            {/* REQUIREMENTS */}
            <section>
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-[#211A17]/10 bg-[#FBF8F4] p-5 sm:p-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#B84A39]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#A94332] mb-2 md:mb-4">
                                <Check size={13} />
                                What we need
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.05em]">
                                Strong fundamentals.
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-[#211A17]/55">
                                We care about how you think, not just how many technologies
                                appear on your resume.
                            </p>

                            <div className="mt-5 space-y-3">
                                {requirements.map((item) => (
                                    <div key={item} className="flex gap-3">
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-[#B84A39]/10 text-[#B84A39] flex items-center justify-center mt-0.5">
                                            <Check size={12} />
                                        </div>

                                        <p className="text-xs leading-5 text-[#211A17]/65">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#EAE1D7] p-5 sm:p-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#211A17]/10 bg-[#F4EFE8] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#211A17]/60 mb-2 md:mb-4">
                                <Sparkles size={13} />
                                Nice to have
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.05em]">
                                Extra depth is welcome.
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-[#211A17]/55">
                                These are useful, but none of them should stop you from
                                applying.
                            </p>

                            <div className="mt-6 grid sm:grid-cols-2 gap-3">
                                {niceToHave.map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-xl bg-[#F4EFE8] border border-[#211A17]/8 p-4"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-[#211A17] text-[#F4EFE8] flex items-center justify-center">
                                            <ArrowRight size={13} />
                                        </div>

                                        <p className="mt-3 text-xs leading-5 text-[#211A17]/65">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="border-y border-[#211A17]/10 bg-[#EAE1D7]">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-4 lg:py-6">
                    <div className="flex flex-col items-center justify-center gap-2 md:gap-5 text-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#211A17]/10 bg-[#F4EFE8] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#B84A39] mb-1 md:mb-3">
                                <Users size={13} />
                                Why join us
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em]">
                                Build. Learn. <span className="text-[#B84A39]">Own it.</span>
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm leading-5 text-[#211A17]/55 mx-auto">
                            A place for engineers who want meaningful ownership without
                            sacrificing quality, flexibility or growth.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                        {benefits.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl bg-[#F4EFE8] border border-[#211A17]/10 p-5"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#B84A39] text-white flex items-center justify-center">
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="mt-4 text-sm font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[#211A17]/55">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#B84A39]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#A94332] mb-1 md:mb-3">
                            <GitBranch size={13} />
                            Hiring process
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em]">
                            Clear from the
                            <span className="text-[#B84A39]"> first conversation.</span>
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#211A17]/55">
                            No mystery stages. You’ll know what comes next and what each
                            conversation is designed to evaluate.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                        {process.map((item) => (
                            <div
                                key={item.step}
                                className="rounded-2xl border border-[#211A17]/10 bg-[#FBF8F4] p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase tracking-[0.18em] font-black text-[#B84A39]">
                                        Step {item.step}
                                    </span>

                                    <ArrowDownRight
                                        size={16}
                                        className="text-[#211A17]/25"
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-[#211A17]/55">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA IMAGE */}
            <section>
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-2 lg:py-4">
                    <div className="relative overflow-hidden rounded-[2rem] min-h-[300px] sm:min-h-[360px]">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=90"
                            alt="Engineering team collaborating"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-[#211A17]/80" />

                        <div className="relative z-10 min-h-[300px] sm:min-h-[360px] flex items-center">
                            <div className="px-6 sm:px-10 lg:px-14 max-w-3xl text-white">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#E4B579] mb-4 backdrop-blur">
                                    <Sparkles size={13} />
                                    Your next backend chapter
                                </div>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em] leading-[1]">
                                    Build systems you’ll be proud to put your name on.
                                </h2>

                                <p className="mt-2 text-sm leading-4 text-white/65 max-w-xl">
                                    If you enjoy solving difficult backend problems and making
                                    complex systems feel simple, we’d love to meet you.
                                </p>

                                <a
                                    href="#apply"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F4EFE8] text-[#211A17] px-5 py-3 text-sm font-black hover:bg-white transition"
                                >
                                    Apply for this role
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12 items-start">
                        <div className="mx-auto text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#B84A39]/20 bg-[#B84A39]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#A94332] mb-1 md:mb-3">
                                <Clock3 size={13} />
                                FAQ
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em] leading-[1]">
                                Questions before
                                <span className="block text-[#B84A39]">
                                    you apply?
                                </span>
                            </h2>

                            <p className="mt-2 text-sm leading-5 text-[#211A17]/55 max-w-md mx-auto">
                                Here are some of the things backend engineers usually want to
                                know before starting the process.
                            </p>
                        </div>

                        <div className="space-y-2">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className="rounded-2xl border border-[#211A17]/10 bg-[#FBF8F4] overflow-hidden"
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenFaq(isOpen ? -1 : index)
                                            }
                                            className="w-full flex items-center justify-between gap-5 px-5 py-4 text-left"
                                        >
                                            <span className="text-sm font-black">
                                                {faq.question}
                                            </span>

                                            <span className="shrink-0 w-8 h-8 rounded-full bg-[#211A17]/5 flex items-center justify-center">
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5">
                                                <p className="text-xs leading-5 text-[#211A17]/55 max-w-3xl">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* APPLICATION */}
            <section id="apply" className="bg-[#211A17] text-[#F4EFE8]">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
                        {/* LEFT CONTENT */}
                        <div className="lg:sticky lg:top-24">
                            <div className="mx-auto text-center">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#C88A4A]/25 bg-[#C88A4A]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#D6A76A] mb-3">
                                    <Sparkles size={13} />
                                    Global opportunity
                                </div>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.05em] leading-[1]">
                                    Find your next{" "}
                                    <span className="text-[#C88A4A]">
                                        global opportunity.
                                    </span>
                                </h2>

                                <p className="mt-2 text-sm leading-5 text-white/55 max-w-md mx-auto">
                                    Tell us where you want to work, your preferred work mode,
                                    career experience and the compensation you are targeting.
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    "International job opportunities",
                                    "Remote, onsite & hybrid roles",
                                    "Country-specific opportunities",
                                    "Salary & payout preferences",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#C88A4A]/15 text-[#D6A76A] flex items-center justify-center">
                                            <Check size={13} />
                                        </div>

                                        <span className="text-xs text-white/65">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="rounded-[1.5rem] bg-[#F4EFE8] text-[#211A17] p-5 sm:p-7"
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* FULL NAME */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                    />
                                </div>

                                {/* EXPERIENCE */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Experience
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select experience</option>
                                        <option>0–1 years</option>
                                        <option>1–2 years</option>
                                        <option>2–4 years</option>
                                        <option>4–6 years</option>
                                        <option>6–8 years</option>
                                        <option>8+ years</option>
                                    </select>
                                </div>

                                {/* PREFERRED COUNTRY */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Preferred country
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select country</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Germany</option>
                                        <option>Netherlands</option>
                                        <option>France</option>
                                        <option>Ireland</option>
                                        <option>Singapore</option>
                                        <option>United Arab Emirates</option>
                                        <option>Any country</option>
                                    </select>
                                </div>

                                {/* WORK MODE */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Preferred work mode
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select work mode</option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>Onsite</option>
                                        <option>Remote or Hybrid</option>
                                        <option>Any mode</option>
                                    </select>
                                </div>

                                {/* EXPECTED PAYOUT */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Expected payout
                                    </label>

                                    <div className="mt-2 flex gap-2">
                                        <select className="w-[34%] rounded-xl border border-[#211A17]/10 bg-white px-3 py-3 text-sm outline-none focus:border-[#B84A39]">
                                            <option>USD</option>
                                            <option>EUR</option>
                                            <option>GBP</option>
                                            <option>CAD</option>
                                            <option>AUD</option>
                                            <option>INR</option>
                                        </select>

                                        <input
                                            type="number"
                                            placeholder="e.g. 60000"
                                            className="w-[66%] rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                        />
                                    </div>
                                </div>

                                {/* PAYOUT PERIOD */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Payout period
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select period</option>
                                        <option>Per year</option>
                                        <option>Per month</option>
                                        <option>Per hour</option>
                                    </select>
                                </div>

                                {/* RELOCATION */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Open to relocation?
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select preference</option>
                                        <option>Yes, I can relocate</option>
                                        <option>No, remote only</option>
                                        <option>Depends on the opportunity</option>
                                    </select>
                                </div>

                                {/* WORK AUTHORIZATION */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Work authorization
                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]">
                                        <option value="">Select status</option>
                                        <option>Already authorized</option>
                                        <option>Need visa sponsorship</option>
                                        <option>Open to sponsorship</option>
                                        <option>Not sure</option>
                                    </select>
                                </div>

                                {/* PORTFOLIO */}
                                <div className="sm:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Portfolio / GitHub / LinkedIn
                                    </label>

                                    <input
                                        type="url"
                                        placeholder="https://github.com/yourname"
                                        className="mt-2 w-full rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                    />
                                </div>

                                {/* RESUME */}
                                <div className="sm:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Resume
                                    </label>

                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="mt-2 w-full rounded-xl border border-dashed border-[#211A17]/15 bg-white px-4 py-3 text-sm"
                                    />

                                    <p className="mt-1 text-[10px] text-[#211A17]/35">
                                        PDF, DOC or DOCX recommended
                                    </p>
                                </div>

                                {/* ABOUT */}
                                <div className="sm:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.14em] font-black text-[#211A17]/45">
                                        Tell us about yourself
                                    </label>

                                    <textarea
                                        rows="5"
                                        placeholder="Tell us about your experience, strongest skills, the type of global opportunity you are looking for and the kind of work you enjoy..."
                                        className="mt-2 w-full resize-none rounded-xl border border-[#211A17]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#B84A39]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-5 w-full rounded-xl bg-[#B84A39] text-white px-5 py-3.5 text-sm font-black flex items-center justify-center gap-2 hover:bg-[#963A2D] transition"
                            >
                                Submit application
                                <ArrowRight size={16} />
                            </button>

                            <p className="mt-3 text-[10px] text-center text-[#211A17]/40">
                                Your preferences help us match you with relevant global
                                opportunities, work modes and compensation ranges.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#211A17] border-t border-white/10">
                <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#F4EFE8] text-[#211A17] flex items-center justify-center">
                                <Server size={15} />
                            </div>

                            <div>
                                <div className="text-sm font-black text-[#F4EFE8]">
                                    Backend<span className="text-[#C88A4A]">Lab</span>
                                </div>

                                <div className="text-[8px] uppercase tracking-[0.15em] text-white/30 font-bold">
                                    Engineering careers
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="#top"
                                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
                            >
                                <ArrowDownRight size={15} className="-rotate-135" />
                            </a>

                            <a
                                href="#apply"
                                className="inline-flex items-center gap-2 rounded-full bg-[#F4EFE8] text-[#211A17] px-4 py-2 text-[11px] font-black"
                            >
                                Apply now
                                <ArrowRight size={13} />
                            </a>
                        </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/30">
                        <span>© 2026 BackendLab. All rights reserved.</span>

                        <div className="flex items-center gap-4">
                            <a
                                href="#role"
                                className="hover:text-white transition"
                            >
                                Role
                            </a>

                            <a
                                href="#global-opportunities"
                                className="hover:text-white transition"
                            >
                                Global Jobs
                            </a>

                            <a
                                href="#process"
                                className="hover:text-white transition"
                            >
                                Process
                            </a>

                            <a
                                href="#faq"
                                className="hover:text-white transition"
                            >
                                FAQ
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BackendDeveloper;