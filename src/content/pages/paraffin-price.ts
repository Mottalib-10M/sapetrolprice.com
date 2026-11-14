import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, L = E.LATEST, P = K.F.ipw, N = E.LAST_MONTH;
const capNext = N.smnrp + Math.round(P.change * E.SMNRP_RATIO);
const months = E.MONTHS;
const lo = months.reduce((a, b) => (b.smnrp < a.smnrp ? b : a)), hi = months.reduce((a, b) => (b.smnrp > a.smnrp ? b : a));

export default definePage({
  id: 'paraffin-price', group: 'fuels', order: 204, slug: 'paraffin-price',
  nav: 'Paraffin', card: 'The maximum shop price of illuminating paraffin, the wholesale price behind it and the estimated cut on 2 December.',
  title: 'Paraffin Price 2026: Maximum Retail Price and December Cut',
  description: 'Paraffin price in South Africa for November 2026: the single maximum national retail price, the wholesale price and the cut estimated for 2 December 2026.',
  h1: 'Paraffin price: the maximum a shop may charge',
  intro: `The paraffin price at the shop is capped at ${K.rpl(N.smnrp)} a litre until 1 December, the single maximum national retail price. Enter what you buy in a month.`,
  resume: `Illuminating paraffin, used for cooking, heating and light in many South African homes, has two regulated prices. The wholesale price, ${K.rpl(P.now)} a litre in Gauteng and ${K.rpl(P.nowCoast)} at the coast since ${K.day(N.effective)}, is what depots charge traders. The single maximum national retail price (SMNRP), ${K.rpl(N.smnrp)} a litre, is the most any shop in the country may charge a household. Both rose sharply in 2026: the maximum went from ${K.rpl(lo.smnrp)} in ${K.mon(lo.effective)} to ${K.rpl(hi.smnrp)} in ${K.mon(hi.effective)}, because paraffin carries no fuel levy, so the levy relief granted on petrol and diesel did not apply to it. The Central Energy Fund sheet of ${K.day(L.date)} shows an over-recovery of ${K.c(L.average.ip)} so far on paraffin. Carried to the close of the window, the wholesale price would fall by about ${K.c(-P.change)}, and the shop maximum by about ${K.c(N.smnrp - capNext)} to ${K.rpl(capNext)} from ${K.day(E.NEXT_CHANGE)}. Twenty litres a month would cost up to ${K.rand(K.tank(20, capNext))} instead of ${K.rand(K.tank(20, N.smnrp))}.`,
  faqs: [
    { q: 'What is the maximum price of paraffin per litre?', a: `${K.rpl(N.smnrp)} a litre from ${K.day(N.effective)} to 1 December 2026, anywhere in South Africa. A shop may sell for less but not for more. The figure adds the margins of the distributor and the shop to the wholesale price, which is why it sits well above the wholesale price of ${K.rpl(P.now)} in Gauteng.` },
    { q: 'Why did paraffin go up in November when petrol stayed flat?', a: `Petrol and diesel received a fuel levy relief in November; paraffin pays no fuel levy, so there was nothing to cut. It took its full under-recovery of ${K.c(-N.recovery!.ipw)} a litre for the window, and the shop maximum rose from ${K.rpl(N.smnrpPrev)} to ${K.rpl(N.smnrp)}.` },
    { q: 'Will paraffin be cheaper in December 2026?', a: `On the CEF figures to ${K.day(L.window[1])}, yes. The wholesale price would fall by about ${K.c(-P.change)} and, if the maximum retail price moves as it did in 2026, the shop maximum would drop to about ${K.rpl(capNext)} a litre. The end of the levy relief does not affect paraffin.` },
  ],
  body: (h) => `
<h2>Paraffin price in 2026, statement by statement</h2>
<p>Each statement of the Central Energy Fund sets the change in the wholesale price of illuminating paraffin and the new single maximum national retail price. The table lists both for every change of 2026.</p>
${h.table(['Change of', 'Wholesale change', 'Maximum retail price', 'Rand to the dollar'], months.map((m) => [K.day(m.effective), K.dc(m.change.ipw as number), K.rpl(m.smnrp), `R${K.dec(m.zarusd, 2)}`]), 'CEF media statements of 2026. Wholesale change in cents a litre; maximum retail price per litre, national.', ['l', 'r', 'r', 'r'])}
<h2>From the wholesale price to the shop maximum</h2>
<p>The maximum retail price is built on the wholesale price and adds the margins allowed to the distributor and the retailer. Illuminating paraffin is zero-rated for VAT. In each statement from February to November 2026 the maximum moved by more than the wholesale change. Over the statements of 2026 where both moved, the maximum changed by ${K.dec(E.SMNRP_RATIO, 2)} times the wholesale change on average. That ratio is what this site uses for December: it is a rule of thumb read in the statements, not a published formula.</p>
<p>The wholesale price is ${K.rpl(P.now)} in Gauteng, ${K.rpl(P.nowCoast)} at the coast. It carries no fuel levy, no Road Accident Fund levy and no slate levy. The landed cost accounts for ${K.rpl(L.contribution.ip)} of it this month, the rest being margins, storage and transport.</p>
${h.mini('forecast', { t: 'Paraffin wholesale on 2 December', p: ['move'], d: { fuel: 'ipw', litres: 20 } })}
<h2>Paying less than the maximum</h2>
<p>The maximum is a ceiling, not a set price: a shop may charge less, and prices vary from one outlet to the next. Compare the price per litre, not per bottle, since bottle sizes differ. If a shop charges more than ${K.rpl(N.smnrp)} a litre, it breaks the regulated maximum, and the Department of Mineral and Petroleum Resources is the authority to report it to.</p>
<p>For other household fuels, the ${h.a('lpg-gas-price', 'LPG gas page')} gives the maximum price of a cylinder refill, and the ${h.a('fuel-price-coast-vs-inland', 'coast against inland page')} shows the zone gap on the wholesale price.</p>
`,
  tool: 'paraffin',
  related: ['lpg-gas-price', 'diesel-price', 'petrol-price-december-2026', 'basic-fuel-price'],
  sources: ['cef_monthly', 'cef_2026', 'cef_daily', 'dmpr_prices'],
});
