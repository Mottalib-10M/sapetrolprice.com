#!/usr/bin/env python3
"""Builds src/data/cef.json from the Central Energy Fund's own PDFs (media statements and daily Basic Fuel Price).

Usage: python3 scripts/data/build-cef.py [--auto] <cache-dir>
The cache dir receives the PDFs downloaded from cefgroup.co.za (never committed: the documents stay the CEF's; the site
keeps only the figures, recalculated and dated). Re-run after each new media statement or to refresh the daily figures,
then `npm run check`. The site says the date of every figure.

--auto (used by `npm run update-data`, scheduled on weekdays in .github/workflows/deploy.yml): the lists below are not
used; the media statements and the daily sheets are read from the CEF's own list pages (STATEMENT_PAGES, DAILY_PAGES).
One daily sheet per month is kept (the first one dated the 12th or later, as in the hand-picked list) and, for the last
month, the latest sheet. Nothing dated after WINDOW_END_ASSUMED (src/lib/engine/fuel.ts) is taken: the change to the
next pricing window needs the constants and the text of the site to be read again by hand, so the script then keeps
the current window and prints a warning. In January, add the CEF's new yearly list pages below.
"""
import datetime as dt, json, os, re, subprocess, sys
import pypdf

AUTO = '--auto' in sys.argv
CACHE = [a for a in sys.argv[1:] if not a.startswith('--')][0]
UA = 'sapetrolprice.com data reader (+https://sapetrolprice.com)'
BASE = 'https://cefgroup.co.za/wp-content/uploads/'
# Media statements of 2026 (list read on https://cefgroup.co.za/2026-3/ on 2026-11-13).
STATEMENTS = [
    '2026/01/Press-Release-02-January-2026-Change-07-January-26.pdf',
    '2026/02/Press-Release-30-January-2026-Change-04-Febuary-26-1.pdf',
    '2026/03/Press-Release-27-February-2026-Change-04-March-26.pdf',
    '2026/03/Press-Release-27-March-26-Change-01-April-2026.pdf',
    '2026/05/Press-release-30-Ap-26-Change-06-May-2026-3.pdf',
    '2026/06/Press-Release-29-May-26-Change-03-June-26.pdf',
    '2026/07/Press-release-26-June-26-Change-01-July-26.pdf',
    '2026/08/Press-Release-31-July-2026-Change-05-August-2026.pdf',
    '2026/08/Press-Release-28-August-2026-Change-02-September-2026.pdf',
    '2026/10/Press-Release-02-October-2026-Change-07-October-2026.pdf',
    '2026/11/Press-Release-30-October-2026-Change-04-November-2026.pdf',
]
# One daily Basic Fuel Price sheet near the middle of each pricing window, and the latest one.
DAILIES = ['2026/01/Daily-12-01-2026.pdf', '2026/02/Daily-12-02-2026.pdf', '2026/03/Daily-12-03-2026.pdf', '2026/04/Daily-13-04-2026.pdf',
           '2026/05/Daily-12-05-2026.pdf', '2026/06/Daily-12-06-2026.pdf', '2026/07/Daily-13-07-2026.pdf', '2026/08/Daily-12-08-2026.pdf',
           '2026/09/Daily-14-09-2026.pdf', '2026/10/Daily-12-10-2026.pdf', '2026/11/Daily-11-11-2026.pdf']
# Yearly list pages of the CEF (read on 2026-11-14): media statements, then daily Basic Fuel Price sheets.
STATEMENT_PAGES = ['https://cefgroup.co.za/2026-3/']
DAILY_PAGES = ['https://cefgroup.co.za/2026-4/']
MON = {m: i + 1 for i, m in enumerate(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'])}


def fetch(rel):
    p = os.path.join(CACHE, os.path.basename(rel))
    if not os.path.exists(p) or os.path.getsize(p) < 1000:
        subprocess.run(['curl', '-sL', '-A', UA, '-m', '60', '-o', p, BASE + rel], check=True)
    with open(p, 'rb') as f:
        if f.read(5) != b'%PDF-':
            raise SystemExit(f'not a PDF: {rel}')
    return '\n'.join(pg.extract_text() or '' for pg in pypdf.PdfReader(p).pages)


def signed(s):
    s = s.strip()
    neg = s.startswith('(')
    v = float(s.strip('() ').replace(' ', '').replace(',', ''))
    return -v if neg else v


def iso(d, m, y): return f'{y}-{MON[m.lower()]:02d}-{int(d):02d}'
def isod(s): return dt.datetime.strptime(s, '%d/%m/%Y').date().isoformat()


def statement(t):
    flat = re.sub(r'\s+', ' ', t)
    r = {}
    m = re.search(r'PRICE CHANGES TO BE EFFECTED ON \w+ (\d{2}) (\w+) (\d{4})', t); r['effective'] = iso(*m.groups())
    m = re.search(r'FOR RELEASE ON (\d{2}) (\w+) (\d{4})', t); r['released'] = iso(*m.groups())
    sec = flat[:flat.find('cents per kilogram') + 60]

    def grab(pat):
        m = re.search(pat + r'.{0,40}?(\(\s*[\d ,.]+\)|\d[\d,.]*(?: \d{3})*(?:\.\d+)?)\s*(?:\([\d ,.]+\))?\s*cents per (?:litre|kilogram) (increase|decrease)', sec)
        if not m: return None
        v = abs(signed(m.group(1)))
        return v if m.group(2) == 'increase' else -v
    both = grab(r'Both [Gg]rades of Petrol 93 & 95')
    # Change in cents (+ = increase), Gauteng. CEF writes increases in brackets.
    r['change'] = {
        'p93': both if both is not None else grab(r'Petrol 93 \((?:ULP|LRP)[^)]*\)'),
        'p95': both if both is not None else grab(r'Petrol 95 \((?:ULP|LRP)[^)]*\)'),
        'd50': grab(r'Diesel 0\.05% Sulphur'), 'd005': grab(r'Diesel 0\.005% Sulphur'),
        'ipw': grab(r'Paraffin \(Wholesale\)'), 'lpg': grab(r'LPGAS'),
    }
    m = re.search(r'exchange rate for the period (\d{1,2} \w+(?: \d{4})?) to (\d{1,2} \w+ \d{4}) was ([\d.]+) compared to ([\d.]+)', flat)
    r['zarusd'], r['zarusdPrev'] = float(m.group(3)), float(m.group(4))
    m = re.search(r'will be ([\d ]+\.\d+) c/l compared to ([\d ]+\.\d+) c/l', flat)
    r['smnrp'], r['smnrpPrev'] = float(m.group(1).replace(' ', '')), float(m.group(2).replace(' ', ''))
    m = re.search(r'Fuel levy\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)', t); r['fuelLevy'] = {'petrol': float(m.group(1)), 'diesel': float(m.group(3))}
    m = re.search(r'RAF levy\s+([\d.]+)', t); r['raf'] = float(m.group(1))
    m = re.search(r'Slate levy\s+([\d.]+)', t); r['slate'] = float(m.group(1))
    m = re.search(r'BFP Over/\(under\)-recovery for the period\s+(\d\d/\d\d/\d{4}) to (\d\d/\d\d/\d{4})\s+((?:\(?\s*[\d ]+\.\d+\)?\s+){4})', t)
    if m:
        vals = re.findall(r'\(\s*[\d ]+\.\d+\)|[\d ]+\.\d+', m.group(3))
        r['window'] = [isod(m.group(1)), isod(m.group(2))]
        r['recovery'] = dict(zip(['p95', 'd50', 'd005', 'ipw'], [signed(x) for x in vals[:4]]))
    return r


def annexure(t):
    """Price history (Gauteng and coast) and the price structure of the latest statement."""
    hist = []
    for m in re.finditer(r'^(\d{2})-(\w{3,5})-(\d{2})\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)', t, re.M):
        d, mon, y = m.group(1), m.group(2)[:3].lower(), m.group(3)
        mm = {'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12}[mon]
        v = [float(x.replace(',', '')) for x in m.groups()[3:]]
        hist.append({'date': f'20{y}-{mm:02d}-{d}', 'p95': [v[0], v[1]], 'd50': [v[2], v[3]], 'ipw': [v[4], v[5]], 'lpg': [v[6], v[7]]})
    rows = {}
    for key in ['Wholesale margin', 'Secondary Storage', 'Secondary Distribution', 'Router Differential', 'Retail margin', 'Zone differential in Gauteng',
                'IP Tracer levy', 'Fuel levy', 'Customs & excise duty', 'RAF levy', 'Petroleum Products levy', 'Slate levy', 'Contribution to the Basic Fuel']:
        m = re.search(re.escape(key) + r'[^\d(]*((?:\(?\s*[\d ]*\d\.\d+\)?\s+){5})', t)
        if m:
            vals = re.findall(r'\(\s*[\d ]+\.\d+\)|[\d ]*\d\.\d+', m.group(1))
            rows[key] = [signed(x) for x in vals[:5]]
    m = re.search(r'Pump Rounding\s+\(\s*([\d.]+)\)\s+\(\s*([\d.]+)\)', t)
    rows['Pump rounding'] = [-float(m.group(1)), -float(m.group(2)), 0, 0, 0] if m else [0] * 5
    return hist, rows


def daily(t):
    L = t.splitlines()
    g = lambda key: next((l for l in L if l.startswith(key)), '')

    def vals(line):
        s = re.sub(r'^.*?\d\d/\d\d/\d{4}(?: - \d\d/\d\d/\d{4})?', '', line)
        return [signed(x) if x != '-' else None for x in re.findall(r'\([\d,]+\.\d+\)|[\d,]+\.\d+|(?<=\s)-(?=\s|$)', s)]
    keys = ['p95', 'p93', 'd50', 'd005', 'ip']
    per = re.search(r'AVERAGE UNIT OVER/\(UNDER\) RECOVERY (\d\d/\d\d/\d{4}) - (\d\d/\d\d/\d{4})', t)
    fx = re.search(r'R/\$([\d.]+) - (\d\d/\d\d/\d{4})', t)
    pump = vals(g('GAUTENG PUMP PRICE')); whole = vals(g('WHOLESALE PRICE')); smnrp = vals(g('SINGLE NATIONAL MAXIMUM'))
    return {
        'date': isod(fx.group(2)), 'zarusd': float(fx.group(1)), 'window': [isod(per.group(1)), isod(per.group(2))],
        'inForce': {'p95': pump[0], 'p93': pump[1], 'd50': whole[2], 'd005': whole[3], 'ipw': whole[4], 'smnrp': smnrp[4] if len(smnrp) > 4 else None},
        'bfp': dict(zip(keys, vals(g('BASIC FUEL PRICE')))),
        'contribution': dict(zip(keys, vals(g('PRESS RELEASE CONTRIBUTION')))),
        'day': dict(zip(keys, vals(g('UNIT OVER/(UNDER) RECOVERY')))),
        'average': dict(zip(keys, vals(g('AVERAGE UNIT OVER/(UNDER) RECOVERY')))),
        # Split of the average: international product prices, then the exchange rate.
        'fromProduct': dict(zip(keys, vals(g('     - MOVEMENT IN INTERNATIONAL PRODUCT PRICES') or next((l for l in L if 'MOVEMENT IN INTERNATIONAL PRODUCT PRICES' in l), ''))[-5:])),
        'fromRand': dict(zip(keys, vals(next((l for l in L if 'MOVEMENT IN EXCHANGE RATE' in l), ''))[-5:])),
    }


def listed(pages, pattern):
    """PDF paths (relative to BASE) linked from the CEF list pages, in page order, without duplicates."""
    out = []
    for page in pages:
        html = subprocess.run(['curl', '-sfL', '-A', UA, '-m', '60', page], check=True, capture_output=True, text=True).stdout
        for rel in re.findall(r'wp-content/uploads/(\d{4}/\d{2}/[^"\'<>\s]+?\.pdf)', html):
            if re.search(pattern, rel, re.I) and rel not in out: out.append(rel)
    return out


def auto_lists():
    fuel = open(os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'lib', 'engine', 'fuel.ts')).read()
    end = re.search(r"WINDOW_END_ASSUMED = '(\d{4}-\d{2}-\d{2})'", fuel).group(1)
    sts = []
    for rel in listed(STATEMENT_PAGES, r'/Press-Release'):
        s = statement(fetch(rel))
        if s['released'] > end:
            print(f'::warning::new CEF media statement {rel} (released {s["released"]}) after WINDOW_END_ASSUMED {end}: '
                  'update src/lib/engine/fuel.ts and the text by hand, then run the script again')
            continue
        sts.append((s['effective'], rel))
    sts = [rel for _, rel in sorted(sts)]
    days = {}
    for rel in listed(DAILY_PAGES, r'/Daily-\d{2}-\d{2}-\d{4}'):
        d, m, y = re.search(r'Daily-(\d{2})-(\d{2})-(\d{4})', rel).groups()
        iso = f'{y}-{m}-{d}'
        if iso > end:
            print(f'::warning::daily sheet {rel} after WINDOW_END_ASSUMED {end}: not taken')
            continue
        if iso not in days or len(rel) > len(days[iso]): days[iso] = rel   # a re-upload (-1.pdf) replaces the first file
    by_month = {}
    for iso in sorted(days): by_month.setdefault(iso[:7], []).append(iso)
    keys = sorted(by_month)
    picks = [next((x for x in by_month[k] if x[8:] >= '12'), by_month[k][-1]) for k in keys[:-1]] + [by_month[keys[-1]][-1]]
    return sts, [days[x] for x in picks]


os.makedirs(CACHE, exist_ok=True)
if AUTO:
    STATEMENTS, DAILIES = auto_lists()
    print(f'auto: {len(STATEMENTS)} statements (last {STATEMENTS[-1]}), {len(DAILIES)} daily sheets (last {DAILIES[-1]})')
months = [statement(fetch(s)) for s in STATEMENTS]
for s, mth in zip(STATEMENTS, months): mth['doc'] = BASE + s
hist, structure = annexure(fetch(STATEMENTS[-1]))
dailies = [daily(fetch(d)) for d in DAILIES]
for d, x in zip(DAILIES, dailies): x['doc'] = BASE + d
out = {
    '_doc': 'Figures read in the Central Energy Fund documents listed in `doc` (media statements of 2026 and daily Basic Fuel Price sheets), by scripts/data/build-cef.py. Cents per litre (LPG: cents per kilogram). Change: + = increase. Recovery: + = over-recovery (price falls next month), - = under-recovery.',
    'built': dt.date.today().isoformat(),
    'statementsPage': 'https://cefgroup.co.za/2026-3/',
    'months': months, 'history': hist, 'structure': {'columns': ['p95', 'p93', 'd50', 'd005', 'ipw'], 'rows': structure, 'from': months[-1]['effective']},
    'dailies': dailies,
}
dst = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'data', 'cef.json')
json.dump(out, open(dst, 'w'), indent=1)
print(f'{len(months)} statements, {len(hist)} history rows, {len(dailies)} daily sheets -> {os.path.normpath(dst)}')
