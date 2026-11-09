(function () {
  "use strict";

  var fv = document.getElementById("fv");
  var video = fv.querySelector(".fv__video");

  // 動画再生開始から何ミリ秒後にコピーを出すか
  var COPY_DELAY = 2500;

  // 1) キャッチコピーを1文字ずつに分解
  var idx = 0;
  document.querySelectorAll("[data-split]").forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    Array.from(text).forEach(function (ch) {
      var s = document.createElement("span");
      s.className = "fv__char";
      s.style.setProperty("--i", idx++);
      s.textContent = ch;
      el.appendChild(s);
    });
  });

  // 2) 動画再生 → 数秒後にコピー登場
  var fired = false;
  function showCopy() {
    if (fired) return;
    fired = true;
    fv.classList.add("is-active");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showCopy();
    return;
  }

  video.addEventListener("playing", function () {
    setTimeout(showCopy, COPY_DELAY);
  }, { once: true });

  // 自動再生がブロックされた場合もポスター画像のままコピーを表示
  var p = video.play();
  if (p && p.catch) p.catch(function () { setTimeout(showCopy, 800); });

  // 保険:何があっても5秒後には表示
  setTimeout(showCopy, 5000);
})();
