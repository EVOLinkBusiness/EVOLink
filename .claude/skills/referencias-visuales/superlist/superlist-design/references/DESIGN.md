# superlist DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 6
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: subtle

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![superlist Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a neutral, approachable feel. The light background emphasizes content clarity. Typography uses **Jersey 10** throughout — a technical, developer-focused choice that maintains consistency. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The accent color **#f739f7** anchors interactive elements (buttons, links, focus rings). Motion is subtle — smooth transitions (150-300ms) ease state changes without drawing attention.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| framer-link-hover-text-color | `#f7f7ff` | background | Page background, darkest surface |
| surface | `#eeeeee` | surface | Card and panel backgrounds |
| framer-text-color | `#000000` | text-primary | Headings and body text |
| framer-link-current-text-color | `#8e8da0` | text-muted | Captions, placeholders, secondary info |
| accent | `#f739f7` | accent | CTAs, links, focus rings, active states |
| danger | `#ff4a36` | danger | Error states, destructive actions |
| success | `#22c55e` | success | Success states, positive indicators |
| warning | `#fbe74e` | warning | Warning states, caution indicators |
| framer-link-text-color | `#0099ff` | info | Informational highlights |
| unknown | `#191c2b` | unknown | Palette color |
| unknown | `#6b66da` | unknown | Palette color |
| unknown | `#696f81` | unknown | Palette color |
| unknown | `#2590f1` | unknown | Palette color |
| unknown | `#f866db` | unknown | Palette color |
| unknown | `#8f89fa` | unknown | Palette color |
| unknown | `#26253b` | unknown | Palette color |
| unknown | `#413f73` | unknown | Palette color |
| unknown | `#33b887` | unknown | Palette color |
| unknown | `#7577e0` | unknown | Palette color |
| unknown | `#363955` | unknown | Palette color |

### CSS Variable Tokens

```css
--framer-text-background-color: initial;
--framer-text-background-radius: initial;
--framer-text-background-corner-shape: initial;
--framer-text-background-padding: initial;
--framer-text-background-color: initial;
--framer-text-background-radius: initial;
--framer-text-background-corner-shape: initial;
--framer-text-background-padding: initial;
--framer-text-background-color: initial;
--framer-text-background-radius: initial;
--framer-text-background-corner-shape: initial;
--framer-text-background-padding: initial;
--border-bottom-width: 1.5px;
--border-left-width: 1.5px;
--border-right-width: 1.5px;
--border-style: solid;
--border-top-width: 1.5px;
--framer-text-background-color: initial;
--framer-text-background-radius: initial;
--framer-text-background-corner-shape: initial;
```


---

## 3. Typography Rules

**Font Stack:**
- **Jersey 10** — Heading 1, Heading 2, Heading 3
- **Fragment Mono** — Body, Caption, Code

**Font Sources:**

```css
@font-face {
  font-family: "Fragment Mono";
  src: url("fonts/FragmentMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Jersey 10";
  src: url("fonts/Jersey10-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Haffer XH SemiBold";
  src: url("fonts/HafferXHSemiBold-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Haffer XH SemiBold Italic";
  src: url("fonts/HafferXHSemiBoldItalic-600.woff2") format("woff2");
  font-weight: 600;
}
@font-face {
  font-family: "Haffer XH Regular";
  src: url("fonts/HafferXHRegular-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Haffer XH Bold";
  src: url("fonts/HafferXHBold-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Haffer XH Bold Italic";
  src: url("fonts/HafferXHBoldItalic-700.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Haffer XH Regular Italic";
  src: url("fonts/HafferXHRegularItalic-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Variable";
  src: url("fonts/InterVariable-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Display";
  src: url("fonts/InterDisplay-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Display";
  src: url("fonts/InterDisplay-700.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Satoshi";
  src: url("fonts/Satoshi-500.woff2") format("woff2");
  font-weight: 500;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Jersey 10 | calc(var(--framer-blockquote-font-size,var(--framer-font-size,16px))*var(--framer-font-size-scale,1)) | 700 |
| Heading 2 | Jersey 10 | calc(var(--framer-link-hover-font-size,var(--framer-blockquote-font-size,var(--framer-font-size,16px)))*var(--framer-font-size-scale,1)) | 700 |
| Heading 3 | Jersey 10 | calc(var(--framer-link-current-font-size,var(--framer-link-font-size,var(--framer-font-size,16px)))*var(--framer-font-size-scale,1)) | 700 |
| Body | Fragment Mono | calc(var(--framer-link-hover-font-size,var(--framer-link-current-font-size,var(--framer-link-font-size,var(--framer-font-size,16px))))*var(--framer-font-size-scale,1)) | 400 |
| Caption | Fragment Mono | var(--framer-font-size,16px) | 400 |
| Code | Fragment Mono | 14px | 400 |

**Typographic Rules:**
- Use **Jersey 10** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Input (1)

**Button** — `html`

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** inherit, 1px, 6px, 10px, 14px, 20px, 999px
- **Max content width:** 1199px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

No box-shadow values detected. The design appears to use a flat visual style.

**Z-Index Scale:** `0, 1, 2, 8, 9, 10`


---

## 7. Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without demanding attention.

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#f739f7` for interactive elements (buttons, links, focus rings)
- Use `#f7f7ff` as the primary page background
- Use **Jersey 10** for all UI text
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: inherit, 1px, 6px, 10px, 14px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use Jersey 10 consistently
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't add box-shadow — this design system uses flat elevation
- Don't use gradients — the design uses solid colors only
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No box-shadow on any element
- No gradient backgrounds
- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| lg | 809px | css |
| lg | 809.98px | css |
| lg | 810px | css |
| xl | 1199px | css |
| xl | 1199.98px | css |
| xl | 1200px | css |
| xl | 1259.98px | css |
| xl | 1260px | css |
| 2xl | 1399px | css |
| 2xl | 1399.98px | css |
| 2xl | 1400px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #eeeeee
Border: 1px solid var(--border)
Radius: 10px
Padding: 16px
Font: Jersey 10
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary: bg #f739f7, text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: 10px
Hover: opacity 0.9 or lighter shade
Focus: ring with #f739f7
```

### Build a Page Layout

```
Background: #f7f7ff
Max-width: 1199px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #eeeeee
Label: #8e8da0 (muted, 12px, uppercase)
Value: #000000 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #f7f7ff
Input border: 1px solid var(--border)
Focus: border-color #f739f7
Label: #8e8da0 12px
Spacing: 16px between fields
Radius: 10px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Jersey 10, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
```
