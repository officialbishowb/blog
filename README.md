# Blog System

This branch contains the version of my blog that's currently deployed. Updates still in progress live in the [v2](https://github.com/officialbishowb/blog/tree/v2) branch.

Built with Next.js and [TinaCMS](https://tina.io) (Tina Cloud). Posts are markdown files in `content/posts`, and images go in `public/assets`.

## Requirements

- [Bun](https://bun.sh)
- A Tina Cloud project (client ID and token)
- Docker (only to run the production setup)

## Environment

```sh
cp .env.example .env
```

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID` | Client ID from Tina Cloud |
| `NEXT_PUBLIC_TINA_TOKEN` | **Read-only** token from Tina Cloud (it ends up in the client bundle) |
| `NEXT_PUBLIC_TINA_PUBLIC_BRANCH` | Branch Tina Cloud reads and writes (default `main`) |
| `TUNNEL_TOKEN` | Cloudflare tunnel token (docker compose only) |

## Development

```sh
bun install
bun run tina:dev        # Next.js dev server + Tina admin at /admin
```

| Script | What it does |
| --- | --- |
| `bun run dev` | Next.js only, without the CMS |
| `bun run tina:generate` | Regenerate `tina/__generated__` and `tina/tina-lock.json` |
| `bun run tina:build` | Production build (Tina admin + Next.js) |
| `bun run start` | Serve the production build |

## Deployment (Docker)

```sh
docker compose up -d --build
```

This builds the site, serves it on port `3001`, and exposes it through a Cloudflare tunnel. The Tina variables are passed in as build args because `next build` bakes them into the site.

## Gotchas

- **`lockfile had changes, but lockfile is frozen`**: you changed `package.json` but didn't update the lockfile. Run `bun install` and commit `bun.lock`.
- **`local GraphQL schema doesn't match the remote GraphQL schema`**: Tina Cloud indexes `tina/tina-lock.json` from GitHub. After you change `tina/config.ts` or upgrade `tinacms`, run `bun run tina:generate`, commit everything in `tina/`, push, and wait for Tina Cloud to re-index before you build.
