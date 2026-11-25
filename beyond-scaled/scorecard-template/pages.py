# Page settings for each scorecard. Edit here, then run:  python3 build.py
WA = '+44 7793 458864'

UBG = dict(
  out='../upper-body-accelerator/scorecard',
  TITLE='Pull-Up Scorecard | Beyond Scaled',
  DESCRIPTION='Upper Body Gymnastics Accelerator scorecard. Test five skills on Day 1 and in week 6, see your score, and send it to Josh.',
  PROGRAMME='Upper Body Gymnastics Accelerator',
  EMAIL_LABEL='Email (the one you bought with)',
  WA_NOTE='Videos too big to upload? Send them to Josh on WhatsApp: <b>'+WA+'</b>. Keep your pull-up videos, you need them for the guarantee. <!-- [CHECK] guarantee wording -->',
  CONFIG=r'''
  /* ============================ CONFIG ============================
     baselineFormUrl  Public link to the GHL form for the Day 1 test, e.g.
                      https://api.leadconnectorhq.com/widget/form/XXXXXXXX
                      (Sites → Forms → your form → Integrate → copy the link).      [GHL FORM]
     retestFormUrl    Same, for the week 6 retest. Can be the same form.              [GHL FORM]
     keys             Each value must match the field's Query key in the GHL form builder,
                      so the form opens with the scores already filled in.
     whatsapp         Josh's number for wa.me links: international format, no + or spaces.
     Ad tracking (utm_*, fbclid, gclid) on this page's URL is passed on to the form.
     Links can pre-fill the page: ?name=Sam&email=sam@x.com&mode=retest&d1=2,1,3,2,1
     (d1 = Day 1 levels in test order; or &baseline=15 for just the Day 1 total)
     ================================================================ */
  var CONFIG = {
    baselineFormUrl: '',
    retestFormUrl:   '',
    keys: { name:'first_name', email:'email', baseline:'ubg_baseline_score', retest:'ubg_retest_score', beat:'ubg_beat_score', detail:'ubg_scorecard_detail' },
    whatsapp: '447793458864',
    storageKey: 'ubg',
    text: {
      baselineMode:'Day 1 test', retestMode:'Week 6 retest', baselineShort:'Day 1', retestShort:'Week 6',
      baselineTitle:'Your Day 1 <span class="blue">scorecard</span>', retestTitle:'Your week 6 <span class="blue">retest</span>',
      baselineLede:"Test all five, tap the level you hit on each, then send your score to Josh. This is the number you're going to beat in week 6.",
      retestLede:"Same five tests, same order, same rules as Day 1. Tap what you hit today, and see it on the chart against your Day 1.",
      prevHelp:'Tap your week 6 level in blue. Your Day 1 level is in orange underneath: it fills in by itself if you did Day 1 on this phone.',
      baselineTotalLabel:"Don't know your Day 1 levels? Type your Day 1 total instead",
      testsLabel:'The five tests',
      screenshot:"Screenshot this card and upload it to CoachRx too."
    },
    protocol: [
      'Do it fresh: before a class or on a rest day, after a short warm-up.',
      'Go in this order: kipping pull-ups, strict pull-ups, dead hang, hollow hold, pike leg lifts. Rest about 3 minutes between tests.',
      'Film your kipping and strict pull-up tests from the side, whole body in shot.',
      "Pick the highest level you completed with good form. Between two levels? Pick the lower one.",
      'Log every result in CoachRx as well.'
    ],
    gap: null,
    next: null
  };
  var TESTS = [
    { id:'kip', name:'Kipping pull-ups', short:'Kipping', weight:3, how:'Max unbroken reps, chin over the bar. Use the lightest band you need.',
      levels:['No banded kips','Banded only','1 unbanded','2–3 unbanded','4+ unbanded'] },
    { id:'strict', name:'Strict pull-ups', short:'Strict', weight:3, how:'Max reps, from a dead hang to chin over the bar. No kip.',
      levels:['No banded pull-up','Banded only','1','3','5–6+'],
      warnAt0:"You need to manage a banded pull-up to start this programme. Message Josh on WhatsApp and he'll point you to the right starting point." },
    { id:'hang', name:'Dead hang', short:'Dead hang', weight:1, how:'Hang from the bar, arms straight, for as long as you can.',
      levels:['Under 10 s','10 s','20 s','30 s','40 s+'] },
    { id:'hollow', name:'Hollow hold (45 s)', row:'Hollow hold', short:'Hollow', weight:1, how:'Shoulders off the floor, lower back flat, bum tucked. One-knee version: knee past belly button, heel to bum, other leg straight 3–6 inches off the floor. Break position? Drop a level.',
      levels:['Fails all levels','Both knees to chest','One knee to chest','Long hollow','Long hollow, arms by ears'] },
    { id:'pike', name:'Core: pike leg lifts', row:'Pike leg lifts', short:'Pike lifts', weight:1, how:'Hit the hardest level you can finish with good form.',
      levels:['Fails all levels','20 alternating V-ups, feet off floor','10/side single-leg, hands on dumbbell heads','10/side single-leg, hands by knees','10 double-leg, feet 6+ in off floor, hands by knees'] }
  ];
''')

KPU = dict(
  out='../kipping-workshop/scorecard',
  TITLE='Kipping Workshop Scorecard | Beyond Scaled',
  DESCRIPTION='5-Day Kipping Pull-Up Workshop scorecard. Test on Day 1, retest on Thursday, see the difference and send it to Josh.',
  PROGRAMME='5-Day Kipping Pull-Up Workshop',
  EMAIL_LABEL='Email (the one you signed up with)',
  WA_NOTE='Videos too big to upload? Send them to Josh on WhatsApp: <b>'+WA+'</b>, or post them in the Beyond Scaled community.',
  CONFIG=r'''
  /* ============================ CONFIG ============================
     baselineFormUrl  Public link to the GHL form for the Day 1 test, e.g.
                      https://api.leadconnectorhq.com/widget/form/XXXXXXXX
                      (Sites → Forms → your form → Integrate → copy the link).      [GHL FORM]
     retestFormUrl    Same, for the Thursday retest. Can be the same form.            [GHL FORM]
     keys             Each value must match the field's Query key in the GHL form builder,
                      so the form opens with the scores already filled in.
     whatsapp         Josh's number for wa.me links: international format, no + or spaces.
     next.url         The 6-week accelerator sales page. The offer card shows after a
                      completed Thursday retest. Leave '' to hide it.                 [CHECK]
     Ad tracking (utm_*, fbclid, gclid) on this page's URL is passed on to the form and offer.
     Links can pre-fill the page: ?name=Sam&email=sam@x.com&mode=retest&d1=2,1,3,2,1
     (d1 = Day 1 levels in test order; or &baseline=15 for just the Day 1 total)
     ================================================================ */
  var CONFIG = {
    baselineFormUrl: '',
    retestFormUrl:   '',
    keys: { name:'first_name', email:'email', baseline:'kpu_day1_score', retest:'kpu_retest_score', beat:'kpu_beat_score', detail:'kpu_scorecard_detail' },
    whatsapp: '447793458864',
    storageKey: 'kpu',
    text: {
      baselineMode:'Day 1 test', retestMode:'Thursday retest', baselineShort:'Day 1', retestShort:'Thursday',
      baselineTitle:'Your Day 1 <span class="blue">scorecard</span>', retestTitle:'Your Thursday <span class="blue">retest</span>',
      baselineLede:"Five quick tests, about 10 minutes. Tap the level you hit on each, then send it to Josh. This is your starting line for Thursday.",
      retestLede:"Same five tests, same rules as Sunday. Tap what you hit today, and see it on the chart against your Day 1.",
      prevHelp:'Tap your Thursday level in blue. Your Day 1 level is in orange underneath: it fills in by itself if you did Day 1 on this phone.',
      baselineTotalLabel:"Don't know your Day 1 levels? Type your Day 1 total instead",
      testsLabel:'The five tests',
      screenshot:"Screenshot this card and post it in the Beyond Scaled community."
    },
    // [CHECK] Tests, levels and order: match these to the Day 1 video.
    protocol: [
      'Warm up for 5 minutes first: arm circles, scap pull-ups, a few easy swings.',
      'Go in this order: active hang, hollow hold, kip swings, strict pull-ups, kipping pull-ups. Rest 2 minutes between tests.',
      'Film your kip swings and kipping pull-ups from the side, whole body in shot.',
      "Pick the highest level you hit with good form. Between two levels? Pick the lower one.",
      'Post your clip in the Beyond Scaled community so Josh can see it.'
    ],
    // "Where's the gap?" read-out under the score. Return null to hide it.  [CHECK wording]
    gap: function(p){
      if(p.swing<=2) return {title:'The swing is the gap', text:"Your kip swing isn't holding its shape yet. Floor drills (Day 2) and box drills (Day 3) are where your next points are."};
      if(p.kip>=3) return {title:"You've got a kip. Now it's reps", text:'The pattern is there. More strict strength and a sharper hip pop will turn singles into sets.'};
      if(p.strict<=1||p.hang<=1) return {title:'Strength is the gap', text:"Your swing is good, but you don't have the pulling strength to finish it yet. Strict pulling and longer hangs come next."};
      return {title:'Timing is the gap', text:"Swing and strength are there. It's the hip pop: Day 4. Hip pop, not leg raise."};
    },
    // Offer card after the Thursday retest.  [CHECK] price and link
    next: {
      url: 'https://dashboard.coachrx.app/programs/sales/371258',
      label: "What's next",
      title: 'Keep going: the 6-Week Upper Body Gymnastics Accelerator',
      text: 'Take this week further: 6 weeks, 10–15 minutes a day, with feedback on your clips every week.',
      button: 'See the 6 weeks'
    }
  };
  var TESTS = [
    { id:'kip', name:'Kipping pull-ups', short:'Kipping', weight:2, how:'Max unbroken reps, chin over the bar. Use the lightest band you need.',
      levels:["Can't kip yet, even banded",'Banded only','1 unbanded','2–3 unbroken','4+ unbroken'] },
    { id:'swing', name:'Kip swing (10 swings)', row:'Kip swing', short:'Kip swing', weight:2, how:'Hollow at the front, arch at the back, arms straight, legs together. Knees bend or legs pike? That swing doesn\'t count.',
      levels:["Can't hold an active hang",'Swings, but loses shape','5 clean swings','10 clean swings','10 clean, with a hip pop every time'] },
    { id:'strict', name:'Strict pull-ups', short:'Strict', weight:1, how:'Max reps, from a dead hang to chin over the bar. No kip.',
      levels:['None, even banded','Banded only','1','2–3','4+'] },
    { id:'hang', name:'Active hang', short:'Active hang', weight:1, how:'Arms straight, shoulders pulled down away from your ears. Hold as long as you can.',
      levels:['Under 10 s','10 s','20 s','30 s','40 s+'] },
    { id:'hollow', name:'Hollow hold (30 s)', row:'Hollow hold', short:'Hollow', weight:1, how:'Lower back flat on the floor, shoulders up. Break position? Drop a level.',
      levels:['Fails all levels','Knees tucked','One leg out','Long hollow','Long hollow, arms by ears'] }
  ];
''')

PAGES = [UBG, KPU]
