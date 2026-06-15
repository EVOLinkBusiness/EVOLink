# framer DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 6
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![framer Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a cool, approachable feel. The light background emphasizes content clarity. Typography pairs **Geist** for display/headings with **Inter Tight** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The accent color **#8855ff** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| framer-link-current-text-color | `#ffffff` | background | Page background, darkest surface |
| framer-text-color | `#000000` | text-primary | Headings and body text |
| framer-link-text-color | `#999999` | text-muted | Captions, placeholders, secondary info |
| button-text | `#333333` | border | Dividers, card borders, outlines |
| framer-fresco-tint-color | `#8855ff` | accent | CTAs, links, focus rings, active states |
| framer-fresco-errorTint-color | `#ff3366` | danger | Error states, destructive actions |
| framer-fresco-warningTint-color | `#ffbb00` | warning | Warning states, caution indicators |
| selection-background-color | `#0099ff` | info | Informational highlights |
| framer-fresco-panelBackground-color | `#1f1f1f` | unknown | Palette color |
| background-secondary | `#eeeeee` | unknown | Palette color |
| text-subtitle | `#888888` | unknown | Palette color |
| framer-fresco-panelChevron-color | `#666666` | unknown | Palette color |
| framer-fresco-menuBackground-color | `#121212` | unknown | Palette color |
| text | `#cccccc` | unknown | Palette color |
| circle-border | `#444444` | unknown | Palette color |
| text-input | `#777777` | unknown | Palette color |
| framer-fresco-panelPressedState-color | `#aaaaaa` | unknown | Palette color |
| framer-fresco-comboBoxClearButton-color | `#bbbbbb` | unknown | Palette color |
| framer-fresco-analyticsAbTestVariant2-color | `#9869fd` | unknown | Palette color |
| framer-fresco-segmentedControlDivider-color | `#555555` | unknown | Palette color |

### CSS Variable Tokens

```css
--selection-background-color: #0099ff4d;
--framer-text-background-color: initial;
--framer-text-background-radius: initial;
--framer-text-background-corner-shape: initial;
--framer-text-background-padding: initial;
--border-bottom-width: 1px;
--border-left-width: 1px;
--border-right-width: 1px;
--border-style: solid;
--border-top-width: 1px;
--border-bottom-width: 1px;
--border-color: #ffffff14;
--border-left-width: 0px;
--border-right-width: 0px;
--border-style: solid;
--border-top-width: 0px;
--border-bottom-width: 0px;
--border-color: #1a1a1a;
--border-left-width: 0px;
--border-right-width: 1px;
```


---

## 3. Typography Rules

**Font Stack:**
- **Inter Tight** — Heading 1, Heading 2
- **Geist** — Body, Caption
- **Azeret Mono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Geist";
  src: url("https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwRGFWfOw.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Inter Tight";
  src: url("https://fonts.gstatic.com/s/intertight/v9/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj6AiaVi5SkK8.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Mona Sans";
  src: url("https://fonts.gstatic.com/s/monasans/v4/o-0mIpQmx24alC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyDPA-9V6VLKzA.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Space Grotesk";
  src: url("https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Azeret Mono";
  src: url("https://fonts.gstatic.com/s/azeretmono/v21/3XF5ErsiyJsY9O_Gepph-FvtTQgMQUdNekSfnPVR27yby5s.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeE9KK5Z5ClqOw.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "JetBrains Mono";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/TZ2PMVPWEVHUPJWOPNSWLOXAF6QPOEMZ/O4OZKA7ZLZGT4JOGT5IEKURK6U3RXYGM/EO5MKE3BUDOZN44BP4HDPXAJAC2BIMCD.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "VT323";
  src: url("https://fonts.gstatic.com/s/vt323/v18/pxiKyp0ihIEF2isQFJXGdg.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Variable";
  src: url("https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMHweElSvO5Tc.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono Variable";
  src: url("https://fonts.gstatic.com/s/geistmono/v5/or3nQ6H-1_WfwkMZI_qYJrUXmzPnnks.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Luxurious Script";
  src: url("https://fonts.gstatic.com/s/luxuriousscript/v9/ahcCv9e7yydulT32KZ0rBIoD7DzMg0_Oby1JtYk.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "GT Walsheim Medium";
  src: url("https://framerusercontent.com/assets/6kEeNyQwxT59TY7SpLEnehG2fc.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "GT Walsheim Framer Medium";
  src: url("https://framerusercontent.com/assets/qBBPUgWmzI9eeGPfhfEkF1M8Q8.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Inter Medium";
  src: url("https://framerusercontent.com/assets/fMJs1lJbVR05voQOF2AQ6OSyGOc.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "GT Walsheim Bold";
  src: url("https://framerusercontent.com/assets/9yxOMHiOq1YW9lyV4OoKqGTdPeY.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "GT Walsheim Bold Oblique";
  src: url("https://framerusercontent.com/assets/NNOZYI61tlbnev2X9hJIM64dg.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "GT Walsheim Medium Oblique";
  src: url("https://framerusercontent.com/assets/UBprkVmS9hoSiTVpfcFuJLBRb8.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "GT Walsheim Black";
  src: url("https://framerusercontent.com/assets/PcJ0yzAWulkYYny8J2s5H8Dg.woff2") format("woff2");
  font-weight: 800;
}
@font-face {
  font-family: "Inter Framer SemiBold";
  src: url("https://framerusercontent.com/assets/gVFblhgzMqambFqEuiNjMfNAvyk.woff2") format("woff2");
  font-weight: 600;
}
@font-face {
  font-family: "Inter Framer Regular";
  src: url("https://framerusercontent.com/assets/GsXEnKQLltgOvHi7Wji3yU1QgX8.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "GT Walsheim Regular";
  src: url("https://framerusercontent.com/assets/mw33WKBOaXb1pzgQcfonv4i9zI.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Mono Spec Variable";
  src: url("https://framerusercontent.com/assets/WlmS6qYn7izEkPu5qvLDMzLBDA.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Lazzer Variable";
  src: url("https://framerusercontent.com/assets/xq5j5RUjB0tFBNyFaYG8lDHtM.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "T1 Korium 5Kg";
  src: url("https://framerusercontent.com/assets/UuLamlERjW7q7mz3BABumUAjmG4.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Marketing Medium";
  src: url("https://framerusercontent.com/assets/yNjsIUD4Gn390zxFB80WpYpVRUw.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Inter SemiBold";
  src: url("https://framerusercontent.com/assets/7PdLx6hzjhVS6tt9aC5wiVjfBvA.woff2") format("woff2");
  font-weight: 600;
}
@font-face {
  font-family: "Söhne Breit Fett";
  src: url("https://framerusercontent.com/assets/JDQ5RladWnljVkb2uAr12rh7oUI.woff2") format("woff2");
  font-weight: 800;
}
@font-face {
  font-family: "Universal Sans Text 400";
  src: url("https://framerusercontent.com/assets/1LQMekRM3WgYATWQqATpYqLwp8.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Framer SemiBold Italic";
  src: url("https://framerusercontent.com/assets/QeEJ0KS8FrRrhPGd2xEEy51Vo.woff2") format("woff2");
  font-weight: 600;
}
@font-face {
  font-family: "Inter Framer Italic";
  src: url("https://framerusercontent.com/assets/fU6BQNYl4R1DpuIqzKWhnUpX5Ag.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Input Mono Regular";
  src: url("https://framerusercontent.com/assets/kvPaaOVtxHpd0RYFgmZS8bukwk.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Input Mono Bold";
  src: url("https://framerusercontent.com/assets/hic7XBe6FXqwZV643HMvMXcJjdw.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Input Mono Black";
  src: url("https://framerusercontent.com/assets/FtdEX9VLtxs1L7YuXNHmp0fCIC4.ttf") format("truetype");
  font-weight: 800;
}
@font-face {
  font-family: "Inter Variable";
  src: url("https://framerusercontent.com/assets/mYcqTSergLb16PdbJJQMl9ebYm4.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("https://framerusercontent.com/assets/DpPBYI0sL4fYLgAkX8KXOPVt7c.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Inter Display";
  src: url("https://framerusercontent.com/assets/2uIBiALfCHVpWbHqRMZutfT7giU.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Inter Display";
  src: url("https://framerusercontent.com/assets/I11LrmuBDQZweplJ62KkVsklU5Y.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Panchang";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/47WQXPVBB5FZSBSKG7EM3GTGOVFM5BBT/ODED7M7ROA7KYKTD3MYSN4KKO6JVXBQE/EE3DYKUPHF3W5SWXFO53CRP5KMNTTNTH.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Satoshi";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Satoshi";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Switzer";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/HBNTRIISA5MEXGL5WPYI7CV2HIWTDV3Q/YDPDINVT673XLXNSTMLG4JNCZZMVVNPN/Y7SCNZJOT2MW5ADSGOFLDGH4TNL4JCQY.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Chillax";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/UM553GIXLG5E46TUH763VYPGAQ77BPQ5/NN4EI53RUGC4BO5HP5F46SYQ4WY4U4CE/T2KA2X72VGASVXFVB7QCOIFYVH5GZJTW.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Manrope";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/BNWG6MUI4RTC6WEND2VPDH4MHMIVU3XZ/R5YXY5FMVG6PXU36GNEEA24MIPMEPGSM/CIM4KQCLZSMMLWPVH25IDDSTY4ENPHEY.woff2") format("woff2");
  font-weight: 500;
}
@font-face {
  font-family: "Azeret Mono Variable";
  src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/ASWSMZKQ23WEXZBVNMUWSVUMPLFQRPHW/NRSBSJV2GBSTS4NZUIGQTFNNJM2L4WXC/6Q6YTQSA7J7EBIZ4AJJG7JJSMMDPZUW6.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Open Runde";
  src: url("https://framerusercontent.com/assets/hG3wmGmFwadB6X5XPVXkMlmLr8o.woff2") format("woff2");
  font-weight: 600;
}
@font-face {
  font-family: "Libre Caslon Condensed";
  src: url("https://framerusercontent.com/assets/EQWaTNALCQPCpHfp0iD2fo11FWI.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Utara Variable";
  src: url("https://framerusercontent.com/assets/6ZJIm28jVQLilO9kSgpHSicAHXY.woff2") format("woff2");
  font-weight: 1000;
}
@font-face {
  font-family: "DT Nightingale";
  src: url("https://framerusercontent.com/assets/62Yl9Y2VqTSkDHSBv2V4ZgpHCgg.woff2") format("woff2");
  font-weight: 300;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Inter Tight | 61.5px | 700 |
| Heading 2 | Inter Tight | 26px | 700 |
| Body | Geist | var(--framer-fresco-base-font-size,12px) | 400 |
| Caption | Geist | calc(var(--framer-blockquote-font-size,var(--framer-font-size,16px))*var(--framer-font-size-scale,1)) | 400 |
| Code | Azeret Mono | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **Inter Tight** for body/UI text, **Geist** for display/headings
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

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** inherit, 1em, 1.5px, 2px, 4px, 5px, 6px, 8px, 10px, 12px, 13px, 15px, 18px, 20px, 21px, 99px, 100px, 1000px
- **Max content width:** 1200px

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

- `0 0 0 2px #090909`
- `inset 0 0 0 2px #ffffff05`
- `0 0 0 1px #ffffff1a`

### Raised — cards, buttons, interactive elements

- `0 3px 6px #0000004d,0 0 0 1px #ffffff0f`
- `0 4px 8px #09f3`
- `0 1px 2px #0099ff26,0 2px 4px #09f3`

### Floating — dropdowns, popovers, modals

- `0 10px 10px #0000004d`
- `-10px 10px 20px 10px #0009`
- `0 5px 10px #00000040`

### Overlay — full-screen overlays, top-level dialogs

- `0 20px 30px #000000a6`
- `0 20px 30px #00000080`
- `var(--framer-fresco-popover-shadow,0px 10px 30px 0px rgba(0,0,0,.1),0px 1px 4px 0px rgba(0,0,0,.02))`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 28, 29, 31, 2500`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes __framer-blink-input`
- `@keyframes check-a1gfspwd`
- `@keyframes scale-in-s1vo07bb`
- `@keyframes tooltip-enter-s1wvirx`
- `@keyframes tooltip-exit-s1jngqm9`
- `@keyframes autofill-tarvkue`
- `@keyframes enter-m1vb3zu0`
- `@keyframes svgSpin-s1cboakm`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#8855ff` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Pair **Inter Tight** (body) with **Geist** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: inherit, 1em, 1.5px, 2px, 4px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Inter Tight and Geist and Azeret Mono
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
| xs | 430px | css |
| lg | 809px | css |
| lg | 809.98px | css |
| lg | 810px | css |
| xl | 1100px | css |
| xl | 1199px | css |
| xl | 1199.98px | css |
| xl | 1200px | css |
| 2xl | 1759.98px | css |
| 2xl | 1760px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #ffffff
Border: 1px solid #333333
Radius: 12px
Padding: 16px
Font: Inter Tight
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #8855ff, text white
Ghost: bg transparent, border #333333
Padding: 8px 16px
Radius: 12px
Hover: opacity 0.9 or lighter shade
Focus: ring with #8855ff
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1200px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #ffffff
Label: #999999 (muted, 12px, uppercase)
Value: #000000 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #333333
Focus: border-color #8855ff
Label: #999999 12px
Spacing: 16px between fields
Radius: 12px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Inter Tight, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
