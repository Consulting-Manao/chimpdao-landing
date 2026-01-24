import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
  isActive?: boolean;
}

const ElectricTraces = ({ className = "", isActive = true }: ElectricTracesProps) => {
  // ASYMMETRIC traces - different patterns on each side
  // Traces flow from center outward, not extending too high (Y > 50)
  const traces = [
    // Left side - 3 traces with clear vertical separation (no crossing)
    { path: "M 140 135 L 105 135 L 75 110 L 35 110", delay: 0 },
    { path: "M 140 150 L 100 150 L 65 175 L 25 175", delay: 0.06 },
    { path: "M 140 165 L 90 165 L 55 190 L 20 190", delay: 0.1 },
    
    // Right side - 2 traces with clear separation
    { path: "M 140 138 L 185 138 L 220 115 L 260 115", delay: 0.03 },
    { path: "M 140 168 L 195 168 L 235 195 L 270 195", delay: 0.09 },
    
    // Top - 2 traces going upward (not crossing, different directions)
    { path: "M 130 120 L 130 90 L 95 65 L 55 65", delay: 0.05 },
    { path: "M 150 118 L 150 85 L 185 60 L 230 60", delay: 0.12 },
    
    // Bottom - 2 traces going downward (clear separation)
    { path: "M 128 175 L 128 210 L 85 235", delay: 0.14 },
    { path: "M 155 178 L 155 215 L 200 245 L 250 245", delay: 0.18 },
  ];

  // Endpoint nodes at trace ends
  const nodes = [
    // Left endpoints (matching new trace paths)
    { x: 35, y: 110, delay: 0.5 },
    { x: 25, y: 175, delay: 0.54 },
    { x: 20, y: 190, delay: 0.58 },
    // Right endpoints
    { x: 260, y: 115, delay: 0.52 },
    { x: 270, y: 195, delay: 0.56 },
    // Top endpoints
    { x: 55, y: 65, delay: 0.53 },
    { x: 230, y: 60, delay: 0.6 },
    // Bottom endpoints
    { x: 85, y: 235, delay: 0.62 },
    { x: 250, y: 245, delay: 0.66 },
  ];

  // Junction nodes at bends
  const junctionNodes = [
    // Junction nodes at bends (matching new trace paths)
    { x: 75, y: 110, delay: 0.22 },
    { x: 65, y: 175, delay: 0.26 },
    { x: 220, y: 115, delay: 0.24 },
    { x: 235, y: 195, delay: 0.28 },
    { x: 95, y: 65, delay: 0.25 },
    { x: 185, y: 60, delay: 0.32 },
    { x: 85, y: 235, delay: 0.35 },
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