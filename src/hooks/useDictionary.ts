import { useEffect, useRef, useState } from "react";
import initSqlJs, { type Database } from "sql.js";

// sql.js needs the WASM binary — point it at the CDN build matching our version
const SQL_WASM_URL = "https://sql.js.org/dist/sql-wasm.wasm";

export function useDictionary() {
  const dbRef = useRef<Database | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const SQL = await initSqlJs({ locateFile: () => SQL_WASM_URL });
      const response = await fetch("/dictionary.db");
      const buffer = await response.arrayBuffer();
      const db = new SQL.Database(new Uint8Array(buffer));

      if (!cancelled) {
        dbRef.current = db;
        setReady(true);
      } else {
        db.close();
      }
    }

    load();

    return () => {
      cancelled = true;
      dbRef.current?.close();
      dbRef.current = null;
    };
  }, []);

  function isValidWord(word: string): boolean {
    if (!dbRef.current || word.length < 2) return false;

    const stmt = dbRef.current.prepare(
      "SELECT 1 FROM dictionary WHERE word = ? LIMIT 1",
    );
    stmt.bind([word.toUpperCase()]);
    const found = stmt.step();
    stmt.free();

    return found;
  }

  return { ready, isValidWord };
}
