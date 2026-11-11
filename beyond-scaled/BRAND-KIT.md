# Beyond Scaled — landing page brand kit

Use this for every Beyond Scaled landing page so they look like one brand.
Reference page: `beyond-scaled/index.html` (1-2-1 squat clean coaching). Reuse its CSS, not its layout.

## Brand
- Name: **Beyond Scaled by Josh Reilly**. Online CrossFit strength and skills coaching.
- Tone: direct, confident, no fluff. Short sentences. Minimal text. UK English, £.
- Audience: CrossFitters who train in class 3+ times a week and are stuck on a skill or lift.

## Design tokens (copy exactly)
```css
--blue:#1F5BFF;        /* buttons + ticks, white text on it */
--blue-text:#6EA8FF;   /* blue text on dark */
--navy:#0B1D48;        /* gradient top */
--black:#05070D;       /* page background */
--card:#0C1324;        /* cards + alternate sections */
--muted:#A3B0C8;       /* secondary text */
--line:rgba(160,180,220,.14);
--font:'Inter', system-ui, sans-serif;  /* Google Fonts, weights 400–800 */
```
- Page background: navy → black gradient over the first ~900px, then black.
- Headlines: Inter 800, sentence case, letter-spacing -0.035em, line-height 1.05.
  H1 `clamp(2.6rem,10vw,4.75rem)`, H2 `clamp(2rem,6.5vw,3rem)`.
- Labels above headlines: 0.8rem, 600, uppercase, 0.08em tracking, `--blue-text`.
- Blue is for buttons, ticks and one highlighted phrase per headline only.
- One card style: `--card` background, 1px `--line` border, 14px radius, 24px padding. No glows, no animations beyond hover.
- Buttons: 56px tall, 10px radius, `--blue`, white 700 text, arrow icon.

## Components to reuse from index.html
Scarcity bar · header (logo + small button, no menu) · hero with click-to-load video · rating line with faces ·
swipe rows (mobile) / 3-column grid (desktop) · result cards with PB badge · review cards ·
tick / cross lists · offer list with values + price block · guarantee card · FAQ accordion ·
final CTA · sticky mobile button · UTM pass-through script.

## Build rules
- One self-contained HTML file. All CSS scoped under `#bs`. Paste block marked START/END GHL PASTE.
- Mobile-first. Check at 375px and 1440px. No horizontal scroll.
- Lazy-load all media below the hero. Videos `preload="none"`. Images WebP.
- Accessible: 4.5:1 contrast minimum, alt text, real `<button>` for interactive controls.
- Placeholders in `[SQUARE BRACKETS]`, copy to confirm marked `[CHECK]`.
- Every page keeps the UTM / fbclid / gclid pass-through to the form or checkout.
- Vary the layout between pages (section order, hero composition, proof format), never the brand.

## Delivery workflow
1. Build `beyond-scaled/<page-name>/index.html` + `ghl-paste.html`.
2. Publish a private preview link for review.
3. Iterate on the preview, then paste `ghl-paste.html` into one GHL Custom Code element
   (full-width section, no padding, page background `#05070D`).
