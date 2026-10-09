// Inner-page sections, following the Elyte service page: statement + deliverable chips,
// feature list with product scene, "How it works" step rows on a white panel, full-width
// image band with glass card, and a "who this is for" close.
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import type { Cta, DetailPage } from "@/content/pages";
import { SceneFrame } from "../PlatformShowcase";
import { ActionTile, CornerMark, RevealHeading, SectionLabel } from "../ui";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function DarkButton({ cta }: { cta: Cta }) {
  return (
    <Link
      href={cta.href}
      className="group inline-flex h-[51px] items-center justify-center gap-md self-start bg-bg-dark px-2xl text-md font-medium text-white transition-opacity hover:opacity-90"
    >
      {cta.label}
      <CornerMark variant="bare" dark />
    </Link>
  );
}

/** Large statement paragraph with optional "deliverables" chips (Elyte: The problem we solve). */
export function Statement({ data }: { data: DetailPage["statement"] }) {
  return (
    <section className="bg-bg-secondary px-2xl pb-[100px] pt-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-3xl">
        <SectionLabel>{data.label}</SectionLabel>
        <p className="max-w-[1040px] text-[28px] leading-[1.25] tracking-[-0.04em] text-bg-dark lg:text-[40px] lg:leading-[1.2]">{data.text}</p>
        {data.chips && (
          <div className="flex flex-col gap-xl pt-3xl">
            {data.chipsLabel && <p className="text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-bg-dark">{data.chipsLabel}</p>}
            <ul className="flex flex-wrap gap-md">
              {data.chips.map((c) => (
                <li key={c} className="rounded-full border border-line-dark px-lg py-sm text-sm leading-[19.6px] text-bg-dark">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        <span className="mt-[60px] h-px w-full bg-line-dark" />
      </div>
    </section>
  );
}

/** Numbered feature list beside a product scene (Figma Pillars, static). */
export function FeatureBlock({ data }: { data: NonNullable<DetailPage["feature"]> }) {
  return (
    <section className="bg-bg-secondary px-2xl pb-[120px]">
      <div className="mx-auto grid max-w-[1160px] items-center gap-[60px] lg:grid-cols-2 lg:gap-5xl">
        <div className="flex flex-col gap-[44px]">
          <div className="flex flex-col gap-3xl">
            <SectionLabel>{data.label}</SectionLabel>
            <RevealHeading text={data.heading} className="max-w-[560px]" />
          </div>
          <ol className="flex flex-col gap-3xl">
            {data.items.map((item, i) => (
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
        </div>
        {data.scene ? (
          <SceneFrame features={[{ scene: data.scene, caption: data.caption.title, tag: data.caption.tag }]} />
        ) : data.image ? (
          <div className="relative aspect-[560/565] w-full overflow-hidden bg-bg-dark">
            <Image src={data.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** "How it works" — step rows on a white panel (Elyte service page). */
export function StepsPanel({ data }: { data: NonNullable<DetailPage["steps"]> }) {
  return (
    <section className="bg-bg-secondary px-2xl pb-[120px]">
      <div className="mx-auto max-w-[1160px] bg-white px-xl py-[60px] sm:px-[48px] lg:px-[80px] lg:py-[80px]">
        <RevealHeading text={data.heading} className="mb-[48px]" />
        <ol>
          {data.items.map((step, i) => (
            <li key={step.title} className="grid gap-md border-b border-line-dark py-3xl sm:grid-cols-[120px_1fr] lg:grid-cols-[140px_1fr_1.3fr] lg:items-start lg:gap-4xl">
              <span className="justify-self-start self-start whitespace-nowrap rounded-full border border-line-dark px-lg py-xs text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-bg-dark">
                Step {i + 1}
              </span>
              <span className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-bg-dark">{step.title}</span>
              <span className="text-md leading-[24px] text-text-tertiary sm:col-start-2 lg:col-start-auto">{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Full-width still with a glass card listing outcomes and a white arrow tile. */
export function ImageBand({ data }: { data: NonNullable<DetailPage["band"]> }) {
  return (
    <section className="bg-bg-secondary px-2xl pb-[120px]">
      <div className="relative mx-auto min-h-[600px] max-w-[1160px] overflow-hidden bg-bg-dark lg:min-h-[720px]">
        <Image src={data.image} alt="" fill sizes="(min-width: 1200px) 1160px, 100vw" className="object-cover" />
        <div className="relative flex min-h-[inherit] items-end bg-gradient-to-r from-bg-dark/85 via-bg-dark/40 to-transparent p-lg">
          <div className="flex w-full max-w-[482px] flex-col gap-3xl border border-white/8 bg-[rgba(8,16,20,0.12)] p-[28px] backdrop-blur-[5px] sm:p-[36px]">
            <SectionLabel light>{data.label}</SectionLabel>
            <h3 className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">{data.heading}</h3>
            <ul className="flex flex-col gap-lg">
              {data.items.map((item) => (
                <li key={item} className="flex items-start gap-md text-md leading-[24px] text-text-muted">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} color="currentColor" strokeWidth={1.6} className="mt-[3px] shrink-0 text-white" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ActionTile href={data.cta.href} title={data.cta.label} className="absolute right-lg top-lg h-[130px] w-[236px] max-sm:hidden" />
      </div>
    </section>
  );
}

/** Closing "who this is for" block. */
export function WhoFor({ data }: { data: NonNullable<DetailPage["who"]> }) {
  return (
    <section className="bg-bg-secondary px-2xl pb-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-3xl">
        <SectionLabel>{data.label}</SectionLabel>
        <RevealHeading text={data.heading} className="max-w-[860px]" />
        <p className="max-w-[720px] text-lg leading-[25.2px] text-text-tertiary">{data.body}</p>
        <DarkButton cta={data.cta} />
      </div>
    </section>
  );
}
