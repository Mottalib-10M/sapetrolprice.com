import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, L = E.LATEST, D = K.F.d50, D5 = K.F.d005, S = K.S.d50;
const keep = E.forecast({ product: 'd50', reliefEnds: false });
const H = E.HISTORY, last = H[H.length - 1];
const peak = H.reduce((a, b) => (b.d50[0] > a.d50[0] ? b : a));

export default definePage({
  id: 'diesel-price', group: 'fuels', order: 203, slug: 'diesel-price',
  nav: 'Diesel', card: 'Diesel 500 ppm and 50 ppm wholesale prices, why diesel should rise on 2 December while petrol falls, and what it means for a bakkie.',
  title: 'Diesel Price 2026: December Estimate for 50 and 500 ppm',
  description: 'Diesel price in South Africa for December 2026: 500 ppm and 50 ppm wholesale estimates from CEF data, the levy relief that ends, and the cost of a bakkie tank.',
  h1: 'Diesel price in South Africa: why it should rise in December',
  intro: `The diesel price for ${K.day(E.NEXT_CHANGE)} looks set to rise by about ${K.c(D.change)} on 500 ppm, from ${K.rpl(D.now)} wholesale in Gauteng, because a temporary fuel tax cut ends. Your pump price is higher than this wholesale figure, but it moves by the same amount.`,
  resume: `Diesel in South Africa has a regulated wholesale price, not a pump price: stations buy at the price set by the Department and add their own margin. Since ${K.day(E.LAST_MONTH.effective)}, 500 ppm diesel (0.05% sulphur) costs ${K.rpl(D.now)} a litre wholesale in Gauteng and ${K.rpl(D.nowCoast)} at the coast; the cleaner 50 ppm grade (0.005%) costs ${K.rpl(D5.now)} in Gauteng. The general fuel levy on diesel was cut by ${K.c(-E.RELIEF.diesel)} a litre until 1 December, twice the cut on petrol. The Central Energy Fund sheet of ${K.day(L.date)} shows an over-recovery of ${K.c(L.average.d50)} so far on 500 ppm: the price should come down by about ${K.c(D.roundedRecovery)} from that alone, but the ${K.c(E.RELIEF.diesel)} of levy coming back outweighs it. Net estimate: ${K.dc(D.change)} on 500 ppm to ${K.rpl(D.next)}, ${K.dc(D5.change)} on 50 ppm to ${K.rpl(D5.next)}. An 80-litre bakkie tank would cost about ${K.rand(K.tank(80, D.change))} more at the same station margin.`,
  faqs: [
    { q: 'Why is diesel going up when petrol comes down in December?', a: `The two fuels share the same levy relief mechanism but not the same amounts. Diesel got ${K.c(E.RELIEF.diesel)} of relief against ${K.c(E.RELIEF.petrol)} on petrol, while its over-recovery so far is smaller: ${K.c(L.average.d50)} against ${K.c(L.average.p95)}. When the relief ends, the levy added back is larger than the cut on diesel and smaller than the cut on petrol.` },
    { q: 'What is the difference between 50 ppm and 500 ppm diesel?', a: `The sulphur content: 50 parts per million (0.005%) against 500 (0.05%). The cleaner grade is required by most modern diesel engines with particulate filters and costs ${K.c(D5.now - D.now)} a litre more wholesale this month. Its landed cost moves a little differently, which is why the estimates for December are not identical.` },
    { q: 'Why does the diesel price differ from station to station?', a: 'Because only the wholesale price is regulated. Each station adds a margin for storage, staff, card fees and profit, and the margin is not capped. Stations on highways and in remote towns can charge more. The monthly change in the wholesale price usually passes to the pump in full, so the estimate on this page applies to your station too.' },
    { q: 'How much would diesel fall if the levy relief were extended?', a: `On the figures to ${K.day(L.window[1])}, 500 ppm diesel would then fall by about ${K.c(-keep.change)} to ${K.rpl(keep.next)} wholesale in Gauteng, instead of rising by ${K.c(D.change)}. Any extension has to be announced by the Minister of Finance; the CEF statement of 30 October gives 1 December as the end date.` },
  ],
  body: (h) => `
<h2>Diesel price: wholesale today and the December estimate</h2>
${h.table(['Grade', 'Gauteng now', 'Coast now', 'Fuel cost gap', 'Tax cut ends', 'Change', 'Gauteng from 2 Dec'], [
    ['Diesel 500 ppm (0.05%)', K.rpl(D.now), K.rpl(D.nowCoast), K.dc(-D.roundedRecovery), K.dc(D.levyEffect), K.dc(D.change), K.rpl(D.next)],
    ['Diesel 50 ppm (0.005%)', K.rpl(D5.now), K.rpl(D5.nowCoast), K.dc(-D5.roundedRecovery), K.dc(D5.levyEffect), K.dc(D5.change), K.rpl(D5.next)],
  ], `Wholesale prices in rand a litre; effects in cents a litre, minus lowers the price, plus raises it, and the two add up to the change. CEF sheet of ${K.day(L.date)}; the coastal 50 ppm price applies the 500 ppm zone gap.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>The wholesale price is what the Department regulates. What you pay at the pump adds the station’s margin, so the figures above are lower than any pump price you will see. The change, on the other hand, is the same: if the wholesale price rises by ${K.c(D.change)}, the pump price rises by about that much as well.</p>
<h2>What a litre of diesel is made of</h2>
<p>Of the ${K.rpl(S.total)} wholesale price of 500 ppm in Gauteng, ${K.rpl(S.bfp)} is the landed cost of the fuel, a larger share than on petrol because diesel is dearer on world markets this year. The rest is the general fuel levy at ${K.c(S.fuelLevy)} during the relief, the Road Accident Fund levy at ${K.c(S.raf)}, the slate levy at ${K.c(S.slate)}, the wholesale margin at ${K.c(S.wholesale)} and storage, distribution and transport to Gauteng at ${K.c(S.storage + S.zone)}. There is no retail margin in the regulated price, which is why the station’s own margin comes on top.</p>
<p>Farmers, miners, fishing fleets and some transport operators can claim back part of the fuel levy and the Road Accident Fund levy on diesel through the South African Revenue Service diesel refund scheme, under conditions set in the customs and excise rules. The refund does not change the price at the pump.</p>
${h.mini('gap', { t: 'Diesel or petrol car for your distance', p: ['km', 'ld'] })}
<h2>Diesel since 2024</h2>
<p>500 ppm diesel cost ${K.rpl(H[0].d50[0])} wholesale in Gauteng in April 2024 and peaked at ${K.rpl(peak.d50[0])} on ${K.day(peak.date)}, after a jump in international diesel prices produced an under-recovery of ${K.c(-E.MONTHS[3].recovery!.d50)} a litre for the April change. Diesel reacts more than petrol to shocks in the world market, because more of its price is the landed cost. The ${h.a('diesel-vs-petrol-price', 'diesel against petrol page')} compares running costs, and the ${h.a('petrol-price-history', 'history')} gives every change.</p>
`,
  tool: 'forecast',
  toolArg: { fuel: 'd50' },
  related: ['diesel-vs-petrol-price', 'petrol-price-december-2026', 'fuel-levy', 'paraffin-price'],
  sources: ['cef_daily', 'cef_monthly', 'cef_2026', 'dmpr_prices', 'treasury'],
});
