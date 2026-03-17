import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
  highlightWord?: string;
  highlightScript?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  center = true,
  light = false,
  highlightWord,
  highlightScript = false,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlightWord) {
      return title;
    }
    const idx = title.indexOf(highlightWord);
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlightWord.length);
    return (
      <>
        {before}
        <span
          className={cn(
            "text-brand heading-decorate",
            highlightScript && "font-[family-name:var(--font-script)]"
          )}
        >
          {highlightWord}
        </span>
        {after}
      </>
    );
  };

  return (
    <div className={cn("mb-10 sm:mb-14 lg:mb-16", center && "text-center")}>
      <div
        className={cn(
          "flex items-center gap-2 font-semibold text-sm tracking-widest uppercase mb-4",
          center && "justify-center",
          light ? "text-primary-300" : "text-brand"
        )}
      >
        <span className={cn("w-3 h-[2px]", light ? "bg-primary-300" : "bg-brand")} />
        <span>{subtitle}</span>
        <span className={cn("w-3 h-[2px]", light ? "bg-primary-300" : "bg-brand")} />
      </div>

      <h2
        className={cn(
          "text-[28px] sm:text-4xl md:text-[42px] lg:text-5xl font-bold leading-tight font-heading",
          light ? "text-white" : "text-dark"
        )}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base sm:text-lg leading-relaxed",
            center && "mx-auto",
            light ? "text-gray-300" : "text-gray-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
