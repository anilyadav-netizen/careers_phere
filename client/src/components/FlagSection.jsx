import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Building2,
  Wifi,
  Landmark,
  Rocket,
  Users,
  Code,
  Award,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Truck,
  Globe2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlagSection = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [experienceOpen, setExperienceOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const [mobileCountryIndex, setMobileCountryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const experienceRef = useRef(null);
  const countryRef = useRef(null);

  const countries = [
    { name: "United States", flag: "https://flagcdn.com/w320/us.png" },
    { name: "United Kingdom", flag: "https://flagcdn.com/w320/gb.png" },
    { name: "Canada", flag: "https://flagcdn.com/w320/ca.png" },
    { name: "Australia", flag: "https://flagcdn.com/w320/au.png" },
    { name: "Germany", flag: "https://flagcdn.com/w320/de.png" },
    { name: "France", flag: "https://flagcdn.com/w320/fr.png" },
    { name: "Japan", flag: "https://flagcdn.com/w320/jp.png" },
    { name: "India", flag: "https://flagcdn.com/w320/in.png" },
    { name: "Netherlands", flag: "https://flagcdn.com/w320/nl.png" },
    { name: "Switzerland", flag: "https://flagcdn.com/w320/ch.png" },
    { name: "New Zealand", flag: "https://flagcdn.com/w320/nz.png" },
    { name: "Singapore", flag: "https://flagcdn.com/w320/sg.png" },
    { name: "Ireland", flag: "https://flagcdn.com/w320/ie.png" },
    { name: "Sweden", flag: "https://flagcdn.com/w320/se.png" },
    { name: "Norway", flag: "https://flagcdn.com/w320/no.png" },
    { name: "Denmark", flag: "https://flagcdn.com/w320/dk.png" },
    { name: "Finland", flag: "https://flagcdn.com/w320/fi.png" },
    { name: "Italy", flag: "https://flagcdn.com/w320/it.png" },
    { name: "Spain", flag: "https://flagcdn.com/w320/es.png" },
    { name: "UAE", flag: "https://flagcdn.com/w320/ae.png" },
    { name: "South Korea", flag: "https://flagcdn.com/w320/kr.png" },
    { name: "Belgium", flag: "https://flagcdn.com/w320/be.png" },
    { name: "Austria", flag: "https://flagcdn.com/w320/at.png" },
    { name: "Portugal", flag: "https://flagcdn.com/w320/pt.png" },
  ];

  // Build pages of 4 and triple them for seamless infinite loop
  const PAGE_SIZE = 4;
  const basePages = [];
  for (let i = 0; i < countries.length; i += PAGE_SIZE) {
    basePages.push(countries.slice(i, i + PAGE_SIZE));
  }
  // Pad the last page if it has fewer than 4 items so loops stay visually even
  const lastPage = basePages[basePages.length - 1];
  if (lastPage.length < PAGE_SIZE) {
    const padded = [...lastPage];
    let fillIdx = 0;
    while (padded.length < PAGE_SIZE) {
      padded.push(countries[fillIdx % countries.length]);
      fillIdx++;
    }
    basePages[basePages.length - 1] = padded;
  }

  const totalPages = basePages.length;
  // Triple the pages: [clone] [real] [clone]
  const loopPages = [...basePages, ...basePages, ...basePages];

  const experienceOptions = [
    { label: "Fresher", value: "Fresher" },
    { label: "1 year", value: "1" },
    { label: "2 years", value: "2" },
    { label: "3 years", value: "3" },
    { label: "4 years", value: "4" },
    { label: "5 years", value: "5" },
  ];

  const categories = [
    { icon: Wifi, label: "Remote" },
    { icon: Building2, label: "MNC" },
    { icon: Landmark, label: "Banking & ..." },
    { icon: Rocket, label: "Startup" },
    { icon: Users, label: "HR" },
    { icon: Code, label: "Engineering" },
    { icon: Award, label: "Fortune 500" },
    { icon: GraduationCap, label: "Internship" },
    { icon: Briefcase, label: "Project Mg..." },
    { icon: ShoppingCart, label: "Sales" },
    { icon: Truck, label: "Supply Ch..." },
  ];

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        experienceRef.current &&
        !experienceRef.current.contains(event.target)
      ) {
        setExperienceOpen(false);
      }

      if (
        countryRef.current &&
        !countryRef.current.contains(event.target)
      ) {
        setCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= INITIAL OFFSET FOR LOOP ================= */

  // Start at the beginning of the middle (real) block
  useEffect(() => {
    setMobileCountryIndex(totalPages);
  }, [totalPages]);

  /* ================= INFINITE AUTO SLIDER ================= */

  useEffect(() => {
    if (showAllCountries) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setMobileCountryIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [showAllCountries]);

  /* ================= SEAMLESS LOOP RESET ================= */

  useEffect(() => {
    // When we enter the last (third) clone block, snap back to middle block instantly
    if (mobileCountryIndex >= totalPages * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setMobileCountryIndex((prev) => prev - totalPages);
      }, 720); // matches transition duration
      return () => clearTimeout(timeout);
    }

    // If we ever go into the first clone block (e.g. manual backwards), snap forward
    if (mobileCountryIndex < totalPages) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setMobileCountryIndex((prev) => prev + totalPages);
      }, 720);
      return () => clearTimeout(timeout);
    }
  }, [mobileCountryIndex, totalPages]);

  // Re-enable transition after the instant snap
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  /* ================= DOTS ================= */

  // Current active dot maps to which of the real pages is showing
  const activeDot =
    ((mobileCountryIndex - totalPages) % totalPages + totalPages) % totalPages;

  const goToPage = (dotIndex) => {
    setIsTransitioning(true);
    setMobileCountryIndex(totalPages + dotIndex);
  };

  /* ================= COUNTRY CARD CLICK ================= */

  const handleCountryClick = (country) => {
    navigate(`/jobs?country=${encodeURIComponent(country.name)}`);
  };

  /* ================= COUNTRY SELECT ================= */

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
    setCountryOpen(false);

    navigate(`/jobs?country=${encodeURIComponent(country.name)}`);
  };

  /* ================= SEARCH ================= */

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (experience) {
      params.set("experience", experience);
    }

    if (selectedCountry) {
      params.set("country", selectedCountry);
    }

    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  /* ================= COUNTRY FLAG ================= */

  const getCountryFlag = (countryName) => {
    const country = countries.find((item) => item.name === countryName);
    return country ? country.flag : null;
  };

  const remainingCountries = countries.length - 4;

  return (
    <section className="overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            JOB SEARCH BAR
        ===================================================== */}

        <div className="relative z-30 mx-auto mb-10 w-full max-w-5xl">
          {/* ================= MOBILE SEARCH ================= */}

          <div className="sm:hidden">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen((prev) => !prev);
                  setExperienceOpen(false);
                  setCountryOpen(false);
                }}
                aria-label="Search jobs"
                className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-200 ${
                  mobileSearchOpen
                    ? "border-[#30AFFF] text-[#30AFFF] shadow-md"
                    : "border-slate-100 text-slate-500 shadow-sm"
                }`}
              >
                <Search size={21} />
              </button>

              <div ref={experienceRef} className="relative min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setExperienceOpen((prev) => !prev);
                    setCountryOpen(false);
                  }}
                  className="flex h-[52px] w-full items-center justify-between rounded-full border border-slate-100 bg-white px-3 shadow-sm"
                >
                  <span
                    className={`truncate text-[12px] font-medium ${
                      experience ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {experience
                      ? experienceOptions.find(
                          (item) => item.value === experience
                        )?.label
                      : "Experience"}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`ml-1 shrink-0 text-slate-500 transition-transform duration-200 ${
                      experienceOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {experienceOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-[190px] overflow-hidden rounded-2xl border border-slate-100 bg-white py-1 shadow-[0_15px_35px_rgba(15,23,42,0.14)]">
                    {experienceOptions.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setExperience(item.value);
                          setExperienceOpen(false);
                        }}
                        className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-all duration-200 hover:bg-[#30AFFF]/5 hover:text-[#30AFFF] ${
                          experience === item.value
                            ? "bg-[#30AFFF]/5 font-semibold text-[#30AFFF]"
                            : "text-slate-800"
                        }`}
                      >
                        {item.label}

                        {item.value === "Fresher" && (
                          <span className="ml-2 text-[10px] text-slate-400">
                            (less than 1 year)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div ref={countryRef} className="relative min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setCountryOpen((prev) => !prev);
                    setExperienceOpen(false);
                  }}
                  className="flex h-[52px] w-full items-center justify-between rounded-full border border-slate-100 bg-white px-3 shadow-sm"
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    {selectedCountry && getCountryFlag(selectedCountry) && (
                      <img
                        src={getCountryFlag(selectedCountry)}
                        alt={selectedCountry}
                        className="h-4 w-6 shrink-0 rounded-sm object-cover"
                      />
                    )}

                    <span
                      className={`truncate text-[12px] font-medium ${
                        selectedCountry ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {selectedCountry || "Location"}
                    </span>
                  </span>

                  <ChevronDown
                    size={16}
                    className={`ml-1 shrink-0 text-slate-500 transition-transform duration-200 ${
                      countryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {countryOpen && (
                  <div className="absolute right-0 top-full z-50 mt-1 max-h-72 w-[220px] overflow-y-auto rounded-2xl border border-slate-100 bg-white py-1 shadow-[0_15px_35px_rgba(15,23,42,0.14)]">
                    {countries.map((country) => (
                      <button
                        key={country.name}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-all duration-200 hover:bg-[#30AFFF]/5 hover:text-[#30AFFF] ${
                          selectedCountry === country.name
                            ? "bg-[#30AFFF]/5 font-semibold text-[#30AFFF]"
                            : "text-slate-800"
                        }`}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="h-5 w-7 shrink-0 rounded-sm object-cover"
                        />

                        <span className="truncate">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {mobileSearchOpen && (
              <div className="mt-2 flex min-h-[54px] items-center rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
                <Search size={19} className="mx-2 shrink-0 text-slate-500" />

                <input
                  type="text"
                  autoFocus
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Skills, designation, company"
                  className="min-w-0 flex-1 bg-transparent px-1 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="shrink-0 rounded-xl bg-[#30AFFF] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#30AFFF]/20 transition-all duration-200 hover:bg-[#159FEF] active:scale-95"
                >
                  Search
                </button>
              </div>
            )}
          </div>

          {/* ================= DESKTOP SEARCH ================= */}

          <div className="hidden min-h-[68px] flex-col rounded-[28px] border border-slate-100 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,0.10)] sm:flex sm:flex-row sm:items-center">
            <div className="flex min-h-[54px] flex-1 items-center px-4">
              <Search size={20} className="mr-3 shrink-0 text-slate-500" />

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Enter skills / designations / companies"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />
            </div>

            <div className="hidden h-7 w-px bg-slate-200 sm:block" />

            <div ref={experienceRef} className="relative min-w-[190px]">
              <button
                type="button"
                onClick={() => {
                  setExperienceOpen((prev) => !prev);
                  setCountryOpen(false);
                }}
                className="flex min-h-[54px] w-full items-center justify-between px-4 text-left"
              >
                <span
                  className={`truncate text-sm sm:text-base ${
                    experience ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {experience
                    ? experienceOptions.find(
                        (item) => item.value === experience
                      )?.label
                    : "Select experience"}
                </span>

                <ChevronDown
                  size={18}
                  className={`ml-2 shrink-0 text-slate-500 transition-transform duration-200 ${
                    experienceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {experienceOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white py-1 text-left shadow-[0_15px_35px_rgba(15,23,42,0.14)]">
                  {experienceOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setExperience(item.value);
                        setExperienceOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-2.5 text-sm transition-all duration-200 hover:bg-[#30AFFF]/5 hover:text-[#30AFFF] ${
                        experience === item.value
                          ? "bg-[#30AFFF]/5 font-semibold text-[#30AFFF]"
                          : "text-slate-800"
                      }`}
                    >
                      {item.label}

                      {item.value === "Fresher" && (
                        <span className="ml-2 text-xs text-slate-400">
                          (less than 1 year)
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden h-7 w-px bg-slate-200 sm:block" />

            <div ref={countryRef} className="relative min-w-[190px]">
              <button
                type="button"
                onClick={() => {
                  setCountryOpen((prev) => !prev);
                  setExperienceOpen(false);
                }}
                className="flex min-h-[54px] w-full items-center justify-between px-4 text-left"
              >
                <span className="flex min-w-0 items-center gap-2 truncate text-sm sm:text-base">
                  {selectedCountry && getCountryFlag(selectedCountry) && (
                    <img
                      src={getCountryFlag(selectedCountry)}
                      alt={selectedCountry}
                      className="h-5 w-7 shrink-0 rounded-sm object-cover"
                    />
                  )}

                  <span
                    className={
                      selectedCountry
                        ? "truncate text-slate-800"
                        : "text-slate-400"
                    }
                  >
                    {selectedCountry || "Select location"}
                  </span>
                </span>

                <ChevronDown
                  size={18}
                  className={`ml-2 shrink-0 text-slate-500 transition-transform duration-200 ${
                    countryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {countryOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-100 bg-white py-1 shadow-[0_15px_35px_rgba(15,23,42,0.14)]">
                  {countries.map((country) => (
                    <button
                      key={country.name}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-all duration-200 hover:bg-[#30AFFF]/5 hover:text-[#30AFFF] ${
                        selectedCountry === country.name
                          ? "bg-[#30AFFF]/5 font-semibold text-[#30AFFF]"
                          : "text-slate-800"
                      }`}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="h-5 w-7 shrink-0 rounded-sm object-cover"
                      />

                      <span className="truncate">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-2 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#30AFFF] px-8 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-xl hover:shadow-[#30AFFF]/30 active:scale-[0.98] sm:mt-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <div className="mx-auto mb-8 w-full max-w-7xl px-2 sm:mb-10 sm:px-0">
          <div className="grid grid-cols-3 items-center justify-center gap-2 sm:flex sm:flex-wrap sm:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.label}
                  type="button"
                  className="group inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-[10px] font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#30AFFF]/40 hover:bg-[#30AFFF]/5 hover:text-[#30AFFF] hover:shadow-md sm:gap-3 sm:rounded-lg sm:px-5 sm:py-4 sm:text-xs md:px-6 md:py-4 md:text-sm"
                >
                  <Icon
                    size={16}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
                  />

                  <span className="whitespace-nowrap">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col items-center justify-center text-center">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Find Jobs Across <span>The World</span>
            </h2>
          </div>

          <p className="mt-1 max-w-xl text-[12px] leading-6 text-slate-500 sm:mt-3 sm:text-base sm:leading-7">
            Explore career opportunities in leading countries and discover your
            next opportunity around the world.
          </p>
        </div>

        {/* =====================================================
            COUNTRIES
        ===================================================== */}

        <div className="mt-6 sm:mt-9">
          {/* =================================================
              MOBILE POPULAR COUNTRY HEADER
          ================================================= */}

          <div className="mb-4 flex items-center justify-between sm:hidden">
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-900">
                Popular Country
              </h3>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Explore jobs worldwide
              </p>
            </div>

            {countries.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllCountries((prev) => !prev)}
                className="rounded-full border border-[#30AFFF]/30 bg-[#30AFFF]/5 px-4 py-2 text-[11px] font-bold text-[#159FEF] transition-all duration-300 hover:border-[#30AFFF] hover:bg-[#30AFFF]/10 active:scale-95"
              >
                {showAllCountries ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* =================================================
              MOBILE COUNTRY INFINITE SLIDER
          ================================================= */}

          <div className="sm:hidden">
            {!showAllCountries ? (
              <>
                <div className="relative overflow-hidden">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${mobileCountryIndex * 100}%)`,
                      transition: isTransitioning
                        ? "transform 700ms ease-out"
                        : "none",
                    }}
                  >
                    {loopPages.map((page, pageIndex) => (
                      <div
                        key={`page-${pageIndex}`}
                        className="grid min-w-full grid-cols-4 gap-2"
                      >
                        {page.map((country, idx) => (
                          <button
                            key={`${country.name}-${pageIndex}-${idx}`}
                            type="button"
                            onClick={() => handleCountryClick(country)}
                            className="group min-w-0 cursor-pointer text-center outline-none"
                          >
                            <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/70 shadow-[0_2px_8px_rgba(15,42,74,0.05)] transition-all duration-300 group-active:scale-[0.96] group-hover:-translate-y-0.5 group-hover:ring-[#30AFFF]/40 group-hover:shadow-[0_5px_14px_rgba(48,175,255,0.12)]">
                              <div className="mx-auto mt-1.5 aspect-[1.5/1] w-[85%] overflow-hidden rounded-md">
                                <img
                                  src={country.flag}
                                  alt={`${country.name} flag`}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>

                              <div className="px-1 py-1.5">
                                <p className="truncate text-[9px] font-semibold leading-3 text-slate-600 transition-colors duration-300 group-hover:text-[#159FEF]">
                                  {country.name}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DOT NAVIGATION */}
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {basePages.map((_, dotIdx) => (
                    <button
                      key={`dot-${dotIdx}`}
                      type="button"
                      aria-label={`Go to page ${dotIdx + 1}`}
                      onClick={() => goToPage(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeDot === dotIdx
                          ? "w-6 bg-[#30AFFF]"
                          : "w-1.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                {/* VIEW ALL BUTTON */}
                <button
                  type="button"
                  onClick={() => setShowAllCountries(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#30AFFF] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/30 transition-all duration-300 hover:bg-[#159FEF] active:scale-[0.98]"
                >
                  <Globe2 size={17} />
                  <span>View All {countries.length}+ Countries</span>
                  <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <div className="grid grid-cols-4 gap-x-2 gap-y-5">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => handleCountryClick(country)}
                    className="group min-w-0 cursor-pointer text-center outline-none"
                  >
                    <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/70 shadow-[0_2px_8px_rgba(15,42,74,0.05)] transition-all duration-300 group-active:scale-[0.96] group-hover:-translate-y-0.5 group-hover:ring-[#30AFFF]/40 group-hover:shadow-[0_5px_14px_rgba(48,175,255,0.12)]">
                      <div className="mx-auto mt-1.5 aspect-[1.5/1] w-[85%] overflow-hidden rounded-md">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="px-1 py-1.5">
                        <p className="truncate text-[9px] font-semibold leading-3 text-slate-600 transition-colors duration-300 group-hover:text-[#159FEF]">
                          {country.name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              TABLET + DESKTOP COUNTRY GRID
          ================================================= */}

          <div className="hidden grid-cols-4 gap-x-6 gap-y-7 sm:grid md:grid-cols-6 lg:grid-cols-8 lg:gap-x-7">
            {countries.map((country) => (
              <button
                key={`desktop-${country.name}`}
                type="button"
                onClick={() => handleCountryClick(country)}
                className="group flex min-w-0 cursor-pointer flex-col items-center justify-center text-center outline-none"
              >
                <div className="flex h-14 w-full max-w-[84px] items-center justify-center overflow-hidden rounded-md bg-slate-100 shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-[#30AFFF]/30 group-focus-visible:ring-2 group-focus-visible:ring-[#30AFFF] md:h-14 md:max-w-[88px] lg:h-16 lg:max-w-[96px]">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="mt-3 max-w-[110px] text-[11px] font-semibold leading-4 text-slate-600 transition-colors duration-300 group-hover:text-[#30AFFF] sm:text-xs md:text-sm">
                  {country.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            NO RESULT
        ===================================================== */}

        {countries.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#A0E9FF]/10">
              <MapPin size={20} className="text-[#30AFFF]" />
            </div>

            <h3 className="mt-3 text-sm font-bold text-slate-800 sm:text-base">
              No country found
            </h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Try searching with another country name.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlagSection;