// Section 4 — solutions. Layout from Figma "Services" (6:946): photo cards with a
// bottom-left title that rolls on hover, corner mark, description underneath.
// Figma has 3 cards of 380px; we have 4 audiences, so 4 equal columns.
import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/content/site";
import { CornerMark, RevealHeading, SectionLabel } from "../ui";

export function Solutions() {
  return (
    <section aria-labelledby="solutions-heading" className="bg-bg-secondary px-2xl py-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-[50px]">
        <div className="flex flex-col gap-3xl">
          <SectionLabel>{solutions.label}</SectionLabel>
          <div id="solutions-heading">
            <RevealHeading text={solutions.heading} className="max-w-[696px]" />
          </div>
          <p className="max-w-[560px] text-lg leading-[25.2px] text-text-tertiary">{solutions.intro}</p>
        </div>

        <ul className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
          {solutions.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-2xl">
              <Link href={item.href} className="group relative block h-[440px] overflow-clip bg-bg-dark lg:h-[520px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-[rgba(8,16,20,0.4)] from-[43.6%] to-bg-dark" />
                {/* Title rolls up on hover (Figma's duplicated heading layer) */}
                <span className="absolute bottom-[24px] left-[24px] right-[24px] h-[28.8px] overflow-hidden">
                  <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                    <span className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">{item.title}</span>
                    <span aria-hidden className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">
                      {item.title}
                    </span>
                  </span>
                </span>
                <CornerMark />
              </Link>
              <div className="flex flex-col gap-lg">
                <p className="text-md leading-[24px] text-text-tertiary">{item.description}</p>
                <Link href={item.href} className="self-start text-md font-medium leading-[22.4px] text-bg-dark underline decoration-line-dark underline-offset-4 transition-colors hover:decoration-bg-dark">
                  {item.cta} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
