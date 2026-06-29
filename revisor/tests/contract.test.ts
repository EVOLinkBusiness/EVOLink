// revisor/tests/contract.test.ts
// Test ESTÁTICO de coincidencia de contrato: verifica que el esquema SQL de
// agent_runs admite todos los campos que el CONTRATO del bloque 4 requiere.
// Parsea el SQL sin red; SIN migración nueva.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Rutas relativas desde revisor/ hacia las migraciones
const MIGRATIONS_DIR = join(import.meta.dirname, "..", "..", "supabase", "migrations");

function readMigration(filename: string): string {
  return readFileSync(join(MIGRATIONS_DIR, filename), "utf8");
}

// Campos que el CONTRATO del bloque 4 (revisor) exige en agent_runs
const REQUIRED_FIELDS = [
  "agent",
  "client_id",
  "audit_id",
  "status",
  "input",
  "output",   // jsonb — añadido en 20260613000002
  "flags",    // jsonb — añadido en 20260613000002
  "tokens_in",
  "tokens_out",
  "cost",
  "duration_ms",
  "error",
] as const;

function extractAgentRunsColumns(sql: string): Set<string> {
  const columns = new Set<string>();

  // Detecta columnas en CREATE TABLE agent_runs (...)
  const createTableMatch = sql.match(
    /create\s+table\s+(?:public\.)?agent_runs\s*\(([^;]+?)\);/is
  );
  if (createTableMatch) {
    const body = createTableMatch[1];
    // Cada línea de columna empieza con un identificador (nombre de columna)
    for (const line of body.split("\n")) {
      const trimmed = line.trim();
      // Ignorar constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, INDEX)
      if (/^(primary|foreign|unique|check|index|create)/i.test(trimmed)) continue;
      if (trimmed === "") continue;
      // El primer token es el nombre de columna (sin comillas)
      const colMatch = trimmed.match(/^(\w+)\s+/);
      if (colMatch) columns.add(colMatch[1]);
    }
  }

  // Detecta bloques ALTER TABLE agent_runs ... ; (puede tener múltiples ADD COLUMN separadas por coma)
  // Captura todo el bloque entre "alter table ... agent_runs" y ";"
  const alterBlocks = sql.matchAll(
    /alter\s+table\s+(?:public\.)?agent_runs\b([^;]+);/gis
  );
  for (const block of alterBlocks) {
    const body = block[1];
    // Extrae cada "add column [if not exists] <nombre>"
    const addCols = body.matchAll(
      /add\s+column\s+(?:if\s+not\s+exists\s+)?(\w+)\s/gi
    );
    for (const col of addCols) {
      columns.add(col[1]);
    }
  }

  return columns;
}

describe("Contrato bloque 4 — campos agent_runs", () => {
  const schema1 = readMigration("20260611000001_schema.sql");
  const schema2 = readMigration("20260613000002_agent_runs_stage.sql");

  // Combinamos las columnas de ambas migraciones
  const allColumns = new Set([
    ...extractAgentRunsColumns(schema1),
    ...extractAgentRunsColumns(schema2),
  ]);

  for (const field of REQUIRED_FIELDS) {
    test(`agent_runs tiene columna '${field}'`, () => {
      assert.ok(
        allColumns.has(field),
        `Columna '${field}' no encontrada en agent_runs. Columnas detectadas: ${[...allColumns].join(", ")}`
      );
    });
  }
});
