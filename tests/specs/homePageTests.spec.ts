import { expect } from '@playwright/test';
import { test } from '../fixtures/base.page'


// beforeEach block to open the webpage
test.beforeEach(async ({ homePage }) => homePage.open());

test('user can click on first selected property and view the correct listing details page', async ({homePage, listingDetailsPage}) => {
    await homePage.selectFirstSuggestedProperty()
}),

test('user can search for properties based on location', async({homePage}) => {
    const searchLocation = 'Tuscany'
    await homePage.searchForProperty(searchLocation)
})  


// @TODO refactor so that assertions happen in the spec file
// @TODO refactor out some pages so that account 


    // test block for viewing user account review

    // test block for adding dates and finding pricing

    // find a way to test filters