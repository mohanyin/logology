import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app.css";
import App from "@/App.tsx";
import { loadRun } from "@/utils/persistence";

// Restore before the first render, so the board mounts with the saved tiles
// rather than dealing a fresh hand and replacing it a frame later.
loadRun();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
