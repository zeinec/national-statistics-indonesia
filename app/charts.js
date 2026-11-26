// NusaStat — chart module. Hand-drawn SVG charts, no library, no network.
// Every chart is built from the data in data.js and labelled with its
// source, so a screenshot always shows real figures with provenance.

const NS = "http://www.w3.org/2000/svg";
const INK = "#0b2a4a";
const TEAL = "#0e7c7b";
const GOLD = "#c98a1b";
const GRID = "#d8dde3";
const MUTED = "#5b6b7a";

function el(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
}

function text(parent, x, y, s, attrs = {}) {
  const t = el("text", { x, y, "font-size": attrs.size || 11, fill: attrs.fill || MUTED, ...attrs }, parent);
  t.textContent = s;
  return t;
}

function niceTicks(min, max, count = 4) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  return { lo, hi, ticks };
}

function axes(svg, W, H, pad, yTicks, yFmt, xLabels) {
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const { lo, hi, ticks } = yTicks;
  const yOf = (v) => pad.t + plotH - ((v - lo) / (hi - lo)) * plotH;
  ticks.forEach((v) => {
    const y = yOf(v);
    el("line", { x1: pad.l, y1: y, x2: W - pad.r, y2: y, stroke: GRID, "stroke-width": 1 }, svg);
    const t = text(svg, pad.l - 8, y + 4, yFmt(v), { "text-anchor": "end" });
    t.setAttribute("font-size", "11");
  });
  xLabels.forEach((lab, i) => {
    const x = pad.l + (i + 0.5) * (plotW / xLabels.length);
    text(svg, x, H - 8, lab, { "text-anchor": "middle" });
  });
  el("line", { x1: pad.l, y1: pad.t, x2: pad.l, y2: H - pad.b, stroke: "#9aa7b4", "stroke-width": 1 }, svg);
  el("line", { x1: pad.l, y1: H - pad.b, x2: W - pad.r, y2: H - pad.b, stroke: "#9aa7b4", "stroke-width": 1 }, svg);
  return { plotW, plotH, yOf };
}

// Line chart with dots + value labels. points: [{label, value}]
export function lineChart(host, points, opts = {}) {
  const W = opts.width || 640, H = opts.height || 300;
  const pad = { l: 48, r: 16, t: 18, b: 30 };
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": opts.aria || "Line chart" });
  host.appendChild(svg);
  const vals = points.map((p) => p.value);
  const min = Math.min(...vals), max = Math.max(...vals);
  const padSpan = (max - min) * 0.25 || 1;
  const { plotW, yOf } = axes(svg, W, H, pad,
    niceTicks(min - padSpan, max + padSpan), (v) => opts.yFmt ? opts.yFmt(v) : v + (opts.suffix || ""),
    points.map((p) => p.label));
  const xOf = (i) => pad.l + (i + 0.5) * (plotW / points.length);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)},${yOf(p.value).toFixed(1)}`).join(" ");
  el("path", { d, fill: "none", stroke: opts.color || TEAL, "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
  points.forEach((p, i) => {
    el("circle", { cx: xOf(i), cy: yOf(p.value), r: 4.5, fill: "#fff", stroke: opts.color || TEAL, "stroke-width": 2.5 }, svg);
    text(svg, xOf(i), yOf(p.value) - 10, opts.yFmt ? opts.yFmt(p.value) : p.value + (opts.suffix || ""),
      { "text-anchor": "middle", fill: INK, "font-weight": "700", size: 12 });
  });
  return svg;
}

// Bar chart. points: [{label, value}]
export function barChart(host, points, opts = {}) {
  const W = opts.width || 640, H = opts.height || 300;
  const pad = { l: 48, r: 16, t: 26, b: 30 };
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": opts.aria || "Bar chart" });
  host.appendChild(svg);
  const vals = points.map((p) => p.value);
  const max = Math.max(...vals, 0);
  const lo = opts.fromZero === false ? Math.min(...vals) * 0.9 : 0;
  const { plotW, plotH, yOf } = axes(svg, W, H, pad,
    niceTicks(lo, max * 1.08), (v) => opts.yFmt ? opts.yFmt(v) : v + (opts.suffix || ""),
    points.map((p) => p.label));
  const slot = plotW / points.length;
  const bw = Math.min(54, slot * 0.62);
  points.forEach((p, i) => {
    const x = pad.l + i * slot + (slot - bw) / 2;
    const y = yOf(p.value);
    const base = yOf(lo);
    el("rect", { x, y, width: bw, height: Math.max(1, base - y), rx: 3, fill: p.color || opts.color || TEAL }, svg);
    text(svg, x + bw / 2, y - 7, opts.yFmt ? opts.yFmt(p.value) : p.value + (opts.suffix || ""),
      { "text-anchor": "middle", fill: INK, "font-weight": "700", size: 12 });
  });
  return svg;
}

// Horizontal bar chart for ranked lists (e.g. top provinces).
export function hbarChart(host, rows, opts = {}) {
  const W = opts.width || 640, rowH = opts.rowH || 34;
  const H = rows.length * rowH + 34;
  const pad = { l: 150, r: 76, t: 8, b: 8 };
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": opts.aria || "Horizontal bar chart" });
  host.appendChild(svg);
  const max = Math.max(...rows.map((r) => r.value));
  rows.forEach((r, i) => {
    const y = pad.t + i * rowH;
    const cy = y + rowH / 2;
    text(svg, pad.l - 10, cy + 4, r.label, { "text-anchor": "end", fill: INK, size: 12 });
    const bw = ((W - pad.l - pad.r) * r.value) / max;
    el("rect", { x: pad.l, y: y + 6, width: Math.max(2, bw), height: rowH - 14, rx: 3, fill: r.color || opts.color || TEAL }, svg);
    text(svg, pad.l + bw + 8, cy + 4, opts.yFmt ? opts.yFmt(r.value) : String(r.value), { fill: INK, "font-weight": "700", size: 12 });
  });
  return svg;
}

// Donut chart with a centre label and a legend rendered beside it by the caller.
export function donutChart(host, slices, opts = {}) {
  const S = opts.size || 220;
  const svg = el("svg", { viewBox: `0 0 ${S} ${S}`, width: S, height: S, role: "img", "aria-label": opts.aria || "Donut chart" });
  host.appendChild(svg);
  const cx = S / 2, cy = S / 2, r = S / 2 - 14, inner = r * 0.62;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let a0 = -Math.PI / 2;
  slices.forEach((s) => {
    const frac = s.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    el("path", {
      d: `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z`,
      fill: s.color, stroke: "#fff", "stroke-width": 2,
    }, svg);
    a0 = a1;
  });
  const c1 = text(svg, cx, cy - 2, opts.centreTop || "", { "text-anchor": "middle", fill: INK, "font-weight": "800", size: 20 });
  const c2 = text(svg, cx, cy + 18, opts.centreBottom || "", { "text-anchor": "middle", size: 11 });
  return svg;
}

export const PALETTE = { ink: INK, teal: TEAL, gold: GOLD, muted: MUTED };
