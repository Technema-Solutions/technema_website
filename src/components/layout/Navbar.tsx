"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HeartPulse, Landmark, Factory, GraduationCap,
  ShoppingCart, Truck, Building2, Zap,
  ArrowRight, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Landmark, Factory, GraduationCap,
  ShoppingCart, Truck, Building2, Zap,
};

interface NavLinkItem {
  label: string;
  href: string;
  megaMenu?: string | null;
}

interface MegaMenuProductItem {
  name: string;
  tagline: string;
  slug: string;
  logo: string | null;
}

interface IndustryItem {
  name: string;
  icon: string;
  href: string;
  tagline: string;
}

interface NavbarProps {
  navLinks: NavLinkItem[];
  megaMenuProducts: MegaMenuProductItem[];
  megaMenuIndustries: IndustryItem[];
  contactPhone: string;
}

function isLinkActive(href: string, pathname: string): boolean {
  if (href.startsWith("/")) {
    return pathname === href || pathname.startsWith(href + "/");
  }
  return false;
}

export default function Navbar({ navLinks, megaMenuProducts, megaMenuIndustries, contactPhone }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<"products" | "industries" | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navScrolled = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMega = useCallback((type: "products" | "industries") => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMega(type);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-4 sm:px-[4%] h-[80px] flex items-center justify-between transition-all duration-300",
      scrolled ? "bg-white shadow-sm" : "bg-white"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-[10px]">
        <Image src="/images/logo_technema.png" alt="Technema Solutions" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
        <span className="font-heading text-[22px] font-bold tracking-[-0.5px]">
          <span className="text-dark hidden md:inline">Technema</span>
          <span className="text-dark md:hidden">Technema Solutions</span>
        </span>
      </div>

      {/* Nav links - dark navy container */}
      <div className={cn(
        "hidden md:flex items-center justify-center gap-[36px] bg-dark px-[40px] h-[60px] flex-1 mx-[30px] self-end relative transition-all duration-300",
        navScrolled
          ? "rounded-[20px] mb-[10px]"
          : "rounded-t-[20px]"
      )}>
        {navLinks.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => item.megaMenu ? openMega(item.megaMenu as "products" | "industries") : setActiveMega(null)}
            onMouseLeave={() => item.megaMenu ? scheduleMegaClose() : undefined}
          >
            <a
              href={item.href}
              className={cn(
                "text-[15px] font-sans font-medium transition-colors flex items-center gap-[4px]",
                isLinkActive(item.href, pathname) && !item.megaMenu
                  ? "text-brand-light"
                  : "text-white/80 hover:text-brand-light",
                activeMega === item.megaMenu && "text-brand-light"
              )}
            >
              {item.label}
              {item.megaMenu && (
                <ChevronDown className={cn(
                  "w-[14px] h-[14px] transition-transform duration-200",
                  activeMega === item.megaMenu && "rotate-180"
                )} />
              )}
            </a>
          </div>
        ))}
        {/* Left flare */}
        <span className={cn(
          "absolute -bottom-0 -left-[12px] w-[12px] h-[12px] bg-transparent rounded-br-[12px] shadow-[6px_6px_0_6px_var(--color-dark)] pointer-events-none transition-opacity duration-300",
          navScrolled && "opacity-0"
        )} />
        {/* Right flare */}
        <span className={cn(
          "absolute -bottom-0 -right-[12px] w-[12px] h-[12px] bg-transparent rounded-bl-[12px] shadow-[-6px_6px_0_6px_var(--color-dark)] pointer-events-none transition-opacity duration-300",
          navScrolled && "opacity-0"
        )} />
      </div>

      {/* CTA + Hamburger */}
      <div className="flex items-center gap-[16px]">
        <a
          href="/kontak"
          className="hidden md:flex items-center gap-[8px] text-brand no-underline text-[14px] font-sans font-bold uppercase tracking-[0.5px]"
        >
          HUBUNGI KAMI
          <ArrowRight className="w-[18px] h-[18px]" />
        </a>

        {/* Hamburger button - mobile only */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          aria-label="Buka menu"
        >
          <span className="w-[22px] h-[2px] bg-dark rounded-full block" />
          <span className="w-[22px] h-[2px] bg-dark rounded-full block" />
          <span className="w-[16px] h-[2px] bg-dark rounded-full block" />
        </button>
      </div>

      {/* Mega Menu Panels */}
      <AnimatePresence>
        {activeMega && (
          <motion.div
            key={activeMega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden md:block absolute top-[80px] left-0 right-0 z-40"
            onMouseEnter={cancelMegaClose}
            onMouseLeave={scheduleMegaClose}
          >
            {/* Top accent gradient line */}
            <div className="h-[3px] bg-gradient-to-r from-brand via-brand-light to-brand" />

            <div className="bg-white rounded-b-[16px] shadow-xl border-t-0 border border-gray-100">
              <div className="max-w-[1200px] mx-auto px-8 py-8">
                {activeMega === "products" && <ProductsMegaMenu products={megaMenuProducts} contactPhone={contactPhone} />}
                {activeMega === "industries" && <IndustriesMegaMenu industries={megaMenuIndustries} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
        navLinks={navLinks}
        megaMenuProducts={megaMenuProducts}
        megaMenuIndustries={megaMenuIndustries}
      />
    </nav>
  );
}

function ProductsMegaMenu({ products, contactPhone }: { products: MegaMenuProductItem[]; contactPhone: string }) {
  return (
    <div className="flex gap-8">
      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {products.map((product) => (
            <a
              key={product.name}
              href={`/produk/${product.slug}`}
              className="group flex items-start gap-4 p-4 rounded-[12px] border border-transparent transition-all duration-200 hover:bg-light-brand hover:border-brand/10 hover:shadow-sm"
            >
              {product.logo && (
                <Image src={product.logo} alt={product.name} width={48} height={48} className="w-[48px] h-[48px] object-contain rounded-[12px] flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[15px] font-heading font-bold text-dark mb-1">
                  {product.name}
                </p>
                <p className="text-[14px] text-text-gray leading-[1.5]">
                  {product.tagline}
                </p>
                <span className="inline-flex items-center gap-1 mt-2 text-[12px] font-semibold text-brand uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Selengkapnya <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
        ))}
      </div>

      {/* Right CTA Area */}
      <div className="w-[260px] flex-shrink-0 rounded-[12px] bg-gradient-to-br from-dark to-dark3 p-6 flex flex-col justify-between text-white">
        <div>
          <p className="text-[18px] font-heading font-bold mb-2">Produk Kami</p>
          <p className="text-[13px] text-white/70 leading-[1.6]">
            Solusi digital yang dirancang khusus untuk menyederhanakan alur kerja dan mempercepat pertumbuhan bisnis Anda.
          </p>
        </div>
        <a
          href={`https://wa.me/${contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent("Halo Technema, saya ingin konsultasi gratis mengenai produk digital Anda.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-[13px] font-bold text-brand-light uppercase tracking-wider hover:text-white transition-colors"
        >
          Konsultasi GRATIS <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function IndustriesMegaMenu({ industries }: { industries: IndustryItem[] }) {
  return (
    <div className="flex gap-8">
      {/* Industries Grid */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {industries.map((industry) => {
          const Icon = iconMap[industry.icon];
          return (
            <a
              key={industry.name}
              href={industry.href}
              className="group flex items-start gap-4 p-4 rounded-[12px] border border-transparent transition-all duration-200 hover:bg-light-brand hover:border-brand/10 hover:shadow-sm"
            >
              <div className="w-[48px] h-[48px] rounded-[12px] bg-light-brand flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-brand/15">
                {Icon && <Icon className="w-[22px] h-[22px] text-brand" />}
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-heading font-bold text-dark group-hover:text-brand transition-colors duration-200">
                  {industry.name}
                </p>
                {industry.tagline && (
                  <p className="text-[13px] text-text-gray leading-[1.5] mt-0.5">
                    {industry.tagline}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 mt-2 text-[12px] font-semibold text-brand uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Selengkapnya <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Right CTA Area */}
      <div className="w-[260px] flex-shrink-0 rounded-[12px] bg-gradient-to-br from-dark to-dark3 p-6 flex flex-col justify-between text-white">
        <div>
          <p className="text-[18px] font-heading font-bold mb-2">Industri yang Kami Layani</p>
          <p className="text-[13px] text-white/70 leading-[1.6]">
            Solusi teknologi yang disesuaikan untuk berbagai sektor guna mendorong transformasi digital.
          </p>
        </div>
      </div>
    </div>
  );
}
