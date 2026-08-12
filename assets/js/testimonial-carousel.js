/*!
 * Princess of Forex — Testimonial carousel
 * Auto-advances through client testimonials, with working prev/next
 * buttons and dot navigation. Pauses on hover/focus and respects
 * prefers-reduced-motion.
 */
(function () {
  "use strict";

  function init() {
    var root = document.getElementById("pof-testimonials");
    var track = document.getElementById("pof-testimonials-track");
    var dotsWrap = document.getElementById("pof-testimonials-dots");
    if (!root || !track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(".pof-testimonial-slide"));
    if (!slides.length) return;

    var prevBtn = root.querySelector(".pof-testimonials__nav--prev");
    var nextBtn = root.querySelector(".pof-testimonials__nav--next");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var AUTOPLAY_MS = 6000;
    var current = slides.findIndex(function (s) { return s.classList.contains("is-active"); });
    if (current < 0) current = 0;
    var timer = null;

    // Build dots
    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      if (i === current) dot.classList.add("is-active");
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function show(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
      current = index;
    }

    function goTo(index) {
      var next = (index + slides.length) % slides.length;
      show(next);
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      if (reduceMotion) return; // manual nav still works, just no autoplay
      stop();
      timer = window.setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    // Pause when the tab/window isn't visible so we don't burn cycles
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    show(current);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
