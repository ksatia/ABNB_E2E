import { expect } from '@playwright/test';
import { test } from '../fixtures/base.page'

// throw in a beforeEach block to open the webpage
test.beforeEach(async ({ homePage }) => homePage.open());

test('user can click on first selected property and view the correct listing details page', async ({homePage, listingDetailsPage}) => {
    await homePage.selectFirstSuggestedProperty()
}),

test('user can select dates for listing on the datails page', async ({homePage, listingDetailsPage}) => {
    const listingDetailsContextPage = await homePage.selectFirstSuggestedProperty()
    await listingDetailsPage.selectDatesForListing(listingDetailsContextPage)
})


    // test block for viewing user account review

    // test block for adding dates and finding pricing

    // find a way to test filters

