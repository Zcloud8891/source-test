/* The Source Test — static quiz. No backend, no tracking scripts. */
(function () {
  "use strict";

  var D = window.SOURCE_TEST;
  if (!D) return;

  var TYPE_ORDER = D.TYPE_ORDER;
  var STORAGE_KEY = "source-test-state-v1";
  var views = {
    start: document.getElementById("view-start"),
    quiz: document.getElementById("view-quiz"),
    result: document.getElementById("view-result"),
    reveal: document.getElementById("view-reveal"),
  };

  var state = {
    answers: [],
    index: 0,
    result: null,
    shared: false,
    status: "",
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatCanon(s) {
    return escapeHtml(s)
      .replace(/&lt;em&gt;/g, "<em>")
      .replace(/&lt;\/em&gt;/g, "</em>");
  }

  function caseById(id) {
    for (var i = 0; i < D.CASES.length; i++) {
      if (D.CASES[i].id === id) return D.CASES[i];
    }
    return null;
  }

  function bookHref(type, placement) {
    return D.bookUrl(type || "site", placement);
  }

  /* Cookieless named counters on Abacus. No personal data. Live host only. */
  var COUNTER_HIT = "https://abacus.jasoncameron.dev/hit/source-test/";
  var COUNTER_TYPES = { borrower: true, counter: true, cynic: true, grader: true };

  function bookType() {
    var h = currentHash();
    if (COUNTER_TYPES[h]) return h;
    if (COUNTER_TYPES[state.result]) return state.result;
    return "site";
  }

  function bump(kind, slug) {
    if (location.hostname !== "zcloud8891.github.io") return;
    if (kind !== "complete" && kind !== "click") return;
    if (kind === "complete" && !COUNTER_TYPES[slug]) return;
    if (kind === "click" && !COUNTER_TYPES[slug] && slug !== "site") return;
    var url = COUNTER_HIT + kind + "-" + slug;
    try {
      fetch(url, {
        method: "GET",
        mode: "no-cors",
        keepalive: true,
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "no-referrer",
      });
    } catch (e) {}
  }

  function onBookClick(e) {
    var node = e.target;
    var a = node && node.closest ? node.closest("a") : null;
    if (!a) return;
    var href = a.href || "";
    if (href.indexOf("https://dojostudios.gumroad.com/") !== 0) return;
    bump("click", bookType());
  }

  function save() {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers: state.answers,
          index: state.index,
          result: state.result,
        })
      );
    } catch (e) {}
  }

  function load() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s && Array.isArray(s.answers)) {
        state.answers = s.answers;
        state.index = s.index || 0;
        state.result = s.result || null;
      }
    } catch (e) {}
  }

  function hideAll() {
    views.start.hidden = true;
    views.quiz.hidden = true;
    views.result.hidden = true;
    views.reveal.hidden = true;
  }

  function setHash(h) {
    if (location.hash === "#" + h || (h === "start" && (location.hash === "" || location.hash === "#"))) {
      return;
    }
    history.pushState(null, "", "#" + h);
  }

  function currentHash() {
    return (location.hash || "#start").replace(/^#/, "") || "start";
  }

  function countScores(answers) {
    var scores = { borrower: 0, counter: 0, cynic: 0, grader: 0 };
    for (var i = 0; i < answers.length; i++) {
      if (scores.hasOwnProperty(answers[i])) scores[answers[i]] += 1;
    }
    return scores;
  }

  /* Highest score wins. Ties break toward the more recent answer that
     belongs to a tied type. If that still ties, prefer a failure mode
     over The Grader so the goal type is never a gift. */
  function winnerFrom(answers) {
    var scores = countScores(answers);
    var best = -1;
    var tied = [];
    for (var i = 0; i < TYPE_ORDER.length; i++) {
      var slug = TYPE_ORDER[i];
      var n = scores[slug];
      if (n > best) {
        best = n;
        tied = [slug];
      } else if (n === best) {
        tied.push(slug);
      }
    }
    if (tied.length === 1) return tied[0];
    for (var j = answers.length - 1; j >= 0; j--) {
      if (tied.indexOf(answers[j]) !== -1) return answers[j];
    }
    return tied[0];
  }

  function citeFor(quote) {
    if (typeof quote.chapter === "number") {
      return "Chapter " + quote.chapter + ", " + quote.chapterTitle + ", The Synthetic Era";
    }
    return quote.chapterTitle + ", The Synthetic Era";
  }

  function renderStart() {
    hideAll();
    views.start.hidden = false;
    views.start.innerHTML =
      '<p class="kicker">A twelve-question test</p>' +
      '<h1 class="headline" id="pitch-headline">So the single most personal fact you own, the day you began, is something you never witnessed. You were handed it.</h1>' +
      "<p class=\"lede\">Twelve questions about how you treat a claim you didn’t see yourself. You’ll get a type, a case from the book, and the four questions to grade what comes next.</p>" +
      '<div class="cta-row">' +
      '<button type="button" class="btn btn-gold" data-start>Begin the test</button>' +
      "</div>" +
      '<p class="fine">No account. No tracking. About four minutes. From the book <cite>The Synthetic Era</cite>.</p>' +
      '<aside class="card grade-preview">' +
      "<h2>The question to keep</h2>" +
      "<p>" +
      escapeHtml(D.GRADE_CARD.question) +
      "</p>" +
      '<p class="filter-line">' +
      escapeHtml(D.FILTER) +
      "</p>" +
      "<p>Three paths. No fourth. If it's borrowed, grade it.</p>" +
      '<ul class="criteria">' +
      D.GRADE_CARD.criteria
        .map(function (c) {
          return (
            "<li><strong>" +
            escapeHtml(c.name) +
            ".</strong> " +
            escapeHtml(c.ask) +
            "</li>"
          );
        })
        .join("") +
      "</ul>" +
      '<p class="weigh">' +
      escapeHtml(D.GRADE_CARD.weigh) +
      "</p>" +
      "</aside>" +
      '<section class="paths">' +
      "<h2 class=\"sr-only\">The three paths</h2>" +
      "<p>Deduction. Intuition. Borrowed history. That’s it. Three.</p>" +
      "</section>";

    $("[data-start]", views.start).addEventListener("click", function () {
      state.answers = [];
      state.index = 0;
      state.result = null;
      state.shared = false;
      save();
      setHash("q/1");
      render();
      views.quiz.focus();
    });
  }

  function renderQuiz() {
    var q = D.QUESTIONS[state.index];
    if (!q) return;
    hideAll();
    views.quiz.hidden = false;
    views.quiz.setAttribute("tabindex", "-1");
    var n = state.index + 1;
    var total = D.QUESTIONS.length;
    var pct = Math.round((state.index / total) * 100);
    var chosen = state.answers[state.index];

    var html =
      '<div class="progress-wrap">' +
      '<div class="progress-meta">' +
      "<span>Question " +
      n +
      " of " +
      total +
      "</span>" +
      "<span>" +
      pct +
      "% through</span>" +
      "</div>" +
      '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      pct +
      '" aria-label="Progress"><span style="width:' +
      (n / total) * 100 +
      '%"></span></div>' +
      "</div>" +
      '<h1 class="question-prompt" id="q-prompt">' +
      escapeHtml(q.prompt) +
      "</h1>" +
      '<ul class="answers" role="list">';

    for (var i = 0; i < q.answers.length; i++) {
      var a = q.answers[i];
      var pressed = chosen === a.type ? "true" : "false";
      html +=
        '<li><button type="button" class="answer" data-type="' +
        escapeHtml(a.type) +
        '" aria-pressed="' +
        pressed +
        '" aria-describedby="q-prompt">' +
        escapeHtml(a.text) +
        "</button></li>";
    }
    html +=
      "</ul>" +
      '<div class="quiz-nav">' +
      (state.index > 0
        ? '<button type="button" class="btn btn-ghost" data-back>Back</button>'
        : '<button type="button" class="btn btn-text" data-home>Back to the start</button>') +
      "</div>";
    views.quiz.innerHTML = html;

    views.quiz.querySelectorAll(".answer").forEach(function (btn) {
      btn.addEventListener("click", function () {
        pick(btn.getAttribute("data-type"));
      });
    });
    var back = $("[data-back]", views.quiz);
    if (back) {
      back.addEventListener("click", function () {
        state.index = Math.max(0, state.index - 1);
        save();
        setHash("q/" + (state.index + 1));
        render();
      });
    }
    var home = $("[data-home]", views.quiz);
    if (home) {
      home.addEventListener("click", function () {
        setHash("start");
        render();
      });
    }
  }

  function pick(type) {
    state.answers[state.index] = type;
    state.answers = state.answers.slice(0, state.index + 1);
    if (state.index + 1 >= D.QUESTIONS.length) {
      state.result = winnerFrom(state.answers);
      state.shared = false;
      save();
      bump("complete", state.result);
      setHash(state.result);
      render();
      return;
    }
    state.index += 1;
    save();
    setHash("q/" + (state.index + 1));
    render();
  }

  function resultHtml(slug, shared) {
    var t = D.TYPES[slug];
    var c = caseById(t.caseId);
    var book = bookHref(slug, shared ? "cta-shared-result" : "cta-result");
    var banner = shared
      ? '<div class="shared-banner" role="status">Someone shared this result. This is <strong>' +
        escapeHtml(t.name) +
        "</strong>. Take the test yourself to get yours.</div>"
      : "";
    var skipLabel = slug === "grader" ? "The one to keep sharp" : "The criterion you skip most";
    var waters =
      c.waters
        ? "<blockquote class=\"book-quote\"><p>" +
          escapeHtml(c.waters) +
          "</p><cite>" +
          escapeHtml(c.watersSource.attribution) +
          "</cite></blockquote>"
        : "";

    return (
      banner +
      '<p class="type-kicker">Your type</p>' +
      '<h1 class="type-name">' +
      escapeHtml(t.name) +
      "</h1>" +
      '<p class="type-one">' +
      escapeHtml(t.oneLine) +
      "</p>" +
      '<p class="read">' +
      escapeHtml(t.read) +
      "</p>" +
      '<section class="result-block">' +
      "<h2>" +
      escapeHtml(skipLabel) +
      "</h2>" +
      '<p><span class="skip-name">' +
      escapeHtml(t.skips.name) +
      ".</span> " +
      escapeHtml(t.skips.ask) +
      "</p>" +
      "<p>" +
      escapeHtml(t.skips.note) +
      "</p>" +
      "</section>" +
      '<section class="result-block case-block">' +
      "<h2>Your case</h2>" +
      '<p class="case-grade">' +
      escapeHtml(c.grade) +
      "</p>" +
      "<h3 class=\"sr-only\">" +
      escapeHtml(c.title) +
      "</h3>" +
      "<p><strong>" +
      escapeHtml(c.title) +
      ".</strong> " +
      escapeHtml(c.summary) +
      "</p>" +
      "<blockquote class=\"book-quote\"><p>" +
      escapeHtml(c.verdict) +
      "</p><cite>" +
      escapeHtml(c.verdictSource.chapter) +
      ", The Synthetic Era</cite></blockquote>" +
      "<p>" +
      escapeHtml(c.detail) +
      "</p>" +
      waters +
      "</section>" +
      '<section class="result-block">' +
      "<h2>From the book</h2>" +
      "<blockquote class=\"book-quote\"><p>" +
      escapeHtml(t.quote.text) +
      "</p><cite>" +
      escapeHtml(citeFor(t.quote)) +
      "</cite></blockquote>" +
      "</section>" +
      '<div class="cta-row">' +
      '<a class="btn btn-gold" data-cta="result" href="' +
      escapeHtml(book) +
      '">Chapter ' +
      t.ctaChapter +
      " of The Synthetic Era is about exactly this</a>" +
      "</div>" +
      '<p class="fine">Pay what you want, $12 suggested, $5 minimum, on Gumroad.</p>' +
      '<div class="share-row">' +
      '<button type="button" class="btn btn-ghost" data-share-link>Copy result link</button>' +
      '<button type="button" class="btn btn-ghost" data-share-native>Share</button>' +
      '<a class="btn btn-ghost" href="assets/share-' +
      slug +
      '.png" download="source-test-' +
      slug +
      '.png">Save share card</a>' +
      '<button type="button" class="btn btn-text" data-reveal>See the five fakes, graded</button>' +
      (shared
        ? '<button type="button" class="btn btn-text" data-start-from-share>Take the test</button>'
        : '<button type="button" class="btn btn-text" data-restart>Retake</button>') +
      "</div>" +
      '<p class="share-status" role="status" aria-live="polite">' +
      escapeHtml(state.status) +
      "</p>"
    );
  }

  function bindResult(root, slug, shared) {
    var shareUrl = absoluteShareUrl(slug);

    var copyBtn = $("[data-share-link]", root);
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyText(shareUrl, "Link copied. It opens on this result.");
      });
    }

    var nativeBtn = $("[data-share-native]", root);
    if (nativeBtn) {
      if (!navigator.share) {
        nativeBtn.hidden = true;
      } else {
        nativeBtn.addEventListener("click", function () {
          shareNative(slug, shareUrl);
        });
      }
    }

    var revealBtn = $("[data-reveal]", root);
    if (revealBtn) {
      revealBtn.addEventListener("click", function () {
        setHash("reveal");
        render();
      });
    }

    var restart = $("[data-restart]", root) || $("[data-start-from-share]", root);
    if (restart) {
      restart.addEventListener("click", function () {
        state.answers = [];
        state.index = 0;
        state.result = null;
        state.shared = false;
        state.status = "";
        save();
        setHash("q/1");
        render();
      });
    }
  }

  function absoluteShareUrl(slug) {
    return location.origin + location.pathname + location.search + "#" + slug;
  }

  function copyText(text, okMsg) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setStatus(okMsg);
      } catch (e) {
        setStatus("Copy this link: " + text);
      }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          setStatus(okMsg);
        },
        fallback
      );
    } else {
      fallback();
    }
  }

  function setStatus(msg) {
    state.status = msg;
    var el = $(".share-status");
    if (el) el.textContent = msg;
  }

  function shareNative(slug, url) {
    var t = D.TYPES[slug];
    var data = {
      title: "The Source Test: " + t.name,
      text: t.name + " — " + t.oneLine,
      url: url,
    };
    var cardUrl = new URL("assets/share-" + slug + ".png", location.href).href;
    var go = function (payload) {
      navigator.share(payload).catch(function () {});
    };
    if (navigator.canShare && window.fetch) {
      fetch(cardUrl)
        .then(function (r) {
          return r.blob();
        })
        .then(function (blob) {
          var file = new File([blob], "source-test-" + slug + ".png", { type: "image/png" });
          var withFile = { title: data.title, text: data.text, url: url, files: [file] };
          if (navigator.canShare(withFile)) go(withFile);
          else go(data);
        })
        .catch(function () {
          go(data);
        });
    } else {
      go(data);
    }
  }

  function renderResult(slug, shared) {
    if (!D.TYPES[slug]) {
      setHash("start");
      renderStart();
      return;
    }
    hideAll();
    views.result.hidden = false;
    state.status = state.status || "";
    views.result.innerHTML = resultHtml(slug, shared);
    bindResult(views.result, slug, shared);
  }

  function renderReveal() {
    hideAll();
    views.reveal.hidden = false;
    var type = state.result || "site";
    var book = bookHref(type, "cta-reveal");
    var cards = D.CASES.map(function (c) {
      var waters = c.waters
        ? "<blockquote class=\"book-quote\"><p>" +
          escapeHtml(c.waters) +
          "</p><cite>" +
          escapeHtml(c.watersSource.attribution) +
          "</cite></blockquote>"
        : "";
      return (
        '<article class="case-card" id="case-' +
        escapeHtml(c.id) +
        '">' +
        '<p class="case-grade">' +
        escapeHtml(c.grade) +
        "</p>" +
        "<h3>" +
        escapeHtml(c.title) +
        "</h3>" +
        '<p class="case-ch">Chapter ' +
        c.chapter +
        ", " +
        escapeHtml(c.chapterTitle) +
        "</p>" +
        "<p>" +
        escapeHtml(c.summary) +
        "</p>" +
        "<blockquote class=\"book-quote\"><p>" +
        escapeHtml(c.verdict) +
        "</p><cite>" +
        escapeHtml(c.verdictSource.chapter) +
        ", The Synthetic Era</cite></blockquote>" +
        "<p>" +
        escapeHtml(c.detail) +
        "</p>" +
        waters +
        "</article>"
      );
    }).join("");

    var phone = D.PHONE_CASE;
    views.reveal.innerHTML =
      '<p class="kicker">The reveal</p>' +
      '<h1 class="headline" style="font-size:clamp(1.6rem,6vw,2.1rem)">The five fakes, graded</h1>' +
      "<p class=\"lede\">Chain, witnesses, original, fit. These are the book’s five real fakes. Grade each one yourself, then read the answer.</p>" +
      '<div class="reveal-list">' +
      cards +
      '<article class="case-card" id="case-phone">' +
      '<p class="case-grade">Closer to home</p>' +
      "<h3>" +
      escapeHtml(phone.title) +
      "</h3>" +
      '<p class="case-ch">' +
      escapeHtml(phone.label) +
      "</p>" +
      "<p>" +
      escapeHtml(phone.summary) +
      "</p>" +
      "<blockquote class=\"book-quote\"><p>" +
      escapeHtml(phone.verdict) +
      "</p><cite>" +
      escapeHtml(phone.verdictSource.chapter) +
      ", The Synthetic Era</cite></blockquote>" +
      "<p><strong>" +
      escapeHtml(phone.grade) +
      "</strong> " +
      formatCanon(phone.detail) +
      "</p>" +
      "</article>" +
      "</div>" +
      '<aside class="card grade-preview">' +
      "<h2>The Grade Card</h2>" +
      "<p>" +
      escapeHtml(D.GRADE_CARD.keep) +
      "</p>" +
      "<p><strong>" +
      escapeHtml(D.GRADE_CARD.question) +
      "</strong></p>" +
      '<p class="filter-line">' +
      escapeHtml(D.FILTER) +
      "</p>" +
      "<p>" +
      escapeHtml(D.GRADE_CARD.ifBorrowed) +
      "</p>" +
      '<ul class="criteria">' +
      D.GRADE_CARD.criteria
        .map(function (c) {
          return (
            "<li><strong>" +
            escapeHtml(c.name) +
            ".</strong> " +
            escapeHtml(c.ask) +
            "</li>"
          );
        })
        .join("") +
      "</ul>" +
      '<p class="weigh">' +
      escapeHtml(D.GRADE_CARD.weigh) +
      "</p>" +
      '<p class="fine" style="margin:1rem 0 0"><a href="grade-card.html">Print the Grade Card</a> · <a href="pdf/grade-card.pdf">Download the PDF</a></p>' +
      "</aside>" +
      '<div class="cta-row">' +
      '<a class="btn btn-gold" data-cta="reveal" href="' +
      escapeHtml(book) +
      '">Read The Synthetic Era</a>' +
      (state.result
        ? '<button type="button" class="btn btn-ghost" data-back-result>Back to your type</button>'
        : '<button type="button" class="btn btn-ghost" data-start>Take the test</button>') +
      "</div>" +
      '<p class="fine">Pay what you want, $12 suggested, $5 minimum, on Gumroad.</p>';

    var back = $("[data-back-result]", views.reveal);
    if (back) {
      back.addEventListener("click", function () {
        setHash(state.result);
        render();
      });
    }
    var start = $("[data-start]", views.reveal);
    if (start) {
      start.addEventListener("click", function () {
        state.answers = [];
        state.index = 0;
        state.result = null;
        state.shared = false;
        save();
        setHash("q/1");
        render();
      });
    }
  }

  function route() {
    var h = currentHash();
    if (h === "start" || h === "") {
      state.shared = false;
      renderStart();
      return;
    }
    if (h === "reveal") {
      renderReveal();
      return;
    }
    var qMatch = /^q\/(\d+)$/.exec(h);
    if (qMatch) {
      var n = parseInt(qMatch[1], 10);
      if (n >= 1 && n <= D.QUESTIONS.length) {
        /* Only allow walking as far as one past the last answered question. */
        var max = Math.min(D.QUESTIONS.length, (state.answers.length || 0) + 1);
        if (n > max) {
          setHash("q/" + max);
          state.index = max - 1;
          renderQuiz();
          return;
        }
        state.index = n - 1;
        state.shared = false;
        renderQuiz();
        return;
      }
    }
    if (D.TYPES[h]) {
      var earned = state.result === h && state.answers.length === D.QUESTIONS.length;
      state.shared = !earned;
      renderResult(h, state.shared);
      return;
    }
    setHash("start");
    renderStart();
  }

  function render() {
    route();
    var footer = document.getElementById("footer-book");
    if (footer) {
      var slug = D.TYPES[currentHash()]
        ? currentHash()
        : state.result || "site";
      footer.href = bookHref(slug, "cta-footer");
    }
  }

  document.addEventListener("click", onBookClick, true);
  document.addEventListener(
    "auxclick",
    function (e) {
      if (e.button === 1) onBookClick(e);
    },
    true
  );

  document.addEventListener("click", function (e) {
    var restart = e.target.closest("[data-restart]");
    if (restart && !views.result.contains(restart) && !views.reveal.contains(restart)) {
      e.preventDefault();
      state.answers = [];
      state.index = 0;
      state.result = null;
      state.shared = false;
      state.status = "";
      save();
      setHash("start");
      render();
    }
  });

  window.addEventListener("hashchange", function () {
    render();
  });

  document.getElementById("footer-book").href = bookHref("site", "cta-footer");

  load();
  render();
})();
