import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, F = K.F.p95, EX = K.EX;
const cars = [
  { name: 'Small hatchback', l: 6 },
  { name: 'Family sedan or crossover', l: 8 },
  { name: 'Petrol bakkie or large SUV', l: 11 },
];
const month = (l100: number, cpl: number) => E.monthly(EX.kmDay, EX.days, l100, cpl);
const exNow = month(EX.l100, F.now), exNext = month(EX.l100, F.next);
const jan = E.HISTORY.find((x) => x.date === '2026-01-07')!.p95[0];

export default definePage({
  id: 'fuel-cost-per-km', group: 'costs', order: 301, slug: 'fuel-cost-per-km',
  nav: 'Cost per kilometre', card: 'What each kilometre costs in petrol or diesel at today’s regulated price, and your month of commuting before and after 2 December.',
  title: 'Fuel Cost per km 2026: Petrol Cost of Your Monthly Commute',
  description: 'Fuel cost per km in South Africa at the November 2026 price: rand per km for your car’s consumption, the cost of a monthly commute and the December change.',
  h1: 'Fuel cost per km and the cost of your monthly commute',
  intro: `The fuel cost per km of a car using ${EX.l100} litres per 100 km is ${K.rc(E.perKm(EX.l100, F.now))} on petrol 95 in Gauteng. Enter your own consumption.`,
  resume: `The fuel cost of a kilometre is your consumption in litres per 100 km times the price of a litre, divided by 100. At the November 2026 price of petrol 95 in Gauteng, ${K.rpl(F.now)}, a car using ${EX.l100} litres per 100 km spends ${K.rc(E.perKm(EX.l100, F.now))} a kilometre, ${K.rand(E.perKm(EX.l100, F.now) * 100)} per 100 km. For a commute of ${EX.kmDay} km a day on ${EX.days} working days, that is ${K.num(EX.kmDay * EX.days)} km and ${K.rand(exNow)} of petrol a month. If the December estimate holds, the same month would cost ${K.rand(exNext)} from ${K.day(E.NEXT_CHANGE)}, ${K.rand(exNow - exNext)} less. At the January 2026 price of ${K.rpl(jan)}, it cost ${K.rand(month(EX.l100, jan))}. These figures cover fuel only: tyres, services, insurance, licence and the wear of the car come on top. The calculators use the regulated price, so they apply to any station in your zone.`,
  faqs: [
    { q: 'How do I find my car’s litres per 100 km?', a: 'Most cars show it on the trip computer. Otherwise, fill the tank to the brim, reset the trip meter, drive normally until the next fill-up, and fill to the brim again. Divide the litres of the second fill-up by the kilometres driven, then multiply by 100. Two or three tanks give a reliable average for your own driving.' },
    { q: 'What is the petrol cost of 1,000 km?', a: `At ${K.rpl(F.now)} a litre in Gauteng, 1,000 km costs ${K.rand(E.perKm(6, F.now) * 1000)} in a car using 6 litres per 100 km, ${K.rand(E.perKm(8, F.now) * 1000)} at 8 litres and ${K.rand(E.perKm(11, F.now) * 1000)} at 11 litres. At the coast the price is ${K.dc(E.COAST_GAP.p95)} a litre lower, which saves ${K.rand(K.tank(80, E.COAST_GAP.p95))} on 80 litres.` },
    { q: 'What rate per km can I claim for business travel?', a: 'The South African Revenue Service publishes a prescribed rate per kilometre each tax year, which covers fuel, maintenance and the fixed costs of the car, and is therefore higher than the fuel cost alone. This site does not reproduce that rate; read it on the SARS website for the tax year concerned.' },
  ],
  body: (h) => `
<h2>Fuel cost per km by type of car</h2>
<p>The table applies the November price of petrol 95 and the estimated December price to three typical consumptions, for the commute used across this site: ${EX.kmDay} km a day, ${EX.days} days a month.</p>
${h.table(['Car', 'Litres per 100 km', 'Per km now', 'Month now', 'Month from 2 Dec'], cars.map((c) => [c.name, K.dec(c.l, 0), K.rc(E.perKm(c.l, F.now)), K.rand(month(c.l, F.now)), K.rand(month(c.l, F.next))]), `Petrol 95, Gauteng, ${K.num(EX.kmDay * EX.days)} km a month. December price estimated from the CEF sheet of ${K.day(E.LATEST.date)}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Consumption matters more than the monthly price change. Going from a car that uses 11 litres to one that uses 8 saves more each month than the whole December cut. Tyre pressure, a roof rack, air conditioning and speed all shift your own figure: on the highway at 120 km/h most cars use noticeably more than at 100.</p>
<h2>Your month of commuting, before and after 2 December</h2>
<p>The mini calculator below takes your distance, your working days and your consumption, and gives the month at today’s price and at the estimated December price. It counts fuel only. For a diesel car, pick diesel: the figure uses the regulated wholesale price, so add a little for the station’s margin.</p>
${h.mini('budget', { t: 'Your monthly fuel bill', p: ['km', 'days', 'l100'], d: { km: EX.kmDay } })}
<p>For a household with two cars, run it twice. If the December estimate turns out right, a family running a sedan and a small hatchback on these distances would save about ${K.rand(exNow - exNext + month(6, F.now) - month(6, F.next))} a month on petrol, while a household on diesel would pay more, as the ${h.a('diesel-price', 'diesel page')} explains.</p>
<h2>Beyond fuel</h2>
<p>A full cost per kilometre includes the car’s finance, insurance, licence, services, tyres and the loss of value as it ages. Fuel is the part that moves every month with the regulated price. The finance part moves with the prime rate: the ${h.a('prime-rate', 'prime rate page')} adds a car instalment to the fuel bill, and the ${h.a('diesel-vs-petrol-price', 'diesel against petrol page')} compares the two fuels over the same distance.</p>
`,
  tool: 'perkm',
  related: ['diesel-vs-petrol-price', 'petrol-95-price', 'petrol-price-december-2026', 'prime-rate'],
  sources: ['cef_2026', 'dmpr_prices', 'cef_daily'],
});
