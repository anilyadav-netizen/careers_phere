
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { getCategories } from "../redux/slicer/categorySlice";

const JobCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getCategories());

    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // ============================================================
  // CATEGORY CLICK
  // ============================================================
  const handleCategoryClick = (category) => {
    const categoryId = category?._id || category?.id;
    const categoryName = category?.name || "";

    const params = new URLSearchParams();
    if (categoryId) {
      params.set("category", categoryId);
    } else if (categoryName) {
      params.set("category", categoryName);
    }

    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section
      className="relative overflow-hidden py-5"
      style={{ backgroundColor: "#e1eff2" }}
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-6 text-center">
          {/* Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-sm">
            <Sparkles size={18} className="text-[#30AFFF]" />

            <span className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
              Popular Categories
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            Browse by{" "}
            <span className="">
              Category
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Find your dream job in the most sought-after industries
          </p>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-[#30AFFF]" />
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}
        {!loading && error && (
          <div className="py-12 text-center">
            <div className="inline-block rounded-xl border border-red-200 bg-red-50/90 px-6 py-3 text-sm font-medium text-red-600 backdrop-blur-sm">
              {error}
            </div>
          </div>
        )}

        {/* =====================================================
            NO CATEGORIES
        ====================================================== */}
        {!loading && !error && categories?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-700">
              No categories available
            </p>
          </div>
        )}

        {/* =====================================================
            CATEGORIES
        ====================================================== */}
        {!loading && !error && categories?.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={category._id || category.id}
                onClick={() => handleCategoryClick(category)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/70 bg-white/90 p-3.5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#30AFFF]/40 hover:bg-white hover:shadow-lg ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                  transitionProperty: "all",
                  transitionDuration: "600ms",
                }}
              >
                {/* Active Badge */}
                {category.isActive !== false && (
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-[#30AFFF] px-2.5 py-1 text-[9px] font-bold text-white shadow-sm">
                    Active
                  </div>
                )}

                {/* =================================================
                    IMAGE + CATEGORY CONTENT
                ================================================== */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Category Image */}
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-[#A0E9FF]/50 sm:h-16 sm:w-16">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#A0E9FF]/50 text-[#159FEF]">
                        <Briefcase size={24} />
                      </div>
                    )}
                  </div>

                  {/* Name + Description */}
                  <div className="min-w-0 flex-1 pr-0 sm:pr-10">
                    <h3 className="line-clamp-1 text-sm font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-[#159FEF] sm:text-[15px]">
                      {category.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-4.5 text-gray-500">
                      {category.shortDescription ||
                        "Explore opportunities in this category"}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    BOTTOM INFO
                ================================================== */}
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  {/* Job Count */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A0E9FF]/60">
                      <Briefcase
                        size={13}
                        className="text-[#159FEF]"
                      />
                    </div>

                    <span className="text-xs font-bold text-gray-900">
                      {Number(category.jobCount || 0).toLocaleString()}
                    </span>

                    <span className="text-[11px] text-gray-500">
                      jobs
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#30AFFF]">
                    <ArrowRight
                      size={14}
                      className="text-gray-500 transition-colors group-hover:text-white"
                    />
                  </div>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-[#30AFFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}

        {/* =====================================================
            VIEW ALL
        ====================================================== */}
        {!loading && !error && categories?.length > 0 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-white/70 bg-white px-7 py-3.5 font-bold text-gray-900 shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#30AFFF]/40 hover:shadow-lg"
            >
              <span>View All Categories</span>

              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobCategories;

