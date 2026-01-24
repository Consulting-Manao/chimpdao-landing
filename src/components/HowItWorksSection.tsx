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

const PCBConnector = ({ 
  index, 
  isInView, 
  isHovered 
}: { 
  index: number; 
  isInView: boolean; 
  isHovered: boolean;
}) => {
  return (
    <div className="hidden md:flex items-center justify-center w-20 lg:w-28 flex-shrink-0 self-center">
      <svg viewBox="0 0 80 60" className="w-full h-16" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`connectorGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base traces - main horizontal with branches */}
        <path
          d="M 0 30 L 20 30 L 40 30 L 60 30 L 80 30"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Upper branch */}
        <path
          d="M 25 30 L 35 18 L 50 18"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lower branch */}
        <path
          d="M 55 30 L 45 42 L 30 42"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated main trace */}
        <motion.path
          d="M 0 30 L 20 30 L 40 30 L 60 30 L 80 30"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter={`url(#connectorGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: isHovered ? 1 : 0.5
          } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 0.6, delay: 0.3 + index * 0.2, ease: "easeOut" },
            opacity: { duration: 0.2 }
          }}
        />
        
        {/* Animated upper branch */}
        <motion.path
          d="M 25 30 L 35 18 L 50 18"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#connectorGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: isHovered ? 0.9 : 0.4
          } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 0.4, delay: 0.5 + index * 0.2, ease: "easeOut" },
            opacity: { duration: 0.2 }
          }}
        />
        
        {/* Animated lower branch */}
        <motion.path
          d="M 55 30 L 45 42 L 30 42"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#connectorGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: isHovered ? 0.9 : 0.4
          } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 0.4, delay: 0.6 + index * 0.2, ease: "easeOut" },
            opacity: { duration: 0.2 }
          }}
        />
        
        {/* Main line nodes - no filter to avoid square artifacts */}
        <motion.circle
          cx="0"
          cy="30"
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.4 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="40"
          cy="30"
          r="3.5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.5 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="80"
          cy="30"
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.6 + index * 0.2 : 0 }}
        />
        
        {/* Branch endpoint nodes - no filter to avoid square artifacts */}
        <motion.circle
          cx="50"
          cy="18"
          r="2"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.9 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.7 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="30"
          cy="42"
          r="2"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.9 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.8 + index * 0.2 : 0 }}
        />
        
        {/* Junction nodes at bends - no filter to avoid square artifacts */}
        <motion.circle
          cx="25"
          cy="30"
          r="1.5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.8 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.55 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="55"
          cy="30"
          r="1.5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.8 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.65 + index * 0.2 : 0 }}
        />
      </svg>
    </div>
  );
};

const MobilePCBConnector = ({ index, isInView }: { index: number; isInView: boolean }) => {
  return (
    <div className="flex md:hidden items-center justify-center h-10 my-1">
      <svg viewBox="0 0 40 40" className="h-full w-8" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`mobileGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base traces - vertical with branches */}
        <path
          d="M 20 0 L 20 20 L 20 40"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Left branch */}
        <path
          d="M 20 15 L 10 22 L 5 22"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right branch */}
        <path
          d="M 20 25 L 30 18 L 35 18"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated main trace */}
        <motion.path
          d="M 20 0 L 20 20 L 20 40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.2, ease: "easeOut" }}
        />
        
        {/* Animated branches */}
        <motion.path
          d="M 20 15 L 10 22 L 5 22"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + index * 0.2, ease: "easeOut" }}
        />
        <motion.path
          d="M 20 25 L 30 18 L 35 18"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.2, ease: "easeOut" }}
        />
        
        {/* Nodes - no filter to avoid square artifacts */}
        <motion.circle
          cx="20"
          cy="20"
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
        />
        <motion.circle
          cx="5"
          cy="22"
          r="1.5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
        />
        <motion.circle
          cx="35"
          cy="18"
          r="1.5"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.7 + index * 0.2 }}
        />
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