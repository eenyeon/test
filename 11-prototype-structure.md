# PainBridge — Killer Demo Prototype Structure

**Document type:** Prototype specification (companion to `04-killer-demo-script.md`)
**Intended uses:** Prototype development, design handoff, demo rehearsal
**Status:** v1 (July 2026). Implemented as a static prototype in `prototype/`.

---

## 1. Information Architecture

This is **not a website IA**. It is a single linear instrument with one
artifact at the end. There is no navigation tree to explore — by design.

```
PainBridge Demo Prototype
│
├── S0  Landing / Contract ............ language select · consent · non-diagnostic contract
├── S1  Pain Story Intake ............. onset · course · aggravators/easers · priority quote
├── S2  Body Map ...................... 19-region WPI map · intensity · quality chips · radiation trace
├── S3  Language & Metaphor ........... idiom capture · clarification dialog · composed gloss
├── S4  Red-Flag Safety Screen ........ 8 deterministic items · branch logic · conservative result copy
├── S5  Mechanism Signal Profile ...... 3 signal cards · transparent scores · "how this works" drawers
├── S6  Diagnostic Questions .......... generated question list · patient selection · specialist toggle
├── S7  Phenotype Report .............. one-page clinician view · patient sheet · print
└── S8  Mechanism-Matched Pathway ..... two-track options-to-discuss · guardrails · next step
│
└── Persistent chrome
    ├── Progress rail (9 steps)
    ├── "Not a diagnosis — a preparation tool" badge (every screen)
    └── Presenter note strip (demo-only annotations, toggleable)
```

Data layer (in-memory for the prototype, one `state` object):
`story` · `bodymap` · `metaphor` · `redflags` · `descriptors` · `sss` ·
`stiffness/swelling` · `peg` · `treatments` · `questions` → all consumed by
the report renderer (S7) and pathway renderer (S8). This mirrors the
production rule: *inputs feed the report; views render the report; pathways
consume the report.*

## 2. User Flow

```
Start
 └─ S0 select language → consent tiers → [Load sample persona: Yoon Soon-ja] or blank start
     └─ S1 story fields → priority quote captured verbatim
         └─ S2 tap regions (cycle none→mild→severe) → toggle radiation → quality chips
             └─ S3 type idiom → 4 clarifying questions (chips) → gloss composed → patient edits/confirms
                 └─ S4 red-flag items one-by-one
                     ├─ any TRUE flag → urgent-care banner → flow pauses for that item
                     └─ all clear → conservative "no urgent flags in what you entered" copy
                         └─ S5 scores computed deterministically → 3 signal cards render
                             └─ S6 questions generated from signals → patient selects → specialist toggle preview
                                 └─ S7 report renders from state → print/download
                                     └─ S8 pathway cards keyed to active signals → end
```

Demo mode: the **Load sample persona** button (S0) pre-fills every screen
with the Yoon Soon-ja scenario so a presenter can step through in ~6 minutes
while every screen still accepts live edits.

Production-order note (shown in the presenter strip at S4): in the real
product the red-flag screen runs **first**, before all other modules
(`09-regulatory-ethical-risk-register.md`, rule 1). The demo places it at
position 5 for narrative flow only.

## 3. Component List

| Component | Used on | States / props | Notes |
|---|---|---|---|
| `ProgressRail` | all | current step, completed steps | 9 dots + labels |
| `NonDxBadge` | all | — | persistent footer badge |
| `PresenterStrip` | all | note text, on/off toggle | demo-only narrator cues |
| `LangSelect` | S0 | selected language | 한국어 primary in demo |
| `ConsentTiers` | S0 | 4 checkboxes (tiered) | tier stored with session |
| `PersonaLoader` | S0 | — | fills full state |
| `QuestionCard` | S1, S4 | label, input type, value | one-question-per-card pattern |
| `ChipGroup` | S1, S2, S3 | options, multi/single | aggravators, quality, clarifiers |
| `PriorityQuote` | S1, S7 | text (verbatim) | never paraphrased; reappears on report |
| `BodyMapSVG` | S2, S7 | region→intensity map, radiation on/off | 19 WPI regions across front+back figures; tap cycles intensity |
| `RegionLedger` | S2 | marked-region list | review/edit; shows live count |
| `IdiomPane` | S3 | original phrase (pinned) | original script never disappears |
| `ClarifierDialog` | S3 | Q/A chips, step | the anti-stereotyping pattern |
| `GlossComposer` | S3 | composed text, editable | "your original words stay on the report" |
| `RedFlagItem` | S4 | question, yes/no, branch | one per screen; distinct clinical styling |
| `UrgentBanner` | S4 | matched flag | tiered urgency copy |
| `SignalCard` | S5, S7 | name, evidence quotes, score, discuss-line, drawer | color-coded left border; can render "low signal" |
| `ScoreDrawer` | S5 | instrument items + scoring | transparency device |
| `QuestionPicker` | S6 | generated list, selections, "why this question" trace | checkbox list |
| `SpecialistToggle` | S6 | primary-care / rheumatology | proves report-as-view concept |
| `ReportPage` | S7 | full state | strict one-page grid; print CSS |
| `PatientSheet` | S7 | plain-language variant | bilingual, questions enlarged |
| `PathwayCard` | S8 | signal key, options, guardrails | "often not helpful" block styled calm |
| `NextStepBanner` | S8 | — | download / print / share |

## 4. Design System

**Voice and tone rules (enforced in copy):** plain language ≤6th-grade;
never a diagnostic noun aimed at the patient ("you may have…") — always
"pattern worth discussing"; safety copy is conservative and never gates
care-seeking; the patient's verbatim words are visually sacred (quote
styling, never edited).

**Tokens:**

| Token | Value | Use |
|---|---|---|
| `--paper` | `#faf9f7` | app background |
| `--surface` | `#ffffff` | cards |
| `--ink` | `#1c2733` | primary text |
| `--ink-soft` | `#5a6775` | secondary text |
| `--bridge` | `#0e6b68` | primary actions, progress (the "bridge" teal) |
| `--bridge-soft` | `#e3f0ef` | selected chips, highlights |
| `--pain-mild` | `#f2c079` | body-map mild intensity |
| `--pain-severe` | `#d4552e` | body-map severe intensity |
| `--urgent` | `#b3261e` | red-flag styling only (reserved) |
| `--sig-neuro` | `#6a5acd` | neuropathic signal accent |
| `--sig-wide` | `#c2703d` | widespread signal accent |
| `--sig-inflam` | `#8a939c` | inflammatory (low) accent |
| Radius | `12px` cards, `999px` chips | |
| Type scale | 13 / 15 / 17.5 / 22 / 30 px, system sans stack | report uses a compact 12–13px grid |
| Spacing | 4-pt grid (8/12/16/24/40) | |

**Component styling rules:** cards with 1px hairline borders (no heavy
shadows); the red-flag screen visually distinct (high-contrast, no
illustration, urgent color reserved to it and to real flags); the report
styled as a *document*, not a web page (serif-free, dense grid, print CSS
first-class); Korean text always rendered with its English gloss in
clinician-facing surfaces, original script first in patient-facing surfaces.

## 5. Sample Data

Persona: **Yoon Soon-ja, 58** (full narrative: `04-killer-demo-script.md` §1).
Canonical values (must reproduce the demo-script numbers exactly):

```json
{
  "language": "ko",
  "story": {
    "onset": "4년 전 호텔 일 하다가 허리를 다쳤어요",
    "onset_gloss": "Hurt my back lifting at hotel work, 4 years ago",
    "course": "허리는 계속 아프고, 2년 전부터 다리가 타는 것처럼 아파요",
    "course_gloss": "Back pain constant; for ~2 years the right leg burns",
    "worse": ["sitting long", "end of work shift"],
    "better": ["lying down", "hot baths"],
    "priority": "게으른 게 아니고 꾀병도 아니라는 걸 알아주셨으면 해요",
    "priority_gloss": "I want them to know I am not lazy and I am not making this up."
  },
  "bodymap": {
    "severe": ["lowerBack", "hipR", "upperLegR", "lowerLegR"],
    "mild": ["upperBack", "neck", "shoulderL", "shoulderR", "upperArmL",
             "upperArmR", "hipL", "upperLegL", "lowerLegL", "jawR"],
    "wpi": 14, "radiation": true,
    "qualities": {"leg": "burning", "global": "deep ache", "foot": "electric (sometimes)"}
  },
  "metaphor": {
    "phrase": "삭신이 쑤시다",
    "clarifiers": {"depth": "deep in bones/muscles", "pattern": "always there, worse evenings",
                   "timing": "worse after work; morning stiffness ~15 min", "lightTouch": true}
  },
  "redflags": {"all": false, "nightPainBranch": "positional — does not flag"},
  "scores": {"neuroDescriptors": "6/9", "WPI": "14/19", "SSS": "9/12",
             "fmScreen": "meets screening threshold", "inflammatory": "low",
             "PEG": [7, 6, 8]},
  "treatments": [
    {"tried": "ibuprofen", "result": "minimal effect"},
    {"tried": "hot baths", "result": "temporary relief"},
    {"tried": "physical therapy", "result": "never tried"}
  ]
}
```

## 6. Screen Copy (key strings)

Full copy lives in `prototype/app.js` (`COPY` object); the load-bearing strings:

- **S0 headline:** "Prepare for your visit. In your own words." / "당신의 언어로, 진료를 준비하세요."
- **S0 contract:** "PainBridge does not diagnose and does not replace medical care."
- **Persistent badge:** "Not a diagnosis — a preparation tool"
- **S2 prompt:** "Tap every area that hurts — not just the worst one. Many people have more than one pain area."
- **S3 prompt:** "Describe the whole-body ache in your own words — any language." / gloss rule: "Your original words stay on the report."
- **S4 result (clear):** "**No urgent warning signs were found in what you entered.** This is not a guarantee that nothing serious is happening… If you develop new trouble controlling bladder or bowels, numbness in the groin area, or new leg weakness, seek emergency care immediately."
- **S5 header:** "Patterns worth discussing with your clinician. These are signals from validated questionnaires — **not diagnoses**."
- **S6 header:** "Questions you might ask at your visit. They'll print in Korean and English."
- **S8 guardrail header:** "Often *not* helpful for patterns like yours (worth asking about before pursuing)."

## 7. Interactive Prototype Plan

**Tech choice:** clean static **HTML + CSS + vanilla JS**, no build step.
Rationale: the repo has no existing code structure; the demo must run from a
double-clicked file on any laptop in a review room; React adds tooling
without adding demo value at this size. (If the MVP proceeds, port to a
framework then.)

**Files:**

```
docs/demo/        (served as part of the website in docs/)
├── index.html    # all 9 screens as sections + SVG body maps
├── styles.css    # design tokens + components + print CSS
└── app.js        # COPY strings · PERSONA data · state · scoring · renderers
```

**Behavioral requirements implemented:**
- Step navigation with progress rail; every screen live-editable.
- Persona loader (demo mode) reproducing the canonical numbers in §5.
- Deterministic scoring only: descriptor count (n/9), WPI region count
  (n/19), SSS composite (n/12), FM screening rule (WPI≥7 ∧ SSS≥5, or
  WPI 4–6 ∧ SSS≥9), inflammatory low-signal rule (stiffness <30 min ∧ no
  swelling). **No ML, no free generation** — all "AI output" strings are
  template-composed from state, mirroring the production safety
  architecture (`09-regulatory-ethical-risk-register.md` #7).
- Red-flag branch logic; any positive flag renders the urgent banner.
- Question generation conditioned on active signals; selection tracked.
- One-page report rendered from state; `window.print()` with print CSS.
- Presenter strip with the six "what makes this novel" beats.

**Out of scope for the prototype (deliberately):** persistence, accounts,
backend, live translation, real instrument licensing (screens are labeled
"prototype descriptor screen, modeled on validated instruments"), analytics.

**Verification checklist:** loads from `file://`; persona path reproduces
WPI 14/19, SSS 9/12, descriptors 6/9, PEG 7/6/8 on the report; a positive
red-flag answer produces the urgent banner; print view fits one page.

## 8. Final Report Mockup

```
┌──────────────────────────────────────────────────────────────────────────┐
│ PAIN PHENOTYPE REPORT      Patient-reported information summary —        │
│ PainBridge prototype v0.9  not a diagnosis                               │
│ Yoon, Soon-ja · 58F · Korean-speaking (daughter interprets)              │
│ Completed 2026-07-06 · 22 min · Session PB-DEMO-001                      │
├──────────────────────────────────────────────────────────────────────────┤
│ ❝ 게으른 게 아니고 꾀병도 아니라는 걸 알아주셨으면 해요 ❞                        │
│   "I want you to know I am not lazy and I am not making this up."        │
├───────────────────────────────┬──────────────────────────────────────────┤
│ COMPLAINT                     │ SIGNALS TO DISCUSS (screening scores,    │
│ 4 yr low back pain (lifting   │ not diagnoses)                           │
│ injury) → 2 yr burning right- │ ▌Neuropathic-pattern, right leg — 6/9    │
│ leg pain to foot; plus        │  burning, electric, radiating;           │
│ previously unreported whole-  │  sitting-provoked                        │
│ body deep ache (삭신이 쑤시다  │ ▌Widespread pain — WPI 14/19, SSS 9/12   │
│ — deep, constant, bilateral,  │  meets common screening threshold for    │
│ exertional, tender to light   │  centralized pain / FM assessment        │
│ pressure)                     │ ▌Inflammatory — LOW: stiffness ~15 min,  │
│                               │  no reported swelling                    │
│ BODY MAP  [thumbnail]         │                                          │
│ 14/19 regions; dermatomal-    │ RED FLAGS: none met on structured screen │
│ appearing R posterior leg     │ (bowel/bladder, saddle anesthesia,       │
│ radiation trace               │ weakness, fever, wt loss, Ca hx, trauma  │
│                               │ neg; night pain positional)              │
├───────────────────────────────┼──────────────────────────────────────────┤
│ FUNCTION  PEG 7 / 6 / 8       │ TREATMENT HISTORY                        │
│ Stopped church (sitting);     │ ibuprofen — minimal effect               │
│ struggles with work shifts;   │ hot baths — temporary relief             │
│ unrefreshing sleep            │ PT — never tried                         │
│                               │ neuropathic-class / centrally-acting     │
│                               │ medication — never trialed               │
├───────────────────────────────┴──────────────────────────────────────────┤
│ PATIENT-SELECTED QUESTIONS: two-mechanism question · nerve evaluation ·  │
│ medication-mechanism match                                               │
├──────────────────────────────────────────────────────────────────────────┤
│ Summarizes patient self-report via screening instruments (descriptor     │
│ screen; WPI/SSS; PEG). Supplements, not replaces, clinical assessment.   │
│ Scoring methods: [methods link]                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

The patient companion sheet renders the same content in plain Korean +
English, with the three selected questions enlarged at the top.
