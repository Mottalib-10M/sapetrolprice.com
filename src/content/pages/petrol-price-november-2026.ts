import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, N = E.LAST_MONTH, O = E.PREV_MONTH;
const H = E.HISTORY, now = H[H.length - 1], oct = H[H.length - 2];
const slateUp = N.slate - O.slate;
const p93Now = K.p93At('2026-11-10'), p93Oct = K.p93At('2026-10-10');

export default definePage({
  id: 'petrol-price-november-2026', group: 'prices', order: 102, slug: 'petrol-price-november-2026',
  nav: 'November 2026 prices', card: 'The prices in force since 4 November 2026 and the three moves that cancelled out on petrol: under-recovery, levy relief and slate levy.',
  title: 'Petrol Price November 2026: South Africa Prices in Force',
  description: 'Petrol price for November 2026 in South Africa: 95, 93, diesel, paraffin and LPG since 4 November, and why the levy relief left petrol 1c lower, not R1.50.',
  h1: 'Petrol price for November 2026: what changed on 4 November',
  intro: `The petrol price for November 2026 has applied since ${K.day(N.effective)}: 95 at ${K.rpl(now.p95[0])} a litre in Gauteng and ${K.rpl(now.p95[1])} at the coast, until 1 December.`,
  resume: `The November 2026 fuel prices took effect on ${K.day(N.effective)} and stay until 1 December. Petrol 95 costs ${K.rpl(now.p95[0])} a litre in Gauteng and ${K.rpl(now.p95[1])} at the coast, petrol 93 ${K.rpl(p93Now)} inland. Diesel 500 ppm sells at ${K.rpl(now.d50[0])} wholesale in Gauteng, paraffin at ${K.rpl(now.ipw[0])} wholesale, with a single maximum retail price of ${K.rpl(N.smnrp)} at the shop, and LPG at up to ${K.rpl(now.lpg[0])} a kilogram. Petrol moved by only ${K.dc(N.change.p95)} although the Minister of Finance cut the fuel levy by ${K.dc(-E.RELIEF.petrol)} a litre. Two other moves absorbed the relief: an under-recovery of ${K.dc(-N.recovery!.p95)} over October, and a slate levy raised by ${K.dc(slateUp)}. On diesel, where the relief was ${K.dc(-E.RELIEF.diesel)}, the price still fell by ${K.dc(-N.change.d50)}. Paraffin, which carries no fuel levy, rose by ${K.dc(N.change.ipw)}.`,
  faqs: [
    { q: 'Why did petrol not drop by R1.50 in November 2026?', a: `Because the R1.50 relief arrived in the same statement as two increases. The average under-recovery of October added ${K.dc(Math.round(-N.recovery!.p95))} a litre to petrol 95, and the slate levy rose from ${K.dc(O.slate)} to ${K.dc(N.slate)}, another ${K.dc(slateUp)}. Together they almost exactly cancelled the ${K.dc(-E.RELIEF.petrol)} of relief, leaving a change of ${K.dc(N.change.p95)}.` },
    { q: 'How long does the November fuel levy relief last?', a: `From ${K.day(N.effective)} to 1 December 2026, as announced in the Medium-Term Budget Policy Statement. The general fuel levy fell to ${K.dc(N.fuelLevy.petrol)} a litre on petrol and ${K.dc(N.fuelLevy.diesel)} on diesel, from ${K.dc(O.fuelLevy.petrol)} and ${K.dc(O.fuelLevy.diesel)}. Unless it is extended, the full levy returns with the December change on ${K.day(E.NEXT_CHANGE)}.` },
    { q: 'What was the rand exchange rate behind the November prices?', a: `The statement gives an average of R${K.dec(N.zarusd, 4)} to the US dollar over the window, against R${K.dec(N.zarusdPrev, 4)} for the October prices. A weaker rand makes imported fuel dearer in rand, so it contributed a little to the under-recovery, though most of it came from international product prices.` },
  ],
  body: (h) => `
<h2>November 2026 petrol price by fuel and zone</h2>
<p>The table lists every regulated price set for ${K.day(N.effective)}, against the October figures. Petrol is a pump price: every station in a zone must charge it. Diesel and paraffin are wholesale prices, so stations add their own margin, and the LPG figure is a maximum retail price per kilogram.</p>
${h.table(['Fuel', 'Gauteng, October', 'Gauteng, November', 'Coast, November', 'Change'], [
    ['Petrol 95', K.rpl(oct.p95[0]), K.rpl(now.p95[0]), K.rpl(now.p95[1]), K.dc(N.change.p95)],
    ['Petrol 93', K.rpl(p93Oct), K.rpl(p93Now), 'not listed', K.dc(N.change.p93)],
    ['Diesel 500 ppm (wholesale)', K.rpl(oct.d50[0]), K.rpl(now.d50[0]), K.rpl(now.d50[1]), K.dc(N.change.d50)],
    ['Paraffin (wholesale)', K.rpl(oct.ipw[0]), K.rpl(now.ipw[0]), K.rpl(now.ipw[1]), K.dc(N.change.ipw)],
    ['LPG (maximum, per kg)', K.rpl(oct.lpg[0]), K.rpl(now.lpg[0]), K.rpl(now.lpg[1]), K.dc(N.change.lpg)],
  ], `Statement of ${K.day(N.released)} for the change of ${K.day(N.effective)}, Annexure 1. The coast is zone 1A (Durban, Cape Town, Gqeberha).`, ['l', 'r', 'r', 'r', 'r'])}
<h2>Three moves that cancelled out on petrol</h2>
<p>The window behind November ran from ${K.day(N.window![0])} to ${K.day(N.window![1])}. Over those weeks the landed cost of petrol 95 sat above the cost built into October’s price, an average under-recovery of ${K.dc(-N.recovery!.p95)} a litre. On its own, that would have raised the pump price by about R1.01.</p>
<p>The government then cut the general fuel levy for four weeks, by ${K.dc(-E.RELIEF.petrol)} on petrol and ${K.dc(-E.RELIEF.diesel)} on diesel (Medium-Term Budget Policy Statement of 21 October 2026). In the same statement the slate levy, which recovers the under-recoveries the industry has already carried, went from ${K.dc(O.slate)} to ${K.dc(N.slate)}. Adding the three gives ${K.dc(Math.round(-N.recovery!.p95))} ${K.dc(-E.RELIEF.petrol)} ${K.dc(slateUp)}, rounded by the statement to ${K.dc(N.change.p95)}. The ${h.a('slate-levy', 'slate levy page')} explains how that levy is set.</p>
${h.mini('levy', { t: 'What the November relief saves you', p: ['fuel', 'litres'], d: { litres: 150 } })}
<h2>Diesel, paraffin and gas in November</h2>
<p>Diesel had a larger under-recovery than petrol, ${K.dc(-N.recovery!.d50)} on 500 ppm, but also twice the relief, so its wholesale price fell by ${K.dc(-N.change.d50)}. Paraffin pays no fuel levy and no slate levy: it took its full under-recovery of ${K.dc(-N.recovery!.ipw)}, and the maximum shop price rose from ${K.rpl(N.smnrpPrev)} to ${K.rpl(N.smnrp)} a litre. LPG follows its own formula, linked to international propane and butane prices, and rose by ${K.dc(N.change.lpg)} a kilogram, about ${K.rand(K.tank(9, N.change.lpg))} on a 9 kg refill.</p>
<h2>What comes after November</h2>
<p>The prices on this page hold until the change of 2 December. The next change is on ${K.day(E.NEXT_CHANGE)}, and the levy relief is due to end with it. The ${h.a('petrol-price-december-2026', 'December estimate')} carries the CEF figures to date into that change, and the ${h.a('petrol-price-history', 'price history')} sets November against every month since April 2024.</p>
`,
  tool: 'history',
  toolArg: { when: '2026-10-07' },
  related: ['petrol-price-december-2026', 'fuel-levy', 'slate-levy', 'petrol-price-history'],
  sources: ['cef_monthly', 'cef_2026', 'dmpr_nov', 'dmpr_prices', 'treasury'],
});
