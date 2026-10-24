# Tactical Tennis Lab design system

Source of truth: `src/app/globals.css` (tokens, radii, shadows, component classes). Names of the colour tokens are unchanged from earlier versions, so existing utilities (`bg-brand-600`, `text-body`, `border-line`) follow the current identity automatically.

## Principles
1. **Credible and calm.** An academy director should read this as a serious analysis tool, not a consumer app.
2. **Sharp.** Small radii, 1px borders, short shadows. The logo is geometric and so is the interface.
3. **Every element earns its place.** No decoration that carries no information. No invented testimonials or photos.
4. **One primary action per section.**

## Colour (from the logo)
| Role | Token | Light | Dark |
|---|---|---|---|
| Brand dark (header, hero, footer) | `forest` | `#192f22` | same |
| Cream | `cream` | `#f1f0df` | same |
| Olive / gold accent | `gold` | `#a8a85c` | same |
| Page background | `background` | `#f5f4ea` | `#101c15` |
| Card surface | `surface` | `#fbfaf4` | `#16261c` |
| Muted band | `surface-muted` | `#efeedf` | `#12201a` |
| Border | `line` | `#d6d5be` | `#2c4636` |
| Text, headings | `ink` | `#14231a` | `#f1f0df` |
| Text, body | `body` | `#384539` | `#cfd2bf` |
| Text, secondary | `muted` | `#5d6857` | `#98a38f` |
| Primary action | `brand-600` | `#24432f` | `#a9a95d` |
| Text on primary action | `on-brand` | `#f6f5e8` | `#14231a` |
| Label / accent text | `gold-ink` | `#6c6c38` | `#b9b96a` |

Rules: use `on-brand` (never `text-white`) on `bg-brand-600`. Header, footer and hero are permanently dark; add the `dark` class to such a container so every token inside resolves to its dark value.

## Typography (Geist Sans, Geist Mono; no extra fonts)
| Class | Size (fluid) | Use |
|---|---|---|
| `t-display` | 40 to 72px, 700, tracking -3.5% | hero headline only |
| `t-h2` | 28 to 40px, 700 | section titles |
| `text-xl font-semibold` | 20px | card titles |
| `t-lead` | 17 to 20px | section intro |
| body | 16px; 15px inside cards | |
| caption | 13px | notes, meta |
| `eyebrow` | 12px, uppercase, +14% tracking, `gold-ink` | labels above titles |
| `t-mono` | Geist Mono, tabular figures | prices, percentages, review stats |

## Spacing and layout
- 4px base unit.
- Section rhythm `section-pad`: 96px desktop, about 72px tablet, 48px phone.
- `container-x`: max 1152px, side padding 24px (16px on phones).
- Grids: 3 columns on desktop, 2 on tablet, 1 on phone. Pricing: 5 across on desktop, 3+2 on tablet, a swipeable strip on phones with the next card peeking in.
- Section backgrounds alternate: page, muted, dark. No gradient bands between sections.

## Shape
Radii: 2px chips, 4px buttons and inputs, 6px cards, 8px large panels, `rounded-full` only for avatars and the play button. Shadows: `shadow-sm` for cards at rest, `shadow-md` on hover, `shadow-lg` for the featured card. No blur and no 3D tilt on text.

## Components
- **Buttons:** `.btn` plus `.btn-primary` (forest, cream text), `.btn-secondary` (outline), `.btn-on-dark` (cream, for dark sections), `.btn-ghost-dark`. Minimum height 44px. Hover changes colour only, nothing moves.
- **Navigation:** permanently dark forest bar with the logo; 12px of vertical padding; admin links grouped in an Admin menu so the bar never overflows; hamburger below `lg`.
- **Cards:** `.card` (1px border, 6px radius), add `.card-hover` when the whole card is a target.
- **Forms:** `.field` (44px tall, 4px radius, gold focus ring), errors in red with text, never colour alone.
- **Upload:** `.dropzone` (dashed olive border, calm; `data-dragging="true"` gives the active state), `.progress` for upload progress. Video reviews use a click to load tile so nothing downloads before play.

## Imagery
- **Photography:** none is invented. Use only real coaches and players, with consent, in 4:5 portrait or 16:9, on one consistent treatment. The coaches section is ready for portraits once they exist.
- **Analysis visuals:** report layout with findings on the left and instruments on the right (court diagram, percentage bars in mono). Anything illustrative carries an "Illustrative example" badge until real, consented reports replace it.

## Responsive behaviour
| Width | Behaviour |
|---|---|
| under 640px | one column, 44px buttons stack, pricing swipes, report stacks, hamburger menu |
| 640 to 1023px | two columns, pricing 3+2, report in two columns |
| 1024px and up | full navigation, three-column grids, five pricing cards across |
