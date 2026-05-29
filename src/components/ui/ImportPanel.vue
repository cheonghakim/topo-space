<template>
  <Teleport to="body">
    <div v-if="ui.showImport" class="imp-overlay" @click.self="close">
      <div class="imp-modal">
          <div class="imp-head">
            <span class="imp-title">Import Devices &amp; Topology</span>
            <button class="text-btn" @click="downloadTemplate">Download CSV template</button>
            <button class="text-btn" @click="close">Close</button>
          </div>

          <div class="imp-body">
            <!-- Step 1: file -->
            <section class="imp-section">
              <div class="step-title">1. Select file</div>
              <div
                class="drop-zone"
                :class="{ hover: dragOver }"
                @dragover.prevent="dragOver = true"
                @dragleave="dragOver = false"
                @drop.prevent="onDrop"
              >
                <input ref="fileInput" type="file" accept=".csv,.xlsx" hidden @change="onPick" />
                <button class="pick-btn" @click="fileInput?.click()">Choose CSV / XLSX</button>
                <span class="drop-hint">or drop a file here</span>
                <span v-if="fileName" class="file-name">{{ fileName }} · {{ result?.rows.length ?? 0 }} rows</span>
              </div>
              <div class="schema">
                Expected columns:
                <code>hostname</code>, <code>ip</code>, <code>type</code>, <code>vendor</code>,
                <code>site</code>, <code>zone</code>, <code>rack</code>, <code>status</code>, <code>uplink</code>.
                <span class="req">hostname</span> and <span class="req">type</span> are required.
              </div>
            </section>

            <!-- Step 2: preview -->
            <section class="imp-section" v-if="result">
              <div class="step-title">2. Preview</div>

              <div v-if="result.errors.length" class="err-block">
                <div v-for="(e, i) in result.errors.slice(0, 5)" :key="i" class="err-line">{{ e }}</div>
                <div v-if="result.errors.length > 5" class="err-more">… and {{ result.errors.length - 5 }} more</div>
              </div>
              <div v-if="result.warnings.length" class="warn-block">
                <div v-for="(w, i) in result.warnings" :key="i" class="warn-line">{{ w }}</div>
              </div>

              <div class="tbl-wrap" v-if="result.rows.length">
                <table class="tbl">
                  <thead>
                    <tr>
                      <th>hostname</th><th>type</th><th>ip</th>
                      <th>site</th><th>zone</th><th>rack</th>
                      <th>status</th><th>uplink</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, i) in result.rows.slice(0, 12)" :key="i">
                      <td>{{ r.hostname }}</td>
                      <td>{{ r.type }}</td>
                      <td>{{ r.ip ?? '' }}</td>
                      <td>{{ r.site ?? '' }}</td>
                      <td>{{ r.zone ?? '' }}</td>
                      <td>{{ r.rack ?? '' }}</td>
                      <td>{{ r.status ?? '' }}</td>
                      <td>{{ r.uplink ?? '' }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="result.rows.length > 12" class="tbl-more">
                  … {{ result.rows.length - 12 }} more rows
                </div>
              </div>
            </section>

            <!-- Step 3: options -->
            <section class="imp-section" v-if="result && result.rows.length">
              <div class="step-title">3. Import options</div>
              <label class="opt">
                <input type="checkbox" v-model="replaceAll" />
                <span>Replace current scene (clear existing devices, spaces, links)</span>
              </label>
              <div v-if="ui.mode !== 'edit'" class="mode-warning">
                Switch to Edit mode before importing topology data.
              </div>
              <button class="run-btn" :disabled="ui.mode !== 'edit' || importing" @click="run">
                Import {{ result.rows.length }} devices
              </button>
            </section>
          </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useUIStore }     from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'
import { useNmsEditor }   from '@/composables/useNmsEditor'
import { parseCsv, parseXlsx, sampleCsvTemplate, type ParseResult } from '@/data/importParser'

const ui     = useUIStore()
const editor = useEditorStore()
const { rebuildAll } = useNmsEditor()

const fileInput = ref<HTMLInputElement | null>(null)
const fileName  = ref('')
const dragOver  = ref(false)
const result    = ref<ParseResult | null>(null)
const replaceAll = ref(false)
const importing = ref(false)

function close() { ui.showImport = false }

async function loadFile(file: File) {
  fileName.value = file.name
  try {
    if (/\.xlsx$/i.test(file.name)) {
      const buf = await file.arrayBuffer()
      result.value = await parseXlsx(buf)
    } else {
      const text = await file.text()
      result.value = parseCsv(text)
    }
  } catch (err) {
    result.value = { rows: [], errors: [`Failed to parse: ${(err as Error).message}`], warnings: [] }
  }
}

function onPick(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) loadFile(f)
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) loadFile(f)
}

function downloadTemplate() {
  const blob = new Blob([sampleCsvTemplate()], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'topospace-template.csv'
  a.click()
  URL.revokeObjectURL(a.href)
}

async function run() {
  const current = result.value
  if (!current || !current.rows.length) return
  if (ui.mode !== 'edit') {
    ui.addToast('Switch to Edit mode before importing', 'warning')
    return
  }
  importing.value = true
  if (replaceAll.value) {
    if (!confirm('Replace the current scene? This will remove existing devices, spaces, and links.')) {
      importing.value = false
      return
    }
    clearScene()
  }
  try {
    const summary = editor.importTopology(current.rows)
    await nextTick()
    rebuildAll()
    ui.addToast(
      `Imported ${summary.devices} devices, ${summary.spaces} spaces, ${summary.links} links`,
      'success',
    )
    result.value  = null
    fileName.value = ''
    replaceAll.value = false
    ui.showImport = false
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    result.value = {
      rows: current.rows,
      errors: [`Failed to import: ${message}`],
      warnings: current.warnings,
    }
    ui.addToast('Import failed', 'critical')
  } finally {
    importing.value = false
  }
}

function clearScene() {
  editor.replaceData({})
}
</script>

<style scoped>
.imp-overlay {
  position: fixed; inset: 0; z-index: 9400;
  background: rgba(4, 7, 14, 0.6); backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
}
.imp-modal {
  width: 720px; max-width: 92vw; max-height: 86vh;
  background: #0b1020; border: 1px solid #2a4a8a; border-radius: 10px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.imp-head {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-bottom: 1px solid #1a2a4a;
}
.imp-title { color: #e2e8f0; font-weight: 700; font-size: 14px; flex: 1; }
.text-btn {
  background: none; border: 1px solid #1e3a5a; color: #94a3b8;
  padding: 4px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;
}
.text-btn:hover { border-color: #3b82f6; color: #e2e8f0; }

.imp-body { padding: 8px 16px 16px; overflow-y: auto; }
.imp-section { margin-top: 14px; }
.step-title {
  color: #60a5fa; font-size: 12px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #14233f;
}

.drop-zone {
  border: 1px dashed #1e3a5a; border-radius: 8px;
  padding: 16px; display: flex; align-items: center; gap: 12px;
  background: rgba(15, 23, 42, 0.5);
}
.drop-zone.hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.08); }
.pick-btn {
  background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd;
  padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer;
}
.pick-btn:hover { background: #2a4a8a; }
.drop-hint { color: #475569; font-size: 11px; }
.file-name { color: #cbd5e1; font-size: 11px; font-family: monospace; margin-left: auto; }

.schema { margin-top: 8px; color: #64748b; font-size: 11px; }
.schema code {
  background: rgba(148,163,184,.12); border: 1px solid rgba(148,163,184,.2);
  border-radius: 3px; padding: 1px 5px; font-size: 10px; color: #cbd5e1; margin: 0 1px;
}
.req { color: #f87171; }

.err-block {
  background: rgba(239,68,68,.08); border: 1px solid #7f1d1d;
  border-radius: 6px; padding: 6px 10px; margin-bottom: 8px;
}
.err-line { color: #fca5a5; font-size: 11px; font-family: monospace; }
.err-more { color: #f87171; font-size: 10px; margin-top: 2px; }
.warn-block {
  background: rgba(234,179,8,.08); border: 1px solid #78350f;
  border-radius: 6px; padding: 6px 10px; margin-bottom: 8px;
}
.warn-line { color: #fcd34d; font-size: 11px; }

.tbl-wrap { border: 1px solid #1a2a4a; border-radius: 6px; overflow: auto; max-height: 240px; }
.tbl { width: 100%; border-collapse: collapse; font-size: 11px; }
.tbl th {
  background: #0f1f3a; color: #94a3b8; font-weight: 600;
  text-align: left; padding: 5px 8px; position: sticky; top: 0;
  border-bottom: 1px solid #1a2a4a;
}
.tbl td {
  padding: 4px 8px; color: #cbd5e1; font-family: monospace; font-size: 11px;
  border-bottom: 1px solid rgba(255,255,255,.03);
}
.tbl-more { padding: 6px; color: #475569; font-size: 10px; text-align: center; border-top: 1px solid #1a2a4a; }

.opt {
  display: flex; align-items: center; gap: 8px;
  color: #cbd5e1; font-size: 11px; cursor: pointer; margin-bottom: 10px;
}
.run-btn {
  background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd;
  padding: 8px 18px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;
}
.run-btn:hover { background: #2a4a8a; }
.run-btn:disabled {
  cursor: not-allowed; opacity: .45; background: #0f172a; color: #64748b;
}
.mode-warning {
  margin-bottom: 8px; color: #fbbf24; font-size: 11px;
  background: rgba(234,179,8,.08); border: 1px solid #78350f;
  border-radius: 6px; padding: 7px 9px;
}

.imp-fade-enter-active, .imp-fade-leave-active { transition: opacity .15s; }
.imp-fade-enter-from, .imp-fade-leave-to { opacity: 0; }
</style>
