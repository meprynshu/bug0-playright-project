import type { Browser } from '@playwright/test';

import { AccountInformationPage } from '../pages/account-information.page';
import { AccountStatusPage } from '../pages/account-status.page';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signup-login.page';
import type { TestUser } from './test-user';

export async function registerUserViaUi(browser: Browser, user: TestUser): Promise<void> {
  const context = await browser.newContext({ baseURL: 'http://automationexercise.com' });
  const page = await context.newPage();

  const accountInformationPage = new AccountInformationPage(page);
  const accountStatusPage = new AccountStatusPage(page);
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  try {
    await homePage.goto();
    await homePage.openSignupLogin();
    await signupLoginPage.expectSignupLoaded();
    await signupLoginPage.startSignup(user);

    await accountInformationPage.expectLoaded();
    await accountInformationPage.fillAccountDetails(user);
    await accountInformationPage.fillAddressDetails(user);
    await accountInformationPage.createAccount();

    await accountStatusPage.expectAccountCreated();
    user.created = true;
  } finally {
    await context.close();
  }
}
