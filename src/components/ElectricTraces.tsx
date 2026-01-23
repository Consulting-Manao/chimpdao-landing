import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // Traces with paths defined from CENTER outward for proper "tap to illuminate" flow
  // Each trace starts near center (~140,140) and extends outward
  const traces = [
    // Left side traces - flow from center to left
    { path: "M 140 140 L 120 140 L 90 140 L 65 120 L 30 120", delay: 0 },
    { path: "M 140 155 L 120 155 L 80 155 L 55 175 L 20 175", delay: 0.08 },
    { path: "M 140 160 L 115 160 L 85 160 L 60 185 L 25 185 L 10 170", delay: 0.12 },
    
    // Right side traces - flow from center to right
    { path: "M 140 140 L 160 140 L 190 140 L 215 120 L 250 120", delay: 0.04 },
    { path: "M 140 155 L 160 155 L 200 155 L 225 175 L 260 175", delay: 0.1 },
    { path: "M 140 160 L 165 160 L 195 160 L 220 185 L 255 185 L 270 170", delay: 0.06 },
    
    // Top traces - flow from center upward
    { path: "M 140 120 L 130 115 L 130 85 L 110 60 L 110 30", delay: 0.05 },
    { path: "M 140 120 L 150 115 L 150 80 L 170 55 L 170 25", delay: 0.11 },
    { path: "M 140 110 L 140 70 L 120 45 L 85 45 L 60 25", delay: 0.08 },
    { path: "M 140 110 L 140 70 L 160 45 L 195 45 L 220 25", delay: 0.14 },
    
    // Bottom traces - flow from center downward
    { path: "M 140 165 L 130 165 L 130 190 L 110 210 L 75 210", delay: 0.16 },
    { path: "M 140 165 L 150 165 L 150 195 L 175 215 L 210 215", delay: 0.18 },
  ];

  // Node points at trace endpoints - delayed to appear after traces reach them
  const nodes = [
    // Left endpoint nodes - appear last (traces flow TO these)
    { x: 30, y: 120, delay: 0.5 },
    { x: 20, y: 175, delay: 0.55 },
    { x: 10, y: 170, delay: 0.6 },
    // Right endpoint nodes
    { x: 250, y: 120, delay: 0.52 },
    { x: 260, y: 175, delay: 0.56 },
    { x: 270, y: 170, delay: 0.58 },
    // Top endpoint nodes
    { x: 110, y: 30, delay: 0.54 },
    { x: 170, y: 25, delay: 0.57 },
    { x: 60, y: 25, delay: 0.53 },
    { x: 220, y: 25, delay: 0.59 },
    // Bottom endpoint nodes
    { x: 75, y: 210, delay: 0.62 },
    { x: 210, y: 215, delay: 0.64 },
  ];

  // Junction nodes (at 45° bends) - appear mid-animation
  const junctionNodes = [
    { x: 65, y: 120, delay: 0.25 },
    { x: 55, y: 175, delay: 0.28 },
    { x: 215, y: 120, delay: 0.26 },
    { x: 225, y: 175, delay: 0.29 },
    { x: 110, y: 60, delay: 0.27 },
    { x: 170, y: 55, delay: 0.3 },
    { x: 120, y: 45, delay: 0.32 },
    { x: 160, y: 45, delay: 0.34 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 280 280"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter for traces */}
          <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base traces (static, dimmed) */}
        {traces.map((trace, index) => (
          <path
            key={`base-${index}`}
            d={trace.path}
            fill="none"
            stroke="hsl(var(--primary) / 0.15)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Animated traces - pathLength animates 0→1, drawing from center outward */}
        {isActive && traces.map((trace, index) => (
          <motion.path
            key={`active-${index}`}
            d={trace.path}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#traceGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 0.7, 0]
            }}
            transition={{
              duration: 3.5,
              delay: trace.delay,
              ease: "easeOut",
              repeat: Infinity,
              times: [0, 0.35, 0.7, 1], // Quick flow out, hold at endpoints, fade back
            }}
          />
        ))}

        {/* Junction nodes - appear as trace passes through */}
        {isActive && junctionNodes.map((node, index) => (
          <motion.circle
            key={`junction-${index}`}
            cx={node.x}
            cy={node.y}
            r="2.5"
            fill="hsl(var(--primary))"
            filter="url(#traceGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.5, 0] }}
            transition={{
              duration: 3.5,
              delay: node.delay,
              ease: "easeOut",
              repeat: Infinity,
              times: [0, 0.35, 0.7, 1],
            }}
          />
        ))}

        {/* Endpoint nodes - appear last and glow brightest */}
        {isActive && nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="hsl(var(--primary))"
            filter="url(#traceGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 0] }}
            transition={{
              duration: 3.5,
              delay: node.delay,
              ease: "easeOut",
              repeat: Infinity,
              times: [0, 0.4, 0.7, 1], // Appear after trace arrives, brightest glow
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ElectricTraces;