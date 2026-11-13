import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, S = K.S.p95, D = K.S.d50, N = E.LAST_MONTH;
const share = (x: number) => K.pct(x / S.total, 0);
const full = { ...S, fuelLevy: E.LEVY_FULL.petrol };
const levied = S.taxes + S.slate;

export default definePage({
  id: 'what-is-in-a-litre-of-petrol', group: 'why', order: 401, slug: 'what-is-in-a-litre-of-petrol',
  nav: 'What a litre pays for', card: 'Every line of the regulated petrol price: landed fuel, fuel levy, Road Accident Fund, slate levy, margins and transport, in cents and in rand.',
  title: 'Petrol Price Breakdown 2026: Taxes, Levies and Margins',
  description: 'Petrol price breakdown for South Africa in November 2026: landed fuel, fuel levy, RAF levy, slate levy, margins and transport in each litre of 95 and diesel.',
  h1: 'Petrol price breakdown: what each litre of 95 pays for',
  intro: `This petrol price breakdown splits the ${K.rpl(S.total)} of a litre of 95 in Gauteng into its regulated parts. Enter the litres you buy to see the taxes in rand.`,
  resume: `Every litre of petrol 95 sold in Gauteng since ${K.day(N.effective)} costs ${K.rpl(S.total)}, and each cent of it is set by a published formula. The fuel itself, landed at a South African port at international prices, is ${K.rpl(S.bfp)}, ${share(S.bfp)} of the price. The general fuel levy, which goes to the National Treasury, is ${K.dc(S.fuelLevy)} during the November relief (${K.dc(E.LEVY_FULL.petrol)} normally). The Road Accident Fund levy is ${K.dc(S.raf)}, the slate levy ${K.dc(S.slate)}, customs and excise ${K.dc(S.customs)}. Together, taxes and levies take ${K.rpl(levied)}, ${share(levied)}. The station’s retail margin is ${K.dc(S.retail)}, the wholesale margin ${K.dc(S.wholesale)}, storage and distribution ${K.dc(S.storage)}, and transport from the coast to Gauteng ${K.dc(S.zone)}. No VAT is charged on petrol in South Africa. With the full fuel levy back on ${K.day(E.NEXT_CHANGE)}, taxes and levies would be ${K.rpl(levied + E.RELIEF.petrol)} of a litre at the same landed cost.`,
  faqs: [
    { q: 'How much tax is in a litre of petrol in South Africa?', a: `In November 2026, ${K.rpl(levied)} of the ${K.rpl(S.total)} a litre of 95 costs in Gauteng: general fuel levy ${K.dc(S.fuelLevy)}, Road Accident Fund levy ${K.dc(S.raf)}, slate levy ${K.dc(S.slate)} and small duties. That is ${share(levied)} of the price, during a month of levy relief. With the full levy it would be about ${K.pct((levied + E.RELIEF.petrol) / (S.total + E.RELIEF.petrol), 0)}.` },
    { q: 'Is VAT charged on petrol in South Africa?', a: 'No. Petrol and diesel are zero-rated for VAT. The government taxes them through the general fuel levy and the Road Accident Fund levy instead, which are fixed amounts in cents per litre rather than a percentage, so the tax per litre does not rise when oil does.' },
    { q: 'Where does the Road Accident Fund levy go?', a: `To the Road Accident Fund, which compensates people injured in road accidents in South Africa and the families of those killed. It is ${K.dc(S.raf)} a litre on petrol and diesel, a fixed amount set in the national budget, and it was not part of the November levy relief.` },
  ],
  body: (h) => `
<h2>Petrol price breakdown, line by line</h2>
<p>The table follows Annexure 1 of the Central Energy Fund statement of 30 October 2026, which gives the regulated price structure in Gauteng from ${K.day(N.effective)}. Petrol 95 is a pump price; 500 ppm diesel is a wholesale price, so it has no retail margin.</p>
${h.table(['Line of the price', 'Petrol 95', 'Share', 'Diesel 500 ppm'], [
    ['Basic Fuel Price (landed fuel)', K.dc(S.bfp), share(S.bfp), K.dc(D.bfp)],
    ['General fuel levy (during the relief)', K.dc(S.fuelLevy), share(S.fuelLevy), K.dc(D.fuelLevy)],
    ['Road Accident Fund levy', K.dc(S.raf), share(S.raf), K.dc(D.raf)],
    ['Slate levy', K.dc(S.slate), share(S.slate), K.dc(D.slate)],
    ['Customs and excise, other small levies', K.dc(S.customs + S.ppl), share(S.customs + S.ppl), K.dc(D.customs + D.ppl)],
    ['Retail margin (station)', K.dc(S.retail), share(S.retail), 'none'],
    ['Wholesale margin', K.dc(S.wholesale), share(S.wholesale), K.dc(D.wholesale)],
    ['Secondary storage and distribution', K.dc(S.storage), share(S.storage), K.dc(D.storage)],
    ['Zone differential (transport to Gauteng)', K.dc(S.zone), share(S.zone), K.dc(D.zone)],
    ['Total, Gauteng', K.rpl(S.total), '100%', K.rpl(D.total)],
  ], 'Cents a litre. Rounding to the nearest cent on petrol not shown. CEF statement of 30 October 2026, Annexure 1.', ['l', 'r', 'r', 'r'])}
<h2>The parts that move and the parts that do not</h2>
<p>Only the Basic Fuel Price changes every month, with oil product prices, freight and the rand. The ${h.a('basic-fuel-price', 'Basic Fuel Price page')} explains how the CEF measures it each business day. The fuel levy and the Road Accident Fund levy are set by the Minister of Finance in the budget, normally once a year in April; 2026 was unusual, with relief periods in April to June and in November. The margins and the transport costs are reviewed by the Department once a year. The slate levy has changed with every statement since May 2026.</p>
<p>When the full fuel levy returns, a litre of 95 at the same landed cost would carry ${K.dc(full.fuelLevy)} of fuel levy instead of ${K.dc(S.fuelLevy)}, and the share of taxes and levies would rise from ${share(levied)} to ${K.pct((levied + E.RELIEF.petrol) / (S.total + E.RELIEF.petrol), 0)}.</p>
${h.mini('levy', { t: 'The fuel levy and RAF levy you pay in a year', p: ['litres'], d: { litres: 150 } })}
<h2>Who gets what from a 50-litre tank</h2>
<p>Filling 50 litres of 95 in Gauteng for ${K.rand(K.tank(50, S.total))}, you pay about ${K.rand(K.tank(50, S.bfp))} for the fuel itself, ${K.rand(K.tank(50, S.fuelLevy))} to the Treasury through the fuel levy, ${K.rand(K.tank(50, S.raf))} to the Road Accident Fund, ${K.rand(K.tank(50, S.slate))} through the slate levy, ${K.rand(K.tank(50, S.retail))} to the station and ${K.rand(K.tank(50, S.wholesale + S.storage + S.zone))} to the wholesaler and the logistics chain. The ${h.a('fuel-levy', 'fuel levy page')} and the ${h.a('slate-levy', 'slate levy page')} explain those two lines in detail.</p>
`,
  tool: 'structure',
  related: ['fuel-levy', 'slate-levy', 'basic-fuel-price', 'petrol-95-price'],
  sources: ['cef_2026', 'dmpr_structure', 'treasury'],
});
