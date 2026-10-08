// Site icons — Hugeicons (stroke).
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiChat02Icon,
  BookSearchIcon,
  Briefcase01Icon,
  Building03Icon,
  ContractsIcon,
  CourtHouseIcon,
  DocumentValidationIcon,
  BookOpen01Icon,
  JusticeScale01Icon,
  LegalDocument01Icon,
  LibraryIcon,
  Mortarboard02Icon,
  SecurityLockIcon,
  SignatureIcon,
  TimelineIcon,
  TranslateIcon,
  WorkflowSquare03Icon,
} from "@hugeicons/core-free-icons";

const icons = {
  assistant: AiChat02Icon,
  research: BookSearchIcon,
  caseLaw: JusticeScale01Icon,
  legislation: LegalDocument01Icon,
  contract: ContractsIcon,
  workflow: WorkflowSquare03Icon,
  lawFirm: Briefcase01Icon,
  government: CourtHouseIcon,
  business: Building03Icon,
  education: Mortarboard02Icon,
  verification: DocumentValidationIcon,
  security: SecurityLockIcon,
  esign: SignatureIcon,
  playbook: BookOpen01Icon,
  translate: TranslateIcon,
  publications: LibraryIcon,
  timeline: TimelineIcon,
} satisfies Record<string, IconSvgElement>;

export type IconName = keyof typeof icons;

export function Icon({ name, className, size = 24 }: { name: IconName; className?: string; size?: number }) {
  return <HugeiconsIcon icon={icons[name]} size={size} color="currentColor" strokeWidth={1.5} className={className} aria-hidden />;
}
