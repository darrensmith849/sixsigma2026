"use client";

type Mode = "Online" | "Virtual" | "Classroom";

interface ModeSwitcherProps {
  active: Mode;
  onChange: (mode: Mode) => void;
}

const modes: Mode[] = ["Online", "Virtual", "Classroom"];

export default function ModeSwitcher({ active, onChange }: ModeSwitcherProps) {
  return (
    <div className="flex justify-center">
      <div
        className="inline-flex items-center rounded-full p-2.5"
        style={{
          background: "#f2f2f2",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          minWidth: "480px",
          height: "72px",
        }}
      >
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={`flex-1 h-full rounded-full font-semibold text-[19px] transition-all duration-200 ${
              active === mode
                ? "bg-green text-white shadow-sm"
                : "bg-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
