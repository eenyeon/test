# PainBridge — MVP Wedge Decision

**Document type:** Standalone strategic document (decision record)
**Intended uses:** Team alignment, prototype scoping, pilot design, I-Corps
**Status:** DECIDED, v1 (July 2026)

---

## 1. The decision

> **If only one MVP is built in the next 90 days, it is the PainBridge
> Phenotype Report generator.**

This is a hard commitment, not a preference. All other candidate wedges are
subsets, renderings, or downstream consumers of the report — or they are
research programs mislabeled as products.

## 2. Why the alternatives lose

| Wedge | Why not MVP |
|---|---|
| Pre-visit pain communication builder | Same product, weaker frame. "Pre-visit summary" is a commodity (Phreesia-style intake); "Phenotype Report" is an instrument — it implies psychometrics, mechanism structure, and research use. Fold in. |
| Cultural-linguistic pain metaphor translator | The best long-term science and the worst MVP: population fragmented by language, validation requires bilingual clinical consensus per language pair, stereotyping/translation-error risk is highest when the product is least mature, and nobody procures a "metaphor translator." Run as the flagship research stream that ships *into* the report once validated. |
| Visual pain expression tool | No validity base. Photo-elicitation and pain-drawing literatures exist; abstract visual lexicons have no psychometric evidence. Years of research before it can be a product. Research-only. |
| Specialist-specific visit builder | Definitionally derivative — a *rendering* of the report for an audience. Cannot exist before the report does. Later-stage feature. |
| Mechanism-matched care pathway engine | Alone, it is a screener aggregator with SaMD drift risk (mechanism probabilities to patients). Inside the report, framed as "signals to discuss," it is protected. Fold in as the report's engine. |
| Care navigation platform | Ops-heavy, scientifically thin, and meaningless before phenotyping is trusted. Future expansion. |

The report is simultaneously: the **unit of validation** (you can
psychometrically evaluate a report; you cannot evaluate "a platform"), the
**unit of data capture** (every report = one multimodal, instrument-anchored,
outcome-linkable phenotype record), the **regulatory-safest artifact**
(structured summary of patient self-report, transparent scoring, framed as
discussion support), and the **commercial SKU** (clinics buy intake; trials
buy instruments).

## 3. Full wedge scoring (reference)

Scale: ●●● high / ●●○ medium / ●○○ low.

| # | Wedge | Sci. novelty | Clin. useful | Urgency | Grant | Commercial | Feasibility | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Phenotype Report generator | ●●○ | ●●● | ●●● | ●●● | ●●● | ●●● | Low–Med | **MVP (primary)** |
| 2 | Pre-visit communication builder | ●○○ | ●●● | ●●● | ●●○ | ●●○ | ●●● | Low | Fold into #1 |
| 3 | Cultural-linguistic translator | ●●● | ●●○ | ●●○ | ●●● | ●○○ | ●○○ | High | **Secondary wedge / research stream** |
| 4 | Visual pain expression | ●●● | ●○○ | ●○○ | ●●○ | ●○○ | ●○○ | High | Research-only |
| 5 | Mechanism signal profile | ●○○ | ●●● | ●●○ | ●●○ | ●●○ | ●●● | Med | Fold into #1 (engine) |
| 6 | Specialist visit builder | ●○○ | ●●● | ●●○ | ●○○ | ●●○ | ●●● | Low | Later (a view of #1) |
| 7 | Med/procedure question builder | ●○○ | ●●○ | ●●○ | ●○○ | ●○○ | ●●● | Med | Later content |
| 8 | Care navigation engine | ●○○ | ●●○ | ●●○ | ●●○ | ●●○ | ●○○ | Med | Future |
| 9 | Clinician dashboard | ●○○ | ●●○ | ●○○ | ●○○ | ●●○ | ●○○ | High | Future |
| 10 | Low-burden tracking tool | ●○○ | ●○○ | ●○○ | ●○○ | ●○○ | ●●○ | Attrition | Avoid as wedge |

**Primary wedge:** Phenotype Report generator. **Secondary wedge:**
cultural-linguistic pain expression module, launched as research (corpus +
one language pair) and shipped into the report once validated. **Future
expansion:** specialist views → longitudinal report refresh → phenotype-
conditioned navigation → clinician dashboard/EHR → trials-grade phenotyping
infrastructure.

## 4. MVP specification

**Exact target user.** English-speaking adults (~25–70) with chronic low back
pain ≥3 months, with a scheduled visit at the partner pain clinic (or its
referring primary care) within 30 days, who self-identify with "my clinician
doesn't fully understand my pain." Recruited exclusively through the partner
clinic. No open-web launch.

**Exact pain scenario.** Chronic low back pain ± leg symptoms, plus a
widespread-pain overlay screen. Rationale: this one scenario forces the three
clinically consequential mechanism differentiations — mechanical vs.
radicular/neuropathic vs. nociplastic — using instruments validated in this
population (painDETECT-style descriptors; WPI/SSS); it has the crispest
can't-miss red flags (cauda equina, malignancy, infection); and the
widespread screen catches the undiagnosed fibromyalgia-pattern patient
without building a second pathway.

**Exact first workflow (one session, 15–25 minutes):**

1. Plain-language framing: "Prepare for your visit. This does not diagnose."
2. **Deterministic red-flag screen — first, always.** Hits → tiered
   urgent-care guidance; non-hits phrased conservatively ("no urgent flags in
   what you entered").
3. Body map: shade regions; draw leg radiation if present.
4. Pain quality: structured descriptor menu + free-text "describe it in your
   own words" (verbatim, stored).
5. Onset, course, flare pattern; sitting/standing/walking effects (the
   mechanical-vs-radicular discriminators).
6. Widespread pain + overlap screen (WPI/SSS items; fatigue, sleep, brain
   fog, IBS/headache/TMD checkboxes).
7. Function: PEG (3 items) + roles pain prevents.
8. Treatment history: tried / helped / worsened.
9. "What do you most want your clinician to understand?" — verbatim,
   featured in the report.
10. Output: **(a)** one-page clinician report — complaint, body-map
    thumbnail, quality/pattern, transparent instrument scores as "signals to
    discuss," red-flag summary, PEG, treatment history, patient priority
    quote; **(b)** patient prep sheet with 3–5 mechanism-informed visit
    questions. PDF + print.

**Minimum features.** Responsive web app; the 10-step flow; deterministic
scoring (published instrument logic — no ML in the clinical path); SVG body
map with region capture; PDF/print rendering; tiered consent (use +
de-identified research use + recontact); encrypted storage built to HIPAA
standard; anonymous session codes, no accounts.

**Excluded features (write these on the wall).** Accounts/logins; chat
interface; any second language in-product; any second condition pathway; care
navigation; medication/procedure education; specialist report variants;
visual animation lexicon; clinician dashboard; EHR integration; mobile apps;
longitudinal tracking.

## 5. Success metrics (pilot gates)

- Completion ≥70% of starters; median time ≤25 minutes
- Clinician usefulness ≥4/5 from ≥60% of rating clinicians; read time ≤60 s
- "The report changed or sharpened my assessment" for ≥30% of patients
- ≥60% of patients bring/use the report at the visit
- Patient felt-validation improvement pre/post
- Zero under-triage events; over-triage rate monitored
- 100% research-use consent capture (the corpus depends on it)

## 6. First pilot study

Single-site feasibility study, N≈30, at the partner pain clinic. Patients
complete PainBridge before their intake visit; clinicians rate usefulness,
time impact, and assessment change; patients rate acceptability and felt
validation; 2- and 6-week follow-up captures orders/referrals/prescriptions.
Run in parallel: the clinician **vignette study** — mock reports vs.
narrative-only for the same cases, 15–20 clinicians, "does this change your
mechanistic characterization?" — publishable, grant-citable, requires no
software.

## 7. Strongest grant framing

NIH HEAL R21 (NINDS or NCCIH): *"Development and validation of a
patient-generated multimodal pain phenotyping instrument to improve the
clinical legibility of chronic pain."* Aims: (1) refine via
patient/clinician co-design; (2) validate report-derived mechanism signals
against blinded reference clinical assessment; (3) pilot visit-level effects
on clinician concordance and patient felt validation. The cultural-linguistic
stream is positioned as the NIMHD/PCORI follow-on, seeded by the corpus
already being collected. (Full pathway analysis: `06-grant-roadmap.md`.)

## 8. Strongest commercialization framing

**Intake replacement for pain clinics.** "Your patients complete PainBridge
before the visit; you get a one-page, mechanism-organized, note-ready
phenotype instead of a 12-page paper packet — less intake time,
better-prepared patients, cleaner documentation." Per-site SaaS; the buyer is
the clinic director who feels intake pain weekly; unit-of-one procurement; and
every deployment doubles as a research site. (Full analysis:
`07-commercialization-strategy.md`.)

## 9. Build order (next in Fable)

1. **Three polished mock Phenotype Reports** (static HTML → PDF): a
   mixed-mechanism case, a mechanical-only case, a red-flag-positive case.
   One-session build; unlocks 20 clinician discovery interviews immediately —
   before any app code.
2. **Clickable intake prototype:** the 10-step flow as a single-page web app
   with SVG body map, deterministic scoring, and report renderer with print
   CSS.
3. **Vignette-study packet:** report vs. narrative-only versions of the same
   cases plus the clinician rating form, so the vignette study launches the
   week the discovery interviews end.

Demo design for the recommended MVP: see `04-killer-demo-script.md`.
