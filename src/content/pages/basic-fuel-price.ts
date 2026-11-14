import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, L = E.LATEST, F = K.F.p95;
const D = E.DAILIES;

export default definePage({
  id: 'basic-fuel-price', group: 'why', order: 404, slug: 'basic-fuel-price',
  nav: 'Basic Fuel Price and recoveries', card: 'How the Central Energy Fund measures over- and under-recovery each business day, and how the window average becomes next month’s change.',
  title: 'Basic Fuel Price 2026: Over and Under-Recovery Explained',
  description: 'Basic Fuel Price in South Africa in 2026: how the CEF daily sheet measures over and under-recovery and how the window average becomes the next price change.',
  h1: 'Basic Fuel Price: how the gap between cost and pump price sets the change',
  intro: `The Basic Fuel Price of petrol 95 was ${K.c(L.bfp.p95)} a litre on ${K.day(L.date)}, against ${K.c(L.contribution.p95)} built into the pump price. Carried to the end of the month, that gap ${K.recEff(F.roundedRecovery)}; with the fuel tax cut ending, petrol 95 ${K.moveWords(F.change)} on ${K.day(E.NEXT_CHANGE)}, the figure the calculator starts from.`,
  resume: `The Basic Fuel Price (BFP) is what a litre of fuel would cost delivered to a South African port if bought on international markets: the spot price of refined product, freight, insurance, port charges and losses, converted to rand at the day’s exchange rate. The Central Energy Fund (CEF) computes it every business day for petrol 95 and 93, diesel 500 ppm and 50 ppm and paraffin, and compares it with the BFP built into the current price, the contribution. The difference is the day’s over-recovery (BFP below the contribution, so motorists pay too much) or under-recovery (the reverse). On ${K.day(L.date)} petrol 95 had a BFP of ${K.c(L.bfp.p95)} a litre against a contribution of ${K.c(L.contribution.p95)}: an over-recovery of ${K.c(L.day.p95)} that day and ${K.c(L.average.p95)} on average since ${K.day(L.window[0])}. At the end of the window, the average, rounded to the cent, becomes the change in the next price, before any levy or margin adjustment.`,
  faqs: [
    { q: 'What does over-recovery mean for the petrol price?', a: `It means the pump price has been higher than the landed cost of fuel, so the price will come down. An average over-recovery of ${K.c(L.average.p95)} a litre over the whole window would cut petrol by about that amount, before levy changes. An under-recovery works the other way: the price goes up next month.` },
    { q: 'Where can I see the daily over-recovery figures?', a: 'The Central Energy Fund publishes a Daily Basic Fuel Price sheet as a PDF on its website for each business day, with the figures by fuel, the exchange rate and the average since the start of the window. This site reads those sheets and turns them into the estimates on each page, with the date of the latest one used.' },
    { q: 'Why does the over-recovery split into product price and exchange rate?', a: `The daily sheet separates the part of the gap caused by international product prices from the part caused by the rand. On ${K.day(L.date)}, of the ${K.c(L.average.p95)} average on petrol 95, ${K.c(L.fromProduct.p95)} came from product prices and ${K.c(L.fromRand.p95)} from the exchange rate, which shows the rand barely moved over the window.` },
  ],
  body: (h) => `
<h2>Basic Fuel Price on the latest daily sheet</h2>
<p>The table reproduces the figures of the CEF sheet of ${K.day(L.date)} for each fuel: the BFP that day, the contribution built into the November price, the day’s gap and the window average. “Over” means the pump price is above cost, so the price comes down; “under” means it goes up.</p>
${h.table(['Fuel', 'BFP that day', 'In the price', 'Gap that day', 'Window average'], [
    ['Petrol 95', K.c(L.bfp.p95), K.c(L.contribution.p95), K.recS(L.day.p95), K.recS(L.average.p95)],
    ['Petrol 93', K.c(L.bfp.p93), K.c(L.contribution.p93), K.recS(L.day.p93), K.recS(L.average.p93)],
    ['Diesel 500 ppm', K.c(L.bfp.d50), K.c(L.contribution.d50), K.recS(L.day.d50), K.recS(L.average.d50)],
    ['Diesel 50 ppm', K.c(L.bfp.d005), K.c(L.contribution.d005), K.recS(L.day.d005), K.recS(L.average.d005)],
    ['Paraffin', K.c(L.bfp.ip), K.c(L.contribution.ip), K.recS(L.day.ip), K.recS(L.average.ip)],
  ], `Cents a litre. CEF Daily Basic Fuel Price, ${K.day(L.date)}; window from ${K.day(L.window[0])}; R${K.dec(L.zarusd)} to the dollar.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>From daily gaps to the monthly change</h2>
<p>A window runs from the day after the previous one closed to a Thursday about a week before the change, about four weeks of business days. The CEF statement then states the average over- or under-recovery for each fuel, rounded to the nearest cent, and the Department turns it into the price change. The CEF statement of 30 October 2026 describes the principle: the over- or under-recovery during the prior month “will be corrected in the following month”.</p>
<p>Halfway through a window, part of the average is known and part is not. This site fills the remaining days with the latest daily gap, a method that came closer to the final figure than the average to date in each of the nine windows of 2026 it was tested on. For petrol 95 now, that gives an over-recovery of ${K.dec(F.projected, 1)}c, rounded to ${K.c(F.roundedRecovery)}, which ${K.recEff(F.roundedRecovery)}. The ${K.c(L.average.p95)} average so far is a step on the way, not the figure to keep. The ${h.a('method', 'method page')} lists every test.</p>
${h.mini('rand', { t: 'What a move in the rand does to the BFP', p: ['fuel', 'move'] })}
<h2>The window average month by month in 2026</h2>
<p>Each row below is a mid-window CEF sheet of 2026: the average to date on petrol 95 and the final figure the statement used. The difference between the two is what any mid-month estimate has to guess.</p>
${h.table(['Sheet of', 'Window from', 'Average to date', 'Final for the change'], K.BT.p95.map((r) => [K.day(r.sheet), K.day(D.find((d) => d.date === r.sheet)!.window[0]), K.recS(r.avg), K.recS(r.final)]), 'Petrol 95, cents a litre; over: the price comes down, under: it goes up. CEF daily sheets and statements of 2026.', ['l', 'l', 'r', 'r'])}
<p>The ${h.a('rand-and-oil-price', 'rand and oil page')} shows how the two drivers of the BFP move the price, and the ${h.a('slate-levy', 'slate levy page')} explains what happens to the gaps the industry carries in the meantime.</p>
`,
  tool: 'recovery',
  related: ['rand-and-oil-price', 'petrol-price-december-2026', 'slate-levy', 'what-is-in-a-litre-of-petrol'],
  sources: ['cef_daily', 'cef_monthly', 'dmpr_structure'],
});
