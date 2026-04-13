import type { LoginCredentials } from '../../support/test-user';
import { test } from '../../fixtures/test';
import { runSteps } from '@bug0/ai';

test.use({ headless: true })

test('shows an error when logging in with invalid credentials using run steps', async ({
  page,
}) => {
  test.setTimeout(5 * 60 * 1000);

  const invalidCredentials: LoginCredentials = {
    email: `invalid-${Date.now()}@example.com`,
    password: 'WrongPassword123',
  };

  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });
  await runSteps({
    page,
    test,
    userFlow: 'Attempt to log in with invalid credentials',
    steps: [
      {
        description: 'Click on Signup/Login button.',
      },
      {
        description: "Fill in the email address in 'Login to your account' section.",
        data: { value: invalidCredentials.email },
      },
      {
        description: "Fill in the password in 'Login to your account' section.",
        data: { value: invalidCredentials.password },
      },
      {
        description: "Click on 'Login' button",
      },
      {
        description: "Verify that 'Your email or password is incorrect!' is visible.",
      },
    ],
    bypassCache: true,
  });
});

// test('shows an error when logging in with invalid credentials', async ({
//   homePage,
//   signupLoginPage,
// }) => {
//   test.slow();
//
//   const invalidCredentials: LoginCredentials = {
//     email: `invalid-${Date.now()}@example.com`,
//     password: 'WrongPassword123',
//   };
//
//   await homePage.goto();
//   await homePage.expectLoaded();
//   await homePage.openSignupLogin();
//
//   await signupLoginPage.expectLoginLoaded();
//   await signupLoginPage.enterLoginCredentials(invalidCredentials);
//   await signupLoginPage.submitLogin();
//   await signupLoginPage.expectIncorrectCredentialsError();
// });
