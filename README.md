# CodeTube

Open-source YouTube clone. Monorepo using npm workspaces.

## Layout

```
.
├── web/      Next.js 15 web app (@codetube/web)
├── docs/     Nextra v4 docs and blog site (@codetube/docs)
├── cloud/    AWS CDK infrastructure (@codetube/cloud)
└── data/     seed data

Gherkin specifications live under `docs/content/specs/` and render at /specs.
```

## Setup

```bash
npm install
```

A single `package-lock.json` and hoisted `node_modules/` live at the repo root.

## Common commands

```bash
npm run dev -w web          # start Next.js dev server
npm run lint -w web         # lint the web app
npm test -w cloud           # run CDK unit tests
npm run build -w cloud      # compile CDK TypeScript
```

See `web/README.md` and `cloud/README.md` for workspace-specific notes.
