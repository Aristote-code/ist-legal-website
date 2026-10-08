import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Navigation } from "@/components/Navigation";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { Assurance } from "@/components/sections/Assurance";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Solutions } from "@/components/sections/Solutions";
import { WorkflowTools } from "@/components/sections/WorkflowTools";

// Homepage — section order follows the Figma page (6:548), adapted to IST Legal.
// Figma's testimonials section is intentionally omitted until real quotes exist.
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <Hero />
        <LogoStrip />
        <PlatformShowcase />
        <Solutions />
        <WorkflowTools />
        <Assurance />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
