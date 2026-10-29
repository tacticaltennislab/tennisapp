import { jsPDF } from "jspdf";
import regularUrl from "./assets/fonts/Inter_400Regular.ttf?url";
import boldUrl from "./assets/fonts/Inter_700Bold.ttf?url";
import { COURT, serviceBox } from "./court";
import { LABELS, statRows, type Labels } from "./i18n";
import { cleanSummary, clock } from "./project";
import { computeStats, heatGrid, placement } from "./stats";
import type { ChartPoint, Note, Project } from "./types";

/** The PDF report. Brand colours: charcoal #121417 and lime #c6f24e. Inter is embedded so Polish letters print. */
const CHARCOAL: RGB = [18, 20, 23];
const LIME: RGB = [198, 242, 78];
const LIME_DARK: RGB = [96, 130, 10];
const MUTED: RGB = [96, 102, 110];
const LINE: RGB = [220, 224, 228];
const COURT_FILL: RGB = [240, 244, 232];
type RGB = [number, number, number];

const PAGE = { w: 210, h: 297, margin: 16 };
const CONTENT_W = PAGE.w - PAGE.margin * 2;

async function fontBase64(url: string): Promise<string> {
  const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** Width and height of a PNG data URL, read from its header (no decoding needed). */
export function pngSize(dataUrl: string): { w: number; h: number } | null {
  const b64 = dataUrl.slice(dataUrl.indexOf(",") + 1, dataUrl.indexOf(",") + 1 + 48);
  try {
    const bytes = Uint8Array.from(atob(b64.slice(0, b64.length - (b64.length % 4))), (c) => c.charCodeAt(0));
    const view = new DataView(bytes.buffer);
    if (bytes.length < 24 || view.getUint32(0) !== 0x89504e47) return null;
    return { w: view.getUint32(16), h: view.getUint32(20) };
  } catch {
    return null;
  }
}

class Pdf {
  doc: jsPDF;
  y = PAGE.margin;
  constructor(doc: jsPDF) {
    this.doc = doc;
  }
  /** Set the font, size and colour for the text drawn next. */
  style(size: number, opts: { bold?: boolean; color?: RGB } = {}) {
    this.doc.setFont("Inter", opts.bold ? "bold" : "normal");
    this.doc.setFontSize(size);
    this.doc.setTextColor(...(opts.color ?? CHARCOAL));
  }
  /** Start a new page if `h` mm do not fit on this one. */
  ensure(h: number) {
    if (this.y + h > PAGE.h - 18) {
      this.doc.addPage();
      this.y = PAGE.margin;
    }
  }
  lineHeight(size: number) {
    return size * 0.4 + 1.4;
  }
  /** Wrapped paragraph; returns its height. */
  para(s: string, x: number, width: number, size: number, opts: { bold?: boolean; color?: RGB } = {}) {
    this.style(size, opts);
    const lines = this.doc.splitTextToSize(s, width) as string[];
    const lh = this.lineHeight(size);
    for (const line of lines) {
      this.ensure(lh);
      this.doc.text(line, x, this.y + size * 0.3);
      this.y += lh;
    }
    return lines.length * lh;
  }
  heading(s: string) {
    // Keep a heading together with the start of what it introduces.
    this.ensure(34);
    this.y += 5;
    this.doc.setFillColor(...LIME);
    this.doc.rect(PAGE.margin, this.y, 1.6, 6, "F");
    this.style(13, { bold: true });
    this.doc.text(s, PAGE.margin + 4, this.y + 4.6);
    this.y += 10;
  }
  bullet(s: string, color: RGB = CHARCOAL) {
    const lh = this.lineHeight(10);
    this.ensure(lh * 2);
    this.doc.setFillColor(...LIME_DARK);
    this.doc.circle(PAGE.margin + 1.2, this.y + 2.2, 0.9, "F");
    this.para(s, PAGE.margin + 5, CONTENT_W - 5, 10, { color });
    this.y += 1.2;
  }
}

/** A top-down doubles court drawn with lines, at x, y with the given width (mm). Returns the height. */
function drawCourt(doc: jsPDF, x: number, y: number, width: number, cells?: number[][]): number {
  const k = width / COURT.width;
  const height = COURT.length * k;
  const X = (ft: number) => x + ft * k;
  const Y = (ft: number) => y + ft * k;
  doc.setFillColor(...COURT_FILL);
  doc.rect(x, y, width, height, "F");
  if (cells) {
    const max = Math.max(1, ...cells.flat());
    const rows = cells.length;
    const cols = cells[0].length;
    cells.forEach((row, r) =>
      row.forEach((count, c) => {
        if (!count) return;
        const t = count / max;
        const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
        doc.setFillColor(mix(COURT_FILL[0], LIME[0]), mix(COURT_FILL[1], LIME[1] - 20), mix(COURT_FILL[2], LIME[2] - 40));
        doc.rect(x + (c * width) / cols, y + (r * height) / rows, width / cols, height / rows, "F");
      })
    );
  }
  doc.setDrawColor(...CHARCOAL);
  doc.setLineWidth(0.3);
  doc.rect(x, y, width, height);
  doc.line(X(COURT.singlesLeft), y, X(COURT.singlesLeft), y + height);
  doc.line(X(COURT.singlesRight), y, X(COURT.singlesRight), y + height);
  doc.line(X(COURT.singlesLeft), Y(COURT.serviceFar), X(COURT.singlesRight), Y(COURT.serviceFar));
  doc.line(X(COURT.singlesLeft), Y(COURT.serviceNear), X(COURT.singlesRight), Y(COURT.serviceNear));
  doc.line(X(COURT.centre), Y(COURT.serviceFar), X(COURT.centre), Y(COURT.serviceNear));
  doc.setLineWidth(0.6);
  doc.line(x - 1.5, Y(COURT.net), x + width + 1.5, Y(COURT.net));
  return height;
}

function serveDots(doc: jsPDF, x: number, y: number, width: number, points: ChartPoint[]) {
  const k = width / COURT.width;
  doc.setLineWidth(0.2);
  for (const p of points) {
    if (p.server !== "player") continue;
    const landed = p.serves.find((s) => s.in);
    if (!landed) continue;
    doc.setFillColor(...LIME);
    doc.setDrawColor(...CHARCOAL);
    doc.circle(x + landed.x * k, y + landed.y * k, 0.9, "FD");
  }
}

function zoneCounts(doc: jsPDF, x: number, y: number, width: number, points: ChartPoint[], l: Labels) {
  const k = width / COURT.width;
  const pl = placement(points, "player");
  doc.setFont("Inter", "bold");
  doc.setFontSize(6);
  doc.setTextColor(...CHARCOAL);
  for (const side of ["deuce", "ad"] as const) {
    const box = serviceBox(side);
    const z = pl[side];
    const third = (box.x2 - box.x1) / 3;
    // Wide, body and T from the server's view: the T is next to the centre line.
    const order = side === "deuce" ? (["wide", "body", "t"] as const) : (["t", "body", "wide"] as const);
    order.forEach((zone, i) => {
      const cx = x + (box.x1 + third * (i + 0.5)) * k;
      doc.text(`${z[zone]}`, cx, y + (box.y1 - 1.4) * k, { align: "center" });
    });
  }
  doc.setFont("Inter", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text(`${l.wide} · ${l.body} · ${l.t}`, x + width / 2, y + (COURT.serviceFar - 4.2) * k, { align: "center" });
}

/** Builds the report. Fonts are fetched from the app's own assets, so this runs offline. */
export async function buildReport(project: Project): Promise<Blob> {
  const l = LABELS[project.lang];
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const [reg, bold] = await Promise.all([fontBase64(regularUrl), fontBase64(boldUrl)]);
  doc.addFileToVFS("Inter-Regular.ttf", reg);
  doc.addFont("Inter-Regular.ttf", "Inter", "normal");
  doc.addFileToVFS("Inter-Bold.ttf", bold);
  doc.addFont("Inter-Bold.ttf", "Inter", "bold");
  const pdf = new Pdf(doc);

  // Header band
  doc.setFillColor(...CHARCOAL);
  doc.rect(0, 0, PAGE.w, 36, "F");
  doc.setFillColor(...LIME);
  doc.rect(0, 36, PAGE.w, 1.6, "F");
  pdf.style(20, { bold: true, color: [255, 255, 255] });
  doc.text(l.reportTitle, PAGE.margin, 18);
  pdf.style(10, { color: LIME });
  doc.text("Tactical Tennis Lab", PAGE.margin, 27);
  pdf.y = 46;

  // Match details
  const meta: [string, string][] = [
    [l.player, project.meta.player || "-"],
    [l.opponent, project.meta.opponent || "-"],
    [l.date, project.meta.date || "-"],
    [l.surface, l.surfaces[project.meta.surface] ?? project.meta.surface ?? "-"],
  ];
  const colW = CONTENT_W / 4;
  meta.forEach(([label, value], i) => {
    pdf.style(8, { color: MUTED });
    doc.text(label, PAGE.margin + i * colW, pdf.y);
    pdf.style(11, { bold: true });
    doc.text(doc.splitTextToSize(value, colW - 3)[0] as string, PAGE.margin + i * colW, pdf.y + 5.5);
  });
  pdf.y += 10;

  // Key statistics with the court diagrams
  const stats = computeStats(project.points);
  const rows = statRows(stats, project.lang);
  pdf.heading(l.keyStats);
  if (rows.length === 0) {
    pdf.para(l.noStats, PAGE.margin, CONTENT_W, 10, { color: MUTED });
  } else {
    const courtW = 40;
    const courtH = COURT.length * (courtW / COURT.width);
    pdf.ensure(Math.max(courtH + 12, rows.length * 10));
    const top = pdf.y;
    // Table on the left: labels may take two lines, so long Polish labels are not cut off.
    const tableW = 86;
    const rowH = 10;
    rows.forEach((r, i) => {
      const ry = top + i * rowH;
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.2);
      doc.line(PAGE.margin, ry + rowH - 1, PAGE.margin + tableW, ry + rowH - 1);
      pdf.style(8.5, { color: MUTED });
      const label = (doc.splitTextToSize(r.label, 52) as string[]).slice(0, 2);
      label.forEach((line, li) => doc.text(line, PAGE.margin, ry + 4 + li * 3.6));
      pdf.style(9.5, { bold: true });
      doc.text(r.value, PAGE.margin + tableW, ry + 4.4, { align: "right" });
    });
    // Courts on the right
    const x1 = PAGE.margin + 94;
    const x2 = x1 + courtW + 8;
    pdf.style(8, { bold: true });
    doc.text(l.servePlacement, x1, top + 2);
    pdf.style(8, { bold: true });
    doc.text(l.landingHeat, x2, top + 2);
    const cy = top + 6;
    drawCourt(doc, x1, cy, courtW);
    serveDots(doc, x1, cy, courtW, project.points);
    zoneCounts(doc, x1, cy, courtW, project.points, l);
    drawCourt(doc, x2, cy, courtW, heatGrid(project.points, "all"));
    pdf.y = top + Math.max(rows.length * 10, courtH + 8) + 2;
  }

  // Priorities
  const s = cleanSummary(project.summary);
  if (s.priorities.length > 0) {
    pdf.heading(l.priorities);
    s.priorities.slice(0, 3).forEach((p, i) => {
      const lines = doc.splitTextToSize(p, CONTENT_W - 12) as string[];
      const h = Math.max(8, lines.length * pdf.lineHeight(11) + 2);
      pdf.ensure(h);
      doc.setFillColor(...CHARCOAL);
      doc.roundedRect(PAGE.margin, pdf.y, 8, 8, 1.2, 1.2, "F");
      pdf.style(11, { bold: true, color: LIME });
      doc.text(String(i + 1), PAGE.margin + 4, pdf.y + 5.5, { align: "center" });
      const startY = pdf.y;
      pdf.y += 1.2;
      pdf.para(p, PAGE.margin + 12, CONTENT_W - 12, 11);
      pdf.y = Math.max(pdf.y, startY + 8) + 2.5;
    });
  }

  const list = (title: string, items: string[]) => {
    if (items.length === 0) return;
    pdf.heading(title);
    items.forEach((i) => pdf.bullet(i));
  };
  list(l.strengths, s.strengths);
  if (s.issues.length > 0) {
    pdf.heading(l.issues);
    for (const it of s.issues) {
      pdf.ensure(14);
      pdf.para(it.title, PAGE.margin, CONTENT_W, 10.5, { bold: true });
      if (it.detail) pdf.para(it.detail, PAGE.margin, CONTENT_W, 10, { color: MUTED });
      pdf.y += 2.5;
    }
  }
  list(l.tactical, s.tactical);

  // Notes with their annotated frames
  const notes: Note[] = [...project.notes].sort((a, b) => a.time - b.time);
  if (notes.length > 0) {
    pdf.heading(l.notes);
    for (const n of notes) {
      const size = n.drawing ? pngSize(n.drawing) : null;
      const imgW = Math.min(110, CONTENT_W);
      const imgH = size ? (imgW * size.h) / size.w : 0;
      pdf.ensure(22 + Math.min(imgH, 8));
      // Time chip and type
      doc.setFillColor(...CHARCOAL);
      doc.roundedRect(PAGE.margin, pdf.y, 15, 6, 1, 1, "F");
      pdf.style(8.5, { bold: true, color: LIME });
      doc.text(clock(n.time), PAGE.margin + 7.5, pdf.y + 4.2, { align: "center" });
      pdf.style(7.5, { bold: true, color: LIME_DARK });
      doc.text(l.types[n.type].toUpperCase(), PAGE.margin + 18, pdf.y + 4.2);
      pdf.y += 8;
      if (n.title) pdf.para(n.title, PAGE.margin, CONTENT_W, 10.5, { bold: true });
      if (n.text) pdf.para(n.text, PAGE.margin, CONTENT_W, 10, { color: MUTED });
      if (n.drawing && size) {
        pdf.ensure(imgH + 4);
        pdf.y += 1.5;
        doc.addImage(n.drawing, "PNG", PAGE.margin, pdf.y, imgW, imgH);
        doc.setDrawColor(...LINE);
        doc.rect(PAGE.margin, pdf.y, imgW, imgH);
        pdf.y += imgH + 2;
      }
      pdf.y += 4;
    }
  }

  if (s.drills.length > 0) {
    pdf.heading(l.drills);
    for (const d of s.drills) {
      pdf.ensure(14);
      pdf.para(d.name, PAGE.margin, CONTENT_W, 10.5, { bold: true });
      if (d.detail) pdf.para(d.detail, PAGE.margin, CONTENT_W, 10, { color: MUTED });
      pdf.y += 2.5;
    }
  }

  // Footer on every page
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.2);
    doc.line(PAGE.margin, PAGE.h - 12, PAGE.w - PAGE.margin, PAGE.h - 12);
    pdf.style(8, { color: MUTED });
    doc.text(`Tactical Tennis Lab  ·  ${project.meta.player}`, PAGE.margin, PAGE.h - 7.5);
    doc.text(`${l.page} ${i} ${l.of} ${total}`, PAGE.w - PAGE.margin, PAGE.h - 7.5, { align: "right" });
  }
  return doc.output("blob");
}

