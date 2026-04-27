# Auto-publish push (host-side)

The `seo-specialist` agent runs daily at 9:00 AM in a sandboxed VM and writes new
articles into this repo. The sandbox is FUSE-mounted from your Mac and **blocks
file deletion** — which means the agent itself cannot run `git` (every git
operation needs to remove a `.git/index.lock` file when it's done).

This script + launchd job lives on the host (your Mac) where deletion works
normally, and pushes the agent's output to GitHub each morning.

## One-time setup

```bash
# 1. Make the script executable
chmod +x /Users/harold/Desktop/traffic/scripts/auto-publish-push.sh

# 2. Install the launch agent
cp /Users/harold/Desktop/traffic/scripts/com.harold.traffic-seo-push.plist \
   ~/Library/LaunchAgents/

# 3. Load it
launchctl load ~/Library/LaunchAgents/com.harold.traffic-seo-push.plist

# 4. Verify it's registered
launchctl list | grep traffic-seo-push
```

## Schedule

- 9:00 AM local — sandboxed agent writes 5 articles + updates registry, sitemap, RSS, publish log.
- 9:30 AM local — this launchd job runs `git add . && git commit && git push origin main`.
- Vercel/Netlify auto-deploys on push.

## Stale lock

If `.git/index.lock` is present on disk from a sandboxed run, the script removes it
before doing anything else. That's fine — the lock is empty and stale by the time
this script runs.

## Manual run / debugging

```bash
# Run the push immediately
launchctl start com.harold.traffic-seo-push

# View recent runs
tail -50 /Users/harold/Desktop/traffic/scripts/auto-publish-push.log
```

## Disable or remove

```bash
launchctl unload ~/Library/LaunchAgents/com.harold.traffic-seo-push.plist
rm ~/Library/LaunchAgents/com.harold.traffic-seo-push.plist
```
