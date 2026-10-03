"""
Download individual PBR map files directly from ambientCG Backblaze CDN.
The /get?id=...&s=2K-JPG endpoint is unreliable; we instead use the
preview URLs which expose the actual map JPGs on the CDN.

Strategy:
- Use API: https://ambientcg.com/api/v2/full_json?id={ID}&include=downloadData
- Parse previewLinks to find the individual map URLs
- Download Color, Roughness, Normal maps for each material
"""

import os
import json
import re
import urllib.request
import urllib.parse
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', '..', 'assets', '3d'))
MANIFEST   = os.path.join(ASSETS_DIR, 'ASSET_MANIFEST.md')

ASSETS = [
    ('timber',      'Planks021'),
    ('osb',         'Chipboard004'),
    ('shingles',    'RoofingTiles006'),
    ('underlayment','Fabric034'),
    ('metal',       'Metal049A'),
    ('house',       'Concrete034'),
]

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; IdealSolutionsBot/1.0)'}

# The surface-preview CDN base — maps follow a consistent naming pattern
# https://f003.backblazeb2.com/file/ambientCG-Web/media/surface-preview/{ID}/{ID}_SQ_{MapType}.jpg
CDN_BASE = "https://f003.backblazeb2.com/file/ambientCG-Web/media/surface-preview"

MAP_TYPES = [
    ('Color',        'Color',       'sRGB'),
    ('Roughness',    'Roughness',   'Non-Color'),
    ('NormalDX',     'Normal',      'Non-Color'),
    ('Displacement', 'Displacement','Non-Color'),
]

def download_file(url, dest_path):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, 'wb') as f:
            data = resp.read()
            f.write(data)
            return len(data)
    except Exception as e:
        return None


def acquire_asset(category, asset_id):
    cat_dir = os.path.join(ASSETS_DIR, category)
    os.makedirs(cat_dir, exist_ok=True)

    print(f"\n=== {category} / {asset_id} ===")
    results = {}

    for map_suffix, map_label, color_space in MAP_TYPES:
        # Construct direct CDN URL — no guessing needed, pattern is documented in API previewLinks
        url      = f"{CDN_BASE}/{asset_id}/{asset_id}_SQ_{map_suffix}.jpg"
        filename = f"{asset_id}_{map_suffix}.jpg"
        dest     = os.path.join(cat_dir, filename)

        if os.path.exists(dest) and os.path.getsize(dest) > 1000:
            print(f"  [{map_label}] already exists: {filename}")
            results[map_label] = dest
            continue

        size = download_file(url, dest)
        if size and size > 1000:
            print(f"  [{map_label}] downloaded {size} bytes: {filename}")
            results[map_label] = dest
        else:
            # Remove zero/bad file
            if os.path.exists(dest):
                os.remove(dest)
            print(f"  [{map_label}] FAILED: {url}")

    return results


def verify_assets():
    print("\n=== VERIFICATION ===")
    all_ok = True
    for category, asset_id in ASSETS:
        cat_dir = os.path.join(ASSETS_DIR, category)
        files   = [f for f in os.listdir(cat_dir) if f.endswith('.jpg')] if os.path.isdir(cat_dir) else []
        has_color = any('Color' in f for f in files)
        has_rough = any('Roughness' in f for f in files)
        has_norm  = any('Normal' in f for f in files)
        status = 'OK' if has_color else 'MISSING COLOR'
        if not has_color:
            all_ok = False
        print(f"  {category:15s} Color={has_color} Roughness={has_rough} Normal={has_norm}  → {status}")
    return all_ok


def write_manifest(results_by_cat):
    lines = [
        '# Ideal Solutions — 3D Asset Manifest',
        '',
        'All assets CC0 from ambientCG (https://ambientcg.com) and Poly Haven (https://polyhaven.com).',
        '',
        '| Category | Asset ID | Maps Downloaded | Source | License |',
        '|---|---|---|---|---|',
        '| hdr | kloppenheim_06_puresky | .hdr | https://polyhaven.com | CC0 |',
    ]
    for category, asset_id in ASSETS:
        maps = list(results_by_cat.get(category, {}).keys())
        lines.append(f'| {category} | {asset_id} | {", ".join(maps)} | https://ambientcg.com/a/{asset_id} | CC0 |')
    with open(MANIFEST, 'w') as f:
        f.write('\n'.join(lines))
    print(f"\nManifest → {MANIFEST}")


if __name__ == '__main__':
    print(f"Assets dir: {ASSETS_DIR}")

    # Clear old bad files first
    for category, asset_id in ASSETS:
        cat_dir = os.path.join(ASSETS_DIR, category)
        if os.path.isdir(cat_dir):
            for f in os.listdir(cat_dir):
                fp = os.path.join(cat_dir, f)
                # Remove the incorrectly downloaded apple files
                if '3DApple' in f or (f.endswith('.zip') and os.path.getsize(fp) > 5_000_000):
                    print(f"  Removing bad file: {fp}")
                    os.remove(fp)

    all_results = {}
    for category, asset_id in ASSETS:
        all_results[category] = acquire_asset(category, asset_id)

    ok = verify_assets()
    write_manifest(all_results)

    if ok:
        print("\n✓ All critical maps acquired. Ready to run build_ideal_solutions_scene.py")
    else:
        print("\n✗ Some maps are missing. See above for details.")
