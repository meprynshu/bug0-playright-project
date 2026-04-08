import { expect, type Page } from '@playwright/test';

import { clickAndWaitForPost } from '../support/network';
import type { TestUser } from '../support/test-user';
import { typeSequentially } from '../support/typing';

export class AccountInformationPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/signup$/);
    await expect(this.page.getByText('Enter Account Information', { exact: false })).toBeVisible();
  }

  async fillAccountDetails(user: TestUser): Promise<void> {
    await this.page.getByLabel(user.title).check();
    await expect(this.page.getByLabel(/^Name /)).toHaveValue(user.name);
    await expect(this.page.getByLabel(/^Email /)).toHaveValue(user.email);
    await typeSequentially(this.page.getByTestId('password'), user.password);
    await this.page.getByTestId('days').selectOption(user.birthDay);
    await this.page.getByTestId('months').selectOption(user.birthMonth);
    await this.page.getByTestId('years').selectOption(user.birthYear);

    if (user.signUpForNewsletter) {
      await this.page.locator('#newsletter').setChecked(true);
      await expect(this.page.locator('#newsletter')).toBeChecked();
    }

    if (user.receivePartnerOffers) {
      await this.page.locator('#optin').setChecked(true);
      await expect(this.page.locator('#optin')).toBeChecked();
    }
  }

  async fillAddressDetails(user: TestUser): Promise<void> {
    await typeSequentially(this.page.getByTestId('first_name'), user.firstName);
    await typeSequentially(this.page.getByTestId('last_name'), user.lastName);
    await typeSequentially(this.page.getByTestId('company'), user.company);
    await typeSequentially(this.page.getByTestId('address'), user.address);
    await typeSequentially(this.page.getByTestId('address2'), user.address2);
    await this.page.getByTestId('country').selectOption(user.country);
    await typeSequentially(this.page.getByTestId('state'), user.state);
    await typeSequentially(this.page.getByTestId('city'), user.city);
    await typeSequentially(this.page.getByTestId('zipcode'), user.zipcode);
    await typeSequentially(this.page.getByTestId('mobile_number'), user.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await clickAndWaitForPost(this.page, '/signup', () =>
      this.page.getByRole('button', { name: 'Create Account' }).click(),
    );
  }
}
