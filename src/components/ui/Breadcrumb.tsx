import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-[13px] text-text-gray">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-text-gray/50" />}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="text-brand hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
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
