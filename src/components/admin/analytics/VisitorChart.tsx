"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { DailyVisitor } from "@/lib/analytics/ga4";

function formatDate(dateStr: string) {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  const d = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function VisitorChart({ data }: { data: DailyVisitor[] }) {
  const chartData = data.map((d) => ({
    date: formatDate(d.date),
    Pengunjung: d.users,
    Sesi: d.sessions,
  }));

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Pengunjung Harian — 30 Hari Terakhir
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Pengunjung"
              stroke="#3D7EAA"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Sesi"
              stroke="#6BB8D6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
