interface WordDisplayProps {
  selectedWord: string;
  isValid: boolean;
  ready: boolean;
}

const VALID_COLOR = "#3c6720";
const IDLE_COLOR = "#d5c9b4";

function Star({ isValid, visible }: { isValid: boolean; visible: boolean }) {
  return (
    <svg
      viewBox="0 0 15 15"
      className={`size-[15px] shrink-0 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <path
        d="M7.31195 0L9.53127 2.89154L13.1757 2.82383L12.2987 6.36181L14.6239 9.16891L11.311 10.6891L10.5661 14.2573L7.31195 12.615L4.05782 14.2573L3.31288 10.6891L-8.58307e-06 9.16891L2.32519 6.36181L1.44821 2.82383L5.09264 2.89154L7.31195 0Z"
        fill={isValid ? VALID_COLOR : IDLE_COLOR}
      />
    </svg>
  );
}

export default function WordDisplay({
  selectedWord,
  isValid,
  ready,
}: WordDisplayProps) {
  const hasWord = selectedWord.length > 0;

  return (
    <div
      className="flex min-h-[50px] w-full items-center justify-center gap-3 border-y border-[#d5c9b4] py-2"
      aria-live="polite"
    >
      {!ready ? (
        <span className="text-neutral-x-dark text-sm">Loading dictionary…</span>
      ) : (
        <>
          <Star isValid={isValid} visible={hasWord} />
          <span className="font-family-serif text-[24px] font-semibold tracking-[2.4px] text-[#191814] uppercase">
            {selectedWord || "\u00A0"}
          </span>
          <Star isValid={isValid} visible={hasWord} />
        </>
      )}
    </div>
  );
}
