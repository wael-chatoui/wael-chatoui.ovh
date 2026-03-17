import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import FeaturedProjects from "@/components/featured-projects";
import ContactFooter from "@/components/contact-footer";

export default function Home() {
  return (
    <>
      <Navbar />
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
