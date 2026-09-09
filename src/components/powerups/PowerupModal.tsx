import type { Powerup } from "@/types/powerups";
import { sellValue } from "@/utils/powerups";
import { rarityColors } from "@/utils/rarity";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

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

  return (
    <Modal
      label={powerup.name}
      onClose={onClose}
      className={`max-w-xs ${colors.border}`}
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
    </Modal>
  );
}
