import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ElectricTraces from "./ElectricTraces";
import PixelArrow from "./PixelArrow";
import chimpLogo from "@/assets/chimp-logo.png";
import iconShop from "@/assets/icon-group-25.png";
import iconNft from "@/assets/icon-group-27.png";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
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
                animate={isInView ? { 
                  scale: [1, 1.12, 1],
                } : {}}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={chimpLogo}
                  alt="ChimpDAO"
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
            NFC-powered NFTs on{" "}
            <span className="text-foreground font-semibold">Stellar</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 electric-glow-hover transition-all duration-300"
            >
              <a
                href="https://shop.chimpdao.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <img src={iconShop} alt="" className="w-6 h-6 object-contain" />
                Shop Merch
                <PixelArrow className="w-4 h-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary/50 hover:border-primary/80 hover:shadow-[0_0_20px_hsl(50_100%_50%/0.2)] transition-all duration-300"
            >
              <a
                href="https://nft.chimpdao.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <img src={iconNft} alt="" className="w-6 h-6 object-contain" />
                View NFT Gallery
                <PixelArrow className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* App Store Badge */}
          <motion.a
            href="https://apps.apple.com/app/chimpdao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
              alt="Download on the App Store"
              className="h-14"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
