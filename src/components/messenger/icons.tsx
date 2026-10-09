// Icons for the messenger, feedback popup and admin — Hugeicons (stroke), like the rest of the site.
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Bug01Icon,
  BulbIcon,
  Camera01Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  Chatting01Icon,
  CursorPointer01Icon,
  HelpCircleIcon,
  Home01Icon,
  Image01Icon,
  LegalDocument01Icon,
  LinkSquare02Icon,
  Mail01Icon,
  Megaphone01Icon,
  Message01Icon,
  BubbleChatIcon,
  Search01Icon,
  SentIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

export type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
};

function make(icon: IconSvgElement) {
  function Icon({ size = 20, strokeWidth = 1.5, className, ...rest }: IconProps) {
    return <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden={rest["aria-hidden"] ?? true} />;
  }
  return Icon;
}

export const BookIcon = make(BookOpen01Icon);
export const BugIcon = make(Bug01Icon);
export const ChatIcon = make(BubbleChatIcon);
export const CheckIcon = make(Tick02Icon);
export const ChevronDownIcon = make(ArrowDown01Icon);
export const ChevronLeftIcon = make(ArrowLeft01Icon);
export const ChevronRightIcon = make(ArrowRight01Icon);
export const CloseIcon = make(Cancel01Icon);
export const CursorIcon = make(CursorPointer01Icon);
export const ExternalLinkIcon = make(LinkSquare02Icon);
export const HelpIcon = make(HelpCircleIcon);
export const HomeIcon = make(Home01Icon);
export const IdeaIcon = make(BulbIcon);
export const ImageIcon = make(Image01Icon);
export const MailIcon = make(Mail01Icon);
export const MessageIcon = make(Message01Icon);
export const MessagesIcon = make(Chatting01Icon);
export const ScreenshotIcon = make(Camera01Icon);
export const SearchIcon = make(Search01Icon);
export const SendIcon = make(SentIcon);
export const SourcesIcon = make(LegalDocument01Icon);
export const UpdatesIcon = make(Megaphone01Icon);
export const VerifiedIcon = make(CheckmarkBadge01Icon);
