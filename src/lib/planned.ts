/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
export const PLANNED_GUIDES = [
  'petrol-price-december-2026', 'petrol-price-november-2026', 'petrol-price-history', 'fuel-price-coast-vs-inland',
  'petrol-95-price', 'petrol-93-price', 'diesel-price', 'paraffin-price', 'lpg-gas-price',
  'fuel-cost-per-km', 'diesel-vs-petrol-price',
  'what-is-in-a-litre-of-petrol', 'fuel-levy', 'slate-levy', 'basic-fuel-price', 'rand-and-oil-price',
  'repo-rate', 'prime-rate', 'bond-repayment', 'mpc-meeting-dates', 'interest-rates-south-africa',
];
export const PLANNED_IDS = new Set<string>(PLANNED_GUIDES);
