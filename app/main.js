// NusaStat — interactions. All controls work on the data in data.js;
// nothing is fetched from the network.
import { YEARS, SERIES, PROVINCES, PROVINCE_TOTAL_2020, fmtInt, fmtMillions, seriesPoints } from "./data.js";
import { lineChart, barChart, hbarChart, donutChart, PALETTE } from "./charts.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- Year explorer (home + economy): one year, all indicators ----------
function renderYear(year) {
  const y = Number(year);
  const set = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = v; };
  set("yr-gdp", SERIES.gdpGrowth[y].toFixed(2).replace(".", ",") + "%");
  set("yr-inflation", SERIES.inflation[y].toFixed(2).replace(".", ",") + "%");
  set("yr-unemp", SERIES.unemployment[y].toFixed(2).replace(".", ",") + "%");
  set("yr-poverty", SERIES.poverty[y].toFixed(2).replace(".", ",") + "%");
  set("yr-pop", SERIES.population[y].toFixed(1).replace(".", ",") + " jt");
  set("yr-exports", "US$ " + SERIES.exports[y].toFixed(1).replace(".", ",") + " M");
  set("yr-imports", "US$ " + SERIES.imports[y].toFixed(1).replace(".", ",") + " M");
  const bal = (SERIES.exports[y] - SERIES.imports[y]).toFixed(1).replace(".", ",");
  set("yr-balance", "US$ " + bal + " M");
  $$(".year-label").forEach((n) => { n.textContent = y; });
  $$("#year-select").forEach((s) => { if (s.value !== String(y)) s.value = String(y); });
}

// ---------- Trend chart with metric switcher ----------
function renderTrend(hostId, metric, kind) {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = "";
  const labels = { gdpGrowth: "Pertumbuhan PDB (% y-on-y)", inflation: "Inflasi (% per tahun)", unemployment: "Pengangguran terbuka (%)", poverty: "Kemiskinan (%)", population: "Populasi (juta jiwa)", exports: "Ekspor barang (US$ miliar)", imports: "Impor barang (US$ miliar)" };
  const points = seriesPoints(metric).map((p) => ({ label: String(p.year), value: p.value }));
  const fmt = (v) => v.toFixed(2).replace(".", ",") + (metric === "population" || metric === "exports" || metric === "imports" ? "" : "%");
  if (kind === "bar") barChart(host, points, { yFmt: fmt, aria: labels[metric] + ", bar chart" });
  else lineChart(host, points, { yFmt: fmt, aria: labels[metric] + ", line chart" });
  const cap = document.getElementById(hostId + "-cap");
  if (cap) cap.textContent = labels[metric] + " · 2020–2024 · Sumber: " + (metric === "exports" || metric === "imports" ? "Bank Dunia" : "BPS");
}

// ---------- Province table: search + island filter + sortable columns ----------
function renderProvinces() {
  const tbody = document.getElementById("prov-body");
  if (!tbody) return;
  const q = ($("#prov-search")?.value || "").toLowerCase().trim();
  const island = $("#prov-island")?.value || "Semua";
  let rows = PROVINCES.filter((p) => (island === "Semua" || p.island === island) &&
    (p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
  const sortKey = tbody.dataset.sort || "pop";
  const dir = tbody.dataset.dir === "asc" ? 1 : -1;
  rows = [...rows].sort((a, b) => {
    if (sortKey === "name" || sortKey === "capital" || sortKey === "island") return a[sortKey].localeCompare(b[sortKey], "id") * dir;
    return (a[sortKey] - b[sortKey]) * dir;
  });
  tbody.innerHTML = rows.map((p, i) => {
    const share = ((p.pop / PROVINCE_TOTAL_2020) * 100).toFixed(2).replace(".", ",");
    return `<tr><td>${i + 1}</td><td><strong>${p.name}</strong></td><td>${p.capital}</td><td>${p.island}</td><td class="num">${fmtInt(p.pop)}</td><td class="num">${share}%</td></tr>`;
  }).join("") || `<tr><td colspan="6">Tidak ada provinsi yang cocok dengan pencarian Anda.</td></tr>`;
  const count = $("#prov-count");
  if (count) count.textContent = `${rows.length} dari 34 provinsi ditampilkan · Total Sensus 2020: ${fmtInt(PROVINCE_TOTAL_2020)} jiwa`;
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const hb = document.getElementById("prov-top10");
  if (hb && !hb.dataset.done) {
    hb.dataset.done = "1";
    hbarChart(hb, top.map((p) => ({ label: p.name, value: p.pop })), { yFmt: (v) => fmtMillions(v), aria: "Top 10 provinces by population, 2020 census" });
  }
}

// ---------- Donut: age structure ----------
function renderAge() {
  const host = document.getElementById("age-donut");
  if (!host || host.dataset.done) return;
  host.dataset.done = "1";
  const colors = [PALETTE.teal, PALETTE.ink, PALETTE.gold];
  donutChart(host, [
    { label: "0–14 tahun", value: 24.6, color: colors[0] },
    { label: "15–64 tahun", value: 68.1, color: colors[1] },
    { label: "65+ tahun", value: 7.3, color: colors[2] },
  ], { centreTop: "281,6 jt", centreBottom: "penduduk 2024" });
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  // Year selectors
  $$("#year-select").forEach((s) => {
    YEARS.forEach((y) => {
      const o = document.createElement("option");
      o.value = y; o.textContent = y;
      if (y === 2024) o.selected = true;
      s.appendChild(o);
    });
    s.addEventListener("change", () => renderYear(s.value));
  });
  renderYear(2024);

  // Trend chart switchers
  $$("[data-trend-host]").forEach((wrap) => {
    const hostId = wrap.dataset.trendHost;
    const metricSel = $(`[data-metric-for="${hostId}"]`);
    const fixedMetric = wrap.dataset.metric || null;
    const kindBtns = $$(`[data-kind-for="${hostId}"]`);
    let kind = "line";
    const draw = () => renderTrend(hostId, fixedMetric || (metricSel ? metricSel.value : "gdpGrowth"), kind);
    if (metricSel) metricSel.addEventListener("change", draw);
    kindBtns.forEach((b) => b.addEventListener("click", () => {
      kind = b.dataset.kind;
      kindBtns.forEach((x) => x.classList.toggle("active", x === b));
      draw();
    }));
    draw();
  });

  // Quarterly chart on the economy page
  const qHost = document.getElementById("quarterly-chart");
  if (qHost) {
    import("./data.js").then(({ QUARTERLY_GROWTH_2024 }) => {
      barChart(qHost, QUARTERLY_GROWTH_2024.map((q) => ({ label: q.q, value: q.value })),
        { yFmt: (v) => v.toFixed(2).replace(".", ",") + "%", aria: "Quarterly GDP growth 2024" });
    });
  }

  // Province table
  if (document.getElementById("prov-body")) {
    $("#prov-search")?.addEventListener("input", renderProvinces);
    $("#prov-island")?.addEventListener("change", renderProvinces);
    $$("th[data-sort]").forEach((th) => th.addEventListener("click", () => {
      const tbody = document.getElementById("prov-body");
      const key = th.dataset.sort;
      if (tbody.dataset.sort === key) tbody.dataset.dir = tbody.dataset.dir === "asc" ? "desc" : "asc";
      else { tbody.dataset.sort = key; tbody.dataset.dir = key === "pop" ? "desc" : "asc"; }
      $$("th[data-sort]").forEach((x) => x.classList.remove("sorted"));
      th.classList.add("sorted");
      renderProvinces();
    }));
    renderProvinces();
  }

  renderAge();

  // Mobile nav toggle
  const burger = $("#nav-toggle");
  const nav = $("#site-nav");
  if (burger && nav) burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
