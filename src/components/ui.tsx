"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Small uppercase section label (Figma: 14px SemiBold, 0.84px tracking). */
export function SectionLabel({ children, className = "", light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`text-sm font-semibold uppercase leading-[19.6px] tracking-[0.84px] ${light ? "text-white" : "text-bg-dark"} ${className}`}>
      {children}
    </p>
  );
}

/** Adds data-visible once the element scrolls into view (used to trigger reveals once). */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Section heading (Figma: 52px, -3.12px tracking); words resolve from blur when scrolled into view. */
export function RevealHeading({
  text,
  as: Tag = "h2",
  className = "",
  light = false,
}: {
  text: string;
  as?: "h2" | "h3";
  className?: string;
  light?: boolean;
}) {
  const { ref, visible } = useInView<HTMLHeadingElement>(0.4);
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`reveal text-[40px] font-normal leading-[1.1] tracking-[-0.06em] lg:text-display-lg lg:leading-[57.2px] lg:tracking-[-3.12px] ${
        light ? "text-white" : "text-bg-dark"
      } ${className}`}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word" style={{ animationDelay: `${i * 0.06}s` }}>
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Figma's corner mark: a dark 20px square that slides out on hover while a second
 * one slides in from the bottom-left. Parent needs the `group` class.
 * `box` = white 52px tile (cards); `bare` = just the 20px mark (tiles, links).
 */
export function CornerMark({ variant = "box", dark = false }: { variant?: "box" | "bare"; dark?: boolean }) {
  const sq = dark ? "bg-white" : "bg-bg-dark";
  if (variant === "bare") {
    return (
      <span aria-hidden className="relative block size-[20px] shrink-0 overflow-clip">
        <span className={`absolute left-0 top-0 size-[20px] ${sq} transition-transform duration-500 ease-out group-hover:translate-x-[24px] group-hover:-translate-y-[24px]`} />
        <span className={`absolute left-[-24px] top-[24px] size-[20px] ${sq} transition-transform duration-500 ease-out group-hover:translate-x-[24px] group-hover:-translate-y-[24px]`} />
      </span>
    );
  }
  return (
    <span aria-hidden className="absolute right-0 top-0 size-[52px] overflow-clip bg-white">
      <span className="absolute left-[16px] top-[16px] size-[20px] bg-bg-dark transition-transform duration-500 ease-out group-hover:translate-x-[40px] group-hover:-translate-y-[40px]" />
      <span className="absolute left-[-24px] top-[56px] size-[20px] bg-bg-dark transition-transform duration-500 ease-out group-hover:translate-x-[40px] group-hover:-translate-y-[40px]" />
    </span>
  );
}

/** White action tile (Figma: 236×130, corner mark top-right, label bottom-left). */
export function ActionTile({
  href,
  title,
  body,
  className = "",
}: {
  href: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`group flex flex-col items-end justify-between bg-white p-lg ${className}`}>
      <CornerMark variant="bare" />
      <span className="flex w-full flex-col gap-sm">
        <span className="text-md font-medium leading-[22.4px] text-bg-dark">{title}</span>
        {body && <span className="text-sm leading-[19.6px] text-text-tertiary">{body}</span>}
      </span>
    </Link>
  );
}
