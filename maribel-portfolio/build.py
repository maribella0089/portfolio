#!/usr/bin/env python3
"""
Build script for Maribel Sosa's portfolio.

Regenerates the four preview-*.html single-file builds from the source files
(index.html, stori.html, stori-home.html, metlife.html) by inlining styles.css
and script.js and rewriting cross-page links to point at the preview builds.

Usage:  python3 build.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

PAGES = [
    ("index.html",       "preview-single-file.html"),
    ("stori.html",       "preview-stori-single.html"),
    ("shein.html",       "preview-shein-single.html"),
    ("metlife.html",     "preview-metlife-single.html"),
    ("herff-jones.html", "preview-herff-jones-single.html"),
]

# href rewrites so previews link to each other (order matters: longer first)
REMAPS = [
    ('href="index.html',       'href="preview-single-file.html'),
    ('href="herff-jones.html"','href="preview-herff-jones-single.html"'),
    ('href="stori.html"',      'href="preview-stori-single.html"'),
    ('href="shein.html"',      'href="preview-shein-single.html"'),
    ('href="metlife.html"',    'href="preview-metlife-single.html"'),
]

def main():
    with open("styles.css", encoding="utf-8") as f:
        css = f.read()
    with open("script.js", encoding="utf-8") as f:
        js = f.read()

    for src, out in PAGES:
        if not os.path.exists(src):
            print(f"  skip {src} (missing)")
            continue
        with open(src, encoding="utf-8") as f:
            html = f.read()
        html = html.replace(
            '<link rel="stylesheet" href="styles.css" />',
            f"<style>\n{css}\n</style>",
        )
        html = html.replace(
            '<script src="script.js"></script>',
            f"<script>\n{js}\n</script>",
        )
        for a, b in REMAPS:
            html = html.replace(a, b)
        with open(out, "w", encoding="utf-8") as f:
            f.write(html)

        # sanity check: no un-rewritten cross-page links remain
        broken = re.findall(r'href="(?:index|stori|stori-home|metlife)\.html', html)
        flag = "  !! broken refs" if broken else ""
        print(f"  built {out}  ({len(html)//1024} KB){flag}")

    print("Done.")

if __name__ == "__main__":
    main()
