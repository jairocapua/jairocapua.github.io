import { FileText, FlaskConical, Hammer, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section/section-header";
import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import { WorkflowTools } from "@/components/section/workflow-tools";
import { AI_WORKFLOW, type WorkflowStep } from "@/data/ai-workflow";

const PHASE_ICON: Record<WorkflowStep["phase"], typeof FileText> = {
  Spec: FileText,
  Test: FlaskConical,
  Build: Hammer,
  Verify: ShieldCheck,
};

export default function AiWorkflowSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full overflow-hidden">
      <SectionHeader label="How I Build with AI" title="Spec first, tests first, then the agent">
        {AI_WORKFLOW.intro}
      </SectionHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        {AI_WORKFLOW.principles.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-4 flex flex-col gap-2">
            <h3 className="font-semibold leading-snug">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-lg font-semibold">The agentic workflow</h3>
        <Timeline>
          {AI_WORKFLOW.steps.map((step, index) => {
            const Icon = PHASE_ICON[step.phase];
            return (
              <TimelineItem
                key={step.title}
                id={`ai-workflow-step-${index + 1}`}
                className="w-full flex items-start justify-between gap-6 sm:gap-10 scroll-mt-24"
              >
                <TimelineConnectItem className="flex items-start justify-center">
                  <div className="size-10 bg-card z-10 shrink-0 border rounded-full shadow ring-2 ring-border flex items-center justify-center flex-none">
                    <span className="text-sm font-semibold tabular-nums">{index + 1}</span>
                  </div>
                </TimelineConnectItem>
                <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5" aria-hidden />
                    {step.phase}
                  </span>
                  <h4 className="font-semibold leading-none">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {step.description}
                  </p>
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {step.artifacts.map((a) => (
                      <Badge
                        key={a}
                        variant="outline"
                        className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                      >
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>

      <div className="rounded-xl border bg-muted/40 p-4 flex flex-col gap-2">
        <h3 className="font-semibold leading-snug flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground" aria-hidden />
          {AI_WORKFLOW.example.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{AI_WORKFLOW.example.body}</p>
      </div>

      <WorkflowTools />
    </div>
  );
}
