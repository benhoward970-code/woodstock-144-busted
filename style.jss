:root{
--bg0:#060615;
--bg1:#0b0b22;
--card: rgba(255,255,255,0.06);
--line: rgba(255,255,255,0.14);
--text:#eef2ff;
--muted: rgba(238,242,255,0.74);

/* “Woodstock-ish” party palette (not brand-accurate) */
--whiskey:#ffb020;
--cola:#00e5ff;
--berry:#7c5cff;
--lime:#6bff95;

--radius: 18px;
}

*{ box-sizing:border-box; }

body{
margin:0;
font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
color: var(--text);
min-height:100vh;
overflow-x:hidden;

/* Party glow background */
background:
radial-gradient(1200px 800px at 10% 20%, rgba(255,176,32,0.16), transparent 55%),
radial-gradient(900px 700px at 85% 25%, rgba(0,229,255,0.14), transparent 55%),
radial-gradient(900px 700px at 50% 80%, rgba(124,92,255,0.12), transparent 55%),
linear-gradient(180deg, var(--bg0), var(--bg1));
}

/* Bubble shimmer overlay */
body::before{
content:"";
position:fixed;
inset:-200px;
pointer-events:none;
background:
radial-gradient(circle at 12% 30%, rgba(0,229,255,0.12) 0 4px, transparent 5px),
radial-gradient(circle at 22% 70%, rgba(255,176,32,0.12) 0 3px, transparent 4px),
radial-gradient(circle at 74% 25%, rgba(124,92,255,0.12) 0 5px, transparent 6px),
radial-gradient(circle at 88% 64%, rgba(107,255,149,0.10) 0 3px, transparent 4px),
radial-gradient(circle at 55% 45%, rgba(255,255,255,0.06) 0 2px, transparent 3px);
opacity: 0.9;
animation: drift 18s linear infinite;
}

@keyframes drift{
0%{ transform: translate3d(0,0,0) rotate(0deg); }
100%{ transform: translate3d(40px, -30px, 0) rotate(6deg); }
}

/* Optional “shake” animation */
.shake{
animation: shake 600ms ease;
}
@keyframes shake{
0%,100%{ transform: translateX(0); }
10%{ transform: translateX(-8px) rotate(-0.3deg); }
30%{ transform: translateX(6px) rotate(0.3deg); }
50%{ transform: translateX(-5px) rotate(-0.2deg); }
70%{ transform: translateX(4px) rotate(0.2deg); }
90%{ transform: translateX(-2px); }
}

.wrap{
width:min(1100px, 92vw);
margin: 0 auto;
position:relative;
z-index: 2;
}

/* Floating cans layer */
.float-layer{
position:fixed;
inset:0;
pointer-events:none; /* cans individually will enable clicks */
z-index: 1;
}

/* Stylised can (original art, not a logo) */
.float-can{
position:absolute;
width: 42px;
height: 84px;
border-radius: 16px;
border: 1px solid rgba(255,255,255,0.22);
background:
linear-gradient(135deg, rgba(255,176,32,0.95), rgba(0,229,255,0.80));
box-shadow: 0 18px 60px rgba(0,0,0,0.45);
pointer-events:auto; /* clickable */
cursor: pointer;
transform: translate3d(0,0,0);
overflow:hidden;
}

.float-can::before{
/* top rim */
content:"";
position:absolute;
left:8px; right:8px; top:8px;
height: 8px;
border-radius: 999px;
background: rgba(255,255,255,0.20);
}

.float-can::after{
content:"W";
position:absolute;
inset:0;
display:grid;
place-items:center;
font-weight: 950;
letter-spacing: 1px;
color: rgba(255,255,255,0.92);
text-shadow: 0 2px 18px rgba(0,0,0,0.45);
font-size: 22px;
opacity: 0.9;
}

/* Different “flavours” */
.can-a{ background: linear-gradient(135deg, rgba(255,176,32,0.95), rgba(124,92,255,0.80)); }
.can-b{ background: linear-gradient(135deg, rgba(0,229,255,0.90), rgba(107,255,149,0.70)); }
.can-c{ background: linear-gradient(135deg, rgba(124,92,255,0.90), rgba(255,176,32,0.75)); }

@keyframes floaty{
0% { transform: translate3d(0,0,0) rotate(0deg); }
50% { transform: translate3d(0,-26px,0) rotate(6deg); }
100% { transform: translate3d(0,0,0) rotate(0deg); }
}
@keyframes driftLR{
0%{ margin-left: 0px; }
50%{ margin-left: 40px; }
100%{ margin-left: 0px; }
}

.header{ padding: 28px 0 10px; }

.brand{
display:flex;
gap:14px;
align-items:center;
}

.logo{
width:52px; height:52px;
border-radius: 16px;
display:grid;
place-items:center;
background: linear-gradient(135deg, rgba(255,176,32,1), rgba(0,229,255,0.85));
box-shadow: 0 18px 50px rgba(0,0,0,0.35);
border: 1px solid rgba(255,255,255,0.18);
font-size: 24px;
}

h1{ margin:0; font-size: 24px; }
.sub{ margin: 4px 0 0; color: var(--muted); }

.pill-row{
display:flex;
gap:8px;
flex-wrap:wrap;
margin-top: 14px;
}
.pill{
padding: 6px 10px;
border-radius: 999px;
border: 1px solid rgba(255,255,255,0.14);
background: rgba(255,255,255,0.06);
font-size: 13px;
color: rgba(255,255,255,0.9);
}

.grid{
display:grid;
grid-template-columns: 1.05fr 0.95fr;
gap: 16px;
padding: 16px 0 22px;
}
@media (max-width: 920px){
.grid{ grid-template-columns: 1fr; }
}

.panel{
background: var(--card);
border: 1px solid var(--line);
border-radius: var(--radius);
box-shadow: 0 30px 90px rgba(0,0,0,0.45);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
overflow:hidden;
position:relative;
}

.panel::before{
content:"";
position:absolute;
inset:0;
background:
radial-gradient(700px 220px at 20% 0%, rgba(255,176,32,0.12), transparent 60%),
radial-gradient(700px 220px at 80% 0%, rgba(0,229,255,0.10), transparent 60%);
pointer-events:none;
}

.panel-inner{
position:relative;
padding: 18px;
}

.panel-top{
display:flex;
align-items:center;
justify-content:space-between;
gap: 10px;
}

.mini-actions{
display:flex;
gap: 8px;
flex-wrap: wrap;
}

h2{ margin: 0 0 10px; font-size: 18px; }
h3{ margin: 18px 0 10px; font-size: 16px; }
.mt{ margin-top: 18px; }
.muted{ color: var(--muted); }

.note{
border: 1px solid rgba(255,255,255,0.14);
background: rgba(0,0,0,0.22);
border-radius: 14px;
padding: 10px 12px;
font-size: 13px;
color: rgba(255,255,255,0.85);
line-height: 1.35;
}

.form{
margin-top: 14px;
display:grid;
gap: 12px;
}

label{
display:grid;
gap: 6px;
font-size: 13px;
color: rgba(255,255,255,0.85);
}

input, select{
width: 100%;
padding: 12px 12px;
border-radius: 14px;
border: 1px solid rgba(255,255,255,0.16);
background: rgba(0,0,0,0.20);
color: var(--text);
outline:none;
}

.row{
display:grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
}
@media (max-width: 520px){
.row{ grid-template-columns: 1fr; }
}

.row2{
display:grid;
grid-template-columns: 1fr 1fr;
gap: 10px;
}
@media (max-width: 520px){
.row2{ grid-template-columns: 1fr; }
}

button{
appearance:none;
border:none;
cursor:pointer;
padding: 12px 14px;
border-radius: 14px;
color: white;
font-weight: 900;
letter-spacing: 0.2px;
background: linear-gradient(135deg, rgba(255,176,32,1), rgba(0,229,255,0.85));
box-shadow: 0 16px 40px rgba(0,0,0,0.35);
transition: transform 120ms ease, filter 120ms ease;
}
button:hover{ transform: translateY(-1px); filter: brightness(1.06); }

button.ghost{
background: rgba(255,255,255,0.08);
border: 1px solid rgba(255,255,255,0.14);
box-shadow:none;
font-weight: 800;
}

button.danger{
background: linear-gradient(135deg, rgba(255,107,107,1), rgba(255,176,32,0.95));
}

.results{
margin-top: 14px;
display:grid;
gap: 10px;
}

.card{
border: 1px solid rgba(255,255,255,0.14);
border-radius: 16px;
padding: 12px;
background: rgba(0,0,0,0.18);
}

.big{
font-size: 22px;
font-weight: 950;
letter-spacing: 0.2px;
}

.kv{
display:grid;
grid-template-columns: 1fr auto;
gap: 8px;
align-items:baseline;
}
.kv span:last-child{
font-weight: 900;
}

.roast-out{
margin-top: 12px;
font-weight: 850;
color: rgba(255,255,255,0.92);
padding: 12px;
border-radius: 16px;
border: 1px solid rgba(255,255,255,0.14);
background: rgba(0,0,0,0.20);
display:none;
}

.carton-wrap{ margin-top: 10px; }
.carton-count{ font-weight: 950; margin-bottom: 10px; }
.cartons{
display:grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
}
@media (max-width: 520px){
.cartons{ grid-template-columns: 1fr; }
}

.carton{
border: 1px solid rgba(255,255,255,0.14);
border-radius: 16px;
background: rgba(0,0,0,0.18);
padding: 10px;
}
.carton-top{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom: 8px;
}
.carton-title{ font-weight: 950; }
.badge{
font-size: 12px;
padding: 5px 9px;
border-radius: 999px;
border: 1px solid rgba(255,255,255,0.14);
background: rgba(255,255,255,0.06);
color: rgba(255,255,255,0.9);
}

.can-grid{
display:grid;
grid-template-columns: repeat(6, 1fr);
gap: 6px;
}
.can{
height: 26px;
border-radius: 8px;
border: 1px solid rgba(255,255,255,0.22);
background: linear-gradient(135deg, rgba(255,176,32,0.95), rgba(0,229,255,0.75));
position:relative;
overflow:hidden;
}
.can::after{
content:"W";
position:absolute;
inset:0;
display:grid;
place-items:center;
font-size: 12px;
font-weight: 950;
color: rgba(255,255,255,0.95);
text-shadow: 0 2px 10px rgba(0,0,0,0.35);
}

.facts{
margin: 0;
padding-left: 18px;
color: rgba(255,255,255,0.9);
}
.facts li{ margin: 8px 0; color: rgba(255,255,255,0.86); }

.footer{
padding: 6px 0 26px;
display:flex;
justify-content:space-between;
gap: 10px;
flex-wrap:wrap;
color: rgba(255,255,255,0.85);
}
.footer-note{
margin-top: 14px;
color: rgba(255,255,255,0.68);
font-size: 13px;
border-top: 1px solid rgba(255,255,255,0.12);
padding-top: 12px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce){
body::before{ animation:none; }
.float-can{ animation:none !important; }
.shake{ animation:none; }
}
