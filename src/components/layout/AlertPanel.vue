<template>
  <aside class="alert-panel" :style="paletteStyle" aria-label="Alerts">
    <div class="ap-sticky">
      <div class="ap-head">
        <span class="ap-title">Alerts</span>
        <span class="ap-count" :class="totalClass">{{ total }}</span>
        <button
          class="ap-close"
          title="Close"
          aria-label="Close alerts"
          @click="ui.closeLeftDock()"
        >
          ×
        </button>
      </div>
      <div class="ap-filters" role="group" aria-label="Alert severity">
        <button :aria-pressed="severity === null" @click="severity = null">
          All
        </button>
        <button
          v-for="status in severities"
          :key="status"
          :class="status"
          :aria-pressed="severity === status"
          @click="severity = status"
        >
          <span aria-hidden="true">{{ STATUS_ICON[status] }}</span>
          {{ STATUS_LABEL[status] }} <b>{{ severityCounts[status] }}</b>
        </button>
      </div>
      <p class="ap-scope">
        All sites · {{ visibleCount }} devices · highest severity first
      </p>
    </div>
    <div v-if="!groups.length" class="ap-empty">
      {{
        severity
          ? "No " + STATUS_LABEL[severity].toLowerCase() + " alerts"
          : "No active alerts"
      }}
    </div>
    <div v-for="g in groups" :key="g.spaceId" class="ap-group">
      <button
        class="ap-group-header"
        :title="g.spaceName"
        @click="onGroupClick(g)"
      >
        <span class="ap-group-name">{{ g.spaceName }}</span>
        <span class="ap-group-count"
          >{{ g.devices.length }} devices
          <span aria-hidden="true">↗</span></span
        >
      </button>
      <div class="ap-device-list">
        <button
          v-for="d in g.devices"
          :key="d.id"
          class="ap-device"
          :class="[d.status, { selected: ui.selectedDeviceId === d.id }]"
          :aria-pressed="ui.selectedDeviceId === d.id"
          :title="
            [d.hostname, d.ip, STATUS_LABEL[d.status ?? 'unknown']]
              .filter(Boolean)
              .join(' · ')
          "
          @click="onDeviceClick(d.id)"
        >
          <span class="ap-severity-icon" aria-hidden="true">{{
            STATUS_ICON[d.status ?? "unknown"]
          }}</span>
          <span class="ap-device-info">
            <span class="ap-dev-name">{{ d.hostname ?? d.ip ?? d.id }}</span>
            <span class="ap-device-meta"
              >{{ d.ip || "No IP address"
              }}<span v-if="assigneeFor(d.id)">
                · {{ assigneeFor(d.id) }}</span
              ></span
            >
          </span>
          <span class="ap-status-label">{{
            STATUS_LABEL[d.status ?? "unknown"]
          }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUIStore } from "@/stores/ui";
import { useEditorStore } from "@/stores/editor";
import { useNmsEditor } from "@/composables/useNmsEditor";
import {
  STATUS_LABEL,
  STATUS_ICON,
  STATUS_COLOR_HEX,
} from "@/utils/colorUtils";
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

const allGroups = computed<AlertGroup[]>(() => {
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

const severity = ref<DeviceStatus | null>(null);
const severities: DeviceStatus[] = ["critical", "warning", "offline"];
const paletteStyle = computed(() =>
  Object.fromEntries(
    severities.map((status) => ["--" + status, STATUS_COLOR_HEX[status]]),
  ),
);
const severityCounts = computed(() => {
  const counts: Record<string, number> = {
    critical: 0,
    warning: 0,
    offline: 0,
  };
  for (const group of allGroups.value)
    for (const device of group.devices) counts[device.status ?? "offline"]!++;
  return counts;
});
const groups = computed(() =>
  allGroups.value
    .map((group) => ({
      ...group,
      devices: group.devices.filter(
        (device) => !severity.value || device.status === severity.value,
      ),
    }))
    .filter((group) => group.devices.length),
);
const visibleCount = computed(() =>
  groups.value.reduce((sum, group) => sum + group.devices.length, 0),
);
const total = computed(() =>
  allGroups.value.reduce((s, g) => s + g.devices.length, 0),
);
const totalClass = computed(() => {
  if (allGroups.value.some((g) => g.criticalCount)) return "critical";
  if (allGroups.value.some((g) => g.warningCount)) return "warning";
  if (allGroups.value.some((g) => g.offlineCount)) return "offline";
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
  width: 264px;
  display: flex;
  flex-direction: column;
  background: #0b1220;
  border-right: 1px solid #23334a;
  color: #cbd5e1;
  font-size: 11px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  scrollbar-width: thin;
  scrollbar-color: #1a2a4a transparent;
}
.ap-sticky {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #0b1220fa;
  border-bottom: 1px solid #23334a;
}
.ap-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}
.ap-title {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: #f1f5f9;
}
.ap-count {
  padding: 2px 7px;
  border: 1px solid currentColor;
  border-radius: 6px;
  font-weight: 700;
}
.ap-close {
  border: 0;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 20px;
  width: 28px;
  height: 28px;
}
.ap-filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  padding: 0 12px;
}
.ap-filters button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 8px;
  border: 1px solid #30445f;
  border-radius: 6px;
  background: #132033;
  color: #b4c5dc;
  font: inherit;
  cursor: pointer;
}
.ap-filters button b {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}
.ap-filters button[aria-pressed="true"] {
  border-color: currentColor;
  background: #263a54;
  font-weight: 700;
}
.ap-scope {
  color: #94a3b8;
  margin: 9px 12px 10px;
  font-size: 9px;
}
.ap-empty {
  padding: 24px 12px;
  text-align: center;
  color: #94a3b8;
}
.ap-group {
  padding-bottom: 6px;
  border-bottom: 1px solid #1b2a3e;
}
.ap-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: #152034;
  border: 0;
  color: #a9bcd4;
  text-align: left;
  cursor: pointer;
}
.ap-group-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 11px;
}
.ap-group-count {
  flex-shrink: 0;
  font-size: 9px;
  color: #90a5c0;
}
.ap-device {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  padding: 8px 10px;
  border: 0;
  border-left: 3px solid transparent;
  background: none;
  color: #cbd5e1;
  text-align: left;
  cursor: pointer;
}
.ap-device.critical {
  border-left-color: var(--critical);
  background: color-mix(in srgb, var(--critical) 5%, transparent);
}
.ap-device:hover,
.ap-group-header:hover {
  background: #1e3048;
}
.ap-device.selected {
  background: #213c59;
  box-shadow: inset 0 0 0 1px #7dd3fc;
}
.ap-device-info {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 4px;
}
.ap-dev-name {
  color: #dce7f5;
  font: 11px monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.critical .ap-dev-name {
  font-weight: 700;
  color: #fff;
}
.ap-device-meta {
  color: #8fa4bf;
  font: 9px monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ap-severity-icon {
  width: 20px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 5px;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
}
.ap-status-label {
  font-size: 9px;
  flex-shrink: 0;
}
.critical,
.ap-filters .critical {
  color: var(--critical);
}
.warning,
.ap-filters .warning {
  color: var(--warning);
}
.offline,
.ap-filters .offline {
  color: var(--offline);
}
button:focus-visible {
  outline: 2px solid #7dd3fc;
  outline-offset: -2px;
}
</style>
