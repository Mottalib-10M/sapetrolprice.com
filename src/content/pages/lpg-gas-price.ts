import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, H = E.HISTORY, last = H[H.length - 1], prev = H[H.length - 2], N = E.LAST_MONTH;
const y2026 = H.filter((x) => x.date >= '2026-01-01');
const lo = y2026.reduce((a, b) => (b.lpg[0] < a.lpg[0] ? b : a)), hi = y2026.reduce((a, b) => (b.lpg[0] > a.lpg[0] ? b : a));
const sizes = [9, 19, 48];

export default definePage({
  id: 'lpg-gas-price', group: 'fuels', order: 205, slug: 'lpg-gas-price',
  nav: 'LPG gas', card: 'The maximum price of LPG per kilogram inland and at the coast, and what a 9, 19 or 48 kg refill may cost.',
  title: 'LPG Gas Price 2026: Maximum Cost of a 9 kg or 48 kg Refill',
  description: 'LPG gas price in South Africa for November 2026: the maximum retail price per kilogram in Gauteng and at the coast, and the most a 9, 19 or 48 kg refill costs.',
  h1: 'LPG gas price: the most a cylinder refill may cost',
  intro: `The LPG gas price is capped at ${K.rpl(last.lpg[0])} a kilogram in Gauteng and ${K.rpl(last.lpg[1])} at the coast until 1 December. Pick your cylinder size.`,
  resume: `Liquefied petroleum gas (LPG), the gas in the cylinders used for cooking, heating and geysers, has a regulated maximum retail price per kilogram in South Africa. It is set each month with the fuel prices, by the Department of Mineral and Petroleum Resources on the Central Energy Fund’s figures, but with its own formula, based on international propane and butane prices. Since ${K.day(last.date)} the maximum is ${K.rpl(last.lpg[0])} a kilogram in Gauteng and ${K.rpl(last.lpg[1])} at the coast, up ${K.c(N.change.lpg)} on October. A 9 kg refill may therefore cost up to ${K.rand(K.tank(9, last.lpg[0]))} inland and ${K.rand(K.tank(9, last.lpg[1]))} at the coast; a 48 kg cylinder up to ${K.rand(K.tank(48, last.lpg[0]))} inland. In 2026 the Gauteng maximum ranged from ${K.rpl(lo.lpg[0])} in ${K.mon(lo.date)} to ${K.rpl(hi.lpg[0])} in ${K.mon(hi.date)}. Dealers may sell below the maximum, so compare. This site does not estimate the December LPG price: the daily CEF sheets do not cover gas.`,
  faqs: [
    { q: 'How much is a 9 kg gas refill in South Africa?', a: `At most ${K.rand(K.tank(9, last.lpg[0]))} in Gauteng and ${K.rand(K.tank(9, last.lpg[1]))} at the coast from ${K.day(last.date)}, at the regulated maximum per kilogram. Many dealers charge less than the maximum, so prices differ. The cylinder deposit or exchange fee comes on top of the gas.` },
    { q: 'Why is there no December estimate for LPG on this site?', a: 'The Central Energy Fund publishes daily over- and under-recovery figures for petrol, diesel and paraffin only. LPG follows a different formula, and no daily figure is published for it, so there is nothing public to project. The new maximum appears in the statement released a few days before each change.' },
    { q: 'Why is gas dearer in Gauteng than at the coast?', a: `As with liquid fuels, most LPG comes through the coastal refineries and ports and travels inland by road. The maximum price includes that transport cost. The gap between the two maximums this month is ${K.c(last.lpg[0] - last.lpg[1])} a kilogram, ${K.rand(K.tank(9, last.lpg[0] - last.lpg[1]))} on a 9 kg cylinder.` },
  ],
  body: (h) => `
<h2>LPG gas price by cylinder size</h2>
<p>The regulated price is per kilogram, so a refill costs the weight of gas times the price. The cylinder itself, its deposit and any delivery fee are separate. The table gives the maximum at the current price and at the October price.</p>
${h.table(['Cylinder', 'Gauteng now', 'Coast now', `Gauteng in ${K.month_(prev.date)}`], sizes.map((kg) => [`${kg} kg`, K.rand(K.tank(kg, last.lpg[0])), K.rand(K.tank(kg, last.lpg[1])), K.rand(K.tank(kg, prev.lpg[0]))]), `Maximum retail price of LPG from ${K.day(last.date)}. CEF statement of 30 October 2026, Annexure 1.`, ['l', 'r', 'r', 'r'])}
<h2>LPG through 2026</h2>
<p>The gas price did not follow petrol. In May 2026, when petrol rose again, the LPG maximum jumped by ${K.c(E.MONTHS[4].change.lpg as number)} a kilogram in a single month; in August it fell by ${K.c(-(E.MONTHS[7].change.lpg as number))}, while petrol barely moved. Over the year the Gauteng maximum went from ${K.rpl(H.find((x) => x.date === '2025-12-03')!.lpg[0])} in December 2025 to ${K.rpl(last.lpg[0])} now.</p>
${h.table(['Change of', 'Gauteng per kg', 'Coast per kg', 'Change'], y2026.map((x, i) => [K.day(x.date), K.rpl(x.lpg[0]), K.rpl(x.lpg[1]), K.dc(E.MONTHS[i].change.lpg as number)]), 'Maximum retail price of LPG, rand a kilogram. CEF statements of 2026.', ['l', 'r', 'r', 'r'])}
${h.mini('history', { t: 'Your refill against an earlier month', p: ['when', 'litres'], d: { fuel: 'lpg', litres: 9 } })}
<h2>What the maximum covers</h2>
<p>The maximum retail price applies to LPG sold to households in cylinders. Bulk gas for businesses and for vehicles is priced differently. A dealer who charges more than the maximum per kilogram is in breach of the regulations; check the weight on the cylinder and the price per kilogram on the slip.</p>
<p>LPG competes with ${h.a('paraffin-price', 'paraffin')} and electricity for cooking and heating. At this month’s prices a kilogram of gas costs ${K.rpl(last.lpg[0])} and a litre of paraffin up to ${K.rpl(N.smnrp)} at the shop, but the two give different amounts of heat, so the comparison per kilogram and per litre is not a comparison of cost per meal.</p>
`,
  tool: 'lpg',
  related: ['paraffin-price', 'petrol-price-history', 'fuel-price-coast-vs-inland', 'petrol-price-november-2026'],
  sources: ['cef_2026', 'cef_monthly', 'dmpr_prices'],
});
