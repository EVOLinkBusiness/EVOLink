# trucknroll DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 10
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![trucknroll Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a cool, approachable feel. The light background emphasizes content clarity. Typography pairs **Helvetica Now Display** for display/headings with **National 2 Condensed** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The accent color **#4e37ff** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| cc-btn-primary-color | `#ffffff` | background | Page background, darkest surface |
| cc-btn-secondary-bg | `#eaeff2` | surface | Card and panel backgrounds |
| color-black | `#131313` | text-primary | Headings and body text |
| cc-secondary-color | `#5e6266` | text-muted | Captions, placeholders, secondary info |
| cc-secondary-color | `#aebbc5` | text-muted | Captions, placeholders, secondary info |
| cc-btn-primary-hover-bg | `#98a7b6` | text-muted | Captions, placeholders, secondary info |
| cc-primary-color | `#2c2f31` | border | Dividers, card borders, outlines |
| color-accent | `#4e37ff` | accent | CTAs, links, focus rings, active states |
| accent | `#c44e47` | accent | CTAs, links, focus rings, active states |
| color-feedback-error | `#de3e3e` | danger | Error states, destructive actions |
| success | `#369763` | success | Success states, positive indicators |
| cc-btn-primary-bg | `#c2d0e0` | info | Informational highlights |
| color-gray | `#d8d3d3` | unknown | Palette color |
| cc-btn-primary-hover-bg | `#000000` | unknown | Palette color |
| cc-btn-secondary-hover-bg | `#d4dae0` | unknown | Palette color |
| cc-btn-secondary-hover-bg | `#353d43` | unknown | Palette color |
| cc-section-category-border | `#1e2428` | unknown | Palette color |
| unknown | `#c1c1c1` | unknown | Palette color |
| unknown | `#4f4f4f` | unknown | Palette color |
| unknown | `#a7a4a4` | unknown | Palette color |

### CSS Variable Tokens

```css
--cc-modal-border-radius: .5rem;
--cc-btn-border-radius: .4rem;
--cc-primary-color: #2c2f31;
--cc-secondary-color: #5e6266;
--cc-btn-primary-bg: #30363c;
--cc-btn-primary-color: #fff;
--cc-btn-primary-border-color: var(--cc-btn-primary-bg);
--cc-btn-primary-hover-bg: #000;
--cc-btn-primary-hover-color: #fff;
--cc-btn-primary-hover-border-color: var(--cc-btn-primary-hover-bg);
--cc-btn-secondary-bg: #eaeff2;
--cc-btn-secondary-color: var(--cc-primary-color);
--cc-btn-secondary-border-color: var(--cc-btn-secondary-bg);
--cc-btn-secondary-hover-bg: #d4dae0;
--cc-btn-secondary-hover-color: #000;
--cc-btn-secondary-hover-border-color: #d4dae0;
--cc-separator-border-color: #f0f4f7;
--cc-section-category-border: var(--cc-cookie-category-block-bg);
--cc-cookie-category-block-border: #f0f4f7;
--cc-cookie-category-block-hover-border: #e9eff4;
```


---

## 3. Typography Rules

**Font Stack:**
- **National 2 Condensed** — Heading 1, Heading 2, Heading 3
- **Helvetica Now Display** — Body, Caption
- **SFMono-Regular** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Helvetica Now Display";
  src: url("https://trucknroll.com/fonts/HelveticaNowDisplay-Bold.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "National 2 Condensed";
  src: url("https://trucknroll.com/fonts/national-2-condensed-extrabold.woff2") format("woff2");
  font-weight: 900;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | National 2 Condensed | 16px | 700 |
| Heading 2 | National 2 Condensed | clamp(1rem,.6604rem + .3774vw,1.25rem) | 700 |
| Heading 3 | National 2 Condensed | 1rem | 700 |
| Body | Helvetica Now Display | 11px | 400 |
| Caption | Helvetica Now Display | 100% | 400 |
| Code | SFMono-Regular | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **National 2 Condensed** for body/UI text, **Helvetica Now Display** for display/headings
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

### Data Display (2)

**Card** — `html`
- Variants: `cta`, `cta_inner`, `cta_head`, `cta_main`, `cta_list`

**List** — `html`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Overlay (1)

**Modal** — `html`

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** 1rem, unset, .25rem, .5em, 2px, 4.00024px, 5em, 8.00048px, 14.0008px, 37.0022px, 100%, inherit, 40.0024px
- **Max content width:** 1600px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `0 0 0 1px var(--cc-toggle-off-bg)`
- `0 1px 2px #1820035c`
- `0 0 0 1px var(--cc-toggle-on-bg)`

### Raised — cards, buttons, interactive elements

- `0 .625em 1.875em #0000024d`
- `inset 0 0 0 var(--spinner-stroke-width) var(--spinner-stroke-color)`
- `inset 0 0 0 var(--spinner-stroke-width) color-mix(in oklab,var(--spinner-stroke-color) 10%,transparent)`

### Overlay — full-screen overlays, top-level dialogs

- `0 0 100px 20px var(--bg-color) inset`
- `inset 0 0 0 1000px #0000`

### Z-Index Scale

`0, 1, 2, 3, 5, 6, 7, 100, 101, 102, 103, 2147483647`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes spin`
- `@keyframes slideInUp`
- `@keyframes rail`
- `@keyframes rotate`
- `@keyframes fade`
- `@keyframes fade-in`
- `@keyframes shake`
- `@keyframes fall`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#4e37ff` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Pair **National 2 Condensed** (body) with **Helvetica Now Display** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: 1rem, unset, .25rem, .5em, 2px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond National 2 Condensed and Helvetica Now Display and SFMono-Regular
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
| xs | 340px | css |
| sm | 500px | css |
| sm | 640px | css |
| md | 700px | css |
| lg | 1000px | css |
| xl | 1200px | css |
| 2xl | 1400px | css |
| 2xl | 1440px | css |
| 2xl | 1600px | css |
| 2xl | 1800px | css |
| 2xl | 2000px | css |
| 2xl | 2400px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #eaeff2
Border: 1px solid #2c2f31
Radius: 5em
Padding: 16px
Font: National 2 Condensed
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #4e37ff, text white
Ghost: bg transparent, border #2c2f31
Padding: 8px 16px
Radius: 5em
Hover: opacity 0.9 or lighter shade
Focus: ring with #4e37ff
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1600px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #eaeff2
Label: #5e6266 (muted, 12px, uppercase)
Value: #131313 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #2c2f31
Focus: border-color #4e37ff
Label: #5e6266 12px
Spacing: 16px between fields
Radius: 5em
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: National 2 Condensed, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
