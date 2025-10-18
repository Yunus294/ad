import { test, expect } from '@playwright/test';

test.describe('AdMind Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should load the application and display ads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).toBeVisible();
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=AdMind')).toBeVisible();
    await expect(page.locator('input[placeholder="Search destinations..."]')).toBeVisible();
    await expect(page.locator('[class*="grid"]').first()).toBeVisible({ timeout: 10000 });
    const adCards = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]');
    await expect(adCards.first()).toBeVisible();
    const firstAd = adCards.first();
    await expect(firstAd.locator('img')).toBeVisible();
    await expect(firstAd.locator('h2')).toBeVisible();
    await expect(firstAd.locator('text=Starting from')).toBeVisible();
  });

  test('should search for destinations', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const initialAdCount = await page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').count();
    expect(initialAdCount).toBeGreaterThan(0);
    const searchInput = page.locator('input[placeholder="Search destinations..."]');
    await searchInput.fill('Paris');
    await page.waitForTimeout(500);
    const filteredAdCount = await page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').count();
    expect(filteredAdCount).toBeLessThanOrEqual(initialAdCount);
    await searchInput.fill('');
    await page.waitForTimeout(500);
    const finalAdCount = await page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').count();
    expect(finalAdCount).toBe(initialAdCount);
  });

  test('should like and unlike ads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const firstAd = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').first();
    const likeButton = firstAd.locator('button').filter({ hasText: '' }).first();
    await expect(likeButton.locator('i[class*="ti-heart"]:not([class*="filled"])')).toBeVisible();
    await likeButton.click();
    await expect(likeButton.locator('i[class*="ti-heart-filled"]')).toBeVisible();
    await likeButton.click();
    await expect(likeButton.locator('i[class*="ti-heart"]:not([class*="filled"])')).toBeVisible();
  });

  test('should open and close view modal', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const firstAd = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').first();
    const viewButton = firstAd.locator('button:has-text("View Details")');
    await viewButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).toBeVisible();
    const closeButton = page.locator('button').filter({ hasText: '×' }).or(page.locator('button[aria-label="Close"]'));
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible();
  });

  test('should open and close comment modal', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const firstAd = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').first();
    const commentButton = firstAd.locator('button:has-text("Comments")');
    await commentButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).toBeVisible();
    await expect(page.locator('textarea, input[type="text"]')).toBeVisible();
    const closeButton = page.locator('button').filter({ hasText: '×' }).or(page.locator('button[aria-label="Close"]'));
    await closeButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible();
  });

  test('should add a comment', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const firstAd = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').first();
    const commentButton = firstAd.locator('button:has-text("Comments")');
    await commentButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).toBeVisible();
    const commentInput = page.locator('textarea, input[type="text"]').first();
    const submitButton = page.locator('button:has-text("Add Comment"), button:has-text("Submit"), button[type="submit"]').first();
    await commentInput.fill('This is a test comment from E2E test');
    await submitButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible({ timeout: 5000 });
    await commentButton.click();
    await expect(page.locator('text=This is a test comment from E2E test')).toBeVisible();
  });

  test('should toggle liked filter', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const initialAdCount = await page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').count();
    const likedFilterButton = page.locator('button').filter({ has: page.locator('i[class*="ti-heart"]') }).first();
    await likedFilterButton.click();
    await expect(page.locator('text=No ads found')).toBeVisible();
    await likedFilterButton.click();
    const firstAd = page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').first();
    const likeButton = firstAd.locator('button').filter({ has: page.locator('i[class*="ti-heart"]') }).first();
    await likeButton.click();
    await likedFilterButton.click();
    const likedAdCount = await page.locator('[class*="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"]').count();
    expect(likedAdCount).toBe(1);
  });

  test('should open filter drawer on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const menuButton = page.locator('button').filter({ has: page.locator('i[class*="ti-bars-3"]') });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).toBeVisible();
    const closeButton = page.locator('button').filter({ hasText: '×' }).or(page.locator('button[aria-label="Close"]'));
    await closeButton.click();
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible();
  });

  test('should handle empty search results', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Loading AdMind...')).not.toBeVisible({ timeout: 5000 });
    const searchInput = page.locator('input[placeholder="Search destinations..."]');
    await searchInput.fill('NonExistentCity12345');
    await page.waitForTimeout(500);
    await expect(page.locator('text=No ads found')).toBeVisible();
    await expect(page.locator('text=Try adjusting your filters to see more results')).toBeVisible();
  });
});
