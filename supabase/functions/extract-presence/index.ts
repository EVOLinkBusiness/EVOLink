import { createClient } from "npm:@supabase/supabase-js@2";
import { type NarrativeClient, realClient } from "../_shared/llm.ts";
import { extractFromScreenshot, type ScreenshotImage } from "../_shared/intake/extract.ts";
import type { IntakeForm } from "../_shared/intake/form.ts";

// Precios Haiku 4.5 ($1/$5 MTok) — coste del run de visión para agent_runs.cost
const PRICE_IN = 1 / 1_000_000;
const PRICE_OUT = 5 / 1_000_000;

// Obligatorios del formulario (anexo §3). Una captura de Maps no aporta nicho ni
// zona de actuación: el humano los rellena antes de confirmar.
const REQUIRED: (keyof IntakeForm)[] = [
  "business_name",
  "niche",
  "service_area",
  "phone",
  "has_website",
  "has_maps_listing",
];

function missingRequired(form: Partial<IntakeForm>): string[] {
  return REQUIRED.filter((k) => {
    const v = form[k];
    if (typeof v === "boolean") return false; // presente
    return v == null || (typeof v === "string" && v.trim() === "");
  });
}

export interface Deps {
  llm: NarrativeClient;
  insertRun(row: Record<string, unknown>): Promise<void>;
}

// Lee la captura y devuelve un BORRADOR de formulario para que el humano lo
// confirme/corrija. NO escribe en clients: la escritura ocurre tras la
// confirmación humana (anexo §4). El scoring nunca ve la captura.
export async function handleExtractPresence(
  body: { images: ScreenshotImage[] },
  deps: Deps,
): Promise<{
  status: "draft" | "error";
  form: Partial<IntakeForm>;
  missing_required: string[];
  error?: string;
}> {
  if (!body.images || body.images.length === 0) {
    return { status: "error", form: {}, missing_required: REQUIRED, error: "images required" };
  }

  const t0 = Date.now();
  try {
    const { form, usage } = await extractFromScreenshot(deps.llm, body.images);
    await deps.insertRun({
      agent: "auditor_intake",
      status: "ok",
      input: { images: body.images.length },
      tokens_in: usage.input_tokens,
      tokens_out: usage.output_tokens,
      cost: usage.input_tokens * PRICE_IN + usage.output_tokens * PRICE_OUT,
      duration_ms: Date.now() - t0,
      error: null,
    });
    return { status: "draft", form, missing_required: missingRequired(form) };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await deps.insertRun({
      agent: "auditor_intake",
      status: "error",
      input: { images: body.images.length },
      tokens_in: 0,
      tokens_out: 0,
      cost: 0,
      duration_ms: Date.now() - t0,
      error: message,
    });
    return { status: "error", form: {}, missing_required: REQUIRED, error: message };
  }
}

// --- Entry point real (no se ejecuta en tests) ---
if (import.meta.main) {
  Deno.serve(async (req) => {
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      const deps: Deps = {
        llm: realClient(Deno.env.get("ANTHROPIC_API_KEY")!),
        insertRun: async (row) => {
          const { error } = await supabase.from("agent_runs").insert(row);
          if (error) throw error;
        },
      };
      const body = await req.json();
      if (!Array.isArray(body?.images) || body.images.length === 0) {
        return new Response(JSON.stringify({ error: "images required" }), { status: 400 });
      }
      const out = await handleExtractPresence(body, deps);
      const status = out.status === "error" ? 502 : 200;
      return new Response(JSON.stringify(out), {
        status,
        headers: { "content-type": "application/json" },
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e instanceof Error ? e.message : "internal error" }),
        { status: 500 },
      );
    }
  });
}
