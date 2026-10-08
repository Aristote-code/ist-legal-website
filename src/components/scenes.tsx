// Product scenes for the platform walkthrough — recreated from the IST Legal app UI
// (chat, category picker, citations, export, client intake). Drawn at a fixed
// 520×440 design size and scaled to fit by <SceneFrame>. Content is illustrative.
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowUp02Icon,
  Attachment01Icon,
  Briefcase01Icon,
  Building03Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  CourtHouseIcon,
  Download04Icon,
  FavouriteIcon,
  File02Icon,
  JusticeScale01Icon,
  LinkSquare02Icon,
  Search01Icon,
  Shield01Icon,
  Tick02Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";

export type SceneName = "assistant" | "categories" | "citations" | "draft" | "intake";

function I({ icon, size = 14, className = "" }: { icon: IconSvgElement; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={1.6} className={className} aria-hidden />;
}

/** App window chrome shared by all scenes. */
function Window({ children, title }: { children: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-app-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex h-[44px] shrink-0 items-center gap-2 border-b border-app-line px-4">
        <span className="flex size-[22px] items-center justify-center rounded-md bg-app-primary-50 text-app-primary">
          <I icon={JusticeScale01Icon} size={13} />
        </span>
        <span className="text-[12px] font-medium">IST Legal</span>
        <span className="ml-2 text-[11px] text-app-muted">{title}</span>
        <span className="ml-auto rounded-full border border-app-line px-2 py-[2px] text-[10px] text-app-muted">Illustrative</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function CategoryPill({ label = "Labor & Employment" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl border border-app-line bg-white px-2 py-1 text-[11px]">
      <span className="flex size-[18px] items-center justify-center rounded-md bg-app-primary-50 text-app-primary">
        <I icon={Briefcase01Icon} size={11} />
      </span>
      {label}
    </span>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-[10px] text-app-muted">You</span>
      <div className="max-w-[78%] rounded-2xl rounded-tr-md border border-app-primary-100 bg-app-primary-50 px-3 py-2 text-[12px] leading-[1.45]">
        {children}
      </div>
    </div>
  );
}

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="mt-4 flex size-[24px] shrink-0 items-center justify-center rounded-full bg-app-primary-50 text-app-primary">
        <I icon={JusticeScale01Icon} size={13} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[10px] text-app-muted">IST Legal</span>
        <div className="rounded-2xl rounded-tl-md border border-app-line bg-white px-3 py-2 text-[12px] leading-[1.5]">{children}</div>
      </div>
    </div>
  );
}

function ActionPill({ icon, children, active = false }: { icon: IconSvgElement; children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[10px] ${
        active ? "border-app-primary bg-app-primary-50 text-app-primary" : "border-app-line text-app-muted"
      }`}
    >
      <I icon={icon} size={11} />
      {children}
    </span>
  );
}

const QUESTION = "Can an employer end a contract without notice?";
const ANSWER =
  "Generally, notice is required before an employment contract is terminated, unless an exception such as serious misconduct applies. The notice period depends on length of service and the contract terms.";

/* I — Ask in plain language */
function AssistantScene() {
  return (
    <Window title="Labor & Employment  ›  Termination of contract">
      <div className="flex h-full flex-col bg-[radial-gradient(circle_at_50%_0%,#fafafa,white_70%)]">
        <div className="flex flex-1 flex-col gap-4 px-5 pt-5">
          <UserBubble>{QUESTION}</UserBubble>
          <AssistantBubble>
            {ANSWER}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <ActionPill icon={LinkSquare02Icon} active>View citations (2)</ActionPill>
              <ActionPill icon={Copy01Icon}>Copy for Word</ActionPill>
              <ActionPill icon={Download04Icon}>Export to Word</ActionPill>
            </div>
          </AssistantBubble>
        </div>
        <div className="m-4 rounded-[22px] bg-app-input p-1.5">
          <div className="flex items-center gap-2 rounded-2xl border border-app-line bg-white px-3 py-2.5">
            <CategoryPill />
            <span className="flex-1 truncate text-[11px] text-app-muted">Describe your labor & employment issue in detail…</span>
            <span className="text-app-muted">
              <I icon={Attachment01Icon} size={14} />
            </span>
            <span className="flex size-[26px] items-center justify-center rounded-xl bg-app-primary text-white">
              <I icon={ArrowUp02Icon} size={14} />
            </span>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* II — Work by area of law */
const CATEGORIES: { label: string; description: string; icon: IconSvgElement }[] = [
  { label: "General", description: "Broad legal guidance across all practice areas", icon: JusticeScale01Icon },
  { label: "Constitutional", description: "Fundamental rights, government powers", icon: CourtHouseIcon },
  { label: "Criminal", description: "Criminal offences, defence and procedure", icon: Shield01Icon },
  { label: "Family", description: "Marriage, divorce, custody and succession", icon: FavouriteIcon },
  { label: "Corporate", description: "Business formation, compliance, governance", icon: Building03Icon },
  { label: "Labor & Employment", description: "Employment contracts and workplace rights", icon: Briefcase01Icon },
];

function CategoriesScene() {
  return (
    <Window title="Select a workspace">
      <div className="flex h-full items-start justify-center bg-[#fafafa] p-5">
        <div className="w-full rounded-2xl border border-app-line bg-white p-2 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)]">
          <div className="mb-1 flex items-center gap-2 rounded-xl bg-app-input px-3 py-2 text-[11px] text-app-muted">
            <I icon={Search01Icon} size={13} /> Search categories…
          </div>
          {CATEGORIES.map((c) => {
            const active = c.label === "Labor & Employment";
            return (
              <div key={c.label} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-[7px] ${active ? "bg-app-primary-50" : ""}`}>
                <span className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-app-primary-50 text-app-primary">
                  <I icon={c.icon} size={14} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[12px] font-medium">{c.label}</span>
                  <span className="truncate text-[10.5px] text-app-muted">{c.description}</span>
                </span>
                {active && (
                  <span className="text-app-primary">
                    <I icon={Tick02Icon} size={14} />
                  </span>
                )}
              </div>
            );
          })}
          <div className="px-2.5 pb-1 pt-1.5 text-[10px] text-app-muted">+ Civil, International, Contract, Human Rights</div>
        </div>
      </div>
    </Window>
  );
}

/* III — Answers you can verify */
function CitationsScene() {
  return (
    <Window title="Labor & Employment  ›  Termination of contract">
      <div className="flex h-full">
        <div className="flex w-[54%] flex-col gap-3 border-r border-app-line p-4">
          <AssistantBubble>
            Generally, notice is required before a contract is terminated
            <sup className="ml-0.5 font-medium text-app-primary">[1]</sup>, unless an exception such as serious misconduct applies. The
            contract&apos;s own notice clause also matters
            <sup className="ml-0.5 font-medium text-app-primary">[2]</sup>.
          </AssistantBubble>
          <div className="pl-8">
            <ActionPill icon={LinkSquare02Icon} active>View citations (2)</ActionPill>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[#fafafa]">
          <div className="border-b border-app-line px-4 py-3 text-[11px] font-medium">Sources</div>
          {[
            { n: 1, title: "Law N° 66/2018 regulating labour in Rwanda", detail: "Provisions on termination and notice", open: true },
            { n: 2, title: "Employment contract", detail: "Clause on notice of termination", open: false },
          ].map((c) => (
            <div key={c.n} className={`border-b border-app-line px-4 py-3 ${c.open ? "bg-white" : ""}`}>
              <div className="flex items-start gap-2">
                <span className="text-[11px] font-medium text-app-primary">[{c.n}]</span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[11.5px] font-medium leading-snug">{c.title}</span>
                  <span className="text-[10.5px] text-app-muted">{c.detail}</span>
                </span>
              </div>
              {c.open && (
                <div className="mt-2.5 ml-5 flex flex-col gap-1.5">
                  <span className="h-[5px] w-[92%] rounded-full bg-app-line" />
                  <span className="h-[5px] w-[80%] rounded-full bg-app-primary-100" />
                  <span className="h-[5px] w-[86%] rounded-full bg-app-line" />
                  <span className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-medium text-app-primary">
                    Open original text <I icon={LinkSquare02Icon} size={11} />
                  </span>
                </div>
              )}
            </div>
          ))}
          <p className="mt-auto px-4 pb-3 text-[10px] leading-snug text-app-muted">Review the original provision before relying on the analysis.</p>
        </div>
      </div>
    </Window>
  );
}

/* IV — Draft and export */
function DraftScene() {
  const sections = ["Issue", "Brief answer", "Facts", "Discussion", "Conclusion"];
  return (
    <Window title="Memo  ›  Termination without notice">
      <div className="relative flex h-full justify-center bg-[#fafafa] px-6 pt-5">
        <div className="w-full rounded-t-xl border border-b-0 border-app-line bg-white px-6 pt-5">
          <p className="text-[13px] font-medium">Memorandum</p>
          <p className="mb-3 text-[10px] text-app-muted">Labor & Employment · Prepared with IST Legal</p>
          {sections.map((s, i) => (
            <div key={s} className="mb-2.5">
              <p className="mb-1 text-[11px] font-medium">
                {i + 1}. {s}
              </p>
              <span className="block h-[4px] w-[94%] rounded-full bg-app-line" />
              <span className="mt-1 block h-[4px] w-[78%] rounded-full bg-app-line" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-[96px] left-1/2 w-[78%] -translate-x-1/2 rounded-2xl border border-app-line bg-white p-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)]">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex size-[30px] items-center justify-center rounded-lg bg-app-input text-app-muted">
              <I icon={File02Icon} size={15} />
            </span>
            <span className="text-[12px] font-medium">Exporting to Word</span>
            <span className="ml-auto text-[18px] font-medium">100%</span>
          </div>
          <span className="block h-[6px] w-full rounded-full bg-app-line">
            <span className="block h-full w-full rounded-full bg-[#404040]" />
          </span>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-app-muted">
            <span className="text-app-success">
              <I icon={CheckmarkCircle02Icon} size={13} />
            </span>
            Exported to Word successfully
          </p>
        </div>
      </div>
    </Window>
  );
}

/* V — Client intake */
function IntakeScene() {
  const required = [
    "Relevant contracts or agreements",
    "Correspondence with the other party",
    "Any notices or prior decisions",
    "Proof of identity",
  ];
  return (
    <Window title="Client portal  ›  Upload & submit">
      <div className="flex h-full flex-col gap-3 bg-[#fafafa] p-5">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex items-center gap-1 text-app-muted">
            <span className="flex size-[16px] items-center justify-center rounded-full bg-app-primary text-white">
              <I icon={Tick02Icon} size={10} />
            </span>
            Case intake
          </span>
          <span className="h-px flex-1 bg-app-line" />
          <span className="flex items-center gap-1 font-medium">
            <span className="flex size-[16px] items-center justify-center rounded-full bg-app-primary text-[9px] text-white">2</span>
            Upload & submit
          </span>
        </div>
        <div className="rounded-2xl border border-app-line bg-white p-4">
          <p className="mb-2.5 text-[12px] font-medium">Required documents</p>
          {required.map((r, i) => (
            <div key={r} className="mb-2 flex items-center gap-2 text-[11.5px]">
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-app-primary-50 text-[10px] font-medium text-app-primary">
                {i + 1}
              </span>
              {r}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-app-primary bg-app-primary-50/50 text-center">
          <span className="text-app-primary">
            <I icon={Upload04Icon} size={18} />
          </span>
          <span className="text-[11.5px] font-medium">Click to upload or drag and drop</span>
          <span className="text-[10px] text-app-muted">PDF, DOCX, JPG up to 10MB</span>
        </div>
      </div>
    </Window>
  );
}

export const scenes: Record<SceneName, () => React.ReactElement> = {
  assistant: AssistantScene,
  categories: CategoriesScene,
  citations: CitationsScene,
  draft: DraftScene,
  intake: IntakeScene,
};
