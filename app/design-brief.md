# Maple & Main Cafe Design Brief

## Design Read
Maple & Main Cafe is for locals, families, and road-trippers who want a warm breakfast counter, a dependable lunch plate, and a cup of coffee that feels remembered rather than performed.

## Concept Spine
**The morning table ritual:** the page should feel like stepping through a small-town cafe door as breakfast service comes alive: window light, coffee steam, hand-written specials, familiar booths, and the low comfort of regulars settling in.

## Delivery Tier
**Cinema.** This is a hospitality brand site, so it needs a memorable first impression, scroll chapters, and tactile warmth, but the motion must stay gentle enough for a family restaurant rather than becoming a spectacle.

## Locked Palette
- Front window green: `#2F5F4A`
- Booth vinyl red: `#9E3F32`
- Porcelain white: `#F7F2EA`
- Coffee roast: `#34251E`
- Maple syrup: `#C17835`
- Sidewalk blue-gray: `#7E9397`

Defense: the palette comes from the cafe's material world: painted trim, red booth seats, white plates, coffee, syrup, and cool morning glass. It avoids the banned beige-and-brass cafe default by giving green and red equal brand weight, with syrup used only as the single accent.

## Locked Type Pairing
**Cabinet Grotesk + Inter Tight.** Cabinet Grotesk carries the friendliness of diner signage without going faux-vintage, while Inter Tight keeps menus, hours, and reservation details readable at small sizes. No serif pairing: this should feel familiar and practical, not editorial-luxury.

## Tier-1 Wow Mechanic
**A1 - Single-shot hero scrub.** The hero is a generated morning-service film scrub: the cafe window sharpens from early condensation into a warm counter scene with coffee poured and plates crossing the pass. Scroll literally opens the day, which enacts the morning table ritual.

## Section Plan
1. **Hero / Morning Window:** image-first wide cafe-window scene with restrained text set into a bottom-left counter rail, soft crop framing, and visible primary CTA.
2. **Daily Reasons To Stop In:** horizontal menu-strip layout with three meal windows: breakfast, lunch, coffee. No equal feature cards; each item gets a different crop and price note.
3. **Counter Favorites:** image-led asymmetric grid with one large plate photo, two smaller details, and short dish descriptions.
4. **For Locals, Families, Travelers:** booth-map composition with three path panels arranged like tables on a floor plan.
5. **This Week At Maple & Main:** ruled specials board, handbill rhythm, and one generated chalkboard plate; only section after hero with an eyebrow.
6. **Visit Details:** dense practical band with hours, address, parking, family seating, and phone/order CTA in a split info layout.
7. **Footer / Last Cup:** simple sign-off with monogram, reduced nav, and a small coffee steam plate.

Layout families used: scrub hero, horizontal menu strip, asymmetric image grid, floor-plan panels, specials board, practical info band, quiet footer. Eyebrow budget: 3 max for 7 sections; planned use is 2.

## Asset Plan
- Hero visual: two generated candidates of Maple & Main's front-window morning scene; pick one for the A1 scrub.
- Hero video: one 5-second no-cut image-to-video from the approved hero still, exported into scroll-scrub frames.
- Section plates: painted green trim texture, booth vinyl macro, porcelain tabletop with coffee ring.
- Content imagery: pancake breakfast plate, soup-and-sandwich lunch plate, coffee pour, family booth moment, traveler takeout cup, specials board.
- Custom icon set: 8 simple rounded-line glyphs for coffee, breakfast, lunch, kids seating, parking, pie, takeout, and hours in coffee roast on porcelain.
- Logo family: generated maple leaf plus main-street window monogram, with compact `M&M` mark for favicon.
- Pattern: small repeating windowpane and maple-seed motif for menu dividers and footer lining.
- OG image: 1200x630 cafe-front composition with locked palette and no embedded text.
- Head kit: favicon, apple touch icon, 192 and 512 icons, maskable icon, webmanifest, and theme color using `#2F5F4A`.

## CTA Inventory
- **See Menu:** hero primary. Receipt-tab CTA with a perforated left edge; hover gently lifts the tab and darkens the paper grain.
- **Call Ahead:** visit-details utility CTA. Phone-number band where the whole strip shifts from green trim to coffee roast on hover.
- **Get Directions:** practical map CTA. Corner-bracket target closes around the label like a window frame.
- **View Specials:** specials-board CTA. Chalk underline draws once, then settles into a faint hand-written stroke.
- **Order To Go:** menu-strip CTA. Small ticket/coupon shape with a subtle tear animation on hover.

Each CTA has its own garment and interaction identity. Same intent labels repeat exactly where reused.

## Motion Notes
- Lenis and GSAP ScrollTrigger drive the A1 hero scrub with frame 1 painted immediately, pin spacing avoided, and a static final-frame fallback for reduced motion.
- Section reveals use transform, clip, and position shifts only; no opacity-zero viewport traps.
- Menu strip uses a restrained horizontal drift tied to scroll on desktop, then becomes a swipeable stacked sequence on mobile.
- Cursor effects stay limited to the hero frame and CTA hover physics; no custom cursor.
- Reduced motion shows the composed final hero still, all text visible on first paint, and static CTA state changes.

## QA Risks
- The cafe brief can collapse into beige diner nostalgia; palette checks must protect the green-red-porcelain identity.
- A1 scrub can feel too polished if the video looks like a commercial kitchen; prompts need small-town counter details and believable family-restaurant scale.
- Generated signage must contain no fake text or watermarks; all real words belong in HTML.
- CTA garments must not converge into repeated pill buttons during implementation.
- Hero must keep CTA visible in the first viewport on mobile and desktop.
- Full-page screenshots must not show a pin-spacer blank band after the hero.
- Hours, phone, menu prices, and address need fictional but internally consistent content, without fake social-proof metrics.

## Phase 1 Reference Board Lock
- Theme paradigm: Bold Studio Solid, using painted green and booth red as confident fields with porcelain panels.
- Background character: tactile paper and material texture, changing from glass condensation to menu paper, vinyl, chalkboard, and tabletop surfaces.
- Typography character: expressive display, Cabinet-like headlines with Inter Tight-like practical detail rows.
- Hero architecture: massive image-first with restrained text, not a left-text/right-image split.
- Section system: gallery-led cadence with distinct section structures rather than repeated cards.
- Signature components: layered image crop frames, vertical rhythm lines, off-grid editorial placement, hover-accordion slices.
- Narrative spine: journey/waypoints, moving from front window to menu, counter, booth, specials, visit details, and last cup.
- Second-read moment: macro crop carrying the brand color, used once in Counter Favorites.
