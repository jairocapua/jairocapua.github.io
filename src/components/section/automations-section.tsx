"use client";

import { useState } from "react";
import { Workflow } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section/section-header";
import { RowChevron } from "@/components/section/work-section";
import { TechIcon } from "@/components/tech-icon";
import {
  automationProjects,
  type AutomationProject,
} from "@/data/automation-projects";
import { automationToolIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

/** Rows shown before "Show more". */
const INITIAL_COUNT = 5;

/** The case study's first tool that has a logo (GoHighLevel, n8n, Zapier…). */
function ToolLogo({ tags }: { tags: readonly string[] }) {
  const icon = tags.map(automationToolIcon).find((i) => i !== null);
  return (
    <div className="size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border bg-background flex items-center justify-center overflow-hidden flex-none">
      {icon ? (
        <TechIcon icon={icon} className="size-full object-contain" />
      ) : (
        <Workflow className="size-4 text-muted-foreground" aria-hidden />
      )}
    </div>
  );
}

/** "Trigger Setup: Workflow activates…" → label in the foreground color. */
function ActionItem({ text }: { text: string }) {
  const match = text.match(/^([^:]{3,48}):\s(.+)$/);
  if (!match) return <li>{text}</li>;
  return (
    <li>
      <span className="font-medium text-foreground">{match[1]}:</span>{" "}
      {match[2]}
    </li>
  );
}

function ScarPart({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-1 font-semibold text-foreground">{label}</h4>
      {children}
    </div>
  );
}

function ScarStory({ project }: { project: AutomationProject }) {
  return (
    <div className="flex flex-col gap-3 leading-relaxed">
      <ScarPart label="Situation">
        <p>{project.situation}</p>
      </ScarPart>
      <ScarPart label="Task">
        <p>{project.task}</p>
      </ScarPart>
      <ScarPart label="Action">
        <ul className="list-disc pl-4 space-y-1 marker:text-muted-foreground/60">
          {project.action.map((a) => (
            <ActionItem key={a} text={a} />
          ))}
        </ul>
      </ScarPart>
      <ScarPart label="Result">
        <ul className="list-disc pl-4 space-y-1 marker:text-muted-foreground/60">
          {project.result.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </ScarPart>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => {
          const icon = automationToolIcon(tag);
          return (
            <Badge
              key={tag}
              variant="outline"
              className="text-[11px] font-medium border border-border h-6 w-fit px-2 gap-1.5"
            >
              {icon && (
                <TechIcon icon={icon} className="size-3 object-contain" />
              )}
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default function AutomationsSection() {
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = automationProjects.length - INITIAL_COUNT;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader label="Automations" title="Workflows that run themselves">
        Business processes I&apos;ve automated end to end with GoHighLevel,
        n8n, Zapier, and AI, each written up as Situation, Task, Action, and
        Result.
      </SectionHeader>
      <Accordion type="single" collapsible className="w-full grid gap-6">
        {automationProjects.map((project, i) => (
          <AccordionItem
            key={project.title}
            value={project.title}
            className={cn(
              "w-full border-b-0 grid gap-2",
              !showAll && i >= INITIAL_COUNT && "hidden"
            )}
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex items-center gap-x-3 w-full text-left">
                <ToolLogo tags={project.tags} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-snug flex items-center gap-2">
                    {project.title}
                    <RowChevron />
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {project.subcategory}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
              <ScarStory project={project} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {hiddenCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="mx-auto rounded-xl cursor-pointer"
          aria-expanded={showAll}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show less" : `Show ${hiddenCount} more`}
        </Button>
      )}
    </div>
  );
}
