import { expect, Locator, Page } from '@playwright/test';

export class AccountSettingsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visitPaymentsPage() {
        await this.page.getByRole('link', {name: 'Payments & payouts'}).click()
        await this.page.waitForLoadState()
        await expect(this.page).toHaveTitle('Payments & Payouts - Account Settings - Airbnb')
    }

}
