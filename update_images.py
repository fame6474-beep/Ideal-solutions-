import re

with open('d:/ideal solutions/src/components/sections/ProductsCarousel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

items = [
    ('IDEAL RENOVATION', '01.jpeg', 'Waterproofing & Renovation'),
    ('IDEAL PEB', '02.jpeg', 'Structural & PEB'),
    ('IDEAL COMMERCIAL ROOFING', '03.jpg', 'Structural & PEB'),
    ('IDEAL ROOFING', '04.jpeg', 'Roofing'),
    ('IDEAL RESIDENTIAL ROOFING', '05.jpeg', 'Roofing'),
    ('THATCH ROOF SYSTEM', '06.jpeg', 'Roofing'),
    ('POLY CARBONATE SHEET ROOFING', '07.jpeg', 'Roofing'),
    ('TRUSSLESS ARCH ROOF TECHNOLOGY', '08.jpeg', 'Roofing'),
    ('SHINGLES ROOFING', '09.jpeg', 'Roofing'),
    ('STONE COATED METAL TILES ROOFING', '10.jpeg', 'Roofing'),
    ('CEMENT FIBER BOARD WORK', '11.jpeg', 'Panels & Partitions'),
    ('MEMBRAINE WATER PROOFING', '12.jpeg', 'Waterproofing & Renovation'),
    ('WALL PARTIONS', '13.jpg', 'Panels & Partitions'),
    ('UV MARBLESHEET PANEL INTERIOR WALL COVERING', '14.jpeg', 'Panels & Partitions'),
    ('GYPSUM CEILING', '15.jpg', 'Architectural & Glass'),
    ('ACP CLADING', '16.jpeg', 'Architectural & Glass'),
    ('GLASS & GLAZING', '17.jpeg', 'Architectural & Glass'),
]

new_array_str = 'export const PRODUCTS_SERVICES: ProductServiceItem[] = [\n'
for i, (title, img, category) in enumerate(items):
    new_array_str += f'''  {{
    id: {i+1},
    title: "{title}",
    category: "{category}",
    image: "/images/products_final/{img}",
    description: "Premium quality {title.lower()} solutions provided by Ideal Solutions.",
    badge: "{title.split(' ')[0]}",
  }},
'''
new_array_str += '];\n'

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

