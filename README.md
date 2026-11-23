# Hakalahti – Oil Paintings Portfolio

A portfolio and gallery website for Finnish oil painter Janne Hakalahti.
Built as a freelance project.

[hakalahti.com](https://www.hakalahti.com)

## Features

- Painting gallery grouped by subject (birds, mammals, landscapes, other) with jump links and a modal lightbox
- Age-gated figurative art section with animated curtain reveal
- Sold paintings section
- Inspiration page with a photo and a self-hosted video
- Direct email contact and a Finnish privacy notice
- Fully responsive, keyboard accessible, respects reduced-motion settings
- Dark gallery aesthetic with SVG forest hero

## SEO

- Unique meta title, description and keywords per page
- JSON-LD structured data (Schema.org Person)
- Open Graph tags for social sharing
- Sitemap.xml and robots.txt
- Semantic HTML with correct heading hierarchy
- Descriptive alt texts on all images
- WebP images for fast load times

## Tech stack

- React 19
- Vite
- Hosted on Cloudflare
- Contact via email (no form service)

## Local development

Use Node.js 22.23.4 or a newer patched 22.x release. The version in
`.node-version` selects the Cloudflare Pages build runtime; `.npmrc` rejects
dependency installation with an unsupported Node version.

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Deploy the generated `dist` directory as static files. PHP and a Node.js
application server are not needed to serve this site. In Cloudflare Pages,
remove any older `NODE_VERSION` override or set it to match `.node-version`
for production and preview builds. Confirm the version in the next build log.

## Adding a painting

1. Put the photo (JPG/PNG) in `public/images/` and run:

   ```bash
   python optimoi_kuvat.py
   ```

   It resizes to display dimensions (max 1200px landscape / 900px portrait), converts to WebP at 85% quality, and deletes the originals. Keep a copy of the originals elsewhere.

2. Add an entry to `PAINTINGS` in `src/App.jsx` with its title, size and a `category` (`linnut`, `nisakkaat`, `maisemat` or `muut`). A painting without a category is shown under "Muut".

## Video

The inspiration page plays a self-hosted MP4 from `public/videos/`, with a poster image in `public/images/`. Use H.264/AAC at about 720p and keep the file under roughly 8 MB (Cloudflare Pages allows 25 MB per file). Videos are not processed by `optimoi_kuvat.py`.
