import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <Hero />
        <LogoStrip />
        {/* Next section (light grey, as on the Figma page) — content coming next */}
        <section aria-hidden className="h-[160px] bg-bg-secondary" />
      </main>
    </>
  );
}
