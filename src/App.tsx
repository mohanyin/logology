import { NeuroNoise } from "@paper-design/shaders-react";
import Grid from "@/components/board/Grid";

function App() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
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
      <Grid />
    </div>
  );
}

export default App;
