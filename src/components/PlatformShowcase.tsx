"use client";

// Section 3 — platform walkthrough. Layout from Figma "Pillars" (6:815): Roman-numeral
// list on the left, one dark framed visual on the right. On desktop the pair pins
// while you scroll and each step activates the next feature; its product scene
// cross-fades in. On mobile each feature is followed by its scene.
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { platform } from "@/content/site";
import { Icon, type IconName } from "./icons";
import { scenes, type SceneName } from "./scenes";
import { CornerMark, RevealHeading, SectionLabel } from "./ui";

const STEP_VH = 70; // scroll distance per feature

const captionIcon: Record<SceneName, IconName> = {
  assistant: "assistant",
  categories: "caseLaw",
  citations: "verification",
  draft: "contract",
  intake: "workflow",
  research: "research",
  caseLaw: "caseLaw",
  legislation: "legislation",
  contract: "contract",
  matters: "workflow",
};

type Feature = (typeof platform.features)[number];
export type SceneItem = { scene: SceneName; caption: string; tag: string; href?: string };

/**
 * A live product demo: the app window sits straight on the page (no dark frame),
 * with its caption and a progress line underneath. Several scenes can share one
 * frame — they cross-fade and only the active one plays.
 */
export function SceneFrame({ features, active = 0, tone = "light" }: { features: readonly SceneItem[]; active?: number; tone?: "light" | "dark" }) {
  const [progress, setProgress] = useState({ s: 0, total: 1 });
  const current = features[active];
  const dark = tone === "dark";

  return (
    <figure className="flex w-full flex-col gap-xl">
      <div className="relative">
        {/* Soft brand glow behind the window */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 -bottom-[10%] lg:-inset-x-[6%] top-[8%] -z-0 rounded-[40px] blur-3xl ${
            dark ? "bg-[radial-gradient(closest-side,rgba(78,51,217,0.35),transparent)]" : "bg-[radial-gradient(closest-side,rgba(78,51,217,0.14),transparent)]"
          }`}
        />
        <div
          className={`relative grid p-[6px] ${
            dark
              ? "bg-white/[0.07] ring-1 ring-white/12 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
              : "bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(8,16,20,0.04),0_30px_70px_-28px_rgba(8,16,20,0.35)]"
          }`}
        >
          {features.map((f, i) => {
            const Scene = scenes[f.scene];
            const on = i === active;
            return (
              <div
                key={f.scene}
                aria-hidden={!on}
                className={`scene-layer overflow-hidden [grid-area:1/1] transition-[opacity,translate,scale] duration-700 ease-out ${
                  on ? "opacity-100" : i < active ? "-translate-y-2 scale-[0.98] opacity-0" : "translate-y-3 scale-[0.98] opacity-0"
                }`}
              >
                <Scene active={on} label={`${f.caption} — animated walkthrough of the IST Legal app`} onProgress={on ? setProgress : undefined} />
              </div>
            );
          })}
        </div>
      </div>
      <Caption item={current} dark={dark} progress={progress} />
    </figure>
  );
}

function Caption({ item, dark, progress }: { item: SceneItem; dark: boolean; progress: { s: number; total: number } }) {
  const pct = ((progress.s + 1) / progress.total) * 100;
  const inner = (
    <>
      <span
        className={`flex size-[44px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-white" : "bg-white text-bg-dark ring-1 ring-line-dark"}`}
      >
        <Icon name={captionIcon[item.scene]} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <span key={item.caption} className={`demo-swap truncate text-lg leading-[22px] tracking-[-0.3px] ${dark ? "text-white" : "text-bg-dark"}`}>
          {item.caption}
        </span>
        <span className={`text-xs font-medium uppercase leading-[16.8px] tracking-[0.72px] sm:truncate ${dark ? "text-text-muted" : "text-text-tertiary"}`}>{item.tag}</span>
      </span>
      {item.href && (
        <span className="hidden shrink-0 items-center gap-[10px] sm:flex">
          <span className={`text-md font-medium leading-[22.4px] ${dark ? "text-white" : "text-bg-dark"}`}>Explore</span>
          <CornerMark variant="bare" dark={dark} />
        </span>
      )}
    </>
  );
  const cls = "flex items-center gap-xl";
  return (
    <figcaption className="flex flex-col gap-lg">
      {/* Live progress through the walkthrough */}
      <span aria-hidden className={`relative h-[2px] overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-line-dark"}`}>
        <span className="absolute inset-y-0 left-0 rounded-full bg-app-primary transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
      </span>
      {item.href ? (
        <Link href={item.href} className={`group ${cls}`}>
          {inner}
        </Link>
      ) : (
        <span className={cls}>{inner}</span>
      )}
    </figcaption>
  );
}

function FeatureItem({ feature, active, onSelect }: { feature: Feature; active: boolean; onSelect?: () => void }) {
  const Tag = onSelect ? "button" : "div";
  return (
    <Tag
      {...(onSelect ? { type: "button" as const, onClick: onSelect, "aria-current": active ? ("step" as const) : undefined } : {})}
      className="flex w-full flex-col items-start gap-lg text-left"
    >
      <span
        className={`flex size-[36px] items-center justify-center rounded-full border text-sm leading-[19.6px] transition-colors duration-500 ${
          active ? "border-bg-dark bg-bg-dark text-white" : "border-line-dark text-bg-dark"
        }`}
      >
        {feature.numeral}
      </span>
      <span className={`flex flex-col transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
        <span className="text-xl leading-[24px] tracking-[-0.4px] text-bg-dark">{feature.title}</span>
        {/* Only the active feature shows its description, keeping the pinned list compact */}
        <span className={`grid transition-[grid-template-rows] duration-500 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <span className="overflow-hidden">
            <span className="block max-w-[380px] pt-lg text-md leading-[24px] text-text-tertiary">{feature.description}</span>
          </span>
        </span>
      </span>
    </Tag>
  );
}

function SectionIntro({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-lg">
      <SectionLabel>{platform.label}</SectionLabel>
      <div id={id}>
        <RevealHeading text={platform.heading} className="max-w-[560px]" />
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  const features = platform.features;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(features.length - 1, Math.floor(progress * features.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [features.length]);

  // Clicking a feature scrolls to the middle of its step.
  const select = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top + ((i + 0.5) / features.length) * scrollable, behavior: reduce ? "auto" : "smooth" });
    },
    [features.length],
  );

  return (
    <section aria-labelledby="platform-heading" className="bg-bg-secondary px-2xl pb-[140px] pt-[120px] lg:pt-0">
      {/* Desktop: pinned walkthrough, titled by the section heading */}
      <div ref={trackRef} className="relative mx-auto hidden max-w-[1160px] lg:block" style={{ height: `calc(100vh + ${features.length * STEP_VH}vh)` }}>
        <div className="sticky top-0 flex h-screen items-center gap-[56px]">
          <div className="flex flex-[560_0_0] flex-col gap-4xl [@media(max-height:860px)]:gap-2xl">
            <SectionIntro id="platform-heading" />
            <ol className="flex flex-col gap-3xl [@media(max-height:860px)]:gap-md">
              {features.map((f, i) => (
                <li key={f.numeral}>
                  <FeatureItem feature={f} active={i === active} onSelect={() => select(i)} />
                </li>
              ))}
            </ol>
          </div>
          <div className="flex-[740_0_0]">
            <SceneFrame features={features} active={active} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: each feature followed by its scene */}
      <div className="mx-auto max-w-[560px] lg:hidden">
        <SectionIntro id="platform-heading-mobile" />
      </div>
      <ol className="mx-auto mt-[60px] flex max-w-[720px] flex-col gap-[60px] lg:hidden">
        {features.map((f, i) => (
          <li key={f.numeral} className="flex flex-col gap-3xl">
            <FeatureItem feature={f} active />
            <SceneFrame features={[f]} active={0} />
            {i < features.length - 1 && <span className="sr-only">Next feature</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
