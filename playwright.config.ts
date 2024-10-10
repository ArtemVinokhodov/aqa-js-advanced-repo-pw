import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });


export default defineConfig({
  testDir: './tests',
  retries: 0,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME || 'test',
      password: process.env.HTTP_CREDENTIALS_PASSWORD || 'test',
    },
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
