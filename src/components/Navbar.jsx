import { useNavigate, useLocation } from "react-router-dom";

var C = {
  bg:"#08091040", card:"#0C0E18", border:"#181C2C",
  gold:"#D97706", green:"#16A34A", text:"#EBF0FF",
  soft:"#5A6890", muted:"#20263A",
};

var ROUTES = [
  { path:"/", label:"🏠 Home", short:"Home" },
  { path:"/mocktest", label:"📝 Mock Test", short:"Mock" },
  { path:"/topic1",  label:"🔥 IC Engines", short:"T1" },
  { path:"/topic2",  label:"⚖️ MV Act", short:"T2" },
  { path:"/topic3",  label:"⚙️ Transmission", short:"T3" },
  { path:"/topic4",  label:"🛑 Braking", short:"T4" },
  { path:"/topic5",  label:"🌿 Emission", short:"T5" },
  { path:"/topic6",  label:"🏛️ Polity", short:"T6" },
  { path:"/topic7",  label:"🔩 SOM", short:"T7" },
  { path:"/topic8",  label:"🚗 Automobile", short:"T8" },
  { path:"/topic9",  label:"🌡️ Thermo", short:"T9" },
  { path:"/topic10", label:"🏭 Mfg", short:"T10" },
  { path:"/topic11", label:"🚦 Transport", short:"T11" },
  { path:"/topic12", label:"🌟 Current Affairs", short:"T12" },
  { path:"/bonus",   label:"🎯 Bonus", short:"Bonus" },
];

export default function Navbar() {
  var navigate = useNavigate();
  var location = useLocation();
  var current = ROUTES.find(function(r){ return r.path === location.pathname; });

  return (
    <div style={{
      position:"sticky", top:0, zIndex:1000,
      background:"rgba(5,6,10,0.95)",
      backdropFilter:"blur(10px)",
      borderBottom:"1px solid "+C.border,
      padding:"0 12px",
    }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", gap:8, height:48, overflowX:"auto" }}>
        {/* Brand */}
        <button onClick={function(){ navigate("/"); }} style={{
          background:C.gold+"15", border:"1px solid "+C.gold+"50",
          borderRadius:6, padding:"4px 12px", color:C.gold,
          fontFamily:"monospace", fontSize:11, fontWeight:700,
          letterSpacing:1, whiteSpace:"nowrap", flexShrink:0,
        }}>🎯 MPSC RTO 2026</button>

        <div style={{ width:1, height:28, background:C.border, flexShrink:0 }} />

        {/* Navigation links */}
        {ROUTES.map(function(r) {
          var isActive = location.pathname === r.path;
          return (
            <button key={r.path} onClick={function(){ navigate(r.path); }} style={{
              background:isActive?C.gold+"18":"transparent",
              border:"none",
              borderBottom:"2px solid "+(isActive?C.gold:"transparent"),
              borderRadius:"4px 4px 0 0",
              padding:"4px 10px",
              color:isActive?C.gold:C.soft,
              fontFamily:"monospace", fontSize:10,
              fontWeight:isActive?700:400,
              whiteSpace:"nowrap", flexShrink:0,
              cursor:"pointer",
            }}>{r.short}</button>
          );
        })}

        {/* Current page indicator */}
        {current && (
          <div style={{ marginLeft:"auto", color:C.soft, fontFamily:"monospace", fontSize:10, flexShrink:0, whiteSpace:"nowrap" }}>
            📍 {current.label}
          </div>
        )}
      </div>
    </div>
  );
}
