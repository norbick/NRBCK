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

## Deploy (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml`.
On every push to `main`, it builds and deploys the site to GitHub Pages.

Default build values for Pages in this repo:
- `PUBLIC_SITE_URL=https://norbick.github.io`
- `PUBLIC_BASE_PATH=/NRBCK`

## Custom domain

Yes, you can connect your own domain on GitHub Pages.
When you are ready, we can add a `CNAME` file and switch `PUBLIC_BASE_PATH` to `/`.
