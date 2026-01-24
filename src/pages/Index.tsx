import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Suspense fallback={null}>
        <HowItWorksSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
