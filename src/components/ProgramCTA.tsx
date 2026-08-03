import { ArrowRight } from "lucide-react";
import { Button, Container, Reveal } from "../lib/ui";

type ProgramCTAProps = {
  heading: string;
  text: string;
  btnLabel: string;
  btnHref?: string;
};

export default function ProgramCTA({ heading, text, btnLabel, btnHref = "/admissions" }: ProgramCTAProps) {
  return (
    <section className="relative bg-navy py-20 sm:py-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65">{text}</p>
          <div className="mt-8">
            <Button href={btnHref} variant="gold">
              {btnLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
