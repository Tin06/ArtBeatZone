# ArtBeatZone Web

Portfolio and lead-generation site for ArtBeatZone, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Open `http://localhost:3000` while the development server is running.

## Notes

- Shared site metadata lives in `src/lib/site.ts`.
- SEO route files live in `src/app/robots.ts`, `src/app/sitemap.ts`, and generated social images.
- The contact form opens a prefilled email draft; wire a real backend or form service before expecting server-side lead capture.
