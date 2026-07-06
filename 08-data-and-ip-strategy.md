# PainBridge — Data and IP Strategy

**Document type:** Standalone strategic document
**Intended uses:** IRB planning, data-governance charter drafting, IP counsel conversations, SBIR data-management plans
**Status:** Working strategy, v1 (July 2026)

---

## 1. Principle

PainBridge's most durable asset is not software. It is a **consented,
multilingual, multimodal, outcome-linked pain-expression dataset** plus a
**validated instrument**. Data strategy is therefore not an afterthought of
product strategy — it *is* the long-term strategy. Collect for science from
day one; govern for trust from day one.

## 2. What to collect from day one (priority order)

1. **Paired pain-language data:** free-text pain descriptions (any language)
   ↔ structured descriptor selections ↔ instrument scores. The pairing is
   the corpus — the single most scientifically and commercially valuable
   asset.
2. **Metaphor/idiom data:** original-language expression + the
   clarification-dialog tree + resulting descriptor mapping + (where
   available) bilingual clinician adjudication.
3. **Body-map geometry:** regions, extent, radiation vectors — stored as
   structured data, not images.
4. **Symptom-pattern and mechanism-signal data:** all instrument responses at
   the item level, not just scores.
5. **Function (PEG, roles), treatment history, red-flag responses.**
6. **Report and conversation data:** which suggested questions users
   selected, what they edited, the verbatim "what I want my clinician to
   understand."
7. **Care events and outcomes (consented follow-up):** whether the report was
   used in the visit; what was ordered/referred/prescribed; PEG and
   felt-validation at 2 and 6 weeks; care-pathway selections.
8. **Engagement/completion analytics** — kept architecturally separate from
   research data.

**Defer:** visual-expression data (until a lexicon exists), passive
sensing/device data, longitudinal diary data.

## 3. Data assets

**Scientific assets**
- The multilingual idiom→descriptor corpus (publishable, grantable, unique).
- Item-level multimodal phenotype records linked to visit outcomes
  (trial infrastructure; mediation-analysis fuel).
- The cross-modal concordance dataset (verbal × body map × instruments).

**Commercial assets**
- The same corpus (licensing relevance: digital MSK, pharma, interpreter
  training).
- The validated instrument + normative dataset (clinical-trials licensing).
- De-identified phenotype→outcome dataset (payer analytics — only under
  strict governance and within consent scope).

## 4. Privacy, consent, governance

- **HIPAA posture.** The direct-to-patient MVP is likely not HIPAA-covered
  (no covered-entity relationship), but clinic deployment makes PainBridge a
  **Business Associate** immediately. Build to HIPAA standard from day one:
  encryption at rest/in transit, minimum-necessary access, audit logs,
  BAA-ready hosting.
- **Tiered consent (in the user's language, ≤6th-grade reading level):**
  (1) use the tool; (2) de-identified research use of responses;
  (3) recontact for follow-up/outcomes; (4) future research and data
  sharing. Track consent tier per record; enforce in the data pipeline, not
  by policy alone.
- **Free-text and idiom data are re-identification-prone and culturally
  sensitive.** De-identification must include free-text scrubbing. Corpus
  releases only as aggregated/curated sets, with community advisory input.
- **Governance structures:** IRB protocols from the first pilot; a
  **community advisory board per language stream** (PCORI-required and the
  primary stereotyping safeguard); a published **data-governance charter** —
  who may license what, under which consent tiers — written *before* the
  first commercial conversation, so participant data cannot be quietly
  commercialized beyond consent.

## 5. IP and defensibility — realistic assessment

| Asset | Protectable? | How |
|---|---|---|
| Cultural-linguistic idiom→descriptor corpus | **Yes — strongest asset.** Not patentable, but ownable | Trade secret + controlled licensing; consent-scoped; costly to replicate (bilingual clinical consensus per language pair) |
| Validated instrument (report structure + psychometric dossier) | **Yes, via validation, not patent** | Copyright on instrument text/format; the dossier itself is the moat — competitors must redo years of validation to make equivalent claims |
| Legibility metric + concordance indices | Partially | Publish (establishes field ownership and citation primacy); keep scoring implementations proprietary where sensible |
| Multimodal phenotype-generation pipeline | Possibly patentable (method claims) | Provisional patent worth exploring once the pipeline is concrete; expect narrow claims; don't rely on it |
| Specialist-specific report adaptation; conversation-builder templates | Weak | Copyright + speed of iteration only |
| Red-flag + dismissal-protection logic | No (guideline-derived) | Don't claim; conservative correctness is the value |
| Data moat (phenotype→outcome records) | **Yes** | Grows with every deployment; consent + governance make it usable |
| Workflow integration + clinic relationships | Yes, operationally | Switching costs; research-site dual role |
| Trademark | Yes | Register "PainBridge" and the report name early — cheap and worth it |

**Honest bottom line:** patents will be, at best, a minor moat. The real
defensibility stack is *validation dossier + corpus + consented outcome data
+ clinic embedment*, in that order. Budget legal spend accordingly: trademark
now, provisional patent evaluation at prototype stage, no patent-heavy
strategy.

## 6. University considerations

If built inside a university appointment: engage the tech-transfer office
early (data/IP ownership, SBIR/STTR structuring, conflict-of-interest
management for the PI across the lab/company boundary). The STTR structure
(`06-grant-roadmap.md` §7) is the cleanest lab↔company bridge; the
data-governance charter must bind both entities.

## 7. Immediate actions

1. Draft tiered consent language with IRB submission (this quarter).
2. Stand up BAA-ready infrastructure before the clinic pilot.
3. Write the one-page data-governance charter.
4. Trademark filing for "PainBridge."
5. Corpus schema: define the idiom record format (expression, language,
   clarification tree, descriptor mapping, adjudication, consent tier)
   before the first interview is transcribed.
