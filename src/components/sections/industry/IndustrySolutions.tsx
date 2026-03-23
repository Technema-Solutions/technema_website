"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import {
  Workflow, LayoutDashboard, Lock, Zap,
  CheckCircle, ChevronDown,
  GraduationCap, Monitor, MessageSquare, ShoppingBag, Package, Globe, FileSearch, Network, Users,
  Bot, KeyRound, Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IndustrySolution } from "@/data/industries";

const iconMap: Record<string, LucideIcon> = {
  Workflow, LayoutDashboard, Lock, Zap,
  GraduationCap, Monitor, MessageSquare, ShoppingBag, Package, Globe, FileSearch, Network, Users,
  Bot, KeyRound, Wallet,
};

interface Props {
  industryName: string;
  solutions: IndustrySolution[];
}

export default function IndustrySolutions({ industryName, solutions }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (solutions.length === 0) return null;

  const activeSolution = solutions[activeIndex];
  const ActiveIcon = iconMap[activeSolution.icon];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB]">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="Solusi Kami"
            title={`Solusi Technema untuk ${industryName}`}
            highlightWord={industryName}
          />
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left — Accordion */}
          <FadeIn className="flex-1 min-w-0">
            <div className="space-y-3">
              {solutions.map((sol, i) => {
                const Icon = iconMap[sol.icon];
                const isActive = i === activeIndex;
                const num = String(i + 1).padStart(2, "0");

                return (
                  <div
                    key={sol.title}
                    className={`relative border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive
                        ? "rounded-2xl bg-white border-brand/20 shadow-lg shadow-brand/5"
                        : "rounded-xl bg-white/60 border-gray-200 hover:border-brand/15 hover:bg-white"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {/* Active left accent */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-brand to-brand-light rounded-l-2xl" />
                    )}

                    {/* Header */}
                    <div className={`flex items-center gap-3 transition-all duration-300 ${
                      isActive ? "p-5 sm:p-6" : "p-3 sm:p-4"
                    }`}>
                      <div className={`rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ? "w-12 h-12 bg-brand/10" : "w-10 h-10 bg-gray-100"
                      }`}>
                        {Icon && (
                          <Icon
                            className={`transition-all duration-300 ${
                              isActive ? "w-6 h-6 text-brand" : "w-5 h-5 text-text-gray"
                            }`}
                            strokeWidth={1.5}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[12px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                            isActive ? "text-brand" : "text-text-gray/60"
                          }`}>
                            {num}
                          </span>
                          <h3 className={`font-heading font-bold transition-all duration-300 truncate ${
                            isActive ? "text-[17px] sm:text-[18px] text-dark" : "text-[15px] sm:text-[16px] text-dark/70"
                          }`}>
                            {sol.title}
                          </h3>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-text-gray transition-transform duration-300 ${
                          isActive ? "rotate-180 text-brand" : ""
                        }`}
                      />
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-0">
                            <p className="text-[15px] text-text-gray leading-[1.7] mb-5">
                              {sol.description}
                            </p>

                            <ul className="space-y-3">
                              {sol.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-3">
                                  <CheckCircle className="w-[18px] h-[18px] text-brand flex-shrink-0 mt-0.5" />
                                  <span className="text-[14px] text-dark/80 leading-[1.6]">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Right — Dynamic Visual Panel (desktop only) */}
          <FadeIn delay={0.2} direction="right" className="hidden lg:block flex-1 min-w-0">
            <div className="sticky top-[100px]">
              <div className="relative rounded-2xl bg-gradient-to-br from-dark to-dark3 overflow-hidden aspect-[4/3]">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }} />

                {/* Glow */}
                <div className="absolute top-[15%] right-[15%] w-[200px] h-[200px] rounded-full bg-brand/10 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[10%] w-[150px] h-[150px] rounded-full bg-brand-light/[0.07] blur-[60px] pointer-events-none" />

                {/* Content — animated on change */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative z-10 flex flex-col items-center justify-center h-full p-6"
                  >
                    {/* Number watermark */}
                    <span className="absolute top-6 right-8 font-heading text-[80px] font-bold leading-none text-white/[0.03] select-none pointer-events-none">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>

                    {activeSolution.image ? (
                      /* Image/Video from CMS */
                      /\.(mp4|webm)$/i.test(activeSolution.image) ? (
                        /* Video — browser mockup frame */
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
                            {/* Browser title bar */}
                            <div className="flex items-center gap-2 px-4 h-8 bg-[#1e1e2e] border-b border-white/[0.06]">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            </div>
                            {/* Video */}
                            <video
                              key={activeSolution.image}
                              src={activeSolution.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-auto block"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Static image */
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/[0.04] border border-white/10">
                          {/\.(svg|gif)$/i.test(activeSolution.image) ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={activeSolution.image}
                              alt={activeSolution.title}
                              className="w-full h-full object-contain p-6"
                            />
                          ) : (
                            <Image
                              src={activeSolution.image}
                              alt={activeSolution.title}
                              fill
                              className="object-contain p-6"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          )}
                        </div>
                      )
                    ) : (
                      /* Fallback: Icon + Title + Tags */
                      <>
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center shadow-[0_8px_40px_rgba(61,126,170,0.35)] mb-6">
                          {ActiveIcon && <ActiveIcon className="w-12 h-12 text-white" strokeWidth={1.5} />}
                        </div>

                        <h4 className="text-[20px] font-heading font-bold text-white text-center mb-4">
                          {activeSolution.title}
                        </h4>

                        <div className="flex flex-wrap justify-center gap-2 max-w-[360px]">
                          {activeSolution.features.slice(0, 3).map((feat) => {
                            const shortLabel = feat.length > 35 ? feat.slice(0, 35) + "…" : feat;
                            return (
                              <span
                                key={feat}
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[12px] text-white/70 font-medium"
                              >
                                {shortLabel}
                              </span>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Decorative dots */}
                    <div className="absolute bottom-6 left-6 flex gap-1.5">
                      {solutions.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i === activeIndex ? "bg-brand-light" : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
