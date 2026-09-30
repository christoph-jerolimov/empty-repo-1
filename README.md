# Blueprint Portfolio

Christoph's portfolio site, drawn as an engineering blueprint. Built with [Astro](https://astro.build) as a fully static site.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serves dist/
```

Requires Node 22.12 or newer.

## Layout

- `src/data/site.ts` — all content (projects, skills, experience, posts, open source) and the theme palette. Edit this to change what the site shows.
- `src/pages/index.astro` — Sheet 01, the home page.
- `src/pages/dwg/[id].astro` — Sheet 02, one prerendered detail page per project (`/dwg/ledger/`, …).
- `src/layouts/Sheet.astro` — shared shell: fonts, theme bootstrap, header strip, theme chooser.
- `src/components/ThemeChooser.astro` — the fixed swatch panel and its client script.
- `src/styles/global.css` — all styling. Every colour derives from `--bg` and `--ink`.

## Themes

31 themes are defined in `src/data/site.ts`. The chosen theme is stored in `localStorage` and applied before first paint. Themes with a `bar` gradient also draw an accent stripe along the top of the sheet.
