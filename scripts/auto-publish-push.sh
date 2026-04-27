#!/bin/bash
# auto-publish-push.sh — runs on the host (NOT inside any sandbox) to commit and push
# whatever the seo-specialist agent has produced into /Users/harold/Desktop/traffic.
#
# Installed via ~/Library/LaunchAgents/com.harold.traffic-seo-push.plist.
# See scripts/auto-publish-push.README.md for setup.

set -euo pipefail

REPO="/Users/harold/Desktop/traffic"
LOG="$REPO/scripts/auto-publish-push.log"

cd "$REPO"

# Clear any stale index lock left by a sandboxed agent process.
[ -f .git/index.lock ] && rm -f .git/index.lock

# If there's nothing to commit, exit quietly.
if git diff --quiet && git diff --cached --quiet; then
  echo "[$(date -u +%FT%TZ)] no changes — skipping" >> "$LOG"
  exit 0
fi

# What changed today? Use this to write a meaningful commit message.
NEW_ARTICLES=$(git status --porcelain src/data/articles/ | awk '$1 ~ /^(A|\?\?)$/ {sub("src/data/articles/",""); sub("\\.ts$",""); print $2}' | tr '\n' ' ')
COUNT=$(echo "$NEW_ARTICLES" | wc -w | tr -d ' ')

if [ "$COUNT" -gt 0 ]; then
  SUBJECT="seo: daily auto-publish — $COUNT new article(s) ($(date +%F))"
  BODY="Articles: $NEW_ARTICLES"
else
  SUBJECT="seo: daily auto-update ($(date +%F))"
  BODY="Sitemap/RSS/log refresh."
fi

git add -A
git commit -m "$SUBJECT" -m "$BODY" >> "$LOG" 2>&1
git push origin main >> "$LOG" 2>&1

echo "[$(date -u +%FT%TZ)] pushed: $SUBJECT" >> "$LOG"
