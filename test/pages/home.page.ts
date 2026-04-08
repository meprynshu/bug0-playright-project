import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async deleteAccount(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/delete_account', { waitUntil: 'domcontentloaded' }),
      this.page.getByRole('link', { name: 'Delete Account' }).click(),
    ]);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.page.getByAltText('Website for automation practice')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible({ timeout: 10_000 });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async logout(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/login', { waitUntil: 'domcontentloaded' }),
      this.page.getByRole('link', { name: 'Logout' }).click(),
    ]);
  }

  async openSignupLogin(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/login', { waitUntil: 'domcontentloaded' }),
      this.page.getByRole('link', { name: 'Signup / Login' }).click(),
    ]);
  }
}
