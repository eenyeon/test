/* PainBridge killer-demo prototype
   All logic is deterministic and template-based: no ML, no free generation.
   Scores are computed from published-style screening logic; every "AI output"
   string is composed from state (see 09-regulatory-ethical-risk-register.md #7). */

"use strict";

/* ================= DATA ================= */

const REGIONS = {
  jawL:"Jaw (left)", jawR:"Jaw (right)", chest:"Chest", abdomen:"Abdomen",
  upperArmL:"Upper arm (left)", upperArmR:"Upper arm (right)",
  lowerArmL:"Lower arm (left)", lowerArmR:"Lower arm (right)",
  upperLegL:"Upper leg (left)", upperLegR:"Upper leg (right)",
  lowerLegL:"Lower leg (left)", lowerLegR:"Lower leg (right)",
  neck:"Neck", shoulderL:"Shoulder girdle (left)", shoulderR:"Shoulder girdle (right)",
  upperBack:"Upper back", lowerBack:"Lower back",
  hipL:"Hip / buttock (left)", hipR:"Hip / buttock (right)"
};

const WORSE_OPTS  = ["sitting long","standing long","walking","end of work shift","mornings","stress","cold weather"];
const BETTER_OPTS = ["lying down","hot baths","stretching","medication","rest","movement"];
const QUALITY_OPTS = ["🔥 burning (leg)","🪨 deep ache (overall)","⚡ electric shocks (foot, sometimes)","🔨 throbbing","🧊 cold pain","📌 stabbing"];

const NEURO_ITEMS = ["burning","electric shocks","tingling / pins-and-needles","numbness",
  "shooting / radiating down the leg","worse with sitting","light touch is painful",
  "sudden jolts out of nowhere","involves the foot"];

const SSS_SLIDERS = [
  {id:"fatigue", label:"Fatigue (0 none – 3 severe)"},
  {id:"unrefreshed", label:"Waking unrefreshed (0–3)"},
  {id:"cognitive", label:"Trouble thinking or remembering (0–3)"}
];
const SSS_SYMPTOMS = ["headaches","pain or cramps in lower abdomen","feeling down or depressed"];

const PEG_ITEMS = [
  {id:"pegPain", label:"Pain on average, past week (0–10)"},
  {id:"pegEnjoy", label:"Pain interfering with enjoyment of life (0–10)"},
  {id:"pegActivity", label:"Pain interfering with general activity (0–10)"}
];

const TREATMENT_OPTS = ["ibuprofen / NSAIDs","acetaminophen","hot baths / heat","physical therapy",
  "chiropractic","massage","nerve-pain medication (e.g., gabapentin)","antidepressant for pain (e.g., duloxetine)"];
const RESULT_OPTS = ["helped a lot","helped somewhat","minimal effect","temporary relief","made it worse","never tried"];

const FLAGS = [
  {id:"bladder", q:"New trouble controlling your bladder or bowels?"},
  {id:"saddle",  q:"New numbness in the groin or saddle area?"},
  {id:"weak",    q:"New or worsening weakness in a leg?"},
  {id:"fever",   q:"Fever along with the pain?"},
  {id:"weight",  q:"Unexplained weight loss?"},
  {id:"cancer",  q:"Have you ever been treated for cancer?"},
  {id:"trauma",  q:"A recent major injury (bad fall, accident)?"},
  {id:"night",   q:"Pain that wakes you at night?",
   branch:{q:"When it wakes you — does changing position relieve it?", clearIf:"yes"}}
];

const CLARIFIERS = [
  {id:"depth",  q:"Is this ache deep in the muscles and bones, or closer to the skin?",
   opts:["deep in bones/muscles","closer to the skin"]},
  {id:"pattern",q:"Is it constant, or does it come in waves?",
   opts:["always there, worse evenings","comes in waves"]},
  {id:"timing", q:"Is it worse after activity, or after rest and in the mornings?",
   opts:["worse after work; mornings stiff ~15 min","worse after rest; mornings stiff over an hour"]},
  {id:"touch",  q:"Does light pressure — like a firm hand on the shoulder — hurt more than it should?",
   opts:["yes","no"]}
];

const PRESENTER_NOTES = [
  "Contract first: preparation, not diagnosis. Consent tiers make every later answer corpus-eligible.",
  "Her verbal story names two body parts. Watch what the body map shows in a minute. The priority quote is captured verbatim — it will reappear untouched at the top of the report.",
  "GASP BEAT: 14 regions. Four years of care and this widespread pattern has never been in her chart. Verbal-vs-map discordance is itself a measured signal (minimization).",
  "The differentiator: the idiom is never machine-translated. It is treated as a hypothesis and clarified through HER answers — anti-stereotyping by design. Original script stays on the report.",
  "PRODUCTION NOTE (say aloud): in the real product this safety screen ran FIRST, before everything you just saw. Deterministic, guideline-based, conservative wording — 'in what you entered'.",
  "Two mechanisms disentangled: nerve-pattern leg signal AND widespread-pattern signal — while the inflammatory branch is responsibly LOWERED, not just alarms raised. Every score is visible and traceable.",
  "Signals become patient-voiced questions. Question 4 is the low-value-care guardrail rendered as patient agency. Toggle shows the rheumatology view: same phenotype, different rendering.",
  "The artifact: one page, 40 seconds of clinician reading, verbatim quote on top, transparent scores, untried mechanism-appropriate treatments visible. This page IS the intervention tested in the pilot.",
  "Pathways consume the phenotype: two-track options-to-discuss, 'often NOT helpful' guardrails, never a prescription. Close: 4 years of illegibility → one legible page."
];

const PERSONA = {
  story:{
    onset:"4년 전 호텔 일 하다가 허리를 다쳤어요",
    onsetGloss:"Hurt my back lifting at hotel work, 4 years ago",
    course:"허리는 계속 아프고, 2년 전부터 다리가 타는 것처럼 아파요",
    courseGloss:"Back pain constant; for ~2 years the right leg burns",
    worse:["sitting long","end of work shift"], better:["lying down","hot baths"],
    priority:"게으른 게 아니고 꾀병도 아니라는 걸 알아주셨으면 해요",
    priorityGloss:"I want them to know I am not lazy and I am not making this up."
  },
  regions:{lowerBack:2,hipR:2,upperLegR:2,lowerLegR:2,upperBack:1,neck:1,shoulderL:1,
    shoulderR:1,upperArmL:1,upperArmR:1,hipL:1,upperLegL:1,lowerLegL:1,jawR:1},
  radiation:true,
  qualities:["🔥 burning (leg)","🪨 deep ache (overall)","⚡ electric shocks (foot, sometimes)"],
  idiom:"삭신이 쑤시다",
  clarifierAnswers:{depth:0,pattern:0,timing:0,touch:0},
  flags:{bladder:"no",saddle:"no",weak:"no",fever:"no",weight:"no",cancer:"no",trauma:"no",night:"yes",nightBranch:"yes"},
  neuro:["burning","electric shocks","tingling / pins-and-needles","shooting / radiating down the leg","worse with sitting","involves the foot"],
  sss:{fatigue:3,unrefreshed:3,cognitive:2}, sssSymptoms:["headaches"],
  stiffness:15, swelling:false,
  peg:{pegPain:7,pegEnjoy:6,pegActivity:8},
  treatments:[["ibuprofen / NSAIDs","minimal effect"],["hot baths / heat","temporary relief"],["physical therapy","never tried"]]
};

/* ================= STATE ================= */

const state = {
  personaLoaded:false, lang:"ko",
  story:{onset:"",onsetGloss:"",course:"",courseGloss:"",worse:[],better:[],priority:"",priorityGloss:""},
  regions:{}, radiation:false, qualities:[],
  idiom:"", clarifierAnswers:{}, gloss:"",
  flags:{}, flagged:[],
  neuro:[], sss:{fatigue:0,unrefreshed:0,cognitive:0}, sssSymptoms:[],
  stiffness:0, swelling:false, peg:{pegPain:0,pegEnjoy:0,pegActivity:0},
  treatments:[], signals:null,
  questions:[], selectedQ:new Set(), specialist:"pc"
};

/* ================= NAV ================= */

const STEP_NAMES = ["Start","Story","Body map","Language","Safety","Patterns","Questions","Report","Pathways"];
let current = 0;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function buildRail(){
  const rail = $("#rail"); rail.innerHTML = "";
  STEP_NAMES.forEach((n,i)=>{
    const b = document.createElement("button");
    b.textContent = i+1; b.title = n;
    b.onclick = ()=>goto(i);
    rail.appendChild(b);
  });
}
function goto(n){
  current = n;
  $$(".step").forEach(s=>s.hidden = +s.dataset.step!==n);
  $$("#rail button").forEach((b,i)=>{
    b.classList.toggle("current",i===n);
    b.classList.toggle("done",i<n);
  });
  $("#presenterStrip").textContent = PRESENTER_NOTES[n];
  if(n===6) renderQuestions();
  if(n===7) renderReport();
  if(n===8) renderPathways();
  window.scrollTo({top:0});
}
document.addEventListener("click",e=>{
  if(e.target.matches("[data-next]")) goto(Math.min(current+1,8));
  if(e.target.matches("[data-back]")) goto(Math.max(current-1,0));
  if(e.target.matches("[data-goto]")) goto(+e.target.dataset.goto);
});
$("#presenterToggle").onclick = ()=>{
  const s = $("#presenterStrip"); s.hidden = !s.hidden;
  $("#presenterToggle").setAttribute("aria-pressed", String(!s.hidden));
};

/* ================= S0 / S1 ================= */

function chipGroup(el, opts, selected, onChange, multi=true){
  el.innerHTML = "";
  opts.forEach(o=>{
    const b = document.createElement("button");
    b.className = "chip"+(selected.includes(o)?" selected":"");
    b.textContent = o;
    b.onclick = ()=>{
      if(multi){
        const i = selected.indexOf(o);
        i>=0 ? selected.splice(i,1) : selected.push(o);
      } else { selected.length = 0; selected.push(o); }
      b.classList.toggle("selected");
      onChange && onChange();
    };
    el.appendChild(b);
  });
}

$("#langChips").addEventListener("click",e=>{
  if(!e.target.dataset.lang) return;
  $$("#langChips .chip").forEach(c=>c.classList.remove("selected"));
  e.target.classList.add("selected");
  state.lang = e.target.dataset.lang;
});

function initStory(){
  chipGroup($("#worseChips"), WORSE_OPTS, state.story.worse);
  chipGroup($("#betterChips"), BETTER_OPTS, state.story.better);
  ["onset","course","priority"].forEach(id=>{
    $("#"+id).oninput = e=>{ state.story[id] = e.target.value; };
  });
}

/* ================= S2 BODY MAP ================= */

function initBodyMap(){
  $$("svg .region").forEach(r=>{
    r.addEventListener("click",()=>{
      const id = r.dataset.region;
      const next = ((state.regions[id]||0)+1)%3;
      if(next===0) delete state.regions[id]; else state.regions[id]=next;
      paintRegions();
    });
  });
  $("#radiationToggle").onchange = e=>{
    state.radiation = e.target.checked; paintRadiation();
  };
  chipGroup($("#qualityChips"), QUALITY_OPTS, state.qualities);
}
function paintRegions(){
  $$("svg .region").forEach(r=>{
    const v = state.regions[r.dataset.region]||0;
    r.classList.toggle("i1",v===1); r.classList.toggle("i2",v===2);
  });
  const entries = Object.entries(state.regions);
  $("#regionCount").textContent = entries.length;
  $("#regionLedger").innerHTML = entries
    .map(([id,v])=>`<li><span>${REGIONS[id]}</span><span class="${v===2?"sev":"mld"}">${v===2?"severe":"aches"}</span></li>`)
    .join("");
}
function paintRadiation(){
  $("#radPath").hidden = !state.radiation;
  $("#radFoot").hidden = !state.radiation;
  $("#radiationToggle").checked = state.radiation;
}

/* ================= S3 METAPHOR ================= */

function composeGloss(){
  const a = state.clarifierAnswers;
  const depth = CLARIFIERS[0].opts[a.depth??0];
  const pattern = CLARIFIERS[1].opts[a.pattern??0];
  const timing = CLARIFIERS[2].opts[a.timing??0];
  const touch = (a.touch===0) ? "with tenderness to light pressure" : "without unusual tenderness to light touch";
  const stiff = timing.includes("~15 min") ? "Morning stiffness ~15 minutes." :
                timing.includes("over an hour") ? "Morning stiffness over one hour." : "";
  return `Patient describes a whole-body ache as ${state.idiom} — characterized by her as `+
    `${depth}, ${pattern}, ${timing}, ${touch}. ${stiff}`;
}
function runClarifiers(prefill){
  $("#idiomPinned").hidden = false;
  $("#idiomPinned").textContent = state.idiom;
  const wrap = $("#clarifiers"); wrap.innerHTML =
    `<p class="hint">“${state.idiom}” — thank you. This expression can mean different things for
     different people, so a few quick questions about <strong>your</strong> experience:</p>`;
  CLARIFIERS.forEach((c,ci)=>{
    const div = document.createElement("div");
    div.className = "clarifier card";
    div.innerHTML = `<div class="q">${ci+1}. ${c.q}</div>`;
    const grp = document.createElement("div"); grp.className = "chip-group";
    c.opts.forEach((o,oi)=>{
      const b = document.createElement("button");
      b.className = "chip"+((prefill&&prefill[c.id]===oi)?" selected":"");
      b.textContent = o;
      b.onclick = ()=>{
        grp.querySelectorAll(".chip").forEach(x=>x.classList.remove("selected"));
        b.classList.add("selected");
        state.clarifierAnswers[c.id]=oi; maybeGloss();
      };
      grp.appendChild(b);
    });
    div.appendChild(grp); wrap.appendChild(div);
  });
  if(prefill){ state.clarifierAnswers = {...prefill}; maybeGloss(); }
}
function maybeGloss(){
  if(Object.keys(state.clarifierAnswers).length < CLARIFIERS.length) return;
  state.gloss = composeGloss();
  $("#glossBlock").hidden = false;
  $("#glossText").value = state.gloss;
}
$("#glossText") && ($("#glossText").oninput = e=>{ state.gloss = e.target.value; });
$("#idiomGo").onclick = ()=>{
  const v = $("#idiomInput").value.trim();
  if(!v) return;
  state.idiom = v; state.clarifierAnswers = {}; runClarifiers(null);
};
$("#idiomSkip").onclick = ()=>goto(4);

/* ================= S4 RED FLAGS ================= */

function initFlags(){
  const list = $("#flagList"); list.innerHTML = "";
  FLAGS.forEach(f=>{
    const div = document.createElement("div");
    div.className = "flag-item"; div.dataset.flag = f.id;
    div.innerHTML = `<span>${f.q}</span>
      <span class="yn"><button class="chip" data-a="yes">Yes</button>
      <button class="chip" data-a="no">No</button></span>`;
    div.querySelectorAll("[data-a]").forEach(b=>{
      b.onclick = ()=>answerFlag(f, div, b.dataset.a);
    });
    list.appendChild(div);
  });
}
function answerFlag(f, div, ans){
  state.flags[f.id] = ans;
  div.classList.add("answered");
  div.querySelectorAll(".yn .chip").forEach(c=>c.classList.toggle("selected", c.dataset.a===ans));
  const old = div.querySelector(".flag-branch"); if(old) old.remove();
  if(f.branch && ans==="yes" && !(f.id+"Branch" in state.flags)){
    const br = document.createElement("div");
    br.className = "flag-branch";
    br.innerHTML = `↳ ${f.branch.q}
      <button class="chip" data-b="yes">Yes</button> <button class="chip" data-b="no">No</button>`;
    br.querySelectorAll("[data-b]").forEach(b=>{
      b.onclick = ()=>{ state.flags[f.id+"Branch"] = b.dataset.b;
        br.querySelectorAll(".chip").forEach(c=>c.classList.toggle("selected",c===b));
        evalFlags(); };
    });
    div.appendChild(br);
  }
  evalFlags();
}
function evalFlags(){
  const answered = FLAGS.every(f=>{
    if(!(f.id in state.flags)) return false;
    if(f.branch && state.flags[f.id]==="yes" && !(f.id+"Branch" in state.flags)) return false;
    return true;
  });
  if(!answered) return;
  state.flagged = FLAGS.filter(f=>{
    if(state.flags[f.id]!=="yes") return false;
    if(f.branch) return state.flags[f.id+"Branch"]!==f.branch.clearIf;
    return true;
  }).map(f=>f.q);
  const r = $("#flagResult"); r.hidden = false;
  if(state.flagged.length){
    r.className = "result-urgent";
    r.innerHTML = `<strong>Some of your answers match patterns that can need urgent care:</strong>
      <ul>${state.flagged.map(q=>`<li>${q}</li>`).join("")}</ul>
      Please contact a clinician <strong>today</strong>, or seek emergency care if symptoms are
      severe or getting worse. You can still finish this summary — it may help that conversation.`;
  } else {
    r.className = "result-clear";
    r.innerHTML = `<strong>No urgent warning signs were found in what you entered.</strong>
      This is not a guarantee that nothing serious is happening — it means your answers today
      didn't match the patterns that need same-day care.<br><br>
      <strong>If you develop</strong> new trouble controlling bladder or bowels, numbness in the
      groin area, or new leg weakness, <strong>seek emergency care immediately</strong>, even
      before your appointment.`;
  }
  $("#flagContinue").disabled = false;
}

/* ================= S5 SIGNALS ================= */

function initSignalInputs(){
  chipGroup($("#neuroChips"), NEURO_ITEMS, state.neuro);
  const sl = $("#sssSliders"); sl.innerHTML = "";
  SSS_SLIDERS.forEach(s=>sl.appendChild(sliderRow(s.id,s.label,3,state.sss,"sss")));
  chipGroup($("#sssSymptoms"), SSS_SYMPTOMS, state.sssSymptoms);
  const pg = $("#pegSliders"); pg.innerHTML = "";
  PEG_ITEMS.forEach(s=>pg.appendChild(sliderRow(s.id,s.label,10,state.peg,"peg")));
  $("#stiffness").oninput = e=>{ state.stiffness = +e.target.value||0; };
  $("#swelling").onchange = e=>{ state.swelling = e.target.checked; };
  const tl = $("#treatmentList"); tl.innerHTML = "";
  for(let i=0;i<3;i++){
    const row = document.createElement("div"); row.className = "treat-row";
    const sel1 = mkSelect(["— treatment —",...TREATMENT_OPTS]);
    const sel2 = mkSelect(["— result —",...RESULT_OPTS]);
    const sync = ()=>{ state.treatments[i] =
      (sel1.selectedIndex>0)?[sel1.value, sel2.selectedIndex>0?sel2.value:""]:null; };
    sel1.onchange = sync; sel2.onchange = sync;
    row.append(sel1,sel2); tl.appendChild(row);
  }
}
function mkSelect(opts){
  const s = document.createElement("select");
  opts.forEach(o=>{ const op=document.createElement("option"); op.textContent=o; s.appendChild(op); });
  return s;
}
function sliderRow(id,label,max,target,kind){
  const div = document.createElement("div"); div.className = "slider-row";
  div.innerHTML = `<label for="${id}">${label}</label>
    <input type="range" id="${id}" min="0" max="${max}" value="${target[id]}">
    <output id="${id}Out">${target[id]}</output>`;
  div.querySelector("input").oninput = e=>{
    target[id] = +e.target.value;
    div.querySelector("output").textContent = e.target.value;
  };
  return div;
}

function computeSignals(){
  const wpi = Object.keys(state.regions).length;
  const sss = state.sss.fatigue + state.sss.unrefreshed + state.sss.cognitive + state.sssSymptoms.length;
  const neuroN = state.neuro.length;
  const fm = (wpi>=7 && sss>=5) || (wpi>=4 && wpi<=6 && sss>=9);
  const inflamLow = state.stiffness<30 && !state.swelling;
  state.signals = {wpi,sss,neuroN,neuro:neuroN>=4,fm,inflamLow};
  renderSignalCards();
  $("#signalIntro").hidden = false;
  $("#signalsNext").disabled = false;
}
$("#computeSignals").onclick = computeSignals;

function renderSignalCards(){
  const s = state.signals, out = [];
  if(s.neuro) out.push(`<div class="card signal-card neuro">
    <span class="score">${s.neuroN}/9</span><h3>Nerve-related pattern — right leg</h3>
    <p class="evidence">${state.neuro.slice(0,4).join(" · ")}${state.radiation?" · back-to-foot travel path":""}</p>
    <p class="discuss"><strong>Worth discussing:</strong> a neurological exam; whether tests such
    as EMG/NCS or imaging are appropriate for this pattern.</p>
    <details><summary>How this score works</summary>9 nerve-pattern descriptors; you selected
    ${s.neuroN}. Prototype screen modeled on validated neuropathic screening instruments.</details></div>`);
  if(s.fm) out.push(`<div class="card signal-card wide">
    <span class="score">WPI ${s.wpi}/19 · SSS ${s.sss}/12</span><h3>Widespread pain pattern — whole body</h3>
    <p class="evidence">pain in ${s.wpi} of 19 body areas · fatigue · unrefreshing sleep · concentration difficulty</p>
    <p class="discuss"><strong>Worth discussing:</strong> whether altered pain processing is part of
    the picture. This meets a common <em>screening</em> threshold used when clinicians consider
    conditions like fibromyalgia — <strong>a screening result, not a diagnosis</strong>.</p>
    <details><summary>How this score works</summary>Widespread Pain Index counts painful regions
    (0–19); Symptom Severity combines fatigue, sleep, and cognition ratings with other symptoms
    (0–12). Screening threshold: WPI≥7 and SSS≥5, or WPI 4–6 and SSS≥9.</details></div>`);
  out.push(s.inflamLow ?
    `<div class="card signal-card"><span class="score">low</span><h3>Inflammatory pattern — low signal</h3>
     <p class="evidence">morning stiffness ~${state.stiffness} min · ${state.swelling?"swelling reported":"no joint swelling reported"}</p>
     <p class="discuss">This pattern appears <strong>less likely</strong> from your answers — but
     only an exam and labs can assess it.</p></div>` :
    `<div class="card signal-card"><span class="score">check</span><h3>Inflammatory pattern — worth reviewing</h3>
     <p class="evidence">morning stiffness ~${state.stiffness} min${state.swelling?" · visible swelling":""}</p>
     <p class="discuss"><strong>Worth discussing:</strong> a joint exam and possibly labs (e.g., inflammation markers).</p></div>`);
  if(!s.neuro && !s.fm) out.unshift(`<div class="card signal-card"><h3>Localized / movement-linked pattern</h3>
    <p class="discuss"><strong>Worth discussing:</strong> examination of the painful area, activity
    modification, and physical therapy options.</p></div>`);
  $("#signalCards").innerHTML = out.join("");
}

/* ================= S6 QUESTIONS ================= */

const Q_BANK = {
  pc: [
    {id:"two", need:s=>s.neuro&&s.fm,
     en:"My pain seems to have two parts — burning pain running down my right leg to the foot, and a deep ache through my whole body with fatigue and poor sleep. Could these be two different kinds of pain needing different treatments?",
     ko:"제 통증은 두 가지인 것 같습니다 — 오른쪽 다리로 타고 내려가는 화끈거리는 통증과, 온몸의 깊은 통증·피로·수면 문제입니다. 서로 다른 종류의 통증이라서 다른 치료가 필요할 수 있을까요?",
     why:"Your descriptor screen and your body map showed two distinct patterns."},
    {id:"nerve", need:s=>s.neuro,
     en:"The leg pain is burning and electric and follows a path from my back to my foot. Could this suggest nerve involvement? What exam findings or tests would clarify it?",
     ko:"다리 통증이 화끈거리고 전기가 오는 것 같으며 허리에서 발까지 내려갑니다. 신경 문제일 수 있을까요? 어떤 진찰이나 검사가 도움이 될까요?",
     why:"You selected nerve-pattern descriptors and drew a back-to-foot travel path."},
    {id:"noci", need:s=>s.fm,
     en:"My whole-body ache covers many body areas and my labs have been normal. Could altered pain processing — like fibromyalgia — explain this pattern? Could we assess it using established criteria?",
     ko:"온몸 여러 군데가 아프고 검사 결과는 정상이었습니다. 섬유근육통 같은 통증 처리 변화가 원인일 수 있을까요? 정식 기준으로 평가해 볼 수 있을까요?",
     why:"Your widespread pain index and symptom severity met a common screening threshold."},
    {id:"med", need:s=>(s.neuro||s.fm),
     en:"If part of my pain is nerve-related or related to pain processing, would ibuprofen alone be expected to help it?",
     ko:"통증 일부가 신경성이거나 통증 처리와 관련이 있다면, 이부프로펜만으로 효과가 있을까요?",
     why:"Your treatment history shows only NSAIDs tried; nerve-pattern and widespread-pattern pain often need different medication classes."}
  ],
  rheum: [
    {id:"rludex", need:s=>s.fm,
     en:"My widespread pain index is high (many of 19 areas) with fatigue and unrefreshing sleep, but my morning stiffness lasts under 30 minutes and my joints don't visibly swell. Do we still need to rule out inflammatory arthritis, or can we move toward assessing centralized pain?",
     ko:"통증 부위가 많고 피로와 수면 문제가 있지만, 아침 뻣뻣함은 30분 미만이고 관절이 붓지는 않습니다. 염증성 관절염을 더 확인해야 할까요, 아니면 중추성 통증 평가로 넘어가도 될까요?",
     why:"Leads with the inflammatory negatives a rheumatologist screens for first."},
    {id:"rfm", need:s=>s.fm,
     en:"Could we formally assess fibromyalgia using established criteria at this visit?",
     ko:"이번 진료에서 정식 기준으로 섬유근육통 평가를 해볼 수 있을까요?",
     why:"Your screening scores met the common threshold used before formal assessment."},
    {id:"rnerve", need:s=>s.neuro,
     en:"Separately from the widespread ache, my right-leg pain is burning and travels from back to foot — should that be evaluated as a possible nerve issue alongside the rheumatology workup?",
     ko:"온몸 통증과는 별개로 오른쪽 다리 통증은 화끈거리며 허리에서 발까지 내려갑니다. 류마티스 검사와 함께 신경 문제도 평가해야 할까요?",
     why:"Keeps the second mechanism visible in a specialty visit focused on the first."}
  ]
};

$("#specialistToggle").addEventListener("click",e=>{
  if(!e.target.dataset.spec) return;
  $$("#specialistToggle .chip").forEach(c=>c.classList.remove("selected"));
  e.target.classList.add("selected");
  state.specialist = e.target.dataset.spec;
  renderQuestions();
});

function renderQuestions(){
  if(!state.signals) computeSignals();
  const qs = Q_BANK[state.specialist].filter(q=>q.need(state.signals));
  state.questions = qs;
  $("#questionList").innerHTML = qs.map(q=>`
    <div class="card q-item">
      <input type="checkbox" id="q_${q.id}" ${state.selectedQ.has(q.id)?"checked":""}>
      <div><label for="q_${q.id}"><strong>“${q.en}”</strong></label>
        <p class="q-ko">${q.ko}</p>
        <details class="why"><summary>Why this question</summary>${q.why}</details>
      </div></div>`).join("");
  qs.forEach(q=>{
    $("#q_"+q.id).onchange = e=>{
      e.target.checked ? state.selectedQ.add(q.id) : state.selectedQ.delete(q.id);
    };
  });
}

/* ================= S7 REPORT ================= */

function miniMaps(){
  const f = $("#figFront").cloneNode(true), b = $("#figBack").cloneNode(true);
  [f,b].forEach(svg=>{ svg.removeAttribute("id");
    svg.querySelectorAll(".region").forEach(r=>{ r.style.pointerEvents="none"; }); });
  return `<span class="rp-map">${f.outerHTML}${b.outerHTML}</span>`;
}
function renderReport(){
  if(!state.signals) computeSignals();
  const s = state.signals, st = state.story;
  const untried = [];
  const triedNames = state.treatments.filter(Boolean).map(t=>t[0]);
  if(s.neuro && !triedNames.some(t=>/nerve-pain|antidepressant/.test(t)))
    untried.push("neuropathic-class / centrally-acting medication — never trialed");
  if(!triedNames.includes("physical therapy"))
    untried.push("physical therapy — never tried");
  const selQ = state.questions.filter(q=>state.selectedQ.has(q.id));
  const flagLine = state.flagged.length
    ? `<span class="rp-flags urgent">POSITIVE: ${state.flagged.join("; ")} — patient advised to seek prompt care.</span>`
    : `<span class="rp-flags clear">None met on structured screen (bowel/bladder, saddle anesthesia,
       weakness, fever, weight loss, cancer hx, trauma: negative${state.flags.nightBranch?"; night pain positional":""}).</span>`;

  $("#reportPage").innerHTML = `
    <div class="rp-head">
      <div><h1>PAIN PHENOTYPE REPORT</h1>
        <div class="rp-sub">Patient-reported information summary — <strong>not a diagnosis</strong> · PainBridge prototype v0.9</div></div>
      <div class="rp-sub">Yoon, Soon-ja · 58F · Korean-speaking (daughter interprets)<br>
        Completed ${new Date().toISOString().slice(0,10)} · Session PB-DEMO-001</div>
    </div>
    ${st.priority?`<div class="rp-quote"><span class="ko">❝ ${st.priority} ❞</span><br>
      <em>${st.priorityGloss||""}</em> <span class="rp-sub">(patient priority, verbatim)</span></div>`:""}
    <div class="rp-grid">
      <div>
        <h4>Complaint</h4>
        <p>${st.onsetGloss||st.onset||"—"} → ${st.courseGloss||st.course||"—"}${state.gloss?`; plus
          previously unreported whole-body deep ache (${state.gloss})`:""}</p>
        <h4>Body map</h4>
        ${miniMaps()}
        <p>${s.wpi}/19 regions${state.radiation?"; dermatomal-appearing right posterior leg radiation trace":""}.
        Worse: ${st.worse.join(", ")||"—"}. Better: ${st.better.join(", ")||"—"}.</p>
        <h4>Function</h4>
        <p>PEG ${state.peg.pegPain} / ${state.peg.pegEnjoy} / ${state.peg.pegActivity}.
        Stopped church (sitting); struggles with work shifts; unrefreshing sleep.</p>
      </div>
      <div>
        <h4>Signals to discuss <em>(screening scores, not diagnoses)</em></h4>
        ${s.neuro?`<div class="rp-sig neuro"><strong>Neuropathic-pattern, right leg — ${s.neuroN}/9</strong><br>
          ${state.neuro.slice(0,3).join(", ")}; sitting-provoked${state.radiation?"; back-to-foot path":""}</div>`:""}
        ${s.fm?`<div class="rp-sig wide"><strong>Widespread pain — WPI ${s.wpi}/19, SSS ${s.sss}/12</strong><br>
          meets common screening threshold for centralized pain / FM assessment</div>`:""}
        <div class="rp-sig"><strong>Inflammatory — ${s.inflamLow?"LOW":"review"}</strong>:
          stiffness ~${state.stiffness} min, ${state.swelling?"swelling reported":"no reported swelling"}</div>
        <h4>Red flags</h4>${flagLine}
        <h4>Treatment history</h4>
        <ul>${state.treatments.filter(Boolean).map(t=>`<li>${t[0]} — ${t[1]||"tried"}</li>`).join("")}
        ${untried.map(u=>`<li><em>${u}</em></li>`).join("")}</ul>
      </div>
    </div>
    <h4>Patient-selected questions</h4>
    <ul>${(selQ.length?selQ:state.questions).map(q=>`<li>${q.en}</li>`).join("")||"<li>—</li>"}</ul>
    <div class="rp-foot">Summarizes patient self-report via structured screening instruments
      (nerve-pattern descriptor screen; widespread pain / symptom severity indices; PEG).
      Supplements, not replaces, clinical assessment. Scoring methods: painbridge.example/methods</div>`;

  const sheetQ = (selQ.length?selQ:state.questions);
  $("#patientSheet").innerHTML = `
    <h1>My visit preparation sheet · 나의 진료 준비서</h1>
    <p>Bring this to your appointment. Your one-page summary is attached for your clinician.</p>
    <h4>My questions · 내 질문</h4>
    ${sheetQ.map(q=>`<div class="big-q">${q.ko}<br><em style="font-weight:400;font-size:13.5px">${q.en}</em></div>`).join("")}
    <h4>What I most want understood · 가장 알아주었으면 하는 것</h4>
    <div class="big-q">${st.priority||"—"}</div>
    <p class="rp-foot">${state.flagged.length?
      "Some answers matched urgent patterns — contact a clinician today.":
      "No urgent warning signs were found in what you entered. If you develop new bladder/bowel problems, groin numbness, or new leg weakness, seek emergency care immediately."}</p>`;
}
$("#viewClin").onclick = ()=>{ $("#reportPage").hidden=false; $("#patientSheet").hidden=true;
  $("#viewClin").classList.add("selected"); $("#viewPatient").classList.remove("selected"); };
$("#viewPatient").onclick = ()=>{ $("#reportPage").hidden=true; $("#patientSheet").hidden=false;
  $("#viewPatient").classList.add("selected"); $("#viewClin").classList.remove("selected"); };

/* ================= S8 PATHWAY ================= */

function renderPathways(){
  if(!state.signals) computeSignals();
  const s = state.signals, cards = [];
  if(s.neuro) cards.push(`<div class="card pathway-card neuro">
    <h3>For the nerve-pattern leg pain, clinicians often discuss:</h3>
    <ul><li>a neurological examination</li>
    <li>imaging <em>only if exam findings support it</em></li>
    <li>physical therapy</li>
    <li>medications used for nerve pain (different from ibuprofen)</li></ul></div>`);
  if(s.fm) cards.push(`<div class="card pathway-card wide">
    <h3>For the widespread-pain pattern, clinicians often discuss:</h3>
    <ul><li>understanding pain-processing changes (pain neuroscience education)</li>
    <li>sleep treatment</li><li>paced, gradually increasing activity</li>
    <li>pain-focused CBT/ACT</li>
    <li>certain non-opioid medications that act on pain processing</li></ul></div>`);
  cards.push(`<div class="card pathway-card guard">
    <h3>Often <em>not</em> helpful for patterns like yours <span class="hint">(worth asking about before pursuing)</span></h3>
    <ul><li>repeat imaging without new exam findings</li><li>long bed rest</li>
    <li>opioids as a first-line treatment for this pattern</li></ul></div>`);
  $("#pathwayCards").innerHTML = cards.join("");
}

/* ================= PERSONA LOADER ================= */

function loadPersona(){
  state.personaLoaded = true;
  Object.assign(state.story, PERSONA.story);
  $("#onset").value = PERSONA.story.onset;   $("#onsetGloss").textContent = "→ "+PERSONA.story.onsetGloss;
  $("#course").value = PERSONA.story.course; $("#courseGloss").textContent = "→ "+PERSONA.story.courseGloss;
  $("#priority").value = PERSONA.story.priority; $("#priorityGloss").textContent = "→ \""+PERSONA.story.priorityGloss+"\"";
  chipGroup($("#worseChips"), WORSE_OPTS, state.story.worse);
  chipGroup($("#betterChips"), BETTER_OPTS, state.story.better);

  state.regions = {...PERSONA.regions}; paintRegions();
  state.radiation = PERSONA.radiation; paintRadiation();
  state.qualities = [...PERSONA.qualities];
  chipGroup($("#qualityChips"), QUALITY_OPTS, state.qualities);

  state.idiom = PERSONA.idiom; $("#idiomInput").value = PERSONA.idiom;
  runClarifiers(PERSONA.clarifierAnswers);

  FLAGS.forEach(f=>{
    const div = document.querySelector(`.flag-item[data-flag="${f.id}"]`);
    answerFlag(f, div, PERSONA.flags[f.id]);
    if(f.branch && PERSONA.flags[f.id]==="yes"){
      state.flags[f.id+"Branch"] = PERSONA.flags.nightBranch;
      const br = div.querySelector(".flag-branch");
      if(br) br.querySelectorAll(".chip").forEach(c=>c.classList.toggle("selected",c.dataset.b===PERSONA.flags.nightBranch));
    }
  });
  evalFlags();

  state.neuro = [...PERSONA.neuro];
  chipGroup($("#neuroChips"), NEURO_ITEMS, state.neuro);
  Object.assign(state.sss, PERSONA.sss);
  state.sssSymptoms = [...PERSONA.sssSymptoms];
  chipGroup($("#sssSymptoms"), SSS_SYMPTOMS, state.sssSymptoms);
  SSS_SLIDERS.forEach(s=>{ $("#"+s.id).value = state.sss[s.id]; $("#"+s.id+"Out").textContent = state.sss[s.id]; });
  state.stiffness = PERSONA.stiffness; $("#stiffness").value = PERSONA.stiffness;
  state.swelling = PERSONA.swelling; $("#swelling").checked = PERSONA.swelling;
  Object.assign(state.peg, PERSONA.peg);
  PEG_ITEMS.forEach(s=>{ $("#"+s.id).value = state.peg[s.id]; $("#"+s.id+"Out").textContent = state.peg[s.id]; });
  state.treatments = PERSONA.treatments.map(t=>[...t]);
  const rows = $$("#treatmentList .treat-row");
  PERSONA.treatments.forEach((t,i)=>{
    if(!rows[i]) return;
    const [s1,s2] = rows[i].querySelectorAll("select");
    s1.value = t[0]; s2.value = t[1];
  });
  computeSignals();
  state.selectedQ = new Set(["two","nerve","med"]);
  goto(1);
}
$("#loadPersona").onclick = loadPersona;

/* ================= INIT ================= */

buildRail(); initStory(); initBodyMap(); initFlags(); initSignalInputs(); goto(0);
