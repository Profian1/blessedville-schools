import { type ReactNode } from "react";

const baseInput =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-ink/35";

function inputClass(error?: string, extra = "") {
  return `${baseInput} ${error ? "border-red-400 focus:border-red-500" : "border-navy/15 focus:border-gold"} ${extra}`;
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {error}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  min?: string;
  max?: string;
  helper?: string;
};

export function TextField({
  id,
  label,
  required,
  optional,
  error,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  maxLength,
  min,
  max,
  helper,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-gold" aria-hidden="true">*</span>
        ) : optional ? (
          <span className="ml-1.5 text-xs font-normal text-ink/40">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        min={min}
        max={max}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helper ? `${id}-helper` : undefined}
        className={inputClass(error)}
      />
      {helper && !error && (
        <p id={`${id}-helper`} className="mt-1.5 text-xs text-ink/45">{helper}</p>
      )}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  helper?: string;
};

export function SelectField({
  id,
  label,
  required,
  optional,
  error,
  value,
  onChange,
  options,
  placeholder = "Please select",
  helper,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-gold" aria-hidden="true">*</span>
        ) : optional ? (
          <span className="ml-1.5 text-xs font-normal text-ink/40">(optional)</span>
        ) : null}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helper ? `${id}-helper` : undefined}
        className={`${inputClass(error)} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232B2B2B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${
          value ? "" : "text-ink/40"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {helper && !error && (
        <p id={`${id}-helper`} className="mt-1.5 text-xs text-ink/45">{helper}</p>
      )}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
};

export function TextAreaField({
  id,
  label,
  required,
  optional,
  error,
  value,
  onChange,
  rows = 4,
  placeholder,
  maxLength,
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-gold" aria-hidden="true">*</span>
        ) : optional ? (
          <span className="ml-1.5 text-xs font-normal text-ink/40">(optional)</span>
        ) : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClass(error)} resize-y`}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

type RadioGroupProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
};

export function RadioGroup({ id, label, required, error, value, onChange, options }: RadioGroupProps) {
  const errorId = `${id}-error`;
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-gold" aria-hidden="true">*</span>}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium transition-all ${
              value === o.value
                ? "border-gold bg-gold/5 text-navy shadow-[0_4px_14px_-6px_rgba(245,184,19,0.5)]"
                : "border-navy/15 text-ink/70 hover:border-navy/30"
            }`}
          >
            <input
              type="radio"
              name={id}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="h-4 w-4 accent-[#F5B813]"
            />
            <span>
              {o.label}
              {o.description && <span className="block text-xs font-normal text-ink/45">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} error={error} />
    </fieldset>
  );
}

type CheckboxFieldProps = {
  id: string;
  label: ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ id, label, error, checked, onChange }: CheckboxFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white px-4 py-3.5 transition-all ${
          error ? "border-red-400" : checked ? "border-gold bg-gold/5" : "border-navy/15"
        }`}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[#F5B813]"
        />
        <span className="text-sm leading-relaxed text-ink/75">{label}</span>
      </label>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export function FormSectionTitle({ step, title, subtitle }: { step: string; title: string; subtitle?: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-navy">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Step {step} of 4
      </span>
      <h2 className="mt-3 font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-ink/60">{subtitle}</p>}
    </div>
  );
}
