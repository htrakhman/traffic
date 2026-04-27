import { readFile } from 'node:fs/promises'
const raw = await readFile('./public/tss-catalog.json', 'utf8')
console.log('bytes:', raw.length)
console.log('starts:', raw.slice(0, 40))
console.log('ends:', raw.slice(-40))
try {
  const data = JSON.parse(raw)
  console.log('OK, products:', data.length)
} catch (e) {
  console.log('PARSE ERROR:', e.message.slice(0, 200))
}
