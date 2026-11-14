import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.F.p95, D = K.F.d50, H = E.HISTORY;
const km = 1500, lp = 8, ld = 6.5;
const cost = (l100: number, cpl: number) => (km * l100 / 100) * cpl / 100;
const spread = H.map((x) => ({ date: x.date, gap: x.d50[0] - x.p95[0] }));
const dearer = spread.filter((x) => x.gap > 0);
const firstDearer = dearer[0];

export default definePage({
  id: 'diesel-vs-petrol-price', group: 'costs', order: 302, slug: 'diesel-vs-petrol-price',
  nav: 'Diesel against petrol', card: 'Why diesel costs more than petrol per litre in 2026, and whether a diesel car still saves money over a month of driving.',
  title: 'Diesel vs Petrol Price 2026: Which Car Costs Less to Run?',
  description: 'Diesel vs petrol price in South Africa in 2026: why diesel costs more per litre, the running cost of each car over your distance, and the change on 2 December.',
  h1: 'Diesel vs petrol price: which car costs less to run now',
  intro: `In the diesel vs petrol price contest, 500 ppm diesel costs ${K.rpl(D.now)} wholesale in Gauteng against ${K.rpl(P.now)} for petrol 95. Enter your distance to compare running costs.`,
  resume: `For most of the period since 2024, diesel was cheaper per litre than petrol in South Africa: in April 2024, 500 ppm diesel cost ${K.rpl(H[0].d50[0])} wholesale in Gauteng against ${K.rpl(H[0].p95[0])} for petrol 95. That changed in April 2026, when international diesel prices rose faster than petrol and diesel became the dearer fuel per litre. In November 2026 it costs ${K.rpl(D.now)} wholesale against ${K.rpl(P.now)} for 95 at the pump, before the station adds its diesel margin. A diesel car still uses less fuel for the same distance: at ${K.num(km)} km a month, a petrol car using ${lp} litres per 100 km spends ${K.rand(cost(lp, P.now))}, a diesel car using ${ld} litres ${K.rand(cost(ld, D.now))} at the wholesale price. If the December estimates hold, petrol falls by ${K.c(-P.change)} and diesel rises by ${K.c(D.change)}, and the diesel saving shrinks to ${K.rand(cost(lp, P.next) - cost(ld, D.next))} a month. The station’s own margin on diesel reduces it further.`,
  faqs: [
    { q: 'Is diesel more expensive than petrol in South Africa now?', a: `Per litre, yes: diesel has been the dearer fuel in ${dearer.length} of the ${H.filter((x) => x.date >= firstDearer.date).length} changes since April 2026, including November. This month 500 ppm diesel costs ${K.c(D.now - P.now)} more wholesale than petrol 95 at the pump in Gauteng, and stations add their margin on diesel. Before that, diesel had been cheaper than petrol in every month since April 2024.` },
    { q: 'Does a diesel car still save money?', a: `It usually still costs less per kilometre, because a diesel engine uses less fuel for the same work. With ${ld} litres per 100 km against ${lp} for a similar petrol car, the diesel car saves ${K.rand(cost(lp, P.now) - cost(ld, D.now))} on ${K.num(km)} km a month at November prices, before the station margin on diesel. The gap is smaller than it was in 2025.` },
    { q: 'Why does diesel react more to world prices than petrol?', a: `Because a larger share of its price is the fuel itself. The landed cost makes up ${K.pct(K.S.d50.bfp / K.S.d50.total, 0)} of the wholesale diesel price this month, against ${K.pct(K.S.p95.bfp / K.S.p95.total, 0)} of the pump price of 95, which carries a retail margin and a higher fuel levy. A 10% move in the landed cost therefore moves diesel by more rand.` },
  ],
  body: (h) => `
<h2>Diesel vs petrol price since 2024</h2>
<p>The table shows, at a few moments since April 2024, the Gauteng price of petrol 95 at the pump and of 500 ppm diesel wholesale, and the gap between them. A negative gap means diesel was cheaper.</p>
${h.table(['From', 'Petrol 95 (pump)', 'Diesel 500 ppm (wholesale)', 'Diesel minus petrol'], H.filter((x, i) => i % 4 === 0 || i === H.length - 1).map((x) => [K.day(x.date), K.rpl(x.p95[0]), K.rpl(x.d50[0]), K.c(x.d50[0] - x.p95[0])]), 'Rand a litre, Gauteng. CEF statement of 30 October 2026, Annexure 1.', ['l', 'r', 'r', 'r'])}
<p>Diesel became dearer than petrol per litre with the change of ${K.day(firstDearer.date)}, and has stayed dearer in ${dearer.length} of the ${H.filter((x) => x.date >= firstDearer.date).length} changes since. The comparison is not quite fair to petrol: the diesel figure is wholesale, before the station’s margin, while the petrol figure already includes the regulated retail margin of ${K.c(K.S.p95.retail)} a litre.</p>
<h2>Why the two moved apart in 2026</h2>
<p>Three things set diesel apart this year. First, its landed cost rose more: for the April change the under-recovery was ${K.c(-E.MONTHS[3].recovery!.d50)} a litre on diesel against ${K.c(-E.MONTHS[3].recovery!.p95)} on petrol. Second, the levy reliefs were not the same size: the government cut more from diesel than from petrol in May, June and November, which softened the rises but also means a larger step up when relief ends, ${K.c(E.RELIEF.diesel)} on 2 December against ${K.c(E.RELIEF.petrol)} on petrol. Third, the slate levy is the same in cents on both fuels.</p>
${h.mini('rand', { t: 'How a weaker rand moves each fuel', p: ['fuel', 'move'], d: { fuel: 'd50' } })}
<h2>Choosing between a diesel and a petrol car</h2>
<p>The fuel bill is only one line. Diesel cars often cost more to buy and to service, and the cleaner 50 ppm diesel that modern engines need costs ${K.c(K.F.d005.now - D.now)} more than 500 ppm. Where you drive matters too: diesel engines save most on long highway distances and towing, petrol engines are often cheaper for short town trips. Run the calculator at the top with your own distance and both consumptions, then add the finance cost on the ${h.a('prime-rate', 'prime rate page')}. The ${h.a('diesel-price', 'diesel page')} and the ${h.a('petrol-95-price', 'petrol 95 page')} carry each fuel’s own December estimate.</p>
`,
  tool: 'gap',
  related: ['diesel-price', 'fuel-cost-per-km', 'petrol-95-price', 'rand-and-oil-price'],
  sources: ['cef_2026', 'cef_monthly', 'cef_daily', 'dmpr_prices'],
});
