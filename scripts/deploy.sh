#!/usr/bin/env bash
#
# Deploy the Technema website to production.
#
# Flow: build locally (Next.js standalone) -> tarball -> scp to server ->
# run the server-side release script (/var/www/technema-website/deploy.sh),
# which activates the new release and reloads PM2.
#
# Usage:
#   ./scripts/deploy.sh
#
# Config via env vars (defaults shown):
#   DEPLOY_HOST=119.235.250.90
#   DEPLOY_USER=root
#   DEPLOY_PORT=22
#   REMOTE_APP_DIR=/var/www/technema-website
#
# Auth: uses plain ssh/scp — configure an SSH key (ssh-copy-id) for passwordless
# deploys, otherwise you'll be prompted for the password by ssh/scp.
#
# NOTE: The database is NOT migrated by this script. Apply schema changes
# separately with `npx prisma db push` (the app's Postgres is reachable from
# your machine via Tailscale). See docs/DEPLOYMENT.md.
set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-119.235.250.90}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/var/www/technema-website}"
TARBALL="/tmp/technema-release.tar.gz"

cd "$(dirname "$0")/.."

echo "==> [1/5] Generating Prisma client"
npx prisma generate

echo "==> [2/5] Building (next build, standalone output)"
npm run build

echo "==> [3/5] Creating release tarball"
# COPYFILE_DISABLE prevents macOS AppleDouble (._*) files in the archive.
# Exclude .next/cache (build cache) and public/uploads (the server discards it
# and symlinks shared/uploads instead) to keep the upload lean.
COPYFILE_DISABLE=1 tar \
  --exclude='.next/cache' \
  --exclude='public/uploads' \
  -czf "$TARBALL" \
  .next public prisma package.json package-lock.json

echo "==> [4/5] Uploading to ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/"
scp -P "$DEPLOY_PORT" "$TARBALL" "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/technema-release.tar.gz"

echo "==> [5/5] Running remote deploy.sh"
ssh -p "$DEPLOY_PORT" "${DEPLOY_USER}@${DEPLOY_HOST}" "bash ${REMOTE_APP_DIR}/deploy.sh"

echo "==> Done. Verify: https://technemasolutions.co.id"
