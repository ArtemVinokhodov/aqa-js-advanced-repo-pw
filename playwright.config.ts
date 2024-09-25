import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
