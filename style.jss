:root{
--bg0:#060615;
--bg1:#0b0b22;
--card: rgba(255,255,255,0.06);
--line: rgba(255,255,255,0.14);
--text:#eef2ff;
--muted: rgba(238,242,255,0.72);
--accent:#7c5cff;
--accent2:#00e5ff;
--radius: 18px;
}

*{ box-sizing:border-box; }

body{
margin:0;
font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
color: var(--text);
background:
radial-gradient(1200px 800px at 15% 20%, rgba(124,92,255,0.20), transparent 55%),
radial-gradient(1000px 700px at 85% 30%, rgba(0,229,255,0.16), transparent 55%),
linear-gradient(180deg, var(--bg0), var(--bg1));
overflow-x:hidden;

/* Custom cursor: a tiny “can” SVG (original, not a real brand image) */
cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cdefs%3E%3CradialGradient id='g' cx='30%25' cy='20%25'%3E%3Cstop offset='0' stop-color='%2300e5ff' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%237c5cff' stop-opacity='.9'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='10' y='4' width='12' height='24' rx='4' fill='url(%23g)' stroke='white' stroke-opacity='.35'/%3E%3Crect x='11.5' y='7' width='9' height='18' rx='3' fill='rgba(0,0,0,.18)'/%3E%3Ctext x='16' y='18' font-size='10' text-anchor='middle' fill='white' font-family='Arial' font-weight='700'%3EW%3C/text%3E%3C/svg%3E") 16 16, auto;
}

.wrap{
width:min(1100px, 92vw);
margin: 0 auto;
}

.header{
padding: 28px 0 10px;
}

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
background: linear-gradient(135deg, rgba(124,92,255,1), rgba(0,229,255,0.85));
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
radial-gradient(600px 180px at 20% 0%, rgba(124,92,255,0.14), transparent 60%),
radial-gradient(600px 180px at 80% 0%, rgba(0,229,255,0.10), transparent 60%);
pointer-events:none;
}

.panel-inner{
position:relative;
padding: 18px;
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

button{
appearance:none;
border:none;
cursor:pointer;
padding: 12px 14px;
border-radius: 14px;
color: white;
font-weight: 800;
letter-spacing: 0.2px;
background: linear-gradient(135deg, rgba(124,92,255,1), rgba(0,229,255,0.85));
box-shadow: 0 16px 40px rgba(0,0,0,0.35);
transition: transform 120ms ease, filter 120ms ease;
}
button:hover{ transform: translateY(-1px); filter: brightness(1.05); }

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
font-weight: 900;
letter-spacing: 0.2px;
}

.kv{
display:grid;
grid-template-columns: 1fr auto;
gap: 8px;
align-items:baseline;
}
.kv span:last-child{
font-weight: 800;
}

.carton-wrap{ margin-top: 10px; }
.carton-count{
font-weight: 900;
margin-bottom: 10px;
}
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
.carton-title{ font-weight: 900; }
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
background: linear-gradient(135deg, rgba(124,92,255,0.9), rgba(0,229,255,0.75));
position:relative;
}
.can::after{
content:"W";
position:absolute;
inset:0;
display:grid;
place-items:center;
font-size: 12px;
font-weight: 900;
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
