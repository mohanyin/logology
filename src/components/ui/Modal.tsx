import { useEffect, type ReactNode } from "react";

interface ModalProps {
  label: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/** Overlay shell: closes on Escape or a click outside the panel. */
export default function Modal({
  label,
  onClose,
  children,
  className = "",
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-black flex max-h-full w-full flex-col items-center gap-4 rounded-xl border p-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
