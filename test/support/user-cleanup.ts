import type { Browser } from '@playwright/test';

import { AccountStatusPage } from '../pages/account-status.page';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signup-login.page';
import type { TestUser } from './test-user';

export async function deleteUserViaUi(browser: Browser, user: TestUser): Promise<void> {
  const context = await browser.newContext({ baseURL: 'http://automationexercise.com' });
  const page = await context.newPage();

  const accountStatusPage = new AccountStatusPage(page);
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  try {
    try {
      await signupLoginPage.goto();
      await signupLoginPage.expectLoginLoaded();
      await signupLoginPage.login(user);

      await homePage.expectLoggedInAs(user.name);
      await homePage.deleteAccount();
      await accountStatusPage.expectAccountDeleted();

      user.deleted = true;
    } catch {
      // Cleanup is best-effort for this public demo site.
    }
  } finally {
    await context.close();
  }
}
