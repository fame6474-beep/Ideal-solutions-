import re

with open('d:/ideal solutions/src/components/sections/ProductsCarousel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

items = [
    ('IDEAL RENOVATION', '01_renovation.jpg', 'Waterproofing & Renovation'),
    ('IDEAL PEB', '02_peb_structure.jpg', 'Structural & PEB'),
    ('IDEAL COMMERCIAL ROOFING', '03_steel_truss.jpg', 'Structural & PEB'),
    ('IDEAL ROOFING', '04_residential_trafford.jpg', 'Roofing'),
    ('IDEAL RESIDENTIAL ROOFING', '04_residential_trafford.jpg', 'Roofing'),
    ('THATCH ROOF SYSTEM', '05_thatch_roof.jpg', 'Roofing'),
    ('POLY CARBONATE SHEET ROOFING', '06_polycarbonate_canopy.jpg', 'Roofing'),
    ('TRUSSLESS ARCH ROOF TECHNOLOGY', '07_arch_roof.jpg', 'Roofing'),
    ('SHINGLES ROOFING', '08_roof_shingles.jpg', 'Roofing'),
    ('STONE COATED METAL TILES ROOFING', '09_stone_coated_tiles.jpg', 'Roofing'),
    ('CEMENT FIBER BOARD WORK', '11_fibre_board.jpg', 'Panels & Partitions'),
    ('MEMBRAINE WATER PROOFING', '12_waterproofing_membrane.jpg', 'Waterproofing & Renovation'),
    ('WALL PARTIONS', '13_rapid_wall_partition.jpg', 'Panels & Partitions'),
    ('UV MARBLESHEET PANEL INTERIOR WALL COVERING', '14_uv_wall_panelling.jpg', 'Panels & Partitions'),
    ('GYPSUM CEILING', '17_gypsum_ceiling.jpg', 'Architectural & Glass'),
    ('ACP CLADING', '19_acp_cladding.jpg', 'Architectural & Glass'),
    ('GLASS & GLAZING', '20_spider_glazing.jpg', 'Architectural & Glass'),
]

new_array_str = 'export const PRODUCTS_SERVICES: ProductServiceItem[] = [\n'
for i, (title, img, category) in enumerate(items):
    new_array_str += f'''  {{
    id: {i+1},
    title: "{title}",
    category: "{category}",
    image: "/images/products_unique/{img}",
    description: "Premium quality {title.lower()} solutions provided by Ideal Solutions.",
    badge: "{title.split(' ')[0]}",
  }},
'''
new_array_str += '];\n'

start_marker = 'export const PRODUCTS_SERVICES: ProductServiceItem[] = ['
end_marker = '];\n\nexport function ProductsCarousel() {'

# Try a simpler replace logic without regex if possible, or correct regex
import builtins
parts = content.split('export const PRODUCTS_SERVICES: ProductServiceItem[] = [')
if len(parts) == 2:
    prefix = parts[0]
    suffix = parts[1].split('];\n\nexport function ProductsCarousel() {')[1]
    new_content = prefix + new_array_str + '\nexport function ProductsCarousel() {' + suffix
    with open('d:/ideal solutions/src/components/sections/ProductsCarousel.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Done!')
else:
    print('Could not find split parts')

