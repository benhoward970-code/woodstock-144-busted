/*
Australia-based rough maths + banter.
- AUS standard drink = 10g pure alcohol
- Metabolism rough rule-of-thumb: ~1 standard drink per hour (varies)
- Pure alcohol grams: volume(ml) * ABV * density (0.789 g/mL)

This is NOT medical advice.
*/

function fmt(n, digits = 0){
return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits });
}

const ETHANOL_DENSITY = 0.789; // g/mL
const STD_DRINK_G = 10; // AUS standard drink
const METAB_RATE_SD_PER_H = 1; // rough

function calc(){
const cans = Math.max(1, Number(document.getElementById("cans").value || 144));
const hours = Math.max(1, Number(document.getElementById("hours").value || 8));
const sizeMl = Number(document.getElementById("sizeMl").value || 440);
const abv = Number(document.getElementById("abv").value || 4.8);
const cartonSize = Number(document.getElementById("cartonSize").value || 12);

const totalLiquidL = (cans * sizeMl) / 1000;

const pureEthanolMl = cans * sizeMl * (abv / 100);
const pureAlcoholG = pureEthanolMl * ETHANOL_DENSITY;

const standardDrinks = pureAlcoholG / STD_DRINK_G;

const cansPerHour = cans / hours;
const secondsPerCan = (hours * 3600) / cans;

const metabolizeHours = standardDrinks / METAB_RATE_SD_PER_H;
const cartons = Math.ceil(cans / cartonSize);

const bigRedFlag = standardDrinks >= 20;
const utterlyCooked = standardDrinks >= 60;

return {
cans, hours, sizeMl, abv, cartonSize,
totalLiquidL, pureAlcoholG, standardDrinks,
cansPerHour, secondsPerCan, metabolizeHours,
cartons, bigRedFlag, utterlyCooked
};
}

function renderResults(r){
const results = document.getElementById("results");

const oneEvery = r.secondsPerCan >= 60
? `one can every ${fmt(r.secondsPerCan/60, 1)} minutes`
: `one can every ${fmt(r.secondsPerCan, 0)} seconds`;

const headline =
r.utterlyCooked ? "Verdict: not happening (legend status: fictional)."
: r.bigRedFlag ? "Verdict: extremely unlikely (and seriously dangerous)."
: "Verdict: still very questionable.";

results.innerHTML = `
<div class="card">
<div class="big">${headline}</div>
<div class="muted" style="margin-top:6px;">
Based on ${r.cans} cans in ${r.hours} hours at ${r.abv}% ABV (${r.sizeMl} mL).
</div>
</div>

<div class="card">
<div class="kv"><span>Total liquid</span><span>${fmt(r.totalLiquidL, 2)} L</span></div>
<div class="kv"><span>Estimated pure alcohol</span><span>${fmt(r.pureAlcoholG, 0)} g</span></div>
<div class="kv"><span>Estimated standard drinks (AUS)</span><span>${fmt(r.standardDrinks, 1)}</span></div>
</div>

<div class="card">
<div class="kv"><span>Pace required</span><span>${fmt(r.cansPerHour, 1)} cans/hour</span></div>
<div class="kv"><span>That’s basically</span><span>${oneEvery}</span></div>
<div class="kv"><span>Body “processing time”</span><span>${fmt(r.metabolizeHours, 0)} hours</span></div>
<div class="muted" style="margin-top:6px;">
(Rule-of-thumb ~1 standard drink/hour — varies person to person.)
</div>
</div>
`;
}

function makeCartonEl(title, count, filledCans){
const el = document.createElement("div");
el.className = "carton";
const grid = document.createElement("div");
grid.className = "can-grid";

for (let i=0; i<count; i++){
const c = document.createElement("div");
c.className = "can";
c.style.opacity = i < filledCans ? "1" : "0.18";
grid.appendChild(c);
}

el.innerHTML = `
<div class="carton-top">
<div class="carton-title">${title}</div>
<div class="badge">${count} pack</div>
</div>
`;
el.appendChild(grid);
return el;
}

function renderCartons(r){
const cartonsEl = document.getElementById("cartons");
const cartonCountEl = document.getElementById("cartonCount");

cartonsEl.innerHTML = "";
cartonCountEl.textContent = `You’d need about ${r.cartons} carton(s) of ${r.cartonSize} to reach ${r.cans} cans.`;

const cartonsToShow = Math.min(r.cartons, 6);
let remaining = r.cans;

for (let i=1; i<=cartonsToShow; i++){
const filled = Math.min(r.cartonSize, remaining);
remaining -= filled;

const title = i === cartonsToShow && r.cartons > cartonsToShow
? `Carton ${i} (…plus ${r.cartons - cartonsToShow} more 😭)`
: `Carton ${i}`;

cartonsEl.appendChild(makeCartonEl(title, r.cartonSize, filled));
}
}

function renderFacts(r){
const facts = document.getElementById("facts");
facts.innerHTML = "";

const factsList = [
`To hit ${r.cans} cans in ${r.hours} hours, you’d need to average ${fmt(r.cansPerHour, 1)} cans/hour.`,
`That’s roughly ${fmt(r.secondsPerCan, 0)} seconds per can. No meals. No water. No bathroom breaks. Just vibes (bad ones).`,
`Total liquid: ${fmt(r.totalLiquidL, 2)} L. Your bladder would resign in writing.`,
`Estimated standard drinks (AUS): ~${fmt(r.standardDrinks, 1)}. Even a fraction of that is dangerous.`,
`Using ~1 standard drink/hour, your body would need about ${fmt(r.metabolizeHours, 0)} hours to process it (≈ ${fmt(r.metabolizeHours/24, 1)} days).`,
`If this was true, the empty cans would require: a skip bin, a forklift, and a full investigation.`
];

if (r.secondsPerCan < 90) factsList.push("You wouldn’t be drinking — you’d be speedrunning.");
if (r.standardDrinks > 100) factsList.push("At this point it’s not a night out, it’s a second job with overtime.");

for (const f of factsList){
const li = document.createElement("li");
li.textContent = f;
facts.appendChild(li);
}
}

/* ---------- FUN MOVING CANS ---------- */

function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnFloatingCans(n = 10){
const layer = document.getElementById("floatLayer");
if (!layer) return;

const flavours = ["can-a","can-b","can-c"];
const vw = window.innerWidth;
const vh = window.innerHeight;

for (let i=0; i<n; i++){
const can = document.createElement("div");
can.className = `float-can ${flavours[Math.floor(Math.random()*flavours.length)]}`;

// Position anywhere, slightly off-screen too
const x = rand(-40, vw - 20);
const y = rand(-60, vh - 40);

const dur = rand(6, 12);
const dur2 = rand(7, 14);
const delay = rand(0, 3);

can.style.left = `${x}px`;
can.style.top = `${y}px`;
can.style.animation = `floaty ${dur}s ease-in-out ${delay}s infinite, driftLR ${dur2}s ease-in-out ${delay}s infinite`;

// Click to pop
can.addEventListener("click", () => {
can.style.transition = "transform 160ms ease, opacity 160ms ease";
can.style.transform = "scale(1.4) rotate(12deg)";
can.style.opacity = "0";
setTimeout(() => can.remove(), 170);
});

layer.appendChild(can);

// Keep layer from growing forever
if (layer.childElementCount > 60) {
layer.removeChild(layer.firstElementChild);
}
}
}

function clearFloatingCans(){
const layer = document.getElementById("floatLayer");
if (!layer) return;
layer.innerHTML = "";
}

function roastLine(r){
const lines = [
`Mate… that’s not a “big night”, that’s a full-time job with overtime.`,
`144 cans? That’s not drinking — that’s an industrial process.`,
`If this was true, the empties would need their own suburb.`,
`At ${fmt(r.secondsPerCan,0)} seconds a can, he wasn’t sipping — he was speedrunning.`,
`The only thing that drank 144 Woodstocks in one night is the comment section.`
];
// Choose one that references pace if it's spicy
if (r.secondsPerCan < 90) return lines[3];
return lines[Math.floor(Math.random()*lines.length)];
}

function showRoast(text){
const out = document.getElementById("roastOut");
if (!out) return;
out.style.display = "block";
out.textContent = text;
}

/* ---------- WIRE UP ---------- */

function run(){
const r = calc();
renderResults(r);
renderCartons(r);
renderFacts(r);

// More claim = more chaos
const bonus = Math.min(20, Math.floor(r.cans / 20));
spawnFloatingCans(6 + bonus);
}

document.getElementById("go").addEventListener("click", run);

document.getElementById("spawn").addEventListener("click", () => {
spawnFloatingCans(12);
});

document.getElementById("shake").addEventListener("click", () => {
document.body.classList.remove("shake");
// force reflow
void document.body.offsetWidth;
document.body.classList.add("shake");
spawnFloatingCans(8);
});

document.getElementById("roast").addEventListener("click", () => {
const r = calc();
showRoast(roastLine(r));
spawnFloatingCans(10);
});

// Start with some ambience
spawnFloatingCans(14);
run();

// On resize, keep it looking good
window.addEventListener("resize", () => {
// optional: you can clear + respawn if you want
// clearFloatingCans(); spawnFloatingCans(14);
});
