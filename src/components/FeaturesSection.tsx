import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link2, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Physical + Digital",
    description:
      "Bridge the gap between tangible merchandise and blockchain-verified digital ownership. Every item tells a story.",
  },
  {
    icon: Zap,
    title: "Powered by Stellar",
    description:
      "Built on Soroban smart contracts for lightning-fast, low-cost transactions that scale with your collection.",
  },
  {
    icon: Shield,
    title: "Tamper-Proof",
    description:
      "NFC chips provide cryptographic verification that can never be duplicated or falsified. Authenticity guaranteed.",
  },
  {
    icon: Users,
    title: "Community Funded",
    description:
      "Proudly supported by the Stellar Community Fund, building the future of physical-digital experiences.",
    hasBadge: true,
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 40px hsl(50 100% 50% / 0.15)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* SCF Badge for Community Funded card */}
        {feature.hasBadge && (
          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <span className="text-sm font-medium text-foreground">
              Stellar Community Fund
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" id="features">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">Why</span> ChimpDAO?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're building the infrastructure for the next generation of
            physical-digital experiences.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
