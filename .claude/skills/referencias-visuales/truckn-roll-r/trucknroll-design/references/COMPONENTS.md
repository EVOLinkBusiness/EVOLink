# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **C Image Inner** | unknown | 11× | `.c-image_inner` |
| **C Image Img** | unknown | 11× | `.c-image_img` |
| **Color Accent** | button | 9× | `.-color-accent`, `.c-button` |
| **C Button Inner** | button | 7× | `.c-button_inner` |
| **C Icon** | unknown | 7× | `.c-icon` |
| **Svg Logo** | unknown | 7× | `.svg-logo` |
| **Cover** | unknown | 6× | `.-cover`, `.-lazy-load`, `.-parallax` |
| **C Image Parallax** | unknown | 6× | `.c-image_parallax` |
| **C Accordion** | unknown | 5× | `.c-accordion` |
| **C Accordion Details** | unknown | 5× | `.c-accordion_details` |
| **C Accordion Summary** | unknown | 5× | `.c-accordion_summary` |
| **C Accordion Title** | unknown | 5× | `.c-accordion_title` |
| **C Nav Item** | card | 4× | `.c-nav_item` |
| **C Nav Link** | unknown | 4× | `.c-nav_link` |
| **C Heading Media Line Container** | unknown | 4× | `.c-heading-media_line-container`, `.heading-huge`, `.max-md:heading-lg` |
| **C Hero Title Line** | unknown | 3× | `.c-hero_title_line` |
| **C Heading Media Line** | unknown | 3× | `.c-heading-media_line` |
| **C Grid List Item** | card | 3× | `.c-grid-list_item`, `.inview-border` |
| **C Grid List Title** | unknown | 3× | `.c-grid-list_title`, `.heading-xs` |
| **C Grid List Image** | unknown | 3× | `.c-grid-list_image` |

## Cards

### C Nav Item

**Instances found:** 4

**CSS classes:** `.c-nav_item`

**HTML structure:**

```html
<li class="c-nav_item is-active"> <a href="https://trucknroll.com/" class="c-nav_link"> Services </a> </li>
```

**Base styles (from design tokens):**

```css
.c-nav_item {
  background: #eaeff2;
  border: 1px solid #2c2f31;
  border-radius: 5em;
  padding: 8px;
}```

### C Grid List Item

**Instances found:** 3

**CSS classes:** `.c-grid-list_item` `.inview-border`

**HTML structure:**

```html
<div class="c-grid-list_item inview-border" data-scroll=""> <div class="c-grid-list_title heading-xs"> <span>(&nbsp;1&nbsp;)</span> <h3>Flawless Execution</h3> </div> <p class="c-grid-list_text"></p><p class="c-grid-list_text">Every detail is handled. Every deadline met. No stress. No scrambling<strong>.</strong> Just a team that makes sure everything rolls exactly as planned. Every time.&nbsp;<br>&nbsp;</p><p></p> <div class="c-grid-list_image"> <div class="c-image -rounded -cover -parallax -lazy-load"> <c-parallax-image id="parallaximage-3" style="--parallax-scale: 1.1547213114754098;"> <div
```

**Base styles (from design tokens):**

```css
.c-grid-list_item {
  background: #eaeff2;
  border: 1px solid #2c2f31;
  border-radius: 5em;
  padding: 8px;
}```

## Buttons

### Color Accent

**Instances found:** 9

**CSS classes:** `.-color-accent` `.c-button`

**HTML structure:**

```html
<a class="c-button -color-accent" href="#page-heading" aria-label="Access to main content"><span class="c-button_inner"> <span class="c-button_label-container" data-label="Access to main content"> <span class="c-button_label">Access to main content</span> </span> </span> </a>
```

**Base styles (from design tokens):**

```css
.-color-accent {
  background: #4e37ff;
  color: #131313;
  border-radius: 5em;
  padding: 4px 8px;
  cursor: pointer;
}```

### C Button Inner

**Instances found:** 7

**CSS classes:** `.c-button_inner`

**HTML structure:**

```html
<span class="c-button_inner"> <span class="c-button_label-container" data-label="Access to main content"> <span class="c-button_label">Access to main content</span> </span> </span>
```

**Base styles (from design tokens):**

```css
.c-button_inner {
  background: #4e37ff;
  color: #131313;
  border-radius: 5em;
  padding: 4px 8px;
  cursor: pointer;
}```

## Other Components

### C Image Inner

**Instances found:** 11

**CSS classes:** `.c-image_inner`

**HTML structure:**

```html
<picture class="c-image_inner"> <img class="c-image_img is-loaded" src="https://trucknroll.com/uploads/uploads/_header/2320/SHOT01_251111_Truck_n_Roll_0090_shot01_v1.webp" width="1400" height="870" alt="SHOT01 251111 Truck n Roll 0090 shot01 v1" loading="lazy" onload="this.classList.add('is-loaded'); this.parentNode.parentNode.classList.add('is-loaded');"> </picture>
```

**Base styles (from design tokens):**

```css
.c-image_inner {
  background: #eaeff2;
  padding: 4px;
}```

### C Image Img

**Instances found:** 11

**CSS classes:** `.c-image_img`

**HTML structure:**

```html
<img class="c-image_img is-loaded" src="https://trucknroll.com/uploads/uploads/_header/2320/SHOT01_251111_Truck_n_Roll_0090_shot01_v1.webp" width="1400" height="870" alt="SHOT01 251111 Truck n Roll 0090 shot01 v1" loading="lazy" onload="this.classList.add('is-loaded'); this.parentNode.parentNode.classList.add('is-loaded');">
```

**Base styles (from design tokens):**

```css
.c-image_img {
  background: #eaeff2;
  padding: 4px;
}```

### C Icon

**Instances found:** 7

**CSS classes:** `.c-icon`

**HTML structure:**

```html
<span class="c-icon"> <svg class="svg-logo" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=1782496061#logo"></use> </svg> </span>
```

**Base styles (from design tokens):**

```css
.c-icon {
  background: #eaeff2;
  padding: 4px;
}```

### Svg Logo

**Instances found:** 7

**CSS classes:** `.svg-logo`

**HTML structure:**

```html
<svg class="svg-logo" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=1782496061#logo"></use> </svg>
```

**Base styles (from design tokens):**

```css
.svg-logo {
  background: #eaeff2;
  padding: 4px;
}```

### Cover

**Instances found:** 6

**CSS classes:** `.-cover` `.-lazy-load` `.-parallax` `.c-image`

**HTML structure:**

```html
<div class="c-image -cover -parallax -lazy-load"> <c-parallax-image id="parallaximage-1" style="--parallax-scale: 1.6365957446808512;"> <div class="c-image_parallax is-inview is-loaded" data-scroll="" data-scroll-speed="-0.1" data-scroll-ignore-fold="true" style="transform: translate3d(0px, -30.7663px, 0px);"> <picture class="c-image_inner"> <img class="c-image_img is-loaded" src="https://trucknroll.com/uploads/uploads/_header/2320/SHOT01_251111_Truck_n_Roll_0090_shot01_v1.webp" width="1400" height="870" alt="SHOT01 251111 Truck n Roll 0090 shot01 v1" loading="lazy" onload="this.classList.add(
```

**Base styles (from design tokens):**

```css
.-cover {
  background: #eaeff2;
  padding: 4px;
}```

### C Image Parallax

**Instances found:** 6

**CSS classes:** `.c-image_parallax`

**HTML structure:**

```html
<div class="c-image_parallax is-inview is-loaded" data-scroll="" data-scroll-speed="-0.1" data-scroll-ignore-fold="true" style="transform: translate3d(0px, -30.7663px, 0px);"> <picture class="c-image_inner"> <img class="c-image_img is-loaded" src="https://trucknroll.com/uploads/uploads/_header/2320/SHOT01_251111_Truck_n_Roll_0090_shot01_v1.webp" width="1400" height="870" alt="SHOT01 251111 Truck n Roll 0090 shot01 v1" loading="lazy" onload="this.classList.add('is-loaded'); this.parentNode.parentNode.classList.add('is-loaded');"> </picture> </div>
```

**Base styles (from design tokens):**

```css
.c-image_parallax {
  background: #eaeff2;
  padding: 4px;
}```

### C Accordion

**Instances found:** 5

**CSS classes:** `.c-accordion`

**HTML structure:**

```html
<c-accordion class="c-accordion" style="--index:0" id="accordion-7"> <details class="c-accordion_details"> <summary class="c-accordion_summary"> <span class="c-accordion_title"> <span class="c-accordion_label body-lg">Night Shift?</span> <span class="c-accordion_label body-lg opacity-50">It's what we do!</span> </span> <span class="c-accordion_icon-container" aria-hidden="true"> <span class="c-icon -open c-accordion_icon"> <svg class="svg-plus" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=1782496061#plus"></use> </svg> </span> <span class="c-icon -close c-accordion
```

**Base styles (from design tokens):**

```css
.c-accordion {
  background: #eaeff2;
  padding: 4px;
}```

### C Accordion Details

**Instances found:** 5

**CSS classes:** `.c-accordion_details`

**HTML structure:**

```html
<details class="c-accordion_details"> <summary class="c-accordion_summary"> <span class="c-accordion_title"> <span class="c-accordion_label body-lg">Night Shift?</span> <span class="c-accordion_label body-lg opacity-50">It's what we do!</span> </span> <span class="c-accordion_icon-container" aria-hidden="true"> <span class="c-icon -open c-accordion_icon"> <svg class="svg-plus" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=1782496061#plus"></use> </svg> </span> <span class="c-icon -close c-accordion_icon"> <svg class="svg-minus" focusable="false" aria-hidden="true"> 
```

**Base styles (from design tokens):**

```css
.c-accordion_details {
  background: #eaeff2;
  padding: 4px;
}```

### C Accordion Summary

**Instances found:** 5

**CSS classes:** `.c-accordion_summary`

**HTML structure:**

```html
<summary class="c-accordion_summary"> <span class="c-accordion_title"> <span class="c-accordion_label body-lg">Night Shift?</span> <span class="c-accordion_label body-lg opacity-50">It's what we do!</span> </span> <span class="c-accordion_icon-container" aria-hidden="true"> <span class="c-icon -open c-accordion_icon"> <svg class="svg-plus" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=1782496061#plus"></use> </svg> </span> <span class="c-icon -close c-accordion_icon"> <svg class="svg-minus" focusable="false" aria-hidden="true"> <use xlink:href="/dist/sprite.svg?v=17
```

**Base styles (from design tokens):**

```css
.c-accordion_summary {
  background: #eaeff2;
  padding: 4px;
}```

### C Accordion Title

**Instances found:** 5

**CSS classes:** `.c-accordion_title`

**HTML structure:**

```html
<span class="c-accordion_title"> <span class="c-accordion_label body-lg">Night Shift?</span> <span class="c-accordion_label body-lg opacity-50">It's what we do!</span> </span>
```

**Base styles (from design tokens):**

```css
.c-accordion_title {
  background: #eaeff2;
  padding: 4px;
}```

### C Nav Link

**Instances found:** 4

**CSS classes:** `.c-nav_link`

**HTML structure:**

```html
<a href="https://trucknroll.com/" class="c-nav_link"> Services </a>
```

**Base styles (from design tokens):**

```css
.c-nav_link {
  background: #eaeff2;
  padding: 4px;
}```

### C Heading Media Line Container

**Instances found:** 4

**CSS classes:** `.c-heading-media_line-container` `.heading-huge` `.max-md:heading-lg`

**HTML structure:**

```html
<div class="c-heading-media_line-container heading-huge max-md:heading-lg" data-scroll="" data-scroll-ignore-fold="" data-scroll-css-progress="" data-scroll-offset="-20%, 60%"> <div class="c-heading-media_line"> <div aria-hidden="true"> We …</div> </div> </div>
```

**Base styles (from design tokens):**

```css
.c-heading-media_line-container {
  background: #eaeff2;
  padding: 4px;
}```

### C Hero Title Line

**Instances found:** 3

**CSS classes:** `.c-hero_title_line`

**HTML structure:**

```html
<span class="c-hero_title_line" style="--index: 0"> <span> FULL …</span> </span>
```

**Base styles (from design tokens):**

```css
.c-hero_title_line {
  background: #eaeff2;
  padding: 4px;
}```

### C Heading Media Line

**Instances found:** 3

**CSS classes:** `.c-heading-media_line`

**HTML structure:**

```html
<div class="c-heading-media_line"> <div aria-hidden="true"> We …</div> </div>
```

**Base styles (from design tokens):**

```css
.c-heading-media_line {
  background: #eaeff2;
  padding: 4px;
}```

### C Grid List Title

**Instances found:** 3

**CSS classes:** `.c-grid-list_title` `.heading-xs`

**HTML structure:**

```html
<div class="c-grid-list_title heading-xs"> <span>(&nbsp;1&nbsp;)</span> <h3>Flawless Execution</h3> </div>
```

**Base styles (from design tokens):**

```css
.c-grid-list_title {
  background: #eaeff2;
  padding: 4px;
}```

### C Grid List Image

**Instances found:** 3

**CSS classes:** `.c-grid-list_image`

**HTML structure:**

```html
<div class="c-grid-list_image"> <div class="c-image -rounded -cover -parallax -lazy-load"> <c-parallax-image id="parallaximage-3" style="--parallax-scale: 1.1547213114754098;"> <div class="c-image_parallax" data-scroll="" data-scroll-speed="-.03" data-scroll-ignore-fold="true"> <picture class="c-image_inner"> <img class="c-image_img" src="https://trucknroll.com/uploads/uploads/_thumbnail/2352/SHOT03_251111_Truck_n_Roll_0197-Edit.webp" width="860" height="600" alt="SHOT03 251111 Truck n Roll 0197 Edit" loading="lazy" onload="this.classList.add('is-loaded'); this.parentNode.parentNode.classList.
```

**Base styles (from design tokens):**

```css
.c-grid-list_image {
  background: #eaeff2;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#2c2f31` for all dividers within components
- Use `#4e37ff` for all interactive/active states

