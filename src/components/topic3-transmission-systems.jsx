import { useState } from "react";

/* ═══════════════════════════════════════════════════
   DESIGN: Industrial workshop / mechanical blueprint
   Dark charcoal + electric cyan + hot orange
   Font: Orbitron (headers) + Fira Code (data/specs)
═══════════════════════════════════════════════════ */

const C = {
  bg:      "#070A0F",
  panel:   "#0A0F18",
  card:    "#0E1520",
  border:  "#182030",
  cyan:    "#06B6D4",
  orange:  "#EA580C",
  yellow:  "#EAB308",
  green:   "#16A34A",
  red:     "#DC2626",
  purple:  "#7C3AED",
  teal:    "#0D9488",
  text:    "#DDE6F0",
  muted:   "#3D5570",
  soft:    "#7A9AB8",
};

/* ── SHARED UI ── */
const Tag = ({ label, color = C.cyan }) => (
  <span style={{
    background: color + "18", color, border: `1px solid ${color}40`,
    padding: "2px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700,
    letterSpacing: 0.8, textTransform: "uppercase",
    fontFamily: "'Fira Code', monospace",
  }}>{label}</span>
);

const Panel = ({ children, style = {}, glow }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 20,
    boxShadow: glow ? `0 0 28px ${glow}18` : "none",
    ...style,
  }}>{children}</div>
);

const SecTitle = ({ icon, title, sub, color = C.cyan }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12, background: color + "18",
        border: `2px solid ${color}45`, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 24, flexShrink: 0,
      }}>{icon}</div>
      <h2 style={{
        margin: 0, fontSize: 22, color: C.text,
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: 2,
      }}>{title}</h2>
    </div>
    {sub && <p style={{ margin: "0 0 0 60px", color: C.soft, fontSize: 13, fontFamily: "'Fira Code', monospace" }}>{sub}</p>}
    <div style={{ height: 2, background: `linear-gradient(90deg, ${color}80, transparent)`, marginTop: 12 }} />
  </div>
);

/* ── ANIMATED GEAR SVG ── */
function GearSVG({ size = 60, color = C.cyan, speed = "4s" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <g style={{ transformOrigin: "50px 50px", animation: `spin ${speed} linear infinite` }}>
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <rect key={i} x="44" y="0" width="12" height="18" rx="3"
            fill={color} fillOpacity="0.7"
            transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="28" fill={color} fillOpacity="0.15"
          stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="12" fill={C.bg}
          stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="5" fill={color} fillOpacity="0.8" />
      </g>
    </svg>
  );
}

/* ── TORQUE FLOW DIAGRAM ── */
function TorqueFlowDiagram() {
  const boxes = [
    { label: "ENGINE", sub: "Source of Power", color: C.orange },
    { label: "CLUTCH", sub: "Connect / Disconnect", color: C.yellow },
    { label: "GEARBOX", sub: "Speed / Torque ratio", color: C.cyan },
    { label: "PROP SHAFT", sub: "Transfer to rear", color: C.teal },
    { label: "DIFFERENTIAL", sub: "Split to wheels", color: C.green },
    { label: "DRIVE WHEELS", sub: "Motion output", color: C.purple },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 0", minWidth: 560 }}>
        {boxes.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
            <div style={{
              flex: 1, background: b.color + "18", border: `2px solid ${b.color}50`,
              borderRadius: 10, padding: "12px 8px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 10, color: b.color, fontWeight: 700, letterSpacing: 1 }}>{b.label}</div>
              <div style={{ color: C.soft, fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>{b.sub}</div>
            </div>
            {i < boxes.length - 1 && (
              <div style={{ color: C.muted, fontSize: 18, flexShrink: 0 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── COMPARISON TABLE ── */
function CTable({ headers, rows, highlight = [] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: C.panel }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px", textAlign: i === 0 ? "left" : "center",
                color: i === 0 ? C.soft : [C.cyan, C.orange, C.yellow, C.green][i - 1] || C.soft,
                borderBottom: `2px solid ${C.border}`,
                fontFamily: "'Fira Code', monospace", fontSize: 11, letterSpacing: 1,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight.includes(ri) ? C.cyan + "08" : "transparent", borderBottom: `1px solid ${C.border}40` }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "9px 14px", textAlign: ci === 0 ? "left" : "center",
                  color: ci === 0 ? C.soft : C.text,
                  fontFamily: ci === 0 ? "'Fira Code', monospace" : "inherit",
                  fontSize: ci === 0 ? 12 : 13,
                  fontWeight: highlight.includes(ri) ? 600 : 400,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════
   ALL CONTENT DATA
══════════════════════════════════════ */

const learnSections = [
  { id: "intro",       icon: "🔗", label: "Intro & Power Flow" },
  { id: "clutch",      icon: "🔘", label: "Clutch Systems" },
  { id: "gearbox",     icon: "⚙️", label: "Gearbox — Manual" },
  { id: "auto",        icon: "🤖", label: "Automatic Gearbox" },
  { id: "propshaft",   icon: "📏", label: "Propeller Shaft" },
  { id: "differential",icon: "🔀", label: "Differential" },
  { id: "axles",       icon: "🛞", label: "Axles & Final Drive" },
  { id: "4wd",         icon: "🏔️", label: "4WD / AWD Systems" },
  { id: "formulas",    icon: "🔢", label: "Formula Sheet" },
  { id: "tricks",      icon: "⚡", label: "Tips & Tricks" },
];

const questions = [
  {
    id:1, level:"BASIC", topic:"Power Flow",
    q:"In a rear-wheel drive (RWD) vehicle, what is the correct order of power transmission from engine to wheels?",
    opts:[
      "Engine → Differential → Gearbox → Propeller Shaft → Wheels",
      "Engine → Clutch → Gearbox → Propeller Shaft → Differential → Axle → Wheels",
      "Engine → Gearbox → Clutch → Differential → Wheels",
      "Engine → Propeller Shaft → Clutch → Gearbox → Wheels",
    ],
    ans:1,
    exp:"Correct power flow in RWD:\nEngine (produces power) → Clutch (connects/disconnects) → Gearbox (multiplies torque, changes speed ratio) → Propeller shaft (transfers to rear) → Differential (splits torque between left and right wheels) → Half shafts/Axle shafts → Drive wheels.\n\nThis is the fundamental question — if you get this order right, everything else follows logically.",
    tip:"Mnemonic: 'Every Car Goes Properly Down Any Road' = Engine, Clutch, Gearbox, Propeller shaft, Differential, Axle shaft, Road-wheels.",
  },
  {
    id:2, level:"BASIC", topic:"Clutch",
    q:"What is the PRIMARY function of a clutch in a motor vehicle transmission system?",
    opts:[
      "To increase the speed of the vehicle",
      "To change the gear ratio",
      "To connect and disconnect the engine from the transmission smoothly",
      "To reduce the speed of rotation of the drive shaft",
    ],
    ans:2,
    exp:"Primary function of clutch: To CONNECT and DISCONNECT the engine from the transmission system without shock. This is needed for:\n1. Starting the vehicle from rest (gradually engaging engine power)\n2. Changing gears (must disconnect engine to shift gears smoothly)\n3. Stopping without stalling the engine (disengage before vehicle halts)\n\nThe clutch is essentially an on/off switch for power transmission — but a smooth, gradual one.",
    tip:"Clutch = connect/disconnect. It does NOT change gear ratio (that's gearbox). It does NOT increase speed (that's engine RPM or gearbox). The 3 needs for clutch: Start, Shift, Stop.",
  },
  {
    id:3, level:"BASIC", topic:"Gear Ratio",
    q:"If a gearbox has an input gear with 30 teeth and output gear with 90 teeth, what is the gear ratio and what happens to torque?",
    opts:[
      "Gear ratio = 3:1; Torque is reduced to 1/3",
      "Gear ratio = 1:3; Torque is tripled",
      "Gear ratio = 3:1; Torque is tripled (torque multiplication)",
      "Gear ratio = 1:3; Torque is reduced to 1/3",
    ],
    ans:2,
    exp:"Gear Ratio = Driven (output) teeth ÷ Driver (input) teeth = 90 ÷ 30 = 3:1\n\nThis means: Output shaft turns 1 revolution for every 3 revolutions of input shaft.\n→ Speed reduces to 1/3rd\n→ Torque MULTIPLIES by 3 (since Power = Torque × Speed, and power is roughly constant)\n\nThis is the fundamental principle: HIGH gear ratio = MORE torque, LESS speed.\nLOW gear ratio = LESS torque, MORE speed.",
    tip:"GOLDEN RULE: Gear ratio and torque are DIRECTLY proportional. Gear ratio and speed are INVERSELY proportional.\nHigh ratio (low gear) = High torque, Low speed → use for climbing hills, starting.\nLow ratio (high gear) = Low torque, High speed → use for highway cruising.",
  },
  {
    id:4, level:"MEDIUM", topic:"Clutch Types",
    q:"In a single plate dry friction clutch, which component is pressed against the flywheel when the clutch is ENGAGED?",
    opts:[
      "Pressure plate only",
      "Clutch plate (friction disc) pressed between flywheel and pressure plate",
      "Release bearing (thrust bearing)",
      "Clutch fork",
    ],
    ans:1,
    exp:"Single plate dry clutch operation:\n\nWhen ENGAGED (pedal up / not pressed):\n→ Pressure plate springs press the friction disc firmly against the flywheel face.\n→ Friction disc (clutch plate) is sandwiched between FLYWHEEL and PRESSURE PLATE.\n→ Friction locks them together → engine and gearbox input shaft rotate together.\n\nWhen DISENGAGED (pedal pressed):\n→ Clutch fork pushes release bearing against the diaphragm spring / pressure plate.\n→ Spring releases pressure → friction disc no longer squeezed → engine and gearbox separate.\n\nKey parts: Flywheel (fixed to engine) | Friction disc (connected to gearbox input) | Pressure plate (controlled by spring) | Release bearing (operated by pedal).",
    tip:"Think of clutch like a sandwich: Flywheel | Friction Disc | Pressure Plate. When engaged = sandwich squished tight. When pedal pressed = sandwich opened. Release bearing is what 'opens' the sandwich.",
  },
  {
    id:5, level:"MEDIUM", topic:"Gearbox",
    q:"In a constant-mesh gearbox, gears are always in mesh but power transmission is controlled by which component?",
    opts:[
      "Sliding gears on splined shafts",
      "Dog clutches (jaw clutches) on the main shaft",
      "Synchromesh rings alone",
      "Helical gears with oil pressure",
    ],
    ans:1,
    exp:"Constant-mesh gearbox: All gears remain in mesh at all times (no gear sliding in/out). Power transmission is selected by DOG CLUTCHES (jaw clutches) on the main shaft.\n\nHow it works:\n→ The output gears spin freely on the main shaft (not locked to it).\n→ Dog clutches (splined to main shaft) can slide to engage/lock any spinning gear to the shaft.\n→ Whichever gear is locked by the dog clutch → that gear ratio is in power path.\n\nTypes of gearbox evolution:\n1. Sliding mesh (oldest) — gears slide into engagement (noisy, needs double clutching)\n2. Constant mesh — gears always meshed, dog clutches select (better)\n3. Synchromesh — dog clutches + synchronizer rings (smooth gear changes, modern standard)",
    tip:"Sliding mesh: gears slide. Constant mesh: dog clutches select. Synchromesh: synchronizer rings equalise speeds before dog clutch engages → no crash/grind. All modern cars = synchromesh.",
  },
  {
    id:6, level:"MEDIUM", topic:"Differential",
    q:"What is the PRIMARY purpose of a differential in a vehicle drivetrain?",
    opts:[
      "To multiply engine torque for climbing steep hills",
      "To allow the drive wheels to rotate at different speeds while both receiving driving force",
      "To disconnect the drive wheels from the engine when braking",
      "To change the direction of power flow by 90 degrees only",
    ],
    ans:1,
    exp:"Primary purpose of differential: Allow BOTH drive wheels to receive power WHILE rotating at DIFFERENT SPEEDS.\n\nWhy different speeds are needed: When a vehicle turns a corner, the OUTER wheel must travel a larger arc than the INNER wheel. If both wheels were locked together (as in a rigid axle without differential), the outer wheel would scrub/skip, causing handling problems and tyre wear.\n\nThe differential allows: Inner wheel to slow down + outer wheel to speed up — while both still receive torque from the engine.\n\nBonus function: Also turns power direction by 90° (from propeller shaft to axle shafts) via bevel gears — but this is SECONDARY. PRIMARY = speed difference allowance.",
    tip:"Differential = 'Speed equalizer for corners.' The sun gears, planet gears inside allow speed difference. BUT problem: in mud/ice, if one wheel loses traction, differential sends ALL power to the spinning wheel (open diff weakness). Solution = LSD (Limited Slip Differential).",
  },
  {
    id:7, level:"HARD", topic:"Automatic Transmission",
    q:"In a conventional automatic transmission (torque converter AT), which component replaces the manual clutch and also provides torque multiplication?",
    opts:[
      "Planetary gear set",
      "Torque converter",
      "Hydraulic control unit",
      "Valve body",
    ],
    ans:1,
    exp:"TORQUE CONVERTER replaces the manual clutch in automatic transmission. It is a fluid coupling with a special feature:\n\nComponents of torque converter:\n1. Pump (impeller): Connected to engine crankshaft, spins with engine\n2. Turbine: Connected to transmission input shaft, driven by fluid\n3. Stator (reactor): Fixed to housing via one-way clutch — KEY component\n\nTorque multiplication: At stall (low vehicle speed), the stator redirects fluid from turbine back to pump in same direction → this adds to pump's effort → TORQUE MULTIPLIED up to 2.5:1.\n\nAs vehicle accelerates: turbine speed approaches pump speed → stator overruns → becomes fluid coupling → no more multiplication.\n\nTorque converter slip = normal but reduces efficiency → modern ATs have 'torque converter lock-up clutch' at highway speeds to eliminate slip (100% efficiency).",
    tip:"Torque converter = fluid clutch + torque multiplier. THREE parts: Pump (engine), Turbine (transmission), Stator (torque multiplier). Stator is what makes it a torque converter, not just a fluid coupling. Lock-up clutch = eliminates slip at highway speeds.",
  },
  {
    id:8, level:"HARD", topic:"Final Drive & Gear Ratio",
    q:"A vehicle has engine speed = 3000 rpm, gearbox ratio in 3rd gear = 1.5:1, final drive (differential) ratio = 4:1. What is the wheel speed (rpm)?",
    opts:[
      "2000 rpm", "500 rpm", "750 rpm", "1200 rpm",
    ],
    ans:1,
    exp:"Overall gear ratio = Gearbox ratio × Final drive ratio = 1.5 × 4 = 6:1\n\nWheel speed = Engine speed ÷ Overall ratio = 3000 ÷ 6 = 500 rpm\n\nStep-by-step:\n1. Engine at 3000 rpm\n2. After gearbox (ratio 1.5:1): 3000 ÷ 1.5 = 2000 rpm at gearbox output\n3. After final drive (ratio 4:1): 2000 ÷ 4 = 500 rpm at wheels\n\nThis is a classic MPSC Mains calculation. Master this formula: Wheel RPM = Engine RPM ÷ (Gearbox ratio × Final drive ratio)",
    tip:"Formula: N_wheel = N_engine ÷ (GR × FDR)\nWhere GR = gearbox gear ratio, FDR = final drive ratio.\nAlso: Vehicle speed = (N_wheel × tyre circumference) = N_wheel × π × D_tyre (in appropriate units).",
  },
  {
    id:9, level:"HARD", topic:"CVT & AMT",
    q:"In a CVT (Continuously Variable Transmission), torque and speed ratios are changed by varying:",
    opts:[
      "The number of gear teeth in mesh",
      "The effective diameter of the pulleys (variators) using a V-belt or chain",
      "The hydraulic pressure in the torque converter",
      "The friction material in the clutch packs",
    ],
    ans:1,
    exp:"CVT (Continuously Variable Transmission) has NO fixed gear steps. Instead:\n\nWorking principle:\n→ Two variable-diameter cone-shaped pulleys (Primary/Drive pulley + Secondary/Driven pulley)\n→ Connected by a V-belt (rubber or push-type steel belt) or chain\n→ When primary pulley opens (wider V), belt rides on smaller diameter → LOW ratio (more torque)\n→ When primary pulley closes (narrower V), belt rides on larger diameter → HIGH ratio (more speed)\n→ Secondary pulley does opposite simultaneously\n\nResult: INFINITE number of gear ratios between min and max → always at optimal engine RPM → better fuel economy.\n\nUsed in: Maruti Celerio, Honda Activa (scooters), many small cars.",
    tip:"CVT = rubber/steel belt on variable cone pulleys. No steps = smooth acceleration. Better fuel economy than AMT or conventional AT. The belt 'rides up and down' the pulleys to change ratio. Weakness: cannot transmit very high torques (belt slippage) — hence not used in heavy vehicles.",
  },
  {
    id:10, level:"EXAM SPECIAL", topic:"LSD & 4WD",
    q:"A Limited Slip Differential (LSD) is used to overcome which major limitation of a conventional open differential?",
    opts:[
      "It cannot change the direction of power by 90 degrees",
      "It cannot allow wheels to rotate at different speeds during cornering",
      "In low-traction conditions, all torque goes to the wheel with least grip (spinning wheel)",
      "It causes excessive tyre wear on straight roads",
    ],
    ans:2,
    exp:"Open (conventional) differential's LIMITATION:\nIn low-traction (mud, ice, one wheel off ground): the differential sends torque to the path of LEAST resistance = the slipping/spinning wheel. The wheel with good traction gets NO torque and vehicle is stuck.\n\nLSD (Limited Slip Differential) solution:\nLSD uses clutch packs, viscous coupling, or Torsen worm gears to LIMIT the speed difference between wheels. When one wheel starts spinning faster than the other (slipping), LSD applies resistance and redirects some torque to the slower (gripping) wheel.\n\nTypes of LSD:\n1. Clutch-type LSD: Friction clutches limit slip\n2. Viscous coupling LSD: Silicone fluid resists speed difference\n3. Torsen (Torque-sensing): Worm gears — more mechanical, no wear items\n4. Electronic LSD (e-LSD): Brakes the slipping wheel electronically\n\nUsed in: Performance cars, 4WD vehicles, SUVs.",
    tip:"Open diff weakness: 'Power goes where it's LEAST needed.' LSD fixes this. Remember LSD types: Clutch | Viscous | Torsen | Electronic. For MPSC: focus on WHY LSD is needed (open diff limitation) and WHAT it does (limits speed difference → redirects torque to gripping wheel).",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Clutch Defects",
    q:"A vehicle shows 'clutch slip' — the engine revs rise but vehicle speed does not increase proportionally. What is the MOST likely cause?",
    opts:[
      "Clutch cable too tight (insufficient free play)",
      "Worn friction lining / clutch plate — insufficient clamping force",
      "Damaged flywheel ring gear",
      "Improper gear meshing in gearbox",
    ],
    ans:1,
    exp:"Clutch slip = Engine power not fully transmitted to gearbox. Engine RPM rises but vehicle doesn't accelerate accordingly.\n\nMost likely cause: Worn friction lining on the clutch plate. When friction material wears thin:\n→ Coefficient of friction reduces\n→ Clamping force from pressure plate springs cannot generate enough friction torque\n→ Clutch plate slips against flywheel under load\n→ Engine revs but power is lost as heat\n\nOther causes: Oil contamination on friction disc, weak pressure plate springs, excessive clutch pedal free play (too much = clutch partially disengaged always).\n\nNOTE: Too little free play (tight cable) causes CLUTCH DRAG, not slip. Option A is wrong for slip specifically.",
    tip:"Two clutch problems to distinguish:\n→ SLIP: Engine revs ↑ but speed doesn't ↑. Cause: worn friction lining, oil on disc, weak springs.\n→ DRAG: Difficult gear changes, grinding. Cause: clutch not fully disengaging. Cause = too little pedal free play, warped disc, bearing seized.\nThese are opposites — slip = too little grip, drag = too much grip when disengaged.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"All Transmission",
    q:"Which type of transmission is most fuel-efficient for city driving due to infinite gear ratios and smooth operation?",
    opts:[
      "Manual 5-speed gearbox (MT)",
      "Torque converter automatic (AT)",
      "AMT (Automated Manual Transmission)",
      "CVT (Continuously Variable Transmission)",
    ],
    ans:3,
    exp:"CVT (Continuously Variable Transmission) is most fuel-efficient for CITY driving because:\n\n1. Infinite gear ratios: Engine always operates at its most efficient RPM — no steps to jump between.\n2. No torque converter: CVT uses clutch or separate torque converter but eliminates the slip losses of a full AT.\n3. Smooth power delivery: No gear shifts = no power interruption = consistent efficiency.\n\nComparison for city driving:\n→ MT: Efficient but requires constant driver input; stalling in traffic is common.\n→ AT (torque converter): Convenient but torque converter slip wastes energy.\n→ AMT: Basically an automated manual — similar efficiency to MT but jerky shifts.\n→ CVT: Best efficiency + convenience combination for city use.\n\nFor HIGHWAY: MT or modern DCT (Dual Clutch Transmission) can be more efficient than CVT.",
    tip:"Efficiency ranking for CITY: CVT > AMT > MT > AT (traditional).\nEfficiency ranking for HIGHWAY: MT ≈ DCT > CVT > AMT > AT.\nFor MPSC: CVT = best city fuel economy. MT = best highway efficiency (if driver operates well). DCT (DSG) = best of both worlds (used in VW, Hyundai).",
  },
];

/* ══════════════════════════════════════
   SECTION CONTENT COMPONENTS
══════════════════════════════════════ */

function IntroSection() {
  return (
    <div>
      <SecTitle icon="🔗" title="INTRO & POWER FLOW" sub="Why transmission exists + complete drivetrain flow" />
      <Panel glow={C.cyan} style={{ marginBottom: 20, borderTop: `3px solid ${C.cyan}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: C.cyan, letterSpacing: 1.5, marginBottom: 12 }}>WHY TRANSMISSION IS NEEDED</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: "⚡", t: "Torque Mismatch", d: "Engine produces max torque at specific RPM. Vehicles need HIGH torque at LOW speed (starting) and LOW torque at HIGH speed (cruising). Engine alone can't do this." },
            { icon: "🔄", t: "Speed Range", d: "Engine RPM range: ~700–7000 rpm. But wheel speed must vary from 0 to 3000+ rpm. Gearbox multiplies/reduces to match." },
            { icon: "🔌", t: "Engine Isolation", d: "Clutch allows engine to keep running when vehicle is stationary. Without clutch, engine would stall every time you stop." },
          ].map((c, i) => (
            <div key={i} style={{ padding: 14, background: C.bg, borderRadius: 10 }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: C.cyan, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.t}</div>
              <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.6 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: C.orange, letterSpacing: 1, marginBottom: 14 }}>COMPLETE DRIVETRAIN POWER FLOW</div>
        <TorqueFlowDiagram />
        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          {[
            { comp: "Engine", role: "Converts fuel energy to rotational mechanical energy (torque × speed = power). Output via crankshaft.", color: C.orange },
            { comp: "Clutch", role: "Smooth engagement/disengagement. Acts as a torque limiter. Absorbs shock during gear changes.", color: C.yellow },
            { comp: "Gearbox", role: "Multiplies torque at low speeds (low gears), reduces torque at high speeds (high gears). Also provides reverse.", color: C.cyan },
            { comp: "Propeller Shaft", role: "Transfers rotational power from gearbox (front) to differential (rear) in RWD vehicles. Uses universal joints to handle misalignment.", color: C.teal },
            { comp: "Differential", role: "Splits torque equally between left and right drive wheels. Allows different wheel speeds during cornering.", color: C.green },
            { comp: "Axle Shafts", role: "Transfer torque from differential to individual wheels. Half-shaft in independent suspension, full axle in rigid.", color: C.purple },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "10px 14px", background: C.bg, borderRadius: 8, alignItems: "flex-start" }}>
              <div style={{ color: c.color, fontFamily: "'Fira Code', monospace", fontSize: 12, fontWeight: 700, minWidth: 120, flexShrink: 0 }}>{c.comp}</div>
              <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.6 }}>{c.role}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel style={{ borderTop: `2px solid ${C.yellow}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: C.yellow, letterSpacing: 1, marginBottom: 12 }}>DRIVETRAIN CONFIGURATIONS</div>
        <CTable
          headers={["Layout", "Description", "Examples", "Advantage"]}
          rows={[
            ["FWD (Front-Wheel Drive)", "Engine + gearbox + diff all in front. Drives front wheels.", "Maruti Swift, Honda City", "Compact, light, good traction uphill"],
            ["RWD (Rear-Wheel Drive)", "Engine front, power sent to rear wheels via prop shaft", "Most trucks, buses, old cars, BMW", "Better weight distribution, towing"],
            ["AWD (All-Wheel Drive)", "All 4 wheels driven continuously, auto torque split", "Audi Quattro, Subaru", "Best traction in all conditions"],
            ["4WD (Four-Wheel Drive)", "Driver selectable 4WD, usually 2H/4H/4L modes", "Mahindra Thar, Scorpio, Bolero", "Off-road capability, selectable"],
            ["Mid-engine RWD", "Engine behind driver, drives rear wheels", "Sports cars — Ferrari, McLaren", "Perfect weight balance"],
          ]}
          highlight={[0, 1]}
        />
      </Panel>
    </div>
  );
}

function ClutchSection() {
  const [activeType, setActiveType] = useState(0);
  const clutchTypes = [
    {
      name: "Single Plate Dry Clutch",
      color: C.cyan,
      desc: "Most common in cars and light vehicles. One friction disc between flywheel and pressure plate. Dry = no oil/fluid contact.",
      parts: [
        { p: "Flywheel", r: "Bolted to crankshaft. Acts as one friction surface. Has ring gear for starter motor." },
        { p: "Friction Disc (Clutch Plate)", r: "Splined to gearbox input shaft. Both sides have friction lining. Has torsional springs to absorb shock." },
        { p: "Pressure Plate Assembly", r: "Contains pressure plate + diaphragm/coil springs. Springs clamp friction disc against flywheel." },
        { p: "Release Bearing (Thrust Bearing)", r: "Operated by clutch fork. Pushes against spring to release clamping force." },
        { p: "Clutch Fork", r: "Lever actuated by clutch pedal via cable or hydraulic system." },
      ],
      working: "ENGAGED (pedal up): Diaphragm spring pushes pressure plate → friction disc clamped between flywheel and pressure plate → both rotate together → power transmitted.\n\nDISENGAGED (pedal pressed): Clutch pedal → cable/hydraulic → clutch fork → release bearing pushes spring centre → spring flexes → pressure plate retracts → friction disc free to slip → engine and gearbox separated.",
      pros: ["Simple, light, low cost", "Good for normal driving", "Easy to repair/replace", "Dry = no fluid required"],
      cons: ["Heat buildup during slip", "Single friction surface = less torque capacity", "Not suitable for heavy vehicles"],
      use: "Passenger cars (Maruti, Honda, Hyundai), motorcycles",
    },
    {
      name: "Multi-Plate Clutch",
      color: C.orange,
      desc: "Multiple friction plates interleaved (alternating driving and driven plates). Used in motorcycles (wet type) and heavy vehicles. Can transmit much higher torque in compact space.",
      parts: [
        { p: "Outer Drum (Basket)", r: "Connected to engine. Holds alternate driving plates in slots." },
        { p: "Inner Hub", r: "Connected to gearbox input shaft. Holds driven friction plates." },
        { p: "Friction Plates", r: "Alternating: plain steel plates + friction-lined plates. Stack creates clamping surface." },
        { p: "Pressure Springs", r: "Coil springs clamp the plate stack together." },
        { p: "Clutch Release Mechanism", r: "Lifter pins/balls mechanism to release spring pressure." },
      ],
      working: "Multiple friction surfaces are stacked → each surface contributes friction force → total torque capacity is N times single plate, where N = number of contact interfaces.\n\nWet multi-plate (motorcycle): Oil lubricates plates → reduces friction but adds cooling → prevents heat damage → longer life.",
      pros: ["Higher torque capacity in compact size", "Smooth engagement", "Wet type = oil-cooled = long life", "Used in automatics (clutch packs)"],
      cons: ["More complex", "Wet type: oil can contaminate and reduce friction", "Expensive"],
      use: "Motorcycles (engine clutch), heavy vehicles, automatic transmission clutch packs",
    },
    {
      name: "Centrifugal Clutch",
      color: C.yellow,
      desc: "Engages automatically when engine speed reaches a set RPM. No clutch pedal needed. Uses centrifugal force of rotating weights to engage friction shoes against drum.",
      parts: [
        { p: "Spider (driving plate)", r: "Connected to engine crankshaft. Rotates with engine." },
        { p: "Centrifugal Weights / Shoes", r: "Hinged to spider. Fly outward as RPM increases due to centrifugal force." },
        { p: "Friction Lining on Shoes", r: "When shoes fly out, friction lining contacts the drum." },
        { p: "Clutch Drum", r: "Connected to gearbox. When shoes contact drum → power transmitted." },
        { p: "Return Springs", r: "Hold shoes inward at low RPM. Spring force = engagement RPM control." },
      ],
      working: "At idle speed: Centrifugal force < spring force → shoes retracted → drum free → no power transmission.\n\nAt set RPM (usually 1500–2000 rpm): Centrifugal force > spring force → shoes fly outward → contact drum → friction drives drum → power transmitted to wheels.\n\nAs RPM increases: More contact force → more torque capacity.",
      pros: ["No clutch pedal needed", "Prevents engine stall (only engages above idle)", "Simple to operate", "Automatic"],
      cons: ["Cannot control engagement precisely", "Slip generates heat at engagement", "Not suitable for performance driving"],
      use: "Scooters (Activa), mopeds, go-karts, chainsaws, industrial machinery",
    },
    {
      name: "Hydraulic Clutch (Fluid Coupling)",
      color: C.teal,
      desc: "Uses hydraulic fluid (oil) to transmit torque. No mechanical connection between input and output. Used as torque converter in automatic transmissions.",
      parts: [
        { p: "Pump (Impeller)", r: "Connected to engine. Centrifugal pump throws fluid outward." },
        { p: "Turbine", r: "Connected to output shaft. Driven by fluid thrown by pump." },
        { p: "Fluid (ATF)", r: "Automatic Transmission Fluid acts as the power transfer medium." },
        { p: "Stator (in torque converter)", r: "Fixed element that redirects fluid to multiply torque." },
      ],
      working: "Engine turns pump → pump throws fluid outward → fluid hits turbine blades → turbine is driven → output shaft rotates.\n\nNo mechanical contact = smooth engagement, natural slip at stall, shock absorption.\n\nIn TORQUE CONVERTER: Stator redirects fluid → torque is multiplied up to 2.5× at stall.",
      pros: ["Smooth, shockless power transfer", "Automatic engagement/disengagement", "No clutch wear (no friction contact)", "Torque multiplication possible"],
      cons: ["Slip = energy loss", "Complex, expensive", "Requires clean hydraulic fluid", "Heat generation at slip"],
      use: "All automatic transmission vehicles, buses with fluid couplings",
    },
  ];
  const ct = clutchTypes[activeType];
  return (
    <div>
      <SecTitle icon="🔘" title="CLUTCH SYSTEMS" sub="All types, components, working & defects — deep dive" color={C.yellow} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
        {clutchTypes.map((c, i) => (
          <button key={i} onClick={() => setActiveType(i)} style={{
            padding: "12px 14px", borderRadius: 10, textAlign: "left",
            border: `2px solid ${activeType === i ? c.color : C.border}`,
            background: activeType === i ? c.color + "12" : C.card, cursor: "pointer",
            transition: "all 0.15s",
          }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: activeType === i ? c.color : C.muted, fontWeight: 700 }}>{c.name}</div>
            <div style={{ color: C.soft, fontSize: 11, marginTop: 4 }}>{c.desc.slice(0, 60)}...</div>
          </button>
        ))}
      </div>
      <Panel key={activeType} glow={ct.color} style={{ borderTop: `3px solid ${ct.color}` }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, color: ct.color, letterSpacing: 2, marginBottom: 14 }}>{ct.name}</div>
        <p style={{ color: C.text, fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>{ct.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Fira Code', monospace", color: ct.color, fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>KEY COMPONENTS</div>
            {ct.parts.map((p, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}40` }}>
                <div style={{ color: ct.color, fontSize: 12, fontWeight: 700 }}>{p.p}</div>
                <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.5, marginTop: 2 }}>{p.r}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Fira Code', monospace", color: C.green, fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>PROS</div>
            {ct.pros.map((p, i) => (
              <div key={i} style={{ color: C.text, fontSize: 12, padding: "4px 0", display: "flex", gap: 8 }}>
                <span style={{ color: C.green }}>✓</span>{p}
              </div>
            ))}
            <div style={{ fontFamily: "'Fira Code', monospace", color: C.red, fontSize: 11, letterSpacing: 1, margin: "12px 0 10px" }}>CONS</div>
            {ct.cons.map((p, i) => (
              <div key={i} style={{ color: C.text, fontSize: 12, padding: "4px 0", display: "flex", gap: 8 }}>
                <span style={{ color: C.red }}>✗</span>{p}
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "8px 12px", background: ct.color + "12", borderRadius: 8 }}>
              <span style={{ color: ct.color, fontWeight: 700, fontSize: 11, fontFamily: "monospace" }}>📍 USED IN: </span>
              <span style={{ color: C.text, fontSize: 12 }}>{ct.use}</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px", background: C.bg, borderRadius: 10, borderLeft: `3px solid ${ct.color}60` }}>
          <div style={{ fontFamily: "'Fira Code', monospace", color: ct.color, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>WORKING PRINCIPLE</div>
          <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line" }}>{ct.working}</div>
        </div>
      </Panel>
      <Panel style={{ marginTop: 18, borderTop: `2px solid ${C.red}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.red, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>CLUTCH FAULTS DIAGNOSIS (EXAM FAVOURITE)</div>
        <CTable
          headers={["Fault", "Symptom", "Cause", "Remedy"]}
          rows={[
            ["Clutch Slip", "Engine revs up but speed doesn't increase", "Worn friction lining, oil on disc, weak springs", "Replace friction disc / pressure plate"],
            ["Clutch Drag", "Difficult gear changes, grinding noise", "Clutch not fully disengaging: warped disc, seized bearing, tight cable", "Adjust free play, replace disc/bearing"],
            ["Clutch Judder", "Vibration/shudder when engaging", "Oil contamination on disc, loose engine mounts, worn splines", "Clean/replace disc, check mounts"],
            ["Clutch Squeal/Noise", "Squealing when pressing pedal", "Dry/worn release bearing (thrust bearing)", "Grease/replace release bearing"],
            ["Clutch Pedal Hard", "Heavy/stiff clutch pedal", "Tight cable, worn fork pivot, seized mechanism", "Lubricate/replace cable, check pivot"],
          ]}
          highlight={[0, 1]}
        />
      </Panel>
    </div>
  );
}

function GearboxSection() {
  const [activeGear, setActiveGear] = useState(0);
  const gearTypes = [
    {
      name: "Sliding Mesh Gearbox", era: "Oldest", color: C.muted,
      desc: "Gears physically slide into mesh. Each gear is loose on shaft and slides to engage. Makes noise ('double declutching' needed). Almost extinct.",
      how: "Shift lever moves gears along splined shaft until teeth of matching gears engage. Speed must be matched perfectly or gears clash — hence double declutching (blip throttle between gears).",
    },
    {
      name: "Constant Mesh Gearbox", era: "Mid-era", color: C.soft,
      desc: "All gears always in mesh. Dog clutches (jaw clutches) on main shaft engage specific gears. Better than sliding mesh but still some skill needed.",
      how: "Output gears spin freely on main shaft at all times. Dog clutches (splined to shaft) slide to lock specific output gears to the main shaft, selecting that ratio.",
    },
    {
      name: "Synchromesh Gearbox", era: "Modern Standard", color: C.cyan,
      desc: "Like constant mesh but with synchronizer rings that match speeds BEFORE dog clutches engage. No gear clash. Smooth changes. All modern MT cars use this.",
      how: "Synchronizer ring (baulk ring) makes contact with gear cone → friction matches speeds → dog teeth align → ring slides to engage → smooth, quiet shift. No double-clutching needed.",
    },
  ];
  return (
    <div>
      <SecTitle icon="⚙️" title="MANUAL GEARBOX" sub="Sliding mesh → constant mesh → synchromesh + gear ratios explained" color={C.cyan} />
      <Panel style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 14 }}>GEAR RATIO CONCEPT — VISUAL UNDERSTANDING</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>
              <strong style={{ color: C.orange }}>Gear Ratio</strong> = Driven gear teeth ÷ Driver gear teeth = Output speed ÷ Input speed (inverted)
            </p>
            <p style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>
              A HIGHER gear ratio means the output shaft turns SLOWER than the input — but with MORE torque. Perfect for starting from rest (1st gear, highest ratio) or climbing hills.
            </p>
            <p style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>
              A LOWER gear ratio (or 1:1 in top gear) means near-equal speeds — less torque multiplication — for efficient high-speed cruising.
            </p>
          </div>
          <div>
            <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: C.yellow, marginBottom: 10, letterSpacing: 1 }}>TYPICAL 5-SPEED CAR RATIOS</div>
              {[
                { g: "1st Gear", r: "3.5–4.0 : 1", use: "Starting, max torque, slow speed" },
                { g: "2nd Gear", r: "2.0–2.5 : 1", use: "Low-speed traffic, acceleration" },
                { g: "3rd Gear", r: "1.3–1.5 : 1", use: "City driving, moderate speed" },
                { g: "4th Gear", r: "0.9–1.1 : 1", use: "Highway, balanced" },
                { g: "5th Gear", r: "0.7–0.9 : 1", use: "Overdrive, max economy" },
                { g: "Reverse", r: "3.0–4.5 : 1", use: "Reversed direction, high torque" },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.border}40`, alignItems: "center" }}>
                  <span style={{ color: C.yellow, fontFamily: "monospace", fontSize: 11, minWidth: 65 }}>{x.g}</span>
                  <span style={{ color: C.cyan, fontFamily: "monospace", fontSize: 12, fontWeight: 700, minWidth: 90 }}>{x.r}</span>
                  <span style={{ color: C.muted, fontSize: 11 }}>{x.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {gearTypes.map((g, i) => (
          <button key={i} onClick={() => setActiveGear(i)} style={{
            flex: 1, padding: "11px 10px", borderRadius: 10, border: `2px solid ${activeGear === i ? g.color : C.border}`,
            background: activeGear === i ? g.color + "12" : C.card, cursor: "pointer",
            fontFamily: "'Fira Code', monospace", fontSize: 11, color: activeGear === i ? g.color : C.muted,
            transition: "all 0.15s",
          }}>{g.name}<br/><span style={{ fontSize: 9 }}>{g.era}</span></button>
        ))}
      </div>
      <Panel key={activeGear} style={{ borderTop: `3px solid ${gearTypes[activeGear].color}`, marginBottom: 20 }}>
        <div style={{ color: gearTypes[activeGear].color, fontFamily: "'Orbitron', sans-serif", fontSize: 15, letterSpacing: 1, marginBottom: 10 }}>{gearTypes[activeGear].name}</div>
        <p style={{ color: C.text, fontSize: 14, lineHeight: 1.8 }}>{gearTypes[activeGear].desc}</p>
        <div style={{ marginTop: 12, padding: "12px 14px", background: C.bg, borderRadius: 8, borderLeft: `3px solid ${gearTypes[activeGear].color}60` }}>
          <div style={{ fontFamily: "'Fira Code', monospace", color: gearTypes[activeGear].color, fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>HOW IT WORKS</div>
          <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>{gearTypes[activeGear].how}</div>
        </div>
      </Panel>
      <Panel style={{ borderTop: `2px solid ${C.cyan}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.cyan, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>SYNCHROMESH — DEEP DIVE (MOST ASKED)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <p style={{ color: C.text, fontSize: 13, lineHeight: 1.8 }}>
              The <strong style={{ color: C.cyan }}>synchronizer (synchro) unit</strong> consists of:
            </p>
            {[
              { p: "Synchronizer Hub", d: "Splined to main shaft. Always rotates with shaft." },
              { p: "Synchronizer Sleeve", d: "Slides over hub. External teeth engage dog teeth on gears." },
              { p: "Baulk Ring (Blocker Ring)", d: "Conical friction ring. First contact with gear cone. Matches speeds via friction." },
              { p: "Synchronizer Springs & Balls", d: "Detent mechanism gives feel of gear engagement." },
            ].map((x, i) => (
              <div key={i} style={{ padding: "7px 0", borderBottom: `1px solid ${C.border}40` }}>
                <div style={{ color: C.cyan, fontSize: 12, fontWeight: 700 }}>{x.p}</div>
                <div style={{ color: C.soft, fontSize: 12, marginTop: 2 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
              <div style={{ color: C.yellow, fontFamily: "'Fira Code', monospace", fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>GEAR CHANGE SEQUENCE</div>
              {[
                "1. Driver presses clutch — engine disconnected",
                "2. Shift lever pushes selector fork",
                "3. Fork moves synchronizer sleeve toward target gear",
                "4. Baulk ring contacts gear cone first",
                "5. Friction matches speeds (no clash yet)",
                "6. Speeds equalised → baulk ring aligns",
                "7. Sleeve slides further → dog teeth engage",
                "8. Gear locked to shaft → clutch released",
                "9. Power flows through new ratio",
              ].map((s, i) => (
                <div key={i} style={{ color: C.text, fontSize: 12, padding: "4px 0", display: "flex", gap: 8 }}>
                  <span style={{ color: C.cyan, flexShrink: 0, fontFamily: "monospace", fontSize: 10 }}>{String(i+1).padStart(2,"0")}.</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function AutoSection() {
  return (
    <div>
      <SecTitle icon="🤖" title="AUTOMATIC TRANSMISSIONS" sub="AT · AMT · CVT · DCT — working, comparison & exam focus" color={C.purple} />
      <div style={{ display: "grid", gap: 16 }}>
        {[
          {
            name: "Torque Converter AT (Traditional Automatic)",
            color: C.purple,
            tag: "MOST COMMON",
            desc: "Uses torque converter (fluid coupling + torque multiplication) + planetary gear sets + hydraulic/electronic controls. Gear shifts are automatic based on speed and throttle.",
            keyPoints: [
              "Torque converter: pump + turbine + stator. Stator multiplies torque up to 2.5× at stall",
              "Planetary gear set: sun gear + planet gears + ring gear + carrier. Different combinations give different ratios",
              "Hydraulic/Electronic control unit (ECU) selects gears automatically",
              "Lock-up clutch: at highway speed, converter locks mechanically to eliminate slip",
              "Modern 6–10 speed ATs are very efficient. Used in SUVs, luxury cars, commercial vehicles",
              "Shift modes: P (Park) | R (Reverse) | N (Neutral) | D (Drive) | L/S (Low/Sport)",
            ],
          },
          {
            name: "AMT — Automated Manual Transmission",
            color: C.orange,
            tag: "INDIA FAVOURITE",
            desc: "Essentially a manual gearbox (synchromesh) with electronic actuators for clutch and gear selection. No clutch pedal — computer controls when to shift. Budget-friendly automation.",
            keyPoints: [
              "Same internal gearbox as manual MT — just clutch and gear shift are automated",
              "ECU monitors: throttle position, speed, RPM → decides shift point",
              "Actuator operates clutch and gear selector mechanically",
              "Characteristic AMT 'head nod' during shifts: brief power interruption like MT",
              "Much cheaper than AT or CVT. Used in: Maruti Alto K10, Wagon R AMT, Tata Tiago AMT",
              "Fuel efficiency close to MT. Maintenance similar to MT",
            ],
          },
          {
            name: "CVT — Continuously Variable Transmission",
            color: C.cyan,
            tag: "BEST EFFICIENCY",
            desc: "No fixed gear ratios. Two variable-diameter pulleys connected by V-belt or chain. Infinite ratio variation keeps engine at optimal RPM at all times.",
            keyPoints: [
              "Primary pulley (engine side) + secondary pulley (wheel side) + V-belt/chain",
              "Primary pulley closes → belt rides larger diameter → overdrive (higher speed)",
              "Primary pulley opens → belt rides smaller diameter → low ratio (more torque)",
              "Both pulleys move simultaneously and inversely",
              "Hydraulic pressure or electronic stepper motors control pulley width",
              "Engine stays at 'sweet spot' RPM → best fuel economy",
              "Limitation: belt can slip under very high torque → not for heavy vehicles",
              "Used in: Maruti Celerio CVT, Honda Jazz CVT, all scooters (automatic V-belt)",
            ],
          },
          {
            name: "DCT — Dual Clutch Transmission",
            color: C.teal,
            tag: "PERFORMANCE",
            desc: "Two separate clutches — one for odd gears (1,3,5), one for even gears (2,4,6). While current gear is engaged, next gear is pre-selected. Fastest gear changes.",
            keyPoints: [
              "Two input shafts: inner shaft (odd gears 1,3,5,7) + outer hollow shaft (even gears 2,4,6)",
              "Each shaft has its own clutch pack",
              "During 3rd gear: 4th gear is pre-selected on other shaft — waiting",
              "On shift: one clutch opens, other closes instantly — <100ms shift time",
              "Wet DCT (submerged in oil): for high torque, more cooling. Used in 4WD, trucks",
              "Dry DCT: for smaller cars, lighter. Used in VW Golf DSG, Hyundai DCT",
              "Combines MT efficiency with AT convenience. Best of both worlds",
            ],
          },
        ].map((t, i) => (
          <Panel key={i} style={{ borderLeft: `4px solid ${t.color}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, color: t.color, letterSpacing: 1 }}>{t.name}</div>
              <Tag label={t.tag} color={t.color} />
            </div>
            <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{t.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {t.keyPoints.map((pt, j) => (
                <div key={j} style={{ display: "flex", gap: 8, padding: "6px 8px", background: C.bg, borderRadius: 6, alignItems: "flex-start" }}>
                  <span style={{ color: t.color, flexShrink: 0, fontSize: 10, marginTop: 3 }}>▸</span>
                  <span style={{ color: C.soft, fontSize: 12, lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
        <Panel style={{ borderTop: `2px solid ${C.yellow}` }}>
          <div style={{ fontFamily: "'Fira Code', monospace", color: C.yellow, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>TRANSMISSION COMPARISON — QUICK REFERENCE</div>
          <CTable
            headers={["Parameter", "MT", "AMT", "CVT", "AT (TC)", "DCT"]}
            rows={[
              ["Clutch type", "Manual friction disc", "Automated friction disc", "Wet/dry clutch", "Torque converter", "Two clutch packs"],
              ["Gear changes", "Manual (driver)", "Auto (computer)", "Infinite (no steps)", "Auto (planetary)", "Dual shaft, instant"],
              ["Fuel efficiency", "★★★★★", "★★★★☆", "★★★★☆", "★★★☆☆", "★★★★★"],
              ["Cost", "Lowest", "Low", "Medium", "High", "Very High"],
              ["Shift comfort", "Driver dependent", "Noticeable jerk", "Very smooth", "Smooth", "Fastest (<100ms)"],
              ["Maintenance", "Low", "Low-Medium", "Medium", "High", "High"],
              ["Torque capacity", "High", "High (same as MT)", "Limited (belt)", "High", "Very High"],
              ["Best for", "Highway, sporty", "City + value", "City efficiency", "Luxury, SUV", "Performance, sporty"],
            ]}
            highlight={[2, 7]}
          />
        </Panel>
      </div>
    </div>
  );
}

function PropshaftSection() {
  return (
    <div>
      <SecTitle icon="📏" title="PROPELLER SHAFT & UNIVERSAL JOINTS" sub="Power transfer from gearbox to differential — misalignment handling" color={C.teal} />
      <Panel style={{ marginBottom: 18 }}>
        <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>
          The <strong style={{ color: C.teal }}>propeller shaft</strong> (also called drive shaft or Cardan shaft) transfers rotational power from the gearbox output (front) to the differential (rear) in RWD vehicles. The key challenge: the gearbox and differential are not in the same line — there is an angular misalignment that changes as the suspension moves.
        </p>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        {[
          {
            title: "Universal Joint (U-Joint / Hooke's Joint)",
            color: C.teal,
            points: [
              "Allows transmission of torque at an angle (up to ~15°)",
              "Two yokes + cross-pin (spider). Yokes at 90° to each other.",
              "Single U-joint: causes velocity fluctuation (non-uniform angular velocity)",
              "Two U-joints at equal angles cancel out the fluctuation",
              "Phase angle: both joints must be in same phase (yokes parallel) for smooth rotation",
              "Used at both ends of propeller shaft in conventional RWD",
              "Grease-packed needle roller bearings on cross-pin",
            ],
          },
          {
            title: "CV Joint (Constant Velocity Joint)",
            color: C.cyan,
            points: [
              "Transmits torque at any angle with CONSTANT velocity (no fluctuation)",
              "Uses ball bearings in curved grooves (Rzeppa joint most common)",
              "Can handle up to 50° angles — needed for front steering wheels",
              "Used at outer end of front axle shafts (FWD cars) where wheel steers AND drives",
              "Inner CV joint: plunge type (allows axial movement for suspension travel)",
              "Outer CV joint: fixed (only angular movement)",
              "Protected by rubber boot filled with grease. Torn boot = grease loss = CV failure",
            ],
          },
        ].map((s, i) => (
          <Panel key={i} style={{ borderTop: `2px solid ${s.color}` }}>
            <div style={{ fontFamily: "'Fira Code', monospace", color: s.color, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>{s.title}</div>
            {s.points.map((p, j) => (
              <div key={j} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}40` }}>
                <span style={{ color: s.color, flexShrink: 0, fontSize: 10, marginTop: 3 }}>▸</span>
                <span style={{ color: C.soft, fontSize: 12, lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </Panel>
        ))}
      </div>
      <Panel style={{ borderTop: `2px solid ${C.orange}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.orange, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>PROPELLER SHAFT FAULTS & VIBRATIONS</div>
        <CTable
          headers={["Fault", "Symptom", "Cause"]}
          rows={[
            ["Prop shaft imbalance", "Vibration at high speed, increases with vehicle speed", "Bent shaft, missing balance weights, worn U-joints"],
            ["U-joint wear", "Clunking on acceleration/deceleration, vibration", "Worn needle bearings, lack of lubrication, rust"],
            ["CV joint wear", "Clicking/popping during turns (FWD)", "Torn boot, grease loss, worn ball grooves"],
            ["Centre bearing failure", "Vibration, rumble from middle of vehicle (two-piece shafts)", "Worn/seized rubber mount bearing"],
            ["Phase error", "Vibration at specific speeds", "Yokes not parallel when assembled (workshop error)"],
          ]}
          highlight={[0, 2]}
        />
      </Panel>
    </div>
  );
}

function DifferentialSection() {
  return (
    <div>
      <SecTitle icon="🔀" title="DIFFERENTIAL — DEEP DIVE" sub="Open diff, LSD, locking diff — the heart of cornering" color={C.green} />
      <Panel style={{ marginBottom: 18 }}>
        <p style={{ color: C.text, lineHeight: 1.8, fontSize: 14 }}>
          The differential is arguably the most elegant mechanism in an automobile. It simultaneously <strong style={{ color: C.green }}>splits torque equally between two wheels</strong> while <strong style={{ color: C.cyan }}>allowing them to rotate at different speeds</strong> during cornering — all through pure mechanical geometry, with no sensors or electronics in a basic unit.
        </p>
      </Panel>
      <Panel style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.green, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>INTERNAL COMPONENTS & WORKING</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            {[
              { p: "Crown Wheel (Ring Gear)", d: "Large bevel gear. Receives drive from propeller shaft pinion. Rotates the differential case." },
              { p: "Differential Case (Carrier)", d: "Houses all internal gears. Rotates with crown wheel. Carries the planet gear pins." },
              { p: "Planet Gears (Spider Gears)", d: "Small bevel gears on pins inside the case. Can rotate on their own axis. The 'magic' gears." },
              { p: "Sun Gears (Side Gears)", d: "Two bevel gears facing each other. Each connected to one axle shaft (left/right wheel)." },
            ].map((x, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}40` }}>
                <div style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>{x.p}</div>
                <div style={{ color: C.soft, fontSize: 12, marginTop: 2, lineHeight: 1.5 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
            <div style={{ color: C.yellow, fontFamily: "'Fira Code', monospace", fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>WORKING — TWO SCENARIOS</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>STRAIGHT LINE:</div>
              <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.7 }}>Planet gears DON'T rotate on their axis. Case + planets + both sun gears all rotate together as one unit at same speed. Both wheels = same speed.</div>
            </div>
            <div>
              <div style={{ color: C.cyan, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>CORNERING:</div>
              <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.7 }}>Inner wheel slows → its sun gear slows → planet gears START rotating on their axis → this rotation ADDS speed to outer sun gear → outer wheel speeds up. Speed difference absorbed perfectly.</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px 14px", background: C.green + "10", borderRadius: 8, borderLeft: `3px solid ${C.green}` }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>KEY FORMULA (Differential Equation)</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 14, color: C.yellow, textAlign: "center", padding: "8px 0" }}>
            N_left + N_right = 2 × N_carrier
          </div>
          <div style={{ color: C.soft, fontSize: 12 }}>Where N = speed (rpm). Sum of both wheel speeds = 2× crown wheel speed. If one wheel = 0 (stuck), other = 2× carrier speed.</div>
        </div>
      </Panel>
      <Panel style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.orange, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>LSD TYPES — LIMITED SLIP DIFFERENTIAL</div>
        <CTable
          headers={["Type", "Mechanism", "Best For", "Used In"]}
          rows={[
            ["Clutch-pack LSD", "Friction clutch packs between sun gears & case. Pre-loaded spring. Limits speed diff via friction.", "Performance cars, controlled drift", "Mitsubishi Evo, WRX STI"],
            ["Viscous coupling LSD", "Silicone fluid in sealed housing. Resists speed difference (viscosity increases with speed diff).", "AWD torque distribution, smooth operation", "Honda CRV, older Subaru"],
            ["Torsen (torque-sensing)", "Worm gear mechanism. Mechanical. No slipping components. Torque-sensing = more torque to gripping wheel.", "Performance, no maintenance, durable", "Audi Quattro, some pickups"],
            ["Electronic LSD (e-LSD)", "Brakes the spinning wheel electronically (using ABS system). Redirects torque via brake-based torque vectoring.", "Modern budget solution, software tunable", "Most modern FWD/AWD cars"],
            ["Locking Differential", "100% locks both axle shafts together. No speed difference allowed at all. Ultimate off-road traction.", "Off-road, low speed (cannot use on normal roads)", "Mahindra Thar, Jeep Wrangler, trucks"],
          ]}
          highlight={[2, 4]}
        />
      </Panel>
    </div>
  );
}

function AxlesSection() {
  return (
    <div>
      <SecTitle icon="🛞" title="AXLES & FINAL DRIVE" sub="Dead axle, live axle, half shafts, hub reduction" color={C.orange} />
      <div style={{ display: "grid", gap: 14 }}>
        {[
          {
            title: "Dead Axle (Non-driving axle)",
            color: C.soft,
            desc: "Carries vehicle weight only. Does NOT transmit driving torque. Wheels rotate freely on bearings on the axle stub.",
            points: ["Front axle of RWD vehicle (carries weight, steers but doesn't drive)", "Rear axle of FWD vehicle", "Trailer axles", "Must resist: bending loads (vehicle weight), torsional loads (braking forces)"],
          },
          {
            title: "Live Axle (Driving axle)",
            color: C.orange,
            desc: "Transmits both driving torque AND carries vehicle weight. The axle shaft itself is connected to the differential output and rotates to drive the wheel.",
            points: ["Rear axle of RWD vehicles (most trucks, buses)", "Combines: torque transmission + weight bearing in one shaft", "Types: Semi-floating (simplest), Three-quarter floating, Fully-floating (heavy vehicles — wheel floats on bearings, shaft only carries torque)"],
          },
          {
            title: "Half Shafts (Independent Suspension)",
            color: C.cyan,
            desc: "In IFS/IRS vehicles, the axle is split into two half-shafts with CV joints. Each wheel moves independently. More complex but better ride/handling.",
            points: ["Inner CV joint (plunge type): allows suspension travel (axial movement)", "Outer CV joint (fixed): transmits torque at up to 45° angle for steering", "Used in all FWD cars, modern SUVs with IRS", "No torque windup, better handling, comfortable ride"],
          },
          {
            title: "Final Drive Ratio",
            color: C.yellow,
            desc: "The gear reduction between propeller shaft (or gearbox output) and the wheel axle, via the crown wheel and pinion in the differential.",
            points: [
              "Typical final drive ratio: 3.5:1 to 5:1 for cars",
              "Higher FDR: more torque to wheels, lower top speed, better for city/hills",
              "Lower FDR: less torque multiplication, higher top speed, better for highway",
              "FDR combined with gearbox ratio = Overall gear ratio",
              "Formula: Overall ratio = Gearbox ratio × Final Drive Ratio",
              "Truck final drives: 4.5:1 to 7:1 (more torque needed for load carrying)",
            ],
          },
        ].map((s, i) => (
          <Panel key={i} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: s.color, letterSpacing: 1, marginBottom: 8 }}>{s.title}</div>
            <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{s.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {s.points.map((p, j) => (
                <div key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: C.soft, padding: "4px 0" }}>
                  <span style={{ color: s.color, flexShrink: 0 }}>→</span>{p}
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function FWDSection() {
  return (
    <div>
      <SecTitle icon="🏔️" title="4WD & AWD SYSTEMS" sub="4×4, part-time 4WD, full-time AWD — transfer case, diff lock" color={C.yellow} />
      <Panel style={{ marginBottom: 18 }}>
        <CTable
          headers={["Feature", "Part-time 4WD (4×4)", "Full-time AWD", "On-demand AWD"]}
          rows={[
            ["Driver control", "Manual selection (lever/switch)", "Always engaged", "Auto-engages as needed"],
            ["Normal driving", "2WD (rear wheels only)", "All 4 wheels always", "Usually FWD or RWD"],
            ["4WD modes", "2H, 4H, 4L (low range)", "No mode change", "Auto / Lock mode"],
            ["Transfer case", "Yes — separate unit", "Centre differential instead", "Coupling unit (viscous/Haldex)"],
            ["Centre differential", "Lock type (rigid)", "Open/LSD type", "Clutch coupling"],
            ["Best for", "Off-road, mud, rock crawling", "All weather roads", "Light SUVs, crossovers"],
            ["Fuel economy", "Better in 2WD mode", "Slightly lower (4 wheels always)", "Best (only 4WD when needed)"],
            ["Examples", "Mahindra Thar, Jeep Wrangler", "Audi Quattro, Subaru AWD", "Hyundai Tucson, Kia Sportage"],
          ]}
          highlight={[0, 2, 5]}
        />
      </Panel>
      <Panel style={{ borderTop: `2px solid ${C.yellow}` }}>
        <div style={{ fontFamily: "'Fira Code', monospace", color: C.yellow, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>TRANSFER CASE — KEY COMPONENT OF 4WD</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <p style={{ color: C.text, fontSize: 13, lineHeight: 1.8, marginBottom: 10 }}>The <strong style={{ color: C.yellow }}>transfer case</strong> takes drive from the gearbox and splits it to front AND rear axles. It also provides a LOW RANGE for off-road (higher torque multiplication).</p>
            {[
              { m: "2H (2WD High)", d: "Only rear axle engaged. Normal road driving. Best fuel economy." },
              { m: "4H (4WD High)", d: "Both axles engaged. Front + rear. Normal surface off-road or slippery roads." },
              { m: "4L (4WD Low)", d: "Both axles + low gear range. Maximum torque. Rock crawling, deep mud. CANNOT use at speed." },
            ].map((x, i) => (
              <div key={i} style={{ padding: "8px 12px", background: C.bg, borderRadius: 8, marginBottom: 8, borderLeft: `2px solid ${C.yellow}60` }}>
                <div style={{ color: C.yellow, fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{x.m}</div>
                <div style={{ color: C.soft, fontSize: 12, marginTop: 4 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
              <div style={{ color: C.orange, fontFamily: "'Fira Code', monospace", fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>WHY YOU CAN'T USE 4L ON TARMAC</div>
              <p style={{ color: C.soft, fontSize: 12, lineHeight: 1.7 }}>In 4L, the front and rear propeller shafts are locked together (no centre differential). On tarmac during turns, front and rear axles need to rotate at different speeds (different turning radii). Since they're locked: TYRE WINDUP / DRIVELINE BINDING occurs — severe stress on transmission components, tyre damage, possible breakage.</p>
              <p style={{ color: C.yellow, fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>4L is ONLY for: soft/loose surfaces (sand, mud, snow, rock) where tyre slip allows the speed difference to be absorbed.</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function FormulasSection() {
  return (
    <div>
      <SecTitle icon="🔢" title="TRANSMISSION FORMULA SHEET" sub="All calculations you need for MPSC Mains" color={C.cyan} />
      <div style={{ display: "grid", gap: 14 }}>
        {[
          {
            name: "Gear Ratio",
            formula: "GR = N_driven / N_driver = T_driven / T_driver",
            vars: [
              { s: "GR", d: "Gear ratio (dimensionless)" },
              { s: "N_driven", d: "Speed of driven (output) gear (rpm)" },
              { s: "N_driver", d: "Speed of driver (input) gear (rpm)" },
              { s: "T_driven", d: "Number of teeth on driven gear" },
              { s: "T_driver", d: "Number of teeth on driver gear" },
            ],
            example: "Input gear: 20 teeth, Output gear: 80 teeth\nGR = 80/20 = 4:1\nIf input speed = 1000 rpm → Output speed = 1000/4 = 250 rpm\nIf input torque = 100 Nm → Output torque = 100 × 4 = 400 Nm (approx, ignoring friction)",
            color: C.cyan,
          },
          {
            name: "Overall Gear Ratio (OGR)",
            formula: "OGR = Gearbox Ratio × Final Drive Ratio",
            vars: [
              { s: "Gearbox Ratio", d: "Ratio selected by driver (e.g., 3.5:1 in 1st gear)" },
              { s: "Final Drive Ratio", d: "Crown wheel & pinion ratio in differential (e.g., 4.2:1)" },
            ],
            example: "1st gear gearbox ratio = 3.5:1, Final drive ratio = 4.2:1\nOGR = 3.5 × 4.2 = 14.7:1\nEngine at 2000 rpm → Wheel speed = 2000/14.7 = 136 rpm\nWith 70cm dia tyre (0.7m), speed = 136 × π × 0.7 / 60 = 4.98 m/s ≈ 18 km/h",
            color: C.orange,
          },
          {
            name: "Vehicle Speed from Wheel RPM",
            formula: "V = (N_wheel × π × D_tyre) / 60  (m/s)",
            vars: [
              { s: "V", d: "Vehicle speed (m/s). Multiply by 3.6 for km/h" },
              { s: "N_wheel", d: "Wheel speed (rpm)" },
              { s: "D_tyre", d: "Tyre outer diameter (metres)" },
            ],
            example: "N_wheel = 500 rpm, Tyre diameter = 0.65 m\nV = (500 × π × 0.65) / 60 = (500 × 2.042) / 60 = 1021/60 = 17.0 m/s = 61.2 km/h",
            color: C.yellow,
          },
          {
            name: "Torque Relationship in Gearbox",
            formula: "T_output = T_input × GR × η",
            vars: [
              { s: "T_output", d: "Output torque (Nm)" },
              { s: "T_input", d: "Input torque from engine (Nm)" },
              { s: "GR", d: "Gear ratio" },
              { s: "η", d: "Transmission efficiency (typically 0.85–0.95 for gearbox)" },
            ],
            example: "Engine torque = 150 Nm, Gearbox ratio = 3.5:1, η = 0.90\nT_output = 150 × 3.5 × 0.90 = 472.5 Nm at gearbox output shaft\nFinal drive also multiplies: × 4.2 (FDR) × 0.90 = 1786 Nm at wheels (before tyre contact patch)",
            color: C.green,
          },
          {
            name: "Differential Equation",
            formula: "N_L + N_R = 2 × N_C",
            vars: [
              { s: "N_L", d: "Left wheel speed (rpm)" },
              { s: "N_R", d: "Right wheel speed (rpm)" },
              { s: "N_C", d: "Differential carrier / crown wheel speed (rpm)" },
            ],
            example: "Crown wheel at 200 rpm, left wheel stuck (0 rpm)\nN_R = 2 × 200 - 0 = 400 rpm (right wheel spins at 2× carrier speed)\n\nNormal cornering: N_C = 200, N_L = 180 rpm → N_R = 2×200 - 180 = 220 rpm (outer wheel faster)",
            color: C.purple,
          },
        ].map((f, i) => {
          const [show, setShow] = useState(false);
          return (
            <Panel key={i} style={{ borderLeft: `3px solid ${f.color}`, padding: 16 }}>
              <div style={{ color: f.color, fontFamily: "'Fira Code', monospace", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{f.name}</div>
              <div style={{ background: C.bg, borderRadius: 8, padding: "10px 16px", fontFamily: "'Fira Code', monospace", fontSize: 15, color: f.color, textAlign: "center", fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>
                {f.formula}
              </div>
              <div style={{ marginBottom: 10 }}>
                {f.vars.map((v, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, padding: "4px 0", borderBottom: `1px solid ${C.border}40` }}>
                    <span style={{ color: f.color, fontFamily: "monospace", fontSize: 12, minWidth: 100, flexShrink: 0 }}>{v.s}</span>
                    <span style={{ color: C.soft, fontSize: 12 }}>{v.d}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setShow(!show)} style={{
                background: "none", border: `1px solid ${f.color}40`, color: f.color,
                padding: "5px 14px", borderRadius: 6, cursor: "pointer", fontSize: 11,
                fontFamily: "'Fira Code', monospace",
              }}>
                {show ? "▲ Hide Example" : "▼ Worked Example"}
              </button>
              {show && (
                <div style={{ background: f.color + "0C", borderRadius: 8, padding: "12px 14px", marginTop: 10, fontSize: 12, color: C.text, fontFamily: "'Fira Code', monospace", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                  {f.example}
                </div>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

function TricksSection() {
  return (
    <div>
      <SecTitle icon="⚡" title="EXAM TIPS & MEMORY TRICKS" sub="Zero-confusion shortcuts for Transmission Systems" color={C.yellow} />
      <div style={{ display: "grid", gap: 14 }}>
        {[
          {
            icon: "🔗", title: "Power Flow Mnemonic — Never Forget", color: C.orange,
            items: [
              "'Every Car Goes Properly Down Any Road' = Engine → Clutch → Gearbox → Propeller shaft → Differential → Axle shaft → Road-wheels",
              "FWD shortcut: Engine → Clutch → Gearbox+Differential (combined transaxle) → CV shafts → Wheels",
              "RWD: Longest path (7 components). FWD: Shorter path (no propeller shaft). AWD = both",
              "Key difference RWD vs FWD: RWD has propeller shaft. FWD has transaxle (gearbox + differential combined)",
            ],
          },
          {
            icon: "⚙️", title: "Gear Ratio Logic — High/Low Never Confuse Again", color: C.cyan,
            items: [
              "HIGH gear ratio number (e.g., 4:1) = MORE torque, LESS speed = 1st gear, hill climbing, heavy load",
              "LOW gear ratio number (e.g., 0.8:1) = LESS torque, MORE speed = top gear, highway",
              "Think of it like a bicycle: small front sprocket + large rear = hard to pedal but slow and powerful (high ratio). Large front + small rear = easy to pedal fast but less force (low ratio)",
              "Reverse gear always has HIGH ratio (similar to 1st or higher) — needs torque but not speed",
              "Overdrive gears (<1:1 ratio) = input shaft faster than output → engine RPM lower than wheel shaft RPM → fuel saving",
            ],
          },
          {
            icon: "🔘", title: "Clutch Fault Identification — Exam Trap", color: C.yellow,
            items: [
              "SLIP = Power not transferred. RPM rises, speed doesn't. = Worn disc, oil contamination, weak springs",
              "DRAG = Clutch not fully releasing. Hard to engage gears, grinding. = Warped disc, seized bearing, insufficient free play",
              "JUDDER = Vibration during engagement. = Oil on disc, loose engine mounts",
              "CHATTER = Rapid slip/engage during take-off. = Worn disc, glazed flywheel",
              "NOISE with pedal down = Release bearing. NOISE with pedal up = Pilot bearing (front of gearbox)",
              "Key: Too MUCH free play → clutch won't fully disengage → DRAG. Too LITTLE free play → clutch partially engaged always → SLIP",
            ],
          },
          {
            icon: "🔀", title: "Differential — The Key Insight", color: C.green,
            items: [
              "Open differential: Torque is ALWAYS EQUAL to both wheels (50:50). Speed can differ.",
              "TRAP: People think differential sends more torque to faster wheel. WRONG — it always splits equally. The slipping wheel just RECEIVES the same torque but it does nothing useful.",
              "LSD: LIMITS speed difference → prevents total power loss to slipping wheel",
              "Locking diff: Forces EQUAL speed → no speed difference allowed at all",
              "Formula: N_left + N_right = 2 × N_carrier (always true for open diff)",
              "During straight driving: Planet gears DON'T rotate on their pin. During cornering: Planet gears DO rotate.",
            ],
          },
          {
            icon: "🤖", title: "Transmission Type Quick Identifier", color: C.purple,
            items: [
              "Clutch pedal + gear lever = Manual (MT) or AMT (if only gear lever, auto clutch)",
              "No clutch pedal + gear lever (P/R/N/D) = Automatic (AT or CVT or DCT)",
              "Smooth acceleration without steps = CVT (engine stays at same RPM while speed increases)",
              "Fastest, performance-focused auto = DCT (dual clutch: VW DSG, Hyundai's 7-speed DCT)",
              "Budget city car auto = AMT (Maruti Alto/Wagon R/Swift AMT). Jerky but fuel efficient.",
              "Classic smooth luxury auto = Torque converter AT (8–10 speed). Honda, Toyota, Hyundai premium",
            ],
          },
          {
            icon: "📋", title: "Most Repeated MPSC Questions on Transmission", color: C.cyan,
            items: [
              "Q: What is the purpose of a clutch? → Connect/disconnect engine from transmission smoothly",
              "Q: What does gear ratio determine? → Speed reduction and torque multiplication",
              "Q: Which component allows cornering? → Differential (allows different wheel speeds)",
              "Q: What is the primary limitation of open differential? → All torque to slipping wheel (no traction)",
              "Q: What replaces clutch in automatic? → Torque converter",
              "Q: CVT belt material? → Rubber (cars) or Steel push-belt (modern CVTs)",
              "Q: What are dog clutches used for? → Engaging gears in constant-mesh gearbox",
              "Q: Why use CV joints on FWD? → Transmit torque at large angles (steering) without speed fluctuation",
              "Q: Gear ratio formula? → Driven teeth ÷ Driver teeth (or driven speed ÷ driver speed inverted)",
              "Q: What is overdrive? → Gear ratio less than 1:1 (output faster than input for highway fuel saving)",
            ],
          },
        ].map((s, i) => (
          <Panel key={i} style={{ borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, color: s.color, fontWeight: 700, letterSpacing: 1 }}>{s.title}</span>
            </div>
            {s.items.map((item, j) => (
              <div key={j} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}30`, alignItems: "flex-start" }}>
                <span style={{ color: s.color, flexShrink: 0, fontSize: 11, marginTop: 2 }}>▸</span>
                <span style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN APP
══════════════════════════════════════ */
export default function TransmissionApp() {
  const [tab, setTab] = useState("learn");
  const [activeSection, setActiveSection] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState({ c: 0, w: 0, hist: [] });
  const [quizDone, setQuizDone] = useState(false);

  const q = questions[qIdx];
  const accuracy = score.hist.length ? Math.round(score.c / score.hist.length * 100) : 0;

  function pickAns(i) {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    setScore(s => ({ c: s.c + (i === q.ans ? 1 : 0), w: s.w + (i !== q.ans ? 1 : 0), hist: [...s.hist, { correct: i === q.ans }] }));
  }
  function nextQ() {
    if (qIdx < questions.length - 1) { setQIdx(qIdx + 1); setSelected(null); setShowExp(false); }
    else setQuizDone(true);
  }
  function resetQuiz() { setQIdx(0); setSelected(null); setShowExp(false); setScore({ c: 0, w: 0, hist: [] }); setQuizDone(false); }

  const tabs = [
    { id: "learn",    label: "📖 LEARN" },
    { id: "practice", label: "📝 PRACTICE" },
    { id: "formulas", label: "🔢 FORMULAS" },
    { id: "tricks",   label: "⚡ TIPS" },
  ];

  const sectionMap = {
    intro: <IntroSection />, clutch: <ClutchSection />, gearbox: <GearboxSection />,
    auto: <AutoSection />, propshaft: <PropshaftSection />, differential: <DifferentialSection />,
    axles: <AxlesSection />, "4wd": <FWDSection />, formulas: <FormulasSection />, tricks: <TricksSection />,
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Source Sans Pro', -apple-system, sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Fira+Code:wght@400;600;700&family=Source+Sans+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade { animation: fadeUp 0.22s ease; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(150deg, #040810 0%, #070A0F 55%, #0A0605 100%)`, borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0 14px" }}>
            <div style={{ display: "flex", gap: -8 }}>
              <GearSVG size={48} color={C.cyan} speed="5s" />
            </div>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 20, fontWeight: 900, color: C.text, letterSpacing: 3 }}>TRANSMISSION SYSTEMS</div>
              <div style={{ color: C.muted, fontSize: 11, fontFamily: "'Fira Code', monospace", marginTop: 2 }}>
                Topic 3 of 12 · Clutch · Gearbox · Differential · Axles · 4WD
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <Tag label="12% WEIGHTAGE" color={C.cyan}/>
              <Tag label="9/10 YEARS" color={C.green}/>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "11px 22px", border: "none", cursor: "pointer",
                fontFamily: "'Fira Code', monospace", fontSize: 12, fontWeight: 700, background: "transparent",
                color: tab === t.id ? C.cyan : C.muted,
                borderBottom: `3px solid ${tab === t.id ? C.cyan : "transparent"}`,
                transition: "all 0.15s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── LEARN ── */}
        {tab === "learn" && (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: C.muted, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Sections</div>
              {learnSections.map(s => (
                <div key={s.id} onClick={() => setActiveSection(s.id)} style={{
                  padding: "9px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 3,
                  background: activeSection === s.id ? C.cyan + "15" : "transparent",
                  border: `1px solid ${activeSection === s.id ? C.cyan + "50" : "transparent"}`,
                  color: activeSection === s.id ? C.cyan : C.soft,
                  fontSize: 12, fontWeight: activeSection === s.id ? 600 : 400,
                  transition: "all 0.12s",
                }}>
                  <span style={{ marginRight: 8 }}>{s.icon}</span>{s.label}
                </div>
              ))}
            </div>
            <div className="fade" key={activeSection}>
              {sectionMap[activeSection]}
            </div>
          </div>
        )}

        {/* ── PRACTICE ── */}
        {tab === "practice" && (
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 18, color: C.text, letterSpacing: 2, marginBottom: 6 }}>PRACTICE MODE</div>
            <p style={{ color: C.soft, fontSize: 13, fontFamily: "'Fira Code', monospace", marginBottom: 22 }}>12 questions — Basic to Expert. Covers all sub-topics.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { l: "CORRECT", v: score.c, col: C.green },
                { l: "WRONG", v: score.w, col: C.red },
                { l: "ACCURACY", v: accuracy + "%", col: C.cyan },
                { l: "ATTEMPTED", v: `${score.hist.length}/${questions.length}`, col: C.yellow },
              ].map(s => (
                <Panel key={s.l} style={{ textAlign: "center", padding: 14, borderTop: `3px solid ${s.col}` }}>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 26, color: s.col, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginTop: 3 }}>{s.l}</div>
                </Panel>
              ))}
            </div>

            {quizDone ? (
              <Panel glow={C.cyan} style={{ textAlign: "center", padding: "40px 20px", borderTop: `3px solid ${C.cyan}` }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>{score.c >= 10 ? "🏆" : score.c >= 7 ? "⚙️" : "🔧"}</div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, color: C.cyan, letterSpacing: 2, marginBottom: 10 }}>
                  {score.c}/{questions.length} — {score.c >= 10 ? "TRANSMISSION MASTER" : score.c >= 7 ? "SOLID ENGINEER" : "NEEDS MORE PRACTICE"}
                </div>
                <div style={{ color: C.soft, maxWidth: 440, margin: "0 auto 24px", fontSize: 13, lineHeight: 1.7 }}>
                  {score.c >= 10 ? "Excellent! You understand transmission deeply. Ready for Topic 4." :
                   score.c >= 7 ? "Good base. Review Differential and Automatic gearbox sections." :
                   "Revise all sections especially Clutch types, Gear ratio calculations, and Differential working."}
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button onClick={resetQuiz} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: C.cyan, color: "#000", fontWeight: 700, cursor: "pointer", fontFamily: "'Orbitron', sans-serif", fontSize: 14, letterSpacing: 1 }}>RETRY</button>
                  <button onClick={() => setTab("formulas")} style={{ padding: "12px 28px", borderRadius: 8, border: `1px solid ${C.cyan}`, background: "transparent", color: C.cyan, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>FORMULAS</button>
                </div>
              </Panel>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Tag label={`Q${qIdx + 1} / ${questions.length}`} color={C.cyan}/>
                    <Tag label={q.level} color={q.level === "BASIC" ? C.green : q.level === "MEDIUM" ? C.yellow : q.level === "HARD" ? C.orange : C.purple}/>
                    <Tag label={q.topic} color={C.soft}/>
                  </div>
                </div>
                <div style={{ height: 3, background: C.border, borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
                  <div style={{ width: `${(qIdx / questions.length) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.cyan}, ${C.orange})`, transition: "width 0.3s" }}/>
                </div>

                <Panel style={{ marginBottom: 14, borderLeft: `4px solid ${C.cyan}`, padding: "18px 20px" }}>
                  <div style={{ fontSize: 15.5, lineHeight: 1.75, fontWeight: 500 }}>
                    <span style={{ color: C.cyan, fontFamily: "'Orbitron', sans-serif", fontSize: 18, marginRight: 10 }}>Q{qIdx + 1}.</span>
                    {q.q}
                  </div>
                </Panel>

                <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                  {q.opts.map((opt, i) => {
                    let bg = C.card, bdr = C.border, col = C.text, lc = C.muted;
                    if (selected !== null) {
                      if (i === q.ans) { bg = C.green + "15"; bdr = C.green; lc = C.green; }
                      else if (i === selected) { bg = C.red + "15"; bdr = C.red; lc = C.red; col = C.soft; }
                      else col = C.muted;
                    }
                    return (
                      <div key={i} onClick={() => pickAns(i)} style={{
                        display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 16px",
                        borderRadius: 10, border: `1.5px solid ${bdr}`, background: bg, color: col,
                        cursor: selected !== null ? "default" : "pointer", transition: "all 0.15s",
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 6, background: lc + "22",
                          border: `1.5px solid ${lc}50`, display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Fira Code', monospace", fontSize: 13, color: lc, fontWeight: 700, flexShrink: 0,
                        }}>{["A","B","C","D"][i]}</div>
                        <span style={{ fontSize: 13.5, lineHeight: 1.55, paddingTop: 4 }}>{opt}</span>
                        {selected !== null && i === q.ans && <span style={{ marginLeft: "auto" }}>✅</span>}
                        {selected !== null && i === selected && i !== q.ans && <span style={{ marginLeft: "auto" }}>❌</span>}
                      </div>
                    );
                  })}
                </div>

                {showExp && (
                  <Panel className="fade" style={{ marginBottom: 18, borderLeft: `4px solid ${selected === q.ans ? C.green : C.red}` }}>
                    <div style={{ fontWeight: 700, color: selected === q.ans ? C.green : C.red, marginBottom: 10, fontSize: 14 }}>
                      {selected === q.ans ? "✅ CORRECT!" : `❌ WRONG — Correct: ${["A","B","C","D"][q.ans]}`}
                    </div>
                    <div style={{ color: C.text, fontSize: 13, lineHeight: 1.85, whiteSpace: "pre-line", marginBottom: 12 }}>{q.exp}</div>
                    <div style={{ padding: "10px 14px", background: C.yellow + "10", borderRadius: 8, borderLeft: `3px solid ${C.yellow}` }}>
                      <span style={{ color: C.yellow, fontWeight: 700, fontSize: 11, fontFamily: "monospace" }}>⚡ EXAM TIP: </span>
                      <span style={{ color: C.text, fontSize: 13 }}>{q.tip}</span>
                    </div>
                  </Panel>
                )}

                {selected !== null && !quizDone && (
                  <button onClick={nextQ} style={{
                    width: "100%", padding: 15, borderRadius: 10, border: "none",
                    background: `linear-gradient(90deg, ${C.cyan}, ${C.teal})`,
                    color: "#000", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Orbitron', sans-serif", fontSize: 15, letterSpacing: 2,
                  }}>{qIdx < questions.length - 1 ? "NEXT QUESTION →" : "FINISH QUIZ"}</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── FORMULAS ── */}
        {tab === "formulas" && <FormulasSection />}

        {/* ── TIPS ── */}
        {tab === "tricks" && <TricksSection />}

      </div>
    </div>
  );
}