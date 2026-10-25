# Third-party assets and provenance

## In use

Two photographs of a clay court, supplied by the owner on 25 Oct 2026, no people in either:

| Files | What | Source | Licence |
|---|---|---|---|
| `public/media/hero-clay.jpg`, `hero-clay-portrait.jpg` | Top-down drone view of a clay court at low sun (cropped to 16:9 for wide screens, full frame for phones, recompressed) | https://www.pexels.com/pl-pl/zdjecie/sport-pomarancza-pomaranczowy-tenis-21230602/ (Pexels photo 21230602) | Pexels License, https://www.pexels.com/license/ |
| `public/media/clay-texture.jpg`, `clay-texture-portrait.jpg` | Close-up of the clay surface and a worn court line (same treatment) | https://www.pexels.com/pl-pl/zdjecie/zblizenie-tekstury-linii-kortu-tenisowego-ziemnego-38381015/ (Pexels photo 38381015) | Pexels License |

**Not verified from here.** Pexels blocks automated access to its pages (HTTP 403 from Cloudflare), so the photo pages, creator names and licence badges could not be read. The image files were downloaded from the public Pexels image CDN using the photo IDs in the links. Please open both pages, confirm they are marked as free to use, and add the creator names here (and as credit on the site if you want to give one; the Pexels License does not require it).

The earlier stock still of a player (Pexels video 4902771) was removed on 24 Oct 2026 and deleted.

## Candidates reviewed and not used

- **https://www.pexels.com/video/a-young-man-is-playing-tennis-on-a-court-17143342/ (rejected).** Pexels blocked automated access to this page, so its license information could not be verified (and the brief requires verification before use). Separately, the footage itself was inspected from the public file: it is 2.6 s long, the player throws a large ball that looks like a volleyball, holds no racquet, and the clip ends with him walking. It does not show a tennis serve, so it fails the authenticity bar for this brand even if the license were confirmed. It also cannot loop cleanly.
- **https://www.pexels.com/video/aerial-view-of-tennis-player-serving-on-court-40482603/ (not used, not verified).** Pexels blocked automated access to this page and the video file could not be retrieved, so neither the license nor the footage could be checked. Nothing was shipped. If you open the page yourself, confirm it is marked free and download the file, it could be considered for a future tactical section; there is currently no slot for it.

## Tactical footage search (24 Oct 2026)

The brief asked for authentic match footage with a clear court view as the base of the tactical report. None could be verified, so the report uses a drawn perspective court instead of a photograph.

- Pexels pages for 17143342 and 40482603 are still blocked by Cloudflare for automated access (HTTP 403), so their licences cannot be verified from here.
- Wikimedia Commons was searched for CC0 / public domain tennis photographs. Nothing fit: the larger CC0 files are scoreboards or portraits, one is a 1912 album print, one is an Australian Open close-up of an identifiable professional, and "Tennis championships at RSTM" (Cantabrucu, CC0) is a night snapshot from a club terrace in which spectators are identifiable and umbrellas hide most of the court. Using identifiable professionals would also mean attaching invented tactics to real people.
- Best path forward: a frame from your own match footage (filmed from behind the baseline, 3 to 5 m up), or a Pexels clip you open and confirm yourself. The code is ready for it (see "Tactical court view" in `DESIGN_SYSTEM.md`).
