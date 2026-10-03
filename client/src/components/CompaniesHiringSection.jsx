import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
const CompaniesHiringSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs = [] } = useSelector((state) => state.jobs || {});
  const [selectedCountry, setSelectedCountry] = useState("all");
  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      dispatch(getAllJobsUser({ limit: 50 }));
    }
  }, [dispatch, jobs]);
  // Extract unique countries added by admin in jobs
  const adminCountries = useMemo(() => {
    const countryMap = new Map();
    (Array.isArray(jobs) ? jobs : []).forEach((job) => {
      // Check multiple countries array
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
      // Check single country field fallback
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
      // Collect countries for this job
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
        // Merge countries without duplicate
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
    // If dynamic companies exist, return them; otherwise blend with fallback
    if (dynamicCompanies.length > 0) {
      return dynamicCompanies;
    }
    return FALLBACK_COMPANIES;
  }, [jobs]);
  // Filter companies based on selected country
  const filteredCompanies = useMemo(() => {
    if (selectedCountry === "all") {
      return companyList;
    }
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-14 sm:py-20 border-b border-slate-200/60">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-r from-[#30AFFF]/5 via-[#A0E9FF]/10 to-[#30AFFF]/5 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#30AFFF]/10 border border-[#30AFFF]/25 text-[#0B6F9F] text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#30AFFF]" />
              <span>Hiring Worldwide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Top Companies Hiring{" "}
              <span className="text-[#159FEF]">Across Countries</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore leading global employers actively posting jobs. Click any
              company to browse all available roles.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-full bg-white border border-[#30AFFF]/30 text-xs sm:text-sm font-bold text-[#0B6F9F] hover:bg-[#30AFFF] hover:text-white transition-all duration-300 shadow-xs hover:shadow-md group"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        {/* Dynamic Country Filter Tabs (from admin-added countries) */}
        {adminCountries.length > 0 && (
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <button
                type="button"
                onClick={() => setSelectedCountry("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCountry === "all"
                    ? "bg-[#30AFFF] text-white shadow-md shadow-[#30AFFF]/25 ring-2 ring-[#30AFFF]/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-[#30AFFF]/40 hover:bg-[#30AFFF]/5"
                }`}
              >
                <Globe2 className="w-3 h-3" />
                <span>All Countries ({companyList.length})</span>
              </button>
              {adminCountries.map((c) => {
                const countForCountry = companyList.filter((comp) =>
                  comp.countries.some(
                    (compC) =>
                      compC.name.toLowerCase() === c.name.toLowerCase(),
                  ),
                ).length;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCountry(c.name)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                      selectedCountry.toLowerCase() === c.name.toLowerCase()
                        ? "bg-[#30AFFF] text-white shadow-md shadow-[#30AFFF]/25 ring-2 ring-[#30AFFF]/20 font-bold"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-[#30AFFF]/40 hover:bg-[#30AFFF]/5"
                    }`}
                  >
                    {c.flag ? (
                      <img
                        src={c.flag}
                        alt={c.name}
                        className="w-4 h-3 object-cover rounded-2xs border border-white/60 shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span>{c.name}</span>
                    {countForCountry > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          selectedCountry.toLowerCase() === c.name.toLowerCase()
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
        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCompanies.map((comp) => {
            const initial = comp.name?.charAt(0)?.toUpperCase() || "C";
            return (
              <div
                key={comp.name}
                onClick={() => handleCompanyClick(comp.name)}
                className="group relative bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-[#30AFFF]/50 hover:shadow-lg hover:shadow-[#30AFFF]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top: Logo & Open Roles Badge */}
                  <div className="flex items-start justify-between gap-2.5 mb-3">
                    <div className="w-11 h-11 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center p-2 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      {comp.logoUrl ? (
                        <img
                          src={comp.logoUrl}
                          alt={comp.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.parentElement) {
                              e.currentTarget.parentElement.innerHTML = `<span class="text-xl font-extrabold text-[#159FEF]">${initial}</span>`;
                            }
                          }}
                        />
                      ) : (
                        <span className="text-lg font-extrabold text-[#159FEF]">
                          {initial}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>
                        {comp.jobCount} {comp.jobCount === 1 ? "Job" : "Jobs"}
                      </span>
                    </span>
                  </div>
                  {/* Company Name */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#159FEF] transition-colors line-clamp-1">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {comp.category}
                  </p>
                  {/* Countries with Flagcdn Flags */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Locations:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {comp.countries && comp.countries.length > 0 ? (
                        comp.countries.slice(0, 3).map((country, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-700"
                          >
                            {country.flag ? (
                              <img
                                src={country.flag}
                                alt={country.name}
                                className="w-3 h-2 object-cover rounded-2xs"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : null}
                            <span className="truncate max-w-[82px]">
                              {country.name}
                            </span>
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                          <Globe2 className="w-3 h-3" /> Worldwide
                        </span>
                      )}
                      {comp.countries && comp.countries.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[9px] font-bold text-slate-600">
                          +{comp.countries.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Bottom Action */}
                <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] font-bold text-[#0B6F9F] group-hover:text-[#159FEF]">
                  <span>Explore Jobs</span>
                  <div className="w-6 h-6 rounded-full bg-[#30AFFF]/10 flex items-center justify-center text-[#159FEF] transition-all duration-300 group-hover:bg-[#30AFFF] group-hover:text-white group-hover:translate-x-1">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">
              No companies found for this country yet
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Check back soon or browse all jobs worldwide.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCountry("all")}
              className="mt-4 px-4 py-2 rounded-xl bg-[#30AFFF] text-white text-xs font-bold hover:bg-[#159FEF] transition"
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
