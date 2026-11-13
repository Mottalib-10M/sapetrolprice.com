import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, EX = K.EX, D = E.MPC_NEXT;
const at = (r: number) => E.instalment(EX.bond, r, EX.years);
const i0 = at(E.PRIME);
const steps = E.REPO_STEPS.filter((s) => s.from >= '2024-01-01');
const fuelNear = (iso: string) => E.HISTORY.filter((x) => x.date <= iso).pop()!;

export default definePage({
  id: 'mpc-meeting-dates', group: 'rates', order: 504, slug: 'mpc-meeting-dates',
  nav: 'MPC dates', card: 'The Reserve Bank’s next Monetary Policy Committee announcements, from 19 November 2026 through 2027, and your bond under three paths.',
  title: 'MPC Meeting Dates 2026 and 2027: Next Repo Rate Decisions',
  description: 'MPC meeting dates of the Reserve Bank: the decision of 19 November 2026 and the 2027 calendar, with your bond instalment if rates hold, rise or fall each time.',
  h1: 'MPC meeting dates: the next repo rate decisions',
  intro: `The next MPC meeting ends with a repo rate announcement on ${K.day(D[0])}, followed by ${K.day(D[1])}. Choose a path to see your bond after four meetings.`,
  resume: `The Monetary Policy Committee (MPC) of the South African Reserve Bank sets the repo rate at scheduled meetings, six a year, each ending with an announcement on the last day. The Reserve Bank publishes the calendar in advance. The remaining announcement of 2026 is on ${K.day(D[0])}; the 2027 dates are ${D.slice(1).map((d) => K.day(d)).join(', ')}. The repo rate is ${K.rate(E.REPO)} and prime ${K.rate(E.PRIME)} going into the November meeting, after increases of 0.25% in May and September 2026. On a ${K.rand(EX.bond)} bond over ${EX.years} years at prime, the instalment is ${K.rand(i0)} a month. If the committee cut by 0.25% at each of the next four meetings, it would fall to ${K.rand(at(E.PRIME - 1))} after ${K.day(D[3])}; if it raised by 0.25% each time, it would reach ${K.rand(at(E.PRIME + 1))}. These are scenarios to size the stakes, not a forecast: this site does not predict the committee’s decisions.`,
  faqs: [
    { q: 'When is the next MPC meeting in South Africa?', a: `The next announcement is on ${K.day(D[0])}, the last scheduled meeting of 2026. The first of 2027 is on ${K.day(D[1])}. The Reserve Bank publishes the dates on its Monetary Policy Committee page and the statement itself on the day of the announcement, with the vote of the members.` },
    { q: 'When does a new repo rate take effect?', a: 'From the day after the announcement. In the Reserve Bank’s published series, each new policy rate starts on the day following the MPC statement, and banks move prime from that day too. Your bond instalment changes from the next debit date the bank sets, which can be a month later.' },
    { q: 'How many times did the MPC change rates in 2026?', a: `Twice, both increases of 0.25%: from ${K.day(E.REPO_STEPS[E.REPO_STEPS.length - 2].from)} the repo rate went to ${K.rate(E.REPO_STEPS[E.REPO_STEPS.length - 2].rate)}, and from ${K.day(E.REPO_STEPS[E.REPO_STEPS.length - 1].from)} to ${K.rate(E.REPO)}. The other meetings of 2026 left it unchanged. In 2024 and 2025, the committee had cut rates several times.` },
  ],
  body: (h) => `
<h2>MPC meeting dates and your bond under three paths</h2>
<p>For each scheduled announcement the table gives prime and the instalment on the example bond if the committee holds, cuts 0.25% or hikes 0.25% at every meeting. The real path is likely to mix holds and moves.</p>
${h.table(['Announcement', 'Hold', 'Cut 0.25% each time', 'Hike 0.25% each time'], D.slice(0, 4).map((d, k) => [K.day(d), K.rand(i0), `${K.rate(E.PRIME - 0.25 * (k + 1))}: ${K.rand(at(E.PRIME - 0.25 * (k + 1)))}`, `${K.rate(E.PRIME + 0.25 * (k + 1))}: ${K.rand(at(E.PRIME + 0.25 * (k + 1)))}`]), `Dates from the South African Reserve Bank’s MPC page. Instalment on ${K.rand(EX.bond)} over ${EX.years} years, prime ${K.rate(E.PRIME)} today.`, ['l', 'r', 'r', 'r'])}
<p>The later 2027 meetings, ${D.slice(4).map((d) => K.day(d)).join(', ')}, are too far away to say much about: the committee decides each time on the data of the moment.</p>
<h2>Decisions since 2024 and the fuel price at the time</h2>
<p>The table sets each change of the repo rate since 2024 against the petrol 95 price in Gauteng in force at that date. Fuel is one of the inputs the committee weighs, through its effect on inflation.</p>
${h.table(['From', 'Repo rate', 'Petrol 95 then'], steps.map((s) => [K.day(s.from), K.rate(s.rate), K.rpl(fuelNear(s.from).p95[0])]), 'Repo rate: South African Reserve Bank series. Petrol: CEF price history, Gauteng.', ['l', 'r', 'r'])}
${h.mini('bond', { t: 'Your own bond at today’s prime', p: ['loan', 'years', 'margin'] })}
<h2>What to watch before each announcement</h2>
<p>The committee’s statements discuss inflation and its outlook, the rand, wages, food and fuel prices, and rates abroad. For a household the practical question is simpler: how much would a move change the monthly budget? The ${h.a('repo-rate', 'repo rate page')} answers it for a single decision, the ${h.a('bond-repayment', 'bond calculator')} for your own terms, and the ${h.a('petrol-price-december-2026', 'December petrol estimate')} for the other cost that moves at the start of each month.</p>
`,
  tool: 'mpc',
  related: ['repo-rate', 'bond-repayment', 'prime-rate', 'interest-rates-south-africa'],
  sources: ['sarb_mpc', 'sarb_statements', 'sarb_rates', 'cef_2026'],
});
