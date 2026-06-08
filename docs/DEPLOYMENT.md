# Deployment — Technema Website

Live site: **https://technemasolutions.co.id**

## TL;DR

```bash
# From the project root, on your Mac:
./scripts/deploy.sh
```

That builds locally, ships a tarball, and activates a new release on the server
(PM2 reload). Database schema changes are applied **separately** (see below).

---

## Architecture

| Layer | Detail |
|------|--------|
| **Server** | Ubuntu 22.04 @ `119.235.250.90` (hostname `technema.technemasolutions.co.id`) |
| **App dir** | `/var/www/technema-website` — release-based (Capistrano-style) |
| **Process manager** | **PM2** process `technema-website` → runs `current/.next/standalone/server.js` (Node 20, fork mode, `PORT=3000`, `HOSTNAME=0.0.0.0`) |
| **PM2 config** | `/var/www/technema-website/ecosystem.config.js` (loads env from `shared/.env`) |
| **Reverse proxy** | **Caddy** (frankenphp) at `/etc/caddy/Caddyfile` — auto-HTTPS, `technemasolutions.co.id` → `reverse_proxy localhost:3000` |
| **Uploads** | Served by Caddy directly from `shared/uploads` at `/uploads/*`; symlinked into each release's `public/uploads` |
| **Database** | PostgreSQL on the **same box** (`127.0.0.1:5432`). Reachable from your Mac via **Tailscale** at `100.85.206.18:5432` (this is what your local `.env` `DATABASE_URL` uses). |

### Directory layout on the server

```
/var/www/technema-website/
├── current -> releases/<timestamp>      # active release (symlink)
├── deploy.sh                            # server-side release script
├── ecosystem.config.js                  # PM2 config
├── releases/<timestamp>/                # each deploy (last 3 kept)
├── shared/
│   ├── .env                             # production env (NOT in git)
│   ├── uploads/                         # user uploads (persistent)
│   └── backups/
└── logs/  (out.log, error.log)
```

## How a deploy works

1. **Local (Mac):** `npx prisma generate` → `npm run build` (Next.js `output: "standalone"`).
2. **Package:** `tar` of `.next public prisma package.json package-lock.json` →
   `/tmp/technema-release.tar.gz`. Use `COPYFILE_DISABLE=1` to avoid macOS `._*` files.
3. **Upload:** `scp` the tarball to the server's `/tmp/`.
4. **Activate:** run `bash /var/www/technema-website/deploy.sh` on the server, which:
   - extracts the tarball into `releases/<timestamp>/`,
   - wires up standalone (copies `public/` + `.next/static` into `.next/standalone/`,
     symlinks `shared/uploads`, copies `shared/.env`),
   - repoints the `current` symlink to the new release,
   - **`pm2 reload technema-website`** (graceful),
   - prunes old releases (keeps the last 3).

The Prisma **Linux** query engine (`debian-openssl-3.0.x`) is bundled by the Mac
build because `prisma/schema.prisma` sets `binaryTargets = ["native", "debian-openssl-3.0.x"]`.

## Database changes

`deploy.sh` does **not** run migrations. Because the production Postgres is
reachable from your Mac over Tailscale (`DATABASE_URL` in your local `.env`),
apply schema changes directly **before** (or independently of) a code deploy:

```bash
npx prisma db push      # applies schema.prisma to the production DB
```

> ⚠️ Your local DB **is** the production DB. Be deliberate with `db push`,
> `db:seed`, and any data scripts — never run `db:reset` against it.

Adding columns/tables is backward-compatible with the currently-running code, so
you can push schema first, then deploy code.

## Verify after deploy

```bash
ssh root@119.235.250.90 'pm2 status'                       # technema-website online
curl -sI https://technemasolutions.co.id/                  # 200
curl -sI https://technemasolutions.co.id/tentang-kami      # 200
curl -s  https://technemasolutions.co.id/llms.txt | head   # text/plain
ssh root@119.235.250.90 'tail -n 40 /var/www/technema-website/logs/error.log'
```

## Rollback

Releases are timestamped and the last 3 are kept:

```bash
ssh root@119.235.250.90
ls -dt /var/www/technema-website/releases/*/        # list, newest first
ln -sfn /var/www/technema-website/releases/<previous-timestamp> /var/www/technema-website/current
pm2 reload technema-website
```

## One-time: passwordless deploys (recommended)

```bash
ssh-copy-id root@119.235.250.90       # installs your public key
```

After this, `./scripts/deploy.sh` runs without password prompts.
