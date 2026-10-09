// Inner-page content. Sources: IST_Legal_Website_Copy_Merged.docx and the agreed content
// architecture. Pages follow the Elyte service-page structure (hero → statement → feature →
// steps → image band → who-for → FAQ). No invented metrics, logos or certifications.
import type { IconName } from "@/components/icons";
import type { SceneName } from "@/components/scenes";

export type Cta = { label: string; href: string };

export const APP_URL = "https://istlegal.ai/rw";
export const CONTACT_EMAIL = "info@istlegal.ai";

export type DetailPage = {
  meta: { title: string; description: string };
  hero: { label: string; title: string; body: string; primary: Cta; secondary: Cta; image?: string };
  heroVariant?: "photo" | "product" | "plain";
  heroScene?: { scene: SceneName; caption: string; tag: string };
  statement: { label: string; text: string; chipsLabel?: string; chips?: string[] };
  feature?: {
    label: string;
    heading: string;
    items: { title: string; body: string }[];
    scene?: SceneName;
    image?: string;
    caption: { title: string; tag: string };
  };
  steps?: { heading: string; items: { title: string; body: string }[] };
  tools?: boolean;
  band?: { image?: string; label: string; heading: string; items: string[]; cta: Cta };
  who?: { label: string; heading: string; body: string; cta: Cta };
  faq?: { q: string; a: string }[];
};

const startFree: Cta = { label: "Start Free", href: APP_URL };
const bookDemo: Cta = { label: "Book a Demo", href: "/book-a-demo" };

/* ── Platform pages ───────────────────────────────────────────────────── */

export const productPages: Record<string, DetailPage> = {
  "ai-legal-assistant": {
    meta: {
      title: "AI Assistant | IST Legal",
      description: "AI-powered assistant built for legal professionals using trusted jurisdiction-specific legal intelligence.",
    },
    hero: {
      label: "AI Legal Assistant",
      title: "Ask legal questions. Get answers you can trace.",
      body: "Use natural language to explore legal questions, identify relevant authorities and continue your research without losing sight of the underlying sources.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "product",
    heroScene: { scene: "assistant", caption: "AI Legal Assistant", tag: "Rwanda · Labour law · Illustrative" },
    statement: {
      label: "Legal answers you can rely on",
      text: "Legal professionals need answers they can defend — not guesses. IST Legal combines AI with jurisdiction-specific legislation, case law, judicial decisions and regulatory materials, and every response is designed to support legal reasoning while encouraging verification.",
      chipsLabel: "What you can do:",
      chips: [
        "Ask legal questions in natural language",
        "Receive AI-powered legal explanations",
        "Discover relevant legislation and case law",
        "Summarize lengthy legal documents",
        "Compare legal authorities",
        "Draft legal content faster",
      ],
    },
    feature: {
      label: "In the product",
      heading: "Ask the question the way you would ask a colleague",
      items: [
        { title: "Ask in natural language", body: "Start with the legal question instead of complex search syntax." },
        { title: "Work in the right area of law", body: "Choose the practice area so the answer starts in the right context." },
        { title: "Review supporting references", body: "Move from AI-assisted analysis back to the underlying legal authority." },
        { title: "Continue the conversation", body: "Refine the question as the legal issue develops." },
      ],
      scene: "categories",
      caption: { title: "Practice areas", tag: "Choose the area of law" },
    },
    steps: {
      heading: "How it works",
      items: [
        { title: "Ask", body: "Ask a legal question in plain language." },
        { title: "Search", body: "IST Legal searches trusted, jurisdiction-specific legal sources." },
        { title: "Analyze", body: "AI analyzes the relevant authorities." },
        { title: "Review", body: "Review the supporting references behind the answer." },
        { title: "Continue", body: "Continue working with confidence — with professional judgment in control." },
      ],
    },
    band: {
      image: "/media/stills/approach.jpg",
      label: "Why IST Legal",
      heading: "Purpose-built legal intelligence",
      items: [
        "Transparent legal references",
        "Jurisdiction-specific knowledge",
        "Multilingual support",
        "One platform for every legal workflow",
        "Professional judgment stays in control",
      ],
      cta: startFree,
    },
    who: {
      label: "Built for legal professionals",
      heading: "AI assists. Professional judgment decides.",
      body: "Unlike general AI tools built for broad conversations, IST Legal is purpose-built for lawyers, law firms, government institutions, businesses and law students — helping users move from research to decision with greater speed and confidence.",
      cta: bookDemo,
    },
  },

  "legal-research": {
    meta: {
      title: "Legal Research | IST Legal",
      description: "AI-powered legal research built for legal professionals using trusted jurisdiction-specific legal intelligence.",
    },
    hero: {
      label: "Legal Research",
      title: "Find the right authority faster.",
      body: "Search legislation, case law, regulations and other legal materials using natural language from one research experience.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "product",
    heroScene: { scene: "research", caption: "Legal Research", tag: "Rwanda · Illustrative" },
    statement: {
      label: "Research with confidence",
      text: "Legal research shouldn't require switching between multiple databases. IST Legal searches trusted legal sources from a single workspace, helping you locate relevant legislation, judicial decisions and legal principles faster.",
      chipsLabel: "What you'll gain:",
      chips: ["Faster research", "Higher confidence", "Better productivity", "Transparent legal citations", "Consistent legal analysis"],
    },
    feature: {
      label: "In the product",
      heading: "Search the law, not a list of keywords",
      items: [
        { title: "Natural-language research", body: "Search using an issue, question or legal concept." },
        { title: "Relevant legal sources", body: "Bring legislation, case law and related material into one research flow." },
        { title: "AI-assisted analysis", body: "Understand why an authority may be relevant before opening the full source." },
        { title: "Verifiable references", body: "Continue directly into the authority supporting the analysis." },
      ],
      scene: "citations",
      caption: { title: "Sources & Verification", tag: "Illustrative" },
    },
    steps: {
      heading: "How it works",
      items: [
        { title: "Search", body: "Describe the issue, facts or question you are researching." },
        { title: "Review", body: "Review AI-generated insights alongside the results." },
        { title: "Verify", body: "Open the authorities and confirm them before relying on the analysis." },
        { title: "Export", body: "Take your research into your legal workflow." },
      ],
    },
    band: {
      image: "/media/stills/businesses.jpg",
      label: "Use cases",
      heading: "Useful across everyday legal research",
      items: ["Litigation preparation", "Legal opinions", "Policy research", "Compliance research", "Academic research", "Corporate legal analysis"],
      cta: startFree,
    },
    who: {
      label: "Why professionals choose IST Legal",
      heading: "Designed specifically for legal practice",
      body: "IST Legal delivers jurisdiction-specific intelligence rather than generic AI responses — so you can reduce research time and focus on providing better legal advice.",
      cta: bookDemo,
    },
  },

  "case-law": {
    meta: {
      title: "Case Law | IST Legal",
      description: "AI-powered case law research built for legal professionals using trusted jurisdiction-specific legal intelligence.",
    },
    hero: {
      label: "Case Law",
      title: "Find precedent. Understand the reasoning.",
      body: "Search judicial decisions by issue, facts or question and move beyond keyword matching to understand how courts have interpreted the law.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "product",
    heroScene: { scene: "caseLaw", caption: "Case Law", tag: "Illustrative judgment" },
    statement: {
      label: "Go beyond keyword search",
      text: "Understand how courts have interpreted the law, not just where keywords appear. AI helps identify the most relevant precedents and summarizes judicial reasoning — while the original judgment stays one click away.",
      chipsLabel: "Built for better case analysis:",
      chips: ["Analyze judgments faster", "Compare similar decisions", "Identify legal principles", "Strengthen legal arguments", "Access supporting authorities"],
    },
    feature: {
      label: "In the product",
      heading: "Get to the reasoning faster",
      items: [
        { title: "Search beyond keywords", body: "Find cases through the legal issue or facts you are working with." },
        { title: "Understand the decision", body: "Surface the facts, reasoning and outcome more quickly." },
        { title: "Compare authorities", body: "Explore related decisions around the same question." },
        { title: "Open the original judgment", body: "Keep the source available throughout your research." },
      ],
      scene: "citations",
      caption: { title: "Supporting authorities", tag: "Illustrative" },
    },
    steps: {
      heading: "How it works",
      items: [
        { title: "Search", body: "Search by issue, facts or question." },
        { title: "Summarize", body: "Review AI summaries of the facts, issues, reasoning and outcome." },
        { title: "Compare", body: "Compare decisions and see where the reasoning differs." },
        { title: "Verify", body: "Access the supporting authorities and the full judgment." },
      ],
    },
    band: {
      image: "/media/stills/approach.jpg",
      label: "Stronger arguments",
      heading: "Find the precedent behind the question",
      items: ["Prepare submissions", "Support legal opinions", "Analyze disputes", "Explore how legal principles developed"],
      cta: startFree,
    },
    who: {
      label: "Why IST Legal",
      heading: "Built specifically for legal research",
      body: "Transparent citations and jurisdiction-aware AI help you find stronger precedents in less time.",
      cta: bookDemo,
    },
  },

  legislation: {
    meta: {
      title: "Legislation | IST Legal",
      description: "AI-powered legislation search built for legal professionals using trusted jurisdiction-specific legal intelligence.",
    },
    hero: {
      label: "Legislation",
      title: "Find the law. Understand the provision.",
      body: "Search legislation using natural language, identify relevant provisions and keep a clear route back to the original legal text.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "product",
    heroScene: { scene: "legislation", caption: "Legislation", tag: "Rwanda · Illustrative" },
    statement: {
      label: "Stay current with the law",
      text: "Locate applicable laws quickly using AI-powered search designed for legal professionals. AI summarizes lengthy statutes and highlights relevant provisions while preserving links to the original legal sources.",
      chipsLabel: "Useful wherever legislation drives the decision:",
      chips: ["Policy", "Compliance", "Contracts", "Corporate legal work", "Litigation", "Academic research"],
    },
    feature: {
      label: "In the product",
      heading: "See the provision in its source",
      items: [
        { title: "Search legislation naturally", body: "Search by topic, issue or legal question." },
        { title: "Navigate to the provision", body: "Move through laws, chapters and articles to what matters." },
        { title: "Understand lengthy language", body: "Use AI-assisted summaries before reading the full text." },
        { title: "Return to the original", body: "Keep the official wording in view to verify context." },
      ],
      scene: "research",
      caption: { title: "Find the applicable law", tag: "Rwanda · Illustrative" },
    },
    steps: {
      heading: "How it works",
      items: [
        { title: "Search", body: "Search legislation by topic, issue or question." },
        { title: "Summarize", body: "Review summaries of lengthy statutes." },
        { title: "Verify", body: "Check the provision in the original legal text." },
        { title: "Continue", body: "Continue your legal work with the authority in hand." },
      ],
    },
    band: {
      image: "/media/stills/government.jpg",
      label: "Why IST Legal",
      heading: "One trusted platform for legislation and case law",
      items: ["Locate applicable laws quickly", "Summarize lengthy statutes", "Identify relevant provisions", "Keep links to the original sources"],
      cta: startFree,
    },
    who: {
      label: "Explore legislation",
      heading: "Access legal information with greater speed and confidence",
      body: "Whether the question is about compliance, contracts or policy, IST Legal helps you get to the applicable law — and keeps the source text at the centre of the work.",
      cta: bookDemo,
    },
  },

  "contract-review": {
    meta: {
      title: "Contract Review & Document Drafting | IST Legal",
      description: "AI-powered contract review & document drafting built for legal professionals using trusted jurisdiction-specific legal intelligence.",
    },
    hero: {
      label: "Contract Review & Drafting",
      title: "Review contracts faster. Draft with more control.",
      body: "Use AI to help identify important clauses, obligations, risks and inconsistencies while keeping professional review at the centre of the process.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "product",
    heroScene: { scene: "contract", caption: "Contract Review", tag: "Illustrative contract" },
    statement: {
      label: "Reduce manual review",
      text: "Manual contract review is time-consuming and repetitive. IST Legal helps identify key clauses, obligations, risks and inconsistencies so legal professionals can focus on strategic judgment.",
      chipsLabel: "Surface what deserves attention:",
      chips: ["Key clauses", "Obligations", "Risks", "Inconsistencies", "Missing information"],
    },
    feature: {
      label: "In the product",
      heading: "Start with the document",
      items: [
        { title: "Document analysis", body: "Work through lengthy legal documents more efficiently." },
        { title: "Clause review", body: "Identify important clauses, obligations, risks and inconsistencies." },
        { title: "AI-assisted drafting", body: "Accelerate first drafts and revisions." },
        { title: "Professional oversight", body: "The lawyer stays in control of the final interpretation and document." },
      ],
      scene: "draft",
      caption: { title: "Draft and export", tag: "Memo · Illustrative" },
    },
    steps: {
      heading: "How it works",
      items: [
        { title: "Upload", body: "Upload a contract or legal document." },
        { title: "Analyze", body: "Receive AI insights on clauses, obligations and risks." },
        { title: "Review", body: "Review the highlighted issues against the document and the law." },
        { title: "Refine", body: "Refine the document and accelerate drafting." },
        { title: "Export", body: "Export your work and continue the matter." },
      ],
    },
    band: {
      image: "/media/stills/law-firms.jpg",
      label: "Why legal teams choose IST Legal",
      heading: "Turn review into higher-value legal work",
      items: ["Increase productivity", "Improve consistency", "Reduce review time", "Support legal quality across the organization"],
      cta: startFree,
    },
    who: {
      label: "Review remains a professional decision",
      heading: "Suggestions are reviewed, not rubber-stamped",
      body: "AI-generated suggestions should be reviewed against the document, the applicable law and the objectives of the matter before they are accepted. IST Legal keeps the legal professional responsible for the final document.",
      cta: bookDemo,
    },
  },

  "workflow-tools": {
    meta: {
      title: "Workflow Tools | IST Legal",
      description: "Client intake, e-signing, playbooks, translation, timelines and more — the work around legal research in one platform.",
    },
    hero: {
      label: "Workflow Tools",
      title: "Legal work does not stop at research.",
      body: "Support the processes surrounding matters, documents and recurring legal work with tools that extend IST Legal beyond research alone.",
      primary: bookDemo,
      secondary: startFree,
    },
    heroVariant: "product",
    heroScene: { scene: "matters", caption: "Matters & Workflows", tag: "Illustrative matter" },
    statement: {
      label: "Beyond research",
      text: "Research is only one part of legal work. IST Legal extends into the work around it — intake, documents, signing, recurring procedures, translation, chronology and shared legal knowledge.",
      chipsLabel: "Across the platform:",
      chips: ["Client Intake", "Workflows", "E-Signing", "Playbooks", "File Translation", "Timelines", "Publications"],
    },
    feature: {
      label: "Client intake",
      heading: "Start matters with better information",
      items: [
        { title: "Structured case details", body: "Clients describe the matter and the parties involved." },
        { title: "A clear document checklist", body: "Show clients which documents your team needs." },
        { title: "Secure upload", body: "Collect supporting material in one place." },
        { title: "The right lawyer", body: "Route the matter to the lawyer who will handle it." },
      ],
      scene: "intake",
      caption: { title: "Client Intake", tag: "Client portal · Illustrative" },
    },
    tools: true,
    band: {
      image: "/media/stills/approach.jpg",
      label: "Matters & workflows",
      heading: "From first document to final decision",
      items: ["Keep the work around a matter together", "Bring agreements and correspondence into the matter", "Turn events into a structured chronology", "Keep research close to the matter"],
      cta: bookDemo,
    },
    who: {
      label: "One environment",
      heading: "Bring more of your legal workflow into one platform",
      body: "Talk to us about which workflow tools fit your team today and how they connect to research and documents in IST Legal.",
      cta: bookDemo,
    },
  },
};

/* ── Solution pages ───────────────────────────────────────────────────── */

const solutionFaq = [
  { q: "Can I verify legal answers?", a: "Yes, through cited legal authorities. Review the source before relying on the analysis." },
  { q: "Does it replace lawyers?", a: "No. IST Legal augments professional expertise — interpretation and responsibility stay with you." },
  { q: "Can teams collaborate?", a: "Yes. Enterprise capabilities support organizational use — book a demo to discuss your team." },
];

export const solutionPages: Record<string, DetailPage> = {
  "law-firms": {
    meta: { title: "Law Firms Solutions | IST Legal", description: "Discover how IST Legal helps lawyers work faster with jurisdiction-specific legal AI." },
    hero: {
      label: "Law Firms",
      title: "Move from research to client work faster.",
      body: "Give lawyers one environment for legal research, authorities, documents and recurring workflows — so the firm spends less time finding information and more time applying legal judgment.",
      primary: bookDemo,
      secondary: startFree,
      image: "/media/stills/law-firms.jpg",
    },
    statement: {
      label: "The work that slows you down",
      text: "Research spread across databases, documents buried in folders, repeated drafting and inconsistent processes can slow down even experienced teams.",
      chipsLabel: "Where it fits into your day:",
      chips: ["Prepare cases and draft submissions", "Review contracts", "Answer client questions", "Research authorities", "Standardize legal work", "Onboard associates", "Manage institutional knowledge"],
    },
    feature: {
      label: "Where IST Legal steps in",
      heading: "Bring core legal work together",
      items: [
        { title: "Stronger research behind every matter", body: "Search authorities, analyze precedent and verify the sources supporting an argument." },
        { title: "More consistency across the firm", body: "Use shared workflows, playbooks and legal knowledge for repeatable work." },
        { title: "Associates productive faster", body: "Give new team members research, processes and knowledge in one place." },
        { title: "Contracts reviewed with care", body: "Surface clauses, obligations and risks before the client sees the draft." },
      ],
      scene: "contract",
      caption: { title: "Contract Review", tag: "Illustrative contract" },
    },
    steps: {
      heading: "What you get back",
      items: [
        { title: "Time", body: "Win back time for legal analysis, not document hunting." },
        { title: "Accuracy", body: "Improve accuracy with verifiable legal references." },
        { title: "Collaboration", body: "Increase productivity and collaboration across the firm." },
        { title: "Decisions", body: "Reduce legal risk and make faster, better-informed decisions." },
      ],
    },
    band: {
      image: "/media/stills/government.jpg",
      label: "Not just another AI chatbot",
      heading: "Designed to assist lawyers, not replace them",
      items: ["Grounded in jurisdiction-specific legal sources", "Transparent citations", "Professional legal workflows", "Interpretation stays with the firm"],
      cta: bookDemo,
    },
    who: {
      label: "Ready to work this way?",
      heading: "Empower every lawyer in your firm",
      body: "See how IST Legal fits your firm's practice areas, workflows and the way your team works with clients.",
      cta: { label: "Book a Firm Demo", href: "/book-a-demo" },
    },
    faq: solutionFaq,
  },

  government: {
    meta: { title: "Government Solutions | IST Legal", description: "Discover how IST Legal helps government work faster with jurisdiction-specific legal AI." },
    hero: {
      label: "Government",
      title: "Legal intelligence for public-sector decisions.",
      body: "Support policy analysis, regulatory interpretation, compliance reviews and legal advisory work with AI connected to relevant legal authorities.",
      primary: bookDemo,
      secondary: startFree,
      image: "/media/stills/government.jpg",
    },
    statement: {
      label: "The work that slows you down",
      text: "Policy and administrative decisions need a clear legal basis — but legal sources are fragmented, validation is slow, and the pressure to deliver accurate outcomes keeps growing.",
      chipsLabel: "Where it fits into your day:",
      chips: ["Policy analysis", "Regulatory interpretation", "Compliance reviews", "Legal advisory work", "Research for public administration"],
    },
    feature: {
      label: "Where IST Legal steps in",
      heading: "Move from legal question to supporting authority faster",
      items: [
        { title: "Policy and regulatory analysis", body: "Understand relevant provisions and compare legal authorities." },
        { title: "Reasoning that can be traced", body: "Keep the underlying authority accessible so analysis can be reviewed and challenged." },
        { title: "Recurring public-sector work", body: "Support compliance reviews and legal advisory work." },
        { title: "Built for institutions", body: "Designed with institutional teams and structured access in mind." },
      ],
      scene: "legislation",
      caption: { title: "Legislation", tag: "Rwanda · Illustrative" },
    },
    steps: {
      heading: "What you get back",
      items: [
        { title: "Time", body: "Spend less time locating legislation and decisions." },
        { title: "Accuracy", body: "Improve accuracy with verifiable legal references." },
        { title: "Traceability", body: "Make the reasoning behind decisions easier to follow." },
        { title: "Confidence", body: "Support evidence-based public administration." },
      ],
    },
    band: {
      image: "/media/stills/security.jpg",
      label: "Built with organizational use in mind",
      heading: "Security and access for institutions",
      items: ["Structured access for institutional teams", "Privacy and responsible data handling", "Enterprise deployments available", "Requirements discussed directly with our team"],
      cta: { label: "Security & Privacy", href: "/assurance/security" },
    },
    who: {
      label: "Explore IST Legal for your institution",
      heading: "Empower your institution with AI built for legal work",
      body: "Talk to us about your institution's legal workflows, access requirements and deployment needs.",
      cta: { label: "Book a Government Demo", href: "/book-a-demo" },
    },
    faq: solutionFaq,
  },

  businesses: {
    meta: { title: "Businesses Solutions | IST Legal", description: "Discover how IST Legal helps businesses work faster with jurisdiction-specific legal AI." },
    hero: {
      label: "Businesses",
      title: "Move faster on legal questions without losing control.",
      body: "Review contracts, understand regulatory requirements and support business decisions with AI built around legal sources and professional workflows.",
      primary: bookDemo,
      secondary: startFree,
      image: "/media/stills/businesses.jpg",
    },
    statement: {
      label: "The work that slows you down",
      text: "Commercial teams need to understand contracts, obligations and regulatory requirements quickly — while keeping legal risk visible. Legal work shouldn't become a bottleneck to every decision.",
      chipsLabel: "Where it fits into your day:",
      chips: ["Review commercial contracts", "Monitor regulations", "Support procurement", "Compliance", "Reduce legal risk", "Support business decisions"],
    },
    feature: {
      label: "Where IST Legal steps in",
      heading: "Review commercial contracts more efficiently",
      items: [
        { title: "Contracts, clause by clause", body: "Identify clauses, obligations, risks and inconsistencies before escalating." },
        { title: "Compliance and regulation", body: "Research relevant requirements that may affect the organization." },
        { title: "Procurement and operations", body: "Support recurring legal questions around agreements and operations." },
        { title: "The source behind the answer", body: "Review supporting authorities before relying on analysis." },
      ],
      scene: "contract",
      caption: { title: "Contract Review", tag: "Illustrative contract" },
    },
    steps: {
      heading: "What you get back",
      items: [
        { title: "Speed", body: "Move faster on everyday legal questions." },
        { title: "Visibility", body: "Keep legal risk visible in commercial decisions." },
        { title: "Accuracy", body: "Improve accuracy with verifiable legal references." },
        { title: "Control", body: "Escalate what needs deeper legal judgment." },
      ],
    },
    band: {
      image: "/media/stills/law-firms.jpg",
      label: "Not just another AI chatbot",
      heading: "Legal context for business decisions",
      items: ["Grounded in jurisdiction-specific legal sources", "Transparent citations", "Built around legal workflows", "Professional judgment stays in control"],
      cta: bookDemo,
    },
    who: {
      label: "Ready to work this way?",
      heading: "Give your organization faster access to legal intelligence",
      body: "See how IST Legal supports contracts, compliance and the legal questions your teams face every day.",
      cta: { label: "Book a Business Demo", href: "/book-a-demo" },
    },
    faq: solutionFaq,
  },

  education: {
    meta: { title: "Education Solutions | IST Legal", description: "Discover how IST Legal helps students and institutions with jurisdiction-specific legal AI." },
    hero: {
      label: "Education",
      title: "Legal research built for learning, teaching and inquiry.",
      body: "Help students and academic institutions explore case law, understand legislation and develop stronger research habits with AI that keeps legal sources visible.",
      primary: startFree,
      secondary: { label: "Talk to Us About Education", href: "/book-a-demo" },
      image: "/media/stills/education.jpg",
    },
    statement: {
      label: "Study smarter",
      text: "Start with the question, then follow the authority. IST Legal encourages students to treat cited sources as the starting point for deeper research — not to treat AI output as the final answer.",
      chipsLabel: "Where it fits:",
      chips: ["Research assignments", "Case law analysis", "Exam preparation", "Understanding legislation", "Academic legal research"],
    },
    feature: {
      label: "Where IST Legal steps in",
      heading: "Understand case law more clearly",
      items: [
        { title: "Facts, issues and reasoning", body: "Explore a decision's reasoning before returning to the full judgment." },
        { title: "Legislation made navigable", body: "See how provisions connect to the issue being studied." },
        { title: "Better research habits", body: "Inspect the authority behind every answer." },
        { title: "Institutions and learners", body: "Support research, teaching and structured access for students." },
      ],
      scene: "caseLaw",
      caption: { title: "Case Law", tag: "Illustrative judgment" },
    },
    steps: {
      heading: "What you get back",
      items: [
        { title: "Understanding", body: "Get to the reasoning of a decision faster." },
        { title: "Confidence", body: "Verify sources before you cite them." },
        { title: "Habits", body: "Build research habits you'll use in practice." },
        { title: "Continuity", body: "Learn on the kind of platform professionals use." },
      ],
    },
    band: {
      image: "/media/stills/approach.jpg",
      label: "For universities",
      heading: "Support institutions as well as individual learners",
      items: ["Research support for students", "Teaching with traceable sources", "Structured access for programs", "Talk to us about education access"],
      cta: { label: "Talk to Us About Education", href: "/book-a-demo" },
    },
    who: {
      label: "Explore a better way to study the law",
      heading: "Start with the question. Follow the authority.",
      body: "Students can start free; universities and legal education programs can talk to us about institutional access.",
      cta: startFree,
    },
    faq: solutionFaq,
  },
};

/* ── Assurance pages ──────────────────────────────────────────────────── */

export const assurancePages: Record<string, DetailPage> = {
  verification: {
    meta: { title: "Sources & Verification | IST Legal", description: "Every legal answer should lead you back to the law." },
    hero: {
      label: "Sources & Verification",
      title: "Every legal answer should lead you back to the law.",
      body: "IST Legal keeps AI-assisted analysis connected to the legal authorities supporting it, so users can review the source and apply professional judgment.",
      primary: startFree,
      secondary: bookDemo,
    },
    heroVariant: "plain",
    statement: {
      label: "AI analysis is not the legal source",
      text: "IST Legal distinguishes AI-assisted explanation from the underlying legislation, case law and other legal authority. When supporting authority is available, references help you identify the legal material connected to the answer.",
      chipsLabel: "Principles:",
      chips: ["Sources stay visible", "Verification is part of the workflow", "Professional judgment stays in control"],
    },
    feature: {
      label: "Follow the citation",
      heading: "From the answer back to the authority",
      items: [
        { title: "Review the analysis", body: "Understand what IST Legal is saying." },
        { title: "Inspect the authority", body: "Open the legal source behind the claim." },
        { title: "Apply professional judgment", body: "Decide whether the source supports the conclusion in your context." },
      ],
      scene: "citations",
      caption: { title: "Sources & Verification", tag: "Illustrative" },
    },
    steps: {
      heading: "Verify before you rely",
      items: [
        { title: "Review", body: "Read the AI-assisted analysis and the references attached to it." },
        { title: "Inspect", body: "Open the cited legislation or decision and read the provision in context." },
        { title: "Decide", body: "Apply professional judgment before using the analysis in your work." },
      ],
    },
    band: {
      label: "Jurisdiction changes the answer",
      heading: "Legal systems differ",
      items: ["Built around jurisdiction-specific legal information", "No assumption that the same authority applies everywhere", "Sources tied to the law that applies to you"],
      cta: startFree,
    },
    who: {
      label: "Confidence comes from traceability",
      heading: "The goal is not to make AI appear certain",
      body: "The goal is to give legal professionals a faster route to the information they need — and a clearer way to verify it.",
      cta: bookDemo,
    },
  },

  security: {
    meta: { title: "Security & Privacy | IST Legal", description: "Designed for the expectations of professional legal work." },
    hero: {
      label: "Security & Privacy",
      title: "Designed for the expectations of professional legal work.",
      body: "Legal information can be sensitive. IST Legal is designed with organizational access, privacy and responsible data handling in mind.",
      primary: { label: "Talk to Us About Security", href: "/book-a-demo" },
      secondary: startFree,
    },
    heroVariant: "plain",
    statement: {
      label: "Our approach",
      text: "Security for legal work is about who can access what, how sensitive information is handled, and how organizations keep oversight. Specific controls, hosting and certifications are confirmed directly with our team for your requirements.",
      chipsLabel: "Designed around:",
      chips: ["Organizational access", "Permission controls", "Privacy", "Responsible data handling", "Organizational oversight"],
    },
    steps: {
      heading: "How we think about it",
      items: [
        { title: "Access", body: "Organizational access and permission controls help teams manage how IST Legal is used across users and responsibilities." },
        { title: "Protection", body: "Technical and organizational safeguards are designed to protect information handled by the platform." },
        { title: "Oversight", body: "Administrative controls support how organizations manage users, access and platform usage." },
      ],
    },
    band: {
      label: "Deployment",
      heading: "Built for organizational use",
      items: ["Enterprise deployments and custom implementations", "Requirements reviewed with your team", "Questions about data handling answered directly"],
      cta: { label: "Contact Us", href: "/book-a-demo" },
    },
    who: {
      label: "Questions about your requirements?",
      heading: "Speak with the IST Legal team",
      body: "Talk to us about security, privacy, deployment and your organization's requirements.",
      cta: { label: "Talk to Us About Security", href: "/book-a-demo" },
    },
  },
};

/* ── Platform overview ────────────────────────────────────────────────── */

export const platformOverview = {
  meta: { title: "Platform | IST Legal", description: "One legal workspace — AI assistance, research, case law, legislation, documents and workflows." },
  hero: {
    label: "IST Legal Platform",
    title: "One legal workspace. From research to action.",
    body: "IST Legal brings AI assistance, legal research, case law, legislation, document review, drafting and supporting workflows into one connected platform.",
    primary: startFree,
    secondary: bookDemo,
    image: "/media/stills/verification.jpg",
  },
  jurisdiction: {
    label: "Built around the law you work with",
    text: "Legal intelligence is jurisdiction-specific by nature. Laws, courts, terminology and legal authority vary by jurisdiction — IST Legal is built around that reality rather than treating legal information as interchangeable.",
    chipsLabel: "Choose the jurisdiction. Research within its legal sources. Verify the authority.",
  },
};

/* ── Pricing ──────────────────────────────────────────────────────────── */

export const pricing = {
  meta: { title: "Pricing | IST Legal", description: "Start individually or talk to us about access for your team, institution or organization." },
  hero: {
    label: "Pricing",
    title: "Choose how you want to work with IST Legal.",
    body: "Start individually, or speak with us about access for your team, institution or organization.",
    image: "/media/stills/businesses.jpg",
  },
  plans: [
    {
      name: "Individual",
      audience: "For lawyers, researchers and students who want direct access to IST Legal.",
      includes: ["AI Legal Assistant", "Legal research across practice areas", "References to legal authorities", "Free trial credits to get started"],
      cta: { label: "Start Free", href: APP_URL },
      featured: false,
    },
    {
      name: "Team",
      audience: "For law firms and businesses that need shared access and collaborative legal workflows.",
      includes: ["Everything in Individual", "Shared access for your team", "Document review and drafting", "Workflow tools"],
      cta: { label: "Talk to Sales", href: "/book-a-demo" },
      featured: true,
    },
    {
      name: "Enterprise & Institutions",
      audience: "For government institutions, universities and larger organizations with administrative and deployment requirements.",
      includes: ["Everything in Team", "Organizational access and oversight", "Deployment options discussed with you", "Dedicated onboarding"],
      cta: { label: "Book a Demo", href: "/book-a-demo" },
      featured: false,
    },
  ],
  note: "Plan limits and prices are confirmed at sign-up or with our team.",
  faq: [
    { q: "Can I try IST Legal before paying?", a: "Yes. You can get started before committing to an organizational plan. Exact limits depend on the current offering." },
    { q: "Do you offer team plans?", a: "Yes. IST Legal supports organizational use for legal teams and institutions — talk to us about your team." },
    { q: "Do you offer education access?", a: "Students can start individually. Universities and legal education programs can contact us about institutional access." },
  ],
};

/* ── Resources ────────────────────────────────────────────────────────── */

export const resources = {
  meta: { title: "Resources | IST Legal", description: "Practical guidance for using IST Legal across research, documents and workflows." },
  hero: {
    label: "Resources",
    title: "Learn how to get more from IST Legal.",
    body: "Practical guidance for using the platform across legal research, documents and workflows.",
    image: "/media/stills/education.jpg",
  },
  cards: [
    { icon: "assistant", title: "Getting started", body: "Learn the fundamentals of working in IST Legal." },
    { icon: "research", title: "AI Legal Assistant", body: "Ask better legal questions and review supporting authorities." },
    { icon: "caseLaw", title: "Research & Case Law", body: "Search, compare and verify legal materials." },
    { icon: "contract", title: "Documents", body: "How document analysis and drafting workflows work." },
    { icon: "workflow", title: "Workflow Tools", body: "Intake, e-signing, playbooks, translation and more." },
    { icon: "security", title: "Account & Organization", body: "Manage account and organizational settings." },
  ] satisfies { icon: IconName; title: string; body: string }[],
  status: "Guide coming soon",
};

/* ── Book a demo ──────────────────────────────────────────────────────── */

export const bookDemoPage = {
  meta: { title: "Book a Demo | IST Legal", description: "See IST Legal in the context of your legal work." },
  hero: {
    label: "Book a Demo",
    title: "See IST Legal in the context of your legal work.",
    body: "Tell us what kind of legal work your team handles and we'll tailor the conversation around the parts of IST Legal most relevant to you.",
    image: "/media/stills/approach.jpg",
  },
  interests: ["Legal research", "Case law", "Legislation", "Contract review", "Government use", "Business use", "Education", "Workflow tools", "Other"],
  teamSizes: ["Just me", "2–10", "11–50", "51–200", "200+"],
  expect: [
    { title: "A conversation about your work", body: "We start with the legal work your team handles." },
    { title: "A walkthrough that fits", body: "We show the parts of IST Legal most relevant to you." },
    { title: "Clear next steps", body: "Access, onboarding and any requirements you have." },
  ],
};

/* ── About ────────────────────────────────────────────────────────────── */

export const about = {
  meta: { title: "About | IST Legal", description: "IST Legal is an AI-powered legal intelligence and research platform built around trusted, jurisdiction-specific legal sources." },
  hero: {
    label: "About IST Legal",
    title: "Legal intelligence, built around the law.",
    body: "IST Legal is an AI-powered legal intelligence and research platform built around trusted, jurisdiction-specific legal sources.",
    image: "/media/stills/government.jpg",
  },
  statement: {
    label: "What we believe",
    text: "Generic AI generates answers. IST Legal provides legal intelligence users can verify — clearly distinguishing AI-generated analysis from the underlying legal sources so professionals can review authorities, verify outputs and apply their own judgment.",
  },
  principles: [
    { icon: "caseLaw", title: "Legal first", body: "The experience belongs to the world of professional legal work." },
    { icon: "verification", title: "Trustworthy", body: "Sources, citations, verification, privacy and professional judgment matter." },
    { icon: "legislation", title: "Jurisdiction-aware", body: "Jurisdiction-specific legal information is fundamental to the product." },
    { icon: "government", title: "Built for legal systems", body: "Built around the realities and requirements of legal systems." },
  ] satisfies { icon: IconName; title: string; body: string }[],
};
