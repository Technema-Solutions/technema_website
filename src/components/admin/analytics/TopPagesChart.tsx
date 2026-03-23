"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TopPage } from "@/lib/analytics/ga4";

function shortenPath(path: string) {
  if (path.length <= 30) return path;
  return path.slice(0, 27) + "...";
}

export default function TopPagesChart({ data }: { data: TopPage[] }) {
  const chartData = data.map((d) => ({
    path: shortenPath(d.path),
    fullPath: d.path,
    "Halaman Dilihat": d.views,
    Pengunjung: d.users,
  }));

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Top 10 Halaman Terpopuler
      </h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="path"
              tick={{ fontSize: 11 }}
              width={150}
            />
            <Tooltip
              formatter={(value) => Number(value).toLocaleString("id-ID")}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullPath || ""
              }
            />
            <Bar dataKey="Halaman Dilihat" fill="#3D7EAA" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
