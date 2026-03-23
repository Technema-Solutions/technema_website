"use client";

import type { CoreWebVitals } from "@/lib/analytics/pagespeed";

const ratingColors = {
  good: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Baik" },
  "needs-improvement": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Perlu Perbaikan" },
  poor: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Buruk" },
};

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function scoreBg(score: number) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function MetricCard({ label, value, unit, rating }: {
  label: string;
  value: number;
  unit: string;
  rating: "good" | "needs-improvement" | "poor";
}) {
  const c = ratingColors[rating];
  const displayValue = unit === "s" ? (value / 1000).toFixed(1) : value.toFixed(unit === "" ? 3 : 0);

  return (
    <div className={`rounded-lg border p-4 ${c.bg} ${c.border}`}>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${c.text}`}>
        {displayValue}
        <span className="text-sm font-normal ml-1">{unit === "s" ? "s" : unit}</span>
      </p>
      <p className={`text-xs font-medium mt-1 ${c.text}`}>{c.label}</p>
    </div>
  );
}

export default function WebVitalsGauge({ data }: { data: CoreWebVitals }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-900">
          Core Web Vitals (Mobile)
        </h3>
        <div className="flex items-center gap-2">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${scoreBg(data.performanceScore)}`}>
            <span className="text-white text-sm font-bold">{data.performanceScore}</span>
          </div>
          <div>
            <p className={`text-lg font-bold ${scoreColor(data.performanceScore)}`}>
              {data.performanceScore}/100
            </p>
            <p className="text-xs text-gray-500">Performance Score</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <MetricCard
          label="LCP (Largest Contentful Paint)"
          value={data.lcp.value}
          unit="s"
          rating={data.lcp.rating}
        />
        <MetricCard
          label="CLS (Cumulative Layout Shift)"
          value={data.cls.value}
          unit=""
          rating={data.cls.rating}
        />
        <MetricCard
          label="FCP (First Contentful Paint)"
          value={data.fcp.value}
          unit="s"
          rating={data.fcp.rating}
        />
        <MetricCard
          label="TBT (Total Blocking Time)"
          value={data.tbt.value}
          unit="ms"
          rating={data.tbt.rating}
        />
        <MetricCard
          label="SI (Speed Index)"
          value={data.si.value}
          unit="s"
          rating={data.si.rating}
        />
      </div>
    </div>
  );
}
