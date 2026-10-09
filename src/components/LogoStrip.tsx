import { logoStrip } from "@/content/site";
import { Icon } from "./icons";

// Figma node 6:756 — white band under the hero, 90px tall, items 72px apart scrolling
// inside the 1200px container; edges fade out (as on the Elyte site). Until approved
// customer logos exist it shows what IST Legal works with, not who uses it.
function ItemGroup({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-[72px] pr-[72px]" aria-hidden={hidden || undefined}>
      {logoStrip.items.map((item) => (
        <li key={item.label} className="flex h-[30px] shrink-0 items-center gap-md text-bg-dark">
          <Icon name={item.icon} size={22} />
          <span className="whitespace-nowrap text-xl leading-[30px] tracking-[-0.4px]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  return (
    <section aria-label={logoStrip.label} className="flex justify-center border-b border-line-dark bg-bg-primary px-2xl">
      <div className="flex h-[90px] w-full max-w-[1160px] items-center gap-4xl">
        <p className="hidden shrink-0 text-sm font-semibold uppercase leading-[19.6px] tracking-[0.84px] text-bg-dark md:block">
          {logoStrip.label}
        </p>
        <div className="min-w-0 flex-1 overflow-clip [mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="logo-marquee flex w-max">
            <ItemGroup />
            <ItemGroup hidden />
            <ItemGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
