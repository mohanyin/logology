import { useEffect } from "react";
import type { Powerup } from "@/types/powerups";
import { sellValue } from "@/utils/powerups";
import { rarityColors } from "@/utils/rarity";
import Button from "@/components/ui/Button";

interface PowerupModalProps {
  powerup: Powerup;
  onSell: () => void;
  onClose: () => void;
}

export default function PowerupModal({
  powerup,
  onSell,
  onClose,
}: PowerupModalProps) {
  const colors = rarityColors[powerup.rarity];

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
        aria-label={powerup.name}
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-black flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border p-6 ${colors.border}`}
      >
        <img
          src={powerup.imagePath}
          alt={powerup.name}
          className="size-32 rounded-lg object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-family-display text-neutral-white text-2xl">
            {powerup.name}
          </span>
          <span className="text-neutral-dark text-[10px] font-semibold tracking-wider uppercase">
            {powerup.rarity}
          </span>
          <p className="text-neutral-light text-sm leading-snug">
            {powerup.description}
          </p>
        </div>

        <div className="flex w-full gap-2">
          <Button color="blue" onClick={onClose}>
            Close
          </Button>
          <Button color="orange" count={sellValue(powerup)} onClick={onSell}>
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
}
