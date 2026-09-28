import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  // First FAQ open by default — colleague functionality
  const [openIndex, setOpenIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "What is CareerSphere?",
      answer:
        "CareerSphere is a job search platform that helps job seekers discover relevant opportunities, connect with companies, and take the next step in their career.",
    },
    {
      question: "How can I search for jobs?",
      answer:
        "You can search for jobs using keywords such as job title, skills, company name, or location. You can also use filters like experience, salary, work mode, department, and role category to find suitable opportunities.",
    },
    {
      question: "Do I need to create an account to apply for jobs?",
      answer:
        "Yes. Creating an account allows you to manage your profile, save jobs, track applications, and access other CareerSphere features.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Open the job you are interested in, review the job details and requirements, and click the Apply button. Follow the application steps provided for that particular opportunity.",
    },
    {
      question: "Can I save jobs for later?",
      answer:
        "Yes. You can save interesting jobs using the bookmark option. Your saved jobs can be accessed later so you can review and apply when you are ready.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full overflow-hidden bg-[#e1eff2]">
      {/* =====================================================
          HERO / HEADER
      ====================================================== */}
      <div className="relative overflow-hidden bg-[#e1eff2]">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#30AFFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#30AFFF]/15 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/30 bg-white/70 px-3.5 py-2 text-xs font-bold text-[#159FEF] backdrop-blur-sm sm:px-4 sm:text-sm">
              <HelpCircle size={16} className="shrink-0" />
              Frequently Asked Questions
            </div>

            {/* Heading */}
            <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
              Got Questions?{" "}
              <span className="text-[#159FEF]">
                We've Got Answers.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-lg">
              Find quick answers to the most common questions about
              CareerSphere, job applications, profiles, subscriptions, and
              more.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FAQ CONTENT
      ====================================================== */}
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* =================================================
              LEFT INFO CARD
          ================================================== */}
          <div className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-[#30AFFF]/30 bg-[#30AFFF] p-6 text-white shadow-xl shadow-[#30AFFF]/20 sm:p-7">
                {/* Decorative */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#A0E9FF]/30" />
                <div className="pointer-events-none absolute -bottom-14 -left-10 h-32 w-32 rounded-full bg-[#A0E9FF]/30" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <MessageCircleQuestion size={25} />
                  </div>

                  <h2 className="mt-6 text-lg font-bold md:text-2xl">
                    Need More Help?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Can't find the answer you're looking for? Our support team
                    is here to help you with your questions.
                  </p>

                  {/* Contact Support */}
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#159FEF] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A0E9FF] hover:shadow-md"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              {/* Small feature card */}
              <div className="mt-4 hidden rounded-2xl border border-[#30AFFF]/20 bg-white/70 p-5 backdrop-blur-sm lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/50 text-[#159FEF] shadow-sm">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Quick & Easy
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Find answers in seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT FAQ LIST
          ================================================== */}
          <div className="min-w-0">
            {/* Section heading */}
            <div className="mb-6 flex min-w-0 flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#159FEF]">
                  Help Center
                </p>

                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Frequently Asked Questions
                </h2>
              </div>

              <span className="shrink-0 text-xs font-semibold text-slate-500 sm:text-sm">
                {filteredFaqs.length} Questions
              </span>
            </div>

            {/* FAQ Items */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? "border-[#30AFFF]/40 bg-white shadow-sm"
                          : "border-white/70 bg-white/80 hover:border-[#30AFFF]/30 hover:shadow-sm"
                      }`}
                    >
                      {/* Question */}
                      <button
                        type="button"
                        onClick={() => handleToggle(index)}
                        className="flex w-full min-w-0 items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                        aria-expanded={isOpen}
                      >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-all sm:h-9 sm:w-9 ${
                              isOpen
                                ? "bg-[#30AFFF] text-white"
                                : "bg-[#A0E9FF]/60 text-[#159FEF]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <span
                            className={`min-w-0 break-words text-sm font-bold leading-5 sm:text-base sm:leading-6 ${
                              isOpen
                                ? "text-[#159FEF]"
                                : "text-slate-800"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </div>

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "rotate-180 border-[#30AFFF] bg-[#30AFFF] text-white"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <ChevronDown size={17} />
                        </div>
                      </button>

                      {/* Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="border-t border-[#30AFFF]/20 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pl-[76px]">
                            <p className="text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Results */
              <div className="rounded-2xl border border-white/70 bg-white px-5 py-12 text-center sm:py-16">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#A0E9FF]/50">
                  <Search size={22} className="text-[#159FEF]" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-800 sm:text-lg">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find any FAQ matching your search. Try using
                  different keywords.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setOpenIndex(0);
                  }}
                  className="mt-5 rounded-lg bg-[#30AFFF] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#159FEF]"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <div className="border-t border-[#30AFFF]/20 bg-[#e1eff2]">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-5 py-4 text-center sm:px-8 sm:py-4 lg:px-12 lg:py-4">
            {/* Decorative */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#30AFFF]/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#A0E9FF]/10 blur-2xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#30AFFF] text-white">
                <MessageCircleQuestion size={23} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-white md:text-3xl lg:text-4xl">
                Still Have Questions?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Our team is ready to help you find the right answer and make
                your job search journey easier.
              </p>

              {/* Get in Touch */}
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-xl sm:px-7"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;