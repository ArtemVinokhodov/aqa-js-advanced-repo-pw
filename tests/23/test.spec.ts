import { test, expect } from '@playwright/test';
import { openRegisterModal, checkFieldValidation } from './helper';

test.beforeEach(async ({ page }) => {
  await openRegisterModal(page);
});

test.describe('ДЗ 23.1. Locators, actions and asserts in Playwright', () => {
  test('Registration: button', async ({ page }) => {
    await expect(page.locator('.modal-content')).toBeVisible;
    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  test('Registration: Field name', async ({ page }) => {
    const nameInput = page.locator('#signupName');
    const invalidFeedbackMessage = page.locator('.invalid-feedback');

    await nameInput.focus();
    await nameInput.blur();
    await expect(nameInput).toBeEmpty;
    await checkFieldValidation(invalidFeedbackMessage, 'Name required');

    await nameInput.focus();
    await nameInput.pressSequentially('12345');
    await nameInput.blur();
    await checkFieldValidation(invalidFeedbackMessage, 'Name is invalid');

    await nameInput.focus();
    await nameInput.fill('1');
    await nameInput.blur();
    await checkFieldValidation(
      invalidFeedbackMessage,
      'Name is invalid' + 'Name has to be from 2 to 20 characters long'
    );

    await nameInput.fill('12345');
    await nameInput.blur();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Registration: Last name', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');
    const invalidFeedbackMessage = page.locator('.invalid-feedback');

    await lastNameInput.focus();
    await lastNameInput.blur();
    await expect(lastNameInput).toBeEmpty;
    await checkFieldValidation(invalidFeedbackMessage, 'Last name required');

    await lastNameInput.focus();
    await lastNameInput.pressSequentially('12345');
    await lastNameInput.blur();
    await checkFieldValidation(invalidFeedbackMessage, 'Last name is invalid');

    await lastNameInput.focus();
    await lastNameInput.fill('1');
    await lastNameInput.blur();
    await checkFieldValidation(
      invalidFeedbackMessage,
      'Last name is invalid' + 'Last name has to be from 2 to 20 characters long'
    );

    await lastNameInput.fill('12345');
    await lastNameInput.blur();
    await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Registration: Password field', async ({ page }) => {
    const passwordField = page.locator('#signupPassword');
    const invalidFeedbackMessage = page.locator('.invalid-feedback');

    await passwordField.focus();
    await passwordField.blur();
    await expect(passwordField).toBeEmpty;
    await checkFieldValidation(invalidFeedbackMessage, 'Password required');

    await passwordField.focus();
    await passwordField.fill('1');
    await passwordField.blur();
    await checkFieldValidation(
      invalidFeedbackMessage,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('Registration: re-Password field', async ({ page }) => {
    const passwordField = page.locator('#signupPassword');
    const rePasswordField = page.locator('#signupRepeatPassword');
    const invalidFeedbackMessage = page.locator('.invalid-feedback');

    await rePasswordField.focus();
    await rePasswordField.blur();
    await expect(rePasswordField).toBeEmpty;
    await checkFieldValidation(
      invalidFeedbackMessage,
      'Re-enter password required'
    );

    await passwordField.focus();
    await passwordField.fill('AAAaaa123');
    await rePasswordField.focus();
    await rePasswordField.fill('AAAaaa1234');
    await rePasswordField.blur();
    await checkFieldValidation(invalidFeedbackMessage, 'Passwords do not match');
  });
});
