import { computed } from 'vue'
import { useDeviceTypesStore } from '@/stores/deviceTypes'
import { DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR, DEVICE_TYPE_LABEL } from '@/utils/colorUtils'

export function useDeviceTypeHelpers() {
  const store = useDeviceTypesStore()

  function typeColor(type: string | undefined): string {
    const t = type ?? 'unknown'
    return store.customTypes.get(t)?.color ??
           (DEVICE_TYPE_COLOR as Record<string, string>)[t] ??
           '#6b7280'
  }

  function typeAbbr(type: string | undefined): string {
    const t = type ?? 'unknown'
    return store.customTypes.get(t)?.abbr ??
           (DEVICE_TYPE_ABBR as Record<string, string>)[t] ??
           t.slice(0, 4).toUpperCase()
  }

  function typeLabel(type: string | undefined): string {
    const t = type ?? 'unknown'
    return store.customTypes.get(t)?.label ??
           (DEVICE_TYPE_LABEL as Record<string, string>)[t] ??
           t
  }

  // All built-in + custom types for selects
  const allTypes = computed(() => {
    const builtIn = Object.keys(DEVICE_TYPE_LABEL).map(id => ({
      id,
      label: (DEVICE_TYPE_LABEL as Record<string, string>)[id],
      color: (DEVICE_TYPE_COLOR as Record<string, string>)[id],
      custom: false,
    }))
    const customs = [...store.customTypes.values()].map(t => ({
      id: t.id,
      label: t.label,
      color: t.color,
      custom: true,
    }))
    return [...builtIn, ...customs]
  })

  return { typeColor, typeAbbr, typeLabel, allTypes }
}
