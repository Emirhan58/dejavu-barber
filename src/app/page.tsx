import { IntroOverlayLazy } from "@/components/animations/IntroOverlayLazy";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/layout/SectionDivider";

export default function Home() {
  return (
    <>
      <IntroOverlayLazy />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Contact />
    </>
  );
}
