import { useState, useEffect, useRef } from "react";

var C = {
  bg:"#05060A", card:"#0C0E18", border:"#181C2C",
  gold:"#D97706", green:"#16A34A", red:"#DC2626",
  blue:"#2563EB", cyan:"#06B6D4", purple:"#7C3AED",
  orange:"#EA580C", teal:"#0D9488", yellow:"#EAB308",
  indigo:"#4F46E5", lime:"#65A30D", pink:"#DB2777",
  text:"#EBF0FF", muted:"#20263A", soft:"#5A6890",
};

// ── COMPLETE QUESTION BANK (60 Questions — Prelims + Mains Mix) ──
var ALL_QUESTIONS = [
  // PRELIMS — GS (20 Questions)
  { id:1, section:"PRELIMS", subject:"General Studies", topic:"Polity", level:"P",
    q:"The Constitution of India was adopted by the Constituent Assembly on:",
    opts:["January 26, 1950","November 26, 1949","August 15, 1947","December 9, 1946"],
    ans:1, exp:"The Constitution was ADOPTED on November 26, 1949 (Constitution Day). It came into FORCE (enforced) on January 26, 1950 (Republic Day). The Constituent Assembly first met on December 9, 1946.", tip:"Adopted = Nov 26, 1949. Enforced = Jan 26, 1950. Two different dates." },

  { id:2, section:"PRELIMS", subject:"General Studies", topic:"Geography", level:"P",
    q:"Maharashtra was formed as a separate state on:",
    opts:["August 15, 1947","January 26, 1950","May 1, 1960","November 1, 1956"],
    ans:2, exp:"Maharashtra was formed on May 1, 1960 (Maharashtra Din) when Bombay State was bifurcated into Maharashtra and Gujarat on linguistic basis. May 1 is celebrated as Maharashtra Day every year.", tip:"Maharashtra Day = May 1, 1960. Split from Bombay State. Same day Gujarat was formed." },

  { id:3, section:"PRELIMS", subject:"General Studies", topic:"History", level:"P",
    q:"The Satyashodhak Samaj was founded by which social reformer to fight caste discrimination?",
    opts:["Dr. B.R. Ambedkar","Bal Gangadhar Tilak","Mahatma Jyotirao Phule","Gopal Ganesh Agarkar"],
    ans:2, exp:"Mahatma Jyotirao Phule founded the Satyashodhak Samaj (Truth-Seekers Society) in 1873. He also opened the first girls' school in 1848 with wife Savitribai Phule. He received the title 'Mahatma' from citizens of Bombay in 1888.", tip:"Satyashodhak Samaj = 1873 = Jyotirao Phule. Dr. Ambedkar founded: Republican Party. Tilak: Deccan Education Society." },

  { id:4, section:"PRELIMS", subject:"General Studies", topic:"Polity", level:"P",
    q:"Which Article of the Constitution gives citizens the right to move the Supreme Court for enforcement of Fundamental Rights (called 'Heart and Soul of Constitution' by Ambedkar)?",
    opts:["Article 14","Article 21","Article 32","Article 19"],
    ans:2, exp:"Article 32 gives the right to constitutional remedies — the right to move the SUPREME COURT if any Fundamental Right is violated. Dr. B.R. Ambedkar called it the 'Heart and Soul of the Constitution' because without it, all other rights would be unenforceable.", tip:"Art 32 = Supreme Court. Art 226 = High Court. Both issue writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto." },

  { id:5, section:"PRELIMS", subject:"General Studies", topic:"Science", level:"P",
    q:"Chandrayaan-3 successfully landed near the Moon's South Pole on:",
    opts:["July 14, 2023","August 23, 2023","September 2, 2023","October 4, 2023"],
    ans:1, exp:"Chandrayaan-3 landed on August 23, 2023 — making India the FIRST country to land near the Moon's South Pole, and the 4th country overall to land on the Moon. August 23 is now celebrated as India's National Space Day.", tip:"Chandrayaan-3 = Aug 23, 2023 = Moon South Pole = First country there = India's National Space Day." },

  { id:6, section:"PRELIMS", subject:"General Studies", topic:"Current Affairs", level:"P",
    q:"India's longest sea bridge, the Atal Setu (Mumbai Trans-Harbour Link), connects:",
    opts:["Mumbai to Pune","Sewri (Mumbai) to Nhava Sheva (Navi Mumbai)","Bandra to Worli","Mumbai to Thane"],
    ans:1, exp:"Atal Setu (officially: Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu) connects Sewri in Mumbai to Nhava Sheva in Navi Mumbai. Length: 21.8 km — India's longest sea bridge. Opened January 12, 2024.", tip:"Atal Setu = 21.8 km = Sewri to Nhava Sheva = India's longest sea bridge. Opened Jan 12, 2024." },

  { id:7, section:"PRELIMS", subject:"General Studies", topic:"Geography", level:"P",
    q:"Which is the highest peak of Maharashtra located in the Western Ghats?",
    opts:["Harishchandragad","Rajgad","Kalsubai","Sahyadri Peak"],
    ans:2, exp:"Kalsubai (1,646 metres) is the highest peak in Maharashtra, located in Ahmednagar district in the Sahyadri (Western Ghats) range. It is sometimes called the 'Everest of Maharashtra'.", tip:"Kalsubai = 1646m = Ahmednagar = Highest peak of Maharashtra. Harishchandragad is famous but lower." },

  { id:8, section:"PRELIMS", subject:"General Studies", topic:"Current Affairs", level:"P",
    q:"The Samruddhi Mahamarg (Maharashtra Samruddhi Mahamarg) is an expressway connecting Nagpur to Mumbai. Its total length is approximately:",
    opts:["450 km","521 km","701 km","850 km"],
    ans:2, exp:"The Samruddhi Mahamarg (officially: Hindu Hrudaysamrat Balasaheb Thackeray Maharashtra Samruddhi Mahamarg) is 701 km long, connecting Nagpur to Mumbai. It is one of India's longest expressways and reduces travel time from 16 hours to about 8 hours.", tip:"Samruddhi Mahamarg = 701 km = Nagpur to Mumbai. Fully operational 2023." },

  { id:9, section:"PRELIMS", subject:"General Studies", topic:"Polity", level:"P",
    q:"The 73rd Constitutional Amendment 1992 is related to which governance institution?",
    opts:["Urban Local Bodies","Panchayati Raj Institutions","State Legislature","High Courts"],
    ans:1, exp:"The 73rd Constitutional Amendment 1992 gave constitutional status to Panchayati Raj Institutions (PRIs) — the three-tier rural local government system. It added Part IX (Articles 243-243O) and the 11th Schedule (29 subjects) to the Constitution.", tip:"73rd = RURAL = Panchayati Raj = 11th Schedule = 29 subjects. 74th = URBAN = Municipalities = 12th Schedule = 18 subjects." },

  { id:10, section:"PRELIMS", subject:"General Studies", topic:"Science", level:"P",
    q:"Newton's Third Law of Motion explains vehicle propulsion. The correct statement is:",
    opts:["Speed equals distance divided by time","For every action there is equal and opposite reaction — tyre pushes road back, road pushes vehicle forward","Force equals mass times acceleration","Objects fall at the same rate regardless of mass"],
    ans:1, exp:"Newton's 3rd Law: Action-Reaction. The tyre pushes BACKWARD on the road (action). The road pushes FORWARD on the tyre (reaction). This reaction force propels the vehicle forward. Without road friction, no forward movement is possible — which is why vehicles get stuck on ice.", tip:"3rd Law = Action-Reaction = vehicle propulsion. 1st Law = Inertia = seatbelts. 2nd Law = F=ma = engine power vs vehicle weight." },

  { id:11, section:"PRELIMS", subject:"General Studies", topic:"Science", level:"P",
    q:"In a lead-acid vehicle battery, each cell produces a voltage of:",
    opts:["1.5 V","2 V","3.7 V","12 V"],
    ans:1, exp:"Each cell in a lead-acid battery produces 2 volts. A standard 12V car battery has 6 cells connected in series (6 × 2V = 12V). A 24V truck battery has 12 cells. Lead (Pb) negative plate + Lead dioxide (PbO2) positive plate + Sulphuric acid (H2SO4) electrolyte.", tip:"Lead-acid: 2V per cell. 12V battery = 6 cells. Li-ion (EV): 3.7V per cell. Fully charged lead-acid SG = 1.26-1.30." },

  { id:12, section:"PRELIMS", subject:"General Studies", topic:"Environment", level:"P",
    q:"BS6 fuel has sulphur content of 10 ppm. BS4 fuel had sulphur content of:",
    opts:["100 ppm","50 ppm","25 ppm","75 ppm"],
    ans:1, exp:"BS4 fuel = 50 ppm sulphur. BS6 fuel = 10 ppm sulphur. This represents an 80% reduction. Lower sulphur is essential to protect catalytic converters, DPF, and SCR systems which are damaged by sulphur compounds in exhaust gas.", tip:"BS4 = 50 ppm. BS6 = 10 ppm. 5x cleaner. 80% reduction. Low sulphur diesel = ULSD (Ultra Low Sulphur Diesel)." },

  { id:13, section:"PRELIMS", subject:"General Studies", topic:"Current Affairs", level:"P",
    q:"India's NAVIC satellite navigation system became mandatory in smartphones sold in India from:",
    opts:["January 2021","April 2023","January 2024","April 2025"],
    ans:1, exp:"NAVIC (Navigation with Indian Constellation) became mandatory for all smartphones sold in India from April 2023 (Department of Telecommunications mandate). NAVIC has 7 satellites and covers India plus 1,500 km surrounding region with 5-metre accuracy.", tip:"NAVIC mandatory in smartphones = April 2023. 7 satellites. Made in India GPS equivalent." },

  { id:14, section:"PRELIMS", subject:"General Studies", topic:"Polity", level:"P",
    q:"Article 371(2) of the Indian Constitution contains a special provision specifically for Maharashtra to ensure equitable development. It mandates establishment of:",
    opts:["Finance Commission for Maharashtra","Development Boards for Vidarbha, Marathwada, and rest of Maharashtra","Special Economic Zones in Maharashtra","Backward Class Commission"],
    ans:1, exp:"Article 371(2) mandates the President to ensure establishment of separate DEVELOPMENT BOARDS for Vidarbha, Marathwada, and remaining Maharashtra (Konkan + Western Maharashtra + Nashik). This was included at the time of Maharashtra's formation in 1960 to prevent regional imbalance.", tip:"Art 371(2) = Maharashtra special provision = Development Boards for 3 regions: Vidarbha, Marathwada, Rest of Maharashtra." },

  { id:15, section:"PRELIMS", subject:"General Studies", topic:"Science", level:"P",
    q:"The Bharat NCAP (New Car Assessment Programme) was launched in India in:",
    opts:["January 2020","October 2023","April 2022","January 2024"],
    ans:1, exp:"Bharat NCAP was launched in October 2023 by the Ministry of Road Transport and Highways (MoRTH). It is India's own crash test programme. Testing is done at GARC (Global Automotive Research Centre) in Chennai. Tata Punch scored 5 stars in the first round of testing.", tip:"Bharat NCAP = Oct 2023 = MoRTH = India's crash test = GARC Chennai = 5-star system." },

  { id:16, section:"PRELIMS", subject:"Mental Ability", topic:"Number Series", level:"P",
    q:"What is the next number in the series: 3, 7, 15, 31, 63, ___?",
    opts:["95","127","125","100"],
    ans:1, exp:"Pattern: Each term = previous term × 2 + 1\n3×2+1 = 7 ✓\n7×2+1 = 15 ✓\n15×2+1 = 31 ✓\n31×2+1 = 63 ✓\n63×2+1 = 127\n\nAlternate pattern: 4-1=3, 8-1=7, 16-1=15, 32-1=31, 64-1=63, 128-1=127 (2ⁿ - 1 sequence)", tip:"Series rule: ×2+1 each time. Or: 2ⁿ - 1 pattern. n=2,3,4,5,6,7 gives 3,7,15,31,63,127." },

  { id:17, section:"PRELIMS", subject:"Mental Ability", topic:"Analogy", level:"P",
    q:"Tachometer : RPM :: Odometer : ___",
    opts:["Speed","Fuel","Distance","Temperature"],
    ans:2, exp:"Tachometer measures RPM (engine revolutions per minute — shown on dashboard). Odometer measures DISTANCE (total distance travelled by vehicle in km/miles). Speedometer measures current speed. These are the three key vehicle dashboard instruments.", tip:"Tachometer=RPM. Odometer=Distance (total). Speedometer=Current speed. Hygrometer=Humidity. Barometer=Atmospheric pressure. Altimeter=Altitude." },

  { id:18, section:"PRELIMS", subject:"Mental Ability", topic:"Sets", level:"P",
    q:"In a group of 80 transport workers, 50 have valid driving licences and 40 have valid PUC certificates. 20 have both. How many have NEITHER?",
    opts:["10","15","20","30"],
    ans:0, exp:"n(DL ∪ PUC) = n(DL) + n(PUC) - n(DL ∩ PUC)\n= 50 + 40 - 20 = 70\nNeither = Total - n(DL ∪ PUC) = 80 - 70 = 10", tip:"n(A∪B) = n(A) + n(B) - n(A∩B). Neither = Total - n(A∪B). Venn diagram: 30 DL only + 20 both + 20 PUC only = 70. Neither = 80-70 = 10." },

  { id:19, section:"PRELIMS", subject:"Mental Ability", topic:"Direction", level:"P",
    q:"An ARTO officer starts from RTO office, drives 8 km North, turns East and drives 6 km to reach a checkpost. The checkpost is how far from the RTO office?",
    opts:["10 km","14 km","7 km","12 km"],
    ans:0, exp:"Using Pythagoras theorem for right-angled triangle:\nNorth = 8 km (vertical)\nEast = 6 km (horizontal)\nDirect distance = √(8² + 6²) = √(64 + 36) = √100 = 10 km\nDirection: North-East", tip:"Direction problems with perpendicular paths: use Pythagoras. Distance = √(a² + b²). Classic 6-8-10 right triangle (3-4-5 × 2). Always draw a rough diagram." },

  { id:20, section:"PRELIMS", subject:"Mental Ability", topic:"Clock", level:"P",
    q:"What is the angle between the hour and minute hands of a clock at 6:30?",
    opts:["15°","0°","5°","10°"],
    ans:0, exp:"Formula: Angle = |30H - 5.5M|\n= |30×6 - 5.5×30|\n= |180 - 165|\n= 15°\n\nAt 6:00: hour hand at 180° (pointing straight down), minute at 0°.\nBy 6:30: minute hand at 180°, hour hand moved 30×0.5° = 15° past 180°.\nSo hour at 195°, minute at 180°. Difference = 15°.", tip:"Clock formula: |30H - 5.5M| always works. At 6:30: |180 - 165| = 15°. Many assume 0° at 6:30 (common trap — they forget hour hand keeps moving)." },

  // PRELIMS — AUTO/MECH TRENDS (10 Questions)
  { id:21, section:"PRELIMS", subject:"Auto Trends", topic:"BS6", level:"P",
    q:"India made BS6 emission norms mandatory for ALL new vehicles from which date?",
    opts:["April 1, 2018","April 1, 2019","April 1, 2020","April 1, 2022"],
    ans:2, exp:"BS6 became mandatory for ALL new vehicles from April 1, 2020. India skipped BS5 entirely, jumping directly from BS4 (2017) to BS6 (2020). This was a historic leap aligned with Euro 6 standards.", tip:"BS6 = April 1, 2020. India SKIPPED BS5. Went BS4 (2017) → BS6 (2020). This date must be memorised exactly." },

  { id:22, section:"PRELIMS", subject:"Auto Trends", topic:"EV", level:"P",
    q:"Electric vehicles registered in India must have which colour number plate?",
    opts:["White plate with black text","Yellow plate with black text","Green plate (white text for private, yellow for commercial)","Blue plate with white text"],
    ans:2, exp:"EVs in India have GREEN number plates. Private EVs: green plate with WHITE text. Commercial EVs: green plate with YELLOW text. This clearly distinguishes EVs from conventional vehicles at a glance and entitles them to certain lane privileges, free parking in some areas, and lower tolls.", tip:"EV = GREEN number plate. Private EV = green + white text. Commercial EV = green + yellow text. Remember: green = clean/electric." },

  { id:23, section:"PRELIMS", subject:"Auto Trends", topic:"ADAS", level:"P",
    q:"AEB (Automatic Emergency Braking) is MANDATORY in India for which vehicle categories?",
    opts:["M1 (cars) and N1 (light trucks)","M3 (heavy buses) and N3 (heavy trucks)","All vehicles above 100cc","Only electric vehicles"],
    ans:1, exp:"AEB is mandatory for M3 (buses/coaches with GVW > 5 tonnes) and N3 (heavy goods vehicles with GVW > 12 tonnes). M3 = buses carrying more than 8 passengers with GVW above 5 tonnes. N3 = heavy commercial vehicles.", tip:"AEB mandatory = M3 (heavy buses) + N3 (heavy trucks). Not yet for M1 cars. ESC mandatory for M1. TPMS mandatory for M1." },

  { id:24, section:"PRELIMS", subject:"Auto Trends", topic:"FASTag", level:"P",
    q:"FASTag uses which technology for automatic toll collection?",
    opts:["GPS (Global Positioning System)","Bluetooth Low Energy (BLE)","RFID (Radio Frequency Identification)","Barcode scanning"],
    ans:2, exp:"FASTag uses RFID (Radio Frequency Identification) technology. UHF RFID at 900 MHz frequency. Read range: 5-6 metres. Mandatory for all vehicles from January 2021. Managed by NHAI/NPCI through the NETC (National Electronic Toll Collection) system.", tip:"FASTag = RFID. Not GPS, not Bluetooth, not barcode. UHF band, 5-6 metre read range. Mandatory from Jan 2021." },

  { id:25, section:"PRELIMS", subject:"Auto Trends", topic:"Emission", level:"P",
    q:"Which emission control device is mandatory in BS6 diesel vehicles to convert NOx to harmless nitrogen, and requires periodic topping up of AdBlue?",
    opts:["DPF — Diesel Particulate Filter","TWC — Three-Way Catalyst","SCR — Selective Catalytic Reduction","EGR — Exhaust Gas Recirculation"],
    ans:2, exp:"SCR (Selective Catalytic Reduction) uses AdBlue (32.5% urea solution) injected into exhaust to convert NOx into harmless N2 and H2O. AdBlue consumption: approximately 4-8% of diesel consumption. If AdBlue runs out: engine enters limp mode.", tip:"SCR + AdBlue = NOx removal. Blue filler cap = AdBlue tank. NOx → N2 + H2O. If AdBlue empty → limp mode. Diesel exhaust chain: DOC → DPF → SCR." },

  { id:26, section:"PRELIMS", subject:"Auto Trends", topic:"EV Technology", level:"P",
    q:"FAME-II scheme (Faster Adoption and Manufacturing of Hybrid and Electric Vehicles Phase II) was launched in which year?",
    opts:["2015","2017","2019","2021"],
    ans:2, exp:"FAME-II was launched on April 1, 2019 by the Ministry of Heavy Industries. Budget: Rs 10,000 crore. Focus: electric buses for public transport, electric 2-wheelers, 3-wheelers, and commercial vehicles. Demand incentive per kWh of battery capacity.", tip:"FAME-II = April 2019 = Rs 10,000 crore = Ministry of Heavy Industries. Focus on electric buses, 2W, 3W. MSRTC procured electric buses under FAME-II." },

  { id:27, section:"PRELIMS", subject:"Auto Trends", topic:"Safety", level:"P",
    q:"The minimum tyre tread depth required under Central Motor Vehicles Rules for road vehicles is:",
    opts:["3.0 mm","2.0 mm","1.6 mm","0.5 mm"],
    ans:2, exp:"CMVR Rule 96: Minimum tyre tread depth = 1.6 mm. Tread wear indicators (TWI) are moulded into tyre grooves at exactly 1.6 mm depth. When tread level reaches TWI: replace the tyre. For practical road safety: replace at 3mm for wet weather grip.", tip:"Legal minimum tread = 1.6 mm. Practical replacement recommendation = 3 mm. Below 1.6 mm = fail fitness certificate as ARTO." },

  { id:28, section:"PRELIMS", subject:"Auto Trends", topic:"Inspection", level:"P",
    q:"Certificate of Fitness (CF) for a NEW transport vehicle is initially valid for:",
    opts:["1 year","2 years","3 years","5 years"],
    ans:1, exp:"Section 56 MV Act + CMVR Rule 62: First Certificate of Fitness for a new transport vehicle is valid for 2 YEARS from date of registration. After that: annual renewal. Private vehicles do not need separate CF — fitness is assessed at time of registration renewal.", tip:"First CF = 2 years. After first CF: annual renewal. Section 56 MV Act. ARTO/AMVI/MVI = Inspecting Authority." },

  { id:29, section:"PRELIMS", subject:"Auto Trends", topic:"OBD", level:"P",
    q:"OBD-II (On-Board Diagnostics Level 2) is mandatory for BS6 vehicles. Its primary function is:",
    opts:["Control fuel injection pressure directly","Monitor all emission-related systems and alert driver via MIL when faults occur","Measure engine cylinder pressure","Regulate alternator output voltage"],
    ans:1, exp:"OBD-II continuously monitors all emission-related systems (catalyst, O2 sensors, EGR, EVAP, DPF, SCR). If any malfunction that would cause emissions to exceed limits is detected: MIL (Malfunction Indicator Lamp = Check Engine Light) illuminates. Fault codes (DTCs) stored for workshop diagnosis.", tip:"OBD-II = emissions monitoring + MIL (Check Engine Light). MIL ON = emission fault = fail fitness inspection as ARTO. DTCs read by scanner at 16-pin DLC port." },

  { id:30, section:"PRELIMS", subject:"Auto Trends", topic:"Safety Tech", level:"P",
    q:"ESC (Electronic Stability Control) in vehicles primarily prevents:",
    opts:["Brake fade under heavy braking","Skidding, oversteer, and understeer by selectively braking individual wheels","Engine overheating at high RPM","Tyre pressure loss while driving"],
    ans:1, exp:"ESC (Electronic Stability Control, also called ESP — Electronic Stability Programme) detects when vehicle begins to slide, oversteer, or understeer. It selectively applies brakes to individual wheels to bring the vehicle back on intended path. Uses ABS hardware plus additional yaw rate and steering angle sensors.", tip:"ESC = prevents skid/oversteer/understeer. Selectively brakes individual wheels. Mandatory for new M1 vehicles in India. Uses ABS hardware + yaw sensor + steering sensor." },

  // MAINS SECTION A (25 Questions)
  { id:31, section:"MAINS A", subject:"Strength of Materials", topic:"Stress", level:"M",
    q:"A steel bar of cross-sectional area 400 mm² is subjected to an axial tensile force of 120 kN. The stress developed is:",
    opts:["200 N/mm²","300 N/mm²","150 N/mm²","400 N/mm²"],
    ans:1, exp:"σ = P/A\nP = 120 kN = 120,000 N\nA = 400 mm²\nσ = 120,000/400 = 300 N/mm² = 300 MPa", tip:"σ = P/A. Always convert kN to N first (multiply by 1000). Units: N/mm² = MPa. Steel yield strength ≈ 250 MPa, so 300 MPa exceeds yield — this bar would yield in practice." },

  { id:32, section:"MAINS A", subject:"Strength of Materials", topic:"Bending", level:"M",
    q:"For a simply supported beam of span 6m with UDL of 10 kN/m, the maximum bending moment is:",
    opts:["60 kN·m","45 kN·m","90 kN·m","30 kN·m"],
    ans:1, exp:"M_max = wL²/8 (for simply supported beam with UDL)\nw = 10 kN/m, L = 6 m\nM_max = 10 × 6²/8 = 10 × 36/8 = 360/8 = 45 kN·m\nLocation: At mid-span", tip:"Simply supported + UDL: M_max = wL²/8 at centre. Simply supported + central point load W: M_max = WL/4 at centre. Cantilever + UDL: M_max = wL²/2 at fixed end." },

  { id:33, section:"MAINS A", subject:"Strength of Materials", topic:"Thin Cylinder", level:"M",
    q:"A thin cylindrical pressure vessel has internal diameter 500 mm, wall thickness 8 mm, internal pressure 4 N/mm². The hoop (circumferential) stress is:",
    opts:["125 N/mm²","62.5 N/mm²","250 N/mm²","31.25 N/mm²"],
    ans:0, exp:"Hoop stress σ_h = pd/2t\np = 4 N/mm², d = 500 mm, t = 8 mm\nσ_h = 4 × 500/(2 × 8) = 2000/16 = 125 N/mm²\n\nLongitudinal stress = pd/4t = 4×500/(4×8) = 62.5 N/mm²\nHoop = 2 × Longitudinal ✓ (125 = 2 × 62.5)", tip:"Hoop σ_h = pd/2t. Longitudinal σ_L = pd/4t. Hoop is always DOUBLE longitudinal. Failure by bursting along longitudinal line (hoop governs). Thin cylinder: t < d/20 check." },

  { id:34, section:"MAINS A", subject:"Strength of Materials", topic:"Column", level:"M",
    q:"For a column fixed at both ends with actual length L, the effective length (Le) for Euler's formula is:",
    opts:["L","2L","L/2","0.7L"],
    ans:2, exp:"Effective lengths for different end conditions:\n- Both pinned: Le = L\n- One fixed, one free: Le = 2L (weakest)\n- Both fixed: Le = L/2 (strongest)\n- One fixed, one pinned: Le = 0.7L\n\nBoth fixed = 4 times stronger than both pinned (Le²in denominator of Pcr formula)", tip:"Both fixed = Le = L/2 = STRONGEST (4x both-pinned). One fixed, one free = Le = 2L = WEAKEST (0.25x). Memory: fixing both ends HALVES the effective length." },

  { id:35, section:"MAINS A", subject:"Strength of Materials", topic:"Elastic Constants", level:"M",
    q:"The relationship between Young's modulus E, Shear modulus G, and Poisson's ratio μ is:",
    opts:["E = G(1 + μ)","E = 2G(1 + μ)","E = 2G(1 - μ)","G = 2E(1 + μ)"],
    ans:1, exp:"E = 2G(1 + μ)\nFor steel: E = 200 GPa, G = 80 GPa, μ = 0.3\nVerification: 2 × 80 × (1 + 0.3) = 160 × 1.3 = 208 ≈ 200 ✓\n\nOther relationships:\nE = 3K(1 - 2μ) where K = Bulk modulus\nFor rubber: μ → 0.5, E → 3G (nearly incompressible)", tip:"E = 2G(1+μ). For steel: G ≈ 0.385E ≈ 40% of E. This formula connects the three elastic constants. Memorise: E = 2G(1+μ)." },

  { id:36, section:"MAINS A", subject:"Theory of Machines", topic:"Governors", level:"M",
    q:"A centrifugal governor automatically controls engine speed by:",
    opts:["Measuring cylinder pressure and adjusting valve timing","Using flyweights that move outward at high speed to reduce fuel supply","Measuring exhaust temperature","Adjusting ignition timing based on load"],
    ans:1, exp:"Centrifugal governor working: Rotating flyweights on arms. As engine speed increases → centrifugal force increases → flyweights move OUTWARD → linked mechanism REDUCES fuel supply (throttle closes / fuel rack moves back) → engine speed drops toward set point. Reverse happens when speed drops.", tip:"Governor = flyweights fly out at high speed → fuel reduced → speed drops. Mandatory (tamper-proof) on heavy transport vehicles. Buses: 80 km/h. School buses: 50 km/h." },

  { id:37, section:"MAINS A", subject:"Theory of Machines", topic:"Gyroscope", level:"M",
    q:"Gyroscopic couple formula is C = Iωω, where the correct formula using precession velocity Ω is:",
    opts:["C = I + ω × Ω","C = I × ω × Ω","C = I × ω / Ω","C = I² × ω × Ω"],
    ans:1, exp:"Gyroscopic couple: C = I × ω × Ω\nI = moment of inertia of spinning body (kg·m²)\nω = angular velocity of spin (rad/s)\nΩ = angular velocity of precession (rad/s)\nC = gyroscopic couple (N·m)\n\nApplication: Spinning vehicle wheels create gyroscopic couples when vehicle turns, contributing to steering feel and stability.", tip:"C = IωΩ. Three quantities multiplied: I (inertia), ω (spin speed), Ω (precession speed). Motorcycle stability in straight line = gyroscopic effect from spinning wheels. More spin speed = more gyroscopic stability." },

  { id:38, section:"MAINS A", subject:"Hydraulics", topic:"Bernoulli", level:"M",
    q:"Bernoulli's equation states that for ideal fluid flow along a streamline, as velocity INCREASES at the venturi throat:",
    opts:["Pressure also increases","Pressure decreases (and vice versa)","Density increases","Temperature increases"],
    ans:1, exp:"Bernoulli's equation: P/ρg + V²/2g + z = constant\nAs velocity V increases at throat:\n- V²/2g (velocity head) increases\n- Therefore P/ρg (pressure head) must DECREASE to keep total constant\n\nApplication: Carburettor venturi — air velocity increases → pressure drops → fuel drawn in. Also: venturi meter, pitot tube.", tip:"Bernoulli: High velocity = LOW pressure. Low velocity = HIGH pressure. This is how carburettors, venturi meters, and aerofoils work. The faster the flow, the lower the pressure." },

  { id:39, section:"MAINS A", subject:"Hydraulics", topic:"Reynolds Number", level:"M",
    q:"In pipe flow, if Reynolds number Re > 4000, the flow is classified as:",
    opts:["Laminar","Transition","Turbulent","Viscous"],
    ans:2, exp:"Reynolds Number (Re = ρVD/μ) classification:\nRe < 2000: LAMINAR flow (smooth, parallel layers)\n2000 < Re < 4000: TRANSITION zone (unstable, may be either)\nRe > 4000: TURBULENT flow (chaotic, mixing between layers, higher friction losses)\n\nLaminar flow: used in viscometry, precision instruments. Turbulent: most practical engineering flows (pipes, automotive cooling systems).", tip:"Re < 2000 = laminar. Re > 4000 = turbulent. 2000-4000 = transition. Higher velocity, larger diameter, lower viscosity all increase Re. Most vehicle coolant flow is turbulent." },

  { id:40, section:"MAINS A", subject:"Thermal Engineering", topic:"Carnot", level:"M",
    q:"A Carnot engine operates between 800 K (hot) and 400 K (cold). Its maximum efficiency is:",
    opts:["25%","50%","75%","40%"],
    ans:1, exp:"η_Carnot = 1 - T_L/T_H\n= 1 - 400/800\n= 1 - 0.5\n= 0.5 = 50%\n\nThis is the MAXIMUM possible efficiency between these temperatures. No real engine can exceed 50% between 800K and 400K.", tip:"Carnot: 1 - T_cold/T_hot. Always Kelvin. At 50% efficiency: half the heat input becomes work, half is rejected. To improve: raise T_hot OR lower T_cold." },

  { id:41, section:"MAINS A", subject:"Thermal Engineering", topic:"IC Engine", level:"M",
    q:"In a diesel engine cycle, heat is added at:",
    opts:["Constant temperature (isothermal)","Constant volume (isochoric)","Constant pressure (isobaric)","Both constant volume and pressure"],
    ans:2, exp:"Diesel cycle: Heat addition at CONSTANT PRESSURE (isobaric process). This is because diesel fuel is injected into hot compressed air and burns progressively as piston moves down, maintaining approximately constant cylinder pressure.\n\nOtto cycle (petrol): Heat addition at CONSTANT VOLUME (instantaneous combustion by spark).", tip:"Diesel cycle = constant PRESSURE heat addition. Otto cycle = constant VOLUME heat addition. Dual cycle (high-speed diesel) = both constant volume AND constant pressure (partly each). Most important: Diesel = constant P, Otto = constant V." },

  { id:42, section:"MAINS A", subject:"Thermal Engineering", topic:"Thermal Stress", level:"M",
    q:"A steel rod (E=200 GPa, α=12×10⁻⁶/°C) fixed at both ends experiences a temperature RISE of 40°C. Thermal stress developed is:",
    opts:["48 N/mm²","96 N/mm²","24 N/mm²","192 N/mm²"],
    ans:1, exp:"Thermal stress = E × α × ΔT (for completely fixed rod)\n= 200,000 × 12×10⁻⁶ × 40\n= 200,000 × 0.000012 × 40\n= 200,000 × 0.00048\n= 96 N/mm² (COMPRESSIVE — bar wants to expand but is restrained)", tip:"Fixed bar thermal stress = EαΔT. Temperature RISE = COMPRESSIVE stress (wants to expand). Temperature DROP = TENSILE stress. If free to expand: ZERO stress regardless of temperature change." },

  { id:43, section:"MAINS A", subject:"Industrial Electronics", topic:"BJT", level:"M",
    q:"In a BJT transistor, β (current gain) = 80, and base current IB = 2 mA. The collector current IC is:",
    opts:["82 mA","160 mA","40 mA","800 mA"],
    ans:1, exp:"β = IC/IB\nIC = β × IB = 80 × 2 mA = 160 mA\n\nEmitter current: IE = IC + IB = 160 + 2 = 162 mA\n\nApplication: ECU controls injectors (high current ~160 mA) using small microprocessor signal (~2 mA base current). This is amplification.", tip:"IC = β × IB. IE = IC + IB. β = current gain (50-300 typical). Small base current → large collector current. Used in ECU to switch fuel injectors, ignition coils." },

  { id:44, section:"MAINS A", subject:"Industrial Electronics", topic:"Diode", level:"M",
    q:"In an alternator, the function of the built-in rectifier diodes is to:",
    opts:["Regulate output voltage","Convert 3-phase AC generated by stator to DC for battery charging","Measure alternator speed","Control field current"],
    ans:1, exp:"Alternator generates 3-PHASE AC in the stator windings. 6 DIODES (3 positive + 3 negative) form a full-wave bridge rectifier that converts this 3-phase AC to DC. The DC output (13.8-14.5V) is used to charge the battery and power vehicle electrical loads.", tip:"Alternator: 3-phase AC generated → 6 diodes rectify → DC output. Voltage regulator controls field current to maintain 13.8-14.5V output regardless of engine speed." },

  { id:45, section:"MAINS A", subject:"IC Engines", topic:"Performance", level:"M",
    q:"Brake Thermal Efficiency (BTE) of an IC engine is defined as:",
    opts:["IP/FP","BP/Heat supplied by fuel","FP/BP","IP/Heat supplied"],
    ans:1, exp:"Brake Thermal Efficiency (BTE) = BP / (ṁf × CV)\nWhere BP = Brake Power (useful output at crankshaft)\nṁf = mass flow rate of fuel\nCV = Calorific value of fuel\n\nTypical values: Petrol engine BTE = 25-35%. Diesel engine BTE = 35-45%. BS6 diesel can reach 47-48%.", tip:"BTE = BP/(fuel power). BP = what comes out at shaft. Fuel power = calorific value × fuel rate. Diesel has higher BTE than petrol because higher compression ratio = better thermodynamic efficiency." },

  { id:46, section:"MAINS A", subject:"Automobile Engineering", topic:"Tyre", level:"M",
    q:"A tyre marked 215/60 R17 has a sidewall height of approximately:",
    opts:["215 mm","60 mm","129 mm","45 mm"],
    ans:2, exp:"Sidewall height = Aspect ratio% × Width\n= (60/100) × 215\n= 0.60 × 215\n= 129 mm\n\nThe 60 in the marking represents 60% of tyre width (215mm) as sidewall height.", tip:"Sidewall = (aspect ratio/100) × width. Always multiply aspect ratio (as fraction) by width. 215/60 R17: sidewall = 0.6 × 215 = 129mm. Lower aspect ratio = sportier, lower sidewall, flatter tyre." },

  { id:47, section:"MAINS A", subject:"Automobile Engineering", topic:"Steering", level:"M",
    q:"The Ackermann principle in vehicle steering ensures that during cornering:",
    opts:["All four wheels remain parallel","All wheels rotate about a common instantaneous centre (inner wheel turns more)","The outer wheel turns more sharply","Both front wheels turn by equal angles"],
    ans:1, exp:"Ackermann principle: All wheels must rotate about a COMMON INSTANTANEOUS CENTRE to avoid tyre scrub. The INNER front wheel must turn MORE sharply than the OUTER front wheel. This is because the inner wheel traces a smaller radius arc. Achieved by angling the steering arms inward.", tip:"Ackermann = inner wheel turns MORE. Common turning centre for all wheels. Without Ackermann: tyre scrub on corners = wear + noise. Achieved by geometry of steering arms." },

  { id:48, section:"MAINS A", subject:"Manufacturing", topic:"Welding", level:"M",
    q:"In GMAW (MIG welding), the shielding gas commonly used for welding mild steel is:",
    opts:["Pure argon only","CO2 or 75% Argon + 25% CO2 mixture","Pure nitrogen","Pure oxygen"],
    ans:1, exp:"MIG welding mild steel: CO2 (cheapest, good penetration, more spatter) or Ar+CO2 mixtures (75% Ar + 25% CO2 = C25 is most popular — less spatter, good penetration, better bead appearance).\n\nFor aluminium: pure Argon.\nFor stainless steel: Argon + small % O2.", tip:"Mild steel MIG = CO2 or 75%Ar+25%CO2 (C25). Aluminium = pure Argon. Wrong gas = porosity. CO2 cheapest but more spatter. Argon-based mixes give cleaner weld." },

  { id:49, section:"MAINS A", subject:"Manufacturing", topic:"Metrology", level:"M",
    q:"A vernier caliper has 25 vernier scale divisions equal to 24 main scale divisions (1 MSD = 1mm). The least count is:",
    opts:["0.1 mm","0.02 mm","0.04 mm","0.05 mm"],
    ans:2, exp:"Least Count = 1 MSD - 1 VSD\n1 VSD = 24/25 = 0.96 mm\nLC = 1.00 - 0.96 = 0.04 mm\n\nAlternate formula: LC = 1 MSD / N (N = number of vernier divisions)\n= 1/25 = 0.04 mm ✓", tip:"LC = 1 MSD / N vernier divisions. 10-div → 0.1mm. 25-div → 0.04mm. 50-div → 0.02mm. Micrometer LC = 0.01mm (more precise than vernier)." },

  { id:50, section:"MAINS A", subject:"Manufacturing", topic:"Industrial Engineering", level:"M",
    q:"In Statistical Quality Control, the control chart used to monitor FRACTION DEFECTIVE in a production process is:",
    opts:["X-bar chart","R-chart","p-chart","c-chart"],
    ans:2, exp:"p-chart = fraction DEFECTIVE (proportion of defective items in sample). Used when inspecting for pass/fail — attribute data. Variable sample size possible.\n\nX-bar chart = process MEAN (variable). R-chart = process RANGE/variability (variable). c-chart = COUNT of defects per unit.", tip:"p-chart = fraction DEFECTIVE = attribute. X-bar = MEAN = variable. R-chart = RANGE = variable. c-chart = DEFECTS per unit. Key: DEFECTIVE = bad item. DEFECT = fault on item (different concepts)." },

  { id:51, section:"MAINS A", subject:"Manufacturing", topic:"EOQ", level:"M",
    q:"Annual demand D = 1600 units, Ordering cost Co = Rs 50 per order, Holding cost Ch = Rs 2 per unit per year. EOQ is:",
    opts:["200 units","283 units","400 units","100 units"],
    ans:0, exp:"EOQ = √(2 × D × Co / Ch)\n= √(2 × 1600 × 50 / 2)\n= √(160,000 / 2)\n= √80,000\n= 283 units\n\nWait: √(2×1600×50/2) = √(2×1600×50/2) = √(160000/2) = √80000 = 282.8 ≈ 283\n\nActually: 2×1600×50 = 160,000. 160,000/2 = 80,000. √80,000 = 282.8 ≈ 283 units.", ans:1, exp:"EOQ = √(2DCo/Ch) = √(2×1600×50/2) = √(80,000) = 282.8 ≈ 283 units\n\nAt EOQ: Ordering cost = Holding cost (both equal)\nNumber of orders per year = D/EOQ = 1600/283 ≈ 5.65 orders", tip:"EOQ = √(2DCo/Ch). At EOQ: ordering cost = holding cost. Simple check: 2×D×Co/Ch under square root. Common exam values: result usually a round-ish number." },

  { id:52, section:"MAINS A", subject:"IC Engines", topic:"Combustion", level:"M",
    q:"In a petrol engine, 'knocking' or 'pinking' is caused by:",
    opts:["Spark plug firing too late","Pre-ignition of end gas (auto-ignition of air-fuel mixture before spark)","Fuel mixture being too lean","Coolant overheating"],
    ans:1, exp:"Knocking occurs when the END GAS (unburned portion of air-fuel mixture ahead of flame front) AUTO-IGNITES before the normal flame reaches it. This creates pressure waves that cause a metallic knocking sound. Factors that increase knocking: high compression ratio, poor quality fuel (low octane), advanced ignition timing, overheating.\n\nSolution: Use higher octane fuel, retard ignition timing, use knock sensor (ECU automatically retards timing when knock detected).", tip:"Knocking = auto-ignition of end gas. Octane number measures KNOCK RESISTANCE. Higher octane = less knocking. Knock sensor in ECU retards timing when knock detected. Diesel has no knock (compression ignition is intended auto-ignition)." },

  { id:53, section:"MAINS A", subject:"IC Engines", topic:"Lubrication", level:"M",
    q:"SAE viscosity grade '5W-30' engine oil: what does '5W' represent?",
    opts:["5% additive content","Winter viscosity at low temperature (cold start performance)","5 litres capacity","5% sulphur content"],
    ans:1, exp:"SAE 5W-30 multigrade oil:\n5W = Winter rating: viscosity at LOW temperature (cold start). Lower W number = flows better at cold start. 0W flows best, 5W is next, 10W, 15W etc.\n30 = Viscosity at HIGH temperature (100°C operating). Higher number = thicker at operating temp.\n\nMultigrade oil works in all seasons. Single grade (SAE 30) only works at operating temperature.", tip:"5W = winter/cold viscosity. 30 = hot operating viscosity. Lower W = better cold start. Higher number = thicker when hot. Multigrade 5W-30 works in all seasons vs single grade which only works in one temperature range." },

  { id:54, section:"MAINS A", subject:"Hydraulics", topic:"Pascal's Law", level:"M",
    q:"In a hydraulic brake system, master cylinder piston area = 4 cm² and wheel cylinder piston area = 16 cm². With a pedal force of 200 N, what force acts on the brake shoe/pad?",
    opts:["50 N","800 N","200 N","400 N"],
    ans:1, exp:"Pascal's Law: Pressure is equal throughout.\nPressure = Force/Area = 200/4 = 50 N/cm²\n\nForce at wheel cylinder = Pressure × Area = 50 × 16 = 800 N\n\nForce multiplication = 16/4 = 4x\nOutput = 4 × 200 = 800 N\n\nThis is why hydraulic brakes feel so powerful with modest pedal effort.", tip:"Pascal: Force multiplied by area ratio. F_out = F_in × (A_out/A_in). Here: 200 × (16/4) = 200 × 4 = 800 N. Larger wheel cylinder = more force multiplication." },

  { id:55, section:"MAINS A", subject:"Thermal Engineering", topic:"Refrigeration", level:"M",
    q:"A refrigerator has COP = 3.5 and the evaporator absorbs 7 kW from refrigerated space. The power consumed by the compressor is:",
    opts:["24.5 kW","2 kW","3.5 kW","10.5 kW"],
    ans:1, exp:"COP = Q_L / W\nW = Q_L / COP = 7 / 3.5 = 2 kW\n\nHeat rejected to surroundings:\nQ_H = Q_L + W = 7 + 2 = 9 kW\n\nCOP_heat_pump = Q_H/W = 9/2 = 4.5 = COP_ref + 1 = 3.5 + 1 ✓", tip:"W = Q_L/COP. Rearrange COP formula: COP = Q_L/W → W = Q_L/COP = 7/3.5 = 2 kW. Then Q_H = Q_L + W = 9 kW. Always verify: COP_HP = COP_ref + 1." },

  // MAINS SECTION B/C (5 Questions)
  { id:56, section:"MAINS B/C", subject:"Transport Management", topic:"MV Act", level:"M",
    q:"Under Section 185 Motor Vehicles Act 1988, the blood alcohol concentration (BAC) limit for driving is 30 mg per 100 ml. The penalty for FIRST OFFENCE drunk driving is:",
    opts:["Rs 1,000 fine only","Imprisonment up to 6 months AND/OR fine up to Rs 10,000","Rs 5,000 fine only","Warning notice only"],
    ans:1, exp:"Section 185 (2019 Amendment): DUI offences\nFIRST OFFENCE: Imprisonment up to 6 months AND/OR fine up to Rs 10,000\nREPEAT OFFENCE (within 3 years): Imprisonment up to 2 years AND/OR fine up to Rs 15,000\n\nBAC limit = 30 mg/100 ml blood. This is among the strictest limits in Asia.", tip:"Sec 185 DUI: First = 6 months jail + Rs 10,000. Repeat within 3 years = 2 years jail + Rs 15,000. BAC = 30 mg/100ml. Know both offence levels." },

  { id:57, section:"MAINS B/C", subject:"Transport Management", topic:"Permits", level:"M",
    q:"A MSRTC bus carrying passengers on a fixed route with separate fares for each passenger is operating under which permit?",
    opts:["Contract Carriage Permit (Section 74)","Stage Carriage Permit (Section 72)","Tourist Vehicle Permit (Section 88)","Goods Carriage Permit (Section 79)"],
    ans:1, exp:"Stage Carriage Permit (Section 72): Fixed route, fixed stops, SEPARATE FARES per passenger. MSRTC, BEST, city buses all operate under stage carriage permit.\n\nContract Carriage (Sec 74): Whole vehicle hired under ONE contract (taxi, school van, chartered bus).\n\nAll permits validity: 5 years (Section 81).", tip:"MSRTC = Stage Carriage = Sec 72 = separate fares = fixed route. Contract Carriage = whole vehicle = one contract = taxi. Key distinction: per-passenger fare vs whole-vehicle contract." },

  { id:58, section:"MAINS B/C", subject:"Transport Management", topic:"Road Safety", level:"M",
    q:"A road location is classified as a 'Black Spot' when it has:",
    opts:["10+ accidents in 1 year","5 or more accidents OR 2 or more deaths at the same location in 3 consecutive years","Any accident resulting in death","High traffic volume only"],
    ans:1, exp:"Black Spot definition (MoRTH/NHAI standard): A location where 5 or more road accidents OR 2 or more deaths have occurred in 3 consecutive years at the SAME stretch (within 500 metres).\n\nBlack spots are identified through iRAD data. NHAI/PWD then conducts road safety audits and implements engineering improvements: guardrails, signage, lighting, road geometry.", tip:"Black spot = 5+ accidents OR 2+ deaths in 3 CONSECUTIVE years at same location. 500 metre stretch. Identified via iRAD. Engineering fix: NHAI/PWD corrects road design." },

  { id:59, section:"MAINS B/C", subject:"Automobile Systems", topic:"Brakes", level:"M",
    q:"During a fitness inspection, an ARTO observes a transport vehicle bus where: ABS warning light is illuminated, brake pad thickness is 1.5mm, and AdBlue level is critically low. The correct action is:",
    opts:["Issue CF with advisory","Issue CF with 3 months conditional validity","REFUSE to issue CF until all three defects are rectified","Only fail for ABS light, issue conditional CF for rest"],
    ans:2, exp:"All three defects are AUTOMATIC FAIL conditions:\n1. ABS warning light ON = ABS system defective = mandatory safety system fault\n2. Brake pad 1.5mm < minimum 2mm = below specification = brake safety compromised\n3. AdBlue critically low = SCR system will go into limp mode = emission violation\n\nSection 56 MV Act: Inspecting Authority (ARTO) must REFUSE Certificate of Fitness if vehicle does not meet all requirements. Vehicle must be repaired and re-presented.", tip:"Any ONE safety defect = refuse CF. Three defects = definitely refuse CF. ARTO cannot issue conditional CF for safety-critical items. Vehicle must be rectified and re-inspected. This is your core job function." },

  { id:60, section:"MAINS B/C", subject:"Hydraulic Machinery", topic:"Centrifugal Pump", level:"M",
    q:"A centrifugal pump is NOT self-priming. This means:",
    opts:["It cannot handle high viscosity fluids","It must be filled with liquid before starting — cannot begin pumping from empty (dry) condition","It cannot operate in reverse","It only works at low pressure"],
    ans:1, exp:"Centrifugal pump NOT self-priming: Before starting, the pump and suction pipe must be COMPLETELY FILLED WITH LIQUID (primed). If air is present: the centrifugal impeller cannot create sufficient suction to draw liquid from the source.\n\nSelf-priming pumps: Reciprocating pumps, gear pumps, diaphragm pumps — these CAN draw from empty (create suction without liquid).\n\nFor engine water pumps: they remain filled with coolant, so priming is not usually an issue in normal operation.", tip:"Centrifugal pump = NOT self-priming = must be primed (filled) before starting. If air in pump = no flow. Reciprocating, gear, diaphragm pumps = self-priming. Engine water pump stays filled = priming not an issue in normal use." },
];

// Fix the EOQ question - it has two ans fields, use the correct one
ALL_QUESTIONS[50] = { id:51, section:"MAINS A", subject:"Manufacturing", topic:"EOQ", level:"M",
  q:"Annual demand D = 1600 units, Ordering cost Co = Rs 50 per order, Holding cost Ch = Rs 2 per unit per year. EOQ is approximately:",
  opts:["200 units","283 units","400 units","160 units"],
  ans:1, exp:"EOQ = √(2 × D × Co / Ch)\n= √(2 × 1600 × 50 / 2)\n= √(160,000 / 2)\n= √80,000\n≈ 283 units\n\nAt EOQ: Total ordering cost = Total holding cost (both equal at optimum).\nOrders per year = 1600/283 ≈ 5.7 orders.", tip:"EOQ = √(2DCo/Ch). Under the root: 2 × Demand × Ordering cost / Holding cost. At EOQ: ordering cost equals holding cost. Minimises TOTAL inventory cost." };

var SECTION_CONFIG = [
  { id:"PRELIMS", label:"PRELIMS", sub:"GS + Mental Ability + Auto Trends", marks:30, time:30, color:C.cyan, count:30 },
  { id:"MAINS A", label:"MAINS SECTION A", sub:"Technical Engineering", marks:25, time:25, color:C.gold, count:25 },
  { id:"MAINS B/C", label:"MAINS SECTION B/C", sub:"Choose Automobile/Transport", marks:5, time:5, color:C.purple, count:5 },
];

export default function App() {
  var [phase, setPhase] = useState("intro"); // intro | test | review | result
  var [answers, setAnswers] = useState({});
  var [flagged, setFlagged] = useState({});
  var [currentQ, setCurrentQ] = useState(0);
  var [timeLeft, setTimeLeft] = useState(60 * 60); // 60 min
  var [sectionFilter, setSectionFilter] = useState("ALL");
  var [reviewIdx, setReviewIdx] = useState(0);
  var timerRef = useRef(null);

  useEffect(function() {
    if (phase === "test") {
      timerRef.current = setInterval(function() {
        setTimeLeft(function(t) {
          if (t <= 1) { clearInterval(timerRef.current); setPhase("result"); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return function() { clearInterval(timerRef.current); };
  }, [phase]);

  var mins = Math.floor(timeLeft / 60);
  var secs = timeLeft % 60;
  var timeColor = timeLeft < 300 ? C.red : timeLeft < 600 ? C.orange : C.green;

  function selectAnswer(qid, optIdx) {
    setAnswers(function(prev) { var n = Object.assign({}, prev); n[qid] = optIdx; return n; });
  }
  function toggleFlag(qid) {
    setFlagged(function(prev) { var n = Object.assign({}, prev); n[qid] = !n[qid]; return n; });
  }

  var attempted = Object.keys(answers).length;
  var correct = ALL_QUESTIONS.filter(function(q) { return answers[q.id] === q.ans; }).length;
  var wrong = ALL_QUESTIONS.filter(function(q) { return answers[q.id] !== undefined && answers[q.id] !== q.ans; }).length;
  var skipped = ALL_QUESTIONS.length - attempted;
  var rawScore = correct - wrong * 0.25;
  var maxScore = ALL_QUESTIONS.length;
  var pct = Math.round((correct / ALL_QUESTIONS.length) * 100);

  var sectionScores = SECTION_CONFIG.map(function(sc) {
    var qs = ALL_QUESTIONS.filter(function(q) { return q.section === sc.id; });
    var c = qs.filter(function(q) { return answers[q.id] === q.ans; }).length;
    var w = qs.filter(function(q) { return answers[q.id] !== undefined && answers[q.id] !== q.ans; }).length;
    return { ...sc, correct:c, wrong:w, raw:(c - w*0.25).toFixed(2) };
  });

  var displayQs = sectionFilter === "ALL" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(function(q) { return q.section === sectionFilter; });
  var q = ALL_QUESTIONS[currentQ];

  // ── INTRO ──
  if (phase === "intro") return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"system-ui,sans-serif", color:C.text, padding:20 }}>
      <div style={{ maxWidth:700, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:56, marginBottom:12 }}>📝</div>
          <div style={{ fontSize:26, fontWeight:700, color:C.gold, letterSpacing:3, marginBottom:8 }}>MPSC RTO/AMVI 2026</div>
          <div style={{ fontSize:18, color:C.text, marginBottom:4 }}>FULL-LENGTH MOCK EXAMINATION</div>
          <div style={{ color:C.soft, fontSize:13, fontFamily:"monospace" }}>Prelims + Mains Section A + Mains Section B/C</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:24 }}>
          {[
            { l:"Total Questions", v:"60", c:C.cyan },
            { l:"Total Time", v:"60 Min", c:C.gold },
            { l:"Negative Marking", v:"−0.25", c:C.red },
            { l:"Prelims Questions", v:"30", c:C.cyan },
            { l:"Mains A Questions", v:"25", c:C.gold },
            { l:"Mains B/C Questions", v:"5", c:C.purple },
          ].map(function(s) {
            return (
              <div key={s.l} style={{ background:C.card, border:"1px solid "+C.border, borderRadius:12, padding:"14px 16px", textAlign:"center" }}>
                <div style={{ color:s.c, fontSize:24, fontWeight:700 }}>{s.v}</div>
                <div style={{ color:C.muted, fontSize:10, fontFamily:"monospace", letterSpacing:1, marginTop:4 }}>{s.l}</div>
              </div>
            );
          })}
        </div>
        <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:18, marginBottom:24 }}>
          <div style={{ fontFamily:"monospace", color:C.yellow, fontSize:11, letterSpacing:1, marginBottom:12 }}>INSTRUCTIONS — READ CAREFULLY</div>
          {[
            "60 questions covering all topics: GS, Mental Ability, Auto Trends, SOM, Theory of Machines, Hydraulics, Thermal Engineering, Automobile Engg, Manufacturing, and Transport Management.",
            "Negative marking: −0.25 marks for each WRONG answer. No penalty for unattempted questions.",
            "Strategy: Attempt questions you are 60%+ confident about. Skip doubtful questions.",
            "You can navigate freely between questions, flag doubtful ones, and return later.",
            "Timer: 60 minutes. Test auto-submits when time expires.",
            "After completion: Full analysis with section-wise scores, percentage, and detailed explanations.",
          ].map(function(inst, i) {
            return (
              <div key={i} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid "+C.border+"40", fontSize:13, color:C.soft }}>
                <span style={{ color:C.gold, fontFamily:"monospace", fontSize:11, flexShrink:0, marginTop:1 }}>{i+1}.</span>{inst}
              </div>
            );
          })}
        </div>
        <button onClick={function(){ setPhase("test"); }} style={{ width:"100%", padding:18, borderRadius:12, border:"none", background:"linear-gradient(135deg,"+C.gold+","+C.orange+")", color:"#000", fontWeight:700, cursor:"pointer", fontSize:18, letterSpacing:2 }}>
          START MOCK TEST ▶
        </button>
      </div>
    </div>
  );

  // ── TEST ──
  if (phase === "test") return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
      <style>{["*{box-sizing:border-box}","::-webkit-scrollbar{width:4px}","::-webkit-scrollbar-thumb{background:#181C2C;border-radius:3px}"].join("")}</style>

      {/* TOP BAR */}
      <div style={{ background:C.card, borderBottom:"1px solid "+C.border, padding:"0 20px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", gap:16, padding:"10px 0" }}>
          <div style={{ color:C.gold, fontFamily:"monospace", fontSize:13, fontWeight:700 }}>MPSC RTO/AMVI 2026 MOCK</div>
          <div style={{ marginLeft:"auto", display:"flex", gap:20, alignItems:"center" }}>
            <div style={{ display:"flex", gap:14 }}>
              {[
                { l:"Attempted", v:attempted, c:C.green },
                { l:"Flagged", v:Object.values(flagged).filter(Boolean).length, c:C.yellow },
                { l:"Remaining", v:ALL_QUESTIONS.length - attempted, c:C.soft },
              ].map(function(s) { return <div key={s.l} style={{ textAlign:"center" }}><div style={{ color:s.c, fontWeight:700, fontSize:16 }}>{s.v}</div><div style={{ color:C.muted, fontSize:9, fontFamily:"monospace" }}>{s.l}</div></div>; })}
            </div>
            <div style={{ background:timeColor+"20", border:"2px solid "+timeColor+"50", borderRadius:10, padding:"6px 14px", textAlign:"center" }}>
              <div style={{ color:timeColor, fontFamily:"monospace", fontSize:18, fontWeight:700 }}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
              <div style={{ color:C.muted, fontSize:9, fontFamily:"monospace" }}>TIME LEFT</div>
            </div>
            <button onClick={function(){ clearInterval(timerRef.current); setPhase("result"); }} style={{ padding:"8px 20px", borderRadius:8, border:"none", background:C.red, color:"#fff", fontFamily:"monospace", fontSize:12, cursor:"pointer", fontWeight:700 }}>SUBMIT TEST</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px", display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>
        {/* QUESTION PANEL */}
        <div>
          {/* Section and progress */}
          <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
            <div style={{ background:C.cyan+"15", color:C.cyan, border:"1px solid "+C.cyan+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>Q{currentQ+1}/{ALL_QUESTIONS.length}</div>
            <div style={{ background:C.gold+"15", color:C.gold, border:"1px solid "+C.gold+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{q.section}</div>
            <div style={{ background:C.purple+"15", color:C.purple, border:"1px solid "+C.purple+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>{q.subject}</div>
            <div style={{ background:C.teal+"15", color:C.teal, border:"1px solid "+C.teal+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>{q.topic}</div>
            {flagged[q.id] && <div style={{ background:C.yellow+"15", color:C.yellow, border:"1px solid "+C.yellow+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>🚩 FLAGGED</div>}
          </div>

          <div style={{ height:4, background:C.muted, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
            <div style={{ width:((currentQ/ALL_QUESTIONS.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.cyan+","+C.gold+")", transition:"width 0.3s" }} />
          </div>

          {/* Question */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:"20px 22px", marginBottom:16, borderLeft:"4px solid "+C.gold }}>
            <div style={{ fontSize:16, lineHeight:1.8, fontWeight:500 }}>
              <span style={{ color:C.gold, fontSize:20, marginRight:10, fontWeight:700 }}>Q{currentQ+1}.</span>{q.q}
            </div>
          </div>

          {/* Options */}
          <div style={{ display:"grid", gap:10, marginBottom:20 }}>
            {q.opts.map(function(opt, i) {
              var sel = answers[q.id] === i;
              return (
                <div key={i} onClick={function(){ selectAnswer(q.id, i); }} style={{
                  display:"flex", gap:14, alignItems:"flex-start", padding:"14px 16px",
                  borderRadius:10, border:"1.5px solid "+(sel?C.gold:C.border),
                  background:sel?C.gold+"15":C.card, cursor:"pointer",
                  transition:"all 0.15s",
                }}>
                  <div style={{ width:30, height:30, borderRadius:6, background:sel?C.gold+"30":"#15182A", border:"1.5px solid "+(sel?C.gold:C.soft+"50"), display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:13, color:sel?C.gold:C.soft, fontWeight:700, flexShrink:0 }}>{["A","B","C","D"][i]}</div>
                  <span style={{ fontSize:14, lineHeight:1.6, paddingTop:4, color:sel?C.text:C.soft }}>{opt}</span>
                  {sel && <span style={{ marginLeft:"auto", color:C.gold, fontSize:16 }}>●</span>}
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={function(){ if(currentQ>0) setCurrentQ(currentQ-1); }} disabled={currentQ===0} style={{ flex:1, padding:12, borderRadius:10, border:"1px solid "+C.border, background:C.card, color:currentQ===0?C.muted:C.text, cursor:currentQ===0?"not-allowed":"pointer", fontFamily:"monospace", fontSize:13 }}>← PREV</button>
            <button onClick={function(){ toggleFlag(q.id); }} style={{ padding:"12px 20px", borderRadius:10, border:"1px solid "+(flagged[q.id]?C.yellow:C.border), background:flagged[q.id]?C.yellow+"15":C.card, color:flagged[q.id]?C.yellow:C.soft, cursor:"pointer", fontFamily:"monospace", fontSize:12 }}>
              {flagged[q.id]?"🚩 UNFLAG":"🚩 FLAG"}
            </button>
            <button onClick={function(){ if(currentQ<ALL_QUESTIONS.length-1) setCurrentQ(currentQ+1); }} disabled={currentQ===ALL_QUESTIONS.length-1} style={{ flex:1, padding:12, borderRadius:10, border:"1px solid "+C.border, background:currentQ<ALL_QUESTIONS.length-1?C.gold+"15":C.card, color:currentQ===ALL_QUESTIONS.length-1?C.muted:C.gold, cursor:currentQ===ALL_QUESTIONS.length-1?"not-allowed":"pointer", fontFamily:"monospace", fontSize:13 }}>NEXT →</button>
          </div>
        </div>

        {/* QUESTION PALETTE */}
        <div>
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:14, position:"sticky", top:70 }}>
            <div style={{ fontFamily:"monospace", color:C.soft, fontSize:10, letterSpacing:2, marginBottom:10 }}>QUESTION PALETTE</div>
            <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              {[{l:"●Answered",c:C.green},{l:"◌ Flagged",c:C.yellow},{l:"○ Not attempted",c:C.muted}].map(function(lg) {
                return <div key={lg.l} style={{ display:"flex", alignItems:"center", gap:4, fontSize:9, color:lg.c, fontFamily:"monospace" }}>{lg.l}</div>;
              })}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, maxHeight:320, overflowY:"auto" }}>
              {ALL_QUESTIONS.map(function(aq, idx) {
                var isAns = answers[aq.id] !== undefined;
                var isFlag = flagged[aq.id];
                var isCurrent = currentQ === idx;
                return (
                  <button key={aq.id} onClick={function(){ setCurrentQ(idx); }} style={{
                    width:36, height:36, borderRadius:8, border:"2px solid "+(isCurrent?C.gold:isAns?C.green+"80":isFlag?C.yellow+"80":C.border),
                    background:isCurrent?C.gold+"20":isAns?C.green+"15":isFlag?C.yellow+"15":C.bg,
                    color:isCurrent?C.gold:isAns?C.green:isFlag?C.yellow:C.soft,
                    fontFamily:"monospace", fontSize:11, cursor:"pointer", fontWeight:isCurrent?700:400,
                  }}>{idx+1}</button>
                );
              })}
            </div>
            <div style={{ marginTop:12, padding:"10px", background:C.bg, borderRadius:8 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:11, fontFamily:"monospace" }}>
                <div style={{ color:C.green }}>✓ {attempted} answered</div>
                <div style={{ color:C.yellow }}>🚩 {Object.values(flagged).filter(Boolean).length} flagged</div>
                <div style={{ color:C.soft }}>○ {ALL_QUESTIONS.length - attempted} remaining</div>
                <div style={{ color:C.soft }}>Q {currentQ+1}/{ALL_QUESTIONS.length}</div>
              </div>
            </div>
            <button onClick={function(){ clearInterval(timerRef.current); setPhase("result"); }} style={{ width:"100%", marginTop:10, padding:10, borderRadius:8, border:"none", background:C.red, color:"#fff", fontFamily:"monospace", fontSize:12, cursor:"pointer", fontWeight:700 }}>SUBMIT & VIEW RESULT</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === "result") {
    var grade = rawScore >= 48 ? "A+" : rawScore >= 42 ? "A" : rawScore >= 36 ? "B+" : rawScore >= 30 ? "B" : rawScore >= 24 ? "C" : "D";
    var gradeColor = rawScore >= 48 ? C.gold : rawScore >= 42 ? C.green : rawScore >= 36 ? C.cyan : rawScore >= 30 ? C.yellow : rawScore >= 24 ? C.orange : C.red;
    var verdict = rawScore >= 42 ? "EXAM READY! 🏆" : rawScore >= 33 ? "GOOD — REVISE WEAK AREAS 📚" : rawScore >= 24 ? "NEEDS MORE PRACTICE 💪" : "INTENSIVE REVISION REQUIRED 🔄";

    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
        <style>{"*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#181C2C;border-radius:3px}"}</style>

        {/* NAV */}
        <div style={{ background:C.card, borderBottom:"1px solid "+C.border, padding:"12px 20px", display:"flex", gap:16, alignItems:"center" }}>
          <div style={{ color:C.gold, fontFamily:"monospace", fontWeight:700, fontSize:14 }}>MPSC RTO/AMVI 2026 — RESULT ANALYSIS</div>
          <div style={{ marginLeft:"auto", display:"flex", gap:10 }}>
            {["result","review"].map(function(v) {
              return <button key={v} onClick={function(){ setPhase(v); }} style={{ padding:"7px 18px", borderRadius:8, border:"none", background:phase===v?C.gold+"20":C.bg, color:phase===v?C.gold:C.soft, fontFamily:"monospace", fontSize:11, cursor:"pointer", fontWeight:700, borderBottom:phase===v?"2px solid "+C.gold:"2px solid transparent" }}>{v==="result"?"📊 RESULT":"📖 REVIEW ANSWERS"}</button>;
            })}
            <button onClick={function(){ setPhase("intro"); setAnswers({}); setFlagged({}); setCurrentQ(0); setTimeLeft(3600); }} style={{ padding:"7px 18px", borderRadius:8, border:"1px solid "+C.border, background:"transparent", color:C.soft, fontFamily:"monospace", fontSize:11, cursor:"pointer" }}>🔄 RETAKE</button>
          </div>
        </div>

        <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 20px" }}>
          {/* SCORECARD */}
          <div style={{ background:"linear-gradient(135deg,#0A0A14,#06080A,#0A0A06)", border:"1px solid "+gradeColor+"40", borderRadius:20, padding:"28px 24px", marginBottom:24, textAlign:"center" }}>
            <div style={{ display:"inline-flex", width:110, height:110, borderRadius:"50%", background:gradeColor+"20", border:"4px solid "+gradeColor, alignItems:"center", justifyContent:"center", marginBottom:16 }}>
              <span style={{ fontSize:44, fontWeight:900, color:gradeColor, fontFamily:"monospace" }}>{grade}</span>
            </div>
            <div style={{ fontSize:24, color:gradeColor, fontWeight:700, letterSpacing:2, marginBottom:6 }}>{verdict}</div>
            <div style={{ fontSize:36, color:C.text, fontWeight:700, marginBottom:4 }}>
              {rawScore.toFixed(2)} <span style={{ color:C.muted, fontSize:18 }}>/ {maxScore}</span>
            </div>
            <div style={{ color:C.soft, fontSize:13, marginBottom:20 }}>Raw score with −0.25 negative marking applied</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, maxWidth:500, margin:"0 auto" }}>
              {[
                { l:"CORRECT", v:correct, c:C.green },
                { l:"WRONG", v:wrong, c:C.red },
                { l:"SKIPPED", v:skipped, c:C.soft },
                { l:"ACCURACY", v:pct+"%", c:C.cyan },
              ].map(function(s) {
                return (
                  <div key={s.l} style={{ background:s.c+"12", border:"1px solid "+s.c+"30", borderRadius:12, padding:"10px 8px" }}>
                    <div style={{ color:s.c, fontSize:22, fontWeight:700 }}>{s.v}</div>
                    <div style={{ color:C.muted, fontSize:9, fontFamily:"monospace", letterSpacing:1, marginTop:2 }}>{s.l}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION BREAKDOWN */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:20, marginBottom:20 }}>
            <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:2, marginBottom:14 }}>SECTION-WISE PERFORMANCE</div>
            {sectionScores.map(function(sc) {
              var secPct = Math.round((sc.correct/sc.count)*100);
              var scColor = secPct>=70?C.green:secPct>=50?C.yellow:C.red;
              return (
                <div key={sc.id} style={{ background:C.bg, borderRadius:10, padding:14, marginBottom:10, borderLeft:"4px solid "+sc.color }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div>
                      <div style={{ color:sc.color, fontWeight:700, fontSize:14 }}>{sc.label}</div>
                      <div style={{ color:C.soft, fontSize:11 }}>{sc.sub} · {sc.count} questions</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ color:scColor, fontSize:22, fontWeight:700 }}>{sc.raw}</div>
                      <div style={{ color:C.soft, fontSize:10, fontFamily:"monospace" }}>{sc.correct}C / {sc.wrong}W · {secPct}%</div>
                    </div>
                  </div>
                  <div style={{ height:6, background:C.muted, borderRadius:3, overflow:"hidden" }}>
                    <div style={{ width:secPct+"%", height:"100%", background:scColor, borderRadius:3, transition:"width 0.5s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* TOPIC BREAKDOWN */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:20, marginBottom:20 }}>
            <div style={{ fontFamily:"monospace", color:C.cyan, fontSize:11, letterSpacing:2, marginBottom:14 }}>TOPIC-WISE ANALYSIS — IDENTIFY WEAK AREAS</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {(function() {
                var topics = {};
                ALL_QUESTIONS.forEach(function(q) {
                  if (!topics[q.subject]) topics[q.subject] = { correct:0, total:0 };
                  topics[q.subject].total++;
                  if (answers[q.id] === q.ans) topics[q.subject].correct++;
                });
                return Object.keys(topics).map(function(subj) {
                  var d = topics[subj];
                  var p = Math.round((d.correct/d.total)*100);
                  var col = p>=75?C.green:p>=50?C.yellow:C.red;
                  return (
                    <div key={subj} style={{ background:C.bg, borderRadius:8, padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ color:C.text, fontSize:12, fontWeight:600 }}>{subj}</div>
                        <div style={{ color:C.soft, fontSize:10 }}>{d.total} questions</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ color:col, fontWeight:700, fontSize:16 }}>{p}%</div>
                        <div style={{ color:C.soft, fontSize:10 }}>{d.correct}/{d.total}</div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* RECOMMENDATION */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"monospace", color:C.gold, fontSize:11, letterSpacing:2, marginBottom:14 }}>PERSONALISED RECOMMENDATIONS</div>
            <div style={{ display:"grid", gap:10 }}>
              {rawScore >= 42 ? [
                "Excellent performance! You are demonstrating exam-level readiness.",
                "Continue with daily mock tests to maintain this level of accuracy.",
                "Focus on maintaining your strong sections while polishing any weak topics.",
                "Practice time management — aim to complete the test with 10 minutes to spare.",
                "Review the explanations for every wrong answer to close all knowledge gaps.",
              ] : rawScore >= 33 ? [
                "Good performance — you are on track but need focused revision.",
                "Identify your 2-3 weakest topics from the analysis above and revise them this week.",
                "Revisit those topic modules (📖 LEARN tab) and practice the full 12-question quiz.",
                "Focus especially on formula-based questions — practice 5 numericals daily.",
                "Retake this mock after 3 days of revision to measure improvement.",
              ] : [
                "This score indicates you need more systematic study before the exam.",
                "Go back to the topic modules starting from your weakest subjects above.",
                "Spend 2 days on each weak topic: Learn all sections, then practice quiz to 75%+.",
                "Do NOT skip the TIPS and FORMULAS tabs — they contain exam shortcuts.",
                "Retake this mock after completing full revision of the first 5 topic modules.",
              ].map(function(rec, i) {
                return (
                  <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", background:C.bg, borderRadius:8 }}>
                    <span style={{ color:C.gold, flexShrink:0 }}>→</span>
                    <span style={{ color:C.text, fontSize:13, lineHeight:1.6 }}>{rec}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:16 }}>
              <button onClick={function(){ setPhase("review"); setReviewIdx(0); }} style={{ padding:"12px", borderRadius:10, border:"none", background:C.gold, color:"#000", fontWeight:700, cursor:"pointer", fontSize:14 }}>📖 REVIEW ALL ANSWERS</button>
              <button onClick={function(){ setPhase("intro"); setAnswers({}); setFlagged({}); setCurrentQ(0); setTimeLeft(3600); }} style={{ padding:"12px", borderRadius:10, border:"1px solid "+C.green, background:C.green+"15", color:C.green, fontWeight:700, cursor:"pointer", fontSize:14 }}>🔄 RETAKE FRESH TEST</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW ──
  if (phase === "review") {
    var filterSection = sectionFilter;
    var reviewQs = filterSection === "ALL" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(function(q) { return q.section === filterSection; });
    var rq = reviewQs[reviewIdx];
    var userAns = answers[rq.id];
    var isCorrect = userAns === rq.ans;
    var isSkipped = userAns === undefined;

    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.text }}>
        <style>{"*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#181C2C;border-radius:3px}"}</style>

        <div style={{ background:C.card, borderBottom:"1px solid "+C.border, padding:"10px 20px", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ color:C.gold, fontFamily:"monospace", fontWeight:700, fontSize:13 }}>ANSWER REVIEW</div>
          <div style={{ display:"flex", gap:8 }}>
            {["ALL","PRELIMS","MAINS A","MAINS B/C"].map(function(f) {
              return <button key={f} onClick={function(){ setSectionFilter(f); setReviewIdx(0); }} style={{ padding:"5px 12px", borderRadius:6, border:"1px solid "+(sectionFilter===f?C.gold:C.border), background:sectionFilter===f?C.gold+"15":C.card, color:sectionFilter===f?C.gold:C.soft, fontFamily:"monospace", fontSize:10, cursor:"pointer" }}>{f}</button>;
            })}
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:10 }}>
            <button onClick={function(){ setPhase("result"); }} style={{ padding:"6px 16px", borderRadius:8, border:"1px solid "+C.border, background:"transparent", color:C.soft, fontFamily:"monospace", fontSize:11, cursor:"pointer" }}>← BACK TO RESULTS</button>
          </div>
        </div>

        <div style={{ maxWidth:860, margin:"0 auto", padding:"20px" }}>
          {/* Progress through review */}
          <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
            <div style={{ background:C.cyan+"15", color:C.cyan, border:"1px solid "+C.cyan+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>Q{reviewIdx+1}/{reviewQs.length}</div>
            <div style={{ background:rq.section==="PRELIMS"?C.cyan+"15":rq.section==="MAINS A"?C.gold+"15":C.purple+"15", color:rq.section==="PRELIMS"?C.cyan:rq.section==="MAINS A"?C.gold:C.purple, border:"1px solid "+(rq.section==="PRELIMS"?C.cyan:rq.section==="MAINS A"?C.gold:C.purple)+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>{rq.section}</div>
            <div style={{ background:C.purple+"15", color:C.purple, border:"1px solid "+C.purple+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace" }}>{rq.subject} — {rq.topic}</div>
            <div style={{ background:(isSkipped?C.soft:isCorrect?C.green:C.red)+"15", color:isSkipped?C.soft:isCorrect?C.green:C.red, border:"1px solid "+(isSkipped?C.soft:isCorrect?C.green:C.red)+"45", padding:"2px 10px", borderRadius:4, fontSize:11, fontFamily:"monospace", fontWeight:700 }}>
              {isSkipped?"⊘ SKIPPED":isCorrect?"✅ CORRECT":"❌ WRONG"}
            </div>
          </div>

          <div style={{ height:3, background:C.muted, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
            <div style={{ width:((reviewIdx/reviewQs.length)*100)+"%", height:"100%", background:"linear-gradient(90deg,"+C.cyan+","+C.gold+")" }} />
          </div>

          {/* Question */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:"18px 20px", marginBottom:14, borderLeft:"4px solid "+C.gold }}>
            <div style={{ fontSize:15, lineHeight:1.8 }}>
              <span style={{ color:C.gold, fontSize:18, marginRight:8, fontWeight:700 }}>Q{reviewIdx+1}.</span>{rq.q}
            </div>
          </div>

          {/* Options with answer reveal */}
          <div style={{ display:"grid", gap:10, marginBottom:16 }}>
            {rq.opts.map(function(opt, i) {
              var isCorrectOpt = i === rq.ans;
              var isUserOpt = i === userAns;
              var bg = isCorrectOpt ? C.green+"15" : (isUserOpt && !isCorrectOpt) ? C.red+"15" : C.card;
              var bdr = isCorrectOpt ? C.green : (isUserOpt && !isCorrectOpt) ? C.red : C.border;
              var lc = isCorrectOpt ? C.green : (isUserOpt && !isCorrectOpt) ? C.red : C.muted;
              return (
                <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"13px 16px", borderRadius:10, border:"1.5px solid "+bdr, background:bg }}>
                  <div style={{ width:28, height:28, borderRadius:6, background:lc+"22", border:"1.5px solid "+lc+"50", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:12, color:lc, fontWeight:700, flexShrink:0 }}>{["A","B","C","D"][i]}</div>
                  <span style={{ fontSize:13, lineHeight:1.55, paddingTop:4, color:isCorrectOpt?C.text:C.soft }}>{opt}</span>
                  {isCorrectOpt && <span style={{ marginLeft:"auto", color:C.green, fontSize:16 }}>✅</span>}
                  {isUserOpt && !isCorrectOpt && <span style={{ marginLeft:"auto", color:C.red, fontSize:16 }}>❌</span>}
                </div>
              );
            })}
          </div>

          {/* Full explanation */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:18, marginBottom:16, borderLeft:"4px solid "+(isCorrect?C.green:isSkipped?C.soft:C.red) }}>
            <div style={{ fontWeight:700, color:isCorrect?C.green:isSkipped?C.soft:C.red, marginBottom:10, fontSize:14 }}>
              {isSkipped ? "⊘ NOT ATTEMPTED — Correct Answer: "+["A","B","C","D"][rq.ans] : isCorrect ? "✅ CORRECT — Well done!" : "❌ WRONG — Correct Answer: "+["A","B","C","D"][rq.ans]}
            </div>
            <div style={{ color:C.text, fontSize:13, lineHeight:1.9, whiteSpace:"pre-line", marginBottom:12 }}>{rq.exp}</div>
            <div style={{ padding:"10px 14px", background:C.yellow+"10", borderRadius:8, borderLeft:"3px solid "+C.yellow }}>
              <span style={{ color:C.yellow, fontWeight:700, fontSize:11, fontFamily:"monospace" }}>EXAM TIP: </span>
              <span style={{ color:C.text, fontSize:13 }}>{rq.tip}</span>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={function(){ if(reviewIdx>0) setReviewIdx(reviewIdx-1); }} disabled={reviewIdx===0} style={{ flex:1, padding:12, borderRadius:10, border:"1px solid "+C.border, background:C.card, color:reviewIdx===0?C.muted:C.text, cursor:reviewIdx===0?"not-allowed":"pointer", fontFamily:"monospace", fontSize:13 }}>← PREV</button>
            <button onClick={function(){ if(reviewIdx<reviewQs.length-1) setReviewIdx(reviewIdx+1); else setPhase("result"); }} style={{ flex:2, padding:12, borderRadius:10, border:"none", background:C.gold, color:"#000", fontWeight:700, cursor:"pointer", fontFamily:"monospace", fontSize:13 }}>
              {reviewIdx<reviewQs.length-1?"NEXT QUESTION →":"BACK TO RESULTS →"}
            </button>
          </div>

          {/* Mini palette */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:14, padding:14, marginTop:16 }}>
            <div style={{ fontFamily:"monospace", color:C.soft, fontSize:10, letterSpacing:1, marginBottom:10 }}>JUMP TO QUESTION</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {reviewQs.map(function(aq, idx) {
                var ua = answers[aq.id];
                var isCor = ua === aq.ans;
                var isSkip = ua === undefined;
                var isCur = reviewIdx === idx;
                return (
                  <button key={aq.id} onClick={function(){ setReviewIdx(idx); }} style={{
                    width:32, height:32, borderRadius:7, border:"2px solid "+(isCur?C.gold:isCor?C.green+"60":isSkip?C.border:C.red+"60"),
                    background:isCur?C.gold+"20":isCor?C.green+"12":isSkip?C.bg:C.red+"12",
                    color:isCur?C.gold:isCor?C.green:isSkip?C.muted:C.red,
                    fontFamily:"monospace", fontSize:10, cursor:"pointer", fontWeight:isCur?700:400,
                  }}>{idx+1}</button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}