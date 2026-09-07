import { Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div className="relative flex h-dvh flex-col">
      <Outlet />
    </div>
  );
}
