# 8medical — Frontend

Marketing site and booking portal for 8medical emergency medical services, built with **Next.js 14 (App Router)**, React 18 and Tailwind CSS.

> Migrated from Vite + react-router-dom in October 2026. Page components live on unchanged in `src/views`; routing, SEO and analytics are now handled by Next.js.

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

Requires Node 18.17+.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js App Router: one `page.jsx` per route (metadata + thin wrapper), `layout.jsx` (fonts, providers, JSON-LD, cookie consent), `sitemap.js`, `robots.js`, `manifest.js`, `not-found.jsx`, `error.jsx` |
| `src/views/` | The page components (formerly `src/Pages/`) |
| `src/client-pages/` | Client-only wrappers (`ssr: false`) for funnel/auth/admin pages that read localStorage during render |
| `src/components/` | Shared components (+ `ui/` shadcn primitives) |
| `src/lib/router-compat.jsx` | Drop-in `Link` / `useNavigate` backed by `next/navigation` |
| `src/lib/analytics.js` | Clarity / GA / GTM / Tawk loaders, fired only after cookie consent |

## Environment variables

The code references `process.env.VITE_*`. `next.config.js` inlines every `VITE_`-prefixed variable from the build environment into the client bundle, so **existing CI/CD env vars keep working unchanged**. Set `NEXT_PUBLIC_SITE_URL` to override the canonical origin (defaults to `https://www.8medical.co`).

Note: these variables are baked in at **build time** (same as Vite) — rebuild after changing them.

## SEO

- Per-route `metadata` (title, description, canonical, Open Graph, Twitter), `metadataBase` from the site URL.
- `sitemap.xml`, `robots.txt` and a web manifest are generated routes.
- Organization / EmergencyService / WebSite JSON-LD in the root layout.
- Marketing pages are statically prerendered (SSR HTML); funnel, auth and admin pages are client-only and `noindex`.
- Legacy funnel URLs containing spaces (e.g. `/StandBy/.../Ambulance Size`) 308-redirect to hyphenated slugs.
- Lighthouse SEO score: **100** on all indexable pages (verified at build time).

## Routes

Indexable: `/`, `/AboutUs`, `/ServiceEr`, `/ServiceAgt`, `/ServiceAmb`, `/ServiceUg`, `/ServiceAfterLife`, `/Impact`, `/StandBy`, `/AmbulanceTp`, `/AfterLife`, `/ems-week`.
Client-only (noindex): booking funnel under `/StandBy/Nigeria/...`, `/SignIn`, `/CreateAccount`, `/ForgotPassword`, `/ChangePassword`, `/Login`, `/Admin`, `/Admin/EditBooking`, `/OrderHistory`, `/OtherBookings`, `/BookingError`.

## Design system notes

- Shadows use a three-step scale defined in `tailwind.config.js`: `shadow-card` (hairline), `shadow-pop` (popovers/dropdowns), `shadow-modal` (dialogs/sheets). Cards prefer `border border-[#ECEBED]` over elevation.
- Global button press feedback (`scale 0.98`, strong ease-out) and `prefers-reduced-motion` support live in `src/index.css`.
- Figtree is self-hosted in `public/fonts` and preloaded from the root layout.
