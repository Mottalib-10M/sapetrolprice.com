import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, H = E.HISTORY, last = H[H.length - 1], first = H[0];
const gap = E.COAST_GAP, F = K.F;
const gapFirst = first.p95[0] - first.p95[1];
const yearGap = K.tank(150 * 12, gap.p95);

export default definePage({
  id: 'fuel-price-coast-vs-inland', group: 'prices', order: 104, slug: 'fuel-price-coast-vs-inland',
  nav: 'Coast against Gauteng', card: 'Why petrol costs less in Durban, Cape Town and Gqeberha than in Johannesburg, the gap in cents for each fuel, and what it adds up to in a year.',
  title: 'Fuel Price Coast vs Inland 2026: Durban, Cape Town, Gauteng',
  description: 'Fuel price at the coast vs inland in 2026: petrol 95, diesel and paraffin in Durban, Cape Town and Gqeberha against Gauteng, the zone gap and its cost a year.',
  h1: 'Fuel price at the coast vs inland: what the zone gap costs',
  intro: `The fuel price at the coast is lower than inland: petrol 95 costs ${K.rpl(last.p95[1])} a litre in Durban or Cape Town against ${K.rpl(last.p95[0])} in Gauteng this month, a gap of ${K.c(gap.p95)}.`,
  resume: `South Africa sets one regulated petrol price per magisterial zone, and the cheapest zones are the coastal ones where fuel is imported or refined: Durban, Cape Town, Gqeberha and the towns next to them. Moving fuel inland by pipeline, rail and road adds a zone differential that grows with distance, and Gauteng, the largest inland market, is the reference zone of the Central Energy Fund statements. Since ${K.day(last.date)}, petrol 95 costs ${K.rpl(last.p95[0])} a litre in Gauteng and ${K.rpl(last.p95[1])} at the coast, a gap of ${K.c(gap.p95)}. On 500 ppm diesel the wholesale gap is ${K.c(gap.d50)}, on paraffin ${K.c(gap.ipw)}. For a driver who buys 150 litres a month, living inland costs about ${K.rand(yearGap)} more a year. Towns between the coast and Gauteng pay a price in between, set by their own zone. The gap was ${K.c(gapFirst)} in April 2024: it moves only when transport tariffs are reviewed, not with oil.`,
  faqs: [
    { q: 'How much is petrol in Durban and Cape Town now?', a: `Petrol 95 costs ${K.rpl(last.p95[1])} a litre at the coast since ${K.day(last.date)}, the same in Durban, Cape Town and Gqeberha because they share the coastal zone. Petrol 93 is mostly sold inland. If the December estimate holds, 95 at the coast would cost about ${K.rpl(F.p95.nextCoast)} from ${K.day(E.NEXT_CHANGE)}.` },
    { q: 'Why is Gauteng fuel more expensive?', a: `Because almost all fuel reaches South Africa by sea or is refined near the coast, then travels several hundred kilometres to Gauteng by pipeline and road. The cost of that trip is part of the regulated price as the zone differential, ${K.c(K.S.p95.zone)} a litre on petrol in Gauteng, plus storage and distribution costs shared by all zones.` },
    { q: 'Does the coastal gap change every month?', a: `Rarely. The over- and under-recoveries that move the price each month apply equally to every zone, so the gap stays put. It changes when the Department reviews transport tariffs and pipeline charges, usually once a year. Since April 2024 the petrol gap has moved from ${K.c(gapFirst)} to ${K.c(gap.p95)}.` },
  ],
  body: (h) => `
<h2>Fuel price at the coast vs inland, fuel by fuel</h2>
<p>The Central Energy Fund statements give two prices for each fuel: Gauteng, which stands for the inland market, and the coast. Other zones are published in the Department’s zone tables; they fall between these two, depending on distance from a port or refinery and on the pipeline route.</p>
${h.table(['Fuel', 'Gauteng', 'Coast', 'Gap', 'On a 50-litre tank'], [
    ['Petrol 95', K.rpl(last.p95[0]), K.rpl(last.p95[1]), K.c(gap.p95), K.rand(K.tank(50, gap.p95))],
    ['Diesel 500 ppm (wholesale)', K.rpl(last.d50[0]), K.rpl(last.d50[1]), K.c(gap.d50), K.rand(K.tank(50, gap.d50))],
    ['Paraffin (wholesale)', K.rpl(last.ipw[0]), K.rpl(last.ipw[1]), K.c(gap.ipw), K.rand(K.tank(50, gap.ipw))],
    ['LPG (maximum, per kg)', K.rpl(last.lpg[0]), K.rpl(last.lpg[1]), K.c(last.lpg[0] - last.lpg[1]), 'not sold by the litre'],
  ], `Prices from ${K.day(last.date)}, CEF statement of 30 October 2026, Annexure 1.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>Where the gap comes from</h2>
<p>The regulated price is the same formula everywhere: landed cost, taxes and levies, margins, storage and distribution. Only one line differs: the zone differential, which pays for moving the fuel from the coast to the zone. In Gauteng it is ${K.c(K.S.p95.zone)} a litre on petrol and diesel and ${K.c(K.S.ipw.zone)} on paraffin, according to Annexure 1. The coastal zone carries a much smaller amount, which is why the published gap is a little under the Gauteng differential.</p>
<p>Because every other line is identical, the monthly change is the same at the coast and inland. When the December estimate says 95 falls by ${K.c(-F.p95.change)}, it falls by ${K.c(-F.p95.change)} in Durban as well as in Johannesburg. The ${h.a('what-is-in-a-litre-of-petrol', 'litre breakdown')} shows each line of the formula.</p>
${h.mini('tank', { t: 'One tank at the coast', p: ['fuel', 'zone'], d: { zone: 'coast' } })}
<h2>What the gap adds up to</h2>
<p>For a commuter in Pretoria or Johannesburg who buys 150 litres of 95 a month, the zone gap is ${K.rand(K.tank(150, gap.p95))} a month, ${K.rand(yearGap)} a year. A diesel delivery bakkie doing 3,000 litres a month pays about ${K.rand(K.tank(3000, gap.d50))} more a month inland than the same vehicle based at the coast. Households heating with paraffin pay the widest gap per litre, ${K.c(gap.ipw)}, but the single maximum retail price of paraffin is national, so at the shop the gap shows up only below that ceiling.</p>
<p>A trip to the coast does not save much on a single tank: ${K.rand(K.tank(50, gap.p95))} on 50 litres of 95. Filling up before driving back inland is worth it only if you were stopping anyway. For a monthly budget in your own zone, the ${h.a('fuel-cost-per-km', 'cost per kilometre page')} uses the Gauteng or coastal price you choose.</p>
`,
  tool: 'zone',
  related: ['petrol-95-price', 'what-is-in-a-litre-of-petrol', 'fuel-cost-per-km', 'paraffin-price'],
  sources: ['cef_2026', 'dmpr_prices', 'dmpr_structure'],
});
