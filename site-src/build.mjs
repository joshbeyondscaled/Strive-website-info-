// Builds the Strive Wellbeing website into ../site/ from the brand kit and the content brief.
// Run: node site-src/build.mjs
// Shared header and footer live here once; each page is a function returning its <main>.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "site");
mkdirSync(out, { recursive: true });

const SITE = {
  name: "Strive Wellbeing",
  url: "https://www.strivecorpwellbeing.co.uk",
  email: "info@strivecorpwellbeing.co.uk",
  phoneDisplay: "07793 458864",
  phoneHref: "+447793458864",
  linkedin: "https://www.linkedin.com/company/strive-wellbeing/",
  formId: "8f23c1c3-b67c-461b-b886-9d7de8a6694b",
};

// ---------- stylesheet: kit tokens + kit components + site additions ----------
const css = [
  readFileSync(join(out, "tokens.css"), "utf8"),
  readFileSync(join(out, "bundle.css"), "utf8"),
  readFileSync(join(here, "site-extra.css"), "utf8"),
].join("\n");
writeFileSync(join(out, "site.css"), css);

const arrow = '<span class="sw-arrow" aria-hidden="true">&rarr;</span>';
const NAV = [
  ["programmes", "Programmes"],
  ["why-wellbeing", "Why wellbeing"],
  ["results", "Results"],
  ["about", "About"],
  ["contact", "Contact"],
];

function header(current) {
  const links = NAV.map(([slug, label]) =>
    `<li><a href="/${slug}.html"${current === slug ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
  return `<a class="sw-skip" href="#main">Skip to content</a>
<header class="sw-header" data-theme="dark" id="top">
 <div class="sw-container sw-header__inner">
  <a class="sw-logo" href="/index.html"><img src="/assets/strive-logo-oneline-stone.svg" alt="Strive Wellbeing home" width="224" height="28"></a>
  <nav aria-label="Main"><ul class="sw-nav">${links}</ul></nav>
  <div class="sw-header__end">
   <a class="sw-btn sw-btn--primary sw-btn--sm" href="/contact.html">Book a call</a>
   <button class="sw-menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
  </div>
 </div>
 <div class="sw-mobile-nav" id="mobile-nav">
  <div class="sw-container"><ul>${links}</ul><a class="sw-btn sw-btn--primary" href="/contact.html">Book a discovery call</a></div>
 </div>
</header>`;
}

function footer() {
  return `<footer class="sw-footer" data-theme="dark">
 <div class="sw-container">
  <div class="sw-footer__grid">
   <div class="sw-stack">
    <img src="/assets/strive-logo-stone.svg" alt="Strive Wellbeing" width="168" height="64" style="height:64px;width:auto;align-self:flex-start">
    <p class="sw-small" style="max-width:34ch">Taking wellbeing seriously. Coaching-led wellbeing programmes for workplaces across the UK, on site and online.</p>
   </div>
   <div><h4>Programmes</h4><ul>
    <li><a href="/programmes.html#challenges">Wellbeing challenges</a></li>
    <li><a href="/programmes.html#coaching">Coaching-led programmes</a></li>
    <li><a href="/programmes.html#workshops">Workshops</a></li>
    <li><a href="/programmes.html#pt-in-your-pocket">PT in your pocket</a></li>
   </ul></div>
   <div><h4>Company</h4><ul>
    <li><a href="/about.html">About</a></li>
    <li><a href="/why-wellbeing.html">Why wellbeing</a></li>
    <li><a href="/results.html">Results</a></li>
    <li><a href="/contact.html">Book a call</a></li>
   </ul></div>
   <div><h4>Contact</h4><ul>
    <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
    <li><a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></li>
    <li><a href="${SITE.linkedin}" rel="noopener" target="_blank">LinkedIn</a></li>
   </ul></div>
  </div>
  <div class="sw-footer__base">
   <span>&copy; ${new Date().getFullYear()} Strive Wellbeing. Serving workplaces nationwide.</span>
   <span><a href="/privacy.html">Privacy</a> &nbsp;&middot;&nbsp; <a href="/cookies.html">Cookies</a></span>
  </div>
 </div>
</footer>`;
}

function ctaBand() {
  return `<section class="sw-cta" data-theme="dark" aria-labelledby="cta-title">
 <div class="sw-container sw-cta__inner">
  <div class="sw-cta__copy">
   <span class="sw-label">Next step</span>
   <h2 class="sw-h1" id="cta-title">Let's make wellbeing change something.</h2>
   <p class="sw-lead">A 20-minute call to see if we're a fit, and a free quote while we're on the phone. No hard sell.</p>
  </div>
  <a class="sw-btn sw-btn--cta" href="/contact.html">Book a discovery call ${arrow}</a>
 </div>
</section>`;
}

function photo(caption, cls = "") {
  return `<div class="sw-photo ${cls}" role="img" aria-label="Photo placeholder: ${caption}"><div><strong>Photo to add</strong>${caption}</div></div>`;
}

function page({ slug, title, description, main, scripts = "", jsonld = "" }) {
  const canonical = slug === "index" ? `${SITE.url}/` : `${SITE.url}/${slug}.html`;
  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Strive Wellbeing">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${SITE.url}/assets/share.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a0c12">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/svg+xml" href="/assets/strive-symbol-stone.svg">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/fonts/PlusJakartaSans-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/site.css">
${jsonld}</head>
<body class="sw-page">
${header(slug)}
<main id="main">
${main}
</main>
${footer()}
<script src="/js/site.js" defer></script>
${scripts}</body>
</html>
`;
  writeFileSync(join(out, `${slug}.html`), html);
}

// ---------- Evidence: sources (checked November 2026) ----------
const SOURCES = {
  ons: { n: 1, org: "Office for National Statistics", title: "Sickness absence in the UK labour market: 2025", date: "1 May 2026",
    url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/2025",
    note: "Labour Force Survey; official statistics in development." },
  onsInactive: { n: 2, org: "Office for National Statistics", title: "Economic inactivity by reason: long-term sick (LFS series LF69)", date: "2026",
    url: "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity/timeseries/lf69/lms",
    note: "People aged 16 to 64, seasonally adjusted." },
  hse: { n: 3, org: "Health and Safety Executive", title: "Work-related ill health and injury statistics, Great Britain 2024/25", date: "20 November 2025",
    url: "https://press.hse.gov.uk/2025/11/20/hse-publishes-annual-workplace-health-and-safety-statistics/",
    note: "Self-reported, Labour Force Survey." },
  cipd: { n: 4, org: "CIPD and Simplyhealth", title: "Health and wellbeing at work 2025", date: "9 September 2025",
    url: "https://www.cipd.org/uk/knowledge/reports/health-well-being-work/",
    note: "Survey of 1,101 UK organisations, fieldwork by YouGov, March to April 2025." },
  kbw: { n: 5, org: "Department for Work and Pensions and Department for Business and Trade", title: "Keep Britain Working Review: final report (Sir Charlie Mayfield)", date: "5 November 2025",
    url: "https://www.gov.uk/government/publications/keep-britain-working-review-final-report", note: "" },
  deloitte: { n: 6, org: "Deloitte", title: "Mental health and employers: the case for employers to invest in supporting working parents and a mentally healthy workplace", date: "2024",
    url: "https://www.deloitte.com/uk/en/services/consulting/research/mental-health-and-employers-the-case-for-employers-to-invest-in-supporting-working-parents-and-a-mentally-health-workplace.html",
    note: "Return is an average across types of mental health support." },
  mhuk: { n: 7, org: "Mental Health UK", title: "The Burnout Report 2025", date: "January 2025",
    url: "https://mentalhealth-uk.org/burnout/", note: "Survey of UK adults, fieldwork November 2024." },
  ssp: { n: 8, org: "Acas", title: "Statutory sick pay changes 2026", date: "April 2026",
    url: "https://www.acas.org.uk/statutory-sick-pay-changes-2026", note: "" },
};
const cite = (k) => `<a class="sw-cite" href="/why-wellbeing.html#source-${SOURCES[k].n}" aria-label="Source ${SOURCES[k].n}: ${SOURCES[k].org}">${SOURCES[k].org}, ${SOURCES[k].date.replace(/^\d+ /, "")}</a>`;

const HERO_VIDEO = "https://video.wixstatic.com/video/0b2e90_8a91e47f149c47288d5bb7597be3c518/720p/mp4/file.mp4";
const TICKER = ["Habits over hacks", "Sleep", "Movement", "Nutrition", "Connection", "Coaching", "Workshops", "Real data", "Taking wellbeing seriously"];
const SLIDES = [
  { label: "Lost to sickness, 2025", num: "148.8m", text: "Working days lost to sickness or injury across the UK, an average of 4.4 days per worker.", src: "ons" },
  { label: "Absence per employee", num: "9.4 days", text: "The average a year, the highest in over 15 years and up from 5.8 days in 2022.", src: "cipd" },
  { label: "Stress, depression, anxiety", num: "22.1m", text: "Working days lost to work-related cases in 2024/25, with each case lasting 22.9 days on average.", src: "hse" },
  { label: "Cost to employers", num: "&pound;85bn", text: "A year to UK employers through sickness, staff turnover and lost productivity.", src: "kbw" },
  { label: "The return", num: "&pound;4.70", text: "Average return for every &pound;1 employers invest in supporting their employees' mental health.", src: "deloitte" },
];

// ---------- Home ----------
const services = [
  { id: "challenges", label: "Structured challenges", title: "Structured Wellbeing Challenges",
    body: "Short, high-impact programmes that build team momentum through simple habits.",
    meta: "4 to 8 weeks · on site, online or hybrid" },
  { id: "coaching", label: "Coaching-led", title: "Coaching-Led Programmes",
    body: "Ongoing support with structured plans, regular check-ins and accountability.",
    meta: "Ongoing · teams of 10+, in cohorts" },
  { id: "workshops", label: "Workshops", title: "Workshops & Education",
    body: "Practical sessions that give teams tools they can use day to day.",
    meta: "45 to 60 minutes · in person or remote" },
  { id: "pt-in-your-pocket", label: "App coaching", title: "PT in your pocket",
    body: "A coaching app with a structured programme, nutrition and habit advice, between sessions.",
    meta: "On its own or as part of a package" },
];

page({
  slug: "index",
  title: "Corporate wellbeing programmes | Strive Wellbeing",
  description: "Coaching-led workplace wellbeing programmes that build real habits and show measurable results. Book a discovery call with Strive Wellbeing.",
  jsonld: `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url,
    logo: `${SITE.url}/assets/strive-logo-stone.svg`, email: SITE.email, telephone: SITE.phoneHref,
    areaServed: "GB", sameAs: [SITE.linkedin],
  })}</script>\n`,
  main: `
<section class="sw-hero sw-hero--video" data-theme="dark" aria-labelledby="hero-title">
 <video class="sw-hero__video" autoplay muted loop playsinline preload="metadata" poster="https://static.wixstatic.com/media/0b2e90_8a91e47f149c47288d5bb7597be3c518f000.jpg/v1/fill/w_1280,h_720,q_75/hero.jpg" aria-hidden="true" tabindex="-1">
  <source src="${HERO_VIDEO}" type="video/mp4">
 </video>
 <div class="sw-hero__shade" aria-hidden="true"></div>
 <button class="sw-motion-btn sw-hero__pause" type="button" data-video-toggle aria-pressed="false">Pause video</button>
 <div class="sw-container">
  <div class="sw-hero__copy">
   <span class="sw-label">Corporate wellbeing</span>
   <h1 class="sw-display" id="hero-title">Taking wellbeing seriously.</h1>
   <p class="sw-lead">Most workplace wellbeing initiatives sound good, but don't change anything. Ours are built on habits, coaching and real data, delivered on site or online, anywhere in the UK.</p>
   <div class="sw-actions">
    <a class="sw-btn sw-btn--cta" href="/contact.html">Book a discovery call ${arrow}</a>
    <a class="sw-btn sw-btn--secondary" href="/programmes.html">See our programmes</a>
   </div>
  </div>
  </div>
 </div>
</section>

<section class="sw-ticker" data-theme="dark" aria-label="What we focus on">
 <div class="sw-ticker__track">
  ${[0, 1].map((i) => `<ul class="sw-ticker__list"${i ? ' aria-hidden="true"' : ""}>${TICKER.map((t) => `<li>${t}</li>`).join("")}</ul>`).join("")}
 </div>
 <button class="sw-motion-btn sw-ticker__pause" type="button" data-ticker-toggle aria-pressed="false">Pause</button>
</section>

<section class="sw-section sw-section--sunken" data-theme="light" style="padding:40px 0" aria-label="Clients">
 <div class="sw-container sw-stack">
  <span class="sw-label sw-label--muted">Trusted by teams at</span>
  <ul class="sw-clients"><li>Eric Wright Group</li><li>K9 Security</li><li>BNA Engineering</li><li>Eric Wright Water</li></ul>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="problem-title">
 <div class="sw-container sw-split sw-split--top">
  <div class="sw-stack sw-stack--lg">
   <span class="sw-label">The problem</span>
   <h2 class="sw-h2" id="problem-title">Wellbeing that changes something.</h2>
  </div>
  <div class="sw-stack">
   <p class="sw-body">A one-off talk, a fruit bowl or an app nobody opens won't shift sickness absence, energy at work or how your teams talk to each other. People need simple habits, real coaching and someone checking in.</p>
   <p class="sw-body">That's what we build. We take responsibility for keeping your people fit, healthy and active, and we bring in specialists where they add value. Wellbeing isn't a four-week project, so we don't treat it like one.</p>
   <p class="sw-body"><strong>Investing in wellbeing is the ultimate catalyst for sustainable business performance.</strong></p>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="dark" aria-labelledby="why-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">Why it matters</span>
   <h2 class="sw-h2" id="why-title">Ill health is one of the biggest costs most businesses never measure.</h2>
  </div>
  <div class="sw-slider" role="region" aria-roledescription="carousel" aria-label="UK workplace health statistics" data-slider>
   <div class="sw-slider__viewport">
    <div class="sw-slider__track" aria-live="off">
     ${SLIDES.map((sl, i) => `<div class="sw-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}"${i ? ' aria-hidden="true"' : ""}>
      <span class="sw-label sw-label--muted">${sl.label}</span>
      <span class="sw-stat-num sw-slide__num">${sl.num}</span>
      <p class="sw-lead sw-slide__text">${sl.text}</p>
      <span class="sw-small">${cite(sl.src)}</span>
     </div>`).join("\n     ")}
    </div>
   </div>
   <div class="sw-slider__controls">
    <button class="sw-slider__btn" type="button" data-prev aria-label="Previous statistic">&larr;</button>
    <div class="sw-slider__dots">${SLIDES.map((_, i) => `<button type="button" class="sw-slider__dot" data-go="${i}" aria-label="Show statistic ${i + 1}"${i ? "" : ' aria-current="true"'}></button>`).join("")}</div>
    <button class="sw-slider__btn" type="button" data-next aria-label="Next statistic">&rarr;</button>
    <button class="sw-motion-btn" type="button" data-slider-toggle aria-pressed="false">Pause</button>
   </div>
  </div>
  <div style="margin-top:32px"><a class="sw-link" href="/why-wellbeing.html">See the evidence</a></div>
 </div>
</section>

<section class="sw-section sw-section--raised" data-theme="light" aria-labelledby="services-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">Programmes</span>
   <h2 class="sw-h2" id="services-title">Four ways we work with your teams.</h2>
   <p class="sw-body sw-muted">Every package is tailored. Most clients combine two or more.</p>
  </div>
  <div class="sw-grid sw-grid--4">
   ${services.map((s) => `<article class="sw-card">
    <span class="sw-label">${s.label}</span>
    <h3 class="sw-h3"><a href="/programmes.html#${s.id}">${s.title}</a></h3>
    <p class="sw-body sw-muted">${s.body}</p>
    <p class="sw-card__meta">${s.meta}</p>
    <div class="sw-card__foot"><a class="sw-link" href="/programmes.html#${s.id}" aria-label="Learn more about ${s.title}">Learn more</a></div>
   </article>`).join("\n   ")}
  </div>
 </div>
</section>

<section class="sw-section" data-theme="dark" aria-labelledby="glance-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">At a glance</span>
   <h2 class="sw-h2" id="glance-title">Simple habits. Measurable results.</h2>
  </div>
  <div class="sw-stats">
   <div class="sw-stat"><span class="sw-label sw-label--muted">Challenge length</span><span class="sw-stat-num">4&ndash;8</span><span class="sw-small">Weeks per structured challenge, with ongoing support after</span></div>
   <div class="sw-stat"><span class="sw-label sw-label--muted">Team size</span><span class="sw-stat-num">10+</span><span class="sw-small">Employees per cohort; larger sites start with a pilot</span></div>
   <div class="sw-stat"><span class="sw-label sw-label--muted">Workshops</span><span class="sw-stat-num">45&ndash;60</span><span class="sw-small">Minutes per session, on a lunch break or in working hours</span></div>
   <div class="sw-stat"><span class="sw-label sw-label--muted">Coverage</span><span class="sw-stat-num">UK</span><span class="sw-small">Nationwide, on site and online</span></div>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="process-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">How it works</span>
   <h2 class="sw-h2" id="process-title">From first call to clear results.</h2>
  </div>
  <ol class="sw-steps">
   <li><h3 class="sw-h3">Discovery call</h3><p class="sw-body sw-muted">20 minutes on your people, goals and budget. You get a free quote on the call.</p></li>
   <li><h3 class="sw-h3">Baseline</h3><p class="sw-body sw-muted">A short survey and, where it helps, health monitoring bands that track sleep, heart rate and activity.</p></li>
   <li><h3 class="sw-h3">Programme</h3><p class="sw-body sw-muted">Challenges, coaching and workshops, on site or online, often starting with a pilot cohort.</p></li>
   <li><h3 class="sw-h3">Results</h3><p class="sw-body sw-muted">A clear report for leadership, and a plan to roll out to the rest of your teams.</p></li>
  </ol>
 </div>
</section>

<section class="sw-section sw-section--raised" data-theme="light" aria-labelledby="outcomes-title">
 <div class="sw-container sw-split">
  <div class="sw-bracket" style="padding:48px">
   <span class="sw-label">Our approach</span>
   <p class="sw-display" style="font-size:clamp(36px,5vw,56px)">Habits over hacks.</p>
  </div>
  <div class="sw-stack sw-stack--lg">
   <h2 class="sw-h2" id="outcomes-title">What changes for your organisation.</h2>
   <ul class="sw-list">
    <li>A more focused and productive workforce</li>
    <li>People taking responsibility for staying fit, healthy and active</li>
    <li>A healthier culture within teams and across the workplace</li>
    <li>More positive self-talk, and more positive talk between teams</li>
    <li>Motivation to exercise and stay healthy, which helps reduce sick pay and absenteeism</li>
   </ul>
   <div><a class="sw-link" href="/results.html">See the results</a></div>
  </div>
 </div>
</section>

${ctaBand()}`,
});

// ---------- Programmes ----------
function programmeSection({ id, theme, rev, label, title, lead, facts, includedTitle, included, extra = "", photoCaption, media = "" }) {
  return `<section class="sw-section${theme === "raised" ? " sw-section--raised" : ""}" data-theme="light" id="${id}" aria-labelledby="${id}-title">
 <div class="sw-container sw-split sw-split--top${rev ? " sw-split--rev" : ""}">
  <div class="sw-stack sw-stack--lg">
   <span class="sw-label">${label}</span>
   <h2 class="sw-h2" id="${id}-title">${title}</h2>
   <p class="sw-lead">${lead}</p>
   <dl class="sw-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
   <div class="sw-stack"><h3 class="sw-h3">${includedTitle}</h3><ul class="sw-list">${included.map((i) => `<li>${i}</li>`).join("")}</ul></div>
   ${extra}
  </div>
  ${media || photo(photoCaption, "sw-photo--tall")}
 </div>
</section>`;
}

page({
  slug: "programmes",
  title: "Workplace wellbeing programmes | Strive Wellbeing",
  description: "Structured challenges, coaching-led programmes and practical workshops for teams of every size, on site or online. Tailored to your organisation.",
  main: `
<section class="sw-hero sw-hero--video sw-hero--short" data-theme="dark" aria-labelledby="page-title">
 <video class="sw-hero__video" autoplay muted loop playsinline preload="metadata" poster="https://static.wixstatic.com/media/0b2e90_d43b4698c49b4f53a9fd3d122aebc158f000.jpg/v1/fill/w_1280,h_720,q_75/hero.jpg" aria-hidden="true" tabindex="-1">
  <source src="https://video.wixstatic.com/video/0b2e90_d43b4698c49b4f53a9fd3d122aebc158/720p/mp4/file.mp4" type="video/mp4">
 </video>
 <div class="sw-hero__shade" aria-hidden="true"></div>
 <button class="sw-motion-btn sw-hero__pause" type="button" data-video-toggle aria-pressed="false">Pause video</button>
 <div class="sw-container"><div class="sw-hero__copy">
  <span class="sw-label">Programmes</span>
  <h1 class="sw-h1" id="page-title">Programmes built around your people.</h1>
  <p class="sw-lead">Every package is tailored to your organisation. Combine structured challenges, ongoing coaching, workshops and app coaching, on site, online or both.</p>
  <ul class="sw-tags" aria-label="Jump to a programme">${services.map((s) => `<li><a href="#${s.id}" style="color:inherit;text-decoration:none">${s.title}</a></li>`).join("")}</ul>
 </div></div>
</section>

${programmeSection({
  id: "challenges", theme: "raised", label: "Structured challenges", title: "Structured Wellbeing Challenges",
  lead: "Short, high-impact programmes that build team momentum through simple habits.",
  facts: [["Who it's for", "Any company with more than 10 employees"], ["Format", "On site, online or hybrid"], ["Length", "4 to 8 weeks"], ["Pricing", "Tailored. Free quote on your discovery call"]],
  includedTitle: "What's included",
  included: ["A structured challenge built around sleep, food, movement and connection", "Team leaderboards and tracking through our online coaching app, so challenges can run fully remotely", "In-person sessions and check-ins where you want them", "Optional health monitoring bands to measure real change", "A results summary for leadership at the end"],
  photoCaption: "A team taking part in a wellbeing challenge",
})}

${programmeSection({
  id: "coaching", rev: true, label: "Coaching-led", title: "Coaching-Led Programmes",
  lead: "Ongoing support with structured plans, regular check-ins and accountability.",
  facts: [["Who it's for", "Teams of 10 or more at a time"], ["Larger sites", "Run in cohorts, starting with a pilot"], ["Length", "Ongoing"], ["Pricing", "Tailored. Free quote on your discovery call"]],
  includedTitle: "Support we can include",
  included: ["Personal training and coaching", "Massage therapy", "Physiotherapy and occupational health", "Counselling", "Yoga and Pilates sessions", "Wellbeing initiatives tailored to your teams"],
  extra: `<p class="sw-body sw-muted">If your site has more than 15 employees we run the programme in cohorts. We start with a pilot, use its results to improve the programme, then roll it out to the rest of your teams.</p>`,
  photoCaption: "A coach working one to one with an employee",
})}

${programmeSection({
  id: "workshops", theme: "raised", label: "Workshops", title: "Workshops & Education",
  lead: "Practical sessions that give teams tools they can use day to day.",
  facts: [["Length", "45 to 60 minutes"], ["Format", "In person (best received) or remote"], ["Group size", "No limit for talks; interactive sessions sized to you"], ["Pricing", "Typically three workshops for &pound;900"]],
  includedTitle: "Topics we cover",
  included: ["Motivation and mindset", "Nutrition", "Training and exercise", "Flexibility and mobility", "Workplace posture", "Diabetes", "Weight management", "Anything your workplace needs to talk about: we bring in specialists where needed"],
  extra: `<p class="sw-small">Prices vary with the topic, travel, group size and what's needed to deliver. We fit sessions around lunch breaks or working hours.</p>`,
  photoCaption: "A workshop in progress at a client site",
})}

${programmeSection({
  id: "pt-in-your-pocket", rev: true, label: "App coaching", title: "PT in your pocket",
  lead: "A coaching app that gives employees a structured programme, nutrition advice and habit support between sessions.",
  facts: [["How it's sold", "On its own or as part of a package"], ["Who takes part", "Everyone, or only those who opt in"], ["Length", "Usually a set window; employees can carry on themselves"], ["Pricing", "Tailored. Free quote on your discovery call"]],
  includedTitle: "What employees get",
  included: ["A structured training programme they follow on their phone", "Nutritional advice", "Lifestyle and habit advice", "Optional health monitoring band tracking heart rate, heart rate variability, sleep and activity, so we can see real improvements day to day"],
  photoCaption: "App screens and the health monitoring band",
  media: `<figure class="sw-app-shots">
   <div class="sw-app-shots__grid">
    ${[["app-session", "A completed upper body strength session in the app, with the warm-up, a client effort rating and a 40-minute duration", 800, 1457],
       ["app-sleep", "Sleep tracking in the app: a week of nightly sleep split into light, REM and deep sleep", 800, 691],
       ["app-movement", "Movement tracking in the app: a week of daily steps and total active time", 800, 847]]
      .map(([f, alt, w, h]) => `<picture class="sw-app-shot sw-app-shot--${f}"><source srcset="/assets/app/${f}.webp" type="image/webp"><img src="/assets/app/${f}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy"></picture>`).join("")}
   </div>
   <figcaption class="sw-small">Real screens from the coaching app: a logged session, sleep and daily movement.</figcaption>
  </figure>`,
})}

<section class="sw-section" data-theme="light" aria-labelledby="delivery-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">Delivery</span>
   <h2 class="sw-h2" id="delivery-title">On site, online, or both.</h2>
   <p class="sw-body sw-muted">Some support has to happen in person. The rest can run wherever your people are.</p>
  </div>
  <div class="sw-table-wrap"><table class="sw-table">
   <thead><tr><th scope="col">On site</th><th scope="col">On site or online</th></tr></thead>
   <tbody>
    <tr><td>Massage therapy</td><td>Counselling</td></tr>
    <tr><td>Physiotherapy</td><td>Personal training</td></tr>
    <tr><td>Occupational health</td><td>Workshops and webinars</td></tr>
    <tr><td>Yoga and Pilates</td><td>Wellbeing challenges through the coaching app</td></tr>
   </tbody>
  </table></div>
 </div>
</section>

${ctaBand()}`,
});

// ---------- Results ----------
page({
  slug: "results",
  title: "Results | Strive Wellbeing",
  description: "Results from real Strive Wellbeing programmes, with what was measured, how many people took part and over what time. Case studies from our clients.",
  main: `
<section class="sw-hero sw-hero--page" data-theme="dark" aria-labelledby="page-title">
 <div class="sw-container sw-split">
  <div class="sw-hero__copy">
   <span class="sw-label">Results</span>
   <h1 class="sw-h1" id="page-title">Results from real programmes.</h1>
   <p class="sw-lead">We measure what changes, from sleep and activity to absence and how teams feel, and report it back to leadership.</p>
  </div>
  <div class="sw-bracket" style="padding:40px">
   <p class="sw-h2">Evidence over claims.</p>
   <p class="sw-body sw-muted" style="margin-top:12px">Every number on this page comes with what was measured, how many people took part and over how long.</p>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="numbers-title">
 <div class="sw-container">
  <div class="sw-head"><span class="sw-label">The numbers</span><h2 class="sw-h2" id="numbers-title">What clients have measured.</h2></div>
  <div class="sw-grid sw-grid--3">
   <div class="sw-todo">Result 1: what was measured, the number, how many people and over what time. For example "average sleep up 41 minutes, 42 staff, 8 weeks".</div>
   <div class="sw-todo">Result 2: what was measured, the number, how many people and over what time.</div>
   <div class="sw-todo">Result 3: what was measured, the number, how many people and over what time.</div>
  </div>
 </div>
</section>

<section class="sw-section sw-section--raised" data-theme="light" aria-labelledby="cases-title">
 <div class="sw-container">
  <div class="sw-head"><span class="sw-label">Case studies</span><h2 class="sw-h2" id="cases-title">How we've worked with clients.</h2></div>
  <div class="sw-grid">
   ${["K9 Security", "Eric Wright Group"].map((c) => `<article class="sw-card">
    <span class="sw-label">Case study</span>
    <h3 class="sw-h3">${c}</h3>
    <dl class="sw-facts" style="grid-template-columns:1fr">
     <div><dt>The challenge</dt><dd class="sw-todo">What ${c} wanted to change.</dd></div>
     <div><dt>What we did</dt><dd class="sw-todo">The programme, format and length.</dd></div>
     <div><dt>The result</dt><dd class="sw-todo">What changed, with numbers and sample size.</dd></div>
    </dl>
   </article>`).join("\n   ")}
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="quote-title">
 <div class="sw-container">
  <h2 class="sw-label" id="quote-title">In their words</h2>
  <div class="sw-todo" style="margin-top:24px;max-width:760px">One to three client quotes, each with name, role and company, approved by the client.</div>
 </div>
</section>

<section class="sw-section sw-section--sunken" data-theme="light" style="padding:40px 0" aria-label="Clients">
 <div class="sw-container sw-stack">
  <span class="sw-label sw-label--muted">Trusted by teams at</span>
  <ul class="sw-clients"><li>Eric Wright Group</li><li>K9 Security</li><li>BNA Engineering</li><li>Eric Wright Water</li></ul>
 </div>
</section>

${ctaBand()}`,
});

// ---------- About ----------
const team = [
  { name: "Josh Reilly", role: "Co-founder and performance coach", img: "josh-reilly",
    bio: "Ten years in health and fitness, coaching elite athletes, professionals, everyday gym-goers and older adults. Wellbeing and performance sit at the heart of his coaching." },
  { name: "Harvey Close", role: "Co-founder and lifestyle coach", img: "harvey-close",
    bio: "A former semi-professional footballer whose career took him to the other side of the world, Harvey knows how to perform under pressure and lead a team. His passion is wellbeing that fits around busy, sociable lives, delivered in a way people actually buy into." },
  { name: "Joe Whittaker, MSc", role: "Nutritionist and dietitian", img: "joseph-whitaker",
    bio: "With real lived experience of autoimmunity, Joe brings practical nutrition solutions and lifestyle changes. His drive to bring out the best in people through their lifestyle and nutrition choices, and his calm, compassionate approach, are why he gets results." },
];
page({
  slug: "about",
  title: "About us | Strive Wellbeing",
  description: "Meet Josh Reilly and Harvey Close, the coaches behind Strive Wellbeing, and our no-nonsense approach to workplace wellbeing.",
  main: `
<section class="sw-hero sw-hero--page" data-theme="light" aria-labelledby="page-title">
 <div class="sw-container"><div class="sw-hero__copy">
  <span class="sw-label">About</span>
  <h1 class="sw-h1" id="page-title">Our approach to genuine change.</h1>
  <p class="sw-lead">Strive Wellbeing takes coaching-led wellbeing programmes into workplaces, built on habits, real data and specialist partners. We work with organisations of 10 people or more, anywhere in the UK.</p>
 </div></div>
</section>

<section class="sw-section sw-section--raised" data-theme="light" aria-labelledby="values-title">
 <div class="sw-container">
  <div class="sw-head"><span class="sw-label">What we stand for</span><h2 class="sw-h2" id="values-title">Three things we won't compromise on.</h2></div>
  <div class="sw-grid sw-grid--3">
   <div class="sw-value"><h3 class="sw-h3">No-nonsense.</h3><p class="sw-body sw-muted">We cut through the noise and tell you what works.</p></div>
   <div class="sw-value"><h3 class="sw-h3">Habits over hacks.</h3><p class="sw-body sw-muted">Sleep, food, movement and connection, done consistently.</p></div>
   <div class="sw-value"><h3 class="sw-h3">Partnership.</h3><p class="sw-body sw-muted">We work alongside your people and bring in specialists where they add value.</p></div>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="team-title">
 <div class="sw-container">
  <div class="sw-head"><span class="sw-label">The team</span><h2 class="sw-h2" id="team-title">The coaches behind Strive.</h2></div>
  <div class="sw-grid sw-grid--3">
   ${team.map((p) => `<article class="sw-person">
    ${p.img ? `<div class="sw-person__photo"><picture><source srcset="/assets/team/${p.img}.webp" type="image/webp"><img src="/assets/team/${p.img}.jpg" alt="${p.name}, ${p.role.toLowerCase()} at Strive Wellbeing" width="900" height="1125" loading="lazy"></picture></div>` : photo(`Portrait of ${p.name}, 4:5`, "sw-photo--tall")}
    <div class="sw-stack" style="gap:4px"><h3 class="sw-h3">${p.name}</h3><p class="sw-small">${p.role}</p></div>
    <p class="sw-body sw-muted">${p.bio}</p>
   </article>`).join("\n   ")}
  </div>
 </div>
</section>

<section class="sw-section" data-theme="dark" aria-labelledby="belief-title">
 <div class="sw-container sw-split">
  <div class="sw-bracket" style="padding:48px"><p class="sw-h1" id="belief-title">Wellbeing shouldn't stop after a few weeks.</p></div>
  <div class="sw-stack">
   <p class="sw-lead">We always need to keep fit and healthy, so we don't sell quick fixes. Challenges run for 4 to 8 weeks, then ongoing support keeps the habits going.</p>
   <p class="sw-body sw-muted">For you, that means a more focused workforce and less time lost to sickness. For your people, it means feeling better at work and at home.</p>
  </div>
 </div>
</section>

${ctaBand()}`,
});

// ---------- Contact ----------
page({
  slug: "contact",
  title: "Book a discovery call | Strive Wellbeing",
  description: "Tell us about your organisation and what you'd like to change. We reply within one working day with a call and a free, tailored quote.",
  scripts: `<script type="module" src="/js/contact.js"></script>\n`,
  main: `
<section class="sw-section" data-theme="light" aria-labelledby="page-title">
 <div class="sw-container sw-split sw-split--top">
  <div class="sw-stack sw-stack--lg">
   <span class="sw-label">Contact</span>
   <h1 class="sw-h1" id="page-title">Book a discovery call.</h1>
   <p class="sw-lead">Tell us a little about your organisation and what you'd like to change. We'll call you back, talk it through and give you a free quote on the call.</p>
   <ul class="sw-contact-list">
    <li><span>Email</span><a class="sw-link" href="mailto:${SITE.email}">${SITE.email}</a></li>
    <li><span>Phone</span><a class="sw-link" href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></li>
    <li><span>LinkedIn</span><a class="sw-link" href="${SITE.linkedin}" rel="noopener" target="_blank">Strive Wellbeing</a></li>
   </ul>
   <p class="sw-body sw-muted">We reply within one working day. Nationwide, on site and online.</p>
  </div>
  <div class="sw-form-panel">
   <div id="enquiry" data-form-id="${SITE.formId}" aria-live="polite"><p class="sw-body sw-muted">Loading the form&hellip;</p></div>
   <noscript><p class="sw-body">Please email <a href="mailto:${SITE.email}">${SITE.email}</a> or call ${SITE.phoneDisplay}.</p></noscript>
  </div>
 </div>
</section>`,
});

// ---------- Legal ----------
const updated = "6 November 2026";
page({
  slug: "privacy",
  title: "Privacy policy | Strive Wellbeing",
  description: "How Strive Wellbeing collects, uses and protects personal data from enquiries and programmes, and your rights under UK data protection law.",
  main: `
<section class="sw-section" data-theme="light" aria-labelledby="page-title">
 <div class="sw-container sw-prose">
  <p class="sw-todo">Draft for the founders to review before launch. It is not legal advice.</p>
  <span class="sw-label">Legal</span>
  <h1 class="sw-h1" id="page-title">Privacy policy</h1>
  <p class="sw-small">Last updated ${updated}</p>
  <p>This policy explains how Strive Wellbeing ("we", "us") collects and uses personal data when you visit this website, send us an enquiry, or take part in one of our programmes. We are the data controller for this information.</p>
  <p>Contact: <a href="mailto:${SITE.email}">${SITE.email}</a>, ${SITE.phoneDisplay}.</p>

  <h2>What we collect</h2>
  <ul>
   <li><strong>Enquiries:</strong> your name, work email, phone number (optional), company, team size, the programmes you're interested in and your message.</li>
   <li><strong>Clients and programme participants:</strong> contact details, attendance, survey answers and, only where you agree to wear one, data from a health monitoring band (heart rate, heart rate variability, sleep and activity).</li>
   <li><strong>Website use:</strong> basic technical data our hosting provider needs to run the site securely, such as your IP address and browser type.</li>
  </ul>

  <h2>Why we use it, and our legal basis</h2>
  <ul>
   <li>To reply to your enquiry and give you a quote: our legitimate interest in responding to people who contact us, or steps before entering a contract.</li>
   <li>To deliver a programme your employer has agreed with us: performance of that contract and our legitimate interests.</li>
   <li>Health data from bands, surveys or coaching: your explicit consent, which you can withdraw at any time. Results we share with your employer are anonymised and grouped, never individual.</li>
   <li>To keep records for tax and accounting: legal obligation.</li>
  </ul>
  <p>We don't sell your data or use it for advertising.</p>

  <h2>Who we share it with</h2>
  <ul>
   <li>Wix.com, which hosts this website and stores enquiry form submissions on our behalf.</li>
   <li>The provider of our coaching app and health monitoring bands, for participants who use them.</li>
   <li>Specialist practitioners we bring in to deliver part of a programme (for example physiotherapy or counselling), only the details they need.</li>
  </ul>
  <p>Some of these providers may process data outside the UK. Where they do, the transfer is covered by UK adequacy regulations or standard contractual clauses.</p>

  <h2>How long we keep it</h2>
  <ul>
   <li>Enquiries that don't lead to work: 24 months from your last contact, then deleted.</li>
   <li>Client contracts and invoices: the length of the contract plus 6 years, for tax purposes.</li>
   <li>Programme participant data: for the programme plus 12 months, then deleted or fully anonymised.</li>
  </ul>

  <h2>Your rights</h2>
  <p>Under UK GDPR you can ask to see the data we hold about you, correct it, delete it, restrict or object to how we use it, take a copy of it, and withdraw consent at any time. Email <a href="mailto:${SITE.email}">${SITE.email}</a> and we'll respond within one month.</p>
  <p>If you're unhappy with how we've handled your data, you can complain to the Information Commissioner's Office at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a> or on 0303 123 1113.</p>

  <h2>Changes</h2>
  <p>We'll update this page if anything changes and show the date at the top.</p>
 </div>
</section>`,
});

page({
  slug: "cookies",
  title: "Cookie policy | Strive Wellbeing",
  description: "The cookies and browser storage the Strive Wellbeing website uses. Strictly necessary only: no advertising or analytics tracking.",
  main: `
<section class="sw-section" data-theme="light" aria-labelledby="page-title">
 <div class="sw-container sw-prose">
  <p class="sw-todo">Draft for the founders to review before launch. Update this page if analytics are added later.</p>
  <span class="sw-label">Legal</span>
  <h1 class="sw-h1" id="page-title">Cookie policy</h1>
  <p class="sw-small">Last updated ${updated}</p>
  <p>Cookies and similar technologies are small files or entries a website stores in your browser. This page explains which ones this site uses.</p>

  <h2>What we use</h2>
  <ul>
   <li><strong>Strictly necessary storage.</strong> When you open the contact form, the site stores an anonymous visitor token in your browser's local storage so the form can load and send your enquiry securely through Wix. It contains no personal details.</li>
   <li><strong>Hosting and security.</strong> Our hosting provider, Wix, may set cookies needed to deliver the site and protect it from abuse.</li>
  </ul>
  <p>Because these are strictly necessary for the site to work, they don't need your consent under UK law.</p>

  <h2>What we don't use</h2>
  <p>No advertising cookies, no cross-site tracking and no analytics. Fonts are served from our own site, not from a third party.</p>

  <h2>Managing cookies</h2>
  <p>You can block or delete cookies and local storage in your browser settings. If you do, the contact form may not work. You can always email <a href="mailto:${SITE.email}">${SITE.email}</a> instead.</p>
 </div>
</section>`,
});

// ---------- Why wellbeing (evidence) ----------
const tile = (label, num, text, src, signal = false) =>
  `<div class="sw-stat"><span class="sw-label sw-label--muted">${label}</span><span class="sw-stat-num${signal ? " sw-stat-num--signal" : ""}">${num}</span><span class="sw-small">${text} ${cite(src)}</span></div>`;
page({
  slug: "why-wellbeing",
  title: "The cost of sickness absence and stress | Strive Wellbeing",
  description: "UK data from the ONS, HSE, CIPD and the Keep Britain Working Review on sickness absence, stress and burnout, and why prevention pays.",
  main: `
<section class="sw-hero sw-hero--page" data-theme="dark" aria-labelledby="page-title">
 <div class="sw-container"><div class="sw-hero__copy">
  <span class="sw-label">Why wellbeing</span>
  <h1 class="sw-h1" id="page-title">Sickness absence is costing your business more than you think.</h1>
  <p class="sw-lead">Absence in the UK is at its highest level in over 15 years, and stress and poor mental health now drive the longest absences. Here's what the official data says, and why prevention is the cheaper option.</p>
 </div></div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="scale-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">The scale</span>
   <h2 class="sw-h2" id="scale-title">More people are off sick, for longer.</h2>
   <p class="sw-body sw-muted">The UK sickness absence rate was 2.0% of working hours in 2025, still above its pre-pandemic level.</p>
  </div>
  <div class="sw-stats">
   ${tile("Days lost, 2025", "148.8m", "Working days lost to sickness or injury in the UK, an average of 4.4 days per worker.", "ons")}
   ${tile("Per employee", "9.4", "Average days of absence per employee a year, the highest in over 15 years, up from 5.8 in 2022.", "cipd")}
   ${tile("Out of work", "2.8m", "People aged 16 to 64 economically inactive because of long-term sickness.", "onsInactive")}
  </div>
 </div>
</section>

<section class="sw-section sw-section--raised" data-theme="light" aria-labelledby="stress-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">Stress and burnout</span>
   <h2 class="sw-h2" id="stress-title">Stress causes the longest absences.</h2>
   <p class="sw-body sw-muted">Work-related stress, depression and anxiety now account for over half of all work-related ill health in Great Britain, and the trend is still rising.</p>
  </div>
  <div class="sw-stats">
   ${tile("Workers affected", "964,000", "Workers with work-related stress, depression or anxiety in 2024/25, causing 22.1 million lost working days.", "hse")}
   ${tile("Per case", "22.9", "Average days lost per case of stress, depression or anxiety, the longest of any work-related condition.", "hse")}
   ${tile("Under pressure", "91%", "Of UK adults experienced high or extreme pressure or stress in the past year; around one in five needed time off as a result.", "mhuk")}
   ${tile("Long-term absence", "41%", "Of organisations name mental ill health as a top cause of long-term absence, more than any other cause.", "cipd")}
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="cost-title">
 <div class="sw-container">
  <div class="sw-head">
   <span class="sw-label">The cost</span>
   <h2 class="sw-h2" id="cost-title">What it costs employers.</h2>
  </div>
  <div class="sw-stats">
   ${tile("Poor workplace health", "&pound;85bn", "A year to UK employers through sickness, staff turnover and lost productivity. Each day of sickness absence costs around &pound;120 in lost profit.", "kbw")}
   ${tile("Poor mental health", "&pound;51bn", "A year to UK employers: &pound;24bn from presenteeism, &pound;20bn from staff turnover and &pound;7bn from absence.", "deloitte")}
  </div>
  <div class="sw-split sw-split--top" style="margin-top:48px">
   <div class="sw-stack">
    <h3 class="sw-h3">Short-term absence now costs from day one.</h3>
    <p class="sw-body">Since 6 April 2026, Statutory Sick Pay is paid from the first day of sickness, not the fourth, and the lower earnings limit has gone, so part-time and lower-paid staff now qualify too. The rate is &pound;123.25 a week, or 80% of average weekly earnings if lower. ${cite("ssp")}</p>
    <p class="sw-body sw-muted">On top of sick pay come the costs that don't show on payroll: cover and overtime, missed deadlines and the extra load on the rest of the team.</p>
   </div>
   <div class="sw-stack">
    <h3 class="sw-h3">Long-term absence is the most expensive of all.</h3>
    <p class="sw-body">Statutory Sick Pay can run for up to 28 weeks, while you cover the role and the work slows down. The longer someone is off, the harder it is to come back, and ill health is now the leading reason people leave the workforce altogether. ${cite("kbw")}</p>
    <p class="sw-body sw-muted">Losing an experienced employee means recruitment, training and months of lost knowledge.</p>
   </div>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="dark" aria-labelledby="return-title">
 <div class="sw-container sw-split">
  <div class="sw-bracket" style="padding:48px">
   <span class="sw-label">The return</span>
   <p class="sw-stat-num sw-stat-num--signal">&pound;4.70</p>
   <p class="sw-body" style="margin-top:12px">Average return for every &pound;1 UK employers invest in supporting their employees' mental health. ${cite("deloitte")}</p>
  </div>
  <div class="sw-stack sw-stack--lg">
   <h2 class="sw-h2" id="return-title">Prevention costs less than absence.</h2>
   <p class="sw-body">Most of the cost of poor health is in people who are still at work but struggling, and in people who leave. That's where early support pays back fastest. Healthier habits, regular coaching and someone checking in help people stay well, spot problems early and stay in work.</p>
   <ul class="sw-list">
    <li>Structured challenges build the everyday habits behind sleep, energy and resilience.</li>
    <li>Coaching and check-ins catch stress before it becomes a long absence.</li>
    <li>On-site physiotherapy, massage and occupational health keep minor problems minor.</li>
    <li>We measure the change, so you can see the return for yourself.</li>
   </ul>
   <div class="sw-actions"><a class="sw-btn sw-btn--secondary" href="/programmes.html">See our programmes</a></div>
  </div>
 </div>
</section>

<section class="sw-section" data-theme="light" aria-labelledby="sources-title">
 <div class="sw-container sw-prose">
  <h2 class="sw-h2" id="sources-title">Sources</h2>
  <p class="sw-small">Figures checked November 2026. We update this page when new data is published.</p>
  <ol class="sw-sources">
   ${Object.values(SOURCES).map((s) => `<li id="source-${s.n}"><strong>${s.org}</strong>, <a href="${s.url}" rel="noopener" target="_blank">${s.title}</a>, ${s.date}.${s.note ? ` <span class="sw-muted">${s.note}</span>` : ""}</li>`).join("\n   ")}
  </ol>
 </div>
</section>

${ctaBand()}`,
});

console.log("built", ["index", "why-wellbeing", "programmes", "results", "about", "contact", "privacy", "cookies"].join(", "));

// ---------- minify output (whitespace and comments only) ----------
import { readdirSync } from "node:fs";
{
  let c = readFileSync(join(out, "site.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "\n").trim();
  c = c.replace(/^\.(display|h1|h2|h3|stat|label|lead|body|small|button) \{[^}]*\}\n/gm, "");
  writeFileSync(join(out, "site.css"), c + "\n");
  for (const f of readdirSync(out).filter((n) => n.endsWith(".html"))) {
    writeFileSync(join(out, f), readFileSync(join(out, f), "utf8").replace(/\n[ \t]+/g, "\n").replace(/\n{2,}/g, "\n"));
  }
}
