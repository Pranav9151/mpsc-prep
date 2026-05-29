import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy load all topic components for better performance
const MasterDashboard        = lazy(() => import("./components/topic15_Master_Dashboard"));
const MockTest2026           = lazy(() => import("./components/topic14-mock-test-2026"));
const Topic1ICEngines        = lazy(() => import("./components/topic1-ic-engines"));
const Topic2MVAct1988        = lazy(() => import("./components/topic2-mv-act-1988"));
const Topic3TransmissionSys  = lazy(() => import("./components/topic3-transmission-systems"));
const Topic4BrakingSuspension= lazy(() => import("./components/topic4-braking-suspension"));
const Topic5EmissionNorms    = lazy(() => import("./components/topic5-emission-norms"));
const Topic6PolityGS         = lazy(() => import("./components/topic6-polity-gs"));
const Topic7SOM              = lazy(() => import("./components/topic7-strength-of-materials"));
const Topic8AutoEng          = lazy(() => import("./components/topic8-automobile-engineering"));
const Topic9Thermo           = lazy(() => import("./components/topic9-thermodynamics"));
const Topic10Mfg             = lazy(() => import("./components/topic10-manufacturing"));
const Topic11Transport       = lazy(() => import("./components/topic11-transport-management"));
const Topic12CA              = lazy(() => import("./components/topic12-current-affairs-science"));
const BonusMissingTopics     = lazy(() => import("./components/topic13_bonus-missing-topics"));

// Loading fallback
function Loading() {
  return (
    <div style={{
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      minHeight:"80vh", background:"#05060A",
      color:"#D97706", fontFamily:"monospace",
    }}>
      <div style={{ fontSize:48, marginBottom:16 }}>⚙️</div>
      <div style={{ fontSize:16, letterSpacing:2, marginBottom:8 }}>LOADING MODULE...</div>
      <div style={{ fontSize:12, color:"#5A6890" }}>MPSC RTO / AMVI 2026</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/"         element={<MasterDashboard />} />
          <Route path="/mocktest" element={<MockTest2026 />} />
          <Route path="/topic1"   element={<Topic1ICEngines />} />
          <Route path="/topic2"   element={<Topic2MVAct1988 />} />
          <Route path="/topic3"   element={<Topic3TransmissionSys />} />
          <Route path="/topic4"   element={<Topic4BrakingSuspension />} />
          <Route path="/topic5"   element={<Topic5EmissionNorms />} />
          <Route path="/topic6"   element={<Topic6PolityGS />} />
          <Route path="/topic7"   element={<Topic7SOM />} />
          <Route path="/topic8"   element={<Topic8AutoEng />} />
          <Route path="/topic9"   element={<Topic9Thermo />} />
          <Route path="/topic10"  element={<Topic10Mfg />} />
          <Route path="/topic11"  element={<Topic11Transport />} />
          <Route path="/topic12"  element={<Topic12CA />} />
          <Route path="/bonus"    element={<BonusMissingTopics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
