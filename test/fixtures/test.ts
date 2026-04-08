import { test as base } from '@playwright/test';

import { AccountInformationPage } from '../pages/account-information.page';
import { AccountStatusPage } from '../pages/account-status.page';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signup-login.page';

type AppFixtures = {
  accountInformationPage: AccountInformationPage;
  accountStatusPage: AccountStatusPage;
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
};

export const test = base.extend<AppFixtures>({
  accountInformationPage: async ({ page }, use) => {
    await use(new AccountInformationPage(page));
  },
  accountStatusPage: async ({ page }, use) => {
    await use(new AccountStatusPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
});

export { expect } from '@playwright/test';
