import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CustomDeviceType } from '@/types'

const STORAGE_KEY = 'topospace.customTypes'

export const useDeviceTypesStore = defineStore('deviceTypes', () => {
  const customTypes = ref<Map<string, CustomDeviceType>>(_load())

  function _load(): Map<string, CustomDeviceType> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return new Map()
      return new Map((JSON.parse(raw) as CustomDeviceType[]).map(t => [t.id, t]))
    } catch { return new Map() }
  }

  function _persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...customTypes.value.values()]))
  }

  function upsert(type: CustomDeviceType) {
    customTypes.value.set(type.id, { ...type })
    _persist()
  }

  function remove(id: string) {
    customTypes.value.delete(id)
    _persist()
  }

  return { customTypes, upsert, remove }
})
