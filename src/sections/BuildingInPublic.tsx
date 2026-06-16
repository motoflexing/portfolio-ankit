import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcons";
import { buildingInPublic } from "@/data/home";
import { socialList } from "@/data/socials";

/**
 * Building in Public — what Ankit documents and where. Links the real
 * channels from data/socials.ts. No follower counts are shown (none are
 * verified in the data), per the content-accuracy rules.
 */
export function BuildingInPublic() {
  return (
    <Section index="05" label="In Public">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="In public" title="Building in public" />

          <p className="text-body mt-6 max-w-md text-text-muted">
            {buildingInPublic.body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {buildingInPublic.topics.map((topic) => (
              <li
                key={topic}
                className="text-mono card-hairline px-3 py-1.5 text-text-faint"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Channels */}
        <div className="grid gap-4 sm:grid-cols-2">
          {socialList.map((social, i) => (
            <Reveal key={social.platform} delay={i * 0.05}>
              <Card
                interactive
                accentHover
                className="h-full"
                // Cards aren't anchors; wrap content in a link below.
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-8 p-6 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <SocialIcon
                      platform={social.platform}
                      className="h-5 w-5 text-text-muted transition-colors group-hover:text-accent"
                    />
                    <ArrowUpRight className="h-4 w-4 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
                  </div>
                  <div>
                    <p className="text-subheading text-text">{social.label}</p>
                    <p className="text-mono mt-1 text-text-faint">
                      {social.handle}
                    </p>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
