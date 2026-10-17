import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/tech-icon";
import { DATA } from "@/data/resume";
import { logoSource, skillIcon } from "@/lib/skill-icons";
import Markdown from "react-markdown";
import AutomationsSection from "@/components/section/automations-section";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import IntroSection from "@/components/section/intro-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, Award } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

/** Logo in a ring, as on the work rows; a muted disc when there's no logo. */
function RowLogo({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex items-center justify-center flex-none">
        <Award className="size-4 text-muted-foreground" aria-hidden />
      </div>
    );
  }
  // The ring is a wrapper so a dark-mode invert on the logo leaves it alone.
  return (
    <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden flex-none">
      <TechIcon icon={logoSource(src)} alt={alt} className="size-full object-contain" />
    </div>
  );
}

/** A row of the Education/Certifications lists; a link when `href` is set. */
function ListRow({
  href,
  logo,
  title,
  subtitle,
  aside,
}: {
  href: string;
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  aside: React.ReactNode;
}) {
  const body = (
    <>
      <div className="flex items-center gap-x-3 flex-1 min-w-0">
        {logo}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="font-semibold leading-none flex items-center gap-2">
            {title}
            {href && (
              <ArrowUpRight
                className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                aria-hidden
              />
            )}
          </div>
          <div className="font-sans text-sm text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
        {aside}
      </div>
    </>
  );

  const className = "flex items-center gap-x-3 justify-between group";
  if (!href) return <div className={className}>{body}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
}

function SkillPill({ skill }: { skill: string }) {
  const icon = skillIcon(skill);
  return (
    <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
      {icon && (
        <TechIcon icon={icon} className="size-4 rounded overflow-hidden object-contain" />
      )}
      <span className="text-foreground text-sm font-medium">{skill}</span>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <IntroSection />
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <ListRow
                  href={education.href}
                  logo={<RowLogo src={education.logoUrl} alt={education.school} />}
                  title={education.school}
                  subtitle={education.degree}
                  aside={
                    <>
                      {education.start.trim() && (
                        <span>
                          {education.start} - {education.end}
                        </span>
                      )}
                      {education.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="outline"
                          className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </>
                  }
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="certifications">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">Certifications</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.certifications.map((cert, index) => (
              <BlurFade
                key={cert.title}
                delay={BLUR_FADE_DELAY * 8.5 + index * 0.05}
              >
                <ListRow
                  href={cert.href}
                  logo={<RowLogo src={cert.logoUrl} alt={cert.issuer} />}
                  title={cert.title}
                  subtitle={cert.issuer}
                  aside={cert.date && <span>{cert.date}</span>}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-col gap-y-5">
            {DATA.skillGroups.map((group, index) => (
              <BlurFade
                key={group.category}
                delay={BLUR_FADE_DELAY * 10 + index * 0.05}
              >
                {/* Label beside the pills from sm up; above them on phones. */}
                <div className="grid gap-x-4 gap-y-2 sm:grid-cols-[7.5rem_1fr]">
                  <h3 className="text-sm font-medium text-muted-foreground sm:pt-1.5">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillPill key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="automations">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <AutomationsSection />
        </BlurFade>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
