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

    // test block for viewing user account review / user can sort by {} / user can filter by {}