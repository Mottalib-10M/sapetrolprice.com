import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, F = K.F.p93, F95 = K.F.p95, L = E.LATEST, S = K.S.p93;
const rows = E.DAILIES.map((d) => ({ date: d.date, p93: d.inForce.p93 as number, p95: d.inForce.p95 as number }));
const jan = rows[0], gapNow = F95.now - F.now, gapJan = jan.p95 - jan.p93;
const gapMax = rows.reduce((a, b) => (b.p95 - b.p93 > a.p95 - a.p93 ? b : a));

export default definePage({
  id: 'petrol-93-price', group: 'fuels', order: 202, slug: 'petrol-93-price',
  nav: 'Petrol 93', card: 'The inland petrol 93 price, its gap with 95 through 2026 and the estimate for 2 December from the Central Energy Fund figures.',
  title: 'Petrol 93 Price 2026: Gauteng Price and December Estimate',
  description: 'Petrol 93 price in Gauteng for November 2026, its gap with 95 through the year and the estimate for 2 December 2026 from the CEF daily over-recovery figures.',
  h1: 'Petrol 93 price in Gauteng and the December estimate',
  intro: `The petrol 93 price is ${K.rpl(F.now)} a litre in Gauteng until 1 December, ${K.dc(gapNow)} below 95. The estimate for ${K.day(E.NEXT_CHANGE)} is below.`,
  resume: `Petrol 93 is the lower-octane unleaded grade sold mainly inland, where the thinner air at altitude lets engines run on it. Its pump price is regulated like 95: ${K.rpl(F.now)} a litre in Gauteng since ${K.day(E.LAST_MONTH.effective)}, a 50-litre tank at ${K.rand(K.tank(50, F.now))}. The gap with 95 was only ${K.dc(gapJan)} in January 2026; it widened to ${K.dc(gapMax.p95 - gapMax.p93)} in October, because the October statement raised 95 by ${K.dc(E.MONTHS[9].change.p95 as number)} and 93 by ${K.dc(E.MONTHS[9].change.p93 as number)}, and stands at ${K.dc(gapNow)} now. The Central Energy Fund sheet of ${K.day(L.date)} shows an over-recovery of ${K.dc(L.average.p93)} a litre on 93 so far in the December window, a little less than on 95. Carried to the close and with the levy relief ending, 93 would fall by about ${K.dc(-F.change)} to ${K.rpl(F.next)} on ${K.day(E.NEXT_CHANGE)}. The statements publish no coastal 93 price: at the coast, nearly every station sells 95.`,
  faqs: [
    { q: 'Is petrol 93 cheaper to run than 95?', a: `Per litre, yes: ${K.dc(gapNow)} less this month, ${K.rand(K.tank(50, gapNow))} on a 50-litre tank. Per kilometre, only if your engine is designed for 93. An engine that asks for 95 can retard its ignition on 93 and use more fuel, which can wipe out the saving. Your owner’s manual or the label inside the fuel flap gives the minimum octane.` },
    { q: 'Why is 93 not sold at the coast?', a: 'At sea level, engines need a higher octane rating to avoid knocking than at the altitude of Gauteng, where the air is thinner. Fuel companies therefore sell 95 at the coast and both grades inland. The Central Energy Fund statements list the 93 price for Gauteng only.' },
    { q: 'How much will petrol 93 cost in December 2026?', a: `About ${K.rpl(F.next)} a litre in Gauteng from ${K.day(E.NEXT_CHANGE)} on the figures to ${K.day(L.window[1])}, a cut of ${K.dc(-F.change)}. That already counts the ${K.dc(E.RELIEF.petrol)} of fuel levy relief ending on 1 December. If the relief were extended, the cut would be about ${K.dc(-E.forecast({ product: 'p93', reliefEnds: false }).change)}.` },
  ],
  body: (h) => `
<h2>Petrol 93 price through 2026</h2>
<p>The statements’ price history covers 95 only, so the 93 prices below come from the pump price in force printed on the Central Energy Fund daily sheets, one sheet per month after each change. They are Gauteng prices.</p>
${h.table(['Price in force on', 'Petrol 93', 'Petrol 95', 'Gap'], rows.map((r) => [K.day(r.date), K.rpl(r.p93), K.rpl(r.p95), K.dc(r.p95 - r.p93)]), 'Rand a litre, Gauteng. CEF Daily Basic Fuel Price sheets, 2026.', ['l', 'r', 'r', 'r'])}
<p>Through most of the year the two grades moved by the same amount, because they share the same levies, margins and transport costs, and their landed costs track each other. The gap only widens when the international price of the higher-octane blend moves apart from the lower one, as it did in July and again in October 2026.</p>
<h2>How the December petrol 93 price is estimated</h2>
<p>On ${K.day(L.date)}, a litre of 93 cost ${K.dc(L.bfp.p93)} landed, against ${K.dc(L.contribution.p93)} built into the November price: an over-recovery of ${K.dc(L.day.p93)} that day, and ${K.dc(L.average.p93)} on average since ${K.day(L.window[0])}. The estimate fills the remaining days of the window with the latest figure and averages the whole, which gives ${K.dc(F.projected)}, rounded to ${K.dc(F.roundedRecovery)}. Adding back the ${K.dc(E.RELIEF.petrol)} of levy relief gives the change of ${K.dc(F.change)}.</p>
<p>The ${h.a('petrol-price-december-2026', 'December page')} explains each assumption and shows how a move in oil or the rand before the close would change the result. The landed cost of 93 makes up ${K.pct(S.bfp / (S.total || F.now), 0)} of the pump price; the rest is the same for both grades and is set out on the ${h.a('what-is-in-a-litre-of-petrol', 'litre breakdown page')}.</p>
${h.mini('tank', { t: 'A tank of 93 now and in December', p: ['litres'], d: { fuel: 'p93', litres: 50 } })}
<h2>93 or 95 for your car</h2>
<p>For a car that runs on either, the choice is a matter of cents: ${K.rand(K.tank(150, gapNow))} a month on 150 litres at this month’s gap. For a car whose manual requires 95, it is not a choice. The ${h.a('petrol-95-price', 'petrol 95 page')} gives the 95 figures for every tank size, and the ${h.a('fuel-cost-per-km', 'cost per kilometre')} compares the two over a month of driving.</p>
`,
  tool: 'forecast',
  toolArg: { fuel: 'p93' },
  related: ['petrol-95-price', 'petrol-price-december-2026', 'fuel-cost-per-km', 'basic-fuel-price'],
  sources: ['cef_daily', 'cef_monthly', 'dmpr_prices'],
});
