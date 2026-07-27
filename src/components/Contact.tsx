import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SCHOOL } from "../data";
import { Container, Reveal, SectionHeading } from "../lib/ui";

const PROGRAMS = ["Early Years", "Primary", "Junior", "Senior", "General Enquiry"];

function Field({
  id,
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const base =
    "peer w-full rounded-xl border bg-white/70 px-4 pt-6 pb-2 text-navy outline-none transition-colors placeholder-transparent focus:border-gold";
  const border = error ? "border-red-400" : "border-navy/15";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border}`}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-ink/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold"
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: PROGRAMS[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Tell us a little about your enquiry.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <section id="contact" className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title={<>We'd love to <span className="text-gold-gradient">meet you</span>.</>}
          subtitle="Book a personal tour or ask us anything. Our admissions team replies within one working day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info + map */}
          <Reveal className="lg:col-span-2 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { icon: MapPin, t: "Visit Us", d: SCHOOL.address },
                { icon: Mail, t: "Email", d: SCHOOL.email },
                { icon: Phone, t: "Call", d: SCHOOL.phone },
                { icon: Clock, t: "Hours", d: SCHOOL.hours },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">{c.t}</p>
                    <p className="mt-0.5 font-medium text-navy">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-[0_20px_50px_-26px_rgba(11,31,58,0.4)]">
              <iframe
                title="Meridian International Academy location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.98%2C40.79%2C-73.94%2C40.82&layer=mapnik&marker=40.805%2C-73.96"
                className="h-56 w-full border-0"
                loading="lazy"
              />
            </div>

            <a
              href={`https://wa.me/${SCHOOL.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 font-button text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-[2rem] border border-navy/10 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(11,31,58,0.4)] sm:p-10">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-gold" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-navy">Thank you, {form.name.split(" ")[0]}!</h3>
                  <p className="mt-2 max-w-sm text-ink/60">
                    Your enquiry is on its way. Our admissions team will be in touch within one working day.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", program: PROGRAMS[0], message: "" }); }}
                    className="mt-6 rounded-full bg-navy px-7 py-3 font-button text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full Name" value={form.name} onChange={set("name")} error={errors.name} />
                    <Field id="email" label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="phone" label="Phone (optional)" type="tel" value={form.phone} onChange={set("phone")} />
                    <div className="relative">
                      <select
                        value={form.program}
                        onChange={(e) => set("program")(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-navy/15 bg-white/70 px-4 pb-2 pt-6 text-navy outline-none transition-colors focus:border-gold"
                        aria-label="Programme of interest"
                      >
                        {PROGRAMS.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                      <label className="absolute left-4 top-2 text-xs font-medium text-gold">Interested in</label>
                    </div>
                  </div>
                  <Field id="message" label="Your Message" textarea value={form.message} onChange={set("message")} error={errors.message} />
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-button text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(212,175,55,0.6)]"
                  >
                    Send Enquiry <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
