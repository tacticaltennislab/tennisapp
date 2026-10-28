# TTL Analyzer

A local tool for coaches at Tactical Tennis Lab. Open a match or training video from your computer, add timestamped notes, draw on frames, chart the match point by point, and produce a PDF report. It also exports a file the website's report editor can import, so the notes, drawings and statistics end up in the client's analysis.

It runs on your own computer. The video never leaves it. Nothing here is deployed with the website.

## Install and start

You need Node.js 20 or newer and Chrome or Edge (they can save into a folder you choose; other browsers work but keep projects in the browser and download the file).

```bash
cd tools/analyzer
npm install
npm run dev
```

The tool opens at http://localhost:5174. To run a built copy instead: `npm run build && npm run preview`.

Other commands: `npm test` (unit tests for the statistics and the file format) and `npm run typecheck`.

## How to use it

1. **New analysis.** Enter the player, opponent, date and surface, choose the video, and choose a project folder. The project is saved there as `<player>-<date>.analysis.json` and autosaved a moment after every change. Recent projects are on the start screen. When you reopen one, choose the same video file again.
2. **Video.** Space plays or pauses, the arrow keys step one frame, `J` and `L` (or the buttons) jump 5 seconds, speeds 0.25x, 0.5x and 1x. Frame stepping assumes the frame rate in the "Step at" box, so set it to match the camera.
3. **Notes.** Press `N` to add a note at the current time: a type (Strength, Issue or Tactical), a title and text. Click a note or its marker on the timeline to jump to that moment.
4. **Drawing.** Press `D` to pause and draw on the frame: arrow, line, circle, freehand or a filled zone, in four colours, with undo. Press `D` again to finish. The drawing belongs to the note, and the annotated frame is saved with it as a PNG (scaled down if needed to stay under the website's size limit). "Export PNG" saves the frame at full size.
5. **Match charting.** Press `C`. Choose the server and the side, then click on the court where each serve landed. A serve in the right box counts as in, a serve outside is a fault and the next click is the second serve; two faults end the point as a double fault. Click later shots if you want rally length, then choose how the point ended and who won it. The court is drawn to scale (doubles court, the server always at the bottom). Live statistics: serve placement by zone (wide, body, T) on the deuce and ad side, points won on first and second serve, rally length, and errors by type, plus a heat map of landing spots.
6. **Report.** Write the summary (3 priorities, strengths, issues, tactical patterns, drills). **Draft report (AI)** fills it for you to edit. **Export PDF** makes the report in English or Polish. **Export for website (JSON)** saves the same file as the project, ready to import in the editor.

Press `?` at any time for the keyboard cheat sheet.

## AI draft and the API key

The draft sends your notes and the charting numbers to the Anthropic API. It never sends the video, the frames or the drawings. Open **Settings** and enter your API key and, if you like, a model (the default is `claude-opus-5-5`). The key is stored only in this browser on this computer. It is not written into project files and must never be committed to the repository. The request goes straight from your browser to Anthropic.

## Getting the work into the website

The project file is also a valid import file (format `tactical-tennis-lab/analysis`, version 1, described in `docs/analysis-import.md`). In the website's coach report editor press **Import analysis JSON** and choose the file. Observations, drawings, the charting statistics and the summary are filled in for you to review before saving a draft or publishing.

## Files

- `src/stats.ts`, `src/court.ts`: court geometry and the charting statistics.
- `src/project.ts`: the project file and its round trip.
- `src/report.ts`: the PDF. Fonts in `src/assets/fonts` are Inter, used under the SIL Open Font License (`OFL.txt`).
- `src/ai.ts`: the AI draft.
- `src/fsStore.ts`: saving to a folder and the recent projects list.
