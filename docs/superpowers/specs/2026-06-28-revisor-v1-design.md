# Spec de diseño — Agente Revisor/QA v1 (bloque 4)

**Fecha:** 2026-06-28
**Estado:** diseño aprobado por el humano (HARD-GATE superado). El siguiente artefacto es la ORDEN de ejecución (`2026-06-28-ORDEN-bloque-revisor-v1.md`, raíz).
**Subsistema:** Revisor/QA (bloque 4). **Depende del bloque 3 (Generador).**
**Fase roadmap:** piloto del esqueleto de agentes (primer bloque de ingeniería construido de cero con los 3 agentes de desarrollo).

---

## 1. Contexto y objetivo

El bloque 4 es el **Revisor/QA** de EVOLink: dado el sitio que produce el Generador (bloque 3), busca fallos objetivos antes de que una web llegue al cliente. Es el rol de **Supervisión** del tejido de agentes.

Doble objetivo:
1. **Producto:** un pase de QA reproducible que dé un veredicto (apta / rechazada) sobre una preview generada, con hallazgos clasificados por gravedad.
2. **Piloto del esqueleto:** es el primer bloque construido de cero con los 3 agentes de desarrollo (planificador → programador → verificador) y estrena el `CONTRATO.md` entre dos bloques (Generador→Revisor) sobre un caso real.

**Regla núcleo:** *determinista primero, LLM solo para juicio.* El script decide los HECHOS (¿hay un enlace roto? ¿el contraste pasa AA?); el LLM solo clasifica lo ambiguo y redacta la comunicación al humano. El LLM NUNCA decide un hecho GRAVE.

---

## 2. Alcance v1

**Entra (función QA de la preview del bloque 3):**
- **Entrada LOCAL autocontenida:** el Revisor recibe la ruta a una preview HTML en disco, levanta él mismo `python -m http.server` en un puerto libre, corre la suite contra `http://localhost:<puerto>` y apaga el servidor al terminar.
- **Suite QA núcleo determinista** (§4): enlaces internos/externos + mezcla de dominios + responsive 375px/desktop + contraste AA + cero placeholders + anti-slop (`impeccable`) + Lighthouse (como WARNING).
- **Veredicto estructurado** escrito en `agent_runs.output` (jsonb) + capturas en disco (§5).
- **Caso piloto:** preview v4 de Mudanzas Roy (§7).

**NO entra (diferido a v2, queda DISEÑADO en el CONTRATO):**
- **Gancho de upsell** (auditar webs ajenas vivas con `seo-audit` → alimentar al bloque 1): otra entrada (web viva, no preview en disco) y otro consumidor (bloque 1, aún sin construir).
- **Formulario de contacto + Resend:** la preview local no tiene backend de envío → falso negativo garantizado. Se revisa cuando la entrada sea URL pública desplegada.
- **Check de motion** (solo `transform`/`opacity`, scroll reversible, `prefers-reduced-motion`): requiere instrumentar scroll; es el check más caro. Diferido.
- **Tabla `reviews` propia** y migraciones nuevas: v1 reutiliza `agent_runs`. YAGNI hasta que el bloque 6 necesite históricos de revisión.
- **Lighthouse como GRAVE:** en `localhost` los números no son representativos (sin CDN ni red real). En v1 es WARNING; el umbral ≥90 GRAVE se activa cuando la entrada sea URL pública.

---

## 3. Arquitectura

```
[Orquestador / sesión]
   │ ruta de la preview (clientes/<uuid>/previews/v4/v4-N.html)
   v
[Revisor v1]
   1. levanta `python -m http.server` en puerto libre sobre la carpeta de la preview
   2. playwright-cli → navega http://localhost:<puerto>/v4-N.html
        · enlaces (internos/externos rotos + mezcla de dominios)
        · responsive: render 375px y desktop (+ capturas)
        · contraste AA (impeccable engine contraste)
        · placeholders (lorem ipsum / texto de relleno)
        · anti-slop: impeccable detect (engines static-html, browser)
        · Lighthouse (informativo → WARNING)
   3. agrega hallazgos → clasifica GRAVE/WARNING (determinista; LLM solo lo ambiguo)
   4. compone veredicto + apaga el servidor
   5. escribe fila en agent_runs (agent='revisor', output jsonb, capturas en disco)
```

- **Determinista primero:** pasos 1-2 los hace el código (Playwright + impeccable + Lighthouse CLI). El LLM (paso 3) solo interviene para clasificar hallazgos ambiguos y redactar el mensaje legible; los GRAVE deterministas no pasan por él.
- **Herramientas (todas locales, sin instalación global):**
  - `playwright-cli` — `.claude/skills/playwright-cli/`
  - `impeccable` — `.claude/skills/impeccable/scripts/detect.mjs` + `scripts/detector/` (engines `static-html`, `browser`, `contraste`)
  - Lighthouse — vía CLI/playwright.

---

## 4. Suite de checks (v1) y clasificación

| # | Check | Motor | Severidad si falla |
|---|-------|-------|--------------------|
| 1 | Enlaces internos/externos rotos | playwright-cli (red) | **GRAVE** |
| 2 | Mezcla de dominios (.com/.es) / URL malformada | playwright-cli + regla de dominio canónico | **GRAVE** |
| 3 | Contraste AA en textos principales | impeccable (engine `contraste`) | **GRAVE** |
| 4 | Placeholder visible (lorem ipsum / texto de relleno) | impeccable / regla de texto | **GRAVE** |
| 5 | Render correcto 375px (móvil) | playwright-cli (viewport + captura) | WARNING (overflow/roto → revisión humana) |
| 6 | Render correcto desktop | playwright-cli (viewport + captura) | WARNING |
| 7 | Anti-slop ("AI slop") | impeccable detect (static-html, browser) | WARNING |
| 8 | Lighthouse performance (móvil) | Lighthouse CLI | WARNING (en local no es representativo) |

**Regla de veredicto (determinista):**
- **≥1 GRAVE** (checks 1-4) → **veredicto = `rejected`**, `agent_runs.status = 'error'`, motivo en `flags`. La web NO se publica.
- **0 GRAVE, con WARNINGs** → **veredicto = `pass_with_warnings`**, `status = 'ok'`. Las WARNINGs van en `output` para juicio humano.
- **0 GRAVE, 0 WARNING** → **veredicto = `pass`**, `status = 'ok'`.

**Rúbrica:** se reutiliza `docs/bloques/3-generador/rubrica.md`, sección «Comprueba SCRIPT». NO se crea rúbrica propia. Si surgiera un check exclusivo de webs vivas (p.ej. dominio canónico/redirecciones que no aplican a una preview en disco), se añade allí con nota "aplica a bloque 4".

**Rol del LLM (acotado):** clasificar como GRAVE o WARNING los hallazgos que el script marque como ambiguos (no los de checks 1-4, que son deterministas) y redactar el resumen humano del veredicto. No genera métricas ni decide los GRAVE.

---

## 5. Formato del veredicto (output jsonb)

Estructura propuesta de `agent_runs.output` para una revisión (forma de referencia; se afina en TDD):

```jsonc
{
  "verdict": "pass" | "pass_with_warnings" | "rejected",
  "target": {
    "form": "local",                       // "local" (v1) | "public" (v2)
    "path": "clientes/<uuid>/previews/v4/v4-1.html",
    "served_url": "http://localhost:<puerto>/v4-1.html"
  },
  "findings": [
    {
      "check": "links",                    // links | domains | contrast | placeholders | responsive | slop | lighthouse
      "severity": "grave" | "warning",
      "detail": "enlace roto: http://mudanzasroy.com/... (404)",
      "evidence": "previews-qa/<run>/links.json"   // o ruta a captura
    }
  ],
  "screenshots": [
    "previews-qa/<run>/mobile-375.png",
    "previews-qa/<run>/desktop.png"
  ],
  "summary": "Texto breve redactado por el LLM para el humano."
}
```

- **Capturas:** se guardan en disco (carpeta de trabajo del run, p.ej. `previews-qa/<run>/`), y `output.screenshots` referencia las rutas. `clientes/` está gitignored; las capturas viven en disco local, no se commitean.
- **Registro:** una fila por pase de revisión en `agent_runs` con `agent='revisor'`, `client_id`, `audit_id`, `status`, `input` (jsonb: forma + ruta), `output` (el objeto de arriba), `tokens_in`, `tokens_out`, `cost`, `flags` (motivo del rechazo si GRAVE).

---

## 6. Errores y guardarraíles

- **Fallo de ejecución del Revisor** (Playwright no arranca, `http.server` no levanta, puerto ocupado) → `agent_runs.status = 'error'` con el error técnico en `flags`; NO se confunde con un rechazo de la web (que también es `status='error'` pero con `verdict='rejected'` en `output`). El campo que distingue es `output.verdict`.
- **Servidor siempre se apaga** al terminar (éxito o error): el Revisor es autocontenido y no deja procesos colgados.
- **El Revisor solo INSPECCIONA:** no genera ni corrige la web (frontera dura con el bloque 3). Sus hallazgos son la señal de mejora más directa para el bloque 3, pero la corrección la hace el 3.
- **Claves server-side:** la API de Anthropic (juicio del LLM) y el service role de Supabase nunca en cliente.
- **Determinista primero:** ningún GRAVE depende del LLM.

---

## 7. Caso piloto — Mudanzas Roy

- **Cliente:** Mudanzas Roy. **UUID:** `cb1dfbea-7306-4c1e-bdde-b5d606243083`.
- **Previews v4:** `clientes/cb1dfbea-7306-4c1e-bdde-b5d606243083/previews/v4/v4-1.html` … `v4-8.html` (8 conceptos). Imágenes en `previews/img/`.
- **Artefactos del bloque 3 disponibles** (junto a `previews/`): `brief.md`, `audit-result.json`, `audit-meta.json`, `direccion-arte.md`, `marca.json`, `plan-pagina.json`, `recomendacion.md`, `informe-evaluacion.md`.
- **Cruce opcional:** el Revisor PUEDE contrastar hallazgos contra `plan-pagina.json` (p.ej. secciones esperadas) si aporta, pero **no es obligatorio en v1**.
- **Caso de fallo conocido (mudanzasroy.es real):** enlaces internos rotos mezclando `.com`/`.es` + URL malformada. **Criterio de éxito del piloto:** la suite detecta este tipo de fallo (checks 1-2) como **GRAVE**. Si una preview v4 está limpia, el veredicto correcto es `pass`/`pass_with_warnings`; el piloto valida que la maquinaria clasifica bien en ambos sentidos, no que toda preview falle.
- **Nota:** `clientes/` está gitignored; el piloto trabaja sobre disco local. La ORDEN no commitea previews.

---

## 8. Testing (lo ejecuta la ORDEN, no esta sesión)

- **TDD de los checkers deterministas** (funciones puras donde sea posible): dado un HTML/red de prueba con un enlace roto / mezcla de dominios / fallo de contraste / placeholder → el checker devuelve el hallazgo GRAVE esperado; dado un HTML limpio → cero GRAVE.
- **Regla de veredicto** como función pura: lista de hallazgos → `verdict` esperado (`rejected` con ≥1 GRAVE, etc.).
- **Forma del `output` jsonb** y de la fila `agent_runs` (con LLM mockeado para el resumen): asserts de estructura.
- **E2E ligero sobre el caso piloto:** levantar server sobre una preview v4 de Mudanzas Roy → correr la suite → obtener un veredicto y una fila en `agent_runs`; el servidor queda apagado.

---

## 9. Criterios de éxito del bloque

- La suite QA corre sobre una preview v4 local de Mudanzas Roy servida por `http.server` y produce un **veredicto reproducible** con su fila en `agent_runs`.
- Los checks 1-4 son **deterministas** (cero dependencia del LLM para los GRAVE).
- El piloto detecta enlaces rotos / mezcla de dominios como **GRAVE** cuando existen, y NO marca GRAVE falsos en una preview limpia.
- El servidor `http.server` siempre queda apagado.
- Veredicto del verificador = aprobado (cumple-spec y calidad).
- Cero migraciones nuevas; cero tabla `reviews`; reutiliza `agent_runs`.

---

## 10. Diferido / siguientes ciclos (v2+)

- Entrada **URL pública** desplegada (Cloudflare/Vercel) → Lighthouse ≥90 como GRAVE.
- **Formulario + Resend** (con backend real).
- **Check de motion** (transform/opacity, scroll reversible, prefers-reduced-motion).
- **Gancho de upsell** de webs ajenas (`seo-audit` → bloque 1).
- Persistencia dedicada (`reviews`) si el bloque 6 (mantenimiento) necesita históricos/consultas.
- Realimentación al bloque 3 (sus hallazgos mejoran el Generador) y al bloque 7 (minado de `agent_runs`).

---

## Auto-revisión

- **Sin placeholders:** UUID, rutas, herramientas y caso piloto son reales; los `<puerto>`/`<run>`/`<uuid>` son variables de runtime, no huecos sin decidir.
- **Consistencia:** "determinista primero" se respeta en §4 (GRAVE = checks 1-4 sin LLM) y §6. Alcance v1 vs diferido coherente con las decisiones cerradas. Reutiliza rúbrica y `agent_runs` (cero archivos/tablas nuevos).
- **Ambigüedad residual:** la forma exacta del `output` jsonb y los nombres de carpeta de capturas se cierran en TDD; no afecta al diseño. El cruce contra `plan-pagina.json` queda explícitamente opcional en v1.
