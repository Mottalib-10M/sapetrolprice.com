/**
 * Writing kit: every figure written in a page comes from here, never typed by hand.
 *   K.E                    the engine (lib/engine/fuel.ts): MONTHS, HISTORY, LATEST, forecast(), structureOf(), instalment()…
 *   K.F.p95 … K.F.ipw      next month's estimate per fuel (default assumptions, the same as every calculator)
 *   K.S.p95 …              what a litre is made of (Annexure 1 of the latest statement)
 *   K.EX                   the one example case of the whole site
 *   formats                K.rand(1512) "R1,512", K.rpl(3024) "R30.24", K.dc(-232) "-232c", K.dr(-232) "-R2.32" (price moves only),
 *                          K.c(279) "279c" (amounts), K.rec(382) "382c over-recovery", K.recEff(382) "lowers the price by 382c"
 */
import * as E from './engine/fuel';
import { EX } from './tool-specs';
import { rand, rc, rpl, dc, dr, cents, rands, rec, recShort, effect, recEffect, moveWords, num, pct, day, monthName, monthOnly } from './fmt';
import { formatNumber } from './format';
import P from '../data/params-2026.json';

const F = Object.fromEntries(E.PRODUCTS.map((p) => [p, E.forecast({ product: p })])) as Record<E.Product, E.ForecastOut>;
const S = Object.fromEntries(['p95', 'p93', 'd50', 'd005', 'ipw'].map((p) => [p, E.structureOf(p as E.Product)])) as Record<E.Product, ReturnType<typeof E.structureOf>>;
const bt95 = E.backtest('p95'), bt50 = E.backtest('d50');
const month = (eff: string) => E.MONTHS.find((m) => m.effective.startsWith(eff.slice(0, 7)))!;
/** 93 pump price in Gauteng for each 2026 window, from the daily sheets (the statements' history lists 95 only). */
const p93At = (iso: string) => E.DAILIES.find((d) => d.date.slice(0, 7) === iso.slice(0, 7))?.inForce.p93 as number;

export const KIT = {
  E, F, S, EX, P, month, p93At,
  BT: { p95: bt95, d50: bt50, mae95: E.meanAbs(bt95.map((r) => r.projected - r.final)), maeAvg95: E.meanAbs(bt95.map((r) => r.avg - r.final)), mae50: E.meanAbs(bt50.map((r) => r.projected - r.final)), maeAvg50: E.meanAbs(bt50.map((r) => r.avg - r.final)) },
  rand, rc, rpl, dc, dr, num,
  /** Signs (naive testers 2026-11-14): dc/dr for a price move or a signed gap (diesel minus petrol, change of a levy); c for an amount ("279c"); rec for a recovery
   *  ("382c over-recovery"); eff/recEff for what a part does to the price ("lowers the price by 382c"). */
  c: cents, rands, rec, recS: recShort, eff: effect, recEff: recEffect, moveWords, pct, day, month_: monthName, mon: monthOnly,
  dec: (x: number, d = 2) => formatNumber(x, d),
  /** "7.25%" */
  rate: (x: number) => `${formatNumber(x, 2)}%`,
  tank: E.tank,
  RETRIEVED: P.retrieved_at,
};
export type Kit = typeof KIT;
