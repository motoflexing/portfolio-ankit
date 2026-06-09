import { Hero } from "@/sections/Hero";
import { Statement } from "@/sections/Statement";
import { SelectedProjects } from "@/sections/SelectedProjects";
import { WhatIBuild } from "@/sections/WhatIBuild";
import { Capabilities } from "@/sections/Capabilities";
import { CurrentFocus } from "@/sections/CurrentFocus";
import { JourneyPreview } from "@/sections/JourneyPreview";
import { BuildingInPublic } from "@/sections/BuildingInPublic";
import { ContactCTA } from "@/sections/ContactCTA";

/**
 * Home — curated, in the brief's section order.
 * The signature 3D ProductConstellation is wired into <Hero /> in Phase 5;
 * the Selected Projects rail becomes a swipeable Embla carousel in Phase 6.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <SelectedProjects />
      <WhatIBuild />
      <Capabilities />
      <CurrentFocus />
      <JourneyPreview />
      <BuildingInPublic />
      <ContactCTA />
    </>
  );
}
