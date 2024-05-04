import { defineConfig } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  repeatEach: 0, // to debug flaky tests
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['github'], ['list'], ['html'], ['@currents/playwright']]
    : [['list', { printSteps: true }], ['html']],
  use: {
    extraHTTPHeaders: {
      'playwright-solutions': 'true',
      'Content-Type': 'application/json',
    },
    baseURL: process.env.URL,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure', // 'retain-on-failure', 'on'
  },
  projects: [
    { name: 'setup', testMatch: /auth.setup.ts/, teardown: 'teardown' },
    { name: 'booking', dependencies: ['setup'], testMatch: /booking./ },
    { name: 'teardown', testMatch: /teardown.ts/ },
    { name: 'auth', testMatch: /auth.post.spec.ts/ },
  ],
});
