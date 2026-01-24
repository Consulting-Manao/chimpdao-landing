import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // ASYMMETRIC traces - different patterns on each side
  // Traces flow from center outward, not extending too high (Y > 50)
  const traces = [
    // Left side - 3 traces with varied lengths
    { path: "M 140 140 L 105 140 L 75 115 L 35 115", delay: 0 },
    { path: "M 140 150 L 100 150 L 65 170 L 25 170", delay: 0.06 },
    { path: "M 140 158 L 90 158 L 55 145 L 20 145 L 5 160", delay: 0.1 },
    
    // Right side - 2 traces (asymmetric, fewer than left)
    { path: "M 140 142 L 185 142 L 220 125 L 260 125", delay: 0.03 },
    { path: "M 140 162 L 195 162 L 235 180 L 270 180", delay: 0.09 },
    
    // Top - 2 traces with different heights (not going above Y:55)
    { path: "M 135 120 L 135 95 L 105 70 L 70 70", delay: 0.05 },
    { path: "M 148 118 L 148 85 L 180 60 L 220 60", delay: 0.12 },
    
    // Bottom - 2 shorter traces (asymmetric)
    { path: "M 132 168 L 132 200 L 95 220", delay: 0.14 },
    { path: "M 152 170 L 152 210 L 190 235 L 240 235", delay: 0.18 },
  ];

  // Endpoint nodes at trace ends
  const nodes = [
    // Left endpoints
    { x: 35, y: 115, delay: 0.5 },
    { x: 25, y: 170, delay: 0.54 },
    { x: 5, y: 160, delay: 0.58 },
    // Right endpoints
    { x: 260, y: 125, delay: 0.52 },
    { x: 270, y: 180, delay: 0.56 },
    // Top endpoints
    { x: 70, y: 70, delay: 0.53 },
    { x: 220, y: 60, delay: 0.6 },
    // Bottom endpoints
    { x: 95, y: 220, delay: 0.62 },
    { x: 240, y: 235, delay: 0.66 },
  ];

  // Junction nodes at bends
  const junctionNodes = [
    { x: 75, y: 115, delay: 0.22 },
    { x: 65, y: 170, delay: 0.26 },
    { x: 220, y: 125, delay: 0.24 },
    { x: 235, y: 180, delay: 0.28 },
    { x: 105, y: 70, delay: 0.25 },
    { x: 180, y: 60, delay: 0.32 },
    { x: 95, y: 220, delay: 0.35 },
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