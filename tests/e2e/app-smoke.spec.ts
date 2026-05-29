import { expect, test } from '@playwright/test'

test('renders the editor shell and keeps edit-only controls out of view mode', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'View' })).toHaveClass(/active/)
  await expect(page.getByRole('button', { name: 'Connect' })).toBeDisabled()
  await expect(page.getByText('View mode - click to inspect -')).toBeVisible()
})

test('resizes canvas after the left panel is closed', async ({ page }) => {
  await page.goto('/')

  const canvas = page.locator('.scene-wrap > canvas')
  const before = await canvas.boundingBox()
  await page.getByTitle('Close').first().click()
  await page.waitForTimeout(150)
  const after = await canvas.boundingBox()

  expect(before).not.toBeNull()
  expect(after).not.toBeNull()
  expect(after!.width).toBeGreaterThan(before!.width)
})

test('makes search matches visually prominent', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('Search name / IP').fill('swi')

  await expect(page.locator('.device-search-label').first()).toBeVisible()
})

test('does not leave stale rack labels after CSV replace import', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Edit' }).click()

  const before = await page.locator('.space-badge').count()
  await page.getByText('File').click()
  await page.getByText('Import devices').click()

  const csv = [
    'hostname,ip,type,vendor,site,zone,rack,status,uplink',
    'edge-fw,10.0.0.1,firewall,Palo Alto,Imported,Edge,Rack-A,normal,',
    'edge-sw,10.0.0.2,switch,Cisco,Imported,Edge,Rack-A,normal,edge-fw',
  ].join('\n')

  await page.locator('input[type="file"]').setInputFiles({
    name: 'topospace-import.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from(csv),
  })
  await page.getByLabel('Replace current scene').check()
  page.once('dialog', dialog => dialog.accept())
  await page.getByRole('button', { name: /Import 2 devices/ }).click()
  await expect(page.getByText('Import Devices & Topology')).toBeHidden()

  const after = await page.locator('.space-badge').count()
  expect(after).toBeLessThan(before)
  await expect(page.locator('.space-badge', { hasText: 'Rack-A' })).toHaveCount(0)
  await expect(page.locator('.space-badge', { hasText: 'Imported' })).toHaveCount(1)
})
