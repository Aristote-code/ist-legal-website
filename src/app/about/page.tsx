import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page/PageHero";
import { Statement, WhoFor } from "@/components/page/sections";
import { Footer } from "@/components/sections/Footer";
import { RevealHeading, SectionLabel } from "@/components/ui";
import { about, CONTACT_EMAIL } from "@/content/pages";

export const metadata: Metadata = about.meta;

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1 bg-bg-secondary">
        <PageHero {...about.hero} primary={{ label: "Book a Demo", href: "/book-a-demo" }} secondary={{ label: "Explore the Platform", href: "/platform" }} />
        <Statement data={about.statement} />
        <section className="px-2xl pb-[120px]">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-[80px]">
            <div className="flex flex-col gap-3xl">
              <SectionLabel>Our principles</SectionLabel>
              <RevealHeading text="Built around four commitments" className="max-w-[744px]" />
            </div>
            <ul className="grid gap-x-[60px] gap-y-[80px] sm:grid-cols-2 lg:grid-cols-4">
              {about.principles.map((p) => (
                <li key={p.title} className="flex flex-col gap-[44px]">
                  <span className="text-bg-dark">
                    <Icon name={p.icon} />
                  </span>
                  <span className="flex flex-col gap-xl">
                    <span className="text-xl leading-[24px] tracking-[-0.4px] text-bg-dark">{p.title}</span>
                    <span className="text-md leading-[24px] text-text-tertiary">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <WhoFor
          data={{
            label: "Contact",
            heading: "Talk to the team behind IST Legal",
            body: `Questions about the platform, partnerships or access for your organization? Book a demo or email ${CONTACT_EMAIL}.`,
            cta: { label: "Book a Demo", href: "/book-a-demo" },
          }}
        />
      </main>
      <Footer compact />
    </>
  );
}
