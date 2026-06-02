import { chromium } from '@playwright/test'

const getPinia = () => document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value

const browser = await chromium.launch({ headless: false, slowMo: 100 })
const page = await browser.newPage()
page.setViewportSize({ width: 1400, height: 900 })
await page.goto('http://localhost:5175/')
await page.waitForTimeout(4000)
await page.bringToFront()
await page.waitForTimeout(500)

// Switch to Edit, fit view
await page.locator('button:has-text("Edit")').click()
await page.waitForTimeout(300)
const box = await page.locator('.scene-wrap canvas').boundingBox()
await page.mouse.click(box.x + box.width/2, box.y + box.height/2)
await page.keyboard.press('f')
await page.waitForTimeout(2000)

// Enable Connect mode
await page.locator('button:has-text("Connect")').click()
await page.waitForTimeout(300)

console.log('Scanning canvas for device positions via pinia...')
const positions = []
const ys = [0.38, 0.41, 0.44, 0.47, 0.50, 0.53, 0.56, 0.59, 0.62]
const xs = Array.from({ length: 20 }, (_, i) => 0.05 + i * 0.045)

for (const yRatio of ys) {
  for (const xRatio of xs) {
    const px = box.x + box.width * xRatio
    const py = box.y + box.height * yRatio
    await page.mouse.move(px, py)
    await page.waitForTimeout(60)
    const hovId = await page.evaluate(() => {
      try { return document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value.ui?.hoveredId } catch(e) { return null }
    })
    if (hovId && !hovId.startsWith('link-')) {
      const prev = positions[positions.length - 1]
      if (!prev || prev.id !== hovId) {
        positions.push({ xRatio, yRatio, px: Math.round(px - box.x), py: Math.round(py - box.y), id: hovId })
        console.log(`  Device "${hovId}" at canvas (${Math.round(px - box.x)}, ${Math.round(py - box.y)}) [${(xRatio*100).toFixed(0)}%, ${(yRatio*100).toFixed(0)}%]`)
      }
    }
  }
}

console.log(`\nFound ${positions.length} device positions`)

// Test connect drag between first two distinct devices
if (positions.length >= 2) {
  const src = positions[0]
  const tgt = positions.find(p => p.id !== src.id) ?? positions[1]
  
  console.log(`\nDrag connect: "${src.id}" → "${tgt.id}"`)
  
  const initialLinks = await page.evaluate(() => {
    try { return document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value.editor?.links?.size ?? 0 } catch(e) { return 0 }
  })
  console.log('Links before:', initialLinks)
  
  const srcX = box.x + src.px
  const srcY = box.y + src.py
  const tgtX = box.x + tgt.px
  const tgtY = box.y + tgt.py
  
  await page.mouse.move(srcX, srcY)
  await page.waitForTimeout(400)
  await page.mouse.down()
  await page.waitForTimeout(200)
  await page.mouse.move(tgtX, tgtY, { steps: 30 })
  await page.waitForTimeout(400)
  await page.mouse.up()
  await page.waitForTimeout(1000)
  
  const ctxVisible = await page.locator('.ctx-menu').isVisible()
  console.log('Context menu appeared:', ctxVisible)
  
  if (ctxVisible) {
    const items = await page.locator('.ctx-item:not(.cancel)').allTextContents()
    console.log('Options:', items.map(s => s.trim()))
    await page.locator('.ctx-item').first().click()
    await page.waitForTimeout(600)
    const linksAfter = await page.evaluate(() => {
      try { return document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value.editor?.links?.size ?? 0 } catch(e) { return 0 }
    })
    console.log('Links after:', linksAfter)
    console.log('Link created:', linksAfter > initialLinks)
  } else {
    const currentHov = await page.evaluate(() => {
      try { return document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value.ui?.hoveredId } catch(e) { return null }
    })
    console.log('Current hoveredId:', currentHov)
    console.log('Drag likely missed target. Src and tgt positions too close or mesh too small.')
  }
} else {
  console.log('Not enough devices found for connect test')
}

await page.keyboard.press('Escape')
await page.waitForTimeout(500)
await browser.close()
console.log('\nDone.')
