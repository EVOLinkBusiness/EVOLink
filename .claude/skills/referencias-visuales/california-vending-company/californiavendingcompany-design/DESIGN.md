# californiavendingcompany DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 6
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![californiavendingcompany Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a warm, approachable feel. The light background emphasizes content clarity. Typography pairs **GeistSans** for display/headings with **generalSans** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 16, 20px. The accent color **#e40014** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| tw-ring-offset-color | `#ffffff` | background | Page background, darkest surface |
| card-foreground | `#0c0a09` | surface | Card and panel backgrounds |
| color-green-50 | `#f0fdf4` | surface | Card and panel backgrounds |
| color-slate-800 | `#1d293d` | text-primary | Headings and body text |
| muted-foreground | `#78716c` | text-muted | Captions, placeholders, secondary info |
| text-muted | `#a8a29e` | text-muted | Captions, placeholders, secondary info |
| border | `#44403c` | border | Dividers, card borders, outlines |
| color-red-600 | `#e40014` | accent | CTAs, links, focus rings, active states |
| primary | `#e05a33` | danger | Error states, destructive actions |
| color-green-300 | `#7bf1a8` | success | Success states, positive indicators |
| color-amber-400 | `#fbbc04` | warning | Warning states, caution indicators |
| info | `#0c1b2a` | info | Informational highlights |
| border | `#e7e5e4` | unknown | Palette color |
| unknown | `#fef2ee` | unknown | Palette color |
| unknown | `#c94e2b` | unknown | Palette color |
| color-green-950 | `#032e15` | unknown | Palette color |
| color-black | `#000000` | unknown | Palette color |
| color-green-200 | `#b9f8cf` | unknown | Palette color |
| color-green-400 | `#05df72` | unknown | Palette color |
| color-green-500 | `#00c758` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
--tw-border-style: dashed;
--background: #fafaf9;
--foreground: #1e293b;
--card: #fff;
--card-foreground: #0c0a09;
--popover: #fff;
--popover-foreground: #0c0a09;
--primary: #e05a33;
--primary-foreground: #fff;
--secondary: #f5f5f4;
--secondary-foreground: #0c0a09;
--muted: #f5f5f4;
--muted-foreground: #78716c;
--accent: #f5f5f4;
--accent-foreground: #0c0a09;
--destructive: #dc2626;
--border: #e7e5e4;
--sidebar-foreground: #0c0a09;
--sidebar-primary: #e05a33;
```


---

## 3. Typography Rules

**Font Stack:**
- **generalSans** — Heading 1, Heading 2, Heading 3
- **GeistSans** — Body, Caption
- **GeistMono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "GeistSans";
  src: url("https://californiavendingcompany.com/_next/static/media/Geist_Variable-s.p.0-te~ja_gpvcf.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "GeistMono";
  src: url("https://californiavendingcompany.com/_next/static/media/GeistMono_Variable.p.17jn9btb_52pq.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "generalSans";
  src: url("https://californiavendingcompany.com/_next/static/media/GeneralSans_Regular-s.p.0aqd04_idyb6d.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "generalSans";
  src: url("https://californiavendingcompany.com/_next/static/media/GeneralSans_Bold-s.p.0-mpnqa_q7f0-.woff2") format("woff2");
  font-weight: 700;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | generalSans | 64px | 700 |
| Heading 2 | generalSans | 48px | 700 |
| Heading 3 | generalSans | 40px | 700 |
| Body | GeistSans | 22px | 400 |
| Caption | GeistSans | 14px | 400 |
| Code | GeistMono | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **generalSans** for body/UI text, **GeistSans** for display/headings
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

### Data Display (1)

**List** — `html`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (1)

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48
- **Border radius:** 8px, 11.2px
- **Max content width:** 1280px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Raised — cards, buttons, interactive elements

- `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px`

### Z-Index Scale

`0, 10, 50, 100`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes pulse`
- `@keyframes enter`
- `@keyframes exit`
- `@keyframes accordion-down`
- `@keyframes accordion-up`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#e40014` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Pair **generalSans** (body) with **GeistSans** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: 8px, 11.2px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond generalSans and GeistSans and GeistMono
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 40rem | css |
| md | 48rem | css |
| lg | 64rem | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #0c0a09
Border: 1px solid #44403c
Radius: 11.2px
Padding: 16px
Font: generalSans
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #e40014, text white
Ghost: bg transparent, border #44403c
Padding: 8px 16px
Radius: 11.2px
Hover: opacity 0.9 or lighter shade
Focus: ring with #e40014
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #0c0a09
Label: #78716c (muted, 12px, uppercase)
Value: #1d293d (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #44403c
Focus: border-color #e40014
Label: #78716c 12px
Spacing: 16px between fields
Radius: 11.2px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: generalSans, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
