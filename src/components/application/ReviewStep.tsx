import { Pencil, ShieldCheck } from "lucide-react";
import { APPLICATION_PROGRAMS, PRIVACY_NOTICE, CONSENT_LABEL } from "../../data/applicationOptions";
import { type ApplicationForm, type FieldErrors } from "../../lib/applicationForm";
import { CheckboxField, FormSectionTitle } from "./formFields";

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col py-2 sm:flex-row sm:gap-4">
      <dt className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</dt>
      <dd className="text-sm font-medium text-navy">{value}</dd>
    </div>
  );
}

function SummaryBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <div className="flex items-center justify-between border-b border-navy/10 bg-mist px-5 py-3.5">
        <h3 className="font-display text-base font-semibold text-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-xs font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      <dl className="divide-y divide-navy/5 px-5 py-2">{children}</dl>
    </div>
  );
}

export default function ReviewStep({
  form,
  errors,
  goToStep,
  update,
}: {
  form: ApplicationForm;
  errors: FieldErrors;
  goToStep: (step: number) => void;
  update: (patch: Partial<ApplicationForm>) => void;
}) {
  const programLabel = APPLICATION_PROGRAMS.find((p) => p.key === form.program)?.label ?? form.program;

  return (
    <div className="space-y-8">
      <FormSectionTitle
        step="4"
        title="Review & Submit"
        subtitle="Please check that everything looks correct before submitting your application."
      />

      <div className="space-y-5">
        <SummaryBlock title="Student Details" onEdit={() => goToStep(0)}>
          <SummaryRow label="Full Name" value={[form.childFirstName, form.childMiddleName, form.childSurname].filter(Boolean).join(" ")} />
          <SummaryRow label="Date of Birth" value={form.dateOfBirth} />
          <SummaryRow label="Gender" value={form.gender} />
          <SummaryRow label="Current School" value={form.currentSchool} />
          <SummaryRow label="Program" value={programLabel} />
          <SummaryRow label="Grade / Class" value={form.grade} />
          <SummaryRow label="Admission" value={form.admissionYear && form.admissionTerm ? `${form.admissionYear} · ${form.admissionTerm}` : ""} />
        </SummaryBlock>

        <SummaryBlock title="Parent / Guardian" onEdit={() => goToStep(1)}>
          <SummaryRow label="Full Name" value={[form.parentFirstName, form.parentSurname].filter(Boolean).join(" ")} />
          <SummaryRow label="Relationship" value={form.relationship} />
          <SummaryRow label="Email" value={form.email} />
          <SummaryRow label="Phone" value={form.phone} />
          <SummaryRow label="Alternative Phone" value={form.alternativePhone} />
          <SummaryRow label="Address" value={form.address} />
          {form.hasSecondParent === "yes" && (
            <>
              <SummaryRow
                label="Second Parent"
                value={[form.secondParentFirstName, form.secondParentSurname].filter(Boolean).join(" ")}
              />
              <SummaryRow label="Second Relationship" value={form.secondParentRelationship} />
              <SummaryRow label="Second Email" value={form.secondParentEmail} />
              <SummaryRow label="Second Phone" value={form.secondParentPhone} />
              <SummaryRow label="Second Alt Phone" value={form.secondParentAlternativePhone} />
              <SummaryRow label="Second Address" value={form.secondParentAddress} />
            </>
          )}
        </SummaryBlock>

        <SummaryBlock title="Additional Information" onEdit={() => goToStep(2)}>
          <SummaryRow
            label="Health Conditions"
            value={
              form.healthConditions === "yes"
                ? form.healthDetails || "Yes"
                : form.healthConditions === "no"
                  ? "No"
                  : ""
            }
          />
          <SummaryRow label="Interest" value={form.whyInterested} />
          <SummaryRow label="How you heard" value={form.hearAbout} />
          <SummaryRow
            label="School Tour"
            value={form.wantsTour === "yes" ? `Yes — ${form.tourDate}${form.tourTime ? `, ${form.tourTime}` : ""}` : "No, not right now"}
          />
          <SummaryRow label="Additional Info" value={form.additionalInfo} />
        </SummaryBlock>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-mist p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-ink/70">
          By submitting this application, I confirm that the information provided is accurate to the best of my
          knowledge.
        </p>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink/55">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          {PRIVACY_NOTICE}
        </p>
        <div className="mt-5">
          <CheckboxField
            id="consent"
            label={CONSENT_LABEL}
            error={errors.consent}
            checked={form.consent}
            onChange={(c) => update({ consent: c })}
          />
        </div>
      </div>
    </div>
  );
}
