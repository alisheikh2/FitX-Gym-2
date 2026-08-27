# Deploying FITX to Vercel

The project is Vercel-ready out of the box:

- **Frontend:** Vite build (`client/dist`) served as static output with SPA fallback.
- **Backend:** the Express API runs as a single serverless function (`api/index.js`), reached via the rewrite `/api/* → /api/index`.
- **Database:** MongoDB Atlas (or any hosted MongoDB). The embedded dev database is disabled on Vercel.

## 1. Prepare a database

Create a free MongoDB Atlas cluster, create a DB user, and copy the connection string:

```
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/fitx
```

## 2. Deploy

**Option A — Vercel CLI (fastest from this folder):**

```bash
npm i -g vercel
vercel          # first run: links/creates the project
# set the env var when prompted, or afterwards in the dashboard:
vercel env add MONGODB_URI production   # paste the Atlas string
vercel --prod
```

**Option B — Git import:** push this folder to GitHub/GitLab, then *New Project → Import* in Vercel.
Vercel auto-detects everything from `vercel.json` (build command, output dir, function). Add the env var in
*Project → Settings → Environment Variables*:

| Variable | Value |
|---|---|
| `MONGODB_URI` | your Atlas connection string |
| `JWT_SECRET` | a long random string |
| `CLIENT_URL` | your Vercel URL (e.g. `https://fitx.vercel.app`) |

**First request:** the serverless function connects to Mongo and **auto-seeds** the verified FITX content
(trainers, programs, plans, FAQs, testimonials, blog, settings) plus the staff accounts below.
If the first request times out on a slow plan, open the site once more or run a local seed against the same
`MONGODB_URI`: `MONGODB_URI=... node server/src/seeds/seed.js`.

## 3. Sign in

`/admin` → `admin@fitx.pk` / `Admin@123` (change after first login).

## Notes

- Static images, sitemap.xml and robots.txt are served from the build output (CDN-cached).
- The API is same-origin on Vercel, so CORS/cookies “just work”.
- `express-rate-limit` uses in-memory storage per function instance on Vercel — fine for MVP scale.
- Local development is unchanged: `npm run dev` (embedded MongoDB, no env vars needed).
