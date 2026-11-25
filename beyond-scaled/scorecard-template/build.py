#!/usr/bin/env python3
"""Builds each scorecard's index.html and ghl-paste.html from template.html + pages.py."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from pages import PAGES

tpl = open(os.path.join(HERE, 'template.html')).read()
logo = open(os.path.join(HERE, 'logo-img.html')).read().strip()
START = '<!-- =====================================================================\n     START GHL PASTE'
END = '<!-- ===================== END GHL PASTE ===================== -->'

for page in PAGES:
    html = tpl.replace('{{LOGO}}', logo)
    for k, v in page.items():
        if k != 'out':
            html = html.replace('{{' + k + '}}', v.strip('\n') if k == 'CONFIG' else v)
    assert '{{' not in html, 'unfilled placeholder in ' + page['out']
    out = os.path.normpath(os.path.join(HERE, page['out']))
    os.makedirs(out, exist_ok=True)
    open(os.path.join(out, 'index.html'), 'w').write(html)
    open(os.path.join(out, 'ghl-paste.html'), 'w').write(html[html.index(START):html.index(END) + len(END)] + '\n')
    print('built', os.path.relpath(out, os.path.dirname(HERE)))
