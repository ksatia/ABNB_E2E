// destructure Page fix
import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly profileHamburgerMenu: string = 'cypress-headernav-profile'
    readonly firstHomeCardButton = 'body > div:nth-child(8) > div > div > div:nth-child(1) > div > div._1unac3l > div > div > div > div > div > main > div.fuvob9b.dir.dir-ltr > div:nth-child(1) > div > div > div > div.gh7uyir.g14v8520.dir.dir-ltr > div:nth-child(2) > div > div.c1l1h97y.dir.dir-ltr > div > div > div > div.cy5jw6o.dir.dir-ltr > div > div.m1v28t5c.dir.dir-ltr > div > div > div.c18vjgz6.dir.dir-ltr > div > div.tsz9f4o.dir.dir-ltr > div.ts9x1g6.dir.dir-ltr > div > button'
    readonly saveListNameModal = '#name-list-input-save-to-list-modal'

    constructor(page: Page) {
        this.page = page;
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
        const saveListConfirmation = this.page.locator(this.saveListNameModal)
        await 
        await this.page.locator(this.saveListNameModal).fill(wishlistName)
        let createButton = this.page.getByRole('button', { name: 'Create' })
        // createButton.waitFor()
        await expect(createButton).toBeVisible()
        await createButton.click()
        // confirm endpoint response by parsing JSON
        const response = await this.page.waitForResponse((res) => res.url().includes('api/v3/CreateWishlistMutation'))
        const responseBody = JSON.parse(await response.text())
        await expect(responseBody.data.createWishlist.statusCode).toBe('OK')

    }
    async deleteWishlist(wishlistName: string) {
        // visit wishlist page
        const accountMenu = this.page.getByTestId(this.profileHamburgerMenu)
        await accountMenu.waitFor()
        await accountMenu.click()
        await this.page.getByRole('link', { name: 'Wishlists' }).click()
        // locate card based on name parameter passed in
        const wishlistTarget = this.page.getByRole('group', { name: wishlistName })
        await expect(wishlistTarget).toBeVisible()
        await wishlistTarget.hover()
        // click delete button
        const deleteCardButton = this.page.getByRole('button', { name: `Delete ${wishlistName} - Not shared` })
        await expect(deleteCardButton).toBeVisible()
        await deleteCardButton.click()
        // confirm deletion
        const modalDeleteConfirmation = this.page.getByRole('button', {name: 'Confirm deleting wishlist'})
        modalDeleteConfirmation.waitFor()
        await modalDeleteConfirmation.click()
        // validate API response
        const response = await this.page.waitForResponse((res) => res.url().includes('api/v3/DeleteWishlistMutation'))
        const responseBody = JSON.parse(await response.text())
        await expect(responseBody.data.deleteWishlist.statusCode).toBe('OK')   
    }

    // maybe add assertions to the actual spec file so that we can resuse this purely for navigation. 
    async viewWishlists() {
        await this.page.getByTestId(this.profileHamburgerMenu).click()
        await this.page.getByRole('link', { name: 'Wishlists' }).click()
        const wishlistPageName = await this.page.title()
        await expect(this.page).toHaveTitle('Your lists · Wishlists - Airbnb')
    }

}
