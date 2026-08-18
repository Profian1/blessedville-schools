import { Check } from "lucide-react";
import { EASE } from "../../lib/ui";
import { motion } from "framer-motion";

export const APPLICATION_STEPS = [
  { label: "Student Details", short: "Student" },
  { label: "Parent / Guardian", short: "Parent / Guardian" },
  { label: "Additional Information", short: "Info" },
  { label: "Review & Submit", short: "Review & Submit" },
] as const;

export default function ApplicationProgress({ current }: { current: number }) {
  const step = APPLICATION_STEPS[current];
  const pct = ((current + 1) / APPLICATION_STEPS.length) * 100;

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6" aria-label="Application progress">
      {/* Mobile header */}
      <div className="flex items-center justify-between lg:hidden" aria-live="polite">
        <p className="font-button text-sm font-semibold text-navy">
          Step {current + 1} of {APPLICATION_STEPS.length}
        </p>
        <p className="text-sm font-medium text-ink/60">{step.short}</p>
      </div>

      {/* Progress bar */}
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-navy/8 lg:mt-0"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-label={`Step ${current + 1} of ${APPLICATION_STEPS.length}: ${step.label}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: EASE }}
          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
        />
      </div>

      {/* Desktop steps */}
      <ol className="mt-5 hidden grid-cols-4 gap-2 lg:grid">
        {APPLICATION_STEPS.map((s, i) => {
          const state = i < current ? "done" : i === current ? "current" : "upcoming";
          return (
            <li key={s.label} className="flex items-center gap-2.5" aria-current={state === "current" ? "step" : undefined}>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-button text-sm font-bold transition-colors ${
                  state === "done"
                    ? "bg-gold text-navy"
                    : state === "current"
                      ? "bg-navy text-gold ring-4 ring-gold/25"
                      : "bg-navy/8 text-ink/45"
                }`}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`text-xs font-semibold leading-tight ${
                  state === "current" ? "text-navy" : state === "done" ? "text-ink/70" : "text-ink/40"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
