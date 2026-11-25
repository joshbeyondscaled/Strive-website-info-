# Upper Body Gymnastics Programme — Black Friday 2026 sales and thank-you pages

The £97 Black Friday offer (27 Nov to Sun 6 Dec 2026, 23:59 UK time). Copy follows the
"Black Friday 2026 Upper Body Gymnastics Programme launch pack" in Google Drive. These pages go in the
GHL funnel **BF26**: the sales block above the order form on the checkout step, and the thank-you block on
the thank-you step. The folder keeps its old name (`upper-body-accelerator`) so existing links still work.

| File | What it is |
|---|---|
| `index.html` | Sales page preview (open in a browser; add `?preview=closed` to see the closed state) |
| `thank-you.html` | Thank-you page preview |
| `ghl-paste.html` | Sales page block to paste into one GHL Custom Code element |
| `thank-you-ghl-paste.html` | Thank-you page block for GHL |

The paste files are cut from the previews between `START GHL PASTE` and `END GHL PASTE`. Edit the preview,
then re-cut the paste file, so the two never drift.

## How it behaves
- **Rolling start, not a cohort.** Week 1 starts the Monday after each buyer's Day 1 scorecard.
- **Closes itself.** After `CONFIG.closeAt` (Sun 6 Dec 23:59 UK time) every button says "Join the waitlist"
  and goes to `CONFIG.waitlistUrl` (the BF26 "Closed" step). You still switch the GHL funnel to the Closed
  step by hand at 23:55, because GHL can't schedule an order form to switch off.
- **Tracking.** Buy buttons pass `utm_*`, `fbclid` and `gclid` on to the checkout, and fire Meta
  `InitiateCheckout` (£97). The thank-you page fires `Purchase` (£97) once per visit.
- **Thank-you page** shows the same 3 steps as the confirmation email: CoachRx link and 100% code,
  the "I'm in" trigger link, and your WhatsApp number.

## Before launch
- [ ] Sales `CONFIG`: `checkoutUrl` (BF26 checkout step), `waitlistUrl` (BF26 Closed step), `pixelId`
- [ ] Thank-you `CONFIG`: `coachrxUrl`, `coachrxCode`, `imInUrl` ("I'm in" trigger link), `pixelId`
- [ ] Pixel: set `pixelId` in the pages **or** in GHL tracking code, not both, or events double count
- [ ] Search `[CHECK]`: Charlotte's numbers, permission to name Charlotte, Grace and Jess, the guarantee retest window
- [ ] VSL link and thumbnail (the play button hides until it's set), photos of Josh and Charlotte
- [ ] Privacy and terms links in both footers (`beyond-scaled/legal/` on the workshop branch)
- [ ] Terms tick-box and the small print go on the GHL order form itself (see the launch pack)
