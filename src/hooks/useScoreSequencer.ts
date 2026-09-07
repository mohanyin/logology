import { useCallback, useEffect, useRef, useState } from "react";
import {
  SCORE_SEQUENCE_HOLD_MS,
  SCORE_STEP_BASE_MS,
  SCORE_STEP_DECAY,
  SCORE_STEP_MIN_MS,
} from "@/utils/constants";
import {
  ZERO_TOTALS,
  type ScoreSequence,
  type ScoreStep,
  type ScoreTotals,
} from "@/utils/scoring";

type SequencerState =
  | { status: "idle" }
  | {
      status: "running";
      runId: number;
      sequence: ScoreSequence;
      /** Steps applied so far. 0 is the reset beat showing 0 x 0. */
      frame: number;
    };

const stepDuration = (frame: number) =>
  Math.max(
    SCORE_STEP_MIN_MS,
    Math.round(SCORE_STEP_BASE_MS * SCORE_STEP_DECAY ** frame),
  );

/**
 * Walks a ScoreSequence one step at a time on a decaying timer, exposing the
 * totals to display and which step is currently firing.
 */
export function useScoreSequencer() {
  const [state, setState] = useState<SequencerState>({ status: "idle" });
  const onDoneRef = useRef<(() => void) | null>(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (state.status !== "running") return;
    const { runId, sequence, frame } = state;
    const isLast = frame >= sequence.steps.length;

    const id = window.setTimeout(
      () => {
        if (isLast) {
          setState({ status: "idle" });
          const done = onDoneRef.current;
          onDoneRef.current = null;
          done?.();
        } else {
          setState({ status: "running", runId, sequence, frame: frame + 1 });
        }
      },
      isLast ? SCORE_SEQUENCE_HOLD_MS : stepDuration(frame),
    );

    return () => window.clearTimeout(id);
  }, [state]);

  const start = useCallback((sequence: ScoreSequence, onDone: () => void) => {
    onDoneRef.current = onDone;
    runIdRef.current += 1;
    setState({
      status: "running",
      runId: runIdRef.current,
      sequence,
      frame: 0,
    });
  }, []);

  const isRunning = state.status === "running";

  const displayed: ScoreTotals | null = !isRunning
    ? null
    : state.frame === 0
      ? ZERO_TOTALS
      : state.sequence.steps[state.frame - 1].after;

  const activeStep: ScoreStep | null =
    !isRunning || state.frame === 0
      ? null
      : state.sequence.steps[state.frame - 1];

  // Distinguishes consecutive shakes of the same element; runId keeps two
  // words in a row from colliding on frame 1.
  const shakeId = isRunning ? `${state.runId}:${state.frame}` : "";

  return { start, isRunning, displayed, activeStep, shakeId };
}
