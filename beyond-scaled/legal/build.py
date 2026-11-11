"""Builds privacy.html / terms.html (previews) and *-ghl-paste.html (GoHighLevel blocks).

Edit the content in privacy-body.html / terms-body.html, then run:  python3 build.py
Business details live in DETAILS below and are filled in everywhere.
"""
import pathlib, re

HERE = pathlib.Path(__file__).parent

# ---- Business details: fill these in once, then rebuild ---------------------
DETAILS = {
    "BUSINESS": "[BUSINESS NAME, e.g. Josh Reilly trading as Beyond Scaled]",
    "ADDRESS": "[BUSINESS ADDRESS]",
    "EMAIL": "[CONTACT EMAIL]",
    "ICO": "[ICO REGISTRATION NUMBER]",
    "UPDATED": "11 November 2026",
    "SITE": "https://joshreilly.co.uk",
}

SHELL = """<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Beyond Scaled</title>
</head>
<body style="margin:0">

<!-- =====================================================================
     START GHL PASTE: {title}. Copy everything to "END GHL PASTE" into one
     GoHighLevel Custom JS/HTML element. Page path: {path}
     Business details are in [SQUARE BRACKETS]. Fill them in before going live.
     ===================================================================== -->

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">

<style>
#bs{{--blue:#1F5BFF;--blue-text:#6EA8FF;--navy:#0B1D48;--black:#05070D;--card:#0C1324;--muted:#A3B0C8;--line:rgba(160,180,220,.14);--font:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}}
html,body{{background:#05070D!important;margin:0!important}}
:is(div,section,main):has(#bs){{padding:0!important;margin:0!important;max-width:none!important;width:100%!important;background:transparent!important;transform:none!important;overflow:visible!important;border:0!important;box-shadow:none!important}}
#bs,#bs *{{box-sizing:border-box}}
#bs{{background:var(--black) linear-gradient(180deg,var(--navy) 0,var(--black) 600px) no-repeat;color:#fff;font-family:var(--font);font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;overflow-x:clip}}
#bs a{{color:var(--blue-text)}}
#bs .wrap{{max-width:760px;margin:0 auto;padding:0 20px}}
#bs .top{{padding:20px 0 8px}}
#bs .top .wrap{{display:flex;justify-content:center}}
#bs .logo{{display:inline-flex}}
#bs .logo img{{height:28px;width:auto}}
#bs main{{padding:40px 0 80px}}
#bs .label{{display:block;font-size:.8rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--blue-text);margin-bottom:12px}}
#bs h1{{margin:0;font-weight:800;letter-spacing:-.035em;line-height:1.05;font-size:clamp(2.2rem,8vw,3.4rem)}}
#bs .meta{{margin:14px 0 0;color:var(--muted);font-size:.9rem}}
#bs .summary{{margin:28px 0 8px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px}}
#bs .summary h2{{margin-top:0}}
#bs h2{{margin:44px 0 10px;font-size:1.3rem;font-weight:700;letter-spacing:-.01em;line-height:1.3}}
#bs h3{{margin:24px 0 6px;font-size:1.05rem;font-weight:700}}
#bs p,#bs li{{color:#D3DBEA}}
#bs p{{margin:0 0 12px}}
#bs ul{{margin:0 0 12px;padding-left:20px}}
#bs li{{margin-bottom:6px}}
#bs b,#bs strong{{color:#fff}}
#bs .tbl{{overflow-x:auto;margin:12px 0 16px;border:1px solid var(--line);border-radius:12px}}
#bs table{{width:100%;border-collapse:collapse;font-size:.9rem;min-width:520px}}
#bs th,#bs td{{text-align:left;vertical-align:top;padding:10px 14px;border-bottom:1px solid var(--line)}}
#bs th{{color:#fff;background:var(--card);font-weight:600}}
#bs td{{color:#D3DBEA}}
#bs tr:last-child td{{border-bottom:0}}
#bs footer{{padding:24px 0;font-size:.8rem;color:var(--muted);border-top:1px solid var(--line);background:var(--navy)}}
#bs footer .wrap{{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;max-width:1120px}}
#bs footer nav{{display:flex;gap:18px}}
#bs footer a{{color:var(--muted)}}
@media (min-width:900px){{#bs{{font-size:17px}} #bs .wrap{{padding:0 40px}}}}
</style>

<div id="bs">
  <header class="top"><div class="wrap">
    <a class="logo" href="{site}" aria-label="Beyond Scaled"><img src="{logo}" alt="Beyond Scaled" width="307" height="32"></a>
  </div></header>
  <main><div class="wrap">
{body}
  </div></main>
  <footer><div class="wrap">
    <span>© <span id="bs-year">2026</span> Beyond Scaled</span>
    <nav aria-label="Legal"><a href="{site}/privacy-policy">Privacy policy</a><a href="{site}/terms">Terms</a></nav>
  </div></footer>
</div>
<script>(function(){{var y=document.getElementById('bs-year');if(y)y.textContent=new Date().getFullYear();}})();</script>

<!-- ===================== END GHL PASTE ===================== -->

</body>
</html>
"""


def logo_uri():
    # reuse the embedded logo from the workshop page so every page matches
    s = (HERE.parent / "kipping-workshop" / "index.html").read_text()
    return re.search(r'src="(data:image/png;base64,[^"]+)" alt="Beyond Scaled"', s).group(1)


def build(name, title, path):
    body = (HERE / f"{name}-body.html").read_text()
    for k, v in DETAILS.items():
        body = body.replace("{{" + k + "}}", v)
    html = SHELL.format(title=title, path=path, body=body, site=DETAILS["SITE"], logo=logo_uri())
    (HERE / f"{name}.html").write_text(html)
    blk = html[html.index("<!-- ====="):html.index("<!-- ===================== END GHL PASTE")]
    (HERE / f"{name}-ghl-paste.html").write_text(blk + "<!-- ===================== END GHL PASTE ===================== -->\n")


build("privacy", "Privacy policy", "/privacy-policy")
build("terms", "Terms and conditions", "/terms")
print("built")
