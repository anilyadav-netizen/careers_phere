import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleApplyModal from "../components/RoleApplyModal";
import RoleOpportunitiesEmptyState from "../components/RoleOpportunitiesEmptyState";
import { fetchPublicOpportunities } from "../redux/slicer/roleOpportunitySlice";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
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
  Network,
  Plane,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { FaAws, FaDocker, FaNodeJs } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";

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

const BackendDeveloper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openFaq } = state;
  const reduxDispatch = useDispatch();
  const { publicList = [], opportunities = [] } = useSelector(
    (state) => state.roleOpportunities || {}
  );
  const activeOpportunities =
    opportunities.length > 0 ? opportunities : publicList;
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    reduxDispatch(
      fetchPublicOpportunities({ roleCategory: "Backend Developer" })
    );
  }, [reduxDispatch]);

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
    { icon: FaNodeJs, name: "Node.js", text: "Production APIs and backend services" },
    { icon: SiExpress, name: "Express", text: "Fast and maintainable API architecture" },
    { icon: SiMongodb, name: "MongoDB", text: "Flexible document-based data systems" },
    { icon: SiPostgresql, name: "PostgreSQL", text: "Reliable relational data architecture" },
    { icon: SiRedis, name: "Redis", text: "Caching, sessions and fast data access" },
    { icon: FaDocker, name: "Docker", text: "Consistent development and deployment" },
    { icon: FaAws, name: "AWS", text: "Cloud infrastructure and production systems" },
  ];

  const systems = [
    {
      number: "01",
      title: "API Architecture",
      text: "Create predictable API contracts, authentication flows, validation layers and service boundaries that frontend teams can confidently build on.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=90",
      icon: Code2,
    },
    {
      number: "02",
      title: "Data Infrastructure",
      text: "Build data models and persistence layers that balance performance, consistency and long-term maintainability.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90",
      icon: Database,
    },
    {
      number: "03",
      title: "Cloud Systems",
      text: "Help move products from local development to resilient production infrastructure with monitoring and deployment discipline.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=90",
      icon: Globe2,
    },
  ];

  const globalCountries = [
    { code: "US", name: "United States", flag: "https://flagcdn.com/w80/us.png", text: "Technology & product companies" },
    { code: "UK", name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png", text: "Startups & established teams" },
    { code: "CA", name: "Canada", flag: "https://flagcdn.com/w80/ca.png", text: "Remote & relocation roles" },
    { code: "AU", name: "Australia", flag: "https://flagcdn.com/w80/au.png", text: "Engineering opportunities" },
    { code: "DE", name: "Germany", flag: "https://flagcdn.com/w80/de.png", text: "European tech ecosystem" },
  ];

  const countryDetails = {
    US: { roles: "Backend roles", salary: "$70K – $150K+", modes: ["Remote", "Hybrid", "On-site"] },
    UK: { roles: "Backend roles", salary: "$55K – $120K+", modes: ["Remote", "Hybrid", "On-site"] },
    CA: { roles: "Backend roles", salary: "$50K – $115K+", modes: ["Remote", "Hybrid", "Relocation"] },
    AU: { roles: "Backend roles", salary: "$55K – $125K+", modes: ["Hybrid", "On-site", "Relocation"] },
    DE: { roles: "Backend roles", salary: "$50K – $115K+", modes: ["Hybrid", "On-site", "Relocation"] },
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
    { icon: Users, title: "Strong engineering team", text: "Work with developers who care about clean systems, thoughtful reviews and long-term quality." },
    { icon: Zap, title: "Real product ownership", text: "Your backend decisions directly influence products used by real people and businesses." },
    { icon: Clock3, title: "Flexible work culture", text: "Focused work, practical communication and flexibility without unnecessary process." },
    { icon: Sparkles, title: "Continuous growth", text: "Explore architecture, cloud infrastructure, performance and modern backend practices." },
  ];

  const process = [
    { step: "01", title: "Application", text: "Share your experience, projects and the kind of backend problems you enjoy solving." },
    { step: "02", title: "Intro call", text: "A short conversation to understand your background, goals and engineering approach." },
    { step: "03", title: "Technical round", text: "Discuss APIs, databases, architecture, debugging and practical backend scenarios." },
    { step: "04", title: "Practical task", text: "Solve a focused engineering problem that reflects the kind of work you would actually do." },
    { step: "05", title: "Team discussion", text: "Meet the team and talk through collaboration, ownership and technical decision-making." },
    { step: "06", title: "Offer", text: "If everything aligns, we move quickly with the offer and onboarding process." },
  ];

  const faqs = [
    { question: "Do I need to know every technology in the stack?", answer: "No. Strong backend fundamentals matter more than checking every technology box. We value people who can learn quickly, reason clearly and build reliable systems." },
    { question: "Is this role only for Node.js developers?", answer: "Node.js is an important part of our stack, but experience with another backend ecosystem can also be valuable if you understand APIs, databases, architecture and production systems." },
    { question: "Will I work directly with frontend developers?", answer: "Yes. Backend engineers work closely with frontend engineers and product teams to design API contracts, data flows and complete product experiences." },
    { question: "What level of backend ownership will I get?", answer: "You will be expected to own features beyond writing endpoints. That can include data modeling, architecture decisions, performance, security, testing and deployment." },
    { question: "Can I apply if I have experience with a different database?", answer: "Absolutely. Experience with MySQL, PostgreSQL, MongoDB or another production database can transfer well when you understand data modeling, indexing, queries and consistency." },
  ];

  const openApply = (opp = null) => {
    setSelectedOpportunity(opp && opp._id ? opp : null);
    setSelectedCountry(null);
    setIsApplyModalOpen(true);
  };

  const handleCountryApply = (country) => {
    setSelectedCountry(country);
    setSelectedOpportunity(null);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 selection:bg-[#30AFFF]/20 selection:text-slate-900">
      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-white">
        <div className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-[#30AFFF]/8 blur-[110px]" />
        <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[#30AFFF]/5 blur-[120px]" />

        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-14 lg:pb-12 relative">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 lg:gap-12 items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3 shadow-sm">
                <Server size={13} className="text-[#30AFFF]" />
                Backend & Systems Engineering · Cloud APIs
              </div>

              <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.98] max-w-4xl text-slate-900">
                Architect scalable APIs, databases &{" "}
                <span className="text-[#30AFFF]">cloud backend systems.</span>
              </h1>

              <p className="mt-3.5 max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed">
                We're hiring Backend Developers to design resilient REST & GraphQL APIs,
                optimize high-throughput PostgreSQL and Redis architectures, build microservices,
                and maintain secure, zero-downtime cloud infrastructure.
              </p>

              <div className="mt-6 flex flex-row gap-2 sm:gap-3 w-full">
                <button
                  type="button"
                  onClick={openApply}
                  className="min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#30AFFF] px-4 sm:px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition whitespace-nowrap"
                >
                  <span>Apply for this role</span>
                  <ArrowRight size={15} className="shrink-0" />
                </button>

                <a
                  href="#role"
                  className="min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white px-4 sm:px-6 py-3 text-sm font-semibold text-slate-700 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 transition shadow-sm whitespace-nowrap"
                >
                  <span>Explore the role</span>
                  <ArrowDownRight size={15} className="shrink-0" />
                </a>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
                {[
                  ["8ms", "P99 Latency"],
                  ["99.99%", "Cloud Uptime"],
                  ["Node & Go", "Core Runtime"],
                  ["PostgreSQL", "Database Core"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[#A0E9FF]/40 bg-white px-4 py-3.5 shadow-xs">
                    <div className="text-xl font-black tracking-tight text-[#30AFFF]">{value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-bold text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BACKEND ROLE DEFINING TERMINAL & ARCHITECTURE MOCKUP */}
            <div className="relative min-w-0">
              <div className="overflow-hidden rounded-3xl border border-[#A0E9FF]/60 bg-slate-950 shadow-[0_20px_50px_rgba(48,175,255,0.18)]">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                    <div className="ml-3 flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-slate-300">
                      <Terminal size={12} className="text-[#30AFFF]" />
                      <span>api-cluster-prod (us-east-1)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Services Online
                    </span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 sm:p-5 space-y-3 font-mono text-xs">
                  <div className="text-slate-500 text-[11px]">
                    $ pnpm start:api --cluster=production --workers=8
                  </div>
                  <div className="text-emerald-400 flex items-center gap-2">
                    <span>[SYSTEM]</span>
                    <span className="text-slate-300">Server listening on port 5000 (HTTPS/2)</span>
                  </div>
                  <div className="text-sky-400 flex items-center gap-2">
                    <span>[ROUTER]</span>
                    <span className="text-emerald-300">GET  /api/v1/jobs</span>
                    <span className="text-slate-400">200 OK</span>
                    <span className="text-slate-500">(8ms)</span>
                  </div>
                  <div className="text-sky-400 flex items-center gap-2">
                    <span>[ROUTER]</span>
                    <span className="text-emerald-300">POST /api/v1/apply</span>
                    <span className="text-slate-400">201 Created</span>
                    <span className="text-slate-500">(14ms)</span>
                  </div>
                  <div className="text-amber-400 flex items-center gap-2">
                    <span>[DATABASE]</span>
                    <span className="text-slate-300">PostgreSQL pool active · 24 connections (3ms)</span>
                  </div>
                  <div className="text-purple-400 flex items-center gap-2">
                    <span>[CACHE]</span>
                    <span className="text-slate-300">Redis cache HIT 99.4% (TTL: 3600s)</span>
                  </div>
                  <div className="text-indigo-400 flex items-center gap-2">
                    <span>[DOCKER]</span>
                    <span className="text-slate-300">6 microservices healthy (k8s ready)</span>
                  </div>

                  {/* Backend Metrics Dashboard Inside */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">API STATUS</div>
                      <div className="text-sm font-black text-emerald-400 mt-0.5">Healthy (200)</div>
                      <div className="text-[10px] text-slate-500">45k req/sec</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">DB LATENCY</div>
                      <div className="text-sm font-black text-[#30AFFF] mt-0.5">3.2ms Pool</div>
                      <div className="text-[10px] text-slate-500">PostgreSQL 16</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">MEMORY</div>
                      <div className="text-sm font-black text-slate-200 mt-0.5">1.2 GB / 8 GB</div>
                      <div className="text-[10px] text-emerald-400">Optimal Load</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/15 flex items-center justify-center text-[#30AFFF]">
                  <Database size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">ARCHITECTURE</div>
                  <div className="text-xs font-bold text-slate-900">PostgreSQL & Redis</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg">
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">DEPLOYMENT</div>
                  <div className="text-xs font-bold text-slate-900">Docker & AWS Cloud</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#30AFFF]/15 flex items-center justify-center text-[#30AFFF]">
                  <Server size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE */}
      <section id="role" className="relative overflow-hidden border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">
            <div className="min-w-0">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
                  <Layers3 size={13} />
                  The role
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1] text-slate-900">
                  Backend is where
                  <span className="block text-[#30AFFF]">everything connects.</span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 max-w-lg mx-auto lg:mx-0">
                  You'll work on the invisible layer that makes every product
                  interaction possible — from authentication and APIs to
                  databases, queues, caching and cloud infrastructure.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-black text-[#30AFFF]">
                  <Terminal size={13} />
                  Engineering principle
                </div>
                <p className="mt-3 text-lg leading-7 font-bold tracking-tight">
                  "Make complexity predictable, and make production boring."
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 min-w-0">
              {responsibilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                      <Icon size={19} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-slate-800">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
                <Code2 size={13} />
                Our stack
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                Tools that turn <span className="text-[#30AFFF]">ideas into systems.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500 mx-auto">
              You don't have to know everything from day one. What matters is
              that you understand why a tool belongs in the architecture and
              how to use it responsibly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all">
                  <div className="w-11 h-11 rounded-xl bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center text-xl">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800">{item.name}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="relative overflow-hidden bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
              <Network size={13} />
              What you'll build
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1] text-slate-900">
              Not just endpoints.
              <span className="block text-[#30AFFF]">Complete backend systems.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-3 mt-8">
            {systems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.number} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all">
                  <div className="relative h-40 md:h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white text-[#30AFFF] flex items-center justify-center shadow-md">
                      <Icon size={17} />
                    </div>

                    <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.18em] text-[#30AFFF] font-black">
                      {item.number}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-black text-[#30AFFF]">
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
      <section id="global-opportunities" className="relative overflow-hidden bg-white border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#159FEF] font-black">
              <Globe2 size={13} />
              Global opportunities
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mt-3 leading-[1] text-slate-900">
              Find your next <span className="text-[#30AFFF]">international opportunity.</span>
            </h2>

            <p className="text-sm text-slate-500 leading-6 mt-3 max-w-xl mx-auto">
              Explore backend developer opportunities across international
              markets with flexible work models, global employers and
              compensation displayed in USD.
            </p>
          </div>

          {/* FEATURED */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 lg:p-7 shadow-[0_15px_45px_rgba(15,23,42,0.10)]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30AFFF]/5 border border-[#30AFFF]/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#159FEF]">
                    <Server size={12} />
                    Backend Developer
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30AFFF] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                    <Zap size={12} />
                    Full Time
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30AFFF]/10 border border-[#30AFFF]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#159FEF]">
                    <Globe2 size={12} />
                    International
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-4 text-slate-900">
                  One role. <span className="text-[#30AFFF]">Multiple global markets.</span>
                </h3>

                <p className="text-sm leading-6 text-slate-500 mt-2 max-w-2xl">
                  Find backend roles based on where you want to work,
                  how you want to work and what kind of international
                  career you want to build.
                </p>

                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.17em] text-slate-400 font-black mb-2.5">
                    Available work models
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Remote", icon: Globe2 },
                      { label: "Hybrid", icon: Layers3 },
                      { label: "On-site", icon: MapPin },
                      { label: "Relocation", icon: Plane },
                    ].map(({ label, icon: Icon }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-600">
                        <Icon size={13} className="text-[#30AFFF]" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="rounded-xl bg-slate-900 p-3.5 text-white">
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40 font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30AFFF]" />
                      Availability
                    </div>
                    <div className="mt-1.5 text-xs font-black">Open roles</div>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                    <div className="text-[9px] uppercase tracking-[0.14em] text-slate-400 font-black">Markets</div>
                    <div className="mt-1.5 text-xs font-black text-slate-800">5+ countries</div>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                    <div className="text-[9px] uppercase tracking-[0.14em] text-slate-400 font-black">Work style</div>
                    <div className="mt-1.5 text-xs font-black text-slate-800">Flexible</div>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                    <div className="text-[9px] uppercase tracking-[0.14em] text-slate-400 font-black">Currency</div>
                    <div className="mt-1.5 text-xs font-black text-slate-800">USD</div>
                  </div>
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-100 lg:pl-6 min-w-0">
                <div className="rounded-2xl bg-slate-900 p-5 sm:p-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-black">
                        Indicative compensation
                      </p>
                      <div className="text-3xl sm:text-4xl font-black tracking-tight mt-2">
                        $45K – $150K+
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">
                        USD equivalent · annual range
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#30AFFF]/15 text-[#30AFFF] flex items-center justify-center shrink-0">
                      <DollarSign size={23} />
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-white/10" />

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <div className="text-[9px] uppercase tracking-[0.14em] text-white/35 font-black">Junior / Mid</div>
                      <div className="mt-1 text-sm font-black">$45K+</div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <div className="text-[9px] uppercase tracking-[0.14em] text-white/35 font-black">Senior</div>
                      <div className="mt-1 text-sm font-black">$90K+</div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/55">
                    <Globe2 size={15} className="text-[#30AFFF]" />
                    International compensation visibility
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COUNTRY / OPPORTUNITY CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-4">
            {activeOpportunities.length > 0 ? (
              activeOpportunities.map((opp, idx) => {
                const displaySalary = opp.salary || "Competitive";

                return (
                  <div
                    key={opp._id || idx}
                    className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:-translate-y-1 hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all flex flex-col"
                  >
                    {/* Company Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
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
                            className="text-sm font-black text-slate-800 truncate"
                            title={opp.companyName}
                          >
                            {opp.companyName}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {opp.roleTitle || opp.roleCategory || "Backend Developer"}
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

                    {/* Typical payout */}
                    <div className="border-t border-slate-100 mt-3 pt-3">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black">
                        Typical payout
                      </p>
                      <p className="text-base font-black tracking-tight mt-0.5 text-slate-900">
                        {displaySalary}
                      </p>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        {opp.salary
                          ? "Annual range · employer specific"
                          : "Disclosed upon matching"}
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
                          className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-600"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>

                    {/* APPLY BUTTON — RIGHT ALIGNED */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end mt-auto">
                      <button
                        type="button"
                        onClick={() => openApply(opp)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#30AFFF] px-3.5 py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#159FEF] transition cursor-pointer"
                      >
                        Apply
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <RoleOpportunitiesEmptyState roleTitle="Backend Developer" />
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div className="flex items-start gap-2 max-w-3xl">
              <Globe2 size={14} className="text-[#30AFFF] mt-0.5 shrink-0" />
              <p className="text-[10px] leading-5 text-slate-400">
                Salary ranges are indicative USD-equivalent annual ranges.
                Actual compensation, job availability, work authorization,
                location and relocation requirements may vary by employer,
                experience and position.
              </p>
            </div>

            <button
              type="button"
              onClick={openApply}
              className="shrink-0 inline-flex items-center gap-2 text-xs font-black text-[#30AFFF] hover:text-[#159FEF] transition"
            >
              Explore & apply
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS + NICE TO HAVE */}
      <section className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-4">
                <Check size={13} />
                What we need
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Strong fundamentals.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                We care about how you think, not just how many technologies
                appear on your resume.
              </p>

              <div className="mt-5 space-y-3">
                {requirements.map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center mt-0.5">
                      <Check size={12} />
                    </div>
                    <p className="text-xs leading-5 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-4">
                <Sparkles size={13} />
                Nice to have
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Extra depth is welcome.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                These are useful, but none of them should stop you from
                applying.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {niceToHave.map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <div className="w-7 h-7 rounded-lg bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                      <ArrowRight size={13} />
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
                <Users size={13} />
                Why join us
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                Build. Learn. <span className="text-[#30AFFF]">Own it.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500 mx-auto">
              A place for engineers who want meaningful ownership without
              sacrificing quality, flexibility or growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#30AFFF] text-white flex items-center justify-center shadow-md shadow-[#30AFFF]/30">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative overflow-hidden bg-slate-50/60">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
              <GitBranch size={13} />
              Hiring process
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              Clear from the <span className="text-[#30AFFF]">first conversation.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              No mystery stages. You'll know what comes next and what each
              conversation is designed to evaluate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {process.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-[#30AFFF]/30 hover:shadow-[0_15px_45px_rgba(15,23,42,0.10)] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-black text-[#30AFFF]">
                    Step {item.step}
                  </span>
                  <ArrowDownRight size={16} className="text-slate-300" />
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-800">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA IMAGE */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="relative overflow-hidden rounded-3xl min-h-[300px] sm:min-h-[360px] shadow-[0_15px_45px_rgba(15,23,42,0.10)]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=90"
              alt="Engineering team collaborating"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-slate-900/80" />

            <div className="relative z-10 min-h-[300px] sm:min-h-[360px] flex items-center">
              <div className="px-6 sm:px-10 lg:px-14 max-w-3xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#30AFFF] mb-4 backdrop-blur">
                  <Sparkles size={13} />
                  Your next backend chapter
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1]">
                  Build systems you'll be proud to put your name on.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/65 max-w-xl">
                  If you enjoy solving difficult backend problems and making
                  complex systems feel simple, we'd love to meet you.
                </p>

                <button
                  type="button"
                  onClick={openApply}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#30AFFF] text-white px-6 py-3 text-sm font-black shadow-lg shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
                >
                  Apply for this role
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-12 items-start">
            <div className="mx-auto text-center lg:mx-0 lg:text-left min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
                <Clock3 size={13} />
                FAQ
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1] text-slate-900">
                Questions before
                <span className="block text-[#30AFFF]">you apply?</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 max-w-md mx-auto lg:mx-0">
                Here are some of the things backend engineers usually want to
                know before starting the process.
              </p>
            </div>

            <div className="space-y-2 min-w-0">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => dispatch({ type: "TOGGLE_FAQ", index })}
                      className="w-full flex items-center justify-between gap-5 px-5 py-4 text-left group"
                    >
                      <span className="text-sm font-bold text-slate-800 group-hover:text-[#30AFFF] transition">
                        {faq.question}
                      </span>

                      <span className="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                        <ChevronDown
                          size={16}
                          className={`transition ${isOpen ? "rotate-180 text-[#30AFFF]" : "text-slate-400"}`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-xs leading-6 text-slate-500 max-w-3xl">
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
      <section id="apply" className="relative overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr] gap-6 lg:gap-10 items-start">
            <div className="lg:sticky lg:top-24 min-w-0">
              <div className="mx-auto text-center lg:mx-0 lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#159FEF] mb-3">
                  <Sparkles size={13} />
                  Global opportunity
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1] text-slate-900">
                  Find your next <span className="text-[#30AFFF]">global opportunity.</span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 max-w-md mx-auto lg:mx-0">
                  Tell us where you want to work, your preferred work mode,
                  career experience and the compensation you are targeting.
                </p>
              </div>

              {selectedCountry && (
                <div className="mt-5 rounded-2xl border border-[#30AFFF]/20 bg-[#30AFFF]/[0.04] p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        className="w-7 h-5 object-cover rounded-sm"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#159FEF] font-bold">
                        Selected market
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">
                        {selectedCountry.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="rounded-lg bg-white p-3 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Payout
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {countryDetails[selectedCountry.code].salary}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Focus
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {selectedCountry.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3">
                {[
                  "International job opportunities",
                  "Remote, onsite & hybrid roles",
                  "Country-specific opportunities",
                  "Salary & payout preferences",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#30AFFF]/10 text-[#30AFFF] flex items-center justify-center">
                      <Check size={13} />
                    </div>
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-[0_15px_45px_rgba(15,23,42,0.10)] text-center relative overflow-hidden min-w-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#30AFFF]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#30AFFF]/10 text-[#30AFFF] mx-auto flex items-center justify-center mb-6 shadow-inner">
                  <Server size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Ready to Apply as Backend Developer?
                </h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  Click the button below to launch the official backend application popup.
                  Share your system architecture experience, database & API specializations,
                  salary expectations, and upload your resume.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={openApply}
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
            </div>
          </div>
        </div>
      </section>

      <RoleApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedCountry(null);
          setSelectedOpportunity(null);
        }}
        role="Backend Developer"
        opportunity={selectedOpportunity}
        initialData={
          selectedOpportunity
            ? {
                preferredJobMarket:
                  selectedOpportunity.countries?.[0]?.countryName || "",
                preferredWorkMode:
                  selectedOpportunity.workModes?.[0] || "",
              }
            : selectedCountry
            ? {
                preferredJobMarket: selectedCountry.name,
                preferredWorkMode:
                  countryDetails[selectedCountry.code]?.modes?.[0] || "",
              }
            : {}
        }
      />

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#30AFFF] text-white flex items-center justify-center shadow-md shadow-[#30AFFF]/30">
                <Server size={15} />
              </div>

              <div>
                <div className="text-sm font-black text-slate-900">
                  Backend<span className="text-[#30AFFF]">Lab</span>
                </div>
                <div className="text-[8px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                  Engineering careers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#top"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#30AFFF] hover:border-[#30AFFF]/40 transition"
              >
                <ArrowDownRight size={15} className="-rotate-135" />
              </a>

              <button
                type="button"
                onClick={openApply}
                className="inline-flex items-center gap-2 rounded-full bg-[#30AFFF] text-white px-4 py-2 text-[11px] font-black shadow-md shadow-[#30AFFF]/30 hover:bg-[#159FEF] transition"
              >
                Apply now
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
            <span>© 2026 BackendLab. All rights reserved.</span>

            <div className="flex items-center gap-4">
              <a href="#role" className="hover:text-[#30AFFF] transition">Role</a>
              <a href="#global-opportunities" className="hover:text-[#30AFFF] transition">Global Jobs</a>
              <a href="#process" className="hover:text-[#30AFFF] transition">Process</a>
              <a href="#faq" className="hover:text-[#30AFFF] transition">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BackendDeveloper;