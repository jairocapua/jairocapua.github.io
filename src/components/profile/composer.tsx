"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Mail, MessageCircle } from "lucide-react";
import { DATA } from "@/data/resume";

const openChat = () => window.dispatchEvent(new Event("open-chat"));

function Action({
  icon: Icon,
  label,
  color,
  href,
  onClick,
}: {
  icon: typeof Mail;
  label: string;
  color: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-fb-text-secondary transition-colors hover:bg-fb-hover";
  const inner = (
    <>
      <Icon className={`size-5 ${color}`} /> {label}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer"
        className={className}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

export function Composer() {
  return (
    <section className="fb-card p-4">
      <div className="flex items-center gap-2.5">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          width={40}
          height={40}
          className="size-10 flex-none rounded-full object-cover"
        />
        <button
          type="button"
          onClick={openChat}
          className="h-10 flex-1 rounded-full bg-fb-hover px-4 text-left text-[15px] text-fb-text-secondary transition-colors hover:bg-fb-gray"
        >
          What can I build for you?
        </button>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 border-t border-border pt-2">
        <Action
          icon={Mail}
          label="Email"
          color="text-rose-500"
          href={`mailto:${DATA.contact.email}`}
        />
        <Action
          icon={MessageCircle}
          label="Chat"
          color="text-fb-blue"
          onClick={openChat}
        />
        <Action
          icon={Github}
          label="GitHub"
          color="text-fb-text"
          href={DATA.contact.social.GitHub.url}
        />
      </div>
    </section>
  );
}
