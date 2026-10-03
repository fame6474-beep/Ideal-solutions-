import os
import urllib.request
import json
import zipfile
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'assets', '3d'))

# We will use PolyHaven for HDRI and textures.
# PolyHaven direct download structure:
# HDRIs: https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/{name}_4k.hdr
# Textures (ZIP): https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/{name}.zip

ASSETS_TO_DOWNLOAD = {
    'hdr': [
        ('kloppenheim_06_puresky', 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/kloppenheim_06_puresky_4k.hdr', 'hdr')
    ],
    'timber': [
        ('wood_cabinet_worn_long', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/wood_cabinet_worn_long.zip', 'zip')
    ],
    'osb': [
        ('plywood', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/plywood.zip', 'zip')
    ],
    'underlayment': [
        ('black_paper', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/black_paper.zip', 'zip') # generic dark rough texture
    ],
    'shingles': [
        ('roof_shingles', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/roof_shingles.zip', 'zip')
    ],
    'metal': [
        ('brushed_metal', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/brushed_metal.zip', 'zip')
    ],
    'house_wall': [
        ('white_plaster_02', 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/white_plaster_02.zip', 'zip')
    ]
}

def download_and_extract():
    for category, items in ASSETS_TO_DOWNLOAD.items():
        cat_dir = os.path.join(ASSETS_DIR, category)
        os.makedirs(cat_dir, exist_ok=True)
        
        for name, url, ext in items:
            print(f"Processing {category}/{name}...")
            if ext == 'hdr':
                filepath = os.path.join(cat_dir, f"{name}.hdr")
                if not os.path.exists(filepath):
                    print(f"Downloading {url} to {filepath}")
                    try:
                        urllib.request.urlretrieve(url, filepath)
                    except Exception as e:
                        print(f"Failed to download {url}: {e}")
            elif ext == 'zip':
                zip_path = os.path.join(cat_dir, f"{name}.zip")
                if not os.path.exists(zip_path):
                    print(f"Downloading {url} to {zip_path}")
                    try:
                        urllib.request.urlretrieve(url, zip_path)
                    except Exception as e:
                        print(f"Failed to download {url}: {e}")
                        continue
                
                # Extract
                print(f"Extracting {zip_path}")
                try:
                    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                        zip_ref.extractall(cat_dir)
                except Exception as e:
                    print(f"Failed to extract {zip_path}: {e}")

if __name__ == "__main__":
    print(f"Downloading assets to {ASSETS_DIR}")
    download_and_extract()
    print("Asset acquisition complete.")
