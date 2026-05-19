import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Hackathons } from "@/components/sections/hackathons";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <Hero />
      <About />
      <Work />
      <Education />
      <Skills />
      <Projects />
      <Hackathons />
      <Contact />
    </main>
  );
}
