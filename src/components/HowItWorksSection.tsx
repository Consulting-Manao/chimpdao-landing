import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import tshirtMerch from "@/assets/tshirt-merch.png";
import nfcChip from "@/assets/nfc-chip.png";
import chimpLogo from "@/assets/chimp-logo.png";
import PCBTrace from "./PCBTrace";

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

// Hero-style asymmetric branching traces - Left connector
const leftTracePaths = [
  { d: "M 0 30 L 25 30 L 45 18 L 100 18", delay: 0 },
  { d: "M 0 30 L 20 30 L 40 42 L 100 42", delay: 0.05 },
];

const leftTraceNodes = [
  { x: 100, y: 18, r: 3.5, delay: 0.3 },
  { x: 100, y: 42, r: 3.5, delay: 0.35 },
];

const leftTraceJunctions = [
  { x: 0, y: 30, r: 4, delay: 0 },
  { x: 25, y: 30, r: 2.5, delay: 0.08 },
  { x: 45, y: 18, r: 2.5, delay: 0.15 },
  { x: 40, y: 42, r: 2.5, delay: 0.2 },
];

// Hero-style asymmetric branching traces - Right connector (different pattern)
const rightTracePaths = [
  { d: "M 0 25 L 55 25 L 75 12 L 100 12", delay: 0 },
  { d: "M 0 35 L 50 35 L 70 48 L 100 48", delay: 0.05 },
];

const rightTraceNodes = [
  { x: 100, y: 12, r: 3.5, delay: 0.3 },
  { x: 100, y: 48, r: 3.5, delay: 0.35 },
];

const rightTraceJunctions = [
  { x: 0, y: 25, r: 3, delay: 0 },
  { x: 0, y: 35, r: 3, delay: 0.02 },
  { x: 55, y: 25, r: 2.5, delay: 0.1 },
  { x: 75, y: 12, r: 2.5, delay: 0.15 },
  { x: 50, y: 35, r: 2.5, delay: 0.12 },
  { x: 70, y: 48, r: 2.5, delay: 0.18 },
];

// Mobile vertical traces
const mobileLeftTracePaths = [
  { d: "M 22 0 L 22 15 L 12 25 L 12 50", delay: 0 },
  { d: "M 22 0 L 22 18 L 32 28 L 32 50", delay: 0.05 },
];

const mobileLeftTraceNodes = [
  { x: 12, y: 50, r: 3, delay: 0.3 },
  { x: 32, y: 50, r: 3, delay: 0.35 },
];

const mobileLeftTraceJunctions = [
  { x: 22, y: 0, r: 3.5, delay: 0 },
  { x: 12, y: 25, r: 2, delay: 0.12 },
  { x: 32, y: 28, r: 2, delay: 0.15 },
];

const mobileRightTracePaths = [
  { d: "M 14 0 L 14 20 L 8 30 L 8 50", delay: 0 },
  { d: "M 30 0 L 30 22 L 36 32 L 36 50", delay: 0.05 },
];

const mobileRightTraceNodes = [
  { x: 8, y: 50, r: 3, delay: 0.3 },
  { x: 36, y: 50, r: 3, delay: 0.35 },
];

const mobileRightTraceJunctions = [
  { x: 14, y: 0, r: 2.5, delay: 0 },
  { x: 30, y: 0, r: 2.5, delay: 0.02 },
  { x: 8, y: 30, r: 2, delay: 0.15 },
  { x: 36, y: 32, r: 2, delay: 0.18 },
];

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTraces, setActiveTraces] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: false });
  const [rightTraceDelay, setRightTraceDelay] = useState(0);

  // Scroll-triggered initial animation - traces stay illuminated after first view
  useEffect(() => {
    if (isInView && !hasPlayedInitial) {
      setHasPlayedInitial(true);
      setActiveTraces({ left: true, right: true });
      setRightTraceDelay(0.4); // Delay right trace for sequential effect
    }
  }, [isInView, hasPlayedInitial]);

  // Handle icon hover - enhances illumination, returns to default on leave
  const handleHover = (index: number, hovered: boolean) => {
    setHoveredIndex(hovered ? index : null);

    if (!hovered) {
      // Return to default illuminated state (both traces on)
      setActiveTraces({ left: true, right: true });
      setRightTraceDelay(0);
      return;
    }

    if (index === 0) {
      // T-shirt: illuminate left trace only
      setActiveTraces({ left: true, right: false });
      setRightTraceDelay(0);
    } else if (index === 1) {
      // Tap Phone: illuminate BOTH traces (it's in the middle)
      setActiveTraces({ left: true, right: true });
      setRightTraceDelay(0);
    } else if (index === 2) {
      // Monkey: illuminate both traces in sequence
      setActiveTraces({ left: true, right: true });
      setRightTraceDelay(0.4);
    }
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative" id="how-it-works">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
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

        {/* Desktop layout */}
        <div className="hidden md:block max-w-5xl mx-auto">
          {/* Row 1: Icons + Traces */}
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                {/* Icon with zoom hover */}
                <motion.div
                  className="w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain transition-all duration-300 hover:scale-110"
                    style={{
                      filter: hoveredIndex === index 
                        ? "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))" 
                        : "none",
                    }}
                  />
                </motion.div>

                {/* Trace connector */}
                {index < steps.length - 1 && (
                  <div className="w-32 lg:w-40 flex-shrink-0 self-center h-16">
                    <PCBTrace
                      paths={index === 0 ? leftTracePaths : rightTracePaths}
                      nodes={index === 0 ? leftTraceNodes : rightTraceNodes}
                      junctionNodes={index === 0 ? leftTraceJunctions : rightTraceJunctions}
                      isActive={index === 0 ? activeTraces.left : activeTraces.right}
                      baseDelay={index === 0 ? 0 : rightTraceDelay}
                      filterId={`traceGlow-${index}`}
                      className="w-full h-full"
                    />
                  </div>
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

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              {/* Icon with zoom */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div
                  className="relative w-20 h-20 flex items-center justify-center mb-4 cursor-pointer"
                  onTouchStart={() => handleHover(index, true)}
                  onTouchEnd={() => handleHover(index, false)}
                  whileTap={{ scale: 1.12 }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-16 h-16 object-contain transition-all duration-300"
                    style={{
                      filter: hoveredIndex === index 
                        ? "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))" 
                        : "none",
                    }}
                  />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[180px]">{step.description}</p>
              </motion.div>

              {/* Mobile trace connector */}
              {index < steps.length - 1 && (
                <div className="h-14 my-2 w-11">
                  <PCBTrace
                    paths={index === 0 ? mobileLeftTracePaths : mobileRightTracePaths}
                    nodes={index === 0 ? mobileLeftTraceNodes : mobileRightTraceNodes}
                    junctionNodes={index === 0 ? mobileLeftTraceJunctions : mobileRightTraceJunctions}
                    isActive={index === 0 ? activeTraces.left : activeTraces.right}
                    baseDelay={index === 0 ? 0 : rightTraceDelay}
                    viewBox="0 0 44 50"
                    filterId={`mobileTraceGlow-${index}`}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
