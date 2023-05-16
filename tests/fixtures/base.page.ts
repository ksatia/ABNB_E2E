import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';

// extends the base to incude instances of each page class to destructure in tests
export const test = base.extend<{
    homePage: HomePage;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
})


/*
  // This fixture has some complex logic and is defined with a function.

  const test = base.extend<TestFixtures>({
  // This fixture is a constant, so we can just provide the value.
  hello: 'Hello',

  helloWorld: async ({ hello }, use) => {
    // Set up the fixture.
    const value = hello + ', world!';

    // Use the fixture value in the test.
    await use(value);

    // Clean up the fixture. Nothing to cleanup in this example.

*/