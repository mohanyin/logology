import { Outlet } from "@tanstack/react-router";
import { NeuroNoise } from "@paper-design/shaders-react";

export default function RootLayout() {
  return (
    <div className="relative flex h-dvh flex-col">
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
      <Outlet />
    </div>
  );
}
