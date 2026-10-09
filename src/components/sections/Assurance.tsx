// Section 6 — assurance. Layout from Figma "Case studies" (6:1175): two full-width dark
// photo panels with a glass text card on the left, and a white tile bottom-right.
// Figma's client case studies are replaced by IST Legal's two assurance themes.
import Image from "next/image";
import Link from "next/link";
import { assurance } from "@/content/site";
import { Icon } from "../icons";
import { ActionTile, RevealHeading, SectionLabel } from "../ui";

export function Assurance() {
  return (
    <section aria-labelledby="assurance-heading" className="bg-bg-secondary px-2xl py-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-[44px]">
        <div className="flex flex-col items-center gap-3xl text-center">
          <SectionLabel>{assurance.label}</SectionLabel>
          <div id="assurance-heading">
            <RevealHeading text={assurance.heading} className="max-w-[744px]" />
          </div>
        </div>

        <div className="relative flex w-full flex-col gap-lg">
          {assurance.items.map((item) => (
            <article key={item.eyebrow} className="relative min-h-[560px] overflow-clip bg-bg-dark lg:min-h-[659px]">
              <Image src={item.image} alt="" fill sizes="(min-width: 1200px) 1160px, 100vw" className="object-cover" />
              <div className="relative flex min-h-[inherit] items-end bg-gradient-to-l from-[rgba(8,16,20,0.4)] from-[24%] to-bg-dark p-lg">
                <div className="relative flex min-h-[536px] w-full max-w-[482px] flex-col justify-between lg:min-h-[635px] gap-[60px] border border-white/8 bg-[rgba(8,16,20,0.12)] p-[28px] backdrop-blur-[5px] sm:p-[36px]">
                  <span className="flex items-center gap-md text-white">
                    <Icon name={item.icon} />
                    <span className="text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px]">{item.eyebrow}</span>
                  </span>
                  <div className="flex flex-col gap-3xl">
                    <div className="flex flex-col gap-lg">
                      <h3 className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">{item.title}</h3>
                      <p className="text-md leading-[24px] text-text-muted">{item.body}</p>
                    </div>
                    {item.principles.length > 0 && (
                      <ul className="flex flex-col gap-lg border-t border-white/12 pt-3xl">
                        {item.principles.map((pr) => (
                          <li key={pr.title} className="flex flex-col gap-xs">
                            <span className="text-md leading-[22.4px] text-white">{pr.title}</span>
                            <span className="text-sm leading-[19.6px] text-text-muted">{pr.body}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={item.link.href}
                      className="self-start text-md font-medium leading-[17.6px] text-white underline underline-offset-4 transition-opacity hover:opacity-80"
                    >
                      {item.link.label}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <ActionTile
            href={assurance.more.href}
            title={assurance.more.label}
            className="absolute bottom-lg right-lg hidden h-[130px] w-[236px] lg:flex"
          />
        </div>
      </div>
    </section>
  );
}
