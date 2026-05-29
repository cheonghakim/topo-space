import { ref } from 'vue'
import type { DeviceStatus } from '@/types'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'

export function useWebSocketSim() {
  const editor    = useEditorStore()
  const ui        = useUIStore()
  const connected = ref(false)
  const eventLog  = ref<{ time: string; msg: string }[]>([])
  let   timers: ReturnType<typeof setInterval>[] = []

  function log(msg: string) {
    eventLog.value.unshift({ time: new Date().toLocaleTimeString(), msg })
    if (eventLog.value.length > 50) eventLog.value.pop()
  }

  function connect() {
    if (connected.value) return
    connected.value = true
    ui.addToast('Live updates connected', 'success')
    log('WebSocket connected')

    // Device status changes
    const STATUS_POOL: DeviceStatus[] = ['normal','normal','normal','warning','critical','offline','maintenance']
    timers.push(setInterval(() => {
      const ids = [...editor.devices.keys()]
      if (!ids.length) return
      const id  = ids[Math.floor(Math.random() * ids.length)]
      const dev = editor.devices.get(id)
      if (!dev) return
      const newStatus = STATUS_POOL[Math.floor(Math.random() * STATUS_POOL.length)]
      if (newStatus === dev.status) return
      const oldStatus = dev.status
      editor.updateDeviceStatus(id, newStatus)

      if (newStatus === 'critical') {
        ui.addToast(`${dev.hostname} is CRITICAL`, 'critical')
        log(`CRITICAL: ${dev.hostname}`)
      } else if (newStatus === 'warning' && oldStatus !== 'critical') {
        ui.addToast(`${dev.hostname} is WARNING`, 'warning')
      } else if (newStatus === 'offline') {
        ui.addToast(`${dev.hostname} is OFFLINE`, 'warning')
      } else if (newStatus === 'normal' && (oldStatus === 'critical' || oldStatus === 'warning')) {
        ui.addToast(`${dev.hostname} recovered`, 'success')
      }
    }, 3000))

    // Metric updates
    timers.push(setInterval(() => {
      const ids = [...editor.devices.keys()]
      const sample = ids.slice(0, Math.min(5, ids.length))
      sample.forEach(id => {
        const dev = editor.devices.get(id)
        if (!dev?.metrics) return
        editor.updateDeviceStatus(id, dev.status ?? 'normal', {
          cpu:        Math.min(100, Math.max(0, (dev.metrics.cpu ?? 50) + (Math.random() - 0.5) * 15)),
          memory:     Math.min(100, Math.max(0, (dev.metrics.memory ?? 50) + (Math.random() - 0.5) * 8)),
          networkIn:  Math.max(0, (dev.metrics.networkIn  ?? 100) + (Math.random() - 0.5) * 200),
          networkOut: Math.max(0, (dev.metrics.networkOut ?? 50)  + (Math.random() - 0.5) * 100),
        })
      })
    }, 1500))

    // Link status changes
    timers.push(setInterval(() => {
      const linkIds = [...editor.links.keys()]
      if (!linkIds.length) return
      const id   = linkIds[Math.floor(Math.random() * linkIds.length)]
      const link = editor.links.get(id)
      if (!link) return
      const newStatus = Math.random() > 0.15 ? 'up' : 'down'
      if (newStatus !== link.status) {
        editor.updateLink(id, { status: newStatus as 'up' | 'down' })
        if (newStatus === 'down') {
          ui.addToast(`Link DOWN (${link.type})`, 'critical')
          log(`Link DOWN: ${link.type}`)
        } else {
          ui.addToast(`Link UP (${link.type})`, 'success')
        }
      }
    }, 12000))

    // New device discovery
    timers.push(setInterval(() => {
      if (editor.unmappedDevices.length > 8) return
      const types = ['server', 'switch', 'vm'] as const
      const t     = types[Math.floor(Math.random() * types.length)]
      const id    = `ws-dev-${Date.now()}`
      const hostname = `discovered-${t}-${id.slice(-4)}`
      editor.upsertDevices([{
        id, source: 'zabbix', externalId: id,
        hostname,
        ip: `10.99.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
        normalizedType: t,
        status: 'unknown',
        syncState: 'active',
        lastSeenAt: new Date().toISOString(),
      }])
      ui.addToast(`New device discovered: ${hostname}`, 'info')
      log(`NEW: ${hostname}`)
    }, 25000))
  }

  function disconnect() {
    if (!connected.value) return
    connected.value = false
    timers.forEach(t => clearInterval(t))
    timers = []
    ui.addToast('Live updates disconnected', 'info')
    log('WebSocket disconnected')
  }

  return { connected, eventLog, connect, disconnect }
}
