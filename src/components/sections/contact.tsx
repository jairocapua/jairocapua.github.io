"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

const primaryBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90";
const ghostBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted";

export function Contact() {
  return (
    <section id="contact" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <SectionHeading title="Get in touch" />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 18}>
        <div className="flex flex-col gap-4 rounded-2xl bg-muted/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-muted-foreground">
            I&apos;m open to new projects, automation work, and collaborations. Drop me an
            email or ask my assistant anything about my work.
          </p>
          <div className="flex flex-shrink-0 flex-wrap gap-2">
            <Link href={`mailto:${DATA.contact.email}`} className={primaryBtn}>
              <Mail className="size-4" /> Send an email
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className={ghostBtn}
            >
              <MessageCircle className="size-4" /> Chat with me
            </button>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
