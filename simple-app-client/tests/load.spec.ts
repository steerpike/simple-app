// tests/load.spec.ts
import { test, expect } from '@playwright/test';

test('Load test homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Simple/);
});
