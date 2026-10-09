import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/page/PageHero";
import { Statement } from "@/components/page/sections";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { Assurance } from "@/components/sections/Assurance";
import { Footer } from "@/components/sections/Footer";
import { WorkflowTools } from "@/components/sections/WorkflowTools";
import { platformOverview } from "@/content/pages";

export const metadata: Metadata = platformOverview.meta;

export default function PlatformPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <PageHero {...platformOverview.hero} />
        <PlatformShowcase />
        <Statement data={{ ...platformOverview.jurisdiction, chips: undefined }} />
        <WorkflowTools />
        <Assurance />
      </main>
      <Footer />
    </>
  );
}
