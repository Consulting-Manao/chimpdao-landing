import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // PCB-style traces with 90° and 45° angles - emanating from center
  const traces = [
    // Top traces
    { path: "M 105 70 L 105 45 L 130 20", delay: 0 },
    { path: "M 105 70 L 105 35 L 85 15", delay: 0.1 },
    // Top-right traces
    { path: "M 130 90 L 155 90 L 175 70", delay: 0.05 },
    { path: "M 130 100 L 165 100 L 185 80", delay: 0.15 },
    // Right traces
    { path: "M 135 115 L 170 115 L 195 115", delay: 0.08 },
    { path: "M 130 130 L 160 130 L 185 155", delay: 0.12 },
    // Bottom-right traces
    { path: "M 120 145 L 120 170 L 145 195", delay: 0.1 },
    { path: "M 105 145 L 105 180 L 125 200", delay: 0.18 },
    // Bottom traces
    { path: "M 90 145 L 90 175 L 65 200", delay: 0.06 },
    { path: "M 80 140 L 80 165 L 50 195", delay: 0.14 },
    // Bottom-left traces
    { path: "M 75 130 L 45 130 L 20 155", delay: 0.09 },
    { path: "M 70 115 L 35 115 L 10 115", delay: 0.16 },
    // Left traces
    { path: "M 75 100 L 40 100 L 15 75", delay: 0.07 },
    { path: "M 80 90 L 50 90 L 25 65", delay: 0.13 },
    // Top-left traces
    { path: "M 90 75 L 90 50 L 65 25", delay: 0.11 },
    { path: "M 100 70 L 100 40 L 75 15", delay: 0.17 },
  ];

  // Node points (solder pads) at trace endpoints
  const nodes = [
    { x: 130, y: 20, delay: 0.3 },
    { x: 85, y: 15, delay: 0.35 },
    { x: 175, y: 70, delay: 0.32 },
    { x: 185, y: 80, delay: 0.38 },
    { x: 195, y: 115, delay: 0.34 },
    { x: 185, y: 155, delay: 0.4 },
    { x: 145, y: 195, delay: 0.36 },
    { x: 125, y: 200, delay: 0.42 },
    { x: 65, y: 200, delay: 0.33 },
    { x: 50, y: 195, delay: 0.39 },
    { x: 20, y: 155, delay: 0.35 },
    { x: 10, y: 115, delay: 0.41 },
    { x: 15, y: 75, delay: 0.34 },
    { x: 25, y: 65, delay: 0.4 },
    { x: 65, y: 25, delay: 0.37 },
    { x: 75, y: 15, delay: 0.43 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 210 210"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter for traces */}
          <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
            stroke="hsl(50 100% 50% / 0.1)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}

        {/* Animated traces - synced with logo scale pulse */}
        {isActive && traces.map((trace, index) => (
          <motion.path
            key={`active-${index}`}
            d={trace.path}
            fill="none"
            stroke="hsl(50 100% 50%)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            filter="url(#traceGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 0.8, 0]
            }}
            transition={{
              duration: 3.5,
              delay: trace.delay,
              ease: "easeOut",
              repeat: Infinity,
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}

        {/* Node points (solder pads) */}
        {isActive && nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="hsl(50 100% 50%)"
            filter="url(#traceGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.6, 0],
              scale: [0, 1.2, 1, 0]
            }}
            transition={{
              duration: 3.5,
              delay: node.delay,
              ease: "easeOut",
              repeat: Infinity,
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ElectricTraces;
