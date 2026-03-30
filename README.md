# next-trpc-repro

Minimal reproduction for: **tRPC Pages Router API routes return 404 silently in Next.js 16.2**

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page calls `GET /api/trpc/hello`. In Next.js 16.2 the request returns 404 and tRPC fails silently. In Next.js 16.1.6 it works.

## Reproduce

1. Install and run with `next@16.2.0` — observe the 404
2. Downgrade to `next@16.1.6` — observe it works

## Key configuration

- `"type": "module"` in `package.json`
- `typedRoutes: true` in `next.config.mjs`
- Pages Router (`src/pages/`)
- tRPC handler at `src/pages/api/trpc/[trpc].ts` using `createNextApiHandler`

## Versions

| Package | Version |
|---------|---------|
| next | 16.2.0 |
| @trpc/server | ^11.5.1 |
| react | ^19.0.0 |

## Expected behavior

`GET /api/trpc/hello?batch=1&input=...` returns 200 with tRPC response body.

## Actual behavior

Returns 404 with no error logged server-side. The `onError` callback in `createNextApiHandler` is never called. The Next.js server logs nothing for the request.
