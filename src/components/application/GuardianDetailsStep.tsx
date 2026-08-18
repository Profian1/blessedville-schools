import { RELATIONSHIPS, REQUIRES_PHYSICAL_ADDRESS } from "../../data/applicationOptions";
import { type ApplicationForm, type FieldErrors } from "../../lib/applicationForm";
import { TextField, SelectField, FormSectionTitle } from "./formFields";

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
        subtitle="We'll use these details to contact you about your child's application."
      />

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
        label="Relationship to Child"
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
  );
}
