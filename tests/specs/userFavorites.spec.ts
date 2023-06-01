import { test } from '../fixtures/base.page'
import { HomePage } from '../pages/HomePage.page';

// throw in a beforeEach block to open the webpage
test.beforeEach(async ({ homePage }) => homePage.open());

test.describe('authentication dependent tests', () => {

    test('user should be able to authenticate, create wishlists and delete wishlists', async ({ homePage }) => {
        await homePage.userIsLoggedIn()
        await homePage.createWishlist('testWishlist')
        await homePage.deleteWishlist('testWishlist')
        await homePage.viewWishlists()
    }),

    // test block for checking payment on file. if there isn't one on file, run a test to find and add payment card 
    test('user should be able to add payment methods to their account', async({homePage}) => {
        
    })


    // test block for viewing user account review

    // test block for adding dates and finding pricing

    // find a way to test filters

})
