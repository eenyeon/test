# PainBridge — Regulatory, Ethical, and Safety Risk Register

**Document type:** Standalone risk register
**Intended uses:** Design reviews, IRB submissions, counsel conversations, feature-gate decisions
**Status:** Living document, v1 (July 2026). Re-review at every feature addition.

---

## 0. Regulatory posture (the load-bearing decision)

PainBridge is a **patient-facing organizer of patient self-reported
information**, using transparent, published, validated-instrument scoring,
producing discussion-support artifacts, and making **no diagnostic or
treatment claims**. This positions it as likely **non-device** under the
21st Century Cures Act §3060 and FDA CDS/wellness guidance. Every risk below
is managed to preserve that posture. The three drift behaviors that would
break it: outputting condition probabilities, issuing treatment
recommendations, and replacing transparent scoring with opaque AI
classification.

## 1. Risk register

| # | Risk | Severity | Likelihood | Analysis | Mitigation | Owner/trigger |
|---|---|---|---|---|---|---|
| 1 | Non-diagnostic claims integrity | Critical | Medium (drift) | The entire regulatory posture rests on it; "mechanism signal classifier" language already flirts with diagnosis | Never output condition probabilities to patients; show instrument scores + "discuss with your clinician"; ban diagnostic nouns in all generated text via template constraints; copy review at every release | Every release |
| 2 | FDA / CDS reclassification | Critical | Low–Med | Non-device today; drift risks listed above | Keep mechanism layer deterministic and transparent (published scoring); maintain a regulatory rationale memo; regulatory counsel opinion before clinic sales; re-review at every feature | Feature gates |
| 3 | Under-triage (missed cauda equina etc.) | Critical | Low | The catastrophic tail risk | Deterministic guideline-based screens run **first**, before all other modules; conservative thresholds for the can't-miss syndromes; log and audit all flag-negative sessions; malpractice-informed counsel review | Pre-pilot |
| 4 | Over-triage | Moderate | Medium | Over-sensitive flags send people to the ED unnecessarily, burning clinician trust | Guideline-anchored flag definitions (not maximal sensitivity); tiered urgency language ("today" vs "this week"); monitor over-triage rate as a pilot metric | Pilot |
| 5 | False reassurance | High | Medium | "No red flags" read as "you're fine" | Phrase as "no urgent flags *in what you entered*"; always include change-triggers ("seek care if…"); never gate care-seeking | Copy review |
| 6 | Language translation errors | High | Medium (when multilingual ships) | A mistranslated symptom is a clinical error | Human-validated bilingual templates for fixed content; idiom mappings only after bilingual clinician consensus; always preserve original-language text alongside interpretation; interpreter-reviewed release per language | Per language launch |
| 7 | AI hallucination | High | Medium | LLM-generated clinical text can fabricate | LLMs only rephrase/organize within validated templates; no free generation of clinical claims; structured fields populated deterministically; automated post-generation checks (no diagnoses, no dosages, no invented symptoms) | Architecture |
| 8 | Cultural stereotyping | High | Medium | Idiom mapping can become "group X says Y and means Z" essentialism | Idioms treated as hypotheses, always followed by individual clarifying questions; community advisory board per language; publish the anti-essentialist method itself | Stream B design |
| 9 | HIPAA / privacy | High | Medium | BA status arrives with first clinic deployment; free-text is re-identification-prone | HIPAA-grade infrastructure pre-emptively; BAAs; tiered consent; free-text scrubbing in de-identification (full treatment: `08-data-and-ip-strategy.md`) | Pre-pilot |
| 10 | Clinician burden | Medium | High | A six-page report will be ignored and resented | One-page clinician view, hard limit; read time ≤60 s as a design constraint and pilot metric; clinician co-design | Design |
| 11 | Patient anxiety | Medium | Medium | Mechanism language can frighten ("nerve damage?") | Plain-language framing tested with patients; anxiety measured in pilot; avoid alarming labels in patient-facing view | Pilot |
| 12 | Medical liability | High | Low–Med | Tool "missed" something; clinician over-relied on report | Prominent scope disclaimers; report labeled "patient-reported information summary"; "supplements, not replaces, clinical assessment" on every page; professional liability insurance; health-tech counsel review of ToS | Pre-pilot |
| 13 | Equity / accessibility | Medium | Medium | Digital tool could worsen the disparities it targets (device access, literacy, disability) | ≤6th-grade reading level; WCAG accessibility; clinic-tablet completion option for patients without devices; monitor completion demographics in pilot | Pilot |

## 2. Standing safety rules (product law)

1. Red-flag screening executes before any other module, always,
   deterministically.
2. No diagnostic nouns, condition probabilities, dosages, or treatment
   directives in any patient-facing or clinician-facing output.
3. Original-language patient text is always preserved and displayed alongside
   any interpretation.
4. Every generated output passes automated safety checks before rendering.
5. Any new feature is assessed against risks #1–#3 before it is scoped.

## 3. Review cadence

- Risk register reviewed at each release and each quarterly planning cycle.
- Regulatory rationale memo re-validated at every feature gate.
- Pilot data reviewed for over/under-triage signals monthly during pilots.
