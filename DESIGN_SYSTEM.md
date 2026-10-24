# Tactical Tennis Lab design system

Calm, premium, editorial. Bright white, near-black type, quiet greys, and the photography doing the talking. The single accent is the olive of the logo, which lives in the logo itself.

Source of truth: `src/app/globals.css` (tokens, radii, shadows, type scale, component classes). Colour token names (`brand-600`, `ink`, `body`, `line` ...) are stable, so every utility follows the palette.

## Principles
1. **Premium, not promotional.** Few words, large type, a lot of white space.
2. **Every element earns its place.** No decorative icons, no gradients, no repetitive card grids. Structure comes from hairlines and spacing.
3. **Honest imagery.** No stock or invented photography; no invented testimonials. Anything illustrative is labelled.
4. **One primary action per section.**
5. **Accessible by default.** WCAG 2.1 AA: contrast, visible focus, labelled controls, reduced motion respected.

## Colour
| Role | Token | Light | Dark |
|---|---|---|---|
| Page | `background` | `#ffffff` | `#000000` |
| Muted band | `surface-muted` | `#f5f5f7` | `#0b0b0c` |
| Card / panel | `surface` | `#ffffff` | `#111113` |
| Hairline | `line` | `#e0e0e5` | `#2c2c2e` |
| Control border | `line-strong` | `#86868b` | `#6e6e73` |
| Headings | `ink` | `#1d1d1f` | `#f5f5f7` |
| Body | `body` | `#424245` | `#d2d2d7` |
| Secondary | `muted` | `#6e6e73` | `#a1a1a6` |
| Primary action | `brand-600` | `#1d1d1f` | `#f5f5f7` |
| Text on primary | `on-brand` | `#ffffff` | `#000000` |

Use `on-brand` (never `text-white`) on `bg-brand-600`. Brand dark colours (`forest`, `cream`, `gold`) are fixed and used only for the auth side panel, app icons and the OG image. Status colours (error red, warning amber, success green) are used only for state, never for decoration.

Form-control borders use `line-strong` to meet the 3:1 non-text contrast rule; a small base rule in `globals.css` enforces this for existing inputs.

## Typography (Geist Sans, Geist Mono)
| Class | Size (fluid) | Use |
|---|---|---|
| `t-display` | 48 to 104px, 600, tracking -4.5% | hero and closing headline only |
| `t-h2` | 32 to 56px, 600, tracking -3.5% | section titles |
| `t-h3` | 28 to 44px, 600 | service names |
| `t-lead` | 19 to 24px, `body` colour | section intro, one or two lines |
| body | 17px | rows, quotes, descriptions |
| caption | 14px | notes, metadata |
| `eyebrow` | 13px uppercase, +12% tracking, `muted` | label above a title |
| `t-mono` | Geist Mono, tabular figures | prices, percentages, indexes |

Headlines never exceed about 20 characters per line (`text-wrap: balance`). Paragraphs stay under about 34rem. Sentences are short.

## Spacing and layout
- 4px base unit.
- `section-pad`: 72px phone to 152px desktop, fluid. Sections alternate white and `surface-muted`, divided by whitespace, not borders or gradients.
- `container-x`: max 1200px, side padding 20px phone to 32px desktop.
- Layouts are horizontal rows divided by hairlines: title and summary on the left, detail on the right; three process steps in one row. Cards exist only for self-contained objects (the sample report, form panels).

## Shape and motion
- Radii: 8px small controls, 12px inputs, 20px cards and media, 28px large media, `rounded-full` for buttons and pills.
- Shadows are nearly absent: `shadow-sm` to `shadow-lg` are soft, low-opacity, used on the report panel only.
- Motion: a 20px fade-up on entry (about 0.7s), colour or opacity changes on hover (0.2s), an arrow nudging 2px on text links. Nothing scales, tilts, blurs or loops. Everything is disabled under `prefers-reduced-motion`.

## Components
- **Buttons:** `.btn .btn-primary` (black pill), `.btn .btn-secondary` (outline pill), `.link-arrow` (text link with arrow, underline on hover). Minimum height 46px. `.btn-on-dark` and `.btn-ghost-dark` remain for the dark auth panel.
- **Navigation:** translucent white bar (blurred), 56px, logo left, small grey links, one black pill for sign up, hamburger below `lg`; admin links grouped under Admin. A skip link ("Skip to content") is the first focusable element.
- **Lists:** services, pricing and credentials are hairline-separated rows, not cards.
- **Forms:** `.field` (46px, 12px radius, ink focus ring plus soft halo); every control has an associated `<label>`; errors in red text, never colour alone.
- **Upload:** `.dropzone` (dashed `line-strong` border, `data-dragging="true"` for the active state), `.progress` for upload progress. Video reviews show a play tile and download nothing until pressed.

## Imagery
- **Photography:** large and editorial, from real sessions only, with consent (and a parent's for minors). Slots are configured in `src/lib/sitePhotos.ts` (hero, one per service, one portrait per coach). A slot left `null` renders nothing and the page stays balanced. Sizes and subjects are in `public/photos/README.md`. Use one consistent treatment (natural light, neutral grade).
- **Analysis visuals:** a structured report (findings left, instruments right), a top-down court diagram, and percentage bars set in mono. The current example is illustrative and says so in its badge; replace it with a real, consented report when one exists.

## Responsive behaviour
| Width | Behaviour |
|---|---|
| under 768px | one column; rows stack (title, summary, detail); report stacks; buttons keep 46px height; hamburger menu |
| 768 to 1023px | two-column rows; process in three columns; hamburger menu |
| 1024px and up | full navigation; 12-column rows (5 + 7); pricing ledger with a fixed price column |

## Accessibility checklist (verified with axe-core on the homepage, pricing, FAQ, sign-in and contact, light and dark, five languages)
- Contrast (measured): `muted` on white 5.1:1 and on the grey band 4.7:1, in dark mode 8.2:1; `body` 10.0:1; `ink` 16.8:1; control borders 3.6:1 (light) and 4.1:1 (dark). No text below 4.5:1.
- One `h1`, ordered headings, one `main` landmark, a skip link.
- Visible 2px focus outline with offset on every interactive element.
- Links inside running text are underlined.
- All form controls labelled; decorative images hidden from assistive technology.
