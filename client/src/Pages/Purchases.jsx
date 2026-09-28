import {
  ArrowLeft,
  Check,
  Crown,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  buySubscription,
  createSubscriptionOrder,
  fetchMySubscription,
  verifySubscriptionPayment,
} from "../redux/slicer/userSubscriptionSlice";

import FeedbackModal from "../components/FeedbackModal";

/* =====================================================
   PLAN ICONS
===================================================== */

const iconMap = {
  Free: Zap,
  Advanced: Sparkles,
  Premium: Crown,
};

/* =====================================================
   RAZORPAY SCRIPT
===================================================== */

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/* =====================================================
   PURCHASES
===================================================== */

const Purchases = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [feedback, setFeedback] = useState(null);

  /* =====================================================
     PLAN DATA
  ===================================================== */

  const subscriptionId = location.state?.subscriptionId;
  const planName = location.state?.planName;
  const price = location.state?.price ?? 0;
  const features = location.state?.features || [];

  /* =====================================================
     REDIRECT IF PLAN NOT SELECTED
  ===================================================== */

  useEffect(() => {
    if (!subscriptionId) {
      navigate("/subscription");
    }
  }, [subscriptionId, navigate]);

  /* =====================================================
     PLAN CALCULATION
  ===================================================== */

  const PlanIcon = iconMap[planName] || Sparkles;

  const isFree = price <= 0;

  const tax = Math.round(price * 0.18);

  const total = price + tax;

  /* =====================================================
     FREE PLAN ACTIVATION
  ===================================================== */

  const handleFreeActivation = async () => {
    setProcessing(true);
    setErrorMsg(null);

    try {
      await dispatch(
        buySubscription({
          subscriptionId,
          paymentMethod: "free",
          paymentId: `FREE-${Date.now()}`,
          autoRenew: false,
        }),
      ).unwrap();

      /*
       * Refresh latest subscription data
       * after successful activation.
       */
      await dispatch(fetchMySubscription()).unwrap();

      /*
       * Show success modal instead of alert.
       */
      setFeedback({
        title: "Purchase successful",
        message: `${planName} plan is now active. A confirmation email has been sent to your registered email address.`,
        type: "success",
      });

      /*
       * Redirect after feedback modal is shown.
       */
      setTimeout(() => {
        navigate("/my-subscription");
      }, 1200);
    } catch (err) {
      setErrorMsg(
        typeof err === "string"
          ? err
          : err?.message ||
              "Activation failed. Please try again.",
      );
    } finally {
      setProcessing(false);
    }
  };

  /* =====================================================
     RAZORPAY PAYMENT
  ===================================================== */

  const handlePayment = async () => {
    setProcessing(true);
    setErrorMsg(null);

    try {
      /* -----------------------------------------------
         LOAD RAZORPAY
      ------------------------------------------------ */

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setErrorMsg(
          "Unable to load the secure payment gateway. Please check your internet connection and try again.",
        );

        setProcessing(false);
        return;
      }

      /* -----------------------------------------------
         CREATE ORDER
      ------------------------------------------------ */

      const order = await dispatch(
        createSubscriptionOrder({
          subscriptionId,
        }),
      ).unwrap();

      /* -----------------------------------------------
         RAZORPAY OPTIONS
      ------------------------------------------------ */

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CareerSphere",
        description: `${planName} Plan Subscription`,
        order_id: order.orderId,

        /* ---------------------------------------------
           PAYMENT SUCCESS
        --------------------------------------------- */

        handler: async function (response) {
          try {
            await dispatch(
              verifySubscriptionPayment({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                subscriptionId,
                autoRenew: false,
              }),
            ).unwrap();

            /*
             * Refresh latest subscription data
             * after successful payment verification.
             */
            await dispatch(
              fetchMySubscription(),
            ).unwrap();

            /*
             * Show success feedback.
             */
            setFeedback({
              title: "Payment successful",
              message:
                "Your subscription is now active. A confirmation email has been sent to your registered email address.",
              type: "success",
            });

            /*
             * Redirect after success feedback.
             */
            setTimeout(() => {
              navigate("/my-subscription");
            }, 1200);
          } catch (err) {
            setErrorMsg(
              typeof err === "string"
                ? err
                : err?.message ||
                    "Payment verification failed.",
            );
          } finally {
            setProcessing(false);
          }
        },

        /* ---------------------------------------------
           RAZORPAY MODAL DISMISSED
        --------------------------------------------- */

        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },

        /* ---------------------------------------------
           CAREERSPHERE THEME
        --------------------------------------------- */

        theme: {
          color: "#30AFFF",
        },
      };

      /* -----------------------------------------------
         CREATE RAZORPAY OBJECT
      ------------------------------------------------ */

      const razorpayObject = new window.Razorpay(
        options,
      );

      /* -----------------------------------------------
         PAYMENT FAILED
      ------------------------------------------------ */

      razorpayObject.on(
        "payment.failed",
        function (response) {
          setErrorMsg(
            response.error?.description ||
              "Payment failed. Please try again.",
          );

          setProcessing(false);
        },
      );

      /* -----------------------------------------------
         OPEN CHECKOUT
      ------------------------------------------------ */

      razorpayObject.open();
    } catch (err) {
      setErrorMsg(
        typeof err === "string"
          ? err
          : err?.message ||
              "Unable to start payment. Please try again.",
      );

      setProcessing(false);
    }
  };

  /* =====================================================
     PREVENT EMPTY RENDER
  ===================================================== */

  if (!subscriptionId) {
    return null;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/subscription")}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-[#A0E9FF]/10 hover:text-[#159FEF]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            <span>Back to Plans</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A0E9FF]/60 bg-[#A0E9FF]/20 text-[#159FEF]">
              <LockKeyhole size={17} />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-800">
                Secure Checkout
              </p>

              <p className="text-[11px] text-slate-400">
                Protected payment
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#30AFFF]/10 blur-3xl" />

        <div className="absolute -left-28 bottom-[-180px] h-80 w-80 rounded-full bg-[#A0E9FF]/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-7 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8 lg:pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A0E9FF] bg-[#A0E9FF]/20 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#159FEF]">
              <Sparkles size={14} />

              CareerSphere Premium Checkout
            </div>

            <h1 className="mt-4 text-[29px] font-black leading-[1.08] tracking-[-0.035em] text-slate-900 sm:mt-5 sm:text-4xl lg:text-5xl">
              Complete your

              <span className="block bg-gradient-to-r from-[#159FEF] to-[#30AFFF] bg-clip-text text-transparent">
                subscription securely.
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-[13px] leading-5.5 text-slate-500 sm:text-base sm:leading-7">
              Unlock premium career tools with a secure and
              seamless checkout experience designed for every
              device.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          CHECKOUT
      ================================================= */}

      <section className="px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_410px] xl:grid-cols-[minmax(0,1fr)_440px]">
          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-[22px] border border-[#A0E9FF]/70 bg-white shadow-[0_12px_36px_rgba(48,175,255,0.12)] sm:rounded-[28px]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#159FEF] via-[#30AFFF] to-[#5CCBFF] p-6 text-white sm:p-7">
                <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full border-[22px] border-white/10" />

                <div className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full border-[18px] border-white/10" />

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                    Order Summary
                  </p>

                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[22px] font-black tracking-tight sm:text-2xl">
                        {planName}
                      </h2>

                      <p className="mt-1 text-sm text-white/80">
                        Premium subscription
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm">
                      <PlanIcon size={22} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      {planName} subscription
                    </span>

                    <span className="font-bold text-slate-900">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {!isFree && (
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">
                        GST (18%)
                      </span>

                      <span className="font-bold text-slate-900">
                        ₹{tax.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-slate-200" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Total payable
                      </p>
                    </div>

                    <span className="text-[28px] font-black tracking-tight text-[#159FEF] sm:text-3xl">
                      ₹
                      {isFree
                        ? 0
                        : total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={
                    isFree
                      ? handleFreeActivation
                      : handlePayment
                  }
                  disabled={processing}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#159FEF] via-[#30AFFF] to-[#5CCBFF] py-4 text-sm font-black text-white shadow-[0_10px_25px_rgba(48,175,255,0.25)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-7"
                >
                  {processing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Processing...
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={17} />

                      {isFree
                        ? "Activate for Free"
                        : `Pay ₹${total.toLocaleString(
                            "en-IN",
                          )}`}
                    </>
                  )}
                </button>

                <div className="mt-4 rounded-2xl border border-[#A0E9FF]/60 bg-[#A0E9FF]/10 p-3.5 sm:mt-5 sm:p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/40 text-[#159FEF]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-800">
                        Secure & Protected
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your payment details are encrypted and
                        securely processed by Razorpay.
                        CareerSphere does not store your card
                        details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
                  <LockKeyhole size={12} />

                  <span>
                    Secure checkout • Encrypted payment
                  </span>
                </div>

                <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                  By continuing, you agree to CareerSphere's
                  Terms of Service and Subscription Policy.
                </p>
              </div>
            </div>
          </aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="space-y-5">
            {/* SELECTED PLAN */}

            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(48,175,255,0.07)] sm:rounded-[26px]">
              <div className="h-1.5 bg-gradient-to-r from-[#159FEF] via-[#A0E9FF] to-[#159FEF]" />

              <div className="p-4 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#A0E9FF]/70 bg-[#A0E9FF]/20 text-[#159FEF] shadow-sm sm:h-14 sm:w-14">
                      <PlanIcon
                        size={25}
                        strokeWidth={2.1}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#159FEF]">
                        Selected Plan
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                        {planName} Plan
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/subscription")
                    }
                    className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-[#159FEF] transition hover:border-[#A0E9FF] hover:bg-[#A0E9FF]/10 sm:self-center"
                  >
                    Change Plan
                  </button>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Included benefits
                  </p>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {features.length > 0 ? (
                      features.map((feature, index) => (
                        <div
                          key={`${feature}-${index}`}
                          className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-[13px] leading-5 text-slate-600 transition hover:bg-[#A0E9FF]/10"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A0E9FF]/30 text-[#159FEF]">
                            <Check
                              size={12}
                              strokeWidth={3}
                            />
                          </span>

                          <span>
                            {String(feature).trim()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500 sm:col-span-2">
                        No additional benefits listed for
                        this plan.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT INFORMATION */}

            {!isFree && (
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(48,175,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/20 text-[#159FEF]">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900 sm:text-xl">
                      Secure Payment
                    </h2>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      Select your preferred payment method in
                      the secure Razorpay checkout. You can pay
                      using UPI, cards, or net banking.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    "UPI",
                    "Credit / Debit Cards",
                    "Net Banking",
                  ].map((method) => (
                    <div
                      key={method}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-600 transition hover:border-[#A0E9FF] hover:bg-[#A0E9FF]/10"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ERROR MESSAGE */}

            {errorMsg && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-600">
                {typeof errorMsg === "string"
                  ? errorMsg
                  : errorMsg?.message ||
                    "Something went wrong. Please try again."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          FEEDBACK MODAL
      ================================================= */}

      {feedback && (
        <FeedbackModal
          {...feedback}
          onClose={() => setFeedback(null)}
        />
      )}
    </main>
  );
};

export default Purchases;