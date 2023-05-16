import { test as setup } from '@playwright/test'

// writing to the /.auth directory at a user json filepath
const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
    await page.goto('https://airbnb.com/login')
    await page.getByRole('button', { name: 'Continue with email' }).click()
    await page.getByLabel('Email').fill(process.env.ABNB_EMAIL as string)
    await page.getByTestId('signup-login-submit-btn').click()
    await page.getByLabel('Password').fill(process.env.ABNB_PWD as string)
    await page.getByRole('button', { name: 'Log in' }).click()


    // wait for cookies to set
    await page.waitForURL('https://www.airbnb.com')
    await page.context().storageState({ path: authFile })
})