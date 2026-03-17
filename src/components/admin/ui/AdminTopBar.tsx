"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, ChevronRight, Menu } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/produk": "Produk",
  "/admin/artikel": "Artikel",
  "/admin/proyek": "Proyek",
  "/admin/layanan": "Layanan",
  "/admin/testimoni": "Testimoni",
  "/admin/klien": "Klien",
  "/admin/statistik": "Statistik",
  "/admin/faq": "FAQ",
  "/admin/kenapa-kami": "Kenapa Kami",
  "/admin/proses-kerja": "Proses Kerja",
  "/admin/navigasi": "Navigasi",
  "/admin/footer": "Footer",
  "/admin/pengaturan": "Pengaturan",
  "/admin/media": "Media",
  "/admin/pesan": "Pesan Kontak",
};

export default function AdminTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href?: string }[] = [
      { label: "Admin", href: "/admin" },
    ];

    if (segments.length > 1) {
      const path = "/" + segments.slice(0, 2).join("/");
      const label = routeLabels[path] || segments[1];
      crumbs.push({ label });
    }

    if (segments.length > 2) {
      const sub = segments[2];
      if (sub === "baru") crumbs.push({ label: "Baru" });
      else crumbs.push({ label: "Edit" });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumb();

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 md:hidden"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
            <span
              className={
                i === crumbs.length - 1
                  ? "font-medium text-gray-900"
                  : "text-gray-500"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
        </div>
      </div>

      {/* User Actions */}
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </header>
  );
}
