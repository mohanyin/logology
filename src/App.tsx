import { useState } from "react";
import { motion } from "motion/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 text-white">
      <div className="flex gap-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <motion.img
            src={viteLogo}
            className="h-24 p-4"
            alt="Vite logo"
            whileHover={{
              scale: 1.2,
              filter: "drop-shadow(0 0 2em #646cffaa)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <motion.img
            src={reactLogo}
            className="h-24 p-4"
            alt="React logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{
              scale: 1.2,
              filter: "drop-shadow(0 0 2em #61dafbaa)",
            }}
          />
        </a>
      </div>

      <h1 className="text-5xl font-bold">Vite + React</h1>

      <div className="flex flex-col items-center gap-4 rounded-xl bg-zinc-900 p-8">
        <motion.button
          className="cursor-pointer rounded-lg border border-transparent bg-zinc-800 px-5 py-2.5 text-base font-medium transition-colors hover:border-indigo-400"
          onClick={() => setCount((c) => c + 1)}
          whileTap={{ scale: 0.95 }}
        >
          count is {count}
        </motion.button>
        <p className="text-zinc-400">
          Edit <code className="font-mono text-white">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>

      <p className="text-zinc-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
