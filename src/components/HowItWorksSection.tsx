import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import tshirtMerch from "@/assets/tshirt-merch.png";
import nfcChip from "@/assets/nfc-chip.png";
import chimpLogo from "@/assets/chimp-logo.png";

const steps = [
  {
    image: tshirtMerch,
    title: "Buy NFC Merch",
    description: "Get exclusive merch with embedded NFC chips",
  },
  {
    image: nfcChip,
    title: "Tap Your Phone",
    description: "Scan the NFC chip with your smartphone",
  },
  {
    image: chimpLogo,
    title: "Reveal Your NFT",
    description: "Claim your NFT on the Stellar blockchain",
  },
];

// Unique trace patterns for each connector
const tracePatterns = [
  // Connector 1 (Merch → Phone): Converging pattern - multiple inputs merging
  {
    main: "M 0 30 L 80 30",
    branches: [
      { d: "M 0 14 L 20 14 L 32 30", delay: 0.1 },
      { d: "M 0 46 L 20 46 L 32 30", delay: 0.15 },
      { d: "M 48 30 L 60 18 L 80 18", delay: 0.2 },
      { d: "M 48 30 L 60 42 L 80 42", delay: 0.25 },
    ],
    nodes: [
      { x: 0, y: 14, r: 2.5 },
      { x: 0, y: 30, r: 3 },
      { x: 0, y: 46, r: 2.5 },
      { x: 32, y: 30, r: 4 },
      { x: 48, y: 30, r: 3 },
      { x: 80, y: 18, r: 2.5 },
      { x: 80, y: 30, r: 3 },
      { x: 80, y: 42, r: 2.5 },
    ],
  },
  // Connector 2 (Phone → NFT): Zigzag burst pattern - energy radiating out
  {
    main: "M 0 30 L 25 30 L 40 15 L 55 30 L 80 30",
    branches: [
      { d: "M 40 15 L 40 5", delay: 0.1 },
      { d: "M 25 30 L 15 45", delay: 0.15 },
      { d: "M 55 30 L 65 45", delay: 0.2 },
      { d: "M 40 15 L 55 5", delay: 0.25 },
    ],
    nodes: [
      { x: 0, y: 30, r: 3 },
      { x: 25, y: 30, r: 2.5 },
      { x: 40, y: 15, r: 4 },
      { x: 40, y: 5, r: 2 },
      { x: 55, y: 5, r: 2 },
      { x: 55, y: 30, r: 2.5 },
      { x: 15, y: 45, r: 2 },
      { x: 65, y: 45, r: 2 },
      { x: 80, y: 30, r: 3 },
    ],
  },
];

const PCBConnector = ({ 
  index, 
  isInView, 
  isHovered 
}: { 
  index: number; 
  isInView: boolean; 
  isHovered: boolean;
}) => {
  const pattern = tracePatterns[index] || tracePatterns[0];
  
  return (
    <div className="hidden md:flex items-center justify-center w-24 lg:w-32 flex-shrink-0 self-center">
      <svg viewBox="0 0 80 55" className="w-full h-14" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`connectorGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base main trace */}
        <path
          d={pattern.main}
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Base branch traces */}
        {pattern.branches.map((branch, i) => (
          <path
            key={i}
            d={branch.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        
        {/* Animated main trace */}
        <motion.path
          d={pattern.main}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#connectorGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: isHovered ? 1 : 0.6
          } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 0.6, delay: 0.3, ease: "easeOut" },
            opacity: { duration: 0.2 }
          }}
        />
        
        {/* Animated branch traces */}
        {pattern.branches.map((branch, i) => (
          <motion.path
            key={i}
            d={branch.d}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#connectorGlow-${index})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: 1, 
              opacity: isHovered ? 0.9 : 0.5
            } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.4, delay: 0.4 + branch.delay, ease: "easeOut" },
              opacity: { duration: 0.2 }
            }}
          />
        ))}
        
        {/* Nodes at junctions and endpoints */}
        {pattern.nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: isHovered ? 1 : 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: isInView ? 0.5 + i * 0.03 : 0 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Mobile trace patterns - vertical versions with unique designs
const mobileTracePatterns = [
  // Connector 1: Converging from sides
  {
    main: "M 20 0 L 20 40",
    branches: [
      { d: "M 5 8 L 12 8 L 20 18", delay: 0.1 },
      { d: "M 35 8 L 28 8 L 20 18", delay: 0.15 },
    ],
    nodes: [
      { x: 5, y: 8, r: 2 },
      { x: 35, y: 8, r: 2 },
      { x: 20, y: 0, r: 2.5 },
      { x: 20, y: 18, r: 3 },
      { x: 20, y: 40, r: 2.5 },
    ],
  },
  // Connector 2: Zigzag burst
  {
    main: "M 20 0 L 20 12 L 28 20 L 20 28 L 20 40",
    branches: [
      { d: "M 28 20 L 38 20", delay: 0.1 },
      { d: "M 28 20 L 35 28", delay: 0.15 },
    ],
    nodes: [
      { x: 20, y: 0, r: 2.5 },
      { x: 20, y: 12, r: 2 },
      { x: 28, y: 20, r: 3 },
      { x: 38, y: 20, r: 2 },
      { x: 35, y: 28, r: 2 },
      { x: 20, y: 28, r: 2 },
      { x: 20, y: 40, r: 2.5 },
    ],
  },
];

const MobilePCBConnector = ({ index, isInView }: { index: number; isInView: boolean }) => {
  const pattern = mobileTracePatterns[index] || mobileTracePatterns[0];
  
  return (
    <div className="flex md:hidden items-center justify-center h-12 my-2">
      <svg viewBox="0 0 45 45" className="h-full w-10" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`mobileGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base main trace */}
        <path
          d={pattern.main}
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Base branches */}
        {pattern.branches.map((branch, i) => (
          <path
            key={i}
            d={branch.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        
        {/* Animated main trace */}
        <motion.path
          d={pattern.main}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        />
        
        {/* Animated branches */}
        {pattern.branches.map((branch, i) => (
          <motion.path
            key={i}
            d={branch.d}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#mobileGlow-${index})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + branch.delay, ease: "easeOut" }}
          />
        ))}
        
        {/* Nodes */}
        {pattern.nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
};

const StepCard = ({
  step,
  index,
  isInView,
  onHoverChange,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
  onHoverChange: (hovered: boolean) => void;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Icon container - CSS hover only, no motion scale to avoid filter artifacts */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4 cursor-pointer group">
        <img
          src={step.image}
          alt={step.title}
          className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
          style={{
            filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "drop-shadow(0 0 35px hsl(var(--primary) / 0.6))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))";
          }}
        />
      </div>

      {/* Content */}
      <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{step.title}</h3>
      <p className="text-sm md:text-base text-muted-foreground max-w-[180px]">{step.description}</p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 relative" id="how-it-works">
      <div className="container px-4">
        {/* Section header */}
      <motion.div
        ref={sectionRef}
        className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">How</span> It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to connect physical merch with blockchain-verified digital ownership.
          </p>
        </motion.div>

        {/* Desktop: 3-row structure for perfect alignment */}
        <div className="hidden md:block max-w-5xl mx-auto">
          {/* Row 1: Icons + Traces - all perfectly aligned on same horizontal axis */}
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                {/* Icon only */}
                <motion.div
                  className="w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
                    style={{ filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "drop-shadow(0 0 35px hsl(var(--primary) / 0.6))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))";
                    }}
                  />
                </motion.div>
                
                {/* Trace connector */}
                {index < steps.length - 1 && (
                  <PCBConnector 
                    index={index} 
                    isInView={isInView} 
                    isHovered={hoveredIndex === index || hoveredIndex === index + 1}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Row 2: Titles - centered under each icon */}
          <div className="flex justify-between max-w-3xl mx-auto mb-2">
            {steps.map((step, index) => (
              <motion.h3
                key={step.title}
                className="text-xl font-bold text-foreground text-center flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              >
                {step.title}
              </motion.h3>
            ))}
          </div>

          {/* Row 3: Descriptions - centered under each title */}
          <div className="flex justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.p
                key={step.description}
                className="text-base text-muted-foreground text-center flex-1 max-w-[200px] mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              >
                {step.description}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Vertical flow on mobile */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <StepCard 
                step={step} 
                index={index} 
                isInView={isInView}
                onHoverChange={() => {}}
              />
              {index < steps.length - 1 && (
                <MobilePCBConnector index={index} isInView={isInView} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;