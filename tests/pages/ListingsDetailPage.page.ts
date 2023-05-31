// write out all E2E tests now
// start restructuring the spec file based on the above
// merge and squash the code, remove matt as a reviewer, keep it pushing

import { expect, Locator, Page } from '@playwright/test';

export class ListingDetailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async selectDatesForListing(detailsPage: Page,) {
        // or use the OR locator!
        // check API response for foreign language? and then if so, await page.waitForSelector('popup') and then click it
        // const watchPopup = await page.waitForFunction(() => popup.isvisible()) and then if watchPopup close it
        const foreignLanguageDialog = detailsPage.getByRole('button', { name: 'Close' })
        const availabilityCalendar = detailsPage.getByTestId('inline-availability-calendar')

        // use an or locator to get either the popup or the getByText listingLocation
        await expect(foreignLanguageDialog.or(availabilityCalendar)).toBeVisible
        if (await foreignLanguageDialog.isVisible()) { await foreignLanguageDialog.click() }

        await detailsPage.getByTestId('change-dates-checkIn').click()
        // create date object to use in picker
        const currentDate = new Date()
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        let departureMonth, departureYear, departureDay, returnDay, returnMonth, returnYear
        
        /*
        // if current month is December, jump to jan of following year for departure.
        // set departure to be 1st of next month
        if (month === 11) {
            departureDay = 1
            departureMonth = 1
            departureYear = year + 1
            returnDay = departureDay + 3
            returnMonth = departureMonth
            returnYear = departureYear
        }
        else {
            departureDay = 1
            departureMonth = month + 1
            departureYear = year
            returnDay = departureDay + 3
            returnMonth = departureMonth
            returnYear = departureYear
        }

        // write recursive function to find the departure date and return date until condition is met where 
        // the dates are available

        // you will need to scroll the calendar into view. This will require quite a bit of logic.
        // essentially a while loop where we look for the locator, and while it is NOT visible, keep scrolling
        // once it is visible, click it. 
        // must also check that the date is available ONCE it is found.
        // it's possible we may be able to grab a giant array and find an efficient way to search it
        console.log(`${day}/${departureMonth}/${departureYear}`)
        await detailsPage.getByTestId(`calendar-day-${day}/${departureMonth}/${departureYear}`).click()
        */
        //you can chain by getting testID, then locator with div, then filtering for text
        // page.innerText(element)
    }
}


// test('test', async ({ page }) => {
//   await page.goto('https://www.airbnb.com/');
//   await page.getByRole('button', { name: 'Close' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.locator('.rfexzly').first().click();
//   const page1 = await page1Promise;
//   await page1.getByRole('button', { name: 'Close' }).click();
//   await page1.getByRole('button', { name: 'Change dates; Check-in: 2023-07-27; Checkout: 2023-08-01' }).click();
//   await page1.getByTestId('bookit-sidebar-availability-calendar').locator('div').filter({ hasText: 'Check-in Checkout 5 nightsJul 27, 2023 - Aug 1, 2023' }).getByRole('button', { name: 'Clear dates' }).click();
//   await page1.getByPlaceholder('MM/DD/YYYY').fill('07202023');
//   await page1.getByPlaceholder('MM/DD/YYYY').press('Enter');
//   await page1.getByText('Check-in Checkout This date is unavailableSelect datesAdd your travel dates for ').click();
//   await page1.getByPlaceholder('MM/DD/YYYY').click({
//     clickCount: 3
//   });
//   await page1.getByPlaceholder('MM/DD/YYYY').fill('08202023');
//   await page1.getByPlaceholder('MM/DD/YYYY').press('Enter');
//   await page1.getByPlaceholder('MM/DD/YYYY').fill('08222023');
//   await page1.getByPlaceholder('MM/DD/YYYY').press('Enter');
//   await page1.getByPlaceholder('MM/DD/YYYY').click();
//   await page1.getByPlaceholder('MM/DD/YYYY').click();
//   await page1.getByPlaceholder('MM/DD/YYYY').click({
//     clickCount: 3
//   });
//   await page1.getByPlaceholder('MM/DD/YYYY').fill('08232023');
//   await page1.getByPlaceholder('MM/DD/YYYY').press('Enter');
// });