import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, L = E.LATEST, M = E.MONTHS;
const r5 = E.randEffect('p95', 5), d5 = E.randEffect('d50', 5);
const up5 = E.forecast({ product: 'p95', move: 5 }), dn5 = E.forecast({ product: 'p95', move: -5 });
const zLo = M.reduce((a, b) => (b.zarusd < a.zarusd ? b : a)), zHi = M.reduce((a, b) => (b.zarusd > a.zarusd ? b : a));

export default definePage({
  id: 'rand-and-oil-price', group: 'why', order: 405, slug: 'rand-and-oil-price',
  nav: 'Rand and oil', card: 'How much a weaker rand or dearer oil adds to a litre of petrol or diesel, with the exchange rates behind each 2026 price.',
  title: 'Rand and Oil Price 2026: What Moves Petrol in South Africa',
  description: 'Rand and oil price effects on petrol in South Africa in 2026: what a 5% weaker rand adds to a litre, the rate behind each change and the December outlook.',
  h1: 'Rand and oil price: how much each moves a litre of petrol',
  intro: `The rand and oil price drive the landed cost of fuel. At the ${K.day(L.date)} figures, a rand 5% weaker for a whole window adds about ${K.c(r5)} to a litre of 95.`,
  resume: `The landed cost of fuel, the Basic Fuel Price, is set in dollars on international markets and paid in rand. A move of the oil product price or of the exchange rate therefore changes it in proportion, while the levies and margins, which make up most of the rest of the price, stay fixed in cents. On ${K.day(L.date)} the Basic Fuel Price of petrol 95 was ${K.c(L.bfp.p95)} a litre at R${K.dec(L.zarusd)} to the dollar. A rand 5% weaker over a whole pricing window, with oil unchanged, would add about ${K.c(r5)} a litre to petrol 95 and ${K.c(d5)} to 500 ppm diesel, ${K.rand(K.tank(50, r5))} on a 50-litre tank of 95. A 5% move in oil product prices has the same effect. In 2026 the average exchange rate behind each price ranged from R${K.dec(zLo.zarusd, 2)} for the ${K.mon(zLo.effective)} change to R${K.dec(zHi.zarusd, 2)} for ${K.mon(zHi.effective)}: the rand moved far less than oil, which explains most of the year’s swings.`,
  faqs: [
    { q: 'How does the rand affect the petrol price?', a: `Fuel is bought in dollars, so a weaker rand makes each litre dearer to import. At current prices, each 1% the rand loses against the dollar over a whole window adds about ${K.c(E.randEffect('p95', 1))} to a litre of petrol 95. The effect shows up in the next monthly change, through the over- or under-recovery.` },
    { q: 'Is it the price of Brent crude that sets the petrol price?', a: 'Not directly. The Basic Fuel Price uses international spot prices of refined petrol and diesel, not crude oil, plus freight and insurance. Refined product prices usually follow crude, but refining margins can make them move apart, as when diesel rose faster than petrol in 2026.' },
    { q: 'How much did the rand contribute to the December estimate?', a: `Very little. On the sheet of ${K.day(L.date)}, of the ${K.c(L.average.p95)} over-recovery on petrol 95, ${K.c(L.fromProduct.p95)} came from product prices and only ${K.c(L.fromRand.p95)} from the exchange rate. The cut expected for December comes from cheaper international petrol, not from the rand.` },
  ],
  body: (h) => `
<h2>Rand and oil price behind each change of 2026</h2>
<p>The statements give the average exchange rate of each window. Set against the petrol 95 change, they show how rarely the rand alone explains a large move.</p>
${h.table(['Change of', 'Rand to the dollar', 'Petrol 95 change', 'Diesel 500 ppm change'], M.map((m) => [K.day(m.effective), `R${K.dec(m.zarusd, 4)}`, K.dc(m.change.p95 as number), K.dc(m.change.d50 as number)]), 'Average exchange rate of each window and changes in cents a litre. CEF media statements of 2026.', ['l', 'r', 'r', 'r'])}
<p>Between the March and April changes, the rand weakened from R${K.dec(M[2].zarusd, 2)} to R${K.dec(M[3].zarusd, 2)}, about ${K.pct((M[3].zarusd - M[2].zarusd) / M[2].zarusd, 0)}. That alone would have added well under a rand to a litre; the under-recovery for April was ${K.c(-M[3].recovery!.p95)} on petrol, so most of it came from international product prices.</p>
<h2>How to read a move before the window closes</h2>
<p>The December estimate on this site assumes the rest of the window looks like the latest day. If oil products or the rand move, the estimate moves too, and by a predictable amount: a 5% rise in the landed cost for the rest of the window would bring petrol 95 to ${K.rpl(up5.next)} on ${K.day(E.NEXT_CHANGE)} instead of ${K.rpl(K.F.p95.next)}; a 5% fall, to ${K.rpl(dn5.next)}. The effect is smaller than a full 5% of the BFP because part of the window is already fixed.</p>
${h.mini('forecast', { t: 'December with oil and the rand moving', p: ['fuel', 'move'], d: { move: '5' } })}
<h2>Why the levies dampen and amplify</h2>
<p>About ${K.pct(K.S.p95.bfp / K.S.p95.total, 0)} of the price of petrol 95 is the landed cost; the rest is fixed in cents. A 10% jump in the landed cost therefore moves the pump price by about ${K.pct(0.1 * K.S.p95.bfp / K.S.p95.total, 1)}. For diesel, where the landed cost is ${K.pct(K.S.d50.bfp / K.S.d50.total, 0)} of the wholesale price, the same jump moves the price by more. The ${h.a('basic-fuel-price', 'Basic Fuel Price page')} explains the daily sheet; for the other side of the economy, the rand and fuel feed inflation, which the Reserve Bank weighs before each ${h.a('repo-rate', 'repo rate decision')}.</p>
`,
  tool: 'rand',
  related: ['basic-fuel-price', 'petrol-price-december-2026', 'diesel-vs-petrol-price', 'repo-rate'],
  sources: ['cef_daily', 'cef_monthly', 'cef_2026', 'sarb_rates'],
});
