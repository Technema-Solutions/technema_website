"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X, ChevronDown,
  HeartPulse, Landmark, Factory, GraduationCap,
  ShoppingCart, Truck, Building2, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Landmark, Factory, GraduationCap,
  ShoppingCart, Truck, Building2, Zap,
};

function isLinkActive(href: string, pathname: string): boolean {
  if (href.startsWith("/")) {
    return pathname === href || pathname.startsWith(href + "/");
  }
  return false;
}

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navLinks: NavLinkItem[];
  megaMenuProducts: MegaMenuProductItem[];
  megaMenuIndustries: IndustryItem[];
}

export default function MobileMenu({ isOpen, onClose, pathname, navLinks, megaMenuProducts, megaMenuIndustries }: MobileMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const handleClose = () => {
    setExpandedMenu(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-80 bg-white shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="text-xl font-bold font-heading">
                <span className="text-dark">Technema Solutions</span>
              </span>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col p-6">
              {navLinks.map((link) => {
                const hasMega = !!link.megaMenu;
                const isExpanded = expandedMenu === link.label;

                if (!hasMega) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={handleClose}
                      className={cn(
                        "py-3 text-base font-medium transition-colors border-b border-gray-50",
                        isLinkActive(link.href, pathname)
                          ? "text-brand font-semibold"
                          : "text-gray-600 hover:text-brand"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <div key={link.label} className="border-b border-gray-50">
                    <button
                      onClick={() => toggleExpand(link.label)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 text-base font-medium transition-colors bg-transparent border-none cursor-pointer",
                        isLinkActive(link.href, pathname)
                          ? "text-brand font-semibold"
                          : "text-gray-600 hover:text-brand"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pb-3 space-y-1">
                            {link.megaMenu === "products" &&
                              megaMenuProducts.map((product) => (
                                  <a
                                    key={product.name}
                                    href={`/produk/${product.slug}`}
                                    onClick={handleClose}
                                    className="flex items-center gap-3 py-2 px-2 rounded-lg text-[14px] text-gray-500 hover:text-brand hover:bg-light-brand transition-colors"
                                  >
                                    {product.logo && (
                                      <Image src={product.logo} alt={product.name} width={20} height={20} className="object-contain flex-shrink-0 rounded-[6px]" />
                                    )}
                                    <div>
                                      <span className="font-semibold text-dark block text-[13px]">{product.name}</span>
                                      <span className="text-[11px] text-gray-400 leading-tight">{product.tagline}</span>
                                    </div>
                                  </a>
                              ))}
                            {link.megaMenu === "industries" &&
                              megaMenuIndustries.map((industry) => {
                                const Icon = iconMap[industry.icon];
                                return (
                                  <a
                                    key={industry.name}
                                    href={industry.href}
                                    onClick={handleClose}
                                    className="flex items-center gap-3 py-2 px-2 rounded-lg text-[14px] text-gray-500 hover:text-brand hover:bg-light-brand transition-colors"
                                  >
                                    {Icon && <Icon className="w-4 h-4 text-brand flex-shrink-0" />}
                                    <div>
                                      <span className="font-semibold text-dark block text-[13px]">{industry.name}</span>
                                      {industry.tagline && <span className="text-[11px] text-gray-400 leading-tight">{industry.tagline}</span>}
                                    </div>
                                  </a>
                                );
                              })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="mt-6">
                <Button className="w-full" href="/kontak" onClick={handleClose}>
                  HUBUNGI KAMI
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
