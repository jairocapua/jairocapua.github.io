"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Mail, MessageCircle, MapPin, Trophy } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

const primaryBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90";
const ghostBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

export function Hero() {
  return (
    <section id="hero">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center gap-4 sm:gap-6">
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            width={160}
            height={160}
            priority
            className="size-24 flex-shrink-0 rounded-2xl border border-border object-cover sm:size-40"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
              {DATA.name}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 flex-shrink-0" /> {DATA.location}
            </p>
            <p className="text-sm text-muted-foreground">{DATA.role}</p>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-1 text-xs font-medium text-foreground/80">
              <Trophy className="size-3 flex-shrink-0" /> {DATA.badge}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href={`mailto:${DATA.contact.email}`} className={primaryBtn}>
                <Mail className="size-3.5" /> Get in touch
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
                className={ghostBtn}
              >
                <MessageCircle className="size-3.5" /> Chat with me
              </button>
              <Link
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noreferrer"
                className={ghostBtn}
              >
                <Github className="size-3.5" /> GitHub
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
