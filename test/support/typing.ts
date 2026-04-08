import type { Locator } from '@playwright/test';

export async function typeSequentially(locator: Locator, value: string): Promise<void> {
  await locator.click();
  await locator.press('ControlOrMeta+A');
  await locator.press('Delete');
  await locator.pressSequentially(value);
}
