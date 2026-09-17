/// <reference lib="dom" />
import { expect, test } from "@playwright/test";

// The product tour auto-starts once per fresh browser profile (tracked via
// localStorage) and blocks the rest of the page until dismissed — seed the
// "already seen" flag before each test so it doesn't interfere with these
// editor-focused smoke tests.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("topospace.tourSeen", "1"),
  );
});

test("renders the editor shell and keeps edit-only controls out of view mode", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("button", { name: "View", exact: true }),
  ).toHaveClass(/active/);
  await expect(page.getByRole("button", { name: "Connect" })).toBeDisabled();
  await expect(page.getByText("View mode - click to inspect -")).toBeVisible();
});

test("resizes canvas after the left panel is closed", async ({ page }) => {
  await page.goto("/");

  const canvas = page.locator(".scene-wrap > canvas");
  const before = await canvas.boundingBox();
  await page.getByTitle("Close").first().click();
  await page.waitForTimeout(150);
  const after = await canvas.boundingBox();

  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(after!.width).toBeGreaterThan(before!.width);
});

test("offers camera navigation and an accessible controls guide", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Camera controls" });
  await expect(
    navigation.getByRole("button", { name: "Focus selected" }),
  ).toBeDisabled();
  const guide = navigation.getByRole("button", { name: "Controls guide" });
  await guide.click();
  await expect(guide).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Left-drag empty space")).toBeVisible();
  await navigation
    .getByRole("button", { name: "Top view", exact: true })
    .click();
  await navigation
    .getByRole("button", { name: "Zoom in", exact: true })
    .click();
  await navigation
    .getByRole("button", { name: "Zoom out", exact: true })
    .click();
  await navigation
    .getByRole("button", { name: "3D view", exact: true })
    .click();
  await navigation
    .getByRole("button", { name: "Reset view", exact: true })
    .click();
  await guide.click();
  await expect(page.locator("#navigation-help")).toBeHidden();
  expect(errors).toEqual([]);
});

test("makes search matches visually prominent", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search name / IP").fill("swi");

  await expect(page.locator(".device-search-label").first()).toBeVisible();
});

test("offers a visible camera reset control that does not error", async ({
  page,
}) => {
  await page.goto("/");

  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.getByRole("button", { name: "⌂ Home", exact: true }).click();
  await page.waitForTimeout(200);

  expect(errors).toEqual([]);
});

test("toggling the colorblind-safe palette recolors the scene without erroring", async ({
  page,
}) => {
  await page.goto("/");

  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.getByText("Preferences").click();
  await page.getByText("Colorblind-safe palette").click();
  await page.waitForTimeout(200);

  expect(errors).toEqual([]);

  // Toggling back should also be error-free (recolorAll runs a second time).
  await page.getByText("Preferences").click();
  await page.getByText("Colorblind-safe palette").click();
  await page.waitForTimeout(200);

  expect(errors).toEqual([]);
});

test("explains status icons and updates the visible palette and alerts together", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const legend = page.getByRole("region", { name: "Status legend" });
  await expect(legend.locator('[data-status="critical"]')).toContainText(
    "Critical",
  );
  await expect(legend.locator('[data-status="unknown"]')).toContainText("?");
  const criticalIcon = legend.locator('[data-status="critical"] .legend-icon');
  const before = await criticalIcon.evaluate(
    (el) => getComputedStyle(el).color,
  );
  const toggle = legend.getByRole("button", {
    name: "Standard palette",
    exact: true,
  });
  await toggle.click();
  await expect(
    legend.getByRole("button", { name: "Colorblind palette on" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(() => criticalIcon.evaluate((el) => getComputedStyle(el).color))
    .not.toBe(before);
  const color = await criticalIcon.evaluate((el) => getComputedStyle(el).color);
  await expect(page.locator(".ap-filters .critical")).toHaveCSS("color", color);
  await legend.getByRole("button", { name: "Colorblind palette on" }).click();
  await expect(criticalIcon).toHaveCSS("color", before);
});

test("fits the SDK into its host container and can be destroyed", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    const root = document.querySelector("#app") as HTMLElement & {
      __vue_app__?: { unmount(): void };
    };
    root.__vue_app__?.unmount();
    const host = document.createElement("div");
    host.id = "sdk-host";
    host.style.cssText = "width:1100px;height:560px;";
    root.appendChild(host);
    const moduleUrl = "/src/index.ts";
    const { createNmsEditor } = await import(/* @vite-ignore */ moduleUrl);
    const sdk = createNmsEditor({
      container: host,
      mockData: false,
      data: { devices: [], spaces: [] },
    });
    (window as unknown as { disposeNms: () => void }).disposeNms = () =>
      sdk.destroy();
  });
  const host = page.locator("#sdk-host");
  await expect(host.locator(".scene-wrap")).toBeVisible();
  const shell = await host.locator(".app").boundingBox();
  expect(shell!.height).toBe(560);
  expect(shell!.width).toBe(1100);
  await expect(
    host.getByRole("button", { name: /Status legend/ }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.evaluate(() =>
    (window as unknown as { disposeNms: () => void }).disposeNms(),
  );
  await expect(host.locator("canvas")).toHaveCount(0);
});

test("filters alerts by severity and keeps selection available", async ({
  page,
}) => {
  await page.goto("/");
  const panel = page.getByRole("complementary", {
    name: "Alerts",
    exact: true,
  });
  await panel
    .getByRole("group", { name: "Alert severity" })
    .getByRole("button", { name: /Critical/ })
    .click();
  await expect(panel.locator(".ap-device.critical").first()).toBeVisible();
  await expect(
    panel.locator(".ap-device.warning, .ap-device.offline"),
  ).toHaveCount(0);
  const first = panel.locator(".ap-device.critical").first();
  await first.click();
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("button", { name: "Focus selected" }),
  ).toBeEnabled();
});

test("keeps visible rack names inside the viewport and prevents name collisions", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Top view", "3D view"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await page.waitForTimeout(800);
    const result = await page.evaluate(() => {
      const canvas = document
        .querySelector(".scene-wrap")!
        .getBoundingClientRect();
      const labels = Array.from(document.querySelectorAll(".space-badge"))
        .filter(
          (el) =>
            getComputedStyle(el).visibility !== "hidden" &&
            getComputedStyle(el).display !== "none",
        )
        .map((el) => el.getBoundingClientRect())
        .filter((rect) => rect.width > 0);
      let overlaps = 0;
      for (let i = 0; i < labels.length; i++)
        for (let j = i + 1; j < labels.length; j++) {
          const a = labels[i]!,
            b = labels[j]!;
          if (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
          )
            overlaps++;
        }
      return {
        count: labels.length,
        overlaps,
        clipped: labels.some(
          (r) =>
            r.left < canvas.left ||
            r.right > canvas.right ||
            r.top < canvas.top ||
            r.bottom > canvas.bottom,
        ),
      };
    });
    expect(result.count).toBeGreaterThan(0);
    expect(result.overlaps).toBe(0);
    expect(result.clipped).toBe(false);
  }
});

test("alerts-only view hides normal devices from the search-match set", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByText("🔔 Alerts only").click();
  await page.waitForTimeout(200);

  // At least one alarm exists in the mock dataset, so the label layer should
  // be populated the same way a text search would populate it.
  await expect(page.locator(".device-search-label").first()).toBeVisible();
});

test("does not leave stale rack labels after CSV replace import", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Edit" }).click();

  const before = await page.locator(".space-badge").count();
  await page.getByText("File").click();
  await page.getByText("Import devices").click();

  const csv = [
    "hostname,ip,type,vendor,site,zone,rack,status,uplink",
    "edge-fw,10.0.0.1,firewall,Palo Alto,Imported,Edge,Rack-A,normal,",
    "edge-sw,10.0.0.2,switch,Cisco,Imported,Edge,Rack-A,normal,edge-fw",
  ].join("\n");

  await page.locator('input[type="file"]').setInputFiles({
    name: "topospace-import.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(csv),
  });
  await page.getByLabel("Replace current scene").check();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Import 2 devices/ }).click();
  await expect(page.getByText("Import Devices & Topology")).toBeHidden();

  const after = await page.locator(".space-badge").count();
  expect(after).toBeLessThan(before);
  await expect(page.locator(".space-badge", { hasText: "Rack-A" })).toHaveCount(
    0,
  );
  await expect(
    page.locator(".space-badge", { hasText: "Imported" }),
  ).toHaveCount(1);
});
