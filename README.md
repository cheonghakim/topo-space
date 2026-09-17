<!-- keywords: network topology editor, vue3 threejs 3d visualization, NMS UI component, topology viewer, network diagram, infrastructure map, vue network map, 네트워크 토폴로지 에디터, 네트워크 맵 뷰어, 3D 네트워크 다이어그램 -->
# Topospace

3D network topology editor built on Vue 3 + Three.js. Drop it into any Vue app with a single function call — `createNmsEditor` mounts the full scene, panels, and toolbar into whatever container you hand it.

[![npm version](https://img.shields.io/npm/v/topospace)](https://www.npmjs.com/package/topospace)
[![License](https://img.shields.io/npm/l/topospace)](https://github.com/cheonghakim/topo-space/blob/main/LICENSE)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/topospace)](https://bundlephobia.com/package/topospace)

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
import "topospace/styles";
```

---

## Quick start

```ts
import { createNmsEditor } from "topospace";
import "topospace/styles";

const editor = createNmsEditor({
  container: document.getElementById("editor")!,
  mockData: true, // renders the built-in demo scene so you can see it working immediately
});

// later, clean up
editor.destroy();
```

That's enough to get a live scene. Once you're past "does it work?", swap `mockData` for real data:

```ts
const editor = createNmsEditor({
  container: document.getElementById("editor")!,
  data: {
    devices: await fetchDevices(),
    links: await fetchLinks(),
    spaces: savedLayout.spaces,
    deviceMappings: savedLayout.deviceMappings,
  },
  onSave: async (snapshot) => {
    await api.saveLayout(snapshot);
  },
});
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
  if (action === "space:delete") return userContext?.role === "admin";
  if (action === "topology:createLink")
    return userContext?.canEditTopology === true;
  return true;
};
```

Available action values: `view`, `layout:update`, `space:create`, `space:update`, `space:delete`, `device:map`, `device:unmap`, `annotation:create`, `annotation:update`, `annotation:delete`, `topology:createLink`, `topology:updateLink`, `topology:deleteLink`, `virtualNode:create`, `virtualNode:update`, `virtualNode:delete`, `import`, `rawDevice:update`.

---

## NmsEditor methods

The object returned by `createNmsEditor` gives you programmatic control over the running editor.

```ts
// Push device updates without a full reload.
// Devices already in the scene are updated in place; new ones are added to the unmapped list.
editor.upsertDevices(devices: RawDevice[])

// Remove devices by id. This also removes any links attached to them
// and their device mapping.
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

### Auto layout

Force-directed placement for devices that don't have a manual position yet. Devices sharing a space/rack pull together; anything already positioned stays pinned unless `includeMapped` is set. Requires `mode: 'edit'` (gated by the `layout:update` permission, same as drag-to-move).

```ts
await editor.autoLayout({
  deviceIds:     ['dev-1', 'dev-2'],  // defaults to every known device
  includeMapped: false,               // re-lay-out already-positioned devices too
  iterations:    200,
  onProgress:    (fraction) => console.log(fraction),
})

// Stop an in-flight run early — devices keep whatever position they'd
// reached so far.
editor.cancelAutoLayout()
```

### Backend push methods

These never go through the UI permission guard — they're for a backend you already trust pushing facts it discovered, not a user editing the topology by hand — and they fire `onChange` with `event.source === 'api'` so you can tell backend-driven changes apart from user-driven ones.

```ts
// Batch upsert/remove links (merges by id, same semantics as upsertDevices).
editor.upsertLinks(links: NetworkLink[])
editor.removeLinks(ids: string[])

// Batch upsert spaces. removeSpaces is a soft delete — it archives the
// space (archived: true) rather than deleting it, so nothing underneath
// it is left pointing at a parentId that no longer exists.
editor.upsertSpaces(spaces: Space[])
editor.removeSpaces(ids: string[])

// Batch upsert interfaces (link speed/traffic/errors, etc).
editor.upsertInterfaces(interfaces: NetworkInterface[])

// Batch upsert/remove virtual nodes (internet/cloud/external placeholders).
editor.upsertVirtualNodes(nodes: VirtualNode[])
editor.removeVirtualNodes(ids: string[])

// Partially merge a device's ack/maintenance/suppression state — only the
// fields you pass are changed, everything else on operatorState is kept.
editor.setOperatorState(deviceId: string, patch: Partial<OperatorState>)

// Report your own transport's health. Drives the connection indicator in
// the menu bar; topospace never infers this on its own.
editor.setConnectionStatus(status: 'connected' | 'reconnecting' | 'disconnected', detail?: { message?: string })

// Surface a toast, e.g. for a backend-detected alarm.
editor.notify(message: string, type?: 'info' | 'warning' | 'critical' | 'success')
```

---

## Backend Integration

topospace has no collector, alerting engine, database, or auth server of its own — it's a view/editor layer. You own the polling/WebSocket/whatever transport and your own auth; you just call the methods above whenever your backend has new data. Two common patterns:

**REST polling**

```ts
async function poll() {
  try {
    const res = await fetch('/api/topology', { headers: { Authorization: `Bearer ${token}` } })
    const { devices, links } = await res.json()
    editor.upsertDevices(devices)
    editor.upsertLinks(links)
    editor.setConnectionStatus('connected')
  } catch (err) {
    editor.setConnectionStatus('disconnected', { message: 'Failed to reach backend' })
  }
}
setInterval(poll, 10_000)
poll()
```

**WebSocket push**

```ts
const ws = new WebSocket('wss://your-backend/topology')

ws.onopen = () => editor.setConnectionStatus('connected')
ws.onclose = () => editor.setConnectionStatus('reconnecting')
ws.onerror = () => editor.setConnectionStatus('reconnecting')

ws.onmessage = (msg) => {
  const event = JSON.parse(msg.data)
  switch (event.type) {
    case 'device.upsert':   editor.upsertDevices(event.devices); break
    case 'link.upsert':     editor.upsertLinks(event.links); break
    case 'device.ack':      editor.setOperatorState(event.deviceId, { acknowledged: true }); break
    case 'alarm':           editor.notify(event.message, event.severity); break
  }
}
```

Your backend decides the message shape (`event.type` above is just an example) — topospace doesn't mandate a wire format, only the methods you call once you've parsed it.

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

| Key                 | Action                                             |
| ------------------- | -------------------------------------------------- |
| `F`                 | Fit all (reset camera to show every mapped device) |
| `Esc`               | Clear selection / cancel current tool              |
| `L`                 | Toggle Connect mode                                |
| `Del` / `Backspace` | Delete selected device, link, or space             |
| `Ctrl+Z` / `Ctrl+Y` | Undo / Redo                                        |

---

## Shadow DOM

If you're embedding Topospace inside a web component or a micro-frontend that uses Shadow DOM, pass `shadowDom: true` along with the stylesheet URL. The editor will attach a shadow root to your container instead of mounting into the main document.

```ts
createNmsEditor({
  container: this.shadowRoot!.querySelector("#map")!,
  shadowDom: true,
  stylesheetUrl: new URL("topospace/styles", import.meta.url).href,
});
```

---

## CSV / XLSX import format

When `features.import` is enabled, users can import devices from a spreadsheet. Expected columns (order doesn't matter, names are case-insensitive):

| Column     | Required | Notes                                              |
| ---------- | -------- | -------------------------------------------------- |
| `hostname` | ✓        |                                                    |
| `type`     | ✓        | Accepts aliases: `srv`, `sw`, `fw`, `rtr`, `db`, … |
| `ip`       |          |                                                    |
| `vendor`   |          |                                                    |
| `site`     |          | Creates spaces automatically                       |
| `zone`     |          |                                                    |
| `rack`     |          |                                                    |
| `status`   |          | `normal`, `warning`, `critical`, `offline`         |
| `uplink`   |          | `hostname` of the device to link to                |

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

## 한국어 가이드

Vue 3 + Three.js 기반 3D 네트워크 토폴로지 에디터. `createNmsEditor` 함수 하나로 Vue 앱 어디서든 씬, 패널, 툴바를 원하는 컨테이너에 마운트할 수 있습니다.

**[라이브 데모 →](https://cheonghakim.github.io/topo-space/)**

---

**목차**

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [설정](#설정-editoroptions)
- [NmsEditor 메서드](#nmseditor-메서드)
- [데이터 모델](#데이터-모델)
- [키보드 단축키](#키보드-단축키)
- [Shadow DOM](#shadow-dom-1)
- [CSV / XLSX 임포트 형식](#csv--xlsx-임포트-형식)
- [개발](#개발)

---

### 설치

```bash
npm install topospace
# peer deps (아직 없다면)
npm install vue pinia three
```

스타일시트는 앱 진입점에서 한 번만 import:

```ts
import "topospace/styles";
```

---

### 빠른 시작

```ts
import { createNmsEditor } from "topospace";
import "topospace/styles";

const editor = createNmsEditor({
  container: document.getElementById("editor")!,
  mockData: true, // 샘플 데이터로 바로 동작하는지 확인할 때
});

// 다 쓰면 정리
editor.destroy();
```

일단 이걸로 씬이 뜨면 OK. 그다음엔 `mockData` 대신 실제 데이터를 넘기면 됩니다:

```ts
const editor = createNmsEditor({
  container: document.getElementById("editor")!,
  data: {
    devices: await fetchDevices(),
    links: await fetchLinks(),
    spaces: savedLayout.spaces,
    deviceMappings: savedLayout.deviceMappings,
  },
  onSave: async (snapshot) => {
    await api.saveLayout(snapshot);
  },
});
```

컨테이너 요소에 `width`, `height`가 명시돼 있어야 합니다. 캔버스가 거기 맞춰 채워지거든요.

---

### 설정 (`EditorOptions`)

```ts
createNmsEditor({
  // 필수
  container: HTMLElement

  // 초기 데이터. 있는 것만 넘겨도 됩니다.
  data?: {
    devices?:        RawDevice[]
    spaces?:         Space[]
    deviceMappings?: DeviceMapping[]
    links?:          NetworkLink[]
    interfaces?:     NetworkInterface[]
    virtualNodes?:   VirtualNode[]
    unmappedDevices?: RawDevice[]
  }

  // 'view'(기본) 또는 'edit' 모드로 시작
  mode?: 'view' | 'edit'

  // 개발 중에 true로 켜두면 장비 100개짜리 샘플 데이터가 로드됨
  mockData?: boolean

  // 필요 없는 기능은 꺼버릴 수 있음 (쓰기 관련 기능은 기본 off)
  features?: FeatureFlags

  // 세밀한 권한 제어 — false 반환하면 해당 액션 차단
  permissionResolver?: (ctx: PermissionContext) => boolean

  // 라이프사이클 콜백
  onReady?:              () => void
  onChange?:             (event: EditorEventPayload) => void
  onSave?:               (snapshot: EditorSnapshot) => void | Promise<void>
  onError?:              (error: Error, context?: Record<string, unknown>) => void
  onPermissionDenied?:   (ctx: PermissionContext) => void
  onPerformanceWarning?: (metric: Record<string, unknown>) => void
  onOpenExternal?:       (url: string, ctx?: Record<string, unknown>) => void

  // Shadow DOM 모드 — 웹 컴포넌트나 마이크로 프론트엔드 안에 넣을 때
  shadowDom?:      boolean
  stylesheetUrl?:  string   // shadowDom: true 이면 필수
  styleNonce?:     string   // CSP nonce
})
```

#### Feature flags

아래가 기본값입니다. `false`로 끄면 UI에서 아예 사라집니다. 읽기 전용 뷰로 embed할 때 유용해요.

```ts
features: {
  view:           true,   // 기본 3D 탐색
  search:         true,   // 검색바 + 장비 하이라이트
  filter:         true,   // 상태/타입 필터 드롭다운
  deviceDetail:   true,   // 장비 선택 시 오른쪽 패널
  topologyView:   true,   // 링크 렌더링
  topologyEdit:   false,  // 링크 그리기 (Connect 모드)
  realtimeUpdate: true,   // 상태 뱃지 실시간 갱신
  savedView:      false,  // 카메라 위치 저장/복원
  layoutEdit:     false,  // 장비·공간 드래그 이동
  spaceEdit:      false,  // 공간 생성/크기 조절/삭제
  annotationEdit: false,  // 장비에 메모 달기
  import:         false,  // CSV / XLSX 임포트 패널
}
```

읽기 전용으로 embed하는 일반적인 설정:

```ts
features: {
  topologyEdit: false,
  layoutEdit:   false,
  spaceEdit:    false,
  import:       false,
}
```

#### Permission resolver

기능 단위 on/off보다 더 세밀하게 제어하고 싶으면 `permissionResolver`를 쓰면 됩니다. 모든 쓰기 액션 직전에 호출되고, `false`를 반환하면 차단 + `onPermissionDenied` 발동.

```ts
permissionResolver: ({ action, target, userContext }) => {
  if (action === "space:delete") return userContext?.role === "admin";
  if (action === "topology:createLink")
    return userContext?.canEditTopology === true;
  return true;
};
```

사용 가능한 action 값: `view`, `layout:update`, `space:create`, `space:update`, `space:delete`, `device:map`, `device:unmap`, `annotation:create`, `annotation:update`, `annotation:delete`, `topology:createLink`, `topology:updateLink`, `topology:deleteLink`, `virtualNode:create`, `virtualNode:update`, `virtualNode:delete`, `import`, `rawDevice:update`

---

### NmsEditor 메서드

`createNmsEditor`가 반환하는 객체로 에디터를 프로그래밍 방식으로 조작할 수 있어요.

```ts
// 씬에 있는 장비는 제자리에서 업데이트, 새 장비는 unmapped 목록에 추가
editor.upsertDevices(devices: RawDevice[])

// id로 장비 삭제. 연결된 링크와 device mapping도 같이 삭제됨
editor.removeDevices(ids: string[])

// 특정 장비 선택 (디테일 패널 열림). null 넘기면 선택 해제
editor.selectDevice(id: string | null)

// UI 외부에서 검색/상태/타입 필터 적용
editor.applyFilter({
  search: 'web',
  status: ['critical', 'warning'],
})

// 에디터 UI 밖에서 모드 전환
editor.setMode('edit')   // 또는 'view'

// 특정 장비 상태 조회 등
const device = editor.getDevice('device-id-123')

// 현재 레이아웃 상태를 스냅샷으로 추출 (저장용)
const snapshot = editor.exportSnapshot()
// snapshot.spaces, snapshot.deviceMappings, snapshot.manualLinks

// 이전에 저장한 레이아웃 복원
editor.importSnapshot(snapshot)

// 수동으로 저장 트리거 — onSave 콜백 호출됨
await editor.save()

// Vue 앱 언마운트 + Three.js 리소스 해제
editor.destroy()
```

### 자동 배치 (Auto layout)

아직 수동 위치가 없는 장비를 force-directed 방식으로 배치해요. 같은 space/rack에 속한 장비끼리는 서로 끌어당기고, 이미 위치가 있는 장비는 `includeMapped`를 켜지 않는 한 그대로 고정돼요. `mode: 'edit'`가 필요하고(드래그 이동과 동일하게 `layout:update` 권한으로 게이트됨).

```ts
await editor.autoLayout({
  deviceIds:     ['dev-1', 'dev-2'],  // 생략하면 전체 장비 대상
  includeMapped: false,               // true면 이미 배치된 장비도 다시 배치
  iterations:    200,
  onProgress:    (fraction) => console.log(fraction),
})

// 진행 중인 배치를 중간에 멈춤 — 그때까지 계산된 위치는 그대로 유지됨
editor.cancelAutoLayout()
```

### 백엔드 push 메서드

이 메서드들은 UI 권한 가드를 거치지 않아요 — 이미 신뢰하는 백엔드가 자기가 발견한 사실을 밀어넣는 것이지, 사용자가 UI에서 편집하는 게 아니기 때문이에요. 대신 `onChange`가 `event.source === 'api'`로 호출돼서 백엔드발 변경과 사용자발 변경을 구분할 수 있어요.

```ts
// 링크 배치 upsert/삭제 (id 기준 병합, upsertDevices와 동일한 방식)
editor.upsertLinks(links: NetworkLink[])
editor.removeLinks(ids: string[])

// 공간(space) 배치 upsert. removeSpaces는 소프트 삭제 — 실제로 지우지
// 않고 archived: true만 세팅해서, 그 밑에 매핑된 것들이 존재하지 않는
// parentId를 가리키는 일이 없게 함
editor.upsertSpaces(spaces: Space[])
editor.removeSpaces(ids: string[])

// 인터페이스(속도/트래픽/에러 등) 배치 upsert
editor.upsertInterfaces(interfaces: NetworkInterface[])

// 가상 노드(internet/cloud/external 표시용) 배치 upsert/삭제
editor.upsertVirtualNodes(nodes: VirtualNode[])
editor.removeVirtualNodes(ids: string[])

// 장비의 ack/maintenance/suppression 상태를 부분 병합 — 넘긴 필드만
// 바뀌고 operatorState의 나머지 필드는 그대로 유지됨
editor.setOperatorState(deviceId: string, patch: Partial<OperatorState>)

// 자기 transport의 연결 상태를 알림. 메뉴바의 연결 인디케이터에
// 반영됨 — topospace가 자동으로 추론하지 않음
editor.setConnectionStatus(status: 'connected' | 'reconnecting' | 'disconnected', detail?: { message?: string })

// 토스트 알림 표시 (예: 백엔드가 감지한 알람)
editor.notify(message: string, type?: 'info' | 'warning' | 'critical' | 'success')
```

---

## 백엔드 연동

topospace는 자체 수집기, 알림 엔진, DB, 인증 서버가 없어요 — 뷰/에디터 레이어일 뿐이에요. 폴링/웹소켓 등 transport와 인증은 직접 구현하고, 백엔드에 새 데이터가 생길 때마다 위 메서드들을 호출하면 됩니다. 흔한 패턴 두 가지:

**REST 폴링**

```ts
async function poll() {
  try {
    const res = await fetch('/api/topology', { headers: { Authorization: `Bearer ${token}` } })
    const { devices, links } = await res.json()
    editor.upsertDevices(devices)
    editor.upsertLinks(links)
    editor.setConnectionStatus('connected')
  } catch (err) {
    editor.setConnectionStatus('disconnected', { message: '백엔드 연결 실패' })
  }
}
setInterval(poll, 10_000)
poll()
```

**WebSocket push**

```ts
const ws = new WebSocket('wss://your-backend/topology')

ws.onopen = () => editor.setConnectionStatus('connected')
ws.onclose = () => editor.setConnectionStatus('reconnecting')
ws.onerror = () => editor.setConnectionStatus('reconnecting')

ws.onmessage = (msg) => {
  const event = JSON.parse(msg.data)
  switch (event.type) {
    case 'device.upsert':   editor.upsertDevices(event.devices); break
    case 'link.upsert':     editor.upsertLinks(event.links); break
    case 'device.ack':      editor.setOperatorState(event.deviceId, { acknowledged: true }); break
    case 'alarm':           editor.notify(event.message, event.severity); break
  }
}
```

메시지 형식(`event.type`)은 예시일 뿐이고 백엔드가 원하는 대로 정하면 돼요 — topospace는 wire format을 강제하지 않고, 파싱한 다음 호출할 메서드만 정해져 있어요.

---

### 데이터 모델

#### `RawDevice`

인프라의 물리/가상 노드를 나타냅니다. `id`, `source`, `externalId`만 필수고 나머지는 다 선택.

```ts
{
  id:           string          // 내부 ID — selectDevice()에 이걸 넘김
  source:       string          // 출처 (예: 'zabbix', 'netbox', 'manual')
  externalId:   string          // 소스 시스템의 ID
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
  externalUrl?: string          // "소스에서 열기" 클릭 시 onOpenExternal로 전달
  metadata?:    Record<string, unknown>
}
```

#### `NetworkLink`

```ts
{
  id:             string
  sourceDeviceId: string
  targetDeviceId: string
  type:           EdgeType      // physical | logical | service_dependency
                                // | traffic_flow | security_path | manual | inferred
  status?:        'up' | 'down' | 'unknown'
  bandwidth?:     number        // bits/s — hover 시 표시
  label?:         string
  source:         'discovered' | 'manual' | 'cmdb' | 'inferred' | 'import'
  confidence?:    'high' | 'medium' | 'low'
}
```

#### `Space`

시각적 그룹 컨테이너 — 사이트, 구역, 랙 등.

```ts
{
  id:       string
  name:     string
  type:     SpaceType    // site | zone | rack | custom_group
                         // | security_zone | service | external | cloud
  kind:     'physical' | 'logical' | 'virtual'
  source:   'manual' | 'api' | 'cmdb' | 'import'
  position?: Vector3Like  // { x, y, z } — Three.js 월드 좌표
  size?:     Size3D       // { width, height, depth }
  color?:    string       // hex, rack이 아닌 타입에서 기본 팔레트 대신 사용
  parentId?: string       // 중첩 공간 (사이트 안의 구역 등)
  archived?: boolean
}
```

#### `EditorSnapshot`

`exportSnapshot`이 반환하고 `importSnapshot`이 받는 형식. DB에 저장하든, JSON으로 내보내든, 변경 감사용으로 diff하든 마음대로.

```ts
{
  version:        string         // 스냅샷 포맷의 semver
  timestamp:      string         // ISO 8601
  spaces:         Space[]
  deviceMappings: DeviceMapping[]
  manualLinks:    NetworkLink[]  // data.links가 아닌, 에디터에서 직접 추가한 링크
}
```

---

### 키보드 단축키

| 키                  | 동작                                                |
| ------------------- | --------------------------------------------------- |
| `F`                 | 전체 맞춤 (매핑된 장비 전체가 보이도록 카메라 리셋) |
| `Esc`               | 선택 해제 / 현재 툴 취소                            |
| `L`                 | Connect 모드 토글                                   |
| `Del` / `Backspace` | 선택한 장비·링크·공간 삭제                          |
| `Ctrl+Z` / `Ctrl+Y` | 실행 취소 / 다시 실행                               |

---

### Shadow DOM

웹 컴포넌트나 Shadow DOM을 쓰는 마이크로 프론트엔드 안에 넣을 때는 `shadowDom: true`와 스타일시트 URL을 같이 넘겨주세요. 에디터가 메인 document 대신 컨테이너에 shadow root를 붙입니다.

```ts
createNmsEditor({
  container: this.shadowRoot!.querySelector("#map")!,
  shadowDom: true,
  stylesheetUrl: new URL("topospace/styles", import.meta.url).href,
});
```

---

### CSV / XLSX 임포트 형식

`features.import`가 켜져 있으면 스프레드시트로 장비를 임포트할 수 있어요. 컬럼 순서는 상관없고 이름은 대소문자 무시.

| 컬럼       | 필수 | 비고                                         |
| ---------- | ---- | -------------------------------------------- |
| `hostname` | ✓    |                                              |
| `type`     | ✓    | 별칭 허용: `srv`, `sw`, `fw`, `rtr`, `db`, … |
| `ip`       |      |                                              |
| `vendor`   |      |                                              |
| `site`     |      | 없으면 자동으로 Space 생성                   |
| `zone`     |      |                                              |
| `rack`     |      |                                              |
| `status`   |      | `normal`, `warning`, `critical`, `offline`   |
| `uplink`   |      | 링크 연결할 장비의 `hostname`                |

---

### 개발

```bash
git clone https://github.com/cheonghakim/topo-space
cd topo-space
npm install

npm run dev          # 핫 리로드 개발 서버
npm run build        # 라이브러리 빌드 (dist/)
npm run build:demo   # GitHub Pages 데모 빌드 (demo-dist/)
npm run test:unit    # vitest
npm run test:e2e     # playwright (개발 서버 자동 시작)
npm run docs:api     # TypeDoc → docs/api/
```
