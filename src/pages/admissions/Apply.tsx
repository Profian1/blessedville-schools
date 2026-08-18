import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send, ShieldCheck, Trash2 } from "lucide-react";
import Seo from "../../lib/Seo";
import ApplicationProgress from "../../components/application/ApplicationProgress";
import ChildDetailsStep from "../../components/application/ChildDetailsStep";
import GuardianDetailsStep from "../../components/application/GuardianDetailsStep";
import PreferencesStep from "../../components/application/PreferencesStep";
import ReviewStep from "../../components/application/ReviewStep";
import ApplicationSuccess from "../../components/application/ApplicationSuccess";
import { Container, EASE } from "../../lib/ui";
import {
  emptyApplicationForm,
  validateChildDetails,
  validateGuardianDetails,
  validatePreferences,
  validateAll,
  toPayload,
  type ApplicationForm,
  type FieldErrors,
} from "../../lib/applicationForm";
import { loadDraft, saveDraft, clearDraft } from "../../lib/applicationDraft";
import { ENABLE_DRAFT_SAVE, APPLICATION_NOTICE } from "../../data/applicationOptions";
import { APPLY_SEO } from "../../data/admissions";

const STEP_VALIDATORS = [validateChildDetails, validateGuardianDetails, validatePreferences];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ApplicationForm>(() => ({
    ...emptyApplicationForm(),
    ...(ENABLE_DRAFT_SAVE ? (loadDraft() ?? {}) : {}),
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const didRestore = useRef(false);

  useEffect(() => {
    if (ENABLE_DRAFT_SAVE && loadDraft()) didRestore.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ENABLE_DRAFT_SAVE || submitted) return;
    const t = setTimeout(() => saveDraft(form), 500);
    return () => clearTimeout(t);
  }, [form, submitted]);

  const update = (patch: Partial<ApplicationForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setBanner("");
  };

  const goToStep = (target: number) => {
    setErrors({});
    setBanner("");
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    const stepErrors = STEP_VALIDATORS[step](form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setBanner("Please review the highlighted fields and try again.");
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setErrors({});
    setBanner("");
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const allErrors = validateAll(form);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setBanner("Please complete the highlighted fields before submitting.");
      return;
    }

    setSubmitting(true);
    setBanner("");
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form)),
      });
      const json = await res.json();
      if (res.ok && json.success && json.reference) {
        clearDraft();
        setSubmitted(json.reference);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setBanner(json.message || "We couldn't submit your application right now. Please try again shortly.");
        if (res.status === 429) setBanner(json.message);
        setSubmitting(false);
      }
    } catch {
      setBanner("We couldn't submit your application right now. Please try again shortly or contact our admissions team.");
      setSubmitting(false);
    }
  };

  const handleStartOver = () => {
    clearDraft();
    setForm(emptyApplicationForm());
    setErrors({});
    setBanner("");
    setStep(0);
  };

  const isLastStep = step === 3;

  return (
    <>
      <Seo
        title={APPLY_SEO.title}
        description={APPLY_SEO.description}
        path={APPLY_SEO.path}
        noindex={APPLY_SEO.noindex}
      />

      <section className="relative overflow-hidden bg-white py-28 sm:py-32">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

        <Container className="relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Apply Online
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              Apply to Blessedville Schools
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/65">
              Complete the application below and our admissions team will contact you regarding the next steps.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {submitted ? (
              <ApplicationSuccess reference={submitted} />
            ) : (
              <div className="space-y-6">
              <ApplicationProgress current={step} />

              <p className="flex items-start gap-2 rounded-xl border border-navy/10 bg-white px-4 py-3 text-xs leading-relaxed text-ink/55">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {APPLICATION_NOTICE}
              </p>

              {didRestore.current && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-navy">
                  <span className="font-medium">We restored a draft application saved on this device.</span>
                  <button
                    onClick={handleStartOver}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Start Over
                  </button>
                </div>
              )}

              <AnimatePresence mode="wait">
                {banner && (
                  <motion.div
                    key="banner"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {banner}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(8,8,8,0.25)] sm:p-8">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {step === 0 && <ChildDetailsStep form={form} errors={errors} update={update} />}
                    {step === 1 && <GuardianDetailsStep form={form} errors={errors} update={update} />}
                    {step === 2 && <PreferencesStep form={form} errors={errors} update={update} />}
                    {step === 3 && (
                      <ReviewStep form={form} errors={errors} goToStep={goToStep} update={update} />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-9 flex flex-col-reverse gap-3 border-t border-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => goToStep(step - 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}

                  {isLastStep ? (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3.5 font-button text-sm font-semibold tracking-wide text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(245,184,19,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-3.5 font-button text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(8,8,8,0.55)]"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>

              {ENABLE_DRAFT_SAVE && (
                <p className="text-center text-xs text-ink/40">
                  Your progress is saved automatically on this device as you complete each step.
                </p>
              )}
            </div>
          )}
          </div>
        </Container>
      </section>
    </>
  );
}
