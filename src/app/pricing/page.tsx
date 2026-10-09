import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/page/PageHero";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { CornerMark } from "@/components/ui";
import { pricing } from "@/content/pages";

export const metadata: Metadata = pricing.meta;

// Plans are structural only — prices and limits are confirmed at sign-up or with sales.
export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1 bg-bg-secondary">
        <PageHero compact {...pricing.hero} />
        <section className="px-2xl py-[120px]">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-3xl">
            <ul className="grid gap-[10px] lg:grid-cols-3">
              {pricing.plans.map((plan) => (
                <li
                  key={plan.name}
                  className={`flex flex-col gap-3xl p-[36px] ${plan.featured ? "bg-bg-dark text-white" : "bg-white text-bg-dark"}`}
                >
                  <div className="flex flex-col gap-lg">
                    <p className="text-display-xs leading-[28.8px] tracking-[-0.96px]">{plan.name}</p>
                    <p className={`text-md leading-[24px] ${plan.featured ? "text-text-muted" : "text-text-tertiary"}`}>{plan.audience}</p>
                  </div>
                  <ul className={`flex flex-col gap-lg border-t pt-3xl ${plan.featured ? "border-line" : "border-line-dark"}`}>
                    {plan.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-md text-md leading-[24px]">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} color="currentColor" strokeWidth={1.6} className="mt-[3px] shrink-0" aria-hidden />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.cta.href}
                    className={`group mt-auto inline-flex h-[51px] items-center justify-center gap-md text-md font-medium transition-opacity hover:opacity-90 ${
                      plan.featured ? "bg-white text-bg-dark" : "bg-bg-dark text-white"
                    }`}
                  >
                    {plan.cta.label}
                    <CornerMark variant="bare" dark={!plan.featured} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-[19.6px] text-text-tertiary">{pricing.note}</p>
          </div>
        </section>
        <Faq items={pricing.faq} heading="Pricing questions" />
      </main>
      <Footer compact />
    </>
  );
}
