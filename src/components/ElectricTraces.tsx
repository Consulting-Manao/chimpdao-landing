import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // PCB-style traces with 90° and 45° angles
  const traces = [
    // Top traces
    { path: "M 100 80 L 100 50 L 130 20 L 170 20", delay: 0 },
    { path: "M 120 75 L 120 40 L 150 10", delay: 0.15 },
    // Top-right traces
    { path: "M 140 90 L 160 90 L 180 70 L 180 30", delay: 0.1 },
    { path: "M 145 100 L 175 100 L 190 85 L 190 60", delay: 0.25 },
    // Right traces
    { path: "M 150 110 L 180 110 L 200 110", delay: 0.05 },
    { path: "M 150 120 L 170 120 L 185 135 L 200 135", delay: 0.2 },
    // Bottom-right traces
    { path: "M 140 140 L 160 140 L 175 155 L 175 180", delay: 0.15 },
    { path: "M 130 150 L 150 150 L 165 165 L 165 190", delay: 0.3 },
    // Bottom traces
    { path: "M 100 155 L 100 180 L 85 195 L 50 195", delay: 0.1 },
    { path: "M 115 150 L 115 175 L 130 190", delay: 0.25 },
    // Bottom-left traces
    { path: "M 70 140 L 50 140 L 35 155 L 35 180", delay: 0.2 },
    { path: "M 80 150 L 60 150 L 45 165 L 45 185", delay: 0.35 },
    // Left traces
    { path: "M 55 110 L 30 110 L 10 110", delay: 0.05 },
    { path: "M 55 125 L 35 125 L 20 140 L 5 140", delay: 0.2 },
    // Top-left traces
    { path: "M 70 90 L 50 90 L 30 70 L 30 40", delay: 0.15 },
    { path: "M 65 80 L 45 80 L 25 60 L 25 30", delay: 0.3 },
  ];

  // Node points (solder pads)
  const nodes = [
    { x: 170, y: 20, delay: 0.4 },
    { x: 150, y: 10, delay: 0.55 },
    { x: 180, y: 30, delay: 0.5 },
    { x: 190, y: 60, delay: 0.65 },
    { x: 200, y: 110, delay: 0.45 },
    { x: 200, y: 135, delay: 0.6 },
    { x: 175, y: 180, delay: 0.55 },
    { x: 165, y: 190, delay: 0.7 },
    { x: 50, y: 195, delay: 0.5 },
    { x: 130, y: 190, delay: 0.65 },
    { x: 35, y: 180, delay: 0.6 },
    { x: 45, y: 185, delay: 0.75 },
    { x: 10, y: 110, delay: 0.45 },
    { x: 5, y: 140, delay: 0.6 },
    { x: 30, y: 40, delay: 0.55 },
    { x: 25, y: 30, delay: 0.7 },
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
          
          {/* Gradient for trace animation */}
          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(50 100% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(50 100% 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(50 100% 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base traces (static, dimmed) */}
        {traces.map((trace, index) => (
          <path
            key={`base-${index}`}
            d={trace.path}
            fill="none"
            stroke="hsl(50 100% 50% / 0.15)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}

        {/* Animated traces */}
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
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              delay: trace.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Node points (solder pads) */}
        {nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="hsl(50 100% 50%)"
            filter="url(#traceGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isActive ? { 
              opacity: [0, 1, 0.5],
              scale: [0, 1.2, 1]
            } : { opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: node.delay + 0.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2.7,
            }}
          />
        ))}

        {/* Central glow pulse */}
        <motion.circle
          cx="105"
          cy="115"
          r="60"
          fill="none"
          stroke="hsl(50 100% 50%)"
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isActive ? {
            scale: [0.8, 1.1, 0.8],
            opacity: [0, 0.3, 0]
          } : { opacity: 0 }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

export default ElectricTraces;
