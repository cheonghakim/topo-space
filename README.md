# topospace

A 3D infrastructure topology editor for network/server visualization, built with Vue 3, TypeScript, Vite and Three.js. Devices, spaces (site / zone / rack), and links are rendered in a 3D scene that you can navigate, edit, and monitor in real time.

3D 인프라 토폴로지 에디터입니다. Vue 3, TypeScript, Vite, Three.js로 만들었으며 장비, 공간(사이트 / 존 / 랙), 링크를 3D 장면에 표시하고 탐색·편집·실시간 모니터링할 수 있습니다.

---

## English

### Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

### What you can do

- **Navigate** – drag empty space to orbit the camera, scroll to zoom, press `F` to fit the whole scene.
- **Inspect** – click a device to open its detail panel (metrics, interfaces, events); click a rack to list its devices on the left.
- **Search & filter** – filter by name, IP, or status from the top bar. Matching devices stay bright while others dim.
- **Edit layout** – select a device or space and drag the X (red) / Y (green) / Z (blue) gizmo arrows to move it. Moving a space carries its devices and links along.
- **Connect** – click **Connect** (or press `L`), then drag from one device to another and choose a link type. Select a link and drag its handle to reroute (orthogonal path).
- **Monitor live** – toggle **Live** to run the update simulator. Status changes flash on the affected device (red = fault, green = recovery, yellow = warning).
- **Timeline** – record status over time and replay it with the slider. Export/import the layout as JSON.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `F` | Fit view (reset camera) |
| `ESC` | Clear selection / cancel current tool |
| `L` | Toggle Connect mode |
| `Del` / `Backspace` | Delete the selected device / link / space |
| `Ctrl+Z` / `Ctrl+Y` | Undo / Redo |

Full in-app help is available from the **Help** button in the top bar (EN / KO).

### Project structure

```
src/
  components/      Vue UI (toolbar, panels, overlays)
  composables/     useNmsEditor (scene wiring), useWebSocketSim
  core/            PermissionGuard, ChangeManager, TimelineManager
  interaction/     Raycast, gizmo, drag, camera controllers
  renderers/       Three.js renderers (devices, spaces, links, particles, ...)
  stores/          Pinia stores (editor data, UI state)
  utils/           mock data, geometry factory, color maps
  types/           shared TypeScript types
```

The data model separates **source data** (devices, links — read-only) from the **presentation layer** (mappings, spaces, annotations) so it can be wired to an external system later.

---

## 한국어

### 시작하기

```bash
npm install
npm run dev      # 개발 서버 실행 (http://localhost:5173)
npm run build    # 타입 체크 후 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

### 주요 기능

- **탐색** – 빈 공간을 드래그하면 카메라가 회전하고, 휠로 확대/축소, `F` 키로 전체 보기로 돌아갑니다.
- **조회** – 장비를 클릭하면 우측에 상세 패널(메트릭·인터페이스·이벤트)이 열리고, 랙을 클릭하면 좌측에 해당 랙의 장비 목록이 나옵니다.
- **검색·필터** – 상단 바에서 이름·IP·상태로 필터링합니다. 일치하는 장비는 밝게, 나머지는 흐리게 표시됩니다.
- **레이아웃 편집** – 장비나 공간을 선택하면 X(빨강)/Y(초록)/Z(파랑) 화살표가 나타나며, 드래그해서 이동합니다. 공간을 옮기면 하위 장비와 링크가 함께 따라옵니다.
- **링크 연결** – **Connect** 버튼(또는 `L` 키) 후 한 장비에서 다른 장비로 드래그하고 링크 타입을 고릅니다. 링크를 선택해 핸들을 드래그하면 경로(직각 라우팅)를 바꿀 수 있습니다.
- **실시간 모니터링** – **Live** 를 켜면 업데이트 시뮬레이터가 동작합니다. 상태가 바뀐 장비 위에 효과가 표시됩니다(빨강=장애, 초록=복구, 노랑=경고).
- **타임라인** – 상태 변화를 녹화하고 슬라이더로 재생합니다. 레이아웃은 JSON으로 내보내기/가져오기가 됩니다.

### 단축키

| 키 | 동작 |
| --- | --- |
| `F` | 전체 보기 (카메라 리셋) |
| `ESC` | 선택 해제 / 현재 도구 취소 |
| `L` | 연결(Connect) 모드 토글 |
| `Del` / `Backspace` | 선택한 장비 / 링크 / 공간 삭제 |
| `Ctrl+Z` / `Ctrl+Y` | 실행 취소 / 다시 실행 |

상단 바의 **Help** 버튼에서 앱 내 도움말(한/영)을 볼 수 있습니다.

### 폴더 구조

```
src/
  components/      Vue UI (툴바, 패널, 오버레이)
  composables/     useNmsEditor (씬 연결), useWebSocketSim
  core/            PermissionGuard, ChangeManager, TimelineManager
  interaction/     레이캐스트, 기즈모, 드래그, 카메라 컨트롤러
  renderers/       Three.js 렌더러 (장비, 공간, 링크, 파티클 등)
  stores/          Pinia 스토어 (에디터 데이터, UI 상태)
  utils/           목업 데이터, 지오메트리 팩토리, 색상 맵
  types/           공용 TypeScript 타입
```

데이터 모델은 **원본 데이터**(장비·링크, 읽기 전용)와 **표현 레이어**(매핑·공간·주석)를 분리해 두어, 추후 외부 시스템과 연동하기 쉽도록 설계했습니다.
