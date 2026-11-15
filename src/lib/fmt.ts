/** Display formats: rand with a point for cents, as the Central Energy Fund and the press write them (R30.24). */
import { formatNumber, formatPercent, displayDate } from './format';

/** R1,512 (whole rand). */
export const rand = (x: number) => `${x < -0.5 ? '-' : ''}R${formatNumber(Math.abs(Math.round(x)), 0)}`;
/** R30.24 (rand and cents). */
export const rc = (x: number) => `${x < -0.005 ? '-' : ''}R${formatNumber(Math.abs(x), 2)}`;
/** A price in cents per litre shown in rand a litre: 3024 -> R30.24. */
export const rpl = (cpl: number) => rc(cpl / 100);
/** A change of the PRICE in cents: "+128c", "-232c" (rounded to the cent like the statements). For a price move or a signed gap
 *  ("diesel minus petrol": -267c when diesel is cheaper; naive testers tour 2, 2026-11-14): never for a price, a levy or a recovery (naive testers 2026-11-14: "+382c" read as a rise while petrol fell). */
export const dc = (c: number) => `${c > 0.5 ? '+' : c < -0.5 ? '-' : ''}${formatNumber(Math.abs(Math.round(c)), 0)}c`;
/** A change in rand a litre: "+R1.28", "-R2.32". */
export const dr = (c: number) => `${c > 0.5 ? '+' : c < -0.5 ? '-' : ''}R${formatNumber(Math.abs(c) / 100, 2)}`;
/** An amount in cents a litre, never signed: a price, a levy, a cost ("1,406c"). */
export const cents = (c: number) => `${formatNumber(Math.abs(Math.round(c)), 0)}c`;
/** An amount in rand a litre, never signed ("R3.82"). */
export const rands = (c: number) => `R${formatNumber(Math.abs(c) / 100, 2)}`;
/** A CEF over- or under-recovery (positive = over-recovery, the pump price is above cost) in words: "382c over-recovery". */
export const rec = (r: number) => `${cents(r)} ${r >= 0 ? 'over' : 'under'}-recovery`;
/** A recovery in a table cell: "438c over", "20c under" (the column header says it is a recovery). */
export const recShort = (r: number) => `${cents(r)} ${r >= 0 ? 'over' : 'under'}`;
/** What a part of the change does to the price, its sign in words (c: + raises, - lowers): "lowers the price by 382c". */
export const effect = (c: number, what = 'the price') => (Math.round(c) < 0 ? `lowers ${what} by ${cents(c)}` : Math.round(c) > 0 ? `raises ${what} by ${cents(c)}` : `leaves ${what} unchanged`);
/** The same effect for a breakdown row: "lowers it by 382c". */
export const effectRow = (c: number) => effect(c, 'it');
/** What an over- or under-recovery does to next month's price: an over-recovery (r > 0) lowers it. */
export const recEffect = (r: number) => effect(-r);
/** The month's move in one plain sentence: "drops by R2.32 a litre", "rises by R1.28 a litre", "stays the same". */
export const moveWords = (c: number) => (Math.round(c) < 0 ? `drops by ${rands(c)} a litre` : Math.round(c) > 0 ? `rises by ${rands(c)} a litre` : 'stays the same');
export const num = (x: number, d = 0) => formatNumber(x, d);
export const pct = (x: number, d = 1) => formatPercent(x, d);
export const day = (iso: string) => displayDate(iso, 'en-ZA');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "December 2026" from "2026-12-02". */
export const monthName = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
export const monthOnly = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];
