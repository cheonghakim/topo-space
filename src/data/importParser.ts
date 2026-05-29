import type { DeviceType, DeviceStatus } from '@/types'

export interface ImportRow {
  hostname: string
  ip?:      string
  type:     DeviceType
  vendor?:  string
  site?:    string
  zone?:    string
  rack?:    string
  status?:  DeviceStatus
  uplink?:  string
}

export interface ParseResult {
  rows:     ImportRow[]
  errors:   string[]
  warnings: string[]
}

const TYPE_ALIASES: Record<string, DeviceType> = {
  server: 'server', srv: 'server', host: 'server',
  switch: 'switch', sw: 'switch',
  router: 'router', rtr: 'router',
  firewall: 'firewall', fw: 'firewall',
  database: 'database', db: 'database',
  storage: 'storage', stg: 'storage', nas: 'storage', san: 'storage',
  vm: 'vm',
  container: 'container', ctr: 'container',
  lb: 'load_balancer', load_balancer: 'load_balancer', loadbalancer: 'load_balancer',
  ap: 'access_point', access_point: 'access_point', accesspoint: 'access_point',
  cloud: 'cloud_service', cloud_service: 'cloud_service',
}

const STATUS_ALIASES: Record<string, DeviceStatus> = {
  normal: 'normal', ok: 'normal', up: 'normal',
  warning: 'warning', warn: 'warning',
  critical: 'critical', crit: 'critical', error: 'critical', down: 'offline',
  offline: 'offline', off: 'offline',
  unknown: 'unknown',
  maintenance: 'maintenance', maint: 'maintenance',
}

const REQUIRED = ['hostname', 'type']

function normalizeKey(s: string): string {
  return s.trim().toLowerCase().replace(/[\s_-]+/g, '')
}

// Standard column names accepted in any case / with spaces or underscores
const COL_MAP: Record<string, keyof ImportRow> = {
  hostname: 'hostname', host: 'hostname', name: 'hostname',
  ip: 'ip', ipaddress: 'ip', ipaddr: 'ip',
  type: 'type', devicetype: 'type', kind: 'type',
  vendor: 'vendor', manufacturer: 'vendor',
  site: 'site', location: 'site', datacenter: 'site', dc: 'site',
  zone: 'zone',
  rack: 'rack',
  status: 'status',
  uplink: 'uplink', parent: 'uplink', connectsto: 'uplink', connectedto: 'uplink',
}

function mapHeaders(headers: string[]): { mapped: (keyof ImportRow | null)[]; unknownCols: string[] } {
  const unknown: string[] = []
  const mapped = headers.map(h => {
    const key = COL_MAP[normalizeKey(h)]
    if (!key) { unknown.push(h); return null }
    return key
  })
  return { mapped, unknownCols: unknown }
}

function rowFromValues(values: string[], mapped: (keyof ImportRow | null)[]): { row?: ImportRow; error?: string } {
  const draft: Partial<ImportRow> = {}
  mapped.forEach((key, i) => {
    if (!key) return
    const raw = (values[i] ?? '').trim()
    if (!raw) return
    if (key === 'type') {
      const norm = TYPE_ALIASES[raw.toLowerCase()] ?? 'unknown'
      draft.type = norm
    } else if (key === 'status') {
      draft.status = STATUS_ALIASES[raw.toLowerCase()] ?? 'unknown'
    } else {
      ;(draft as Record<string, string>)[key] = raw
    }
  })
  for (const req of REQUIRED) {
    if (!(draft as Record<string, unknown>)[req]) {
      return { error: `missing required column: ${req}` }
    }
  }
  return { row: draft as ImportRow }
}

// ── CSV ──────────────────────────────────────────────────────────────────────

// Minimal RFC-4180 friendly CSV parser (handles quoted fields with commas and "" escapes)
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (c === '"') { inQuotes = false }
      else { cur += c }
    } else {
      if (c === ',') { out.push(cur); cur = '' }
      else if (c === '"') { inQuotes = true }
      else { cur += c }
    }
  }
  out.push(cur)
  return out
}

export function parseCsv(text: string): ParseResult {
  const result: ParseResult = { rows: [], errors: [], warnings: [] }
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
  if (lines.length < 2) {
    result.errors.push('CSV must contain a header row and at least one data row.')
    return result
  }
  const headers = parseCsvLine(lines[0])
  const { mapped, unknownCols } = mapHeaders(headers)
  if (unknownCols.length) {
    result.warnings.push(`Unknown columns ignored: ${unknownCols.join(', ')}`)
  }
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    const { row, error } = rowFromValues(values, mapped)
    if (error) { result.errors.push(`Row ${i + 1}: ${error}`); continue }
    if (row) result.rows.push(row)
  }
  return result
}

// ── XLSX (dynamic exceljs import) ────────────────────────────────────────────

export async function parseXlsx(buffer: ArrayBuffer): Promise<ParseResult> {
  const result: ParseResult = { rows: [], errors: [], warnings: [] }
  const ExcelJS = await import('exceljs')
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(buffer)
  const sheet = wb.worksheets[0]
  if (!sheet) { result.errors.push('No worksheet found in the file.'); return result }

  // Header = first non-empty row
  let headerRowIndex = 1
  while (headerRowIndex <= sheet.rowCount && sheet.getRow(headerRowIndex).actualCellCount === 0) {
    headerRowIndex++
  }
  if (headerRowIndex > sheet.rowCount) {
    result.errors.push('Sheet is empty.'); return result
  }

  const headerRow = sheet.getRow(headerRowIndex)
  const headers: string[] = []
  headerRow.eachCell({ includeEmpty: true }, (cell, col) => {
    headers[col - 1] = String(cell.value ?? '')
  })
  const { mapped, unknownCols } = mapHeaders(headers)
  if (unknownCols.length) {
    result.warnings.push(`Unknown columns ignored: ${unknownCols.join(', ')}`)
  }

  for (let r = headerRowIndex + 1; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r)
    if (row.actualCellCount === 0) continue
    const values: string[] = []
    headers.forEach((_, i) => {
      const cell = row.getCell(i + 1)
      const v = cell.value
      values[i] = v == null ? ''
        : typeof v === 'object' && 'text' in (v as object) ? String((v as { text: unknown }).text)
        : String(v)
    })
    const { row: parsed, error } = rowFromValues(values, mapped)
    if (error) { result.errors.push(`Row ${r}: ${error}`); continue }
    if (parsed) result.rows.push(parsed)
  }
  return result
}

// ── Sample template generator (CSV) ──────────────────────────────────────────

export function sampleCsvTemplate(): string {
  return [
    'hostname,ip,type,vendor,site,zone,rack,status,uplink',
    'fw-01,10.1.1.1,firewall,Palo Alto,Seoul,Edge,Rack-1,normal,',
    'sw-01,10.1.1.2,switch,Cisco,Seoul,Edge,Rack-1,normal,fw-01',
    'rt-01,10.1.1.3,router,Cisco,Seoul,Edge,Rack-1,normal,fw-01',
    'srv-01,10.1.1.10,server,Dell,Seoul,Compute,Rack-2,normal,sw-02',
    'srv-02,10.1.1.11,server,Dell,Seoul,Compute,Rack-2,warning,sw-02',
    'srv-03,10.1.1.12,server,HPE,Seoul,Compute,Rack-2,normal,sw-02',
    'sw-02,10.1.1.4,switch,Arista,Seoul,Compute,Rack-2,normal,sw-01',
    'db-01,10.1.2.10,database,Oracle,Seoul,Compute,Rack-3,normal,sw-03',
    'stg-01,10.1.2.20,storage,NetApp,Seoul,Compute,Rack-3,normal,sw-03',
    'sw-03,10.1.1.5,switch,Cisco,Seoul,Compute,Rack-3,normal,sw-01',
  ].join('\n')
}
