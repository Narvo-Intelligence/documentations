import { useState, useEffect } from "react";

const P = {
  bg: "#FFFCF5", surface: "#FFFFFF", raised: "#FFF3E0", border: "#F0DCC8",
  primary: "#D4520A", primaryMuted: "#FFF1E8", accent: "#0A6847", accentMuted: "#E6F9F0",
  text: "#1A1207", textSec: "#6B5A40", textDim: "#A69880",
  shadow: "0 2px 12px rgba(180,130,80,0.08)", shadowLg: "0 4px 24px rgba(180,130,80,0.12)",
};
const f = { d: "'Clash Display',system-ui,sans-serif", b: "'Satoshi',system-ui,sans-serif", m: "'Geist Mono',monospace" };

const STORIES = [
  { id:1, title:"CBN holds interest rates steady at 27.5% amid inflation concerns", src:"Channels TV", ts:"2:30", tf:"6:15", cat:"Business", cc:"#D4520A", v:true, takeaways:["MPC voted unanimously to maintain benchmark rate","Inflation eased slightly to 31.7% in February","Foreign reserves stable at $36.8 billion"] },
  { id:2, title:"Lagos-Calabar highway phase 2 construction officially begins", src:"Punch NG", ts:"1:45", tf:"5:20", cat:"Politics", cc:"#C2410C", v:true, takeaways:["Phase 2 covers 230km from Aba to Calabar","Federal government allocates ₦1.2 trillion","Expected to create 50,000+ construction jobs"] },
  { id:3, title:"AI startup raises $2M seed round in Lagos tech ecosystem", src:"TechCabal", ts:"2:00", tf:"4:45", cat:"Tech", cc:"#7C3AED", v:true, takeaways:["Largest seed round for AI startup in West Africa","Focus on agricultural supply chain optimisation","Led by Future Africa and Voltron Capital"] },
  { id:4, title:"Dangote refinery hits 500,000 barrels daily production milestone", src:"Vanguard", ts:"2:15", tf:"5:00", cat:"Business", cc:"#D4520A", v:true, takeaways:["Production capacity doubled in 3 months","Diesel export to neighbouring countries begins","Petrol self-sufficiency target by Q4 2026"] },
  { id:5, title:"Super Eagles qualify for 2027 AFCON with dominant win over Ghana", src:"Guardian NG", ts:"1:30", tf:"4:10", cat:"Sports", cc:"#EA580C", v:false, takeaways:["Nigeria wins 3-0 in Abuja","Osimhen scores brace","Ghana eliminated from tournament"] },
  { id:6, title:"New malaria vaccine rollout begins across northern Nigeria states", src:"Premium Times", ts:"2:45", tf:"6:30", cat:"Health", cc:"#0A6847", v:true, takeaways:["R21/Matrix-M vaccine deployed in 7 states","Targets children under 5 years","WHO partnership with NPHCDA"] },
];

const PLAYLISTS = [
  { id:"morning", name:"Your morning", desc:"Today's top stories", count:8, dur:"18 min", icon:"☀", col:"#F59E0B", bg:"#FFF8E1" },
  { id:"business", name:"Business today", desc:"Markets & economy", count:6, dur:"14 min", icon:"📊", col:"#D4520A", bg:"#FFF1E8" },
  { id:"lagos", name:"Lagos update", desc:"Local stories", count:5, dur:"11 min", icon:"🏙", col:"#7C3AED", bg:"#F3E8FF" },
  { id:"catchup", name:"5-min catch-up", desc:"Quick digest", count:3, dur:"5 min", icon:"⚡", col:"#0A6847", bg:"#E6F9F0" },
  { id:"world", name:"World in brief", desc:"Global news", count:6, dur:"15 min", icon:"🌍", col:"#1D4ED8", bg:"#EFF6FF" },
  { id:"deep", name:"Deep dive", desc:"Longer narratives", count:4, dur:"22 min", icon:"🎧", col:"#9333EA", bg:"#F5F3FF" },
];

const RADIO = [
  { name:"Wazobia FM", freq:"95.1", city:"Lagos" },
  { name:"Cool FM", freq:"96.9", city:"Lagos" },
  { name:"BBC Hausa", freq:"—", city:"Global" },
  { name:"Ray Power", freq:"100.5", city:"Abuja" },
];

const Play=({s=18,c="#fff"})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M8 5.14v14l11-7z"/></svg>;
const Pause=({s=18,c="#fff"})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>;
const Skip=({s=16,c})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c||P.textSec}><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14zM16 6h2v12h-2z"/></svg>;
const Bk=({s=16,c})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||P.textSec} strokeWidth="2"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
const Chev=({s=14,c})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||P.textDim} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>;

function StoryCard({ story, onPlay, onPlayFull, onExpand, isPlaying, compact }) {
  return (
    <div style={{ backgroundColor: P.surface, borderRadius: compact?12:16, boxShadow: P.shadow, border:`1px solid ${P.border}`, overflow:"hidden" }}>
      <div style={{ padding: compact?"12px":"16px", display:"flex", gap:compact?10:12, alignItems:"flex-start" }}>
        <button onClick={()=>onPlay(story)} style={{ width:compact?40:48, height:compact?40:48, borderRadius:compact?10:14, backgroundColor: isPlaying?P.primary:P.primaryMuted, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow: isPlaying?"0 2px 8px rgba(212,82,10,0.25)":"none" }}>
          {isPlaying ? <Pause s={compact?14:16} /> : <Play s={compact?14:16} c={P.primary} />}
        </button>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:f.d, fontSize:compact?13:14, fontWeight:600, color:P.text, lineHeight:1.3, letterSpacing:"-0.01em", marginBottom:3 }}>{story.title}</div>
          <div style={{ fontFamily:f.b, fontSize:compact?10:11, color:P.textDim }}>{story.src} · <span style={{color:story.cc,fontWeight:600}}>{story.cat}</span>{story.v && <span style={{color:P.accent,marginLeft:4}}>✓</span>}</div>
        </div>
        <button onClick={()=>onExpand(story)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, flexShrink:0 }}><Chev /></button>
      </div>
      {!compact && <div style={{ padding:"0 16px 12px", display:"flex", gap:8 }}>
        <button onClick={()=>onPlay(story)} style={{ fontFamily:f.b, fontSize:11, fontWeight:600, color:P.primary, backgroundColor:P.primaryMuted, border:"none", padding:"5px 12px", borderRadius:8, cursor:"pointer" }}>▶ Summary ({story.ts})</button>
        <button onClick={()=>onPlayFull(story)} style={{ fontFamily:f.b, fontSize:11, fontWeight:500, color:P.textSec, backgroundColor:P.raised, border:"none", padding:"5px 12px", borderRadius:8, cursor:"pointer" }}>Full story ({story.tf})</button>
      </div>}
    </div>
  );
}

function PlayerBar({ story, playing, setPlaying, onSkip, progress, onExpand, full }) {
  if(!story) return null;
  if(full) return (
    <div style={{ height:72, backgroundColor:P.surface, borderTop:`1px solid ${P.border}`, display:"flex", alignItems:"center", padding:"0 24px", gap:20, boxShadow:"0 -2px 16px rgba(180,130,80,0.06)" }}>
      <button onClick={()=>setPlaying(!playing)} style={{ width:48,height:48,borderRadius:14,backgroundColor:P.primary,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(212,82,10,0.25)", flexShrink:0 }}>
        {playing?<Pause s={20}/>:<Play s={20}/>}
      </button>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:f.d, fontSize:14, fontWeight:600, color:P.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>{story.title}</div>
        <div style={{ fontFamily:f.b, fontSize:11, color:P.textDim, marginTop:1 }}>{story.src} · {story.cat}</div>
        <div style={{ height:3, backgroundColor:P.raised, borderRadius:3, marginTop:6, overflow:"hidden" }}>
          <div style={{ width:`${progress}%`, height:"100%", backgroundColor:P.primary, borderRadius:3, transition:"width 0.15s linear" }}/>
        </div>
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center", flexShrink:0 }}>
        <button onClick={()=>onSkip(-1)} style={{ background:"none",border:"none",cursor:"pointer",transform:"scaleX(-1)" }}><Skip s={18} c={P.textSec}/></button>
        <button onClick={onSkip} style={{ background:"none",border:"none",cursor:"pointer" }}><Skip s={18} c={P.textSec}/></button>
        <button onClick={()=>onExpand(story)} style={{ background:"none",border:"none",cursor:"pointer",padding:2 }}><Chev c={P.textSec}/></button>
      </div>
    </div>
  );
  return (
    <div onClick={()=>onExpand&&onExpand(story)} style={{ height:56, backgroundColor:P.surface, borderTop:`1px solid ${P.border}`, display:"flex", alignItems:"center", padding:"0 12px", gap:10, cursor:"pointer", boxShadow:"0 -2px 12px rgba(180,130,80,0.06)" }}>
      <button onClick={e=>{e.stopPropagation();setPlaying(!playing)}} style={{ width:36,height:36,borderRadius:10,backgroundColor:P.primary,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center", flexShrink:0 }}>
        {playing?<Pause s={14}/>:<Play s={14}/>}
      </button>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ fontFamily:f.b, fontSize:12, fontWeight:600, color:P.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{story.title}</div>
        <div style={{ height:2, backgroundColor:P.raised, borderRadius:2, marginTop:4 }}><div style={{ width:`${progress}%`,height:"100%",backgroundColor:P.primary,borderRadius:2,transition:"width 0.15s linear" }}/></div>
      </div>
      <button onClick={e=>{e.stopPropagation();onSkip()}} style={{ background:"none",border:"none",cursor:"pointer",flexShrink:0 }}><Skip s={16} c={P.textSec}/></button>
    </div>
  );
}

function HomeTab({ stories, cur, setCur, playing, setPlaying, onExpand }) {
  const hour = 9;
  const greet = hour<12?"Good morning":"Good afternoon";
  return (
    <div style={{ padding:"0 16px 16px" }}>
      <div style={{ padding:"16px 0 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:f.d, fontSize:24, fontWeight:600, color:P.text, letterSpacing:"-0.03em", lineHeight:1.15 }}>{greet}, Oga</div>
          <div style={{ fontFamily:f.b, fontSize:12, color:P.textSec, marginTop:2 }}>{playing?"Listening now":"Your stream is ready"}</div>
        </div>
        <div style={{ width:36, height:36, borderRadius:"50%", backgroundColor:P.primaryMuted, border:`2px solid ${P.primary}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:f.d, fontSize:14, fontWeight:600, color:P.primary }}>AA</span>
        </div>
      </div>
      {/* Briefing card */}
      <div style={{ background:`linear-gradient(135deg, ${P.primary}12, ${P.accent}08)`, borderRadius:18, padding:18, marginBottom:16, border:`1px solid ${P.border}` }}>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <button onClick={()=>{setCur(0);setPlaying(true)}} style={{ width:52,height:52,borderRadius:16,backgroundColor:P.primary,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(212,82,10,0.25)", flexShrink:0 }}>
            <Play s={22}/>
          </button>
          <div>
            <div style={{ fontFamily:f.d, fontSize:16, fontWeight:600, color:P.text, letterSpacing:"-0.02em" }}>Morning briefing</div>
            <div style={{ fontFamily:f.b, fontSize:11, color:P.textSec, marginTop:2 }}>5 stories · 12 min · Yoruba</div>
          </div>
        </div>
      </div>
      {/* Story feed */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {stories.map((s,i)=>(
          <StoryCard key={s.id} story={s} isPlaying={cur===i&&playing} onPlay={()=>{setCur(i);setPlaying(true)}} onPlayFull={()=>{setCur(i);setPlaying(true)}} onExpand={onExpand} />
        ))}
      </div>
      {/* Playlist chips */}
      <div style={{ fontFamily:f.d, fontSize:15, fontWeight:600, color:P.text, margin:"20px 0 10px", letterSpacing:"-0.01em" }}>Playlists</div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6 }}>
        {PLAYLISTS.slice(0,4).map(pl=>(
          <div key={pl.id} style={{ minWidth:110, backgroundColor:pl.bg, borderRadius:14, padding:12, cursor:"pointer", flexShrink:0 }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{pl.icon}</div>
            <div style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:pl.col }}>{pl.name}</div>
            <div style={{ fontFamily:f.b, fontSize:10, color:P.textDim, marginTop:1 }}>{pl.dur}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowseTab({ stories, cur, setCur, playing, setPlaying, onExpand }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Business","Politics","Tech","Sports","Health"];
  const filtered = filter==="All"?stories:stories.filter(s=>s.cat===filter);
  return (
    <div style={{ padding:"0 16px 16px" }}>
      <div style={{ padding:"16px 0 12px" }}>
        <div style={{ fontFamily:f.d, fontSize:20, fontWeight:600, color:P.text, letterSpacing:"-0.02em" }}>Browse</div>
      </div>
      <div style={{ backgroundColor:P.surface, borderRadius:10, border:`1px solid ${P.border}`, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ color:P.textDim, fontSize:14 }}>🔍</span>
        <span style={{ fontFamily:f.b, fontSize:12, color:P.textDim }}>Find a story</span>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:2 }}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{ fontFamily:f.b, fontSize:11, fontWeight:600, padding:"5px 14px", borderRadius:20, border:"none", cursor:"pointer", flexShrink:0, backgroundColor:filter===c?P.primary:P.surface, color:filter===c?"#fff":P.textSec, boxShadow:filter===c?"none":`inset 0 0 0 1px ${P.border}` }}>{c}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map((s,i)=>{
          const ri = stories.indexOf(s);
          return <StoryCard key={s.id} story={s} isPlaying={cur===ri&&playing} onPlay={()=>{setCur(ri);setPlaying(true)}} onPlayFull={()=>{setCur(ri);setPlaying(true)}} onExpand={onExpand}/>;
        })}
      </div>
    </div>
  );
}

function PlaylistsTab({ setCur, setPlaying }) {
  return (
    <div style={{ padding:"0 16px 16px" }}>
      <div style={{ padding:"16px 0 12px" }}>
        <div style={{ fontFamily:f.d, fontSize:20, fontWeight:600, color:P.text, letterSpacing:"-0.02em" }}>Playlists</div>
      </div>
      <div style={{ background:`linear-gradient(135deg, ${P.primary}15, ${P.accent}10)`, borderRadius:18, padding:20, marginBottom:16, border:`1px solid ${P.border}` }}>
        <div style={{ fontSize:24, marginBottom:6 }}>☀</div>
        <div style={{ fontFamily:f.d, fontSize:18, fontWeight:600, color:P.text, letterSpacing:"-0.02em" }}>Your morning</div>
        <div style={{ fontFamily:f.b, fontSize:12, color:P.textSec, margin:"4px 0 14px" }}>8 stories · 18 min · Updated 5:00 AM</div>
        <button onClick={()=>{setCur(0);setPlaying(true)}} style={{ fontFamily:f.d, fontSize:13, fontWeight:600, color:"#fff", backgroundColor:P.primary, border:"none", padding:"10px 24px", borderRadius:12, cursor:"pointer", boxShadow:"0 4px 14px rgba(212,82,10,0.25)" }}>Oya, Play</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {PLAYLISTS.slice(1).map(pl=>(
          <div key={pl.id} style={{ backgroundColor:P.surface, borderRadius:14, padding:14, cursor:"pointer", border:`1px solid ${P.border}`, boxShadow:P.shadow }}>
            <div style={{ fontSize:20, marginBottom:6 }}>{pl.icon}</div>
            <div style={{ fontFamily:f.d, fontSize:13, fontWeight:600, color:P.text, letterSpacing:"-0.01em" }}>{pl.name}</div>
            <div style={{ fontFamily:f.b, fontSize:10, color:P.textDim, marginTop:2 }}>{pl.desc}</div>
            <div style={{ fontFamily:f.m, fontSize:9, color:P.textDim, marginTop:6 }}>{pl.count} stories · {pl.dur}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily:f.d, fontSize:15, fontWeight:600, color:P.text, margin:"20px 0 10px" }}>Live radio</div>
      {RADIO.map((r,i)=>(
        <div key={r.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:i<RADIO.length-1?`1px solid ${P.border}`:"none" }}>
          <div style={{ width:36,height:36,borderRadius:10,backgroundColor:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>📻</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:f.b, fontSize:12, fontWeight:600, color:P.text }}>{r.name}</div>
            <div style={{ fontFamily:f.m, fontSize:10, color:P.textDim }}>{r.freq} · {r.city}</div>
          </div>
          <div style={{ width:28,height:28,borderRadius:8,backgroundColor:P.raised,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><Play s={12} c={P.primary}/></div>
        </div>
      ))}
    </div>
  );
}

function YouTab() {
  return (
    <div style={{ padding:"0 16px 16px" }}>
      <div style={{ padding:"16px 0 12px" }}>
        <div style={{ fontFamily:f.d, fontSize:20, fontWeight:600, color:P.text, letterSpacing:"-0.02em" }}>You</div>
      </div>
      <div style={{ backgroundColor:P.surface, borderRadius:14, padding:16, border:`1px solid ${P.border}`, boxShadow:P.shadow, marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:48,height:48,borderRadius:"50%",backgroundColor:P.primaryMuted,border:`2px solid ${P.primary}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:f.d, fontSize:18, fontWeight:600, color:P.primary }}>AA</span>
          </div>
          <div><div style={{ fontFamily:f.d, fontSize:15, fontWeight:600, color:P.text }}>Ajibola</div><div style={{ fontFamily:f.b, fontSize:11, color:P.textDim }}>Yoruba · Lagos</div></div>
        </div>
      </div>
      <div style={{ fontFamily:f.d, fontSize:14, fontWeight:600, color:P.text, marginBottom:8 }}>Voice & language</div>
      <div style={{ display:"flex", gap:6, marginBottom:16, overflowX:"auto" }}>
        {["Yoruba","Pidgin","Hausa","Igbo","English"].map((l,i)=>(
          <div key={l} style={{ minWidth:70, textAlign:"center", padding:"10px 6px", borderRadius:12, cursor:"pointer", backgroundColor:i===0?P.primaryMuted:P.surface, border:i===0?`2px solid ${P.primary}`:`1px solid ${P.border}` }}>
            <div style={{ fontFamily:f.b, fontSize:11, fontWeight:600, color:i===0?P.primary:P.text }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily:f.d, fontSize:14, fontWeight:600, color:P.text, marginBottom:8 }}>Recently played</div>
      {STORIES.slice(0,3).map((s,i)=>(
        <div key={s.id} style={{ display:"flex", gap:8, alignItems:"center", padding:"8px 0", borderBottom:i<2?`1px solid ${P.border}`:"none" }}>
          <div style={{ width:28,height:28,borderRadius:7,backgroundColor:P.raised,display:"flex",alignItems:"center",justifyContent:"center" }}><Play s={10} c={P.textDim}/></div>
          <div style={{ flex:1 }}><div style={{ fontFamily:f.b, fontSize:11, fontWeight:600, color:P.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.title}</div></div>
        </div>
      ))}
      {["Notifications","Appearance","Offline & storage","Account"].map(item=>(
        <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${P.border}`, cursor:"pointer" }}>
          <span style={{ fontFamily:f.b, fontSize:13, color:P.text }}>{item}</span>
          <span style={{ color:P.textDim }}>›</span>
        </div>
      ))}
    </div>
  );
}

function ExpandedStory({ story, onClose, setPlaying }) {
  if(!story) return null;
  return (
    <div style={{ position:"absolute", inset:0, backgroundColor:P.bg, zIndex:50, overflowY:"auto" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderBottom:`1px solid ${P.border}` }}>
        <button onClick={onClose} style={{ fontFamily:f.b, fontSize:13, fontWeight:600, color:P.primary, background:"none", border:"none", cursor:"pointer" }}>← Back</button>
        <div style={{ display:"flex", gap:10 }}><Bk s={18} c={P.textSec}/><span style={{ fontSize:16, color:P.textSec }}>🔗</span></div>
      </div>
      <div style={{ padding:16 }}>
        <div style={{ display:"flex", gap:6, marginBottom:10 }}>
          <span style={{ fontSize:10, fontWeight:600, color:story.cc, backgroundColor:story.cc+"15", padding:"2px 8px", borderRadius:6 }}>{story.cat}</span>
          {story.v && <span style={{ fontSize:10, fontWeight:600, color:P.accent, backgroundColor:P.accentMuted, padding:"2px 8px", borderRadius:6 }}>Verified</span>}
        </div>
        <h1 style={{ fontFamily:f.d, fontSize:22, fontWeight:600, color:P.text, lineHeight:1.25, letterSpacing:"-0.02em", margin:"0 0 6px" }}>{story.title}</h1>
        <div style={{ fontFamily:f.b, fontSize:11, color:P.textDim, marginBottom:16 }}>{story.src} · {story.ts} summary · {story.tf} full</div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          <button onClick={()=>setPlaying(true)} style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:"#fff", backgroundColor:P.primary, border:"none", padding:"9px 16px", borderRadius:10, cursor:"pointer", boxShadow:"0 2px 8px rgba(212,82,10,0.2)", display:"flex", alignItems:"center", gap:5 }}><Play s={12}/> Summary ({story.ts})</button>
          <button style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:P.primary, backgroundColor:P.primaryMuted, border:`1.5px solid ${P.primary}`, padding:"9px 16px", borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}><Play s={12} c={P.primary}/> Full ({story.tf})</button>
        </div>
        <div style={{ backgroundColor:P.accentMuted, borderRadius:12, padding:14, marginBottom:16, borderLeft:`3px solid ${P.accent}` }}>
          <div style={{ fontFamily:f.d, fontSize:13, fontWeight:600, color:P.accent, marginBottom:8 }}>Key takeaways</div>
          {story.takeaways.map((t,i)=>(<div key={i} style={{ fontFamily:f.b, fontSize:12, color:P.text, lineHeight:1.6, padding:"3px 0 3px 10px", display:"flex", gap:6 }}><span style={{ color:P.accent, fontWeight:700, flexShrink:0 }}>·</span>{t}</div>))}
        </div>
        <div style={{ fontFamily:f.d, fontSize:15, fontWeight:600, color:P.text, marginBottom:8 }}>The full story</div>
        <div style={{ fontFamily:f.b, fontSize:13, color:P.text, lineHeight:1.7, marginBottom:14 }}>The Central Bank of Nigeria has opted to maintain its benchmark interest rate at 27.5%, signalling continued caution as the economy navigates persistent inflationary pressures. The decision, announced following the latest Monetary Policy Committee meeting in Abuja, was unanimous.</div>
        <div style={{ fontFamily:f.b, fontSize:13, color:P.text, lineHeight:1.7, marginBottom:16 }}>Governor Olayemi Cardoso noted that while inflation has shown marginal improvement, easing from 33.2% in January to 31.7% in February, the rate remains above target. "We are seeing early signs of stabilisation, but it would be premature to ease monetary conditions."</div>
        <div style={{ backgroundColor:P.surface, borderRadius:12, padding:14, border:`1px solid ${P.border}` }}>
          <div style={{ fontFamily:f.d, fontSize:11, fontWeight:600, color:P.accent, marginBottom:6, letterSpacing:"0.05em" }}>TRUTH TAG</div>
          <div style={{ fontFamily:f.b, fontSize:11, color:P.textSec, lineHeight:1.5 }}>Sources: Channels TV, Vanguard, Nairametrics · Fact-checked via Google Fact Check · Confidence: 97% · 3 sources · Translated: Yoruba, Pidgin, Hausa, Igbo, English</div>
        </div>
      </div>
    </div>
  );
}

function DesktopView({ stories, cur, setCur, playing, setPlaying, progress, onSkip, expanded, setExpanded }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", backgroundColor:P.bg }}>
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Sidebar */}
        <div style={{ width:200, borderRight:`1px solid ${P.border}`, padding:16, overflowY:"auto", flexShrink:0 }}>
          <div style={{ fontFamily:f.d, fontSize:20, fontWeight:600, color:P.primary, marginBottom:20, letterSpacing:"-0.02em" }}>narvo</div>
          {["Home","Browse","Search"].map((n,i)=>(<div key={n} style={{ fontFamily:f.b, fontSize:13, fontWeight:i===0?600:400, color:i===0?P.primary:P.textSec, padding:"8px 10px", borderRadius:8, cursor:"pointer", backgroundColor:i===0?P.primaryMuted:"transparent", marginBottom:2 }}>{n}</div>))}
          <div style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:P.textDim, margin:"20px 0 8px", letterSpacing:"0.05em", textTransform:"uppercase" }}>Playlists</div>
          {PLAYLISTS.map(pl=>(<div key={pl.id} style={{ fontFamily:f.b, fontSize:12, color:P.textSec, padding:"6px 10px", cursor:"pointer", borderRadius:6 }}>{pl.icon} {pl.name}</div>))}
          <div style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:P.textDim, margin:"20px 0 8px", letterSpacing:"0.05em", textTransform:"uppercase" }}>Radio</div>
          {RADIO.slice(0,3).map(r=>(<div key={r.name} style={{ fontFamily:f.b, fontSize:12, color:P.textSec, padding:"6px 10px", cursor:"pointer", borderRadius:6 }}>📻 {r.name}</div>))}
        </div>
        {/* Center feed */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", maxWidth:600 }}>
          <div style={{ fontFamily:f.d, fontSize:26, fontWeight:600, color:P.text, letterSpacing:"-0.03em", marginBottom:4 }}>Good morning, Oga</div>
          <div style={{ fontFamily:f.b, fontSize:13, color:P.textSec, marginBottom:20 }}>{playing?"Listening now":"Your stream is ready"}</div>
          {/* Briefing */}
          <div style={{ background:`linear-gradient(135deg, ${P.primary}12, ${P.accent}08)`, borderRadius:16, padding:16, marginBottom:16, border:`1px solid ${P.border}`, display:"flex", gap:14, alignItems:"center" }}>
            <button onClick={()=>{setCur(0);setPlaying(true)}} style={{ width:48,height:48,borderRadius:14,backgroundColor:P.primary,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(212,82,10,0.25)",flexShrink:0 }}><Play s={20}/></button>
            <div><div style={{ fontFamily:f.d, fontSize:15, fontWeight:600, color:P.text }}>Morning briefing</div><div style={{ fontFamily:f.b, fontSize:11, color:P.textSec, marginTop:2 }}>5 stories · 12 min · Yoruba</div></div>
          </div>
          {stories.map((s,i)=>(<div key={s.id} style={{ marginBottom:10 }}><StoryCard story={s} isPlaying={cur===i&&playing} onPlay={()=>{setCur(i);setPlaying(true);setExpanded(s)}} onPlayFull={()=>{setCur(i);setPlaying(true);setExpanded(s)}} onExpand={setExpanded} compact={false}/></div>))}
        </div>
        {/* Right panel */}
        <div style={{ width:340, borderLeft:`1px solid ${P.border}`, overflowY:"auto", flexShrink:0 }}>
          {expanded ? (
            <div style={{ padding:20 }}>
              <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                <span style={{ fontSize:10, fontWeight:600, color:expanded.cc, backgroundColor:expanded.cc+"15", padding:"2px 8px", borderRadius:6 }}>{expanded.cat}</span>
                {expanded.v && <span style={{ fontSize:10, fontWeight:600, color:P.accent, backgroundColor:P.accentMuted, padding:"2px 8px", borderRadius:6 }}>Verified</span>}
              </div>
              <h2 style={{ fontFamily:f.d, fontSize:20, fontWeight:600, color:P.text, lineHeight:1.25, letterSpacing:"-0.02em", margin:"0 0 6px" }}>{expanded.title}</h2>
              <div style={{ fontFamily:f.b, fontSize:11, color:P.textDim, marginBottom:14 }}>{expanded.src} · {expanded.ts} summary · {expanded.tf} full</div>
              <div style={{ display:"flex", gap:8, marginBottom:18 }}>
                <button onClick={()=>{setCur(stories.indexOf(expanded));setPlaying(true)}} style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:"#fff", backgroundColor:P.primary, border:"none", padding:"8px 16px", borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}><Play s={12}/> Summary</button>
                <button style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:P.primary, backgroundColor:P.primaryMuted, border:`1.5px solid ${P.primary}`, padding:"8px 16px", borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}><Play s={12} c={P.primary}/> Full</button>
              </div>
              <div style={{ backgroundColor:P.accentMuted, borderRadius:12, padding:14, marginBottom:16, borderLeft:`3px solid ${P.accent}` }}>
                <div style={{ fontFamily:f.d, fontSize:12, fontWeight:600, color:P.accent, marginBottom:6 }}>Key takeaways</div>
                {expanded.takeaways.map((t,i)=>(<div key={i} style={{ fontFamily:f.b, fontSize:12, color:P.text, lineHeight:1.6, padding:"2px 0 2px 10px", display:"flex", gap:6 }}><span style={{ color:P.accent, fontWeight:700, flexShrink:0 }}>·</span>{t}</div>))}
              </div>
              <div style={{ fontFamily:f.d, fontSize:14, fontWeight:600, color:P.text, marginBottom:6 }}>The full story</div>
              <div style={{ fontFamily:f.b, fontSize:13, color:P.text, lineHeight:1.7, marginBottom:12 }}>The Central Bank of Nigeria has opted to maintain its benchmark interest rate at 27.5%, signalling continued caution amid persistent inflationary pressures.</div>
              <div style={{ fontFamily:f.b, fontSize:13, color:P.text, lineHeight:1.7, marginBottom:14 }}>Governor Cardoso noted marginal improvement in inflation figures but said it would be premature to ease monetary conditions at this juncture.</div>
              <div style={{ backgroundColor:P.surface, borderRadius:12, padding:12, border:`1px solid ${P.border}` }}>
                <div style={{ fontFamily:f.d, fontSize:10, fontWeight:600, color:P.accent, marginBottom:4, letterSpacing:"0.05em" }}>TRUTH TAG</div>
                <div style={{ fontFamily:f.b, fontSize:10, color:P.textSec, lineHeight:1.5 }}>Channels TV, Vanguard, Nairametrics · 97% confidence · 3 sources</div>
              </div>
            </div>
          ) : (
            <div style={{ padding:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12, opacity:0.3 }}>📰</div>
              <div style={{ fontFamily:f.b, fontSize:13, color:P.textDim }}>Click a story to read it here</div>
            </div>
          )}
        </div>
      </div>
      {/* Desktop player bar */}
      <PlayerBar story={stories[cur]} playing={playing} setPlaying={setPlaying} onSkip={()=>setCur(c=>(c+1)%stories.length)} progress={progress} onExpand={setExpanded} full={true}/>
    </div>
  );
}

export default function NarvoPrototypeV2() {
  const [mode, setMode] = useState("mobile");
  const [tab, setTab] = useState("home");
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [progress, setProgress] = useState(28);

  useEffect(()=>{
    if(!playing) return;
    const iv = setInterval(()=>setProgress(p=>p>=100?(setCur(c=>(c+1)%STORIES.length),0):p+0.4),150);
    return ()=>clearInterval(iv);
  },[playing]);

  const tabs = [{id:"home",label:"Home",icon:"🏠"},{id:"browse",label:"Browse",icon:"📰"},{id:"playlists",label:"Playlists",icon:"📋"},{id:"you",label:"You",icon:"👤"}];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 0", backgroundColor:"#0A0C10", minHeight:"100vh" }}>
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>

      {/* Mode toggle */}
      <div style={{ display:"flex", gap:4, marginBottom:16, backgroundColor:"#1A1E2A", borderRadius:10, padding:3 }}>
        {["mobile","desktop"].map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{ fontFamily:f.b, fontSize:12, fontWeight:600, padding:"6px 20px", borderRadius:8, border:"none", cursor:"pointer", backgroundColor:mode===m?"#F0F2F5":"transparent", color:mode===m?"#0A0C10":"#5A6478", textTransform:"capitalize" }}>{m}</button>
        ))}
      </div>

      {mode==="mobile" ? (
        <div style={{ width:375, height:812, backgroundColor:P.bg, borderRadius:40, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", position:"relative", display:"flex", flexDirection:"column", border:"4px solid #1A1E2A" }}>
          {/* Status bar */}
          <div style={{ height:48, backgroundColor:P.bg, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 28px 6px", flexShrink:0 }}>
            <span style={{ fontFamily:f.b, fontSize:14, fontWeight:600, color:P.text }}>9:41</span>
            <div style={{ display:"flex", gap:4 }}><div style={{ width:16,height:10,borderRadius:2,border:`1px solid ${P.textDim}`,opacity:0.4 }}/></div>
          </div>
          {/* Content */}
          <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", position:"relative" }}>
            {tab==="home" && <HomeTab stories={STORIES} cur={cur} setCur={setCur} playing={playing} setPlaying={setPlaying} onExpand={setExpanded}/>}
            {tab==="browse" && <BrowseTab stories={STORIES} cur={cur} setCur={setCur} playing={playing} setPlaying={setPlaying} onExpand={setExpanded}/>}
            {tab==="playlists" && <PlaylistsTab setCur={setCur} setPlaying={setPlaying}/>}
            {tab==="you" && <YouTab/>}
            <ExpandedStory story={expanded} onClose={()=>setExpanded(null)} setPlaying={setPlaying}/>
          </div>
          {/* Player bar */}
          {playing && !expanded && <PlayerBar story={STORIES[cur]} playing={playing} setPlaying={setPlaying} onSkip={()=>{setCur(c=>(c+1)%STORIES.length);setProgress(0)}} progress={progress}/>}
          {/* Bottom nav */}
          <div style={{ height:76, backgroundColor:P.surface, borderTop:`1px solid ${P.border}`, display:"flex", alignItems:"flex-start", justifyContent:"space-around", paddingTop:6, flexShrink:0 }}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id);setExpanded(null)}} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 0", minWidth:56 }}>
                <div style={{ width:26,height:26,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:tab===t.id?P.primaryMuted:"transparent", fontSize:14 }}>{t.icon}</div>
                <span style={{ fontFamily:f.b, fontSize:9, fontWeight:tab===t.id?700:400, color:tab===t.id?P.primary:P.textDim }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width:"100%", maxWidth:1100, height:700, backgroundColor:P.bg, borderRadius:16, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", border:"3px solid #1A1E2A" }}>
          <DesktopView stories={STORIES} cur={cur} setCur={setCur} playing={playing} setPlaying={setPlaying} progress={progress} onSkip={()=>{setCur(c=>(c+1)%STORIES.length);setProgress(0)}} expanded={expanded} setExpanded={setExpanded}/>
        </div>
      )}
    </div>
  );
}
