// Theme switch first and self-contained, so nothing else on the page can stop it working
(function () {
  var root = document.documentElement, btn = document.getElementById("themeToggle");
  if (!btn) return;
  function sync() { btn.setAttribute("aria-checked", root.getAttribute("data-theme") === "dark" ? "true" : "false"); }
  sync();
  btn.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) {}
    sync();
  });
})();

// Highlight the current page's tab
(function () {
  try {
    function norm(p) { if (p.slice(-11) === "/index.html") p = p.slice(0, -10); if (p.length > 1 && p.slice(-1) === "/") p = p.slice(0, -1); return p; }
    var cur = norm(location.pathname);
    document.querySelectorAll("nav ul a").forEach(function (a) {
      var u = new URL(a.getAttribute("href"), location.href);
      if (!u.hash && norm(u.pathname) === cur) a.classList.add("active");
    });
  } catch (e) {}
})();

// Close the mobile menu if the user scrolls while it is open
(function () {
  var t = document.getElementById("nav-toggle"); if (!t) return;
  var y0 = 0;
  t.addEventListener("change", function () { if (t.checked) y0 = window.scrollY; });
  window.addEventListener("scroll", function () { if (t.checked && Math.abs(window.scrollY - y0) > 10) t.checked = false; }, { passive: true });
})();
