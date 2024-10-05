import { expect, Locator, Page, test } from "@playwright/test";

export class SignInPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly invalidFeedbackMessage: Locator;
    readonly lastNameInput: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly rePasswordField: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('#signupName');
        this.invalidFeedbackMessage = page.locator('.invalid-feedback');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.rePasswordField = page.locator('#signupRepeatPassword');
    }

    async triggerErrorOnFirstNameField() {
        await this.nameInput.focus();
        await this.nameInput.blur();
    }

    async triggerErrorOnLastNameField() {
        await this.lastNameInput.focus();
        await this.lastNameInput.blur();
    }

    async triggerErrorOnEmailField() {
        await this.emailField.focus();
        await this.emailField.blur();
    }

    async triggerErrorOnPasswordField() {
        await this.passwordField.focus();
        await this.passwordField.blur();
    }

    async triggerErrorOnRepeatPasswordField() {
        await this.rePasswordField.focus();
        await this.rePasswordField.blur();
    }

    async enterValueAndTriggerErrorOnFirstNameField(firstname: string) {
        await this.nameInput.fill(firstname);
        await this.nameInput.blur();
    }

    async enterValueAndTriggerErrorOnLastNameField(lastname: string) {
        await this.lastNameInput.fill(lastname);
        await this.lastNameInput.blur();
    }

    async enterValueAndTriggerErrorOnEmailField(email: string) {
        await this.emailField.fill(email);
        await this.emailField.blur();
    }

    async enterValueAndTriggerErrorOnPasswordField(password: string) {
        await this.passwordField.fill(password);
        await this.passwordField.blur();
    }

    async enterValuesAndTriggerErrorOnRepeatPasswordField(password: string, repeatpassword: string) {
        await this.passwordField.fill(password);
        await this.rePasswordField.fill(repeatpassword);
        await this.rePasswordField.blur();
    }

    async checkFieldValidation(locator, errorText) {
        await expect(locator).toHaveText(errorText);
      }
}