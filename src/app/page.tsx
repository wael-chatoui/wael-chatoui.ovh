import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import FeaturedProjects from "@/components/featured-projects";
import ContactFooter from "@/components/contact-footer";
import SectionStepper from "@/components/section-stepper";

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionStepper />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <ContactFooter />
      </main>
    </>
  );
}
