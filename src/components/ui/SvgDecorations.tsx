/**
 * Reusable SVG decoration components for premium UI sections.
 * Each accepts className for positioning (absolute, top-X, left-X, etc).
 */

/** Circuit board pattern with dark stroke — for white/light background sections */
export function CircuitPatternLight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="500"
      height="400"
      viewBox="0 0 500 400"
      fill="none"
    >
      <line x1="40" y1="60" x2="200" y2="60" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="60" y1="120" x2="300" y2="120" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="100" y1="180" x2="250" y2="180" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="30" y1="240" x2="180" y2="240" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="80" y1="300" x2="320" y2="300" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="120" y1="40" x2="120" y2="200" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="200" y1="60" x2="200" y2="180" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="250" y1="120" x2="250" y2="300" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="80" y1="180" x2="80" y2="340" stroke="#0C2D48" strokeWidth="1.5" />
      <circle cx="120" cy="60" r="4" fill="#0C2D48" />
      <circle cx="200" cy="60" r="4" fill="#0C2D48" />
      <circle cx="120" cy="120" r="4" fill="#0C2D48" />
      <circle cx="200" cy="120" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      <circle cx="250" cy="120" r="4" fill="#0C2D48" />
      <circle cx="120" cy="180" r="4" fill="#0C2D48" />
      <circle cx="200" cy="180" r="4" fill="#0C2D48" />
      <circle cx="250" cy="180" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      <circle cx="80" cy="240" r="4" fill="#0C2D48" />
      <circle cx="80" cy="300" r="4" fill="#0C2D48" />
      <circle cx="250" cy="300" r="4" fill="#0C2D48" />
      <circle cx="300" cy="120" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      <path d="M200 60 L200 40 L280 40" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <path d="M300 120 L340 120 L340 200" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <path d="M80 300 L80 340 L160 340" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <circle cx="280" cy="40" r="4" fill="#0C2D48" />
      <circle cx="340" cy="200" r="4" fill="#0C2D48" />
      <circle cx="160" cy="340" r="4" fill="#0C2D48" />
    </svg>
  );
}

/** Circuit board pattern with light stroke — for dark background sections */
export function CircuitPatternDark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="440"
      height="500"
      viewBox="0 0 440 500"
      fill="none"
    >
      <line x1="0" y1="40" x2="200" y2="40" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="0" y1="100" x2="320" y2="100" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="40" y1="160" x2="280" y2="160" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="0" y1="220" x2="350" y2="220" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="60" y1="280" x2="240" y2="280" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="0" y1="340" x2="300" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="20" y1="400" x2="180" y2="400" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="60" y1="0" x2="60" y2="280" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="140" y1="40" x2="140" y2="400" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="200" y1="0" x2="200" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="280" y1="100" x2="280" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="350" y1="60" x2="350" y2="220" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="200" y1="40" x2="230" y2="70" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="280" y1="160" x2="310" y2="190" stroke="#6BB8D6" strokeWidth="1.2" />
      <line x1="140" y1="280" x2="170" y2="310" stroke="#6BB8D6" strokeWidth="1.2" />
      {[
        [60, 40], [140, 40], [200, 40], [60, 100], [140, 100], [200, 100],
        [280, 100], [320, 100], [60, 160], [140, 160], [200, 160], [280, 160],
        [60, 220], [140, 220], [200, 220], [280, 220], [350, 220],
        [60, 280], [140, 280], [200, 280], [240, 280], [140, 340], [200, 340],
        [280, 340], [300, 340], [60, 400], [140, 400], [180, 400],
        [230, 70], [310, 190], [170, 310],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#6BB8D6" />
      ))}
      {[[200, 100], [140, 220], [280, 160], [60, 280], [200, 340]].map(([cx, cy], i) => (
        <g key={`ring-${i}`}>
          <circle cx={cx} cy={cy} r="7" fill="none" stroke="#6BB8D6" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="3" fill="#6BB8D6" />
        </g>
      ))}
    </svg>
  );
}

/** 13x13 dot grid pattern */
export function DotGrid({ className = "", fill = "#6BB8D6" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill={fill}
    >
      {Array.from({ length: 13 }).flatMap((_, row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2" />
        ))
      )}
    </svg>
  );
}

/** Single hexagon outline */
export function HexagonOutline({
  className = "",
  width = 150,
  height = 130,
  stroke = "#6BB8D6",
}: {
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={width}
      height={height}
      viewBox="0 0 120 104"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
    >
      <polygon points="60,2 113,28 113,76 60,102 7,76 7,28" />
    </svg>
  );
}

/** Dashed concentric circles */
export function ConcentricRings({
  className = "",
  stroke = "#6BB8D6",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      stroke={stroke}
    >
      <circle cx="110" cy="110" r="105" strokeWidth="1.5" strokeDasharray="8 5" />
      <circle cx="110" cy="110" r="75" strokeWidth="1.5" strokeDasharray="5 7" />
      <circle cx="110" cy="110" r="45" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="110" cy="110" r="4" fill={stroke} />
    </svg>
  );
}

/** Decorative curved lines */
export function BrandCurve({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="280"
      height="320"
      viewBox="0 0 280 320"
      fill="none"
    >
      <path
        d="M180 0 C220 80, 260 160, 240 240 C220 300, 160 320, 120 320"
        stroke="#3D7EAA"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M220 0 C260 60, 280 140, 270 220 C260 280, 200 310, 160 320"
        stroke="#3D7EAA"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
