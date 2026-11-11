# Kipping Pull-Up Workshop: GoHighLevel set-up

Two jobs, in this order:

- **Part 1:** put the page live (about 20 minutes)
- **Part 2:** build the automation that tags people and sends them the workshop (about 45 minutes)

Do Part 2 before you switch the ads on. Part 1 gives you the page URLs that Part 2 needs, and Part 2 gives you the webhook URL that goes back into the page.

> Menu names below are from GoHighLevel's current builder. If a label on your
> account is slightly different (for example "Code" rather than "Custom JS/HTML"),
> it's the same thing.

---

## Before you start: settings to check once

- **Time zone:** Settings → Business Profile → time zone = **Europe/London**. Every "7am" below uses this.
- **Email sending:** Settings → Email Services. Your sending domain should be set up and verified, so the emails don't land in spam.
- **SMS (optional):** a UK number or sender ID set up under Phone Numbers. No SMS set-up yet? Skip the SMS steps. Everything still works by email.

---

## Part 1: Put the page live

### 1. Create the funnel
1. **Sites → Funnels → + New Funnel → From blank.** Name it `Kipping Pull-Up Workshop`.
2. Add two steps:
   - Step 1: name `Workshop`, path `/kipping-workshop`
   - Step 2: name `Thank you`, path `/kipping-workshop-thanks`
3. Funnel **Settings**: pick your domain, and set the **page background colour to `#05070D`** on both steps, so nothing flashes white while loading.

### 2. Paste the landing page (Step 1)
1. Open Step 1 in the builder. Delete any template content.
2. Add a **Section**, choose **Full width**, and set padding to **0** on the section, row and column.
3. Drag in a **Custom JS/HTML** element (it may be labelled **Code**).
4. Open `ghl-paste.html` from this folder, copy **everything**, and paste it into the element. Save.
5. Hit **Preview**. You should see the page with the logo at the top.

### 3. Paste the thank-you page (Step 2)
Same as above with `thank-you-ghl-paste.html`.

### 4. Fill in the settings block on each page
In each pasted element, scroll to the bottom and find the `CONFIG` block.

**Landing page (`ghl-paste.html`):**
| Setting | What to put |
|---|---|
| `startDate` | Leave as `'auto'`. It always shows the coming Sunday (UK time). After 7am on a Sunday it moves on to the next week. |
| `webhookUrl` | From Part 2, step A2. Leave it until then. |
| `thankYouUrl` | Your Step 2 URL, e.g. `'https://yourdomain.com/kipping-workshop-thanks'` |
| `pixelId` | Your Meta Pixel ID (numbers only). **Leave as-is** if the pixel is already in GoHighLevel's site-wide tracking code, or page views will count twice. |

**Thank-you page (`thank-you-ghl-paste.html`):**
| Setting | What to put |
|---|---|
| `startDate` | Leave as `'auto'`. It picks up the date from the sign-up page. |
| `groupUrl` | Link to the private group / course in GoHighLevel |
| `callUrl` | Your recurring Zoom link |

Also on both pages: search for `YOUR-PRIVACY-URL` and `YOUR-TERMS-URL` and swap in your links.

### 5. Publish and test
1. Publish the funnel.
2. Open the live page **on your phone**. Check that the logo is centred, the button opens the form, and the sticky button appears once you scroll past the top.
3. Don't submit yet. Finish Part 2 first.

---

## Part 2: The automation

You'll build **two workflows**, which keeps it the way you described:

- **Workflow A (Sign-up):** the page sends the sign-up in → the contact is created → **the tag is added**.
- **Workflow B (Workshop delivery):** **the tag** starts it → welcome message → daily messages Sunday to Thursday.

Because Workflow B starts from the tag, you can also add someone by hand (just tag them) and they get the full sequence.

### Workflow A: Sign-up

**A1. New workflow:** Automation → Workflows → + Create Workflow → Start from scratch. Name it `KPU Workshop: 1 Sign-up`.

**A2. Trigger: Inbound Webhook**
1. Add trigger **Inbound Webhook**. Copy the **webhook URL** it shows.
2. Paste that URL into `webhookUrl` in the landing page's `CONFIG` block (Part 1, step 4), then save and publish the page.
3. Back in the trigger, it waits for a sample. Go to your live page and **sign up with your own details**.
4. Click **Fetch sample request** (or similar). You should see `first_name`, `email`, `phone`, `tags` and so on. Select it and save the trigger.
   *If no sample arrives, or it arrives with no fields, stop here and tell Claude. The page's form may need a small change to match how your account reads incoming data.*

> Inbound Webhook is a premium trigger on some GoHighLevel plans, at a small cost per sign-up.
> If you'd rather avoid that, see "Option B: use a GoHighLevel form" at the bottom.

**A3. Action: Create Contact** (or **Create/Update Contact**)
| Field | Value |
|---|---|
| First name | `{{inboundWebhookRequest.first_name}}` |
| Email | `{{inboundWebhookRequest.email}}` |
| Phone | `{{inboundWebhookRequest.phone}}` |
| Source | `{{inboundWebhookRequest.source}}` |

**A4. Action: Add Tag.** Add **two** tags:
- `kpu-workshop` ← this is the one that starts Workflow B
- `{{inboundWebhookRequest.tags}}` ← the page sends `kpu-workshop-YYYY-MM-DD` with that week's Sunday, so each intake gets its own tag automatically. Nothing to change each week.

**A5.** Save and **Publish** the workflow.

### Workflow B: Workshop delivery

**B1. New workflow:** `KPU Workshop: 2 Delivery`.

**B2. Trigger: Contact Tag.** Filter: tag **added** = `kpu-workshop`.
In the workflow settings, turn **"Allow re-entry"** off, so nobody gets the sequence twice.

**B3. Steps:** build top to bottom. Each email and SMS is written out in the next section.

| # | Step | Setting |
|---|---|---|
| 1 | **Send Email** | Email 1: "You're in" |
| 2 | **If/Else** | Phone is not empty → **Send SMS** SMS 1. Otherwise carry on. |
| 3 | **Wait** | Time delay **1 minute**, then **Advanced window**: resume on **Saturday**, **18:00–18:30** |
| 4 | **Send Email** | Email 2: "Tomorrow: Day 1" |
| 5 | **Wait** | 1 minute, advanced window **Sunday 07:00–07:30** |
| 6 | **Send Email** | Email 3: "Day 1: Test" |
| 7 | **Wait** | 1 minute, advanced window **Monday 07:00–07:30** |
| 8 | **Send Email** | Email 4: "Day 2: Floor drills" |
| 9 | **Wait** | 1 minute, advanced window **Tuesday 07:00–07:30** |
| 10 | **Send Email** | Email 5: "Day 3: To the bar" |
| 11 | **Wait** | 1 minute, advanced window **Wednesday 07:00–07:30** |
| 12 | **Send Email** | Email 6: "Day 4: Remove the box" |
| 13 | **Wait** | 1 minute, advanced window **Thursday 07:00–07:30** |
| 14 | **Send Email** | Email 7: "Today, 5pm: live call" |
| 15 | **Wait** | 1 minute, advanced window **Thursday 16:00–16:15** |
| 16 | **If/Else** | Phone is not empty → **Send SMS** SMS 2 (call in an hour) |
| 17 | **Wait** | 1 minute, advanced window **Thursday 19:30–20:00** |
| 18 | **Send Email** | Email 8: "Replay's up" |
| 19 | *(optional)* **Wait** | 1 minute, advanced window **Friday 09:00–09:30** |
| 20 | *(optional)* **Send Email** | Email 9: "What next" (the 6-week programme). Only if you want it. |

**How the timing works.** Each Wait holds the person until the next Saturday, Sunday and so on. Whatever day they sign up, Day 1 lands on Sunday and the call reminder lands on Thursday. You **don't** have to change dates in the workflow each intake.

> **Sign-up cut-off:** anyone who signs up on Sunday *after* 7am joins the *next* week's
> intake. The page already shows them next Sunday's date at that point, so the page and the emails always match.
>
> If your account has no "Advanced window" on the Wait step, use
> **Wait → Specific date/time** for each step instead, and update the dates each intake.

**B4.** Save and **Publish**.

### Test the whole thing
1. Delete your test contact from Contacts, so it can go through again.
2. Sign up on the live page with your own email and mobile.
3. Check:
   - you land on the thank-you page with your name;
   - the contact exists with both tags;
   - Email 1 (and SMS 1) arrive within a minute;
   - in Workflow B, under **Enrollment history**, you're sitting at the Saturday wait.
4. Check the Meta Pixel **Lead** event in Events Manager → Test events.

---

## The messages

Everything in `[SQUARE BRACKETS]` gets filled in. `{{contact.first_name}}` is GoHighLevel's first-name field.
Each email is short on purpose: the content lives in the private group, and the email just gets them there.

### Email 1: You're in (straight away)
**Subject:** You're in, {{contact.first_name}} 🤙
**Preview:** Two things to do before Sunday.

> Hi {{contact.first_name}},
>
> You're in the free 5-Day Kipping Pull-Up Workshop. It starts **Sunday [DATE]**.
>
> Two things to do now:
>
> **1. Join the private group.** Everything happens in here: the daily videos, your clips and my feedback.
> 👉 [GROUP LINK]
>
> **2. Put Thursday in the diary.** Live coaching call, **Thursday [DATE] at 5pm (UK)**. Can't make it? Post a clip before 4pm and I'll cover it on the call. The replay goes up straight after.
>
> All you need is a bar and a bit of floor. For Days 3 and 4, a box or anything stable at the right height.
>
> Peace out,
> Josh

### SMS 1: Straight away (if they gave a mobile)
> Hi {{contact.first_name}}, Josh here. You're in the Kipping Pull-Up Workshop 🤙 Starts Sunday. Join the group here so you don't miss Day 1: [GROUP LINK]

### Email 2: Saturday 6pm
**Subject:** Tomorrow: Day 1
**Preview:** 10 minutes and a bar.

> Hi {{contact.first_name}},
>
> Day 1 goes up in the group tomorrow morning.
>
> It's a test: where your technique and strength are right now. Don't skip it. On Thursday we retest, and this is what you'll compare against.
>
> Not in the group yet? [GROUP LINK]
>
> Josh 🤙

### Email 3: Sunday 7am · Day 1
**Subject:** Day 1: Test
**Preview:** Find out where you are now.

> Morning {{contact.first_name}},
>
> Day 1 is live: [GROUP LINK]
>
> Watch the video, do the test, and post your clip in the group. 10–15 minutes.
>
> This is your starting line. By Thursday you'll see the difference.
>
> Josh 🤙

### Email 4: Monday 7am · Day 2
**Subject:** Day 2: Floor drills
**Preview:** The bit everyone skips.

> Morning {{contact.first_name}},
>
> Today's the **Position** part of the PPP Framework: hollow and arch on the floor.
>
> Feel how much tension you actually need. This is the bit everyone skips, and it's why the timing falls apart later. You can do it at home.
>
> Day 2: [GROUP LINK]
>
> Josh 🤙

### Email 5: Tuesday 7am · Day 3
**Subject:** Day 3: To the bar
**Preview:** Learn the timing without fighting your bodyweight.

> Morning {{contact.first_name}},
>
> Today we take it to the bar. **Pattern**: toe-spotted box drills, so you learn the timing without fighting your bodyweight.
>
> You'll need a box, or anything stable at the right height.
>
> Day 3: [GROUP LINK]
>
> If today feels worse than yesterday, that's normal. It's usually right before it clicks.
>
> Josh 🤙

### Email 6: Wednesday 7am · Day 4
**Subject:** Day 4: Remove the box
**Preview:** Plus: tomorrow's live call.

> Morning {{contact.first_name}},
>
> Once your box drills are clean, we take the support away. **Power**: hip pop, not leg raise.
>
> Day 4: [GROUP LINK]
>
> **Tomorrow, 5pm (UK): live call.** We retest against Day 1, fix faults live and answer your questions. Can't make it? Post a clip in the group before 4pm tomorrow and I'll cover it.
>
> Josh 🤙

### Email 7: Thursday 7am · Day 5
**Subject:** Today, 5pm: live call
**Preview:** Post your clip before 4pm.

> Morning {{contact.first_name}},
>
> Live call **today at 5pm (UK)**: [CALL LINK]
>
> - Retest against Day 1
> - Live fault fixes
> - Your questions answered
>
> Want me to look at your kip? Post a clip in the group **before 4pm**.
>
> Can't make it? The replay goes up straight after.
>
> Josh 🤙

### SMS 2: Thursday 4pm (if they gave a mobile)
> Live call in 1 hour, 5pm UK 🤙 Join here: [CALL LINK]. Can't make it? Replay goes up after. Josh

### Email 8: Thursday 7:30pm
**Subject:** Replay's up
**Preview:** In case you missed it, or want to watch it back.

> Hi {{contact.first_name}},
>
> Thanks for putting the work in this week.
>
> The replay of today's call is in the group: [GROUP LINK]
>
> Whatever your retest looked like, the order is the same: position, then pattern, then power. Keep doing the floor work. It's the bit below the surface.
>
> Peace out,
> Josh

### Email 9 (optional): Friday 9am · What next
*Only if you want to mention the 6-Week Upper Body Gymnastics Accelerator by email. Keep it as honest as the page.*

**Subject:** If you want to keep going
**Preview:** Completely up to you.

> Hi {{contact.first_name}},
>
> A few of you have asked what comes after this week.
>
> I run a 6-week programme, the Upper Body Gymnastics Accelerator. It takes the PPP Framework further: chest-to-bar, more reps, and feedback on your clips every week. It's £97.
>
> Details here: [ACCELERATOR LINK]
>
> No pressure either way. If you keep doing the floor work from this week, you'll keep improving.
>
> Josh 🤙

---

## Option B: use a GoHighLevel form instead of the webhook

Use this if you don't want the premium Inbound Webhook trigger.

1. Sites → Forms → build a form with First name, Email, Phone (optional) and a consent checkbox. Set the redirect to your thank-you page URL.
2. In `ghl-paste.html`, replace the `<form id="bs-form">…</form>` block with the form's embed code. The comment above the form shows where.
3. Workflow A trigger = **Form Submitted** (that form). The form creates the contact itself, so skip step A3 and keep A4 (Add Tag).

The trade-off: the GoHighLevel form won't fully match the page's styling, and the first name won't carry over to the thank-you page.
