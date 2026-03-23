"use client";

import type { SearchQuery, SearchPage } from "@/lib/analytics/search-console";

function QueryTable({ data }: { data: SearchQuery[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Top Keywords dari Google Search
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
              <th className="pb-3 pr-4">Keyword</th>
              <th className="pb-3 pr-4 text-right">Klik</th>
              <th className="pb-3 pr-4 text-right">Impressi</th>
              <th className="pb-3 pr-4 text-right">CTR</th>
              <th className="pb-3 text-right">Posisi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="py-3 pr-4 font-medium text-gray-900 max-w-[200px] truncate">
                  {row.query}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {row.clicks.toLocaleString("id-ID")}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {row.impressions.toLocaleString("id-ID")}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {(row.ctr * 100).toFixed(1)}%
                </td>
                <td className="py-3 text-right text-gray-700">
                  {row.position.toFixed(1)}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageTable({ data }: { data: SearchPage[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Top Halaman dari Google Search
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
              <th className="pb-3 pr-4">Halaman</th>
              <th className="pb-3 pr-4 text-right">Klik</th>
              <th className="pb-3 pr-4 text-right">Impressi</th>
              <th className="pb-3 pr-4 text-right">CTR</th>
              <th className="pb-3 text-right">Posisi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const shortPage = row.page.replace(/^https?:\/\/[^/]+/, "");
              return (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-gray-900 max-w-[250px] truncate" title={row.page}>
                    {shortPage || "/"}
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-700">
                    {row.clicks.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-700">
                    {row.impressions.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-700">
                    {(row.ctr * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 text-right text-gray-700">
                    {row.position.toFixed(1)}
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { QueryTable, PageTable };
