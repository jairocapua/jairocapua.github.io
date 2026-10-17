/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section/section-header";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

export default function HackathonsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full overflow-hidden">
      <SectionHeader label="Hackathons" title="I like building things">
        Nothing beats shipping something real in a weekend. Here are the
        hackathons I&apos;ve competed in.
      </SectionHeader>
      <Timeline>
        {DATA.hackathons.map((hackathon) => (
          <TimelineItem
            key={hackathon.title + hackathon.dates}
            className="w-full flex items-start justify-between gap-10"
          >
            <TimelineConnectItem className="flex items-start justify-center">
              {hackathon.image ? (
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                />
              ) : (
                <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
              )}
            </TimelineConnectItem>
            <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
              {hackathon.dates && (
                <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
              )}
              {hackathon.title && (
                <h3 className="font-semibold leading-none">{hackathon.title}</h3>
              )}
              {hackathon.location && (
                <p className="text-sm text-muted-foreground">{hackathon.location}</p>
              )}
              {hackathon.description && (
                <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                  {hackathon.description}
                </p>
              )}
              {hackathon.links.length > 0 && (
                <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                  {hackathon.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                        {link.title}
                      </Badge>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
