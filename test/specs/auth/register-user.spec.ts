import type { TestUser } from '../../support/test-user';
import { deleteUserViaUi } from '../../support/user-cleanup';
import { test } from '../../fixtures/test';
import { generateEmail } from '../../../utils';
import { runSteps } from '@bug0/ai';

let createdUser: TestUser | undefined;

test.use({ headless: true })

test.afterAll(async ({ browser }) => {
  if (!createdUser || !createdUser.created || createdUser.deleted) {
    return;
  }

  await deleteUserViaUi(browser, createdUser);
});

test.describe.serial("Register New User", () => {

  test("registers a new user and deletes the account using run steps", async ({ page }) => {

    test.setTimeout(5 * 60 * 1000);

    const email = generateEmail();
    const password = "12345678";

    await page.goto("https://automationexercise.com", { waitUntil: "domcontentloaded" })
    await runSteps({
      page, 
      test, 
      userFlow: "Register/Signup a new user", 
      steps: [
        {
          description: "Click on Signup/Login button."
        }, 
        {
          description: "Fill in the name in 'New User Signup!' section.", 
          data: { value: "John" }
        }, 
        {
          description: "Fill in the email address in 'New User Signup!' section.", 
          data: { value: email }
        }, 
        {
          description: "Click on 'Signup' button"
        }, 
        {
          description: "Select the title 'Mr'"
        }, 
        {
          description: "Fill in the password in 'ENTER ACCOUNT INFORMATION' section.",
          data: { value: password }
        }, 
        {
          description: "Select the birth day.",
          data: { value: "1" }
        }, 
        {
          description: "Select the birth month.",
          data: { value: "January" }
        }, 
        {
          description: "Select the birth year.",
          data: { value: "2000" }
        }, 
        {
          description: "Check the checkbox for 'Sign up for our newsletter!'",
        }, 
        {
          description: "Check the checkbox for 'Receive special offers from our partners!'",
        }, 
        {
          description: "Fill in the first name in 'ADDRESS INFORMATION' section.",
          data: { value: "John" }
        }, 
        {
          description: "Fill in the last name in 'ADDRESS INFORMATION' section.",
          data: { value: "Doe" }
        }, 
        {
          description: "Fill in the company in 'ADDRESS INFORMATION' section.",
          data: { value: "Bug0" }
        }, 
        {
          description: "Fill in the address in 'ADDRESS INFORMATION' section.",
          data: { value: "123 Main St" }
        }, 
        {
          description: "Fill in the address2 in 'ADDRESS INFORMATION' section.",
          data: { value: "123 Main St" }
        }, 
        {
          description: "Select the country.",
          data: { value: "United States" }
        }, 
        {
          description: "Fill in the state in 'ADDRESS INFORMATION' section.",
          data: { value: "California" }
        }, 
        {
          description: "Fill in the city in 'ADDRESS INFORMATION' section.",
          data: { value: "Los Angeles" }
        }, 
        {
          description: "Fill in the zipcode in 'ADDRESS INFORMATION' section.",
          data: { value: "12345" }
        }, 
        {
          description: "Fill in the mobile number in 'ADDRESS INFORMATION' section.",
          data: { value: "1234567890" }
        }, 
        {
          description: "Click on 'Create Account' button"
        }, 
        {
          description: "Click on 'Continue' button"
        }, 
        {
          description: "Click on 'Delete Account' button"
        }, 
        {
          description: "Click on 'Continue' button"
        }
      ], 
      bypassCache: true
    })
  })


  // test('registers a new user and deletes the account', async (
  //   { accountInformationPage, accountStatusPage, homePage, signupLoginPage },
  //   testInfo,
  // ) => {
  //   test.slow();

  //   const user = buildTestUser(testInfo.project.name, testInfo.retry);
  //   createdUser = user;

  //   await homePage.goto();
  //   await homePage.expectLoaded();
  //   await homePage.openSignupLogin();

  //   await signupLoginPage.expectSignupLoaded();
  //   await signupLoginPage.startSignup(user);

  //   await accountInformationPage.expectLoaded();
  //   await accountInformationPage.fillAccountDetails(user);
  //   await accountInformationPage.fillAddressDetails(user);
  //   await accountInformationPage.createAccount();

  //   await accountStatusPage.expectAccountCreated();
  //   user.created = true;
  //   await accountStatusPage.clickContinue();

  //   await homePage.expectLoggedInAs(user.name);
  //   await homePage.deleteAccount();

  //   await accountStatusPage.expectAccountDeleted();
  //   await accountStatusPage.clickContinue();

  //   user.deleted = true;
  // });
})
