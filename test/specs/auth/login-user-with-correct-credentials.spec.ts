import type { TestUser } from '../../support/test-user';
import { buildTestUser } from '../../support/test-user';
import { deleteUserViaUi } from '../../support/user-cleanup';
import { registerUserViaUi } from '../../support/user-registration';
import { test } from '../../fixtures/test';

let createdUser: TestUser | undefined;

test.afterAll(async ({ browser }) => {
  if (!createdUser || !createdUser.created || createdUser.deleted) {
    return;
  }

  await deleteUserViaUi(browser, createdUser);
});

test('logs in with valid credentials and deletes the account', async (
  { accountStatusPage, homePage, signupLoginPage, browser },
  testInfo,
) => {
  test.slow();

  const user = buildTestUser(testInfo.project.name, testInfo.retry);
  createdUser = user;

  await registerUserViaUi(browser, user);

  await homePage.goto();
  await homePage.expectLoaded();
  await homePage.openSignupLogin();

  await signupLoginPage.expectLoginLoaded();
  await signupLoginPage.enterLoginCredentials(user);
  await signupLoginPage.submitLogin();

  await homePage.expectLoggedInAs(user.name);
  await homePage.deleteAccount();

  await accountStatusPage.expectAccountDeleted();

  user.deleted = true;
});
