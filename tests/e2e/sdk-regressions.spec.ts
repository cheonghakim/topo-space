/// <reference lib="dom" />
import { expect, test } from "@playwright/test";
import type { NmsEditor } from "../../src/public-api";

declare global {
  interface Window {
    sdkRegression: {
      sdk: NmsEditor;
      ui: { showOverview(): void; enterScope(id: string): void };
      errors: string[];
    };
  }
}

test("preserves backend updates and active search across campus navigation", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("topospace.tourSeen", "1"),
  );
  await page.goto("/");
  await page.evaluate(async () => {
    const root = document.querySelector("#app") as HTMLElement & {
      __vue_app__?: {
        unmount(): void;
        config: { globalProperties: { $pinia: unknown } };
      };
    };
    root.__vue_app__?.unmount();
    const moduleUrl = "/src/index.ts";
    const storeUrl = "/src/stores/ui.ts";
    const { createNmsEditor } = await import(/* @vite-ignore */ moduleUrl);
    const { useUIStore } = await import(/* @vite-ignore */ storeUrl);
    const errors: string[] = [];
    const sdk = createNmsEditor({
      container: root,
      mockData: false,
      features: { tour: false },
      onError: (error: Error) => errors.push(error.message),
      data: {
        devices: [
          {
            id: "edge",
            externalId: "edge",
            source: "test",
            hostname: "before",
            normalizedType: "router",
            status: "normal",
          },
        ],
        spaces: [
          {
            id: "site-a",
            name: "Site A",
            type: "site",
            position: { x: 0, y: 0, z: 0 },
            size: { width: 20, height: 1, depth: 20 },
          },
        ],
        deviceMappings: [
          {
            id: "map-edge",
            rawDeviceId: "edge",
            mappingStatus: "mapped",
            primarySpaceId: "site-a",
            position: { x: 0, y: 1, z: 0 },
          },
        ],
      },
    });
    window.sdkRegression = {
      sdk,
      ui: useUIStore(root.__vue_app__!.config.globalProperties.$pinia),
      errors,
    };
  });
  await expect(page.locator(".scene-wrap")).toBeVisible();
  await page.evaluate(() => {
    const { sdk } = window.sdkRegression;
    sdk.upsertDevices([
      {
        ...sdk.getDevice("edge")!,
        hostname: "after-update",
        status: "critical",
      },
    ]);
    sdk.applyFilter({ search: "after-update" });
  });
  await expect(page.locator(".device-search-label")).toHaveText("after-update");
  await page.evaluate(() => window.sdkRegression.ui.showOverview());
  await expect(page.locator(".ov-canvas")).toBeVisible();
  await page.evaluate(() => window.sdkRegression.ui.enterScope("site-a"));
  await expect(page.locator(".scene-wrap")).toBeVisible();
  expect(
    await page.evaluate(
      () => window.sdkRegression.sdk.getDevice("edge")?.hostname,
    ),
  ).toBe("after-update");
  await expect(page.locator(".device-search-label")).toHaveText("after-update");
  expect(await page.evaluate(() => window.sdkRegression.errors)).toEqual([]);
  await page.evaluate(() => window.sdkRegression.sdk.destroy());
});
