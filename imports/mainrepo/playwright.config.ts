import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
