# ~/albert simel — portfolio

Design system and motion language live in [DESIGN.md](./DESIGN.md).

React 19 + TypeScript + Vite, animated with framer-motion, inertia scrolling with Lenis.
Fonts (Syne + JetBrains Mono) are bundled locally, so there is no Google Fonts request.

## Run locally

```sh
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # static output in dist/
npm run preview    # serve the built dist/
```

## Deploy to Vercel, keeping simel-coral.vercel.app

The site is fully static — no server, database, or environment variables.
`vercel.json` pins build `npm run build` and output `dist/`.

- **Project connected to a Git repo:** replace the repo contents with this folder, commit, push.
  Vercel rebuilds and the deployment takes over the same `simel-coral.vercel.app` address.
- **CLI:** in this folder run `npx vercel link`, choose the existing `simel-coral` project,
  then `npx vercel --prod`.
- **Dashboard:** existing project → Deployments → upload this folder as a new deployment.

## Structure

- `src/data/site.ts` — all personal copy, projects, skills, links (edit content here)
- `src/components/` — Cursor, Nav, Hero, WorkIndex, ProjectDrawer, About, Contact, Marquee
- `src/styles/` — base, chrome, hero, work, about, contact
- `src/lib/` — motion tokens, smooth scroll
