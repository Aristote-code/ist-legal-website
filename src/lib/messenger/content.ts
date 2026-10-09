import type { Locale } from "@/lib/feedback/config";

// Messenger text, plus the starter help centre and updates. The help centre and
// updates live in the database; the collections and
// updates below are only loaded into an empty database the first time it runs.
// Facts here come from the website copy (src/content); keep them in step.

type Localized = Record<Locale, string>;

export type HelpArticle = { id: string; title: Localized; body: Localized };
export type HelpCollection = { id: string; title: Localized; description: Localized; articles: HelpArticle[] };
export type Update = { id: string; date: string; title: Localized; body: Localized; imageUrl?: string };

export const HELP_COLLECTIONS: HelpCollection[] = [
  {
    id: "getting-started",
    title: { en: "Getting started", fr: "Premiers pas" },
    description: {
      en: "What IST Legal is and how to begin.",
      fr: "Ce qu’est IST Legal et comment commencer.",
    },
    articles: [
      {
        id: "what-is-ist-legal",
        title: { en: "What is IST Legal?", fr: "Qu’est-ce qu’IST Legal ?" },
        body: {
          en: "IST Legal is an AI-powered legal research platform grounded in jurisdiction-specific legal sources. It brings the AI Legal Assistant, legal research, case law, legislation, contract review and drafting, and workflow tools into one workspace.\n\nIt is built for lawyers, law firms, businesses, government institutions, universities and students.",
          fr: "IST Legal est une plateforme de recherche juridique assistée par l’IA, fondée sur des sources juridiques propres à chaque juridiction. Elle réunit l’Assistant juridique IA, la recherche juridique, la jurisprudence, la législation, la revue et la rédaction de contrats, ainsi que des outils de flux de travail.\n\nElle s’adresse aux avocats, cabinets, entreprises, institutions publiques, universités et étudiants.",
        },
      },
      {
        id: "start-free",
        title: { en: "How do I start using IST Legal?", fr: "Comment commencer avec IST Legal ?" },
        body: {
          en: "Choose **Start Free** on the website to create an individual account. You can get started before committing to an organizational plan; exact limits depend on the current offering.\n\nFor a team, institution or organization, **Book a Demo** and we will tailor the conversation to your work.",
          fr: "Choisissez **Commencer gratuitement** sur le site pour créer un compte individuel. Vous pouvez commencer avant de vous engager sur une offre pour votre organisation ; les limites exactes dépendent de l’offre en cours.\n\nPour une équipe, une institution ou une organisation, **réservez une démo** et nous adapterons l’échange à votre travail.",
        },
      },
      {
        id: "not-chatgpt",
        title: { en: "Is IST Legal the same as ChatGPT?", fr: "IST Legal est-il identique à ChatGPT ?" },
        body: {
          en: "No. IST Legal is purpose-built for legal work using jurisdiction-specific legal sources and workflows. It augments professional expertise: interpretation, verification and application stay with the legal professional.",
          fr: "Non. IST Legal est conçu pour le travail juridique, à partir de sources et de flux propres à chaque juridiction. Il complète l’expertise professionnelle : l’interprétation, la vérification et l’application restent du ressort du juriste.",
        },
      },
    ],
  },
  {
    id: "sources",
    title: { en: "Sources & verification", fr: "Sources et vérification" },
    description: {
      en: "How answers connect back to the law.",
      fr: "Comment les réponses renvoient au droit.",
    },
    articles: [
      {
        id: "verify-answers",
        title: { en: "How do I verify an AI answer?", fr: "Comment vérifier une réponse de l’IA ?" },
        body: {
          en: "Responses include references to relevant legal authorities where available. Before relying on an answer:\n\n- Review the analysis and the references attached to it\n- Open the cited legislation or decision and read the provision in context\n- Apply your professional judgment before using it in your work",
          fr: "Les réponses comportent des références aux sources juridiques pertinentes lorsqu’elles sont disponibles. Avant de vous y fier :\n\n- Lisez l’analyse et les références associées\n- Ouvrez la loi ou la décision citée et lisez la disposition dans son contexte\n- Exercez votre jugement professionnel avant de l’utiliser",
        },
      },
      {
        id: "report-a-source",
        title: { en: "A source is missing or out of date", fr: "Une source manque ou n’est plus à jour" },
        body: {
          en: "Open the messenger, choose **Leave us feedback**, then **Legal sources & citations**. Tell us the law, judgment or citation, the jurisdiction, and what looked wrong. The team reviews every report.",
          fr: "Ouvrez la messagerie, choisissez **Donnez-nous votre avis**, puis **Sources juridiques et citations**. Indiquez la loi, la décision ou la citation, la juridiction, et ce qui semblait incorrect. L’équipe examine chaque signalement.",
        },
      },
    ],
  },
  {
    id: "feedback",
    title: { en: "Feedback & bugs", fr: "Avis et bogues" },
    description: {
      en: "How to report a problem or suggest an idea.",
      fr: "Signaler un problème ou proposer une idée.",
    },
    articles: [
      {
        id: "report-a-bug",
        title: { en: "How to report a bug", fr: "Signaler un bogue" },
        body: {
          en: "Open the messenger, choose **Submit a ticket**, and describe what happened and what you expected. Choose **Take screenshot** to attach a picture of the page; it helps us find the problem faster.",
          fr: "Ouvrez la messagerie, choisissez **Envoyer un ticket**, et décrivez ce qui s’est passé et ce que vous attendiez. Choisissez **Capture d’écran** pour joindre une image de la page ; cela nous aide à trouver le problème plus vite.",
        },
      },
      {
        id: "what-happens-next",
        title: { en: "What happens after I send feedback?", fr: "Que se passe-t-il après l’envoi ?" },
        body: {
          en: "The IST Legal team reads every message and marks it as planned, in progress or done. If you left your email address or sent a message, we can reply to you directly.",
          fr: "L’équipe IST Legal lit chaque message et le marque comme prévu, en cours ou terminé. Si vous avez laissé votre adresse e-mail ou envoyé un message, nous pouvons vous répondre directement.",
        },
      },
    ],
  },
  {
    id: "plans-privacy",
    title: { en: "Plans, security & privacy", fr: "Offres, sécurité et confidentialité" },
    description: {
      en: "Access for teams, and how information is handled.",
      fr: "Accès pour les équipes et traitement des informations.",
    },
    articles: [
      {
        id: "team-plans",
        title: { en: "Do you offer team or institutional access?", fr: "Proposez-vous un accès pour les équipes ?" },
        body: {
          en: "Yes. IST Legal supports organizational use for law firms, businesses, government institutions and universities, including enterprise deployments and custom implementations. Plan limits and prices are confirmed at sign-up or with our team, so **Book a Demo** to discuss your requirements.",
          fr: "Oui. IST Legal prend en charge l’usage organisationnel pour les cabinets, entreprises, institutions publiques et universités, y compris des déploiements d’entreprise et des mises en œuvre sur mesure. Les limites et les prix sont confirmés à l’inscription ou avec notre équipe : **réservez une démo** pour en parler.",
        },
      },
      {
        id: "what-feedback-includes",
        title: { en: "What does feedback include?", fr: "Que contient mon avis ?" },
        body: {
          en: "Feedback includes what you write, the page you were on, your browser window size and, if you choose, a screenshot. Please don't include client names or confidential case details.\n\nQuestions about security, hosting or data handling for your organization are answered directly by our team.",
          fr: "Un avis comprend ce que vous écrivez, la page où vous étiez, la taille de votre fenêtre et, si vous le souhaitez, une capture d’écran. Merci de ne pas inclure de noms de clients ni de détails confidentiels.\n\nLes questions sur la sécurité, l’hébergement ou le traitement des données pour votre organisation sont traitées directement par notre équipe.",
        },
      },
    ],
  },
];

export const UPDATES: Update[] = [
  {
    id: "messenger",
    date: "2026-10-09",
    title: { en: "Help and feedback, right on the site", fr: "Aide et avis, directement sur le site" },
    body: {
      en: "You can now message the IST Legal team, report bugs or source issues with a screenshot, and find help articles without leaving the page.",
      fr: "Vous pouvez désormais écrire à l’équipe IST Legal, signaler un bogue ou une source avec une capture d’écran, et consulter l’aide sans quitter la page.",
    },
  },
];

export const QUICK_REPLIES: Localized[] = [
  { en: "I found a problem", fr: "J’ai trouvé un problème" },
  { en: "A question about plans", fr: "Une question sur les offres" },
  { en: "Something else", fr: "Autre chose" },
];

export const MESSENGER_STRINGS = {
  en: {
    open: "Open messenger",
    close: "Close messenger",
    greeting: "Hello",
    greetingNamed: "Hello, {name}",
    howCanWeHelp: "How can we help?",
    sendMessage: "Send us a message",
    submitTicket: "Submit a ticket",
    bugReport: "Bug report",
    sourceReport: "Source or citation issue",
    leaveFeedback: "Leave us feedback",
    searchHelp: "Search for help",
    searchPlaceholder: "Search for help…",
    latestUpdates: "Latest updates",
    home: "Home",
    messages: "Messages",
    help: "Help",
    updates: "Updates",
    noMessages: "No messages yet",
    teamName: "IST Legal team",
    replyTime: "We usually reply within a day",
    welcome1: "Welcome to IST Legal.",
    welcome2: "What would you like help with?",
    writeMessage: "Write a message…",
    send: "Send",
    back: "Back",
    you: "You",
    articles: "{n} articles",
    article: "1 article",
    noResults: "No articles match that search.",
    sendFailed: "Your message didn't send. Check your connection and try again.",
    loadFailed: "Couldn't load your messages. Try again in a moment.",
    justNow: "Just now",
    assistantName: "IST Legal Assistant",
    assistantSub: "AI · The team can also help",
    aiBadge: "AI",
    talkToPerson: "Talk to a person",
    handedOff: "I've passed this to the team. A person will reply here, usually within a day.",
    sourcesLabel: "From the help centre",
    feedbackLogged: "Sent to the team",
    writing: "Writing…",
    noUpdates: "No updates yet",
    noHelp: "No help articles yet.",
    loading: "Loading…",
    support: "Support",
  },
  fr: {
    open: "Ouvrir la messagerie",
    close: "Fermer la messagerie",
    greeting: "Bonjour",
    greetingNamed: "Bonjour, {name}",
    howCanWeHelp: "Comment pouvons-nous vous aider ?",
    sendMessage: "Envoyez-nous un message",
    submitTicket: "Envoyer un ticket",
    bugReport: "Signaler un bogue",
    sourceReport: "Problème de source ou de citation",
    leaveFeedback: "Donnez-nous votre avis",
    searchHelp: "Rechercher dans l’aide",
    searchPlaceholder: "Rechercher dans l’aide…",
    latestUpdates: "Nouveautés",
    home: "Accueil",
    messages: "Messages",
    help: "Aide",
    updates: "Nouveautés",
    noMessages: "Aucun message pour l’instant",
    teamName: "Équipe IST Legal",
    replyTime: "Nous répondons généralement sous un jour",
    welcome1: "Bienvenue sur IST Legal.",
    welcome2: "Comment pouvons-nous vous aider ?",
    writeMessage: "Écrire un message…",
    send: "Envoyer",
    back: "Retour",
    you: "Vous",
    articles: "{n} articles",
    article: "1 article",
    noResults: "Aucun article ne correspond à cette recherche.",
    sendFailed: "Votre message n’a pas été envoyé. Vérifiez votre connexion et réessayez.",
    loadFailed: "Impossible de charger vos messages. Réessayez dans un instant.",
    justNow: "À l’instant",
    assistantName: "Assistant IST Legal",
    assistantSub: "IA · L’équipe peut aussi aider",
    aiBadge: "IA",
    talkToPerson: "Parler à une personne",
    handedOff: "J’ai transmis votre demande à l’équipe. Une personne vous répondra ici, généralement sous un jour.",
    sourcesLabel: "Depuis le centre d’aide",
    feedbackLogged: "Transmis à l’équipe",
    writing: "Rédaction…",
    noUpdates: "Aucune nouveauté pour l’instant",
    noHelp: "Aucun article d’aide pour l’instant.",
    loading: "Chargement…",
    support: "Assistance",
  },
} satisfies Record<Locale, Record<string, string>>;

export type MessengerStrings = (typeof MESSENGER_STRINGS)["en"];

/** Extra detail attached to a message, mostly by the assistant. */
export type MessageMeta = {
  /** Help articles the answer is based on. */
  sources?: { id: string; title: string }[];
  /** Feedback the assistant logged on the user's behalf. */
  feedback?: { id: string; title: string; category: string };
  /** This message handed the conversation to the team. */
  handoff?: boolean;
};

export type Author = "visitor" | "team" | "ai";

export type ConversationSummary = {
  id: string;
  createdAt: string;
  lastMessageAt: string;
  lastMessage: string;
  lastAuthor: Author;
  status: "open" | "closed";
  /** "ai": the assistant answers; "human": handed to the team. */
  mode: "ai" | "human";
  aiBusy: boolean;
};

export type ChatMessage = {
  id: string;
  createdAt: string;
  author: Author;
  authorName: string | null;
  body: string;
  meta: MessageMeta;
};

/** What GET /api/messenger/content returns, already in the visitor's language. */
export type MessengerContent = {
  collections: {
    id: string;
    title: string;
    description: string;
    articles: { id: string; title: string; body: string; updatedAt: string }[];
  }[];
  updates: { id: string; publishedAt: string; title: string; body: string; imageUrl: string | null }[];
  ai: { enabled: boolean };
};

/** Events streamed back while a message is sent (one JSON object per line). */
export type SendEvent =
  | { type: "conversation"; conversation: ConversationSummary }
  | { type: "message"; message: ChatMessage }
  | { type: "ai_start" }
  | { type: "ai_delta"; text: string }
  | { type: "ai_message"; message: ChatMessage }
  | { type: "mode"; mode: "ai" | "human" }
  | { type: "error"; error: string };

export const MESSAGE_MAX = 4000;
