import { test, expect } from '@playwright/test';
import { openRegisterModal } from './utils';
import { SignInPage } from '../../page-object/signInPage';
import { HomePage } from '../../page-object/HomePage';

test.describe('ДЗ 23.1. Locators, actions and asserts in Playwright', () => {
  let homePage: HomePage;
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInPage = new SignInPage(page);

    await openRegisterModal(page);
  });

  test.describe('Field name', () => {
    test('Field name: Name required', async () => {
      await signInPage.triggerErrorOnFirstNameField();
      await expect(signInPage.nameInput).toBeEmpty();
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Name required');
    });

    test('Field name: Name is invalid', async () => {
      await signInPage.enterValueAndTriggerErrorOnFirstNameField('12345');
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Name is invalid');
    });

    test('Field name: Name has to be from 2 to 20 characters long', async ({ page }) => {
      await signInPage.nameInput.focus();
      await signInPage.nameInput.fill('1');
      await signInPage.nameInput.blur();
      await signInPage.checkFieldValidation(
        signInPage.invalidFeedbackMessage,
        'Name is invalid' + 'Name has to be from 2 to 20 characters long'
      );
    });

    test('Field name: Color validation', async () => {
      await signInPage.nameInput.fill('12345');
      await signInPage.nameInput.blur();
      await expect(signInPage.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field LastName', () => {
    test('Last name: Last name required', async () => {
      await signInPage.triggerErrorOnLastNameField();
      await expect(signInPage.lastNameInput).toBeEmpty();
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Last name required');
    });

    test('Last name: Last name is invalid', async () => {
      await signInPage.enterValueAndTriggerErrorOnLastNameField('12345');
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Last name is invalid');
    });

    test('Last name: Last name has to be from 2 to 20 characters long', async () => {
      await signInPage.enterValueAndTriggerErrorOnLastNameField('1');
      await signInPage.checkFieldValidation(
        signInPage.invalidFeedbackMessage,
        'Last name is invalid' + 'Last name has to be from 2 to 20 characters long'
      );
    });

    test('Last name: Color validation', async () => {
      await signInPage.lastNameInput.fill('12345');
      await signInPage.lastNameInput.blur();
      await expect(signInPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Email fields', () => {
    test('Email field: Email required', async () => {
      await signInPage.triggerErrorOnEmailField();
      await expect(signInPage.emailField).toBeEmpty();
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Email required');
    });

    test('Email is incorrect error', async () => {
      await signInPage.enterValueAndTriggerErrorOnEmailField('1');
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Email is incorrect');
    });

    test('Border color red error', async () => {
      await signInPage.triggerErrorOnEmailField();
      await expect(signInPage.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Password fields', () => {
    test('Password field: Password required', async () => {
      await signInPage.triggerErrorOnPasswordField();
      await expect(signInPage.passwordField).toBeEmpty();
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Password required');
    });

    test('Password field: Password length and characters', async () => {
      await signInPage.enterValueAndTriggerErrorOnPasswordField('1');
      await signInPage.checkFieldValidation(
        signInPage.invalidFeedbackMessage,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('re-Password field: Re-enter password required', async () => {
      await signInPage.triggerErrorOnRepeatPasswordField();
      await expect(signInPage.rePasswordField).toBeEmpty();
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Re-enter password required');
    });

    test('re-Password field: Passwords do not match', async () => {
      await signInPage.enterValuesAndTriggerErrorOnRepeatPasswordField('AAAaaa123', 'AAAaaa1234');
      await signInPage.checkFieldValidation(signInPage.invalidFeedbackMessage, 'Passwords do not match');
    });
  });

  test('Registration: button', async ({ page }) => {
    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });
});
