# 6-Week Upper Body Gymnastics Accelerator — sales page

The upsell from the free 5-Day Kipping Pull-Up Workshop. It uses the same brand tokens and components as the
workshop and squat clean pages (`beyond-scaled/BRAND-KIT.md`), with a new layout.

| File | What it is |
|---|---|
| `index.html` | Sales page preview (open in a browser) |
| `thank-you.html` | Thank-you page preview |
| `ghl-paste.html` | Sales page block to paste into one GHL Custom Code element |
| `thank-you-ghl-paste.html` | Thank-you page block for GHL |

The paste files match the previews, except that unfilled testimonial slots are hidden.

## What's different from the other pages
- **Centred hero with the VSL full width** under the headline, plus four quick-fact tiles (6 weeks · 10–15 min · Week 1 + 6 test · £97).
- **Tap-to-tick problem list.** Visitors tick the lines that sound like them and get a one-line read-out ("3 of 5. That's a strength gap, not a coordination problem").
- **Usual way vs Beyond Scaled way** laid out as row-by-row swaps instead of two cards.
- **6-week rail and phase timeline**, plus a **weekly layout switch** (6 × 10–15 min or 3 × 20–25 min).
- **"Where would you start?" 30-second check.** Four questions put each skill (strict pull-ups, kipping, T2B, wall walks) at Scaling / Building / Have it, with an honest verdict. If someone already has everything, it tells them this probably isn't for them. Nothing is sent or saved.
- **Doors bar + automatic closed state.** After Friday at midnight (UK time) every button switches to "Join the waitlist". There's no countdown timer.

## How checkout works
Every "Join the 6 weeks — £97" button links to `CONFIG.checkoutUrl` (your GHL order form or Stripe link), with any
`utm_*` / `fbclid` / `gclid` added on. Clicking fires Meta Pixel `InitiateCheckout` (97, GBP).
In GHL, set the order form up to: take name, email, mobile and card · add tag `6wk-accelerator-YYYY-MM-DD` ·
trigger the onboarding email · redirect to the thank-you page.
The thank-you page fires `Purchase` (97, GBP) once per visit. If the GHL order form already sends Purchase, leave `pixelId` unset there so it isn't counted twice.

## Before launch
- [ ] `CONFIG.startDate` in **both** files (the Monday, `YYYY-MM-DD`). Currently a sample: `2026-11-23` (the Monday after the 15 Nov workshop). It fills every date; doors close the Friday before.
- [ ] Headline: the recommended one is in. The "10+ kipping pull-ups in 6 weeks" alternative and its caveat are in a `[CHECK]` comment.
- [ ] What's included beyond FITR (dashed row in "What's included")
- [ ] Kit list, what happens after the 6 weeks, refund policy (FAQ)
- [ ] `CONFIG.checkoutUrl`, `CONFIG.waitlistUrl` (sales page); `CONFIG.fitrUrl`, `CONFIG.bookingUrl` (thank-you page; with no booking link set it says "I'll message you before Monday")
- [ ] VSL link + thumbnail, photos of Josh and Charlotte (with permission)
- [ ] 2–3 extra testimonials. Unfilled ones hide themselves on the live page.
- [ ] `CONFIG.pixelId` in both files (skip if the pixel is already in GHL's site-wide tracking)
- [ ] Privacy, terms and refund policy links (both footers)
