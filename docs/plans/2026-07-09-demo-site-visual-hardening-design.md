# Maple & Main Demo Site Visual Hardening

## Goal

Turn Maple & Main Cafe into a flagship portfolio demo that shows prospective website clients disciplined visual craft at every viewport. Preserve the site's warm, tactile small-town cafe identity and its long cinematic hero scroll.

## Locked Decisions

- Keep the long hero scroll and its existing morning-window sequence.
- Preserve the green, red, porcelain, coffee, syrup, and blue-gray material palette.
- Preserve Cabinet Grotesk, Inter Tight, and the limited handwritten accent.
- Keep the page image-led and specific to a neighborhood cafe rather than flattening it into a generic restaurant template.
- Treat the site as a brand surface: the design quality is the primary product.

## Direction

Use a curated narrative refinement rather than a full redesign. The page should feel like one controlled journey after the cinematic opener:

1. Menu: what the cafe serves.
2. Counter favorites: what makes it memorable.
3. People: who feels at home there.
4. Weekly specials: what creates a reason to return.
5. Visit: how to act.
6. Footer: a warm, concise final impression.

Each section should have a distinct composition without repeating mastheads, logos, labels, or decorative furniture. Remove elements that compete with the primary message or make the page feel like several unrelated comps stitched together.

## Visual System

- Use the existing palette as semantic tokens and keep neutral surfaces tinted toward the cafe's material colors.
- Strengthen hierarchy through larger scale differences, controlled line lengths, and fewer simultaneous focal points.
- Use fluid spacing and typography with deliberate rhythm instead of uniform section padding.
- Align content to a consistent page grid while allowing image crops and tactile details to break it intentionally.
- Keep CTA garments distinct, but make their hierarchy and interaction behavior consistent.
- Avoid generic card grids, decorative glass, gradient text, excessive eyebrow labels, and repeated logo lockups.

## Section Changes

### Hero

Keep the long scroll, sequence, composition, and primary CTA. Refine only details that improve legibility, navigation behavior, and responsiveness without shortening the experience.

### Menu

Make the section arrive cleanly after the hero. Reduce peripheral decoration, clarify the relationship between the introduction and meal imagery, and ensure the cards read as an art-directed strip rather than a template grid.

### Counter Favorites

Preserve the asymmetric food collage. Improve alignment, crop control, text rhythm, and the relationship between the numbered list and images. Remove empty or visually ambiguous fragments.

### People

Consolidate the three audience paths into a calmer, more coherent composition. Keep locals, families, and travelers, but eliminate the bulky floor-plan/card treatment and repetitive CTA copy. Let photography and short human descriptions do the work.

### Specials

Preserve the green painted-wall scene and weekly-board concept. Reduce duplicate navigation furniture, make the actual specials easier to read, and keep the handbill and chalkboard as supporting details rather than competing focal points.

### Visit

Make hours, address, parking, seating, phone, directions, and the call-ahead action easy to scan. Reduce the appearance of five equal cards and establish a clear practical hierarchy.

### Footer

Shorten the closing sequence, remove low-value repetition, and create a decisive final frame with the best imagery, a clear visit CTA, essential details, and concise navigation.

## Hardening

- Support 320px through 2560px without horizontal overflow or broken compositions.
- Keep mobile type at readable sizes and interactive targets at least 44px.
- Preserve visible keyboard focus and logical document/tab order.
- Respect reduced-motion preferences with a useful static hero state and no hidden content.
- Give images stable dimensions/crops and keep descriptive alt text.
- Ensure external actions and contact links have clear labels and sensible destinations.
- Prevent long copy, zoom, and text wrapping from breaking layout.
- Preserve smooth scrolling and section motion without animating layout properties.

## Verification

- Build and TypeScript checks pass.
- Browser console has no errors or warnings.
- Visual review at 1440px desktop, 768px tablet, 390px mobile, and 320px narrow mobile.
- Spot-check ultrawide behavior at 2560px.
- Keyboard navigation, anchor links, sticky navigation, CTA destinations, and reduced motion work.
- No horizontal overflow, clipped text, inaccessible focus states, or unexpected blank content bands.

## Acceptance Standard

A prospective client should see a custom, confident hospitality website with a memorable opening, a controlled story, and meticulous responsive execution. No section should look like a generic template or an unfinished experiment.
