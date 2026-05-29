import { useState } from "react";

var C = {
  bg:"#080A06", card:"#101408", border:"#1C2810",
  fire:"#EA580C", ice:"#38BDF8", green:"#16A34A",
  yellow:"#EAB308", purple:"#7C3AED", red:"#DC2626",
  teal:"#0D9488", lime:"#65A30D", blue:"#2563EB",
  text:"#EEF5E8", muted:"#2A3820", soft:"#6A8858",
};

function Tag(props) {
  var c = props.color || C.fire;
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
  var c = props.color || C.fire;
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
  var cols = props.cols || [C.soft, C.fire, C.ice, C.green, C.yellow];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#060A04" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.fire+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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
  var c = props.color || C.fire;
  return (
    <Box style={{ borderLeft:"3px solid "+c, padding:16 }}>
      <div style={{ color:c, fontFamily:"monospace", fontSize:12, fontWeight:700, marginBottom:8 }}>{props.name}</div>
      <div style={{ background:C.bg, borderRadius:8, padding:"10px 16px", fontFamily:"monospace", fontSize:14, color:c, textAlign:"center", fontWeight:700, marginBottom:10 }}>{props.formula}</div>
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

var QS = [
  {
    id:1, level:"BASIC", topic:"Laws of Thermodynamics",
    q:"The First Law of Thermodynamics states that:",
    opts:[
      "Heat cannot flow from cold to hot body spontaneously",
      "Energy can neither be created nor destroyed — only converted from one form to another",
      "The entropy of the universe always decreases",
      "Absolute zero temperature cannot be reached",
    ],
    ans:1,
    exp:"First Law of Thermodynamics = Law of Conservation of Energy.\n\nEnergy can neither be CREATED nor DESTROYED — it can only be CONVERTED from one form to another.\n\nFor a thermodynamic system: Q = ΔU + W\nWhere: Q = heat added to system, ΔU = change in internal energy, W = work done by system\n\nApplication to engines: Heat energy from fuel combustion is converted to:\n- Useful mechanical work (about 25-40% for IC engines)\n- Heat rejected to environment (60-75% — exhaust + cooling)\n\nThe first law tells us WHY no engine can be more than 100% efficient — energy output cannot exceed energy input.",
    tip:"First Law = Energy conservation. Q = ΔU + W. In IC engines: fuel energy = work output + heat rejected. No engine can be more than 100% efficient (you cannot create energy from nothing). This law explains why thermal efficiency is always less than 100%.",
  },
  {
    id:2, level:"BASIC", topic:"Laws of Thermodynamics",
    q:"The Second Law of Thermodynamics is best described by which statement?",
    opts:[
      "Energy is always conserved in any process",
      "Heat always flows spontaneously from a hotter body to a cooler body — not the reverse",
      "Work and heat are interconvertible at equal rates",
      "The internal energy of an ideal gas depends only on temperature",
    ],
    ans:1,
    exp:"Second Law of Thermodynamics has multiple equivalent statements:\n\nCLAUSIUS STATEMENT: Heat cannot flow spontaneously from a COLD body to a HOT body without external work input. (This is why refrigerators need electricity — they force heat to flow against natural direction.)\n\nKELVIN-PLANCK STATEMENT: It is impossible to construct a heat engine that operates in a cycle and produces work while exchanging heat with only ONE reservoir (thermal reservoir). Some heat must always be rejected.\n\nENTROPY STATEMENT: The entropy of an isolated system always increases or remains constant — never decreases (for natural processes).\n\nPractical meaning for engines: NO heat engine can be 100% efficient. Some heat MUST be rejected to a cold reservoir. This sets the maximum theoretical efficiency (Carnot efficiency).",
    tip:"Second Law: Heat flows HOT to COLD naturally. Reverse needs work (refrigerator). No engine can be 100% efficient — must reject some heat. Carnot cycle = maximum possible efficiency between two temperatures. Entropy = measure of disorder — always increases in natural processes.",
  },
  {
    id:3, level:"BASIC", topic:"Carnot Cycle",
    q:"A Carnot engine operates between a hot source at 500 K and cold sink at 300 K. What is the maximum possible (Carnot) efficiency?",
    opts:["30%","40%","60%","50%"],
    ans:1,
    exp:"Carnot efficiency formula:\nη_Carnot = 1 − (T_cold / T_hot) = 1 − (T_L / T_H)\n\nT_H = 500 K (hot source temperature)\nT_L = 300 K (cold sink temperature)\n\nη_Carnot = 1 − (300/500) = 1 − 0.6 = 0.4 = 40%\n\nThis means: even theoretically, this engine cannot exceed 40% efficiency.\n\nKey facts about Carnot cycle:\n- It is the most efficient possible cycle between two given temperatures\n- No real engine can equal Carnot efficiency (only theoretical)\n- Carnot cycle consists of: 2 isothermal processes + 2 adiabatic processes\n- Higher temperature difference = higher Carnot efficiency\n- Carnot engine: 40% efficiency means 60% of heat input is rejected to cold sink",
    tip:"Carnot efficiency = 1 − (T_cold/T_hot). MUST use KELVIN (not Celsius). Convert: K = °C + 273. Higher temperature difference = higher efficiency. Real engines always have efficiency LESS than Carnot. To increase efficiency: increase T_hot OR decrease T_cold.",
  },
  {
    id:4, level:"MEDIUM", topic:"Refrigeration",
    q:"In a vapour compression refrigeration cycle, the refrigerant absorbs heat from the refrigerated space in which component?",
    opts:["Compressor","Condenser","Expansion valve","Evaporator"],
    ans:3,
    exp:"VAPOUR COMPRESSION REFRIGERATION CYCLE — 4 components:\n\n1. COMPRESSOR: Compresses low-pressure vapour refrigerant to high pressure. Increases temperature too. Work input here.\n\n2. CONDENSER: High-pressure, high-temperature refrigerant vapour gives up heat to SURROUNDINGS (room air or cooling water). Refrigerant condenses to liquid.\n\n3. EXPANSION VALVE (throttle valve): High-pressure liquid passes through narrow orifice. Pressure drops suddenly. Temperature drops dramatically (isenthalpic expansion). Refrigerant becomes cold wet mixture.\n\n4. EVAPORATOR: Cold low-pressure refrigerant ABSORBS HEAT from refrigerated space (food/air inside fridge). Refrigerant evaporates (liquid to vapour). This is where cooling effect occurs.\n\nHeat flow: Refrigerated space → evaporator → compressor → condenser → atmosphere",
    tip:"EVAPORATOR = where cooling happens = absorbs heat FROM refrigerated space. CONDENSER = rejects heat TO surroundings. Mnemonic: 'E-C-E-C' = Evaporator (absorbs), Condenser (rejects). Compressor is the power input. Expansion valve drops pressure and temperature. COP = cooling effect / work input.",
  },
  {
    id:5, level:"MEDIUM", topic:"COP of Refrigerator",
    q:"A refrigerator removes 5 kW of heat from the refrigerated space and requires 2 kW of compressor power. What is the COP of the refrigerator?",
    opts:["0.4","2.5","3.5","7"],
    ans:1,
    exp:"COP (Coefficient of Performance) of a Refrigerator:\nCOP_refrigerator = Refrigerating effect / Work input\nCOP = Q_L / W_net\n\nQ_L = Heat removed from refrigerated space = 5 kW\nW_net = Compressor power input = 2 kW\n\nCOP = 5 / 2 = 2.5\n\nThis means: for every 1 kW of electrical energy input, 2.5 kW of heat is removed from the refrigerated space.\n\nHeat rejected to surroundings:\nQ_H = Q_L + W = 5 + 2 = 7 kW (condenser rejects 7 kW to the room)\n\nNote: COP of refrigerator is NOT limited to 1 (unlike efficiency of heat engine). COP can be greater than 1 — and for good refrigerators is typically 3-5.",
    tip:"COP_refrigerator = Q_L/W (cooling effect/work). COP can be greater than 1! Good household fridge: COP = 3-5. Also: Q_H = Q_L + W (energy balance: heat rejected = heat absorbed + work input). COP_heat pump = Q_H/W = COP_refrigerator + 1 (heat pump gives more than refrigerator COP by exactly 1).",
  },
  {
    id:6, level:"MEDIUM", topic:"Refrigerants",
    q:"Which refrigerant is commonly used in modern automobile air conditioning systems and is classified as HFC (Hydrofluorocarbon) with a low GWP alternative now being introduced?",
    opts:["R-12 (CFC — Freon 12)","R-134a (HFC — Tetrafluoroethane)","R-22 (HCFC — Chlorodifluoromethane)","Ammonia (R-717)"],
    ans:1,
    exp:"R-134a (1,1,1,2-Tetrafluoroethane, HFC-134a) is the standard refrigerant used in automobile AC systems since the 1990s.\n\nWhy R-134a replaced R-12:\n- R-12 (Freon 12) was a CFC — contains chlorine which destroys ozone layer\n- Montreal Protocol (1987) phased out CFCs globally\n- R-134a = HFC (no chlorine) = zero ODP (Ozone Depletion Potential)\n- GWP of R-134a = 1430 (still significant greenhouse gas)\n\nNow R-134a is being replaced by:\n- R-1234yf (HFO — Hydrofluoroolefin): GWP = 4 (much lower). Mandatory in new EU and some Indian vehicles.\n- CO2 (R-744): Used in some premium vehicles. Very low GWP = 1.\n\nRefrigerant characteristics needed:\n- Low boiling point (evaporates easily at low temp)\n- Non-toxic, non-flammable (R-1234yf is slightly flammable)\n- High latent heat of vaporisation\n- Chemically stable, non-corrosive",
    tip:"Automobile AC refrigerant progression: R-12 (CFC, banned — ozone depleting) → R-134a (HFC, current standard, GWP=1430) → R-1234yf (HFO, future, GWP=4). Montreal Protocol banned CFCs. India phasing to R-1234yf for new vehicles. As ARTO: check AC refrigerant type during inspection (should match vehicle specification).",
  },
  {
    id:7, level:"HARD", topic:"Heat Transfer",
    q:"Which mode of heat transfer does NOT require any material medium and can occur in a vacuum?",
    opts:["Conduction","Convection","Radiation","Both conduction and convection"],
    ans:2,
    exp:"RADIATION heat transfer does NOT require any material medium. It is the only mode that can transfer heat through a vacuum.\n\nMechanism: Heat is transferred by electromagnetic waves (infrared radiation). All objects above absolute zero emit radiation. Energy transferred as photons at the speed of light.\n\nExample: Sun heats Earth through the vacuum of space via radiation.\n\nOther modes:\n- CONDUCTION: Requires physical contact between materials. Heat transfers through molecular vibrations. Occurs in solids primarily.\n- CONVECTION: Requires a fluid medium (liquid or gas). Heat transfers by bulk fluid movement. Natural (gravity driven) or forced (fan/pump driven).\n\nIn IC engines all three modes occur:\n- Conduction: through piston, cylinder walls, head\n- Convection: from cylinder walls to coolant\n- Radiation: from hot combustion gases to piston crown and cylinder walls",
    tip:"Three modes: Conduction (needs solid contact), Convection (needs fluid), Radiation (needs NOTHING — works in vacuum). Sun → Earth = radiation through space (vacuum). Engine cooling: conduction through metal + convection to coolant + radiation from exhaust. Fourier law = conduction. Newton cooling law = convection. Stefan-Boltzmann law = radiation.",
  },
  {
    id:8, level:"HARD", topic:"Rankine Cycle",
    q:"The Rankine cycle is used as the ideal thermodynamic model for which type of power plant?",
    opts:["Petrol engine power plants","Nuclear and steam power plants","Gas turbine power plants","Refrigeration plants"],
    ans:1,
    exp:"RANKINE CYCLE is the ideal thermodynamic cycle for STEAM POWER PLANTS (thermal power plants, nuclear power plants).\n\nRankine Cycle components:\n1. BOILER (Steam Generator): Water heated at constant pressure to become steam. Heat added.\n2. TURBINE (Steam Turbine): High-pressure steam expands and does work (rotates turbine). Isentropic process.\n3. CONDENSER: Exhaust steam gives up heat to cooling water. Condenses to liquid water. Heat rejected.\n4. PUMP (Feed Pump): Liquid water pumped from low pressure (condenser) to high pressure (boiler). Small work input.\n\nRankine vs Carnot:\n- Carnot is theoretically more efficient but impractical (two phase processes)\n- Rankine is more practical — liquid pumping is easier than compressing wet mixture\n- Actual Rankine efficiency: 35-45% for modern power plants\n\nImprovements to basic Rankine:\n- Superheating: Heat steam above saturation temperature (higher efficiency, less moisture in turbine)\n- Reheating: Reheat steam between turbine stages\n- Regeneration: Use turbine extraction steam to preheat feedwater",
    tip:"Rankine cycle = steam power plants (coal, nuclear). Components: Boiler → Turbine (work out) → Condenser → Feed pump (small work in) → Boiler. Otto cycle = petrol engine. Diesel cycle = diesel engine. Brayton cycle = gas turbine. Rankine = steam. Remember: each power system has its own ideal cycle.",
  },
  {
    id:9, level:"HARD", topic:"Psychrometry",
    q:"In psychrometry (study of moist air), the DRYB BULB TEMPERATURE and WET BULB TEMPERATURE of air are equal when:",
    opts:[
      "Air is at 100% humidity (saturated air)",
      "Air is at 0% relative humidity (completely dry air)",
      "Air temperature is exactly 25°C",
      "Air pressure is atmospheric",
    ],
    ans:0,
    exp:"When air is SATURATED (Relative Humidity = 100%, dew point = dry bulb temperature):\n- The wet bulb temperature equals the dry bulb temperature\n- The wet cloth on the wet bulb thermometer cannot evaporate water (air is already fully saturated)\n- No evaporative cooling occurs\n- Wet bulb depression (DBT − WBT) = 0\n\nPsychrometric terms:\n- DBT (Dry Bulb Temperature): Actual air temperature measured by ordinary thermometer\n- WBT (Wet Bulb Temperature): Temperature measured by thermometer with wet wick — lowered by evaporative cooling\n- Dew Point Temperature: Temperature at which air becomes saturated (RH=100%) when cooled\n- Relative Humidity: Actual moisture / maximum possible moisture at that temperature × 100%\n- Specific Humidity: Mass of water vapour per kg of dry air\n\nRelationship: DBT > WBT ≥ Dew Point Temperature (always, except at 100% RH where all three are equal)",
    tip:"DBT = WBT = Dew point ONLY when RH = 100% (saturated air). If air is dry (low RH): DBT much higher than WBT (more evaporation = more cooling of wet bulb). Practical: humid days feel uncomfortable because low DBT-WBT difference means body sweat cannot evaporate well. AC design uses psychrometric chart.",
  },
  {
    id:10, level:"HARD", topic:"Refrigerant Properties",
    q:"The COP of a Carnot refrigerator operating between temperatures T_L (cold) = 250 K and T_H (hot) = 300 K is:",
    opts:["5","4","6","2"],
    ans:0,
    exp:"COP of Carnot Refrigerator:\nCOP_Carnot = T_L / (T_H − T_L)\n\nT_L = 250 K (cold reservoir — refrigerated space)\nT_H = 300 K (hot reservoir — surroundings)\n\nCOP_Carnot = 250 / (300 − 250) = 250 / 50 = 5\n\nThis means: theoretically maximum, for every 1 kW of work input, 5 kW of heat can be removed from the cold space.\n\nNote: Real refrigerators always have COP LESS than Carnot COP.\n\nFor heat pump operating between same temperatures:\nCOP_HP = T_H / (T_H − T_L) = 300 / 50 = 6\n\nRelationship: COP_HP = COP_Refrigerator + 1 = 5 + 1 = 6 ✓\n\nCarnot refrigerator gives maximum possible COP for given temperatures.",
    tip:"COP Carnot refrigerator = T_L / (T_H − T_L). COP Carnot heat pump = T_H / (T_H − T_L). Always: COP_HP = COP_Refrigerator + 1. Real COP is always less than Carnot COP. MUST use Kelvin temperatures (K = °C + 273).",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Automobile AC System",
    q:"In a typical automobile air conditioning system, which component is driven by the engine and is responsible for increasing refrigerant pressure?",
    opts:["Condenser","Expansion valve (TXV)","AC Compressor (belt-driven by engine)","Receiver-dryer"],
    ans:2,
    exp:"AUTOMOBILE AC SYSTEM components:\n\n1. AC COMPRESSOR: Belt-driven by engine crankshaft via serpentine belt. Contains magnetic clutch (engages/disengages on demand). Compresses low-pressure refrigerant vapour to high pressure. The ONLY power-consuming component (parasitic load on engine — reduces fuel economy by 5-15% when AC is ON).\n\n2. CONDENSER: Located in front of radiator. High-pressure hot refrigerant gives up heat to ambient air passing through. Refrigerant condenses to liquid.\n\n3. RECEIVER-DRYER: Stores liquid refrigerant. Contains desiccant to absorb moisture. Acts as reservoir.\n\n4. EXPANSION VALVE (TXV or orifice tube): Controls refrigerant flow into evaporator. Pressure and temperature drop.\n\n5. EVAPORATOR: Inside cabin behind dashboard. Absorbs heat from cabin air. Air becomes cool and dry. Blower fan circulates air.\n\n6. THERMOSTATIC EXPANSION VALVE (TXV): Precisely controls refrigerant flow based on evaporator outlet temperature.",
    tip:"AC compressor = engine-driven via belt. Magnetic clutch = can engage/disengage without stopping belt. AC ON = 5-15% extra fuel consumption. Compressor failure = most common AC fault (compressor seizure). Condenser fins clogged = AC blows warm air. Low refrigerant = AC not cooling (check for leaks first).",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Steam Properties",
    q:"At what temperature does water boil at standard atmospheric pressure (1.01325 bar), and what is this condition called in thermodynamics?",
    opts:[
      "90°C — subcooled liquid condition",
      "100°C — saturated condition (saturation temperature at 1 atm)",
      "110°C — superheated condition",
      "50°C — dew point condition",
    ],
    ans:1,
    exp:"Water at standard atmospheric pressure (1.01325 bar = 101.325 kPa):\n- Saturation temperature = 100°C\n- At this temperature: water boils and steam is generated at constant temperature\n- This is the SATURATED condition\n\nThermodynamic states of water:\n\n1. SUBCOOLED (Compressed) LIQUID: Temperature below saturation temperature at that pressure. Pure liquid. Example: water at 20°C at 1 atm.\n\n2. SATURATED LIQUID: Just at boiling point, still liquid. x (quality) = 0.\n\n3. WET STEAM (Two-phase mixture): Mixture of liquid and vapour during boiling. Temperature constant at saturation temp. x = 0 to 1.\n\n4. SATURATED VAPOUR (Dry Steam): Just fully evaporated. x = 1. Any further heat addition superheats it.\n\n5. SUPERHEATED STEAM: Temperature above saturation temperature. Used in steam turbines (avoids moisture damage to blades).\n\nBoiling point changes with pressure:\n- Higher pressure → higher boiling point (pressure cooker principle)\n- Lower pressure → lower boiling point (mountains: lower atmospheric pressure → lower boiling point → takes longer to cook)",
    tip:"Saturation temperature of water at 1 atm = 100°C. Higher pressure = higher boiling point. Steam quality x: 0 = all liquid, 1 = all vapour. Superheated steam (x>1 not defined — just 'superheated') is used in turbines. Pressure cooker uses high pressure to raise boiling point and cook faster.",
  },
];

function ThermolawsSec() {
  return (
    <div>
      <STitle icon="🔥" title="LAWS OF THERMODYNAMICS" sub="Zeroth, First, Second, Third Laws — principles and applications" color={C.fire} />
      <Box style={{ marginBottom:20, borderTop:"3px solid "+C.fire }}>
        <div style={{ fontFamily:"monospace", color:C.fire, fontSize:11, letterSpacing:1.5, marginBottom:14 }}>FOUR LAWS OF THERMODYNAMICS</div>
        <div style={{ display:"grid", gap:14 }}>
          {[
            {
              law:"ZEROTH LAW", col:C.teal, icon:"0️⃣",
              statement:"If body A is in thermal equilibrium with body B, and body B is in thermal equilibrium with body C, then body A is also in thermal equilibrium with body C.",
              meaning:"Defines TEMPERATURE as a measurable property. Forms the basis of thermometry. If you can compare temperatures with a thermometer — this law is why.",
              example:"Room temperature thermometer: if thermometer reads same value for two objects, those objects are at same temperature.",
            },
            {
              law:"FIRST LAW", col:C.fire, icon:"1️⃣",
              statement:"Energy can neither be created nor destroyed — only converted from one form to another. Q = ΔU + W",
              meaning:"Conservation of energy. In a cycle: net heat = net work. For any process: heat added = increase in internal energy + work done by system.",
              example:"IC engine: Fuel chemical energy (Q_in) = Shaft work (W) + Heat rejected to exhaust and coolant (Q_out). Cannot get more work than heat input.",
            },
            {
              law:"SECOND LAW", col:C.yellow, icon:"2️⃣",
              statement:"Clausius: Heat flows spontaneously from hot to cold, never reverse without work. Kelvin-Planck: No heat engine can be 100% efficient.",
              meaning:"Defines direction of processes. Introduces ENTROPY (measure of disorder). Quality of energy degrades over time. Sets maximum (Carnot) efficiency.",
              example:"Refrigerator needs electricity to move heat from cold food to warm room (against natural direction). Car engine must reject heat to atmosphere — cannot convert all fuel energy to shaft work.",
            },
            {
              law:"THIRD LAW", col:C.ice, icon:"3️⃣",
              statement:"The entropy of a pure crystalline substance approaches zero as the absolute temperature approaches absolute zero (0 K = -273.15°C).",
              meaning:"Absolute zero (0 K) cannot be reached in practice. Provides absolute reference for entropy calculations.",
              example:"Cooling helium to near absolute zero in quantum computing. Perfectly ordered crystal at 0 K would have zero entropy (zero disorder).",
            },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"4px solid "+x.col }}>
                <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                  <span style={{ fontSize:24 }}>{x.icon}</span>
                  <div style={{ color:x.col, fontWeight:700, fontSize:15, letterSpacing:1 }}>{x.law}</div>
                </div>
                <div style={{ color:C.text, fontSize:13, lineHeight:1.8, marginBottom:8, fontStyle:"italic" }}>"{x.statement}"</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.7, marginBottom:6 }}><strong style={{ color:x.col }}>Meaning: </strong>{x.meaning}</div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.7 }}><strong style={{ color:C.yellow }}>Example: </strong>{x.example}</div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>THERMODYNAMIC PROCESSES AND THEIR PROPERTIES</div>
        <DTable
          heads={["Process","Condition","Work (W)","Heat (Q)","Example"]}
          cols={[C.soft, C.green, C.fire, C.ice, C.yellow]}
          rows={[
            ["Isothermal","T = constant","W = Q (all heat becomes work)","Q = nRT ln(V2/V1)","Slow expansion in cylinder"],
            ["Adiabatic","Q = 0 (no heat exchange)","W = −ΔU = change in internal energy","Q = 0","Rapid compression, turbine"],
            ["Isobaric","P = constant","W = P(V2−V1)","Q = mCp(T2−T1)","Boiling water at 1 atm"],
            ["Isochoric (Isovolumetric)","V = constant, W = 0","W = 0","Q = mCv(T2−T1)","Otto cycle heat addition"],
            ["Polytropic","PV^n = constant","Intermediate","Between adiabatic and isothermal","Real engine processes"],
          ]}
          hi={[1,3]}
        />
      </Box>
    </div>
  );
}

function ThermoCyclesSec() {
  var [at, setAt] = useState(0);
  var cycles = [
    {
      name:"Carnot Cycle", col:C.yellow, icon:"⭐",
      desc:"Theoretical maximum efficiency cycle. Cannot be achieved in practice but sets upper limit for all real heat engines.",
      processes:["1→2: Isothermal heat addition at T_H (from hot source)","2→3: Isentropic (adiabatic reversible) expansion — work output","3→4: Isothermal heat rejection at T_L (to cold sink)","4→1: Isentropic compression — work input"],
      formula:"η_Carnot = 1 − (T_L / T_H)    [temperatures in Kelvin]",
      key:"Max possible efficiency between T_H and T_L. Real engines always less efficient than Carnot. To improve: raise T_H or lower T_L.",
    },
    {
      name:"Otto Cycle", col:C.fire, icon:"🚗",
      desc:"Ideal cycle for spark ignition (petrol) engines. Heat addition at constant volume. Four processes.",
      processes:["1→2: Isentropic compression (compression stroke)","2→3: Constant volume heat addition (combustion — spark ignites)","3→4: Isentropic expansion (power stroke)","4→1: Constant volume heat rejection (exhaust blowdown)"],
      formula:"η_Otto = 1 − (1/r)^(γ−1)    r = compression ratio, γ = 1.4",
      key:"Efficiency depends ONLY on compression ratio. Higher r = higher η. For r=8: η=56.5%. For r=10: η=60.2%.",
    },
    {
      name:"Diesel Cycle", col:C.blue, icon:"🚌",
      desc:"Ideal cycle for compression ignition (diesel) engines. Heat addition at constant pressure. Higher compression ratio than Otto.",
      processes:["1→2: Isentropic compression (CR 14-22:1 — air to 700-900°C)","2→3: Constant PRESSURE heat addition (fuel injected and burns)","3→4: Isentropic expansion (power stroke)","4→1: Constant volume heat rejection (exhaust blowdown)"],
      formula:"η_Diesel = 1 − (1/r^(γ−1)) × [(r_c^γ − 1) / (γ(r_c − 1))]",
      key:"r_c = cut-off ratio (V3/V2). For same CR: η_Otto > η_Diesel. But diesel uses higher CR in practice → higher real efficiency.",
    },
    {
      name:"Rankine Cycle", col:C.teal, icon:"⚡",
      desc:"Ideal cycle for steam power plants. Uses water/steam as working fluid. Basis of all thermal and nuclear power stations.",
      processes:["1→2: Isentropic pumping — water pumped from condenser to boiler pressure","2→3: Isobaric heat addition in boiler — water heated and evaporated to steam","3→4: Isentropic expansion in steam turbine — work output","4→1: Isobaric heat rejection in condenser — steam condensed to water"],
      formula:"η_Rankine = (h3 − h4 − (h2 − h1)) / (h3 − h2)    h = enthalpy",
      key:"Working fluid changes phase (liquid ↔ vapour). Pump work much smaller than turbine work. Real efficiency 35-45%. Improvements: superheating, reheating, regeneration.",
    },
    {
      name:"Brayton Cycle (Gas Turbine)", col:C.purple, icon:"✈️",
      desc:"Ideal cycle for gas turbines and jet engines. All processes in continuous flow. High power-to-weight ratio.",
      processes:["1→2: Isentropic compression in compressor","2→3: Constant pressure heat addition in combustion chamber","3→4: Isentropic expansion in turbine (turbine work > compressor work = net output)","4→1: Constant pressure heat rejection (exhaust to atmosphere)"],
      formula:"η_Brayton = 1 − (1/r_p)^((γ−1)/γ)    r_p = pressure ratio",
      key:"Pressure ratio determines efficiency. Higher pressure ratio = more efficient. Used in: aircraft engines, power generation gas turbines, turbocharged IC engines follow Brayton for turbocharger analysis.",
    },
    {
      name:"Refrigeration Cycle (VCR)", col:C.ice, icon:"❄️",
      desc:"Vapour Compression Refrigeration — standard for all refrigerators, AC systems, and heat pumps.",
      processes:["1→2: Isentropic compression in compressor — work input","2→3: Constant pressure heat rejection in condenser — heat to surroundings","3→4: Throttling (isenthalpic) in expansion valve — pressure and temperature drop","4→1: Constant pressure heat absorption in evaporator — cooling effect"],
      formula:"COP_ref = Q_L / W = Q_L / (Q_H − Q_L)    Carnot COP = T_L/(T_H−T_L)",
      key:"Reverse of Rankine in concept. COP can be > 1. Evaporator absorbs heat (cooling). Condenser rejects heat. Compressor is the work input. Same hardware works as refrigerator OR heat pump.",
    },
  ];
  var cy = cycles[at];
  return (
    <div>
      <STitle icon="🔄" title="THERMODYNAMIC CYCLES" sub="Carnot, Otto, Diesel, Rankine, Brayton, Refrigeration — all cycles" color={C.yellow} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:20 }}>
        {cycles.map(function(c,i) {
          return (
            <button key={i} onClick={function(){ setAt(i); }} style={{
              padding:"10px 12px", borderRadius:10, textAlign:"left",
              border:"2px solid "+(at===i?c.col:C.border),
              background:at===i?c.col+"12":C.card, cursor:"pointer", transition:"all 0.15s",
            }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{c.icon}</div>
              <div style={{ fontFamily:"monospace", fontSize:10, color:at===i?c.col:C.muted, fontWeight:700 }}>{c.name}</div>
            </button>
          );
        })}
      </div>
      <Box key={at} glow={cy.col} style={{ borderTop:"3px solid "+cy.col }}>
        <div style={{ color:cy.col, fontSize:18, fontWeight:700, marginBottom:8 }}>{cy.icon} {cy.name}</div>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.8, marginBottom:16 }}>{cy.desc}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div>
            <div style={{ fontFamily:"monospace", color:cy.col, fontSize:10, letterSpacing:1, marginBottom:10 }}>FOUR PROCESSES</div>
            {cy.processes.map(function(p,i) {
              return (
                <div key={i} style={{ padding:"8px 12px", background:C.bg, borderRadius:8, marginBottom:6, borderLeft:"2px solid "+cy.col+"60", fontSize:12, color:C.text, lineHeight:1.5 }}>
                  {p}
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:10, letterSpacing:1, marginBottom:10 }}>EFFICIENCY FORMULA</div>
            <div style={{ background:C.bg, borderRadius:8, padding:"12px 14px", fontFamily:"monospace", fontSize:13, color:cy.col, fontWeight:700, marginBottom:16, textAlign:"center", lineHeight:1.8 }}>{cy.formula}</div>
            <div style={{ fontFamily:"monospace", color:C.green, fontSize:10, letterSpacing:1, marginBottom:8 }}>KEY INSIGHT</div>
            <div style={{ background:C.bg, borderRadius:8, padding:"12px 14px", color:C.text, fontSize:13, lineHeight:1.7 }}>{cy.key}</div>
          </div>
        </div>
      </Box>
      <Box style={{ marginTop:20, borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>CYCLE COMPARISON — QUICK REFERENCE</div>
        <DTable
          heads={["Cycle","Engine Type","Heat Addition","Efficiency Formula","Typical Efficiency"]}
          cols={[C.soft, C.fire, C.ice, C.green, C.yellow, C.purple]}
          rows={[
            ["Carnot","Theoretical only","Isothermal","1 − T_L/T_H","Maximum possible"],
            ["Otto","Petrol SI engine","Constant Volume","1 − (1/r)^(γ−1)","25-35% actual"],
            ["Diesel","Diesel CI engine","Constant Pressure","Complex (cut-off ratio)","35-45% actual"],
            ["Dual/Mixed","High speed diesel","Both V and P","Between Otto and Diesel","35-42% actual"],
            ["Rankine","Steam power plant","Constant Pressure (boiler)","h-based calculation","35-45% actual"],
            ["Brayton","Gas turbine, jet engine","Constant Pressure","1 − (1/r_p)^((γ−1)/γ)","30-40% actual"],
          ]}
          hi={[0]}
        />
      </Box>
    </div>
  );
}

function RefrigSec() {
  return (
    <div>
      <STitle icon="❄️" title="REFRIGERATION AND AIR CONDITIONING" sub="VCR cycle, COP, refrigerants, psychrometry, automobile AC" color={C.ice} />
      <Box style={{ marginBottom:20, borderTop:"3px solid "+C.ice }}>
        <div style={{ fontFamily:"monospace", color:C.ice, fontSize:11, letterSpacing:1, marginBottom:12 }}>VAPOUR COMPRESSION REFRIGERATION — COMPLETE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div>
            <svg viewBox="0 0 300 240" style={{ width:"100%" }}>
              <rect width="300" height="240" fill={C.bg} rx="8"/>
              <text x="150" y="16" fill={C.text} fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">VCR CYCLE DIAGRAM</text>
              <rect x="30" y="50" width="70" height="40" rx="5" fill={C.fire} fillOpacity="0.3" stroke={C.fire} strokeWidth="1.5"/>
              <text x="65" y="72" fill={C.fire} fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">CONDENSER</text>
              <text x="65" y="83" fill={C.fire} fontSize="7" textAnchor="middle" fontFamily="monospace">Rejects heat Q_H</text>
              <rect x="200" y="50" width="70" height="40" rx="5" fill={C.purple} fillOpacity="0.3" stroke={C.purple} strokeWidth="1.5"/>
              <text x="235" y="72" fill={C.purple} fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">COMPRESSOR</text>
              <text x="235" y="83" fill={C.purple} fontSize="7" textAnchor="middle" fontFamily="monospace">Work input W</text>
              <rect x="200" y="150" width="70" height="40" rx="5" fill={C.ice} fillOpacity="0.3" stroke={C.ice} strokeWidth="1.5"/>
              <text x="235" y="172" fill={C.ice} fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">EVAPORATOR</text>
              <text x="235" y="183" fill={C.ice} fontSize="7" textAnchor="middle" fontFamily="monospace">Absorbs heat Q_L</text>
              <rect x="30" y="150" width="70" height="40" rx="5" fill={C.yellow} fillOpacity="0.3" stroke={C.yellow} strokeWidth="1.5"/>
              <text x="65" y="172" fill={C.yellow} fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">EXP VALVE</text>
              <text x="65" y="183" fill={C.yellow} fontSize="7" textAnchor="middle" fontFamily="monospace">Pressure drop</text>
              <line x1="100" y1="70" x2="200" y2="70" stroke={C.fire} strokeWidth="2"/>
              <polygon points="195,65 205,70 195,75" fill={C.fire}/>
              <text x="150" y="65" fill={C.fire} fontSize="8" textAnchor="middle" fontFamily="monospace">High P, High T</text>
              <line x1="235" y1="90" x2="235" y2="150" stroke={C.ice} strokeWidth="2"/>
              <polygon points="230,145 235,155 240,145" fill={C.ice}/>
              <text x="248" y="125" fill={C.ice} fontSize="8" fontFamily="monospace">High P</text>
              <text x="248" y="137" fill={C.ice} fontSize="8" fontFamily="monospace">Liquid</text>
              <line x1="200" y1="170" x2="100" y2="170" stroke={C.yellow} strokeWidth="2"/>
              <polygon points="105,165 95,170 105,175" fill={C.yellow}/>
              <text x="150" y="165" fill={C.yellow} fontSize="8" textAnchor="middle" fontFamily="monospace">Low P, Low T</text>
              <line x1="65" y1="150" x2="65" y2="90" stroke={C.purple} strokeWidth="2"/>
              <polygon points="60,95 65,85 70,95" fill={C.purple}/>
              <text x="15" y="125" fill={C.purple} fontSize="8" fontFamily="monospace">Low P</text>
              <text x="15" y="137" fill={C.purple} fontSize="8" fontFamily="monospace">Vapour</text>
              <text x="150" y="225" fill={C.soft} fontSize="9" textAnchor="middle" fontFamily="monospace">Q_H = Q_L + W (energy balance)</text>
            </svg>
          </div>
          <div>
            <div style={{ color:C.ice, fontWeight:700, fontSize:13, marginBottom:10 }}>COP Formulas</div>
            {[
              { name:"COP Refrigerator", formula:"COP = Q_L / W", note:"Q_L = cooling effect, W = compressor work" },
              { name:"COP Heat Pump", formula:"COP_HP = Q_H / W = COP_ref + 1", note:"Q_H = heat delivered, always 1 more than ref COP" },
              { name:"Carnot COP Refrigerator", formula:"COP_Carnot = T_L / (T_H − T_L)", note:"Maximum possible COP between T_H and T_L (Kelvin)" },
              { name:"Carnot COP Heat Pump", formula:"COP_HP_Carnot = T_H / (T_H − T_L)", note:"Always 1 more than Carnot refrigerator COP" },
              { name:"Energy Balance", formula:"Q_H = Q_L + W", note:"Heat rejected = cooling effect + work input" },
            ].map(function(x,i) {
              return (
                <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
                  <div style={{ color:C.ice, fontSize:11, fontWeight:700, marginBottom:2 }}>{x.name}</div>
                  <div style={{ fontFamily:"monospace", fontSize:13, color:C.yellow, marginBottom:2 }}>{x.formula}</div>
                  <div style={{ color:C.soft, fontSize:11 }}>{x.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>REFRIGERANTS — TYPES AND PROPERTIES</div>
        <DTable
          heads={["Refrigerant","Type","ODP","GWP","Status","Used In"]}
          cols={[C.soft, C.green, C.fire, C.red, C.yellow, C.ice]}
          rows={[
            ["R-12 (Freon 12)","CFC","1 (high)","8,100","BANNED (Montreal Protocol)","Old refrigerators, old car AC"],
            ["R-22","HCFC","0.055","1,810","Phase-out complete","Old window AC units"],
            ["R-134a","HFC","0","1,430","Current standard — phasing out","Car AC, household fridges"],
            ["R-410A","HFC blend","0","2,088","Phasing out","Window AC, split AC"],
            ["R-32","HFC","0","675","Transition refrigerant","New split AC systems"],
            ["R-1234yf","HFO","0","4","Future — very low GWP","New car AC (replacing R-134a)"],
            ["Ammonia (R-717)","Natural","0","0","Industrial use","Cold storage, industrial"],
            ["CO2 (R-744)","Natural","0","1","Niche — supermarkets, car AC","Premium car AC, commercial"],
          ]}
          hi={[0,5]}
        />
        <div style={{ marginTop:12, padding:"10px 14px", background:C.green+"10", borderRadius:8, fontSize:12, color:C.text }}>
          ODP = Ozone Depletion Potential (R-11 reference = 1). GWP = Global Warming Potential (CO2 reference = 1). Montreal Protocol (1987) phased out CFCs. Kigali Amendment (2016) targets HFCs. India committed to phasing down HFCs by 80% by 2047.
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>PSYCHROMETRY — MOIST AIR PROPERTIES</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            {[
              { t:"Dry Bulb Temperature (DBT)", d:"Actual air temperature measured by ordinary thermometer. Independent of humidity." },
              { t:"Wet Bulb Temperature (WBT)", d:"Temperature of thermometer with wet wick. Lowered by evaporation. WBT ≤ DBT always." },
              { t:"Dew Point Temperature (DPT)", d:"Temperature at which air becomes saturated (RH=100%) when cooled at constant pressure." },
              { t:"Relative Humidity (RH%)", d:"Ratio of actual moisture content to saturated moisture content at same temperature. Range: 0-100%." },
              { t:"Specific Humidity (ω)", d:"Mass of water vapour per unit mass of dry air (kg/kg dry air). Also called humidity ratio." },
              { t:"Enthalpy of moist air (h)", d:"h = 1.005 × T + ω × (2501 + 1.86×T) kJ/kg dry air. Used in AC design." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.ice, fontWeight:700, fontSize:13, marginBottom:10 }}>Key Relationships</div>
            {[
              "DBT > WBT > DPT (always, for unsaturated air)",
              "At RH = 100%: DBT = WBT = DPT (all three equal)",
              "Higher WBT depression (DBT−WBT): drier air, more evaporative cooling possible",
              "Comfort zone: DBT = 22-26°C, RH = 40-60%",
              "Air conditioning processes: Cooling + dehumidification (sensible + latent heat removal)",
              "Psychrometric chart: x-axis = DBT, y-axis = humidity ratio. All AC processes can be shown.",
              "Comfort AC: maintains DBT 24-26°C, RH 50-55% inside cabin",
            ].map(function(s,i) { return <div key={i} style={{ display:"flex", gap:8, padding:"6px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.text }}><span style={{ color:C.ice, flexShrink:0 }}>→</span>{s}</div>; })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function HeatTransferSec() {
  return (
    <div>
      <STitle icon="🌡️" title="HEAT TRANSFER" sub="Conduction, Convection, Radiation — laws, formulas and applications" color={C.fire} />
      <div style={{ display:"grid", gap:14, marginBottom:20 }}>
        {[
          {
            mode:"CONDUCTION", icon:"🔗", col:C.fire,
            law:"Fourier's Law",
            formula:"Q = −k × A × (dT/dx)    or    Q = k × A × ΔT / L",
            desc:"Heat transfer through a solid (or stationary fluid) by molecular vibration and free electron movement. Requires physical contact between molecules. Occurs primarily in solids.",
            vars:[
              { s:"k", d:"Thermal conductivity (W/m·K). Metals: high. Insulators: low." },
              { s:"A", d:"Cross-sectional area perpendicular to heat flow (m²)" },
              { s:"ΔT/L", d:"Temperature gradient (temperature difference / thickness)" },
            ],
            examples:["Heat through engine cylinder wall (cast iron, steel)","Heat through piston (aluminium)","Heat through gasket","Insulation of engine oil sump"],
            materials:[
              { m:"Copper", k:"400 W/m·K" },
              { m:"Aluminium", k:"205 W/m·K" },
              { m:"Steel", k:"50 W/m·K" },
              { m:"Cast iron", k:"45 W/m·K" },
              { m:"Glass", k:"1.0 W/m·K" },
              { m:"Air", k:"0.026 W/m·K" },
            ],
          },
          {
            mode:"CONVECTION", icon:"🌊", col:C.ice,
            law:"Newton's Law of Cooling",
            formula:"Q = h × A × (T_surface − T_fluid)",
            desc:"Heat transfer between a surface and a moving fluid (liquid or gas) by bulk fluid movement. Natural convection: driven by buoyancy (density differences). Forced convection: fluid moved by pump or fan.",
            vars:[
              { s:"h", d:"Convective heat transfer coefficient (W/m²·K). Varies widely." },
              { s:"A", d:"Surface area in contact with fluid (m²)" },
              { s:"T_s−T_f", d:"Temperature difference between surface and bulk fluid" },
            ],
            examples:["Engine coolant removing heat from cylinder walls (forced convection)","Air cooling of motorcycle engine fins (natural convection)","Radiator cooling: hot water → radiator fins → air","Oil cooler in gearbox cooling"],
            materials:[
              { m:"Natural convection (air)", k:"5-25 W/m²·K" },
              { m:"Forced convection (air)", k:"25-250 W/m²·K" },
              { m:"Forced convection (water)", k:"300-10,000 W/m²·K" },
              { m:"Boiling water", k:"3,000-60,000 W/m²·K" },
            ],
          },
          {
            mode:"RADIATION", icon:"☀️", col:C.yellow,
            law:"Stefan-Boltzmann Law",
            formula:"Q = ε × σ × A × (T_s⁴ − T_sur⁴)    σ = 5.67×10⁻⁸ W/m²·K⁴",
            desc:"Heat transfer by electromagnetic waves (infrared radiation). Requires NO medium — occurs in vacuum. All objects above 0 K emit radiation. Higher temperature = more radiation (T to the power 4 relationship).",
            vars:[
              { s:"ε", d:"Emissivity (0 to 1). Blackbody = 1 (perfect emitter). Polished metal ≈ 0.05." },
              { s:"σ", d:"Stefan-Boltzmann constant = 5.67 × 10⁻⁸ W/m²·K⁴" },
              { s:"T⁴", d:"FOURTH power of absolute temperature — very sensitive to temperature!" },
            ],
            examples:["Solar radiation reaching Earth through space (vacuum)","Heat from hot exhaust manifold radiated to surrounding components","Thermal imaging of engine hot spots","Infrared thermometer measuring tyre temperature"],
            materials:[
              { m:"Blackbody", k:"ε = 1.0 (max emitter)" },
              { m:"Flat black paint", k:"ε = 0.97" },
              { m:"Human skin", k:"ε = 0.95" },
              { m:"Polished aluminium", k:"ε = 0.05" },
            ],
          },
        ].map(function(x,i) {
          return (
            <Box key={i} style={{ borderTop:"3px solid "+x.col }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                <span style={{ fontSize:26 }}>{x.icon}</span>
                <div>
                  <div style={{ color:x.col, fontWeight:700, fontSize:16 }}>{x.mode}</div>
                  <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace" }}>{x.law}</div>
                </div>
              </div>
              <div style={{ background:C.bg, borderRadius:8, padding:"10px 14px", fontFamily:"monospace", fontSize:13, color:x.col, textAlign:"center", marginBottom:12, fontWeight:700 }}>{x.formula}</div>
              <p style={{ color:C.text, fontSize:13, lineHeight:1.7, marginBottom:12 }}>{x.desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                <div>
                  <div style={{ fontFamily:"monospace", color:x.col, fontSize:10, letterSpacing:1, marginBottom:8 }}>VARIABLES</div>
                  {x.vars.map(function(v,j) { return <div key={j} style={{ padding:"5px 0", borderBottom:"1px solid "+C.border+"40" }}><span style={{ color:x.col, fontFamily:"monospace", fontSize:11 }}>{v.s}: </span><span style={{ color:C.soft, fontSize:11 }}>{v.d}</span></div>; })}
                </div>
                <div>
                  <div style={{ fontFamily:"monospace", color:C.green, fontSize:10, letterSpacing:1, marginBottom:8 }}>EXAMPLES IN VEHICLES</div>
                  {x.examples.map(function(e,j) { return <div key={j} style={{ color:C.soft, fontSize:11, padding:"4px 0", display:"flex", gap:6 }}><span style={{ color:C.green }}>→</span>{e}</div>; })}
                </div>
                <div>
                  <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:10, letterSpacing:1, marginBottom:8 }}>TYPICAL VALUES</div>
                  {x.materials.map(function(m,j) { return <div key={j} style={{ padding:"5px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", justifyContent:"space-between" }}><span style={{ color:C.soft, fontSize:11 }}>{m.m}</span><span style={{ color:x.col, fontFamily:"monospace", fontSize:11 }}>{m.k}</span></div>; })}
                </div>
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

function FormulasSec() {
  return (
    <div>
      <STitle icon="🔢" title="FORMULA MASTER SHEET" sub="All thermodynamics and refrigeration formulas for MPSC Mains" color={C.yellow} />
      <div style={{ display:"grid", gap:14 }}>
        <FormulaCard name="First Law of Thermodynamics (Closed System)" formula="Q − W = ΔU    or    Q = ΔU + W" color={C.fire}
          vars={[{s:"Q",d:"Heat added to system (positive) or removed (negative) in kJ"},{s:"W",d:"Work done BY system (positive) or ON system (negative) in kJ"},{s:"ΔU",d:"Change in internal energy = U2 − U1 in kJ"}]}
          example={"Gas receives 500 kJ heat and does 200 kJ work:\nΔU = Q − W = 500 − 200 = 300 kJ (internal energy increases)\n\nFor a complete cycle (returns to initial state): ΔU = 0\nTherefore: Q_net = W_net (net heat = net work for a cycle)"}
        />
        <FormulaCard name="Carnot Efficiency" formula="η_Carnot = 1 − T_L/T_H    (T in Kelvin)" color={C.yellow}
          vars={[{s:"T_H",d:"Temperature of hot source (Kelvin). Convert: K = °C + 273"},{s:"T_L",d:"Temperature of cold sink (Kelvin)"}]}
          example={"Hot source at 400°C = 673 K. Cold sink at 27°C = 300 K.\nη_Carnot = 1 − 300/673 = 1 − 0.446 = 0.554 = 55.4%\n\nReal engine between same temperatures cannot exceed 55.4% efficiency."}
        />
        <FormulaCard name="COP of Refrigerator and Heat Pump" formula="COP_ref = Q_L/W    COP_HP = Q_H/W = COP_ref + 1" color={C.ice}
          vars={[{s:"Q_L",d:"Heat removed from cold space (refrigerating effect) in kW"},{s:"Q_H",d:"Heat rejected to surroundings in kW. Q_H = Q_L + W"},{s:"W",d:"Compressor work input in kW"}]}
          example={"Refrigerator: Q_L = 3 kW, W = 1 kW\nCOP_ref = 3/1 = 3\nQ_H = 3 + 1 = 4 kW (rejected to room)\nCOP_HP = 4/1 = 4 = COP_ref + 1 = 3 + 1 = 4 ✓\nCarnot COP (T_L=268K, T_H=308K): 268/(308−268) = 268/40 = 6.7"}
        />
        <FormulaCard name="Otto Cycle Efficiency" formula="η_Otto = 1 − (1/r)^(γ−1)    γ = 1.4 for air" color={C.fire}
          vars={[{s:"r",d:"Compression ratio = V_max/V_min = (Vs+Vc)/Vc"},{s:"γ",d:"Ratio of specific heats = Cp/Cv = 1.4 for air"}]}
          example={"r = 8, γ = 1.4:\nη = 1 − (1/8)^0.4 = 1 − (0.125)^0.4\n(0.125)^0.4 = e^(0.4 × ln 0.125) = e^(0.4 × (−2.079)) = e^(−0.832) = 0.435\nη = 1 − 0.435 = 0.565 = 56.5%"}
        />
        <FormulaCard name="Heat Conduction (Fourier's Law)" formula="Q = k × A × ΔT / L    (W)" color={C.teal}
          vars={[{s:"k",d:"Thermal conductivity (W/m·K). Steel≈50, Aluminium≈205, Copper≈400"},{s:"A",d:"Area perpendicular to heat flow (m²)"},{s:"ΔT",d:"Temperature difference (K or °C)"},{s:"L",d:"Thickness in direction of heat flow (m)"}]}
          example={"Steel engine wall: k=50 W/m·K, A=0.01m², ΔT=200°C, L=0.01m\nQ = 50 × 0.01 × 200 / 0.01 = 10,000 W = 10 kW conducted through wall"}
        />
        <FormulaCard name="Stefan-Boltzmann Radiation Law" formula="Q = ε × σ × A × (T_s⁴ − T_sur⁴)" color={C.yellow}
          vars={[{s:"ε",d:"Emissivity (0 to 1). Blackbody=1, polished metal≈0.05"},{s:"σ",d:"5.67 × 10⁻⁸ W/m²·K⁴ (Stefan-Boltzmann constant)"},{s:"T",d:"Temperature in KELVIN (not Celsius!)"}]}
          example={"Hot surface at 500°C (773K), surroundings at 27°C (300K), ε=0.9, A=0.1m²:\nQ = 0.9 × 5.67×10⁻⁸ × 0.1 × (773⁴ − 300⁴)\n= 0.9 × 5.67×10⁻⁸ × 0.1 × (3.57×10¹¹ − 8.1×10⁹)\n≈ 0.9 × 5.67×10⁻⁸ × 0.1 × 3.49×10¹¹ ≈ 1,779 W ≈ 1.78 kW"}
        />
      </div>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🔥", title:"Laws of Thermodynamics — 1-Line Summary", color:C.fire,
      items:[
        "Zeroth Law: Temperature can be compared (defines thermometry).",
        "First Law: Energy is conserved — Q = ΔU + W. Cannot create energy.",
        "Second Law: Heat flows HOT to COLD. No 100% efficient engine. Entropy increases.",
        "Third Law: Absolute zero (0 K) cannot be reached. Entropy = 0 at 0 K.",
        "For Carnot efficiency: ALWAYS use KELVIN (K = °C + 273). Never use Celsius.",
        "Carnot efficiency = 1 − T_cold/T_hot. Increase efficiency: raise T_hot OR lower T_cold.",
      ],
    },
    {
      icon:"❄️", title:"Refrigeration — Zero Confusion Rules", color:C.ice,
      items:[
        "Evaporator = cooling effect (absorbs heat FROM refrigerated space). Condenser = rejects heat TO surroundings.",
        "COP refrigerator = Q_L/W. COP can be MORE than 1 — typically 3-5 for good fridge.",
        "COP heat pump = Q_H/W = COP_refrigerator + 1. Always 1 more than refrigerator.",
        "Carnot COP ref = T_L/(T_H−T_L). Real COP always LESS than Carnot.",
        "Energy balance: Q_H = Q_L + W. Heat rejected to room = cooling + compressor work.",
        "Refrigerant R-134a (current car AC) being replaced by R-1234yf (very low GWP=4).",
        "R-12 banned (ozone depleting). R-22 phased out. R-134a phasing out. R-1234yf and CO2 are future.",
      ],
    },
    {
      icon:"🌡️", title:"Heat Transfer — Mode Identifier", color:C.yellow,
      items:[
        "Conduction = solid-to-solid contact. Formula: Q = kAΔT/L (Fourier). High k = good conductor.",
        "Convection = fluid movement. Formula: Q = hA(Ts−Tf) (Newton cooling). Forced > natural convection.",
        "Radiation = NO medium needed. Works in vacuum. Formula: Q = εσA(T₁⁴−T₂⁴). T must be in Kelvin.",
        "Only radiation works through vacuum. Sun heats Earth by radiation (90 million miles of space).",
        "In vehicle engines: all THREE modes occur simultaneously — important for exam!",
        "Thermal conductivity comparison: Copper (400) > Aluminium (205) > Steel (50) > Glass (1) > Air (0.026).",
      ],
    },
    {
      icon:"🔄", title:"Thermodynamic Cycles — Match Each to Engine", color:C.teal,
      items:[
        "Carnot = theoretical maximum — not real engine. No practical implementation.",
        "Otto cycle = PETROL (SI) engine. Constant VOLUME heat addition. η = 1−(1/r)^(γ−1).",
        "Diesel cycle = DIESEL (CI) engine. Constant PRESSURE heat addition. Cut-off ratio involved.",
        "Rankine cycle = STEAM power plant (coal, nuclear). Water/steam working fluid.",
        "Brayton cycle = GAS TURBINE and JET ENGINE. Constant pressure processes.",
        "VCR cycle = REFRIGERATOR and AIR CONDITIONER. Reversed heat engine.",
        "Memory trick: Otto=car Petrol, Diesel=truck Diesel, Rankine=Rail Steam, Brayton=aircraft Jet.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Thermodynamics", color:C.green,
      items:[
        "Q: First Law states → Energy conservation (Q = ΔU + W)",
        "Q: Second Law states → Heat flows hot to cold spontaneously. No 100% efficient engine.",
        "Q: Carnot efficiency formula → 1 − T_L/T_H (Kelvin temperatures)",
        "Q: In refrigeration cycle, cooling occurs in → Evaporator",
        "Q: COP refrigerator formula → Q_L/W (can be greater than 1)",
        "Q: Heat transfer through vacuum possible by → Radiation only",
        "Q: Automobile AC refrigerant (current) → R-134a. Future → R-1234yf",
        "Q: Rankine cycle is for → Steam power plants",
        "Q: DBT = WBT when → Relative humidity = 100% (saturated air)",
        "Q: Carnot COP refrigerator = → T_L/(T_H − T_L) in Kelvin",
        "Q: Stefan-Boltzmann law applies to → Radiation heat transfer",
        "Q: Which law cannot be violated even theoretically → Second Law (no 100% efficient engine)",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Thermodynamics and Refrigeration" color={C.yellow} />
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
  { id:"laws",      icon:"⚖️", label:"Laws of Thermodynamics" },
  { id:"cycles",    icon:"🔄", label:"Thermodynamic Cycles" },
  { id:"refrig",    icon:"❄️", label:"Refrigeration and AC" },
  { id:"heat",      icon:"🌡️", label:"Heat Transfer Modes" },
  { id:"formulas",  icon:"🔢", label:"Formula Master Sheet" },
  { id:"tricks",    icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("laws");
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
    if (sec==="laws") return <ThermolawsSec />;
    if (sec==="cycles") return <ThermoCyclesSec />;
    if (sec==="refrig") return <RefrigSec />;
    if (sec==="heat") return <HeatTransferSec />;
    if (sec==="formulas") return <FormulasSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"formulas",l:"🔢 FORMULAS"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#1C2810;border-radius:3px}"].join("")}</style>
      <div style={{ background:"#040602", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🔥</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>THERMODYNAMICS AND REFRIGERATION</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 9 of 12 · Laws · Cycles · Refrigeration · Heat Transfer · Psychrometry</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="6% WEIGHTAGE" color={C.fire} />
              <Tag label="7/10 YEARS" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.fire:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.fire:"transparent"),
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
                    background:sec===s.id?C.fire+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.fire+"50":"transparent"),
                    color:sec===s.id?C.fire:C.soft,
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
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.fire}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>
            {done ? (
              <Box glow={C.fire} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.fire }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏆":sc.c>=7?"🔥":"📚"}</div>
                <div style={{ fontSize:26, color:C.fire, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"THERMO MASTER!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Outstanding! Ready for Topics 10-12.":sc.c>=7?"Good. Review refrigeration COP formulas and cycle identifiers.":"Revise laws of thermodynamics, cycle types, and COP formulas."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.fire, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("formulas"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.fire, background:"transparent", color:C.fire, fontWeight:700, cursor:"pointer", fontSize:14 }}>FORMULAS</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.ice} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.yellow:q.level==="HARD"?C.fire:C.purple} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.fire+","+C.ice+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.fire, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.fire, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.fire+","+C.ice+")", color:"#000", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
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