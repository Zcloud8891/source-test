#!/usr/bin/env bash
# Read The Source Test counters from Abacus. GET /get/ does not increment.
# Usage: ./tools/counts.sh
set -euo pipefail
BASE="https://abacus.jasoncameron.dev/get/source-test"
KEYS=(
  complete-borrower
  complete-counter
  complete-cynic
  complete-grader
  click-borrower
  click-counter
  click-cynic
  click-grader
  click-site
)
for key in "${KEYS[@]}"; do
  printf "%-20s " "$key"
  curl -sS -m 15 "${BASE}/${key}"
  printf "\n"
done
