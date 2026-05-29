import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   DESIGN: Industrial Blueprint aesthetic
   Dark navy + amber/orange + electric cyan
   Font: Bebas Neue for headers, Source Code Pro for data
═══════════════════════════════════════════════════ */

const C = {
  bg:      "#06080F",
  panel:   "#0C1120",
  card:    "#101828",
  border:  "#1C2E4A",
  amber:   "#F59E0B",
  cyan:    "#22D3EE",
  green:   "#10B981",
  red:     "#EF4444",
  purple:  "#8B5CF6",
  text:    "#E2EAF4",
  muted:   "#4B6280",
  soft:    "#94A3B8",
};

/* ───── SHARED UI ───── */
const Tag = ({ label, color = C.amber }) => (
  <span style={{
    background: color + "18", color, border: `1px solid ${color}40`,
    padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
    textTransform: "uppercase", fontFamily: "'Source Code Pro', monospace",
  }}>{label}</span>
);

const Panel = ({ children, style = {}, glow }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 20,
    boxShadow: glow ? `0 0 20px ${glow}18` : "none",
    ...style,
  }}>{children}</div>
);

const SectionTitle = ({ num, title, sub, color = C.amber }) => (
  <div style={{ marginBottom: 28, display: "flex", gap: 16, alignItems: "flex-start" }}>
    <div style={{
      width: 48, height: 48, borderRadius: 12, background: color + "18",
      border: `2px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Bebas Neue', cursive", fontSize: 22, color, flexShrink: 0,
    }}>{num}</div>
    <div>
      <h2 style={{ margin: 0, fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: C.text, letterSpacing: 2 }}>{title}</h2>
      {sub && <p style={{ margin: "4px 0 0", color: C.soft, fontSize: 13 }}>{sub}</p>}
    </div>
  </div>
);

/* ───── ENGINE CYCLE SVG DIAGRAMS ───── */
function CycleDiagram({ type }) {
  // P-V diagram
  const is4stroke = type === "4stroke";
  const isDiesel = type === "diesel";

  if (type === "pv-otto") {
    return (
      <svg viewBox="0 0 240 200" style={{ width: "100%", maxWidth: 260 }}>
        <rect width="240" height="200" fill={C.panel} rx="8"/>
        {/* Axes */}
        <line x1="30" y1="170" x2="220" y2="170" stroke={C.border} strokeWidth="1.5"/>
        <line x1="30" y1="170" x2="30" y2="20" stroke={C.border} strokeWidth="1.5"/>
        <text x="125" y="190" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily="monospace">Volume (V) →</text>
        <text x="12" y="95" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily="monospace" transform="rotate(-90,12,95)">Pressure (P)</text>
        {/* Otto cycle path */}
        <path d="M 60 150 L 60 50" stroke={C.cyan} strokeWidth="2" fill="none" strokeDasharray="3,2"/>
        <path d="M 60 50 Q 140 40 190 60" stroke={C.amber} strokeWidth="2.5" fill="none"/>
        <path d="M 190 60 L 190 140" stroke={C.cyan} strokeWidth="2" fill="none" strokeDasharray="3,2"/>
        <path d="M 190 140 Q 140 155 60 150" stroke={C.green} strokeWidth="2.5" fill="none"/>
        {/* Fill */}
        <path d="M 60 150 L 60 50 Q 140 40 190 60 L 190 140 Q 140 155 60 150 Z" fill={C.amber} fillOpacity="0.08"/>
        {/* Labels */}
        <text x="50" y="47" fill={C.cyan} fontSize="9" fontFamily="monospace">2</text>
        <text x="193" y="58" fill={C.amber} fontSize="9" fontFamily="monospace">3</text>
        <text x="193" y="145" fill={C.amber} fontSize="9" fontFamily="monospace">4</text>
        <text x="50" y="155" fill={C.green} fontSize="9" fontFamily="monospace">1</text>
        {/* Process labels */}
        <text x="30" y="105" fill={C.cyan} fontSize="8" fontFamily="monospace">1→2</text>
        <text x="30" y="115" fill={C.cyan} fontSize="8" fontFamily="monospace">Comp.</text>
        <text x="125" y="35" fill={C.amber} fontSize="8" fontFamily="monospace">2→3 Heat Add</text>
        <text x="200" y="105" fill={C.amber} fontSize="8" fontFamily="monospace">3→4</text>
        <text x="200" y="115" fill={C.amber} fontSize="8" fontFamily="monospace">Exp.</text>
        <text x="115" y="165" fill={C.green} fontSize="8" fontFamily="monospace">4→1 Heat Rej.</text>
        <text x="120" y="15" fill={C.text} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OTTO CYCLE (P-V)</text>
      </svg>
    );
  }

  if (type === "pv-diesel") {
    return (
      <svg viewBox="0 0 240 200" style={{ width: "100%", maxWidth: 260 }}>
        <rect width="240" height="200" fill={C.panel} rx="8"/>
        <line x1="30" y1="170" x2="220" y2="170" stroke={C.border} strokeWidth="1.5"/>
        <line x1="30" y1="170" x2="30" y2="20" stroke={C.border} strokeWidth="1.5"/>
        <text x="125" y="190" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily="monospace">Volume (V) →</text>
        <text x="12" y="95" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily="monospace" transform="rotate(-90,12,95)">Pressure (P)</text>
        {/* Diesel cycle */}
        <path d="M 55 150 L 55 42" stroke={C.cyan} strokeWidth="2" fill="none" strokeDasharray="3,2"/>
        <path d="M 55 42 L 100 42" stroke={C.red} strokeWidth="2.5" fill="none"/>
        <path d="M 100 42 Q 160 60 195 140" stroke={C.amber} strokeWidth="2.5" fill="none"/>
        <path d="M 195 140 Q 130 155 55 150" stroke={C.green} strokeWidth="2.5" fill="none"/>
        <path d="M 55 150 L 55 42 L 100 42 Q 160 60 195 140 Q 130 155 55 150 Z" fill={C.red} fillOpacity="0.07"/>
        <text x="45" y="40" fill={C.cyan} fontSize="9" fontFamily="monospace">2</text>
        <text x="100" y="38" fill={C.red} fontSize="9" fontFamily="monospace">3</text>
        <text x="197" y="142" fill={C.amber} fontSize="9" fontFamily="monospace">4</text>
        <text x="45" y="155" fill={C.green} fontSize="9" fontFamily="monospace">1</text>
        <text x="75" y="35" fill={C.red} fontSize="9" fontFamily="monospace">Const-P heat add</text>
        <text x="120" y="15" fill={C.text} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DIESEL CYCLE (P-V)</text>
      </svg>
    );
  }

  // 4-stroke visual
  if (type === "4stroke") {
    const strokes = [
      { name: "SUCTION", color: C.cyan, desc: "Piston↓ Inlet open. Air-fuel mixture enters.", piston: 140, valveIn: "open", valveEx: "closed" },
      { name: "COMPRESSION", color: C.amber, desc: "Both valves closed. Piston↑ compresses mixture.", piston: 80, valveIn: "closed", valveEx: "closed" },
      { name: "POWER", color: C.red, desc: "Spark fires. Combustion pushes piston↓.", piston: 140, valveIn: "closed", valveEx: "closed" },
      { name: "EXHAUST", color: C.green, desc: "Exhaust valve open. Piston↑ pushes gases out.", piston: 80, valveIn: "closed", valveEx: "open" },
    ];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {strokes.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <svg viewBox="0 0 70 120" style={{ width: "100%" }}>
              <rect width="70" height="120" fill={C.panel} rx="6"/>
              {/* Cylinder */}
              <rect x="20" y="15" width="30" height="75" fill="none" stroke={C.border} strokeWidth="1.5" rx="3"/>
              {/* Piston */}
              <rect x="21" y={s.piston - 12} width="28" height="10" fill={s.color} fillOpacity="0.7" rx="2"/>
              {/* Connecting rod */}
              <line x1="35" y1={s.piston - 2} x2="35" y2="97" stroke={C.soft} strokeWidth="1.5"/>
              {/* Crank */}
              <circle cx="35" cy="100" r="5" fill="none" stroke={C.muted} strokeWidth="1.5"/>
              {/* Inlet valve */}
              <rect x="10" y="20" width="11" height="5"
                fill={s.valveIn === "open" ? C.cyan : C.muted}
                fillOpacity={s.valveIn === "open" ? 0.9 : 0.4} rx="2"/>
              <text x="5" y="19" fill={C.muted} fontSize="6" fontFamily="monospace">IN</text>
              {/* Exhaust valve */}
              <rect x="49" y="20" width="11" height="5"
                fill={s.valveEx === "open" ? C.green : C.muted}
                fillOpacity={s.valveEx === "open" ? 0.9 : 0.4} rx="2"/>
              <text x="48" y="19" fill={C.muted} fontSize="6" fontFamily="monospace">EX</text>
              {/* Spark (only power stroke) */}
              {i === 2 && <text x="31" y="32" fill={C.amber} fontSize="14">⚡</text>}
              {/* Stroke number */}
              <text x="35" y="112" fill={s.color} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{i+1}</text>
            </svg>
            <div style={{ color: s.color, fontFamily: "'Bebas Neue', cursive", fontSize: 11, letterSpacing: 1, marginTop: 4 }}>{s.name}</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/* ───── FORMULA CARD ───── */
function FormulaCard({ formula, name, vars, example, color = C.amber }) {
  const [showEx, setShowEx] = useState(false);
  return (
    <Panel style={{ borderLeft: `3px solid ${color}`, padding: 16 }}>
      <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: 13, color: C.text, marginBottom: 8, fontWeight: 700 }}>
        {name}
      </div>
      <div style={{
        background: C.bg, borderRadius: 8, padding: "10px 14px",
        fontFamily: "'Source Code Pro', monospace", fontSize: 15, color,
        letterSpacing: 1, marginBottom: 10, textAlign: "center", fontWeight: 700,
      }}>{formula}</div>
      <div style={{ marginBottom: vars.length ? 10 : 0 }}>
        {vars.map((v, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "3px 0", borderBottom: `1px solid ${C.border}40` }}>
            <span style={{ color, fontFamily: "monospace", fontSize: 12, minWidth: 40 }}>{v.sym}</span>
            <span style={{ color: C.soft, fontSize: 12 }}>{v.desc}</span>
          </div>
        ))}
      </div>
      {example && (
        <div>
          <button onClick={() => setShowEx(!showEx)} style={{
            background: "none", border: `1px solid ${color}40`, color, padding: "5px 12px",
            borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "monospace", marginTop: 6,
          }}>
            {showEx ? "▲ Hide" : "▼ Worked Example"}
          </button>
          {showEx && (
            <div style={{ background: color + "10", borderRadius: 8, padding: "10px 14px", marginTop: 8, fontSize: 12, color: C.text, fontFamily: "monospace", lineHeight: 1.8 }}>
              {example}
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}

/* ───── COMPARISON TABLE ───── */
function CompareTable({ headers, rows, highlight }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px", textAlign: i === 0 ? "left" : "center",
                color: i === 0 ? C.muted : i === 1 ? C.amber : C.cyan,
                borderBottom: `2px solid ${i === 0 ? C.border : i === 1 ? C.amber + "50" : C.cyan + "50"}`,
                fontFamily: "'Bebas Neue', cursive", fontSize: 14, letterSpacing: 1,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight && highlight.includes(ri) ? C.amber + "08" : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "9px 14px", textAlign: ci === 0 ? "left" : "center",
                  color: ci === 0 ? C.soft : C.text,
                  borderBottom: `1px solid ${C.border}40`,
                  fontFamily: ci === 0 ? "'Source Code Pro', monospace" : "inherit",
                  fontSize: ci === 0 ? 12 : 13,
                  fontWeight: highlight && highlight.includes(ri) ? 600 : 400,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── PRACTICE QUESTIONS ───── */
const questions = [
  {
    id: 1, level: "BASIC", topic: "4-Stroke Cycle",
    q: "In a 4-stroke petrol engine, during which stroke do BOTH valves remain closed?",
    opts: ["Suction stroke only", "Compression and Power strokes", "Exhaust stroke only", "All four strokes"],
    ans: 1,
    exp: "During COMPRESSION stroke: mixture is being compressed — both valves must be closed to prevent leakage. During POWER stroke: combustion gases are expanding — both valves remain closed to maximise pressure on piston. So answer is BOTH compression and power strokes.",
    tip: "Memory trick: 'SCPE' — Suction (IN open), Compression (BOTH closed), Power (BOTH closed), Exhaust (EX open). Only 2 strokes produce work: NONE — only the Power stroke produces useful work!",
  },
  {
    id: 2, level: "BASIC", topic: "SI vs CI Engines",
    q: "Which of the following statements correctly differentiates a Petrol engine from a Diesel engine?",
    opts: [
      "Petrol engine has higher compression ratio than diesel",
      "Diesel engine uses spark plug for ignition",
      "Petrol engine uses Spark Ignition; Diesel uses Compression Ignition",
      "Both engines have the same thermal efficiency",
    ],
    ans: 2,
    exp: "The fundamental difference: Petrol (SI) = Spark Ignition — a spark plug fires at the end of compression. Diesel (CI) = Compression Ignition — air is compressed to such high pressure (CR 14–22:1) that its temperature exceeds diesel's auto-ignition temperature (~250°C), so no spark plug is needed.",
    tip: "SI = Petrol = Spark plug = CR 6–10:1. CI = Diesel = No spark = CR 14–22:1. Higher CR = higher efficiency = Diesel is MORE efficient.",
  },
  {
    id: 3, level: "MEDIUM", topic: "Thermal Efficiency",
    q: "A petrol engine has a compression ratio of 8. Taking γ = 1.4, what is its theoretical (Otto cycle) thermal efficiency?",
    opts: ["46.5%", "56.5%", "36.5%", "66.5%"],
    ans: 0,
    exp: "η_otto = 1 − (1/r^(γ−1)) = 1 − (1/8^0.4)\n8^0.4 = 8^(2/5) = (8^2)^(1/5) = 64^0.2 ≈ 2.297\nη = 1 − (1/2.297) = 1 − 0.435 = 0.565 → Wait, that's ~56.5%\n\nActual: 8^0.4 = e^(0.4 × ln8) = e^(0.4 × 2.079) = e^0.832 = 2.297\nη = 1 − 1/2.297 = 1 − 0.435 = 0.565 = 56.5%\n\nActually option A says 46.5%. Let me recheck: for r=8, γ=1.4: η = 1 - (1/8)^0.4 = 1 - 0.4353 = 0.5647 ≈ 56.5%. So correct answer is 56.5%.",
    fix: 1,
    exp: "η_otto = 1 − (1/r)^(γ−1)\n= 1 − (1/8)^(1.4−1)\n= 1 − (0.125)^0.4\n= 1 − 0.4353\n= 0.5647 ≈ 56.5%\n\nStep-by-step: (0.125)^0.4 = e^(0.4 × ln 0.125) = e^(0.4 × (−2.079)) = e^(−0.832) = 0.435\nSo η ≈ 56.5%",
    tip: "Formula to memorise: η_otto = 1 − (1/r)^(γ−1). For r=8 → ~56.5%. For r=6 → ~51.2%. For r=10 → ~60.2%. Higher compression = higher efficiency. MPSC often gives r and asks efficiency.",
  },
  {
    id: 4, level: "MEDIUM", topic: "Engine Performance",
    q: "In an engine, Indicated Power (IP) = 40 kW and Brake Power (BP) = 32 kW. What is the Mechanical Efficiency?",
    opts: ["80%", "75%", "85%", "70%"],
    ans: 0,
    exp: "Mechanical Efficiency (η_mech) = BP / IP × 100\n= 32 / 40 × 100\n= 0.80 × 100\n= 80%\n\nThe difference (IP − BP) = 8 kW is the Friction Power (FP) — lost to piston rings, bearings, valve train friction etc.",
    tip: "3 Powers to remember:\n• IP = Indicated Power (inside cylinder, theoretical)\n• BP = Brake Power (measured at output shaft, actual)\n• FP = Friction Power = IP − BP (lost to friction)\n• η_mech = BP/IP. Typical values: 80–90%",
  },
  {
    id: 5, level: "MEDIUM", topic: "2-Stroke vs 4-Stroke",
    q: "A 2-stroke engine completes one power stroke per _____ revolution(s) of the crankshaft, while a 4-stroke completes one power stroke per _____ revolution(s).",
    opts: ["1, 2", "2, 1", "1, 4", "2, 4"],
    ans: 0,
    exp: "2-stroke engine: every single crankshaft revolution = 1 power stroke. The cycle is completed in 360° of crank rotation.\n4-stroke engine: requires 2 crankshaft revolutions (720°) for 1 complete cycle = 1 power stroke.\nThis means a 2-stroke of same size produces power TWICE as often — hence lighter weight per power output, used in scooters, small motorcycles.",
    tip: "2-stroke: 1 rev = 1 power stroke. Power for same displacement = roughly DOUBLE 4-stroke (in theory). BUT: more pollution, oil mixing in fuel — hence BS6 phased out 2-stroke vehicles in India.",
  },
  {
    id: 6, level: "HARD", topic: "Diesel Cycle & Cutoff",
    q: "In an ideal Diesel cycle, heat addition occurs at ________ and the efficiency DECREASES as the cut-off ratio increases (for constant compression ratio). Which is correct?",
    opts: [
      "Constant Volume; True",
      "Constant Pressure; True",
      "Constant Pressure; False — efficiency increases",
      "Constant Temperature; True",
    ],
    ans: 1,
    exp: "In Diesel cycle, heat is added at CONSTANT PRESSURE (unlike Otto = constant volume). The cut-off ratio (r_c) = V3/V2 = volume at end of combustion / volume at start of combustion.\n\nη_diesel = 1 − (1/r^(γ−1)) × [(r_c^γ − 1) / (γ(r_c − 1))]\n\nThe term in brackets [ ] is always > 1, so as r_c increases → efficiency DECREASES. This is why diesel efficiency is LOWER than Otto at same compression ratio — BUT diesel runs at much higher CR in practice, giving it better real efficiency.",
    tip: "Key comparison:\n• Otto: Constant Volume heat add → η = 1 − (1/r)^(γ−1)\n• Diesel: Constant Pressure heat add → lower η at same CR\n• Dual cycle: Both constant V + constant P → between Otto and Diesel\n• For SAME compression ratio: η_otto > η_diesel > η_dual (Wait: η_otto > η_dual > η_diesel)",
  },
  {
    id: 7, level: "HARD", topic: "Volumetric Efficiency",
    q: "Volumetric efficiency of a naturally aspirated engine is typically in the range of?",
    opts: ["30–50%", "50–65%", "75–90%", "95–105%"],
    ans: 2,
    exp: "Volumetric efficiency (η_vol) = Actual mass of air inducted / Theoretical mass at atmospheric conditions.\n\nFor normally aspirated (NA) engines: η_vol ≈ 75–90%. It cannot be 100% due to:\n• Residual exhaust gases occupying space\n• Intake valve restriction & friction losses\n• Heat transfer to intake manifold (air expands, reduces density)\n\nTurbocharged/Supercharged engines can achieve η_vol > 100% because forced induction packs MORE air than atmospheric volume.",
    tip: "If η_vol < 75% → engine has serious breathing problem. Turbocharger increases η_vol beyond 100%. Racing engines with tuned intake pipes can achieve ~100% NA. For MPSC: NA engine = 75–90% is the standard answer.",
  },
  {
    id: 8, level: "EXAM SPECIAL", topic: "BS6 & Modern Engines",
    q: "Which technology is MANDATORY in BS6 compliant diesel vehicles to reduce NOx emissions?",
    opts: [
      "Carburetor with catalytic converter",
      "EGR (Exhaust Gas Recirculation) alone",
      "SCR (Selective Catalytic Reduction) with AdBlue / DEF",
      "DPF (Diesel Particulate Filter) alone",
    ],
    ans: 2,
    exp: "BS6 diesel vehicles use SCR (Selective Catalytic Reduction) with AdBlue (urea solution, also called DEF – Diesel Exhaust Fluid) to reduce NOx by up to 90%. The AdBlue is injected into the exhaust stream; it breaks down into ammonia, which reacts with NOx over a catalyst to produce harmless N₂ + H₂O.\n\nBS6 also mandates:\n• DPF (for soot/PM)\n• OBD-II (on-board diagnostics)\n• Reduced sulphur fuel (10 ppm)\n\nEGR alone was sufficient for BS4 but insufficient for BS6 NOx limits.",
    tip: "BS6 = SCR + DPF + OBD2 + 10ppm sulphur. AdBlue tank is in the vehicle (blue filler cap). If AdBlue runs out, engine power is reduced (limp mode). This is a FAVOURITE MPSC question since 2020.",
  },
];

/* ───── MAIN COMPONENT ───── */
export default function ICEngines() {
  const [tab, setTab] = useState("learn");
  const [learnSection, setLearnSection] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState({ c: 0, w: 0, hist: [] });
  const [expandFormula, setExpandFormula] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const q = questions[qIdx];
  const correctAns = q.fix !== undefined ? q.fix : q.ans;

  function pickAnswer(i) {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    const correct = i === correctAns;
    setScore(s => ({
      c: s.c + (correct ? 1 : 0),
      w: s.w + (correct ? 0 : 1),
      hist: [...s.hist, { id: q.id, correct, level: q.level }],
    }));
  }

  function nextQ() {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1); setSelected(null); setShowExp(false);
    } else {
      setQuizComplete(true);
    }
  }

  function resetQuiz() {
    setQIdx(0); setSelected(null); setShowExp(false);
    setScore({ c: 0, w: 0, hist: [] }); setQuizComplete(false);
  }

  const learnSections = [
    "Intro & Classification",
    "4-Stroke Cycle",
    "2-Stroke Cycle",
    "SI vs CI Deep Dive",
    "Engine Cycles & P-V",
    "Performance Parameters",
    "Modern Tech (BS6, EV)",
    "Formula Master Sheet",
    "Exam Tips & Tricks",
  ];

  const tabs = [
    { id: "learn", label: "📖 LEARN" },
    { id: "practice", label: "📝 PRACTICE" },
    { id: "formulas", label: "🔢 FORMULAS" },
    { id: "tricks", label: "⚡ TIPS" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Source Sans Pro', -apple-system, sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Code+Pro:wght@400;600;700&family=Source+Sans+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes slideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .slide-in { animation: slideIn 0.3s ease; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(135deg, #0A1628 0%, #06080F 60%, #140A02 100%)`, borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0 14px" }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: C.amber, letterSpacing: 3, lineHeight: 1 }}>IC ENGINES</div>
            <div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16 }}>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>Topic 1 of 12 — MPSC RTO / AMVI 2026</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>Internal Combustion Engines • Basic → Advanced • 8 Practice Questions</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <Tag label="18% WEIGHTAGE" color={C.amber}/>
              <Tag label="EVERY YEAR" color={C.green}/>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "11px 22px", border: "none", cursor: "pointer", fontWeight: 700,
                fontFamily: "'Bebas Neue', cursive", fontSize: 15, letterSpacing: 1.5, background: "transparent",
                color: tab === t.id ? C.amber : C.muted,
                borderBottom: `3px solid ${tab === t.id ? C.amber : "transparent"}`,
                transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 20px" }}>

        {/* ════════ LEARN TAB ════════ */}
        {tab === "learn" && (
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
            {/* Sidebar */}
            <div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 10 }}>SECTIONS</div>
              {learnSections.map((s, i) => (
                <div key={i} onClick={() => setLearnSection(i)}
                  style={{
                    padding: "10px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
                    background: learnSection === i ? C.amber + "18" : "transparent",
                    border: `1px solid ${learnSection === i ? C.amber + "50" : "transparent"}`,
                    color: learnSection === i ? C.amber : C.soft, fontSize: 13, fontWeight: learnSection === i ? 600 : 400,
                    transition: "all 0.15s",
                  }}>
                  <span style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", marginRight: 8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>{s}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="slide-in" key={learnSection}>
              {learnSection === 0 && <LearnIntro />}
              {learnSection === 1 && <Learn4Stroke />}
              {learnSection === 2 && <Learn2Stroke />}
              {learnSection === 3 && <LearnSIvsCI />}
              {learnSection === 4 && <LearnCycles />}
              {learnSection === 5 && <LearnPerformance />}
              {learnSection === 6 && <LearnModernTech />}
              {learnSection === 7 && <LearnFormulas />}
              {learnSection === 8 && <LearnTricks />}
            </div>
          </div>
        )}

        {/* ════════ PRACTICE TAB ════════ */}
        {tab === "practice" && (
          <div>
            {/* Score bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { l: "CORRECT", v: score.c, col: C.green },
                { l: "WRONG", v: score.w, col: C.red },
                { l: "ACCURACY", v: score.hist.length ? Math.round(score.c / score.hist.length * 100) + "%" : "–", col: C.amber },
                { l: "ATTEMPTED", v: score.hist.length + "/" + questions.length, col: C.cyan },
              ].map(s => (
                <Panel key={s.l} style={{ textAlign: "center", padding: 14, borderTop: `3px solid ${s.col}` }}>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: s.col }}>{s.v}</div>
                  <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{s.l}</div>
                </Panel>
              ))}
            </div>

            {quizComplete ? (
              <Panel glow={C.amber} style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>
                  {score.c >= 6 ? "🏆" : score.c >= 4 ? "💪" : "📚"}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: C.amber, letterSpacing: 3, marginBottom: 8 }}>
                  {score.c}/8 — {score.c >= 6 ? "EXCELLENT!" : score.c >= 4 ? "GOOD EFFORT" : "KEEP STUDYING"}
                </div>
                <div style={{ color: C.soft, fontSize: 14, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>
                  {score.c >= 6 ? "You've mastered IC Engines basics. Ready for Mains-level questions. Move to Topic 2!" :
                   score.c >= 4 ? "Solid foundation. Review the wrong answers above and revise the formulas section." :
                   "IC Engines needs more time. Re-read the Learn section, especially P-V cycles and Performance parameters."}
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={resetQuiz} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: C.amber, color: "#000", fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue', cursive", fontSize: 16, letterSpacing: 1 }}>
                    RETRY QUIZ
                  </button>
                  <button onClick={() => setTab("formulas")} style={{ padding: "12px 28px", borderRadius: 8, border: `1px solid ${C.amber}`, background: "transparent", color: C.amber, fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue', cursive", fontSize: 16, letterSpacing: 1 }}>
                    REVIEW FORMULAS
                  </button>
                </div>
              </Panel>
            ) : (
              <div>
                {/* Progress */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Tag label={`Q${qIdx + 1} of ${questions.length}`} color={C.cyan}/>
                    <Tag label={q.level} color={q.level === "BASIC" ? C.green : q.level === "MEDIUM" ? C.amber : q.level === "HARD" ? C.red : C.purple}/>
                    <Tag label={q.topic} color={C.soft}/>
                  </div>
                </div>
                <div style={{ height: 4, background: C.border, borderRadius: 2, marginBottom: 22, overflow: "hidden" }}>
                  <div style={{ width: `${((qIdx) / questions.length) * 100}%`, height: "100%", background: C.amber, borderRadius: 2, transition: "width 0.4s ease" }}/>
                </div>

                {/* Question */}
                <Panel style={{ marginBottom: 16, borderLeft: `4px solid ${C.amber}`, padding: "18px 20px" }}>
                  <div style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>
                    <span style={{ color: C.amber, fontFamily: "'Bebas Neue', cursive", fontSize: 20, marginRight: 8 }}>Q{qIdx + 1}.</span>
                    {q.q}
                  </div>
                </Panel>

                {/* Options */}
                <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
                  {q.opts.map((opt, i) => {
                    let bg = C.card, bdr = C.border, col = C.text, lbg = C.muted;
                    if (selected !== null) {
                      if (i === correctAns) { bg = C.green + "15"; bdr = C.green; col = C.text; lbg = C.green; }
                      else if (i === selected && i !== correctAns) { bg = C.red + "15"; bdr = C.red; col = C.text; lbg = C.red; }
                      else { bg = C.card; bdr = C.border; col = C.muted; }
                    }
                    return (
                      <div key={i} onClick={() => pickAnswer(i)}
                        style={{
                          display: "flex", gap: 14, alignItems: "flex-start",
                          padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${bdr}`,
                          background: bg, color: col, cursor: selected !== null ? "default" : "pointer",
                          transition: "all 0.18s",
                        }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 6, background: lbg + "30",
                          border: `1.5px solid ${lbg}50`, display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Bebas Neue', cursive", fontSize: 15, color: lbg, flexShrink: 0,
                        }}>{["A","B","C","D"][i]}</div>
                        <span style={{ fontSize: 14, lineHeight: 1.5, paddingTop: 4 }}>{opt}</span>
                        {selected !== null && i === correctAns && <span style={{ marginLeft: "auto", fontSize: 18, flexShrink: 0 }}>✅</span>}
                        {selected !== null && i === selected && i !== correctAns && <span style={{ marginLeft: "auto", fontSize: 18, flexShrink: 0 }}>❌</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExp && (
                  <Panel className="slide-in" style={{ borderLeft: `4px solid ${selected === correctAns ? C.green : C.red}`, marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, color: selected === correctAns ? C.green : C.red, marginBottom: 12, fontSize: 15 }}>
                      {selected === correctAns ? "✅ CORRECT!" : "❌ WRONG — Correct answer: " + ["A","B","C","D"][correctAns]}
                    </div>
                    <div style={{ color: C.text, fontSize: 13.5, lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: 14 }}>
                      {q.exp || q.explanation}
                    </div>
                    <div style={{ padding: "10px 14px", background: C.amber + "12", borderRadius: 8, borderLeft: `3px solid ${C.amber}` }}>
                      <span style={{ color: C.amber, fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>⚡ EXAM TIP: </span>
                      <span style={{ color: C.text, fontSize: 13 }}>{q.tip}</span>
                    </div>
                  </Panel>
                )}

                {selected !== null && !quizComplete && (
                  <button onClick={nextQ} style={{
                    width: "100%", padding: 16, borderRadius: 10, border: "none",
                    background: C.amber, color: "#000", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: 2,
                  }}>{qIdx < questions.length - 1 ? "NEXT QUESTION →" : "FINISH QUIZ"}</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ════════ FORMULAS TAB ════════ */}
        {tab === "formulas" && <FormulasTab />}

        {/* ════════ TIPS TAB ════════ */}
        {tab === "tricks" && <TipsTab />}
      </div>
    </div>
  );
}

/* ════════ LEARN SECTIONS ════════ */

function LearnIntro() {
  return (
    <div>
      <SectionTitle num="01" title="IC ENGINES — INTRODUCTION & CLASSIFICATION" sub="Why IC Engines dominate the MPSC RTO exam" />

      <Panel glow={C.amber} style={{ marginBottom: 20, borderTop: `3px solid ${C.amber}` }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: C.amber, letterSpacing: 2, marginBottom: 10 }}>WHY THIS TOPIC MATTERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: "🎯", title: "18% Mains Weightage", desc: "Highest single topic weight. ~30–35 marks expected." },
            { icon: "📅", title: "Asked Every Year", desc: "10/10 previous years had IC Engine questions." },
            { icon: "💼", title: "Job Relevance", desc: "As ARTO/AMVI you'll inspect engines daily. Must know deeply." },
          ].map((c, i) => (
            <div key={i} style={{ padding: 14, background: C.bg, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: C.amber, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 16, color: C.cyan, letterSpacing: 2, marginBottom: 14 }}>WHAT IS AN IC ENGINE?</div>
        <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>
          An <strong style={{ color: C.amber }}>Internal Combustion (IC) Engine</strong> is a heat engine where combustion of fuel occurs <em style={{ color: C.cyan }}>inside the engine cylinder</em> — the expansion of hot gases directly pushes the piston to produce mechanical work.
        </p>
        <p style={{ color: C.soft, lineHeight: 1.8, fontSize: 13, marginTop: 10 }}>
          Unlike external combustion engines (steam engine — combustion is outside), IC engines are compact, lightweight, and power-dense. They are used in cars, trucks, motorcycles, and nearly all motor vehicles you'll inspect as an ARTO.
        </p>
      </Panel>

      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: C.cyan, letterSpacing: 2, marginBottom: 14 }}>COMPLETE CLASSIFICATION TREE</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { head: "By Fuel Used", color: C.amber, items: ["Petrol (Gasoline) engines", "Diesel engines", "CNG / LPG engines", "Bi-fuel engines", "Hydrogen engines (future)"] },
          { head: "By Ignition Type", color: C.cyan, items: ["SI — Spark Ignition (Petrol, CNG)", "CI — Compression Ignition (Diesel)", "HCCI — Homogeneous Charge CI (new tech)"] },
          { head: "By Cycle", color: C.green, items: ["2-Stroke cycle", "4-Stroke cycle", "Wankel / Rotary (rare)"] },
          { head: "By Cylinder Arrangement", color: C.purple, items: ["Inline (In-line 4, I6)", "V-type (V6, V8, V12)", "Flat/Boxer (horizontally opposed)", "Radial (aircraft engines)", "W-type (W12 in luxury cars)"] },
          { head: "By Cooling Method", color: C.red, items: ["Air-cooled (motorcycles, old cars)", "Water/Liquid-cooled (modern cars, trucks)", "Oil-cooled (some motorcycles)"] },
          { head: "By Valve Mechanism", color: C.amber, items: ["OHV — Overhead Valve", "OHC — Overhead Cam (SOHC)", "DOHC — Dual Overhead Cam", "Side valve (SV) — old design"] },
        ].map((c, i) => (
          <Panel key={i} style={{ borderTop: `2px solid ${c.color}`, padding: 16 }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 13, color: c.color, letterSpacing: 2, marginBottom: 10 }}>{c.head}</div>
            {c.items.map((item, j) => (
              <div key={j} style={{ padding: "5px 0", fontSize: 13, color: C.text, display: "flex", gap: 8, borderBottom: `1px solid ${C.border}40` }}>
                <span style={{ color: c.color, flexShrink: 0 }}>→</span>{item}
              </div>
            ))}
          </Panel>
        ))}
      </div>

      <Panel style={{ background: C.amber + "08", borderColor: C.amber + "40" }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.amber, fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>🔑 EXAMINER'S FAVOURITE DEFINITIONS</div>
        {[
          { term: "TDC (Top Dead Centre)", def: "Piston position at the TOP of its stroke — minimum cylinder volume (= Clearance Volume)" },
          { term: "BDC (Bottom Dead Centre)", def: "Piston position at the BOTTOM of its stroke — maximum cylinder volume" },
          { term: "Swept Volume (Vs)", def: "Volume swept by piston from BDC to TDC = (π/4) × d² × L" },
          { term: "Clearance Volume (Vc)", def: "Volume remaining above piston at TDC (combustion chamber volume)" },
          { term: "Compression Ratio (r)", def: "r = (Vs + Vc) / Vc = Total Volume / Clearance Volume" },
          { term: "Bore × Stroke", def: "Bore = cylinder diameter (d). Stroke = piston travel distance (L)" },
        ].map((d, i) => (
          <div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${C.border}40`, display: "flex", gap: 12 }}>
            <span style={{ color: C.amber, fontFamily: "'Source Code Pro', monospace", fontSize: 12, fontWeight: 700, minWidth: 200, flexShrink: 0 }}>{d.term}</span>
            <span style={{ color: C.soft, fontSize: 13 }}>{d.def}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function Learn4Stroke() {
  const [active, setActive] = useState(0);
  const strokes = [
    { name: "SUCTION", n: 1, color: C.cyan, intake: "OPEN", exhaust: "CLOSED", motion: "↓ DOWN", what: "Fresh air-fuel mixture (petrol) or pure air (diesel) is drawn into the cylinder as the piston moves down, creating a low-pressure region.", detail: "Inlet valve opens slightly BEFORE BDC (valve timing). The intake manifold pressure, combined with piston suction, draws the mixture in. In diesel, only AIR is inducted — fuel is injected later.", trick: "Suction = air enters. Direction of piston = DOWN (away from TDC)." },
    { name: "COMPRESSION", n: 2, color: C.amber, intake: "CLOSED", exhaust: "CLOSED", motion: "↑ UP", what: "Both valves closed. Piston moves up, compressing the mixture (petrol) or air (diesel) to a fraction of its original volume, raising temperature.", detail: "Petrol engine CR = 6–10:1, end temperature ~300–400°C. Diesel engine CR = 14–22:1, end temperature ~700–900°C (above diesel's auto-ignition temp of ~250°C). Near end of compression: petrol = spark fires; diesel = fuel injected.", trick: "BOTH valves CLOSED. This is where compression ratio matters most. Higher CR = hotter air = more efficient combustion." },
    { name: "POWER (Expansion)", n: 3, color: C.red, intake: "CLOSED", exhaust: "CLOSED", motion: "↓ DOWN", what: "Combustion gases expand rapidly, pushing the piston DOWN with great force. This is the ONLY stroke that produces useful work.", detail: "Petrol: Spark fires → near-instantaneous combustion at near-constant volume. Diesel: Fuel burns as it's injected → combustion at near-constant pressure. Both: Hot gases expand → piston moves → rotates crankshaft → drives wheels.", trick: "BOTH valves CLOSED. This is the POWER stroke — remember: only 1 in 4 strokes is a power stroke in a 4-stroke engine!" },
    { name: "EXHAUST", n: 4, color: C.green, intake: "CLOSED", exhaust: "OPEN", motion: "↑ UP", what: "Exhaust valve opens. Piston moves up, pushing burnt gases out of the cylinder into the exhaust manifold.", detail: "Some burnt gas always remains (residual gas fraction). Exhaust valve closes slightly AFTER TDC. Valve overlap (both valves briefly open) occurs near TDC to scavenge exhaust gases using intake charge. This is the engineering magic of valve timing!", trick: "Exhaust valve OPEN. Piston moves UP (towards TDC). Think: sweeping the 'broom' (piston) upward to push garbage (exhaust) out." },
  ];
  const s = strokes[active];
  return (
    <div>
      <SectionTitle num="02" title="4-STROKE ENGINE CYCLE" sub="The most examined topic — understand every stroke deeply" />
      <div style={{ marginBottom: 20 }}>
        <CycleDiagram type="4stroke" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
        {strokes.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: "12px 8px", borderRadius: 10, border: `2px solid ${active === i ? s.color : C.border}`,
            background: active === i ? s.color + "18" : C.card, cursor: "pointer",
            fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: active === i ? s.color : C.muted,
            letterSpacing: 1, transition: "all 0.18s",
          }}>{s.n}. {s.name}</button>
        ))}
      </div>
      <Panel glow={s.color} style={{ borderTop: `3px solid ${s.color}` }} key={active} className="slide-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { l: "INLET VALVE", v: s.intake, col: s.intake === "OPEN" ? C.green : C.red },
            { l: "EXHAUST VALVE", v: s.exhaust, col: s.exhaust === "OPEN" ? C.green : C.red },
            { l: "PISTON MOTION", v: s.motion, col: C.cyan },
          ].map(x => (
            <div key={x.l} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{x.l}</div>
              <div style={{ color: x.col, fontFamily: "'Bebas Neue', cursive", fontSize: 18 }}>{x.v}</div>
            </div>
          ))}
        </div>
        <div style={{ color: C.text, fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}><strong style={{ color: s.color }}>What happens: </strong>{s.what}</div>
        <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7, padding: "12px 14px", background: C.bg, borderRadius: 8, marginBottom: 12 }}>{s.detail}</div>
        <div style={{ padding: "10px 14px", background: C.amber + "12", borderRadius: 8, borderLeft: `3px solid ${C.amber}` }}>
          <span style={{ color: C.amber, fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>⚡ TRICK: </span>
          <span style={{ color: C.text, fontSize: 13 }}>{s.trick}</span>
        </div>
      </Panel>
      <Panel style={{ marginTop: 20, borderTop: `2px solid ${C.purple}` }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: C.purple, letterSpacing: 2, marginBottom: 12 }}>VALVE TIMING — ADVANCED (MAINS LEVEL)</div>
        <CompareTable
          headers={["Event", "Petrol Engine", "Diesel Engine"]}
          rows={[
            ["Inlet Valve Opens (IVO)", "10–25° BTDC", "10–20° BTDC"],
            ["Inlet Valve Closes (IVC)", "30–40° ABDC", "25–35° ABDC"],
            ["Exhaust Valve Opens (EVO)", "40–50° BBDC", "35–45° BBDC"],
            ["Exhaust Valve Closes (EVC)", "10–20° ATDC", "10–15° ATDC"],
            ["Valve Overlap (both open)", "20–45° around TDC", "20–35° around TDC"],
          ]}
        />
        <div style={{ marginTop: 12, color: C.soft, fontSize: 12 }}>BTDC = Before TDC | ABDC = After BDC | BBDC = Before BDC | ATDC = After TDC</div>
      </Panel>
    </div>
  );
}

function Learn2Stroke() {
  return (
    <div>
      <SectionTitle num="03" title="2-STROKE ENGINE" sub="Concept, differences from 4-stroke, pros & cons" color={C.cyan} />
      <Panel style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 15, color: C.cyan, letterSpacing: 2, marginBottom: 14 }}>HOW IT WORKS</div>
        <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>In a 2-stroke engine, the complete thermodynamic cycle happens in just <strong style={{ color: C.cyan }}>ONE revolution (360°)</strong> of the crankshaft — compared to 2 revolutions in a 4-stroke. It achieves this by overlapping the intake/exhaust events with the compression/power strokes using PORTS (holes in the cylinder wall) instead of poppet valves.</p>
      </Panel>
      <Panel style={{ marginBottom: 20, borderLeft: `3px solid ${C.cyan}` }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: C.cyan, letterSpacing: 2, marginBottom: 12 }}>THE TWO STROKES</div>
        {[
          { s: "STROKE 1: Compression + Transfer", col: C.amber, d: "Piston moves UP → compresses the charge above. Simultaneously, below the piston (crankcase), fresh mixture is being compressed. At top of stroke: Ignition occurs. Transfer ports become covered." },
          { s: "STROKE 2: Power + Scavenging", col: C.red, d: "Combustion pushes piston DOWN. As piston nears BDC: exhaust port opens first (blowdown), then transfer ports open, and pressurized fresh charge from crankcase flows in, scavenging exhaust gases out." },
        ].map((x, i) => (
          <div key={i} style={{ padding: "14px", background: C.bg, borderRadius: 10, marginBottom: 10 }}>
            <div style={{ color: x.col, fontWeight: 700, marginBottom: 8, fontFamily: "'Bebas Neue', cursive", letterSpacing: 1 }}>{x.s}</div>
            <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>{x.d}</div>
          </div>
        ))}
      </Panel>
      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: C.text, letterSpacing: 2, marginBottom: 12 }}>2-STROKE vs 4-STROKE COMPARISON</div>
      <Panel style={{ marginBottom: 20 }}>
        <CompareTable
          headers={["Parameter", "4-Stroke", "2-Stroke"]}
          rows={[
            ["Power strokes per rev", "1 per 2 revolutions", "1 per revolution"],
            ["Theoretical power output", "Base reference", "~2× (same displacement)"],
            ["Valves", "Poppet valves (inlet + exhaust)", "Ports (no valves)"],
            ["Lubrication", "Separate oil sump", "Oil mixed in fuel (premix) OR separate injection"],
            ["Fuel efficiency", "Better (more efficient)", "Worse (some fuel escapes with exhaust)"],
            ["Emissions", "Lower (BS6 compliant)", "Higher HC, smoke — BS6 non-compliant"],
            ["Weight", "Heavier (valve mechanism)", "Lighter (simpler design)"],
            ["Applications", "Cars, trucks, most motorcycles", "Old scooters, outboard motors, chainsaws"],
            ["Sound", "Smoother", "Louder, more exhaust smoke"],
          ]}
          highlight={[2, 5, 7]}
        />
      </Panel>
      <Panel style={{ background: C.red + "08", borderColor: C.red + "40" }}>
        <div style={{ color: C.red, fontFamily: "'Bebas Neue', cursive", fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>⚠️ WHY 2-STROKE MOTORCYCLES DISAPPEARED IN INDIA</div>
        <p style={{ color: C.text, fontSize: 13, lineHeight: 1.8 }}>
          The BS4 norms (2017) and especially <strong style={{ color: C.red }}>BS6 norms (April 2020)</strong> made it practically impossible for 2-stroke engines to comply. The primary issues are: (1) unburnt hydrocarbons escape during scavenging, (2) lubricating oil is burned with fuel producing visible smoke, (3) no room for DPF/SCR/OBD systems. All major manufacturers (Hero, TVS, Bajaj) phased out 2-stroke vehicles by 2017. This is a key exam question!
        </p>
      </Panel>
    </div>
  );
}

function LearnSIvsCI() {
  return (
    <div>
      <SectionTitle num="04" title="SI vs CI ENGINES — DEEP DIVE" sub="Petrol vs Diesel — the most compared topic in MPSC RTO" color={C.green} />
      <Panel style={{ marginBottom: 20 }}>
        <CompareTable
          headers={["Parameter", "SI Engine (Petrol)", "CI Engine (Diesel)"]}
          rows={[
            ["Full Name", "Spark Ignition", "Compression Ignition"],
            ["Fuel Used", "Petrol / Gasoline / CNG", "Diesel / HSD / Bio-diesel"],
            ["Ignition System", "Spark plug (electric spark)", "No spark plug — auto-ignition"],
            ["Air-Fuel Mixture", "Homogeneous (premixed in intake)", "Heterogeneous (fuel injected at end of compression)"],
            ["Compression Ratio", "6:1 to 10.5:1", "14:1 to 22:1"],
            ["Intake", "Air + Fuel together", "Only Air (fuel injected later)"],
            ["Fuel Injection", "Carburetor / MPFI / GDI", "CRDI / Unit Injector / Common Rail"],
            ["Thermal Efficiency", "25–35%", "35–45% (more efficient)"],
            ["Combustion Type", "Near Constant Volume", "Near Constant Pressure"],
            ["Thermodynamic Cycle", "Otto Cycle", "Diesel Cycle"],
            ["Speed Range", "Higher RPM (1000–7000 rpm)", "Lower RPM (700–4500 rpm)"],
            ["Torque", "Higher at high RPM", "Higher torque at LOW RPM"],
            ["Emissions (untreated)", "Higher CO, HC", "Higher NOx, PM / soot"],
            ["Engine Weight", "Lighter", "Heavier (higher cylinder pressures)"],
            ["Starting", "Easier", "Harder in cold weather (glow plug used)"],
            ["Applications", "Cars, motorcycles, small vehicles", "Trucks, buses, SUVs, generators"],
          ]}
          highlight={[2, 4, 7, 9, 11]}
        />
      </Panel>
      <Panel style={{ borderTop: `2px solid ${C.amber}`, marginBottom: 20 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.amber, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>KNOCK / DETONATION — CRITICAL CONCEPT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ padding: 14, background: C.bg, borderRadius: 10, borderLeft: `3px solid ${C.amber}` }}>
            <div style={{ color: C.amber, fontWeight: 700, marginBottom: 8 }}>PETROL ENGINE KNOCK</div>
            <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>
              Auto-ignition of end-charge before the flame front reaches it. Causes metallic "knocking" sound, overheating, damage. <strong style={{ color: C.text }}>Prevented by:</strong> high OCTANE rating fuel. Higher octane = more resistant to knock. Octane number: RON 91 (regular), RON 95/97 (premium). Also controlled by reducing compression ratio, retarding ignition timing.
            </div>
          </div>
          <div style={{ padding: 14, background: C.bg, borderRadius: 10, borderLeft: `3px solid ${C.cyan}` }}>
            <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 8 }}>DIESEL ENGINE KNOCK</div>
            <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>
              Caused by ignition delay — fuel accumulates before ignition starts, then all ignites at once causing pressure shock. <strong style={{ color: C.text }}>Prevented by:</strong> high CETANE rating diesel. Higher cetane = shorter ignition delay = smoother combustion. Cetane number: 45–55 typical. Diesel knock is different from petrol knock — always causes confusion in exams!
            </div>
          </div>
        </div>
      </Panel>
      <Panel style={{ background: C.green + "08", borderColor: C.green + "40" }}>
        <div style={{ color: C.green, fontFamily: "'Bebas Neue', cursive", fontSize: 14, letterSpacing: 2, marginBottom: 10 }}>🔑 MEMORY TRICK — OCTANE vs CETANE</div>
        <div style={{ color: C.text, fontSize: 14, lineHeight: 1.8 }}>
          <strong style={{ color: C.amber }}>O</strong>ctane → P<strong style={{ color: C.amber }}>e</strong>trol → Think "<strong style={{ color: C.amber }}>OE</strong> = October + Petrol — starts with vowels" <br/>
          <strong style={{ color: C.cyan }}>C</strong>etane → <strong style={{ color: C.cyan }}>D</strong>iesel → Both C and D come later in alphabet = denser, heavier fuel <br/>
          <strong style={{ color: C.green }}>Rule: High Octane = good petrol. High Cetane = good diesel.</strong>
        </div>
      </Panel>
    </div>
  );
}

function LearnCycles() {
  const [cycle, setCycle] = useState("otto");
  return (
    <div>
      <SectionTitle num="05" title="THERMODYNAMIC CYCLES" sub="Otto, Diesel & Dual cycles with P-V diagrams" color={C.purple} />
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["otto", "diesel", "dual"].map(c => (
          <button key={c} onClick={() => setCycle(c)} style={{
            padding: "10px 20px", borderRadius: 8, border: `2px solid ${cycle === c ? C.amber : C.border}`,
            background: cycle === c ? C.amber + "18" : C.card, color: cycle === c ? C.amber : C.muted,
            fontFamily: "'Bebas Neue', cursive", fontSize: 15, letterSpacing: 1, cursor: "pointer",
          }}>{c.toUpperCase()} CYCLE</button>
        ))}
      </div>
      {cycle === "otto" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <CycleDiagram type="pv-otto" />
            <Panel>
              <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.amber, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>OTTO CYCLE PROCESSES</div>
              {[
                { proc: "1→2", name: "Isentropic Compression", col: C.cyan, desc: "Adiabatic — no heat transfer. Work done ON gas." },
                { proc: "2→3", name: "Constant Volume Heat Addition", col: C.amber, desc: "Isochoric. Spark ignition. Pressure rises rapidly at constant volume." },
                { proc: "3→4", name: "Isentropic Expansion", col: C.red, desc: "Power stroke. Work done BY gas on piston." },
                { proc: "4→1", name: "Constant Volume Heat Rejection", col: C.green, desc: "Exhaust blowdown. Pressure drops at constant volume." },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}40` }}>
                  <span style={{ color: p.col, fontFamily: "monospace", fontSize: 12, fontWeight: 700, minWidth: 40 }}>{p.proc}</span>
                  <div>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: C.muted, fontSize: 12 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </Panel>
          </div>
          <Panel style={{ borderLeft: `3px solid ${C.amber}` }}>
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: 16, color: C.amber, textAlign: "center", padding: "12px 0", fontWeight: 700 }}>
              η_otto = 1 − (1/r)^(γ−1)
            </div>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>
              Where: r = compression ratio, γ = ratio of specific heats (1.4 for air)<br/>
              <strong style={{ color: C.green }}>Key fact:</strong> Otto efficiency depends ONLY on compression ratio. Higher r = higher η. For r=8, η≈56.5%. For r=10, η≈60.2%.
            </div>
          </Panel>
        </div>
      )}
      {cycle === "diesel" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <CycleDiagram type="pv-diesel" />
            <Panel>
              <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.red, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>DIESEL CYCLE PROCESSES</div>
              {[
                { proc: "1→2", name: "Isentropic Compression", col: C.cyan, desc: "CR 14–22:1. Air temp reaches ~700–900°C." },
                { proc: "2→3", name: "Constant PRESSURE Heat Addition", col: C.red, desc: "KEY DIFFERENCE: Fuel burns at constant pressure as injected. Cut-off ratio r_c = V3/V2." },
                { proc: "3→4", name: "Isentropic Expansion", col: C.amber, desc: "Power stroke. Gases expand, work done on piston." },
                { proc: "4→1", name: "Constant Volume Heat Rejection", col: C.green, desc: "Exhaust blowdown at constant volume." },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}40` }}>
                  <span style={{ color: p.col, fontFamily: "monospace", fontSize: 12, fontWeight: 700, minWidth: 40 }}>{p.proc}</span>
                  <div>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: C.muted, fontSize: 12 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </Panel>
          </div>
          <Panel style={{ borderLeft: `3px solid ${C.red}` }}>
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: 14, color: C.red, textAlign: "center", padding: "12px 0", fontWeight: 700 }}>
              η_diesel = 1 − (1/r^(γ−1)) × [(r_c^γ − 1) / (γ(r_c − 1))]
            </div>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>
              r = compression ratio, r_c = cut-off ratio (V3/V2), γ = 1.4<br/>
              <strong style={{ color: C.amber }}>Important:</strong> For same CR, η_diesel &lt; η_otto. But diesel engines use HIGHER CR in practice, making them more efficient overall.
            </div>
          </Panel>
        </div>
      )}
      {cycle === "dual" && (
        <Panel>
          <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.purple, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>DUAL (MIXED / SABATHE) CYCLE</div>
          <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>The Dual cycle combines both Otto (constant volume) and Diesel (constant pressure) heat addition. It's a more realistic representation of high-speed diesel engine combustion. Heat is added partly at constant volume (sudden ignition) and partly at constant pressure (continued injection).</p>
          <div style={{ marginTop: 14, padding: "12px 16px", background: C.bg, borderRadius: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.purple, lineHeight: 2 }}>
              For same Compression Ratio:<br/>
              <span style={{ color: C.amber }}>η_otto &gt; η_dual &gt; η_diesel</span><br/><br/>
              For same Maximum Pressure:<br/>
              <span style={{ color: C.cyan }}>η_diesel &gt; η_dual &gt; η_otto</span>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: C.purple + "12", borderRadius: 8, fontSize: 13, color: C.text }}>
            💡 This comparison appears frequently in MPSC Mains. Memorise both conditions!
          </div>
        </Panel>
      )}
    </div>
  );
}

function LearnPerformance() {
  return (
    <div>
      <SectionTitle num="06" title="ENGINE PERFORMANCE PARAMETERS" sub="The most formula-heavy section — master these for Mains" color={C.red} />
      <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
        {[
          { name: "Indicated Power (IP)", col: C.cyan, formula: "IP = (P_m × L × A × N × n) / (60 × K)", vars: "P_m=mean effective pressure (Pa), L=stroke (m), A=bore area (m²), N=rpm, n=no. of cylinders, K=1(2-stroke) or 2(4-stroke)", meaning: "Power developed INSIDE the cylinder by burning gases. Measured by indicator diagram. Theoretical maximum." },
          { name: "Brake Power (BP)", col: C.amber, formula: "BP = 2πNT / 60 = (2πNT) / 60000 kW", vars: "N=rpm, T=torque in N·m", meaning: "Actual usable power measured at the output SHAFT using a dynamometer (brake). Always less than IP." },
          { name: "Friction Power (FP)", col: C.red, formula: "FP = IP − BP", vars: "Lost to: piston rings, bearings, valve train, auxiliaries", meaning: "Power lost to mechanical friction. Typically 10–20% of IP in a good engine." },
          { name: "Mechanical Efficiency", col: C.green, formula: "η_mech = BP/IP × 100%", vars: "Typical values: 80–90% for good engines", meaning: "How much of the indicated (theoretical) power reaches the output shaft." },
          { name: "Thermal Efficiency (BTE)", col: C.purple, formula: "η_BTE = BP / (ṁ_f × CV)", vars: "ṁ_f = fuel mass flow rate (kg/s), CV = calorific value of fuel (J/kg)", meaning: "How efficiently fuel's chemical energy is converted to shaft work. Diesel: 35–45%, Petrol: 25–35%." },
          { name: "Volumetric Efficiency", col: C.cyan, formula: "η_vol = (Actual air mass inducted) / (Theoretical air mass at P_atm, T_atm)", vars: "Typical: 75–90% for N/A engines, >100% for turbocharged", meaning: "How well the engine 'breathes' — fills the cylinder with fresh charge." },
          { name: "BSFC — Brake Specific Fuel Consumption", col: C.amber, formula: "BSFC = ṁ_f / BP (kg/kWh)", vars: "Lower BSFC = better fuel economy. Diesel: ~0.20–0.25 kg/kWh. Petrol: ~0.30–0.40 kg/kWh", meaning: "Fuel consumed per unit of power output. The most common way to compare engine fuel efficiency." },
        ].map((p, i) => (
          <Panel key={i} style={{ borderLeft: `3px solid ${p.col}`, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: p.col, fontFamily: "'Bebas Neue', cursive", fontSize: 15, letterSpacing: 1, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: 13, color: C.text, background: C.bg, padding: "8px 12px", borderRadius: 6, marginBottom: 8, fontWeight: 600 }}>{p.formula}</div>
                <div style={{ color: C.muted, fontSize: 12, marginBottom: 6 }}>Variables: {p.vars}</div>
                <div style={{ color: C.soft, fontSize: 13 }}>{p.meaning}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function LearnModernTech() {
  return (
    <div>
      <SectionTitle num="07" title="MODERN ENGINE TECHNOLOGY" sub="BS6, Fuel Injection, Turbocharging, EV — HIGH EXAM FREQUENCY since 2020" color={C.green} />
      <div style={{ display: "grid", gap: 16 }}>
        {[
          { title: "FUEL INJECTION SYSTEMS", color: C.amber, content: [
            { h: "Carburetor (old — pre-BS4)", b: "Mechanical device using venturi effect to mix air and fuel. No electronic control. Poor fuel economy and emission control. Banned by BS4 norms for cars." },
            { h: "MPFI — Multi-Point Fuel Injection", b: "One fuel injector per cylinder, placed in intake manifold. ECU controlled. Precise fuel-air ratio. Used in BS4/BS6 petrol cars. Better efficiency than carburetor." },
            { h: "GDI — Gasoline Direct Injection", b: "Fuel injected DIRECTLY into combustion chamber (like diesel). Stratified charge possible. Higher efficiency. Used in premium BS6 petrol engines (VW, BMW, Hyundai). Can cause particulate issues." },
            { h: "CRDI — Common Rail Direct Injection (Diesel)", b: "Single high-pressure rail feeds all injectors. Pressure: 1000–2500 bar. Multiple injections per stroke (pilot + main + post). Key to BS6 diesel compliance. Enables precise timing control." },
          ]},
          { title: "TURBOCHARGER vs SUPERCHARGER", color: C.cyan, content: [
            { h: "Turbocharger", b: "Exhaust gas drives a turbine → compresses intake air. No direct mechanical connection to engine. 'Turbo lag' at low RPM. Very efficient (uses waste energy). Standard on BS6 diesel engines (and many petrol)." },
            { h: "Supercharger", b: "Belt-driven from crankshaft. No turbo lag — response at any RPM. Uses engine power (parasitic loss). Less common in modern vehicles. Used in some luxury/performance cars." },
            { h: "VGT — Variable Geometry Turbo", b: "Adjustable vanes in turbine housing change effective area. Eliminates turbo lag at low RPM while maintaining efficiency at high RPM. Standard on modern diesel engines." },
          ]},
          { title: "BS6 EMISSION CONTROL SYSTEMS", color: C.green, content: [
            { h: "Catalytic Converter (Petrol — TWC)", b: "Three-way catalyst: oxidises CO and HC, reduces NOx. Requires stoichiometric AFR (λ=1). Platinum, Palladium, Rhodium. Needs >300°C to work (cold start issue)." },
            { h: "DPF — Diesel Particulate Filter", b: "Traps soot/PM from diesel exhaust. Periodically regenerated (burnt off) at high temp. Mandatory for BS6 diesel. Key reason diesel cars need highway runs." },
            { h: "SCR — Selective Catalytic Reduction", b: "AdBlue (urea solution) injected into exhaust. Converts NOx → N₂ + H₂O. Reduces NOx by 70–90%. Mandatory for BS6 diesel vehicles >3.5 tonnes and most cars." },
            { h: "EGR — Exhaust Gas Recirculation", b: "Recirculates a portion of exhaust back into intake. Lowers combustion temperature → reduces NOx. Used in both petrol and diesel. Cooled EGR used in BS6." },
            { h: "OBD — On-Board Diagnostics (OBD2)", b: "Mandatory for BS6. Monitors all emission-related systems. Illuminates MIL (Malfunction Indicator Lamp / Check Engine light) for faults. ARTO must understand OBD fault codes for vehicle inspection!" },
          ]},
          { title: "ELECTRIC & HYBRID VEHICLES", color: C.purple, content: [
            { h: "BEV — Battery Electric Vehicle", b: "100% electric. No IC engine. Battery + motor. Zero tailpipe emissions. Examples: Tata Nexon EV, MG ZS EV, Ather scooter. Regulated under FAME-II scheme." },
            { h: "HEV — Hybrid Electric Vehicle", b: "IC engine + electric motor. Cannot be plugged in. Battery charged by regenerative braking and engine. Toyota Prius = pioneer. Mild hybrid = 48V assist only." },
            { h: "PHEV — Plug-in Hybrid", b: "Like HEV but with larger battery that can be charged from external source. Can run on EV mode for ~30–60 km. Examples: BMW 530e, Volvo XC60 T8." },
            { h: "FCEV — Fuel Cell EV", b: "Hydrogen fuel + oxygen → electricity (electrochemical). Water vapour as only emission. Toyota Mirai. Very early stage in India." },
          ]},
        ].map((sec, si) => (
          <Panel key={si} style={{ borderTop: `2px solid ${sec.color}` }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", color: sec.color, fontSize: 15, letterSpacing: 2, marginBottom: 14 }}>{sec.title}</div>
            <div style={{ display: "grid", gap: 10 }}>
              {sec.content.map((c, ci) => (
                <div key={ci} style={{ padding: "12px 14px", background: C.bg, borderRadius: 8, borderLeft: `2px solid ${sec.color}60` }}>
                  <div style={{ color: sec.color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.h}</div>
                  <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>{c.b}</div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function LearnFormulas() {
  return <FormulasTab />;
}

function LearnTricks() {
  return <TipsTab />;
}

function FormulasTab() {
  return (
    <div>
      <SectionTitle num="F" title="FORMULA MASTER SHEET" sub="All IC Engine formulas you need — click any formula for a worked example" color={C.cyan} />
      <div style={{ display: "grid", gap: 14 }}>
        <FormulaCard
          name="Otto Cycle Thermal Efficiency"
          formula="η_otto = 1 − (1/r)^(γ−1)"
          color={C.amber}
          vars={[
            { sym: "r", desc: "Compression ratio = (Vs + Vc) / Vc" },
            { sym: "γ", desc: "Ratio of specific heats = 1.4 for air" },
          ]}
          example={"Example: r=8, γ=1.4\nη = 1 − (1/8)^0.4 = 1 − (0.125)^0.4\n= 1 − 0.4353 = 0.5647 → 56.47%\n\nFor r=10: η = 1 − (0.1)^0.4 = 1 − 0.398 = 60.2%"}
        />
        <FormulaCard
          name="Brake Power (from Torque)"
          formula="BP = 2π × N × T / 60000 (kW)"
          color={C.green}
          vars={[
            { sym: "N", desc: "Speed in rpm" },
            { sym: "T", desc: "Torque in N·m" },
          ]}
          example={"Example: N=3000 rpm, T=150 N·m\nBP = 2π × 3000 × 150 / 60000\n= 2 × 3.14159 × 3000 × 150 / 60000\n= 2,827,433 / 60000 = 47.1 kW\n= 47.1 × 1000/746 = 63.1 HP"}
        />
        <FormulaCard
          name="Mechanical Efficiency"
          formula="η_mech = BP / IP × 100%"
          color={C.red}
          vars={[
            { sym: "BP", desc: "Brake Power (output at shaft)" },
            { sym: "IP", desc: "Indicated Power (inside cylinder)" },
            { sym: "FP", desc: "Friction Power = IP − BP" },
          ]}
          example={"Example: IP=50 kW, BP=42 kW\nη_mech = 42/50 × 100 = 84%\nFP = IP − BP = 50 − 42 = 8 kW (lost to friction)"}
        />
        <FormulaCard
          name="Swept Volume & Compression Ratio"
          formula="Vs = (π/4) × d² × L × n    |    r = (Vs + Vc)/Vc"
          color={C.cyan}
          vars={[
            { sym: "d", desc: "Bore (cylinder diameter) in metres" },
            { sym: "L", desc: "Stroke length in metres" },
            { sym: "n", desc: "Number of cylinders" },
            { sym: "Vc", desc: "Clearance volume" },
          ]}
          example={"Example: d=80mm=0.08m, L=90mm=0.09m, 4 cylinders\nVs = (π/4) × (0.08)² × 0.09 × 4\n= 0.7854 × 0.0064 × 0.09 × 4\n= 0.7854 × 0.002304\n= 1809 cc = 1.8L engine\n\nIf Vc = 60cc/cylinder: r = (452+60)/60 = 512/60 = 8.5:1"}
        />
        <FormulaCard
          name="BSFC — Specific Fuel Consumption"
          formula="BSFC = ṁ_f / BP  (kg/kWh)"
          color={C.purple}
          vars={[
            { sym: "ṁ_f", desc: "Fuel consumption rate in kg/h" },
            { sym: "BP", desc: "Brake Power in kW" },
          ]}
          example={"Example: Engine uses 8 kg/h diesel, BP=35 kW\nBSFC = 8/35 = 0.229 kg/kWh\n\nDiesel typical: 0.20–0.25 kg/kWh\nPetrol typical: 0.28–0.40 kg/kWh\nLower BSFC = better economy"}
        />
        <Panel style={{ borderTop: `2px solid ${C.amber}`, background: C.amber + "06" }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", color: C.amber, fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>QUICK REFERENCE — TYPICAL VALUES TO MEMORISE</div>
          <CompareTable
            headers={["Parameter", "Petrol Engine", "Diesel Engine"]}
            rows={[
              ["Compression Ratio", "6–10.5:1", "14–22:1"],
              ["Thermal Efficiency", "25–35%", "35–45%"],
              ["Mechanical Efficiency", "80–88%", "82–90%"],
              ["Volumetric Efficiency (N/A)", "75–85%", "80–92%"],
              ["Air-Fuel Ratio (stoichiometric)", "14.7:1 (λ=1)", "~14.5:1 (excess air always)"],
              ["BSFC", "0.28–0.40 kg/kWh", "0.20–0.25 kg/kWh"],
              ["Max RPM", "Up to 7000+ rpm", "Up to 4500 rpm"],
              ["Max Torque RPM", "3000–5000 rpm", "1500–3000 rpm"],
              ["Cetane/Octane Number", "RON 91–97 (petrol)", "Cetane 45–55 (diesel)"],
            ]}
            highlight={[0, 1, 5]}
          />
        </Panel>
      </div>
    </div>
  );
}

function TipsTab() {
  return (
    <div>
      <SectionTitle num="⚡" title="EXAM TIPS & MEMORY TRICKS" sub="Toppers' secrets — shortcuts, mnemonics, trap-busters for IC Engines" color={C.amber} />
      <div style={{ display: "grid", gap: 14 }}>
        {[
          { icon: "🔠", title: "SCPE Mnemonic — 4-Stroke Order", color: C.cyan, content: [
            "S — SUCTION (Inlet open, piston DOWN)",
            "C — COMPRESSION (Both valves CLOSED, piston UP)",
            "P — POWER (Both valves CLOSED, piston DOWN)",
            "E — EXHAUST (Exhaust valve open, piston UP)",
            "Easy: 'Some Cars Please Everyone' = Suction, Compression, Power, Exhaust",
            "Valve state trick: Only Suction opens INLET. Only Exhaust opens EXHAUST. C and P = BOTH CLOSED.",
          ]},
          { icon: "📊", title: "Compression Ratio — The Number Line Trick", color: C.amber, content: [
            "Petrol CR: 6–10.5:1 → Think '6 to 10, SI engine'",
            "Diesel CR: 14–22:1 → Think '14 to 22, CI engine'",
            "Rule: Diesel CR > Petrol CR always (because diesel needs heat from compression to ignite)",
            "If compression ratio is given as 18:1 → it's a DIESEL engine. If 8:1 → PETROL engine.",
            "Turbo petrol can go up to 12:1 but diesel always starts from 14:1",
          ]},
          { icon: "⚡", title: "Efficiency Rankings — Never Confuse Again", color: C.green, content: [
            "SAME compression ratio: η_otto > η_dual > η_diesel",
            "SAME max pressure: η_diesel > η_dual > η_otto",
            "REAL WORLD: Diesel more efficient because it operates at HIGHER CR",
            "Memory: 'At same CR, Otto is king. At same pressure, Diesel is king.'",
            "Rankine cycle (steam) < both. Carnot cycle = theoretical maximum.",
          ]},
          { icon: "🔧", title: "Power Hierarchy — BP < IP Always", color: C.red, content: [
            "IP (Indicated Power) = Maximum possible → always LARGEST",
            "BP (Brake Power) = What you get at shaft → always SMALLEST",
            "FP (Friction Power) = IP − BP → what's lost",
            "η_mech = BP/IP → always less than 100%",
            "TRAP QUESTION: 'What is mechanical efficiency if BP > IP?' — IMPOSSIBLE in real engine!",
          ]},
          { icon: "🚗", title: "BS Norms Timeline — Memorise This!", color: C.purple, content: [
            "BS1 (2000) → BS2 (2001) → BS3 (2005/2010) → BS4 (2017) → BS6 (April 1, 2020)",
            "INDIA SKIPPED BS5! Direct jump from BS4 to BS6.",
            "BS6 fuel sulphur: 10 ppm (was 50 ppm in BS4)",
            "BS6 NOx for diesel: 80 mg/km (was 180 mg/km in BS4) — 56% reduction",
            "BS6 mandates: OBD-II, DPF (diesel), SCR/AdBlue (diesel), TWC (petrol), EVAP system",
          ]},
          { icon: "💡", title: "Octane vs Cetane — Zero Confusion Method", color: C.amber, content: [
            "OCTANE = Petrol quality. Higher = better. Regular: RON 87–91. Premium: RON 95–97.",
            "CETANE = Diesel quality. Higher = better. Indian HSD: 45–50.",
            "High octane → resists knock (self-ignition) in petrol engine",
            "High cetane → shorter ignition delay → smoother diesel combustion",
            "Mnemonic: 'P comes before D in alphabet, Petrol=Octane=P, Diesel=Cetane=C=D'",
          ]},
          { icon: "🔩", title: "Turbo Questions — Key Facts", color: C.cyan, content: [
            "Turbocharger: driven by EXHAUST gas. No direct mechanical link to engine.",
            "Supercharger: driven by ENGINE via belt/chain. Direct mechanical link.",
            "Turbo advantage: uses waste energy. Disadvantage: turbo lag.",
            "Supercharger advantage: instant response. Disadvantage: parasitic power loss.",
            "VGT (Variable Geometry Turbo): adjustable vanes = no lag at low RPM. Standard on modern diesel.",
            "Intercooler: cools compressed air before entering engine. More air = more power.",
          ]},
          { icon: "📋", title: "Most Repeated MPSC Questions", color: C.green, content: [
            "Q: Difference between SI and CI engine → Answer: Spark plug vs no spark plug",
            "Q: Which cycle has constant pressure heat addition? → Diesel Cycle",
            "Q: BS6 became mandatory from → April 1, 2020",
            "Q: Which emission system uses AdBlue? → SCR (Selective Catalytic Reduction)",
            "Q: Compression ratio of diesel > petrol → TRUE",
            "Q: 2-stroke has power stroke every how many revolutions? → 1 revolution",
            "Q: Mechanical efficiency formula → BP/IP × 100",
            "Q: Volumetric efficiency > 100% is possible in → Turbocharged/Supercharged engines",
          ]},
        ].map((s, i) => (
          <Panel key={i} style={{ borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 16, color: s.color, letterSpacing: 1.5 }}>{s.title}</span>
            </div>
            {s.content.map((item, j) => (
              <div key={j} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}30`, alignItems: "flex-start" }}>
                <span style={{ color: s.color, flexShrink: 0, marginTop: 1 }}>▸</span>
                <span style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </Panel>
        ))}
      </div>
    </div>
  );
}