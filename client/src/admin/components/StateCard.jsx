import React from "react";

const StatCard = ({
  title,
  value,
  description,
  icon,
  iconBg,
  iconClass = "bg-blue-50 text-blue-600",
  trend,
  trendPositive = true,
}) => {
  const Icon = icon;
  const wrapperClass = iconBg || iconClass;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${wrapperClass}`}
        >
          {React.isValidElement(icon) ? icon : <Icon size={21} />}
        </div>

        {trend && (
          <span
            className={`rounded-lg px-2 py-1 text-[10px] font-bold ${
              trendPositive
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-400">
          {title}
        </p>

        <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          {value}
        </h3>

        <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
