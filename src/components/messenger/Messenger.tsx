"use client";

// IST Legal messenger: a launcher in the corner opens a panel with Home,
// Messages, Help and Updates. The assistant (when ANTHROPIC_API_KEY is set)
// answers from the help centre. Ported from the Twist feedback tool: its dark
// palette and purple header, in the site's layout (square tiles, corner arrows).
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { findCategory, type Locale } from "@/lib/feedback/config";
import {
  MESSAGE_MAX,
  MESSENGER_STRINGS,
  QUICK_REPLIES,
  type ChatMessage,
  type ConversationSummary,
  type MessengerContent,
  type SendEvent,
} from "@/lib/messenger/content";
import { FeedbackWidget, openFeedbackWidget } from "@/components/feedback-widget";
import { LogoLoader, LogoMark } from "../Logo";
import { CornerMark } from "../ui";
import heroImage from "./hero.png";
import {
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CloseIcon,
  HelpIcon,
  HomeIcon,
  MessagesIcon,
  SearchIcon,
  SendIcon,
  UpdatesIcon,
} from "./icons";
import { plainText, RichText } from "./RichText";

export type MessengerProps = {
  /** Where the feedback service runs. Leave empty when it's the same app. */
  apiUrl?: string;
  /** Which surface this is, e.g. "website" or "platform". */
  source: string;
  locale?: Locale;
  /** The signed-in user. `hash` comes from your server (see README). */
  user?: { id: string; name?: string; email?: string; hash?: string } | null;
  metadata?: Record<string, string>;
};

type Tab = "home" | "messages" | "help" | "updates";
type Screen =
  | { kind: "tab" }
  | { kind: "chat"; id: string | null }
  | { kind: "collection"; id: string }
  | { kind: "article"; id: string; from: Screen };

type Article = MessengerContent["collections"][number]["articles"][number];
type ChatMode = ConversationSummary["mode"];

const TOKEN_KEY = "ist-messenger-visitor";
const SEEN_KEY = "ist-messenger-seen";
const UPDATES_SEEN_KEY = "ist-messenger-updates-seen";
const POLL_MS = 8000;
const POLL_FAST_MS = 2500; // while the assistant is writing elsewhere
const LIST_POLL_MS = 30000; // new replies for the launcher badge

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode: fall back to memory for this visit */
  }
}

// A shared clock for "5 min ago" labels, ticking every 30 seconds.
let clock = 0;
let clockTimer: ReturnType<typeof setInterval> | null = null;
const clockListeners = new Set<() => void>();

function subscribeClock(listener: () => void) {
  clockListeners.add(listener);
  if (!clockTimer) {
    clock = Date.now();
    clockTimer = setInterval(() => {
      clock = Date.now();
      clockListeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    clockListeners.delete(listener);
    if (!clockListeners.size && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

function useNow(): number {
  return useSyncExternalStore(
    subscribeClock,
    () => clock,
    () => 0,
  );
}

/* ── Shared pieces ─────────────────────────────────────────────────────── */

const label = "text-xs font-semibold uppercase leading-[16.8px] tracking-[0.72px]";
const iconButton =
  "flex size-[40px] shrink-0 items-center justify-center text-current transition-colors hover:bg-white/8";
const primaryButton =
  "group inline-flex h-[48px] items-center justify-center gap-md bg-[#4f46e5] px-2xl text-md font-medium text-white transition-opacity hover:opacity-90";
const chip =
  "rounded-full border border-white/8 bg-[#1d1e21] px-lg py-sm text-sm leading-[19.6px] text-[#c2c3c7] transition-colors hover:border-white/30 hover:text-white disabled:opacity-50";
const card = "bg-[#1d1e21] transition-colors hover:bg-[#25262a]";

/** The team's avatar: the IST Legal mark on a dark tile, like the menu's icon tiles. */
function Avatar({ size = 40 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center bg-black ring-1 ring-white/10" style={{ width: size, height: size }}>
      <LogoMark size={Math.round(size * 0.55)} />
    </span>
  );
}

/** Header bar for the inner screens: the purple header, cropped to a bar. */
function Bar({ children, below }: { children: ReactNode; below?: ReactNode }) {
  return (
    <header className="relative isolate shrink-0 overflow-hidden border-b border-white/8 px-lg text-white">
      <Image src={heroImage} alt="" fill sizes="400px" className="-z-10 object-cover object-top" />
      <div className="relative flex h-[64px] items-center gap-sm">{children}</div>
      {below}
    </header>
  );
}

function BarTitle({ children }: { children: ReactNode }) {
  return <p className="min-w-0 flex-1 truncate px-sm text-xl leading-[24px] tracking-[-0.4px]">{children}</p>;
}

/** A row in a list: title, optional detail, corner arrow. */
function ListRow({ title, detail, meta, onClick }: { title: string; detail?: string; meta?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-start gap-xl border-b border-white/8 p-xl text-left last:border-b-0 ${card}`}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-xs">
        <span className="text-md font-medium leading-[22.4px] text-white">{title}</span>
        {detail && <span className="line-clamp-2 text-sm leading-[19.6px] text-[#adaeb2]">{detail}</span>}
        {meta && <span className={`${label} mt-xs text-[#adaeb2]`}>{meta}</span>}
      </span>
      <CornerMark variant="bare" dark />
    </button>
  );
}

/* ── Messenger ─────────────────────────────────────────────────────────── */

export function Messenger({ apiUrl = "", source, locale = "en", user = null, metadata }: MessengerProps) {
  const t = MESSENGER_STRINGS[locale];
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [screen, setScreen] = useState<Screen>({ kind: "tab" });
  const [content, setContent] = useState<MessengerContent | null>(null);
  const [updatesUnread, setUpdatesUnread] = useState(false);
  const [conversations, setConversations] = useState<ConversationSummary[] | null>(null);
  const [unread, setUnread] = useState<string[]>([]);
  const [chat, setChat] = useState<{ id: string; messages: ChatMessage[]; mode: ChatMode; aiBusy: boolean } | null>(null);
  // The assistant's reply while it's being written: null when idle.
  const [live, setLive] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);
  const [listVersion, setListVersion] = useState(0);
  const tokenRef = useRef<string | null>(null);
  const seenRef = useRef<Record<string, string> | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const firstName = user?.name?.split(/\s+/)[0];
  const now = useNow();
  const aiOn = content?.ai.enabled ?? false;

  // --- identity ------------------------------------------------------------

  const token = useCallback((): string => {
    if (!tokenRef.current) {
      let value = readStorage(TOKEN_KEY);
      if (!value) {
        value = crypto.randomUUID().replace(/-/g, "");
        writeStorage(TOKEN_KEY, value);
      }
      tokenRef.current = value;
    }
    return tokenRef.current;
  }, []);

  const seen = useCallback((): Record<string, string> => {
    if (!seenRef.current) {
      try {
        seenRef.current = JSON.parse(readStorage(SEEN_KEY) || "{}");
      } catch {
        seenRef.current = {};
      }
    }
    return seenRef.current!;
  }, []);

  const markSeen = useCallback(
    (id: string, at: string) => {
      const map = seen();
      map[id] = at;
      writeStorage(SEEN_KEY, JSON.stringify(map));
      setUnread((u) => u.filter((x) => x !== id));
    },
    [seen],
  );

  const userId = user?.id;
  const userHash = user?.hash;
  const authHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = { "X-IST-Visitor": token() };
    if (userId) headers["X-IST-User-Id"] = encodeURIComponent(userId);
    if (userHash) headers["X-IST-User-Hash"] = encodeURIComponent(userHash);
    return headers;
  }, [token, userId, userHash]);

  const request = useCallback(
    async <T,>(path: string, init: RequestInit = {}): Promise<T> => {
      const headers: Record<string, string> = authHeaders();
      if (init.body) headers["Content-Type"] = "application/json";
      const res = await fetch(`${apiUrl}/api/messenger${path}`, { ...init, headers: { ...headers, ...init.headers } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      return json as T;
    },
    [apiUrl, authHeaders],
  );

  // --- data ----------------------------------------------------------------

  // Help centre, updates and whether the assistant is on. Loaded once, and
  // again each time the messenger opens so edits show up.
  useEffect(() => {
    let cancelled = false;
    fetch(`${apiUrl}/api/messenger/content?locale=${locale}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: MessengerContent) => {
        if (cancelled) return;
        setContent(data);
        const latest = data.updates[0]?.publishedAt;
        const seenAt = readStorage(UPDATES_SEEN_KEY);
        setUpdatesUnread(!!latest && (!seenAt || seenAt < latest));
      })
      .catch(() => {
        if (!cancelled) setContent((c) => c ?? { collections: [], updates: [], ai: { enabled: false } });
      });
    return () => {
      cancelled = true;
    };
  }, [apiUrl, locale, open]);

  // Conversation list: on first load (only for returning visitors, for the
  // unread badge) and whenever the Messages tab is shown.
  useEffect(() => {
    const returning = !!readStorage(TOKEN_KEY) || !!userHash;
    if (!returning && !(open && tab === "messages")) return;
    let cancelled = false;
    request<{ conversations: ConversationSummary[] }>("/conversations")
      .then(({ conversations: list }) => {
        if (cancelled) return;
        setConversations(list);
        const map = seen();
        setUnread(list.filter((c) => c.lastAuthor !== "visitor" && (!map[c.id] || map[c.id] < c.lastMessageAt)).map((c) => c.id));
      })
      .catch(() => {
        if (!cancelled) setConversations((c) => c ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, [open, tab, listVersion, request, seen, userHash]);

  // Returning visitors: look for new replies now and then, so the launcher
  // badge shows up without a reload. Skipped while the page is hidden.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (!readStorage(TOKEN_KEY) && !userHash) return;
      setListVersion((v) => v + 1);
    }, LIST_POLL_MS);
    return () => clearInterval(timer);
  }, [userHash]);

  // The open conversation: load, then poll for replies while it's on screen.
  const chatId = screen.kind === "chat" ? screen.id : null;
  const remoteBusy = !!(chat && chat.id === chatId && chat.aiBusy && live === null);
  useEffect(() => {
    if (!open || !chatId) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const load = () =>
      request<{ conversation: ConversationSummary; messages: ChatMessage[] }>(`/conversations/${chatId}`)
        .then(({ conversation, messages }) => {
          if (cancelled) return;
          setChat({ id: chatId, messages, mode: conversation.mode, aiBusy: conversation.aiBusy });
          const last = messages[messages.length - 1];
          if (last) markSeen(chatId, last.createdAt);
          timer = setTimeout(load, conversation.aiBusy ? POLL_FAST_MS : POLL_MS);
        })
        .catch(() => {
          if (cancelled) return;
          setError(t.loadFailed);
          timer = setTimeout(load, POLL_MS);
        });
    load();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, chatId, request, markSeen, t.loadFailed]);

  const current = chat && chat.id === chatId ? chat : null;
  const messages = current?.messages ?? [];
  // Who answers: the assistant for new conversations when it's on.
  const mode: ChatMode = current?.mode ?? (aiOn ? "ai" : "human");

  // Keep the newest message in view.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, live, remoteBusy, sending, screen.kind]);

  // Escape closes the messenger, unless the feedback popup is on top of it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.querySelector("[data-ist-feedback-root] [role='dialog']")) return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Full-screen on phones: keep the page behind it from scrolling.
  useEffect(() => {
    if (!open || window.matchMedia("(min-width: 640px)").matches) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // --- actions -------------------------------------------------------------

  function goTab(next: Tab) {
    setTab(next);
    setScreen({ kind: "tab" });
    setError(null);
    if (next === "updates" && content?.updates[0]) {
      writeStorage(UPDATES_SEEN_KEY, content.updates[0].publishedAt);
      setUpdatesUnread(false);
    }
  }

  function startChat(id: string | null) {
    setError(null);
    setDraft("");
    setLive(null);
    setScreen({ kind: "chat", id });
  }

  const appendMessage = (id: string, message: ChatMessage) =>
    setChat((c) => {
      if (!c || c.id !== id) return { id, messages: [message], mode: aiOn ? "ai" : "human", aiBusy: false };
      if (c.messages.some((m) => m.id === message.id)) return c;
      return { ...c, messages: [...c.messages, message] };
    });

  async function send(text: string) {
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    const profile = { name: user?.name, email: user?.email };
    let id = chatId;
    try {
      const res = await fetch(`${apiUrl}/api/messenger${id ? `/conversations/${id}/messages` : "/conversations"}`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(
          id ? { ...profile, message: body } : { ...profile, message: body, source, locale, pageUrl: window.location.href, metadata },
        ),
      });
      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `HTTP ${res.status}`);
      }
      setDraft("");
      if (composerRef.current) composerRef.current.style.height = "";

      // One JSON event per line: the saved message, then the reply as it's written.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const handle = (event: SendEvent) => {
        switch (event.type) {
          case "conversation":
            id = event.conversation.id;
            setChat({ id, messages: [], mode: event.conversation.mode, aiBusy: false });
            setScreen({ kind: "chat", id });
            break;
          case "message":
            if (id) appendMessage(id, event.message);
            break;
          case "ai_start":
            setLive("");
            break;
          case "ai_delta":
            setLive((l) => (l ?? "") + event.text);
            break;
          case "ai_message":
            if (id) appendMessage(id, event.message);
            setLive(null);
            break;
          case "mode":
            setChat((c) => (c && c.id === id ? { ...c, mode: event.mode } : c));
            break;
          case "error":
            setLive(null);
            setError(t.sendFailed);
            break;
        }
      };
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (line) handle(JSON.parse(line) as SendEvent);
        }
      }
      setListVersion((v) => v + 1);
    } catch {
      setError(t.sendFailed);
    } finally {
      setLive(null);
      setSending(false);
    }
  }

  async function askForPerson() {
    if (!chatId) return;
    try {
      const { conversation, message } = await request<{ conversation: ConversationSummary; message: ChatMessage | null }>(
        `/conversations/${chatId}/handoff`,
        { method: "POST" },
      );
      if (message) appendMessage(chatId, message);
      setChat((c) => (c && c.id === chatId ? { ...c, mode: conversation.mode } : c));
    } catch {
      setError(t.sendFailed);
    }
  }

  function onComposerKey(e: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(draft);
    }
  }

  const allArticles = content?.collections.flatMap((c) => c.articles) ?? [];
  const findArticle = (id: string) => allArticles.find((a) => a.id === id);

  function openArticle(article: Pick<Article, "id">) {
    setScreen({ kind: "article", id: article.id, from: screen });
  }

  // --- helpers for render --------------------------------------------------

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" });
  function ago(iso: string): string {
    const s = (new Date(iso).getTime() - now) / 1000;
    for (const [unit, size] of [["day", 86400], ["hour", 3600], ["minute", 60]] as const) {
      if (Math.abs(s) >= size) return rtf.format(Math.round(s / size), unit);
    }
    return t.justNow;
  }

  const q = query.trim().toLowerCase();
  const searchResults = q ? allArticles.filter((a) => `${a.title} ${a.body}`.toLowerCase().includes(q)) : [];

  const authorLabel = (author: ChatMessage["author"], name: string | null) =>
    author === "ai" ? t.assistantName : author === "team" ? name || t.teamName : t.you;

  const aiBadge = (
    <span className="ml-sm border border-white/8 px-[5px] py-px text-[10px] font-semibold uppercase leading-[14px] tracking-[0.6px] text-[#adaeb2]">
      {t.aiBadge}
    </span>
  );

  const navItems: { id: Tab; label: string; Icon: typeof HomeIcon; dot: boolean }[] = [
    { id: "home", label: t.home, Icon: HomeIcon, dot: false },
    { id: "messages", label: t.messages, Icon: MessagesIcon, dot: unread.length > 0 },
    { id: "help", label: t.help, Icon: HelpIcon, dot: false },
    { id: "updates", label: t.updates, Icon: UpdatesIcon, dot: updatesUnread },
  ];

  // The launcher closes the panel on larger screens; phones get a close button in the panel.
  const closeButton = (
    <button type="button" className={`${iconButton} sm:hidden`} aria-label={t.close} onClick={() => setOpen(false)}>
      <CloseIcon size={20} />
    </button>
  );

  const sendMessageButton = (
    <button type="button" className={primaryButton} onClick={() => startChat(null)}>
      {t.sendMessage}
      <CornerMark variant="bare" dark />
    </button>
  );

  // --- screens -------------------------------------------------------------

  function renderHome() {
    const topArticles = allArticles.slice(0, 3);
    return (
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {/* Purple header from the Twist messenger (generated by its scripts/generate-messenger-hero.mjs). */}
        <div className="relative isolate overflow-hidden px-2xl pb-[150px] pt-2xl text-white">
          <Image src={heroImage} alt="" fill sizes="400px" placeholder="empty" className="-z-10 object-cover object-top" />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-md">
              <Avatar size={36} />
              <span className={`${label} text-white/70`}>{t.support}</span>
            </span>
            {closeButton}
          </div>
          <h2 className="mt-[44px] text-[32px] font-normal leading-[35.2px] tracking-[-1.6px]">
            <span className="block text-white/70">{firstName ? t.greetingNamed.replace("{name}", firstName) : t.greeting}</span>
            <span className="block">{t.howCanWeHelp}</span>
          </h2>
        </div>

        <div className="relative -mt-[126px] flex flex-col gap-[10px] px-lg pb-lg">
          <button type="button" onClick={() => startChat(null)} className={`group flex items-center justify-between gap-xl p-xl text-left ${card}`}>
            <span className="flex items-center gap-lg">
              <Avatar size={40} />
              <span className="flex flex-col gap-xs">
                <span className="text-md font-medium leading-[22.4px] text-white">{t.sendMessage}</span>
                <span className="text-sm leading-[19.6px] text-[#adaeb2]">{aiOn ? t.assistantSub : t.replyTime}</span>
              </span>
            </span>
            <CornerMark variant="bare" dark />
          </button>

          <div className="bg-[#1d1e21]">
            <p className={`${label} px-xl pb-sm pt-xl text-white`}>{t.submitTicket}</p>
            {[
              { text: t.bugReport, category: "bug" },
              { text: t.sourceReport, category: "sources" },
            ].map((row) => (
              <button
                key={row.category}
                type="button"
                onClick={() => openFeedbackWidget(row.category)}
                className="group flex w-full items-center justify-between gap-xl border-t border-white/8 px-xl py-lg text-left transition-colors first-of-type:border-t-0 hover:bg-white/5"
              >
                <span className="text-md leading-[22.4px] text-[#c2c3c7]">{row.text}</span>
                <CornerMark variant="bare" dark />
              </button>
            ))}
          </div>

          <button type="button" onClick={() => openFeedbackWidget()} className={`group flex items-center justify-between gap-xl p-xl text-left ${card}`}>
            <span className="text-md font-medium leading-[22.4px] text-white">{t.leaveFeedback}</span>
            <CornerMark variant="bare" dark />
          </button>

          <div className="bg-[#1d1e21] p-sm">
            <button
              type="button"
              onClick={() => {
                goTab("help");
                requestAnimationFrame(() => searchRef.current?.focus());
              }}
              className="flex h-[48px] w-full items-center justify-between bg-white/6 px-lg text-left text-md text-white transition-colors hover:bg-white/10"
            >
              {t.searchHelp}
              <SearchIcon size={18} className="text-[#adaeb2]" />
            </button>
            {topArticles.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => openArticle(a)}
                className="block w-full px-lg py-[10px] text-left text-sm leading-[19.6px] text-[#c2c3c7] transition-colors hover:text-white"
              >
                {a.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderMessagesTab() {
    return (
      <>
        <Bar>
          <BarTitle>{t.messages}</BarTitle>
          {closeButton}
        </Bar>
        {conversations && conversations.length > 0 ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-lg">
            <ul className="flex flex-col bg-[#1d1e21]">
              {conversations.map((c) => {
                const isUnread = unread.includes(c.id);
                return (
                  <li key={c.id} className="border-b border-white/8 last:border-b-0">
                    <button type="button" onClick={() => startChat(c.id)} className="flex w-full items-center gap-lg p-xl text-left transition-colors hover:bg-white/5">
                      <Avatar size={40} />
                      <span className="flex min-w-0 flex-1 flex-col gap-xs">
                        <span className="flex items-baseline justify-between gap-md">
                          <span className="truncate text-sm font-medium leading-[19.6px] text-white">{authorLabel(c.lastAuthor, null)}</span>
                          <span className="shrink-0 text-xs leading-[16.8px] text-[#adaeb2]">{ago(c.lastMessageAt)}</span>
                        </span>
                        <span className={`truncate text-sm leading-[19.6px] ${isUnread ? "font-medium text-white" : "text-[#adaeb2]"}`}>
                          {plainText(c.lastMessage)}
                        </span>
                      </span>
                      {isUnread && <span className="size-[8px] shrink-0 rounded-full bg-[#e5484d]" aria-label="Unread" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-center pt-2xl">{sendMessageButton}</div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3xl p-2xl text-center">
            <span className="flex flex-col items-center gap-lg text-[#adaeb2]">
              <span className="flex size-[52px] items-center justify-center border border-white/8">
                <MessagesIcon size={24} />
              </span>
              <span className="text-md">{conversations ? t.noMessages : t.loading}</span>
            </span>
            {sendMessageButton}
          </div>
        )}
      </>
    );
  }

  function renderChat() {
    const fresh = messages.length === 0 && live === null;
    const last = messages[messages.length - 1];
    const offerPerson = mode === "ai" && !sending && live === null && last?.author === "ai" && !last.meta.handoff;
    const assistant = mode === "ai";
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <Bar>
          <button type="button" className={iconButton} aria-label={t.back} onClick={() => goTab(tab === "home" ? "home" : "messages")}>
            <ChevronLeftIcon size={20} />
          </button>
          <Avatar size={36} />
          <span className="flex min-w-0 flex-1 flex-col px-sm">
            <span className="truncate text-md font-medium leading-[20px]">{assistant ? t.assistantName : t.teamName}</span>
            <span className="truncate text-xs leading-[16.8px] text-white/70">{assistant ? t.assistantSub : t.replyTime}</span>
          </span>
          {closeButton}
        </Bar>

        <div ref={threadRef} aria-live="polite" className="flex min-h-0 flex-1 flex-col gap-lg overflow-y-auto overscroll-contain px-lg py-2xl">
          <div className="flex max-w-[85%] flex-col items-start gap-sm">
            <div className="bg-[#1d1e21] px-xl py-lg text-md leading-[24px] text-white">
              <p>{t.welcome1}</p>
              <p>{t.welcome2}</p>
            </div>
            <span className="flex items-center text-xs leading-[16.8px] text-[#adaeb2]">
              {assistant ? t.assistantName : t.teamName}
              {assistant && aiBadge}
            </span>
          </div>

          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const next = messages[i + 1];
            const mine = m.author === "visitor";
            const showMeta = !mine && (next?.author !== m.author || m.meta.sources?.length);
            return (
              <div
                key={m.id}
                className={`flex max-w-[85%] flex-col gap-sm ${mine ? "items-end self-end" : "items-start"} ${prev?.author === m.author ? "-mt-sm" : ""}`}
              >
                <div
                  className={`px-xl py-lg text-md leading-[24px] text-white [overflow-wrap:anywhere] ${
                    mine ? "whitespace-pre-wrap bg-[#4f46e5]" : "bg-[#1d1e21]"
                  }`}
                >
                  {mine ? m.body : <RichText text={m.body} className="rich" />}
                </div>
                {!!m.meta.sources?.length && (
                  <div className="flex w-full min-w-[240px] flex-col gap-sm">
                    <span className={`${label} text-[#adaeb2]`}>{t.sourcesLabel}</span>
                    {m.meta.sources.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => openArticle(s)}
                        className="group flex items-center gap-lg border border-white/8 bg-[#1d1e21] px-lg py-md text-left text-sm leading-[19.6px] text-white transition-colors hover:border-white/30"
                      >
                        <HelpIcon size={18} className="shrink-0 text-[#adaeb2]" />
                        <span className="flex-1">{findArticle(s.id)?.title ?? s.title}</span>
                        <CornerMark variant="bare" dark />
                      </button>
                    ))}
                  </div>
                )}
                {m.meta.feedback && (
                  <span className="inline-flex items-center gap-sm rounded-full border border-white/8 bg-[#1d1e21] px-lg py-xs text-sm leading-[19.6px] text-[#c2c3c7]">
                    <CheckIcon size={14} strokeWidth={2} />
                    {t.feedbackLogged}
                    {findCategory(m.meta.feedback.category) && ` · ${findCategory(m.meta.feedback.category)!.label[locale]}`}
                  </span>
                )}
                {showMeta && (
                  <span className="flex items-center text-xs leading-[16.8px] text-[#adaeb2]">
                    {authorLabel(m.author, m.authorName)}
                    {m.author === "ai" && aiBadge}
                    <span className="ml-sm">· {ago(m.createdAt)}</span>
                  </span>
                )}
              </div>
            );
          })}

          {(live !== null || remoteBusy) && (
            <div className="flex max-w-[85%] flex-col items-start gap-sm">
              <div className="bg-[#1d1e21] px-xl py-lg text-md leading-[24px] text-white">
                {live ? <RichText text={live} className="rich" /> : <LogoLoader size={22} label={t.writing} />}
              </div>
              <span className="flex items-center text-xs leading-[16.8px] text-[#adaeb2]">
                {t.assistantName}
                {aiBadge}
              </span>
            </div>
          )}

          {offerPerson && (
            <div className="flex">
              <button type="button" className={chip} onClick={askForPerson}>
                {t.talkToPerson}
              </button>
            </div>
          )}

          {fresh && (
            <div className="mt-auto flex flex-wrap justify-end gap-md pt-xl">
              {QUICK_REPLIES.map((r) => r[locale]).map((text) => (
                <button key={text} type="button" className={chip} disabled={sending} onClick={() => send(text)}>
                  {text}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="shrink-0 border-t border-white/8 px-xl py-md text-sm text-[#fda29b]">
            {error}
          </p>
        )}

        <form
          className="flex shrink-0 items-end gap-md border-t border-white/8 p-md"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <textarea
            ref={composerRef}
            id="ist-messenger-composer"
            rows={1}
            value={draft}
            maxLength={MESSAGE_MAX}
            placeholder={t.writeMessage}
            aria-label={t.writeMessage}
            onChange={(e) => {
              setDraft(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={onComposerKey}
            className="max-h-[120px] min-h-[44px] flex-1 resize-none border border-transparent bg-[#1d1e21] px-lg py-[10px] text-md leading-[22px] text-white outline-none transition-colors placeholder:text-[#adaeb2] focus:border-white/30"
          />
          <button
            type="submit"
            aria-label={t.send}
            disabled={!draft.trim() || sending}
            className="flex size-[44px] shrink-0 items-center justify-center bg-[#4f46e5] text-white transition-opacity disabled:opacity-30"
          >
            <SendIcon size={18} />
          </button>
        </form>
      </div>
    );
  }

  function renderHelp() {
    const collections = content?.collections ?? [];
    const searchField = (
      <div className="relative pb-lg">
        <label className="flex h-[48px] items-center gap-md bg-[#0a0b10]/80 px-lg text-white ring-1 ring-white/8 backdrop-blur-sm">
          <SearchIcon size={18} className="shrink-0 text-[#adaeb2]" />
          <input
            ref={searchRef}
            id="ist-messenger-search"
            type="search"
            className="h-full min-w-0 flex-1 bg-transparent text-md outline-none placeholder:text-[#adaeb2]"
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
    );
    let list: ReactNode;
    if (!content) list = <p className="p-2xl text-center text-md text-[#adaeb2]">{t.loading}</p>;
    else if (q)
      list = searchResults.length ? (
        <div className="flex flex-col">
          {searchResults.map((a) => (
            <ListRow key={a.id} title={a.title} detail={plainText(a.body)} onClick={() => openArticle(a)} />
          ))}
        </div>
      ) : (
        <p className="p-2xl text-center text-md text-[#adaeb2]">{t.noResults}</p>
      );
    else
      list = collections.length ? (
        <div className="flex flex-col">
          {collections.map((c) => (
            <ListRow
              key={c.id}
              title={c.title}
              detail={c.description || undefined}
              meta={c.articles.length === 1 ? t.article : t.articles.replace("{n}", String(c.articles.length))}
              onClick={() => setScreen({ kind: "collection", id: c.id })}
            />
          ))}
        </div>
      ) : (
        <p className="p-2xl text-center text-md text-[#adaeb2]">{t.noHelp}</p>
      );
    return (
      <>
        <Bar below={searchField}>
          <BarTitle>{t.help}</BarTitle>
          {closeButton}
        </Bar>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-lg">{list}</div>
      </>
    );
  }

  function renderCollection(id: string) {
    const c = content?.collections.find((x) => x.id === id);
    if (!c) return renderHelp();
    return (
      <>
        <Bar>
          <button type="button" className={iconButton} aria-label={t.back} onClick={() => goTab("help")}>
            <ChevronLeftIcon size={20} />
          </button>
          <BarTitle>{c.title}</BarTitle>
          {closeButton}
        </Bar>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-lg">
          {c.description && <p className="px-xs pb-lg text-sm leading-[19.6px] text-[#adaeb2]">{c.description}</p>}
          {c.articles.map((a) => (
            <ListRow key={a.id} title={a.title} onClick={() => openArticle(a)} />
          ))}
        </div>
      </>
    );
  }

  function renderArticle(id: string, from: Screen) {
    const a = findArticle(id);
    return (
      <>
        <Bar>
          <button type="button" className={iconButton} aria-label={t.back} onClick={() => setScreen(from)}>
            <ChevronLeftIcon size={20} />
          </button>
          <BarTitle>{t.help}</BarTitle>
          {closeButton}
        </Bar>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {a ? (
            <article className="flex flex-col gap-3xl px-2xl py-4xl">
              <h3 className="text-display-xs font-normal leading-[28.8px] tracking-[-0.96px] text-white">{a.title}</h3>
              <RichText text={a.body} className="rich rich-article" />
              <div className="flex flex-col items-start gap-lg border-t border-white/8 pt-3xl">
                <p className="text-md leading-[24px] text-[#adaeb2]">{t.howCanWeHelp}</p>
                {sendMessageButton}
              </div>
            </article>
          ) : (
            <p className="p-2xl text-center text-md text-[#adaeb2]">{content ? t.noResults : t.loading}</p>
          )}
        </div>
      </>
    );
  }

  function renderUpdates() {
    const updates = content?.updates ?? [];
    return (
      <>
        <Bar>
          <BarTitle>{t.latestUpdates}</BarTitle>
          {closeButton}
        </Bar>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-lg">
          {!updates.length ? (
            <p className="p-2xl text-center text-md text-[#adaeb2]">{content ? t.noUpdates : t.loading}</p>
          ) : (
            <div className="flex flex-col gap-[10px]">
              {updates.map((u) => {
                const expanded = expandedUpdate === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpandedUpdate(expanded ? null : u.id)}
                    className={`flex flex-col text-left ${card}`}
                  >
                    <UpdateArt imageUrl={u.imageUrl} />
                    <span className="flex flex-col gap-sm p-xl">
                      <span className={`${label} text-[#adaeb2]`}>
                        {new Date(u.publishedAt).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="text-xl leading-[24px] tracking-[-0.4px] text-white">{u.title}</span>
                      {expanded ? (
                        <RichText text={u.body} className="rich text-sm leading-[19.6px] text-[#c2c3c7]" />
                      ) : (
                        <span className="line-clamp-2 text-sm leading-[19.6px] text-[#adaeb2]">{plainText(u.body)}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }

  let body;
  if (screen.kind === "chat") body = renderChat();
  else if (screen.kind === "collection") body = renderCollection(screen.id);
  else if (screen.kind === "article") body = renderArticle(screen.id, screen.from);
  else if (tab === "messages") body = renderMessagesTab();
  else if (tab === "help") body = renderHelp();
  else if (tab === "updates") body = renderUpdates();
  else body = renderHome();

  const showNav = screen.kind !== "chat";
  const badge = unread.length;

  return (
    <div data-ist-messenger-root="" className="font-sans [color-scheme:dark]">
      {open && (
        <section
          role="dialog"
          aria-label="IST Legal support"
          className="messenger-in fixed inset-0 z-40 flex flex-col overflow-hidden bg-[#0a0b10] text-[#adaeb2] sm:inset-auto sm:bottom-[92px] sm:right-2xl sm:h-[min(680px,calc(100dvh-132px))] sm:w-[400px] sm:shadow-[0_5px_42px_rgba(0,0,0,0.35)] sm:ring-1 sm:ring-white/10"
        >
          <div className="flex min-h-0 flex-1 flex-col">{body}</div>
          {showNav && (
            <nav aria-label="Messenger" className="grid shrink-0 grid-cols-4 border-t border-white/8 bg-[#0a0b10] pb-[env(safe-area-inset-bottom)]">
              {navItems.map(({ id, label: text, Icon, dot }) => {
                const active = tab === id && screen.kind === "tab";
                return (
                  <button
                    key={id}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => goTab(id)}
                    className={`relative flex h-[64px] flex-col items-center justify-center gap-xs text-xs font-medium leading-[16.8px] transition-colors ${
                      active ? "text-white" : "text-[#adaeb2] hover:text-white"
                    }`}
                  >
                    <span aria-hidden className={`absolute inset-x-lg top-0 h-[2px] bg-[#4f46e5] transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                    <span className="relative">
                      <Icon size={22} />
                      {dot && <span className="absolute -right-[2px] -top-[1px] size-[8px] rounded-full bg-[#e5484d] ring-2 ring-[#0a0b10]" />}
                    </span>
                    {text}
                  </button>
                );
              })}
            </nav>
          )}
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-2xl right-2xl z-40 size-[56px] items-center justify-center rounded-full bg-black text-white shadow-[0_12px_24px_-8px_rgba(8,16,20,0.5)] ring-1 ring-white/20 transition-transform hover:-translate-y-[2px] ${
          open ? "hidden sm:flex" : "flex"
        }`}
      >
        {open ? <ChevronDownIcon size={24} strokeWidth={1.8} /> : <ChatIcon size={24} strokeWidth={1.6} />}
        {!open && badge > 0 && (
          <span className="absolute -right-[6px] -top-[6px] flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#e5484d] px-xs text-xs font-semibold text-white ring-2 ring-white">
            {badge}
          </span>
        )}
      </button>

      {/* The feedback popup the Home cards open. Its own floating tab stays hidden. */}
      <FeedbackWidget apiUrl={apiUrl} source={source} locale={locale} user={user} metadata={metadata} placement={null} />
    </div>
  );
}

function UpdateArt({ imageUrl }: { imageUrl: string | null }) {
  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- images are URLs entered by the team
    return <img src={imageUrl} alt="" className="aspect-[2/1] w-full object-cover" />;
  }
  return (
    <span aria-hidden className="relative isolate flex aspect-[2/1] w-full items-center justify-center overflow-hidden">
      <Image src={heroImage} alt="" fill sizes="400px" className="-z-10 object-cover object-center" />
      <LogoMark size={44} />
    </span>
  );
}
