# Site photography

Drop the image files in this folder, then register each one in
`src/lib/sitePhotos.ts` (one line per photo). Slots that are left as `null`
simply don't render, and the layout stays balanced without them.

Recommended files (JPEG or WebP, sRGB, under 400 KB each after export):

| Slot | Shape | Min. size | Subject |
|---|---|---|---|
| `hero` | 16:9 landscape, full bleed | 2400 x 1350 | A cinematic moment on court: serve, rally, coach and player. Keep the left half calm, the headline sits there. The photo drifts slowly behind the text as you scroll |
| `services[0]` | 4:3 | 1600 x 1200 | Stroke Analysis: a close stroke, or a coach with a tablet |
| `services[1]` | 4:3 | 1600 x 1200 | Training Programs: a session in progress |
| `services[2]` | 4:3 | 1600 x 1200 | Match Analysis: match play from behind the baseline |
| `coaches[<lowercase name>]` | 4:5 | 1200 x 1500 | Portrait of each coach |

Only use photos of real players and coaches, with their consent (and a
parent's for minors). Keep one consistent treatment across all of them.
