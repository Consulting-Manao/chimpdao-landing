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

// Clean PCB-style trace patterns
const tracePatterns = [
  // Connector 1: Parallel horizontal lines - clean PCB style
  {
    paths: [
      { d: "M 0 30 L 100 30", strokeWidth: 2.5, delay: 0 },
      { d: "M 0 18 L 100 18", strokeWidth: 1.5, delay: 0.1 },
      { d: "M 0 42 L 100 42", strokeWidth: 1.5, delay: 0.15 },
    ],
    nodes: [
      { x: 0, y: 30, r: 4, order: 0 },
      { x: 50, y: 30, r: 3, order: 3 },
      { x: 100, y: 30, r: 4, order: 6 },
      { x: 0, y: 18, r: 2.5, order: 1 },
      { x: 100, y: 18, r: 2.5, order: 5 },
      { x: 0, y: 42, r: 2.5, order: 2 },
      { x: 100, y: 42, r: 2.5, order: 4 },
    ],
  },
  // Connector 2: Centered fork pattern
  {
    paths: [
      { d: "M 0 30 L 100 30", strokeWidth: 2.5, delay: 0 },
      { d: "M 50 30 L 50 18", strokeWidth: 1.5, delay: 0.08 },
      { d: "M 50 30 L 50 42", strokeWidth: 1.5, delay: 0.08 },
      { d: "M 30 18 L 70 18", strokeWidth: 1.5, delay: 0.12 },
      { d: "M 30 42 L 70 42", strokeWidth: 1.5, delay: 0.12 },
    ],
    nodes: [
      { x: 0, y: 30, r: 4, order: 0 },
      { x: 100, y: 30, r: 4, order: 6 },
      { x: 50, y: 30, r: 3, order: 3 },
      { x: 50, y: 18, r: 2, order: 2 },
      { x: 50, y: 42, r: 2, order: 4 },
      { x: 30, y: 18, r: 2, order: 1 },
      { x: 70, y: 18, r: 2, order: 5 },
      { x: 30, y: 42, r: 2, order: 1 },
      { x: 70, y: 42, r: 2, order: 5 },
    ],
  },
];

type Direction = "forward" | "backward" | null;

const PCBConnector = ({ 
  index, 
  isInView, 
  direction 
}: { 
  index: number; 
  isInView: boolean; 
  direction: Direction;
}) => {
  const pattern = tracePatterns[index] || tracePatterns[0];
  const isHovered = direction !== null;
  
  // Sort nodes by order for sequential animation
  const sortedNodes = [...pattern.nodes].sort((a, b) => {
    const orderA = direction === "backward" ? (6 - a.order) : a.order;
    const orderB = direction === "backward" ? (6 - b.order) : b.order;
    return orderA - orderB;
  });
  
  return (
    <div className="hidden md:flex items-center justify-center w-32 lg:w-40 flex-shrink-0 self-center">
      <svg viewBox="0 0 100 60" className="w-full h-16" style={{ overflow: "visible" }}>
        {/* Base paths - always visible at low opacity */}
        {pattern.paths.map((path, i) => (
          <path
            key={`base-${i}`}
            d={path.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        
        {/* Animated paths */}
        {pattern.paths.map((path, i) => (
          <motion.path
            key={`animated-${i}-${direction}`}
            d={path.d}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ 
              pathLength: direction === "backward" ? 1 : 0, 
              opacity: 0 
            }}
            animate={isInView ? { 
              pathLength: direction === "backward" ? 0 : 1, 
              opacity: isHovered ? 1 : 0.5
            } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { 
                duration: 0.5, 
                delay: direction ? path.delay : 0.3 + path.delay, 
                ease: "easeOut" 
              },
              opacity: { duration: 0.2 }
            }}
          />
        ))}
        
        {/* Nodes at junctions - animate in sequence based on direction */}
        {sortedNodes.map((node, i) => (
          <motion.circle
            key={`node-${node.x}-${node.y}-${direction}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { 
              opacity: isHovered ? 1 : 0.4, 
              scale: 1 
            } : { opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.2, 
              delay: direction ? 0.1 + i * 0.05 : 0.5 + i * 0.03 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Mobile trace patterns - vertical versions
const mobileTracePatterns = [
  // Connector 1: Parallel vertical lines
  {
    paths: [
      { d: "M 22 0 L 22 50", strokeWidth: 2.5, delay: 0 },
      { d: "M 12 0 L 12 50", strokeWidth: 1.5, delay: 0.1 },
      { d: "M 32 0 L 32 50", strokeWidth: 1.5, delay: 0.15 },
    ],
    nodes: [
      { x: 22, y: 0, r: 3, order: 0 },
      { x: 22, y: 25, r: 2.5, order: 3 },
      { x: 22, y: 50, r: 3, order: 6 },
      { x: 12, y: 0, r: 2, order: 1 },
      { x: 12, y: 50, r: 2, order: 5 },
      { x: 32, y: 0, r: 2, order: 2 },
      { x: 32, y: 50, r: 2, order: 4 },
    ],
  },
  // Connector 2: Centered fork pattern (vertical)
  {
    paths: [
      { d: "M 22 0 L 22 50", strokeWidth: 2.5, delay: 0 },
      { d: "M 22 25 L 12 25", strokeWidth: 1.5, delay: 0.08 },
      { d: "M 22 25 L 32 25", strokeWidth: 1.5, delay: 0.08 },
      { d: "M 12 15 L 12 35", strokeWidth: 1.5, delay: 0.12 },
      { d: "M 32 15 L 32 35", strokeWidth: 1.5, delay: 0.12 },
    ],
    nodes: [
      { x: 22, y: 0, r: 3, order: 0 },
      { x: 22, y: 50, r: 3, order: 6 },
      { x: 22, y: 25, r: 2.5, order: 3 },
      { x: 12, y: 25, r: 2, order: 2 },
      { x: 32, y: 25, r: 2, order: 4 },
      { x: 12, y: 15, r: 2, order: 1 },
      { x: 12, y: 35, r: 2, order: 5 },
      { x: 32, y: 15, r: 2, order: 1 },
      { x: 32, y: 35, r: 2, order: 5 },
    ],
  },
];

const MobilePCBConnector = ({ 
  index, 
  isInView,
  direction 
}: { 
  index: number; 
  isInView: boolean;
  direction: Direction;
}) => {
  const pattern = mobileTracePatterns[index] || mobileTracePatterns[0];
  const isHovered = direction !== null;
  
  const sortedNodes = [...pattern.nodes].sort((a, b) => {
    const orderA = direction === "backward" ? (6 - a.order) : a.order;
    const orderB = direction === "backward" ? (6 - b.order) : b.order;
    return orderA - orderB;
  });
  
  return (
    <div className="flex md:hidden items-center justify-center h-14 my-2">
      <svg viewBox="0 0 44 50" className="h-full w-11" style={{ overflow: "visible" }}>
        {/* Base paths */}
        {pattern.paths.map((path, i) => (
          <path
            key={`base-${i}`}
            d={path.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        
        {/* Animated paths */}
        {pattern.paths.map((path, i) => (
          <motion.path
            key={`animated-${i}-${direction}`}
            d={path.d}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ 
              pathLength: direction === "backward" ? 1 : 0, 
              opacity: 0 
            }}
            animate={isInView ? { 
              pathLength: direction === "backward" ? 0 : 1, 
              opacity: isHovered ? 1 : 0.5
            } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.4, delay: direction ? path.delay : 0.3 + path.delay, ease: "easeOut" },
              opacity: { duration: 0.2 }
            }}
          />
        ))}
        
        {/* Nodes */}
        {sortedNodes.map((node, i) => (
          <motion.circle
            key={`node-${node.x}-${node.y}-${direction}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { 
              opacity: isHovered ? 1 : 0.5, 
              scale: 1 
            } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, delay: direction ? 0.1 + i * 0.04 : 0.4 + i * 0.04 }}
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
      {/* Icon container */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4 cursor-pointer group">
        <img
          src={step.image}
          alt={step.title}
          className="w-16 h-16 md:w-20 md:h-20 object-contain transition-opacity duration-300 opacity-90 group-hover:opacity-100"
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

  // Calculate direction for each connector based on which icon is hovered
  const getConnectorDirection = (connectorIndex: number): Direction => {
    if (hoveredIndex === null) return null;
    
    const leftIconIndex = connectorIndex;
    const rightIconIndex = connectorIndex + 1;
    
    if (hoveredIndex === leftIconIndex) return "forward";
    if (hoveredIndex === rightIconIndex) return "backward";
    return null;
  };

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
          {/* Row 1: Icons + Traces */}
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
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain transition-opacity duration-300 opacity-90 group-hover:opacity-100"
                  />
                </motion.div>
                
                {/* Trace connector with direction */}
                {index < steps.length - 1 && (
                  <PCBConnector 
                    index={index} 
                    isInView={isInView} 
                    direction={getConnectorDirection(index)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Row 2: Titles */}
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

          {/* Row 3: Descriptions */}
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

        {/* Vertical flow on mobile with directional animations */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <StepCard 
                step={step} 
                index={index} 
                isInView={isInView}
                onHoverChange={(hovered) => setHoveredIndex(hovered ? index : null)}
              />
              {index < steps.length - 1 && (
                <MobilePCBConnector 
                  index={index} 
                  isInView={isInView} 
                  direction={getConnectorDirection(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
