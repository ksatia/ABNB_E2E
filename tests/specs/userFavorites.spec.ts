// might not need chromium here since we have it set in the config.ts file
import { test, expect } from '@playwright/test'
const { chromium } = require('playwright');

let browser, context, page

test.beforeAll(async () => {
    let browser = await chromium.launc({headless: false})
    let context = await browser.newContext()
    let page = await context.newPage()
  });

test.afterAll(async () => {
    await context.close()
    await browser.close()
})



// study POM
// create test block
// create loginpage and see if we can authenticate it, store it to a browserContext and then use it in the favorites section