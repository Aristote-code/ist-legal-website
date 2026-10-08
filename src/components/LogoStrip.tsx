import Image from "next/image";
import { logoStrip } from "@/content/site";

// Figma node 6:756 — white band under the hero, 90px tall, logos 30px high,
// 72px apart, scrolling continuously inside the 1200px container.
function LogoGroup({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-[72px] pr-[72px]" aria-hidden={hidden || undefined}>
      {logoStrip.logos.map((logo) => (
        <li key={logo.name} className="relative h-[30px] shrink-0" style={{ width: logo.width }}>
          <Image src={logo.src} alt={hidden ? "" : logo.name} fill sizes={`${logo.width}px`} className="object-cover" />
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  return (
    <section aria-label={logoStrip.label} className="flex justify-center border-b border-line-dark bg-bg-primary">
      <div className="flex h-[90px] w-full max-w-[1200px] items-center overflow-clip">
        <div className="logo-marquee flex w-max">
          <LogoGroup />
          <LogoGroup hidden />
          <LogoGroup hidden />
        </div>
      </div>
    </section>
  );
}
