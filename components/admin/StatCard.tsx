import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  color?: "amber" | "blue" | "emerald" | "purple";
}

export default function StatCard({
  label,
  value,
  description,
  icon,
  trend,
  color = "amber",
}: StatCardProps) {
  const colorStyles = {
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex items-start justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black font-serif text-zinc-950">
            {value}
          </span>
          {trend && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 mt-1">{description}</p>
      </div>

      <div className={`p-3 rounded-xl border ${colorStyles[color]}`}>
        {icon}
      </div>
    </div>
  );
}
