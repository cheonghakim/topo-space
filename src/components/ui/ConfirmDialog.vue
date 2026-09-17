<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div
        v-if="ui.confirmDialog"
        class="confirm-overlay"
        @click.self="ui.resolveConfirm(false)"
        @keydown.escape="ui.resolveConfirm(false)"
      >
        <div class="confirm-modal" role="alertdialog" aria-modal="true">
          <p class="confirm-message">{{ ui.confirmDialog.message }}</p>
          <div class="confirm-actions">
            <button class="confirm-btn cancel" @click="ui.resolveConfirm(false)">
              Cancel
            </button>
            <button
              ref="confirmBtn"
              class="confirm-btn danger"
              @click="ui.resolveConfirm(true)"
            >
              {{ ui.confirmDialog.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();
const confirmBtn = ref<HTMLButtonElement | null>(null);

// Keyboard-only users land the focus ring on Cancel by default (the safer
// action for a destructive prompt) — but the Delete key that got them here
// almost always means they want to confirm, so the danger button still gets
// real focus for a fast Enter-to-confirm.
watch(
  () => ui.confirmDialog,
  (dialog) => {
    if (dialog) nextTick(() => confirmBtn.value?.focus());
  },
);
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9600;
  background: rgba(4, 7, 14, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-modal {
  width: 360px;
  max-width: 90vw;
  background: #0b1020;
  border: 1px solid #2a4a8a;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.confirm-message {
  margin: 0 0 18px;
  color: #e2e8f0;
  font-size: 13px;
  line-height: 1.5;
}
.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.confirm-btn {
  border-radius: 6px;
  padding: 7px 14px;
  font-size: 12px;
  cursor: pointer;
  font: inherit;
}
.confirm-btn.cancel {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #cbd5e1;
}
.confirm-btn.cancel:hover {
  border-color: #3b82f6;
}
.confirm-btn.danger {
  background: #7f1d1d;
  border: 1px solid #dc2626;
  color: #fecaca;
}
.confirm-btn.danger:hover {
  background: #991b1b;
}
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.12s;
}
.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}
</style>
