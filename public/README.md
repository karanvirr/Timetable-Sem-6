Place your app icons in this `public/` folder so they are served from the site root.

Recommended files/names (used by index.html and manifest.json):

- `apple-touch-icon.png` — 180x180 PNG
- `apple-touch-icon-152.png` — 152x152 PNG
- `apple-touch-icon-120.png` — 120x120 PNG
- `android-chrome-192x192.png` — 192x192 PNG (for Android/manifest)
- `android-chrome-512x512.png` — 512x512 PNG (for Android/manifest)
- `safari-pinned-tab.svg` — monochrome SVG for Safari pinned tabs
- `favicon.ico` — root favicon (already present)

Tips to generate icons quickly:

- Use an online generator (search "favicon generator" / "PWA asset generator")
- Or use `pwa-asset-generator`:

  ```bash
  npx pwa-asset-generator path/to/source.png public/ --inject
  ```

After adding these files, deploy to Vercel or run `npm run build` and confirm `manifest.json` and icons are reachable at `https://<your-site>/manifest.json` and `https://<your-site>/apple-touch-icon.png`.
