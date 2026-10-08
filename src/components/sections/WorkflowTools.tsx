// Section 5 — supporting tools. Layout from Figma "Framework" (6:1060): 3×2 grid,
// icon (Hugeicons in place of Figma's black squares), title, description; rule below.
import Link from "next/link";
import { workflowTools } from "@/content/site";
import { Icon } from "../icons";
import { RevealHeading, SectionLabel } from "../ui";

export function WorkflowTools() {
  return (
    <section aria-labelledby="tools-heading" className="bg-bg-secondary px-2xl pt-[120px]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-[100px]">
        <div className="flex flex-col gap-3xl">
          <SectionLabel>{workflowTools.label}</SectionLabel>
          <div id="tools-heading">
            <RevealHeading text={workflowTools.heading} className="max-w-[744px]" />
          </div>
        </div>

        <ul className="grid gap-x-[60px] gap-y-[80px] sm:grid-cols-2 lg:grid-cols-3">
          {workflowTools.items.map((item) => (
            <li key={item.title} className="flex max-w-[346px] flex-col gap-[44px]">
              <span className="text-bg-dark">
                <Icon name={item.icon} />
              </span>
              <span className="flex flex-col gap-xl">
                <span className="text-xl leading-[24px] tracking-[-0.4px] text-bg-dark">{item.title}</span>
                <span className="text-md leading-[24px] text-text-tertiary">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2xl">
          <span className="h-px flex-1 bg-line-dark" />
          <Link
            href="/platform/workflow-tools"
            className="text-md font-medium leading-[22.4px] text-bg-dark underline decoration-line-dark underline-offset-4 transition-colors hover:decoration-bg-dark"
          >
            Explore workflow tools
          </Link>
        </div>
      </div>
    </section>
  );
}
