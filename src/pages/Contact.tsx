import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { SCHOOL } from "../data";
import ProgramHero from "../components/ProgramHero";
import FAQSection from "../components/FAQSection";
import { Container, Reveal, SectionHeading, EASE, Button } from "../lib/ui";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */
const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [SCHOOL.name, SCHOOL.address],
    btnLabel: "Get Directions",
    btnHref: "https://maps.google.com/?q=Blessedville+Schools+Kahawa+West+Nairobi",
    btnExternal: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [`Main: ${SCHOOL.phone}`, "Admissions: +254 791 480427"],
    btnLabel: "Call Now",
    btnHref: `tel:${SCHOOL.phone}`,
    btnSecondary: { label: "WhatsApp", href: `https://wa.me/${SCHOOL.whatsapp}`, icon: MessageCircle },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SCHOOL.email, "blessedville@gmail.com"],
    btnLabel: "Send Email",
    btnHref: `mailto:${SCHOOL.email}`,
    btnSecondary: { label: "Copy Email", action: "copy" as const, icon: Copy },
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon – Fri: 7:00 AM – 5:00 PM", "Sat: 9:00 AM – 12:00 PM", "Sun: Closed"],
    badge: "Visits by Appointment Welcome",
  },
];

const FAQ = [
  { q: "How do I enroll my child?", a: "Visit our Admissions page or call us on +254 791 480427. Our team will guide you through the application process, required documents, and fees." },
  { q: "Can I schedule a school visit?", a: "Absolutely! We encourage parents to book a tour and experience Blessedville firsthand. Use our contact form or call us to arrange a convenient time." },
  { q: "What curriculum do you offer?", a: "We follow Kenya's Competency-Based Curriculum (CBC) from Daycare through to Lower Primary (Grade 4)." },
  { q: "How quickly will I receive a response?", a: "We respond to all inquiries within 24 hours during weekdays. Phone calls are answered during office hours." },
];

/* ------------------------------------------------------------------ */
/* Contact Form                                                       */
/* ------------------------------------------------------------------ */
function ContactFormSection() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      subject: data.get("subject") as string,
      grade: data.get("grade") as string,
      message: data.get("message") as string,
      honeypot: data.get("website") as string,
    };

    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setState("success");
        setMsg(json.message);
        form.reset();
      } else {
        setState("error");
        setMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMsg("Unable to send. Please email us directly at blessedville@gmail.com or call +254 791 480427.");
    }
  };

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Send Us a Message</h2>
            <p className="mt-3 text-ink/65">Fill in the form below and our team will get back to you promptly.</p>

            <form id="contact-form" onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              {/* Honeypot */}
              <input type="text" name="website" className="absolute opacity-0 pointer-events-none" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Parent Name *</label>
                  <input name="name" required className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold" placeholder="Jane Wanjiku" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Email Address *</label>
                  <input type="email" name="email" required className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold" placeholder="jane@example.com" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Phone Number</label>
                  <input type="tel" name="phone" className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold" placeholder="+254 700 000000" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Child's Age / Grade</label>
                  <input name="grade" className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold" placeholder="e.g. Age 4, Preschool" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Subject *</label>
                <input name="subject" required className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold" placeholder="e.g. Admissions Inquiry, School Tour" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Message *</label>
                <textarea name="message" required rows={4} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold resize-y" placeholder="Tell us how we can help you..." />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="privacy" required className="h-4 w-4 rounded border-navy/20 text-gold focus:ring-gold" />
                <label htmlFor="privacy" className="text-xs text-ink/55">I agree to the Privacy Policy and consent to being contacted.</label>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button type="submit" href="#" variant="gold" disabled={state === "loading"} className="disabled:opacity-60">
                  {state === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Submit Message <Send className="h-4 w-4" /></>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    (document.getElementById("contact-form") as HTMLFormElement)?.reset();
                    setState("idle");
                    setMsg("");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                >
                  Clear Form
                </button>
              </div>

              {state === "success" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium text-green-700">{msg}</p>
                </motion.div>
              )}
              {state === "error" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-medium text-amber-700">{msg}</p>
                </motion.div>
              )}
            </form>
          </Reveal>

          {/* Side info */}
          <Reveal delay={0.1} className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.25)]">
              <img src="/school.jpg" alt="Blessedville Schools" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
            <div className="rounded-2xl border border-navy/10 bg-mist p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
                <Sparkles className="h-5 w-5 text-gold" />
                Why Contact Blessedville?
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-ink/60">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Friendly admissions team</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Quick responses</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Personalized school tours</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold" /> Expert guidance on admissions</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Map                                                                */
/* ------------------------------------------------------------------ */
function MapSection() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Find Us"
          title={<>Located in <span className="text-gold-gradient">Kahawa West</span></>}
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-[0_14px_40px_-20px_rgba(8,8,8,0.3)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9!2d36.88!3d-1.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTEnMDkuNyJTIDM2wrA1Mic0OC4wIkU!5e0!3m2!1sen!2ske!4v1"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blessedville Schools location"
                className="h-[350px] w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-2xl border border-navy/10 bg-white p-6">
              <h4 className="flex items-center gap-2 font-semibold text-navy">
                <MapPin className="h-5 w-5 text-gold" />
                Nearest Landmarks
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-ink/60">
                <li>Next to Maple Inn Hotel</li>
                <li>Along the Northern Bypass</li>
                <li>Kiwanja area, Kahawa West</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white p-6">
              <h4 className="flex items-center gap-2 font-semibold text-navy">
                <Clock className="h-5 w-5 text-gold" />
                Parking & Access
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-ink/60">
                <li>Ample parking available on site</li>
                <li>Easily accessible from Northern Bypass</li>
                <li>Main entrance at the school gate</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SCHOOL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <ProgramHero
        badge="Contact Us"
        title="We'd Love to Hear From You"
        image="/schoolin1.jpeg"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact Cards */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-navy/10 bg-mist p-6 shadow-[0_10px_25px_-14px_rgba(8,8,8,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(8,8,8,0.3)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{c.title}</h3>
                <div className="mt-3 flex-1 space-y-1">
                  {c.lines.map((l, j) => (
                    <p key={j} className="text-sm text-ink/55">{l}</p>
                  ))}
                </div>
                {c.badge && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    <Clock className="h-3 w-3" />
                    {c.badge}
                  </span>
                )}
                {c.btnLabel && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={c.btnHref}
                      {...(c.btnExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy/90"
                    >
                      {c.btnLabel}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {c.btnSecondary && c.btnSecondary.action === "copy" ? (
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-2 text-xs font-semibold text-navy transition-all hover:bg-navy hover:text-white"
                      >
                        {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy Email</>}
                      </button>
                    ) : c.btnSecondary ? (
                      <a
                        href={c.btnSecondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-2 text-xs font-semibold text-navy transition-all hover:bg-navy hover:text-white"
                      >
                        {c.btnSecondary.icon && <c.btnSecondary.icon className="h-3 w-3" />}
                        {c.btnSecondary.label}
                      </a>
                    ) : null}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <ContactFormSection />

      {/* Map */}
      <MapSection />

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Got Questions?"
            title={<>Frequently <span className="text-gold-gradient">asked questions</span>.</>}
          />
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <FAQSection items={FAQ} />
          </Reveal>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative bg-navy py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-royal/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Ready to Join the Blessedville Family?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65">
              We look forward to welcoming you and your child.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="gold">
                Book a School Tour
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/admissions" variant="outline">
                Apply for Admission
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
