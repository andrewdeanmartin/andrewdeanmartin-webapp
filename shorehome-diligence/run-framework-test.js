#!/usr/bin/env node
/**
 * Test the financial framework with research-based ballpark numbers.
 * Same formulas as financial-framework.html.
 */

const MULT = { sdeLow: 1.61, sdeMid: 3.06, sdeHigh: 4.41, revLow: 0.23, revMid: 0.5, revHigh: 0.86 };

function run(revenue, cogs, labor, overhead, ownerComp, addbacks, debtService, stressPct = 0) {
  const gross = revenue - cogs;
  const grossPct = revenue ? gross / revenue : 0;
  const opEx = labor + overhead;
  const sde = gross - opEx + ownerComp + addbacks;
  const sdeMargin = revenue ? sde / revenue : 0;
  const coverage = debtService > 0 ? sde / debtService : null;

  let stress = null;
  if (stressPct > 0 && revenue > 0) {
    const stressRev = revenue * (1 - stressPct / 100);
    const stressSde = stressRev - cogs * (stressRev / revenue) - opEx + ownerComp + addbacks;
    stress = { rev: stressRev, sde: Math.max(0, stressSde), valMid: Math.max(0, stressSde) * MULT.sdeMid };
  }

  return {
    gross,
    grossPct,
    opEx,
    sde,
    sdeMargin,
    coverage,
    valSDELow: sde * MULT.sdeLow,
    valSDEMid: sde * MULT.sdeMid,
    valSDEHigh: sde * MULT.sdeHigh,
    valRevLow: revenue * MULT.revLow,
    valRevMid: revenue * MULT.revMid,
    valRevHigh: revenue * MULT.revHigh,
    stress,
  };
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(n);
}

// ---- Research-based ballpark scenarios ----
// Sources: roofing gross margin 20-40%, materials 25-35%, labor 20-25%, overhead 15-20%;
// small co revenue $200k-$500k (owner-op) to $500k-$2M (5-10 people); ~$324k per employee;
// outdoor living contractors $200k to $2M+; net 5-12%; owner comp $60-100k small, more for larger.

const scenarios = [
  {
    name: 'Small operator (roofing-focused, ~$400k)',
    revenue: 400000,
    cogs: 140000,   // 35% - materials
    labor: 100000,  // 25%
    overhead: 80000, // 20%
    ownerComp: 75000,
    addbacks: 8000,
    debtService: 18000, // Kubota ballpark
    stressPct: 20,
  },
  {
    name: 'Mid-size (roofing + outdoor living, ~$800k)',
    revenue: 800000,
    cogs: 304000,   // 38%
    labor: 192000,   // 24%
    overhead: 128000, // 16%
    ownerComp: 110000,
    addbacks: 15000,
    debtService: 20000,
    stressPct: 20,
  },
  {
    name: 'Larger (multi-crew, ~$1.2M)',
    revenue: 1200000,
    cogs: 420000,   // 35%
    labor: 288000,   // 24%
    overhead: 180000, // 15%
    ownerComp: 150000,
    addbacks: 25000,
    debtService: 22000,
    stressPct: 25,
  },
];

// Edge cases
const edgeCases = [
  { name: 'All zeros', revenue: 0, cogs: 0, labor: 0, overhead: 0, ownerComp: 0, addbacks: 0, debtService: 0, stressPct: 0 },
  { name: 'Revenue only (no expenses)', revenue: 500000, cogs: 0, labor: 0, overhead: 0, ownerComp: 0, addbacks: 0, debtService: 0, stressPct: 0 },
  { name: 'High expenses (negative SDE)', revenue: 400000, cogs: 200000, labor: 150000, overhead: 100000, ownerComp: 50000, addbacks: 0, debtService: 15000, stressPct: 0 },
];

console.log('=== Financial framework test run ===\n');
console.log('Research ballpark: roofing gross 20-40%, materials 25-35%, labor 20-25%, overhead 15-20%;');
console.log('small co $200k-$2M revenue; outdoor living similar; net 5-12%; SDE multiples 1.61x-4.41x.\n');

for (const s of scenarios) {
  const r = run(s.revenue, s.cogs, s.labor, s.overhead, s.ownerComp, s.addbacks, s.debtService, s.stressPct);
  console.log('--- ' + s.name + ' ---');
  console.log('  Revenue:', fmt(s.revenue), '| COGS:', fmt(s.cogs), '| Labor:', fmt(s.labor), '| Overhead:', fmt(s.overhead));
  console.log('  Owner comp:', fmt(s.ownerComp), '| Add-backs:', fmt(s.addbacks), '| Debt svc:', fmt(s.debtService));
  console.log('  Gross:', fmt(r.gross), '(' + (r.grossPct * 100).toFixed(1) + '%)');
  console.log('  SDE:', fmt(r.sde), '(' + (r.sdeMargin * 100).toFixed(1) + '% margin)');
  console.log('  Debt coverage:', r.coverage != null ? r.coverage.toFixed(1) + 'x' : '—');
  console.log('  Valuation (SDE):', fmt(r.valSDELow), '-', fmt(r.valSDEHigh), '(mid', fmt(r.valSDEMid) + ')');
  console.log('  Valuation (rev):', fmt(r.valRevLow), '-', fmt(r.valRevHigh), '(mid', fmt(r.valRevMid) + ')');
  if (r.stress) {
    console.log('  Stress -' + s.stressPct + '% rev: SDE', fmt(r.stress.sde), '→ value (mid)', fmt(r.stress.valMid));
  }
  console.log('');
}

console.log('--- Edge cases ---');
for (const e of edgeCases) {
  const r = run(e.revenue, e.cogs, e.labor, e.overhead, e.ownerComp, e.addbacks, e.debtService || 0, e.stressPct || 0);
  console.log(e.name + ': SDE =', fmt(r.sde), '| Gross% =', (r.grossPct * 100).toFixed(1) + '%');
}
console.log('\n=== End test ===');
