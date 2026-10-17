import BlurFade from "@/components/magicui/blur-fade";
import { GitHubContributions } from "@/components/github-contributions";
import { FileText } from "lucide-react";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

const githubUser = new URL(DATA.contact.social.GitHub.url).pathname.replace(/\//g, "");

/** A small rounded link with a hover card (title, platform, one-line blurb). */
function SocialPill({
  href,
  label,
  icon,
  className,
  preview,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  className: string;
  preview: { title: string; platform: string; blurb: string };
}) {
  const external = href.startsWith("http");
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn(
            "inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 align-baseline text-xs font-medium transition-transform duration-150 hover:underline active:translate-y-px active:scale-[0.98] motion-reduce:transition-none",
            className
          )}
        >
          {icon}
          {label}
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        collisionPadding={16}
        className="w-52 rounded-md border bg-popover p-2 text-left text-popover-foreground shadow-sm"
      >
        <span className="block text-xs font-medium">{preview.title}</span>
        <span className="block text-[0.7rem] text-muted-foreground">{preview.platform}</span>
        <span className="mt-1 block text-[0.7rem] leading-snug text-muted-foreground">
          {preview.blurb}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

/** The top of the page: avatar, name and role, a short intro, and socials. */
export default function IntroSection() {
  const { GitHub, LinkedIn } = DATA.contact.social;

  return (
    <div className="flex flex-col">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center gap-4 sm:gap-5">
          <Avatar className="size-16 shrink-0 sm:size-20">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <h1 className="flex items-center gap-1.5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              <span className="shimmer">{DATA.name}</span>
              <span role="img" aria-label="Verified" className="inline-flex">
                <Icons.verified className="size-5 shrink-0 text-blue-500 transition-transform duration-500 hover:rotate-[360deg] motion-reduce:transition-none sm:size-6" />
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View my CV (PDF)"
                    className="inline-flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <FileText className="size-[18px]" aria-hidden />
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={6}
                  className="rounded-md border bg-popover px-2 py-1 text-xs font-normal tracking-normal text-popover-foreground shadow-sm"
                >
                  View my CV
                </TooltipContent>
              </Tooltip>
            </h1>
            <span className="text-muted-foreground sm:text-lg">{DATA.role}</span>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-6 flex flex-col gap-4 leading-relaxed text-muted-foreground">
          <p>
            👋 Hey! I&apos;m an AI software engineer and I{" "}
            <GitHubContributions user={githubUser}>build smart systems</GitHubContributions>
            , web apps, and AI-powered workflows that help businesses automate
            operations, save time, and scale faster.
          </p>
          <p>
            You can find my code on{" "}
            <SocialPill
              href={GitHub.url}
              label="GitHub"
              icon={<Icons.github aria-hidden className="size-3 shrink-0" />}
              className="bg-gray-100 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              preview={{
                title: githubUser,
                platform: "GitHub",
                blurb: "Source for my projects, experiments, and hackathon builds.",
              }}
            />
            , connect with me on{" "}
            <SocialPill
              href={LinkedIn.url}
              label="LinkedIn"
              icon={<Icons.linkedin aria-hidden className="size-3 shrink-0" />}
              className="border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
              preview={{
                title: DATA.name,
                platform: "LinkedIn",
                blurb: `${DATA.role} · ${DATA.location}`,
              }}
            />
            , or reach me directly by{" "}
            <SocialPill
              href={`mailto:${DATA.contact.email}`}
              label="Email"
              icon={<Icons.email aria-hidden className="size-3 shrink-0" />}
              className="border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black"
              preview={{
                title: DATA.contact.email,
                platform: "Email",
                blurb: "The fastest way to reach me.",
              }}
            />
            .
          </p>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <hr aria-hidden className="zigzag-divider mt-10 h-2 w-full border-0 bg-border" />
      </BlurFade>
    </div>
  );
}
