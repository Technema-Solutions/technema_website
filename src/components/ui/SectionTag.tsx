import React from "react";
import { cn } from "@/lib/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export default function SectionTag({ children, className, variant = "light" }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 rounded-full px-5 py-2 font-heading text-[13px] sm:text-[16px] font-semibold",
        variant === "light"
          ? "bg-brand/[0.03] text-brand border border-text-gray/15"
          : "bg-dark3 text-brand-light border-2 border-[#2A6080]",
        className
      )}
    >
      <span className="w-[30px] h-[7px] bg-brand rounded-full inline-block" />
      {children}
    </span>
  );
}
