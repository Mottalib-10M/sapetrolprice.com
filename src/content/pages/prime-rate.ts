import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, EX = K.EX;
const P = E.PRIME_STEPS, last = P[P.length - 1];
const at = (r: number) => E.instalment(EX.bond, r, EX.years);
const yearAgo = E.rateAt(P, '2025-11-13');
const carI = E.instalment(EX.car, E.PRIME + 2, EX.carYears);

export default definePage({
  id: 'prime-rate', group: 'rates', order: 502, slug: 'prime-rate',
  nav: 'Prime lending rate', card: 'The prime lending rate today, how it follows the repo rate, and what your bond or car instalment was at earlier rates.',
  title: 'Prime Rate 2026: 10.75% and Your Instalment Against 2025',
  description: 'Prime rate in South Africa in November 2026: 10.75% since 25 September, how prime follows the repo rate, and your bond or car instalment at past prime rates.',
  h1: 'Prime rate today and your instalment against earlier rates',
  intro: `The prime rate is ${K.rate(E.PRIME)} since ${K.day(last.from)}, the repo rate plus ${K.dec(E.PRIME - E.REPO, 1)} points. Pick an earlier date to compare your instalment.`,
  resume: `The prime lending rate is the rate South African banks charge their lowest-risk borrowers, and the reference for most variable-rate home loans, vehicle finance, personal loans and overdrafts. By convention, banks set it at the Reserve Bank’s repo rate plus ${K.dec(E.PRIME - E.REPO, 1)} percentage points, so it changes only when the Monetary Policy Committee moves the repo rate. Prime has been ${K.rate(E.PRIME)} since ${K.day(last.from)}; a year earlier, in November 2025, it was ${K.rate(yearAgo)}. On a ${K.rand(EX.bond)} bond over ${EX.years} years, the instalment at prime is ${K.rand(at(E.PRIME))} a month, against ${K.rand(at(yearAgo))} at ${K.rate(yearAgo)}. Your own rate is prime plus or minus the margin in your agreement: a borrower at prime minus 0.5 pays ${K.rand(at(E.PRIME - 0.5))}, one at prime plus 1 pays ${K.rand(at(E.PRIME + 1))}. Vehicle finance is usually priced above prime: ${K.rand(EX.car)} over ${EX.carYears} years at prime plus 2 costs ${K.rand(carI)} a month.`,
  faqs: [
    { q: 'What is the prime lending rate in South Africa today?', a: `${K.rate(E.PRIME)} since ${K.day(last.from)}, according to the Reserve Bank’s published series read on ${K.day(E.RATES_DATE)}. It is ${K.dec(E.PRIME - E.REPO, 1)} points above the repo rate of ${K.rate(E.REPO)}, the gap banks have kept for years, and it will change only if the Monetary Policy Committee moves the repo rate.` },
    { q: 'What does prime minus 0.5 mean on a home loan?', a: `That your rate is half a percentage point below prime: ${K.rate(E.PRIME - 0.5)} today. The margin is fixed in your loan agreement and depends on your credit record, deposit and the bank. On ${K.rand(EX.bond)} over ${EX.years} years, it saves ${K.rand(at(E.PRIME) - at(E.PRIME - 0.5))} a month against prime.` },
    { q: 'When will the prime rate change next?', a: `Only if the Monetary Policy Committee changes the repo rate. Its next announcement is on ${K.day(E.MPC_NEXT[0])}, then ${K.day(E.MPC_NEXT[1])}. When the repo rate moves, banks usually move prime by the same amount from the following day. This site does not predict the decision.` },
  ],
  body: (h) => `
<h2>Prime rate and your instalment since 2023</h2>
<p>The table gives each prime rate since 2023 and the instalment it meant on the example bond of ${K.rand(EX.bond)} over ${EX.years} years. The highest rate of the period, ${K.rate(Math.max(...P.map((p) => p.rate)))}, meant ${K.rand(at(Math.max(...P.map((p) => p.rate))))} a month on the same bond.</p>
${h.table(['From', 'Prime', 'Instalment', 'Against today'], [...P].reverse().map((p) => [K.day(p.from), K.rate(p.rate), K.rand(at(p.rate)), `${at(p.rate) >= at(E.PRIME) ? '+' : '-'}${K.rand(Math.abs(at(p.rate) - at(E.PRIME)))}`]), `South African Reserve Bank, prime lending rate series read on ${K.day(E.RATES_DATE)}. Equal monthly payments over ${EX.years} years.`, ['l', 'r', 'r', 'r'])}
<h2>Prime rate, repo rate and the gap between them</h2>
<p>Prime is not set by law. It is each bank’s own reference rate, but the large banks have kept it at the repo rate plus 3.5 points for many years, and the SARB publishes it as a series beside its own policy rate. That is why a repo decision passes to almost every variable-rate loan in the country the next day.</p>
<p>Other rates sit around prime. The interbank rate JIBAR and the treasury bill rates follow the repo rate closely, while personal loans and credit cards are priced above prime. The ${h.a('interest-rates-south-africa', 'interest rates page')} sets them side by side.</p>
${h.mini('car', { t: 'A car instalment and its petrol together', p: ['loan', 'margin', 'km'] })}
<h2>Prime and the cost of driving</h2>
<p>A car on finance moves with both prime and the fuel price. At prime plus 2, the example car loan of ${K.rand(EX.car)} costs ${K.rand(carI)} a month over ${EX.carYears} years, and a 0.25% rise in prime adds about ${K.rand(E.instalment(EX.car, E.PRIME + 2.25, EX.carYears) - carI)}. Petrol for ${K.num(EX.kmDay * EX.days)} km a month adds ${K.rand(E.monthly(EX.kmDay, EX.days, EX.l100, K.F.p95.now))} at the November price. The ${h.a('fuel-cost-per-km', 'cost per kilometre page')} shows the fuel side, and the ${h.a('bond-repayment', 'bond calculator')} the home loan side.</p>
`,
  tool: 'prime',
  related: ['repo-rate', 'bond-repayment', 'interest-rates-south-africa', 'fuel-cost-per-km'],
  sources: ['sarb_rates', 'sarb_mpc'],
});
