# PainBridge — Mobile App Strategy

**Document type:** Standalone strategic/technical document
**Intended uses:** Team planning, store-submission decision, pilot deployment
**Status:** v1 (July 2026). PWA implemented; store path documented, deferred.

---

## 1. The decision

PainBridge ships on phones **as an installable Progressive Web App (PWA)
now**, and defers native app-store distribution until there is a funded
pilot and a regulatory review. This is a deliberate strategy, not a
shortcut.

**Why PWA first:**

1. **One codebase, both platforms.** The `docs/` site installs on iPhone
   (Safari → Share → Add to Home Screen) and Android (Chrome → Install
   app) with its own icon, full-screen standalone display, and offline
   support. No duplicate Swift/Kotlin builds.
2. **No store gatekeeping for a research prototype.** Apple and Google
   apply extra review to health-adjacent apps. Submitting a pre-validation
   research prototype invites scrutiny (and rejection risk) with no
   offsetting benefit — pilot participants can install the PWA from a URL
   the coordinator hands them.
3. **Instant updates.** Pilot-phase copy and safety-wording changes deploy
   on push; no review cycle between IRB-prompted wording fixes and users.
4. **Regulatory conservatism.** App-store listing is a marketing claim
   surface. The risk register (#1, #2) says minimize claim surfaces until
   counsel reviews positioning. A URL shared with consented pilot
   participants is the smallest possible surface.
5. **The 90-day plan says responsive web only.** The PWA is the responsive
   web MVP plus an install layer — no scope added.

## 2. What was implemented (in `docs/`)

| Piece | File | Notes |
|---|---|---|
| Web app manifest | `manifest.webmanifest` | name, standalone display, theme color, portrait, start URL, app shortcut to the demo |
| Icons | `icons/icon.svg`, `icon-512.png`, `icon-192.png`, `icon-180.png` | bridge mark; 180px is the iOS apple-touch-icon; 512 doubles as maskable |
| Service worker | `sw.js` | offline-first app-shell caching (cache-first + background refresh); **never caches or transmits user-entered data** — demo state lives only in page memory |
| Install wiring | all three HTML pages | manifest link, theme-color, apple-touch meta tags, SW registration (skipped on `file://`) |

**Requirements for install prompts:** the site must be served over HTTPS
(GitHub Pages qualifies) — service workers and install do not activate from
`file://`.

**Install instructions to give users:**
- **iPhone/iPad:** open the site in Safari → Share button → *Add to Home
  Screen* → Add.
- **Android:** open the site in Chrome → the *Install app* prompt, or menu
  ⋮ → *Add to Home screen*.

## 3. The store path (when it's time)

**Recommended wrapper: Capacitor** (capacitorjs.com). It wraps the existing
`docs/` web code in native Android/iOS shells with no rewrite:

```
npm init @capacitor/app painbridge && cd painbridge
# point webDir at the docs/ build in capacitor.config.ts
npx cap add android && npx cap add ios
npx cap sync
npx cap open android   # builds in Android Studio → Play Console
npx cap open ios       # builds in Xcode → App Store Connect
```

**Prerequisites you must own (cannot be done from this repo):**
- Apple Developer Program account ($99/yr) + macOS with Xcode for the iOS
  build and signing.
- Google Play Console account ($25 one-time) + signing key.

**Store-review considerations specific to PainBridge:**
- **Health app policies.** Both stores require medical disclaimers and may
  ask for evidence backing health claims. The non-diagnostic positioning
  and the "research prototype, not a medical device" language must appear
  in store listings verbatim.
- **Apple guideline 5.1.3 (health data):** no health data used for
  advertising; if the app ever stores user data, privacy policy + consent
  flows must be listed.
- **Data safety forms (Play) / privacy nutrition labels (App Store):**
  straightforward while the app stores nothing server-side; must be redone
  when accounts/persistence arrive.
- **Trigger for store submission:** a funded pilot needing broader
  recruitment, a clinic partner requiring MDM-managed app distribution, or
  commercialization needing store presence for credibility. Until one of
  those exists, the PWA is strictly better.

## 4. What NOT to do

- Do not build separate native codebases (Swift + Kotlin) — doubles cost,
  triples drift, adds nothing at this stage.
- Do not submit to stores before clinician review of red-flag copy and
  counsel review of claims (risk register #1–#3, #12).
- Do not add push notifications, background tracking, or health-kit
  integrations to make it feel "more native" — each adds a regulatory and
  privacy surface the strategy explicitly defers.
