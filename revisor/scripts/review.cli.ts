// revisor/scripts/review.cli.ts
// Uso: npm run review -- <ruta-preview-html>
// Ejecuta review() sobre la preview indicada, imprime el veredicto, y
// (si hay credenciales en env) inserta la fila en agent_runs; si no, la imprime.

import { review } from "./review.ts";

async function main(): Promise<void> {
  const previewPath = process.argv[2];
  if (!previewPath) {
    console.error("Uso: npm run review -- <ruta-preview-html>");
    process.exit(1);
  }

  console.log(`Revisando: ${previewPath}`);
  const result = await review(previewPath);

  const { output, row } = result;

  // Imprime veredicto
  console.log(`\nVEREDICTO: ${output.verdict.toUpperCase()}`);
  console.log(`Summary: ${output.summary}`);

  if (output.findings.length > 0) {
    console.log("\nHallazgos:");
    for (const f of output.findings) {
      const icon = f.severity === "grave" ? "[GRAVE]" : "[WARN]";
      console.log(`  ${icon} [${f.check}] ${f.detail}`);
      if (f.evidence) console.log(`         evidencia: ${f.evidence}`);
    }
  } else {
    console.log("\nSin hallazgos.");
  }

  if (output.screenshots.length > 0) {
    console.log(`\nCapturas: ${output.screenshots.join(", ")}`);
  }

  // Insert en Supabase o impresión de la fila
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("agent_runs").insert(row);
    if (error) {
      console.error(`\nError insertando en agent_runs: ${error.message}`);
      process.exit(1);
    }
    console.log(`\nFila insertada en agent_runs: agent=${row.agent} status=${row.status}`);
  } else {
    console.log("\nSin credenciales Supabase — fila que se insertaría:");
    console.log(JSON.stringify(row, null, 2));
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
