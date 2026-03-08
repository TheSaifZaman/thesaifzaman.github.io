# CLAUDE.md - Project Instructions

## Project Overview

Personal website & Islamic productivity hub for Md Saif Zaman (Abdullah). Combines a professional software engineering portfolio with Islamic productivity tools.

## Tech Stack

- **Vanilla HTML5/CSS3/JavaScript (ES6+)** — no frameworks
- **CSS Variables** for theming (light/dark mode), glass-morphism design
- **Local Storage** for all data persistence (no backend)
- **Libraries:** Font Awesome 6.5.1, Chart.js 4.4.0, html2pdf.js 0.10.1
- **Fonts:** Inter, JetBrains Mono, Amiri (Arabic), Merriweather

## Project Structure

```
/                           → Main portfolio site
├── index.html              → Portfolio page (hero, about, skills, experience, etc.)
├── index.js                → Portfolio logic
├── data.json               → Profile & content configuration
├── style.css               → Portfolio styling
├── pages/                  → Central navigation hub for all sub-apps (data-driven from pages-data.js)
├── barakah-planner/        → Comprehensive Islamic professional planner
│   ├── index.html          → Main planner interface (170KB)
│   ├── app.js              → Core application logic (264KB)
│   ├── style.css           → Planner styling (129KB)
│   ├── hifz/               → Quran memorization tracker
│   ├── himmah/             → Himmah (aspiration) goal tracker
│   ├── ramadan/            → Ramadan planner (3 modules)
│   ├── prophetic-routine/  → Prophet's daily routine module
│   ├── analytics/          → Chart rendering
│   └── reports/            → PDF export
├── annual-intentions-reset/→ 3-day goal-setting workbook (slide presentations)
│   ├── workbook.html       → Interactive workbook
│   ├── guideline.html      → Guidelines
│   ├── resources.html      → Resources & links
│   └── manifest.json       → Slide presentation metadata
├── the-productive-muslim/  → Book summaries & resources
├── shahada-guide/          → Step-by-step guide to Islam & taking Shahada
├── islamic-tools-directory/→ Curated free Islamic tools & apps directory
├── teach-a-skill/          → Free tech tutorials with Islamic benefit
├── 100-day-challenge/      → Structured Islamic self-improvement sprints
├── muhasabah-dashboard/    → Weekly self-accountability review tool
└── muslim-dev-mentorship/  → Free mentorship program for Muslim developers
```

## Key Conventions

- **No build step** — all files are served as-is (GitHub Pages)
- **No frameworks/bundlers** — vanilla JS only, keep it that way
- **No fetch() for local data** — do NOT use `fetch()` to load JSON files. This site must work without a server (file:// protocol). Use `<script>` tags with JS data files (e.g., `pages-data.js` sets `var PAGES_DATA = [...]`) instead
- **Mobile-first responsive design** with hamburger menu + bottom nav bar
- **Data stays local** — use localStorage, never external APIs for user data
- **Glass-morphism UI** — frosted glass effects, subtle gradients, rounded corners
- **Islamic terminology** is used throughout (Barakah, Hifz, Qadha, Salah, Duas, etc.)

## Style Guidelines

- CSS uses variables defined in `:root` for consistent theming
- Both light and dark themes must be supported
- Arabic text uses the Amiri font family
- Keep files self-contained per sub-app (each sub-app has its own HTML/CSS/JS)

## When Editing

- The barakah-planner files are large (app.js: 264KB, index.html: 170KB). Read specific sections rather than entire files.
- Profile data (name, experience, skills) lives in `/data.json` — edit there, not in HTML
- Pages hub data lives in `/pages/pages-data.js` — to add/remove/edit pages, update that file
- Each sub-app is independent; changes to one should not break others
- Test responsive layouts — the site is used on mobile devices

## Deployment

- GitHub Pages from the `main` branch
- No CI/CD pipeline — push to main deploys automatically
- No build or compilation required
