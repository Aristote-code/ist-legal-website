import type { Metadata } from "next";
import { DetailPageView } from "@/components/page/DetailPageView";
import { assurancePages } from "@/content/pages";

const page = assurancePages["verification"];

export const metadata: Metadata = page.meta;

export default function Page() {
  return <DetailPageView page={page} />;
}
