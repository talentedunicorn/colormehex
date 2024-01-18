import { test, expect } from "@playwright/test";

test.describe("App.vue", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should render with form", async ({ page }) => {
    await expect(page.getByTestId("input")).toBeEmpty();
  });

  test("should convert text", async ({ page }) => {
    await page.getByTestId("input").fill("Colors");
    await expect(page.getByTestId("hexname")).toHaveText("#3EBD70");
  });

  test("should be able to copy hexName", async ({ page, browserName }) => {
    test.skip(["chromium", "Mobile Chrome"].includes(browserName)); // Flaky on chromium

    await page.getByTestId("input").fill("Colors");
    await page.getByTestId("hexname").click();
    await expect(page.getByTestId("message")).toContainText(
      "Copied to clipboard!"
    );
  });

  test("should be able to load value from url query", async ({ page }) => {
    const value = "test";
    await page.goto(`/?text=${value}`);
    await expect(page.getByTestId("input")).toHaveValue(value);
  });

  test("should load birthday mode from query and decode encoded values", async ({
    page,
  }) => {
    const query = "Two%20words";
    const text = "Two words";
    await page.goto(`/?birthday&text=${query}`);
    await expect(page.getByTestId("birthday")).toBeVisible();
    await expect(page.getByTestId("input")).toHaveValue(text);
  });

  // it("should be able to clear message", () => {
  //   wrapper.setData({ message: "test" });
  //   wrapper.vm.clear();
  //   expect(wrapper.vm.message).toBe("");
  // });
});
