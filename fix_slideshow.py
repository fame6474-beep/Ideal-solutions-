with open('d:/ideal solutions/src/components/sections/HeroProductsSlideshow.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('{SLIDESHOW_IMAGES.map((_, idx) => {', '{PRODUCTS_SERVICES.map((item, idx) => {')

with open('d:/ideal solutions/src/components/sections/HeroProductsSlideshow.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
