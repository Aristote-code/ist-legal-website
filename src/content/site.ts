// Single source of truth for site copy. Source: IST_Legal_Website_Copy_Merged.docx
// plus the frozen content architecture. Anything marked `illustrative` must stay labelled.

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; columns: { title: string; links: NavLink[] }[] };

export const nav = {
  groups: [
    {
      label: "Platform",
      columns: [
        {
          title: "Core intelligence",
          links: [
            { label: "AI Legal Assistant", href: "/platform/ai-legal-assistant", description: "Ask legal questions. Get answers you can trace." },
            { label: "Legal Research", href: "/platform/legal-research", description: "Find the right authority faster." },
            { label: "Case Law", href: "/platform/case-law", description: "Find precedent. Understand the reasoning." },
            { label: "Legislation", href: "/platform/legislation", description: "Find the law. Understand the provision." },
            { label: "Contract Review & Drafting", href: "/platform/contract-review", description: "Review faster. Draft with more control." },
          ],
        },
        {
          title: "More from IST Legal",
          links: [
            { label: "Platform Overview", href: "/platform", description: "One legal workspace, from research to action." },
            { label: "Workflow Tools", href: "/platform/workflow-tools", description: "Intake, e-signing, playbooks, translation and more." },
          ],
        },
      ],
    },
    {
      label: "Solutions",
      columns: [
        {
          title: "Built for your legal context",
          links: [
            { label: "Law Firms", href: "/solutions/law-firms", description: "Move from research to client work faster." },
            { label: "Government", href: "/solutions/government", description: "Legal intelligence for public-sector decisions." },
            { label: "Businesses", href: "/solutions/businesses", description: "Move faster on legal questions without losing control." },
            { label: "Education", href: "/solutions/education", description: "Research built for learning, teaching and inquiry." },
          ],
        },
      ],
    },
    {
      label: "Trust",
      columns: [
        {
          title: "The evidence",
          links: [
            { label: "Sources & Verification", href: "/trust/verification", description: "Every legal answer should lead you back to the law." },
            { label: "Security & Privacy", href: "/trust/security", description: "Designed for the expectations of professional legal work." },
          ],
        },
      ],
    },
  ] satisfies NavGroup[],
  links: [
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ] satisfies NavLink[],
  signIn: { label: "Sign in", href: "/sign-in" },
  cta: { label: "Book a Demo", href: "/book-a-demo" },
};

export const hero = {
  headline: ["Legal intelligence", "you can verify."],
  body: "Research legislation, case law and legal documents with AI grounded in jurisdiction-specific legal sources.",
  primaryCta: { label: "Start Free", href: "/sign-up" },
  secondaryCta: { label: "Book a Demo", href: "/book-a-demo" },
  strip: ["Grounded in legal sources", "Verify every authority"],
  // Drop the final film at /public/media/hero.mp4 (+ optional .webm) and set `src`.
  media: {
    src: null as string | null,
    srcWebm: null as string | null,
    poster: "/media/hero-placeholder.png",
  },
  // Product moments layered over the film. Illustrative only — not legal advice.
  moment: {
    question: "What notice applies when terminating an employment contract?",
    answer:
      "The notice period depends on the employee's length of service and the terms of the contract. Both the statute and the contract should be reviewed together.",
    citations: [
      { n: 1, title: "Law N° 66/2018 regulating labour in Rwanda", detail: "Provisions on termination and notice" },
      { n: 2, title: "Employment contract", detail: "Clause on notice of termination" },
    ],
    chip: "Law N° 66/2018 · Termination",
  },
};
