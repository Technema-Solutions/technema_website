"use client";

import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div className={cn(
      "mb-4 rounded-xl transition-all duration-300 border",
      isOpen ? "border-brand bg-white shadow-lg shadow-brand/10" : "border-gray-200 bg-white"
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-6">
          <span className={cn(
            "text-xl sm:text-2xl font-bold font-heading transition-colors",
            isOpen ? "text-brand" : "text-gray-300"
          )}>
            {formattedIndex}
          </span>
          <span className={cn(
            "text-base sm:text-xl font-bold font-heading transition-colors",
            isOpen ? "text-brand" : "text-dark"
          )}>
            {question}
          </span>
        </div>
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full transition-colors flex-shrink-0",
          isOpen ? "bg-brand text-white" : "bg-primary-50 text-brand"
        )}>
          {isOpen ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-gray-500 leading-relaxed drop-shadow-sm ml-8 sm:ml-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
