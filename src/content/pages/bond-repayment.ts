import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, EX = K.EX;
const at = (loan: number, r: number, y = EX.years) => E.instalment(loan, r, y);
const loans = [750000, 1000000, 1500000, 2000000, 3000000];
const i0 = at(EX.bond, E.PRIME);
const firstInterest = (EX.bond * E.PRIME) / 100 / 12;

export default definePage({
  id: 'bond-repayment', group: 'rates', order: 503, slug: 'bond-repayment',
  nav: 'Bond repayment', card: 'Your monthly bond instalment at today’s prime rate, with the effect of a 0.25% move at the next Reserve Bank decision.',
  title: 'Bond Repayment 2026: Instalment at Prime and After a Move',
  description: 'Bond repayment in South Africa at prime of 10.75% in November 2026: monthly instalment by amount and term, total interest, and the effect of a 0.25% repo move.',
  h1: 'Bond repayment at today’s prime rate, and after a move',
  intro: `This bond repayment calculator uses prime at ${K.rate(E.PRIME)}: ${K.rand(EX.bond)} over ${EX.years} years costs ${K.rand(i0)} a month. Enter your amount, term and margin.`,
  resume: `A South African home loan, or bond, is usually repaid in equal monthly instalments at a variable rate linked to prime. The instalment depends on three things: the amount, the term and the rate. At prime of ${K.rate(E.PRIME)}, in force since ${K.day(E.PRIME_STEPS[E.PRIME_STEPS.length - 1].from)}, a ${K.rand(EX.bond)} bond over ${EX.years} years costs ${K.rand(i0)} a month; over 30 years it would cost ${K.rand(at(EX.bond, E.PRIME, 30))} a month but far more interest in total. Over ${EX.years} years at this rate you would pay ${K.rand(E.interestTotal(EX.bond, E.PRIME, EX.years))} of interest on top of the capital. In the first month, ${K.rand(firstInterest)} of the instalment is interest and only ${K.rand(i0 - firstInterest)} reduces the debt. Each 0.25% move in the repo rate passes to prime and changes this instalment by about ${K.rand(at(EX.bond, E.PRIME + 0.25) - i0)} a month. The next Monetary Policy Committee decision is announced on ${K.day(E.MPC_NEXT[0])}. Bank fees, bond registration costs and insurance are not included.`,
  faqs: [
    { q: 'How much is the bond repayment on R1 million?', a: `At prime of ${K.rate(E.PRIME)}, ${K.rand(at(1000000, E.PRIME))} a month over 20 years and ${K.rand(at(1000000, E.PRIME, 30))} over 30 years. At prime minus 0.5, the 20-year instalment falls to ${K.rand(at(1000000, E.PRIME - 0.5))}. A monthly service fee charged by the bank comes on top of each of these figures.` },
    { q: 'Does paying extra into a bond save interest?', a: `Yes. Interest is charged on the balance, so any extra payment reduces every interest charge that follows. In the first month of a ${K.rand(EX.bond)} bond at prime, ${K.rand(firstInterest)} of the instalment is interest. Paying an extra amount each month shortens the term and cuts the total interest; your bond agreement sets how extra payments are handled.` },
    { q: 'How much does a 0.25% rate hike add to a R1 million bond?', a: `About ${K.rand(at(1000000, E.PRIME + 0.25) - at(1000000, E.PRIME))} a month over 20 years, from ${K.rand(at(1000000, E.PRIME))} to ${K.rand(at(1000000, E.PRIME + 0.25))}, or ${K.rand((at(1000000, E.PRIME + 0.25) - at(1000000, E.PRIME)) * 12)} a year. A cut of the same size saves almost the same amount. The effect is smaller on a bond with fewer years left, because a larger share of each payment is then capital.` },
  ],
  body: (h) => `
<h2>Bond repayment by amount and term</h2>
<p>The table gives the monthly instalment at prime for common bond amounts over 20 and 30 years, and the total interest over 20 years.</p>
${h.table(['Bond', '20 years', '30 years', 'Interest over 20 years'], loans.map((l) => [K.rand(l), K.rand(at(l, E.PRIME, 20)), K.rand(at(l, E.PRIME, 30)), K.rand(E.interestTotal(l, E.PRIME, 20))]), `Prime ${K.rate(E.PRIME)} (South African Reserve Bank, ${K.day(E.RATES_DATE)}). Equal monthly payments, rate unchanged over the term.`, ['l', 'r', 'r', 'r'])}
<h2>How the instalment is calculated</h2>
<p>The calculator uses the standard formula for equal monthly payments: the monthly rate is the annual rate divided by 12, and the instalment is the amount that clears the debt exactly after the last month, interest included. It assumes the rate stays where it is. In practice prime moves with the repo rate, and the bank recalculates your instalment each time over the remaining term.</p>
<p>The term matters as much as the rate. Moving from 20 to 30 years cuts the ${K.rand(EX.bond)} instalment from ${K.rand(i0)} to ${K.rand(at(EX.bond, E.PRIME, 30))}, but the total interest rises from ${K.rand(E.interestTotal(EX.bond, E.PRIME, 20))} to ${K.rand(E.interestTotal(EX.bond, E.PRIME, 30))}.</p>
${h.mini('repo', { t: 'The decision of 19 November and your bond', p: ['bp', 'loan'] })}
<h2>Bond repayment and the fuel bill</h2>
<p>For many households the bond and the fuel bill are the two costs that move with decisions made elsewhere. In December 2026 they may move in opposite directions: the ${h.a('petrol-price-december-2026', 'petrol estimate')} points to ${K.dr(K.F.p95.change)} a litre on 95, about ${K.rand(E.monthly(EX.kmDay, EX.days, EX.l100, -K.F.p95.change))} less a month for a ${K.num(EX.kmDay * EX.days)} km commute, while a 0.25% hike would add ${K.rand(at(EX.bond, E.PRIME + 0.25) - i0)} to the example bond. The ${h.a('repo-rate', 'repo rate page')} gives the history of decisions, and the ${h.a('mpc-meeting-dates', 'MPC dates')} the calendar.</p>
`,
  tool: 'bond',
  related: ['repo-rate', 'prime-rate', 'mpc-meeting-dates', 'interest-rates-south-africa'],
  sources: ['sarb_rates', 'sarb_mpc'],
});
