<template>
  <aside class="alert-panel">
    <div class="ap-head">
      <span class="ap-title">Alerts</span>
      <span class="ap-count" :class="totalClass">{{ total }}</span>
      <button class="ap-close" @click="ui.closeLeftDock()" title="Close">
        ✕
      </button>
    </div>

    <div v-if="!groups.length" class="ap-empty">No active alerts</div>

    <div v-for="g in groups" :key="g.spaceId" class="ap-group">
      <button class="ap-group-header" @click="onGroupClick(g)">
        <span class="ap-group-name">{{ g.spaceName }}</span>
        <span class="ap-group-badges">
          <span v-if="g.criticalCount" class="badge critical">{{
            g.criticalCount
          }}</span>
          <span v-if="g.warningCount" class="badge warning">{{
            g.warningCount
          }}</span>
          <span v-if="g.offlineCount" class="badge offline">{{
            g.offlineCount
          }}</span>
        </span>
      </button>

      <div class="ap-device-list">
        <button
          v-for="d in g.devices"
          :key="d.id"
          class="ap-device"
          :class="{ selected: ui.selectedDeviceId === d.id }"
          @click="onDeviceClick(d.id)"
        >
          <span class="ap-dot" :class="d.status" />
          <span class="ap-dev-name">{{ d.hostname ?? d.ip ?? d.id }}</span>
          <span
            v-if="assigneeFor(d.id)"
            class="ap-assignee"
            :title="`Assigned to ${assigneeFor(d.id)}`"
            >👤 {{ assigneeFor(d.id) }}</span
          >
          <span class="ap-status-label" :class="d.status">{{
            STATUS_LABEL[d.status ?? "unknown"]
          }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUIStore } from "@/stores/ui";
import { useEditorStore } from "@/stores/editor";
import { useNmsEditor } from "@/composables/useNmsEditor";
import { STATUS_LABEL } from "@/utils/colorUtils";
import type { DeviceStatus } from "@/types";

const ALERT_STATUSES = new Set<DeviceStatus>([
  "critical",
  "warning",
  "offline",
]);
const STATUS_RANK: Record<string, number> = {
  critical: 0,
  warning: 1,
  offline: 2,
};

const ui = useUIStore();
const editor = useEditorStore();
const { focusDevice, focusSpace } = useNmsEditor();

interface AlertGroup {
  spaceId: string;
  spaceName: string;
  criticalCount: number;
  warningCount: number;
  offlineCount: number;
  devices: {
    id: string;
    hostname?: string;
    ip?: string;
    status?: DeviceStatus;
  }[];
}

const groups = computed<AlertGroup[]>(() => {
  const result: AlertGroup[] = [];

  editor.spaces.forEach((sp, spaceId) => {
    if (sp.archived) return;
    const devs = (editor.devicesBySpace.get(spaceId) ?? []).filter((d) =>
      ALERT_STATUSES.has(d.status as DeviceStatus),
    );
    if (!devs.length) return;

    devs.sort(
      (a, b) =>
        (STATUS_RANK[a.status ?? ""] ?? 9) - (STATUS_RANK[b.status ?? ""] ?? 9),
    );

    result.push({
      spaceId,
      spaceName: sp.name,
      criticalCount: devs.filter((d) => d.status === "critical").length,
      warningCount: devs.filter((d) => d.status === "warning").length,
      offlineCount: devs.filter((d) => d.status === "offline").length,
      devices: devs,
    });
  });

  // ungrouped alert devices
  const groupedIds = new Set(result.flatMap((g) => g.devices.map((d) => d.id)));
  const ungrouped = [...editor.devices.values()].filter(
    (d) =>
      ALERT_STATUSES.has(d.status as DeviceStatus) && !groupedIds.has(d.id),
  );
  if (ungrouped.length) {
    ungrouped.sort(
      (a, b) =>
        (STATUS_RANK[a.status ?? ""] ?? 9) - (STATUS_RANK[b.status ?? ""] ?? 9),
    );
    result.push({
      spaceId: "__ungrouped__",
      spaceName: "Ungrouped",
      criticalCount: ungrouped.filter((d) => d.status === "critical").length,
      warningCount: ungrouped.filter((d) => d.status === "warning").length,
      offlineCount: ungrouped.filter((d) => d.status === "offline").length,
      devices: ungrouped,
    });
  }

  result.sort(
    (a, b) =>
      b.criticalCount - a.criticalCount || b.warningCount - a.warningCount,
  );
  return result;
});

const total = computed(() =>
  groups.value.reduce((s, g) => s + g.devices.length, 0),
);
const totalClass = computed(() => {
  if (groups.value.some((g) => g.criticalCount)) return "critical";
  if (groups.value.some((g) => g.warningCount)) return "warning";
  if (groups.value.some((g) => g.offlineCount)) return "offline";
  return "";
});

function assigneeFor(id: string): string | undefined {
  return editor.getMappingByDeviceId(id)?.operatorState?.assignedTo;
}

function onDeviceClick(id: string) {
  ui.select({ type: "device", id });
  focusDevice(id);
}

function onGroupClick(g: AlertGroup) {
  if (g.spaceId === "__ungrouped__") return;
  ui.select({ type: "space", id: g.spaceId });
  focusSpace(g.spaceId);
}
</script>

<style scoped>
.alert-panel {
  width: 240px;
  display: flex;
  flex-direction: column;
  background: rgba(8, 12, 24, 0.97);
  border-right: 1px solid #1a2a4a;
  font-size: 11px;
  color: #cbd5e1;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  scrollbar-width: thin;
  scrollbar-color: #1a2a4a transparent;
}

.ap-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px 6px;
  border-bottom: 1px solid #1a2a4a;
  flex-shrink: 0;
}
.ap-title {
  font-weight: 700;
  font-size: 11px;
  color: #e2e8f0;
  flex: 1;
}
.ap-count {
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 8px;
  background: #1e293b;
  color: #94a3b8;
}
.ap-count.critical {
  background: rgba(239, 68, 68, 0.18);
  color: #f87171;
}
.ap-count.warning {
  background: rgba(234, 179, 8, 0.18);
  color: #fbbf24;
}
.ap-count.offline {
  background: rgba(55, 65, 81, 0.35);
  color: #9ca3af;
}
.ap-close {
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  padding: 0 2px;
  font-size: 11px;
  line-height: 1;
}
.ap-close:hover {
  color: #e2e8f0;
}

.ap-empty {
  padding: 18px 12px;
  color: #4b5563;
  text-align: center;
}

.ap-group {
  border-bottom: 1px solid #111827;
}

.ap-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 5px 10px;
  background: rgba(30, 41, 59, 0.5);
  border: none;
  cursor: pointer;
  text-align: left;
  color: #94a3b8;
}
.ap-group-header:hover {
  background: rgba(30, 41, 59, 0.9);
  color: #e2e8f0;
}
.ap-group-name {
  flex: 1;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ap-group-badges {
  display: flex;
  gap: 3px;
}
.badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 6px;
}
.badge.critical {
  background: rgba(239, 68, 68, 0.25);
  color: #f87171;
}
.badge.warning {
  background: rgba(234, 179, 8, 0.25);
  color: #fbbf24;
}
.badge.offline {
  background: rgba(55, 65, 81, 0.4);
  color: #9ca3af;
}

.ap-device-list {
  padding: 2px 0 4px;
}

.ap-device {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 4px 10px 4px 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  text-align: left;
}
.ap-device:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
}
.ap-device.selected {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
}

.ap-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ap-dot.critical {
  background: #ef4444;
  box-shadow: 0 0 4px #ef4444;
}
.ap-dot.warning {
  background: #eab308;
  box-shadow: 0 0 4px #eab308;
}
.ap-dot.offline {
  background: #374151;
}

.ap-dev-name {
  flex: 1;
  font-family: monospace;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ap-assignee {
  font-size: 9px;
  color: #93c5fd;
  flex-shrink: 0;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ap-status-label {
  font-size: 9px;
  flex-shrink: 0;
}
.ap-status-label.critical {
  color: #f87171;
}
.ap-status-label.warning {
  color: #fbbf24;
}
.ap-status-label.offline {
  color: #6b7280;
}
</style>
