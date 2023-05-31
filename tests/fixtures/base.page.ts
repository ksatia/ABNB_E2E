import { test as base } from '@playwright/test';
import { AccountSettingsPage } from '../pages/AccountSettingsPage.page';
import { HomePage } from '../pages/HomePage.page';
import { PaymentsPage } from '../pages/PaymentsPage.page';
import { ListingDetailsPage } from '../pages/ListingsDetailPage.page';

// extends the base to incude instances of each page class to destructure in tests
export const test = base.extend<{
    homePage: HomePage;
    accountSettingsPage: AccountSettingsPage;
    paymentsPage: PaymentsPage;
    listingDetailsPage: ListingDetailsPage;
}>({
    homePage: async ({ page, context }, use) => {
        await use(new HomePage(page, context));
    },
    accountSettingsPage: async ({ page }, use) => {
        await use(new AccountSettingsPage(page));
    },
    paymentsPage: async({page}, use) => {
        await use(new PaymentsPage(page));
    },
    listingDetailsPage: async({page}, use) => {
        await use(new ListingDetailsPage(page))
    }
})