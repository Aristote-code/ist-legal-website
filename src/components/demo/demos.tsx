"use client";

// Product demos: each one replays a real IST Legal flow (Figma IST-Legal-Redesign +
// the Juris app) with a cursor driving it. Sample content is illustrative — it is
// not legal advice and doesn't quote legislation.
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Book01Icon,
  CalendarSyncIcon,
  CheckmarkCircle02Icon,
  File01Icon,
  File02Icon,
  LinkSquare02Icon,
  Loading03Icon,
  Mail01Icon,
  News01Icon,
  SignatureIcon,
  SparklesIcon,
  Tick01Icon,
  ToolboxIcon,
  TranslateIcon,
  Upload04Icon,
  UserIcon,
  WorkflowSquare10Icon,
} from "@hugeicons/core-free-icons";
import type { ComponentType, ReactNode } from "react";
import {
  Actions,
  AiMsg,
  Breadcrumb,
  CategoryMenu,
  Composer,
  EmptyConversations,
  ExportModal,
  HomeMark,
  I,
  Rail,
  Scrim,
  Sidebar,
  Suggestions,
  TopBar,
  Typing,
  UserMsg,
  WorkspaceList,
  WorkspaceModal,
  cat,
} from "./app";
import { Demo, Streamed, useStream, useTicks, useTyped, type Step } from "./engine";

export type DemoProps = { active?: boolean; label: string; onProgress?: (p: { s: number; total: number }) => void };

const between = (s: number, a: number, b: number) => s >= a && s <= b;

// ── Shared layouts ──────────────────────────────────────────────────────────

function Shell({ side, children }: { side: ReactNode; children: ReactNode }) {
  return (
    <div className="relative flex h-full overflow-hidden bg-white">
      {side}
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function Home({ children }: { children: ReactNode }) {
  return <div className="demo-fade flex min-h-0 flex-1 flex-col items-center justify-center gap-[18px] px-8 pb-2 pt-3">{children}</div>;
}

function Thread({ children, composer }: { children: ReactNode; composer: ReactNode }) {
  return (
    <div className="demo-fade flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden px-5 pb-3 pt-4">{children}</div>
      <div className="px-4 pb-3">{composer}</div>
    </div>
  );
}

function Sources({ items }: { items: { kind: string; title: string }[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {items.map((it, i) => (
        <span
          key={it.title}
          className="demo-rise inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10.5px]"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <span className="font-medium text-app-primary">{it.kind}</span>
          <span className="text-neutral-600">{it.title}</span>
        </span>
      ))}
    </div>
  );
}

// ── I. AI Legal Assistant — pick a practice area, ask, get a traceable answer ──

const ASK = "Can my employer end my contract without notice?";
const ANSWER =
  "Generally, no. An employment contract can usually only be ended after notice is given, unless an exception such as serious misconduct applies.\n\nHow much notice depends on the length of service and the terms of the contract — so it's worth checking the termination clause against the applicable law.";

const assistantSteps: Step[] = [
  { d: 900 },
  { d: 1250, cursor: "header-cat", click: true },
  { d: 1350, cursor: "cat-labor", click: true },
  { d: 950, cursor: "composer-input", click: true },
  { d: 1800 },
  { d: 1150, cursor: "send", click: true },
  { d: 1300, hide: true },
  { d: 4200 },
  { d: 1300, cursor: "act-citations" },
  { d: 2200 },
];

export function AssistantDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={assistantSteps} still={9} active={active} label={label} onProgress={onProgress}>
      {(s) => <Assistant s={s} />}
    </Demo>
  );
}

function Assistant({ s }: { s: number }) {
  const category = cat(s >= 3 ? "labor" : "general");
  const typed = useTyped(ASK, s === 4, s >= 5);
  const words = useStream(ANSWER, s === 7, s >= 8);
  const chat = s >= 6;
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} open={s === 2} menu={s === 2 && <CategoryMenu dir="down" selected="general" hover="labor" />} />
      {!chat ? (
        <Home key="home">
          <HomeMark />
          <div className="w-full max-w-[520px]">
            <Composer category={category} text={typed} caret={between(s, 3, 5)} ready={typed.length > 0} pressed={s === 5} />
          </div>
          <div className="w-full max-w-[520px]">
            <Suggestions items={["What are my rights in a landlord dispute?", "Explain the process of filing for divorce", "How does a non-compete clause work?"]} />
          </div>
        </Home>
      ) : (
        <>
          <Breadcrumb category={category} title="Termination without notice" />
          <Thread key="chat" composer={<Composer category={category} />}>
            <UserMsg>{ASK}</UserMsg>
            {s === 6 ? (
              <Typing />
            ) : (
              <AiMsg actions={s >= 8 && <Actions hot={s >= 8 ? "citations" : undefined} />}>
                <Streamed text={ANSWER} count={words} />
              </AiMsg>
            )}
          </Thread>
        </>
      )}
    </Shell>
  );
}

// ── II. Legal Research — open a workspace, follow a suggestion, see the sources ──

const RESEARCH_Q = "What notice is required to end an employment contract?";
const RESEARCH_A =
  "Notice is generally required before an employment contract is terminated. Its length depends on the employee's length of service, and the contract may provide for more than the legal minimum.\n\nThe starting point is the labour law, read together with the contract and how courts have applied the notice rules.";

const researchSteps: Step[] = [
  { d: 900 },
  { d: 1250, cursor: "side-new", click: true },
  { d: 1000, cursor: "ws-criminal" },
  { d: 1150, cursor: "ws-labor", click: true },
  { d: 500, hide: true },
  { d: 1500, cursor: "sugg-0", click: true },
  { d: 1200, hide: true },
  { d: 3800 },
  { d: 2600 },
];

export function ResearchDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={researchSteps} still={8} active={active} label={label} onProgress={onProgress}>
      {(s) => <Research s={s} />}
    </Demo>
  );
}

function Research({ s }: { s: number }) {
  const picked = s >= 4;
  const category = cat(picked ? "labor" : "general");
  const words = useStream(RESEARCH_A, s === 7, s >= 8);
  const workspaces = [
    ...(picked ? [{ label: "Labor & Employment", n: 1, fresh: true }] : []),
    { label: "Constitutional", n: 1 },
    { label: "Family", n: 1 },
    { label: "Corporate", n: 2 },
  ];
  return (
    <Shell
      side={
        <Sidebar>
          <WorkspaceList items={workspaces} />
        </Sidebar>
      }
    >
      <TopBar category={category} />
      {s < 6 ? (
        <Home key={picked ? "home-labor" : "home"}>
          <HomeMark />
          <div className="w-full max-w-[440px]">
            <Composer category={category} />
          </div>
          <div className="w-full max-w-[440px]">
            <Suggestions
              hover={s === 5 ? 0 : undefined}
              id={(i) => `sugg-${i}`}
              items={
                picked
                  ? [RESEARCH_Q, "Is a written employment contract required?", "How is overtime regulated?"]
                  : ["What are my rights in a landlord dispute?", "Explain the process of filing for divorce", "How does a non-compete clause work?"]
              }
            />
          </div>
        </Home>
      ) : (
        <>
          <Breadcrumb category={category} title="Notice to end a contract" />
          <Thread key="chat" composer={<Composer category={category} />}>
            <UserMsg>{RESEARCH_Q}</UserMsg>
            {s === 6 ? (
              <Typing />
            ) : (
              <AiMsg width="max-w-[94%]">
                <Streamed text={RESEARCH_A} count={words} />
                {s >= 8 && (
                  <Sources
                    items={[
                      { kind: "Legislation", title: "Law N° 66/2018 regulating labour" },
                      { kind: "Case law", title: "Illustrative judgment" },
                      { kind: "Regulation", title: "Implementing order" },
                    ]}
                  />
                )}
              </AiMsg>
            )}
          </Thread>
        </>
      )}
      {between(s, 2, 4) && (
        <div className="absolute inset-0 z-40">
          <Scrim blur>
            <div className={s === 4 ? "demo-modal-out" : ""}>
              <WorkspaceModal hover={s === 2 ? "criminal" : s === 3 ? "labor" : undefined} picked={s === 4 ? "labor" : undefined} />
            </div>
          </Scrim>
        </div>
      )}
    </Shell>
  );
}

// ── III / Sources — answer → View citations → inspect the authority ─────────

const CITATIONS = [
  { id: "law", kind: "Legislation", title: "Law N° 66/2018 regulating labour in Rwanda", note: "Provisions on termination and notice" },
  { id: "case", kind: "Case law", title: "Illustrative judgment — Employee v. Employer", note: "Notice and termination without cause" },
  { id: "case2", kind: "Case law", title: "Illustrative judgment — Worker v. Company", note: "Serious misconduct as an exception" },
  { id: "reg", kind: "Regulation", title: "Illustrative implementing regulation", note: "Procedure for termination" },
];

const CITE_A =
  "Notice is generally required before termination. The court in the leading decision looked at whether notice was given, the contract terms, and whether an exception applied.";

function Lines({ n, hot, w = ["100%", "96%", "88%", "92%", "70%"] }: { n: number; hot?: number; w?: string[] }) {
  return (
    <div className="flex flex-col gap-[7px]">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="relative h-[6px] overflow-hidden rounded-full bg-neutral-200" style={{ width: w[i % w.length] }}>
          {hot === i && <span className="demo-highlight absolute inset-0 rounded-full bg-app-primary-200" />}
        </span>
      ))}
    </div>
  );
}

function CitationsPanel({ open, hover, children }: { open: string | null; hover?: string; children?: ReactNode }) {
  return (
    <div className="demo-drawer absolute inset-y-0 right-0 z-30 flex w-[300px] flex-col border-l border-neutral-200 bg-white shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.12)]">
      <div className="flex h-[50px] shrink-0 items-center justify-between border-b border-neutral-100 px-4">
        <span className="text-[13px] font-semibold">Citations (4)</span>
        <span className="text-[10.5px] text-neutral-400">Illustrative</span>
      </div>
      {children ?? (
        <div className="flex flex-col gap-2 overflow-hidden p-3">
          {CITATIONS.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <div
                key={c.id}
                data-demo={`cite-${c.id}`}
                className={`demo-rise rounded-xl border p-3 transition-all duration-300 ${
                  isOpen ? "border-app-primary shadow-[0_0_0_3px_rgba(78,51,217,0.08)]" : hover === c.id ? "border-neutral-300 bg-neutral-50" : "border-neutral-200"
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-medium ${c.kind === "Case law" ? "bg-neutral-100 text-neutral-600" : "bg-app-primary-50 text-app-primary"}`}>{c.kind}</span>
                </div>
                <p className="mt-1.5 text-[11.5px] font-medium leading-snug">{c.title}</p>
                <p className="mt-0.5 text-[10.5px] text-neutral-500">{c.note}</p>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="mt-2.5 rounded-lg bg-neutral-50 p-2.5">
                      <p className="mb-2 text-[9.5px] font-semibold uppercase tracking-wider text-neutral-500">Relevant passage</p>
                      <Lines n={4} hot={isOpen ? 1 : undefined} />
                    </div>
                    <span data-demo={`open-${c.id}`} className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-app-primary">
                      Open source <I icon={LinkSquare02Icon} size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SourceViewer({ kind }: { kind: "case" | "law" }) {
  const isCase = kind === "case";
  return (
    <div className="demo-fade flex min-h-0 flex-1 flex-col p-4">
      <span className="mb-3 inline-flex items-center gap-1 text-[11px] text-neutral-500">
        <I icon={ArrowLeft01Icon} size={12} /> Citations
      </span>
      <span className="w-fit rounded-md bg-app-primary-50 px-1.5 py-0.5 text-[9.5px] font-medium text-app-primary">{isCase ? "Case law" : "Legislation"}</span>
      <p className="mt-2 text-[14px] font-semibold leading-snug">{isCase ? "Illustrative judgment — Employee v. Employer" : "Law N° 66/2018 regulating labour in Rwanda"}</p>
      <p className="mt-1 text-[10.5px] text-neutral-500">{isCase ? "Labour dispute · Termination and notice" : "Termination of the employment contract › Notice"}</p>
      <div className="mt-3 flex gap-1 rounded-lg bg-neutral-100 p-0.5 text-[10.5px] font-medium">
        <span className="flex-1 rounded-md py-1 text-center text-neutral-500">Summary</span>
        <span className="flex-1 rounded-md bg-white py-1 text-center shadow-sm">Original text</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Lines n={3} />
        <div className="demo-focus -mx-2 rounded-lg border border-app-primary-100 bg-app-primary-50/60 p-2">
          <Lines n={3} hot={0} w={["94%", "100%", "62%"]} />
        </div>
        <Lines n={4} />
      </div>
      <p className="mt-auto pt-3 text-[10px] leading-relaxed text-neutral-500">Original wording — verify before relying on the analysis.</p>
    </div>
  );
}

const caseSteps: Step[] = [
  { d: 1000 },
  { d: 1250, cursor: "act-citations", click: true },
  { d: 1400, cursor: "cite-case", click: true },
  { d: 1900 },
  { d: 1150, cursor: "open-case", click: true },
  { d: 3000, hide: true },
];

const sourcesSteps: Step[] = [
  { d: 1000 },
  { d: 1250, cursor: "act-citations", click: true },
  { d: 800, cursor: "cite-case" },
  { d: 800, cursor: "cite-reg" },
  { d: 1150, cursor: "cite-law", click: true },
  { d: 2000 },
  { d: 1150, cursor: "open-law", click: true },
  { d: 3000, hide: true },
];

function CitationsDemo({ active, label, onProgress, variant }: DemoProps & { variant: "case" | "law" }) {
  const steps = variant === "case" ? caseSteps : sourcesSteps;
  return (
    <Demo steps={steps} still={variant === "case" ? 3 : 5} active={active} label={label} onProgress={onProgress}>
      {(s) => <Citations s={s} variant={variant} />}
    </Demo>
  );
}

function Citations({ s, variant }: { s: number; variant: "case" | "law" }) {
  const category = cat("labor");
  const isCase = variant === "case";
  const openAt = isCase ? 3 : 5;
  const viewAt = isCase ? 5 : 7;
  const hover = !isCase ? (s === 2 ? "case" : s === 3 ? "reg" : s === 4 ? "law" : undefined) : s === 2 ? "case" : undefined;
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} />
      <Breadcrumb category={category} title="Termination without notice" />
      <Thread composer={<Composer category={category} />}>
        <UserMsg>{ASK}</UserMsg>
        <AiMsg width="max-w-[80%]" actions={<Actions hot={s >= 1 && s <= 2 ? "citations" : undefined} />}>
          {CITE_A}
        </AiMsg>
      </Thread>
      {s >= 2 && (
        <CitationsPanel open={s >= openAt ? variant : null} hover={hover}>
          {s >= viewAt ? <SourceViewer kind={variant} /> : undefined}
        </CitationsPanel>
      )}
    </Shell>
  );
}

export const CaseLawDemo = (p: DemoProps) => <CitationsDemo {...p} variant="case" />;
export const SourcesDemo = (p: DemoProps) => <CitationsDemo {...p} variant="law" />;

// ── IV. Legislation — inline reference → provision card → original text ────

const LEG_Q = "What does the law say about notice periods?";
const legSteps: Step[] = [
  { d: 900, hide: true },
  { d: 3000 },
  { d: 1200, cursor: "ref-1" },
  { d: 2300 },
  { d: 1150, cursor: "pop-open", click: true },
  { d: 3200, hide: true },
];

export function LegislationDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={legSteps} still={3} active={active} label={label} onProgress={onProgress}>
      {(s) => <Legislation s={s} />}
    </Demo>
  );
}

const LEG_A1 = "Notice periods are set by the labour law";
const LEG_A2 = " and depend on the employee's length of service. A contract can give more notice than the law requires, but not less";
const LEG_A3 = ". Courts have treated notice as required unless an exception applies.";

function Ref({ n, id, on }: { n: number; id?: string; on?: boolean }) {
  return (
    <span
      data-demo={id}
      className={`mx-0.5 inline-flex h-[16px] min-w-[16px] translate-y-[-1px] items-center justify-center rounded-[5px] px-1 align-middle text-[9.5px] font-semibold transition-colors duration-200 ${
        on ? "bg-app-primary text-white" : "bg-app-primary-50 text-app-primary"
      }`}
    >
      {n}
    </span>
  );
}

function Legislation({ s }: { s: number }) {
  const category = cat("labor");
  const all = LEG_A1 + LEG_A2 + LEG_A3;
  const words = useStream(all, s === 1, s >= 2, 24);
  const n1 = LEG_A1.split(/(\s+)/).length;
  const n2 = (LEG_A1 + LEG_A2).split(/(\s+)/).length;
  const popover = s === 3 || s === 4;
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} />
      <Breadcrumb category={category} title="Notice periods" />
      <Thread composer={<Composer category={category} />}>
        <UserMsg>{LEG_Q}</UserMsg>
        {s === 0 ? (
          <Typing />
        ) : (
          <AiMsg width="max-w-[86%]" actions={s >= 2 && <Actions citations={2} />}>
            <span className="relative">
              <Streamed text={LEG_A1} count={Math.min(words, n1)} />
              {words >= n1 && <Ref n={1} id="ref-1" on={popover} />}
              {words > n1 && <Streamed text={LEG_A2} count={words - n1} />}
              {words >= n2 && <Ref n={2} />}
              {words > n2 && <Streamed text={LEG_A3} count={words - n2} />}
            </span>
          </AiMsg>
        )}
      </Thread>

      {popover && (
        <div className="demo-pop absolute left-[202px] top-[262px] z-40 w-[330px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.22)]">
          <span className="absolute -top-[6px] left-[152px] size-3 rotate-45 border-l border-t border-neutral-200 bg-white" />
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-app-primary-50 px-1.5 py-0.5 text-[9.5px] font-medium text-app-primary">Legislation</span>
            <span className="text-[10px] text-neutral-400">Rwanda</span>
          </div>
          <p className="mt-2 text-[12.5px] font-semibold leading-snug">Law N° 66/2018 regulating labour in Rwanda</p>
          <p className="mt-0.5 text-[10.5px] text-neutral-500">Termination of the employment contract › Notice</p>
          <div className="mt-3 rounded-lg bg-neutral-50 p-2.5">
            <p className="mb-1.5 flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-wider text-neutral-500">
              <I icon={SparklesIcon} size={11} className="text-app-primary" /> In short
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-700">Sets a minimum notice period that grows with length of service.</p>
          </div>
          <span data-demo="pop-open" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-app-primary">
            Read the original provision <I icon={ArrowRight01Icon} size={12} />
          </span>
        </div>
      )}

      {s >= 5 && (
        <div className="demo-drawer absolute inset-y-0 right-0 z-30 flex w-[330px] flex-col border-l border-neutral-200 bg-white shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.12)]">
          <div className="flex h-[50px] shrink-0 items-center border-b border-neutral-100 px-4 text-[13px] font-semibold">Source</div>
          <div className="flex min-h-0 flex-1">
            <div className="w-[96px] shrink-0 border-r border-neutral-100 bg-neutral-50/60 p-2.5 text-[10px] text-neutral-500">
              {["General", "Contract", "Wages", "Termination", "Disputes"].map((c) => (
                <p key={c} className={`rounded-md px-2 py-1.5 ${c === "Termination" ? "bg-white font-medium text-app-primary shadow-sm" : ""}`}>
                  {c}
                </p>
              ))}
            </div>
            <SourceViewer kind="law" />
          </div>
        </div>
      )}
    </Shell>
  );
}

// ── V. Contract review — attach, ask, flagged clauses, export ──────────────

const REVIEW_Q = "Review the termination clause for risks.";
const FLAGS = [
  { clause: "Clause 8.2 — Termination", note: "Notice may be shorter than the legal minimum.", level: "High", tone: "bg-red-50 text-red-600" },
  { clause: "Clause 11 — Non-compete", note: "Scope and duration are broad; check enforceability.", level: "Medium", tone: "bg-amber-50 text-amber-700" },
  { clause: "Clause 4 — Probation", note: "Consistent with the rest of the agreement.", level: "OK", tone: "bg-emerald-50 text-emerald-700" },
];

function FileChip({ name, progress, compact }: { name: string; progress: number; compact?: boolean }) {
  const done = progress >= 100;
  return (
    <span className={`demo-pop inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white ${compact ? "px-2 py-1" : "px-2.5 py-1.5"}`}>
      <span className="flex size-[22px] items-center justify-center rounded-md bg-red-50 text-red-500">
        <I icon={File02Icon} size={12} />
      </span>
      <span className="text-[11px] font-medium">{name}</span>
      {done ? (
        <I icon={CheckmarkCircle02Icon} size={13} className="text-emerald-500" />
      ) : (
        <span className="relative h-[3px] w-10 overflow-hidden rounded-full bg-neutral-100">
          <span className="absolute inset-y-0 left-0 rounded-full bg-app-primary transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </span>
      )}
    </span>
  );
}

const contractSteps: Step[] = [
  { d: 900 },
  { d: 1200, cursor: "composer-attach", click: true },
  { d: 1300, hide: true },
  { d: 1500 },
  { d: 1150, cursor: "send", click: true },
  { d: 1200, hide: true },
  { d: 2600 },
  { d: 1150, cursor: "act-export", click: true },
  { d: 2900, hide: true },
  { d: 1200 },
];

export function ContractDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={contractSteps} still={7} active={active} label={label} onProgress={onProgress}>
      {(s) => <Contract s={s} />}
    </Demo>
  );
}

function Contract({ s }: { s: number }) {
  const category = cat("contract");
  const upload = useTicks(s === 2, s >= 3, 90, 10) * 10;
  const typed = useTyped(REVIEW_Q, s === 3, s >= 4, 30);
  const flags = useTicks(s === 6, s >= 7, 550, 3);
  const exp = [0, 15, 35, 55, 72, 88, 100][useTicks(s === 8, s >= 9, 400, 6)];
  const chat = s >= 5;
  const file = "Employment_Agreement.pdf";
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} />
      {!chat ? (
        <Home key="home">
          <HomeMark />
          <div className="w-full max-w-[540px]">
            <Composer
              category={category}
              text={typed}
              caret={between(s, 2, 4)}
              ready={typed.length > 0}
              pressed={s === 4}
              attachment={s >= 2 && <FileChip name={file} progress={upload} compact />}
            />
          </div>
          <p className="text-[11px] text-neutral-400">PDF, DOCX up to 10MB · Your documents stay in your workspace</p>
        </Home>
      ) : (
        <>
          <Breadcrumb category={category} title="Employment agreement review" />
          <Thread key="chat" composer={<Composer category={category} />}>
            <UserMsg>
              <span className="mb-1.5 block">
                <FileChip name={file} progress={100} compact />
              </span>
              {REVIEW_Q}
            </UserMsg>
            {s === 5 ? (
              <Typing />
            ) : (
              <AiMsg width="max-w-[90%]" actions={s >= 7 && <Actions hot={s >= 7 && s <= 8 ? "export" : undefined} />}>
                <span className="block">
                  I reviewed <strong className="font-semibold text-neutral-900">{file}</strong> — {flags >= 3 ? "3 clauses" : "checking clauses"} to look at:
                </span>
                <span className="mt-2 flex flex-col gap-1">
                  {FLAGS.slice(0, flags).map((f) => (
                    <span key={f.clause} className="demo-rise flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50/60 px-2.5 py-1.5">
                      <span className="min-w-0 flex-1 leading-snug">
                        <span className="block text-[11px] font-semibold text-neutral-900">{f.clause}</span>
                        <span className="block truncate text-[10.5px] text-neutral-600">{f.note}</span>
                      </span>
                      <span className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold ${f.tone}`}>{f.level}</span>
                    </span>
                  ))}
                </span>
              </AiMsg>
            )}
          </Thread>
        </>
      )}
      {s >= 8 && (
        <Scrim blur>
          <ExportModal progress={exp} />
        </Scrim>
      )}
    </Shell>
  );
}

// ── VI. Workflows — Toolbox → E-Signing Centre → upload → send ─────────────

const TOOLS = [
  { id: "workflows", label: "Workflows", description: "Automate your repetitive legal tasks with custom workflow sequences.", icon: WorkflowSquare10Icon, color: "#6366F1" },
  { id: "esign", label: "E-Signing Center", description: "Securely send, track, and manage digital signatures for documents.", icon: SignatureIcon, color: "#0EA5E9" },
  { id: "playbooks", label: "Playbooks", description: "Access standardized procedural guides for handling legal scenarios.", icon: Book01Icon, color: "#F59E0B" },
  { id: "translators", label: "File Translators", description: "Translate complex legal documents while preserving context.", icon: TranslateIcon, color: "#10B981" },
  { id: "publications", label: "Publications", description: "Browse curated legal journals, case studies, and research papers.", icon: News01Icon, color: "#EC4899" },
  { id: "timelines", label: "Timelines", description: "Visualize case progressions, milestones, and critical deadlines.", icon: CalendarSyncIcon, color: "#8B5CF6" },
];

const matterSteps: Step[] = [
  { d: 900 },
  { d: 1200, cursor: "side-toolbox", click: true },
  { d: 1500, cursor: "tool-esign", click: true },
  { d: 1300, cursor: "btn-upload", click: true },
  { d: 1250, cursor: "simulate", click: true },
  { d: 1300, cursor: "signer-email", click: true },
  { d: 1300 },
  { d: 1000, cursor: "signer-name", click: true },
  { d: 900 },
  { d: 1150, cursor: "send-sign", click: true },
  { d: 2800, hide: true },
];

export function MattersDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={matterSteps} still={10} active={active} label={label} onProgress={onProgress}>
      {(s) => <Matters s={s} />}
    </Demo>
  );
}

function PageHead({ icon, title }: { icon: typeof ToolboxIcon; title: string }) {
  return (
    <div className="flex h-[50px] shrink-0 items-center gap-2 border-b border-neutral-100 bg-white px-4">
      <span className="flex size-6 items-center justify-center rounded-md bg-app-primary/10 text-app-primary">
        <I icon={icon} size={13} stroke={2.2} />
      </span>
      <span key={title} className="demo-swap text-[13px] font-semibold tracking-tight">
        {title}
      </span>
    </div>
  );
}

function Field({ id, value, placeholder, focus }: { id: string; value: string; placeholder: string; focus?: boolean }) {
  return (
    <span
      data-demo={id}
      className={`flex h-[30px] flex-1 items-center rounded-lg border px-2.5 text-[11px] transition-[border-color,box-shadow] duration-200 ${
        focus ? "border-app-primary bg-white shadow-[0_0_0_3px_rgba(78,51,217,0.12)]" : "border-neutral-200 bg-neutral-100"
      }`}
    >
      {value ? <span>{value}</span> : <span className="text-neutral-400">{placeholder}</span>}
      {focus && <span className="demo-caret" />}
    </span>
  );
}

function Matters({ s }: { s: number }) {
  const screen = s < 2 ? "home" : s < 3 ? "toolbox" : s < 4 ? "esign" : s < 10 ? "upload" : "sent";
  const fileProgress = useTicks(s === 5, s >= 6, 70, 10) * 10;
  const email = useTyped("a.uwase@example.com", s === 6, s >= 7, 26);
  const name = useTyped("Aline Uwase", s === 8, s >= 9, 22);
  return (
    <Shell
      side={
        <Sidebar active={s >= 2 ? "toolbox" : undefined}>
          <EmptyConversations />
        </Sidebar>
      }
    >
      {screen === "home" && (
        <>
          <TopBar category={cat("general")} />
          <Home>
            <HomeMark />
            <div className="w-full max-w-[420px]">
              <Composer category={cat("general")} />
            </div>
          </Home>
        </>
      )}

      {screen === "toolbox" && (
        <>
          <PageHead icon={ToolboxIcon} title="Toolbox" />
          <div className="demo-fade flex-1 bg-neutral-50/60 px-5 py-5">
            <p className="text-[17px] font-semibold tracking-tight">Legal Toolbox</p>
            <p className="mt-0.5 text-[11px] text-neutral-500">Access our specialized tools to accelerate your legal workflows.</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {TOOLS.map((t, i) => (
                <span
                  key={t.id}
                  data-demo={`tool-${t.id}`}
                  className="demo-rise flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${t.color}14`, color: t.color }}>
                    <I icon={t.icon} size={17} stroke={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11.5px] font-semibold">{t.label}</span>
                    <span className="line-clamp-2 block text-[9.5px] leading-snug text-neutral-500">{t.description}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {(screen === "esign" || screen === "sent") && (
        <>
          <PageHead icon={SignatureIcon} title="E-Signing Centre" />
          <div className="demo-fade flex-1 bg-neutral-50/60 px-5 py-5">
            <p className="text-[17px] font-semibold tracking-tight">Manage E-Signatures</p>
            <p className="mt-0.5 text-[11px] text-neutral-500">Upload files and track digital signature flows inside your workspace.</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="flex gap-1 text-[10.5px]">
                {[
                  ["All", screen === "sent" ? 2 : 1],
                  ["Pending", screen === "sent" ? 1 : 0],
                  ["Completed", 1],
                ].map(([t, n], i) => (
                  <span key={t} className={`flex items-center gap-1 rounded-lg px-2 py-1 ${i === 0 ? "bg-app-primary-50 font-medium text-app-primary" : "text-neutral-600"}`}>
                    {t}
                    <span className={`rounded px-1 text-[9px] ${i === 0 ? "bg-app-primary text-white" : "bg-neutral-200"}`}>{n}</span>
                  </span>
                ))}
              </span>
              <span data-demo="btn-upload" className="flex items-center gap-1.5 rounded-full bg-app-primary px-3 py-1.5 text-[11px] font-medium text-white">
                <I icon={Upload04Icon} size={12} /> Upload Document
              </span>
            </div>
            <div className="mt-5 flex gap-6">
              {screen === "sent" && <DocTile name="Contract_Draft" size="248 KB" status="Pending" fresh />}
              <DocTile name="Aline&George" size="247.6 KB" status="Completed" />
            </div>
          </div>
          {screen === "sent" && (
            <div className="demo-toast absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-neutral-900 px-3.5 py-2 text-[11.5px] text-white shadow-lg">
              <I icon={CheckmarkCircle02Icon} size={14} className="text-emerald-400" />
              Sent for signing to Aline Uwase
            </div>
          )}
        </>
      )}

      {screen === "upload" && (
        <>
          <div className="flex h-[50px] shrink-0 items-center gap-1.5 border-b border-neutral-100 bg-white px-4 text-[11px] text-neutral-500">
            <I icon={ArrowLeft01Icon} size={12} /> Back to Documents
          </div>
          <div className="demo-fade flex-1 overflow-hidden bg-neutral-50/60 px-7 py-4">
            <p className="text-[15px] font-semibold tracking-tight">Upload Document for Signing</p>
            <p className="mt-0.5 text-[10.5px] text-neutral-500">Upload a PDF document and add signers who will receive an invitation to sign.</p>
            <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider">
                <I icon={File01Icon} size={12} className="text-app-primary" /> Document
              </p>
              {s < 5 ? (
                <>
                  <div className="mt-2 flex flex-col items-center rounded-lg border border-dashed border-neutral-300 py-3 text-center">
                    <I icon={Upload04Icon} size={16} className="text-neutral-500" />
                    <p className="mt-1 text-[10.5px]">Drag and drop your PDF here</p>
                    <p className="text-[9px] text-neutral-400">or click to browse</p>
                  </div>
                  <p data-demo="simulate" className="mt-2 flex items-center justify-center gap-1 text-[10px] font-semibold text-app-primary">
                    <I icon={SparklesIcon} size={11} /> Simulate Uploading &quot;signed_Contract_Draft.pdf&quot;
                  </p>
                </>
              ) : (
                <div className="demo-pop mt-2 flex items-center gap-2.5 rounded-lg border border-neutral-200 p-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-app-primary-50 text-app-primary">
                    <I icon={File02Icon} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium">signed_Contract_Draft.pdf</span>
                    <span className="mt-1 block h-[3px] overflow-hidden rounded-full bg-neutral-100">
                      <span className="block h-full rounded-full bg-app-primary transition-[width] duration-150" style={{ width: `${fileProgress}%` }} />
                    </span>
                  </span>
                  {fileProgress >= 100 ? (
                    <I icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500" />
                  ) : (
                    <span className="text-[10px] tabular-nums text-neutral-400">{fileProgress}%</span>
                  )}
                </div>
              )}
            </div>
            <div className="mt-2.5 rounded-xl border border-neutral-200 bg-white p-3">
              <p className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <I icon={Mail01Icon} size={12} className="text-app-primary" /> Signers
                </span>
                <span className="normal-case tracking-normal text-app-primary">+ Add Signer</span>
              </p>
              <div className="mt-2 flex gap-2">
                <Field id="signer-email" value={email} placeholder="signer@example.com" focus={between(s, 6, 7)} />
                <Field id="signer-name" value={name} placeholder="Full Name" focus={s === 8 || s === 9} />
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-2">
              <span className="rounded-full border border-neutral-300 bg-white px-6 py-1.5 text-[11px]">Cancel</span>
              <span
                data-demo="send-sign"
                className={`flex items-center gap-1.5 rounded-full bg-app-primary px-5 py-1.5 text-[11px] font-medium text-white transition-transform ${s === 9 ? "scale-95" : ""}`}
              >
                <I icon={Upload04Icon} size={12} /> Send for Signing
              </span>
            </div>
          </div>
        </>
      )}
    </Shell>
  );
}

function DocTile({ name, size, status, fresh }: { name: string; size: string; status: string; fresh?: boolean }) {
  return (
    <span className={`flex w-[96px] flex-col items-center text-center ${fresh ? "demo-pop" : ""}`}>
      <svg width="44" height="52" viewBox="0 0 44 52" aria-hidden>
        <path d="M4 2h24l14 14v30a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" fill={fresh ? "#D9D2F8" : "#C4B5F4"} stroke="#7C9FE6" strokeWidth="1.5" />
        <path d="M28 2v10a4 4 0 0 0 4 4h10" fill="#A9BFF0" stroke="#7C9FE6" strokeWidth="1.5" />
      </svg>
      <span className="mt-1.5 max-w-full truncate text-[11px] font-medium">{name}</span>
      <span className="text-[9px] text-neutral-400">{size}</span>
      <span className={`mt-1 rounded-full px-1.5 py-px text-[9px] font-medium ${status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{status}</span>
    </span>
  );
}

// ── Practice areas — switch category mid-conversation (Figma 504:5559) ─────

const catSteps: Step[] = [
  { d: 1000 },
  { d: 1200, cursor: "header-cat", click: true },
  { d: 1300, cursor: "cat-labor", click: true },
  { d: 1500, cursor: "confirm-new", click: true },
  { d: 900, hide: true },
  { d: 1400, cursor: "composer-input" },
  { d: 1600 },
];

export function CategoriesDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={catSteps} still={3} active={active} label={label} onProgress={onProgress}>
      {(s) => <Categories s={s} />}
    </Demo>
  );
}

function Categories({ s }: { s: number }) {
  const switched = s >= 4;
  const category = cat(switched ? "labor" : "family");
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} open={s === 2} menu={s === 2 && <CategoryMenu dir="down" selected="family" hover="labor" />} />
      {!switched ? (
        <>
          <Breadcrumb category={category} title="Child custody after separation" />
          <Thread composer={<Composer category={category} />}>
            <UserMsg time="02:40 PM">My partner and I are separating and we have two children. How does child custody work?</UserMsg>
            <AiMsg time="02:41 PM" actions={<Actions citations={3} />}>
              Thank you for your family law question. Family law covers matters including marriage, divorce, child custody, adoption, and domestic relations.
            </AiMsg>
          </Thread>
        </>
      ) : (
        <Home key="new">
          <HomeMark />
          <div className="w-full max-w-[520px]">
            <Composer category={category} caret={s >= 5} />
          </div>
          <div className="w-full max-w-[520px]">
            <Suggestions items={["What notice is required to end an employment contract?", "Is a written employment contract required?", "How is overtime regulated?"]} />
          </div>
        </Home>
      )}
      {s === 3 && (
        <Scrim blur>
          <div className="demo-modal w-[290px] rounded-2xl bg-white p-4 shadow-2xl">
            <p className="text-[14px] font-bold">Change Law Category?</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-neutral-600">
              Changing the law category will start a new conversation. This ensures your legal context remains accurate and isolated for the new category. Do you wish to proceed?
            </p>
            <div className="mt-3.5 flex gap-2">
              <span className="flex-1 rounded-full bg-neutral-100 py-2 text-center text-[11.5px] font-medium">Cancel</span>
              <span data-demo="confirm-new" className="flex-1 rounded-full bg-app-primary py-2 text-center text-[11.5px] font-medium text-white">
                Start New Chat
              </span>
            </div>
          </div>
        </Scrim>
      )}
    </Shell>
  );
}

// ── Draft & export — memo → Copy for Word → Export to Word → document ──────

const MEMO = "Memo — Termination without notice\n\nIssue: whether the employer could end the contract without notice.\n\nShort answer: notice was likely required. No exception appears to apply on the facts provided.";

const draftSteps: Step[] = [
  { d: 900, hide: true },
  { d: 3000 },
  { d: 1150, cursor: "act-copy", click: true },
  { d: 1000 },
  { d: 1150, cursor: "act-export", click: true },
  { d: 2900, hide: true },
  { d: 2600 },
];

export function DraftDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={draftSteps} still={6} active={active} label={label} onProgress={onProgress}>
      {(s) => <Draft s={s} />}
    </Demo>
  );
}

function Draft({ s }: { s: number }) {
  const category = cat("labor");
  const words = useStream(MEMO, s === 1, s >= 2, 30);
  const exp = [0, 15, 35, 55, 72, 88, 100][useTicks(s === 5, s >= 6, 400, 6)];
  return (
    <Shell side={<Rail />}>
      <TopBar category={category} />
      <Breadcrumb category={category} title="Memo — Termination without notice" />
      <Thread composer={<Composer category={category} />}>
        <UserMsg>Draft a short memo on whether notice was required.</UserMsg>
        {s === 0 ? (
          <Typing />
        ) : (
          <AiMsg width="max-w-[88%]" actions={s >= 2 && <Actions copied={s === 3 || s === 4} hot={s >= 4 ? "export" : s >= 2 ? "copy" : undefined} />}>
            <Streamed text={MEMO} count={words} />
          </AiMsg>
        )}
      </Thread>
      {s === 5 && (
        <Scrim blur>
          <ExportModal progress={exp} />
        </Scrim>
      )}
      {s >= 6 && (
        <Scrim>
          <div className="demo-doc w-[330px] rounded-md bg-white shadow-2xl">
            <div className="flex items-center gap-2 rounded-t-md bg-[#2B579A] px-3 py-1.5 text-[10.5px] font-medium text-white">
              <I icon={File02Icon} size={12} /> Memo_Termination.docx
            </div>
            <div className="px-6 py-5">
              <p className="text-[14px] font-semibold">Memo — Termination without notice</p>
              <p className="mt-1 text-[9.5px] text-neutral-400">Labor & Employment · Prepared with IST Legal</p>
              <div className="mt-4 flex flex-col gap-3">
                <Lines n={3} />
                <Lines n={4} />
                <Lines n={2} />
              </div>
            </div>
          </div>
        </Scrim>
      )}
    </Shell>
  );
}

// ── Client intake (Juris ClientIntake) ──────────────────────────────────────

const intakeSteps: Step[] = [
  { d: 800 },
  { d: 1100, cursor: "f-name", click: true },
  { d: 800 },
  { d: 1000, cursor: "f-email", click: true },
  { d: 1000 },
  { d: 1000, cursor: "f-desc", click: true },
  { d: 2000 },
  { d: 1100, cursor: "gen", click: true },
  { d: 2700, hide: true },
  { d: 1300, cursor: "drop", click: true },
  { d: 1600, hide: true },
  { d: 1100, cursor: "submit", click: true },
  { d: 2400, hide: true },
];

export function IntakeDemo({ active, label, onProgress }: DemoProps) {
  return (
    <Demo steps={intakeSteps} still={9} active={active} label={label} onProgress={onProgress}>
      {(s) => <Intake s={s} />}
    </Demo>
  );
}

function StepDot({ n, label, on, done }: { n: number; label: string; on: boolean; done?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`flex size-[22px] items-center justify-center rounded-full text-[10px] font-semibold transition-colors duration-500 ${on ? "bg-app-primary text-white" : "bg-neutral-100 text-neutral-400"}`}>
        {done ? <I icon={Tick01Icon} size={12} stroke={2.4} /> : n}
      </span>
      <span className={`text-[10.5px] font-medium ${on ? "" : "text-neutral-400"}`}>{label}</span>
    </span>
  );
}

function Input({ id, label, value, focus, tall }: { id: string; label: string; value: string; focus?: boolean; tall?: boolean }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="text-[10.5px] font-medium text-neutral-700">{label}</span>
      <span
        data-demo={id}
        className={`flex rounded-lg border px-2.5 text-[11px] transition-[border-color,box-shadow] duration-200 ${tall ? "h-[46px] items-start py-2" : "h-[30px] items-center"} ${
          focus ? "border-app-primary-200 shadow-[0_0_0_3px_rgba(78,51,217,0.1)]" : "border-neutral-200"
        }`}
      >
        {value}
        {focus && <span className="demo-caret" />}
      </span>
    </span>
  );
}

function Intake({ s }: { s: number }) {
  const name = useTyped("Aline Uwase", s === 2, s >= 3, 22);
  const email = useTyped("aline@example.com", s === 4, s >= 5, 26);
  const desc = useTyped("My employer ended my contract without notice after four years.", s === 6, s >= 7, 40);
  const analysis = useTicks(s === 8, s >= 9, 800, 3);
  const files = useTicks(s === 10, s >= 11, 600, 2);
  const step2 = s >= 9;
  const done = s >= 12;
  return (
    <div className="flex h-full flex-col overflow-hidden bg-neutral-50">
      <div className="flex h-[44px] shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4">
        <span className="flex items-center gap-2 text-[12px] font-semibold">
          <span className="flex size-[22px] items-center justify-center rounded-full bg-app-primary text-white">
            <I icon={UserIcon} size={11} stroke={2.2} />
          </span>
          IST Legal · Client portal
        </span>
        <span className="text-[10.5px] text-neutral-500">Step {step2 ? 2 : 1} of 2</span>
      </div>
      <div className="flex flex-1 justify-center overflow-hidden px-6 py-4">
        <div className="w-full max-w-[540px]">
          <p key={step2 ? "b" : "a"} className="demo-swap text-[19px] font-bold tracking-tight">
            {step2 ? "Document upload" : "Start your case intake"}
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-500">
            {step2 ? "Upload the documents below so your lawyer can review the matter." : "Tell us about your matter. We'll prepare a document checklist for you."}
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <StepDot n={1} label="Case intake" on done={step2} />
            <span className="h-px flex-1 bg-neutral-200" />
            <StepDot n={2} label="Upload & submit" on={step2} />
          </div>

          {!step2 ? (
            <div className="demo-fade mt-4 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <Input id="f-name" label="Full name" value={name} focus={between(s, 1, 2)} />
                <Input id="f-email" label="Email" value={email} focus={between(s, 3, 4)} />
              </div>
              <Input id="f-desc" label="Describe your matter" value={desc} focus={between(s, 5, 6)} tall />
              {s < 8 ? (
                <span data-demo="gen" className={`mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-app-primary py-2.5 text-[12px] font-semibold text-white transition-transform ${s === 7 ? "scale-[0.98]" : ""}`}>
                  Generate instructions <I icon={ArrowRight01Icon} size={13} />
                </span>
              ) : (
                <div className="demo-pop mt-1 rounded-2xl border border-app-primary-200 bg-app-primary-50/50 p-3.5">
                  <p className="text-[11.5px] font-semibold text-app-primary">Analyzing request and creating upload instructions</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-app-primary transition-[width] duration-500" style={{ width: `${(analysis / 3) * 100}%` }} />
                  </div>
                  <div className="mt-2.5 flex flex-col gap-1.5 text-[11px]">
                    {["Analyzing request details...", "Identifying legal category...", "Generating document requirements..."].map((l, i) => {
                      const ok = analysis > i;
                      const busy = analysis === i;
                      return (
                        <span key={l} className={`flex items-center gap-2 ${ok ? "" : busy ? "text-app-primary" : "text-neutral-400"}`}>
                          <span className={`flex size-4 items-center justify-center rounded-full border ${ok ? "border-app-primary bg-app-primary text-white" : busy ? "border-app-primary" : "border-neutral-300"}`}>
                            {ok ? <I icon={Tick01Icon} size={10} stroke={2.4} /> : busy ? <I icon={Loading03Icon} size={10} className="animate-spin" /> : null}
                          </span>
                          {l}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="demo-fade mt-4 grid grid-cols-[1fr_1fr] gap-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-3">
                <p className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold">
                  <I icon={File01Icon} size={13} className="text-app-primary" /> Required documents
                </p>
                <ol className="flex flex-col gap-2">
                  {["Employment contract", "Termination letter or notice", "Payslips for the last months", "Correspondence with the employer"].map((d, i) => (
                    <li key={d} className="demo-rise flex items-start gap-2 text-[10.5px] leading-snug text-neutral-700" style={{ animationDelay: `${i * 80}ms` }}>
                      <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-app-primary-50 text-[9px] font-semibold text-app-primary">{i + 1}</span>
                      {d}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col gap-2">
                <div data-demo="drop" className="flex flex-col items-center rounded-2xl border-2 border-dashed border-app-primary-200 bg-app-primary-50/30 px-3 py-3 text-center">
                  <span className="flex size-8 items-center justify-center rounded-full border border-app-primary-100 bg-white text-app-primary">
                    <I icon={Upload04Icon} size={14} />
                  </span>
                  <p className="mt-1.5 text-[11px] font-semibold">Click to upload or drag and drop</p>
                  <p className="text-[9.5px] text-neutral-500">PDF, DOCX, JPG up to 10MB</p>
                </div>
                {["Employment_contract.pdf", "Termination_letter.pdf"].slice(0, files).map((f) => (
                  <span key={f} className="demo-pop flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-2.5 py-1.5 text-[10.5px]">
                    <span className="flex items-center gap-1.5">
                      <I icon={File02Icon} size={12} className="text-neutral-400" />
                      {f}
                    </span>
                    <I icon={CheckmarkCircle02Icon} size={12} className="text-emerald-500" />
                  </span>
                ))}
                {done ? (
                  <div className="demo-pop rounded-2xl border border-emerald-200 bg-emerald-50 p-2.5 text-center">
                    <span className="mx-auto mb-1 flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <I icon={Tick01Icon} size={13} stroke={2.4} />
                    </span>
                    <p className="text-[11.5px] font-semibold text-emerald-900">Case submitted</p>
                    <p className="text-[10px] text-emerald-800/80">Your lawyer will review it shortly.</p>
                  </div>
                ) : (
                  <span
                    data-demo="submit"
                    className={`mt-auto flex items-center justify-center rounded-xl py-2 text-[11.5px] font-semibold transition-colors duration-300 ${
                      files >= 2 ? "bg-app-primary text-white" : "bg-neutral-100 text-neutral-400"
                    } ${s === 11 ? "scale-[0.98]" : ""}`}
                  >
                    Submit case
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Registry ────────────────────────────────────────────────────────────────

export type SceneName = "assistant" | "categories" | "citations" | "draft" | "intake" | "research" | "caseLaw" | "legislation" | "contract" | "matters";

export const scenes: Record<SceneName, ComponentType<DemoProps>> = {
  assistant: AssistantDemo,
  categories: CategoriesDemo,
  citations: SourcesDemo,
  draft: DraftDemo,
  intake: IntakeDemo,
  research: ResearchDemo,
  caseLaw: CaseLawDemo,
  legislation: LegislationDemo,
  contract: ContractDemo,
  matters: MattersDemo,
};
