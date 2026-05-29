<template>
  <Teleport to="body">
    <div class="toast-stack">
      <TransitionGroup name="toast">
        <div
          v-for="t in ui.toasts"
          :key="t.id"
          :class="['toast', t.type]"
          @click="ui.removeToast(t.id)"
        >
          <span class="msg">{{ t.message }}</span>
          <span class="close">✕</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui'
const ui = useUIStore()
</script>

<style scoped>
.toast-stack {
  position: fixed;
  top: 60px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  z-index: 9000;
  pointer-events: none;
  max-width: 320px;
}
.toast {
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid #1e3a5a;
  border-left: 3px solid #3b82f6;
  border-radius: 6px;
  padding: 8px 10px 8px 12px;
  font-size: 12px;
  color: #cbd5e1;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 4px 14px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  transition: transform 0.15s ease;
}
.toast:hover { transform: translateX(-2px); }
.msg   { flex: 1; }
.close { color: #475569; font-size: 10px; }

.toast.critical { border-left-color: #ef4444; color: #fca5a5; background: rgba(69, 10, 10, 0.85); }
.toast.warning  { border-left-color: #eab308; color: #fcd34d; background: rgba(66, 32, 6, 0.85); }
.toast.success  { border-left-color: #22c55e; color: #86efac; background: rgba(5, 46, 22, 0.85); }
.toast.info     { border-left-color: #3b82f6; color: #93c5fd; }

.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from { opacity: 0; transform: translateX(40px); }
.toast-leave-to   { opacity: 0; transform: translateX(40px); }
.toast-leave-active { position: absolute; }
</style>
