# Source Test counts

Completions and book-link clicks are counted with [Abacus](https://abacus.jasoncameron.dev), a free, keyless, public hit-counter API. No signup, no card, no cookies, and no personal data — the live site only increments a named counter.

Namespace: `source-test`

## Read URLs (GET; these do not increment)

- https://abacus.jasoncameron.dev/get/source-test/complete-borrower
- https://abacus.jasoncameron.dev/get/source-test/complete-counter
- https://abacus.jasoncameron.dev/get/source-test/complete-cynic
- https://abacus.jasoncameron.dev/get/source-test/complete-grader
- https://abacus.jasoncameron.dev/get/source-test/click-borrower
- https://abacus.jasoncameron.dev/get/source-test/click-counter
- https://abacus.jasoncameron.dev/get/source-test/click-cynic
- https://abacus.jasoncameron.dev/get/source-test/click-grader
- https://abacus.jasoncameron.dev/get/source-test/click-site

`click-site` is for book-link clicks when no result type is known (for example, the landing-page footer).

Or run `./tools/counts.sh`.

Do not use the `/hit/` URLs to read counts; those increment by one. Do not seed fake values. A key that has never been incremented returns `{"error":"Key not found"}`.

The live site increments only on `zcloud8891.github.io`, so local QA does not change these numbers.
