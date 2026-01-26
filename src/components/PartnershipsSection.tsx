import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const silverbackOptions = [
  {
    name: "Full Service",
    description: "We design & handle everything",
    value: "20% revenue or 10% units",
  },
  {
    name: "Partner-Designed",
    description: "You design, we execute",
    value: "25% revenue or 15% units",
  },
  {
    name: "Curated Edition",
    description: "Artist-designed limited drops",
    value: "15% of net sales",
  },
];

const bonoboFeatures = ["Production & sourcing by Chi//mp", "Optional design service", "Delivered to your destination"];

const corePrinciples = ["Premium materials", "Transparent costs", "Professional fulfillment", "NFC + NFT integration"];

const PartnershipsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative" id="partnerships">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">Partner</span> With Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Premium merch drops, designed for the Stellar ecosystem
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {/* Silverback - Public Drops */}
          <motion.div
            className="relative rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm p-6 md:p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.6)" }}
            style={{
              boxShadow: "0 0 40px -10px hsl(var(--primary) / 0.15)",
            }}
          >
            {/* Highlighted badge */}
            <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-1">Silverback</h3>
              <p className="text-primary font-medium">Public Drops</p>
              <p className="text-sm text-muted-foreground mt-2">Sold on the Chi//mp Shop</p>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Choose your collaboration model:</p>

            <div className="space-y-4">
              {silverbackOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <span className="text-xs text-primary font-medium whitespace-nowrap bg-primary/10 px-2 py-1 rounded">
                      {option.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bonobo - Private Collection */}
          <motion.div
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--border) / 0.8)" }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-1">Bonobo</h3>
              <p className="text-muted-foreground font-medium">Private Collection</p>
              <p className="text-sm text-muted-foreground mt-2">B2B / Events / Internal Use</p>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Your merch, your usage</p>

            <div className="space-y-3 mb-6">
              {bonoboFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Fixed pricing based on:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Quantities</li>
                <li>• Materials & finishing</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Core Principles */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {corePrinciples.map((principle, index) => (
            <div key={principle} className="flex items-center gap-2 text-sm text-muted-foreground">
              {index > 0 && <span className="hidden md:inline text-border">|</span>}
              <span>{principle}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="mailto:legal@consulting-manao.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
          >
            Let's Collaborate
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
