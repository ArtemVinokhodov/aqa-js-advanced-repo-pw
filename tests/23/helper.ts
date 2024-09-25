import { test, expect } from '@playwright/test';

export async function openRegisterModal(page) {
  await test.step('Open Register modal', async () => {
    await page.goto('');
    await page.locator('button', { hasText: 'Sign in' }).click();
    await page.locator('button', { hasText: 'Registration' }).click();
    await expect(page.locator('.modal-content')).toBeVisible;
  });
}

export async function checkFieldValidation(locator, errorText) {
  await test.step('Check error text', async () => {
    await expect(locator).toHaveText(errorText);
  });
}

