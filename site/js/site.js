// Mobile menu toggle.
(function () {
  var header = document.querySelector(".sw-header");
  var btn = header && header.querySelector(".sw-menu-btn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var open = header.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Close" : "Menu";
  });
})();
