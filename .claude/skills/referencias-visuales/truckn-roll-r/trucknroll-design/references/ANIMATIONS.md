# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

| Library | Type | Notes |
|---------|------|-------|
| **Web Animations API (2 active)** | animation |  |

## Scroll Journey

The page is **11.161px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 1744px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 3386px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 5131px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 6875px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 8517px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 10.259px

![Scroll 100%](../screens/scroll/scroll-100.png)

## Scroll Animation Patterns

| Pattern | Library | Element Count | Duration | Delay | Easing |
|---------|---------|---------------|----------|-------|--------|
| scroll-reveal | Locomotive Scroll | 28 | — | — | — |
| parallax / sticky scroll | CSS | 16 | — | — | — |

### Locomotive Scroll Implementation

### CSS Implementation

## Motion Tokens (CSS Variables)

### Duration Tokens

```css
--cc-modal-transition-duration: .25s;
--transition-duration-slower: .8s;
--transition-duration-slow: .6s;
--transition-duration-fast: .25s;
--transition-duration: .4s;
```

### Easing Tokens

```css
--ease-power3-out: cubic-bezier(.165,.84,.44,1);
--ease: cubic-bezier(.3,.4,0,1);
--ease-out: cubic-bezier(0,0,.2,1);
--ease-power4-out: cubic-bezier(.23,1,.32,1);
--ease-power3-inOut: cubic-bezier(.77,0,.175,1);
```

### Other Tokens

```css
--z-index-transition: 1000;
```

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: unset;
transition: initial;
transition: revert;
transition: background-size 0.25s, color 0.25s;
transition: stroke 0.15s;
transition: opacity var(--cc-modal-transition-duration) ease,visibility var(--cc-modal-transition-duration) ease,transform var(--cc-modal-transition-duration) ease;
transition: background-color 0.15s, border-color 0.15s, color 0.15s;
transition: 0.15s;
transition: background-color 0.25s, border-color 0.25s;
transition: 0.25s;
transition: transform 0.25s, background-color 0.25s;
transition: opacity 0.15s;
```

## How to Recreate This Motion Design

### Step 1 — Install Dependencies

```bash
```

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity .25s cubic-bezier(.165,.84,.44,1),
              transform .25s cubic-bezier(.165,.84,.44,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **Duration scale:** `.25s` · `.8s` · `.6s` · `.4s` · `0.25s` · `0.15s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`1744px`) → `screens/scroll/scroll-017.png`
- **33%** (`3386px`) → `screens/scroll/scroll-033.png`
- **50%** (`5131px`) → `screens/scroll/scroll-050.png`
- **67%** (`6875px`) → `screens/scroll/scroll-067.png`
- **83%** (`8517px`) → `screens/scroll/scroll-083.png`
- **100%** (`10259px`) → `screens/scroll/scroll-100.png`

