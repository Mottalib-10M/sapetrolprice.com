import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, M = E.MONTHS, N = E.LAST_MONTH, O = E.PREV_MONTH;
const peak = M.reduce((a, b) => (b.slate > a.slate ? b : a));
const firstOn = M.find((m) => m.slate > 0)!;

export default definePage({
  id: 'slate-levy', group: 'why', order: 403, slug: 'slate-levy',
  nav: 'Slate levy', card: 'What the slate levy is, why it came back in May 2026, how it moved each month and what it costs you.',
  title: 'Slate Levy 2026: Why It Rose to 135.84c and What It Costs',
  description: 'Slate levy on petrol and diesel in South Africa in 2026: how the self-adjusting mechanism works, each rate since May 2026 and what it adds to your fuel bill.',
  h1: 'Slate levy: why it rose in November and what it costs you',
  intro: `The slate levy is ${K.c(N.slate)} a litre on petrol and diesel since ${K.day(N.effective)}, up from ${K.c(O.slate)}. Enter your monthly litres to see what it costs.`,
  resume: `The slate is the running balance of all the over- and under-recoveries the fuel industry has carried between price changes. When pump prices lag behind the landed cost, oil companies sell below cost for a few weeks and the slate goes negative; when prices lag on the way down, it recovers. To stop the balance from growing, a self-adjusting slate levy mechanism has applied since 2009: a levy is added to every litre of petrol and diesel only when the slate is negative by more than R500 million, and it adjusts each month with the balance. In 2026 the levy was zero until April. The large under-recoveries of March and April pushed the slate into deficit, and from ${K.day(firstOn.effective)} a levy of ${K.c(firstOn.slate)} applied. It peaked at ${K.c(peak.slate)} in ${K.mon(peak.effective)}, fell to ${K.c(Math.min(...M.filter((m) => m.slate > 0).map((m) => m.slate)))} in August and rose again to ${K.c(N.slate)} in November, ${K.rand(K.tank(150, N.slate))} on 150 litres a month.`,
  faqs: [
    { q: 'What is the slate levy on petrol?', a: `A levy added to petrol and diesel prices to recover past under-recoveries, the weeks when fuel was sold below its landed cost. It is ${K.c(N.slate)} a litre since ${K.day(N.effective)}. It applies only while the cumulative balance, called the slate, is negative by more than R500 million, and it falls back to zero once the balance is restored.` },
    { q: 'Why did the slate levy go up in November 2026?', a: `Because the under-recoveries of the previous windows deepened the deficit of the slate. Under the self-adjusting mechanism the levy follows the balance, so it rose from ${K.c(O.slate)} to ${K.c(N.slate)} a litre, which took ${K.c(N.slate - O.slate)} of the November levy relief straight back.` },
    { q: 'Will the slate levy change in December?', a: 'Probably, since it has changed with every statement since May 2026, but it cannot be computed from the daily figures: it depends on the slate balance at the end of the window, which the CEF publishes only with the statement. The December estimate on this site keeps it unchanged and lets you test a move of up to 50c either way.' },
  ],
  body: (h) => `
<h2>Slate levy month by month in 2026</h2>
${h.table(['From', 'Slate levy', 'Change', 'On 150 litres'], M.map((m, i) => [K.day(m.effective), K.c(m.slate), i ? K.dc(m.slate - M[i - 1].slate) : 'none', K.rand(K.tank(150, m.slate))]), 'Cents a litre, petrol and diesel alike. CEF media statements of 2026.', ['l', 'r', 'r', 'r'])}
<p>The statement of January 2026 is explicit: “the Slate Levy on petrol and diesel will remain at 0.00 c/l”. That held to April. The under-recoveries that built up in March were too large for the price changes to absorb, and the slate balance went below the R500 million threshold. The levy that followed is the industry being paid back, a few cents a litre at a time.</p>
<h2>How the self-adjusting slate levy mechanism works</h2>
<p>Each statement reports the cumulative balance of the slate at the end of the previous month. The mechanism, introduced on 7 January 2009 and revised on 7 September 2022, ties the levy to that balance: the deeper the deficit, the higher the levy, by steps set in the Department’s published rules. When the balance comes back above the threshold, the levy returns to zero. Because over-recoveries also flow into the slate, a month when prices are above cost helps reduce the levy that follows.</p>
<p>This is why the levy cannot be forecast from the daily sheets. The daily figures give the over- or under-recovery of the window, but the balance also depends on volumes sold and on adjustments the CEF makes when it closes the month. The ${h.a('petrol-price-december-2026', 'December calculator')} lets you set your own assumption.</p>
${h.mini('recovery', { t: 'From a window gap to a price change', p: ['gap', 'side'] })}
<h2>Slate levy and the levy relief</h2>
<p>The November statement shows how the two can cancel out. Petrol received ${K.c(-E.RELIEF.petrol)} of fuel levy relief, but the slate levy rose by ${K.c(N.slate - O.slate)} and the under-recovery added ${K.c(-Math.round(N.recovery!.p95))}, so the pump price moved by ${K.dc(N.change.p95)}. The ${h.a('petrol-price-november-2026', 'November page')} sets out that arithmetic, and the ${h.a('fuel-levy', 'fuel levy page')} covers the relief itself.</p>
`,
  tool: 'slate',
  related: ['fuel-levy', 'petrol-price-november-2026', 'basic-fuel-price', 'what-is-in-a-litre-of-petrol'],
  sources: ['cef_monthly', 'cef_2026', 'dmpr_structure'],
});
