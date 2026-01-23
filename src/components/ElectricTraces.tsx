import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // Expanded PCB traces with 45° angles and more extension
  const traces = [
    // Left side traces - with 45° angle variations
    { path: "M 120 140 L 90 140 L 65 120 L 30 120", delay: 0 },
    { path: "M 120 155 L 80 155 L 55 175 L 20 175", delay: 0.1 },
    { path: "M 115 160 L 85 160 L 60 185 L 25 185 L 10 170", delay: 0.15 },
    
    // Right side traces - with 45° angle variations
    { path: "M 160 140 L 190 140 L 215 120 L 250 120", delay: 0.05 },
    { path: "M 160 155 L 200 155 L 225 175 L 260 175", delay: 0.12 },
    { path: "M 165 160 L 195 160 L 220 185 L 255 185 L 270 170", delay: 0.08 },
    
    // Top traces - more vertical extension with angles
    { path: "M 130 115 L 130 85 L 110 60 L 110 30", delay: 0.07 },
    { path: "M 150 115 L 150 80 L 170 55 L 170 25", delay: 0.13 },
    { path: "M 140 110 L 140 70 L 120 45 L 85 45 L 60 25", delay: 0.1 },
    { path: "M 140 110 L 140 70 L 160 45 L 195 45 L 220 25", delay: 0.16 },
    
    // Bottom traces - extend with angles but not too far
    { path: "M 130 165 L 130 190 L 110 210 L 75 210", delay: 0.18 },
    { path: "M 150 165 L 150 195 L 175 215 L 210 215", delay: 0.2 },
  ];

  // Node points at trace endpoints and junctions
  const nodes = [
    // Left endpoint nodes
    { x: 30, y: 120, delay: 0.3 },
    { x: 20, y: 175, delay: 0.35 },
    { x: 10, y: 170, delay: 0.38 },
    // Right endpoint nodes
    { x: 250, y: 120, delay: 0.32 },
    { x: 260, y: 175, delay: 0.36 },
    { x: 270, y: 170, delay: 0.4 },
    // Top endpoint nodes
    { x: 110, y: 30, delay: 0.34 },
    { x: 170, y: 25, delay: 0.37 },
    { x: 60, y: 25, delay: 0.33 },
    { x: 220, y: 25, delay: 0.39 },
    // Bottom endpoint nodes
    { x: 75, y: 210, delay: 0.42 },
    { x: 210, y: 215, delay: 0.44 },
    // Junction nodes (at 45° bends)
    { x: 65, y: 120, delay: 0.25 },
    { x: 55, y: 175, delay: 0.27 },
    { x: 215, y: 120, delay: 0.26 },
    { x: 225, y: 175, delay: 0.28 },
    { x: 110, y: 60, delay: 0.29 },
    { x: 170, y: 55, delay: 0.31 },
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
