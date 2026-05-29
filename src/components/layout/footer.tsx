import Link from "next/link";
import { DATA } from "@/data/resume";

const iconLink =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    DATA.contact.social.GitHub,
    DATA.contact.social.LinkedIn,
    DATA.contact.social.Email,
  ];

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {year} {DATA.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-0.5">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.name}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.name}
                className={iconLink}
              >
                <Icon className="size-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
