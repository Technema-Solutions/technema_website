import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "outlineDark" | "dark" | "lightBrand";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-bold border-none cursor-pointer rounded-full transition-all duration-300 tracking-wide";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand/90",
    outline: "bg-transparent text-white border-[1.5px] border-white/30 hover:bg-white/10",
    outlineDark: "bg-transparent text-dark border-[1.5px] border-dark hover:bg-dark/5",
    dark: "bg-dark text-white hover:bg-dark2",
    lightBrand: "bg-light-brand2 text-brand hover:bg-brand/20",
  };

  const sizes = {
    sm: "py-[12px] px-[22px] text-[13px] min-h-[44px]",
    md: "py-[17px] px-[28px] text-[15px]",
    lg: "py-[20px] px-[36px] text-[15px]",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
