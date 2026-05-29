import { useState } from "react";

var C = {
  bg:"#060A08", card:"#0C1510", border:"#162416",
  green:"#16A34A", lime:"#65A30D", yellow:"#CA8A04",
  blue:"#0284C7", red:"#DC2626", orange:"#EA580C",
  teal:"#0D9488", purple:"#7C3AED",
  text:"#E2F0E8", muted:"#2D4A36", soft:"#6B9B78",
};

function Tag(props) {
  var c = props.color || C.green;
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
  var c = props.color || C.green;
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
  var cols = props.cols || [C.soft, C.green, C.blue, C.yellow, C.orange, C.teal];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#080D09" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.green+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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

// ── QUESTIONS ──
var QS = [
  {
    id:1, level:"BASIC", topic:"BS Norms Timeline",
    q:"India jumped directly from BS4 to BS6 emission norms, skipping BS5. BS6 norms became mandatory for ALL new vehicles from which date?",
    opts:["April 1, 2018","April 1, 2019","April 1, 2020","April 1, 2021"],
    ans:2,
    exp:"India made BS6 (Bharat Stage 6) mandatory for all new vehicles from APRIL 1, 2020. This was a historic leap — India skipped BS5 entirely and jumped directly from BS4 to BS6.\n\nBS6 aligns with Euro 6 emission standards. The key reasons for skipping BS5: time and cost constraints of implementing two upgrades in quick succession.\n\nTimeline:\nBS1 — 2000\nBS2 — 2001\nBS3 — 2005 (metros), 2010 (all India)\nBS4 — 2017 (all India)\nBS6 — April 1, 2020 (all India, BS5 SKIPPED)",
    tip:"India SKIPPED BS5 — went directly BS4 to BS6. Mandatory from April 1, 2020. This is the single most asked emission question in MPSC. The date April 1, 2020 must be memorised exactly.",
  },
  {
    id:2, level:"BASIC", topic:"Sulphur Content",
    q:"The sulphur content in BS6 fuel (both petrol and diesel) is limited to:",
    opts:["50 ppm (parts per million)","10 ppm (parts per million)","100 ppm (parts per million)","25 ppm (parts per million)"],
    ans:1,
    exp:"BS6 fuel sulphur content: 10 ppm (parts per million) for BOTH petrol and diesel.\n\nComparison:\nBS4 fuel = 50 ppm sulphur\nBS6 fuel = 10 ppm sulphur (80% reduction from BS4)\n\nWhy sulphur matters: Sulphur poisons and damages the catalytic converter (TWC) and Diesel Particulate Filter (DPF). Lower sulphur = longer life for emission control devices = lower overall emissions over vehicle lifetime.\n\nBS6 fuel is sometimes called ultra-low sulphur fuel (ULSF).",
    tip:"BS6 fuel = 10 ppm sulphur. BS4 fuel = 50 ppm sulphur. Remember: BS6 is 5 times cleaner than BS4 in terms of sulphur content. 10 ppm is the key number — also called ultra-low sulphur diesel (ULSD).",
  },
  {
    id:3, level:"BASIC", topic:"SCR System",
    q:"Which emission control technology is MANDATORY in BS6 compliant diesel vehicles to reduce NOx emissions, and what chemical does it use?",
    opts:["DPF using activated carbon","TWC using platinum and palladium only","SCR using AdBlue (urea solution / DEF)","EGR using recirculated exhaust only"],
    ans:2,
    exp:"SCR — Selective Catalytic Reduction — is mandatory for BS6 diesel vehicles to reduce NOx.\n\nHow SCR works:\n1. AdBlue (32.5% urea solution in water, also called DEF — Diesel Exhaust Fluid) is injected into the hot exhaust stream\n2. Heat decomposes urea into ammonia (NH3)\n3. Ammonia reacts with NOx over a catalyst: 4NH3 + 4NO + O2 → 4N2 + 6H2O\n4. Harmful NOx is converted to harmless nitrogen (N2) and water (H2O)\n5. NOx reduction: up to 90%\n\nAdBlue is stored in a separate blue-capped tank. If AdBlue runs out, engine enters limp mode (power reduced). Must be topped up regularly (every 10,000-15,000 km approximately).",
    tip:"SCR + AdBlue = mandatory for BS6 diesel. AdBlue = urea + water (32.5% urea). NOx becomes N2 + H2O (harmless). Blue filler cap on vehicle = AdBlue tank. If AdBlue empty = limp mode. EGR alone was sufficient for BS4 but NOT for BS6 NOx limits.",
  },
  {
    id:4, level:"MEDIUM", topic:"Pollutants",
    q:"Which of the following is the PRIMARY harmful pollutant produced in EXCESS by PETROL engines compared to diesel engines?",
    opts:["Particulate Matter (PM / soot)","Carbon Monoxide (CO) and unburnt Hydrocarbons (HC)","NOx (Nitrogen Oxides)","Sulphur Dioxide (SO2)"],
    ans:1,
    exp:"Petrol engines produce MORE: CO (carbon monoxide) and HC (unburnt hydrocarbons) compared to diesel engines.\n\nWhy: Petrol burns in a homogeneous mixture — if mixture is rich (excess fuel) or combustion is incomplete, CO and HC result.\n\nDiesel engines produce MORE: NOx (high combustion temperature from high compression) and PM/soot (heterogeneous combustion — fuel droplets that don't fully combust).\n\nSummary:\nPetrol = higher CO + HC\nDiesel = higher NOx + PM (soot)\n\nThis is why petrol cars use THREE-WAY CATALYST (TWC) targeting CO, HC, NOx\nDiesel cars use DPF (for PM) + SCR (for NOx) + DOC (for CO/HC)",
    tip:"Petrol = CO and HC problem. Diesel = NOx and PM (soot) problem. Petrol solution = Three-Way Catalyst (TWC). Diesel solution = DOC + DPF + SCR. This distinction between petrol and diesel pollutants is very frequently tested.",
  },
  {
    id:5, level:"MEDIUM", topic:"Catalytic Converter",
    q:"A Three-Way Catalytic Converter (TWC) in a petrol engine simultaneously controls which THREE pollutants?",
    opts:["CO, HC, and NOx","CO, HC, and PM","NOx, PM, and SO2","CO, NOx, and SO2"],
    ans:0,
    exp:"Three-Way Catalytic Converter (TWC) simultaneously controls THREE pollutants:\n\n1. CO (Carbon Monoxide) — oxidised to CO2\n   2CO + O2 → 2CO2\n\n2. HC (Unburnt Hydrocarbons) — oxidised to CO2 and H2O\n   CxHy + O2 → CO2 + H2O\n\n3. NOx (Nitrogen Oxides) — REDUCED to N2\n   2NOx → N2 + xO2\n\nTWC requires STOICHIOMETRIC air-fuel ratio (lambda = 1, AFR = 14.7:1 for petrol). ECU uses oxygen sensor (lambda sensor) to maintain this precise ratio.\n\nTWC needs operating temperature above 300°C to function. Cold start = catalyst ineffective = most emissions occur in first 2 minutes.",
    tip:"THREE-Way = THREE pollutants: CO, HC, NOx. Petrol engine only. Works ONLY at stoichiometric AFR (14.7:1, lambda=1). Needs 300°C+ to work. Lambda/oxygen sensor maintains correct AFR for TWC to function. COLD START is when most petrol car emissions happen.",
  },
  {
    id:6, level:"MEDIUM", topic:"DPF",
    q:"A Diesel Particulate Filter (DPF) traps soot from diesel exhaust. How is the accumulated soot removed (the DPF cleaned/regenerated)?",
    opts:["By adding special fuel additives only","By burning the soot at high temperature (regeneration) — active or passive","By washing with water during service","By replacing the filter every 10,000 km"],
    ans:1,
    exp:"DPF REGENERATION — the process of burning off accumulated soot:\n\nPassive Regeneration (automatic, most common):\n- Occurs naturally during sustained highway driving\n- Exhaust temperature rises above 550-600°C\n- Soot burns off automatically as the vehicle is driven\n- No driver action needed\n\nActive Regeneration (forced):\n- Triggered when DPF fills up during city driving (low exhaust temp)\n- ECU injects extra fuel to raise exhaust temperature to 550-600°C\n- Soot burns off over 10-15 minutes\n- Dashboard warning light may indicate this is happening\n- Vehicle should NOT be switched off during active regeneration\n\nForced Regeneration (workshop):\n- Done at service center when DPF is blocked\n- Uses diagnostic tool to initiate high-temperature burn\n\nDPF ash (non-combustible residue) builds up over time and eventually requires replacement (typically 100,000-150,000 km).",
    tip:"DPF regeneration = burning soot at high temperature. Passive = happens automatically at highway speed. Active = ECU forces it in city use. Never switch off engine during active regen (amber light). Short city drives only = DPF cannot regenerate = blockage = expensive repair.",
  },
  {
    id:7, level:"MEDIUM", topic:"OBD",
    q:"OBD-II (On-Board Diagnostics) is mandatory for all BS6 vehicles. What is the PRIMARY function of the OBD system?",
    opts:["To improve fuel efficiency by 20%","To monitor all emission-related systems and alert driver to malfunctions via MIL","To automatically service the vehicle at correct intervals","To communicate with traffic management systems"],
    ans:1,
    exp:"OBD-II (On-Board Diagnostics, Level 2) PRIMARY function: Continuously MONITOR all emission-related components and systems. If any malfunction is detected that would cause emissions to exceed limits, the MIL (Malfunction Indicator Lamp, also called Check Engine Light) illuminates on the dashboard.\n\nOBD-II monitors:\n- Catalytic converter efficiency\n- Oxygen sensor function\n- EGR system operation\n- EVAP (evaporative emission) system\n- Fuel system\n- Misfire detection (misfires increase HC emissions)\n- DPF and SCR system health\n\nFault codes (DTCs — Diagnostic Trouble Codes) are stored in ECU memory and can be read by any OBD-II scanner at a workshop.\n\nFor ARTO/AMVI: You can use an OBD scanner during vehicle inspection to check for emission-related fault codes. If MIL is ON = vehicle failing emission norms = grounds to fail fitness inspection.",
    tip:"OBD = monitors emissions, alerts driver via MIL (Check Engine Light). Mandatory for BS6. Stores fault codes (DTCs) readable by scanner. As ARTO: MIL ON = emission system fault = FAIL fitness inspection. OBD-II is a universal standard — same scanner works on all BS6 vehicles.",
  },
  {
    id:8, level:"HARD", topic:"EGR System",
    q:"How does EGR (Exhaust Gas Recirculation) reduce NOx emissions in an engine?",
    opts:["By injecting water into the combustion chamber to cool it","By recirculating inert exhaust gases into intake to lower peak combustion temperature","By oxidising NOx in the catalytic converter","By increasing the compression ratio to reduce NOx formation"],
    ans:1,
    exp:"EGR (Exhaust Gas Recirculation) reduces NOx by:\n\nMechanism:\n1. A portion of exhaust gas (already burned, inert — mainly CO2 and N2) is recirculated back into the intake manifold\n2. This inert gas mixes with fresh air-fuel charge\n3. The inert gas absorbs heat during combustion — acts as a heat sink\n4. Peak combustion temperature is REDUCED (from ~2500°C to lower levels)\n5. NOx formation requires high temperature (above ~1800°C) — lower temperature = less NOx\n\nTypes of EGR:\n- Hot EGR: exhaust gas recirculated without cooling (older, simpler)\n- Cooled EGR: exhaust gas cooled before recirculation (more effective NOx reduction, used in BS6)\n\nTrade-off: EGR reduces NOx but slightly increases soot (PM) formation and can reduce fuel efficiency slightly. Hence BS6 needs BOTH EGR and SCR for complete NOx control.",
    tip:"EGR = recirculates exhaust gas into intake = lowers peak combustion temperature = LESS NOx. Key principle: NOx forms at HIGH temperatures. Reduce temperature = reduce NOx. But EGR alone is insufficient for BS6 NOx limits, so SCR with AdBlue is also required.",
  },
  {
    id:9, level:"HARD", topic:"PUC Certificate",
    q:"Under the Motor Vehicles Act and Central Motor Vehicles Rules, a PUC (Pollution Under Control) Certificate must be obtained at what interval for a petrol vehicle more than 1 year old?",
    opts:["Every 6 months","Every year","Every 3 months","Every 2 years"],
    ans:0,
    exp:"PUC (Pollution Under Control) Certificate intervals under Central Motor Vehicles Rules 1989:\n\nNew vehicle: First PUC at the time of first registration (gets PUC with purchase).\n\nAfter first year:\n- Petrol vehicles: Every 6 MONTHS\n- Diesel vehicles: Every 6 MONTHS\n- CNG/LPG vehicles: Every 6 MONTHS\n\nThe PUC test measures:\n- For petrol idle mode: CO content (% by volume)\n- For diesel (free acceleration): Smoke opacity (% opacity)\n\nPUC Certificate validity: 6 months for all vehicles older than 1 year.\n\nPenalty for no valid PUC: Fine under Central Motor Vehicles Rules + can be detained by traffic police. As ARTO, checking PUC validity is part of routine and fitness inspection.",
    tip:"PUC validity for vehicles over 1 year old = 6 MONTHS for all fuel types. New vehicle gets initial PUC certificate valid for 1 year. Without valid PUC: traffic challan and possible detention. ARTO checks PUC during all transport vehicle inspections.",
  },
  {
    id:10, level:"HARD", topic:"CAFE Norms",
    q:"CAFE (Corporate Average Fuel Efficiency) norms in India regulate which of the following?",
    opts:["Maximum permitted exhaust temperature of vehicles","Average CO2 emissions per km across a manufacturer's entire fleet of vehicles sold","Minimum engine displacement for commercial vehicles","Maximum noise levels from vehicle exhaust"],
    ans:1,
    exp:"CAFE (Corporate Average Fuel Efficiency) norms regulate the AVERAGE CO2 emissions (grams per km) across ALL vehicles sold by a manufacturer in a year.\n\nHow CAFE works:\n- Each manufacturer calculates the sales-weighted average CO2 emissions across their entire fleet\n- Must meet the CAFE target (currently Phase 2: 113 g CO2/km for cars, Phase 3 planned even stricter)\n- CO2 emissions are directly linked to fuel consumption: more fuel burned = more CO2\n- Manufacturers exceeding the limit face financial penalties\n- Manufacturers making more EVs and fuel-efficient cars earn credits\n\nCAFE Phase 1: 130 g CO2/km (2017-2022)\nCAFE Phase 2: 113 g CO2/km (from 2022)\n\nCAFE is the primary driver pushing manufacturers to produce more fuel-efficient cars, hybrids, and EVs in India.",
    tip:"CAFE = Corporate Average Fuel Efficiency. Regulates CO2 g/km across manufacturer's ENTIRE FLEET (average). More EVs and efficient cars = lower average = easier CAFE compliance. This is why manufacturers invest in EVs and hybrids. Phase 2 = 113 g CO2/km.",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Emission Control Devices",
    q:"Match the emission control device with its PRIMARY function: DPF, SCR, TWC, DOC — which device is used ONLY in petrol engines and targets CO, HC, and NOx simultaneously?",
    opts:["DPF — Diesel Particulate Filter","SCR — Selective Catalytic Reduction","TWC — Three-Way Catalytic Converter","DOC — Diesel Oxidation Catalyst"],
    ans:2,
    exp:"TWC (Three-Way Catalytic Converter) — used ONLY in petrol (SI) engines. Simultaneously converts all three main pollutants:\n- CO → CO2 (oxidation)\n- HC → CO2 + H2O (oxidation)\n- NOx → N2 (reduction)\n\nThe other devices:\n- DPF: Diesel only. Traps and burns soot (PM/particulate matter)\n- SCR: Diesel mainly. Reduces NOx using AdBlue (urea). Also used in some heavy CNG vehicles\n- DOC (Diesel Oxidation Catalyst): Diesel only. Oxidises CO and HC from diesel exhaust. Also converts NO to NO2 which helps DPF passive regeneration\n\nComplete BS6 diesel emission chain:\nEngine → DOC → DPF → SCR+AdBlue → Clean exhaust\n\nComplete BS6 petrol emission chain:\nEngine → TWC (+ EVAP system) → Clean exhaust",
    tip:"TWC = PETROL only = 3-in-1 (CO + HC + NOx). For DIESEL: DOC + DPF + SCR is the chain. Remember order: D-D-S (Diesel-Diesel-SCR) = DOC, DPF, SCR for diesel exhaust system. Petrol has just one device (TWC) but diesel needs three separate devices.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"BS6 vs BS4",
    q:"Compared to BS4 norms, BS6 norms for diesel vehicles reduced NOx limit by approximately what percentage?",
    opts:["25% reduction","50% reduction","68% reduction","90% reduction"],
    ans:2,
    exp:"BS6 vs BS4 emission limits comparison for DIESEL passenger vehicles:\n\nNOx: BS4 = 0.25 g/km → BS6 = 0.08 g/km = 68% REDUCTION\nPM (soot): BS4 = 0.025 g/km → BS6 = 0.0045 g/km = 82% reduction\nHC+NOx: BS4 = 0.30 g/km → BS6 = 0.17 g/km = 43% reduction\n\nFor PETROL passenger vehicles:\nCO: BS4 = 1.0 g/km → BS6 = 1.0 g/km (same)\nHC: BS4 = 0.10 g/km → BS6 = 0.10 g/km (same)\nNOx: BS4 = 0.06 g/km → BS6 = 0.06 g/km (same)\n(Petrol NOx limits unchanged but OBD-II monitoring is stricter)\n\nThe massive reduction in diesel NOx (68%) and PM (82%) is why SCR with AdBlue and DPF are mandatory for BS6 diesel vehicles.",
    tip:"BS6 diesel NOx = 68% reduction from BS4. BS6 diesel PM = 82% reduction. These numbers are sometimes asked directly. The technologies needed to achieve this: NOx reduction = SCR + AdBlue + cooled EGR. PM reduction = DPF. Together they make BS6 diesel cars much cleaner than BS4.",
  },
];

// ── SECTION COMPONENTS ──

function IntroSec() {
  return (
    <div>
      <STitle icon="🌿" title="EMISSION NORMS — INTRODUCTION" sub="Why emissions matter + exam relevance + ARTO job connection" color={C.green} />
      <Box glow={C.green} style={{ borderTop:"3px solid "+C.green, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", fontSize:11, color:C.green, letterSpacing:1.5, marginBottom:14 }}>WHY THIS TOPIC IS CRITICAL FOR MPSC RTO</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { icon:"📊", t:"8% Mains Weightage", d:"Emission norms asked in 8 out of 10 previous MPSC RTO papers. BS6 introduction in 2020 made this a hot topic in every exam since." },
            { icon:"💼", t:"ARTO Job Function", d:"Checking PUC certificates, inspecting emission control systems (DPF condition, AdBlue level), and enforcing emission violations (Sec 182A MV Act) is your daily job." },
            { icon:"🏭", t:"Policy Relevance", d:"BS6, CAFE norms, FAME-II for EVs, and green vehicle policy are all central to Maharashtra transport department operations and planning." },
          ].map(function(c,i) { return (
            <div key={i} style={{ padding:14, background:C.bg, borderRadius:10, textAlign:"center" }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{c.icon}</div>
              <div style={{ color:C.green, fontWeight:700, fontSize:13, marginBottom:4 }}>{c.t}</div>
              <div style={{ color:C.soft, fontSize:12, lineHeight:1.6 }}>{c.d}</div>
            </div>
          ); })}
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", fontSize:11, color:C.yellow, letterSpacing:1, marginBottom:12 }}>MAIN AIR POLLUTANTS FROM VEHICLES</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { p:"CO — Carbon Monoxide", c:C.red, d:"Colourless, odourless, toxic gas. Forms from incomplete combustion when oxygen is insufficient. Fatal in high concentrations. PRIMARY from petrol engines." },
            { p:"HC — Hydrocarbons", c:C.orange, d:"Unburnt fuel vapour. Cause of ground-level ozone (smog). Some are carcinogenic. PRIMARY from petrol engines (also evaporation from fuel tank)." },
            { p:"NOx — Nitrogen Oxides", c:C.purple, d:"NO and NO2. Cause acid rain, smog, respiratory disease. Form at HIGH combustion temperatures. PRIMARY from diesel engines (high compression = high temp)." },
            { p:"PM — Particulate Matter", c:C.yellow, d:"Tiny soot particles (PM2.5 and PM10). Penetrate deep into lungs. Cause cardiovascular and respiratory disease. PRIMARY from diesel combustion." },
            { p:"SO2 — Sulphur Dioxide", c:C.teal, d:"From sulphur in fuel. Causes acid rain and respiratory problems. Controlled by reducing sulphur in fuel (BS6 = 10 ppm). Less of an issue with BS6 fuel." },
            { p:"CO2 — Carbon Dioxide", c:C.lime, d:"Greenhouse gas causing climate change. NOT controlled by emission norms directly, but by CAFE fuel efficiency standards. Proportional to fuel consumed." },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"10px 14px", background:C.bg, borderRadius:8, borderLeft:"3px solid "+x.c }}>
              <div style={{ color:x.c, fontWeight:700, fontSize:13, marginBottom:4 }}>{x.p}</div>
              <div style={{ color:C.soft, fontSize:12, lineHeight:1.6 }}>{x.d}</div>
            </div>
          ); })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", fontSize:11, color:C.green, letterSpacing:1, marginBottom:12 }}>PETROL vs DIESEL — WHICH POLLUTES MORE OF WHAT?</div>
        <DTable
          heads={["Pollutant","Petrol Engine","Diesel Engine","Key Tech Solution"]}
          cols={[C.soft, C.orange, C.blue, C.green]}
          rows={[
            ["CO (Carbon Monoxide)","HIGH","Lower","TWC (petrol) / DOC (diesel)"],
            ["HC (Hydrocarbons)","HIGH","Lower","TWC (petrol) / DOC (diesel)"],
            ["NOx (Nitrogen Oxides)","Lower","HIGH","TWC (petrol) / SCR+EGR (diesel)"],
            ["PM/Soot","Very Low","HIGH","DPF mandatory for BS6 diesel"],
            ["CO2 (Greenhouse gas)","Higher per litre","Lower per km","CAFE norms regulate this"],
          ]}
          hi={[2,3]}
        />
      </Box>
    </div>
  );
}

function BSNormsSec() {
  var [selected, setSelected] = useState("bs6");
  var stages = {
    bs1:{ year:"2000", sulphur:"2000 ppm", nox_diesel:"N/A", pm:"N/A", obd:"No", color:C.soft, label:"BS1 — 2000" },
    bs2:{ year:"2001", sulphur:"500 ppm", nox_diesel:"N/A", pm:"N/A", obd:"No", color:C.soft, label:"BS2 — 2001" },
    bs3:{ year:"2005/2010", sulphur:"350 ppm", nox_diesel:"0.50 g/km", pm:"0.065 g/km", obd:"Basic OBD", color:C.yellow, label:"BS3 — 2005" },
    bs4:{ year:"2017 (All India)", sulphur:"50 ppm", nox_diesel:"0.25 g/km", pm:"0.025 g/km", obd:"OBD-I", color:C.orange, label:"BS4 — 2017" },
    bs6:{ year:"April 1, 2020", sulphur:"10 ppm", nox_diesel:"0.08 g/km", pm:"0.0045 g/km", obd:"OBD-II Mandatory", color:C.green, label:"BS6 — 2020" },
  };
  var s = stages[selected];
  return (
    <div>
      <STitle icon="📊" title="BHARAT STAGE EMISSION STANDARDS" sub="Complete BS1 to BS6 timeline with limits and technology requirements" color={C.green} />

      <Box style={{ marginBottom:20, borderLeft:"4px solid "+C.green, background:C.green+"08" }}>
        <div style={{ color:C.green, fontWeight:700, fontSize:14, marginBottom:10 }}>THE INDIA SKIPPED BS5 STORY — Most Asked MPSC Fact</div>
        <div style={{ color:C.text, fontSize:13, lineHeight:1.8 }}>India moved DIRECTLY from BS4 (2017) to BS6 (2020), skipping BS5 entirely. The decision was taken by the Supreme Court of India in 2016 based on recommendations to address severe urban air pollution. Implementing BS5 first and then BS6 within a short period would have been costly and time-consuming for manufacturers. Instead, manufacturers were given a 3-year window to develop BS6-compliant vehicles and fuel supply was upgraded simultaneously. April 1, 2020 was the deadline — and it was met despite COVID-19 disruption beginning that same month.</div>
      </Box>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
        {Object.keys(stages).map(function(k) { return (
          <button key={k} onClick={function(){ setSelected(k); }} style={{
            padding:"10px 16px", borderRadius:8,
            border:"2px solid "+(selected===k?stages[k].color:C.border),
            background:selected===k?stages[k].color+"15":C.card,
            color:selected===k?stages[k].color:C.soft,
            fontFamily:"monospace", fontSize:11, cursor:"pointer", transition:"all 0.15s",
          }}>{stages[k].label}</button>
        ); })}
      </div>

      <Box key={selected} glow={s.color} style={{ borderTop:"3px solid "+s.color, marginBottom:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
          {[
            { l:"EFFECTIVE YEAR", v:s.year, c:s.color },
            { l:"FUEL SULPHUR", v:s.sulphur, c:C.yellow },
            { l:"DIESEL NOx LIMIT", v:s.nox_diesel, c:C.purple },
            { l:"OBD REQUIREMENT", v:s.obd, c:C.blue },
          ].map(function(x,i) { return (
            <div key={i} style={{ background:C.bg, borderRadius:10, padding:"12px 14px", textAlign:"center" }}>
              <div style={{ color:C.muted, fontFamily:"monospace", fontSize:9, letterSpacing:1, marginBottom:6, textTransform:"uppercase" }}>{x.l}</div>
              <div style={{ color:x.c, fontSize:13, fontWeight:700 }}>{x.v}</div>
            </div>
          ); })}
        </div>
      </Box>

      <Box style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>BS4 vs BS6 — COMPLETE LIMIT COMPARISON (DIESEL PASSENGER CARS)</div>
        <DTable
          heads={["Parameter","BS4 Limit","BS6 Limit","Improvement"]}
          cols={[C.soft, C.orange, C.green, C.lime]}
          rows={[
            ["Fuel Sulphur","50 ppm","10 ppm","80% reduction"],
            ["NOx","0.25 g/km","0.08 g/km","68% reduction"],
            ["PM (Soot)","0.025 g/km","0.0045 g/km","82% reduction"],
            ["HC + NOx combined","0.30 g/km","0.17 g/km","43% reduction"],
            ["OBD requirement","OBD-I (basic)","OBD-II (comprehensive)","Full monitoring"],
            ["Real Driving Emissions","Lab test only","RDE test mandatory","Real world compliance"],
          ]}
          hi={[1,2]}
        />
      </Box>

      <Box style={{ borderTop:"2px solid "+C.blue }}>
        <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>MANDATORY TECHNOLOGIES FOR BS6 COMPLIANCE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <div style={{ color:C.orange, fontWeight:700, fontSize:13, marginBottom:10 }}>BS6 Diesel Vehicle Requirements</div>
            {[
              { t:"Cooled EGR", d:"Exhaust Gas Recirculation with cooler. Reduces peak combustion temperature. Cuts NOx formation." },
              { t:"DOC — Diesel Oxidation Catalyst", d:"Oxidises CO and HC. Also converts NO to NO2 which aids DPF passive regeneration." },
              { t:"DPF — Diesel Particulate Filter", d:"Traps soot particles. Requires periodic regeneration. Mandatory for BS6." },
              { t:"SCR with AdBlue", d:"Selective Catalytic Reduction. Converts NOx to N2 and H2O using urea (AdBlue/DEF)." },
              { t:"OBD-II", d:"On-board diagnostics monitoring all emission systems. Stores fault codes. MIL lamp for warnings." },
            ].map(function(x,i) { return (
              <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
                <div style={{ color:C.orange, fontSize:12, fontWeight:700 }}>{x.t}</div>
                <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
              </div>
            ); })}
          </div>
          <div>
            <div style={{ color:C.lime, fontWeight:700, fontSize:13, marginBottom:10 }}>BS6 Petrol Vehicle Requirements</div>
            {[
              { t:"TWC — Three-Way Catalyst", d:"Simultaneously controls CO, HC, and NOx. Requires stoichiometric AFR (14.7:1)." },
              { t:"Oxygen/Lambda Sensor", d:"Monitors exhaust oxygen content. ECU uses this to maintain precise AFR for TWC efficiency." },
              { t:"EVAP System", d:"Evaporative Emission Control. Captures fuel vapour from tank (canister + purge valve). Prevents HC evaporation." },
              { t:"Fuel Injection (MPFI or GDI)", d:"Replaces carburettor. Precise fuel metering for better combustion and TWC operation." },
              { t:"OBD-II", d:"Same as diesel — full monitoring of all emission systems including catalyst efficiency." },
            ].map(function(x,i) { return (
              <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
                <div style={{ color:C.lime, fontSize:12, fontWeight:700 }}>{x.t}</div>
                <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
              </div>
            ); })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function EmissionDevicesSec() {
  var [at, setAt] = useState(0);
  var devices = [
    {
      name:"TWC — Three-Way Catalytic Converter", color:C.lime, icon:"🔄",
      engine:"PETROL (SI) engines only",
      function:"Simultaneously oxidises CO and HC, and REDUCES NOx. All three pollutants converted in one device.",
      reactions:["2CO + O2 → 2CO2 (CO oxidised to harmless CO2)","CxHy + O2 → CO2 + H2O (HC burnt to CO2 and water)","2NOx → N2 + xO2 (NOx reduced to harmless nitrogen)"],
      conditions:["Stoichiometric AFR required (14.7:1, lambda = 1)","Operating temperature must exceed 300°C","Oxygen sensor (lambda sensor) maintains correct AFR","Cold start = TWC ineffective = most emissions occur in first 2 min","Platinum + Palladium (oxidation) + Rhodium (NOx reduction) catalysts"],
      location:"Exhaust manifold or close-coupled to engine for fast heat-up",
    },
    {
      name:"DOC — Diesel Oxidation Catalyst", color:C.yellow, icon:"⚡",
      engine:"DIESEL (CI) engines",
      function:"Oxidises CO and HC from diesel exhaust. Also converts NO to NO2 which is needed for passive DPF regeneration.",
      reactions:["2CO + O2 → 2CO2","CxHy + O2 → CO2 + H2O","2NO + O2 → 2NO2 (important for DPF regeneration)"],
      conditions:["Light-off temperature: 150-200°C (lower than TWC)","Platinum and Palladium catalyst","Does NOT reduce NOx (that is SCR's job)","Positioned before DPF in exhaust system"],
      location:"First in diesel exhaust aftertreatment chain: DOC → DPF → SCR",
    },
    {
      name:"DPF — Diesel Particulate Filter", color:C.orange, icon:"🧱",
      engine:"DIESEL engines — mandatory for BS6",
      function:"Traps solid soot particles (PM) from diesel exhaust. Periodically cleaned by burning soot at high temperature (regeneration).",
      reactions:["Soot trapped in ceramic honeycomb wall-flow filter","Passive regen: C (soot) + NO2 → CO2 + N2 (at 350-500°C, using NO2 from DOC)","Active regen: C + O2 → CO2 (at 550-600°C, ECU raises exhaust temp)"],
      conditions:["Ceramic monolith with alternating blocked channels (wall-flow design)","Fills with soot during city driving","Regeneration needed every 500-800 km city driving","If regeneration fails repeatedly: DPF blocks = expensive replacement","Never switch off engine during active regeneration"],
      location:"After DOC in exhaust. Before SCR. Gets very hot during regeneration.",
    },
    {
      name:"SCR — Selective Catalytic Reduction", color:C.blue, icon:"💧",
      engine:"DIESEL engines — mandatory for BS6 + heavy CNG vehicles",
      function:"Converts harmful NOx into harmless nitrogen (N2) and water (H2O) using AdBlue (urea solution) as reducing agent.",
      reactions:["AdBlue (urea) → NH3 (ammonia) + CO2 when heated","4NO + 4NH3 + O2 → 4N2 + 6H2O (main reaction)","2NO2 + 4NH3 + O2 → 3N2 + 6H2O (secondary reaction)","NOx reduction efficiency: up to 90%"],
      conditions:["AdBlue = 32.5% urea in deionised water (DEF — Diesel Exhaust Fluid)","Blue filler cap on vehicle. Separate tank from diesel.","AdBlue consumption: approx 4-8% of diesel consumption","If AdBlue empty: engine enters limp mode (power limited)","Operating temperature: 200-600°C for catalyst activity"],
      location:"After DPF in exhaust system. Complete chain: DOC → DPF → SCR → Clean exhaust",
    },
    {
      name:"EGR — Exhaust Gas Recirculation", color:C.purple, icon:"🔃",
      engine:"BOTH petrol and diesel engines",
      function:"Recirculates a portion of exhaust gas back into the intake manifold. Inert exhaust gas lowers peak combustion temperature, reducing NOx formation.",
      reactions:["Inert exhaust gas (CO2 + N2) replaces some fresh air","Acts as heat sink — absorbs heat during combustion","Peak combustion temperature reduced from ~2500°C to lower","NOx formation rate drops exponentially below 1800°C"],
      conditions:["Hot EGR (older): exhaust gas recirculated at high temperature","Cooled EGR (BS6): exhaust gas cooled before recirculation = more effective","EGR valve controls amount of recirculation based on load","Too much EGR = soot increase and reduced power","EGR alone insufficient for BS6 NOx limits — used alongside SCR"],
      location:"Pipe connecting exhaust manifold to intake manifold. EGR cooler in cooled EGR systems.",
    },
    {
      name:"EVAP — Evaporative Emission Control", color:C.teal, icon:"🌬️",
      engine:"PETROL engines",
      function:"Captures fuel vapour from fuel tank and fuel system (evaporative emissions). Prevents HC vapour from escaping to atmosphere when vehicle is parked.",
      reactions:["Fuel vapour from tank → charcoal canister (carbon canister) for storage","When engine runs: purge valve opens → stored HC vapour drawn into intake","HC vapour combusted in engine normally","Prevents 'tank breathing' emissions"],
      conditions:["Charcoal (activated carbon) canister absorbs HC vapour","Purge valve: solenoid controlled by ECU","OBD-II monitors EVAP system for leaks continuously","Petrol cap not properly sealed = EVAP system leak = MIL ON","Pressure testing of fuel system is part of EVAP check"],
      location:"Charcoal canister in engine bay or near fuel tank. Hoses connecting tank, canister, and intake manifold.",
    },
  ];
  var d = devices[at];
  return (
    <div>
      <STitle icon="🔧" title="EMISSION CONTROL DEVICES" sub="TWC, DOC, DPF, SCR, EGR, EVAP — all six devices in depth" color={C.green} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:20 }}>
        {devices.map(function(dev,i) { return (
          <button key={i} onClick={function(){ setAt(i); }} style={{
            padding:"10px 12px", borderRadius:10, textAlign:"left",
            border:"2px solid "+(at===i?dev.color:C.border),
            background:at===i?dev.color+"12":C.card, cursor:"pointer", transition:"all 0.15s",
          }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{dev.icon}</div>
            <div style={{ fontFamily:"monospace", fontSize:10, color:at===i?dev.color:C.muted, fontWeight:700, lineHeight:1.5 }}>{dev.name.split("—")[0]}</div>
          </button>
        ); })}
      </div>
      <Box key={at} glow={d.color} style={{ borderTop:"3px solid "+d.color, marginBottom:20 }}>
        <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:28 }}>{d.icon}</span>
          <div>
            <div style={{ color:d.color, fontSize:18, fontWeight:700 }}>{d.name}</div>
            <Tag label={"Used in: "+d.engine} color={d.color} />
          </div>
        </div>
        <p style={{ color:C.text, fontSize:14, lineHeight:1.8, marginBottom:16 }}>{d.function}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          <div>
            <div style={{ fontFamily:"monospace", color:d.color, fontSize:10, letterSpacing:1, marginBottom:10 }}>CHEMICAL REACTIONS</div>
            {d.reactions.map(function(r,i) { return (
              <div key={i} style={{ padding:"6px 10px", background:C.bg, borderRadius:6, marginBottom:6, borderLeft:"2px solid "+d.color+"60", fontFamily:"monospace", fontSize:11, color:C.text, lineHeight:1.6 }}>{r}</div>
            ); })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:10, letterSpacing:1, marginBottom:10 }}>OPERATING CONDITIONS</div>
            {d.conditions.map(function(c,i) { return (
              <div key={i} style={{ padding:"5px 0", borderBottom:"1px solid "+C.border+"40", fontSize:12, color:C.soft, display:"flex", gap:8 }}>
                <span style={{ color:d.color, flexShrink:0 }}>→</span>{c}
              </div>
            ); })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.teal, fontSize:10, letterSpacing:1, marginBottom:10 }}>LOCATION IN EXHAUST</div>
            <div style={{ padding:12, background:C.bg, borderRadius:8, color:C.soft, fontSize:12, lineHeight:1.7, marginBottom:12 }}>{d.location}</div>
            <div style={{ padding:"10px 12px", background:d.color+"10", borderRadius:8 }}>
              <div style={{ color:d.color, fontWeight:700, fontSize:11, marginBottom:6 }}>EXHAUST CHAIN ORDER</div>
              <div style={{ fontFamily:"monospace", fontSize:11, color:C.text, lineHeight:1.8 }}>
                DIESEL:<br/>Engine → DOC → DPF → SCR → Out<br/><br/>
                PETROL:<br/>Engine → TWC → Out<br/>(EVAP system = separate)
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

function PUCsec() {
  return (
    <div>
      <STitle icon="📜" title="PUC CERTIFICATE AND TESTING" sub="Pollution Under Control — rules, intervals, test procedure, ARTO role" color={C.lime} />
      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.lime }}>
        <div style={{ fontFamily:"monospace", color:C.lime, fontSize:11, letterSpacing:1, marginBottom:12 }}>PUC CERTIFICATE — KEY FACTS</div>
        <DTable
          heads={["Parameter","Detail"]}
          cols={[C.soft, C.lime]}
          rows={[
            ["Full form","Pollution Under Control Certificate"],
            ["Legal basis","Central Motor Vehicles Rules 1989, Rule 115"],
            ["Issued by","Authorized PUC testing centres (government approved)"],
            ["New vehicle validity","1 year from date of first registration"],
            ["Vehicles over 1 year old","Every 6 months (all fuel types — petrol, diesel, CNG, LPG)"],
            ["Penalty for no PUC","Fine under CMVR + traffic challan + possible vehicle detention"],
            ["ARTO responsibility","Check PUC during all transport vehicle fitness inspections"],
            ["MV Act penalty section","Section 190 (unsafe vehicle) or Section 177 (general penalty)"],
          ]}
          hi={[4,6]}
        />
      </Box>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.orange }}>
          <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>PUC TEST — PETROL VEHICLE</div>
          <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>Idle Mode Test</div>
          {[
            { p:"Vehicle condition", d:"Engine at normal operating temperature. Air filter and fuel systems normal." },
            { p:"Test method", d:"Exhaust probe inserted into tailpipe. Engine at idle (no load)." },
            { p:"Parameter measured", d:"CO % by volume at idle. Also HC (ppm) in some states." },
            { p:"BS4 petrol CO limit", d:"Max 0.5% CO at idle (engines made after 2001)" },
            { p:"BS6 petrol CO limit", d:"Same idle test but OBD-II compliance also checked" },
            { p:"Duration", d:"30-60 seconds of stable idle before reading" },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}>
              <div style={{ color:C.orange, fontSize:11, fontWeight:700 }}>{x.p}</div>
              <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
            </div>
          ); })}
        </Box>
        <Box style={{ borderTop:"2px solid "+C.purple }}>
          <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>PUC TEST — DIESEL VEHICLE</div>
          <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>Free Acceleration Smoke Test</div>
          {[
            { p:"Vehicle condition", d:"Engine at normal operating temperature. No load on vehicle." },
            { p:"Test method", d:"Probe in exhaust. Accelerate pedal rapidly to full throttle from idle, then release. Repeat 3-4 times." },
            { p:"Parameter measured", d:"Smoke opacity (% opacity or Hartridge Smoke Units HSU)" },
            { p:"BS4 diesel limit", d:"Maximum 65 HSU or 25% opacity (approximate)" },
            { p:"BS6 diesel consideration", d:"DPF equipped vehicles produce nearly zero visible smoke. If smoke visible = possible DPF failure." },
            { p:"Equipment", d:"Opacity meter (smoke meter) — calibrated equipment required" },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}>
              <div style={{ color:C.purple, fontSize:11, fontWeight:700 }}>{x.p}</div>
              <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
            </div>
          ); })}
        </Box>
      </div>

      <Box style={{ borderTop:"2px solid "+C.red }}>
        <div style={{ fontFamily:"monospace", color:C.red, fontSize:11, letterSpacing:1, marginBottom:12 }}>EMISSION VIOLATIONS — MV ACT PENALTIES</div>
        <DTable
          heads={["Violation","Section","First Offence","Repeat Offence"]}
          cols={[C.soft, C.yellow, C.orange, C.red]}
          rows={[
            ["Driving vehicle violating emission norms","Sec 182A","Rs 1,000","Rs 2,000"],
            ["Vehicle in unsafe condition (includes emission)","Sec 190","Rs 1,000-5,000","Rs 10,000 if accident"],
            ["No PUC certificate (general penalty)","Sec 177","Rs 500","Rs 1,500"],
            ["ARTO can direct vehicle off road","Sec 207","Compounding offence","Prosecution"],
          ]}
          hi={[0]}
        />
      </Box>
    </div>
  );
}

function EVsec() {
  return (
    <div>
      <STitle icon="⚡" title="ELECTRIC AND HYBRID VEHICLES" sub="BEV, HEV, PHEV, FCEV + FAME-II policy — exam-relevant facts" color={C.blue} />
      <div style={{ display:"grid", gap:14, marginBottom:20 }}>
        {[
          {
            name:"BEV — Battery Electric Vehicle", color:C.blue, icon:"🔋",
            desc:"100% electric. No internal combustion engine. Battery stores energy, electric motor drives wheels. Zero tailpipe emissions.",
            points:["Battery: Lithium-ion (LiFePO4 or NMC chemistry). Typical capacity: 30-100 kWh","Motor: AC induction or PMSM (Permanent Magnet Synchronous Motor)","Range: 150-600 km per charge depending on battery size","Charging: AC (slow, home charger) or DC fast charging (CCS2/CHAdeMO/Bharat DC-001)","No clutch, no gearbox — single-speed reduction gear only","Examples: Tata Nexon EV, MG ZS EV, Ather 450X scooter, Tata Tigor EV"],
          },
          {
            name:"HEV — Hybrid Electric Vehicle (Strong Hybrid)", color:C.lime, icon:"🔄",
            desc:"IC engine + electric motor + small battery. Cannot be plugged in. Battery charged by regenerative braking and engine. Automatic mode switching.",
            points:["Battery charged only by: (1) regenerative braking and (2) engine running a generator","Cannot be plugged in for charging (unlike PHEV)","EV mode: short distances at low speed (typically 1-3 km only)","Most fuel saving in city stop-start traffic (regenerative braking recaptures energy)","Toyota Prius = world's first mass-market hybrid (1997). Toyota Camry, Honda City e:HEV in India","Mild hybrid (48V MHEV): smaller motor, only assists engine — cannot drive wheels alone"],
          },
          {
            name:"PHEV — Plug-in Hybrid Electric Vehicle", color:C.teal, icon:"🔌",
            desc:"Like HEV but with much larger battery that can also be charged from external power socket. Can drive on EV mode for 40-80 km.",
            points:["Can run on pure EV mode for 40-80 km (larger battery than regular HEV)","Plugs into AC charger for overnight top-up","Also has IC engine for extended range when battery depleted","Best of both worlds: EV for daily city commute, IC for long highway trips","Examples: BMW 530e, Volvo XC60 T8 Recharge, Jeep Wrangler 4xe"],
          },
          {
            name:"FCEV — Fuel Cell Electric Vehicle", color:C.purple, icon:"💧",
            desc:"Hydrogen fuel cell generates electricity electrochemically. Electric motor drives wheels. Only emission is water vapour. Very early stage in India.",
            points:["Hydrogen tank stores H2 gas under high pressure (700 bar)","Fuel cell stack: H2 + O2 → electricity + water (electrochemical reaction)","No combustion — silent, vibration-free","Very long range (500-800 km) and fast refuelling (3-5 minutes)","Infrastructure challenge: very few hydrogen stations in India","Toyota Mirai is the benchmark FCEV. NTPC testing hydrogen buses in India"],
          },
        ].map(function(v,i) { return (
          <Box key={i} style={{ borderLeft:"4px solid "+v.color }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:28 }}>{v.icon}</span>
              <div>
                <div style={{ color:v.color, fontSize:16, fontWeight:700 }}>{v.name}</div>
              </div>
            </div>
            <p style={{ color:C.text, fontSize:13, lineHeight:1.7, marginBottom:10 }}>{v.desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
              {v.points.map(function(pt,j) { return (
                <div key={j} style={{ display:"flex", gap:8, padding:"5px 8px", background:C.bg, borderRadius:6 }}>
                  <span style={{ color:v.color, flexShrink:0, fontSize:10, marginTop:2 }}>▸</span>
                  <span style={{ color:C.soft, fontSize:12, lineHeight:1.5 }}>{pt}</span>
                </div>
              ); })}
            </div>
          </Box>
        ); })}
      </div>

      <Box style={{ borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>FAME-II — FASTER ADOPTION AND MANUFACTURING OF HYBRID AND ELECTRIC VEHICLES</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            {[
              { t:"Full name", d:"Faster Adoption and Manufacturing of Hybrid and Electric Vehicles Scheme Phase II" },
              { t:"Launched", d:"April 1, 2019 by Ministry of Heavy Industries, Government of India" },
              { t:"Budget", d:"Rs 10,000 crore over 3 years (2019-2022, extended)" },
              { t:"Primary focus", d:"Electric buses for public transport, electric 2-wheelers, 3-wheelers, commercial vehicles" },
              { t:"Subsidy structure", d:"Demand incentive per kWh of battery capacity. Higher subsidy for public transport vehicles." },
              { t:"Maharashtra role", d:"MSRTC procured electric buses under FAME-II. Pune, Mumbai got electric bus fleets." },
            ].map(function(x,i) { return (
              <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}>
                <div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>{x.t}</div>
                <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
              </div>
            ); })}
          </div>
          <div>
            <div style={{ color:C.green, fontWeight:700, fontSize:13, marginBottom:10 }}>EV Registration Rules (MV Act)</div>
            {[
              "Electric vehicles registered with GREEN number plate (not white/yellow)",
              "Commercial EVs: green plate with yellow text",
              "Private EVs: green plate with white text",
              "No permit required for commercial EVs below certain capacity in some states",
              "Road tax waiver for EVs in most states including Maharashtra",
              "EV registration exempted from some RTO fees to promote adoption",
              "ARTO must know: EVs require fitness certificate same as ICE vehicles",
              "EV battery health check being incorporated into fitness inspection process",
            ].map(function(s,i) { return (
              <div key={i} style={{ display:"flex", gap:8, padding:"6px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.text }}>
                <span style={{ color:C.green, flexShrink:0 }}>→</span>{s}
              </div>
            ); })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"📅", title:"BS Norms Timeline — Never Forget", color:C.green,
      items:[
        "BS1(2000) → BS2(2001) → BS3(2005/2010) → BS4(2017) → BS6(April 1, 2020)",
        "INDIA SKIPPED BS5 — went directly from BS4 to BS6. Supreme Court decision in 2016.",
        "April 1, 2020 is the most important date — mandatory BS6 for ALL new vehicles.",
        "BS6 fuel sulphur = 10 ppm. BS4 fuel sulphur = 50 ppm. BS6 is 5x cleaner.",
        "Before BS1 (pre-2000): No norms. Vehicles had no emission controls whatsoever.",
        "Memory trick: BS6 came on April Fools Day 2020 — not a joke, it really did!",
      ],
    },
    {
      icon:"🔧", title:"Emission Devices — Which Engine Gets What?", color:C.lime,
      items:[
        "TWC (Three-Way Catalyst) = PETROL ONLY. Three pollutants: CO + HC + NOx.",
        "DOC + DPF + SCR = DIESEL. Order in exhaust: DOC first, DPF second, SCR last.",
        "EGR = BOTH petrol and diesel. Lowers combustion temp = less NOx.",
        "EVAP = PETROL ONLY. Captures fuel vapour. Charcoal canister stores HC vapour.",
        "AdBlue/DEF = DIESEL ONLY (with SCR). Blue cap tank. Urea + water solution.",
        "Memory: Diesel needs THREE devices (DOC, DPF, SCR). Petrol needs ONE (TWC).",
        "DPF makes diesel cars produce zero visible smoke when working correctly.",
      ],
    },
    {
      icon:"🌿", title:"Petrol vs Diesel Pollutants — Zero Confusion", color:C.yellow,
      items:[
        "Petrol = CO and HC problem (incomplete combustion of homogeneous mixture).",
        "Diesel = NOx and PM/soot problem (high temperature + heterogeneous combustion).",
        "CO is the silent killer — colourless, odourless, toxic. Petrol engine primary emission.",
        "NOx forms above 1800°C. Diesel runs hotter = more NOx. EGR and SCR solve this.",
        "PM2.5 (fine particles) from diesel penetrate deepest into lungs — most health-damaging.",
        "CO2 is not controlled by emission norms — it is controlled by CAFE fuel efficiency norms.",
      ],
    },
    {
      icon:"💡", title:"OBD and PUC — ARTO Exam Essentials", color:C.blue,
      items:[
        "OBD-II is MANDATORY for all BS6 vehicles. Monitors ALL emission-related systems.",
        "MIL = Malfunction Indicator Lamp = Check Engine Light. If ON = emission system fault.",
        "As ARTO: MIL ON during inspection = FAIL fitness certificate. Emission system compromised.",
        "PUC certificate valid for 6 months (vehicles over 1 year old). NEW vehicle: 1 year PUC.",
        "PUC test: Petrol = idle CO measurement. Diesel = free acceleration smoke opacity test.",
        "No valid PUC: Sec 182A penalty (Rs 1,000 first, Rs 2,000 repeat).",
        "AdBlue must be topped up every 10,000-15,000 km. If empty: limp mode (restricted power).",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Emission Norms", color:C.green,
      items:[
        "Q: When did BS6 become mandatory → April 1, 2020",
        "Q: India skipped which BS norm → BS5 (went directly BS4 to BS6)",
        "Q: Sulphur content in BS6 fuel → 10 ppm",
        "Q: Which technology uses AdBlue → SCR (Selective Catalytic Reduction)",
        "Q: TWC simultaneously controls which pollutants → CO, HC, and NOx",
        "Q: Primary pollutant from diesel engines → NOx and PM (particulate matter/soot)",
        "Q: Primary pollutant from petrol engines → CO and HC",
        "Q: DPF is used for which purpose → Trapping diesel soot particles",
        "Q: PUC certificate validity for vehicle over 1 year → 6 months",
        "Q: What does OBD stand for → On-Board Diagnostics",
        "Q: Full form of FAME → Faster Adoption and Manufacturing of Hybrid and Electric Vehicles",
        "Q: BS6 diesel NOx reduction from BS4 → 68% reduction",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Emission Norms and BS6" color={C.yellow} />
      <div style={{ display:"grid", gap:14 }}>
        {tricks.map(function(s,i) { return (
          <Box key={i} style={{ borderLeft:"4px solid "+s.color }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:22 }}>{s.icon}</span>
              <span style={{ fontSize:17, color:s.color, fontWeight:700, letterSpacing:1 }}>{s.title}</span>
            </div>
            {s.items.map(function(item,j) { return (
              <div key={j} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid "+C.border+"30", alignItems:"flex-start" }}>
                <span style={{ color:s.color, flexShrink:0, fontSize:11, marginTop:2 }}>▸</span>
                <span style={{ color:C.text, fontSize:13, lineHeight:1.6 }}>{item}</span>
              </div>
            ); })}
          </Box>
        ); })}
      </div>
    </div>
  );
}

// ── MAIN APP ──
var SECS = [
  { id:"intro",    icon:"🌿", label:"Intro and Pollutants" },
  { id:"bsnorms",  icon:"📊", label:"BS Norms Timeline" },
  { id:"devices",  icon:"🔧", label:"Emission Control Devices" },
  { id:"puc",      icon:"📜", label:"PUC Certificate" },
  { id:"ev",       icon:"⚡", label:"Electric and Hybrid Vehicles" },
  { id:"tricks",   icon:"💡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("intro");
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
    if (sec==="intro") return <IntroSec />;
    if (sec==="bsnorms") return <BSNormsSec />;
    if (sec==="devices") return <EmissionDevicesSec />;
    if (sec==="puc") return <PUCsec />;
    if (sec==="ev") return <EVsec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#162416;border-radius:3px}"].join("")}</style>

      <div style={{ background:"#040806", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:920, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🌿</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>EMISSION NORMS AND BS6</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 5 of 12 · BS Norms · TWC · DPF · SCR · AdBlue · PUC · EV Policy</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="8% WEIGHTAGE" color={C.green} />
              <Tag label="8/10 YEARS" color={C.lime} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) { return (
              <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                padding:"11px 22px", border:"none", cursor:"pointer",
                fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                color:tab===t.id?C.green:C.muted,
                borderBottom:"3px solid "+(tab===t.id?C.green:"transparent"),
                transition:"all 0.15s",
              }}>{t.l}</button>
            ); })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:920, margin:"0 auto", padding:"28px 20px" }}>

        {tab==="learn" && (
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:10, color:C.muted, letterSpacing:2, marginBottom:10 }}>SECTIONS</div>
              {SECS.map(function(s) { return (
                <div key={s.id} onClick={function(){ setSec(s.id); }} style={{
                  padding:"9px 12px", borderRadius:8, cursor:"pointer", marginBottom:3,
                  background:sec===s.id?C.green+"15":"transparent",
                  border:"1px solid "+(sec===s.id?C.green+"50":"transparent"),
                  color:sec===s.id?C.green:C.soft,
                  fontSize:12, fontWeight:sec===s.id?600:400, transition:"all 0.12s",
                }}>
                  <span style={{ marginRight:8 }}>{s.icon}</span>{s.label}
                </div>
              ); })}
            </div>
            <div>{renderSec()}</div>
          </div>
        )}

        {tab==="practice" && (
          <div>
            <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3, marginBottom:20 }}>PRACTICE — 12 QUESTIONS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.blue}].map(function(s) { return (
                <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                  <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                  <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                </Box>
              ); })}
            </div>

            {done ? (
              <Box glow={C.green} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.green }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🌿":sc.c>=7?"🌱":"📚"}</div>
                <div style={{ fontSize:26, color:C.green, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"EMISSION EXPERT!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:420, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Outstanding! Emission norms mastered. Ready for Topic 6.":sc.c>=7?"Good. Review BS6 mandatory technologies and PUC rules.":"Revise BS norms timeline, emission devices, and which engine uses which device."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.green, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("tricks"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.green, background:"transparent", color:C.green, fontWeight:700, cursor:"pointer", fontSize:14 }}>SEE TIPS</button>
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
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.green+","+C.lime+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.green, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.green, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.green+","+C.lime+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
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