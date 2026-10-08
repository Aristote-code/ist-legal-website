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

const SCENE_W = 520;
const SCENE_H = 440;
const STEP_VH = 70; // scroll distance per feature

const captionIcon: Record<SceneName, IconName> = {
  assistant: "assistant",
  categories: "caseLaw",
  citations: "verification",
  draft: "contract",
  intake: "workflow",
};

type Feature = (typeof platform.features)[number];

/** Dark frame (560×565 in Figma) holding one or more scenes plus the caption bar. */
function SceneFrame({ features, active }: { features: readonly Feature[]; active: number }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / SCENE_W, height / SCENE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const current = features[active];

  return (
    <div className="relative aspect-[560/565] w-full overflow-hidden bg-bg-dark">
      {/* Scenes */}
      <div ref={areaRef} className="absolute inset-x-[28px] bottom-[116px] top-[28px]">
        {features.map((f, i) => {
          const Scene = scenes[f.scene];
          const state = i === active ? "on" : i < active ? "past" : "next";
          return (
            <div
              key={f.scene}
              aria-hidden={i !== active}
              className={`scene-layer absolute left-1/2 top-1/2 origin-center transition-[opacity,translate] duration-700 ease-out ${
                state === "on" ? "opacity-100 translate-y-0" : state === "past" ? "-translate-y-3 opacity-0" : "translate-y-5 opacity-0"
              }`}
              style={{ width: SCENE_W, height: SCENE_H, marginLeft: -SCENE_W / 2, marginTop: -SCENE_H / 2, scale: String(scale) }}
            >
              <Scene />
            </div>
          );
        })}
      </div>

      {/* Figma: fade to dark from 60% */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(8,16,20,0)] from-60% to-bg-dark" />

      {/* Caption bar (Figma's person card → feature card) */}
      <Link
        href={current.href}
        className="group absolute inset-x-md bottom-md flex items-center gap-2xl bg-white/12 p-xl backdrop-blur-[5px]"
      >
        <span className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
          <Icon name={captionIcon[current.scene]} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[10px]">
          <span className="truncate text-xl leading-[24px] tracking-[-0.4px] text-white">{current.caption}</span>
          <span className="text-xs font-medium uppercase leading-[16.8px] tracking-[0.72px] text-text-muted sm:truncate">{current.tag}</span>
        </span>
        <span className="hidden shrink-0 items-center gap-[10px] sm:flex">
          <span className="text-md font-medium leading-[22.4px] text-white">Explore</span>
          <CornerMark variant="bare" dark />
        </span>
      </Link>
    </div>
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
            <span className="block max-w-[460px] pt-lg text-md leading-[24px] text-text-tertiary">{feature.description}</span>
          </span>
        </span>
      </span>
    </Tag>
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
    <section aria-labelledby="platform-heading" className="bg-bg-secondary px-2xl pb-[140px] pt-[120px] lg:pt-11xl">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-3xl">
        <SectionLabel>{platform.label}</SectionLabel>
        <div id="platform-heading">
          <RevealHeading text={platform.heading} className="max-w-[560px]" />
        </div>
      </div>

      {/* Desktop: pinned walkthrough */}
      <div ref={trackRef} className="relative mx-auto hidden max-w-[1160px] lg:block" style={{ height: `calc(100vh + ${features.length * STEP_VH}vh)` }}>
        <div className="sticky top-0 flex h-screen items-center gap-5xl">
          <ol className="flex flex-[560_0_0] flex-col gap-3xl">
            {features.map((f, i) => (
              <li key={f.numeral}>
                <FeatureItem feature={f} active={i === active} onSelect={() => select(i)} />
              </li>
            ))}
          </ol>
          <div className="flex-[560_0_0]">
            <SceneFrame features={features} active={active} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: each feature followed by its scene */}
      <ol className="mx-auto mt-[60px] flex max-w-[560px] flex-col gap-[60px] lg:hidden">
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
