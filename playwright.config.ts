import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  
  testDir: 'src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['allure-playwright'],['html']],
  
  use: {    
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui-setup',
      testMatch: 'ui-auth.setup.ts'
    },
    {
      name: 'api-setup',
      testMatch: 'api-auth.setup.ts'
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState:'.auth/api-user.json' },
      dependencies: ['api-setup']
    }
  ],

});
