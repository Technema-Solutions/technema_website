# Technema Solutions Website

Website perusahaan **Technema Solutions** — perusahaan IT yang menyediakan layanan transformasi digital, pengembangan software, dan konsultasi bisnis.

**Live**: [https://technemasolutions.co.id](https://technemasolutions.co.id)

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling**: Tailwind CSS v4 (CSS-based config via `@theme inline` di `globals.css`)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (credentials-based, JWT sessions)
- **Animations**: Framer Motion, Swiper
- **Icons**: Lucide React
- **Image Processing**: Sharp

## Prasyarat

- Node.js 18+ (disarankan 20 LTS)
- PostgreSQL 14+
- npm

## Development Setup

```bash
# Clone repository
git clone https://github.com/Technema-Solutions/technema_website.git
cd technema_website

# Install dependencies
npm install

# Copy dan isi environment variables
cp .env.example .env
# Edit .env sesuai kredensial lokal Anda

# Push schema database
npx prisma db push

# Seed data awal (admin user + data default)
npx prisma db seed

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/technema_web_prod?schema=public` |
| `AUTH_SECRET` | Secret untuk NextAuth.js (generate: `openssl rand -base64 32`) | `RPay1ng+VYszrq4c...` |
| `NEXTAUTH_URL` | URL aplikasi | `http://localhost:3000` (dev) / `https://technemasolutions.co.id` (prod) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Analytics service account | _(opsional)_ |
| `GOOGLE_PRIVATE_KEY` | Google private key | _(opsional)_ |
| `GA4_PROPERTY_ID` | Google Analytics 4 property ID | _(opsional)_ |
| `PAGESPEED_API_KEY` | PageSpeed Insights API key | _(opsional)_ |

## Scripts

```bash
npm run dev          # Dev server (Turbopack) di localhost:3000
npm run build        # Production build (standalone output)
npm run start        # Jalankan production build
npm run lint         # ESLint
npm run db:push      # Push Prisma schema ke database
npm run db:seed      # Seed data awal
npm run db:reset     # Reset database + re-seed
```

## Admin Dashboard

Akses admin di `/admin/login`. Default credentials setelah seed:
- Email: `admin@technema.com`
- Password: `admin123`

> **Segera ganti password default setelah deployment!**

## Deployment ke VPS

Website di-deploy ke VPS dengan arsitektur:

```
VPS (119.235.250.90)
├── Caddy (reverse proxy + auto SSL)
├── PM2 (process manager)
├── Next.js Standalone (port 3000)
└── PostgreSQL
```

### Struktur Directory di VPS

```
/var/www/technema-website/
├── current/              → symlink ke release aktif
├── releases/             → setiap deploy = folder baru (max 3 tersimpan)
├── shared/
│   ├── uploads/          → file uploads (persistent)
│   ├── .env              → production environment variables
│   └── backups/          → database backups
├── logs/                 → PM2 log files
├── ecosystem.config.js   → PM2 config
└── deploy.sh             → deployment script
```

### Deploy Update

**1. Build di lokal:**

```bash
npm run build
```

**2. Pack artifacts:**

```bash
tar -czf /tmp/technema-release.tar.gz .next/standalone .next/static public prisma package.json package-lock.json
```

**3. Transfer ke VPS:**

```bash
scp /tmp/technema-release.tar.gz root@119.235.250.90:/tmp/
```

**4. Jalankan deploy script di VPS:**

```bash
ssh root@119.235.250.90 "/var/www/technema-website/deploy.sh"
```

Atau dalam satu command:

```bash
npm run build && \
tar -czf /tmp/technema-release.tar.gz .next/standalone .next/static public prisma package.json package-lock.json && \
scp /tmp/technema-release.tar.gz root@119.235.250.90:/tmp/ && \
ssh root@119.235.250.90 "/var/www/technema-website/deploy.sh"
```

### Apa yang dilakukan deploy.sh

1. Extract archive ke folder release baru (timestamped)
2. Copy static files ke standalone directory
3. Symlink persistent uploads
4. Copy production `.env`
5. Update symlink `current` ke release baru
6. Reload PM2 (zero-downtime)
7. Cleanup release lama (simpan 3 terakhir)

### Rollback

```bash
# Lihat release yang tersedia
ssh root@119.235.250.90 "ls -la /var/www/technema-website/releases/"

# Rollback ke release sebelumnya
ssh root@119.235.250.90 "ln -sfn /var/www/technema-website/releases/YYYYMMDD-HHMMSS /var/www/technema-website/current && pm2 reload technema-website"
```

### Monitoring

```bash
# Status PM2
ssh root@119.235.250.90 "pm2 status"

# Logs
ssh root@119.235.250.90 "pm2 logs technema-website --lines 50"

# Error logs
ssh root@119.235.250.90 "pm2 logs technema-website --err --lines 50"
```

## Infrastruktur

| Komponen | Detail |
|----------|--------|
| **VPS** | Ubuntu 22.04, 1 vCPU, 1GB RAM + 2GB Swap |
| **Web Server** | Caddy v2.9 (auto SSL via Let's Encrypt) |
| **Process Manager** | PM2 6.x |
| **Database** | PostgreSQL 17.4 |
| **Node.js** | v20.x LTS |
| **Domain** | technemasolutions.co.id (DNS di HostingCeria) |
| **SSL** | Auto-managed oleh Caddy (Let's Encrypt + ZeroSSL) |
