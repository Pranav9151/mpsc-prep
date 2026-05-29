# 🎯 MPSC RTO / AMVI 2026 — Complete Preparation System

A fully interactive React web application covering **100% of the official MPSC AMVI/RTO 2026 syllabus** — 15 topic modules, 160+ practice questions, a 60-question timed mock exam, and a 30-day study plan.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
```

---

## 📁 Project Structure

```
mpsc-prep/
├── src/
│   ├── App.jsx                          ← Router — links all pages
│   ├── main.jsx                         ← React entry point
│   ├── index.css                        ← Global reset styles
│   └── components/
│       ├── Navbar.jsx                   ← Global navigation bar
│       ├── topic15_Master_Dashboard.jsx ← 🏠 HOME — progress + study plan
│       ├── topic14-mock-test-2026.jsx   ← 📝 MOCK — 60Q timed exam
│       ├── topic1-ic-engines.jsx        ← 🔥 IC Engines (18%)
│       ├── topic2-mv-act-1988.jsx       ← ⚖️  MV Act 1988 (15%)
│       ├── topic3-transmission-systems.jsx  ← ⚙️  Transmission (12%)
│       ├── topic4-braking-suspension.jsx    ← 🛑 Braking (8%)
│       ├── topic5-emission-norms.jsx        ← 🌿 Emission/BS6 (8%)
│       ├── topic6-polity-gs.jsx             ← 🏛️  Polity & GS (10%)
│       ├── topic7-strength-of-materials.jsx ← 🔩 SOM (6%)
│       ├── topic8-automobile-engineering.jsx← 🚗 Automobile (7%)
│       ├── topic9-thermodynamics.jsx        ← 🌡️  Thermodynamics (6%)
│       ├── topic10-manufacturing.jsx        ← 🏭 Manufacturing (5%)
│       ├── topic11-transport-management.jsx ← 🚦 Transport Mgmt (6%)
│       ├── topic12-current-affairs-science.jsx ← 🌟 Current Affairs (4%)
│       └── topic13_bonus-missing-topics.jsx ← 🎯 BONUS — Hydraulics, Electronics
├── public/
│   └── favicon.svg
├── index.html
├── package.json
└── vite.config.js
```

---

## 🗺️ Navigation Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Master Dashboard | Home page, progress tracker, study plan |
| `/mocktest` | Mock Test 2026 | 60-question full timed exam |
| `/topic1` | IC Engines | 18% weightage — highest priority |
| `/topic2` | MV Act 1988 | 15% weightage |
| `/topic3` | Transmission | 12% weightage |
| `/topic4` | Braking & Suspension | 8% weightage |
| `/topic5` | Emission Norms | 8% weightage |
| `/topic6` | Polity & GS | 10% weightage |
| `/topic7` | Strength of Materials | 6% weightage |
| `/topic8` | Automobile Engineering | 7% weightage |
| `/topic9` | Thermodynamics | 6% weightage |
| `/topic10` | Manufacturing | 5% weightage |
| `/topic11` | Transport Management | 6% weightage |
| `/topic12` | Current Affairs & Science | 4% weightage |
| `/bonus` | Bonus Module | Hydraulics, Theory of Machines, Industrial Electronics |

---

## 📚 What's Covered (100% Official Syllabus)

### Prelims
- General Studies (History, Polity, Geography, Science)
- Mental Ability (Series, Analogy, Coding, Direction, Sets)
- Automobile & Mechanical Engineering Trends

### Mains Section A
- Strength of Materials (Stress, Strain, Bending, Torsion, Columns, Thin Cylinders)
- Mechanical Technology (Casting, Forging, Welding, Machining, Metrology)
- Theory of Machines (Governors, Gyroscopes, Cams — in Bonus)
- Hydraulics (Bernoulli, Flow types, Pascal's Law — in Bonus)
- Thermal Engineering (Laws, Cycles, Refrigeration, Heat Transfer)
- Automobile Engines (IC Engines, Combustion, Lubrication, Emission)
- Industrial Electronics (Diodes, BJT, UJT, ECU — in Bonus)

### Mains Section B
- Hydraulic Machinery (Pelton, Francis, Kaplan turbines, Pumps — in Bonus)
- Refrigeration & AC (VCR, COP, Refrigerants, Psychrometry)
- Industrial Engineering (Work Study, Plant Layout, SQC, EOQ)

### Mains Section C
- Automobile Systems (Transmission, Braking, Steering, Suspension)
- Vehicle Maintenance (Inspection, Fitness Certificate, Electrical Systems)
- Transport Management (RTO Structure, Permits, MV Act, Road Safety)

---

## 🔧 Build for Production

```bash
npm run build
# Output in /dist folder — ready to deploy
```

---

## 📊 Statistics

- **15** interactive topic modules
- **80+** learning sections
- **160+** practice questions (12 per topic)
- **60** questions in full mock test
- **100%** official syllabus coverage
- **0** installation issues (pure Vite + React)

---

## 🏆 Exam Details

- **Post:** Assistant Regional Transport Officer (ARTO) / Assistant Motor Vehicle Inspector (AMVI)
- **Conducting Body:** Maharashtra Public Service Commission (MPSC)
- **Prelims:** 100 marks, 60 min, −0.25 negative marking (qualifying only)
- **Mains:** 300 marks (240 Sec A + 60 Sec B or C), −0.25 negative marking
- **Interview:** 50 marks

---

*Built with React 19 + Vite 8 + React Router DOM 7*
