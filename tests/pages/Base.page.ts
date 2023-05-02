import { expect, Page } from '@playwright/test';
// base page will include navigating to the airbnb page and clicking on the login page. 
// login page will include fields, enviro variables, authentication by clicking login 
// in the userFavorites E2E test, log in and favorite an item, then navigate to user favorites and validate

export default class BasePage {
    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async navigate(path) {
        await this.page.goto(`https://www.airbnb.com/${path}`)
    }
}
