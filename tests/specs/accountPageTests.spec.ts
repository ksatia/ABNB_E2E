import { expect } from '@playwright/test';
import { test } from '../fixtures/base.page'


// beforeEach block to open the webpage
test.beforeEach(async ({ homePage }) => homePage.open());


test('user should be able to authenticate, create wishlists and delete wishlists', async ({ homePage }) => {
    await homePage.userIsLoggedIn()
    await homePage.createWishlist('testWishlist')
    await homePage.deleteWishlist('testWishlist')
    await homePage.viewWishlists()
}),

test('user should be able to add and remove payment methods to their account', async ({ homePage, accountSettingsPage, paymentsPage }) => {
    await homePage.visitAccountSettings()
    await accountSettingsPage.visitPaymentsPage()
    const paymentAdditionSuccess = await paymentsPage.addNewPaymentMethod()
    expect(paymentAdditionSuccess).toBe(true)
    const paymentRemovalSuccess = await paymentsPage.removePaymentMethod()
    expect(paymentRemovalSuccess).toBe(true)
})



// test block for viewing user account review

// test block for adding dates and finding pricing

// find a way to test filters