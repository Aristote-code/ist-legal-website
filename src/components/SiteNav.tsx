"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      width="9"
      height="5"
      viewBox="0 0 9 5"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l3.5 3L8 1" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedBy = useRef<"hover" | "click">("click");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open !== label) openedBy.current = "hover";
    setOpen(label);
  };
  // A click only closes a menu that a click opened; a hover-opened menu stays open.
  const toggle = (label: string) => {
    if (open === label && openedBy.current === "click") return setOpen(null);
    openedBy.current = "click";
    setOpen(label);
  };
  const leave = () => {
    if (openedBy.current === "click") return;
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const activeGroup = nav.groups.find((g) => g.label === open);

  return (
    <header ref={navRef} className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-[1200px] px-5">
        <nav aria-label="Main" className="flex h-[86px] items-center gap-6 border-b border-line-ink">
          <Link href="/" className="shrink-0" aria-label="IST Legal home">
            <Image
              src="/brand/ist-legal-logo.png"
              alt="IST Legal"
              width={92}
              height={38}
              className="h-[34px] w-auto invert"
              preload
            />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {nav.groups.map((group) => (
              <li key={group.label} onMouseEnter={() => enter(group.label)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={open === group.label}
                  aria-controls="nav-panel"
                  onClick={() => toggle(group.label)}
                  className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.02em] text-on-ink/90 transition-colors hover:text-on-ink"
                >
                  {group.label}
                  <Chevron open={open === group.label} />
                </button>
              </li>
            ))}
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-medium tracking-[-0.02em] text-on-ink/90 transition-colors hover:text-on-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <Link
              href={nav.signIn.href}
              className="text-[15px] font-medium tracking-[-0.02em] text-on-ink/80 transition-colors hover:text-on-ink"
            >
              {nav.signIn.label}
            </Link>
            <Link
              href={nav.cta.href}
              className="border border-line-ink px-5 py-3 text-[15px] font-medium text-on-ink transition-colors hover:border-white/40 hover:bg-white/5"
            >
              {nav.cta.label}
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center text-on-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden>
              {mobileOpen ? (
                <path d="M4 0l12 12M16 0L4 12" stroke="currentColor" strokeWidth="1.4" />
              ) : (
                <path d="M0 1h20M0 11h20" stroke="currentColor" strokeWidth="1.4" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Desktop mega panel */}
      <div
        id="nav-panel"
        onMouseEnter={() => open && enter(open)}
        onMouseLeave={leave}
        className={`absolute inset-x-0 top-[86px] hidden lg:block transition-all duration-300 ${
          activeGroup ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="border border-t-0 border-line-ink bg-ink/80 p-8 backdrop-blur-xl">
            {activeGroup && (
              <div className="grid grid-cols-3 gap-10">
                {activeGroup.columns.map((col) => (
                  <div key={col.title} className={col.links.length > 3 ? "col-span-2" : ""}>
                    <p className="mb-4 text-[12px] uppercase tracking-[0.14em] text-muted-ink">{col.title}</p>
                    <ul className={`grid gap-x-8 gap-y-1 ${col.links.length > 3 ? "grid-cols-2" : ""}`}>
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(null)}
                            className="group block -mx-3 px-3 py-3 transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="block text-[15px] font-medium text-on-ink">
                              {link.label}
                              <span className="ml-2 inline-block text-brand-tint opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                                →
                              </span>
                            </span>
                            {link.description && (
                              <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{link.description}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-0 top-[86px] z-30 overflow-y-auto bg-ink px-5 pb-10 lg:hidden">
          {nav.groups.map((group) => (
            <div key={group.label} className="border-b border-line-ink py-6">
              <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-muted-ink">{group.label}</p>
              <ul className="space-y-3">
                {group.columns.flatMap((c) => c.links).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="text-[17px] text-on-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="space-y-3 border-b border-line-ink py-6">
            {[...nav.links, nav.signIn].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} className="text-[17px] text-on-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={nav.cta.href}
            className="mt-8 block border border-line-ink py-4 text-center text-[16px] font-medium text-on-ink"
          >
            {nav.cta.label}
          </Link>
        </div>
      )}
    </header>
  );
}
