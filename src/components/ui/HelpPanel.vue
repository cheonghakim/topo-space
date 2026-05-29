<template>
  <Teleport to="body">
    <Transition name="help-fade">
      <div v-if="ui.showHelp" class="help-overlay" @click.self="ui.showHelp = false">
        <div class="help-modal">
          <div class="help-head">
            <span class="help-title">topospace — Help</span>
            <div class="lang-switch">
              <button :class="['lang-btn', lang === 'en' ? 'on' : '']" @click="lang = 'en'">EN</button>
              <button :class="['lang-btn', lang === 'ko' ? 'on' : '']" @click="lang = 'ko'">KO</button>
            </div>
            <button class="close-btn" @click="ui.showHelp = false">Close</button>
          </div>

          <div class="help-body">
            <section v-for="sec in content[lang]" :key="sec.title" class="help-section">
              <h3>{{ sec.title }}</h3>
              <div v-for="row in sec.rows" :key="row.k" class="help-row">
                <span class="help-key">
                  <kbd v-for="k in row.k.split('+')" :key="k">{{ k }}</kbd>
                </span>
                <span class="help-desc">{{ row.v }}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const lang = ref<'en' | 'ko'>('en')

type Section = { title: string; rows: { k: string; v: string }[] }

const content: Record<'en' | 'ko', Section[]> = {
  en: [
    {
      title: 'Navigation',
      rows: [
        { k: 'Drag', v: 'Rotate the camera on empty space' },
        { k: 'Wheel', v: 'Zoom in / out' },
        { k: 'F', v: 'Fit view (reset camera)' },
        { k: 'ESC', v: 'Clear selection / cancel tool' },
      ],
    },
    {
      title: 'Selection & Inspection',
      rows: [
        { k: 'Click device', v: 'Select a device and open its detail panel' },
        { k: 'Click rack', v: 'Open the rack device list on the left' },
        { k: 'Hover', v: 'Show tooltip / highlight in 3D' },
        { k: 'Search', v: 'Filter by name or IP; matches stay bright, others dim' },
      ],
    },
    {
      title: 'Editing',
      rows: [
        { k: 'Select+Drag arrows', v: 'Move device/space along X (red) / Y (green) / Z (blue)' },
        { k: 'Drag a space', v: 'Moving a space carries its devices and links' },
        { k: 'Del', v: 'Delete selected device / link / space' },
      ],
    },
    {
      title: 'Links',
      rows: [
        { k: 'L', v: 'Toggle Connect mode' },
        { k: 'Drag device→device', v: 'Create a link, then pick its type' },
        { k: 'Click link+Drag handle', v: 'Reroute the link (orthogonal path)' },
      ],
    },
    {
      title: 'Panels',
      rows: [
        { k: 'Devices', v: 'Unmapped device queue — drag onto the scene to place' },
        { k: 'Spaces', v: 'Site / Zone / Rack tree — add, rename, archive' },
        { k: 'Views', v: 'Save and recall camera viewpoints' },
        { k: 'Log', v: 'Change history' },
        { k: 'Timeline', v: 'Record status over time and replay; import/export layout' },
        { k: 'Live', v: 'Toggle the real-time update simulator' },
      ],
    },
  ],
  ko: [
    {
      title: '화면 이동',
      rows: [
        { k: 'Drag', v: '빈 공간 드래그로 카메라 회전' },
        { k: 'Wheel', v: '확대 / 축소' },
        { k: 'F', v: '전체 보기 (카메라 리셋)' },
        { k: 'ESC', v: '선택 해제 / 도구 취소' },
      ],
    },
    {
      title: '선택과 조회',
      rows: [
        { k: 'Click device', v: '장비 선택 후 우측 상세 패널 표시' },
        { k: 'Click rack', v: '좌측에 랙 내 장비 목록 표시' },
        { k: 'Hover', v: '툴팁 표시 / 3D 강조' },
        { k: 'Search', v: '이름·IP로 필터, 일치 장비는 밝게 나머지는 흐리게' },
      ],
    },
    {
      title: '편집',
      rows: [
        { k: 'Select+Drag arrows', v: '화살표로 장비/공간 이동 X(빨강)/Y(초록)/Z(파랑)' },
        { k: 'Drag a space', v: '공간 이동 시 하위 장비와 링크가 함께 이동' },
        { k: 'Del', v: '선택한 장비 / 링크 / 공간 삭제' },
      ],
    },
    {
      title: '링크',
      rows: [
        { k: 'L', v: '연결(Connect) 모드 토글' },
        { k: 'Drag device→device', v: '링크 생성 후 타입 선택' },
        { k: 'Click link+Drag handle', v: '링크 경로 변경 (직각 라우팅)' },
      ],
    },
    {
      title: '패널',
      rows: [
        { k: 'Devices', v: '미배치 장비 큐 — 3D로 드래그하여 배치' },
        { k: 'Spaces', v: '사이트 / 존 / 랙 트리 — 추가, 이름변경, 아카이브' },
        { k: 'Views', v: '카메라 시점 저장 / 불러오기' },
        { k: 'Log', v: '변경 이력' },
        { k: 'Timeline', v: '상태 녹화 후 재생, 레이아웃 가져오기/내보내기' },
        { k: 'Live', v: '실시간 업데이트 시뮬레이터 토글' },
      ],
    },
  ],
}
</script>

<style scoped>
.help-overlay {
  position: fixed; inset: 0; z-index: 9500;
  background: rgba(4, 7, 14, 0.6); backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
}
.help-modal {
  width: 560px; max-width: 92vw; max-height: 82vh;
  background: #0b1020; border: 1px solid #2a4a8a; border-radius: 10px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.help-head {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-bottom: 1px solid #1a2a4a;
}
.help-title { color: #e2e8f0; font-weight: 700; font-size: 14px; flex: 1; }
.lang-switch { display: flex; border: 1px solid #1e3a5a; border-radius: 6px; overflow: hidden; }
.lang-btn { background: transparent; border: none; color: #64748b; padding: 4px 10px; font-size: 11px; cursor: pointer; }
.lang-btn.on { background: #1e3a5f; color: #93c5fd; }
.close-btn { background: none; border: 1px solid #1e3a5a; color: #94a3b8; padding: 4px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; }
.close-btn:hover { border-color: #3b82f6; color: #e2e8f0; }

.help-body { padding: 8px 16px 16px; overflow-y: auto; }
.help-section { margin-top: 14px; }
.help-section h3 {
  color: #60a5fa; font-size: 12px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid #14233f;
}
.help-row { display: flex; gap: 12px; padding: 4px 0; align-items: baseline; }
.help-key { flex: 0 0 180px; display: flex; gap: 3px; flex-wrap: wrap; }
.help-desc { color: #94a3b8; font-size: 12px; }
kbd {
  background: rgba(148,163,184,.16); border: 1px solid rgba(148,163,184,.32);
  border-radius: 3px; padding: 1px 6px; font-size: 10px; font-family: monospace; color: #cbd5e1;
}

.help-fade-enter-active, .help-fade-leave-active { transition: opacity .15s; }
.help-fade-enter-from, .help-fade-leave-to { opacity: 0; }
</style>
