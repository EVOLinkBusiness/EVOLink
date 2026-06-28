# Política de archivos `.md` — EVOLink

Se mide en LÍNEAS. El criterio del límite: lo que se lee en cada `/inicio` cuesta tokens en cada sesión; lo que se lee bajo demanda, no. De ahí tres cubos.

## Cubo A — se leen en cada `/inicio` → límite DURO
| Archivo | Límite | Cuándo se revisa |
|---------|--------|------------------|
| `CLAUDE.md` | 200 | al cambiar una regla + chequeo al cerrar cada bloque |
| `HANDOVER.md` | 200 (obj. <80) | se reescribe en cada `/cierre` |
| `ESTADO.md` (bloque activo) | ~80 | se reescribe en cada `/cierre` |
| `BLOQUE.md` (por bloque) | 200 | al cambiar el bloque |
| `CONTRATO.md` (por bloque) | ~120 | al cambiar entrada/salida; un test comprueba que Supabase lo cumple |
| `GUIA-DESARROLLO-BLOQUE.md` (por bloque) | ~150 | al cambiar el procedimiento del bloque |

Desborde → se extrae a `referencias/` (o `docs/contexto/<tema>.md`) dejando un enlace de una línea. Lo extraído se lee bajo demanda. `/cierre` avisa si un archivo del bloque activo supera su límite.

## Cubo B — bajo demanda → límite BLANDO + revisión por hitos
`docs/BUSINESS.md`, `docs/ROADMAP.md`, `README.md`, `referencias/*`. Aquí el riesgo es el desfase, no los tokens. Revisión de desfases en dos momentos que ya existen: cuando un bloque pasa de activo a terminado, y al cambiar de fase del ROADMAP.

## Cubo C — congelados → SIN límite, SIN revisión
specs, plans, ÓRDENES (se autoborran), `CHANGELOG.md` (solo se añade), documentos históricos. Si el contenido cambia, se escribe uno nuevo fechado; no se actualiza el viejo.

## ORDEN vs spec
Dos artefactos distintos del mismo flujo:
- **spec** — diseño permanente del **QUÉ**. Vive en `docs/superpowers/specs/` (nombre `AAAA-MM-DD-<tema>-design.md`). **No se borra**: es la fuente del diseño.
- **ORDEN** — guion de ejecución del **CÓMO/CUÁNDO**: pasos concretos para materializar una spec. Vive en la **raíz** y **se autoborra** al completarse (la spec permanece; git guarda el historial). Es cubo C.

La escribe el **planificador** tras aprobarse la spec; la ejecuta una **sesión nueva**. Regla mental: si describe el diseño, es spec; si es un checklist de ejecución desechable, es ORDEN.
