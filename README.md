# Hakalahti – Oil Paintings Portfolio

A portfolio and gallery website for Finnish oil painter Janne Hakalahti.
Built as a freelance project.

[hakalahti.com](https://www.hakalahti.com)

## Features

- Painting gallery with modal lightbox
- Age-gated figurative art section with animated curtain reveal
- Contact form (Formspree)
- Fully responsive design
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
- Deployed on Netlify with automatic GitHub deploys
- Contact form via Formspree

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Image optimisation

New painting photos (JPG/PNG) go in `public/images/`. Run:

```bash
python optimoi_kuvat.py
```

Resizes to display dimensions (max 1200px landscape / 900px portrait), converts to WebP at 85% quality, and deletes the originals.
