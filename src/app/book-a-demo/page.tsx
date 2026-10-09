import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { BookDemoForm } from "@/components/page/BookDemoForm";
import { PageHero } from "@/components/page/PageHero";
import { Footer } from "@/components/sections/Footer";
import { SectionLabel } from "@/components/ui";
import { bookDemoPage, CONTACT_EMAIL } from "@/content/pages";

export const metadata: Metadata = bookDemoPage.meta;

const ROMAN = ["I", "II", "III"];

export default function BookDemoPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <PageHero compact {...bookDemoPage.hero} />
        <section className="px-2xl py-[120px]">
          <div className="mx-auto grid max-w-[1160px] gap-[60px] lg:grid-cols-[380px_1fr] lg:gap-[80px]">
            <div className="flex flex-col gap-[44px]">
              <SectionLabel>What to expect</SectionLabel>
              <ol className="flex flex-col gap-3xl">
                {bookDemoPage.expect.map((item, i) => (
                  <li key={item.title} className="flex gap-2xl">
                    <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full border border-line-dark text-sm text-bg-dark">
                      {ROMAN[i]}
                    </span>
                    <span className="flex flex-col gap-sm pt-[6px]">
                      <span className="text-xl leading-[24px] tracking-[-0.4px] text-bg-dark">{item.title}</span>
                      <span className="text-md leading-[24px] text-text-tertiary">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-line-dark pt-3xl text-md leading-[24px] text-text-tertiary">
                Prefer email?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-bg-dark underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <BookDemoForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
