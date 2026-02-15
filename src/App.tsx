import { useCallback, useRef, useState } from "react";
import { NeuroNoise } from "@paper-design/shaders-react";
import Grid from "@/components/board/Grid";
import PowerupsPanel from "@/components/powerups/PowerupsPanel";

const SLIDE_COUNT = 2;

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    <div className="relative flex h-dvh flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <NeuroNoise
          width="100%"
          height="100%"
          colorFront="#fffef4"
          colorMid="#f0eee1"
          colorBack="#e1decb"
          brightness={0.05}
          contrast={0.3}
          speed={0.5}
        />
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {/* Slide 1: Game Grid */}
        <div className="flex w-full flex-none snap-center items-center justify-center">
          <Grid />
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
    </div>
  );
}

export default App;
