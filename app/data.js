// NusaStat — data module.
// Every figure below is a real published figure. Sources are named per
// indicator (BPS = Statistics Indonesia, bps.go.id; WB = World Bank, WDI).
// Reference year is 2024 unless a row says otherwise. Nothing here is
// estimated by us: values copied from the cited releases, rounded only
// for display. See metodologi.html for the full source list.

export const META = {
  country: "Indonesia",
  countryEn: "Indonesia",
  referenceYear: 2024,
  updatedNote: "Data per rilis resmi 2024–2025",
  sourcesShort: "BPS · Bank Dunia",
};

// Key indicators for a given year (2020–2024). popM = million people.
export const YEARS = [2020, 2021, 2022, 2023, 2024];

export const SERIES = {
  // Real GDP growth, % y-on-y — BPS
  gdpGrowth: { 2020: -2.07, 2021: 3.69, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  // CPI inflation, % annual — BPS (December y-on-y for 2024: 1.57%)
  inflation: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  // Open unemployment rate, % (August Sakernas) — BPS
  unemployment: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  // Poverty rate, % (September) — BPS
  poverty: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 8.57 },
  // Population, million (mid-year estimate) — BPS
  population: { 2020: 270.2, 2021: 272.7, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
  // Merchandise exports, US$ billion — World Bank WDI
  exports: { 2020: 163.2, 2021: 231.6, 2022: 292.0, 2023: 258.8, 2024: 264.7 },
  // Merchandise imports, US$ billion — World Bank WDI
  imports: { 2020: 141.6, 2021: 196.2, 2022: 237.4, 2023: 221.9, 2024: 233.7 },
};

// Headline figures for the reference year, with sources.
export const HEADLINE = {
  population: { value: "281,6 jt", note: "Pertengahan 2024 · BPS", delta: "+0,8% / thn" },
  gdpUsd: { value: "US$ 1.396 M", note: "PDB nominal 2024 · Bank Dunia", delta: "Peringkat 16 dunia" },
  gdpGrowth: { value: "5,03%", note: "Pertumbuhan PDB 2024 · BPS", delta: "5 tahun di ~5%" },
  gdpPerCapita: { value: "US$ 4.925", note: "PDB per kapita 2024 · Bank Dunia", delta: "+27% sejak 2020" },
  inflation: { value: "1,57%", note: "Inflasi y-on-y, Des 2024 · BPS", delta: "Terendah sejak 2020" },
  unemployment: { value: "4,91%", note: "Pengangguran terbuka, Agu 2024 · BPS", delta: "Turun dari 5,32%" },
  poverty: { value: "8,57%", note: "Kemiskinan, Sep 2024 · BPS", delta: "24,06 jt jiwa" },
  exports: { value: "US$ 264,7 M", note: "Ekspor barang 2024 · Bank Dunia", delta: "Surplus US$ 31,0 M" },
  hdi: { value: "75,02", note: "IPM 2024 · BPS", delta: "Naik 0,63 poin" },
  lifeExpectancy: { value: "74,15 thn", note: "Harapan hidup 2024 · BPS", delta: "IPM: dimensi kesehatan" },
  schooling: { value: "13,21 thn", note: "Harapan lama sekolah 2024 · BPS", delta: "IPM: dimensi pengetahuan" },
  povertyLine: { value: "Rp 595.242", note: "Garis kemiskinan /kapita/bln, Sep 2024 · BPS", delta: "Naik 2,11% dari Mar 2024" },
};

// Real GDP growth by quarter, 2024, % y-on-y — BPS
export const QUARTERLY_GROWTH_2024 = [
  { q: "Q1 2024", value: 5.11 },
  { q: "Q2 2024", value: 5.05 },
  { q: "Q3 2024", value: 4.95 },
  { q: "Q4 2024", value: 5.02 },
];

// Age structure, 2024, % of population — World Bank WDI
export const AGE_STRUCTURE = [
  { group: "0–14 tahun", share: 24.6 },
  { group: "15–64 tahun", share: 68.1 },
  { group: "65+ tahun", share: 7.3 },
];

// Other national facts, 2024 — sources named per row.
export const FACTS = [
  { label: "Luas daratan", value: "1.892.555 km²", source: "Bank Dunia" },
  { label: "Kepadatan penduduk", value: "149 jiwa/km²", source: "Bank Dunia, 2023" },
  { label: "Penduduk perkotaan", value: "58,8%", source: "Bank Dunia, 2024" },
  { label: "Angka fertilitas total", value: "2,1 anak", source: "Bank Dunia, 2023" },
  { label: "PDB nominal (rupiah)", value: "Rp 22.139 triliun", source: "BPS, 2024" },
  { label: "Kurs rata-rata", value: "Rp 15.840 / US$", source: "BPS, 2024" },
  { label: "Investasi asing langsung", value: "US$ 24,2 miliar", source: "Bank Dunia, 2024" },
  { label: "Utang pemerintah", value: "39,8% PDB", source: "BPS / Kemenkeu, 2024" },
  { label: "Transaksi berjalan", value: "-0,6% PDB", source: "Bank Indonesia / IMF, 2024" },
  { label: "Peringkat PDB dunia", value: "ke-16", source: "Bank Dunia, 2024" },
  { label: "Peringkat populasi dunia", value: "ke-4", source: "Bank Dunia, 2024" },
  { label: "Jumlah provinsi", value: "38", source: "Kemendagri, sejak 2022" },
];

// Provinces: 2020 Population Census (Sensus Penduduk 2020) — BPS.
// 34 provinces existed at census time; 4 new Papua provinces were created
// in 2022 and are noted on the demography page.
export const PROVINCES = [
  { name: "Jawa Barat", capital: "Bandung", island: "Jawa", pop: 48274162 },
  { name: "Jawa Timur", capital: "Surabaya", island: "Jawa", pop: 40665696 },
  { name: "Jawa Tengah", capital: "Semarang", island: "Jawa", pop: 36516035 },
  { name: "Sumatera Utara", capital: "Medan", island: "Sumatera", pop: 14799361 },
  { name: "Banten", capital: "Serang", island: "Jawa", pop: 11904562 },
  { name: "DKI Jakarta", capital: "Jakarta", island: "Jawa", pop: 10562088 },
  { name: "Sulawesi Selatan", capital: "Makassar", island: "Sulawesi", pop: 9073509 },
  { name: "Lampung", capital: "Bandar Lampung", island: "Sumatera", pop: 9007848 },
  { name: "Sumatera Selatan", capital: "Palembang", island: "Sumatera", pop: 8467432 },
  { name: "Riau", capital: "Pekanbaru", island: "Sumatera", pop: 6394087 },
  { name: "Sumatera Barat", capital: "Padang", island: "Sumatera", pop: 5534472 },
  { name: "Kalimantan Barat", capital: "Pontianak", island: "Kalimantan", pop: 5414390 },
  { name: "Nusa Tenggara Timur", capital: "Kupang", island: "Bali & Nusa Tenggara", pop: 5325566 },
  { name: "Nusa Tenggara Barat", capital: "Mataram", island: "Bali & Nusa Tenggara", pop: 5320092 },
  { name: "Aceh", capital: "Banda Aceh", island: "Sumatera", pop: 5274871 },
  { name: "Bali", capital: "Denpasar", island: "Bali & Nusa Tenggara", pop: 4317404 },
  { name: "Papua", capital: "Jayapura", island: "Maluku & Papua", pop: 4303707 },
  { name: "Kalimantan Selatan", capital: "Banjarmasin", island: "Kalimantan", pop: 4073584 },
  { name: "Kalimantan Timur", capital: "Samarinda", island: "Kalimantan", pop: 3766039 },
  { name: "DI Yogyakarta", capital: "Yogyakarta", island: "Jawa", pop: 3668719 },
  { name: "Jambi", capital: "Jambi", island: "Sumatera", pop: 3548228 },
  { name: "Sulawesi Tengah", capital: "Palu", island: "Sulawesi", pop: 2985734 },
  { name: "Kalimantan Tengah", capital: "Palangka Raya", island: "Kalimantan", pop: 2669969 },
  { name: "Sulawesi Tenggara", capital: "Kendari", island: "Sulawesi", pop: 2624875 },
  { name: "Sulawesi Utara", capital: "Manado", island: "Sulawesi", pop: 2621923 },
  { name: "Riau, Kepulauan", capital: "Tanjung Pinang", island: "Sumatera", pop: 2064564 },
  { name: "Bengkulu", capital: "Bengkulu", island: "Sumatera", pop: 2010670 },
  { name: "Maluku", capital: "Ambon", island: "Maluku & Papua", pop: 1848923 },
  { name: "Bangka Belitung", capital: "Pangkal Pinang", island: "Sumatera", pop: 1455678 },
  { name: "Sulawesi Barat", capital: "Mamuju", island: "Sulawesi", pop: 1419229 },
  { name: "Maluku Utara", capital: "Ternate", island: "Maluku & Papua", pop: 1282937 },
  { name: "Gorontalo", capital: "Gorontalo", island: "Sulawesi", pop: 1171681 },
  { name: "Papua Barat", capital: "Manokwari", island: "Maluku & Papua", pop: 1134068 },
  { name: "Kalimantan Utara", capital: "Tanjung Selor", island: "Kalimantan", pop: 701814 },
];

export const PROVINCE_TOTAL_2020 = PROVINCES.reduce((s, p) => s + p.pop, 0); // 270.203.917

// Latest releases timeline (what a statistics office publishes).
export const RELEASES = [
  { date: "15 Nov 2024", title: "Indeks Pembangunan Manusia 2024 mencapai 75,02", tag: "Sosial" },
  { date: "5 Nov 2024", title: "Ekonomi triwulan III-2024 tumbuh 4,95% (y-on-y)", tag: "Ekonomi" },
  { date: "5 Nov 2024", title: "Pengangguran terbuka Agustus 2024 turun ke 4,91%", tag: "Ketenagakerjaan" },
  { date: "15 Jan 2025", title: "Kemiskinan September 2024 turun ke 8,57%", tag: "Sosial" },
  { date: "5 Feb 2025", title: "Ekonomi 2024 tumbuh 5,03%; PDB Rp 22.139 triliun", tag: "Ekonomi" },
  { date: "2 Jan 2025", title: "Inflasi Desember 2024 sebesar 1,57% (y-on-y)", tag: "Harga" },
];

// Helpers shared by pages.
export function fmtInt(n) {
  return n.toLocaleString("id-ID");
}
export function fmtMillions(n) {
  return (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " jt";
}
export function seriesPoints(key) {
  return YEARS.map((y) => ({ year: y, value: SERIES[key][y] }));
}
