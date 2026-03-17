"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface CollapseTransitionProps {
  show: boolean;
  children: ReactNode;
}

export default function CollapseTransition({ show, children }: CollapseTransitionProps) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
