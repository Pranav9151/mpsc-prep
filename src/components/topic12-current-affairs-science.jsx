import { useState } from "react";

var C = {
  bg:"#07060A", card:"#100E18", border:"#1E1C2E",
  indigo:"#4F46E5", violet:"#7C3AED", cyan:"#06B6D4",
  green:"#16A34A", red:"#DC2626", yellow:"#EAB308",
  orange:"#F97316", teal:"#0D9488", pink:"#DB2777",
  text:"#EEE8FF", muted:"#28243A", soft:"#7870A0",
};

function Tag(props) {
  var c = props.color || C.indigo;
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
  var c = props.color || C.indigo;
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
  var cols = props.cols || [C.soft, C.indigo, C.cyan, C.green, C.yellow];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#06050E" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.indigo+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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

// ── MENTAL ABILITY QUESTIONS (interactive quiz) ──
var maQuestions = [
  {
    id:1, type:"Series", level:"EASY",
    q:"Find the next number in the series: 2, 6, 18, 54, ___",
    opts:["108","162","216","324"],
    ans:1,
    exp:"Pattern: Each term is multiplied by 3.\n2 × 3 = 6 → 6 × 3 = 18 → 18 × 3 = 54 → 54 × 3 = 162\nAnswer: 162",
    tip:"For series: check differences first, then ratios. If ratio is constant = geometric series. If difference constant = arithmetic series. Here ratio = 3 (geometric, ×3 each time).",
  },
  {
    id:2, type:"Analogy", level:"EASY",
    q:"Engine : Car :: Propeller : ___",
    opts:["Road","Aircraft","Fuel","Wheel"],
    ans:1,
    exp:"Engine is the power source for a Car.\nPropeller is the power/thrust source for an Aircraft.\nThe relationship is: POWER SOURCE : VEHICLE",
    tip:"Analogy = relationship between two words. Find the relationship: 'X is to Y as A is to B'. Engine POWERS a car. Propeller PROPELS an aircraft. Same functional relationship.",
  },
  {
    id:3, type:"Coding-Decoding", level:"MEDIUM",
    q:"If BRAKE is coded as CSBLF, how is CLUTCH coded?",
    opts:["DMVUDI","DMUTDI","DMVTDI","DLUTCH"],
    ans:0,
    exp:"Pattern: Each letter is shifted +1 position in alphabet.\nB→C, R→S, A→B, K→L, E→F = CSBLF ✓\n\nNow apply to CLUTCH:\nC→D, L→M, U→V, T→U, C→D, H→I = DMVUDI\nAnswer: DMVUDI",
    tip:"For coding: always check shift value first. Write out alphabet A=1, B=2... Check each letter: B(2)→C(3) = +1 shift. Apply same shift to all letters of new word. Simple +1 shift is most common pattern in MPSC.",
  },
  {
    id:4, type:"Reasoning", level:"MEDIUM",
    q:"All vehicles have engines. All cars are vehicles. Which conclusion is definitely true?",
    opts:["All cars have engines","Some vehicles are cars","All engines are in cars","Some engines have vehicles"],
    ans:0,
    exp:"Syllogism logic:\nPremise 1: All vehicles have engines.\nPremise 2: All cars are vehicles.\n\nConclusion: All cars are vehicles (P2) AND all vehicles have engines (P1)\nTherefore: All cars have engines. (Valid deductive conclusion)\n\n'Some vehicles are cars' is also true but less definitive.\n'All engines are in cars' is INVALID (engines in planes, bikes too).\n'Some engines have vehicles' is grammatically odd and logically incorrect.",
    tip:"Syllogism: if A→B and B→C then A→C (transitive property). All cars are vehicles (A→B). All vehicles have engines (B→C). Therefore: all cars have engines (A→C). Draw Venn diagrams mentally — cars circle inside vehicles circle inside engines circle.",
  },
  {
    id:5, type:"Series", level:"MEDIUM",
    q:"Find the missing number: 1, 4, 9, 16, 25, ___, 49",
    opts:["30","36","40","45"],
    ans:1,
    exp:"Pattern: Perfect squares (n²)\n1=1², 4=2², 9=3², 16=4², 25=5², ___=6², 49=7²\n6² = 36\nAnswer: 36",
    tip:"Perfect squares series: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Memorise squares up to 15². Other common series: cubes (1,8,27,64,125), Fibonacci (1,1,2,3,5,8,13,21), primes (2,3,5,7,11,13).",
  },
  {
    id:6, type:"Direction Sense", level:"MEDIUM",
    q:"Ramesh starts from point A, walks 5 km North, then turns East and walks 3 km, then turns South and walks 5 km. How far and in which direction is he from point A?",
    opts:["8 km East","3 km East","5 km North-East","3 km West"],
    ans:1,
    exp:"Trace the path:\nStart: Point A (0,0)\nMove North 5 km: Now at (0,5)\nMove East 3 km: Now at (3,5)\nMove South 5 km: Now at (3,0)\n\nFrom A(0,0) to final position (3,0):\nDisplacement = 3 km in EAST direction\n\nThe North and South journeys cancel out (5 km N then 5 km S = back to original North-South position). Only the 3 km East remains.",
    tip:"Direction questions: Draw a rough grid. North = up, South = down, East = right, West = left. Track x (East-West) and y (North-South) positions separately. Final position − Start position = displacement. North and South cancel. East and West cancel.",
  },
  {
    id:7, type:"Data Interpretation", level:"HARD",
    q:"In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. How many students play NEITHER sport?",
    opts:["5","15","10","20"],
    ans:0,
    exp:"Using Set theory (Venn diagram):\nStudents who play cricket OR football (or both):\nn(C ∪ F) = n(C) + n(F) − n(C ∩ F)\n= 30 + 25 − 10\n= 45\n\nStudents who play NEITHER:\n= Total − n(C ∪ F)\n= 50 − 45\n= 5\n\nVenn diagram: Cricket only = 30−10 = 20. Football only = 25−10 = 15. Both = 10. Neither = 50−20−15−10 = 5.",
    tip:"Set theory formula: n(A∪B) = n(A) + n(B) − n(A∩B). Neither = Total − n(A∪B). Always draw Venn diagram: Left circle only, Right circle only, Overlap, Outside. This formula appears in almost every MPSC mental ability paper.",
  },
  {
    id:8, type:"Analogy", level:"HARD",
    q:"Odometer : Distance :: Hygrometer : ___",
    opts:["Temperature","Humidity","Pressure","Altitude"],
    ans:1,
    exp:"Odometer measures DISTANCE (mileage of a vehicle).\nHygrometer measures HUMIDITY (moisture content of air).\n\nThe relationship: [Instrument] measures [Quantity]\n\nOther instrument-measurement pairs:\n- Thermometer: Temperature\n- Barometer: Atmospheric pressure\n- Altimeter: Altitude\n- Ammeter: Electric current\n- Anemometer: Wind speed\n- Tachometer: RPM (rotational speed)\n- Speedometer: Vehicle speed",
    tip:"Instrument-measurement pairs for MPSC: Odometer=distance, Tachometer=RPM, Speedometer=speed, Barometer=pressure, Hygrometer=humidity, Anemometer=wind speed, Altimeter=altitude. Vehicle-specific: Odometer (total distance), Speedometer (current speed), Tachometer (engine RPM) — all important for ARTO context.",
  },
];

// ── GENERAL SCIENCE CONTENT ──
var scienceTopics = [
  {
    name:"Physics — Motion and Force", col:C.cyan, icon:"⚡",
    facts:[
      { t:"Newton's Laws of Motion", d:"1st: Inertia — object at rest stays at rest. 2nd: F=ma (force=mass×acceleration). 3rd: Every action has equal and opposite reaction." },
      { t:"Velocity and Acceleration", d:"Velocity = displacement/time (vector). Speed = distance/time (scalar). Acceleration = change in velocity/time." },
      { t:"Momentum", d:"Momentum p = m×v. Conservation of momentum: total momentum before = total momentum after collision (no external force)." },
      { t:"Kinetic Energy", d:"KE = ½mv². Vehicle at 60 km/h vs 120 km/h: KE at double speed is 4× (square relationship — same as braking distance)." },
      { t:"Work and Power", d:"Work = Force × distance (W = F×d). Power = Work/Time = F×v. 1 HP = 746 Watts. Engine power in kW or HP." },
      { t:"Friction", d:"Static friction > Kinetic (sliding) friction. Coefficient of friction μ = F_friction/Normal force. ABS prevents tyre sliding to maintain rolling friction." },
    ],
  },
  {
    name:"Chemistry — Fuels and Materials", col:C.orange, icon:"🧪",
    facts:[
      { t:"Octane Number", d:"Measure of petrol's resistance to knock (auto-ignition). Higher = better. Regular: RON 91. Premium: RON 95-97. India BS6 petrol: RON 91 minimum." },
      { t:"Cetane Number", d:"Measure of diesel's ignition quality. Higher = shorter ignition delay = smoother combustion. India BS6 diesel: minimum CN 48-51." },
      { t:"Combustion", d:"Complete combustion: fuel + O2 → CO2 + H2O. Incomplete combustion: produces CO (toxic) and soot (PM) when insufficient oxygen." },
      { t:"Battery chemistry", d:"Lead-acid: Pb + H2SO4. Lead-acid used in starter batteries. Lithium-ion (LiCoO2) used in EV batteries. Voltage: Lead-acid 2V/cell, Li-ion 3.7V/cell." },
      { t:"Catalytic converter materials", d:"Platinum (Pt), Palladium (Pd), Rhodium (Rh) — precious metals. TWC uses all three. Pt and Pd oxidise CO and HC. Rh reduces NOx." },
      { t:"Lubricating oil grades", d:"SAE grades: 5W-30 means 5W (winter viscosity at cold start), 30 (hot viscosity at 100°C). Lower W number = better cold start. Multigrade oils work in all seasons." },
    ],
  },
  {
    name:"Biology and Environment", col:C.green, icon:"🌿",
    facts:[
      { t:"Air pollution health effects", d:"CO: binds haemoglobin, reduces oxygen carrying capacity — toxic. NOx + HC: form ground-level ozone — respiratory irritant. PM2.5: penetrates deep into lungs — cardiovascular disease." },
      { t:"Greenhouse gases", d:"CO2, CH4 (methane), N2O, HFCs, SF6. Vehicles emit CO2 (from fuel combustion) and HFCs (from AC refrigerant leaks). CO2 causes global warming." },
      { t:"Noise pollution from vehicles", d:"Measured in decibels (dB). Legal limits: cars 74-77 dB, trucks 80-86 dB. Horn limit: 93-112 dB. Silencers reduce exhaust noise. Vibration also contributes." },
      { t:"Wildlife corridors and roads", d:"Highways fragment wildlife habitats. Animal underpasses and overpasses required. Tadoba, Melghat tigers affected by NH routes in Maharashtra." },
      { t:"Electric vehicle environmental benefit", d:"Zero tailpipe emissions. But upstream emissions from electricity generation must be considered. If electricity from coal: overall emissions may be similar to efficient ICE." },
    ],
  },
  {
    name:"Technology and Computer Science", col:C.violet, icon:"💻",
    facts:[
      { t:"Artificial Intelligence in vehicles", d:"ADAS uses ML/AI: object detection (pedestrians, vehicles), lane keeping, autonomous emergency braking. LiDAR, cameras, radar are sensors." },
      { t:"GPS and Navigation", d:"GPS = Global Positioning System (US). NAVIC = India's own navigation system (NavIC). 7 satellites. Accuracy: 5m civilian, better for military. Used in fleet tracking." },
      { t:"V2X Communication", d:"Vehicle-to-Everything: V2V (vehicle to vehicle), V2I (vehicle to infrastructure — traffic lights), V2P (vehicle to pedestrian). 5G enables low latency V2X." },
      { t:"RFID in transport", d:"FASTag uses RFID. Also used for: container tracking, vehicle access control, toll collection, inventory in workshops." },
      { t:"Blockchain in transport", d:"Immutable records for: vehicle history (accident, service), driving licence authenticity, permit records. Pilot projects in some Indian states." },
      { t:"OBD and diagnostic tech", d:"OBD-II: standardised diagnostic port (16-pin DLC). ELM327 adapters allow smartphone diagnostics. Live data: RPM, speed, temp, O2 sensor, fuel trim." },
    ],
  },
];

// ── CURRENT AFFAIRS DATA ──
var currentAffairs = [
  { cat:"Transport and Auto Policy", col:C.indigo, items:[
    "BS6 Phase 2 (Real Driving Emissions — RDE) implementation ongoing for tighter real-world compliance",
    "FAME-III policy being planned to continue EV subsidy after FAME-II",
    "PM e-Bus Sewa: 10,000 electric buses for public transport in cities under central scheme",
    "India's New Vehicle Scrappage Policy: vehicles 15+ years (private), 8+ years (commercial) must undergo fitness test; incentives for scrapping old vehicles",
    "AIS (Automotive Industry Standards) 197: Mandatory ABS for two-wheelers above 125cc from 2023",
    "CMVR amendments for autonomous vehicle testing — sandbox framework",
    "National Logistics Policy 2022: reduce logistics cost from 14% to 8% of GDP",
    "GPS tracking mandatory for all commercial vehicles (transport) — real-time tracking with SOS button",
  ]},
  { cat:"Maharashtra Specific", col:C.violet, items:[
    "Samruddhi Mahamarg (Hindu Hrudaysamrat Balasaheb Thackeray Maharashtra Samruddhi Mahamarg): 701 km expressway from Nagpur to Mumbai, fully operational",
    "Mumbai-Pune Expressway: first access-controlled expressway in India (2002), 6-lane, 94.5 km",
    "Pune Ring Road: being developed to decongest city centre",
    "Mumbai Coastal Road: North-South corridor under construction (reclaimed land)",
    "Atal Setu (Nhava Sheva Sea Link): Mumbai Trans-Harbour Link — 21.8 km, longest sea bridge in India (opened 2024)",
    "MSRTC electric bus fleet: procuring Olectra, Tata, and other electric buses under FAME-II",
    "Metro expansion: Mumbai, Pune, Nagpur, Nashik metro projects at various stages",
    "Maharashtra EV Policy 2021: target 10% EV share by 2025, subsidies for EV purchase",
  ]},
  { cat:"Science and Technology", col:C.cyan, items:[
    "India's NAVIC (Navigation with Indian Constellation): 7-satellite Indian GPS. Mandatory in smartphones sold in India from April 2023",
    "5G rollout in India: Jio and Airtel launched 5G. Key enabler for V2X, connected vehicles, smart traffic management",
    "Hydrogen fuel cell vehicle testing: NTPC and IOCL testing hydrogen buses on Delhi routes",
    "Solid-state batteries: next generation EV batteries. Higher energy density, faster charging, safer. Expected commercial availability 2027-2030",
    "India Semiconductor Mission: Building chip manufacturing capacity in India. Reduces import dependence for automotive ECUs",
    "Digital Twin technology in manufacturing: Virtual replica of factory/vehicle for design and testing before physical production",
    "AI-based traffic management: Bengaluru, Mumbai, Delhi piloting AI-controlled traffic signals that adapt to real-time congestion",
    "Bharat NCAP (New Car Assessment Programme): India's own crash testing for cars launched 2023. Tests frontal, side, pole impacts",
  ]},
  { cat:"India and World — General", col:C.green, items:[
    "India overtakes China as world's most populous country (2023): 1.44 billion people",
    "India's GDP: 5th largest economy globally (approximately $3.7 trillion nominal GDP 2023). Target: 3rd largest by 2027-28",
    "G20 Presidency 2023: India held G20 Presidency. Theme: 'Vasudhaiva Kutumbakam' (One Earth, One Family, One Future). Summit in New Delhi.",
    "Chandrayaan-3: India landed on Moon's South Pole (August 23, 2023). ISRO. First country to land near south pole. Vikram lander, Pragyan rover.",
    "India's UPI: Unified Payments Interface — world's largest real-time payment system. Extended to France, Singapore, UAE. 10+ billion transactions/month.",
    "India's solar capacity: ~72 GW installed (2023). Target 500 GW renewable by 2030. World's 4th largest solar capacity.",
    "Digital India: Aadhaar — 1.3 billion enrolled. DigiLocker — RC and DL stored digitally (legally valid). CoWIN vaccine platform.",
    "National Cyber Security Policy: Protecting critical infrastructure including transport networks from cyber attacks.",
  ]},
];

// ── PRACTICE QUESTIONS ──
var QS = [
  {
    id:1, level:"BASIC", topic:"Current Affairs",
    q:"The Samruddhi Mahamarg (Maharashtra Samruddhi Mahamarg) is an expressway connecting which two cities?",
    opts:["Mumbai and Pune","Nagpur and Mumbai","Aurangabad and Pune","Nashik and Mumbai"],
    ans:1,
    exp:"Samruddhi Mahamarg (officially: Hindu Hrudaysamrat Balasaheb Thackeray Maharashtra Samruddhi Mahamarg) connects NAGPUR to MUMBAI.\n\nKey facts:\n- Length: 701 km (India's longest 6-lane expressway on completion)\n- Also called: Nagpur-Mumbai Super Communication Expressway\n- Passes through: Vidarbha, Marathwada, North Maharashtra\n- Design speed: 150 km/h (maximum permitted: 120 km/h)\n- Reduces travel time: Nagpur to Mumbai from 16 hours to 8 hours\n- Fully operational by 2023\n- Developed by MSRDC (Maharashtra State Road Development Corporation)",
    tip:"Samruddhi Mahamarg = Nagpur to Mumbai = 701 km = longest expressway in Maharashtra. Reduces Nagpur-Mumbai journey from 16 to 8 hours. Compare: Mumbai-Pune Expressway = India's first access-controlled expressway (2002) = 94.5 km. Atal Setu = Mumbai Trans-Harbour Link = 21.8 km sea bridge (2024).",
  },
  {
    id:2, level:"BASIC", topic:"General Science",
    q:"A vehicle engine produces 50 kW of power and applies a force of 2,000 N to propel the vehicle. What is the vehicle's speed?",
    opts:["25 m/s","100 m/s","25 km/h","40 km/h"],
    ans:0,
    exp:"Power formula: P = F × v\nWhere: P = Power (Watts), F = Force (Newtons), v = Velocity (m/s)\n\nRearranging: v = P / F\nv = 50,000 W / 2,000 N = 25 m/s\n\nConvert to km/h: 25 × 3.6 = 90 km/h\n\nSo the vehicle travels at 25 m/s = 90 km/h\n\nThis is a direct application of the power = force × velocity formula, which is fundamental to vehicle performance calculations.",
    tip:"P = F × v. Always use Watts for P, Newtons for F, m/s for v. Convert km/h to m/s: divide by 3.6. Convert m/s to km/h: multiply by 3.6. Engine power and tractive force are directly related through vehicle speed. This formula connects engine output to real-world performance.",
  },
  {
    id:3, level:"BASIC", topic:"Mental Ability",
    q:"Find the odd one out: Petrol, Diesel, CNG, Biodiesel, Electricity, Steel",
    opts:["Petrol","Biodiesel","Electricity","Steel"],
    ans:3,
    exp:"All of Petrol, Diesel, CNG, Biodiesel, and Electricity are vehicle FUELS or energy sources.\nSteel is a MATERIAL (metal) — not a fuel or energy source.\n\nSteel is the odd one out because it does not fit the category of 'energy sources for vehicles'.\n\nClassification:\n- Fossil fuels: Petrol, Diesel\n- Gaseous fuel: CNG\n- Biofuel: Biodiesel\n- Energy carrier: Electricity (not a fuel itself but energy for EVs)\n- Material: Steel ← ODD ONE OUT",
    tip:"Odd one out: find the category that 4 items belong to, then identify which one doesn't fit. Here: fuels and energy sources vs material. Always check 2-3 possible groupings before deciding. Common MPSC patterns: metals, fuels, vehicles, countries, rivers, etc.",
  },
  {
    id:4, level:"MEDIUM", topic:"Current Affairs",
    q:"India's Chandrayaan-3 mission made history in August 2023 by being the first country to successfully land a spacecraft near the Moon's:",
    opts:["North Pole","South Pole","Equatorial region","Far side (dark side)"],
    ans:1,
    exp:"Chandrayaan-3: ISRO's lunar mission.\n\nLanding: August 23, 2023 (India's Space Day — now declared National Space Day)\nLanding location: Moon's SOUTH POLE region — first country to successfully land near lunar south pole\nLander name: Vikram\nRover name: Pragyan\n\nWhy South Pole is significant:\n- Permanently shadowed craters may contain water ice (crucial for future Moon base)\n- Never explored before by any lander\n- Previous attempts: Russia's Luna-25 crashed (August 2023), just days before Chandrayaan-3 success\n\nChandrayaan-3 objectives:\n- Demonstrate safe and soft landing on Moon\n- Demonstrate rover mobility\n- Conduct in-situ scientific experiments (soil composition, temperature)\n\nPrevious missions: Chandrayaan-1 (2008, orbiter), Chandrayaan-2 (2019, lander Vikram crashed near south pole)",
    tip:"Chandrayaan-3 = first landing near Moon's SOUTH POLE = August 23, 2023 = India's National Space Day. ISRO achievement. Vikram lander + Pragyan rover. South pole significant for water ice. India is 4th country to land on Moon (USA, USSR, China, India). Previous Chandrayaan-2 lander crashed in 2019.",
  },
  {
    id:5, level:"MEDIUM", topic:"General Science",
    q:"Which of the following correctly states Newton's Third Law of Motion and its application to vehicles?",
    opts:[
      "An object at rest stays at rest — explains why vehicles need brakes",
      "For every action there is an equal and opposite reaction — explains how tyre pushes back on road to propel vehicle",
      "Force equals mass times acceleration — explains fuel consumption",
      "Objects fall at the same rate regardless of mass — explains wheel balance",
    ],
    ans:1,
    exp:"Newton's Third Law: For every action, there is an equal and opposite REACTION.\n\nVehicle application:\n- Tyre pushes BACKWARD on road (action force)\n- Road pushes FORWARD on tyre (reaction force)\n- This reaction force propels the vehicle forward!\n\nThis is how all wheeled vehicles (and rockets!) move:\n- Rocket: exhaust gases pushed backward → rocket pushed forward\n- Car: tyre pushes road backward → road pushes car forward\n- Without friction (ice): tyre spins but no reaction force → no forward motion\n\nThis also explains why vehicles get stuck in mud (low friction = poor reaction force) and why tyres need adequate grip (traction = reaction force from road).\n\nOther Newton's Law vehicle applications:\n1st Law: Seat belt necessity — body continues forward when car stops suddenly\n2nd Law: Heavier vehicle needs more force to accelerate (F=ma) — engine power requirements",
    tip:"Newton's 3rd Law (Action-Reaction) explains vehicle propulsion. Tyre pushes road back → road pushes tyre forward. Also explains: rocket propulsion, boat paddle, walking. 1st Law (Inertia) → why seatbelts needed. 2nd Law (F=ma) → why heavier trucks need more powerful engines.",
  },
  {
    id:6, level:"MEDIUM", topic:"Mental Ability",
    q:"A vehicle travels 60 km in the first hour and 40 km in the second hour. What is the average speed for the entire journey?",
    opts:["50 km/h","48 km/h","45 km/h","52 km/h"],
    ans:0,
    exp:"Average speed = Total distance / Total time\n\nTotal distance = 60 + 40 = 100 km\nTotal time = 1 + 1 = 2 hours\n\nAverage speed = 100 / 2 = 50 km/h\n\nNote: When time for each part is EQUAL, average speed = arithmetic mean of speeds.\nAverage = (60 + 40) / 2 = 50 km/h ✓\n\nBut if DISTANCE were equal (not time):\nAverage speed = 2 × s1 × s2 / (s1 + s2) [Harmonic mean formula]\nThis would give: 2 × 60 × 40 / (60 + 40) = 4800/100 = 48 km/h\n\nCommon trap: When equal TIME → arithmetic mean. When equal DISTANCE → harmonic mean.",
    tip:"Average speed = Total distance / Total time. TRAP: Average of 60 and 40 km/h is NOT always 50! If equal time intervals → arithmetic mean (50). If equal distance intervals → harmonic mean (48). Always use: avg speed = total distance / total time. This trap appears in MPSC very commonly.",
  },
  {
    id:7, level:"HARD", topic:"Current Affairs",
    q:"The Bharat NCAP (New Car Assessment Programme) launched in 2023 tests vehicles for safety under which body?",
    opts:["Insurance Regulatory and Development Authority (IRDAI)","Ministry of Road Transport and Highways (MoRTH) through GARC/AIS","National Highways Authority of India (NHAI)","Bureau of Indian Standards (BIS)"],
    ans:1,
    exp:"Bharat NCAP (New Car Assessment Programme):\n\nLaunched: October 2023 by Ministry of Road Transport and Highways (MoRTH)\n\nPurpose: India's own crash test programme — similar to Euro NCAP (Europe), ANCAP (Australia), ASEAN NCAP.\n\nTesting: Conducted at GARC (Global Automotive Research Centre) in Chennai, and other authorised facilities.\n\nStandard: Based on AIS (Automotive Industry Standard) — AIS 197.\n\nTests conducted:\n1. Frontal Offset Deformable Barrier (ODB) test at 64 km/h\n2. Side Movable Deformable Barrier (MDB) test\n3. Pole Side Impact test\n4. Pedestrian protection test\n\nRating: 1 to 5 stars for Adult Occupant Protection (AOP) and Child Occupant Protection (COP).\n\nVoluntary initially: Manufacturers can voluntarily submit vehicles. Government may make it mandatory.\n\nFirst results: Tata Punch scored 5 stars, several vehicles scored 0 stars — exposed safety gaps in Indian market.",
    tip:"Bharat NCAP = India's crash test programme = MoRTH = launched 2023. Tests at GARC Chennai. 5-star system for AOP (Adult) and COP (Child). Tata Punch scored 5 stars. AIS 197 is the Indian standard. Frontal + Side + Pole impact tests. Voluntary but important for buyer awareness.",
  },
  {
    id:8, level:"HARD", topic:"Mental Ability",
    q:"If 6 workers can complete a road repair job in 10 days, how many days will 10 workers take to complete the same job (assuming uniform productivity)?",
    opts:["4 days","6 days","8 days","15 days"],
    ans:1,
    exp:"Work formula: Workers × Days = Total Work (constant)\n\nTotal work = 6 workers × 10 days = 60 worker-days\n\nWith 10 workers:\nDays = Total work / Workers = 60 / 10 = 6 days\n\nInverse proportion: More workers → fewer days\nIf workers double (6→12): days halve (10→5)\nIf workers increase 1.67× (6→10): days decrease to 10/1.67 = 6 days\n\nVerify: 10 workers × 6 days = 60 worker-days = 6 workers × 10 days ✓",
    tip:"Work = Workers × Days = constant (for same job). More workers = fewer days (inverse relationship). Formula: W1 × D1 = W2 × D2. Road work example: 'If 5 labourers dig trench in 12 days, 10 labourers take 6 days.' This type appears in almost every MPSC mental ability section.",
  },
  {
    id:9, level:"HARD", topic:"General Science",
    q:"In a lead-acid battery (as used in vehicle starter batteries), what chemical reaction occurs at the NEGATIVE PLATE (anode) during DISCHARGE?",
    opts:[
      "Lead dioxide (PbO2) reacts with H2SO4",
      "Lead (Pb) reacts with H2SO4 to form lead sulphate (PbSO4) and releases electrons",
      "Hydrogen gas is released",
      "Oxygen combines with lead to form PbO",
    ],
    ans:1,
    exp:"Lead-acid battery reactions during DISCHARGE:\n\nNEGATIVE PLATE (Anode — oxidation):\nPb + H2SO4 → PbSO4 + 2H+ + 2e−\n(Lead reacts with sulphuric acid → lead sulphate + protons + electrons)\n\nPOSITIVE PLATE (Cathode — reduction):\nPbO2 + H2SO4 + 2H+ + 2e− → PbSO4 + 2H2O\n(Lead dioxide reacts → lead sulphate + water)\n\nOVERALL DISCHARGE reaction:\nPb + PbO2 + 2H2SO4 → 2PbSO4 + 2H2O\n\nDuring charging: Reaction reverses. PbSO4 → Pb (negative) and PbO2 (positive). H2SO4 is regenerated.\n\nSG (Specific Gravity) of electrolyte: Fully charged = 1.26-1.30. Discharged = 1.10-1.15. Low SG → needs charging or sulphation has occurred.\n\nCell voltage: 2V per cell. 12V battery = 6 cells in series.",
    tip:"Lead-acid battery: Pb (negative) + PbO2 (positive) + H2SO4 (electrolyte). During discharge: both plates become PbSO4. During charging: reverses. SG check: 1.26-1.30 (full), 1.10-1.15 (discharged). 12V battery = 6 cells × 2V each. Distilled water added when SG is low (water is consumed in overcharging).",
  },
  {
    id:10, level:"HARD", topic:"Mental Ability",
    q:"A clock shows 3:15. What is the angle between the hour hand and minute hand?",
    opts:["0°","7.5°","15°","22.5°"],
    ans:1,
    exp:"At 3:15:\n\nMinute hand position: 15 minutes = 15 × 6° = 90° from 12 (at the 3)\n\nHour hand position: Hour hand moves 0.5° per minute.\nAt 3:00, hour hand is at 90° (3 × 30°)\nIn 15 minutes, hour hand moves: 15 × 0.5° = 7.5°\nHour hand at 3:15: 90° + 7.5° = 97.5° from 12\n\nAngle between hands = 97.5° − 90° = 7.5°\n\nThe hands are very close — only 7.5° apart at 3:15.\n\nFormula: Angle = |30H − 5.5M| where H=hours, M=minutes\nAngle = |30(3) − 5.5(15)| = |90 − 82.5| = 7.5°",
    tip:"Clock angle formula: Angle = |30H − 5.5M| where H = hours (use 3 for 3 o'clock) and M = minutes. At 3:15: |30×3 − 5.5×15| = |90 − 82.5| = 7.5°. Memorise this formula — saves time in exam. Hour hand moves 0.5°/min. Minute hand moves 6°/min.",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Current Affairs",
    q:"The Atal Setu (officially Mumbai Trans-Harbour Link) opened in January 2024. What is its significance?",
    opts:[
      "First tunnel under the Arabian Sea",
      "India's longest sea bridge at 21.8 km connecting Mumbai to Navi Mumbai",
      "India's first cable-stayed bridge in Maharashtra",
      "World's longest bridge at 50 km length",
    ],
    ans:1,
    exp:"Atal Setu (Mumbai Trans-Harbour Link — MTHL):\n\nOpened: January 12, 2024 (inaugurated by PM Narendra Modi)\nOfficial name: Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu\nLength: 21.8 km — INDIA'S LONGEST SEA BRIDGE\nConnects: Sewri (Mumbai) to Nhava Sheva (Navi Mumbai)\n\nKey facts:\n- 6-lane (3 lanes each direction) with emergency lanes\n- Reduces travel time: Mumbai to Navi Mumbai from 1-2 hours to 20-30 minutes\n- Emergency stop bays every 500 metres\n- Speed limit: 100 km/h\n- FASTag mandatory for toll collection\n- Built by MMRDA (Mumbai Metropolitan Region Development Authority)\n- Investment: Rs 17,840 crore\n- Foundation piles: 177 metres deep (world record for sea bridge)\n- Smart bridge with sensors monitoring vibration, temperature, traffic\n\nSignificance for Mumbai: Decongests Bandra-Worli Sea Link. Improves connectivity between Mumbai and Navi Mumbai/JNPT port.",
    tip:"Atal Setu = 21.8 km = India's LONGEST SEA BRIDGE (not world's longest). Sewri to Nhava Sheva. Opened January 2024. 6-lane. Reduces Mumbai to Navi Mumbai from 2 hours to 20 minutes. FASTag mandatory. MMRDA built it. Important Maharashtra current affairs for 2025-26 exams.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Mixed",
    q:"Which of the following correctly pairs an automotive technology with its primary function?",
    opts:[
      "LIDAR → measures engine temperature",
      "NAVIC → India's satellite navigation system (GPS equivalent)",
      "OBD-II → controls fuel injection pressure",
      "RFID → measures vehicle speed",
    ],
    ans:1,
    exp:"NAVIC (Navigation with Indian Constellation): India's indigenous satellite navigation system.\n- 7 satellites (3 geostationary + 4 geosynchronous)\n- Coverage: India and 1,500 km around India\n- Accuracy: 5 metres for standard service\n- Mandatory in smartphones sold in India from April 2023\n- Used in: vehicle tracking, fleet management, marine navigation, agriculture\n\nOther technologies corrected:\n- LIDAR (Light Detection and Ranging): Laser-based 3D mapping sensor used in autonomous/ADAS vehicles. NOT for temperature.\n- OBD-II: Diagnoses emission-related faults and monitors all engine/vehicle systems. Does NOT control fuel injection pressure (that's the ECU).\n- RFID: Identifies objects via radio waves (FASTag). Does NOT measure speed (that's radar or speed camera).\n\nQuick technology reference:\nLiDAR = 3D sensing for autonomous vehicles\nNAVIC = Indian satellite navigation\nOBD-II = vehicle diagnostics\nRFID = identification via radio (FASTag)\nRadar = speed measurement and adaptive cruise control",
    tip:"NAVIC = India's GPS (7 satellites). Mandatory in smartphones from 2023. OBD-II = diagnostics (not control). LiDAR = 3D laser sensing for autonomous vehicles (not temperature). RFID = identification/tracking (not speed measurement). Technology acronyms are commonly tested in current affairs + general science questions.",
  },
];

// ── COMPONENTS ──

function CurrentAffairsSec() {
  var [cat, setCat] = useState(0);
  var c = currentAffairs[cat];
  return (
    <div>
      <STitle icon="📰" title="CURRENT AFFAIRS 2024-2025" sub="Transport, Maharashtra, Science and Technology, India and World" color={C.indigo} />
      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.yellow, background:C.yellow+"08" }}>
        <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:8 }}>STRATEGY FOR CURRENT AFFAIRS</div>
        <div style={{ color:C.text, fontSize:13, lineHeight:1.8 }}>Current affairs in MPSC RTO is NOT about memorising every event. Focus on: (1) Transport and auto policy changes, (2) Maharashtra infrastructure projects, (3) Key national awards and rankings, (4) Science and technology relevant to automobiles and roads, (5) Key government schemes related to transport and environment.</div>
      </Box>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
        {currentAffairs.map(function(x,i) {
          return (
            <button key={i} onClick={function(){ setCat(i); }} style={{
              padding:"10px 16px", borderRadius:8,
              border:"2px solid "+(cat===i?x.col:C.border),
              background:cat===i?x.col+"15":C.card,
              color:cat===i?x.col:C.soft,
              fontFamily:"monospace", fontSize:11, cursor:"pointer", transition:"all 0.15s",
            }}>{x.cat}</button>
          );
        })}
      </div>
      <Box key={cat} glow={c.col} style={{ borderTop:"3px solid "+c.col }}>
        <div style={{ color:c.col, fontWeight:700, fontSize:16, marginBottom:14 }}>{c.cat}</div>
        <div style={{ display:"grid", gap:8 }}>
          {c.items.map(function(item,i) {
            return (
              <div key={i} style={{ display:"flex", gap:12, padding:"10px 14px", background:C.bg, borderRadius:8, alignItems:"flex-start" }}>
                <span style={{ color:c.col, fontWeight:700, fontFamily:"monospace", fontSize:11, flexShrink:0, marginTop:1 }}>{"0"+(i+1)}</span>
                <span style={{ color:C.text, fontSize:13, lineHeight:1.7 }}>{item}</span>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function GeneralScienceSec() {
  var [at, setAt] = useState(0);
  var tp = scienceTopics[at];
  return (
    <div>
      <STitle icon="🔬" title="GENERAL SCIENCE" sub="Physics, Chemistry, Biology, Technology — exam-relevant facts" color={C.cyan} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
        {scienceTopics.map(function(t,i) {
          return (
            <button key={i} onClick={function(){ setAt(i); }} style={{
              padding:"10px 8px", borderRadius:10, textAlign:"center",
              border:"2px solid "+(at===i?t.col:C.border),
              background:at===i?t.col+"12":C.card, cursor:"pointer", transition:"all 0.15s",
            }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{t.icon}</div>
              <div style={{ fontFamily:"monospace", fontSize:9, color:at===i?t.col:C.muted, fontWeight:700 }}>{t.name.split("—")[0].trim()}</div>
            </button>
          );
        })}
      </div>
      <Box key={at} glow={tp.col} style={{ borderTop:"3px solid "+tp.col }}>
        <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
          <span style={{ fontSize:28 }}>{tp.icon}</span>
          <div style={{ color:tp.col, fontSize:17, fontWeight:700 }}>{tp.name}</div>
        </div>
        <div style={{ display:"grid", gap:10 }}>
          {tp.facts.map(function(f,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:8, padding:"12px 14px", borderLeft:"2px solid "+tp.col+"60" }}>
                <div style={{ color:tp.col, fontWeight:700, fontSize:13, marginBottom:4 }}>{f.t}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.7 }}>{f.d}</div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function MentalAbilitySec() {
  var [qi, setQi] = useState(0);
  var [sel, setSel] = useState(null);
  var [exp, setExp] = useState(false);
  var [score, setScore] = useState({ c:0, w:0 });
  var [done, setDone] = useState(false);

  var q = maQuestions[qi];

  function pick(i) {
    if (sel!==null) return;
    setSel(i); setExp(true);
    setScore(function(s){ return { c:s.c+(i===q.ans?1:0), w:s.w+(i!==q.ans?1:0) }; });
  }
  function next() {
    if (qi<maQuestions.length-1){ setQi(qi+1); setSel(null); setExp(false); }
    else setDone(true);
  }
  function reset(){ setQi(0); setSel(null); setExp(false); setDone(false); setScore({c:0,w:0}); }

  return (
    <div>
      <STitle icon="🧠" title="MENTAL ABILITY PRACTICE" sub="Series, Analogies, Coding, Direction, Data Interpretation" color={C.violet} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.violet }}>
        <div style={{ fontFamily:"monospace", color:C.violet, fontSize:11, letterSpacing:1, marginBottom:12 }}>MENTAL ABILITY — TOPIC OVERVIEW</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { t:"Number Series", tips:["Identify: arithmetic (+constant), geometric (×constant), or mixed","Check differences, then ratios, then second differences","Common: squares, cubes, primes, Fibonacci"] },
            { t:"Analogies", tips:["Find the relationship between given pair","Apply same relationship to find missing word","Types: part-whole, function, cause-effect, tool-material"] },
            { t:"Coding-Decoding", tips:["Check letter shift (+1, +2, -1, reverse, etc.)","Check number substitution (A=1, B=2)","Mirror coding (A↔Z, B↔Y)"] },
            { t:"Direction Sense", tips:["Draw grid: N=up, S=down, E=right, W=left","Track x (E-W) and y (N-S) separately","Final position - Start = displacement (direction + distance)"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderTop:"2px solid "+C.violet }}>
                <div style={{ color:C.violet, fontWeight:700, fontSize:12, marginBottom:8 }}>{x.t}</div>
                {x.tips.map(function(tip,j) { return <div key={j} style={{ color:C.soft, fontSize:11, padding:"3px 0", display:"flex", gap:6 }}><span style={{ color:C.violet }}>→</span>{tip}</div>; })}
              </div>
            );
          })}
        </div>
      </Box>

      <div style={{ display:"flex", gap:12, marginBottom:20 }}>
        {[{l:"Correct",v:score.c,col:C.green},{l:"Wrong",v:score.w,col:C.red},{l:"Attempted",v:score.c+score.w,col:C.violet}].map(function(s) {
          return (
            <Box key={s.l} style={{ flex:1, textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
              <div style={{ fontSize:26, color:s.col, fontWeight:700 }}>{s.v}</div>
              <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:2 }}>{s.l}</div>
            </Box>
          );
        })}
      </div>

      {done ? (
        <Box glow={C.violet} style={{ textAlign:"center", padding:"36px 20px", borderTop:"3px solid "+C.violet }}>
          <div style={{ fontSize:56, marginBottom:12 }}>{score.c>=6?"🧠":"📚"}</div>
          <div style={{ fontSize:24, color:C.violet, letterSpacing:2, marginBottom:10, fontWeight:700 }}>
            {score.c}/{maQuestions.length} — {score.c>=6?"EXCELLENT REASONING!":"KEEP PRACTICING!"}
          </div>
          <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.violet, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14, marginTop:10 }}>TRY AGAIN</button>
        </Box>
      ) : (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <Tag label={"Q"+(qi+1)+"/"+maQuestions.length} color={C.violet} />
            <Tag label={q.type} color={C.cyan} />
            <Tag label={q.level} color={q.level==="EASY"?C.green:q.level==="MEDIUM"?C.yellow:C.orange} />
          </div>
          <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
            <div style={{ width:((qi/maQuestions.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")", transition:"width 0.3s" }} />
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
                {sel===q.ans?"✅ CORRECT!":"❌ WRONG — Correct: "+["A","B","C","D"][q.ans]}
              </div>
              <div style={{ color:C.text, fontSize:13, lineHeight:1.85, whiteSpace:"pre-line", marginBottom:12 }}>{q.exp}</div>
              <div style={{ padding:"10px 14px", background:C.yellow+"10", borderRadius:8, borderLeft:"3px solid "+C.yellow }}>
                <span style={{ color:C.yellow, fontWeight:700, fontSize:11, fontFamily:"monospace" }}>TIP: </span>
                <span style={{ color:C.text, fontSize:13 }}>{q.tip}</span>
              </div>
            </Box>
          )}
          {sel!==null && !done && (
            <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
              {qi<maQuestions.length-1?"NEXT QUESTION →":"FINISH"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🧠", title:"Mental Ability — Speed Techniques", color:C.violet,
      items:[
        "Number Series: check differences → ratios → second differences → squares/cubes. Most series are one of these.",
        "Average speed TRAP: Equal TIME intervals → arithmetic mean. Equal DISTANCE intervals → harmonic mean (2s1s2/s1+s2).",
        "Work problems: Total work = Workers × Days. W1×D1 = W2×D2 (inverse proportion).",
        "Clock angles: |30H − 5.5M| formula. At 12:00 = 0°. At 3:00 = 90°. At 6:00 = 180°.",
        "Set theory: n(A∪B) = n(A) + n(B) − n(A∩B). Neither = Total − n(A∪B).",
        "Direction: Draw grid. Track x (E-W) and y (N-S) separately. Final displacement = net x + net y.",
        "Profit/Loss: Profit % = (Profit/Cost Price) × 100. SP = CP × (1 + P%/100).",
      ],
    },
    {
      icon:"🔬", title:"General Science — Key Facts for Auto Context", color:C.cyan,
      items:[
        "P = F × v (Power = Force × velocity). Rearrange to find speed or force from engine power.",
        "Newton's 3rd Law: Tyre pushes road backward → road pushes car forward (propulsion principle).",
        "Lead-acid battery: Pb (negative) + PbO2 (positive) + H2SO4 (electrolyte). 2V per cell, 12V = 6 cells.",
        "Octane number = petrol quality. Cetane number = diesel quality. Higher = better for each.",
        "SAE viscosity grade: 5W-30 = cold viscosity (5W) + hot viscosity (30). Multigrade works all seasons.",
        "Catalytic converter: Platinum + Palladium + Rhodium. TWC converts CO, HC, NOx simultaneously.",
        "Sound level dB(A) for vehicles: Cars 74-77 dB. Trucks 80-86 dB. Horn 93-112 dB limit.",
      ],
    },
    {
      icon:"📰", title:"Current Affairs — Key Dates and Facts 2023-2025", color:C.indigo,
      items:[
        "Chandrayaan-3: August 23, 2023 = Moon South Pole landing. India's National Space Day.",
        "Atal Setu: January 12, 2024 = India's longest sea bridge (21.8 km). Sewri to Nhava Sheva.",
        "Samruddhi Mahamarg: 701 km Nagpur to Mumbai expressway. Fully operational 2023.",
        "Bharat NCAP: October 2023 = India's own crash test programme launched by MoRTH.",
        "NAVIC: Mandatory in smartphones sold in India from April 2023.",
        "India = 4th country to land on Moon (USA, USSR, China, India). Chandrayaan-3.",
        "India = 5th largest economy. G20 Presidency 2023 (theme: Vasudhaiva Kutumbakam).",
        "PM e-Bus Sewa: 10,000 electric buses for public transport.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Current Affairs and Science", color:C.green,
      items:[
        "Q: Samruddhi Mahamarg connects → Nagpur to Mumbai (701 km)",
        "Q: Chandrayaan-3 landed where → Moon's South Pole (August 23, 2023)",
        "Q: India's longest sea bridge → Atal Setu (21.8 km, opened January 2024)",
        "Q: Bharat NCAP launched by → MoRTH in October 2023",
        "Q: FASTag technology → RFID (Radio Frequency Identification)",
        "Q: NAVIC mandatory from → April 2023 in smartphones sold in India",
        "Q: Newton's 3rd Law applied to vehicle → Tyre pushes road back, road pushes car forward",
        "Q: Lead-acid battery: Negative plate material → Lead (Pb). Positive plate → Lead dioxide (PbO2)",
        "Q: Average speed formula → Total distance / Total time (not arithmetic mean of speeds)",
        "Q: Set theory: n(A∪B) formula → n(A) + n(B) − n(A∩B)",
        "Q: Clock angle formula → |30H − 5.5M| degrees",
        "Q: Work formula → Workers × Days = constant (W1D1 = W2D2)",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Mental Ability shortcuts + Science facts + Current Affairs summary" color={C.yellow} />
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

function CompletionSec() {
  return (
    <div>
      <STitle icon="🏆" title="COMPLETE PREPARATION SUMMARY" sub="All 12 topics covered — your MPSC RTO 2026 system is complete!" color={C.yellow} />
      <Box glow={C.yellow} style={{ borderTop:"3px solid "+C.yellow, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1.5, marginBottom:14 }}>ALL 12 TOPICS — WEIGHTAGE AND STATUS</div>
        <div style={{ display:"grid", gap:8 }}>
          {[
            { n:"01. IC Engines", w:"18%", col:C.orange, desc:"4-stroke, SI vs CI, P-V cycles, Performance, BS6, EV" },
            { n:"02. Motor Vehicles Act", w:"15%", col:C.red, desc:"All chapters, 2019 Amendment, penalties, key sections" },
            { n:"03. Transmission Systems", w:"12%", col:C.cyan, desc:"Clutch, Gearbox, Differential, Propeller Shaft, 4WD" },
            { n:"04. Braking and Suspension", w:"8%", col:C.red, desc:"Drum, Disc, ABS, MacPherson, Leaf Spring, Alignment" },
            { n:"05. Emission Norms and BS6", w:"8%", col:C.green, desc:"BS Timeline, TWC, DPF, SCR, AdBlue, PUC, EV Policy" },
            { n:"06. Indian Polity and GS", w:"10%", col:C.indigo, desc:"Constitution, FRs, Parliament, Local Govt, History" },
            { n:"07. Strength of Materials", w:"6%", col:C.cyan, desc:"Stress, Strain, Bending, Torsion, Columns, Thin Cylinders" },
            { n:"08. Automobile Engineering", w:"7%", col:C.violet, desc:"Steering, Tyres, Fuel Systems, Vehicle Inspection, ADAS" },
            { n:"09. Thermodynamics", w:"6%", col:C.orange, desc:"Laws, Cycles, Refrigeration, Heat Transfer, Psychrometry" },
            { n:"10. Manufacturing Processes", w:"5%", col:C.yellow, desc:"Casting, Forging, Welding, Machining, Industrial Engineering" },
            { n:"11. Transport Management", w:"6%", col:C.gold, desc:"RTO Structure, Permits, Road Safety, MSRTC, Digital Systems" },
            { n:"12. Current Affairs and Science", w:"4%", col:C.indigo, desc:"CA 2023-25, Physics/Chemistry, Mental Ability, Maharashtra" },
          ].map(function(t,i) {
            return (
              <div key={i} style={{ display:"flex", gap:14, padding:"10px 14px", background:C.bg, borderRadius:8, alignItems:"center" }}>
                <div style={{ width:3, height:40, background:t.col, borderRadius:2, flexShrink:0 }} />
                <div style={{ fontSize:22 }}>✅</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:t.col, fontWeight:700, fontSize:13 }}>{t.n}</div>
                  <div style={{ color:C.soft, fontSize:11, marginTop:2 }}>{t.desc}</div>
                </div>
                <div style={{ background:t.col+"15", border:"1px solid "+t.col+"40", borderRadius:6, padding:"4px 12px", color:t.col, fontFamily:"monospace", fontSize:12, fontWeight:700 }}>{t.w}</div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.green, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>FINAL PREPARATION CHECKLIST</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { cat:"Last 30 Days", col:C.red, items:["Complete all 12 topic mock tests","Score target: 75%+ accuracy","Revise all formula sheets","Review all MV Act section numbers","Read current affairs last 3 months"] },
            { cat:"Last 7 Days", col:C.orange, items:["Attempt 2 full-length mock tests daily","Review only weak areas (from practice)","Memorise penalty amounts and dates","Quick revision of all Tips sections","Sleep 7-8 hours — memory consolidation"] },
            { cat:"Exam Day Prep", col:C.yellow, items:["Read all questions before attempting","Attempt high-confidence questions first","Mark doubtful questions and return","-0.25 negative marking: skip if <60% sure","Stay calm — you have prepared thoroughly!"] },
            { cat:"Interview Preparation", col:C.green, items:["Know your engineering branch deeply","Practice explaining technical concepts simply","Know Maharashtra transport statistics","Understand current transport challenges","Be ready: 'Why do you want to be ARTO?'"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderTop:"2px solid "+x.col }}>
                <div style={{ color:x.col, fontWeight:700, fontSize:13, marginBottom:10 }}>{x.cat}</div>
                {x.items.map(function(item,j) { return <div key={j} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.text }}><span style={{ color:x.col }}>✓</span>{item}</div>; })}
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ background:"linear-gradient(135deg, #1a0a2e 0%, #0a1a2e 50%, #0a2e1a 100%)", borderColor:C.yellow+"40" }}>
        <div style={{ textAlign:"center", padding:"20px 0" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🎯</div>
          <div style={{ fontFamily:"monospace", fontSize:22, color:C.yellow, fontWeight:700, letterSpacing:3, marginBottom:10 }}>YOU ARE READY!</div>
          <div style={{ color:C.soft, fontSize:14, lineHeight:1.9, maxWidth:600, margin:"0 auto" }}>
            You have completed all 12 topics of the MPSC RTO/AMVI 2026 preparation system. With consistent practice, revision, and mock tests, <strong style={{ color:C.yellow }}>you will crack this exam in the first attempt.</strong>
            <br/><br/>
            Remember: The exam tests not just knowledge but speed and accuracy. Practice daily. Revise weekly. Mock test fortnightly.
            <br/><br/>
            <span style={{ color:C.green, fontWeight:700 }}>Best of luck! 🏆 MPSC RTO 2026 — First Attempt — Top Rank!</span>
          </div>
        </div>
      </Box>
    </div>
  );
}

var SECS = [
  { id:"current",    icon:"📰", label:"Current Affairs 2023-25" },
  { id:"science",    icon:"🔬", label:"General Science" },
  { id:"mental",     icon:"🧠", label:"Mental Ability Practice" },
  { id:"completion", icon:"🏆", label:"Complete Summary" },
  { id:"tricks",     icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("current");
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
    if (sec==="current") return <CurrentAffairsSec />;
    if (sec==="science") return <GeneralScienceSec />;
    if (sec==="mental") return <MentalAbilitySec />;
    if (sec==="completion") return <CompletionSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#1E1C2E;border-radius:3px}"].join("")}</style>

      <div style={{ background:"linear-gradient(135deg, #06040E 0%, #07060A 50%, #040A06 100%)", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🏆</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>CURRENT AFFAIRS, SCIENCE AND MENTAL ABILITY</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>FINAL TOPIC 12 of 12 · Current Affairs · General Science · Mental Ability · Complete Summary</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="FINAL TOPIC" color={C.yellow} />
              <Tag label="ALL 12 COMPLETE" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.yellow:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.yellow:"transparent"),
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
                    background:sec===s.id?C.yellow+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.yellow+"50":"transparent"),
                    color:sec===s.id?C.yellow:C.soft,
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
            <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3, marginBottom:20 }}>PRACTICE — 12 MIXED QUESTIONS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.indigo}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>
            {done ? (
              <Box glow={C.yellow} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.yellow }}>
                <div style={{ fontSize:60, marginBottom:14 }}>🏆</div>
                <div style={{ fontSize:26, color:C.yellow, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — ALL 12 TOPICS COMPLETE!
                </div>
                <div style={{ color:C.soft, maxWidth:500, margin:"0 auto 24px", fontSize:14, lineHeight:1.8 }}>
                  You have completed the entire MPSC RTO 2026 preparation system. Go to the LEARN tab → Complete Summary section to see your full preparation plan and final checklist.
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.yellow, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("learn"); setSec("completion"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.green, background:C.green+"15", color:C.green, fontWeight:700, cursor:"pointer", fontSize:14 }}>FULL SUMMARY</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.indigo} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.yellow:q.level==="HARD"?C.orange:C.violet} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.indigo+","+C.yellow+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.yellow, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.yellow, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.indigo+","+C.yellow+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
                    {qi<QS.length-1?"NEXT QUESTION →":"FINISH — VIEW COMPLETE SUMMARY"}
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