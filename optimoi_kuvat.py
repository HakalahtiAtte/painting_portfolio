"""
Muuntaa ja pienentää kuvat WebP-muotoon public/images/-kansiossa.
Käyttö: python optimoi_kuvat.py

- Landscape-kuvat: max 1200px leveä
- Portrait-kuvat:  max 900px korkea
- WebP-laatu: 85
- Ei ylikirjoita jo valmiita .webp-tiedostoja (ellei --force)
"""

import sys
from pathlib import Path
from PIL import Image

SOURCE_DIR = Path("public/images")
MAX_LANDSCAPE_W = 1200
MAX_PORTRAIT_H  = 900
QUALITY         = 85
FORCE           = "--force" in sys.argv

CONVERT_EXTS = {".jpg", ".jpeg", ".png", ".webp"}

def resize(img: Image.Image) -> Image.Image:
    w, h = img.size
    if w >= h:  # landscape
        if w > MAX_LANDSCAPE_W:
            ratio = MAX_LANDSCAPE_W / w
            img = img.resize((MAX_LANDSCAPE_W, round(h * ratio)), Image.LANCZOS)
    else:       # portrait
        if h > MAX_PORTRAIT_H:
            ratio = MAX_PORTRAIT_H / h
            img = img.resize((round(w * ratio), MAX_PORTRAIT_H), Image.LANCZOS)
    return img

processed = 0
skipped   = 0

for src in sorted(SOURCE_DIR.iterdir()):
    if src.suffix.lower() not in CONVERT_EXTS:
        continue

    dest = src.with_suffix(".webp")

    # Skip if destination already exists unless --force
    if dest.exists() and not FORCE:
        skipped += 1
        continue

    with Image.open(src) as raw:
        img = raw.convert("RGB")
    original_size = src.stat().st_size
    img = resize(img)
    img.save(dest, "WEBP", quality=QUALITY, method=6)
    new_size = dest.stat().st_size

    # Remove the original if it was a non-WebP source
    if src.suffix.lower() != ".webp":
        src.chmod(0o666)
        src.unlink()

    saving = (1 - new_size / original_size) * 100
    print(f"  {src.name:40s}  {original_size//1024:>5} KB  ->  {new_size//1024:>5} KB  ({saving:.0f}% pienempi)")
    processed += 1

print(f"\nValmis. Käsitelty {processed} kuvaa, ohitettu {skipped}.")
print("Käytä --force päivittääksesi jo valmiit webp-tiedostot.")
