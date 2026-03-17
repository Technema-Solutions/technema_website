# Plan: Integrated CMS + Backend for Technema Solutions Website

## Context

Website Technema Solutions saat ini adalah marketing site statis dengan semua konten di file TypeScript (`src/data/*.ts`). User ingin CMS terintegrasi dalam aplikasi yang sama (bukan terpisah) agar semua konten bisa dikelola dengan mudah via dashboard admin. Fokus utama: produk harus dinamis (bisa tambah/hapus, tidak hardcoded 4), UI CMS modern & mobile-friendly, dan seluruh stack harus SEO-friendly.

---

## Tech Stack Decision

| Layer | Technology | Alasan |
|-------|-----------|--------|
| Database | **PostgreSQL + Prisma ORM** | Production-ready, sudah tersedia di server remote (DB: `technema_web_prod`) |
| Auth | **NextAuth.js v5** (Credentials) | Battle-tested, native Next.js App Router support, JWT strategy |
| Mutations | **Server Actions** | Colocated dengan form, reduce client JS, progressive enhancement |
| Validation | **Zod** | Type-safe validation untuk form & server actions |
| Rich Text | **TipTap** | Structured JSON output, cocok dengan ArticleSection[] existing |
| Toast | **Sonner** | Lightweight, RSC-friendly |
| Image Processing | **Sharp** | Resize & WebP conversion on upload |
| Cache | **`unstable_cache` + tags** | Granular invalidation per entity |

---

## Database Schema (Prisma)

File: `prisma/schema.prisma` (SQLite)

### Core Models:
- **User** - Admin authentication (id, name, email, passwordHash, role)
- **SiteSettings** - Singleton: siteName, siteDescription, contact info, hero content, logo
- **Product** - Dynamic products (slug, name, tagline, description, category, features JSON, isPublished, SEO fields, sortOrder)
- **ProductFeatureHighlight** - Per product (icon, title, description, image)
- **ProductCapability** - Per product (icon, title, description)
- **ProductStep** - How it works steps per product
- **ProductUseCase** - Use cases per product
- **ProductStat** - Impact stats per product
- **ProductPricingPlan** - Pricing tiers per product (name, price, features JSON, isPopular)
- **ProductTestimonial** - Testimonials per product
- **ProductIntegration** - Integrations per product
- **ProductFaq** - FAQs per product
- **BlogPost** - Articles (slug, title, excerpt, category, body JSON, isPublished, SEO fields)
- **Service** - Services (icon, title, description, sortOrder)
- **Testimonial** - Homepage testimonials
- **Project** - Portfolio items
- **Client** - Client logos
- **Stat** - Company statistics
- **FaqItem** - General FAQs
- **WhyChooseItem**, **ProcessStep** - Homepage sections
- **NavigationLink**, **Industry** - Navigation
- **FooterColumn**, **FooterLink**, **SocialLink** - Footer
- **MediaFile** - Uploaded media tracking
- **ContactSubmission** - Contact form inbox

---

## Implementation Phases

### Phase 1: Foundation (Database, Auth, Infrastructure)
### Phase 2: Admin Dashboard UI
### Phase 3: Content Management Pages
### Phase 4: Frontend Integration
### Phase 5: SEO Implementation
### Phase 6: Media & Contact Form

---

## Verification

1. `npx prisma db push` - Schema applies cleanly
2. `npx prisma db seed` - All existing data migrated
3. `npm run build` - Build passes without errors
4. Login ke `/admin/login` -> redirect ke dashboard
5. CRUD test setiap entity via admin UI
6. Verify public pages render data dari database
7. Check SEO: view-source metadata, JSON-LD, sitemap.xml
8. Test mobile responsiveness admin UI
9. Test image upload flow
10. Test contact form submission + inbox
