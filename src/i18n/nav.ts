import { route, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Petrol price next month', method: 'How the estimate is made', about: 'About', widget: 'Embed the estimate', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'prices', label: 'Next month and history' },
  { id: 'fuels', label: 'Price by fuel' },
  { id: 'costs', label: 'What driving costs you' },
  { id: 'why', label: 'Why the price moves' },
  { id: 'rates', label: 'Also: interest rates and your bond' },
];
export const label = (id: string, _lang?: Locale) => CORE[id] ?? pageById(id)?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
const inMenu = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inMenu(g.id, lang) })).filter((c) => c.links.length);
}
// Method: linked in the footer and the mobile menu, outside the top menu so that it fits on one line.
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inMenu(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** The pages most people come for, one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => ['petrol-price-december-2026', 'diesel-price', 'petrol-95-price', 'repo-rate', 'prime-rate', 'bond-repayment'].filter((id) => pageById(id)).map((id) => link(id, lang));
