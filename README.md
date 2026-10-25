# LANIFY Portfolio

Personal portfolio built with Next.js, React and TypeScript.

## Run locally

```bash
npm ci
npm run dev -- --port 3000
```

## Production build

```bash
npm run build
```

This project uses static export for GitHub Pages.

## GitHub Pages

Repository is configured for Pages deployment via GitHub Actions.
The site is served from:

https://kefirchick13.github.io/lanify_portfolio/

## Project structure

- `app/` — App Router pages and layout
- `components/` — UI blocks and portfolio components
- `lib/portfolio-content.json` — portfolio text and sketch metadata
- `public/` — static images and assets
- `next.config.ts` — static export and Pages config

## Notes

- The portfolio is intentionally content-driven.
- Sketch entries are stored in JSON and rendered dynamically.
- Asset paths are configured for the GitHub Pages subpath.

## Contact

- Telegram: @lanify_rn
- Instagram: lanify__rn
- Email: kefrciksekov@gmail.com
