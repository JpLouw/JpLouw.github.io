(function () {
  var GOATCOUNTER_CODE = "jplouw"; // your GoatCounter site code

  var el = document.getElementById("visitorCount");
  if (!el) return;

  var path = window.location.pathname;
  var url = "https://" + GOATCOUNTER_CODE + ".goatcounter.com/counter/" + encodeURIComponent(path) + ".json";

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var count = data.count_unique || data.count || "0";
      el.textContent = "· " + count + " visits";
    })
    .catch(function () {
      // fail silently — counter just won't show if GoatCounter isn't reachable
      // (e.g. an ad blocker, or the site hasn't received any data yet)
    });
})();
