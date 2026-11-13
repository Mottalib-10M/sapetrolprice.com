/**
 * Fuel and rates engine. Pure functions over the figures of the Central Energy Fund (src/data/cef.json) and the
 * South African Reserve Bank (src/data/sarb.json). Cents per litre (c/l) inside, rand only for display.
 *
 * The mechanism (CEF media statement of 30 October 2026): "the over- or under-recovery during the prior month will be
 * corrected in the following month". Each business day the CEF compares the Basic Fuel Price (BFP, what the fuel would
 * cost landed in South Africa that day) with the BFP built into the pump price. The average gap over the pricing
 * window, rounded to the cent, becomes next month's change, to which the Minister adds levy changes.
 */
import CEF from '../../data/cef.json';
import SARB from '../../data/sarb.json';

export type Product = 'p95' | 'p93' | 'd50' | 'd005' | 'ipw';
export const PRODUCTS: Product[] = ['p95', 'p93', 'd50', 'd005', 'ipw'];
export const PRODUCT_NAME: Record<Product, string> = {
  p95: 'Petrol 95', p93: 'Petrol 93', d50: 'Diesel 0.05% (500 ppm)', d005: 'Diesel 0.005% (50 ppm)', ipw: 'Illuminating paraffin (wholesale)',
};
/** Key of the same product in the daily sheet (paraffin is "ip" there). */
const DK: Record<Product, string> = { p95: 'p95', p93: 'p93', d50: 'd50', d005: 'd005', ipw: 'ip' };
export const isPetrol = (p: Product) => p === 'p95' || p === 'p93';
export const isDiesel = (p: Product) => p === 'd50' || p === 'd005';

export const MONTHS = CEF.months;
export const HISTORY = CEF.history;
export const DAILIES = CEF.dailies;
export const LATEST = CEF.dailies[CEF.dailies.length - 1];
export const LAST_MONTH = CEF.months[CEF.months.length - 1];
export const PREV_MONTH = CEF.months[CEF.months.length - 2];
export const STRUCTURE = CEF.structure;
export const CEF_BUILT = CEF.built;

/** Business days (Monday to Friday) from a to b, both included. */
export function businessDays(a: string, b: string): number {
  const d = new Date(`${a}T00:00:00Z`), e = new Date(`${b}T00:00:00Z`);
  let n = 0;
  while (d <= e) { const w = d.getUTCDay(); if (w !== 0 && w !== 6) n += 1; d.setUTCDate(d.getUTCDate() + 1); }
  return n;
}

/** Pricing windows of 2026 ran 20 to 25 business days (statements of March to November). The window that opened on
 *  30 October is assumed to close on Thursday 26 November, 20 business days, like the windows of October and November. */
export const WINDOW_END_ASSUMED = '2026-11-26';
export const WINDOW_DAYS = businessDays(LATEST.window[0], WINDOW_END_ASSUMED);
export const DAYS_SO_FAR = businessDays(LATEST.window[0], LATEST.window[1]);
/** Next change: first Wednesday of December 2026; the levy relief runs "for the period 4 November to 1 December 2026". */
export const NEXT_CHANGE = '2026-12-02';

/** Fuel levy in force now and the full rate it returns to (statements of 7 October and 4 November 2026). */
export const LEVY_NOW = LAST_MONTH.fuelLevy;
export const LEVY_FULL = PREV_MONTH.fuelLevy;
export const RELIEF = { petrol: LEVY_FULL.petrol - LEVY_NOW.petrol, diesel: LEVY_FULL.diesel - LEVY_NOW.diesel };
const reliefOf = (p: Product) => (isPetrol(p) ? RELIEF.petrol : isDiesel(p) ? RELIEF.diesel : 0);

/** Price in force (c/l), Gauteng: pump price for petrol, wholesale price for diesel and paraffin. */
export const inForce = (p: Product) => LATEST.inForce[p] as number;
/** Coast (zone 1A) minus Gauteng, from the price history of the latest statement. Petrol 93 and 50 ppm diesel are not
 *  listed at the coast: the 95 and 500 ppm gaps are used for them. */
const lastH = HISTORY[HISTORY.length - 1];
export const COAST_GAP: Record<Product, number> = {
  p95: lastH.p95[0] - lastH.p95[1], p93: lastH.p95[0] - lastH.p95[1], d50: lastH.d50[0] - lastH.d50[1], d005: lastH.d50[0] - lastH.d50[1], ipw: lastH.ipw[0] - lastH.ipw[1],
};

export interface ForecastIn {
  product: Product;
  /** 'latest': the days still to come at the latest daily gap (the method that came closer in 9 of 9 months tested); 'average': at the average so far. */
  method?: 'latest' | 'average';
  /** Move of the Basic Fuel Price for the rest of the window, in percent (oil and rand together). */
  move?: number;
  /** Does the levy relief end on 1 December as announced? */
  reliefEnds?: boolean;
  /** Change of the slate levy, c/l (the statement sets it from the slate balance; not known in advance). */
  slate?: number;
}
export interface ForecastOut {
  averageSoFar: number; latestDay: number; projected: number; roundedRecovery: number; levyEffect: number; slate: number;
  /** Change in c/l, + = increase. */
  change: number; now: number; next: number; nowCoast: number; nextCoast: number;
}
/** Next month's change for one product. */
export function forecast(i: ForecastIn): ForecastOut {
  const k = DK[i.product];
  const avg = (LATEST.average as Record<string, number>)[k], day = (LATEST.day as Record<string, number>)[k];
  const bfp = (LATEST.bfp as Record<string, number>)[k];
  const rest = WINDOW_DAYS - DAYS_SO_FAR;
  const restGap = (i.method === 'average' ? avg : day) - bfp * ((i.move ?? 0) / 100);
  const projected = (avg * DAYS_SO_FAR + restGap * rest) / WINDOW_DAYS;
  const roundedRecovery = Math.round(projected);
  const levyEffect = i.reliefEnds === false ? 0 : reliefOf(i.product);
  const slate = isPetrol(i.product) || isDiesel(i.product) ? (i.slate ?? 0) : 0;
  const change = -roundedRecovery + levyEffect + slate;
  const now = inForce(i.product);
  return { averageSoFar: avg, latestDay: day, projected, roundedRecovery, levyEffect, slate, change, now, next: now + change, nowCoast: now - COAST_GAP[i.product], nextCoast: now - COAST_GAP[i.product] + change };
}

/** Paraffin: the single maximum national retail price (SMNRP) moved by 1.33 times the wholesale change in every 2026
 *  statement (VAT and margins are a share of the price). Mean ratio of the statements where both moved. */
export const SMNRP_RATIO = (() => {
  const r = MONTHS.filter((m) => m.change.ipw && Math.abs(m.change.ipw) > 20).map((m) => (m.smnrp - m.smnrpPrev) / (m.change.ipw as number));
  return r.reduce((a, b) => a + b, 0) / r.length;
})();

/** Mid-window test of both methods against the final recovery of the statement that followed (95 and 500 ppm diesel). */
export interface BacktestRow { sheet: string; effective: string; n: number; N: number; avg: number; latest: number; projected: number; final: number }
export function backtest(p: 'p95' | 'd50'): BacktestRow[] {
  const rows: BacktestRow[] = [];
  for (const d of DAILIES) {
    const m = MONTHS.find((x) => x.window && x.window[0] === d.window[0]);
    if (!m || !m.recovery) continue;
    const N = businessDays(m.window![0], m.window![1]), n = businessDays(d.window[0], d.window[1]);
    const avg = (d.average as Record<string, number>)[p], latest = (d.day as Record<string, number>)[p];
    rows.push({ sheet: d.date, effective: m.effective, n, N, avg, latest, projected: (avg * n + latest * (N - n)) / N, final: (m.recovery as Record<string, number>)[p] });
  }
  return rows;
}
export const meanAbs = (xs: number[]) => xs.reduce((a, b) => a + Math.abs(b), 0) / xs.length;

/** Price on a date of the history (c/l), Gauteng [0] or coast [1]. */
export type HistKey = 'p95' | 'd50' | 'ipw' | 'lpg';
export const historyAt = (date: string) => [...HISTORY].reverse().find((h) => h.date <= date) ?? HISTORY[0];

/** What a litre is made of, for one product (Annexure 1 of the latest statement). */
export function structureOf(p: Product) {
  const col = STRUCTURE.columns.indexOf(p);
  const r = STRUCTURE.rows as Record<string, number[]>;
  const v = (k: string) => r[k]?.[col] ?? 0;
  const taxes = v('Fuel levy') + v('RAF levy') + v('Customs & excise duty') + v('Petroleum Products levy') + v('IP Tracer levy');
  const slate = v('Slate levy');
  const bfp = v('Contribution to the Basic Fuel');
  const margins = v('Wholesale margin') + v('Retail margin') + v('Secondary Storage') + v('Secondary Distribution') + v('Router Differential');
  const zone = v('Zone differential in Gauteng');
  const total = bfp + taxes + slate + margins + zone + v('Pump rounding');
  return { bfp, fuelLevy: v('Fuel levy'), raf: v('RAF levy'), customs: v('Customs & excise duty'), ppl: v('Petroleum Products levy') + v('IP Tracer levy'), taxes, slate, margins, retail: v('Retail margin'), wholesale: v('Wholesale margin'), storage: v('Secondary Storage') + v('Secondary Distribution') + v('Router Differential'), zone, rounding: v('Pump rounding'), total };
}

/** Cost helpers. */
export const tank = (litres: number, cpl: number) => (litres * cpl) / 100;
export const perKm = (l100: number, cpl: number) => (l100 / 100) * (cpl / 100);
export const monthly = (kmDay: number, days: number, l100: number, cpl: number) => kmDay * days * perKm(l100, cpl);

/** Rand effect: a move of x% of the rand against the dollar changes the BFP by about x% (product and freight are
 *  priced in dollars). Cents per litre, + = more expensive. */
export const randEffect = (p: Product, randWeakerPct: number) => ((LATEST.bfp as Record<string, number>)[DK[p]] * randWeakerPct) / 100;
export const bfpNow = (p: Product) => (LATEST.bfp as Record<string, number>)[DK[p]];

/* ---------------- Interest rates (SARB) ---------------- */
export const REPO = SARB.repo.last.rate;
export const PRIME = SARB.prime.last.rate;
export const RATES_DATE = SARB.repo.last.date;
export const REPO_STEPS = SARB.repo.steps;
export const PRIME_STEPS = SARB.prime.steps;
export const MARKET = SARB.market;
export const MPC_NEXT = SARB.mpcUpcoming;
export const SARB_BUILT = SARB.built;

/** Monthly instalment of a loan repaid in equal monthly payments. Rate in percent a year. */
export function instalment(principal: number, ratePct: number, years: number, balloon = 0): number {
  const n = Math.round(years * 12), r = ratePct / 100 / 12;
  if (n <= 0) return 0;
  const pv = principal - balloon / Math.pow(1 + r, n);
  return r === 0 ? pv / n : (pv * r) / (1 - Math.pow(1 + r, -n));
}
/** Total interest paid over the term. */
export const interestTotal = (principal: number, ratePct: number, years: number) => instalment(principal, ratePct, years) * Math.round(years * 12) - principal;
/** Rate in force on a date (percent). */
export const rateAt = (steps: Array<{ from: string; rate: number }>, date: string) => [...steps].reverse().find((s) => s.from <= date)?.rate ?? steps[0].rate;
