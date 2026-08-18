import { RELATIONSHIPS, REQUIRES_PHYSICAL_ADDRESS } from "../../data/applicationOptions";
import { type ApplicationForm, type FieldErrors } from "../../lib/applicationForm";
import { TextField, SelectField, RadioGroup, FormSectionTitle } from "./formFields";

export default function GuardianDetailsStep({
  form,
  errors,
  update,
}: {
  form: ApplicationForm;
  errors: FieldErrors;
  update: (patch: Partial<ApplicationForm>) => void;
}) {
  return (
    <div className="space-y-8">
      <FormSectionTitle
        step="2"
        title="Parent / Guardian Details"
        subtitle="We'll use these details to contact you about your student's application."
      />

      <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-navy">Primary Parent / Guardian</h3>
        <div className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="parentFirstName"
              label="Parent / Guardian First Name"
              required
              error={errors.parentFirstName}
              value={form.parentFirstName}
              onChange={(v) => update({ parentFirstName: v })}
              autoComplete="given-name"
              placeholder="e.g. Jane"
            />
            <TextField
              id="parentSurname"
              label="Surname"
              required
              error={errors.parentSurname}
              value={form.parentSurname}
              onChange={(v) => update({ parentSurname: v })}
              autoComplete="family-name"
              placeholder="e.g. Wanjiku"
            />
          </div>

          <SelectField
            id="relationship"
            label="Relationship to Student"
            required
            error={errors.relationship}
            value={form.relationship}
            onChange={(v) => update({ relationship: v })}
            options={RELATIONSHIPS}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="email"
              label="Email Address"
              required
              type="email"
              error={errors.email}
              value={form.email}
              onChange={(v) => update({ email: v })}
              autoComplete="email"
              placeholder="you@example.com"
            />
            <TextField
              id="phone"
              label="Phone Number"
              required
              type="tel"
              error={errors.phone}
              value={form.phone}
              onChange={(v) => update({ phone: v })}
              autoComplete="tel"
              placeholder="+254 712 345 678"
              helper="Kenyan numbers or international numbers are welcome."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="alternativePhone"
              label="Alternative Phone"
              optional
              type="tel"
              error={errors.alternativePhone}
              value={form.alternativePhone}
              onChange={(v) => update({ alternativePhone: v })}
              autoComplete="tel"
              placeholder="Optional"
            />
            <TextField
              id="address"
              label="Physical Address"
              optional={!REQUIRES_PHYSICAL_ADDRESS}
              required={REQUIRES_PHYSICAL_ADDRESS}
              error={errors.address}
              value={form.address}
              onChange={(v) => update({ address: v })}
              autoComplete="street-address"
              placeholder="Estate, area, or town"
            />
          </div>
        </div>
      </div>

      <RadioGroup
        id="hasSecondParent"
        label="Do you wish to input information for the second parent/guardian?"
        required
        error={errors.hasSecondParent}
        value={form.hasSecondParent}
        onChange={(v) => update({ hasSecondParent: v === "yes" ? "yes" : "no" })}
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
      />

      {form.hasSecondParent === "yes" && (
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-navy">Second Parent / Guardian Details</h3>
          <p className="mt-1 text-sm text-ink/60">Only the details you provide below will be shared with the school.</p>
          <div className="mt-5 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="secondParentFirstName"
                label="Second Parent / Guardian First Name"
                required
                error={errors.secondParentFirstName}
                value={form.secondParentFirstName}
                onChange={(v) => update({ secondParentFirstName: v })}
                autoComplete="given-name"
                placeholder="e.g. Peter"
              />
              <TextField
                id="secondParentSurname"
                label="Surname"
                required
                error={errors.secondParentSurname}
                value={form.secondParentSurname}
                onChange={(v) => update({ secondParentSurname: v })}
                autoComplete="family-name"
                placeholder="e.g. Otieno"
              />
            </div>

            <SelectField
              id="secondParentRelationship"
              label="Relationship to Student"
              required
              error={errors.secondParentRelationship}
              value={form.secondParentRelationship}
              onChange={(v) => update({ secondParentRelationship: v })}
              options={RELATIONSHIPS}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="secondParentPhone"
                label="Phone Number"
                required
                type="tel"
                error={errors.secondParentPhone}
                value={form.secondParentPhone}
                onChange={(v) => update({ secondParentPhone: v })}
                autoComplete="tel"
                placeholder="+254 712 345 678"
              />
              <TextField
                id="secondParentEmail"
                label="Email Address"
                optional
                type="email"
                error={errors.secondParentEmail}
                value={form.secondParentEmail}
                onChange={(v) => update({ secondParentEmail: v })}
                autoComplete="email"
                placeholder="optional@example.com"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="secondParentAlternativePhone"
                label="Alternative Phone"
                optional
                type="tel"
                error={errors.secondParentAlternativePhone}
                value={form.secondParentAlternativePhone}
                onChange={(v) => update({ secondParentAlternativePhone: v })}
                autoComplete="tel"
                placeholder="Optional"
              />
              <TextField
                id="secondParentAddress"
                label="Physical Address"
                optional
                error={errors.secondParentAddress}
                value={form.secondParentAddress}
                onChange={(v) => update({ secondParentAddress: v })}
                autoComplete="street-address"
                placeholder="Estate, area, or town"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}