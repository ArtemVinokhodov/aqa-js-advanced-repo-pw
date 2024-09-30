import { test, expect } from '@playwright/test';
import { openRegisterModal, checkFieldValidation } from './helper';

test.describe('ДЗ 23.1. Locators, actions and asserts in Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await openRegisterModal(page);
  });

  test.describe('Field name', () => {
    test('Field name: Name required', async ({ page }) => {
      const nameInput = page.locator('#signupName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await nameInput.focus();
      await nameInput.blur();
      await expect(nameInput).toBeEmpty();
      await checkFieldValidation(invalidFeedbackMessage, 'Name required');
    });

    test('Field name: Name is invalid', async ({ page }) => {
      const nameInput = page.locator('#signupName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await nameInput.focus();
      await nameInput.pressSequentially('12345');
      await nameInput.blur();
      await checkFieldValidation(invalidFeedbackMessage, 'Name is invalid');
    });

    test('Field name: Name has to be from 2 to 20 characters long', async ({ page }) => {
      const nameInput = page.locator('#signupName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await nameInput.focus();
      await nameInput.fill('1');
      await nameInput.blur();
      await checkFieldValidation(
        invalidFeedbackMessage,
        'Name is invalid' + 'Name has to be from 2 to 20 characters long'
      );
    });

    test('Field name: Color validation', async ({ page }) => {
      const nameInput = page.locator('#signupName');
      
      await nameInput.fill('12345');
      await nameInput.blur();
      await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field LastName', () => {
    test('Last name: Last name required', async ({ page }) => {
      const lastNameInput = page.locator('#signupLastName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await lastNameInput.focus();
      await lastNameInput.blur();
      await expect(lastNameInput).toBeEmpty();
      await checkFieldValidation(invalidFeedbackMessage, 'Last name required');
    });

    test('Last name: Last name is invalid', async ({ page }) => {
      const lastNameInput = page.locator('#signupLastName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await lastNameInput.focus();
      await lastNameInput.pressSequentially('12345');
      await lastNameInput.blur();
      await checkFieldValidation(invalidFeedbackMessage, 'Last name is invalid');
    });

    test('Last name: Last name has to be from 2 to 20 characters long', async ({ page }) => {
      const lastNameInput = page.locator('#signupLastName');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await lastNameInput.focus();
      await lastNameInput.fill('1');
      await lastNameInput.blur();
      await checkFieldValidation(
        invalidFeedbackMessage,
        'Last name is invalid' + 'Last name has to be from 2 to 20 characters long'
      );
    });

    test('Last name: Color validation', async ({ page }) => {
      const lastNameInput = page.locator('#signupLastName');
      
      await lastNameInput.fill('12345');
      await lastNameInput.blur();
      await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Password fields', () => {
    test('Password field: Password required', async ({ page }) => {
      const passwordField = page.locator('#signupPassword');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await passwordField.focus();
      await passwordField.blur();
      await expect(passwordField).toBeEmpty();
      await checkFieldValidation(invalidFeedbackMessage, 'Password required');
    });

    test('Password field: Password length and characters', async ({ page }) => {
      const passwordField = page.locator('#signupPassword');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await passwordField.focus();
      await passwordField.fill('1');
      await passwordField.blur();
      await checkFieldValidation(
        invalidFeedbackMessage,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('re-Password field: Re-enter password required', async ({ page }) => {
      const rePasswordField = page.locator('#signupRepeatPassword');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await rePasswordField.focus();
      await rePasswordField.blur();
      await expect(rePasswordField).toBeEmpty();
      await checkFieldValidation(
        invalidFeedbackMessage,
        'Re-enter password required'
      );
    });

    test('re-Password field: Passwords do not match', async ({ page }) => {
      const passwordField = page.locator('#signupPassword');
      const rePasswordField = page.locator('#signupRepeatPassword');
      const invalidFeedbackMessage = page.locator('.invalid-feedback');
      
      await passwordField.focus();
      await passwordField.fill('AAAaaa123');
      await rePasswordField.focus();
      await rePasswordField.fill('AAAaaa1234');
      await rePasswordField.blur();
      await checkFieldValidation(invalidFeedbackMessage, 'Passwords do not match');
    });
  });

  test('Registration: button', async ({ page }) => {
    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });
  
});
