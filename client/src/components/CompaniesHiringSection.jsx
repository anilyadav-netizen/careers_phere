import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFlagByCountryName } from "../constants/countries";
import { getAllJobsUser } from "../redux/slicer/jobSlice";

// Curated fallbacks in case admin has not added many jobs yet
const FALLBACK_COMPANIES = [
  {
    name: "Google",
    logoUrl: "https://www.google.com/favicon.ico",
    countries: [
      { name: "United States", flag: "https://flagcdn.com/w160/us.png" },
      { name: "India", flag: "https://flagcdn.com/w160/in.png" },
      { name: "United Kingdom", flag: "https://flagcdn.com/w160/gb.png" },
    ],
    jobCount: 8,
    category: "Technology",
  },
  {
    name: "Microsoft",
    logoUrl: "https://www.microsoft.com/favicon.ico",
    countries: [
      { name: "United States", flag: "https://flagcdn.com/w160/us.png" },
      { name: "Canada", flag: "https://flagcdn.com/w160/ca.png" },
      { name: "Germany", flag: "https://flagcdn.com/w160/de.png" },
    ],
    jobCount: 6,
    category: "Software & Cloud",
  },
  {
    name: "Amazon",
    logoUrl: "https://www.amazon.com/favicon.ico",
    countries: [
      { name: "United States", flag: "https://flagcdn.com/w160/us.png" },
      { name: "India", flag: "https://flagcdn.com/w160/in.png" },
      { name: "Australia", flag: "https://flagcdn.com/w160/au.png" },
    ],
    jobCount: 11,
    category: "E-Commerce & AWS",
  },
  {
    name: "Meta",
    logoUrl: "https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRdlflpfKW.ico",
    countries: [
      { name: "United States", flag: "https://flagcdn.com/w160/us.png" },
      { name: "Singapore", flag: "https://flagcdn.com/w160/sg.png" },
      { name: "United Kingdom", flag: "https://flagcdn.com/w160/gb.png" },
    ],
    jobCount: 5,
    category: "Social & AI",
  },
];

const EMPTY_JOBS = [];

// Logo: image fail ho to initial letter dikhao (innerHTML hack ki jagah state)
const CompanyLogo = ({ src, name }) => {
  const [failed, setFailed] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() || "C";

  return (
    <div className="w-9 h-9 shrink-0 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center p-1.5 overflow-hidden">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-base font-extrabold text-[#159FEF]">
          {initial}
        </span>
      )}
    </div>
  );
};

const CompaniesHiringSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector((state) => state.jobs?.jobs) || EMPTY_JOBS;
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Sirf ek baar fetch (pehle [jobs] dependency se empty response pe loop ka risk tha)
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (!jobs || jobs.length === 0) {
      dispatch(getAllJobsUser({ limit: 50 }));
    }
  }, [dispatch, jobs]);

  // Extract unique countries added by admin in jobs
  const adminCountries = useMemo(() => {
    const countryMap = new Map();

    (Array.isArray(jobs) ? jobs : []).forEach((job) => {
      if (Array.isArray(job.countries)) {
        job.countries.forEach((c) => {
          const cName = (c?.name || c?.countryName || "").trim();
          if (cName && !countryMap.has(cName.toLowerCase())) {
            const flag =
              c.flag ||
              getFlagByCountryName(cName) ||
              `https://flagcdn.com/w160/${cName.slice(0, 2).toLowerCase()}.png`;
            countryMap.set(cName.toLowerCase(), { name: cName, flag });
          }
        });
      }

      if (job.country && typeof job.country === "string") {
        const cName = job.country.trim();
        if (cName && !countryMap.has(cName.toLowerCase())) {
          const flag =
            getFlagByCountryName(cName) ||
            `https://flagcdn.com/w160/${cName.slice(0, 2).toLowerCase()}.png`;
          countryMap.set(cName.toLowerCase(), { name: cName, flag });
        }
      }
    });

    return Array.from(countryMap.values());
  }, [jobs]);

  // Aggregate companies from active jobs
  const companyList = useMemo(() => {
    const companyMap = new Map();

    (Array.isArray(jobs) ? jobs : []).forEach((job) => {
      const companyName = (job.company || "").trim();
      if (!companyName) return;

      const key = companyName.toLowerCase();
      const existing = companyMap.get(key);

      const jobLogo =
        job.companyLogo?.displayUrl ||
        job.companyLogo?.url ||
        job.logoUrl ||
        "";

      const jobCountries = [];
      if (Array.isArray(job.countries) && job.countries.length > 0) {
        job.countries.forEach((c) => {
          const cName = (c?.name || c?.countryName || "").trim();
          if (cName) {
            jobCountries.push({
              name: cName,
              flag:
                c.flag ||
                getFlagByCountryName(cName) ||
                `https://flagcdn.com/w160/${cName.slice(0, 2).toLowerCase()}.png`,
            });
          }
        });
      } else if (job.country) {
        jobCountries.push({
          name: job.country.trim(),
          flag:
            getFlagByCountryName(job.country) ||
            `https://flagcdn.com/w160/${job.country.slice(0, 2).toLowerCase()}.png`,
        });
      }

      if (existing) {
        existing.jobCount += 1;
        if (!existing.logoUrl && jobLogo) {
          existing.logoUrl = jobLogo;
        }
        jobCountries.forEach((jc) => {
          if (
            !existing.countries.some(
              (c) => c.name.toLowerCase() === jc.name.toLowerCase(),
            )
          ) {
            existing.countries.push(jc);
          }
        });
      } else {
        companyMap.set(key, {
          name: companyName,
          logoUrl: jobLogo,
          countries: jobCountries,
          jobCount: 1,
          category:
            job.categoryName || job.department || job.domain || "Top Employer",
        });
      }
    });

    const dynamicCompanies = Array.from(companyMap.values());
    return dynamicCompanies.length > 0 ? dynamicCompanies : FALLBACK_COMPANIES;
  }, [jobs]);

  // Filter companies based on selected country
  const filteredCompanies = useMemo(() => {
    if (selectedCountry === "all") return companyList;

    return companyList.filter((comp) =>
      comp.countries.some(
        (c) => c.name.toLowerCase() === selectedCountry.toLowerCase(),
      ),
    );
  }, [companyList, selectedCountry]);

  // Click handler to open /jobs for that company
  const handleCompanyClick = (companyName) => {
    const params = new URLSearchParams();
    params.set("search", companyName);
    params.set("company", companyName);

    if (selectedCountry !== "all") {
      params.set("country", selectedCountry);
      params.set("location", selectedCountry);
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-10 sm:py-14 border-b border-slate-200/60">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-40 bg-gradient-to-r from-[#30AFFF]/5 via-[#A0E9FF]/10 to-[#30AFFF]/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#30AFFF]/10 border border-[#30AFFF]/25 text-[#0B6F9F] text-[11px] font-bold mb-2">
              <Sparkles className="w-3 h-3 text-[#30AFFF]" />
              <span>Hiring Worldwide</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Top Companies Hiring{" "}
              <span className="text-[#159FEF]">Across Countries</span>
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore leading global employers actively posting jobs. Click any
              company to browse all available roles.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-1.5 self-start md:self-auto px-4 py-2 rounded-full bg-white border border-[#30AFFF]/30 text-xs font-bold text-[#0B6F9F] hover:bg-[#30AFFF] hover:text-white transition-all duration-300 shadow-xs hover:shadow-md group"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Country Filter Tabs */}
        {adminCountries.length > 0 && (
          <div className="mb-5 overflow-x-auto pb-1.5 scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              <button
                type="button"
                onClick={() => setSelectedCountry("all")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
                  selectedCountry === "all"
                    ? "bg-[#30AFFF] text-white shadow-md shadow-[#30AFFF]/25"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-[#30AFFF]/40 hover:bg-[#30AFFF]/5"
                }`}
              >
                <Globe2 className="w-3 h-3" />
                <span>All ({companyList.length})</span>
              </button>

              {adminCountries.map((c) => {
                const countForCountry = companyList.filter((comp) =>
                  comp.countries.some(
                    (compC) =>
                      compC.name.toLowerCase() === c.name.toLowerCase(),
                  ),
                ).length;

                const active =
                  selectedCountry.toLowerCase() === c.name.toLowerCase();

                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCountry(c.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                      active
                        ? "bg-[#30AFFF] text-white shadow-md shadow-[#30AFFF]/25 font-bold"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-[#30AFFF]/40 hover:bg-[#30AFFF]/5"
                    }`}
                  >
                    {c.flag ? (
                      <img
                        src={c.flag}
                        alt={c.name}
                        className="w-3.5 h-2.5 object-cover rounded-[2px] shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span>{c.name}</span>
                    {countForCountry > 0 && (
                      <span
                        className={`text-[9px] px-1.5 rounded-full font-bold ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {countForCountry}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Company Cards Grid (compact) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
          {filteredCompanies.map((comp) => (
            <button
              type="button"
              key={comp.name}
              onClick={() => handleCompanyClick(comp.name)}
              className="group text-left bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#30AFFF]/50 hover:shadow-md hover:shadow-[#30AFFF]/10 transition-all duration-300 flex flex-col gap-2.5"
            >
              {/* Logo + Name + Category */}
              <div className="flex items-center gap-2.5 min-w-0">
                <CompanyLogo src={comp.logoUrl} name={comp.name} />

                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#159FEF] transition-colors truncate leading-tight">
                    {comp.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                    {comp.category}
                  </p>
                </div>
              </div>

              {/* Jobs badge */}
              <span className="inline-flex w-fit items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {comp.jobCount} {comp.jobCount === 1 ? "Job" : "Jobs"}
              </span>

              {/* Locations + Arrow */}
              <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1 min-w-0">
                  {comp.countries && comp.countries.length > 0 ? (
                    <>
                      {comp.countries.slice(0, 2).map((country, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-1 py-0.5 rounded bg-slate-50 border border-slate-200 text-[9px] font-medium text-slate-700"
                        >
                          {country.flag ? (
                            <img
                              src={country.flag}
                              alt={country.name}
                              className="w-3 h-2 object-cover rounded-[2px]"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}
                          <span className="truncate max-w-[56px]">
                            {country.name}
                          </span>
                        </span>
                      ))}
                      {comp.countries.length > 2 && (
                        <span className="px-1 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-600">
                          +{comp.countries.length - 2}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] text-slate-400 inline-flex items-center gap-1">
                      <Globe2 className="w-3 h-3" /> Worldwide
                    </span>
                  )}
                </div>

                <div className="w-5 h-5 shrink-0 rounded-full bg-[#30AFFF]/10 flex items-center justify-center text-[#159FEF] transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:text-white group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-6">
            <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">
              No companies found for this country yet
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Check back soon or browse all jobs worldwide.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCountry("all")}
              className="mt-3 px-4 py-2 rounded-xl bg-[#30AFFF] text-white text-xs font-bold hover:bg-[#159FEF] transition"
            >
              Reset to All Countries
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompaniesHiringSection;
