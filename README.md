# FITX — Personal Fitness Training Studio, Sahiwal

Production-grade website + lightweight gym management / POS system for **FITX Personal Fitness Training Studio**, Shadman Town, Faisalabad Road, Sahiwal.

**Stack:** MongoDB · Express · React (Vite) · Node — with Tailwind CSS, JWT auth (HTTP-only cookie), role-based admin (admin / staff / trainer).

---

## 1. What’s inside

### Public website (`client/`)
19 routed pages, mobile-first, SEO-structured, using FITX’s **real photography** (optimized WebP), real pricing, real reviews and real business facts only:

| Route | Purpose |
|---|---|
| `/` | Conversion homepage (hero, brand story, programs, trainers, results, women’s split, facilities, CTA) |
| `/about` | Editorial brand story + university recognition + community |
| `/personal-training` | The 4-step coaching system |
| `/weight-loss` | Fat-loss program + real transformations (privacy protected) |
| `/strength-conditioning` | Strength & conditioning coaching |
| `/womens-fitness` | Women’s program, dedicated hours, female coach |
| `/trainers`, `/trainers/:slug` | Trainer directory + individual SEO profiles |
| `/results` | Real Google reviews + transformations, no fabricated stats |
| `/facilities` | Real photo gallery with context |
| `/programs` | Published fee pattern (Group Rs 8,500/mo · One-to-One Rs 16,000/mo · 3-month 10% off) |
| `/nutrition` | Practical nutrition guidance |
| `/blog`, `/blog/:slug` | 6 locally-relevant SEO articles |
| `/faq` | Category FAQs with FAQPage schema |
| `/contact` | Verified contact data + Google Map + directions |
| `/book-consultation` | Lead-capture form → CRM + optional appointment |
| `/privacy-policy`, `/terms-and-conditions`, 404 | Legal & error states |

### Admin / POS (`/admin`)
- **Dashboard** — active members, expiring memberships, today’s appointments/attendance, pending leads, revenue + attendance charts, recent activity.
- **Members** — CRUD, search/filter, deactivate.
- **Plans** — membership plan CRUD (drives public pricing page).
- **POS / Payments** — record payment (Cash / Bank Transfer / Card / Other), auto-extend membership, **printable professional receipt** (Print → PDF).
- **Attendance** — search + mark check-in, today list, member history.
- **Leads / CRM** — website forms land here; statuses New → Converted etc., notes.
- **Appointments** — create/assign trainer/change status.
- **Trainers / Programs / FAQs / Testimonials / Blog / Settings** — full content management; the public site consumes these dynamically.

---

## 2. Setup

```bash
# 1) Install
npm i --prefix server
npm i --prefix client

# 2) Environment (optional — see server/.env.example)
cp server/.env.example server/.env   # set MONGODB_URI + JWT_SECRET for production

# 3) Run (both processes)
npm run dev          # server :5000 + client :5173 (Vite proxies /api)
```

**Database:** if `MONGODB_URI` is set, the server connects to it. If not (local dev), it auto-starts an **embedded MongoDB** (`mongodb-memory-server`) with a persistent `server/.dbdata` directory and **auto-seeds on first boot** — staff accounts plus verified FITX content (trainers, programs, plans, FAQs, testimonials, blog, settings).

**Production:** `npm run build` (client → `client/dist`), then `npm start` — Express serves the API **and** the built site on `PORT` (default 5000).

### Demo accounts
| Role | Email | Password |
|---|---|---|
| Admin | admin@fitx.pk | Admin@123 |
| Staff | staff@fitx.pk | Staff@123 |
| Trainer | trainer@fitx.pk | Trainer@123 |

> Change these immediately in production (`server/src/seeds/seedData.js`).

---

## 3. API overview (`/api/v1`)

Consistent envelope `{ success, data | message, errors }`. Proper status codes, express-validator body validation, rate limiting on auth + lead capture, helmet, CORS allowlist, JWT in HTTP-only cookie (or Bearer).

| Area | Endpoints | Access |
|---|---|---|
| auth | `POST /auth/login`, `GET /auth/me`, `POST /auth/logout` | public / auth |
| members | `GET/POST /members`, `GET/PUT/DELETE /members/:id` | staff+ (delete: admin) |
| plans | `GET /plans` public · write admin | mixed |
| payments | `GET /payments`, `POST /payments`, `GET /payments/:id/receipt` | staff+ |
| attendance | `POST /attendance`, `GET /attendance`, `GET /attendance/member/:id` | staff+/trainer |
| leads | `POST /leads` (rate-limited, public) · `GET/PUT` staff+ | mixed |
| appointments | CRUD | staff+ (trainer read/update) |
| trainers / programs / faqs / testimonials | `GET` public (active only) · write admin | mixed |
| blog | `GET` published public · write admin | mixed |
| settings | `GET` public · `PUT` admin | mixed |
| dashboard | `GET /dashboard` | staff+ |

---

## 4. Verified business data (sources)

All published facts were researched and cross-checked before use:

- **Name / brand:** FITX Personal Fitness Training Studio (Maps: “FITX Fitness Studio”) — tagline *“The most serious & sophisticated personal fitness training in Sahiwal”* (official Facebook).
- **Address:** Shadman Town, Faisalabad Road, Sahiwal 57000 (studio fee pattern + Maps listing).
- **Phone:** 0300 6900206 / 0322 6900206 · **Email:** ranazohaib997@yahoo.com (official Facebook).
- **Hours:** Sat–Thu 11:00–22:00, Fri closed (Maps listing) · Female hours 10:30–13:00 & 15:00–18:00 (studio fee pattern).
- **Pricing:** Group Rs 8,500/mo · Rs 23,000/3mo · One-to-One Rs 16,000/mo · Rs 43,200/3mo (studio fee pattern).
- **Rating:** 4.4 (97 reviews) mirrored from Google; reviews quoted verbatim with names.
- **Recognition:** founder guest speaker, University of Sahiwal (HEC NRPU project, Dec 2025) — from event photography.
- **Socials:** facebook.com/fitxbootcamp · instagram.com/fitxfitnessstudio.
- Everything editable via **Admin → Settings**; anything unverified is a neutral CTA, never an invented claim.

---

## 5. Performance & SEO notes

- Images: source JPEGs (≈9.9 MB) converted to **WebP** (`client/public/images/fitx/**`, ≈1.6 MB total), served with width/height, lazy loading, eager+`fetchpriority` only for the hero.
- Fonts self-hosted via `@fontsource` (no third-party requests); JS ≈ 90 KB gzipped total; vendor chunk split.
- Per-page title/description/canonical/OG/Twitter + JSON-LD (`LocalBusiness`, `Person`, `Article`, `FAQPage`, `ItemList`), `sitemap.xml`, `robots.txt`.
- `prefers-reduced-motion` respected; semantic HTML, skip link, focus-visible styles, labeled forms; WCAG-minded contrast.

## 6. Deployment checklist

1. Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`.
2. `npm run build`, then run `server` (serves API + site) behind your reverse proxy / platform.
3. Point your domain (e.g. fitx.pk) and update `BRAND.siteUrl` in `client/src/lib/brand.js` if different.
4. Change demo passwords; review Settings in admin.
