import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <LogoStrip />
      </main>
    </>
  );
}
