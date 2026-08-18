import { APPLICATION_PROGRAMS, GENDERS, ADMISSION_YEARS, ADMISSION_TERMS, getGradesForProgram, MAX_APPLICANT_AGE_YEARS } from "../../data/applicationOptions";
import { type ApplicationForm, type FieldErrors } from "../../lib/applicationForm";
import { TextField, SelectField, RadioGroup, FormSectionTitle } from "./formFields";

export default function ChildDetailsStep({
  form,
  errors,
  update,
}: {
  form: ApplicationForm;
  errors: FieldErrors;
  update: (patch: Partial<ApplicationForm>) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - MAX_APPLICANT_AGE_YEARS);
  const minDateStr = minDate.toISOString().split("T")[0];

  const programOptions = APPLICATION_PROGRAMS.map((p) => ({ value: p.key, label: p.label }));
  const gradeOptions = getGradesForProgram(form.program).map((g) => ({ value: g, label: g }));
  const yearOptions = ADMISSION_YEARS.map((y) => ({ value: y, label: y }));
  const termOptions = ADMISSION_TERMS.map((t) => ({ value: t, label: t }));

  return (
    <div className="space-y-8">
      <FormSectionTitle
        step="1"
        title="Child Details"
        subtitle="Tell us about the child you are applying for."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="childFirstName"
          label="Child's First Name"
          required
          error={errors.childFirstName}
          value={form.childFirstName}
          onChange={(v) => update({ childFirstName: v })}
          autoComplete="off"
          placeholder="e.g. Amina"
        />
        <TextField
          id="childMiddleName"
          label="Middle Name"
          optional
          error={errors.childMiddleName}
          value={form.childMiddleName}
          onChange={(v) => update({ childMiddleName: v })}
          autoComplete="off"
          placeholder="e.g. Wanjiku"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="childSurname"
          label="Surname"
          required
          error={errors.childSurname}
          value={form.childSurname}
          onChange={(v) => update({ childSurname: v })}
          autoComplete="off"
          placeholder="e.g. Otieno"
        />
        <TextField
          id="dateOfBirth"
          label="Date of Birth"
          required
          type="date"
          error={errors.dateOfBirth}
          value={form.dateOfBirth}
          onChange={(v) => update({ dateOfBirth: v })}
          max={today}
          min={minDateStr}
        />
      </div>

      <RadioGroup
        id="gender"
        label="Gender"
        required
        error={errors.gender}
        value={form.gender}
        onChange={(v) => update({ gender: v })}
        options={GENDERS}
      />

      <TextField
        id="currentSchool"
        label="Current School"
        optional
        error={errors.currentSchool}
        value={form.currentSchool}
        onChange={(v) => update({ currentSchool: v })}
        autoComplete="off"
        placeholder="Name of current school, if applicable"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="program"
          label="Program Applying For"
          required
          error={errors.program}
          value={form.program}
          onChange={(v) => {
            update({ program: v, grade: "" });
          }}
          options={programOptions}
        />
        <SelectField
          id="grade"
          label="Grade / Class"
          required
          error={errors.grade}
          value={form.grade}
          onChange={(v) => update({ grade: v })}
          options={gradeOptions}
          placeholder={form.program ? "Please select" : "Select a program first"}
          helper={form.program ? undefined : "Choose the program above to see available grades."}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="admissionYear"
          label="Intended Year of Admission"
          required
          error={errors.admissionYear}
          value={form.admissionYear}
          onChange={(v) => update({ admissionYear: v })}
          options={yearOptions}
        />
        <SelectField
          id="admissionTerm"
          label="Intended Term"
          required
          error={errors.admissionTerm}
          value={form.admissionTerm}
          onChange={(v) => update({ admissionTerm: v })}
          options={termOptions}
        />
      </div>
    </div>
  );
}
