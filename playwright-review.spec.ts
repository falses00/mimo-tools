import { test, expect } from '@playwright/test';

test('review MIMO website for aesthetics and usability', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://falses00.github.io/mimo-tools/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot of the homepage
  await page.screenshot({ path: 'homepage.png', fullPage: true });
  
  // Check page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check for key elements
  const heading = await page.locator('h1').first();
  if (await heading.isVisible()) {
    console.log('Main heading:', await heading.textContent());
  }
  
  // Check navigation links
  const navLinks = await page.locator('nav a').all();
  console.log('Number of navigation links:', navLinks.length);
  
  // Check for tools section
  const toolsSection = await page.locator('text=工具').first();
  if (await toolsSection.isVisible()) {
    console.log('Tools section is visible');
  }
  
  // Check for blog section
  const blogSection = await page.locator('text=博客').first();
  if (await blogSection.isVisible()) {
    console.log('Blog section is visible');
  }
  
  // Check for dark mode toggle if exists
  const darkModeToggle = await page.locator('[data-testid="dark-mode-toggle"], button:has-text("暗色"), button:has-text("深色")').first();
  if (await darkModeToggle.isVisible()) {
    console.log('Dark mode toggle is available');
    // Click to test dark mode
    await darkModeToggle.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'homepage-dark.png', fullPage: true });
    console.log('Dark mode screenshot taken');
  }
  
  // Navigate to tools page
  await page.click('text=工具');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tools-page.png', fullPage: true });
  console.log('Tools page screenshot taken');
  
  // Navigate to blog page
  await page.click('text=博客');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'blog-page.png', fullPage: true });
  console.log('Blog page screenshot taken');
  
  // Check responsive design by resizing viewport
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'mobile-homepage.png', fullPage: true });
  console.log('Mobile homepage screenshot taken');
  
  // Check for any console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Reload page to capture console errors
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  if (consoleErrors.length > 0) {
    console.log('Console errors found:', consoleErrors);
  } else {
    console.log('No console errors found');
  }
  
  // Basic performance check
  const performanceTiming = await page.evaluate(() => {
    const timing = performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
  });
  
  console.log('Performance timing:', performanceTiming);
  
  // Check for accessibility basics
  const images = await page.locator('img').all();
  let imagesWithoutAlt = 0;
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    if (!alt) {
      imagesWithoutAlt++;
    }
  }
  console.log('Images without alt text:', imagesWithoutAlt);
  
  // Final check - ensure page is visually complete
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'final-desktop.png', fullPage: true });
  console.log('Final desktop screenshot taken');
});