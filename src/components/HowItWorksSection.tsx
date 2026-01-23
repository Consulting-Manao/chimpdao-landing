import { motion, useInView } from "motion/react";
import { useRef } from "react";
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

const PCBConnector = ({ index, isInView }: { index: number; isInView: boolean }) => {
  return (
    <div className="hidden md:flex items-center justify-center w-24 lg:w-32">
      <svg viewBox="0 0 100 40" className="w-full h-10" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`connectorGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base trace (dimmed) */}
        <path
          d="M 0 20 L 30 20 L 40 10 L 60 10 L 70 20 L 100 20"
          fill="none"
          stroke="hsl(50 100% 50% / 0.2)"
          strokeWidth="3"
          strokeLinecap="square"
        />
        
        {/* Animated trace */}
        <motion.path
          d="M 0 20 L 30 20 L 40 10 L 60 10 L 70 20 L 100 20"
          fill="none"
          stroke="hsl(50 100% 50%)"
          strokeWidth="3"
          strokeLinecap="square"
          filter={`url(#connectorGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: 1 
          } : { pathLength: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + index * 0.3,
            ease: "easeOut",
          }}
        />
        
        {/* Node points */}
        <motion.circle
          cx="40"
          cy="10"
          r="4"
          fill="hsl(50 100% 50%)"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.8 + index * 0.3 }}
        />
        <motion.circle
          cx="60"
          cy="10"
          r="4"
          fill="hsl(50 100% 50%)"
          filter={`url(#connectorGlow-${index})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.3 }}
        />
      </svg>
    </div>
  );
};

const MobilePCBConnector = ({ index, isInView }: { index: number; isInView: boolean }) => {
  return (
    <div className="flex md:hidden items-center justify-center h-16 my-2">
      <svg viewBox="0 0 40 60" className="h-full w-8" style={{ overflow: "visible" }}>
        <defs>
          <filter id={`mobileGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Base trace */}
        <path
          d="M 20 0 L 20 20 L 30 30 L 30 40 L 20 50 L 20 60"
          fill="none"
          stroke="hsl(50 100% 50% / 0.2)"
          strokeWidth="3"
          strokeLinecap="square"
        />
        
        {/* Animated trace */}
        <motion.path
          d="M 20 0 L 20 20 L 30 30 L 30 40 L 20 50 L 20 60"
          fill="none"
          stroke="hsl(50 100% 50%)"
          strokeWidth="3"
          strokeLinecap="square"
          filter={`url(#mobileGlow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + index * 0.3,
            ease: "easeOut",
          }}
        />
        
        {/* Node point */}
        <motion.circle
          cx="30"
          cy="35"
          r="4"
          fill="hsl(50 100% 50%)"
          filter={`url(#mobileGlow-${index})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.3 }}
        />
      </svg>
    </div>
  );
};

const StepCard = ({
  step,
  index,
  isInView,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Icon container with glow */}
      <motion.div
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-card border border-border flex items-center justify-center mb-4 group"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px hsl(50 100% 50% / 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{step.title}</h3>
      <p className="text-sm md:text-base text-muted-foreground max-w-[200px]">{step.description}</p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

        {/* Horizontal flow on desktop */}
        <div className="hidden md:flex items-center justify-center gap-0 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <StepCard step={step} index={index} isInView={isInView} />
              {index < steps.length - 1 && (
                <PCBConnector index={index} isInView={isInView} />
              )}
            </div>
          ))}
        </div>

        {/* Vertical flow on mobile */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <StepCard step={step} index={index} isInView={isInView} />
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
