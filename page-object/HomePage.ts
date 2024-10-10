import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly registrationInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('button', { hasText: 'Sign in' });
        this.registrationInButton = page.locator('button', { hasText: 'Registration' });
    }

    async openMainPage() {
        await this.page.goto(process.env.BASE_URL || '/');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }

    async openRegistrationForm() {
        await this.registrationInButton.click();
    }
}