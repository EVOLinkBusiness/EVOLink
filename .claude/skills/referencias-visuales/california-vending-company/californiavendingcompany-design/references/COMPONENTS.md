# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Div** | unknown | 8× |  |
| **Bg White** | unknown | 6× | `.bg-white`, `.border`, `.border-stone-200` |
| **Bg Brand Subtle** | card | 6× | `.bg-brand-subtle`, `.flex`, `.h-10` |
| **Font Heading** | unknown | 6× | `.font-heading`, `.font-semibold`, `.mt-4` |
| **Leading Relaxed** | unknown | 6× | `.leading-relaxed`, `.mt-2`, `.text-sm` |
| **Font Semibold** | unknown | 6× | `.font-semibold`, `.text-[#1E293B]`, `.text-sm` |
| **Bg White** | button | 6× | `.bg-white`, `.border`, `.border-stone-200` |
| **Not Last:Border B** | unknown | 6× | `.not-last:border-b` |
| **Flex** | unknown | 6× | `.flex` |
| ****:Data [Slot=Accordion Trigger Icon]:Ml Auto** | button | 6× | `.**:data-[slot=accordion-trigger-icon]:ml-auto`, `.**:data-[slot=accordion-trigger-icon]:size-4`, `.**:data-[slot=accordion-trigger-icon]:text-muted-foreground` |
| **Aria Invalid:Border Destructive** | unknown | 3× | `.aria-invalid:border-destructive`, `.aria-invalid:ring-3`, `.aria-invalid:ring-destructive/20` |
| **Max W [1280px]** | unknown | 3× | `.max-w-[1280px]`, `.mx-auto`, `.px-4` |
| **Text Center** | unknown | 3× | `.text-center` |
| **Font Bold** | unknown | 3× | `.font-bold`, `.font-heading`, `.leading-[1.2]` |
| **Max W 2xl** | unknown | 3× | `.max-w-2xl`, `.mt-4`, `.mx-auto` |
| **Bg White** | unknown | 3× | `.bg-white`, `.border`, `.border-stone-200` |
| **Bg Brand Subtle** | card | 3× | `.bg-brand-subtle`, `.flex`, `.h-12` |
| **Font Heading** | unknown | 3× | `.font-heading`, `.font-semibold`, `.leading-[1.3]` |
| **Leading Relaxed** | unknown | 3× | `.leading-relaxed`, `.mt-3`, `.text-stone-500` |
| **Flex** | unknown | 3× | `.flex`, `.flex-col`, `.gap-2.5` |

## Cards

### Bg Brand Subtle

**Instances found:** 6

**CSS classes:** `.bg-brand-subtle` `.flex` `.h-10` `.items-center` `.justify-center` `.rounded-lg`

**HTML structure:**

```html
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-5 w-5 text-brand" aria-hidden="true"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
```

**Base styles (from design tokens):**

```css
.bg-brand-subtle {
  background: #0c0a09;
  border: 1px solid #44403c;
  border-radius: 11.2px;
  padding: 8px;
}```

### Bg Brand Subtle

**Instances found:** 3

**CSS classes:** `.bg-brand-subtle` `.flex` `.h-12` `.items-center` `.justify-center` `.mx-auto`

**HTML structure:**

```html
<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list h-6 w-6 text-brand" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></pa
```

**Base styles (from design tokens):**

```css
.bg-brand-subtle {
  background: #0c0a09;
  border: 1px solid #44403c;
  border-radius: 11.2px;
  padding: 8px;
}```

## Buttons

### Bg White

**Instances found:** 6

**CSS classes:** `.bg-white` `.border` `.border-stone-200` `.duration-150` `.flex` `.flex-col`

**HTML structure:**

```html
<button type="button" class="flex w-full flex-col items-center gap-3 rounded-xl border p-6 text-center transition-colors duration-150 border-stone-200 bg-white hover:border-brand hover:bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-warehouse h-8 w-8 text-[#1E293B]" aria-hidden="true"><path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"></path><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 
```

**Base styles (from design tokens):**

```css
.bg-white {
  background: #e40014;
  color: #1d293d;
  border-radius: 11.2px;
  padding: 4px 8px;
  cursor: pointer;
}```

### **:Data [Slot=Accordion Trigger Icon]:Ml Auto

**Instances found:** 6

**CSS classes:** `.**:data-[slot=accordion-trigger-icon]:ml-auto` `.**:data-[slot=accordion-trigger-icon]:size-4` `.**:data-[slot=accordion-trigger-icon]:text-muted-foreground` `.border` `.border-transparent` `.disabled:opacity-50`

**HTML structure:**

```html
<button type="button" aria-controls="radix-_R_2d6autb_" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-_R_d6autb_" data-slot="accordion-trigger" class="group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-
```

**Base styles (from design tokens):**

```css
.**:data-[slot=accordion-trigger-icon]:ml-auto {
  background: #e40014;
  color: #1d293d;
  border-radius: 11.2px;
  padding: 4px 8px;
  cursor: pointer;
}```

## Other Components

### Div

**Instances found:** 8

**HTML structure:**

```html
<div class="" style="opacity:0;transform:translateY(20px)"><button type="button" class="flex w-full flex-col items-center gap-3 rounded-xl border p-6 text-center transition-colors duration-150 border-brand bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2 lucide-building-2 h-8 w-8 text-[#1E293B]" aria-hidden="true"><path d="M10 12h4"></path><path d="M10 8h4"></path><path d="M14 21v-3a2 2 0 0 0-4 0v3"></path><path d="M
```

**Base styles (from design tokens):**

```css
.div {
  background: #0c0a09;
  padding: 4px;
}```

### Bg White

**Instances found:** 6

**CSS classes:** `.bg-white` `.border` `.border-stone-200` `.p-6` `.rounded-xl`

**HTML structure:**

```html
<div class="rounded-xl border border-stone-200 bg-white p-6" style="opacity:0;transform:translateY(20px)"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-5 w-5 text-brand" aria-hidden="true"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div><h3 class="mt-4 font-heading text-l
```

**Base styles (from design tokens):**

```css
.bg-white {
  background: #0c0a09;
  padding: 4px;
}```

### Font Heading

**Instances found:** 6

**CSS classes:** `.font-heading` `.font-semibold` `.mt-4` `.text-[#1E293B]` `.text-lg`

**HTML structure:**

```html
<h3 class="mt-4 font-heading text-lg font-semibold text-[#1E293B]">100% Free for Your Location</h3>
```

**Base styles (from design tokens):**

```css
.font-heading {
  background: #0c0a09;
  padding: 4px;
}```

### Leading Relaxed

**Instances found:** 6

**CSS classes:** `.leading-relaxed` `.mt-2` `.text-sm` `.text-stone-500`

**HTML structure:**

```html
<p class="mt-2 text-sm leading-relaxed text-stone-500">No installation fees, no monthly costs, no contracts. Vending operators cover all expenses because they earn from product sales.</p>
```

**Base styles (from design tokens):**

```css
.leading-relaxed {
  background: #0c0a09;
  padding: 4px;
}```

### Font Semibold

**Instances found:** 6

**CSS classes:** `.font-semibold` `.text-[#1E293B]` `.text-sm`

**HTML structure:**

```html
<span class="text-sm font-semibold text-[#1E293B]">Offices</span>
```

**Base styles (from design tokens):**

```css
.font-semibold {
  background: #0c0a09;
  padding: 4px;
}```

### Not Last:Border B

**Instances found:** 6

**CSS classes:** `.not-last:border-b`

**HTML structure:**

```html
<div data-state="closed" data-orientation="vertical" data-slot="accordion-item" class="not-last:border-b"><h3 data-orientation="vertical" data-state="closed" class="flex"><button type="button" aria-controls="radix-_R_2d6autb_" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-_R_d6autb_" data-slot="accordion-trigger" class="group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:borde
```

**Base styles (from design tokens):**

```css
.not-last:border-b {
  background: #0c0a09;
  padding: 4px;
}```

### Flex

**Instances found:** 6

**CSS classes:** `.flex`

**HTML structure:**

```html
<h3 data-orientation="vertical" data-state="closed" class="flex"><button type="button" aria-controls="radix-_R_2d6autb_" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-_R_d6autb_" data-slot="accordion-trigger" class="group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:d
```

**Base styles (from design tokens):**

```css
.flex {
  background: #0c0a09;
  padding: 4px;
}```

### Aria Invalid:Border Destructive

**Instances found:** 3

**CSS classes:** `.aria-invalid:border-destructive` `.aria-invalid:ring-3` `.aria-invalid:ring-destructive/20` `.bg-white/10` `.border` `.border-white/20`

**HTML structure:**

```html
<input data-slot="input" class="h-12 w-full min-w-0 overflow-hidden text-ellipsis rounded-lg border px-4 py-3 text-base transition-colors outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive
```

**Base styles (from design tokens):**

```css
.aria-invalid:border-destructive {
  background: #0c0a09;
  padding: 4px;
}```

### Max W [1280px]

**Instances found:** 3

**CSS classes:** `.max-w-[1280px]` `.mx-auto` `.px-4` `.py-20` `.w-full`

**HTML structure:**

```html
<section class="mx-auto w-full max-w-[1280px] px-4 py-20 md:px-6 lg:px-8"><div class="text-center" style="opacity:0;transform:translateY(20px)"><p class="text-xs font-semibold uppercase tracking-[0.06em] text-brand-text">How It Works</p><h2 class="mt-3 font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1E293B] md:text-[40px]">How Our Vending Machine Service Works</h2><p class="mx-auto mt-4 max-w-2xl text-stone-500">Getting a vending machine in California …</p></div><div class="mt-12 grid gap-8 md:grid-cols-3"><div class="rounded-xl border border-stone-200 bg-white p-8 t
```

**Base styles (from design tokens):**

```css
.max-w-[1280px] {
  background: #0c0a09;
  padding: 4px;
}```

### Text Center

**Instances found:** 3

**CSS classes:** `.text-center`

**HTML structure:**

```html
<div class="text-center" style="opacity:0;transform:translateY(20px)"><p class="text-xs font-semibold uppercase tracking-[0.06em] text-brand-text">How It Works</p><h2 class="mt-3 font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1E293B] md:text-[40px]">How Our Vending Machine Service Works</h2><p class="mx-auto mt-4 max-w-2xl text-stone-500">Getting a vending machine in California …</p></div>
```

**Base styles (from design tokens):**

```css
.text-center {
  background: #0c0a09;
  padding: 4px;
}```

### Font Bold

**Instances found:** 3

**CSS classes:** `.font-bold` `.font-heading` `.leading-[1.2]` `.mt-3` `.text-[#1E293B]` `.text-[28px]`

**HTML structure:**

```html
<h2 class="mt-3 font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1E293B] md:text-[40px]">How Our Vending Machine Service Works</h2>
```

**Base styles (from design tokens):**

```css
.font-bold {
  background: #0c0a09;
  padding: 4px;
}```

### Max W 2xl

**Instances found:** 3

**CSS classes:** `.max-w-2xl` `.mt-4` `.mx-auto` `.text-stone-500`

**HTML structure:**

```html
<p class="mx-auto mt-4 max-w-2xl text-stone-500">Getting a vending machine in <!-- -->California<!-- --> has never been easier. No complicated contracts, no costs, no hassle — just full-service vending.</p>
```

**Base styles (from design tokens):**

```css
.max-w-2xl {
  background: #0c0a09;
  padding: 4px;
}```

### Bg White

**Instances found:** 3

**CSS classes:** `.bg-white` `.border` `.border-stone-200` `.p-8` `.rounded-xl` `.text-center`

**HTML structure:**

```html
<div class="rounded-xl border border-stone-200 bg-white p-8 text-center" style="opacity:0;transform:translateY(20px)"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list h-6 w-6 text-brand" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1
```

**Base styles (from design tokens):**

```css
.bg-white {
  background: #0c0a09;
  padding: 4px;
}```

### Font Heading

**Instances found:** 3

**CSS classes:** `.font-heading` `.font-semibold` `.leading-[1.3]` `.mt-5` `.text-[#1E293B]` `.text-[22px]`

**HTML structure:**

```html
<h3 class="mt-5 font-heading text-[22px] font-semibold leading-[1.3] text-[#1E293B]">1. Request</h3>
```

**Base styles (from design tokens):**

```css
.font-heading {
  background: #0c0a09;
  padding: 4px;
}```

### Leading Relaxed

**Instances found:** 3

**CSS classes:** `.leading-relaxed` `.mt-3` `.text-stone-500`

**HTML structure:**

```html
<p class="mt-3 text-stone-500 leading-relaxed">Tell us about your location — type, size, and what your people want. It takes less than 2 minutes.</p>
```

**Base styles (from design tokens):**

```css
.leading-relaxed {
  background: #0c0a09;
  padding: 4px;
}```

### Flex

**Instances found:** 3

**CSS classes:** `.flex` `.flex-col` `.gap-2.5` `.mt-4`

**HTML structure:**

```html
<ul class="mt-4 flex flex-col gap-2.5"><li><a class="text-sm text-stone-400 transition-colors hover:text-white" href="/services/snack-vending">Snack Vending</a></li><li><a class="text-sm text-stone-400 transition-colors hover:text-white" href="/services/beverage-vending">Beverage Vending</a></li><li><a class="text-sm text-stone-400 transition-colors hover:text-white" href="/services/micro-markets">Micro-Markets</a></li><li><a class="text-sm text-stone-400 transition-colors hover:text-white" href="/services/coffee-vending">Coffee Vending</a></li><li><a class="text-sm text-stone-400 transition-c
```

**Base styles (from design tokens):**

```css
.flex {
  background: #0c0a09;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#44403c` for all dividers within components
- Use `#e40014` for all interactive/active states

