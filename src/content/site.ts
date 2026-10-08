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

// ── Homepage sections (Figma page 6:548, adapted to IST Legal) ──────────────

// Section 3 — feature walkthrough (Figma "Pillars" 6:815). Scenes are recreated from
// the IST Legal app UI; sample content is illustrative, not legal advice.
export const platform = {
  label: "The platform",
  heading: "One platform for serious legal work",
  features: [
    {
      numeral: "I",
      title: "Ask in plain language",
      description: "Describe the issue the way you would to a colleague. IST Legal works from jurisdiction-specific legal sources.",
      caption: "AI Legal Assistant",
      tag: "Rwanda · Labour law · Illustrative",
      href: "/platform/ai-legal-assistant",
      scene: "assistant",
    },
    {
      numeral: "II",
      title: "Work by area of law",
      description: "Choose from ten practice areas — from constitutional to contract law — so every answer starts in the right context.",
      caption: "Practice areas",
      tag: "10 areas of law",
      href: "/platform",
      scene: "categories",
    },
    {
      numeral: "III",
      title: "Answers you can verify",
      description: "Analysis stays connected to the authorities behind it. Open the source and apply your own judgment.",
      caption: "Sources & Verification",
      tag: "Illustrative",
      href: "/trust/verification",
      scene: "citations",
    },
    {
      numeral: "IV",
      title: "Draft and export",
      description: "Turn research into a structured memo or document and export it straight to Word.",
      caption: "Contract Review & Drafting",
      tag: "Memo · Export to Word",
      href: "/platform/contract-review",
      scene: "draft",
    },
    {
      numeral: "V",
      title: "Client intake",
      description: "Clients submit their matter and receive a clear list of the documents your team needs.",
      caption: "Workflow Tools",
      tag: "Client portal · Illustrative",
      href: "/platform/workflow-tools",
      scene: "intake",
    },
  ],
} as const;

// Section 4 — solutions (Figma "Services" 6:946)
export const solutions = {
  label: "Solutions",
  heading: "The same platform. Different kinds of legal work.",
  items: [
    { title: "Law Firms", href: "/solutions/law-firms", image: "/media/stills/law-firms.jpg", description: "Research authorities, prepare matters and review contracts with more consistency across the firm." },
    { title: "Government", href: "/solutions/government", image: "/media/stills/government.jpg", description: "Support policy analysis, regulatory interpretation, compliance reviews and legal advisory work." },
    { title: "Businesses", href: "/solutions/businesses", image: "/media/stills/businesses.jpg", description: "Review commercial agreements and understand legal requirements without losing control." },
    { title: "Education", href: "/solutions/education", image: "/media/stills/education.jpg", description: "Help students and institutions research case law and understand legislation." },
  ],
};

// Section 5 — supporting tools (Figma "Framework" 6:1060)
export const workflowTools = {
  label: "More across the platform",
  heading: "Legal work doesn't stop at the answer",
  items: [
    { icon: "workflow", title: "Workflows", description: "Turn repeatable work — research compilation, contract review, case briefs — into structured processes." },
    { icon: "esign", title: "E-Signing", description: "Prepare documents and follow them through to signature without leaving the platform." },
    { icon: "playbook", title: "Playbooks", description: "Capture procedures and checklists so recurring legal work is handled consistently." },
    { icon: "translate", title: "File Translation", description: "Translate legal documents while preserving the terminology and structure that matter." },
    { icon: "publications", title: "Publications", description: "Organise legal knowledge so your team can find it and reuse it." },
    { icon: "timeline", title: "Timelines", description: "Keep the milestones, deadlines and key events of a matter in view." },
  ],
} as const;

// Section 6 — assurance (Figma "Case studies" 6:1175)
export const assurance = {
  label: "Assurance",
  heading: "Keep judgment where it belongs",
  items: [
    {
      icon: "verification",
      eyebrow: "Sources & Verification",
      title: "AI analysis is not the legal source",
      body: "IST Legal distinguishes AI-generated analysis from the underlying legislation and case law. Review the cited authorities, open the original text, and apply your professional judgment before relying on an answer.",
      link: { label: "How verification works", href: "/trust/verification" },
      image: "/media/stills/verification.jpg",
    },
    {
      icon: "security",
      eyebrow: "Security & Privacy",
      title: "Designed for sensitive legal work",
      body: "Legal information is sensitive. IST Legal is designed with organisational access, privacy and responsible data handling in mind. Talk to us about your security and deployment requirements.",
      link: { label: "Security & Privacy", href: "/trust/security" },
      image: "/media/stills/security.jpg",
    },
  ],
  more: { label: "Explore Assurance", href: "/trust/verification" },
} as const;

// Section 7 — how it works (Figma "Our approach" 6:1278)
export const howItWorks = {
  label: "How it works",
  heading: "From question to authority",
  image: "/media/stills/approach.jpg",
  cta: { label: "Start Free", href: "/sign-up" },
  steps: [
    { title: "Ask", body: "Describe the issue in plain language and choose the area of law. IST Legal searches trusted, jurisdiction-specific legal sources." },
    { title: "Review the sources", body: "Read the analysis alongside the authorities it relies on. Open the cited legislation or decision and check it before relying on it." },
    { title: "Draft and continue", body: "Turn the research into a memo or document, export it to Word, and keep the matter moving — with professional judgment in control." },
  ],
};

// Section 9 — FAQ (Figma 6:1498). Answers from the website copy document.
export const faq = {
  label: "Questions & answers",
  heading: "Frequently Asked Questions",
  contact: { title: "Can’t find an answer to your question?", body: "Book a demo and talk to our team.", href: "/book-a-demo" },
  items: [
    { q: "Is IST Legal the same as ChatGPT?", a: "No. IST Legal is purpose-built for legal work using jurisdiction-specific legal sources and workflows." },
    { q: "Can I verify AI answers?", a: "Yes. Responses include references to relevant legal authorities where available, so you can review the source before relying on the analysis." },
    { q: "Does it replace lawyers?", a: "No. IST Legal augments professional expertise — interpretation, verification and application stay with the legal professional." },
    { q: "Who can use IST Legal?", a: "Lawyers, law firms, businesses, government institutions, universities and students." },
    { q: "Can organizations deploy it?", a: "Yes. Enterprise deployments and custom implementations are available — book a demo to discuss your requirements." },
  ],
};

// Footer (Figma 6:1601)
export const footer = {
  label: "Get started",
  heading: "Ready to practice smarter?",
  body: "Work smarter. Research faster. Practice with confidence — with AI built specifically for legal work.",
  image: "/media/stills/footer.jpg",
  updates: { title: "Sign up for updates", note: "Email updates are coming soon. In the meantime, book a demo to talk to our team." },
  cta: { label: "Start Free", href: "/sign-up" },
  contact: { email: "support@ist-legal.rw", phone: "+250 795 586 192" },
  columns: [
    { title: "Platform", links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "AI Legal Assistant", href: "/platform/ai-legal-assistant" },
      { label: "Workflow Tools", href: "/platform/workflow-tools" },
      { label: "Pricing", href: "/pricing" },
    ] },
    { title: "Company", links: [
      { label: "Solutions", href: "/solutions/law-firms" },
      { label: "Assurance", href: "/trust/verification" },
      { label: "Resources", href: "/resources" },
      { label: "Book a Demo", href: "/book-a-demo" },
    ] },
    { title: "Legal", links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ] },
  ],
  copyright: "Copyright © 2026 IST Legal",
  tagline: "Legal intelligence you can verify.",
};
