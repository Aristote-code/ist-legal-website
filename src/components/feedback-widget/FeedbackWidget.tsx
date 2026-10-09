"use client";

// Feedback popup: pick a category, write a title and details, choose a type,
// optionally attach a screenshot of the page, send. Opened from the messenger,
// from openFeedbackWidget(), or from any element with data-ist-feedback.
// Fields follow the Book a Demo form; category rows follow the nav menu panels.
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CATEGORIES, findCategory, LIMITS, type Category, type FeedbackSubmission, type Locale } from "@/lib/feedback/config";
import { CATEGORY_ICONS as ICONS } from "@/lib/feedback/icons";
import { CheckIcon, ChevronLeftIcon, CloseIcon, MailIcon, ScreenshotIcon } from "@/components/messenger/icons";
import { CornerMark } from "../ui";
import { STRINGS } from "./strings";

const OPEN_EVENT = "ist-feedback:open";

/** Open the widget from anywhere, optionally straight into a category ("bug", "idea", …). */
export function openFeedbackWidget(category?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { category } }));
}

export type FeedbackWidgetProps = {
  /** Where the feedback service runs. Leave empty when it's the same app. */
  apiUrl?: string;
  /** Which surface the feedback came from, e.g. "website" or "platform". */
  source: string;
  locale?: Locale;
  /** Shows a floating "Feedback" tab on that side of the screen. `null` hides it. */
  placement?: "right" | "left" | null;
  /** The signed-in user. `hash` comes from your server (see README). */
  user?: { id: string; name?: string; email?: string; hash?: string } | null;
  /** Extra context attached to every post, such as the app version. */
  metadata?: Record<string, string>;
  onSubmitted?: (id: string) => void;
};

type View = "main" | "form" | "done";
type Draft = { title: string; description: string; postType: string | null; email: string };
const EMPTY_DRAFT: Draft = { title: "", description: "", postType: null, email: "" };

const FOCUSABLE = 'button:not([disabled]), input:not([tabindex="-1"]), textarea, [href], [tabindex="0"]';

const field =
  "w-full border border-transparent bg-[#1d1e21] px-2xl text-md text-white outline-none transition-colors placeholder:text-[#adaeb2] focus:border-white/30";
const secondaryButton =
  "inline-flex h-[48px] items-center justify-center gap-md border border-white/8 bg-[#1d1e21] px-xl text-md font-medium text-white transition-colors hover:border-white/30 disabled:opacity-60";
const primaryButton =
  "group inline-flex h-[48px] items-center justify-center gap-md bg-[#4f46e5] px-2xl text-md font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60";

export function FeedbackWidget({
  apiUrl = "",
  source,
  locale = "en",
  placement = "right",
  user = null,
  metadata,
  onSubmitted,
}: FeedbackWidgetProps) {
  const t = STRINGS[locale];
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");
  const [category, setCategory] = useState<Category | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const headingId = useId();

  const pick = useCallback(
    (next: Category) => {
      if (category?.id !== next.id) setDraft((d) => ({ ...d, postType: null }));
      setCategory(next);
      setView("form");
      setError(null);
    },
    [category],
  );

  const show = useCallback(
    (categoryId?: string) => {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      const requested = categoryId ? findCategory(categoryId) : undefined;
      if (requested) pick(requested);
      else setView((v) => (v === "done" ? "main" : v));
      setOpen(true);
    },
    [pick],
  );

  const close = useCallback(() => {
    setOpen(false);
    returnFocusRef.current?.focus?.();
  }, []);

  // Open from openFeedbackWidget() or any element with data-ist-feedback.
  useEffect(() => {
    const onOpen = (e: Event) => show((e as CustomEvent<{ category?: string }>).detail?.category);
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.("[data-ist-feedback]");
      if (!trigger || trigger.closest("[data-ist-feedback-root]")) return;
      e.preventDefault();
      show(trigger.getAttribute("data-ist-feedback") || undefined);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("click", onClick);
    };
  }, [show]);

  // Escape closes, Tab stays inside the dialog, 1–9 pick a category.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        const items = [...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (view === "main" && /^[1-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const next = CATEGORIES[Number(e.key) - 1];
        if (next) {
          e.preventDefault();
          pick(next);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, view, close, pick]);

  // Move focus into each view as it appears.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    (panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel)?.focus();
  }, [open, view]);

  async function captureScreen() {
    setCapturing(true);
    setError(null);
    // modern-screenshot waits on a cloned <video> with no timeout, which can hang
    // (the hero film). Show a still of each video's current frame instead.
    const stills = [...document.querySelectorAll("video")].flatMap((video) => {
      if (video.readyState < 2 || !video.videoWidth) return [];
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d")?.drawImage(video, 0, 0);
        const img = document.createElement("img");
        img.src = canvas.toDataURL("image/jpeg", 0.8);
        img.alt = "";
        img.className = video.className;
        img.style.cssText = video.style.cssText;
        video.after(img);
        const display = video.style.display;
        video.style.display = "none";
        return [() => {
          img.remove();
          video.style.display = display;
        }];
      } catch {
        return []; // a cross-origin video can't be drawn; it's left out
      }
    });
    try {
      const { domToJpeg } = await import("modern-screenshot");
      const shot = await domToJpeg(document.documentElement, {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: Math.min(1, 1440 / window.innerWidth),
        quality: 0.75,
        style: { transform: `translate(${-window.scrollX}px, ${-window.scrollY}px)` },
        // It waits for every image in the page, including lazy ones further
        // down that never load. Those are left out below, so don't wait long.
        timeout: 1500,
        filter: (node) => {
          if (!(node instanceof Element)) return true;
          // Leave the widget itself out of the picture.
          if (node.hasAttribute("data-ist-feedback-root") || node.tagName === "VIDEO") return false;
          // Skip what's off screen: it isn't in the picture, and lazy images down
          // the page never load, which would stall the capture.
          const r = node.getBoundingClientRect();
          return !(r.width || r.height) || (r.bottom >= 0 && r.top <= window.innerHeight && r.right >= 0 && r.left <= window.innerWidth);
        },
      });
      if (shot.length > LIMITS.screenshotMaxChars) throw new Error("Screenshot too large");
      setScreenshot(shot);
    } catch (err) {
      console.warn("[ist-feedback] screenshot failed", err);
      setError(t.screenshotFailed);
    } finally {
      stills.forEach((restore) => restore());
      setCapturing(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!category || sending) return;
    if (draft.title.trim().length < LIMITS.titleMin) {
      setError(t.titleRequired);
      titleInputRef.current?.focus();
      return;
    }
    setSending(true);
    setError(null);
    const payload: FeedbackSubmission = {
      category: category.id,
      postType: draft.postType,
      title: draft.title,
      description: draft.description,
      email: user?.email ? null : draft.email || null,
      locale,
      source,
      pageUrl: window.location.href,
      metadata: { ...metadata, viewport: `${window.innerWidth}x${window.innerHeight}` },
      screenshot,
      user,
      website: honeypot,
    };
    try {
      const res = await fetch(`${apiUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setDraft(EMPTY_DRAFT);
      setScreenshot(null);
      setCategory(null);
      setView("done");
      if (json.id) onSubmitted?.(json.id);
    } catch (err) {
      console.warn("[ist-feedback] submit failed", err);
      setError(t.sendFailed);
    } finally {
      setSending(false);
    }
  }

  const CategoryIconEl = category ? ICONS[category.icon] : null;

  return (
    <div data-ist-feedback-root="" className="font-sans [color-scheme:dark]">
      {placement && !open && (
        <button
          type="button"
          onClick={() => show()}
          className={`fixed top-1/2 z-40 -translate-y-1/2 rotate-180 bg-[#4f46e5] px-md py-xl text-sm font-medium text-white ring-1 ring-white/15 [writing-mode:vertical-rl] ${
            placement === "left" ? "left-0" : "right-0"
          }`}
        >
          {t.launcher}
        </button>
      )}

      {open && (
        <div
          className="overlay-in fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px] sm:items-center sm:p-2xl"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            tabIndex={-1}
            className="messenger-in relative max-h-[calc(100dvh-24px)] w-full overflow-y-auto bg-[#0a0b10] text-[#adaeb2] shadow-[0_5px_42px_rgba(0,0,0,0.5)] outline-none ring-1 ring-white/10 sm:max-w-[520px]"
          >
            <button
              type="button"
              aria-label={t.close}
              onClick={close}
              className="absolute right-lg top-lg flex size-[40px] items-center justify-center text-white transition-colors hover:bg-white/8"
            >
              <CloseIcon size={20} />
            </button>

            {view === "main" && (
              <div className="flex flex-col gap-3xl p-3xl sm:p-[40px]">
                <div className="flex flex-col gap-md pr-[40px]">
                  <p className="text-sm font-semibold uppercase leading-[19.6px] tracking-[0.84px] text-[#adaeb2]">{t.launcher}</p>
                  <p id={headingId} className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">
                    {t.title}
                  </p>
                  <p className="text-md leading-[24px] text-[#adaeb2]">{t.subtitle}</p>
                </div>
                <ul className="flex flex-col gap-[10px]">
                  {CATEGORIES.map((c, i) => {
                    const Icon = ICONS[c.icon];
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => pick(c)}
                          data-autofocus={i === 0 ? "" : undefined}
                          className="group flex min-h-[56px] w-full items-stretch gap-xl bg-[#1d1e21] pr-xl text-left transition-colors hover:bg-[#25262a]"
                        >
                          <span className="flex w-[56px] shrink-0 items-center justify-center bg-black text-white">
                            <Icon size={22} />
                          </span>
                          <span className="flex flex-1 items-center text-md font-medium leading-[22.4px] text-white">{c.label[locale]}</span>
                          <span className="flex items-center gap-lg">
                            <kbd className="hidden h-[24px] min-w-[24px] items-center justify-center border border-white/8 px-xs font-sans text-xs text-[#adaeb2] sm:flex">
                              {i + 1}
                            </kbd>
                            <CornerMark variant="bare" dark />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {view === "form" && category && CategoryIconEl && (
              <form onSubmit={submit} noValidate className="flex flex-col gap-3xl p-3xl sm:p-[40px]">
                <div className="flex items-center gap-xl pr-[40px]">
                  <span className="flex size-[48px] shrink-0 items-center justify-center bg-black text-white ring-1 ring-white/10">
                    <CategoryIconEl size={22} />
                  </span>
                  <p id={headingId} className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">
                    {category.label[locale]}
                  </p>
                </div>

                <div className="flex flex-col gap-lg">
                  <input
                    ref={titleInputRef}
                    data-autofocus=""
                    className={`${field} h-[56px]`}
                    placeholder={t.titlePlaceholder}
                    aria-label={t.titlePlaceholder}
                    value={draft.title}
                    maxLength={LIMITS.titleMax}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  />
                  <textarea
                    className={`${field} resize-y py-xl`}
                    placeholder={category.prompt[locale]}
                    aria-label={category.prompt[locale]}
                    value={draft.description}
                    maxLength={LIMITS.descriptionMax}
                    rows={5}
                    onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  />
                  <p className="text-xs leading-[16.8px] text-[#adaeb2]">{t.confidential}</p>

                  {category.postTypes.length > 0 && (
                    <fieldset className="mt-sm flex flex-col gap-md">
                      <legend className="mb-md text-sm font-medium leading-[19.6px] text-white">{category.postTypeLabel[locale]}</legend>
                      <div className="flex flex-wrap gap-md">
                        {category.postTypes.map((p) => {
                          const selected = draft.postType === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => setDraft((d) => ({ ...d, postType: selected ? null : p.id }))}
                              className={`rounded-full border px-lg py-sm text-sm transition-colors ${
                                selected ? "border-[#4f46e5] bg-[#4f46e5] text-white" : "border-white/8 bg-[#1d1e21] text-[#c2c3c7] hover:border-white/30 hover:text-white"
                              }`}
                            >
                              {p.label[locale]}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {!user?.email && (
                    <label className="relative mt-sm flex items-center">
                      <MailIcon size={18} className="pointer-events-none absolute left-xl text-[#adaeb2]" />
                      <input
                        type="email"
                        autoComplete="email"
                        className={`${field} h-[56px] pl-[48px]`}
                        placeholder={t.emailPlaceholder}
                        aria-label={t.emailPlaceholder}
                        value={draft.email}
                        onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                      />
                    </label>
                  )}

                  {screenshot && (
                    <div className="flex items-center gap-lg bg-[#1d1e21] p-md">
                      {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
                      <img src={screenshot} alt="" className="h-[44px] w-[72px] border border-white/8 object-cover object-top" />
                      <span className="flex-1 text-sm text-white">{t.screenshotAdded}</span>
                      <button
                        type="button"
                        aria-label={t.removeScreenshot}
                        onClick={() => setScreenshot(null)}
                        className="flex size-[36px] items-center justify-center text-[#adaeb2] transition-colors hover:text-white"
                      >
                        <CloseIcon size={16} />
                      </button>
                    </div>
                  )}

                  {error && (
                    <p role="alert" className="text-sm text-[#fda29b]">
                      {error}
                    </p>
                  )}

                  <input
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-md border-t border-white/8 pt-3xl">
                  <button
                    type="button"
                    aria-label={t.back}
                    onClick={() => setView("main")}
                    className="flex size-[48px] items-center justify-center border border-white/8 bg-[#1d1e21] text-white transition-colors hover:border-white/30"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <div className="flex flex-wrap gap-md">
                    <button type="button" className={secondaryButton} onClick={captureScreen} disabled={capturing}>
                      <ScreenshotIcon size={18} />
                      {capturing ? t.capturing : screenshot ? t.retakeScreenshot : t.takeScreenshot}
                    </button>
                    <button type="submit" className={primaryButton} disabled={sending}>
                      {sending ? t.sending : t.send}
                      <CornerMark variant="bare" dark />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {view === "done" && (
              <div role="status" className="flex flex-col gap-xl p-3xl sm:p-[40px]">
                <span className="flex size-[48px] items-center justify-center bg-[#4f46e5] text-white">
                  <CheckIcon size={22} strokeWidth={2} />
                </span>
                <p id={headingId} className="pr-[40px] text-display-xs leading-[28.8px] tracking-[-0.96px] text-white">
                  {t.thanksTitle}
                </p>
                <p className="text-md leading-[24px] text-[#adaeb2]">{t.thanksBody}</p>
                <div className="mt-md flex flex-wrap gap-md">
                  <button type="button" data-autofocus="" className={primaryButton} onClick={close}>
                    {t.done}
                    <CornerMark variant="bare" dark />
                  </button>
                  <button type="button" className={secondaryButton} onClick={() => setView("main")}>
                    {t.sendMore}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
