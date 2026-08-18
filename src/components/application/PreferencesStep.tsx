import { HEAR_ABOUT_OPTIONS, TOUR_TIMES } from "../../data/applicationOptions";
import { type ApplicationForm, type FieldErrors } from "../../lib/applicationForm";
import { TextAreaField, SelectField, RadioGroup, TextField, FormSectionTitle } from "./formFields";

export default function PreferencesStep({
  form,
  errors,
  update,
}: {
  form: ApplicationForm;
  errors: FieldErrors;
  update: (patch: Partial<ApplicationForm>) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      <FormSectionTitle
        step="3"
        title="School Preferences & Additional Information"
        subtitle="A few final questions to help our team understand your family's needs."
      />

      <TextAreaField
        id="whyInterested"
        label="Why are you interested in Blessedville Schools?"
        optional
        rows={4}
        error={errors.whyInterested}
        value={form.whyInterested}
        onChange={(v) => update({ whyInterested: v })}
        placeholder="Share what matters most for your child's education..."
        maxLength={1000}
      />

      <SelectField
        id="hearAbout"
        label="How did you hear about us?"
        required
        error={errors.hearAbout}
        value={form.hearAbout}
        onChange={(v) => update({ hearAbout: v })}
        options={HEAR_ABOUT_OPTIONS.map((o) => ({ value: o, label: o }))}
      />

      <RadioGroup
        id="wantsTour"
        label="Would you like to book a school tour?"
        required
        error={errors.wantsTour}
        value={form.wantsTour}
        onChange={(v) => update({ wantsTour: v === "yes" ? "yes" : "no" })}
        options={[
          { value: "yes", label: "Yes", description: "I'd like to visit the school" },
          { value: "no", label: "No, not right now", description: "I can arrange it later" },
        ]}
      />

      {form.wantsTour === "yes" && (
        <div className="grid gap-5 rounded-2xl border border-gold/30 bg-gold/5 p-5 sm:grid-cols-2">
          <TextField
            id="tourDate"
            label="Preferred Tour Date"
            optional
            type="date"
            error={errors.tourDate}
            value={form.tourDate}
            onChange={(v) => update({ tourDate: v })}
            min={today}
            max={maxDateStr}
          />
          <SelectField
            id="tourTime"
            label="Preferred Time"
            optional
            error={errors.tourTime}
            value={form.tourTime}
            onChange={(v) => update({ tourTime: v })}
            options={TOUR_TIMES}
          />
          <p className="text-xs leading-relaxed text-ink/55 sm:col-span-2">
            Our team will confirm your tour date and time shortly after we receive your application.
          </p>
        </div>
      )}

      <TextAreaField
        id="additionalInfo"
        label="Additional Information"
        optional
        rows={3}
        error={errors.additionalInfo}
        value={form.additionalInfo}
        onChange={(v) => update({ additionalInfo: v })}
        placeholder="Anything else you'd like us to know? (optional)"
        maxLength={1000}
      />
    </div>
  );
}
