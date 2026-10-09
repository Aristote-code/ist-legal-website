import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/page/PageHero";
import { Footer } from "@/components/sections/Footer";
import { CONTACT_EMAIL } from "@/content/pages";

export const metadata: Metadata = { title: "Terms & Conditions | IST Legal", description: "The terms that apply to using IST Legal." };

// We don't write legal policy text — this page says so instead of inventing wording.
export default function Page() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <PageHero compact label="Terms" title="Terms & Conditions" body="The terms that apply to using IST Legal." image="/media/stills/footer.jpg" />
        <section className="px-2xl py-[120px]">
          <div className="mx-auto flex max-w-[760px] flex-col gap-2xl text-lg leading-[28px] text-text-tertiary">
            <p className="text-[28px] leading-[1.25] tracking-[-0.04em] text-bg-dark">Our terms and conditions for the new IST Legal website is being finalised.</p>
            <p>
              Until it is published here, please contact us with any questions at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-bg-dark underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
