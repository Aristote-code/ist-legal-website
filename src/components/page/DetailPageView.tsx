// Renders a data-driven inner page (product, solution or assurance) in the Elyte
// service-page order. Optional sections are skipped when the data omits them.
import type { DetailPage } from "@/content/pages";
import { Navigation } from "../Navigation";
import { Faq } from "../sections/Faq";
import { Footer } from "../sections/Footer";
import { WorkflowTools } from "../sections/WorkflowTools";
import { PageHero } from "./PageHero";
import { FeatureBlock, ImageBand, Statement, StepsPanel, WhoFor } from "./sections";

export function DetailPageView({ page }: { page: DetailPage }) {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-bg-secondary">
        <PageHero {...page.hero} />
        <Statement data={page.statement} />
        {page.feature && <FeatureBlock data={page.feature} />}
        {page.steps && <StepsPanel data={page.steps} />}
        {page.tools && (
          <div className="pb-[120px]">
            <WorkflowTools />
          </div>
        )}
        {page.band && <ImageBand data={page.band} />}
        {page.who && <WhoFor data={page.who} />}
        {page.faq && <Faq items={page.faq} heading="Questions you're probably asking" />}
      </main>
      <Footer />
    </>
  );
}
