# Free 5-Day Kipping Pull-Up Workshop — landing page

Built on `beyond-scaled/BRAND-KIT.md` (same CSS and components as the squat clean page, new layout).

| File | What it is |
|---|---|
| `index.html` | Landing page preview (open in a browser) |
| `thank-you.html` | Thank-you page preview |
| `ghl-paste.html` | Landing page block to paste into one GHL Custom Code element |
| `thank-you-ghl-paste.html` | Thank-you page block for GHL |

The paste files are the same as the previews, except the paste version hides unfilled testimonial
slots and points at `https://YOUR-THANK-YOU-PAGE-URL`.

**Going live:** step-by-step GoHighLevel set-up, the automation and all the email/SMS copy are in [`GHL-SETUP.md`](GHL-SETUP.md).

## How the form works
Every "Save my free spot" button opens one sign-up form (first name, email, optional mobile, consent).
On submit it:
1. fires Meta Pixel `Lead`
2. POSTs to your GHL inbound webhook with `first_name`, `email`, `phone`, `consent`,
   `tags` (`kpu-workshop-YYYY-MM-DD`), `source`, `page_url` and any `utm_*` / `fbclid` / `gclid`
3. goes to the thank-you page, which greets them by first name

GHL set-up: Automation → new Workflow → trigger **Inbound Webhook** → copy its URL into `CONFIG.webhookUrl`
→ action **Create/Update Contact** (map the fields) → **Add Tag** using the `tags` value.
Prefer a native GHL form? Swap the `<form>` for the GHL embed (see the comment above it).

## Before launch
- [x] Start date: automatic. Always the coming Sunday (UK time), call that Thursday 5pm. Pin a date with `CONFIG.startDate` if you ever need to.
- [ ] Headline: recommended version is in. The "in 5 days" alternative is in a `[CHECK]` comment.
- [ ] Entry bar: "[close to / have] a strict pull-up" in *Who it's for*
- [ ] `CONFIG.circleUrl` and `CONFIG.callUrl` (thank-you page)
- [ ] Media: hero clip, Josh photo, Charlotte photo + face (with permission), logo
- [ ] 2–3 extra testimonials, or leave them: unfilled ones hide themselves on the live page
- [ ] `CONFIG.pixelId` (skip if the pixel is already in GHL's site-wide tracking) and `CONFIG.webhookUrl`
- [ ] `CONFIG.thankYouUrl` in `ghl-paste.html`
- [ ] Privacy policy and terms links (both files)
