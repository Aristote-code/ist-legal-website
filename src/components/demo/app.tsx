// IST Legal app UI, ported from the product (Juris codebase) and the redesign in
// Figma (IST-Legal-Redesign, frames 472:92 → 1542:218). Pure presentational pieces;
// the demos in ./demos.tsx animate them. Any element the cursor visits carries a
// data-demo id.
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  AttachmentIcon,
  BookOpen01Icon,
  Briefcase01Icon,
  BubbleChatIcon,
  Building01Icon,
  Cancel01Icon,
  Copy01Icon,
  FavouriteIcon,
  File01Icon,
  Folder01Icon,
  GlobeIcon,
  IdeaIcon,
  JusticeScale01Icon,
  LandmarkIcon,
  LegalHammerIcon,
  MoreVerticalIcon,
  PanelLeftIcon,
  QuoteDownIcon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  TextIcon,
  Tick01Icon,
  ToolboxIcon,
  UserCircleIcon,
  UserIcon,
  UserMultipleIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";

export function I({
  icon,
  size = 14,
  stroke = 1.8,
  className = "",
  color = "currentColor",
}: {
  icon: IconSvgElement;
  size?: number;
  stroke?: number;
  className?: string;
  color?: string;
}) {
  return <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={stroke} className={className} />;
}

// ── Law categories (Juris src/data/lawCategories.ts) ────────────────────────
export type Category = { id: string; label: string; description: string; icon: IconSvgElement };

export const CATEGORIES: Category[] = [
  { id: "general", label: "General", description: "Broad legal guidance across all practice areas", icon: JusticeScale01Icon },
  { id: "constitutional", label: "Constitutional", description: "Fundamental rights, government powers, and civil liberties", icon: LandmarkIcon },
  { id: "criminal", label: "Criminal", description: "Criminal offenses, defense, and prosecution matters", icon: Shield01Icon },
  { id: "family", label: "Family", description: "Marriage, divorce, custody, and domestic matters", icon: FavouriteIcon },
  { id: "corporate", label: "Corporate", description: "Business formation, compliance, and governance", icon: Building01Icon },
  { id: "labor", label: "Labor & Employment", description: "Workplace rights, contracts, and disputes", icon: Briefcase01Icon },
  { id: "civil", label: "Civil", description: "Torts, property disputes, and civil litigation", icon: LegalHammerIcon },
  { id: "international", label: "International", description: "Cross-border law, treaties, and international trade", icon: GlobeIcon },
  { id: "contract", label: "Contract", description: "Agreements, obligations, and commercial transactions", icon: File01Icon },
  { id: "human-rights", label: "Human Rights", description: "Individual freedoms, equality, and social justice", icon: UserMultipleIcon },
];

export const cat = (id: string) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

// ── Shell ───────────────────────────────────────────────────────────────────

/** Collapsed sidebar rail (Figma 472:92) */
export function Rail() {
  return (
    <div className="flex w-[52px] shrink-0 flex-col items-center gap-3 border-r border-neutral-200 bg-neutral-50 py-3.5">
      <span className="rounded-lg p-2 text-neutral-900">
        <I icon={PanelLeftIcon} size={18} />
      </span>
      <span data-demo="rail-new" className="rounded-lg bg-app-primary p-2 text-white shadow-sm">
        <I icon={Add01Icon} size={18} />
      </span>
    </div>
  );
}

function SideLink({ icon, label, active, id }: { icon: IconSvgElement; label: string; active?: boolean; id?: string }) {
  return (
    <span
      data-demo={id}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
        active ? "border-neutral-200 bg-white text-app-primary shadow-sm" : "border-transparent text-neutral-900"
      }`}
    >
      <I icon={icon} size={15} className={active ? "text-app-primary" : ""} />
      {label}
    </span>
  );
}

/** Expanded sidebar (Figma 472:227) */
export function Sidebar({ active, children, footerOpen }: { active?: "toolbox"; children?: ReactNode; footerOpen?: boolean }) {
  return (
    <div className="relative flex w-[212px] shrink-0 flex-col border-r border-neutral-200 bg-neutral-50">
      <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
        <span className="flex items-center gap-2">
          <span className="flex size-[26px] items-center justify-center rounded-full bg-app-primary text-white">
            <I icon={JusticeScale01Icon} size={14} stroke={2.2} />
          </span>
          <span className="text-[13px] font-semibold tracking-tight">IST Legal</span>
        </span>
        <I icon={PanelLeftIcon} size={16} />
      </div>
      <div className="mt-1 px-2.5">
        <span data-demo="side-new" className="flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium">
          <I icon={Add01Icon} size={15} className="text-app-primary" />
          New conversation
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-0.5 px-2.5">
        <SideLink icon={Folder01Icon} label="Workspaces" />
        <SideLink icon={ToolboxIcon} label="Toolbox" active={active === "toolbox"} id="side-toolbox" />
      </div>
      <div className="mt-1.5 px-2.5">
        <span className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-[7px] text-[11px] text-neutral-500">
          <I icon={Search01Icon} size={13} className="text-neutral-900" />
          Search...
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className={`flex items-center gap-2.5 border-t border-neutral-200 p-2.5 ${footerOpen ? "bg-white" : ""}`}>
        <span className="flex size-8 items-center justify-center rounded-full border border-app-primary-100 bg-app-primary-50 text-app-primary">
          <I icon={UserCircleIcon} size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold">Jane Doe</span>
          <span className="block text-[10.5px] text-neutral-500">jane@example.com</span>
        </span>
        <span data-demo="profile">
          <I icon={Settings01Icon} size={14} />
        </span>
      </div>
    </div>
  );
}

export function EmptyConversations() {
  return (
    <div className="mt-10 flex flex-col items-center px-4 text-center">
      <I icon={BubbleChatIcon} size={20} className="mb-2.5" />
      <p className="text-[11.5px] font-medium">No conversations yet</p>
      <p className="mt-0.5 text-[10.5px] leading-relaxed text-neutral-600">Start a new chat to get tailored legal guidance.</p>
    </div>
  );
}

export function WorkspaceList({ items }: { items: { label: string; n: number; fresh?: boolean }[] }) {
  return (
    <div className="mt-3 px-2">
      <span className="pl-2.5 text-[9.5px] font-semibold uppercase tracking-wider text-neutral-500">Workspaces</span>
      <div className="mt-1.5 flex flex-col">
        {items.map((w) => (
          <span key={w.label} className={`flex items-center gap-2 rounded-xl px-2 py-[7px] ${w.fresh ? "demo-pop bg-white shadow-sm" : ""}`}>
            <I icon={ArrowRight01Icon} size={12} />
            <span className="flex-1 truncate text-[11.5px] font-medium">{w.label}</span>
            <span className="rounded-md bg-neutral-200 px-1.5 py-px text-[9.5px] font-medium text-neutral-500">{w.n}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Top bar: category switcher + Client portal (Figma 472:92) */
export function TopBar({ category, open, menu, children }: { category?: Category; open?: boolean; menu?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex h-[50px] shrink-0 items-center justify-between border-b border-neutral-100 bg-white px-3.5">
      {children ?? (
        <span className={`relative ${menu ? "z-50" : ""}`}>
        <span
          data-demo="header-cat"
          className={`flex items-center gap-2 rounded-xl border px-3 py-[7px] text-[13px] font-medium transition-shadow ${
            open ? "border-neutral-300 shadow-sm" : "border-neutral-200"
          }`}
        >
          <CatBadge category={category ?? CATEGORIES[0]} />
          <span key={category?.id} className="demo-swap">
            {(category ?? CATEGORIES[0]).label}
          </span>
          <I icon={ArrowDown01Icon} size={14} className={`text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
        {menu}
        </span>
      )}
      <span className="text-[11px] text-neutral-500">Client portal</span>
    </div>
  );
}

export function CatBadge({ category, size = 20 }: { category: Category; size?: number }) {
  return (
    <span className="flex items-center justify-center rounded-md bg-app-primary/[0.08] text-app-primary" style={{ width: size, height: size }}>
      <I icon={category.icon} size={Math.round(size * 0.6)} stroke={2} />
    </span>
  );
}

export function Breadcrumb({ category, title }: { category: Category; title: string }) {
  return (
    <div className="demo-fade flex h-[30px] shrink-0 items-center gap-1.5 border-b border-neutral-100 bg-neutral-50/60 px-4 text-[11px]">
      <I icon={category.icon} size={11} className="text-app-primary" stroke={2} />
      <span className="font-medium text-app-primary">{category.label} Law</span>
      <I icon={ArrowRight02Icon} size={10} className="text-neutral-300" />
      <span className="truncate text-neutral-500">{title}</span>
    </div>
  );
}

// ── Home ────────────────────────────────────────────────────────────────────

export function HomeMark() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="flex size-[40px] items-center justify-center rounded-xl border border-app-primary-100 bg-app-primary-50 text-app-primary">
        <I icon={JusticeScale01Icon} size={20} />
      </span>
      <span className="text-[22px] font-bold tracking-tight">IST Legal</span>
    </div>
  );
}

export function Suggestions({ items, hover, id }: { items: string[]; hover?: number; id?: (i: number) => string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/60 px-3.5 py-2.5 text-[12px] font-semibold">
        <I icon={IdeaIcon} size={14} className="text-neutral-500" />
        Suggestions
      </div>
      {items.map((q, i) => (
        <div
          key={q}
          data-demo={id?.(i)}
          className={`border-b border-neutral-100 px-3.5 py-2 text-[12px] text-neutral-700 transition-colors duration-200 last:border-b-0 ${
            hover === i ? "bg-neutral-50 text-neutral-900" : ""
          }`}
        >
          {q}
        </div>
      ))}
    </div>
  );
}

// ── Composer (Juris ChatInput) ──────────────────────────────────────────────

export function Composer({
  category,
  text,
  placeholder,
  caret,
  ready,
  pressed,
  catOpen,
  attachment,
  menu,
  children,
}: {
  category: Category;
  text?: string;
  placeholder?: string;
  caret?: boolean;
  ready?: boolean;
  pressed?: boolean;
  catOpen?: boolean;
  attachment?: ReactNode;
  menu?: ReactNode;
  children?: ReactNode;
}) {
  const ph = placeholder ?? (category.id === "general" ? "Describe your legal issue..." : `Describe your ${category.label.toLowerCase()} law issue in detail...`);
  return (
    <div className="relative rounded-[24px] bg-app-input p-1.5">
      <div className="flex items-center gap-1.5 px-3 pb-2 pt-1 text-[11.5px] font-medium text-neutral-500">
        <I icon={ZapIcon} size={13} className="fill-neutral-400 text-neutral-400" />
        You are remaining with <strong className="font-semibold text-app-primary">1,450</strong> credits
        <span className="mx-0.5 text-neutral-300">·</span>
        <span className="font-semibold text-app-primary">Upgrade</span>
      </div>
      <div className={`rounded-2xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-300 ${caret ? "border-neutral-200 shadow-md" : "border-transparent"}`}>
        <div className="flex items-center gap-2 px-3 pt-3">
          <span className={`relative ${menu ? "z-50" : ""}`}>
          <span
            data-demo="composer-cat"
            className={`inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-[11.5px] font-medium transition-shadow ${
              catOpen ? "border-neutral-300 shadow-sm" : "border-neutral-200"
            }`}
          >
            <CatBadge category={category} size={18} />
            <span key={category.id} className="demo-swap">
              {category.label}
            </span>
            <I icon={ArrowDown01Icon} size={13} className={`text-neutral-400 transition-transform duration-200 ${catOpen ? "" : "rotate-180"}`} />
          </span>
          {menu}
          </span>
          {attachment}
        </div>
        <div className="px-3 pb-2.5 pt-2">
          <div data-demo="composer-input" className="min-h-[20px] text-[13px] leading-relaxed">
            {text ? (
              <>
                <span className="text-neutral-800">{text}</span>
                {caret && <span className="demo-caret" />}
              </>
            ) : (
              <>
                {caret && <span className="demo-caret -mr-[2.5px]" />}
                <span className="text-neutral-400">{ph}</span>
              </>
            )}
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span data-demo="composer-attach" className="rounded-lg p-1 text-neutral-400">
              <I icon={AttachmentIcon} size={15} />
            </span>
            <span
              data-demo="send"
              className={`flex size-[28px] items-center justify-center rounded-xl transition-all duration-300 ${
                ready ? "bg-app-primary text-white shadow-sm" : "bg-neutral-100 text-neutral-300"
              } ${pressed ? "scale-90" : ""}`}
            >
              <I icon={ArrowUp01Icon} size={15} stroke={2.5} />
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/** Drop-up category list (Juris CategorySelector, dropUp) */
export function CategoryMenu({ selected, hover, dir = "up" }: { selected: string; hover?: string; dir?: "up" | "down" }) {
  return (
    <div
      className={`absolute left-0 z-50 w-[290px] ${dir === "up" ? "demo-menu-up bottom-full mb-2" : "demo-menu-down top-full mt-2"} overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-[0_12px_32px_-8px_rgba(0,0,0,0.16)]`}
    >
      <div className="border-b border-neutral-100 p-2">
        <span className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-[7px] text-[12px] text-neutral-400">
          <I icon={Search01Icon} size={13} />
          Search categories...
        </span>
      </div>
      <div className="flex flex-col p-1.5">
        {CATEGORIES.slice(0, 6).map((c) => (
          <span
            key={c.id}
            data-demo={`cat-${c.id}`}
            className={`flex items-start gap-2.5 rounded-xl px-2.5 py-[7px] transition-colors duration-200 ${
              hover === c.id || selected === c.id ? "bg-neutral-50" : ""
            }`}
          >
            <CatBadge category={c} size={26} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between text-[12px] font-medium">
                {c.label}
                {selected === c.id && <I icon={Tick01Icon} size={13} className="text-app-primary" />}
              </span>
              <span className="block truncate text-[10.5px] text-neutral-400">{c.description}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Messages (Juris ChatMessage) ────────────────────────────────────────────

export function UserMsg({ children, time = "10:42 AM" }: { children: ReactNode; time?: string }) {
  return (
    <div className="demo-rise flex justify-end">
      <div className="flex max-w-[78%] flex-row-reverse gap-2">
        <span className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-500">
          <I icon={UserIcon} size={12} />
        </span>
        <div>
          <div className="mb-1 flex items-center justify-end gap-2">
            <span className="text-[10px] text-neutral-400">{time}</span>
            <span className="text-[11px] font-semibold">You</span>
          </div>
          <div className="rounded-2xl rounded-tr-md border border-app-primary-100 bg-app-primary-50 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-neutral-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiAvatar({ busy }: { busy?: boolean }) {
  return (
    <span
      className={`mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
        busy ? "border-app-primary bg-app-primary text-white" : "border-app-primary-100 bg-app-primary-50 text-app-primary"
      }`}
    >
      <I icon={JusticeScale01Icon} size={12} stroke={busy ? 2.4 : 1.8} />
    </span>
  );
}

export function AiMsg({ children, time = "10:42 AM", actions, width = "max-w-[86%]" }: { children: ReactNode; time?: string; actions?: ReactNode; width?: string }) {
  return (
    <div className="demo-rise flex justify-start">
      <div className={`flex gap-2 ${width}`}>
        <AiAvatar />
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[11px] font-semibold">IST Legal</span>
            <span className="text-[10px] text-neutral-400">{time}</span>
          </div>
          <div className="whitespace-pre-wrap rounded-2xl rounded-tl-md border border-neutral-200 bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-neutral-700">
            {children}
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
}

export function Typing() {
  return (
    <div className="demo-rise flex justify-start">
      <div className="flex gap-2">
        <AiAvatar busy />
        <div className="flex flex-col items-start gap-1">
          <span className="text-[11px] font-semibold">IST Legal</span>
          <div className="flex h-9 items-center gap-1.5 rounded-2xl rounded-tl-md border border-neutral-200 bg-white px-4 shadow-sm">
            {[0, 150, 300].map((d) => (
              <span key={d} className="demo-dot size-1.5 rounded-full bg-neutral-400" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, children, id, hot }: { icon: IconSvgElement; children: ReactNode; id?: string; hot?: boolean }) {
  return (
    <span
      data-demo={id}
      className={`inline-flex h-[28px] items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[11px] font-medium transition-colors duration-200 ${
        hot ? "border-app-primary-200 bg-app-primary-50 text-app-primary" : "border-neutral-200 text-neutral-600"
      }`}
    >
      <I icon={icon} size={13} className={hot ? "text-app-primary" : "text-neutral-400"} />
      {children}
    </span>
  );
}

/** Answer actions (Juris MessageActions) */
export function Actions({ citations = 4, hot, copied }: { citations?: number; hot?: "citations" | "copy" | "export"; copied?: boolean }) {
  return (
    <div className="demo-fade mt-1.5 flex flex-wrap items-center gap-1.5">
      <span className="flex size-[28px] items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-400">
        <I icon={MoreVerticalIcon} size={13} />
      </span>
      <ActionBtn icon={QuoteDownIcon} id="act-citations" hot={hot === "citations"}>
        View citations ({citations})
      </ActionBtn>
      <ActionBtn icon={copied ? Tick01Icon : Copy01Icon} id="act-copy" hot={hot === "copy"}>
        {copied ? "Copied!" : "Copy for Word"}
      </ActionBtn>
      <ActionBtn icon={TextIcon} id="act-export" hot={hot === "export"}>
        Export to Word
      </ActionBtn>
    </div>
  );
}

// ── Overlays ────────────────────────────────────────────────────────────────

export function Scrim({ children, blur }: { children: ReactNode; blur?: boolean }) {
  return (
    <div className={`demo-fade absolute inset-0 z-40 flex items-center justify-center bg-black/30 ${blur ? "backdrop-blur-[3px]" : ""}`}>
      {children}
    </div>
  );
}

/** "Select a Workspace" (Figma 473:473 / Juris Chat new-chat modal) */
export function WorkspaceModal({ hover, picked }: { hover?: string; picked?: string }) {
  return (
    <div className="demo-modal w-[440px] rounded-2xl bg-white p-4 shadow-2xl">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-[15px] font-bold">Select a Workspace</p>
          <p className="mt-0.5 text-[11px] text-neutral-500">Choose a law category to start your new conversation.</p>
        </div>
        <I icon={Cancel01Icon} size={16} className="text-neutral-400" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((c) => {
          const on = hover === c.id || picked === c.id;
          return (
            <span
              key={c.id}
              data-demo={`ws-${c.id}`}
              className={`flex items-center gap-2.5 rounded-xl border p-2 transition-all duration-200 ${
                picked === c.id ? "border-app-primary bg-app-primary-50" : on ? "border-neutral-300 bg-neutral-50 shadow-sm" : "border-neutral-200"
              }`}
            >
              <span className="flex size-[32px] shrink-0 items-center justify-center rounded-lg bg-app-primary/[0.08] text-app-primary">
                <I icon={c.icon} size={16} stroke={2} className={`transition-transform duration-200 ${on ? "scale-110" : ""}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11.5px] font-semibold leading-snug">{c.label}</span>
                <span className="block truncate text-[10px] text-neutral-500">{c.description}</span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Export progress (Juris ExportModal) */
export function ExportModal({ progress }: { progress: number }) {
  const done = progress >= 100;
  return (
    <div className="demo-modal w-[300px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600">
            <I icon={BookOpen01Icon} size={16} />
          </span>
          <span className="text-[14px] font-semibold">Exporting to Word</span>
        </span>
        <I icon={Cancel01Icon} size={15} className="text-neutral-400" />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full bg-neutral-700 transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2.5 text-center">
        <span className="text-[16px] font-bold tabular-nums">{progress}%</span>
        <p className="mt-0.5 text-[12px] text-neutral-500">{done ? "Exported to Word successfully!" : "Exporting to Word..."}</p>
      </div>
    </div>
  );
}
