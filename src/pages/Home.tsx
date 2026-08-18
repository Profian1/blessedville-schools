import Hero from "../components/Hero";
import WelcomeSection from "../components/WelcomeSection";
import ProgramsPreviewSection from "../components/ProgramsPreviewSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Badges from "../components/Badges";
import Testimonials from "../components/Testimonials";
import Seo from "../lib/Seo";
import { SCHOOL, SOCIALS } from "../data";

export default function Home() {
  return (
    <>
      <Seo
        title="Blessedville Schools | Every Step Counts"
        description="Blessedville Schools offers quality CBC education in Kahawa West with daycare, playgroup, kindergarten, preschool and lower primary in a safe, nurturing, and inclusive learning environment."
        path="/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: SCHOOL.name,
            url: "https://blessedville.edu",
            telephone: SCHOOL.phone,
            email: SCHOOL.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiwanja, Northern Bypass",
              addressLocality: "Kahawa West, Nairobi",
              addressCountry: "KE",
            },
            sameAs: SOCIALS.map((s) => s.url),
          },
        ]}
      />
      <Hero />
      <WelcomeSection />
      <ProgramsPreviewSection />
      <WhyChooseUs />
      <Badges />
      <Testimonials />
    </>
  );
}