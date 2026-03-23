"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  FolderKanban,
  Building2,
  Wrench,
  MessageSquareQuote,
  Users,
  BarChart3,
  HelpCircle,
  Award,
  GitBranch,
  Navigation,
  PanelBottom,
  Settings,
  Image,
  Mail,
  ChevronLeft,
  X,
  Layers,
} from "lucide-react";

const sidebarSections = [
  {
    title: null,
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "KONTEN",
    items: [
      { label: "Produk", href: "/admin/produk", icon: Package },
      { label: "Artikel", href: "/admin/artikel", icon: FileText },
      { label: "Proyek", href: "/admin/proyek", icon: FolderKanban },
      { label: "Industri", href: "/admin/industri", icon: Building2 },
    ],
  },
  {
    title: "HALAMAN UTAMA",
    items: [
      { label: "Layanan", href: "/admin/layanan", icon: Wrench },
      { label: "Testimoni", href: "/admin/testimoni", icon: MessageSquareQuote },
      { label: "Klien", href: "/admin/klien", icon: Users },
      { label: "Statistik", href: "/admin/statistik", icon: BarChart3 },
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
      { label: "Kenapa Kami", href: "/admin/kenapa-kami", icon: Award },
      { label: "Proses Kerja", href: "/admin/proses-kerja", icon: GitBranch },
    ],
  },
  {
    title: "KONFIGURASI",
    items: [
      { label: "Navigasi", href: "/admin/navigasi", icon: Navigation },
      { label: "Footer", href: "/admin/footer", icon: PanelBottom },
      { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
      { label: "Media", href: "/admin/media", icon: Image },
    ],
  },
  {
    title: "INBOX",
    items: [
      { label: "Pesan Kontak", href: "/admin/pesan", icon: Mail },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3D7EAA] to-[#6BB8D6]">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Technema</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3D7EAA] to-[#6BB8D6]">
            <Layers className="h-4 w-4 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden text-white/60 hover:text-white md:block"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarSections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <div
                className={`mb-1 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40 ${
                  collapsed ? "text-center" : ""
                }`}
              >
                {collapsed ? "—" : section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[#3D7EAA] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0C2D48] transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block bg-[#0C2D48] transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
