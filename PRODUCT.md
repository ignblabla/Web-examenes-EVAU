# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output, content collections over Markdown exams) + KaTeX rendered at build time. Confirmed by the user. No backend, no database. Deploy target: undecided.

## Users

Andalusian students in 2º de Bachillerato (17–18) preparing the PEvAU ("Selectividad"). Often stressed, often studying on a phone, often at night. Their job: practise real past exams under realistic conditions, check their work step by step, and leave each session feeling "esto lo puedo sacar".

Secondary: secondary-school teachers who might recommend the site to their students; they judge it on rigour and trustworthiness.

## Product Purpose

A free-standing static site of real PEvAU Andalucía exams, solved step by step. Each exam is one Markdown file (frontmatter + LaTeX). Success: a student can pick a subject, find a specific year and session, attempt the exam with solutions hidden and an optional timer, then reveal and understand each solution, on a phone, without friction.

## Positioning

Solutions written by one experienced teacher, not crowd-sourced or scraped: María Luisa Aguirre, physics graduate with more than 20 years of teaching. One consistent voice and method across every exam, structured exactly like the real PEvAU (blocks/options, numbered exercises, lettered parts with marks), with a practice mode built around "intenta primero, luego mira".

## Operating Context

- Content source: one `.md` per exam with frontmatter `asignatura`, `anio`, `convocatoria`, `titulo`, `duracion`, `pdf_oficial`, `bloques`. Body holds exercises, parts, solutions with `$…$` / `$$…$$`, images and a final result.
- Sessions: Ordinaria / Extraordinaria; older years Junio / Julio / Septiembre.
- Subjects are defined in a config file (name, slug, accent colour, icon, short description). Launch: Matemáticas Aplicadas a las CCSS II and Física. Planned: 15+ (Matemáticas II, Química, Biología, Historia de España, Lengua, Inglés…). Adding a subject must not require touching components.
- Thematic blocks per subject (Física: Campo gravitatorio, Electromagnetismo, Ondas, Óptica, Física moderna; Matemáticas CCSS: Álgebra, Análisis, Probabilidad y Estadística).
- Students print exams, with or without solutions.

## Capabilities and Constraints

- Pages: Inicio, Asignatura, Examen, Búsqueda/índice global (client-side), Sobre el proyecto, 404.
- Exam page: practice mode (solutions hidden, revealed per exercise or per part), optional exam timer, exercise index (sidebar on desktop, compact selector on mobile), prev/next exam and related exams by block, link to official PDF.
- Mobile-first; long formulas scroll horizontally inside their own container, never the page.
- WCAG AA, keyboard navigable, accessible disclosure for solutions; light and dark mode; `prefers-reduced-motion` respected.
- Lightweight: no heavy dependencies. Print stylesheet with/without solutions.
- SEO titles like "Examen PEvAU Física 2024 Ordinaria resuelto | Andalucía".
- Phase 1 is visual design and UX only: navigable prototype with realistic sample data.
- Undecided: site name and domain, deploy target, logo.

## Brand Commitments

- All copy in Spanish; close and motivating tone, never too colloquial.
- Energy without childishness; no cheap gamification (no points, streaks, badges).
- Must read as a serious resource a teacher would recommend; no generic template or "AI-made" look.

## Evidence on Hand

- Real people: María Luisa Aguirre (author of solutions; physics graduate; 20+ years teaching) and Ignacio Blanquero (software engineer; builds the site).
- No exams solved in the repo yet. Coverage figures (years, number of exams, number of exercises) do not exist: prototype figures are sample data and must be labelled or replaced; never present them as real.
- No testimonials, no usage numbers, no endorsements. Do not invent them.
- Official exam PDFs are published by the Andalusian universities; links are placeholders until real files are added.

## Product Principles

1. Attempt before answer: the interface protects the student's first try; solutions are a deliberate reveal.
2. Mirror the real exam: structure, marks and timing match the PEvAU so practice transfers to the day.
3. One teacher, one method: consistency and authorship are the trust signal, not volume claims.
4. Calm under pressure: every screen reduces anxiety and shows the next step.
5. Scale by configuration: a new subject is data, not design work.

## Accessibility & Inclusion

WCAG 2.2 AA. Heavy phone use, often at night: dark mode is first-class, touch targets generous, formulas legible at small sizes, print-friendly.
