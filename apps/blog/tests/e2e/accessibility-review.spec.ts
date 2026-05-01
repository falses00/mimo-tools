import { test, expect } from '@playwright/test';

test('MIMO Site - Comprehensive Review', async ({ page }) => {
  test.setTimeout(120000);
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Check page structure
  
  // Header
  const header = page.locator('header, nav').first();
  
  // Hero section
  const h1 = page.locator('h1');
  
  // Navigation links
  const navLinks = await page.locator('nav a').allTextContents();
  
  // Featured tools
  const toolCards = await page.locator('[href^="/tools/"]').count();
  
  // Footer
  const footer = page.locator('footer');
  
  // Check CSS variables
  const bgColor = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });
  
  const textColor = await page.evaluate(() => {
    return getComputedStyle(document.body).color;
  });
  
  // Check responsive classes
  const container = page.locator('.container, .max-w-7xl').first();
  const containerWidth = await container.evaluate(el => el.getBoundingClientRect().width);
  
  // Check tools page
  await page.goto('/tools');
  await page.waitForLoadState('networkidle');
  
  const toolsH1 = await page.locator('h1').textContent();
  
  const toolCount = await page.locator('a[href^="/tools/"]').count();
  
  // List all tools
  const toolNames = await page.locator('a[href^="/tools/"] h3, a[href^="/tools/"] .text-lg').allTextContents();
  
  // Check blog page
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  
  const blogH1 = await page.locator('h1').textContent();
  
  const blogCount = await page.locator('a[href^="/blog/"]').count();
  
  // Check individual tool pages
  const toolPaths = [
    '/tools/json-formatter',
    '/tools/text-utilities',
    '/tools/url-encoder',
    '/tools/base64-tool',
    '/tools/timestamp-converter',
    '/tools/uuid-generator',
    '/tools/markdown-previewer',
    '/tools/regex-tester',
    '/tools/cron-helper',
    '/tools/color-palette'
  ];
  
  for (const path of toolPaths) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent();
  }
  
  // Check dark mode
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const themeToggle = page.locator('#theme-toggle');
  if (await themeToggle.isVisible()) {
    
    // Check initial state
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    
    // Toggle
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const isDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  }
  
  // Performance check
  const performanceTiming = await page.evaluate(() => {
    const timing = performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    };
  });
  
});