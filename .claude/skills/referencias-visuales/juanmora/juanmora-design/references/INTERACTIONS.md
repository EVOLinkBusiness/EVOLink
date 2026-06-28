# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Link | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: all;
transition: 0.3s cubic-bezier(0.275, 2.254, 0.281, 0.996);
```

Apply these to all interactive elements. Never invent new durations or easings.

## Link Interactions

### Link 1 — `Juan
Mora`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On hover:**

```css
/* outline: rgb(0, 0, 238) none 3px → */ outline: rgb(0, 0, 238) none 0px;
```

**On focus:**

```css
/* outline: rgb(0, 0, 238) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(0, 0, 238) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `all`

### Link 2 — `About`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On hover:**

```css
/* background-color: rgba(80, 80, 80, 0.31) → */ background-color: rgba(32, 32, 32, 0.39);
/* color: rgb(255, 188, 149) → */ color: rgb(250, 246, 239);
/* border-color: rgb(255, 188, 149) → */ border-color: rgb(250, 246, 239);
/* transform: none → */ transform: matrix(0.899775, 0, 0, 0.899775, 0, 0);
/* outline: rgb(255, 188, 149) none 3px → */ outline: rgb(250, 246, 239) none 0px;
/* outline-color: rgb(255, 188, 149) → */ outline-color: rgb(250, 246, 239);
```

**On focus:**

```css
/* outline: rgb(255, 188, 149) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(255, 188, 149) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `0.3s cubic-bezier(0.275, 2.254, 0.281, 0.996)`

### Link 3 — `a`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* outline: rgb(0, 0, 238) none 3px → */ outline: rgb(0, 0, 238) none 0px;
```

**On focus:**

```css
/* outline: rgb(0, 0, 238) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(0, 0, 238) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `all`

## Interaction Rules

- Accent color `#0099ff` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.3s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

