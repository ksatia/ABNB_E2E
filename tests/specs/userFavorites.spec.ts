import { test } from '../fixtures/base.page'
import { HomePage } from '../pages/HomePage.page';

// throw in a beforeEach block to open the webpage
test.beforeEach(async ({ homePage }) => homePage.open());

test.describe('Logged in users should be able to see favorited listings', () => {

    test('user should see hamburger menu options for authenticated accounts', async ({ homePage }) => {
        await homePage.userIsLoggedIn()
    }),

    test('user should be able to navigate to favorited listings via hamburger menu', async ({ homePage }) => {
        await homePage.viewWishlists()
    }),

    test('user should be able to create wishlist from first homepage suggestion', async ({ homePage }) => {
        await homePage.createWishlist('testWishlist')
    }),

    test('user should be able to delete wishlist from account wishlist page', async({ homePage }) => {
        await homePage.deleteWishlist('testWishlist')
    })

})

