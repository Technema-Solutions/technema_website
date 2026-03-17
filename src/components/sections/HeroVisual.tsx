"use client";

import { motion, useReducedMotion } from "framer-motion";

// Node positions for the network constellation
const nodes = [
  { x: 210, y: 260, r: 10, main: true },  // Central node
  { x: 120, y: 140, r: 7 },
  { x: 300, y: 150, r: 7 },
  { x: 80, y: 280, r: 6 },
  { x: 340, y: 290, r: 6 },
  { x: 160, y: 380, r: 7 },
  { x: 280, y: 400, r: 6 },
  { x: 60, y: 180, r: 5 },
  { x: 350, y: 200, r: 5 },
  { x: 130, y: 460, r: 5 },
  { x: 310, y: 460, r: 5 },
  { x: 210, y: 120, r: 6 },
  { x: 370, y: 370, r: 5 },
  { x: 50, y: 380, r: 5 },
];

// Edges connecting nodes (index pairs)
const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 7], [1, 11], [2, 8], [2, 11],
  [3, 7], [3, 13], [4, 8], [4, 12],
  [5, 13], [5, 9], [6, 12], [6, 10],
  [1, 3], [2, 4], [9, 10],
];

// Data particles travel along these edges
const particleEdges = [0, 2, 5, 16];

// Tech icon chips
const techIcons = [
  { x: 85, y: 90, label: "code", path: "M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" },
  { x: 320, y: 95, label: "cloud", path: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" },
  { x: 45, y: 450, label: "shield", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { x: 355, y: 440, label: "gear", path: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" },
];

function FloatingNode({
  x, y, r, index, isStatic,
}: {
  x: number; y: number; r: number; index: number; isStatic: boolean;
}) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={r}
      fill="#6BB8D6"
      initial={isStatic ? {} : { opacity: 0, scale: 0 }}
      animate={
        isStatic
          ? {}
          : { opacity: [0.6, 1, 0.6], scale: 1, y: [y - 4, y + 4, y - 4] }
      }
      transition={
        isStatic
          ? undefined
          : {
              opacity: { delay: 0.2 + index * 0.05, duration: 3 + (index % 3), repeat: Infinity },
              scale: { delay: 0.2 + index * 0.05, duration: 0.5 },
              y: { delay: 0.2 + index * 0.05, duration: 3 + (index % 2), repeat: Infinity, ease: "easeInOut" },
            }
      }
    />
  );
}

function NetworkEdge({
  x1, y1, x2, y2, index, isStatic,
}: {
  x1: number; y1: number; x2: number; y2: number; index: number; isStatic: boolean;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#6BB8D6"
      strokeWidth="1.5"
      initial={isStatic ? { opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
      animate={isStatic ? {} : { pathLength: 1, opacity: 0.25 }}
      transition={isStatic ? undefined : { delay: 0.4 + index * 0.04, duration: 0.6, ease: "easeOut" }}
    />
  );
}

function DataParticle({
  x1, y1, x2, y2, delay, isStatic,
}: {
  x1: number; y1: number; x2: number; y2: number; delay: number; isStatic: boolean;
}) {
  if (isStatic) return null;
  return (
    <motion.circle
      r={3.5}
      fill="#6BB8D6"
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2, x1],
        cy: [y1, y2, y1],
        opacity: [0, 0.9, 0],
      }}
      transition={{
        delay: 1.2 + delay,
        duration: 3 + delay * 0.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function TechChip({
  x, y, iconPath, label, index, isStatic,
}: {
  x: number; y: number; iconPath: string; label: string; index: number; isStatic: boolean;
}) {
  return (
    <motion.g
      initial={isStatic ? {} : { opacity: 0, y: y + 10 }}
      animate={
        isStatic
          ? {}
          : { opacity: 1, y: [y - 8, y + 8, y - 8] }
      }
      transition={
        isStatic
          ? undefined
          : {
              opacity: { delay: 0.8 + index * 0.15, duration: 0.5 },
              y: { delay: 0.8 + index * 0.15, duration: 4 + index * 0.7, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      <rect
        x={x - 24}
        y={y - 24}
        width={48}
        height={48}
        rx={14}
        fill="#0F3555"
        stroke="#6BB8D6"
        strokeWidth="1"
        opacity={0.85}
      />
      <g transform={`translate(${x - 14}, ${y - 14}) scale(1.167)`}>
        <path
          d={iconPath}
          fill="none"
          stroke="#6BB8D6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label={label}
        />
      </g>
    </motion.g>
  );
}

export default function HeroVisual() {
  const prefersReduced = useReducedMotion();
  const isStatic = !!prefersReduced;

  return (
    <svg
      viewBox="0 0 420 560"
      className="w-full h-full"
      role="img"
      aria-label="Visualisasi jaringan teknologi digital"
    >
      <defs>
        {/* Central orb glow */}
        <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6BB8D6" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#6BB8D6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#6BB8D6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 3: Network edges */}
      <g>
        {edges.map(([a, b], i) => (
          <NetworkEdge
            key={`edge-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            index={i}
            isStatic={isStatic}
          />
        ))}
      </g>

      {/* Layer 3: Network nodes */}
      <g>
        {nodes.map((node, i) => (
          <FloatingNode
            key={`node-${i}`}
            x={node.x}
            y={node.y}
            r={node.r}
            index={i}
            isStatic={isStatic}
          />
        ))}
      </g>

      {/* Layer 4: Central glowing orb */}
      <motion.g
        initial={isStatic ? {} : { opacity: 0, scale: 0.5 }}
        animate={isStatic ? {} : { opacity: 1, scale: 1 }}
        transition={isStatic ? undefined : { duration: 0.8, ease: "easeOut" }}
      >
        {/* Glow */}
        <circle cx="210" cy="260" r="70" fill="url(#orb-glow)" />

        {/* Outer dashed orbit */}
        <circle
          cx="210"
          cy="260"
          r="52"
          fill="none"
          stroke="#6BB8D6"
          strokeWidth="1"
          strokeDasharray="5 8"
          opacity="0.35"
          className={isStatic ? "" : "animate-dash-flow"}
          style={isStatic ? {} : { transformOrigin: "210px 260px" }}
        />

        {/* Spinning ring */}
        <circle
          cx="210"
          cy="260"
          r="38"
          fill="none"
          stroke="#6BB8D6"
          strokeWidth="1.5"
          strokeDasharray="10 14"
          opacity="0.5"
          className={isStatic ? "" : "animate-orbit-spin"}
          style={{ transformOrigin: "210px 260px" }}
        />

        {/* Inner bright core */}
        <motion.circle
          cx="210"
          cy="260"
          r="16"
          fill="#6BB8D6"
          opacity={0.6}
          animate={isStatic ? {} : { opacity: [0.4, 0.8, 0.4] }}
          transition={isStatic ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="210" cy="260" r="8" fill="#6BB8D6" opacity={0.9} />
      </motion.g>

      {/* Layer 5: Tech icon chips */}
      <g>
        {techIcons.map((icon, i) => (
          <TechChip
            key={`chip-${i}`}
            x={icon.x}
            y={icon.y}
            iconPath={icon.path}
            label={icon.label}
            index={i}
            isStatic={isStatic}
          />
        ))}
      </g>

      {/* Layer 6: Data particles */}
      <g>
        {particleEdges.map((edgeIdx, i) => {
          const [a, b] = edges[edgeIdx];
          return (
            <DataParticle
              key={`particle-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              delay={i * 0.8}
              isStatic={isStatic}
            />
          );
        })}
      </g>

    </svg>
  );
}
