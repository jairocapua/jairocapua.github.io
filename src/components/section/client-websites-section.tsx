/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section/section-header";
import { DATA, type ClientWebsite } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

/** "https://www.isolatie-professionals.nl/" → "isolatie-professionals.nl". */
function hostname(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function ClientCard({ site }: { site: ClientWebsite }) {
  return (
    <a
      href={site.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative shrink-0 overflow-hidden border-b border-border bg-muted">
        <img
          src={site.image}
          alt={`${site.name} homepage`}
          loading="lazy"
          width={1200}
          height={750}
          className="w-full aspect-[16/10] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {site.preview && (
          <Badge
            className="absolute top-2 right-2 text-xs bg-black text-white"
            variant="default"
          >
            Preview link
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-semibold leading-none">{site.name}</h3>
            <p className="text-xs text-muted-foreground">{site.sector}</p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 flex-none text-muted-foreground group-hover:text-foreground transition-colors"
            aria-hidden
          />
        </div>
        <p className="text-xs flex-1 text-pretty font-sans leading-relaxed text-muted-foreground">
          {site.description}
        </p>
        <span className="text-[11px] font-medium text-muted-foreground truncate">
          {hostname(site.href)}
        </span>
      </div>
    </a>
  );
}

export default function ClientWebsitesSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader label="Client Websites" title="Sites that bring in leads">
        Lead-generation websites I built at{" "}
        {/* White chip: the wordmark's navy text vanishes on the dark theme. */}
        <a
          href="https://www.sterk-systems.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex align-middle -mt-1 rounded-md border border-border bg-white px-1.5 py-0.5 hover:ring-2 hover:ring-muted transition-all"
        >
          <img
            src="/work/sterk-wordmark.webp"
            alt="Sterk Systems"
            width={256}
            height={96}
            className="h-[1.3em] w-auto"
          />
        </a>{" "}
        for businesses across
        the Netherlands, each one built around a quote form, a call or a
        booking.
      </SectionHeader>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto sm:auto-rows-fr">
        {DATA.clientWebsites.map((site) => (
          <ClientCard key={site.href} site={site} />
        ))}
      </div>
    </div>
  );
}
