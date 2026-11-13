/** Display formats: rand with a point for cents, as the Central Energy Fund and the press write them (R30.24). */
import { formatNumber, formatPercent, displayDate } from './format';

/** R1,512 (whole rand). */
export const rand = (x: number) => `${x < -0.5 ? '-' : ''}R${formatNumber(Math.abs(Math.round(x)), 0)}`;
/** R30.24 (rand and cents). */
export const rc = (x: number) => `${x < -0.005 ? '-' : ''}R${formatNumber(Math.abs(x), 2)}`;
/** A price in cents per litre shown in rand a litre: 3024 -> R30.24. */
export const rpl = (cpl: number) => rc(cpl / 100);
/** A change in cents: "+128c", "-232c" (rounded to the cent like the statements). */
export const dc = (c: number) => `${c > 0.5 ? '+' : c < -0.5 ? '-' : ''}${formatNumber(Math.abs(Math.round(c)), 0)}c`;
/** A change in rand a litre: "+R1.28", "-R2.32". */
export const dr = (c: number) => `${c > 0.5 ? '+' : c < -0.5 ? '-' : ''}R${formatNumber(Math.abs(c) / 100, 2)}`;
export const num = (x: number, d = 0) => formatNumber(x, d);
export const pct = (x: number, d = 1) => formatPercent(x, d);
export const day = (iso: string) => displayDate(iso, 'en-ZA');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "December 2026" from "2026-12-02". */
export const monthName = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
export const monthOnly = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];
