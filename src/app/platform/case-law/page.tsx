import type { Metadata } from "next";
import { DetailPageView } from "@/components/page/DetailPageView";
import { productPages } from "@/content/pages";

const page = productPages["case-law"];

export const metadata: Metadata = page.meta;

export default function Page() {
  return <DetailPageView page={page} />;
}
