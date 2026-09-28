
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Lightbulb,
  Search,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const SkillDevelopment = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // SKILL CATEGORIES
  // =========================================================

  const skillCategories = [
    {
      title: "Technical Skills",
      description:
        "Learn in-demand technologies and tools used by modern companies.",
      icon: Code2,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
      skills: ["React.js", "JavaScript", "Node.js", "Python"],
    },
    {
      title: "Soft Skills",
      description:
        "Improve communication, leadership and workplace effectiveness.",
      icon: Users,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
      skills: [
        "Communication",
        "Leadership",
        "Teamwork",
        "Problem Solving",
      ],
    },
    {
      title: "Career Skills",
      description:
        "Build skills that help you grow and advance your career.",
      icon: TrendingUp,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
      skills: [
        "Career Planning",
        "Networking",
        "Interview Skills",
        "Resume Writing",
      ],
    },
    {
      title: "Business Skills",
      description:
        "Develop business knowledge and professional management skills.",
      icon: BriefcaseBusiness,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
      skills: [
        "Marketing",
        "Project Management",
        "Sales",
        "Business Strategy",
      ],
    },
  ];

  // =========================================================
  // POPULAR SKILLS
  // =========================================================

  const popularSkills = [
    {
      name: "React.js",
      category: "Development",
      learners: "12.5K",
      rating: "4.9",
      icon: Code2,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      name: "JavaScript",
      category: "Programming",
      learners: "18.2K",
      rating: "4.8",
      icon: Code2,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      name: "Python",
      category: "Programming",
      learners: "21.4K",
      rating: "4.9",
      icon: Code2,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      name: "Communication",
      category: "Soft Skills",
      learners: "9.8K",
      rating: "4.7",
      icon: MessageIcon,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      name: "Leadership",
      category: "Professional",
      learners: "7.6K",
      rating: "4.8",
      icon: Users,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      name: "Project Management",
      category: "Business",
      learners: "6.4K",
      rating: "4.8",
      icon: Target,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
  ];

  // =========================================================
  // LEARNING PATHS
  // =========================================================

  const learningPaths = [
    {
      title: "Frontend Developer",
      description:
        "Master the skills required to build modern and responsive web applications.",
      skills: [
        "HTML & CSS",
        "JavaScript",
        "React.js",
        "Git & GitHub",
      ],
      duration: "10 Weeks",
      level: "Beginner to Advanced",
      progress: 65,
      icon: Code2,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      title: "Full Stack Developer",
      description:
        "Learn frontend and backend technologies to become a complete web developer.",
      skills: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      duration: "16 Weeks",
      level: "Intermediate",
      progress: 40,
      icon: BriefcaseBusiness,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
    {
      title: "Career Ready Professional",
      description:
        "Develop the professional skills needed to succeed in today's workplace.",
      skills: [
        "Communication",
        "Leadership",
        "Interview",
        "Networking",
      ],
      duration: "6 Weeks",
      level: "All Levels",
      progress: 80,
      icon: GraduationCap,
      bg: "bg-[#A0E9FF]/40",
      color: "text-[#159FEF]",
    },
  ];

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) {
      return popularSkills;
    }

    const search = searchTerm.toLowerCase();

    return popularSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(search) ||
        skill.category.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#30AFFF]">
        {/* Decorations */}

        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A0E9FF]/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
              <GraduationCap size={28} />
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Develop Skills. Build Your Future.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#A0E9FF] sm:text-base sm:leading-7">
              Learn the skills employers are looking for and take your career
              to the next level with CareerSphere.
            </p>

            {/* SEARCH */}

            <div className="mx-auto mt-7 w-full max-w-2xl">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a skill..."
                  className="w-full rounded-2xl border border-white/20 bg-white py-4 pl-11 pr-12 text-sm text-slate-700 shadow-xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-[#A0E9FF]/30 sm:text-base"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            icon={BookOpen}
            value="120+"
            label="Learning Resources"
            bg="bg-[#A0E9FF]/40"
            color="text-[#159FEF]"
          />

          <StatCard
            icon={Code2}
            value="50+"
            label="Skills"
            bg="bg-[#A0E9FF]/40"
            color="text-[#159FEF]"
          />

          <StatCard
            icon={Users}
            value="25K+"
            label="Learners"
            bg="bg-[#A0E9FF]/40"
            color="text-[#159FEF]"
          />

          <StatCard
            icon={CheckCircle2}
            value="95%"
            label="Completion Rate"
            bg="bg-[#A0E9FF]/40"
            color="text-[#159FEF]"
          />
        </section>

        {/* =====================================================
            SKILL CATEGORIES
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
              Explore Skills
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Choose Your Skill Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start learning skills that match your career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#30AFFF]/30 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.bg} ${category.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#30AFFF]"
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-slate-800">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            POPULAR SKILLS
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
                Trending Now
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                Popular Skills
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Skills that can help you stand out to employers.
              </p>
            </div>

            <span className="text-xs font-medium text-slate-400">
              {filteredSkills.length} skills available
            </span>
          </div>

          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={skill.name}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#30AFFF]/30 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${skill.bg} ${skill.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-sm font-bold text-slate-800">
                            {skill.name}
                          </h3>

                          <ArrowRight
                            size={15}
                            className="shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#30AFFF]"
                          />
                        </div>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {skill.category}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Users size={13} />
                        {skill.learners} learners
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                        <Star size={13} fill="currentColor" />
                        {skill.rating}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A0E9FF]/40 text-[#159FEF]">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No skills found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try searching for another skill.
              </p>

              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-xl bg-[#30AFFF] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#159FEF]"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* =====================================================
            LEARNING PATHS
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
              Guided Learning
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Recommended Learning Paths
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Follow a structured path and build job-ready skills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {learningPaths.map((path) => {
              const Icon = path.icon;

              return (
                <article
                  key={path.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${path.bg} ${path.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          {path.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {path.level}
                        </p>
                      </div>
                    </div>

                    <Zap
                      size={17}
                      className="shrink-0 text-amber-400"
                    />
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    {path.description}
                  </p>

                  {/* Skills */}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {path.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">
                        Your Progress
                      </span>

                      <span className="text-[10px] font-bold text-[#159FEF]">
                        {path.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#30AFFF] transition-all"
                        style={{
                          width: `${path.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom */}

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] text-slate-400">
                      {path.duration}
                    </span>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159FEF] transition hover:text-[#30AFFF]"
                    >
                      Continue
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            WHY DEVELOP SKILLS
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT */}

              <div className="bg-[#30AFFF] p-6 sm:p-8 lg:p-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Lightbulb size={21} />
                </div>

                <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
                  Why Skill Development Matters
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#A0E9FF]">
                  The right skills can open new opportunities, increase your
                  confidence and help you stay competitive in a changing job
                  market.
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#159FEF] transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Start Learning
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* RIGHT */}

              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8 lg:p-10">
                <Benefit
                  icon={Target}
                  title="Career Focus"
                  description="Learn skills aligned with your career goals."
                />

                <Benefit
                  icon={TrendingUp}
                  title="Career Growth"
                  description="Improve your chances of professional growth."
                />

                <Benefit
                  icon={BriefcaseBusiness}
                  title="Job Ready"
                  description="Develop practical skills employers value."
                />

                <Benefit
                  icon={CheckCircle2}
                  title="Build Confidence"
                  description="Feel more prepared for new opportunities."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:mt-14 sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#30AFFF]/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#A0E9FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#A0E9FF]">
                <GraduationCap size={18} />

                <span className="text-xs font-bold uppercase tracking-wider">
                  Start Today
                </span>
              </div>

              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">
                Invest in your skills. Invest in your future.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Choose a skill, follow a learning path and keep improving your
                professional profile.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20 sm:w-fit"
            >
              Explore Skills
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

// =============================================================
// STAT CARD
// =============================================================

const StatCard = ({
  icon: Icon,
  value,
  label,
  bg,
  color,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-lg font-black text-slate-800 sm:text-xl">
            {value}
          </p>

          <p className="truncate text-[10px] font-semibold text-slate-400 sm:text-xs">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================
// BENEFIT
// =============================================================

const Benefit = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF]">
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

// =============================================================
// MESSAGE ICON
// =============================================================

const MessageIcon = (props) => {
  return <Users {...props} />;
};

export default SkillDevelopment;

