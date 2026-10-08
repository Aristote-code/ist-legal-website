"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, type NavMenu } from "@/content/site";

const linkClass = "text-[15px] font-medium leading-[21px] tracking-[-0.3px] text-white";

function Dropdown({
  menu,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  menu: NavMenu;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const id = `menu-${menu.label.toLowerCase()}`;
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={`flex h-[21px] items-center gap-md ${linkClass}`}
      >
        {menu.label}
        <Image
          src="/brand/chevron-down.svg"
          alt=""
          width={8}
          height={4}
          className={`h-[4px] w-[8px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        id={id}
        className={`absolute left-1/2 top-[21px] flex -translate-x-1/2 flex-col items-center gap-xl pt-[19px] transition-all duration-300 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {menu.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="whitespace-nowrap text-sm leading-[19.6px] text-white transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Navigation() {
  const [open, setOpen] = useState<string | null>(null);
  const menusRef = useRef<HTMLUListElement>(null);
  // Click-opened menus stay open until click, Escape or outside click; hover-opened ones close on leave.
  const openedBy = useRef<"hover" | "click">("hover");

  const hoverOpen = (label: string) => {
    if (open !== label) openedBy.current = "hover";
    setOpen(label);
  };
  const hoverClose = () => {
    if (openedBy.current === "hover") setOpen(null);
  };
  const toggle = (label: string) => {
    if (open === label && openedBy.current === "click") return setOpen(null);
    openedBy.current = "click";
    setOpen(label);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (!menusRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex justify-center">
      <nav
        aria-label="Main"
        className="relative flex h-[86px] w-full max-w-[1200px] flex-col items-center justify-center px-2xl py-[18px]"
      >
        <div className="flex h-[50px] w-full items-center justify-center gap-[10px]">
          <Link href="/" aria-label="IST Legal home" className="flex h-[30px] w-[97px] shrink-0 items-center">
            <Image
              src="/brand/ist-legal-logo.png"
              alt="IST Legal"
              width={97}
              height={24}
              className="h-auto w-[97px] object-contain invert"
              preload
            />
          </Link>

          <ul ref={menusRef} className="hidden h-[21px] flex-1 items-center justify-center gap-4xl lg:flex">
            {nav.menus.map((menu) => (
              <li key={menu.label}>
                <Dropdown
                  menu={menu}
                  open={open === menu.label}
                  onOpen={() => hoverOpen(menu.label)}
                  onClose={hoverClose}
                  onToggle={() => toggle(menu.label)}
                />
              </li>
            ))}
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-4xl lg:ml-0">
            <Link href={nav.signIn.href} className={`hidden lg:block ${linkClass}`}>
              {nav.signIn.label}
            </Link>
            <Link
              href={nav.cta.href}
              className="flex h-[50px] items-center justify-center whitespace-nowrap border border-line px-2xl py-[14px] text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5"
            >
              {nav.cta.label}
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-2xl top-[84.8px] h-px bg-line" />
      </nav>
    </header>
  );
}
