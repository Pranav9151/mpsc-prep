import { useState } from "react";

var C = {
  bg:"#07060A", card:"#100D18", border:"#1E1830",
  violet:"#7C3AED", cyan:"#06B6D4", orange:"#F97316",
  green:"#16A34A", red:"#DC2626", yellow:"#EAB308",
  teal:"#0D9488", blue:"#2563EB", pink:"#DB2777",
  text:"#EDE9F8", muted:"#2E2848", soft:"#7B6FA8",
};

function Tag(props) {
  var c = props.color || C.violet;
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
  var c = props.color || C.violet;
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
  var cols = props.cols || [C.soft, C.violet, C.cyan, C.orange, C.green];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#080610" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.violet+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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
    id:1, level:"BASIC", topic:"Tyre Ratings",
    q:"A tyre is marked '205/65 R15 94H'. What does the number 65 represent?",
    opts:["Tyre width in mm","Aspect ratio — sidewall height as percentage of width","Rim diameter in inches","Load index"],
    ans:1,
    exp:"Tyre marking '205/65 R15 94H' decoded:\n205 = Tyre WIDTH in mm (section width)\n65 = ASPECT RATIO — sidewall height as percentage of tyre width (65% of 205mm = 133mm sidewall height)\nR = Radial construction (as opposed to B = Bias/Cross-ply)\n15 = Rim diameter in INCHES\n94 = Load Index (94 = 670 kg maximum load per tyre)\nH = Speed rating (H = 210 km/h maximum)\n\nSo this tyre: 205mm wide, sidewall height 133mm, fits 15-inch rim, carries up to 670kg, rated for 210km/h.",
    tip:"Tyre reading trick: WIDTH(mm) / ASPECT_RATIO(%) R RIM_DIAMETER(inches) LOAD_INDEX SPEED_RATING. Aspect ratio = sidewall height percentage — LOWER aspect ratio = wider, flatter, sporty tyre (better handling but harsher ride). As ARTO, inspect tyre markings during fitness inspection.",
  },
  {
    id:2, level:"BASIC", topic:"Steering Geometry",
    q:"Which component in a steering system converts rotary motion of the steering wheel into linear motion to turn the wheels?",
    opts:["Tie rod","Steering rack (rack and pinion)","Pitman arm","Idler arm"],
    ans:1,
    exp:"RACK AND PINION STEERING: The pinion gear (attached to steering column/wheel) meshes with a toothed rack (linear bar). When steering wheel is turned, pinion rotates, which pushes the rack left or right. The rack is connected to tie rods which push/pull the wheel steering knuckles.\n\nConversion: Rotary motion (steering wheel) → Linear motion (rack movement) → Angular motion (wheel turning).\n\nOther steering types:\n- Recirculating ball: Steering box uses recirculating ball bearings. Less direct feel. Used in older cars and trucks.\n- Pitman arm: Part of recirculating ball system — converts gearbox output to lateral movement.\n- Tie rod: Connects rack to steering knuckle. Transmits steering force to wheel.",
    tip:"Rack and pinion = converts rotary to linear. Most modern cars use rack and pinion (direct, precise, simple). Heavy vehicles use recirculating ball gearbox (can handle more force, less precise feel). Tie rods TRANSMIT steering motion — they do not convert it.",
  },
  {
    id:3, level:"BASIC", topic:"Vehicle Inspection",
    q:"During a vehicle fitness inspection as ARTO/AMVI, the MINIMUM tread depth required for tyres under Central Motor Vehicles Rules is:",
    opts:["0.5 mm","1.6 mm","2.0 mm","3.0 mm"],
    ans:1,
    exp:"Under Central Motor Vehicles Rules 1989, Rule 96 — the minimum permissible tyre tread depth is 1.6 mm.\n\nWhy 1.6mm: Tread depth affects:\n1. Water evacuation (hydroplaning prevention) — wet grip reduces dramatically below 3mm\n2. Heat dissipation — thin tread = more heat buildup\n3. Structural integrity — tread wear indicators (TWI) moulded at 1.6mm depth\n\nAs ARTO/AMVI during fitness inspection:\n- Use a tread depth gauge\n- Check all grooves in at least 3 locations around circumference\n- Check inner, middle, and outer tread zones\n- Below 1.6mm = FAIL fitness certificate\n- Also check for: cuts, bulges, exposed cords, uneven wear\n\nPractical note: Safe driving recommendation is to replace at 3mm. Legal minimum is 1.6mm.",
    tip:"Minimum tyre tread depth = 1.6 mm (CMVR Rule 96). This is a very common MPSC direct question. As ARTO, you must check tread depth with a gauge. Also look for: exposed cord (automatic fail), sidewall cuts, bulges, mismatched tyres on same axle.",
  },
  {
    id:4, level:"MEDIUM", topic:"Power Steering",
    q:"In a hydraulic power steering system, which component generates the hydraulic pressure that assists steering?",
    opts:["Steering rack","Power steering pump (belt-driven by engine)","Rack and pinion gear","Tie rod end"],
    ans:1,
    exp:"HYDRAULIC POWER STEERING system components:\n\n1. POWER STEERING PUMP: Belt-driven by engine crankshaft via accessory drive belt. Generates hydraulic pressure (typically 80-150 bar). Always running when engine runs.\n\n2. POWER STEERING FLUID RESERVOIR: Stores and supplies power steering fluid (ATF or dedicated PS fluid).\n\n3. CONTROL VALVE (rotary valve): Mounted on steering column. Senses steering input. Directs fluid pressure to correct side of rack.\n\n4. POWER CYLINDER (hydraulic rack): Fluid pressure acts on piston to assist rack movement left or right.\n\n5. RETURN LINE: Returns fluid to reservoir.\n\nElectric Power Steering (EPS/EPAS): Modern alternative. Electric motor assists steering. No hydraulic fluid. More fuel efficient (pump only runs when needed). Used in all BS6 era cars.\n\nElectro-Hydraulic Power Steering (EHPS): Electric motor drives hydraulic pump. Combines both.",
    tip:"Hydraulic PS: Engine-driven pump generates pressure → assists rack. Always running = constant parasitic load on engine. Electric PS (EPS): Electric motor assists directly → no pump → better fuel economy → now standard on all modern cars. As ARTO: low PS fluid = whining noise on full lock = check fluid level and pump belt.",
  },
  {
    id:5, level:"MEDIUM", topic:"Wheel Balancing",
    q:"What is the difference between STATIC wheel imbalance and DYNAMIC wheel imbalance?",
    opts:["Static: wobble at high speed. Dynamic: vibration at low speed","Static: heavy spot causes up/down bounce (hop). Dynamic: heavy spots on opposite sides cause wobble/shimmy while rotating","Static affects front wheels only. Dynamic affects rear wheels only","Both are the same condition — just different names"],
    ans:1,
    exp:"STATIC IMBALANCE:\n- Heavy spot on ONE plane (like adding weight to one point on rim)\n- Causes wheel to HOP (up-and-down bounce) when rotating\n- Detectable even when wheel is not rotating (gravity pulls heavy spot down)\n- Can be corrected by adding a single balance weight opposite the heavy spot\n\nDYNAMIC IMBALANCE:\n- Heavy spots on OPPOSITE sides of the wheel (two planes)\n- Causes WOBBLE/SHIMMY (side-to-side oscillation) at speed\n- Only detectable when wheel is SPINNING (centrifugal forces reveal imbalance)\n- Requires two balance weights — one on inside and one on outside of rim\n- More common and more serious for vehicle handling\n\nWheel balancing machine spins wheel at speed and measures both static and dynamic imbalance simultaneously. Balance weights (clip-on or stick-on) are added to correct.",
    tip:"Static = 1 plane = hop (vertical bounce). Dynamic = 2 planes = shimmy/wobble (horizontal oscillation). Dynamic is more common and requires weights on BOTH sides of rim. Symptom: steering wheel vibration at specific speed (usually 80-120 km/h) = wheel balance issue. Fit new tyres = always rebalance.",
  },
  {
    id:6, level:"MEDIUM", topic:"Fuel Injection",
    q:"In a Common Rail Direct Injection (CRDI) diesel system, fuel is stored at very high pressure in a common rail and injected directly into the combustion chamber. The typical rail pressure in modern BS6 CRDI systems is:",
    opts:["100-200 bar","500-800 bar","1000-2500 bar","50-100 bar"],
    ans:2,
    exp:"Modern BS6 CRDI (Common Rail Direct Injection) systems operate at:\n1000 to 2500 BAR rail pressure (100 to 250 MPa)\n\nWhy such high pressure:\n- At high pressure, fuel atomises into extremely fine droplets\n- Better mixing with compressed air → more complete combustion\n- Better fuel economy and lower emissions\n- Enables multiple injections per cycle (pilot + main + post injection)\n\nCRDI system components:\n1. High pressure fuel pump: Creates 1000-2500 bar pressure\n2. Common rail (accumulator): Maintains constant high pressure, feeds all injectors\n3. Electronically controlled injectors: Solenoid or piezo-electric type, precise timing and quantity\n4. ECU: Controls injection timing, quantity, and pressure based on sensors\n5. Pressure relief valve: Safety valve on rail\n\nBS6 benefit: Multiple injections (pilot injection reduces combustion noise, post injection helps DPF regeneration).",
    tip:"CRDI rail pressure: 1000-2500 bar (some latest systems up to 2700 bar). Compare: MPFI petrol = only 3-5 bar. CRDI high pressure = finer atomisation = better combustion = lower emissions = better fuel economy. Piezo injectors (used in premium CRDI) are faster than solenoid type — can do 7+ injections per cycle.",
  },
  {
    id:7, level:"HARD", topic:"ABS and Brake Systems",
    q:"During a fitness inspection of a BS6 commercial vehicle, which of the following would be grounds to FAIL the fitness certificate related to braking systems?",
    opts:[
      "Brake pedal travel slightly more than specification",
      "MIL (Check Engine Light) ON indicating ABS fault + brake pads below 2mm + brake fluid level low",
      "Minor scoring on one brake disc rotor",
      "Slightly uneven brake bias (60-40 front-rear instead of 65-35)",
    ],
    ans:1,
    exp:"Multiple concurrent brake defects = definite FAIL:\n\n1. MIL (Malfunction Indicator Lamp) ON for ABS: ABS system is mandatory for commercial vehicles above 3.5 tonnes under AIS-145. ABS fault = emission/safety system failure = FAIL.\n\n2. Brake pads below 2mm: Most OEM minimum is 2-3mm (compared to original ~10-12mm). Below minimum = excessive wear = risk of metal-to-metal contact = FAIL.\n\n3. Low brake fluid level: Could indicate a LEAK in hydraulic system (dangerous) or severely worn brake pads. Either way = FAIL investigation needed.\n\nOther definite failure reasons for brakes:\n- Brake fluid contamination (water ingress)\n- Seized caliper piston\n- Cracked or warped disc rotor\n- Hydraulic line leaking\n- Parking brake not holding on gradient\n- Brake fade during test\n- Unequal braking force causing vehicle to pull strongly to one side",
    tip:"ARTO brake inspection checklist: Pad thickness (min 2-3mm), disc thickness (min spec), fluid level and condition, hose condition (no cracks/bulges), ABS warning light (must be off after self-test), parking brake effectiveness (hold on slope), brake force balance test (equipment needed at RTO). Any ONE of these failing = FAIL fitness cert.",
  },
  {
    id:8, level:"HARD", topic:"Steering Systems",
    q:"The Ackermann steering principle is designed to ensure that during cornering:",
    opts:[
      "All four wheels are parallel to each other",
      "All wheels roll about a common centre (inner wheel turns more than outer wheel)",
      "The outer wheel turns more sharply than the inner wheel",
      "Both front wheels turn by exactly the same angle",
    ],
    ans:1,
    exp:"ACKERMANN PRINCIPLE (1818, Rudolph Ackermann):\n\nDuring cornering, all wheels must roll about a COMMON CENTRE POINT (instantaneous centre of rotation) to avoid tyre scrub.\n\nGeometry: The inner front wheel must TURN MORE than the outer front wheel.\n\nWhy: Inner wheel traces a SMALLER radius arc than outer wheel. For true rolling (no slip), each wheel must be perpendicular to its own radius line from the common centre.\n\nAckermann geometry is achieved by:\n- Angling the steering arms inward (toe-in of steering arm angle)\n- The steering linkage geometry naturally causes inner wheel to steer to a sharper angle than outer wheel\n\nPerfect Ackermann: All 4 wheel axes meet at one point when extended.\nIn practice: Partial Ackermann used because tyre slip angles at speed mean different geometry is optimal.\n\nResult of incorrect Ackermann: Tyre scrub during turns (one tyre drags sideways) → tyre wear + handling issues.",
    tip:"Ackermann = inner wheel turns MORE than outer during cornering. All wheels share a common turning centre. Achieved by angling the steering arms. Without Ackermann geometry: tyre scrub in corners (one tyre slides sideways) → wear and handling problems. This is why cars can corner smoothly without tyre noise (usually).",
  },
  {
    id:9, level:"HARD", topic:"Tyres",
    q:"What is hydroplaning (aquaplaning) and at what approximate speed does it typically begin on a wet road?",
    opts:[
      "Tyre overheating — begins above 150 km/h",
      "Water film between tyre and road eliminating contact — begins around 80-100 km/h on wet road",
      "Tyre bead separating from rim — begins above 200 km/h",
      "Tyre pressure loss under load — begins at heavy loads only",
    ],
    ans:1,
    exp:"HYDROPLANING (Aquaplaning):\n\nDefinition: A water wedge builds up in front of the rolling tyre faster than it can be evacuated through the tread grooves. The tyre literally FLOATS on the water film — losing contact with road surface completely.\n\nResult:\n- TOTAL loss of steering control (tyre is floating, not gripping)\n- Total loss of traction\n- Braking becomes ineffective\n- ABS cannot help (no road contact to sense)\n\nTypically begins: 80-100 km/h on standing water (depends on tyre tread depth, tyre width, water depth, road surface)\n\nFactors that worsen hydroplaning:\n- Low tread depth (less water evacuation channels)\n- Wider tyres (more water to displace across width)\n- Low tyre pressure (flatter contact patch)\n- Deep standing water\n- High speed\n\nPrevention:\n- Maintain adequate tread depth (>3mm recommended for wet roads)\n- Correct tyre pressure\n- Reduce speed in rain\n- Avoid puddles / standing water",
    tip:"Hydroplaning = tyre floats on water = complete loss of control. Starts ~80-100 km/h on wet roads. WIDER tyres hydroplane MORE easily (more water to displace). LOWER tread depth = worse. In rain: slow down, check tyres, avoid standing water. This is why minimum tread depth rules exist — wet grip reduces dramatically below 3mm.",
  },
  {
    id:10, level:"HARD", topic:"Fuel Systems",
    q:"In a MPFI (Multi-Point Fuel Injection) system, fuel pressure in the fuel rail is maintained by which component?",
    opts:["Carburettor float valve","Fuel pressure regulator (FPR)","Throttle body injector","EGR valve"],
    ans:1,
    exp:"MPFI (Multi-Point Fuel Injection) fuel system:\n\n1. FUEL TANK: Stores fuel. Fuel pump inside tank (in-tank pump).\n\n2. HIGH-PRESSURE FUEL PUMP (in-tank electric pump): Creates 3-5 bar pressure. Always runs when ignition is ON.\n\n3. FUEL FILTER: Fine filtration of debris.\n\n4. FUEL RAIL: Distributes fuel to all injectors at constant pressure.\n\n5. FUEL PRESSURE REGULATOR (FPR): KEY COMPONENT. Maintains constant pressure in fuel rail (typically 2.5-3.5 bar). Any excess fuel is returned to tank via return line. Without FPR: pressure would vary with pump speed and engine demand.\n\n6. INJECTORS: One per cylinder. Solenoid operated. ECU controls opening duration (pulse width) to control fuel quantity.\n\n7. ECU: Controls injection timing and duration based on: MAP/MAF sensor, TPS, oxygen sensor, coolant temp, RPM.\n\nModern returnless systems: No return line — FPR is at fuel pump module in tank.",
    tip:"MPFI fuel pressure = 3-5 bar (very low compared to diesel CRDI at 1000-2500 bar). Fuel Pressure Regulator (FPR) maintains constant rail pressure. Injectors are controlled by ECU pulse width (longer pulse = more fuel). Common MPFI faults: clogged injectors (rough idle), bad FPR (rich/lean mixture), bad oxygen sensor (wrong AFR correction).",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Vehicle Fitness Inspection",
    q:"Under Central Motor Vehicles Rules 1989, a transport vehicle's Certificate of Fitness (CF) is issued after inspection by the Inspecting Authority. Which of the following is CHECKED during a standard fitness inspection?",
    opts:[
      "Only engine performance and emission test",
      "Only brakes and tyres",
      "Comprehensive check: brakes, steering, lighting, tyres, body, emission, safety devices, registration marks",
      "Only valid documents and registration certificate",
    ],
    ans:2,
    exp:"Certificate of Fitness (CF) inspection is a COMPREHENSIVE check of the vehicle's roadworthiness. As per CMVR 1989, Rule 62, the inspecting authority (ARTO/AMVI/MVI) must check:\n\nSAFETY SYSTEMS:\n- Brakes: Service brake, parking brake effectiveness\n- Steering: Free play, binding, power steering function\n- Tyres: Tread depth (min 1.6mm), condition, pressure\n- Lighting: Headlights (beam alignment), brake lights, indicators, reverse light\n- Horn: Must function\n- Wipers: Must function (front and rear)\n- Mirrors: As per rules\n\nSTRUCTURAL:\n- Body condition: No sharp edges, body secure to chassis\n- Glass: Windscreen condition, safety glass\n- Fuel system: No leaks\n- Exhaust: Secure, no leaks\n\nIDENTIFICATION:\n- Registration plate: Correct, visible, illuminated at night\n- VIN/chassis number: Matches RC\n- Engine number: Matches RC\n\nEMISSION:\n- PUC certificate valid\n- OBD-II (BS6): No active fault codes\n- AdBlue level (diesel): Adequate\n\nDOCUMENTS:\n- Valid RC, Insurance, Permit, Driver's DL",
    tip:"CF inspection = COMPREHENSIVE safety check. Not just documents! As ARTO/AMVI you physically inspect: brakes (bounce test, pedal travel), steering (free play), tyres (tread gauge), lights (each one), horn, wipers, body, chassis, VIN, emission (PUC, OBD). Any one failure = vehicle unfit = CF refused until defect corrected.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Modern Vehicle Technology",
    q:"ADAS (Advanced Driver Assistance Systems) is becoming common in BS6 vehicles. Which of the following is an example of an ADAS feature that is now mandatory for new heavy vehicles in India?",
    opts:[
      "Automatic parking",
      "AEB — Automatic Emergency Braking (mandatory for M3 and N3 category vehicles)",
      "Self-driving (Level 4 autonomy)",
      "Traffic sign recognition",
    ],
    ans:1,
    exp:"AEB (Automatic Emergency Braking) has been made MANDATORY for:\n- M3 category: Buses and coaches (passenger vehicles with more than 8 seats + driver, GVW > 5 tonnes)\n- N3 category: Heavy goods vehicles (GVW > 12 tonnes)\n\nVehicle Categories in India (as per AIS rules):\n- L category: Two-wheelers and three-wheelers\n- M1: Passenger car (up to 8 seats)\n- M2: Minibus (9+ seats, GVW ≤ 5t)\n- M3: Bus/Coach (9+ seats, GVW > 5t) — AEB mandatory\n- N1: Light commercial vehicle (GVW ≤ 3.5t)\n- N2: Medium commercial vehicle (3.5t < GVW ≤ 12t)\n- N3: Heavy commercial vehicle (GVW > 12t) — AEB mandatory\n\nOther ADAS features becoming common/mandatory:\n- Lane Departure Warning (LDW)\n- Electronic Stability Control (ESC) — mandatory for M1 vehicles\n- TPMS (Tyre Pressure Monitoring System) — mandatory for M1\n- Speed Limiter/Intelligent Speed Assistance\n- Blind Spot Detection",
    tip:"AEB mandatory for M3 (heavy buses) and N3 (heavy trucks) in India. Vehicle categories: M = passenger, N = goods, L = 2/3 wheelers. ESC mandatory for M1 (cars). TPMS mandatory for new cars. As ARTO: check that mandatory safety systems are present and functional during fitness inspection — no excuse for missing mandatory equipment.",
  },
];

function SteeringSec() {
  var [at, setAt] = useState(0);
  var types = [
    {
      name:"Rack and Pinion Steering", color:C.violet, tag:"MODERN CARS",
      desc:"Pinion gear on steering column meshes with a toothed rack. Rotating the steering wheel moves rack left/right. Most direct and precise steering system.",
      components:["Steering wheel and column","Pinion gear (attached to column)","Rack (linear toothed bar)","Tie rods (connect rack to steering knuckle)","Steering knuckle and ball joints","Rubber boots (protect rack from dust/water)"],
      pros:["Direct, precise steering feel","Simple — fewer components","Compact — fits under dashboard","Easy to add power assistance","Suitable for FWD vehicles"],
      cons:["Limited to lighter vehicles","Road shock transmitted to driver","Not suitable for very heavy loads"],
      use:"All modern passenger cars, light vans, crossovers",
    },
    {
      name:"Recirculating Ball Steering", color:C.orange, tag:"TRUCKS AND OLD CARS",
      desc:"Steering box converts rotation into linear motion using a worm gear and recirculating ball bearings. More mechanical advantage — suitable for heavy vehicles.",
      components:["Steering gear box","Worm shaft (input from steering wheel)","Ball nut (contains recirculating balls)","Sector gear (output)","Pitman arm (connects to drag link)","Drag link, tie rods, steering knuckles"],
      pros:["High mechanical advantage — suitable for heavy vehicles","Durable — long service life","Less road shock to driver","Can handle high steering loads"],
      cons:["Vague steering feel (play in linkage)","More components — complex","Not self-centring as efficiently","Slower response than rack and pinion"],
      use:"Trucks, buses, heavy commercial vehicles, old SUVs (Mahindra, Toyota older models)",
    },
    {
      name:"Hydraulic Power Steering (HPS)", color:C.cyan, tag:"COMMON UNTIL RECENTLY",
      desc:"Engine-driven hydraulic pump pressurises fluid. Hydraulic pressure assists rack or steering box operation. Heavy steering at idle — light at speed.",
      components:["Engine-driven vane pump (belt driven)","Power steering fluid reservoir","High-pressure lines","Control valve (rotary valve in column)","Hydraulic cylinder (assists rack)","Return line"],
      pros:["Strong assistance — good for heavy vehicles","Reliable — proven technology","Can handle high loads easily"],
      cons:["Engine always drives pump = parasitic loss","No assist when engine off","Fluid leaks common over time","Heavier system"],
      use:"Most cars until 2015, still common in trucks and older vehicles",
    },
    {
      name:"Electric Power Steering (EPS)", color:C.green, tag:"MODERN STANDARD",
      desc:"Electric motor directly assists steering rack or column. ECU controls assistance based on speed and steering input. No hydraulic fluid. More efficient.",
      components:["Electric motor (column or rack mounted)","Torque sensor (detects steering input)","Vehicle speed sensor","EPS ECU (control unit)","Steering rack (or column)","Wiring harness"],
      pros:["No engine power loss (only uses power when needed)","No hydraulic fluid or leaks","Better fuel economy (BS6 benefit)","Variable assistance (light at speed, heavy in parking)","Can integrate with ADAS systems"],
      cons:["Electric motor can fail","Less road feel than hydraulic","Requires battery power","More expensive to repair"],
      use:"All modern BS6 passenger cars and light vehicles",
    },
  ];
  var t = types[at];
  return (
    <div>
      <STitle icon="🎯" title="STEERING SYSTEMS" sub="All types, Ackermann principle, power steering and inspection" color={C.violet} />
      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.yellow, background:C.yellow+"08" }}>
        <div style={{ color:C.yellow, fontWeight:700, fontSize:14, marginBottom:8 }}>ACKERMANN STEERING PRINCIPLE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ color:C.text, fontSize:13, lineHeight:1.8 }}>
            During cornering, the INNER front wheel must turn MORE sharply than the OUTER front wheel. All four wheels must rotate about a COMMON CENTRE (instantaneous centre) to avoid tyre scrub and wear.
            <br/><br/>This geometry is achieved by angling the steering arms so the extended axis of each steering arm meets near the rear axle centreline.
          </div>
          <svg viewBox="0 0 280 180" style={{ width:"100%" }}>
            <rect width="280" height="180" fill={C.bg} rx="8"/>
            <text x="140" y="15" fill={C.text} fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">ACKERMANN GEOMETRY</text>
            <rect x="40" y="40" width="200" height="100" fill="none" stroke={C.border} strokeWidth="1.5" strokeDasharray="4,3" rx="4"/>
            <circle cx="40" cy="40" r="10" fill={C.violet} fillOpacity="0.7"/>
            <circle cx="240" cy="40" r="10" fill={C.cyan} fillOpacity="0.7"/>
            <circle cx="40" cy="140" r="8" fill={C.muted} fillOpacity="0.7"/>
            <circle cx="240" cy="140" r="8" fill={C.muted} fillOpacity="0.7"/>
            <text x="40" y="30" fill={C.violet} fontSize="8" textAnchor="middle" fontFamily="monospace">LEFT</text>
            <text x="240" y="30" fill={C.cyan} fontSize="8" textAnchor="middle" fontFamily="monospace">RIGHT</text>
            <line x1="40" y1="40" x2="10" y2="20" stroke={C.violet} strokeWidth="2"/>
            <line x1="240" y1="40" x2="258" y2="25" stroke={C.cyan} strokeWidth="2"/>
            <text x="8" y="18" fill={C.violet} fontSize="7" fontFamily="monospace">More</text>
            <text x="258" y="23" fill={C.cyan} fontSize="7" fontFamily="monospace">Less</text>
            <circle cx="0" cy="90" r="5" fill={C.yellow}/>
            <line x1="40" y1="40" x2="0" y2="90" stroke={C.violet} strokeWidth="1" strokeDasharray="3,2"/>
            <line x1="240" y1="40" x2="0" y2="90" stroke={C.cyan} strokeWidth="1" strokeDasharray="3,2"/>
            <text x="12" y="93" fill={C.yellow} fontSize="8" fontFamily="monospace">Common Centre</text>
            <text x="80" y="170" fill={C.soft} fontSize="8" fontFamily="monospace" textAnchor="middle">Turning LEFT: inner wheel turns more</text>
          </svg>
        </div>
      </Box>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8, marginBottom:20 }}>
        {types.map(function(tp,i) {
          return (
            <button key={i} onClick={function(){ setAt(i); }} style={{
              padding:"10px 14px", borderRadius:10, textAlign:"left",
              border:"2px solid "+(at===i?tp.color:C.border),
              background:at===i?tp.color+"12":C.card, cursor:"pointer", transition:"all 0.15s",
            }}>
              <div style={{ fontFamily:"monospace", fontSize:10, color:at===i?tp.color:C.muted, fontWeight:700, marginBottom:3 }}>{tp.name}</div>
              <Tag label={tp.tag} color={tp.color} />
            </button>
          );
        })}
      </div>
      <Box key={at} glow={t.color} style={{ borderTop:"3px solid "+t.color }}>
        <div style={{ color:t.color, fontSize:18, fontWeight:700, marginBottom:8 }}>{t.name}</div>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.8, marginBottom:14 }}>{t.desc}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          <div>
            <div style={{ fontFamily:"monospace", color:t.color, fontSize:10, letterSpacing:1, marginBottom:10 }}>COMPONENTS</div>
            {t.components.map(function(c,i) {
              return <div key={i} style={{ color:C.soft, fontSize:12, padding:"4px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:8 }}><span style={{ color:t.color }}>→</span>{c}</div>;
            })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.green, fontSize:10, letterSpacing:1, marginBottom:10 }}>ADVANTAGES</div>
            {t.pros.map(function(p,i) { return <div key={i} style={{ color:C.text, fontSize:12, padding:"4px 0", display:"flex", gap:8 }}><span style={{ color:C.green }}>✓</span>{p}</div>; })}
            <div style={{ fontFamily:"monospace", color:C.red, fontSize:10, letterSpacing:1, margin:"10px 0 8px" }}>LIMITATIONS</div>
            {t.cons.map(function(p,i) { return <div key={i} style={{ color:C.text, fontSize:12, padding:"4px 0", display:"flex", gap:8 }}><span style={{ color:C.red }}>✗</span>{p}</div>; })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:10, letterSpacing:1, marginBottom:10 }}>USED IN</div>
            <div style={{ padding:12, background:C.bg, borderRadius:8, color:C.soft, fontSize:12, lineHeight:1.7 }}>{t.use}</div>
          </div>
        </div>
      </Box>
    </div>
  );
}

function TyresSec() {
  return (
    <div>
      <STitle icon="🛞" title="TYRES AND WHEELS" sub="Tyre types, markings, ratings, inspection and hydroplaning" color={C.cyan} />
      <Box style={{ marginBottom:20, borderTop:"3px solid "+C.cyan }}>
        <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:1, marginBottom:12 }}>TYRE MARKING DECODER — EXAM FAVOURITE</div>
        <div style={{ background:C.bg, borderRadius:10, padding:"16px 20px", fontFamily:"monospace", fontSize:20, color:C.text, textAlign:"center", marginBottom:14, letterSpacing:2 }}>
          <span style={{ color:C.cyan }}>205</span>
          <span style={{ color:C.soft }}>/</span>
          <span style={{ color:C.orange }}>65</span>
          <span style={{ color:C.soft }}> </span>
          <span style={{ color:C.yellow }}>R</span>
          <span style={{ color:C.green }}>15</span>
          <span style={{ color:C.soft }}> </span>
          <span style={{ color:C.violet }}>94</span>
          <span style={{ color:C.red }}>H</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {[
            { sym:"205", label:"Section Width", desc:"Tyre width in mm (cross-section when mounted)", color:C.cyan },
            { sym:"65", label:"Aspect Ratio", desc:"Sidewall height as % of width. 65% of 205mm = 133mm sidewall", color:C.orange },
            { sym:"R", label:"Construction", desc:"R = Radial. B = Bias/Cross-ply (old). D = Diagonal", color:C.yellow },
            { sym:"15", label:"Rim Diameter", desc:"Rim diameter in INCHES. Fit only on 15-inch wheel rim", color:C.green },
            { sym:"94H", label:"Load + Speed", desc:"94 = Load index (670kg/tyre). H = Speed rating (210 km/h)", color:C.violet },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:x.color+"12", borderRadius:8, padding:10, textAlign:"center", borderTop:"2px solid "+x.color }}>
                <div style={{ fontFamily:"monospace", fontSize:20, color:x.color, fontWeight:700, marginBottom:4 }}>{x.sym}</div>
                <div style={{ color:C.text, fontSize:11, fontWeight:700, marginBottom:4 }}>{x.label}</div>
                <div style={{ color:C.soft, fontSize:10, lineHeight:1.5 }}>{x.desc}</div>
              </div>
            );
          })}
        </div>
      </Box>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.orange }}>
          <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>TYRE TYPES</div>
          <DTable
            heads={["Type","Construction","Advantage","Used In"]}
            cols={[C.soft, C.orange, C.cyan, C.green, C.yellow]}
            rows={[
              ["Radial","Cords run radially from bead to bead","Better grip, fuel economy, long life","All modern cars and trucks"],
              ["Cross-ply (Bias)","Cords at 35-40° diagonal","Sturdy sidewall, cheap","Old vehicles, some off-road"],
              ["Tubeless","No inner tube, airtight seal on rim","Slow deflation on puncture, lighter","All modern vehicles"],
              ["Tube-type","Separate inner tube holds air","Simple, easily repaired","Old vehicles, motorcycles"],
              ["Run-flat","Reinforced sidewall runs at 0 psi","Drive 80km at 80km/h after puncture","BMW, Mercedes, Bridgestone"],
              ["Low profile","Low aspect ratio (<45)","Better handling, appearance","Sports cars, performance"],
            ]}
            hi={[0,2]}
          />
        </Box>
        <Box style={{ borderTop:"2px solid "+C.yellow }}>
          <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>SPEED AND LOAD RATINGS</div>
          <DTable
            heads={["Speed Symbol","Max Speed","Load Index","Max Load"]}
            cols={[C.soft, C.yellow, C.green, C.cyan]}
            rows={[
              ["N","140 km/h","71","345 kg"],
              ["P","150 km/h","75","387 kg"],
              ["Q","160 km/h","80","450 kg"],
              ["S","180 km/h","85","515 kg"],
              ["T","190 km/h","90","600 kg"],
              ["H","210 km/h","94","670 kg"],
              ["V","240 km/h","100","800 kg"],
              ["W","270 km/h","110","1060 kg"],
              ["Y","300 km/h","120","1400 kg"],
            ]}
            hi={[5]}
          />
        </Box>
      </div>
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.red }}>
        <div style={{ fontFamily:"monospace", color:C.red, fontSize:11, letterSpacing:1, marginBottom:12 }}>ARTO TYRE INSPECTION CHECKLIST</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>PASS CONDITIONS</div>
            {[
              "Tread depth minimum 1.6 mm across main grooves",
              "No exposed tyre cord or fabric",
              "No cuts, cracks, or bulges on sidewall",
              "No lumps or separation of tread",
              "Correct tyre size for vehicle (matches RC)",
              "Matching tyres on same axle (same size and type)",
              "Correct inflation pressure (check with gauge)",
              "Tyre speed rating appropriate for vehicle",
            ].map(function(s,i) { return <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.text }}><span style={{ color:C.green }}>✓</span>{s}</div>; })}
          </div>
          <div>
            <div style={{ color:C.red, fontWeight:700, fontSize:13, marginBottom:10 }}>AUTOMATIC FAIL CONDITIONS</div>
            {[
              "Tread depth below 1.6 mm anywhere",
              "Exposed tyre cord or fabric visible",
              "Bulge on sidewall (indicates internal damage)",
              "Tyre touching brake lines, chassis, or body",
              "Wrong size tyre fitted (different from RC)",
              "Different tyre types on same axle (radial+cross-ply)",
              "Severely uneven wear (indicates alignment issue)",
              "Tyre speed rating below vehicle maximum speed",
            ].map(function(s,i) { return <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.text }}><span style={{ color:C.red }}>✗</span>{s}</div>; })}
          </div>
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.blue }}>
        <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>WHEEL BALANCING AND ALIGNMENT</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:8 }}>Static vs Dynamic Imbalance</div>
            {[
              { t:"Static Imbalance", d:"Heavy spot in one plane. Causes UP-DOWN HOP. Detectable when stationary. Fix: single weight on opposite side." },
              { t:"Dynamic Imbalance", d:"Heavy spots in TWO planes. Causes SIDE-TO-SIDE WOBBLE/SHIMMY. Only detectable when spinning. Fix: weights on both sides of rim." },
              { t:"Symptom of imbalance", d:"Steering wheel vibration at specific speed (usually 80-120 km/h). Cup-shaped tyre wear. Vibration through floor." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:8 }}>Tyre Pressure Effects</div>
            {[
              { t:"Over-inflation", d:"Centre tread wear (tyre bulges in middle). Harsher ride. Better fuel economy. Risk of blowout on impact." },
              { t:"Under-inflation", d:"Both edge wear (tyre flattens). Overheating. Poor fuel economy. Higher risk of hydroplaning. Increased rolling resistance." },
              { t:"Correct pressure", d:"Even tread wear. Optimum fuel economy. Best handling and ride comfort. Maximum tyre life." },
              { t:"TPMS", d:"Tyre Pressure Monitoring System. Mandatory for new M1 vehicles. Warns driver when pressure drops >25% below spec." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function FuelSysSec() {
  return (
    <div>
      <STitle icon="⛽" title="FUEL SYSTEMS AND ENGINE MANAGEMENT" sub="MPFI, CRDI, GDI, carburettor — components and working" color={C.orange} />
      <Box style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>FUEL SYSTEM EVOLUTION — PETROL ENGINES</div>
        <div style={{ display:"grid", gap:12 }}>
          {[
            {
              era:"1. CARBURETTOR (Pre-BS4)", color:C.muted,
              desc:"Mechanical device using venturi effect to mix air and fuel. As air flows through narrow venturi, velocity increases and pressure drops, drawing fuel from float bowl. Simple but imprecise.",
              pros:"Simple, cheap, easy repair",
              cons:"Imprecise mixture, poor cold start, bad emissions, cannot meet BS4+. Banned for new cars in India.",
            },
            {
              era:"2. TBI — Throttle Body Injection (intermediate)", color:C.soft,
              desc:"Single injector mounted at throttle body. Like electronic carburettor. Better than carb but still imprecise. Rarely used in India.",
              pros:"Better than carburettor, simpler than MPFI",
              cons:"Single injection point, mixture distribution uneven between cylinders",
            },
            {
              era:"3. MPFI — Multi-Point Fuel Injection (BS3, BS4, BS6)", color:C.orange,
              desc:"One fuel injector per cylinder, mounted near intake valve. ECU controls injection timing and pulse width based on multiple sensors. Precise mixture for each cylinder.",
              pros:"Precise mixture per cylinder, good fuel economy, meets BS6, quick cold start",
              cons:"More complex than carb, requires clean fuel (injector fouling), more sensors",
            },
            {
              era:"4. GDI — Gasoline Direct Injection (BS6 premium)", color:C.yellow,
              desc:"Fuel injected DIRECTLY into combustion chamber (like diesel). Much higher pressure (100-200 bar vs 3-5 bar for MPFI). Enables stratified charge combustion. Better efficiency.",
              pros:"Higher efficiency (10-15% better than MPFI), lower emissions, more power from smaller engine",
              cons:"Higher cost, carbon buildup on intake valves (no fuel washing), PM emissions higher",
            },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"3px solid "+x.color }}>
                <div style={{ color:x.color, fontWeight:700, fontSize:13, marginBottom:6 }}>{x.era}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.7, marginBottom:8 }}>{x.desc}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div style={{ fontSize:11, color:C.green }}><span style={{ fontWeight:700 }}>PRO: </span>{x.pros}</div>
                  <div style={{ fontSize:11, color:C.red }}><span style={{ fontWeight:700 }}>CON: </span>{x.cons}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.violet }}>
        <div style={{ fontFamily:"monospace", color:C.violet, fontSize:11, letterSpacing:1, marginBottom:12 }}>MPFI SYSTEM COMPONENTS AND SENSORS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>FUEL DELIVERY COMPONENTS</div>
            {[
              { c:"In-tank fuel pump", d:"Electric pump inside fuel tank. Creates 3-5 bar pressure. Always on with ignition." },
              { c:"Fuel filter", d:"Fine mesh filter removes particles. Replace every 40,000-60,000 km." },
              { c:"Fuel rail", d:"Common manifold distributing fuel to all injectors at constant pressure." },
              { c:"Fuel pressure regulator", d:"Maintains constant rail pressure. Returns excess fuel to tank." },
              { c:"Fuel injectors", d:"Solenoid operated. ECU controls pulse width (duration open) = fuel quantity." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.c}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.orange, fontWeight:700, fontSize:13, marginBottom:10 }}>ENGINE MANAGEMENT SENSORS</div>
            {[
              { c:"MAF — Mass Air Flow sensor", d:"Measures actual mass of air entering engine. Hot wire type. Most critical for fuel calculation." },
              { c:"MAP — Manifold Absolute Pressure sensor", d:"Measures intake manifold pressure. Alternative to MAF in some systems." },
              { c:"TPS — Throttle Position Sensor", d:"Monitors throttle valve position. Determines driver demand." },
              { c:"CTS — Coolant Temperature Sensor", d:"Engine temperature. Cold start enrichment uses this." },
              { c:"O2/Lambda sensor", d:"Measures oxygen in exhaust. ECU adjusts mixture (closed loop control). Before and after catalyst." },
              { c:"CKP — Crankshaft Position sensor", d:"RPM and piston position. Critical for ignition and injection timing." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.orange, fontSize:12, fontWeight:700 }}>{x.c}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.red }}>
        <div style={{ fontFamily:"monospace", color:C.red, fontSize:11, letterSpacing:1, marginBottom:12 }}>CRDI DIESEL FUEL SYSTEM</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            {[
              { c:"Low pressure pump", d:"Draws fuel from tank to high pressure pump. Electric or mechanical." },
              { c:"High pressure pump", d:"Creates 1000-2500 bar pressure. Cam-driven. Heart of CRDI system." },
              { c:"Common rail (accumulator)", d:"High pressure fuel reservoir. Feeds all injectors simultaneously at constant pressure." },
              { c:"Rail pressure sensor", d:"Monitors rail pressure. ECU adjusts pump output to maintain target pressure." },
              { c:"Pressure relief valve", d:"Safety valve — releases fuel if pressure exceeds limit." },
              { c:"Electronically controlled injectors", d:"Solenoid or piezo-electric type. Inject precise quantity at precise timing per ECU command." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.red, fontSize:12, fontWeight:700 }}>{x.c}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>CRDI Multiple Injection Strategy</div>
            <div style={{ display:"grid", gap:8 }}>
              {[
                { n:"Pre-injection (Pilot)", c:C.teal, d:"Small amount injected before main injection. Reduces combustion noise and NOx. Makes diesel smoother." },
                { n:"Main injection", c:C.orange, d:"Primary fuel injection for power. Timed at optimal crank angle for best efficiency." },
                { n:"Post injection", c:C.violet, d:"Small injection after main. Adds heat to exhaust for DPF regeneration. Reduces soot." },
              ].map(function(x,i) { return <div key={i} style={{ padding:"10px 12px", background:C.bg, borderRadius:8, borderLeft:"3px solid "+x.c }}><div style={{ color:x.c, fontWeight:700, fontSize:12, marginBottom:4 }}>{x.n}</div><div style={{ color:C.soft, fontSize:11, lineHeight:1.5 }}>{x.d}</div></div>; })}
            </div>
            <div style={{ marginTop:12, padding:"10px 12px", background:C.yellow+"10", borderRadius:8, fontSize:12, color:C.text }}>BS6 CRDI engines can inject up to 7 times per combustion cycle using piezo-electric injectors (response time under 100 microseconds).</div>
          </div>
        </div>
      </Box>
    </div>
  );
}

function InspectionSec() {
  return (
    <div>
      <STitle icon="📋" title="VEHICLE FITNESS INSPECTION — ARTO GUIDE" sub="Complete checklist, vehicle categories, and standards as per CMVR" color={C.green} />
      <Box style={{ marginBottom:20, borderTop:"3px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>VEHICLE CATEGORIES UNDER AIS AND MV ACT</div>
        <DTable
          heads={["Category","Description","GVW / Capacity","Examples"]}
          cols={[C.soft, C.green, C.cyan, C.yellow, C.orange]}
          rows={[
            ["L1","Two-wheeler (moped)","Up to 50cc, below 45 km/h","Scooters below 50cc"],
            ["L2","Three-wheeler","Up to 50cc","Auto-rickshaw (small engine)"],
            ["L3","Motorcycle","Above 50cc, 2 wheels","All motorcycles, heavy bikes"],
            ["L5","Three-wheeler","Above 50cc","Auto-rickshaw, e-rickshaw"],
            ["M1","Passenger car","Up to 8 seats + driver","Car, SUV, MPV"],
            ["M2","Minibus","9+ seats, GVW ≤ 5 tonnes","School van, minibus"],
            ["M3","Bus / Coach","9+ seats, GVW > 5 tonnes","MSRTC bus, city bus, coach"],
            ["N1","Light commercial","GVW ≤ 3.5 tonnes","Tata Ace, Mahindra Bolero pickup"],
            ["N2","Medium commercial","3.5t < GVW ≤ 12 tonnes","Medium trucks"],
            ["N3","Heavy commercial","GVW > 12 tonnes","Heavy trucks, trailers"],
          ]}
          hi={[4,6,9]}
        />
      </Box>
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.cyan }}>
        <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:1, marginBottom:12 }}>COMPREHENSIVE FITNESS INSPECTION CHECKLIST</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            {
              cat:"BRAKES", color:C.red, icon:"🛑",
              items:["Service brake: pedal travel and firmness","Parking brake: holds on gradient","Brake force balance: no severe pulling","ABS warning light: OFF after self-test","Brake fluid: level and condition","Brake lines: no leaks, no corrosion","Pad/shoe thickness: above minimum","Disc/drum: no severe scoring or cracks"],
            },
            {
              cat:"STEERING", color:C.violet, icon:"🎯",
              items:["Free play in steering wheel (max 20-25mm)","No binding or excessive stiffness","Power steering fluid level","PS belt condition","Tie rod ends: no play","Ball joints: no play","Steering rack: no leaks","Wheel alignment: no obvious pull"],
            },
            {
              cat:"TYRES AND WHEELS", color:C.cyan, icon:"🛞",
              items:["Tread depth minimum 1.6mm","No exposed cord or fabric","No sidewall bulges or cuts","Correct size as per RC","Matching tyres on same axle","Tyre pressure correct","Rim condition: no cracks or bends","Wheel nuts: all present and tight"],
            },
            {
              cat:"LIGHTING", color:C.yellow, icon:"💡",
              items:["Headlights: both working, correct beam","High beam and low beam function","Brake lights: both working","Indicators: all four (flash rate correct)","Reverse light: working","Number plate light: working","Hazard lights: all four flash","Dashboard warning lights operational"],
            },
            {
              cat:"BODY AND STRUCTURE", color:C.orange, icon:"🏗️",
              items:["Body securely mounted on chassis","No sharp protruding edges","Windscreen: no cracks in driver view","All windows: safety glass confirmed","Wipers: front working","Horn: functional and audible","Fuel system: no leaks","Exhaust: secure, no leaks into cabin"],
            },
            {
              cat:"DOCUMENTS AND IDs", color:C.green, icon:"📄",
              items:["Registration Certificate (RC) valid","Insurance certificate valid","Permit valid (transport vehicles)","PUC certificate valid","VIN/chassis number matches RC","Engine number matches RC","Registration plate: correct and illuminated","Fitness certificate from previous period"],
            },
            {
              cat:"EMISSION SYSTEMS", color:C.teal, icon:"🌿",
              items:["OBD-II: no active fault codes (BS6)","MIL (Check Engine Light): OFF","AdBlue level adequate (BS6 diesel)","DPF: no blockage warning","Catalytic converter: present","PUC test result: within limits","Smoke: no visible excessive smoke","Fuel system: no vapour leak smell"],
            },
            {
              cat:"SAFETY EQUIPMENT", color:C.pink, icon:"🦺",
              items:["Fire extinguisher: present and charged (commercial vehicles)","First aid box: present (commercial vehicles)","Emergency triangles: present","Speed governor: fitted and sealed (commercial vehicles above 3.5t)","HMVL seat belts: all working","ABS: mandatory for M3 and N3","ESC: mandatory for M1 (new vehicles)","Reverse parking sensor/camera (certain categories)"],
            },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderTop:"2px solid "+x.color }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:10 }}>
                  <span style={{ fontSize:18 }}>{x.icon}</span>
                  <span style={{ color:x.color, fontWeight:700, fontSize:12, fontFamily:"monospace", letterSpacing:1 }}>{x.cat}</span>
                </div>
                {x.items.map(function(item,j) {
                  return <div key={j} style={{ fontSize:11, color:C.soft, padding:"3px 0", display:"flex", gap:6 }}><span style={{ color:x.color, flexShrink:0 }}>→</span>{item}</div>;
                })}
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>FITNESS CERTIFICATE — KEY RULES</div>
        <DTable
          heads={["Parameter","Rule"]}
          cols={[C.soft, C.yellow]}
          rows={[
            ["First CF for new transport vehicle","Valid for 2 years from date of first registration"],
            ["Subsequent CFs","Annual renewal (every year)"],
            ["Private vehicles (non-transport)","No separate CF required — fitness included in registration renewal"],
            ["Fee for CF","Prescribed by State Government"],
            ["Who issues CF","Inspecting Authority = ARTO / MVI / AMVI appointed under MV Act"],
            ["Legal basis","Section 56, MV Act 1988 + Central Motor Vehicles Rules 1989"],
            ["Refusal of CF","If vehicle fails inspection — owner must repair and re-present"],
            ["Appeal against refusal","Owner can appeal to Regional Transport Authority"],
            ["Penalty for no CF","Sec 192 MV Act — Rs 5,000 to 10,000 fine"],
            ["Vehicle with invalid CF","Cannot ply legally — offence under Sec 192 MV Act"],
          ]}
          hi={[0,5,8]}
        />
      </Box>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🛞", title:"Tyre Markings — Read Any Tyre Instantly", color:C.cyan,
      items:[
        "Format: WIDTH/ASPECT_RATIO CONSTRUCTION RIM_DIAMETER LOAD_INDEX SPEED_RATING",
        "Example: 205/65 R15 94H = 205mm wide, 65% aspect ratio, Radial, 15-inch rim, 670kg load, 210 km/h",
        "Aspect ratio: LOWER number = WIDER, FLATTER tyre (sporty). HIGHER = taller sidewall (comfortable).",
        "Speed ratings: S=180, T=190, H=210, V=240, W=270, Y=300 km/h. Memory: 'S T H V W Y increases by ~30'.",
        "ARTO exam: minimum tread depth = 1.6mm (CMVR Rule 96). Below = automatic fail.",
        "Exposed tyre cord = automatic fail regardless of tread depth.",
      ],
    },
    {
      icon:"🎯", title:"Steering Systems — Quick Identifier", color:C.violet,
      items:[
        "Rack and pinion = ALL modern passenger cars. Rotary to linear conversion. Most precise.",
        "Recirculating ball = Trucks, buses, old SUVs. More mechanical advantage, less feel.",
        "Electric PS (EPS) = All BS6 cars. No pump. Electric motor assists. Better fuel economy.",
        "Hydraulic PS = Older cars and heavy vehicles. Engine pump always running = parasitic loss.",
        "Ackermann principle: Inner wheel turns MORE than outer during cornering. Common turning centre.",
        "Steering free play: acceptable maximum = 20-25mm at wheel rim. More = inspection fail.",
      ],
    },
    {
      icon:"⛽", title:"Fuel Systems — Engine Types Summary", color:C.orange,
      items:[
        "Carburettor = pre-BS4 = banned for new vehicles. Venturi effect draws fuel.",
        "MPFI (Multi-Point Fuel Injection) = one injector per cylinder = BS4 and BS6 petrol. Rail pressure 3-5 bar.",
        "GDI (Gasoline Direct Injection) = fuel into combustion chamber = BS6 premium petrol. Rail pressure 100-200 bar.",
        "CRDI (Common Rail Direct Injection) = diesel = BS6. Common rail pressure 1000-2500 bar.",
        "Lambda/O2 sensor: Key sensor after catalytic converter. ECU uses it to maintain stoichiometric AFR (14.7:1).",
        "MAF sensor failure = engine cannot calculate correct fuel = rich or lean mixture = rough running.",
      ],
    },
    {
      icon:"📋", title:"ARTO Inspection — Must-Know Rules", color:C.green,
      items:[
        "CF (Certificate of Fitness) Section 56 MV Act. First: 2 years. Subsequent: annual.",
        "ARTO/AMVI/MVI = Inspecting Authority. This is YOUR primary job function as ARTO.",
        "Vehicle categories: M1 = car, M2 = minibus, M3 = bus. N1/N2/N3 = commercial by weight.",
        "AEB mandatory for M3 and N3 (heavy buses and trucks) in India.",
        "ESC (Electronic Stability Control) mandatory for all new M1 vehicles.",
        "TPMS (Tyre Pressure Monitoring) mandatory for all new M1 vehicles.",
        "Speed governor: mandatory for transport vehicles above 3.5 tonnes GVW. Must be sealed.",
        "ABS: mandatory for M3, N3, and most commercial vehicles. ABS warning light ON = FAIL.",
      ],
    },
    {
      icon:"🔧", title:"Most Repeated MPSC Questions — Automobile Engineering", color:C.yellow,
      items:[
        "Q: What does 65 in '205/65 R15' represent? → Aspect ratio (sidewall as % of width)",
        "Q: Minimum tyre tread depth under CMVR → 1.6 mm",
        "Q: Which steering converts rotary to linear? → Rack and pinion",
        "Q: Ackermann principle ensures → All wheels share common turning centre (inner wheel turns more)",
        "Q: CRDI rail pressure range → 1000-2500 bar",
        "Q: Static imbalance causes → Up-down hop. Dynamic imbalance causes → Wobble/shimmy",
        "Q: AEB mandatory for which vehicles → M3 (heavy buses) and N3 (heavy trucks)",
        "Q: First CF validity for new transport vehicle → 2 years",
        "Q: Who issues fitness certificate → ARTO/AMVI/MVI (Inspecting Authority, Sec 56 MV Act)",
        "Q: Hydroplaning begins at approximately → 80-100 km/h on wet road",
        "Q: MPFI fuel rail pressure → 3-5 bar (vs CRDI diesel 1000-2500 bar)",
        "Q: EPS advantage over hydraulic PS → No engine-driven pump = better fuel economy",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Automobile Engineering" color={C.yellow} />
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
  { id:"steering",   icon:"🎯", label:"Steering Systems" },
  { id:"tyres",      icon:"🛞", label:"Tyres and Wheels" },
  { id:"fuelsys",    icon:"⛽", label:"Fuel Systems" },
  { id:"inspection", icon:"📋", label:"Vehicle Fitness Inspection" },
  { id:"tricks",     icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("steering");
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
    if (sec==="steering") return <SteeringSec />;
    if (sec==="tyres") return <TyresSec />;
    if (sec==="fuelsys") return <FuelSysSec />;
    if (sec==="inspection") return <InspectionSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#1E1830;border-radius:3px}"].join("")}</style>

      <div style={{ background:"#050408", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🚗</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>AUTOMOBILE ENGINEERING</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 8 of 12 · Steering · Tyres · Fuel Systems · Vehicle Inspection · ADAS</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="7% WEIGHTAGE" color={C.violet} />
              <Tag label="8/10 YEARS" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.violet:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.violet:"transparent"),
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
                    background:sec===s.id?C.violet+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.violet+"50":"transparent"),
                    color:sec===s.id?C.violet:C.soft,
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
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.violet}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>
            {done ? (
              <Box glow={C.violet} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.violet }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏆":sc.c>=7?"🚗":"🔧"}</div>
                <div style={{ fontSize:26, color:C.violet, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"AUTO EXPERT!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Excellent! Ready for Topic 9.":sc.c>=7?"Good. Review tyre markings and fitness inspection checklist.":"Revise steering types, tyre ratings, and ARTO inspection procedures."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.violet, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("tricks"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.violet, background:"transparent", color:C.violet, fontWeight:700, cursor:"pointer", fontSize:14 }}>SEE TIPS</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.cyan} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.yellow:q.level==="HARD"?C.orange:C.violet} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.violet, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.violet, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
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