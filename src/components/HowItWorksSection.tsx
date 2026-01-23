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
    <div className="hidden md:flex items-center justify-center w-24 lg:w-36 flex-shrink-0">
      <svg viewBox="0 0 100 40" className="w-full h-12" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`connectorGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base traces - main path with branches */}
        <path
          d="M 0 20 L 25 20 L 35 20 L 65 20 L 75 20 L 100 20"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Upper branch */}
        <path
          d="M 30 20 L 40 10 L 55 10"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lower branch */}
        <path
          d="M 70 20 L 60 30 L 45 30"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated main trace */}
        <motion.path
          d="M 0 20 L 25 20 L 35 20 L 65 20 L 75 20 L 100 20"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M 30 20 L 40 10 L 55 10"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
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
          d="M 70 20 L 60 30 L 45 30"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
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
        
        {/* Main line nodes */}
        <motion.circle
          cx="0"
          cy="20"
          r="3"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.4 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="50"
          cy="20"
          r="4"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.5 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="100"
          cy="20"
          r="3"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 1 : 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.6 + index * 0.2 : 0 }}
        />
        
        {/* Branch endpoint nodes */}
        <motion.circle
          cx="55"
          cy="10"
          r="2.5"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.9 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.7 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="45"
          cy="30"
          r="2.5"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.9 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.8 + index * 0.2 : 0 }}
        />
        
        {/* Junction nodes at bends */}
        <motion.circle
          cx="30"
          cy="20"
          r="2"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: isHovered ? 0.8 : 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isInView ? 0.55 + index * 0.2 : 0 }}
        />
        <motion.circle
          cx="70"
          cy="20"
          r="2"
          fill="hsl(var(--primary))"
          filter={`url(#connectorGlow-${index})`}
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
    <div className="flex md:hidden items-center justify-center h-12 my-2">
      <svg viewBox="0 0 40 50" className="h-full w-10" style={{ overflow: "visible" }}>
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
          d="M 20 0 L 20 25 L 20 50"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Left branch */}
        <path
          d="M 20 20 L 10 28 L 5 28"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right branch */}
        <path
          d="M 20 30 L 30 22 L 35 22"
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated main trace */}
        <motion.path
          d="M 20 0 L 20 25 L 20 50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.2, ease: "easeOut" }}
        />
        
        {/* Animated branches */}
        <motion.path
          d="M 20 20 L 10 28 L 5 28"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + index * 0.2, ease: "easeOut" }}
        />
        <motion.path
          d="M 20 30 L 30 22 L 35 22"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.2, ease: "easeOut" }}
        />
        
        {/* Nodes */}
        <motion.circle
          cx="20"
          cy="25"
          r="4"
          fill="hsl(var(--primary))"
          filter={`url(#mobileGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
        />
        <motion.circle
          cx="5"
          cy="28"
          r="2"
          fill="hsl(var(--primary))"
          filter={`url(#mobileGlow-${index})`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
        />
        <motion.circle
          cx="35"
          cy="22"
          r="2"
          fill="hsl(var(--primary))"
          filter={`url(#mobileGlow-${index})`}
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
      {/* Icon container - no card, just the icon with hover glow */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4 cursor-pointer"
        whileHover={{
          scale: 1.1,
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
        />
      </motion.div>

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
    <section className="py-24 md:py-32 relative" id="how-it-works">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          className="text-center mb-16 md:mb-20"
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

        {/* Horizontal flow on desktop - perfectly aligned */}
        <div className="hidden md:flex items-center justify-center max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <StepCard 
                step={step} 
                index={index} 
                isInView={isInView} 
                onHoverChange={(hovered) => setHoveredIndex(hovered ? index : null)}
              />
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