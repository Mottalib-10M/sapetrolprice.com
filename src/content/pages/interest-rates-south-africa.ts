import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, M = E.MARKET, EX = K.EX;
const list = [M.repo, M.prime, M.zaronia, M.jibar3m, M.tbill91, M.tbill364];
const yr = (r: number) => (100000 * r) / 100;
const p0 = E.rateAt(E.PRIME_STEPS, '2026-01-01');

export default definePage({
  id: 'interest-rates-south-africa', group: 'rates', order: 505, slug: 'interest-rates-south-africa',
  nav: 'Interest rates today', card: 'Repo, prime, ZARONIA, JIBAR and treasury bill rates as published by the Reserve Bank, and what R100,000 earns or costs at each.',
  title: 'Interest Rates South Africa 2026: Repo, Prime, JIBAR, Bills',
  description: 'Interest rates in South Africa in November 2026: repo, prime, ZARONIA, JIBAR and treasury bill rates from the Reserve Bank, and a year of interest on an amount.',
  h1: 'Interest rates in South Africa today, side by side',
  intro: `Interest rates in South Africa start from the repo rate of ${K.rate(E.REPO)}; prime is ${K.rate(E.PRIME)}. Enter an amount to see a year of interest at each published rate.`,
  resume: `The South African Reserve Bank publishes a set of reference rates every business day. The policy rate, or repo rate, is ${K.rate(M.repo.rate)}: it is what the Reserve Bank charges banks and the anchor of all the others. The prime lending rate, ${K.rate(M.prime.rate)}, is what banks charge their best borrowers and the base for most bonds and car loans. ZARONIA, the overnight rate at which banks lend to each other without collateral, was ${K.dec(M.zaronia.rate, 3)}% on ${K.day(M.zaronia.date)}. The three-month JIBAR, used for many business loans, stood at ${K.rate(M.jibar3m.rate)}. The government borrowed through 91-day treasury bills at ${K.rate(M.tbill91.rate)} and 364-day bills at ${K.rate(M.tbill364.rate)}. On R100,000 for a year, that is ${K.rand(yr(M.prime.rate))} of interest at prime against ${K.rand(yr(M.tbill91.rate))} at the 91-day bill rate. Prime started 2026 at ${K.rate(p0)} and has risen by ${K.dec(E.PRIME - p0, 2)} points since.`,
  faqs: [
    { q: 'What is the difference between the repo rate and prime?', a: `The repo rate, ${K.rate(E.REPO)}, is set by the Reserve Bank for its loans to banks. Prime, ${K.rate(E.PRIME)}, is the rate banks charge their own lowest-risk customers, kept at the repo rate plus ${K.dec(E.PRIME - E.REPO, 1)} points. Consumers borrow at prime or above; only banks deal at the repo rate.` },
    { q: 'What is ZARONIA?', a: `The South African Rand Overnight Index Average, published by the Reserve Bank as the benchmark for overnight lending between banks. It is ${K.dec(M.zaronia.rate, 3)}% on ${K.day(M.zaronia.date)}, just below the repo rate. It is gradually replacing JIBAR as the reference rate in financial contracts.` },
    { q: 'Where can I invest at the treasury bill rate?', a: 'Treasury bills are sold by auction to banks and large investors. Households can reach similar returns through money market funds and some bank deposits, or lend to the government directly through RSA Retail Savings Bonds, which have their own published rates. This site does not compare products or recommend any.' },
  ],
  body: (h) => `
<h2>Interest rates in South Africa, as published by the Reserve Bank</h2>
${h.table(['Rate', 'Level', 'Date', 'A year on R100,000'], list.map((r) => [r.name, `${K.dec(r.rate, Math.round(r.rate * 1000) % 10 ? 3 : 2)}%`, K.day(r.date), K.rand(yr(r.rate))]), 'South African Reserve Bank, current market rates, read through its public data service. Simple interest over a year, before tax.', ['l', 'r', 'l', 'r'])}
<p>The rates cluster around the repo rate, except prime, which sits ${K.dec(E.PRIME - E.REPO, 1)} points above it. The treasury bill rates show what the market expects: when the 364-day rate is above the 91-day rate, as now (${K.rate(M.tbill364.rate)} against ${K.rate(M.tbill91.rate)}), investors ask a little more for lending longer, which can reflect expectations that rates will not fall soon. Read that with care: other factors move bill yields too.</p>
<h2>What these interest rates mean for a household</h2>
<p>For borrowers, prime is the rate that matters. On the example bond of ${K.rand(EX.bond)} over ${EX.years} years, prime of ${K.rate(E.PRIME)} gives ${K.rand(E.instalment(EX.bond, E.PRIME, EX.years))} a month; at the start of 2026, at ${K.rate(p0)}, it was ${K.rand(E.instalment(EX.bond, p0, EX.years))}. For savers, money market and deposit rates tend to follow the repo rate and the bill rates up and down.</p>
${h.mini('prime', { t: 'Your bond today against an earlier prime', p: ['loan', 'when'] })}
<h2>Interest rates and inflation</h2>
<p>The Reserve Bank raises its rate when it expects inflation to run above its target and lowers it when the outlook allows. Fuel prices are a visible part of that: petrol 95 went from ${K.rpl(E.HISTORY.find((x) => x.date === '2026-03-04')!.p95[0])} in March 2026 to ${K.rpl(E.HISTORY[E.HISTORY.length - 1].p95[0])} in November, and the two rate increases of 2026 came in May and September. The ${h.a('repo-rate', 'repo rate page')} lists every decision, and the ${h.a('mpc-meeting-dates', 'MPC dates page')} the next ones.</p>
`,
  tool: 'rates',
  related: ['repo-rate', 'prime-rate', 'bond-repayment', 'mpc-meeting-dates'],
  sources: ['sarb_rates', 'sarb_mpc', 'sarb_statements'],
});
