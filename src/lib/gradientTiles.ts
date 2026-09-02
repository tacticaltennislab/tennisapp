const STOPS: [string, string, number][] = [
  ["#1b7a45", "#0c3820", 45],
  ["#1f8a4c", "#12181f", 120],
  ["#d3f234", "#145c34", 70],
  ["#0c3820", "#1b7a45", 200],
  ["#145c34", "#d3f234", 20],
  ["#12181f", "#1f8a4c", 160],
];

function gradientSvg(from: string, to: string, angle: number) {
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + 50 * Math.cos(rad);
  const y2 = 50 + 50 * Math.sin(rad);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><defs><linearGradient id="g" x1="0" y1="0" x2="${x2}%" y2="${y2}%"><stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/></linearGradient></defs><rect width="200" height="280" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const BRAND_GRADIENT_TILES = STOPS.map(([from, to, angle]) => ({
  src: gradientSvg(from, to, angle),
  alt: "",
}));
