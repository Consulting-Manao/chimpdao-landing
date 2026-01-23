import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // Horizontal-dominant PCB traces - staying within bounds, no text overlap
  const traces = [
    // Left side traces - horizontal with small angles
    { path: "M 85 100 L 50 100 L 30 90", delay: 0 },
    { path: "M 85 110 L 40 110 L 15 110", delay: 0.1 },
    { path: "M 85 120 L 50 120 L 25 130", delay: 0.15 },
    
    // Right side traces - horizontal with small angles
    { path: "M 125 100 L 160 100 L 180 90", delay: 0.05 },
    { path: "M 125 110 L 170 110 L 195 110", delay: 0.12 },
    { path: "M 125 120 L 160 120 L 185 130", delay: 0.08 },
    
    // Top traces - short vertical, then horizontal
    { path: "M 100 85 L 100 70 L 70 70 L 50 60", delay: 0.07 },
    { path: "M 110 85 L 110 65 L 140 65 L 165 55", delay: 0.13 },
    
    // Bottom traces - minimal vertical extension
    { path: "M 100 125 L 100 135 L 65 135 L 45 140", delay: 0.18 },
    { path: "M 110 125 L 110 138 L 145 138 L 170 145", delay: 0.2 },
  ];

  // Node points at trace endpoints - matching trace endpoints
  const nodes = [
    { x: 30, y: 90, delay: 0.3 },
    { x: 15, y: 110, delay: 0.35 },
    { x: 25, y: 130, delay: 0.38 },
    { x: 180, y: 90, delay: 0.32 },
    { x: 195, y: 110, delay: 0.36 },
    { x: 185, y: 130, delay: 0.4 },
    { x: 50, y: 60, delay: 0.34 },
    { x: 165, y: 55, delay: 0.37 },
    { x: 45, y: 140, delay: 0.42 },
    { x: 170, y: 145, delay: 0.44 },
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

        {/* Animated traces - synced with logo scale pulse */}
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

        {/* Node points - circles only, no scale animation to prevent square artifacts */}
        {isActive && nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="hsl(var(--primary))"
            filter="url(#traceGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 0] }}
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
