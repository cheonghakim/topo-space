# Topospace

3D network topology editor built on Vue 3 + Three.js. Drop it into any Vue app with a single function call — `createNmsEditor` mounts the full scene, panels, and toolbar into whatever container you hand it.

**[Live demo →](https://cheonghakim.github.io/topo-space/)**

---

## Installation

```bash
npm install topospace
# peer deps (if you don't have them already)
npm install vue pinia three
```

Then import the stylesheet once, somewhere early in your app:

```ts
import 'topospace/styles'
```

---

## Quick start

```ts
import { createNmsEditor } from 'topospace'
import 'topospace/styles'

const editor = createNmsEditor({
  container: document.getElementById('editor')!,
  mockData: true,   // renders the built-in demo scene so you can see it working immediately
})

// later, clean up
editor.destroy()
```

That's enough to get a live scene. Once you're past "does it work?", swap `mockData` for real data:

```ts
const editor = createNmsEditor({
  container: document.getElementById('editor')!,
  data: {
    devices: await fetchDevices(),
    links:   await fetchLinks(),
    spaces:  savedLayout.spaces,
    deviceMappings: savedLayout.deviceMappings,
  },
  onSave: async (snapshot) => {
    await api.saveLayout(snapshot)
  },
})
```

The container element must have an explicit `width` and `height` — the canvas fills it.

---

## Configuration (`EditorOptions`)

```ts
createNmsEditor({
  // Required
  container: HTMLElement

  // Seed data. All fields optional — pass only what you have.
  data?: {
    devices?:        RawDevice[]
    spaces?:         Space[]
    deviceMappings?: DeviceMapping[]
    links?:          NetworkLink[]
    interfaces?:     NetworkInterface[]
    virtualNodes?:   VirtualNode[]
    unmappedDevices?: RawDevice[]
  }

  // Start in 'view' (default) or 'edit' mode
  mode?: 'view' | 'edit'

  // Use true during development — loads a sample dataset with ~100 devices
  mockData?: boolean

  // Disable features you don't need (all enabled by default except the write ops)
  features?: FeatureFlags

  // Fine-grained permission hook — return false to block an action
  permissionResolver?: (ctx: PermissionContext) => boolean

  // Lifecycle callbacks
  onReady?:              () => void
  onChange?:             (event: EditorEventPayload) => void
  onSave?:               (snapshot: EditorSnapshot) => void | Promise<void>
  onError?:              (error: Error, context?: Record<string, unknown>) => void
  onPermissionDenied?:   (ctx: PermissionContext) => void
  onPerformanceWarning?: (metric: Record<string, unknown>) => void
  onOpenExternal?:       (url: string, ctx?: Record<string, unknown>) => void

  // Shadow DOM mode — useful inside web components or micro-frontends
  shadowDom?:      boolean
  stylesheetUrl?:  string   // required when shadowDom: true
  styleNonce?:     string   // CSP nonce for the injected <link>
})
```

### Feature flags

All features default to the values shown below. Set any of them to `false` to remove it from the UI entirely — useful when you want to embed a read-only view.

```ts
features: {
  view:           true,   // basic 3D navigation
  search:         true,   // search bar + device highlighting
  filter:         true,   // status / type filter dropdown
  deviceDetail:   true,   // right panel when a device is selected
  topologyView:   true,   // link rendering
  topologyEdit:   false,  // connect mode (draw links)
  realtimeUpdate: true,   // live status badge flashing
  savedView:      false,  // save/restore camera positions
  layoutEdit:     false,  // drag-to-move devices and spaces
  spaceEdit:      false,  // create/resize/delete spaces
  annotationEdit: false,  // notes on devices
  import:         false,  // CSV / XLSX import panel
}
```

A common read-only embed looks like:

```ts
features: {
  topologyEdit: false,
  layoutEdit:   false,
  spaceEdit:    false,
  import:       false,
}
```

### Permission resolver

For anything more nuanced than enabling/disabling whole features, provide a `permissionResolver`. It's called before every write action, and returning `false` blocks it (and fires `onPermissionDenied`).

```ts
permissionResolver: ({ action, target, userContext }) => {
  if (action === 'space:delete') return userContext?.role === 'admin'
  if (action === 'topology:createLink') return userContext?.canEditTopology === true
  return true
}
```

Available action values: `view`, `layout:update`, `space:create`, `space:update`, `space:delete`, `device:map`, `device:unmap`, `annotation:create`, `annotation:update`, `annotation:delete`, `topology:createLink`, `topology:updateLink`, `topology:deleteLink`, `virtualNode:create`, `virtualNode:update`, `virtualNode:delete`, `import`, `rawDevice:update`.

---

## NmsEditor methods

The object returned by `createNmsEditor` gives you programmatic control over the running editor.

```ts
// Push device updates without a full reload.
// Devices already in the scene are updated in place; new ones are added to the unmapped list.
editor.upsertDevices(devices: RawDevice[])

// Remove devices by id. This also removes any links attached to them.
editor.removeDevices(ids: string[])

// Programmatically select a device (opens its detail panel).
// Pass null to clear the selection.
editor.selectDevice(id: string | null)

// Apply a search/status/type filter from outside the UI.
editor.applyFilter({
  search: 'web',
  status: ['critical', 'warning'],
})

// Flip between modes from outside the editor UI.
editor.setMode('edit')   // or 'view'

// Read back a single device (e.g. to check its current status).
const device = editor.getDevice('device-id-123')

// Capture the current layout state so you can persist it.
const snapshot = editor.exportSnapshot()
// snapshot.spaces, snapshot.deviceMappings, snapshot.manualLinks

// Restore a previously saved layout.
editor.importSnapshot(snapshot)

// Trigger a save manually — calls your onSave callback.
await editor.save()

// Tear down the Vue app and release all Three.js resources.
editor.destroy()
```

---

## Data model

### `RawDevice`

Represents a physical or virtual node in your infrastructure. Only `id`, `source`, and `externalId` are required — everything else is optional.

```ts
{
  id:           string          // your internal ID — this is what you pass to selectDevice()
  source:       string          // where it came from, e.g. 'zabbix', 'netbox', 'manual'
  externalId:   string          // the id in the source system
  hostname?:    string
  ip?:          string
  normalizedType?: DeviceType   // server | switch | router | firewall | database | storage
                                // | vm | container | load_balancer | access_point
                                // | cloud_service | unknown
  status?:      DeviceStatus    // normal | warning | critical | offline
                                // | unknown | maintenance | acknowledged | stale
  metrics?: {
    cpu?:        number          // 0–100
    memory?:     number          // 0–100
    disk?:       number          // 0–100
    networkIn?:  number          // bytes/s
    networkOut?: number
    [key: string]: number | undefined
  }
  vendor?:      string
  model?:       string
  externalUrl?: string          // opened via onOpenExternal when the user clicks "Open in source"
  metadata?:    Record<string, unknown>
}
```

### `NetworkLink`

```ts
{
  id:             string
  sourceDeviceId: string
  targetDeviceId: string
  type:           EdgeType      // physical | logical | service_dependency
                                // | traffic_flow | security_path | manual | inferred
  status?:        'up' | 'down' | 'unknown'
  bandwidth?:     number        // bits/s — shown on hover
  label?:         string
  source:         'discovered' | 'manual' | 'cmdb' | 'inferred' | 'import'
  confidence?:    'high' | 'medium' | 'low'
}
```

### `Space`

Spaces are the visual grouping containers — sites, zones, racks, and so on.

```ts
{
  id:       string
  name:     string
  type:     SpaceType    // site | zone | rack | custom_group
                         // | security_zone | service | external | cloud
  kind:     'physical' | 'logical' | 'virtual'
  source:   'manual' | 'api' | 'cmdb' | 'import'
  position?: Vector3Like  // { x, y, z } in Three.js world units
  size?:     Size3D       // { width, height, depth }
  color?:    string       // hex, overrides default palette for non-rack types
  parentId?: string       // for nested spaces (zone inside site, etc.)
  archived?: boolean
}
```

### `EditorSnapshot`

What `exportSnapshot` returns and `importSnapshot` accepts. This is your persistence format — store it in a database, export it as JSON, diff it for audits, whatever.

```ts
{
  version:        string         // semver of the snapshot format
  timestamp:      string         // ISO 8601
  spaces:         Space[]
  deviceMappings: DeviceMapping[]
  manualLinks:    NetworkLink[]  // links added through the editor, not from data.links
}
```

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `F` | Fit all (reset camera to show every mapped device) |
| `Esc` | Clear selection / cancel current tool |
| `L` | Toggle Connect mode |
| `Del` / `Backspace` | Delete selected device, link, or space |
| `Ctrl+Z` / `Ctrl+Y` | Undo / Redo |

---

## Shadow DOM

If you're embedding Topospace inside a web component or a micro-frontend that uses Shadow DOM, pass `shadowDom: true` along with the stylesheet URL. The editor will attach a shadow root to your container instead of mounting into the main document.

```ts
createNmsEditor({
  container: this.shadowRoot!.querySelector('#map')!,
  shadowDom: true,
  stylesheetUrl: new URL('topospace/styles', import.meta.url).href,
})
```

---

## CSV / XLSX import format

When `features.import` is enabled, users can import devices from a spreadsheet. Expected columns (order doesn't matter, names are case-insensitive):

| Column | Required | Notes |
|--------|----------|-------|
| `hostname` | ✓ | |
| `type` | ✓ | Accepts aliases: `srv`, `sw`, `fw`, `rtr`, `db`, … |
| `ip` | | |
| `vendor` | | |
| `site` | | Creates spaces automatically |
| `zone` | | |
| `rack` | | |
| `status` | | `normal`, `warning`, `critical`, `offline` |
| `uplink` | | `hostname` of the device to link to |

---

## Development

```bash
git clone https://github.com/cheonghakim/topo-space
cd topo-space
npm install

npm run dev          # dev server with hot reload
npm run build        # build the library (dist/)
npm run build:demo   # build the GitHub Pages demo (demo-dist/)
npm run test:unit    # vitest
npm run test:e2e     # playwright (starts a dev server automatically)
npm run docs:api     # generate TypeDoc into docs/api/
```

---

## 한국어 빠른 시작

설치:

```bash
npm install topospace
npm install vue pinia three   # peer deps
```

스타일시트는 앱 진입점에서 한 번만 import:

```ts
import 'topospace/styles'
```

기본 사용법:

```ts
import { createNmsEditor } from 'topospace'

const editor = createNmsEditor({
  container: document.getElementById('editor')!,
  mockData: true,  // 샘플 데이터로 바로 확인 가능
  onSave: async (snapshot) => {
    await api.saveLayout(snapshot)  // EditorSnapshot을 서버에 저장
  },
})
```

실제 데이터를 사용할 때는 `mockData`를 빼고 `data`에 장비·링크·공간 정보를 넣으면 됩니다. 기존 레이아웃이 있으면 `importSnapshot()`으로 복원하고, 편집 후엔 `exportSnapshot()`으로 저장합니다.

라이브 데모: **https://cheonghakim.github.io/topo-space/**
