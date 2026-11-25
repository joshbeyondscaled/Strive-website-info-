# Live copies served to GHL

These are minified copies of the `*-ghl-paste.html` files (comments stripped, logo loaded from jsDelivr).
The GHL funnel pages (joshreilly.co.uk/upper-body-black-friday, /upper-body-welcome, /upper-body-closed)
each hold a short loader in a Custom Code element that fetches one of these files from jsDelivr,
pinned to a commit. To change a live page: edit the paste file, regenerate the live copy, commit,
then update the commit hash in that page's loader in GHL.
