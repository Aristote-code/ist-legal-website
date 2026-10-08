"use client";

// Section 7 — how it works. Layout from Figma "Our approach" (6:1278): portrait image
// with a white tile on the left; heading and a numbered accordion on the right.
import Image from "next/image";
import { useState } from "react";
import { howItWorks } from "@/content/site";
import { ActionTile, RevealHeading, SectionLabel } from "../ui";

export function HowItWorks() {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby="how-heading" className="bg-bg-secondary px-2xl py-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col-reverse items-center gap-[60px] lg:flex-row">
        <div className="relative aspect-[550/728] w-full max-w-[550px] overflow-clip bg-bg-dark lg:flex-[550_0_0]">
          <Image src={howItWorks.image} alt="" fill sizes="(min-width: 1024px) 550px, 100vw" className="object-cover object-[60%_center]" />
          <ActionTile href={howItWorks.cta.href} title={howItWorks.cta.label} className="absolute bottom-lg left-lg h-[130px] w-[236px]" />
        </div>

        <div className="flex w-full flex-col gap-[80px] lg:flex-[550_0_0] lg:gap-11xl">
          <div className="flex flex-col gap-3xl">
            <SectionLabel>{howItWorks.label}</SectionLabel>
            <div id="how-heading">
              <RevealHeading text={howItWorks.heading} className="max-w-[550px]" />
            </div>
          </div>

          <ol className="flex flex-col gap-3xl">
            {howItWorks.steps.map((step, i) => {
              const isOpen = i === open;
              return (
                <li key={step.title} className={`border-b pb-3xl transition-colors duration-500 ${isOpen ? "border-bg-dark" : "border-line-dark"}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`step-${i}`}
                    onClick={() => setOpen(i)}
                    className="flex w-full items-center justify-between gap-[10px] text-left"
                  >
                    <span className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-bg-dark">{step.title}</span>
                    <span className="text-lg leading-[25.2px] text-bg-dark">{i + 1}</span>
                  </button>
                  <div
                    id={`step-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden text-md leading-[24px] text-text-tertiary">
                      <span className="block pt-lg">{step.body}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
