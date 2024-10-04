import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-object/HomePage';

export async function openRegisterModal(page) {
  const homePage = new HomePage(page);
  
  await test.step('Open Register modal', async () => {
    await homePage.openMainPage();
    await homePage.openSignInForm();
    await homePage.openRegistrationForm();
    await expect(page.locator('.modal-content')).toBeVisible;
  });
}



