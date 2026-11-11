# The Source Test

A free, static, twelve-question quiz that sends people to Jeremy Alvarado’s book *The Synthetic Era* (Gumroad, pay what you want, $12 suggested, $5 minimum: https://dojostudios.gumroad.com/l/lxlyos).

Live at https://zcloud8891.github.io/source-test/ (GitHub Pages, served from the `main` branch).

## Run it locally

```bash
cd /workspace/source-test
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/ — or any other port you prefer. No build step. No backend.

Rebuild share cards, icons, and the Grade Card PDF (optional):

```bash
python3 scripts/build_assets.py
```

Verify every question, result, hash, and Gumroad link:

```bash
python3 scripts/verify.py
```

## Four types

- **The Borrower** — You take what's handed over, and treat the handoff as the check.
- **The Counter** — You mistake views, shares, and repeated outlets for witnesses.
- **The Cynic** — You treat “trust nothing” as a defense, and get fooled by different people.
- **The Grader** — You weigh what you're handed, and you let a strong grade stand.

Results are shareable at `#borrower`, `#counter`, `#cynic`, and `#grader`. A hash opened without having just finished the quiz is treated as a shared result, with an invitation to take the test. `#reveal` grades the five fakes. `#start` is the landing page. `#q/1` through `#q/12` are the questions.

## Files

- `index.html`, `css/styles.css`, `js/data.js`, `js/quiz.js` — the site
- `grade-card.html` — print-friendly Grade Card and Clean Link Checklist, canon text only
- `pdf/grade-card.pdf` — two-page printable, same canon text, ready if you want to list it later at $3
- `assets/share-borrower.png`, `share-counter.png`, `share-cynic.png`, `share-grader.png` — 1080×1350 share cards, type set in PIL from bundled fonts (no image-model text)
- `assets/og.png`, `favicon.svg`, `favicon.png`, `apple-touch-icon.png`
- `fonts/` — self-hosted Libre Baskerville and Source Sans 3 (SIL OFL), subset to Latin
- `SWAP.md` — competitor swap test on the landing headline
- `QUOTES.md` — every book quotation, with chapter and file, for a canon check
- `scripts/build_assets.py`, `scripts/verify.py`
- `COUNTS.md`, `tools/counts.sh` — Abacus read URLs and a short dump script

## Analytics (no signup, no card)

Completions and book-link clicks are counted with [Abacus](https://abacus.jasoncameron.dev), a free, keyless, public hit-counter API. The page sends no personal data: it only increments named counters, with no cookies, and only on the live GitHub Pages host. The increment uses `fetch` with `keepalive` so it never blocks the result reveal or the Gumroad navigation.

Read the counts (these URLs do not increment), or run `./tools/counts.sh`. See `COUNTS.md` for the full list.

- https://abacus.jasoncameron.dev/get/source-test/complete-borrower
- https://abacus.jasoncameron.dev/get/source-test/complete-counter
- https://abacus.jasoncameron.dev/get/source-test/complete-cynic
- https://abacus.jasoncameron.dev/get/source-test/complete-grader
- https://abacus.jasoncameron.dev/get/source-test/click-borrower
- https://abacus.jasoncameron.dev/get/source-test/click-counter
- https://abacus.jasoncameron.dev/get/source-test/click-cynic
- https://abacus.jasoncameron.dev/get/source-test/click-grader
- https://abacus.jasoncameron.dev/get/source-test/click-site

CTA clicks can also be read later from Gumroad, because every book link is tagged, including the footer and noscript links in the HTML (so they stay tagged even when JavaScript does not run):

- `utm_source=source-test`
- `utm_medium=quiz`
- `utm_campaign=the-source-test`
- `utm_content` = the type slug (`borrower`, `counter`, `cynic`, `grader`) or `site`
- `utm_term` = the placement (`cta-result`, `cta-shared-result`, `cta-reveal`, `cta-footer`, `cta-noscript`)

There are no tracking scripts, no cookies, no analytics pixels, and no third-party font or script tags on the page. The only third-party request is the cookieless Abacus increment, fired from JavaScript with no cookies and no personal data.

## GitHub Pages

This folder is published as a GitHub Pages site at https://zcloud8891.github.io/source-test/ (`index.html` at the root, from the `main` branch). Do not add a third-party analytics tag without a separate yes. If you list the Grade Card as a $3 Gumroad product, take `pdf/grade-card.pdf` off the public site (and unlink it from the reveal and from `grade-card.html`) so the paid file is not also free.

Canon for quoted lines is the locked v4 manuscript. If anything in `synthetic-era-play` disagrees, v4 wins.
