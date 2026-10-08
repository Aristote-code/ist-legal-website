"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";
import { LOOP, ProductMoment } from "./ProductMoment";

// Frame shown when motion is reduced or paused before the loop has started.
const STILL_FRAME = 16;

export function Hero() {
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stopped = paused || reducedMotion;

  useEffect(() => {
    if (stopped) return;
    const id = setInterval(() => setT((v) => (v + 0.1) % LOOP), 100);
    return () => clearInterval(id);
  }, [stopped]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (stopped) v.pause();
    else v.play().catch(() => {});
  }, [stopped]);

  const frame = reducedMotion ? STILL_FRAME : t;

  return (
    <section
      data-paused={stopped}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-on-ink"
    >
      {/* Layer 1 — the film */}
      <div className="absolute inset-0 -z-10">
        {hero.media.src ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover [filter:saturate(0.55)_contrast(1.06)_brightness(0.82)]"
            poster={hero.media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            {hero.media.srcWebm && <source src={hero.media.srcWebm} type="video/webm" />}
            <source src={hero.media.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={hero.media.poster}
            alt=""
            fill
            preload
            sizes="100vw"
            className="film-drift object-cover object-[70%_center] [filter:saturate(0.55)_contrast(1.06)_brightness(0.82)]"
          />
        )}
        {/* Grade: push shadows toward IST violet, keep blacks deep */}
        <div className="absolute inset-0 bg-brand-deep mix-blend-color opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_30%,transparent_30%,rgba(7,7,12,0.55)_100%)]" />
        {/* Readability: calm left third + fade into the page */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent from-0% via-25% to-ink" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </div>

      {/* Layer 2 — product moments (code, not video) */}
      <ProductMoment t={frame} />

      {/* Copy */}
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-end px-5 pb-5 pt-[120px]">
        <div className="border-b border-line-ink pb-14 lg:pb-16">
          <h1 className="font-serif text-[52px] leading-[0.98] tracking-[-0.015em] text-on-ink sm:text-[72px] lg:text-[96px]">
            <span className="rise block" style={{ animationDelay: "0.15s" }}>
              {hero.headline[0]}
            </span>
            <span className="rise block" style={{ animationDelay: "0.3s" }}>
              you can <em className="italic text-brand-tint">verify.</em>
            </span>
          </h1>
          <p
            className="rise mt-6 max-w-[520px] text-[17px] leading-[1.55] text-muted-ink lg:text-[18px]"
            style={{ animationDelay: "0.5s" }}
          >
            {hero.body}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: "0.65s" }}>
            <Link
              href={hero.primaryCta.href}
              className="bg-white px-6 py-[14px] text-[16px] font-medium text-ink transition-colors hover:bg-brand hover:text-white"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="border border-line-ink px-6 py-[14px] text-[16px] font-medium text-on-ink transition-colors hover:border-white/40 hover:bg-white/5"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-5 text-[13px] text-on-ink/75 sm:text-[14px]">
          <span>{hero.strip[0]}</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{hero.strip[1]}</span>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play background animation" : "Pause background animation"}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line-ink text-on-ink/80 transition-colors hover:border-white/40 hover:text-on-ink"
              >
                {paused ? (
                  <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden>
                    <path d="M0 0l9 5-9 5z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden>
                    <path d="M0 0h2.5v10H0zM5.5 0H8v10H5.5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
