// "How I build with AI": the spec-driven (SDD) + test-driven (TDD) agentic
// workflow. Rendered by components/section/ai-workflow-section.tsx and fed to
// the chatbot (lib/chat-chunks.ts) and llms-full.txt (lib/llms.ts).

export interface WorkflowStep {
  /** Short phase name shown on the step's pill: "Spec", "Test", … */
  phase: "Spec" | "Test" | "Build" | "Verify";
  title: string;
  description: string;
  /** What the step leaves behind in the repo. */
  artifacts: readonly string[];
}

export const AI_WORKFLOW = {
  intro:
    "I build software with AI agents (mainly Claude Code), but I don't let them freestyle. Every feature starts as a written spec and a failing test, and the agent's job is to make that test pass. The spec says what we're building, and the tests prove it was built.",
  principles: [
    {
      title: "Spec-Driven Development (SDD)",
      body: "The spec is the source of truth, for me and for the agent. Before any code, the requirements, decisions, edge cases and what \"done\" means are written down in the repo, so the agent works from a document instead of a chat history it will forget.",
    },
    {
      title: "Test-Driven Development (TDD)",
      body: "Each item in the spec turns into a test before it turns into code. The agent works red, green, refactor, one small slice at a time, so a passing test suite means the behavior is really there, not just that the code compiles.",
    },
  ],
  steps: [
    {
      phase: "Spec",
      title: "Grill the idea",
      description:
        "I have the agent interview me about the feature, one question at a time, until there are no open decisions left: scope, edge cases, budget, failure modes and what we're deliberately not building. Choices it makes without asking are listed so I can overrule them.",
      artifacts: ["Decision log"],
    },
    {
      phase: "Spec",
      title: "Write the spec",
      description:
        "The answers become a plan in docs/: goal, numbered decisions, architecture and acceptance criteria. Hard-to-reverse choices get an ADR (Architecture Decision Record) with the alternatives we rejected, and project terms go in a glossary so the agent and I use the same words.",
      artifacts: ["Plan / spec", "ADRs", "Glossary"],
    },
    {
      phase: "Test",
      title: "Turn acceptance criteria into tests",
      description:
        "Each acceptance criterion becomes a test that fails first. For AI features that means an eval set: questions with known answers, things the bot must refuse, and prompt-injection attempts, all run against the real pipeline.",
      artifacts: ["Failing tests", "Eval cases"],
    },
    {
      phase: "Build",
      title: "Red, green, refactor with the agent",
      description:
        "The agent takes one failing test at a time, writes the smallest change that passes it, then cleans up while the suite stays green. Slices stay small enough to review, and nothing gets written that no test asks for.",
      artifacts: ["Small commits"],
    },
    {
      phase: "Verify",
      title: "Review against the spec",
      description:
        "Separate review agents check the change on two axes in parallel: does it follow the repo's coding standards, and does it do what the spec asked for. I read the diff and their findings before anything merges.",
      artifacts: ["Review report"],
    },
    {
      phase: "Verify",
      title: "Prove it in the real app, then gate it in CI",
      description:
        "The agent runs the app in a browser and checks the feature actually works (console, network, layout, mobile, dark mode) instead of trusting the type checker. Then CI runs the same tests and evals on every push and blocks the deploy if one fails.",
      artifacts: ["Browser check", "CI gate"],
    },
  ] satisfies WorkflowStep[],
  example: {
    title: "Example: the AI assistant on this site",
    body: "The chatbot on this page was built this way. A grilling session produced an 18-decision spec and an ADR for the vector search. A 31-case eval set of facts, unknowns and jailbreak attempts was written before the pipeline, and a GitHub Action reruns it on every push. The Worker only deploys if every case passes.",
  },
  tools: [
    {
      name: "Claude Code",
      icon: "Claude",
      role: "The main coding agent",
      detail:
        "Claude Code runs in my terminal with access to the repo, so it can read the spec, run the tests and edit files itself. It runs the grilling interview, writes the failing tests, does the red-green-refactor loop and opens the app in a browser to check its own work. Reusable skills (TDD, code review, grilling) keep it following the same process on every project instead of improvising.",
      usedIn: [1, 2, 3, 4, 6],
    },
    {
      name: "OpenAI Codex",
      icon: "OpenAI",
      role: "A second agent and a second opinion",
      detail:
        "I use Codex alongside Claude Code, for parallel tasks and as an independent reviewer. A model that didn't write the code is better at spotting what the first one missed, so for bigger changes I have it review the diff against the spec before I merge.",
      usedIn: [4, 5],
    },
    {
      name: "Sub-agents",
      role: "Parallel helpers with a narrow job",
      detail:
        "The main agent hands focused jobs to sub-agents that run in parallel, each with its own clean context: searching a large codebase, reviewing coding standards while another checks the change against the spec, or sketching several designs for the same interface. Only their conclusions come back, so the main agent's context stays small and on task.",
      usedIn: [2, 5],
    },
    {
      name: "Vitest",
      icon: "Vitest",
      role: "Fast unit and integration tests",
      detail:
        "Vitest is where most of the red-green loop happens. Tests are written from the spec's acceptance criteria before the code, they run in watch mode in milliseconds, and the agent isn't done with a slice until they pass. The suite then becomes a safety net, so later changes by me or an agent can't quietly break behavior the spec promised.",
      usedIn: [3, 4],
    },
    {
      name: "Playwright",
      icon: "Playwright",
      role: "End-to-end tests in a real browser",
      detail:
        "Unit tests can pass while the page is still broken, so user flows like signing in, submitting a form or opening the chat are tested end to end with Playwright in a real browser. The agent also uses a browser to check its changes by hand-like interaction (clicks, mobile size, dark mode) before calling anything done.",
      usedIn: [3, 6],
    },
    {
      name: "GitHub Actions",
      icon: "GitHub",
      role: "The CI gate before every deploy",
      detail:
        "Every push runs the full test suite and, for AI features, the eval set against the real pipeline. If any test or eval fails, the deploy is blocked. On this site, the chatbot's index is rebuilt, its 31 eval cases run, and the Worker only deploys if every one passes.",
      usedIn: [6],
    },
  ],
} as const;

export type WorkflowTool = (typeof AI_WORKFLOW.tools)[number];
