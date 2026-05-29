import { useState } from "react";

var C = {
  bg:"#06080F", card:"#0C1020", border:"#182038",
  saffron:"#F97316", blue:"#3B82F6", green:"#16A34A",
  gold:"#D97706", purple:"#7C3AED", teal:"#0D9488",
  red:"#DC2626", lime:"#65A30D", cyan:"#0891B2",
  text:"#E8EDF8", muted:"#2D3E58", soft:"#6B84A8",
};

function Tag(props) {
  var c = props.color || C.saffron;
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
  var c = props.color || C.saffron;
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
  var cols = props.cols || [C.soft, C.saffron, C.blue, C.green, C.gold];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#080C18" }}>
            {props.heads.map(function(h,i) {
              return <th key={i} style={{ padding:"10px 14px", textAlign:i===0?"left":"center", color:cols[i]||C.soft, borderBottom:"2px solid "+C.border, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(function(row,ri) {
            return (
              <tr key={ri} style={{ background:hl.includes(ri)?C.saffron+"08":"transparent", borderBottom:"1px solid "+C.border+"40" }}>
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
    id:1, level:"BASIC", topic:"Constitution",
    q:"The Constitution of India came into force on:",
    opts:["August 15, 1947","November 26, 1949","January 26, 1950","October 2, 1950"],
    ans:2,
    exp:"The Constitution of India was ADOPTED on November 26, 1949 (celebrated as Constitution Day / Samvidhan Divas). However, it came into FORCE (enforced / enacted) on January 26, 1950 — Republic Day.\n\nJanuary 26 was chosen deliberately: it was the anniversary of Purna Swaraj (Complete Independence) declaration made by the Indian National Congress on January 26, 1930 at the Lahore session under Jawaharlal Nehru's presidency.\n\nAugust 15, 1947 = Independence Day (British rule ended, not Constitution).",
    tip:"Two important Constitution dates: November 26, 1949 = ADOPTED (Constitution Day). January 26, 1950 = ENFORCED (Republic Day). Adopted does not mean enforced — remember both dates and what each means.",
  },
  {
    id:2, level:"BASIC", topic:"Preamble",
    q:"The Preamble to the Indian Constitution describes India as a:",
    opts:["Federal, Democratic, Republic","Sovereign, Socialist, Secular, Democratic Republic","Democratic, Secular, Federal State","Quasi-federal, Sovereign, Secular State"],
    ans:1,
    exp:"The Preamble declares India to be a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC.\n\nOriginal 1950 Preamble had only: Sovereign, Democratic, Republic.\n\nThe words SOCIALIST and SECULAR were added by the 42nd Constitutional Amendment, 1976 (during Emergency under Indira Gandhi).\n\nMeaning of each word:\nSovereign = independent, not under any foreign power\nSocialist = social and economic justice, equitable distribution\nSecular = no state religion, equal respect to all religions\nDemocratic = people elect their representatives\nRepublic = elected head of state (President), not hereditary monarchy",
    tip:"Preamble = Sovereign, Socialist, Secular, Democratic, Republic. Remember: SOCIALIST and SECULAR were added by the 42nd Amendment in 1976. Original 1950 Preamble had only 3 words: Sovereign, Democratic, Republic.",
  },
  {
    id:3, level:"BASIC", topic:"Fundamental Rights",
    q:"Which Article of the Indian Constitution is known as the 'Heart and Soul of the Constitution' (as called by Dr B.R. Ambedkar)?",
    opts:["Article 14 (Right to Equality)","Article 19 (Right to Freedom)","Article 21 (Right to Life and Personal Liberty)","Article 32 (Right to Constitutional Remedies)"],
    ans:3,
    exp:"Article 32 — Right to Constitutional Remedies — was called the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar.\n\nArticle 32 gives citizens the RIGHT TO MOVE THE SUPREME COURT directly if any Fundamental Right is violated. The Supreme Court can issue writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto) to enforce Fundamental Rights.\n\nWithout Article 32, all other Fundamental Rights would be meaningless — there would be no mechanism to enforce them. Hence it is the most important Fundamental Right.\n\nNote: Article 226 gives High Courts similar power to issue writs.",
    tip:"Article 32 = Heart and Soul of Constitution (Ambedkar). Gives right to move SUPREME COURT for FR violation. Five writs: Habeas Corpus (produce body), Mandamus (command to do duty), Prohibition (stop lower court), Certiorari (quash order), Quo Warranto (show authority). Article 226 = similar writs by HIGH COURT.",
  },
  {
    id:4, level:"BASIC", topic:"73rd Amendment",
    q:"The 73rd Constitutional Amendment Act 1992 gave constitutional status to which institution?",
    opts:["Urban Local Bodies (Municipalities)","Panchayati Raj Institutions (Village governance)","State Public Service Commissions","Cooperative Societies"],
    ans:1,
    exp:"The 73rd Constitutional Amendment Act 1992 gave CONSTITUTIONAL STATUS to Panchayati Raj Institutions (PRIs) — rural local self-governance bodies.\n\nKey provisions of 73rd Amendment:\n- Added Part IX to Constitution (Articles 243 to 243-O)\n- Added 11th Schedule (29 subjects transferred to Panchayats)\n- Three-tier structure: Gram Panchayat (village) — Panchayat Samiti (block) — Zilla Parishad (district)\n- Reservation: 1/3 seats for women, seats for SC/ST in proportion to population\n- State Election Commission for elections\n- State Finance Commission for funds\n\n74th Amendment (same year): Gave constitutional status to Urban Local Bodies (Nagarpalika/Municipality).\nAdded Part IX-A and 12th Schedule (18 subjects).",
    tip:"73rd Amendment = RURAL = Panchayati Raj. 74th Amendment = URBAN = Municipalities. Easy trick: 73 comes before 74 just like Rural (villages) existed before Urban bodies got formal status. 11th Schedule (Panchayat) vs 12th Schedule (Municipality).",
  },
  {
    id:5, level:"MEDIUM", topic:"Parliament",
    q:"Which of the following statements about the Rajya Sabha (Council of States) is CORRECT?",
    opts:[
      "Rajya Sabha can be dissolved by the President of India",
      "Rajya Sabha is a permanent body — it cannot be dissolved",
      "All members of Rajya Sabha are elected by direct vote of citizens",
      "Money bills can be introduced in the Rajya Sabha",
    ],
    ans:1,
    exp:"Rajya Sabha is a PERMANENT BODY — it cannot be dissolved (unlike Lok Sabha which can be dissolved).\n\nKey Rajya Sabha facts:\n- Total strength: 250 members (238 elected + 12 nominated by President for arts, science, literature, social service)\n- Members elected by State Legislative Assemblies (indirect election — MLAs vote, not citizens directly)\n- Tenure: 6 years. One-third members retire every 2 years.\n- Minimum age: 30 years\n- Cannot introduce Money Bills (only Lok Sabha can)\n- In case of deadlock between Lok Sabha and Rajya Sabha: Joint sitting is called (presided by Lok Sabha Speaker)\n- Special powers of Rajya Sabha: Can pass resolution under Article 249 to make Parliament legislate on State List subjects",
    tip:"Rajya Sabha = PERMANENT (no dissolution). Members have 6-year term. Elected INDIRECTLY by MLAs (not citizens). 238 elected + 12 nominated = 250 total. Money bills CANNOT be introduced in Rajya Sabha — only Lok Sabha. Lok Sabha Speaker presides over joint sitting.",
  },
  {
    id:6, level:"MEDIUM", topic:"Directive Principles",
    q:"Directive Principles of State Policy (DPSPs) are contained in which Part of the Constitution, and are they enforceable in courts?",
    opts:[
      "Part III, enforceable in courts",
      "Part IV, NOT enforceable in courts (non-justiciable)",
      "Part III, NOT enforceable in courts",
      "Part IV, enforceable in courts",
    ],
    ans:1,
    exp:"DPSPs are in PART IV of the Constitution (Articles 36-51) and are NON-JUSTICIABLE (not enforceable in courts).\n\nDifference from Fundamental Rights:\n- Fundamental Rights (Part III): Justiciable — courts can enforce them\n- DPSPs (Part IV): Non-justiciable — government should TRY to implement but courts cannot force it\n\nHowever, DPSPs are FUNDAMENTAL IN GOVERNANCE — the state shall keep these in mind while making laws.\n\nKey DPSPs include:\n- Art 39A: Equal justice and free legal aid\n- Art 40: Organisation of village panchayats\n- Art 44: Uniform Civil Code (UCC)\n- Art 45: Early childhood care and education\n- Art 47: Prohibition of intoxicating drinks\n- Art 48: Organisation of agriculture, protection of cows\n- Art 51: Promotion of international peace",
    tip:"DPSPs = Part IV = NON-JUSTICIABLE (courts cannot enforce). Fundamental Rights = Part III = JUSTICIABLE (courts can enforce). DPSPs are moral duties of the state. If conflict between FR and DPSP: usually FR prevails BUT Parliament can amend Constitution to give DPSPs precedence (Kesavananda Bharati case).",
  },
  {
    id:7, level:"MEDIUM", topic:"Emergency",
    q:"Which type of Emergency under the Indian Constitution suspends Fundamental Rights and transfers all legislative powers to Parliament?",
    opts:[
      "State Emergency (Article 356) — President's Rule",
      "Financial Emergency (Article 360)",
      "National Emergency (Article 352) — Armed rebellion or external aggression",
      "Both Article 352 and Article 356",
    ],
    ans:2,
    exp:"NATIONAL EMERGENCY under Article 352 is declared on grounds of: war, external aggression, or ARMED REBELLION (changed from internal disturbance by 44th Amendment 1978).\n\nEffects of National Emergency:\n- Fundamental Rights under Article 19 (6 freedoms) are AUTOMATICALLY SUSPENDED\n- Articles 20 and 21 cannot be suspended even during emergency\n- Parliament can make laws on State List subjects\n- President can modify constitutional provisions relating to revenue distribution\n- Must be approved by Parliament within 1 month by special majority\n\nOther Emergencies:\n- Article 356 (State Emergency / President's Rule): State government fails. State list legislative power goes to Parliament but does NOT suspend FRs.\n- Article 360 (Financial Emergency): Financial stability threatened. Has NEVER been declared in India's history.\n\nNational Emergency declared 3 times: 1962 (China war), 1971 (Pakistan war), 1975-77 (internal disturbance — controversial).",
    tip:"Three types: Art 352 (National Emergency), Art 356 (State Emergency/President's Rule), Art 360 (Financial Emergency — never declared). Only Art 352 suspends Art 19 FRs. Articles 20 and 21 (right to life) CANNOT be suspended even in National Emergency (44th Amendment protection).",
  },
  {
    id:8, level:"HARD", topic:"Constitutional Amendments",
    q:"Which Constitutional Amendment is known as the 'Mini Constitution' due to the large number of changes it made, including adding SOCIALIST and SECULAR to the Preamble?",
    opts:["24th Amendment 1971","42nd Amendment 1976","44th Amendment 1978","52nd Amendment 1985"],
    ans:1,
    exp:"The 42nd Constitutional Amendment Act 1976 is called the 'MINI CONSTITUTION' or 'Constitution of Indira' because it made the most sweeping changes in a single amendment.\n\nMajor changes made by 42nd Amendment:\n- Added SOCIALIST and SECULAR to Preamble\n- Added INTEGRITY to Preamble\n- Added Part IV-A: Fundamental DUTIES (Article 51A) — 10 duties (later 44th Amendment and 86th Amendment added more)\n- Made DPSPs supreme over Fundamental Rights in certain cases\n- Extended term of Lok Sabha and State Assemblies from 5 to 6 years (reversed by 44th Amendment)\n- Curtailed power of judicial review\n\nThe 44th Amendment 1978 (by Janata Party after Emergency) reversed many 42nd Amendment changes:\n- Restored 5-year term for Lok Sabha\n- Replaced 'internal disturbance' with 'armed rebellion' for Emergency declaration\n- Right to property removed from Fundamental Rights (made legal right under Art 300A)",
    tip:"42nd Amendment 1976 = Mini Constitution. Three key additions to Preamble: SOCIALIST, SECULAR, INTEGRITY. Also added Fundamental Duties (Art 51A). 44th Amendment 1978 reversed many 42nd changes. Right to property: removed as Fundamental Right by 44th Amendment, now only legal right (Art 300A).",
  },
  {
    id:9, level:"HARD", topic:"Judiciary",
    q:"The doctrine of 'Basic Structure of Constitution' — which the Parliament cannot amend — was established by which landmark Supreme Court case?",
    opts:[
      "Golaknath v State of Punjab (1967)",
      "Kesavananda Bharati v State of Kerala (1973)",
      "Minerva Mills v Union of India (1980)",
      "Maneka Gandhi v Union of India (1978)",
    ],
    ans:1,
    exp:"KESAVANANDA BHARATI v STATE OF KERALA (1973) — 13-judge bench of Supreme Court — established the BASIC STRUCTURE DOCTRINE.\n\nThe court held that Parliament has UNLIMITED power to amend the Constitution under Article 368 EXCEPT that it cannot alter the BASIC STRUCTURE of the Constitution.\n\nElements of Basic Structure (not exhaustive list):\n- Supremacy of Constitution\n- Republican and democratic form of government\n- Secular character of Constitution\n- Separation of powers\n- Federal character\n- Judicial review\n- Free and fair elections\n- Unity and integrity of India\n- Sovereignty of India\n\nWhy it matters: This case directly limits Parliament's amending power. Even a constitutional amendment that violates basic structure can be struck down by courts.\n\nGolaknath (1967): Said Parliament cannot amend Fundamental Rights at all.\nKesavananda Bharati (1973): Overruled Golaknath — Parliament CAN amend FRs but NOT basic structure.",
    tip:"Basic Structure Doctrine = Kesavananda Bharati case 1973 (13-judge bench). Parliament can amend Constitution but CANNOT destroy its basic structure. Basic structure includes: democracy, secularism, federalism, judicial review, separation of powers. This is one of India's most important legal principles.",
  },
  {
    id:10, level:"HARD", topic:"State Government",
    q:"Under which Article of the Constitution can the Governor reserve a State Bill for consideration of the President?",
    opts:["Article 163","Article 167","Article 200","Article 213"],
    ans:2,
    exp:"Article 200 deals with assent to Bills by the Governor. Under Article 200, when a bill is passed by the State Legislature and presented to the Governor, the Governor may:\n1. Give assent\n2. Withhold assent\n3. Return the bill for reconsideration (except Money Bills)\n4. RESERVE the bill for consideration of the PRESIDENT\n\nThe Governor must reserve a bill for the President if it is of such nature that it would derogate from High Court powers.\n\nOther important Articles:\n- Article 163: Governor acts on aid and advice of Council of Ministers (with exceptions)\n- Article 167: Duties of Chief Minister to furnish information to Governor\n- Article 213: Governor's power to promulgate ordinances when State Legislature is not in session\n- Article 356: President's Rule (failure of constitutional machinery in state)\n- Article 371: Special provisions for certain states (Maharashtra: Article 371(2) — President must ensure adequate facilities for Vidarbha, Marathwada, rest of Maharashtra)",
    tip:"Article 200 = Governor's powers regarding State Bills (including reserving for President). Article 213 = Governor's ordinance power. Article 356 = President's Rule. Article 371(2) = Special provision for MAHARASHTRA specifically — ensures development committees for Vidarbha, Marathwada, rest of Maharashtra. Very relevant for MPSC!",
  },
  {
    id:11, level:"EXAM SPECIAL", topic:"Maharashtra Specific",
    q:"Under Article 371(2) of the Constitution, which body is established to ensure equitable development of different regions of Maharashtra?",
    opts:[
      "Maharashtra State Planning Board",
      "Development Boards for Vidarbha, Marathwada, and rest of Maharashtra",
      "Maharashtra Finance Commission",
      "Backward Regions Development Council",
    ],
    ans:1,
    exp:"Article 371(2) is a SPECIAL PROVISION FOR MAHARASHTRA specifically.\n\nIt requires the President to ensure that an ORDER is made for establishing SEPARATE DEVELOPMENT BOARDS for:\n1. Vidarbha\n2. Marathwada\n3. Remaining Maharashtra (rest of Maharashtra — Konkan, Western Maharashtra, Nashik region)\n\nThese boards ensure equitable distribution of funds for development of technical education, vocational training, and employment opportunities in each region.\n\nThis provision was inserted at the time of Maharashtra's formation (May 1, 1960) to address regional imbalances — particularly concerns of Vidarbha and Marathwada that they would be neglected compared to Mumbai/Pune region.\n\nMay 1, 1960: Maharashtra and Gujarat formed as separate states after bifurcation of Bombay State on linguistic basis. May 1 = Maharashtra Din (Maharashtra Day).",
    tip:"Article 371(2) = MAHARASHTRA special provision = Development Boards for Vidarbha, Marathwada, and rest of Maharashtra. This is directly relevant to MPSC exams as it relates to Maharashtra administration. Also remember: Maharashtra formed on May 1, 1960 (Maharashtra Din) when Bombay State was bifurcated linguistically.",
  },
  {
    id:12, level:"EXAM SPECIAL", topic:"Local Government",
    q:"Under the 74th Constitutional Amendment relating to Urban Local Bodies, which Schedule lists the 18 functions that may be transferred to Municipalities?",
    opts:["10th Schedule","11th Schedule","12th Schedule","9th Schedule"],
    ans:2,
    exp:"The 74th Constitutional Amendment 1992 added:\n- Part IX-A to Constitution (Articles 243P to 243ZG) for Urban Local Bodies\n- The TWELFTH SCHEDULE listing 18 functions that may be transferred to Municipalities\n\n12th Schedule (18 functions) includes: Urban planning, land use regulation, roads and bridges, water supply, public health, sanitation, fire services, urban poverty alleviation, slum improvement, regulation of slaughterhouses, burial grounds, vital statistics, public amenities, regulation of tanneries, and prevention of cattle nuisance.\n\nComparison:\n- 73rd Amendment = 11th Schedule = 29 functions for PANCHAYATS (rural)\n- 74th Amendment = 12th Schedule = 18 functions for MUNICIPALITIES (urban)\n\nTypes of Urban Local Bodies in Maharashtra:\n- Municipal Corporation (Mahanagar Palika) — large cities like Mumbai, Pune, Nagpur\n- Municipal Council (Nagar Palika) — smaller cities\n- Nagar Panchayat — transitional areas (rural to urban)\n- Cantonment Board — military areas",
    tip:"12th Schedule = 18 functions = Urban Local Bodies (74th Amendment). 11th Schedule = 29 functions = Panchayats (73rd Amendment). Easy: More functions (29) for more institutions (villages are more numerous). Maharashtra ULBs: Municipal Corporation (large city), Municipal Council (smaller), Nagar Panchayat (transitional).",
  },
];

// ── LEARN SECTIONS ──

function ConstitutionSec() {
  return (
    <div>
      <STitle icon="📜" title="INDIAN CONSTITUTION — BASICS" sub="Key dates, features, schedules, and parts — exam essentials" color={C.saffron} />
      <Box glow={C.saffron} style={{ borderTop:"3px solid "+C.saffron, marginBottom:20 }}>
        <div style={{ fontFamily:"monospace", fontSize:11, color:C.saffron, letterSpacing:1.5, marginBottom:14 }}>KEY CONSTITUTIONAL FACTS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10 }}>
          {[
            { l:"Drafting started", v:"Dec 9, 1946", c:C.saffron },
            { l:"Adopted on", v:"Nov 26, 1949", c:C.gold },
            { l:"Came into force", v:"Jan 26, 1950", c:C.green },
            { l:"Total Articles", v:"395 (original)", c:C.blue },
            { l:"Currently", v:"470+ Articles", c:C.blue },
            { l:"Schedules", v:"12 Schedules", c:C.purple },
            { l:"Constituent Assembly", v:"Dr. Rajendra Prasad (President)", c:C.saffron },
            { l:"Drafting Committee", v:"Dr. B.R. Ambedkar (Chairman)", c:C.gold },
          ].map(function(x,i) { return (
            <div key={i} style={{ background:C.bg, borderRadius:8, padding:"10px 12px" }}>
              <div style={{ color:C.muted, fontFamily:"monospace", fontSize:9, letterSpacing:1, marginBottom:4, textTransform:"uppercase" }}>{x.l}</div>
              <div style={{ color:x.c, fontSize:12, fontWeight:700 }}>{x.v}</div>
            </div>
          ); })}
        </div>
      </Box>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.blue }}>
          <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>PARTS OF THE CONSTITUTION (KEY)</div>
          {[
            { p:"Part I (Art 1-4)", t:"Union and its Territory. India is a Union of States." },
            { p:"Part II (Art 5-11)", t:"Citizenship." },
            { p:"Part III (Art 12-35)", t:"FUNDAMENTAL RIGHTS — 6 rights, justiciable." },
            { p:"Part IV (Art 36-51)", t:"DIRECTIVE PRINCIPLES — non-justiciable guidelines for state." },
            { p:"Part IV-A (Art 51A)", t:"FUNDAMENTAL DUTIES — 11 duties (added by 42nd Amendment)." },
            { p:"Part V (Art 52-151)", t:"Union Government (President, Parliament, Supreme Court)." },
            { p:"Part VI (Art 152-237)", t:"State Governments." },
            { p:"Part IX (Art 243-243O)", t:"Panchayati Raj (73rd Amendment 1992)." },
            { p:"Part IX-A (Art 243P-243ZG)", t:"Urban Local Bodies (74th Amendment 1992)." },
            { p:"Part XVIII (Art 352-360)", t:"Emergency Provisions." },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:12 }}>
              <div style={{ color:C.blue, fontFamily:"monospace", fontSize:10, fontWeight:700, minWidth:115, flexShrink:0 }}>{x.p}</div>
              <div style={{ color:C.soft, fontSize:12 }}>{x.t}</div>
            </div>
          ); })}
        </Box>
        <Box style={{ borderTop:"2px solid "+C.gold }}>
          <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:1, marginBottom:12 }}>SCHEDULES OF THE CONSTITUTION</div>
          {[
            { s:"1st Schedule", t:"List of States and Union Territories" },
            { s:"2nd Schedule", t:"Salaries of President, Governors, Judges" },
            { s:"3rd Schedule", t:"Forms of Oaths and Affirmations" },
            { s:"4th Schedule", t:"Allocation of seats in Rajya Sabha" },
            { s:"5th Schedule", t:"Administration of Scheduled Areas" },
            { s:"6th Schedule", t:"Tribal Areas in NE India" },
            { s:"7th Schedule", t:"THREE LISTS — Union, State, Concurrent" },
            { s:"8th Schedule", t:"22 Official Languages of India" },
            { s:"9th Schedule", t:"Laws protected from judicial review" },
            { s:"10th Schedule", t:"Anti-defection law (52nd Amendment 1985)" },
            { s:"11th Schedule", t:"29 functions of Panchayats (73rd Amendment)" },
            { s:"12th Schedule", t:"18 functions of Municipalities (74th Amendment)" },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:12 }}>
              <div style={{ color:C.gold, fontFamily:"monospace", fontSize:10, fontWeight:700, minWidth:115, flexShrink:0 }}>{x.s}</div>
              <div style={{ color:C.soft, fontSize:12 }}>{x.t}</div>
            </div>
          ); })}
        </Box>
      </div>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>7TH SCHEDULE — THREE LISTS (MOST IMPORTANT)</div>
        <DTable
          heads={["List","Subjects","Examples","Legislation by"]}
          cols={[C.soft, C.saffron, C.blue, C.green, C.gold]}
          rows={[
            ["Union List (List I)","97 subjects","Defence, foreign affairs, atomic energy, railways, banking, currency","Parliament only"],
            ["State List (List II)","66 subjects","Police, public order, agriculture, land, local govt, public health","State Legislature only"],
            ["Concurrent List (List III)","52 subjects","Education, forests, trade unions, marriage, adoption, succession","Both (Parliament prevails in conflict)"],
          ]}
          hi={[0,2]}
        />
        <div style={{ marginTop:12, padding:"10px 14px", background:C.green+"10", borderRadius:8, fontSize:12, color:C.text }}>
          If conflict between Union and State law on Concurrent List subject: UNION LAW PREVAILS. Residuary powers (subjects not in any list) vest with PARLIAMENT.
        </div>
      </Box>
    </div>
  );
}

function FundamentalRightsSec() {
  var [active, setActive] = useState(0);
  var rights = [
    {
      num:"Art 12-18", name:"Right to Equality", color:C.saffron,
      arts:[
        { a:"Art 14", t:"Equality before law and equal protection of laws" },
        { a:"Art 15", t:"Prohibition of discrimination on grounds of religion, race, caste, sex, place of birth" },
        { a:"Art 16", t:"Equality of opportunity in public employment" },
        { a:"Art 17", t:"Abolition of untouchability (practice is an offence)" },
        { a:"Art 18", t:"Abolition of titles (except military and academic)" },
      ],
      note:"Art 15(3): State can make special provisions for women and children. Art 15(4): for socially and educationally backward classes. Art 16(4): Reservation in appointment/promotion for backward classes.",
    },
    {
      num:"Art 19-22", name:"Right to Freedom", color:C.blue,
      arts:[
        { a:"Art 19", t:"Six freedoms: speech/expression, assembly, association, movement, residence, profession" },
        { a:"Art 20", t:"Protection in respect of conviction of offences (no double jeopardy, no self-incrimination)" },
        { a:"Art 21", t:"Protection of life and personal liberty (no deprivation except by procedure established by law)" },
        { a:"Art 21A", t:"Right to Education — free and compulsory education for 6-14 years (86th Amendment 2002)" },
        { a:"Art 22", t:"Protection against arbitrary arrest and detention" },
      ],
      note:"Art 21 is most expansive FR — includes right to livelihood, right to privacy, right to health, right to education (before 21A), right to clean environment, right to speedy trial. Cannot be suspended even during National Emergency.",
    },
    {
      num:"Art 23-24", name:"Right against Exploitation", color:C.red,
      arts:[
        { a:"Art 23", t:"Prohibition of traffic in human beings and forced labour (begar)" },
        { a:"Art 24", t:"Prohibition of employment of children below 14 years in factories, mines, hazardous work" },
      ],
      note:"Art 23 covers: human trafficking, bonded labour, begar. Violation is punishable by law. Art 24: Child Labour (Prohibition and Regulation) Amendment Act 2016 extended prohibition to below 14 for ALL occupations and below 18 for hazardous occupations.",
    },
    {
      num:"Art 25-28", name:"Right to Freedom of Religion", color:C.purple,
      arts:[
        { a:"Art 25", t:"Freedom of conscience and right to freely profess, practice and propagate religion" },
        { a:"Art 26", t:"Freedom to manage religious affairs" },
        { a:"Art 27", t:"Freedom from payment of taxes for promotion of any particular religion" },
        { a:"Art 28", t:"Freedom from religious instruction in government educational institutions" },
      ],
      note:"India is SECULAR — no state religion. All religions treated equally. Art 25 subject to public order, morality, and health. Triple Talaq was abolished as it violated Arts 14 and 21 for Muslim women.",
    },
    {
      num:"Art 29-30", name:"Cultural and Educational Rights", color:C.teal,
      arts:[
        { a:"Art 29", t:"Protection of interests of minorities (right to conserve language, script, culture)" },
        { a:"Art 30", t:"Right of minorities to establish and administer educational institutions" },
      ],
      note:"These rights protect linguistic and religious minorities. The state cannot deny aid to minority institutions solely because they are minority-managed (Art 30(2)). Minority = defined based on religion or language.",
    },
    {
      num:"Art 32", name:"Right to Constitutional Remedies", color:C.green,
      arts:[
        { a:"Art 32", t:"Right to move Supreme Court for enforcement of Fundamental Rights — 'Heart and Soul of Constitution'" },
        { a:"Art 32(2)", t:"Supreme Court can issue writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto" },
        { a:"Art 33", t:"Parliament may restrict FRs for armed forces, police" },
        { a:"Art 34", t:"Parliament may indemnify acts done during martial law" },
        { a:"Art 35", t:"Parliament alone can make laws for certain matters under FRs" },
      ],
      note:"Five Writs: Habeas Corpus (produce body, prevent illegal detention), Mandamus (command to perform public duty), Prohibition (prohibit lower court from exceeding jurisdiction), Certiorari (quash order of lower court), Quo Warranto (challenge right to hold public office).",
    },
  ];
  var r = rights[active];
  return (
    <div>
      <STitle icon="⚖️" title="FUNDAMENTAL RIGHTS" sub="Six Fundamental Rights — Articles, scope, and exceptions" color={C.blue} />
      <Box style={{ marginBottom:20, borderLeft:"3px solid "+C.saffron, background:C.saffron+"08" }}>
        <div style={{ color:C.saffron, fontWeight:700, fontSize:13, marginBottom:8 }}>ORIGINAL 7 FUNDAMENTAL RIGHTS — NOW 6</div>
        <div style={{ color:C.text, fontSize:13, lineHeight:1.8 }}>Originally there were 7 Fundamental Rights. The RIGHT TO PROPERTY (Article 19(1)(f) and Article 31) was a Fundamental Right but was REMOVED from Part III by the 44th Constitutional Amendment 1978. It is now only a LEGAL/CONSTITUTIONAL right under Article 300A — the state can acquire property but must pay compensation.</div>
      </Box>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:20 }}>
        {rights.map(function(ri,i) { return (
          <button key={i} onClick={function(){ setActive(i); }} style={{
            padding:"10px 12px", borderRadius:10, textAlign:"left",
            border:"2px solid "+(active===i?ri.color:C.border),
            background:active===i?ri.color+"12":C.card, cursor:"pointer", transition:"all 0.15s",
          }}>
            <div style={{ fontFamily:"monospace", fontSize:10, color:active===i?ri.color:C.muted, fontWeight:700, marginBottom:3 }}>{ri.num}</div>
            <div style={{ color:active===i?ri.color:C.soft, fontSize:12, fontWeight:600 }}>{ri.name}</div>
          </button>
        ); })}
      </div>
      <Box key={active} glow={r.color} style={{ borderTop:"3px solid "+r.color, marginBottom:20 }}>
        <div style={{ color:r.color, fontSize:18, fontWeight:700, marginBottom:14 }}>{r.name}</div>
        {r.arts.map(function(a,i) { return (
          <div key={i} style={{ display:"flex", gap:14, padding:"10px 0", borderBottom:"1px solid "+C.border+"40" }}>
            <div style={{ color:r.color, fontFamily:"monospace", fontSize:12, fontWeight:700, minWidth:65, flexShrink:0 }}>{a.a}</div>
            <div style={{ color:C.text, fontSize:13 }}>{a.t}</div>
          </div>
        ); })}
        <div style={{ marginTop:14, padding:"12px 14px", background:r.color+"10", borderRadius:8, borderLeft:"3px solid "+r.color }}>
          <div style={{ color:r.color, fontWeight:700, fontSize:11, fontFamily:"monospace", marginBottom:6 }}>KEY NOTE</div>
          <div style={{ color:C.text, fontSize:13, lineHeight:1.7 }}>{r.note}</div>
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.purple }}>
        <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>FUNDAMENTAL DUTIES (Art 51A) — ADDED BY 42nd AMENDMENT 1976</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            "Abide by Constitution, respect national flag and anthem",
            "Cherish noble ideals of freedom struggle",
            "Uphold and protect sovereignty, unity and integrity of India",
            "Defend the country and render national service when called upon",
            "Promote harmony and brotherhood among all people of India",
            "Value and preserve the rich heritage of composite culture",
            "Protect and improve natural environment (forests, lakes, rivers, wildlife)",
            "Develop scientific temper, humanism and spirit of inquiry",
            "Safeguard public property and abjure violence",
            "Strive towards excellence in all spheres of individual and collective activity",
            "Provide opportunities for education to children (6-14 years) — added by 86th Amendment 2002",
          ].map(function(d,i) { return (
            <div key={i} style={{ padding:"7px 10px", background:C.bg, borderRadius:6, display:"flex", gap:8 }}>
              <span style={{ color:C.purple, fontFamily:"monospace", fontSize:10, flexShrink:0, marginTop:1 }}>{i+1}.</span>
              <span style={{ color:C.soft, fontSize:12, lineHeight:1.5 }}>{d}</span>
            </div>
          ); })}
        </div>
        <div style={{ marginTop:12, padding:"10px 12px", background:C.purple+"10", borderRadius:8, fontSize:12, color:C.text }}>Total Fundamental Duties: 11. Originally 10 (42nd Amendment 1976), the 11th was added by 86th Amendment 2002 (duty towards child education). Fundamental Duties are NON-JUSTICIABLE but morally binding.</div>
      </Box>
    </div>
  );
}

function ParliamentSec() {
  return (
    <div>
      <STitle icon="🏛️" title="PARLIAMENT AND STATE LEGISLATURE" sub="Lok Sabha, Rajya Sabha, State Assembly — composition and powers" color={C.gold} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.saffron }}>
          <div style={{ fontFamily:"monospace", color:C.saffron, fontSize:11, letterSpacing:1, marginBottom:12 }}>LOK SABHA — HOUSE OF THE PEOPLE</div>
          <DTable
            heads={["Parameter","Details"]}
            cols={[C.soft, C.saffron]}
            rows={[
              ["Total seats","552 (530 states + 20 UTs + 2 Anglo-Indian nominated — now abolished)"],
              ["Current strength","543 elected members"],
              ["Elected by","Direct election by citizens (universal adult suffrage)"],
              ["Minimum age","25 years"],
              ["Term","5 years (can be dissolved earlier by President on PM's advice)"],
              ["Presided by","Speaker (elected by members)"],
              ["Money Bills","Can ONLY be introduced in Lok Sabha"],
              ["Joint sitting","Presided by Lok Sabha Speaker"],
              ["Quorum","1/10 of total membership"],
              ["Who can vote for PM","Lok Sabha members only (PM must have Lok Sabha confidence)"],
            ]}
            hi={[6,7]}
          />
        </Box>
        <Box style={{ borderTop:"2px solid "+C.blue }}>
          <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>RAJYA SABHA — COUNCIL OF STATES</div>
          <DTable
            heads={["Parameter","Details"]}
            cols={[C.soft, C.blue]}
            rows={[
              ["Total seats","250 (238 elected + 12 nominated by President)"],
              ["Nominated by","President — for arts, science, literature, social service"],
              ["Elected by","MLAs of State Legislatures (indirect election)"],
              ["Minimum age","30 years"],
              ["Term","6 years (permanent — cannot be dissolved)"],
              ["Presided by","Vice President of India (ex-officio Chairman)"],
              ["Money Bills","CANNOT introduce. Can only suggest amendments. Lok Sabha can reject."],
              ["Special powers","Art 249: Empower Parliament to legislate on State List. Art 312: Create All India Services."],
              ["Quorum","1/10 of total membership"],
              ["Retirement","1/3 members retire every 2 years"],
            ]}
            hi={[4,6]}
          />
        </Box>
      </div>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>PRESIDENT OF INDIA — KEY POWERS AND FACTS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { t:"Election", d:"Elected indirectly by Electoral College — elected MPs + elected MLAs. Nominated members do NOT vote.", c:C.saffron },
            { t:"Term", d:"5 years. Can be re-elected. Removal by impeachment (Art 61) — special majority of Parliament.", c:C.gold },
            { t:"Minimum Age", d:"35 years. Must be citizen of India. Must be eligible to be elected to Lok Sabha.", c:C.blue },
            { t:"Executive Powers", d:"All executive actions of Union taken in President's name. Appoints PM, governors, judges, etc.", c:C.green },
            { t:"Ordinance Power", d:"Art 123: Can promulgate ordinances when Parliament not in session. Must be approved by Parliament within 6 weeks of reassembly.", c:C.purple },
            { t:"Pocket Veto", d:"President can keep a bill indefinitely without returning it or assenting to it (for private member bills). Not for Government bills.", c:C.teal },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"12px 14px", background:C.bg, borderRadius:8, borderLeft:"3px solid "+x.c }}>
              <div style={{ color:x.c, fontWeight:700, fontSize:13, marginBottom:4 }}>{x.t}</div>
              <div style={{ color:C.soft, fontSize:12, lineHeight:1.6 }}>{x.d}</div>
            </div>
          ); })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.purple }}>
        <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>MAHARASHTRA STATE LEGISLATURE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div>
            <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginBottom:10 }}>Vidhan Sabha (Legislative Assembly)</div>
            {[
              { p:"Total seats", v:"288 members" },
              { p:"Election", v:"Direct election by citizens" },
              { p:"Term", v:"5 years" },
              { p:"Minimum age", v:"25 years" },
              { p:"Presided by", v:"Speaker of Maharashtra Vidhan Sabha" },
              { p:"Budget", v:"Introduced here first" },
            ].map(function(x,i) { return (
              <div key={i} style={{ padding:"6px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:10 }}>
                <span style={{ color:C.soft, fontFamily:"monospace", fontSize:11, minWidth:130, flexShrink:0 }}>{x.p}</span>
                <span style={{ color:C.text, fontSize:12 }}>{x.v}</span>
              </div>
            ); })}
          </div>
          <div>
            <div style={{ color:C.cyan, fontWeight:700, fontSize:13, marginBottom:10 }}>Vidhan Parishad (Legislative Council)</div>
            {[
              { p:"Total seats", v:"78 members (1/3 of Vidhan Sabha)" },
              { p:"Election", v:"Indirect + nominated (multiple constituencies)" },
              { p:"Term", v:"6 years (permanent house)" },
              { p:"Minimum age", v:"30 years" },
              { p:"Presided by", v:"Chairman of Vidhan Parishad" },
              { p:"State with bicameral", v:"Only 6 states have Vidhan Parishad: Maharashtra, UP, Bihar, AP, Telangana, Karnataka" },
            ].map(function(x,i) { return (
              <div key={i} style={{ padding:"6px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:10 }}>
                <span style={{ color:C.soft, fontFamily:"monospace", fontSize:11, minWidth:130, flexShrink:0 }}>{x.p}</span>
                <span style={{ color:C.text, fontSize:12 }}>{x.v}</span>
              </div>
            ); })}
          </div>
        </div>
      </Box>
    </div>
  );
}

function LocalGovtSec() {
  return (
    <div>
      <STitle icon="🏘️" title="PANCHAYATI RAJ AND LOCAL GOVERNMENT" sub="73rd, 74th Amendments + Maharashtra Zilla Parishad, Panchayat Samiti Act" color={C.green} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>THREE-TIER PANCHAYATI RAJ STRUCTURE (73rd Amendment 1992)</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          {[
            {
              level:"TIER 1 — GRAM PANCHAYAT", color:C.lime, level_num:"Village Level",
              facts:["Covers one or more villages","Elected by village voters (Gram Sabha members)","Headed by Sarpanch (elected directly in Maharashtra)","Conducts Gram Sabha meetings (mandatory)","Implements schemes at ground level","Maharashtra: minimum 7, maximum 17 ward members based on population"],
            },
            {
              level:"TIER 2 — PANCHAYAT SAMITI", color:C.green, level_num:"Block/Taluka Level",
              facts:["Also called Block Panchayat or Taluka Panchayat","Members elected from Gram Panchayat area","Headed by President/Chairman (elected by members)","Supervises Gram Panchayats","Implements block-level development programmes","Maharashtra: Panchayat Samiti (block level)"],
            },
            {
              level:"TIER 3 — ZILLA PARISHAD", color:C.teal, level_num:"District Level",
              facts:["District-level body. Most powerful PRI tier.","Members elected directly by voters","Headed by President (in Maharashtra, directly elected)","Controls and supervises Panchayat Samitis","Handles larger development projects","Maharashtra: 34 Zilla Parishads (one for each district except Mumbai)"],
            },
          ].map(function(t,i) { return (
            <div key={i} style={{ background:C.bg, borderRadius:10, padding:14, borderTop:"2px solid "+t.color }}>
              <div style={{ fontFamily:"monospace", fontSize:10, color:t.color, fontWeight:700, letterSpacing:1, marginBottom:4 }}>{t.level}</div>
              <div style={{ color:C.muted, fontSize:10, marginBottom:10 }}>{t.level_num}</div>
              {t.facts.map(function(f,j) { return (
                <div key={j} style={{ display:"flex", gap:8, padding:"4px 0", borderBottom:"1px solid "+C.border+"30", fontSize:12, color:C.soft }}>
                  <span style={{ color:t.color, flexShrink:0, fontSize:10 }}>→</span>{f}
                </div>
              ); })}
            </div>
          ); })}
        </div>
      </Box>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.saffron }}>
          <div style={{ fontFamily:"monospace", color:C.saffron, fontSize:11, letterSpacing:1, marginBottom:12 }}>GRAM SABHA — FOUNDATION OF DEMOCRACY</div>
          {[
            { t:"Definition", d:"All registered voters of a Gram Panchayat area (not just elected members). Real grassroots democracy." },
            { t:"Meetings", d:"Must meet at least TWICE a year (Maharashtra: April 26 and October 2 are designated dates)." },
            { t:"Powers", d:"Approves annual plans and budget. Reviews development works. Social audit of MGNREGS works." },
            { t:"Maharashtra specifics", d:"Gram Sabha required to meet on Jan 26, May 1, Aug 15 and Oct 2 as well (4 mandatory meetings in Maharashtra)." },
            { t:"Special Gram Sabha", d:"For approval of development projects, beneficiary selection, natural resource management." },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid "+C.border+"40" }}>
              <div style={{ color:C.saffron, fontSize:12, fontWeight:700 }}>{x.t}</div>
              <div style={{ color:C.soft, fontSize:12, marginTop:2 }}>{x.d}</div>
            </div>
          ); })}
        </Box>
        <Box style={{ borderTop:"2px solid "+C.blue }}>
          <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>URBAN LOCAL BODIES IN MAHARASHTRA</div>
          <DTable
            heads={["Type","Population Threshold","Examples"]}
            cols={[C.soft, C.blue, C.gold]}
            rows={[
              ["Municipal Corporation","Above 3 lakh (approx)","Mumbai (BMC), Pune, Nagpur, Nashik, Aurangabad, Thane"],
              ["Municipal Council","Smaller cities","Many district towns"],
              ["Nagar Panchayat","Transitional (rural to urban)","Growing towns"],
              ["Cantonment Board","Military areas","Pune Cantonment, Ahmednagar"],
            ]}
            hi={[0]}
          />
          <div style={{ marginTop:12, padding:"10px", background:C.blue+"10", borderRadius:8, fontSize:12, color:C.text }}>
            BMC (Brihanmumbai Municipal Corporation) is the richest municipal corporation in India. Mumbai is the financial capital. MCGM is the official name (Municipal Corporation of Greater Mumbai).
          </div>
        </Box>
      </div>

      <Box style={{ borderTop:"2px solid "+C.gold }}>
        <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:1, marginBottom:12 }}>KEY CONSTITUTIONAL AMENDMENTS — LOCAL GOVERNMENT</div>
        <DTable
          heads={["Amendment","Year","Provision","Key Additions"]}
          cols={[C.soft, C.gold, C.saffron, C.blue, C.green]}
          rows={[
            ["73rd Amendment","1992","Panchayati Raj (Rural)","Part IX, Art 243-243O, 11th Schedule (29 subjects), 3-tier system, 1/3 women reservation"],
            ["74th Amendment","1992","Urban Local Bodies","Part IX-A, Art 243P-243ZG, 12th Schedule (18 subjects), Ward Committees in cities above 3 lakh"],
            ["42nd Amendment","1976","Added Fundamental Duties","Art 51A added — 10 duties. Also SOCIALIST, SECULAR to Preamble"],
            ["44th Amendment","1978","Reversed Emergency abuses","Right to property removed from FRs. Article 352 changed internal disturbance to armed rebellion"],
            ["86th Amendment","2002","Right to Education","Art 21A — free compulsory education 6-14 years. RTE Act 2009 followed"],
            ["101st Amendment","2016","GST Implementation","Goods and Services Tax — unified indirect tax system"],
          ]}
          hi={[0,1]}
        />
      </Box>
    </div>
  );
}

function GeographySec() {
  return (
    <div>
      <STitle icon="🗺️" title="GEOGRAPHY — INDIA AND MAHARASHTRA" sub="Physical features, rivers, climate, minerals — exam-focused facts" color={C.teal} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <Box style={{ borderTop:"2px solid "+C.teal }}>
          <div style={{ fontFamily:"monospace", color:C.teal, fontSize:11, letterSpacing:1, marginBottom:12 }}>INDIA — KEY GEOGRAPHIC FACTS</div>
          {[
            { l:"Total area", v:"3,287,263 km² (7th largest in world)" },
            { l:"Latitudinal extent", v:"8°4'N to 37°6'N" },
            { l:"Longitudinal extent", v:"68°7'E to 97°25'E" },
            { l:"Standard Meridian", v:"82°30'E (passes through Mirzapur, UP)" },
            { l:"Tropic of Cancer", v:"23.5°N — passes through 8 states (GJ, RJ, MP, CG, JH, WB, Tripura, Mizoram)" },
            { l:"Southernmost point", v:"Indira Point (Great Nicobar Island)" },
            { l:"Northernmost point", v:"Indira Col (Ladakh, Siachen area)" },
            { l:"Coastline length", v:"7,516 km (including islands)" },
            { l:"Largest state by area", v:"Rajasthan (342,239 km²)" },
            { l:"Smallest state by area", v:"Goa (3,702 km²)" },
            { l:"Most populous state", v:"Uttar Pradesh" },
            { l:"Maharashtra rank by area", v:"3rd largest state in India" },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"6px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:10 }}>
              <span style={{ color:C.soft, fontFamily:"monospace", fontSize:11, minWidth:160, flexShrink:0 }}>{x.l}</span>
              <span style={{ color:C.text, fontSize:12 }}>{x.v}</span>
            </div>
          ); })}
        </Box>
        <Box style={{ borderTop:"2px solid "+C.saffron }}>
          <div style={{ fontFamily:"monospace", color:C.saffron, fontSize:11, letterSpacing:1, marginBottom:12 }}>MAHARASHTRA — KEY FACTS</div>
          {[
            { l:"Formation date", v:"May 1, 1960 (Maharashtra Din)" },
            { l:"Capital", v:"Mumbai (winter: Nagpur for Winter Session)" },
            { l:"Area", v:"307,713 km² (3rd largest state)" },
            { l:"Districts", v:"36 districts" },
            { l:"Divisions", v:"6 revenue divisions: Konkan, Nashik, Pune, Aurangabad, Amaravati, Nagpur" },
            { l:"Bordering states", v:"Gujarat, Rajasthan (NW), MP, Chhattisgarh (N/E), Telangana, Karnataka, Goa (S)" },
            { l:"Coastline", v:"720 km (Arabian Sea)" },
            { l:"Highest peak", v:"Kalsubai (1,646 m) — Ahmednagar district" },
            { l:"Longest river in MH", v:"Godavari (flows east, drains most of state)" },
            { l:"Major dams", v:"Koyna (largest hydroelectric), Jayakwadi (largest earthen dam), Ujani" },
            { l:"National Parks", v:"Tadoba, Melghat, Navegaon, Chandoli, Gugamal, Pench, Sanjay Gandhi" },
            { l:"Population (2011)", v:"112 million (2nd most populous state)" },
          ].map(function(x,i) { return (
            <div key={i} style={{ padding:"6px 0", borderBottom:"1px solid "+C.border+"40", display:"flex", gap:10 }}>
              <span style={{ color:C.soft, fontFamily:"monospace", fontSize:11, minWidth:160, flexShrink:0 }}>{x.l}</span>
              <span style={{ color:C.text, fontSize:12 }}>{x.v}</span>
            </div>
          ); })}
        </Box>
      </div>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.blue }}>
        <div style={{ fontFamily:"monospace", color:C.blue, fontSize:11, letterSpacing:1, marginBottom:12 }}>MAJOR RIVERS OF MAHARASHTRA</div>
        <DTable
          heads={["River","Origin","Flows into","Key Feature / Dam"]}
          cols={[C.soft, C.blue, C.teal, C.green, C.gold]}
          rows={[
            ["Godavari","Trimbakeshwar, Nashik","Bay of Bengal (east)","Longest river in Maharashtra. Called Dakshin Ganga. Jayakwadi dam (Nanded)."],
            ["Krishna","Mahabaleshwar, Satara","Bay of Bengal (east)","Koyna tributary. Warna, Bhima are tributaries."],
            ["Bhima","Bhimashankar, Pune","Krishna (in Karnataka)","Ujani Dam (Solapur). Passes through Pune dist."],
            ["Koyna","Mahabaleshwar (Western Ghats)","Krishna","Koyna Dam — largest hydroelectric project in MH. 1,960 MW."],
            ["Tapi / Tapti","Multai, Madhya Pradesh","Arabian Sea (west)","Only major river flowing WEST in Maharashtra. Flows through Vidarbha."],
            ["Wardha + Wainganga","Satpuda ranges","Merge to form Pranhita → joins Godavari","Main rivers of Vidarbha. Coal fields nearby."],
          ]}
          hi={[0,4]}
        />
      </Box>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>WESTERN GHATS AND PHYSICAL DIVISIONS OF MAHARASHTRA</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { name:"Konkan Coast", color:C.blue, points:["Narrow coastal strip between Western Ghats and sea","Mumbai, Thane, Raigad, Ratnagiri, Sindhudurg","Rice cultivation, fishing, Alphonso mangoes","Mumbai — financial capital of India"] },
            { name:"Western Ghats (Sahyadri)", color:C.green, points:["North-South mountain range along western edge","Kalsubai (1646m) — highest peak of Maharashtra","Hill stations: Mahabaleshwar, Matheran, Lonavala, Panchgani","UNESCO World Heritage Site. Biodiversity hotspot.","Koyna Wildlife Sanctuary, Radhanagari"] },
            { name:"Deccan Plateau", color:C.gold, points:["Largest region — most of Maharashtra","Black cotton soil (Regur) — ideal for cotton","Nashik — grape capital, wine production","Pune — Oxford of the East, IT hub","Aurangabad — Ajanta-Ellora caves (UNESCO WHS)"] },
            { name:"Vidarbha", color:C.orange, points:["Eastern Maharashtra — cotton and orange growing","Nagpur — Orange city, geographic centre of India","Tadoba National Park — tigers","Coal mining — Chandrapur, Yavatmal","Wardha — Gandhi's Sevagram Ashram"] },
            { name:"Marathwada", color:C.purple, points:["Central-eastern Maharashtra (8 districts)","Semi-arid, drought-prone region","Aurangabad as regional centre","Jayakwadi dam — Godavari river","Historically part of Hyderabad State until 1956"] },
            { name:"Khandesh", color:C.teal, points:["North Maharashtra (Dhule, Jalgaon, Nandurbar)","Tapi River flows through it","Banana cultivation (Jalgaon)","Satpuda ranges to north","Connects to MP and Gujarat"] },
          ].map(function(r,i) { return (
            <div key={i} style={{ background:C.bg, borderRadius:10, padding:12, borderTop:"2px solid "+r.color }}>
              <div style={{ color:r.color, fontWeight:700, fontSize:13, marginBottom:8 }}>{r.name}</div>
              {r.points.map(function(p,j) { return (
                <div key={j} style={{ fontSize:11, color:C.soft, padding:"3px 0", display:"flex", gap:6 }}>
                  <span style={{ color:r.color, flexShrink:0 }}>→</span>{p}
                </div>
              ); })}
            </div>
          ); })}
        </div>
      </Box>
    </div>
  );
}

function HistorySec() {
  return (
    <div>
      <STitle icon="🏰" title="HISTORY — FREEDOM MOVEMENT AND MAHARASHTRA" sub="Key events, leaders, and Maharashtra-specific history" color={C.saffron} />
      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.saffron }}>
        <div style={{ fontFamily:"monospace", color:C.saffron, fontSize:11, letterSpacing:1, marginBottom:12 }}>INDIAN FREEDOM MOVEMENT — KEY EVENTS TIMELINE</div>
        <DTable
          heads={["Year","Event","Leader / Significance"]}
          cols={[C.soft, C.gold, C.saffron, C.blue]}
          rows={[
            ["1857","First War of Independence (Sepoy Mutiny)","Mangal Pandey, Rani Laxmibai, Tatya Tope. Failed but awakened nationalism."],
            ["1885","Indian National Congress founded","A.O. Hume, Dadabhai Naoroji, Dinshaw Wacha. First session in Bombay (Pune 2nd session)."],
            ["1905","Partition of Bengal","Lord Curzon. Led to Swadeshi Movement — boycott of British goods."],
            ["1906","Muslim League founded","Dhaka. Later demanded separate nation (Pakistan)."],
            ["1915","Gandhi returns to India","From South Africa. Joined Congress. Started mass movements."],
            ["1919","Jallianwala Bagh Massacre","April 13. General Dyer. Amritsar. Killed 379+ (official), thousands injured."],
            ["1920-22","Non-Cooperation Movement","Gandhi. First mass movement. Boycott of schools, courts, councils."],
            ["1929","Purna Swaraj Declaration","Lahore session. January 26, 1930 declared Independence Day (later Republic Day)."],
            ["1930","Dandi March (Salt Satyagraha)","Gandhi. March 12 to April 6. 240 miles. Broke salt law at Dandi."],
            ["1942","Quit India Movement","Gandhi. August 8, 1942. 'Do or Die'. August 9 = Quit India Day."],
            ["1943","INA — Indian National Army","Subhash Chandra Bose. Azad Hind Fauj. Singapore. 'Jai Hind' slogan."],
            ["1947","Independence","August 15, 1947. Jawaharlal Nehru — first PM. Lord Mountbatten — last Viceroy."],
          ]}
          hi={[8,10,11]}
        />
      </Box>

      <Box style={{ marginBottom:20, borderTop:"2px solid "+C.purple }}>
        <div style={{ fontFamily:"monospace", color:C.purple, fontSize:11, letterSpacing:1, marginBottom:12 }}>MAHARASHTRA — SOCIAL REFORMERS (VERY HIGH MPSC FREQUENCY)</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            {
              name:"Mahatma Jyotirao Phule (1827–1890)", color:C.saffron,
              facts:["Born: April 11, 1827, Pune (Khatgaon)","Founded Satyashodhak Samaj (1873) — for truth-seeking, against Brahminism","Opened first girls' school (1848, Pune) with wife Savitribai Phule","Wrote: Gulamgiri (Slavery), Shetkaryacha Asud (Farmer's Whip)","Fought against caste system and untouchability","Title 'Mahatma' given by citizens of Bombay (1888)"],
            },
            {
              name:"Savitribai Phule (1831–1897)", color:C.red,
              facts:["India's first woman teacher","Opened girls' schools with husband Jyotirao Phule","Fought against sati and child marriage","Started care homes for widows","Died nursing plague patients (1897)","Celebrated as first female teacher: January 3"],
            },
            {
              name:"Dr. B.R. Ambedkar (1891–1956)", color:C.blue,
              facts:["Born: April 14, 1891, Mhow (MP) — raised in Maharashtra","Father of Indian Constitution — Chairman of Drafting Committee","Founded: Independent Labour Party, Scheduled Castes Federation, Republican Party of India","Mahad Satyagraha (1927) — right to use public water tank","Converted to Buddhism (October 14, 1956 — Nagpur) with 500,000 followers","Bharat Ratna awarded posthumously in 1990"],
            },
            {
              name:"Gopal Ganesh Agarkar (1856–1895)", color:C.teal,
              facts:["Social reformer and rationalist","Founded Deccan Education Society with Tilak","Editor: Kesari (Marathi) and Mahratta (English) initially, then Sudharak","Advocated social reform BEFORE political independence (opposite of Tilak)","Strong opponent of caste system and child marriage","Died young at 34 — prolific writer and thinker"],
            },
            {
              name:"Bal Gangadhar Tilak (1856–1920)", color:C.gold,
              facts:["Lokmanya Tilak — 'Father of Indian Unrest'","Started Ganpati Festival (public, 1893) and Shivaji Jayanti for mass mobilisation","Founded: Deccan Education Society, New English School","Wrote: Arctic Home in the Vedas, Gita Rahasya","Famous quote: 'Swaraj is my birthright and I shall have it'","Deported to Mandalay prison (1908) for sedition"],
            },
            {
              name:"Raja Ram Mohan Roy (1772–1833)", color:C.lime,
              facts:["Bengal but worked in Maharashtra connection: Brahmo Samaj influenced MH reformers","Fought against Sati — banned by British in 1829 with his support","First to use term 'Hinduism'","Called Father of Modern India and Herald of new age","Founded Brahmo Samaj (1828)","Died in Bristol, England"],
            },
          ].map(function(p,i) { return (
            <div key={i} style={{ padding:12, background:C.bg, borderRadius:10, borderLeft:"3px solid "+p.color }}>
              <div style={{ color:p.color, fontWeight:700, fontSize:13, marginBottom:8 }}>{p.name}</div>
              {p.facts.map(function(f,j) { return (
                <div key={j} style={{ fontSize:11, color:C.soft, padding:"3px 0", display:"flex", gap:6 }}>
                  <span style={{ color:p.color, flexShrink:0 }}>→</span>{f}
                </div>
              ); })}
            </div>
          ); })}
        </div>
      </Box>

      <Box style={{ borderTop:"2px solid "+C.green }}>
        <div style={{ fontFamily:"monospace", color:C.green, fontSize:11, letterSpacing:1, marginBottom:12 }}>MARATHA EMPIRE — KEY FACTS</div>
        <DTable
          heads={["Ruler / Event","Period","Significance"]}
          cols={[C.soft, C.saffron, C.gold, C.green]}
          rows={[
            ["Chhatrapati Shivaji Maharaj","1627–1680","Founded Maratha Empire. Coronation: June 6, 1674 at Raigad. Capital: Raigad. Pioneered guerrilla warfare. Naval force establishment."],
            ["Battle of Pratapgad","1659","Shivaji defeated Adilshahi general Afzal Khan. Turning point for Maratha power."],
            ["Treaty of Purandar","1665","Signed with Mughal Jai Singh I. Shivaji surrendered 23 forts."],
            ["Agra imprisonment and escape","1666","Shivaji imprisoned by Aurangzeb. Escaped in sweet baskets."],
            ["Peshwa Bajirao I","1720–1740","Greatest Peshwa. Never lost a battle. Expanded Maratha Empire to Delhi."],
            ["Third Battle of Panipat","1761","Maratha defeat by Ahmad Shah Abdali. Massive setback to Maratha power."],
            ["Third Anglo-Maratha War","1817–1818","Ended with Treaty of Pune. Peshwa Bajirao II surrendered. Maratha Empire ended."],
          ]}
          hi={[0,6]}
        />
      </Box>
    </div>
  );
}

function TricksSec() {
  var tricks = [
    {
      icon:"📜", title:"Constitution Key Dates and Numbers", color:C.saffron,
      items:[
        "Drafting started: December 9, 1946. Adopted: November 26, 1949. Enforced: January 26, 1950.",
        "Lok Sabha: 543 members (directly elected, min age 25, 5-year term, can be dissolved).",
        "Rajya Sabha: 250 members (238 elected + 12 nominated, min age 30, 6-year term, PERMANENT).",
        "President: Indirect election, 5-year term, minimum age 35, can be re-elected.",
        "73rd Amendment = 11th Schedule = 29 subjects = RURAL (Panchayat). 74th = 12th Schedule = 18 subjects = URBAN.",
        "Seven Lists: Only ONE list has 3 parts — 7th Schedule (Union List 97, State List 66, Concurrent List 52 subjects).",
      ],
    },
    {
      icon:"⚖️", title:"Fundamental Rights — Quick Reference", color:C.blue,
      items:[
        "Six Fundamental Rights: Equality (12-18), Freedom (19-22), Against Exploitation (23-24), Religion (25-28), Cultural/Educational (29-30), Constitutional Remedies (32).",
        "Seven became six: Right to Property removed from FRs by 44th Amendment 1978. Now Art 300A (legal right only).",
        "Article 32 = Heart and Soul of Constitution (Ambedkar). FIVE WRITS: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto.",
        "Article 21 (Right to Life) CANNOT be suspended even during National Emergency (44th Amendment).",
        "Article 21A (Right to Education, 6-14 years) added by 86th Amendment 2002. RTE Act 2009 followed.",
        "Fundamental Duties: 10 original (42nd Amendment 1976) + 1 added by 86th Amendment 2002 = 11 total. Non-justiciable.",
      ],
    },
    {
      icon:"🔥", title:"Important Amendments — Mini Summary", color:C.gold,
      items:[
        "42nd Amendment 1976 = Mini Constitution: added SOCIALIST, SECULAR, INTEGRITY to Preamble + Fundamental Duties (Art 51A).",
        "44th Amendment 1978 = Reversed Emergency abuses: removed Right to Property from FRs, changed 'internal disturbance' to 'armed rebellion' in Art 352.",
        "73rd Amendment 1992 = Panchayati Raj: Part IX, 3-tier system, 1/3 women reservation, State Election Commission.",
        "74th Amendment 1992 = Urban Local Bodies: Part IX-A, Ward Committees, 18-subject 12th Schedule.",
        "86th Amendment 2002 = Art 21A (Right to Education 6-14 years) + 11th Fundamental Duty.",
        "101st Amendment 2016 = GST (Goods and Services Tax) implementation.",
      ],
    },
    {
      icon:"🗺️", title:"Maharashtra Geography — Must Know", color:C.teal,
      items:[
        "Maharashtra formed: May 1, 1960 (Maharashtra Din) by bifurcation of Bombay State on linguistic basis.",
        "Districts: 36. Divisions: 6 (Konkan, Nashik, Pune, Aurangabad, Amaravati, Nagpur). Capital: Mumbai.",
        "Highest peak: Kalsubai (1,646m) in Ahmednagar district (Western Ghats/Sahyadri).",
        "Koyna Dam = largest hydroelectric project in Maharashtra. Jayakwadi = largest earthen dam.",
        "Tapi/Tapti = only major river flowing WEST in Maharashtra (all others flow east toward Bay of Bengal).",
        "Nagpur = Orange city AND geographic centre of India. Winter session of Maharashtra Legislature held here.",
        "Article 371(2) = MAHARASHTRA special provision = Development Boards for Vidarbha, Marathwada, rest of Maharashtra.",
      ],
    },
    {
      icon:"📋", title:"Most Repeated MPSC Questions — Polity and GS", color:C.green,
      items:[
        "Q: Constitution adopted on → November 26, 1949. Enforced on → January 26, 1950.",
        "Q: 'Heart and Soul of Constitution' → Article 32 (Right to Constitutional Remedies).",
        "Q: SOCIALIST and SECULAR added to Preamble by → 42nd Amendment 1976.",
        "Q: 73rd Amendment relates to → Panchayati Raj. 74th → Urban Local Bodies.",
        "Q: Basic Structure doctrine → Kesavananda Bharati case 1973.",
        "Q: Rajya Sabha permanent body — TRUE. Lok Sabha dissolved — TRUE.",
        "Q: Money bills can only be introduced in → Lok Sabha.",
        "Q: Maharashtra formed on → May 1, 1960.",
        "Q: Development Boards for Vidarbha, Marathwada under → Article 371(2).",
        "Q: Jyotirao Phule founded → Satyashodhak Samaj (1873).",
        "Q: Maharashtra has how many Lok Sabha seats → 48.",
        "Q: Maharashtra has how many Rajya Sabha seats → 19.",
      ],
    },
  ];
  return (
    <div>
      <STitle icon="⚡" title="EXAM TIPS AND MEMORY TRICKS" sub="Zero-confusion shortcuts for Indian Polity and General Studies" color={C.gold} />
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
  { id:"constitution", icon:"📜", label:"Constitution Basics" },
  { id:"frights",      icon:"⚖️", label:"Fundamental Rights" },
  { id:"parliament",   icon:"🏛️", label:"Parliament and Legislature" },
  { id:"localgovt",    icon:"🏘️", label:"Panchayati Raj and ULBs" },
  { id:"geography",    icon:"🗺️", label:"Geography — India and MH" },
  { id:"history",      icon:"🏰", label:"History and Social Reformers" },
  { id:"tricks",       icon:"⚡", label:"Tips and Tricks" },
];

export default function App() {
  var [tab, setTab]   = useState("learn");
  var [sec, setSec]   = useState("constitution");
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
    if (sec==="constitution") return <ConstitutionSec />;
    if (sec==="frights") return <FundamentalRightsSec />;
    if (sec==="parliament") return <ParliamentSec />;
    if (sec==="localgovt") return <LocalGovtSec />;
    if (sec==="geography") return <GeographySec />;
    if (sec==="history") return <HistorySec />;
    if (sec==="tricks") return <TricksSec />;
    return null;
  }

  var TABS = [
    { id:"learn",    l:"📖 LEARN" },
    { id:"practice", l:"📝 PRACTICE" },
    { id:"tricks",   l:"⚡ TIPS" },
  ];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:5px}","::-webkit-scrollbar-thumb{background:#182038;border-radius:3px}"].join("")}</style>

      {/* HEADER */}
      <div style={{ background:"#030508", borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 0 14px" }}>
            <div style={{ display:"flex", flexDirection:"column", width:36, height:36, borderRadius:6, overflow:"hidden" }}>
              <div style={{ flex:1, background:C.saffron }} />
              <div style={{ flex:1, background:"#fff" }} />
              <div style={{ flex:1, background:C.green }} />
            </div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:3 }}>INDIAN POLITY AND GENERAL STUDIES</div>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", marginTop:2 }}>Topic 6 of 12 · Constitution · Fundamental Rights · Parliament · Panchayati Raj · Geography · History</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Tag label="10% WEIGHTAGE" color={C.saffron} />
              <Tag label="EVERY YEAR" color={C.green} />
            </div>
          </div>
          <div style={{ display:"flex" }}>
            {TABS.map(function(t) { return (
              <button key={t.id} onClick={function(){ setTab(t.id); }} style={{
                padding:"11px 22px", border:"none", cursor:"pointer",
                fontFamily:"monospace", fontSize:12, fontWeight:700, background:"transparent",
                color:tab===t.id?C.saffron:C.muted,
                borderBottom:"3px solid "+(tab===t.id?C.saffron:"transparent"),
                transition:"all 0.15s",
              }}>{t.l}</button>
            ); })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 20px" }}>

        {tab==="learn" && (
          <div style={{ display:"grid", gridTemplateColumns:"210px 1fr", gap:20 }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:10, color:C.muted, letterSpacing:2, marginBottom:10 }}>SECTIONS</div>
              {SECS.map(function(s) { return (
                <div key={s.id} onClick={function(){ setSec(s.id); }} style={{
                  padding:"9px 12px", borderRadius:8, cursor:"pointer", marginBottom:3,
                  background:sec===s.id?C.saffron+"15":"transparent",
                  border:"1px solid "+(sec===s.id?C.saffron+"50":"transparent"),
                  color:sec===s.id?C.saffron:C.soft,
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
              {[{l:"CORRECT",v:sc.c,col:C.green},{l:"WRONG",v:sc.w,col:C.red},{l:"ACCURACY",v:acc+"%",col:C.gold},{l:"DONE",v:sc.n+"/"+QS.length,col:C.blue}].map(function(s) { return (
                <Box key={s.l} style={{ textAlign:"center", padding:14, borderTop:"3px solid "+s.col }}>
                  <div style={{ fontSize:28, color:s.col, fontWeight:700 }}>{s.v}</div>
                  <div style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginTop:3 }}>{s.l}</div>
                </Box>
              ); })}
            </div>

            {done ? (
              <Box glow={C.saffron} style={{ textAlign:"center", padding:"40px 20px", borderTop:"3px solid "+C.saffron }}>
                <div style={{ fontSize:60, marginBottom:14 }}>{sc.c>=10?"🏛️":sc.c>=7?"📜":"📚"}</div>
                <div style={{ fontSize:26, color:C.saffron, letterSpacing:3, marginBottom:10, fontWeight:700 }}>
                  {sc.c}/{QS.length} — {sc.c>=10?"POLITY MASTER!":sc.c>=7?"SOLID KNOWLEDGE":"NEEDS REVISION"}
                </div>
                <div style={{ color:C.soft, maxWidth:440, margin:"0 auto 24px", fontSize:13, lineHeight:1.7 }}>
                  {sc.c>=10?"Excellent! Indian Polity and GS mastered. Ready for Topic 7 — Maharashtra History.":sc.c>=7?"Good. Review constitutional amendments and Maharashtra-specific provisions.":"Revise Parts of Constitution, Fundamental Rights, and key amendments."}
                </div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button onClick={reset} style={{ padding:"12px 28px", borderRadius:8, border:"none", background:C.saffron, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>RETRY</button>
                  <button onClick={function(){ setTab("tricks"); }} style={{ padding:"12px 28px", borderRadius:8, border:"1px solid "+C.saffron, background:"transparent", color:C.saffron, fontWeight:700, cursor:"pointer", fontSize:14 }}>SEE TIPS</button>
                </div>
              </Box>
            ) : (
              <div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <Tag label={"Q"+(qi+1)+"/"+QS.length} color={C.blue} />
                  <Tag label={q.level} color={q.level==="BASIC"?C.green:q.level==="MEDIUM"?C.gold:q.level==="HARD"?C.saffron:C.purple} />
                  <Tag label={q.topic} color={C.soft} />
                </div>
                <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                  <div style={{ width:((qi/QS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.saffron+","+C.gold+")", transition:"width 0.3s" }} />
                </div>
                <Box style={{ marginBottom:14, borderLeft:"4px solid "+C.saffron, padding:"18px 20px" }}>
                  <div style={{ fontSize:15, lineHeight:1.75, fontWeight:500 }}>
                    <span style={{ color:C.saffron, fontSize:20, marginRight:10, fontWeight:700 }}>Q{qi+1}.</span>{q.q}
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
                  <button onClick={next} style={{ width:"100%", padding:15, borderRadius:10, border:"none", background:"linear-gradient(90deg,"+C.saffron+","+C.gold+")", color:"#000", fontWeight:700, cursor:"pointer", fontSize:17, letterSpacing:2 }}>
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