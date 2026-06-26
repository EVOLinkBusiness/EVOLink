---
name: añadir-referencia
description: Añade una nueva web de referencia al índice del Generador EVOLink. Usar siempre que el usuario pase una URL concreta para añadirla como referencia visual (de Awwwards, lapa.ninja, negocio local, o cualquier web con buen diseño). Ejecuta la extracción de ADN, genera la ficha del índice automáticamente y guía el commit. Activar con frases como "añade esta referencia", "extrae el ADN de esta web", "quiero guardar esta web como referencia", "añade esta URL al índice", o cuando el usuario pegue una URL pidiendo guardarla.
---

# Skill — Añadir referencia al índice del Generador

## Qué hace
Dado una URL, extrae el ADN visual de la web, genera la ficha lista para el índice y guía el commit. El usuario no necesita saber qué campos rellenar.

## Cuándo NO usar
- Si la URL ya existe en `indice-referencias.md` → avisar y parar.
- Si la web requiere login o no es pública → avisar y parar.

---

## Paso 1 — Verificar que no existe ya

```bash
grep -i "<nombre-corto>" docs/bloques/3-generador/referencias/indice-referencias.md
```

Si hay resultado → decir "Ya existe en el índice" y mostrar la fila. Parar.

---

## Paso 2 — Extraer ADN visual (motion + feel)

Sustituye `<nombre>` por un identificador corto: minúsculas, guiones, sin espacios.
Ejemplos: `mudanzas-martinez`, `reformas-madrid`, `awwwards-bold`, `barberia-premium`.

```bash
npx skillui@latest --url <URL> --mode ultra --out .claude/skills/referencias-visuales/<nombre>
```

Si crea `.agents/` o `skills-lock.json`, limpiar:
```bash
rm -rf .agents/ skills-lock.json
```

---

## Paso 3 — Extraer tokens estructurados (color / espaciado / radio)

```bash
npx extract-design-system <URL>
cp -r .extract-design-system/ .claude/skills/referencias-visuales/<nombre>/tokens/
rm -rf .extract-design-system/
```

---

## Paso 4 — Leer el ADN extraído y generar la ficha

Lee estos archivos:
- `.claude/skills/referencias-visuales/<nombre>/DESIGN.md` (o el archivo principal generado por skillui)
- `.claude/skills/referencias-visuales/<nombre>/tokens/normalized.json` (si existe)

Con esa información, deduce y genera la fila para el índice:

```
| <nombre> | <fuente> | <perfil> | <roles> | <mood> | <motion> | <tipo> | OK | referencias-visuales/<nombre> |
```

### Valores válidos por campo

**fuente:**
- `web real` — negocio real en producción
- `awwwards` — nominada o ganadora de Awwwards
- `despensa` — referencia premium (Stripe, Linear, etc.)

**perfil** (uno o varios):
- `confianza-servicio` — mudanzas, reformas, fontaneros, asesorías
- `servicios-local-premium` — peluquerías, clínicas, talleres, gimnasios
- `editorial` — artesanos, restaurantes con relato, estudios, hoteles rurales
- `minimal-lujo` — joyería, interiorismo alto, inmobiliaria premium
- `kinetico-agency-bold` — fitness, estudios creativos, eventos, marcas con carácter
- `inmersivo-3d` — producto físico premium, experiencias, tech-local

**roles** (uno o varios — lo que enseña esta referencia):
- `estructura` — composición, layout, jerarquía de secciones
- `color-mood` — paleta, temperatura, contraste
- `motion` — animaciones, transiciones, ritmo
- `tipografia` — pares tipográficos, escala, jerarquía de texto

**mood:**
- `claro` · `oscuro` · `cálido` · `neutro`

**motion (1-5):**
- 1 = sin animación · 2 = sutil · 3 = moderado · 4 = expresivo · 5 = espectáculo

**tipo:**
- `estructura` — la maqueta funciona con el contenido del cliente (fotos, texto real)
- `solo-idioma` — aporta lenguaje visual pero su contenido no es portable (WebGL pesado, 30 fotos de producto, etc.)

### Regla de tipo
Si el valor principal de la web es una experiencia WebGL pesada o asume contenido que el cliente no tendrá → `solo-idioma`. Si su layout y secciones funcionan con 5 fotos + logo + texto → `estructura`.

### Presentar la ficha al usuario

Mostrar la fila generada y una justificación breve (2-3 líneas) de por qué se eligió cada campo. Ejemplo:

```
Ficha generada:
| awwwards-corporativo | awwwards | confianza-servicio | estructura, motion | claro | 3 | estructura | OK | referencias-visuales/awwwards-corporativo |

Justificación:
- Perfil: layout de grid ordenado con stats y CTA prominente, encaja con mudanzas/reformas.
- Roles: aporta tanto estructura (sus secciones son portables) como motion (reveals con scrub).
- Motion 3: animaciones moderadas, pertinentes, sin exceso.
- Tipo estructura: funciona con 5 fotos + logo + texto real.
```

Pedir confirmación: "¿La ficha es correcta o ajusto algún campo?"

---

## Paso 5 — Escribir la ficha en el índice

Tras confirmación, añadir la fila al final de la tabla "Inventario admitido" en:
`docs/bloques/3-generador/referencias/indice-referencias.md`

---

## Paso 6 — Commit y push

```bash
git add .claude/skills/referencias-visuales/<nombre>/ \
        docs/bloques/3-generador/referencias/indice-referencias.md
git commit -m "feat: referencia <nombre> al indice (perfil: <perfil>)"
git push
```

Confirmar con el hash del commit.

---

## Resumen del flujo

```
URL recibida
    ↓
¿Ya existe? → sí → parar
    ↓ no
Paso 2: skillui extrae ADN visual
Paso 3: extract-design-system extrae tokens
Paso 4: leer ADN → generar ficha → mostrar al usuario → confirmar
Paso 5: escribir fila en indice-referencias.md
Paso 6: git add + commit + push
```
