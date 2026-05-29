import { describe, expect, it } from 'vitest'
import { parseCsv, sampleCsvTemplate } from './importParser'

describe('importParser', () => {
  it('parses the bundled CSV template', () => {
    const result = parseCsv(sampleCsvTemplate())

    expect(result.errors).toEqual([])
    expect(result.rows).toHaveLength(10)
    expect(result.rows[0]).toMatchObject({
      hostname: 'fw-01',
      ip: '10.1.1.1',
      type: 'firewall',
      status: 'normal',
    })
  })

  it('handles quoted CSV fields and reports missing required columns', () => {
    const result = parseCsv([
      'hostname,type,vendor',
      '"db,primary",db,"ACME, Inc"',
      ',server,Dell',
    ].join('\n'))

    expect(result.rows[0]).toMatchObject({
      hostname: 'db,primary',
      type: 'database',
      vendor: 'ACME, Inc',
    })
    expect(result.errors).toEqual(['Row 3: missing required column: hostname'])
  })
})
