// Site copy. Source: IST_Legal_Website_Copy_Merged.docx + the frozen content architecture.

export type NavItem = { label: string; href: string };
export type NavMenu = { label: string; items: NavItem[] };

export const nav = {
  menus: [
    {
      label: "Platform",
      items: [
        { label: "Platform Overview", href: "/platform" },
        { label: "AI Legal Assistant", href: "/platform/ai-legal-assistant" },
        { label: "Legal Research", href: "/platform/legal-research" },
        { label: "Case Law", href: "/platform/case-law" },
        { label: "Legislation", href: "/platform/legislation" },
        { label: "Contract Review & Drafting", href: "/platform/contract-review" },
        { label: "Workflow Tools", href: "/platform/workflow-tools" },
      ],
    },
    {
      label: "Solutions",
      items: [
        { label: "Law Firms", href: "/solutions/law-firms" },
        { label: "Government", href: "/solutions/government" },
        { label: "Businesses", href: "/solutions/businesses" },
        { label: "Education", href: "/solutions/education" },
      ],
    },
    {
      label: "Trust",
      items: [
        { label: "Sources & Verification", href: "/trust/verification" },
        { label: "Security & Privacy", href: "/trust/security" },
      ],
    },
  ] satisfies NavMenu[],
  links: [
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ] satisfies NavItem[],
  signIn: { label: "Sign in", href: "/sign-in" },
  cta: { label: "Book a Demo", href: "/book-a-demo" },
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
  image: "/media/hero.png",
};
