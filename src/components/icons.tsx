// Menu tile icons — Hugeicons (stroke), 24px, white on #081014.
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiChat02Icon,
  BookSearchIcon,
  Briefcase01Icon,
  Building03Icon,
  ContractsIcon,
  CourtHouseIcon,
  DocumentValidationIcon,
  JusticeScale01Icon,
  LegalDocument01Icon,
  Mortarboard02Icon,
  SecurityLockIcon,
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
} satisfies Record<string, IconSvgElement>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <HugeiconsIcon icon={icons[name]} size={24} color="currentColor" strokeWidth={1.5} className={className} aria-hidden />;
}
