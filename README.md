# PainBridge — Strategy & Killer-Demo Prototype

PainBridge is a patient-generated pain phenotyping instrument: a guided
session that converts multimodal, culturally embedded pain expression into a
one-page, mechanism-aware, specialist-ready **Pain Phenotype Report** — never
a diagnosis.

## Repository contents

**Strategy documents** (each standalone — usable in grants, team meetings,
and commercialization conversations):

| File | Purpose |
|---|---|
| `PainBridge-Strategic-Innovation-Memo.md` | The original full memo (source for the split documents) |
| `01-core-innovation-thesis.md` | What is genuinely new; what to avoid; differentiation |
| `02-mvp-wedge-decision.md` | Decision record: the Phenotype Report generator MVP |
| `03-painbridge-conceptual-model.md` | The Pain Legibility Cascade model |
| `04-killer-demo-script.md` | 9-screen demo design (Yoon Soon-ja persona) |
| `05-five-year-research-program.md` | Research streams and 10 studies |
| `06-grant-roadmap.md` | R21 → R34/R01, PCORI, I-Corps, SBIR/STTR |
| `07-commercialization-strategy.md` | Segments, sequencing, evidence-to-revenue map |
| `08-data-and-ip-strategy.md` | Corpus-as-moat, consent, governance, IP realism |
| `09-regulatory-ethical-risk-register.md` | 13-risk register + standing safety rules |
| `10-next-90-days-plan.md` | Execution plan with day-90 scoreboard |
| `11-prototype-structure.md` | Prototype IA, flow, components, design system, copy |

**Prototype** (`prototype/`): a zero-build static implementation of the
killer demo — open `prototype/index.html` in any browser. Click **"Load
sample persona — Yoon Soon-ja"** on the landing screen for the scripted
demo path, then step through with Continue. Toggle **🎙 Presenter notes**
for narrator cues. All scoring is deterministic and template-based (no ML,
no free text generation); red-flag logic, instrument-style scoring, the
bilingual report, and print output all work offline.

## Safety posture

The prototype and all documents maintain PainBridge's non-diagnostic
positioning: transparent screening scores framed as "signals to discuss,"
conservative red-flag language, and no condition probabilities, dosages, or
treatment directives anywhere in generated output.
