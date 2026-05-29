import { useState } from "react";

var C = {
  bg:"#06080A", card:"#0C1018", border:"#182030",
  steel:"#64748B", cyan:"#06B6D4", orange:"#F97316",
  green:"#16A34A", red:"#DC2626", purple:"#7C3AED",
  yellow:"#EAB308", teal:"#0D9488", blue:"#2563EB",
  text:"#E2EBF5", muted:"#2D3E52", soft:"#6B84A0",
};

function Tag(props) {
  var c = props.color || C.cyan;
  return (
    <span style={{
      background:c+"1A", color:c, border:"1px solid "+c+"45",
      padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700,
      letterSpacing:0.8, textTransform:"uppercase", fontFamily:"monospace",
    }}>{props.label}</span>
  );
}

function Box(props) {
  return (
    <div style={{
      background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:20,
      boxShadow:props.glow?"0 0 28px "+props.glow+"15":"none",
      ...props.style,
    }}>{props.children}</div>
  );
}

function STitle(props) {
  var c = props.color || C.cyan;
  return (
    <div style={{ marginBottom:26 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <div style={{ width:48, height:48, borderRadius:12, background:c+"18", border:"2px solid "+c+"45", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{props.icon}</div>
        <h2 style={{ margin:0, fontSize:22, color:C.text, fontWeight:700, letterSpacing:2 }}>{props.title}</h2>
      </div>
      {props.sub && <p style={{ margin:"0 0 0 62px", color:C.soft, fontSize:13, fontFamily:"monospace" }}>{props.sub}</p>}
      <div style={{ height:2, background:"linear-gradient(90deg,"+c+"80,transparent)", marginTop:12 }} />
    </div>
  );
}

function DTable(props) {
  var hl = props.hi || [];
  var cols = props.cols || [C.soft, C.cyan, C.orange, C.green, C.yellow];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#080C14" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.cyan+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
                {row.map(function(cell,ci) {
                  return <td key={ci} style={{ padding:"9px 14px", textAlign:ci===0?"left":"center", color:ci===0?C.soft:C.text, fontFamily:ci===0?"monospace":"inherit", fontSize:ci===0?11:13, fontWeight:hl.includes(ri)?600:400 }}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FormulaCard(props) {
  var [show, setShow] = useState(false);
  var c = props.color || C.cyan;
  return (
    <Box style={{ borderLeft:"3px solid "+c, padding:16 }}>
      <div style={{ color:c, fontFamily:"monospace", fontSize:12, fontWeight:700, marginBottom:8 }}>{props.name}</div>
      <div style={{ background:C.bg, borderRadius:8, padding:"10px 16px", fontFamily:"monospace", fontSize:15, color:c, textAlign:"center", fontWeight:700, marginBottom:10, letterSpacing:0.5 }}>{props.formula}</div>
      {props.vars && props.vars.map(function(v,i) {
        return (
          <div key={i} style={{ display:"flex", gap:10, padding:"4px 0", borderBottom:"1px solid "+C.border+"40" }}>
            <span style={{ color:c, fontFamily:"monospace", fontSize:12, minWidth:80, flexShrink:0 }}>{v.s}</span>
            <span style={{ color:C.soft, fontSize:12 }}>{v.d}</span>
          </div>
        );
      })}
      {props.example && (
        <div>
          <button onClick={function(){ setShow(!show); }} style={{ marginTop:10, background:"none", border:"1px solid "+c+"40", color:c, padding:"5px 14px", borderRadius:6, cursor:"pointer", fontSize:11, fontFamily:"monospace" }}>
            {show?"▲ Hide":"▼ Worked Example"}
          </button>
          {show && (
            <div style={{ background:c+"0C", borderRadius:8, padding:"12px 14px", marginTop:10, fontSize:12, color:C.text, fontFamily:"monospace", lineHeight:1.9, whiteSpace:"pre-line" }}>{props.example}</div>
          )}
        </div>
      )}
    </Box>
  );
}

// ── QUESTIONS ──
var QS = [
  {
    id:1, level:"BASIC", topic:"Stress and Strain",
    q:"A steel bar of cross-sectional area 500 mm² is subjected to an axial tensile force of 100 kN. What is the stress in the bar?",
    opts:["100 N/mm²","200 N/mm²","50 N/mm²","500 N/mm²"],
    ans:1,
    exp:"Stress (σ) = Force (P) / Area (A)\n\nP = 100 kN = 100,000 N\nA = 500 mm²\n\nσ = 100,000 / 500 = 200 N/mm² = 200 MPa\n\nThis is TENSILE stress (pulling force = positive). If the force were compressive (pushing), the stress would be 200 N/mm² compressive.\n\nNote: 1 N/mm² = 1 MPa (MegaPascal). Steel has typical yield stress of 250 MPa and ultimate tensile stress of 400-500 MPa.",
    tip:"Stress = Force / Area. Always convert kN to N first (multiply by 1000). Units: N/mm² = MPa. Tensile stress = positive (+). Compressive stress = negative (−). This formula is the foundation of all SOM questions.",
  },
  {
    id:2, level:"BASIC", topic:"Young's Modulus",
    q:"A steel rod of length 2 m and cross-sectional area 400 mm² is subjected to a tensile force of 80 kN. If E = 200 GPa, what is the elongation?",
    opts:["1 mm","2 mm","0.5 mm","4 mm"],
    ans:0,
    exp:"Elongation (δL) = P × L / (A × E)\n\nP = 80 kN = 80,000 N\nL = 2 m = 2,000 mm\nA = 400 mm²\nE = 200 GPa = 200,000 N/mm²\n\nδL = (80,000 × 2,000) / (400 × 200,000)\nδL = 160,000,000 / 80,000,000\nδL = 2.0... wait:\n\nδL = 80,000 × 2,000 / (400 × 200,000) = 160,000,000 / 80,000,000 = 2.0 mm?\n\nLet me recalculate: P×L = 80000 × 2000 = 1.6×10^8\nA×E = 400 × 200000 = 8×10^7\nδL = 1.6×10^8 / 8×10^7 = 2 mm\n\nActually answer is 2mm. But wait: let me verify with σ first: σ = 80000/400 = 200 MPa. Strain ε = σ/E = 200/200000 = 0.001. δL = ε×L = 0.001×2000 = 2mm.\n\nSo correct answer is 2mm = option B.\n\nHmm, but I marked ans:0 (option A = 1mm). Let me reconsider: if P=80kN, L=2m, A=400mm², E=200GPa:\nδL = PL/AE = 80000×2000/(400×200000) = 160,000,000/80,000,000 = 2mm. So answer should be B (2mm).",
    ans:1,
    exp:"Elongation formula: δL = P × L / (A × E)\n\nP = 80,000 N, L = 2,000 mm, A = 400 mm², E = 200,000 N/mm²\n\nδL = (80,000 × 2,000) / (400 × 200,000)\n    = 160,000,000 / 80,000,000\n    = 2 mm\n\nAlternate method using strain:\nStress σ = P/A = 80,000/400 = 200 N/mm²\nStrain ε = σ/E = 200/200,000 = 0.001\nElongation δL = ε × L = 0.001 × 2,000 = 2 mm",
    tip:"Two methods — always verify with both: (1) Direct: δL = PL/AE. (2) Via strain: first find σ = P/A, then ε = σ/E, then δL = ε×L. Both must give same answer. Convert GPa to N/mm²: 1 GPa = 1000 MPa = 1000 N/mm².",
  },
  {
    id:3, level:"BASIC", topic:"Poisson Ratio",
    q:"If Poisson's ratio (μ) of a material is 0.3 and axial strain is 0.001, what is the lateral strain?",
    opts:["0.003","−0.0003","0.0003","−0.003"],
    ans:1,
    exp:"Poisson's ratio (μ) = − (Lateral strain / Axial strain)\n\nLateral strain = − μ × Axial strain\nLateral strain = − 0.3 × 0.001 = − 0.0003\n\nThe NEGATIVE sign is important:\n→ When a bar is stretched (positive axial strain = elongation), the lateral dimensions CONTRACT (negative lateral strain)\n→ This is the nature of Poisson effect — stretch in one direction = shrink in perpendicular directions\n\nFor most metals: μ = 0.25 to 0.35\nSteel: μ ≈ 0.3\nAluminium: μ ≈ 0.33\nRubber: μ ≈ 0.5 (almost incompressible)\nCork: μ ≈ 0 (used in wine bottles — doesn't expand when compressed)",
    tip:"Lateral strain = NEGATIVE μ × Axial strain. The negative sign means: stretch axially = shrink laterally. Typical Poisson ratio values: Steel = 0.3, Aluminium = 0.33, Concrete = 0.15-0.2, Rubber = 0.5. For incompressible material: μ = 0.5 (max theoretical value).",
  },
  {
    id:4, level:"MEDIUM", topic:"Shear Force and Bending Moment",
    q:"A simply supported beam of span 4 m carries a central point load of 20 kN. What is the maximum bending moment?",
    opts:["20 kN·m","40 kN·m","80 kN·m","10 kN·m"],
    ans:0,
    exp:"For a simply supported beam with central point load W and span L:\n\nReaction at each support = W/2 = 20/2 = 10 kN\n\nMaximum Bending Moment (at centre) = W × L / 4\nM_max = 20 × 4 / 4 = 20 kN·m\n\nThis occurs at the centre of the beam (point of load application).\n\nAlternatively: take moments from left support to centre:\nM_centre = Reaction × L/2 = 10 × 2 = 20 kN·m ✓\n\nThe bending moment diagram (BMD) for this case is triangular — zero at supports, maximum at centre.\nThe shear force diagram (SFD) is rectangular — +10 kN from left support to centre, −10 kN from centre to right support.",
    tip:"Simply supported beam + central point load W, span L:\nM_max = WL/4 (at centre)\nReaction = W/2 at each support\nShear = W/2 throughout (step change at load point)\n\nMemorise: Central load → M_max = WL/4. UDL (w per unit length) → M_max = wL²/8.",
  },
  {
    id:5, level:"MEDIUM", topic:"Bending Stress",
    q:"A rectangular beam 100 mm wide and 200 mm deep is subjected to a bending moment of 10 kN·m. What is the maximum bending stress?",
    opts:["10 N/mm²","15 N/mm²","7.5 N/mm²","20 N/mm²"],
    ans:1,
    exp:"Bending stress formula: σ = M × y / I\n\nFor rectangular section:\nI = bd³/12 = 100 × (200)³/12 = 100 × 8,000,000/12 = 66,666,667 mm⁴\n\ny = d/2 = 200/2 = 100 mm (distance to extreme fibre)\n\nM = 10 kN·m = 10 × 10⁶ N·mm = 10,000,000 N·mm\n\nσ_max = M × y / I = 10,000,000 × 100 / 66,666,667\n       = 1,000,000,000 / 66,666,667\n       = 15 N/mm²\n\nAlternate: Section modulus Z = I/y = 66,666,667/100 = 666,667 mm³\nσ_max = M/Z = 10,000,000 / 666,667 = 15 N/mm²",
    tip:"Maximum bending stress = M/Z where Z = Section Modulus = I/y_max.\nFor rectangle: Z = bd²/6. For circle: Z = πd³/32.\nStress is maximum at the EXTREME FIBRES (top and bottom of beam). Neutral axis has ZERO bending stress. This is the fundamental bending theory (Euler-Bernoulli).",
  },
  {
    id:6, level:"MEDIUM", topic:"Torsion",
    q:"A solid circular shaft of diameter 60 mm is subjected to a torque of 2 kN·m. What is the maximum shear stress?",
    opts:["47.2 N/mm²","94.4 N/mm²","23.6 N/mm²","189 N/mm²"],
    ans:0,
    exp:"Maximum shear stress in a solid circular shaft:\nτ_max = 16T / (π × d³)\n\nT = 2 kN·m = 2 × 10⁶ N·mm = 2,000,000 N·mm\nd = 60 mm\n\nτ_max = 16 × 2,000,000 / (π × 60³)\n       = 32,000,000 / (π × 216,000)\n       = 32,000,000 / 678,584\n       = 47.2 N/mm²\n\nVerification using J method:\nJ = πd⁴/32 = π × (60)⁴/32 = π × 12,960,000/32 = 1,272,345 mm⁴\nr = d/2 = 30 mm\nτ_max = T × r / J = 2,000,000 × 30 / 1,272,345 = 47.2 N/mm² ✓",
    tip:"Two key torsion formulas for solid shaft:\n(1) τ_max = 16T/πd³ (direct, use for quick calculation)\n(2) τ_max = T×r/J where J = πd⁴/32, r = d/2 (fundamental, use for hollow shaft too)\nFor hollow shaft: J = π(D⁴−d⁴)/32. Maximum shear is at outer surface (r = D/2).",
  },
  {
    id:7, level:"HARD", topic:"Columns — Euler's Formula",
    q:"A both-ends-pinned column of length 3 m, E = 200 GPa, and I = 4 × 10⁶ mm⁴ fails by buckling. What is the Euler's critical load?",
    opts:["877 kN","2193 kN","219 kN","438 kN"],
    ans:0,
    exp:"Euler's critical load formula (both ends pinned):\nP_cr = π²EI / L_e²\n\nFor both ends pinned: Effective length L_e = L = 3 m = 3,000 mm\n\nE = 200 GPa = 200,000 N/mm²\nI = 4 × 10⁶ mm⁴\nL_e = 3,000 mm\n\nP_cr = π² × 200,000 × 4,000,000 / (3,000)²\n      = 9.8696 × 200,000 × 4,000,000 / 9,000,000\n      = 9.8696 × 800,000,000,000 / 9,000,000\n      = 9.8696 × 88,888.9\n      = 877,193 N ≈ 877 kN",
    tip:"Euler critical load P_cr = π²EI/Le². Effective lengths for different end conditions:\nBoth pinned: Le = L (factor = 1.0)\nOne fixed, one free: Le = 2L (factor = 2.0) — weakest!\nBoth fixed: Le = L/2 (factor = 0.5) — strongest\nOne fixed, one pinned: Le = 0.7L (factor = 0.7)\nMemory: 'Free doubles, Fixed halves.' Both fixed = 4x stronger than both pinned.",
  },
  {
    id:8, level:"HARD", topic:"Thin Cylinders",
    q:"A thin cylindrical pressure vessel has internal diameter 300 mm, wall thickness 10 mm, and internal pressure 5 N/mm². What is the circumferential (hoop) stress?",
    opts:["75 N/mm²","37.5 N/mm²","150 N/mm²","25 N/mm²"],
    ans:0,
    exp:"Hoop (circumferential) stress in thin cylinder:\nσ_h = p × d / (2 × t)\n\np = 5 N/mm² (internal pressure)\nd = 300 mm (internal diameter)\nt = 10 mm (wall thickness)\n\nσ_h = 5 × 300 / (2 × 10) = 1500 / 20 = 75 N/mm²\n\nLongitudinal stress:\nσ_L = p × d / (4 × t) = 5 × 300 / (4 × 10) = 37.5 N/mm²\n\nNote: Hoop stress = 2 × Longitudinal stress (always, for thin cylinders)\nThis is why thin cylindrical vessels always burst along a longitudinal line (hoop stress governs failure).\n\nThin cylinder condition: t < d/20 (here: 10 < 300/20 = 15) ✓",
    tip:"Hoop stress σ_h = pd/2t. Longitudinal stress σ_L = pd/4t. HOOP = 2 × LONGITUDINAL always! Failure always governed by hoop stress. Thin cylinder condition: thickness < diameter/20. Spherical vessel: stress = pd/4t in all directions (isotropic) — more efficient than cylinder.",
  },
  {
    id:9, level:"HARD", topic:"Thermal Stress",
    q:"A steel bar of length 1 m is fixed at both ends. Temperature rises by 30°C. E = 200 GPa, α = 12 × 10⁻⁶ per °C. What is the thermal stress developed?",
    opts:["36 N/mm²","72 N/mm²","18 N/mm²","108 N/mm²"],
    ans:1,
    exp:"Thermal stress in a completely fixed (constrained) bar:\nσ_thermal = E × α × ΔT\n\nE = 200,000 N/mm²\nα = 12 × 10⁻⁶ /°C\nΔT = 30°C\n\nσ_thermal = 200,000 × 12 × 10⁻⁶ × 30\n           = 200,000 × 0.000012 × 30\n           = 200,000 × 0.00036\n           = 72 N/mm² (compressive, since bar is restrained from expanding)\n\nIf the bar were free to expand: Free expansion = α × ΔT × L = 12×10⁻⁶ × 30 × 1000 = 0.36 mm\nBut it's fixed: supports exert compressive force to prevent this expansion → compressive thermal stress.",
    tip:"Thermal stress (fixed bar) = E × α × ΔT. This is COMPRESSIVE when temperature RISES (bar wants to expand but is restrained). TENSILE when temperature FALLS. If partially restrained: stress = E × α × ΔT × (restrained fraction). FREE to expand = ZERO stress (no constraint = no stress).",
  },
  {
    id:10, level:"HARD", topic:"Moment of Inertia",
    q:"What is the moment of inertia of a solid circular section of diameter 100 mm about its centroidal axis?",
    opts:["4,908,739 mm⁴","9,817,477 mm⁴","2,454,369 mm⁴","1,963,495 mm⁴"],
    ans:0,
    exp:"Moment of Inertia of a solid circle about centroidal axis:\nI = π × d⁴ / 64\n\nd = 100 mm\n\nI = π × (100)⁴ / 64\n  = π × 100,000,000 / 64\n  = 314,159,265 / 64\n  = 4,908,739 mm⁴ ≈ 4.91 × 10⁶ mm⁴\n\nOther important second moments of area:\nRectangle (b×d) about centroidal axis: I = bd³/12\nRectangle about base: I = bd³/3\nHollow circle: I = π(D⁴−d⁴)/64\nTriangle (base b, height h): I = bh³/36 (centroidal)",
    tip:"Key MI formulas to memorise:\nSolid circle: I = πd⁴/64 (or πR⁴/4)\nRectangle about centroid: I = bd³/12\nRectangle about base: I = bd³/3\nTrick: 64 for circle (centroid), 32 for polar (J = πd⁴/32). Polar J = 2I for circle.",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Elastic Constants Relationship",
    q:"The relationship between Young's modulus E, shear modulus G, and Poisson's ratio μ is:",
    opts:["E = 2G(1 − μ)","E = 2G(1 + μ)","E = G(1 + 2μ)","G = E(1 + 2μ)"],
    ans:1,
    exp:"The three elastic constants (E, G, K) are related by:\n\nE = 2G(1 + μ) — relating E, G, Poisson's ratio\nE = 3K(1 − 2μ) — relating E, K (Bulk modulus), Poisson's ratio\nE = 9KG / (3K + G) — relating all three moduli\n\nFor steel: E ≈ 200 GPa, G ≈ 80 GPa, K ≈ 167 GPa, μ ≈ 0.3\nVerification: E = 2G(1+μ) = 2×80×(1+0.3) = 2×80×1.3 = 208 ≈ 200 GPa ✓\n\nNumber of independent elastic constants:\nIsotropic material: 2 (E and μ, or E and G)\nAnisotropic material: up to 21\nOrthotropic material: 9",
    tip:"E = 2G(1 + μ) — most important elastic constants relation. If μ = 0.3 (steel): G = E/2(1+0.3) = E/2.6 ≈ 0.385E. So G is roughly 40% of E for steel. E = 3K(1−2μ) for bulk modulus. For rubber: μ ≈ 0.5 → K becomes very large (nearly incompressible) → G = E/3.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Strain Energy",
    q:"The strain energy stored in a bar of volume V subjected to uniform stress σ is:",
    opts:["U = σ²V/E","U = σ²V/(2E)","U = σV²/E","U = 2σ²V/E"],
    ans:1,
    exp:"Strain energy (U) stored per unit volume = σ²/(2E) — this is the strain energy DENSITY.\n\nFor total strain energy in a bar of volume V:\nU = σ² × V / (2E)\n\nDerivation:\nWork done by gradually applied load = ½ × P × δ (triangular loading)\nU = ½ × σ × ε × V (since ε = σ/E)\nU = ½ × σ × (σ/E) × V\nU = σ²V / (2E)\n\nStrain energy in torsion per unit volume: τ²/(2G)\nStrain energy in bending: ∫M²/(2EI) dx\n\nModulus of Resilience = max strain energy per unit volume within elastic limit = σ_y²/(2E)\nModulus of Toughness = total strain energy per unit volume up to fracture (area under stress-strain curve)",
    tip:"Strain energy per unit volume = σ²/2E (linear elastic material). Total: U = σ²V/2E. Factor of 2 in denominator is from the gradual loading (half of stress × strain). Resilience = ability to absorb energy without permanent deformation. Toughness = ability to absorb energy up to fracture.",
  },
];

// ── SECTIONS ──

function StressStrainSec() {
  return (
    <div>
      <STitle icon="🔩" title="STRESS, STRAIN AND ELASTIC CONSTANTS" sub="Fundamental concepts — basis of all SOM calculations" color={C.cyan} />
      <Box style={{ borderTop:"3px solid "+C.cyan, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:1, marginBottom:14 }}>DEFINITIONS — STRESS AND STRAIN</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[
            { name:"STRESS (σ)", color:C.cyan, def:"Internal resistance per unit area offered by a material to an external force. Force per unit area.", formula:"σ = P / A", unit:"N/mm² = MPa", types:["Tensile stress: pulling force → +ve","Compressive stress: pushing force → −ve","Shear stress (τ): parallel to area face"] },
            { name:"STRAIN (ε)", color:C.orange, def:"Deformation per unit original length. Dimensionless ratio. Measures how much a material deforms.", formula:"ε = δL / L", unit:"Dimensionless (no unit)", types:["Tensile strain: elongation → +ve","Compressive strain: shortening → −ve","Shear strain (γ): angular deformation"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"3px solid "+x.color }}>
                <div style={{ color:x.color, fontWeight:700, fontSize:15, marginBottom:6 }}>{x.name}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.7, marginBottom:10 }}>{x.def}</div>
                <div style={{ fontFamily:"monospace", fontSize:14, color:x.color, background:C.card, padding:"6px 12px", borderRadius:6, textAlign:"center", marginBottom:10 }}>{x.formula}</div>
                <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginBottom:6 }}>Unit: {x.unit}</div>
                {x.types.map(function(t,j) {
                  return <div key={j} style={{ color:C.soft, fontSize:11, padding:"2px 0", display:"flex", gap:6 }}><span style={{ color:x.color }}>→</span>{t}</div>;
                })}
              </div>
            );
          })}
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>ELASTIC CONSTANTS — THE FOUR CONSTANTS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { n:"Young's Modulus (E)", f:"E = σ / ε = (P/A) / (δL/L) = PL / Aδ", c:C.cyan, d:"Ratio of tensile stress to tensile strain. Measures stiffness. Higher E = stiffer material. Steel: 200 GPa. Aluminium: 70 GPa. Rubber: 0.01 GPa." },
            { n:"Shear Modulus (G)", f:"G = τ / γ", c:C.orange, d:"Ratio of shear stress to shear strain. Also called Modulus of Rigidity. Steel: 80 GPa. Related to E: G = E/2(1+μ)." },
            { n:"Bulk Modulus (K)", f:"K = p / (volumetric strain)", c:C.purple, d:"Ratio of hydrostatic pressure to volumetric strain. Measures resistance to volume change. Related to E: E = 3K(1−2μ)." },
            { n:"Poisson's Ratio (μ)", f:"μ = −(lateral strain / axial strain)", c:C.green, d:"Ratio of lateral strain to axial strain (negative sign). Steel: 0.3. Aluminium: 0.33. Range: 0 to 0.5. Incompressible: μ = 0.5." },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderLeft:"2px solid "+x.c }}>
                <div style={{ color:x.c, fontWeight:700, fontSize:12, marginBottom:6 }}>{x.n}</div>
                <div style={{ fontFamily:"monospace", fontSize:12, color:x.c, background:C.card, padding:"6px 10px", borderRadius:6, textAlign:"center", marginBottom:8 }}>{x.f}</div>
                <div style={{ color:C.soft, fontSize:11, lineHeight:1.6 }}>{x.d}</div>
              </div>
            );
          })}
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>MATERIAL PROPERTIES — KEY VALUES TO MEMORISE</div>
        <DTable
          heads={["Material","E (GPa)","G (GPa)","Poisson (μ)","Yield Stress (MPa)","UTS (MPa)"]}
          cols={[C.soft, C.cyan, C.orange, C.green, C.yellow, C.purple]}
          rows={[
            ["Mild Steel","200","80","0.3","250","400-500"],
            ["High-tensile Steel","200","80","0.3","400-500","600-800"],
            ["Aluminium Alloy","70","26","0.33","100-300","150-400"],
            ["Copper","120","45","0.33","70-300","200-400"],
            ["Cast Iron","100-170","40","0.25","—","200-400 (compression: 600+)"],
            ["Concrete","20-30","—","0.15-0.2","— (weak in tension)","20-50 (compression)"],
          ]}
          hi={[0]}
        />
      </Box>

      <Box style={{ borderTop:"2px solid "+C.orange }}>
        <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>STRESS-STRAIN DIAGRAM — MILD STEEL (KEY POINTS)</div>
        <svg viewBox="0 0 500 260" style={{ width:"100%", maxWidth:550 }}>
          <rect width="500" height="260" fill={C.bg} rx="8"/>
          <line x1="50" y1="220" x2="470" y2="220" stroke={C.border} strokeWidth="1.5"/>
          <line x1="50" y1="220" x2="50" y2="20" stroke={C.border} strokeWidth="1.5"/>
          <text x="260" y="248" fill={C.soft} fontSize="11" textAnchor="middle" fontFamily="monospace">Strain (ε) →</text>
          <text x="20" y="130" fill={C.soft} fontSize="11" textAnchor="middle" fontFamily="monospace" transform="rotate(-90,20,130)">Stress (σ)</text>
          <polyline points="50,220 160,80 175,75 185,90 200,85 340,80 400,60 440,110 460,160" fill="none" stroke={C.orange} strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="160" cy="80" r="4" fill={C.cyan}/>
          <text x="162" y="72" fill={C.cyan} fontSize="9" fontFamily="monospace">A (Proportional limit)</text>
          <circle cx="175" cy="75" r="4" fill={C.yellow}/>
          <text x="118" y="68" fill={C.yellow} fontSize="9" fontFamily="monospace">B (Elastic limit)</text>
          <circle cx="185" cy="90" r="4" fill={C.red}/>
          <text x="190" y="88" fill={C.red} fontSize="9" fontFamily="monospace">C (Upper yield)</text>
          <circle cx="200" cy="85" r="4" fill={C.orange}/>
          <text x="204" y="99" fill={C.orange} fontSize="9" fontFamily="monospace">D (Lower yield)</text>
          <circle cx="340" cy="80" r="4" fill={C.green}/>
          <text x="310" y="72" fill={C.green} fontSize="9" fontFamily="monospace">E (UTS)</text>
          <circle cx="460" cy="160" r="4" fill={C.purple}/>
          <text x="435" y="155" fill={C.purple} fontSize="9" fontFamily="monospace">F (Fracture)</text>
          <line x1="50" y1="80" x2="160" y2="80" stroke={C.cyan} strokeWidth="1" strokeDasharray="3,3"/>
          <text x="46" y="82" fill={C.cyan} fontSize="8" textAnchor="end" fontFamily="monospace">σ_y</text>
          <line x1="50" y1="60" x2="400" y2="60" stroke={C.green} strokeWidth="1" strokeDasharray="3,3"/>
          <text x="46" y="63" fill={C.green} fontSize="8" textAnchor="end" fontFamily="monospace">UTS</text>
          <text x="90" y="160" fill={C.cyan} fontSize="9" fontFamily="monospace">Hooke's Law</text>
          <text x="90" y="172" fill={C.cyan} fontSize="9" fontFamily="monospace">region (O→A)</text>
        </svg>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12 }}>
          {[
            { p:"O to A: Proportional limit", d:"Hooke's Law applies. Stress proportional to strain. E = σ/ε = constant." },
            { p:"A to B: Elastic limit", d:"Material returns to original shape on removing load. No permanent deformation." },
            { p:"B to C: Upper yield point", d:"Sudden drop in stress. Slip bands form. Material yields without extra load." },
            { p:"C to D: Lower yield point", d:"Plastic flow at roughly constant stress. Lüder's bands visible on surface." },
            { p:"D to E: Strain hardening", d:"Material strengthens due to dislocation interactions. Stress rises again." },
            { p:"E to F: Necking and fracture", d:"Localised reduction of cross-section (necking). Stress drops until fracture." },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ padding:"8px 12px", background:C.bg, borderRadius:8, borderLeft:"2px solid "+C.orange+"60" }}>
                <div style={{ color:C.orange, fontSize:11, fontWeight:700, marginBottom:2 }}>{x.p}</div>
                <div style={{ color:C.soft, fontSize:11 }}>{x.d}</div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function BendingSec() {
  return (
    <div>
      <STitle icon="📐" title="BENDING MOMENT AND SHEAR FORCE" sub="SFD and BMD for standard beams — formulas and diagrams" color={C.orange} />
      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.orange, background:C.orange+"08" }}>
        <div style={{ color:C.orange, fontWeight:700, fontSize:14, marginBottom:8 }}>SIGN CONVENTION (Very Important — Examiners Check This)</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:12, marginBottom:6 }}>Shear Force Convention</div>
            <div style={{ color:C.text, fontSize:12, lineHeight:1.7 }}>Positive SF: Forces acting UPWARD to the LEFT of section (or downward to the right).<br/>Negative SF: Forces acting DOWNWARD to the left (or upward to the right).</div>
          </div>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:12, marginBottom:6 }}>Bending Moment Convention</div>
            <div style={{ color:C.text, fontSize:12, lineHeight:1.7 }}>Positive BM (sagging): Beam bends concave UPWARD — bottom fibres in tension. Negative BM (hogging): Beam bends concave DOWNWARD — top fibres in tension.</div>
          </div>
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>STANDARD CASES — FORMULAS AND DIAGRAMS</div>
        <div style={{ display:"grid", gap:14 }}>
          {[
            {
              title:"Simply Supported Beam — Central Point Load (W), Span L",
              color:C.cyan,
              items:[
                "Reaction at each support: R = W/2",
                "Max Shear Force = W/2 (at supports)",
                "Max Bending Moment = WL/4 (at CENTRE — point of load)",
                "SFD: Rectangular steps (+W/2 left of load, −W/2 right of load)",
                "BMD: Triangular — zero at supports, maximum at centre",
                "Deflection at centre: δ = WL³/48EI",
              ],
            },
            {
              title:"Simply Supported Beam — UDL (w per unit length), Span L",
              color:C.orange,
              items:[
                "Reaction at each support: R = wL/2",
                "Max Shear Force = wL/2 (at supports)",
                "Max Bending Moment = wL²/8 (at CENTRE)",
                "SFD: Linear (straight line) — +wL/2 at left, −wL/2 at right, zero at centre",
                "BMD: Parabolic — zero at supports, max at centre",
                "Deflection at centre: δ = 5wL⁴/384EI",
              ],
            },
            {
              title:"Cantilever Beam — Point Load W at Free End, Length L",
              color:C.red,
              items:[
                "Reaction at fixed end: R = W (vertical), M_fixed = W×L (moment)",
                "Shear Force = W throughout (constant)",
                "Max Bending Moment = W×L (at FIXED END, hogging = negative)",
                "SFD: Rectangular throughout",
                "BMD: Linear — zero at free end, maximum W×L at fixed end",
                "Deflection at free end: δ = WL³/3EI",
              ],
            },
            {
              title:"Cantilever Beam — UDL (w per unit length), Length L",
              color:C.purple,
              items:[
                "Reaction at fixed end: R = wL (vertical), M_fixed = wL²/2 (moment)",
                "Shear Force: Linear — zero at free end, wL at fixed end",
                "Max Bending Moment = wL²/2 (at FIXED END)",
                "SFD: Linear (triangular shape)",
                "BMD: Parabolic — zero at free end, max at fixed end",
                "Deflection at free end: δ = wL⁴/8EI",
              ],
            },
          ].map(function(c,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"3px solid "+c.color }}>
                <div style={{ color:c.color, fontWeight:700, fontSize:13, marginBottom:10 }}>{c.title}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                  {c.items.map(function(item,j) {
                    return (
                      <div key={j} style={{ display:"flex", gap:8, fontSize:12, color:C.soft }}>
                        <span style={{ color:c.color, flexShrink:0 }}>→</span>{item}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>RELATIONSHIP BETWEEN LOAD, SF, AND BM</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { formula:"w = −dV/dx", label:"Load intensity = rate of change of SF", color:C.cyan },
            { formula:"V = dM/dx", label:"Shear Force = rate of change of BM", color:C.orange },
            { formula:"At V=0: M is max/min", label:"Point of zero shear = point of max/min BM", color:C.green },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, textAlign:"center" }}>
                <div style={{ fontFamily:"monospace", fontSize:14, color:x.color, fontWeight:700, padding:"8px 0", marginBottom:8 }}>{x.formula}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.5 }}>{x.label}</div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function TorsionSec() {
  return (
    <div>
      <STitle icon="🔄" title="TORSION OF SHAFTS" sub="Solid and hollow circular shafts — shear stress, angle of twist, power" color={C.purple} />
      <Box style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>TORSION FORMULA — FUNDAMENTAL RELATIONSHIP</div>
        <div style={{ background:C.bg, borderRadius:10, padding:"14px 20px", textAlign:"center", marginBottom:14 }}>
          <div style={{ fontFamily:"monospace", fontSize:17, color:C.purple, fontWeight:700, letterSpacing:1 }}>T/J = τ/r = G×θ/L</div>
          <div style={{ color:C.soft, fontSize:12, marginTop:8 }}>Torsion equation — analogous to bending equation M/I = σ/y = E/R</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[
            { s:"T", d:"Applied torque (N·mm)", c:C.purple },
            { s:"J", d:"Polar moment of inertia (mm⁴)", c:C.cyan },
            { s:"τ", d:"Shear stress at radius r (N/mm²)", c:C.orange },
            { s:"r", d:"Radial distance from centre (mm)", c:C.yellow },
            { s:"G", d:"Shear modulus (N/mm²)", c:C.green },
            { s:"θ", d:"Angle of twist (radians)", c:C.red },
            { s:"L", d:"Length of shaft (mm)", c:C.blue },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ display:"flex", gap:8, padding:"5px 8px", background:C.bg, borderRadius:6, border:"1px solid "+C.border+"60" }}>
                <span style={{ color:x.c, fontFamily:"monospace", fontSize:13, fontWeight:700, minWidth:20 }}>{x.s}</span>
                <span style={{ color:C.soft, fontSize:11 }}>{x.d}</span>
              </div>
            );
          })}
        </div>
      </Box>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.cyan }}>
          <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:1, marginBottom:12 }}>SOLID CIRCULAR SHAFT (diameter d)</div>
          {[
            { n:"Polar MI", f:"J = πd⁴/32" },
            { n:"Max shear stress", f:"τ_max = 16T/πd³" },
            { n:"Angle of twist", f:"θ = TL/GJ = 32TL/Gπd⁴" },
            { n:"Power transmitted", f:"P = 2πNT/60 (W), N in rpm" },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
                <div style={{ color:C.cyan, fontSize:11, fontWeight:700, marginBottom:4 }}>{x.n}</div>
                <div style={{ fontFamily:"monospace", fontSize:13, color:C.text, background:C.bg, padding:"5px 10px", borderRadius:5 }}>{x.f}</div>
              </div>
            );
          })}
        </Box>
        <Box style={{ borderTop:"2px solid "+C.orange }}>
          <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>HOLLOW CIRCULAR SHAFT (OD = D, ID = d)</div>
          {[
            { n:"Polar MI", f:"J = π(D⁴ − d⁴)/32" },
            { n:"Max shear stress", f:"τ_max = 16TD/π(D⁴ − d⁴)" },
            { n:"Angle of twist", f:"θ = 32TL/Gπ(D⁴ − d⁴)" },
            { n:"Hollow vs Solid", f:"Hollow is more efficient for same weight" },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
                <div style={{ color:C.orange, fontSize:11, fontWeight:700, marginBottom:4 }}>{x.n}</div>
                <div style={{ fontFamily:"monospace", fontSize:13, color:C.text, background:C.bg, padding:"5px 10px", borderRadius:5 }}>{x.f}</div>
              </div>
            );
          })}
          <div style={{ marginTop:12, padding:"10px", background:C.orange+"10", borderRadius:8, fontSize:12, color:C.text }}>A hollow shaft is stronger and stiffer than a solid shaft of the same weight because material is distributed farther from the neutral axis (higher J for same cross-sectional area).</div>
        </Box>
      </div>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>COLUMNS — EULER'S BUCKLING FORMULA</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ fontFamily:"monospace", fontSize:15, color:C.green, fontWeight:700, background:C.bg, padding:"10px 16px", borderRadius:8, textAlign:"center", marginBottom:12 }}>P_cr = π²EI / Le²</div>
            <DTable
              heads={["End Condition","Le / L","Relative Strength"]}
              cols={[C.soft, C.green, C.yellow]}
              rows={[
                ["Both ends pinned","1.0 L","1x (reference)"],
                ["One fixed, one free","2.0 L","0.25x (weakest!)"],
                ["Both ends fixed","0.5 L","4x (strongest)"],
                ["One fixed, one pinned","0.7 L","2x"],
              ]}
              hi={[1,2]}
            />
          </div>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>Slenderness Ratio and Limitations</div>
            {[
              { t:"Slenderness ratio", d:"λ = Le / k, where k = √(I/A) = radius of gyration" },
              { t:"Euler applies when", d:"λ > 100 (long columns). Rankine-Gordon for short/intermediate columns." },
              { t:"Rankine-Gordon formula", d:"P = (σ_c × A) / (1 + α×λ²), combines crushing and buckling failure" },
              { t:"Critical stress", d:"σ_cr = P_cr/A = π²E/λ². Independent of length only depends on λ." },
              { t:"Failure mode", d:"Long column: Elastic buckling (Euler). Short column: Material yielding. Intermediate: Both (Rankine)." },
            ].map(function(x,i) {
              return (
                <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}>
                  <div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>{x.t}</div>
                  <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function FormulasSec() {
  return (
    <div>
      <STitle icon="🔢" title="FORMULA MASTER SHEET" sub="All SOM and Engineering Mechanics formulas for MPSC Mains" color={C.yellow} />
      <div style={{ display:"grid", gap:14 }}>
        <FormulaCard
          name="Stress and Elongation"
          formula="σ = P/A    δL = PL/AE    ε = δL/L"
          color={C.cyan}
          vars={[{s:"σ",d:"Stress (N/mm²)"},{s:"P",d:"Axial force (N)"},{s:"A",d:"Cross-sectional area (mm²)"},{s:"δL",d:"Elongation (mm)"},{s:"E",d:"Young's modulus (N/mm²)"},{s:"ε",d:"Strain (dimensionless)"}]}
          example={"Steel bar: P=100kN, A=500mm², L=2m, E=200GPa\nσ = 100,000/500 = 200 N/mm²\nδL = 100,000×2000/(500×200,000) = 2 mm\nε = 200/200,000 = 0.001"}
        />
        <FormulaCard
          name="Bending Stress and Section Modulus"
          formula="σ = M·y/I = M/Z    Z = I/y_max"
          color={C.orange}
          vars={[{s:"M",d:"Bending moment (N·mm)"},{s:"y",d:"Distance from neutral axis (mm)"},{s:"I",d:"Second moment of area (mm⁴)"},{s:"Z",d:"Section modulus = I/y_max (mm³)"}]}
          example={"Rectangle (b=100, d=200): I = 100×200³/12 = 66.67×10⁶ mm⁴\nZ = I/(d/2) = 66.67×10⁶/100 = 666,667 mm³\nIf M = 10 kN·m = 10×10⁶ N·mm:\nσ_max = M/Z = 10×10⁶/666,667 = 15 N/mm²"}
        />
        <FormulaCard
          name="Torsion — Solid Shaft"
          formula="τ_max = 16T/πd³    θ = TL/GJ    J = πd⁴/32"
          color={C.purple}
          vars={[{s:"T",d:"Torque (N·mm)"},{s:"d",d:"Diameter (mm)"},{s:"G",d:"Shear modulus (N/mm²)"},{s:"J",d:"Polar MI (mm⁴)"},{s:"θ",d:"Angle of twist (radians)"}]}
          example={"Shaft d=60mm, T=2kN·m=2×10⁶N·mm, G=80GPa, L=1m=1000mm\nJ = π×60⁴/32 = 1,272,345 mm⁴\nτ_max = 16×2×10⁶/(π×60³) = 32×10⁶/678,584 = 47.2 N/mm²\nθ = TL/GJ = 2×10⁶×1000/(80,000×1,272,345) = 0.0196 rad = 1.12°"}
        />
        <FormulaCard
          name="Euler's Column — Critical Load"
          formula="P_cr = π²EI / Le²"
          color={C.green}
          vars={[{s:"Le",d:"Effective length (depends on end conditions)"},{s:"E",d:"Young's modulus (N/mm²)"},{s:"I",d:"Minimum MI of cross-section (mm⁴)"}]}
          example={"Both ends pinned: Le = L = 3000mm\nE = 200,000 N/mm², I = 4×10⁶ mm⁴\nP_cr = π² × 200,000 × 4×10⁶ / 3000²\n     = 9.87 × 8×10¹¹ / 9×10⁶ = 877,000 N = 877 kN"}
        />
        <FormulaCard
          name="Thin Cylinder — Pressure Vessel Stresses"
          formula="σ_h = pd/2t    σ_L = pd/4t    σ_h = 2σ_L"
          color={C.red}
          vars={[{s:"σ_h",d:"Hoop (circumferential) stress (N/mm²)"},{s:"σ_L",d:"Longitudinal stress (N/mm²)"},{s:"p",d:"Internal pressure (N/mm²)"},{s:"d",d:"Internal diameter (mm)"},{s:"t",d:"Wall thickness (mm)"}]}
          example={"Cylinder: d=300mm, t=10mm, p=5N/mm²\nσ_h = 5×300/(2×10) = 75 N/mm² (hoop — governs!)\nσ_L = 5×300/(4×10) = 37.5 N/mm² (longitudinal)\nConfirm: hoop = 2 × longitudinal = 2×37.5 = 75 ✓\nThin cylinder condition: t < d/20 → 10 < 15 ✓"}
        />
        <FormulaCard
          name="Thermal Stress — Fixed Bar"
          formula="σ_thermal = E × α × ΔT    Free expansion = α × ΔT × L"
          color={C.yellow}
          vars={[{s:"E",d:"Young's modulus (N/mm²)"},{s:"α",d:"Coefficient of thermal expansion (/°C). Steel: 12×10⁻⁶"},{s:"ΔT",d:"Temperature change (°C)"}]}
          example={"Steel bar fixed at both ends, ΔT = +30°C:\nσ = E × α × ΔT = 200,000 × 12×10⁻⁶ × 30 = 72 N/mm² (compressive)\n\nFree expansion (if not fixed): δ = α×ΔT×L = 12×10⁻⁶×30×1000 = 0.36 mm\nBut fixed → zero expansion → compressive stress 72 MPa"}
        />
      </div>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🔩", title:"Stress Strain — Quick Rules", color:C.cyan,
      items:[
        "Stress = Force/Area. ALWAYS convert kN to N first (×1000). Units: N/mm² = MPa.",
        "Elongation = PL/AE. Think of it as: bigger force = more elongation, longer = more, bigger area = less, stiffer material = less.",
        "Poisson ratio: lateral strain = NEGATIVE μ × axial strain. Stretch one way = shrink other ways.",
        "Steel: E=200GPa, G=80GPa, μ=0.3, α=12×10⁻⁶/°C. Memorise these 4 values — used in 80% of numerical problems.",
        "Thermal stress (fixed) = Eα ΔT. If free to expand: ZERO stress (no restraint = no stress). Only restraint creates thermal stress.",
        "E = 2G(1+μ). For steel: 200 = 2×80×(1+0.3) = 2×80×1.3 = 208 ≈ 200. Verify relationship always!",
      ],
    },
    {
      icon:"📐", title:"Bending Moment — Key Formulas", color:C.orange,
      items:[
        "Simply supported + central point load W: M_max = WL/4 at centre.",
        "Simply supported + UDL (w/unit): M_max = wL²/8 at centre.",
        "Cantilever + end point load W: M_max = WL at fixed end.",
        "Cantilever + UDL (w/unit): M_max = wL²/2 at fixed end.",
        "Max BM always occurs where Shear Force = ZERO. Use this to find location of M_max.",
        "BMD shape: Point load → triangular/stepped. UDL → parabolic. No load → linear (straight line).",
        "Section modulus Z = I/y_max. For rectangle: Z = bd²/6. For circle: Z = πd³/32.",
      ],
    },
    {
      icon:"🔄", title:"Torsion and Columns — Zero Confusion", color:C.purple,
      items:[
        "Torsion max stress = 16T/πd³ (solid shaft). This is the most used formula.",
        "Polar MI (J) = πd⁴/32 (solid). Note: J = 2I for solid circle (J is for torsion, I is for bending).",
        "Euler column: P_cr = π²EI/Le². Both pinned Le=L. One fixed one free: Le=2L (weakest — factor 4 less than both fixed).",
        "Both fixed = FOUR TIMES stronger than both pinned. Memory: fixing both ends quadruples buckling strength.",
        "Slenderness ratio λ = Le/k (k = radius of gyration = √(I/A)). High λ = long column = Euler applies. Low λ = short = crushing.",
        "Hollow shaft advantage: same torsional strength/stiffness as solid shaft but LIGHTER. Used in drive shafts, aircraft.",
      ],
    },
    {
      icon:"🏗️", title:"Pressure Vessels and Thermal", color:C.red,
      items:[
        "Hoop stress = pd/2t. Longitudinal stress = pd/4t. HOOP IS ALWAYS DOUBLE longitudinal.",
        "Cylinders ALWAYS fail by bursting along a longitudinal line (hoop stress governs failure — it's double).",
        "Spherical vessel: stress = pd/4t in ALL directions (isotropic). More efficient than cylinder.",
        "Thin cylinder condition: t < d/20. If thicker: use thick cylinder (Lame's equations needed).",
        "Thermal: If bar is FREE to expand → ZERO stress. If FULLY FIXED → σ = EαΔT. If PARTIALLY fixed → proportional.",
        "Temperature RISE in fixed bar → COMPRESSIVE stress (wants to expand but restrained). Temperature DROP → TENSILE stress.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — SOM", color:C.green,
      items:[
        "Q: Formula for stress → σ = P/A",
        "Q: Young's modulus of steel → 200 GPa = 200,000 N/mm²",
        "Q: Euler critical load for both-ends-pinned column → P_cr = π²EI/L²",
        "Q: Maximum BM for simply supported beam with central load → WL/4",
        "Q: Hoop stress in thin cylinder → pd/2t",
        "Q: Which stress is greater in thin cylinder → Hoop stress (double the longitudinal)",
        "Q: Polar MI of solid circle diameter d → J = πd⁴/32",
        "Q: Max shear stress in solid shaft → τ = 16T/πd³",
        "Q: Effective length for fixed-fixed column → L/2",
        "Q: Poisson ratio for steel → 0.3",
        "Q: Thermal stress in fixed bar → E × α × ΔT",
        "Q: Relation between E, G, μ → E = 2G(1+μ)",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for SOM and Engineering Mechanics" color={C.yellow} />
      <div style={{ display:"grid", gap:14 }}>
        {tricks.map(function(s,i) {
          return (
            <Box key={i} style={{ borderLeft:"4px solid "+s.color }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                <span style={{ fontSize:22 }}>{s.icon}</span>
                <span style={{ fontSize:17, color:s.color, fontWeight:700, letterSpacing:1 }}>{s.title}</span>
              </div>
              {s.items.map(function(item,j) {
                return (
                  <div key={j} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid "+C.border+"30", alignItems:"flex-start" }}>
                    <span style={{ color:s.color, flexShrink:0, fontSize:11, marginTop:2 }}>▸</span>
                    <span style={{ color:C.text, fontSize:13, lineHeight:1.6 }}>{item}</span>
                  </div>
                );
              })}
            </Box>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN APP ──
var SECS = [
  { id:"stress",   icon:"🔩", label:"Stress, Strain, Elastic Constants" },
  { id:"bending",  icon:"📐", label:"Bending Moment and Shear Force" },
  { id:"torsion",  icon:"🔄", label:"Torsion, Columns, Pressure Vessels" },
  { id:"formulas", icon:"🔢", label:"Formula Master Sheet" },
  { id:"tricks",   icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("stress");
  var [qi, setQi]     = useState(0);
  var [sel, setSel]   = useState(null);
  var [exp, setExp]   = useState(false);
  var [done, setDone] = useState(false);
  var [sc, setSc]     = useState({ c:0, w:0, n:0 });

  var q = QS[qi];
  var acc = sc.n>0 ? Math.round(sc.c/sc.n*100) : 0;

  function pick(i) {
    if (sel!==null) return;
    setSel(i); setExp(true);
    setSc(function(s){ return { c:s.c+(i===q.ans?1:0), w:s.w+(i!==q.ans?1:0), n:s.n+1 }; });
  }
  function next() {
    if (qi<QS.length-1){ setQi(qi+1); setSel(null); setExp(false); }
    else setDone(true);
  }
  function reset(){ setQi(0); setSel(null); setExp(false); setDone(false); setSc({c:0,w:0,n:0}); }

  function renderSec() {
    if (sec==="stress") return <StressStrainSec />;
    if (sec==="bending") return <BendingSec />;
    if (sec==="torsion") return <TorsionSec />;
    if (sec==="formulas") return <FormulasSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"formulas",l:"🔢 FORMULAS"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#182030;border-radius:3px}"].join("")}</style>

      <div style={{ background:"#030506", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🔩</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>STRENGTH OF MATERIALS</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 7 of 12 · Stress · Strain · Bending · Torsion · Columns · Pressure Vessels</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="6% WEIGHTAGE" color={C.cyan} />
              <Tag label="7/10 YEARS" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.cyan:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.cyan:"transparent"),
                  transition:"all 0.15s",
                }}>{t.l}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 20px" }}>

        {tab==="learn" && (
          <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:20 }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:10, color:C.muted, letterSpacing:2, marginBottom:10 }}>SECTIONS</div>
              {SECS.map(function(s) {
                return (
                  <div key={s.id} onClick={function(){ setSec(s.id); }} style={{
                    padding:"9px 12px", borderRadius:8, cursor:"pointer", marginBottom:3,
                    background:sec===s.id?C.cyan+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.cyan+"50":"transparent"),
                    color:sec===s.id?C.cyan:C.soft,
                    fontSize:12, fontWeight:sec===s.id?600:400, transition:"all 0.12s",
                  }}>
                    <span style={{ marginRight:8 }}>{s.icon}</span>{s.label}
                  </div>
                );
              })}
            </div>
            <div>{renderSec()}</div>
          </div>
        )}

        {tab==="practice" && (
          <div>
            <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3, marginBottom:20 }}>PRACTICE — 12 QUESTIONS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.cyan}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>

            {done ? (
              <Box glow={C.cyan} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.cyan }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏆":sc.c>=7?"🔩":"📚"}</div>
                <div style={{ fontSize:26, color:C.cyan, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"SOM MASTER!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Excellent! Ready for Topic 8 — Automobile Engineering deep dive.":sc.c>=7?"Good. Review torsion formulas and Euler column effective lengths.":"Revise all sections. Focus on bending stress, torsion max stress, and column critical load formulas."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.cyan, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("formulas"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.cyan, background:"transparent", color:C.cyan, fontWeight:700, cursor:"pointer", fontSize:14 }}>FORMULAS</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.blue} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.yellow:q.level==="HARD"?C.orange:C.purple} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.cyan+","+C.purple+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.cyan, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.cyan, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
                  </div>
                </Box>
                <div style={{ display:"grid", gap:10, marginBottom:18 }}>
                  {q.opts.map(function(opt,i) {
                    var bg=C.card, bdr=C.border, col=C.text, lc=C.muted;
                    if (sel!==null) {
                      if (i===q.ans){ bg=C.green+"15"; bdr=C.green; lc=C.green; }
                      else if (i===sel){ bg=C.red+"15"; bdr=C.red; lc=C.red; col=C.soft; }
                      else col=C.muted;
                    }
                    return (
                      <div key={i} onClick={function(){ pick(i); }} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"13px 16px", borderRadius:10, border:"1.5px solid "+bdr, background:bg, color:col, cursor:sel!==null?"default":"pointer", transition:"all 0.15s" }}>
                        <div style={{ width:28, height:28, borderRadius:6, background:lc+"22", border:"1.5px solid "+lc+"50", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:12, color:lc, fontWeight:700, flexShrink:0 }}>{["A","B","C","D"][i]}</div>
                        <span style={{ fontSize:13, lineHeight:1.55, paddingTop:4 }}>{opt}</span>
                        {sel!==null && i===q.ans && <span style={{ marginLeft:"auto" }}>✅</span>}
                        {sel!==null && i===sel && i!==q.ans && <span style={{ marginLeft:"auto" }}>❌</span>}
                      </div>
                    );
                  })}
                </div>
                {exp && (
                  <Box style={{ marginBottom:18, borderLeft:"4px solid "+(sel===q.ans?C.green:C.red) }}>
                    <div style={{ fontWeight:700, color:sel===q.ans?C.green:C.red, marginBottom:10, fontSize:14 }}>
                      {sel===q.ans?"✅ CORRECT!":"❌ WRONG — Correct answer: "+["A","B","C","D"][q.ans]}
                    </div>
                    <div style={{ color:C.text, fontSize:13, lineHeight:1.85, whiteSpace:"pre-line", marginBottom:12 }}>{q.exp}</div>
                    <div style={{ padding:"10px 14px", background:C.yellow+"10", borderRadius:8, borderLeft:"3px solid "+C.yellow }}>
                      <span style={{ color:C.yellow, fontWeight:700, fontSize:11, fontFamily:"monospace" }}>EXAM TIP: </span>
                      <span style={{ color:C.text, fontSize:13 }}>{q.tip}</span>
                    </div>
                  </Box>
                )}
                {sel!==null && !done && (
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.cyan+","+C.purple+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
                    {qi<QS.length-1?"NEXT QUESTION →":"FINISH QUIZ"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {tab==="formulas" && <FormulasSec />}
        {tab==="tricks" && <TricksSec />}
      </div>
    </div>
  );
}