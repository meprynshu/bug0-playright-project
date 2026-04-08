import { expect, type Page } from '@playwright/test';

import { clickAndWaitForPost } from '../support/network';
import type { TestUser } from '../support/test-user';
import { typeSequentially } from '../support/typing';

export class SignupLoginPage {
  constructor(private readonly page: Page) {}

  async expectLoginLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  }

  async expectSignupLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(user: TestUser): Promise<void> {
    await typeSequentially(this.page.getByTestId('login-email'), user.email);
    await typeSequentially(this.page.getByTestId('login-password'), user.password);

    await clickAndWaitForPost(this.page, '/login', () =>
      this.page.getByRole('button', { name: 'Login' }).click(),
    );
  }

  async startSignup(user: TestUser): Promise<void> {
    await typeSequentially(this.page.getByTestId('signup-name'), user.name);
    await typeSequentially(this.page.getByTestId('signup-email'), user.email);

    await clickAndWaitForPost(this.page, '/signup', () =>
      this.page.getByRole('button', { name: 'Signup' }).click(),
    );
  }
}
