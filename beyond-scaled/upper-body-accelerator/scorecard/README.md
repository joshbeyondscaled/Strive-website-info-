# UBG Pull-Up Scorecard

The Day 1 test and week 6 retest page for the 6-Week Upper Body Gymnastics Accelerator.
Built on `beyond-scaled/BRAND-KIT.md` (same tokens, card and button styles as the other Beyond Scaled pages).

| File | What it is |
|---|---|
| `index.html` | Preview (open in a browser) |
| `ghl-paste.html` | The same page, ready to paste into one GHL Custom Code element |

## What it does
- Five tests (kipping ×3, strict ×3, dead hang, hollow hold, pike leg lifts), each scored 0–4. Total out of 36.
- **Day 1 test / Week 6 retest** switch. The retest shows the Day 1 level on each test, a dashed Day 1 shape on the radar
  chart and a "Beat Day 1 by X points" verdict. Picks are remembered on the person's phone.
- **Send it to Josh**, with or without videos:
  1. **Send my results** opens the GHL form on the page, pre-filled with name, email and scores.
     They add videos with the form's File Upload field (straight from the camera roll, more than one allowed) or just press Submit.
  2. **Send on WhatsApp instead** opens WhatsApp with their results typed out.
  3. **Copy my results** for anywhere else.
- Link pre-fill: `?name=Sam&email=sam@x.com&mode=retest&baseline=14` (handy in the week 6 email).
- `utm_*`, `fbclid` and `gclid` are passed on to the form.

## GHL set-up
1. **Sites → Forms → new form**, e.g. `UBG Scorecard`. Add these fields, and set each one's **Query key** to match:

   | Field | Query key |
   |---|---|
   | First name | `first_name` |
   | Email | `email` |
   | Day 1 score (number) | `ubg_baseline_score` |
   | Week 6 score (number) | `ubg_retest_score` |
   | Beat Day 1? (text) | `ubg_beat_score` |
   | Scorecard detail (text area) | `ubg_scorecard_detail` |
   | **Upload videos** (File Upload, allow multiple, video files) | — |

   You can use one form for both, or two forms (Day 1 and retest) if you want different automations.
2. Form → **Integrate** → copy the form link (`https://api.leadconnectorhq.com/widget/form/...`).
3. In the page's `CONFIG` block (bottom of the file) paste it into `baselineFormUrl` and `retestFormUrl`.
   Until you do, the form area shows a `[GHL FORM EMBED]` placeholder and the page tells people to use WhatsApp.
4. Paste `ghl-paste.html` into a Custom Code element (full-width section, no padding, page background `#05070D`).

## Before launch
- [ ] Form links in `CONFIG.baselineFormUrl` / `CONFIG.retestFormUrl`
- [ ] Check the GHL File Upload size limit suits phone videos (the page points big files to WhatsApp)
- [ ] `[CHECK]` the guarantee line under the form
- [ ] Privacy policy and terms links in the footer
