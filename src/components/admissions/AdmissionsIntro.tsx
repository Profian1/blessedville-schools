import { ADMISSIONS_INTRO } from "../../data/admissions";
import { Container, Reveal } from "../../lib/ui";

export default function AdmissionsIntro() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">{ADMISSIONS_INTRO.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">{ADMISSIONS_INTRO.text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
