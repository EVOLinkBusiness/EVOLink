# Referencia — Flujo de previews dinámico (8-12)

Desde v4 las previews **NO salen de slots fijos**: salen de la **decisión del `director-arte`** (skill cerebro). El director lee el brief + `memoria-director-arte.md` + `indice-referencias.md`, fija los 7 diales por cliente y compone un **set dinámico de 8-12 previews** (mínimo 8, hasta 12 según riqueza del brief), **sin que dos compartan referencia, género de layout ni par tipográfico**. Cada preview ancla sus **roles de referencia** (estructura de una, motion de otra) y su selección de **primitivas P1-P6**. El reparto histórico "12 = 6+6 por slot" está al final como nota histórica (es justo lo que v4 elimina).

## Reglas permanentes del bloque (OBLIGATORIAS)

### 1 · Trazabilidad — `.prompt.txt` por preview
Cada preview lleva su `<nombre>.prompt.txt` con el **prompt exacto** que la generó, junto al HTML en `clientes/<id>/previews/`. El mismo texto del `.txt` es el que se ejecuta para generar el HTML (prompt y HTML emparejados 1:1). Aplica también retroactivamente a las previews 1-6.

### 2 · Estructura de prompt obligatoria — esquema de 4 partes
Toda web generada (todas las previews y la web final) usa este esqueleto fijo con sus 4 partes. Sumar/quitar detalle = decidir en qué parte entra y por qué, sin romper el esqueleto.

```
/*1 · Qué web + para qué cliente + dirección visual (con skill de estilo)*/
Crea [tipo de web de una sola página] para [negocio real del brief].
Antes de empezar, usa la skill "[frontend-design | gpt-tasteskill]" para definir [dirección visual concreta del sector y tono].

/*2 · Qué skills se van a usar*/
Usa también estas skills:
[lista explícita]

/*3 · Qué debe incluir la web*/
La web debe incluir:
- [sección + su animación concreta]
- ...

/*4 · Requisitos de elaboración correcta*/
Requisitos:
- Todo en una sola página
- [estética específica]
- Interacciones fluidas y reales  ← SIEMPRE OBLIGATORIO
- Código comentado indicando las técnicas importantes
- [estándar EVOLink: mobile-first AA, prefers-reduced-motion, placeholders honestos de logo/foto reales]
```

---

## Cómo se compone el set (sustituye al reparto por slot)

1. **Dirección de arte primero.** Corre la skill `director-arte` → `clientes/<id>/direccion-arte.md`: Design Read, 7 diales, conceptos, **rechazos explícitos** (aquí muere el cubo) y el **plan dinámico de previews** (cuántas y qué es cada una). Nada se genera antes de esto.
2. **Selección de referencias por roles** (no un ancla monolítica). El director lee el `indice-referencias.md` (fuente de verdad; no se navegan galerías), pre-filtra por perfil/sector/forma de contenido/rendimiento, y puntúa las finalistas **sobre los tokens reales** (pesos en `director-arte §5`). *Premiado ≠ profesor:* Awwwards aporta motion/pulido/tipografía; el negocio local real, estructura.
3. **Vocabulario de motion — primitivas P1-P6** (detalle en `director-arte §6` / spec §5). Cada preview combina una selección coherente; la variedad del set nace de selecciones distintas. **Scroll reversible obligatorio** (P1 + P2, visible al subir y bajar). P4 (microinteracciones en botones) en todas. Solo `transform`/`opacity`; `prefers-reduced-motion`; **Lighthouse ≥ 90 bloquea**.
4. **Nivel de motion 1-5** por cliente (`estilo-evolink §7`, lo fija el director): sobrio para confianza pura, espectáculo solo cuando el sector lo pide. Invariantes trust-first intactos en todo el espectro.
5. **Generar 8-12**, cada una con su `.prompt.txt` (regla 1) y su esquema de 4 partes (regla 2), anclando los roles de referencia y las primitivas decididas.

## Pertinencia (regla dura)
Todas deben tener sentido para el sector del cliente. El brief del auditor manda: una mudanza → confianza, claridad, prueba social; nunca layouts pensados para mil fotos de moda, nunca 3D decorativo. Cada motor/primitiva que no sirva a la intención se **rechaza con motivo** (el director lo documenta).

## Diagnóstico automático (anti-slop)
Antes de servir, pasar el detector local de impeccable sobre la carpeta de previews:
`node .claude/skills/impeccable/scripts/detect.mjs --json <previews>/*.html`.
Objetivo: **0 hallazgos graves** (gradient text, AI-purple, glass por defecto, eyebrows en cada sección, fuentes sobreusadas, marcadores 01/02/03 decorativos) y 0 mojibake. Corregir antes de la revisión humana.

## Render y revisión
Servir en local (gratis): `python -m http.server` sobre la carpeta de previews. Revisión por URL local. Cero coste de despliegue.

## Variantes mixtas
Como es HTML, mezclar es trivial: se pasa al agente el HTML de la base elegida + el bloque concreto (p. ej. la animación) de otra preview. Ej.: "preview 2 con las animaciones de la preview 5". La mezcla por roles ya está prevista desde el diseño (estructura de una, motion de otra).

## Verificación de referencias
Tras generar, `playwright-cli` captura preview vs referencia ancla, lado a lado, para confirmar que se capturó el "idioma" (no el píxel). Reglas duras de IP: mezclar ≥2 referencias o abstraer a tokens, nunca clon reconocible.

## Ascenso a producción (solo la elegida)
La preview elegida sube a **Astro + Tailwind + islas React** sobre **Cloudflare Pages**. Procedimiento completo en `ascenso-produccion.md` (no se recalcula el estilo: se reutilizan tokens/DESIGN.md; animaciones portadas a islas con `gsap-react`; self-host de fuentes; QA + Lighthouse ≥ 90 móvil; OK de Kravitzz).

## Modelos por paso (coste)
- Previews: Sonnet. · Web final (ascenso): Opus. · QA/mecánico: Haiku. · Prompt caching del system + brief + skills.

---

## Nota histórica (reparto por slot, eliminado en v4)
Hasta v4 el set se repartía por **slot fijo** y eso *predeterminaba el motor por posición*, no por cliente — el origen del "cubo 3D en una mudanza" (slot 11-12 obligaba a Three.js). Reparto histórico, ya no vigente:
- **12 = 6 diseño + 6 GSAP** (17/06/2026): 1-3 propias (despensa) · 4-6 lapa.ninja · 7-8 frontend-design · 9-10 gpt-tasteskill · 11-12 Three.js.
- Evolución previa: 8 = 5 propias + 1 URL + 2 Stitch → 9 = 3+3+3 (16/06/2026) → Stitch descartado (dependencia frágil), pivote a GSAP+Three.js → 12 = 6+6 (17/06/2026).
El fallo de raíz y su corrección están en `auditoria-diseno-v4.md` y `director-arte`.
