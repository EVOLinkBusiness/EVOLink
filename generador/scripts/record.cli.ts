// generador/scripts/record.cli.ts
// Uso: npm run record -- <ruta-json-runinput>
// Inserta una fila en agent_runs (Supabase) desde un descriptor RunInput en JSON.
// Mismo patron que insertRun del Auditor. Requiere SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY (env local, nunca commiteadas).

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
  if (!url || !key) {
    console.error("Faltan credenciales: SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (env local).");
    process.exit(1);
  }

  const runInput = JSON.parse(readFileSync(path, "utf8")) as RunInput;
  const row = buildRunRow(runInput);

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
