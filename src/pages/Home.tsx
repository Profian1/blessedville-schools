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
            "@type": "School",
            name: SCHOOL.name,
            alternateName: "Blessedville Schools Kahawa West",
            url: "https://blessedvilleschools.co.ke",
            telephone: SCHOOL.phone,
            email: "blessedville22@gmail.com",
            foundingDate: "2015",
            slogan: SCHOOL.motto,
            description:
              "Blessedville Schools is a CBC school in Kahawa West, Nairobi offering daycare, playgroup, kindergarten, preschool and lower primary education in a safe, nurturing and inclusive environment.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiwanja, Northern Bypass, Next to Maple Inn Hotel",
              addressLocality: "Kahawa West",
              addressRegion: "Nairobi",
              postalCode: "00619",
              addressCountry: "KE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -1.1963,
              longitude: 36.9015,
            },
            hasMap: "https://www.google.com/maps/search/?api=1&query=Blessedville+Schools+Kahawa+West+Nairobi",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "07:00",
                closes: "17:00",
              },
            ],
            areaServed: "Kahawa West, Nairobi, Kenya",
            sameAs: SOCIALS.map((s) => s.url),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SCHOOL.name,
            url: "https://blessedvilleschools.co.ke",
            inLanguage: "en-KE",
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