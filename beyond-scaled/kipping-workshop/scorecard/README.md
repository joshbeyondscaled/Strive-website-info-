# Kipping Workshop Scorecard

Day 1 test and Thursday retest for the free 5-Day Kipping Pull-Up Workshop.
Same page as the accelerator scorecard, with workshop tests and wording. Built from `beyond-scaled/scorecard-template/`
(edit `pages.py` / `template.html`, then run `python3 build.py`).

| File | What it is |
|---|---|
| `index.html` | Preview (open in a browser) |
| `ghl-paste.html` | The same page, ready to paste into one GHL Custom Code element |

## What it does
- Five tests, about 10 minutes: kipping pull-ups ×2, kip swing ×2, strict pull-ups, active hang, hollow hold. Total out of 28.
- **Where's the gap?** read-out under the score: the swing, strength, timing (hip pop) or "now it's reps". It points them to the right workshop day.
- **Thursday retest**: orange Day 1 levels under each test, the Day 1 shape in orange on the radar chart under Thursday in blue, and "Beat Day 1 by X points".
- **Offer card** after a completed retest, linking to the 6-week accelerator (`CONFIG.next.url`; hidden while empty).
- **Send it to Josh**: the GHL form opens on the page pre-filled with scores, with optional video upload; or WhatsApp; or copy.
- Link pre-fill: `?name=Sam&email=sam@x.com&mode=retest` (handy in the Thursday email).

## GHL set-up
Same as the accelerator scorecard (see `../../upper-body-accelerator/scorecard/README.md`), with these query keys:
`first_name`, `email`, `kpu_day1_score`, `kpu_retest_score`, `kpu_beat_score`, `kpu_scorecard_detail`, plus a File Upload field
labelled **Upload videos** (allow multiple, video).

## Before launch
- [ ] `[CHECK]` the tests, levels and order match the Day 1 video
- [ ] `[CHECK]` the gap read-out wording
- [ ] Form links in `CONFIG.baselineFormUrl` / `CONFIG.retestFormUrl`
- [x] `CONFIG.next.url` = accelerator sales page (CoachRx)
- [ ] Check the offer wording and price
- [ ] Link the scorecard from the Day 1 and Thursday emails/posts
- [ ] Privacy policy and terms links in the footer
