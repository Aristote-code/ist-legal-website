"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = ["Business Strategy", "Advisory Retainers", "Operations Optimization"];

const linkClass = "text-[15px] font-medium leading-[21px] tracking-[-0.3px] text-white";

export function Navigation() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
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
          <Link href="/" aria-label="elyte home" className="flex h-[30px] w-[97px] shrink-0 items-center">
            <Image src="/brand/elyte-logo.png" alt="elyte" width={97} height={30} className="h-[30px] w-[97px] object-contain" preload />
          </Link>

          <ul className="hidden h-[21px] flex-1 items-center justify-center gap-4xl lg:flex">
            <li>
              <Link href="#about" className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={`flex h-[21px] items-center gap-md ${linkClass}`}
                >
                  Services
                  <Image
                    src="/brand/chevron-down.svg"
                    alt=""
                    width={8}
                    height={4}
                    className={`h-[4px] w-[8px] transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <ul
                  id="services-menu"
                  className={`absolute left-1/2 top-[21px] flex w-[156px] -translate-x-1/2 flex-col items-center gap-xl pt-[19px] transition-all duration-300 ${
                    servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  {services.map((s) => (
                    <li key={s}>
                      <Link
                        href="#services"
                        className="whitespace-nowrap text-sm leading-[19.6px] text-white transition-opacity hover:opacity-70"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="#case-studies" className={linkClass}>
                Case studies
              </Link>
            </li>
            <li>
              <Link href="#insights" className={linkClass}>
                Insights
              </Link>
            </li>
          </ul>

          <Link
            href="#get-started"
            className="ml-auto flex h-[50px] shrink-0 items-center justify-center whitespace-nowrap border border-line px-2xl py-[14px] text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5 lg:ml-0"
          >
            Get started
          </Link>
        </div>
        <div className="absolute inset-x-2xl top-[84.8px] h-px bg-line" />
      </nav>
    </header>
  );
}
