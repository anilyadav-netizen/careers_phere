
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Search,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const CarrierResources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // RESOURCE DATA
  // =========================================================

  const resources = [
    {
      id: 1,
      category: "Resume",
      title: "How to Create a Professional Resume",
      description:
        "Learn how to build a resume that highlights your skills, experience and achievements.",
      icon: FileText,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Resume Tips",
      readTime: "6 min read",
    },
    {
      id: 2,
      category: "Interview",
      title: "Top Interview Questions & Answers",
      description:
        "Prepare for common interview questions and learn how to answer them confidently.",
      icon: MessageSquareText,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Interview",
      readTime: "8 min read",
    },
    {
      id: 3,
      category: "Career Growth",
      title: "How to Build a Successful Career",
      description:
        "Practical strategies to grow your career, improve your skills and reach your goals.",
      icon: TrendingUp,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Career Growth",
      readTime: "7 min read",
    },
    {
      id: 4,
      category: "Job Search",
      title: "Smart Job Search Strategies",
      description:
        "Discover effective ways to find better opportunities and stand out from other candidates.",
      icon: Search,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Job Search",
      readTime: "5 min read",
    },
    {
      id: 5,
      category: "Skills",
      title: "Skills Every Professional Should Learn",
      description:
        "Explore important technical and soft skills that can improve your career prospects.",
      icon: GraduationCap,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Skills",
      readTime: "9 min read",
    },
    {
      id: 6,
      category: "Networking",
      title: "Build a Strong Professional Network",
      description:
        "Learn how networking can help you discover opportunities and build valuable relationships.",
      icon: Users,
      iconBg: "bg-[#A0E9FF]/40",
      iconColor: "text-[#159FEF]",
      tag: "Networking",
      readTime: "6 min read",
    },
  ];

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = [
    {
      title: "Resume & CV",
      description: "Create a resume that gets noticed.",
      icon: FileText,
    },
    {
      title: "Interview Preparation",
      description: "Prepare and interview with confidence.",
      icon: MessageSquareText,
    },
    {
      title: "Career Growth",
      description: "Take the next step in your career.",
      icon: TrendingUp,
    },
    {
      title: "Job Search",
      description: "Find opportunities that match you.",
      icon: BriefcaseBusiness,
    },
  ];

  // =========================================================
  // FILTER RESOURCES
  // =========================================================

  const filteredResources = useMemo(() => {
    if (!searchTerm.trim()) {
      return resources;
    }

    const search = searchTerm.toLowerCase();

    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(search) ||
        resource.description.toLowerCase().includes(search) ||
        resource.category.toLowerCase().includes(search) ||
        resource.tag.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#30AFFF]">
        {/* Decorative Shapes */}

        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A0E9FF]/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
              <BookOpen size={28} />
            </div>

            {/* Heading */}

            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Career Resources
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#A0E9FF] sm:text-base sm:leading-7">
              Everything you need to build your career, prepare for
              interviews, improve your resume and find your dream job.
            </p>

            {/* Search */}

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
                  placeholder="Search career resources..."
                  className="w-full rounded-2xl border border-white/20 bg-white py-4 pl-11 pr-12 text-sm text-slate-700 shadow-xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-[#A0E9FF]/30 sm:text-base"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-700"
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
            CATEGORY SECTION
        ===================================================== */}

        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
                Explore Resources
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                What are you looking for?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a category and improve your career journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  type="button"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#30AFFF]/30 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF]">
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

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FEATURED RESOURCES
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
                Career Guides
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                Featured Career Resources
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Practical guides to help you move forward.
              </p>
            </div>

            <span className="text-xs font-medium text-slate-400">
              {filteredResources.length} resources
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <article
                    key={resource.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#30AFFF]/30 hover:shadow-lg"
                  >
                    {/* Card Top */}

                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${resource.iconBg} ${resource.iconColor}`}
                        >
                          <Icon size={20} />
                        </div>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                          {resource.readTime}
                        </span>
                      </div>

                      <span className="mt-5 inline-flex rounded-md bg-[#A0E9FF]/40 px-2 py-1 text-[10px] font-bold text-[#159FEF]">
                        {resource.tag}
                      </span>

                      <h3 className="mt-3 text-base font-bold leading-6 text-slate-800 transition-colors group-hover:text-[#159FEF]">
                        {resource.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {resource.description}
                      </p>
                    </div>

                    {/* Card Bottom */}

                    <div className="mt-auto border-t border-slate-100 px-5 py-4 sm:px-6">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#159FEF] transition-all hover:gap-3"
                      >
                        Read Resource
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A0E9FF]/40 text-[#159FEF]">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No resources found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try searching with a different keyword.
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
            QUICK CAREER TIPS
        ===================================================== */}

        <section className="mt-12 sm:mt-14">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
            {/* LEFT */}

            <div className="bg-[#30AFFF] p-6 sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                <Lightbulb size={21} />
              </div>

              <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
                Simple Tips for Career Success
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#A0E9FF]">
                Small improvements every day can make a big difference in your
                professional journey.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#159FEF] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore More Tips
                <ArrowRight size={15} />
              </button>
            </div>

            {/* RIGHT */}

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="space-y-5">
                {[
                  "Keep your resume updated.",
                  "Build skills that employers need.",
                  "Prepare before every interview.",
                  "Create a strong professional network.",
                  "Apply for jobs that match your skills.",
                ].map((tip, index) => (
                  <div key={tip} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/40 text-[#159FEF]">
                      <CheckCircle2 size={15} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {tip}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Career tip #{index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:mt-14 sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#30AFFF]/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#A0E9FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#A0E9FF]">
                <Target size={18} />

                <span className="text-xs font-bold uppercase tracking-wider">
                  Ready for your next step?
                </span>
              </div>

              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">
                Build your profile and start finding better opportunities.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Create a strong profile, discover relevant jobs and take the
                next step toward your career goals.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20 sm:w-fit"
            >
              Create Your Profile
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CarrierResources;
