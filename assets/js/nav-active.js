(function () {
  function normalize(pathname) {
    if (pathname.endsWith("/index.html")) pathname = pathname.slice(0, -"index.html".length);
    if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    return pathname;
  }

  var current = normalize(window.location.pathname);
  var navLinks = document.querySelectorAll("nav ul a");

  // 1) Highlight top-level page tabs (Blog, Public Speaking, Portfolio, etc.)
  navLinks.forEach(function (a) {
    var url = new URL(a.getAttribute("href"), window.location.href);
    if (url.hash) return; // hash links (homepage sections) handled separately below
    if (normalize(url.pathname) === current) a.classList.add("active");
  });

  // 2) Scroll-spy for homepage section anchors (Today / Roadmap / Certifications / Beyond the Data)
  var sectionIds = ["today", "roadmap", "certs", "beyond"];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (!sections.length) return;

  var hashLinks = {};
  navLinks.forEach(function (a) {
    var href = a.getAttribute("href");
    var hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    hashLinks[href.slice(hashIndex + 1)] = a;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = hashLinks[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        Object.keys(hashLinks).forEach(function (k) { hashLinks[k].classList.remove("active"); });
        link.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();

// Light/dark theme toggle
(function () {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("theme", "light"); } catch (e) {}
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
    }
  });
})();

// Close the mobile burger menu automatically if the user scrolls while it's open
(function () {
  var toggle = document.getElementById("nav-toggle");
  if (!toggle) return;
  var openScrollY = 0;
  toggle.addEventListener("change", function () {
    if (toggle.checked) openScrollY = window.scrollY;
  });
  window.addEventListener(
    "scroll",
    function () {
      if (toggle.checked && Math.abs(window.scrollY - openScrollY) > 10) {
        toggle.checked = false;
      }
    },
    { passive: true }
  );
})();
