"use client";

// Footer. Layout from Figma (6:1601): dark photo background, CTA heading + paragraph,
// "Sign up for updates" bar with a white tile, white link panel, logo + copyright.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { footer } from "@/content/site";
import { Logo } from "../Logo";
import { ActionTile, RevealHeading, SectionLabel } from "../ui";

export function Footer() {
  // No mailing list exists yet, so the form says so instead of pretending to subscribe.
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative isolate overflow-hidden bg-bg-dark px-2xl pb-[60px] pt-[200px] lg:pt-[400px]">
      <Image src={footer.image} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-60 blur-[2px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-dark/60 via-bg-dark/70 to-bg-dark" />

      <div className="mx-auto flex max-w-[1200px] flex-col gap-[50px]">
        <div className="flex flex-col gap-3xl lg:flex-row lg:items-end">
          <div className="flex flex-col gap-[10px] lg:flex-[696_0_0]">
            <SectionLabel light>{footer.label}</SectionLabel>
            <RevealHeading text={footer.heading} light className="max-w-[640px]" />
          </div>
          <p className="max-w-[480px] text-lg leading-[25.2px] text-text-muted lg:flex-[480_0_0]">{footer.body}</p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px] md:flex-row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-2xl bg-bg-secondary px-xl py-xl md:flex-1 md:flex-row md:gap-5xl md:px-4xl"
            >
              <label htmlFor="footer-email" className="shrink-0 text-xl leading-[24px] tracking-[-0.4px] text-bg-dark md:pt-[10px]">
                {footer.updates.title}
              </label>
              <div className="flex flex-1 flex-col gap-md">
                <div className="relative">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="name@email.com"
                    className="h-[61px] w-full bg-white py-2xl pl-2xl pr-[140px] text-md text-bg-dark outline-none placeholder:text-text-tertiary focus-visible:outline-2 focus-visible:outline-bg-dark"
                  />
                  <button
                    type="submit"
                    className="absolute right-[5px] top-[5px] h-[51px] w-[120px] bg-bg-dark text-md font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-sm leading-[19.6px] text-text-tertiary" role="status">
                  {submitted ? footer.updates.note : (
                    <>
                      By subscribing you agree to our{" "}
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
            </form>
            <ActionTile href={footer.cta.href} title={footer.cta.label} className="min-h-[120px] md:w-[236px]" />
          </div>

          <div className="grid bg-white lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-2xl p-4xl">
              <p className="text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-bg-dark">Contact</p>
              <div className="flex flex-col gap-lg text-sm leading-[19.6px] text-text-tertiary">
                <a href={`mailto:${footer.contact.email}`} className="hover:text-bg-dark">
                  {footer.contact.email}
                </a>
                <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="hover:text-bg-dark">
                  {footer.contact.phone}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[48px] border-t border-line-dark p-4xl sm:grid-cols-3 lg:border-l lg:border-t-0">
              {footer.columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-2xl">
                  <p className="text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-bg-dark">{col.title}</p>
                  <ul className="flex flex-col gap-lg">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="text-sm leading-[19.6px] text-text-tertiary transition-colors hover:text-bg-dark">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-xl pt-[10px] sm:flex-row sm:items-center sm:gap-[30px]">
          <Link href="/" aria-label="IST Legal home" className="group">
            <Logo height={30} />
          </Link>
          <p className="text-sm leading-[19.6px] text-text-muted sm:flex-1">{footer.copyright}</p>
          <ul className="flex gap-2xl">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm leading-[19.6px] text-white transition-opacity hover:opacity-70">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
