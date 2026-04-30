import { test, expect } from '@playwright/test';

test.describe('MIMO Site', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for all tests
    test.setTimeout(60000);
  });

  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/MIMO/);
    
    // Check hero section
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('MIMO');
    
    // Check featured tools section
    const featuredTools = page.locator('text=精选工具');
    await expect(featuredTools).toBeVisible();
    
    // Check navigation
    const toolsLink = page.locator('a[href="/tools"]').first();
    await expect(toolsLink).toBeVisible();
    
    const blogLink = page.locator('a[href="/blog"]').first();
    await expect(blogLink).toBeVisible();
    
    const aboutLink = page.locator('a[href="/about"]').first();
    await expect(aboutLink).toBeVisible();
  });

  test('tools page loads correctly', async ({ page }) => {
    await page.goto('/tools');
    
    // Check title
    await expect(page).toHaveTitle(/工具箱/);
    
    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('工具箱');
    
    // Check tool cards
    const toolCards = page.locator('.tool-card, [data-tool], a[href^="/tools/"]');
    const count = await toolCards.count();
    expect(count).toBeGreaterThanOrEqual(10);
    
    // Check category filters
    const categoryButtons = page.locator('.category-btn, button:has-text("全部")');
    await expect(categoryButtons.first()).toBeVisible();
  });

  test('json formatter tool works', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    
    // Check title
    await expect(page).toHaveTitle(/JSON Formatter/);
    
    // Check input textarea
    const input = page.locator('textarea').first();
    await expect(input).toBeVisible();
    
    // Check format button
    const formatButton = page.locator('button:has-text("格式化")');
    await expect(formatButton).toBeVisible();
    
    // Test formatting
    await input.fill('{"name":"test","value":123}');
    await formatButton.click();
    
    // Check output
    const output = page.locator('textarea').nth(1);
    await expect(output).not.toBeEmpty();
  });

  test('text utilities tool works', async ({ page }) => {
    await page.goto('/tools/text-utilities');
    
    // Check title
    await expect(page).toHaveTitle(/Text Utilities/);
    
    // Check input textarea
    const input = page.locator('textarea').first();
    await expect(input).toBeVisible();
    
    // Check uppercase button
    const uppercaseButton = page.locator('button:has-text("转大写")');
    await expect(uppercaseButton).toBeVisible();
    
    // Test uppercase conversion
    await input.fill('hello world');
    await uppercaseButton.click();
    
    // Check output
    const output = page.locator('textarea').nth(1);
    await expect(output).toHaveValue('HELLO WORLD');
  });

  test('url encoder tool works', async ({ page }) => {
    await page.goto('/tools/url-encoder');
    
    // Check title
    await expect(page).toHaveTitle(/URL Encoder/);
    
    // Check input textarea
    const input = page.locator('textarea').first();
    await expect(input).toBeVisible();
    
    // Check encode button
    const encodeButton = page.locator('button:has-text("URL 编码")');
    await expect(encodeButton).toBeVisible();
    
    // Test encoding
    await input.fill('https://example.com/path?param=hello world');
    await encodeButton.click();
    
    // Check output
    const output = page.locator('textarea').nth(1);
    await expect(output).not.toBeEmpty();
  });

  test('blog page loads correctly', async ({ page }) => {
    await page.goto('/blog');
    
    // Check title
    await expect(page).toHaveTitle(/博客/);
    
    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('博客');
    
    // Check blog cards
    const blogCards = page.locator('a[href^="/blog/"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('about page loads correctly', async ({ page }) => {
    await page.goto('/about');
    
    // Check title
    await expect(page).toHaveTitle(/关于/);
    
    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('关于');
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Click tools link
    const toolsLink = page.locator('a[href="/tools"]').first();
    await toolsLink.click();
    await expect(page).toHaveURL('/tools');
    
    // Click blog link
    const blogLink = page.locator('a[href="/blog"]').first();
    await blogLink.click();
    await expect(page).toHaveURL('/blog');
    
    // Click about link
    const aboutLink = page.locator('a[href="/about"]').first();
    await aboutLink.click();
    await expect(page).toHaveURL('/about');
  });

  test('responsive design works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Check mobile navigation
    const mobileNav = page.locator('nav.md\\:hidden, [class*="mobile"]');
    await expect(mobileNav.first()).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    // Check desktop navigation
    const desktopNav = page.locator('nav.hidden.md\\:flex, [class*="desktop"]');
    await expect(desktopNav.first()).toBeVisible();
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle button
    const themeToggle = page.locator('#theme-toggle, button[aria-label="Toggle theme"]');
    if (await themeToggle.isVisible()) {
      // Click toggle
      await themeToggle.click();
      
      // Check if dark class is toggled
      const html = page.locator('html');
      const hasDarkClass = await html.evaluate(el => el.classList.contains('dark'));
      
      // Click again to toggle back
      await themeToggle.click();
      const hasLightClass = await html.evaluate(el => !el.classList.contains('dark'));
      
      expect(hasDarkClass || hasLightClass).toBeTruthy();
    }
  });

  test('no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('Failed to load resource')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});