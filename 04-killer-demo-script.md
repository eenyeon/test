# PainBridge — Killer Demo Script

**Document type:** Standalone demo design specification
**Intended uses:** Prototype build spec, NIH/NSF reviewer demos, clinician and partner presentations, pilot design
**Status:** Design spec, v1 (July 2026). Not UI code — screen-by-screen design.

---

## 0. Demo intent and audiences

This is **not the full website**. It is a focused ~8-minute prototype walk
through the single most differentiated workflow: multimodal, culturally
embedded pain expression → clinically legible, mechanism-aware, one-page
Phenotype Report → better diagnostic questions → mechanism-matched pathway.

| Audience | What must land |
|---|---|
| NIH reviewers | Clinical legibility as a measurable target; validated instruments under the hood; a testable visit-level intervention |
| NSF / I-Corps reviewers | A clear buyer (pain-clinic intake) and a workflow a clinic would adopt |
| Clinicians | One page, 40 seconds, transparent scores, no diagnosis, conservative red flags |
| Patients | "It finally says what I've been trying to say for years" |
| Commercialization partners | The data asset accruing behind every session |

**Scope note.** The 90-day pilot MVP is English-first
(`02-mvp-wedge-decision.md`). The demo includes the Korean language/metaphor
layer as the *vision layer*, built from human-validated content for this one
scripted scenario — it demonstrates Stream B (`05-five-year-research-program.md`)
without claiming a validated multilingual product.

**Flow note.** In the production product, the red-flag screen runs
**immediately after intake begins and before any other module**
(`09-regulatory-ethical-risk-register.md`, rule 1). In this demo script it is
presented at position 5 for narrative flow; the demo narrator states
explicitly: "In the real product, this safety screen ran before everything
you just saw — nothing self-management-related is ever shown before it."

---

## 1. The persona

**Yoon Soon-ja (윤순자), 58.** First-generation Korean immigrant, hotel
housekeeping supervisor, limited English proficiency; her daughter usually
interprets at appointments.

**Pain story.** Four years of low back pain that began after a lifting
injury at work, now with **burning pain running down her right leg to the
foot**, plus a whole-body deep ache she has *never mentioned to a doctor* —
she describes it in Korean as **삭신이 쑤시다** ("my whole body aches deep
in the bones/joints" — an idiom with no clean English equivalent) and
**몸살 기운** (whole-body malaise-ache). Poor sleep, heavy fatigue,
episodic jaw pain, irritable bowel. One lumbar X-ray ("mild arthritis"),
normal labs twice. At her last visit, through hurried interpretation, her
report compressed to *"back hurts, tired."* She was told everything looks
fine and given ibuprofen. She is one dismissive visit away from disengaging.

**Why this pain is hard to explain — the three stacked legibility failures:**
1. **Mixed mechanism:** a probable radicular/neuropathic component (burning,
   dermatomal leg pain) *on top of* a probable nociplastic component
   (widespread ache, fatigue, unrefreshing sleep, overlapping conditions) —
   the combination standard intake never disentangles.
2. **Culturally embedded expression:** her most accurate description exists
   only as a Korean idiom that interpretation flattens to "body aches."
3. **Minimization after invalidation:** normal tests + dismissal taught her
   to under-report; the widespread pain has literally never entered her
   chart.

**What standard intake misses:** the leg pain's *quality and path* (a 0–10
scale can't carry "burning wire to the foot"); the widespread pattern (no
one asks, she doesn't volunteer); the idiom (flattened in real-time
interpretation); her actual priority ("I am not lazy and I am not making
this up").

---

## 2. Screen-by-screen specification

### Screen 1 — Landing

**Purpose.** Set the contract: preparation, not diagnosis. Establish trust
in 10 seconds.

**Sample copy (shown bilingually after language selection; Korean primary,
English subtitle):**
> **Prepare for your visit. In your own words. / 당신의 언어로, 진료를 준비하세요.**
> PainBridge helps you describe your pain clearly and prepares a one-page
> summary you and your clinician can use together.
> **PainBridge does not diagnose and does not replace medical care.**
> ~20 minutes · Your answers are private · You choose what to share

Buttons: `Start my pain summary / 통증 요약 시작하기` · `How this works`
Language selector prominent at top: English · 한국어 · Español · 中文 · …

**Sample input.** Ms. Yoon selects 한국어. Consent screen follows (tiered:
use / de-identified research use / recontact), ≤6th-grade reading level.

**Layout.** Single centered column; calm neutral palette; no stock photos of
grimacing patients; the non-diagnostic statement visually persistent (footer
badge on every subsequent screen: "Not a diagnosis — a preparation tool").

**Data captured.** Language selection; consent tier; session start.
**Scientific meaning.** Consent tier capture is what makes every subsequent
datum corpus-eligible; language selection is the first moderator variable in
the Pain Legibility Cascade (language concordance).

---

### Screen 2 — Pain Story Intake

**Purpose.** Onset, course, temporal pattern, and the patient's own
priority — the narrative spine standard forms never keep.

**Sample copy:**
> **Tell us how this pain started and how it behaves.**
> Short answers are fine. You can write in Korean, English, or both.

Fields: When did it start? · How did it start? · Is it changing? ·
When is it worst? · What makes it better/worse (sitting/standing/walking
chips)? · *"What do you most want your clinician to understand?"*

**Sample input (Ms. Yoon, in Korean; demo shows live English gloss):**
- Start: "4년 전 호텔 일 하다가 허리를 다쳤어요" (*Hurt my back lifting at
  hotel work, 4 years ago*)
- Course: "허리는 계속 아프고, 2년 전부터 다리가 타는 것처럼 아파요"
  (*Back pain constant; for 2 years the leg burns*)
- Worse with: sitting long, end of shift. Better with: lying down, hot baths.
- Priority: **"게으른 게 아니고 꾀병도 아니라는 걸 알아주셨으면 해요"**
  (*"I want them to know I am not lazy and I am not making this up."*)

**Sample AI output (inline, subordinate to structure):** a gentle structured
echo — "So far: back injury 4 years ago → constant low back pain → burning
right-leg pain for ~2 years, worse with sitting. Did we get that right?"
(Edit/confirm. The AI *organizes*; it never interprets clinically here.)

**Layout.** Conversational one-question-per-card flow with a visible
progress rail (9 steps); free-text boxes with "your words will be kept
exactly as written" microcopy.

**Data captured.** Onset/course/temporal structured fields; verbatim
free text (Korean); aggravating/easing selections; the priority quote.
**Scientific meaning.** The aggravating/easing pattern (sitting-provoked,
positional) is a mechanical/radicular discriminator; the verbatim priority
quote operationalizes *felt validation* (it will reappear, unedited, at the
top of the report — the design's single most powerful trust gesture).

---

### Screen 3 — Body Map / Visual Pain Expression

**Purpose.** Spatial capture that words and 0–10 scales cannot carry;
the screen where the never-reported widespread pattern becomes visible.

**Sample copy:**
> **Show us where it hurts.**
> Tap every area that hurts — not just the worst one. Many people have more
> than one pain area. Then, if any pain *travels*, draw its path with your
> finger.

**Sample input.** Ms. Yoon shades: low back (dark = severe), right buttock,
back of right thigh, right calf, right foot — then, prompted by "not just
the worst one," adds shoulders, neck, both upper arms, both hips, both
knees (lighter = aching). She draws the travel line: low back → posterior
thigh → calf → foot. Per-region quality chips: 🔥 burning (leg),
🪨 deep ache (everywhere else), ⚡ electric shocks (foot, sometimes).

**Sample AI output.** None visible — deliberately. A quiet counter updates:
"14 areas marked." (The system computes widespread-pain distribution and a
radiation vector silently; interpretation waits for Screen 6.)

**Layout.** Large front/back SVG body figure, pinch-zoom; intensity by
shade, quality by chip icons; drawn radiation path rendered as an animated
trace. Side panel lists marked regions for review/edit.

**Data captured.** Region set with intensities and quality tags; radiation
vector geometry; order in which regions were marked (she marked the leg
first, the widespread regions only after prompting — that sequence is
itself data).

**Scientific meaning.** This screen operationalizes **cross-modal
concordance** (H3, `03-painbridge-conceptual-model.md`): her verbal story
("back and leg") vs. her map (14 regions) quantifies minimization. The
widespread distribution feeds WPI scoring; the dermatomal travel line feeds
the neuropathic signal. This is the demo's first gasp moment: *four years
of care, and this pattern has never been in her chart.*

---

### Screen 4 — Language / Metaphor Clarification

**Purpose.** The differentiating screen: culturally embedded expression is
*interpreted through the patient*, never flattened by literal translation.

**Sample copy:**
> **Describe the whole-body ache in your own words — any language.**

**Sample input.** She types: **"삭신이 쑤시다"**

**Sample AI output (the clarification dialog — the anti-stereotyping
design made visible):**
> "삭신이 쑤시다 — thank you. This expression can mean different things for
> different people, so a few quick questions about *your* experience:
> 1. Is this ache deep in the muscles and bones, or closer to the skin?
>    → *deep in bones/muscles*
> 2. Constant, or does it come in waves? → *always there, worse evenings*
> 3. Worse after activity, or after rest/morning? → *after work; mornings stiff ~15 minutes*
> 4. Does light pressure (a firm hand on the shoulder) hurt more than it
>    should? → *yes*
>
> Here is how we'll describe this to your clinician — **your original words
> stay on the report**:
> *'Patient describes a whole-body ache as 삭신이 쑤시다 — characterized by
> her as deep, constant, bilateral aching, worse after exertion and in the
> evening, with tenderness to light pressure. Morning stiffness ~15 minutes.'*
> Edit anything that isn't right."

**Layout.** Two-pane: her original phrase pinned at top (never disappears);
clarifying questions as tappable chips below; the composed clinical gloss
drafts live in the second pane with an edit button.

**Data captured.** The idiom (original script) + full clarification tree +
resulting descriptor mapping + her edits — one complete **corpus record**
(`08-data-and-ip-strategy.md` §2.2).

**Scientific meaning.** Demonstrates H4: idioms carry recoverable
mechanistic signal *when elicited through the individual* (her answers load
onto nociplastic descriptors: deep, diffuse, exertional, allodynia-adjacent,
short-duration morning stiffness — while simultaneously *lowering* the
inflammatory signal). The idiom-as-hypothesis, clarify-through-the-patient
method is the published anti-essentialism safeguard
(`09-regulatory-ethical-risk-register.md` #8). This screen is what no
competitor category does at all.

---

### Screen 5 — Red Flag Safety Screen

**Purpose.** Credibility with clinicians; safety before anything
resembling advice. (*Production placement: first. See Flow note, §0.*)

**Sample copy:**
> **A few safety questions first.** Some symptoms need urgent attention
> before anything else. Please answer carefully — this is the most important
> part.

Items (deterministic, guideline-based, LBP set): new bowel/bladder
dysfunction; saddle numbness; new/progressive leg weakness; fever;
unexplained weight loss; cancer history; recent major trauma; night pain
unrelieved by position change.

**Sample input.** Ms. Yoon: all negative except "night pain — sometimes,"
which triggers one follow-up ("does changing position relieve it?" → yes →
does not flag).

**Sample AI output (verbatim safety copy — conservative by design):**
> "**No urgent warning signs were found in what you entered.** This is not a
> guarantee that nothing serious is happening — it means your answers today
> didn't match the patterns that need same-day care. **If you develop** new
> trouble controlling bladder or bowels, numbness in the groin area, or new
> leg weakness, **seek emergency care immediately**, even before your
> appointment."

**Layout.** Visually distinct from the rest of the flow (clinical,
high-contrast, no illustrations); one item per screen; the closing message
persistent in the final report.

**Data captured.** All red-flag responses (including the negative ones —
audit-logged per risk register #3); the night-pain clarification branch.
**Scientific meaning.** Demonstrates the deterministic safety architecture
that protects the non-device posture; the phrase-level design ("in what you
entered") is the false-reassurance mitigation made visible to reviewers.

---

### Screen 6 — Mechanism Signal Profile

**Purpose.** The engine surfaces — transparently. Signals, never diagnoses.

**Sample copy:**
> **Patterns worth discussing with your clinician.**
> These are signals from validated questionnaires — **not diagnoses**. Each
> score is shown so your clinician can check the reasoning.

**Sample AI output (three signal cards):**
> **Nerve-related pattern — right leg.** Burning + electric descriptors in a
> back-to-foot path, worse with sitting. Descriptor screen: 6/9 nerve-pattern
> features. *Worth discussing: neurological exam; whether tests like EMG/NCS
> or imaging are appropriate.*
>
> **Widespread pain pattern — whole body.** Pain in 14 of 19 body areas
> (Widespread Pain Index 14), with fatigue, unrefreshing sleep, and
> concentration difficulty (Symptom Severity 9/12). This meets a common
> *screening* threshold used when clinicians consider conditions like
> fibromyalgia. *Worth discussing: whether altered pain processing is part
> of the picture.*
>
> **Inflammatory pattern — low signal.** Morning stiffness ~15 minutes; no
> joint swelling reported. *This pattern appears less likely from your
> answers, but only an exam and labs can assess it.*

**Layout.** Three cards, each with: plain-language pattern name → the
evidence (her own inputs, quoted) → the transparent score → "worth
discussing" line. An expandable "how this score works" drawer per card
shows the actual instrument items.

**Data captured.** Item-level instrument responses; computed indices;
discordance index (verbal-minimal vs. map-extensive) logged internally.
**Scientific meaning.** The regulatory tightrope walked in public: validated
instruments, published scoring, visible provenance, no condition
probabilities — signals-as-conversation-material. Also the demo's clinical
payoff: **two coexisting mechanisms disentangled** (radicular + nociplastic)
with the inflammatory branch responsibly *de-emphasized* — showing the
system can lower a signal, not just raise alarms.

---

### Screen 7 — Specialist-Specific Diagnostic Questions

**Purpose.** Convert signals into patient-voiced, mechanism-anchored
questions — the conversational payload.

**Sample copy:**
> **Questions you might ask at your visit.**
> Pick the ones that matter to you. They'll print in Korean and English.

**Sample AI output (primary-care version; she selects 1, 2, 4):**
> 1. "My pain seems to have **two parts** — burning pain running down my
>    right leg to the foot, and a deep ache through my whole body with
>    fatigue and poor sleep. **Could these be two different kinds of pain
>    needing different treatments?**"
> 2. "The leg pain is burning and electric and follows a path from my back
>    to my foot. **Could this suggest nerve involvement? What exam findings
>    or tests would clarify it?**"
> 3. "My whole-body ache covers 14 body areas and my labs have been normal.
>    **Could altered pain processing — like fibromyalgia — explain this
>    pattern? Could we assess it using established criteria?**"
> 4. "**If part of my pain is nerve-related or related to pain processing,
>    would ibuprofen alone be expected to help it?**"

A toggle previews the **rheumatology variant** (leads with the stiffness/
swelling negatives and the widespread indices) — demonstrating
specialist-adaptation as a *view* of the same phenotype.

**Layout.** Checkbox list; each question shows a small "why this question"
link tracing back to her inputs; selected questions preview in the report
mock at right.

**Data captured.** Which questions generated vs. selected vs. edited —
direct measurement of patient conversational agenda.
**Scientific meaning.** Operationalizes *conversational alignment* (PLC
stage 6) and question-asking (H2 mediator). Question 4 is the low-value-care
guardrail rendered as patient agency rather than clinician correction.

---

### Screen 8 — The PainBridge Phenotype Report

**Purpose.** The artifact. One page. Forty seconds of clinician reading.

**Sample AI output (full clinician-page content):**

> **PAIN PHENOTYPE REPORT** · Patient-reported information summary — not a diagnosis · PainBridge v0.9
> **Patient:** Yoon, Soon-ja · 58F · Korean-speaking (daughter interprets) · Completed 2026-07-06, 22 min
>
> **Patient priority (verbatim):** "게으른 게 아니고 꾀병도 아니라는 걸 알아주셨으면 해요" — *"I want you to know I am not lazy and I am not making this up."*
>
> **Complaint:** 4 yr low back pain (lifting injury) → 2 yr burning right-leg pain to foot; plus previously unreported whole-body deep ache (described as 삭신이 쑤시다 — deep, constant, bilateral, exertional, tender to light pressure).
>
> **Body map:** [thumbnail] 14/19 regions; dermatomal-appearing right posterior leg radiation trace.
>
> **Signals to discuss (screening scores, not diagnoses):**
> • Neuropathic-pattern descriptors, right leg: 6/9 features (burning, electric, radiating; sitting-provoked)
> • Widespread pain: WPI 14/19, SSS 9/12 — meets common screening threshold for centralized pain / FM assessment
> • Inflammatory screen low: morning stiffness ~15 min, no reported swelling
> **Red flags:** none met on structured screen (bowel/bladder, saddle anesthesia, weakness, fever, weight loss, cancer hx, trauma: negative; night pain positional)
>
> **Function:** PEG 7/6/8. Stopped church (sitting); struggles with work shifts; sleep unrefreshing.
> **Treatment history:** ibuprofen (minimal effect); hot baths (temporary relief); no PT to date; no neuropathic-class or centrally-acting medication trialed.
> **Patient-selected questions:** two-mechanism question · nerve evaluation · medication-mechanism match
> *This report summarizes patient self-report via validated screening instruments (descriptor screen; WPI/SSS; PEG). It supplements, not replaces, clinical assessment. Scoring: painbridge.org/methods*

Patient-facing companion sheet renders the same content in plain Korean +
English with her three questions enlarged.

**Layout.** Strict one-page grid: priority quote banner → two-column body
(map + signals | function + history) → questions footer → provenance line.
Print CSS is a first-class requirement.

**Data captured.** The report object itself (the unit of the dataset);
render/download/share events; whether the share-to-clinic option is used.
**Scientific meaning.** This page *is* the intervention of H1 and the unit
of validation for the R21 (`06-grant-roadmap.md` §1). Everything above it in
the demo exists to make this page trustworthy in 40 seconds: verbatim quote
(validation), transparent scores (credibility), red-flag line (safety),
untried-treatment-classes line (the actionable gap a clinician acts on).

---

### Screen 9 — Mechanism-Matched Care Pathway

**Purpose.** Show the phenotype *consuming* layer — options-to-discuss,
never prescriptions.

**Sample copy:**
> **Care approaches that often come up for patterns like yours.**
> These are conversation starters for your visit — what fits *you* is a
> decision for you and your clinician.

**Sample AI output (two-track pathway card):**
> **For the nerve-pattern leg pain, clinicians often discuss:** neurological
> examination; imaging *only if exam findings support it*; physical therapy;
> medications used for nerve pain (different from ibuprofen).
> **For the widespread-pain pattern, clinicians often discuss:**
> understanding pain-processing changes (pain neuroscience education); sleep
> treatment; paced, gradually increasing activity; pain-focused CBT/ACT;
> certain non-opioid medications that act on pain processing.
> **Often *not* helpful for patterns like yours** (worth asking about before
> pursuing): repeat imaging without new exam findings; long bed rest;
> opioids as a first-line treatment for this pattern.
> **Next step:** bring this report to your visit. If widespread-pattern pain
> is confirmed, options may include rheumatology or a pain program;
> language-support services can be requested for any referral — ask, it is
> your right.

**Layout.** Two pathway columns matching the two signal cards from Screen 6;
the "often not helpful" block visually calm (guidance, not alarm); a single
next-step banner. Ends with `Download / Print / Share my report`.

**Data captured.** Pathway views; which options she marks "want to
discuss"; interpreter-request interest.
**Scientific meaning.** Operationalizes *mechanistic concordance of care*
(PLC stage 7) and the low-value-care outcome (H5) — and demonstrates to
reviewers that navigation is phenotype-conditioned, not a directory.

---

## 3. What makes this demo novel (the summary slide)

1. An untranslatable idiom becomes a mechanistic clinical signal **without
   being flattened** — through the patient, not a dictionary.
2. Minimization is **caught and quantified**: 2 body parts in her words,
   14 on her map.
3. Two coexisting mechanisms are **disentangled** on one page — the thing a
   15-minute visit structurally cannot do.
4. The system **lowers** a signal (inflammatory) as readily as it raises
   one — pattern support, not alarmism.
5. Four years of illegibility → one page a clinician reads in 40 seconds,
   with every score traceable.
6. No diagnosis is uttered anywhere — reviewers watch the regulatory
   discipline hold under the hardest scenario.

## 4. Data captured across the demo session (the asset slide)

One session yields: a consented corpus record (idiom + clarification tree +
mapping); item-level responses on three validated instruments; body-map
geometry with radiation vector; a cross-modal discordance measurement; a
red-flag audit record; question selection behavior; the report object;
pathway engagement. **Multiply by every intake at every deployed clinic** —
that is the dataset described in `08-data-and-ip-strategy.md`.

## 5. What the pilot would test (the closing slide)

In patients like Ms. Yoon (single site, N≈30, then pilot RCT):

- **Feasibility:** completion ≥70%, median ≤25 min.
- **Legibility (primary signal):** clinician mechanistic characterization
  accuracy with vs. without the report, against blinded reference
  assessment (H1).
- **Validation:** patient felt-validation change pre/post visit (H2).
- **Utility:** clinician usefulness ≥4/5; read time ≤60 s; "changed my
  assessment" ≥30%.
- **Care alignment (exploratory):** untried mechanism-appropriate options
  discussed or initiated (e.g., neuropathic-class medication conversation,
  PT referral, FM-criteria assessment) within 3 months; low-value events
  (repeat imaging, opioid initiation) tracked (H5).

## 6. Build checklist for the demo prototype

- [ ] Screens 1–9 as a linear scripted flow (hard-coded persona path is
      acceptable; free input only where it shows: free text, body map,
      question selection)
- [ ] SVG body map with region shading + radiation trace
- [ ] Deterministic scoring for the three instruments, with the
      "how this score works" drawers
- [ ] Korean/English bilingual rendering for this scripted scenario
      (human-validated strings only — no live machine translation)
- [ ] One-page report with print CSS + patient companion sheet
- [ ] Presenter mode: the six "what makes this novel" beats as narrator cues
