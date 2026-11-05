#!/usr/bin/env python3
"""Generate the site's topographic-contour brand assets.

Outputs (paths relative to the repo root):
  assets/img/brand/contours.svg  wide contour field (1600x600) used as a CSS mask
                                 behind the footer band, the homepage hero, 404
                                 and the social card. Plain <path>s, stroke =
                                 currentColor, no fill, so the CSS decides colour
                                 and opacity. Kept under 30 KB.
  assets/img/brand/favicon.svg   three nested contours on a paper tile, with a
                                 prefers-color-scheme dark variant inside the SVG.
  _includes/home/hero-contours.svg
                                 the homepage hero's crop of the same terrain
                                 (x >= 40% of the field), inlined by
                                 _includes/home/hero.liquid so the decoration is
                                 never the page's LCP image. Strokes take
                                 currentColor; .home-hero__contours in
                                 _sass/pages/_home.scss sets colour and fade.

The terrain is a seeded sum of Gaussian landforms plus smoothed noise, so the
output is reproducible. Re-run after changing parameters:

  python3 -m venv /tmp/venv && /tmp/venv/bin/pip install numpy scikit-image
  /tmp/venv/bin/python _scripts/make-contours.py

Then regenerate the PNGs that embed these shapes (apple-touch icon, social card)
with _scripts/make-og-card.cjs.
"""

from pathlib import Path

import numpy as np
from skimage.measure import approximate_polygon, find_contours

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "brand"
HERO = ROOT / "_includes" / "home" / "hero-contours.svg"

# ink / paper / earth, light and dark (see _sass/_tokens.scss)
PAPER, INK, EARTH = "#f7f6f1", "#16243d", "#a8471f"
PAPER_D, INK_D, EARTH_D = "#0f1726", "#e9ecf3", "#e8956b"


def smooth_noise(rng, shape, scale):
    """Low-frequency noise: white noise filtered with a Gaussian in Fourier space."""
    h, w = shape
    noise = rng.standard_normal(shape)
    fy = np.fft.fftfreq(h)[:, None]
    fx = np.fft.fftfreq(w)[None, :]
    kernel = np.exp(-((fx**2 + fy**2) * (scale**2)))
    field = np.real(np.fft.ifft2(np.fft.fft2(noise) * kernel))
    return (field - field.mean()) / field.std()


def terrain(width=640, height=240, seed=42):
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:height, 0:width].astype(float)
    z = np.zeros((height, width))
    # a few ridges / hills / basins (centre x, centre y, sx, sy, angle, amplitude)
    forms = [
        (0.78, 0.38, 0.13, 0.30, 0.6, 1.25),  # main massif, right of centre
        (0.90, 0.80, 0.10, 0.12, 0.0, 0.70),
        (0.56, 0.62, 0.20, 0.08, -0.4, 0.55),  # spur ridge
        (0.20, 0.30, 0.16, 0.22, 0.3, 0.75),  # left hill
        (0.36, 0.86, 0.15, 0.10, 0.2, -0.45),  # basin
        (0.05, 0.85, 0.12, 0.18, 0.0, 0.45),
    ]
    for cx, cy, sx, sy, ang, amp in forms:
        dx = x / width - cx
        dy = (y / height - cy) * (height / width) * 2.2
        c, s = np.cos(ang), np.sin(ang)
        u = (c * dx + s * dy) / sx
        v = (-s * dx + c * dy) / sy
        z += amp * np.exp(-0.5 * (u**2 + v**2))
    z += 0.12 * smooth_noise(rng, z.shape, 46)
    return z


def to_path(points, sx, sy, tol, min_len=0.0):
    """Simplify a contour, then draw it as a smooth Catmull-Rom curve.

    Catmull-Rom tangents are symmetric at every vertex, so after the first
    segment each one can be written with the SVG `s` shorthand (4 numbers per
    vertex). Coordinates are relative and rounded to 0.1 viewBox units.
    """
    pts = approximate_polygon(points, tolerance=tol)
    xy = np.column_stack([pts[:, 1] * sx, pts[:, 0] * sy])
    if len(xy) < 3:
        return ""
    closed = np.allclose(xy[0], xy[-1], atol=0.5)
    if closed:
        xy = xy[:-1]
    seg = np.diff(np.vstack([xy, xy[:1]]) if closed else xy, axis=0)
    if np.hypot(seg[:, 0], seg[:, 1]).sum() < min_len:
        return ""
    n = len(xy)
    if closed:
        P = lambda i: xy[i % n]
        idx = range(n)
    else:
        P = lambda i: xy[min(max(i, 0), n - 1)]
        idx = range(n - 1)
    f = lambda v: f"{v:.1f}".rstrip("0").rstrip(".").replace("-0", "-0") if v != 0 else "0"
    num = lambda *vals: "".join((("" if (k == 0 or f(v).startswith("-")) else " ") + f(v)) for k, v in enumerate(vals))
    out = [f"M{f(round(xy[0,0],1))} {f(round(xy[0,1],1))}"]
    cur = np.round(xy[0], 1)
    first = True
    for i in idx:
        p0, p1, p2, p3 = P(i - 1), P(i), P(i + 1), P(i + 2)
        c1 = p1 + (p2 - p0) / 6
        c2 = p2 - (p3 - p1) / 6
        end = np.round(p2, 1)
        if first:
            out.append("c" + num(*(np.round(c1 - cur, 1)), *(np.round(c2 - cur, 1)), *(end - cur)))
            first = False
        else:
            out.append("s" + num(*(np.round(c2 - cur, 1)), *(end - cur)))
        cur = end
    if closed:
        out.append("z")
    return "".join(out)


def make_field(path, vb_w=1600, vb_h=600, n_levels=16, tol=1.0):
    z = terrain()
    h, w = z.shape
    sx, sy = vb_w / (w - 1), vb_h / (h - 1)
    levels = np.linspace(z.min(), z.max(), n_levels + 2)[1:-1]
    thin, index = [], []
    for i, lev in enumerate(levels):
        for c in find_contours(z, lev):
            if len(c) < 12:
                continue
            d = to_path(c, sx, sy, tol, min_len=90)
            if d:
                (index if i % 5 == 4 else thin).append(d)
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
        'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">'
        '<g stroke-width="1"><path d="{thin}"/></g>'
        '<g stroke-width="1.8"><path d="{index}"/></g></svg>\n'
    ).format(w=vb_w, h=vb_h, thin="".join(thin), index="".join(index))
    path.write_text(svg)
    return len(svg.encode())


HERO_HEADER = """{%- comment -%}
  Hero contour motif: generated by _scripts/make-contours.py (make_hero), do not
  edit by hand. Inlined, not a CSS mask, so it is never the page's LCP image.
{%- endcomment -%}
"""


def make_hero(path, vb_w=1600, vb_h=600, n_levels=16, tol=1.3, start=0.4):
    """The hero's crop of the contour field: columns from `start` of the width
    on, simplified a little more than the full field, every 5th level an index
    contour (styled through .home-hero__contour-index)."""
    z = terrain()
    h, w = z.shape
    sx, sy = vb_w / (w - 1), vb_h / (h - 1)
    c0 = round(start * (w - 1))
    levels = np.linspace(z.min(), z.max(), n_levels + 2)[1:-1]
    thin, index = [], []
    for i, lev in enumerate(levels):
        for c in find_contours(z[:, c0:], lev):
            if len(c) < 8:
                continue
            c[:, 1] += c0
            d = to_path(c, sx, sy, tol, min_len=60)
            if d:
                (index if i % 5 == 4 else thin).append(d)
    svg = (
        '<svg class="home-hero__contour-svg" viewBox="{x:.1f} 0 {w:.1f} {h}" '
        'preserveAspectRatio="xMinYMid slice" fill="none" stroke="currentColor" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
        '<path d="{thin}"/><path class="home-hero__contour-index" d="{index}"/></svg>'
    ).format(x=c0 * sx, w=vb_w - c0 * sx, h=vb_h, thin="".join(thin), index="".join(index))
    path.write_text(HERO_HEADER + svg)
    return len(svg.encode())


def make_favicon(path):
    """Three nested contours of a single asymmetric summit, in a 32x32 tile."""
    n = 160
    y, x = np.mgrid[0:n, 0:n].astype(float) / (n - 1)
    rng = np.random.default_rng(7)
    z = np.exp(-(((x - 0.5) / 0.30) ** 2 + ((y - 0.53) / 0.26) ** 2))
    z += 0.55 * np.exp(-(((x - 0.62) / 0.16) ** 2 + ((y - 0.42) / 0.20) ** 2))
    z += 0.03 * smooth_noise(rng, z.shape, 30)
    z = (z - z.min()) / (z.max() - z.min())
    scale = 32 / (n - 1)
    paths = []
    for lev in (0.22, 0.52, 0.80):
        cs = sorted(find_contours(z, lev), key=len, reverse=True)
        paths.append(to_path(cs[0], scale, scale, 1.6))
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<style>
.t{{fill:{PAPER}}}.c{{fill:none;stroke:{INK};stroke-width:2;stroke-linejoin:round}}.e{{fill:none;stroke:{EARTH};stroke-width:2.2;stroke-linejoin:round}}
@media (prefers-color-scheme:dark){{.t{{fill:{PAPER_D}}}.c{{stroke:{INK_D}}}.e{{stroke:{EARTH_D}}}}}
</style>
<rect class="t" width="32" height="32" rx="6"/>
<path class="c" d="{paths[0]}"/>
<path class="c" d="{paths[1]}"/>
<path class="e" d="{paths[2]}"/>
</svg>
"""
    path.write_text(svg)
    return len(svg.encode())


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    size = make_field(OUT / "contours.svg")
    print(f"contours.svg  {size/1024:.1f} KB")
    if size > 30 * 1024:
        raise SystemExit("contours.svg exceeds 30 KB: raise `tol` or lower `n_levels`")
    print(f"favicon.svg   {make_favicon(OUT / 'favicon.svg')/1024:.1f} KB")
    print(f"hero-contours.svg  {make_hero(HERO)/1024:.1f} KB")
