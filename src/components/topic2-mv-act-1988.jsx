import { useState } from "react";

/* ═══════════════════════════════════════════
   DESIGN: Legal / Government document aesthetic
   Deep green + gold + cream — official, serious, sharp
   Font: Playfair Display (headers) + JetBrains Mono (sections/codes)
═══════════════════════════════════════════ */

const C = {
  bg:      "#05090E",
  panel:   "#080E17",
  card:    "#0C1520",
  border:  "#162030",
  gold:    "#D4A843",
  green:   "#1A7A4A",
  lime:    "#22C55E",
  red:     "#DC2626",
  blue:    "#38BDF8",
  purple:  "#A78BFA",
  orange:  "#F97316",
  text:    "#E8EEF4",
  muted:   "#4A6278",
  soft:    "#8BA3BC",
};

/* ── SHARED ── */
const Tag = ({ label, color = C.gold }) => (
  <span style={{
    background: color + "1A", color, border: `1px solid ${color}45`,
    padding: "2px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700,
    letterSpacing: 0.8, textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  }}>{label}</span>
);

const Panel = ({ children, style = {}, glow }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: 20,
    boxShadow: glow ? `0 0 24px ${glow}15` : "none",
    ...style,
  }}>{children}</div>
);

const SecTitle = ({ icon, title, sub, color = C.gold }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
      <span style={{ fontSize: 30 }}>{icon}</span>
      <h2 style={{
        margin: 0, fontSize: 24, color: C.text,
        fontFamily: "'Playfair Display', serif", fontWeight: 700,
      }}>{title}</h2>
    </div>
    {sub && <p style={{ margin: "0 0 0 42px", color: C.soft, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{sub}</p>}
    <div style={{ height: 2, background: `linear-gradient(90deg, ${color}, transparent)`, marginTop: 10 }} />
  </div>
);

/* ── SECTION BADGE ── */
const SecBadge = ({ num, title, color = C.gold }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10,
    background: color + "12", border: `1px solid ${color}40`,
    borderRadius: 8, padding: "6px 14px", marginBottom: 14,
  }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", color, fontSize: 12, fontWeight: 700 }}>SEC {num}</span>
    <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{title}</span>
  </div>
);

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */

const chapterData = [
  {
    ch: "I", title: "Preliminary", secs: "1–2", color: C.blue,
    icon: "📜", importance: "LOW",
    topics: [
      { sec: "1", title: "Short title, extent, commencement", note: "MV Act 1988. Extends to whole India. Came into force from 1 July 1989." },
      { sec: "2", title: "Definitions (80+ definitions)", note: "MOST IMPORTANT chapter for definitions. Exam loves picking definitions.", isKey: true },
    ],
    keyDefs: [
      { term: "Motor Vehicle (Sec 2(28))", def: "Any mechanically propelled vehicle adapted for use upon roads — whether propelled by external power or by internal combustion engine. EXCLUDES: vehicles running on fixed rails, special purpose vehicles on rails, vehicles used exclusively on premises." },
      { term: "Transport Vehicle (Sec 2(47))", def: "A public service vehicle, goods carriage, educational institution bus, or private service vehicle." },
      { term: "Public Service Vehicle (Sec 2(35))", def: "Motor vehicle used or adapted to be used for carrying passengers for hire or reward — includes maxi-cab, motorcab, contract carriage, stage carriage." },
      { term: "Goods Carriage (Sec 2(14))", def: "Motor vehicle constructed or adapted for use solely for conveyance of goods, including breakdown vehicles." },
      { term: "Stage Carriage (Sec 2(40))", def: "Motor vehicle constructed or adapted to carry more than 6 passengers for hire/reward at separate fares — common bus." },
      { term: "Contract Carriage (Sec 2(7))", def: "Motor vehicle carrying passengers as a whole under a contract — fare for the entire vehicle, not per seat. Examples: Tourist buses, school vans." },
      { term: "Light Motor Vehicle (LMV)", def: "Vehicle with GVW/unladen weight not exceeding 7500 kg. Includes cars, jeeps, small vans." },
      { term: "Medium Goods Vehicle", def: "GVW exceeding 7500 kg but not exceeding 12000 kg." },
      { term: "Heavy Goods Vehicle", def: "GVW exceeding 12000 kg." },
      { term: "Learner's Licence", def: "Licence granted to a person to drive a motor vehicle as a learner under a qualified driver's supervision." },
    ],
  },
  {
    ch: "II", title: "Licensing of Drivers of Motor Vehicles", secs: "3–26", color: C.gold,
    icon: "🪪", importance: "VERY HIGH",
    topics: [
      { sec: "3", title: "Necessity for driving licence", note: "No person shall drive a motor vehicle in any public place unless he holds an effective driving licence.", isKey: true },
      { sec: "4", title: "Age limit for driving", note: "Min age for LMV/motorcycle: 18 years. Transport vehicles: 20 years (must have held LMV licence for 1 year). Motor vehicles (non-transport) in hill areas: can apply at 16.", isKey: true },
      { sec: "6", title: "Restrictions on holding more than one licence", note: "A person shall not hold more than ONE driving licence at a time." },
      { sec: "7", title: "Grant of learner's licence", note: "Learner's licence: Valid for 6 months from date of issue." },
      { sec: "8", title: "Grant of driving licence", note: "Can apply for driving licence after holding learner's licence for 30 days and passing driving test.", isKey: true },
      { sec: "10", title: "Form and contents of licences", note: "Driving licence shall specify the class of vehicles the holder is entitled to drive." },
      { sec: "14", title: "Currency of licences", note: "DL for LMV: valid for 20 years or until holder turns 50 (whichever earlier). After 50: renewed every 5 years. Transport vehicle DL: valid for 3 years.", isKey: true },
      { sec: "15", title: "Renewal of driving licence", note: "Application for renewal within 30 days of expiry: renewed w/o penalty. After 1 year of expiry: fresh test may be required." },
      { sec: "19", title: "Power to disqualify from holding a driving licence", note: "Court can disqualify a person from holding DL for offences." },
      { sec: "22", title: "Learner's licence to drive transport vehicle", note: "Minimum age 18. Must hold learner's licence for 30 days before applying for DL." },
    ],
  },
  {
    ch: "III", title: "Licensing of Conductors", secs: "27–38", color: C.blue,
    icon: "🎫", importance: "LOW-MEDIUM",
    topics: [
      { sec: "29", title: "Grant of conductor's licence", note: "Conductor of a stage carriage must hold a conductor's licence." },
      { sec: "35", title: "Duties of a conductor", note: "Carry passengers in compliance with provisions; produce licence on demand." },
    ],
  },
  {
    ch: "IV", title: "Registration of Motor Vehicles", secs: "39–70", color: C.green,
    icon: "📋", importance: "VERY HIGH",
    topics: [
      { sec: "39", title: "Necessity for registration", note: "No person shall drive any motor vehicle in any public place unless it is registered under this Act.", isKey: true },
      { sec: "40", title: "Registration — where to register", note: "Vehicle must be registered in the State where the owner resides / has principal place of business." },
      { sec: "41", title: "Registration of motor vehicles", note: "Registering Authority (RA) = RTO. Application within 7 days (new vehicles). RA may require vehicle for inspection." },
      { sec: "43", title: "Temporary registration", note: "Temporary registration: valid for 1 month, extendable by 1 month. For NEW vehicles being moved to another state.", isKey: true },
      { sec: "44", title: "Production of vehicle at time of registration", note: "Vehicle must be produced before the registering authority for inspection/verification." },
      { sec: "47", title: "Assignment of new registration mark", note: "On change of state (residence), new registration mark assigned. Owner must get vehicle re-registered in new state within 12 months.", isKey: true },
      { sec: "49", title: "Change of residence or place of business", note: "Owner moving to another district must report to RA within 30 days." },
      { sec: "50", title: "Transfer of ownership", note: "Buyer must report transfer to RA within 30 days in same state, 45 days if another state. Seller also to report within 14 days.", isKey: true },
      { sec: "51", title: "Special provisions for transport vehicles", note: "Transport vehicles' registration certificates include additional particulars about route/permit." },
      { sec: "52", title: "Alteration in motor vehicle", note: "No person shall alter a vehicle without prior approval of RA. Penalty for unauthorized alteration.", isKey: true },
      { sec: "53", title: "Suspension of certificate of registration", note: "RA can suspend RC if vehicle fails fitness test or is structurally unsafe." },
      { sec: "54", title: "Cancellation of registration", note: "RA can cancel registration for non-compliance." },
      { sec: "55", title: "Destruction / theft of vehicle", note: "Owner must report to RA. RA cancels registration." },
    ],
  },
  {
    ch: "V", title: "Control of Transport Vehicles", secs: "66–96", color: C.purple,
    icon: "🚌", importance: "HIGH",
    topics: [
      { sec: "66", title: "Necessity for permit", note: "No owner can use a transport vehicle in a public place unless it holds a permit.", isKey: true },
      { sec: "67", title: "Control of transport vehicles by STAs", note: "State Transport Authority (STA) controls stage carriage and route permits." },
      { sec: "68", title: "Regional Transport Authority (RTA)", note: "RTA grants permits for its region. ARTO functions under RTA/STA." },
      { sec: "69", title: "General provisions as to applications for permits", note: "Application must include vehicle details, route details, type of service." },
      { sec: "72", title: "Grant of stage carriage permit", note: "RTA grants stage carriage permit specifying: route, timings, fare, number of passengers.", isKey: true },
      { sec: "74", title: "Contract carriage permit", note: "Permit for contract carriage. Valid for 5 years. Specifies class of contract carriage.", isKey: true },
      { sec: "76", title: "Educational institution bus permit", note: "Special permit for school buses. Conditions: name of school, designated stops, maximum students." },
      { sec: "79", title: "Goods carriage permit", note: "RTA grants goods carriage permit specifying type of goods, axle weight, route.", isKey: true },
      { sec: "81", title: "Duration and renewal of permits", note: "Stage carriage permit: valid for 5 years. All permits can be renewed.", isKey: true },
      { sec: "84", title: "Transfer of permit", note: "Permit NOT transferable generally. Can be transferred only in certain cases (death of holder, etc.)." },
      { sec: "86", title: "Cancellation/suspension of permit", note: "RTA can cancel/suspend permit for violation of conditions." },
    ],
  },
  {
    ch: "VI", title: "Special Provisions Relating to State Transport Undertakings", secs: "97–105", color: C.blue,
    icon: "🏛️", importance: "MEDIUM",
    topics: [
      { sec: "97", title: "Definition — STU", note: "State Transport Undertaking = any undertaking providing road transport services by State Government (MSRTC, BEST etc.)" },
      { sec: "100", title: "Scheme for road transport by STA", note: "STA can formulate scheme to nationalize road transport on any route." },
    ],
  },
  {
    ch: "VII", title: "Construction, Equipment and Maintenance of Motor Vehicles", secs: "106–127", color: C.orange,
    icon: "🔧", importance: "HIGH",
    topics: [
      { sec: "109", title: "General provision regarding construction and maintenance", note: "Every vehicle must be maintained in roadworthy condition.", isKey: true },
      { sec: "110", title: "Power to make rules for construction, maintenance", note: "Central Govt makes rules for construction standards." },
      { sec: "113", title: "Limits of speed", note: "Central Govt prescribes speed limits. Violation = offence.", isKey: true },
      { sec: "114", title: "Power to restrict use of vehicles", note: "State Govt can restrict vehicles on certain roads (weight, speed)." },
      { sec: "115", title: "Power to restrict use — speed limits", note: "Appropriate Govt can fix lower speed limits for particular roads/areas." },
    ],
  },
  {
    ch: "VIII", title: "Control of Traffic", secs: "128–138", color: C.lime,
    icon: "🚦", importance: "HIGH",
    topics: [
      { sec: "128", title: "Safety measures for drivers", note: "Seat belts compulsory for driver and front seat passenger.", isKey: true },
      { sec: "129", title: "Wearing of protective headgear (helmet)", note: "Every person driving or riding on a two-wheeler must wear a protective helmet. Helmet must conform to ISI.", isKey: true },
      { sec: "130", title: "Duty to obey traffic signs", note: "Every person must obey traffic signs erected by competent authority." },
      { sec: "131", title: "Duty of driver to stop in certain cases", note: "Driver must stop on signal from police officer in uniform or traffic signal." },
      { sec: "132", title: "Duty of driver of motor vehicle in case of accident", note: "Must take injured to hospital, report to police within 24 hours.", isKey: true },
      { sec: "133", title: "Duty to give information", note: "Driver must give driver's licence, insurance particulars to police on demand." },
      { sec: "134", title: "Duty of owner in case of accident", note: "Owner must inform insurer within reasonable time about accident." },
    ],
  },
  {
    ch: "IX", title: "Motor Vehicle Accidents & Liability", secs: "139–164A", color: C.red,
    icon: "⚖️", importance: "HIGH",
    topics: [
      { sec: "140", title: "Liability without fault (no-fault liability)", note: "Fixed compensation: Death = ₹5 lakh, Grievous hurt = ₹2.5 lakh. Payable regardless of fault.", isKey: true },
      { sec: "145", title: "Definitions — insurance", note: "Third party = any person other than insured and owner. Policy must cover third-party risks." },
      { sec: "146", title: "Necessity for insurance against third party risk", note: "No vehicle shall be used unless there is valid third-party insurance.", isKey: true },
      { sec: "147", title: "Requirements of policies", note: "Policy must cover: death/injury to third party, damage to third-party property (up to ₹7.5 lakh)." },
      { sec: "163", title: "Claims Tribunal", note: "Motor Accident Claims Tribunal (MACT) set up for adjudicating compensation claims." },
    ],
  },
  {
    ch: "X", title: "Insurance of Motor Vehicles against Third Party Risks", secs: "145–164", color: C.red,
    icon: "📄", importance: "VERY HIGH",
    topics: [
      { sec: "146", title: "Mandatory third-party insurance", note: "COMPULSORY for every motor vehicle. No vehicle can ply without valid TP insurance.", isKey: true },
      { sec: "147", title: "Requirement of policy", note: "Must cover: death/bodily injury to any person + damage to property (≥₹7.5L) caused by vehicle." },
      { sec: "149", title: "Duty of insurer", note: "Insurer bound to satisfy judgments against insured even if policy condition breached (some exceptions)." },
      { sec: "155", title: "Effect of death on certain causes of action", note: "Claim survives death of claimant — estate can pursue claim." },
    ],
  },
  {
    ch: "XI", title: "Special Provisions — Accidents, Hit and Run", secs: "161–164A", color: C.orange,
    icon: "🚑", importance: "HIGH",
    topics: [
      { sec: "161", title: "Solatium Fund — Hit and Run", note: "Hit and Run compensation: Death = ₹2 lakh. Grievous injury = ₹50,000. (MV Amendment 2019 increased amounts.)", isKey: true },
      { sec: "162", title: "Scheme for payment of compensation", note: "Central Govt scheme for hit-and-run compensation. Fund maintained by General Insurance Council." },
    ],
  },
  {
    ch: "XIII", title: "Offences, Penalties and Procedure", secs: "177–210", color: C.red,
    icon: "⚠️", importance: "EXTREMELY HIGH",
    topics: [
      { sec: "177", title: "General provision for punishment", note: "General: First offence ₹500, Subsequent offence ₹1500.", isKey: true },
      { sec: "178", title: "Penalty for travelling without ticket", note: "First offence: ₹500. Subsequent: ₹1500." },
      { sec: "179", title: "Disobedience of orders", note: "Disobeying police/authority orders: ₹2000 or imprisonment up to 6 months, or both." },
      { sec: "180", title: "Allowing unauthorised person to drive", note: "Fine ₹5000 or imprisonment up to 3 months.", isKey: true },
      { sec: "181", title: "Driving without licence", note: "Fine up to ₹5000 OR imprisonment up to 3 months.", isKey: true },
      { sec: "182", title: "Driving despite disqualification", note: "Fine ₹10,000 or imprisonment up to 3 months." },
      { sec: "182A", title: "Violation of emission norms", note: "Fine: ₹1000 (first offence), ₹2000 (subsequent).", isKey: true },
      { sec: "182B", title: "Alteration of vehicles", note: "Fine ₹5000. Additional fine ₹1000 per day if violation continues." },
      { sec: "183", title: "Driving at excessive speed", note: "LMV: ₹1000 (first), ₹2000 (subsequent). MV/transport: ₹2000 (first), ₹4000 (subsequent).", isKey: true },
      { sec: "184", title: "Driving dangerously", note: "First offence: ₹1000–5000 OR imprisonment 6 months–1 year. Second offence within 3 years: ₹10,000 OR imprisonment 2 years.", isKey: true },
      { sec: "185", title: "Driving under influence of alcohol/drugs", note: "Blood alcohol: >30mg/100ml blood. Fine ₹10,000 OR imprisonment 6 months (1st). ₹15,000 OR 2 years (2nd within 3 yrs).", isKey: true },
      { sec: "186", title: "Driving when mentally/physically unfit", note: "Fine ₹200 (first), ₹500 (subsequent)." },
      { sec: "189", title: "Racing on public roads", note: "Fine ₹5000 OR imprisonment up to 1 month." },
      { sec: "190", title: "Using vehicle in unsafe condition", note: "Fine ₹1000–5000. If condition causes accident: ₹10,000." },
      { sec: "192", title: "Using vehicle without registration", note: "Fine ₹5000–10,000. Transport vehicle without registration: ₹10,000.", isKey: true },
      { sec: "192A", title: "Using vehicle without permit", note: "Fine ₹10,000 (first), ₹10,000 + 1 year imprisonment (subsequent).", isKey: true },
      { sec: "193", title: "Aggravated offences related to registration", note: "Penalties for tampering with registration plates etc." },
      { sec: "194", title: "Driving vehicle exceeding permissible weight", note: "Overloading: ₹20,000 + ₹2000 per tonne excess. (Post MV Amendment 2019)", isKey: true },
      { sec: "194A", title: "Overloading passengers", note: "Transport vehicle overloading passengers: ₹1000 per extra passenger.", isKey: true },
      { sec: "194B", title: "Seat belt violation", note: "Fine: ₹1000." },
      { sec: "194C", title: "Helmet not worn", note: "Fine: ₹1000 + disqualification from DL for 3 months.", isKey: true },
      { sec: "194D", title: "Dangerous driving postures / mobile phone", note: "Mobile phone while driving: ₹1000 (1st), ₹10,000 (2nd). Dangerous postures: ₹1500." },
      { sec: "194E", title: "Failure to give way to emergency vehicles", note: "Fine: ₹10,000 OR imprisonment up to 6 months." },
      { sec: "196", title: "Driving uninsured vehicle", note: "Fine ₹2000 (first), ₹4000 (subsequent). Imprisonment up to 3 months.", isKey: true },
      { sec: "198", title: "Owner/guardian delivering vehicle to person not authorised", note: "Fine: ₹25,000 or imprisonment up to 3 years. (MV Amendment 2019)" },
      { sec: "199", title: "Offences relating to driving by minor / guardian/owner", note: "Owner: ₹25,000 + cancelled registration. Juvenile sent to JJ Board.", isKey: true },
      { sec: "199A", title: "Guardian liable if minor drives", note: "Guardian/owner convicted if minor drives. Vehicle registration cancelled.", isKey: true },
      { sec: "202", title: "Powers of police officer", note: "Police officer can arrest without warrant for DUI, driving without DL, refusing to give name & address." },
      { sec: "203", title: "Breath and blood tests", note: "Police can require breath test. Refusal = offence. Blood test if breath test positive." },
      { sec: "206", title: "Power to detain vehicles", note: "Police can seize/detain vehicle used in commission of offence." },
      { sec: "210A", title: "Enhanced penalty for repeat offenders", note: "Doubled penalties for repeat offenders within 3 years." },
    ],
  },
  {
    ch: "XIV", title: "Miscellaneous", secs: "211–239", color: C.blue,
    icon: "📌", importance: "MEDIUM",
    topics: [
      { sec: "212", title: "Power of State Govt to make rules", note: "State can make rules supplementary to Central rules." },
      { sec: "213", title: "National Road Safety Council", note: "Central Govt to constitute National Road Safety Council." },
      { sec: "215", title: "National Register of Driving Licences", note: "Central Govt to maintain national register of all DLs." },
    ],
  },
];

const penaltiesCompact = [
  { offence: "No Driving Licence (Sec 181)", first: "₹5,000 / 3 mo jail", repeat: "₹10,000 / 3 mo jail", color: C.red },
  { offence: "Drunk Driving (Sec 185)", first: "₹10,000 / 6 mo jail", repeat: "₹15,000 / 2 yrs jail", color: C.red },
  { offence: "Dangerous Driving (Sec 184)", first: "₹1,000–5,000 / 6 mo–1yr", repeat: "₹10,000 / 2 yrs jail", color: C.red },
  { offence: "Overspeeding LMV (Sec 183)", first: "₹1,000", repeat: "₹2,000", color: C.orange },
  { offence: "Overspeeding HMV (Sec 183)", first: "₹2,000", repeat: "₹4,000", color: C.orange },
  { offence: "No Helmet (Sec 194C)", first: "₹1,000 + DL disqualified 3 mo", repeat: "₹1,000 + DL disqualified 3 mo", color: C.orange },
  { offence: "No Seat Belt (Sec 194B)", first: "₹1,000", repeat: "₹1,000", color: C.gold },
  { offence: "No Insurance (Sec 196)", first: "₹2,000 / 3 mo jail", repeat: "₹4,000 / 3 mo jail", color: C.orange },
  { offence: "No Registration (Sec 192)", first: "₹5,000–10,000", repeat: "₹10,000", color: C.orange },
  { offence: "No Permit (Sec 192A)", first: "₹10,000", repeat: "₹10,000 + 1 yr jail", color: C.red },
  { offence: "Overloading — weight (Sec 194)", first: "₹20,000 + ₹2000/tonne", repeat: "₹20,000 + ₹2000/tonne", color: C.orange },
  { offence: "Overloading — passengers (Sec 194A)", first: "₹1,000 per extra pax", repeat: "₹1,000 per extra pax", color: C.gold },
  { offence: "Using unsafe vehicle (Sec 190)", first: "₹1,000–5,000", repeat: "₹10,000 if accident caused", color: C.orange },
  { offence: "Mobile phone while driving (Sec 194D)", first: "₹1,000", repeat: "₹10,000", color: C.gold },
  { offence: "Not giving way to ambulance (Sec 194E)", first: "₹10,000 / 6 mo jail", repeat: "₹10,000 / 6 mo jail", color: C.red },
  { offence: "Emission violation (Sec 182A)", first: "₹1,000", repeat: "₹2,000", color: C.gold },
  { offence: "Minor driving — Guardian (Sec 199A)", first: "₹25,000 + RC cancelled", repeat: "₹25,000 + RC cancelled", color: C.red },
  { offence: "General offence (Sec 177)", first: "₹500", repeat: "₹1,500", color: C.soft },
  { offence: "No-fault liability: Death (Sec 140)", first: "₹5 lakh (no fault basis)", repeat: "—", color: C.purple },
  { offence: "Hit & Run: Death (Sec 161)", first: "₹2 lakh solatium", repeat: "—", color: C.purple },
];

const amendments2019 = [
  { area: "Penalties", change: "Massively increased. Drunk driving: ₹10,000 (was ₹2,000). No DL: ₹5,000 (was ₹500). Overloading: ₹20,000 (was ₹2,000)." },
  { area: "Juvenile/Minor driving", change: "New Sec 199A — Guardian/Owner held liable. Vehicle RC cancelled. Juvenile tried under JJ Act. Maximum ₹25,000 fine + 3 yrs jail." },
  { area: "Hit & Run compensation", change: "Death: ₹2 lakh (was ₹25,000). Grievous injury: ₹50,000 (was ₹12,500). Massive 8× increase." },
  { area: "No-fault liability", change: "Death: ₹5 lakh (was ₹50,000). Grievous hurt: ₹2.5 lakh (was ₹25,000). 10× increase." },
  { area: "Good Samaritan protection", change: "Person helping accident victim cannot be harassed by police/hospital. Immunity from civil/criminal liability." },
  { area: "National Road Safety Board", change: "New body for advising Central Govt on road safety standards, vehicle standards, highway design." },
  { area: "Recall of defective vehicles", change: "Central Govt can order recall of unsafe/defective vehicles (like product recall)." },
  { area: "Online services", change: "DL, RC, permit applications — online. Paperless. Reduction of personal visits to RTO." },
  { area: "Aggregator regulations", change: "New regulations for cab aggregators (Ola, Uber). Must obtain licence from State Govt." },
  { area: "Motor vehicle accident fund", change: "New fund to cover: hit-and-run, uninsured vehicles, vehicles with stolen identity." },
];

const questions = [
  {
    id: 1, level: "BASIC", sec: "Sec 3",
    q: "Under Section 3 of the Motor Vehicles Act 1988, which of the following is TRUE?",
    opts: [
      "A person below 21 years cannot drive any motor vehicle",
      "No person shall drive a motor vehicle in any public place unless he holds an effective driving licence",
      "A learner's licence is equivalent to a driving licence for all purposes",
      "A person can drive with an expired driving licence for up to 30 days",
    ],
    ans: 1,
    exp: "Section 3 clearly states: 'No person shall drive a motor vehicle in any public place or any other place unless he holds an effective driving licence issued to him authorising him to drive the vehicle.' Key words: PUBLIC PLACE + EFFECTIVE (not expired) driving licence. Expired DL is not 'effective'.",
    tip: "Section 3 = The FOUNDATION of the whole Act. 'No person shall drive... unless he holds an EFFECTIVE driving licence.' Effective = valid, not suspended, not expired.",
  },
  {
    id: 2, level: "BASIC", sec: "Sec 39",
    q: "Section 39 of MV Act 1988 deals with which of the following?",
    opts: ["Driving Licence requirements", "Necessity for registration of motor vehicles", "Vehicle fitness certificate", "Third-party insurance"],
    ans: 1,
    exp: "Section 39 = Necessity for registration. 'No person shall drive any motor vehicle and no owner of a motor vehicle shall cause or permit the vehicle to be driven in any public place unless the vehicle is registered under this chapter.' Registration is mandatory for all motor vehicles.",
    tip: "Golden trio to memorise: Sec 3 = Driving Licence | Sec 39 = Registration | Sec 146 = Insurance. These three are the basic mandatory requirements for any vehicle on road.",
  },
  {
    id: 3, level: "BASIC", sec: "Sec 146",
    q: "According to Section 146 of MV Act 1988, which insurance is MANDATORY for every motor vehicle?",
    opts: ["Comprehensive insurance", "Third-party insurance only", "Own damage insurance", "Both comprehensive and third-party"],
    ans: 1,
    exp: "Section 146 makes THIRD-PARTY insurance mandatory for every motor vehicle. This covers: death or bodily injury to any third party + damage to third-party property. Comprehensive insurance (which also covers own damage) is optional but third-party is COMPULSORY by law. No vehicle can be used without valid TP insurance.",
    tip: "Sec 146 = Third Party (TP) insurance is COMPULSORY. Without TP insurance: Fine ₹2,000 (first offence) under Sec 196. Comprehensive = TP + own damage. Only TP is legally mandatory.",
  },
  {
    id: 4, level: "BASIC", sec: "Sec 185",
    q: "Under Section 185 of MV Act, the blood alcohol content (BAC) limit for drivers is:",
    opts: ["50 mg per 100 ml of blood", "30 mg per 100 ml of blood", "80 mg per 100 ml of blood", "20 mg per 100 ml of blood"],
    ans: 1,
    exp: "Section 185 prescribes: Blood alcohol concentration exceeding 30 mg per 100 ml of blood = driving under influence (DUI). This is stricter than many countries (UK = 80mg, most European = 50mg, India = 30mg). Penalty: First offence = ₹10,000 or 6 months jail. Repeat within 3 years = ₹15,000 or 2 years jail.",
    tip: "India's DUI limit = 30 mg/100 ml blood (very strict). In breath test: equivalent to 150 micrograms per 100 ml of breath. Refuse breath test = automatic offence. Police can require blood test under Sec 203.",
  },
  {
    id: 5, level: "MEDIUM", sec: "Sec 184",
    q: "A driver is convicted for the SECOND time for dangerous driving under Sec 184 within 3 years. What is the penalty?",
    opts: [
      "₹5,000 fine only",
      "₹1,000 fine + 1 year jail",
      "₹10,000 fine or 2 years imprisonment",
      "₹15,000 fine or 6 months jail",
    ],
    ans: 2,
    exp: "Section 184 — Dangerous Driving:\nFirst offence: Fine ₹1,000–5,000 OR imprisonment 6 months–1 year, or both.\nSecond offence within 3 years: Fine ₹10,000 OR imprisonment up to 2 years, or both.\n\nKey: 3-year window matters. After 3 years, next offence is treated as 'first' again. Dangerous driving = driving in a manner dangerous to public.",
    tip: "Sec 184 dangerous driving vs Sec 183 overspeeding: Dangerous driving is more serious (higher penalty). Remember: 2nd offence dangerous driving in 3 years = ₹10,000 / 2 years. Overspeeding 2nd offence = just ₹2,000–4,000.",
  },
  {
    id: 6, level: "MEDIUM", sec: "Sec 50",
    q: "When a motor vehicle is transferred (sold), the buyer must inform the Registering Authority within how many days (same state)?",
    opts: ["14 days", "30 days", "45 days", "60 days"],
    ans: 1,
    exp: "Section 50 — Transfer of Ownership:\n• BUYER must report transfer to RA within 30 days (same state) or 45 days (another state).\n• SELLER (transferor) must report to RA within 14 days of transfer.\n\nFailure to report = offence. The RC must be transferred to new owner's name. Without proper transfer: insurance complications in case of accident.",
    tip: "Transfer timelines: Seller = 14 days. Buyer (same state) = 30 days. Buyer (another state) = 45 days. Never confuse seller and buyer deadlines in exam!",
  },
  {
    id: 7, level: "MEDIUM", sec: "Sec 140",
    q: "Under Section 140 (no-fault liability), the compensation payable to dependants for DEATH caused by a motor vehicle accident is:",
    opts: ["₹50,000", "₹1 lakh", "₹2.5 lakh", "₹5 lakh"],
    ans: 3,
    exp: "After MV Amendment Act 2019, Section 140 no-fault compensation was substantially increased:\n• Death: ₹5 lakh (was ₹50,000 before 2019)\n• Grievous hurt: ₹2.5 lakh (was ₹25,000 before 2019)\n\n'No-fault' means payable WITHOUT proving negligence — automatic, regardless of who was at fault. It's a minimum, fast-track compensation.",
    tip: "Sec 140 = No-fault liability. Post-2019 amendment: Death = ₹5L, Grievous hurt = ₹2.5L. Separate from Sec 163A (structured formula compensation). Don't confuse with hit-and-run Sec 161 (Death = ₹2L — solatium fund).",
  },
  {
    id: 8, level: "MEDIUM", sec: "Sec 66",
    q: "Which section of MV Act 1988 makes it mandatory for a transport vehicle to have a PERMIT to ply on public roads?",
    opts: ["Section 39", "Section 56", "Section 66", "Section 81"],
    ans: 2,
    exp: "Section 66 = 'Necessity for permits.' No owner of a motor vehicle shall use or permit the use of the vehicle as a transport vehicle in any public place, whether or not such vehicle is actually carrying any passengers or goods, unless the owner holds the valid permit granted or countersigned by the RTA.\n\nSec 39 = Registration (all vehicles), Sec 56 = Fitness Certificate (transport vehicles), Sec 66 = Permit (transport vehicles), Sec 81 = Duration of permits.",
    tip: "For TRANSPORT VEHICLES, 3 mandatory documents: Registration (Sec 39) + Fitness Certificate (Sec 56) + Permit (Sec 66) + Insurance (Sec 146). All four must be valid. As ARTO/AMVI, you check all four during inspection.",
  },
  {
    id: 9, level: "HARD", sec: "Sec 56",
    q: "Under Section 56 of MV Act 1988, a transport vehicle's Certificate of Fitness is valid for how long when first issued for a NEW vehicle?",
    opts: ["1 year", "2 years", "1 year then yearly renewal", "6 months then yearly renewal"],
    ans: 1,
    exp: "Section 56 — Certificate of Fitness:\n• NEW transport vehicle: First fitness certificate is valid for 2 years.\n• After initial 2 years: Annual renewal (yearly).\n\nThe certificate is issued by the Inspecting Authority (ARTO/MVI at RTO). The vehicle must be presented for physical inspection. Without valid fitness certificate, transport vehicle cannot ply — offence under Sec 192.\n\nFor private vehicles (non-transport): Fitness is part of registration renewal, not a separate certificate (first 15 years yearly, after 15 years every 6 months).",
    tip: "NEW transport vehicle fitness: 2 years first, then annual. Private vehicle: No separate fitness certificate (registration renewal). As ARTO/MVI, issuing fitness certificates is your PRIMARY JOB FUNCTION.",
  },
  {
    id: 10, level: "HARD", sec: "MV Amendment 2019",
    q: "Under the Motor Vehicles (Amendment) Act 2019, which NEW provision makes the GUARDIAN/OWNER liable if a juvenile commits a traffic offence?",
    opts: ["Section 199", "Section 199A", "Section 181", "Section 198"],
    ans: 1,
    exp: "Section 199A (inserted by MV Amendment 2019): 'Offences committed by juveniles — liability of guardian/owner.'\n\nIf a juvenile drives and commits an offence: (1) The GUARDIAN is deemed to have committed the offence and is punishable with ₹25,000 AND/OR 3 years imprisonment. (2) The VEHICLE REGISTRATION is CANCELLED. (3) The juvenile is sent to Juvenile Justice Board — not tried as adult.\n\nThis is a completely NEW provision created by 2019 amendment and is a hot exam topic.",
    tip: "2019 Amendment NEW sections to remember: Sec 199A (juvenile, guardian liable), Sec 164A (interim compensation within 30 days), recall of defective vehicles, Good Samaritan immunity. All 2019 insertions are high-probability exam topics.",
  },
  {
    id: 11, level: "EXAM SPECIAL", sec: "Sec 194C / 129",
    q: "Under which provisions of MV Act is wearing a helmet made compulsory, and what is the penalty for violation under MV Amendment 2019?",
    opts: [
      "Section 128; ₹500 fine",
      "Section 129 (duty) + Section 194C (penalty); ₹1,000 + DL disqualification for 3 months",
      "Section 130; ₹2,000 fine",
      "Section 184; ₹5,000 fine",
    ],
    ans: 1,
    exp: "Two sections work together:\n1. Section 129: 'Wearing of protective headgear — Every person driving or riding as pillion on a two-wheeled motor vehicle shall wear protective headgear conforming to ISI standards.'\n\n2. Section 194C (post-2019 amendment): Penalty for violating Sec 129 = ₹1,000 fine + Disqualification from holding driving licence for 3 months.\n\nKey detail: ISI mark helmet compulsory. Penalty has two components: fine AND DL disqualification (3 months). This 3-month disqualification is often missed in answers.",
    tip: "Helmet violation = ₹1,000 fine PLUS 3-month DL disqualification (post-2019). Seat belt violation = ₹1,000 (no DL disqualification). Helmet has the extra DL disqualification — remember this difference. Also: helmet must bear ISI mark (IS 4151).",
  },
  {
    id: 12, level: "EXAM SPECIAL", sec: "ARTO Job Functions",
    q: "As an ARTO, during a transport vehicle inspection, which of the following documents is NOT your primary responsibility to check under the MV Act?",
    opts: [
      "Certificate of Registration (RC)",
      "Certificate of Fitness (FC)",
      "Vehicle permit",
      "Route time table of private vehicles",
    ],
    ans: 3,
    exp: "ARTO/AMVI checks: (1) RC — Registration Certificate (Sec 39), (2) Certificate of Fitness (Sec 56) — physical condition, (3) Permit (Sec 66) — permission to operate as transport vehicle, (4) Insurance certificate (Sec 146), (5) Driving licence of driver (Sec 3), (6) Pollution Under Control (PUC) certificate.\n\nRoute time table of PRIVATE vehicles is not an ARTO inspection responsibility — private vehicles don't operate on fixed routes. Transport vehicles (stage carriage) have route/time conditions in their permit, but this is checked differently.",
    tip: "ARTO inspection checklist (mnemonic 'DRFIP'): D = DL (driver's licence), R = RC (registration), F = Fitness certificate, I = Insurance, P = Permit (for transport). PUC is additional. All 5 must be valid.",
  },
];

export default function MVAct() {
  const [tab, setTab] = useState("overview");
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandSec, setExpandSec] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState({ c: 0, w: 0, hist: [] });
  const [quizDone, setQuizDone] = useState(false);
  const [penFilter, setPenFilter] = useState("all");

  const q = questions[qIdx];

  function pickAns(i) {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    setScore(s => ({
      c: s.c + (i === q.ans ? 1 : 0),
      w: s.w + (i !== q.ans ? 1 : 0),
      hist: [...s.hist, { correct: i === q.ans, level: q.level }],
    }));
  }

  function nextQ() {
    if (qIdx < questions.length - 1) { setQIdx(qIdx + 1); setSelected(null); setShowExp(false); }
    else setQuizDone(true);
  }

  function resetQuiz() {
    setQIdx(0); setSelected(null); setShowExp(false);
    setScore({ c: 0, w: 0, hist: [] }); setQuizDone(false);
  }

  const accuracy = score.hist.length ? Math.round(score.c / score.hist.length * 100) : 0;

  const tabs = [
    { id: "overview", label: "🗂️ CHAPTERS" },
    { id: "penalties", label: "⚠️ PENALTIES" },
    { id: "amendment", label: "🆕 2019 AMENDMENT" },
    { id: "practice", label: "📝 PRACTICE" },
    { id: "tricks", label: "⚡ TRICKS" },
  ];

  const filteredPenalties = penFilter === "all" ? penaltiesCompact :
    penFilter === "severe" ? penaltiesCompact.filter(p => p.color === C.red) :
    penaltiesCompact.filter(p => p.color === C.orange);

  const ch = chapterData[activeChapter];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Source Sans Pro', -apple-system, sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;600;700&family=Source+Sans+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.25s ease; }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: `linear-gradient(160deg, #040B14 0%, #05090E 50%, #100408 100%)`,
        borderBottom: `1px solid ${C.border}`, padding: "0 20px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0 14px" }}>
            <div style={{ fontSize: 36 }}>⚖️</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>
                Motor Vehicles Act, 1988
              </div>
              <div style={{ color: C.muted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>
                Topic 2 of 12 · As amended by MV (Amendment) Act 2019
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <Tag label="15% WEIGHTAGE" color={C.gold}/>
              <Tag label="FREE MARKS" color={C.lime}/>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "11px 18px", border: "none", cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                background: "transparent",
                color: tab === t.id ? C.gold : C.muted,
                borderBottom: `3px solid ${tab === t.id ? C.gold : "transparent"}`,
                transition: "all 0.15s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>

        {/* ══════ CHAPTERS TAB ══════ */}
        {tab === "overview" && (
          <div>
            <SecTitle icon="📜" title="Motor Vehicles Act 1988 — Chapter Guide" sub="Click any chapter to explore sections, key definitions & exam points" />

            {/* Why free marks */}
            <Panel glow={C.gold} style={{ marginBottom: 24, borderTop: `3px solid ${C.gold}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, letterSpacing: 1.5, marginBottom: 10 }}>WHY THIS IS 'FREE MARKS'</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[
                  { icon: "🔁", t: "Predictable Questions", d: "Same section numbers asked every year. Sec 3, 39, 56, 66, 146, 184, 185 — seen in 9/10 papers." },
                  { icon: "📌", t: "Specific & Objective", d: "No ambiguity. Either you know Sec 184 penalty or you don't. Study once, never forget." },
                  { icon: "💼", t: "Job Relevance", d: "As ARTO/AMVI, you apply this law daily. The exam tests your actual job knowledge." },
                ].map((c, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                    <div style={{ color: C.gold, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.t}</div>
                    <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.6 }}>{c.d}</div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Chapter selector */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 8, marginBottom: 22 }}>
              {chapterData.map((c, i) => (
                <button key={i} onClick={() => setActiveChapter(i)} style={{
                  padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${activeChapter === i ? c.color : C.border}`,
                  background: activeChapter === i ? c.color + "15" : C.card, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: activeChapter === i ? c.color : C.muted, letterSpacing: 1 }}>CH. {c.ch}</div>
                  <div style={{ color: C.text, fontSize: 11, fontWeight: 600, lineHeight: 1.4, marginTop: 2 }}>{c.title}</div>
                  <div style={{ marginTop: 6 }}><Tag label={c.importance} color={c.color} /></div>
                </button>
              ))}
            </div>

            {/* Chapter detail */}
            <Panel key={activeChapter} className="fade-up" style={{ borderTop: `3px solid ${ch.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.text }}>
                    {ch.icon} Chapter {ch.ch}: {ch.title}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginTop: 4 }}>
                    Sections {ch.secs}
                  </div>
                </div>
                <Tag label={ch.importance} color={ch.color} />
              </div>

              {/* Key Definitions (Ch I only) */}
              {ch.keyDefs && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ch.color, letterSpacing: 1, marginBottom: 12 }}>KEY DEFINITIONS (SEC 2) — MEMORISE THESE</div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {ch.keyDefs.map((d, i) => (
                      <div key={i} style={{ padding: "10px 14px", background: C.bg, borderRadius: 8, borderLeft: `2px solid ${ch.color}60` }}>
                        <div style={{ color: ch.color, fontWeight: 700, fontSize: 13, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{d.term}</div>
                        <div style={{ color: C.soft, fontSize: 13, lineHeight: 1.7 }}>{d.def}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ch.color, letterSpacing: 1, marginBottom: 12 }}>
                SECTION-WISE BREAKDOWN
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {ch.topics.map((t, i) => (
                  <div key={i}
                    onClick={() => setExpandSec(expandSec === `${activeChapter}-${i}` ? null : `${activeChapter}-${i}`)}
                    style={{ cursor: "pointer" }}>
                    <div style={{
                      padding: "12px 14px", borderRadius: 8,
                      background: expandSec === `${activeChapter}-${i}` ? ch.color + "12" : C.bg,
                      border: `1px solid ${expandSec === `${activeChapter}-${i}` ? ch.color + "50" : C.border + "80"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.15s",
                    }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        {t.isKey && <span style={{ fontSize: 10 }}>🔑</span>}
                        <span style={{ color: ch.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, minWidth: 55 }}>Sec {t.sec}</span>
                        <span style={{ color: C.text, fontSize: 13, fontWeight: t.isKey ? 600 : 400 }}>{t.title}</span>
                      </div>
                      <span style={{ color: C.muted, fontSize: 14 }}>{expandSec === `${activeChapter}-${i}` ? "▲" : "▼"}</span>
                    </div>
                    {expandSec === `${activeChapter}-${i}` && (
                      <div className="fade-up" style={{ padding: "12px 16px", background: ch.color + "08", borderRadius: "0 0 8px 8px", borderLeft: `2px solid ${ch.color}60` }}>
                        <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8 }}>{t.note}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ══════ PENALTIES TAB ══════ */}
        {tab === "penalties" && (
          <div>
            <SecTitle icon="⚠️" title="Penalties & Fines Master Table" sub="MV Act 1988 as amended by MV Amendment Act 2019 — memorise these!" color={C.red} />

            <Panel style={{ marginBottom: 20, padding: "14px 18px", background: C.red + "08", borderColor: C.red + "40" }}>
              <div style={{ color: C.red, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, marginBottom: 8 }}>⚠️ IMPORTANT NOTE</div>
              <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>
                All penalty amounts below are as per the <strong style={{ color: C.gold }}>MV (Amendment) Act 2019</strong> which massively increased fines. Always mention "as per 2019 amendment" in answers. Previous amounts (pre-2019) were 3–10× lower.
              </div>
            </Panel>

            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              {[
                { k: "all", l: "All Penalties" },
                { k: "severe", l: "🔴 Severe" },
                { k: "moderate", l: "🟠 Moderate" },
              ].map(f => (
                <button key={f.k} onClick={() => setPenFilter(f.k)} style={{
                  padding: "8px 18px", borderRadius: 6, border: `1.5px solid ${penFilter === f.k ? C.gold : C.border}`,
                  background: penFilter === f.k ? C.gold + "15" : C.card, color: penFilter === f.k ? C.gold : C.muted,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: "pointer",
                }}>{f.l}</button>
              ))}
            </div>

            <Panel>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: C.panel }}>
                      {["Offence & Section", "1st Offence", "Repeat Offence"].map((h, i) => (
                        <th key={h} style={{
                          padding: "11px 14px", textAlign: "left",
                          color: i === 0 ? C.muted : i === 1 ? C.gold : C.orange,
                          borderBottom: `2px solid ${C.border}`,
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPenalties.map((p, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}40` }}>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{ color: p.color, fontSize: 8, marginRight: 6 }}>●</span>
                          <span style={{ color: C.text, fontWeight: 500 }}>{p.offence}</span>
                        </td>
                        <td style={{ padding: "10px 14px", color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{p.first}</td>
                        <td style={{ padding: "10px 14px", color: p.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{p.repeat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* Key groupings */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              <Panel style={{ borderTop: `2px solid ${C.red}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: C.red, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>₹10,000+ OFFENCES</div>
                {[
                  "Drunk driving (1st): ₹10,000",
                  "Dangerous driving (2nd): ₹10,000",
                  "No permit transport: ₹10,000",
                  "Not giving way to ambulance: ₹10,000",
                  "Mobile phone (2nd): ₹10,000",
                  "Guardian (minor drives): ₹25,000",
                  "Overloading vehicles: ₹20,000+",
                  "No-fault death: ₹5 lakh",
                ].map((x, i) => (
                  <div key={i} style={{ padding: "6px 0", color: C.text, fontSize: 12, borderBottom: `1px solid ${C.border}40`, display: "flex", gap: 8 }}>
                    <span style={{ color: C.red, flexShrink: 0 }}>→</span>{x}
                  </div>
                ))}
              </Panel>
              <Panel style={{ borderTop: `2px solid ${C.lime}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: C.lime, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>IMPRISONMENT PROVISIONS</div>
                {[
                  "Drunk driving: 6 months (1st)",
                  "Drunk driving: 2 yrs (2nd in 3 yrs)",
                  "Dangerous driving: 1 yr (1st)",
                  "Dangerous driving: 2 yrs (2nd in 3 yrs)",
                  "No insurance: 3 months",
                  "No DL: 3 months",
                  "No permit: 1 yr (2nd offence)",
                  "Minor driving (guardian): 3 yrs",
                ].map((x, i) => (
                  <div key={i} style={{ padding: "6px 0", color: C.text, fontSize: 12, borderBottom: `1px solid ${C.border}40`, display: "flex", gap: 8 }}>
                    <span style={{ color: C.lime, flexShrink: 0 }}>→</span>{x}
                  </div>
                ))}
              </Panel>
            </div>
          </div>
        )}

        {/* ══════ 2019 AMENDMENT TAB ══════ */}
        {tab === "amendment" && (
          <div>
            <SecTitle icon="🆕" title="MV Amendment Act 2019 — Complete Guide" sub="Every change is exam material. High frequency since 2020." color={C.orange} />

            <Panel style={{ marginBottom: 20, borderLeft: `4px solid ${C.orange}`, background: C.orange + "07" }}>
              <div style={{ color: C.orange, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>WHY 2019 AMENDMENT IS CRITICAL FOR YOU</div>
              <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8 }}>
                The Motor Vehicles (Amendment) Act 2019 was the <strong style={{ color: C.gold }}>biggest reform in 30 years</strong> of MV Act. It overhauled penalties, added new offences, protected Good Samaritans, regulated cab aggregators, and digitised RTO services. Since its enactment, <strong style={{ color: C.orange }}>every single MPSC RTO exam has had 4–6 questions</strong> specifically on 2019 amendment provisions.
              </div>
            </Panel>

            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {amendments2019.map((a, i) => (
                <Panel key={i} style={{ borderLeft: `3px solid ${C.orange}60`, padding: 16 }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: C.orange + "20",
                      border: `1px solid ${C.orange}40`, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.orange, fontWeight: 700, flexShrink: 0,
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ color: C.orange, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{a.area}</div>
                      <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>{a.change}</div>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>

            {/* Good Samaritan special */}
            <Panel glow={C.lime} style={{ borderTop: `2px solid ${C.lime}`, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.lime, marginBottom: 12 }}>Good Samaritan Protection — New Feature</div>
              <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8, marginBottom: 12 }}>
                The 2019 amendment introduced <strong style={{ color: C.lime }}>Good Samaritan</strong> protection — a person who provides emergency assistance to a road accident victim in good faith shall NOT be liable for any civil or criminal action. Hospitals CANNOT demand payment from Good Samaritans before treating accident victims.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { title: "What's protected", items: ["Giving first aid", "Taking victim to hospital", "Informing police/helpline", "Donating blood voluntarily"] },
                  { title: "What's mandated for hospitals", items: ["Cannot refuse treatment", "Cannot demand payment upfront from GS", "Must provide first aid", "Cannot harass GS witness"] },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 8, padding: 14 }}>
                    <div style={{ color: C.lime, fontWeight: 700, fontSize: 12, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>{s.title.toUpperCase()}</div>
                    {s.items.map((item, j) => (
                      <div key={j} style={{ color: C.soft, fontSize: 12, padding: "4px 0", display: "flex", gap: 8 }}>
                        <span style={{ color: C.lime }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Panel>

            {/* Section number changes summary */}
            <Panel style={{ borderTop: `2px solid ${C.purple}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: C.purple, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>NEW SECTIONS ADDED BY 2019 AMENDMENT</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { sec: "164A", title: "Interim compensation", note: "Claims tribunal must award interim compensation within 30 days of application" },
                  { sec: "164B", title: "Motor vehicle accident fund", note: "National fund to compensate hit-and-run, uninsured, unidentified vehicle victims" },
                  { sec: "164C", title: "Central Govt scheme for compensation", note: "Govt to establish scheme for compensation of road accident victims" },
                  { sec: "193A", title: "Offences by companies", note: "If company violates MV Act, every responsible person liable" },
                  { sec: "199A", title: "Juvenile driving — guardian liable", note: "₹25,000 + RC cancelled + juvenile to JJ Board (KEY NEW SECTION)" },
                  { sec: "210A", title: "Enhanced penalty for repeat offenders", note: "Repeat within 3 years = double the penalty" },
                  { sec: "210B", title: "Abetment of traffic violations by officers", note: "Penalises RTO/police officials who abet/condone violations" },
                  { sec: "136A", title: "Electronic monitoring of enforcement", note: "Speed cameras, CCTV, electronic enforcement legally recognized" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "10px 12px", background: C.bg, borderRadius: 8, borderLeft: `2px solid ${C.purple}60` }}>
                    <div style={{ color: C.purple, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700 }}>Sec {s.sec}</div>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginTop: 4 }}>{s.title}</div>
                    <div style={{ color: C.soft, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{s.note}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ══════ PRACTICE TAB ══════ */}
        {tab === "practice" && (
          <div>
            <SecTitle icon="📝" title="Practice Questions — Motor Vehicles Act" sub="12 questions: Basic to Expert level. Covers all high-frequency sections." color={C.gold} />

            {/* Score */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { l: "CORRECT", v: score.c, col: C.lime },
                { l: "WRONG", v: score.w, col: C.red },
                { l: "ACCURACY", v: accuracy + "%", col: C.gold },
                { l: "ATTEMPTED", v: `${score.hist.length}/${questions.length}`, col: C.blue },
              ].map(s => (
                <Panel key={s.l} style={{ textAlign: "center", padding: 14, borderTop: `3px solid ${s.col}` }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: s.col, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginTop: 3 }}>{s.l}</div>
                </Panel>
              ))}
            </div>

            {quizDone ? (
              <Panel glow={C.gold} style={{ textAlign: "center", padding: "36px 20px" }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>{score.c >= 9 ? "🏛️" : score.c >= 7 ? "⚖️" : "📖"}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: C.gold, marginBottom: 8 }}>
                  {score.c}/{questions.length} — {score.c >= 9 ? "EXCELLENT ADVOCATE!" : score.c >= 7 ? "SOLID KNOWLEDGE" : "NEEDS MORE REVISION"}
                </div>
                <div style={{ color: C.soft, maxWidth: 440, margin: "0 auto 24px", fontSize: 13, lineHeight: 1.7 }}>
                  {score.c >= 9 ? "You are ready for MV Act questions in the actual exam. Move to Topic 3." :
                   score.c >= 7 ? "Good. Focus on the 2019 amendment sections and penalty amounts." :
                   "Review: section numbers, penalty amounts, and 2019 amendment changes. Use the Tricks tab."}
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button onClick={resetQuiz} style={{
                    padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: C.gold, color: "#000", fontWeight: 700, fontSize: 14,
                  }}>RETRY QUIZ</button>
                  <button onClick={() => setTab("tricks")} style={{
                    padding: "12px 28px", borderRadius: 8, border: `1px solid ${C.gold}`,
                    background: "transparent", color: C.gold, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  }}>SEE TRICKS</button>
                </div>
              </Panel>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Tag label={`Q${qIdx + 1} of ${questions.length}`} color={C.blue}/>
                    <Tag label={q.level} color={q.level === "BASIC" ? C.lime : q.level === "MEDIUM" ? C.gold : q.level === "HARD" ? C.orange : C.purple}/>
                    <Tag label={q.sec} color={C.soft}/>
                  </div>
                </div>
                <div style={{ height: 3, background: C.border, borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
                  <div style={{ width: `${(qIdx / questions.length) * 100}%`, height: "100%", background: C.gold, borderRadius: 2, transition: "width 0.35s" }}/>
                </div>

                <Panel style={{ marginBottom: 14, borderLeft: `4px solid ${C.gold}`, padding: "18px 20px" }}>
                  <div style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>
                    <span style={{ color: C.gold, fontFamily: "'Playfair Display', serif", fontSize: 20, marginRight: 10 }}>Q{qIdx + 1}.</span>
                    {q.q}
                  </div>
                </Panel>

                <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                  {q.opts.map((opt, i) => {
                    let bg = C.card, bdr = C.border, col = C.text, lc = C.muted;
                    if (selected !== null) {
                      if (i === q.ans) { bg = C.lime + "15"; bdr = C.lime; lc = C.lime; }
                      else if (i === selected) { bg = C.red + "15"; bdr = C.red; lc = C.red; col = C.soft; }
                      else { col = C.muted; }
                    }
                    return (
                      <div key={i} onClick={() => pickAns(i)} style={{
                        display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 16px",
                        borderRadius: 10, border: `1.5px solid ${bdr}`, background: bg, color: col,
                        cursor: selected !== null ? "default" : "pointer", transition: "all 0.15s",
                      }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 6, background: lc + "25",
                          border: `1.5px solid ${lc}50`, display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: lc, fontWeight: 700, flexShrink: 0,
                        }}>{["A","B","C","D"][i]}</div>
                        <span style={{ fontSize: 13.5, lineHeight: 1.55, paddingTop: 3 }}>{opt}</span>
                        {selected !== null && i === q.ans && <span style={{ marginLeft: "auto", flexShrink: 0 }}>✅</span>}
                        {selected !== null && i === selected && i !== q.ans && <span style={{ marginLeft: "auto", flexShrink: 0 }}>❌</span>}
                      </div>
                    );
                  })}
                </div>

                {showExp && (
                  <Panel className="fade-up" style={{ marginBottom: 18, borderLeft: `4px solid ${selected === q.ans ? C.lime : C.red}` }}>
                    <div style={{ fontWeight: 700, color: selected === q.ans ? C.lime : C.red, marginBottom: 10, fontSize: 14 }}>
                      {selected === q.ans ? "✅ CORRECT!" : `❌ WRONG — Correct: ${["A","B","C","D"][q.ans]}`}
                    </div>
                    <div style={{ color: C.text, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: 12 }}>{q.exp}</div>
                    <div style={{ padding: "10px 14px", background: C.gold + "12", borderRadius: 8, borderLeft: `3px solid ${C.gold}` }}>
                      <span style={{ color: C.gold, fontWeight: 700, fontSize: 11, fontFamily: "monospace" }}>⚡ EXAM TIP: </span>
                      <span style={{ color: C.text, fontSize: 13 }}>{q.tip}</span>
                    </div>
                  </Panel>
                )}

                {selected !== null && !quizDone && (
                  <button onClick={nextQ} style={{
                    width: "100%", padding: 15, borderRadius: 10, border: "none",
                    background: C.gold, color: "#000", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Playfair Display', serif", fontSize: 17, letterSpacing: 1,
                  }}>{qIdx < questions.length - 1 ? "Next Question →" : "Finish Quiz"}</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════ TRICKS TAB ══════ */}
        {tab === "tricks" && (
          <div>
            <SecTitle icon="⚡" title="Memory Tricks & Exam Shortcuts" sub="Mnemonics, patterns & toppers' tactics for MV Act" color={C.gold} />
            <div style={{ display: "grid", gap: 14 }}>
              {[
                {
                  icon: "🔑", title: "The 5-KEY SECTIONS You MUST Know (In Order)", color: C.gold,
                  items: [
                    "Sec 3 → Driving Licence (No DL = No Drive)",
                    "Sec 39 → Registration (No RC = No Ply)",
                    "Sec 56 → Fitness Certificate (Transport vehicles only)",
                    "Sec 66 → Permit (Transport vehicles only)",
                    "Sec 146 → Insurance (No insurance = Illegal)",
                    "Mnemonic: '3 Dragons, 39 Riders, 56 Fight, 66 Play, 146 Insurance' → 3,39,56,66,146",
                    "Alternate: DL → RC → FC → Permit → Insurance = 'Damn Reliable Fit People Insure'",
                  ],
                },
                {
                  icon: "⚠️", title: "Penalty Pattern — The Logic Behind Numbers", color: C.red,
                  items: [
                    "₹500/₹1500: General/minor violations (Sec 177/178)",
                    "₹1,000: Helmet, seat belt, emission violation, mobile phone (1st)",
                    "₹2,000: No insurance (1st), general overspeeding repeat",
                    "₹5,000: No DL, no registration, unauthorised person driving",
                    "₹10,000: Drunk driving, no permit, dangerous driving (2nd), not giving way to ambulance",
                    "₹20,000+: Overloading by weight",
                    "₹25,000: Guardian liable for minor driving",
                    "Rule: Life-threatening offences = JAIL. Administrative offences = Fine only.",
                  ],
                },
                {
                  icon: "📅", title: "Important Time Limits to Memorise", color: C.blue,
                  items: [
                    "Learner's licence validity: 6 months",
                    "Apply for DL after LL: minimum 30 days",
                    "DL (LMV) validity: 20 years or till age 50 (whichever first)",
                    "DL renewal after 50: every 5 years",
                    "Transport vehicle DL: valid 3 years",
                    "Temporary registration: 1 month (extendable by 1 month)",
                    "Transfer of ownership — Buyer (same state): 30 days",
                    "Transfer of ownership — Buyer (diff state): 45 days",
                    "Transfer of ownership — Seller: 14 days",
                    "New transport vehicle: First Fitness Certificate valid 2 years, then annual",
                    "Permit validity (stage carriage): 5 years",
                    "Repeat offence window (for enhanced penalty): 3 years",
                  ],
                },
                {
                  icon: "🏛️", title: "Compensation Figures — The Money Chart", color: C.purple,
                  items: [
                    "No-fault liability (Sec 140): Death = ₹5 lakh, Grievous hurt = ₹2.5 lakh",
                    "Hit & Run (Sec 161): Death = ₹2 lakh, Grievous hurt = ₹50,000",
                    "Third-party property damage covered: up to ₹7.5 lakh",
                    "Remember: No-fault > Hit & Run (5L > 2L). More fault assumed in hit & run ironically because offender fled.",
                    "Pre-2019: No-fault death was only ₹50,000. 2019 raised it 10× to ₹5 lakh!",
                  ],
                },
                {
                  icon: "🚌", title: "Vehicle Classification Shortcut", color: C.lime,
                  items: [
                    "Stage Carriage: Bus stops, multiple passengers, SEPARATE FARES → 'Stage = separate fares'",
                    "Contract Carriage: Taxi, tourist bus, WHOLE vehicle one fare → 'Contract = whole contract'",
                    "LMV: up to 7,500 kg GVW → Car, jeep, small van",
                    "MGV: 7,500–12,000 kg GVW → Medium trucks",
                    "HGV: above 12,000 kg GVW → Heavy trucks, trailers",
                    "PSV = Public Service Vehicle = stage carriage + maxi-cab + motor cab + contract carriage",
                  ],
                },
                {
                  icon: "📋", title: "ARTO's 5-Point Inspection Checklist (Sec 56 + 66)", color: C.orange,
                  items: [
                    "1. DL — Driving Licence of driver (Sec 3)",
                    "2. RC — Registration Certificate (Sec 39) — valid, matching vehicle",
                    "3. FC — Fitness Certificate (Sec 56) — valid, not expired (transport only)",
                    "4. Permit (Sec 66) — appropriate type (stage/goods/contract), valid route",
                    "5. Insurance — TP insurance certificate (Sec 146) — valid",
                    "BONUS: PUC Certificate — Pollution Under Control (Emission rules)",
                    "Mnemonic: 'DRFIP' = DL, RC, FC, Insurance, Permit (+ PUC)",
                    "If any of these 5 missing → vehicle must be detained under Sec 206",
                  ],
                },
                {
                  icon: "📌", title: "Most Repeated Section Numbers in MPSC", color: C.gold,
                  items: [
                    "Sec 2 — Definitions (asked every year)",
                    "Sec 3 — DL necessity (asked every year)",
                    "Sec 39 — Registration necessity (asked every year)",
                    "Sec 56 — Fitness certificate (asked 9/10 years)",
                    "Sec 66 — Permit necessity (asked 8/10 years)",
                    "Sec 146 — Insurance necessity (asked every year)",
                    "Sec 184 — Dangerous driving penalty (asked 8/10 years)",
                    "Sec 185 — Drunk driving (BAC limit + penalty) (asked 7/10 years)",
                    "Sec 140 — No-fault compensation (asked 6/10 years, more post-2019)",
                    "Sec 199A — Juvenile driving guardian liability (NEW — asked every year post-2019)",
                  ],
                },
              ].map((s, i) => (
                <Panel key={i} style={{ borderLeft: `4px solid ${s.color}` }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: s.color, fontWeight: 700 }}>{s.title}</span>
                  </div>
                  {s.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}30`, alignItems: "flex-start" }}>
                      <span style={{ color: s.color, flexShrink: 0, marginTop: 1, fontSize: 12 }}>▸</span>
                      <span style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </Panel>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}