import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const issues = [];
page.on("pageerror", (error) => issues.push(error.message));
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type()))
    issues.push(message.text());
});
const base = "http://127.0.0.1:3000";
const shot = async (name, fullPage = false) => {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage });
  console.log(`Screenshot: ${name}`);
};
try {
  await page.goto(`${base}/deck?autoplay=1`);
  for (const screen of [
    "intro",
    "overview",
    "doorway",
    "connect",
    "scan",
    "dashboard",
    "wrapped",
  ]) {
    await page.locator(`[data-screen="${screen}"]`).waitFor({ timeout: 35000 });
    if (screen === "connect") {
      await page.waitForTimeout(180);
      await shot("doorway-zoom");
    }
    await page.waitForTimeout(1000);
    await shot(screen);
  }
  assert.match(page.url(), /\/wrapped/);
  await page.goto(`${base}/demo?step=scan`);
  await page.locator('[data-screen="scan"]').waitFor();
  await page.keyboard.press("u");
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("p");
  await page.getByText("Current", { exact: true }).waitFor();
  await shot("overlays");
  await page.keyboard.press("Escape");
  await page.keyboard.press("r");
  await page.locator('[data-screen="intro"]').waitFor();
  await page.keyboard.press("ArrowRight");
  await page.locator('[data-screen="overview"]').waitFor();
  await page.keyboard.press("ArrowRight");
  await page.getByText("TODO: first point", { exact: true }).waitFor();
  assert.equal(
    await page.getByText("TODO: second point", { exact: true }).count(),
    0,
  );
  await page.keyboard.press("ArrowRight");
  await page.getByText("TODO: second point", { exact: true }).waitFor();
  await page.keyboard.press("ArrowLeft");
  assert.equal(
    await page.getByText("TODO: second point", { exact: true }).count(),
    0,
  );
  await page.keyboard.press("3");
  await page.locator('[data-screen="dashboard"]').waitFor();
  await page.getByRole("textbox").fill("r");
  await page.keyboard.press("r");
  assert.equal(await page.locator('[data-screen="dashboard"]').count(), 1);
  await page.goto(`${base}/demo?step=example`);
  await page.locator('[data-screen="example"]').waitFor();
  await page.waitForTimeout(3500);
  await shot("example", true);
  await page.locator('[data-demo-action="open-example-row"]').click();
  await page.getByRole("dialog").waitFor();
  await shot("example-drawer");
  await page.keyboard.press("Escape");
  await page.locator('[data-demo-action="example-click"]').click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  await page.getByText("TODO: beat 2", { exact: true }).waitFor();
  await page.goto(`${base}/styleguide`);
  await page.waitForTimeout(3500);
  await shot("styleguide", true);
  for (const name of [
    "Avatar",
    "Pill",
    "Counter",
    "ChatTranscript",
    "DataTable / DetailDrawer",
    "DonutChart",
  ])
    await page.getByRole("heading", { name, exact: true }).waitFor();
  await page.getByRole("button", { name: "TODO: open dialog" }).click();
  await page.getByRole("dialog").waitFor();
  await shot("styleguide-dialog");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "TODO: tooltip" }).focus();
  await page.locator('[data-slot="tooltip-content"]').waitFor();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/demo?step=dashboard`);
  await page.waitForTimeout(1200);
  await shot("demo-1440");
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    true,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${base}/demo?step=example`);
  await page.waitForTimeout(700);
  assert.ok(
    (await page.getByText("TODO: third message", { exact: true }).count()) >= 2,
  );
  await shot("example-reduced-motion");
  assert.deepEqual(issues, []);
  await writeFile(
    "screenshots/verification.json",
    JSON.stringify(
      {
        passed: true,
        consoleIssues: issues,
        viewport: "1920x1080 and 1440x900",
        checks: [
          "full autoplay",
          "keyboard",
          "bullet beats",
          "step shortcut",
          "input shortcut guard",
          "overlays",
          "row drawer",
          "example action",
          "dialog",
          "tooltip",
          "reduced motion",
        ],
      },
      null,
      2,
    ),
  );
  console.log("Browser verification passed. No console errors or warnings.");
} finally {
  if (issues.length) console.error(issues);
  await browser.close();
}
