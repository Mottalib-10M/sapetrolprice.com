import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, M = E.MONTHS, N = E.LAST_MONTH;
const full = E.LEVY_FULL, now = E.LEVY_NOW;
const yearFull = K.tank(150 * 12, full.petrol);

export default definePage({
  id: 'fuel-levy', group: 'why', order: 402, slug: 'fuel-levy',
  nav: 'Fuel levy and relief', card: 'The general fuel levy on petrol and diesel, the relief periods of 2026, and what the levy costs you in a year.',
  title: 'Fuel Levy 2026: The Relief Ending and What You Pay a Year',
  description: 'Fuel levy in South Africa in 2026: the general fuel levy on petrol and diesel, the relief from 4 November to 1 December, its end and its cost to you in a year.',
  h1: 'Fuel levy: the relief that ends and what you pay in a year',
  intro: `The general fuel levy is ${K.c(now.petrol)} a litre on petrol and ${K.c(now.diesel)} on diesel until 1 December, down from ${K.c(full.petrol)} and ${K.c(full.diesel)}. Enter your monthly litres.`,
  resume: `The general fuel levy is a tax of a fixed number of cents on each litre of petrol and diesel, paid into the National Treasury’s revenue fund. It is set in the national budget and is, with the Road Accident Fund levy of ${K.c(N.raf)}, the main tax in the fuel price, since petrol and diesel carry no VAT. Its full rate in the second half of 2026 is ${K.c(full.petrol)} a litre on petrol and ${K.c(full.diesel)} on diesel. In the Medium-Term Budget Policy Statement of 21 October 2026, the Minister of Finance cut it temporarily by ${K.c(E.RELIEF.petrol)} on petrol and ${K.c(E.RELIEF.diesel)} on diesel, from ${K.day(N.effective)} to 1 December. Unless that relief is extended, the levy returns to its full rate on ${K.day(E.NEXT_CHANGE)}, which adds those amounts to the December price. A driver who buys 150 litres of petrol a month pays about ${K.rand(yearFull)} of fuel levy a year at the full rate, and ${K.rand(K.tank(150, E.RELIEF.petrol))} less for the month of relief. 2026 already had a longer relief, from April to June.`,
  faqs: [
    { q: 'When does the fuel levy relief end?', a: `On 1 December 2026, as announced. From ${K.day(E.NEXT_CHANGE)} the general fuel levy returns to ${K.c(full.petrol)} a litre on petrol and ${K.c(full.diesel)} on diesel, unless the Minister of Finance extends the relief. That adds ${K.c(E.RELIEF.petrol)} to petrol and ${K.c(E.RELIEF.diesel)} to diesel in the December change.` },
    { q: 'How much fuel levy is in a litre of petrol?', a: `${K.c(now.petrol)} during the November relief, ${K.c(full.petrol)} at the full rate, on petrol 95 and 93 alike. Add the Road Accident Fund levy of ${K.c(N.raf)} and the slate levy of ${K.c(N.slate)}, and the levies on a litre come to ${K.rpl(now.petrol + N.raf + N.slate)} this month.` },
    { q: 'Why was the fuel levy cut in 2026?', a: 'The statements show two relief periods in 2026. The first ran from April to June, after the large under-recoveries recorded in March; the second, shorter one covers November. Each was announced by the Minister of Finance with a fixed end date, which is why the levy coming back appears in the price change that follows it.' },
  ],
  body: (h) => `
<h2>Fuel levy in 2026, statement by statement</h2>
<p>The general fuel levy in force after each change of 2026, as printed in the Central Energy Fund statements. The Road Accident Fund levy is shown beside it: it went from ${K.c(M[0].raf as number)} to ${K.c(N.raf)} with the April change and has not moved since.</p>
${h.table(['From', 'Fuel levy, petrol', 'Fuel levy, diesel', 'RAF levy'], M.map((m) => [K.day(m.effective), K.c(m.fuelLevy.petrol), K.c(m.fuelLevy.diesel), K.c(m.raf as number)]), 'Cents a litre. CEF media statements of 2026.', ['l', 'r', 'r', 'r'])}
<p>The table shows the two relief periods: April to June, when the levy fell as low as ${K.c(M[4].fuelLevy.diesel)} on diesel in May, and November. It also shows the full rate rising between March (${K.c(M[2].fuelLevy.petrol)} on petrol) and July (${K.c(M[6].fuelLevy.petrol)}), as set in the 2026 budget.</p>
<h2>What the fuel levy costs you</h2>
<p>Because the levy is a fixed amount per litre, what you pay depends only on how much you buy. At the full rate, 150 litres of petrol a month carry ${K.rand(K.tank(150, full.petrol))} of fuel levy and ${K.rand(K.tank(150, N.raf))} of Road Accident Fund levy, ${K.rand(K.tank(150 * 12, full.petrol + N.raf))} a year together. A diesel bakkie using 250 litres a month pays ${K.rand(K.tank(250 * 12, full.diesel + N.raf))} a year.</p>
${h.mini('structure', { t: 'All the taxes in your litres', p: ['fuel', 'litres'] })}
<h2>Fuel levy relief and the December price</h2>
<p>The end of the relief is a known, fixed step in the December change. The Central Energy Fund figures to ${K.day(E.LATEST.window[1])} point to an over-recovery that pulls petrol down by about ${K.c(K.F.p95.roundedRecovery)}; adding back the ${K.c(E.RELIEF.petrol)} of levy leaves a net cut of ${K.c(-K.F.p95.change)}. On diesel the over-recovery is smaller than the ${K.c(E.RELIEF.diesel)} coming back, so the price rises. The ${h.a('petrol-price-december-2026', 'December estimate')} lets you switch the relief on or off.</p>
<p>The fuel levy is not earmarked: it goes into the National Revenue Fund with other taxes. The ${h.a('what-is-in-a-litre-of-petrol', 'litre breakdown')} sets the levy against every other line of the price, and the ${h.a('slate-levy', 'slate levy page')} explains the other levy that changes often.</p>
`,
  tool: 'levy',
  related: ['what-is-in-a-litre-of-petrol', 'slate-levy', 'petrol-price-december-2026', 'diesel-price'],
  sources: ['treasury', 'cef_monthly', 'cef_2026', 'dmpr_nov'],
});
