import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import Seo from "../../lib/Seo";
import ProgramHero from "../../components/ProgramHero";
import { Container, Reveal, EASE, Button } from "../../lib/ui";
import { TextField, SelectField, TextAreaField } from "../../components/application/formFields";
import { APPLICATION_PROGRAMS, TOUR_TIMES } from "../../data/applicationOptions";
import { SCHOOL } from "../../data";
import { BOOK_TOUR_SEO } from "../../data/admissions";

type TourForm = {
  name: string;
  email: string;
  phone: string;
  program: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const emptyTourForm = (): TourForm => ({
  name: "",
  email: "",
  phone: "",
  program: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
});

function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  if (!digits) return false;
  if (/^(\+?254|0)?7\d{8}$/.test(digits)) return true;
  return /^\+?\d{8,15}$/.test(digits);
}

export default function BookTour() {
  const [form, setForm] = useState<TourForm>(emptyTourForm());
  const [errors, setErrors] = useState<Partial<Record<keyof TourForm, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [requestorName, setRequestorName] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const update = (patch: Partial<TourForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors({});
  };

  const validate = (f: TourForm) => {
    const e: Partial<Record<keyof TourForm, string>> = {};
    if (!f.name.trim()) e.name = "Please enter your full name.";
    if (!f.email.trim()) e.email = "Please enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
    if (!f.phone.trim()) e.phone = "Please enter a phone number.";
    else if (!isValidPhone(f.phone)) e.phone = "Please enter a valid phone number, for example +254 712 345 678.";
    if (!f.preferredDate) e.preferredDate = "Please choose a preferred date for your visit.";
    return e;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (state === "loading") return;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setMsg("Please review the highlighted fields and try again.");
      setState("error");
      return;
    }
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const json = await res.json();
      if (json.success) {
        setRequestorName(form.name.trim().split(" ")[0]);
        setState("success");
        setMsg(json.message);
        setForm(emptyTourForm());
      } else {
        setState("error");
        setMsg(json.message || "Something went wrong. Please try again shortly.");
      }
    } catch {
      setState("error");
      setMsg("We couldn't submit your tour request right now. Please call us on " + SCHOOL.phone + ".");
    }
  };

  return (
    <>
      <Seo
        title={BOOK_TOUR_SEO.title}
        description={BOOK_TOUR_SEO.description}
        path={BOOK_TOUR_SEO.path}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: BOOK_TOUR_SEO.title,
            description: BOOK_TOUR_SEO.description,
            url: `https://blessedville.edu${BOOK_TOUR_SEO.path}`,
          },
        ]}
      />

      <ProgramHero
        badge="Visit Us"
        title="Book a School Tour"
        subtitle="See our learning environment, meet our teachers, and experience the warmth of the Blessedville community first-hand."
        image="/contact/school.jpg"
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Book a School Tour" }]}
      />

      <section className="bg-mist py-16 sm:py-24">
        <Container className="max-w-3xl">
          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mx-auto max-w-xl rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-[0_20px_50px_-24px_rgba(8,8,8,0.25)]"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
                <CheckCircle2 className="h-9 w-9 text-gold" />
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-navy">Tour Request Received!</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/65">
                  Thank you, {requestorName || "friend"}! Our team will contact you shortly to confirm your
                visit to Blessedville Schools.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/admissions" variant="gold">
                  Back to Admissions
                </Button>
                <a
                  href={`https://wa.me/${SCHOOL.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          ) : (
            <Reveal>
              <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(8,8,8,0.25)] sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">Request a Visit</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Tell us when you'd like to visit and we'll confirm a time with you. Visits take place during the
                  week by appointment.
                </p>

                {state === "error" && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="tourName"
                      label="Full Name"
                      required
                      error={errors.name}
                      value={form.name}
                      onChange={(v) => update({ name: v })}
                      autoComplete="name"
                      placeholder="e.g. Jane Wanjiku"
                    />
                    <TextField
                      id="tourPhone"
                      label="Phone Number"
                      required
                      type="tel"
                      error={errors.phone}
                      value={form.phone}
                      onChange={(v) => update({ phone: v })}
                      autoComplete="tel"
                      placeholder="+254 712 345 678"
                    />
                  </div>
                  <TextField
                    id="tourEmail"
                    label="Email Address"
                    required
                    type="email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => update({ email: v })}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  <SelectField
                    id="tourProgram"
                    label="Program of Interest"
                    optional
                    error={errors.program}
                    value={form.program}
                    onChange={(v) => update({ program: v })}
                    options={APPLICATION_PROGRAMS.map((p) => ({ value: p.key, label: p.label }))}
                    placeholder="Not sure yet"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="tourDate"
                      label="Preferred Date"
                      required
                      type="date"
                      error={errors.preferredDate}
                      value={form.preferredDate}
                      onChange={(v) => update({ preferredDate: v })}
                      min={today}
                      max={maxDateStr}
                    />
                    <SelectField
                      id="tourTime"
                      label="Preferred Time"
                      optional
                      error={errors.preferredTime}
                      value={form.preferredTime}
                      onChange={(v) => update({ preferredTime: v })}
                      options={TOUR_TIMES}
                      placeholder="Any time"
                    />
                  </div>
                  <TextAreaField
                    id="tourMessage"
                    label="Anything else?"
                    optional
                    rows={3}
                    error={errors.message}
                    value={form.message}
                    onChange={(v) => update({ message: v })}
                    placeholder="Questions you'd like us to prepare for? (optional)"
                    maxLength={1000}
                  />
                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                    <Button type="submit" href="#" variant="gold" disabled={state === "loading"} className="disabled:opacity-60">
                      {state === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Request Tour <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <a
                      href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4" />
                      Prefer to call? {SCHOOL.phone}
                    </a>
                  </div>
                </form>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
