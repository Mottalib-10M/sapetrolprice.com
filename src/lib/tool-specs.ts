/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini-simulator).
 * Every price comes from the engine (lib/engine/fuel.ts) and its data files: Central Energy Fund statements and daily
 * sheets (cef.json), Reserve Bank rates (sarb.json). The reader enters only litres, kilometres or a loan amount.
 * `arg` overrides the default of any field by its id. This file ships to the browser.
 */
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import { formatNumber } from './format';
import { rand, rc, rpl, dc, dr, num, pct, day, monthName } from './fmt';
import {
  forecast, PRODUCT_NAME, type Product, isPetrol, isDiesel, inForce, COAST_GAP, LAST_MONTH, PREV_MONTH, LATEST, NEXT_CHANGE, RELIEF, SMNRP_RATIO,
  HISTORY, MONTHS, DAILIES, structureOf, tank, perKm, monthly, randEffect, instalment, interestTotal, PRIME, REPO, MPC_NEXT, MARKET, rateAt, PRIME_STEPS,
} from './engine/fuel';

const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);

/**
 * ONE example case for the whole site (naive testers, 2026-11-09: never two amounts for one case): a car on petrol 95
 * bought in Gauteng, a 50-litre tank, 8 litres per 100 km, 40 km a day on 22 days a month; a R1,500,000 bond over
 * 20 years at prime. tests/coherence.test.ts locks it.
 */
export const EX = { product: 'p95' as Product, litres: 50, l100: 8, kmDay: 40, days: 22, bond: 1500000, years: 20, car: 350000, carYears: 6 } as const;

const PRODUCT_OPTS = (keys: Product[] = ['p95', 'p93', 'd50', 'd005', 'ipw']) => keys.map((k) => ({ value: k, label: PRODUCT_NAME[k] }));
const PRODUCT = (def: Product = EX.product, keys?: Product[]): Input => ({ kind: 'select', id: 'fuel', label: 'Fuel', def, options: PRODUCT_OPTS(keys), help: 'Diesel, paraffin: wholesale price' });
const LITRES = (def: number = EX.litres, label = 'Litres you buy'): Input => ({ id: 'litres', label, def, unit: 'l', max: 10000, help: 'A small car tank holds about 40 litres, a bakkie about 80' });
const L100: Input = { id: 'l100', label: 'Consumption (litres per 100 km)', def: EX.l100, unit: 'l', max: 60, decimals: 1, help: 'On your car’s trip computer; a small car uses 6 to 7, a bakkie 9 to 12' };
const ZONE: Input = { kind: 'select', id: 'zone', label: 'Where you fill up', def: 'inland', options: [{ value: 'inland', label: 'Gauteng (inland, zone 9C)' }, { value: 'coast', label: 'Coast (Durban, Cape Town, Gqeberha)' }], help: 'Other towns pay their own zone price, between the two' };
const prod = (v: V) => (s(v, 'fuel') || EX.product) as Product;
const basis = (p: Product) => (isPetrol(p) ? 'pump price' : 'wholesale price');
/** Coast price is published for petrol 95, diesel 500 ppm and paraffin only. */
const hasCoast = (p: Product) => p === 'p95' || p === 'd50' || p === 'ipw';
const zonePrice = (p: Product, zone: string, cpl: number) => (zone === 'coast' && hasCoast(p) ? cpl - COAST_GAP[p] : cpl);
const zoneWord = (p: Product, zone: string) => (zone === 'coast' && hasCoast(p) ? 'coast' : zone === 'coast' ? 'Gauteng (no coast price is published for this grade)' : 'Gauteng');
const NEXT = monthName(NEXT_CHANGE);
const ASOF = `CEF data to ${day(LATEST.window[1])}`;

function spec(inputs: Input[], arg: Record<string, number | string>, run: (v: V) => ToolOut): ToolSpec {
  return { inputs: inputs.map((i) => (i.id in arg ? { ...i, def: arg[i.id] } as Input : i)), run };
}
type Arg = Record<string, number | string>;
const MOVES = [-10, -5, 0, 5, 10].map((x) => ({ value: String(x), label: x === 0 ? 'No change (latest day holds)' : `${x > 0 ? '+' : ''}${x}% (${x > 0 ? 'dearer oil or weaker rand' : 'cheaper oil or stronger rand'})` }));
const SLATES = [-50, -25, 0, 25, 50].map((x) => ({ value: String(x), label: x === 0 ? 'Unchanged' : `${x > 0 ? '+' : ''}${x}c a litre` }));
const BP = [-50, -25, 0, 25, 50].map((x) => ({ value: String(x), label: x === 0 ? 'No change' : `${x > 0 ? 'Hike' : 'Cut'} of ${Math.abs(x)} basis points (${formatNumber(Math.abs(x) / 100, 2)}%)` }));

const SPECS: Record<string, (arg?: Arg) => ToolSpec> = {
  /** Next month's price for one fuel, from the CEF figures to date. */
  forecast: (arg = {}) => spec([
    PRODUCT(),
    { kind: 'select', id: 'relief', label: 'Fuel levy relief after 1 December', def: 'ends', options: [{ value: 'ends', label: 'Ends as announced (levy back to full)' }, { value: 'kept', label: 'Extended for another month' }], help: `R${formatNumber(RELIEF.petrol / 100, 2)} a litre on petrol, R${formatNumber(RELIEF.diesel / 100, 2)} on diesel until 1 December` },
    { kind: 'select', id: 'move', label: 'Oil and rand until the window closes', def: '0', options: MOVES, adv: true, short: 'oil and rand' },
    { kind: 'select', id: 'method', label: 'Days still to come', def: 'latest', options: [{ value: 'latest', label: 'At the latest daily figure (closer in 2026)' }, { value: 'average', label: 'At the average so far' }], adv: true, short: 'days to come' },
    { kind: 'select', id: 'slate', label: 'Slate levy change', def: '0', options: SLATES, adv: true, short: 'slate levy' },
    LITRES(EX.litres, 'Litres in a tank'),
  ], arg, (v) => {
    const p = prod(v);
    const f = forecast({ product: p, reliefEnds: s(v, 'relief') !== 'kept', move: n(v, 'move'), method: s(v, 'method') === 'average' ? 'average' : 'latest', slate: n(v, 'slate') });
    const smnrp = p === 'ipw' ? Math.round(f.change * SMNRP_RATIO) : 0;
    return {
      label: `${PRODUCT_NAME[p]}, estimated from ${day(NEXT_CHANGE)} (Gauteng ${basis(p)})`, value: rpl(f.next),
      sub: `${dr(f.change)} a litre (${dc(f.change)}) on today’s ${rpl(f.now)}${hasCoast(p) ? ` · coast ${rpl(f.nextCoast)}` : ''}`,
      example: `Example: ${PRODUCT_NAME[p].toLowerCase()}, levy relief ending as announced, ${ASOF}`,
      exampleAide: 'Change the fuel or the assumptions to see another estimate',
      rows: [
        [`${f.averageSoFar >= 0 ? 'Over' : 'Under'}-recovery so far (average from ${day(LATEST.window[0])})`, `${dc(Math.abs(f.averageSoFar))} a litre`],
        [`Latest day (${day(LATEST.window[1])})`, `${dc(Math.abs(f.latestDay))} ${f.latestDay >= 0 ? 'over' : 'under'}`],
        ['Window average projected to the close', `${dc(Math.abs(f.projected))} ${f.projected >= 0 ? 'over' : 'under'}`],
        ...(f.levyEffect ? [['Fuel levy relief ends', dc(f.levyEffect)] as [string, string]] : []),
        ...(f.slate ? [['Slate levy change (your assumption)', dc(f.slate)] as [string, string]] : []),
        [`A ${num(n(v, 'litres'))}-litre tank`, `${rand(tank(n(v, 'litres'), f.now))} now, ${rand(tank(n(v, 'litres'), f.next))} then`],
        ...(p === 'ipw' ? [['Paraffin at the shop (SMNRP)', `about ${rpl(LATEST.inForce.smnrp + smnrp)} a litre`] as [string, string]] : []),
      ],
      note: `${isPetrol(p) ? 'Petrol pump prices are regulated: every station in the zone charges the same.' : 'Diesel and paraffin: the wholesale price is regulated, the pump price is set by each station, usually above it.'} The official figure comes with the Department’s statement a few days before ${day(NEXT_CHANGE)}.`,
    };
  }),

  /** What one tank costs now, at the coast or inland, and after the estimated change. */
  tank: (arg = {}) => spec([PRODUCT(), LITRES(), ZONE], arg, (v) => {
    const p = prod(v), z = s(v, 'zone'), l = n(v, 'litres');
    const f = forecast({ product: p });
    const now = zonePrice(p, z, f.now), next = zonePrice(p, z, f.next);
    return {
      label: `${num(l)} litres of ${PRODUCT_NAME[p].toLowerCase()}, ${zoneWord(p, z)}`, value: rand(tank(l, now)),
      sub: `at ${rpl(now)} a litre (${basis(p)} until ${day('2026-12-01')})`,
      example: `Example: a ${num(l)}-litre tank in ${zoneWord(p, z)}`,
      rows: [[`Same tank from ${day(NEXT_CHANGE)} (estimate)`, rand(tank(l, next))], ['Difference per tank', `${tank(l, f.change) >= 0 ? '+' : '-'}${rand(Math.abs(tank(l, f.change)))}`], ['Four tanks a month', rand(4 * tank(l, now))]],
      note: isPetrol(p) ? undefined : 'Diesel and paraffin: this is the regulated wholesale price; stations add their own margin.',
    };
  }),

  /** Rand per kilometre. */
  perkm: (arg = {}) => spec([PRODUCT(), L100, ZONE], arg, (v) => {
    const p = prod(v), z = s(v, 'zone'), price = zonePrice(p, z, inForce(p)), f = forecast({ product: p });
    const k = perKm(n(v, 'l100'), price);
    return {
      label: 'Fuel cost per kilometre', value: rc(k), sub: `${rand(k * 100)} per 100 km at ${rpl(price)} a litre`,
      example: `Example: ${formatNumber(n(v, 'l100'), 1)} litres per 100 km on ${PRODUCT_NAME[p].toLowerCase()}`,
      rows: [['Per 1,000 km', rand(k * 1000)], [`Per km from ${day(NEXT_CHANGE)} (estimate)`, rc(perKm(n(v, 'l100'), zonePrice(p, z, f.next)))]],
      note: 'Fuel only: no tyres, service, insurance or depreciation.',
    };
  }),

  /** Monthly fuel bill of a commute. */
  budget: (arg = {}) => spec([
    PRODUCT(), { id: 'km', label: 'Kilometres a day', def: EX.kmDay, unit: 'km', max: 2000 }, { id: 'days', label: 'Days you drive a month', def: EX.days, unit: 'days', max: 31 }, L100, ZONE,
  ], arg, (v) => {
    const p = prod(v), z = s(v, 'zone'), f = forecast({ product: p });
    const now = monthly(n(v, 'km'), n(v, 'days'), n(v, 'l100'), zonePrice(p, z, f.now));
    const next = monthly(n(v, 'km'), n(v, 'days'), n(v, 'l100'), zonePrice(p, z, f.next));
    return {
      label: 'Fuel a month at today’s price', value: rand(now), sub: `${rand(next)} a month from ${day(NEXT_CHANGE)} (estimate, ${next >= now ? '+' : '-'}${rand(Math.abs(next - now))})`,
      example: `Example: ${num(n(v, 'km'))} km a day, ${num(n(v, 'days'))} days a month`,
      rows: [['Litres a month', `${formatNumber((n(v, 'km') * n(v, 'days') * n(v, 'l100')) / 100, 0)} l`], ['A year at today’s price', rand(now * 12)], ['Kilometres a month', `${num(n(v, 'km') * n(v, 'days'))} km`]],
    };
  }),

  /** Price on a past date against today. */
  history: (arg = {}) => spec([
    { kind: 'select', id: 'fuel', label: 'Fuel', def: 'p95', options: [{ value: 'p95', label: 'Petrol 95' }, { value: 'd50', label: 'Diesel 0.05% (wholesale)' }, { value: 'ipw', label: 'Paraffin (wholesale)' }, { value: 'lpg', label: 'LPG gas (per kg)' }] },
    { kind: 'select', id: 'when', label: 'Compare with the price of', def: HISTORY[HISTORY.length - 13].date, options: HISTORY.slice(0, -1).map((h) => ({ value: h.date, label: monthName(h.date) })).reverse() },
    ZONE, LITRES(),
  ], arg, (v) => {
    const k = s(v, 'fuel') as 'p95' | 'd50' | 'ipw' | 'lpg', zi = s(v, 'zone') === 'coast' ? 1 : 0;
    const then = HISTORY.find((h) => h.date === s(v, 'when')) ?? HISTORY[0], now = HISTORY[HISTORY.length - 1];
    const a = then[k][zi], b = now[k][zi], unit = k === 'lpg' ? 'kg' : 'litre';
    return {
      label: `Change since ${monthName(then.date)}`, value: `${b >= a ? '+' : '-'}${pct(Math.abs(b - a) / a, 1)}`,
      sub: `${rpl(a)} a ${unit} then, ${rpl(b)} now (${zi ? 'coast' : 'Gauteng'})`,
      example: `Example: ${monthName(then.date)} against ${monthName(now.date)}`,
      rows: [[`${num(n(v, 'litres'))} ${unit === 'kg' ? 'kg' : 'litres'} then`, rand(tank(n(v, 'litres'), a))], [`${num(n(v, 'litres'))} ${unit === 'kg' ? 'kg' : 'litres'} now`, rand(tank(n(v, 'litres'), b))], ['Difference', `${b >= a ? '+' : '-'}${rand(Math.abs(tank(n(v, 'litres'), b - a)))}`]],
    };
  }),

  /** What a month of driving cost in each month of 2026. */
  year: (arg = {}) => spec([{ id: 'litres', label: 'Litres of petrol 95 a month', def: 150, unit: 'l', max: 10000 }, ZONE], arg, (v) => {
    const l = n(v, 'litres'), zi = s(v, 'zone') === 'coast' ? 1 : 0;
    const rows2026 = HISTORY.filter((h) => h.date >= '2026-01-01');
    const before = HISTORY.filter((h) => h.date < '2026-01-01').pop()!;
    const months = Array.from({ length: 11 }, (_, i) => `2026-${String(i + 1).padStart(2, '0')}-15`).map((d) => ({ d, h: [...rows2026].reverse().find((h) => h.date <= d) ?? before }));
    const costs = months.map((m) => tank(l, m.h.p95[zi]));
    const total = costs.reduce((a, b) => a + b, 0);
    const lo = Math.min(...costs), hi = Math.max(...costs);
    return {
      label: `Petrol 95 bought from January to November 2026`, value: rand(total), sub: `${num(l)} litres a month, ${zi ? 'coast' : 'Gauteng'} · cheapest month ${rand(lo)}, dearest ${rand(hi)}`,
      example: `Example: ${num(l)} litres a month`,
      rows: [['Same litres at January’s price', rand(costs[0] * 11)], ['Extra paid over 11 months', rand(total - costs[0] * 11)], ['Average month', rand(total / 11)]],
      table: { caption: 'Your monthly petrol bill, mid-month price of each month', headers: ['Month', 'Price a litre', 'Your month'], rows: months.map((m, i) => [monthName(m.d), rpl(m.h.p95[zi]), rand(costs[i])]), align: ['l', 'r', 'r'] },
    };
  }),

  /** What each litre pays for. */
  structure: (arg = {}) => spec([PRODUCT('p95', ['p95', 'p93', 'd50', 'd005']), LITRES()], arg, (v) => {
    const p = prod(v), x = structureOf(p), l = n(v, 'litres'), r = (c: number) => rand(tank(l, c));
    return {
      label: `Taxes and levies in ${num(l)} litres of ${PRODUCT_NAME[p].toLowerCase()}`, value: r(x.taxes + x.slate),
      sub: `${pct((x.taxes + x.slate) / x.total, 0)} of ${r(x.total)} (Gauteng, ${day(LAST_MONTH.effective)} structure)`,
      example: `Example: ${num(l)} litres in Gauteng`,
      rows: [['Fuel itself, landed (Basic Fuel Price)', r(x.bfp), x.bfp], ['General fuel levy', r(x.fuelLevy), x.fuelLevy], ['Road Accident Fund levy', r(x.raf), x.raf], ['Slate levy', r(x.slate), x.slate], [isPetrol(p) ? 'Retail and wholesale margins' : 'Wholesale margin', r(x.retail + x.wholesale), x.retail + x.wholesale], ['Storage, distribution, transport to Gauteng', r(x.storage + x.zone), x.storage + x.zone]],
      note: 'Excise duty (4c) and small levies are counted with the taxes. No VAT is charged on petrol and diesel in South Africa.',
    };
  }),

  /** Levies paid over a year. */
  levy: (arg = {}) => spec([PRODUCT('p95', ['p95', 'd50']), { id: 'litres', label: 'Litres a month', def: 150, unit: 'l', max: 100000 }], arg, (v) => {
    const p = prod(v), l = n(v, 'litres') * 12, fl = isPetrol(p) ? LAST_MONTH.fuelLevy.petrol : LAST_MONTH.fuelLevy.diesel, full = isPetrol(p) ? PREV_MONTH.fuelLevy.petrol : PREV_MONTH.fuelLevy.diesel;
    return {
      label: 'Fuel levy and RAF levy in a year', value: rand(tank(l, full + LAST_MONTH.raf)), sub: `at the full rates (${dc(full)} and ${dc(LAST_MONTH.raf)} a litre)`,
      example: `Example: ${num(n(v, 'litres'))} litres a month`,
      rows: [['Fuel levy (full rate)', rand(tank(l, full))], ['Road Accident Fund levy', rand(tank(l, LAST_MONTH.raf))], ['Saved this month by the relief', rand(tank(n(v, 'litres'), full - fl))]],
    };
  }),

  /** The slate levy over a month. */
  slate: (arg = {}) => spec([{ id: 'litres', label: 'Litres a month (petrol or diesel)', def: 150, unit: 'l', max: 100000 }], arg, (v) => {
    const l = n(v, 'litres'), now = LAST_MONTH.slate, prev = PREV_MONTH.slate;
    const peak = Math.max(...MONTHS.map((m) => m.slate));
    return {
      label: 'Slate levy in your month', value: rand(tank(l, now)), sub: `${dc(now)} a litre since ${day(LAST_MONTH.effective)}`,
      example: `Example: ${num(l)} litres a month`,
      rows: [[`At October’s ${dc(prev)}`, rand(tank(l, prev))], [`At the 2026 peak of ${dc(peak)}`, rand(tank(l, peak))], ['A year at today’s rate', rand(tank(l * 12, now))]],
    };
  }),

  /** From an over- or under-recovery to a price change. */
  recovery: (arg = {}) => spec([
    { id: 'gap', label: 'Average gap over the window', def: Math.round(Math.abs(LATEST.average.p95)), unit: 'c/l', max: 3000 },
    { kind: 'select', id: 'side', label: 'Which way', def: LATEST.average.p95 >= 0 ? 'over' : 'under', options: [{ value: 'over', label: 'Over-recovery (pump price above cost)' }, { value: 'under', label: 'Under-recovery (pump price below cost)' }] },
    { kind: 'select', id: 'fuel', label: 'Fuel', def: 'p95', options: [{ value: 'p95', label: 'Petrol' }, { value: 'd50', label: 'Diesel' }] },
  ], arg, (v) => {
    const g = Math.round(n(v, 'gap')) * (s(v, 'side') === 'over' ? -1 : 1), p = prod(v), lev = isPetrol(p) ? RELIEF.petrol : RELIEF.diesel;
    return {
      label: 'Price change from the gap alone', value: dc(g), sub: `${dc(g + lev)} once the ${dc(lev)} levy relief ends`,
      example: `Example: ${num(n(v, 'gap'))}c ${s(v, 'side')}-recovery`,
      rows: [['A 50-litre tank, gap alone', `${g >= 0 ? '+' : '-'}${rand(Math.abs(tank(50, g)))}`], ['Same tank with the levy back', `${g + lev >= 0 ? '+' : '-'}${rand(Math.abs(tank(50, g + lev)))}`]],
      note: 'The statement rounds the average to the nearest full cent; the Minister can add levy, margin or transport changes on top.',
    };
  }),

  /** A move of the rand. */
  rand: (arg = {}) => spec([
    PRODUCT(),
    { kind: 'select', id: 'move', label: 'Rand against the dollar', def: '5', options: [-10, -5, -2, 2, 5, 10].map((x) => ({ value: String(x), label: `${x > 0 ? 'Weaker' : 'Stronger'} by ${Math.abs(x)}% (about R${formatNumber(LATEST.zarusd * (1 + x / 100), 2)} to the dollar)` })) },
    LITRES(),
  ], arg, (v) => {
    const p = prod(v), c = randEffect(p, n(v, 'move'));
    return {
      label: `Effect on ${PRODUCT_NAME[p].toLowerCase()}`, value: `${dc(c)} a litre`, sub: `${c >= 0 ? '+' : '-'}${rand(Math.abs(tank(n(v, 'litres'), c)))} on ${num(n(v, 'litres'))} litres, oil price unchanged`,
      example: `Example: rand ${n(v, 'move') > 0 ? 'weaker' : 'stronger'} by ${Math.abs(n(v, 'move'))}% for a whole window`,
      rows: [[`Basic Fuel Price on ${day(LATEST.date)}`, `${dc(LATEST.bfp[p === 'ipw' ? 'ip' : p])} a litre`], ['Rand on that day', `R${formatNumber(LATEST.zarusd, 2)} to the dollar`]],
      note: 'The whole landed cost is priced in dollars, so it moves with the rand in proportion. Levies and margins do not.',
    };
  }),

  /** LPG cylinder. */
  lpg: (arg = {}) => spec([
    { kind: 'select', id: 'kg', label: 'Cylinder', def: '9', options: [{ value: '9', label: '9 kg' }, { value: '19', label: '19 kg' }, { value: '48', label: '48 kg' }] }, ZONE,
  ], arg, (v) => {
    const zi = s(v, 'zone') === 'coast' ? 1 : 0, kg = n(v, 'kg'), now = HISTORY[HISTORY.length - 1].lpg[zi], prev = HISTORY[HISTORY.length - 2].lpg[zi];
    return {
      label: `Most a ${num(kg)} kg refill may cost`, value: rand(tank(kg, now)), sub: `${rpl(now)} a kg, maximum retail price ${zi ? 'at the coast' : 'in Gauteng'}`,
      example: `Example: a ${num(kg)} kg cylinder`,
      rows: [[`Same refill in ${monthName(HISTORY[HISTORY.length - 2].date)}`, rand(tank(kg, prev))], ['Change', `${now >= prev ? '+' : '-'}${rand(Math.abs(tank(kg, now - prev)))}`]],
      note: 'A maximum: dealers may sell below it. Gas only, no deposit on the cylinder.',
    };
  }),

  /** Paraffin at the shop. */
  paraffin: (arg = {}) => spec([{ id: 'litres', label: 'Litres a month', def: 20, unit: 'l', max: 5000 }], arg, (v) => {
    const l = n(v, 'litres'), f = forecast({ product: 'ipw' }), cap = LATEST.inForce.smnrp as number, capNext = cap + Math.round(f.change * SMNRP_RATIO);
    return {
      label: 'Most you can be charged a month', value: rand(tank(l, cap)), sub: `${rpl(cap)} a litre, single maximum national retail price until ${day('2026-12-01')}`,
      example: `Example: ${num(l)} litres a month`,
      rows: [[`From ${day(NEXT_CHANGE)} (estimate)`, rand(tank(l, capNext))], ['Wholesale price, Gauteng', `${rpl(f.now)} a litre`], [`In ${monthName(PREV_MONTH.effective)}`, rand(tank(l, PREV_MONTH.smnrp))]],
    };
  }),

  /** Coast against Gauteng. */
  zone: (arg = {}) => spec([PRODUCT('p95', ['p95', 'd50', 'ipw']), { id: 'litres', label: 'Litres a month', def: 150, unit: 'l', max: 100000 }], arg, (v) => {
    const p = prod(v), gap = COAST_GAP[p], l = n(v, 'litres');
    return {
      label: 'Paid more in Gauteng than at the coast', value: `${rand(tank(l * 12, gap))} a year`, sub: `${dc(gap)} a litre: ${rpl(inForce(p))} against ${rpl(inForce(p) - gap)}`,
      example: `Example: ${num(l)} litres a month`,
      rows: [['A month', rand(tank(l, gap))], ['A 50-litre tank', rand(tank(50, gap))]],
    };
  }),

  /** Diesel against petrol for the same distance. */
  gap: (arg = {}) => spec([
    { id: 'km', label: 'Kilometres a month', def: 1500, unit: 'km', max: 50000 },
    { id: 'lp', label: 'Petrol car: litres per 100 km', def: 8, unit: 'l', max: 40, decimals: 1 },
    { id: 'ld', label: 'Diesel car: litres per 100 km', def: 6.5, unit: 'l', max: 40, decimals: 1 },
  ], arg, (v) => {
    const fp = forecast({ product: 'p95' }), fd = forecast({ product: 'd50' });
    const cp = (n(v, 'km') * n(v, 'lp') / 100) * fp.now / 100, cd = (n(v, 'km') * n(v, 'ld') / 100) * fd.now / 100;
    const np = (n(v, 'km') * n(v, 'lp') / 100) * fp.next / 100, nd = (n(v, 'km') * n(v, 'ld') / 100) * fd.next / 100;
    return {
      label: 'Diesel car saves a month', value: rand(cp - cd), sub: `petrol ${rand(cp)}, diesel ${rand(cd)} (diesel at the wholesale price)`,
      example: `Example: ${num(n(v, 'km'))} km a month`,
      rows: [[`From ${day(NEXT_CHANGE)} (estimate): petrol`, rand(np)], [`From ${day(NEXT_CHANGE)} (estimate): diesel`, rand(nd)], ['Saving then', rand(np - nd)]],
    };
  }),

  /** Bond repayment at prime with a margin. */
  bond: (arg = {}) => spec([
    { id: 'loan', label: 'Bond amount', def: EX.bond, unit: 'R', max: 100000000 }, { id: 'years', label: 'Years', def: EX.years, unit: 'years', max: 30 },
    { kind: 'select', id: 'margin', label: 'Your rate against prime', def: '0', options: [-1, -0.5, 0, 0.5, 1, 2].map((x) => ({ value: String(x), label: x === 0 ? `Prime (${formatNumber(PRIME, 2)}%)` : `Prime ${x > 0 ? '+' : '-'} ${formatNumber(Math.abs(x), 2)} (${formatNumber(PRIME + x, 2)}%)` })), help: 'In your bond agreement' },
  ], arg, (v) => {
    const r = PRIME + n(v, 'margin'), i = instalment(n(v, 'loan'), r, n(v, 'years'));
    const up = instalment(n(v, 'loan'), r + 0.25, n(v, 'years')), dn = instalment(n(v, 'loan'), r - 0.25, n(v, 'years'));
    return {
      label: 'Monthly instalment', value: rand(i), sub: `at ${formatNumber(r, 2)}% over ${num(n(v, 'years'))} years`,
      example: `Example: a ${rand(n(v, 'loan'))} bond over ${num(n(v, 'years'))} years`,
      rows: [['If the MPC hikes 0.25%', `${rand(up)} (+${rand(up - i)})`], ['If the MPC cuts 0.25%', `${rand(dn)} (-${rand(i - dn)})`], ['Interest over the term', rand(interestTotal(n(v, 'loan'), r, n(v, 'years')))]],
      note: 'Equal monthly payments, interest at the current rate for the whole term. Bank fees and life cover not included.',
    };
  }),

  /** A repo move passed on to a bond. */
  repo: (arg = {}) => spec([
    { kind: 'select', id: 'bp', label: `Decision of ${day(MPC_NEXT[0])}`, def: '25', options: BP },
    { id: 'loan', label: 'Bond or loan linked to prime', def: EX.bond, unit: 'R', max: 100000000 }, { id: 'years', label: 'Years left', def: EX.years, unit: 'years', max: 30 },
  ], arg, (v) => {
    const d = n(v, 'bp') / 100, i0 = instalment(n(v, 'loan'), PRIME, n(v, 'years')), i1 = instalment(n(v, 'loan'), PRIME + d, n(v, 'years'));
    return {
      label: 'Change in your instalment', value: `${i1 >= i0 ? '+' : '-'}${rand(Math.abs(i1 - i0))}`, sub: `repo ${formatNumber(REPO + d, 2)}%, prime ${formatNumber(PRIME + d, 2)}% (now ${formatNumber(REPO, 2)}% and ${formatNumber(PRIME, 2)}%)`,
      example: `Example: a ${rand(n(v, 'loan'))} bond at prime`,
      rows: [['Instalment now', rand(i0)], ['Instalment after', rand(i1)], ['Over a year', `${i1 >= i0 ? '+' : '-'}${rand(Math.abs(i1 - i0) * 12)}`]],
    };
  }),

  /** Path over the next meetings. */
  mpc: (arg = {}) => spec([
    { kind: 'select', id: 'path', label: 'What the MPC does at each meeting', def: '0', options: [{ value: '0', label: 'Holds' }, { value: '-25', label: 'Cuts 0.25% each time' }, { value: '25', label: 'Hikes 0.25% each time' }] },
    { id: 'loan', label: 'Bond at prime', def: EX.bond, unit: 'R', max: 100000000 }, { id: 'years', label: 'Years left', def: EX.years, unit: 'years', max: 30 },
  ], arg, (v) => {
    const step = n(v, 'path') / 100, dates = MPC_NEXT.slice(0, 4);
    const rows = dates.map((d, k) => { const r = PRIME + step * (k + 1); return [day(d), `${formatNumber(r, 2)}%`, rand(instalment(n(v, 'loan'), r, n(v, 'years')))]; });
    const last = PRIME + step * dates.length, i0 = instalment(n(v, 'loan'), PRIME, n(v, 'years')), i1 = instalment(n(v, 'loan'), last, n(v, 'years'));
    return {
      label: `Instalment after ${day(dates[dates.length - 1])}`, value: rand(i1), sub: `${i1 >= i0 ? '+' : '-'}${rand(Math.abs(i1 - i0))} a month against today’s ${rand(i0)}`,
      example: `Example: a ${rand(n(v, 'loan'))} bond, ${s(v, 'path') === '0' ? 'rates on hold' : 'a 0.25% move at each meeting'}`,
      rows: [['Prime today', `${formatNumber(PRIME, 2)}%`], ['Prime after four meetings', `${formatNumber(last, 2)}%`]],
      table: { caption: 'Prime and your instalment after each announcement (a new rate applies from the next day)', headers: ['Meeting', 'Prime', 'Instalment'], rows, align: ['l', 'r', 'r'] },
      note: 'A scenario, not a forecast of the Reserve Bank’s decisions.',
    };
  }),

  /** Car instalment and fuel together. */
  car: (arg = {}) => spec([
    { id: 'loan', label: 'Amount financed', def: EX.car, unit: 'R', max: 20000000 }, { id: 'years', label: 'Years', def: EX.carYears, unit: 'years', max: 8 },
    { kind: 'select', id: 'margin', label: 'Rate against prime', def: '2', options: [0, 1, 2, 3, 4, 5].map((x) => ({ value: String(x), label: `Prime + ${x} (${formatNumber(PRIME + x, 2)}%)` })), help: 'On the finance quote' },
    { id: 'balloon', label: 'Balloon payment at the end', def: 0, unit: '%', max: 40, adv: true, short: 'balloon' },
    { id: 'km', label: 'Kilometres a month', def: EX.kmDay * EX.days, unit: 'km', max: 50000 }, L100,
  ], arg, (v) => {
    const r = PRIME + n(v, 'margin'), i = instalment(n(v, 'loan'), r, n(v, 'years'), (n(v, 'loan') * n(v, 'balloon')) / 100);
    const fuel = (n(v, 'km') * n(v, 'l100') / 100) * inForce('p95') / 100;
    return {
      label: 'Car instalment and petrol a month', value: rand(i + fuel), sub: `${rand(i)} instalment at ${formatNumber(r, 2)}% + ${rand(fuel)} of petrol 95 (Gauteng)`,
      example: `Example: ${rand(n(v, 'loan'))} over ${num(n(v, 'years'))} years, ${num(n(v, 'km'))} km a month`,
      rows: [['Instalment if prime rises 0.25%', rand(instalment(n(v, 'loan'), r + 0.25, n(v, 'years'), (n(v, 'loan') * n(v, 'balloon')) / 100))], [`Petrol from ${day(NEXT_CHANGE)} (estimate)`, rand((n(v, 'km') * n(v, 'l100') / 100) * forecast({ product: 'p95' }).next / 100)], ...(n(v, 'balloon') ? [['Balloon due at the end', rand((n(v, 'loan') * n(v, 'balloon')) / 100)] as [string, string]] : [])],
      note: 'No insurance, licence, tyres or service fees.',
    };
  }),

  /** What R100,000 earns or costs at each published rate. */
  rates: (arg = {}) => spec([{ id: 'amount', label: 'Amount', def: 100000, unit: 'R', max: 100000000 }], arg, (v) => {
    const a = n(v, 'amount'), y = (r: number) => rand((a * r) / 100);
    return {
      label: 'A year of interest at prime', value: y(PRIME), sub: `${formatNumber(PRIME, 2)}%, what banks charge their best borrowers`,
      example: `Example: ${rand(a)}`,
      rows: [[`Repo rate ${formatNumber(MARKET.repo.rate, 2)}%`, y(MARKET.repo.rate)], [`91-day treasury bill ${formatNumber(MARKET.tbill91.rate, 2)}%`, y(MARKET.tbill91.rate)], [`364-day treasury bill ${formatNumber(MARKET.tbill364.rate, 2)}%`, y(MARKET.tbill364.rate)], [`3-month JIBAR ${formatNumber(MARKET.jibar3m.rate, 2)}%`, y(MARKET.jibar3m.rate)]],
      note: `Rates published by the Reserve Bank for ${day(MARKET.tbill91.date)}; simple interest over one year, before tax.`,
    };
  }),

  /** Instalment at prime on a past date. */
  prime: (arg = {}) => spec([
    { id: 'loan', label: 'Bond at prime', def: EX.bond, unit: 'R', max: 100000000 }, { id: 'years', label: 'Years', def: EX.years, unit: 'years', max: 30 },
    { kind: 'select', id: 'when', label: 'Compare with prime of', def: '2025-11-21', options: PRIME_STEPS.slice(1, -1).map((p) => ({ value: p.from, label: `${day(p.from)} (${formatNumber(p.rate, 2)}%)` })).reverse() },
  ], arg, (v) => {
    const then = rateAt(PRIME_STEPS, s(v, 'when')), i0 = instalment(n(v, 'loan'), then, n(v, 'years')), i1 = instalment(n(v, 'loan'), PRIME, n(v, 'years'));
    return {
      label: `Instalment at today’s ${formatNumber(PRIME, 2)}%`, value: rand(i1), sub: `${i1 >= i0 ? '+' : '-'}${rand(Math.abs(i1 - i0))} a month against ${formatNumber(then, 2)}% on ${day(s(v, 'when'))}`,
      example: `Example: a ${rand(n(v, 'loan'))} bond over ${num(n(v, 'years'))} years`,
      rows: [[`At ${formatNumber(then, 2)}%`, rand(i0)], ['Prime is the repo rate plus', `${formatNumber(PRIME - REPO, 2)} points`]],
    };
  }),
};

/** The home calculator is the forecast. */
SPECS.all = SPECS.forecast;

export function getTool(kind: string, arg?: Arg): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  return f(arg);
}
export const TOOL_KINDS = Object.keys(SPECS);
export { DAILIES };
