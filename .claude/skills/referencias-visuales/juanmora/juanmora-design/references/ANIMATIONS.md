# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

| Library | Type | Notes |
|---------|------|-------|
| **GSAP v3.14.1** | animation |  |
| **ScrollTrigger** | scroll |  |

## Scroll Journey

The page is **11.440px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 1792px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 3478px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 5270px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 7062px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 8748px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 10.540px

![Scroll 100%](../screens/scroll/scroll-100.png)

## Video Elements

| # | Role | Autoplay | Loop | Muted | Size | First Frame |
|---|------|----------|------|-------|------|-------------|
| 1 | content | ✓ | ✓ | ✓ | 259×203 | — |
| 2 | content | ✓ | ✓ | ✓ | 259×203 | — |
| 3 | content | ✓ | ✓ | ✓ | 259×203 | — |
| 4 | content | ✓ | ✓ | ✓ | 259×203 | — |
| 5 | content | ✓ | ✓ | ✓ | 259×203 | — |
| 6 | content | ✓ | ✓ | ✓ | 259×203 | — |

- **Source:** `https://juanmora.co/videos-work/home/home-ampli.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`
- **Source:** `https://juanmora.co/videos-work/home/home-shopping.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`
- **Source:** `https://juanmora.co/videos-work/home/home-ampli-brand.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`
- **Source:** `https://juanmora.co/videos-work/home/home-brudget1.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`
- **Source:** `https://juanmora.co/videos-work/home/home-alena.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`
- **Source:** `https://juanmora.co/videos-work/home/home-apechain.mp4`
- **Poster:** `https://juanmora.co/videos-work/juan-video-loading.jpg`

## CSS Keyframes (1 extracted)

### `@keyframes spin`

Duration: `0.8s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.w-lightbox-spinner`

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

> Transform/motion animation

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: inherit;
transition: unset;
transition: background-color 100ms, color 100ms;
transition: 0.3s;
transition: 0.3s cubic-bezier(0.292, 1.932, 0.281, 0.996);
transition: 0.3s cubic-bezier(0.275, 2.254, 0.281, 0.996);
transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
transition: 0.5s cubic-bezier(0.275, 2.254, 0.281, 0.996);
transition: 0.275s;
transition: 0.2s;
transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
```

## How to Recreate This Motion Design

### Step 1 — Install Dependencies

```bash
npm install gsap
npm install gsap
```

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **GSAP ScrollTrigger** — scroll-linked animations (product rotation, parallax) use `ScrollTrigger.scrub` for frame-perfect scroll sync
- **Duration scale:** `100ms` · `0.3s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`1792px`) → `screens/scroll/scroll-017.png`
- **33%** (`3478px`) → `screens/scroll/scroll-033.png`
- **50%** (`5270px`) → `screens/scroll/scroll-050.png`
- **67%** (`7062px`) → `screens/scroll/scroll-067.png`
- **83%** (`8748px`) → `screens/scroll/scroll-083.png`
- **100%** (`10540px`) → `screens/scroll/scroll-100.png`

