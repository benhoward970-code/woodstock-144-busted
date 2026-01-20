/*
AUS assumptions (shown in-site as “rough maths + banter”):
- 1 Australian standard drink = 10g pure alcohol. (Australian Dept of Health / NHMRC)
- Rough metabolism rule: body processes ~1 standard drink per hour (varies by person).
Math notes:
- grams of pure alcohol ≈ volume(ml) * (ABV/100) * ethanol density
- ethanol density ~0.789 g/mL at ~20–25°C (common chemistry reference)

This script does NOT give medical advice — it’s a “reality check” calculator.
*/

function fmt(n, digits = 0){
return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits });
}

const ETHANOL_DENSITY = 0.789; // g/mL
const STD_DRINK_G = 10; // AUS standard drink = 10g pure alcohol
const METAB_RATE_SD_PER_H = 1; // rough AUS rule of thumb

function calc(){
const cans = Math.max(1, Number(document.getElementById("cans").value || 144));
const hours = Math.max(1, Number(document.getElementById("hours").value || 8));
const sizeMl = Number(document.getElementById("sizeMl").value || 440);
const abv = Number(document.getElementById("abv").value || 4.8);
const cartonSize = Number(document.getElementById("cartonSize").value || 12);

const totalLiquidL = (cans * sizeMl) / 1000;

// Pure ethanol volume (mL) then convert to grams using density
const pureEthanolMl = cans * sizeMl * (abv / 100);
const pureAlcoholG = pureEthanolMl * ETHANOL_DENSITY;

// Australian standard drinks
const standardDrinks = pureAlcoholG / STD_DRINK_G;

// Pace
const cansPerHour = cans / hours;
const secondsPerCan = (hours * 3600) / cans;

// “Time to process” based on rule-of-thumb metabolism
const metabolizeHours = standardDrinks / METAB_RATE_SD_PER_H;

// Cartons
const cartons = Math.ceil(cans / cartonSize);

// Banter thresholds (still serious):
// 20+ standard drinks is already extreme/dangerous; 60+ is absurdly high.
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
<div class="kv"><span>Time for body to process</span><span>${fmt(r.metabolizeHours, 0)} hours</span></div>
<div class="muted" style="margin-top:6px;">
(Using the rough “~1 standard drink/hour” rule of thumb — varies by person.)
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
`To hit ${r.cans} cans in ${r.hours} hours, you'd need to average ${fmt(r.cansPerHour, 1)} cans per hour.`,
`That’s roughly ${fmt(r.secondsPerCan, 0)} seconds per can. No meals. No breaks. Just constant can-to-mouth behaviour.`,
`Total liquid is ${fmt(r.totalLiquidL, 2)} litres. Your bladder would be writing hate mail by can #10.`,
`Estimated standard drinks (AUS): ~${fmt(r.standardDrinks, 1)}. Even a fraction of that is dangerous.`,
`Using the “~1 standard drink/hour” rule, your body would need about ${fmt(r.metabolizeHours, 0)} hours to process it (that’s ${fmt(r.metabolizeHours/24, 1)} days).`
];

if (r.standardDrinks > 100) factsList.push("At this point it’s not a drinking session, it’s a full-time job with overtime.");
if (r.secondsPerCan < 120) factsList.push("You wouldn’t be drinking — you’d be speedrunning.");
factsList.push("If this story was true, the empties would need their own skip bin and a separate postcode.");

for (const f of factsList){
const li = document.createElement("li");
li.textContent = f;
facts.appendChild(li);
}
}

function run(){
const r = calc();
renderResults(r);
renderCartons(r);
renderFacts(r);
}

document.getElementById("go").addEventListener("click", run);
run();
