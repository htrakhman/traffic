import { readFile } from 'node:fs/promises'
const raw = await readFile('./public/tss-catalog.json', 'utf8')
console.log('bytes:', raw.length)
const data = JSON.parse(raw)
console.log('products:', data.length)
console.log('sample slug:', data[0]?.slug?.slice(0,60))
