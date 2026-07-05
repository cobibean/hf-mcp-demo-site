# Maple & Main Cafe Production Asset Manifest

Production assets must be generated only after this manifest exists. All prompts inherit the locked palette: front window green `#2F5F4A`, booth vinyl red `#9E3F32`, porcelain white `#F7F2EA`, coffee roast `#34251E`, maple syrup `#C17835`, sidewalk blue-gray `#7E9397`. Unless the asset is a logo or icon source, prompts must include: no readable text, no embedded logo, no watermark.

## 1. Hero Window Candidate A
- Asset name: `hero-window-candidate-a`
- Renders in: Hero / Morning Window
- Purpose: First candidate for the A1 scrub source, built from the front-window board.
- Aspect ratio: `16:9`
- Recommended model: `gpt_image_2`
- Generation prompt: Wide horizontal photoreal cafe front window at morning service for Maple & Main Cafe, green painted trim `#2F5F4A`, red booth vinyl visible behind glass `#9E3F32`, porcelain mug on counter, coffee steam, light condensation on the window, small-town main street reflection, coffee roast shadows `#34251E`, maple syrup glint `#C17835`, sidewalk blue-gray base `#7E9397`, cinematic but believable family restaurant scale, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/hero/hero-window-candidate-a.png`
- Fallback if generation fails: Simplify to a clean still life of green window trim, red booth, mug, and steam with no street reflection.

## 2. Hero Window Candidate B
- Asset name: `hero-window-candidate-b`
- Renders in: Hero / Morning Window
- Purpose: Alternate A1 scrub source with more interior counter depth.
- Aspect ratio: `16:9`
- Recommended model: `gpt_image_2`
- Generation prompt: Wide horizontal cafe interior seen through the front window, low morning light, red booth along the right side, green window frame in foreground, porcelain plates crossing the pass, coffee steam above a mug, family restaurant warmth without luxury styling, palette locked to `#2F5F4A`, `#9E3F32`, `#F7F2EA`, `#34251E`, `#C17835`, `#7E9397`, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/hero/hero-window-candidate-b.png`
- Fallback if generation fails: Use Candidate A and crop it for stronger interior depth.

## 3. Hero Still Winner
- Asset name: `hero-window-still`
- Renders in: Hero / Morning Window, reduced-motion fallback, preload poster
- Purpose: Approved still copied from the stronger hero candidate.
- Aspect ratio: `16:9`
- Recommended model: derived from selected `gpt_image_2` result
- Generation prompt: No new generation. Select the stronger candidate after visual review and copy it as the canonical hero still.
- Destination path: `app/public/assets/hero/hero-window-still.png`
- Fallback if generation fails: Use the best completed candidate under its original filename and update code references.

## 4. Hero Scrub Video
- Asset name: `hero-window-scrub-video`
- Renders in: Hero / Morning Window
- Purpose: Five-second A1 scroll-scrub source video where scrolling opens the cafe day.
- Aspect ratio: `16:9`
- Recommended model: `seedance_2_0` image-to-video from `hero-window-still`
- Generation prompt: From the approved hero still, create a 5-second no-cut motion shot. Slow steady push through the cafe window, condensation clearing slightly, coffee steam rising, light shifting across green trim and red booth vinyl, plate movement suggested softly in the background. Start and end states must differ clearly. No cuts, no camera shake, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/hero/hero-window-scrub.mp4`
- Fallback if generation fails: Use the still as a static hero and implement the A1 frame renderer with a single poster frame plus scroll-linked crop/scale.

## 5. Hero Scrub Frames
- Asset name: `hero-window-frames`
- Renders in: Hero / Morning Window canvas sequence
- Purpose: Extracted frame sequence for scroll-driven playback.
- Aspect ratio: `16:9`
- Recommended model: derived with `ffmpeg` from `hero-window-scrub-video`
- Generation prompt: No model generation. Export approximately 100 webp frames at 20fps, 1280px wide, from the scrub video.
- Destination path: `app/public/assets/frames/hero/window-000.webp` through `app/public/assets/frames/hero/window-099.webp`
- Fallback if generation fails: Export jpg frames instead, or use 24 still-frame duplicates from the hero still with subtle CSS scale.

## 6. Painted Green Trim Texture
- Asset name: `texture-painted-green-trim`
- Renders in: Section backgrounds, nav rail, footer rail
- Purpose: Material plate for painted cafe trim surfaces.
- Aspect ratio: `3:2`
- Recommended model: `gpt_image_2`
- Generation prompt: Macro material texture of old but cared-for painted cafe window trim, deep green `#2F5F4A`, faint brush marks, tiny chips, satin finish, morning side light, flat enough to tile as a website section plate, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/textures/painted-green-trim.png`
- Fallback if generation fails: Build a CSS texture with green base, subtle noise, and thin darker inset lines.

## 7. Booth Vinyl Macro
- Asset name: `texture-booth-vinyl-red`
- Renders in: Counter Favorites, Audience Paths, section accents
- Purpose: Red material crop for the single booth-vinyl brand moment.
- Aspect ratio: `3:2`
- Recommended model: `gpt_image_2`
- Generation prompt: Macro crop of red diner booth vinyl `#9E3F32`, stitched channels, soft morning highlight, slight wear, no people, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/textures/booth-vinyl-red.png`
- Fallback if generation fails: Use a cropped red booth region from a completed content image.

## 8. Porcelain Tabletop Coffee Ring
- Asset name: `texture-porcelain-tabletop`
- Renders in: Daily Reasons, Counter Favorites, footer pattern areas
- Purpose: Porcelain paper-like base plate with a subtle coffee ring.
- Aspect ratio: `3:2`
- Recommended model: `gpt_image_2`
- Generation prompt: Light porcelain-white tabletop `#F7F2EA`, faint cafe paper grain, subtle coffee ring, tiny green rim line, soft daylight, enough empty field for web layout background, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/textures/porcelain-tabletop.png`
- Fallback if generation fails: Use CSS background color `#F7F2EA` with procedural noise and a hand-made radial coffee-ring overlay.

## 9. Breakfast Plate
- Asset name: `food-breakfast-pancakes`
- Renders in: Daily Reasons, Counter Favorites
- Purpose: Primary breakfast crop and large Counter Favorites image.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Photoreal plate of buttermilk pancakes on white porcelain with thin green rim, maple syrup pour, square of butter, family cafe counter surface, red booth blur in background, palette locked to Maple & Main colors, appetizing but not glossy commercial styling, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/food/breakfast-pancakes.png`
- Fallback if generation fails: Generate a simpler top-down pancake plate on porcelain with no background context.

## 10. Lunch Plate
- Asset name: `food-lunch-soup-sandwich`
- Renders in: Daily Reasons, Counter Favorites
- Purpose: Lunch meal crop for sandwich and soup content.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Photoreal turkey club sandwich and tomato soup on cafe porcelain, green rim plate, simple diner table, red booth vinyl in soft background, practical comfort food, natural daylight, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/food/lunch-soup-sandwich.png`
- Fallback if generation fails: Generate only the sandwich on a plate and represent soup with copy and icon.

## 11. Coffee Pour
- Asset name: `food-coffee-pour`
- Renders in: Daily Reasons, Counter Favorites, Footer / Last Cup
- Purpose: Coffee detail crop and small closing visual.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Close photoreal coffee being poured into a porcelain mug with green rim, visible steam, maple-colored reflection, cafe counter in soft focus, no brand text on mug, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/food/coffee-pour.png`
- Fallback if generation fails: Use a static steaming mug still with no pour.

## 12. Family Booth Moment
- Asset name: `people-family-booth`
- Renders in: For Locals, Families, Travelers
- Purpose: Believable family seating crop for the families path panel.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Believable small-town cafe booth moment, family hands around breakfast plates, no faces centered, red booth vinyl, green trim details, warm morning light, comfortable space for kids, documentary crop, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/people/family-booth.png`
- Fallback if generation fails: Use a booth tabletop crop with plates and kids menu, no people.

## 13. Locals Coffee Seat
- Asset name: `people-locals-coffee-seat`
- Renders in: For Locals, Families, Travelers
- Purpose: Regulars/local path crop without fake testimonial faces.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Regular's cafe seat with porcelain mug, folded local newspaper with unreadable abstract print, red booth edge, green trim reflection, familiar morning table feeling, no faces, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/people/locals-coffee-seat.png`
- Fallback if generation fails: Crop the hero still to a mug and booth detail.

## 14. Traveler Takeout Cup
- Asset name: `people-traveler-takeout`
- Renders in: For Locals, Families, Travelers
- Purpose: Traveler/road-trip path crop for takeout and weekend drive context.
- Aspect ratio: `4:3`
- Recommended model: `nano_banana_pro`
- Generation prompt: Takeout coffee cup and paper bag on small-town cafe table beside folded road map, green trim reflection, sidewalk blue-gray shadows, no readable labels, no embedded logo, no watermark.
- Destination path: `app/public/assets/people/traveler-takeout.png`
- Fallback if generation fails: Use a cup-and-map still without bag details.

## 15. Specials Chalkboard Plate
- Asset name: `specials-chalkboard-plate`
- Renders in: This Week At Maple & Main
- Purpose: Main specials-board image with chalk marks as texture only.
- Aspect ratio: `4:3`
- Recommended model: `gpt_image_2`
- Generation prompt: Cafe chalkboard specials board on deep green wall, framed wood board, chalk food doodles and ruled lines only, no readable text, red booth edge below, porcelain mug and syrup bottle at bottom, handbill rhythm, no embedded logo, no watermark.
- Destination path: `app/public/assets/specials/chalkboard-plate.png`
- Fallback if generation fails: Use a clean green board texture and render all specials in HTML.

## 16. Specials Handbill Cluster
- Asset name: `specials-handbill-cluster`
- Renders in: This Week At Maple & Main
- Purpose: Pinned paper notes around the board, without generated text.
- Aspect ratio: `3:2`
- Recommended model: `gpt_image_2`
- Generation prompt: Cluster of pinned cafe handbills on painted green wall, red and porcelain paper scraps, tape and brass pins, maple syrup accent marks, graphic poster energy, abstract lines only, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/specials/handbill-cluster.png`
- Fallback if generation fails: Build handbill shapes in CSS and add a paper texture from `texture-porcelain-tabletop`.

## 17. Visit Tabletop Strip
- Asset name: `visit-tabletop-strip`
- Renders in: Visit Details
- Purpose: Wide practical image strip behind hours and contact details.
- Aspect ratio: `21:9`
- Recommended model: `gpt_image_2`
- Generation prompt: Wide horizontal cafe tabletop strip with porcelain mug, syrup bottle, silverware, folded napkin, red booth back, green table edge, enough clean space for overlay bands, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/visit/tabletop-strip.png`
- Fallback if generation fails: Crop `food-coffee-pour` and extend with CSS color blocks.

## 18. Map Block Texture
- Asset name: `visit-map-block`
- Renders in: Visit Details
- Purpose: Stylized local map block that supports the directions CTA.
- Aspect ratio: `16:9`
- Recommended model: `gpt_image_2`
- Generation prompt: Abstract small-town street map block in sidewalk blue-gray `#7E9397` and porcelain white, green location pin shape, thin route lines, no readable street names, no embedded logo, no watermark, designed as a web section image.
- Destination path: `app/public/assets/visit/map-block.png`
- Fallback if generation fails: Draw the map block in CSS/SVG with abstract streets and one green pin.

## 19. Logo Mark Source
- Asset name: `brand-logo-mark-source`
- Renders in: Nav, footer, social preview source
- Purpose: Primary brand mark source, not a full wordmark; HTML will render the name.
- Aspect ratio: `1:1`
- Recommended model: `gpt_image_2`
- Generation prompt: Simple vector-like brand mark for a small-town cafe, maple seed paired with a main-street window frame, front window green and coffee roast on porcelain background, bold but friendly, no readable letters, no full wordmark, no watermark.
- Destination path: `app/public/assets/brand/logo-mark-source.png`
- Fallback if generation fails: Create an inline CSS/SVG window-frame maple-seed mark manually.

## 20. Monogram Badge Source
- Asset name: `brand-monogram-badge-source`
- Renders in: Footer / Last Cup, favicon source candidate
- Purpose: Compact badge shape for footer and app icons.
- Aspect ratio: `1:1`
- Recommended model: `gpt_image_2`
- Generation prompt: Round cafe badge mark using maple seed and windowpane geometry, green ground `#2F5F4A`, porcelain line art, coffee roast shadow, no readable letters, no full wordmark, no watermark.
- Destination path: `app/public/assets/brand/monogram-badge-source.png`
- Fallback if generation fails: Use `brand-logo-mark-source` inside a CSS circle.

## 21. Repeating Windowpane Maple Pattern
- Asset name: `brand-windowpane-maple-pattern`
- Renders in: Daily Reasons dividers, Footer / Last Cup lining
- Purpose: Tileable brand pattern for quiet section rhythm.
- Aspect ratio: `1:1`
- Recommended model: `gpt_image_2`
- Generation prompt: Seamless repeating pattern of windowpane lines and maple seed shapes, porcelain background `#F7F2EA`, front window green line work, very subtle maple syrup accent, flat graphic pattern, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/brand/windowpane-maple-pattern.png`
- Fallback if generation fails: Build a CSS repeating-linear-gradient windowpane and overlay a simple SVG maple seed motif.

## 22. Custom Icon Sheet
- Asset name: `brand-icon-sheet`
- Renders in: Visit Details, menu labels, CTA helper rows
- Purpose: Source sheet for eight custom glyphs: coffee, breakfast, lunch, kids seating, parking, pie, takeout, hours.
- Aspect ratio: `1:1`
- Recommended model: `gpt_image_2`
- Generation prompt: Icon sheet, 8 separate rounded-line glyphs on a clean grid, coffee cup, pancake breakfast, soup sandwich lunch, kids seating, parking P, pie slice, takeout bag, clock hours, consistent 2px stroke, coffee roast `#34251E` line art with small green accents `#2F5F4A`, flat on porcelain background, no readable text, no watermark.
- Destination path: `app/public/assets/icons/icon-sheet.png`
- Fallback if generation fails: Use a small set of CSS-drawn or library icons in one consistent stroke style.

## 23. Custom Icon Slices
- Asset name: `brand-icon-slices`
- Renders in: Visit Details, menu labels, CTA helper rows
- Purpose: Transparent PNG slices derived from `brand-icon-sheet`.
- Aspect ratio: `1:1` each
- Recommended model: derived via slicing plus `remove_background`
- Generation prompt: No new prompt. Slice the approved icon sheet and remove the porcelain background from each glyph.
- Destination path: `app/public/assets/icons/coffee.png`, `breakfast.png`, `lunch.png`, `kids.png`, `parking.png`, `pie.png`, `takeout.png`, `hours.png`
- Fallback if generation fails: Keep the icon sheet as a CSS sprite or use consistent library icons.

## 24. OG Social Card
- Asset name: `meta-og-image`
- Renders in: Open Graph and social previews
- Purpose: 1200x630 branded social card composed in the site's visual language.
- Aspect ratio: `1200:630`
- Recommended model: `gpt_image_2`
- Generation prompt: Wide social card for Maple & Main Cafe, cafe front window composition, green painted trim, red booth glimpse, porcelain field reserved for HTML/meta crop, coffee steam, maple seed mark motif, small-town breakfast and coffee mood, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/meta/og-image.png`
- Fallback if generation fails: Compose a card from `hero-window-still`, `brand-logo-mark-source`, and CSS color blocks.

## 25. Favicon SVG
- Asset name: `favicon-svg`
- Renders in: Browser tab and webmanifest
- Purpose: Simple vector-like favicon derived from the approved mark.
- Aspect ratio: `1:1`
- Recommended model: derived from `brand-logo-mark-source`, manual vectorization preferred
- Generation prompt: No new generation unless the approved mark is too detailed. Simplify the maple seed and windowpane mark into a one-color green glyph on porcelain.
- Destination path: `app/public/favicon.svg`
- Fallback if generation fails: Create a simple hand-coded SVG using a window square and maple-seed diamond.

## 26. Favicon ICO And PNG Set
- Asset name: `favicon-raster-set`
- Renders in: Browser tab and legacy favicon surfaces
- Purpose: Raster favicon files derived from `favicon-svg` or `brand-monogram-badge-source`.
- Aspect ratio: `1:1`
- Recommended model: derived export, no image model
- Generation prompt: No generation. Downscale from the simplified mark source.
- Destination path: `app/public/favicon.ico`, `app/public/favicon-32.png`, `app/public/favicon-16.png`
- Fallback if generation fails: Use the single-letter CSS/SVG fallback mark converted to raster.

## 27. Apple Touch Icon
- Asset name: `apple-touch-icon`
- Renders in: iOS home screen
- Purpose: Padded opaque app icon.
- Aspect ratio: `1:1`
- Recommended model: derived export, no image model
- Generation prompt: No generation. Place simplified mark on green ground with safe padding.
- Destination path: `app/public/apple-touch-icon.png`
- Fallback if generation fails: Use `brand-monogram-badge-source` resized to 180x180 with solid green background.

## 28. Web App Icons
- Asset name: `web-app-icons`
- Renders in: Webmanifest and install surfaces
- Purpose: 192, 512, and maskable 512 icons.
- Aspect ratio: `1:1`
- Recommended model: derived export, no image model
- Generation prompt: No generation. Export approved simplified mark with maskable safe zone.
- Destination path: `app/public/icon-192.png`, `app/public/icon-512.png`, `app/public/icon-maskable-512.png`
- Fallback if generation fails: Use the hand-coded SVG mark rasterized at each size.

## 29. Site Webmanifest
- Asset name: `site-webmanifest`
- Renders in: Browser install metadata
- Purpose: Manifest file pointing to generated app icons and theme color.
- Aspect ratio: not applicable
- Recommended model: no model
- Generation prompt: No generation. Write JSON with Maple & Main Cafe name, icon paths, background `#F7F2EA`, theme `#2F5F4A`.
- Destination path: `app/public/site.webmanifest`
- Fallback if generation fails: Keep favicon-only support and omit install metadata until fixed.

## 30. Hero Low-Quality Placeholder
- Asset name: `hero-window-lqip`
- Renders in: Hero image preload state
- Purpose: Tiny blurred placeholder for first paint before the full hero still loads.
- Aspect ratio: `16:9`
- Recommended model: derived export, no image model
- Generation prompt: No generation. Downscale and blur `hero-window-still`.
- Destination path: `app/public/assets/hero/hero-window-lqip.webp`
- Fallback if generation fails: Use a solid green-to-coffee CSS background until the hero image loads.

## 31. Menu Paper Overlay
- Asset name: `menu-paper-overlay`
- Renders in: Daily Reasons To Stop In
- Purpose: Tactile menu-paper layer with green rule lines for the horizontal strip.
- Aspect ratio: `16:9`
- Recommended model: `gpt_image_2`
- Generation prompt: Horizontal cafe menu paper surface, porcelain white, subtle paper fibers, front-window green ruled lines, booth-red tab shapes, enough empty space for HTML meal panels, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/textures/menu-paper-overlay.png`
- Fallback if generation fails: Use `texture-porcelain-tabletop` with CSS rule lines and red tabs.

## 32. Footer Last Cup Plate
- Asset name: `footer-last-cup`
- Renders in: Footer / Last Cup
- Purpose: Quiet closing visual with cup and steam.
- Aspect ratio: `16:9`
- Recommended model: `nano_banana_pro`
- Generation prompt: Horizontal quiet cafe closing image, porcelain cup with steam on saucer, green window reflection, red booth far background, broad porcelain negative space, last-cup mood, no readable text, no embedded logo, no watermark.
- Destination path: `app/public/assets/footer/last-cup.png`
- Fallback if generation fails: Reuse `food-coffee-pour` cropped wide with a porcelain CSS field.

## Generation Order
1. Generate hero candidates, choose `hero-window-still`.
2. Generate hero video from the approved still, then derive frames and LQIP.
3. Generate texture plates and content imagery in parallel.
4. Generate logo, monogram, pattern, icon sheet, and OG card.
5. Derive favicon, app icons, webmanifest, icon slices, and any optimized variants.
6. Verify every file in `app/public/assets/` is referenced by a route or component.
