# Enterprise Readiness Notes

This document tracks the current SDK hardening status for `topospace`.

## Implemented

- `createNmsEditor(options)` SDK entry point with ESM/CJS library build.
- Per Vue app / Pinia instance editor runtime. Multiple host embeds no longer share scene, renderer, watcher, timeline, or gizmo state through module globals.
- Host-provided `permissionResolver`, `onChange`, `onSave`, `onError`, `onPermissionDenied`, and `onPerformanceWarning` hooks.
- View mode editing lockout across gizmo, keyboard delete, connect mode, import, space editing, link editing, virtual node editing, and unmapped device placement.
- Optional `shadowDom` mount mode. When using it, pass `stylesheetUrl` so the ShadowRoot can load `topospace.css`.
- WebGL context lost/restored callback path through `onError`.
- Wrapper resize observer for synchronized WebGL and CSS2D overlay resizing.
- Unit tests for CSV parsing, permission guard behavior, and RawDevice readonly access.

## Remaining Before Enterprise Release

- Full Playwright coverage for import, view/edit mode lockout, resize behavior, and multi-instance rendering.
- Real large-scene benchmarks for 1k/5k/10k devices with trace artifacts.
- BVH or GPU picking for high-volume hover/raycast performance.
- LOD and label policy so CSS2D labels are limited to selected, faulted, or zoomed-in entities.
- Dependency replacement or mitigation for the remaining `exceljs -> uuid` moderate advisory.
- Generated API docs should be published from `npm run docs:api` in CI.
- ShadowDOM styling should be verified in a host sandbox with CSP and iframe constraints.
