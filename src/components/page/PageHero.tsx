// Inner-page hero — Elyte service-page hero: dark full-bleed still, headline low-left,
// two CTAs, hairline below. Shares the home hero's grading and grain.
import Image from "next/image";
import Link from "next/link";
import type { Cta } from "@/content/pages";
import { SectionLabel } from "../ui";

export function PageHero({
  label,
  title,
  body,
  primary,
  secondary,
  image,
  compact = false,
}: {
  label: string;
  title: string;
  body: string;
  primary?: Cta;
  secondary?: Cta;
  image: string;
  compact?: boolean;
}) {
  const words = title.split(" ");
  return (
    <section
      className={`relative isolate flex overflow-hidden bg-bg-dark ${compact ? "min-h-[560px] lg:min-h-[620px]" : "min-h-[640px] lg:h-[86svh] lg:max-h-[900px]"}`}
    >
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill preload sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-bg-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_80%,rgba(8,16,20,0.9)_0%,rgba(8,16,20,0.55)_45%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-bg-dark" />
        <div className="hero-noise absolute inset-0" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-end px-2xl pb-[60px] pt-[140px]">
        <div className="flex flex-col gap-2xl border-b border-line pb-[48px]">
          <SectionLabel light>{label}</SectionLabel>
          <h1 className="max-w-[860px] text-[42px] font-normal leading-[1.08] tracking-[-0.055em] text-white sm:text-[54px] lg:text-[64px]">
            {words.map((w, i) => (
              <span key={i}>
                <span className="word-in" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                  {w}
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="max-w-[560px] text-lg leading-[25.2px] text-text-muted">{body}</p>
          {(primary || secondary) && (
            <div className="mt-md flex flex-wrap items-center gap-2xl">
              {primary && (
                <Link
                  href={primary.href}
                  className="flex h-[50.4px] min-w-[155px] items-center justify-center bg-white px-2xl text-md font-medium leading-[22.4px] text-bg-dark transition-opacity hover:opacity-90"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="flex h-[50.4px] items-center justify-center border border-line px-2xl text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
