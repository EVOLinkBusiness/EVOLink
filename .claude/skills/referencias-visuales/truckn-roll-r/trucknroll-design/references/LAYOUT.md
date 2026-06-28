# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `section.container.my-fluid-3xl` | column | — | — | 40.0024px normal | 2 |
| `div.c-modal-video_container.modal_container` | row | center | — | — | 2 |
| `div.c-modal-contact_container.modal_container` | row | end | end | — | 2 |
| `a.c-button.-color-accent` | row | — | — | — | 1 |
| `div.c-header_col` | row | — | — | — | 1 |
| `div.c-header_col` | row | space-between | — | — | 2 |
| `div.c-hero_col` | column | — | — | 8.00048px normal | 2 |
| `div.c-hero_col` | column | space-between | — | 8.00048px normal | 2 |
| `div.c-grid-list_item.inview-border` | column | start | start | 20.0012px normal | 5 |
| `div.c-grid-list_item.inview-border` | column | start | start | 20.0012px normal | 5 |
| `div.c-grid-list_item.inview-border` | column | start | start | 20.0012px normal | 5 |
| `div.flex.justify-between` | row | space-between | — | 20.0012px 10px | 1 |
| `div.md:col-start-1.md:col-end-2` | row | — | end | — | 1 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `header.c-header.pb-fluid-3xl` | `698px 698px` | normal 12.0007px | 2 |
| `section.c-hero.container` | `698px 698px` | normal 12.0007px | 2 |
| `div.grid.md:grid-cols-12` | `108.156px 108.156px 108.156px 108.156px 108.156px ` | 40.0024px 10px | 1 |
| `div.grid.md:grid-cols-12` | `108.156px 108.156px 108.156px 108.156px 108.156px ` | 40.0024px 10px | 2 |
| `div.c-grid-list` | `698px 698px` | 12.0007px | 3 |
| `div.grid.md:grid-cols-2` | `699px 699px` | 10px | 3 |
| `div.c-pre-footer_content.container` | `106.328px 106.328px 106.328px 106.328px 106.328px ` | 12.0007px | 2 |

## Structural Containers

### `<header>` (`header.c-header.pb-fluid-3xl`)

```
display:          grid
grid-template-columns: 698px 698px
gap:              normal 12.0007px
padding:          20.0012px 16.001px 150.009px
children:         2
```

### `<main>` 

```
display:          block
children:         8
```

### `<footer>` (`footer.c-footer.theme-dark`)

```
display:          block
children:         1
```

### `<nav>` (`nav.c-nav.c-sticky-header_nav`)

```
display:          block
children:         1
```

### `<section>` (`section.c-hero.container`)

```
display:          grid
grid-template-columns: 698px 698px
gap:              normal 12.0007px
padding:          0px 16.001px
children:         2
```

### `<section>` (`section.container.my-fluid-3xl`)

```
display:          flex
flex-direction:   column
justify-content:  —
align-items:      —
gap:              40.0024px normal
padding:          0px 16.001px
children:         2
```

### `<section>` (`section.container.my-fluid-3xl`)

```
display:          block
padding:          0px 16.001px
children:         2
```

### `<section>` (`section.container.my-fluid-3xl`)

```
display:          block
padding:          0px 16.001px
children:         1
```

### `<section>` (`section.container`)

```
display:          block
padding:          0px 16.001px
children:         1
```

### `<section>` (`section.container.my-5`)

```
display:          block
padding:          0px 16.001px
children:         2
```

### `<nav>` (`nav.c-modal-contact_nav`)

```
display:          block
children:         1
```

### `<section>` (`section.py-fluid-xl`)

```
display:          block
padding:          56.0034px 0px
children:         1
```

## Layout Rules

- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

