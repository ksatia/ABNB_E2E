import { expect, Locator, Page } from '@playwright/test';

export class PaymentsPage {
    readonly page: Page;
    readonly paymentOptionRowID = '#payment-methods-payment-instrument'
    readonly paymentOptionButton = '._jf8tr71'
    constructor(page: Page) {
        this.page = page;
    }

    async addNewPaymentMethod(): Promise<Boolean> {
        await this.page.getByRole('button', { name: 'Add payment method' }).click()
        const paymentsFrame = await this.page.frameLocator('iframe[name="payment-iframe"]')
        await paymentsFrame.getByLabel('Card number').fill(process.env.CARD_NO as string)
        await paymentsFrame.getByLabel('Expiration').fill(process.env.CARD_EXP as string)
        await paymentsFrame.getByLabel('CVV').fill(process.env.CARD_CVV as string)
        await this.page.getByLabel('ZIP code').fill(process.env.CARD_ZIP as string)
        await this.page.getByTestId('submit-button').click()
        await this.page.getByRole('group', { name: 'Add Successful' })
        if (await this.page.getByRole('group', { name: 'Add Successful' })) {
            return true
        } else { return false }
    }

    async removePaymentMethod() {
        if (await this.page.locator(this.paymentOptionRowID)) {
            await this.page.locator(this.paymentOptionButton).click()
            await this.page.getByRole('menuitem', { name: 'Remove' }).click()
            await this.page.getByRole('button', { name: 'Remove' }).click()
            if (await this.page.getByRole('group', { name: 'Payment method removed' })) {
                return true
            } else { return false }
        }
    }
}