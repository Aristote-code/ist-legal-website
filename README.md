# IST Legal — website

Redesign of the IST Legal marketing site (hackathon concept).

**Stack:** Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript · Hugeicons

## Run locally

```bash
npm install
npm run dev
```

## Where things live

- `src/content/site.ts` — all site copy (nav, menus, hero). Edit wording here.
- `src/app/globals.css` — design tokens from Figma and the logo animation.
- `src/components/` — `Navigation` (mega menus), `Hero`, `Logo` (+ `LogoLoader`), `icons`.

## Before a real launch

- Replace the placeholder photography (`public/media/`) with licensed IST Legal footage/imagery.
- Confirm the Certia font licence covers web embedding.
