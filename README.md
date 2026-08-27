# Pixelasia Productions Dili — Website v2

New website for Pixelasia Productions Dili, built as a plain HTML/CSS/JS one-pager and deployed via Netlify.

## Stack

- **Plain HTML5 + CSS3 + Vanilla JS** (no build step)
- **Fonts:** Playfair Display + DM Sans via Google Fonts
- **Forms:** Netlify Forms (built-in spam protection via honeypot)
- **Hosting:** Netlify with CDN

## Project Structure

```
pixelasia-website-v2/
├── index.html          # Main one-pager
├── thank-you.html      # Form submission confirmation page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Nav behaviour, form handling
├── assets/
│   ├── images/         # ← Add real images here (WebP preferred)
│   └── icons/          # ← Client logos, icons
├── netlify.toml        # Netlify build + headers config
└── README.md
```

## Assets to Replace (Checklist)

| File | Description | Size target |
|------|-------------|-------------|
| `assets/images/hero-1.jpg` … `hero-6.jpg` | Hero slideshow (6 images) | ≤ 120 KB each (WebP) |
| `assets/images/work-running-far.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/work-feto-fantastiku.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/work-super-trainer.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/work-diff.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/work-road-acceptance.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/work-sbcc.jpg` | Portfolio thumbnail | ≤ 80 KB (WebP) |
| `assets/images/case-mobile-cinema.jpg` | Featured case video thumbnail | ≤ 120 KB (WebP) |
| `assets/images/team-lena.jpg` | Team photo — Lena Lenzen | ≤ 80 KB (WebP) |
| `assets/images/team-member-2.jpg` | Team photo | ≤ 80 KB (WebP) |
| `assets/images/team-member-3.jpg` | Team photo | ≤ 80 KB (WebP) |
| `assets/images/diff-event.jpg` | DIFF section background | ≤ 120 KB (WebP) |
| `assets/images/diff-poster.jpg` | DIFF right column image | ≤ 80 KB (WebP) |
| `assets/images/og-image.jpg` | Open Graph image (1200×630) | ≤ 200 KB |
| `assets/icons/logo-purple.svg` | Pixelasia logo (purple, for nav) | SVG |
| `assets/icons/logo-white.svg` | Pixelasia logo (white, for footer) | SVG |
| Client logos (8×) | Monochrome SVG/PNG | SVG preferred |

> **Tip:** Use [Squoosh](https://squoosh.app) or `cwebp` CLI to convert images to WebP.

## Netlify Forms Setup

The contact form uses Netlify's built-in form handling. No additional configuration needed — Netlify detects the `data-netlify="true"` attribute automatically on deploy.

- Form submissions appear in the **Netlify dashboard → Forms** tab
- Email notifications can be configured there too
- A honeypot field (`bot-field`) is included for spam protection

## Local Development

No build step needed — open `index.html` directly in a browser, or use a simple local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

> Note: Netlify Forms only work on the deployed site, not locally.

## Deploy to Netlify

1. Push this repo to GitHub (`Pixelasia-Dili` org)
2. Log into [netlify.com](https://netlify.com) → **Add new site → Import an existing project**
3. Connect the GitHub repo
4. Build settings: leave blank (no build command, publish directory = `.`)
5. Click **Deploy**

## Content Updates

All content is in `index.html` — search for the relevant section comment (e.g. `<!-- CONTACT -->`) and edit directly.

## Contact Details

- **Email:** info@pixelasia-dili.com
- **Phone/WhatsApp:** +670 7802 4019
- **Address:** Rua St. Antonio 11, Dili, Timor-Leste
- **Facebook:** https://www.facebook.com/pixelasia
- **YouTube:** https://www.youtube.com/@pixelasia
