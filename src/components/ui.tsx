"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
 * Corner arrow (Elyte's ↗ — Figma exports it as a black square). On hover the
 * arrow slides out to the top-right while a second one slides in from the
 * bottom-left. Parent needs the `group` class.
 * `box` = white 52px tile in a card corner; `bare` = just the 20px arrow.
 */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <HugeiconsIcon
      icon={ArrowUpRight01Icon}
      size={20}
      color="currentColor"
      strokeWidth={1.8}
      aria-hidden
      className={`absolute transition-transform duration-500 ease-out ${className}`}
    />
  );
}

export function CornerMark({ variant = "box", dark = false }: { variant?: "box" | "bare"; dark?: boolean }) {
  if (variant === "bare") {
    return (
      <span aria-hidden className={`relative block size-[20px] shrink-0 overflow-clip ${dark ? "text-white" : "text-bg-dark"}`}>
        <Arrow className="left-0 top-0 group-hover:translate-x-[24px] group-hover:-translate-y-[24px]" />
        <Arrow className="left-[-24px] top-[24px] group-hover:translate-x-[24px] group-hover:-translate-y-[24px]" />
      </span>
    );
  }
  return (
    <span aria-hidden className="absolute right-0 top-0 size-[52px] overflow-clip bg-white text-bg-dark">
      <Arrow className="left-[16px] top-[16px] group-hover:translate-x-[40px] group-hover:-translate-y-[40px]" />
      <Arrow className="left-[-24px] top-[56px] group-hover:translate-x-[40px] group-hover:-translate-y-[40px]" />
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
