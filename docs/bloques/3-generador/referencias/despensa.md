# Referencia — La Despensa (ADN visual reutilizable)

## Qué es
Una biblioteca de "ingredientes" de diseño extraídos de webs premium reales. NO son plantillas: son sistemas de diseño (paleta, tipos, ritmo, animaciones) que impeccable elige y combina según el cliente. Vive en `.claude/skills/referencias-visuales/`.

## Cómo se construye (una vez, coste 0 tokens)
Por cada web de referencia:
```bash
npx skillui@latest --url https://ejemplo-premium.com --mode ultra --out .claude/skills/referencias-visuales/<nombre>
```
Aplanar igual que cualquier skill (carpeta real, sin symlinks; borrar `.agents/` y `skills-lock.json` si aparecen).

## Categorías sugeridas (perfiles, no marcas)
- **corporativo-confianza** — servicios serios, fiables (mudanzas, reformas, asesorías).
- **servicios-local** — negocio de barrio con buena presencia.
- **minimal-lujo** — premium, espaciado generoso.
- **editorial** — mucho texto/imagen ordenada.

Mantén 1-2 referencias por categoría. Empieza con pocas (YAGNI) y amplía cuando un cliente lo pida.

## Cómo la usa el generador
En la Fase 1, impeccable lee el brief del auditor y selecciona la(s) categoría(s) que encajan con el sector. Descarta las que no pegan (p. ej. nunca "editorial-moda" para una reforma).

## Cómo ampliar
Añadir webs es solo repetir el comando `npx skillui` con otra URL. La curación (qué webs entran) es decisión humana de los socios.
