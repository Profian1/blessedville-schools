import Seo from "../lib/Seo";
import AdmissionsHero from "../components/admissions/AdmissionsHero";
import AdmissionsIntro from "../components/admissions/AdmissionsIntro";
import ProgramSelector from "../components/admissions/ProgramSelector";
import AdmissionsSteps from "../components/admissions/AdmissionsSteps";
import WhyChooseUs from "../components/admissions/WhyChooseUs";
import ApplicationRequirements from "../components/admissions/ApplicationRequirements";
import AdmissionsFAQ from "../components/admissions/AdmissionsFAQ";
import { ReadyToApplyCTA, SchoolTourCTA, FinalCTA } from "../components/admissions/AdmissionsCTA";
import { Container, SectionHeading, Reveal } from "../lib/ui";
import { ADMISSIONS_SEO, ADMISSIONS_FAQ } from "../data/admissions";
import { SCHOOL } from "../data";

const faqStructuredData = ADMISSIONS_FAQ.map((f) => ({
  "@type": "Question",
  name: f.q,
  acceptedAnswer: {
    "@type": "Answer",
    text: f.contactQuestion
      ? `${f.a} Phone or WhatsApp: ${SCHOOL.phone}. Email: ${SCHOOL.email}. Office hours: ${SCHOOL.hours}.`
      : f.a,
  },
}));

export default function Admissions() {
  return (
    <>
      <Seo
        title={ADMISSIONS_SEO.title}
        description={ADMISSIONS_SEO.description}
        path={ADMISSIONS_SEO.path}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: ADMISSIONS_SEO.title,
            description: ADMISSIONS_SEO.description,
            url: `https://blessedville.edu${ADMISSIONS_SEO.path}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqStructuredData,
          },
        ]}
      />

      <AdmissionsHero />
      <AdmissionsIntro />
      <ProgramSelector />
      <AdmissionsSteps />
      <WhyChooseUs />
      <ApplicationRequirements />
      <ReadyToApplyCTA />
      <SchoolTourCTA />

      {/* FAQ */}
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Questions?"
            title={<>Frequently <span className="text-gold-gradient">asked questions</span></>}
            subtitle="Quick answers to the questions families ask us most often."
          />
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <AdmissionsFAQ />
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
