/** Engine checks against the CEF documents read on 2026-11-13. */
import { describe, expect, it } from 'vitest';
import * as E from '../src/lib/engine/fuel';
import { getTool } from '../src/lib/tool-specs';

describe('fuel engine', () => {
  it('November statement: 95 change = under-recovery - levy relief + slate increase, rounded', () => {
    const n = E.LAST_MONTH, o = E.PREV_MONTH;
    expect(Math.round(-n.recovery!.p95 - E.RELIEF.petrol + (n.slate - o.slate))).toBe(n.change.p95);
  });
  it('price structure of 95 adds up to the Gauteng pump price', () => {
    expect(E.structureOf('p95').total).toBeCloseTo(E.inForce('p95'), 1);
  });
  it('forecast: projected gap lies between the average and the latest day', () => {
    for (const p of E.PRODUCTS) {
      const f = E.forecast({ product: p });
      expect(f.projected).toBeGreaterThanOrEqual(Math.min(f.averageSoFar, f.latestDay));
      expect(f.projected).toBeLessThanOrEqual(Math.max(f.averageSoFar, f.latestDay));
      expect(f.next).toBeCloseTo(f.now + f.change, 6);
    }
  });
  it('method B came closer than method A on every 2026 window for petrol 95', () => {
    for (const r of E.backtest('p95')) expect(Math.abs(r.projected - r.final)).toBeLessThanOrEqual(Math.abs(r.avg - r.final));
  });
  it('home calculator and the December page show the same 95 figure', () => {
    const v = (k: string) => { const s = getTool(k); return s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])) as never).value; };
    expect(v('all')).toBe(v('forecast'));
  });
  it('bond: R1.5 million over 20 years at prime 10.75%', () => {
    expect(Math.round(E.instalment(1500000, 10.75, 20))).toBe(15228);
  });
});
