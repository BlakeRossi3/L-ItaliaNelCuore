# Usage (from this folder): python3 make-tower-slogan.py edo-subset.ttf permanent-marker.ttf es en
# Reads glyph positions from per_la_nostra_gente.pdf and needs base-crop.png (page 1 rendered at 150 dpi without text, left half).
# Letters missing from the embedded Edo subset (z, ó, f, h, w, y) fall back to Permanent Marker.
# Recreates the campaign's "per la nostra gente" lettering on the tower photo.
# Reads every glyph's position, angle, size and colour from the original PDF.
# Italian = the original placements; Spanish/English = same arcs, size, colours and spacing.
import sys, math, numpy as np, pikepdf
from PIL import Image, ImageFont, ImageDraw
from fontTools.ttLib import TTFont
SCALE = 0.24 * 150 / 72
EDO, FALLBACK = sys.argv[1], sys.argv[2]
tt = TTFont(EDO); order = tt.getGlyphOrder(); cmap = tt.getBestCmap(); rev = {n: chr(c) for c, n in cmap.items()}

pdf = pikepdf.open('in.pdf'); lines = []; pend = None
for operands, op in pikepdf.parse_content_stream(pdf.pages[0]):
    o = str(op)
    if o == 'cm': pend = [float(x) for x in operands]
    elif o == 'rg': color = tuple(round(float(x) * 255) for x in operands)
    elif o == 'Tf': tf = float(operands[1])
    elif o == 'Tm': ty = float(operands[5])
    elif o == 'Tj':
        a, b, c, d, e, f = pend
        b_ = bytes(operands[0]); ch = ''.join(rev.get(order[int.from_bytes(b_[i:i+2], 'big')], ' ') for i in range(0, len(b_), 2))
        g = dict(ch=ch, x=(c * ty + e) * SCALE, y=(d * ty + f) * SCALE, ang=math.atan2(b, a), px=tf * math.hypot(a, b) * SCALE)
        key = (color, round(tf, 1))
        if not lines or lines[-1]['key'] != key: lines.append(dict(key=key, color=color, glyphs=[]))
        lines[-1]['glyphs'].append(g)

def draw_glyph(img, ch, font, x, y, ang, color):
    size = int(font.size * 3)
    tile = Image.new('RGBA', (size, size))
    ImageDraw.Draw(tile).text((size / 2, size / 2), ch, font=font, fill=color + (255,), anchor='ls')
    tile = tile.rotate(-math.degrees(ang), resample=Image.BICUBIC, center=(size / 2, size / 2))
    img.alpha_composite(tile, (round(x - size / 2), round(y - size / 2)))

for L in lines:
    G = L['glyphs']; px = np.median([g['px'] for g in G]); L['font'] = ImageFont.truetype(EDO, round(px))
    xs = np.array([g['x'] for g in G]); ys = np.array([g['y'] for g in G])
    A = np.c_[2 * xs, 2 * ys, np.ones(len(xs))]; cx, cy, k0 = np.linalg.lstsq(A, xs**2 + ys**2, rcond=None)[0]
    L['cx'], L['cy'], L['R'] = cx, cy, math.sqrt(k0 + cx**2 + cy**2)
    L['sign'] = 1 if cy > ys.mean() else -1          # circle centre below the text = arc bulges up
    # letter spacing: arc distance between neighbouring origins vs the font's own advance
    ratios = []
    for g1, g2 in zip(G, G[1:]):
        adv = L['font'].getlength(g1['ch'])
        if g1['ch'].strip() and g2['ch'].strip() and adv > 0:
            ratios.append(math.hypot(g2['x'] - g1['x'], g2['y'] - g1['y']) / adv)
    L['k'] = float(np.median(ratios))
    # word gap: from the letter before a space to the letter after it, minus that letter's width
    gaps = []
    for i in range(1, len(G) - 1):
        if not G[i]['ch'].strip() and G[i - 1]['ch'].strip() and G[i + 1]['ch'].strip():
            d = math.hypot(G[i + 1]['x'] - G[i - 1]['x'], G[i + 1]['y'] - G[i - 1]['y'])
            gaps.append(d - L['font'].getlength(G[i - 1]['ch']) * L['k'])
    L['space'] = float(np.median(gaps)) if gaps else L['font'].getlength(' ')
    ink = [g for g in G if g['ch'].strip()]
    a_first = math.atan2(ink[0]['y'] - cy, ink[0]['x'] - cx)
    a_last = math.atan2(ink[-1]['y'] - cy, ink[-1]['x'] - cx) + L['sign'] * L['font'].getlength(ink[-1]['ch']) * L['k'] / L['R']
    L['centre'] = (a_first + a_last) / 2

def render(texts, out):
    img = Image.open('base-crop.png').convert('RGBA')
    for L, text in zip(lines, texts):
        if text is None:                                  # original placements
            for g in L['glyphs']:
                if g['ch'].strip(): draw_glyph(img, g['ch'], L['font'], g['x'], g['y'], g['ang'], L['color'])
            continue
        fe = L['font']; ref = fe.getbbox('n'); cap = ref[3] - ref[1]
        fb0 = ImageFont.truetype(FALLBACK, 100); h = fb0.getbbox('N'); fb = ImageFont.truetype(FALLBACK, round(100 * cap / (h[3] - h[1])))
        def pick(ch):
            return (fe, ch) if ord(ch) in cmap else (fb, ch.upper())
        def width(ch):
            if not ch.strip(): return L['space']
            font, g = pick(ch)
            return font.getlength(g) * (L['k'] if font is fe else 0.95)
        advs = [width(ch) for ch in text]
        R, s = L['R'], L['sign']
        a = L['centre'] - s * sum(advs) / 2 / R
        for ch, w in zip(text, advs):
            if ch.strip():
                x = L['cx'] + R * math.cos(a); y = L['cy'] + R * math.sin(a)
                font, g = pick(ch)
                draw_glyph(img, g, font, x, y, a + s * math.pi / 2, L['color'])
            a += s * w / R
    img.convert('RGB').save(out, quality=86)

texts = {
 'it': [None, None, None],
 'es': ['para nuestra gente,', 'siempre con italia', 'en el corazón'],
 'en': ['for our people,', 'always with italy', 'in our hearts'],
}
for lang in sys.argv[3:]:
    render(texts[lang], f'tower-{lang}.jpg'); print('wrote', lang)
