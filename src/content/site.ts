// Site copy. Source: IST_Legal_Website_Copy_Merged.docx + the frozen content architecture.

import type { IconName } from "@/components/icons";

export type NavItem = { label: string; href: string };
export type MenuItem = NavItem & { description: string; icon: IconName };
export type NavMenu = {
  label: string;
  items: MenuItem[];
  card: { title: string; body: string; href: string };
};

export const nav = {
  menus: [
    {
      label: "Platform",
      items: [
        { label: "AI Legal Assistant", href: "/platform/ai-legal-assistant", icon: "assistant", description: "Ask legal questions. Get answers you can trace." },
        { label: "Legal Research", href: "/platform/legal-research", icon: "research", description: "Find the right authority faster." },
        { label: "Case Law", href: "/platform/case-law", icon: "caseLaw", description: "Find precedent. Understand the reasoning." },
        { label: "Legislation", href: "/platform/legislation", icon: "legislation", description: "Find the law. Understand the provision." },
        { label: "Contract Review & Drafting", href: "/platform/contract-review", icon: "contract", description: "Review faster. Draft with more control." },
        { label: "Workflow Tools", href: "/platform/workflow-tools", icon: "workflow", description: "Intake, e-signing, playbooks and more." },
      ],
      card: {
        title: "Platform overview",
        body: "One legal workspace — from research to action. See how every part of IST Legal connects.",
        href: "/platform",
      },
    },
    {
      label: "Solutions",
      items: [
        { label: "Law Firms", href: "/solutions/law-firms", icon: "lawFirm", description: "Move from research to client work faster." },
        { label: "Government", href: "/solutions/government", icon: "government", description: "Legal intelligence for public-sector decisions." },
        { label: "Businesses", href: "/solutions/businesses", icon: "business", description: "Move faster on legal questions, keep control." },
        { label: "Education", href: "/solutions/education", icon: "education", description: "Research built for learning and teaching." },
      ],
      card: {
        title: "Book a Demo",
        body: "See IST Legal in the context of your legal work — firm, institution, business or classroom.",
        href: "/book-a-demo",
      },
    },
    {
      label: "Assurance",
      items: [
        { label: "Sources & Verification", href: "/trust/verification", icon: "verification", description: "Every legal answer should lead you back to the law." },
        { label: "Security & Privacy", href: "/trust/security", icon: "security", description: "Designed for the expectations of professional legal work." },
      ],
      card: {
        title: "AI you can verify",
        body: "IST Legal keeps AI analysis connected to the legal authorities behind it, so judgment stays with you.",
        href: "/trust/verification",
      },
    },
  ] satisfies NavMenu[],
  links: [
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ] satisfies NavItem[],
  signIn: { label: "Sign in", href: "/sign-in" },
  cta: { label: "Book a Demo", href: "/book-a-demo" },
  cardImage: "/media/menu/card.png",
};

export const hero = {
  headline: [
    ["Legal", "intelligence"],
    ["you", "can", "verify."],
  ],
  body: "Research legislation, case law and legal documents with AI grounded in jurisdiction-specific legal sources.",
  primaryCta: { label: "Start Free", href: "/sign-up" },
  secondaryCta: { label: "Book a Demo", href: "/book-a-demo" },
  strip: ["Grounded in legal sources", "Verify every authority"],
  // Background film: 30s silent loop, transcoded from the supplied source (HEVC 39MB).
  video: {
    webm: "/media/hero-1080.webm",
    mp4: "/media/hero-1080.mp4",
    mp4Mobile: "/media/hero-720.mp4",
    poster: "/media/hero-poster.jpg",
  },
};

// Logo strip under the hero (Figma node 6:756).
// PLACEHOLDER logos from the Figma template — replace with real, approved IST Legal
// partners/clients before publishing (the brief forbids invented client logos).
export const logoStrip = {
  label: "Trusted by legal teams and institutions",
  logos: [
    { name: "FeatherDev", src: "/media/logos/featherdev.png", width: 123 },
    { name: "Spherule", src: "/media/logos/spherule.png", width: 103 },
    { name: "GlobalBank", src: "/media/logos/globalbank.png", width: 123 },
    { name: "Nietzsche", src: "/media/logos/nietzsche.png", width: 113 },
  ],
};
