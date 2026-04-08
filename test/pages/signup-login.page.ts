import { expect, type Page } from '@playwright/test';

import { clickAndWaitForPost } from '../support/network';
import type { LoginCredentials, TestUser } from '../support/test-user';
import { typeSequentially } from '../support/typing';

export class SignupLoginPage {
  constructor(private readonly page: Page) {}

  async enterLoginCredentials(credentials: LoginCredentials): Promise<void> {
    await typeSequentially(this.page.getByTestId('login-email'), credentials.email);
    await typeSequentially(this.page.getByTestId('login-password'), credentials.password);
  }

  async enterSignupDetails(user: TestUser): Promise<void> {
    await typeSequentially(this.page.getByTestId('signup-name'), user.name);
    await typeSequentially(this.page.getByTestId('signup-email'), user.email);
  }

  async expectLoginLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  }

  async expectSignupLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  }

  async expectIncorrectCredentialsError(): Promise<void> {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }

  async expectExistingEmailError(): Promise<void> {
    await expect(this.page.getByText('Email Address already exist!')).toBeVisible();
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.enterLoginCredentials(credentials);
    await this.submitLogin();
  }

  async startSignup(user: TestUser): Promise<void> {
    await this.enterSignupDetails(user);
    await this.submitSignup();
  }

  async submitLogin(): Promise<void> {
    await clickAndWaitForPost(this.page, '/login', () =>
      this.page.getByRole('button', { name: 'Login' }).click(),
    );
  }

  async submitSignup(): Promise<void> {
    await clickAndWaitForPost(this.page, '/signup', () =>
      this.page.getByRole('button', { name: 'Signup' }).click(),
    );
  }
}
