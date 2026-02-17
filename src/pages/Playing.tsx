import { useCallback, useRef, useState } from "react";
import { useAtom } from "jotai";
import { roundAtom } from "@/atoms/game";
import Game from "@/components/board/Game";
import PowerupsPanel from "@/components/powerups/PowerupsPanel";

const SLIDE_COUNT = 2;

export default function PlayingPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [round] = useAtom(roundAtom);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(index);
  }, []);

  const goToSlide = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    if (activeSlide > 0) goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  const goNext = useCallback(() => {
    if (activeSlide < SLIDE_COUNT - 1) goToSlide(activeSlide + 1);
  }, [activeSlide, goToSlide]);

  return (
    <>
      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {/* Slide 1: Game Grid */}
        <div className="flex w-full flex-none snap-center items-center justify-center">
          <Game key={round} />
        </div>

        {/* Slide 2: Active Powerups */}
        <div className="flex w-full flex-none snap-center items-center justify-center">
          <PowerupsPanel />
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between px-4 pt-2 pb-4">
        <button
          onClick={goPrev}
          disabled={activeSlide === 0}
          aria-label="Previous slide"
          className="bg-neutral-black/80 text-neutral-white rounded-lg px-3 py-2 transition-opacity disabled:opacity-20"
        >
          &larr;
        </button>
        <button
          onClick={goNext}
          disabled={activeSlide === SLIDE_COUNT - 1}
          aria-label="Next slide"
          className="bg-neutral-black/80 text-neutral-white rounded-lg px-3 py-2 transition-opacity disabled:opacity-20"
        >
          &rarr;
        </button>
      </div>
    </>
  );
}
