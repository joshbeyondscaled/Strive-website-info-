# UBG Pull-Up Scorecard

The Day 1 test and week 6 retest page for the 6-Week Upper Body Gymnastics Accelerator.
Built from `beyond-scaled/scorecard-template/` (edit `pages.py` / `template.html`, then run `python3 build.py`) on `beyond-scaled/BRAND-KIT.md` (same tokens, card and button styles as the other Beyond Scaled pages).

| File | What it is |
|---|---|
| `index.html` | Preview (open in a browser) |
| `ghl-paste.html` | The same page, ready to paste into one GHL Custom Code element |

## What it does
- Five tests (kipping ×3, strict ×3, dead hang, hollow hold, pike leg lifts), each scored 0–4. Total out of 36.
- **Day 1 test / Week 6 retest** switch. In the retest, each test has an orange "Day 1 level" row under the blue
  week 6 levels. The radar chart shows Day 1 in orange (dashed) under week 6 in blue, plus a "Beat Day 1 by X points" verdict.
  Day 1 levels fill in by themselves if they did Day 1 on the same phone. Someone who only knows their Day 1 total
  can type it instead: the score comparison works, but the chart needs the levels to draw the Day 1 shape.
- **Send it to Josh**, with or without videos:
  1. **Send my results** opens the GHL form on the page, pre-filled with name, email and scores.
     They add videos with the form's File Upload field (straight from the camera roll, more than one allowed) or just press Submit.
  2. **Send on WhatsApp instead** opens WhatsApp with their results typed out.
  3. **Copy my results** for anywhere else.
- Link pre-fill: `?name=Sam&email=sam@x.com&mode=retest&d1=2,1,3,2,1` (Day 1 levels in test order) or `&baseline=14` (just the total).
- `utm_*`, `fbclid` and `gclid` are passed on to the form.

## GHL set-up
**Done (25 Nov 2026):** one form for Day 1 and week 6, `https://api.leadconnectorhq.com/widget/form/Xq4W5XV5wcKVezSc9pYe` ("Form 32" in GHL), already in `CONFIG`. It also has an optional WhatsApp number field (`phone`). Videos save to `contact.ubg_test_videos` (up to 6 files). The steps below are for reference.

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
- [x] Form links in `CONFIG.baselineFormUrl` / `CONFIG.retestFormUrl`
- [ ] Check the GHL File Upload size limit suits phone videos (the page points big files to WhatsApp)
- [ ] `[CHECK]` the guarantee line under the form
- [ ] Privacy policy and terms links in the footer
