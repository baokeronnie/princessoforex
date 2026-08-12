/*!
 * Princess of Forex — Market Watch Ticker
 * Client-side animated ribbon. Prices are a simulated random walk seeded
 * from realistic starting levels — there is no live market data feed wired
 * up here. Swap `tick()` for a real quote API when one is available.
 */
(function () {
  "use strict";

  var PAIRS = [
    { symbol: "EUR/USD", price: 1.0842, decimals: 4, step: 0.0006 },
    { symbol: "GBP/USD", price: 1.2731, decimals: 4, step: 0.0007 },
    { symbol: "USD/JPY", price: 151.62, decimals: 2, step: 0.06 },
    { symbol: "USD/ZAR", price: 18.24, decimals: 3, step: 0.02 },
    { symbol: "USD/BWP", price: 13.58, decimals: 3, step: 0.015 },
    { symbol: "XAU/USD", price: 2412.3, decimals: 1, step: 1.4 },
    { symbol: "BTC/USD", price: 64830, decimals: 0, step: 65 },
    { symbol: "AUD/USD", price: 0.6614, decimals: 4, step: 0.0005 }
  ];

  function fmt(n, decimals) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function buildItem(pair) {
    var item = document.createElement("span");
    item.className = "pof-ticker__item";
    item.setAttribute("data-symbol", pair.symbol);

    var symbolEl = document.createElement("span");
    symbolEl.className = "pof-ticker__pair";
    symbolEl.textContent = pair.symbol;

    var priceEl = document.createElement("span");
    priceEl.className = "pof-ticker__price";
    priceEl.textContent = fmt(pair.price, pair.decimals);

    var deltaEl = document.createElement("span");
    deltaEl.className = "pof-ticker__delta up";
    deltaEl.textContent = "▲ 0.00%";

    item.appendChild(symbolEl);
    item.appendChild(priceEl);
    item.appendChild(deltaEl);
    return item;
  }

  function init() {
    var scrollEl = document.getElementById("pof-ticker-scroll");
    if (!scrollEl) return;

    var state = PAIRS.map(function (p) {
      return { symbol: p.symbol, base: p.price, price: p.price, decimals: p.decimals, step: p.step };
    });

    // Render the strip twice back-to-back so the CSS marquee loop is seamless.
    var frag = document.createDocumentFragment();
    [0, 1].forEach(function () {
      PAIRS.forEach(function (pair) {
        frag.appendChild(buildItem(pair));
      });
    });
    scrollEl.appendChild(frag);

    function tick() {
      var nodes = scrollEl.querySelectorAll(".pof-ticker__item");
      state.forEach(function (s, idx) {
        var move = (Math.random() - 0.5) * 2 * s.step;
        var next = s.price + move;
        // gentle mean reversion so prices don't wander off forever
        next += (s.base - next) * 0.03;
        var direction = next >= s.price ? "up" : "down";
        var pctChange = ((next - s.base) / s.base) * 100;
        s.price = next;

        for (var copy = 0; copy < 2; copy++) {
          var node = nodes[idx + copy * PAIRS.length];
          if (!node) continue;
          var priceEl = node.querySelector(".pof-ticker__price");
          var deltaEl = node.querySelector(".pof-ticker__delta");
          priceEl.textContent = fmt(s.price, s.decimals);
          priceEl.classList.remove("flash-up", "flash-down");
          void priceEl.offsetWidth; // restart animation
          priceEl.classList.add(direction === "up" ? "flash-up" : "flash-down");
          deltaEl.className = "pof-ticker__delta " + direction;
          deltaEl.textContent = (direction === "up" ? "▲ " : "▼ ") + Math.abs(pctChange).toFixed(2) + "%";
        }
      });
    }

    setInterval(tick, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
