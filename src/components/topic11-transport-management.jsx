import { useState } from "react";

var C = {
  bg:"#06080A", card:"#0C1018", border:"#182028",
  navy:"#1D4ED8", gold:"#D97706", green:"#16A34A",
  red:"#DC2626", orange:"#EA580C", purple:"#7C3AED",
  teal:"#0D9488", cyan:"#0891B2", yellow:"#CA8A04",
  text:"#E8EDF5", muted:"#243040", soft:"#607890",
};

function Tag(props) {
  var c = props.color || C.navy;
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
  var c = props.color || C.navy;
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
  var cols = props.cols || [C.soft, C.navy, C.gold, C.green, C.orange];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#080C12" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.navy+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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
    id:1, level:"BASIC", topic:"RTO Structure",
    q:"The Regional Transport Authority (RTA) in Maharashtra is constituted under which Section of the Motor Vehicles Act 1988?",
    opts:["Section 44","Section 68","Section 66","Section 133"],
    ans:1,
    exp:"Section 68 of the Motor Vehicles Act 1988 provides for the constitution of the Regional Transport Authority (RTA).\n\nStructure of Transport Authorities in India:\n1. National Road Safety Council (Central level)\n2. State Transport Authority (STA) — for state-wide operations\n3. Regional Transport Authority (RTA) — for each region/district\n\nRTA composition (as per Sec 68):\n- District Collector or their nominee (Chairman)\n- Representatives of police, PWD, education, health departments\n- Motor vehicle owner representative\n\nRTA functions:\n- Grant, renew, suspend, cancel permits (stage carriage, goods, contract)\n- Hear appeals against permit refusals\n- Control transport vehicles in the region\n- Fix routes for stage carriages\n\nARTO (Assistant Regional Transport Officer) works under RTA and STA.",
    tip:"Section 68 = RTA constitution. Section 67 = STA. Section 44 = registration. Section 66 = permit necessity. RTA is the REGIONAL authority (district level). STA is the STATE authority. ARTO works under RTA. Know the hierarchy: Central (MoRTH) → STA → RTA → ARTO/AMVI.",
  },
  {
    id:2, level:"BASIC", topic:"Permit Types",
    q:"A bus operating on a fixed route, stopping at designated points, and charging passengers SEPARATE FARES for their individual journeys is operating under which type of permit?",
    opts:["Contract Carriage Permit","Stage Carriage Permit","Tourist Vehicle Permit","Goods Carriage Permit"],
    ans:1,
    exp:"STAGE CARRIAGE PERMIT (Section 72 MV Act):\n\nDefinition (Section 2(40)): Motor vehicle used for carrying passengers for hire or reward at SEPARATE FARES — each passenger pays for their individual journey.\n\nCharacteristics:\n- Fixed route, fixed stops\n- Passengers board and alight at designated stops\n- Each passenger pays separate fare for their portion of journey\n- Schedule and timetable fixed by RTA in permit\n- Examples: MSRTC buses, BEST buses, city buses, school buses on routes\n\nContrast with Contract Carriage (Section 2(7)):\n- Vehicle hired as a WHOLE under a contract\n- One fare for entire vehicle (not per passenger)\n- Examples: Tourist buses, school vans (booked by school), chartered buses, taxi\n- No fixed route or stops\n\nKey exam distinction: Stage = SEPARATE FARES per passenger. Contract = ONE FARE for whole vehicle.",
    tip:"Stage Carriage = bus on fixed route = separate fares per passenger = MSRTC, BEST, city buses. Contract Carriage = whole vehicle hired = one contract fare = taxi, tourist bus, school van. This distinction is tested very frequently in MPSC. Section 72 = Stage Carriage permit. Section 74 = Contract Carriage permit.",
  },
  {
    id:3, level:"BASIC", topic:"Road Safety",
    q:"The 'Golden Hour' concept in road accident emergency response refers to:",
    opts:[
      "The first hour after a vehicle is manufactured before it can be registered",
      "The critical one-hour window after a serious trauma where immediate medical treatment dramatically improves survival",
      "The first hour of the working day for traffic police",
      "The one-hour validity window for an emergency vehicle permit",
    ],
    ans:1,
    exp:"GOLDEN HOUR in trauma/road accident care:\n\nThe first 60 minutes after a serious traumatic injury (like road accident) is the most critical period. Medical interventions during this time can dramatically reduce mortality and permanent disability.\n\nWhy 'Golden Hour' matters:\n- Uncontrolled bleeding, brain injury, internal organ damage are immediately life-threatening\n- Early intervention (within 1 hour): Survival rate increases dramatically\n- Delay beyond 1 hour: Risk of irreversible organ damage, blood loss shock, death increases significantly\n\nFor road accidents specifically:\n1. Bystanders should call emergency services immediately (112)\n2. Good Samaritan provisions protect helpers from harassment\n3. Hospitals cannot refuse emergency treatment (Supreme Court ruling)\n4. ARTO role: Ensure emergency vehicles have clear path (Sec 194E — not giving way = Rs 10,000 fine)\n\nIndia's iRAD (Integrated Road Accident Database) and road safety initiatives address Golden Hour response.",
    tip:"Golden Hour = first 60 minutes after trauma = most critical for survival. Bystanders: call 112 (emergency), do not move victim with spinal injury, stop bleeding if possible. Good Samaritan Law (MV Amendment 2019) protects helpers. Hospital cannot demand payment before treating accident victim.",
  },
  {
    id:4, level:"MEDIUM", topic:"Transport Policy",
    q:"Under the National Road Safety Policy, which organisation is responsible for maintaining accident data and road safety statistics at the national level?",
    opts:[
      "State Police Departments only",
      "Ministry of Road Transport and Highways (MoRTH) through its agencies",
      "National Highway Authority of India (NHAI) only",
      "Insurance Regulatory and Development Authority (IRDAI)",
    ],
    ans:1,
    exp:"Ministry of Road Transport and Highways (MoRTH) is the nodal ministry responsible for road transport and road safety in India.\n\nKey road safety data and initiatives under MoRTH:\n\n1. iRAD (Integrated Road Accident Database): National database of all road accidents. Real-time data collection. Used for analysis and prevention.\n\n2. Annual Road Accidents Report: Published by MoRTH. Comprehensive data on: accidents by cause, vehicle type, road type, time, state, fatalities, injuries.\n\n3. NRSC (National Road Safety Council): Advisory body to Central Govt. Chaired by Minister of Road Transport.\n\n4. IHMCL: India Highways Management Company — manages FASTag, tolls.\n\n5. NIC (National Informatics Centre): Maintains VAHAN (vehicle registration database) and SARATHI (driving licence database).\n\nRoad accident statistics (2022): ~4.43 lakh accidents, ~1.68 lakh deaths, ~4.4 lakh injuries annually. India has among highest road accident fatalities globally.",
    tip:"MoRTH = nodal ministry for road transport and safety. Maintains iRAD (accident database). VAHAN = vehicle registration database. SARATHI = driving licence database. Both accessible to ARTO during inspection. National accident data published annually by MoRTH. As ARTO: any fatal accident must be reported to police AND entered in VAHAN/iRAD system.",
  },
  {
    id:5, level:"MEDIUM", topic:"Route Permits",
    q:"Under MV Act Section 81, the standard validity period of a Stage Carriage Permit is:",
    opts:["1 year","3 years","5 years","10 years"],
    ans:2,
    exp:"Section 81 — Duration of permits:\n\nAll types of permits under the Motor Vehicles Act have FIVE YEAR validity:\n- Stage Carriage Permit: 5 years\n- Contract Carriage Permit: 5 years\n- Goods Carriage Permit: 5 years\n- Tourist Vehicle Permit: 5 years\n\nAfter 5 years: Permit must be RENEWED by applying to the RTA. Renewal is not automatic — may require fresh consideration.\n\nCountersignature: If a vehicle with permit from State A wants to operate in State B, they need COUNTERSIGNATURE by State B's STA. Fee is payable.\n\nNational Permit: All India Tourist Permit or National Permit for goods vehicles allows operation across all states without individual countersignatures. Issued by home state STA. Fee paid to MoRTH.\n\nTemporary Permit: Issued for special occasions, emergencies, or while regular permit application is pending. Short validity.\n\nPermit Cancellation: RTA can cancel/suspend permit for violation of conditions (Section 86 MV Act).",
    tip:"ALL permit types = 5 YEAR validity (Section 81). National permit = all-India operation for goods vehicles. Countersignature needed for operating in another state (without national permit). Temporary permit = short term. Permit cancellation under Section 86. National permit fee goes to MoRTH (not just state).",
  },
  {
    id:6, level:"MEDIUM", topic:"Speed Limits",
    q:"Under Central Motor Vehicles Rules, what is the maximum speed limit for a heavy passenger vehicle (bus) on a National Highway in India?",
    opts:["60 km/h","80 km/h","100 km/h","120 km/h"],
    ans:1,
    exp:"Speed limits under CMVR 1989 (as amended) on National Highways:\n\nCARS (M1 category): 120 km/h (with ABS and airbags), 100 km/h (without)\nMOTORCYCLES: 80 km/h on NH\nTRUCKS (N category, goods): 80 km/h on NH\nBUSES (M2/M3, heavy passenger): 80 km/h on NH\nAUTO-RICKSHAW: 45-50 km/h\n\nThese are MAXIMUM permissible speeds on National Highways. State governments and local authorities can set LOWER limits for specific roads, areas, or conditions.\n\nSpeed Governor requirement:\n- All transport vehicles above 7.5 tonnes (some say above 3.5 tonnes) must have tamper-proof speed governors\n- Buses: governor set at 80 km/h (cannot exceed)\n- Trucks: governor set at 80-100 km/h\n- School buses: 50 km/h (more restrictive)\n\nPenalty for overspeeding:\n- LMV: Rs 1,000 (first), Rs 2,000 (repeat)\n- Transport vehicle: Rs 2,000 (first), Rs 4,000 (repeat)",
    tip:"Heavy buses and trucks on NH: 80 km/h maximum. Cars: 100-120 km/h on NH. School buses: 50 km/h. Speed governor mandatory for heavy transport vehicles. Buses fitted with governor cannot physically exceed 80 km/h (tamper-proof). ARTO must verify speed governor is sealed and calibrated during fitness inspection.",
  },
  {
    id:7, level:"HARD", topic:"Transport Infrastructure",
    q:"FASTag, the electronic toll collection system mandatory on National Highways, uses which technology for automatic vehicle identification?",
    opts:["GPS (Global Positioning System)","RFID (Radio Frequency Identification)","Bluetooth Low Energy (BLE)","Barcode scanning"],
    ans:1,
    exp:"FASTag uses RFID (Radio Frequency Identification) technology.\n\nHow FASTag works:\n1. FASTag sticker (passive RFID tag) affixed to windscreen of vehicle\n2. Tag contains a microchip linked to vehicle registration and bank account/wallet\n3. At toll plaza: RFID reader emits radio waves\n4. FASTag receives signal, transmits vehicle unique ID back to reader\n5. System identifies vehicle, deducts toll amount from linked account\n6. Boom barrier opens automatically — no cash, no stopping\n\nFASTag system details:\n- RFID frequency: 900 MHz (UHF band)\n- Read range: Up to 5-6 metres\n- Mandatory for all M and N category vehicles from January 2021\n- Managed by: NETC (National Electronic Toll Collection) by NHAI and NPCI\n- 5% discount on toll for FASTag users vs cash\n- Minimum balance enforcement: If balance low → vehicle charged double toll at cash lane\n\nFASTag issued by: Banks, NHAI, Paytm, etc. Linked to vehicle registration (one FASTag per vehicle).\n\nAs ARTO: FASTag on RC is now a requirement. Verify FASTag sticker during inspection for transport vehicles.",
    tip:"FASTag = RFID technology (NOT GPS, NOT Bluetooth, NOT barcode). UHF RFID, reads from 5-6 metres. Mandatory from Jan 2021. Managed by NHAI/NPCI through NETC. FASTag linked to vehicle registration number — one vehicle, one FASTag. Fine for no FASTag: double toll charged at cash lane.",
  },
  {
    id:8, level:"HARD", topic:"Road Accident Investigation",
    q:"Under the iRAD (Integrated Road Accident Database) system, within how many hours must a road accident be recorded in the system after occurrence?",
    opts:["24 hours","48 hours","72 hours","1 week"],
    ans:0,
    exp:"iRAD (Integrated Road Accident Database) system requirements:\n\nAccidents must be recorded in iRAD WITHIN 24 HOURS of occurrence.\n\nWhat is iRAD:\n- NIC-developed mobile app + web platform for real-time accident data\n- Every road accident (fatal, grievous, minor) must be recorded\n- Captures: location (GPS coordinates), vehicle details, cause, road type, time, weather\n\nWho records in iRAD:\n1. Police: Primary data entry (accident details, FIR number)\n2. ARTO/Transport Department: Vehicle-related data (fitness, permit, DL validity)\n3. PWD/NHAI: Road condition data\n4. Health Dept: Injury/death data from hospitals\n\nWhy iRAD matters:\n- Real-time accident hotspot mapping\n- Data-driven road safety interventions\n- MoRTH uses data for policy and engineering improvements\n- Helps identify black spots (locations with recurring accidents)\n- Feeds into National Road Safety Annual Report\n\nAs ARTO: Mandatory to verify transport vehicle documents and enter vehicle data in iRAD for accidents involving transport vehicles.",
    tip:"iRAD recording: within 24 HOURS of accident. Multi-agency system: Police + ARTO + PWD + Health all enter data. GPS coordinates capture exact location. iRAD identifies accident hotspots. ARTO's role: verify if vehicle had valid RC, fitness certificate, permit, insurance — and enter this in iRAD. Failure to update iRAD = departmental action.",
  },
  {
    id:9, level:"HARD", topic:"Overloading",
    q:"Under MV Act Section 194, the penalty for carrying EXCESS LOAD (overloading) in a goods vehicle is:",
    opts:[
      "Rs 2,000 flat fine",
      "Rs 20,000 + Rs 2,000 per tonne excess load",
      "Vehicle impounded permanently",
      "Rs 5,000 per trip",
    ],
    ans:1,
    exp:"Section 194 MV Act (as amended by MV Amendment Act 2019):\n\nPenalty for overloading goods vehicles:\nFINE: Rs 20,000 + Rs 2,000 per EXTRA TONNE of excess load\n\nExample: Vehicle permitted 10 tonnes, carrying 15 tonnes (5 tonnes excess)\nFine = Rs 20,000 + (5 × Rs 2,000) = Rs 20,000 + Rs 10,000 = Rs 30,000\n\nAdditional consequences:\n- Vehicle can be DIRECTED to OFF-LOAD excess weight before proceeding\n- Vehicle detained until excess load removed (Section 207)\n- Driver/owner/consignor can ALL be held liable\n- Transport department data: overloaded vehicles cause 40% more road damage and have significantly higher accident risk (tyre blowouts, brake failure, longer stopping distance)\n\nARTO authority:\n- ARTO has power to check axle loads at checkposts\n- Weigh bridges operated by transport department\n- Can issue challans and direct off-loading\n- Commercial vehicles must not exceed GVW (Gross Vehicle Weight) or axle load limits\n\nSection 194A: Overloading PASSENGERS in transport vehicle = Rs 1,000 per extra passenger.",
    tip:"Overloading penalty: Rs 20,000 BASE + Rs 2,000 per extra tonne. Formula: Fine = 20,000 + (excess tonnes × 2,000). Vehicle must also off-load before moving. Passenger overloading: Rs 1,000 per extra passenger (Sec 194A). ARTO can check at weigh bridges and direct off-loading. Pre-2019: penalty was only Rs 2,000 flat — now much stricter.",
  },
  {
    id:10, level:"HARD", topic:"MSRTC and State Transport",
    q:"Maharashtra State Road Transport Corporation (MSRTC) was established under which Act?",
    opts:[
      "Motor Vehicles Act 1988",
      "Road Transport Corporations Act 1950",
      "Maharashtra State Transport Act 1960",
      "Constitution of India Article 19(1)(g)",
    ],
    ans:1,
    exp:"MSRTC (Maharashtra State Road Transport Corporation) was established under the ROAD TRANSPORT CORPORATIONS ACT 1950.\n\nKey facts about MSRTC:\n- Established: 1 June 1960 (along with Maharashtra state formation)\n- Headquartered: Mumbai\n- One of the largest public sector bus operations in the world\n- Operates about 16,000+ buses serving 250+ districts and talukas\n- About 99,000+ employees\n- Serves approximately 6.5 crore passengers per day\n\nMSRTC route types:\n- Ordinary (Semi-luxury, Shivneri, Asiad, Hiranyakashyap)\n- Express and Limited Stop\n- City services (in some cities)\n- Intracity routes\n\nMSRTC and MPSC connection:\n- MSRTC is a State Transport Undertaking (STU) under Chapter VI of MV Act (Sections 97-105)\n- Routes can be NATIONALISED by State Govt under Section 100\n- ARTO coordinates with MSRTC for permits, fitness, and route operations\n\nRecent development: MSRTC has been procuring electric buses under FAME-II scheme.",
    tip:"MSRTC established under Road Transport Corporations Act 1950 (central act). Formed June 1, 1960 (same day as Maharashtra). HQ: Mumbai. Chapter VI MV Act (Sec 97-105) = State Transport Undertakings. State can nationalise routes. ARTO must maintain records of MSRTC vehicle fitness inspections like any other transport vehicle.",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Road Safety Schemes",
    q:"The 'iRAD' and 'VAHAN' systems used by transport authorities are developed and maintained by:",
    opts:[
      "Ministry of Home Affairs",
      "National Informatics Centre (NIC) under Ministry of Electronics and IT",
      "Insurance Regulatory and Development Authority (IRDAI)",
      "National Highway Authority of India (NHAI)",
    ],
    ans:1,
    exp:"NIC (National Informatics Centre) under Ministry of Electronics and Information Technology (MeitY) develops and maintains key transport IT systems:\n\n1. VAHAN (Vehicle Registration): National database of all registered vehicles. ARTO uses VAHAN to:\n   - Register vehicles\n   - Transfer ownership\n   - Issue RC (Registration Certificate)\n   - Record fitness certificate data\n   - Check vehicle history\n\n2. SARATHI (Driving Licence): National database of all driving licences. ARTO uses to:\n   - Issue learner's licences\n   - Conduct and record driving tests\n   - Issue DLs\n   - Record endorsements and disqualifications\n\n3. iRAD (Integrated Road Accident Database): NIC-developed accident recording system.\n\n4. e-CHALLAN: Digital traffic challan system. Integrated with VAHAN/SARATHI.\n\n5. Parivahan Portal (parivahan.gov.in): Single window for all transport services (RC, DL, permits, fitness). Citizen-facing portal.\n\nAll these are integrated — if you check a vehicle on VAHAN, it shows RC, fitness, insurance, FASTag status all in one place.",
    tip:"NIC (National Informatics Centre) = develops VAHAN (vehicle registration) + SARATHI (driving licence) + iRAD (accidents) + e-CHALLAN. All under MeitY. Parivahan.gov.in = single portal for all transport services. As ARTO: all data entry done through these NIC systems. Vehicle history check = VAHAN lookup.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"ARTO Functions",
    q:"Which of the following is NOT within the powers and functions of an Assistant Regional Transport Officer (ARTO)?",
    opts:[
      "Issuing driving licences and learner's licences",
      "Inspecting vehicles and issuing Certificate of Fitness",
      "Granting and cancelling route permits for stage carriages",
      "Framing national transport policy and setting speed limits",
    ],
    ans:3,
    exp:"ARTO (Assistant Regional Transport Officer) functions — from MV Act and State Rules:\n\nARTO CAN DO:\n1. Conduct driving tests and issue Driving Licences (DL)\n2. Issue Learner's Licences (LL)\n3. Register motor vehicles and issue Registration Certificates (RC)\n4. Process and record transfer of ownership\n5. Inspect transport vehicles and issue Certificate of Fitness (CF)\n6. Grant/renew/cancel permits (under RTA authority)\n7. Collect road tax and other fees\n8. Check vehicles on road (enforcement)\n9. Issue challans for MV Act violations\n10. Enter data in VAHAN, SARATHI, iRAD\n11. Record PUC data\n\nARTO CANNOT DO:\n- Frame NATIONAL transport policy (done by MoRTH, Central Govt)\n- Set speed limits for National Highways (done by Central Govt under CMVR)\n- Create new laws or amend MV Act (Parliament's function)\n- Grant national permits single-handedly (requires STA coordination)\n- Override STA or state-level decisions\n\nARTO is a CLASS II officer working under RTA/STA — administrative and enforcement role, not policy-making.",
    tip:"ARTO = CLASS II OFFICER = administrative and enforcement functions. NOT a policy maker. ARTO issues DL, RC, CF, permits, challans. ARTO does NOT make national policy, national speed limits, or new laws. National policy = MoRTH. State policy = State Transport Department. Speed limits on NH = Central Govt (CMVR). ARTO implements policy, does not create it.",
  },
];

function RTOStructureSec() {
  return (
    <div>
      <STitle icon="🏛️" title="RTO STRUCTURE AND ADMINISTRATION" sub="MoRTH → STA → RTA → ARTO hierarchy and functions" color={C.navy} />
      <Box glow={C.navy} style={{ borderTop:"3px solid "+C.navy, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.navy, fontSize:11, letterSpacing:1.5, marginBottom:14 }}>TRANSPORT AUTHORITY HIERARCHY</div>
        <div style={{ display:"grid", gap:10 }}>
          {[
            { level:"CENTRAL GOVERNMENT — MoRTH", col:C.red, items:["Ministry of Road Transport and Highways (MoRTH)", "Makes central legislation (MV Act 1988, CMVR 1989)", "Sets national standards for vehicles, emissions, safety", "Manages national highways policy (via NHAI)", "Publishes annual road accident report", "Controls VAHAN and SARATHI databases (through NIC)"] },
            { level:"STATE GOVERNMENT — Transport Department", col:C.orange, items:["Principal Secretary (Transport) heads department", "Makes state-level rules supplementary to MV Act", "Oversees MSRTC (Maharashtra State Road Transport Corporation)", "Manages motor vehicle taxation at state level", "Coordinates with police on enforcement"] },
            { level:"STATE TRANSPORT AUTHORITY (STA) — Section 67", col:C.gold, items:["Constituted under Section 67 MV Act", "Issues permits for inter-district and inter-state routes", "Hears appeals against RTA decisions", "Controls stage carriage routes across state", "Nationalisation of routes under Chapter VI"] },
            { level:"REGIONAL TRANSPORT AUTHORITY (RTA) — Section 68", col:C.cyan, items:["One RTA per district (or region)", "Chairman: District Collector or nominee", "Members: Police, PWD, Health, Education representatives", "Grants: stage carriage, contract, goods carriage permits", "Hears permit appeals at regional level"] },
            { level:"ARTO / AMVI / MVI — Section 213 appointments", col:C.green, items:["ARTO (Assistant Regional Transport Officer): Class II officer. Administrative and technical.", "AMVI (Assistant Motor Vehicle Inspector): Technical, vehicle inspection specialist.", "MVI (Motor Vehicle Inspector): Senior technical officer.", "Functions: DL, RC, CF, permits, enforcement, data entry", "Primary customer interface — public comes to ARTO for most services"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"4px solid "+x.col }}>
                <div style={{ color:x.col, fontWeight:700, fontSize:13, marginBottom:8 }}>{x.level}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
                  {x.items.map(function(item,j) {
                    return <div key={j} style={{ color:C.soft, fontSize:12, display:"flex", gap:6 }}><span style={{ color:x.col, flexShrink:0 }}>→</span>{item}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.gold }}>
        <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:1, marginBottom:12 }}>ARTO COMPLETE FUNCTIONS — DAILY JOB PROFILE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { cat:"LICENSING", col:C.cyan, items:["Issue Learner's Licence (LL)", "Conduct driving tests", "Issue Driving Licence (DL)", "Renew DL", "Endorse DL for new classes", "Record DL suspension/disqualification"] },
            { cat:"REGISTRATION", col:C.green, items:["Register new vehicles", "Issue Registration Certificate (RC)", "Process ownership transfer", "Record RC change of address", "Issue NOC for out-of-state transfer", "Register/deregister vehicles"] },
            { cat:"FITNESS AND PERMITS", col:C.orange, items:["Inspect transport vehicles physically", "Issue Certificate of Fitness (CF)", "Grant/renew stage carriage permits", "Grant/renew goods carriage permits", "Grant contract carriage permits", "Cancel/suspend permits for violations"] },
            { cat:"ENFORCEMENT", col:C.red, items:["Check vehicles on road (surprise checks)", "Issue challans for MV Act violations", "Detain vehicles violating laws (Sec 207)", "Verify PUC and OBD compliance", "Check overloading at weigh bridges", "Coordinate with police for enforcement"] },
            { cat:"DATA AND RECORDS", col:C.purple, items:["Enter data in VAHAN (vehicle registration)", "Update SARATHI (DL database)", "Record accidents in iRAD", "Maintain permit records", "Submit monthly reports to RTA/STA", "Process RTI (Right to Information) requests"] },
            { cat:"REVENUE COLLECTION", col:C.navy, items:["Collect road tax", "Collect permit fees", "Collect DL/RC fees", "Collect fitness certificate fees", "Collect green tax (old vehicles)", "Deposit fees to state treasury"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderTop:"2px solid "+x.col }}>
                <div style={{ color:x.col, fontFamily:"monospace", fontSize:10, letterSpacing:1, fontWeight:700, marginBottom:8 }}>{x.cat}</div>
                {x.items.map(function(item,j) {
                  return <div key={j} style={{ color:C.soft, fontSize:11, padding:"3px 0", display:"flex", gap:6 }}><span style={{ color:x.col, flexShrink:0 }}>→</span>{item}</div>;
                })}
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function PermitsSec() {
  return (
    <div>
      <STitle icon="📋" title="PERMITS AND TRANSPORT OPERATIONS" sub="All permit types, routes, countersignature, national permit" color={C.gold} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.gold }}>
        <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:1, marginBottom:12 }}>TYPES OF PERMITS UNDER MV ACT</div>
        <div style={{ display:"grid", gap:10 }}>
          {[
            { name:"Stage Carriage Permit (Sec 72)", col:C.gold, validity:"5 years", grantedBy:"RTA (for district), STA (for interstate)", desc:"Fixed route, fixed stops, separate fares per passenger. MSRTC, city buses, private stage carriages.", conditions:["Specified route and terminal points","Fixed time schedule","Maximum passenger capacity","Fare structure approved by RTA","Vehicle must have valid CF and insurance"] },
            { name:"Contract Carriage Permit (Sec 74)", col:C.orange, validity:"5 years", grantedBy:"RTA", desc:"Vehicle hired as whole under a contract. No fixed route. Taxi, tourist bus, school van.", conditions:["Cannot pick up passengers on route (only at destination)","Vehicle cannot be sublet without permission","Must display permit on vehicle","Driver must have appropriate DL"] },
            { name:"Goods Carriage Permit (Sec 79)", col:C.cyan, validity:"5 years", grantedBy:"RTA (district), STA (state)", desc:"For carrying goods commercially. Specifies GVW, axle loads, type of goods permissible.", conditions:["Must not exceed GVW specified in permit","May specify permitted goods type (hazardous materials: special permit)","Consignment notes required for goods","Vehicle must have valid fitness certificate"] },
            { name:"Tourist Vehicle Permit (Sec 88)", col:C.purple, validity:"Up to 5 years", grantedBy:"RTA or STA", desc:"For tourist vehicles operating interstate. All India Tourist Permit allows nationwide operation.", conditions:["Yellow number plate for tourist vehicles","All India Tourist Permit covers all states without countersignature","Fee paid to home state + additional fee to MoRTH","Must carry only tourists (not stage carriage operations)"] },
            { name:"Educational Institution Bus Permit (Sec 76)", col:C.green, validity:"5 years or school existence", grantedBy:"RTA", desc:"For school/college buses. Special conditions for child safety.", conditions:["School name on vehicle","Speed governor mandatory (50 km/h limit)","First aid box mandatory","Female attendant mandatory (for primary school children)","Route: school to designated residential stops only"] },
            { name:"Temporary Permit (Sec 87)", col:C.teal, validity:"Up to 4 months", grantedBy:"RTA", desc:"For temporary operation — special events, emergencies, while regular permit is pending.", conditions:["Cannot be renewed more than twice","Limited to specified routes and dates","Not transferable"] },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderLeft:"3px solid "+x.col }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ color:x.col, fontWeight:700, fontSize:13 }}>{x.name}</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <Tag label={"Valid: "+x.validity} color={x.col} />
                  </div>
                </div>
                <div style={{ color:C.soft, fontSize:12, lineHeight:1.6, marginBottom:8 }}>{x.desc}</div>
                <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginBottom:6 }}>Granted by: {x.grantedBy}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
                  {x.conditions.map(function(c,j) {
                    return <div key={j} style={{ color:C.soft, fontSize:11, display:"flex", gap:6 }}><span style={{ color:x.col }}>→</span>{c}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box style={{ borderTop:"2px solid "+C.navy }}>
        <div style={{ fontFamily:"monospace", color:C.navy, fontSize:11, letterSpacing:1, marginBottom:12 }}>NATIONAL PERMIT AND COUNTERSIGNATURE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.gold, fontWeight:700, fontSize:13, marginBottom:10 }}>National Permit</div>
            {[
              { t:"Eligible vehicles", d:"Goods carriages only (not passenger). Some all-India tourist permits for tourist vehicles." },
              { t:"Coverage", d:"All states and Union Territories — no individual state countersignature needed." },
              { t:"Issued by", d:"Home state STA (Registering Authority's state)." },
              { t:"Fee structure", d:"Fee paid to home state + fee to every state the vehicle plans to operate in (composite fee to MoRTH)." },
              { t:"Duration", d:"5 years validity." },
              { t:"Advantage", d:"Single permit for pan-India goods transport. Reduces compliance burden for logistics companies." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.gold, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>Countersignature</div>
            {[
              { t:"When needed", d:"When a vehicle with permit from State A wants to also operate in State B (without national permit)." },
              { t:"Process", d:"Holder applies to the STA/RTA of the state they want to enter. Fee paid. Countersignature granted." },
              { t:"Temporary countersignature", d:"For short-term operations (elections, melas, events). Limited validity." },
              { t:"Refusal", d:"State can refuse countersignature if route already saturated or in national interest." },
              { t:"MSRTC", d:"MSRTC buses operating in adjoining states (Goa, Karnataka, MP) use countersignature or reciprocal agreement." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function RoadSafetySec() {
  return (
    <div>
      <STitle icon="🦺" title="ROAD SAFETY — STATISTICS AND INITIATIVES" sub="India road accident data, black spots, safety schemes, Golden Hour" color={C.red} />
      <Box glow={C.red} style={{ borderTop:"3px solid "+C.red, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", color:C.red, fontSize:11, letterSpacing:1.5, marginBottom:14 }}>INDIA ROAD ACCIDENT STATISTICS (APPROX, RECENT DATA)</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
          {[
            { l:"Total Accidents/year", v:"~4.4 lakh", c:C.red },
            { l:"Total Deaths/year", v:"~1.68 lakh", c:C.red },
            { l:"Total Injured/year", v:"~4.4 lakh", c:C.orange },
            { l:"Deaths per hour", v:"~19 deaths", c:C.red },
            { l:"India's global rank", v:"Top 3 in deaths", c:C.orange },
            { l:"Primary cause", v:"Speeding (65%+)", c:C.yellow },
            { l:"Most vulnerable", v:"Two-wheeler riders", c:C.gold },
            { l:"Most fatal roads", v:"National Highways", c:C.orange },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
                <div style={{ color:C.muted, fontFamily:"monospace", fontSize:9, letterSpacing:1, marginBottom:4, textTransform:"uppercase" }}>{x.l}</div>
                <div style={{ color:x.c, fontSize:13, fontWeight:700 }}>{x.v}</div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"10px 14px", background:C.red+"10", borderRadius:8, fontSize:12, color:C.text }}>
          India has only 1% of world vehicles but ~6% of global road accident deaths. UN Decade of Action for Road Safety 2021-2030 target: reduce road deaths and injuries by 50%.
        </div>
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.orange }}>
        <div style={{ fontFamily:"monospace", color:C.orange, fontSize:11, letterSpacing:1, marginBottom:12 }}>MAJOR CAUSES OF ROAD ACCIDENTS IN INDIA</div>
        <DTable
          heads={["Cause","Contribution","MV Act Section","Prevention"]}
          cols={[C.soft, C.orange, C.red, C.gold, C.green]}
          rows={[
            ["Over-speeding","65%+ of accidents","Sec 183 (penalty)","Speed governors, speed cameras, enforcement"],
            ["Drunk driving","5-8% of accidents","Sec 185 (DUI)","Breath testing, strict enforcement, awareness"],
            ["Dangerous overtaking","15%+ accidents","Sec 184","Median barriers, road markings, enforcement"],
            ["Red light jumping","Common in cities","Sec 177 (general)","Traffic signals, cameras, challans"],
            ["Mobile phone use while driving","Growing cause","Sec 194D","Hands-free devices, enforcement, awareness"],
            ["No helmet / seatbelt","Worsens injury severity","Sec 194B/C","Mandatory use, enforcement checkpoints"],
            ["Overloading","Brake failure, tyre burst","Sec 194","Weigh bridges, ARTO enforcement"],
            ["Poor road condition","Potholes, unmarked hazards","PWD responsibility","Road maintenance, signage"],
          ]}
          hi={[0,1]}
        />
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>ROAD SAFETY INITIATIVES AND SCHEMES</div>
        <div style={{ display:"grid", gap:10 }}>
          {[
            { name:"iRAD — Integrated Road Accident Database", col:C.cyan, desc:"NIC-developed mobile app + web platform. All accidents recorded within 24 hours. GPS location. Multi-agency data. Identifies accident hotspots (black spots)." },
            { name:"Black Spot Identification and Remediation", col:C.red, desc:"A 'black spot' = location with 5+ accidents or 2+ deaths in 3 consecutive years. NHAI/PWD/MoRTH identify and fix: road geometry, signage, barriers, lighting improvements." },
            { name:"Good Samaritan Protection (MV Amendment 2019)", col:C.green, desc:"Person helping accident victim cannot be harassed by police or hospital. Hospital cannot demand payment before treating. Encourages bystander assistance in Golden Hour." },
            { name:"Suraksha Saptah (Road Safety Week)", col:C.gold, desc:"National Road Safety Week held in January. Awareness campaigns, free helmet distribution, enforcement drives, school programs. MoRTH coordinates." },
            { name:"CCTV and Speed Camera Enforcement", col:C.navy, desc:"Section 136A MV Act — electronic enforcement is legal. Speed cameras, ANPR cameras, CCTV at intersections. Challans issued remotely. e-Challan system." },
            { name:"School Safety Transport Norms", col:C.purple, desc:"School buses: yellow colour, 50 km/h governor, speed governor sealed, first aid kit, female attendant, school name on vehicle, CCTV cameras inside." },
            { name:"National Road Safety Policy", col:C.teal, desc:"Policy framework by MoRTH. Targets: reduce fatalities by 50% by 2030. Four pillars: Safer roads, Safer vehicles, Safer people, Post-crash care." },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:8, padding:12, borderLeft:"3px solid "+x.col, display:"flex", gap:12 }}>
                <div style={{ width:4, background:x.col, borderRadius:2, flexShrink:0 }} />
                <div>
                  <div style={{ color:x.col, fontWeight:700, fontSize:12, marginBottom:4 }}>{x.name}</div>
                  <div style={{ color:C.soft, fontSize:12, lineHeight:1.6 }}>{x.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.yellow }}>
        <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>KEY ROAD SAFETY NUMBERS TO MEMORISE</div>
        <DTable
          heads={["Parameter","Value / Rule"]}
          cols={[C.soft, C.yellow]}
          rows={[
            ["Golden Hour (trauma survival window)","First 60 minutes after accident"],
            ["Black spot definition","5+ accidents OR 2+ deaths in 3 consecutive years at same location"],
            ["BAC limit for DUI (Sec 185)","30 mg per 100 ml of blood"],
            ["Minimum tyre tread depth","1.6 mm (CMVR Rule 96)"],
            ["Speed governor for heavy transport","Mandatory, tamper-proof, max 80 km/h for buses"],
            ["School bus speed governor","50 km/h maximum"],
            ["iRAD accident recording time","Within 24 hours of occurrence"],
            ["India road deaths per year","Approximately 1.68 lakh (168,000)"],
            ["Emergency helpline number","112 (unified emergency number in India)"],
            ["Road accident hotline (NHAI)","1033 (NHAI helpline for highway emergencies)"],
          ]}
          hi={[0,2,8]}
        />
      </Box>
    </div>
  );
}

function TransportMgmtSec() {
  return (
    <div>
      <STitle icon="🚌" title="TRANSPORT MANAGEMENT AND OPERATIONS" sub="Route planning, freight, logistics, MSRTC, urban transport" color={C.teal} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.teal }}>
        <div style={{ fontFamily:"monospace", color:C.teal, fontSize:11, letterSpacing:1, marginBottom:12 }}>TRANSPORT PLANNING CONCEPTS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>Route Rationalisation</div>
            {[
              { t:"Definition", d:"Scientific planning of bus routes to maximise coverage, minimise overlap, and optimise ridership efficiency." },
              { t:"Process", d:"Origin-destination surveys → traffic volume studies → route design → frequency setting → timetabling." },
              { t:"Maharashtra specifics", d:"MSRTC conducts periodic route rationalisation. RTA/STA approves route changes. Overlapping routes may be consolidated." },
              { t:"Key metrics", d:"Load factor (occupancy %), fleet utilisation, revenue per km, cost per km, passengers per vehicle per day." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.cyan, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
          <div>
            <div style={{ color:C.orange, fontWeight:700, fontSize:13, marginBottom:10 }}>Freight and Logistics</div>
            {[
              { t:"Types of freight", d:"General cargo, bulk cargo, liquid cargo (tankers), hazardous materials (special permit + ADR compliance), refrigerated cargo." },
              { t:"Multimodal transport", d:"Combines road + rail + sea + air transport. Reduces cost for long-distance freight. Logistics parks facilitate transfer." },
              { t:"Hazardous goods", d:"ADR (Accord Dangereux Routier) compliant vehicles. Special permit needed. Driver must carry TREM card (transport emergency card). Orange hazard boards on vehicle." },
              { t:"Overloading impact", d:"40% more road damage. Higher tyre blowout risk. Longer stopping distance. Bridges stressed beyond design load. ARTO enforces via weigh bridges." },
            ].map(function(x,i) { return <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40" }}><div style={{ color:C.orange, fontSize:12, fontWeight:700 }}>{x.t}</div><div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div></div>; })}
          </div>
        </div>
      </Box>
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.purple }}>
        <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>URBAN TRANSPORT IN MAHARASHTRA</div>
        <DTable
          heads={["System","City","Authority","Status"]}
          cols={[C.soft, C.purple, C.cyan, C.gold, C.green]}
          rows={[
            ["Mumbai Local Railway","Mumbai","Western Railway + Central Railway (Indian Railways)","Carries 7.5 million passengers/day — busiest suburban rail"],
            ["Mumbai Metro","Mumbai","MMRDA / MMRCL","Multiple lines operational and under construction"],
            ["BEST Bus","Mumbai","Brihanmumbai Electric Supply and Transport","City bus service, electric buses being added"],
            ["Pune Metro","Pune","Pune Metropolitan Region Development Authority (PMRDA)","Lines 1 and 2 operational, line 3 under construction"],
            ["Nagpur Metro","Nagpur","Maharashtra Metro Rail Corporation (Maha-Metro)","Fully operational, first metro in Vidarbha"],
            ["Navi Mumbai Metro","Navi Mumbai","CIDCO","Line 1 operational"],
            ["Thane-Bhiwandi-Kalyan Metro","MMR area","MMRDA","Under construction"],
            ["MSRTC Buses","State-wide","Maharashtra State Road Transport Corporation","16,000+ buses, 250+ depots"],
          ]}
          hi={[0,3,4]}
        />
      </Box>
      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>DIGITAL TRANSPORT INITIATIVES</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { name:"FASTag", col:C.cyan, desc:"RFID-based electronic toll. Mandatory all vehicles. Managed by NHAI/NPCI. Linked to vehicle registration." },
            { name:"VAHAN 4.0", col:C.navy, desc:"National vehicle registration database. All RC, ownership, tax records. Accessible to ARTO via login." },
            { name:"SARATHI 4.0", col:C.purple, desc:"National driving licence database. All DL records, test results, disqualifications. Accessible nationwide." },
            { name:"e-Challan", col:C.orange, desc:"Digital traffic challans. Linked to VAHAN. Unpaid challans block registration renewal." },
            { name:"mParivahan App", col:C.gold, desc:"Mobile app for document verification. ARTO/Police use to check RC, DL, insurance, FC validity on field." },
            { name:"DigiLocker Integration", col:C.teal, desc:"RC and DL stored digitally in DigiLocker are legally valid. Physical documents can stay at home." },
          ].map(function(x,i) {
            return (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderTop:"2px solid "+x.col }}>
                <div style={{ color:x.col, fontWeight:700, fontSize:12, marginBottom:6 }}>{x.name}</div>
                <div style={{ color:C.soft, fontSize:11, lineHeight:1.6 }}>{x.desc}</div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"🏛️", title:"RTO Hierarchy — Remember the Chain", color:C.navy,
      items:[
        "MoRTH (Central) → State Transport Dept → STA (Sec 67) → RTA (Sec 68) → ARTO/AMVI/MVI",
        "STA = State level permits (interstate, long distance). RTA = Regional/district level permits.",
        "ARTO is Class II officer — does NOT make policy. Implements policy set by higher authorities.",
        "ARTO functions: DL, RC, CF, Permits, Enforcement, Data entry in VAHAN/SARATHI/iRAD.",
        "RTA Chairman = District Collector (or nominee). Members include Police, PWD, Health officials.",
        "VAHAN = vehicle database. SARATHI = DL database. Both maintained by NIC under MeitY.",
      ],
    },
    {
      icon:"📋", title:"Permit Types — Stage vs Contract vs Goods", color:C.gold,
      items:[
        "Stage Carriage (Sec 72) = FIXED ROUTE + SEPARATE FARES. MSRTC, city buses, school route buses.",
        "Contract Carriage (Sec 74) = WHOLE VEHICLE hired = ONE CONTRACT = taxi, tourist bus, school van.",
        "Goods Carriage (Sec 79) = for carrying goods commercially. GVW specified in permit.",
        "ALL permit types validity = 5 YEARS (Sec 81). Temporary permit = max 4 months.",
        "National Permit = goods vehicles = all India operation without per-state countersignature.",
        "Countersignature = needed when entering another state without national permit.",
      ],
    },
    {
      icon:"🦺", title:"Road Safety — Critical Numbers", color:C.red,
      items:[
        "India road deaths: ~1.68 lakh per year. About 19 deaths per HOUR.",
        "Primary cause: Overspeeding (65%+ of accidents). Secondary: drunk driving, overtaking.",
        "Golden Hour = first 60 minutes after trauma = most critical for survival.",
        "Black spot = 5+ accidents OR 2+ deaths at same location in 3 consecutive years.",
        "BAC limit = 30 mg per 100 ml blood (DUI under Sec 185). Strictest in Asia.",
        "Emergency numbers: 112 (unified emergency), 1033 (NHAI highway helpline).",
        "iRAD recording deadline = 24 HOURS after accident. Multi-agency: Police + ARTO + PWD + Health.",
      ],
    },
    {
      icon:"🚌", title:"Maharashtra Transport — Key Facts", color:C.teal,
      items:[
        "MSRTC = established June 1, 1960 under Road Transport Corporations Act 1950.",
        "MSRTC operates 16,000+ buses, serves ~6.5 crore passengers/day.",
        "Mumbai local train = 7.5 million passengers/day = busiest suburban rail in world.",
        "Nagpur Metro = first metro in Vidarbha region.",
        "FASTag: RFID technology, mandatory from January 2021, managed by NHAI/NPCI.",
        "mParivahan app: ARTO/Police use for field verification of documents (RC, DL, insurance, FC).",
        "DigiLocker RC and DL = legally valid. SC ruling. Physical documents not mandatory on person.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Transport Management", color:C.green,
      items:[
        "Q: RTA constituted under → Section 68 MV Act",
        "Q: STA constituted under → Section 67 MV Act",
        "Q: Stage carriage permit under → Section 72. Contract carriage → Section 74. Goods → Section 79.",
        "Q: All permit validity → 5 years (Section 81)",
        "Q: MSRTC established under → Road Transport Corporations Act 1950",
        "Q: FASTag uses which technology → RFID (Radio Frequency Identification)",
        "Q: iRAD recording deadline → Within 24 hours",
        "Q: India road deaths per year → Approximately 1.68 lakh",
        "Q: Golden Hour means → First 60 minutes after trauma for maximum survival chance",
        "Q: Black spot definition → 5+ accidents or 2+ deaths at same location in 3 years",
        "Q: VAHAN is maintained by → NIC (National Informatics Centre)",
        "Q: Good Samaritan protection added by → MV Amendment 2019",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Transport Management and Road Safety" color={C.gold} />
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
  { id:"structure",  icon:"🏛️", label:"RTO Structure and Admin" },
  { id:"permits",    icon:"📋", label:"Permits and Operations" },
  { id:"safety",     icon:"🦺", label:"Road Safety and Statistics" },
  { id:"transport",  icon:"🚌", label:"Transport Management" },
  { id:"tricks",     icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("structure");
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
    if (sec==="structure") return <RTOStructureSec />;
    if (sec==="permits") return <PermitsSec />;
    if (sec==="safety") return <RoadSafetySec />;
    if (sec==="transport") return <TransportMgmtSec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [{id:"learn",l:"📖 LEARN"},{id:"practice",l:"📝 PRACTICE"},{id:"tricks",l:"⚡ TIPS"}];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#182028;border-radius:3px}"].join("")}</style>
      <div style={{ background:"#040608", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ fontSize:36 }}>🚦</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>TRANSPORT MANAGEMENT AND ROAD SAFETY</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 11 of 12 · RTO Structure · Permits · Road Safety · MSRTC · Digital Transport</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="6% WEIGHTAGE" color={C.navy} />
              <Tag label="EVERY YEAR" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) {
              return (
                <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                  padding:"11px 22px", border:"none", cursor:"pointer",
                  fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                  color:tab===t.id?C.gold:C.muted,
                  borderBottom:"3px solid "+(tab===t.id?C.gold:"transparent"),
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
                    background:sec===s.id?C.gold+"15":"transparent",
                    border:"1px solid "+(sec===s.id?C.gold+"50":"transparent"),
                    color:sec===s.id?C.gold:C.soft,
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
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.yellow},{l:"DONE",v:sc.n+"/"+QS.length,col:C.navy}].map(function(s) {
                return (
                  <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                    <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                  </Box>
                );
              })}
            </div>
            {done ? (
              <Box glow={C.gold} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.gold }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏆":sc.c>=7?"🚦":"📚"}</div>
                <div style={{ fontSize:26, color:C.gold, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"TRANSPORT MASTER!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Excellent! Ready for the final Topic 12 — Current Affairs and General Science.":sc.c>=7?"Good. Review permit sections and road safety statistics.":"Revise RTO structure, permit types, and road safety initiatives."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.gold, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("tricks"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.gold, background:"transparent", color:C.gold, fontWeight:700, cursor:"pointer", fontSize:14 }}>SEE TIPS</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.cyan} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.yellow:q.level==="HARD"?C.orange:C.purple} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.navy+","+C.gold+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.gold, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.gold, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                    <div style={{ padding:"10px 14px", background:C.gold+"10", borderRadius:8, borderLeft:"3px solid "+C.gold }}>
                      <span style={{ color:C.gold, fontWeight:700, fontSize:11, fontFamily:"monospace" }}>EXAM TIP: </span>
                      <span style={{ color:C.text, fontSize:13 }}>{q.tip}</span>
                    </div>
                  </Box>
                )}
                {sel!==null && !done && (
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.navy+","+C.gold+")", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
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