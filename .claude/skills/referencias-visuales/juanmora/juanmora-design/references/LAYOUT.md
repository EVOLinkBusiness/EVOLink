# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 30, 32, 40` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.container-2` | row | space-between | center | — | 3 |
| `section.section` | column | start | center | — | 1 |
| `section.section` | column | start | center | — | 2 |
| `section.section` | column | start | center | — | 1 |
| `section.section` | column | start | center | — | 2 |
| `section.section` | column | start | center | — | 1 |
| `section.section.footer` | column | center | center | — | 2 |
| `div.container-loader` | row | start | start | — | 2 |
| `ol.nav-social-wrapper.w-list-unstyled` | row | end | center | — | 4 |
| `div.service-headline-wrapper` | column | start | start | 14.4px | 2 |
| `div.work-cta-wrapper` | row | center | center | — | 2 |
| `div.benefits-main-wrapper` | column | start | center | — | 3 |
| `div.main-cta-wrapper` | row | center | center | — | 1 |
| `div.main-wrapper-footer` | column | end | center | — | 3 |
| `li.service-wrapper` | column | end | center | 115.2px | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.content-cta-wrapper` | `1322.8px` | 0px | 2 |

## Structural Containers

### `<main>` (`main.main`)

```
display:          block
children:         10
```

### `<section>` (`section.section`)

```
display:          flex
flex-direction:   column
justify-content:  start
align-items:      center
children:         1
```

### `<section>` (`section.section`)

```
display:          flex
flex-direction:   column
justify-content:  start
align-items:      center
children:         2
```

### `<section>` (`section.section`)

```
display:          flex
flex-direction:   column
justify-content:  start
align-items:      center
children:         1
```

### `<section>` (`section.section`)

```
display:          flex
flex-direction:   column
justify-content:  start
align-items:      center
children:         2
```

### `<section>` (`section.section`)

```
display:          flex
flex-direction:   column
justify-content:  start
align-items:      center
children:         1
```

### `<section>` (`section.section.footer`)

```
display:          flex
flex-direction:   column
justify-content:  center
align-items:      center
children:         2
```

## Layout Rules

- **Container max-width:** `100%` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

