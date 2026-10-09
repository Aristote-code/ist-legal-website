import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page/PageHero";
import { WhoFor } from "@/components/page/sections";
import { Footer } from "@/components/sections/Footer";
import { resources } from "@/content/pages";

export const metadata: Metadata = resources.meta;

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1 bg-bg-secondary">
        <PageHero compact {...resources.hero} />
        <section className="px-2xl py-[120px]">
          <ul className="mx-auto grid max-w-[1160px] gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
            {resources.cards.map((card) => (
              <li key={card.title} className="flex min-h-[280px] flex-col justify-between gap-[44px] bg-white p-[36px]">
                <span className="text-bg-dark">
                  <Icon name={card.icon} />
                </span>
                <span className="flex flex-col gap-lg">
                  <span className="text-xl leading-[24px] tracking-[-0.4px] text-bg-dark">{card.title}</span>
                  <span className="text-md leading-[24px] text-text-tertiary">{card.body}</span>
                  <span className="mt-sm self-start rounded-full border border-line-dark px-lg py-xs text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-text-tertiary">
                    {resources.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <WhoFor
          data={{
            label: "Need help now?",
            heading: "Talk to the IST Legal team",
            body: "While the guides are being written, our team can walk you through research, documents and workflows in IST Legal.",
            cta: { label: "Book a Demo", href: "/book-a-demo" },
          }}
        />
      </main>
      <Footer compact />
    </>
  );
}
