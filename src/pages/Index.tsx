import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const PartnershipsSection = lazy(() => import("@/components/PartnershipsSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Pixel-art pattern overlay - matching NFT collection site */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url(/token-bg-pattern.png)',
          backgroundSize: '600px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10">
        <HeroSection />
        <Suspense fallback={null}>
          <HowItWorksSection />
          <PartnershipsSection />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default Index;
