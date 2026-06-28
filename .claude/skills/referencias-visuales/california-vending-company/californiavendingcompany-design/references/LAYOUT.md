# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `body.flex.min-h-full` | column | — | — | — | 32 |
| `nav.mx-auto.flex` | row | space-between | center | — | 4 |
| `div.relative.flex` | row | center | — | — | 1 |
| `div.inline-flex.items-center` | row | — | center | 8px | 2 |
| `div.flex.flex-col` | column | — | — | — | 6 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | — | center | 12px | 2 |
| `button.flex.w-full` | column | center | center | 12px | 2 |
| `ul.mt-4.flex` | column | — | — | 10px | 5 |
| `ul.mt-4.flex` | column | — | — | 10px | 10 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.mt-12.grid` | `384px 384px 384px` | 32px | 3 |
| `div.mt-10.grid` | `292px 292px 292px 292px` | 16px | 8 |
| `div.grid.grid-cols-2` | `280px 280px 280px 280px` | 32px | 4 |
| `div.grid.items-center` | `576px 576px` | 64px | 2 |
| `div.mt-12.grid` | `389.328px 389.328px 389.344px` | 24px | 6 |

## Structural Containers

### `<header>` (`header.sticky.top-0`)

```
display:          block
children:         1
```

### `<main>` (`main#main.flex-1`)

```
display:          block
children:         8
```

### `<footer>` (`footer.border-t.border-stone-200`)

```
display:          block
children:         1
```

### `<nav>` (`nav.mx-auto.flex`)

```
display:          flex
flex-direction:   row
justify-content:  space-between
align-items:      center
padding:          0px 32px
max-width:        1280px
children:         4
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
children:         2
```

### `<section>` (`section.mx-auto.w-full`)

```
display:          block
padding:          80px 32px
max-width:        1280px
children:         2
```

### `<section>` (`section.bg-stone-50`)

```
display:          block
children:         1
```

### `<section>` (`section.mx-auto.w-full`)

```
display:          block
padding:          80px 32px
max-width:        1280px
children:         3
```

### `<section>` (`section.mx-auto.w-full`)

```
display:          block
padding:          80px 32px
max-width:        1280px
children:         2
```

### `<section>` (`section.bg-[#0C1B2A]`)

```
display:          block
children:         1
```

### `<section>` (`section.mx-auto.w-full`)

```
display:          block
padding:          128px 32px
max-width:        1280px
children:         1
```

### `<section>` (`section.mx-auto.w-full`)

```
display:          block
padding:          80px 32px
max-width:        1280px
children:         2
```

## Layout Rules

- **Container max-width:** `1280px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

