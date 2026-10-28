# Analysis import format

The coach report editor (admin: `/submissions/<id>`, button **Import analysis JSON**) reads a project file
exported by the local analysis tool and fills the observations and the summary from it. Nothing is
published by an import: the coach reviews and edits everything, then saves a draft or publishes.

The format is versioned. This document describes **version 1**. The reader lives in
`src/lib/analysisImport.ts` (`parseAnalysisImport`) and is covered by tests.

## File

A UTF-8 JSON file, any name (suggested: `<player>-<date>.analysis.json`).

```json
{
  "format": "tactical-tennis-lab/analysis",
  "version": 1,
  "exportedAt": "2026-10-28T10:30:00Z",
  "player": "Alex Morgan",
  "match": { "opponent": "Club rival", "date": "2026-10-20", "surface": "clay" },
  "video": { "fileName": "club_match_set2.mp4", "durationSec": 2410, "fps": 30 },

  "notes": [
    {
      "id": "n1",
      "time": 9.4,
      "type": "issue",
      "title": "Toss drifts behind the head",
      "text": "The ball is released about a ball width behind your head. That pulls the contact point back.",
      "pin": { "x": 40, "y": 18 },
      "drawing": "data:image/png;base64,iVBORw0KGgo..."
    },
    { "time": 33.0, "type": "tactical", "text": "Most second serves land in the middle of the box." }
  ],

  "charting": {
    "points": 84,
    "serve": {
      "first":  { "in": 42, "total": 60, "pointsWon": 29, "pointsPlayed": 42 },
      "second": { "in": 22, "total": 24, "pointsWon": 9,  "pointsPlayed": 22 },
      "placement": {
        "deuce": { "wide": 6, "body": 4, "t": 9 },
        "ad":    { "wide": 8, "body": 3, "t": 5 }
      }
    },
    "rally": { "averageLength": 4.2 },
    "errors": { "unforced": 18, "forced": 11, "doubleFaults": 2, "winners": 22, "aces": 5 }
  },

  "summary": {
    "strengths": ["Balanced stance."],
    "issues": [{ "title": "Toss placement", "detail": "The toss lands behind the head." }],
    "tactical": ["Mix the second serve between the body and the T."],
    "priorities": ["Move the toss forward.", "Drill the trophy position.", "Start the knee bend earlier."],
    "drills": [{ "name": "Toss and catch", "detail": "3 sets of 10, catch at full arm extension." }]
  }
}
```

### Fields

| Field | Required | Meaning |
|---|---|---|
| `format` | yes | Always `"tactical-tennis-lab/analysis"`. |
| `version` | yes | Always `1`. |
| `exportedAt` | no | ISO date time. Informational. |
| `player`, `match`, `video` | no | Informational. `video.durationSec` is shown in the editor next to the length the player declared. |
| `notes` | one of `notes`, `summary`, `charting` | The timestamped notes (see below). |
| `charting` | no | Match charting statistics (see below). |
| `summary` | no | The written summary. If it is missing the editor builds a first draft from the notes and charting. |

At least one of `notes`, `summary` or `charting` must be present.

### Notes

| Field | Required | Meaning |
|---|---|---|
| `time` | yes | Seconds from the start of the video, a number of 0 or more. |
| `type` | yes | `"strength"`, `"issue"` or `"tactical"` (any letter case, so `"Strength"` is fine). |
| `text` | yes unless `title` is given | The note. |
| `title` | no | A short heading. If missing, the first sentence of `text` (at most 60 characters) is used. |
| `pin` | no | Where on the frame to point, `x` and `y` in percent (0 to 100) of the frame width and height. |
| `drawing` | no | The annotated frame as a **PNG**: a data URL (`data:image/png;base64,...`) or just the base64 text. At most 1,000,000 base64 characters (about 750 KB); larger ones are skipped with a warning. Export frames at about 960 px wide. |
| `id` | no | Ignored. |

Notes that cannot be read (no time, unknown type, no text) are skipped and listed as warnings in the
editor. At most 200 notes are read.

### Charting

Every number is optional; leave out what the tool does not track. Counts are whole numbers.

- `serve.first` / `serve.second`: `in` serves in, `total` serves hit, `pointsWon` and `pointsPlayed` on that serve.
- `serve.placement.deuce` / `.ad`: counts of serves by zone, `wide`, `body` and `t`, from the server's point of view.
- `rally.averageLength`: average number of shots per point.
- `errors`: `unforced`, `forced`, `doubleFaults`, `winners`, `aces`.

The editor turns these into plain sentences (for example "First serve: 70% in, 69% of points won.") offered
as tactical notes, and keeps the raw numbers with the report.

### What an import fills

- **Observations**: one per note, sorted by time, replacing the observations already in the editor.
- **Summary**: from `summary` if present, otherwise built from the notes (strengths, issues, tactical) and
  the charting sentences. Priorities and drills stay empty unless the file has them: the coach writes those.
- **Video length**: `video.durationSec`, if present, is only shown for comparison; the editor always trusts
  the length the player reads from the actual video.

Imports run in the browser and nothing is sent to the server until the coach presses **Save draft** or **Publish**.
