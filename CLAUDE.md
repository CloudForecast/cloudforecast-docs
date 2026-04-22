# CloudForecast Docs

Public documentation site for CloudForecast, built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) theme.

## Stack

- **Astro** 6 + **@astrojs/starlight** 0.38
- **TypeScript** (config in `tsconfig.json`)
- **Sharp** for image optimization
- Custom fonts: Satoshi (local woff2 in `src/assets/fonts/`)

## Commands

| Command           | What it does                              |
| :---------------- | :---------------------------------------- |
| `npm run dev`     | Local dev server at `http://localhost:4321` |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the built site locally            |
| `npm run astro`   | Run Astro CLI commands                    |

## Layout

```
src/
├── assets/              # Logo, fonts, images referenced from docs
├── components/          # Starlight component overrides (SiteTitle, SocialIcons, ThemeSelect)
├── content/
│   ├── docs/            # All documentation pages (.md / .mdx)
│   └── ...
├── content.config.ts    # Astro content collection config (uses Starlight's docsSchema)
└── styles/custom.css    # Site-wide style overrides
astro.config.mjs         # Starlight config — sidebar, logo, component overrides
```

### Content sections

Docs under `src/content/docs/` are organized into:

- `overview/` — What CloudForecast is, FAQ
- `getting-started/` — Setup guides (AWS, Azure, Azure CSP, Databricks, container costs, ZeroWaste)
- `features/` — Per-feature docs (Cost Groups, Cost Detective, ZeroWaste, RI/SP, MAP Tracker, etc.)
- `integrations/` — Slack, Teams, Jira, ProsperOps, Cortex
- `account/` — Settings, billing, SSO

File routes map to URLs based on filename (Starlight convention).

## Editing docs

- Pages are Markdown (`.md`) or MDX (`.mdx`) with Starlight frontmatter (`title`, `description`, etc.).
- Images go in `src/assets/` and are embedded via relative links so Astro can optimize them.
- Static files (favicons, downloadable assets) go in `public/`.
- The sidebar is **manually ordered** in `astro.config.mjs` — when adding a new page, also add it to the matching `sidebar` group there, otherwise it won't appear in navigation.

## Conventions

- Keep the sidebar grouping in `astro.config.mjs` in sync with the directory structure under `src/content/docs/`.
- Prefer editing existing pages over creating new top-level sections — new sections require a sidebar entry.
- Custom component overrides live in `src/components/` and are wired up via the `components:` block in `astro.config.mjs`.

## Commit messages

- Do **not** include `Co-Authored-By: Claude` trailers or any mention of Claude/AI assistance in commit messages.
