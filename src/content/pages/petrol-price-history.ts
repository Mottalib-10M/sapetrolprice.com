import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, H = E.HISTORY;
const first = H[0], last = H[H.length - 1];
const jan = H.find((x) => x.date === '2026-01-07')!, mar = H.find((x) => x.date === '2026-03-04')!;
const low = H.reduce((a, b) => (b.p95[0] < a.p95[0] ? b : a)), high = H.reduce((a, b) => (b.p95[0] > a.p95[0] ? b : a));
const dHigh = H.reduce((a, b) => (b.d50[0] > a.d50[0] ? b : a));
const rises = H.slice(1).filter((x, i) => x.p95[0] > H[i].p95[0]).length, falls = H.length - 1 - rises;
const calm = H.filter((x) => x.date <= '2026-03-04');
const calmMax = calm.slice(1).map((x, i) => x.p95[0] - calm[i].p95[0]).reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a), 0);

export default definePage({
  id: 'petrol-price-history', group: 'prices', order: 103, slug: 'petrol-price-history',
  nav: 'Price history since 2024', card: 'Every regulated price change since April 2024 for petrol 95, diesel, paraffin and LPG, inland and at the coast, and any month against today.',
  title: 'Petrol Price History 2026: Every Change Since April 2024',
  description: 'Petrol price history in South Africa to November 2026: every change since April 2024 for 95, diesel, paraffin and LPG, and any month compared with today.',
  h1: 'Petrol price history in South Africa, month by month',
  intro: `This petrol price history lists all ${H.length} regulated prices since ${K.day(first.date)}. Pick a month to see how much more, or less, the same tank costs now.`,
  resume: `Petrol 95 cost ${K.rpl(first.p95[0])} a litre in Gauteng on ${K.day(first.date)} and costs ${K.rpl(last.p95[0])} since ${K.day(last.date)}. Over the ${H.length - 1} changes in between it rose ${rises} times and fell or held ${falls} times. The lowest point of the period was ${K.rpl(low.p95[0])} on ${K.day(low.date)}; the highest, ${K.rpl(high.p95[0])}, came on ${K.day(high.date)}. Almost all of the climb happened in 2026: from ${K.rpl(mar.p95[0])} in March the price jumped by ${K.dc(H.find((x) => x.date === '2026-04-01')!.p95[0] - mar.p95[0])} in April and ${K.dc(H.find((x) => x.date === '2026-05-06')!.p95[0] - H.find((x) => x.date === '2026-04-01')!.p95[0])} in May, as international prices rose, even with a fuel levy relief in place. Diesel 500 ppm, at ${K.rpl(first.d50[0])} wholesale in April 2024, peaked at ${K.rpl(dHigh.d50[0])} on ${K.day(dHigh.date)}. All figures come from the price history annexed to the Central Energy Fund statements.`,
  faqs: [
    { q: 'What was the petrol price in January 2026?', a: `From ${K.day(jan.date)}, petrol 95 cost ${K.rpl(jan.p95[0])} a litre in Gauteng and ${K.rpl(jan.p95[1])} at the coast. It fell again in February, to ${K.rpl(H.find((x) => x.date === '2026-02-04')!.p95[0])}, the lowest price of the whole period since April 2024, before the increases of April and May.` },
    { q: 'What is the highest petrol price South Africa has had?', a: `In the period covered here, the highest Gauteng price of 95 was ${K.rpl(high.p95[0])} a litre, from ${K.day(high.date)}. The November price is ${K.dc(last.p95[0] - high.p95[0])} below it. Older records before April 2024 are in earlier CEF statements, which this site has not reread.` },
    { q: 'Why is the coast cheaper than Gauteng?', a: `Fuel lands at the coastal ports, and moving it inland by pipeline and road costs money. That cost is built into the regulated price as the zone differential, ${K.dc(K.S.p95.zone)} a litre in Gauteng. The gap between Gauteng and the coast was ${K.dc(last.p95[0] - last.p95[1])} on 95 in November 2026.` },
  ],
  body: (h) => `
<h2>Petrol price history: the full table</h2>
<p>Each row is a price change on the first Wednesday of a month, as listed in Annexure 1 of the latest Central Energy Fund statement. Petrol 95 is the pump price; diesel 500 ppm and paraffin are wholesale prices, before the station’s margin; LPG is the maximum retail price per kilogram. The first figure is Gauteng, the second the coast.</p>
${h.table(['From', 'Petrol 95', 'Diesel 500 ppm', 'Paraffin', 'LPG per kg'], [...H].reverse().map((x) => [K.day(x.date), `${K.rpl(x.p95[0])} / ${K.rpl(x.p95[1])}`, `${K.rpl(x.d50[0])} / ${K.rpl(x.d50[1])}`, `${K.rpl(x.ipw[0])} / ${K.rpl(x.ipw[1])}`, `${K.rpl(x.lpg[0])} / ${K.rpl(x.lpg[1])}`]), 'Rand a litre (LPG a kilogram), Gauteng / coast. CEF statement of 30 October 2026, Annexure 1.', ['l', 'r', 'r', 'r', 'r'])}
<h2>Three phases since 2024</h2>
<p><strong>April 2024 to March 2026: a slow fall.</strong> From ${K.rpl(first.p95[0])}, petrol 95 drifted down overall, with rises in between, and reached ${K.rpl(low.p95[0])} in ${K.mon(low.date)} 2026. Diesel followed a similar path. Over these two years the largest monthly move on 95 was ${K.dc(calmMax)} a litre.</p>
<p><strong>April to June 2026: the jump.</strong> International product prices rose sharply in March. The CEF recorded an average under-recovery of ${K.dc(-E.MONTHS[3].recovery!.p95)} on petrol for the April change and ${K.dc(-E.MONTHS[3].recovery!.d50)} on diesel. The government cut the fuel levy to ${K.dc(E.MONTHS[3].fuelLevy.petrol)} on petrol and ${K.dc(E.MONTHS[3].fuelLevy.diesel)} on diesel, so the pump moved by less: ${K.dc(E.MONTHS[3].change.p95)} on 95 in April, then ${K.dc(E.MONTHS[4].change.p95)} in May, when the slate levy, at zero since January, was set at ${K.dc(E.MONTHS[4].slate)}.</p>
<p><strong>July to November 2026: the levy returns.</strong> The full fuel levy came back in July at ${K.dc(E.MONTHS[6].fuelLevy.petrol)} on petrol. Prices fell in July and August, then rose again in September and October, to the high of ${K.rpl(high.p95[0])}. A second, shorter relief from ${K.day('2026-11-04')} held the November price flat.</p>
${h.mini('year', { t: 'What your petrol cost through 2026', p: ['litres'], d: { litres: 150 } })}
<h2>Month-by-month change in 2026</h2>
<p>The change column of each statement explains the history table. Positive figures are increases. The levy changes are counted inside the change, which is why April and November moved by less than the under-recovery suggested.</p>
${h.table(['Change of', 'Petrol 95', 'Petrol 93', 'Diesel 500 ppm', 'Paraffin'], E.MONTHS.map((m) => [K.day(m.effective), K.dc(m.change.p95 as number), K.dc(m.change.p93 as number), K.dc(m.change.d50 as number), K.dc(m.change.ipw as number)]), 'Cents a litre, Gauteng. Media statements of the Central Energy Fund, 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Over the eleven changes of 2026, petrol 95 went from ${K.rpl(H.find((x) => x.date === '2025-12-03')!.p95[0])} to ${K.rpl(last.p95[0])}, ${K.dc(last.p95[0] - H.find((x) => x.date === '2025-12-03')!.p95[0])} in all. The ${h.a('petrol-price-december-2026', 'December estimate')} gives the likely next row, and the ${h.a('rand-and-oil-price', 'rand and oil page')} shows how much of a move comes from the exchange rate.</p>
`,
  tool: 'history',
  related: ['petrol-price-november-2026', 'petrol-price-december-2026', 'petrol-95-price', 'lpg-gas-price'],
  sources: ['cef_2026', 'cef_monthly', 'dmpr_prices'],
});
