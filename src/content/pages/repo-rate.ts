import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, EX = K.EX;
const steps = E.REPO_STEPS, last = steps[steps.length - 1], prev = steps[steps.length - 2];
const peak = steps.reduce((a, b) => (b.rate > a.rate ? b : a)), low = steps.filter((s) => s.from > peak.from).reduce((a, b) => (b.rate < a.rate ? b : a));
const i0 = E.instalment(EX.bond, E.PRIME, EX.years), up = E.instalment(EX.bond, E.PRIME + 0.25, EX.years), dn = E.instalment(EX.bond, E.PRIME - 0.25, EX.years);

export default definePage({
  id: 'repo-rate', group: 'rates', order: 501, slug: 'repo-rate',
  nav: 'Repo rate', card: 'The Reserve Bank’s repo rate today, every change since 2023, and what the decision of 19 November does to a bond at prime.',
  title: 'Repo Rate 2026: 7.25% Now and the 19 November Decision',
  description: 'Repo rate in South Africa in November 2026: 7.25% since 25 September, every change since 2023, and what a 0.25% move on 19 November 2026 means for your bond.',
  h1: 'Repo rate today and what the next decision means for your bond',
  intro: `The repo rate is ${K.rate(E.REPO)} since ${K.day(last.from)}. The Reserve Bank announces its next decision on ${K.day(E.MPC_NEXT[0])}: pick a move to see your instalment change.`,
  resume: `The repo rate is the rate at which the South African Reserve Bank (SARB) lends to commercial banks, and the main tool of its Monetary Policy Committee (MPC) to keep inflation near target. Banks set their prime lending rate at the repo rate plus ${K.dec(E.PRIME - E.REPO, 1)} percentage points, and most home loans, car finance and overdrafts are priced from prime. The repo rate has been ${K.rate(E.REPO)} since ${K.day(last.from)}, when it rose from ${K.rate(prev.rate)}; prime is ${K.rate(E.PRIME)}. It peaked at ${K.rate(peak.rate)} from May 2023, then came down in steps to ${K.rate(low.rate)} in November 2025, before two increases in 2026. The next announcement is on ${K.day(E.MPC_NEXT[0])}. On a ${K.rand(EX.bond)} bond over ${EX.years} years at prime, the instalment is ${K.rand(i0)} a month: a 0.25% hike would add ${K.rand(up - i0)}, a 0.25% cut would save ${K.rand(i0 - dn)}. This site does not predict the committee’s decision.`,
  faqs: [
    { q: 'What is the repo rate in South Africa now?', a: `${K.rate(E.REPO)}, since ${K.day(last.from)}, as published in the Reserve Bank’s daily series (read on ${K.day(E.RATES_DATE)}). Prime, at ${K.rate(E.PRIME)}, follows it at ${K.dec(E.PRIME - E.REPO, 1)} points above. The rate stays until the Monetary Policy Committee changes it; its next announcement is on ${K.day(E.MPC_NEXT[0])}.` },
    { q: 'How does the repo rate affect my bond?', a: `Your bond is usually priced at prime plus or minus a margin, and prime moves with the repo rate on the day after an announcement. A move of 0.25% changes the instalment on a ${K.rand(EX.bond)} bond over ${EX.years} years by about ${K.rand(up - i0)} a month. Your bank’s statement shows from which instalment the new rate applies.` },
    { q: 'Does the petrol price affect the repo rate?', a: 'Indirectly. Fuel feeds into consumer inflation directly at the pump and through transport costs, and inflation is what the Monetary Policy Committee targets. A sharp rise in fuel can push inflation up and make a rate hike more likely; a fall can do the opposite. The committee looks at many other factors as well.' },
  ],
  body: (h) => `
<h2>Repo rate changes since 2023</h2>
<p>Each row is a change in the Reserve Bank’s policy rate, dated from the first day it applied in the SARB’s published series, with prime beside it.</p>
${h.table(['From', 'Repo rate', 'Prime', 'Change'], [...steps].reverse().map((s, i, arr) => [K.day(s.from), K.rate(s.rate), K.rate(E.rateAt(E.PRIME_STEPS, s.from)), i < arr.length - 1 ? `${s.rate > arr[i + 1].rate ? '+' : '-'}${K.dec(Math.abs(s.rate - arr[i + 1].rate), 2)}%` : 'start']), `South African Reserve Bank, series of the policy rate and the prime lending rate, read on ${K.day(E.RATES_DATE)}.`, ['l', 'r', 'r', 'r'])}
<h2>What the repo rate decision does to your instalment</h2>
<p>The calculator at the top applies a move to prime and recomputes your instalment over the years left. With the site’s example of ${K.rand(EX.bond)} over ${EX.years} years at prime, the instalment goes from ${K.rand(i0)} to ${K.rand(up)} after a 0.25% hike, or ${K.rand(dn)} after a 0.25% cut, about ${K.rand((up - i0) * 12)} a year either way. A larger or newer bond moves more; a bond with only a few years left moves less, because most of each payment is then capital.</p>
${h.mini('mpc', { t: 'Your bond over the next four meetings', p: ['path', 'loan'] })}
<h2>How the MPC decides</h2>
<p>The Monetary Policy Committee meets six times a year. It weighs inflation, the outlook for growth, the rand, wages, food and fuel prices, and global interest rates, then announces its decision in a statement read by the Governor. The decisions of 2026 so far were two hikes of 0.25%, in May and September, after a cutting cycle that took the rate from ${K.rate(peak.rate)} to ${K.rate(low.rate)}. Fuel prices are among the inputs: the jump in petrol and diesel prices from April 2026 is visible in the ${h.a('petrol-price-history', 'price history')}. The ${h.a('mpc-meeting-dates', 'MPC dates page')} lists the next meetings, and the ${h.a('bond-repayment', 'bond repayment calculator')} takes your own bond terms.</p>
`,
  tool: 'repo',
  related: ['prime-rate', 'mpc-meeting-dates', 'bond-repayment', 'interest-rates-south-africa'],
  sources: ['sarb_rates', 'sarb_mpc', 'sarb_statements'],
});
