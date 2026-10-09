"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

// Index of each line's first word, so words reveal in reading order across lines.
const lineStart = hero.headline.map((_, l) => hero.headline.slice(0, l).flat().length);

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Respect reduced motion: hold on the poster frame instead of autoplaying.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) videoRef.current?.pause();
      setPaused(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-bg-dark">
      {/* Background film */}
      <div className="absolute inset-0 -z-10 overflow-clip">
        <video
          ref={videoRef}
          className="pointer-events-none h-full w-full object-cover"
          poster={hero.video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={hero.video.mp4Mobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={hero.video.webm} type="video/webm" />
          <source src={hero.video.mp4} type="video/mp4" />
        </video>
        {/* Shade only where text sits; the rest of the film stays clear */}
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-bg-dark/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_20%_62%,rgba(8,16,20,0.85)_0%,rgba(8,16,20,0.6)_45%,transparent_100%)] lg:bg-[radial-gradient(ellipse_42%_40%_at_20%_62%,rgba(8,16,20,0.85)_0%,rgba(8,16,20,0.6)_45%,transparent_100%)]" />
        {/* Fine film grain over the whole frame */}
        <div className="hero-noise absolute inset-0" />
      </div>

      {/* Fade into background from 33% */}
      <div className="absolute inset-0 flex min-h-[100svh] justify-center bg-gradient-to-b from-[rgba(8,16,20,0)] from-70% to-bg-dark">
        <div className="flex w-full max-w-[1200px] flex-col justify-end px-2xl pb-2xl pt-[120px]">
          <div className="flex flex-col justify-center gap-[36px] border-b border-line pb-[60px]">
            <div className="flex flex-col justify-center gap-2xl">
              <h1 className="max-w-[764px] font-display text-[44px] font-normal leading-[1.1] tracking-[-0.02em] text-white sm:text-[56px] lg:text-display-2xl lg:leading-[79.2px]">
                {hero.headline.map((line, l) => (
                  <span key={l} className="inline lg:block">
                    {line.map((word, w) => {
                      const delay = 0.1 + (lineStart[l] + w) * 0.08;
                      return (
                        <span key={word} className="word-in mr-[0.19em] last:mr-0" style={{ animationDelay: `${delay}s` }}>
                          {word}
                        </span>
                      );
                    })}
                    {l === 0 && " "}
                  </span>
                ))}
              </h1>
              <p className="max-w-[540px] text-lg leading-[25.2px] text-text-muted">{hero.body}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2xl">
              <Link
                href={hero.primaryCta.href}
                className="flex h-[50.4px] min-w-[155px] items-center justify-center bg-white px-2xl py-[14px] text-md font-medium leading-[22.4px] text-bg-dark transition-opacity hover:opacity-90"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="flex h-[50.4px] items-center justify-center border border-line px-2xl py-[14px] text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-[10px] pt-2xl text-sm leading-[19.6px] text-white">
            <p>{hero.strip[0]}</p>
            <div className="flex items-center gap-lg">
              <p className="text-right">{hero.strip[1]}</p>
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={paused ? "Play background video" : "Pause background video"}
                className="flex size-[28px] shrink-0 items-center justify-center rounded-full border border-line text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                {paused ? (
                  <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden>
                    <path d="M0 0l8 4.5L0 9z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="7" height="9" viewBox="0 0 7 9" aria-hidden>
                    <path d="M0 0h2.2v9H0zM4.8 0H7v9H4.8z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
