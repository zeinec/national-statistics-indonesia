# NusaStat — Portal Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zeinec/national-statistics-indonesia/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zeinec/national-statistics-indonesia/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is a national statistics site for Indonesia — original design, text and charts, real published figures, fully offline. Five pages (Home, Economy, Demography, Society, Methodology), hand-drawn SVG charts, a year explorer (2020–2024), and a searchable, sortable table of all 34 provinces from the 2020 Population Census.

Every figure is a real published figure from BPS (Statistics Indonesia) or the World Bank, with its source named on the page — population 281.6 million, GDP US$ 1,396 billion growing 5.03%, inflation 1.57%, unemployment 4.91%, poverty 8.57%, HDI 75.02 (all 2024). See `app/metodologi.html` for definitions and source notes.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests: `app/` is plain static files. `main.ts` (Node 22) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` via the kit's `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — home: key indicators, year explorer, trend chart, latest releases
- `app/ekonomi.html` — economy: growth, inflation, trade 2020–2024, quarterly growth
- `app/demografi.html` — demography: age structure, population trend, 34-province table
- `app/sosial.html` — society: poverty, unemployment, HDI and its components
- `app/metodologi.html` — methodology, definitions, sources, comparability notes
- `app/data.js` — the dataset (every figure with its source)
- `app/charts.js` — hand-drawn SVG line / bar / horizontal-bar / donut charts
- `app/main.js` — year explorer, chart switchers, province search / sort / filter
- `screenshots/` — real renders of the site in a browser (desktop + phone)

---

<sub>Entered on [make.fun](https://make.fun/?ref=sunny-comet-67&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
