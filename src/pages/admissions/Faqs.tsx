import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../lib/Seo";
import ProgramHero from "../../components/ProgramHero";
import AdmissionsFAQ from "../../components/admissions/AdmissionsFAQ";
import { Container, SectionHeading, Reveal } from "../../lib/ui";
import { FAQS_SEO, ADMISSIONS_FAQ } from "../../data/admissions";
import { SCHOOL } from "../../data";

export default function Faqs() {
  return (
    <>
      <Seo
        title={FAQS_SEO.title}
        description={FAQS_SEO.description}
        path={FAQS_SEO.path}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: FAQS_SEO.title,
            description: FAQS_SEO.description,
            url: `https://blessedville.edu${FAQS_SEO.path}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ADMISSIONS_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.contactQuestion
                  ? `${f.a} Phone or WhatsApp: ${SCHOOL.phone}. Email: ${SCHOOL.email}. Office hours: ${SCHOOL.hours}.`
                  : f.a,
              },
            })),
          },
        ]}
      />

      <ProgramHero
        badge="Admissions FAQs"
        title="Questions? We've Got Answers"
        subtitle="Everything you need to know about joining Blessedville Schools — and how to reach us if you need more help."
        image="/gallery/students1.jpg"
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "FAQs" }]}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title={<>Admissions <span className="text-gold-gradient">FAQs</span></>}
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <AdmissionsFAQ />
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl bg-navy p-6 text-center sm:p-8">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">Still have a question?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/65">
                Our admissions team is happy to help. Call or WhatsApp us, or send an email and we'll get back to you
                during office hours.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/admissions/apply"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5"
                >
                  Apply Online <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-navy"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact Admissions
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
