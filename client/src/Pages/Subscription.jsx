import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAllSubscriptions,
  fetchMySubscription,
  fetchSubscriptionHistory,
} from "../redux/slicer/userSubscriptionSlice";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth state
  const { isAuthenticated } = useSelector((state) => state.auth || {});

  // Subscription state
  const {
    subscriptions,
    fetchLoading,
    fetchError,
    mySubscription,
    history,
  } = useSelector((state) => state.userSubscription);

  // =====================================================
  // FETCH SUBSCRIPTION PLANS + USER'S SUBSCRIPTIONS
  // =====================================================
  useEffect(() => {
    dispatch(fetchAllSubscriptions());

    if (isAuthenticated) {
      dispatch(fetchMySubscription());
      dispatch(fetchSubscriptionHistory());
    }
  }, [dispatch, isAuthenticated]);

  // =====================================================
  // SELECT PLAN
  // =====================================================
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.planName);
  };

  // =====================================================
  // CHECK WHETHER USER ALREADY PURCHASED THIS PLAN
  // =====================================================
  const isPlanPurchased = (planId) => {
    if (!Array.isArray(history) || !planId) {
      return false;
    }

    return history.some((userSubscription) => {
      const purchasedPlanId =
        typeof userSubscription?.subscription === "object"
          ? userSubscription?.subscription?._id
          : userSubscription?.subscription;

      if (!purchasedPlanId) {
        return false;
      }

      const isActive = userSubscription?.isActive === true;

      const isPaymentCompleted =
        userSubscription?.paymentStatus === "completed";

      const isNotExpired =
        userSubscription?.endDate &&
        new Date(userSubscription.endDate) > new Date();

      return (
        purchasedPlanId.toString() === planId.toString() &&
        isActive &&
        isPaymentCompleted &&
        isNotExpired
      );
    });
  };

  // =====================================================
  // GO TO PURCHASE PAGE
  // =====================================================
  const handlePlanClick = (plan) => {
    // Prevent purchasing the same active plan again
    if (isPlanPurchased(plan._id)) {
      return;
    }

    navigate("/purchases", {
      state: {
        subscriptionId: plan._id,
        planName: plan.planName,
        price: plan.price,
        features: plan.features,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (fetchLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-[#30AFFF]">
          Loading plans...
        </p>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (fetchError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-red-500">
          {fetchError}
        </p>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-white px-5 pb-6 pt-8 sm:px-8 lg:px-10 lg:pb-8 lg:pt-8">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#A0E9FF]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#30AFFF]/20 bg-[#A0E9FF]/40 px-4 py-2 text-sm font-semibold text-[#159FEF]">
            <Sparkles size={16} />
            CareerSphere Plans
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl xl:text-[44px]">
            Choose the plan that{" "}
            <span>fits your career</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:text-lg">
            Start free and unlock powerful career tools as you grow. Find
            opportunities, build skills, and take your career to the next level.
          </p>
        </div>
      </section>

      {/* =====================================================
          PRICING CARDS
      ====================================================== */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10 lg:pb-8">
        {!subscriptions || subscriptions.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            Abhi koi plan available nahi hai.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((plan) => {
              const isSelected = selectedPlan === plan.planName;

              const isPopular = plan.isPopular;

              // Check ALL user's active purchased subscriptions
              const isAlreadyPurchased = isPlanPurchased(plan._id);

              // Discount calculation
              const hasDiscount = plan.discountPercentage > 0;

              const originalPrice = hasDiscount
                ? Math.round(
                    plan.price / (1 - plan.discountPercentage / 100)
                  )
                : null;

              return (
                <div
                  key={plan._id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`relative flex cursor-pointer flex-col rounded-3xl border bg-white p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7 lg:p-8 ${
                    isSelected
                      ? "shadow-2xl ring-2 ring-[#30AFFF]"
                      : isPopular
                        ? "border-[#30AFFF]/40 shadow-2xl"
                        : "border-slate-200 shadow-sm"
                  }`}
                  style={
                    isSelected || isPopular
                      ? {
                          borderColor: isSelected
                            ? "#30AFFF"
                            : "rgba(48,175,255,0.4)",
                          boxShadow:
                            "0 20px 40px -10px rgba(48,175,255,0.20)",
                        }
                      : undefined
                  }
                >
                  {/* =====================================================
                      BADGE
                  ====================================================== */}
                  {plan.badge && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <span className="whitespace-nowrap rounded-full bg-[#30AFFF] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-[#30AFFF]/20 sm:px-5 sm:py-2 sm:text-xs">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* =====================================================
                      SELECTED
                  ====================================================== */}
                  {isSelected && (
                    <div className="absolute right-5 top-5 rounded-full bg-[#30AFFF] px-3 py-1 text-[10px] font-bold text-white shadow-sm">
                      Selected
                    </div>
                  )}

                  {/* =====================================================
                      PLAN INFO
                  ====================================================== */}
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF] sm:h-12 sm:w-12">
                      <Sparkles size={18} className="sm:size-[22px]" />
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                      {plan.planName}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  {/* =====================================================
                      PRICE
                  ====================================================== */}
                  <div className="mt-5 sm:mt-6 lg:mt-7">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {plan.formattedPrice}
                      </span>

                      {hasDiscount && (
                        <span className="mb-1 text-sm text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {hasDiscount && (
                      <p className="mt-1 text-xs font-medium text-emerald-600 sm:mt-2">
                        {plan.discountPercentage}% off
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                      CTA
                  ====================================================== */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan);
                    }}
                    disabled={isAlreadyPurchased}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition sm:py-3.5 ${
                      isAlreadyPurchased
                        ? "cursor-not-allowed bg-slate-400 shadow-none"
                        : "bg-[#30AFFF] shadow-[#30AFFF]/15 hover:bg-[#159FEF]"
                    }`}
                  >
                    {isAlreadyPurchased
                      ? "Already Purchased"
                      : `Go ${plan.planName}`}

                    {!isAlreadyPurchased && (
                      <ArrowRight
                        size={16}
                        className="sm:size-[17px]"
                      />
                    )}
                  </button>

                  {/* =====================================================
                      DIVIDER
                  ====================================================== */}
                  <div className="my-5 h-px bg-slate-100 sm:my-6 lg:my-7" />

                  {/* =====================================================
                      FEATURES
                  ====================================================== */}
                  <div className="flex-1">
                    <p className="mb-4 text-sm font-bold text-slate-900 sm:mb-5">
                      What's included
                    </p>

                    <ul className="space-y-3 sm:space-y-4">
                      {(plan.features || []).map((feature, index) => (
                        <li
                          key={`${feature}-${index}`}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/40 text-[#159FEF]">
                            <Check size={13} strokeWidth={3} />
                          </span>

                          <span>{feature.trim()}</span>
                        </li>
                      ))}
                    </ul>

                    {/* =====================================================
                        PLAN LIMITS
                    ====================================================== */}
                    <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>
                        {plan.numberOfCountries ||
                          plan.countries?.length ||
                          1}{" "}
                        countries
                      </span>

                      <span>•</span>

                      <span>{plan.maxJobs} job posts</span>

                      <span>•</span>

                      <span>{plan.maxApplications} applications</span>
                    </div>

                    {/* =====================================================
                        AVAILABLE COUNTRIES
                    ====================================================== */}
                    {plan.countries?.length > 0 && (
                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        Available in:{" "}
                        {plan.countries.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A0E9FF]/40 text-[#159FEF]">
            <ShieldCheck size={20} className="sm:size-[21px]" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Simple, transparent pricing
            </p>

            <p className="mt-1 text-sm text-slate-500">
              No hidden charges. Upgrade or cancel whenever you want.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Subscription;