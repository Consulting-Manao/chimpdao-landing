import { forwardRef } from "react";
import { motion } from "motion/react";

export interface TracePath {
  d: string;
  delay: number;
}

export interface TraceNode {
  x: number;
  y: number;
  r: number;
  delay: number;
}

export interface PCBTraceProps {
  paths: TracePath[];
  nodes: TraceNode[];
  junctionNodes?: TraceNode[];
  isActive: boolean;
  className?: string;
  viewBox?: string;
  filterId?: string;
  duration?: number;
  baseDelay?: number;
}

const PCBTrace = forwardRef<SVGSVGElement, PCBTraceProps>(({
  paths,
  nodes,
  junctionNodes = [],
  isActive,
  className = "",
  viewBox = "0 0 100 60",
  filterId = "traceGlow",
  duration = 0.6,
  baseDelay = 0,
}, ref) => {

  return (
    <svg ref={ref} viewBox={viewBox} className={className} style={{ overflow: "visible" }}>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base paths - always visible at low opacity */}
      {paths.map((path, i) => (
        <path
          key={`base-${i}`}
          d={path.d}
          fill="none"
          stroke="hsl(var(--primary) / 0.15)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Animated paths */}
      {paths.map((path, i) => (
        <motion.path
          key={`animated-${i}-${isActive}`}
          d={path.d}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isActive
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: duration,
              delay: baseDelay + path.delay,
              ease: "easeOut",
            },
            opacity: { duration: 0.2, delay: baseDelay + path.delay },
          }}
        />
      ))}

      {/* Junction nodes */}
      {junctionNodes.map((node, i) => (
        <motion.circle
          key={`junction-${i}-${isActive}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill="hsl(var(--primary))"
          filter={`url(#${filterId})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.25,
            delay: baseDelay + node.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Endpoint nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}-${isActive}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill="hsl(var(--primary))"
          filter={`url(#${filterId})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.3,
            delay: baseDelay + node.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
});

PCBTrace.displayName = "PCBTrace";

export default PCBTrace;
