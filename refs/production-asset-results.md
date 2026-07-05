# Maple & Main Cafe Production Asset Results

## Batch Summary
- Still images generated first from `app/production-asset-manifest.md`.
- Hero Candidate A approved as `app/public/assets/hero/hero-window-still.png`.
- Hero Candidate B rejected because people/faces would make the A1 scrub less reliable; source remains at `refs/production-candidates/stills/hero-window-candidate-b.png`.
- Hero video generated only from approved still job `47211541-f2f2-42e6-9fa9-2fb2d75fc5e8`; preset recommendation was declined so the manifest prompt was used literally.
- Logo/icons/head kit/OG generated after visual direction was locked.

## Public Asset Inventory
- Hero still: `app/public/assets/hero/hero-window-still.png`
- Hero video: `app/public/assets/hero/hero-window-scrub.mp4`
- Hero frames: `app/public/assets/frames/hero/window-000.webp` through `window-100.webp`
- Hero placeholder: `app/public/assets/hero/hero-window-lqip.webp`
- Textures: `painted-green-trim.png`, `booth-vinyl-red.png`, `porcelain-tabletop.png`, `menu-paper-overlay.png`
- Food: `breakfast-pancakes.png`, `lunch-soup-sandwich.png`, `coffee-pour.png`
- Audience imagery: `family-booth.png`, `locals-coffee-seat.png`, `traveler-takeout.png`
- Specials: `chalkboard-plate.png`, `handbill-cluster.png`
- Visit: `tabletop-strip.png`, `map-block.png`
- Brand: `logo-mark-source.png`, `monogram-badge-source.png`, `windowpane-maple-pattern.png`
- Icons: `icon-sheet.png`, `coffee.png`, `breakfast.png`, `lunch.png`, `kids.png`, `parking.png`, `pie.png`, `takeout.png`, `hours.png`
- Meta/head: `og-image.png`, `favicon.svg`, `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest`

## Derivation Notes
- Final hero still was downscaled to 2000px wide.
- Hero scrub source video is kept in `refs/production-candidates/video/hero-window-scrub-source.mp4`; public MP4 is silent and optimized.
- Frame export produced 101 frames at 20fps. WebP encoding used `cwebp` because this `ffmpeg` build cannot encode WebP.
- Favicon/app icons use a simplified SVG fallback rather than shrinking the detailed generated badge.
- Icon sheet background-removal left artifacts, so final slices were created by locally keying out the original sheet background.
- `visit-tabletop-strip` generated as 16:9 because the model did not support 21:9; the composition still provides a wide horizontal strip.

## Site Reference Status
The generated website implementation does not exist yet in this workspace, so route/component render usage cannot be mechanically verified in this phase. A site-side registry was created at `app/src/generated/maple-main-assets.ts` so Phase 3 can import a single source of truth. Every public asset has a manifest render slot and should be wired during Phase 3. Rejected and raw candidate assets remain under `refs/production-candidates/`, not `app/public/`.
