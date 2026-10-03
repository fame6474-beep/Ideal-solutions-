const fs = require('fs');
const file = 'D:/ideal solutions/src/components/sections/ProductsCarousel.tsx';
let code = fs.readFileSync(file, 'utf8');

const targetStr = '%20${modalActiveColor ? `in%20*${encodeURIComponent(modalActiveColor.name)}*%20finish` : ""}';
code = code.split(targetStr).join('');

fs.writeFileSync(file, code, 'utf8');
console.log('Fixed Whatsapp link safely');
