# Princess of Forex — Website Export

This is a static export of the Princess of Forex landing page, originally built with Elementor on WordPress (`fbrxeydc.elementor.cloud`).

## Structure

```
repo/
├── index.html              # Main page
├── assets/
│   ├── css/                 # All stylesheets (Elementor core, widgets, theme, Google Fonts)
│   ├── js/                  # All scripts (jQuery, Elementor frontend/core, Swiper, etc.)
│   ├── images/              # Local copies of images used on the page
│   ├── maps.html             # Embedded Google Maps iframe resource
│   └── saved_resource.html   # Misc embedded resource from the original page
└── README.md
```

## Notes

- This was generated from a browser "Save Page As → Webpage, Complete" capture plus the live page's HTML, then reorganized into a clean folder structure with readable file names (the original save used messy auto-generated names with spaces and hashes).
- All internal asset references in `index.html` and the CSS files have been rewritten to point to the new `assets/` paths.
- A handful of image references still point to the live site (`https://fbrxeydc.elementor.cloud/wp-content/uploads/...`). These are WordPress auto-generated responsive image sizes (e.g. thumbnails) and one background image that weren't included in the browser's saved copy. They'll continue to load fine as long as your Elementor site stays live. If you want a fully offline copy, download those images from your WordPress Media Library and update the corresponding `src`/`srcset`/`background-image` references.
- Because this was exported from a rendered page rather than pulled via Elementor's own Template Export (Elementor → Tools → Export/Import), it's static HTML/CSS/JS — editing it won't sync back into your Elementor editor. If you ever want an editable version, use Elementor's native export instead.
- Google Fonts (Poppins, Figtree) are loaded via `assets/css/google-font-poppins.css` and `assets/css/google-font-figtree.css`, which reference Google's font CDN directly.

## Usage

Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
npx serve .
```
