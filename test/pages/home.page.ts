import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async deleteAccount(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/delete_account'),
      this.page.getByRole('link', { name: 'Delete Account' }).click(),
    ]);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.page.getByAltText('Website for automation practice')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openSignupLogin(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/login'),
      this.page.getByRole('link', { name: 'Signup / Login' }).click(),
    ]);
  }
}
