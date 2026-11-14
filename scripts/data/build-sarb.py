#!/usr/bin/env python3
"""Builds src/data/sarb.json from the South African Reserve Bank's public web indicators and MPC page.

Usage: python3 scripts/data/build-sarb.py
Series: MMRD002A (SARB policy rate, the repo rate) and MMRD000A (prime lending rate), daily since 2023-01-01; the
current market rates table; the upcoming MPC announcement dates listed on the Monetary Policy Committee page.
"""
import datetime as dt, html, json, os, re, subprocess

UA = 'sapetrolprice.com data reader (+https://sapetrolprice.com)'
API = 'https://custom.resbank.co.za/SarbWebApi/WebIndicators/'
MPC_PAGE = 'https://www.resbank.co.za/en/home/what-we-do/monetary-policy/monetary-policy-committee'


def get(url):
    return subprocess.run(['curl', '-sL', '-A', UA, '-m', '60', url], check=True, capture_output=True, text=True).stdout


today = dt.date.today().isoformat()
series = {}
for code, key in (('MMRD002A', 'repo'), ('MMRD000A', 'prime')):
    obs = sorted(json.loads(get(f'{API}Shared/GetTimeseriesObservations/{code}/2023-01-01/{today}')), key=lambda o: o['Period'])
    steps, prev = [], None
    for o in obs:
        if o['Value'] != prev:
            steps.append({'from': o['Period'][:10], 'rate': o['Value']}); prev = o['Value']
    series[key] = {'code': code, 'steps': steps, 'last': {'date': obs[-1]['Period'][:10], 'rate': obs[-1]['Value']}}
cur = json.loads(get(API + 'CurrentMarketRates'))
WANT = {'MMRD002A': 'repo', 'MMRD000A': 'prime', 'MMRD203A': 'tbill91', 'MMRD212A': 'tbill364', 'MMRD403A': 'jibar3m', 'MMRD855A': 'zaronia'}
market = {WANT[o['TimeseriesCode']]: {'name': o['Name'], 'date': o['Date'][:10], 'rate': o['Value']} for o in cur if o['TimeseriesCode'] in WANT}
page = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', get(MPC_PAGE))))
m = re.search(r'UPCOMING ANNOUNCEMENTS ((?:\d{1,2} \w+ \d{4} ?)+)', page)
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
mpc = [dt.date(int(y), months.index(mo) + 1, int(d)).isoformat() for d, mo, y in re.findall(r'(\d{1,2}) (\w+) (\d{4})', m.group(1))]
out = {'_doc': 'South African Reserve Bank figures read by scripts/data/build-sarb.py. Rates in percent. steps: date from which each rate applied, as published in the daily series.',
       'built': today, 'api': API, 'mpcPage': MPC_PAGE, 'repo': series['repo'], 'prime': series['prime'], 'market': market, 'mpcUpcoming': mpc}
dst = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'data', 'sarb.json')
json.dump(out, open(dst, 'w'), indent=1)
print(json.dumps({k: out[k] for k in ('repo', 'prime', 'market', 'mpcUpcoming')}, indent=0)[:2500])
