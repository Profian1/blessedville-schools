import { motion } from "framer-motion";
import { Mail, MapPin, FileText, MessageCircle, PartyPopper, ArrowRight } from "lucide-react";
import { ADMISSIONS, SCHOOL } from "../data";
import { Container, Reveal, SectionHeading, EASE, Button } from "../lib/ui";

const ICONS: Record<string, React.ElementType> = {
  Mail,
  MapPin,
  FileText,
  MessageCircle,
  PartyPopper,
};

export default function Admissions() {
  return (
    <section id="admissions" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-royal/20 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Admissions"
          title={<>Your journey to <span className="text-gold-gradient">Blessedville</span>.</>}
          subtitle="A warm, simple process designed to help your family feel at home with us from the very first step."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 lg:block" />
          <div className="grid gap-8 lg:grid-cols-5">
            {ADMISSIONS.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Mail;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-navy text-gold shadow-[0_0_0_8px_rgba(8,8,8,1)]">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold font-button text-xs font-bold text-navy">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h4>
                  <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-white/60">
                    {s.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="gold">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Button>
          <a
            href={`https://wa.me/${SCHOOL.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
