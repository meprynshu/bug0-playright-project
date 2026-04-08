import { expect, type Page } from '@playwright/test';

export class AccountStatusPage {
  constructor(private readonly page: Page) {}

  async clickContinue(): Promise<void> {
    await this.page.getByTestId('continue-button').click();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account_created$/);
    await expect(this.page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  }

  async expectAccountDeleted(): Promise<void> {
    await expect(this.page).toHaveURL(/\/delete_account$/);
    await expect(this.page.getByRole('heading', { name: /Account Deleted!/i })).toBeVisible({
      timeout: 10_000,
    });
  }
}
