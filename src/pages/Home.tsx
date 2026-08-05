import Hero from "../components/Hero";
import WelcomeSection from "../components/WelcomeSection";
import ProgramsPreviewSection from "../components/ProgramsPreviewSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Badges from "../components/Badges";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <ProgramsPreviewSection />
      <WhyChooseUs />
      <Badges />
      <Testimonials />
    </>
  );
}
