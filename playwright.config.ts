import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: "./test/e2e",
  testMatch: /.*\.e2e\.ts/,
  outputDir: "./test/e2e/test-results",
  timeout: 90 * 1000,
  use: {
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  globalSetup: "./test/e2e/setup.ts",
  globalTeardown: "./test/e2e/teardown.ts",

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
