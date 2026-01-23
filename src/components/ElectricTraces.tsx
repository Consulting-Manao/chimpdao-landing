import { motion } from "motion/react";

interface ElectricTracesProps {
  className?: string;
}

const ElectricTraces = ({ className = "" }: ElectricTracesProps) => {
  const traces = [
    { id: 1, d: "M200,200 Q250,150 300,180 T400,160", delay: 0 },
    { id: 2, d: "M200,200 Q180,250 220,300 T180,400", delay: 0.3 },
    { id: 3, d: "M200,200 Q150,180 100,200 T20,180", delay: 0.6 },
    { id: 4, d: "M200,200 Q220,150 200,100 T220,20", delay: 0.9 },
    { id: 5, d: "M200,200 Q280,220 340,260 T420,320", delay: 1.2 },
    { id: 6, d: "M200,200 Q120,220 80,280 T20,360", delay: 1.5 },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(50 100% 50%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(50 100% 60%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(50 100% 50%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {traces.map((trace) => (
        <motion.path
          key={trace.id}
          d={trace.d}
          fill="none"
          stroke="url(#electricGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            delay: trace.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Center glow pulse */}
      <motion.circle
        cx="200"
        cy="200"
        r="60"
        fill="none"
        stroke="hsl(50 100% 50%)"
        strokeWidth="1"
        opacity="0.3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

export default ElectricTraces;
