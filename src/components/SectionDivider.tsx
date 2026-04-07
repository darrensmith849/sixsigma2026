interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-24 bg-ink-100" />
      <span className="block h-2 w-2 rotate-45 bg-green-500" />
      <span className="h-px w-24 bg-ink-100" />
    </div>
  );
}
