"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, type NavMenu } from "@/content/site";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "./icons";
import { CornerMark } from "./ui";
import { Logo } from "./Logo";

const linkClass = "text-[15px] font-medium leading-[21px] tracking-[-0.3px] text-white";

function MenuPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const twoColumns = menu.items.length > 3;
  return (
    <div className="flex min-h-[360px] items-stretch gap-[44px] bg-bg-secondary py-sm pl-3xl pr-sm shadow-[0px_16px_24px_-10px_rgba(8,16,20,0.12)]">
      <div className="flex min-w-px flex-[666_0_0] flex-col justify-center gap-[36px] pb-[18px] pt-[14px]">
        <p className="h-[36px] border-b border-line-dark pb-lg text-md font-medium leading-text-md text-bg-dark">{menu.label}</p>
        <ul className={`grid gap-4xl ${twoColumns ? "grid-cols-2 gap-x-4xl" : "grid-cols-1"}`}>
          {menu.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onNavigate} className="group flex min-h-[41px] items-stretch gap-xl">
                <span className="flex w-[44px] shrink-0 items-center justify-center bg-bg-dark text-white">
                  <Icon name={item.icon} />
                </span>
                <span className="flex min-w-px flex-1 flex-col justify-center gap-xs">
                  <span className="text-md font-medium leading-[17.6px] tracking-[-0.32px] text-bg-dark">{item.label}</span>
                  <span className="text-sm leading-[19.6px] text-text-tertiary transition-colors group-hover:text-bg-dark">
                    {item.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={menu.card.href}
        onClick={onNavigate}
        className="group relative min-h-[348px] min-w-px max-w-[420px] flex-[420_0_0] overflow-clip"
      >
        <Image
          src={menu.card.image}
          alt=""
          fill
          sizes="420px"
          className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 flex flex-col justify-end gap-[10px] bg-gradient-to-b from-[rgba(8,16,20,0)] from-38% to-bg-dark p-3xl">
          <span className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">{menu.card.title}</span>
          <span className="max-w-[372px] text-sm leading-[19.6px] text-text-muted">{menu.card.body}</span>
        </span>
        <CornerMark />
      </Link>
    </div>
  );
}

export function Navigation() {
  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState<NavMenu>(nav.menus[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // Click-opened menus stay open until click, Escape or outside click; hover-opened ones close on leave.
  const openedBy = useRef<"hover" | "click">("hover");

  const show = (label: string) => {
    setOpen(label);
    setShown(nav.menus.find((m) => m.label === label) ?? nav.menus[0]);
  };
  const hoverOpen = (label: string) => {
    if (open !== label) openedBy.current = "hover";
    show(label);
  };
  const hoverClose = () => {
    if (openedBy.current === "hover") setOpen(null);
  };
  const toggle = (label: string) => {
    if (open === label && openedBy.current === "click") return setOpen(null);
    openedBy.current = "click";
    show(label);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} onMouseLeave={hoverClose} className="absolute inset-x-0 top-0 z-20 flex justify-center">
      <nav
        aria-label="Main"
        className="relative flex h-[86px] w-full max-w-[1200px] flex-col items-center justify-center px-2xl py-[18px]"
      >
        <div className="flex h-[50px] w-full items-center justify-center gap-[10px]">
          <Link href="/" aria-label="IST Legal home" className="flex h-[36px] shrink-0 items-center">
            <Logo height={36} />
          </Link>

          <ul className="hidden h-[21px] flex-1 items-center justify-center gap-4xl lg:flex">
            {nav.menus.map((menu) => {
              const isOpen = open === menu.label;
              return (
                <li key={menu.label} onMouseEnter={() => hoverOpen(menu.label)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="menu-panel"
                    onClick={() => toggle(menu.label)}
                    className={`flex h-[21px] items-center gap-md ${linkClass}`}
                  >
                    {menu.label}
                    <Image
                      src="/brand/chevron-down.svg"
                      alt=""
                      width={8}
                      height={4}
                      className={`h-[4px] w-[8px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </li>
              );
            })}
            {nav.links.map((link) => (
              <li key={link.href} onMouseEnter={hoverClose}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-4xl lg:ml-0" onMouseEnter={hoverClose}>
            <Link href={nav.signIn.href} className={`hidden lg:block ${linkClass}`}>
              {nav.signIn.label}
            </Link>
            <Link
              href={nav.cta.href}
              className="hidden h-[50px] items-center justify-center whitespace-nowrap border border-line px-2xl py-[14px] text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5 sm:flex"
            >
              {nav.cta.label}
            </Link>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-[50px] items-center justify-center border border-line text-white lg:hidden"
            >
              <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu01Icon} size={22} color="currentColor" strokeWidth={1.6} />
            </button>
          </div>
        </div>
        <div className="absolute inset-x-2xl top-[84.8px] h-px bg-line" />

        <div
          id="menu-panel"
          className={`absolute inset-x-2xl top-[86px] hidden transition-all duration-300 ease-out lg:block ${
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <MenuPanel menu={shown} onNavigate={() => setOpen(null)} />
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[86px] z-20 overflow-y-auto bg-bg-dark px-2xl pb-[40px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[640px] flex-col">
          {nav.menus.map((menu) => (
            <div key={menu.label} className="border-b border-line py-3xl">
              <p className="mb-xl text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px] text-text-muted">{menu.label}</p>
              <ul className="flex flex-col gap-xl">
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-lg text-white">
                      <span className="flex size-[36px] shrink-0 items-center justify-center bg-white/8">
                        <Icon name={item.icon} size={20} />
                      </span>
                      <span className="text-lg leading-[24px]">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="flex flex-col gap-xl border-b border-line py-3xl">
            {[...nav.links, { label: "Platform Overview", href: "/platform" }, nav.signIn].map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={() => setMobileOpen(false)} className="text-lg leading-[24px] text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={nav.cta.href}
            onClick={() => setMobileOpen(false)}
            className="mt-3xl flex h-[50px] items-center justify-center bg-white text-md font-medium text-bg-dark"
          >
            {nav.cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
