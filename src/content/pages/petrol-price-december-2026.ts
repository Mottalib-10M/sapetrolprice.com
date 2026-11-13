import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, L = E.LATEST, F = K.F;
const NEXT = K.day(E.NEXT_CHANGE);
const keep95 = E.forecast({ product: 'p95', reliefEnds: false }), keep50 = E.forecast({ product: 'd50', reliefEnds: false });
const up95 = E.forecast({ product: 'p95', move: 5 }), dn95 = E.forecast({ product: 'p95', move: -5 });
const avg95 = E.forecast({ product: 'p95', method: 'average' });
const rest = E.WINDOW_DAYS - E.DAYS_SO_FAR;

export default definePage({
  id: 'petrol-price-december-2026', group: 'prices', order: 101, slug: 'petrol-price-december-2026',
  nav: 'December 2026 estimate', card: 'Next month’s petrol, diesel and paraffin prices from the Central Energy Fund figures to date, with every assumption you can change.',
  title: 'Petrol Price December 2026: Estimate for 95, 93 and Diesel',
  description: 'Petrol price for December 2026 in South Africa: 95, 93, diesel and paraffin estimated from the CEF daily over-recovery, with the end of the fuel levy relief.',
  h1: 'Petrol price for December 2026: the estimate, fuel by fuel',
  intro: `The petrol price for December 2026 takes effect on ${NEXT}. Pick a fuel: the estimate below uses the Central Energy Fund figures to ${K.day(L.window[1])} and the end of the levy relief.`,
  resume: `The December 2026 petrol price in South Africa will be set by the average over- or under-recovery of the window that opened on ${K.day(L.window[0])}, plus the levy changes already announced. After ${E.DAYS_SO_FAR} of about ${E.WINDOW_DAYS} business days, the Central Energy Fund (CEF) sheet of ${K.day(L.date)} shows an over-recovery of ${K.dc(L.average.p95)} a litre on petrol 95, ${K.dc(L.average.p93)} on 93, ${K.dc(L.average.d50)} on 500 ppm diesel and ${K.dc(L.average.ip)} on paraffin. Carried to the close with the latest daily figures, petrol 95 falls by ${K.dc(-F.p95.roundedRecovery)} before levies. The temporary fuel levy relief ends on 1 December, adding back ${K.dc(E.RELIEF.petrol)} on petrol and ${K.dc(E.RELIEF.diesel)} on diesel. Net: 95 at about ${K.rpl(F.p95.next)} in Gauteng (${K.dr(F.p95.change)}), 93 at ${K.rpl(F.p93.next)}, 500 ppm diesel up ${K.dc(F.d50.change)}, 50 ppm diesel up ${K.dc(F.d005.change)}, paraffin wholesale down ${K.dc(-F.ipw.change)}. These are estimates; the Department’s statement a few days before ${NEXT} gives the official figures.`,
  faqs: [
    { q: 'Will petrol go down in December 2026?', a: `On the figures to ${K.day(L.window[1])}, yes. Petrol 95 shows an over-recovery large enough to outweigh the ${K.dc(E.RELIEF.petrol)} levy relief coming back, so the estimate is a cut of about ${K.dr(-F.p95.change).replace('+', '')} a litre, to ${K.rpl(F.p95.next)} in Gauteng and ${K.rpl(F.p95.nextCoast)} at the coast. A sharp rise in oil or a weaker rand before the window closes would shrink it.` },
    { q: 'Will diesel go up in December 2026?', a: `Probably. The over-recovery on 500 ppm diesel, ${K.dc(L.average.d50)} so far, is smaller than the ${K.dc(E.RELIEF.diesel)} of levy relief that ends on 1 December. Unless the relief is extended, the wholesale price rises by about ${K.dc(F.d50.change)} to ${K.rpl(F.d50.next)} in Gauteng. If it were extended, diesel would instead fall by about ${K.dc(-keep50.change)}.` },
    { q: 'When will the official December fuel price be announced?', a: `The Department of Mineral and Petroleum Resources usually releases its media statement on the Thursday or Friday before the change, with the CEF tables attached. For ${NEXT}, that means late November. Until then, every figure for December in the press or here is an estimate built from the same CEF daily sheets.` },
    { q: 'Why do news sites give different December figures?', a: `Most differences come from three choices: whether the levy relief coming back is counted, whether the average to date or the latest days are carried forward, and the date of the CEF sheet used. With the average to date, 95 would land at ${K.rpl(avg95.next)}; with the latest days, at ${K.rpl(F.p95.next)}. The calculator shows both.` },
  ],
  body: (h) => `
<h2>Petrol price December 2026: where the figures stand</h2>
<p>The pricing window for December opened on ${K.day(L.window[0])}. The CEF publishes one sheet per business day, and the sheet of ${K.day(L.date)} comes ${E.DAYS_SO_FAR} business days in. It compares the landed cost of each fuel that day, the Basic Fuel Price, with the cost already built into November’s prices. On ${K.day(L.date)}, petrol 95 cost ${K.dc(L.bfp.p95)} a litre landed against ${K.dc(L.contribution.p95)} in the price: an over-recovery of ${K.dc(L.day.p95)} that day, well above the window average of ${K.dc(L.average.p95)}. The landed cost had fallen further in the second week, and the rand held near R${K.dec(L.zarusd)} to the dollar.</p>
<p>The estimate fills the ${rest} business days still to come with the latest daily figure, then averages the whole window as the CEF will. That projection gives ${K.dc(F.p95.projected)} for 95, rounded to ${K.dc(F.p95.roundedRecovery)} like the statement. From that over-recovery the price falls; the levy relief ending pushes it back up by ${K.dc(E.RELIEF.petrol)}.</p>
${h.table(['Fuel, Gauteng', 'Average so far', 'Latest day', 'Projected at the close', 'Levy back', 'Change', 'December'], [
    ['Petrol 95', K.dc(F.p95.averageSoFar), K.dc(F.p95.latestDay), K.dc(F.p95.projected), K.dc(F.p95.levyEffect), K.dc(F.p95.change), K.rpl(F.p95.next)],
    ['Petrol 93', K.dc(F.p93.averageSoFar), K.dc(F.p93.latestDay), K.dc(F.p93.projected), K.dc(F.p93.levyEffect), K.dc(F.p93.change), K.rpl(F.p93.next)],
    ['Diesel 500 ppm', K.dc(F.d50.averageSoFar), K.dc(F.d50.latestDay), K.dc(F.d50.projected), K.dc(F.d50.levyEffect), K.dc(F.d50.change), K.rpl(F.d50.next)],
    ['Diesel 50 ppm', K.dc(F.d005.averageSoFar), K.dc(F.d005.latestDay), K.dc(F.d005.projected), K.dc(F.d005.levyEffect), K.dc(F.d005.change), K.rpl(F.d005.next)],
    ['Paraffin', K.dc(F.ipw.averageSoFar), K.dc(F.ipw.latestDay), K.dc(F.ipw.projected), K.dc(F.ipw.levyEffect), K.dc(F.ipw.change), K.rpl(F.ipw.next)],
  ], `Cents a litre. Over-recovery positive (the price falls by it). CEF sheet of ${K.day(L.date)}; window assumed to close on ${K.day(E.WINDOW_END_ASSUMED)}.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<h2>The three assumptions behind the December estimate</h2>
<p><strong>The close of the window.</strong> The CEF does not publish the closing date in advance. In 2026, eight of the nine windows on record closed on a Thursday six days before the change (the April one on a Wednesday, two days before the 1 May holiday), so this page assumes ${K.day(E.WINDOW_END_ASSUMED)}. A day more or less barely moves the result.</p>
<p><strong>The days still to come.</strong> Carrying the latest daily gap forward came closer to the final figure than carrying the average, in every one of the nine windows of 2026 tested on the ${h.a('method', 'method page')}. If oil and the rand stay where they were on ${K.day(L.date)}, that is the right reading. If the landed cost rises by 5% for the rest of the window, the 95 estimate becomes ${K.rpl(up95.next)}; if it falls by 5%, ${K.rpl(dn95.next)}.</p>
<p><strong>The levies.</strong> The relief announced in the Medium-Term Budget Policy Statement runs from 4 November to 1 December. If it is extended, petrol 95 would fall to ${K.rpl(keep95.next)} and diesel would fall too. The slate levy, which clears past under-recoveries, also changes with each statement; it rose from 87.66c to ${K.dc(E.LAST_MONTH.slate)} in November. The ${h.a('slate-levy', 'slate levy page')} explains why it cannot be known ahead.</p>
${h.mini('forecast', { t: 'December with the relief extended', p: ['fuel', 'relief'], d: { relief: 'kept' } })}
<h2>What December means for a tank and a month</h2>
<p>A ${K.EX.litres}-litre tank of 95 costs ${K.rand(K.tank(K.EX.litres, F.p95.now))} in Gauteng today and would cost about ${K.rand(K.tank(K.EX.litres, F.p95.next))} from ${NEXT}. For a driver doing ${K.EX.kmDay} km a day on ${K.EX.days} working days at ${K.EX.l100} litres per 100 km, the month’s petrol falls by about ${K.rand(E.monthly(K.EX.kmDay, K.EX.days, K.EX.l100, -F.p95.change))}. A diesel bakkie owner goes the other way. The ${h.a('fuel-cost-per-km', 'cost per kilometre page')} works it out for your own car, and the ${h.a('diesel-price', 'diesel page')} gives the 500 and 50 ppm figures in detail.</p>
`,
  tool: 'forecast',
  related: ['petrol-price-november-2026', 'diesel-price', 'petrol-95-price', 'basic-fuel-price'],
  sources: ['cef_daily', 'cef_monthly', 'cef_2026', 'dmpr_nov', 'treasury'],
});
