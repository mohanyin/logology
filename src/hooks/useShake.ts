import { useEffect, useRef } from "react";
import { SHAKE_DURATION_MS } from "@/utils/constants";

const SHAKE_KEYFRAMES: Keyframe[] = [
  { transform: "translateX(0) rotate(0deg)" },
  { transform: "translateX(-2px) rotate(-3deg)" },
  { transform: "translateX(2px) rotate(3deg)" },
  { transform: "translateX(-1px) rotate(-1.5deg)" },
  { transform: "translateX(0) rotate(0deg)" },
];

/**
 * Shakes the referenced element whenever `active` is true and `shakeId`
 * changes. Uses the Web Animations API rather than a CSS class because the
 * same element often shakes on consecutive steps — a tile contributes its
 * points, then a powerup fires on that same tile — and `element.animate()`
 * restarts from the beginning on every call.
 */
export function useShake<T extends HTMLElement>(
  active: boolean,
  shakeId: string,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el?.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = el.animate(SHAKE_KEYFRAMES, {
      duration: SHAKE_DURATION_MS,
      easing: "ease-in-out",
    });
    return () => animation.cancel();
  }, [active, shakeId]);

  return ref;
}
