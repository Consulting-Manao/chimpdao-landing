import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ShoppingBag, Smartphone, Sparkles } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "Buy NFC-Enabled Merch",
    description:
      "Purchase exclusive ChimpDAO merchandise with embedded NFC chips that link to unique digital assets.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Tap with Your Phone",
    description:
      "Simply tap your phone on the NFC chip embedded in your merch to activate the digital connection.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Reveal Your NFT",
    description:
      "Instantly access and claim your exclusive NFT on the Stellar blockchain, proving your ownership.",
  },
];

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Connecting line for non-last items */}
      {index < steps.length - 1 && (
        <motion.div
          className="hidden md:block absolute top-16 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}

      {/* Number badge */}
      <motion.span
        className="text-primary/30 text-7xl font-bold absolute -top-4 -left-4 md:left-auto md:-top-8 select-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.4, delay: index * 0.2 }}
      >
        {step.number}
      </motion.span>

      {/* Icon container */}
      <motion.div
        className="relative z-10 w-32 h-32 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 group"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px hsl(50 100% 50% / 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
      <p className="text-muted-foreground max-w-xs">{step.description}</p>
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
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">How</span> It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to connect your physical merchandise with
            blockchain-verified digital ownership.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
