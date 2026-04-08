import type { Page, Response } from '@playwright/test';

export async function clickAndWaitForPost(
  page: Page,
  pathname: string,
  action: () => Promise<void>,
): Promise<Response> {
  const responsePromise = page.waitForResponse(isPostTo(pathname));
  const [response] = await Promise.all([responsePromise, action()]);

  return response;
}

export function isPostTo(pathname: string) {
  return (response: Response): boolean => {
    const url = new URL(response.url());

    return url.pathname === pathname && response.request().method() === 'POST';
  };
}
