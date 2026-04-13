import type { TestUser } from '../../support/test-user';
import { buildTestUser } from '../../support/test-user';
import { deleteUserViaUi } from '../../support/user-cleanup';
import { registerUserViaUi } from '../../support/user-registration';
import { test } from '../../fixtures/test';
import { runSteps } from '@bug0/ai';

let createdUser: TestUser | undefined;

test.use({ headless: true })

test.afterAll(async ({ browser }) => {
  if (!createdUser || !createdUser.created || createdUser.deleted) {
    return;
  }

  await deleteUserViaUi(browser, createdUser);
});

test('logs out a logged-in user and returns to the login page using run steps', async (
  { browser, page },
  testInfo,
) => {
  test.setTimeout(5 * 60 * 1000);

  const user = buildTestUser(testInfo.project.name, testInfo.retry);
  createdUser = user;

  await registerUserViaUi(browser, user);

  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });
  await runSteps({
    page,
    test,
    userFlow: 'Log out a logged-in user and return to the login page',
    steps: [
      {
        description: 'Click on Signup/Login button.',
      },
      {
        description: "Fill in the email address in 'Login to your account' section.",
        data: { value: user.email },
      },
      {
        description: "Fill in the password in 'Login to your account' section.",
        data: { value: user.password },
      },
      {
        description: "Click on 'Login' button",
      },
      {
        description: `Verify that 'Logged in as ${user.name}' is visible.`,
      },
      {
        description: "Click on 'Logout' button",
      },
      {
        description: "Verify that 'Login to your account' is visible."
      },
    ],
    bypassCache: true,
  });
});

// test('logs out a logged-in user and returns to the login page', async (
//   { browser, homePage, signupLoginPage },
//   testInfo,
// ) => {
//   test.slow();
//
//   const user = buildTestUser(testInfo.project.name, testInfo.retry);
//   createdUser = user;
//
//   await registerUserViaUi(browser, user);
//
//   await homePage.goto();
//   await homePage.expectLoaded();
//   await homePage.openSignupLogin();
//
//   await signupLoginPage.expectLoginLoaded();
//   await signupLoginPage.enterLoginCredentials(user);
//   await signupLoginPage.submitLogin();
//
//   await homePage.expectLoggedInAs(user.name);
//   await homePage.logout();
//
//   await signupLoginPage.expectLoginLoaded();
// });
