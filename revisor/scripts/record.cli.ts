// revisor/scripts/record.cli.ts
// Uso: npm run record -- <ruta-json-runinput>
// Inserta una fila en agent_runs (Supabase) desde un descriptor RunInput en JSON.
// Espeja generador/scripts/record.cli.ts (linaje compartido bloque 3).
// Requiere SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (env local, nunca commiteadas).

import { readFileSync } from "node:fs";
import { buildRunRow, type RunInput } from "./run-record.ts";

async function main(): Promise<void> {
  const path = process.argv[2];
  if (!path) {
    console.error("Uso: npm run record -- <ruta-json-runinput>");
    process.exit(1);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const runInput = JSON.parse(readFileSync(path, "utf8")) as RunInput;
  const row = buildRunRow(runInput);

  if (!url || !key) {
    console.log("Sin credenciales — fila que se insertaría en agent_runs:");
    console.log(JSON.stringify(row, null, 2));
    return;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);
  const { error } = await supabase.from("agent_runs").insert(row);
  if (error) {
    console.error("Error insertando el run:", error.message);
    process.exit(1);
  }
  console.log(`Run registrado: agent=${row.agent} stage=${row.stage} status=${row.status}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
