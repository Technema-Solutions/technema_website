"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function toEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : url;
}

export default function HeroCta({ heroVideoUrl }: { heroVideoUrl?: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
        <button
          onClick={() => {
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-brand text-white rounded-full py-[17px] px-[28px] text-[14px] font-bold uppercase tracking-[1px] cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(61,126,170,0.25)] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(61,126,170,0.4)]"
        >
          JELAJAHI LEBIH LANJUT
        </button>

        {heroVideoUrl && (
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setShowVideo(true)}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full border-2 border-[#2A6080]" />
              <div className="w-[44px] h-[44px] sm:w-[55px] sm:h-[55px] rounded-full bg-brand flex items-center justify-center shadow-[0_4px_20px_rgba(61,126,170,0.3)] group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="text-white/90 text-[15px] font-semibold uppercase tracking-[0.5px]">
              TONTON VIDEO
            </span>
          </div>
        )}
      </div>

      {/* Video Modal — portal to body to escape ancestor transforms/overflow */}
      {mounted && createPortal(
        <AnimatePresence>
          {showVideo && heroVideoUrl && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowVideo(false)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Video container */}
              <motion.div
                className="relative w-full max-w-4xl"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button — outside overflow-hidden so it floats above */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>

                {/* iframe wrapper with overflow-hidden for rounded corners */}
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={toEmbedUrl(heroVideoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
