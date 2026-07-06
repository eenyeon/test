# PainBridge — Commercialization Strategy

**Document type:** Standalone strategic document
**Intended uses:** I-Corps, SBIR commercialization plans, partner and investor conversations
**Status:** Working strategy, v1 (July 2026)

---

## 1. Commercial identity

PainBridge's sellable form is **phenotyping infrastructure**: a
patient-completed intake that produces a validated, one-page,
mechanism-organized Pain Phenotype Report. The scientific asset (validated
instrument + multilingual pain-language corpus + outcome-linked phenotype
data) and the commercial asset are the same thing accruing from the same
deployments. Every sale is also a research site; every research site is also
a reference customer.

## 2. Segment-by-segment analysis

| Customer | Pain point | Value proposition | WTP/adopt | Procurement barriers | Evidence needed | Revenue model | Adoption risk |
|---|---|---|---|---|---|---|---|
| Patients (D2C) | "No one understands my pain" | Agency + a document that speaks for them | Urgency high, **WTP low** | None, but CAC brutal | Testimonials | Freemium (weak) | High churn; not a business alone |
| Primary care clinics | 15-min visits can't unpack complex pain | Pre-digested, note-ready pain intake | Low–moderate; no budget line | EHR expectations; change fatigue | Time-saved data | Per-clinician SaaS | High — thin margins |
| **Pain clinics / academic pain centers** | Long intake packets, poor referral info, documentation burden | Replaces paper intake; structured phenotype into the note; better-prepared patients | **Moderate–high**; intake is a felt weekly cost | Small IT teams (a plus: less bureaucracy); EHR export eventually | Pilot: time saved + clinician satisfaction | Per-site SaaS (~$500–2k/mo scale) | **Lowest — first market** |
| Health systems | Pain pathway variation; opioid stewardship; low-value imaging | Standardized phenotyping at the front door; stewardship documentation | Moderate | 12–18-month cycles; security review | Utilization outcomes | Enterprise license | High, slow |
| Insurers | Paying for mechanism-mismatched care | Phenotype-guided steering away from low-value care | Potentially high, later | Actuarial evidence bar | Claims-linked outcomes | PMPM / shared savings | Very high pre-evidence |
| Medicaid programs | LEP/equity mandates; pain disparities | Language-responsive pain communication for underserved members | Grant/waiver-funded rather than purchased | State procurement | Equity outcomes | 1115-waiver / grant pilots | Medium; mission fit strong |
| Employers | MSK is a top-3 cost | Triage-quality phenotyping upstream of MSK spend | Low directly (they buy Hinge/Sword) | Benefits-broker channel | ROI | Unlikely standalone | High; partner instead |
| **Digital MSK cos** (Hinge, Sword) | Weak differentiation of nociplastic/complex members; misrouted enrollees | Phenotyping layer that routes members and flags complexity | Moderate (license/OEM) | Build-vs-buy instinct | Routing-accuracy data | License / OEM | Medium; also acquirer profile |
| **Pharma / device** | Trial enrichment (nociplastic vs neuropathic); recruiting underrepresented/LEP participants | Validated multimodal phenotyping instrument + diverse recruitment channel | **High per contract** | Validation dossier; GCP-grade data | Instrument validation papers | Per-study licensing/services | Medium; lumpy |
| CROs / academic trial networks | Inconsistent pain phenotyping across sites | Standardized ePRO phenotyping module | Moderate–high | EDC integration | Same validation dossier | Per-study SaaS | Medium |
| Interpreter / language-access services | Interpreters flatten pain idioms in real time | Pain-specific idiom support and training layer | Low WTP (thin margins) | Fragmented market | Corpus validity | Licensing / training content | High as market; strong as **partner/channel** |
| Community health orgs / FQHCs | Serving LEP chronic-pain patients with least resources | Free/subsidized patient-facing tool | Zero direct; grant-funded | Grant cycles | Feasibility | Grant-subsidized deployment | Research/mission channel, not revenue |

## 3. Market sequencing

**First market (years 0–2): specialty pain clinics and academic pain
centers.** The buyer feels the pain point weekly; procurement is unit-of-one;
deployment doubles as the research site; each deployment grows the
validation dataset. Sell as intake replacement, not "AI platform."

**Second market (years 2–4): clinical-trials phenotyping** (pharma, CROs,
academic networks) once instrument-validation papers exist. Highest revenue
per contract, and it pays for science that would be done anyway. Requires:
validation dossier, GCP-compatible data handling, ePRO packaging.

**Third wave (years 3–5+):** digital MSK licensing/OEM (routing layer),
Medicaid/health-system equity deployments (waiver- and grant-funded), and —
only after trial evidence — payer models keyed to low-value-care reduction.

**Explicitly not the business:** D2C subscriptions; employer benefits
(channel through MSK partners instead); care-directory monetization.

## 4. Revenue model summary

1. Per-site clinic SaaS (early, modest, credibility-building).
2. Per-study trials licensing (mid-term, high-margin, validation-gated).
3. OEM/licensing to digital MSK (mid-term, strategic).
4. Grant-subsidized equity deployments (mission + data, not margin).
5. Long-term: payer contracts tied to demonstrated low-value-care reduction.

## 5. Evidence-to-revenue map

| Evidence milestone | Commercial door it opens |
|---|---|
| Pilot: clinician time-saved + usefulness (N≈30) | First paid clinic pilots |
| Vignette study: reports change clinical reasoning | Sales collateral credible to medical directors |
| Instrument validation papers (R21 output) | Trials licensing conversations |
| Pilot RCT: felt validation + concordance | MSK partnership discussions; PCORI/Medicaid pilots |
| Cluster-trial utilization outcomes (R01) | Payer and health-system contracts |

## 6. Defensibility (commercial view)

Software features are copyable. The durable assets are: (1) the validated
instrument and its psychometric dossier; (2) the consented, multilingual,
outcome-linked pain-expression corpus; (3) clinic-workflow embedment; (4)
the research-network relationships. Protect accordingly
(see `08-data-and-ip-strategy.md`).

## 7. Near-term commercial actions (fold into 90-day plan)

- I-Corps application; begin the 100-interview customer-discovery log with
  clinic directors and practice managers (who buys intake tools; current
  intake cost in minutes and dollars).
- Secure one partner clinic as pilot site with a simple pilot agreement
  (free during pilot, letter of intent for paid deployment if gates are met).
- Form the small-business entity before the SBIR cycle
  (see `06-grant-roadmap.md` §7).
- Draft the data-governance charter *before* any commercial data
  conversation (see `08-data-and-ip-strategy.md`).
