import { type ButtonHTMLAttributes } from "react";

type ButtonColor = "green" | "orange" | "blue";

const colorClasses: Record<
  ButtonColor,
  {
    surface: string;
    border: string;
    label: string;
    badge: string;
    count: string;
    shadow: string;
    shadowActive: string;
  }
> = {
  green: {
    surface: "bg-green-600",
    border: "border-green-400",
    label: "text-green-200",
    badge: "bg-green-200",
    count: "text-green-600",
    shadow: "shadow-[0_5px_0_#2b5712,0_8px_10px_rgba(0,0,0,0.3)]",
    shadowActive: "active:shadow-[0_1px_0_#2b5712,0_3px_6px_rgba(0,0,0,0.3)]",
  },
  orange: {
    surface: "bg-orange-600",
    border: "border-orange-400",
    label: "text-orange-200",
    badge: "bg-orange-200",
    count: "text-orange-600",
    shadow: "shadow-[0_5px_0_#8b3f1e,0_8px_10px_rgba(0,0,0,0.3)]",
    shadowActive: "active:shadow-[0_1px_0_#8b3f1e,0_3px_6px_rgba(0,0,0,0.3)]",
  },
  blue: {
    surface: "bg-blue-600",
    border: "border-blue-400",
    label: "text-blue-200",
    badge: "bg-blue-200",
    count: "text-blue-600",
    shadow: "shadow-[0_5px_0_#1f496e,0_8px_10px_rgba(0,0,0,0.3)]",
    shadowActive: "active:shadow-[0_1px_0_#1f496e,0_3px_6px_rgba(0,0,0,0.3)]",
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  count?: number;
}

export default function Button({
  color,
  count,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const colors = colorClasses[color];

  return (
    <button
      className={`group relative flex w-full items-center justify-between gap-2 rounded-[2px] px-4 pt-3 pb-3.5 transition-[transform,box-shadow] duration-100 active:translate-y-[4px] ${colors.surface} ${colors.shadow} ${colors.shadowActive} ${className}`}
      {...props}
    >
      <span
        className={`text-[20px] font-bold tracking-[1px] uppercase transition-transform group-active:translate-y-[2px] group-disabled:line-through ${colors.label}`}
      >
        {children}
      </span>

      {count && (
        <span
          className={`relative flex size-7 shrink-0 items-center justify-center rounded-full transition-transform group-active:translate-y-[2px] ${colors.badge}`}
        >
          <span
            className={`font-family-display relative text-[18px] leading-none ${colors.count}`}
          >
            {count}
          </span>
        </span>
      )}

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-[2px] right-[2px] bottom-[4px] left-[2px] border-[1.25px] border-solid transition-transform group-active:translate-y-[2px] ${colors.border}`}
      />
    </button>
  );
}
