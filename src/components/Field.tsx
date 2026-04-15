import { forwardRef } from "react";

interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const baseInput =
  "w-full rounded-[12px] border border-ink-100 bg-white px-4 py-4 text-[16px] text-ink-900 placeholder:text-ink-300 transition-all duration-[var(--dur)] ease-[var(--ease)] focus:border-green-500 focus:outline-none focus:[box-shadow:var(--shadow-glow)]";

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <label className="block">
        <span className="mb-2 block text-[14px] font-semibold text-ink-700">
          {label}
        </span>
        <input
          ref={ref}
          className={`${baseInput} ${
            error ? "border-red-400" : ""
          } ${className}`}
          {...props}
        />
        {hint && !error && (
          <span className="mt-1.5 block text-[13px] text-ink-500">{hint}</span>
        )}
        {error && (
          <span className="mt-1.5 block text-[13px] text-red-600">{error}</span>
        )}
      </label>
    );
  }
);

Field.displayName = "Field";

export default Field;

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, error, className = "", ...props }, ref) => {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-semibold text-ink-700">
        {label}
      </span>
      <textarea
        ref={ref}
        className={`${baseInput} resize-y ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1.5 block text-[13px] text-red-600">{error}</span>
      )}
    </label>
  );
});
TextareaField.displayName = "TextareaField";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, className = "", children, ...props }, ref) => {
    return (
      <label className="block">
        <span className="mb-2 block text-[14px] font-semibold text-ink-700">
          {label}
        </span>
        <select
          ref={ref}
          className={`${baseInput} ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <span className="mt-1.5 block text-[13px] text-red-600">{error}</span>
        )}
      </label>
    );
  }
);
SelectField.displayName = "SelectField";
