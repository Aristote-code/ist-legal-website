// Shared by the widget (browser) and the API (server). Keep it free of
// browser- or Node-only imports.

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const STATUSES = ["new", "planned", "in_progress", "done", "wont_do"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  planned: "Planned",
  in_progress: "In progress",
  done: "Done",
  wont_do: "Won't do",
};

export type CategoryIcon = "bug" | "idea" | "sources" | "usability" | "other";

type Localized = Record<Locale, string>;

export type Category = {
  id: string;
  icon: CategoryIcon;
  label: Localized;
  /** Placeholder for the description box, tailored to the category. */
  prompt: Localized;
  /** Heading above the post-type chips. */
  postTypeLabel: Localized;
  postTypes: { id: string; label: Localized }[];
};

export const CATEGORIES: Category[] = [
  {
    id: "bug",
    icon: "bug",
    label: { en: "Bug", fr: "Bogue" },
    prompt: {
      en: "What happened, and what did you expect instead? Steps to reproduce help us fix it faster.",
      fr: "Que s’est-il passé, et à quoi vous attendiez-vous ? Les étapes pour reproduire le problème nous aident à le corriger plus vite.",
    },
    postTypeLabel: { en: "How serious is it?", fr: "Quelle est la gravité ?" },
    postTypes: [
      { id: "blocker", label: { en: "Blocks my work", fr: "Bloque mon travail" } },
      { id: "major", label: { en: "Major, with a workaround", fr: "Important, avec un contournement" } },
      { id: "minor", label: { en: "Minor or cosmetic", fr: "Mineur ou visuel" } },
    ],
  },
  {
    id: "idea",
    icon: "idea",
    label: { en: "Feature request", fr: "Suggestion de fonctionnalité" },
    prompt: {
      en: "What would you like IST Legal to do? Tell us which part of your legal work it would help with.",
      fr: "Que souhaiteriez-vous qu’IST Legal fasse ? Dites-nous quelle partie de votre travail juridique cela faciliterait.",
    },
    postTypeLabel: { en: "Post type", fr: "Type" },
    postTypes: [
      { id: "new_feature", label: { en: "New feature", fr: "Nouvelle fonctionnalité" } },
      { id: "improvement", label: { en: "Improvement", fr: "Amélioration" } },
    ],
  },
  {
    id: "sources",
    icon: "sources",
    label: { en: "Legal sources & citations", fr: "Sources juridiques et citations" },
    prompt: {
      en: "Which law, judgment or citation is it about, in which jurisdiction, and what looked wrong?",
      fr: "De quelle loi, décision ou citation s’agit-il, dans quelle juridiction, et qu’est-ce qui semblait incorrect ?",
    },
    postTypeLabel: { en: "What's the issue?", fr: "Quel est le problème ?" },
    postTypes: [
      { id: "missing_source", label: { en: "Missing source", fr: "Source manquante" } },
      { id: "outdated", label: { en: "Outdated or repealed", fr: "Obsolète ou abrogé" } },
      { id: "wrong_citation", label: { en: "Wrong citation", fr: "Citation erronée" } },
      { id: "translation", label: { en: "Translation", fr: "Traduction" } },
    ],
  },
  {
    id: "usability",
    icon: "usability",
    label: { en: "Hard to use", fr: "Difficile à utiliser" },
    prompt: {
      en: "What were you trying to do, and where did you get stuck?",
      fr: "Que cherchiez-vous à faire, et où avez-vous été bloqué ?",
    },
    postTypeLabel: { en: "What's the problem?", fr: "Quel est le problème ?" },
    postTypes: [
      { id: "confusing", label: { en: "Confusing", fr: "Déroutant" } },
      { id: "slow", label: { en: "Slow", fr: "Lent" } },
      { id: "hard_to_find", label: { en: "Hard to find", fr: "Difficile à trouver" } },
    ],
  },
  {
    id: "other",
    icon: "other",
    label: { en: "Other", fr: "Autre" },
    prompt: {
      en: "Praise, questions, anything else on your mind.",
      fr: "Compliments, questions, ou tout autre sujet.",
    },
    postTypeLabel: { en: "Post type", fr: "Type" },
    postTypes: [
      { id: "praise", label: { en: "Praise", fr: "Compliment" } },
      { id: "question", label: { en: "Question", fr: "Question" } },
      { id: "other", label: { en: "Other", fr: "Autre" } },
    ],
  },
];

export function findCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export const LIMITS = {
  titleMin: 3,
  titleMax: 200,
  descriptionMax: 5000,
  /** Size of the base64 data URL, not the decoded image. */
  screenshotMaxChars: 3_000_000,
  metadataKeys: 20,
  metadataValueMax: 300,
};

/** What the widget sends to POST /api/feedback. */
export type FeedbackSubmission = {
  category: string;
  postType?: string | null;
  title: string;
  description?: string;
  email?: string | null;
  locale?: Locale;
  source: string;
  pageUrl?: string;
  metadata?: Record<string, string>;
  screenshot?: string | null;
  user?: { id: string; name?: string; email?: string; hash?: string } | null;
  /** Honeypot: real users never fill this in. */
  website?: string;
};

export type FeedbackRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  postType: string | null;
  title: string;
  description: string;
  status: Status;
  source: string;
  locale: string | null;
  pageUrl: string | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userVerified: boolean;
  metadata: Record<string, string>;
  hasScreenshot: boolean;
  screenshot?: string | null;
  internalNote: string;
};
