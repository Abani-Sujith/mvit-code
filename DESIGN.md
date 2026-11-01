# Design System Specification (Stitch Redesign: CODE 26)

This document serves as the single source of truth for the visual redesign of **CODE 26** (Code Tracker Mentorship Dashboard).

---

## 1. Typography

The design uses Google Fonts loaded in `index.html` and `src/index.css`:
- **Display & Headlines**: `Anton` (sans-serif, bold, uppercase display typography)
- **Body, Labels & Titles**: `Space Grotesk` (weights: 400, 500, 700)
- **Icons**: `Material Symbols Outlined` (Google Fonts) and `Lucide React` icons styled consistently with clean lines.

### Font Hierarchy & Scale

| Token | Family | Size | Line Height | Weight | Letter Spacing | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `font-display-xl` | Anton | 96px | 96px | 400 | 0.02em | Uppercase |
| `font-display-xl-mobile` | Anton | 56px | 56px | 400 | 0.01em | Uppercase |
| `font-headline-lg` | Anton | 64px | 64px | 400 | 0.02em | Uppercase |
| `font-headline-md` | Anton | 40px | 44px | 400 | 0.02em | Uppercase |
| `font-headline-sm` | Anton | 24px | 28px | 400 | 0.03em | Uppercase |
| `font-title-md` | Space Grotesk | 20px | 26px | 700 | -0.01em | Normal / Uppercase |
| `font-body-lg` | Space Grotesk | 18px | 28px | 400 | Normal | Normal |
| `font-body-md` | Space Grotesk | 15px | 22px | 400 | Normal | Normal |
| `font-label-lg` | Space Grotesk | 14px | 18px | 700 | 0.04em | Uppercase |
| `font-label-sm` | Space Grotesk | 11px | 14px | 700 | 0.06em | Uppercase |

Font link for `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

---

## 2. Color Palette & Tokens

All colors are exposed through Tailwind theme tokens and mapped via CSS variables.

| Token Name | Hex Value | Purpose / Role |
| :--- | :--- | :--- |
| `primary` | `#a73400` | Deep terracotta brand accent / hover state |
| `primary-container` | `#d14300` | Vibrant primary flame accent (stat numbers, active indicators) |
| `on-primary` | `#ffffff` | Text on primary containers |
| `primary-fixed` | `#ffdbcf` | Light terracotta chip background |
| `ink-black` | `#000000` | Brutalist solid borders, pill badges, primary CTA button |
| `pure-white` | `#ffffff` | Card surfaces, button fills, modal backgrounds |
| `surface` | `#fff8f6` | Application background (warm off-white) |
| `surface-tint` | `#F9E2E1` | Header status strips, table header rows, soft highlight callouts |
| `surface-container` | `#f8ebe7` | Inactive chip fills, neutral badges |
| `surface-container-high`| `#f2e6e2` | Card accents, hover fills |
| `surface-container-highest` | `#ece0dc` | Alternating table row background |
| `surface-container-lowest` | `#ffffff` | Clean white nested container background |
| `on-surface` | `#201a18` | Primary text content |
| `on-surface-variant` | `#5c4037` | Secondary text, subtle captions |
| `secondary` | `#5e5e5e` | Neutral muted text, dividers |
| `secondary-container` | `#e2e2e2` | Secondary action fills |
| `tertiary` | `#005ea4` | Tech telemetry / link accent |
| `tertiary-container` | `#0077ce` | Platform highlight |
| `error` | `#ba1a1a` | Alert / critical status indicator |
| `error-container` | `#ffdad6` | Critical alert background |
| `outline` | `#907065` | Muted borders |
| `outline-variant` | `#e5beb2` | Subtle divider borders |

---

## 3. Shape & Corner Radii

- `rounded-full` (`9999px`): Used for navigation pills, badge stickers, buttons, chips, avatar rings.
- `rounded-3xl` (`1.5rem` / `24px`): Used for stat cards, table wrappers, control bars.
- `rounded-2xl` (`1rem` / `16px`): Used for student row items, callout banners.
- `border` / `border-ink-black`: Solid 1px black brutalist border lines (`border border-ink-black`).

---

## 4. Spacing Scale

- `margin`: `3rem` (Desktop page padding)
- `margin-mobile`: `1.25rem` (Mobile page padding)
- `gutter`: `1.5rem`
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `1rem` (16px)
- `space-lg`: `1.5rem` (24px)
- `space-xl`: `2.5rem` (40px)

---

## 5. Distinctive Aesthetic Rules
- **No glassmorphism**: Absolutely no `backdrop-blur`, `glass-card`, or blurry gradient blobs.
- **No gradient cards**: Replace all `bg-gradient-*` with flat `bg-pure-white` or `bg-surface`.
- **Brutalist sticker tags**: Badges with pill shapes and slight rotation (`-rotate-2`, `rotate-3`, `-rotate-3`).
- **High-contrast table rows**: Black text on white/tinted rows with clear tabular numerals (`tabular-nums font-mono` or `Space Grotesk`).
- **All buttons**: Pill shaped (`rounded-full`), solid border (`border border-ink-black`), uppercase tracking-wider text.
