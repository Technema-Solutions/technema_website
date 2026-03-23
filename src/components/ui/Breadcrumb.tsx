import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items, variant = "light" }: { items: BreadcrumbItem[]; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center flex-wrap gap-1 text-[13px] ${isDark ? "text-white/50" : "text-text-gray"}`}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className={`w-3.5 h-3.5 ${isDark ? "text-white/30" : "text-text-gray/50"}`} />}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className={`${isDark ? "text-white/70 hover:text-white" : "text-brand"} hover:underline`}>
                {item.label}
              </Link>
            ) : (
              <span className={`truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] ${isDark ? "text-white/80" : ""}`}>
                {item.label.length > 50
                  ? item.label.slice(0, 50) + "…"
                  : item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
