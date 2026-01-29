import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ElectricTraces from "./ElectricTraces";
import chimpLogo from "@/assets/chimp-logo.png";
import iconShop from "@/assets/icon-group-25.png";
import iconNft from "@/assets/icon-group-27.png";
import appStoreBadge from "@/assets/app-store-badge.svg";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo with PCB electric traces */}
          <motion.div
            className="relative mb-20 md:mb-24"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* PCB traces emanating from logo */}
              <ElectricTraces className="scale-[1.4] md:scale-[1.6] lg:scale-[1.8]" isActive={isInView} />

              {/* Main chimp logo with scale pulse animation (synced with traces) */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.12, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={chimpLogo}
                  alt="ChimpDAO"
                  width={128}
                  height={128}
                  loading="eager"
                  fetchPriority="high"
                  className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-foreground">Connecting </span>
            <span className="text-primary text-glow">Physical Merch</span>
            <br />
            <span className="text-foreground">to </span>
            <span className="text-primary text-glow">Digital Ownership</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            NFC-powered NFTs on <span className="text-foreground font-semibold">Stellar</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              className="h-[60px] px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 electric-glow-hover transition-all duration-300"
            >
              <a
                href="https://shop.chimpdao.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5"
              >
                <img src={iconShop} alt="" className="w-[34px] h-[34px] object-contain" />
                <span className="text-[19px] font-medium">Shop Merch</span>
              </a>
            </Button>

            <Button
              asChild
              className="h-[60px] px-4 rounded-xl bg-[hsl(270_100%_60%/0.2)] text-[hsl(270_100%_70%)] border border-[hsl(270_100%_60%/0.4)] hover:bg-[hsl(270_100%_60%/0.28)] hover:border-[hsl(270_100%_60%/0.55)] transition-all duration-300"
            >
              <a
                href="https://nft.chimpdao.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5"
              >
                <img src={iconNft} alt="" className="w-[34px] h-[34px] object-contain" />
                <span className="text-[19px] font-medium">NFT Collection</span>
              </a>
            </Button>
          </motion.div>

          {/* App Store Badge */}
          <motion.a
            href="https://apps.apple.com/us/app/chimpdao/id6757618362?itscg=30200&itsct=apps_box_badge&mttnsubad=6757618362"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center hover:opacity-80 transition-opacity"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img src={appStoreBadge} alt="Download on the App Store" className="h-[60px]" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
