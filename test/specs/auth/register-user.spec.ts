import type { TestUser } from '../../support/test-user';
import { buildTestUser } from '../../support/test-user';
import { deleteUserViaUi } from '../../support/user-cleanup';
import { test } from '../../fixtures/test';

let createdUser: TestUser | undefined;

test.afterAll(async ({ browser }) => {
  if (!createdUser || createdUser.deleted) {
    return;
  }

  await deleteUserViaUi(browser, createdUser);
});

test('registers a new user and deletes the account', async (
  { accountInformationPage, accountStatusPage, homePage, signupLoginPage },
  testInfo,
) => {
  test.slow();

  const user = buildTestUser(testInfo.project.name, testInfo.retry);
  createdUser = user;

  await homePage.goto();
  await homePage.expectLoaded();
  await homePage.openSignupLogin();

  await signupLoginPage.expectSignupLoaded();
  await signupLoginPage.startSignup(user);

  await accountInformationPage.expectLoaded();
  await accountInformationPage.fillAccountDetails(user);
  await accountInformationPage.fillAddressDetails(user);
  await accountInformationPage.createAccount();

  await accountStatusPage.expectAccountCreated();
  await accountStatusPage.clickContinue();

  await homePage.expectLoggedInAs(user.name);
  await homePage.deleteAccount();

  await accountStatusPage.expectAccountDeleted();
  await accountStatusPage.clickContinue();

  user.deleted = true;
});
