import { useState } from "react";

var C = {
  bg:"#080808", card:"#101010", border:"#202020",
  steel:"#94A3B8", orange:"#F97316", yellow:"#EAB308",
  green:"#16A34A", red:"#DC2626", blue:"#3B82F6",
  purple:"#8B5CF6", teal:"#0D9488", cyan:"#06B6D4",
  text:"#F0F0F0", muted:"#303030", soft:"#707070",
};

function Tag(props) {
  var c = props.color || C.orange;
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
  var c = props.color || C.orange;
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
  var cols = props.cols || [C.soft, C.orange, C.cyan, C.green, C.yellow];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#060606" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.orange+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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

var QS = [
  {
    id:1, level:"BASIC", topic:"Casting",
    q:"In SAND CASTING, the 'pattern' is used to:",
    opts:["Pour molten metal directly","Create the mould cavity in sand (impression of the final part)","Remove the casting from the mould","Support the sand mould during pouring"],
    ans:1,
    exp:"PATTERN in sand casting: A replica (usually slightly oversized to account for shrinkage) of the desired casting. It is pressed into prepared sand to create a MOULD CAVITY — a negative impression of the part shape.\n\nSand casting process:\n1. Pattern placed in flask (box)\n2. Sand packed tightly around pattern\n3. Pattern removed — cavity remains\n4. Molten metal poured into cavity\n5. Sand broken away after solidification\n6. Casting removed, cleaned, machined\n\nPattern types: Solid (simple shapes), Split (two halves for complex shapes), Core box (for hollow sections), Match plate (for mass production).\n\nPattern allowances: Shrinkage allowance (metal contracts on cooling), Draft allowance (for easy removal), Machining allowance (extra material for surface finishing).",
    tip:"Pattern = creates mould cavity. Pattern is slightly LARGER than final part (shrinkage allowance). Pattern is NOT the final product — it's the TOOL to make the mould. Sand casting is cheapest process for complex shapes — used for engine blocks, cylinder heads, pump bodies.",
  },
  {
    id:2, level:"BASIC", topic:"Welding",
    q:"In SMAW (Shielded Metal Arc Welding / Stick Welding), the electrode coating (flux) serves which PRIMARY purpose?",
    opts:["To conduct electric current to the weld","To protect the molten weld pool from atmospheric contamination (oxidation)","To add hardness to the weld metal","To preheat the base metal"],
    ans:1,
    exp:"SMAW (Stick Welding) electrode coating / FLUX functions:\n\nPRIMARY PURPOSE: Shielding the molten weld pool from atmospheric oxygen and nitrogen, which would cause porosity, brittleness, and oxidation defects.\n\nHow it works:\n- Electric arc melts electrode tip and base metal simultaneously\n- Flux coating melts and creates:\n  (a) GAS SHIELD: CO2, CO gases surround weld pool preventing air contact\n  (b) SLAG: Molten flux floats on weld pool, further protecting it while cooling\n- Slag is chipped off after weld cools\n\nAdditional flux functions:\n- Stabilises the arc\n- Adds alloying elements to weld metal\n- Controls weld bead shape\n- Reduces spatter\n- Provides ionisation for easier arc striking\n\nWithout flux: weld would be porous, brittle, and oxidised — unusable.",
    tip:"Flux in welding = SHIELDING from atmosphere + slag protection. No flux = porosity and oxidation = bad weld. SMAW flux is on electrode coating. GMAW (MIG) uses shielding gas instead. FCAW uses flux inside tubular wire. SAW (Submerged Arc) uses granular flux poured over weld area.",
  },
  {
    id:3, level:"BASIC", topic:"Machining",
    q:"In a LATHE machine, which operation produces an external cylindrical surface by rotating the workpiece against a fixed cutting tool?",
    opts:["Facing","Plain turning","Knurling","Taper turning"],
    ans:1,
    exp:"PLAIN TURNING (Straight turning / Cylindrical turning): The most basic lathe operation.\n\nProcess: Workpiece rotates about its axis. Cutting tool moves parallel to workpiece axis (longitudinal feed). Metal is removed from outer cylindrical surface. Produces a cylinder of uniform diameter.\n\nOther lathe operations:\n- FACING: Tool moves perpendicular to axis (cross feed). Produces flat end surface.\n- TAPER TURNING: Tool moves at an angle to axis. Produces conical surface.\n- KNURLING: Diamond pattern pressed onto surface. For grip (e.g., tool handles).\n- BORING: Enlarges/finishes an existing hole.\n- PARTING/GROOVING: Narrow tool cuts groove or cuts off workpiece.\n- THREADING: Tool with thread profile cuts threads on outer surface.\n- DRILLING: Drill held in tailstock, workpiece rotates.\n\nLathe is the most versatile machine tool — called 'Mother of all machine tools'.",
    tip:"Plain turning = cylindrical surface = tool parallel to axis. Facing = flat end surface = tool perpendicular to axis. Taper turning = conical surface = tool at angle. Lathe = Mother of all machine tools. Cutting speed V = πDN/1000 (m/min), D=diameter(mm), N=rpm.",
  },
  {
    id:4, level:"MEDIUM", topic:"Forging",
    q:"Which of the following correctly describes the DIFFERENCE between HOT FORGING and COLD FORGING?",
    opts:[
      "Hot forging = above recrystallisation temperature (better formability, no work hardening). Cold forging = below recrystallisation temperature (better surface finish, dimensional accuracy, work hardening).",
      "Hot forging = faster process. Cold forging = slower process only.",
      "Hot forging = only for aluminium. Cold forging = only for steel.",
      "Hot forging = produces weaker parts. Cold forging = produces exact dimensions only.",
    ],
    ans:0,
    exp:"HOT FORGING (above recrystallisation temperature, typically >0.6 Tm):\n- Metal is heated above recrystallisation temp (steel: 900-1200°C)\n- Metal is soft and ductile — large deformations possible\n- NO work hardening (recrystallisation removes dislocations continuously)\n- Less force required (lower yield strength at high temp)\n- Surface oxide scale forms (poorer surface finish)\n- Less dimensional accuracy (thermal expansion/contraction)\n- Applications: large forgings — crankshafts, connecting rods, axles, gears, turbine blades\n\nCOLD FORGING (below recrystallisation temperature, room temperature):\n- Metal at room temperature — harder, less ductile\n- Work hardening occurs — final part is STRONGER than original\n- Excellent surface finish (no oxide scale)\n- Better dimensional accuracy and close tolerances\n- More force required (higher yield strength)\n- Limited to smaller parts with moderate deformation\n- Applications: bolts, nuts, screws, small automotive parts",
    tip:"Hot forging: HOT = SOFT = EASY to form = less force = less precise. Cold forging: COLD = HARD = work hardening = stronger part = precise dimensions. Crankshafts and connecting rods = hot forged (large, complex shape). Bolts and fasteners = cold forged (small, precise, stronger).",
  },
  {
    id:5, level:"MEDIUM", topic:"Welding",
    q:"In MIG welding (GMAW — Gas Metal Arc Welding), the shielding gas used for welding MILD STEEL is typically:",
    opts:["Pure argon (Ar)","CO2 or Ar+CO2 mixture (75% Ar + 25% CO2 is most common)","Pure oxygen","Nitrogen (N2)"],
    ans:1,
    exp:"MIG welding (GMAW) shielding gases for mild steel:\n\nCO2 (100%): Cheapest. Provides deep penetration and good fusion. More spatter. Oxidising gas — not suitable for aluminium or stainless.\n\nAr + CO2 mixtures: Most common for mild steel.\n- 75% Argon + 25% CO2 (C25): Most popular mix. Good penetration + less spatter than pure CO2. Better bead appearance.\n- 80% Ar + 20% CO2: Similar, slightly less penetration.\n\nPure Argon (Ar): Used for ALUMINIUM welding (no CO2 — aluminium is reactive). Also for TIG welding.\n\nAr + O2 mixtures: For stainless steel (1-5% O2 in Argon).\n\nHelium: Used with argon for special applications — faster welding speed.\n\nRule: The shielding gas must match the metal being welded. Wrong gas = porosity, oxidation, poor fusion.",
    tip:"MIG welding mild steel = CO2 or 75%Ar+25%CO2 (C25 mix). Aluminium = pure Argon. Stainless steel = Ar+O2 or tri-mix. Pure CO2 = cheapest but more spatter. Argon based = cleaner weld. Never use oxygen alone as shielding gas! The gas prevents atmospheric contamination of the molten weld pool.",
  },
  {
    id:6, level:"MEDIUM", topic:"Machining Operations",
    q:"The process of producing gear teeth on a gear blank using a gear cutter on a milling machine is known as:",
    opts:["Gear grinding","Gear hobbing","Form milling (gear milling)","Gear lapping"],
    ans:2,
    exp:"GEAR MANUFACTURING METHODS:\n\n1. FORM MILLING (Gear Milling): A form cutter (shaped exactly like the tooth space) is mounted on milling machine arbor. Workpiece indexed by dividing head after each tooth. Simple but slow — each tooth cut individually. Cutter profile must match tooth size (different cutter for different tooth numbers). Used for low quantity, low precision gears.\n\n2. GEAR HOBBING: Most efficient method. A hob (worm-shaped multi-tooth cutter) and gear blank both rotate in synchronized motion. All teeth generated simultaneously. High production rate. Used for spur, helical, worm gears. High accuracy possible.\n\n3. GEAR SHAPING: Reciprocating gear-shaped cutter. Used for internal gears and cluster gears where hobbing not possible.\n\n4. GEAR GRINDING: Final finishing after heat treatment. Highest accuracy. Used for precision gears (automotive transmission gears).\n\n5. GEAR LAPPING: Uses abrasive slurry between mating gears running together. Improves surface finish. Final finishing process.",
    tip:"Form milling = one tooth at a time using form cutter + dividing head on milling machine. Hobbing = fastest, most accurate for mass production (simultaneous generation of all teeth). Grinding = for hardened gears (post heat treatment). For MPSC: gear hobbing is the most common industrial gear manufacturing process.",
  },
  {
    id:7, level:"HARD", topic:"Quality Control",
    q:"In Statistical Quality Control (SQC), the control chart for monitoring the AVERAGE (mean) of a quality characteristic is called:",
    opts:["R-chart (Range chart)","X-bar chart (Mean chart)","p-chart","c-chart"],
    ans:1,
    exp:"STATISTICAL QUALITY CONTROL (SQC) — Control Charts:\n\nVARIABLE CONTROL CHARTS (for measurable characteristics like dimensions, weight):\n- X-BAR CHART (Mean chart): Monitors the AVERAGE (mean) of samples. Detects shift in process average.\n- R-CHART (Range chart): Monitors VARIABILITY (spread) within samples. Detects change in process spread.\n- X-bar and R charts are ALWAYS used together for complete process control.\n\nATTRIBUTE CONTROL CHARTS (for pass/fail, defective/non-defective):\n- p-CHART: Fraction defective (proportion of defective items). Variable sample size.\n- np-CHART: Number of defectives. Fixed sample size.\n- c-CHART: Count of defects per unit. Fixed unit size.\n- u-CHART: Defects per unit. Variable unit size.\n\nControl limits: UCL = Upper Control Limit. LCL = Lower Control Limit. Points outside limits = process out of control.",
    tip:"X-bar chart = monitors MEAN (average). R-chart = monitors RANGE (variability). Always use both together for variables. p-chart = fraction DEFECTIVE (attribute). c-chart = count of DEFECTS. Key distinction: DEFECTIVE = bad item. DEFECT = fault on an item (one item can have multiple defects).",
  },
  {
    id:8, level:"HARD", topic:"Metrology",
    q:"A vernier caliper has a main scale with 1 mm divisions and a vernier scale with 25 divisions spanning 24 mm. What is the LEAST COUNT (resolution) of this vernier caliper?",
    opts:["0.1 mm","0.05 mm","0.02 mm","0.04 mm"],
    ans:3,
    exp:"Least Count of Vernier Caliper = (1 Main Scale Division) − (1 Vernier Scale Division)\n\nGiven:\nMain scale: 1 mm divisions\nVernier scale: 25 divisions spanning 24 mm\n\n1 Vernier Scale Division = 24/25 = 0.96 mm\n\nLeast Count = 1 mm − 0.96 mm = 0.04 mm\n\nAlternate formula: LC = (1 MSD) / (Number of Vernier Divisions) = 1/25 = 0.04 mm\n\nCommon vernier calipers:\n- 10-division vernier (1 MSD = 1mm, 10 VSD = 9mm): LC = 1/10 = 0.1 mm\n- 20-division vernier (1 MSD = 1mm, 20 VSD = 19mm): LC = 1/20 = 0.05 mm\n- 25-division vernier (1 MSD = 1mm, 25 VSD = 24mm): LC = 1/25 = 0.04 mm\n- 50-division vernier (1 MSD = 1mm, 50 VSD = 49mm): LC = 1/50 = 0.02 mm",
    tip:"Least Count of vernier = 1 MSD / Total vernier divisions. Common values: 10-div → 0.1mm, 25-div → 0.04mm, 50-div → 0.02mm. Micrometer: LC = pitch/total div = 0.5mm/50 = 0.01mm. Micrometer is 4x more precise than 25-div vernier. Always check LC before reading any measuring instrument.",
  },
  {
    id:9, level:"HARD", topic:"Manufacturing Processes",
    q:"In the POWDER METALLURGY process, which step comes AFTER sintering the compacted powder?",
    opts:[
      "Mixing of powders",
      "Compaction/Pressing in dies",
      "Finishing operations (coining, infiltration, machining)",
      "Annealing of raw powder",
    ],
    ans:2,
    exp:"POWDER METALLURGY PROCESS SEQUENCE:\n\n1. POWDER PRODUCTION: Metal powder produced by atomisation (water/gas), electrolysis, chemical reduction.\n\n2. POWDER BLENDING/MIXING: Different metal powders mixed with lubricants, binders, additives for homogeneous mix.\n\n3. COMPACTION (PRESSING): Powder compressed in die under high pressure (100-1000 MPa). Part takes shape. Called 'Green compact' — weak at this stage.\n\n4. SINTERING: Green compact heated to below melting point (60-90% of Tm). Diffusion bonds particles together. Part gains strength. Slight shrinkage occurs. This is the critical step — part gets its final properties.\n\n5. FINISHING OPERATIONS (Post-sintering):\n   - Sizing/Coining: Light repressing for dimensional accuracy\n   - Infiltration: Filling pores with lower-melting metal (copper in steel)\n   - Impregnation: Filling pores with oil (self-lubricating bearings)\n   - Machining: If complex features needed\n   - Heat treatment: Hardening if required\n\nPM advantages: Near net shape, no material waste, complex shapes possible, porous parts (self-lubricating bearings).",
    tip:"PM sequence: Powder production → Mixing → Compaction (green compact) → SINTERING (bonds particles) → Finishing. Sintering = key step (heating below melting point = diffusion bonding = strength). After sintering = finishing operations like sizing, infiltration, oil impregnation. Self-lubricating bearings made by PM with oil impregnation.",
  },
  {
    id:10, level:"HARD", topic:"Work Study",
    q:"In work study, the STANDARD TIME for a job is calculated as:",
    opts:[
      "Standard time = Normal time only",
      "Standard time = Normal time + Allowances (personal, fatigue, delay)",
      "Standard time = Observed time × Rating factor only",
      "Standard time = Observed time − Allowances",
    ],
    ans:1,
    exp:"WORK STUDY (Time Study) calculations:\n\nStep 1: OBSERVED TIME = Average time taken by worker as observed by time study person\n\nStep 2: NORMAL TIME = Observed Time × Performance Rating Factor\n- Rating: If worker works at 100% = normal. If 120% = fast (rating = 1.2). If 80% = slow (rating = 0.8)\n- Normal time = time a normal worker would take\n\nStep 3: STANDARD TIME = Normal Time + Allowances\n- PERSONAL ALLOWANCE: For personal needs (toilet breaks etc.) — typically 5%\n- FATIGUE ALLOWANCE: For physical/mental tiredness — typically 10-15%\n- DELAY ALLOWANCE: For unavoidable delays (machine breakdown, waiting) — typically 5%\n\nExample:\nObserved time = 10 min, Rating = 90% = 0.9\nNormal time = 10 × 0.9 = 9 min\nAllowances = 20% of normal time = 1.8 min\nStandard time = 9 + 1.8 = 10.8 min\n\nStandard time used for: production planning, wages calculation, efficiency measurement.",
    tip:"Standard time = Normal time + Allowances. Normal time = Observed time × Rating. Three allowances: Personal (toilet), Fatigue (tiredness), Delay (unavoidable interruptions). Standard time > Normal time always (because allowances are positive additions). Used to calculate production rate and worker incentives.",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Production Planning",
    q:"In inventory management, the ECONOMIC ORDER QUANTITY (EOQ) formula minimises which combined costs?",
    opts:[
      "Only the ordering cost",
      "Only the holding (carrying) cost",
      "Combined ordering cost and holding (inventory carrying) cost",
      "Production cost and labour cost",
    ],
    ans:2,
    exp:"EOQ (Economic Order Quantity) minimises the TOTAL COST = Ordering cost + Holding cost.\n\nEOQ Formula:\nEOQ = √(2 × D × Co / Ch)\n\nWhere:\nD = Annual demand (units/year)\nCo = Ordering cost per order (Rs/order) — cost of placing one purchase order\nCh = Holding cost per unit per year (Rs/unit/year) — cost of storing one unit for one year\n\nWhy EOQ works:\n- Ordering too frequently: High ordering cost (many orders placed)\n- Ordering too rarely (large batches): High holding cost (large stock stored)\n- EOQ finds the SWEET SPOT where total cost is minimum\n\nAt EOQ: Ordering cost = Holding cost (they are equal at optimum)\n\nNumber of orders per year = D / EOQ\nTime between orders = EOQ / D (in years)\n\nReorder Point (ROP) = Demand during lead time + Safety stock",
    tip:"EOQ = √(2DCo/Ch). Balances ordering cost vs holding cost. At EOQ: ordering cost = holding cost (equal). More orders = more ordering cost but less holding cost. Fewer orders = less ordering cost but more holding cost. EOQ finds minimum of total cost curve. Used in spare parts inventory management at RTO/workshop.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Plant Layout",
    q:"Which type of plant layout is most suitable for MASS PRODUCTION of a single standardised product (like automobile assembly)?",
    opts:[
      "Process layout (functional layout)",
      "Product layout (line layout / assembly line)",
      "Fixed position layout",
      "Group technology (cellular) layout",
    ],
    ans:1,
    exp:"PRODUCT LAYOUT (Line Layout / Assembly Line):\n- Machines and workstations arranged in the SEQUENCE OF OPERATIONS required to produce ONE product\n- Material flows in ONE direction continuously (one-piece flow)\n- Best for HIGH VOLUME, LOW VARIETY production\n- Examples: Automobile assembly lines, bottling plants, appliance manufacturing\n\nOther layouts:\n\nPROCESS LAYOUT (Functional): Similar machines grouped together (all lathes together, all milling machines together). Used for job shop / batch production with high variety and low volume.\n\nFIXED POSITION LAYOUT: Product is stationary (too large or heavy to move). Workers and machines come to the product. Used for ships, aircraft, large structures, bridges.\n\nCELLULAR (Group Technology): Machines grouped into cells based on part families. Combination of process and product layout. Used for medium variety, medium volume.\n\nSummary:\nProduct layout = MASS PRODUCTION (cars, appliances)\nProcess layout = JOB SHOP (custom parts, repair shops, RTO workshop)\nFixed position = LARGE ONE-OFF (ships, buildings)\nCellular = MEDIUM BATCH",
    tip:"Mass production of one product = PRODUCT LAYOUT (assembly line). Custom/variety work = PROCESS LAYOUT (job shop). Large immovable product = FIXED POSITION. Automobile assembly = classic product layout (Henry Ford invented this). RTO workshop for vehicle inspection and repair = typically process layout.",
  },
];

function CastingForgingSec() {
  return (
    <div>
      <STitle icon="🏗️" title="CASTING AND FORGING" sub="Metal forming processes — types, advantages, applications" color={C.orange} />
      <Box style={{ marginBottom:20, borderTop:"3px solid "+C.orange }}>
        <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>CASTING PROCESSES — OVERVIEW</div>
        <div style={{ display:"grid", gap:10 }}>
          {[
            {
              name:"Sand Casting", col:C.orange,
              desc:"Most common casting process. Pattern pressed into sand to form mould cavity. Molten metal poured in. Sand broken away after solidification.",
              pros:"Cheapest for complex shapes. Any metal. Any size. Low tooling cost.",
              cons:"Poor surface finish. Low dimensional accuracy. Not suitable for thin walls.",
              use:"Engine blocks, cylinder heads, pump housings, machine tool beds, brake drums.",
            },
            {
              name:"Die Casting", col:C.cyan,
              desc:"Molten metal injected under HIGH PRESSURE into permanent metal dies. Very fast process. High production rate.",
              pros:"Excellent surface finish. High dimensional accuracy. High production rate. Thin walls possible.",
              cons:"Limited to lower melting point alloys (Al, Zn, Mg). High die cost. Size limited.",
              use:"Automotive die castings — engine housings, carburettor bodies, door handles, wheel rims.",
            },
            {
              name:"Investment Casting (Lost Wax)", col:C.yellow,
              desc:"Wax pattern coated with ceramic slurry repeatedly to form shell mould. Wax melted out. Metal poured into ceramic shell.",
              pros:"Excellent surface finish. High dimensional accuracy. Complex shapes with internal details. Any metal.",
              cons:"Expensive. Small to medium parts only. Slower process.",
              use:"Gas turbine blades, dental implants, jewellery, precision engineering parts.",
            },
            {
              name:"Centrifugal Casting", col:C.purple,
              desc:"Molten metal poured into rotating cylindrical mould. Centrifugal force distributes metal against mould wall.",
              pros:"Dense, sound casting. No core needed for hollow cylinder. Good for cylindrical parts.",
              cons:"Limited to cylindrical shapes (True centrifugal). Separation of constituents possible.",
              use:"Cast iron pipes, bushings, cylinders, gun barrels, railway wheels.",
            },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"3px solid "+x.col }}>
                <div style={{ color:x.col, fontWeight:700, fontSize:13, marginBottom:6 }}>{x.name}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.6, marginBottom:8 }}>{x.desc}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, fontSize:11 }}>
                  <div><span style={{ color:C.green, fontWeight:700 }}>PRO: </span><span style={{ color:C.soft }}>{x.pros}</span></div>
                  <div><span style={{ color:C.red, fontWeight:700 }}>CON: </span><span style={{ color:C.soft }}>{x.cons}</span></div>
                  <div><span style={{ color:x.col, fontWeight:700 }}>USE: </span><span style={{ color:C.soft }}>{x.use}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>FORGING PROCESSES</div>
        <DTable
          heads={["Type","Process","Temperature","Parts Made","Advantage"]}
          cols={[C.soft, C.yellow, C.orange, C.cyan, C.green, C.purple]}
          rows={[
            ["Open Die Forging","Metal worked between flat or shaped dies — not enclosed","Hot","Large shafts, ingots, rough shapes","Simple tooling, any size"],
            ["Closed Die (Impression Die)","Metal forced into enclosed cavity — flash forms at parting line","Hot","Crankshafts, con-rods, gears, axles","Good accuracy, flash trimmed"],
            ["Drop Forging","Gravity hammer drops onto die. Impression die type.","Hot","Mass production of precise parts","High production rate"],
            ["Press Forging","Hydraulic/mechanical press applies slow squeezing force","Hot or Warm","Large precision forgings","Better penetration, more uniform"],
            ["Cold Forging","Below recrystallisation temperature","Cold (room temp)","Bolts, nuts, screws, small parts","Work hardening = stronger part"],
            ["Roll Forging","Metal passed between rotating rolls with shaped grooves","Hot","Rails, connecting rods, tapered shafts","Continuous process, high rate"],
          ]}
          hi={[1,4]}
        />
        <div style={{ marginTop:12, padding:"10px 14px", background:C.yellow+"10", borderRadius:8, fontSize:12, color:C.text }}>
          Forging produces STRONGER parts than casting because metal flow lines (grain flow) align with part shape. Automotive critical parts (crankshafts, connecting rods, axles) are ALWAYS forged, not cast.
        </div>
      </Box>
    </div>
  );
}

function WeldingSec() {
  var [at, setAt] = useState(0);
  var welds = [
    {
      name:"SMAW — Shielded Metal Arc Welding (Stick)", col:C.orange,
      desc:"Consumable coated electrode. Arc between electrode and base metal. Flux coating provides shielding gas and slag.",
      current:"AC or DC", shield:"Flux coating (slag + gas)", consumable:"Yes (coated electrode)",
      pros:["Simple equipment, portable","Can weld in any position","Works outdoors (wind resistant)","Low equipment cost"],
      cons:["Slag must be chipped off","Spatter common","Slow — electrode changes","Not for thin sheet"],
      use:"Construction, repair, maintenance, pipeline welding, structural steel.",
    },
    {
      name:"GMAW — Gas Metal Arc Welding (MIG)", col:C.cyan,
      desc:"Wire electrode fed continuously from spool. External shielding gas protects weld pool. No flux coating.",
      current:"DC only", shield:"External gas (CO2, Ar+CO2, Ar)", consumable:"Yes (wire)",
      pros:["Fast, continuous wire feed","No slag removal","Suitable for thin metals","Semi-automatic/automatic"],
      cons:["Cannot use outdoors (wind affects gas)","More equipment complexity","Gas cylinder needed"],
      use:"Automotive body manufacturing, sheet metal, structural fabrication, mass production.",
    },
    {
      name:"GTAW — Gas Tungsten Arc Welding (TIG)", col:C.purple,
      desc:"Non-consumable tungsten electrode. Separate filler rod added manually. Inert gas shielding. Highest quality welds.",
      current:"AC (aluminium) or DC (steel/Ti)", shield:"Argon or Helium (inert)", consumable:"No (tungsten electrode, separate filler)",
      pros:["Highest weld quality","No spatter, no slag","Precise control — thin metals","All metals including aluminium, Ti, exotic alloys"],
      cons:["Slow process","Highly skilled operator needed","Expensive equipment","Low deposition rate"],
      use:"Aerospace, nuclear, dairy/food equipment, critical piping, aluminium fabrication.",
    },
    {
      name:"SAW — Submerged Arc Welding", col:C.green,
      desc:"Arc submerged under granular flux (not visible). High deposition rate. Only flat or horizontal position.",
      current:"AC or DC", shield:"Granular flux (poured over weld area)", consumable:"Yes (bare wire + flux)",
      pros:["Very high deposition rate","Excellent quality — no spatter","Deep penetration","No arc flash (arc hidden)"],
      cons:["Only flat position","Limited to thick plates","Not portable","High equipment cost"],
      use:"Ship hulls, pressure vessels, large structural steel, pipe manufacturing.",
    },
    {
      name:"FCAW — Flux-Cored Arc Welding", col:C.yellow,
      desc:"Tubular wire electrode with flux inside the core. Can use with or without external shielding gas. Combines advantages of SMAW and GMAW.",
      current:"DC", shield:"Flux core + optional external gas", consumable:"Yes (tubular wire)",
      pros:["High deposition rate","Works outdoors (self-shielded type)","Good for thick metal","Semiautomatic"],
      cons:["Slag removal needed","More expensive wire","Smoke/fumes","Not suitable for thin metal"],
      use:"Heavy fabrication, structural steel, offshore platforms, repair welding.",
    },
  ];
  var w = welds[at];
  return (
    <div>
      <STitle icon="⚡" title="WELDING PROCESSES" sub="SMAW, MIG, TIG, SAW, FCAW — all types compared" color={C.cyan} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:20 }}>
        {welds.map(function(wl,i) {
          return (
            <button key={i} onClick={function(){ setAt(i); }} style={{
              padding:"10px 8px", borderRadius:10, textAlign:"center",
              border:"2px solid "+(at===i?wl.col:C.border),
              background:at===i?wl.col+"12":C.card, cursor:"pointer", transition:"all 0.15s",
            }}>
              <div style={{ fontFamily:"monospace", fontSize:9, color:at===i?wl.col:C.muted, fontWeight:700 }}>{wl.name.split("—")[0].trim()}</div>
            </button>
          );
        })}
      </div>
      <Box key={at} glow={w.col} style={{ borderTop:"3px solid "+w.col, marginBottom:20 }}>
        <div style={{ color:w.col, fontSize:16, fontWeight:700, marginBottom:8 }}>{w.name}</div>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.8, marginBottom:14 }}>{w.desc}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14 }}>
          {[{l:"Current Type",v:w.current},{l:"Shielding",v:w.shield},{l:"Consumable Electrode",v:w.consumable}].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:8, padding:"10px 12px" }}>
                <div style={{ color:C.muted, fontFamily:"monospace", fontSize:9, letterSpacing:1, marginBottom:4, textTransform:"uppercase" }}>{x.l}</div>
                <div style={{ color:w.col, fontSize:12, fontWeight:700 }}>{x.v}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          <div>
            <div style={{ fontFamily:"monospace", color:C.green, fontSize:10, letterSpacing:1, marginBottom:8 }}>ADVANTAGES</div>
            {w.pros.map(function(p,i) { return <div key={i} style={{ color:C.text, fontSize:12, padding:"4px 0", display:"flex", gap:8 }}><span style={{ color:C.green }}>✓</span>{p}</div>; })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.red, fontSize:10, letterSpacing:1, marginBottom:8 }}>LIMITATIONS</div>
            {w.cons.map(function(p,i) { return <div key={i} style={{ color:C.text, fontSize:12, padding:"4px 0", display:"flex", gap:8 }}><span style={{ color:C.red }}>✗</span>{p}</div>; })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:10, letterSpacing:1, marginBottom:8 }}>TYPICAL APPLICATIONS</div>
            <div style={{ background:C.bg, borderRadius:8, padding:"10px 12px", color:C.soft, fontSize:12, lineHeight:1.7 }}>{w.use}</div>
          </div>
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.orange }}>
        <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>WELDING DEFECTS — CAUSES AND REMEDIES</div>
        <DTable
          heads={["Defect","Cause","Remedy"]}
          cols={[C.soft, C.orange, C.red, C.green]}
          rows={[
            ["Porosity (gas pockets)","Moisture in flux, contaminated base metal, wrong gas","Dry electrodes, clean base metal, correct gas flow"],
            ["Undercut","Excessive current, wrong electrode angle, too fast travel","Reduce current, correct angle, slower travel speed"],
            ["Incomplete fusion","Insufficient heat, too fast travel, wrong technique","Increase current/preheat, slower travel, correct technique"],
            ["Slag inclusion","Improper slag removal between passes, wrong technique","Remove all slag between passes, correct current"],
            ["Hot cracks","High sulphur in steel, high restraint, fast cooling","Low hydrogen electrode, preheat, reduce restraint"],
            ["Spatter","Excessive current, wet electrode, too long arc","Reduce current, dry electrode, maintain correct arc length"],
            ["Distortion","Uneven heating and cooling, improper sequence","Balanced welding sequence, clamps, back-step technique"],
          ]}
          hi={[0,2]}
        />
      </Box>
    </div>
  );
}

function MachiningMetrologySec() {
  return (
    <div>
      <STitle icon="⚙️" title="MACHINING AND METROLOGY" sub="Lathe, milling, drilling, grinding + measuring instruments" color={C.blue} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.blue }}>
        <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>MACHINE TOOLS AND OPERATIONS</div>
        <DTable
          heads={["Machine","Primary Operation","Work Movement","Tool Movement","Products"]}
          cols={[C.soft, C.blue, C.cyan, C.orange, C.yellow, C.green]}
          rows={[
            ["Lathe","Turning (cylindrical)","Rotates (chuck/centres)","Translates (carriage)","Shafts, axles, pins, screws"],
            ["Milling Machine","Milling (flat surfaces)","Translates (table)","Rotates (spindle)","Flat surfaces, slots, gears, keyways"],
            ["Drilling Machine","Drilling (holes)","Fixed (clamped)","Rotates + translates (down)","Holes, tapped holes, counterbores"],
            ["Grinding Machine","Grinding (finishing)","Translates/rotates","Rotates (grinding wheel)","Precision bores, hardened surfaces"],
            ["Shaping Machine","Shaping (flat surfaces)","Translates (table feed)","Reciprocates (tool ram)","Flat surfaces, keyways, slots"],
            ["Broaching Machine","Broaching (keyways, gears)","Translates against broach","Fixed (broach pulled/pushed)","Internal splines, keyways, non-round holes"],
          ]}
          hi={[0,1]}
        />
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>CUTTING SPEED, FEED, AND DEPTH OF CUT</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            {
              name:"Cutting Speed (V)", col:C.orange,
              formula:"V = πDN / 1000 (m/min)",
              vars:"D = diameter (mm), N = spindle speed (rpm)",
              effect:"Higher V: better finish, higher production, more heat, shorter tool life. Too high = tool burns.",
            },
            {
              name:"Feed Rate (f)", col:C.cyan,
              formula:"f = tool advance per revolution (mm/rev) or per min (mm/min)",
              vars:"Measured in mm/rev for turning, mm/tooth for milling",
              effect:"Higher feed: faster material removal, rougher finish. Lower feed: better finish, slower removal.",
            },
            {
              name:"Depth of Cut (d)", col:C.green,
              formula:"d = (D_initial − D_final) / 2 (mm) for turning",
              vars:"Material removed in one pass. Radial depth in turning.",
              effect:"Larger d: more material removed per pass (rough cut). Smaller d: finishing cuts for accuracy.",
            },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderTop:"2px solid "+x.col }}>
                <div style={{ color:x.col, fontWeight:700, fontSize:13, marginBottom:6 }}>{x.name}</div>
                <div style={{ fontFamily:"monospace", fontSize:12, color:x.col, background:C.card, padding:"6px 10px", borderRadius:6, textAlign:"center", marginBottom:8 }}>{x.formula}</div>
                <div style={{ color:C.soft, fontSize:11, marginBottom:6 }}><strong>Variables: </strong>{x.vars}</div>
                <div style={{ color:C.soft, fontSize:11 }}><strong>Effect: </strong>{x.effect}</div>
              </div>
            );
          })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.teal }}>
        <div style={{ fontFamily:"monospace", color:C.teal, fontSize:11, letterSpacing:1, marginBottom:12 }}>METROLOGY — MEASURING INSTRUMENTS</div>
        <DTable
          heads={["Instrument","Measures","Least Count","Range"]}
          cols={[C.soft, C.teal, C.cyan, C.yellow, C.orange]}
          rows={[
            ["Steel Rule / Scale","Length (rough)","0.5 mm","Up to 1000 mm"],
            ["Vernier Caliper (10-div)","OD, ID, depth, step","0.1 mm","0-150 mm typically"],
            ["Vernier Caliper (25-div)","OD, ID, depth, step","0.04 mm","0-150/300 mm"],
            ["Vernier Caliper (50-div)","OD, ID, depth, step","0.02 mm","0-150 mm"],
            ["Outside Micrometer","External dimensions","0.01 mm","25 mm range (0-25, 25-50...)"],
            ["Inside Micrometer","Internal dimensions","0.01 mm","Varies (50-150mm etc)"],
            ["Dial Indicator (Gauge)","Small displacements, runout","0.01 mm","5-10 mm range typically"],
            ["Vernier Height Gauge","Height from surface plate","0.02 mm","0-300/500 mm"],
            ["Sine Bar","Angles","Depends on slip gauges","0-90° angles"],
            ["Slip Gauges (Gauge Blocks)","Length standards (calibration)","0.001 mm (1 micron)","Range of sizes combined"],
            ["Surface Roughness Tester","Surface finish (Ra)","0.001 μm","Ra 0.01 to 100 μm"],
            ["CMM (Coordinate Measuring Machine)","3D dimensions of complex parts","0.001 mm (1 micron)","Large range"],
          ]}
          hi={[4,9]}
        />
      </Box>
    </div>
  );
}

function IndustrialEngSec() {
  return (
    <div>
      <STitle icon="📊" title="INDUSTRIAL ENGINEERING" sub="Work study, plant layout, quality control, inventory management" color={C.green} />
      <div style={{ display:"grid", gap:16 }}>
        <Box style={{ borderTop:"2px solid "+C.green }}>
          <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>WORK STUDY — METHOD STUDY AND TIME STUDY</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div>
              <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>Method Study (How work is done)</div>
              {[
                { t:"Purpose", d:"Find the BEST way to do a job. Eliminate unnecessary motions and steps." },
                { t:"Tools", d:"Process charts, flow diagrams, SIMO charts (simultaneous motion charts), string diagrams." },
                { t:"THERBLIGS", d:"17 basic hand motions defined by F.B. Gilbreth. Eg: Transport empty, Grasp, Use, Release load." },
                { t:"5S System", d:"Sort, Set in order, Shine, Standardise, Sustain. Japanese lean manufacturing." },
                { t:"Ergonomics", d:"Design workplace to fit human body. Reduces fatigue and injury." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
            </div>
            <div>
              <div style={{ color:C.orange, fontWeight:700, fontSize:13, marginBottom:10 }}>Time Study (How long work takes)</div>
              {[
                { t:"Observed Time", d:"Average time measured by stopwatch during actual operation." },
                { t:"Performance Rating", d:"Assessment of worker's speed: 100% = normal. Values: 0.5 to 1.5 typical." },
                { t:"Normal Time", d:"Normal Time = Observed Time × Performance Rating" },
                { t:"Allowances", d:"Personal (5%), Fatigue (10-15%), Delay (5%). Added to normal time." },
                { t:"Standard Time", d:"Standard Time = Normal Time + Allowances. Basis for wages and planning." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.orange, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
            </div>
          </div>
        </Box>

        <Box style={{ borderTop:"2px solid "+C.purple }}>
          <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>PLANT LAYOUT TYPES</div>
          <DTable
            heads={["Layout Type","Arrangement","Volume/Variety","Advantage","Example"]}
            cols={[C.soft, C.purple, C.cyan, C.orange, C.green, C.yellow]}
            rows={[
              ["Product (Line) Layout","Machines in operation sequence","High volume, Low variety","Smooth flow, no backtracking","Car assembly, bottling plant"],
              ["Process (Functional) Layout","Similar machines grouped","Low volume, High variety","Flexible — many products","Job shop, repair workshop"],
              ["Fixed Position Layout","Product stays, workers move","One-off, very large","All work comes to product","Shipbuilding, aircraft assembly"],
              ["Cellular (Group Tech)","Machines in cells by part family","Medium volume, Medium variety","Combines best of line and process","CNC cell, engine parts cell"],
            ]}
            hi={[0,1]}
          />
        </Box>

        <Box style={{ borderTop:"2px solid "+C.yellow }}>
          <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>QUALITY CONTROL — SQC AND CONTROL CHARTS</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div>
              <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>Variable Control Charts (measurable)</div>
              {[
                { n:"X-bar chart", d:"Monitors process MEAN (average of sample). Detects shift in average." },
                { n:"R-chart", d:"Monitors process RANGE (variability). Detects change in spread." },
                { n:"S-chart", d:"Monitors standard deviation. Used with larger sample sizes." },
                { n:"Combined X-bar + R", d:"Used together always for complete variable control." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.n}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
            </div>
            <div>
              <div style={{ color:C.orange, fontWeight:700, fontSize:13, marginBottom:10 }}>Attribute Control Charts (pass/fail)</div>
              {[
                { n:"p-chart", d:"Fraction DEFECTIVE. Variable sample size. Most common attribute chart." },
                { n:"np-chart", d:"Number of DEFECTIVE items. Fixed sample size." },
                { n:"c-chart", d:"Count of DEFECTS per unit. Fixed unit size." },
                { n:"u-chart", d:"Defects per unit. Variable unit size." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.orange, fontSize:12, fontWeight:700 }}>{x.n}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
              <div style={{ marginTop:12, padding:"10px", background:C.yellow+"10", borderRadius:8, fontSize:11, color:C.text }}>
                Key distinction: DEFECTIVE item = entire item fails. DEFECT = single fault on item (one item can have multiple defects). c-chart and u-chart count DEFECTS not defective items.
              </div>
            </div>
          </div>
        </Box>

        <Box style={{ borderTop:"2px solid "+C.teal }}>
          <div style={{ fontFamily:"monospace", color:C.teal, fontSize:11, letterSpacing:1, marginBottom:12 }}>INVENTORY MANAGEMENT — EOQ AND REORDER POINT</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:16, color:C.teal, fontWeight:700, background:C.bg, padding:"10px 16px", borderRadius:8, textAlign:"center", marginBottom:12 }}>EOQ = sqrt(2 x D x Co / Ch)</div>
              {[
                { s:"D", d:"Annual demand (units per year)" },
                { s:"Co", d:"Ordering cost per order (Rs/order) — cost of placing ONE purchase order" },
                { s:"Ch", d:"Holding cost per unit per year (Rs/unit/year) — cost of storing one unit" },
                { s:"EOQ", d:"Optimal order quantity that minimises total inventory cost" },
              ].map(function(x,i) { return (
                <div key={i} style={{ display:"flex", gap:10, padding:"5px 0", borderBottom:"1px solid "+C.border+"40" }}>
                  <span style={{ color:C.teal, fontFamily:"monospace", fontSize:12, fontWeight:700, minWidth:40 }}>{x.s}</span>
                  <span style={{ color:C.soft, fontSize:12 }}>{x.d}</span>
                </div>
              ); })}
            </div>
            <div>
              <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>Key Inventory Concepts</div>
              {[
                { t:"Reorder Point (ROP)", d:"ROP = Demand during lead time + Safety stock. When stock hits ROP, place new order." },
                { t:"Safety Stock", d:"Buffer stock held to prevent stockout during demand uncertainty or supply delay." },
                { t:"ABC Analysis", d:"A items: high value, few items (tight control). B: medium. C: low value, many items (loose control)." },
                { t:"JIT (Just-in-Time)", d:"Material arrives exactly when needed. Zero inventory target. Requires reliable suppliers." },
                { t:"MRP (Material Requirement Planning)", d:"Calculates material needs based on production schedule. Computerised planning system." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🏗️", title:"Casting Processes — Quick Identifier", color:C.orange,
      items:[
        "Sand casting = cheapest = complex shapes = engine blocks, cylinder heads, brake drums.",
        "Die casting = high pressure injection = aluminium/zinc only = car door handles, wheel rims, engine housings.",
        "Investment casting (lost wax) = best accuracy + finish = turbine blades, dental implants, jewellery.",
        "Centrifugal casting = rotating mould = pipes, bushings, cylinders (hollow cylindrical shapes).",
        "Forging is STRONGER than casting (aligned grain flow). Critical automotive parts = forged (crankshaft, con-rod, axle).",
        "Pattern size > final casting size (to account for shrinkage allowance during solidification).",
      ],
    },
    {
      icon:"⚡", title:"Welding — Process Selection Guide", color:C.cyan,
      items:[
        "SMAW (Stick): Portable, outdoor, any position, repair work, construction. But slow and has slag.",
        "GMAW (MIG): Fast, automotive body, sheet metal, mass production. Cannot use outdoors (gas affected by wind).",
        "GTAW (TIG): Highest quality, aluminium and special alloys, aerospace. But slowest and needs skilled welder.",
        "SAW: Highest deposition rate, thick plates, flat position only. Ship hulls and pressure vessels.",
        "MIG gas for mild steel: CO2 or 75%Ar+25%CO2. For aluminium: pure Argon. Never use oxygen alone.",
        "Common welding defects: Porosity (moisture), Undercut (excess current), Incomplete fusion (too fast).",
      ],
    },
    {
      icon:"⚙️", title:"Machining — Key Formulas and Rules", color:C.blue,
      items:[
        "Cutting speed V = πDN/1000 (m/min). D in mm, N in rpm. Higher V = faster but shorter tool life.",
        "Lathe = workpiece rotates. Milling = cutter rotates. Drilling = drill rotates AND feeds down.",
        "Vernier least count = 1 MSD/number of vernier divisions. 25-div → 0.04mm. 50-div → 0.02mm.",
        "Micrometer least count = pitch/number of divisions = 0.5/50 = 0.01mm. More precise than vernier.",
        "Gear hobbing = fastest mass production of gears. Form milling = one tooth at a time (slow, low qty).",
        "Grinding = finishing hardened surfaces. Used AFTER heat treatment (cannot machine hardened steel otherwise).",
      ],
    },
    {
      icon:"📊", title:"Industrial Engineering — Key Numbers", color:C.green,
      items:[
        "Standard time = Normal time + Allowances. Normal time = Observed time × Rating factor.",
        "Three allowances: Personal (5%), Fatigue (10-15%), Delay (5%). Always added to NORMAL time.",
        "X-bar chart = monitors MEAN. R-chart = monitors RANGE. Always used together for variable data.",
        "p-chart = fraction DEFECTIVE (attribute). c-chart = count of DEFECTS per unit.",
        "EOQ = √(2DCo/Ch). At EOQ: ordering cost = holding cost (equal). Minimises TOTAL inventory cost.",
        "Plant layout: Mass production = Product (line) layout. Custom work = Process (functional) layout.",
        "ABC analysis: A = few items, high value, tight control. C = many items, low value, loose control.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Manufacturing", color:C.yellow,
      items:[
        "Q: Pattern in sand casting is used for → Creating the mould cavity (impression of part)",
        "Q: Flux coating in SMAW serves → Shielding weld from atmosphere (gas + slag protection)",
        "Q: MIG welding uses which shielding → CO2 or Ar+CO2 mixture for mild steel",
        "Q: Vernier caliper 25-div least count → 0.04 mm",
        "Q: Micrometer least count → 0.01 mm",
        "Q: Gear hobbing vs form milling → Hobbing: faster, all teeth simultaneously. Form: one at a time.",
        "Q: X-bar chart monitors → Process mean (average). R-chart monitors range (variability).",
        "Q: EOQ formula → √(2DCo/Ch). Minimises ordering + holding cost.",
        "Q: Standard time formula → Normal time + Allowances",
        "Q: Mass production layout → Product (line) layout. Custom work → Process (functional) layout.",
        "Q: Forging vs casting strength → Forging stronger (aligned grain flow).",
        "Q: Sintering in PM → Heating below melting point to bond powder particles by diffusion.",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Manufacturing and Industrial Engineering" color={C.yellow} />
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

var SECS = [
  { id:"casting",   icon:"🏗️", label:"Casting and Forging" },
  { id:"welding",   icon:"⚡", label:"Welding Processes" },
  { id:"machining", icon:"⚙️", label:"Machining and Metrology" },
  { id:"industrial",icon:"📊", label:"Industrial Engineering" },
  { id:"tricks",    icon:"💡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("casting");
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
    if (sec==="casting") return <CastingForgingSec />;
    if (sec==="welding") return <WeldingSec />;
    if (sec==="machining") return <MachiningMetrologySec />;
    if (sec==="industrial") return <IndustrialEngSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#202020;border-radius:3px}"].join("")}</style>
      <div style={{ background:"#040404", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🏭</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>MANUFACTURING PROCESSES</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 10 of 12 · Casting · Forging · Welding · Machining · Metrology · Industrial Engineering</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="5% WEIGHTAGE" color={C.orange} />
              <Tag label="6/10 YEARS" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.orange:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.orange:"transparent"),
                  transition:"all 0.15s",
                }}>{t.l}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 20px" }}>
        {tab==="learn" && (
          <div style={{ display:"grid", gridTemplateColumns:"210px 1fr", gap:20 }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:10, color:C.muted, letterSpacing:2, marginBottom:10 }}>SECTIONS</div>
              {SECS.map(function(s) {
                return (
                  <div key={s.id} onClick={function(){ setSec(s.id); }} style={{
                    padding:"9px 12px", borderRadius:8, cursor:"pointer", marginBottom:3,
                    background:sec===s.id?C.orange+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.orange+"50":"transparent"),
                    color:sec===s.id?C.orange:C.soft,
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
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.orange}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>
            {done ? (
              <Box glow={C.orange} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.orange }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏆":sc.c>=7?"🏭":"📚"}</div>
                <div style={{ fontSize:26, color:C.orange, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"MANUFACTURING MASTER!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Excellent! Ready for Topics 11-12.":sc.c>=7?"Good. Review metrology least counts and control chart types.":"Revise casting processes, welding types, and quality control charts."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.orange, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("tricks"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.orange, background:"transparent", color:C.orange, fontWeight:700, cursor:"pointer", fontSize:14 }}>SEE TIPS</button>
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
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.orange+","+C.yellow+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.orange, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.orange, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.orange+","+C.yellow+")", color:"#000", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
                    {qi<QS.length-1?"NEXT QUESTION →":"FINISH QUIZ"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {tab==="tricks" && <TricksSec />}
      </div>
    </div>
  );
}