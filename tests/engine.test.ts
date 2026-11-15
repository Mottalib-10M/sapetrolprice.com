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

/** Naive testers 2026-11-14: petrol 95 fell by 232c in the big figure while the lines under it said "+312c", "+382c over",
 *  "+150c", and pages wrote "an under-recovery of +1,013c" or "pulls petrol down by about +382c". */
import { dc, cents, rec, recShort, effect, moveWords } from '../src/lib/fmt';
import { answerLine, changeRows, whyOthers } from '../src/lib/tool-specs';
import { readFileSync, readdirSync } from 'node:fs';

describe('signs of the price move', () => {
  it('amounts, recoveries and effects never carry a "+"', () => {
    expect(cents(1406)).toBe('1,406c');
    expect(cents(-1013)).toBe('1,013c');
    expect(rec(382)).toBe('382c over-recovery');
    expect(rec(-1013)).toBe('1,013c under-recovery');
    expect(recShort(-20)).toBe('20c under');
    expect(effect(-382)).toBe('lowers the price by 382c');
    expect(effect(150)).toBe('raises the price by 150c');
    expect(effect(0.2)).toBe('leaves the price unchanged');
  });
  it('a price move keeps its sign, in cents and in words', () => {
    expect(dc(-232)).toBe('-232c');
    expect(dc(128)).toBe('+128c');
    expect(moveWords(-232)).toBe('drops by R2.32 a litre');
    expect(moveWords(128)).toBe('rises by R1.28 a litre');
  });
  it('an over-recovery lowers the price, an under-recovery raises it', () => {
    for (const p of E.PRODUCTS) {
      const f = E.forecast({ product: p, reliefEnds: false });
      if (f.roundedRecovery > 0) expect(f.change).toBeLessThan(0);
      if (f.roundedRecovery < 0) expect(f.change).toBeGreaterThan(0);
    }
  });
  it('one figure for the month: the parts under the big figure add up to it, each in words', () => {
    for (const p of E.PRODUCTS) {
      const f = E.forecast({ product: p });
      expect(f.change).toBe(-f.roundedRecovery + f.levyEffect + f.slate);
      const rows = changeRows(f);
      const parts = rows.slice(0, -1).map(([, v]) => v);
      for (const v of parts) { expect(v).toMatch(/^(lowers|raises|leaves) it/); expect(v).not.toContain('+'); }
      expect(rows[rows.length - 1][1]).toBe(`${dc(f.change)} a litre`);
      const signed = parts.reduce((a, v) => a + (v.startsWith('lowers') ? -1 : v.startsWith('raises') ? 1 : 0) * Number(v.replace(/[^\d]/g, '')), 0);
      expect(signed).toBe(Math.round(f.change));
    }
  });
  it('the answer sentence says the direction of the big figure in rand', () => {
    const f = E.forecast({ product: 'p95' });
    const s = answerLine('p95', f);
    expect(s).toContain(moveWords(f.change));
    expect(s).toContain(dc(f.change));
    expect(whyOthers(f)).toContain(rec(f.averageSoFar));
    expect(whyOthers(f)).not.toMatch(/\+\d+c (over|under)/);
  });
  it('the home calculator shows no "+" anywhere but the price move', () => {
    const s = getTool('all');
    const out = s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])) as never);
    const plus = [out.sub ?? '', ...out.rows.map((r) => r[1]), out.note ?? ''].join(' ').match(/\+[\d,]+c/g) ?? [];
    const f = E.forecast({ product: 'p95' });
    for (const x of plus) expect(x).toBe(dc(f.change));
  });
  it('the Basic Fuel Price calculator starts from the home page figure', () => {
    const t = (k: string) => { const s = getTool(k); return s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])) as never); };
    expect(t('recovery').value).toBe(`${dc(E.forecast({ product: 'p95' }).change)} a litre`);
  });
  it('a signed gap keeps its minus: diesel cheaper than petrol, levy cut', () => {
    expect(dc(22.45 * 100 - 25.12 * 100)).toBe('-267c');
    expect(dc(113.94 - 157.74)).toBe('-44c');
    const h = E.HISTORY[0];
    expect(h.d50[0] - h.p95[0]).toBeLessThan(0);
    const dir = new URL('../dist/', import.meta.url);
    let html = '';
    try { html = readFileSync(new URL('en/diesel-vs-petrol-price/index.html', dir), 'utf8') + readFileSync(new URL('en/slate-levy/index.html', dir), 'utf8'); } catch { return; }
    expect(html).toContain(`>${dc(h.d50[0] - h.p95[0])}<`);
    expect(html).toContain('>-44c<');
  });
  it('no page text puts a "+" before a recovery, a levy or a "down by"', () => {
    const dir = new URL('../dist/', import.meta.url);
    let html = '';
    const walk = (d: URL) => { for (const e of readdirSync(d, { withFileTypes: true })) { if (e.isDirectory()) walk(new URL(`${e.name}/`, d)); else if (e.name.endsWith('.html')) html += readFileSync(new URL(e.name, d), 'utf8'); } };
    try { walk(dir); } catch { return; }
    const text = html.replace(/<[^>]+>/g, ' ').replace(/ /g, ' ');
    const bad = [/(over|under)-recovery (of|so far)\s*\+[\d,]+c/gi, /\+[\d,]+c (over|under)\b/g, /(down|cut|lower|fall|falls|drop|drops) by (about )?\+[\d,]+c/gi, /(levy|rate) (of|at) \+[\d,]+c/gi]
      .flatMap((re) => [...text.matchAll(re)].map((m) => text.slice(Math.max(0, m.index! - 40), m.index! + m[0].length)));
    expect(bad).toEqual([]);
  });
});
