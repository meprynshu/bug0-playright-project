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

test('shows an error when signing up with an already registered email using run steps', async (
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
    userFlow: 'Attempt to register with an email address that already exists',
    steps: [
      {
        description: 'Click on Signup/Login button.',
      },
      {
        description: "Fill in the name in 'New User Signup!' section.",
        data: { value: user.name },
      },
      {
        description: "Fill in the email address in 'New User Signup!' section.",
        data: { value: user.email },
      },
      {
        description: "Click on 'Signup' button",
      },
      {
        description: "Verify that 'Email Address already exist!' is visible.",
      },
    ],
    bypassCache: true,
  });
});

// test('shows an error when signing up with an already registered email', async (
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
//   await signupLoginPage.expectSignupLoaded();
//   await signupLoginPage.enterSignupDetails(user);
//   await signupLoginPage.submitSignup();
//   await signupLoginPage.expectExistingEmailError();
// });
