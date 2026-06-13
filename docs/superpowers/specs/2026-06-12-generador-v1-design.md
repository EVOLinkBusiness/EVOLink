# Spec — Bloque 3: Agente Generador web (v1)

**Fecha:** 2026-06-12
**Estado:** aprobada en brainstorming (sesión Claude, decisiones confirmadas por Kravitzz)
**Destino en repo:** `docs/superpowers/specs/2026-06-12-generador-v1-design.md`
**Bloque:** `docs/bloques/3-generador/`
**Enfoque elegido:** B — Pipeline por etapas con artefactos intermedios

---

## 1. Objetivo

Dado el resultado de una auditoría (Bloque 2) y los datos del cliente, producir una web funcional con marca, rápida, sin enlaces rotos ni textos de relleno, y que no parezca plantilla — publicada en Cloudflare Pages tras aprobación humana. Orientado a volumen: cada web debe salir más rápida y mejor que la anterior gracias al catálogo de componentes.

## 2. Alcance v1

**Incluye:**
- Webs nuevas one-page y multipágina (3-5 páginas), según necesidad del cliente.
- Generación de marca básica (colores + tipografía + logo sencillo) si el cliente no la tiene.
- Fotos: las del cliente donde aporten + stock gratuito (Unsplash/Pexels) de relleno.
- Evaluación automática (script + modelo) con máximo 2 iteraciones antes del humano.
- Entrega: preview interno → aprobación socios → aprobación cliente → dominio definitivo.

**Fuera de v1 (decisión explícita):**
- Rediseños de webs existentes (incluido el piloto `mudanzasroy.es`) → v1.1 con `redesign-skill`.
- Generación de imágenes por IA (`image-to-code-skill`, `imagegen-frontend-web` quedan en reserva).
- Ejecución autónoma por API (el diseño por etapas deja la migración preparada para v2).
- Panel visual de seguimiento (el estado vive en los artefactos y en Supabase).

## 3. Modo de ejecución

**Claude Code orquestado (semi-manual).** Coste por web en v1: 0 € extra de API (cubierto por el plan Pro; solo tiempo de sesión). El contrato por etapas permite migrar etapas sueltas a la API Anthropic en v2 sin reescribir el bloque.

## 4. Arquitectura — pipeline de 6 etapas

Cada etapa produce un **artefacto versionado** que es la entrada de la siguiente. Reanudable en cualquier punto. Los artefactos de cada cliente viven en `clientes/<id-cliente>/` (estructura exacta a fijar en writing-plans, alineada con multi-tenant Supabase).

| # | Etapa | Quién la hace | Artefacto de salida |
|---|-------|---------------|---------------------|
| 1 | Brief | Modelo (lee auditoría + formulario cliente) | `brief.md` |
| 2 | Marca | Modelo + skill `brandkit` | `marca.json` |
| 3 | Plan de página | Modelo (compone catálogo + redacta textos) | `plan-pagina.json` |
| 4 | Construcción | **Script determinista** (ensambla Astro desde el plan) | sitio Astro compilable |
| 5 | Evaluación | Script (`playwright-cli` + Lighthouse) + modelo (rúbrica) | `informe-evaluacion.md` |
| 6 | Entrega | Script de deploy + humanos | URL preview → dominio |

**Principio rector (heredado del Auditor):** determinista primero, LLM solo para juicio. El modelo nunca escribe HTML/Astro directamente en la etapa 4: escribe el plan; el ensamblado es código normal y reproducible.

### Checkpoints humanos (decisión cerrada: brief/diseño + final)
- 🔵 **Checkpoint 1:** tras etapas 1 y 3 — se revisan juntos `brief.md` y `plan-pagina.json` (con textos). Nada se construye sin este OK.
- 🔵 **Checkpoint final:** tras etapa 5 — los socios revisan la web en preview antes de enseñarla al cliente. Nada llega al cliente sin OK de socios.

### Flujo de evaluación (etapa 5)
1. Pase de script: render móvil (375px) y escritorio, Lighthouse ≥ 90 móvil, cero enlaces rotos / mezcla de dominios, formulario envía y confirma (Resend), contraste AA, cero placeholders.
2. Pase de modelo: coherencia con `marca.json`, jerarquía visual, "no parece plantilla", textos naturales orientados al nicho.
3. Si suspende → el modelo corrige el `plan-pagina.json` (o el componente afectado) y se re-ensambla. **Máximo 2 iteraciones.**
4. Si tras la 2ª sigue suspendiendo → pasa al humano con `informe-evaluacion.md` detallando fallos pendientes. No se insiste automáticamente.

La rúbrica detallada es la ya existente: `docs/bloques/3-generador/rubrica.md` (compartida con el Bloque 4 — un solo documento, dos consumidores). Esta spec no la duplica.

## 5. Catálogo de componentes (activo del bloque)

- Carpeta propia de componentes Astro reutilizables: cabeceras, hero, servicios, testimonios, galería, CTA, formulario de contacto, pie — cada uno en 2-3 variantes visuales.
- La variedad entre webs nace de **combinar variantes distintas con marcas distintas**, no de generar estructura desde cero.
- **Catálogo mínimo v1:** lo suficiente para una one-page y una web de 3-5 páginas del nicho reformas. El inventario exacto de componentes y variantes se fija en writing-plans.
- Regla de crecimiento: si una web necesita un componente que no existe, se crea como pieza nueva del catálogo (reutilizable), nunca como código suelto de ese cliente.
- Tecnología: Astro + Tailwind (stack cerrado para webs de cliente).

## 6. Contrato del bloque

- **Entrada:** JSON `result` de la auditoría (Bloque 2) — que ya incorpora los datos del formulario de entrada del Auditor (ver anexo `2026-06-12-auditor-v1-anexo-entrada.md`) — + campos propios de web (preferencias de estilo, fotos del cliente; campos exactos en writing-plans del Generador).
- **Salida:** web publicada en Cloudflare Pages + artefactos de las 6 etapas + registro completo en `agent_runs`.
- **Registro (`agent_runs`):** un run por etapa (no un run gigante por web): inputs, outputs, tokens/coste (0 en v1 vía Claude Code, campo previsto para v2), duración, estado, flags. Es la materia prima del Bloque 7 (Mejora).

## 7. Skills del bloque (incluye poda — decisión de esta spec)

| Estado | Skill | Uso |
|--------|-------|-----|
| **CREAR** | `estilo-evolink` | Fusión de `taste-skill` + `soft-skill` + `minimalist-skill` en una sola voz de diseño. Las 3 originales se archivan tras la fusión. |
| **CREAR** | `generador-web` | Instrucciones operativas de las 6 etapas (la skill del propio bloque). |
| Mantener | `ui-ux-pro-max` | Motor de diseño en etapa 3. **En evaluación:** se revisan resultados de las primeras webs; si el catálogo + `estilo-evolink` lo cubren, se archivará. |
| Mantener | `gpt-tasteskill` | Macro-motion (scroll, GSAP) en componentes. **En evaluación** con el mismo criterio. |
| Mantener | `brandkit` | Etapa 2. |
| Mantener | `ui-animation` | Micro-interacciones en componentes. |
| Mantener | `playwright-cli`, `web-design-guidelines`, `verification-before-completion` | Etapa 5. |
| Reserva (no v1) | `redesign-skill` | Rediseños (v1.1). |
| Reserva (no v1) | `image-to-code-skill`, `imagegen-frontend-web` | Sin generación de imágenes en v1. |
| Reserva (no v1) | `output-skill` | Revisar en writing-plans si la entrega la cubre el script de deploy; si sí, archivar. |

El resultado de las evaluaciones (`ui-ux-pro-max`, `gpt-tasteskill`) se anota en `docs/bloques/3-generador/CHANGELOG.md` con el run que lo evidencie.

## 8. Ciclo de vida del documento ORDEN (regla de proyecto, aplica a todos los bloques)

1. La programación de cada agente se entrega en dos documentos: **esta spec** (permanente) + un **documento ORDEN** (instrucciones literales para Claude Code).
2. El ORDEN del Generador **solo se lee/ejecuta cuando el Bloque 2 (Auditor) esté terminado al 100%**. Su Fase 0 verifica esta precondición y aborta si no se cumple.
3. Al completarse la creación del agente (verificación final en verde), la última fase del ORDEN **borra el propio archivo ORDEN del repo** y hace commit. La spec permanece; git conserva el historial del ORDEN. Objetivo: evitar solape de archivos de instrucciones entre agentes.

## 9. Criterios de éxito de la v1

- Una web real del nicho reformas generada de extremo a extremo pasando los 2 checkpoints.
- Pase de script en verde (rúbrica medible completa) en ≤ 2 iteraciones.
- Tiempo total de sesión por web claramente inferior a hacerla a mano (objetivo orientativo: ≤ 1 jornada; se calibra con la primera web real).
- Catálogo v1 documentado y reutilizado en la segunda web sin crear piezas desde cero.

## 10. Decisiones cerradas en esta spec (trasladar a BUSINESS.md si procede)

1. Pipeline por etapas con artefactos intermedios (Enfoque B).
2. v1 en Claude Code; API en v2 por etapas.
3. Sistema de componentes propio en Astro (no generación libre, no plantillas fijas).
4. Marca básica generada si el cliente no la tiene (colores + tipografía + logo sencillo).
5. Fotos: cliente + stock gratuito; sin IA en v1.
6. Máximo 2 iteraciones automáticas de evaluación.
7. Entrega: preview interno → socios → cliente → dominio.
8. Consolidación taste → `estilo-evolink`; `ui-ux-pro-max` y `gpt-tasteskill` activas en evaluación.
9. Rediseños fuera de v1.
10. Regla de ciclo de vida del ORDEN (sección 8).
