import type { Metadata } from "next";
import { DetailPageView } from "@/components/page/DetailPageView";
import { solutionPages } from "@/content/pages";

const page = solutionPages["businesses"];

export const metadata: Metadata = page.meta;

export default function Page() {
  return <DetailPageView page={page} />;
}
