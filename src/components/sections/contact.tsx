"use client";

import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Contact() {
  return (
    <section id="contact">
      <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Want to chat? Drop an email at{" "}
              <Link href={`mailto:${DATA.contact.email}`} className="text-blue-500 underline">
                {DATA.contact.email}
              </Link>{" "}
              or reach out on any of the platforms in the dock.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
