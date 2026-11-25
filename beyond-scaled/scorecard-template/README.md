# Scorecard template

One template for every Beyond Scaled scorecard page.

- `template.html`: the page (layout, styles, scoring, radar chart, send-to-Josh form).
- `pages.py`: each page's tests, wording and settings.
- `logo-img.html`: the embedded logo.
- `build.py`: writes `index.html` and `ghl-paste.html` for every page in `pages.py`.

After editing, run `python3 build.py` from this folder and commit the rebuilt files.
Current pages: `upper-body-accelerator/scorecard/` and `kipping-workshop/scorecard/`.
