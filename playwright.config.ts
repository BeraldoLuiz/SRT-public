import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'; // 🔑 carrega automaticamente o .env

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 10000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: process.env.BASE_URL, // ✅ pega do .env
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
});
