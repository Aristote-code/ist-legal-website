"use client";

// Section 9 — FAQ. Layout from Figma (6:1498): heading + white contact tile on the
// left, accordion with plus/minus on the right (open item has a dark rule).
import { useState } from "react";
import { faq } from "@/content/site";
import { ActionTile, RevealHeading, SectionLabel } from "../ui";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block size-[24px] shrink-0">
      <span className="absolute left-[4px] top-[11px] h-[2px] w-[16px] rounded-[10px] bg-text-tertiary" />
      <span
        className={`absolute left-[11px] top-[4px] h-[16px] w-[2px] rounded-[10px] bg-text-tertiary transition-transform duration-300 ${open ? "scale-y-0" : ""}`}
      />
    </span>
  );
}

export function Faq({
  items = faq.items,
  label = faq.label,
  heading = faq.heading,
}: {
  items?: readonly { q: string; a: string }[];
  label?: string;
  heading?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-heading" className="bg-bg-secondary px-2xl pb-[120px] pt-[112px] lg:pb-11xl">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-[60px] lg:flex-row lg:items-stretch lg:gap-[112px]">
        <div className="flex flex-col justify-between gap-[60px] lg:max-w-[494px] lg:flex-[494_0_0]">
          <div className="flex flex-col gap-3xl">
            <SectionLabel>{label}</SectionLabel>
            <div id="faq-heading">
              <RevealHeading text={heading} className="max-w-[494px]" />
            </div>
          </div>
          <ActionTile href={faq.contact.href} title={faq.contact.title} body={faq.contact.body} className="h-[150px] w-full p-2xl" />
        </div>

        <ul className="flex flex-col gap-[34px] lg:flex-[554_0_0]">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`border-b pb-4xl transition-colors duration-500 ${isOpen ? "border-bg-dark" : "border-line-dark"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-[10px] text-left"
                >
                  <span className={`text-xl leading-[24px] tracking-[-0.4px] transition-colors ${isOpen ? "text-bg-dark" : "text-text-tertiary"}`}>
                    {item.q}
                  </span>
                  <PlusMinus open={isOpen} />
                </button>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden text-md leading-[24px] text-text-tertiary">
                    <span className="block pt-[22px]">{item.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
