import type { ComponentType } from "react";
import { BugIcon, CursorIcon, IdeaIcon, MessageIcon, SourcesIcon, type IconProps } from "@/components/messenger/icons";
import type { CategoryIcon } from "./config";

export const CATEGORY_ICONS: Record<CategoryIcon, ComponentType<IconProps>> = {
  bug: BugIcon,
  idea: IdeaIcon,
  sources: SourcesIcon,
  usability: CursorIcon,
  other: MessageIcon,
};
