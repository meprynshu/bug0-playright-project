import type { LoginCredentials } from '../../support/test-user';
import { test } from '../../fixtures/test';

test('shows an error when logging in with invalid credentials', async ({
  homePage,
  signupLoginPage,
}) => {
  test.slow();

  const invalidCredentials: LoginCredentials = {
    email: `invalid-${Date.now()}@example.com`,
    password: 'WrongPassword123',
  };

  await homePage.goto();
  await homePage.expectLoaded();
  await homePage.openSignupLogin();

  await signupLoginPage.expectLoginLoaded();
  await signupLoginPage.enterLoginCredentials(invalidCredentials);
  await signupLoginPage.submitLogin();
  await signupLoginPage.expectIncorrectCredentialsError();
});
