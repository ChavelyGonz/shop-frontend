// e2e/storage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Storage', () => {
  test('should add product via form', async ({ page }) => {
    await page.goto('http://localhost:3000/storage/all_products');

    await page.getByLabel('Name').fill('Coffee');
    await page.getByLabel('Price').fill('9.99');
    await page.getByLabel('Unit').fill('2');

    await page.getByRole('button', { name: /Add Product/i }).click();

    // ✅ adjust this depending on UI feedback:
    // e.g., toast appears, list updates, etc.
    // Example:
    // await expect(page.getByText('Coffee')).toBeVisible();
  });
});
