import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        {/* Next: Section 2 — Legal grounding (paper) */}
        <section className="bg-paper text-on-paper">
          <div className="mx-auto max-w-[1200px] px-5 py-28">
            <p className="text-[12px] uppercase tracking-[0.14em] text-muted-paper">Built around the law</p>
            <h2 className="mt-5 max-w-[760px] font-serif text-[44px] leading-[1.05] tracking-[-0.01em] lg:text-[60px]">
              Grounded in legal sources, not just a model.
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}
