import type {
  RawDevice, Space, DeviceMapping, NetworkLink, NetworkInterface,
  DeviceStatus, DeviceType,
} from '@/types'

function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}
function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function randInt(min: number, max: number) { return Math.floor(rand(min, max + 1)) }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

const STATUS_POOL: DeviceStatus[] = [
  'normal','normal','normal','normal','normal',
  'warning','warning','critical','offline','unknown',
]

const VENDORS: Record<DeviceType, string[]> = {
  server:        ['Dell', 'HPE', 'Lenovo', 'Supermicro'],
  switch:        ['Cisco', 'Juniper', 'Arista', 'HPE'],
  router:        ['Cisco', 'Juniper', 'MikroTik'],
  firewall:      ['Palo Alto', 'Fortinet', 'Check Point', 'Cisco'],
  database:      ['Oracle', 'MySQL', 'PostgreSQL', 'MongoDB'],
  storage:       ['NetApp', 'Pure Storage', 'EMC', 'IBM'],
  vm:            ['VMware', 'KVM', 'Hyper-V'],
  container:     ['Docker', 'Kubernetes', 'Podman'],
  load_balancer: ['F5', 'HAProxy', 'nginx', 'Citrix'],
  access_point:  ['Cisco', 'Ubiquiti', 'Ruckus'],
  cloud_service: ['AWS', 'Azure', 'GCP'],
  unknown:       ['Unknown'],
}

function makeInterfaces(deviceId: string, type: DeviceType, count: number): NetworkInterface[] {
  const portNames = type === 'switch' || type === 'router'
    ? ['GE0/0','GE0/1','GE0/2','GE0/3','GE0/4','GE0/5','GE0/6','GE0/7']
    : ['eth0','eth1','bond0']

  return portNames.slice(0, count).map((name, i) => ({
    id: `${deviceId}-if-${i}`,
    rawDeviceId: deviceId,
    name,
    alias: i === 0 ? 'uplink' : i === 1 ? 'mgmt' : undefined,
    ip: i === 0 ? `10.${randInt(1,254)}.${randInt(1,254)}.${randInt(1,254)}` : undefined,
    status: pick(['up','up','up','down','unknown'] as const),
    speed: pick([100, 1000, 10000, 25000]),
    trafficIn:  rand(0, 900),
    trafficOut: rand(0, 500),
    errors:   Math.random() > 0.85 ? randInt(1, 50) : 0,
    discards: Math.random() > 0.9  ? randInt(1, 20) : 0,
  }))
}

function makeDevice(
  type: DeviceType, zoneId: string, siteId: string,
  idx: number,
): { device: RawDevice; interfaces: NetworkInterface[] } {
  const id = `dev-${uid()}`
  const vendor = pick(VENDORS[type])
  const status = pick(STATUS_POOL)
  const device: RawDevice = {
    id,
    source: pick(['zabbix','prtg','manual','openNMS']),
    externalId: `ext-${uid()}`,
    hostname: `${type.slice(0,3)}-${zoneId.slice(-2)}-${String(idx).padStart(2,'0')}`,
    ip: `10.${randInt(1,4)}.${randInt(1,254)}.${randInt(1,254)}`,
    normalizedType: type,
    vendor,
    model: `${vendor}-Model-${randInt(100,999)}`,
    status,
    metrics: {
      cpu:        rand(5, 98),
      memory:     rand(20, 95),
      disk:       rand(10, 90),
      networkIn:  rand(10, 950),
      networkOut: rand(5, 500),
      temperature: rand(35, 78),
    },
    siteId,
    firstSeenAt: new Date(Date.now() - rand(0, 365) * 86400000).toISOString(),
    lastSeenAt:  new Date().toISOString(),
    syncState: 'active',
  }
  const ifaceCount = type === 'switch' ? 8 : type === 'router' ? 6 : type === 'firewall' ? 4 : 2
  const interfaces = makeInterfaces(id, type, ifaceCount)
  return { device, interfaces }
}

// ─── 메인 생성 함수 ───────────────────────────────────────────────────────────

export interface MockData {
  spaces: Space[]
  devices: RawDevice[]
  deviceMappings: DeviceMapping[]
  links: NetworkLink[]
  interfaces: NetworkInterface[]
  unmappedDevices: RawDevice[]
}

export function generateMockData(): MockData {
  const spaces: Space[] = []
  const devices: RawDevice[] = []
  const deviceMappings: DeviceMapping[] = []
  const links: NetworkLink[] = []
  const allInterfaces: NetworkInterface[] = []

  // 3 Sites
  const SITES = [
    { id: 'site-seoul', name: 'Seoul DC', x: -60, z: 0 },
    { id: 'site-busan', name: 'Busan DR', x:   0, z: 0 },
    { id: 'site-cloud', name: 'Cloud (Tokyo)', x: 60, z: 0 },
  ]

  SITES.forEach((site, si) => {
    spaces.push({
      id: site.id, name: site.name,
      kind: si < 2 ? 'physical' : 'virtual',
      type: 'site', source: 'manual',
      position: { x: site.x, y: 0, z: site.z },
      size: { width: 50, height: 0.1, depth: 40 },
    })

    // 2 Zones per site
    const ZONES = [
      { suffix: '-zone-net', name: 'Network Zone', dx: -12, purpose: 'network' },
      { suffix: '-zone-srv', name: 'Server Zone',  dx:  12, purpose: 'compute' },
    ]

    ZONES.forEach((zone, zi) => {
      const zoneId = site.id + zone.suffix
      spaces.push({
        id: zoneId, name: zone.name,
        kind: 'physical', type: 'zone',
        parentId: site.id, source: 'manual',
        position: { x: site.x + zone.dx, y: 0, z: site.z },
        size: { width: 22, height: 0.1, depth: 38 },
        color: zi === 0 ? '#1e3a5f' : '#1a3a2a',
      })

      // 3 Racks per zone — 장비를 평면 격자로 펼쳐 토폴로지처럼 표시
      const DEV_Y    = 0.4    // 장비 높이 (평면)
      const COL_GAP  = 2.0
      const ROW_GAP  = 2.2
      for (let ri = 0; ri < 3; ri++) {
        const rackId = `${zoneId}-rack-${ri}`
        const rackX = site.x + zone.dx + (ri - 1) * 8
        const rackZ = site.z

        // 장비 구성
        const typeCombo: DeviceType[] = zi === 0
          ? ['switch', 'router', 'firewall', 'load_balancer', 'switch']  // network zone
          : ['switch', 'server', 'server', 'server', 'database', 'storage', 'server']  // server zone

        const rackDevices: { device: RawDevice; pos: { x: number; z: number } }[] = []
        const rows = Math.ceil(typeCombo.length / 2)

        // 랙 영역 박스 (장비 격자를 감싸는 바닥 패드)
        spaces.push({
          id: rackId, name: `Rack-${si + 1}${zi + 1}${ri + 1}`,
          kind: 'physical', type: 'rack',
          parentId: zoneId, source: 'manual',
          position: { x: rackX, y: 0, z: rackZ },
          size: { width: COL_GAP * 2 + 1.2, height: 0.3, depth: rows * ROW_GAP + 0.8 },
        })

        typeCombo.forEach((type, slotIdx) => {
          const { device, interfaces } = makeDevice(type, zoneId, site.id, slotIdx)
          devices.push(device)
          allInterfaces.push(...interfaces)

          const col = slotIdx % 2
          const row = Math.floor(slotIdx / 2)
          const dx  = (col - 0.5) * COL_GAP
          const dz  = (row - (rows - 1) / 2) * ROW_GAP
          const px  = rackX + dx
          const pz  = rackZ + dz
          rackDevices.push({ device, pos: { x: px, z: pz } })

          deviceMappings.push({
            id: `map-${device.id}`,
            rawDeviceId: device.id,
            primarySpaceId: rackId,
            slotIndex: slotIdx,
            mappingStatus: 'mapped',
            position: { x: px, y: DEV_Y, z: pz },
            tags: [type, site.id],
            importance: device.status === 'critical' ? 'critical' : 'normal',
            updatedAt: new Date().toISOString(),
          })
        })

        // 랙 내 링크: 스위치를 허브로 나머지 장비 각각 연결 (star topology)
        const hub = rackDevices.find(d => d.device.normalizedType === 'switch')
        if (hub) {
          rackDevices.forEach(d => {
            if (d.device.id === hub.device.id) return
            links.push({
              id: `link-${uid()}`,
              sourceDeviceId: d.device.id,
              targetDeviceId: hub.device.id,
              type: 'physical',
              status: 'up',
              source: 'discovered',
              confidence: 'high',
              bandwidth: 1000,
            })
          })
        }
      }
    })

    // 존 간 연결 (net-zone switch → srv-zone switch)
    const netRacks = spaces.filter(s => s.type === 'rack' && s.parentId?.includes('zone-net') && s.parentId.startsWith(site.id))
    const srvRacks = spaces.filter(s => s.type === 'rack' && s.parentId?.includes('zone-srv') && s.parentId.startsWith(site.id))

    if (netRacks[0] && srvRacks[0]) {
      // 두 zone 첫 번째 랙의 switch끼리 연결
      const netSwitch = devices.find(d => d.normalizedType === 'switch' && deviceMappings.find(m => m.rawDeviceId === d.id && m.primarySpaceId === netRacks[0].id))
      const srvSwitch = devices.find(d => d.normalizedType === 'switch' && deviceMappings.find(m => m.rawDeviceId === d.id && m.primarySpaceId === srvRacks[0].id))
      if (netSwitch && srvSwitch) {
        links.push({
          id: `link-${uid()}`,
          sourceDeviceId: netSwitch.id,
          targetDeviceId: srvSwitch.id,
          type: 'logical',
          status: 'up',
          source: 'discovered',
          confidence: 'medium',
          label: 'Core Link',
        })
      }
    }
  })

  // 사이트 간 논리 연결 (Cloud ↔ Seoul)
  const seoulRouter  = devices.find(d => d.normalizedType === 'router' && d.siteId === 'site-seoul')
  const cloudService = devices.find(d => d.normalizedType === 'router' && d.siteId === 'site-cloud')
  if (seoulRouter && cloudService) {
    links.push({
      id: `link-${uid()}`,
      sourceDeviceId: seoulRouter.id,
      targetDeviceId: cloudService.id,
      type: 'service_dependency',
      status: 'up',
      source: 'manual',
      label: 'WAN Link',
    })
  }

  // 미매핑 장비 5개 (Unmapped Queue용)
  const unmappedDevices: RawDevice[] = []
  const unmappedTypes: DeviceType[] = ['server', 'switch', 'firewall', 'server', 'database']
  unmappedTypes.forEach((type, i) => {
    const { device } = makeDevice(type, 'unmapped', 'site-seoul', i)
    device.syncState = 'active'
    unmappedDevices.push(device)
  })

  return { spaces, devices, deviceMappings, links, interfaces: allInterfaces, unmappedDevices }
}
