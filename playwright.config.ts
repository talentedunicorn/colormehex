import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: process.env.CI
    ? [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },

        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },

        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
        {
          name: "Mobile Chrome",
          use: { ...devices["Pixel 5"], isMobile: true, hasTouch: true },
        },
        {
          name: "Mobile Safari",
          use: { ...devices["iPhone 12"], isMobile: true, hasTouch: true },
        },
      ]
    : [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },

        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
      ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "bun dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
