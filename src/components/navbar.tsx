"use client";

import * as React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Navbar() {
  const socials = Object.values(DATA.contact.social).filter((s) => s.navbar);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background/90">
        <TooltipProvider>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  aria-label="Home"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <HomeIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator />
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <DockIcon key={social.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <Icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
          <Separator />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </DockIcon>
        </TooltipProvider>
      </Dock>
    </div>
  );
}

function Separator() {
  return <div className="h-full w-px bg-border" />;
}
