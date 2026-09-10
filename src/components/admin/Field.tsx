import { useId, type ReactNode } from 'react';

const inputClasses =
  'min-h-[44px] w-full rounded-lg bg-surface px-3 py-2.5 text-body-sm text-on-surface ' +
  'outline-none ring-1 ring-outline-variant transition-colors duration-200 ' +
  'placeholder:text-outline focus:ring-2 focus:ring-primary';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-label-md text-on-surface">
        {label}
      </label>
      {children(id)}
      {hint && <span className="text-label-sm text-on-surface-variant">{hint}</span>}
    </div>
  );
}

export function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={inputClasses}
        />
      )}
    </Field>
  );
}

export function NumberField({
  label,
  hint,
  value,
  onChange,
  min = 0,
  step = 1,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  step?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className={inputClasses}
        />
      )}
    </Field>
  );
}

export function TextAreaField({
  label,
  hint,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClasses} resize-y`}
        />
      )}
    </Field>
  );
}

export function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClasses} cursor-pointer`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function ToggleField({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-lg bg-surface-container px-3 py-2"
    >
      <span className="flex flex-col">
        <span className="text-label-md text-on-surface">{label}</span>
        {hint && <span className="text-label-sm text-on-surface-variant">{hint}</span>}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-primary)]"
      />
    </label>
  );
}

export const adminInputClasses = inputClasses;
