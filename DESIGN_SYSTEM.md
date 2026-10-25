# Tactical Tennis Lab design system

Calm, premium, editorial. Bright white, near-black type, quiet greys, with the tactical court view doing the talking. The single accent is the olive of the logo, which lives in the logo itself.

Source of truth: `src/app/globals.css` (tokens, radii, shadows, type scale, component classes). Colour token names (`brand-600`, `ink`, `body`, `line` ...) are stable, so every utility follows the palette.

## Principles
1. **Premium, not promotional.** Few words, large type, a lot of white space.
2. **Every element earns its place.** No decorative icons, no gradients, no repetitive card grids. Structure comes from hairlines and spacing.
3. **Honest imagery.** No stock people; the visuals are the court view and the report. No invented testimonials or statistics. Anything illustrative is labelled.
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
- **Analysis visuals:** `CourtDiagram` (top-down court drawn to scale, fine lines, lime landing dots, dotted flight paths) is used in the tactical before and after and in the report preview. The report separates **Observed** (what the coach saw) from **Priority** and **Recommended next step** (what to do), and shows no statistics. Everything is labelled illustrative; replace it with a real, consented report when one exists.
- **Charcoal chapter:** the hero and the report sit in `.theme-charcoal`: near black surfaces with the site's normal dark palette (light pill buttons, olive accent). Only the dashboard keeps the lime token set (`.theme-dashboard`).

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

## Motion

Motion explains or confirms; it never decorates. Short, one easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), only `transform` and `opacity`, nothing loops, and every effect is switched off under `prefers-reduced-motion`.

| Where | What | How |
|---|---|---|
| Hero headline | Words slide up through a mask, 40ms apart, 0.6s each | CSS only (`RevealWords`), text is in the HTML from the first byte |
| Hero scene | The drone photograph breathes (scale 1 to 1.08 over 20s, ease in out, back and forth). While scrolling, the hero stays pinned, the drone view scales to 1.4 and fades and the clay texture fades in underneath, then dims into the charcoal chapter (a short 140svh track on wide screens, 120svh on phones; the report section overlaps the end of the track by 40svh / 20svh and slides up over the texture, so the screen is never empty; the dark overlay is capped at 35%) | Framer Motion `useScroll` into a clamped motion value, then `useTransform`; transform and opacity only. Phones get a plain crossfade (no scaling). Reduced motion: static drone photograph, single screen |
| Glass surfaces | Report panel, view switch and note rise once on entering the viewport: opacity 0 to 1, 24px up, 8px blur clearing, staggered 80ms | `GlassReveal` (Framer Motion `whileInView`, once). Reduced motion: opacity fade only |
| Section entrances | 16px rise and fade, 0.55s | `Reveal` (IntersectionObserver) |
| Service rows | Soft row highlight on hover or focus | CSS, 0.3s |
| Buttons | Colour or opacity on hover, 2% press | CSS |

Apart from the hero scene above there is no parallax and no pinned section. Nothing else loops or moves on its own.

## Page structure (homepage)

1. **Hero and tactical report** (one charcoal chapter): one headline, one sentence and one primary action over two clay court photographs, then the court view with the written report. The photographs are the hero background and the descent into the report; the report is the product proof.
2. **Credentials**: one quiet line of text.
3. **Services**, **How it works** (the brand statement and three steps), **Pricing**, **Reviews**, **Coaches**, **Backing**, **Closing call to action**.

Dark is used for the first chapter only. It meets the page background (light or dark) through a rounded sheet (rounded top corners, soft upward shadow) that overlaps its bottom edge, so the edge is deliberate in both themes. The hero and texture photographs are pre-processed charcoal duotones (shadows `#0d0f11`, surface highlights `#3a3f45`, court lines near white with a soft lime tint), cropped so the baseline sits above the headline and the sidelines frame it; a radial scrim darkens the area behind the text. Services and pricing sit on the texture as a quiet backdrop (about 30% visible in dark mode, 12% under a light veil in light mode, top and bottom edges masked out, slow parallax on wide screens only) with the service rows and package rows as glass panels (`.glass-panel`). Lime (#c8f135) is used only for the court drawing: landing markers, zones, ball flights and the tint on the court lines in the photographs. Buttons, badges, numbers and rules use the normal palette.

## Tactical court view (`SampleAnalysisMock`, `src/lib/court.ts`)

A perspective view of a doubles court drawn to scale (23.77 m by 10.97 m). `makeCamera` maps court metres onto the frame from four corner points, so every line, zone, marker and ball flight follows the same perspective and stays aligned at any size. Annotations (zone, returner position, flights) are defined in metres in `SampleAnalysisMock.tsx` and are **illustrative, not match data**: the frame carries a visible note saying so, and the report is badged as an illustrative example.

- Two views of one example, switched by a keyboard accessible tab control: **Observed** (second serves land in one zone, the returner steps in) and **Recommended** (mix the targets).
- Three numbered annotations tie the drawing to the text: 1 and 2 to the observations, 3 to the recommended step.
- The report panel is the only glass surface (low opacity white, 24px blur, fine border, soft shadow). It overlays the dark side of the frame from 1280px and stacks below it on smaller screens.
- On narrow screens the 16:10 stage is drawn wider than the window and cropped, so the court stays large. No video, nothing loops, nothing moves unless the visitor switches the view.
- **To use a real match frame:** put the image behind the SVG, measure the four court corners as fractions of the frame, and replace `CORNERS`; the marks then land on the real court. Only do this with footage whose licence has been verified (see `ASSETS.md`) or your own.

## Client dashboard (prototype, `/dashboard`)

An app, not a brochure: a working tool with its own dark theme, applied by wrapping the dashboard in `.theme-dashboard` (it re-points the same tokens, so `.btn`, `.card`, `.field`, `.progress` all work inside it).

**Status: prototype.** Admin-only, English only, sample data (`src/lib/dashboardSample.ts`), nothing is stored, uploaded or sent. Every screen carries a "Prototype. Sample data only" bar. It is not linked from the public site.

| Token | Value |
|---|---|
| Page | `#121417` |
| Surface | `#1a1d21` (panels), `#15181b` (rail), `#22262b` (chips) |
| Hairline | `#2a2f35`; control borders `#707b85` (3.9:1 on panels) |
| Text | `#f4f6f7` headings, `#d0d5d9` body, `#98a2ab` secondary (6.5:1 on surface) |
| Accent | lime `#c8f135`: primary action, active nav, progress, current item, "reviewed" |
| Semantic | amber `#f5a524` for technical issues, periwinkle `#9fb6ff` for tactical notes, used only as small dots and labels |

**Information hierarchy.** Video analysis is the centre: the viewer takes the main column on desktop (the feedback sits in a sticky right column) and comes first on phones. The coach's **priorities** are always visible above the **Strengths / Technical issues / Tactical** tabs, because they answer "what do I do next". Observations are linked to timestamps and highlight the matching marker and on-frame pin.

**Viewer.** Play and pause, back and forward 5 seconds, frame by frame (steps of 1/fps; the frame rate is selectable because browsers do not expose it), speed 0.25x to 2x, loop, a seek bar with the coach's markers, mm:ss.cc readout with frame number, and keyboard shortcuts (Space, comma, period, arrows). The prototype plays a video chosen on the device only.

**Navigation.** A compact icon rail on tablets (icons plus labels from 1280px), a bottom bar with five destinations and a More menu on phones.

**Honesty rules.** No scores or "AI" claims anywhere: all feedback is written by a coach. Statuses are limited to the two the platform has (awaiting review, reviewed). Notifications and settings only describe what exists today (email when feedback is ready, new-message email, browser push).

**What a production version still needs** (not in the prototype): tables for timestamped observations, the four-part structured feedback and training plans with completion state; coach-side tools to write them; linking purchases to analyses; and storing messages and settings.
