import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEditorStore } from "@/stores/editor";

type Lang = "en" | "ko";
type TourConfig = NonNullable<Parameters<typeof driver>[0]>;
type TourStep = NonNullable<TourConfig["steps"]>[number];

// Spaces of these types are navigable scopes (mirrors the definition in
// stores/editor.ts) — used only to decide whether the campus-overview step
// is relevant for this dataset.
const CONTAINER_TYPES = new Set(["building", "floor", "site"]);

const TEXT: Record<
  Lang,
  Record<
    "welcome" | "campus" | "canvas" | "mode" | "connect",
    { title: string; description: string }
  >
> = {
  en: {
    welcome: {
      title: "Welcome to Topospace",
      description:
        "A quick look at how to get around. Close anytime — replay this from Help &rarr; Take a tour.",
    },
    campus: {
      title: "Campus overview",
      description:
        "Click here to see every building and floor at a glance, with live critical/warning counts. Click a floor card to jump into it.",
    },
    canvas: {
      title: "3D scene",
      description:
        "Drag to orbit, scroll to zoom. Click a device to select it — a blue ring marks the selection — and see its details on the right.",
    },
    mode: {
      title: "View / Edit",
      description:
        "Switch to Edit to drag devices and spaces around. Undo with Ctrl+Z.",
    },
    connect: {
      title: "Connect",
      description:
        "In Edit mode, drag from one device to another to create a link.",
    },
  },
  ko: {
    welcome: {
      title: "Topospace에 오신 것을 환영합니다",
      description:
        "둘러보는 방법을 간단히 안내합니다. 언제든 닫을 수 있고, Help &rarr; Take a tour에서 다시 볼 수 있습니다.",
    },
    campus: {
      title: "캠퍼스 개요",
      description:
        "클릭하면 모든 건물과 층을 한눈에 보여주고 실시간 critical/warning 개수를 표시합니다. 층 카드를 클릭하면 바로 진입합니다.",
    },
    canvas: {
      title: "3D 씬",
      description:
        "드래그로 화면을 회전하고 스크롤로 확대·축소합니다. 장비를 클릭하면 선택되고(파란 링 표시) 오른쪽에 상세 정보가 뜹니다.",
    },
    mode: {
      title: "보기 / 편집",
      description:
        "Edit로 전환하면 장비·공간을 드래그로 옮길 수 있습니다. Ctrl+Z로 실행취소합니다.",
    },
    connect: {
      title: "연결",
      description:
        "Edit 모드에서 장비를 다른 장비로 드래그하면 링크가 생성됩니다.",
    },
  },
};

function detectLang(): Lang {
  return typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("ko")
    ? "ko"
    : "en";
}

// A pure spotlight tour: it only highlights real elements and describes what
// they do — it never drives app state (view mode, scope, selection) itself.
// Letting the user actually click things (rather than the tour doing it for
// them) is what keeps this simple and loop-free.
export function startProductTour(lang: Lang = detectLang()) {
  const editor = useEditorStore();
  const t = TEXT[lang];

  const hasHierarchy =
    editor.rootSpaces.length > 1 ||
    editor.rootSpaces.some((r) =>
      editor.childSpaces(r.id).some((c) => CONTAINER_TYPES.has(c.type)),
    );

  const steps: TourStep[] = [{ popover: t.welcome }];

  if (hasHierarchy && document.querySelector(".vs-btn")) {
    steps.push({
      element: ".vs-btn",
      popover: { ...t.campus, side: "bottom", align: "start" },
    });
  }
  if (document.querySelector(".canvas-wrap")) {
    steps.push({
      element: ".canvas-wrap",
      popover: { ...t.canvas, side: "bottom", align: "center" },
    });
  }
  if (document.querySelector(".mode-switch")) {
    steps.push({
      element: ".mode-switch",
      popover: { ...t.mode, side: "bottom", align: "end" },
    });
  }
  if (document.querySelector('[title="Connect devices (L)"]')) {
    steps.push({
      element: '[title="Connect devices (L)"]',
      popover: { ...t.connect, side: "bottom", align: "end" },
    });
  }

  const tour = driver({
    showProgress: true,
    allowClose: true,
    steps,
    onDestroyed: () => localStorage.setItem("topospace.tourSeen", "1"),
  });
  tour.drive();
}
