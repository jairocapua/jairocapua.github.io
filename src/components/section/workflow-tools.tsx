"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bot, X } from "lucide-react";
import { TechIcon } from "@/components/tech-icon";
import { AI_WORKFLOW, type WorkflowTool } from "@/data/ai-workflow";
import { skillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

const PANEL_ID = "workflow-tool-detail";

function ToolIcon({ tool, className }: { tool: WorkflowTool; className?: string }) {
  const icon = "icon" in tool ? skillIcon(tool.icon) : null;
  if (!icon) return <Bot className={className} aria-hidden />;
  return <TechIcon icon={icon} className={cn("rounded overflow-hidden object-contain", className)} />;
}

/** The workflow's tools as toggle pills; the selected one explains its role below. */
export function WorkflowTools() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const tool = AI_WORKFLOW.tools.find((t) => t.name === selected) ?? null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">Tools:</span>
        {AI_WORKFLOW.tools.map((t) => {
          const active = t.name === selected;
          return (
            <button
              key={t.name}
              type="button"
              aria-expanded={active}
              aria-controls={PANEL_ID}
              onClick={() => setSelected(active ? null : t.name)}
              className={cn(
                "h-8 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-transparent hover:border-border hover:bg-secondary/70"
              )}
            >
              <ToolIcon tool={t} className="size-3.5" />
              {t.name}
            </button>
          );
        })}
      </div>

      <div id={PANEL_ID} aria-live="polite">
          {tool ? (
            <motion.div
              key={tool.name}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="relative rounded-xl border bg-card p-4 flex flex-col gap-2"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close tool details"
                className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-4" aria-hidden />
              </button>
              <div className="flex items-center gap-2 pr-8">
                <ToolIcon tool={tool} className="size-5" />
                <h4 className="font-semibold leading-none">{tool.name}</h4>
                <span className="text-xs text-muted-foreground">· {tool.role}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.detail}</p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span>Used in step{tool.usedIn.length > 1 ? "s" : ""}:</span>
                {tool.usedIn.map((n) => (
                  <a
                    key={n}
                    href={`#ai-workflow-step-${n}`}
                    title={AI_WORKFLOW.steps[n - 1].title}
                    className="size-6 rounded-full border flex items-center justify-center font-semibold tabular-nums text-foreground hover:bg-muted transition-colors"
                  >
                    {n}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Click a tool to see what it does in the workflow.
            </p>
          )}
      </div>
    </div>
  );
}
