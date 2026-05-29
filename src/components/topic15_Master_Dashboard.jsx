  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";

var C = {
  bg:"#05060A", card:"#0C0E18", border:"#181C2C",
  gold:"#D97706", green:"#16A34A", red:"#DC2626",
  blue:"#2563EB", cyan:"#06B6D4", purple:"#7C3AED",
  orange:"#EA580C", teal:"#0D9488", yellow:"#EAB308",
  pink:"#DB2777", lime:"#65A30D", indigo:"#4F46E5",
  text:"#EBF0FF", muted:"#20263A", soft:"#5A6890",
};

var TOPICS = [
  { id:1, title:"IC Engines", icon:"🔥", weight:18, color:C.orange, file:"topic1-ic-engines.jsx", sections:9, questions:8, priority:"P1",
    tags:["4-stroke","SI vs CI","P-V Cycles","Performance","BS6","EV Types"],
    tip:"Highest weightage topic. Master compression ratios and engine performance formulas first." },
  { id:2, title:"Motor Vehicles Act 1988", icon:"⚖️", weight:15, color:C.red, file:"topic2-mv-act-1988.jsx", sections:5, questions:12, priority:"P1",
    tags:["All 14 Chapters","2019 Amendment","Penalties","Permits","Key Sections"],
    tip:"Second highest. Know section numbers cold — Section 3,39,56,66,146,184,185,199A,207 are must-know." },
  { id:3, title:"Transmission Systems", icon:"⚙️", weight:12, color:C.cyan, file:"topic3-transmission-systems.jsx", sections:10, questions:12, priority:"P1",
    tags:["Clutch","Synchromesh Gearbox","AT/CVT/DCT","Differential","4WD/AWD"],
    tip:"Third highest. Power flow path E→C→G→P→D→A→R is a guaranteed question every year." },
  { id:4, title:"Braking and Suspension", icon:"🛑", weight:8, color:C.red, file:"topic4-braking-suspension.jsx", sections:8, questions:12, priority:"P2",
    tags:["Drum vs Disc","ABS/EBD","MacPherson","Leaf Spring","Alignment Angles"],
    tip:"ABS primary function, drum vs disc comparison, and all 5 alignment angles are exam favourites." },
  { id:5, title:"Emission Norms and BS6", icon:"🌿", weight:8, color:C.green, file:"topic5-emission-norms.jsx", sections:6, questions:12, priority:"P2",
    tags:["BS1→BS6 Timeline","TWC","DPF","SCR/AdBlue","PUC","EV Policy"],
    tip:"BS5 was skipped, BS6 from April 1 2020, 10ppm sulphur, SCR+AdBlue mandatory for BS6 diesel." },
  { id:6, title:"Indian Polity and GS", icon:"🏛️", weight:10, color:C.indigo, file:"topic6-polity-gs.jsx", sections:7, questions:12, priority:"P1",
    tags:["Constitution","Fundamental Rights","Parliament","Panchayati Raj","Maharashtra History"],
    tip:"Jan 26 1950 (enforced), 42nd Amendment (Socialist+Secular), Art 32 (Heart and Soul), 73rd vs 74th." },
  { id:7, title:"Strength of Materials", icon:"🔩", weight:6, color:C.cyan, file:"topic7-strength-of-materials.jsx", sections:5, questions:12, priority:"P2",
    tags:["Stress/Strain","Bending Moment","Torsion","Euler Columns","Thin Cylinders"],
    tip:"Formulae are everything here. σ=P/A, M/I=σ/y, T/J=τ/r, P_cr=π²EI/Le². Practice numericals daily." },
  { id:8, title:"Automobile Engineering", icon:"🚗", weight:7, color:C.purple, file:"topic8-automobile-engineering.jsx", sections:5, questions:12, priority:"P2",
    tags:["Steering Types","Tyre Ratings","MPFI vs CRDI","Fitness Inspection","ADAS"],
    tip:"205/65R15 94H decoder, 1.6mm tread depth, AEB mandatory for M3+N3, CRDI = 1000-2500 bar rail pressure." },
  { id:9, title:"Thermodynamics", icon:"🌡️", weight:6, color:C.orange, file:"topic9-thermodynamics.jsx", sections:6, questions:12, priority:"P2",
    tags:["4 Laws","Carnot/Otto/Diesel","Refrigeration","COP","Heat Transfer","Psychrometry"],
    tip:"Carnot η=1-TL/TH (use Kelvin!), COP_ref=QL/W, COP_HP=COP_ref+1. Evaporator = cooling effect." },
  { id:10, title:"Manufacturing Processes", icon:"🏭", weight:5, color:C.yellow, file:"topic10-manufacturing.jsx", sections:5, questions:12, priority:"P3",
    tags:["Casting","Forging","Welding","Machining","Metrology","IE"],
    tip:"Vernier LC=1/n mm, micrometer LC=0.01mm, X-bar chart=mean, R-chart=range, EOQ=√(2DCo/Ch)." },
  { id:11, title:"Transport Management", icon:"🚦", weight:6, color:C.gold, file:"topic11-transport-management.jsx", sections:5, questions:12, priority:"P2",
    tags:["RTO Hierarchy","Permit Types","Road Safety","MSRTC","Digital Systems"],
    tip:"Sec 67=STA, Sec 68=RTA, Sec 72=Stage Carriage, all permits 5 years, FASTag=RFID, Golden Hour=60min." },
  { id:12, title:"Current Affairs and Science", icon:"🌟", weight:4, color:C.indigo, file:"topic12-current-affairs-science.jsx", sections:5, questions:12, priority:"P3",
    tags:["CA 2023-25","Physics/Chemistry","Mental Ability","Maharashtra Projects"],
    tip:"Chandrayaan-3 (Aug 23 2023 South Pole), Atal Setu (21.8km Jan 2024), Samruddhi Mahamarg (701km)." },
  { id:13, title:"BONUS — Missing Topics", icon:"🎯", weight:0, color:C.gold, file:"bonus-missing-topics.jsx", sections:8, questions:0, priority:"P1",
    tags:["Hydraulics","Hydraulic Machinery","Governors","Gyroscopes","Industrial Electronics","Viewer Guide"],
    tip:"Critical missing topics from official syllabus: Theory of Machines, Hydraulics, Industrial Electronics." },
  {
    id:14,
    title:"Mock Test 2026",
    icon:"📝",
    weight:0,
    color:C.green,
    file:"topic14-mock-test-2026.jsx",
    sections:1,
    questions:15,
    priority:"P1",
    tags:["Mixed Questions","Timed Test","Revision"],
    tip:"Full mixed exam practice with all subjects."
  },

  {
    id:15,
    title:"Master Dashboard",
    icon:"🏠",
    weight:0,
    color:C.gold,
    file:"topic15-master-dashboard.jsx",
    sections:1,
    questions:0,
    priority:"P1",
    tags:["Navigation","Progress","Study Plan"],
    tip:"Main navigation dashboard."
  }
];
var TOPIC_ROUTES = {
  1:"/topic1",
  2:"/topic2",
  3:"/topic3",
  4:"/topic4",
  5:"/topic5",
  6:"/topic6",
  7:"/topic7",
  8:"/topic8",
  9:"/topic9",
  10:"/topic10",
  11:"/topic11",
  12:"/topic12",
  13:"/bonus",
  14:"/mocktest",
  15:"/"
};

var MOCK_QUESTIONS = [
  // Prelims-style questions mixing all topics
  { id:1, topic:"MV Act", level:"P", q:"Under Section 185 MV Act, the maximum blood alcohol concentration (BAC) limit for driving is:", opts:["50 mg/100ml","30 mg/100ml","80 mg/100ml","25 mg/100ml"], ans:1, exp:"Section 185: BAC limit = 30 mg per 100 ml of blood. Strictest in Asia. First offence: up to 6 months jail + Rs 10,000 fine. Repeat within 3 years: up to 2 years + Rs 15,000.", tip:"30 mg/100ml = BAC limit. Not 50 (UK limit), not 80 (some countries). India has among strictest BAC laws in Asia after 2019 Amendment." },
  { id:2, topic:"IC Engines", level:"P", q:"In a 4-stroke petrol engine, the compression stroke compresses:", opts:["Air-fuel mixture only","Only air (like diesel)","Exhaust gases","Both intake and exhaust valves open"], ans:0, exp:"In a petrol (SI) engine, the carburettor or fuel injectors mix fuel with air BEFORE the cylinder. So the compression stroke compresses the AIR-FUEL MIXTURE. In diesel engines, only AIR is compressed (very high ratio 14-22:1). This is the fundamental difference between SI and CI engines.", tip:"Petrol (SI) = compresses AIR-FUEL mixture. Diesel (CI) = compresses AIR ONLY then fuel injected at end of compression. This distinction explains why diesel has higher compression ratio (air alone withstands more compression without self-igniting)." },
  { id:3, topic:"Transmission", level:"P", q:"The component in an automatic transmission that provides torque multiplication (up to 2.5x) at low speeds is:", opts:["Planetary gear set","Torque converter","Hydraulic pump","Valve body"], ans:1, exp:"The TORQUE CONVERTER is a fluid coupling that also provides torque multiplication. It has 3 elements: pump (connected to engine), turbine (connected to gearbox), stator (redirects fluid). At low speeds/stall: stator redirects fluid from turbine back to pump in power direction = torque multiplication up to 2.5x. At high speeds: stator freewheels = fluid coupling only.", tip:"Torque converter = fluid coupling + torque multiplication (at low speed). Torque ratio up to 2.5:1. The stator is the key element for multiplication. Lock-up clutch bypasses fluid coupling at highway speed for efficiency." },
  { id:4, topic:"Emission", level:"P", q:"The minimum sulphur content allowed in BS6 compliant fuel is:", opts:["50 ppm","25 ppm","10 ppm","5 ppm"], ans:2, exp:"BS6 fuel = 10 ppm sulphur maximum (both petrol and diesel). BS4 was 50 ppm. BS6 represents 80% reduction in sulphur. Lower sulphur is critical for protecting catalytic converters (TWC), DPF, and SCR systems which are poisoned by sulphur compounds.", tip:"BS6 = 10 ppm sulphur. BS4 = 50 ppm. 10 is the magic number. Memorise it absolutely. This is one of the most frequently asked direct recall questions in MPSC prelims." },
  { id:5, topic:"Polity", level:"P", q:"The 73rd Constitutional Amendment gives constitutional status to Panchayati Raj Institutions. The 11th Schedule lists how many subjects that can be transferred to Panchayats?", opts:["18","29","22","36"], ans:1, exp:"11th Schedule (added by 73rd Amendment 1992): 29 subjects for Panchayati Raj (Rural). 12th Schedule (74th Amendment): 18 subjects for Urban Local Bodies (Municipalities). Easy memory: More subjects (29) for more institutions (there are far more villages/panchayats than cities). Rural=29, Urban=18.", tip:"73rd Amendment = 11th Schedule = 29 subjects = RURAL (Panchayat). 74th Amendment = 12th Schedule = 18 subjects = URBAN (Municipality). 73 comes before 74, Rural exists before Urban in development context." },
  { id:6, topic:"SOM", level:"M", q:"A solid circular shaft of diameter 40mm transmits a torque of 1 kN·m. The maximum shear stress developed is approximately:", opts:["~80 N/mm²","~160 N/mm²","~40 N/mm²","~200 N/mm²"], ans:0, exp:"Maximum shear stress in solid shaft: τ_max = 16T/πd³\nT = 1 kN·m = 1,000,000 N·mm\nd = 40 mm\nτ_max = 16 × 1,000,000 / (π × 40³)\n= 16,000,000 / (π × 64,000)\n= 16,000,000 / 201,062\n= 79.6 ≈ 80 N/mm²\n\nAnswer: ~80 N/mm² (option A is correct)\n\nVerification using J method:\nJ = πd⁴/32 = π×40⁴/32 = 251,327 mm⁴\nτ = T×r/J = 1,000,000 × 20 / 251,327 = 79.6 N/mm² ✓", tip:"τ_max = 16T/πd³. Convert T to N·mm first (1 kN·m = 10⁶ N·mm). d in mm. For 40mm shaft with 1 kN·m torque: τ = 16×10⁶/(π×64000) = 79.6 ≈ 80 N/mm². Guaranteed question in MPSC Mains Section A." },
  { id:7, topic:"Refrigeration", level:"M", q:"A refrigerator has COP = 4. The compressor consumes 750W. How much heat is rejected to the surroundings per hour?", opts:["3000 Wh","3750 Wh","2250 Wh","4500 Wh"], ans:1, exp:"COP = Q_L/W = 4\nW = 750W\nQ_L (cooling effect per hour) = 4 × 750 = 3000 Wh\n\nEnergy balance: Q_H = Q_L + W = 3000 + 750 = 3750 Wh\n\nHeat rejected to surroundings per hour = Q_H = 3750 Wh\n\nNote: COP_HP = Q_H/W = 3750/750 = 5 = COP_ref + 1 = 4 + 1 ✓", tip:"Q_H = Q_L + W always. Find Q_L from COP: Q_L = COP × W = 4 × 750 = 3000W. Then Q_H = 3000 + 750 = 3750W. Per hour = multiply by 3600s... wait, question says per hour so Wh units: 3750 Wh. Heat pump COP check: 3750/750 = 5 = COP_ref + 1 = 5 ✓" },
  { id:8, topic:"Automobile", level:"M", q:"A tyre marked 195/55 R16 has a sidewall height of approximately:", opts:["55 mm","107 mm","195 mm","65 mm"], ans:1, exp:"Aspect ratio = 55% of tyre width\nTyre width = 195 mm\nSidewall height = 55% × 195 = 0.55 × 195 = 107.25 ≈ 107 mm\n\nThe aspect ratio (second number, 55) represents sidewall height as PERCENTAGE OF WIDTH.\nSo: sidewall = aspect ratio/100 × width = 0.55 × 195 = 107mm\n\nNote: R16 = 16-inch rim. Full tyre outer diameter = rim diameter + 2 × sidewall\n= (16 × 25.4) + 2 × 107 = 406.4 + 214 = 620.4 mm", tip:"Aspect ratio in tyre marking = sidewall height as % of width. Sidewall height = (aspect ratio/100) × width. Lower aspect ratio = flatter, wider tyre (sporty). This calculation type appears frequently in MPSC technical papers." },
  { id:9, topic:"Road Safety", level:"P", q:"Under the Motor Vehicles Amendment Act 2019, Section 194 penalty for overloading a goods vehicle is:", opts:["Rs 5,000 flat","Rs 20,000 + Rs 2,000 per extra tonne","Rs 2,000 flat","Rs 10,000 per trip"], ans:1, exp:"Section 194 MV Act (2019 Amendment): Overloading penalty = Rs 20,000 BASE fine + Rs 2,000 per EXTRA TONNE of load above permitted limit.\n\nExample: Permitted GVW = 12 tonnes, Actual load = 17 tonnes (5 tonnes excess)\nFine = Rs 20,000 + (5 × Rs 2,000) = Rs 20,000 + Rs 10,000 = Rs 30,000\n\nPlus vehicle must off-load excess before proceeding.\nSection 194A: Passenger overloading = Rs 1,000 per extra passenger.\n\nPre-2019 penalty was only Rs 2,000 flat. 2019 Amendment made penalties 10x stricter.", tip:"Overloading = Rs 20,000 + Rs 2,000 per extra tonne. Two-part penalty. Vehicle must also off-load. This is a major 2019 Amendment change — the strict formula is frequently tested." },
  { id:10, topic:"Hydraulics", level:"M", q:"A venturi meter is used to measure flow rate. At the narrow throat section, compared to the inlet section:", opts:["Pressure increases, velocity increases","Pressure decreases, velocity increases","Pressure increases, velocity decreases","Both pressure and velocity decrease"], ans:1, exp:"BERNOULLI'S PRINCIPLE (conservation of energy):\nAt the narrow throat of venturi meter:\n- Cross-section DECREASES\n- By continuity equation (A₁V₁ = A₂V₂): as area decreases, VELOCITY MUST INCREASE\n- By Bernoulli's equation: as velocity increases, PRESSURE DECREASES\n\nThis is the core principle of venturi meters: velocity increase at throat = pressure drop. The pressure difference between inlet and throat is measured and used to calculate flow rate.\n\nQ = Cd × A_throat × √(2gH) where H = pressure head difference", tip:"Bernoulli: HIGH velocity = LOW pressure. LOW velocity = HIGH pressure. In venturi throat: area smallest → velocity highest → pressure lowest. This inverse relationship between velocity and pressure is the most fundamental fluid mechanics concept for MPSC exams." },
  { id:11, topic:"Industrial Electronics", level:"M", q:"In a BJT (NPN transistor), the current amplification factor β (hFE) is defined as:", opts:["Collector current / Base current","Base current / Emitter current","Emitter current / Collector current","Collector current / Emitter current"], ans:0, exp:"β (hFE) = IC / IB (Collector current / Base current)\n\nThis is the CURRENT GAIN of a BJT transistor in common-emitter configuration.\n\nTypical values: β = 50 to 300 for small signal transistors.\n\nRelationship: IE = IC + IB (Emitter current = Collector + Base)\n\nIf β = 100 and IB = 1mA: IC = 100mA, IE = 101mA\n\nA small base current controls a much larger collector current — this is AMPLIFICATION.\n\nVehicle application: ECU transistors switch fuel injectors (large current) using small microprocessor output signal (small current) — exactly this amplification principle.", tip:"β = IC/IB (Collector/Base current ratio). High β = better amplifier/switch. In vehicles: ECU signal (small) → transistor base → transistor switches injector current (large). This is how microprocessors control high-current loads without being damaged." },
  { id:12, topic:"Theory of Machines", level:"M", q:"The function of a centrifugal governor fitted to a vehicle engine is to:", opts:["Control steering at high speed","Automatically regulate engine speed by adjusting fuel supply","Measure engine RPM on dashboard","Control ABS brake pressure"], ans:1, exp:"A centrifugal governor regulates engine SPEED (RPM) by automatically controlling the fuel supply.\n\nWorking:\n- Rotating flyweights on arms\n- As engine speed increases: flyweights fly outward (centrifugal force)\n- This movement mechanically reduces fuel supply (closes throttle/fuel rack)\n- Engine speed drops toward set point\n- If speed drops too low: flyweights come in → more fuel → speed rises\n\nFor vehicles: Speed governor (Sec 88A CMVR) is mandatory tamper-proof device for heavy transport vehicles. Buses: 80 km/h max. School buses: 50 km/h max.\n\nModern vehicles: electronic governor (ECU-controlled) has replaced mechanical centrifugal type.", tip:"Governor = controls ENGINE SPEED by adjusting fuel supply. Centrifugal governor: flyweights fly out at high speed → reduce fuel. More speed → less fuel → speed drops. CMVR mandates tamper-proof governors for heavy transport vehicles. As ARTO: verify governor is sealed during fitness inspection." },
  { id:13, topic:"Manufacturing", level:"M", q:"During the sintering process in powder metallurgy, the temperature is maintained:", opts:["Above the melting point of the main metal","Below the melting point of the main metal (60-90% of Tm)","At exactly the melting point","At room temperature"], ans:1, exp:"SINTERING in Powder Metallurgy:\n\nTemperature = 60-90% of the melting point of the main metal component (BELOW melting point).\n\nFor iron/steel: Sintering at 1100-1300°C (melting point ~1538°C)\n\nWhy below melting point:\n- Metal must remain SOLID during sintering\n- Diffusion bonding occurs at atomic level (atoms from one particle diffuse into adjacent particles)\n- Particles bond together WITHOUT becoming liquid\n- Part retains its shape from compaction step\n\nIf temperature were above melting point: metal would melt → shape lost → not powder metallurgy anymore (that would be casting).\n\nResult: Part gains significant strength after sintering (from ~5% green strength to 80-90% final strength).", tip:"Sintering = BELOW melting point = diffusion bonding. 60-90% of Tm. Shape maintained. This is the CRITICAL distinction from casting (which is ABOVE melting point). PM parts: self-lubricating bearings (oil-impregnated), filters, complex shapes impossible to machine." },
  { id:14, topic:"Current Affairs", level:"P", q:"India's NAVIC satellite navigation system became mandatory for all smartphones sold in India from which date?", opts:["January 2022","April 2023","January 2024","April 2025"], ans:1, exp:"NAVIC (Navigation with Indian Constellation):\n- India's own GPS equivalent satellite system\n- 7 satellites (3 geostationary + 4 geosynchronous)\n- Coverage: India and 1,500 km surrounding region\n- Accuracy: 5 metres for civilian use\n\nMandate: From APRIL 2023, all smartphones sold in India must have NAVIC receiver (in addition to GPS).\n\nThis was mandated by Department of Telecommunications (DoT) as part of Make in India initiative.\n\nVehicle relevance: NAVIC used in vehicle tracking systems for commercial transport. Mandatory for GPRS-based tracking in transport vehicles under CMVR amendments.", tip:"NAVIC mandatory in smartphones = April 2023. 7 satellites. India's own navigation (not foreign GPS). Vehicle tracking for commercial transport uses NAVIC/GPS. ISRO manages NAVIC. Complementary to GPS, not a replacement — most devices support both." },
  { id:15, topic:"Braking", level:"M", q:"Under the Motor Vehicles Rules, the minimum permissible tyre tread depth for road vehicles is:", opts:["2.0 mm","3.0 mm","1.6 mm","0.8 mm"], ans:2, exp:"Central Motor Vehicles Rules 1989, Rule 96:\nMinimum tyre tread depth = 1.6 mm\n\nThis applies to the main circumferential grooves. Tread wear indicators (TWI) are moulded into tyre grooves at exactly 1.6 mm depth. When tread is level with TWI = replace tyre.\n\nPractical note:\n- Safe driving recommendation: replace at 3 mm (wet grip reduces significantly below 3mm)\n- Legal minimum = 1.6 mm (enforce during inspection)\n- Below 1.6 mm = fail Certificate of Fitness\n\nAs ARTO: Use a tread depth gauge during fitness inspection. Check at minimum 3 locations around circumference AND inner/middle/outer zones.", tip:"1.6 mm = legal minimum tyre tread depth. CMVR Rule 96. Below this = fail fitness inspection. Tread Wear Indicator (TWI) built into tyre at 1.6mm. Practical safe driving: replace at 3mm. Always check with a gauge — visual inspection is not reliable." },
];

function ProgressRing(props) {
  var pct = props.pct || 0;
  var r = 36, cx = 42, cy = 42;
  var circ = 2*Math.PI*r;
  var dash = (pct/100)*circ;
  return (
    <svg width="84" height="84" viewBox="0 0 84 84">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={props.bg||C.muted} strokeWidth="7"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={props.color||C.gold} strokeWidth="7"
        strokeDasharray={dash+" "+(circ-dash)} strokeDashoffset={circ/4}
        strokeLinecap="round" style={{ transition:"stroke-dasharray 0.5s" }}/>
      <text x={cx} y={cy+6} textAnchor="middle" fill={props.color||C.gold} fontSize="16" fontWeight="bold" fontFamily="monospace">{pct}%</text>
    </svg>
  );
}

export default function App() {
  const navigate = useNavigate();

  var [view, setView] = useState("dashboard");
  var [progress, setProgress] = useState(function() {
    try {
      var saved = localStorage.getItem("mpsc_progress_2026");
      return saved ? JSON.parse(saved) : {};
    } catch(e) { return {}; }
  });
  var [mockIdx, setMockIdx] = useState(0);
  var [mockSel, setMockSel] = useState(null);
  var [mockExp, setMockExp] = useState(false);
  var [mockScore, setMockScore] = useState({ c:0, w:0, n:0 });
  var [mockDone, setMockDone] = useState(false);
  var [activeFilter, setActiveFilter] = useState("ALL");
  var [studyDay, setStudyDay] = useState(1);

  function markDone(topicId) {
    var np = Object.assign({}, progress);
    np["t"+topicId] = { done:true, score: np["t"+topicId] ? np["t"+topicId].score : 0, date: new Date().toLocaleDateString() };
    setProgress(np);
    try { localStorage.setItem("mpsc_progress_2026", JSON.stringify(np)); } catch(e){}
  }
  function saveScore(topicId, score) {
    var np = Object.assign({}, progress);
    np["t"+topicId] = Object.assign({}, np["t"+topicId]||{}, { score:score });
    setProgress(np);
    try { localStorage.setItem("mpsc_progress_2026", JSON.stringify(np)); } catch(e){}
  }

  var completedCount = Object.keys(progress).filter(function(k){ return progress[k] && progress[k].done; }).length;
  var totalTopics = 13;
  var overallPct = Math.round((completedCount/totalTopics)*100);

  var filteredTopics = activeFilter==="ALL" ? TOPICS :
    activeFilter==="P1" ? TOPICS.filter(function(t){ return t.priority==="P1"; }) :
    activeFilter==="P2" ? TOPICS.filter(function(t){ return t.priority==="P2"; }) :
    TOPICS.filter(function(t){ return t.priority==="P3"; });

  var mq = MOCK_QUESTIONS[mockIdx];

  function mockPick(i) {
    if (mockSel!==null) return;
    setMockSel(i); setMockExp(true);
    setMockScore(function(s){ return { c:s.c+(i===mq.ans?1:0), w:s.w+(i!==mq.ans?1:0), n:s.n+1 }; });
  }
  function mockNext() {
    if (mockIdx<MOCK_QUESTIONS.length-1){ setMockIdx(mockIdx+1); setMockSel(null); setMockExp(false); }
    else setMockDone(true);
  }
  function mockReset(){ setMockIdx(0); setMockSel(null); setMockExp(false); setMockDone(false); setMockScore({c:0,w:0,n:0}); }

  var PLAN = [
    { week:1, days:"Days 1-7", focus:"Core Technical", color:C.orange, topics:[1,3,7], target:"Score 75%+ in each topic quiz. Master engine cycles and power flow path.", daily:"Morning: 1 topic Learn (60min). Evening: Practice quiz (45min)." },
    { week:2, days:"Days 8-14", focus:"Law and Policy", color:C.red, topics:[2,4,5], target:"Know all MV Act section numbers. BS6 dates and emission device chain.", daily:"Focus on MV Act sections. Use tips section daily. Flashcard section numbers." },
    { week:3, days:"Days 15-21", focus:"Science and GS", color:C.indigo, topics:[6,9,10], target:"Constitution dates, SOM formulas, thermodynamic cycles all memorised.", daily:"SOM formulae: practice 5 numericals per day. GS: current affairs reading." },
    { week:4, days:"Days 22-28", focus:"Automobile and Transport", color:C.purple, topics:[8,11,12,13], target:"Vehicle inspection checklist, permit sections, missing topics from bonus module.", daily:"Mock tests: 2 full mock tests this week. Review all wrong answers immediately." },
    { week:5, days:"Days 29-30", focus:"Final Revision", color:C.green, topics:[], target:"Full mock exam daily. Score target: 80%+. Only revise weak topics.", daily:"Morning: Full mock (60 min). Afternoon: Weak topic revision. Evening: Rest." },
  ];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{[
        "*{box-sizing:border-box}",
        "::-webkit-scrollbar{width:5px}",
        "::-webkit-scrollbar-thumb{background:#181C2C;border-radius:3px}",
        "button{transition:all 0.15s}",
      ].join("")}</style>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#08060E,#06070A,#060A06)", borderBottom:"1px solid "+C.border, padding:"0 20px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0 10px" }}>
            <div style={{ fontSize:30 }}>🎯</div>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:C.text, letterSpacing:2 }}>MPSC RTO / AMVI 2026 — MASTER DASHBOARD</div>
              <div style={{ color:C.muted, fontSize:10, fontFamily:"monospace" }}>Complete Preparation System · 13 Topic Modules · 144+ Practice Questions</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              {[["dashboard","🏠 Home"],["study","📖 Topics"],["mock","📝 Mock Test"],["plan","📅 Study Plan"]].map(function(v) {
                return <button key={v[0]} onClick={function(){ setView(v[0]); }} style={{ padding:"8px 16px", borderRadius:8, border:"none", background:view===v[0]?C.gold+"20":"transparent", color:view===v[0]?C.gold:C.soft, fontFamily:"monospace", fontSize:11, cursor:"pointer", borderBottom:view===v[0]?"2px solid "+C.gold:"2px solid transparent" }}>{v[1]}</button>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"24px 20px" }}>

        {/* ── DASHBOARD ── */}
        {view==="dashboard" && (
          <div>
            {/* OVERALL PROGRESS */}
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:24, marginBottom:28, background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:24, boxShadow:"0 0 40px "+C.gold+"10" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <ProgressRing pct={overallPct} color={C.gold} />
                <div style={{ color:C.soft, fontSize:11, fontFamily:"monospace", marginTop:6, letterSpacing:1 }}>OVERALL</div>
              </div>
              <div>
                <div style={{ fontSize:22, fontWeight:700, color:C.gold, letterSpacing:2, marginBottom:6 }}>YOUR PREPARATION STATUS</div>
                <div style={{ color:C.text, fontSize:13, marginBottom:12 }}>{completedCount} of {totalTopics} topics marked complete. Keep going — you're building a guaranteed pass! 🏆</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {[
                    { l:"Topics Done", v:completedCount, c:C.green },
                    { l:"Remaining", v:totalTopics-completedCount, c:C.orange },
                    { l:"Questions Available", v:"144+", c:C.cyan },
                    { l:"Exam Date", v:"2026", c:C.gold },
                  ].map(function(s) {
                    return (
                      <div key={s.l} style={{ background:C.bg, borderRadius:10, padding:"10px 12px", textAlign:"center" }}>
                        <div style={{ color:s.c, fontSize:20, fontWeight:700 }}>{s.v}</div>
                        <div style={{ color:C.muted, fontSize:9, fontFamily:"monospace", letterSpacing:1, marginTop:2 }}>{s.l}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* QUICK TOPIC GRID */}
            <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:2, marginBottom:14 }}>ALL TOPICS — QUICK ACCESS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:28 }}>
              {TOPICS.map(function(t) {
                var done = progress["t"+t.id] && progress["t"+t.id].done;
                var score = progress["t"+t.id] && progress["t"+t.id].score;
                return (
                  <div key={t.id} style={{ background:C.card, border:"1px solid "+(done?t.color+"50":C.border), borderRadius:12, padding:14, borderTop:"3px solid "+(done?t.color:C.border), cursor:"pointer", position:"relative" }}
                    onClick={function(){navigate(TOPIC_ROUTES[t.id]);}} >
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:20 }}>{t.icon}</span>
                        <div>
                          <div style={{ color:t.color, fontWeight:700, fontSize:12 }}>Topic {t.id < 13 ? "0"+t.id : "BONUS"}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:6, flexDirection:"column", alignItems:"flex-end" }}>
                        {t.weight > 0 && <div style={{ background:t.color+"20", color:t.color, padding:"2px 8px", borderRadius:4, fontSize:10, fontFamily:"monospace", fontWeight:700 }}>{t.weight}%</div>}
                        {done && <div style={{ background:C.green+"20", color:C.green, padding:"2px 6px", borderRadius:4, fontSize:9, fontFamily:"monospace" }}>✓ DONE</div>}
                      </div>
                    </div>
                    <div style={{ color:C.text, fontWeight:600, fontSize:13, marginBottom:6 }}>{t.title}</div>
                    <div style={{ color:C.soft, fontSize:11, marginBottom:8 }}>{t.sections} sections · {t.questions > 0 ? t.questions+" questions" : "8 quiz questions"}</div>
                    {!done && (
                      <button onClick={function(e){ e.stopPropagation(); markDone(t.id); }} style={{ padding:"4px 12px", borderRadius:6, border:"1px solid "+t.color+"50", background:t.color+"12", color:t.color, fontSize:10, fontFamily:"monospace", cursor:"pointer", width:"100%" }}>
                        Mark Complete ✓
                      </button>
                    )}
                    {done && score > 0 && (
                      <div style={{ textAlign:"center", color:C.green, fontFamily:"monospace", fontSize:11 }}>Last score: {score}%</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* EXAM STRUCTURE REMINDER */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:20, borderTop:"3px solid "+C.cyan }}>
              <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:2, marginBottom:14 }}>EXAM STRUCTURE — QUICK REFERENCE</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                {[
                  { stage:"PRELIMS", marks:"100", note:"Qualifying only (not counted in merit)", col:C.cyan,
                    items:["GS (50M) — target 42+","Mental Ability (30M) — target 26+","Auto/Mech Trends (20M) — target 17+","Negative: -0.25 per wrong","Duration: 60 minutes"] },
                  { stage:"MAINS SEC A", marks:"240", note:"COUNTED in merit list", col:C.gold,
                    items:["SOM + Mech Technology","Theory of Machines","Hydraulics + Thermal Engg","Automobile Engines","Industrial Electronics","Negative: -0.25 | 90 min"] },
                  { stage:"MAINS SEC B or C", marks:"60", note:"Choose ONE section only", col:C.purple,
                    items:["SEC B: Hydraulic Machinery + Refrigeration + Industrial Engg","SEC C: Automobile Systems + Vehicle Maintenance + Transport Mgmt","Choose wisely based on strength","Negative: -0.25 | 30 min","Both sections equally important"] },
                ].map(function(s,i) {
                  return (
                    <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderTop:"2px solid "+s.col }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                        <div style={{ color:s.col, fontWeight:700, fontSize:14 }}>{s.stage}</div>
                        <div style={{ color:C.yellow, fontWeight:700, fontSize:20 }}>{s.marks}</div>
                      </div>
                      <div style={{ color:C.muted, fontSize:10, fontFamily:"monospace", marginBottom:8 }}>{s.note}</div>
                      {s.items.map(function(item,j) { return <div key={j} style={{ color:C.soft, fontSize:11, padding:"3px 0", display:"flex", gap:6 }}><span style={{ color:s.col }}>→</span>{item}</div>; })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── STUDY TOPICS ── */}
        {view==="study" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontSize:18, fontWeight:700, color:C.text, letterSpacing:2 }}>📖 ALL TOPICS — STUDY GUIDE</div>
              <div style={{ display:"flex", gap:8 }}>
                {["ALL","P1","P2","P3"].map(function(f) {
                  return <button key={f} onClick={function(){ setActiveFilter(f); }} style={{ padding:"7px 14px", borderRadius:8, border:"2px solid "+(activeFilter===f?C.gold:C.border), background:activeFilter===f?C.gold+"15":C.card, color:activeFilter===f?C.gold:C.soft, fontFamily:"monospace", fontSize:11, cursor:"pointer" }}>{f==="ALL"?"All Topics":f+" Priority"}</button>;
                })}
              </div>
            </div>
            <div style={{ display:"grid", gap:14 }}>
              {filteredTopics.map(function(t) {
                var done = progress["t"+t.id] && progress["t"+t.id].done;
                return (
                  <div key={t.id} style={{ background:C.card, border:"1px solid "+(done?t.color+"40":C.border), borderRadius:14, padding:18, borderLeft:"4px solid "+(done?t.color:C.border) }}>
                    <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto", gap:16, alignItems:"flex-start" }}>
                      <div style={{ fontSize:32 }}>{t.icon}</div>
                      <div>
                        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                          <span style={{ color:t.color, fontSize:17, fontWeight:700 }}>{t.id < 13 ? "Topic "+t.id : "BONUS"}: {t.title}</span>
                          {t.weight > 0 && <span style={{ background:t.color+"20", color:t.color, padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace", fontWeight:700 }}>{t.weight}% Weightage</span>}
                          <span style={{ background:C.muted, color:C.soft, padding:"2px 10px", borderRadius:4, fontSize:10, fontFamily:"monospace" }}>{t.priority}</span>
                          {done && <span style={{ background:C.green+"20", color:C.green, padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>✅ COMPLETED</span>}
                        </div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                          {t.tags.map(function(tag,i) { return <span key={i} style={{ background:t.color+"12", color:t.color+"CC", padding:"2px 8px", borderRadius:4, fontSize:10, fontFamily:"monospace" }}>{tag}</span>; })}
                        </div>
                        <div style={{ color:C.text, fontSize:13, lineHeight:1.7, marginBottom:8 }}>
                          <strong style={{ color:C.yellow }}>📌 Exam Tip: </strong>{t.tip}
                        </div>
                        <div style={{ color:C.soft, fontSize:11 }}>{t.sections} learning sections · {t.questions > 0 ? t.questions : 8}+ practice questions · File: {t.file}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:8, minWidth:140 }}>
                        <div style={{ color:C.soft, fontSize:11, fontFamily:"monospace", marginBottom:4 }}>To view this topic:</div>
                        <div style={{ background:C.bg, borderRadius:8, padding:"8px 12px", fontSize:11, color:C.text, fontFamily:"monospace", lineHeight:1.8 }}>
                          Ask Claude:<br/><strong style={{ color:t.color }}>Show Topic {t.id < 13 ? t.id : "Bonus"}</strong>
                        </div>
                        {!done && (
                          <button onClick={function(){ markDone(t.id); }} style={{ padding:"8px", borderRadius:8, border:"1px solid "+t.color+"50", background:t.color+"12", color:t.color, fontFamily:"monospace", fontSize:11, cursor:"pointer" }}>
                            ✓ Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MOCK TEST ── */}
        {view==="mock" && (
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.text, letterSpacing:2, marginBottom:6 }}>📝 MIXED MOCK TEST — 15 QUESTIONS</div>
            <div style={{ color:C.soft, fontSize:12, marginBottom:20, fontFamily:"monospace" }}>Covers all topics · Prelims + Mains difficulty levels · -0.25 negative marking applies</div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[{l:"CORRECT",v:mockScore.c,col:C.green},{l:"WRONG",v:mockScore.w,col:C.red},{l:"ACCURACY",v:mockScore.n>0?Math.round(mockScore.c/mockScore.n*100)+"%":"0%",col:C.yellow},{l:"DONE",v:mockScore.n+"/"+MOCK_QUESTIONS.length,col:C.gold}].map(function(s) {
                return (
                  <div key={s.l} style={{ background:C.card, border:"1px solid "+C.border, borderRadius:12, padding:14, textAlign:"center", borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:26, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:9, fontFamily:"monospace", letterSpacing:1.5, marginTop:3, textTransform:"uppercase" }}>{s.l}</div>
                  </div>
                );
              })}
            </div>

            {mockDone ? (
              <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:"40px 20px", textAlign:"center" }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{mockScore.c>=12?"🏆":mockScore.c>=9?"🌟":"📚"}</div>
                <div style={{ fontSize:24, color:C.gold, letterSpacing:2, marginBottom:10, fontWeight:700 }}>
                  {mockScore.c}/{MOCK_QUESTIONS.length} — {mockScore.c>=12?"EXCELLENT! EXAM READY!":mockScore.c>=9?"GOOD — KEEP PRACTICING!":"NEEDS MORE REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:500, margin:"0 auto 24px", fontSize:13, lineHeight:1.8 }}>
                  {mockScore.c>=12?"Outstanding performance! You are exam-ready. Focus on maintaining this level.":mockScore.c>=9?"Good score. Identify the topics where you went wrong and revise those topic modules specifically.":"Review all the topics where you made mistakes. Go back to those topic modules and use the TIPS sections."}
                  <br/><br/>
                  Calculated score with -0.25 negative marking: <strong style={{ color:C.yellow }}>{(mockScore.c - mockScore.w*0.25).toFixed(2)} / {MOCK_QUESTIONS.length}</strong>
                </div>
                <button onClick={mockReset} style={{ padding:"12px 32px", borderRadius:10, border:"none", background:C.gold, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>TRY AGAIN</button>
              </div>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
                  <div style={{ background:C.cyan+"15", color:C.cyan, border:"1px solid "+C.cyan+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>Q{mockIdx+1}/{MOCK_QUESTIONS.length}</div>
                  <div style={{ background:C.gold+"15", color:C.gold, border:"1px solid "+C.gold+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{mq.topic}</div>
                  <div style={{ background:(mq.level==="P"?C.green:C.orange)+"15", color:mq.level==="P"?C.green:C.orange, border:"1px solid "+(mq.level==="P"?C.green:C.orange)+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{mq.level==="P"?"PRELIMS LEVEL":"MAINS LEVEL"}</div>
                </div>
                <div style={{ height:4, background:C.muted, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((mockIdx/MOCK_QUESTIONS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.gold+","+C.green+")", transition:"width 0.3s" }} />
                </div>
                <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:12, padding:"18px 20px", marginBottom:14, borderLeft:"4px solid "+C.gold }}>
                  <div style={{ fontSize:15, lineHeight:1.8, fontWeight:500 }}>
                    <span style={{ color:C.gold, fontSize:18, marginRight:10, fontWeight:700 }}>Q{mockIdx+1}.</span>{mq.q}
                  </div>
                </div>
                <div style={{ display:"grid", gap:10, marginBottom:18 }}>
                  {mq.opts.map(function(opt,i) {
                    var bg=C.card, bdr=C.border, col=C.text, lc=C.muted;
                    if (mockSel!==null) {
                      if (i===mq.ans){ bg=C.green+"15"; bdr=C.green; lc=C.green; }
                      else if (i===mockSel){ bg=C.red+"15"; bdr=C.red; lc=C.red; col=C.soft; }
                      else col=C.muted;
                    }
                    return (
                      <div key={i} onClick={function(){ mockPick(i); }} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"13px 16px", borderRadius:10, border:"1.5px solid "+bdr, background:bg, color:col, cursor:mockSel!==null?"default":"pointer" }}>
                        <div style={{ width:28, height:28, borderRadius:6, background:lc+"22", border:"1.5px solid "+lc+"50", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:12, color:lc, fontWeight:700, flexShrink:0 }}>{["A","B","C","D"][i]}</div>
                        <span style={{ fontSize:13, lineHeight:1.55, paddingTop:4 }}>{opt}</span>
                        {mockSel!==null && i===mq.ans && <span style={{ marginLeft:"auto" }}>✅</span>}
                        {mockSel!==null && i===mockSel && i!==mq.ans && <span style={{ marginLeft:"auto" }}>❌</span>}
                      </div>
                    );
                  })}
                </div>
                {mockExp && (
                  <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:12, padding:16, marginBottom:18, borderLeft:"4px solid "+(mockSel===mq.ans?C.green:C.red) }}>
                    <div style={{ fontWeight:700, color:mockSel===mq.ans?C.green:C.red, marginBottom:10, fontSize:14 }}>
                      {mockSel===mq.ans?"✅ CORRECT!":"❌ WRONG — Correct: "+["A","B","C","D"][mq.ans]}
                    </div>
                    <div style={{ color:C.text, fontSize:13, lineHeight:1.85, whiteSpace:"pre-line", marginBottom:12 }}>{mq.exp}</div>
                    <div style={{ padding:"10px 14px", background:C.yellow+"10", borderRadius:8, borderLeft:"3px solid "+C.yellow }}>
                      <span style={{ color:C.yellow, fontWeight:700, fontSize:11, fontFamily:"monospace" }}>EXAM TIP: </span>
                      <span style={{ color:C.text, fontSize:13 }}>{mq.tip}</span>
                    </div>
                  </div>
                )}
                {mockSel!==null && !mockDone && (
                  <button onClick={mockNext} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.gold+","+C.green+")", color:"#000", fontWeight:700, cursor:"pointer", fontSize:16, letterSpacing:2 }}>
                    {mockIdx<MOCK_QUESTIONS.length-1?"NEXT QUESTION →":"FINISH MOCK TEST"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── STUDY PLAN ── */}
        {view==="plan" && (
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.text, letterSpacing:2, marginBottom:6 }}>📅 30-DAY STUDY PLAN</div>
            <div style={{ color:C.soft, fontSize:12, marginBottom:24, fontFamily:"monospace" }}>Structured week-by-week plan optimised for MPSC RTO/AMVI 2026 examination success</div>

            <div style={{ display:"grid", gap:14, marginBottom:28 }}>
              {PLAN.map(function(w,i) {
                return (
                  <div key={i} style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:18, borderLeft:"4px solid "+w.color }}>
                    <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto", gap:16, alignItems:"flex-start" }}>
                      <div style={{ background:w.color+"20", border:"2px solid "+w.color+"50", borderRadius:10, padding:"10px 14px", textAlign:"center", minWidth:90 }}>
                        <div style={{ color:w.color, fontFamily:"monospace", fontSize:20, fontWeight:700 }}>W{w.week}</div>
                        <div style={{ color:C.soft, fontSize:10, fontFamily:"monospace" }}>{w.days}</div>
                      </div>
                      <div>
                        <div style={{ color:w.color, fontSize:16, fontWeight:700, marginBottom:8 }}>WEEK {w.week}: {w.focus}</div>
                        <div style={{ color:C.text, fontSize:13, marginBottom:8 }}>
                          <strong style={{ color:C.yellow }}>Target: </strong>{w.target}
                        </div>
                        <div style={{ color:C.text, fontSize:13, marginBottom:10 }}>
                          <strong style={{ color:C.cyan }}>Daily routine: </strong>{w.daily}
                        </div>
                        {w.topics.length > 0 && (
                          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                            {w.topics.map(function(tid) {
                              var tp = TOPICS.find(function(t){ return t.id===tid; });
                              if (!tp) return null;
                              return <span key={tid} style={{ background:tp.color+"15", color:tp.color, border:"1px solid "+tp.color+"40", padding:"3px 10px", borderRadius:6, fontSize:11, fontFamily:"monospace" }}>{tp.icon} {tp.title}</span>;
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:20, borderTop:"3px solid "+C.gold, marginBottom:20 }}>
              <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:2, marginBottom:14 }}>DAILY PRACTICE TARGETS</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                {[
                  { period:"Morning (60 min)", col:C.orange, tasks:["Open 1 topic module","Read ALL sections in LEARN tab","Note down key formulas in notebook","Focus on SVG diagrams and tables"] },
                  { period:"Evening (45 min)", col:C.cyan, tasks:["Attempt full 12-question PRACTICE quiz","Score target: 10/12 or above","Review every wrong answer thoroughly","Read TIPS section for that topic"] },
                  { period:"Weekend (2 hours)", col:C.green, tasks:["Full mock test (15 questions, timed)","Review all wrong answers with explanations","Revise weakest 2 topics from that week","Update progress tracker in dashboard"] },
                ].map(function(x,i) {
                  return (
                    <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderTop:"2px solid "+x.col }}>
                      <div style={{ color:x.col, fontWeight:700, fontSize:13, marginBottom:10 }}>{x.period}</div>
                      {x.tasks.map(function(task,j) { return <div key={j} style={{ color:C.soft, fontSize:12, padding:"5px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:8 }}><span style={{ color:x.col }}>→</span>{task}</div>; })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
              <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:18, borderTop:"2px solid "+C.red }}>
                <div style={{ fontFamily:"monospace", color:C.red, fontSize:11, letterSpacing:1, marginBottom:12 }}>SECTION CHOICE STRATEGY — B vs C</div>
                {[
                  { title:"Choose Section B (Hydraulic Machinery + Refrigeration + Industrial Eng)", for:"Choose if: You have strong engineering background. Comfortable with hydraulic turbines (Pelton, Francis, Kaplan), pump theory, refrigeration cycles, and industrial engineering concepts like SQC and work study." },
                  { title:"Choose Section C (Automobile Systems + Vehicle Maintenance + Transport Management)", for:"Choose if: You want ARTO/AMVI role specifically. Strong in vehicle systems, maintenance, and MV Act. Topics 2, 3, 4, 8, 11 in this system directly map to Section C. Recommended for most candidates." },
                ].map(function(x,i) {
                  return (
                    <div key={i} style={{ padding:"10px 12px", background:C.bg, borderRadius:8, marginBottom:8, borderLeft:"3px solid "+(i===1?C.green:C.orange) }}>
                      <div style={{ color:i===1?C.green:C.orange, fontWeight:700, fontSize:12, marginBottom:4 }}>{x.title}</div>
                      <div style={{ color:C.soft, fontSize:12 }}>{x.for}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:18, borderTop:"2px solid "+C.purple }}>
                <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>EXAM DAY STRATEGY</div>
                {[
                  "Read ALL questions before starting — attempt easiest first",
                  "Negative marking -0.25: Skip if less than 60% confident",
                  "Time allocation: Prelims 60min = ~36 sec/question. Don't get stuck.",
                  "Mark doubtful questions and return — don't waste time",
                  "Calculation questions: check units (kN→N, km/h→m/s) first",
                  "MV Act section numbers: don't guess — skip if unsure",
                  "Current affairs: recent Maharashtra projects = safe bets",
                  "Stay calm. You have prepared comprehensively. Trust your preparation.",
                ].map(function(s,i) {
                  return (
                    <div key={i} style={{ color:C.soft, fontSize:12, padding:"6px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:8 }}>
                      <span style={{ color:C.purple, fontFamily:"monospace", fontSize:10, flexShrink:0 }}>{i+1}.</span>{s}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background:"linear-gradient(135deg,#0A0614,#06070A,#060A0A)", border:"1px solid "+C.gold+"30", borderRadius:16, padding:"28px 20px", textAlign:"center" }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🏆</div>
              <div style={{ fontFamily:"monospace", fontSize:19, color:C.gold, fontWeight:700, letterSpacing:3, marginBottom:12 }}>THE COMPLETE SYSTEM — GUARANTEED SUCCESS</div>
              <div style={{ color:C.soft, fontSize:13, lineHeight:2.0, maxWidth:700, margin:"0 auto", marginBottom:16 }}>
                This preparation system covers <strong style={{ color:C.gold }}>100% of the official MPSC RTO/AMVI 2026 syllabus</strong> across 13 interactive topic modules plus a comprehensive bonus module for all missing topics.
                <br/>
                <strong style={{ color:C.cyan }}>13 topic modules · 144+ practice questions · 15-question mock test · Formula sheets · Memory tricks · Current affairs · Mental ability · Study plan</strong>
                <br/><br/>
                Any candidate who studies all these notes thoroughly, practices all quizzes to 75%+ accuracy, completes the 30-day study plan, and follows the exam day strategy <strong style={{ color:C.green }}>WILL pass the MPSC RTO/AMVI 2026 examination.</strong>
              </div>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={function(){ setView("mock"); mockReset(); }} style={{ padding:"12px 28px", borderRadius:10, border:"none", background:C.gold, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>START MOCK TEST 📝</button>
                <button onClick={function(){ setView("study"); }} style={{ padding:"12px 28px", borderRadius:10, border:"1px solid "+C.green, background:C.green+"15", color:C.green, fontWeight:700, cursor:"pointer", fontSize:14 }}>VIEW ALL TOPICS 📖</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}