// destructure Page fix
import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class HomePage {

    // let's try to avoid the long stuff and instead just 
    readonly page: Page;
    readonly context: BrowserContext;
    readonly profileHamburgerMenu: string = 'cypress-headernav-profile'
    readonly firstHomeCardButton = 'body > div:nth-child(8) > div > div > div:nth-child(1) > div > div._1unac3l > div > div > div > div > div > main > div.fuvob9b.dir.dir-ltr > div:nth-child(1) > div > div > div > div.gh7uyir.g14v8520.dir.dir-ltr > div:nth-child(2) > div > div.c1l1h97y.dir.dir-ltr > div > div > div > div.cy5jw6o.dir.dir-ltr > div > div.m1v28t5c.dir.dir-ltr > div > div > div.c18vjgz6.dir.dir-ltr > div > div.tsz9f4o.dir.dir-ltr > div.ts9x1g6.dir.dir-ltr > div > button'
    readonly saveListNameModal = '#name-list-input-save-to-list-modal'
    readonly firstHomeCardHostName = 'listing-card-subtitle'

    readonly firstHomeCardLocation = 'listing-card-title'

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
    }

    async open() {
        await this.page.goto('http://airbnb.com/');
        await this.page.waitForLoadState()
    }

    // look for the user profile link
    async userIsLoggedIn() {
        // click on hamburger button
        const accountMenu = this.page.getByTestId(this.profileHamburgerMenu)
        await accountMenu.waitFor()
        await accountMenu.click()
        // expect Messages link to be visible
        let accountOptions = this.page.getByRole('link', { name: 'Messages' })
        await expect(accountOptions).toBeVisible()
    }

    async createWishlist(wishlistName: string) {
        await this.page.locator(this.firstHomeCardButton).click()
        await this.page.locator(this.saveListNameModal).fill(wishlistName)
        let createButton = this.page.getByRole('button', { name: 'Create' })
        await expect(createButton).toBeVisible()
        await createButton.click()
        // confirm endpoint response by parsing JSON
        const response = await this.page.waitForResponse((res) => res.url().includes('api/v3/CreateWishlistMutation'))
        const responseBody = JSON.parse(await response.text())
        await expect(responseBody.data.createWishlist.statusCode).toBe('OK')

    }

    async deleteWishlist(wishlistName: string) {
        const accountMenu = this.page.getByTestId(this.profileHamburgerMenu)
        await accountMenu.waitFor()
        await accountMenu.click()
        await this.page.getByRole('link', { name: 'Wishlists' }).click()
        // find delete button, click it
        // verify via post response
        const wishlistTarget = this.page.getByRole('group', { name: wishlistName })
        await expect(wishlistTarget).toBeVisible()
        await wishlistTarget.hover()
        // locate button after hover
        const deleteCardButton = this.page.getByRole('button', { name: `Delete ${wishlistName} - Not shared` })
        await expect(deleteCardButton).toBeVisible()
        await deleteCardButton.click()
        const modalDeleteConfirmation = this.page.getByRole('button', { name: 'Confirm deleting wishlist' })
        modalDeleteConfirmation.waitFor()
        await modalDeleteConfirmation.click()
    }

    // maybe add assertions to the actual spec file so that we can resuse this purely for navigation. 
    async viewWishlists() {
        await this.page.getByTestId(this.profileHamburgerMenu).click()
        await this.page.getByRole('link', { name: 'Wishlists' }).click()
        await expect(this.page).toHaveTitle('Your lists · Wishlists - Airbnb')
    }

    async visitAccountSettings() {
        await this.page.getByTestId(this.profileHamburgerMenu).click()
        await this.page.getByRole('link', { name: 'Account' }).click()
        await expect(this.page).toHaveTitle('Account Settings - Airbnb')
    }

    async selectFirstSuggestedProperty(): Promise<Page> {
        // grab the country name
        const listingLocation = await (await this.page.getByTestId(this.firstHomeCardLocation).first().innerText()).split(',')[1].trim()
        const listingDetailPagePromise = this.page.waitForEvent('popup')
        // foreign language popup
        await this.page.locator('.rfexzly').first().click()

        const listingDetailPage = await listingDetailPagePromise
        const foreignLanguageDialog = listingDetailPage.getByRole('button', { name: 'Close' })
        const listingLocationText = listingDetailPage.getByText(listingLocation)

        // use an or locator to get either the popup or the getByText listingLocation
        await expect(foreignLanguageDialog.or(listingLocationText)).toBeVisible
        if (await foreignLanguageDialog.isVisible()) await foreignLanguageDialog.click()

        // use the country to verify we're on the correct page
        await expect(listingDetailPage.getByText(listingLocation).first()).toBeVisible()
        //pass along new context page so that the listingDetailPage page object can use it
        return listingDetailPage
    }

    async searchForProperty(searchLocation: string) {
        const searchButton = await this.page.getByRole('button', {name: 'Anywhere'}).click()
        await this.page.getByTestId('structured-search-input-field-query').fill(searchLocation)
        await this.page.getByTestId('structured-search-input-search-button').click()
        let countrySearchRegex = new RegExp(`${searchLocation}`)
        await expect(this.page).toHaveTitle(countrySearchRegex)
    }
}