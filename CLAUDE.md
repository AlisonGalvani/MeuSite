# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Alison Galvani's personal website: a static, multi-page HTML/CSS/vanilla-JS site (no framework, no bundler, no build step). Content and UI text are in Brazilian Portuguese (pt-BR). It's deployed via GitHub Pages with a custom domain (see `CNAME`: `alisongalvani.com.br`).

## Commands

```bash
npm install     # install eslint + live-server
npm run dev     # serve the site locally with live-server, opens index.html
npm run lint    # eslint --fix over ./src/**/*.js
```

There is no test suite and no build/compile step — pages are plain `.html` files opened directly by the browser or served as static assets. Node/npm exist purely as dev conveniences (live-server for local preview, eslint for linting); the project is 100% static and deployed as plain files. **Do not run `npm run lint` proactively after making changes** — the owner reviews/lints by hand. Only run it if explicitly asked (note: the script targets `./src/**`, which doesn't exist in this repo — actual JS lives under `js/`, so the command needs adjusting to be useful).

## Architecture

- **Page-per-feature, no routing/templating**: each top-level `.html` file (`index.html`, `portfolio.html`, `contato.html`, `curriculo_ptbr.html`, `curriculo_en.html`) is a standalone document with its own `<head>` and duplicated nav markup. There's no shared layout/include mechanism, so navigation links and structure are copy-pasted across pages — when changing the nav, header, or shared markup, update every page individually.
- **`css/`**: one stylesheet per page/section (`index.css`, `portifolio.css` [sic — note the misspelling matches the existing filename], `curriculo.css`, `contato.css`), plus `base.css` for shared/reset styles and `styles.css`. `css/index.html` is a redirect stub (`window.location.assign('../index.html')`), not real content — same pattern likely exists for other bare `index.html` files that only exist to prevent directory listing.
- **`js/`**: `index.js` holds the homepage's canvas "Matrix rain" effect (`animationStart`/`drawMatrix`), a decorative floating-code-snippet effect (`animation2Start`/`spawnCode`), and the mobile nav toggle (`openNav`) used across pages. `scripts.js` is currently empty/placeholder.
- **`portfolio/`**: one static HTML page per portfolio project (e.g. `ApiNodejs.html`, `BI.html`, `OnePlus.html`), linked from `portfolio.html`. Adding a portfolio entry means adding both a card in `portfolio.html` and a corresponding detail page here, plus images under `img/portfolio/<ProjectName>/`.
- **`ontologia/`**: a self-contained sub-site built on a vendored MDB (Material Design Bootstrap) template — has its own `css/`, `js/`, `scss/`, `font/`, `img/`. It's **currently disabled/unlinked** — it was surfaced on the site for a while but is not linked from the main nav anymore. Treat it as inactive; don't wire it back into the main site or use its CSS/JS conventions elsewhere unless asked to re-enable it.
- **`matrix/`**: standalone page (`index.html`) with an isolated demo, not wired into the main nav flow the same way as the top-level pages.
- **`font-awesome-4.7.0/`**: vendored third-party icon library, not maintained here.

## Internationalization

The site is being made multi-language gradually, one section at a time, via **separate per-language HTML files** rather than any i18n framework (since the project must stay static). Existing example: `curriculo_ptbr.html` / `curriculo_en.html`. The next planned section to translate this way is the portfolio pages — **only start that work when explicitly asked to**, don't do it proactively.

## Conventions (existing patterns — follow these in new/edited pages)

This project predates any formal style guide, so these are patterns *observed across the existing pages*, not rules imposed from outside. Match them when adding or editing pages so the site stays internally consistent. (More conventions will be added here going forward as they're decided.)

### HTML — page structure

Every top-level page and portfolio detail page follows the same skeleton:
- `<!DOCTYPE html>`, `<html lang="pt-BR">` (even the English CV page keeps `lang="pt-BR"` — this hasn't been fixed per-language yet).
- `<head>` order: `charset` → Google Fonts (`Montserrat`) link → viewport meta → favicon comment + link → Font Awesome stylesheet → `css/base.css` → the page's own stylesheet → `<title>`, formatted `"Alison Galvani - <Section>"` (e.g. `"Alison Galvani - Portfólio"`).
- Body starts with the identical `<nav class="navigation">` block (Home / Portfólio / Currículo / Contato links + `#threeline-icon` menu toggle calling `openNav()`). It's duplicated verbatim on every page rather than shared — **when changing nav markup, update every page that has it**. Pages under `portfolio/` use the same block with `../`-prefixed hrefs.
- Content is wrapped in `<div class="main">`, usually with an entrance-animation class from `base.css` added (`bottom-to-top`, `top-to-bottom`, or none) — pick one that fits the transition you want, they're plain CSS keyframe hooks, not JS-driven.
- A breadcrumb `<ul class="caminho">` comes right after opening `.main`: `Home` link, then a literal `>` `<li>`, then either the current page name (no link) or, for nested pages like `portfolio/*.html`, a chain (`Home > Portfólio > <Project>`).
- `<h1>` page title follows the breadcrumb.
- Pages end with `<a class="back-link" href="...">&larr;Voltar ao início<a>` (or `&larr;Voltar ao portfólio` for portfolio detail pages). Note this anchor is **not closed properly** (`<a>` instead of `</a>`) consistently across every single page — it's a long-standing copy-paste quirk, not something introduced per-edit. Match the existing text/href pattern when adding a new page; if asked to clean up markup generally, flag this rather than silently "fixing" just one instance.
- Script include right before `</body>`: `<script src="js/index.js"></script>` (or `../js/index.js` from subfolders), sometimes followed by an inline `<script>` block that calls `animationStart()` and/or `animation2Start()` on `window.onload`.

### HTML — portfolio detail pages specifically

- Filename is PascalCase matching the project name (`OnePlus.html`, `BI.html`, `ApiNodejs.html`), linked from a `.miniatura` card in `portfolio.html`.
- Hero/section images use class `foto-trabalhos lightbox-trigger` and live under `img/portfolio/<ProjectName>/` (generic names like `mkp1.webp`, `mkp2.webp`) — see "Portfolio images: lightbox" below for what `lightbox-trigger` does.
- Section headers (`<h2>`) are often prefixed with an emoji (💠 🚀 👨‍💻 ✅) as informal visual bullets — this is a deliberate stylistic choice on these pages, not accidental.
- Tech stacks and contribution lists use plain `<ul><li>`.
- One-off page-specific CSS (e.g. a different `body` background) is sometimes added as an inline `<style>` in `<head>` rather than a new stylesheet — acceptable for small one-off tweaks on a single detail page, but page-wide styles still belong in `css/`.

### Portfolio images: lightbox (standard as of this convention)

Every hero/section image on a portfolio detail page should use `class="foto-trabalhos lightbox-trigger"` on the `<img>` — nothing else is needed per page. This gets you, for free, sitewide:
- A capped, centered, bordered/shadowed presentation (`.lightbox-wrapper` rule in `css/base.css`: `max-width: 640px; margin: 30px auto;` + border/shadow/radius) instead of the image stretching to the full width of `.main`.
- A hover affordance (image darkens, a 🔍 icon fades in, cursor becomes `zoom-in`) making it visually obvious the image is clickable.
- Click-to-enlarge: opens the image full-size in a dark full-screen overlay (closable via the × button, clicking the backdrop, or Escape).

This is implemented **once, centrally, and is fully reusable — no per-page markup, CSS, or script needed beyond the class on the `<img>`**:
- `js/index.js`'s `initLightbox()` runs on `DOMContentLoaded` on every page (since `js/index.js` is already included everywhere) and auto-wires any `img.lightbox-trigger` on the page: it wraps the image in a generated `.lightbox-wrapper` div, injects the 🔍 icon, and creates the single shared `#lightbox-overlay` used for the enlarged view.
- All the CSS for the wrapper, hover state, icon, and overlay lives in `css/base.css` under the "Lightbox" comment block.
- Deliberately **not** built on Font Awesome, even though Font Awesome is normally the icon source on this site (see HTML head order above) — not every page reliably loads the Font Awesome stylesheet (e.g. `OneAcessos.html` didn't), and this feature needs to work regardless of that. The 🔍 emoji is used instead, consistent with the existing emoji-as-bullet convention on these pages.
- Don't reintroduce page-scoped `<style>` overrides for image sizing/border/shadow on portfolio pages — that was the initial prototype (tried on `OneAcessos.html` first, page-scoped, before being approved and promoted into `base.css`); duplicating it per page again would fight the shared rule and drift over time.

### CSS

- Design tokens are CSS custom properties defined once in `:root` in `css/base.css` (`--text-color`, `--bg-color`, `--bg-color-home`, `--primary-color`, `--primary-color-light`, `--primary-color-dark`). Reuse these instead of hardcoding colors in new CSS.
- One stylesheet per page/section, always loaded alongside `base.css` (never instead of it): `index.css`, `portifolio.css` (filename keeps this misspelling — match it, don't "fix" it), `curriculo.css`, `contato.css`.
- Shared `@keyframes` (entrance/exit animations, `bgTransition`, etc.) live centrally in `base.css` and are reused by class name (`bottom-to-top`, `top-to-bottom`, etc.) rather than redefined per page.
- The primary responsive breakpoint is `@media (max-width: 1000px)`; a few pages add a secondary `@media (max-width: 500px)` for extra-small screens. Use `1000px` as the default mobile breakpoint for new responsive rules.
- Existing class naming is **inconsistent** — newer/rewritten CSS (`index.css`, `.language-switcher` in `curriculo.css`, `contato.css`) uses kebab-case (`cta-content`, `lang-option`), while older CSS (`portifolio.css`, parts of `curriculo.css`) uses snake_case (`menu_trabalhos`, `cv_infos`). When adding new classes, prefer **kebab-case** (matches the more recently written files) unless you're extending an existing snake_case block, in which case match that block for consistency.
- Indentation is also inconsistent (tabs in `base.css`/older files, 2-space in `index.css` and newer additions) — match whatever the specific file you're editing already uses rather than reformatting the whole file.
- `css/styles.css` is **not linked from any page** — it's dead/legacy CSS. Don't add new rules there and don't assume it's active.

### JS

- Plain vanilla JS, no modules/bundler/framework, no imports — functions are declared at top level in `js/index.js` and called globally (via inline `onclick="..."` handlers in HTML, or `window.onload`).
- Enforced by `eslint.config.js` (flat config) for `**/*.js`, browser globals (`window`, `document`):
  - 4-space indent (switch cases indented)
  - single quotes
  - no semicolons (`semi: never`)
  - `eqeqeq` and `camelcase` are both off — loose equality and non-camelCase identifiers are tolerated in this codebase
- `matrix/index.html` is an earlier standalone prototype of the homepage and uses different conventions internally (2-space indent, double quotes, semicolons) — it's a self-contained leftover, not a second source of JS conventions to follow elsewhere.

## Notes

- Images referenced by pages live under `img/` (including `img/portfolio/<ProjectName>/` for portfolio thumbnails/screenshots) — keep new assets in `.webp` where the existing ones already use that format.
- No package beyond `eslint` and `live-server` is required; avoid introducing a bundler/framework unless explicitly asked — the site is intentionally dependency-light static HTML.
