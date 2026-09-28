// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Crown,
//   Sparkles,
// } from "lucide-react";

// const Banner = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
//       <div className="mx-auto w-full max-w-7xl">
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-5 py-4 shadow-xl sm:px-8 sm:py-4 lg:px-12 lg:py-4">
          
//           {/* Decorative circles */}
//           <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-sm" />
//           <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-400/20" />

//           {/* Content */}
//           <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

//             {/* LEFT CONTENT */}
//             <div className="text-center lg:text-left">

//               {/* Badge */}
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm sm:text-sm">
//                 <Crown size={16} />
//                 CareerSphere Premium
//               </div>

//               <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
//                 Take Your Career
//                 <span className="block text-blue-100">
//                   To The Next Level
//                 </span>
//               </h2>

//               <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7 lg:mx-0">
//                 Unlock premium features, discover better job opportunities,
//                 and get the tools you need to accelerate your career journey.
//               </p>

//               {/* Features */}
//               <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

//                 <div className="flex items-center justify-center gap-2 text-sm font-medium text-white lg:justify-start">
//                   <CheckCircle2
//                     size={18}
//                     className="shrink-0 text-blue-200"
//                   />
//                   Premium Job Access
//                 </div>

//                 <div className="flex items-center justify-center gap-2 text-sm font-medium text-white lg:justify-start">
//                   <CheckCircle2
//                     size={18}
//                     className="shrink-0 text-blue-200"
//                   />
//                   Advanced Job Filters
//                 </div>

//                 <div className="flex items-center justify-center gap-2 text-sm font-medium text-white lg:justify-start">
//                   <CheckCircle2
//                     size={18}
//                     className="shrink-0 text-blue-200"
//                   />
//                   Career Tools
//                 </div>

//                 <div className="flex items-center justify-center gap-2 text-sm font-medium text-white lg:justify-start">
//                   <CheckCircle2
//                     size={18}
//                     className="shrink-0 text-blue-200"
//                   />
//                   Priority Support
//                 </div>

//               </div>

//               {/* BUTTON */}
//               <div className="mt-8 flex justify-center lg:justify-start">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/subscription")}
//                   className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:px-7 sm:py-4 sm:text-base"
//                 >
//                   Explore Subscription
//                   <ArrowRight
//                     size={18}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                   />
//                 </button>
//               </div>

//             </div>

//             {/* RIGHT CARD */}
//             <div className="relative mx-auto w-full max-w-md">

//               <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-6">

//                 {/* Card Header */}
//                 <div className="flex items-center justify-between">

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600">
//                       <Sparkles size={21} />
//                     </div>

//                     <div>
//                       <p className="text-xs font-medium text-blue-100">
//                         Upgrade Your Plan
//                       </p>

//                       <h3 className="text-lg font-black text-white">
//                         Premium
//                       </h3>
//                     </div>

//                   </div>

//                   <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white">
//                     Popular
//                   </span>

//                 </div>

//                 {/* Price */}
//                 <div className="mt-7 rounded-2xl bg-white p-5">

//                   <p className="text-xs font-semibold text-slate-500">
//                     Starting from
//                   </p>

//                   <div className="mt-1 flex items-end gap-1">
//                     <span className="text-3xl font-black text-slate-900">
//                       ₹199
//                     </span>

//                     <span className="pb-1 text-sm text-slate-500">
//                       / month
//                     </span>
//                   </div>

//                   <div className="mt-5 space-y-3">

//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       <CheckCircle2
//                         size={16}
//                         className="text-blue-600"
//                       />
//                       Unlimited job applications
//                     </div>

//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       <CheckCircle2
//                         size={16}
//                         className="text-blue-600"
//                       />
//                       Premium career features
//                     </div>

//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       <CheckCircle2
//                         size={16}
//                         className="text-blue-600"
//                       />
//                       Better career visibility
//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;