import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, F = K.F.p95, S = K.S.p95, L = E.LATEST;
const H = E.HISTORY, last = H[H.length - 1];
const yearAgo = H.find((x) => x.date === '2025-11-05')!;
const sizes = [40, 50, 60, 80];

export default definePage({
  id: 'petrol-95-price', group: 'fuels', order: 201, slug: 'petrol-95-price',
  nav: 'Petrol 95', card: 'Today’s petrol 95 price inland and at the coast, what a tank costs, and the estimate for the change of 2 December.',
  title: 'Petrol 95 Price 2026: Cost of a Full Tank in South Africa',
  description: `Petrol 95 price in South Africa, November 2026: ${K.rpl(F.now)} in Gauteng, ${K.rpl(F.nowCoast)} at the coast, the cost of a full tank by size and the estimate for 2 December 2026.`,
  h1: 'Petrol 95 price today and the cost of a full tank',
  intro: `The petrol 95 price is ${K.rpl(F.now)} a litre in Gauteng and ${K.rpl(F.nowCoast)} at the coast until 1 December. Enter your tank size to see what filling it costs.`,
  resume: `Petrol 95, the unleaded grade sold at every station, has a regulated pump price in South Africa: the station cannot charge more or less than the price set for its zone. Since ${K.day(last.date)} that price is ${K.rpl(F.now)} a litre in Gauteng and ${K.rpl(F.nowCoast)} at the coast. A 50-litre tank therefore costs ${K.rand(K.tank(50, F.now))} inland, against ${K.rand(K.tank(50, yearAgo.p95[0]))} a year earlier, when 95 was ${K.rpl(yearAgo.p95[0])}. Of each litre, ${K.rpl(S.bfp)} is the landed cost of the fuel and ${K.rpl(S.taxes + S.slate)} goes to taxes and levies. The Central Energy Fund figures to ${K.day(L.window[1])} point to a cut of about ${K.c(-F.change)} on ${K.day(E.NEXT_CHANGE)}, to ${K.rpl(F.next)} inland and ${K.rpl(F.nextCoast)} at the coast, even after the temporary levy relief ends. On a 50-litre tank that would save about ${K.rand(K.tank(50, -F.change))}.`,
  faqs: [
    { q: 'What is the difference between petrol 93 and 95?', a: `The number is the octane rating, a measure of resistance to knocking in the engine. Petrol 95 costs ${K.c(F.now - K.F.p93.now)} a litre more than 93 in Gauteng this month. Use the grade your car’s manual asks for: most modern engines tuned for 95 lose power and economy on 93, while an engine built for 93 usually gains little from 95.` },
    { q: 'Can a petrol station charge less than the regulated price?', a: 'No. The price of petrol is a fixed pump price in each zone, set by the Department of Mineral and Petroleum Resources, and stations must charge exactly that. Loyalty points and bank card rewards are the only ways a station or card can give money back, and they are paid outside the pump price.' },
    { q: 'How much does it cost to fill a 60-litre tank of 95?', a: `${K.rand(K.tank(60, F.now))} in Gauteng and ${K.rand(K.tank(60, F.nowCoast))} at the coast at the November price. If the December estimate holds, the same tank would cost about ${K.rand(K.tank(60, F.next))} inland from ${K.day(E.NEXT_CHANGE)}. The calculator at the top takes any tank size and either zone.` },
  ],
  body: (h) => `
<h2>Petrol 95 price for each tank size</h2>
<p>The table gives the cost of a full tank at the price in force and at the estimated December price. A small hatchback holds about 40 litres, a family sedan 50 to 60 litres and a double-cab bakkie on petrol about 80. The tank is rarely empty when you fill up, so your slip is usually smaller than these figures.</p>
${h.table(['Tank', 'Gauteng now', 'Coast now', `Gauteng from ${K.day(E.NEXT_CHANGE)}`], sizes.map((l) => [`${l} litres`, K.rand(K.tank(l, F.now)), K.rand(K.tank(l, F.nowCoast)), K.rand(K.tank(l, F.next))]), `Pump prices of ${K.day(last.date)}; December figure estimated from the CEF sheet of ${K.day(L.date)}.`, ['l', 'r', 'r', 'r'])}
<h2>What the ${K.rpl(F.now)} pays for</h2>
<p>The price is built from the landed cost of the fuel, the Basic Fuel Price of ${K.rpl(S.bfp)} in this month’s structure, to which the formula adds the general fuel levy (${K.c(S.fuelLevy)} during the relief), the Road Accident Fund levy (${K.c(S.raf)}), the slate levy (${K.c(S.slate)}), the retail margin of the station (${K.c(S.retail)}), the wholesale margin (${K.c(S.wholesale)}), storage and distribution (${K.c(S.storage)}) and transport to Gauteng (${K.c(S.zone)}). No VAT is charged on petrol. The ${h.a('what-is-in-a-litre-of-petrol', 'litre breakdown page')} turns these lines into rand for your own litres.</p>
<p>Only the first line moves every month. The levies and margins change when the Treasury or the Department decides, usually once a year, with the exception of the slate levy, which has moved with each statement since it was set above zero again in May 2026.</p>
${h.mini('forecast', { t: 'Petrol 95 on 2 December', p: ['relief', 'litres'], d: { fuel: 'p95' } })}
<h2>Petrol 95 over the past year</h2>
<p>From ${K.rpl(yearAgo.p95[0])} in November 2025, the price fell to ${K.rpl(H.find((x) => x.date === '2026-02-04')!.p95[0])} in February 2026, then climbed with international prices from April to reach ${K.rpl(H.find((x) => x.date === '2026-10-07')!.p95[0])} in October. The November price is ${K.pct((F.now - yearAgo.p95[0]) / yearAgo.p95[0], 0)} above the price a year earlier. The ${h.a('petrol-price-history', 'history page')} lists every change since April 2024. For the 93 grade, see the ${h.a('petrol-93-price', 'petrol 93 page')}; for what the coming change means for a month of driving, the ${h.a('fuel-cost-per-km', 'cost per kilometre')}.</p>
`,
  tool: 'tank',
  related: ['petrol-93-price', 'petrol-price-december-2026', 'what-is-in-a-litre-of-petrol', 'fuel-price-coast-vs-inland'],
  sources: ['cef_2026', 'dmpr_prices', 'dmpr_structure', 'cef_daily'],
});
