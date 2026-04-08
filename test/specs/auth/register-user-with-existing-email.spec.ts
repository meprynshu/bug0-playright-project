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

test('shows an error when signing up with an already registered email', async (
  { browser, homePage, signupLoginPage },
  testInfo,
) => {
  test.slow();

  const user = buildTestUser(testInfo.project.name, testInfo.retry);
  createdUser = user;

  await registerUserViaUi(browser, user);

  await homePage.goto();
  await homePage.expectLoaded();
  await homePage.openSignupLogin();

  await signupLoginPage.expectSignupLoaded();
  await signupLoginPage.enterSignupDetails(user);
  await signupLoginPage.submitSignup();
  await signupLoginPage.expectExistingEmailError();
});
