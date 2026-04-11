# NRBCK Portfolio

First iteration of a personal portfolio built with Astro.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
npm run lint:fix
```

## Tests

```bash
npm test
```

## Deploy (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml`.
On every push to `main`, it builds and deploys the site to GitHub Pages.

Default build values for Pages in this repo:
- `PUBLIC_SITE_URL=https://nrbck.pl`
- `PUBLIC_BASE_PATH=/`
- `PUBLIC_GA_ID=G-48TYZZ9CN4`

## Custom domain

Yes, you can connect your own domain on GitHub Pages.
This repo already includes `public/CNAME` set to `nrbck.pl`.
If needed, set `PUBLIC_SITE_URL=https://nrbck.pl` and `PUBLIC_BASE_PATH=/` in GitHub Actions variables.
