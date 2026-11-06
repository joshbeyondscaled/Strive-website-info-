// Strive Wellbeing site behaviour: mobile menu, hero video, ticker, evidence slider,
// count-up numbers and scroll reveals. Everything respects "reduce motion".
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("sw-js");

  // Mobile menu
  var header = document.querySelector(".sw-header");
  var menuBtn = header && header.querySelector(".sw-menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
    });
  }

  function toggleBtn(btn, paused, pausedLabel, playingLabel) {
    btn.setAttribute("aria-pressed", String(paused));
    btn.textContent = paused ? pausedLabel : playingLabel;
  }

  // Background videos: no controls; stop for people who prefer reduced motion, hide if they fail to load
  document.querySelectorAll(".sw-hero__video, .sw-autoplay").forEach(function (video) {
    if (reduce) { video.removeAttribute("autoplay"); video.pause(); }
    video.addEventListener("error", function () { video.style.display = "none"; }, true);
  });

  // Evidence slider
  document.querySelectorAll("[data-slider]").forEach(function (root) {
    var track = root.querySelector(".sw-slider__track");
    var slides = root.querySelectorAll(".sw-slide");
    var dots = root.querySelectorAll(".sw-slider__dot");
    var i = 0, timer = null, userPaused = reduce, hover = false; // auto-advance pauses on hover/focus only
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-100 * i) + "%)";
      slides.forEach(function (s, k) { if (k === i) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true"); });
      dots.forEach(function (d, k) { if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      countUp(slides[i].querySelector(".sw-stat-num"));
    }
    function schedule() {
      clearInterval(timer);
      if (!userPaused && !hover) timer = setInterval(function () { go(i + 1); }, 6500);
    }
    root.querySelector("[data-prev]").addEventListener("click", function () { go(i - 1); schedule(); });
    root.querySelector("[data-next]").addEventListener("click", function () { go(i + 1); schedule(); });
    dots.forEach(function (d) { d.addEventListener("click", function () { go(+d.getAttribute("data-go")); schedule(); }); });
    root.addEventListener("mouseenter", function () { hover = true; schedule(); });
    root.addEventListener("mouseleave", function () { hover = false; schedule(); });
    root.addEventListener("focusin", function () { hover = true; schedule(); });
    root.addEventListener("focusout", function () { hover = false; schedule(); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(i + 1); schedule(); }
      if (e.key === "ArrowLeft") { go(i - 1); schedule(); }
    });
    var startX = null;
    root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); schedule(); }
      startX = null;
    });
    schedule();
  });

  // Count-up numbers ("148.8m", "£85bn", "964,000", "9.4 days", "91%"). Ranges and words are left as they are.
  function countUp(el) {
    if (!el || reduce || el.getAttribute("data-counted")) return;
    var original = el.innerHTML;
    var text = el.textContent;
    if (/[–-]/.test(text)) return;
    var m = text.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    el.setAttribute("data-counted", "1");
    var prefix = m[1], numStr = m[2], suffix = m[3];
    var decimals = (numStr.split(".")[1] || "").length;
    var commas = numStr.indexOf(",") !== -1;
    var target = parseFloat(numStr.replace(/,/g, ""));
    var start = null, dur = 1200;
    function fmt(v) {
      var s = v.toFixed(decimals);
      if (commas) s = Number(s).toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      return prefix + s + suffix;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step); else el.innerHTML = original;
    }
    requestAnimationFrame(step);
  }

  // Scroll reveals and count-ups as things come into view
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        en.target.querySelectorAll(".sw-stats .sw-stat-num, .sw-bracket .sw-stat-num").forEach(countUp);
        var firstSlide = en.target.querySelector(".sw-slide .sw-stat-num");
        if (firstSlide) countUp(firstSlide);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll("main > section:not(.sw-hero):not(.sw-ticker)").forEach(function (s) {
      s.classList.add("sw-reveal");
      io.observe(s);
    });
  }
})();
