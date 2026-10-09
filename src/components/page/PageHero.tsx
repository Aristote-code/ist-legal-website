// Inner-page hero. Three variants keep page families distinct:
//  • photo   — Elyte service-page hero: dark full-bleed still, headline low-left (solutions, about)
//  • product — text left, the product scene right, no photography (platform pages)
//  • plain   — dark typographic header, no image (assurance, utility pages)
import Image from "next/image";
import Link from "next/link";
import type { Cta } from "@/content/pages";
import { SceneFrame } from "../PlatformShowcase";
import type { SceneName } from "../scenes";
import { SectionLabel } from "../ui";

type Props = {
  label: string;
  title: string;
  body: string;
  primary?: Cta;
  secondary?: Cta;
  image?: string;
  variant?: "photo" | "product" | "plain";
  scene?: { scene: SceneName; caption: string; tag: string };
  compact?: boolean;
};

function Title({ title, size }: { title: string; size: "lg" | "md" }) {
  const words = title.split(" ");
  return (
    <h1
      className={`max-w-[860px] font-display font-normal leading-[1.08] tracking-[-0.02em] text-white ${
        size === "lg" ? "text-[42px] sm:text-[54px] lg:text-[64px]" : "text-[38px] sm:text-[48px] lg:text-[56px]"
      }`}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="word-in" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
}

function Ctas({ primary, secondary }: Pick<Props, "primary" | "secondary">) {
  if (!primary && !secondary) return null;
  return (
    <div className="mt-md flex flex-wrap items-center gap-2xl">
      {primary && (
        <Link
          href={primary.href}
          className="flex h-[50.4px] min-w-[155px] items-center justify-center bg-white px-2xl text-md font-medium leading-[22.4px] text-bg-dark transition-opacity hover:opacity-90"
        >
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          className="flex h-[50.4px] items-center justify-center border border-line px-2xl text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

export function PageHero({ label, title, body, primary, secondary, image, variant = "photo", scene, compact = false }: Props) {
  if (variant === "product" && scene) {
    return (
      <section className="relative isolate overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_80%_40%,rgba(78,51,217,0.14),transparent_70%)]" />
        <div className="hero-noise absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-[60px] px-2xl pb-[100px] pt-[150px] lg:grid-cols-[1fr_600px] lg:gap-[56px] lg:pt-[170px]">
          <div className="flex flex-col gap-2xl">
            <SectionLabel light>{label}</SectionLabel>
            <Title title={title} size="md" />
            <p className="max-w-[520px] text-lg leading-[25.2px] text-text-muted">{body}</p>
            <Ctas primary={primary} secondary={secondary} />
          </div>
          <SceneFrame features={[scene]} tone="dark" />
        </div>
      </section>
    );
  }

  if (variant === "plain" || !image) {
    return (
      <section className="relative isolate overflow-hidden bg-bg-dark">
        <div className="hero-noise absolute inset-0 -z-10" />
        <div className={`mx-auto flex max-w-[1200px] flex-col justify-end px-2xl pb-[60px] ${compact ? "min-h-[360px] pt-[140px]" : "min-h-[520px] pt-[160px]"}`}>
          <div className="flex flex-col gap-2xl border-b border-line pb-[40px]">
            <SectionLabel light>{label}</SectionLabel>
            <Title title={title} size="md" />
            <p className="max-w-[640px] text-lg leading-[25.2px] text-text-muted">{body}</p>
            <Ctas primary={primary} secondary={secondary} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative isolate flex overflow-hidden bg-bg-dark ${compact ? "min-h-[560px] lg:min-h-[620px]" : "min-h-[640px] lg:h-[86svh] lg:max-h-[900px]"}`}
    >
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill preload sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-bg-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_80%,rgba(8,16,20,0.9)_0%,rgba(8,16,20,0.55)_45%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-bg-dark" />
        <div className="hero-noise absolute inset-0" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-end px-2xl pb-[60px] pt-[140px]">
        <div className="flex flex-col gap-2xl border-b border-line pb-[48px]">
          <SectionLabel light>{label}</SectionLabel>
          <Title title={title} size="lg" />
          <p className="max-w-[560px] text-lg leading-[25.2px] text-text-muted">{body}</p>
          <Ctas primary={primary} secondary={secondary} />
        </div>
      </div>
    </section>
  );
}
