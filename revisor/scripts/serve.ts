// revisor/scripts/serve.ts
// Levanta python -m http.server en un puerto libre sobre una carpeta local.
// Devuelve { url, stop } donde stop() mata el proceso SIEMPRE (éxito o error).
// El servidor queda apagado incluso si el caller falla (contrato del bloque 4).

import { spawn } from "node:child_process";
import { createServer } from "node:net";

export interface ServeHandle {
  /** URL base del servidor, p.ej. http://localhost:51234 */
  url: string;
  /** Mata el servidor. Seguro llamarlo varias veces (idempotente). */
  stop: () => Promise<void>;
}

/**
 * Resuelve un puerto TCP libre enlazando temporalmente en 0.0.0.0:0
 * y cerrando el socket inmediatamente.
 */
function findFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.listen(0, "127.0.0.1", () => {
      const address = srv.address();
      if (!address || typeof address === "string") {
        srv.close();
        return reject(new Error("No se pudo obtener el puerto libre"));
      }
      const port = address.port;
      srv.close(() => resolve(port));
    });
    srv.on("error", reject);
  });
}

/**
 * Arranca python -m http.server en un puerto libre sobre `dir`.
 * Espera hasta que el servidor responda antes de devolver el handle.
 */
export async function serveDir(dir: string): Promise<ServeHandle> {
  const port = await findFreePort();

  const proc = spawn("python", ["-m", "http.server", String(port)], {
    cwd: dir,
    stdio: ["ignore", "pipe", "pipe"],
    // En Windows, detached=false es lo correcto para poder matar el proceso hijo
  });

  // Construimos stop antes de esperar para garantizar teardown en cualquier caso
  let stopped = false;
  const stop = (): Promise<void> =>
    new Promise((resolve) => {
      if (stopped) return resolve();
      stopped = true;
      if (proc.exitCode !== null) return resolve(); // ya terminó
      proc.kill("SIGTERM");
      // En Windows SIGTERM puede no funcionar; usamos SIGKILL como respaldo
      const fallback = setTimeout(() => {
        try { proc.kill("SIGKILL"); } catch { /* ignorar */ }
      }, 500);
      proc.once("exit", () => {
        clearTimeout(fallback);
        resolve();
      });
    });

  // Espera a que el servidor esté listo (máx. 5 s)
  const url = `http://localhost:${port}`;
  const ready = await waitForServer(url, 5000).catch(async (err) => {
    await stop();
    throw err;
  });
  void ready; // solo nos importa que no haya lanzado

  return { url, stop };
}

/**
 * Sondea el servidor cada 100 ms hasta que responda o se agote el timeout.
 */
async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(300) });
      // Cualquier respuesta HTTP (incluso 404) significa que el servidor está vivo
      if (res.status >= 100) return;
    } catch (e) {
      lastError = e;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Servidor no listo en ${timeoutMs}ms: ${lastError}`);
}
